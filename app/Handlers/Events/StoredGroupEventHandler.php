<?php
/**
 * StoredGroupEventHandler.php
 * Copyright (c) 2019 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
declare(strict_types=1);

namespace FireflyIII\Handlers\Events;

use FireflyIII\Events\RequestedSendWebhookMessages;
use FireflyIII\Events\StoredTransactionGroup;
use FireflyIII\Generator\Webhook\MessageGeneratorInterface;
use FireflyIII\Models\TransactionJournal;
use FireflyIII\Models\Webhook;
use FireflyIII\Repositories\RuleGroup\RuleGroupRepositoryInterface;
use FireflyIII\TransactionRules\Engine\RuleEngineInterface;
use Illuminate\Support\Collection;
use Log;

/**
 * Class StoredGroupEventHandler
 */
class StoredGroupEventHandler
{
    /**
     * This method grabs all the users rules and processes them.
     *
     * @param StoredTransactionGroup $storedGroupEvent
     */
    public function processRules(StoredTransactionGroup $storedGroupEvent): void
    {
        if (false === $storedGroupEvent->applyRules) {
            Log::info(sprintf('Will not run rules on group #%d', $storedGroupEvent->transactionGroup->id));

            return;
        }
        Log::debug('Now in StoredGroupEventHandler::processRules()');

        $journals = $storedGroupEvent->transactionGroup->transactionJournals;
        $array    = [];
        /** @var TransactionJournal $journal */
        foreach ($journals as $journal) {
            $array[] = $journal->id;
        }
        $journalIds = implode(',', $array);
        Log::debug(sprintf('Add local operator for journal(s): %s', $journalIds));

        // collect rules:
        $ruleGroupRepository = app(RuleGroupRepositoryInterface::class);
        $ruleGroupRepository->setUser($storedGroupEvent->transactionGroup->user);

        // add the groups to the rule engine.
        // it should run the rules in the group and cancel the group if necessary.
        $groups = $ruleGroupRepository->getRuleGroupsWithRules('store-journal');

        // create and fire rule engine.
        $newRuleEngine = app(RuleEngineInterface::class);
        $newRuleEngine->setUser($storedGroupEvent->transactionGroup->user);
        $newRuleEngine->addOperator(['type' => 'journal_id', 'value' => $journalIds]);
        $newRuleEngine->setRuleGroups($groups);
        $newRuleEngine->fire();
    }

    /**
     * This method processes all webhooks that respond to the "stored transaction group" trigger (100)
     *
     * @param StoredTransactionGroup $storedGroupEvent
     */
    public function triggerWebhooks(StoredTransactionGroup $storedGroupEvent): void
    {
        Log::debug(__METHOD__);
        $group = $storedGroupEvent->transactionGroup;
        $user  = $group->user;
        /** @var MessageGeneratorInterface $engine */
        $engine = app(MessageGeneratorInterface::class);
        $engine->setUser($user);

        // tell the generator which trigger it should look for
        $engine->setTrigger(Webhook::TRIGGER_STORE_TRANSACTION);
        // tell the generator which objects to process
        $engine->setObjects(new Collection([$group]));
        // tell the generator to generate the messages
        $engine->generateMessages();

        // trigger event to send them:
        event(new RequestedSendWebhookMessages);
    }

}
