# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 5.5.13 - 2021-07-25

### Security

- This version of Firefly III fixes [CVE-2021-3663](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3663)

## 5.5.12 - 2021-06-03

⚠️ On July 1st 2021 the Docker tag will change to `fireflyiii/core`. You can already start using the new tag.

### Security

- This version of Firefly III fixes a security vulnerability in the export routine. You are advised to upgrade as soon as possible. All credits to the excellent @oomb.

## 5.5.11 - 2021-05-08

⚠️ On July 1st 2021 the Docker tag will change to `fireflyiii/core`. You can already start using the new tag.

### Fixed
- [Issue 4707](https://github.com/firefly-iii/firefly-iii/issues/4707) [issue 4732](https://github.com/firefly-iii/firefly-iii/issues/4732) Rule tests were broken, and matching transactions were not visible.
- [Issue 4729](https://github.com/firefly-iii/firefly-iii/issues/4729) Top boxes were no longer visible.
- [Issue 4730](https://github.com/firefly-iii/firefly-iii/issues/4730) Second split transaction had today's date
- [Issue 4734](https://github.com/firefly-iii/firefly-iii/issues/4734) Potential fixes for PostgreSQL and PHP 7.4.18.
- [Issue 4739](https://github.com/firefly-iii/firefly-iii/issues/4739) Was not possible to change liability type.

## 5.5.10 - 2021-05-01

### Changed
- [Issue 4708](https://github.com/firefly-iii/firefly-iii/issues/4708) When searching for the external ID, Firefly III will now only return the exact match.

### Fixed
- [Issue 4545](https://github.com/firefly-iii/firefly-iii/issues/4545) Rare but annoying issue with PostgreSQL increments will be repaired during image boot time. Thanks @jaylenw!
- [Issue 4710](https://github.com/firefly-iii/firefly-iii/issues/4710) Some rule actions could not handle liabilities.
- [Issue 4715](https://github.com/firefly-iii/firefly-iii/issues/4715) Fixed some titles.
- [Issue 4720](https://github.com/firefly-iii/firefly-iii/issues/4720) Could not remove a split in the new layout.

## 5.5.9 (API 1.5.2) 2021-04-24

This update fixes some of the more annoying issues in the new experimental v2 layout (see also [GitHub](https://github.com/firefly-iii/firefly-iii/issues/4618)), but some minor other issues as well.

### Fixed
- Dashboard preferences would some times retain old or bad data.

### API
- [Issue 4697](https://github.com/firefly-iii/firefly-iii/issues/4697) Submitting an existing account with an account number only would store it as a new account.
- [Issue 4706](https://github.com/firefly-iii/firefly-iii/issues/4706) Account interest was a float and not a string.
- Store Budget API call would not properly handle auto budgets.

## 5.5.8 (API 1.5.2) 2021-04-17

This update fixes some of the more annoying issues in the new experimental v2 layout (see also [GitHub](https://github.com/firefly-iii/firefly-iii/issues/4618)), but some minor other issues as well.

### Fixed
- [Issue 4656](https://github.com/firefly-iii/firefly-iii/issues/4656) [issue 4660](https://github.com/firefly-iii/firefly-iii/issues/4660) Various fixes in the v2 layout.
- [Issue 4663](https://github.com/firefly-iii/firefly-iii/issues/4663) It was possible to assign a budget to a transfer.
- [Issue 4664](https://github.com/firefly-iii/firefly-iii/issues/4664) Null pointer in bulk editor
- [Issue 4668](https://github.com/firefly-iii/firefly-iii/issues/4668) Inactive rule groups would not be listed.

## 5.5.7 (API 1.5.2) 2021-04-11

### Added
- [Issue 4627](https://github.com/firefly-iii/firefly-iii/issues/4627) The search and rule engine can search for any transaction with any bill or with no bill at all. Thanks, @devfaz! 

### Fixed
- [Issue 4625](https://github.com/firefly-iii/firefly-iii/issues/4625) Old MySQL servers would choke on the migrations.
- [Issue 4625](https://github.com/firefly-iii/firefly-iii/issues/4625) Some arrays are null when Firefly III starts for the first time.
- [Issue 4628](https://github.com/firefly-iii/firefly-iii/issues/4628) Every transaction appeared to have attachments.
- [Issue 4635](https://github.com/firefly-iii/firefly-iii/issues/4635) Export command ignores your dates. Thanks for the suggested fix, @urquilla!
- [Issue 4646](https://github.com/firefly-iii/firefly-iii/issues/4646) Empty select list


## 5.5.6 (API 1.5.2) 2021-04-09

Firefly III features a new *experimental* layout that I'm currently building. You can enable it by setting environment variable `FIREFLY_III_LAYOUT=v2`. Check out [GitHub](https://github.com/firefly-iii/firefly-iii/issues/4618) for the announcement and status updates. This release features an update API version. Check out [the difference](https://github.com/firefly-iii/api-docs-generator/compare/1.5.1...1.5.2).

### Fixed
- [Issue 4593](https://github.com/firefly-iii/firefly-iii/issues/4593) Could not change or update recurring repetition data.
- [Issue 4596](https://github.com/firefly-iii/firefly-iii/issues/4596) The error handler mailer mails about too many things.
- [Issue 4603](https://github.com/firefly-iii/firefly-iii/issues/4603) Call to bad RSA method.
- [Issue 4607](https://github.com/firefly-iii/firefly-iii/issues/4607) Bad code in set source / set destination rule actions meant that it would not fire in some cases.

### Security
- [Issue 4616](https://github.com/firefly-iii/firefly-iii/issues/4616) Firefly III has some extra security-related headers.

### API
- [Issue 4600](https://github.com/firefly-iii/firefly-iii/issues/4600) Sometimes empty amounts would not be properly picked up by the API.
- New endpoint to bulk update transactions.
- The chart API endpoint includes the time in the labels.

## 5.5.5

Skipped.

## 5.5.4

Skipped.

## 5.5.3 (API 1.5.1) 2021-04-03

### Changed
- Upgraded the render engine for the frontend.

### Fixed
- [Issue 4547](https://github.com/firefly-iii/firefly-iii/issues/4547) Call to bad function breaks several report.
- [Issue 4545](https://github.com/firefly-iii/firefly-iii/issues/4545) Migration error in some cases, fixed with an if-statement.
- [Issue 4557](https://github.com/firefly-iii/firefly-iii/issues/4557) LDAP configuration error in Docker image.
- [Issue 4560](https://github.com/firefly-iii/firefly-iii/issues/4560) The account number would be stored in the BIC field, if the BIC field was set.
- [Issue 4562](https://github.com/firefly-iii/firefly-iii/issues/4562) Hidden budgets were visible in v2.
- [Issue 4567](https://github.com/firefly-iii/firefly-iii/issues/4567) Missing translation marked as intentionally missing.
- [Issue 4570](https://github.com/firefly-iii/firefly-iii/issues/4570) It was impossible to set or change auto budgets.
- [Issue 4571](https://github.com/firefly-iii/firefly-iii/issues/4571) New layout could be one day behind in some cases.
- [Issue 4572](https://github.com/firefly-iii/firefly-iii/issues/4572) Link to reconcile page was broken.
- [Issue 4574](https://github.com/firefly-iii/firefly-iii/issues/4574) 500-error when trying to update bills.
- [Issue 4575](https://github.com/firefly-iii/firefly-iii/issues/4575) Add new date-ranges to the v2 index page.
- [Issue 4578](https://github.com/firefly-iii/firefly-iii/issues/4578) Fixed some time selection issues in v2.
- [Issue 4582](https://github.com/firefly-iii/firefly-iii/issues/4582) Inactive budgets would still get automated budget limits.

### API

This release features an update API version. Check out [the difference](https://github.com/firefly-iii/api-docs-generator/compare/1.5.0...1.5.1).


- All endpoints that used to deliver dates (`2021-04-27`) will now deliver date time strings (`2021-04-27T16:43:12+02:00`).
- [Issue 4566](https://github.com/firefly-iii/firefly-iii/issues/4566) Some API end points did not deliver the promised data.

## 5.5.2

Skipped.

## 5.5.1 (API 1.5.0) 2021-03-27

### Added

- [Issue 3717](https://github.com/firefly-iii/firefly-iii/issues/3717) The CSV export will also export all optional metadata.
- [Issue 4007](https://github.com/firefly-iii/firefly-iii/issues/4007) The message returned when updating transactions using a rull will return the number of changed transactions.
- [Issue 4334](https://github.com/firefly-iii/firefly-iii/issues/4334) Support for Portuguese! 🇵🇹
- [Issue 4338](https://github.com/firefly-iii/firefly-iii/issues/4338) The recurring transactions calendar was off by one day, this is now fixed.
- [Issue 4339](https://github.com/firefly-iii/firefly-iii/issues/4339) A bad redirect would send you to a 404.
- [Issue 4340](https://github.com/firefly-iii/firefly-iii/issues/4340) Any date related rule actions and triggers will pick up the correct date from the transaction.
- [Issue 4406](https://github.com/firefly-iii/firefly-iii/issues/4406) SQL errors when submitting large amounts to the budget overview are now fixed.
- [Issue 4412](https://github.com/firefly-iii/firefly-iii/issues/4412) The cron job could show you a null pointer.
- [Issue 4488](https://github.com/firefly-iii/firefly-iii/issues/4488) The Japanese Yen has been corrected to zero decimals.
- [Issue 4503](https://github.com/firefly-iii/firefly-iii/issues/4503) When bills skip a moment the amounts in the overview would be off.
- Firefly III now supports [webhooks](https://docs.firefly-iii.org/firefly-iii/pages-and-features/webhooks/).
- The search now also supports searching for transactions using `id:123`.

### Changed

- OAuth settings are visible for LDAP users.
- If you set `FIREFLY_III_LAYOUT=v2`, Firefly III will show you the new layout on pages where it's available.
- A new favicon based on the future logo of Firefly III.
- ⚠️ The URL to call the cron job from the web has changed to `api/v1/cron/[token here]`.

### Deprecated
- The current layout will no longer receive fixes and changes.

### Fixed
- [Issue 4045](https://github.com/firefly-iii/firefly-iii/issues/4045) The error message for "amount missing" now has a look up value
- [Issue 4055](https://github.com/firefly-iii/firefly-iii/issues/4055) The budget report crashed when opening.
- [Issue 4060](https://github.com/firefly-iii/firefly-iii/issues/4060) The remote user guard would show a 500 error about type conversion.
- [Issue 4070](https://github.com/firefly-iii/firefly-iii/issues/4070) Tagging recurring transactions would not work.
- [Issue 4071](https://github.com/firefly-iii/firefly-iii/issues/4071) Selecting piggy banks in rules was broken.
- [Issue 4074](https://github.com/firefly-iii/firefly-iii/issues/4074) Audit logging would break some Apache servers
- [Issue 4098](https://github.com/firefly-iii/firefly-iii/issues/4098) Search reports "Firefly III found 50 transactions in x seconds" even when it only finds one.
- [Issue 4108](https://github.com/firefly-iii/firefly-iii/issues/4108) Fix category update in bulk update.
- [Issue 4112](https://github.com/firefly-iii/firefly-iii/issues/4112) Broken redirect after delete.
- [Issue 4158](https://github.com/firefly-iii/firefly-iii/issues/4158) `strtolower` breaks some translations.
- [Issue 4162](https://github.com/firefly-iii/firefly-iii/issues/4162) Stop processing does not stop other rules in rule group
- [Issue 4169](https://github.com/firefly-iii/firefly-iii/issues/4169) Sorting by date on category Report sorts alphabetically instead.
- [Issue 4175](https://github.com/firefly-iii/firefly-iii/issues/4175) Bad math in long periods.
- [Issue 4186](https://github.com/firefly-iii/firefly-iii/issues/4186) Could not add translation link.
- [Issue 4200](https://github.com/firefly-iii/firefly-iii/issues/4200) A rare null pointer exception when running rules.
- [Issue 4207](https://github.com/firefly-iii/firefly-iii/issues/4207) Fix the "spent per day" box.
- [Issue 4231](https://github.com/firefly-iii/firefly-iii/issues/4231) Inconsistent hiding of columns.
- [Issue 4235](https://github.com/firefly-iii/firefly-iii/issues/4235) The info popup in the standard financial report does not apply report's account filter.
- [Issue 4241](https://github.com/firefly-iii/firefly-iii/issues/4241) A broken chart works again.
- [Issue 4520](https://github.com/firefly-iii/firefly-iii/issues/4520) RSA token generation is now PHP7/8 compatible.
- [Issue 4529](https://github.com/firefly-iii/firefly-iii/issues/4529) Convert transaction routine was broken.  
- PHP configurations that have "MB" as size indicator would be parsed badly.

### API

⚠️ *Lots of API changes, make sure you read [the documentation](https://api-docs.firefly-iii.org/).* ⚠️

- [Issue 4050](https://github.com/firefly-iii/firefly-iii/issues/4050) Updated Transaction Search API to set limit from user preferences
- [Issue 4113](https://github.com/firefly-iii/firefly-iii/issues/4113) Piggy Bank API Deletes Some Piggy Metadata
- [Issue 4122](https://github.com/firefly-iii/firefly-iii/issues/4122) Remove reconciliation accounts from autocomplete
- [Issue 4195](https://github.com/firefly-iii/firefly-iii/issues/4195) User endpoint was broken.
- [Issue 4199](https://github.com/firefly-iii/firefly-iii/issues/4199) Unable to update tags using API.
- [Issue 4394](https://github.com/firefly-iii/firefly-iii/issues/4394) Storing budgets works again.
- [Issue 4426](https://github.com/firefly-iii/firefly-iii/issues/4426) Storing accounts would lead to bad capitalization in liability type.
- [Issue 4435](https://github.com/firefly-iii/firefly-iii/issues/4435) Storing piggy banks with object group information would fail.
- Users can submit almost any field without other fields changing as well.

## 5.5.0 

Skipped.

## 5.4.6 (API 1.4.0) - 2020-10-07

### Added
- [Issue 4031](https://github.com/firefly-iii/firefly-iii/issues/4031) Rule groups can be collapsed.
- [Issue 4002](https://github.com/firefly-iii/firefly-iii/issues/4002) Category now support notes, although they're not displayed anywhere yet.

### Changed
- Upgrade to Laravel 8

### Fixed
- [Issue 4001](https://github.com/firefly-iii/firefly-iii/issues/4001) [issue 4005](https://github.com/firefly-iii/firefly-iii/issues/4005) [issue 4011](https://github.com/firefly-iii/firefly-iii/issues/4011) Special characters are double escaped.
- [Issue 4006](https://github.com/firefly-iii/firefly-iii/issues/4006) Unclear error message fixed.
- [Issue 4015](https://github.com/firefly-iii/firefly-iii/issues/4015) Better handling of headers in Apache.
- [Issue 4023](https://github.com/firefly-iii/firefly-iii/issues/4023) Fix issue with logout and admin view.
- Missing help text can now be translated.
- Demo sites send messages to me, not "demo@firefly".

## 5.4.5 (API 1.4.0) - 2020-10-28

### Fixed
- [Issue 3853](https://github.com/firefly-iii/firefly-iii/issues/3853) Could not create rules with IBAN values.
- [Issue 3991](https://github.com/firefly-iii/firefly-iii/issues/3991) Hardcoded array key broke editing.
- [Issue 3992](https://github.com/firefly-iii/firefly-iii/issues/3992) Amount problems in account chart for multi-currency charts.
- [Issue 4000](https://github.com/firefly-iii/firefly-iii/issues/4000) Budget chart did not handle multiple currencies well.
- [Issue 4003](https://github.com/firefly-iii/firefly-iii/issues/4003) Was unable to create new auto budget limits in foreign currency.

### Security
- [Issue 3990](https://github.com/firefly-iii/firefly-iii/issues/3990) Unescaped content could break the auto-complete.

## 5.4.4 (API 1.4.0) - 2020-10-24

### Changed
- [Issue 3885](https://github.com/firefly-iii/firefly-iii/issues/3885) You can create a user from CLI.
- Various code changes and upgrades. See [issue 3957](https://github.com/firefly-iii/firefly-iii/issues/3957)

### Fixed
- [Issue 3871](https://github.com/firefly-iii/firefly-iii/issues/3871) Remove initial balance accounts from the auto-complete list.
- [Issue 3898](https://github.com/firefly-iii/firefly-iii/issues/3898) It was impossible to rename a group.
- [Issue 3900](https://github.com/firefly-iii/firefly-iii/issues/3900) Execution of inactive rules.
- [Issue 3901](https://github.com/firefly-iii/firefly-iii/issues/3901) Rules not executed in correct order.
- [Issue 3902](https://github.com/firefly-iii/firefly-iii/issues/3902) Rule values for target account id not accepted.
- [Issue 3903](https://github.com/firefly-iii/firefly-iii/issues/3903) Long search queries may break the query parser.
- [Issue 3909](https://github.com/firefly-iii/firefly-iii/issues/3909) Foreign amount button was hidden.
- [Issue 3913](https://github.com/firefly-iii/firefly-iii/issues/3913) Extra space in currency name.
- [Issue 3914](https://github.com/firefly-iii/firefly-iii/issues/3914) Bad paths.
- [Issue 3915](https://github.com/firefly-iii/firefly-iii/issues/3915) LDAP users could not use tokens.
- [Issue 3940](https://github.com/firefly-iii/firefly-iii/issues/3940) Fix broken links
- [Issue 3942](https://github.com/firefly-iii/firefly-iii/issues/3942) Bad data validation
- [Issue 3953](https://github.com/firefly-iii/firefly-iii/issues/3953) Renaming categories would not rename the recurring transactions' category.
- [Issue 3968](https://github.com/firefly-iii/firefly-iii/issues/3968) Remove group from bill was broken.
- [Issue 3973](https://github.com/firefly-iii/firefly-iii/issues/3973) Remove attachment broken reference.
- [Issue 3974](https://github.com/firefly-iii/firefly-iii/issues/3974) Remove account from preferences when set inactive.
- [Issue 3978](https://github.com/firefly-iii/firefly-iii/issues/3978) Fix budget index
- [Issue 3983](https://github.com/firefly-iii/firefly-iii/issues/3983) Fix old help links
- [Issue 3985](https://github.com/firefly-iii/firefly-iii/issues/3985) Old SQL parameter removed.

## 5.4.3 (API 1.4.0) - 2020-10-03

### Added
- [Issue 3592](https://github.com/firefly-iii/firefly-iii/issues/3592) You can now add an alternative email address to users when using the external user guard. See the `.env.example` for instructions.
- [Issue 3863](https://github.com/firefly-iii/firefly-iii/issues/3863) Sonarcloud.io badges in the readme file, thanks @lastlink
- Support for Slovak

### Changed
- [Issue 3875](https://github.com/firefly-iii/firefly-iii/issues/3875) Budgets also count foreign currency transactions.
- Docker image runs PHP 7.4.11

### Fixed
- [Issue 3824](https://github.com/firefly-iii/firefly-iii/issues/3824) Hard-coded links broken.
- [Issue 3850](https://github.com/firefly-iii/firefly-iii/issues/3850) Preview was broken for boolean search operators
- [Issue 3853](https://github.com/firefly-iii/firefly-iii/issues/3853) Broken rule triggers when handling accounts.
- [Issue 3855](https://github.com/firefly-iii/firefly-iii/issues/3855) Broken manifest file.
- [Issue 3858](https://github.com/firefly-iii/firefly-iii/issues/3858) Broken pagination, thanks @sephrat.
- [Issue 3862](https://github.com/firefly-iii/firefly-iii/issues/3862) Split transactions could not be edited.
- [Issue 3879](https://github.com/firefly-iii/firefly-iii/issues/3879) Category popup broken.
- [Issue 3881](https://github.com/firefly-iii/firefly-iii/issues/3881) Could store multiple budget limits due to a broken check.
- [Issue 3884](https://github.com/firefly-iii/firefly-iii/issues/3884) Transaction edit form was improperly updated when removing splits.
- [Issue 3887](https://github.com/firefly-iii/firefly-iii/issues/3887) Could not remove bill from transaction.
- [Issue 3893](https://github.com/firefly-iii/firefly-iii/issues/3893) Fix budget bars.
- [Issue 3894](https://github.com/firefly-iii/firefly-iii/issues/3894) Fix auto-complete code.
- Budget overview properly takes weekly budgets into account, even when on a monthly list.

### API
- [Issue 3880](https://github.com/firefly-iii/firefly-iii/issues/3880) Could not post new amount.

## 5.4.2 (API 1.4.0) - 2020-09-24

Fixes exotic and regression bugs.

### Added
- [Issue 3828](https://github.com/firefly-iii/firefly-iii/issues/3828) The admin pages now respect LDAP.

### Fixed
- LDAP and 2FA should work again.
- [Issue 3822](https://github.com/firefly-iii/firefly-iii/issues/3822) Fix web manifest file.
- [Issue 3823](https://github.com/firefly-iii/firefly-iii/issues/3823) [issue 3837](https://github.com/firefly-iii/firefly-iii/issues/3837) Several pages fail when no notes are present in the object.
- [Issue 3826](https://github.com/firefly-iii/firefly-iii/issues/3826) Long non-English words could break the login page.
- [Issue 3831](https://github.com/firefly-iii/firefly-iii/issues/3831) Filtering on notes did not work properly.
- [Issue 3839](https://github.com/firefly-iii/firefly-iii/issues/3839) Cannot display tag details
- [Issue 3840](https://github.com/firefly-iii/firefly-iii/issues/3840) Search + rule engine breaks for various filters
- [Issue 3841](https://github.com/firefly-iii/firefly-iii/issues/3841) "Bill" value required on split transaction
- [Issue 3842](https://github.com/firefly-iii/firefly-iii/issues/3842) Missing translations.
- [Issue 3843](https://github.com/firefly-iii/firefly-iii/issues/3843) Can't use boolean filters in rule creation
- [Issue 3844](https://github.com/firefly-iii/firefly-iii/issues/3844) Correct filter use from rule engine
- [Issue 3847](https://github.com/firefly-iii/firefly-iii/issues/3847) Setting available amount did not work.

## 5.4.1 (API 1.4.0) - 2020-09-21

As usual, a same-day release fixing some exotic bugs.

### Added
- DB version info.

### Fixed
- [Issue 3809](https://github.com/firefly-iii/firefly-iii/issues/3809) Issue with LDAP logins fixed.
- [Issue 3816](https://github.com/firefly-iii/firefly-iii/issues/3816) Issue with account lists being empty.

## 5.4.0 (API 1.4.0) - 2020-09-21

Some warnings before you install this version:

- ⚠️ Some changes in this release may be backwards incompatible (see below).
- ⚠️ Invalid triggers in a non-strict rule will cause Firefly III to select ALL transactions.
- ⚠️ The `export` volume is no longer used (Docker).
- ⚠️ The `upload` volume is now located at `/var/www/html/storage/upload` (Docker).

Several alpha and beta releases preceded this release.

- 5.4.0-alpha.1 on 2020-08-14
- 5.4.0-alpha.2 on 2020-08-21
- 5.4.0-alpha.3 on 2020-08-21
- 5.4.0-beta.1 on 2020-09-13

### Known issues

Yep, unfortunately.

- [Issue 3808](https://github.com/firefly-iii/firefly-iii/issues/3808) When using the remote authentication features of Firefly III, autocomplete endpoints will fail.

### Added
- [Issue 3187](https://github.com/firefly-iii/firefly-iii/issues/3187) A new field for transaction URL's.
- [Issue 3200](https://github.com/firefly-iii/firefly-iii/issues/3200) The ability to sort your accounts as you see fit.
- [Issue 3213](https://github.com/firefly-iii/firefly-iii/issues/3213) Add totals to the budget page.
- [Issue 3238](https://github.com/firefly-iii/firefly-iii/issues/3238) You can select an expense when creating a transaction.
- [Issue 3240](https://github.com/firefly-iii/firefly-iii/issues/3240) Meta data and UI changes to count recurring transactions.
- [Issue 3246](https://github.com/firefly-iii/firefly-iii/issues/3246) Ability to add tags in the mass editor, not just replace them.
- [Issue 3265](https://github.com/firefly-iii/firefly-iii/issues/3265) A warning when split transactions may be changed by Firefly III.
- [Issue 3382](https://github.com/firefly-iii/firefly-iii/issues/3382) Fixed transfers not showing the right +/- sign, by @sephrat
- [Issue 3435](https://github.com/firefly-iii/firefly-iii/issues/3435) Create a recurring transaction from a single transaction.
- [Issue 3451](https://github.com/firefly-iii/firefly-iii/issues/3451) Add a message on the bottom of the transaction screen so you see any errors.
- [Issue 3475](https://github.com/firefly-iii/firefly-iii/issues/3475) A summary for the box with bills.
- [Issue 3583](https://github.com/firefly-iii/firefly-iii/issues/3583) You can set your own custom guard header for third party authentication.
- [Issue 3604](https://github.com/firefly-iii/firefly-iii/issues/3604) Add CI support by @hoshsadiq
- [Issue 3638](https://github.com/firefly-iii/firefly-iii/issues/3638) Added better UTF8 support on Windows, by @sephrat
- [Issue 3642](https://github.com/firefly-iii/firefly-iii/issues/3642) Redis now supports Unix sockets.
- [Issue 3648](https://github.com/firefly-iii/firefly-iii/issues/3648) Add a basic copy/paste feature.
- [Issue 3651](https://github.com/firefly-iii/firefly-iii/issues/3651) Now supports public clients.
- [Issue 3755](https://github.com/firefly-iii/firefly-iii/issues/3755) You can now click option groups in the report pages.
- [Issue 3765](https://github.com/firefly-iii/firefly-iii/issues/3765) Tag page sum list is now currency aware.
- A new integrity check that makes sure all transaction types are correct.
- Support for Bulgarian! 🇧🇬

### Changed
- ⚠️ All auto-complete code now uses the API; let me know if errors occur.
- ⚠️ New rule processing engine, which is much faster than the old one, especially on large datasets. Expect several magnitudes of time improvements.
- ⚠️ Many new search operators, which are documented [in the documentation](https://docs.firefly-iii.org/concepts/search).
- [Issue 3578](https://github.com/firefly-iii/firefly-iii/issues/3578) Use php-intl to do currency formatting, made by @hoshsadiq
- [Issue 3586](https://github.com/firefly-iii/firefly-iii/issues/3586) Removed features that aren't necessary when using third party auth providers.
- [Issue 3659](https://github.com/firefly-iii/firefly-iii/issues/3659) Update the readme to include third party apps.
- Fixed audit logs.

### Fixed
- [Issue 3519](https://github.com/firefly-iii/firefly-iii/issues/3519) Locales should work better on Windows 10.
- [Issue 3577](https://github.com/firefly-iii/firefly-iii/issues/3577) Add liability accounts when transforming transactions.
- [Issue 3585](https://github.com/firefly-iii/firefly-iii/issues/3585) Fix issue with category lists in reports.
- [Issue 3598](https://github.com/firefly-iii/firefly-iii/issues/3598) [issue 3597](https://github.com/firefly-iii/firefly-iii/issues/3597) Bad code in create recurring page, fixed by @maroux
- [Issue 3630](https://github.com/firefly-iii/firefly-iii/issues/3630) Fix the cron job used for auto budgeting.
- [Issue 3635](https://github.com/firefly-iii/firefly-iii/issues/3635) Fix a copy/paste error in translations, by @sephrat
- [Issue 3638](https://github.com/firefly-iii/firefly-iii/issues/3638) Remove unused warning, by @sephrat
- [Issue 3639](https://github.com/firefly-iii/firefly-iii/issues/3639) Remove unused translations, by @sephrat
- [Issue 3640](https://github.com/firefly-iii/firefly-iii/issues/3640) Hide empty budget lists, by @sephrat
- [Issue 3641](https://github.com/firefly-iii/firefly-iii/issues/3641) Elegant solution to fix piggy bank groups, by @sephrat
- [Issue 3673](https://github.com/firefly-iii/firefly-iii/issues/3673) Search limit was ignored.
- [Issue 3675](https://github.com/firefly-iii/firefly-iii/issues/3675) Was unable to update transaction currency.
- [Issue 3678](https://github.com/firefly-iii/firefly-iii/issues/3678) Search did not distinguish between source and destination.
- [Issue 3679](https://github.com/firefly-iii/firefly-iii/issues/3679) Polish and Russian translations were broken on the `/rules` page, fixed by @sephrat
- [Issue 3681](https://github.com/firefly-iii/firefly-iii/issues/3681) Fix Czech translations missing file on `/profile` page.
- [Issue 3693](https://github.com/firefly-iii/firefly-iii/issues/3693) Creating users through the API was impossible.
- [Issue 3696](https://github.com/firefly-iii/firefly-iii/issues/3696) Fix missing translations, by @sephrat
- [Issue 3710](https://github.com/firefly-iii/firefly-iii/issues/3710) When you create a split transaction, the title isn't correctly reset.
- [Issue 3745](https://github.com/firefly-iii/firefly-iii/issues/3745) In some cases, piggy bank events were not created.
- [Issue 3746](https://github.com/firefly-iii/firefly-iii/issues/3746) Bad anchor link in readme, thanks @GrayStrider
- [Issue 3748](https://github.com/firefly-iii/firefly-iii/issues/3748) Typo's in autocomplete URL, thanks @psychowood
- [Issue 3759](https://github.com/firefly-iii/firefly-iii/issues/3759) Bad budget calculations when using out-of-sync budgets.
- [Issue 3761](https://github.com/firefly-iii/firefly-iii/issues/3761) Could not create a transfer and refer to a piggy bank by name. 
- [Issue 3768](https://github.com/firefly-iii/firefly-iii/issues/3768) Attachments were uploaded out of order in split transactions.
- [Issue 3770](https://github.com/firefly-iii/firefly-iii/issues/3770) Null pointer exception when creating transaction.
- [Issue 3772](https://github.com/firefly-iii/firefly-iii/issues/3772) Some strings were translated badly.
- [Issue 3789](https://github.com/firefly-iii/firefly-iii/issues/3789) Heroku installation failed because of bad DB code.
- [Issue 3791](https://github.com/firefly-iii/firefly-iii/issues/3791) Several issues on the budgets page fixed.
- Reconciliation transactions now show the amount correctly.

### API
- [Issue 3150](https://github.com/firefly-iii/firefly-iii/issues/3150) New routes for easy auto complete in 3rd party applications.
- New endpoint for the transaction links of a specific transaction.

## 5.3.3 (API 1.3.0) - 2020-07-17

### Fixed
- [Issue 3565](https://github.com/firefly-iii/firefly-iii/issues/3565) Spelling error in API array.
- [Issue 3566](https://github.com/firefly-iii/firefly-iii/issues/3566) Fix issue in bills chart.
- [Issue 3568](https://github.com/firefly-iii/firefly-iii/issues/3568) Fix issue with floating number.
- [Issue 3573](https://github.com/firefly-iii/firefly-iii/issues/3573) Fix link in readme.
- [Issue 3574](https://github.com/firefly-iii/firefly-iii/issues/3574) Fix issue with floating number.

## 5.3.2 (API 1.3.0) - 2020-07-13

### Fixed
- Issue when installing Firefly III using composer.
- Issue when installing Firefly III using the latest Docker image.

## 5.3.1 (API 1.3.0) - 2020-07-12

### Added
- Extra logging in case of database errors at first launch.

### Changed
- Completely rewrote the [security policy](https://github.com/firefly-iii/firefly-iii/security/policy).

### Fixed
- [Issue 3532](https://github.com/firefly-iii/firefly-iii/issues/3532) Fix empty validation messages.
- Profile methods to change email / password were broken.
- Heroku will build again.
- Some integers were not properly cast to strings.
- Fixed several timezone issues when generated the dashboard account chart.

### API
- [Issue 3546](https://github.com/firefly-iii/firefly-iii/issues/3546) New endpoints to selectively delete data.
- [Issue 3554](https://github.com/firefly-iii/firefly-iii/issues/3554) Consistent parsing for amounts. 

## 5.3.0 (API 1.2.0) - 2020-07-03

Several alpha and beta releases preceded this release.

- 5.3.0-alpha.1 on 2020-06-22
- 5.3.0-beta.1 on 2020-06-28
- 5.3.0-beta.1 on 2020-07-01

### Added
- [Issue 3184](https://github.com/firefly-iii/firefly-iii/issues/3184) You can now use the `REMOTE_USER` field to authenticate. Read [the documentation](https://docs.firefly-iii.org/advanced-installation/authentication#remote-user) carefully.
- [Issue 3392](https://github.com/firefly-iii/firefly-iii/issues/3392) Notes will be included in the export.
- [Issue 3398](https://github.com/firefly-iii/firefly-iii/issues/3398) You can clear the cache directly from the admin.
- [Issue 3403](https://github.com/firefly-iii/firefly-iii/issues/3403) More triggers have been added that respond to the date of a transaction. Read [the documentation](https://docs.firefly-iii.org/advanced-concepts/rules)
- Piggy banks and bills can be divided over groups. Groups can be sorted on a separate page. This may prove to be useful to organize these objects. The feature
 will expand to even more objects in the future. Empty groups will be automatically deleted; you can only create groups by editing the objects.
- You can now add attachments to recurring transactions.
- You can invalidate other logins, check out the button on the `/profile` page.
- It is now possible to search for `internal_reference:abc` and / or `external_id:123`.
- The bill overview has some better sums on the bottom of the page.

### Changed
- [Issue 3440](https://github.com/firefly-iii/firefly-iii/issues/3440) You can now sort rules more easily.
- [Issue 3455](https://github.com/firefly-iii/firefly-iii/issues/3455) There are new translations for the debug page.
- [Issue 3461](https://github.com/firefly-iii/firefly-iii/issues/3461) Inactive rules are no longer applied, even when you try to force them.
- [Issue 3469](https://github.com/firefly-iii/firefly-iii/issues/3469) Fix issue with `round()`.
- Firefly III now requires **PHP 7.4**. PHP7.4 specific features have been introduced to make sure you upgrade.
- The Docker image is running on **port 8080**. Please update your configuration to reflect this.
- Firefly III has been upgraded to Laravel 7.
- From this release on, the Dockerfile and default configuration will install MySQL (using MariaDB) instead of PostgreSQL. This doesn't influence existing
 installations.
- The example environment file has several fixes to make it more clear what features are for.
- Sandstorm support is now entirely decrepated.
- The max upload size is now larger. Although mostly enforced by your server, Firefly III used to have a very low upper limit.
- The `MAIL_DRIVER` variable is now called `MAIL_MAILER`.

### Removed
- [Issue 3517](https://github.com/firefly-iii/firefly-iii/issues/3517) The category no longer shows income because it skewed the chart and made it useless.
- All import routines have been removed. Use the separate importers. Read [the documentation](https://docs.firefly-iii.org/importing-data/introduction).
- No more locale settings if using Docker.

### Fixed
- [Issue 3450](https://github.com/firefly-iii/firefly-iii/issues/3450) Brought back missing translations.
- [Issue 3454](https://github.com/firefly-iii/firefly-iii/issues/3454) Fixed some translations.
- [Issue 3437](https://github.com/firefly-iii/firefly-iii/issues/3437) The "days left" counter now responds better.
- [Issue 3427](https://github.com/firefly-iii/firefly-iii/issues/3427) HTML included in error codes
- [Issue 3489](https://github.com/firefly-iii/firefly-iii/issues/3489) Several unescaped strings.
- [Issue 3490](https://github.com/firefly-iii/firefly-iii/issues/3490) Fix search issues when using special characters.
- [Issue 3488](https://github.com/firefly-iii/firefly-iii/issues/3488) Fix token text box.
- [Issue 3509](https://github.com/firefly-iii/firefly-iii/issues/3509) Tag view now handles future transactions better.
- [Issue 3513](https://github.com/firefly-iii/firefly-iii/issues/3513) Fix issue with charts on budget page.
- Fixed a null pointer in session date.
- Fixed bad UUID generation.
- Internal consistency checks for transaction groups.
- The bill date would some times report the future.

### API
- [Issue 3493](https://github.com/firefly-iii/firefly-iii/issues/3493) Fix API issue when handling default currencies.
- [Issue 3506](https://github.com/firefly-iii/firefly-iii/issues/3506) Search transactions end point
- New API for object groups.
- Expanded API for piggy banks to support object groups.
- Expanded API for bills to support object groups.

### Known issues
- You may run into date conversion problems if you're living on the right side of GMT. If transactions appear a day early, let me know.

## 5.2.8 (API 1.1.0) - 2020-06-02

### Fixed
- [Issue 3443](https://github.com/firefly-iii/firefly-iii/issues/3443) Fixed issue with composer installation.

## 5.2.7 (API 1.1.0) - 2020-06-01

### Added
- Firefly III **optional + opt-in** telemetry can now be enabled, if you want to. Read more about it [here](https://docs.firefly-iii.org/support/telemetry).
- [Issue 3133](https://github.com/firefly-iii/firefly-iii/issues/3133) You can remove attachments before you create a transaction.
- [Issue 3395](https://github.com/firefly-iii/firefly-iii/issues/3395) Emails sent by Firefly III have been translated. See the note at the bottom. Thanks to @sephrat
- [Issue 3393](https://github.com/firefly-iii/firefly-iii/issues/3393) New SSL options for LDAP and MySQL. Thanks to @bpatath.
- [Issue 3413](https://github.com/firefly-iii/firefly-iii/issues/3413) Better string pluralization. Thanks to @sephrat
- [Issue 3297](https://github.com/firefly-iii/firefly-iii/issues/3297) Rule trigger for foreign currency ID

### Changed
- The default Docker Compose configuration and documentation switched from PostgreSQL to MariaDB. This will NOT affect existing installations unless you
 change your docker compose file.
- [Issue 3404](https://github.com/firefly-iii/firefly-iii/issues/3404) The profile page has been translated. See the note at the bottom. Thanks to @sephrat
- [Issue 3405](https://github.com/firefly-iii/firefly-iii/issues/3405) All error pages have been translated. See the note at the bottom. Thanks to @sephrat

### Fixed
- [Issue 3309](https://github.com/firefly-iii/firefly-iii/issues/3309) New budgets would create bad budget limits.
- [Issue 3390](https://github.com/firefly-iii/firefly-iii/issues/3390) Typos and minor text inconsistencies fixed by @sephrat
- [Issue 3407](https://github.com/firefly-iii/firefly-iii/issues/3407) [issue 3408](https://github.com/firefly-iii/firefly-iii/issues/3408) The total transaction amount displayed is no longer empty for opening balances by @sephrat
- [Issue 3409](https://github.com/firefly-iii/firefly-iii/issues/3409) [issue 3420](https://github.com/firefly-iii/firefly-iii/issues/3420) Double accounts no longer listed by @sephrat
- [Issue 3427](https://github.com/firefly-iii/firefly-iii/issues/3427) Add a time-out to version update check. More improvements are coming.
- [Issue 3419](https://github.com/firefly-iii/firefly-iii/issues/3419) Error fixed which would prevent you from adding money to a piggy bank, by @sephrat
- [Issue 3425](https://github.com/firefly-iii/firefly-iii/issues/3425) Budget amount had no validation.
- [Issue 3428](https://github.com/firefly-iii/firefly-iii/issues/3428) Reconciliation "select all"-button would miscalculate.
- [Issue 3415](https://github.com/firefly-iii/firefly-iii/issues/3415) New error views

A note about new translations: text you see in errors and emails may still be in English. This is not a bug. Translated text is sometimes generated outside of
 what's called the user's "session". When Firefly III operates outside of your session, it can't access your preferences or your data. It doesn't know what
  language to pick. You can set the `DEFAULT_LANGUAGE`-environment variable. But user specific preferences may be ignored. 

## 5.2.6 (API 1.1.0) - 2020-05-22

### Added
- [Issue 3049](https://github.com/firefly-iii/firefly-iii/issues/3049) New transaction triggers for dates.
- Warning if recurring transactions no longer run.
- View fixed for recurring transactions.
- A new rule action that will DELETE transactions.
- Four-week reminder to check for updates if you disabled updates.

### Changed
- [Issue 3011](https://github.com/firefly-iii/firefly-iii/issues/3011) Reconciliation page has "select all"-button and remembers checkboxes even when you refresh the page.
- [Issue 3348](https://github.com/firefly-iii/firefly-iii/issues/3348) Smarter menu for accounts on the dashboard
- Demo user can't upload attachments.
- Demo user can't set locale.

### Fixed
- [Issue 3339](https://github.com/firefly-iii/firefly-iii/issues/3339) Could not mass-delete reconciliation transactions.
- [Issue 3344](https://github.com/firefly-iii/firefly-iii/issues/3344) Could not attach files to accounts.
- [Issue 3335](https://github.com/firefly-iii/firefly-iii/issues/3335) Fix reconciliation currency account, thanks to @maksimkurb
- [Issue 3350](https://github.com/firefly-iii/firefly-iii/issues/3350) Better charts in account overview
- [Issue 3355](https://github.com/firefly-iii/firefly-iii/issues/3355) Better sorting for bills in reports.
- [Issue 3363](https://github.com/firefly-iii/firefly-iii/issues/3363) New strings translated, thanks to @sephrat
- [Issue 3367](https://github.com/firefly-iii/firefly-iii/issues/3367) Error in views when uploading > 1 attachments
- [Issue 3368](https://github.com/firefly-iii/firefly-iii/issues/3368) Wrong hover-text
- [Issue 3374](https://github.com/firefly-iii/firefly-iii/issues/3374) Inconsistent net worth calculation. You may seem to lose money.
- [Issue 3376](https://github.com/firefly-iii/firefly-iii/issues/3376) Better rule ordering when cloning rules.
- [Issue 3381](https://github.com/firefly-iii/firefly-iii/issues/3381) Fix for LDAP
- Better rounding for budget amounts.

## 5.2.5 (API 1.1.0) - 2020-05-04

### Added
- Some warnings that custom locales may not work on Windows or in Docker images.

### Changed
- [Issue 3305](https://github.com/firefly-iii/firefly-iii/issues/3305) User [@lguima](https://github.com/lguima) revamped the left side menu and associated icons.

### Fixed
- [Issue 3307](https://github.com/firefly-iii/firefly-iii/issues/3307) Editing or creating accounts would automatically give them a location.
- [Issue 3314](https://github.com/firefly-iii/firefly-iii/issues/3314) Future transactions would not always be visible, even when the daterange should include them.
- [Issue 3318](https://github.com/firefly-iii/firefly-iii/issues/3318) Cron called over URL would skip auto-budgets.
- [Issue 3321](https://github.com/firefly-iii/firefly-iii/issues/3321) API for piggy bank funds would create events with the wrong amount.
- [Issue 3330](https://github.com/firefly-iii/firefly-iii/issues/3330) Transactions not stored at 00:00 would be excluded from some views.

## 5.2.4 (API 1.1.0) - 2020-04-26

### Fixed
- [Issue 3287](https://github.com/firefly-iii/firefly-iii/issues/3287) Locale issue
- [Issue 3251](https://github.com/firefly-iii/firefly-iii/issues/3251) Budget order

## 5.2.3 (API 1.1.0) - 2020-04-22

### Added
- Support for British English! 🇬🇧
- You can set your locale *and* your language now.

### Changed
- [Issue 3270](https://github.com/firefly-iii/firefly-iii/issues/3270) Wrong average in budget table.

### Fixed
- [Issue 3264](https://github.com/firefly-iii/firefly-iii/issues/3264) Error when exporting recurring transactions
- [Issue 3272](https://github.com/firefly-iii/firefly-iii/issues/3272) Rule issue when using "set source account" action.
- [Issue 3281](https://github.com/firefly-iii/firefly-iii/issues/3281) Bad markdown parsing in piggy banks.
- [Issue 3284](https://github.com/firefly-iii/firefly-iii/issues/3284) Recurring transactions with bad info couldn't be rendered.

## 5.2.2 (API 1.1.0) - 2020-04-14

### Fixed
- [Issue 3529](https://github.com/firefly-iii/firefly-iii/issues/3529) Issue with rule execution.
- [Issue 3263](https://github.com/firefly-iii/firefly-iii/issues/3263) Issue with new user account creation.

## 5.2.2 (API 1.1.0) - 2020-04-13

### Fixed
- Virtual balance would always be stored as "0.0" despite the field being nullable.
- The rule action "set source account" was improperly configured.

## 5.2.1 (API 1.1.0) - 2020-04-10

Firefly III 5.2.1 fixes an issue with charts and allows users to store budgets again.

## 5.2.0 (API 1.1.0) - 2020-04-10

- ⚠️ This will be the last version to support PHP version 7.3. The next release will require PHP **7.4**
- ⚠️ The bunq and CSV import routines have been disabled and replaced by their stand alone variants: [bunq](https://github.com/firefly-iii/bunq-importer), [CSV](https://github.com/firefly-iii/csv-importer).

This release was preceded by a number of test versions:

- 5.2.0-alpha.1 on 2020-03-24
- 5.2.0-beta.1 on 2020-04-02

### Added
- [Issue 2578](https://github.com/firefly-iii/firefly-iii/issues/2578) Allows users to create automatic budget configurations to rollover or set periodic limits.
- [Issue 2726](https://github.com/firefly-iii/firefly-iii/issues/2726) Added new pie charts on the transaction index pages. 
- [Issue 2957](https://github.com/firefly-iii/firefly-iii/issues/2957) A new button to duplicate rules
- [Issue 2828](https://github.com/firefly-iii/firefly-iii/issues/2828) More objects now support attachments: accounts, bills, budgets, categories, piggy banks and tags.
- [Issue 2938](https://github.com/firefly-iii/firefly-iii/issues/2938) Expense and revenue accounts show their balances better.
- [Issue 2977](https://github.com/firefly-iii/firefly-iii/issues/2977) On the budget page, the bars and amounts auto update.
- [Issue 3079](https://github.com/firefly-iii/firefly-iii/issues/3079) Version is now visible in the footer on mobile.
- Support for Vietnamese 🇻🇳

### Changed
- [Issue 2985](https://github.com/firefly-iii/firefly-iii/issues/2985) Updating an object (like a budget or a bill) will also update the associated rule, if any.
- [Issue 3057](https://github.com/firefly-iii/firefly-iii/issues/3057) Several form changes to improve the usability of the transaction input form.
- [Issue 3048](https://github.com/firefly-iii/firefly-iii/issues/3048) Rules can now handle liabilities as source or destination.
- [Issue 2999](https://github.com/firefly-iii/firefly-iii/issues/2999) The category chart on the frontpage now displays income.
- [Issue 2997](https://github.com/firefly-iii/firefly-iii/issues/2997) The tag list has categories.
- [Issue 3122](https://github.com/firefly-iii/firefly-iii/issues/3122) Buttons on the top of lists.
- The Docker maximum file attachment size has been increased to 64M.
- The CSV file importer has been disabled. Find the [new CSV importer on GitHub](https://github.com/firefly-iii/csv-importer).

### Fixed
- [Issue 3154](https://github.com/firefly-iii/firefly-iii/issues/3154) `bcadd()` problems for users who were already running PHP7.4.
- [Issue 3193](https://github.com/firefly-iii/firefly-iii/issues/3193) Copying a reconciled transaction correctly removes the reconciliation status.
- [Issue 3003](https://github.com/firefly-iii/firefly-iii/issues/3003) Tables will look less crowded on your phone.
- [Issue 3202](https://github.com/firefly-iii/firefly-iii/issues/3202) A bug in the frontpage budget chart is fixed.
- [Issue 3203](https://github.com/firefly-iii/firefly-iii/issues/3203) Firefly III won't complain when using a locale that uses comma's as decimal separators.
- [Issue 3212](https://github.com/firefly-iii/firefly-iii/issues/3212) Issue with ING imports.
- [Issue 3210](https://github.com/firefly-iii/firefly-iii/issues/3210) Could not create rule based on a transaction from a dropdown menu.
- [Issue 3234](https://github.com/firefly-iii/firefly-iii/issues/3234) Export didn't export tags. 

### API
- [Issue 2828](https://github.com/firefly-iii/firefly-iii/issues/2828) Appropriate endpoints for new transaction possibilities.
- [Issue 2958](https://github.com/firefly-iii/firefly-iii/issues/2958) A new default currency endpoint.

## 5.1.1 (API 1.0.2) - 2020-03-13

### Added
- [Issue 2672](https://github.com/firefly-iii/firefly-iii/issues/2672) Buttons to create transactions from the list of accounts is back.

### Changed
- [Issue 3176](https://github.com/firefly-iii/firefly-iii/issues/3176) Greek language support is enabled again!

### Fixed
- [Issue 3160](https://github.com/firefly-iii/firefly-iii/issues/3160) Deleting a reconciliation won't send you to a 404.
- [Issue 3172](https://github.com/firefly-iii/firefly-iii/issues/3172) Remaining amount left calculation is wrong over multiple months.
- [Issue 3173](https://github.com/firefly-iii/firefly-iii/issues/3173) Amount is invisible when viewing transactions.
- [Issue 3177](https://github.com/firefly-iii/firefly-iii/issues/3177) Fix attachment breadcrumb.
- [Issue 3180](https://github.com/firefly-iii/firefly-iii/issues/3180) Improve instructions for when the user loses MFA info.
- [Issue 3182](https://github.com/firefly-iii/firefly-iii/issues/3182) Better fallback when transaction errors out.
- Search modifiers are now case insensitive.

### Security
- The minimal password length for new users is now 16 characters.
- Have I Been Pwnd check is now enabled by default.

### API
- A new call to `apply_rules` is available when submitting transactions.

## 5.1.0 (API 1.0.1) - 2020-03-06

Before this release came out, several alpha and beta versions had been released already:

- 5.1.0-alpha.1 on 2020-02-16
- 5.1.0-beta.1 on 2020-02-23

### Added
- [Issue 2575](https://github.com/firefly-iii/firefly-iii/issues/2575) You can now create a transaction from a rule.
- [Issue 3052](https://github.com/firefly-iii/firefly-iii/issues/3052) The old way of cloning transactions is back.
- Firefly III will generate a unique installation ID for itself.

### Changed
- [Issue 3066](https://github.com/firefly-iii/firefly-iii/issues/3066) [issue 3067](https://github.com/firefly-iii/firefly-iii/issues/3067) New tag overview. Not yet sure what works best.
- [Issue 3071](https://github.com/firefly-iii/firefly-iii/issues/3071) Top box with expense information (left to spend) is now more clear.
- [Issue 3075](https://github.com/firefly-iii/firefly-iii/issues/3075) Embarrassing typo in welcome email.
- You can set the default language for Firefly III which will also apply to the login page.
- Add Lando to readme.
- Add support for Finnish! 🇫🇮
- In the configuration `pgsql` is now the default database connection. This may break your non-`pgsql` installation if you haven't set it specifically to your database type.
- A new debug view for transactions. Change the word "show" in `/transactions/show/123` to "debug" to get a nice JSON thing.
- Foreign currencies should show up less often in edit/create transaction screens. 

### Fixed
- [Issue 3042](https://github.com/firefly-iii/firefly-iii/issues/3042) Rule engine behavior was inconsistent when importing data.
- [Issue 3045](https://github.com/firefly-iii/firefly-iii/issues/3045) Linking bills to liability accounts through rules was broken.
- [Issue 3050](https://github.com/firefly-iii/firefly-iii/issues/3050) Date blocks were rendered badly.
- [Issue 3070](https://github.com/firefly-iii/firefly-iii/issues/3070) The currency symbol would not precede the amount in some locales.
- [Issue 3083](https://github.com/firefly-iii/firefly-iii/issues/3083) Fix category sort in report.
- [Issue 3064](https://github.com/firefly-iii/firefly-iii/issues/3064) Weird bug in reports.
- [Issue 3073](https://github.com/firefly-iii/firefly-iii/issues/3073) Rules would not be applied to all splits if a split was newly created.
- [Issue 3099](https://github.com/firefly-iii/firefly-iii/issues/3099) Can't make piggy banks on accounts with no currency.
- [Issue 3111](https://github.com/firefly-iii/firefly-iii/issues/3111) Budget amount edit redirect.
- [Issue 3114](https://github.com/firefly-iii/firefly-iii/issues/3114) Removed double entry from budget list.
- [Issue 3119](https://github.com/firefly-iii/firefly-iii/issues/3119) Command would break if transaction was incomplete.
- [Issue 3127](https://github.com/firefly-iii/firefly-iii/issues/3127) Cloning a transaction would not clear the cache.
- [Issue 3129](https://github.com/firefly-iii/firefly-iii/issues/3129) Issue importing interest dates.
- [Issue 3130](https://github.com/firefly-iii/firefly-iii/issues/3130) A forwarder sent you to a 404.
- [Issue 3131](https://github.com/firefly-iii/firefly-iii/issues/3131) The search modifiers would claim the whole query.
- [Issue 3135](https://github.com/firefly-iii/firefly-iii/issues/3135) Could not change liability type.
- [Issue 3137](https://github.com/firefly-iii/firefly-iii/issues/3137) Fix mis-alignment in table rows.
- [Issue 3140](https://github.com/firefly-iii/firefly-iii/issues/3140) New user email message had a broken link.
- [Issue 3141](https://github.com/firefly-iii/firefly-iii/issues/3141) Cache issue
- [Issue 3145](https://github.com/firefly-iii/firefly-iii/issues/3145) Issue with empty charts.
- [Issue 3146](https://github.com/firefly-iii/firefly-iii/issues/3146) Better handling of CSV imports from ING.
- [Issue 3154](https://github.com/firefly-iii/firefly-iii/issues/3154) Problem with bcadd() in PHP 7.4
- [Issue 3159](https://github.com/firefly-iii/firefly-iii/issues/3159) Fixed some untranslatable strings.
- Bad redirect when editing opening balances.

### API
- [Issue 3097](https://github.com/firefly-iii/firefly-iii/issues/3097) Unifying API models
- [Issue 3098](https://github.com/firefly-iii/firefly-iii/issues/3098) Add field to link types.

## 5.0.5 (API 1.0.0) - 2020-02-13

This release fixes an issue with logging that could, in rare cases, error out terribly.

### Fixed

- Inconsistent log configuration.

## 5.0.4 (API 1.0.0) - 2020-02-01

This release fixes several bugs found in 5.0.0 and earlier releases.

### Fixed

- If unset, `DB_CONNECTION` defaults to "mysql". This is now "pgsql", which is consistent with the documentation and the example configuration
  file (`.env.example`). 

## 5.0.3 (API 1.0.0) - 2020-01-30

This release fixes several bugs found in 5.0.0 and earlier releases.

### Fixed

- A script tries to connect over MySQL, despite Firefly III being configured to connect over another DB type.

## 5.0.1 (API 1.0.0) - 2020-01-25

This release fixes several bugs found in 5.0.0 and earlier releases.

### Changed
- Rewrote the readme file.
- Add Cloudron to readme.
- Add a new import tool to the readme and the documentation.
- Changed my email address to james@firefly-iii.org.

### Fixed
- [Issue 2998](https://github.com/firefly-iii/firefly-iii/issues/2998) Could not edit account with double IBAN
- [Issue 3016](https://github.com/firefly-iii/firefly-iii/issues/3016) Swap min/max on chart and reverse direction
- [Issue 3021](https://github.com/firefly-iii/firefly-iii/issues/3021) Fixed an issue with a broken button when uploading transactions
- [Issue 3026](https://github.com/firefly-iii/firefly-iii/issues/3026) Fix issue with ISO dates
- [Issue 3027](https://github.com/firefly-iii/firefly-iii/issues/3027) Opening Balance date and charts
- [Issue 3019](https://github.com/firefly-iii/firefly-iii/issues/3019) Fix issue with bill name auto-complete in rules
- [Issue 3047](https://github.com/firefly-iii/firefly-iii/issues/3047) Fix issue where new users would get big fat error.
- Fixed an issue with the budget overview in default financial reports.

## 5.0.0 (API 1.0.0) - 2020-01-18

This version represents, if anything, a fresh start in the version numbering system so Firefly III will finally follow SemVer, for real this time.

### Added
- [Issue 2580](https://github.com/firefly-iii/firefly-iii/issues/2580) Users can now edit reconciliations.
- [Issue 2723](https://github.com/firefly-iii/firefly-iii/issues/2723) You can now use rules that trigger on account numbers (and IBAN)
- [Issue 2895](https://github.com/firefly-iii/firefly-iii/issues/2895) Another indicator for negative amounts.
- [Issue 2901](https://github.com/firefly-iii/firefly-iii/issues/2901) Can select liability accounts when running rules.
- [Issue 2893](https://github.com/firefly-iii/firefly-iii/issues/2893) Add config cache clear command to Docker build.
- [Issue 2667](https://github.com/firefly-iii/firefly-iii/issues/2667) Option to export data from Firefly III
- [Issue 2064](https://github.com/firefly-iii/firefly-iii/issues/2064) Ability to mass-delete tags.
- [Issue 2920](https://github.com/firefly-iii/firefly-iii/issues/2920) [issue 2981](https://github.com/firefly-iii/firefly-iii/issues/2981) Firefly III now generates a nonce used by all inline scripts.
- Can now give accounts a location tag.
- Firefly III now supports redis as cache backend.
- Footer will warn you of alpha and beta versions.

### Changed
- [Issue 2776](https://github.com/firefly-iii/firefly-iii/issues/2776) Some charts now do relative scaling. Useful for large amounts.
- [Issue 2702](https://github.com/firefly-iii/firefly-iii/issues/2702) More details on tags overview
- [Issue 2919](https://github.com/firefly-iii/firefly-iii/issues/2919) Didn't support user's choice not to check for updates.
- Fine tune the Docker container startup times using new environment variables.
- Firefly III's demo site no longer uses Google Analytics to track visitors, but Matomo.

### Deprecated
- Firefly III no longer supports the SFTP storage backend, nor does it support the ability to use both SFTP and local files as storage backends, because the
 packages required are no longer maintained and will not work with Laravel 6.0. 

### Removed
- Firefly III will no longer be built for Sandstorm.
- The Docker image is built from [a separate repository](http://github.com/firefly-iii/docker).
- The Kubernetes files are stored in [a separate repository](https://github.com/firefly-iii/kubernetes).

### Fixed
- [Issue 2907](https://github.com/firefly-iii/firefly-iii/issues/2907) Bad date display in recurring transactions.
- [Issue 2912](https://github.com/firefly-iii/firefly-iii/issues/2912) Redirect fix for bills.
- [Issue 2874](https://github.com/firefly-iii/firefly-iii/issues/2874) More redirect issues fixed.
- [Issue 2878](https://github.com/firefly-iii/firefly-iii/issues/2878) Typo in code of budget overview.
- [Issue 2876](https://github.com/firefly-iii/firefly-iii/issues/2876) Trailing zeroes and other issues.
- [Issue 2881](https://github.com/firefly-iii/firefly-iii/issues/2881) An error when only the title of a split transaction was bad.
- [Issue 2924](https://github.com/firefly-iii/firefly-iii/issues/2924) Could not trigger rules when set to "update".
- [Issue 2691](https://github.com/firefly-iii/firefly-iii/issues/2691) Fix to update recurring transactions with bad types.
- [Issue 2941](https://github.com/firefly-iii/firefly-iii/issues/2941) Not all notes were decoded correctly.
- [Issue 2945](https://github.com/firefly-iii/firefly-iii/issues/2945) Budget field would be empty when editing transaction.
- [Issue 2950](https://github.com/firefly-iii/firefly-iii/issues/2950) Error in chart (null pointer)
- [Issue 2983](https://github.com/firefly-iii/firefly-iii/issues/2983) Debug info left in bills overview caused some issues.
- [Issue 2980](https://github.com/firefly-iii/firefly-iii/issues/2980) Issues with console export.
- [Issue 2987](https://github.com/firefly-iii/firefly-iii/issues/2987) Issue with creating expense / revenue accounts.
- [Issue 2993](https://github.com/firefly-iii/firefly-iii/issues/2993) Issue with Chinese locale on Heroku

### API
- Various endpoints are better documented.


## 4.8.2 (API 0.10.5) - 2019-11-29

After several alpha and beta versions (which were mainly released because I was
farting around with the idea of doing these things) here's the final version
of the latest release, 4.8.2. Several improvements and lots of bug fixes.

### Added
- You can now cash out a liability.
- (Better) support for Kubernetes
- Support for Swedish! 🇸🇪
 
### Changed
- [Issue 2835](https://github.com/firefly-iii/firefly-iii/issues/2835) Extended generic bank debit/credit indicator
- Firefly III now comes in three channels: stable, beta and alpha. You can 
   find the latest version for each channel on [this website](https://version.firefly-iii.org/).
- Firefly III will use version.firefly-iii.org to check what the latest version is.
- Firefly III is now built for ARM, ARM64 and AMD64 in one Docker build.
 
### Fixed
- [Issue 2783](https://github.com/firefly-iii/firefly-iii/issues/2783) Fixes issues with SQLite databases.
- [Issue 2774](https://github.com/firefly-iii/firefly-iii/issues/2774) Bad redirect when using exotic ports.
- [Issue 2780](https://github.com/firefly-iii/firefly-iii/issues/2780) Budget overview would show deleted entries.
- [Issue 2771](https://github.com/firefly-iii/firefly-iii/issues/2771) Tags and piggy banks would not be created when recurring transactions were created.
- Not all lists would sort accounts properly.
- [Issue 2786](https://github.com/firefly-iii/firefly-iii/issues/2786) Nicolas fixed documentation links, thanks!
- [Issue 2806](https://github.com/firefly-iii/firefly-iii/issues/2806) You can now skip one month again in bills.
- [Issue 2796](https://github.com/firefly-iii/firefly-iii/issues/2796) Rewrote a chart on category page.
- [Issue 2811](https://github.com/firefly-iii/firefly-iii/issues/2811) Description of tags was gone.
- [Issue 2812](https://github.com/firefly-iii/firefly-iii/issues/2812) Bad redirect after tag deletion.
- [Issue 2790](https://github.com/firefly-iii/firefly-iii/issues/2790) Form fixes for currencies.
- [Issue 2651](https://github.com/firefly-iii/firefly-iii/issues/2651) Source account would not be removed if resubmitting the form.
- Catch some integer conversion errors.
- [Issue 2660](https://github.com/firefly-iii/firefly-iii/issues/2660) Various search and form issues.
- [Issue 2807](https://github.com/firefly-iii/firefly-iii/issues/2807) Timendum fixed a lot of auto-completes, thanks!
- [Issue 2820](https://github.com/firefly-iii/firefly-iii/issues/2820) Fix budget chart.
- [Issue 2832](https://github.com/firefly-iii/firefly-iii/issues/2832) Issue with rules.
- [Issue 2841](https://github.com/firefly-iii/firefly-iii/issues/2841) Issue with duplicate imports.
- [Issue 2843](https://github.com/firefly-iii/firefly-iii/issues/2843) Issues with Chinese translations
- [Issue 2852](https://github.com/firefly-iii/firefly-iii/issues/2852) Missing columns from budget overview
- [Issue 2851](https://github.com/firefly-iii/firefly-iii/issues/2851) Missing chart data.

 ### API
 - Most API errors now have a number. See [this page](https://docs.firefly-iii.org/support/error_codes) for more details.

## 4.8.2-alpha.1 (API 0.10.5) - 2019-11-03

Normally I won't be detailling alpha versions in the changelog but this is a 
special one. If your Firefly III installation warned you that this version has 
been released, please take note that this is a **test** version and may **not** 
be stable!

### Changed
- Firefly III now comes in three channels: stable, beta and alpha. You can 
  find the latest version for each channel on [this website](https://version.firefly-iii.org/).
- To make sure your Docker instance logs everything to `stdout`, make sure 
  you set the environment variable `LOG_CHANNEL` to `docker_out`. This is now 
  default behavior for new installations that use the `.env` file to launch 
  Firefly III (using Docker compose), but if you use environment variables 
  you may have to set this yourself. This is not a mandatory change but will 
  make debugging easier.
- The Docker image is now also available in AArch64.

### Fixed
- [Issue 2771](https://github.com/firefly-iii/firefly-iii/issues/2771) Recurring transactions would not hit their piggy bank.
- [Issue 2774](https://github.com/firefly-iii/firefly-iii/issues/2774) Fixed redirect issues for exotic URL's.
- [Issue 2780](https://github.com/firefly-iii/firefly-iii/issues/2780) Deleted bugs would still count in the budget overview.
- [Issue 2783](https://github.com/firefly-iii/firefly-iii/issues/2783) Fixed issue with SQLite and integers.
- [Issue 2786](https://github.com/firefly-iii/firefly-iii/issues/2786) Fix links to documentation.

## 4.8.1.8 (API 0.10.5) - 2019-10-26

### Fixed
- [Issue 2773](https://github.com/firefly-iii/firefly-iii/issues/2773) Error when importing transactions.

## 4.8.1.7 (API 0.10.5) - 2019-10-26

### Fixed
- Error when creating transactions from the index of Firefly III.

### API
- Firefly III can filter duplicate transactions.
- New endpoint that can search for specific transfers.

## 4.8.1.6 (API 0.10.4) - 2019-10-25

### Fixed
- Redirecting to an URL with parameters works well now for editing and creating transactions.
- [Issue 2756](https://github.com/firefly-iii/firefly-iii/issues/2756) Search was broken due to left-over debug statements.
- [Issue 2757](https://github.com/firefly-iii/firefly-iii/issues/2757) 2FA was broken due to a changed library.
- [Issue 2758](https://github.com/firefly-iii/firefly-iii/issues/2758) A debug command courtesy of Laravel wouldn't work due to invalid routes.
- [Issue 2701](https://github.com/firefly-iii/firefly-iii/issues/2701) Fixed a never-ending loop.

## 4.8.1.5 (API 0.10.4) - 2019-10-21

### Added
- [Issue 2694](https://github.com/firefly-iii/firefly-iii/issues/2694) Special page for archived accounts.

### Changed
- [Issue 2540](https://github.com/firefly-iii/firefly-iii/issues/2540) Partly translated transaction edit/create form.
- [Issue 2655](https://github.com/firefly-iii/firefly-iii/issues/2655) Link to Firefly III's base Docker image.
- [Issue 2724](https://github.com/firefly-iii/firefly-iii/issues/2724) Cleanup some JS output.
- [Issue 2734](https://github.com/firefly-iii/firefly-iii/issues/2734) Put personal access token in textarea for easier copy/pasting.
- [Issue 2728](https://github.com/firefly-iii/firefly-iii/issues/2728) Remove superfluous currency names.

### Fixed
- [Issue 2699](https://github.com/firefly-iii/firefly-iii/issues/2699) Internal cache wouldn't update.
- [Issue 2713](https://github.com/firefly-iii/firefly-iii/issues/2713) Could not search for numerical values.
- [Issue 2716](https://github.com/firefly-iii/firefly-iii/issues/2716) Could not reset intro popups.
- [Issue 2701](https://github.com/firefly-iii/firefly-iii/issues/2701) Temporary fix for timeouts.
- [Issue 2727](https://github.com/firefly-iii/firefly-iii/issues/2727) CSP headers too strict.
- [Issue 2731](https://github.com/firefly-iii/firefly-iii/issues/2731) Too strict config vars.
- [Issue 2754](https://github.com/firefly-iii/firefly-iii/issues/2754) Memcached config would error out.
- [Issue 2746](https://github.com/firefly-iii/firefly-iii/issues/2746) Cache would not clear after firing recurring transactions.
- [Issue 2755](https://github.com/firefly-iii/firefly-iii/issues/2755) Making a rule inactive would still fire it.

### API
- [Issue 2698](https://github.com/firefly-iii/firefly-iii/issues/2698) Fix return value in API.
- [Issue 2753](https://github.com/firefly-iii/firefly-iii/issues/2753) Was possible to upload and manage empty attachments.
- New accounts submitted through the API may include account number, BIC and IBAN data.
- New end point to support [issue 2752](https://github.com/firefly-iii/firefly-iii/issues/2752).

## 4.8.1.4 (API 0.10.3) - 2019-10-05

Emergency fix because I borked the upgrade routine. I apologise for the inconvenience.

### Fixed
- [Issue 2680](https://github.com/firefly-iii/firefly-iii/issues/2680) Upgrade routine would delete all transaction groups.

## 4.8.1.2 (API 0.10.3) - 2019-10-05

Firefly III v4.8.1.2 and onwards are licensed under the GNU Affero General 
Public License. This will not meaningfully change Firefly III. This 
particular license has some extra provisions that protect web-applications
such as this one. You can read the full license on the website of GNU.

https://www.gnu.org/licenses/agpl-3.0.html

### Added
- [Issue 2589](https://github.com/firefly-iii/firefly-iii/issues/2589) Can now search using `created_on:2019-10-22` and `updated_on:2019-10-22`.
- [Issue 2494](https://github.com/firefly-iii/firefly-iii/issues/2494) Add account balance to the dropdown.
- [Issue 2603](https://github.com/firefly-iii/firefly-iii/issues/2603) New keywords for reports.
- [Issue 2618](https://github.com/firefly-iii/firefly-iii/issues/2618) Page navigation in the footer of transaction lists.
- Option in your profile to delete meta-data from your administration.
- Add average to some reports.

### Changed
- [Issue 2593](https://github.com/firefly-iii/firefly-iii/issues/2593) The budget overview is now fully multi-currency.
- [Issue 2613](https://github.com/firefly-iii/firefly-iii/issues/2613) Improved Mailgun configuration options.
- [Issue 2510](https://github.com/firefly-iii/firefly-iii/issues/2510) Maximum transaction description length is 1000 now.
- [Issue 2616](https://github.com/firefly-iii/firefly-iii/issues/2616) Docker instances should remember their OAuth tokens and keys better (even after a restart)
- [Issue 2675](https://github.com/firefly-iii/firefly-iii/issues/2675) Some spelling in the English is fixed.

### Removed
- [Issue 2677](https://github.com/firefly-iii/firefly-iii/issues/2677) Superfluous help popup.

### Fixed
- [Issue 2572](https://github.com/firefly-iii/firefly-iii/issues/2572) Sometimes users would get 404's after deleting stuff. 
- [Issue 2587](https://github.com/firefly-iii/firefly-iii/issues/2587) Users would be redirected to JSON endpoints.
- [Issue 2596](https://github.com/firefly-iii/firefly-iii/issues/2596) Could not remove the last tag from a transaction.
- [Issue 2598](https://github.com/firefly-iii/firefly-iii/issues/2598) Fix an issue where foreign amounts were displayed incorrectly.
- [Issue 2599](https://github.com/firefly-iii/firefly-iii/issues/2599) Could add negative amounts to piggy banks and game the system.
- [Issue 2560](https://github.com/firefly-iii/firefly-iii/issues/2560) Search supports møre chäracters.
- [Issue 2626](https://github.com/firefly-iii/firefly-iii/issues/2626) Budgets would display amounts with too many decimals.
- [Issue 2629](https://github.com/firefly-iii/firefly-iii/issues/2629) [issue 2639](https://github.com/firefly-iii/firefly-iii/issues/2639) [issue 2640](https://github.com/firefly-iii/firefly-iii/issues/2640) [issue 2643](https://github.com/firefly-iii/firefly-iii/issues/2643) Line-breaks were not properly rendered in markdown.
- [Issue 2623](https://github.com/firefly-iii/firefly-iii/issues/2623) Budget spent line would make the start of the month twice.
- [Issue 2624](https://github.com/firefly-iii/firefly-iii/issues/2624) Editing a budget would redirect you to the wrong page.
- [Issue 2633](https://github.com/firefly-iii/firefly-iii/issues/2633) New transaction form sorts budgets wrong.
- [Issue 2567](https://github.com/firefly-iii/firefly-iii/issues/2567) Could not unlink bills.
- [Issue 2647](https://github.com/firefly-iii/firefly-iii/issues/2647) Date issue in category overview
- [Issue 2657](https://github.com/firefly-iii/firefly-iii/issues/2657) Possible fix for issue with transaction overview.
- [Issue 2658](https://github.com/firefly-iii/firefly-iii/issues/2658) Fixed overview of recurring transactions.
- [Issue 2480](https://github.com/firefly-iii/firefly-iii/issues/2480) SQLite can't handle a lot of variables so big update queries are now executed in chunks.
- [Issue 2683](https://github.com/firefly-iii/firefly-iii/issues/2683) Link to the wrong transaction.


### Security
- [Issue 2687](https://github.com/firefly-iii/firefly-iii/issues/2687) Budget overview shows budget limit totals for all users, not just the logged-in user.

### API
- [Issue 2609](https://github.com/firefly-iii/firefly-iii/issues/2609) Summary endpoint would not always give the correct results.
- [Issue 2638](https://github.com/firefly-iii/firefly-iii/issues/2638) Link to correct journal in API.
- [Issue 2606](https://github.com/firefly-iii/firefly-iii/issues/2606) Budget endpoint gave error.
- [Issue 2637](https://github.com/firefly-iii/firefly-iii/issues/2637) Transaction / piggy bank event endpoint now returns results.
- An undocumented end point that allows you to search for accounts. Still a bit experimental.
  Use: /api/v1/search/accounts?query=something&field=all (all,iban,id,number)

## 4.8.1.1 (API 0.10.2) - 2019-09-12

### Changed
- Add some sensible maximum amounts to form inputs.

### Fixed
- [Issue 2561](https://github.com/firefly-iii/firefly-iii/issues/2561) Fixes a query error on the /tags page that affected some MySQL users.
- [Issue 2563](https://github.com/firefly-iii/firefly-iii/issues/2563) Two destination fields when editing a recurring transaction.
- [Issue 2564](https://github.com/firefly-iii/firefly-iii/issues/2564) Ability to browse pages in the search results.
- [Issue 2573](https://github.com/firefly-iii/firefly-iii/issues/2573) Could not submit an transaction update after an error was corrected.
- [Issue 2577](https://github.com/firefly-iii/firefly-iii/issues/2577) Upgrade routine would wrongly store the categories of split transactions.
- [Issue 2590](https://github.com/firefly-iii/firefly-iii/issues/2590) Fix an issue in the audit report.
- [Issue 2592](https://github.com/firefly-iii/firefly-iii/issues/2592) Fix an issue with YNAB import.
- [Issue 2597](https://github.com/firefly-iii/firefly-iii/issues/2597) Fix an issue where users could not delete currencies.

## 4.8.1 (API 0.10.2) - 2019-09-08

Firefly III 4.8.1 requires PHP 7.3.

### Added
- Support for Greek
- [Issue 2383](https://github.com/firefly-iii/firefly-iii/issues/2383) Some tables in reports now also report percentages.
- [Issue 2389](https://github.com/firefly-iii/firefly-iii/issues/2389) Add category / budget information to transaction lists.
- [Issue 2464](https://github.com/firefly-iii/firefly-iii/issues/2464) Can now search for tag.
- [Issue 2466](https://github.com/firefly-iii/firefly-iii/issues/2466) Can order recurring transactions in a more useful manner.
- [Issue 2497](https://github.com/firefly-iii/firefly-iii/issues/2497) Transaction creation moment in hover of tag title.
- [Issue 2471](https://github.com/firefly-iii/firefly-iii/issues/2471) Added date tag to table cells.

### Changed
- [Issue 2285](https://github.com/firefly-iii/firefly-iii/issues/2285) Rule handling is now uniform across the app.
- [Issue 2231](https://github.com/firefly-iii/firefly-iii/issues/2231) You can now also use the `DATABASE_URL` for MySQL connections.
- [Issue 2291](https://github.com/firefly-iii/firefly-iii/issues/2291) All reports are now properly multi-currency.
- [Issue 2481](https://github.com/firefly-iii/firefly-iii/issues/2481) As part of the removal of local encryption, uploads and imports are no longer encrypted.
- [Issue 2495](https://github.com/firefly-iii/firefly-iii/issues/2495) A better message of transaction submission.
- [Issue 2506](https://github.com/firefly-iii/firefly-iii/issues/2506) Some bugs in tag report fixed.
- [Issue 2510](https://github.com/firefly-iii/firefly-iii/issues/2510) All transaction descriptions cut off at 255 chars.
- Changing your language preference invites you to submit corrections to [Crowdin](https://crowdin.com/project/firefly-iii).
- Better sum in bill view.
- Clean up docker files for flawless operation.

### Removed
- The bunq API has changed, and support for bunq has been disabled.

### Fixed
- [Issue 2470](https://github.com/firefly-iii/firefly-iii/issues/2470) Bad links for transactions.
- [Issue 2480](https://github.com/firefly-iii/firefly-iii/issues/2480) Large queries would break in SQLite.
- [Issue 2484](https://github.com/firefly-iii/firefly-iii/issues/2484) Transaction description auto-complete.
- [Issue 2487](https://github.com/firefly-iii/firefly-iii/issues/2487) Fix issues with FinTS
- [Issue 2488](https://github.com/firefly-iii/firefly-iii/issues/2488) 404 after deleting a tag.
- [Issue 2490](https://github.com/firefly-iii/firefly-iii/issues/2490) "Reset form after submission" doesn't work.
- [Issue 2492](https://github.com/firefly-iii/firefly-iii/issues/2492) After submitting and fixing an error, the error is persistent.
- [Issue 2493](https://github.com/firefly-iii/firefly-iii/issues/2493) Auto detect transaction type is a bit better now.
- [Issue 2498](https://github.com/firefly-iii/firefly-iii/issues/2498) Pressing enter in some fields breaks the form.
- [Issue 2499](https://github.com/firefly-iii/firefly-iii/issues/2499) Auto-complete issues in transaction link form.
- [Issue 2500](https://github.com/firefly-iii/firefly-iii/issues/2500) Issue when submitting edited transactions.
- [Issue 2501](https://github.com/firefly-iii/firefly-iii/issues/2501) Better error messages for empty submissions.
- [Issue 2508](https://github.com/firefly-iii/firefly-iii/issues/2508) Can remove category from transaction.
- [Issue 2516](https://github.com/firefly-iii/firefly-iii/issues/2516) Can no longer import transactions with no amount.
- [Issue 2518](https://github.com/firefly-iii/firefly-iii/issues/2518) Link in balance box goes to current period.
- [Issue 2521](https://github.com/firefly-iii/firefly-iii/issues/2521) Foreign transaction currency is hidden when the user hasn't enabled foreign currencies.
- [Issue 2522](https://github.com/firefly-iii/firefly-iii/issues/2522) Some reports were missing the "overspent" field.
- [Issue 2526](https://github.com/firefly-iii/firefly-iii/issues/2526) It was impossible to remove the budget of a transaction.
- [Issue 2527](https://github.com/firefly-iii/firefly-iii/issues/2527) Some bulk edits were buggy.
- [Issue 2539](https://github.com/firefly-iii/firefly-iii/issues/2539) Fixed a typo.
- [Issue 2545](https://github.com/firefly-iii/firefly-iii/issues/2545) Deleted tags would still show up.
- [Issue 2547](https://github.com/firefly-iii/firefly-iii/issues/2547) Changing the opening balance to 0 will now remove it.
- [Issue 2549](https://github.com/firefly-iii/firefly-iii/issues/2549) Can now clone transactions again.
- [Issue 2550](https://github.com/firefly-iii/firefly-iii/issues/2550) Added missing locales for moment.js
- [Issue 2553](https://github.com/firefly-iii/firefly-iii/issues/2553) Fixed an issue with split transactions.
- [Issue 2555](https://github.com/firefly-iii/firefly-iii/issues/2555) Better error for when you submit the same account twice.
- [Issue 2439](https://github.com/firefly-iii/firefly-iii/issues/2439) SQL error in API post new user
- ... and many other bugs.

### API
- [Issue 2475](https://github.com/firefly-iii/firefly-iii/issues/2475) Tags are now the same for all views.
- [Issue 2476](https://github.com/firefly-iii/firefly-iii/issues/2476) Amount is now represented equally in all views.
- [Issue 2477](https://github.com/firefly-iii/firefly-iii/issues/2477) Rules are easier to update.
- [Issue 2483](https://github.com/firefly-iii/firefly-iii/issues/2483) Several consistencies fixed.
- [Issue 2484](https://github.com/firefly-iii/firefly-iii/issues/2484) Transaction link view fixed.
- [Issue 2557](https://github.com/firefly-iii/firefly-iii/issues/2557) Fix for issue in summary API
- No longer have to submit mandatory fields to account end point. Just submit the field you wish to update, the rest will be untouched.
- Rules will no longer list the "user-action" trigger Rules will have a "moment" field that says either "update-journal" or "store-journal".

## 4.8.0.3 (API 0.10.1) - 2019-08-23

Fixes many other issues in the previous release.

### Added
- Autocomplete for transaction description.

### Fixed
- [Issue 2438](https://github.com/firefly-iii/firefly-iii/issues/2438) Some balance issues when working with multiple currencies (a known issue)
- [Issue 2425](https://github.com/firefly-iii/firefly-iii/issues/2425) Transaction edit/create form is weird with the enter button
- [Issue 2424](https://github.com/firefly-iii/firefly-iii/issues/2424) auto complete tab doesn't work.
- [Issue 2441](https://github.com/firefly-iii/firefly-iii/issues/2441) Inconsistent character limit for currencies.
- [Issue 2443](https://github.com/firefly-iii/firefly-iii/issues/2443) 500 error when submitting budgets
- [Issue 2446](https://github.com/firefly-iii/firefly-iii/issues/2446) Can't update current amount for piggy bank
- [Issue 2440](https://github.com/firefly-iii/firefly-iii/issues/2440) Errors when interacting with recurring transactions
- [Issue 2439](https://github.com/firefly-iii/firefly-iii/issues/2439) SQL error in API post new user
- Transaction report (after import, over email) is mostly empty
- Mass edit checkboxes doesn't work in a tag overview
- [Issue 2437](https://github.com/firefly-iii/firefly-iii/issues/2437) CPU issues when viewing accounts, probably run-away queries.
- [Issue 2432](https://github.com/firefly-iii/firefly-iii/issues/2432) Can't disable all currencies except one / can't disable EUR and switch to something else.
- Option to edit the budget is gone from edit transaction form.
- [Issue 2453](https://github.com/firefly-iii/firefly-iii/issues/2453) Search view things
- [Issue 2449](https://github.com/firefly-iii/firefly-iii/issues/2449) Can't add invoice date.
- [Issue 2448](https://github.com/firefly-iii/firefly-iii/issues/2448) Bad link in transaction overview
- [Issue 2447](https://github.com/firefly-iii/firefly-iii/issues/2447) Bad link in bill overview

### API
- Improvements to various API end-points. Docs are updated.

## 4.8.0.2 (API 0.10.0) - 2019-08-17

Fixes many other issues in the previous release.

### Changed
- Make many report boxes multi-currency.

### Fixed
- [Issue 2203](https://github.com/firefly-iii/firefly-iii/issues/2203) Reconciliation inconsistencies.
- [Issue 2392](https://github.com/firefly-iii/firefly-iii/issues/2392) Bad namespace leads to installation errors.
- [Issue 2393](https://github.com/firefly-iii/firefly-iii/issues/2393) Missing budget selector.
- [Issue 2402](https://github.com/firefly-iii/firefly-iii/issues/2402) bad amounts in default report
- [Issue 2405](https://github.com/firefly-iii/firefly-iii/issues/2405) Due date can't be edited.
- [Issue 2404](https://github.com/firefly-iii/firefly-iii/issues/2404) bad page indicator in the "no category" transaction overview.
- [Issue 2407](https://github.com/firefly-iii/firefly-iii/issues/2407) Fix recurring transaction dates
- [Issue 2410](https://github.com/firefly-iii/firefly-iii/issues/2410) Transaction links inconsistent
- [Issue 2414](https://github.com/firefly-iii/firefly-iii/issues/2414) Can't edit recurring transactions
- [Issue 2415](https://github.com/firefly-iii/firefly-iii/issues/2415) Return here + reset form results in empty transaction form
- [Issue 2416](https://github.com/firefly-iii/firefly-iii/issues/2416) Some form inconsistencies.
- [Issue 2418](https://github.com/firefly-iii/firefly-iii/issues/2418) Reports are inaccurate or broken.
- [Issue 2422](https://github.com/firefly-iii/firefly-iii/issues/2422) PHP error when matching transactions.
- [Issue 2423](https://github.com/firefly-iii/firefly-iii/issues/2423) Reports are inaccurate or broken.
- [Issue 2426](https://github.com/firefly-iii/firefly-iii/issues/2426) Inconsistent documentation and instructions.
- [Issue 2427](https://github.com/firefly-iii/firefly-iii/issues/2427) Deleted account and "initial balance" accounts may appear in dropdowns.
- [Issue 2428](https://github.com/firefly-iii/firefly-iii/issues/2428) Reports are inaccurate or broken. 
- [Issue 2429](https://github.com/firefly-iii/firefly-iii/issues/2429) Typo leads to SQL errors in available budgets API
- [Issue 2431](https://github.com/firefly-iii/firefly-iii/issues/2431) Issues creating new recurring transactions.
- [Issue 2434](https://github.com/firefly-iii/firefly-iii/issues/2434) You can edit the initial balance transaction but it fails to save.
- ARM build should work now.

### API
- [Issue 2429](https://github.com/firefly-iii/firefly-iii/issues/2429) Typo leads to SQL errors in available budgets API

## 4.8.0.1 (API 0.10.0) - 2019-08-12

Fixes the most pressing issues found in the previous release.

### Fixed
- The balance box on the dashboard shows only negative numbers, skewing the results.
- Selecting or using tags in new transactions results in an error.
- Editing a transaction with tags will drop the tags from the transaction.
- [Issue 2382](https://github.com/firefly-iii/firefly-iii/issues/2382) Ranger config
- [Issue 2384](https://github.com/firefly-iii/firefly-iii/issues/2384) When upgrading manually, you may see: `The command "generate-keys" does not exist.`
- [Issue 2385](https://github.com/firefly-iii/firefly-iii/issues/2385) When upgrading manually, the firefly:verify command may fail to run.
- [Issue 2388](https://github.com/firefly-iii/firefly-iii/issues/2388) When registering as a new user, leaving the opening balance at 0 will give you an error.
- [Issue 2395](https://github.com/firefly-iii/firefly-iii/issues/2395) Editing split transactions is broken.
- [Issue 2397](https://github.com/firefly-iii/firefly-iii/issues/2397) Transfers are stored the wrong way around.
- [Issue 2399](https://github.com/firefly-iii/firefly-iii/issues/2399) Not all account balances are updated after you create a new transaction.
- [Issue 2401](https://github.com/firefly-iii/firefly-iii/issues/2401) Could not delete a split from a split transaction.

## 4.8.0 (API 0.10.0) - 2019-08-09

A huge change that introduces significant database and API changes. Read more about it [in this Patreon post](https://www.patreon.com/posts/29044368).

### Open and known issues
- The "new transaction"-form isn't translated.
- You can't drag and drop transactions.
- You can't clone transactions.

### Added
- Hungarian translation!

### Changed
- New database model that changes the concept of "split transactions";
- New installation routine with rewritten database integrity tests and upgrade code;
- Rewritten screen to create transactions which will now completely rely on the API;
- Most terminal commands now have the prefix `firefly-iii`.
- New MFA code that will generate backup codes for you and is more robust. MFA will have to be re-enabled for ALL users.

### Deprecated
- This will probably be the last Firefly III version to have import routines for files, Bunq and others. These will be moved to separate applications that use the Firefly III API.

### Removed
- The export function has been removed.

### Fixed
- [Issue 1652](https://github.com/firefly-iii/firefly-iii/issues/1652), new strings to use during the import.
- [Issue 1860](https://github.com/firefly-iii/firefly-iii/issues/1860), fixing the default currency not being on top in a JSON box.
- [Issue 2031](https://github.com/firefly-iii/firefly-iii/issues/2031), a fix for Triodos imports.
- [Issue 2153](https://github.com/firefly-iii/firefly-iii/issues/2153), problems with editing credit cards.
- [Issue 2179](https://github.com/firefly-iii/firefly-iii/issues/2179), consistent and correct redirect behavior.
- [Issue 2180](https://github.com/firefly-iii/firefly-iii/issues/2180), API issues with foreign amounts.
- [Issue 2187](https://github.com/firefly-iii/firefly-iii/issues/2187), bulk editing reconciled transactions was broken.
- [Issue 2188](https://github.com/firefly-iii/firefly-iii/issues/2188), redirect loop in bills
- [Issue 2189](https://github.com/firefly-iii/firefly-iii/issues/2189), bulk edit could not handle tags.
- [Issue 2203](https://github.com/firefly-iii/firefly-iii/issues/2203), [issue 2208](https://github.com/firefly-iii/firefly-iii/issues/2208), [issue 2352](https://github.com/firefly-iii/firefly-iii/issues/2352), reconciliation fixes
- [Issue 2204](https://github.com/firefly-iii/firefly-iii/issues/2204), transaction type fix
- [Issue 2211](https://github.com/firefly-iii/firefly-iii/issues/2211), mass edit fixes.
- [Issue 2212](https://github.com/firefly-iii/firefly-iii/issues/2212), bug in the API when deleting objects.
- [Issue 2214](https://github.com/firefly-iii/firefly-iii/issues/2214), could not view attachment.
- [Issue 2219](https://github.com/firefly-iii/firefly-iii/issues/2219), max amount was a little low.
- [Issue 2239](https://github.com/firefly-iii/firefly-iii/issues/2239), fixed ordering issue.
- [Issue 2246](https://github.com/firefly-iii/firefly-iii/issues/2246), could not disable EUR.
- [Issue 2268](https://github.com/firefly-iii/firefly-iii/issues/2268), could not import into liability accounts.
- [Issue 2293](https://github.com/firefly-iii/firefly-iii/issues/2293), could not trigger rule on deposits in some circumstances
- [Issue 2314](https://github.com/firefly-iii/firefly-iii/issues/2314), could not trigger rule on transfers in some circumstances
- [Issue 2325](https://github.com/firefly-iii/firefly-iii/issues/2325), some balance issues on the frontpage.
- [Issue 2328](https://github.com/firefly-iii/firefly-iii/issues/2328), some date range issues in reports
- [Issue 2331](https://github.com/firefly-iii/firefly-iii/issues/2331), some broken fields in reports.
- [Issue 2333](https://github.com/firefly-iii/firefly-iii/issues/2333), API issues with piggy banks.
- [Issue 2355](https://github.com/firefly-iii/firefly-iii/issues/2355), configuration issues with LDAP
- [Issue 2361](https://github.com/firefly-iii/firefly-iii/issues/2361), some ordering issues.

### API
- Updated API to reflect the changes in the database.
- New API end-point for a summary of your data.
- Some new API charts.

## 4.7.17.6 (API 0.9.2) - 2019-08-02

### Security
- XSS issue in liability account redirect, found by [@0x2500](https://github.com/0x2500).

## 4.7.17.5 (API 0.9.2) - 2019-08-02

### Security
- Several XSS issues, found by [@0x2500](https://github.com/0x2500).

## 4.7.17.4 (API 0.9.2) - 2019-08-02

### Security
- Several XSS issues, found by [@0x2500](https://github.com/0x2500).

## 4.7.17.3 (API 0.9.2) - 2019-07-16

### Security
- XSS bug in file uploads (x2), found by [@dayn1ne](https://github.com/dayn1ne).
- XSS bug in search, found by [@dayn1ne](https://github.com/dayn1ne).

## 4.7.17.2 (API 0.9.2) - 2019-07-15

### Security
- XSS bug in budget title, found by [@dayn1ne](https://github.com/dayn1ne).

## 4.7.17 (API 0.9.2) - 2019-03-17

### Added
- Support for Norwegian!

### Changed
- Clear cache during install routine.
- Add Firefly III version number to install routine.

### Removed
- Initial release.

### Fixed
- [Issue 2159](https://github.com/firefly-iii/firefly-iii/issues/2159) Bad redirect due to Laravel upgrade.
- [Issue 2166](https://github.com/firefly-iii/firefly-iii/issues/2166) Importer had some issues with distinguishing double transfers.
- [Issue 2167](https://github.com/firefly-iii/firefly-iii/issues/2167) New LDAP package gave some configuration changes.
- [Issue 2173](https://github.com/firefly-iii/firefly-iii/issues/2173) Missing class when generating 2FA codes.

## 4.7.16 (API 0.9.2) - 2019-03-08

4.7.16 was released to fix a persistent issue with broken user preferences.

### Changed

- Firefly III now uses Laravel 5.8.

## 4.7.15 (API 0.9.2) - 2019-03-02

4.7.15 was released to fix some issues upgrading from older versions.

### Added
- [Issue 2128](https://github.com/firefly-iii/firefly-iii/issues/2128) Support for Postgres SSL

### Changed
- [Issue 2120](https://github.com/firefly-iii/firefly-iii/issues/2120) Add a missing meta tag, thanks to @lastlink
- Search is a lot faster now.

### Fixed
- [Issue 2125](https://github.com/firefly-iii/firefly-iii/issues/2125) Decryption issues during upgrade
- [Issue 2130](https://github.com/firefly-iii/firefly-iii/issues/2130) Fixed database migrations and rollbacks.
- [Issue 2135](https://github.com/firefly-iii/firefly-iii/issues/2135) Date fixes in transaction overview

## 4.7.14 (API 0.9.2) - 2019-02-24

4.7.14 was released to fix an issue with the Composer installation script.

## 4.7.13 (API 0.9.2) - 2019-02-23

4.7.13 was released to fix an issue that affected the Softaculous build.

### Added
- A routine has been added that warns about transactions with a 0.00 amount.

### Changed
- PHP maximum execution time is now 600 seconds in the Docker image.
- Moved several files outside of the root of Firefly III

### Fixed
- Fix issue where missing preference breaks the database upgrade.
- [Issue 2100](https://github.com/firefly-iii/firefly-iii/issues/2100) Mass edit transactions results in a reset of the date.

## 4.7.12 (API 0.9.2) - 2019-02-16

4.7.12 was released to fix several shortcomings in v4.7.11's Docker image. Those in turn were caused by me. My apologies.

### Changed
- [Issue 2085](https://github.com/firefly-iii/firefly-iii/issues/2085) Upgraded the LDAP code. To keep using LDAP, set the `LOGIN_PROVIDER` to `ldap`.

### Fixed
- [Issue 2061](https://github.com/firefly-iii/firefly-iii/issues/2061) Some users reported empty update popups. 
- [Issue 2070](https://github.com/firefly-iii/firefly-iii/issues/2070) A cache issue prevented rules from being applied correctly.
- [Issue 2071](https://github.com/firefly-iii/firefly-iii/issues/2071) Several issues with Postgres and date values with time zone information in them.
- [Issue 2081](https://github.com/firefly-iii/firefly-iii/issues/2081) Rules were not being applied when importing using FinTS.
- [Issue 2082](https://github.com/firefly-iii/firefly-iii/issues/2082) The mass-editor changed all dates to today.

## 4.7.11 (API 0.9.2) - 2019-02-10
### Added
- Experimental audit logging channel to track important events (separate from debug logging).

### Changed
- [Issue 2003](https://github.com/firefly-iii/firefly-iii/issues/2003), [issue 2006](https://github.com/firefly-iii/firefly-iii/issues/2006) Transactions can be stored with a timestamp. The user-interface does not support this yet. But the API does.
- Docker image tags a new manifest for arm and amd64.

### Removed
- [skuzzle](https://github.com/skuzzle) removed an annoying console.log statement.

### Fixed
- [Issue 2048](https://github.com/firefly-iii/firefly-iii/issues/2048) Fix "Are you sure?" popup, thanks to @nescafe2002!
- [Issue 2049](https://github.com/firefly-iii/firefly-iii/issues/2049) Empty preferences would crash Firefly III.
- [Issue 2052](https://github.com/firefly-iii/firefly-iii/issues/2052) Rules could not auto-covert to liabilities.
- Webbased upgrade routine will also decrypt the database.
- Last use date for categories was off.

### API
- The `date`-field in any transaction object now returns a ISO 8601 timestamp instead of a date.
 

## 4.7.10 - 2019-02-03
### Added
- [Issue 2037](https://github.com/firefly-iii/firefly-iii/issues/2037) Added some new magic keywords to reports.
- Added a new currency exchange rate service, [ratesapi.io](https://ratesapi.io/), that does not require expensive API keys. Built by [@BoGnY](https://github.com/BoGnY).
- Added Chinese Traditional translations. Thanks!

### Changed
- [Issue 1977](https://github.com/firefly-iii/firefly-iii/issues/1977) Docker image now includes memcached support
- [Issue 2031](https://github.com/firefly-iii/firefly-iii/issues/2031) A new generic debit/credit indicator for imports.
- The new Docker image no longer has the capability to run cron jobs, and will no longer generate your recurring transactions for you. This has been done to simplify the build and make sure your Docker container runs one service, as it should. To set up a cron job for your new Docker container, [check out the documentation](https://docs.firefly-iii.org/en/latest/installation/cronjob.html).
- Due to a change in the database structure, this upgrade will reset your preferences. Sorry about that.

### Deprecated
- I will no longer accept PR's that introduce new currencies.

### Removed
- Firefly III no longer encrypts the database and will [decrypt the database](https://github.com/firefly-iii/help/wiki/Database-encryption) on its first run.

### Fixed
- [Issue 1923](https://github.com/firefly-iii/firefly-iii/issues/1923) Broken window position for date picker.
- [Issue 1967](https://github.com/firefly-iii/firefly-iii/issues/1967) Attachments were hidden in bill view.
- [Issue 1927](https://github.com/firefly-iii/firefly-iii/issues/1927) It was impossible to make recurring transactions skip.
- [Issue 1929](https://github.com/firefly-iii/firefly-iii/issues/1929) Fix the recurring transactions calendar overview.
- [Issue 1933](https://github.com/firefly-iii/firefly-iii/issues/1933) Fixed a bug that made it impossible to authenticate to FreeIPA servers.
- [Issue 1938](https://github.com/firefly-iii/firefly-iii/issues/1938) The importer can now handle the insane way Postbank (DE) formats its numbers.
- [Issue 1942](https://github.com/firefly-iii/firefly-iii/issues/1942) Favicons are relative so Scriptaculous installations work better.
- [Issue 1944](https://github.com/firefly-iii/firefly-iii/issues/1944) Make sure that the search allows you to mass-select transactions.
- [Issue 1945](https://github.com/firefly-iii/firefly-iii/issues/1945) Slight UI change so the drop-down menu renders better.
- [Issue 1955](https://github.com/firefly-iii/firefly-iii/issues/1955) Fixed a bug in the category report.
- [Issue 1968](https://github.com/firefly-iii/firefly-iii/issues/1968) The yearly range would jump to 1-Jan / 1-Jan instead of 1-Jan / 31-Dec
- [Issue 1975](https://github.com/firefly-iii/firefly-iii/issues/1975) Fixed explanation for missing credit card liabilities.
- [Issue 1979](https://github.com/firefly-iii/firefly-iii/issues/1979) Make sure tags are trimmed.
- [Issue 1983](https://github.com/firefly-iii/firefly-iii/issues/1983) Could not use your favorite decimal separator.
- [Issue 1989](https://github.com/firefly-iii/firefly-iii/issues/1989) Bug in YNAB importer forced you to select all accounts.
- [Issue 1990](https://github.com/firefly-iii/firefly-iii/issues/1990) Rule description was invisible in edit screen.
- [Issue 1996](https://github.com/firefly-iii/firefly-iii/issues/1996) Deleted budget would inadvertently also hide transactions.
- [Issue 2001](https://github.com/firefly-iii/firefly-iii/issues/2001) Various issues with tag chart view.
- [Issue 2009](https://github.com/firefly-iii/firefly-iii/issues/2009) Could not change recurrence back to "forever".
- [Issue 2033](https://github.com/firefly-iii/firefly-iii/issues/2033) Longitude can go from -180 to 180.
- [Issue 2034](https://github.com/firefly-iii/firefly-iii/issues/2034) Rules were not being triggered in mass-edit.
- [Issue 2043](https://github.com/firefly-iii/firefly-iii/issues/2043) In rare instances the repetition of a recurring transaction was displayed incorrectly.
- Fixed broken translations in the recurring transactions overview.
- When you create a recurring transfer you make make it fill (or empty) a piggy bank. This was not working, despite a fix in 4.7.8.
- Fixed a bug where the importer would not be capable of creating new currencies.
- Rule trigger tester would skip the amount.

### Security
- OAuth2 form can now submit back to original requester.

### API (0.9.1)
- Submitting transactions with a disabled currency will auto-enable the currency.
- The documentation now states that "Deposit" is a possible return when you get a transaction.
- "savingAsset" was incorrectly documented as "savingsAsset".
- Account endpoint can now return type "reconciliation" and "initial-balance" correctly.
- New API endpoint under `/summary/basic` that gives you a basic overview of the user's finances.
- New API endpoints under `/chart/*` to allow you to render charts.
- `/accounts/x/transactions` now supports the limit query parameter.
- `/budgets/x/transactions` now supports the limit query parameter.
- `/available_budgets` now supports custom start and end date parameters.
- New endpoint `/preferences/prefName` to retrieve a single preference.
- Added field `account_name` to all piggy banks.
- New tag cloud in API.


See the [API docs](https://api-docs.firefly-iii.org/) for more information.

## 4.7.9 - 2018-12-25
### Added
- [Issue 1622](https://github.com/firefly-iii/firefly-iii/issues/1622) Can now unlink a transaction from a bill.
- [Issue 1848](https://github.com/firefly-iii/firefly-iii/issues/1848) Added support for the Swiss Franc.

### Changed
- [Issue 1828](https://github.com/firefly-iii/firefly-iii/issues/1828) Focus on fields for easy access.
- [Issue 1859](https://github.com/firefly-iii/firefly-iii/issues/1859) Warning when seeding database.
- Completely rewritten API. Check out the documentation [here](https://api-docs.firefly-iii.org/).
- Currencies can now be enabled and disabled, making for cleaner views.
- You can disable the `X-Frame-Options` header if this is necessary.
- New fancy favicons.
- Updated and improved docker build.
- Firefly III has been translated into Chinese (Traditional).


### Removed
- Docker build no longer builds its own cURL.

### Fixed
- [Issue 1607](https://github.com/firefly-iii/firefly-iii/issues/1607) [issue 1857](https://github.com/firefly-iii/firefly-iii/issues/1857) [issue 1895](https://github.com/firefly-iii/firefly-iii/issues/1895) Improved bunq import and added support for auto-savings.
- [Issue 1766](https://github.com/firefly-iii/firefly-iii/issues/1766) Extra commands so cache dir is owned by www user.
- [Issue 1811](https://github.com/firefly-iii/firefly-iii/issues/1811) 404 when generating report without options.
- [Issue 1835](https://github.com/firefly-iii/firefly-iii/issues/1835) Strange debug popup removed.
- [Issue 1840](https://github.com/firefly-iii/firefly-iii/issues/1840) Error when exporting data.
- [Issue 1857](https://github.com/firefly-iii/firefly-iii/issues/1857) Bunq import words again (see above).
- [Issue 1858](https://github.com/firefly-iii/firefly-iii/issues/1858) SQL errors when importing CSV.
- [Issue 1861](https://github.com/firefly-iii/firefly-iii/issues/1861) Period navigator was broken.
- [Issue 1864](https://github.com/firefly-iii/firefly-iii/issues/1864) First description was empty on split transactions.
- [Issue 1865](https://github.com/firefly-iii/firefly-iii/issues/1865) Bad math when showing categories.
- [Issue 1868](https://github.com/firefly-iii/firefly-iii/issues/1868) Fixes to FinTS import.
- [Issue 1872](https://github.com/firefly-iii/firefly-iii/issues/1872) Some images had 404's.
- [Issue 1877](https://github.com/firefly-iii/firefly-iii/issues/1877) Several encryption / decryption issues.
- [Issue 1878](https://github.com/firefly-iii/firefly-iii/issues/1878) Wrong nav links
- [Issue 1884](https://github.com/firefly-iii/firefly-iii/issues/1884) Budget API improvements (see above)
- [Issue 1888](https://github.com/firefly-iii/firefly-iii/issues/1888) Transaction API improvements (see above)
- [Issue 1890](https://github.com/firefly-iii/firefly-iii/issues/1890) Fixes in Bills API
- [Issue 1891](https://github.com/firefly-iii/firefly-iii/issues/1891) Typo fixed.
- [Issue 1893](https://github.com/firefly-iii/firefly-iii/issues/1893) Update piggies from recurring transactions.
- [Issue 1898](https://github.com/firefly-iii/firefly-iii/issues/1898) Bug in tag report.
- [Issue 1901](https://github.com/firefly-iii/firefly-iii/issues/1901) Redirect when cloning transactions.
- [Issue 1909](https://github.com/firefly-iii/firefly-iii/issues/1909) Date range fixes.
- [Issue 1916](https://github.com/firefly-iii/firefly-iii/issues/1916) Date range fixes.

## 4.7.8 - 2018-10-28
### Added
- [Issue 1005](https://github.com/firefly-iii/firefly-iii/issues/1005) You can now configure Firefly III to use LDAP. 
- [Issue 1071](https://github.com/firefly-iii/firefly-iii/issues/1071) You can execute transaction rules using the command line (so you can cronjob it)
- [Issue 1108](https://github.com/firefly-iii/firefly-iii/issues/1108) You can now reorder budgets.
- [Issue 1159](https://github.com/firefly-iii/firefly-iii/issues/1159) The ability to import transactions from FinTS-enabled banks.
- [Issue 1727](https://github.com/firefly-iii/firefly-iii/issues/1727) You can now use SFTP as storage for uploads and exports.
- [Issue 1733](https://github.com/firefly-iii/firefly-iii/issues/1733) You can configure Firefly III not to send emails with transaction information in them.



### Changed
- [Issue 1040](https://github.com/firefly-iii/firefly-iii/issues/1040) Fixed various things that would not scale properly in the past.
- [Issue 1771](https://github.com/firefly-iii/firefly-iii/issues/1771) A link to the transaction that fits the bill.
- [Issue 1800](https://github.com/firefly-iii/firefly-iii/issues/1800) Icon updated to match others.
- MySQL database connection now forces the InnoDB to be used.

### Fixed
- [Issue 1583](https://github.com/firefly-iii/firefly-iii/issues/1583) Some times recurring transactions would not fire.
- [Issue 1607](https://github.com/firefly-iii/firefly-iii/issues/1607) Problems with the bunq API, finally solved?! (I feel like a clickbait YouTube video now)
- [Issue 1698](https://github.com/firefly-iii/firefly-iii/issues/1698) Certificate problems in the Docker container
- [Issue 1751](https://github.com/firefly-iii/firefly-iii/issues/1751) Bug in autocomplete
- [Issue 1760](https://github.com/firefly-iii/firefly-iii/issues/1760) Tag report bad math
- [Issue 1765](https://github.com/firefly-iii/firefly-iii/issues/1765) API inconsistencies for piggy banks.
- [Issue 1774](https://github.com/firefly-iii/firefly-iii/issues/1774) Integer exception in SQLite databases
- [Issue 1775](https://github.com/firefly-iii/firefly-iii/issues/1775) Heroku now supports all locales
- [Issue 1778](https://github.com/firefly-iii/firefly-iii/issues/1778) More autocomplete problems fixed
- [Issue 1747](https://github.com/firefly-iii/firefly-iii/issues/1747) Rules now stop at the right moment.
- [Issue 1781](https://github.com/firefly-iii/firefly-iii/issues/1781) Problems when creating new rules.
- [Issue 1784](https://github.com/firefly-iii/firefly-iii/issues/1784) Can now create a liability with an empty balance.
- [Issue 1785](https://github.com/firefly-iii/firefly-iii/issues/1785) Redirect error
- [Issue 1790](https://github.com/firefly-iii/firefly-iii/issues/1790) Show attachments for bills.
- [Issue 1792](https://github.com/firefly-iii/firefly-iii/issues/1792) Mention excluded accounts.
- [Issue 1798](https://github.com/firefly-iii/firefly-iii/issues/1798) Could not recreate deleted piggy banks
- [Issue 1805](https://github.com/firefly-iii/firefly-iii/issues/1805) Fixes when handling foreign currencies
- [Issue 1807](https://github.com/firefly-iii/firefly-iii/issues/1807) Also decrypt deleted records.
- [Issue 1812](https://github.com/firefly-iii/firefly-iii/issues/1812) Fix in transactions API
- [Issue 1815](https://github.com/firefly-iii/firefly-iii/issues/1815) Opening balance account name can now be translated.
- [Issue 1830](https://github.com/firefly-iii/firefly-iii/issues/1830) Multi-user in a single browser could leak autocomplete data.

## 4.7.7 - 2018-10-01

This version of Firefly III requires PHP 7.2. I've already started using several features from 7.2. Please make sure you upgrade.

### Added
- [Issue 954](https://github.com/firefly-iii/firefly-iii/issues/954) Some additional view chart ranges
- [Issue 1710](https://github.com/firefly-iii/firefly-iii/issues/1710) Added a new currency ([hamuz](https://github.com/hamuz)) 
- Transactions will now store (in the database) how they were created.

### Changed
- [Issue 907](https://github.com/firefly-iii/firefly-iii/issues/907) Better and more options on the transaction list.
- [Issue 1450](https://github.com/firefly-iii/firefly-iii/issues/1450) Add a rule to change the type of a transaction automagically
- [Issue 1701](https://github.com/firefly-iii/firefly-iii/issues/1701) Fix reference to PHP executable ([hertzg](https://github.com/hertzg))
- Budget limits have currency information, for future expansion.
- Some charts and pages can handle multiple currencies better.
- New GA code for those who use it.

### Removed
- The credit card liability type has been removed.

### Fixed
- [Issue 896](https://github.com/firefly-iii/firefly-iii/issues/896) Better redirection when coming from deleted objects.
- [Issue 1519](https://github.com/firefly-iii/firefly-iii/issues/1519) Fix autocomplete tags
- [Issue 1607](https://github.com/firefly-iii/firefly-iii/issues/1607) Some fixes for the bunq api calls
- [Issue 1650](https://github.com/firefly-iii/firefly-iii/issues/1650) Add a negated amount column for CSV imports ([hamuz](https://github.com/hamuz))
- [Issue 1658](https://github.com/firefly-iii/firefly-iii/issues/1658) Make font heavy again.
- [Issue 1660](https://github.com/firefly-iii/firefly-iii/issues/1660) Add a negated amount column for CSV imports ([hamuz](https://github.com/hamuz))
- [Issue 1667](https://github.com/firefly-iii/firefly-iii/issues/1667) Fix pie charts
- [Issue 1668](https://github.com/firefly-iii/firefly-iii/issues/1668) YNAB iso_code fix
- [Issue 1670](https://github.com/firefly-iii/firefly-iii/issues/1670) Fix piggy bank API error
- [Issue 1671](https://github.com/firefly-iii/firefly-iii/issues/1671) More options for liability accounts.
- [Issue 1673](https://github.com/firefly-iii/firefly-iii/issues/1673) Fix reconciliation issues.
- [Issue 1675](https://github.com/firefly-iii/firefly-iii/issues/1675) Wrong sum in tag report.
- [Issue 1679](https://github.com/firefly-iii/firefly-iii/issues/1679) Change type of a transaction wouldn't trigger rules.
- [Issue 1682](https://github.com/firefly-iii/firefly-iii/issues/1682) Add liability accounts to transaction conversion
- [Issue 1683](https://github.com/firefly-iii/firefly-iii/issues/1683) See matching transaction showed transfers twice.
- [Issue 1685](https://github.com/firefly-iii/firefly-iii/issues/1685) fix autocomplete for rules
- [Issue 1690](https://github.com/firefly-iii/firefly-iii/issues/1690) Missing highlighted button in intro popup
- [Issue 1691](https://github.com/firefly-iii/firefly-iii/issues/1691) No mention of liabilities in demo text
- [Issue 1695](https://github.com/firefly-iii/firefly-iii/issues/1695) Small fixes in bills pages.
- [Issue 1708](https://github.com/firefly-iii/firefly-iii/issues/1708) Fix by [mathieupost](https://github.com/mathieupost) for bunq
- [Issue 1709](https://github.com/firefly-iii/firefly-iii/issues/1709) Fix oauth buttons 
- [Issue 1712](https://github.com/firefly-iii/firefly-iii/issues/1712) Double slash fix by [hamuz](https://github.com/hamuz)
- [Issue 1719](https://github.com/firefly-iii/firefly-iii/issues/1719) Add missing accounts to API
- [Issue 1720](https://github.com/firefly-iii/firefly-iii/issues/1720) Fix validation for transaction type.
- [Issue 1723](https://github.com/firefly-iii/firefly-iii/issues/1723) API broken for currency exchange rates.
- [Issue 1728](https://github.com/firefly-iii/firefly-iii/issues/1728) Fix problem with transaction factory.
- [Issue 1729](https://github.com/firefly-iii/firefly-iii/issues/1729) Fix bulk transaction editor
- [Issue 1731](https://github.com/firefly-iii/firefly-iii/issues/1731) API failure for budget limits.

### Security
- Secure headers now allow Mapbox and the 2FA QR code.

## 4.7.6.2 - 2018-09-03
### Fixed
- Docker file builds again.
- Fix CSS of OAuth2 authorization view.

## 4.7.6.1 - 2018-09-02
### Fixed
- An issue where I switched variables from the Docker `.env` file to the normal `.env` file and vice versa -- breaking both.
- [Issue 1649](https://github.com/firefly-iii/firefly-iii/issues/1649) 2FA QR code would not show up due to very strict security policy headers
- Docker build gave a cURL error whenever it runs PHP commands.

## 4.7.6 - 2018-09-02
### Added
- [Issue 145](https://github.com/firefly-iii/firefly-iii/issues/145) You can now download transactions from YNAB.
- [Issue 306](https://github.com/firefly-iii/firefly-iii/issues/306) You can now add liabilities to Firefly III.
- [Issue 740](https://github.com/firefly-iii/firefly-iii/issues/740) Various charts are now currency aware.
- [Issue 833](https://github.com/firefly-iii/firefly-iii/issues/833) Bills can use non-default currencies.
- [Issue 1578](https://github.com/firefly-iii/firefly-iii/issues/1578) Firefly III will notify you if the cron job hasn't fired.
- [Issue 1623](https://github.com/firefly-iii/firefly-iii/issues/1623) New transactions will link back from the success message.
- [Issue 1624](https://github.com/firefly-iii/firefly-iii/issues/1624) transactions will link to the object.
- You can call the cron job over the web now (see docs).
- You don't need to call the cron job every minute any more.
- Various charts are now red/green to signify income and expenses.
- Option to add or remove accounts from the net worth calculations.

### Deprecated
- This will be the last release on PHP 7.1. Future versions will require PHP 7.2.

### Fixed
- [Issue 1460](https://github.com/firefly-iii/firefly-iii/issues/1460) Downloading transactions from bunq should go more smoothly.
- [Issue 1464](https://github.com/firefly-iii/firefly-iii/issues/1464) Fixed the docker file to work on Raspberry Pi's.
- [Issue 1540](https://github.com/firefly-iii/firefly-iii/issues/1540) The Docker file now has a working cron job for recurring transactions.
- [Issue 1564](https://github.com/firefly-iii/firefly-iii/issues/1564) Fix double transfers when importing from bunq.
- [Issue 1575](https://github.com/firefly-iii/firefly-iii/issues/1575) Some views would give a XSRF token warning
- [Issue 1576](https://github.com/firefly-iii/firefly-iii/issues/1576) Fix assigning budgets
- [Issue 1580](https://github.com/firefly-iii/firefly-iii/issues/1580) Missing string for translation
- [Issue 1581](https://github.com/firefly-iii/firefly-iii/issues/1581) Expand help text
- [Issue 1584](https://github.com/firefly-iii/firefly-iii/issues/1584) Link to administration is back.
- [Issue 1586](https://github.com/firefly-iii/firefly-iii/issues/1586) Date fields in import were mislabeled.
- [Issue 1593](https://github.com/firefly-iii/firefly-iii/issues/1593) Link types are translatable.
- [Issue 1594](https://github.com/firefly-iii/firefly-iii/issues/1594) Very long breadcrumbs are weird.
- [Issue 1598](https://github.com/firefly-iii/firefly-iii/issues/1598) Fix budget calculations.
- [Issue 1597](https://github.com/firefly-iii/firefly-iii/issues/1597) Piggy banks are always inactive.
- [Issue 1605](https://github.com/firefly-iii/firefly-iii/issues/1605) System will ignore foreign currency setting if user doesn't indicate the amount.
- [Issue 1608](https://github.com/firefly-iii/firefly-iii/issues/1608) Spelling error in command line import.
- [Issue 1609](https://github.com/firefly-iii/firefly-iii/issues/1609) Link to budgets page was absolute.
- [Issue 1615](https://github.com/firefly-iii/firefly-iii/issues/1615) Fix currency bug in transactions.
- [Issue 1616](https://github.com/firefly-iii/firefly-iii/issues/1616) Fix null pointer exception in pie charts.
- [Issue 1617](https://github.com/firefly-iii/firefly-iii/issues/1617) Fix for complex tag names in URL's.
- [Issue 1620](https://github.com/firefly-iii/firefly-iii/issues/1620) Fixed index reference in API.
- [Issue 1639](https://github.com/firefly-iii/firefly-iii/issues/1639) Firefly III trusts the Heroku load balancer, fixing deployment on Heroku.
- [Issue 1642](https://github.com/firefly-iii/firefly-iii/issues/1642) Fix issue with split journals.
- [Issue 1643](https://github.com/firefly-iii/firefly-iii/issues/1643) Fix reconciliation issue.
- Users can no longer give income a budget.
- Fix bug in Spectre import.
- Heroku would not make you owner.
- The rule "tester" will now also take the "strict"-checkbox into account.
 
### Security
- Add `.htaccess` files to all public directories.
- New secure headers will make Firefly III slightly more secure.

## 4.7.5.3 - 2017-07-28
### Added
- Many updated French translations thanks to [@bubka](https://crowdin.com/profile/bubka).

### Fixed
- [Issue 1527](https://github.com/firefly-iii/firefly-iii/issues/1527), fixed views for transactions without a budget.
- [Issue 1553](https://github.com/firefly-iii/firefly-iii/issues/1553), report could not handle transactions before the first one in the system.
- [Issue 1549](https://github.com/firefly-iii/firefly-iii/issues/1549) update a budget will also update any rules that refer to that budget.
- [Issue 1530](https://github.com/firefly-iii/firefly-iii/issues/1530), fix issue with bill chart.
- [Issue 1563](https://github.com/firefly-iii/firefly-iii/issues/1563), fix piggy bank suggested amount
- [Issue 1571](https://github.com/firefly-iii/firefly-iii/issues/1571), fix OAuth in Sandstorm
- [Issue 1568](https://github.com/firefly-iii/firefly-iii/issues/1568), bug in Sandstorm user code.
- [Issue 1569](https://github.com/firefly-iii/firefly-iii/issues/1569), optimized Sandstorm build by [ocdtrekkie](https://github.com/ocdtrekkie)
- Fixed a bug where transfers would be stored inversely when using the CSV import.
- Retired the "Rabobank description"-fix, because it is no longer necessary.
- Fixed a bug where users could not delete budget limits in the API.
- Piggy bank notes are visible again.

## 4.7.5.2 - 2017-07-28
This version was superseeded by v4.7.5.3 because of a critical bug in the proxy-middleware.

## 4.7.5.1 - 2018-07-14
### Fixed
- [Issue 1531](https://github.com/firefly-iii/firefly-iii/issues/1531), the database routine incorrectly reports empty categories.
- [Issue 1532](https://github.com/firefly-iii/firefly-iii/issues/1532), broken dropdown for autosuggest things.
- [Issue 1533](https://github.com/firefly-iii/firefly-iii/issues/1533), fix where the import could not import category names.
- [Issue 1538](https://github.com/firefly-iii/firefly-iii/issues/1538), fix a bug where Spectre would not work when ignoring rules.
- [Issue 1542](https://github.com/firefly-iii/firefly-iii/issues/1542), fix a bug where the importer was incapable of generating new currencies.
- [Issue 1541](https://github.com/firefly-iii/firefly-iii/issues/1541), no longer ignore composer.lock in Docker ignore.
- Bills are stored inactive.

## 4.7.5 - 2018-07-02
### Added
- A new feature called "recurring transactions" that will make Firefly III automatically create transactions for you.
- New API end points for attachments, available budgets, budgets, budget limits, categories, configuration, currency exchange rates, journal links, link types, piggy banks, preferences, recurring transactions, rules, rule groups and tags.
- Added support for YunoHost.

### Changed
- The 2FA secret is visible so you can type it into 2FA apps.
- Bunq and Spectre imports will now ask to apply rules.
- Sandstorm users can now make API keys.

### Fixed
- Various typo's in the English translations. [issue 1493](https://github.com/firefly-iii/firefly-iii/issues/1493)
- Bug where Spectre was never called [issue 1492](https://github.com/firefly-iii/firefly-iii/issues/1492)
- Clear cache after journal is created through API [issue 1483](https://github.com/firefly-iii/firefly-iii/issues/1483)
- Make sure docker directories exist [issue 1500](https://github.com/firefly-iii/firefly-iii/issues/1500)
- Broken link to bill edit [issue 1505](https://github.com/firefly-iii/firefly-iii/issues/1505)
- Several bugs in the editing of split transactions [issue 1509](https://github.com/firefly-iii/firefly-iii/issues/1509)
- Import routine ignored formatting of several date fields [issue 1510](https://github.com/firefly-iii/firefly-iii/issues/1510)
- Piggy bank events now show the correct currency [issue 1446](https://github.com/firefly-iii/firefly-iii/issues/1446)
- Inactive accounts are no longer suggested [issue 1463](https://github.com/firefly-iii/firefly-iii/issues/1463)
- Some income / expense charts are less confusing [issue 1518](https://github.com/firefly-iii/firefly-iii/issues/1518)
- Validation bug in multi-currency create view [issue 1521](https://github.com/firefly-iii/firefly-iii/issues/1521)
- Bug where imported transfers would be stored incorrectly.

## 4.7.4] - 2015-06-03
### Added
- [Issue 1409](https://github.com/firefly-iii/firefly-iii/issues/1409), add Indian Rupee and explain that users can do this themselves [issue 1413](https://github.com/firefly-iii/firefly-iii/issues/1413)
- [Issue 1445](https://github.com/firefly-iii/firefly-iii/issues/1445), upgrade Curl in Docker image.
- [Issue 1386](https://github.com/firefly-iii/firefly-iii/issues/1386), quick links to often used pages.
- [Issue 1405](https://github.com/firefly-iii/firefly-iii/issues/1405), show proposed amount to piggy banks.
- [Issue 1416](https://github.com/firefly-iii/firefly-iii/issues/1416), ability to delete lost attachments.

### Changed
- A completely rewritten import routine that can handle bunq (thanks everybody for testing!), CSV files and Spectre. Please make sure you read about this at http://bit.ly/FF3-new-import
- [Issue 1392](https://github.com/firefly-iii/firefly-iii/issues/1392), explicitly mention rules are inactive (when they are).
- [Issue 1406](https://github.com/firefly-iii/firefly-iii/issues/1406), bill conversion to rules will be smarter about the rules they create.

### Fixed
- [Issue 1369](https://github.com/firefly-iii/firefly-iii/issues/1369), you can now properly order piggy banks again.
- [Issue 1389](https://github.com/firefly-iii/firefly-iii/issues/1389), null-pointer in the import routine.
- [Issue 1400](https://github.com/firefly-iii/firefly-iii/issues/1400), missing translation.
- [Issue 1403](https://github.com/firefly-iii/firefly-iii/issues/1403), bill would always be marked as inactive in edit screen.
- [Issue 1418](https://github.com/firefly-iii/firefly-iii/issues/1418), missing note text on bill page.
- Export routine would break when encountering un-decryptable files.
- [Issue 1425](https://github.com/firefly-iii/firefly-iii/issues/1425), empty fields when edit multiple transactions at once.
- [Issue 1449](https://github.com/firefly-iii/firefly-iii/issues/1449), bad calculations in "budget left to spend" view.
- [Issue 1451](https://github.com/firefly-iii/firefly-iii/issues/1451), same but in another view.
- [Issue 1453](https://github.com/firefly-iii/firefly-iii/issues/1453), same as [issue 1403](https://github.com/firefly-iii/firefly-iii/issues/1403).
- [Issue 1455](https://github.com/firefly-iii/firefly-iii/issues/1455), could add income to a budget.
- [Issue 1442](https://github.com/firefly-iii/firefly-iii/issues/1442), issues with editing a split deposit.
- [Issue 1452](https://github.com/firefly-iii/firefly-iii/issues/1452), date range problems with tags.
- [Issue 1458](https://github.com/firefly-iii/firefly-iii/issues/1458), same for transactions.
- [Issue 2956](https://github.com/firefly-iii/firefly-iii/issues/2956) Switch start and end date automagically when end is before start.
- [Issue 2975](https://github.com/firefly-iii/firefly-iii/issues/2975) Division by zero.
- [Issue 2966](https://github.com/firefly-iii/firefly-iii/issues/2966) Could not render description auto-complete.
- [Issue 2976](https://github.com/firefly-iii/firefly-iii/issues/2976) Make budget dropdown in the same order as the budget list.


### Security
- [Issue 1415](https://github.com/firefly-iii/firefly-iii/issues/1415), will email you when OAuth2 keys are generated.

## 4.7.3.2 - 2018-05-16
### Fixed
- Forgot to increase the version number :(.


## 4.7.3.1 - 2018-05-14
### Fixed
- Fixed a critical bug where the rules-engine would fire inadvertently.

## 4.7.3 - 2018-04-29
### Added
- Currency added to API
- Firfely III will also generate a cash wallet for new users.
- Can now reset Spectre and bunq settings
- Docker file has a time zone
- Allow database connection to be configured in Docker file
- Can now view and edit attachments in edit-screen
- User can visit hidden `/attachments` page
- [Issue 1356](https://github.com/firefly-iii/firefly-iii/issues/1356): Budgets will show the remaining amount per day
- [Issue 1367](https://github.com/firefly-iii/firefly-iii/issues/1367): Rules now come in strict and non-strict mode.
- Added a security.txt
- More support for trusted proxies

### Changed
- Improved edit routine for split transactions.
- Upgrade routine can handle `proc_close` being disabled.
- Bills now use rules to match transactions, making it more flexible.
- [Issue 1328](https://github.com/firefly-iii/firefly-iii/issues/1328): piggy banks no have a more useful chart.
- Spectre API upgraded to v4
- Move to MariaDB ([issue 1366](https://github.com/firefly-iii/firefly-iii/issues/1366))
- Piggy banks take currency from parent account ([issue 1334](https://github.com/firefly-iii/firefly-iii/issues/1334))

### Deprecated
- [Issue 1341](https://github.com/firefly-iii/firefly-iii/issues/1341): Removed depricated command from dockerfile

### Fixed
- Several issues with docker image ([issue 1320](https://github.com/firefly-iii/firefly-iii/issues/1320), [issue 1382](https://github.com/firefly-iii/firefly-iii/issues/1382)).
- Fix giant tags and division by zero ([issue 1325](https://github.com/firefly-iii/firefly-iii/issues/1325) and others)
- Several issues with bunq import ([issue 1352](https://github.com/firefly-iii/firefly-iii/issues/1352), [issue 1330](https://github.com/firefly-iii/firefly-iii/issues/1330), [issue 1378](https://github.com/firefly-iii/firefly-iii/issues/1378), [issue 1380](https://github.com/firefly-iii/firefly-iii/issues/1380))
- [Issue 1246](https://github.com/firefly-iii/firefly-iii/issues/1246): date picker is internationalised
- [Issue 1327](https://github.com/firefly-iii/firefly-iii/issues/1327): fix formattting issues in piggy banks
- [Issue 1348](https://github.com/firefly-iii/firefly-iii/issues/1348): 500 error in API
- [Issue 1349](https://github.com/firefly-iii/firefly-iii/issues/1349): Errors in import routine
- Several fixes for (multi-currency) reconciliation ([issue 1336](https://github.com/firefly-iii/firefly-iii/issues/1336), [issue 1363](https://github.com/firefly-iii/firefly-iii/issues/1363))
- [Issue 1353](https://github.com/firefly-iii/firefly-iii/issues/1353): return NULL values in range-indicator

## 4.7.2.2 - 2018-04-04
### Fixed
- Bug in split transaction edit routine
- Piggy bank percentage was very specific.
- Logging in Slack is easier to config.
- [Issue 1312](https://github.com/firefly-iii/firefly-iii/issues/1312) Import broken for ING accounts
- [Issue 1313](https://github.com/firefly-iii/firefly-iii/issues/1313) Error when creating new asset account
- [Issue 1317](https://github.com/firefly-iii/firefly-iii/issues/1317) Forgot an include :(

## 4.7.2.1 - 2018-04-02
### Fixed
- Null pointer exception in transaction overview.
- Installations running in subdirs were incapable of creating OAuth tokens.
- OAuth keys were not created in all cases.

## 4.7.2 - 2018-04-01
### Added
- [Issue 1123](https://github.com/firefly-iii/firefly-iii/issues/1123) First browser based update routine.
- Add support for Italian.
- [Issue 1232](https://github.com/firefly-iii/firefly-iii/issues/1232) Allow user to specify Docker database port.
- [Issue 1197](https://github.com/firefly-iii/firefly-iii/issues/1197) Beter account list overview 
- [Issue 1202](https://github.com/firefly-iii/firefly-iii/issues/1202) Some budgetary warnings 
- [Issue 1284](https://github.com/firefly-iii/firefly-iii/issues/1284) Experimental support for bunq import
- [Issue 1248](https://github.com/firefly-iii/firefly-iii/issues/1248) Ability to import BIC, ability to import SEPA fields. 
- [Issue 1102](https://github.com/firefly-iii/firefly-iii/issues/1102) Summary line for bills 
- More info to debug page.
- [Issue 1186](https://github.com/firefly-iii/firefly-iii/issues/1186) You can see the latest account balance in CRUD forms 
- Add Kubernetes YAML files, kindly created by a FF3 user.

### Changed
- [Issue 1244](https://github.com/firefly-iii/firefly-iii/issues/1244) Better line for "today" marker and add it to other chart as well ([issue 1214](https://github.com/firefly-iii/firefly-iii/issues/1214))
- [Issue 1219](https://github.com/firefly-iii/firefly-iii/issues/1219) Languages in dropdown 
- [Issue 1189](https://github.com/firefly-iii/firefly-iii/issues/1189) Inactive accounts get removed from net worth 
- [Issue 1220](https://github.com/firefly-iii/firefly-iii/issues/1220) Attachment description and notes migrated to just "notes". 
- [Issue 1236](https://github.com/firefly-iii/firefly-iii/issues/1236) Multi currency balance box 
- [Issue 1240](https://github.com/firefly-iii/firefly-iii/issues/1240) Better overview for accounts. 
- [Issue 1292](https://github.com/firefly-iii/firefly-iii/issues/1292) Removed some charts from the "all"-overview of budgets and categories 
- [Issue 1245](https://github.com/firefly-iii/firefly-iii/issues/1245) Improved recognition of IBANs 
- Improved import routine.
- Update notifier will wait three days before notifying users.
- [Issue 1300](https://github.com/firefly-iii/firefly-iii/issues/1300) Virtual balance of credit cards does not count for net worth 
- [Issue 1247](https://github.com/firefly-iii/firefly-iii/issues/1247) Can now see overspent amount 
- [Issue 1221](https://github.com/firefly-iii/firefly-iii/issues/1221) Upgrade to Laravel 5.6 
- [Issue 1187](https://github.com/firefly-iii/firefly-iii/issues/1187) Updated the password verifier to use Troy Hunt's new API 
- Revenue chart is now on frontpage permanently
- [Issue 1153](https://github.com/firefly-iii/firefly-iii/issues/1153) 2FA settings are in your profile now 
- [Issue 1227](https://github.com/firefly-iii/firefly-iii/issues/1227) Can set the timezone in config or in Docker 

### Fixed
- [Issue 1294](https://github.com/firefly-iii/firefly-iii/issues/1294) Ability to link a transaction to itself 
- Correct reference to journal description in split form.
- [Issue 1234](https://github.com/firefly-iii/firefly-iii/issues/1234) Fix budget page issues in SQLite 
- [Issue 1262](https://github.com/firefly-iii/firefly-iii/issues/1262) Can now use double and epty headers in CSV files 
- [Issue 1258](https://github.com/firefly-iii/firefly-iii/issues/1258) Fixed a possible date mismatch in piggy banks
- [Issue 1283](https://github.com/firefly-iii/firefly-iii/issues/1283) Bulk delete was broken 
- [Issue 1293](https://github.com/firefly-iii/firefly-iii/issues/1293) Layout problem with notes 
- [Issue 1257](https://github.com/firefly-iii/firefly-iii/issues/1257) Improve transaction lists query count 
- [Issue 1291](https://github.com/firefly-iii/firefly-iii/issues/1291) Fixer IO problems 
- [Issue 1239](https://github.com/firefly-iii/firefly-iii/issues/1239) Could not edit expense or revenue accounts ([issue 1298](https://github.com/firefly-iii/firefly-iii/issues/1298)) 
- [Issue 1297](https://github.com/firefly-iii/firefly-iii/issues/1297) Could not convert to withdrawal 
- [Issue 1226](https://github.com/firefly-iii/firefly-iii/issues/1226) Category overview in default report shows no income. 
- Various other bugs and problems ([issue 1198](https://github.com/firefly-iii/firefly-iii/issues/1198), [issue 1213](https://github.com/firefly-iii/firefly-iii/issues/1213), [issue 1237](https://github.com/firefly-iii/firefly-iii/issues/1237), [issue 1238](https://github.com/firefly-iii/firefly-iii/issues/1238), [issue 1199](https://github.com/firefly-iii/firefly-iii/issues/1199), [issue 1200](https://github.com/firefly-iii/firefly-iii/issues/1200))

### Security
- Fixed an issue with token validation on the command line.

## 4.7.1 - 2018-03-04
### Added
- A brand new API. Read about it in the [documentation](http://firefly-iii.readthedocs.io/en/latest/).
- Add support for Spanish. [issue 1194](https://github.com/firefly-iii/firefly-iii/issues/1194)
- Some custom preferences are selected by default for a better user experience.
- Some new currencies [issue 1211](https://github.com/firefly-iii/firefly-iii/issues/1211)

### Fixed
- Fixed [issue 1155](https://github.com/firefly-iii/firefly-iii/issues/1155) (reported by [ndandanov](https://github.com/ndandanov))
- [Issue 1156](https://github.com/firefly-iii/firefly-iii/issues/1156) [issue 1182](https://github.com/firefly-iii/firefly-iii/issues/1182) and other issues related to SQLite databases.
- Multi-page budget overview was broken (reported by [jinformatique](https://github.com/jinformatique))
- Importing CSV files with semi-colons in them did not work [issue 1172](https://github.com/firefly-iii/firefly-iii/issues/1172) [issue 1183](https://github.com/firefly-iii/firefly-iii/issues/1183) [issue 1210](https://github.com/firefly-iii/firefly-iii/issues/1210)
- Could not use account number that was in use by a deleted account [issue 1174](https://github.com/firefly-iii/firefly-iii/issues/1174) 
- Fixed spelling error that lead to 404's [issue 1175](https://github.com/firefly-iii/firefly-iii/issues/1175) [issue 1190](https://github.com/firefly-iii/firefly-iii/issues/1190)
- Fixed tag autocomplete [issue 1178](https://github.com/firefly-iii/firefly-iii/issues/1178)
- Better links for "new transaction" buttons [issue 1185](https://github.com/firefly-iii/firefly-iii/issues/1185)
- Cache errors in budget charts [issue 1192](https://github.com/firefly-iii/firefly-iii/issues/1192)
- Deleting transactions that are linked to other other transactions would lead to errors [issue 1209](https://github.com/firefly-iii/firefly-iii/issues/1209)

## 4.7.0 - 2018-01-31
### Added
- Support for Russian and Portuguese (Brazil)
- Support for the Spectre API (Salt Edge)
- Many strings now translatable thanks to [Nik-vr](https://github.com/Nik-vr) ([issue 1118](https://github.com/firefly-iii/firefly-iii/issues/1118), [issue 1116](https://github.com/firefly-iii/firefly-iii/issues/1116), [issue 1109](https://github.com/firefly-iii/firefly-iii/issues/1109), )
- Many buttons to quickly create stuff
- Sum of tables in reports, requested by [MacPaille](https://github.com/MacPaille) ([issue 1106](https://github.com/firefly-iii/firefly-iii/issues/1106))
- Future versions of Firefly III will notify you there is a new version, as suggested by [8bitgentleman](https://github.com/8bitgentleman) in [issue 1050](https://github.com/firefly-iii/firefly-iii/issues/1050)
- Improved net worth box [issue 1101](https://github.com/firefly-iii/firefly-iii/issues/1101) ([Nik-vr](https://github.com/Nik-vr))
- Nice dropdown in transaction list [issue 1082](https://github.com/firefly-iii/firefly-iii/issues/1082)
- Better support for local fonts thanks to [devlearner](https://github.com/devlearner) ([issue 1145](https://github.com/firefly-iii/firefly-iii/issues/1145))
- Improve attachment support and view capabilities (suggested by [trinhit](https://github.com/trinhit) in [issue 1146](https://github.com/firefly-iii/firefly-iii/issues/1146))

### Changed
- Whole new [read me file](https://github.com/firefly-iii/firefly-iii/blob/main/readme.md), [new end user documentation](https://firefly-iii.readthedocs.io/en/latest/) and an [updated website](https://www.firefly-iii.org/)!
- Many charts and info-blocks now scale property ([issue 989](https://github.com/firefly-iii/firefly-iii/issues/989) and [issue 1040](https://github.com/firefly-iii/firefly-iii/issues/1040))

### Fixed
- Charts work in IE thanks to [devlearner](https://github.com/devlearner) ([issue 1107](https://github.com/firefly-iii/firefly-iii/issues/1107))
- Various fixes in import routine
- Bug that left charts empty ([issue 1088](https://github.com/firefly-iii/firefly-iii/issues/1088)), reported by various users amongst which [jinformatique](https://github.com/jinformatique)
- [Issue 1124](https://github.com/firefly-iii/firefly-iii/issues/1124), as reported by [gavu](https://github.com/gavu)
- [Issue 1125](https://github.com/firefly-iii/firefly-iii/issues/1125), as reported by [gavu](https://github.com/gavu)
- [Issue 1126](https://github.com/firefly-iii/firefly-iii/issues/1126), as reported by [gavu](https://github.com/gavu)
- [Issue 1131](https://github.com/firefly-iii/firefly-iii/issues/1131), as reported by [dp87](https://github.com/dp87)
- [Issue 1129](https://github.com/firefly-iii/firefly-iii/issues/1129), as reported by [gavu](https://github.com/gavu)
- [Issue 1132](https://github.com/firefly-iii/firefly-iii/issues/1132), as reported by [gavu](https://github.com/gavu)
- Issue with cache in Sandstorm ([issue 1130](https://github.com/firefly-iii/firefly-iii/issues/1130))
- [Issue 1134](https://github.com/firefly-iii/firefly-iii/issues/1134)
- [Issue 1140](https://github.com/firefly-iii/firefly-iii/issues/1140)
- [Issue 1141](https://github.com/firefly-iii/firefly-iii/issues/1141), reported by [ErikFontanel](https://github.com/ErikFontanel)
- [Issue 1142](https://github.com/firefly-iii/firefly-iii/issues/1142)

### Security
- Removed many access rights from the demo user

## 4.6.13 - 2018-01-06
### Added
- [Issue 1074](https://github.com/firefly-iii/firefly-iii/issues/1074), suggested by [MacPaille](https://github.com/MacPaille)
- [Issue 1077](https://github.com/firefly-iii/firefly-iii/issues/1077), suggested by [wtercato](https://github.com/wtercato)
- Bulk edit of transactions thanks to [vicmosin](https://github.com/vicmosin) ([issue 1078](https://github.com/firefly-iii/firefly-iii/issues/1078))
- Support for Turkish.
- [Issue 1090](https://github.com/firefly-iii/firefly-iii/issues/1090), suggested by [Findus23](https://github.com/Findus23)
- [Issue 1097](https://github.com/firefly-iii/firefly-iii/issues/1097), suggested by [kelvinhammond](https://github.com/kelvinhammond)
- [Issue 1093](https://github.com/firefly-iii/firefly-iii/issues/1093), suggested by [jinformatique](https://github.com/jinformatique)
- [Issue 1098](https://github.com/firefly-iii/firefly-iii/issues/1098), suggested by [Nik-vr](https://github.com/Nik-vr)

### Fixed
- [Issue 972](https://github.com/firefly-iii/firefly-iii/issues/972), reported by [pjotrvdh](https://github.com/pjotrvdh)
- [Issue 1079](https://github.com/firefly-iii/firefly-iii/issues/1079), reported by [gavu](https://github.com/gavu)
- [Issue 1080](https://github.com/firefly-iii/firefly-iii/issues/1080), reported by [zjean](https://github.com/zjean)
- [Issue 1083](https://github.com/firefly-iii/firefly-iii/issues/1083), reported by [skuzzle](https://github.com/skuzzle)
- [Issue 1085](https://github.com/firefly-iii/firefly-iii/issues/1085), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 1087](https://github.com/firefly-iii/firefly-iii/issues/1087), reported by [4oo4](https://github.com/4oo4)
- [Issue 1089](https://github.com/firefly-iii/firefly-iii/issues/1089), reported by [robin5210](https://github.com/robin5210)
- [Issue 1092](https://github.com/firefly-iii/firefly-iii/issues/1092), reported by [kelvinhammond](https://github.com/kelvinhammond)
- [Issue 1096](https://github.com/firefly-iii/firefly-iii/issues/1096), reported by [wtercato](https://github.com/wtercato)

## 4.6.12 - 2017-12-31
### Added
- Support for Indonesian.
- New report, see [issue 384](https://github.com/firefly-iii/firefly-iii/issues/384)
- [Issue 964](https://github.com/firefly-iii/firefly-iii/issues/964) as suggested by [gavu](https://github.com/gavu)

### Changed
- Greatly improved Docker support and documentation.

### Fixed
- [Issue 1046](https://github.com/firefly-iii/firefly-iii/issues/1046), as reported by [pkoziol](https://github.com/pkoziol)
- [Issue 1047](https://github.com/firefly-iii/firefly-iii/issues/1047), as reported by [pkoziol](https://github.com/pkoziol)
- [Issue 1048](https://github.com/firefly-iii/firefly-iii/issues/1048), as reported by [webence](https://github.com/webence)
- [Issue 1049](https://github.com/firefly-iii/firefly-iii/issues/1049), as reported by [nicoschreiner](https://github.com/nicoschreiner) 
- [Issue 1015](https://github.com/firefly-iii/firefly-iii/issues/1015), as reported by a user on Tweakers.net
- [Issue 1056](https://github.com/firefly-iii/firefly-iii/issues/1056), as reported by [repercussion](https://github.com/repercussion) 
- [Issue 1061](https://github.com/firefly-iii/firefly-iii/issues/1061), as reported by [Meizikyn](https://github.com/Meizikyn)
- [Issue 1045](https://github.com/firefly-iii/firefly-iii/issues/1045), as reported by [gavu](https://github.com/gavu)
- First code for [issue 1040](https://github.com/firefly-iii/firefly-iii/issues/1040) ([simonsmiley](https://github.com/simonsmiley))
- [Issue 1059](https://github.com/firefly-iii/firefly-iii/issues/1059), as reported by [4oo4](https://github.com/4oo4)
- [Issue 1063](https://github.com/firefly-iii/firefly-iii/issues/1063), as reported by [pkoziol](https://github.com/pkoziol)
- [Issue 1064](https://github.com/firefly-iii/firefly-iii/issues/1064), as reported by [pkoziol](https://github.com/pkoziol)
- [Issue 1066](https://github.com/firefly-iii/firefly-iii/issues/1066), reported by [wtercato](https://github.com/wtercato)


## 4.6.11.1 - 2017-12-08
### Added
- Import routine can scan for matching bills, [issue 956](https://github.com/firefly-iii/firefly-iii/issues/956)

### Changed
- Import will no longer scan for rules, this has become optional. Originally suggested in [issue 956](https://github.com/firefly-iii/firefly-iii/issues/956) by [gavu](https://github.com/gavu) 
- [Issue 1033](https://github.com/firefly-iii/firefly-iii/issues/1033), as reported by [Jumanjii](https://github.com/Jumanjii)
- [Issue 1033](https://github.com/firefly-iii/firefly-iii/issues/1034), as reported by [Aquariu](https://github.com/Aquariu)
- Extra admin check for [issue 1039](https://github.com/firefly-iii/firefly-iii/issues/1039), as reported by [ocdtrekkie](https://github.com/ocdtrekkie)

### Fixed
- Missing translations ([issue 1026](https://github.com/firefly-iii/firefly-iii/issues/1026)), as reported by [gavu](https://github.com/gavu) and [zjean](https://github.com/zjean)
- [Issue 1028](https://github.com/firefly-iii/firefly-iii/issues/1028), reported by [zjean](https://github.com/zjean)
- [Issue 1029](https://github.com/firefly-iii/firefly-iii/issues/1029), reported by [zjean](https://github.com/zjean)
- [Issue 1030](https://github.com/firefly-iii/firefly-iii/issues/1030), as reported by [Traxxi](https://github.com/Traxxi)
- [Issue 1036](https://github.com/firefly-iii/firefly-iii/issues/1036), as reported by [webence](https://github.com/webence)
- [Issue 1038](https://github.com/firefly-iii/firefly-iii/issues/1038), as reported by [gavu](https://github.com/gavu)

## 4.6.11 - 2017-11-30
### Added
- A debug page at `/debug` for easier debug.
- Strings translatable (see [issue 976](https://github.com/firefly-iii/firefly-iii/issues/976)), thanks to [Findus23](https://github.com/Findus23)
- Even more strings are translatable (and translated), thanks to [pkoziol](https://github.com/pkoziol) (see [issue 979](https://github.com/firefly-iii/firefly-iii/issues/979))
- Reconciliation of accounts ([issue 736](https://github.com/firefly-iii/firefly-iii/issues/736)), as requested by [kristophr](https://github.com/kristophr) and several others

### Changed
- Extended currency list, as suggested by [emuhendis](https://github.com/emuhendis) in [issue 994](https://github.com/firefly-iii/firefly-iii/issues/994)
- [Issue 996](https://github.com/firefly-iii/firefly-iii/issues/996) as suggested by [dp87](https://github.com/dp87)

### Removed
- Disabled Heroku support until I get it working again.

### Fixed
- [Issue 980](https://github.com/firefly-iii/firefly-iii/issues/980), reported by [Tim-Frensch](https://github.com/Tim-Frensch)
- [Issue 987](https://github.com/firefly-iii/firefly-iii/issues/987), reported by [gavu](https://github.com/gavu)
- [Issue 988](https://github.com/firefly-iii/firefly-iii/issues/988), reported by [gavu](https://github.com/gavu)
- [Issue 992](https://github.com/firefly-iii/firefly-iii/issues/992), reported by [ncicovic](https://github.com/ncicovic)
- [Issue 993](https://github.com/firefly-iii/firefly-iii/issues/993), reported by [gavu](https://github.com/gavu)
- [Issue 997](https://github.com/firefly-iii/firefly-iii/issues/997), reported by [gavu](https://github.com/gavu)
- [Issue 1000](https://github.com/firefly-iii/firefly-iii/issues/1000), reported by [xpfgsyb](https://github.com/xpfgsyb)
- [Issue 1001](https://github.com/firefly-iii/firefly-iii/issues/1001), reported by [gavu](https://github.com/gavu)
- [Issue 1002](https://github.com/firefly-iii/firefly-iii/issues/1002), reported by [ursweiss](https://github.com/ursweiss)
- [Issue 1003](https://github.com/firefly-iii/firefly-iii/issues/1003), reported by [ursweiss](https://github.com/ursweiss)
- [Issue 1004](https://github.com/firefly-iii/firefly-iii/issues/1004), reported by [Aquariu](https://github.com/Aquariu)
- [Issue 1010](https://github.com/firefly-iii/firefly-iii/issues/1010)
- [Issue 1014](https://github.com/firefly-iii/firefly-iii/issues/1014), reported by [ursweiss](https://github.com/ursweiss)
- [Issue 1016](https://github.com/firefly-iii/firefly-iii/issues/1016)
- [Issue 1024](https://github.com/firefly-iii/firefly-iii/issues/1024), reported by [gavu](https://github.com/gavu)
- [Issue 1025](https://github.com/firefly-iii/firefly-iii/issues/1025), reported by [gavu](https://github.com/gavu)


## 4.6.10 - 2017-11-03
### Added
- Greatly expanded Docker support thanks to [alazare619](https://github.com/alazare619)
- [Issue 967](https://github.com/firefly-iii/firefly-iii/issues/967), thanks to [Aquariu](https://github.com/Aquariu)

### Changed
- Improved Sandstorm support.

### Fixed
- [Issue 963](https://github.com/firefly-iii/firefly-iii/issues/963), as reported by [gavu](https://github.com/gavu)
- [Issue 970](https://github.com/firefly-iii/firefly-iii/issues/970), as reported by [gavu](https://github.com/gavu)
- [Issue 971](https://github.com/firefly-iii/firefly-iii/issues/971), as reported by [gavu](https://github.com/gavu)
- Various Sandstorm.io related issues.

## 4.6.9 - 2017-10-22
### Added
- Firefly III is now available on the [Sandstorm.io](https://apps.sandstorm.io/app/uws252ya9mep4t77tevn85333xzsgrpgth8q4y1rhknn1hammw70) market.
- Issue template
- Pull request template
- Clean up routine to remove double budget limits (see [issue 932](https://github.com/firefly-iii/firefly-iii/issues/932))

### Changed
- Changed license to GPLv3.

### Fixed
- [Issue 895](https://github.com/firefly-iii/firefly-iii/issues/895), as reported by [gavu](https://github.com/gavu)
- [Issue 902](https://github.com/firefly-iii/firefly-iii/issues/902), as reported by [gavu](https://github.com/gavu)
- [Issue 916](https://github.com/firefly-iii/firefly-iii/issues/916), as reported by [gavu](https://github.com/gavu)
- [Issue 942](https://github.com/firefly-iii/firefly-iii/issues/942), as reported by [pkoziol](https://github.com/pkoziol)
- [Issue 943](https://github.com/firefly-iii/firefly-iii/issues/943), as reported by [aclex](https://github.com/aclex)
- [Issue 944](https://github.com/firefly-iii/firefly-iii/issues/944), as reported by [gavu](https://github.com/gavu)
- [Issue 932](https://github.com/firefly-iii/firefly-iii/issues/932), as reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 933](https://github.com/firefly-iii/firefly-iii/issues/933), as reported by [nicoschreiner](https://github.com/nicoschreiner)

## 4.6.8 - 2017-10-15
### Added
- Verify routine will check if deposits have a budget (they shouldn't).
- New translations!

### Changed
- Changed docker files for [issue 919](https://github.com/firefly-iii/firefly-iii/issues/919) and [issue 915](https://github.com/firefly-iii/firefly-iii/issues/915)

### Fixed
- [Issue 917](https://github.com/firefly-iii/firefly-iii/issues/917), as reported by [Wr0ngName](https://github.com/Wr0ngName)
- Rules can no longer set a budget for a transfer or a deposit ([issue 916](https://github.com/firefly-iii/firefly-iii/issues/916))
- Fixed [issue 925](https://github.com/firefly-iii/firefly-iii/issues/925), [issue 928](https://github.com/firefly-iii/firefly-iii/issues/928) as reported by [dzaikos](https://github.com/dzaikos) and [DeltaKiloz](https://github.com/DeltaKiloz)
- A fix for [issue 926](https://github.com/firefly-iii/firefly-iii/issues/926), as reported by [Aquariu](https://github.com/Aquariu)

## 4.6.7 - 2017-10-09
### Added
- [Issue 872](https://github.com/firefly-iii/firefly-iii/issues/872), reported [gavu](https://github.com/gavu)

### Fixed
- [Issue 878](https://github.com/firefly-iii/firefly-iii/issues/878), fixed by [Findus23](https://github.com/Findus23)
- [Issue 881](https://github.com/firefly-iii/firefly-iii/issues/881), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 884](https://github.com/firefly-iii/firefly-iii/issues/884), by [gavu](https://github.com/gavu)
- [Issue 840](https://github.com/firefly-iii/firefly-iii/issues/840), reported by [MacPaille](https://github.com/MacPaille)
- [Issue 882](https://github.com/firefly-iii/firefly-iii/issues/882), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 891](https://github.com/firefly-iii/firefly-iii/issues/891), [issue 892](https://github.com/firefly-iii/firefly-iii/issues/892), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 891](https://github.com/firefly-iii/firefly-iii/issues/891), reported by [gavu](https://github.com/gavu)
- [Issue 827](https://github.com/firefly-iii/firefly-iii/issues/827), fixed by [pkoziol](https://github.com/pkoziol)
- [Issue 903](https://github.com/firefly-iii/firefly-iii/issues/903), fixed by [hduijn](https://github.com/hduijn)
- [Issue 904](https://github.com/firefly-iii/firefly-iii/issues/904), reported by [gavu](https://github.com/gavu)
- [Issue 910](https://github.com/firefly-iii/firefly-iii/issues/910), reported by [gavu](https://github.com/gavu)
- [Issue 911](https://github.com/firefly-iii/firefly-iii/issues/911), reported by [gavu](https://github.com/gavu)
- [Issue 915](https://github.com/firefly-iii/firefly-iii/issues/915), reported by [TomWis97](https://github.com/TomWis97)
- [Issue 917](https://github.com/firefly-iii/firefly-iii/issues/917), reported by [Wr0ngName](https://github.com/Wr0ngName)

## 4.6.6 - 2017-09-30
### Added
- [Issue 826](https://github.com/firefly-iii/firefly-iii/issues/826), reported by [pkoziol](https://github.com/pkoziol).
- [Issue 855](https://github.com/firefly-iii/firefly-iii/issues/855), by [ms32035](https://github.com/ms32035)
- [Issue 786](https://github.com/firefly-iii/firefly-iii/issues/786), by [SmilingWorlock](https://github.com/SmilingWorlock)
- [Issue 875](https://github.com/firefly-iii/firefly-iii/issues/875), by [gavu](https://github.com/gavu)
- [Issue 834](https://github.com/firefly-iii/firefly-iii/issues/834), by [gavu](https://github.com/gavu) (and others)


### Changed
- Upgraded to Laravel 5.5
- Add version parameter to CSS and JS files
- [Issue 823](https://github.com/firefly-iii/firefly-iii/issues/823), [issue 824](https://github.com/firefly-iii/firefly-iii/issues/824) fixed Docker config by [DieBauer](https://github.com/DieBauer)

### Fixed
- [Issue 830](https://github.com/firefly-iii/firefly-iii/issues/830)
- [Issue 822](https://github.com/firefly-iii/firefly-iii/issues/822), reported by [gazben](https://github.com/gazben)
- [Issue 827](https://github.com/firefly-iii/firefly-iii/issues/827), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 835](https://github.com/firefly-iii/firefly-iii/issues/835), reported by [gavu](https://github.com/gavu)
- [Issue 836](https://github.com/firefly-iii/firefly-iii/issues/836), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 838](https://github.com/firefly-iii/firefly-iii/issues/838), reported by [gavu](https://github.com/gavu)
- [Issue 839](https://github.com/firefly-iii/firefly-iii/issues/839), reported by [gavu](https://github.com/gavu)
- [Issue 843](https://github.com/firefly-iii/firefly-iii/issues/843), reported by [gavu](https://github.com/gavu)
- [Issue 837](https://github.com/firefly-iii/firefly-iii/issues/837), reported by [gavu](https://github.com/gavu)
- [Issue 845](https://github.com/firefly-iii/firefly-iii/issues/845), reported by [gavu](https://github.com/gavu)
- [Issue 846](https://github.com/firefly-iii/firefly-iii/issues/846), reported by [gavu](https://github.com/gavu)
- [Issue 848](https://github.com/firefly-iii/firefly-iii/issues/848), reported by [gavu](https://github.com/gavu)
- [Issue 854](https://github.com/firefly-iii/firefly-iii/issues/854), reported by [gavu](https://github.com/gavu)
- [Issue 866](https://github.com/firefly-iii/firefly-iii/issues/866), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 847](https://github.com/firefly-iii/firefly-iii/issues/847), reported by [gavu](https://github.com/gavu)
- [Issue 853](https://github.com/firefly-iii/firefly-iii/issues/853), reported by [gavu](https://github.com/gavu)
- [Issue 857](https://github.com/firefly-iii/firefly-iii/issues/857), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 865](https://github.com/firefly-iii/firefly-iii/issues/865), reported by [simonsmiley](https://github.com/simonsmiley)
- [Issue 826](https://github.com/firefly-iii/firefly-iii/issues/826), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 856](https://github.com/firefly-iii/firefly-iii/issues/856), reported by [ms32035](https://github.com/ms32035)
- [Issue 860](https://github.com/firefly-iii/firefly-iii/issues/860), reported by [gavu](https://github.com/gavu)
- [Issue 861](https://github.com/firefly-iii/firefly-iii/issues/861), reported by [gavu](https://github.com/gavu)
- [Issue 870](https://github.com/firefly-iii/firefly-iii/issues/870), reported by [gavu](https://github.com/gavu)

## 4.6.5 - 2017-09-09

### Added
- [Issue 616](https://github.com/firefly-iii/firefly-iii/issues/616), The ability to link transactions
- [Issue 763](https://github.com/firefly-iii/firefly-iii/issues/763), as suggested by [tannie](https://github.com/tannie)
- [Issue 770](https://github.com/firefly-iii/firefly-iii/issues/770), as suggested by [skibbipl](https://github.com/skibbipl)
- [Issue 780](https://github.com/firefly-iii/firefly-iii/issues/780), as suggested by [skibbipl](https://github.com/skibbipl)
- [Issue 784](https://github.com/firefly-iii/firefly-iii/issues/784), as suggested by [SmilingWorlock](https://github.com/SmilingWorlock)
- Lots of code for future support of automated Bunq imports

### Changed
- Rewrote the export routine
- [Issue 782](https://github.com/firefly-iii/firefly-iii/issues/782), as suggested by [NiceGuyIT](https://github.com/NiceGuyIT)
- [Issue 800](https://github.com/firefly-iii/firefly-iii/issues/800), as suggested by [jleeong](https://github.com/jleeong)

### Fixed
- [Issue 724](https://github.com/firefly-iii/firefly-iii/issues/724), reported by [skibbipl](https://github.com/skibbipl)
- [Issue 738](https://github.com/firefly-iii/firefly-iii/issues/738), reported by [skibbipl](https://github.com/skibbipl)
- [Issue 760](https://github.com/firefly-iii/firefly-iii/issues/760), reported by [leander091](https://github.com/leander091)
- [Issue 764](https://github.com/firefly-iii/firefly-iii/issues/764), reported by [tannie](https://github.com/tannie)
- [Issue 792](https://github.com/firefly-iii/firefly-iii/issues/792), reported by [jleeong](https://github.com/jleeong)
- [Issue 793](https://github.com/firefly-iii/firefly-iii/issues/793), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 797](https://github.com/firefly-iii/firefly-iii/issues/797), reported by [leander091](https://github.com/leander091)
- [Issue 801](https://github.com/firefly-iii/firefly-iii/issues/801), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 803](https://github.com/firefly-iii/firefly-iii/issues/803), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 805](https://github.com/firefly-iii/firefly-iii/issues/805), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 806](https://github.com/firefly-iii/firefly-iii/issues/806), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 807](https://github.com/firefly-iii/firefly-iii/issues/807), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 808](https://github.com/firefly-iii/firefly-iii/issues/808), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 809](https://github.com/firefly-iii/firefly-iii/issues/809), reported by [pkoziol](https://github.com/pkoziol)
- [Issue 814](https://github.com/firefly-iii/firefly-iii/issues/814), reported by [nicoschreiner](https://github.com/nicoschreiner)
- [Issue 818](https://github.com/firefly-iii/firefly-iii/issues/818), reported by [gavu](https://github.com/gavu)
- [Issue 819](https://github.com/firefly-iii/firefly-iii/issues/819), reported by [DieBauer](https://github.com/DieBauer)
- [Issue 820](https://github.com/firefly-iii/firefly-iii/issues/820), reported by [simonsmiley](https://github.com/simonsmiley) 
- Various other fixes


## 4.6.4 - 2017-08-13
### Added
- PHP7.1 support
- Routine to decrypt attachments from the command line, for [issue 671](https://github.com/firefly-iii/firefly-iii/issues/671)
- A routine that can check if your password has been stolen in the past.
- Split transaction shows amount left to be split


### Changed
- Importer can (potentially) handle new import routines such as banks.
- Importer can fall back from JSON errors 

### Removed
- PHP7.0 support
- Support for extended tag modes
- Remove "time jumps" to non-empty periods


### Fixed
- [Issue 717](https://github.com/firefly-iii/firefly-iii/issues/717), reported by [NiceGuyIT](https://github.com/NiceGuyIT)
- [Issue 718](https://github.com/firefly-iii/firefly-iii/issues/718), reported by [wtercato](https://github.com/wtercato)
- [Issue 722](https://github.com/firefly-iii/firefly-iii/issues/722), reported by [simonsmiley](https://github.com/simonsmiley)
- [Issue 648](https://github.com/firefly-iii/firefly-iii/issues/648), reported by [skibbipl](https://github.com/skibbipl)
- [Issue 730](https://github.com/firefly-iii/firefly-iii/issues/730), reported by [ragnarkarlsson](https://github.com/ragnarkarlsson)
- [Issue 733](https://github.com/firefly-iii/firefly-iii/issues/733), reported by [xpfgsyb](https://github.com/xpfgsyb)
- [Issue 735](https://github.com/firefly-iii/firefly-iii/issues/735), reported by [kristophr](https://github.com/kristophr)
- [Issue 739](https://github.com/firefly-iii/firefly-iii/issues/739), reported by [skibbipl](https://github.com/skibbipl)
- [Issue 515](https://github.com/firefly-iii/firefly-iii/issues/515), reported by [schwalberich](https://github.com/schwalberich)
- [Issue 743](https://github.com/firefly-iii/firefly-iii/issues/743), reported by [simonsmiley](https://github.com/simonsmiley)
- [Issue 746](https://github.com/firefly-iii/firefly-iii/issues/746), reported by [tannie](https://github.com/tannie)
- [Issue 747](https://github.com/firefly-iii/firefly-iii/issues/747), reported by [tannie](https://github.com/tannie)


## 4.6.3.1 - 2017-07-23
### Fixed
- Hotfix to close [issue 715](https://github.com/firefly-iii/firefly-iii/issues/715)

## 4.6.3 - 2017-07-23

This will be the last release to support PHP 7.0.

### Added
- New guidelines and new introduction tour to aid new users.
- Rules can now be applied at will to transactions, not just rule groups.

### Changed
- Improved category overview.
- Improved budget overview.
- Improved budget report.
- Improved command line import responsiveness and speed.
- All code comparisons are now strict.
- Improve search page.
- Charts are easier to read thanks to [simonsmiley](https://github.com/simonsmiley)
- Fixed [issue 708](https://github.com/firefly-iii/firefly-iii/issues/708).

### Fixed
- Fixed bug where import would not respect default account. [issue 694](https://github.com/firefly-iii/firefly-iii/issues/694)
- Fixed various broken paths
- Fixed several import inconsistencies.
- Various bug fixes.

## 4.6.2 - 2017-07-08
### Added
- Links added to boxes, idea by [simonsmiley](https://github.com/simonsmiley)

### Fixed
- Various bugs in import routine

## 4.6.1 - 2017-07-02
### Fixed
- Fixed several small issues all around.

## 4.6.0 - 2017-06-28

### Changed
- Revamped import routine. Will be buggy.

### Fixed
- [Issue 667](https://github.com/firefly-iii/firefly-iii/issues/667), postgresql reported by [skibbipl](https://github.com/skibbipl).
- [Issue 680](https://github.com/firefly-iii/firefly-iii/issues/680), fixed by [Xeli](https://github.com/Xeli)
- Fixed [issue 660](https://github.com/firefly-iii/firefly-iii/issues/660)
- Fixes [issue 672](https://github.com/firefly-iii/firefly-iii/issues/672), reported by [dzaikos](https://github.com/dzaikos)
- Fix a bug where the balance routine forgot to account for accounts without a currency preference.
- Various other bugfixes.

## 4.5.0 - 2017-06-07

### Added
- Better support for multi-currency transactions and display of transactions, accounts and everything. This requires a database overhaul (moving the currency information to specific transactions) so be careful when upgrading.
- Translations for Spanish and Slovenian.
- New interface for budget page, ~~stolen from~~ inspired by YNAB.
- Expanded Docker to work with postgresql as well, thanks to [kressh](https://github.com/kressh)

### Fixed
- PostgreSQL support in database upgrade routine ([issue 644](https://github.com/firefly-iii/firefly-iii/issues/644), reported by [skibbipl](https://github.com/skibbipl))
- Frontpage budget chart was off, fix by [nhaarman](https://github.com/nhaarman)
- Was not possible to remove opening balance.

## 4.4.3 - 2017-05-03
### Added
- Added support for Slovenian
- Removed support for Spanish. No translations whatsoever by the guy who requested it.
- Removed support for Russian. Same thing.
- Removed support for Croatian. Same thing.
- Removed support for Chinese Traditional, Hong Kong. Same thing.

### Changed
- The journal collector, an internal piece of code to collect transactions, now uses a slightly different method of collecting journals. This may cause problems.

### Fixed
- [Issue 638](https://github.com/firefly-iii/firefly-iii/issues/638) as reported by [worldworm](https://github.com/worldworm).
- Possible fix for [issue 624](https://github.com/firefly-iii/firefly-iii/issues/624)

## 4.4.2 - 2017-04-27
### Fixed
- Fixed a bug where the opening balance could not be stored.

## 4.4.1 - 2017-04-27

### Added
- Support for deployment on Heroku

### Fixed
- Bug in new-user routine.

## 4.4.0 - 2017-04-23
### Added
- Firefly III can now handle foreign currencies better, including some code to get the exchange rate live from the web.
- Can now make rules for attachments, see [issue 608](https://github.com/firefly-iii/firefly-iii/issues/608), as suggested by [dzaikos](https://github.com/dzaikos).

### Fixed
- Fixed [issue 629](https://github.com/firefly-iii/firefly-iii/issues/629), reported by [forcaeluz](https://github.com/forcaeluz)
- Fixed [issue 630](https://github.com/firefly-iii/firefly-iii/issues/630), reported by [welbert](https://github.com/welbert)
- And more various bug fixes.

## 4.3.8 - 2017-04-08

### Added
- Better overview / show pages.
- [Issue 628](https://github.com/firefly-iii/firefly-iii/issues/628), as reported by [xzaz](https://github.com/xzaz).
- Greatly expanded test coverage

### Fixed
- [Issue 619](https://github.com/firefly-iii/firefly-iii/issues/619), as reported by [dfiel](https://github.com/dfiel).
- [Issue 620](https://github.com/firefly-iii/firefly-iii/issues/620), as reported by [forcaeluz](https://github.com/forcaeluz).
- Attempt to fix [issue 624](https://github.com/firefly-iii/firefly-iii/issues/624), as reported by [TheSerenin](https://github.com/TheSerenin).
- Favicon link is relative now, fixed by [welbert](https://github.com/welbert).
- Some search bugs

## 4.3.7 - 2017-03-06
### Added
- Nice user friendly views for empty lists.
- Extended contribution guidelines.
- First version of financial report filtered on tags.
- Suggested monthly savings for piggy banks, by [Zsub](https://github.com/Zsub)
- Better test coverage.

### Changed
- Slightly changed tag overview.
- Consistent icon for bill in list.
- Slightly changed account overview.

### Removed
- Removed IDE specific views from .gitignore, [issue 598](https://github.com/firefly-iii/firefly-iii/issues/598)

### Fixed
- Force key generation during installation.
- The `date` function takes the fieldname where a date is stored, not the literal date by [Zsub](https://github.com/Zsub)
- Improved budget frontpage chart, as suggested by [skibbipl](https://github.com/skibbipl)
- [Issue 602](https://github.com/firefly-iii/firefly-iii/issues/602) and [issue 607](https://github.com/firefly-iii/firefly-iii/issues/607), as reported by [skibbipl](https://github.com/skibbipl) and [dzaikos](https://github.com/dzaikos).
- [Issue 605](https://github.com/firefly-iii/firefly-iii/issues/605), as reported by [Zsub](https://github.com/Zsub).
- [Issue 599](https://github.com/firefly-iii/firefly-iii/issues/599), as reported by [leander091](https://github.com/leander091).
- [Issue 610](https://github.com/firefly-iii/firefly-iii/issues/610), as reported by [skibbipl](https://github.com/skibbipl).
- [Issue 611](https://github.com/firefly-iii/firefly-iii/issues/611), as reported by [ragnarkarlsson](https://github.com/ragnarkarlsson).
- [Issue 612](https://github.com/firefly-iii/firefly-iii/issues/612), as reported by [ragnarkarlsson](https://github.com/ragnarkarlsson).
- [Issue 614](https://github.com/firefly-iii/firefly-iii/issues/614), as reported by [worldworm](https://github.com/worldworm).
- Various other bug fixes.

## 4.3.6 - 2017-02-20
### Fixed
- [Issue 578](https://github.com/firefly-iii/firefly-iii/issues/578), reported by [xpfgsyb](https://github.com/xpfgsyb).

## 4.3.5 - 2017-02-19
### Added
- Beta support for Sandstorm.IO
- Docker support by [schoentoon](https://github.com/schoentoon), [elohmeier](https://github.com/elohmeier), [patrickkostjens](https://github.com/patrickkostjens) and [crash7](https://github.com/crash7)!
- Can now use special keywords in the search to search for specic dates, categories, etc.

### Changed
- Updated to laravel 5.4!
- User friendly error message
- Updated locales to support more operating systems, first reported in [issue 536](https://github.com/firefly-iii/firefly-iii/issues/536) by [dabenzel](https://github.com/dabenzel)
- Updated budget report
- Improved 404 page
- Smooth curves, improved by [elamperti](https://github.com/elamperti).

### Fixed
- [Issue 549](https://github.com/firefly-iii/firefly-iii/issues/549)
- [Issue 553](https://github.com/firefly-iii/firefly-iii/issues/553)
- Fixed [issue 559](https://github.com/firefly-iii/firefly-iii/issues/559) reported by [elamperti](https://github.com/elamperti).
- [Issue 565](https://github.com/firefly-iii/firefly-iii/issues/565), as reported by a user over the mail
- [Issue 566](https://github.com/firefly-iii/firefly-iii/issues/566), as reported by [dspeckmann](https://github.com/dspeckmann)
- [Issue 567](https://github.com/firefly-iii/firefly-iii/issues/567), as reported by [winsomniak](https://github.com/winsomniak)
- [Issue 569](https://github.com/firefly-iii/firefly-iii/issues/569), as reported by [winsomniak](https://github.com/winsomniak)
- [Issue 572](https://github.com/firefly-iii/firefly-iii/issues/572), as reported by [zjean](https://github.com/zjean)
- Many issues with the transaction filters which will fix reports (they tended to display the wrong amount).

## 4.3.4 - 2017-02-02
### Fixed
- Fixed bug [issue 550](https://github.com/firefly-iii/firefly-iii/issues/550), reported by [worldworm](https://github.com/worldworm)!
- Fixed bug [issue 551](https://github.com/firefly-iii/firefly-iii/issues/551), reported by [t-me](https://github.com/t-me)!

## 4.3.3 - 2017-01-30

_The 100th release of Firefly!_

### Added
- Add locales to Docker ([issue 534](https://github.com/firefly-iii/firefly-iii/issues/534)) by [elohmeier](https://github.com/elohmeier).
- Optional database encryption. On by default.
- Datepicker for Firefox and other browsers.
- New instruction block for updating and installing.
- Ability to clone transactions.
- Use multi-select Bootstrap thing instead of massive lists of checkboxes.

### Removed
- Lots of old Javascript

### Fixed
- Missing sort broke various charts
- Bug in reports that made amounts behave weird
- Various bug fixes

### Security
- Tested FF against the naughty string list.

## 4.3.2 - 2017-01-09

An intermediate release because something in the Twig and Twigbridge libraries is broken and I have to make sure it doesn't affect you guys. But some cool features were on their way so there's that oo.

### Added
- Some code for [issue 475](https://github.com/firefly-iii/firefly-iii/issues/475), consistent overviews.
- Better currency display. Make sure you have locale packages installed.

### Changed
- Uses a new version of Laravel.

### Fixed
- The password reset routine was broken.
- [Issue 522](https://github.com/firefly-iii/firefly-iii/issues/522), thanks to [xpfgsyb](https://github.com/xpfgsyb)
- [Issue 524](https://github.com/firefly-iii/firefly-iii/issues/524), thanks to [worldworm](https://github.com/worldworm)
- [Issue 526](https://github.com/firefly-iii/firefly-iii/issues/526), thanks to [worldworm](https://github.com/worldworm)
- [Issue 528](https://github.com/firefly-iii/firefly-iii/issues/528), thanks to [skibbipl](https://github.com/skibbipl)
- Various other fixes.

## 4.3.1 - 2017-01-04
### Added
- Support for Russian and Polish. 
- Support for a proper demo website.
- Support for custom decimal places in currencies ([issue 506](https://github.com/firefly-iii/firefly-iii/issues/506), suggested by [xpfgsyb](https://github.com/xpfgsyb)).
- Most amounts are now right-aligned ([issue 511](https://github.com/firefly-iii/firefly-iii/issues/511), suggested by [xpfgsyb](https://github.com/xpfgsyb)).
- German is now a "complete" language, more than 75% translated!

### Changed
- **[New Github repository!](github.com/firefly-iii/firefly-iii)**
- Better category overview.
- [Issue 502](https://github.com/firefly-iii/firefly-iii/issues/502), thanks to [zjean](https://github.com/zjean)

### Removed
- Removed a lot of administration functions.
- Removed ability to activate users.

### Fixed
- [Issue 501](https://github.com/firefly-iii/firefly-iii/issues/501), thanks to [zjean](https://github.com/zjean)
- [Issue 513](https://github.com/firefly-iii/firefly-iii/issues/513), thanks to [skibbipl](https://github.com/skibbipl) 

### Security
- [Issue 519](https://github.com/firefly-iii/firefly-iii/issues/519), thanks to [xpfgsyb](https://github.com/xpfgsyb)

## 4.3.0 - 2016-12-26
### Added
- New method of keeping track of available budget, see [issue 489](https://github.com/firefly-iii/firefly-iii/issues/489)
- Support for Spanish
- Firefly III now has an extended demo mode. Will expand further in the future.
 

### Changed
- New favicon
- Import routine no longer gives transactions a description [issue 483](https://github.com/firefly-iii/firefly-iii/issues/483)


### Removed
- All test data generation code.

### Fixed
- Removed import accounts from search results [issue 478](https://github.com/firefly-iii/firefly-iii/issues/478)
- Redirect after delete will no longer go back to deleted item [issue 477](https://github.com/firefly-iii/firefly-iii/issues/477)
- Cannot math [issue 482](https://github.com/firefly-iii/firefly-iii/issues/482)
- Fixed bug in virtual balance field [issue 479](https://github.com/firefly-iii/firefly-iii/issues/479)

## 4.2.2 - 2016-12-18
### Added
- New budget report (still a bit of a beta)
- Can now edit user

### Changed
- New config for specific events. Still need to build Notifications.

### Fixed
- Various bugs
- [Issue 472](https://github.com/firefly-iii/firefly-iii/issues/472) thanks to [zjean](https://github.com/zjean)

## 4.2.1 - 2016-12-09
### Added
- BIC support (see [issue 430](https://github.com/firefly-iii/firefly-iii/issues/430))
- New category report section and chart (see the general financial report)


### Changed
- Date range picker now also available on mobile devices (see [issue 435](https://github.com/firefly-iii/firefly-iii/issues/435))
- Extended range of amounts for [issue 439](https://github.com/firefly-iii/firefly-iii/issues/439)
- Rewrote all routes. Old bookmarks may break.

## 4.2.0 - 2016-11-27
### Added
- Lots of (empty) tests
- Expanded transaction lists ([issue 377](https://github.com/firefly-iii/firefly-iii/issues/377))
- New charts at account view
- First code for [issue 305](https://github.com/firefly-iii/firefly-iii/issues/305)


### Changed
- Updated all email messages.
- Made some fonts local

### Fixed
- [Issue 408](https://github.com/firefly-iii/firefly-iii/issues/408)
- Various issues with split journals
- [Issue 414](https://github.com/firefly-iii/firefly-iii/issues/414), thx [zjean](https://github.com/zjean)
- [Issue 419](https://github.com/firefly-iii/firefly-iii/issues/419), thx [schwalberich](https://github.com/schwalberich) 
- [Issue 422](https://github.com/firefly-iii/firefly-iii/issues/422), thx [xzaz](https://github.com/xzaz)
- Various import bugs, such as [issue 416](https://github.com/firefly-iii/firefly-iii/issues/416) ([zjean](https://github.com/zjean))

## 4.1.7 - 2016-11-19
### Added
- Check for database table presence in console commands.
- Category report
- Reinstated old test routines.


### Changed
- Confirm account setting is no longer in `.env` file.
- Titles are now in reverse (current page > parent > firefly iii)
- Easier update of language files thanks to Github implementation.
- Uniform colours for charts.

### Fixed
- Made all pages more mobile friendly.
- Fixed [issue 395](https://github.com/firefly-iii/firefly-iii/issues/395) found by [marcoveeneman](https://github.com/marcoveeneman).
- Fixed [issue 398](https://github.com/firefly-iii/firefly-iii/issues/398) found by [marcoveeneman](https://github.com/marcoveeneman).
- Fixed [issue 401](https://github.com/firefly-iii/firefly-iii/issues/401) found by [marcoveeneman](https://github.com/marcoveeneman).
- Many optimizations.
- Updated many libraries.
- Various bugs found by myself.


## 4.1.6 - 2016-11-06
### Added
- New budget table for multi year report.

### Changed
- Greatly expanded help pages and their function.
- Built a new transaction collector, which I think was the idea of [roberthorlings](https://github.com/roberthorlings) originally.
- Rebuilt seach engine.

### Fixed
- [Issue 375](https://github.com/firefly-iii/firefly-iii/issues/375), thanks to [schoentoon](https://github.com/schoentoon) which made it impossible to resurrect currencies.
- [Issue 370](https://github.com/firefly-iii/firefly-iii/issues/370) thanks to [ksmolder](https://github.com/ksmolder)
- [Issue 378](https://github.com/firefly-iii/firefly-iii/issues/378), thanks to [HomelessAvatar](https://github.com/HomelessAvatar)

## 4.1.5 - 2016-11-01
### Changed
- Report parts are loaded using AJAX, making a lot of code more simple.
- Help content will fall back to English.
- Help content is translated through Crowdin.

### Fixed
- [Issue 370](https://github.com/firefly-iii/firefly-iii/issues/370)

## 4.1.4 - 2016-10-30
### Added
- New Dockerfile thanks to [schoentoon](https://github.com/schoentoon)
- Added changing the destination account as rule action.
- Added changing the source account as rule action.
- Can convert transactions into different types.

### Changed
- Changed the export routine to be more future-proof.
- Improved help routine.
- Integrated CrowdIn translations.
- Simplified reports
- Change error message to refer to solution.

### Fixed
- [Issue 367](https://github.com/firefly-iii/firefly-iii/issues/367) thanks to [HungryFeline](https://github.com/HungryFeline)
- [Issue 366](https://github.com/firefly-iii/firefly-iii/issues/366) thanks to [3mz3t](https://github.com/3mz3t)
- [Issue 362](https://github.com/firefly-iii/firefly-iii/issues/362) and [issue 341](https://github.com/firefly-iii/firefly-iii/issues/341) thanks to [bnw](https://github.com/bnw)
- [Issue 355](https://github.com/firefly-iii/firefly-iii/issues/355) thanks to [roberthorlings](https://github.com/roberthorlings)

## 4.1.3 - 2016-10-22
### Fixed
- Some event handlers called the wrong method.

## 4.1.2 - 2016-10-22

### Fixed
- A bug is fixed in the journal event handler that prevented Firefly III from actually storing journals.

## 4.1.1 - 2016-10-22

### Added
- Option to show deposit accounts on the front page.
- Script to upgrade split transactions
- Can now save notes on piggy banks.
- Extend user admin options.
- Run import jobs from the command line


### Changed
- New preferences screen layout.

### Deprecated
- ``firefly:import`` is now ``firefly:start-import``

### Removed
- Lots of old code

### Fixed
- [Issue 357](https://github.com/firefly-iii/firefly-iii/issues/357), where non utf-8 files would break Firefly.
- Tab delimiter is not properly loaded from import configuration ([roberthorlings](https://github.com/roberthorlings))
- System response to yearly bills

## 4.0.2 - 2016-10-14
### Added
- Added ``intl`` dependency to composer file to ease installation (thanks [telyn](https://github.com/telyn))
- Added support for Croatian.

### Changed
- Updated all copyright notices to refer to the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/)
- Fixed [issue 344](https://github.com/firefly-iii/firefly-iii/issues/344)
- Fixed [issue 346](https://github.com/firefly-iii/firefly-iii/issues/346), thanks to [SanderKleykens](https://github.com/SanderKleykens)
- [Issue 351](https://github.com/firefly-iii/firefly-iii/issues/351)
- Did some internal remodelling.

### Fixed
- PostgreSQL compatibility thanks to [SanderKleykens](https://github.com/SanderKleykens)
- [roberthorlings](https://github.com/roberthorlings) fixed a bug in the ABN Amro import specific.


## 4.0.1 - 2016-10-04
### Added
- New ING import specific by [tomwerf](https://github.com/tomwerf)
- New Presidents Choice specific to fix [issue 307](https://github.com/firefly-iii/firefly-iii/issues/307)
- Added some trimming ([issue 335](https://github.com/firefly-iii/firefly-iii/issues/335))

### Fixed
- Fixed a bug where incoming transactions would not be properly filtered in several reports.
- [Issue 334](https://github.com/firefly-iii/firefly-iii/issues/334) by [cyberkov](https://github.com/cyberkov)
- [Issue 337](https://github.com/firefly-iii/firefly-iii/issues/337)
- [Issue 336](https://github.com/firefly-iii/firefly-iii/issues/336)
- [Issue 338](https://github.com/firefly-iii/firefly-iii/issues/338) found by [roberthorlings](https://github.com/roberthorlings)

## 4.0.0 - 2016-09-26
### Added
- Upgraded to Laravel 5.3, most other libraries upgraded as well.
- Added GBP as currency, thanks to [Mortalife](https://github.com/Mortalife)

### Changed
- Jump to version 4.0.0.
- Firefly III is now subject to a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/) license. Previous versions of this software are still MIT licensed.

### Fixed
- Support for specific decimal places, thanks to [Mortalife](https://github.com/Mortalife)
- Various CSS fixes
- Various bugs, thanks to [fuf](https://github.com/fuf), [sandermulders](https://github.com/sandermulders) and [vissert](https://github.com/vissert)
- Various queries optimized for MySQL 5.7

## 3.10.4 - 2016-09-14
### Fixed
- Migration fix by [sandermulders](https://github.com/sandermulders)
- Tricky import bug fix thanks to [vissert](https://github.com/vissert)
- Currency preference will be correctly pulled from user settings, thanks to [fuf](https://github.com/fuf)
- Simplified code for upgrade instructions.


## 3.10.3 - 2016-08-29
### Added
- More fields for mass-edit, thanks to [vissert](https://github.com/vissert) ([issue 282](https://github.com/firefly-iii/firefly-iii/issues/282))
- First start of German translation

### Changed
- More optional fields for transactions and the ability to filter them.

### Removed
- Preference for budget maximum.

### Fixed
- A bug in the translation routine broke the import.
- It was possible to destroy your Firefly installation by removing all currencies. Thanks [mondjef](https://github.com/mondjef)
- Translation bugs.
- Import bug.

### Security
- Firefly will not accept registrations beyond the first one, by default.


## 3.10.2 - 2016-08-29
### Added
- New Chinese translations. Set Firefly III to show incomplete translations to follow the progress. Want to translate Firefly III in Chinese, or in any other language? Then check out [the Crowdin project](https://crowdin.com/project/firefly-iii).
- Added more admin pages. They do nothing yet.

### Changed
- Import routine will now also apply user rules.
- Various code cleanup.
- Some small HTML changes.

### Fixed
- Bug in the mass edit routines.
- Firefly III over a proxy will now work (see [issue 290](https://github.com/firefly-iii/firefly-iii/issues/290), thanks [dfiel](https://github.com/dfiel) for reporting.
- Sneaky bug in the import routine, fixed by [Bonno](https://github.com/Bonno) 

## 3.10.1 - 2016-08-25
### Added
- More feedback in the import procedure.
- Extended model for import job.
- Web bases import procedure.


### Changed
- Scrutinizer configuration
- Various code clean up.

### Removed
- Code climate YAML file.

### Fixed
- Fixed a bug where a migration would check an empty table name.
- Fixed various bugs in the import routine.
- Fixed various bugs in the piggy banks pages.
- Fixed a bug in the `firefly:verify` routine

## 3.10 - 2016-08-12
### Added
- New charts in year report
- Can add / remove money from piggy bank on mobile device.
- Bill overview shows some useful things.
- Firefly will track registration / activation IP addresses.


### Changed
- Rewrote the import routine.
- The date picker now supports more ranges and periods.
- Rewrote all migrations. [issue 272](https://github.com/firefly-iii/firefly-iii/issues/272)

### Fixed
- [Issue 264](https://github.com/firefly-iii/firefly-iii/issues/264)
- [Issue 265](https://github.com/firefly-iii/firefly-iii/issues/265)
- Fixed amount calculation problems, [issue 266](https://github.com/firefly-iii/firefly-iii/issues/266), thanks [xzaz](https://github.com/xzaz)
- [Issue 271](https://github.com/firefly-iii/firefly-iii/issues/271)
- [Issue 278](https://github.com/firefly-iii/firefly-iii/issues/278), [issue 273](https://github.com/firefly-iii/firefly-iii/issues/273), thanks [StevenReitsma](https://github.com/StevenReitsma) and [rubella](https://github.com/rubella)
- Bug in attachment download routine would report the wrong size to the user's browser.
- Various NULL errors fixed.
- Various strict typing errors fixed.
- Fixed pagination problems, [issue 276](https://github.com/firefly-iii/firefly-iii/issues/276), thanks [xzaz](https://github.com/xzaz)
- Fixed a bug where an expense would be assigned to a piggy bank if you created a transfer first.
- Bulk update problems, [issue 280](https://github.com/firefly-iii/firefly-iii/issues/280), thanks [stickgrinder](https://github.com/stickgrinder)
- Fixed various problems with amount reporting of split transactions.

## 3.9.1 - 2016-06-06
### Fixed
- Fixed a bug where removing money from a piggy bank would not work. See [issue 265](https://github.com/firefly-iii/firefly-iii/issues/265) and [issue 269](https://github.com/firefly-iii/firefly-iii/issues/269)

## 3.9.0 - 2016-05-22
### Added
- [zjean](https://github.com/zjean) has added code that allows you to force "https://"-URL's.
- [tonicospinelli](https://github.com/tonicospinelli) has added Portuguese (Brazil) translations.
- Firefly III supports the *splitting* of transactions:
  - A withdrawal (expense) can be split into multiple sub-transactions (with multiple destinations)
  - Likewise for deposits (incomes). You can set multiple sources.
  - Likewise for transfers.

### Changed
- Update a lot of libraries.
- Big improvement to test data generation.
- Cleaned up many repositories.

### Removed
- Front page boxes will no longer respond to credit card bills.

### Fixed
- Many bugs

## 3.8.4 - 2016-04-24
### Added
- Lots of new translations.
- Can now set page size.
- Can now mass edit transactions.
- Can now mass delete transactions.
- Firefly will now attempt to verify the integrity of your database when updating.

### Changed
- New version of Charts library.

### Fixed
- Several CSV related bugs.
- Several other bugs.
- Bugs fixed by [Bonno](https://github.com/Bonno).

## 3.8.3 - 2016-04-17
### Added
- New audit report to see what happened.

### Changed
- New Chart JS release used.
- Help function is more reliable.

### Fixed
- Expected bill amount is now correct.
- Upgrade will now invalidate cache.
- Search was broken.
- Queries run better

## 3.8.2 - 2016-04-03
### Added
- Small user administration at /admin.
- Informational popups are working in reports.

### Changed
- User activation emails are better

### Fixed
- Some bugs related to accounts and rules.


## 3.8.1 - 2016-03-29
### Added
- More translations
- Extended cookie control.
- User accounts can now be activated (disabled by default).
- Bills can now take the source and destination account name into account.

### Changed
- The pages related to rules have new URL's.

### Fixed
- Spelling errors.
- Problems related to the "account repository".
- Some views showed empty (0.0) amounts.

## 3.8.0 - 2016-03-20
### Added
- Two factor authentication, thanks to the excellent work of [zjean](https://github.com/zjean).
- A new chart showing your net worth in year and multi-year reports.
- You can now see if your current or future rules actually match any transactions, thanks to the excellent work of [roberthorlings](https://github.com/roberthorlings).
- New date fields for transactions. They are not used yet in reports or anything, but they can be filled in.
- New routine to export your data.
- Firefly III will mail the site owner when blocked users try to login, or when blocked domains are used in registrations.


### Changed
- Firefly III now requires PHP 7.0 minimum.


### Fixed
- HTML fixes, thanks to [roberthorlings](https://github.com/roberthorlings) and [zjean](https://github.com/zjean)..
- A bug fix in the ABN Amro importer, thanks to [roberthorlings](https://github.com/roberthorlings)
- It was not possible to change the opening balance, once it had been set. Thanks to [xnyhps](https://github.com/xnyhps) and [marcoveeneman](https://github.com/marcoveeneman) for spotting this.
- Various other bug fixes.



## 3.4.2 - 2015-05-25
### Added
- Initial release.

### Changed
- Initial release.

### Deprecated
- Initial release.

### Removed
- Initial release.

### Fixed
- Initial release.

### Security
- Initial release.

### API
- Initial release
