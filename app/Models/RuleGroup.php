<?php
/**
 * RuleGroup.php
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

namespace FireflyIII\Models;

use Carbon\Carbon;
use Eloquent;
use FireflyIII\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
/**
 * FireflyIII\Models\RuleGroup
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int $user_id
 * @property string $title
 * @property string|null $description
 * @property int $order
 * @property bool $active
 * @property bool $stop_processing
 * @property \Illuminate\Database\Eloquent\Collection|\FireflyIII\Models\Rule[] $rules
 * @property-read int|null $rules_count
 * @property-read User $user
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup newQuery()
 * @method static Builder|RuleGroup onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereStopProcessing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RuleGroup whereUserId($value)
 * @method static Builder|RuleGroup withTrashed()
 * @method static Builder|RuleGroup withoutTrashed()
 * @mixin Eloquent
 */
class RuleGroup extends Model
{
    use SoftDeletes;
    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts
        = [
            'created_at'      => 'datetime',
            'updated_at'      => 'datetime',
            'deleted_at'      => 'datetime',
            'active'          => 'boolean',
            'stop_processing' => 'boolean',
            'order'           => 'int',
        ];

    /** @var array Fields that can be filled */
    protected $fillable = ['user_id', 'stop_processing', 'order', 'title', 'description', 'active'];

    /**
     * Route binder. Converts the key in the URL to the specified object (or throw 404).
     *
     * @param string $value
     *
     * @throws NotFoundHttpException
     * @return RuleGroup
     */
    public static function routeBinder(string $value): RuleGroup
    {
        if (auth()->check()) {
            $ruleGroupId = (int) $value;
            /** @var User $user */
            $user = auth()->user();
            /** @var RuleGroup $ruleGroup */
            $ruleGroup = $user->ruleGroups()->find($ruleGroupId);
            if (null !== $ruleGroup) {
                return $ruleGroup;
            }
        }
        throw new NotFoundHttpException;
    }

    /**
     * @codeCoverageIgnore
     * @return HasMany
     */
    public function rules(): HasMany
    {
        return $this->hasMany(Rule::class);
    }

    /**
     * @codeCoverageIgnore
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
