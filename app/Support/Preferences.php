<?php
/**
 * Preferences.php
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

namespace FireflyIII\Support;

use Cache;
use Exception;
use FireflyIII\Exceptions\FireflyException;
use FireflyIII\Models\Preference;
use FireflyIII\User;
use Illuminate\Support\Collection;
use Log;
use Session;

/**
 * Class Preferences.
 *
 * @codeCoverageIgnore
 */
class Preferences
{
    /**
     * @param User   $user
     * @param string $search
     *
     * @return Collection
     */
    public function beginsWith(User $user, string $search): Collection
    {
        return Preference::where('user_id', $user->id)->where('name', 'LIKE', $search . '%')->get();
    }

    /**
     * @param string $name
     *
     * @return bool
     * @throws FireflyException
     */
    public function delete(string $name): bool
    {
        $fullName = sprintf('preference%s%s', auth()->user()->id, $name);
        if (Cache::has($fullName)) {
            Cache::forget($fullName);
        }
        try {
            Preference::where('user_id', auth()->user()->id)->where('name', $name)->delete();
        } catch (Exception $e) {
            throw new FireflyException(sprintf('Could not delete preference: %s', $e->getMessage()), 0, $e);
        }

        return true;
    }

    /**
     * @param string $name
     *
     * @return Collection
     */
    public function findByName(string $name): Collection
    {
        return Preference::where('name', $name)->get();
    }

    /**
     * @param string $name
     * @param mixed  $default
     *
     * @return \FireflyIII\Models\Preference|null
     */
    public function get(string $name, $default = null): ?Preference
    {
        /** @var User|null $user */
        $user = auth()->user();
        if (null === $user) {
            $preference       = new Preference;
            $preference->data = $default;

            return $preference;
        }

        return $this->getForUser($user, $name, $default);
    }

    /**
     * @param string $name
     * @param mixed  $default
     *
     * @return \FireflyIII\Models\Preference|null
     */
    public function getFresh(string $name, $default = null): ?Preference
    {
        /** @var User|null $user */
        $user = auth()->user();
        if (null === $user) {
            $preference       = new Preference;
            $preference->data = $default;

            return $preference;
        }

        return $this->getFreshForUser($user, $name, $default);
    }

    /**
     * @param \FireflyIII\User $user
     * @param array            $list
     *
     * @return array
     */
    public function getArrayForUser(User $user, array $list): array
    {
        $result      = [];
        $preferences = Preference::where('user_id', $user->id)->whereIn('name', $list)->get(['id', 'name', 'data']);
        /** @var Preference $preference */
        foreach ($preferences as $preference) {
            $result[$preference->name] = $preference->data;
        }
        foreach ($list as $name) {
            if (!array_key_exists($name, $result)) {
                $result[$name] = null;
            }
        }

        return $result;
    }

    /**
     * @param User            $user
     * @param string          $name
     * @param null|string|int $default
     *
     * @return \FireflyIII\Models\Preference|null
     * @throws FireflyException
     */
    public function getForUser(User $user, string $name, $default = null): ?Preference
    {
        $preference = Preference::where('user_id', $user->id)->where('name', $name)->first(['id','user_id', 'name', 'data', 'updated_at', 'created_at']);
        if (null !== $preference && null === $preference->data) {
            try {
                $preference->delete();
            } catch (Exception $e) {
                throw new FireflyException(sprintf('Could not delete preference #%d: %s', $preference->id, $e->getMessage()), 0, $e);
            }
            $preference = null;
        }

        if (null !== $preference) {

            return $preference;
        }
        // no preference found and default is null:
        if (null === $default) {
            // return NULL
            return null;
        }

        return $this->setForUser($user, $name, $default);
    }

    /**
     * @param User        $user
     * @param string      $name
     * @param null|string $default
     *
     * @return \FireflyIII\Models\Preference|null
     * TODO remove me
     */
    public function getFreshForUser(User $user, string $name, $default = null): ?Preference
    {
        return $this->getForUser($user, $name, $default);
    }

    /**
     * @return string
     */
    public function lastActivity(): string
    {
        $lastActivity = microtime();
        $preference   = $this->get('lastActivity', microtime());

        if (null !== $preference && null !== $preference->data) {
            $lastActivity = $preference->data;
        }
        if (is_array($lastActivity)) {
            $lastActivity = implode(',', $lastActivity);
        }

        return hash('sha256', $lastActivity);
    }

    /**
     *
     */
    public function mark(): void
    {
        $this->set('lastActivity', microtime());
        Session::forget('first');
    }

    /**
     * @param string $name
     * @param mixed  $value
     *
     * @return \FireflyIII\Models\Preference
     */
    public function set(string $name, $value): Preference
    {
        $user = auth()->user();
        if (null === $user) {
            // make new preference, return it:
            $pref       = new Preference;
            $pref->name = $name;
            $pref->data = $value;

            return $pref;
        }

        return $this->setForUser(auth()->user(), $name, $value);
    }

    /**
     * @param User   $user
     * @param string $name
     */
    public function forget(User $user, string $name): void
    {
        $key = sprintf('preference%s%s', $user->id, $name);
        Cache::forget($key);
        Cache::put($key, '', 5);
    }

    /**
     * @param \FireflyIII\User $user
     * @param string           $name
     * @param mixed            $value
     *
     * @return Preference
     * @throws FireflyException
     */
    public function setForUser(User $user, string $name, $value): Preference
    {
        $fullName = sprintf('preference%s%s', $user->id, $name);
        Cache::forget($fullName);
        /** @var Preference|null $pref */
        $pref = Preference::where('user_id', $user->id)->where('name', $name)->first(['id', 'name', 'data', 'updated_at', 'created_at']);

        if (null !== $pref && null === $value) {
            try {
                $pref->delete();
            } catch (Exception $e) {
                throw new FireflyException(sprintf('Could not delete preference: %s', $e->getMessage()), 0, $e);
            }

            return new Preference;
        }
        if (null === $value) {
            return new Preference;
        }
        if(null === $pref) {
            $pref = new Preference;
            $pref->user_id = $user->id;
            $pref->name = $name;
        }
        $pref->data = $value;
        $pref->save();
        Cache::forever($fullName, $pref);

        return $pref;
    }
}
