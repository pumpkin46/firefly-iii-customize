/*
 * edit.js
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

$(document).ready(function () {
    "use strict";

    // description
    if ($('input[name^="description["]').length > 0) {
        console.log('Description.');
        var journalNames = new Bloodhound({
                                              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                              queryTokenizer: Bloodhound.tokenizers.whitespace,
                                              prefetch: {
                                                  url: 'api/v1/autocomplete/transactions?uid=' + uid,
                                                  filter: function (list) {
                                                      return $.map(list, function (obj) {
                                                          return obj;
                                                      });
                                                  }
                                              },
                                              remote: {
                                                  url: 'api/v1/autocomplete/transactions?query=%QUERY&uid=' + uid,
                                                  wildcard: '%QUERY',
                                                  filter: function (list) {
                                                      return $.map(list, function (obj) {
                                                          return obj;
                                                      });
                                                  }
                                              }
                                          });
        journalNames.initialize();
        $('input[name^="description["]').typeahead({hint: true, highlight: true,}, {source: journalNames, displayKey: 'name', autoSelect: false});
    }
    // destination account names:
    if ($('input[name^="destination_name["]').length > 0) {
        console.log('Destination.');
        var destNames = new Bloodhound({
                                           datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                           queryTokenizer: Bloodhound.tokenizers.whitespace,
                                           prefetch: {
                                               url: 'api/v1/autocomplete/accounts?types=Expense account&uid=' + uid,
                                               filter: function (list) {
                                                   return $.map(list, function (obj) {
                                                       return obj;
                                                   });
                                               }
                                           },
                                           remote: {
                                               url: 'api/v1/autocomplete/accounts?types=Expense account&query=%QUERY&uid=' + uid,
                                               wildcard: '%QUERY',
                                               filter: function (list) {
                                                   return $.map(list, function (obj) {
                                                       return obj;
                                                   });
                                               }
                                           }
                                       });
        destNames.initialize();
        $('input[name^="destination_name["]').typeahead({hint: true, highlight: true,}, {source: destNames, displayKey: 'name', autoSelect: false});
    }

    // source account name
    if ($('input[name^="source_name["]').length > 0) {
        console.log('Source.');
        var sourceNames = new Bloodhound({
                                             datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                             queryTokenizer: Bloodhound.tokenizers.whitespace,
                                             prefetch: {
                                                 url: 'api/v1/autocomplete/accounts?types=Revenue account&uid=' + uid,
                                                 filter: function (list) {
                                                     return $.map(list, function (obj) {
                                                         return obj;
                                                     });
                                                 }
                                             },
                                             remote: {
                                                 url: 'api/v1/autocomplete/accounts?types=Revenue account&query=%QUERY&uid=' + uid,
                                                 wildcard: '%QUERY',
                                                 filter: function (list) {
                                                     return $.map(list, function (obj) {
                                                         return obj;
                                                     });
                                                 }
                                             }
                                         });
        sourceNames.initialize();

        $('input[name^="source_name["]').typeahead({hint: true, highlight: true,}, {source: sourceNames, displayKey: 'name', autoSelect: false});
    }

    var categories = new Bloodhound({
                                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                                        prefetch: {
                                            url: 'api/v1/autocomplete/categories?uid=' + uid,
                                            filter: function (list) {
                                                return $.map(list, function (obj) {
                                                    return obj;
                                                });
                                            }
                                        },
                                        remote: {
                                            url: 'api/v1/autocomplete/categories?query=%QUERY&uid=' + uid,
                                            wildcard: '%QUERY',
                                            filter: function (list) {
                                                return $.map(list, function (obj) {
                                                    return obj;
                                                });
                                            }
                                        }
                                    });
    categories.initialize();

    $('input[name^="category["]').typeahead({hint: true, highlight: true,}, {source: categories, displayKey: 'name', autoSelect: false});

});
