/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js":
/*!********************************************************************!*\
  !*** ./node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js ***!
  \********************************************************************/
/***/ ((module) => {

!function(A,t){ true?module.exports=t():0}(window,function(){return function(A){var t={};function e(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return A[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=A,e.c=t,e.d=function(A,t,n){e.o(A,t)||Object.defineProperty(A,t,{enumerable:!0,get:n})},e.r=function(A){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(A,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(A,"__esModule",{value:!0})},e.t=function(A,t){if(1&t&&(A=e(A)),8&t)return A;if(4&t&&"object"==typeof A&&A&&A.__esModule)return A;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:A}),2&t&&"string"!=typeof A)for(var i in A)e.d(n,i,function(t){return A[t]}.bind(null,i));return n},e.n=function(A){var t=A&&A.__esModule?function(){return A.default}:function(){return A};return e.d(t,"a",t),t},e.o=function(A,t){return Object.prototype.hasOwnProperty.call(A,t)},e.p="/dist/",e(e.s=6)}([function(A,t,e){var n=e(8);"string"==typeof n&&(n=[[A.i,n,""]]),n.locals&&(A.exports=n.locals);(0,e(4).default)("7ec05f6c",n,!1,{})},function(A,t,e){var n=e(10);"string"==typeof n&&(n=[[A.i,n,""]]),n.locals&&(A.exports=n.locals);(0,e(4).default)("3453d19d",n,!1,{})},function(A,t,e){"use strict";A.exports=function(A){var t=[];return t.toString=function(){return this.map(function(t){var e=function(A,t){var e=A[1]||"",n=A[3];if(!n)return e;if(t&&"function"==typeof btoa){var i=(r=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),a=n.sources.map(function(A){return"/*# sourceURL="+n.sourceRoot+A+" */"});return[e].concat(a).concat([i]).join("\n")}var r;return[e].join("\n")}(t,A);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},t.i=function(A,e){"string"==typeof A&&(A=[[null,A,""]]);for(var n={},i=0;i<this.length;i++){var a=this[i][0];null!=a&&(n[a]=!0)}for(i=0;i<A.length;i++){var r=A[i];null!=r[0]&&n[r[0]]||(e&&!r[2]?r[2]=e:e&&(r[2]="("+r[2]+") and ("+e+")"),t.push(r))}},t}},function(A,t){A.exports="data:application/vnd.ms-fontobject;base64,aAUAAMQEAAABAAIAAAAAAAAAAAAAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAUdPJHwAAAAAAAAAAAAAAAAAAAAAAAA4AaQBjAG8AbQBvAG8AbgAAAA4AUgBlAGcAdQBsAGEAcgAAABYAVgBlAHIAcwBpAG8AbgAgADEALgAwAAAADgBpAGMAbwBtAG8AbwBuAAAAAAAAAQAAAAsAgAADADBPUy8yDxIFrAAAALwAAABgY21hcBdW0okAAAEcAAAAVGdhc3AAAAAQAAABcAAAAAhnbHlmpZ+jMAAAAXgAAAD8aGVhZA/FmAgAAAJ0AAAANmhoZWEHgAPIAAACrAAAACRobXR4EgABvgAAAtAAAAAcbG9jYQCSAOIAAALsAAAAEG1heHAACQAfAAAC/AAAACBuYW1lmUoJ+wAAAxwAAAGGcG9zdAADAAAAAASkAAAAIAADA4ABkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkCA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABAA4AAAACgAIAAIAAgABACDpAv/9//8AAAAAACDpAP/9//8AAf/jFwQAAwABAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAVgEBA74CgQAcAAABMhceARcWFwcmJy4BJyYjIgYHFyERFzY3PgE3NgIWSkNDbykpF2QQIB9VMzQ5P3AtnP6AmB0iIkspKAJVFxhSODlCIDMrKz4REislmgGAmhkVFBwICAABANYAgQMqAtUACwAAAQcXBycHJzcnNxc3Ayru7jzu7jzu7jzu7gKZ7u487u487u487u4AAQCSAIEDgAK9AAUAACUBFwEnNwGAAcQ8/gDuPPkBxDz+AO48AAAAAAEAAAAAAAAfydNRXw889QALBAAAAAAA1nUqGwAAAADWdSobAAAAAAO+AtUAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAA74AAQAAAAAAAAAAAAAAAAAAAAcEAAAAAAAAAAAAAAACAAAABAAAVgQAANYEAACSAAAAAAAKABQAHgBQAGoAfgABAAAABwAdAAEAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEABwAAAAEAAAAAAAIABwBgAAEAAAAAAAMABwA2AAEAAAAAAAQABwB1AAEAAAAAAAUACwAVAAEAAAAAAAYABwBLAAEAAAAAAAoAGgCKAAMAAQQJAAEADgAHAAMAAQQJAAIADgBnAAMAAQQJAAMADgA9AAMAAQQJAAQADgB8AAMAAQQJAAUAFgAgAAMAAQQJAAYADgBSAAMAAQQJAAoANACkaWNvbW9vbgBpAGMAbwBtAG8AbwBuVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwaWNvbW9vbgBpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuUmVndWxhcgBSAGUAZwB1AGwAYQByaWNvbW9vbgBpAGMAbwBtAG8AbwBuRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="},function(A,t,e){"use strict";function n(A,t){for(var e=[],n={},i=0;i<t.length;i++){var a=t[i],r=a[0],o={id:A+":"+i,css:a[1],media:a[2],sourceMap:a[3]};n[r]?n[r].parts.push(o):e.push(n[r]={id:r,parts:[o]})}return e}e.r(t),e.d(t,"default",function(){return g});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},r=i&&(document.head||document.getElementsByTagName("head")[0]),o=null,s=0,u=!1,c=function(){},d=null,l="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function g(A,t,e,i){u=e,d=i||{};var r=n(A,t);return f(r),function(t){for(var e=[],i=0;i<r.length;i++){var o=r[i];(s=a[o.id]).refs--,e.push(s)}t?f(r=n(A,t)):r=[];for(i=0;i<e.length;i++){var s;if(0===(s=e[i]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete a[s.id]}}}}function f(A){for(var t=0;t<A.length;t++){var e=A[t],n=a[e.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](e.parts[i]);for(;i<e.parts.length;i++)n.parts.push(v(e.parts[i]));n.parts.length>e.parts.length&&(n.parts.length=e.parts.length)}else{var r=[];for(i=0;i<e.parts.length;i++)r.push(v(e.parts[i]));a[e.id]={id:e.id,refs:1,parts:r}}}}function B(){var A=document.createElement("style");return A.type="text/css",r.appendChild(A),A}function v(A){var t,e,n=document.querySelector("style["+l+'~="'+A.id+'"]');if(n){if(u)return c;n.parentNode.removeChild(n)}if(p){var i=s++;n=o||(o=B()),t=C.bind(null,n,i,!1),e=C.bind(null,n,i,!0)}else n=B(),t=function(A,t){var e=t.css,n=t.media,i=t.sourceMap;n&&A.setAttribute("media",n);d.ssrId&&A.setAttribute(l,t.id);i&&(e+="\n/*# sourceURL="+i.sources[0]+" */",e+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(A.styleSheet)A.styleSheet.cssText=e;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(e))}}.bind(null,n),e=function(){n.parentNode.removeChild(n)};return t(A),function(n){if(n){if(n.css===A.css&&n.media===A.media&&n.sourceMap===A.sourceMap)return;t(A=n)}else e()}}var m,h=(m=[],function(A,t){return m[A]=t,m.filter(Boolean).join("\n")});function C(A,t,e,n){var i=e?"":n.css;if(A.styleSheet)A.styleSheet.cssText=h(t,i);else{var a=document.createTextNode(i),r=A.childNodes;r[t]&&A.removeChild(r[t]),r.length?A.insertBefore(a,r[t]):A.appendChild(a)}}},function(A,t,e){"use strict";var n=Array.isArray,i=Object.keys,a=Object.prototype.hasOwnProperty;A.exports=function A(t,e){if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){var r,o,s,u=n(t),c=n(e);if(u&&c){if((o=t.length)!=e.length)return!1;for(r=o;0!=r--;)if(!A(t[r],e[r]))return!1;return!0}if(u!=c)return!1;var d=t instanceof Date,l=e instanceof Date;if(d!=l)return!1;if(d&&l)return t.getTime()==e.getTime();var p=t instanceof RegExp,g=e instanceof RegExp;if(p!=g)return!1;if(p&&g)return t.toString()==e.toString();var f=i(t);if((o=f.length)!==i(e).length)return!1;for(r=o;0!=r--;)if(!a.call(e,f[r]))return!1;for(r=o;0!=r--;)if(!A(t[s=f[r]],e[s]))return!1;return!0}return t!=t&&e!=e}},function(A,t,e){A.exports=e(14)},function(A,t,e){"use strict";var n=e(0);e.n(n).a},function(A,t,e){(A.exports=e(2)(!0)).push([A.i,".ti-tag-input[data-v-108f4f13] {\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  padding: 0px;\n  margin: 0px;\n  display: flex;\n  top: 0px;\n  position: absolute;\n  width: 100%;\n  line-height: inherit;\n}\n.ti-tag-input[data-v-108f4f13]::-ms-clear {\n  display: none;\n}\ninput[data-v-108f4f13]:focus {\n  outline: none;\n}\ninput[disabled][data-v-108f4f13] {\n  background-color: transparent;\n}\n","",{version:3,sources:["C:/Users/johan/dev/vue-tags-input/vue-tags-input/C:/Users/johan/dev/vue-tags-input/vue-tags-input/tag-input.vue"],names:[],mappings:"AAAA;EACE,8BAA8B;EAC9B,eAAe;EACf,aAAa;EACb,aAAa;EACb,YAAY;EACZ,cAAc;EACd,SAAS;EACT,mBAAmB;EACnB,YAAY;EACZ,qBAAqB;CAAE;AAEzB;EACE,cAAc;CAAE;AAElB;EACE,cAAc;CAAE;AAElB;EACE,8BAA8B;CAAE",file:"tag-input.vue?vue&type=style&index=0&id=108f4f13&lang=css&scoped=true&",sourcesContent:[".ti-tag-input {\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  padding: 0px;\n  margin: 0px;\n  display: flex;\n  top: 0px;\n  position: absolute;\n  width: 100%;\n  line-height: inherit; }\n\n.ti-tag-input::-ms-clear {\n  display: none; }\n\ninput:focus {\n  outline: none; }\n\ninput[disabled] {\n  background-color: transparent; }\n"],sourceRoot:""}])},function(A,t,e){"use strict";var n=e(1);e.n(n).a},function(A,t,e){t=A.exports=e(2)(!0);var n=e(11),i=n(e(3)),a=n(e(3)+"#iefix"),r=n(e(12)),o=n(e(13));t.push([A.i,"@font-face {\n  font-family: 'icomoon';\n  src: url("+i+");\n  src: url("+a+') format("embedded-opentype"), url('+r+') format("truetype"), url('+o+') format("woff");\n  font-weight: normal;\n  font-style: normal;\n}\n[class^="ti-icon-"][data-v-61d92e31], [class*=" ti-icon-"][data-v-61d92e31] {\n  font-family: \'icomoon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.ti-icon-check[data-v-61d92e31]:before {\n  content: "\\e902";\n}\n.ti-icon-close[data-v-61d92e31]:before {\n  content: "\\e901";\n}\n.ti-icon-undo[data-v-61d92e31]:before {\n  content: "\\e900";\n}\nul[data-v-61d92e31] {\n  margin: 0px;\n  padding: 0px;\n  list-style-type: none;\n}\n*[data-v-61d92e31], *[data-v-61d92e31]:before, *[data-v-61d92e31]:after {\n  box-sizing: border-box;\n}\ninput[data-v-61d92e31]:focus {\n  outline: none;\n}\ninput[disabled][data-v-61d92e31] {\n  background-color: transparent;\n}\n.vue-tags-input[data-v-61d92e31] {\n  max-width: 450px;\n  position: relative;\n  background-color: #fff;\n}\ndiv.vue-tags-input.disabled[data-v-61d92e31] {\n  opacity: 0.5;\n}\ndiv.vue-tags-input.disabled *[data-v-61d92e31] {\n    cursor: default;\n}\n.ti-input[data-v-61d92e31] {\n  border: 1px solid #ccc;\n  display: flex;\n  padding: 4px;\n  flex-wrap: wrap;\n}\n.ti-tags[data-v-61d92e31] {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  line-height: 1em;\n}\n.ti-tag[data-v-61d92e31] {\n  background-color: #5C6BC0;\n  color: #fff;\n  border-radius: 2px;\n  display: flex;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em;\n}\n.ti-tag[data-v-61d92e31]:focus {\n    outline: none;\n}\n.ti-tag .ti-content[data-v-61d92e31] {\n    display: flex;\n    align-items: center;\n}\n.ti-tag .ti-tag-center[data-v-61d92e31] {\n    position: relative;\n}\n.ti-tag span[data-v-61d92e31] {\n    line-height: .85em;\n}\n.ti-tag span.ti-hidden[data-v-61d92e31] {\n    padding-left: 14px;\n    visibility: hidden;\n    height: 0px;\n    white-space: pre;\n}\n.ti-tag .ti-actions[data-v-61d92e31] {\n    margin-left: 2px;\n    display: flex;\n    align-items: center;\n    font-size: 1.15em;\n}\n.ti-tag .ti-actions i[data-v-61d92e31] {\n      cursor: pointer;\n}\n.ti-tag[data-v-61d92e31]:last-child {\n    margin-right: 4px;\n}\n.ti-tag.ti-invalid[data-v-61d92e31], .ti-tag.ti-tag.ti-deletion-mark[data-v-61d92e31] {\n    background-color: #e54d42;\n}\n.ti-new-tag-input-wrapper[data-v-61d92e31] {\n  display: flex;\n  flex: 1 0 auto;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em;\n}\n.ti-new-tag-input-wrapper input[data-v-61d92e31] {\n    flex: 1 0 auto;\n    min-width: 100px;\n    border: none;\n    padding: 0px;\n    margin: 0px;\n}\n.ti-new-tag-input[data-v-61d92e31] {\n  line-height: initial;\n}\n.ti-autocomplete[data-v-61d92e31] {\n  border: 1px solid #ccc;\n  border-top: none;\n  position: absolute;\n  width: 100%;\n  background-color: #fff;\n  z-index: 20;\n}\n.ti-item > div[data-v-61d92e31] {\n  cursor: pointer;\n  padding: 3px 6px;\n  width: 100%;\n}\n.ti-selected-item[data-v-61d92e31] {\n  background-color: #5C6BC0;\n  color: #fff;\n}\n',"",{version:3,sources:["C:/Users/johan/dev/vue-tags-input/vue-tags-input/C:/Users/johan/dev/vue-tags-input/vue-tags-input/vue-tags-input.scss"],names:[],mappings:"AAAA;EACE,uBAAuB;EACvB,mCAA8C;EAC9C,+JAAuM;EACvM,oBAAoB;EACpB,mBAAmB;CAAE;AAEvB;EACE,kCAAkC;EAClC,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;EACpB,qBAAqB;EACrB,qBAAqB;EACrB,eAAe;EACf,oCAAoC;EACpC,mCAAmC;CAAE;AAEvC;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;CAAE;AAErB;EACE,iBAAiB;CAAE;AAErB;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;CAAE;AAE1B;EACE,uBAAuB;CAAE;AAE3B;EACE,cAAc;CAAE;AAElB;EACE,8BAA8B;CAAE;AAElC;EACE,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;CAAE;AAE3B;EACE,aAAa;CAAE;AACf;IACE,gBAAgB;CAAE;AAEtB;EACE,uBAAuB;EACvB,cAAc;EACd,aAAa;EACb,gBAAgB;CAAE;AAEpB;EACE,cAAc;EACd,gBAAgB;EAChB,YAAY;EACZ,iBAAiB;CAAE;AAErB;EACE,0BAA0B;EAC1B,YAAY;EACZ,mBAAmB;EACnB,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAAE;AACnB;IACE,cAAc;CAAE;AAClB;IACE,cAAc;IACd,oBAAoB;CAAE;AACxB;IACE,mBAAmB;CAAE;AACvB;IACE,mBAAmB;CAAE;AACvB;IACE,mBAAmB;IACnB,mBAAmB;IACnB,YAAY;IACZ,iBAAiB;CAAE;AACrB;IACE,iBAAiB;IACjB,cAAc;IACd,oBAAoB;IACpB,kBAAkB;CAAE;AACpB;MACE,gBAAgB;CAAE;AACtB;IACE,kBAAkB;CAAE;AACtB;IACE,0BAA0B;CAAE;AAEhC;EACE,cAAc;EACd,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAAE;AACnB;IACE,eAAe;IACf,iBAAiB;IACjB,aAAa;IACb,aAAa;IACb,YAAY;CAAE;AAElB;EACE,qBAAqB;CAAE;AAEzB;EACE,uBAAuB;EACvB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,uBAAuB;EACvB,YAAY;CAAE;AAEhB;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CAAE;AAEhB;EACE,0BAA0B;EAC1B,YAAY;CAAE",file:"vue-tags-input.scss?vue&type=style&index=0&id=61d92e31&lang=scss&scoped=true&",sourcesContent:['@font-face {\n  font-family: \'icomoon\';\n  src: url("./assets/fonts/icomoon.eot?7grlse");\n  src: url("./assets/fonts/icomoon.eot?7grlse#iefix") format("embedded-opentype"), url("./assets/fonts/icomoon.ttf?7grlse") format("truetype"), url("./assets/fonts/icomoon.woff?7grlse") format("woff");\n  font-weight: normal;\n  font-style: normal; }\n\n[class^="ti-icon-"], [class*=" ti-icon-"] {\n  font-family: \'icomoon\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.ti-icon-check:before {\n  content: "\\e902"; }\n\n.ti-icon-close:before {\n  content: "\\e901"; }\n\n.ti-icon-undo:before {\n  content: "\\e900"; }\n\nul {\n  margin: 0px;\n  padding: 0px;\n  list-style-type: none; }\n\n*, *:before, *:after {\n  box-sizing: border-box; }\n\ninput:focus {\n  outline: none; }\n\ninput[disabled] {\n  background-color: transparent; }\n\n.vue-tags-input {\n  max-width: 450px;\n  position: relative;\n  background-color: #fff; }\n\ndiv.vue-tags-input.disabled {\n  opacity: 0.5; }\n  div.vue-tags-input.disabled * {\n    cursor: default; }\n\n.ti-input {\n  border: 1px solid #ccc;\n  display: flex;\n  padding: 4px;\n  flex-wrap: wrap; }\n\n.ti-tags {\n  display: flex;\n  flex-wrap: wrap;\n  width: 100%;\n  line-height: 1em; }\n\n.ti-tag {\n  background-color: #5C6BC0;\n  color: #fff;\n  border-radius: 2px;\n  display: flex;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em; }\n  .ti-tag:focus {\n    outline: none; }\n  .ti-tag .ti-content {\n    display: flex;\n    align-items: center; }\n  .ti-tag .ti-tag-center {\n    position: relative; }\n  .ti-tag span {\n    line-height: .85em; }\n  .ti-tag span.ti-hidden {\n    padding-left: 14px;\n    visibility: hidden;\n    height: 0px;\n    white-space: pre; }\n  .ti-tag .ti-actions {\n    margin-left: 2px;\n    display: flex;\n    align-items: center;\n    font-size: 1.15em; }\n    .ti-tag .ti-actions i {\n      cursor: pointer; }\n  .ti-tag:last-child {\n    margin-right: 4px; }\n  .ti-tag.ti-invalid, .ti-tag.ti-tag.ti-deletion-mark {\n    background-color: #e54d42; }\n\n.ti-new-tag-input-wrapper {\n  display: flex;\n  flex: 1 0 auto;\n  padding: 3px 5px;\n  margin: 2px;\n  font-size: .85em; }\n  .ti-new-tag-input-wrapper input {\n    flex: 1 0 auto;\n    min-width: 100px;\n    border: none;\n    padding: 0px;\n    margin: 0px; }\n\n.ti-new-tag-input {\n  line-height: initial; }\n\n.ti-autocomplete {\n  border: 1px solid #ccc;\n  border-top: none;\n  position: absolute;\n  width: 100%;\n  background-color: #fff;\n  z-index: 20; }\n\n.ti-item > div {\n  cursor: pointer;\n  padding: 3px 6px;\n  width: 100%; }\n\n.ti-selected-item {\n  background-color: #5C6BC0;\n  color: #fff; }\n'],sourceRoot:""}])},function(A,t,e){"use strict";A.exports=function(A){return"string"!=typeof A?A:(/^['"].*['"]$/.test(A)&&(A=A.slice(1,-1)),/["'() \t\n]/.test(A)?'"'+A.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':A)}},function(A,t){A.exports="data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg8SBawAAAC8AAAAYGNtYXAXVtKJAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZqWfozAAAAF4AAAA/GhlYWQPxZgIAAACdAAAADZoaGVhB4ADyAAAAqwAAAAkaG10eBIAAb4AAALQAAAAHGxvY2EAkgDiAAAC7AAAABBtYXhwAAkAHwAAAvwAAAAgbmFtZZlKCfsAAAMcAAABhnBvc3QAAwAAAAAEpAAAACAAAwOAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpAgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6QL//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAFYBAQO+AoEAHAAAATIXHgEXFhcHJicuAScmIyIGBxchERc2Nz4BNzYCFkpDQ28pKRdkECAfVTM0OT9wLZz+gJgdIiJLKSgCVRcYUjg5QiAzKys+ERIrJZoBgJoZFRQcCAgAAQDWAIEDKgLVAAsAAAEHFwcnByc3JzcXNwMq7u487u487u487u4Cme7uPO7uPO7uPO7uAAEAkgCBA4ACvQAFAAAlARcBJzcBgAHEPP4A7jz5AcQ8/gDuPAAAAAABAAAAAAAAH8nTUV8PPPUACwQAAAAAANZ1KhsAAAAA1nUqGwAAAAADvgLVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAO+AAEAAAAAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAgAAAAQAAFYEAADWBAAAkgAAAAAACgAUAB4AUABqAH4AAQAAAAcAHQABAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="},function(A,t){A.exports="data:font/woff;base64,d09GRgABAAAAAAUQAAsAAAAABMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFrGNtYXAAAAFoAAAAVAAAAFQXVtKJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAPwAAAD8pZ+jMGhlYWQAAALAAAAANgAAADYPxZgIaGhlYQAAAvgAAAAkAAAAJAeAA8hobXR4AAADHAAAABwAAAAcEgABvmxvY2EAAAM4AAAAEAAAABAAkgDibWF4cAAAA0gAAAAgAAAAIAAJAB9uYW1lAAADaAAAAYYAAAGGmUoJ+3Bvc3QAAATwAAAAIAAAACAAAwAAAAMDgAGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QIDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkC//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQBWAQEDvgKBABwAAAEyFx4BFxYXByYnLgEnJiMiBgcXIREXNjc+ATc2AhZKQ0NvKSkXZBAgH1UzNDk/cC2c/oCYHSIiSykoAlUXGFI4OUIgMysrPhESKyWaAYCaGRUUHAgIAAEA1gCBAyoC1QALAAABBxcHJwcnNyc3FzcDKu7uPO7uPO7uPO7uApnu7jzu7jzu7jzu7gABAJIAgQOAAr0ABQAAJQEXASc3AYABxDz+AO48+QHEPP4A7jwAAAAAAQAAAAAAAB/J01FfDzz1AAsEAAAAAADWdSobAAAAANZ1KhsAAAAAA74C1QAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADvgABAAAAAAAAAAAAAAAAAAAABwQAAAAAAAAAAAAAAAIAAAAEAABWBAAA1gQAAJIAAAAAAAoAFAAeAFAAagB+AAEAAAAHAB0AAQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},function(A,t,e){"use strict";e.r(t);var n=function(){var A=this,t=A.$createElement,e=A._self._c||t;return e("div",{staticClass:"vue-tags-input",class:[{"ti-disabled":A.disabled},{"ti-focus":A.focused}]},[e("div",{staticClass:"ti-input"},[A.tagsCopy?e("ul",{staticClass:"ti-tags"},[A._l(A.tagsCopy,function(t,n){return e("li",{key:n,staticClass:"ti-tag",class:[{"ti-editing":A.tagsEditStatus[n]},t.tiClasses,t.classes,{"ti-deletion-mark":A.isMarked(n)}],style:t.style,attrs:{tabindex:"0"},on:{click:function(e){return A.$emit("tag-clicked",{tag:t,index:n})}}},[e("div",{staticClass:"ti-content"},[A.$scopedSlots["tag-left"]?e("div",{staticClass:"ti-tag-left"},[A._t("tag-left",null,{tag:t,index:n,edit:A.tagsEditStatus[n],performSaveEdit:A.performSaveTag,performDelete:A.performDeleteTag,performCancelEdit:A.cancelEdit,performOpenEdit:A.performEditTag,deletionMark:A.isMarked(n)})],2):A._e(),A._v(" "),e("div",{ref:"tagCenter",refInFor:!0,staticClass:"ti-tag-center"},[A.$scopedSlots["tag-center"]?A._e():e("span",{class:{"ti-hidden":A.tagsEditStatus[n]},on:{click:function(t){return A.performEditTag(n)}}},[A._v(A._s(t.text))]),A._v(" "),A.$scopedSlots["tag-center"]?A._e():e("tag-input",{attrs:{scope:{edit:A.tagsEditStatus[n],maxlength:A.maxlength,tag:t,index:n,validateTag:A.createChangedTag,performCancelEdit:A.cancelEdit,performSaveEdit:A.performSaveTag}}}),A._v(" "),A._t("tag-center",null,{tag:t,index:n,maxlength:A.maxlength,edit:A.tagsEditStatus[n],performSaveEdit:A.performSaveTag,performDelete:A.performDeleteTag,performCancelEdit:A.cancelEdit,validateTag:A.createChangedTag,performOpenEdit:A.performEditTag,deletionMark:A.isMarked(n)})],2),A._v(" "),A.$scopedSlots["tag-right"]?e("div",{staticClass:"ti-tag-right"},[A._t("tag-right",null,{tag:t,index:n,edit:A.tagsEditStatus[n],performSaveEdit:A.performSaveTag,performDelete:A.performDeleteTag,performCancelEdit:A.cancelEdit,performOpenEdit:A.performEditTag,deletionMark:A.isMarked(n)})],2):A._e()]),A._v(" "),e("div",{staticClass:"ti-actions"},[A.$scopedSlots["tag-actions"]?A._e():e("i",{directives:[{name:"show",rawName:"v-show",value:A.tagsEditStatus[n],expression:"tagsEditStatus[index]"}],staticClass:"ti-icon-undo",on:{click:function(t){return A.cancelEdit(n)}}}),A._v(" "),A.$scopedSlots["tag-actions"]?A._e():e("i",{directives:[{name:"show",rawName:"v-show",value:!A.tagsEditStatus[n],expression:"!tagsEditStatus[index]"}],staticClass:"ti-icon-close",on:{click:function(t){return A.performDeleteTag(n)}}}),A._v(" "),A.$scopedSlots["tag-actions"]?A._t("tag-actions",null,{tag:t,index:n,edit:A.tagsEditStatus[n],performSaveEdit:A.performSaveTag,performDelete:A.performDeleteTag,performCancelEdit:A.cancelEdit,performOpenEdit:A.performEditTag,deletionMark:A.isMarked(n)}):A._e()],2)])}),A._v(" "),e("li",{staticClass:"ti-new-tag-input-wrapper"},[e("input",A._b({ref:"newTagInput",staticClass:"ti-new-tag-input",class:[A.createClasses(A.newTag,A.tags,A.validation,A.isDuplicate)],attrs:{placeholder:A.placeholder,maxlength:A.maxlength,disabled:A.disabled,type:"text",size:"1"},domProps:{value:A.newTag},on:{keydown:[function(t){return A.performAddTags(A.filteredAutocompleteItems[A.selectedItem]||A.newTag,t)},function(t){return t.type.indexOf("key")||8===t.keyCode?A.invokeDelete(t):null},function(t){return t.type.indexOf("key")||9===t.keyCode?A.performBlur(t):null},function(t){return t.type.indexOf("key")||38===t.keyCode?A.selectItem(t,"before"):null},function(t){return t.type.indexOf("key")||40===t.keyCode?A.selectItem(t,"after"):null}],paste:A.addTagsFromPaste,input:A.updateNewTag,blur:function(t){return A.$emit("blur",t)},focus:function(t){A.focused=!0,A.$emit("focus",t)},click:function(t){!A.addOnlyFromAutocomplete&&(A.selectedItem=null)}}},"input",A.$attrs,!1))])],2):A._e()]),A._v(" "),A._t("between-elements"),A._v(" "),A.autocompleteOpen?e("div",{staticClass:"ti-autocomplete",on:{mouseout:function(t){A.selectedItem=null}}},[A._t("autocomplete-header"),A._v(" "),e("ul",A._l(A.filteredAutocompleteItems,function(t,n){return e("li",{key:n,staticClass:"ti-item",class:[t.tiClasses,t.classes,{"ti-selected-item":A.isSelected(n)}],style:t.style,on:{mouseover:function(t){!A.disabled&&(A.selectedItem=n)}}},[A.$scopedSlots["autocomplete-item"]?A._t("autocomplete-item",null,{item:t,index:n,performAdd:function(t){return A.performAddTags(t,void 0,"autocomplete")},selected:A.isSelected(n)}):e("div",{on:{click:function(e){return A.performAddTags(t,void 0,"autocomplete")}}},[A._v("\n          "+A._s(t.text)+"\n        ")])],2)}),0),A._v(" "),A._t("autocomplete-footer")],2):A._e()],2)};n._withStripped=!0;var i=e(5),a=e.n(i),r=function(A){return JSON.parse(JSON.stringify(A))},o=function(A,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=arguments.length>3?arguments[3]:void 0;void 0===A.text&&(A={text:A});var i=function(A,t){return t.filter(function(t){var e=A.text;return"string"==typeof t.rule?!new RegExp(t.rule).test(e):t.rule instanceof RegExp?!t.rule.test(e):"[object Function]"==={}.toString.call(t.rule)?t.rule(A):void 0}).map(function(A){return A.classes})}(A,e),a=function(A,t){for(var e=0;e<A.length;){if(t(A[e],e,A))return e;e++}return-1}(t,function(t){return t===A}),o=r(t),s=-1!==a?o.splice(a,1)[0]:r(A);return(n?n(o,s):-1!==o.map(function(A){return A.text}).indexOf(s.text))&&i.push("ti-duplicate"),0===i.length?i.push("ti-valid"):i.push("ti-invalid"),i},s=function(A){void 0===A.text&&(A={text:A});for(var t=r(A),e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];return t.tiClasses=o.apply(void 0,[A].concat(n)),t},u=function(A){for(var t=arguments.length,e=new Array(t>1?t-1:0),n=1;n<t;n++)e[n-1]=arguments[n];return A.map(function(t){return s.apply(void 0,[t,A].concat(e))})},c=function(){var A=this,t=A.$createElement,e=A._self._c||t;return A.scope.edit?e("input",{directives:[{name:"model",rawName:"v-model",value:A.scope.tag.text,expression:"scope.tag.text"}],staticClass:"ti-tag-input",attrs:{maxlength:A.scope.maxlength,type:"text",size:"1"},domProps:{value:A.scope.tag.text},on:{input:[function(t){t.target.composing||A.$set(A.scope.tag,"text",t.target.value)},function(t){return A.scope.validateTag(A.scope.index,t)}],blur:function(t){return A.scope.performCancelEdit(A.scope.index)},keydown:function(t){return A.scope.performSaveEdit(A.scope.index,t)}}}):A._e()};c._withStripped=!0;var d={name:"TagInput",props:{scope:{type:Object}}};e(7);function l(A,t,e,n,i,a,r,o){var s,u="function"==typeof A?A.options:A;if(t&&(u.render=t,u.staticRenderFns=e,u._compiled=!0),n&&(u.functional=!0),a&&(u._scopeId="data-v-"+a),r?(s=function(A){(A=A||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(A=__VUE_SSR_CONTEXT__),i&&i.call(this,A),A&&A._registeredComponents&&A._registeredComponents.add(r)},u._ssrRegister=s):i&&(s=o?function(){i.call(this,this.$root.$options.shadowRoot)}:i),s)if(u.functional){u._injectStyles=s;var c=u.render;u.render=function(A,t){return s.call(t),c(A,t)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,s):[s]}return{exports:A,options:u}}var p=l(d,c,[],!1,null,"108f4f13",null);p.options.__file="vue-tags-input/tag-input.vue";var g=p.exports,f=function(A){return!A.some(function(A){var t=!A.text;t&&console.warn('Missing property "text"',A);var e=!1;return A.classes&&(e="string"!=typeof A.classes),e&&console.warn('Property "classes" must be type of string',A),t||e})},B=function(A){return!A.some(function(A){if("number"==typeof A){var t=isFinite(A)&&Math.floor(A)===A;return t||console.warn("Only numerics are allowed for this prop. Found:",A),!t}if("string"==typeof A){var e=/\W|[a-z]|!\d/i.test(A);return e||console.warn("Only alpha strings are allowed for this prop. Found:",A),!e}return console.warn("Only numeric and string values are allowed. Found:",A),!1})},v={value:{type:String,default:"",required:!0},tags:{type:Array,default:function(){return[]},validator:f},autocompleteItems:{type:Array,default:function(){return[]},validator:f},allowEditTags:{type:Boolean,default:!1},autocompleteFilterDuplicates:{default:!0,type:Boolean},addOnlyFromAutocomplete:{type:Boolean,default:!1},autocompleteMinLength:{type:Number,default:1},autocompleteAlwaysOpen:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},placeholder:{type:String,default:"Add Tag"},addOnKey:{type:Array,default:function(){return[13]},validator:B},saveOnKey:{type:Array,default:function(){return[13]},validator:B},maxTags:{type:Number},maxlength:{type:Number},validation:{type:Array,default:function(){return[]},validator:function(A){return!A.some(function(A){var t=!A.rule;t&&console.warn('Property "rule" is missing',A);var e=A.rule&&("string"==typeof A.rule||A.rule instanceof RegExp||"[object Function]"==={}.toString.call(A.rule));e||console.warn("A rule must be type of string, RegExp or function. Found:",JSON.stringify(A.rule));var n=!A.classes;n&&console.warn('Property "classes" is missing',A);var i=A.type&&"string"!=typeof A.type;return i&&console.warn('Property "type" must be type of string. Found:',A),!e||t||n||i})}},separators:{type:Array,default:function(){return[";"]},validator:function(A){return!A.some(function(A){var t="string"!=typeof A;return t&&console.warn("Separators must be type of string. Found:",A),t})}},avoidAddingDuplicates:{type:Boolean,default:!0},addOnBlur:{type:Boolean,default:!0},isDuplicate:{type:Function,default:null},addFromPaste:{type:Boolean,default:!0},deleteOnBackspace:{default:!0,type:Boolean}};function m(A){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(A){return typeof A}:function(A){return A&&"function"==typeof Symbol&&A.constructor===Symbol&&A!==Symbol.prototype?"symbol":typeof A})(A)}var h={name:"VueTagsInput",components:{TagInput:g},props:v,data:function(){return{newTag:null,tagsCopy:null,tagsEditStatus:null,deletionMark:null,deletionMarkTime:null,selectedItem:null,focused:null}},computed:{autocompleteOpen:function(){return!!this.autocompleteAlwaysOpen||null!==this.newTag&&this.newTag.length>=this.autocompleteMinLength&&this.filteredAutocompleteItems.length>0&&this.focused},filteredAutocompleteItems:function(){var A=this,t=this.autocompleteItems.map(function(t){return s(t,A.tags,A.validation,A.isDuplicate)});return this.autocompleteFilterDuplicates?t.filter(this.duplicateFilter):t}},methods:{createClasses:o,getSelectedIndex:function(A){var t=this.filteredAutocompleteItems,e=this.selectedItem,n=t.length-1;if(0!==t.length)return null===e?0:"before"===A&&0===e?n:"after"===A&&e===n?0:"after"===A?e+1:e-1},selectDefaultItem:function(){this.addOnlyFromAutocomplete&&this.filteredAutocompleteItems.length>0?this.selectedItem=0:this.selectedItem=null},selectItem:function(A,t){A.preventDefault(),this.selectedItem=this.getSelectedIndex(t)},isSelected:function(A){return this.selectedItem===A},isMarked:function(A){return this.deletionMark===A},invokeDelete:function(){var A=this;if(this.deleteOnBackspace&&!(this.newTag.length>0)){var t=this.tagsCopy.length-1;null===this.deletionMark?(this.deletionMarkTime=setTimeout(function(){return A.deletionMark=null},1e3),this.deletionMark=t):this.performDeleteTag(t)}},addTagsFromPaste:function(){var A=this;this.addFromPaste&&setTimeout(function(){return A.performAddTags(A.newTag)},10)},performEditTag:function(A){var t=this;this.allowEditTags&&(this._events["before-editing-tag"]||this.editTag(A),this.$emit("before-editing-tag",{index:A,tag:this.tagsCopy[A],editTag:function(){return t.editTag(A)}}))},editTag:function(A){this.allowEditTags&&(this.toggleEditMode(A),this.focus(A))},toggleEditMode:function(A){this.allowEditTags&&!this.disabled&&this.$set(this.tagsEditStatus,A,!this.tagsEditStatus[A])},createChangedTag:function(A,t){var e=this.tagsCopy[A];e.text=t?t.target.value:this.tagsCopy[A].text,this.$set(this.tagsCopy,A,s(e,this.tagsCopy,this.validation,this.isDuplicate))},focus:function(A){var t=this;this.$nextTick(function(){var e=t.$refs.tagCenter[A].querySelector("input.ti-tag-input");e&&e.focus()})},quote:function(A){return A.replace(/([()[{*+.$^\\|?])/g,"\\$1")},cancelEdit:function(A){this.tags[A]&&(this.tagsCopy[A]=r(s(this.tags[A],this.tags,this.validation,this.isDuplicate)),this.$set(this.tagsEditStatus,A,!1))},hasForbiddingAddRule:function(A){var t=this;return A.some(function(A){var e=t.validation.find(function(t){return A===t.classes});return!!e&&e.disableAdd})},createTagTexts:function(A){var t=this,e=new RegExp(this.separators.map(function(A){return t.quote(A)}).join("|"));return A.split(e).map(function(A){return{text:A}})},performDeleteTag:function(A){var t=this;this._events["before-deleting-tag"]||this.deleteTag(A),this.$emit("before-deleting-tag",{index:A,tag:this.tagsCopy[A],deleteTag:function(){return t.deleteTag(A)}})},deleteTag:function(A){this.disabled||(this.deletionMark=null,clearTimeout(this.deletionMarkTime),this.tagsCopy.splice(A,1),this._events["update:tags"]&&this.$emit("update:tags",this.tagsCopy),this.$emit("tags-changed",this.tagsCopy))},noTriggerKey:function(A,t){var e=-1!==this[t].indexOf(A.keyCode)||-1!==this[t].indexOf(A.key);return e&&A.preventDefault(),!e},performAddTags:function(A,t,e){var n=this;if(!(this.disabled||t&&this.noTriggerKey(t,"addOnKey"))){var i=[];"object"===m(A)&&(i=[A]),"string"==typeof A&&(i=this.createTagTexts(A)),(i=i.filter(function(A){return A.text.trim().length>0})).forEach(function(A){A=s(A,n.tags,n.validation,n.isDuplicate),n._events["before-adding-tag"]||n.addTag(A,e),n.$emit("before-adding-tag",{tag:A,addTag:function(){return n.addTag(A,e)}})})}},duplicateFilter:function(A){return this.isDuplicate?!this.isDuplicate(this.tagsCopy,A):!this.tagsCopy.find(function(t){return t.text===A.text})},addTag:function(A){var t=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"new-tag-input",n=this.filteredAutocompleteItems.map(function(A){return A.text});this.addOnlyFromAutocomplete&&-1===n.indexOf(A.text)||this.$nextTick(function(){return t.maxTags&&t.maxTags<=t.tagsCopy.length?t.$emit("max-tags-reached",A):t.avoidAddingDuplicates&&!t.duplicateFilter(A)?t.$emit("adding-duplicate",A):void(t.hasForbiddingAddRule(A.tiClasses)||(t.$emit("input",""),t.tagsCopy.push(A),t._events["update:tags"]&&t.$emit("update:tags",t.tagsCopy),"autocomplete"===e&&t.$refs.newTagInput.focus(),t.$emit("tags-changed",t.tagsCopy)))})},performSaveTag:function(A,t){var e=this,n=this.tagsCopy[A];this.disabled||t&&this.noTriggerKey(t,"addOnKey")||0!==n.text.trim().length&&(this._events["before-saving-tag"]||this.saveTag(A,n),this.$emit("before-saving-tag",{index:A,tag:n,saveTag:function(){return e.saveTag(A,n)}}))},saveTag:function(A,t){if(this.avoidAddingDuplicates){var e=r(this.tagsCopy),n=e.splice(A,1)[0];if(this.isDuplicate?this.isDuplicate(e,n):-1!==e.map(function(A){return A.text}).indexOf(n.text))return this.$emit("saving-duplicate",t)}this.hasForbiddingAddRule(t.tiClasses)||(this.$set(this.tagsCopy,A,t),this.toggleEditMode(A),this._events["update:tags"]&&this.$emit("update:tags",this.tagsCopy),this.$emit("tags-changed",this.tagsCopy))},tagsEqual:function(){var A=this;return!this.tagsCopy.some(function(t,e){return!a()(t,A.tags[e])})},updateNewTag:function(A){var t=A.target.value;this.newTag=t,this.$emit("input",t)},initTags:function(){this.tagsCopy=u(this.tags,this.validation,this.isDuplicate),this.tagsEditStatus=r(this.tags).map(function(){return!1}),this._events["update:tags"]&&!this.tagsEqual()&&this.$emit("update:tags",this.tagsCopy)},blurredOnClick:function(A){this.$el.contains(A.target)||this.$el.contains(document.activeElement)||this.performBlur(A)},performBlur:function(){this.addOnBlur&&this.focused&&this.performAddTags(this.newTag),this.focused=!1}},watch:{value:function(A){this.addOnlyFromAutocomplete||(this.selectedItem=null),this.newTag=A},tags:{handler:function(){this.initTags()},deep:!0},autocompleteOpen:"selectDefaultItem"},created:function(){this.newTag=this.value,this.initTags()},mounted:function(){this.selectDefaultItem(),document.addEventListener("click",this.blurredOnClick)},destroyed:function(){document.removeEventListener("click",this.blurredOnClick)}},C=(e(9),l(h,n,[],!1,null,"61d92e31",null));C.options.__file="vue-tags-input/vue-tags-input.vue";var E=C.exports;e.d(t,"VueTagsInput",function(){return E}),e.d(t,"createClasses",function(){return o}),e.d(t,"createTag",function(){return s}),e.d(t,"createTags",function(){return u}),e.d(t,"TagInput",function(){return g}),E.install=function(A){return A.component(E.name,E)},"undefined"!=typeof window&&window.Vue&&window.Vue.use(E);t.default=E}])});
//# sourceMappingURL=vue-tags-input.js.map

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['error', 'value', 'index', "type"],
  name: "StandardDate",
  methods: {
    hasError: function hasError() {
      return this.error.length > 0;
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.date.value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "RentControl",
  components: {},
  created: function created() {
    var tempDate = new Date();
    this.year = tempDate.getFullYear();
    this.getApartments();
  },
  watch: {
    year: function year() {
      this.getApartments();
    }
  },
  methods: {
    getApartments: function getApartments() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/v1/real-estate-management/rent-status-yearly?year=".concat(this.year)).then(function (_ref) {
        var data = _ref.data;
        _this.accounts = data.accounts;
        _this.disablePaidAlert = data.disablePaidAlert;

        if (_this.accounts.length) {
          _this.selectedAccount = _this.accounts[0];
        }
      });
    },
    addTransaction: function addTransaction(apartment, month) {
      var _this2 = this;

      var pay = true;

      if (!this.disablePaidAlert) {
        pay = confirm('Do you really want to do paid rent?');
      }

      if (pay) {
        var uri = './api/v1/transactions?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
        var data = {
          transactions: [{
            amount: apartment.totalRent,
            vat_percent: 0,
            vat: 0,
            netto: apartment.totalRent,
            book_date: "",
            category_name: "",
            currency_id: undefined,
            date: "".concat(this.year, "-").concat(month, "-01"),
            description: apartment.renter_account.name,
            destination_id: apartment.source_account.id,
            destination_name: apartment.source_account.name,
            due_date: "",
            interest_date: "",
            internal_reference: "",
            invoice_date: "",
            notes: "",
            payment_date: "",
            process_date: "",
            source_id: apartment.renter_account.id,
            source_name: apartment.renter_account.name,
            type: "deposit"
          }]
        };
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(uri, data).then(function (_ref2) {
          var data = _ref2.data;
          uri = './api/v1/real-estate-management/apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
          var submitData = {
            apartment_id: apartment.id,
            account_id: apartment.renter_account.id,
            transaction_id: parseInt(data.data.id),
            date: 1,
            month: month,
            year: _this2.year
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(uri, submitData).then(function (_ref3) {
            var data = _ref3.data;

            _this2.selectedAccount.apartments.forEach(function (element) {
              if (element.id === apartment.id) {
                element.payments.push(data['payment']);
              }
            });
          });
        });
      }
    },
    deleteTransaction: function deleteTransaction(apartment, month) {
      var _this3 = this;

      var pay = true;

      if (!this.disablePaidAlert) {
        pay = confirm('Do you really want to delete this payments?');
      }

      if (pay) {
        var transactionPyments = apartment.payments.filter(function (e) {
          return new Date(e.date).getMonth() === month - 1;
        });

        if (transactionPyments.length) {
          axios__WEBPACK_IMPORTED_MODULE_0___default().post("transactions/destroy-custom/".concat(transactionPyments[0].transaction_id), {
            _token: document.head.querySelector('meta[name="csrf-token"]').content
          }).then(function () {
            var uri = './api/v1/real-estate-management/delete-apartment-payment?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
            axios__WEBPACK_IMPORTED_MODULE_0___default().post(uri, {
              id: transactionPyments[0].id
            }).then(function () {
              _this3.selectedAccount.apartments.forEach(function (apartment) {
                apartment.payments = apartment.payments.filter(function (e) {
                  return e.id !== transactionPyments[0].id;
                });
              });
            });
          });
        }
      }
    },
    isPaidMonth: function isPaidMonth(apartment, month) {
      if (apartment.payments.find(function (e) {
        return new Date(e.date).getMonth() === month - 1;
      })) {
        return true;
      } else {
        return false;
      }
    },
    selectAccount: function selectAccount(event) {
      var account = this.accounts.find(function (e) {
        return e.id == event.target.value;
      });
      this.selectedAccount = account;
    }
  },

  /*
   * The component's data.
   */
  data: function data() {
    return {
      year: new Date(),
      accounts: [],
      selectedAccount: null,
      disablePaidAlert: true
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    inputName: String,
    inputDescription: String,
    index: Number,
    transactionType: String,
    error: Array,
    accountName: {
      type: String,
      "default": ''
    },
    accountTypeFilters: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    defaultAccountTypeFilters: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      accountAutoCompleteURI: null,
      name: null,
      trType: this.transactionType,
      target: null,
      inputDisabled: false,
      allowedTypes: this.accountTypeFilters,
      defaultAllowedTypes: this.defaultAccountTypeFilters
    };
  },
  ready: function ready() {
    // console.log('ready(): this.name = this.accountName (' + this.accountName + ')');
    this.name = this.accountName;
  },
  mounted: function mounted() {
    this.target = this.$refs.input;
    this.updateACURI(this.allowedTypes.join(',')); // console.log('mounted(): this.name = this.accountName (' + this.accountName + ')');

    this.name = this.accountName;
    this.triggerTransactionType();
  },
  watch: {
    transactionType: function transactionType() {
      this.triggerTransactionType();
    },
    accountName: function accountName() {
      // console.log('AccountSelect watch accountName!');
      this.name = this.accountName;
    },
    accountTypeFilters: function accountTypeFilters() {
      var types = this.accountTypeFilters.join(',');

      if (0 === this.accountTypeFilters.length) {
        types = this.defaultAccountTypeFilters.join(',');
      }

      this.updateACURI(types);
    }
  },
  methods: {
    aSyncFunction: function aSyncFunction(query, done) {
      axios.get(this.accountAutoCompleteURI + query).then(function (res) {
        done(res.data);
      })["catch"](function (err) {// any error handler
      });
    },
    betterHighlight: function betterHighlight(item) {
      var inputValue = this.$refs.input.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      var escapedName = this.escapeHtml(item.name_with_balance);
      return escapedName.replace(new RegExp("" + inputValue, 'i'), '<b>$&</b>');
    },
    escapeHtml: function escapeHtml(string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
      });
    },
    updateACURI: function updateACURI(types) {
      this.accountAutoCompleteURI = document.getElementsByTagName('base')[0].href + 'api/v1/autocomplete/accounts' + '?types=' + types + '&query='; // console.log('Auto complete URI is now ' + this.accountAutoCompleteURI);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    triggerTransactionType: function triggerTransactionType() {
      // console.log('On triggerTransactionType(' + this.inputName + ')');
      if (null === this.name) {// console.log('this.name is NULL.');
      }

      if (null === this.transactionType) {
        // console.log('Transaction type is NULL.');
        return;
      }

      if ('' === this.transactionType) {
        // console.log('Transaction type is "".');
        return;
      }

      this.inputDisabled = false;

      if (this.transactionType.toString() !== '' && this.index > 0) {
        if (this.transactionType.toString().toLowerCase() === 'transfer') {
          this.inputDisabled = true; // todo: needs to copy value from very first input

          return;
        }

        if (this.transactionType.toString().toLowerCase() === 'withdrawal' && this.inputName.substr(0, 6).toLowerCase() === 'source') {
          // todo also clear value?
          this.inputDisabled = true;
          return;
        }

        if (this.transactionType.toString().toLowerCase() === 'deposit' && this.inputName.substr(0, 11).toLowerCase() === 'destination') {
          // todo also clear value?
          this.inputDisabled = true;
        }
      }
    },
    selectedItem: function selectedItem(e) {
      // console.log('In SelectedItem()');
      if (typeof this.name === 'undefined') {
        // console.log('Is undefined');
        return;
      }

      if (typeof this.name === 'string') {
        // console.log('Is a string.');
        //this.trType = null;
        this.$emit('clear:value');
      } // emit the fact that the user selected a type of account
      // (influencing the destination)
      // console.log('Is some object maybe:');
      // console.log(this.name);


      this.$emit('select:account', this.name);
    },
    clearSource: function clearSource(e) {
      // console.log('clearSource()');
      //props.value = '';
      this.name = ''; // some event?

      this.$emit('clear:value');
    },
    handleEnter: function handleEnter(e) {
      // todo feels sloppy
      if (e.keyCode === 13) {//e.preventDefault();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Amount",
  props: ['source', 'destination', 'transactionType', 'value', 'error', "index"],
  data: function data() {
    return {
      sourceAccount: this.source,
      destinationAccount: this.destination,
      type: this.transactionType
    };
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.amount.value);
      this.$emit('customInput', {
        value: this.$refs.amount.value,
        index: this.index
      });
    },
    clearAmount: function clearAmount() {
      this.$refs.amount.value = '';
      this.$emit('input', this.$refs.amount.value); // some event?

      this.$emit('clear:amount');
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    changeData: function changeData() {
      //console.log('Triggered amount changeData()');
      var transactionType = this.transactionType; // reset of all are empty:

      if (!transactionType && !this.source.name && !this.destination.name) {
        $(this.$refs.cur).text('');
        return;
      }

      if (null === transactionType) {
        transactionType = '';
      }

      if ('' === transactionType && '' !== this.source.currency_name) {
        $(this.$refs.cur).text(this.source.currency_name);
        return;
      }

      if ('' === transactionType && '' !== this.destination.currency_name) {
        $(this.$refs.cur).text(this.destination.currency_name);
        return;
      } // for normal transactions, the source leads the currency


      if (transactionType.toLowerCase() === 'withdrawal' || transactionType.toLowerCase() === 'reconciliation' || transactionType.toLowerCase() === 'transfer') {
        $(this.$refs.cur).text(this.source.currency_name);
        return;
      } // for deposits, the destination leads the currency
      // but source must not be a liability


      if (transactionType.toLowerCase() === 'deposit' && !('debt' === this.source.type.toLowerCase() || 'loan' === this.source.type.toLowerCase() || 'mortgage' === this.source.type.toLowerCase())) {
        $(this.$refs.cur).text(this.destination.currency_name);
      } // for deposits, the destination leads the currency
      // unless source is liability, then source leads:


      if (transactionType.toLowerCase() === 'deposit' && ('debt' === this.source.type.toLowerCase() || 'loan' === this.source.type.toLowerCase() || 'mortgage' === this.source.type.toLowerCase())) {
        $(this.$refs.cur).text(this.source.currency_name);
      }
    }
  },
  watch: {
    source: function source() {
      // console.log('amount: watch source triggered');
      this.changeData();
    },
    value: function value() {// console.log('amount: value changed');
    },
    destination: function destination() {
      // console.log('amount: watch destination triggered');
      this.changeData();
    },
    transactionType: function transactionType() {
      // console.log('amount: watch transaction type triggered');
      this.changeData();
    }
  },
  mounted: function mounted() {
    // console.log('amount: mounted');
    this.changeData();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Bill",
  props: {
    transactionType: String,
    value: {
      type: [String, Number],
      "default": 0
    },
    error: Array,
    no_bill: String
  },
  mounted: function mounted() {
    // console.log('bill: mounted');
    this.loadBills();
  },
  data: function data() {
    var _this$value;

    return {
      selected: (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : 0,
      bills: []
    };
  },
  watch: {
    value: function value() {
      // console.log('bill: value changed to ' + this.value);
      this.selected = this.value;
    }
  },
  methods: {
    // Fixes edit change bill not updating on every browser
    signalChange: function signalChange(e) {
      this.$emit('input', this.$refs.bill.value);
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.bill.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    loadBills: function loadBills() {
      var _this = this;

      var URI = document.getElementsByTagName('base')[0].href + 'api/v1/autocomplete/bills?limit=1337';
      axios.get(URI, {}).then(function (res) {
        _this.bills = [{
          name: _this.no_bill,
          id: 0
        }];

        for (var key in res.data) {
          if (res.data.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            _this.bills.push(res.data[key]);
          }
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Budget",
  props: {
    transactionType: String,
    value: {
      type: [String, Number],
      "default": 0
    },
    error: Array,
    no_budget: String
  },
  mounted: function mounted() {
    this.loadBudgets();
  },
  data: function data() {
    var _this$value;

    return {
      selected: (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : 0,
      budgets: []
    };
  },
  watch: {
    value: function value() {
      // console.log('budget: value changed to ' + this.value);
      this.selected = this.value;
    }
  },
  methods: {
    // Fixes edit change budget not updating on every broswer
    signalChange: function signalChange(e) {
      this.$emit('input', this.$refs.budget.value);
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.budget.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    loadBudgets: function loadBudgets() {
      var _this = this;

      var URI = document.getElementsByTagName('base')[0].href + 'api/v1/autocomplete/budgets?limit=1337';
      axios.get(URI, {}).then(function (res) {
        _this.budgets = [{
          name: _this.no_budget,
          id: 0
        }];

        for (var key in res.data) {
          if (res.data.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            _this.budgets.push(res.data[key]);
          }
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Category",
  props: {
    value: String,
    inputName: String,
    error: Array,
    accountName: {
      type: String,
      "default": ''
    }
  },
  data: function data() {
    return {
      categoryAutoCompleteURI: null,
      name: null,
      target: null,
      acKey: null
    };
  },
  ready: function ready() {
    this.name = this.accountName;
    this.acKey = 'name';
  },
  mounted: function mounted() {
    this.target = this.$refs.input;
    this.categoryAutoCompleteURI = document.getElementsByTagName('base')[0].href + "api/v1/autocomplete/categories?query=";
  },
  methods: {
    hasError: function hasError() {
      return this.error.length > 0;
    },
    betterHighlight: function betterHighlight(item) {
      var inputValue = this.$refs.input.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      var escapedName = this.escapeHtml(item.name);
      return escapedName.replace(new RegExp("" + inputValue, 'i'), '<b>$&</b>');
    },
    aSyncFunction: function aSyncFunction(query, done) {
      axios.get(this.categoryAutoCompleteURI + query).then(function (res) {
        done(res.data);
      })["catch"](function (err) {// any error handler
      });
    },
    escapeHtml: function escapeHtml(string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
      });
    },
    handleInput: function handleInput(e) {
      if (typeof this.$refs.input.value === 'string') {
        this.$emit('input', this.$refs.input.value);
        return;
      }

      this.$emit('input', this.$refs.input.value.name);
    },
    clearCategory: function clearCategory() {
      //props.value = '';
      this.name = '';
      this.$refs.input.value = '';
      this.$emit('input', this.$refs.input.value); // some event?

      this.$emit('clear:category');
    },
    selectedItem: function selectedItem(e) {
      if (typeof this.name === 'undefined') {
        return;
      } // emit the fact that the user selected a type of account
      // (influencing the destination)


      this.$emit('select:category', this.name);

      if (typeof this.name === 'string') {
        this.$emit('input', this.name);
        return;
      }

      this.$emit('input', this.name.name);
    },
    handleEnter: function handleEnter(e) {
      // todo feels sloppy
      if (e.keyCode === 13) {//e.preventDefault();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CreateTransaction",
  components: {},
  created: function created() {
    var _this = this;

    this.addTransactionToArray();

    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        _this.prefillSourceAccount();

        _this.prefillDestinationAccount();
      }
    };
  },
  methods: {
    changedVat: function changedVat(e) {
      e.value = parseInt(e.value);
      this.transactions.forEach(function (transaction, index) {
        if (index === e.index) {
          transaction.vat_percent = e.value;
          transaction.vat = transaction.amount * (e.value / 100);
          transaction.netto = transaction.amount - transaction.amount * e.value / 100;
        }
      });
    },
    changedAmount: function changedAmount(e) {
      e.value = parseInt(e.value);
      this.transactions.forEach(function (transaction, index) {
        if (index === e.index) {
          transaction.amount = e.value;
          transaction.vat = e.value * (transaction.vat_percent / 100);
          transaction.netto = e.value - e.value * transaction.vat_percent / 100;
        }
      });
    },
    prefillSourceAccount: function prefillSourceAccount() {
      if (0 === window.sourceId) {
        return;
      }

      this.getAccount(window.sourceId, 'source_account');
    },
    prefillDestinationAccount: function prefillDestinationAccount() {
      if (0 === destinationId) {
        return;
      }

      this.getAccount(window.destinationId, 'destination_account');
    },
    getAccount: function getAccount(accountId, slot) {
      var _this2 = this;

      var uri = './api/v1/accounts/' + accountId + '?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
      axios.get(uri).then(function (response) {
        var model = response.data.data.attributes;
        model.type = _this2.fullAccountType(model.type, model.liability_type);
        model.id = parseInt(response.data.data.id);

        if ('source_account' === slot) {
          _this2.selectedSourceAccount(0, model);
        }

        if ('destination_account' === slot) {
          _this2.selectedDestinationAccount(0, model);
        }
      })["catch"](function (error) {
        console.warn('Could  not auto fill account');
        console.warn(error);
      });
    },
    fullAccountType: function fullAccountType(shortType, liabilityType) {
      var _arr$searchType;

      var searchType = shortType;

      if ('liabilities' === shortType) {
        searchType = liabilityType;
      }

      var arr = {
        'asset': 'Asset account',
        'loan': 'Loan',
        'debt': 'Debt',
        'mortgage': 'Mortgage'
      };
      return (_arr$searchType = arr[searchType]) !== null && _arr$searchType !== void 0 ? _arr$searchType : searchType;
    },
    convertData: function convertData() {
      // console.log('Now in convertData()');
      var data = {
        'transactions': []
      };
      var transactionType;
      var firstSource;
      var firstDestination;

      if (this.transactions.length > 1) {
        data.group_title = this.group_title;
      } // get transaction type from first transaction


      transactionType = this.transactionType ? this.transactionType.toLowerCase() : 'invalid'; // if the transaction type is invalid, might just be that we can deduce it from
      // the presence of a source or destination account

      firstSource = this.transactions[0].source_account.type;
      firstDestination = this.transactions[0].destination_account.type; // console.log('Type of first source is  ' + firstSource);

      if ('invalid' === transactionType && ['asset', 'Asset account', 'Loan', 'Debt', 'Mortgage'].includes(firstSource)) {
        transactionType = 'withdrawal';
      }

      if ('invalid' === transactionType && ['asset', 'Asset account', 'Loan', 'Debt', 'Mortgage'].includes(firstDestination)) {
        transactionType = 'deposit';
      }

      for (var key in this.transactions) {
        if (this.transactions.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
          data.transactions.push(this.convertDataRow(this.transactions[key], key, transactionType));
        }
      } // overrule group title in case its empty:


      if ('' === data.group_title && data.transactions.length > 1) {
        data.group_title = data.transactions[0].description;
      }

      return data;
    },
    convertDataRow: function convertDataRow(row, index, transactionType) {
      // console.log('Now in convertDataRow()');
      var tagList = [];
      var foreignAmount = null;
      var foreignCurrency = null;
      var currentArray;
      var sourceId;
      var sourceName;
      var destId;
      var destName;
      var date;
      sourceId = row.source_account.id;
      sourceName = row.source_account.name;
      destId = row.destination_account.id;
      destName = row.destination_account.name;
      date = row.date;

      if (index > 0) {
        date = this.transactions[0].date;
      } // if type is 'withdrawal' and destination is empty, cash withdrawal.


      if (transactionType === 'withdrawal' && '' === destName) {
        destId = window.cashAccountId;
      } // if type is 'deposit' and source is empty, cash deposit.


      if (transactionType === 'deposit' && '' === sourceName) {
        sourceId = window.cashAccountId;
      } // if index is over 0 and type is withdrawal or transfer, take source from index 0.


      if (index > 0 && (transactionType.toLowerCase() === 'withdrawal' || transactionType.toLowerCase() === 'transfer')) {
        sourceId = this.transactions[0].source_account.id;
        sourceName = this.transactions[0].source_account.name;
      } // if index is over 0 and type is deposit or transfer, take destination from index 0.


      if (index > 0 && (transactionType.toLowerCase() === 'deposit' || transactionType.toLowerCase() === 'transfer')) {
        destId = this.transactions[0].destination_account.id;
        destName = this.transactions[0].destination_account.name;
      }

      tagList = [];
      foreignAmount = null;
      foreignCurrency = null; // loop tags

      for (var tagKey in row.tags) {
        if (row.tags.hasOwnProperty(tagKey) && /^0$|^[1-9]\d*$/.test(tagKey) && tagKey <= 4294967294) {
          tagList.push(row.tags[tagKey].text);
        }
      } // set foreign currency info:


      if (row.foreign_amount.amount !== '' && parseFloat(row.foreign_amount.amount) !== .00) {
        foreignAmount = row.foreign_amount.amount;
        foreignCurrency = row.foreign_amount.currency_id;
      }

      if (foreignCurrency === row.currency_id) {
        foreignAmount = null;
        foreignCurrency = null;
      } // correct some id's


      if (0 === destId) {
        destId = null;
      }

      if (0 === sourceId) {
        sourceId = null;
      } // parse amount if has exactly one comma:
      // solves issues with some locales.


      if (1 === (toString(row.amount).match(/\,/g) || []).length) {
        row.amount = row.amount.replace(',', '.');
      }

      currentArray = {
        type: transactionType,
        date: date,
        amount: row.amount.toString(),
        currency_id: row.currency_id,
        description: row.description,
        source_id: sourceId,
        source_name: sourceName,
        destination_id: destId,
        destination_name: destName,
        category_name: row.category,
        vat: row.vat.toString(),
        vat_percent: row.vat_percent.toString(),
        netto: row.netto.toString(),
        interest_date: row.custom_fields.interest_date,
        book_date: row.custom_fields.book_date,
        process_date: row.custom_fields.process_date,
        due_date: row.custom_fields.due_date,
        payment_date: row.custom_fields.payment_date,
        invoice_date: row.custom_fields.invoice_date,
        internal_reference: row.custom_fields.internal_reference,
        notes: row.custom_fields.notes
      };

      if (tagList.length > 0) {
        currentArray.tags = tagList;
      }

      if (null !== foreignAmount) {
        currentArray.foreign_amount = foreignAmount;
        currentArray.foreign_currency_id = foreignCurrency;
      } // set budget id and piggy ID.


      if (parseInt(row.budget) > 0) {
        currentArray.budget_id = parseInt(row.budget);
      }

      if (parseInt(row.bill) > 0) {
        currentArray.bill_id = parseInt(row.bill);
      }

      if (parseInt(row.piggy_bank) > 0) {
        currentArray.piggy_bank_id = parseInt(row.piggy_bank);
      }

      return currentArray;
    },
    // submit transaction
    submit: function submit(e) {
      var _this3 = this;

      // console.log('Now in submit()');
      // e.preventDefault();
      var uri = './api/v1/transactions?_token=' + document.head.querySelector('meta[name="csrf-token"]').content;
      var data = this.convertData();
      var button = $('#submitButton');
      button.prop("disabled", true);
      console.log(data);
      axios.post(uri, data).then(function (response) {
        // console.log('Did a succesfull POST');
        // this method will ultimately send the user on (or not).
        if (0 === _this3.collectAttachmentData(response)) {
          // console.log('Will now go to redirectUser()');
          _this3.redirectUser(response.data.data.id, response.data.data);
        }
      })["catch"](function (error) {
        // give user errors things back.
        // something something render errors.
        console.error('Error in transaction submission.');
        console.error(error);

        _this3.parseErrors(error.response.data); // something.
        // console.log('enable button again.')


        button.removeAttr('disabled');
      });

      if (e) {
        e.preventDefault();
      }
    },
    escapeHTML: function escapeHTML(unsafeText) {
      var div = document.createElement('div');
      div.innerText = unsafeText;
      return div.innerHTML;
    },
    redirectUser: function redirectUser(groupId, transactionData) {
      var _this4 = this;

      // console.log('In redirectUser()');
      // console.log(transactionData);
      var title = null === transactionData.attributes.group_title ? transactionData.attributes.transactions[0].description : transactionData.attributes.group_title; // console.log('Title is "' + title + '"');
      // if count is 0, send user onwards.

      if (this.createAnother) {
        // do message:
        this.success_message = this.$t('firefly.transaction_stored_link', {
          ID: groupId,
          title: title
        });
        this.error_message = '';

        if (this.resetFormAfter) {
          // also clear form.
          this.resetTransactions(); // do a short time out?

          setTimeout(function () {
            return _this4.addTransactionToArray();
          }, 50); //this.addTransactionToArray();
        } // clear errors:


        this.setDefaultErrors(); // console.log('enable button again.')

        var button = $('#submitButton');
        button.removeAttr('disabled');
      } else {
        // console.log('Will redirect to previous URL. (' + previousUri + ')');
        window.location.href = window.previousUri + '?transaction_group_id=' + groupId + '&message=created';
      }
    },
    collectAttachmentData: function collectAttachmentData(response) {
      var _this5 = this;

      // console.log('Now incollectAttachmentData()');
      var groupId = response.data.data.id; // reverse list of transactions?

      response.data.data.attributes.transactions = response.data.data.attributes.transactions.reverse(); // array of all files to be uploaded:

      var toBeUploaded = []; // array with all file data.

      var fileData = []; // all attachments

      var attachments = $('input[name="attachments[]"]'); // loop over all attachments, and add references to this array:

      for (var key in attachments) {
        if (attachments.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
          for (var fileKey in attachments[key].files) {
            if (attachments[key].files.hasOwnProperty(fileKey) && /^0$|^[1-9]\d*$/.test(fileKey) && fileKey <= 4294967294) {
              // include journal thing.
              toBeUploaded.push({
                journal: response.data.data.attributes.transactions[key].transaction_journal_id,
                file: attachments[key].files[fileKey]
              });
            }
          }
        }
      }

      var count = toBeUploaded.length; // console.log('Found ' + toBeUploaded.length + ' attachments.');
      // loop all uploads.

      var _loop = function _loop(_key) {
        if (toBeUploaded.hasOwnProperty(_key) && /^0$|^[1-9]\d*$/.test(_key) && _key <= 4294967294) {
          // create file reader thing that will read all of these uploads
          (function (f, i, theParent) {
            var fileReader = new FileReader();

            fileReader.onloadend = function (evt) {
              if (evt.target.readyState === FileReader.DONE) {
                // DONE == 2
                fileData.push({
                  name: toBeUploaded[_key].file.name,
                  journal: toBeUploaded[_key].journal,
                  content: new Blob([evt.target.result])
                });

                if (fileData.length === count) {
                  theParent.uploadFiles(fileData, groupId, response.data.data);
                }
              }
            };

            fileReader.readAsArrayBuffer(f.file);
          })(toBeUploaded[_key], _key, _this5);
        }
      };

      for (var _key in toBeUploaded) {
        _loop(_key);
      }

      return count;
    },
    uploadFiles: function uploadFiles(fileData, groupId, transactionData) {
      var _this6 = this;

      var count = fileData.length;
      var uploads = 0;

      var _loop2 = function _loop2(key) {
        if (fileData.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
          // console.log('Creating attachment #' + key);
          // axios thing, + then.
          var uri = './api/v1/attachments';
          var data = {
            filename: fileData[key].name,
            attachable_type: 'TransactionJournal',
            attachable_id: fileData[key].journal
          };
          axios.post(uri, data).then(function (response) {
            // console.log('Created attachment #' + key);
            // console.log('Uploading attachment #' + key);
            var uploadUri = './api/v1/attachments/' + response.data.data.id + '/upload';
            axios.post(uploadUri, fileData[key].content).then(function (attachmentResponse) {
              // console.log('Uploaded attachment #' + key);
              uploads++;

              if (uploads === count) {
                // finally we can redirect the user onwards.
                // console.log('FINAL UPLOAD');
                _this6.redirectUser(groupId, transactionData);
              } // console.log('Upload complete!');


              return true;
            })["catch"](function (error) {
              console.error('Could not upload');
              console.error(error); // console.log('Uploaded attachment #' + key);

              uploads++;

              if (uploads === count) {
                // finally we can redirect the user onwards.
                // console.log('FINAL UPLOAD');
                _this6.redirectUser(groupId, transactionData);
              } // console.log('Upload complete!');


              return false;
            });
          })["catch"](function (error) {
            console.error('Could not create upload.');
            console.error(error);
            uploads++;

            if (uploads === count) {
              // finally we can redirect the user onwards.
              // console.log('FINAL UPLOAD');
              _this6.redirectUser(groupId, transactionData);
            } // console.log('Upload complete!');


            return false;
          });
        }
      };

      for (var key in fileData) {
        _loop2(key);
      }
    },
    setDefaultErrors: function setDefaultErrors() {
      for (var key in this.transactions) {
        if (this.transactions.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
          // console.log('Set default errors for key ' + key);
          //this.transactions[key].description
          this.transactions[key].errors = {
            source_account: [],
            destination_account: [],
            description: [],
            amount: [],
            date: [],
            budget_id: [],
            bill_id: [],
            foreign_amount: [],
            category: [],
            piggy_bank: [],
            tags: [],
            // custom fields:
            custom_errors: {
              interest_date: [],
              book_date: [],
              process_date: [],
              due_date: [],
              payment_date: [],
              invoice_date: [],
              internal_reference: [],
              notes: [],
              attachments: [],
              external_uri: []
            }
          };
        }
      }
    },
    parseErrors: function parseErrors(errors) {
      this.setDefaultErrors();
      this.error_message = "";

      if (typeof errors.errors === 'undefined') {
        this.success_message = '';
        this.error_message = errors.message;
      } else {
        this.success_message = '';
        this.error_message = this.$t('firefly.errors_submission');
      }

      var transactionIndex;
      var fieldName;

      for (var key in errors.errors) {
        if (errors.errors.hasOwnProperty(key)) {
          if (key === 'group_title') {
            this.group_title_errors = errors.errors[key];
          }

          if (key !== 'group_title') {
            // lol dumbest way to explode "transactions.0.something" ever.
            transactionIndex = parseInt(key.split('.')[1]);
            fieldName = key.split('.')[2]; // set error in this object thing.

            switch (fieldName) {
              case 'amount':
              case 'date':
              case 'budget_id':
              case 'bill_id':
              case 'description':
              case 'tags':
                this.transactions[transactionIndex].errors[fieldName] = errors.errors[key];
                break;

              case 'source_name':
              case 'source_id':
                this.transactions[transactionIndex].errors.source_account = this.transactions[transactionIndex].errors.source_account.concat(errors.errors[key]);
                break;

              case 'destination_name':
              case 'destination_id':
                this.transactions[transactionIndex].errors.destination_account = this.transactions[transactionIndex].errors.destination_account.concat(errors.errors[key]);
                break;

              case 'foreign_amount':
              case 'foreign_currency_id':
                this.transactions[transactionIndex].errors.foreign_amount = this.transactions[transactionIndex].errors.foreign_amount.concat(errors.errors[key]);
                break;
            }
          } // unique some things


          if (typeof this.transactions[transactionIndex] !== 'undefined') {
            this.transactions[transactionIndex].errors.source_account = Array.from(new Set(this.transactions[transactionIndex].errors.source_account));
            this.transactions[transactionIndex].errors.destination_account = Array.from(new Set(this.transactions[transactionIndex].errors.destination_account));
          }
        }
      }
    },
    resetTransactions: function resetTransactions() {
      // console.log('Now in resetTransactions()');
      this.transactions = [];
      this.group_title = '';
    },
    addTransactionToArray: function addTransactionToArray(e) {
      // console.log('Now in addTransactionToArray()');
      this.transactions.push({
        description: "",
        date: "",
        amount: 0,
        vat_percent: 0,
        vat: 0,
        netto: 0,
        category: "",
        piggy_bank: 0,
        seeMore: false,
        errors: {
          source_account: [],
          destination_account: [],
          description: [],
          amount: [],
          date: [],
          budget_id: [],
          bill_id: [],
          foreign_amount: [],
          category: [],
          piggy_bank: [],
          tags: [],
          // custom fields:
          custom_errors: {
            interest_date: [],
            book_date: [],
            process_date: [],
            due_date: [],
            payment_date: [],
            invoice_date: [],
            internal_reference: [],
            notes: [],
            attachments: [],
            external_uri: []
          }
        },
        budget: 0,
        bill: 0,
        tags: [],
        custom_fields: {
          "interest_date": "",
          "book_date": "",
          "process_date": "",
          "due_date": "",
          "payment_date": "",
          "invoice_date": "",
          "internal_reference": "",
          "notes": "",
          "attachments": [],
          "external_uri": ""
        },
        foreign_amount: {
          amount: "",
          currency_id: 0
        },
        source_account: {
          id: 0,
          name: "",
          type: "",
          currency_id: 0,
          currency_name: '',
          currency_code: '',
          currency_decimal_places: 2,
          allowed_types: ['Asset account', 'Revenue account', 'Loan', 'Debt', 'Mortgage'],
          default_allowed_types: ['Asset account', 'Revenue account', 'Loan', 'Debt', 'Mortgage']
        },
        destination_account: {
          id: 0,
          name: "",
          type: "",
          currency_id: 0,
          currency_name: '',
          currency_code: '',
          currency_decimal_places: 2,
          allowed_types: ['Asset account', 'Expense account', 'Loan', 'Debt', 'Mortgage'],
          default_allowed_types: ['Asset account', 'Expense account', 'Loan', 'Debt', 'Mortgage']
        }
      });

      if (this.transactions.length === 1) {
        // console.log('Length == 1, set date to today.');
        // set first date.
        var today = new Date();
        this.transactions[0].date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2); // call for extra clear thing:
        // this.clearSource(0);
        //this.clearDestination(0);
      }

      if (e) {
        e.preventDefault();
      }
    },
    setTransactionType: function setTransactionType(type) {
      this.transactionType = type;
    },
    deleteTransaction: function deleteTransaction(index, event) {
      event.preventDefault();
      this.transactions.splice(index, 1);
    },
    limitSourceType: function limitSourceType(type) {
      var i;

      for (i = 0; i < this.transactions.length; i++) {
        this.transactions[i].source_account.allowed_types = [type];
      }
    },
    limitDestinationType: function limitDestinationType(type) {
      var i;

      for (i = 0; i < this.transactions.length; i++) {
        this.transactions[i].destination_account.allowed_types = [type];
      }
    },
    selectedSourceAccount: function selectedSourceAccount(index, model) {
      // console.log('Now in selectedSourceAccount()');
      if (typeof model === 'string') {
        //console.log('model is string.')
        // cant change types, only name.
        this.transactions[index].source_account.name = model;
      } else {
        //console.log('model is NOT string.')
        this.transactions[index].source_account = {
          id: model.id,
          name: model.name,
          type: model.type,
          currency_id: model.currency_id,
          currency_name: model.currency_name,
          currency_code: model.currency_code,
          currency_decimal_places: model.currency_decimal_places,
          allowed_types: this.transactions[index].source_account.allowed_types,
          default_allowed_types: ['Asset account', 'Revenue account', 'Loan', 'Debt', 'Mortgage']
        }; // force types on destination selector.

        this.transactions[index].destination_account.allowed_types = window.allowedOpposingTypes.source[model.type];
      } //console.log('Transactions:');
      //console.log(this.transactions);

    },
    selectedDestinationAccount: function selectedDestinationAccount(index, model) {
      // console.log('Now in selectedDestinationAccount()');
      if (typeof model === 'string') {
        // cant change types, only name.
        this.transactions[index].destination_account.name = model;
      } else {
        this.transactions[index].destination_account = {
          id: model.id,
          name: model.name,
          type: model.type,
          currency_id: model.currency_id,
          currency_name: model.currency_name,
          currency_code: model.currency_code,
          currency_decimal_places: model.currency_decimal_places,
          allowed_types: this.transactions[index].destination_account.allowed_types,
          default_allowed_types: ['Asset account', 'Expense account', 'Loan', 'Debt', 'Mortgage']
        }; // force types on destination selector.

        this.transactions[index].source_account.allowed_types = window.allowedOpposingTypes.destination[model.type];
      }
    },
    clearSource: function clearSource(index) {
      // console.log('clearSource(' + index + ')');
      // reset source account:
      this.transactions[index].source_account = {
        id: 0,
        name: '',
        type: '',
        currency_id: 0,
        currency_name: '',
        currency_code: '',
        currency_decimal_places: 2,
        allowed_types: this.transactions[index].source_account.allowed_types,
        default_allowed_types: ['Asset account', 'Revenue account', 'Loan', 'Debt', 'Mortgage']
      }; // reset destination allowed account types.

      this.transactions[index].destination_account.allowed_types = []; // if there is a destination model, reset the types of the source
      // by pretending we selected it again.

      if (this.transactions[index].destination_account) {
        this.selectedDestinationAccount(index, this.transactions[index].destination_account);
      }
    },
    clearDestination: function clearDestination(index) {
      // console.log('clearDestination(' + index + ')');
      // reset destination account:
      this.transactions[index].destination_account = {
        id: 0,
        name: '',
        type: '',
        currency_id: 0,
        currency_name: '',
        currency_code: '',
        currency_decimal_places: 2,
        allowed_types: this.transactions[index].destination_account.allowed_types,
        default_allowed_types: ['Asset account', 'Expense account', 'Loan', 'Debt', 'Mortgage']
      }; // reset destination allowed account types.

      this.transactions[index].source_account.allowed_types = []; // if there is a source model, reset the types of the destination
      // by pretending we selected it again.

      if (this.transactions[index].source_account) {
        this.selectedSourceAccount(index, this.transactions[index].source_account);
      }
    }
  },

  /*
   * The component's data.
   */
  data: function data() {
    return {
      transactionType: null,
      vat_percent: 0,
      vatPercentError: '',
      group_title: "",
      transactions: [],
      group_title_errors: [],
      error_message: "",
      success_message: "",
      cash_account_id: 0,
      createAnother: false,
      resetFormAfter: false,
      resetButtonDisabled: true,
      attachmentCount: 0,
      visibleMore: false
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomAttachments",
  props: {
    title: String,
    name: String,
    error: Array
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener('paste', function (e) {
      _this.$refs.input.files = e.clipboardData.files;
    });
  },
  methods: {
    clearAtt: function clearAtt() {
      this.$refs.input.value = '';
    },
    hasError: function hasError() {
      return this.error.length > 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomString",
  props: {
    title: String,
    name: String,
    value: String,
    error: Array
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.str.value);
    },
    clearField: function clearField() {
      //props.value = '';
      this.name = '';
      this.$refs.str.value = '';
      this.$emit('input', this.$refs.str.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomTextarea",
  props: {
    title: String,
    name: String,
    value: String,
    error: Array
  },
  data: function data() {
    return {
      textValue: this.value
    };
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.str.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomTransactionFields",
  props: ['value', 'error'],
  mounted: function mounted() {
    this.getPreference();
  },
  data: function data() {
    return {
      customInterestDate: null,
      fields: [{
        "interest_date": false,
        "book_date": false,
        "process_date": false,
        "due_date": false,
        "payment_date": false,
        "invoice_date": false,
        "internal_reference": false,
        "notes": false,
        "attachments": false,
        "external_uri": false
      }]
    };
  },
  computed: {
    // TODO this seems a pretty weird way of doing it.
    dateComponent: function dateComponent() {
      return 'custom-date';
    },
    stringComponent: function stringComponent() {
      return 'custom-string';
    },
    attachmentComponent: function attachmentComponent() {
      return 'custom-attachments';
    },
    textareaComponent: function textareaComponent() {
      return 'custom-textarea';
    },
    uriComponent: function uriComponent() {
      return 'custom-uri';
    }
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.value);
    },
    getPreference: function getPreference() {
      var _this = this;

      // Vue.component('custom-date', (resolve) => {
      //      console.log('loaded');
      //  });
      var url = document.getElementsByTagName('base')[0].href + 'api/v1/preferences/transaction_journal_optional_fields';
      axios.get(url).then(function (response) {
        _this.fields = response.data.data.attributes.data;
      })["catch"](function () {
        return console.warn('Oh. Something went wrong loading custom transaction fields.');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CustomString",
  props: {
    title: String,
    name: String,
    value: String,
    error: Array
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.uri.value);
    },
    clearField: function clearField() {
      this.name = '';
      this.$refs.uri.value = '';
      this.$emit('input', this.$refs.uri.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ForeignAmountSelect",
  props: ['source', 'destination', 'transactionType', 'value', 'error', 'no_currency', 'title'],
  mounted: function mounted() {
    this.liability = false;
    this.loadCurrencies();
  },
  data: function data() {
    return {
      currencies: [],
      enabledCurrencies: [],
      exclude: null,
      // liability overrules the drop down list if the source or dest is a liability
      liability: false
    };
  },
  watch: {
    source: function source() {
      //console.log('ForeignAmountSelect watch source');
      this.changeData();
    },
    destination: function destination() {
      //console.log('ForeignAmountSelect watch destination');
      this.changeData();
    },
    transactionType: function transactionType() {
      //console.log('ForeignAmountSelect watch transaction type (is now ' + this.transactionType + ')');
      this.changeData();
    }
  },
  methods: {
    clearAmount: function clearAmount() {
      this.$refs.amount.value = '';
      this.$emit('input', this.$refs.amount.value); // some event?

      this.$emit('clear:amount');
    },
    hasError: function hasError() {
      //console.log('ForeignAmountSelect hasError');
      return this.error.length > 0;
    },
    handleInput: function handleInput(e) {
      //console.log('ForeignAmountSelect handleInput');
      var obj = {
        amount: this.$refs.amount.value,
        currency_id: this.$refs.currency_select.value
      }; // console.log(obj);

      this.$emit('input', obj);
    },
    changeData: function changeData() {
      // console.log('ForeignAmountSelect changeData');
      this.enabledCurrencies = [];
      var destType = this.destination.type ? this.destination.type.toLowerCase() : 'invalid';
      var srcType = this.source.type ? this.source.type.toLowerCase() : 'invalid';
      var tType = this.transactionType ? this.transactionType.toLowerCase() : 'invalid';
      var liabilities = ['loan', 'debt', 'mortgage'];
      var sourceIsLiability = liabilities.indexOf(srcType) !== -1;
      var destIsLiability = liabilities.indexOf(destType) !== -1; // console.log(srcType + ' (source) is a liability: ' + sourceIsLiability);
      // console.log(destType + ' (dest) is a liability: ' + destIsLiability);

      if (tType === 'transfer' || destIsLiability || sourceIsLiability) {
        // console.log('Source is liability OR dest is liability, OR transfer. Lock list on currency of destination.');
        // console.log('Length of currencies is ' + this.currencies.length);
        // console.log(this.currencies);
        this.liability = true; // lock dropdown list on on currencyID of destination.

        for (var key in this.currencies) {
          if (this.currencies.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            // console.log('this.currencies[key].id = ' + this.currencies[key].id);
            // console.log('this.destination.currency_id = ' + this.destination.currency_id);
            if (parseInt(this.currencies[key].id) === parseInt(this.destination.currency_id)) {
              this.enabledCurrencies.push(this.currencies[key]);
            }
          }
        } // console.log('Enabled currencies length is now ' + this.enabledCurrencies.length);


        return;
      } // if type is withdrawal, list all but skip the source account ID.


      if (tType === 'withdrawal' && this.source && false === sourceIsLiability) {
        for (var _key in this.currencies) {
          if (this.currencies.hasOwnProperty(_key) && /^0$|^[1-9]\d*$/.test(_key) && _key <= 4294967294) {
            if (this.source.currency_id !== this.currencies[_key].id) {
              this.enabledCurrencies.push(this.currencies[_key]);
            }
          }
        }

        return;
      } // if type is deposit, list all but skip the source account ID.


      if (tType === 'deposit' && this.destination) {
        for (var _key2 in this.currencies) {
          if (this.currencies.hasOwnProperty(_key2) && /^0$|^[1-9]\d*$/.test(_key2) && _key2 <= 4294967294) {
            if (this.destination.currency_id !== this.currencies[_key2].id) {
              this.enabledCurrencies.push(this.currencies[_key2]);
            }
          }
        }

        return;
      }

      for (var _key3 in this.currencies) {
        if (this.currencies.hasOwnProperty(_key3) && /^0$|^[1-9]\d*$/.test(_key3) && _key3 <= 4294967294) {
          this.enabledCurrencies.push(this.currencies[_key3]);
        }
      }
    },
    loadCurrencies: function loadCurrencies() {
      var _this = this;

      //console.log('loadCurrencies');
      var URI = document.getElementsByTagName('base')[0].href + "api/v1/currencies";
      axios.get(URI, {}).then(function (res) {
        _this.currencies = [{
          id: 0,
          attributes: {
            name: _this.no_currency,
            enabled: true
          }
        }];
        _this.enabledCurrencies = [{
          attributes: {
            name: _this.no_currency,
            enabled: true
          },
          id: 0
        }];

        for (var key in res.data.data) {
          if (res.data.data.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            if (res.data.data[key].attributes.enabled) {
              // console.log(res.data.data[key].attributes);
              _this.currencies.push(res.data.data[key]);

              _this.enabledCurrencies.push(res.data.data[key]);
            }
          }
        } // console.log(this.enabledCurrencies);

      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['error', 'value', 'index'],
  name: "GroupDescription",
  methods: {
    hasError: function hasError() {
      return this.error.length > 0;
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.descr.value);
    },
    clearField: function clearField() {
      //props.value = '';
      this.name = '';
      this.$refs.descr.value = '';
      this.$emit('input', this.$refs.descr.value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PiggyBank",
  props: ['value', 'transactionType', 'error', 'no_piggy_bank'],
  mounted: function mounted() {
    this.loadPiggies();
  },
  data: function data() {
    return {
      piggies: []
    };
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.piggy.value);
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    loadPiggies: function loadPiggies() {
      var _this = this;

      var URI = document.getElementsByTagName('base')[0].href + "api/v1/autocomplete/piggy-banks-with-balance?limit=1337";
      axios.get(URI, {}).then(function (res) {
        var tempList = {
          0: {
            group: {
              title: _this.$t('firefly.default_group_title_name')
            },
            piggies: [{
              name_with_balance: _this.no_piggy_bank,
              id: 0
            }]
          }
        };

        for (var key in res.data) {
          if (res.data.hasOwnProperty(key) && /^0$|^[1-9]\d*$/.test(key) && key <= 4294967294) {
            // add to temp list
            var currentPiggy = res.data[key];

            if (currentPiggy.objectGroup) {
              var groupOrder = currentPiggy.objectGroup.order;

              if (!tempList[groupOrder]) {
                tempList[groupOrder] = {
                  group: {
                    title: currentPiggy.objectGroup.title
                  },
                  piggies: []
                };
              }

              tempList[groupOrder].piggies.push({
                name_with_balance: currentPiggy.name_with_balance,
                id: currentPiggy.id
              });
            }

            if (!currentPiggy.objectGroup) {
              // add to empty one:
              tempList[0].piggies.push({
                name_with_balance: currentPiggy.name_with_balance,
                id: currentPiggy.id
              });
            } //console.log(currentPiggy);


            _this.piggies.push(res.data[key]);
          }
        }

        var ordered = {};
        Object.keys(tempList).sort().forEach(function (key) {
          var groupName = tempList[key].group.title;
          ordered[groupName] = tempList[key];
        }); // final list:

        _this.piggies = ordered; // console.log(ordered);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['error', 'value', 'index'],
  name: "StandardDate",
  methods: {
    hasError: function hasError() {
      return this.error.length > 0;
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.date.value);
    },
    clearDate: function clearDate() {
      //props.value = '';
      this.name = '';
      this.$refs.date.value = '';
      this.$emit('input', this.$refs.date.value); // some event?

      this.$emit('clear:date');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @johmun/vue-tags-input */ "./node_modules/@johmun/vue-tags-input/dist/vue-tags-input.js");
/* harmony import */ var _johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Tags",
  components: {
    VueTagsInput: (_johmun_vue_tags_input__WEBPACK_IMPORTED_MODULE_1___default())
  },
  props: ['value', 'error'],
  data: function data() {
    return {
      tag: '',
      autocompleteItems: [],
      debounce: null,
      tags: this.value
    };
  },
  watch: {
    'tag': 'initItems'
  },
  methods: {
    update: function update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
      this.$emit('input', this.tags);
    },
    clearTags: function clearTags() {
      this.tags = [];
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    initItems: function initItems() {
      var _this = this;

      // console.log('Now in initItems');
      if (this.tag.length < 2) {
        return;
      }

      var url = document.getElementsByTagName('base')[0].href + "api/v1/autocomplete/tags?query=".concat(this.tag);
      clearTimeout(this.debounce);
      this.debounce = setTimeout(function () {
        axios__WEBPACK_IMPORTED_MODULE_0___default().get(url).then(function (response) {
          _this.autocompleteItems = response.data.map(function (a) {
            return {
              text: a.tag
            };
          });
        })["catch"](function () {
          return console.warn('Oh. Something went wrong loading tags.');
        });
      }, 600);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['error', 'value', 'index'],
  name: "TransactionDescription",
  mounted: function mounted() {
    this.target = this.$refs.descr;
    this.descriptionAutoCompleteURI = document.getElementsByTagName('base')[0].href + "api/v1/autocomplete/transactions?query=";
  },
  components: {},
  data: function data() {
    return {
      descriptionAutoCompleteURI: null,
      name: null,
      description: null,
      target: null
    };
  },
  methods: {
    aSyncFunction: function aSyncFunction(query, done) {
      axios.get(this.descriptionAutoCompleteURI + query).then(function (res) {
        done(res.data);
      })["catch"](function (err) {// any error handler
      });
    },
    betterHighlight: function betterHighlight(item) {
      var inputValue = this.$refs.descr.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      var escapedName = this.escapeHtml(item.description);
      return escapedName.replace(new RegExp("" + inputValue, 'i'), '<b>$&</b>');
    },
    escapeHtml: function escapeHtml(string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
      });
    },
    search: function search(input) {
      return ['ab', 'cd'];
    },
    hasError: function hasError() {
      return this.error.length > 0;
    },
    clearDescription: function clearDescription() {
      //props.value = '';
      this.description = '';
      this.$refs.descr.value = '';
      this.$emit('input', this.$refs.descr.value); // some event?

      this.$emit('clear:description');
    },
    handleInput: function handleInput(e) {
      this.$emit('input', this.$refs.descr.value);
    },
    handleEnter: function handleEnter(e) {
      // todo feels sloppy
      if (e.keyCode === 13) {//e.preventDefault();
      }
    },
    selectedItem: function selectedItem(e) {
      if (typeof this.name === 'undefined') {
        return;
      }

      if (typeof this.name === 'string') {
        return;
      }

      this.$refs.descr.value = this.name.description;
      this.$emit('input', this.$refs.descr.value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    source: String,
    destination: String,
    type: String
  },
  methods: {
    changeValue: function changeValue() {
      if (this.source && this.destination) {
        var transactionType = '';

        if (window.accountToTypes[this.source]) {
          if (window.accountToTypes[this.source][this.destination]) {
            transactionType = window.accountToTypes[this.source][this.destination];
          } else {
            console.warn('User selected an impossible destination.');
          }
        } else {
          console.warn('User selected an impossible source.');
        }

        if ('' !== transactionType) {
          this.transactionType = transactionType;
          this.sentence = this.$t('firefly.you_create_' + transactionType.toLowerCase()); // Must also emit a change to set ALL sources and destinations to this particular type.

          this.$emit('act:limitSourceType', this.source);
          this.$emit('act:limitDestinationType', this.destination);
        }
      } else {
        this.sentence = '';
        this.transactionType = '';
      } // emit event how cool is that.


      this.$emit('set:transactionType', this.transactionType);
    }
  },
  data: function data() {
    return {
      transactionType: this.type,
      sentence: ''
    };
  },
  watch: {
    source: function source() {
      this.changeValue();
    },
    destination: function destination() {
      this.changeValue();
    }
  },
  name: "TransactionType"
});

/***/ }),

/***/ "./resources/assets/js/bootstrap.js":
/*!******************************************!*\
  !*** ./resources/assets/js/bootstrap.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/*
 * bootstrap.js
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

/*
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/***/ }),

/***/ "./resources/assets/js/i18n.js":
/*!*************************************!*\
  !*** ./resources/assets/js/i18n.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * i18n.js
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
// Create VueI18n instance with options
module.exports = new vuei18n({
  locale: document.documentElement.lang,
  // set locale
  fallbackLocale: 'en',
  messages: {
    'bg': __webpack_require__(/*! ./locales/bg.json */ "./resources/assets/js/locales/bg.json"),
    'cs': __webpack_require__(/*! ./locales/cs.json */ "./resources/assets/js/locales/cs.json"),
    'de': __webpack_require__(/*! ./locales/de.json */ "./resources/assets/js/locales/de.json"),
    'en': __webpack_require__(/*! ./locales/en.json */ "./resources/assets/js/locales/en.json"),
    'en-us': __webpack_require__(/*! ./locales/en.json */ "./resources/assets/js/locales/en.json"),
    'en-gb': __webpack_require__(/*! ./locales/en-gb.json */ "./resources/assets/js/locales/en-gb.json"),
    'es': __webpack_require__(/*! ./locales/es.json */ "./resources/assets/js/locales/es.json"),
    'el': __webpack_require__(/*! ./locales/el.json */ "./resources/assets/js/locales/el.json"),
    'fr': __webpack_require__(/*! ./locales/fr.json */ "./resources/assets/js/locales/fr.json"),
    'hu': __webpack_require__(/*! ./locales/hu.json */ "./resources/assets/js/locales/hu.json"),
    //'id': require('./locales/id.json'),
    'it': __webpack_require__(/*! ./locales/it.json */ "./resources/assets/js/locales/it.json"),
    'nl': __webpack_require__(/*! ./locales/nl.json */ "./resources/assets/js/locales/nl.json"),
    'nb': __webpack_require__(/*! ./locales/nb.json */ "./resources/assets/js/locales/nb.json"),
    'pl': __webpack_require__(/*! ./locales/pl.json */ "./resources/assets/js/locales/pl.json"),
    'fi': __webpack_require__(/*! ./locales/fi.json */ "./resources/assets/js/locales/fi.json"),
    'pt-br': __webpack_require__(/*! ./locales/pt-br.json */ "./resources/assets/js/locales/pt-br.json"),
    'pt-pt': __webpack_require__(/*! ./locales/pt.json */ "./resources/assets/js/locales/pt.json"),
    'ro': __webpack_require__(/*! ./locales/ro.json */ "./resources/assets/js/locales/ro.json"),
    'ru': __webpack_require__(/*! ./locales/ru.json */ "./resources/assets/js/locales/ru.json"),
    //'zh': require('./locales/zh.json'),
    'zh-tw': __webpack_require__(/*! ./locales/zh-tw.json */ "./resources/assets/js/locales/zh-tw.json"),
    'zh-cn': __webpack_require__(/*! ./locales/zh-cn.json */ "./resources/assets/js/locales/zh-cn.json"),
    'sk': __webpack_require__(/*! ./locales/sk.json */ "./resources/assets/js/locales/sk.json"),
    'sv': __webpack_require__(/*! ./locales/sv.json */ "./resources/assets/js/locales/sv.json"),
    'vi': __webpack_require__(/*! ./locales/vi.json */ "./resources/assets/js/locales/vi.json")
  }
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomDate.vue":
/*!******************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomDate.vue ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomDate.vue?vue&type=template&id=17fe421c& */ "./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c&");
/* harmony import */ var _CustomDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomDate.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/CustomDate.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue":
/*!**********************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/YearlyOverview.vue ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./YearlyOverview.vue?vue&type=template&id=3c2d5ad6& */ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6&");
/* harmony import */ var _YearlyOverview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./YearlyOverview.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _YearlyOverview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__.render,
  _YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/YearlyOverview.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/AccountSelect.vue":
/*!***********************************************************************!*\
  !*** ./resources/assets/js/components/transactions/AccountSelect.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountSelect.vue?vue&type=template&id=be9f63f4& */ "./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4&");
/* harmony import */ var _AccountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountSelect.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AccountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__.render,
  _AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/AccountSelect.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/Amount.vue":
/*!****************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Amount.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Amount.vue?vue&type=template&id=77eddc2b& */ "./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b&");
/* harmony import */ var _Amount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Amount.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Amount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__.render,
  _Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/Amount.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/Bill.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Bill.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bill.vue?vue&type=template&id=f18f59cc& */ "./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc&");
/* harmony import */ var _Bill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bill.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Bill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__.render,
  _Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/Bill.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/Budget.vue":
/*!****************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Budget.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Budget.vue?vue&type=template&id=b88a06d0& */ "./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0&");
/* harmony import */ var _Budget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Budget.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Budget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__.render,
  _Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/Budget.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/Category.vue":
/*!******************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Category.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Category.vue?vue&type=template&id=5e272311& */ "./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311&");
/* harmony import */ var _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Category.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__.render,
  _Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/Category.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CreateTransaction.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CreateTransaction.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTransaction.vue?vue&type=template&id=3c64c482& */ "./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482&");
/* harmony import */ var _CreateTransaction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateTransaction.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CreateTransaction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__.render,
  _CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CreateTransaction.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomAttachments.vue":
/*!***************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomAttachments.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomAttachments.vue?vue&type=template&id=75bc1a7c& */ "./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c&");
/* harmony import */ var _CustomAttachments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomAttachments.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomAttachments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CustomAttachments.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomString.vue":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomString.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomString.vue?vue&type=template&id=73a9dd75& */ "./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75&");
/* harmony import */ var _CustomString_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomString.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomString_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CustomString.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTextarea.vue":
/*!************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTextarea.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomTextarea.vue?vue&type=template&id=18b655c4& */ "./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4&");
/* harmony import */ var _CustomTextarea_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomTextarea.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomTextarea_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CustomTextarea.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTransactionFields.vue":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTransactionFields.vue ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomTransactionFields.vue?vue&type=template&id=0f4148fa& */ "./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa&");
/* harmony import */ var _CustomTransactionFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomTransactionFields.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomTransactionFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CustomTransactionFields.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomUri.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomUri.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomUri.vue?vue&type=template&id=f0ff6b90& */ "./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90&");
/* harmony import */ var _CustomUri_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomUri.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomUri_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/CustomUri.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/ForeignAmountSelect.vue ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6& */ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6&");
/* harmony import */ var _ForeignAmountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForeignAmountSelect.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForeignAmountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__.render,
  _ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/ForeignAmountSelect.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/GroupDescription.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/GroupDescription.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupDescription.vue?vue&type=template&id=7425a390& */ "./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390&");
/* harmony import */ var _GroupDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GroupDescription.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GroupDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__.render,
  _GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/GroupDescription.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/PiggyBank.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/transactions/PiggyBank.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PiggyBank.vue?vue&type=template&id=9d63c24e& */ "./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e&");
/* harmony import */ var _PiggyBank_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PiggyBank.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PiggyBank_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__.render,
  _PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/PiggyBank.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/StandardDate.vue":
/*!**********************************************************************!*\
  !*** ./resources/assets/js/components/transactions/StandardDate.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StandardDate.vue?vue&type=template&id=73fe3e1e& */ "./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e&");
/* harmony import */ var _StandardDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardDate.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StandardDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__.render,
  _StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/StandardDate.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/Tags.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Tags.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tags.vue?vue&type=template&id=25b60a2c& */ "./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c&");
/* harmony import */ var _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tags.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/Tags.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionDescription.vue":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionDescription.vue ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransactionDescription.vue?vue&type=template&id=540cd511& */ "./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511&");
/* harmony import */ var _TransactionDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransactionDescription.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TransactionDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__.render,
  _TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/TransactionDescription.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionType.vue":
/*!*************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionType.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransactionType.vue?vue&type=template&id=3f0e7af5& */ "./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5&");
/* harmony import */ var _TransactionType_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransactionType.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TransactionType_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__.render,
  _TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/transactions/TransactionType.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomDate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YearlyOverview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YearlyOverview.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_YearlyOverview_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountSelect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Amount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Amount.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Amount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Bill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Bill.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Bill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Budget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Budget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Budget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Category.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateTransaction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CreateTransaction.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateTransaction_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAttachments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomAttachments.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAttachments_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomString_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomString.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomString_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTextarea_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomTextarea.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTextarea_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTransactionFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomTransactionFields.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTransactionFields_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomUri_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomUri.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomUri_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForeignAmountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ForeignAmountSelect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForeignAmountSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GroupDescription.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PiggyBank_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PiggyBank.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PiggyBank_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandardDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StandardDate.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StandardDate_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionDescription.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionDescription_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionType_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionType.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionType_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c& ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomDate_vue_vue_type_template_id_17fe421c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomDate.vue?vue&type=template&id=17fe421c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c&");


/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6& ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_YearlyOverview_vue_vue_type_template_id_3c2d5ad6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./YearlyOverview.vue?vue&type=template&id=3c2d5ad6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4&":
/*!******************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountSelect_vue_vue_type_template_id_be9f63f4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AccountSelect.vue?vue&type=template&id=be9f63f4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Amount_vue_vue_type_template_id_77eddc2b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Amount.vue?vue&type=template&id=77eddc2b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bill_vue_vue_type_template_id_f18f59cc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Bill.vue?vue&type=template&id=f18f59cc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Budget_vue_vue_type_template_id_b88a06d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Budget.vue?vue&type=template&id=b88a06d0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311&":
/*!*************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Category_vue_vue_type_template_id_5e272311___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Category.vue?vue&type=template&id=5e272311& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateTransaction_vue_vue_type_template_id_3c64c482___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CreateTransaction.vue?vue&type=template&id=3c64c482& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAttachments_vue_vue_type_template_id_75bc1a7c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomAttachments.vue?vue&type=template&id=75bc1a7c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomString_vue_vue_type_template_id_73a9dd75___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomString.vue?vue&type=template&id=73a9dd75& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4&":
/*!*******************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTextarea_vue_vue_type_template_id_18b655c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomTextarea.vue?vue&type=template&id=18b655c4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomTransactionFields_vue_vue_type_template_id_0f4148fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomTransactionFields.vue?vue&type=template&id=0f4148fa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomUri_vue_vue_type_template_id_f0ff6b90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomUri.vue?vue&type=template&id=f0ff6b90& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6&":
/*!************************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForeignAmountSelect_vue_vue_type_template_id_c4b5d0b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390& ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GroupDescription_vue_vue_type_template_id_7425a390___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GroupDescription.vue?vue&type=template&id=7425a390& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PiggyBank_vue_vue_type_template_id_9d63c24e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PiggyBank.vue?vue&type=template&id=9d63c24e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StandardDate_vue_vue_type_template_id_73fe3e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StandardDate.vue?vue&type=template&id=73fe3e1e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tags_vue_vue_type_template_id_25b60a2c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tags.vue?vue&type=template&id=25b60a2c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511&":
/*!***************************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionDescription_vue_vue_type_template_id_540cd511___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionDescription.vue?vue&type=template&id=540cd511& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511&");


/***/ }),

/***/ "./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TransactionType_vue_vue_type_template_id_3f0e7af5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TransactionType.vue?vue&type=template&id=3f0e7af5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomDate.vue?vue&type=template&id=17fe421c& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.date")) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "date",
              staticClass: "form-control",
              attrs: {
                disabled: _vm.index > 0,
                autocomplete: "off",
                name: "date[]",
                type: _vm.type,
                placeholder: _vm.$t("firefly.date"),
                title: _vm.$t("firefly.date")
              },
              domProps: { value: _vm.value },
              on: { input: _vm.handleInput }
            })
          ]),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { key: error, staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/YearlyOverview.vue?vue&type=template&id=3c2d5ad6& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("input", { attrs: { name: "_token", type: "hidden", value: "xxx" } }),
    _vm._v(" "),
    _c("div", { staticClass: "box" }, [
      _c("div", { staticClass: "box-header" }, [
        _c(
          "div",
          {
            staticStyle: {
              width: "400px",
              "max-width": "100%",
              display: "flex",
              "grid-gap": "12px"
            }
          },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.year,
                  expression: "year"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "number", min: "1900", max: "2999" },
              domProps: { value: _vm.year },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.getApartments.apply(null, arguments)
                },
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.year = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c(
              "select",
              {
                staticClass: "form-control",
                attrs: { name: "account", id: "account" },
                on: { change: _vm.selectAccount }
              },
              _vm._l(_vm.accounts, function(account) {
                return _c(
                  "option",
                  { key: account.id, domProps: { value: account.id } },
                  [_vm._v(_vm._s(account.name))]
                )
              }),
              0
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "box-body" }, [
        _c(
          "div",
          {
            staticClass: "rent_control_list_table_container",
            staticStyle: { margin: "20px 0px 20px 0px" }
          },
          [
            _vm.selectedAccount
              ? _c("div", [
                  _c(
                    "table",
                    {
                      staticClass:
                        "table table-responsive table-hover rent_control_list_table",
                      attrs: { id: "sortable-table" }
                    },
                    [
                      _c("thead", [
                        _c(
                          "th",
                          {
                            staticClass: "text-left",
                            staticStyle: { width: "10%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.apt")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-left",
                            staticStyle: { width: "10%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.name")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-left",
                            staticStyle: { width: "10%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.total_rent")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.jan")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.feb")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.mar")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.apr")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.may")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.jun")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.jul")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.aug")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.sep")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.oct")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.nov")))]
                        ),
                        _vm._v(" "),
                        _c(
                          "th",
                          {
                            staticClass: "text-center",
                            staticStyle: { width: "4%" }
                          },
                          [_vm._v(_vm._s(_vm.$t("firefly.dec")))]
                        )
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.selectedAccount.apartments, function(
                        apartment
                      ) {
                        return _c(
                          "tr",
                          {
                            key: apartment.id,
                            staticClass: "sortable-object apartment_row"
                          },
                          [
                            _c("td", { staticClass: "text-left" }, [
                              _vm._v(_vm._s(apartment.id))
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-left" }, [
                              _c(
                                "a",
                                {
                                  attrs: {
                                    href:
                                      "/accounts/show/" +
                                      apartment.renter_account.id
                                  }
                                },
                                [_vm._v(_vm._s(apartment.renter_account.name))]
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-left" }, [
                              _vm._v(_vm._s(apartment.totalRent))
                            ]),
                            _vm._v(" "),
                            _vm._l(12, function(n) {
                              return _c(
                                "td",
                                { key: n, staticClass: "text-center" },
                                [
                                  _vm.isPaidMonth(apartment, n)
                                    ? _c(
                                        "div",
                                        {
                                          staticStyle: {
                                            color: "green",
                                            cursor: "pointer"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.deleteTransaction(
                                                apartment,
                                                n
                                              )
                                            }
                                          }
                                        },
                                        [_vm._v("Ok")]
                                      )
                                    : _c(
                                        "div",
                                        {
                                          staticStyle: {
                                            color: "red",
                                            cursor: "pointer"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.addTransaction(
                                                apartment,
                                                n
                                              )
                                            }
                                          }
                                        },
                                        [_vm._v("X")]
                                      )
                                ]
                              )
                            })
                          ],
                          2
                        )
                      })
                    ],
                    2
                  )
                ])
              : _vm._e()
          ]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/AccountSelect.vue?vue&type=template&id=be9f63f4& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.inputDescription) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "input",
              staticClass: "form-control",
              attrs: {
                "data-index": _vm.index,
                disabled: _vm.inputDisabled,
                name: _vm.inputName,
                placeholder: _vm.inputDescription,
                title: _vm.inputDescription,
                autocomplete: "off",
                "data-role": "input",
                type: "text"
              },
              on: {
                keypress: _vm.handleEnter,
                submit: function($event) {
                  $event.preventDefault()
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearSource }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _c("typeahead", {
            attrs: {
              "async-function": _vm.aSyncFunction,
              "open-on-empty": true,
              "open-on-focus": true,
              target: _vm.target,
              "item-key": "name_with_balance"
            },
            on: { input: _vm.selectedItem },
            scopedSlots: _vm._u([
              {
                key: "item",
                fn: function(props) {
                  return _vm._l(props.items, function(item, index) {
                    return _c(
                      "li",
                      { class: { active: props.activeIndex === index } },
                      [
                        _c(
                          "a",
                          {
                            attrs: { role: "button" },
                            on: {
                              click: function($event) {
                                return props.select(item)
                              }
                            }
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.betterHighlight(item))
                              }
                            })
                          ]
                        )
                      ]
                    )
                  })
                }
              }
            ]),
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v
              },
              expression: "name"
            }
          }),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Amount.vue?vue&type=template&id=77eddc2b& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.amount")) + "\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-12" }, [
        _c("div", { staticClass: "input-group" }, [
          _c("input", {
            ref: "amount",
            staticClass: "form-control",
            attrs: {
              title: _vm.$t("firefly.amount"),
              autocomplete: "off",
              name: "amount[]",
              step: "any",
              type: "number",
              placeholder: _vm.$t("firefly.amount")
            },
            domProps: { value: _vm.value },
            on: { input: _vm.handleInput }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "input-group-btn" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { tabIndex: "-1", type: "button" },
                on: { click: _vm.clearAmount }
              },
              [_c("i", { staticClass: "fa fa-trash-o" })]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._l(this.error, function(error) {
        return _c("ul", { staticClass: "list-unstyled" }, [
          _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Bill.vue?vue&type=template&id=f18f59cc& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof this.transactionType === "undefined" ||
    this.transactionType === "withdrawal" ||
    this.transactionType === "Withdrawal" ||
    this.transactionType === "" ||
    null === this.transactionType
    ? _c(
        "div",
        { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
        [
          _c("div", { staticClass: "col-sm-12 text-sm" }, [
            _vm._v("\n    " + _vm._s(_vm.$t("firefly.bill")) + "\n  ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-sm-12" },
            [
              this.bills.length > 0
                ? _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selected,
                          expression: "selected"
                        }
                      ],
                      ref: "bill",
                      staticClass: "form-control",
                      attrs: { title: _vm.$t("firefly.bill"), name: "bill[]" },
                      on: {
                        input: _vm.handleInput,
                        change: [
                          function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.selected = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.signalChange
                        ]
                      }
                    },
                    _vm._l(this.bills, function(cBill) {
                      return _c(
                        "option",
                        {
                          attrs: { label: cBill.name },
                          domProps: { value: cBill.id }
                        },
                        [_vm._v(_vm._s(cBill.name) + "\n      ")]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              this.bills.length === 1
                ? _c("p", {
                    staticClass: "help-block",
                    domProps: {
                      innerHTML: _vm._s(_vm.$t("firefly.no_bill_pointer"))
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(this.error, function(error) {
                return _c("ul", { staticClass: "list-unstyled" }, [
                  _c("li", { staticClass: "text-danger" }, [
                    _vm._v(_vm._s(error))
                  ])
                ])
              })
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Budget.vue?vue&type=template&id=b88a06d0& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof this.transactionType === "undefined" ||
    this.transactionType === "withdrawal" ||
    this.transactionType === "Withdrawal" ||
    this.transactionType === "" ||
    null === this.transactionType
    ? _c(
        "div",
        { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
        [
          _c("div", { staticClass: "col-sm-12 text-sm" }, [
            _vm._v("\n    " + _vm._s(_vm.$t("firefly.budget")) + "\n  ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-sm-12" },
            [
              this.budgets.length > 0
                ? _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selected,
                          expression: "selected"
                        }
                      ],
                      ref: "budget",
                      staticClass: "form-control",
                      attrs: {
                        title: _vm.$t("firefly.budget"),
                        name: "budget[]"
                      },
                      on: {
                        input: _vm.handleInput,
                        change: [
                          function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.selected = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.signalChange
                        ]
                      }
                    },
                    _vm._l(this.budgets, function(cBudget) {
                      return _c(
                        "option",
                        {
                          attrs: { label: cBudget.name },
                          domProps: { value: cBudget.id }
                        },
                        [_vm._v(_vm._s(cBudget.name) + "\n      ")]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              this.budgets.length === 1
                ? _c("p", {
                    staticClass: "help-block",
                    domProps: {
                      innerHTML: _vm._s(_vm.$t("firefly.no_budget_pointer"))
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm._l(this.error, function(error) {
                return _c("ul", { staticClass: "list-unstyled" }, [
                  _c("li", { staticClass: "text-danger" }, [
                    _vm._v(_vm._s(error))
                  ])
                ])
              })
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Category.vue?vue&type=template&id=5e272311& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.category")) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "input",
              staticClass: "form-control",
              attrs: {
                autocomplete: "off",
                "data-role": "input",
                name: "category[]",
                type: "text",
                placeholder: _vm.$t("firefly.category"),
                title: _vm.$t("firefly.category")
              },
              domProps: { value: _vm.value },
              on: {
                input: _vm.handleInput,
                keypress: _vm.handleEnter,
                submit: function($event) {
                  $event.preventDefault()
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.clearCategory }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _c("typeahead", {
            ref: "typea",
            attrs: {
              "async-function": _vm.aSyncFunction,
              "open-on-empty": true,
              "open-on-focus": true,
              target: _vm.target,
              "item-key": "name"
            },
            on: { input: _vm.selectedItem },
            scopedSlots: _vm._u([
              {
                key: "item",
                fn: function(props) {
                  return _vm._l(props.items, function(item, index) {
                    return _c(
                      "li",
                      { class: { active: props.activeIndex === index } },
                      [
                        _c(
                          "a",
                          {
                            attrs: { role: "button" },
                            on: {
                              click: function($event) {
                                return props.select(item)
                              }
                            }
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.betterHighlight(item))
                              }
                            })
                          ]
                        )
                      ]
                    )
                  })
                }
              }
            ]),
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v
              },
              expression: "name"
            }
          }),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CreateTransaction.vue?vue&type=template&id=3c64c482& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "form-horizontal",
      attrs: { "accept-charset": "UTF-8", enctype: "multipart/form-data" }
    },
    [
      _c("input", { attrs: { name: "_token", type: "hidden", value: "xxx" } }),
      _vm._v(" "),
      _vm.error_message !== ""
        ? _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12" }, [
              _c(
                "div",
                {
                  staticClass: "alert alert-danger alert-dismissible",
                  attrs: { role: "alert" }
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        "data-dismiss": "alert",
                        type: "button",
                        "aria-label": _vm.$t("firefly.close")
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("??")
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("strong", [_vm._v(_vm._s(_vm.$t("firefly.flash_error")))]),
                  _vm._v(" " + _vm._s(_vm.error_message) + "\n      ")
                ]
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.success_message !== ""
        ? _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12" }, [
              _c(
                "div",
                {
                  staticClass: "alert alert-success alert-dismissible",
                  attrs: { role: "alert" }
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        "data-dismiss": "alert",
                        type: "button",
                        "aria-label": _vm.$t("firefly.close")
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("??")
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("strong", [
                    _vm._v(_vm._s(_vm.$t("firefly.flash_success")))
                  ]),
                  _vm._v(" "),
                  _c("span", {
                    domProps: { innerHTML: _vm._s(_vm.success_message) }
                  })
                ]
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        _vm._l(_vm.transactions, function(transaction, index) {
          return _c("div", { key: index, staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12" }, [
              _c("div", { staticClass: "box" }, [
                _c("div", { staticClass: "box-header with-border" }, [
                  _c("h3", { staticClass: "box-title splitTitle" }, [
                    _vm.transactions.length > 1
                      ? _c("span", [
                          _vm._v(
                            _vm._s(_vm.$t("firefly.single_split")) +
                              " " +
                              _vm._s(index + 1) +
                              " / " +
                              _vm._s(_vm.transactions.length)
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.transactions.length === 1
                      ? _c("span", [
                          _vm._v(
                            _vm._s(
                              _vm.$t("firefly.transaction_journal_information")
                            )
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "split_add_btn btn btn-default",
                        attrs: { type: "button" },
                        on: { click: _vm.addTransactionToArray }
                      },
                      [
                        _vm._v(
                          "\n                  " +
                            _vm._s(_vm.$t("firefly.add_another_split")) +
                            "\n                "
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm.transactions.length > 1
                    ? _c("div", { staticClass: "box-tools pull-right" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-xs btn-danger",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                return _vm.deleteTransaction(index, $event)
                              }
                            }
                          },
                          [_c("i", { staticClass: "fa fa-trash" })]
                        )
                      ])
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "box-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _c(
                      "div",
                      {
                        staticClass: "col-lg-12",
                        attrs: { id: "transaction-info" }
                      },
                      [
                        _c("amount", {
                          attrs: {
                            destination: transaction.destination_account,
                            error: transaction.errors.amount,
                            source: transaction.source_account,
                            transactionType: _vm.transactionType,
                            index: index
                          },
                          on: { customInput: _vm.changedAmount },
                          model: {
                            value: transaction.amount,
                            callback: function($$v) {
                              _vm.$set(transaction, "amount", $$v)
                            },
                            expression: "transaction.amount"
                          }
                        }),
                        _vm._v(" "),
                        _c("transaction-description", {
                          attrs: {
                            error: transaction.errors.description,
                            index: index
                          },
                          model: {
                            value: transaction.description,
                            callback: function($$v) {
                              _vm.$set(transaction, "description", $$v)
                            },
                            expression: "transaction.description"
                          }
                        }),
                        _vm._v(" "),
                        _c("account-select", {
                          attrs: {
                            accountName: transaction.source_account.name,
                            accountTypeFilters:
                              transaction.source_account.allowed_types,
                            defaultAccountTypeFilters:
                              transaction.source_account.default_allowed_types,
                            error: transaction.errors.source_account,
                            index: index,
                            transactionType: _vm.transactionType,
                            inputName: "source[]",
                            inputDescription: _vm.$t("firefly.source_account")
                          },
                          on: {
                            "clear:value": function($event) {
                              return _vm.clearSource(index)
                            },
                            "select:account": function($event) {
                              return _vm.selectedSourceAccount(index, $event)
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("account-select", {
                          attrs: {
                            accountName: transaction.destination_account.name,
                            accountTypeFilters:
                              transaction.destination_account.allowed_types,
                            defaultAccountTypeFilters:
                              transaction.destination_account
                                .default_allowed_types,
                            error: transaction.errors.destination_account,
                            index: index,
                            transactionType: _vm.transactionType,
                            inputName: "destination[]",
                            inputDescription: _vm.$t(
                              "firefly.destination_account"
                            )
                          },
                          on: {
                            "clear:value": function($event) {
                              return _vm.clearDestination(index)
                            },
                            "select:account": function($event) {
                              return _vm.selectedDestinationAccount(
                                index,
                                $event
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        0 !== index &&
                        (null === _vm.transactionType ||
                          "invalid" === _vm.transactionType ||
                          "" === _vm.transactionType)
                          ? _c("p", { staticClass: "text-warning" }, [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(
                                    _vm.$t(
                                      "firefly.multi_account_warning_unknown"
                                    )
                                  ) +
                                  "\n                "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        0 !== index && "Withdrawal" === _vm.transactionType
                          ? _c("p", { staticClass: "text-warning" }, [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(
                                    _vm.$t(
                                      "firefly.multi_account_warning_withdrawal"
                                    )
                                  ) +
                                  "\n                "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        0 !== index && "Deposit" === _vm.transactionType
                          ? _c("p", { staticClass: "text-warning" }, [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(
                                    _vm.$t(
                                      "firefly.multi_account_warning_deposit"
                                    )
                                  ) +
                                  "\n                "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        0 !== index && "Transfer" === _vm.transactionType
                          ? _c("p", { staticClass: "text-warning" }, [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(
                                    _vm.$t(
                                      "firefly.multi_account_warning_transfer"
                                    )
                                  ) +
                                  "\n                "
                              )
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        0 === index
                          ? _c("standard-date", {
                              attrs: {
                                error: transaction.errors.date,
                                index: index
                              },
                              model: {
                                value: transaction.date,
                                callback: function($$v) {
                                  _vm.$set(transaction, "date", $$v)
                                },
                                expression: "transaction.date"
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        index === 0
                          ? _c(
                              "div",
                              [
                                _c("transaction-type", {
                                  attrs: {
                                    destination:
                                      transaction.destination_account.type,
                                    source: transaction.source_account.type
                                  },
                                  on: {
                                    "set:transactionType": function($event) {
                                      return _vm.setTransactionType($event)
                                    },
                                    "act:limitSourceType": function($event) {
                                      return _vm.limitSourceType($event)
                                    },
                                    "act:limitDestinationType": function(
                                      $event
                                    ) {
                                      return _vm.limitDestinationType($event)
                                    }
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("category", {
                          attrs: {
                            error: transaction.errors.category,
                            transactionType: _vm.transactionType
                          },
                          model: {
                            value: transaction.category,
                            callback: function($$v) {
                              _vm.$set(transaction, "category", $$v)
                            },
                            expression: "transaction.category"
                          }
                        }),
                        _vm._v(" "),
                        _c("tags", {
                          attrs: { error: transaction.errors.tags },
                          model: {
                            value: transaction.tags,
                            callback: function($$v) {
                              _vm.$set(transaction, "tags", $$v)
                            },
                            expression: "transaction.tags"
                          }
                        }),
                        _vm._v(" "),
                        _c("custom-input", {
                          attrs: {
                            label: "Vat %",
                            placeholder: "Vat %",
                            value: "",
                            type: "number",
                            error: "",
                            index: index
                          },
                          on: { customInput: _vm.changedVat },
                          model: {
                            value: transaction.vat_percent,
                            callback: function($$v) {
                              _vm.$set(transaction, "vat_percent", $$v)
                            },
                            expression: "transaction.vat_percent"
                          }
                        }),
                        _vm._v(" "),
                        !_vm.visibleMore
                          ? _c(
                              "span",
                              {
                                staticClass: "create_transaction_see_more",
                                on: {
                                  click: function($event) {
                                    transaction.seeMore = true
                                  }
                                }
                              },
                              [_vm._v("See More")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.visibleMore
                          ? _c(
                              "span",
                              {
                                staticClass: "create_transaction_see_more",
                                on: {
                                  click: function($event) {
                                    transaction.seeMore = false
                                  }
                                }
                              },
                              [_vm._v("See Less")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        transaction.seeMore
                          ? _c(
                              "div",
                              [
                                _c("custom-input", {
                                  attrs: {
                                    value: transaction.vat,
                                    label: "Vat",
                                    placeholder: "Vat",
                                    type: "number",
                                    error: "",
                                    index: index
                                  }
                                }),
                                _vm._v(" "),
                                _c("custom-input", {
                                  attrs: {
                                    value: transaction.netto,
                                    label: "Netto",
                                    placeholder: "Netto",
                                    type: "number",
                                    error: "",
                                    index: index
                                  }
                                }),
                                _vm._v(" "),
                                _c("foreign-amount", {
                                  attrs: {
                                    destination:
                                      transaction.destination_account,
                                    error: transaction.errors.foreign_amount,
                                    source: transaction.source_account,
                                    transactionType: _vm.transactionType,
                                    title: _vm.$t("form.foreign_amount")
                                  },
                                  model: {
                                    value: transaction.foreign_amount,
                                    callback: function($$v) {
                                      _vm.$set(
                                        transaction,
                                        "foreign_amount",
                                        $$v
                                      )
                                    },
                                    expression: "transaction.foreign_amount"
                                  }
                                }),
                                _vm._v(" "),
                                _c("budget", {
                                  attrs: {
                                    error: transaction.errors.budget_id,
                                    no_budget: _vm.$t(
                                      "firefly.none_in_select_list"
                                    ),
                                    transactionType: _vm.transactionType
                                  },
                                  model: {
                                    value: transaction.budget,
                                    callback: function($$v) {
                                      _vm.$set(transaction, "budget", $$v)
                                    },
                                    expression: "transaction.budget"
                                  }
                                }),
                                _vm._v(" "),
                                _c("piggy-bank", {
                                  attrs: {
                                    error: transaction.errors.piggy_bank,
                                    no_piggy_bank: _vm.$t(
                                      "firefly.no_piggy_bank"
                                    ),
                                    transactionType: _vm.transactionType
                                  },
                                  model: {
                                    value: transaction.piggy_bank,
                                    callback: function($$v) {
                                      _vm.$set(transaction, "piggy_bank", $$v)
                                    },
                                    expression: "transaction.piggy_bank"
                                  }
                                }),
                                _vm._v(" "),
                                _c("bill", {
                                  attrs: {
                                    error: transaction.errors.bill_id,
                                    no_bill: _vm.$t(
                                      "firefly.none_in_select_list"
                                    ),
                                    transactionType: _vm.transactionType
                                  },
                                  model: {
                                    value: transaction.bill,
                                    callback: function($$v) {
                                      _vm.$set(transaction, "bill", $$v)
                                    },
                                    expression: "transaction.bill"
                                  }
                                }),
                                _vm._v(" "),
                                _c("custom-transaction-fields", {
                                  attrs: {
                                    error: transaction.errors.custom_errors
                                  },
                                  model: {
                                    value: transaction.custom_fields,
                                    callback: function($$v) {
                                      _vm.$set(
                                        transaction,
                                        "custom_fields",
                                        $$v
                                      )
                                    },
                                    expression: "transaction.custom_fields"
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  ])
                ])
              ])
            ])
          ])
        }),
        0
      ),
      _vm._v(" "),
      _vm.transactions.length > 1
        ? _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-lg-6 col-md-6 col-sm-12 col-xs-12" },
              [
                _c("div", { staticClass: "box" }, [
                  _c("div", { staticClass: "box-header with-border" }, [
                    _c("h3", { staticClass: "box-title" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.$t("firefly.split_transaction_title")) +
                          "\n          "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "box-body" },
                    [
                      _c("group-description", {
                        attrs: { error: _vm.group_title_errors },
                        model: {
                          value: _vm.group_title,
                          callback: function($$v) {
                            _vm.group_title = $$v
                          },
                          expression: "group_title"
                        }
                      })
                    ],
                    1
                  )
                ])
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-lg-6 col-md-6 col-sm-12 col-xs-12" }, [
          _c("div", { staticClass: "box" }, [
            _c("div", { staticClass: "box-header with-border" }, [
              _c("h3", { staticClass: "box-title" }, [
                _vm._v(
                  "\n            " +
                    _vm._s(_vm.$t("firefly.submission")) +
                    "\n          "
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "box-body" }, [
              _c("div", { staticClass: "checkbox" }, [
                _c("label", [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.createAnother,
                        expression: "createAnother"
                      }
                    ],
                    attrs: { name: "create_another", type: "checkbox" },
                    domProps: {
                      checked: Array.isArray(_vm.createAnother)
                        ? _vm._i(_vm.createAnother, null) > -1
                        : _vm.createAnother
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.createAnother,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.createAnother = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.createAnother = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.createAnother = $$c
                        }
                      }
                    }
                  }),
                  _vm._v(
                    "\n              " +
                      _vm._s(_vm.$t("firefly.create_another")) +
                      "\n            "
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "checkbox" }, [
                _c(
                  "label",
                  { class: { "text-muted": this.createAnother === false } },
                  [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.resetFormAfter,
                          expression: "resetFormAfter"
                        }
                      ],
                      attrs: {
                        disabled: this.createAnother === false,
                        name: "reset_form",
                        type: "checkbox"
                      },
                      domProps: {
                        checked: Array.isArray(_vm.resetFormAfter)
                          ? _vm._i(_vm.resetFormAfter, null) > -1
                          : _vm.resetFormAfter
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.resetFormAfter,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                (_vm.resetFormAfter = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.resetFormAfter = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.resetFormAfter = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(
                      "\n              " +
                        _vm._s(_vm.$t("firefly.reset_after")) +
                        "\n\n            "
                    )
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "box-footer" }, [
              _c("div", { staticClass: "btn-group" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-success",
                    attrs: { id: "submitButton" },
                    on: { click: _vm.submit }
                  },
                  [_vm._v(_vm._s(_vm.$t("firefly.submit")))]
                )
              ]),
              _vm._v(" "),
              _c("p", {
                staticClass: "text-success",
                domProps: { innerHTML: _vm._s(_vm.success_message) }
              }),
              _vm._v(" "),
              _c("p", {
                staticClass: "text-danger",
                domProps: { innerHTML: _vm._s(_vm.error_message) }
              })
            ])
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomAttachments.vue?vue&type=template&id=75bc1a7c& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "input",
              staticClass: "form-control",
              attrs: {
                name: _vm.name,
                placeholder: _vm.title,
                title: _vm.title,
                autocomplete: "off",
                multiple: "multiple",
                type: "file"
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.clearAtt }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomString.vue?vue&type=template&id=73a9dd75& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "str",
              staticClass: "form-control",
              attrs: {
                name: _vm.name,
                placeholder: _vm.title,
                title: _vm.title,
                autocomplete: "off",
                type: "text"
              },
              domProps: { value: _vm.value },
              on: { input: _vm.handleInput }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearField }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTextarea.vue?vue&type=template&id=18b655c4& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.textValue,
                expression: "textValue"
              }
            ],
            ref: "str",
            staticClass: "form-control",
            attrs: {
              name: _vm.name,
              placeholder: _vm.title,
              title: _vm.title,
              autocomplete: "off",
              rows: "8"
            },
            domProps: { value: _vm.textValue },
            on: {
              input: [
                function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.textValue = $event.target.value
                },
                _vm.handleInput
              ]
            }
          }),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomTransactionFields.vue?vue&type=template&id=0f4148fa& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("p", {
        staticClass: "help-block",
        domProps: {
          innerHTML: _vm._s(_vm.$t("firefly.hidden_fields_preferences"))
        }
      }),
      _vm._v(" "),
      this.fields.interest_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.interest_date,
              name: "interest_date[]",
              title: _vm.$t("form.interest_date")
            },
            model: {
              value: _vm.value.interest_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "interest_date", $$v)
              },
              expression: "value.interest_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.book_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.book_date,
              name: "book_date[]",
              title: _vm.$t("form.book_date")
            },
            model: {
              value: _vm.value.book_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "book_date", $$v)
              },
              expression: "value.book_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.process_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.process_date,
              name: "process_date[]",
              title: _vm.$t("form.process_date")
            },
            model: {
              value: _vm.value.process_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "process_date", $$v)
              },
              expression: "value.process_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.due_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.due_date,
              name: "due_date[]",
              title: _vm.$t("form.due_date")
            },
            model: {
              value: _vm.value.due_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "due_date", $$v)
              },
              expression: "value.due_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.payment_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.payment_date,
              name: "payment_date[]",
              title: _vm.$t("form.payment_date")
            },
            model: {
              value: _vm.value.payment_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "payment_date", $$v)
              },
              expression: "value.payment_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.invoice_date
        ? _c(_vm.dateComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.invoice_date,
              name: "invoice_date[]",
              title: _vm.$t("form.invoice_date")
            },
            model: {
              value: _vm.value.invoice_date,
              callback: function($$v) {
                _vm.$set(_vm.value, "invoice_date", $$v)
              },
              expression: "value.invoice_date"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.internal_reference
        ? _c(_vm.stringComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.internal_reference,
              name: "internal_reference[]",
              title: _vm.$t("form.internal_reference")
            },
            model: {
              value: _vm.value.internal_reference,
              callback: function($$v) {
                _vm.$set(_vm.value, "internal_reference", $$v)
              },
              expression: "value.internal_reference"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.attachments
        ? _c(_vm.attachmentComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.attachments,
              name: "attachments[]",
              title: _vm.$t("firefly.attachments")
            },
            model: {
              value: _vm.value.attachments,
              callback: function($$v) {
                _vm.$set(_vm.value, "attachments", $$v)
              },
              expression: "value.attachments"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.external_uri
        ? _c(_vm.uriComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.external_uri,
              name: "external_uri[]",
              title: _vm.$t("firefly.external_uri")
            },
            model: {
              value: _vm.value.external_uri,
              callback: function($$v) {
                _vm.$set(_vm.value, "external_uri", $$v)
              },
              expression: "value.external_uri"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      this.fields.notes
        ? _c(_vm.textareaComponent, {
            tag: "component",
            attrs: {
              error: _vm.error.notes,
              name: "notes[]",
              title: _vm.$t("firefly.notes")
            },
            model: {
              value: _vm.value.notes,
              callback: function($$v) {
                _vm.$set(_vm.value, "notes", $$v)
              },
              expression: "value.notes"
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/CustomUri.vue?vue&type=template&id=f0ff6b90& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.title) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "uri",
              staticClass: "form-control",
              attrs: {
                name: _vm.name,
                placeholder: _vm.title,
                title: _vm.title,
                autocomplete: "off",
                type: "url"
              },
              domProps: { value: _vm.value },
              on: { input: _vm.handleInput }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearField }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/ForeignAmountSelect.vue?vue&type=template&id=c4b5d0b6& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return this.enabledCurrencies.length >= 1
    ? _c(
        "div",
        { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
        [
          _c("div", { staticClass: "col-sm-8 col-sm-offset-4 text-sm" }, [
            _vm._v("\n    " + _vm._s(_vm.$t("form.foreign_amount")) + "\n  ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-4" }, [
            _c(
              "select",
              {
                ref: "currency_select",
                staticClass: "form-control",
                attrs: { name: "foreign_currency[]" },
                on: { input: _vm.handleInput }
              },
              _vm._l(this.enabledCurrencies, function(currency) {
                return _c(
                  "option",
                  {
                    attrs: { label: currency.attributes.name },
                    domProps: {
                      selected:
                        parseInt(_vm.value.currency_id) ===
                        parseInt(currency.id),
                      value: currency.id
                    }
                  },
                  [
                    _vm._v(
                      "\n        " +
                        _vm._s(currency.attributes.name) +
                        "\n      "
                    )
                  ]
                )
              }),
              0
            )
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-sm-8" },
            [
              _c("div", { staticClass: "input-group" }, [
                this.enabledCurrencies.length > 0
                  ? _c("input", {
                      ref: "amount",
                      staticClass: "form-control",
                      attrs: {
                        placeholder: this.title,
                        title: this.title,
                        autocomplete: "off",
                        name: "foreign_amount[]",
                        step: "any",
                        type: "number"
                      },
                      domProps: { value: _vm.value.amount },
                      on: { input: _vm.handleInput }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c("span", { staticClass: "input-group-btn" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default",
                      attrs: { tabIndex: "-1", type: "button" },
                      on: { click: _vm.clearAmount }
                    },
                    [_c("i", { staticClass: "fa fa-trash-o" })]
                  )
                ])
              ]),
              _vm._v(" "),
              _vm._l(this.error, function(error) {
                return _c("ul", { staticClass: "list-unstyled" }, [
                  _c("li", { staticClass: "text-danger" }, [
                    _vm._v(_vm._s(error))
                  ])
                ])
              })
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/GroupDescription.vue?vue&type=template&id=7425a390& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v(
          "\n    " + _vm._s(_vm.$t("firefly.split_transaction_title")) + "\n  "
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "descr",
              staticClass: "form-control",
              attrs: {
                autocomplete: "off",
                name: "group_title",
                type: "text",
                placeholder: _vm.$t("firefly.split_transaction_title"),
                title: _vm.$t("firefly.split_transaction_title")
              },
              domProps: { value: _vm.value },
              on: { input: _vm.handleInput }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearField }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _vm.error.length === 0
            ? _c("p", { staticClass: "help-block" }, [
                _vm._v(
                  "\n      " +
                    _vm._s(_vm.$t("firefly.split_transaction_title_help")) +
                    "\n    "
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/PiggyBank.vue?vue&type=template&id=9d63c24e& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return typeof this.transactionType !== "undefined" &&
    this.transactionType === "Transfer"
    ? _c(
        "div",
        { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
        [
          _c("div", { staticClass: "col-sm-12 text-sm" }, [
            _vm._v("\n    " + _vm._s(_vm.$t("firefly.piggy_bank")) + "\n\n  ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-sm-12" },
            [
              _c(
                "select",
                {
                  ref: "piggy",
                  staticClass: "form-control",
                  attrs: { name: "piggy_bank[]" },
                  on: { input: _vm.handleInput }
                },
                _vm._l(this.piggies, function(option, key) {
                  return _c(
                    "optgroup",
                    { attrs: { label: key } },
                    _vm._l(option.piggies, function(piggy) {
                      return _c(
                        "option",
                        {
                          attrs: { label: piggy.name_with_balance },
                          domProps: { value: piggy.id }
                        },
                        [
                          _vm._v(
                            "\n          " +
                              _vm._s(piggy.name_with_balance) +
                              "\n        "
                          )
                        ]
                      )
                    }),
                    0
                  )
                }),
                0
              ),
              _vm._v(" "),
              _vm._l(this.error, function(error) {
                return _c("ul", { staticClass: "list-unstyled" }, [
                  _c("li", { staticClass: "text-danger" }, [
                    _vm._v(_vm._s(error))
                  ])
                ])
              })
            ],
            2
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/StandardDate.vue?vue&type=template&id=73fe3e1e& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.date")) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "date",
              staticClass: "form-control",
              attrs: {
                disabled: _vm.index > 0,
                autocomplete: "off",
                name: "date[]",
                type: "date",
                placeholder: _vm.$t("firefly.date"),
                title: _vm.$t("firefly.date")
              },
              domProps: { value: _vm.value },
              on: { input: _vm.handleInput }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearDate }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/Tags.vue?vue&type=template&id=25b60a2c& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.tags")) + "\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-12" }, [
        _c(
          "div",
          { staticClass: "input-group" },
          [
            _c("vue-tags-input", {
              attrs: {
                "add-only-from-autocomplete": false,
                "autocomplete-items": _vm.autocompleteItems,
                tags: _vm.tags,
                title: _vm.$t("firefly.tags"),
                classes: "form-input",
                placeholder: _vm.$t("firefly.tags")
              },
              on: { "tags-changed": _vm.update },
              model: {
                value: _vm.tag,
                callback: function($$v) {
                  _vm.tag = $$v
                },
                expression: "tag"
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearTags }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _vm._l(this.error, function(error) {
        return _c("ul", { staticClass: "list-unstyled" }, [
          _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionDescription.vue?vue&type=template&id=540cd511& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group", class: { "has-error": _vm.hasError() } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("firefly.description")) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-12" },
        [
          _c("div", { staticClass: "input-group" }, [
            _c("input", {
              ref: "descr",
              staticClass: "form-control",
              attrs: {
                title: _vm.$t("firefly.description"),
                autocomplete: "off",
                name: "description[]",
                type: "text",
                placeholder: _vm.$t("firefly.description")
              },
              domProps: { value: _vm.value },
              on: {
                input: _vm.handleInput,
                keypress: _vm.handleEnter,
                submit: function($event) {
                  $event.preventDefault()
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-btn" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { tabIndex: "-1", type: "button" },
                  on: { click: _vm.clearDescription }
                },
                [_c("i", { staticClass: "fa fa-trash-o" })]
              )
            ])
          ]),
          _vm._v(" "),
          _c("typeahead", {
            attrs: {
              "async-function": _vm.aSyncFunction,
              "open-on-empty": true,
              "open-on-focus": true,
              target: _vm.target,
              "item-key": "description"
            },
            on: { input: _vm.selectedItem },
            scopedSlots: _vm._u([
              {
                key: "item",
                fn: function(props) {
                  return _vm._l(props.items, function(item, index) {
                    return _c(
                      "li",
                      { class: { active: props.activeIndex === index } },
                      [
                        _c(
                          "a",
                          {
                            attrs: { role: "button" },
                            on: {
                              click: function($event) {
                                return props.select(item)
                              }
                            }
                          },
                          [
                            _c("span", {
                              domProps: {
                                innerHTML: _vm._s(_vm.betterHighlight(item))
                              }
                            })
                          ]
                        )
                      ]
                    )
                  })
                }
              }
            ]),
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v
              },
              expression: "name"
            }
          }),
          _vm._v(" "),
          _vm._l(this.error, function(error) {
            return _c("ul", { staticClass: "list-unstyled" }, [
              _c("li", { staticClass: "text-danger" }, [_vm._v(_vm._s(error))])
            ])
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/transactions/TransactionType.vue?vue&type=template&id=3f0e7af5& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("div", { staticClass: "col-sm-12" }, [
      _vm.sentence !== ""
        ? _c("label", { staticClass: "control-label text-info" }, [
            _vm._v("\n      " + _vm._s(_vm.sentence) + "\n    ")
          ])
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_from":"axios@^0.21","_id":"axios@0.21.4","_inBundle":false,"_integrity":"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==","_location":"/axios","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"axios@^0.21","name":"axios","escapedName":"axios","rawSpec":"^0.21","saveSpec":null,"fetchSpec":"^0.21"},"_requiredBy":["#DEV:/"],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz","_shasum":"c67b90dc0568e5c1cf2b0b858c43ba28e2eda575","_spec":"axios@^0.21","_where":"D:\\\\working\\\\category 3\\\\Phillip\\\\firefly-iii","author":{"name":"Matt Zabriskie"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"bugs":{"url":"https://github.com/axios/axios/issues"},"bundleDependencies":false,"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"dependencies":{"follow-redirects":"^1.14.0"},"deprecated":false,"description":"Promise based HTTP client for the browser and node.js","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"homepage":"https://axios-http.com","jsdelivr":"dist/axios.min.js","keywords":["xhr","http","ajax","promise","node"],"license":"MIT","main":"index.js","name":"axios","repository":{"type":"git","url":"git+https://github.com/axios/axios.git"},"scripts":{"build":"NODE_ENV=production grunt build","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","examples":"node ./examples/server.js","fix":"eslint --fix lib/**/*.js","postversion":"git push && git push --tags","preversion":"npm test","start":"node ./sandbox/server.js","test":"grunt test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},"typings":"./index.d.ts","unpkg":"dist/axios.min.js","version":"0.21.4"}');

/***/ }),

/***/ "./resources/assets/js/locales/bg.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/bg.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"?????????? ???? ?????????????","flash_error":"????????????!","flash_success":"??????????!","close":"??????????????","split_transaction_title":"???????????????? ???? ?????????????????? ????????????????????","errors_submission":"?????????? ???????? ?????????????? ?? ???????????? ??????????. ????????, ?????????????????? ????????????????.","split":"??????????????","single_split":"????????????","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">???????????????????? #{ID}(\\"{title}\\")</a> ???????? ????????????????.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">???????????????????? #{ID}</a> ???????? ????????????????.","transaction_journal_information":"???????????????????? ???? ????????????????????","no_budget_pointer":"???????????????? ?????? ?????? ???????????? ??????????????. ???????????? ???? ?????????????????? ?????????? ???? ???????????????????? <a href=\\"budgets\\"> ?????????????? </a>. ?????????????????? ?????????? ???? ???? ???????????????? ???? ?????????????? ?????????????????? ????.","no_bill_pointer":"???????????????? ?????? ?????? ???????????? ????????????. ???????????? ???? ?????????????????? ?????????? ???? ???????????????????? <a href=\\"bills\\"> ???????????? </a>. ???????????????? ?????????? ???? ???? ???????????????? ???? ?????????????? ?????????????????? ????.","source_account":"???????????????? ????????????","hidden_fields_preferences":"???????????? ???? ???????????????????? ???????????? ?????????? ???? ???????????????????? ?????? ???????????? <a href=\\"preferences\\">??????????????????</a>.","destination_account":"???????????????? ????????????","add_another_split":"???????????????? ???? ???????? ????????????","submission":"??????????????????","create_another":"???????? ?????????????????????????? ???? ?????????????? ??????, ???? ???? ?????????????????? ????????.","reset_after":"???????????????????? ???? ?????????????????? ???????? ??????????????????","submit":"????????????????","amount":"????????","date":"????????","tags":"??????????????","no_budget":"(?????? ????????????)","no_bill":"(???????? ????????????)","category":"??????????????????","attachments":"?????????????????? ??????????????","notes":"??????????????","external_uri":"External URL","update_transaction":"???????????? ????????????????????????","after_update_create_another":"???????? ???????????????????????? ???? ?????????????? ??????, ???? ???? ???????????????????? ?? ????????????????????.","store_as_new":"?????????????????? ???????? ???????? ????????????????????, ???????????? ???? ?? ??????????????????????????.","split_title_help":"?????? ?????????????????? ?????????????????? ????????????????????, ???????????? ???? ?????? ???????????????? ???????????????? ???? ???????????? ?????????????? ???? ????????????????????????.","none_in_select_list":"(????????)","no_piggy_bank":"(?????? ??????????????)","description":"????????????????","split_transaction_title_help":"?????? ?????????????????? ?????????????????? ????????????????????, ???????????? ???? ?????? ???????????????? ???????????????? ???? ???????????? ?????????????? ???? ????????????????????????.","destination_account_reconciliation":"???? ???????? ???? ?????????????????????? ???????????????????? ???????????? ???? ???????????????????? ???? ??????????????????????.","source_account_reconciliation":"???? ???????? ???? ?????????????????????? ???????????????????? ???????????? ???? ???????????????????? ???? ??????????????????????.","budget":"????????????","bill":"????????????","you_create_withdrawal":"?????????????????? ??????????????.","you_create_transfer":"?????????????????? ??????????????????????.","you_create_deposit":"?????????????????? ??????????????.","edit":"??????????????","delete":"????????????","name":"??????","profile_whoops":"????????????!","profile_something_wrong":"???????? ???? ????????????!","profile_try_again":"???????? ???? ????????????. ????????, ???????????????? ????????????.","profile_oauth_clients":"OAuth ??????????????","profile_oauth_no_clients":"???? ?????? ?????????????? ?????????????? ???? OAuth.","profile_oauth_clients_header":"??????????????","profile_oauth_client_id":"???? (ID) ???? ????????????","profile_oauth_client_name":"??????","profile_oauth_client_secret":"??????????","profile_oauth_create_new_client":"???????????? ?????? ????????????","profile_oauth_create_client":"???????????? ????????????","profile_oauth_edit_client":"???????????????????? ????????????","profile_oauth_name_help":"????????, ?????????? ???????????? ?????????????????????? ???? ???????????????????? ?? ???? ???? ??????????????.","profile_oauth_redirect_url":"???????? ???? ??????????????????????","profile_oauth_redirect_url_help":"URL ?????????? ???? ?????????????? ?????????????????? ???? ???????????????????????? ???? ???????????? ????????????????????.","profile_authorized_apps":"???????????????????????? ????????????????????","profile_authorized_clients":"???????????????????????? ??????????????","profile_scopes":"??????????","profile_revoke":"????????????????","profile_personal_access_tokens":"???????????????????? ?????????????? ???? ????????????","profile_personal_access_token":"???????????????????? ???????????? ???? ????????????","profile_personal_access_token_explanation":"???????? ?? ?????????? ???? ???????????????????? ???????????? ???? ????????????. ???????? ?? ???????????????????????? ??????, ???????????? ???? ???????? ??????????????, ???????? ???? ???? ???? ????????????! ???????? ???????????? ???? ???????????????????? ???????? ????????????, ???? ???? ?????????????????? ???????????? ?????? API.","profile_no_personal_access_token":"???? ?????? ?????????????? ?????????????? ?????????? ?????????????? ???? ????????????.","profile_create_new_token":"???????????? ?????? ????????????","profile_create_token":"???????????? ????????????","profile_create":"????????????","profile_save_changes":"?????????????????? ???? ??????????????????","default_group_title_name":"(?????? ??????????)","piggy_bank":"??????????????","profile_oauth_client_secret_title":"?????????? ???? ??????????????","profile_oauth_client_secret_expl":"???????? ?? ???????????? ???? \\"?????????? ???? ??????????????\\". ???????? ?? ???????????????????????? ??????, ???????????? ???? ???????? ????????????????, ???????? ???? ???? ???? ????????????! ???????? ???????????? ???? ???????????????????? ???????? ????????????, ???? ???? ?????????????????? ???????????? ?????? API.","profile_oauth_confidential":"??????????????????????","profile_oauth_confidential_help":"???????????????????? ?????????????? ???? ???? ???????????????????????? ?? ??????????. ?????????????????????????? ?????????????? ?????????? ???? ???????????????????? ???????????????????????????????? ?????????? ???? ?????????????? ??????????, ?????? ???? ???? ?????????????? ???? ?????????????????????????? ????????????. ???????????????????? ????????????????????, ???????? ???????????????? ???????????????? ?????? JavaScript SPA ????????????????????, ???? ?????????? ???? ?????????? ?????????? ???? ?????????????? ??????????.","multi_account_warning_unknown":"?? ???????????????????? ???? ???????? ???? ???????????????????????? ?????????? ??????????????????, ???????????????????? ?? / ?????? ???????????????? ???????????? ???? ???????????????????? ???????????????????? ???????? ???? ???????? ?????????????????? ???? ???????? ?????????? ?? ???????????????????? ?? ?????????????? ???????????????????? ???? ????????????????????????.","multi_account_warning_withdrawal":"???????????? ??????????????, ???? ???????????????? ???????????? ???? ???????????????????? ???????????????????? ???? ???????? ???????? ?????????? ?? ???????????????????? ?? ???????????? ???????????? ???? ??????????????????.","multi_account_warning_deposit":"???????????? ??????????????, ???? ???????????????????? ???????????? ???? ???????????????????? ???????????????????? ???? ???????? ???????? ?????????? ?? ???????????????????? ?? ???????????? ???????????? ???? ????????????????.","multi_account_warning_transfer":"???????????? ??????????????, ???? ???????????????????? + ???????????????????? ???????????? ???? ???????????????????? ???????????????????? ???? ???????? ???????? ?????????? ?? ???????????????????? ?? ???????????? ???????????? ???? ??????????????????????????."},"form":{"interest_date":"?????????? ???? ??????????","book_date":"???????? ???? ????????????????????????????","process_date":"???????? ???? ??????????????????","due_date":"???????? ???? ??????????","foreign_amount":"???????? ?????? ????????????","payment_date":"???????? ???? ??????????????","invoice_date":"???????? ???? ??????????????","internal_reference":"???????????????? ????????????????????"},"config":{"html_language":"bg"}}');

/***/ }),

/***/ "./resources/assets/js/locales/cs.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/cs.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Jak to jde?","flash_error":"Chyba!","flash_success":"??sp????n?? dokon??eno!","close":"Zav????t","split_transaction_title":"Popis roz????tov??n??","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Rozd??lit","single_split":"Rozd??lit","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Informace o transakci","no_budget_pointer":"Zd?? se, ??e je??t?? nem??te ????dn?? rozpo??ty. M??li byste n??kter?? vytvo??it na <a href=\\"budgets\\">rozpo??ty</a>-. Rozpo??ty v??m mohou pomoci sledovat v??daje.","no_bill_pointer":"Zd?? se, ??e je??t?? nem??te ????dn?? ????ty. M??li byste n??kter?? vytvo??it na <a href=\\"bills\\">????tech</a>. ????ty v??m mohou pomoci sledovat v??daje.","source_account":"Zdrojov?? ????et","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"C??lov?? ????et","add_another_split":"P??idat dal???? roz????tov??n??","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Odeslat","amount":"????stka","date":"Datum","tags":"??t??tky","no_budget":"(????dn?? rozpo??et)","no_bill":"(no bill)","category":"Kategorie","attachments":"P????lohy","notes":"Pozn??mky","external_uri":"Extern?? URL","update_transaction":"Aktualizovat transakci","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"Pokud vytvo????te roz????tov??n??, je t??eba, aby zde byl celkov?? popis pro v??echna roz????tov??n?? dan?? transakce.","none_in_select_list":"(????dn??)","no_piggy_bank":"(????dn?? pokladni??ka)","description":"Popis","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"C??lov?? ????et odsouhlasen?? transakce nelze upravit.","source_account_reconciliation":"Nem????ete upravovat zdrojov?? ????et srovn??vac?? transakce.","budget":"Rozpo??et","bill":"????et","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Upravit","delete":"Odstranit","name":"N??zev","profile_whoops":"Omlouv??me se, tohle n??jak nefunguje","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"Zat??m jste nevytvo??ili OAuth klienty.","profile_oauth_clients_header":"Klienti","profile_oauth_client_id":"ID z??kazn??ka","profile_oauth_client_name":"Jm??no","profile_oauth_client_secret":"Tajn?? kl????","profile_oauth_create_new_client":"Vytvo??it nov??ho klienta","profile_oauth_create_client":"Vytvo??it klienta","profile_oauth_edit_client":"Upravit klienta","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"P??esm??rovat URL adresu","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Autorizovan?? klienti","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Vytvo??it nov?? token","profile_create_token":"Vytvo??it token","profile_create":"Vytvo??it","profile_save_changes":"Ulo??it zm??ny","default_group_title_name":"(ungrouped)","piggy_bank":"Pokladni??ka","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"??rokov?? datum","book_date":"Datum rezervace","process_date":"Datum zpracov??n??","due_date":"Datum splatnosti","foreign_amount":"????stka v ciz?? m??n??","payment_date":"Datum zaplacen??","invoice_date":"Datum vystaven??","internal_reference":"Intern?? reference"},"config":{"html_language":"cs"}}');

/***/ }),

/***/ "./resources/assets/js/locales/de.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/de.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"??berblick","flash_error":"Fehler!","flash_success":"Geschafft!","close":"Schlie??en","split_transaction_title":"Beschreibung der Splittbuchung","errors_submission":"Ihre ??bermittlung ist fehlgeschlagen. Bitte ??berpr??fen Sie die Fehler.","split":"Teilen","single_split":"Teil","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Buchung #{ID} (\\"{title}\\")</a> wurde gespeichert.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Die Buchung #{ID}</a> (\\"{title}\\") wurde aktualisiert.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Buchung #{ID}</a> wurde gespeichert.","transaction_journal_information":"Transaktionsinformationen","no_budget_pointer":"Sie scheinen noch keine Kostenrahmen festgelegt zu haben. Sie sollten einige davon auf der Seite <a href=\\"budgets\\">Kostenrahmen</a>- anlegen. Kostenrahmen k??nnen Ihnen dabei helfen, den ??berblick ??ber die Ausgaben zu behalten.","no_bill_pointer":"Sie scheinen noch keine Rechnungen zu haben. Sie sollten einige auf der Seite <a href=\\"bills\\">Rechnungen</a> erstellen. Anhand der Rechnungen k??nnen Sie den ??berblick ??ber Ihre Ausgaben behalten.","source_account":"Quellkonto","hidden_fields_preferences":"Sie k??nnen weitere Buchungsoptionen in Ihren <a href=\\"preferences\\">Einstellungen</a> aktivieren.","destination_account":"Zielkonto","add_another_split":"Eine weitere Aufteilung hinzuf??gen","submission":"??bermittlung","create_another":"Nach dem Speichern hierher zur??ckkehren, um ein weiteres zu erstellen.","reset_after":"Formular nach der ??bermittlung zur??cksetzen","submit":"Absenden","amount":"Betrag","date":"Datum","tags":"Schlagw??rter","no_budget":"(kein Budget)","no_bill":"(keine Belege)","category":"Kategorie","attachments":"Anh??nge","notes":"Notizen","external_uri":"Externe URL","update_transaction":"Buchung aktualisieren","after_update_create_another":"Nach dem Aktualisieren hierher zur??ckkehren, um weiter zu bearbeiten.","store_as_new":"Als neue Buchung speichern statt zu aktualisieren.","split_title_help":"Wenn Sie eine Splittbuchung anlegen, muss es eine eindeutige Beschreibung f??r alle Aufteilungen der Buchhaltung geben.","none_in_select_list":"(Keine)","no_piggy_bank":"(kein Sparschwein)","description":"Beschreibung","split_transaction_title_help":"Wenn Sie eine Splittbuchung anlegen, muss es eine eindeutige Beschreibung f??r alle Aufteilungen der Buchung geben.","destination_account_reconciliation":"Sie k??nnen das Zielkonto einer Kontenausgleichsbuchung nicht bearbeiten.","source_account_reconciliation":"Sie k??nnen das Quellkonto einer Kontenausgleichsbuchung nicht bearbeiten.","budget":"Budget","bill":"Rechnung","you_create_withdrawal":"Sie haben eine Auszahlung erstellt.","you_create_transfer":"Sie haben eine Buchung erstellt.","you_create_deposit":"Sie haben eine Einzahlung erstellt.","edit":"Bearbeiten","delete":"L??schen","name":"Name","profile_whoops":"Huch!","profile_something_wrong":"Ein Problem ist aufgetreten!","profile_try_again":"Ein Problem ist aufgetreten. Bitte versuchen Sie es erneut.","profile_oauth_clients":"OAuth-Clients","profile_oauth_no_clients":"Sie haben noch keine OAuth-Clients erstellt.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client-ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Geheimnis","profile_oauth_create_new_client":"Neuen Client erstellen","profile_oauth_create_client":"Client erstellen","profile_oauth_edit_client":"Client bearbeiten","profile_oauth_name_help":"Etwas das Ihre Nutzer erkennen und dem sie vertrauen.","profile_oauth_redirect_url":"Weiterleitungs-URL","profile_oauth_redirect_url_help":"Die Authorisierungs-Callback-URL Ihrer Anwendung.","profile_authorized_apps":"Autorisierte Anwendungen","profile_authorized_clients":"Autorisierte Clients","profile_scopes":"Bereiche","profile_revoke":"Widerrufen","profile_personal_access_tokens":"Pers??nliche Zugangs-Tokens","profile_personal_access_token":"Pers??nlicher Zugangs-Token","profile_personal_access_token_explanation":"Hier ist Ihr neuer pers??nlicher Zugangsschl??ssel. Dies ist das einzige Mal, dass er angezeigt wird, also verlieren Sie ihn nicht! Sie k??nnen diesen Token jetzt verwenden, um API-Anfragen zu stellen.","profile_no_personal_access_token":"Sie haben keine pers??nlichen Zugangsschl??ssel erstellt.","profile_create_new_token":"Neuen Schl??ssel erstellen","profile_create_token":"Schl??ssel erstellen","profile_create":"Erstellen","profile_save_changes":"??nderungen speichern","default_group_title_name":"(ohne Gruppierung)","piggy_bank":"Sparschwein","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Hier ist Ihr neuer pers??nlicher Zugangsschl??ssel. Dies ist das einzige Mal, dass er angezeigt wird, also verlieren Sie ihn nicht! Sie k??nnen diesen Token jetzt verwenden, um API-Anfragen zu stellen.","profile_oauth_confidential":"Vertraulich","profile_oauth_confidential_help":"Der Client muss sich mit einem Secret authentifizieren. Vertrauliche Clients k??nnen die Anmeldedaten speichern, ohne diese unautorisierten Akteuren mitzuteilen. ??ffentliche Anwendungen wie native Desktop- oder JavaScript-SPA-Anwendungen k??nnen Geheimnisse nicht sicher speichern.","multi_account_warning_unknown":"Abh??ngig von der Art der Buchung, die Sie anlegen, kann das Quell- und/oder Zielkonto nachfolgender Aufteilungen durch das ??berschrieben werden, was in der ersten Aufteilung der Buchung definiert wurde.","multi_account_warning_withdrawal":"Bedenken Sie, dass das Quellkonto nachfolgender Aufteilungen von dem, was in der ersten Aufteilung der Abhebung definiert ist, au??er Kraft gesetzt wird.","multi_account_warning_deposit":"Bedenken Sie, dass das Zielkonto nachfolgender Aufteilungen von dem, was in der ersten Aufteilung der Einzahlung definiert ist, au??er Kraft gesetzt wird.","multi_account_warning_transfer":"Bedenken Sie, dass das Quell- und Zielkonto nachfolgender Aufteilungen durch das, was in der ersten Aufteilung der ??bertragung definiert ist, au??er Kraft gesetzt wird."},"form":{"interest_date":"Zinstermin","book_date":"Buchungsdatum","process_date":"Bearbeitungsdatum","due_date":"F??lligkeitstermin","foreign_amount":"Ausl??ndischer Betrag","payment_date":"Zahlungsdatum","invoice_date":"Rechnungsdatum","internal_reference":"Interner Verweis"},"config":{"html_language":"de"}}');

/***/ }),

/***/ "./resources/assets/js/locales/el.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/el.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"???? ????????????;","flash_error":"????????????!","flash_success":"????????????????!","close":"????????????????","split_transaction_title":"?????????????????? ?????? ???????????????????? ???? ????????????????????","errors_submission":"???????????? ???????????? ?????????? ???? ?????? ?????????????? ??????. ???????????????? ?????????????? ???? ????????????????.","split":"??????????????????????","single_split":"??????????????????????","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">?? ?????????????????? #{ID} (\\"{title}\\")</a> ???????? ??????????????????????.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">?? ?????????????????? #{ID}</a> (\\"{title}\\") ???????? ????????????????????.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">?? ?????????????????? #{ID}</a> ???????? ??????????????????????.","transaction_journal_information":"?????????????????????? ????????????????????","no_budget_pointer":"???????????????? ?????? ?????? ?????????? ???????????? ?????????????????????????????? ??????????. ???????????? ???? ?????????????????????????? ?????????????? ?????? ???????????? <a href=\\"budgets\\">????????????????????????????</a>. ???? ???????????????????????????? ?????? ?????????????? ???? ???????????????????? ?????? ?????????????? ??????.","no_bill_pointer":"???????????????? ?????? ?????? ?????????? ???????????? ?????????? ?????????? ??????????. ???????????? ???? ?????????????????????????? ???????????? ?????? ???????????? <a href=\\"bills\\">???????????? ????????????</a>. ???? ?????????? ?????????? ?????? ?????????????? ???? ???????????????????? ?????? ?????????????? ??????.","source_account":"?????????????????????? ????????????????????","hidden_fields_preferences":"???????????????? ???? ???????????????????????????? ???????????????????????? ???????????????? ???????????????????? ???????? <a href=\\"/preferences\\">??????????????????????</a>.","destination_account":"?????????????????????? ????????????????????","add_another_split":"???????????????? ???????? ?????????? ??????????????????????","submission":"??????????????","create_another":"???????? ?????? ????????????????????, ???????????????????? ?????? ?????? ???? ?????????????????????????? ?????????? ??????.","reset_after":"?????????????????? ???????????? ???????? ?????? ??????????????","submit":"??????????????","amount":"????????","date":"????????????????????","tags":"????????????????","no_budget":"(?????????? ??????????????????????????)","no_bill":"(?????????? ?????????? ??????????)","category":"??????????????????","attachments":"??????????????????","notes":"????????????????????","external_uri":"?????????????????? URL","update_transaction":"?????????????????? ????????????????????","after_update_create_another":"???????? ?????? ??????????????????, ???????????????????? ?????? ?????? ???? ???????????????????? ?????? ??????????????????????.","store_as_new":"???????????????????? ???? ?????? ?????????????????? ???????? ?????? ??????????????????.","split_title_help":"?????? ?????????????????????????? ?????? ???????????????????????? ??????????????????, ???????????? ???? ?????????????? ?????? ???????????????? ?????????????????? ?????? ?????????? ???????? ???????????????????????? ?????? ????????????????????.","none_in_select_list":"(????????????)","no_piggy_bank":"(?????????? ????????????????)","description":"??????????????????","split_transaction_title_help":"?????? ?????????????????????????? ?????? ???????????????????????? ??????????????????, ???????????? ???? ?????????????? ?????? ???????????????? ?????????????????? ?????? ?????????? ???????? ???????????????????????? ?????? ????????????????????.","destination_account_reconciliation":"?????? ???????????????? ???? ?????????????????????????? ?????? ???????????????????? ???????????????????? ???? ?????? ?????????????????? ????????????????????????.","source_account_reconciliation":"?????? ???????????????? ???? ?????????????????????????? ?????? ???????????????????? ???????????????????? ???? ?????? ?????????????????? ????????????????????????.","budget":"????????????????????????????","bill":"?????????? ??????????","you_create_withdrawal":"???????????????????????? ?????? ??????????????.","you_create_transfer":"???????????????????????? ?????? ????????????????.","you_create_deposit":"???????????????????????? ?????? ????????????????.","edit":"??????????????????????","delete":"????????????????","name":"??????????","profile_whoops":"????????!","profile_something_wrong":"???????? ???????? ????????????!","profile_try_again":"???????? ???????? ????????????. ???????????????? ?????????????????????? ????????.","profile_oauth_clients":"?????????????? OAuth","profile_oauth_no_clients":"?????? ?????????? ???????????????????????? ?????????????? OAuth.","profile_oauth_clients_header":"??????????????","profile_oauth_client_id":"?????????????????????????? ????????????","profile_oauth_client_name":"??????????","profile_oauth_client_secret":"??????????????","profile_oauth_create_new_client":"???????????????????? ???????? ????????????","profile_oauth_create_client":"???????????????????? ????????????","profile_oauth_edit_client":"?????????????????????? ????????????","profile_oauth_name_help":"???????? ?????? ???? ?????????????? ?????? ???? ???????????????????????? ?????? ???? ??????????????????????????.","profile_oauth_redirect_url":"URL ????????????????????????????","profile_oauth_redirect_url_help":"To authorization callback URL ?????? ?????????????????? ??????.","profile_authorized_apps":"???????????????????????????????? ??????????????????","profile_authorized_clients":"???????????????????????????????? ??????????????","profile_scopes":"?????????? ??????????????????","profile_revoke":"????????????????","profile_personal_access_tokens":"???????????????????? ???????????????????? ??????????????????","profile_personal_access_token":"???????????????????? ???????????????????? ??????????????????","profile_personal_access_token_explanation":"?????? ?????????? ???? ?????? ???????????????????? ???????????????????? ??????????????????. ???????? ?????????? ?? ???????? ???????? ?????? ???? ????????????????????, ?????????? ???? ???? ????????????! ???????????????? ???? ???????????????????????????? ???????? ???? ???????????????????? ?????? ???? ???????????? ?????????????? API.","profile_no_personal_access_token":"?????? ?????????? ???????????????????????? ?????????????????? ???????????????????? ??????????????????.","profile_create_new_token":"???????????????????? ???????? ??????????????????????","profile_create_token":"???????????????????? ??????????????????????","profile_create":"????????????????????","profile_save_changes":"???????????????????? ??????????????","default_group_title_name":"(?????????? ??????????)","piggy_bank":"??????????????????","profile_oauth_client_secret_title":"?????????????? ????????????","profile_oauth_client_secret_expl":"?????? ?????????? ???? ?????? ?????? ?????????????? ????????????. ???????? ?????????? ?? ???????? ???????? ?????? ???? ?????? ????????????????????, ?????????? ?????? ???? ????????????! ???????????????? ???? ???? ???????????????????????????? ?????? ???? ???????????? ???????????????? API.","profile_oauth_confidential":"????????????????????????","profile_oauth_confidential_help":"?????????????????? ?????? ???? ?????????????????? ???????????? ???? ?????????????????????????????? ???????????? ???????????????????? ???? ?????? ??????????????. ???? ???????????????? ?????????????? ?????????????? ???? ?????????????????? ???????????????????????????? ???? ???????????? ?????????? ?????????? ???? ???? ???????????????? ???? ???? ?????????????????????????????? ????????. ???? ???????????????? ??????????????????, ???????? ???? ???????????????? ?????????????????? ?????? ?????????????????????????? ?????????????????????? ?? JavaScript SPA, ?????? ?????????????? ???? ?????????????????? ?????????????? ???? ????????????????.","multi_account_warning_unknown":"?????????????? ???? ?????? ???????? ?????? ???????????????????? ?????? ????????????????????????, ?? ?????????????????????? ???????????????????? ??/?????? ???????????????????? ?????? ???????????????? ?????????????????????? ?????????????????? ???? ?????????????????????? ?????? ???????? ?????? ???????????????? ?????? ?????????? ???????????????????? ?????? ????????????????????.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"???????????????????? ????????????????","book_date":"???????????????????? ????????????????","process_date":"???????????????????? ????????????????????????","due_date":"???????????????????? ????????????????????","foreign_amount":"???????? ???? ???????? ??????????????","payment_date":"???????????????????? ????????????????","invoice_date":"???????????????????? ??????????????????????","internal_reference":"?????????????????? ??????????????"},"config":{"html_language":"el"}}');

/***/ }),

/***/ "./resources/assets/js/locales/en-gb.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/en-gb.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"Error!","flash_success":"Success!","close":"Close","split_transaction_title":"Description of the split transaction","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Split","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Transaction information","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","add_another_split":"Add another split","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Submit","amount":"Amount","date":"Date","tags":"Tags","no_budget":"(no budget)","no_bill":"(no bill)","category":"Category","attachments":"Attachments","notes":"Notes","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","none_in_select_list":"(none)","no_piggy_bank":"(no piggy bank)","description":"Description","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"Budget","bill":"Bill","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Edit","delete":"Delete","name":"Name","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"Piggy bank","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Interest date","book_date":"Book date","process_date":"Processing date","due_date":"Due date","foreign_amount":"Foreign amount","payment_date":"Payment date","invoice_date":"Invoice date","internal_reference":"Internal reference"},"config":{"html_language":"en-gb"}}');

/***/ }),

/***/ "./resources/assets/js/locales/en.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/en.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"Error!","flash_success":"Success!","close":"Close","split_transaction_title":"Description of the split transaction","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Split","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Transaction information","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","diposit_account":"Deposit Account","add_another_split":"Add another split","create_apartment ":"Create Apartment","edit_apartment ":"Edit Apartment","create_warning":"Create Warning","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Submit","amount":"Amount","date":"Date","tags":"Tags","no_budget":"(no budget)","no_bill":"(no bill)","category":"Category","attachments":"Attachments","notes":"Notes","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","none_in_select_list":"(none)","no_piggy_bank":"(no piggy bank)","description":"Description","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"Budget","bill":"Bill","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Edit","delete":"Delete","name":"Name","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"Piggy bank","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer.","renter_name":"Renter Name","actions":"Actions","apt":"Apt","utilities":"Utilities","raw_rent":"Raw Rent","utilities_total":"Utilities Total","vat%":"Vat %","total_rent":"Total Rent","deposit_account":"Deposit Account","paid_rent":"Paid Rent","jan":"Jan","feb":"Feb","mar":"Mar","apr":"Apr","may":"May","jun":"Jun","jul":"Jul","aug":"Aug","sep":"Sep","oct":"Oct","nov":"Nov","dec":"Dec","add_new_apartment":"Add New Apartment","expense_account":"Expense Account"},"form":{"interest_date":"Interest date","book_date":"Book date","process_date":"Processing date","due_date":"Due date","foreign_amount":"Foreign amount","payment_date":"Payment date","invoice_date":"Invoice date","internal_reference":"Internal reference"},"config":{"html_language":"en"}}');

/***/ }),

/***/ "./resources/assets/js/locales/es.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/es.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"??Qu?? est?? pasando?","flash_error":"??Error!","flash_success":"??Operaci??n correcta!","close":"Cerrar","split_transaction_title":"Descripci??n de la transacci??n dividida","errors_submission":"Hubo un problema con su env??o. Por favor, compruebe los errores.","split":"Separar","single_split":"Divisi??n","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">La transacci??n #{ID} (\\"{title}\\")</a> ha sido almacenada.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">La transacci??n #{ID}</a> (\\"{title}\\") ha sido actualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">La transacci??n #{ID}</a> ha sido guardada.","transaction_journal_information":"Informaci??n de transacci??n","no_budget_pointer":"Parece que a??n no tienes presupuestos. Debes crear algunos en la p??gina <a href=\\"budgets\\">presupuestos</a>. Los presupuestos pueden ayudarle a realizar un seguimiento de los gastos.","no_bill_pointer":"Parece que a??n no tienes facturas. Deber??as crear algunas en la p??gina de <a href=\\"bills\\">facturas</a>. Las facturas pueden ayudarte a llevar un seguimiento de los gastos.","source_account":"Cuenta origen","hidden_fields_preferences":"Puede habilitar m??s opciones de transacci??n en sus <a href=\\"preferences\\">ajustes </a>.","destination_account":"Cuenta destino","add_another_split":"A??adir otra divisi??n","submission":"Env??o","create_another":"Despu??s de guardar, vuelve aqu?? para crear otro.","reset_after":"Restablecer formulario despu??s del env??o","submit":"Enviar","amount":"Cantidad","date":"Fecha","tags":"Etiquetas","no_budget":"(sin presupuesto)","no_bill":"(sin factura)","category":"Categoria","attachments":"Archivos adjuntos","notes":"Notas","external_uri":"URL externa","update_transaction":"Actualizar transacci??n","after_update_create_another":"Despu??s de actualizar, vuelve aqu?? para continuar editando.","store_as_new":"Almacenar como una nueva transacci??n en lugar de actualizar.","split_title_help":"Si crea una transacci??n dividida, debe haber una descripci??n global para todos los fragmentos de la transacci??n.","none_in_select_list":"(ninguno)","no_piggy_bank":"(sin hucha)","description":"Descripci??n","split_transaction_title_help":"Si crea una transacci??n dividida, debe existir una descripci??n global para todas las divisiones de la transacci??n.","destination_account_reconciliation":"No puedes editar la cuenta de destino de una transacci??n de reconciliaci??n.","source_account_reconciliation":"No puedes editar la cuenta de origen de una transacci??n de reconciliaci??n.","budget":"Presupuesto","bill":"Factura","you_create_withdrawal":"Est?? creando un retiro.","you_create_transfer":"Est?? creando una transferencia.","you_create_deposit":"Est?? creando un dep??sito.","edit":"Editar","delete":"Eliminar","name":"Nombre","profile_whoops":"??Ups!","profile_something_wrong":"??Algo sali?? mal!","profile_try_again":"Algo sali?? mal. Por favor, vuelva a intentarlo.","profile_oauth_clients":"Clientes de OAuth","profile_oauth_no_clients":"No ha creado ning??n cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID del cliente","profile_oauth_client_name":"Nombre","profile_oauth_client_secret":"Secreto","profile_oauth_create_new_client":"Crear un Nuevo Cliente","profile_oauth_create_client":"Crear Cliente","profile_oauth_edit_client":"Editar Cliente","profile_oauth_name_help":"Algo que sus usuarios reconocer??n y confiar??n.","profile_oauth_redirect_url":"Redirigir URL","profile_oauth_redirect_url_help":"La URL de devoluci??n de autorizaci??n de su aplicaci??n.","profile_authorized_apps":"Aplicaciones autorizadas","profile_authorized_clients":"Clientes autorizados","profile_scopes":"??mbitos","profile_revoke":"Revocar","profile_personal_access_tokens":"Tokens de acceso personal","profile_personal_access_token":"Token de acceso personal","profile_personal_access_token_explanation":"Aqu?? est?? su nuevo token de acceso personal. Esta es la ??nica vez que se mostrar?? as?? que ??no lo pierda! Ahora puede usar este token para hacer solicitudes de la API.","profile_no_personal_access_token":"No ha creado ning??n token de acceso personal.","profile_create_new_token":"Crear nuevo token","profile_create_token":"Crear token","profile_create":"Crear","profile_save_changes":"Guardar cambios","default_group_title_name":"(sin agrupaci??n)","piggy_bank":"Hucha","profile_oauth_client_secret_title":"Secreto del Cliente","profile_oauth_client_secret_expl":"Aqu?? est?? su nuevo secreto de cliente. Esta es la ??nica vez que se mostrar?? as?? que no lo pierda! Ahora puede usar este secreto para hacer solicitudes de API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Requerir que el cliente se autentifique con un secreto. Los clientes confidenciales pueden mantener las credenciales de forma segura sin exponerlas a partes no autorizadas. Las aplicaciones p??blicas, como aplicaciones de escritorio nativo o SPA de JavaScript, no pueden guardar secretos de forma segura.","multi_account_warning_unknown":"Dependiendo del tipo de transacci??n que cree, la cuenta de origen y/o destino de divisiones posteriores puede ser anulada por lo que se define en la primera divisi??n de la transacci??n.","multi_account_warning_withdrawal":"Tenga en cuenta que la cuenta de origen de las divisiones posteriores ser?? anulada por lo que se defina en la primera divisi??n del retiro.","multi_account_warning_deposit":"Tenga en cuenta que la cuenta de destino de las divisiones posteriores ser?? anulada por lo que se defina en la primera divisi??n del retiro.","multi_account_warning_transfer":"Tenga en cuenta que la cuenta de origen + destino de divisiones posteriores ser?? anulada por lo que se defina en la primera divisi??n de la transferencia."},"form":{"interest_date":"Fecha de inter??s","book_date":"Fecha de registro","process_date":"Fecha de procesamiento","due_date":"Fecha de vencimiento","foreign_amount":"Cantidad extranjera","payment_date":"Fecha de pago","invoice_date":"Fecha de la factura","internal_reference":"Referencia interna"},"config":{"html_language":"es"}}');

/***/ }),

/***/ "./resources/assets/js/locales/fi.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/fi.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Mit?? kuuluu?","flash_error":"Virhe!","flash_success":"Valmista tuli!","close":"Sulje","split_transaction_title":"Jaetun tapahtuman kuvaus","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Jaa","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Tapahtumatiedot","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"L??hdetili","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Kohdetili","add_another_split":"Lis???? tapahtumaan uusi osa","submission":"Vahvistus","create_another":"Tallennuksen j??lkeen, palaa takaisin luomaan uusi tapahtuma.","reset_after":"Tyhjenn?? lomake l??hetyksen j??lkeen","submit":"Vahvista","amount":"Summa","date":"P??iv??m????r??","tags":"T??git","no_budget":"(ei budjettia)","no_bill":"(no bill)","category":"Kategoria","attachments":"Liitteet","notes":"Muistiinpanot","external_uri":"External URL","update_transaction":"P??ivit?? tapahtuma","after_update_create_another":"P??ivityksen j??lkeen, palaa takaisin jatkamaan muokkausta.","store_as_new":"Tallenna uutena tapahtumana p??ivityksen sijaan.","split_title_help":"Jos luot jaetun tapahtuman, kokonaisuudelle tarvitaan nimi.","none_in_select_list":"(ei mit????n)","no_piggy_bank":"(ei s????st??possu)","description":"Kuvaus","split_transaction_title_help":"Jos luot jaetun tapahtuman, kokonaisuudelle tarvitaan nimi.","destination_account_reconciliation":"Et voi muokata t??sm??ytystapahtuman kohdetili??.","source_account_reconciliation":"Et voi muokata t??sm??ytystapahtuman l??hdetili??.","budget":"Budjetti","bill":"Lasku","you_create_withdrawal":"Olet luomassa nostoa.","you_create_transfer":"Olet luomassa siirtoa.","you_create_deposit":"Olet luomassa talletusta.","edit":"Muokkaa","delete":"Poista","name":"Nimi","profile_whoops":"Hupsis!","profile_something_wrong":"Jokin meni vikaan!","profile_try_again":"Jokin meni vikaan. Yrit?? uudelleen.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Asiakasohjelmat","profile_oauth_client_id":"Asiakastunnus","profile_oauth_client_name":"Nimi","profile_oauth_client_secret":"Salaisuus","profile_oauth_create_new_client":"Luo Uusi Asiakas","profile_oauth_create_client":"Luo Asiakas","profile_oauth_edit_client":"Muokkaa asiakasta","profile_oauth_name_help":"Jotain k??ytt??jillesi tuttua ja luotettavaa.","profile_oauth_redirect_url":"URL:n uudelleenohjaus","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Peruuta","profile_personal_access_tokens":"Henkil??kohtaiset K??ytt??oikeuskoodit","profile_personal_access_token":"Henkil??kohtainen K??ytt??oikeuskoodi","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Luo uusi tunnus","profile_create_token":"Luo tunnus","profile_create":"Luo","profile_save_changes":"Tallenna muutokset","default_group_title_name":"(ryhmittelem??tt??m??t)","piggy_bank":"S????st??possu","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Korkop??iv??","book_date":"Kirjausp??iv??","process_date":"K??sittelyp??iv??","due_date":"Er??p??iv??","foreign_amount":"Ulkomaan summa","payment_date":"Maksup??iv??","invoice_date":"Laskun p??iv??m????r??","internal_reference":"Sis??inen viite"},"config":{"html_language":"fi"}}');

/***/ }),

/***/ "./resources/assets/js/locales/fr.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/fr.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Quoi de neuf ?","flash_error":"Erreur !","flash_success":"Super !","close":"Fermer","split_transaction_title":"Description de l\'op??ration ventil??e","errors_submission":"Certaines informations ne sont pas correctes dans votre formulaire. Veuillez v??rifier les erreurs.","split":"Ventiler","single_split":"Ventilation","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">L\'op??ration n??{ID} (\\"{title}\\")</a> a ??t?? enregistr??e.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">L\'op??ration n??{ID}</a> (\\"{title}\\") a ??t?? mise ?? jour.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">L\'op??ration n??{ID}</a> a ??t?? enregistr??e.","transaction_journal_information":"Informations sur l\'op??ration","no_budget_pointer":"Vous semblez n???avoir encore aucun budget. Vous devriez en cr??er un sur la page des <a href=\\"budgets\\">budgets</a>. Les budgets peuvent vous aider ?? garder une trace des d??penses.","no_bill_pointer":"Vous semblez n\'avoir encore aucune facture. Vous devriez en cr??er une sur la page <a href=\\"bills\\">factures</a>-. Les factures peuvent vous aider ?? garder une trace des d??penses.","source_account":"Compte source","hidden_fields_preferences":"Vous pouvez activer plus d\'options d\'op??rations dans vos <a href=\\"preferences\\">param??tres</a>.","destination_account":"Compte de destination","add_another_split":"Ajouter une autre fraction","submission":"Soumission","create_another":"Apr??s enregistrement, revenir ici pour en cr??er un nouveau.","reset_after":"R??initialiser le formulaire apr??s soumission","submit":"Soumettre","amount":"Montant","date":"Date","tags":"Tags","no_budget":"(pas de budget)","no_bill":"(aucune facture)","category":"Cat??gorie","attachments":"Pi??ces jointes","notes":"Notes","external_uri":"URL externe","update_transaction":"Mettre ?? jour l\'op??ration","after_update_create_another":"Apr??s la mise ?? jour, revenir ici pour continuer l\'??dition.","store_as_new":"Enregistrer comme une nouvelle op??ration au lieu de mettre ?? jour.","split_title_help":"Si vous cr??ez une op??ration ventil??e, il doit y avoir une description globale pour chaque fractions de l\'op??ration.","none_in_select_list":"(aucun)","no_piggy_bank":"(aucune tirelire)","description":"Description","split_transaction_title_help":"Si vous cr??ez une op??ration ventil??e, il doit y avoir une description globale pour chaque fraction de l\'op??ration.","destination_account_reconciliation":"Vous ne pouvez pas modifier le compte de destination d\'une op??ration de rapprochement.","source_account_reconciliation":"Vous ne pouvez pas modifier le compte source d\'une op??ration de rapprochement.","budget":"Budget","bill":"Facture","you_create_withdrawal":"Vous saisissez une d??pense.","you_create_transfer":"Vous saisissez un transfert.","you_create_deposit":"Vous saisissez un d??p??t.","edit":"Modifier","delete":"Supprimer","name":"Nom","profile_whoops":"Oups !","profile_something_wrong":"Une erreur s\'est produite !","profile_try_again":"Une erreur s???est produite. Merci d???essayer ?? nouveau.","profile_oauth_clients":"Clients OAuth","profile_oauth_no_clients":"Vous n???avez pas encore cr???? de client OAuth.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Identifiant","profile_oauth_client_name":"Nom","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Cr??er un nouveau client","profile_oauth_create_client":"Cr??er un client","profile_oauth_edit_client":"Modifier le client","profile_oauth_name_help":"Quelque chose que vos utilisateurs reconna??tront et qui inspirera confiance.","profile_oauth_redirect_url":"URL de redirection","profile_oauth_redirect_url_help":"URL de callback de votre application.","profile_authorized_apps":"Applications autoris??es","profile_authorized_clients":"Clients autoris??s","profile_scopes":"Permissions","profile_revoke":"R??voquer","profile_personal_access_tokens":"Jetons d\'acc??s personnels","profile_personal_access_token":"Jeton d\'acc??s personnel","profile_personal_access_token_explanation":"Voici votre nouveau jeton d???acc??s personnel. Ceci est la seule fois o?? vous pourrez le voir, ne le perdez pas ! Vous pouvez d??s ?? pr??sent utiliser ce jeton pour lancer des requ??tes avec l???API.","profile_no_personal_access_token":"Vous n???avez pas encore cr???? de jeton d???acc??s personnel.","profile_create_new_token":"Cr??er un nouveau jeton","profile_create_token":"Cr??er un jeton","profile_create":"Cr??er","profile_save_changes":"Enregistrer les modifications","default_group_title_name":"(Sans groupement)","piggy_bank":"Tirelire","profile_oauth_client_secret_title":"Secret du client","profile_oauth_client_secret_expl":"Voici votre nouveau secret de client. C\'est la seule fois qu\'il sera affich??, donc ne le perdez pas ! Vous pouvez maintenant utiliser ce secret pour faire des requ??tes d\'API.","profile_oauth_confidential":"Confidentiel","profile_oauth_confidential_help":"Exiger que le client s\'authentifie avec un secret. Les clients confidentiels peuvent d??tenir des informations d\'identification de mani??re s??curis??e sans les exposer ?? des tiers non autoris??s. Les applications publiques, telles que les applications de bureau natif ou les SPA JavaScript, ne peuvent pas tenir des secrets en toute s??curit??.","multi_account_warning_unknown":"Selon le type d\'op??ration que vous cr??ez, le(s) compte(s) source et/ou de destination des ventilations suivantes peuvent ??tre remplac??s par celui de la premi??re ventilation de l\'op??ration.","multi_account_warning_withdrawal":"Gardez en t??te que le compte source des ventilations suivantes peut ??tre remplac?? par celui de la premi??re ventilation de la d??pense.","multi_account_warning_deposit":"Gardez en t??te que le compte de destination des ventilations suivantes peut ??tre remplac?? par celui de la premi??re ventilation du d??p??t.","multi_account_warning_transfer":"Gardez en t??te que les comptes source et de destination des ventilations suivantes peuvent ??tre remplac??s par ceux de la premi??re ventilation du transfert."},"form":{"interest_date":"Date de valeur (int??r??ts)","book_date":"Date de r??servation","process_date":"Date de traitement","due_date":"??ch??ance","foreign_amount":"Montant en devise ??trang??re","payment_date":"Date de paiement","invoice_date":"Date de facturation","internal_reference":"R??f??rence interne"},"config":{"html_language":"fr"}}');

/***/ }),

/***/ "./resources/assets/js/locales/hu.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/hu.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Mi a helyzet?","flash_error":"Hiba!","flash_success":"Siker!","close":"Bez??r??s","split_transaction_title":"Felosztott tranzakci?? le??r??sa","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Feloszt??s","single_split":"Feloszt??s","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> mentve.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> mentve.","transaction_journal_information":"Tranzakci??s inform??ci??k","no_budget_pointer":"??gy t??nik, m??g nincsenek k??lts??gkeretek. K??lts??gkereteket a <a href=\\"budgets\\">k??lts??gkeretek</a> oldalon lehet l??trehozni. A k??lts??gkeretek seg??tenek nyomon k??vetni a k??lts??geket.","no_bill_pointer":"??gy t??nik, m??g nincsenek k??lts??gkeretek. K??lts??gkereteket a <a href=\\"bills\\">k??lts??gkeretek</a> oldalon lehet l??trehozni. A k??lts??gkeretek seg??tenek nyomon k??vetni a k??lts??geket.","source_account":"Forr??s sz??mla","hidden_fields_preferences":"A <a href=\\"preferences\\">be??ll??t??sokban</a> t??bb mez?? is enged??lyezhet??.","destination_account":"C??lsz??mla","add_another_split":"M??sik feloszt??s hozz??ad??sa","submission":"Feliratkoz??s","create_another":"A t??rol??s ut??n t??rjen vissza ide ??j l??trehoz??s??hoz.","reset_after":"??rlap t??rl??se a bek??ld??s ut??n","submit":"Bek??ld??s","amount":"??sszeg","date":"D??tum","tags":"C??mk??k","no_budget":"(nincs k??lts??gkeret)","no_bill":"(no bill)","category":"Kateg??ria","attachments":"Mell??kletek","notes":"Megjegyz??sek","external_uri":"External URL","update_transaction":"Tranzakci?? friss??t??se","after_update_create_another":"A friss??t??s ut??n t??rjen vissza ide a szerkeszt??s folytat??s??hoz.","store_as_new":"T??rol??s ??j tranzakci??k??nt friss??t??s helyett.","split_title_help":"Felosztott tranzakci?? l??trehoz??sakor meg kell adni egy glob??lis le??r??st a tranzakci?? ??sszes feloszt??sa r??sz??re.","none_in_select_list":"(nincs)","no_piggy_bank":"(nincs malacpersely)","description":"Le??r??s","split_transaction_title_help":"Felosztott tranzakci?? l??trehoz??sakor meg kell adni egy glob??lis le??r??st a tranzakci?? ??sszes feloszt??sa r??sz??re.","destination_account_reconciliation":"Nem lehet szerkeszteni egy egyeztetett tranzakci?? c??lsz??ml??j??t.","source_account_reconciliation":"Nem lehet szerkeszteni egy egyeztetett tranzakci?? forr??ssz??ml??j??t.","budget":"K??lts??gkeret","bill":"Sz??mla","you_create_withdrawal":"Egy k??lts??g l??trehoz??sa.","you_create_transfer":"Egy ??tutal??s l??trehoz??sa.","you_create_deposit":"Egy bev??tel l??trehoz??sa.","edit":"Szerkeszt??s","delete":"T??rl??s","name":"N??v","profile_whoops":"Hopp??!","profile_something_wrong":"Hiba t??rt??nt!","profile_try_again":"Hiba t??rt??nt. K??rj??k, pr??b??lja meg ??jra.","profile_oauth_clients":"OAuth kliensek","profile_oauth_no_clients":"Nincs l??trehozva egyetlen OAuth kliens sem.","profile_oauth_clients_header":"Kliensek","profile_oauth_client_id":"Kliens ID","profile_oauth_client_name":"Megnevez??s","profile_oauth_client_secret":"Titkos k??d","profile_oauth_create_new_client":"??j kliens l??trehoz??sa","profile_oauth_create_client":"Kliens l??trehoz??sa","profile_oauth_edit_client":"Kliens szerkeszt??se","profile_oauth_name_help":"Seg??ts??g, hogy a felhaszn??l??k tudj??k mihez kapcsol??dik.","profile_oauth_redirect_url":"??tir??ny??t??si URL","profile_oauth_redirect_url_help":"Az alkalmaz??sban haszn??lt autentik??ci??s URL.","profile_authorized_apps":"Enged??lyezett alkalmaz??sok","profile_authorized_clients":"Enged??lyezett kliensek","profile_scopes":"Hat??sk??r??k","profile_revoke":"Visszavon??s","profile_personal_access_tokens":"Szem??lyes hozz??f??r??si tokenek","profile_personal_access_token":"Szem??lyes hozz??f??r??si token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"Nincs l??trehozva egyetlen szem??lyes hozz??f??r??si token sem.","profile_create_new_token":"??j token l??trehoz??sa","profile_create_token":"Token l??trehoz??sa","profile_create":"L??trehoz??s","profile_save_changes":"M??dos??t??sok ment??se","default_group_title_name":"(nem csoportos??tott)","piggy_bank":"Malacpersely","profile_oauth_client_secret_title":"Kliens titkos k??dja","profile_oauth_client_secret_expl":"Ez a kliens titkos k??dja. Ez az egyetlen alkalom, amikor meg van jelen??tve, ne hagyd el! Ezzel a k??ddal v??gezhetsz API h??v??sokat.","profile_oauth_confidential":"Bizalmas","profile_oauth_confidential_help":"Titkos k??d haszn??lata a kliens bejelentkez??s??hez. Bizonyos kliensek biztons??gosan tudnak hiteles??t?? adatokat t??rolni, an??lk??l hogy jogosulatlan f??l hozz??f??rhetne. Nyilv??nos kliensek, p??ld??ul mint asztali vagy JavaScript SPA alkalmaz??sok nem tudnak biztons??gosan titkos k??dot t??rolni.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Kamatfizet??si id??pont","book_date":"K??nyvel??s d??tuma","process_date":"Feldolgoz??s d??tuma","due_date":"Lej??rati id??pont","foreign_amount":"K??lf??ldi ??sszeg","payment_date":"Fizet??s d??tuma","invoice_date":"Sz??mla d??tuma","internal_reference":"Bels?? hivatkoz??s"},"config":{"html_language":"hu"}}');

/***/ }),

/***/ "./resources/assets/js/locales/it.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/it.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"La tua situazione finanziaria","flash_error":"Errore!","flash_success":"Successo!","close":"Chiudi","split_transaction_title":"Descrizione della transazione suddivisa","errors_submission":"Errore durante l\'invio. Controlla gli errori segnalati qui sotto.","split":"Dividi","single_split":"Divisione","transaction_stored_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID} (\\"{title}\\")</a> ?? stata salvata.","transaction_updated_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID}</a> (\\"{title}\\") ?? stata aggiornata.","transaction_new_stored_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID}</a> ?? stata salvata.","transaction_journal_information":"Informazioni transazione","no_budget_pointer":"Sembra che tu non abbia ancora dei budget. Dovresti crearne alcuni nella pagina dei <a href=\\"budgets\\">budget</a>. I budget possono aiutarti a tenere traccia delle spese.","no_bill_pointer":"Sembra che tu non abbia ancora delle bollette. Dovresti crearne alcune nella pagina delle <a href=\\"bills\\">bollette</a>. Le bollette possono aiutarti a tenere traccia delle spese.","source_account":"Conto di origine","hidden_fields_preferences":"Puoi abilitare maggiori opzioni per le transazioni nelle tue <a href=\\"preferences\\">impostazioni</a>.","destination_account":"Conto destinazione","add_another_split":"Aggiungi un\'altra divisione","submission":"Invio","create_another":"Dopo il salvataggio, torna qui per crearne un\'altra.","reset_after":"Resetta il modulo dopo l\'invio","submit":"Invia","amount":"Importo","date":"Data","tags":"Etichette","no_budget":"(nessun budget)","no_bill":"(nessuna bolletta)","category":"Categoria","attachments":"Allegati","notes":"Note","external_uri":"URL esterno","update_transaction":"Aggiorna transazione","after_update_create_another":"Dopo l\'aggiornamento, torna qui per continuare la modifica.","store_as_new":"Salva come nuova transazione invece di aggiornarla.","split_title_help":"Se crei una transazione suddivisa ?? necessario che ci sia una descrizione globale per tutte le suddivisioni della transazione.","none_in_select_list":"(nessuna)","no_piggy_bank":"(nessun salvadanaio)","description":"Descrizione","split_transaction_title_help":"Se crei una transazione suddivisa, ?? necessario che ci sia una descrizione globale per tutte le suddivisioni della transazione.","destination_account_reconciliation":"Non ?? possibile modificare il conto di destinazione di una transazione di riconciliazione.","source_account_reconciliation":"Non puoi modificare il conto di origine di una transazione di riconciliazione.","budget":"Budget","bill":"Bolletta","you_create_withdrawal":"Stai creando un prelievo.","you_create_transfer":"Stai creando un trasferimento.","you_create_deposit":"Stai creando un deposito.","edit":"Modifica","delete":"Elimina","name":"Nome","profile_whoops":"Oops!","profile_something_wrong":"Qualcosa non ha funzionato!","profile_try_again":"Qualcosa non ha funzionato. Riprova.","profile_oauth_clients":"Client OAuth","profile_oauth_no_clients":"Non hai creato nessun client OAuth.","profile_oauth_clients_header":"Client","profile_oauth_client_id":"ID client","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"Segreto","profile_oauth_create_new_client":"Crea nuovo client","profile_oauth_create_client":"Crea client","profile_oauth_edit_client":"Modifica client","profile_oauth_name_help":"Qualcosa di cui i tuoi utenti potranno riconoscere e fidarsi.","profile_oauth_redirect_url":"URL di reindirizzamento","profile_oauth_redirect_url_help":"L\'URL di callback dell\'autorizzazione della tua applicazione.","profile_authorized_apps":"Applicazioni autorizzate","profile_authorized_clients":"Client autorizzati","profile_scopes":"Ambiti","profile_revoke":"Revoca","profile_personal_access_tokens":"Token di acceso personale","profile_personal_access_token":"Token di acceso personale","profile_personal_access_token_explanation":"Ecco il tuo nuovo token di accesso personale. Questa ?? l\'unica volta che ti viene mostrato per cui non perderlo! Da adesso puoi utilizzare questo token per effettuare delle richieste API.","profile_no_personal_access_token":"Non hai creato alcun token di accesso personale.","profile_create_new_token":"Crea nuovo token","profile_create_token":"Crea token","profile_create":"Crea","profile_save_changes":"Salva modifiche","default_group_title_name":"(non in un gruppo)","piggy_bank":"Salvadanaio","profile_oauth_client_secret_title":"Segreto del client","profile_oauth_client_secret_expl":"Ecco il segreto del nuovo client. Questa ?? l\'unica occasione in cui viene mostrato pertanto non perderlo! Ora puoi usare questo segreto per effettuare delle richieste alle API.","profile_oauth_confidential":"Riservato","profile_oauth_confidential_help":"Richiede al client di autenticarsi con un segreto. I client riservati possono conservare le credenziali in modo sicuro senza esporle a soggetti non autorizzati. Le applicazioni pubbliche, come le applicazioni desktop native o JavaScript SPA, non sono in grado di conservare i segreti in modo sicuro.","multi_account_warning_unknown":"A seconda del tipo di transazione che hai creato, il conto di origine e/o destinazione delle successive suddivisioni pu?? essere sovrascritto da qualsiasi cosa sia definita nella prima suddivisione della transazione.","multi_account_warning_withdrawal":"Ricorda che il conto di origine delle successive suddivisioni verr?? sovrascritto da quello definito nella prima suddivisione del prelievo.","multi_account_warning_deposit":"Ricorda che il conto di destinazione delle successive suddivisioni verr?? sovrascritto da quello definito nella prima suddivisione del deposito.","multi_account_warning_transfer":"Ricorda che il conto di origine e il conto di destinazione delle successive suddivisioni verranno sovrascritti da quelli definiti nella prima suddivisione del trasferimento."},"form":{"interest_date":"Data di valuta","book_date":"Data contabile","process_date":"Data elaborazione","due_date":"Data scadenza","foreign_amount":"Importo estero","payment_date":"Data pagamento","invoice_date":"Data fatturazione","internal_reference":"Riferimento interno"},"config":{"html_language":"it"}}');

/***/ }),

/***/ "./resources/assets/js/locales/nb.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/nb.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"Feil!","flash_success":"Suksess!","close":"Lukk","split_transaction_title":"Description of the split transaction","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Del opp","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Transaksjonsinformasjon","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","add_another_split":"Legg til en oppdeling til","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Send inn","amount":"Bel??p","date":"Dato","tags":"Tagger","no_budget":"(ingen budsjett)","no_bill":"(no bill)","category":"Kategori","attachments":"Vedlegg","notes":"Notater","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","none_in_select_list":"(ingen)","no_piggy_bank":"(no piggy bank)","description":"Beskrivelse","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"Busjett","bill":"Regning","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Rediger","delete":"Slett","name":"Navn","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"Sparegris","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Rentedato","book_date":"Bokf??ringsdato","process_date":"Prosesseringsdato","due_date":"Forfallsdato","foreign_amount":"Utenlandske bel??p","payment_date":"Betalingsdato","invoice_date":"Fakturadato","internal_reference":"Intern referanse"},"config":{"html_language":"nb"}}');

/***/ }),

/***/ "./resources/assets/js/locales/nl.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/nl.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Hoe staat het er voor?","flash_error":"Fout!","flash_success":"Gelukt!","close":"Sluiten","split_transaction_title":"Beschrijving van de gesplitste transactie","errors_submission":"Er ging iets mis. Check de errors.","split":"Splitsen","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID} (\\"{title}\\")</a> is opgeslagen.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID}</a> (\\"{title}\\") is ge??pdatet.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID}</a> is opgeslagen.","transaction_journal_information":"Transactieinformatie","no_budget_pointer":"Je hebt nog geen budgetten. Maak er een aantal op de <a href=\\"budgets\\">budgetten</a>-pagina. Met budgetten kan je je uitgaven beter bijhouden.","no_bill_pointer":"Je hebt nog geen contracten. Maak er een aantal op de <a href=\\"bills\\">contracten</a>-pagina. Met contracten kan je je uitgaven beter bijhouden.","source_account":"Bronrekening","hidden_fields_preferences":"Je kan meer transactieopties inschakelen in je <a href=\\"preferences\\">instellingen</a>.","destination_account":"Doelrekening","add_another_split":"Voeg een split toe","submission":"Indienen","create_another":"Terug naar deze pagina voor een nieuwe transactie.","reset_after":"Reset formulier na opslaan","submit":"Invoeren","amount":"Bedrag","date":"Datum","tags":"Tags","no_budget":"(geen budget)","no_bill":"(geen contract)","category":"Categorie","attachments":"Bijlagen","notes":"Notities","external_uri":"Externe URL","update_transaction":"Update transactie","after_update_create_another":"Na het opslaan terug om door te gaan met wijzigen.","store_as_new":"Opslaan als nieuwe transactie ipv de huidige bij te werken.","split_title_help":"Als je een gesplitste transactie maakt, moet er een algemene beschrijving zijn voor alle splitsingen van de transactie.","none_in_select_list":"(geen)","no_piggy_bank":"(geen spaarpotje)","description":"Omschrijving","split_transaction_title_help":"Als je een gesplitste transactie maakt, moet er een algemene beschrijving zijn voor alle splitsingen van de transactie.","destination_account_reconciliation":"Je kan de doelrekening van een afstemming niet wijzigen.","source_account_reconciliation":"Je kan de bronrekening van een afstemming niet wijzigen.","budget":"Budget","bill":"Contract","you_create_withdrawal":"Je maakt een uitgave.","you_create_transfer":"Je maakt een overschrijving.","you_create_deposit":"Je maakt inkomsten.","edit":"Wijzig","delete":"Verwijder","name":"Naam","profile_whoops":"Oeps!","profile_something_wrong":"Er is iets mis gegaan!","profile_try_again":"Er is iets misgegaan. Probeer het nogmaals.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"Je hebt nog geen OAuth-clients aangemaakt.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Naam","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Nieuwe client aanmaken","profile_oauth_create_client":"Client aanmaken","profile_oauth_edit_client":"Client bewerken","profile_oauth_name_help":"Iets dat je gebruikers herkennen en vertrouwen.","profile_oauth_redirect_url":"Redirect-URL","profile_oauth_redirect_url_help":"De authorisatie-callback-url van jouw applicatie.","profile_authorized_apps":"Geautoriseerde toepassingen","profile_authorized_clients":"Geautoriseerde clients","profile_scopes":"Scopes","profile_revoke":"Intrekken","profile_personal_access_tokens":"Persoonlijke toegangstokens","profile_personal_access_token":"Persoonlijk toegangstoken","profile_personal_access_token_explanation":"Hier is je nieuwe persoonlijke toegangstoken. Dit is de enige keer dat deze getoond wordt dus verlies deze niet! Je kan deze toegangstoken gebruiken om API-aanvragen te maken.","profile_no_personal_access_token":"Je hebt nog geen persoonlijke toegangstokens aangemaakt.","profile_create_new_token":"Nieuwe token aanmaken","profile_create_token":"Token aanmaken","profile_create":"Cre??r","profile_save_changes":"Aanpassingen opslaan","default_group_title_name":"(ongegroepeerd)","piggy_bank":"Spaarpotje","profile_oauth_client_secret_title":"Client secret","profile_oauth_client_secret_expl":"Hier is je nieuwe client secret. Dit is de enige keer dat deze getoond wordt dus verlies deze niet! Je kan dit secret gebruiken om API-aanvragen te maken.","profile_oauth_confidential":"Vertrouwelijk","profile_oauth_confidential_help":"Dit vinkje is bedoeld voor applicaties die geheimen kunnen bewaren. Applicaties zoals sommige desktop-apps en Javascript apps kunnen dit niet. In zo\'n geval haal je het vinkje weg.","multi_account_warning_unknown":"Afhankelijk van het type transactie wordt de bron- en/of doelrekening overschreven door wat er in de eerste split staat.","multi_account_warning_withdrawal":"De bronrekening wordt overschreven door wat er in de eerste split staat.","multi_account_warning_deposit":"De doelrekening wordt overschreven door wat er in de eerste split staat.","multi_account_warning_transfer":"De bron + doelrekening wordt overschreven door wat er in de eerste split staat."},"form":{"interest_date":"Rentedatum","book_date":"Boekdatum","process_date":"Verwerkingsdatum","due_date":"Vervaldatum","foreign_amount":"Bedrag in vreemde valuta","payment_date":"Betalingsdatum","invoice_date":"Factuurdatum","internal_reference":"Interne verwijzing"},"config":{"html_language":"nl"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pl.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/pl.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Co jest grane?","flash_error":"B????d!","flash_success":"Sukces!","close":"Zamknij","split_transaction_title":"Opis podzielonej transakcji","errors_submission":"Co?? posz??o nie tak w czasie zapisu. Prosz?? sprawd?? b????dy.","split":"Podziel","single_split":"Podzia??","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID} (\\"{title}\\")</a> zosta??a zapisana.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID}</a> (\\"{title}\\") zosta??a zaktualizowana.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID}</a> zosta??a zapisana.","transaction_journal_information":"Informacje o transakcji","no_budget_pointer":"Wygl??da na to, ??e nie masz jeszcze bud??et??w. Powiniene?? utworzy?? kilka na stronie <a href=\\"budgets\\">bud??et??w</a>. Bud??ety mog?? Ci pom??c ??ledzi?? wydatki.","no_bill_pointer":"Wygl??da na to, ??e nie masz jeszcze rachunk??w. Powiniene?? utworzy?? kilka na stronie <a href=\\"bills\\">rachunk??w</a>. Rachunki mog?? Ci pom??c ??ledzi?? wydatki.","source_account":"Konto ??r??d??owe","hidden_fields_preferences":"Mo??esz w????czy?? wi??cej opcji transakcji w swoich <a href=\\"preferences\\">ustawieniach</a>.","destination_account":"Konto docelowe","add_another_split":"Dodaj kolejny podzia??","submission":"Zapisz","create_another":"Po zapisaniu wr???? tutaj, aby utworzy?? kolejny.","reset_after":"Wyczy???? formularz po zapisaniu","submit":"Prze??lij","amount":"Kwota","date":"Data","tags":"Tagi","no_budget":"(brak bud??etu)","no_bill":"(brak rachunku)","category":"Kategoria","attachments":"Za????czniki","notes":"Notatki","external_uri":"Zewn??trzny adres URL","update_transaction":"Zaktualizuj transakcj??","after_update_create_another":"Po aktualizacji wr???? tutaj, aby kontynuowa?? edycj??.","store_as_new":"Zapisz jako now?? zamiast aktualizowa??.","split_title_help":"Podzielone transakcje musz?? posiada?? globalny opis.","none_in_select_list":"(??adne)","no_piggy_bank":"(brak skarbonki)","description":"Opis","split_transaction_title_help":"Je??li tworzysz podzielon?? transakcj??, musi ona posiada?? globalny opis dla wszystkich podzia????w w transakcji.","destination_account_reconciliation":"Nie mo??esz edytowa?? konta docelowego transakcji uzgadniania.","source_account_reconciliation":"Nie mo??esz edytowa?? konta ??r??d??owego transakcji uzgadniania.","budget":"Bud??et","bill":"Rachunek","you_create_withdrawal":"Tworzysz wydatek.","you_create_transfer":"Tworzysz przelew.","you_create_deposit":"Tworzysz wp??at??.","edit":"Modyfikuj","delete":"Usu??","name":"Nazwa","profile_whoops":"Uuuups!","profile_something_wrong":"Co?? posz??o nie tak!","profile_try_again":"Co?? posz??o nie tak. Spr??buj ponownie.","profile_oauth_clients":"Klienci OAuth","profile_oauth_no_clients":"Nie utworzy??e?? ??adnych klient??w OAuth.","profile_oauth_clients_header":"Klienci","profile_oauth_client_id":"ID klienta","profile_oauth_client_name":"Nazwa","profile_oauth_client_secret":"Sekretny klucz","profile_oauth_create_new_client":"Utw??rz nowego klienta","profile_oauth_create_client":"Utw??rz klienta","profile_oauth_edit_client":"Edytuj klienta","profile_oauth_name_help":"Co??, co Twoi u??ytkownicy b??d?? rozpoznawa?? i ufa??.","profile_oauth_redirect_url":"Przekierowanie URL","profile_oauth_redirect_url_help":"Adres URL wywo??ania zwrotnego autoryzacji aplikacji.","profile_authorized_apps":"Autoryzowane aplikacje","profile_authorized_clients":"Autoryzowani klienci","profile_scopes":"Zakresy","profile_revoke":"Uniewa??nij","profile_personal_access_tokens":"Osobiste tokeny dost??pu","profile_personal_access_token":"Osobisty token dost??pu","profile_personal_access_token_explanation":"Oto tw??j nowy osobisty token dost??pu. Jest to jedyny raz, gdy zostanie wy??wietlony, wi??c nie zgub go! Mo??esz teraz u??y?? tego tokenu, aby wykona?? zapytania API.","profile_no_personal_access_token":"Nie utworzy??e?? ??adnych osobistych token??w.","profile_create_new_token":"Utw??rz nowy token","profile_create_token":"Utw??rz token","profile_create":"Utw??rz","profile_save_changes":"Zapisz zmiany","default_group_title_name":"(bez grupy)","piggy_bank":"Skarbonka","profile_oauth_client_secret_title":"Sekret klienta","profile_oauth_client_secret_expl":"Oto tw??j nowy sekret klienta. Jest to jedyny raz, gdy zostanie wy??wietlony, wi??c nie zgub go! Mo??esz teraz u??y?? tego sekretu, aby wykona?? zapytania API.","profile_oauth_confidential":"Poufne","profile_oauth_confidential_help":"Wymagaj od klienta uwierzytelnienia za pomoc?? sekretu. Poufni klienci mog?? przechowywa?? po??wiadczenia w bezpieczny spos??b bez nara??ania ich na dost??p przez nieuprawnione strony. Publiczne aplikacje, takie jak natywne aplikacje desktopowe lub JavaScript SPA, nie s?? w stanie bezpiecznie trzyma?? sekret??w.","multi_account_warning_unknown":"W zale??no??ci od rodzaju transakcji, kt??r?? tworzysz, konto ??r??d??owe i/lub docelowe kolejnych podzia????w mo??e zosta?? ustawione na konto zdefiniowane w pierwszym podziale transakcji.","multi_account_warning_withdrawal":"Pami??taj, ??e konto ??r??d??owe kolejnych podzia????w zostanie ustawione na konto zdefiniowane w pierwszym podziale wyp??aty.","multi_account_warning_deposit":"Pami??taj, ??e konto docelowe kolejnych podzia????w zostanie ustawione na konto zdefiniowane w pierwszym podziale wp??aty.","multi_account_warning_transfer":"Pami??taj, ??e konta ??r??d??owe i docelowe kolejnych podzia????w zostan?? ustawione na konto zdefiniowane w pierwszym podziale transferu."},"form":{"interest_date":"Data odsetek","book_date":"Data ksi??gowania","process_date":"Data przetworzenia","due_date":"Termin realizacji","foreign_amount":"Kwota zagraniczna","payment_date":"Data p??atno??ci","invoice_date":"Data faktury","internal_reference":"Wewn??trzny numer"},"config":{"html_language":"pl"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pt-br.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/pt-br.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"O que est?? acontecendo?","flash_error":"Erro!","flash_success":"Sucesso!","close":"Fechar","split_transaction_title":"Descri????o da transa????o dividida","errors_submission":"H?? algo de errado com o seu envio. Por favor, verifique os erros abaixo.","split":"Dividir","single_split":"Divis??o","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transa????o #{ID} (\\"{title}\\")</a> foi salva.","transaction_updated_link":"A <a href=\\"transactions/show/{ID}\\">Transa????o #{ID}</a> (\\"{title}\\") foi atualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transa????o #{ID}</a> foi salva.","transaction_journal_information":"Informa????o da transa????o","no_budget_pointer":"Parece que voc?? ainda n??o tem or??amentos. Voc?? deve criar alguns na p??gina de <a href=\\"budgets\\">or??amentos</a>. Or??amentos podem ajud??-lo a manter o controle das despesas.","no_bill_pointer":"Parece que voc?? ainda n??o tem contas. Voc?? deve criar algumas em <a href=\\"bills\\">contas</a>. Contas podem ajudar voc?? a manter o controle de despesas.","source_account":"Conta origem","hidden_fields_preferences":"Voc?? pode habilitar mais op????es de transa????o em suas <a href=\\"preferences\\">prefer??ncias</a>.","destination_account":"Conta destino","add_another_split":"Adicionar outra divis??o","submission":"Envio","create_another":"Depois de armazenar, retorne aqui para criar outro.","reset_after":"Resetar o formul??rio ap??s o envio","submit":"Enviar","amount":"Valor","date":"Data","tags":"Tags","no_budget":"(sem or??amento)","no_bill":"(sem conta)","category":"Categoria","attachments":"Anexos","notes":"Notas","external_uri":"URL externa","update_transaction":"Atualizar transa????o","after_update_create_another":"Depois de atualizar, retorne aqui para continuar editando.","store_as_new":"Armazene como uma nova transa????o em vez de atualizar.","split_title_help":"Se voc?? criar uma transa????o dividida, ?? necess??rio haver uma descri????o global para todas as partes da transa????o.","none_in_select_list":"(nenhum)","no_piggy_bank":"(nenhum cofrinho)","description":"Descri????o","split_transaction_title_help":"Se voc?? criar uma transa????o dividida, deve haver uma descri????o global para todas as partes da transa????o.","destination_account_reconciliation":"Voc?? n??o pode editar a conta de origem de uma transa????o de reconcilia????o.","source_account_reconciliation":"Voc?? n??o pode editar a conta de origem de uma transa????o de reconcilia????o.","budget":"Or??amento","bill":"Fatura","you_create_withdrawal":"Voc?? est?? criando uma sa??da.","you_create_transfer":"Voc?? est?? criando uma transfer??ncia.","you_create_deposit":"Voc?? est?? criando uma entrada.","edit":"Editar","delete":"Apagar","name":"Nome","profile_whoops":"Ops!","profile_something_wrong":"Alguma coisa deu errado!","profile_try_again":"Algo deu errado. Por favor tente novamente.","profile_oauth_clients":"Clientes OAuth","profile_oauth_no_clients":"Voc?? n??o criou nenhum cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID do Cliente","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"Segredo","profile_oauth_create_new_client":"Criar um novo cliente","profile_oauth_create_client":"Criar um cliente","profile_oauth_edit_client":"Editar cliente","profile_oauth_name_help":"Alguma coisa que seus usu??rios v??o reconhecer e identificar.","profile_oauth_redirect_url":"URL de redirecionamento","profile_oauth_redirect_url_help":"A URL de retorno da sua solicita????o de autoriza????o.","profile_authorized_apps":"Aplicativos autorizados","profile_authorized_clients":"Clientes autorizados","profile_scopes":"Escopos","profile_revoke":"Revogar","profile_personal_access_tokens":"Tokens de acesso pessoal","profile_personal_access_token":"Token de acesso pessoal","profile_personal_access_token_explanation":"Aqui est?? seu novo token de acesso pessoal. Esta ?? a ??nica vez que ela ser?? mostrada ent??o n??o perca! Agora voc?? pode usar esse token para fazer solicita????es de API.","profile_no_personal_access_token":"Voc?? n??o criou nenhum token de acesso pessoal.","profile_create_new_token":"Criar novo token","profile_create_token":"Criar token","profile_create":"Criar","profile_save_changes":"Salvar altera????es","default_group_title_name":"(n??o agrupado)","piggy_bank":"Cofrinho","profile_oauth_client_secret_title":"Segredo do cliente","profile_oauth_client_secret_expl":"Aqui est?? o seu novo segredo de cliente. Esta ?? a ??nica vez que ela ser?? mostrada, ent??o n??o o perca! Agora voc?? pode usar este segredo para fazer requisi????es de API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Exige que o cliente se autentique com um segredo. Clientes confidenciais podem manter credenciais de forma segura sem exp??-las ?? partes n??o autorizadas. Aplica????es p??blicas, como aplica????es de ??rea de trabalho nativas ou JavaScript SPA, s??o incapazes de manter segredos com seguran??a.","multi_account_warning_unknown":"Dependendo do tipo de transa????o que voc?? criar, a conta de origem e/ou de destino das divis??es subsequentes pode ser sobrescrita pelo que estiver definido na primeira divis??o da transa????o.","multi_account_warning_withdrawal":"Tenha em mente que a conta de origem das subsequentes divis??es ser?? sobrescrita pelo que estiver definido na primeira divis??o da sa??da.","multi_account_warning_deposit":"Tenha em mente que a conta de destino das divis??es subsequentes ser?? sobrescrita pelo que estiver definido na primeira divis??o da entrada.","multi_account_warning_transfer":"Tenha em mente que a conta de origem + de destino das divis??es subsequentes ser?? sobrescrita pelo que for definido na primeira divis??o da transfer??ncia."},"form":{"interest_date":"Data de interesse","book_date":"Data reserva","process_date":"Data de processamento","due_date":"Data de vencimento","foreign_amount":"Montante em moeda estrangeira","payment_date":"Data de pagamento","invoice_date":"Data da Fatura","internal_reference":"Refer??ncia interna"},"config":{"html_language":"pt-br"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pt.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/pt.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Tudo bem?","flash_error":"Erro!","flash_success":"Sucesso!","close":"Fechar","split_transaction_title":"Descri????o da transac????o dividida","errors_submission":"Aconteceu algo errado com a sua submiss??o. Por favor, verifique os erros.","split":"Dividir","single_split":"Dividir","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transa????o #{ID} (\\"{title}\\")</a> foi guardada.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transa????o #{ID}</a> (\\"{title}\\") foi atualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transa????o#{ID}</a> foi guardada.","transaction_journal_information":"Informa????o da transa????o","no_budget_pointer":"Parece que ainda n??o tem or??amentos. Pode criar-los na p??gina de <a href=\\"budgets\\">or??amentos</a>. Or??amentos podem ajud??-lo a controlar as despesas.","no_bill_pointer":"Parece que ainda n??o tem faturas. Pode criar-las na p??gina de <a href=\\"bills\\">faturas</a>. Faturas podem ajud??-lo a controlar as despesas.","source_account":"Conta de origem","hidden_fields_preferences":"Pode ativar mais op????es de transa????es nas suas <a href=\\"preferences\\">prefer??ncias</a>.","destination_account":"Conta de destino","add_another_split":"Adicionar outra divis??o","submission":"Submiss??o","create_another":"Depois de guardar, voltar aqui para criar outra.","reset_after":"Repor o formul??rio ap??s o envio","submit":"Enviar","amount":"Montante","date":"Data","tags":"Etiquetas","no_budget":"(sem or??amento)","no_bill":"(sem fatura)","category":"Categoria","attachments":"Anexos","notes":"Notas","external_uri":"URL Externo","update_transaction":"Actualizar transac????o","after_update_create_another":"Ap??s a atualiza????o, regresse aqui para continuar a editar.","store_as_new":"Guarde como uma nova transa????o em vez de atualizar.","split_title_help":"Se criar uma transac????o dividida, deve haver uma descri????o global para todas as partes da transac????o.","none_in_select_list":"(nenhum)","no_piggy_bank":"(nenhum mealheiro)","description":"Descricao","split_transaction_title_help":"Se criar uma transac????o dividida, deve haver uma descri????o global para todas as partes da transac????o.","destination_account_reconciliation":"N??o pode editar a conta de destino de uma transac????o de reconcilia????o.","source_account_reconciliation":"N??o pode editar a conta de origem de uma transac????o de reconcilia????o.","budget":"Orcamento","bill":"Fatura","you_create_withdrawal":"Est?? a criar um levantamento.","you_create_transfer":"Est?? a criar uma transfer??ncia.","you_create_deposit":"Est?? a criar um dep??sito.","edit":"Alterar","delete":"Apagar","name":"Nome","profile_whoops":"Oops!","profile_something_wrong":"Algo correu mal!","profile_try_again":"Algo correu mal. Por favor, tente novamente.","profile_oauth_clients":"Clientes OAuth","profile_oauth_no_clients":"N??o criou nenhum cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID do Cliente","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"C??digo secreto","profile_oauth_create_new_client":"Criar Novo Cliente","profile_oauth_create_client":"Criar Cliente","profile_oauth_edit_client":"Editar Cliente","profile_oauth_name_help":"Algo que os utilizadores reconhe??am e confiem.","profile_oauth_redirect_url":"URL de redireccionamento","profile_oauth_redirect_url_help":"URL de callback de autoriza????o da aplica????o.","profile_authorized_apps":"Aplica????es autorizados","profile_authorized_clients":"Clientes autorizados","profile_scopes":"Contextos","profile_revoke":"Revogar","profile_personal_access_tokens":"Tokens de acesso pessoal","profile_personal_access_token":"Token de acesso pessoal","profile_personal_access_token_explanation":"Aqui est?? o seu novo token de acesso pessoal. Esta ?? a ??nica v??s que o mesmo ser?? mostrado portanto n??o o perca! Pode utiliza-lo para fazer pedidos de API.","profile_no_personal_access_token":"Voc?? ainda n??o criou tokens de acesso pessoal.","profile_create_new_token":"Criar novo token","profile_create_token":"Criar token","profile_create":"Criar","profile_save_changes":"Guardar altera????es","default_group_title_name":"(n??o agrupado)","piggy_bank":"Mealheiro","profile_oauth_client_secret_title":"Segredo do cliente","profile_oauth_client_secret_expl":"Aqui est?? o seu segredo de cliente. Apenas estar?? vis??vel uma vez portanto n??o o perca! Pode agora utilizar este segredo para fazer pedidos ?? API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Exigir que o cliente se autentique com um segredo. Clientes confidenciais podem manter credenciais de forma segura sem expor as mesmas a terceiros n??o autorizadas. Aplica????es p??blicas, como por exemplo aplica????es nativas de sistema operativo ou SPA JavaScript, s??o incapazes de garantir a seguran??a dos segredos.","multi_account_warning_unknown":"Dependendo do tipo de transi????o que quer criar, a conta de origem e/ou a destino de subsequentes divis??es pode ser sub-escrita por quaisquer regra definida na primeira divis??o da transa????o.","multi_account_warning_withdrawal":"Mantenha em mente que a conta de origem de divis??es subsequentes ser?? sobre-escrita por quaisquer regra definida na primeira divis??o do levantamento.","multi_account_warning_deposit":"Mantenha em mente que a conta de destino de divis??es subsequentes ser?? sobre-escrita por quaisquer regra definida na primeira divis??o do dep??sito.","multi_account_warning_transfer":"Mantenha em mente que a conta de origem + destino de divis??es subsequentes ser??o sobre-escritas por quaisquer regras definidas na divis??o da transfer??ncia."},"form":{"interest_date":"Data de juros","book_date":"Data de registo","process_date":"Data de processamento","due_date":"Data de vencimento","foreign_amount":"Montante estrangeiro","payment_date":"Data de pagamento","invoice_date":"Data da factura","internal_reference":"Referencia interna"},"config":{"html_language":"pt"}}');

/***/ }),

/***/ "./resources/assets/js/locales/ro.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/ro.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Ce se red???","flash_error":"Eroare!","flash_success":"Succes!","close":"??nchide","split_transaction_title":"Descrierea tranzac??iei divizate","errors_submission":"A fost ceva ??n neregul?? cu depunerea ta. Te rug??m s?? verifici erorile.","split":"??mparte","single_split":"??mparte","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Tranzac??ia #{ID} (\\"{title}\\")</a> a fost stocat??.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Tranzac??ia #{ID}</a> (\\"{title}\\") a fost actualizat??.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Tranzac??ia #{ID}</a> a fost stocat??.","transaction_journal_information":"Informa??ii despre tranzac??ii","no_budget_pointer":"Se pare c?? nu ave??i ??nc?? bugete. Ar trebui s?? crea??i c??teva pe pagina <a href=\\"/budgets\\">bugete</a>. Bugetele v?? pot ajuta s?? ??ine??i eviden??a cheltuielilor.","no_bill_pointer":"Se pare c?? nu ave??i ??nc?? facturi. Ar trebui s?? crea??i unele pe pagina <a href=\\"bills\\">facturi</a>. Facturile v?? pot ajuta s?? ??ine??i eviden??a cheltuielilor.","source_account":"Contul surs??","hidden_fields_preferences":"Pute??i activa mai multe op??iuni de tranzac??ie ??n <a href=\\"preferences\\">preferin??ele</a> dvs.","destination_account":"Contul de destina??ie","add_another_split":"Ad??uga??i o divizare","submission":"Transmitere","create_another":"Dup?? stocare, reveni??i aici pentru a crea alta.","reset_after":"Reseta??i formularul dup?? trimitere","submit":"Trimite","amount":"Sum??","date":"Dat??","tags":"Etichete","no_budget":"(nici un buget)","no_bill":"(f??r?? factur??)","category":"Categorie","attachments":"Ata??amente","notes":"Noti??e","external_uri":"URL extern","update_transaction":"Actualiza??i tranzac??ia","after_update_create_another":"Dup?? actualizare, reveni??i aici pentru a continua editarea.","store_as_new":"Stoca??i ca o tranzac??ie nou?? ??n loc s?? actualiza??i.","split_title_help":"Dac?? crea??i o tranzac??ie divizat??, trebuie s?? existe o descriere global?? pentru toate diviziunile tranzac??iei.","none_in_select_list":"(nici unul)","no_piggy_bank":"(nicio pu??culi????)","description":"Descriere","split_transaction_title_help":"Dac?? crea??i o tranzac??ie divizat??, trebuie s?? existe o descriere global?? pentru toate diviziunile tranzac??iei.","destination_account_reconciliation":"Nu pute??i edita contul de destina??ie al unei tranzac??ii de reconciliere.","source_account_reconciliation":"Nu pute??i edita contul surs?? al unei tranzac??ii de reconciliere.","budget":"Buget","bill":"Factur??","you_create_withdrawal":"Creezi o retragere.","you_create_transfer":"Creezi un transfer.","you_create_deposit":"Creezi un depozit.","edit":"Editeaz??","delete":"??terge","name":"Nume","profile_whoops":"Hopaa!","profile_something_wrong":"A ap??rut o eroare!","profile_try_again":"A ap??rut o problem??. ??ncerca??i din nou.","profile_oauth_clients":"Clien??i OAuth","profile_oauth_no_clients":"Nu a??i creat niciun client OAuth.","profile_oauth_clients_header":"Clien??i","profile_oauth_client_id":"ID Client","profile_oauth_client_name":"Nume","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Creare client nou","profile_oauth_create_client":"Creare client","profile_oauth_edit_client":"Editare client","profile_oauth_name_help":"Ceva ce utilizatorii vor recunoa??te ??i vor avea ??ncredere.","profile_oauth_redirect_url":"Redirectioneaza URL","profile_oauth_redirect_url_help":"URL-ul de retroapelare al aplica??iei dvs.","profile_authorized_apps":"Aplica??iile dvs autorizate","profile_authorized_clients":"Clien??i autoriza??i","profile_scopes":"Domenii","profile_revoke":"Revoca??i","profile_personal_access_tokens":"Token de acces personal","profile_personal_access_token":"Token de acces personal","profile_personal_access_token_explanation":"Aici este noul dvs. token de acces personal. Este singura dat?? c??nd va fi afi??at a??a c?? nu ??l pierde! Acum po??i folosi acest token pentru a face cereri API.","profile_no_personal_access_token":"Nu a??i creat nici un token personal de acces.","profile_create_new_token":"Creaz?? un nou token","profile_create_token":"Creaz?? token","profile_create":"Creaz??","profile_save_changes":"Salveaz?? modific??rile","default_group_title_name":"(negrupat)","piggy_bank":"Pu??culi????","profile_oauth_client_secret_title":"Secret client","profile_oauth_client_secret_expl":"Aici este noul t??u cod secret de client. Este singura dat?? c??nd va fi afi??at a??a c?? nu ??l pierzi! Acum po??i folosi acest cod pentru a face cereri API.","profile_oauth_confidential":"Confiden??ial","profile_oauth_confidential_help":"Solicita??i clientului s?? se autentifice cu un secret. Clien??ii confiden??iali pot p??stra acredit??rile ??ntr-un mod securizat f??r?? a le expune unor p??r??i neautorizate. Aplica??iile publice, cum ar fi aplica??iile native desktop sau JavaScript SPA, nu pot p??stra secretele ??n siguran????.","multi_account_warning_unknown":"??n func??ie de tipul de tranzac??ie pe care o crea??i, contul sursei ??i/sau destina??iei frac??ion??rilor ulterioare poate fi dep????it cu orice se define??te ??n prima ??mp??r??ire a tranzac??iei.","multi_account_warning_withdrawal":"Re??ine??i faptul c?? sursa scind??rilor ulterioare va fi anulat?? de orice altceva definit ??n prima ??mp??r??ire a retragerii.","multi_account_warning_deposit":"??ine??i cont de faptul c?? destina??ia scind??rilor ulterioare va fi dep????it?? cu orice se define??te la prima ??mp??r??ire a depozitului.","multi_account_warning_transfer":"Re??ine??i faptul c?? contul sursei + destina??ia frac??ion??rilor ulterioare va fi anulat de orice se define??te ??n prima ??mp??r??ire a transferului."},"form":{"interest_date":"Data de interes","book_date":"Rezerv?? dat??","process_date":"Data proces??rii","due_date":"Data scadent??","foreign_amount":"Sum?? str??in??","payment_date":"Data de plat??","invoice_date":"Data facturii","internal_reference":"Referin???? intern??"},"config":{"html_language":"ro"}}');

/***/ }),

/***/ "./resources/assets/js/locales/ru.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/ru.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"?????? ???????????????????? ?? ?????????? ???????????????????","flash_error":"????????????!","flash_success":"??????????????!","close":"??????????????","split_transaction_title":"???????????????? ?????????????????????? ????????????????????","errors_submission":"?????? ???????????????? ??????-???? ?????????? ???? ??????. ????????????????????, ?????????????????? ???????????? ????????.","split":"??????????????????","single_split":"?????????????????????? ????????????????????","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">???????????????????? #{ID} (\\"{title}\\")</a> ??????????????????.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">???????????????????? #{ID}</a> ??????????????????.","transaction_journal_information":"???????????????????? ?? ????????????????????","no_budget_pointer":"????????????, ?? ?????? ???????? ?????? ????????????????. ???? ???????????? ?????????????? ???? ???? ???????????????? <a href=\\"budgets\\">??????????????</a>. ?????????????? ?????????? ???????????? ?????? ?????????????????????? ??????????????.","no_bill_pointer":"????????????, ?? ?????? ???????? ?????? ???????????? ???? ????????????. ???? ???????????? ?????????????? ???? ???? ???????????????? <a href=\\"bills\\">?????????? ???? ????????????</a>. ?????????? ???? ???????????? ?????????? ???????????? ?????? ?????????????????????? ??????????????.","source_account":"????????-????????????????","hidden_fields_preferences":"???? ???????????? ???????????????? ???????????? ???????????????????? ???????????????????? ?? <a href=\\"preferences\\">????????????????????</a>.","destination_account":"???????? ????????????????????","add_another_split":"???????????????? ?????? ???????? ??????????","submission":"??????????????????","create_another":"?????????? ???????????????????? ?????????????????? ???????? ?? ?????????????? ?????? ???????? ?????????????????????? ????????????.","reset_after":"???????????????? ?????????? ?????????? ????????????????","submit":"??????????????????????","amount":"??????????","date":"????????","tags":"??????????","no_budget":"(?????? ??????????????)","no_bill":"(?????? ?????????? ???? ????????????)","category":"??????????????????","attachments":"????????????????","notes":"??????????????","external_uri":"?????????????? URL","update_transaction":"???????????????? ????????????????????","after_update_create_another":"?????????? ???????????????????? ?????????????????? ????????, ?????????? ???????????????????? ????????????????????????????.","store_as_new":"?????????????????? ?????? ?????????? ???????????????????? ???????????? ????????????????????.","split_title_help":"???????? ???? ???????????????? ?????????????????????? ????????????????????, ???? ???????????? ?????????????? ?????????? ???????????????? ?????? ???????? ???? ????????????????????????.","none_in_select_list":"(??????)","no_piggy_bank":"(?????? ??????????????)","description":"????????????????","split_transaction_title_help":"???????? ???? ???????????????? ?????????????????????? ????????????????????, ???? ???????????? ?????????????? ?????????? ???????????????? ?????? ???????? ???? ????????????????????????.","destination_account_reconciliation":"???? ???? ???????????? ?????????????????????????? ???????? ???????????????????? ?????? ?????????????????? ????????????????????.","source_account_reconciliation":"???? ???? ???????????? ?????????????????????????? ????????-???????????????? ?????? ?????????????????? ????????????????????.","budget":"????????????","bill":"???????? ?? ????????????","you_create_withdrawal":"???? ???????????????? ????????????.","you_create_transfer":"???? ???????????????? ??????????????.","you_create_deposit":"???? ???????????????? ??????????.","edit":"????????????????","delete":"??????????????","name":"????????????????","profile_whoops":"??????????!","profile_something_wrong":"??????-???? ?????????? ???? ??????!","profile_try_again":"?????????????????? ????????????. ????????????????????, ???????????????????? ??????????.","profile_oauth_clients":"?????????????? OAuth","profile_oauth_no_clients":"?? ?????? ???????? ?????? ???????????????? OAuth.","profile_oauth_clients_header":"??????????????","profile_oauth_client_id":"ID ??????????????","profile_oauth_client_name":"????????????????","profile_oauth_client_secret":"?????????????????? ????????","profile_oauth_create_new_client":"?????????????? ???????????? ??????????????","profile_oauth_create_client":"?????????????? ??????????????","profile_oauth_edit_client":"???????????????? ??????????????","profile_oauth_name_help":"??????-????, ?????? ???????? ???????????????????????? ??????????, ?? ???????? ????????????????.","profile_oauth_redirect_url":"URL ??????????????????","profile_oauth_redirect_url_help":"URL ?????????????????? ???????????? ?????? ???????????? ????????????????????.","profile_authorized_apps":"???????????????????????????? ????????????????????","profile_authorized_clients":"???????????????????????????? ??????????????","profile_scopes":"????????????????????","profile_revoke":"??????????????????","profile_personal_access_tokens":"???????????????????????? Access Tokens","profile_personal_access_token":"???????????????????????? Access Token","profile_personal_access_token_explanation":"?????? ?????? ?????????? ???????????????????????? ?????????? ??????????????. ???? ?????????? ?????????????? ?????? ???????????? ????????????, ?????????????? ???? ?????????????????? ??????! ???????????? ???? ???????????? ???????????????????????? ???????? ??????????, ?????????? ???????????? ?????????????? ???? API.","profile_no_personal_access_token":"???? ???? ?????????????? ???? ???????????? ?????????????????????????? ???????????? ??????????????.","profile_create_new_token":"?????????????? ?????????? ??????????","profile_create_token":"?????????????? ??????????","profile_create":"??????????????","profile_save_changes":"?????????????????? ??????????????????","default_group_title_name":"(?????? ??????????????????????)","piggy_bank":"??????????????","profile_oauth_client_secret_title":"???????? ??????????????","profile_oauth_client_secret_expl":"?????? ?????? ?????????? ???????? ??????????????. ???? ?????????? ?????????????? ?????? ???????????? ????????????, ?????????????? ???? ?????????????????? ??????! ???????????? ???? ???????????? ???????????????????????? ???????? ????????, ?????????? ???????????? ?????????????? ???? API.","profile_oauth_confidential":"????????????????????????????????","profile_oauth_confidential_help":"??????????????????, ?????????? ???????????? ???????????????????????????????????? ?? ?????????????????? ????????????. ???????????????????????????????? ?????????????? ?????????? ?????????????? ?????????????? ???????????? ?? ???????????????? ????????, ?????????????? ???? ???? ???????????????????????????????????????? ??????????????. ?????????????????? ????????????????????, ?????????? ?????? ?????????????? ?????????????? ???????? ?????? ???????????????????? JavaScript SPA, ???? ?????????? ?????????????? ?????????????? ???????? ??????????.","multi_account_warning_unknown":"?? ?????????????????????? ???? ???????? ????????????????????, ?????????????? ???? ????????????????, ????????-???????????????? ??/?????? ???????? ???????????????????? ?????????????????? ???????????? ?????????????????????? ???????????????????? ?????????? ???????? ???????????????? ????????, ?????????????? ?????????????? ?????? ???????????? ?????????? ????????????????????.","multi_account_warning_withdrawal":"???????????? ?? ????????, ?????? ????????-???????????????? ?? ???????????? ???????????? ?????????????????????? ???????????????????? ?????????? ?????????? ????, ?????? ?? ???????????? ?????????? ??????????????.","multi_account_warning_deposit":"???????????? ?? ????????, ?????? ???????? ???????????????????? ?? ???????????? ???????????? ?????????????????????? ???????????????????? ?????????? ?????????? ????, ?????? ?? ???????????? ?????????? ????????????.","multi_account_warning_transfer":"???????????? ?? ????????, ?????? ????????-???????????????? ?? ???????? ???????????????????? ?? ???????????? ???????????? ?????????????????????? ???????????????????? ?????????? ???????????? ????, ?????? ?? ???????????? ?????????? ????????????????."},"form":{"interest_date":"???????? ???????????????????? ??????????????????","book_date":"???????? ????????????????????????","process_date":"???????? ??????????????????","due_date":"???????? ????????????","foreign_amount":"?????????? ?? ?????????????????????? ????????????","payment_date":"???????? ??????????????","invoice_date":"???????? ?????????????????????? ??????????","internal_reference":"???????????????????? ????????????"},"config":{"html_language":"ru"}}');

/***/ }),

/***/ "./resources/assets/js/locales/sk.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/sk.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Ako to ide?","flash_error":"Chyba!","flash_success":"Hotovo!","close":"Zavrie??","split_transaction_title":"Popis roz????tovania","errors_submission":"Pri odosielan?? sa nie??o nepodarilo. Skontrolujte pros??m chyby.","split":"Roz????tova??","single_split":"Roz????tova??","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID} (\\"{title}\\")</a> bola ulo??en??.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID}</a> (\\"{title}\\") bola upraven??.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID}</a> bola ulo??en??.","transaction_journal_information":"Inform??cie o transakcii","no_budget_pointer":"Zd?? sa, ??e zatia?? nem??te ??iadne rozpo??ty. Na str??nke <a href=\\"/budgets\\">rozpo??ty</a> by ste si nejak?? mali vytvori??. Rozpo??ty m????u pom??c?? udr??a?? preh??ad vo v??davkoch.","no_bill_pointer":"Zd?? sa, ??e zatia?? nem??te ??iadne ????ty. Na str??nke <a href=\\"/bills\\">????ty</a> by ste mali nejak?? vytvori??. ????ty m????u pom??c?? udr??a?? si preh??ad vo v??davkoch.","source_account":"Zdrojov?? ????et","hidden_fields_preferences":"Viac mo??nost?? transakci?? m????ete povoli?? vo svojich <a href=\\"/preferences\\">nastaveniach</a>.","destination_account":"Cie??ov?? ????et","add_another_split":"Prida?? ??al??ie roz????tovanie","submission":"Odoslanie","create_another":"Po ulo??en?? sa vr??ti?? sp???? sem a vytvori?? ??al????.","reset_after":"Po odoslan?? vynulova?? formul??r","submit":"Odosla??","amount":"Suma","date":"D??tum","tags":"??t??tky","no_budget":"(??iadny rozpo??et)","no_bill":"(??iadny ????et)","category":"Kateg??ria","attachments":"Pr??lohy","notes":"Pozn??mky","external_uri":"Extern?? URL","update_transaction":"Upravi?? transakciu","after_update_create_another":"Po aktualiz??cii sa vr??ti?? sp???? a pokra??ova?? v ??prav??ch.","store_as_new":"Namiesto aktualiz??cie ulo??i?? ako nov?? transakciu.","split_title_help":"Ak vytvor??te roz????tovanie transakcie, je potrebn??, aby ste ur??ili v??eobecn?? popis pre v??etky roz????tovania danej transakcie.","none_in_select_list":"(??iadne)","no_piggy_bank":"(??iadna pokladni??ka)","description":"Popis","split_transaction_title_help":"Ak vytvor??te roz????tovan?? transakciu, mus?? existova?? glob??lny popis v??etk??ch roz????tovan?? transakcie.","destination_account_reconciliation":"Nem????ete upravi?? cie??ov?? ????et z????tovacej transakcie.","source_account_reconciliation":"Nem????ete upravi?? zdrojov?? ????et z????tovacej transakcie.","budget":"Rozpo??et","bill":"????et","you_create_withdrawal":"Vytv??rate v??ber.","you_create_transfer":"Vytv??rate prevod.","you_create_deposit":"Vytv??rate vklad.","edit":"Upravi??","delete":"Odstr??ni??","name":"N??zov","profile_whoops":"Ajaj!","profile_something_wrong":"Nie??o sa pokazilo!","profile_try_again":"Nie??o sa pokazilo. Pros??m, sk??ste znova.","profile_oauth_clients":"OAuth klienti","profile_oauth_no_clients":"Zatia?? ste nevytvorili ??iadneho OAuth klienta.","profile_oauth_clients_header":"Klienti","profile_oauth_client_id":"ID klienta","profile_oauth_client_name":"Meno/N??zov","profile_oauth_client_secret":"Tajn?? k??????","profile_oauth_create_new_client":"Vytvori?? nov??ho klienta","profile_oauth_create_client":"Vytvori?? klienta","profile_oauth_edit_client":"Upravi?? klienta","profile_oauth_name_help":"Nie??o, ??o va??i pou??ivatelia poznaj?? a bud?? tomu d??verova??.","profile_oauth_redirect_url":"URL presmerovania","profile_oauth_redirect_url_help":"Sp??tn?? URL pre overenie autoriz??cie va??ej aplik??cie.","profile_authorized_apps":"Povolen?? aplik??cie","profile_authorized_clients":"Autorizovan?? klienti","profile_scopes":"Rozsahy","profile_revoke":"Odvola??","profile_personal_access_tokens":"Osobn?? pr??stupov?? tokeny","profile_personal_access_token":"Osobn?? pr??stupov?? token","profile_personal_access_token_explanation":"Toto je v???? nov?? osobn?? pr??stupov?? token. Toto je jedin?? raz, kedy sa zobraz?? - nestra??te ho! Odteraz ho m????ete pou????va?? pre pr??stup k API.","profile_no_personal_access_token":"E??te ste nevytvorili ??iadne osobn?? pr??stupov?? tokeny.","profile_create_new_token":"Vytvori?? nov?? token","profile_create_token":"Vytvori?? token","profile_create":"Vytvori??","profile_save_changes":"Ulo??i?? zmeny","default_group_title_name":"(nezoskupen??)","piggy_bank":"Pokladni??ka","profile_oauth_client_secret_title":"Tajn?? k?????? klienta","profile_oauth_client_secret_expl":"Toto je v???? tajn?? k?????? klienta. Toto je jedin?? raz, kedy sa zobraz?? - nestra??te ho! Odteraz m????ete tento tajn?? k?????? pou????va?? pre pr??stup k API.","profile_oauth_confidential":"D??vern??","profile_oauth_confidential_help":"Vy??adujte od klienta autentifik??ciu pomocou tajn??ho k??????a. D??vern?? klienti m????u uchov??va?? poverenia bezpe??n??m sp??sobom bez toho, aby boli vystaven?? neopr??vnen??m stran??m. Verejn?? aplik??cie, ako napr??klad nat??vna pracovn?? plocha alebo aplik??cie Java SPA, nedok????u tajn?? k??????e bezpe??ne uchova??.","multi_account_warning_unknown":"V z??vislosti od typu vytvorenej transakcie, m????e by?? zdrojov?? a/alebo cie??ov?? ????et n??sledn??ch roz????tovan?? prep??san?? ??dajmi v prvom rozdelen?? transakcie.","multi_account_warning_withdrawal":"Majte na pam??ti, ??e zdrojov?? bankov?? ????et n??sledn??ch roz????tovan?? bude prep??san?? t??m, ??o je definovan?? v prvom rozdelen?? v??beru.","multi_account_warning_deposit":"Majte na pam??ti, ??e zdrojov?? bankov?? ????et n??sledn??ch roz????tovan?? bude prep??san?? t??m, ??o je definovan?? v prvom roz????tovan?? vkladu.","multi_account_warning_transfer":"Majte na pam??ti, ??e zdrojov?? a cie??ov?? bankov?? ????et n??sledn??ch roz????tovan?? bude prep??san?? t??m, ??o je definovan?? v prvom roz????tovan?? prevodu."},"form":{"interest_date":"??rokov?? d??tum","book_date":"D??tum rezerv??cie","process_date":"D??tum spracovania","due_date":"D??tum splatnosti","foreign_amount":"Suma v cudzej mene","payment_date":"D??tum ??hrady","invoice_date":"D??tum vystavenia","internal_reference":"Intern?? referencia"},"config":{"html_language":"sk"}}');

/***/ }),

/***/ "./resources/assets/js/locales/sv.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/sv.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Vad spelas?","flash_error":"Fel!","flash_success":"Slutf??rd!","close":"St??ng","split_transaction_title":"Beskrivning av delad transaktion","errors_submission":"N??got fel uppstod med inskickningen. V??nligen kontrollera felen nedan.","split":"Dela","single_split":"Dela","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID} (\\"{title}\\")</a> sparades.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID}</a> (\\"{title}\\") uppdaterades.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID}</a> sparades.","transaction_journal_information":"Transaktionsinformation","no_budget_pointer":"Du verkar inte ha n??gra budgetar ??n. Du b??r skapa n??gra p?? <a href=\\"budgets\\">budgetar</a>-sidan. Budgetar kan hj??lpa dig att h??lla reda p?? utgifter.","no_bill_pointer":"Du verkar inte ha n??gra r??kningar ??nnu. Du b??r skapa n??gra p?? <a href=\\"bills\\">r??kningar</a>-sidan. R??kningar kan hj??lpa dig att h??lla reda p?? utgifter.","source_account":"K??llkonto","hidden_fields_preferences":"Du kan aktivera fler transaktionsalternativ i dina <a href=\\"preferences\\">inst??llningar</a>.","destination_account":"Till konto","add_another_split":"L??gga till en annan delning","submission":"Inskickning","create_another":"Efter sparat, ??terkom hit f??r att skapa ytterligare en.","reset_after":"??terst??ll formul??r efter inskickat","submit":"Skicka","amount":"Belopp","date":"Datum","tags":"Etiketter","no_budget":"(ingen budget)","no_bill":"(ingen r??kning)","category":"Kategori","attachments":"Bilagor","notes":"Noteringar","external_uri":"Extern URL","update_transaction":"Uppdatera transaktion","after_update_create_another":"Efter uppdaterat, ??terkom hit f??r att forts??tta redigera.","store_as_new":"Spara en ny transaktion ist??llet f??r att uppdatera.","split_title_help":"Om du skapar en delad transaktion m??ste det finnas en global beskrivning f??r alla delningar av transaktionen.","none_in_select_list":"(Ingen)","no_piggy_bank":"(ingen spargris)","description":"Beskrivning","split_transaction_title_help":"Om du skapar en delad transaktion m??ste det finnas en global beskrivning f??r alla delningar av transaktionen.","destination_account_reconciliation":"Du kan inte redigera destinationskontot f??r en avst??mningstransaktion.","source_account_reconciliation":"Du kan inte redigera k??llkontot f??r en avst??mningstransaktion.","budget":"Budget","bill":"Nota","you_create_withdrawal":"Du skapar ett uttag.","you_create_transfer":"Du skapar en ??verf??ring.","you_create_deposit":"Du skapar en ins??ttning.","edit":"Redigera","delete":"Ta bort","name":"Namn","profile_whoops":"Hoppsan!","profile_something_wrong":"N??got gick fel!","profile_try_again":"N??got gick fel. F??rs??k igen.","profile_oauth_clients":"OAuth klienter","profile_oauth_no_clients":"Du har inte skapat n??gra OAuth klienter.","profile_oauth_clients_header":"Klienter","profile_oauth_client_id":"Klient ID","profile_oauth_client_name":"Namn","profile_oauth_client_secret":"Hemlighet","profile_oauth_create_new_client":"Skapa ny klient","profile_oauth_create_client":"Skapa klient","profile_oauth_edit_client":"Redigera klient","profile_oauth_name_help":"N??got som dina anv??ndare kommer att k??nna igen och lita p??.","profile_oauth_redirect_url":"Omdirigera URL","profile_oauth_redirect_url_help":"Din applikations auktorisering callback URL.","profile_authorized_apps":"Auktoriserade applikationer","profile_authorized_clients":"Auktoriserade klienter","profile_scopes":"Omfattningar","profile_revoke":"??terkalla","profile_personal_access_tokens":"Personliga ??tkomst-Tokens","profile_personal_access_token":"Personlig ??tkomsttoken","profile_personal_access_token_explanation":"H??r ??r din nya personliga tillg??ngs token. Detta ??r den enda g??ngen det kommer att visas s?? f??rlora inte det! Du kan nu anv??nda denna token f??r att g??ra API-f??rfr??gningar.","profile_no_personal_access_token":"Du har inte skapat n??gra personliga ??tkomsttokens.","profile_create_new_token":"Skapa ny token","profile_create_token":"Skapa token","profile_create":"Skapa","profile_save_changes":"Spara ??ndringar","default_group_title_name":"(ogrupperad)","piggy_bank":"Spargris","profile_oauth_client_secret_title":"Klienthemlighet","profile_oauth_client_secret_expl":"H??r ??r din nya klient hemlighet. Detta ??r den enda g??ngen det kommer att visas s?? f??rlora inte det! Du kan nu anv??nda denna hemlighet f??r att g??ra API-f??rfr??gningar.","profile_oauth_confidential":"Konfidentiell","profile_oauth_confidential_help":"Kr??v att klienten autentiserar med en hemlighet. Konfidentiella klienter kan h??lla autentiseringsuppgifter p?? ett s??kert s??tt utan att uts??tta dem f??r obeh??riga parter. Publika applikationer, som skrivbord eller JavaScript-SPA-applikationer, kan inte h??lla hemligheter p?? ett s??kert s??tt.","multi_account_warning_unknown":"Beroende p?? vilken typ av transaktion du skapar, k??llan och/eller destinationskontot f??r efterf??ljande delningar kan ??sidos??ttas av vad som ??n definieras i den f??rsta delningen av transaktionen.","multi_account_warning_withdrawal":"T??nk p?? att k??llkontot f??r efterf??ljande uppdelningar kommer att upph??vas av vad som ??n definieras i den f??rsta uppdelningen av uttaget.","multi_account_warning_deposit":"T??nk p?? att destinationskontot f??r efterf??ljande uppdelningar kommer att styras av vad som ??n definieras i den f??rsta uppdelningen av ins??ttningen.","multi_account_warning_transfer":"T??nk p?? att k??ll + destinationskonto av efterf??ljande delningar kommer att styras av vad som definieras i den f??rsta uppdelningen av ??verf??ringen."},"form":{"interest_date":"R??ntedatum","book_date":"Bokf??ringsdatum","process_date":"Behandlingsdatum","due_date":"F??rfallodatum","foreign_amount":"Utl??ndskt belopp","payment_date":"Betalningsdatum","invoice_date":"Fakturadatum","internal_reference":"Intern referens"},"config":{"html_language":"sv"}}');

/***/ }),

/***/ "./resources/assets/js/locales/vi.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/vi.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Ch??o m???ng tr??? l???i?","flash_error":"L???i!","flash_success":"Th??nh c??ng!","close":"????ng","split_transaction_title":"M?? t??? giao d???ch t??ch","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Chia ra","single_split":"Chia ra","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Giao d???ch #{ID} (\\"{title}\\")</a> ???? ???????c l??u tr???.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\"> Giao d???ch #{ID}</a> ???? ???????c l??u tr???.","transaction_journal_information":"Th??ng tin giao d???ch","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Ngu???n t??i kho???n","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"T??i kho???n ????ch","add_another_split":"Th??m m???t ph??n chia kh??c","submission":"G???i","create_another":"Sau khi l??u tr???, quay tr??? l???i ????y ????? t???o m???t c??i kh??c.","reset_after":"?????t l???i m???u sau khi g???i","submit":"G???i","amount":"S??? ti???n","date":"Ng??y","tags":"Nh??n","no_budget":"(kh??ng c?? ng??n s??ch)","no_bill":"(no bill)","category":"Danh m???c","attachments":"T???p ????nh k??m","notes":"Ghi ch??","external_uri":"URL b??n ngo??i","update_transaction":"C???p nh???t giao d???ch","after_update_create_another":"Sau khi c???p nh???t, quay l???i ????y ????? ti???p t???c ch???nh s???a.","store_as_new":"L??u tr??? nh?? m???t giao d???ch m???i thay v?? c???p nh???t.","split_title_help":"N???u b???n t???o m???t giao d???ch ph??n t??ch, ph???i c?? m???t m?? t??? to??n c???u cho t???t c??? c??c ph??n chia c???a giao d???ch.","none_in_select_list":"(Tr???ng)","no_piggy_bank":"(ch??a c?? heo ?????t)","description":"S??? mi??u t???","split_transaction_title_help":"N???u b???n t???o m???t giao d???ch ph??n t??ch, ph???i c?? m???t m?? t??? to??n c???u cho t???t c??? c??c ph??n chia c???a giao d???ch.","destination_account_reconciliation":"B???n kh??ng th??? ch???nh s???a t??i kho???n ????ch c???a giao d???ch ?????i chi???u.","source_account_reconciliation":"B???n kh??ng th??? ch???nh s???a t??i kho???n ngu???n c???a giao d???ch ?????i chi???u.","budget":"Ng??n s??ch","bill":"H??a ????n","you_create_withdrawal":"B???n ??ang t???o m???t <strong>r??t ti???n</strong>.","you_create_transfer":"B???n ??ang t???o m???t <strong>chuy???n kho???n</strong>.","you_create_deposit":"B???n ??ang t???o m???t <strong>ti???n g???i</strong>.","edit":"S???a","delete":"X??a","name":"T??n","profile_whoops":"R???t ti???c!","profile_something_wrong":"C?? l???i x???y ra!","profile_try_again":"Xa??y ra l????i. Vui lo??ng th???? la??i.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"B???n ???? kh??ng t???o ra b???t k??? OAuth clients n??o.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"T??n","profile_oauth_client_secret":"M?? b?? m???t","profile_oauth_create_new_client":"T???o m???i Client","profile_oauth_create_client":"T???o Client","profile_oauth_edit_client":"S???a Client","profile_oauth_name_help":"M???t c??i g?? ???? ng?????i d??ng c???a b???n s??? nh???n ra v?? tin t?????ng.","profile_oauth_redirect_url":"URL chuy???n ti???p","profile_oauth_redirect_url_help":"URL g???i l???i ???y quy???n c???a ???ng d???ng c???a b???n.","profile_authorized_apps":"U??? quy???n ???ng d???ng","profile_authorized_clients":"Client ???y quy???n","profile_scopes":"Ph???m vi","profile_revoke":"Thu h???i","profile_personal_access_tokens":"M?? truy c???p c?? nh??n","profile_personal_access_token":"M?? truy c???p c?? nh??n","profile_personal_access_token_explanation":"????y l?? m?? th??ng b??o truy c???p c?? nh??n m???i c???a b???n. ????y l?? l???n duy nh???t n?? s??? ???????c hi???n th??? v?? v???y ?????ng ????nh m???t n??! B??y gi??? b???n c?? th??? s??? d???ng m?? th??ng b??o n??y ????? th???c hi???n API.","profile_no_personal_access_token":"B???n ch??a t???o b???t k??? m?? th??ng b??o truy c???p c?? nh??n n??o.","profile_create_new_token":"T???o m?? m???i","profile_create_token":"T???o m??","profile_create":"T???o","profile_save_changes":"L??u thay ?????i","default_group_title_name":"(ch??a nh??m)","piggy_bank":"Heo ?????t","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Ng??y l??i","book_date":"Ng??y ?????t s??ch","process_date":"Ng??y x??? l??","due_date":"Ng??y ????o h???n","foreign_amount":"Ngo???i t???","payment_date":"Ng??y thanh to??n","invoice_date":"Ng??y h??a ????n","internal_reference":"T??i li???u tham kh???o n???i b???"},"config":{"html_language":"vi"}}');

/***/ }),

/***/ "./resources/assets/js/locales/zh-cn.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/zh-cn.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"?????????????????????","flash_error":"?????????","flash_success":"?????????","close":"??????","split_transaction_title":"?????????????????????","errors_submission":"???????????????????????????????????????????????????","split":"??????","single_split":"??????","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">?????? #{ID} (???{title}???)</a> ????????????","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">?????? #{ID}</a> ????????????","transaction_journal_information":"????????????","no_budget_pointer":"?????????????????????????????????<a href=\\"budgets\\">????????????</a>???????????????????????????????????????????????????","no_bill_pointer":"?????????????????????????????????<a href=\\"bills\\">????????????</a>???????????????????????????????????????????????????","source_account":"????????????","hidden_fields_preferences":"????????????<a href=\\"preferences\\">????????????</a>??????????????????????????????","destination_account":"????????????","add_another_split":"?????????????????????","submission":"??????","create_another":"?????????????????????????????????????????????","reset_after":"?????????????????????","submit":"??????","amount":"??????","date":"??????","tags":"??????","no_budget":"(?????????)","no_bill":"(?????????)","category":"??????","attachments":"??????","notes":"??????","external_uri":"????????????","update_transaction":"????????????","after_update_create_another":"??????????????????????????????????????????","store_as_new":"?????????????????????????????????????????????","split_title_help":"????????????????????????????????????????????????????????????????????????????????????","none_in_select_list":"(???)","no_piggy_bank":"(????????????)","description":"??????","split_transaction_title_help":"????????????????????????????????????????????????????????????????????????????????????","destination_account_reconciliation":"??????????????????????????????????????????","source_account_reconciliation":"?????????????????????????????????????????????","budget":"??????","bill":"??????","you_create_withdrawal":"???????????????????????????","you_create_transfer":"???????????????????????????","you_create_deposit":"???????????????????????????","edit":"??????","delete":"??????","name":"??????","profile_whoops":"????????????","profile_something_wrong":"???????????????","profile_try_again":"?????????????????????????????????","profile_oauth_clients":"OAuth ?????????","profile_oauth_no_clients":"????????????????????? OAuth ????????????","profile_oauth_clients_header":"?????????","profile_oauth_client_id":"????????? ID","profile_oauth_client_name":"??????","profile_oauth_client_secret":"??????","profile_oauth_create_new_client":"??????????????????","profile_oauth_create_client":"???????????????","profile_oauth_edit_client":"???????????????","profile_oauth_name_help":"??????????????????????????????????????????","profile_oauth_redirect_url":"????????????","profile_oauth_redirect_url_help":"???????????????????????????????????????","profile_authorized_apps":"???????????????","profile_authorized_clients":"??????????????????","profile_scopes":"??????","profile_revoke":"??????","profile_personal_access_tokens":"??????????????????","profile_personal_access_token":"??????????????????","profile_personal_access_token_explanation":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? API ?????????","profile_no_personal_access_token":"???????????????????????????????????????","profile_create_new_token":"???????????????","profile_create_token":"????????????","profile_create":"??????","profile_save_changes":"????????????","default_group_title_name":"(?????????)","piggy_bank":"?????????","profile_oauth_client_secret_title":"???????????????","profile_oauth_client_secret_expl":"??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? API ?????????","profile_oauth_confidential":"????????????","profile_oauth_confidential_help":"????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? JavaScript SPA ????????????????????????????????????????????????","multi_account_warning_unknown":"?????????????????????????????????????????????????????????/??????????????????????????????????????????????????????????????????","multi_account_warning_withdrawal":"??????????????????????????????????????????????????????????????????????????????????????????","multi_account_warning_deposit":"??????????????????????????????????????????????????????????????????????????????????????????","multi_account_warning_transfer":"???????????????????????????????????????????????????????????????????????????????????????????????????"},"form":{"interest_date":"????????????","book_date":"????????????","process_date":"????????????","due_date":"?????????","foreign_amount":"????????????","payment_date":"????????????","invoice_date":"????????????","internal_reference":"????????????"},"config":{"html_language":"zh-cn"}}');

/***/ }),

/***/ "./resources/assets/js/locales/zh-tw.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/zh-tw.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"?????????","flash_success":"?????????","close":"??????","split_transaction_title":"?????????????????????","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"??????","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"????????????","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","add_another_split":"????????????","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"??????","amount":"??????","date":"??????","tags":"??????","no_budget":"(?????????)","no_bill":"(no bill)","category":"??????","attachments":"????????????","notes":"??????","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"???????????????????????????????????????????????????????????????????????????????????????","none_in_select_list":"(???)","no_piggy_bank":"(no piggy bank)","description":"??????","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"??????","bill":"??????","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"??????","delete":"??????","name":"??????","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"????????????","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"????????????","book_date":"????????????","process_date":"????????????","due_date":"?????????","foreign_amount":"????????????","payment_date":"????????????","invoice_date":"????????????","internal_reference":"????????????"},"config":{"html_language":"zh-tw"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************************!*\
  !*** ./resources/assets/js/yearly_overview.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_real_estate_management_YearlyOverview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/real_estate_management/YearlyOverview */ "./resources/assets/js/components/real_estate_management/YearlyOverview.vue");
/* harmony import */ var _components_transactions_CustomAttachments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/transactions/CustomAttachments */ "./resources/assets/js/components/transactions/CustomAttachments.vue");
/* harmony import */ var _components_transactions_CreateTransaction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/transactions/CreateTransaction */ "./resources/assets/js/components/transactions/CreateTransaction.vue");
/* harmony import */ var _components_real_estate_management_CustomDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/real_estate_management/CustomDate */ "./resources/assets/js/components/real_estate_management/CustomDate.vue");
/* harmony import */ var _components_transactions_CustomString__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/transactions/CustomString */ "./resources/assets/js/components/transactions/CustomString.vue");
/* harmony import */ var _components_transactions_CustomTextarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/transactions/CustomTextarea */ "./resources/assets/js/components/transactions/CustomTextarea.vue");
/* harmony import */ var _components_transactions_StandardDate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/transactions/StandardDate */ "./resources/assets/js/components/transactions/StandardDate.vue");
/* harmony import */ var _components_transactions_GroupDescription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/transactions/GroupDescription */ "./resources/assets/js/components/transactions/GroupDescription.vue");
/* harmony import */ var _components_transactions_TransactionDescription__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/transactions/TransactionDescription */ "./resources/assets/js/components/transactions/TransactionDescription.vue");
/* harmony import */ var _components_transactions_CustomTransactionFields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/transactions/CustomTransactionFields */ "./resources/assets/js/components/transactions/CustomTransactionFields.vue");
/* harmony import */ var _components_transactions_PiggyBank__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/transactions/PiggyBank */ "./resources/assets/js/components/transactions/PiggyBank.vue");
/* harmony import */ var _components_transactions_Tags__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/transactions/Tags */ "./resources/assets/js/components/transactions/Tags.vue");
/* harmony import */ var _components_transactions_Category__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/transactions/Category */ "./resources/assets/js/components/transactions/Category.vue");
/* harmony import */ var _components_transactions_Amount__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/transactions/Amount */ "./resources/assets/js/components/transactions/Amount.vue");
/* harmony import */ var _components_transactions_ForeignAmountSelect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/transactions/ForeignAmountSelect */ "./resources/assets/js/components/transactions/ForeignAmountSelect.vue");
/* harmony import */ var _components_transactions_TransactionType__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/transactions/TransactionType */ "./resources/assets/js/components/transactions/TransactionType.vue");
/* harmony import */ var _components_transactions_AccountSelect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/transactions/AccountSelect */ "./resources/assets/js/components/transactions/AccountSelect.vue");
/* harmony import */ var _components_transactions_Budget__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/transactions/Budget */ "./resources/assets/js/components/transactions/Budget.vue");
/* harmony import */ var _components_transactions_CustomUri__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/transactions/CustomUri */ "./resources/assets/js/components/transactions/CustomUri.vue");
/* harmony import */ var _components_transactions_Bill__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/transactions/Bill */ "./resources/assets/js/components/transactions/Bill.vue");
/*
 * create_transactions.js
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




















/**
 * First we will load Axios via bootstrap.js
 * jquery and bootstrap-sass preloaded in app.js
 * vue, uiv and vuei18n are in app_vue.js
 */

__webpack_require__(/*! ./bootstrap */ "./resources/assets/js/bootstrap.js"); // components for create and edit transactions.


Vue.component('budget', _components_transactions_Budget__WEBPACK_IMPORTED_MODULE_17__["default"]);
Vue.component('bill', _components_transactions_Bill__WEBPACK_IMPORTED_MODULE_19__["default"]);
Vue.component('custom-date', _components_real_estate_management_CustomDate__WEBPACK_IMPORTED_MODULE_3__["default"]);
Vue.component('custom-string', _components_transactions_CustomString__WEBPACK_IMPORTED_MODULE_4__["default"]);
Vue.component('custom-attachments', _components_transactions_CustomAttachments__WEBPACK_IMPORTED_MODULE_1__["default"]);
Vue.component('custom-textarea', _components_transactions_CustomTextarea__WEBPACK_IMPORTED_MODULE_5__["default"]);
Vue.component('custom-uri', _components_transactions_CustomUri__WEBPACK_IMPORTED_MODULE_18__["default"]);
Vue.component('standard-date', _components_transactions_StandardDate__WEBPACK_IMPORTED_MODULE_6__["default"]);
Vue.component('group-description', _components_transactions_GroupDescription__WEBPACK_IMPORTED_MODULE_7__["default"]);
Vue.component('transaction-description', _components_transactions_TransactionDescription__WEBPACK_IMPORTED_MODULE_8__["default"]);
Vue.component('custom-transaction-fields', _components_transactions_CustomTransactionFields__WEBPACK_IMPORTED_MODULE_9__["default"]);
Vue.component('piggy-bank', _components_transactions_PiggyBank__WEBPACK_IMPORTED_MODULE_10__["default"]);
Vue.component('tags', _components_transactions_Tags__WEBPACK_IMPORTED_MODULE_11__["default"]);
Vue.component('category', _components_transactions_Category__WEBPACK_IMPORTED_MODULE_12__["default"]);
Vue.component('amount', _components_transactions_Amount__WEBPACK_IMPORTED_MODULE_13__["default"]);
Vue.component('foreign-amount', _components_transactions_ForeignAmountSelect__WEBPACK_IMPORTED_MODULE_14__["default"]);
Vue.component('transaction-type', _components_transactions_TransactionType__WEBPACK_IMPORTED_MODULE_15__["default"]);
Vue.component('account-select', _components_transactions_AccountSelect__WEBPACK_IMPORTED_MODULE_16__["default"]);
Vue.component('create-transaction', _components_transactions_CreateTransaction__WEBPACK_IMPORTED_MODULE_2__["default"]);
Vue.component('yearly-overview', _components_real_estate_management_YearlyOverview__WEBPACK_IMPORTED_MODULE_0__["default"]);

var i18n = __webpack_require__(/*! ./i18n */ "./resources/assets/js/i18n.js");

var props = {};
new Vue({
  i18n: i18n,
  el: "#yearly_overview",
  render: function render(createElement) {
    return createElement(_components_real_estate_management_YearlyOverview__WEBPACK_IMPORTED_MODULE_0__["default"], {
      props: props
    });
  }
});
})();

/******/ })()
;