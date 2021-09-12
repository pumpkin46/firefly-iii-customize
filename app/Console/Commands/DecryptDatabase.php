<?php

/**
 * DecryptDatabase.php
 * Copyright (c) 2020 james@firefly-iii.org
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

namespace FireflyIII\Console\Commands;

use Crypt;
use DB;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Preference;
use Illuminate\Console\Command;
use Illuminate\Contracts\Encryption\DecryptException;
use JsonException;
use Log;
use stdClass;

/**
 * Class DecryptDatabase
 */
class DecryptDatabase extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Decrypts the database.';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firefly-iii:decrypt-all';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $this->line('Going to decrypt the database.');
        $tables = [
            'accounts'             => ['name', 'iban'],
            'attachments'          => ['filename', 'mime', 'title', 'description'],
            'bills'                => ['name', 'match'],
            'budgets'              => ['name'],
            'categories'           => ['name'],
            'piggy_banks'          => ['name'],
            'preferences'          => ['data'],
            'tags'                 => ['tag', 'description'],
            'transaction_journals' => ['description'],
            'transactions'         => ['description'],
            'journal_links'        => ['comment'],
        ];
        /**
         * @var string $table
         * @var array  $fields
         */
        foreach ($tables as $table => $fields) {
            $this->decryptTable($table, $fields);
        }
        $this->info('Done!');

        return 0;
    }

    /**
     * @param string $table
     * @param array  $fields
     */
    private function decryptTable(string $table, array $fields): void
    {
        if ($this->isDecrypted($table)) {
            $this->info(sprintf('No decryption required for table "%s".', $table));

            return;
        }
        foreach ($fields as $field) {
            $this->decryptField($table, $field);
        }
        $this->line(sprintf('Decrypted the data in table "%s".', $table));
        // mark as decrypted:
        $configName = sprintf('is_decrypted_%s', $table);
        app('fireflyconfig')->set($configName, true);
    }

    /**
     * @param string $table
     *
     * @return bool
     */
    private function isDecrypted(string $table): bool
    {
        $configName = sprintf('is_decrypted_%s', $table);
        $configVar  = null;
        try {
            $configVar = app('fireflyconfig')->get($configName, false);
        } catch (FireflyException $e) {
            Log::error($e->getMessage());
        }
        if (null !== $configVar) {
            return (bool)$configVar->data;
        }

        return false;
    }

    /**
     * @param string $table
     * @param string $field
     */
    private function decryptField(string $table, string $field): void
    {
        $rows = DB::table($table)->get(['id', $field]);
        /** @var stdClass $row */
        foreach ($rows as $row) {
            $this->decryptRow($table, $field, $row);
        }
    }

    /**
     * @param string   $table
     * @param string   $field
     * @param stdClass $row
     */
    private function decryptRow(string $table, string $field, stdClass $row): void
    {
        $original = $row->$field;
        if (null === $original) {
            return;
        }
        $id    = (int)$row->id;
        $value = '';

        try {
            $value = $this->tryDecrypt($original);
        } catch (FireflyException $e) {
            $message = sprintf('Could not decrypt field "%s" in row #%d of table "%s": %s', $field, $id, $table, $e->getMessage());
            $this->error($message);
            Log::error($message);
            Log::error($e->getTraceAsString());
        }

        // A separate routine for preferences table:
        if ('preferences' === $table) {
            $this->decryptPreferencesRow($id, $value);

            return;
        }

        if ($value !== $original) {
            DB::table($table)->where('id', $id)->update([$field => $value]);
        }
    }

    /**
     * Tries to decrypt data. Will only throw an exception when the MAC is invalid.
     *
     * @param mixed $value
     *
     * @return string
     * @throws FireflyException
     */
    private function tryDecrypt($value)
    {
        try {
            $value = Crypt::decrypt($value);
        } catch (DecryptException $e) {
            if ('The MAC is invalid.' === $e->getMessage()) {
                throw new FireflyException($e->getMessage(), 0, $e);
            }
        }

        return $value;
    }

    /**
     * @param int    $id
     * @param string $value
     */
    private function decryptPreferencesRow(int $id, string $value): void
    {
        // try to json_decrypt the value.
        try {
            $newValue = json_decode($value, true, 512, JSON_THROW_ON_ERROR) ?? $value;
        } catch (JsonException $e) {
            $message = sprintf('Could not JSON decode preference row #%d: %s. This does not have to be a problem.', $id, $e->getMessage());
            $this->error($message);
            Log::warning($message);
            Log::warning($value);
            Log::warning($e->getTraceAsString());

            return;
        }

        /** @var Preference $object */
        $object = Preference::find((int)$id);
        if (null !== $object) {
            $object->data = $newValue;
            $object->save();
        }
    }
}
