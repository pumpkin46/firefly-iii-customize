/*
 * intro.js
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

/** global: nextLabel, prevLabel,skipLabel,doneLabel routeForTour, token, routeStepsUri, routeForFinishedTour, forceDemoOff */
$(function () {
    "use strict";
    if (!forceDemoOff) {
        $.getJSON(routeStepsUri).done(setupIntro)
    }
});

function setupIntro(steps) {

    var intro = introJs();
    intro.setOptions({
                         nextLabel: nextLabel,
                         prevLabel: prevLabel,
                         skipLabel: skipLabel,
                         doneLabel: doneLabel,
                         steps: steps,
                         exitOnEsc: true,
                         exitOnOverlayClick: true,
                         keyboardNavigation: true
                     });
    intro.oncomplete(reportIntroFinished);
    intro.onexit(reportIntroFinished);
    intro.start();
}

function reportIntroFinished() {
    $.post(routeForFinishedTour, {_token: token});
}