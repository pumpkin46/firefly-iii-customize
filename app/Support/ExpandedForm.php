<?php
/**
 * ExpandedForm.php
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

use Amount as Amt;
use Eloquent;
use FireflyIII\Support\Form\FormSupport;
use Illuminate\Support\Collection;
use Log;
use Throwable;

/**
 * Class ExpandedForm.
 *
 * @SuppressWarnings(PHPMD.TooManyMethods)
 *
 * @codeCoverageIgnore
 */
class ExpandedForm
{
    use FormSupport;

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function amountNoCurrency(string $name, $value = null, array $options = null): string
    {
        $options         = $options ?? [];
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['step'] = 'any';
        unset($options['currency'], $options['placeholder']);

        // make sure value is formatted nicely:
        if (null !== $value && '' !== $value) {
            $value = round((float)$value, 8);
        }
        try {
            $html = prefixView('form.amount-no-currency', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::error(sprintf('Could not render amountNoCurrency(): %s', $e->getMessage()));
            $html = 'Could not render amountNoCurrency.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param int    $value
     * @param mixed  $checked
     * @param array  $options
     *
     * @return string
     *
     */
    public function checkbox(string $name, int $value = null, $checked = null, array $options = null): string
    {
        $options            = $options ?? [];
        $value              = $value ?? 1;
        $options['checked'] = true === $checked;

        if (app('session')->has('preFilled')) {
            $preFilled          = session('preFilled');
            $options['checked'] = $preFilled[$name] ?? $options['checked'];
        }

        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        $value   = $this->fillFieldValue($name, $value);

        unset($options['placeholder'], $options['autocomplete'], $options['class']);
        try {
            $html = prefixView('form.checkbox', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render checkbox(): %s', $e->getMessage()));
            $html = 'Could not render checkbox.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function date(string $name, $value = null, array $options = null): string
    {
        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        $value   = $this->fillFieldValue($name, $value);
        unset($options['placeholder']);
        try {
            $html = prefixView('form.date', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render date(): %s', $e->getMessage()));
            $html = 'Could not render date.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param array  $options
     *
     * @return string
     *
     */
    public function file(string $name, array $options = null): string
    {
        $options = $options ?? [];
        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        try {
            $html = prefixView('form.file', compact('classes', 'name', 'label', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render file(): %s', $e->getMessage()));
            $html = 'Could not render file.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function integer(string $name, $value = null, array $options = null): string
    {
        $options         = $options ?? [];
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['step'] = '1';
        try {
            $html = prefixView('form.integer', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render integer(): %s', $e->getMessage()));
            $html = 'Could not render integer.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function location(string $name, $value = null, array $options = null): string
    {
        $options = $options ?? [];
        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        $value   = $this->fillFieldValue($name, $value);
        try {
            $html = prefixView('form.location', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render location(): %s', $e->getMessage()));
            $html = 'Could not render location.';
        }

        return $html;
    }

    /**
     * @param Collection $set
     *
     * @return array
     *
     */
    public function makeSelectListWithEmpty(Collection $set): array
    {
        $selectList    = [];
        $selectList[0] = '(none)';
        $fields        = ['title', 'name', 'description'];
        /** @var Eloquent $entry */
        foreach ($set as $entry) {
            $entryId = (int)$entry->id; // @phpstan-ignore-line
            $current = $entry->toArray();
            $title   = null;
            foreach ($fields as $field) {
                if (array_key_exists($field, $current) && null === $title) {
                    $title = $current[$field]; // @phpstan-ignore-line
                }
            }
            $selectList[$entryId] = $title;
        }
        return $selectList;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     */
    public function nonSelectableAmount(string $name, $value = null, array $options = null): string
    {
        $label            = $this->label($name, $options);
        $options          = $this->expandOptionArray($name, $label, $options);
        $classes          = $this->getHolderClasses($name);
        $value            = $this->fillFieldValue($name, $value);
        $options['step']  = 'any';
        $selectedCurrency = $options['currency'] ?? Amt::getDefaultCurrency();
        unset($options['currency'], $options['placeholder']);

        // make sure value is formatted nicely:
        if (null !== $value && '' !== $value) {
            $value = round((float)$value, $selectedCurrency->decimal_places);
        }
        try {
            $html = prefixView('form.non-selectable-amount', compact('selectedCurrency', 'classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render nonSelectableAmount(): %s', $e->getMessage()));
            $html = 'Could not render nonSelectableAmount.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function number(string $name, $value = null, array $options = null): string
    {
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['step'] = 'any';
        unset($options['placeholder']);
        try {
            $html = prefixView('form.number', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render number(): %s', $e->getMessage()));
            $html = 'Could not render number.';
        }

        return $html;
    }

    /**
     * @param null       $value
     * @param array|null $options
     *
     * @return string
     */
    public function objectGroup($value = null, array $options = null): string
    {
        $name            = 'object_group';
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['rows'] = 4;

        if (null === $value) {
            $value = '';
        }

        try {
            $html = prefixView('form.object_group', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render objectGroup(): %s', $e->getMessage()));
            $html = 'Could not render objectGroup.';
        }

        return $html;
    }

    /**
     * @param string $type
     * @param string $name
     *
     * @return string
     *
     */
    public function optionsList(string $type, string $name): string
    {
        try {
            $html = prefixView('form.options', compact('type', 'name'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render select(): %s', $e->getMessage()));
            $html = 'Could not render optionsList.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param array  $options
     *
     * @return string
     *
     */
    public function password(string $name, array $options = null): string
    {

        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        try {
            $html = prefixView('form.password', compact('classes', 'name', 'label', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render password(): %s', $e->getMessage()));
            $html = 'Could not render password.';
        }

        return $html;
    }

    /**
     * Function to render a percentage.
     *
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function percentage(string $name, $value = null, array $options = null): string
    {
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['step'] = 'any';
        unset($options['placeholder']);
        try {
            $html = prefixView('form.percentage', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render percentage(): %s', $e->getMessage()));
            $html = 'Could not render percentage.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function staticText(string $name, $value, array $options = null): string
    {
        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        try {
            $html = prefixView('form.static', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render staticText(): %s', $e->getMessage()));
            $html = 'Could not render staticText.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function text(string $name, $value = null, array $options = null): string
    {
        $label   = $this->label($name, $options);
        $options = $this->expandOptionArray($name, $label, $options);
        $classes = $this->getHolderClasses($name);
        $value   = $this->fillFieldValue($name, $value);
        try {
            $html = prefixView('form.text', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render text(): %s', $e->getMessage()));
            $html = 'Could not render text.';
        }

        return $html;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @param array  $options
     *
     * @return string
     *
     */
    public function textarea(string $name, $value = null, array $options = null): string
    {
        $label           = $this->label($name, $options);
        $options         = $this->expandOptionArray($name, $label, $options);
        $classes         = $this->getHolderClasses($name);
        $value           = $this->fillFieldValue($name, $value);
        $options['rows'] = 4;

        if (null === $value) {
            $value = '';
        }

        try {
            $html = prefixView('form.textarea', compact('classes', 'name', 'label', 'value', 'options'))->render();
        } catch (Throwable $e) { // @phpstan-ignore-line
            Log::debug(sprintf('Could not render textarea(): %s', $e->getMessage()));
            $html = 'Could not render textarea.';
        }

        return $html;
    }
}
