<?php
/**
 * PrependNotes.php
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

namespace FireflyIII\TransactionRules\Actions;

use FireflyIII\Models\Note;
use FireflyIII\Models\RuleAction;
use FireflyIII\Models\TransactionJournal;
use Log;

/**
 * Class PrependNotes.
 */
class PrependNotes implements ActionInterface
{
    /** @var RuleAction The rule action */
    private $action;

    /**
     * TriggerInterface constructor.
     *
     * @param RuleAction $action
     */
    public function __construct(RuleAction $action)
    {
        $this->action = $action;
    }

    /**
     * @inheritDoc
     */
    public function actOnArray(array $journal): bool
    {
        $dbNote = Note
            ::
            where('noteable_id', (int)$journal['transaction_journal_id'])
            ->where('noteable_type', TransactionJournal::class)
            ->first(['notes.*']);
        if (null === $dbNote) {
            $dbNote                = new Note;
            $dbNote->noteable_id   = (int)$journal['transaction_journal_id'];
            $dbNote->noteable_type = TransactionJournal::class;
            $dbNote->text          = '';
        }
        Log::debug(sprintf('RuleAction PrependNotes prepended "%s" to "%s".', $this->action->action_value, $dbNote->text));
        $text         = sprintf('%s%s', $this->action->action_value, $dbNote->text);
        $dbNote->text = $text;
        $dbNote->save();

        return true;
    }
}
