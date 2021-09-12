<?php
/*
 * OperatorQuerySearch.php
 * Copyright (c) 2021 james@firefly-iii.org
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

namespace FireflyIII\Support\Search;

use Carbon\Carbon;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Helpers\Collector\GroupCollectorInterface;
use FireflyIII\Models\Account;
use FireflyIII\Models\AccountMeta;
use FireflyIII\Models\AccountType;
use FireflyIII\Models\TransactionCurrency;
use FireflyIII\Repositories\Account\AccountRepositoryInterface;
use FireflyIII\Repositories\Bill\BillRepositoryInterface;
use FireflyIII\Repositories\Budget\BudgetRepositoryInterface;
use FireflyIII\Repositories\Category\CategoryRepositoryInterface;
use FireflyIII\Repositories\Currency\CurrencyRepositoryInterface;
use FireflyIII\Repositories\Tag\TagRepositoryInterface;
use FireflyIII\Repositories\TransactionType\TransactionTypeRepositoryInterface;
use FireflyIII\Support\ParseDateString;
use FireflyIII\User;
use Gdbots\QueryParser\Node\Date;
use Gdbots\QueryParser\Node\Emoji;
use Gdbots\QueryParser\Node\Emoticon;
use Gdbots\QueryParser\Node\Field;
use Gdbots\QueryParser\Node\Hashtag;
use Gdbots\QueryParser\Node\Mention;
use Gdbots\QueryParser\Node\Node;
use Gdbots\QueryParser\Node\Numbr;
use Gdbots\QueryParser\Node\Phrase;
use Gdbots\QueryParser\Node\Subquery;
use Gdbots\QueryParser\Node\Url;
use Gdbots\QueryParser\Node\Word;
use Gdbots\QueryParser\ParsedQuery;
use Gdbots\QueryParser\QueryParser;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Log;

/**
 * Class OperatorQuerySearch
 */
class OperatorQuerySearch implements SearchInterface
{
    private AccountRepositoryInterface         $accountRepository;
    private BillRepositoryInterface            $billRepository;
    private BudgetRepositoryInterface          $budgetRepository;
    private CategoryRepositoryInterface        $categoryRepository;
    private GroupCollectorInterface            $collector;
    private CurrencyRepositoryInterface        $currencyRepository;
    private Carbon                             $date;
    private int                                $limit;
    private Collection                         $modifiers;
    private Collection                         $operators;
    private string                             $originalQuery;
    private int                                $page;
    private ParsedQuery                        $query;
    private float                              $startTime;
    private TagRepositoryInterface             $tagRepository;
    private TransactionTypeRepositoryInterface $typeRepository; // obsolete
    private User                               $user;
    private array                              $validOperators;
    private array                              $words;

    /**
     * OperatorQuerySearch constructor.
     *
     * @codeCoverageIgnore
     */
    public function __construct()
    {
        Log::debug('Constructed OperatorQuerySearch');
        $this->modifiers          = new Collection; // obsolete
        $this->operators          = new Collection;
        $this->page               = 1;
        $this->words              = [];
        $this->limit              = 25;
        $this->originalQuery      = '';
        $this->date               = today(config('app.timezone'));
        $this->validOperators     = array_keys(config('firefly.search.operators'));
        $this->startTime          = microtime(true);
        $this->accountRepository  = app(AccountRepositoryInterface::class);
        $this->categoryRepository = app(CategoryRepositoryInterface::class);
        $this->budgetRepository   = app(BudgetRepositoryInterface::class);
        $this->billRepository     = app(BillRepositoryInterface::class);
        $this->tagRepository      = app(TagRepositoryInterface::class);
        $this->currencyRepository = app(CurrencyRepositoryInterface::class);
        $this->typeRepository     = app(TransactionTypeRepositoryInterface::class);
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function getModifiers(): Collection
    {
        return $this->getOperators();
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function getOperators(): Collection
    {
        return $this->operators;
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function getWordsAsString(): string
    {
        return implode(' ', $this->words);
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function hasModifiers(): bool
    {
        die(__METHOD__);
    }

    /**
     * @inheritDoc
     * @throws FireflyException
     */
    public function parseQuery(string $query)
    {
        Log::debug(sprintf('Now in parseQuery(%s)', $query));
        $parser              = new QueryParser();
        $this->query         = $parser->parse($query);
        $this->originalQuery = $query;

        Log::debug(sprintf('Found %d node(s)', count($this->query->getNodes())));
        foreach ($this->query->getNodes() as $searchNode) {
            $this->handleSearchNode($searchNode);
        }

        $this->collector->setSearchWords($this->words);
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function searchTime(): float
    {
        return microtime(true) - $this->startTime;
    }

    /**
     * @inheritDoc
     * @throws FireflyException
     */
    public function searchTransactions(): LengthAwarePaginator
    {
        if (0 === count($this->getWords()) && 0 === count($this->getOperators())) {
            return new LengthAwarePaginator([],0,5,1);
        }

        return $this->collector->getPaginatedGroups();
    }

    /**
     * @param Carbon $date
     */
    public function setDate(Carbon $date): void
    {
        $this->date = $date;
    }

    /**
     * @param int $limit
     */
    public function setLimit(int $limit): void
    {
        $this->limit = $limit;
        $this->collector->setLimit($this->limit);
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function setPage(int $page): void
    {
        $this->page = $page;
        $this->collector->setPage($this->page);
    }

    /**
     * @inheritDoc
     * @codeCoverageIgnore
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
        $this->accountRepository->setUser($user);
        $this->billRepository->setUser($user);
        $this->categoryRepository->setUser($user);
        $this->budgetRepository->setUser($user);
        $this->tagRepository->setUser($user);
        $this->collector = app(GroupCollectorInterface::class);
        $this->collector->setUser($this->user);
        $this->collector->withAccountInformation()->withCategoryInformation()->withBudgetInformation();

        $this->setLimit((int)app('preferences')->getForUser($user, 'listPageSize', 50)->data);

    }

    /**
     * @param Node $searchNode
     *
     * @throws FireflyException
     */
    private function handleSearchNode(Node $searchNode): void
    {
        $class = get_class($searchNode);
        switch ($class) {
            default:
                Log::error(sprintf('Cannot handle node %s', $class));
                throw new FireflyException(sprintf('Firefly III search cant handle "%s"-nodes', $class));
            case Subquery::class:
                // loop all notes in subquery:
                foreach ($searchNode->getNodes() as $subNode) { // @phpstan-ignore-line
                    $this->handleSearchNode($subNode); // lets hope its not too recursive!
                }
                break;
            case Word::class:
            case Phrase::class:
            case Numbr::class:
            case Url::class:
            case Date::class:
            case Hashtag::class:
            case Emoticon::class:
            case Emoji::class:
            case Mention::class:
                Log::debug(sprintf('Now handle %s', $class));
                $this->words[] = (string)$searchNode->getValue();
                break;
            case Field::class:
                Log::debug(sprintf('Now handle %s', $class));
                /** @var Field $searchNode */
                // used to search for x:y
                $operator = strtolower($searchNode->getValue());
                $value    = $searchNode->getNode()->getValue();
                // must be valid operator:
                if (in_array($operator, $this->validOperators, true) && $this->updateCollector($operator, (string)$value)) {
                    $this->operators->push(
                        [
                            'type'  => self::getRootOperator($operator),
                            'value' => (string)$value,
                        ]
                    );
                }
                break;
        }

    }

    /**
     * @param string $operator
     * @param string $value
     *
     * @return bool
     * @throws FireflyException
     */
    private function updateCollector(string $operator, string $value): bool
    {
        Log::debug(sprintf('updateCollector("%s", "%s")', $operator, $value));

        // check if alias, replace if necessary:
        $operator = self::getRootOperator($operator);

        app('telemetry')->feature('search.operators.uses_operator', $operator);

        switch ($operator) {
            default:
                Log::error(sprintf('No such operator: %s', $operator));
                throw new FireflyException(sprintf('Unsupported search operator: "%s"', $operator));
            // some search operators are ignored, basically:
            case 'user_action':
                Log::info(sprintf('Ignore search operator "%s"', $operator));

                return false;
            //
            // all account related searches:
            //
            case 'source_account_starts':
                $this->searchAccount($value, 1, 1);
                break;
            case 'source_account_ends':
                $this->searchAccount($value, 1, 2);
                break;
            case 'source_account_is':
                $this->searchAccount($value, 1, 4);
                break;
            case 'source_account_nr_starts':
                $this->searchAccountNr($value, 1, 1);
                break;
            case 'source_account_nr_ends':
                $this->searchAccountNr($value, 1, 2);
                break;
            case 'source_account_nr_is':
                $this->searchAccountNr($value, 1, 4);
                break;
            case 'source_account_nr_contains':
                $this->searchAccountNr($value, 1, 3);
                break;
            case 'source_account_contains':
                $this->searchAccount($value, 1, 3);
                break;
            case 'source_account_id':
                $account = $this->accountRepository->findNull((int)$value);
                if (null !== $account) {
                    $this->collector->setSourceAccounts(new Collection([$account]));
                }
                break;
            case 'journal_id':
                $parts = explode(',', $value);
                $this->collector->setJournalIds($parts);
                break;
            case 'id':
                $parts = explode(',', $value);
                $this->collector->setIds($parts);
                break;
            case 'destination_account_starts':
                $this->searchAccount($value, 2, 1);
                break;
            case 'destination_account_ends':
                $this->searchAccount($value, 2, 2);
                break;
            case 'destination_account_nr_starts':
                $this->searchAccountNr($value, 2, 1);
                break;
            case 'destination_account_nr_ends':
                $this->searchAccountNr($value, 2, 2);
                break;
            case 'destination_account_nr_is':
                $this->searchAccountNr($value, 2, 4);
                break;
            case 'destination_account_is':
                $this->searchAccount($value, 2, 4);
                break;
            case 'destination_account_nr_contains':
                $this->searchAccountNr($value, 2, 3);
                break;
            case 'destination_account_contains':
                $this->searchAccount($value, 2, 3);
                break;
            case 'destination_account_id':
                $account = $this->accountRepository->findNull((int)$value);
                if (null !== $account) {
                    $this->collector->setDestinationAccounts(new Collection([$account]));
                }
                break;
            case 'account_id':
                $parts      = explode(',', $value);
                $collection = new Collection;
                foreach ($parts as $accountId) {
                    $account = $this->accountRepository->findNull((int)$accountId);
                    if (null !== $account) {
                        $collection->push($account);
                    }
                }
                if ($collection->count() > 0) {
                    $this->collector->setAccounts($collection);
                }
                break;
            //
            // cash account
            //
            case 'source_is_cash':
                $account = $this->getCashAccount();
                $this->collector->setSourceAccounts(new Collection([$account]));
                break;
            case 'destination_is_cash':
                $account = $this->getCashAccount();
                $this->collector->setDestinationAccounts(new Collection([$account]));
                break;
            case 'account_is_cash':
                $account = $this->getCashAccount();
                $this->collector->setAccounts(new Collection([$account]));
                break;
            //
            // description
            //
            case 'description_starts':
                $this->collector->descriptionStarts([$value]);
                break;
            case 'description_ends':
                $this->collector->descriptionEnds([$value]);
                break;
            case 'description_contains':
                $this->words[] = $value;

                return false;
            case 'description_is':
                $this->collector->descriptionIs($value);
                break;
            //
            // currency
            //
            case 'currency_is':
                $currency = $this->findCurrency($value);
                if (null !== $currency) {
                    $this->collector->setCurrency($currency);
                }
                break;
            case 'foreign_currency_is':
                $currency = $this->findCurrency($value);
                if (null !== $currency) {
                    $this->collector->setForeignCurrency($currency);
                }
                break;
            //
            // attachments
            //
            case 'has_attachments':
                Log::debug('Set collector to filter on attachments.');
                $this->collector->hasAttachments();
                break;
            //
            // categories
            case 'has_no_category':
                $this->collector->withoutCategory();
                break;
            case 'has_any_category':
                $this->collector->withCategory();
                break;
            case 'category_is':
                $result = $this->categoryRepository->searchCategory($value, 25);
                if ($result->count() > 0) {
                    $this->collector->setCategories($result);
                }
                break;
            //
            // budgets
            //
            case 'has_no_budget':
                $this->collector->withoutBudget();
                break;
            case 'has_any_budget':
                $this->collector->withBudget();
                break;
            case 'budget_is':
                $result = $this->budgetRepository->searchBudget($value, 25);
                if ($result->count() > 0) {
                    $this->collector->setBudgets($result);
                }
                break;
            //
            // bill
            //
            case 'has_no_bill':
                $this->collector->withoutBill();
                break;
            case 'has_any_bill':
                $this->collector->withBill();
                break;
            case 'bill_is':
                $result = $this->billRepository->searchBill($value, 25);
                if ($result->count() > 0) {
                    $this->collector->setBills($result);
                }
                break;
            //
            // tags
            //
            case 'has_no_tag':
                $this->collector->withoutTags();
                break;
            case 'has_any_tag':
                $this->collector->hasAnyTag();
                break;
            case 'tag_is':
                $result = $this->tagRepository->searchTag($value);
                if ($result->count() > 0) {
                    $this->collector->setTags($result);
                }
                break;
            //
            // notes
            //
            case 'notes_contain':
                $this->collector->notesContain($value);
                break;
            case 'notes_start':
                $this->collector->notesStartWith($value);
                break;
            case 'notes_end':
                $this->collector->notesEndWith($value);
                break;
            case 'notes_are':
                $this->collector->notesExactly($value);
                break;
            case 'no_notes':
                $this->collector->withoutNotes();
                break;
            case 'any_notes':
                $this->collector->withAnyNotes();
                break;
            //
            // amount
            //
            case 'amount_exactly':

                // strip comma's, make dots.
                $value = str_replace(',', '.', (string)$value);

                $amount = app('steam')->positive($value);
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $amount));
                $this->collector->amountIs($amount);
                break;
            case 'amount_less':
                // strip comma's, make dots.
                $value = str_replace(',', '.', (string)$value);

                $amount = app('steam')->positive($value);
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $amount));
                $this->collector->amountLess($amount);
                break;
            case 'amount_more':
                // strip comma's, make dots.
                $value = str_replace(',', '.', (string)$value);

                $amount = app('steam')->positive($value);
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $amount));
                $this->collector->amountMore($amount);
                break;
            //
            // transaction type
            //
            case 'transaction_type':
                $this->collector->setTypes([ucfirst($value)]);
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $value));
                break;
            //
            // dates
            //
            case 'date_is':
                $range = $this->parseDateRange($value);
                Log::debug(
                    sprintf(
                        'Set "%s" using collector with value "%s" (%s - %s)', $operator, $value, $range['start']->format('Y-m-d'),
                        $range['end']->format('Y-m-d')
                    )
                );
                $this->collector->setRange($range['start'], $range['end']);

                // add to operators manually:
                $this->operators->push(['type' => 'date_before', 'value' => $range['start']->format('Y-m-d'),]);
                $this->operators->push(['type' => 'date_after', 'value' => $range['end']->format('Y-m-d'),]);

                return false;
            case 'date_before':
                Log::debug(sprintf('Value for date_before is "%s"', $value));
                $range = $this->parseDateRange($value);
                Log::debug(
                    sprintf(
                        'Set "%s" using collector with value "%s" (%s - %s)', $operator, $value, $range['start']->format('Y-m-d'),
                        $range['end']->format('Y-m-d')
                    )
                );

                // add to operators manually:
                $this->operators->push(['type' => 'date_before', 'value' => $range['start']->format('Y-m-d'),]);
                $this->collector->setBefore($range['start']);

                return false;
            case 'date_after':
                Log::debug(sprintf('Value for date_after is "%s"', $value));
                $range = $this->parseDateRange($value);
                Log::debug(
                    sprintf(
                        'Set "%s" using collector with value "%s" (%s - %s)', $operator, $value, $range['start']->format('Y-m-d'),
                        $range['end']->format('Y-m-d')
                    )
                );

                // add to operators manually:
                $this->operators->push(['type' => 'date_after', 'value' => $range['end']->format('Y-m-d'),]);
                $this->collector->setAfter($range['end']);

                return false;
            case 'created_on':
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $value));
                $createdAt = new Carbon($value);
                $this->collector->setCreatedAt($createdAt);
                break;
            case 'updated_on':
                Log::debug(sprintf('Set "%s" using collector with value "%s"', $operator, $value));
                $updatedAt = new Carbon($value);
                $this->collector->setUpdatedAt($updatedAt);
                break;
            //
            // other fields
            //
            case 'external_id':
                $this->collector->setExternalId($value);
                break;
            case 'internal_reference':
                $this->collector->setInternalReference($value);
                break;
        }

        return true;
    }

    /**
     * @param string $operator
     *
     * @return string
     * @throws FireflyException
     */
    public static function getRootOperator(string $operator): string
    {
        $config = config(sprintf('firefly.search.operators.%s', $operator));
        if (null === $config) {
            throw new FireflyException(sprintf('No configuration for search operator "%s"', $operator));
        }
        if (true === $config['alias']) {
            Log::debug(sprintf('"%s" is an alias for "%s", so return that instead.', $operator, $config['alias_for']));

            return $config['alias_for'];
        }
        Log::debug(sprintf('"%s" is not an alias.', $operator));

        return $operator;
    }

    /**
     * searchDirection: 1 = source (default), 2 = destination
     * stringPosition: 1 = start (default), 2 = end, 3 = contains, 4 = is
     *
     * @param string $value
     * @param int    $searchDirection
     * @param int    $stringPosition
     */
    private function searchAccount(string $value, int $searchDirection, int $stringPosition): void
    {
        Log::debug(sprintf('searchAccount("%s", %d, %d)', $value, $stringPosition, $searchDirection));

        // search direction (default): for source accounts
        $searchTypes     = [AccountType::ASSET, AccountType::MORTGAGE, AccountType::LOAN, AccountType::DEBT, AccountType::REVENUE];
        $collectorMethod = 'setSourceAccounts';

        // search direction: for destination accounts
        if (2 === $searchDirection) {
            // destination can be
            $searchTypes     = [AccountType::ASSET, AccountType::MORTGAGE, AccountType::LOAN, AccountType::DEBT, AccountType::EXPENSE];
            $collectorMethod = 'setDestinationAccounts';
        }
        // string position (default): starts with:
        $stringMethod = 'str_starts_with';

        // string position: ends with:
        if (2 === $stringPosition) {
            $stringMethod = 'str_ends_with';
        }
        if (3 === $stringPosition) {
            $stringMethod = 'str_contains';
        }
        if (4 === $stringPosition) {
            $stringMethod = 'str_is_equal';
        }

        // get accounts:
        $accounts = $this->accountRepository->searchAccount($value, $searchTypes, 25);
        if (0 === $accounts->count()) {
            Log::debug('Found zero accounts, search for invalid account.');
            $account     = new Account;
            $account->id = 0;
            $this->collector->$collectorMethod(new Collection([$account]));

            return;
        }
        Log::debug(sprintf('Found %d accounts, will filter.', $accounts->count()));
        $filtered = $accounts->filter(
            function (Account $account) use ($value, $stringMethod) {
                return $stringMethod(strtolower($account->name), strtolower($value));
            }
        );

        if (0 === $filtered->count()) {
            Log::debug('Left with zero accounts, search for invalid account.');
            $account     = new Account;
            $account->id = 0;
            $this->collector->$collectorMethod(new Collection([$account]));

            return;
        }
        Log::debug(sprintf('Left with %d, set as %s().', $filtered->count(), $collectorMethod));
        $this->collector->$collectorMethod($filtered);
    }

    /**
     * searchDirection: 1 = source (default), 2 = destination
     * stringPosition: 1 = start (default), 2 = end, 3 = contains, 4 = is
     *
     * @param string $value
     * @param int    $searchDirection
     * @param int    $stringPosition
     */
    private function searchAccountNr(string $value, int $searchDirection, int $stringPosition): void
    {
        Log::debug(sprintf('searchAccountNr(%s, %d, %d)', $value, $searchDirection, $stringPosition));

        // search direction (default): for source accounts
        $searchTypes     = [AccountType::ASSET, AccountType::MORTGAGE, AccountType::LOAN, AccountType::DEBT, AccountType::REVENUE];
        $collectorMethod = 'setSourceAccounts';

        // search direction: for destination accounts
        if (2 === $searchDirection) {
            // destination can be
            $searchTypes     = [AccountType::ASSET, AccountType::MORTGAGE, AccountType::LOAN, AccountType::DEBT, AccountType::EXPENSE];
            $collectorMethod = 'setDestinationAccounts';
        }
        // string position (default): starts with:
        $stringMethod = 'str_starts_with';

        // string position: ends with:
        if (2 === $stringPosition) {
            $stringMethod = 'str_ends_with';
        }
        if (3 === $stringPosition) {
            $stringMethod = 'str_contains';
        }
        if (4 === $stringPosition) {
            $stringMethod = 'str_is_equal';
        }

        // search for accounts:
        $accounts = $this->accountRepository->searchAccountNr($value, $searchTypes, 25);
        if (0 === $accounts->count()) {
            Log::debug('Found zero accounts, search for invalid account.');
            $account     = new Account;
            $account->id = 0;
            $this->collector->$collectorMethod(new Collection([$account]));

            return;
        }

        // if found, do filter
        Log::debug(sprintf('Found %d accounts, will filter.', $accounts->count()));
        $filtered = $accounts->filter(
            function (Account $account) use ($value, $stringMethod) {
                // either IBAN or account number!
                $ibanMatch      = $stringMethod(strtolower((string)$account->iban), strtolower((string)$value));
                $accountNrMatch = false;
                /** @var AccountMeta $meta */
                foreach ($account->accountMeta as $meta) {
                    if ('account_number' === $meta->name && $stringMethod(strtolower($meta->data), strtolower($value))) {
                        $accountNrMatch = true;
                    }
                }

                return $ibanMatch || $accountNrMatch;
            }
        );

        if (0 === $filtered->count()) {
            Log::debug('Left with zero, search for invalid account');
            $account     = new Account;
            $account->id = 0;
            $this->collector->$collectorMethod(new Collection([$account]));

            return;
        }
        Log::debug(sprintf('Left with %d, set as %s().', $filtered->count(), $collectorMethod));
        $this->collector->$collectorMethod($filtered);
    }

    /**
     * @return Account
     */
    private function getCashAccount(): Account
    {
        return $this->accountRepository->getCashAccount();
    }

    /**
     * @param string $value
     *
     * @return TransactionCurrency|null
     */
    private function findCurrency(string $value): ?TransactionCurrency
    {
        if (str_contains($value, '(') && str_contains($value, ')')) {
            // bad method to split and get the currency code:
            $parts = explode(' ', $value);
            $value = trim($parts[count($parts) - 1], "() \t\n\r\0\x0B");
        }
        $result = $this->currencyRepository->findByCodeNull($value);
        if (null === $result) {
            $result = $this->currencyRepository->findByNameNull($value);
        }

        return $result;
    }

    /**
     * @param string $value
     *
     * @return array
     * @throws FireflyException
     */
    private function parseDateRange(string $value): array
    {
        $parser = new ParseDateString;
        if ($parser->isDateRange($value)) {
            return $parser->parseRange($value, $this->date);
        }
        $date = $parser->parseDate($value);

        return [
            'start' => $date,
            'end'   => $date,
        ];
    }

    /**
     * @return array
     */
    public function getWords(): array
    {
        return $this->words;
    }
}
