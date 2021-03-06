/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    inputName: String,
    defaultValue: String,
    inputDescription: String,
    index: Number,
    transactionType: String,
    error: String,
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
      return this.error !== '';
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {};
  },
  props: ["label", "type", "placeholder", "value", "requried", "error", "disabled", "index"],
  methods: {
    handleInput: function handleInput() {
      this.$emit("input", this.$refs.descr.value);
      this.$emit("customInput", {
        value: this.$refs.descr.value,
        index: this.index
      });
    },
    clearDescription: function clearDescription() {
      this.description = '';
      this.$refs.descr.value = '';
      this.$emit('input', this.$refs.descr.value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "EditApartment",
  components: {},
  created: function created() {
    this.id = location.href.substring(location.href.lastIndexOf('/') + 1).split('?')[0];

    if (this.id) {
      this.getApartmentData(this.id);
    }
  },
  methods: {
    getApartmentData: function getApartmentData(id) {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get("./api/v1/real-estate-management/apartment?id=".concat(id)).then(function (_ref) {
        var _data$apartment, _data$apartment2, _data$apartment3, _data$apartment4, _data$apartment5, _data$apartment6, _data$apartment7, _data$apartment8, _data$apartment9, _data$apartment10;

        var data = _ref.data;
        _this.id = (_data$apartment = data.apartment) === null || _data$apartment === void 0 ? void 0 : _data$apartment.id;
        _this.apartmentNo = (_data$apartment2 = data.apartment) === null || _data$apartment2 === void 0 ? void 0 : _data$apartment2.apartmentNo;
        _this.utilities = (_data$apartment3 = data.apartment) === null || _data$apartment3 === void 0 ? void 0 : _data$apartment3.utilities;
        _this.rawRent = (_data$apartment4 = data.apartment) === null || _data$apartment4 === void 0 ? void 0 : _data$apartment4.rawRent;
        _this.utilitiesTotal = (_data$apartment5 = data.apartment) === null || _data$apartment5 === void 0 ? void 0 : _data$apartment5.utilitiesTotal;
        _this.vat = (_data$apartment6 = data.apartment) === null || _data$apartment6 === void 0 ? void 0 : _data$apartment6.vat;
        _this.totalRent = (_data$apartment7 = data.apartment) === null || _data$apartment7 === void 0 ? void 0 : _data$apartment7.totalRent;
        _this.sourceAccount = (_data$apartment8 = data.apartment) === null || _data$apartment8 === void 0 ? void 0 : _data$apartment8.source_account;
        _this.renterAccount = (_data$apartment9 = data.apartment) === null || _data$apartment9 === void 0 ? void 0 : _data$apartment9.renter_account;
        _this.expenseAccount = (_data$apartment10 = data.apartment) === null || _data$apartment10 === void 0 ? void 0 : _data$apartment10.expense_account;
      });
    },
    clearDestination: function clearDestination() {
      this.sourceAccount = null;
    },
    selectedDestinationAccount: function selectedDestinationAccount(model) {
      if (typeof model === "string") {
        this.sourceAccount = {
          name: model
        };
      } else {
        this.sourceAccount = model;
      }
    },
    clearRevenue: function clearRevenue() {
      this.renterAccount = null;
    },
    selectedRevenueAccount: function selectedRevenueAccount(model) {
      if (typeof model === "string") {
        this.renterAccount = {
          name: model
        };
      } else {
        this.renterAccount = model;
      }
    },
    clearExpense: function clearExpense() {
      this.expenseAccount = null;
    },
    selectedExpenseAccount: function selectedExpenseAccount(model) {
      if (typeof model === "string") {
        this.expenseAccount = {
          name: model
        };
      } else {
        this.expenseAccount = model;
      }
    },
    submit: function submit(e) {
      var _this2 = this;

      var uri = "./api/v1/real-estate-management?_token=" + document.head.querySelector('meta[name="csrf-token"]').content;
      var data = {
        id: this.id,
        apartmentNo: this.apartmentNo,
        utilities: this.utilities,
        rawRent: this.rawRent,
        utilitiesTotal: this.utilitiesTotal,
        vat: this.vat,
        totalRent: this.totalRent,
        sourceAccount: this.sourceAccount,
        renterAccount: this.renterAccount,
        expenseAccount: this.expenseAccount,
        createAnother: this.createAnother,
        resetFormAfter: this.resetFormAfter
      };
      var error = false;

      if (this.apartmentNo === "") {
        this.apartmentNoError = "Apartment No is invalid";
        error = true;
      } else {
        this.apartmentNoError = "";
      }

      if (this.utilities === "") {
        this.utilitiesError = "Utilities is invalid";
        error = true;
      } else {
        this.utilitiesError = "";
      }

      if (this.rawRent === "") {
        this.rawRentError = "Raw Rent is invalid";
        error = true;
      } else {
        this.rawRentError = "";
      }

      if (this.utilitiesTotal === "") {
        this.utilitiesTotalError = "Utilities Total is invalid";
        error = true;
      } else {
        this.utilitiesTotalError = "";
      }

      if (this.vat === "") {
        this.vatError = "Vat is invalid";
        error = true;
      } else {
        this.vatError = "";
      }

      if (this.totalRent === "") {
        this.totalRentError = "Total Rent is invalid";
        error = true;
      } else {
        this.totalRentError = "";
      }

      if (this.sourceAccount === null) {
        this.sourceAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.sourceAccountError = "";
      }

      if (this.renterAccount === null) {
        this.renterAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.renterAccountError = "";
      }

      if (this.expenseAccount === null) {
        this.expenseAccountError = "Source Account is invalid";
        error = true;
      } else {
        this.expenseAccountError = "";
      }

      if (error) {
        this.error = "There was something wrong with your submission. Please check out the errors.";
        return;
      }

      var button = $("#submitButton");
      button.prop("disabled", true);
      axios__WEBPACK_IMPORTED_MODULE_0___default().put(uri, data).then(function () {
        button.removeAttr("disabled");
        location.href = "/real-estate-management/index";
      })["catch"](function (error) {
        console.error(error);

        _this2.parseErrors(error.response.data);

        button.removeAttr("disabled");
      });

      if (e) {
        e.preventDefault();
      }
    }
  },

  /*
   * The component's data.
   */
  data: function data() {
    return {
      id: '',
      error: "",
      apartmentNo: "",
      apartmentNoError: "",
      utilities: 0,
      utilitiesError: "",
      rawRent: "",
      rawRentError: "",
      utilitiesTotal: "",
      utilitiesTotalError: "",
      vat: "",
      vatError: "",
      totalRent: "",
      totalRentError: "",
      sourceAccount: null,
      sourceAccountError: "",
      renterAccount: null,
      renterAccountError: "",
      expenseAccount: null,
      expenseAccountError: "",
      createAnother: "",
      resetFormAfter: true
    };
  }
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

/***/ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomAutocomplete.vue?vue&type=template&id=33ce73a8& */ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8&");
/* harmony import */ var _CustomAutocomplete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomAutocomplete.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomAutocomplete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/CustomAutocomplete.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomInput.vue":
/*!*******************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomInput.vue ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomInput.vue?vue&type=template&id=034ec736& */ "./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736&");
/* harmony import */ var _CustomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomInput.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CustomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__.render,
  _CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/CustomInput.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/EditApartment.vue":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/EditApartment.vue ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditApartment.vue?vue&type=template&id=131e5836& */ "./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836&");
/* harmony import */ var _EditApartment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditApartment.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditApartment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__.render,
  _EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/EditApartment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAutocomplete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomAutocomplete.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAutocomplete_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApartment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditApartment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApartment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8& ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomAutocomplete_vue_vue_type_template_id_33ce73a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomAutocomplete.vue?vue&type=template&id=33ce73a8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8&");


/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736& ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomInput_vue_vue_type_template_id_034ec736___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CustomInput.vue?vue&type=template&id=034ec736& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736&");


/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836& ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApartment_vue_vue_type_template_id_131e5836___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditApartment.vue?vue&type=template&id=131e5836& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue?vue&type=template&id=33ce73a8& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
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
              domProps: { value: _vm.defaultValue },
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
                      {
                        key: index,
                        class: { active: props.activeIndex === index }
                      },
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
          _vm.hasError()
            ? _c("div", { staticClass: "text-danger" }, [
                _vm._v(_vm._s(_vm.error))
              ])
            : _vm._e()
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/CustomInput.vue?vue&type=template&id=034ec736& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "form-group", class: { "has-error": _vm.error !== "" } },
    [
      _c("div", { staticClass: "col-sm-12 text-sm" }, [
        _vm._v("\n    " + _vm._s(_vm.label) + "\n  ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-12" }, [
        _c("div", { staticClass: "input-group" }, [
          _c("input", {
            ref: "descr",
            staticClass: "form-control",
            attrs: {
              title: _vm.label,
              type: _vm.type ? _vm.type : "text",
              autocomplete: "off",
              name: "description[]",
              placeholder: _vm.placeholder,
              "required:": "",
              required: "",
              disabled: _vm.disabled
            },
            domProps: { value: _vm.value },
            on: { input: _vm.handleInput }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "input-group-btn" }, [
            !_vm.disabled
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: {
                      tabIndex: "-1",
                      type: "button",
                      disabled: _vm.disabled
                    },
                    on: { click: _vm.clearDescription }
                  },
                  [_c("i", { staticClass: "fa fa-trash-o" })]
                )
              : _vm._e()
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.error !== ""
        ? _c("div", { staticClass: "text-danger col-sm-12" }, [
            _vm._v(_vm._s(_vm.error))
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/EditApartment.vue?vue&type=template&id=131e5836& ***!
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
    "form",
    {
      staticClass: "form-horizontal",
      attrs: { "accept-charset": "UTF-8", enctype: "multipart/form-data" }
    },
    [
      _vm.error !== ""
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
                  _vm._v(" " + _vm._s(_vm.error) + "\n      ")
                ]
              )
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "box" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "box-body" },
          [
            _c("custom-input", {
              attrs: {
                label: "Apartment No",
                placeholder: "Apartment No",
                value: "",
                type: "text",
                error: _vm.apartmentNoError
              },
              model: {
                value: _vm.apartmentNo,
                callback: function($$v) {
                  _vm.apartmentNo = $$v
                },
                expression: "apartmentNo"
              }
            }),
            _vm._v(" "),
            _c("custom-autocomplete", {
              attrs: {
                accountName: "",
                accountTypeFilters: ["Revenue account"],
                defaultAccountTypeFilters: [],
                error: _vm.renterAccountError,
                transactionType: "",
                inputDescription: _vm.$t("firefly.renter_name"),
                defaultValue: _vm.renterAccount ? _vm.renterAccount.name : ""
              },
              on: {
                "clear:value": function($event) {
                  return _vm.clearRevenue()
                },
                "select:account": function($event) {
                  return _vm.selectedRevenueAccount($event)
                }
              }
            }),
            _vm._v(" "),
            _c("custom-input", {
              attrs: {
                label: "Utilities %",
                placeholder: "Utilities %",
                value: "",
                error: _vm.utilitiesError,
                type: "text"
              },
              model: {
                value: _vm.utilities,
                callback: function($$v) {
                  _vm.utilities = $$v
                },
                expression: "utilities"
              }
            }),
            _vm._v(" "),
            _c("custom-input", {
              attrs: {
                label: "Raw Rent",
                placeholder: "Raw Rent",
                value: "",
                error: _vm.rawRentError,
                type: "text"
              },
              model: {
                value: _vm.rawRent,
                callback: function($$v) {
                  _vm.rawRent = $$v
                },
                expression: "rawRent"
              }
            }),
            _vm._v(" "),
            _c("custom-input", {
              attrs: {
                label: "Utilities Total",
                placeholder: "Utilities Total",
                value: "",
                error: _vm.utilitiesTotalError,
                type: "text"
              },
              model: {
                value: _vm.utilitiesTotal,
                callback: function($$v) {
                  _vm.utilitiesTotal = $$v
                },
                expression: "utilitiesTotal"
              }
            }),
            _vm._v(" "),
            _c("custom-input", {
              attrs: {
                label: "Vat %",
                placeholder: "Vat %",
                value: "",
                error: _vm.vatError,
                type: "text"
              },
              model: {
                value: _vm.vat,
                callback: function($$v) {
                  _vm.vat = $$v
                },
                expression: "vat"
              }
            }),
            _vm._v(" "),
            _c("custom-input", {
              attrs: {
                label: "Total Rent",
                placeholder: "Total Rent",
                value: "",
                error: _vm.totalRentError,
                type: "text"
              },
              model: {
                value: _vm.totalRent,
                callback: function($$v) {
                  _vm.totalRent = $$v
                },
                expression: "totalRent"
              }
            }),
            _vm._v(" "),
            _c("custom-autocomplete", {
              attrs: {
                accountName: "",
                accountTypeFilters: ["Asset account"],
                defaultAccountTypeFilters: [],
                error: _vm.sourceAccountError,
                transactionType: "",
                inputDescription: _vm.$t("firefly.diposit_account"),
                defaultValue: _vm.sourceAccount ? _vm.sourceAccount.name : ""
              },
              on: {
                "clear:value": function($event) {
                  return _vm.clearDestination()
                },
                "select:account": function($event) {
                  return _vm.selectedDestinationAccount($event)
                }
              }
            }),
            _vm._v(" "),
            _c("custom-autocomplete", {
              attrs: {
                accountName: "",
                accountTypeFilters: ["Expense account"],
                defaultAccountTypeFilters: [],
                error: _vm.expenseAccountError,
                transactionType: "",
                inputDescription: _vm.$t("firefly.expense_account"),
                defaultValue: _vm.expenseAccount ? _vm.expenseAccount.name : ""
              },
              on: {
                "clear:value": function($event) {
                  return _vm.clearExpense()
                },
                "select:account": function($event) {
                  return _vm.selectedExpenseAccount($event)
                }
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "box" }, [
        _c("div", { staticClass: "box-header with-border" }, [
          _c("h3", { staticClass: "box-title" }, [
            _vm._v(
              "\n        " + _vm._s(_vm.$t("firefly.submission")) + "\n      "
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
                attrs: { id: "submitButton", type: "button" },
                on: { click: _vm.submit }
              },
              [
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.$t("firefly.submit")) +
                    "\n        "
                )
              ]
            )
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "box-header" }, [
      _c("h3", { staticClass: "box-title splitTitle" }, [
        _vm._v("Edit Apartment")
      ])
    ])
  }
]
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
/*!***********************************************!*\
  !*** ./resources/assets/js/edit_apartment.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_real_estate_management_CustomInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/real_estate_management/CustomInput */ "./resources/assets/js/components/real_estate_management/CustomInput.vue");
/* harmony import */ var _components_real_estate_management_EditApartment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/real_estate_management/EditApartment */ "./resources/assets/js/components/real_estate_management/EditApartment.vue");
/* harmony import */ var _components_real_estate_management_CustomAutocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/real_estate_management/CustomAutocomplete */ "./resources/assets/js/components/real_estate_management/CustomAutocomplete.vue");
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

__webpack_require__(/*! ./bootstrap */ "./resources/assets/js/bootstrap.js");

Vue.component('edit-apartment', _components_real_estate_management_EditApartment__WEBPACK_IMPORTED_MODULE_1__["default"]);
Vue.component('custom-input', _components_real_estate_management_CustomInput__WEBPACK_IMPORTED_MODULE_0__["default"]);
Vue.component('custom-autocomplete', _components_real_estate_management_CustomAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"]);

var i18n = __webpack_require__(/*! ./i18n */ "./resources/assets/js/i18n.js");

var props = {};
new Vue({
  i18n: i18n,
  el: "#edit_apartment",
  render: function render(createElement) {
    return createElement(_components_real_estate_management_EditApartment__WEBPACK_IMPORTED_MODULE_1__["default"], {
      props: props
    });
  }
});
})();

/******/ })()
;