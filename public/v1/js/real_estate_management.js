/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@xmldom/xmldom/lib/conventions.js":
/*!********************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/conventions.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */
var MIME_TYPE = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
})

/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */
	isHTML: function (uri) {
		return uri === NAMESPACE.HTML
	},

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
})

exports.freeze = freeze;
exports.MIME_TYPE = MIME_TYPE;
exports.NAMESPACE = NAMESPACE;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/dom-parser.js":
/*!*******************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/dom-parser.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var conventions = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js");
var dom = __webpack_require__(/*! ./dom */ "./node_modules/@xmldom/xmldom/lib/dom.js")
var entities = __webpack_require__(/*! ./entities */ "./node_modules/@xmldom/xmldom/lib/entities.js");
var sax = __webpack_require__(/*! ./sax */ "./node_modules/@xmldom/xmldom/lib/sax.js");

var DOMImplementation = dom.DOMImplementation;

var NAMESPACE = conventions.NAMESPACE;

var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;

function DOMParser(options){
	this.options = options ||{locator:{}};
}

DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap[''] = NAMESPACE.HTML;
	}
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
	if(source && typeof source === 'string'){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;

		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},

	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},

	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
					this.doc.doctype = dt;
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		throw new ParseError(error, this.locator);
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

exports.__DOMHandler = DOMHandler;
exports.DOMParser = DOMParser;

/**
 * @deprecated Import/require from main entry point instead
 */
exports.DOMImplementation = dom.DOMImplementation;

/**
 * @deprecated Import/require from main entry point instead
 */
exports.XMLSerializer = dom.XMLSerializer;


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/dom.js":
/*!************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/dom.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var conventions = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js");

var NAMESPACE = conventions.NAMESPACE;

/**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */
function notEmptyString (input) {
	return input !== ''
}
/**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : []
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */
function orderedSetReducer (current, element) {
	if (!current.hasOwnProperty(element)) {
		current[element] = true;
	}
	return current;
}

/**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}))
}

/**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */
function arrayIncludes (list) {
	return function(element) {
		return list && list.indexOf(element) !== -1;
	}
}

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}

/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknown Class:"+Class)
		}
		pt.constructor = Class
	}
}

// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};

function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};

/**
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
	/**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */
	hasFeature: function(feature, version) {
			return true;
	},
	/**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocument: function(namespaceURI,  qualifiedName, doctype){
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype){
			doc.appendChild(doctype);
		}
		if (qualifiedName){
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocumentType: function(qualifiedName, publicId, systemId){
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';

		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}

function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */
	doctype :  null,
	documentElement :  null,
	_inc : 1,

	insertBefore :  function(newChild, refChild){//raises
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}

		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},

	/**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function(classNames) {
		var classNamesSet = toOrderedSet(classNames)
		return new LiveNodeList(this, function(base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base.documentElement, function(node) {
					if(node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class')
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames)
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet))
							}
							if(matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
		return false;
	}
	
	var i = visibleNamespaces.length 
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Well-formed constraint: No < in Attribute Values
 * The replacement text of any entity referred to directly or indirectly in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml/#CleanAttrVals
 * @see https://www.w3.org/TR/xml/#NT-AttValue
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<&"]/g,_xmlEncoder), '"')
}

function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}

	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}

	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML

		var prefixedNodeName = nodeName
		if (!isHTML && !node.prefix && node.namespaceURI) {
			var defaultNS
			// lookup current default ns from `xmlns` attribute
			for (var ai = 0; ai < attrs.length; ai++) {
				if (attrs.item(ai).name === 'xmlns') {
					defaultNS = attrs.item(ai).value
					break
				}
			}
			if (!defaultNS) {
				// lookup current default ns in visibleNamespaces
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
						defaultNS = namespace.namespace
						break
					}
				}
			}
			if (defaultNS !== node.namespaceURI) {
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.namespace === node.namespaceURI) {
						if (namespace.prefix) {
							prefixedNodeName = namespace.prefix + ':' + nodeName
						}
						break
					}
				}
			}
		}

		buf.push('<', prefixedNodeName);

		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}

		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}

		// add namespace for current node		
		if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					child = child.nextSibling;
				}
			}
			buf.push('</',prefixedNodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return addSerializedAttribute(buf, node.name, node.value);
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 */
		return buf.push(node.data
			.replace(/[<&]/g,_xmlEncoder)
			.replace(/]]>/g, ']]&gt;')
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});

		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},

			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;

				default:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}

		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DocumentType = DocumentType;
	exports.DOMException = DOMException;
	exports.DOMImplementation = DOMImplementation;
	exports.Element = Element;
	exports.Node = Node;
	exports.NodeList = NodeList;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/entities.js":
/*!*****************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/entities.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var freeze = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js").freeze;

/**
 * The entities that are predefined in every XML document.
 *
 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
 */
exports.XML_ENTITIES = freeze({amp:'&', apos:"'", gt:'>', lt:'<', quot:'"'})

/**
 * A map of currently 241 entities that are detected in an HTML document.
 * They contain all entries from `XML_ENTITIES`.
 *
 * @see XML_ENTITIES
 * @see DOMParser.parseFromString
 * @see DOMImplementation.prototype.createHTMLDocument
 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
 */
exports.HTML_ENTITIES = freeze({
       lt: '<',
       gt: '>',
       amp: '&',
       quot: '"',
       apos: "'",
       Agrave: "À",
       Aacute: "Á",
       Acirc: "Â",
       Atilde: "Ã",
       Auml: "Ä",
       Aring: "Å",
       AElig: "Æ",
       Ccedil: "Ç",
       Egrave: "È",
       Eacute: "É",
       Ecirc: "Ê",
       Euml: "Ë",
       Igrave: "Ì",
       Iacute: "Í",
       Icirc: "Î",
       Iuml: "Ï",
       ETH: "Ð",
       Ntilde: "Ñ",
       Ograve: "Ò",
       Oacute: "Ó",
       Ocirc: "Ô",
       Otilde: "Õ",
       Ouml: "Ö",
       Oslash: "Ø",
       Ugrave: "Ù",
       Uacute: "Ú",
       Ucirc: "Û",
       Uuml: "Ü",
       Yacute: "Ý",
       THORN: "Þ",
       szlig: "ß",
       agrave: "à",
       aacute: "á",
       acirc: "â",
       atilde: "ã",
       auml: "ä",
       aring: "å",
       aelig: "æ",
       ccedil: "ç",
       egrave: "è",
       eacute: "é",
       ecirc: "ê",
       euml: "ë",
       igrave: "ì",
       iacute: "í",
       icirc: "î",
       iuml: "ï",
       eth: "ð",
       ntilde: "ñ",
       ograve: "ò",
       oacute: "ó",
       ocirc: "ô",
       otilde: "õ",
       ouml: "ö",
       oslash: "ø",
       ugrave: "ù",
       uacute: "ú",
       ucirc: "û",
       uuml: "ü",
       yacute: "ý",
       thorn: "þ",
       yuml: "ÿ",
       nbsp: "\u00a0",
       iexcl: "¡",
       cent: "¢",
       pound: "£",
       curren: "¤",
       yen: "¥",
       brvbar: "¦",
       sect: "§",
       uml: "¨",
       copy: "©",
       ordf: "ª",
       laquo: "«",
       not: "¬",
       shy: "­­",
       reg: "®",
       macr: "¯",
       deg: "°",
       plusmn: "±",
       sup2: "²",
       sup3: "³",
       acute: "´",
       micro: "µ",
       para: "¶",
       middot: "·",
       cedil: "¸",
       sup1: "¹",
       ordm: "º",
       raquo: "»",
       frac14: "¼",
       frac12: "½",
       frac34: "¾",
       iquest: "¿",
       times: "×",
       divide: "÷",
       forall: "∀",
       part: "∂",
       exist: "∃",
       empty: "∅",
       nabla: "∇",
       isin: "∈",
       notin: "∉",
       ni: "∋",
       prod: "∏",
       sum: "∑",
       minus: "−",
       lowast: "∗",
       radic: "√",
       prop: "∝",
       infin: "∞",
       ang: "∠",
       and: "∧",
       or: "∨",
       cap: "∩",
       cup: "∪",
       'int': "∫",
       there4: "∴",
       sim: "∼",
       cong: "≅",
       asymp: "≈",
       ne: "≠",
       equiv: "≡",
       le: "≤",
       ge: "≥",
       sub: "⊂",
       sup: "⊃",
       nsub: "⊄",
       sube: "⊆",
       supe: "⊇",
       oplus: "⊕",
       otimes: "⊗",
       perp: "⊥",
       sdot: "⋅",
       Alpha: "Α",
       Beta: "Β",
       Gamma: "Γ",
       Delta: "Δ",
       Epsilon: "Ε",
       Zeta: "Ζ",
       Eta: "Η",
       Theta: "Θ",
       Iota: "Ι",
       Kappa: "Κ",
       Lambda: "Λ",
       Mu: "Μ",
       Nu: "Ν",
       Xi: "Ξ",
       Omicron: "Ο",
       Pi: "Π",
       Rho: "Ρ",
       Sigma: "Σ",
       Tau: "Τ",
       Upsilon: "Υ",
       Phi: "Φ",
       Chi: "Χ",
       Psi: "Ψ",
       Omega: "Ω",
       alpha: "α",
       beta: "β",
       gamma: "γ",
       delta: "δ",
       epsilon: "ε",
       zeta: "ζ",
       eta: "η",
       theta: "θ",
       iota: "ι",
       kappa: "κ",
       lambda: "λ",
       mu: "μ",
       nu: "ν",
       xi: "ξ",
       omicron: "ο",
       pi: "π",
       rho: "ρ",
       sigmaf: "ς",
       sigma: "σ",
       tau: "τ",
       upsilon: "υ",
       phi: "φ",
       chi: "χ",
       psi: "ψ",
       omega: "ω",
       thetasym: "ϑ",
       upsih: "ϒ",
       piv: "ϖ",
       OElig: "Œ",
       oelig: "œ",
       Scaron: "Š",
       scaron: "š",
       Yuml: "Ÿ",
       fnof: "ƒ",
       circ: "ˆ",
       tilde: "˜",
       ensp: " ",
       emsp: " ",
       thinsp: " ",
       zwnj: "‌",
       zwj: "‍",
       lrm: "‎",
       rlm: "‏",
       ndash: "–",
       mdash: "—",
       lsquo: "‘",
       rsquo: "’",
       sbquo: "‚",
       ldquo: "“",
       rdquo: "”",
       bdquo: "„",
       dagger: "†",
       Dagger: "‡",
       bull: "•",
       hellip: "…",
       permil: "‰",
       prime: "′",
       Prime: "″",
       lsaquo: "‹",
       rsaquo: "›",
       oline: "‾",
       euro: "€",
       trade: "™",
       larr: "←",
       uarr: "↑",
       rarr: "→",
       darr: "↓",
       harr: "↔",
       crarr: "↵",
       lceil: "⌈",
       rceil: "⌉",
       lfloor: "⌊",
       rfloor: "⌋",
       loz: "◊",
       spades: "♠",
       clubs: "♣",
       hearts: "♥",
       diams: "♦"
});

/**
 * @deprecated use `HTML_ENTITIES` instead
 * @see HTML_ENTITIES
 */
exports.entityMap = exports.HTML_ENTITIES


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var dom = __webpack_require__(/*! ./dom */ "./node_modules/@xmldom/xmldom/lib/dom.js")
exports.DOMImplementation = dom.DOMImplementation
exports.XMLSerializer = dom.XMLSerializer
exports.DOMParser = __webpack_require__(/*! ./dom-parser */ "./node_modules/@xmldom/xmldom/lib/dom-parser.js").DOMParser


/***/ }),

/***/ "./node_modules/@xmldom/xmldom/lib/sax.js":
/*!************************************************!*\
  !*** ./node_modules/@xmldom/xmldom/lib/sax.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var NAMESPACE = __webpack_require__(/*! ./conventions */ "./node_modules/@xmldom/xmldom/lib/conventions.js").NAMESPACE;

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError(message, locator) {
	this.message = message
	this.locator = locator
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
}
ParseError.prototype = new Error();
ParseError.prototype.name = ParseError.name

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, '');
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}

				if (NAMESPACE.isHTML(el.uri) && !el.closed) {
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				} else {
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError) {
				throw e;
			}
			errorHandler.error('element parse error: '+e)
			end = -1;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (el.attributeNames.hasOwnProperty(qname)) {
			errorHandler.fatalError('Attribute ' + qname + ' redefined')
		}
		el.addValue(qname, value, startIndex)
	}
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName'); // No known test case
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				addAttribute(attrName, value, start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value.replace(/&#?\w+;/g,entityReplacer), start)
				}else{
					if(!NAMESPACE.isHTML(currentNSMap['']) || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					addAttribute(value, value, start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if (!NAMESPACE.isHTML(currentNSMap['']) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					addAttribute(attrName, attrName, start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = NAMESPACE.XMLNS
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = NAMESPACE.XML;
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

function ElementAttributes(){
	this.attributeNames = {}
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}



function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;
exports.ParseError = ParseError;


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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var docxtemplater__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! docxtemplater */ "./node_modules/docxtemplater/js/docxtemplater.js");
/* harmony import */ var docxtemplater__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(docxtemplater__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pizzip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pizzip */ "./node_modules/pizzip/js/index.js");
/* harmony import */ var pizzip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pizzip__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pizzip_utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pizzip/utils/index.js */ "./node_modules/pizzip/utils/index.js");
/* harmony import */ var pizzip_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pizzip_utils_index_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






function loadFile(url, callback) {
  pizzip_utils_index_js__WEBPACK_IMPORTED_MODULE_3___default().getBinaryContent(url, callback);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "RealEstateManagement",
  components: {},
  mounted: function mounted() {
    this.getApartments();
  },
  watch: {
    accounts: function accounts(value) {
      if (window.expenseId !== 0) {
        var account = this.accounts.find(function (e) {
          return e.id == window.expenseId;
        });

        if (account) {
          this.selectedAccountId = account.id;
          this.selectedAccount = account;
          this.isFilter = true;
        }
      }
    }
  },
  methods: {
    getApartments: function getApartments() {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/api/v1/real-estate-management').then(function (_ref) {
        var data = _ref.data;
        _this.accounts = data.accounts;
      });
    },
    selectAccount: function selectAccount() {
      if (event.target.value === '') {
        this.selectedAccount = null;
        this.selectedAccountId = '';
        this.isFilter = false;
      } else {
        var account = this.accounts.find(function (e) {
          return e.id == event.target.value;
        });
        this.selectedAccountId = account.id;
        this.selectedAccount = account;
        this.isFilter = true;
      }
    },
    selectAccountByAsset: function selectAccountByAsset(id) {
      var account = this.accounts.find(function (e) {
        return e.id == id;
      });
      this.selectedAccountId = account.id;
      this.selectedAccount = account;
      this.isFilter = true;
    },
    generateWarning: function generateWarning(apartment) {
      var accounts = this.accounts;
      loadFile("v1/simple2.docx", function (error, content) {
        if (error) {
          throw error;
        }

        var text_input = window.prompt("Please enter date");
        var expense_account = accounts.find(function (e) {
          return e.id == apartment.expenseAccount;
        });
        var zip = new (pizzip__WEBPACK_IMPORTED_MODULE_2___default())(content);
        var doc = new (docxtemplater__WEBPACK_IMPORTED_MODULE_1___default())(zip, {
          paragraphLoop: true,
          linebreaks: true
        });
        doc.setData({
          "expense.headline": expense_account.headline ? expense_account.headline : '',
          "expense.iban": expense_account.iban ? expense_account.iban : '',
          "expense.bic": expense_account.bic ? expense_account.bic : '',
          "expense.zipcode": expense_account.zip_code ? expense_account.zip_code : '',
          "expense.city": expense_account.city ? expense_account.city : '',
          "revenue.name": apartment.renter_account.name,
          "revenue.street": expense_account.street ? expense_account.street : '',
          "doc.signature": expense_account.signature,
          "doc.text_input": text_input
        });

        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          var replaceErrors = function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                error[key] = value[key];
                return error;
              }, {});
            }

            return value;
          };

          console.log(JSON.stringify({
            error: error
          }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            var errorMessages = error.properties.errors.map(function (error) {
              return error.properties.explanation;
            }).join("\n");
            console.log("errorMessages", errorMessages); // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }

          throw error;
        }

        var out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); // Output the document using Data-URI

        (0,file_saver__WEBPACK_IMPORTED_MODULE_4__.saveAs)(out, "output.docx");
      });
    }
  },

  /*
   * The component's data.
   */
  data: function data() {
    return {
      accounts: [],
      selectedAccount: null,
      isFilter: false,
      selectedAccountId: ''
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

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


/***/ }),

/***/ "./node_modules/docxtemplater/js/collect-content-types.js":
/*!****************************************************************!*\
  !*** ./node_modules/docxtemplater/js/collect-content-types.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";


var ctXML = "[Content_Types].xml";

function collectContentTypes(overrides, defaults, zip) {
  var partNames = {};

  for (var i = 0, len = overrides.length; i < len; i++) {
    var override = overrides[i];
    var contentType = override.getAttribute("ContentType");
    var partName = override.getAttribute("PartName").substr(1);
    partNames[partName] = contentType;
  }

  var _loop = function _loop(_i, _len) {
    var def = defaults[_i];
    var contentType = def.getAttribute("ContentType");
    var extension = def.getAttribute("Extension"); // eslint-disable-next-line no-loop-func

    zip.file(/./).map(function (_ref) {
      var name = _ref.name;

      if (name.slice(name.length - extension.length - 1) === ".xml" && !partNames[name] && name !== ctXML) {
        partNames[name] = contentType;
      }
    });
  };

  for (var _i = 0, _len = defaults.length; _i < _len; _i++) {
    _loop(_i, _len);
  }

  return partNames;
}

module.exports = collectContentTypes;

/***/ }),

/***/ "./node_modules/docxtemplater/js/doc-utils.js":
/*!****************************************************!*\
  !*** ./node_modules/docxtemplater/js/doc-utils.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! @xmldom/xmldom */ "./node_modules/@xmldom/xmldom/lib/index.js"),
    DOMParser = _require.DOMParser,
    XMLSerializer = _require.XMLSerializer;

var _require2 = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    throwXmlTagNotFound = _require2.throwXmlTagNotFound;

var _require3 = __webpack_require__(/*! ./utils.js */ "./node_modules/docxtemplater/js/utils.js"),
    last = _require3.last,
    first = _require3.first;

function parser(tag) {
  return {
    get: function get(scope) {
      if (tag === ".") {
        return scope;
      }

      return scope[tag];
    }
  };
}

function setSingleAttribute(partValue, attr, attrValue) {
  var regex = new RegExp("(<.* ".concat(attr, "=\")([^\"]+)(\".*)$"));

  if (regex.test(partValue)) {
    return partValue.replace(regex, "$1".concat(attrValue, "$3"));
  }

  var end = partValue.lastIndexOf("/>");

  if (end === -1) {
    end = partValue.lastIndexOf(">");
  }

  return partValue.substr(0, end) + " ".concat(attr, "=\"").concat(attrValue, "\"") + partValue.substr(end);
}

function getSingleAttribute(value, attributeName) {
  var index = value.indexOf("".concat(attributeName, "=\""));

  if (index === -1) {
    return null;
  }

  var startIndex = value.substr(index).search(/["']/) + index;
  var endIndex = value.substr(startIndex + 1).search(/["']/) + startIndex;
  return value.substr(startIndex + 1, endIndex - startIndex);
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, prefix) {
  return str.substring(0, prefix.length) === prefix;
}

function uniq(arr) {
  var hash = {},
      result = [];

  for (var i = 0, l = arr.length; i < l; ++i) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  }

  return result;
}

function chunkBy(parsed, f) {
  return parsed.reduce(function (chunks, p) {
    var currentChunk = last(chunks);
    var res = f(p);

    if (res === "start") {
      chunks.push([p]);
    } else if (res === "end") {
      currentChunk.push(p);
      chunks.push([]);
    } else {
      currentChunk.push(p);
    }

    return chunks;
  }, [[]]).filter(function (p) {
    return p.length > 0;
  });
}

var defaults = {
  paragraphLoop: false,
  nullGetter: function nullGetter(part) {
    return part.module ? "" : "undefined";
  },
  xmlFileNames: [],
  parser: parser,
  linebreaks: false,
  fileTypeConfig: null,
  delimiters: {
    start: "{",
    end: "}"
  }
};

function mergeObjects() {
  var resObj = {};
  var obj, keys;

  for (var i = 0; i < arguments.length; i += 1) {
    obj = arguments[i];
    keys = Object.keys(obj);

    for (var j = 0; j < keys.length; j += 1) {
      resObj[keys[j]] = obj[keys[j]];
    }
  }

  return resObj;
}

function xml2str(xmlNode) {
  var a = new XMLSerializer();
  return a.serializeToString(xmlNode).replace(/xmlns(:[a-z0-9]+)?="" ?/g, "");
}

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }

  var parser = new DOMParser();
  return parser.parseFromString(str, "text/xml");
}

var charMap = [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&apos;"]];

function escapeRegExp(str) {
  // to be able to use a string as a regex
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

var charMapRegexes = charMap.map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      endChar = _ref2[0],
      startChar = _ref2[1];

  return {
    rstart: new RegExp(escapeRegExp(startChar), "g"),
    rend: new RegExp(escapeRegExp(endChar), "g"),
    start: startChar,
    end: endChar
  };
});

function wordToUtf8(string) {
  var r;

  for (var i = charMapRegexes.length - 1; i >= 0; i--) {
    r = charMapRegexes[i];
    string = string.replace(r.rstart, r.end);
  }

  return string;
}

function utf8ToWord(string) {
  if (typeof string !== "string") {
    string = string.toString();
  }

  var r;

  for (var i = 0, l = charMapRegexes.length; i < l; i++) {
    r = charMapRegexes[i];
    string = string.replace(r.rend, r.start);
  }

  return string;
} // This function is written with for loops for performance


function concatArrays(arrays) {
  var result = [];

  for (var i = 0; i < arrays.length; i++) {
    var array = arrays[i];

    for (var j = 0, len = array.length; j < len; j++) {
      result.push(array[j]);
    }
  }

  return result;
}

var spaceRegexp = new RegExp(String.fromCharCode(160), "g");

function convertSpaces(s) {
  return s.replace(spaceRegexp, " ");
}

function pregMatchAll(regex, content) {
  /* regex is a string, content is the content. It returns an array of all matches with their offset, for example:
  	 regex=la
  	 content=lolalolilala
  returns: [{array: {0: 'la'},offset: 2},{array: {0: 'la'},offset: 8},{array: {0: 'la'} ,offset: 10}]
  */
  var matchArray = [];
  var match;

  while ((match = regex.exec(content)) != null) {
    matchArray.push({
      array: match,
      offset: match.index
    });
  }

  return matchArray;
}

function isEnding(value, element) {
  return value === "</" + element + ">";
}

function isStarting(value, element) {
  return value.indexOf("<" + element) === 0 && [">", " "].indexOf(value[element.length + 1]) !== -1;
}

function getRight(parsed, element, index) {
  var val = getRightOrNull(parsed, element, index);

  if (val !== null) {
    return val;
  }

  throwXmlTagNotFound({
    position: "right",
    element: element,
    parsed: parsed,
    index: index
  });
}

function getRightOrNull(parsed, elements, index) {
  if (typeof elements === "string") {
    elements = [elements];
  }

  var level = 1;

  for (var i = index, l = parsed.length; i < l; i++) {
    var part = parsed[i];

    for (var j = 0, len = elements.length; j < len; j++) {
      var element = elements[j];

      if (isEnding(part.value, element)) {
        level--;
      }

      if (isStarting(part.value, element)) {
        level++;
      }

      if (level === 0) {
        return i;
      }
    }
  }

  return null;
}

function getLeft(parsed, element, index) {
  var val = getLeftOrNull(parsed, element, index);

  if (val !== null) {
    return val;
  }

  throwXmlTagNotFound({
    position: "left",
    element: element,
    parsed: parsed,
    index: index
  });
}

function getLeftOrNull(parsed, elements, index) {
  if (typeof elements === "string") {
    elements = [elements];
  }

  var level = 1;

  for (var i = index; i >= 0; i--) {
    var part = parsed[i];

    for (var j = 0, len = elements.length; j < len; j++) {
      var element = elements[j];

      if (isStarting(part.value, element)) {
        level--;
      }

      if (isEnding(part.value, element)) {
        level++;
      }

      if (level === 0) {
        return i;
      }
    }
  }

  return null;
}

function isTagStart(tagType, _ref3) {
  var type = _ref3.type,
      tag = _ref3.tag,
      position = _ref3.position;
  return type === "tag" && tag === tagType && position === "start";
}

function isTagEnd(tagType, _ref4) {
  var type = _ref4.type,
      tag = _ref4.tag,
      position = _ref4.position;
  return type === "tag" && tag === tagType && position === "end";
}

function isParagraphStart(part) {
  return isTagStart("w:p", part) || isTagStart("a:p", part);
}

function isParagraphEnd(part) {
  return isTagEnd("w:p", part) || isTagEnd("a:p", part);
}

function isTextStart(part) {
  return part.type === "tag" && part.position === "start" && part.text;
}

function isTextEnd(part) {
  return part.type === "tag" && part.position === "end" && part.text;
}

function isContent(p) {
  return p.type === "placeholder" || p.type === "content" && p.position === "insidetag";
}

var corruptCharacters = /[\x00-\x08\x0B\x0C\x0E-\x1F]/; // 00    NUL '\0' (null character)
// 01    SOH (start of heading)
// 02    STX (start of text)
// 03    ETX (end of text)
// 04    EOT (end of transmission)
// 05    ENQ (enquiry)
// 06    ACK (acknowledge)
// 07    BEL '\a' (bell)
// 08    BS  '\b' (backspace)
// 0B    VT  '\v' (vertical tab)
// 0C    FF  '\f' (form feed)
// 0E    SO  (shift out)
// 0F    SI  (shift in)
// 10    DLE (data link escape)
// 11    DC1 (device control 1)
// 12    DC2 (device control 2)
// 13    DC3 (device control 3)
// 14    DC4 (device control 4)
// 15    NAK (negative ack.)
// 16    SYN (synchronous idle)
// 17    ETB (end of trans. blk)
// 18    CAN (cancel)
// 19    EM  (end of medium)
// 1A    SUB (substitute)
// 1B    ESC (escape)
// 1C    FS  (file separator)
// 1D    GS  (group separator)
// 1E    RS  (record separator)
// 1F    US  (unit separator)

function hasCorruptCharacters(string) {
  return corruptCharacters.test(string);
}

function invertMap(map) {
  return Object.keys(map).reduce(function (invertedMap, key) {
    var value = map[key];
    invertedMap[value] = invertedMap[value] || [];
    invertedMap[value].push(key);
    return invertedMap;
  }, {});
}

module.exports = {
  endsWith: endsWith,
  startsWith: startsWith,
  isContent: isContent,
  isParagraphStart: isParagraphStart,
  isParagraphEnd: isParagraphEnd,
  isTagStart: isTagStart,
  isTagEnd: isTagEnd,
  isTextStart: isTextStart,
  isTextEnd: isTextEnd,
  uniq: uniq,
  chunkBy: chunkBy,
  last: last,
  first: first,
  mergeObjects: mergeObjects,
  xml2str: xml2str,
  str2xml: str2xml,
  getRightOrNull: getRightOrNull,
  getRight: getRight,
  getLeftOrNull: getLeftOrNull,
  getLeft: getLeft,
  pregMatchAll: pregMatchAll,
  convertSpaces: convertSpaces,
  escapeRegExp: escapeRegExp,
  charMapRegexes: charMapRegexes,
  hasCorruptCharacters: hasCorruptCharacters,
  defaults: defaults,
  wordToUtf8: wordToUtf8,
  utf8ToWord: utf8ToWord,
  concatArrays: concatArrays,
  invertMap: invertMap,
  charMap: charMap,
  getSingleAttribute: getSingleAttribute,
  setSingleAttribute: setSingleAttribute
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/docxtemplater.js":
/*!********************************************************!*\
  !*** ./node_modules/docxtemplater/js/docxtemplater.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _excluded = ["modules"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DocUtils = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js");

DocUtils.traits = __webpack_require__(/*! ./traits.js */ "./node_modules/docxtemplater/js/traits.js");
DocUtils.moduleWrapper = __webpack_require__(/*! ./module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var createScope = __webpack_require__(/*! ./scope-manager.js */ "./node_modules/docxtemplater/js/scope-manager.js");

var _require = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    throwMultiError = _require.throwMultiError,
    throwResolveBeforeCompile = _require.throwResolveBeforeCompile,
    throwRenderInvalidTemplate = _require.throwRenderInvalidTemplate;

var collectContentTypes = __webpack_require__(/*! ./collect-content-types.js */ "./node_modules/docxtemplater/js/collect-content-types.js");

var ctXML = "[Content_Types].xml";

var commonModule = __webpack_require__(/*! ./modules/common.js */ "./node_modules/docxtemplater/js/modules/common.js");

var Lexer = __webpack_require__(/*! ./lexer.js */ "./node_modules/docxtemplater/js/lexer.js");

var defaults = DocUtils.defaults,
    str2xml = DocUtils.str2xml,
    xml2str = DocUtils.xml2str,
    moduleWrapper = DocUtils.moduleWrapper,
    concatArrays = DocUtils.concatArrays,
    uniq = DocUtils.uniq;

var _require2 = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    XTInternalError = _require2.XTInternalError,
    throwFileTypeNotIdentified = _require2.throwFileTypeNotIdentified,
    throwFileTypeNotHandled = _require2.throwFileTypeNotHandled,
    throwApiVersionError = _require2.throwApiVersionError;

var currentModuleApiVersion = [3, 27, 0];

var Docxtemplater = /*#__PURE__*/function () {
  function Docxtemplater(zip) {
    var _this = this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$modules = _ref.modules,
        modules = _ref$modules === void 0 ? [] : _ref$modules,
        options = _objectWithoutProperties(_ref, _excluded);

    _classCallCheck(this, Docxtemplater);

    if (!Array.isArray(modules)) {
      throw new Error("The modules argument of docxtemplater's constructor must be an array");
    }

    this.scopeManagers = {};
    this.compiled = {};
    this.modules = [commonModule()];
    this.setOptions(options);
    modules.forEach(function (module) {
      _this.attachModule(module);
    });

    if (arguments.length > 0) {
      if (!zip || !zip.files || typeof zip.file !== "function") {
        throw new Error("The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
      }

      this.loadZip(zip); // remove the unsupported modules

      this.modules = this.modules.filter(function (module) {
        if (module.supportedFileTypes) {
          if (!Array.isArray(module.supportedFileTypes)) {
            throw new Error("The supportedFileTypes field of the module must be an array");
          }

          var isSupportedModule = module.supportedFileTypes.indexOf(_this.fileType) !== -1;

          if (!isSupportedModule) {
            module.on("detached");
          }

          return isSupportedModule;
        }

        return true;
      });
      this.compile();
      this.v4Constructor = true;
    }
  }

  _createClass(Docxtemplater, [{
    key: "verifyApiVersion",
    value: function verifyApiVersion(neededVersion) {
      neededVersion = neededVersion.split(".").map(function (i) {
        return parseInt(i, 10);
      });

      if (neededVersion.length !== 3) {
        throwApiVersionError("neededVersion is not a valid version", {
          neededVersion: neededVersion,
          explanation: "the neededVersion must be an array of length 3"
        });
      }

      if (neededVersion[0] !== currentModuleApiVersion[0]) {
        throwApiVersionError("The major api version do not match, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }

      if (neededVersion[1] > currentModuleApiVersion[1]) {
        throwApiVersionError("The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }

      if (neededVersion[1] === currentModuleApiVersion[1] && neededVersion[2] > currentModuleApiVersion[2]) {
        throwApiVersionError("The patch api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
          neededVersion: neededVersion,
          currentModuleApiVersion: currentModuleApiVersion,
          explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
        });
      }

      return true;
    }
  }, {
    key: "setModules",
    value: function setModules(obj) {
      this.modules.forEach(function (module) {
        module.set(obj);
      });
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(eventName) {
      this.modules.forEach(function (module) {
        module.on(eventName);
      });
    }
  }, {
    key: "attachModule",
    value: function attachModule(module) {
      if (this.v4Constructor) {
        throw new Error("attachModule() should not be called manually when using the v4 constructor");
      }

      if (module.requiredAPIVersion) {
        this.verifyApiVersion(module.requiredAPIVersion);
      }

      if (module.attached === true) {
        throw new Error("Cannot attach a module that was already attached : \"".concat(module.name, "\". Maybe you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater"));
      }

      module.attached = true;
      var wrappedModule = moduleWrapper(module);
      this.modules.push(wrappedModule);
      wrappedModule.on("attached");
      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var _this2 = this;

      if (this.v4Constructor) {
        throw new Error("setOptions() should not be called manually when using the v4 constructor");
      }

      if (!options) {
        throw new Error("setOptions should be called with an object as first parameter");
      }

      this.options = {};
      Object.keys(defaults).forEach(function (key) {
        var defaultValue = defaults[key];
        _this2.options[key] = options[key] != null ? options[key] : defaultValue;
        _this2[key] = _this2.options[key];
      });

      if (this.zip) {
        this.updateFileTypeConfig();
      }

      return this;
    }
  }, {
    key: "loadZip",
    value: function loadZip(zip) {
      if (this.v4Constructor) {
        throw new Error("loadZip() should not be called manually when using the v4 constructor");
      }

      if (zip.loadAsync) {
        throw new XTInternalError("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
      }

      this.zip = zip;
      this.updateFileTypeConfig();
      this.modules = concatArrays([this.fileTypeConfig.baseModules.map(function (moduleFunction) {
        return moduleFunction();
      }), this.modules]);
      return this;
    }
  }, {
    key: "precompileFile",
    value: function precompileFile(fileName) {
      var currentFile = this.createTemplateClass(fileName);
      currentFile.preparse();
      this.compiled[fileName] = currentFile;
    }
  }, {
    key: "compileFile",
    value: function compileFile(fileName) {
      this.compiled[fileName].parse();
    }
  }, {
    key: "getScopeManager",
    value: function getScopeManager(to, currentFile, tags) {
      if (!this.scopeManagers[to]) {
        this.scopeManagers[to] = createScope({
          tags: tags || {},
          parser: this.parser,
          cachedParsers: currentFile.cachedParsers
        });
      }

      return this.scopeManagers[to];
    }
  }, {
    key: "resolveData",
    value: function resolveData(data) {
      var _this3 = this;

      var errors = [];

      if (!Object.keys(this.compiled).length) {
        throwResolveBeforeCompile();
      }

      return Promise.resolve(data).then(function (data) {
        _this3.setData(data);

        _this3.setModules({
          data: _this3.data,
          Lexer: Lexer
        });

        _this3.mapper = _this3.modules.reduce(function (value, module) {
          return module.getRenderedMap(value);
        }, {});
        return Promise.all(Object.keys(_this3.mapper).map(function (to) {
          var _this3$mapper$to = _this3.mapper[to],
              from = _this3$mapper$to.from,
              data = _this3$mapper$to.data;
          return Promise.resolve(data).then(function (data) {
            var currentFile = _this3.compiled[from];
            currentFile.filePath = to;
            currentFile.scopeManager = _this3.getScopeManager(to, currentFile, data);
            return currentFile.resolveTags(data).then(function (result) {
              currentFile.scopeManager.finishedResolving = true;
              return result;
            }, function (errs) {
              errors = errors.concat(errs);
            });
          });
        })).then(function (resolved) {
          if (errors.length !== 0) {
            throwMultiError(errors);
          }

          return concatArrays(resolved);
        });
      });
    }
  }, {
    key: "compile",
    value: function compile() {
      var _this4 = this;

      if (Object.keys(this.compiled).length) {
        return this;
      }

      this.options = this.modules.reduce(function (options, module) {
        return module.optionsTransformer(options, _this4);
      }, this.options);
      this.options.xmlFileNames = uniq(this.options.xmlFileNames);
      this.xmlDocuments = this.options.xmlFileNames.reduce(function (xmlDocuments, fileName) {
        var content = _this4.zip.files[fileName].asText();

        xmlDocuments[fileName] = str2xml(content);
        return xmlDocuments;
      }, {});
      this.setModules({
        zip: this.zip,
        xmlDocuments: this.xmlDocuments
      });
      this.getTemplatedFiles(); // Loop inside all templatedFiles (ie xml files with content).
      // Sometimes they don't exist (footer.xml for example)

      this.templatedFiles.forEach(function (fileName) {
        if (_this4.zip.files[fileName] != null) {
          _this4.precompileFile(fileName);
        }
      });
      this.templatedFiles.forEach(function (fileName) {
        if (_this4.zip.files[fileName] != null) {
          _this4.compileFile(fileName);
        }
      });
      this.setModules({
        compiled: this.compiled
      });
      verifyErrors(this);
      return this;
    }
  }, {
    key: "updateFileTypeConfig",
    value: function updateFileTypeConfig() {
      var _this5 = this;

      var fileType;

      if (this.zip.files.mimetype) {
        fileType = "odt";
      }

      var contentTypes = this.zip.files[ctXML];
      this.targets = [];
      var contentTypeXml = contentTypes ? str2xml(contentTypes.asText()) : null;
      var overrides = contentTypeXml ? contentTypeXml.getElementsByTagName("Override") : null;
      var defaults = contentTypeXml ? contentTypeXml.getElementsByTagName("Default") : null;

      if (contentTypeXml) {
        this.filesContentTypes = collectContentTypes(overrides, defaults, this.zip);
        this.invertedContentTypes = DocUtils.invertMap(this.filesContentTypes);
        this.setModules({
          contentTypes: this.contentTypes,
          invertedContentTypes: this.invertedContentTypes
        });
      }

      this.modules.forEach(function (module) {
        fileType = module.getFileType({
          zip: _this5.zip,
          contentTypes: contentTypes,
          contentTypeXml: contentTypeXml,
          overrides: overrides,
          defaults: defaults,
          doc: _this5
        }) || fileType;
      });

      if (fileType === "odt") {
        throwFileTypeNotHandled(fileType);
      }

      if (!fileType) {
        throwFileTypeNotIdentified();
      }

      this.fileType = fileType;
      this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig || Docxtemplater.FileTypeConfig[this.fileType]();
      return this;
    }
  }, {
    key: "renderAsync",
    value: function renderAsync(data) {
      var _this6 = this;

      return this.resolveData(data).then(function () {
        return _this6.render();
      });
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this7 = this;

      this.compile();

      if (this.errors.length > 0) {
        throwRenderInvalidTemplate();
      }

      if (data) {
        this.setData(data);
      }

      this.setModules({
        data: this.data,
        Lexer: Lexer
      });
      this.mapper = this.mapper || this.modules.reduce(function (value, module) {
        return module.getRenderedMap(value);
      }, {});
      Object.keys(this.mapper).forEach(function (to) {
        var _this7$mapper$to = _this7.mapper[to],
            from = _this7$mapper$to.from,
            data = _this7$mapper$to.data;
        var currentFile = _this7.compiled[from];
        currentFile.scopeManager = _this7.getScopeManager(to, currentFile, data);
        currentFile.render(to);

        _this7.zip.file(to, currentFile.content, {
          createFolders: true
        });
      });
      verifyErrors(this);
      this.sendEvent("syncing-zip");
      this.syncZip();
      return this;
    }
  }, {
    key: "syncZip",
    value: function syncZip() {
      var _this8 = this;

      Object.keys(this.xmlDocuments).forEach(function (fileName) {
        _this8.zip.remove(fileName);

        var content = xml2str(_this8.xmlDocuments[fileName]);
        return _this8.zip.file(fileName, content, {
          createFolders: true
        });
      });
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      return this;
    }
  }, {
    key: "getZip",
    value: function getZip() {
      return this.zip;
    }
  }, {
    key: "createTemplateClass",
    value: function createTemplateClass(path) {
      var content = this.zip.files[path].asText();
      return this.createTemplateClassFromContent(content, path);
    }
  }, {
    key: "createTemplateClassFromContent",
    value: function createTemplateClassFromContent(content, filePath) {
      var _this9 = this;

      var xmltOptions = {
        filePath: filePath,
        contentType: this.filesContentTypes[filePath]
      };
      Object.keys(defaults).concat(["filesContentTypes", "fileTypeConfig", "modules"]).forEach(function (key) {
        xmltOptions[key] = _this9[key];
      });
      return new Docxtemplater.XmlTemplater(content, xmltOptions);
    }
  }, {
    key: "getFullText",
    value: function getFullText(path) {
      return this.createTemplateClass(path || this.fileTypeConfig.textPath(this)).getFullText();
    }
  }, {
    key: "getTemplatedFiles",
    value: function getTemplatedFiles() {
      var _this10 = this;

      this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
      this.targets.forEach(function (target) {
        _this10.templatedFiles.push(target);
      });
      return this.templatedFiles;
    }
  }]);

  return Docxtemplater;
}();

function verifyErrors(doc) {
  var compiled = doc.compiled;
  var allErrors = [];
  Object.keys(compiled).forEach(function (name) {
    var templatePart = compiled[name];
    allErrors = concatArrays([allErrors, templatePart.allErrors]);
  });
  doc.errors = allErrors;

  if (allErrors.length !== 0) {
    throwMultiError(allErrors);
  }
}

Docxtemplater.DocUtils = DocUtils;
Docxtemplater.Errors = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js");
Docxtemplater.XmlTemplater = __webpack_require__(/*! ./xml-templater.js */ "./node_modules/docxtemplater/js/xml-templater.js");
Docxtemplater.FileTypeConfig = __webpack_require__(/*! ./file-type-config.js */ "./node_modules/docxtemplater/js/file-type-config.js");
Docxtemplater.XmlMatcher = __webpack_require__(/*! ./xml-matcher.js */ "./node_modules/docxtemplater/js/xml-matcher.js");
module.exports = Docxtemplater;

/***/ }),

/***/ "./node_modules/docxtemplater/js/errors.js":
/*!*************************************************!*\
  !*** ./node_modules/docxtemplater/js/errors.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./utils.js */ "./node_modules/docxtemplater/js/utils.js"),
    last = _require.last,
    first = _require.first;

function XTError(message) {
  this.name = "GenericError";
  this.message = message;
  this.stack = new Error(message).stack;
}

XTError.prototype = Error.prototype;

function XTTemplateError(message) {
  this.name = "TemplateError";
  this.message = message;
  this.stack = new Error(message).stack;
}

XTTemplateError.prototype = new XTError();

function XTRenderingError(message) {
  this.name = "RenderingError";
  this.message = message;
  this.stack = new Error(message).stack;
}

XTRenderingError.prototype = new XTError();

function XTScopeParserError(message) {
  this.name = "ScopeParserError";
  this.message = message;
  this.stack = new Error(message).stack;
}

XTScopeParserError.prototype = new XTError();

function XTInternalError(message) {
  this.name = "InternalError";
  this.properties = {
    explanation: "InternalError"
  };
  this.message = message;
  this.stack = new Error(message).stack;
}

XTInternalError.prototype = new XTError();

function XTAPIVersionError(message) {
  this.name = "APIVersionError";
  this.properties = {
    explanation: "APIVersionError"
  };
  this.message = message;
  this.stack = new Error(message).stack;
}

XTAPIVersionError.prototype = new XTError();

function throwApiVersionError(msg, properties) {
  var err = new XTAPIVersionError(msg);
  err.properties = _objectSpread({
    id: "api_version_error"
  }, properties);
  throw err;
}

function throwMultiError(errors) {
  var err = new XTTemplateError("Multi error");
  err.properties = {
    errors: errors,
    id: "multi_error",
    explanation: "The template has multiple errors"
  };
  throw err;
}

function getUnopenedTagException(options) {
  var err = new XTTemplateError("Unopened tag");
  err.properties = {
    xtag: last(options.xtag.split(" ")),
    id: "unopened_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" is unopened")
  };
  return err;
}

function getDuplicateOpenTagException(options) {
  var err = new XTTemplateError("Duplicate open tag, expected one open tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")),
    id: "duplicate_open_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" has duplicate open tags")
  };
  return err;
}

function getDuplicateCloseTagException(options) {
  var err = new XTTemplateError("Duplicate close tag, expected one close tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")),
    id: "duplicate_close_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag ending with \"".concat(options.xtag.substr(0, 10), "\" has duplicate close tags")
  };
  return err;
}

function getUnclosedTagException(options) {
  var err = new XTTemplateError("Unclosed tag");
  err.properties = {
    xtag: first(options.xtag.split(" ")).substr(1),
    id: "unclosed_tag",
    context: options.xtag,
    offset: options.offset,
    lIndex: options.lIndex,
    explanation: "The tag beginning with \"".concat(options.xtag.substr(0, 10), "\" is unclosed")
  };
  return err;
}

function throwXmlTagNotFound(options) {
  var err = new XTTemplateError("No tag \"".concat(options.element, "\" was found at the ").concat(options.position));
  var part = options.parsed[options.index];
  err.properties = {
    id: "no_xml_tag_found_at_".concat(options.position),
    explanation: "No tag \"".concat(options.element, "\" was found at the ").concat(options.position),
    offset: part.offset,
    part: part,
    parsed: options.parsed,
    index: options.index,
    element: options.element
  };
  throw err;
}

function getCorruptCharactersException(_ref) {
  var tag = _ref.tag,
      value = _ref.value,
      offset = _ref.offset;
  var err = new XTRenderingError("There are some XML corrupt characters");
  err.properties = {
    id: "invalid_xml_characters",
    xtag: tag,
    value: value,
    offset: offset,
    explanation: "There are some corrupt characters for the field ${tag}"
  };
  return err;
}

function throwExpandNotFound(options) {
  var _options$part = options.part,
      value = _options$part.value,
      offset = _options$part.offset,
      _options$id = options.id,
      id = _options$id === void 0 ? "raw_tag_outerxml_invalid" : _options$id,
      _options$message = options.message,
      message = _options$message === void 0 ? "Raw tag not in paragraph" : _options$message;
  var part = options.part;
  var _options$explanation = options.explanation,
      explanation = _options$explanation === void 0 ? "The tag \"".concat(value, "\" is not inside a paragraph") : _options$explanation;

  if (typeof explanation === "function") {
    explanation = explanation(part);
  }

  var err = new XTTemplateError(message);
  err.properties = {
    id: id,
    explanation: explanation,
    rootError: options.rootError,
    xtag: value,
    offset: offset,
    postparsed: options.postparsed,
    expandTo: options.expandTo,
    index: options.index
  };
  throw err;
}

function throwRawTagShouldBeOnlyTextInParagraph(options) {
  var err = new XTTemplateError("Raw tag should be the only text in paragraph");
  var tag = options.part.value;
  err.properties = {
    id: "raw_xml_tag_should_be_only_text_in_paragraph",
    explanation: "The raw tag \"".concat(tag, "\" should be the only text in this paragraph. This means that this tag should not be surrounded by any text or spaces."),
    xtag: tag,
    offset: options.part.offset,
    paragraphParts: options.paragraphParts
  };
  throw err;
}

function getUnmatchedLoopException(part) {
  var location = part.location,
      offset = part.offset;
  var t = location === "start" ? "unclosed" : "unopened";
  var T = location === "start" ? "Unclosed" : "Unopened";
  var err = new XTTemplateError("".concat(T, " loop"));
  var tag = part.value;
  err.properties = {
    id: "".concat(t, "_loop"),
    explanation: "The loop with tag \"".concat(tag, "\" is ").concat(t),
    xtag: tag,
    offset: offset
  };
  return err;
}

function getUnbalancedLoopException(pair, lastPair) {
  var err = new XTTemplateError("Unbalanced loop tag");
  var lastL = lastPair[0].part.value;
  var lastR = lastPair[1].part.value;
  var l = pair[0].part.value;
  var r = pair[1].part.value;
  err.properties = {
    id: "unbalanced_loop_tags",
    explanation: "Unbalanced loop tags {#".concat(lastL, "}{/").concat(lastR, "}{#").concat(l, "}{/").concat(r, "}"),
    offset: [lastPair[0].part.offset, pair[1].part.offset],
    lastPair: {
      left: lastPair[0].part.value,
      right: lastPair[1].part.value
    },
    pair: {
      left: pair[0].part.value,
      right: pair[1].part.value
    }
  };
  return err;
}

function getClosingTagNotMatchOpeningTag(_ref2) {
  var tags = _ref2.tags;
  var err = new XTTemplateError("Closing tag does not match opening tag");
  err.properties = {
    id: "closing_tag_does_not_match_opening_tag",
    explanation: "The tag \"".concat(tags[0].value, "\" is closed by the tag \"").concat(tags[1].value, "\""),
    openingtag: first(tags).value,
    offset: [first(tags).offset, last(tags).offset],
    closingtag: last(tags).value
  };
  return err;
}

function getScopeCompilationError(_ref3) {
  var tag = _ref3.tag,
      rootError = _ref3.rootError,
      offset = _ref3.offset;
  var err = new XTScopeParserError("Scope parser compilation failed");
  err.properties = {
    id: "scopeparser_compilation_failed",
    offset: offset,
    tag: tag,
    explanation: "The scope parser for the tag \"".concat(tag, "\" failed to compile"),
    rootError: rootError
  };
  return err;
}

function getScopeParserExecutionError(_ref4) {
  var tag = _ref4.tag,
      scope = _ref4.scope,
      error = _ref4.error,
      offset = _ref4.offset;
  var err = new XTScopeParserError("Scope parser execution failed");
  err.properties = {
    id: "scopeparser_execution_failed",
    explanation: "The scope parser for the tag ".concat(tag, " failed to execute"),
    scope: scope,
    offset: offset,
    tag: tag,
    rootError: error
  };
  return err;
}

function getLoopPositionProducesInvalidXMLError(_ref5) {
  var tag = _ref5.tag,
      offset = _ref5.offset;
  var err = new XTTemplateError("The position of the loop tags \"".concat(tag, "\" would produce invalid XML"));
  err.properties = {
    tag: tag,
    id: "loop_position_invalid",
    explanation: "The tags \"".concat(tag, "\" are misplaced in the document, for example one of them is in a table and the other one outside the table"),
    offset: offset
  };
  return err;
}

function throwUnimplementedTagType(part, index) {
  var errorMsg = "Unimplemented tag type \"".concat(part.type, "\"");

  if (part.module) {
    errorMsg += " \"".concat(part.module, "\"");
  }

  var err = new XTTemplateError(errorMsg);
  err.properties = {
    part: part,
    index: index,
    id: "unimplemented_tag_type"
  };
  throw err;
}

function throwMalformedXml(part) {
  var err = new XTInternalError("Malformed xml");
  err.properties = {
    part: part,
    id: "malformed_xml"
  };
  throw err;
}

function throwResolveBeforeCompile() {
  var err = new XTInternalError("You must run `.compile()` before running `.resolveData()`");
  err.properties = {
    id: "resolve_before_compile",
    explanation: "You must run `.compile()` before running `.resolveData()`"
  };
  throw err;
}

function throwRenderInvalidTemplate() {
  var err = new XTInternalError("You should not call .render on a document that had compilation errors");
  err.properties = {
    id: "render_on_invalid_template",
    explanation: "You should not call .render on a document that had compilation errors"
  };
  throw err;
}

function throwFileTypeNotIdentified() {
  var err = new XTInternalError("The filetype for this file could not be identified, is this file corrupted ?");
  err.properties = {
    id: "filetype_not_identified",
    explanation: "The filetype for this file could not be identified, is this file corrupted ?"
  };
  throw err;
}

function throwXmlInvalid(content, offset) {
  var err = new XTTemplateError("An XML file has invalid xml");
  err.properties = {
    id: "file_has_invalid_xml",
    content: content,
    offset: offset,
    explanation: "The docx contains invalid XML, it is most likely corrupt"
  };
  throw err;
}

function throwFileTypeNotHandled(fileType) {
  var err = new XTInternalError("The filetype \"".concat(fileType, "\" is not handled by docxtemplater"));
  err.properties = {
    id: "filetype_not_handled",
    explanation: "The file you are trying to generate is of type \"".concat(fileType, "\", but only docx and pptx formats are handled"),
    fileType: fileType
  };
  throw err;
}

module.exports = {
  XTError: XTError,
  XTTemplateError: XTTemplateError,
  XTInternalError: XTInternalError,
  XTScopeParserError: XTScopeParserError,
  XTAPIVersionError: XTAPIVersionError,
  // Remove this alias in v4
  RenderingError: XTRenderingError,
  XTRenderingError: XTRenderingError,
  getClosingTagNotMatchOpeningTag: getClosingTagNotMatchOpeningTag,
  getLoopPositionProducesInvalidXMLError: getLoopPositionProducesInvalidXMLError,
  getScopeCompilationError: getScopeCompilationError,
  getScopeParserExecutionError: getScopeParserExecutionError,
  getUnclosedTagException: getUnclosedTagException,
  getUnopenedTagException: getUnopenedTagException,
  getUnmatchedLoopException: getUnmatchedLoopException,
  getDuplicateCloseTagException: getDuplicateCloseTagException,
  getDuplicateOpenTagException: getDuplicateOpenTagException,
  getCorruptCharactersException: getCorruptCharactersException,
  getUnbalancedLoopException: getUnbalancedLoopException,
  throwApiVersionError: throwApiVersionError,
  throwFileTypeNotHandled: throwFileTypeNotHandled,
  throwFileTypeNotIdentified: throwFileTypeNotIdentified,
  throwMalformedXml: throwMalformedXml,
  throwMultiError: throwMultiError,
  throwExpandNotFound: throwExpandNotFound,
  throwRawTagShouldBeOnlyTextInParagraph: throwRawTagShouldBeOnlyTextInParagraph,
  throwUnimplementedTagType: throwUnimplementedTagType,
  throwXmlTagNotFound: throwXmlTagNotFound,
  throwXmlInvalid: throwXmlInvalid,
  throwResolveBeforeCompile: throwResolveBeforeCompile,
  throwRenderInvalidTemplate: throwRenderInvalidTemplate
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/file-type-config.js":
/*!***********************************************************!*\
  !*** ./node_modules/docxtemplater/js/file-type-config.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var loopModule = __webpack_require__(/*! ./modules/loop.js */ "./node_modules/docxtemplater/js/modules/loop.js");

var spacePreserveModule = __webpack_require__(/*! ./modules/space-preserve.js */ "./node_modules/docxtemplater/js/modules/space-preserve.js");

var rawXmlModule = __webpack_require__(/*! ./modules/rawxml.js */ "./node_modules/docxtemplater/js/modules/rawxml.js");

var expandPairTrait = __webpack_require__(/*! ./modules/expand-pair-trait.js */ "./node_modules/docxtemplater/js/modules/expand-pair-trait.js");

var render = __webpack_require__(/*! ./modules/render.js */ "./node_modules/docxtemplater/js/modules/render.js");

function PptXFileTypeConfig() {
  return {
    getTemplatedFiles: function getTemplatedFiles(zip) {
      var slideTemplates = zip.file(/ppt\/(slideMasters)\/(slideMaster)\d+\.xml/).map(function (file) {
        return file.name;
      });
      return slideTemplates.concat(["ppt/presentation.xml", "docProps/app.xml", "docProps/core.xml"]);
    },
    textPath: function textPath() {
      return "ppt/slides/slide1.xml";
    },
    tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "a:t", "m:t", "vt:lpstr"],
    tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:table", "a:p", "a:r", "a:rPr", "p:txBody", "a:txBody", "a:off", "a:ext", "p:graphicFrame", "p:xfrm"],
    expandTags: [{
      contains: "a:tc",
      expand: "a:tr"
    }],
    onParagraphLoop: [{
      contains: "a:p",
      expand: "a:p",
      onlyTextInTag: true
    }],
    tagRawXml: "p:sp",
    baseModules: [loopModule, expandPairTrait, rawXmlModule, render],
    tagShouldContain: [{
      tag: "p:txBody",
      shouldContain: ["a:p"],
      value: "<a:p></a:p>"
    }, {
      tag: "a:txBody",
      shouldContain: ["a:p"],
      value: "<a:p></a:p>"
    }]
  };
}

function DocXFileTypeConfig() {
  return {
    getTemplatedFiles: function getTemplatedFiles(zip) {
      var baseTags = ["docProps/core.xml", "docProps/app.xml", "word/settings.xml"];
      var headerFooters = zip.file(/word\/(header|footer)\d+\.xml/).map(function (file) {
        return file.name;
      });
      return headerFooters.concat(baseTags);
    },
    textPath: function textPath(doc) {
      return doc.targets[0];
    },
    tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "w:t", "m:t", "vt:lpstr"],
    tagsXmlLexedArray: ["w:proofState", "w:tc", "w:tr", "w:table", "w:p", "w:r", "w:br", "w:rPr", "w:pPr", "w:spacing", "w:sdtContent", "w:drawing", "w:sectPr", "w:type", "w:headerReference", "w:footerReference"],
    expandTags: [{
      contains: "w:tc",
      expand: "w:tr"
    }],
    onParagraphLoop: [{
      contains: "w:p",
      expand: "w:p",
      onlyTextInTag: true
    }],
    tagRawXml: "w:p",
    baseModules: [loopModule, spacePreserveModule, expandPairTrait, rawXmlModule, render],
    tagShouldContain: [{
      tag: "w:tc",
      shouldContain: ["w:p"],
      value: "<w:p></w:p>"
    }, {
      tag: "w:sdtContent",
      shouldContain: ["w:p", "w:r"],
      value: "<w:p></w:p>"
    }]
  };
}

module.exports = {
  docx: DocXFileTypeConfig,
  pptx: PptXFileTypeConfig
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/filetypes.js":
/*!****************************************************!*\
  !*** ./node_modules/docxtemplater/js/filetypes.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var docxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
var docxmContentType = "application/vnd.ms-word.document.macroEnabled.main+xml";
var pptxContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
var dotxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml";
var dotmContentType = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml";
var filetypes = {
  docx: [docxContentType, docxmContentType, dotxContentType, dotmContentType],
  pptx: [pptxContentType]
};
module.exports = filetypes;

/***/ }),

/***/ "./node_modules/docxtemplater/js/join-uncorrupt.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/join-uncorrupt.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    endsWith = _require.endsWith,
    startsWith = _require.startsWith;

var filetypes = __webpack_require__(/*! ./filetypes.js */ "./node_modules/docxtemplater/js/filetypes.js");

function addEmptyParagraphAfterTable(parts) {
  var beforeSectPr = false;

  for (var i = parts.length - 1; i >= 0; i--) {
    var part = parts[i];

    if (startsWith(part, "<w:sectPr")) {
      beforeSectPr = true;
    }

    if (beforeSectPr) {
      var trimmed = part.trim();

      if (endsWith(trimmed, "</w:tbl>")) {
        parts.splice(i + 1, 0, "<w:p><w:r><w:t></w:t></w:r></w:p>");
        return parts;
      }

      if (endsWith(trimmed, "</w:p>")) {
        return parts;
      }
    }
  }

  return parts;
}

function joinUncorrupt(parts, options) {
  var contains = options.fileTypeConfig.tagShouldContain || []; // Before doing this "uncorruption" method here, this was done with the `part.emptyValue` trick, however, there were some corruptions that were not handled, for example with a template like this :
  //
  // ------------------------------------------------
  // | {-w:p falsy}My para{/falsy}   |              |
  // | {-w:p falsy}My para{/falsy}   |              |
  // ------------------------------------------------

  var collecting = "";
  var currentlyCollecting = -1;

  if (!options.basePart && filetypes.docx.indexOf(options.contentType) !== -1) {
    parts = addEmptyParagraphAfterTable(parts);
  }

  return parts.reduce(function (full, part) {
    for (var i = 0, len = contains.length; i < len; i++) {
      var _contains$i = contains[i],
          tag = _contains$i.tag,
          shouldContain = _contains$i.shouldContain,
          value = _contains$i.value;
      var startTagRegex = new RegExp("^(<(".concat(tag, ")[^>]*>)$"), "g");

      if (currentlyCollecting === i) {
        if (part === "</".concat(tag, ">")) {
          currentlyCollecting = -1;
          return full + collecting + value + part;
        }

        collecting += part;

        for (var j = 0, len2 = shouldContain.length; j < len2; j++) {
          var sc = shouldContain[j];

          if (part.indexOf("<".concat(sc, " ")) !== -1 || part.indexOf("<".concat(sc, ">")) !== -1) {
            currentlyCollecting = -1;
            return full + collecting;
          }
        }

        return full;
      }

      if (currentlyCollecting === -1 && startTagRegex.test(part)) {
        if (part[part.length - 2] === "/") {
          return full;
        }

        currentlyCollecting = i;
        collecting = part;
        return full;
      }
    }

    return full + part;
  }, "");
}

module.exports = joinUncorrupt;

/***/ }),

/***/ "./node_modules/docxtemplater/js/lexer.js":
/*!************************************************!*\
  !*** ./node_modules/docxtemplater/js/lexer.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    getUnclosedTagException = _require.getUnclosedTagException,
    getUnopenedTagException = _require.getUnopenedTagException,
    getDuplicateOpenTagException = _require.getDuplicateOpenTagException,
    getDuplicateCloseTagException = _require.getDuplicateCloseTagException,
    throwMalformedXml = _require.throwMalformedXml,
    throwXmlInvalid = _require.throwXmlInvalid,
    XTTemplateError = _require.XTTemplateError;

var _require2 = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    wordToUtf8 = _require2.wordToUtf8,
    concatArrays = _require2.concatArrays,
    isTextStart = _require2.isTextStart,
    isTextEnd = _require2.isTextEnd;

var NONE = -2;
var EQUAL = 0;
var START = -1;
var END = 1;

function inRange(range, match) {
  return range[0] <= match.offset && match.offset < range[1];
}

function updateInTextTag(part, inTextTag) {
  if (isTextStart(part)) {
    if (inTextTag) {
      throwMalformedXml(part);
    }

    return true;
  }

  if (isTextEnd(part)) {
    if (!inTextTag) {
      throwMalformedXml(part);
    }

    return false;
  }

  return inTextTag;
}

function getTag(tag) {
  var position = "";
  var start = 1;
  var end = tag.indexOf(" ");

  if (tag[tag.length - 2] === "/") {
    position = "selfclosing";

    if (end === -1) {
      end = tag.length - 2;
    }
  } else if (tag[1] === "/") {
    start = 2;
    position = "end";

    if (end === -1) {
      end = tag.length - 1;
    }
  } else {
    position = "start";

    if (end === -1) {
      end = tag.length - 1;
    }
  }

  return {
    tag: tag.slice(start, end),
    position: position
  };
}

function tagMatcher(content, textMatchArray, othersMatchArray) {
  var cursor = 0;
  var contentLength = content.length;
  var allMatches = concatArrays([textMatchArray.map(function (tag) {
    return {
      tag: tag,
      text: true
    };
  }), othersMatchArray.map(function (tag) {
    return {
      tag: tag,
      text: false
    };
  })]).reduce(function (allMatches, t) {
    allMatches[t.tag] = t.text;
    return allMatches;
  }, {});
  var totalMatches = [];

  while (cursor < contentLength) {
    cursor = content.indexOf("<", cursor);

    if (cursor === -1) {
      break;
    }

    var offset = cursor;
    var nextOpening = content.indexOf("<", cursor + 1);
    cursor = content.indexOf(">", cursor);

    if (cursor === -1 || nextOpening !== -1 && cursor > nextOpening) {
      throwXmlInvalid(content, offset);
    }

    var tagText = content.slice(offset, cursor + 1);

    var _getTag = getTag(tagText),
        tag = _getTag.tag,
        position = _getTag.position;

    var text = allMatches[tag];

    if (text == null) {
      continue;
    }

    totalMatches.push({
      type: "tag",
      position: position,
      text: text,
      offset: offset,
      value: tagText,
      tag: tag
    });
  }

  return totalMatches;
}

function getDelimiterErrors(delimiterMatches, fullText) {
  var errors = [];
  var inDelimiter = false;
  var lastDelimiterMatch = {
    offset: 0
  };
  var xtag;
  delimiterMatches.forEach(function (delimiterMatch) {
    xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);

    if (delimiterMatch.position === "start" && inDelimiter || delimiterMatch.position === "end" && !inDelimiter) {
      if (delimiterMatch.position === "start") {
        if (lastDelimiterMatch.offset + lastDelimiterMatch.length === delimiterMatch.offset) {
          xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset + lastDelimiterMatch.length + 4);
          errors.push(getDuplicateOpenTagException({
            xtag: xtag,
            offset: lastDelimiterMatch.offset
          }));
        } else {
          errors.push(getUnclosedTagException({
            xtag: xtag,
            offset: lastDelimiterMatch.offset
          }));
        }

        delimiterMatch.error = true;
      } else {
        if (lastDelimiterMatch.offset + lastDelimiterMatch.length === delimiterMatch.offset) {
          xtag = fullText.substr(lastDelimiterMatch.offset - 4, delimiterMatch.offset - lastDelimiterMatch.offset + 4 + lastDelimiterMatch.length);
          errors.push(getDuplicateCloseTagException({
            xtag: xtag,
            offset: lastDelimiterMatch.offset
          }));
        } else {
          errors.push(getUnopenedTagException({
            xtag: xtag,
            offset: delimiterMatch.offset
          }));
        }

        delimiterMatch.error = true;
      }
    } else {
      inDelimiter = !inDelimiter;
    }

    lastDelimiterMatch = delimiterMatch;
  });
  var delimiterMatch = {
    offset: fullText.length
  };
  xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);

  if (inDelimiter) {
    errors.push(getUnclosedTagException({
      xtag: xtag,
      offset: lastDelimiterMatch.offset
    }));
    delimiterMatch.error = true;
  }

  return errors;
}

function compareOffsets(startOffset, endOffset) {
  if (startOffset === -1 && endOffset === -1) {
    return NONE;
  }

  if (startOffset === endOffset) {
    return EQUAL;
  }

  if (startOffset === -1 || endOffset === -1) {
    return endOffset < startOffset ? START : END;
  }

  return startOffset < endOffset ? START : END;
}

function splitDelimiters(inside) {
  var newDelimiters = inside.split(" ");

  if (newDelimiters.length !== 2) {
    var err = new XTTemplateError("New Delimiters cannot be parsed");
    err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw err;
  }

  var _newDelimiters = _slicedToArray(newDelimiters, 2),
      start = _newDelimiters[0],
      end = _newDelimiters[1];

  if (start.length === 0 || end.length === 0) {
    var _err = new XTTemplateError("New Delimiters cannot be parsed");

    _err.properties = {
      id: "change_delimiters_invalid",
      explanation: "Cannot parser delimiters"
    };
    throw _err;
  }

  return [start, end];
}

function getAllIndexes(fullText, delimiters) {
  var indexes = [];
  var start = delimiters.start,
      end = delimiters.end;
  var offset = -1;
  var insideTag = false;

  while (true) {
    var startOffset = fullText.indexOf(start, offset + 1);
    var endOffset = fullText.indexOf(end, offset + 1);
    var position = null;
    var len = void 0;
    var compareResult = compareOffsets(startOffset, endOffset);

    if (compareResult === NONE) {
      return indexes;
    }

    if (compareResult === EQUAL) {
      if (!insideTag) {
        compareResult = START;
      } else {
        compareResult = END;
      }
    }

    if (compareResult === END) {
      insideTag = false;
      offset = endOffset;
      position = "end";
      len = end.length;
    }

    if (compareResult === START) {
      insideTag = true;
      offset = startOffset;
      position = "start";
      len = start.length;
    }

    if (position === "start" && fullText[offset + start.length] === "=") {
      indexes.push({
        offset: startOffset,
        position: "start",
        length: start.length,
        changedelimiter: true
      });
      var nextEqual = fullText.indexOf("=", offset + start.length + 1);

      var _endOffset = fullText.indexOf(end, nextEqual + 1);

      indexes.push({
        offset: _endOffset,
        position: "end",
        length: end.length,
        changedelimiter: true
      });

      var _insideTag = fullText.substr(offset + start.length + 1, nextEqual - offset - start.length - 1);

      var _splitDelimiters = splitDelimiters(_insideTag);

      var _splitDelimiters2 = _slicedToArray(_splitDelimiters, 2);

      start = _splitDelimiters2[0];
      end = _splitDelimiters2[1];
      offset = _endOffset;
      continue;
    }

    indexes.push({
      offset: offset,
      position: position,
      length: len
    });
  }
}

function parseDelimiters(innerContentParts, delimiters) {
  var full = innerContentParts.map(function (p) {
    return p.value;
  }).join("");
  var delimiterMatches = getAllIndexes(full, delimiters);
  var offset = 0;
  var ranges = innerContentParts.map(function (part) {
    offset += part.value.length;
    return {
      offset: offset - part.value.length,
      lIndex: part.lIndex
    };
  });
  var errors = getDelimiterErrors(delimiterMatches, full, ranges);
  var cutNext = 0;
  var delimiterIndex = 0;
  var parsed = ranges.map(function (p, i) {
    var offset = p.offset;
    var range = [offset, offset + innerContentParts[i].value.length];
    var partContent = innerContentParts[i].value;
    var delimitersInOffset = [];

    while (delimiterIndex < delimiterMatches.length && inRange(range, delimiterMatches[delimiterIndex])) {
      delimitersInOffset.push(delimiterMatches[delimiterIndex]);
      delimiterIndex++;
    }

    var parts = [];
    var cursor = 0;

    if (cutNext > 0) {
      cursor = cutNext;
      cutNext = 0;
    }

    var insideDelimiterChange;
    delimitersInOffset.forEach(function (delimiterInOffset) {
      var value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);

      if (value.length > 0) {
        if (insideDelimiterChange) {
          if (delimiterInOffset.changedelimiter) {
            cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
            insideDelimiterChange = delimiterInOffset.position === "start";
          }

          return;
        }

        parts.push({
          type: "content",
          value: value
        });
        cursor += value.length;
      }

      var delimiterPart = {
        type: "delimiter",
        position: delimiterInOffset.position,
        offset: cursor + offset
      };

      if (delimiterInOffset.changedelimiter) {
        insideDelimiterChange = delimiterInOffset.position === "start";
        cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
        return;
      }

      parts.push(delimiterPart);
      cursor = delimiterInOffset.offset - offset + delimiterInOffset.length;
    });
    cutNext = cursor - partContent.length;
    var value = partContent.substr(cursor);

    if (value.length > 0) {
      parts.push({
        type: "content",
        value: value
      });
    }

    return parts;
  }, this);
  return {
    parsed: parsed,
    errors: errors
  };
}

function getContentParts(xmlparsed) {
  return xmlparsed.filter(function (part) {
    return part.type === "content" && part.position === "insidetag";
  });
}

function decodeContentParts(xmlparsed) {
  var inTextTag = false;
  xmlparsed.forEach(function (part) {
    inTextTag = updateInTextTag(part, inTextTag);

    if (part.type === "content") {
      part.position = inTextTag ? "insidetag" : "outsidetag";
    }

    if (inTextTag && part.type === "content") {
      part.value = wordToUtf8(part.value);
    }
  });
}

module.exports = {
  parseDelimiters: parseDelimiters,
  parse: function parse(xmlparsed, delimiters) {
    decodeContentParts(xmlparsed);

    var _parseDelimiters = parseDelimiters(getContentParts(xmlparsed), delimiters),
        delimiterParsed = _parseDelimiters.parsed,
        errors = _parseDelimiters.errors;

    var lexed = [];
    var index = 0;
    xmlparsed.forEach(function (part) {
      if (part.type === "content" && part.position === "insidetag") {
        Array.prototype.push.apply(lexed, delimiterParsed[index].map(function (p) {
          if (p.type === "content") {
            p.position = "insidetag";
          }

          return p;
        }));
        index++;
      } else {
        lexed.push(part);
      }
    });
    lexed.forEach(function (p, i) {
      p.lIndex = i;
    });
    return {
      errors: errors,
      lexed: lexed
    };
  },
  xmlparse: function xmlparse(content, xmltags) {
    var matches = tagMatcher(content, xmltags.text, xmltags.other);
    var cursor = 0;
    var parsed = matches.reduce(function (parsed, match) {
      var value = content.substr(cursor, match.offset - cursor);

      if (value.length > 0) {
        parsed.push({
          type: "content",
          value: value
        });
      }

      cursor = match.offset + match.value.length;
      delete match.offset;
      parsed.push(match);
      return parsed;
    }, []);
    var value = content.substr(cursor);

    if (value.length > 0) {
      parsed.push({
        type: "content",
        value: value
      });
    }

    return parsed;
  }
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/mergesort.js":
/*!****************************************************!*\
  !*** ./node_modules/docxtemplater/js/mergesort.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


function getMinFromArrays(arrays, state) {
  var minIndex = -1;

  for (var i = 0, l = arrays.length; i < l; i++) {
    if (state[i] >= arrays[i].length) {
      continue;
    }

    if (minIndex === -1 || arrays[i][state[i]].offset < arrays[minIndex][state[minIndex]].offset) {
      minIndex = i;
    }
  }

  return minIndex;
}

module.exports = function (arrays) {
  var totalLength = arrays.reduce(function (sum, array) {
    return sum + array.length;
  }, 0);
  arrays = arrays.filter(function (array) {
    return array.length > 0;
  });
  var resultArray = new Array(totalLength);
  var state = arrays.map(function () {
    return 0;
  });
  var i = 0;

  while (i <= totalLength - 1) {
    var arrayIndex = getMinFromArrays(arrays, state);
    resultArray[i] = arrays[arrayIndex][state[arrayIndex]];
    state[arrayIndex]++;
    i++;
  }

  return resultArray;
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/module-wrapper.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/module-wrapper.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    XTInternalError = _require.XTInternalError;

function emptyFun() {}

function identity(i) {
  return i;
}

module.exports = function (module) {
  var defaults = {
    set: emptyFun,
    parse: emptyFun,
    render: emptyFun,
    getTraits: emptyFun,
    getFileType: emptyFun,
    nullGetter: emptyFun,
    optionsTransformer: identity,
    postrender: identity,
    errorsTransformer: identity,
    getRenderedMap: identity,
    preparse: identity,
    postparse: identity,
    on: emptyFun,
    resolve: emptyFun
  };

  if (Object.keys(defaults).every(function (key) {
    return !module[key];
  })) {
    var err = new XTInternalError("This module cannot be wrapped, because it doesn't define any of the necessary functions");
    err.properties = {
      id: "module_cannot_be_wrapped",
      explanation: "This module cannot be wrapped, because it doesn't define any of the necessary functions"
    };
    throw err;
  }

  Object.keys(defaults).forEach(function (key) {
    module[key] = module[key] || defaults[key];
  });
  return module;
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/common.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/common.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var _require = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    concatArrays = _require.concatArrays;

var filetypes = __webpack_require__(/*! ../filetypes.js */ "./node_modules/docxtemplater/js/filetypes.js");

var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);

    this.name = "Common";
  }

  _createClass(Common, [{
    key: "getFileType",
    value: function getFileType(_ref) {
      var doc = _ref.doc;
      var invertedContentTypes = doc.invertedContentTypes;

      if (!invertedContentTypes) {
        return;
      }

      var keys = Object.keys(filetypes);

      for (var i = 0, len = keys.length; i < len; i++) {
        var ftCandidate = keys[i];
        var contentTypes = filetypes[ftCandidate];

        for (var j = 0, len2 = contentTypes.length; j < len2; j++) {
          var ct = contentTypes[j];

          if (invertedContentTypes[ct]) {
            doc.targets = concatArrays([doc.targets, invertedContentTypes[ct]]);
            return ftCandidate;
          }
        }
      }
    }
  }]);

  return Common;
}();

module.exports = function () {
  return wrapper(new Common());
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/expand-pair-trait.js":
/*!********************************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/expand-pair-trait.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var traitName = "expandPair";

var mergeSort = __webpack_require__(/*! ../mergesort.js */ "./node_modules/docxtemplater/js/mergesort.js");

var _require = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    getLeft = _require.getLeft,
    getRight = _require.getRight;

var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var _require2 = __webpack_require__(/*! ../traits.js */ "./node_modules/docxtemplater/js/traits.js"),
    getExpandToDefault = _require2.getExpandToDefault;

var _require3 = __webpack_require__(/*! ../errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    getUnmatchedLoopException = _require3.getUnmatchedLoopException,
    getClosingTagNotMatchOpeningTag = _require3.getClosingTagNotMatchOpeningTag,
    getUnbalancedLoopException = _require3.getUnbalancedLoopException;

function getOpenCountChange(part) {
  switch (part.location) {
    case "start":
      return 1;

    case "end":
      return -1;
  }
}

function match(start, end) {
  return start != null && end != null && (start.part.location === "start" && end.part.location === "end" && start.part.value === end.part.value || end.part.value === "");
}

function transformer(traits) {
  var i = 0;
  var errors = [];

  while (i < traits.length) {
    var part = traits[i].part;

    if (part.location === "end") {
      if (i === 0) {
        traits.splice(0, 1);
        errors.push(getUnmatchedLoopException(part));
        return {
          traits: traits,
          errors: errors
        };
      }

      var endIndex = i;
      var startIndex = i - 1;
      var offseter = 1;

      if (match(traits[startIndex], traits[endIndex])) {
        traits.splice(endIndex, 1);
        traits.splice(startIndex, 1);
        return {
          errors: errors,
          traits: traits
        };
      }

      while (offseter < 50) {
        var startCandidate = traits[startIndex - offseter];
        var endCandidate = traits[endIndex + offseter];

        if (match(startCandidate, traits[endIndex])) {
          traits.splice(endIndex, 1);
          traits.splice(startIndex - offseter, 1);
          return {
            errors: errors,
            traits: traits
          };
        }

        if (match(traits[startIndex], endCandidate)) {
          traits.splice(endIndex + offseter, 1);
          traits.splice(startIndex, 1);
          return {
            errors: errors,
            traits: traits
          };
        }

        offseter++;
      }

      errors.push(getClosingTagNotMatchOpeningTag({
        tags: [traits[startIndex].part, traits[endIndex].part]
      }));
      traits.splice(endIndex, 1);
      traits.splice(startIndex, 1);
      return {
        traits: traits,
        errors: errors
      };
    }

    i++;
  }

  traits.forEach(function (_ref) {
    var part = _ref.part;
    errors.push(getUnmatchedLoopException(part));
  });
  return {
    traits: [],
    errors: errors
  };
}

function getPairs(traits) {
  var levelTraits = {};
  var errors = [];
  var pairs = [];
  var countOpen = 0;
  var transformedTraits = [];

  for (var i = 0; i < traits.length; i++) {
    var currentTrait = traits[i];
    var part = currentTrait.part;
    var change = getOpenCountChange(currentTrait.part);
    countOpen += change;
    var level = void 0;

    if (change === 1) {
      level = countOpen - 1;
    } else {
      level = countOpen;
    }

    transformedTraits.push({
      level: level,
      part: part
    });
  }

  while (transformedTraits.length > 0) {
    var result = transformer(transformedTraits);
    errors = errors.concat(result.errors);
    transformedTraits = result.traits;
  }

  if (errors.length > 0) {
    return {
      pairs: pairs,
      errors: errors
    };
  }

  countOpen = 0;

  for (var _i = 0; _i < traits.length; _i++) {
    var _currentTrait = traits[_i];
    var _part = _currentTrait.part;

    var _change = getOpenCountChange(_part);

    countOpen += _change;

    if (_change === 1) {
      levelTraits[countOpen] = _currentTrait;
    } else {
      var startTrait = levelTraits[countOpen + 1];

      if (countOpen === 0) {
        pairs = pairs.concat([[startTrait, _currentTrait]]);
      }
    }

    countOpen = countOpen >= 0 ? countOpen : 0;
  }

  return {
    pairs: pairs,
    errors: errors
  };
}

var expandPairTrait = {
  name: "ExpandPairTrait",
  optionsTransformer: function optionsTransformer(options, docxtemplater) {
    this.expandTags = docxtemplater.fileTypeConfig.expandTags.concat(docxtemplater.options.paragraphLoop ? docxtemplater.fileTypeConfig.onParagraphLoop : []);
    return options;
  },
  postparse: function postparse(postparsed, _ref2) {
    var _this = this;

    var getTraits = _ref2.getTraits,
        postparse = _ref2.postparse;
    var traits = getTraits(traitName, postparsed);
    traits = traits.map(function (trait) {
      return trait || [];
    });
    traits = mergeSort(traits);

    var _getPairs = getPairs(traits),
        pairs = _getPairs.pairs,
        errors = _getPairs.errors;

    var lastRight = 0;
    var lastPair = null;
    var expandedPairs = pairs.map(function (pair) {
      var expandTo = pair[0].part.expandTo;

      if (expandTo === "auto") {
        var result = getExpandToDefault(postparsed, pair, _this.expandTags);

        if (result.error) {
          errors.push(result.error);
        }

        expandTo = result.value;
      }

      if (!expandTo) {
        var _left = pair[0].offset;
        var _right = pair[1].offset;

        if (_left < lastRight) {
          errors.push(getUnbalancedLoopException(pair, lastPair));
        }

        lastPair = pair;
        lastRight = _right;
        return [_left, _right];
      }

      var left, right;

      try {
        left = getLeft(postparsed, expandTo, pair[0].offset);
      } catch (e) {
        errors.push(e);
      }

      try {
        right = getRight(postparsed, expandTo, pair[1].offset);
      } catch (e) {
        errors.push(e);
      }

      if (left < lastRight) {
        errors.push(getUnbalancedLoopException(pair, lastPair));
      }

      lastRight = right;
      lastPair = pair;
      return [left, right];
    });

    if (errors.length > 0) {
      return {
        postparsed: postparsed,
        errors: errors
      };
    }

    var currentPairIndex = 0;
    var innerParts;
    var newParsed = postparsed.reduce(function (newParsed, part, i) {
      var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i && i <= expandedPairs[currentPairIndex][1];
      var pair = pairs[currentPairIndex];
      var expandedPair = expandedPairs[currentPairIndex];

      if (!inPair) {
        newParsed.push(part);
        return newParsed;
      }

      if (expandedPair[0] === i) {
        innerParts = [];
      }

      if (pair[0].offset !== i && pair[1].offset !== i) {
        innerParts.push(part);
      }

      if (expandedPair[1] === i) {
        var basePart = postparsed[pair[0].offset];
        basePart.subparsed = postparse(innerParts, {
          basePart: basePart
        });
        delete basePart.location;
        delete basePart.expandTo;
        newParsed.push(basePart);
        currentPairIndex++;
      }

      return newParsed;
    }, []);
    return {
      postparsed: newParsed,
      errors: errors
    };
  }
};

module.exports = function () {
  return wrapper(expandPairTrait);
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/loop.js":
/*!*******************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/loop.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    mergeObjects = _require.mergeObjects,
    chunkBy = _require.chunkBy,
    last = _require.last,
    isParagraphStart = _require.isParagraphStart,
    isParagraphEnd = _require.isParagraphEnd,
    isContent = _require.isContent,
    startsWith = _require.startsWith,
    isTagEnd = _require.isTagEnd,
    isTagStart = _require.isTagStart,
    getSingleAttribute = _require.getSingleAttribute,
    setSingleAttribute = _require.setSingleAttribute;

var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var moduleName = "loop";

function hasContent(parts) {
  return parts.some(function (part) {
    return isContent(part);
  });
}

function getFirstMeaningFulPart(parsed) {
  for (var i = 0, len = parsed.length; i < len; i++) {
    if (parsed[i].type !== "content") {
      return parsed[i];
    }
  }

  return null;
}

function isInsideParagraphLoop(part) {
  var firstMeaningfulPart = getFirstMeaningFulPart(part.subparsed);
  return firstMeaningfulPart != null && firstMeaningfulPart.tag !== "w:t";
}

function getPageBreakIfApplies(part) {
  return part.hasPageBreak && isInsideParagraphLoop(part) ? '<w:p><w:r><w:br w:type="page"/></w:r></w:p>' : "";
}

function isEnclosedByParagraphs(parsed) {
  return parsed.length && isParagraphStart(parsed[0]) && isParagraphEnd(last(parsed));
}

function getOffset(chunk) {
  return hasContent(chunk) ? 0 : chunk.length;
}

function addPageBreakAtEnd(subRendered) {
  var found = false;
  var i = subRendered.parts.length - 1;

  for (var j = subRendered.parts.length - 1; i >= 0; i--) {
    var p = subRendered.parts[j];

    if (p === "</w:p>" && !found) {
      found = true;
      subRendered.parts.splice(j, 0, '<w:r><w:br w:type="page"/></w:r>');
      break;
    }
  }

  if (!found) {
    subRendered.parts.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
  }
}

function addPageBreakAtBeginning(subRendered) {
  subRendered.parts.unshift('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
}

function isContinuous(parts) {
  return parts.some(function (part) {
    return part.type === "tag" && part.tag === "w:type" && part.value.indexOf("continuous") !== -1;
  });
}

function addContinuousType(parts) {
  var stop = false;
  var inSectPr = false;
  return parts.reduce(function (result, part) {
    if (stop === false && startsWith(part, "<w:sectPr")) {
      inSectPr = true;
    }

    if (inSectPr) {
      if (startsWith(part, "<w:type")) {
        stop = true;
      }

      if (stop === false && startsWith(part, "</w:sectPr")) {
        result.push('<w:type w:val="continuous"/>');
      }
    }

    result.push(part);
    return result;
  }, []);
}

function dropHeaderFooterRefs(parts) {
  return parts.filter(function (text) {
    return !startsWith(text, "<w:headerReference") && !startsWith(text, "<w:footerReference");
  });
}

function hasPageBreak(chunk) {
  return chunk.some(function (part) {
    return part.tag === "w:br" && part.value.indexOf('w:type="page"') !== -1;
  });
}

function hasImage(chunk) {
  return chunk.some(function (_ref) {
    var tag = _ref.tag;
    return tag === "w:drawing";
  });
}

function getSectPr(chunks) {
  var collectSectPr = false;
  var sectPrs = [];
  chunks.forEach(function (part) {
    if (isTagStart("w:sectPr", part)) {
      sectPrs.push([]);
      collectSectPr = true;
    }

    if (collectSectPr) {
      sectPrs[sectPrs.length - 1].push(part);
    }

    if (isTagEnd("w:sectPr", part)) {
      collectSectPr = false;
    }
  });
  return sectPrs;
}

function getSectPrHeaderFooterChangeCount(chunks) {
  var collectSectPr = false;
  var sectPrCount = 0;
  chunks.forEach(function (part) {
    if (isTagStart("w:sectPr", part)) {
      collectSectPr = true;
    }

    if (collectSectPr) {
      if (part.tag === "w:headerReference" || part.tag === "w:footerReference") {
        sectPrCount++;
        collectSectPr = false;
      }
    }

    if (isTagEnd("w:sectPr", part)) {
      collectSectPr = false;
    }
  });
  return sectPrCount;
}

function getLastSectPr(parsed) {
  var sectPr = [];
  var inSectPr = false;

  for (var i = parsed.length - 1; i >= 0; i--) {
    var part = parsed[i];

    if (isTagEnd("w:sectPr", part)) {
      inSectPr = true;
    }

    if (isTagStart("w:sectPr", part)) {
      sectPr.unshift(part);
      inSectPr = false;
    }

    if (inSectPr) {
      sectPr.unshift(part);
    }

    if (isParagraphStart(part)) {
      if (sectPr.length > 0) {
        return sectPr.map(function (_ref2) {
          var value = _ref2.value;
          return value;
        }).join("");
      }

      break;
    }
  }

  return "";
}

var LoopModule = /*#__PURE__*/function () {
  function LoopModule() {
    _classCallCheck(this, LoopModule);

    this.name = "LoopModule";
    this.inXfrm = false;
    this.totalSectPr = 0;
    this.prefix = {
      start: "#",
      end: "/",
      dash: /^-([^\s]+)\s(.+)$/,
      inverted: "^"
    };
  }

  _createClass(LoopModule, [{
    key: "parse",
    value: function parse(placeHolderContent, _ref3) {
      var match = _ref3.match,
          getValue = _ref3.getValue,
          getValues = _ref3.getValues;
      var module = moduleName;
      var type = "placeholder";
      var _this$prefix = this.prefix,
          start = _this$prefix.start,
          inverted = _this$prefix.inverted,
          dash = _this$prefix.dash,
          end = _this$prefix.end;

      if (match(start, placeHolderContent)) {
        return {
          type: type,
          value: getValue(start, placeHolderContent),
          expandTo: "auto",
          module: module,
          location: "start",
          inverted: false
        };
      }

      if (match(inverted, placeHolderContent)) {
        return {
          type: type,
          value: getValue(inverted, placeHolderContent),
          expandTo: "auto",
          module: module,
          location: "start",
          inverted: true
        };
      }

      if (match(end, placeHolderContent)) {
        return {
          type: type,
          value: getValue(end, placeHolderContent),
          module: module,
          location: "end"
        };
      }

      if (match(dash, placeHolderContent)) {
        var _getValues = getValues(dash, placeHolderContent),
            _getValues2 = _slicedToArray(_getValues, 3),
            expandTo = _getValues2[1],
            value = _getValues2[2];

        return {
          type: type,
          value: value,
          expandTo: expandTo,
          module: module,
          location: "start",
          inverted: false
        };
      }

      return null;
    }
  }, {
    key: "getTraits",
    value: function getTraits(traitName, parsed) {
      if (traitName !== "expandPair") {
        return;
      }

      return parsed.reduce(function (tags, part, offset) {
        if (part.type === "placeholder" && part.module === moduleName && part.subparsed == null) {
          tags.push({
            part: part,
            offset: offset
          });
        }

        return tags;
      }, []);
    }
  }, {
    key: "preparse",
    value: function preparse(parsed) {
      this.sects = getSectPr(parsed);
    }
  }, {
    key: "postparse",
    value: function postparse(parsed, _ref4) {
      var basePart = _ref4.basePart;

      if (basePart) {
        basePart.sectPrCount = getSectPrHeaderFooterChangeCount(parsed);
        this.totalSectPr += basePart.sectPrCount;
        var sects = this.sects;
        sects.some(function (sect, index) {
          if (sect[0].lIndex > basePart.lIndex) {
            if (index + 1 < sects.length && isContinuous(sects[index + 1])) {
              basePart.addContinuousType = true;
            }

            return true;
          }
        });
        basePart.lastParagrapSectPr = getLastSectPr(parsed);
      }

      if (!basePart || basePart.expandTo !== "auto" || basePart.module !== moduleName || !isEnclosedByParagraphs(parsed)) {
        return parsed;
      }

      basePart.paragraphLoop = true;
      var level = 0;
      var chunks = chunkBy(parsed, function (p) {
        if (isParagraphStart(p)) {
          level++;

          if (level === 1) {
            return "start";
          }
        }

        if (isParagraphEnd(p)) {
          level--;

          if (level === 0) {
            return "end";
          }
        }

        return null;
      });
      var firstChunk = chunks[0];
      var lastChunk = last(chunks);
      var firstOffset = getOffset(firstChunk);
      var lastOffset = getOffset(lastChunk);
      basePart.hasPageBreakBeginning = hasPageBreak(firstChunk);
      basePart.hasPageBreak = hasPageBreak(lastChunk);

      if (firstOffset === 0 || lastOffset === 0) {
        return parsed;
      }

      if (hasImage(firstChunk)) {
        firstOffset = 0;
      }

      if (hasImage(lastChunk)) {
        lastOffset = 0;
      }

      return parsed.slice(firstOffset, parsed.length - lastOffset);
    } // eslint-disable-next-line complexity

  }, {
    key: "render",
    value: function render(part, options) {
      if (part.tag === "p:xfrm") {
        this.inXfrm = part.position === "start";
      }

      if (part.tag === "a:ext" && this.inXfrm) {
        this.lastExt = part;
        return part;
      }

      if (part.type !== "placeholder" || part.module !== moduleName) {
        return null;
      }

      var totalValue = [];
      var errors = [];
      var heightOffset = 0;
      var firstTag = part.subparsed[0];
      var tagHeight = 0;

      if (firstTag.tag === "a:tr") {
        tagHeight = +getSingleAttribute(firstTag.value, "h");
      }

      heightOffset -= tagHeight;

      function loopOver(scope, i, length) {
        heightOffset += tagHeight;
        var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value, i, part, length);
        var subRendered = options.render(mergeObjects({}, options, {
          compiled: part.subparsed,
          tags: {},
          scopeManager: scopeManager
        }));

        if (part.hasPageBreak && i === length - 1 && isInsideParagraphLoop(part)) {
          addPageBreakAtEnd(subRendered);
        }

        var isNotFirst = scopeManager.scopePathItem.some(function (i) {
          return i !== 0;
        });

        if (isNotFirst) {
          if (part.sectPrCount === 1) {
            subRendered.parts = dropHeaderFooterRefs(subRendered.parts);
          }

          if (part.addContinuousType) {
            subRendered.parts = addContinuousType(subRendered.parts);
          }
        }

        if (part.hasPageBreakBeginning && isInsideParagraphLoop(part)) {
          addPageBreakAtBeginning(subRendered);
        }

        totalValue = totalValue.concat(subRendered.parts);
        errors = errors.concat(subRendered.errors || []);
      }

      var result;

      try {
        result = options.scopeManager.loopOver(part.value, loopOver, part.inverted, {
          part: part
        });
      } catch (e) {
        errors.push(e);
        return {
          errors: errors
        };
      } // if the loop is showing empty content


      if (result === false) {
        if (part.lastParagrapSectPr) {
          if (part.paragraphLoop) {
            return {
              value: "<w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr></w:p>")
            };
          }

          return {
            value: "</w:t></w:r></w:p><w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr><w:r><w:t>")
          };
        }

        return {
          value: getPageBreakIfApplies(part) || "",
          errors: errors
        };
      }

      if (heightOffset !== 0) {
        var cy = +getSingleAttribute(this.lastExt.value, "cy");
        this.lastExt.value = setSingleAttribute(this.lastExt.value, "cy", cy + heightOffset);
      }

      return {
        value: options.joinUncorrupt(totalValue, _objectSpread(_objectSpread({}, options), {}, {
          basePart: part
        })),
        errors: errors
      };
    }
  }, {
    key: "resolve",
    value: function resolve(part, options) {
      if (part.type !== "placeholder" || part.module !== moduleName) {
        return null;
      }

      var sm = options.scopeManager;
      var promisedValue = sm.getValueAsync(part.value, {
        part: part
      });
      var promises = [];

      function loopOver(scope, i, length) {
        var scopeManager = sm.createSubScopeManager(scope, part.value, i, part, length);
        promises.push(options.resolve({
          filePath: options.filePath,
          modules: options.modules,
          baseNullGetter: options.baseNullGetter,
          resolve: options.resolve,
          compiled: part.subparsed,
          tags: {},
          scopeManager: scopeManager
        }));
      }

      var errorList = [];
      return promisedValue.then(function (value) {
        sm.loopOverValue(value, loopOver, part.inverted);
        return Promise.all(promises).then(function (r) {
          return r.map(function (_ref5) {
            var resolved = _ref5.resolved,
                errors = _ref5.errors;
            errorList.push.apply(errorList, _toConsumableArray(errors));
            return resolved;
          });
        }).then(function (value) {
          if (errorList.length > 0) {
            throw errorList;
          }

          return value;
        });
      });
    }
  }]);

  return LoopModule;
}();

module.exports = function () {
  return wrapper(new LoopModule());
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/rawxml.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/rawxml.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var traits = __webpack_require__(/*! ../traits.js */ "./node_modules/docxtemplater/js/traits.js");

var _require = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    isContent = _require.isContent;

var _require2 = __webpack_require__(/*! ../errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    throwRawTagShouldBeOnlyTextInParagraph = _require2.throwRawTagShouldBeOnlyTextInParagraph;

var moduleName = "rawxml";

var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

function getInner(_ref) {
  var part = _ref.part,
      left = _ref.left,
      right = _ref.right,
      postparsed = _ref.postparsed,
      index = _ref.index;
  var paragraphParts = postparsed.slice(left + 1, right);
  paragraphParts.forEach(function (p, i) {
    if (i === index - left - 1) {
      return;
    }

    if (isContent(p)) {
      throwRawTagShouldBeOnlyTextInParagraph({
        paragraphParts: paragraphParts,
        part: part
      });
    }
  });
  return part;
}

var RawXmlModule = /*#__PURE__*/function () {
  function RawXmlModule() {
    _classCallCheck(this, RawXmlModule);

    this.name = "RawXmlModule";
    this.prefix = "@";
  }

  _createClass(RawXmlModule, [{
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.fileTypeConfig = docxtemplater.fileTypeConfig;
      return options;
    }
  }, {
    key: "parse",
    value: function parse(placeHolderContent, _ref2) {
      var match = _ref2.match,
          getValue = _ref2.getValue;
      var type = "placeholder";

      if (match(this.prefix, placeHolderContent)) {
        return {
          type: type,
          value: getValue(this.prefix, placeHolderContent),
          module: moduleName
        };
      }

      return null;
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed) {
      return traits.expandToOne(postparsed, {
        moduleName: moduleName,
        getInner: getInner,
        expandTo: this.fileTypeConfig.tagRawXml,
        error: {
          message: "Raw tag not in paragraph",
          id: "raw_tag_outerxml_invalid",
          explanation: function explanation(part) {
            return "The tag \"".concat(part.value, "\" is not inside a paragraph, putting raw tags inside an inline loop is disallowed.");
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render(part, options) {
      if (part.module !== moduleName) {
        return null;
      }

      var value;
      var errors = [];

      try {
        value = options.scopeManager.getValue(part.value, {
          part: part
        });

        if (value == null) {
          value = options.nullGetter(part);
        }
      } catch (e) {
        errors.push(e);
        return {
          errors: errors
        };
      }

      if (!value) {
        return {
          value: ""
        };
      }

      return {
        value: value
      };
    }
  }]);

  return RawXmlModule;
}();

module.exports = function () {
  return wrapper(new RawXmlModule());
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/render.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/render.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var _require = __webpack_require__(/*! ../errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    getScopeCompilationError = _require.getScopeCompilationError;

var _require2 = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    utf8ToWord = _require2.utf8ToWord,
    hasCorruptCharacters = _require2.hasCorruptCharacters;

var _require3 = __webpack_require__(/*! ../errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    getCorruptCharactersException = _require3.getCorruptCharactersException;

var ftprefix = {
  docx: "w",
  pptx: "a"
};

var Render = /*#__PURE__*/function () {
  function Render() {
    _classCallCheck(this, Render);

    this.name = "Render";
    this.recordRun = false;
    this.recordedRun = [];
  }

  _createClass(Render, [{
    key: "set",
    value: function set(obj) {
      if (obj.compiled) {
        this.compiled = obj.compiled;
      }

      if (obj.data != null) {
        this.data = obj.data;
      }
    }
  }, {
    key: "getRenderedMap",
    value: function getRenderedMap(mapper) {
      var _this = this;

      return Object.keys(this.compiled).reduce(function (mapper, from) {
        mapper[from] = {
          from: from,
          data: _this.data
        };
        return mapper;
      }, mapper);
    }
  }, {
    key: "optionsTransformer",
    value: function optionsTransformer(options, docxtemplater) {
      this.parser = docxtemplater.parser;
      this.fileType = docxtemplater.fileType;
      return options;
    }
  }, {
    key: "postparse",
    value: function postparse(postparsed, options) {
      var _this2 = this;

      var errors = [];
      postparsed.forEach(function (p) {
        if (p.type === "placeholder") {
          var tag = p.value;

          try {
            options.cachedParsers[p.lIndex] = _this2.parser(tag, {
              tag: p
            });
          } catch (rootError) {
            errors.push(getScopeCompilationError({
              tag: tag,
              rootError: rootError,
              offset: p.offset
            }));
          }
        }
      });
      return {
        postparsed: postparsed,
        errors: errors
      };
    }
  }, {
    key: "recordRuns",
    value: function recordRuns(part) {
      if (part.tag === "".concat(ftprefix[this.fileType], ":r")) {
        this.recordedRun = [];
      } else if (part.tag === "".concat(ftprefix[this.fileType], ":rPr")) {
        if (part.position === "start") {
          this.recordRun = true;
          this.recordedRun = [part.value];
        }

        if (part.position === "end") {
          this.recordedRun.push(part.value);
          this.recordRun = false;
        }
      } else if (this.recordRun) {
        this.recordedRun.push(part.value);
      }
    }
  }, {
    key: "render",
    value: function render(part, _ref) {
      var scopeManager = _ref.scopeManager,
          linebreaks = _ref.linebreaks,
          nullGetter = _ref.nullGetter;

      if (linebreaks) {
        this.recordRuns(part);
      }

      if (part.type !== "placeholder" || part.module) {
        return;
      }

      var value;

      try {
        value = scopeManager.getValue(part.value, {
          part: part
        });
      } catch (e) {
        return {
          errors: [e]
        };
      }

      if (value == null) {
        value = nullGetter(part);
      }

      if (hasCorruptCharacters(value)) {
        return {
          errors: [getCorruptCharactersException({
            tag: part.value,
            value: value,
            offset: part.offset
          })]
        };
      }

      return {
        value: linebreaks && typeof value === "string" ? this.renderLineBreaks(value) : utf8ToWord(value)
      };
    }
  }, {
    key: "renderLineBreaks",
    value: function renderLineBreaks(value) {
      var p = ftprefix[this.fileType];
      var br = this.fileType === "docx" ? "<w:r><w:br/></w:r>" : "<a:br/>";
      var lines = value.split("\n");
      var runprops = this.recordedRun.join("");
      return lines.map(function (line) {
        return utf8ToWord(line);
      }).join("</".concat(p, ":t></").concat(p, ":r>").concat(br, "<").concat(p, ":r>").concat(runprops, "<").concat(p, ":t").concat(this.fileType === "docx" ? ' xml:space="preserve"' : "", ">"));
    }
  }]);

  return Render;
}();

module.exports = function () {
  return wrapper(new Render());
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/modules/space-preserve.js":
/*!*****************************************************************!*\
  !*** ./node_modules/docxtemplater/js/modules/space-preserve.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var wrapper = __webpack_require__(/*! ../module-wrapper.js */ "./node_modules/docxtemplater/js/module-wrapper.js");

var _require = __webpack_require__(/*! ../doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    isTextStart = _require.isTextStart,
    isTextEnd = _require.isTextEnd,
    endsWith = _require.endsWith,
    startsWith = _require.startsWith;

var wTpreserve = '<w:t xml:space="preserve">';
var wTpreservelen = wTpreserve.length;
var wtEnd = "</w:t>";
var wtEndlen = wtEnd.length;

function isWtStart(part) {
  return isTextStart(part) && part.tag === "w:t";
}

function addXMLPreserve(chunk, index) {
  var tag = chunk[index].value;

  if (chunk[index + 1].value === "</w:t>") {
    return tag;
  }

  if (tag.indexOf('xml:space="preserve"') !== -1) {
    return tag;
  }

  return tag.substr(0, tag.length - 1) + ' xml:space="preserve">';
}

function isInsideLoop(meta, chunk) {
  return meta && meta.basePart && chunk.length > 1;
}

var spacePreserve = {
  name: "SpacePreserveModule",
  postparse: function postparse(postparsed, meta) {
    var chunk = [],
        inTextTag = false,
        endLindex = 0,
        lastTextTag = 0;

    function isStartingPlaceHolder(part, chunk) {
      return part.type === "placeholder" && (!part.module || part.module === "loop") && chunk.length > 1;
    }

    var result = postparsed.reduce(function (postparsed, part) {
      if (isWtStart(part)) {
        inTextTag = true;
        lastTextTag = chunk.length;
      }

      if (!inTextTag) {
        postparsed.push(part);
        return postparsed;
      }

      chunk.push(part);

      if (isInsideLoop(meta, chunk)) {
        endLindex = meta.basePart.endLindex;
        chunk[0].value = addXMLPreserve(chunk, 0);
      }

      if (isStartingPlaceHolder(part, chunk)) {
        chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
        endLindex = part.endLindex;
      }

      if (isTextEnd(part) && part.lIndex > endLindex) {
        if (endLindex !== 0) {
          chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
        }

        Array.prototype.push.apply(postparsed, chunk);
        chunk = [];
        inTextTag = false;
        endLindex = 0;
        lastTextTag = 0;
      }

      return postparsed;
    }, []);
    Array.prototype.push.apply(result, chunk);
    return result;
  },
  postrender: function postrender(parts) {
    var lastNonEmpty = "";
    var lastNonEmptyIndex = 0;
    return parts.reduce(function (newParts, p, index) {
      if (p === "") {
        newParts.push(p);
        return newParts;
      }

      if (p.indexOf('<w:t xml:space="preserve"></w:t>') !== -1) {
        p = p.replace(/<w:t xml:space="preserve"><\/w:t>/g, "<w:t/>");
      }

      if (endsWith(lastNonEmpty, wTpreserve) && startsWith(p, wtEnd)) {
        newParts[lastNonEmptyIndex] = lastNonEmpty.substr(0, lastNonEmpty.length - wTpreservelen) + "<w:t/>";
        p = p.substr(wtEndlen);
      }

      lastNonEmpty = p;
      lastNonEmptyIndex = index;
      newParts.push(p);
      return newParts;
    }, []);
  }
};

module.exports = function () {
  return wrapper(spacePreserve);
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/parser.js":
/*!*************************************************!*\
  !*** ./node_modules/docxtemplater/js/parser.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    concatArrays = _require.concatArrays;

var _require2 = __webpack_require__(/*! ./prefix-matcher.js */ "./node_modules/docxtemplater/js/prefix-matcher.js"),
    match = _require2.match,
    getValue = _require2.getValue,
    getValues = _require2.getValues;

function moduleParse(placeHolderContent, options) {
  var modules = options.modules;
  var startOffset = options.startOffset;
  var endLindex = options.lIndex;
  var moduleParsed;
  options.offset = startOffset;
  options.match = match;
  options.getValue = getValue;
  options.getValues = getValues;

  for (var i = 0, l = modules.length; i < l; i++) {
    var _module = modules[i];
    moduleParsed = _module.parse(placeHolderContent, options);

    if (moduleParsed) {
      moduleParsed.offset = startOffset;
      moduleParsed.endLindex = endLindex;
      moduleParsed.lIndex = endLindex;
      moduleParsed.raw = placeHolderContent;
      return moduleParsed;
    }
  }

  return {
    type: "placeholder",
    value: placeHolderContent,
    offset: startOffset,
    endLindex: endLindex,
    lIndex: endLindex
  };
}

var parser = {
  preparse: function preparse(parsed, modules, options) {
    function preparse(parsed, options) {
      return modules.forEach(function (module) {
        module.preparse(parsed, options);
      });
    }

    return {
      preparsed: preparse(parsed, options)
    };
  },
  postparse: function postparse(postparsed, modules, options) {
    function getTraits(traitName, postparsed) {
      return modules.map(function (module) {
        return module.getTraits(traitName, postparsed);
      });
    }

    var errors = [];

    function _postparse(postparsed, options) {
      return modules.reduce(function (postparsed, module) {
        var r = module.postparse(postparsed, _objectSpread(_objectSpread({}, options), {}, {
          postparse: function postparse(parsed, opts) {
            return _postparse(parsed, _objectSpread(_objectSpread({}, options), opts));
          },
          getTraits: getTraits
        }));

        if (r == null) {
          return postparsed;
        }

        if (r.errors) {
          errors = concatArrays([errors, r.errors]);
          return r.postparsed;
        }

        return r;
      }, postparsed);
    }

    return {
      postparsed: _postparse(postparsed, options),
      errors: errors
    };
  },
  parse: function parse(lexed, modules, options) {
    var inPlaceHolder = false;
    var placeHolderContent = "";
    var startOffset;
    var tailParts = [];
    return lexed.reduce(function lexedToParsed(parsed, token) {
      if (token.type === "delimiter") {
        inPlaceHolder = token.position === "start";

        if (token.position === "end") {
          options.parse = function (placeHolderContent) {
            return moduleParse(placeHolderContent, _objectSpread(_objectSpread(_objectSpread({}, options), token), {}, {
              startOffset: startOffset,
              modules: modules
            }));
          };

          parsed.push(options.parse(placeHolderContent));
          Array.prototype.push.apply(parsed, tailParts);
          tailParts = [];
        }

        if (token.position === "start") {
          tailParts = [];
          startOffset = token.offset;
        }

        placeHolderContent = "";
        return parsed;
      }

      if (!inPlaceHolder) {
        parsed.push(token);
        return parsed;
      }

      if (token.type !== "content" || token.position !== "insidetag") {
        tailParts.push(token);
        return parsed;
      }

      placeHolderContent += token.value;
      return parsed;
    }, []);
  }
};
module.exports = parser;

/***/ }),

/***/ "./node_modules/docxtemplater/js/postrender.js":
/*!*****************************************************!*\
  !*** ./node_modules/docxtemplater/js/postrender.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


function postrender(parts, options) {
  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    parts = _module.postrender(parts, options);
  }

  return options.joinUncorrupt(parts, options);
}

module.exports = postrender;

/***/ }),

/***/ "./node_modules/docxtemplater/js/prefix-matcher.js":
/*!*********************************************************!*\
  !*** ./node_modules/docxtemplater/js/prefix-matcher.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


var nbspRegex = new RegExp(String.fromCharCode(160), "g");

function replaceNbsps(str) {
  return str.replace(nbspRegex, " ");
}

function match(condition, placeHolderContent) {
  if (typeof condition === "string") {
    return replaceNbsps(placeHolderContent.substr(0, condition.length)) === condition;
  }

  if (condition instanceof RegExp) {
    return condition.test(placeHolderContent);
  }
}

function getValue(condition, placeHolderContent) {
  if (typeof condition === "string") {
    return placeHolderContent.substr(condition.length);
  }

  if (condition instanceof RegExp) {
    return placeHolderContent.match(condition)[1];
  }
}

function getValues(condition, placeHolderContent) {
  if (condition instanceof RegExp) {
    return placeHolderContent.match(condition);
  }
}

module.exports = {
  match: match,
  getValue: getValue,
  getValues: getValues
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/render.js":
/*!*************************************************!*\
  !*** ./node_modules/docxtemplater/js/render.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    concatArrays = _require.concatArrays,
    utf8ToWord = _require.utf8ToWord;

var _require2 = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    throwUnimplementedTagType = _require2.throwUnimplementedTagType;

function moduleRender(part, options) {
  var moduleRendered;

  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleRendered = _module.render(part, options);

    if (moduleRendered) {
      return moduleRendered;
    }
  }

  return false;
}

function render(options) {
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
      scopeManager = options.scopeManager;

  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };

  if (!options.prefix) {
    options.prefix = "";
  }

  if (options.index) {
    options.prefix = options.prefix + options.index + "-";
  }

  var errors = [];
  var parts = compiled.map(function (part, i) {
    options.index = i;
    var moduleRendered = moduleRender(part, options);

    if (moduleRendered) {
      if (moduleRendered.errors) {
        errors = concatArrays([errors, moduleRendered.errors]);
      }

      return moduleRendered;
    }

    if (part.type === "content" || part.type === "tag") {
      if (part.position === "insidetag") {
        part.value = utf8ToWord(part.value);
      }

      return part;
    }

    throwUnimplementedTagType(part, i);
  }).map(function (_ref) {
    var value = _ref.value;
    return value;
  });
  return {
    errors: errors,
    parts: parts
  };
}

module.exports = render;

/***/ }),

/***/ "./node_modules/docxtemplater/js/resolve.js":
/*!**************************************************!*\
  !*** ./node_modules/docxtemplater/js/resolve.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function moduleResolve(part, options) {
  var moduleResolved;

  for (var i = 0, l = options.modules.length; i < l; i++) {
    var _module = options.modules[i];
    moduleResolved = _module.resolve(part, options);

    if (moduleResolved) {
      return moduleResolved;
    }
  }

  return false;
}

function resolve(options) {
  var resolved = [];
  var baseNullGetter = options.baseNullGetter;
  var compiled = options.compiled,
      scopeManager = options.scopeManager;

  options.nullGetter = function (part, sm) {
    return baseNullGetter(part, sm || scopeManager);
  };

  options.resolved = resolved;
  var errors = [];
  return Promise.all(compiled.filter(function (part) {
    return ["content", "tag"].indexOf(part.type) === -1;
  }).reduce(function (promises, part) {
    var moduleResolved = moduleResolve(part, options);
    var result;

    if (moduleResolved) {
      result = moduleResolved.then(function (value) {
        resolved.push({
          tag: part.value,
          value: value,
          lIndex: part.lIndex
        });
      });
    } else if (part.type === "placeholder") {
      result = scopeManager.getValueAsync(part.value, {
        part: part
      }).then(function (value) {
        if (value == null) {
          value = options.nullGetter(part);
        }

        resolved.push({
          tag: part.value,
          value: value,
          lIndex: part.lIndex
        });
        return value;
      });
    } else {
      return;
    }

    promises.push(result["catch"](function (e) {
      if (e.length > 1) {
        errors.push.apply(errors, _toConsumableArray(e));
      } else {
        errors.push(e);
      }
    }));
    return promises;
  }, [])).then(function () {
    return {
      errors: errors,
      resolved: resolved
    };
  });
}

module.exports = resolve;

/***/ }),

/***/ "./node_modules/docxtemplater/js/scope-manager.js":
/*!********************************************************!*\
  !*** ./node_modules/docxtemplater/js/scope-manager.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    getScopeParserExecutionError = _require.getScopeParserExecutionError;

var _require2 = __webpack_require__(/*! ./utils.js */ "./node_modules/docxtemplater/js/utils.js"),
    last = _require2.last;

var _require3 = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    concatArrays = _require3.concatArrays;

function find(list, fn) {
  var length = list.length >>> 0;
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];

    if (fn.call(this, value, i, list)) {
      return value;
    }
  }

  return undefined;
}

function _getValue(tag, meta, num) {
  var _this = this;

  var scope = this.scopeList[num];

  if (this.root.finishedResolving) {
    var w = this.resolved;
    this.scopePath.slice(this.resolveOffset).forEach(function (p, index) {
      var lIndex = _this.scopeLindex[index];
      w = find(w, function (r) {
        return r.lIndex === lIndex;
      });
      w = w.value[_this.scopePathItem[index]];
    });
    return find(w, function (r) {
      return meta.part.lIndex === r.lIndex;
    }).value;
  } // search in the scopes (in reverse order) and keep the first defined value


  var result;
  var parser;

  if (!this.cachedParsers || !meta.part) {
    parser = this.parser(tag, {
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      scopePath: this.scopePath
    });
  }

  try {
    result = parser.get(scope, this.getContext(meta, num));
  } catch (error) {
    throw getScopeParserExecutionError({
      tag: tag,
      scope: scope,
      error: error,
      offset: meta.part.offset
    });
  }

  if (result == null && num > 0) {
    return _getValue.call(this, tag, meta, num - 1);
  }

  return result;
}

function _getValueAsync(tag, meta, num) {
  var _this2 = this;

  var scope = this.scopeList[num]; // search in the scopes (in reverse order) and keep the first defined value

  var parser;

  if (!this.cachedParsers || !meta.part) {
    parser = this.parser(tag, {
      scopePath: this.scopePath
    });
  } else if (this.cachedParsers[meta.part.lIndex]) {
    parser = this.cachedParsers[meta.part.lIndex];
  } else {
    parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
      scopePath: this.scopePath
    });
  }

  return Promise.resolve().then(function () {
    return parser.get(scope, _this2.getContext(meta, num));
  })["catch"](function (error) {
    throw getScopeParserExecutionError({
      tag: tag,
      scope: scope,
      error: error,
      offset: meta.part.offset
    });
  }).then(function (result) {
    if (result == null && num > 0) {
      return _getValueAsync.call(_this2, tag, meta, num - 1);
    }

    return result;
  });
}

var ScopeManager = /*#__PURE__*/function () {
  function ScopeManager(options) {
    _classCallCheck(this, ScopeManager);

    this.root = options.root || this;
    this.resolveOffset = options.resolveOffset || 0;
    this.scopePath = options.scopePath;
    this.scopePathItem = options.scopePathItem;
    this.scopePathLength = options.scopePathLength;
    this.scopeList = options.scopeList;
    this.scopeLindex = options.scopeLindex;
    this.parser = options.parser;
    this.resolved = options.resolved;
    this.cachedParsers = options.cachedParsers;
  }

  _createClass(ScopeManager, [{
    key: "loopOver",
    value: function loopOver(tag, functor, inverted, meta) {
      return this.loopOverValue(this.getValue(tag, meta), functor, inverted);
    }
  }, {
    key: "functorIfInverted",
    value: function functorIfInverted(inverted, functor, value, i, length) {
      if (inverted) {
        functor(value, i, length);
      }

      return inverted;
    }
  }, {
    key: "isValueFalsy",
    value: function isValueFalsy(value, type) {
      return value == null || !value || type === "[object Array]" && value.length === 0;
    }
  }, {
    key: "loopOverValue",
    value: function loopOverValue(value, functor, inverted) {
      if (this.root.finishedResolving) {
        inverted = false;
      }

      var type = Object.prototype.toString.call(value);

      if (this.isValueFalsy(value, type)) {
        return this.functorIfInverted(inverted, functor, last(this.scopeList), 0, 1);
      }

      if (type === "[object Array]") {
        for (var i = 0; i < value.length; i++) {
          this.functorIfInverted(!inverted, functor, value[i], i, value.length);
        }

        return true;
      }

      if (type === "[object Object]") {
        return this.functorIfInverted(!inverted, functor, value, 0, 1);
      }

      return this.functorIfInverted(!inverted, functor, last(this.scopeList), 0, 1);
    }
  }, {
    key: "getValue",
    value: function getValue(tag, meta) {
      var result = _getValue.call(this, tag, meta, this.scopeList.length - 1);

      if (typeof result === "function") {
        return result(this.scopeList[this.scopeList.length - 1], this);
      }

      return result;
    }
  }, {
    key: "getValueAsync",
    value: function getValueAsync(tag, meta) {
      var _this3 = this;

      return _getValueAsync.call(this, tag, meta, this.scopeList.length - 1).then(function (result) {
        if (typeof result === "function") {
          return result(_this3.scopeList[_this3.scopeList.length - 1], _this3);
        }

        return result;
      });
    }
  }, {
    key: "getContext",
    value: function getContext(meta, num) {
      return {
        num: num,
        meta: meta,
        scopeList: this.scopeList,
        resolved: this.resolved,
        scopePath: this.scopePath,
        scopePathItem: this.scopePathItem,
        scopePathLength: this.scopePathLength
      };
    }
  }, {
    key: "createSubScopeManager",
    value: function createSubScopeManager(scope, tag, i, part, length) {
      return new ScopeManager({
        root: this.root,
        resolveOffset: this.resolveOffset,
        resolved: this.resolved,
        parser: this.parser,
        cachedParsers: this.cachedParsers,
        scopeList: concatArrays([this.scopeList, [scope]]),
        scopePath: concatArrays([this.scopePath, [tag]]),
        scopePathItem: concatArrays([this.scopePathItem, [i]]),
        scopePathLength: concatArrays([this.scopePathLength, [length]]),
        scopeLindex: concatArrays([this.scopeLindex, [part.lIndex]])
      });
    }
  }]);

  return ScopeManager;
}();

module.exports = function (options) {
  options.scopePath = [];
  options.scopePathItem = [];
  options.scopePathLength = [];
  options.scopeLindex = [];
  options.scopeList = [options.tags];
  return new ScopeManager(options);
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/traits.js":
/*!*************************************************!*\
  !*** ./node_modules/docxtemplater/js/traits.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    getRightOrNull = _require.getRightOrNull,
    getRight = _require.getRight,
    getLeft = _require.getLeft,
    getLeftOrNull = _require.getLeftOrNull,
    chunkBy = _require.chunkBy,
    isTagStart = _require.isTagStart,
    isTagEnd = _require.isTagEnd,
    isContent = _require.isContent,
    last = _require.last,
    first = _require.first;

var _require2 = __webpack_require__(/*! ./errors.js */ "./node_modules/docxtemplater/js/errors.js"),
    XTTemplateError = _require2.XTTemplateError,
    throwExpandNotFound = _require2.throwExpandNotFound,
    getLoopPositionProducesInvalidXMLError = _require2.getLoopPositionProducesInvalidXMLError;

function lastTagIsOpenTag(tags, tag) {
  if (tags.length === 0) {
    return false;
  }

  var innerLastTag = last(tags).substr(1);
  return innerLastTag.indexOf(tag) === 0;
}

function getListXmlElements(parts) {
  /*
  Gets the list of closing and opening tags between two texts. It doesn't take
  into account tags that are opened then closed. Those that are closed then
  opened are kept
  	Example input :
  	[
  	{
  		"type": "placeholder",
  		"value": "table1",
  		...
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data1",
  	},
  	{
  		"type": "tag",
  		"position": "end",
  		"text": true,
  		"value": "</w:t>",
  		"tag": "w:t",
  		"lIndex": 112
  	},
  	{
  		"type": "tag",
  		"value": "</w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:p>",
  	},
  	{
  		"type": "tag",
  		"value": "</w:tc>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:tc>",
  	},
  	{
  		"type": "content",
  		"value": "<w:tcPr><w:tcW w:w="2444" w:type="dxa"/><w:tcBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/></w:tcBorders><w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/></w:tcPr>",
  	},
  	...
  	{
  		"type": "tag",
  		"value": "<w:r>",
  	},
  	{
  		"type": "tag",
  		"value": "<w:t xml:space="preserve">",
  	},
  	{
  		"type": "placeholder",
  		"value": "t1data4",
  	}
  ]
  	returns
  	[
  		{
  			"tag": "</w:t>",
  		},
  		{
  			"tag": "</w:r>",
  		},
  		{
  			"tag": "</w:p>",
  		},
  		{
  			"tag": "</w:tc>",
  		},
  		{
  			"tag": "<w:tc>",
  		},
  		{
  			"tag": "<w:p>",
  		},
  		{
  			"tag": "<w:r>",
  		},
  		{
  			"tag": "<w:t>",
  		},
  	]
  */
  var tags = parts.filter(function (_ref) {
    var type = _ref.type;
    return type === "tag";
  });
  var result = [];

  for (var i = 0; i < tags.length; i++) {
    var _tags$i = tags[i],
        position = _tags$i.position,
        value = _tags$i.value,
        tag = _tags$i.tag;

    if (position === "end") {
      if (lastTagIsOpenTag(result, tag)) {
        result.pop();
      } else {
        result.push(value);
      }
    } else if (position === "start") {
      result.push(value);
    } // ignore position === "selfclosing"

  }

  return result;
}

function has(name, xmlElements) {
  for (var i = 0; i < xmlElements.length; i++) {
    var xmlElement = xmlElements[i];

    if (xmlElement.indexOf("<".concat(name)) === 0) {
      return true;
    }
  }

  return false;
}

function getExpandToDefault(postparsed, pair, expandTags) {
  var parts = postparsed.slice(pair[0].offset, pair[1].offset);
  var xmlElements = getListXmlElements(parts);
  var closingTagCount = xmlElements.filter(function (tag) {
    return tag[1] === "/";
  }).length;
  var startingTagCount = xmlElements.filter(function (tag) {
    return tag[1] !== "/" && tag[tag.length - 2] !== "/";
  }).length;

  if (closingTagCount !== startingTagCount) {
    return {
      error: getLoopPositionProducesInvalidXMLError({
        tag: first(pair).part.value,
        offset: [first(pair).part.offset, last(pair).part.offset]
      })
    };
  }

  var _loop = function _loop(i, len) {
    var _expandTags$i = expandTags[i],
        contains = _expandTags$i.contains,
        expand = _expandTags$i.expand,
        onlyTextInTag = _expandTags$i.onlyTextInTag;

    if (has(contains, xmlElements)) {
      if (onlyTextInTag) {
        var left = getLeftOrNull(postparsed, contains, pair[0].offset);
        var right = getRightOrNull(postparsed, contains, pair[1].offset);

        if (left === null || right === null) {
          return "continue";
        }

        var chunks = chunkBy(postparsed.slice(left, right), function (p) {
          return isTagStart(contains, p) ? "start" : isTagEnd(contains, p) ? "end" : null;
        });
        var firstChunk = first(chunks);
        var lastChunk = last(chunks);
        var firstContent = firstChunk.filter(isContent);
        var lastContent = lastChunk.filter(isContent);

        if (firstContent.length !== 1 || lastContent.length !== 1) {
          return "continue";
        }
      }

      return {
        v: {
          value: expand
        }
      };
    }
  };

  for (var i = 0, len = expandTags.length; i < len; i++) {
    var _ret = _loop(i, len);

    if (_ret === "continue") continue;
    if (_typeof(_ret) === "object") return _ret.v;
  }

  return false;
}

function expandOne(part, index, postparsed, options) {
  var expandTo = part.expandTo || options.expandTo;

  if (!expandTo) {
    return postparsed;
  }

  var right, left;

  try {
    left = getLeft(postparsed, expandTo, index);
    right = getRight(postparsed, expandTo, index);
  } catch (rootError) {
    if (rootError instanceof XTTemplateError) {
      throwExpandNotFound(_objectSpread({
        part: part,
        rootError: rootError,
        postparsed: postparsed,
        expandTo: expandTo,
        index: index
      }, options.error));
    }

    throw rootError;
  }

  var leftParts = postparsed.slice(left, index);
  var rightParts = postparsed.slice(index + 1, right + 1);
  var inner = options.getInner({
    postparse: options.postparse,
    index: index,
    part: part,
    leftParts: leftParts,
    rightParts: rightParts,
    left: left,
    right: right,
    postparsed: postparsed
  });

  if (!inner.length) {
    inner.expanded = [leftParts, rightParts];
    inner = [inner];
  }

  return {
    left: left,
    right: right,
    inner: inner
  };
}

function expandToOne(postparsed, options) {
  var errors = [];

  if (postparsed.errors) {
    errors = postparsed.errors;
    postparsed = postparsed.postparsed;
  }

  var results = [];

  for (var i = 0, len = postparsed.length; i < len; i++) {
    var part = postparsed[i];

    if (part.type === "placeholder" && part.module === options.moduleName) {
      try {
        var result = expandOne(part, i, postparsed, options);
        i = result.right;
        results.push(result);
      } catch (error) {
        if (error instanceof XTTemplateError) {
          errors.push(error);
        } else {
          throw error;
        }
      }
    }
  }

  var newParsed = [];
  var currentResult = 0;

  for (var _i = 0, _len = postparsed.length; _i < _len; _i++) {
    var _part = postparsed[_i];
    var _result = results[currentResult];

    if (_result && _result.left === _i) {
      newParsed.push.apply(newParsed, _toConsumableArray(results[currentResult].inner));
      currentResult++;
      _i = _result.right;
    } else {
      newParsed.push(_part);
    }
  }

  return {
    postparsed: newParsed,
    errors: errors
  };
}

module.exports = {
  expandToOne: expandToOne,
  getExpandToDefault: getExpandToDefault
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/utils.js":
/*!************************************************!*\
  !*** ./node_modules/docxtemplater/js/utils.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


function last(a) {
  return a[a.length - 1];
}

function first(a) {
  return a[0];
}

module.exports = {
  last: last,
  first: first
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/xml-matcher.js":
/*!******************************************************!*\
  !*** ./node_modules/docxtemplater/js/xml-matcher.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    pregMatchAll = _require.pregMatchAll;

module.exports = function xmlMatcher(content, tagsXmlArray) {
  var res = {
    content: content
  };
  var taj = tagsXmlArray.join("|");
  var regexp = new RegExp("(?:(<(?:".concat(taj, ")[^>]*>)([^<>]*)</(?:").concat(taj, ")>)|(<(?:").concat(taj, ")[^>]*/>)"), "g");
  res.matches = pregMatchAll(regexp, res.content);
  return res;
};

/***/ }),

/***/ "./node_modules/docxtemplater/js/xml-templater.js":
/*!********************************************************!*\
  !*** ./node_modules/docxtemplater/js/xml-templater.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! ./doc-utils.js */ "./node_modules/docxtemplater/js/doc-utils.js"),
    wordToUtf8 = _require.wordToUtf8,
    convertSpaces = _require.convertSpaces;

var xmlMatcher = __webpack_require__(/*! ./xml-matcher.js */ "./node_modules/docxtemplater/js/xml-matcher.js");

var Lexer = __webpack_require__(/*! ./lexer.js */ "./node_modules/docxtemplater/js/lexer.js");

var Parser = __webpack_require__(/*! ./parser.js */ "./node_modules/docxtemplater/js/parser.js");

var _render = __webpack_require__(/*! ./render.js */ "./node_modules/docxtemplater/js/render.js");

var postrender = __webpack_require__(/*! ./postrender.js */ "./node_modules/docxtemplater/js/postrender.js");

var resolve = __webpack_require__(/*! ./resolve.js */ "./node_modules/docxtemplater/js/resolve.js");

var joinUncorrupt = __webpack_require__(/*! ./join-uncorrupt.js */ "./node_modules/docxtemplater/js/join-uncorrupt.js");

function _getFullText(content, tagsXmlArray) {
  var matcher = xmlMatcher(content, tagsXmlArray);
  var result = matcher.matches.map(function (match) {
    return match.array[2];
  });
  return wordToUtf8(convertSpaces(result.join("")));
}

module.exports = /*#__PURE__*/function () {
  function XmlTemplater(content, options) {
    var _this = this;

    _classCallCheck(this, XmlTemplater);

    this.cachedParsers = {};
    this.content = content;
    Object.keys(options).forEach(function (key) {
      _this[key] = options[key];
    });
    this.setModules({
      inspect: {
        filePath: options.filePath
      }
    });
  }

  _createClass(XmlTemplater, [{
    key: "resolveTags",
    value: function resolveTags(tags) {
      var _this2 = this;

      this.tags = tags;
      var options = this.getOptions();
      var filePath = this.filePath;
      options.scopeManager = this.scopeManager;
      options.resolve = resolve;
      return resolve(options).then(function (_ref) {
        var resolved = _ref.resolved,
            errors = _ref.errors;
        errors.forEach(function (error) {
          // error properties might not be defined if some foreign error
          // (unhandled error not thrown by docxtemplater willingly) is
          // thrown.
          error.properties = error.properties || {};
          error.properties.file = filePath;
        });

        if (errors.length !== 0) {
          throw errors;
        }

        return Promise.all(resolved).then(function (resolved) {
          options.scopeManager.root.finishedResolving = true;
          options.scopeManager.resolved = resolved;

          _this2.setModules({
            inspect: {
              resolved: resolved,
              filePath: filePath
            }
          });

          return resolved;
        });
      });
    }
  }, {
    key: "getFullText",
    value: function getFullText() {
      return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
    }
  }, {
    key: "setModules",
    value: function setModules(obj) {
      this.modules.forEach(function (module) {
        module.set(obj);
      });
    }
  }, {
    key: "preparse",
    value: function preparse() {
      this.allErrors = [];
      this.xmllexed = Lexer.xmlparse(this.content, {
        text: this.fileTypeConfig.tagsXmlTextArray,
        other: this.fileTypeConfig.tagsXmlLexedArray
      });
      this.setModules({
        inspect: {
          xmllexed: this.xmllexed
        }
      });

      var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters),
          lexed = _Lexer$parse.lexed,
          lexerErrors = _Lexer$parse.errors;

      this.allErrors = this.allErrors.concat(lexerErrors);
      this.lexed = lexed;
      this.setModules({
        inspect: {
          lexed: this.lexed
        }
      });
      var options = this.getOptions();
      Parser.preparse(this.lexed, this.modules, options);
    }
  }, {
    key: "parse",
    value: function parse() {
      this.setModules({
        inspect: {
          filePath: this.filePath
        }
      });
      var options = this.getOptions();
      this.parsed = Parser.parse(this.lexed, this.modules, options);
      this.setModules({
        inspect: {
          parsed: this.parsed
        }
      });

      var _Parser$postparse = Parser.postparse(this.parsed, this.modules, options),
          postparsed = _Parser$postparse.postparsed,
          postparsedErrors = _Parser$postparse.errors;

      this.postparsed = postparsed;
      this.setModules({
        inspect: {
          postparsed: this.postparsed
        }
      });
      this.allErrors = this.allErrors.concat(postparsedErrors);
      this.errorChecker(this.allErrors);
      return this;
    }
  }, {
    key: "errorChecker",
    value: function errorChecker(errors) {
      var _this3 = this;

      if (errors.length) {
        errors.forEach(function (error) {
          // error properties might not be defined if some foreign
          // (unhandled error not thrown by docxtemplater willingly) is
          // thrown.
          error.properties = error.properties || {};
          error.properties.file = _this3.filePath;
        });
        this.modules.forEach(function (module) {
          errors = module.errorsTransformer(errors);
        });
      }
    }
  }, {
    key: "baseNullGetter",
    value: function baseNullGetter(part, sm) {
      var _this4 = this;

      var value = this.modules.reduce(function (value, module) {
        if (value != null) {
          return value;
        }

        return module.nullGetter(part, sm, _this4);
      }, null);

      if (value != null) {
        return value;
      }

      return this.nullGetter(part, sm);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return {
        compiled: this.postparsed,
        cachedParsers: this.cachedParsers,
        tags: this.tags,
        modules: this.modules,
        parser: this.parser,
        contentType: this.contentType,
        baseNullGetter: this.baseNullGetter.bind(this),
        filePath: this.filePath,
        fileTypeConfig: this.fileTypeConfig,
        linebreaks: this.linebreaks
      };
    }
  }, {
    key: "render",
    value: function render(to) {
      this.filePath = to;
      var options = this.getOptions();
      options.resolved = this.scopeManager.resolved;
      options.scopeManager = this.scopeManager;
      options.render = _render;
      options.joinUncorrupt = joinUncorrupt;

      var _render2 = _render(options),
          errors = _render2.errors,
          parts = _render2.parts;

      this.allErrors = errors;
      this.errorChecker(errors);

      if (errors.length > 0) {
        return this;
      }

      this.content = postrender(parts, options);
      this.setModules({
        inspect: {
          content: this.content
        }
      });
      return this;
    }
  }]);

  return XmlTemplater;
}();

/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/***/ ((module) => {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/pizzip/js/arrayReader.js":
/*!***********************************************!*\
  !*** ./node_modules/pizzip/js/arrayReader.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var DataReader = __webpack_require__(/*! ./dataReader.js */ "./node_modules/pizzip/js/dataReader.js");

function ArrayReader(data) {
  if (data) {
    this.data = data;
    this.length = this.data.length;
    this.index = 0;
    this.zero = 0;

    for (var i = 0; i < this.data.length; i++) {
      data[i] &= data[i];
    }
  }
}

ArrayReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */

ArrayReader.prototype.byteAt = function (i) {
  return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */


ArrayReader.prototype.lastIndexOfSignature = function (sig) {
  var sig0 = sig.charCodeAt(0),
      sig1 = sig.charCodeAt(1),
      sig2 = sig.charCodeAt(2),
      sig3 = sig.charCodeAt(3);

  for (var i = this.length - 4; i >= 0; --i) {
    if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
      return i - this.zero;
    }
  }

  return -1;
};
/**
 * @see DataReader.readData
 */


ArrayReader.prototype.readData = function (size) {
  this.checkOffset(size);

  if (size === 0) {
    return [];
  }

  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};

module.exports = ArrayReader;

/***/ }),

/***/ "./node_modules/pizzip/js/base64.js":
/*!******************************************!*\
  !*** ./node_modules/pizzip/js/base64.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
 // private property

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; // public method for encoding

exports.encode = function (input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }

  return output;
}; // public method for decoding


exports.decode = function (input) {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    output += String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }

    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }

  return output;
};

/***/ }),

/***/ "./node_modules/pizzip/js/compressedObject.js":
/*!****************************************************!*\
  !*** ./node_modules/pizzip/js/compressedObject.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


function CompressedObject() {
  this.compressedSize = 0;
  this.uncompressedSize = 0;
  this.crc32 = 0;
  this.compressionMethod = null;
  this.compressedContent = null;
}

CompressedObject.prototype = {
  /**
   * Return the decompressed content in an unspecified format.
   * The format will depend on the decompressor.
   * @return {Object} the decompressed content.
   */
  getContent: function getContent() {
    return null; // see implementation
  },

  /**
   * Return the compressed content in an unspecified format.
   * The format will depend on the compressed conten source.
   * @return {Object} the compressed content.
   */
  getCompressedContent: function getCompressedContent() {
    return null; // see implementation
  }
};
module.exports = CompressedObject;

/***/ }),

/***/ "./node_modules/pizzip/js/compressions.js":
/*!************************************************!*\
  !*** ./node_modules/pizzip/js/compressions.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.STORE = {
  magic: "\x00\x00",
  compress: function compress(content) {
    return content; // no compression
  },
  uncompress: function uncompress(content) {
    return content; // no compression
  },
  compressInputType: null,
  uncompressInputType: null
};
exports.DEFLATE = __webpack_require__(/*! ./flate.js */ "./node_modules/pizzip/js/flate.js");

/***/ }),

/***/ "./node_modules/pizzip/js/crc32.js":
/*!*****************************************!*\
  !*** ./node_modules/pizzip/js/crc32.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js"); // prettier-ignore


var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3, 0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7, 0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F, 0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D, 0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433, 0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
/**
 *
 *  Javascript crc32
 *  http://www.webtoolkit.info/
 *
 */

module.exports = function crc32(input, crc) {
  if (typeof input === "undefined" || !input.length) {
    return 0;
  }

  var isArray = utils.getTypeOf(input) !== "string";

  if (typeof crc == "undefined") {
    crc = 0;
  }

  var x = 0;
  var y = 0;
  var b = 0;
  crc ^= -1;

  for (var i = 0, iTop = input.length; i < iTop; i++) {
    b = isArray ? input[i] : input.charCodeAt(i);
    y = (crc ^ b) & 0xff;
    x = table[y];
    crc = crc >>> 8 ^ x;
  }

  return crc ^ -1;
};

/***/ }),

/***/ "./node_modules/pizzip/js/dataReader.js":
/*!**********************************************!*\
  !*** ./node_modules/pizzip/js/dataReader.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

function DataReader() {
  this.data = null; // type : see implementation

  this.length = 0;
  this.index = 0;
  this.zero = 0;
}

DataReader.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function checkOffset(offset) {
    this.checkIndex(this.index + offset);
  },

  /**
   * Check that the specifed index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function checkIndex(newIndex) {
    if (this.length < this.zero + newIndex || newIndex < 0) {
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
    }
  },

  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function setIndex(newIndex) {
    this.checkIndex(newIndex);
    this.index = newIndex;
  },

  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function skip(n) {
    this.setIndex(this.index + n);
  },

  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function byteAt() {// see implementations
  },

  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function readInt(size) {
    var result = 0,
        i;
    this.checkOffset(size);

    for (i = this.index + size - 1; i >= this.index; i--) {
      result = (result << 8) + this.byteAt(i);
    }

    this.index += size;
    return result;
  },

  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function readString(size) {
    return utils.transformTo("string", this.readData(size));
  },

  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function readData() {// see implementations
  },

  /**
   * Find the last occurence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurence, -1 if not found.
   */
  lastIndexOfSignature: function lastIndexOfSignature() {// see implementations
  },

  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function readDate() {
    var dostime = this.readInt(4);
    return new Date((dostime >> 25 & 0x7f) + 1980, // year
    (dostime >> 21 & 0x0f) - 1, // month
    dostime >> 16 & 0x1f, // day
    dostime >> 11 & 0x1f, // hour
    dostime >> 5 & 0x3f, // minute
    (dostime & 0x1f) << 1); // second
  }
};
module.exports = DataReader;

/***/ }),

/***/ "./node_modules/pizzip/js/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/pizzip/js/defaults.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = false;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

/***/ }),

/***/ "./node_modules/pizzip/js/deprecatedPublicUtils.js":
/*!*********************************************************!*\
  !*** ./node_modules/pizzip/js/deprecatedPublicUtils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.string2binary = function (str) {
  return utils.string2binary(str);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.string2Uint8Array = function (str) {
  return utils.transformTo("uint8array", str);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.uint8Array2String = function (array) {
  return utils.transformTo("string", array);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.string2Blob = function (str) {
  var buffer = utils.transformTo("arraybuffer", str);
  return utils.arrayBuffer2Blob(buffer);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.arrayBuffer2Blob = function (buffer) {
  return utils.arrayBuffer2Blob(buffer);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.transformTo = function (outputType, input) {
  return utils.transformTo(outputType, input);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.getTypeOf = function (input) {
  return utils.getTypeOf(input);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.checkSupport = function (type) {
  return utils.checkSupport(type);
};
/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */


exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;
/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */

exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */

exports.pretty = function (str) {
  return utils.pretty(str);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.findCompression = function (compressionMethod) {
  return utils.findCompression(compressionMethod);
};
/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */


exports.isRegExp = function (object) {
  return utils.isRegExp(object);
};

/***/ }),

/***/ "./node_modules/pizzip/js/flate.js":
/*!*****************************************!*\
  !*** ./node_modules/pizzip/js/flate.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";

var pako = __webpack_require__(/*! pako/dist/pako.es5.js */ "./node_modules/pizzip/node_modules/pako/dist/pako.es5.js");

exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
exports.magic = "\x08\x00";

exports.compress = function (input, compressionOptions) {
  return pako.deflateRaw(input, {
    level: compressionOptions.level || -1 // default compression

  });
};

exports.uncompress = function (input) {
  return pako.inflateRaw(input);
};

/***/ }),

/***/ "./node_modules/pizzip/js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/pizzip/js/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var base64 = __webpack_require__(/*! ./base64.js */ "./node_modules/pizzip/js/base64.js");
/**
Usage:
   zip = new PizZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

/**
 * Representation a of zip file in js
 * @constructor
 * @param {String=|ArrayBuffer=|Uint8Array=} data the data to load, if any (optional).
 * @param {Object=} options the options for creating this objects (optional).
 */


function PizZip(data, options) {
  // if this constructor is used without `new`, it adds `new` before itself:
  if (!(this instanceof PizZip)) {
    return new PizZip(data, options);
  } // object containing the files :
  // {
  //   "folder/" : {...},
  //   "folder/data.txt" : {...}
  // }


  this.files = {};
  this.comment = null; // Where we are in the hierarchy

  this.root = "";

  if (data) {
    this.load(data, options);
  }

  this.clone = function () {
    var newObj = new PizZip();

    for (var i in this) {
      if (typeof this[i] !== "function") {
        newObj[i] = this[i];
      }
    }

    return newObj;
  };
}

PizZip.prototype = __webpack_require__(/*! ./object.js */ "./node_modules/pizzip/js/object.js");
PizZip.prototype.load = __webpack_require__(/*! ./load.js */ "./node_modules/pizzip/js/load.js");
PizZip.support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js");
PizZip.defaults = __webpack_require__(/*! ./defaults.js */ "./node_modules/pizzip/js/defaults.js");
/**
 * @deprecated
 * This namespace will be removed in a future version without replacement.
 */

PizZip.utils = __webpack_require__(/*! ./deprecatedPublicUtils.js */ "./node_modules/pizzip/js/deprecatedPublicUtils.js");
PizZip.base64 = {
  /**
   * @deprecated
   * This method will be removed in a future version without replacement.
   */
  encode: function encode(input) {
    return base64.encode(input);
  },

  /**
   * @deprecated
   * This method will be removed in a future version without replacement.
   */
  decode: function decode(input) {
    return base64.decode(input);
  }
};
PizZip.compressions = __webpack_require__(/*! ./compressions.js */ "./node_modules/pizzip/js/compressions.js");
module.exports = PizZip;

/***/ }),

/***/ "./node_modules/pizzip/js/load.js":
/*!****************************************!*\
  !*** ./node_modules/pizzip/js/load.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var base64 = __webpack_require__(/*! ./base64.js */ "./node_modules/pizzip/js/base64.js");

var utf8 = __webpack_require__(/*! ./utf8.js */ "./node_modules/pizzip/js/utf8.js");

var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

var ZipEntries = __webpack_require__(/*! ./zipEntries.js */ "./node_modules/pizzip/js/zipEntries.js");

module.exports = function (data, options) {
  var i, input;
  options = utils.extend(options || {}, {
    base64: false,
    checkCRC32: false,
    optimizedBinaryString: false,
    createFolders: false,
    decodeFileName: utf8.utf8decode
  });

  if (options.base64) {
    data = base64.decode(data);
  }

  var zipEntries = new ZipEntries(data, options);
  var files = zipEntries.files;

  for (i = 0; i < files.length; i++) {
    input = files[i];
    this.file(input.fileNameStr, input.decompressed, {
      binary: true,
      optimizedBinaryString: true,
      date: input.date,
      dir: input.dir,
      comment: input.fileCommentStr.length ? input.fileCommentStr : null,
      unixPermissions: input.unixPermissions,
      dosPermissions: input.dosPermissions,
      createFolders: options.createFolders
    });
  }

  if (zipEntries.zipComment.length) {
    this.comment = zipEntries.zipComment;
  }

  return this;
};

/***/ }),

/***/ "./node_modules/pizzip/js/nodeBuffer.js":
/*!**********************************************!*\
  !*** ./node_modules/pizzip/js/nodeBuffer.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];


module.exports = function (data, encoding) {
  if (typeof data === "number") {
    return Buffer.alloc(data);
  }

  return Buffer.from(data, encoding);
};

module.exports.test = function (b) {
  return Buffer.isBuffer(b);
};

/***/ }),

/***/ "./node_modules/pizzip/js/nodeBufferReader.js":
/*!****************************************************!*\
  !*** ./node_modules/pizzip/js/nodeBufferReader.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Uint8ArrayReader = __webpack_require__(/*! ./uint8ArrayReader.js */ "./node_modules/pizzip/js/uint8ArrayReader.js");

function NodeBufferReader(data) {
  this.data = data;
  this.length = this.data.length;
  this.index = 0;
  this.zero = 0;
}

NodeBufferReader.prototype = new Uint8ArrayReader();
/**
 * @see DataReader.readData
 */

NodeBufferReader.prototype.readData = function (size) {
  this.checkOffset(size);
  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};

module.exports = NodeBufferReader;

/***/ }),

/***/ "./node_modules/pizzip/js/object.js":
/*!******************************************!*\
  !*** ./node_modules/pizzip/js/object.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js");

var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

var _crc = __webpack_require__(/*! ./crc32.js */ "./node_modules/pizzip/js/crc32.js");

var signature = __webpack_require__(/*! ./signature.js */ "./node_modules/pizzip/js/signature.js");

var defaults = __webpack_require__(/*! ./defaults.js */ "./node_modules/pizzip/js/defaults.js");

var base64 = __webpack_require__(/*! ./base64.js */ "./node_modules/pizzip/js/base64.js");

var compressions = __webpack_require__(/*! ./compressions.js */ "./node_modules/pizzip/js/compressions.js");

var CompressedObject = __webpack_require__(/*! ./compressedObject.js */ "./node_modules/pizzip/js/compressedObject.js");

var nodeBuffer = __webpack_require__(/*! ./nodeBuffer.js */ "./node_modules/pizzip/js/nodeBuffer.js");

var utf8 = __webpack_require__(/*! ./utf8.js */ "./node_modules/pizzip/js/utf8.js");

var StringWriter = __webpack_require__(/*! ./stringWriter.js */ "./node_modules/pizzip/js/stringWriter.js");

var Uint8ArrayWriter = __webpack_require__(/*! ./uint8ArrayWriter.js */ "./node_modules/pizzip/js/uint8ArrayWriter.js");
/**
 * Returns the raw data of a ZipObject, decompress the content if necessary.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */


function getRawData(file) {
  if (file._data instanceof CompressedObject) {
    file._data = file._data.getContent();
    file.options.binary = true;
    file.options.base64 = false;

    if (utils.getTypeOf(file._data) === "uint8array") {
      var copy = file._data; // when reading an arraybuffer, the CompressedObject mechanism will keep it and subarray() a Uint8Array.
      // if we request a file in the same format, we might get the same Uint8Array or its ArrayBuffer (the original zip file).

      file._data = new Uint8Array(copy.length); // with an empty Uint8Array, Opera fails with a "Offset larger than array size"

      if (copy.length !== 0) {
        file._data.set(copy, 0);
      }
    }
  }

  return file._data;
}
/**
 * Returns the data of a ZipObject in a binary form. If the content is an unicode string, encode it.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */


function getBinaryData(file) {
  var result = getRawData(file),
      type = utils.getTypeOf(result);

  if (type === "string") {
    if (!file.options.binary) {
      // unicode text !
      // unicode string => binary string is a painful process, check if we can avoid it.
      if (support.nodebuffer) {
        return nodeBuffer(result, "utf-8");
      }
    }

    return file.asBinary();
  }

  return result;
} // return the actual prototype of PizZip


var out = {
  /**
   * Read an existing zip and merge the data in the current PizZip object.
   * The implementation is in pizzip-load.js, don't forget to include it.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} stream  The stream to load
   * @param {Object} options Options for loading the stream.
   *  options.base64 : is the stream in base64 ? default : false
   * @return {PizZip} the current PizZip object
   */
  load: function load() {
    throw new Error("Load method is not defined. Is the file pizzip-load.js included ?");
  },

  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function filter(search) {
    var result = [];
    var filename, relativePath, file, fileClone;

    for (filename in this.files) {
      if (!this.files.hasOwnProperty(filename)) {
        continue;
      }

      file = this.files[filename]; // return a new object, don't let the user mess with our internal objects :)

      fileClone = new ZipObject(file.name, file._data, utils.extend(file.options));
      relativePath = filename.slice(this.root.length, filename.length);

      if (filename.slice(0, this.root.length) === this.root && // the file is in the current root
      search(relativePath, fileClone)) {
        // and the file matches the function
        result.push(fileClone);
      }
    }

    return result;
  },

  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {PizZip|Object|Array} this PizZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function file(name, data, o) {
    if (arguments.length === 1) {
      if (utils.isRegExp(name)) {
        var regexp = name;
        return this.filter(function (relativePath, file) {
          return !file.dir && regexp.test(relativePath);
        });
      } // text


      return this.filter(function (relativePath, file) {
        return !file.dir && relativePath === name;
      })[0] || null;
    } // more than one argument : we have data !


    name = this.root + name;
    fileAdd.call(this, name, data, o);
    return this;
  },

  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {PizZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function folder(arg) {
    if (!arg) {
      return this;
    }

    if (utils.isRegExp(arg)) {
      return this.filter(function (relativePath, file) {
        return file.dir && arg.test(relativePath);
      });
    } // else, name is a new folder


    var name = this.root + arg;
    var newFolder = folderAdd.call(this, name); // Allow chaining by returning a new object with this folder as the root

    var ret = this.clone();
    ret.root = newFolder.name;
    return ret;
  },

  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {PizZip} this PizZip object
   */
  remove: function remove(name) {
    name = this.root + name;
    var file = this.files[name];

    if (!file) {
      // Look for any folders
      if (name.slice(-1) !== "/") {
        name += "/";
      }

      file = this.files[name];
    }

    if (file && !file.dir) {
      // file
      delete this.files[name];
    } else {
      // maybe a folder, delete recursively
      var kids = this.filter(function (relativePath, file) {
        return file.name.slice(0, name.length) === name;
      });

      for (var i = 0; i < kids.length; i++) {
        delete this.files[kids[i].name];
      }
    }

    return this;
  },

  /**
   * Generate the complete zip file
   * @param {Object} options the options to generate the zip file :
   * - base64, (deprecated, use type instead) true to generate base64.
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
   */
  generate: function generate(options) {
    options = utils.extend(options || {}, {
      base64: true,
      compression: "STORE",
      compressionOptions: null,
      type: "base64",
      platform: "DOS",
      comment: null,
      mimeType: "application/zip",
      encodeFileName: utf8.utf8encode
    });
    utils.checkSupport(options.type); // accept nodejs `process.platform`

    if (options.platform === "darwin" || options.platform === "freebsd" || options.platform === "linux" || options.platform === "sunos") {
      options.platform = "UNIX";
    }

    if (options.platform === "win32") {
      options.platform = "DOS";
    }

    var zipData = [],
        encodedComment = utils.transformTo("string", options.encodeFileName(options.comment || this.comment || ""));
    var localDirLength = 0,
        centralDirLength = 0,
        writer,
        i; // first, generate all the zip parts.

    for (var name in this.files) {
      if (!this.files.hasOwnProperty(name)) {
        continue;
      }

      var file = this.files[name];
      var compressionName = file.options.compression || options.compression.toUpperCase();
      var compression = compressions[compressionName];

      if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
      }

      var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
      var compressedObject = generateCompressedObjectFrom.call(this, file, compression, compressionOptions);
      var zipPart = generateZipParts.call(this, name, file, compressedObject, localDirLength, options.platform, options.encodeFileName);
      localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize;
      centralDirLength += zipPart.dirRecord.length;
      zipData.push(zipPart);
    }

    var dirEnd = ""; // end of central dir signature

    dirEnd = signature.CENTRAL_DIRECTORY_END + // number of this disk
    "\x00\x00" + // number of the disk with the start of the central directory
    "\x00\x00" + // total number of entries in the central directory on this disk
    decToHex(zipData.length, 2) + // total number of entries in the central directory
    decToHex(zipData.length, 2) + // size of the central directory   4 bytes
    decToHex(centralDirLength, 4) + // offset of start of central directory with respect to the starting disk number
    decToHex(localDirLength, 4) + // .ZIP file comment length
    decToHex(encodedComment.length, 2) + // .ZIP file comment
    encodedComment; // we have all the parts (and the total length)
    // time to create a writer !

    var typeName = options.type.toLowerCase();

    if (typeName === "uint8array" || typeName === "arraybuffer" || typeName === "blob" || typeName === "nodebuffer") {
      writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length);
    } else {
      writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length);
    }

    for (i = 0; i < zipData.length; i++) {
      writer.append(zipData[i].fileRecord);
      writer.append(zipData[i].compressedObject.compressedContent);
    }

    for (i = 0; i < zipData.length; i++) {
      writer.append(zipData[i].dirRecord);
    }

    writer.append(dirEnd);
    var zip = writer.finalize();

    switch (options.type.toLowerCase()) {
      // case "zip is an Uint8Array"
      case "uint8array":
      case "arraybuffer":
      case "nodebuffer":
        return utils.transformTo(options.type.toLowerCase(), zip);

      case "blob":
        return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip), options.mimeType);
      // case "zip is a string"

      case "base64":
        return options.base64 ? base64.encode(zip) : zip;

      default:
        // case "string" :
        return zip;
    }
  },

  /**
   * @deprecated
   * This method will be removed in a future version without replacement.
   */
  crc32: function crc32(input, crc) {
    return _crc(input, crc);
  },

  /**
   * @deprecated
   * This method will be removed in a future version without replacement.
   */
  utf8encode: function utf8encode(string) {
    return utils.transformTo("string", utf8.utf8encode(string));
  },

  /**
   * @deprecated
   * This method will be removed in a future version without replacement.
   */
  utf8decode: function utf8decode(input) {
    return utf8.utf8decode(input);
  }
};
/**
 * Transform this._data into a string.
 * @param {function} filter a function String -> String, applied if not null on the result.
 * @return {String} the string representing this._data.
 */

function dataToString(asUTF8) {
  var result = getRawData(this);

  if (result === null || typeof result === "undefined") {
    return "";
  } // if the data is a base64 string, we decode it before checking the encoding !


  if (this.options.base64) {
    result = base64.decode(result);
  }

  if (asUTF8 && this.options.binary) {
    // PizZip.prototype.utf8decode supports arrays as input
    // skip to array => string step, utf8decode will do it.
    result = out.utf8decode(result);
  } else {
    // no utf8 transformation, do the array => string step.
    result = utils.transformTo("string", result);
  }

  if (!asUTF8 && !this.options.binary) {
    result = utils.transformTo("string", out.utf8encode(result));
  }

  return result;
}
/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */


function ZipObject(name, data, options) {
  this.name = name;
  this.dir = options.dir;
  this.date = options.date;
  this.comment = options.comment;
  this.unixPermissions = options.unixPermissions;
  this.dosPermissions = options.dosPermissions;
  this._data = data;
  this.options = options;
  /*
   * This object contains initial values for dir and date.
   * With them, we can check if the user changed the deprecated metadata in
   * `ZipObject#options` or not.
   */

  this._initialMetadata = {
    dir: options.dir,
    date: options.date
  };
}

ZipObject.prototype = {
  /**
   * Return the content as UTF8 string.
   * @return {string} the UTF8 string.
   */
  asText: function asText() {
    return dataToString.call(this, true);
  },

  /**
   * Returns the binary content.
   * @return {string} the content as binary.
   */
  asBinary: function asBinary() {
    return dataToString.call(this, false);
  },

  /**
   * Returns the content as a nodejs Buffer.
   * @return {Buffer} the content as a Buffer.
   */
  asNodeBuffer: function asNodeBuffer() {
    var result = getBinaryData(this);
    return utils.transformTo("nodebuffer", result);
  },

  /**
   * Returns the content as an Uint8Array.
   * @return {Uint8Array} the content as an Uint8Array.
   */
  asUint8Array: function asUint8Array() {
    var result = getBinaryData(this);
    return utils.transformTo("uint8array", result);
  },

  /**
   * Returns the content as an ArrayBuffer.
   * @return {ArrayBuffer} the content as an ArrayBufer.
   */
  asArrayBuffer: function asArrayBuffer() {
    return this.asUint8Array().buffer;
  }
};
/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */

function decToHex(dec, bytes) {
  var hex = "",
      i;

  for (i = 0; i < bytes; i++) {
    hex += String.fromCharCode(dec & 0xff);
    dec >>>= 8;
  }

  return hex;
}
/**
 * Transforms the (incomplete) options from the user into the complete
 * set of options to create a file.
 * @private
 * @param {Object} o the options from the user.
 * @return {Object} the complete set of options.
 */


function prepareFileAttrs(o) {
  o = o || {};

  if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
    o.binary = true;
  }

  o = utils.extend(o, defaults);
  o.date = o.date || new Date();

  if (o.compression !== null) {
    o.compression = o.compression.toUpperCase();
  }

  return o;
}
/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} o the options of the file
 * @return {Object} the new file.
 */


function fileAdd(name, data, o) {
  // be sure sub folders exist
  var dataType = utils.getTypeOf(data),
      parent;
  o = prepareFileAttrs(o);

  if (typeof o.unixPermissions === "string") {
    o.unixPermissions = parseInt(o.unixPermissions, 8);
  } // UNX_IFDIR  0040000 see zipinfo.c


  if (o.unixPermissions && o.unixPermissions & 0x4000) {
    o.dir = true;
  } // Bit 4    Directory


  if (o.dosPermissions && o.dosPermissions & 0x0010) {
    o.dir = true;
  }

  if (o.dir) {
    name = forceTrailingSlash(name);
  }

  if (o.createFolders && (parent = parentFolder(name))) {
    folderAdd.call(this, parent, true);
  }

  if (o.dir || data === null || typeof data === "undefined") {
    o.base64 = false;
    o.binary = false;
    data = null;
    dataType = null;
  } else if (dataType === "string") {
    if (o.binary && !o.base64) {
      // optimizedBinaryString == true means that the file has already been filtered with a 0xFF mask
      if (o.optimizedBinaryString !== true) {
        // this is a string, not in a base64 format.
        // Be sure that this is a correct "binary string"
        data = utils.string2binary(data);
      }
    }
  } else {
    // arraybuffer, uint8array, ...
    o.base64 = false;
    o.binary = true;

    if (!dataType && !(data instanceof CompressedObject)) {
      throw new Error("The data of '" + name + "' is in an unsupported format !");
    } // special case : it's way easier to work with Uint8Array than with ArrayBuffer


    if (dataType === "arraybuffer") {
      data = utils.transformTo("uint8array", data);
    }
  }

  var object = new ZipObject(name, data, o);
  this.files[name] = object;
  return object;
}
/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */


function parentFolder(path) {
  if (path.slice(-1) === "/") {
    path = path.substring(0, path.length - 1);
  }

  var lastSlash = path.lastIndexOf("/");
  return lastSlash > 0 ? path.substring(0, lastSlash) : "";
}
/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */


function forceTrailingSlash(path) {
  // Check the name ends with a /
  if (path.slice(-1) !== "/") {
    path += "/"; // IE doesn't like substr(-1)
  }

  return path;
}
/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */


function folderAdd(name, createFolders) {
  createFolders = typeof createFolders !== "undefined" ? createFolders : false;
  name = forceTrailingSlash(name); // Does this folder already exist?

  if (!this.files[name]) {
    fileAdd.call(this, name, null, {
      dir: true,
      createFolders: createFolders
    });
  }

  return this.files[name];
}
/**
 * Generate a PizZip.CompressedObject for a given zipOject.
 * @param {ZipObject} file the object to read.
 * @param {PizZip.compression} compression the compression to use.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {PizZip.CompressedObject} the compressed result.
 */


function generateCompressedObjectFrom(file, compression, compressionOptions) {
  var result = new CompressedObject();
  var content; // the data has not been decompressed, we might reuse things !

  if (file._data instanceof CompressedObject) {
    result.uncompressedSize = file._data.uncompressedSize;
    result.crc32 = file._data.crc32;

    if (result.uncompressedSize === 0 || file.dir) {
      compression = compressions.STORE;
      result.compressedContent = "";
      result.crc32 = 0;
    } else if (file._data.compressionMethod === compression.magic) {
      result.compressedContent = file._data.getCompressedContent();
    } else {
      content = file._data.getContent(); // need to decompress / recompress

      result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
    }
  } else {
    // have uncompressed data
    content = getBinaryData(file);

    if (!content || content.length === 0 || file.dir) {
      compression = compressions.STORE;
      content = "";
    }

    result.uncompressedSize = content.length;
    result.crc32 = _crc(content);
    result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
  }

  result.compressedSize = result.compressedContent.length;
  result.compressionMethod = compression.magic;
  return result;
}
/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */


function generateUnixExternalFileAttr(unixPermissions, isDir) {
  var result = unixPermissions;

  if (!unixPermissions) {
    // I can't use octal values in strict mode, hence the hexa.
    //  040775 => 0x41fd
    // 0100664 => 0x81b4
    result = isDir ? 0x41fd : 0x81b4;
  }

  return (result & 0xffff) << 16;
}
/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */


function generateDosExternalFileAttr(dosPermissions) {
  // the dir flag is already set for compatibility
  return (dosPermissions || 0) & 0x3f;
}
/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {string} name the file name.
 * @param {ZipObject} file the file content.
 * @param {PizZip.CompressedObject} compressedObject the compressed object.
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {object} the zip parts.
 */


function generateZipParts(name, file, compressedObject, offset, platform, encodeFileName) {
  var useCustomEncoding = encodeFileName !== utf8.utf8encode,
      encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
      utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
      comment = file.comment || "",
      encodedComment = utils.transformTo("string", encodeFileName(comment)),
      utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
      useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
      useUTF8ForComment = utfEncodedComment.length !== comment.length,
      o = file.options;
  var dosTime,
      dosDate,
      extraFields = "",
      unicodePathExtraField = "",
      unicodeCommentExtraField = "",
      dir,
      date; // handle the deprecated options.dir

  if (file._initialMetadata.dir !== file.dir) {
    dir = file.dir;
  } else {
    dir = o.dir;
  } // handle the deprecated options.date


  if (file._initialMetadata.date !== file.date) {
    date = file.date;
  } else {
    date = o.date;
  }

  var extFileAttr = 0;
  var versionMadeBy = 0;

  if (dir) {
    // dos or unix, we set the dos dir flag
    extFileAttr |= 0x00010;
  }

  if (platform === "UNIX") {
    versionMadeBy = 0x031e; // UNIX, version 3.0

    extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
  } else {
    // DOS or other, fallback to DOS
    versionMadeBy = 0x0014; // DOS, version 2.0

    extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
  } // date
  // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
  // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
  // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html


  dosTime = date.getHours();
  dosTime <<= 6;
  dosTime |= date.getMinutes();
  dosTime <<= 5;
  dosTime |= date.getSeconds() / 2;
  dosDate = date.getFullYear() - 1980;
  dosDate <<= 4;
  dosDate |= date.getMonth() + 1;
  dosDate <<= 5;
  dosDate |= date.getDate();

  if (useUTF8ForFileName) {
    // set the unicode path extra field. unzip needs at least one extra
    // field to correctly handle unicode path, so using the path is as good
    // as any other information. This could improve the situation with
    // other archive managers too.
    // This field is usually used without the utf8 flag, with a non
    // unicode path in the header (winrar, winzip). This helps (a bit)
    // with the messy Windows' default compressed folders feature but
    // breaks on p7zip which doesn't seek the unicode path extra field.
    // So for now, UTF-8 everywhere !
    unicodePathExtraField = // Version
    decToHex(1, 1) + // NameCRC32
    decToHex(_crc(encodedFileName), 4) + // UnicodeName
    utfEncodedFileName;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "\x75\x70" + // size
    decToHex(unicodePathExtraField.length, 2) + // content
    unicodePathExtraField;
  }

  if (useUTF8ForComment) {
    unicodeCommentExtraField = // Version
    decToHex(1, 1) + // CommentCRC32
    decToHex(this.crc32(encodedComment), 4) + // UnicodeName
    utfEncodedComment;
    extraFields += // Info-ZIP Unicode Path Extra Field
    "\x75\x63" + // size
    decToHex(unicodeCommentExtraField.length, 2) + // content
    unicodeCommentExtraField;
  }

  var header = ""; // version needed to extract

  header += "\x0A\x00"; // general purpose bit flag
  // set bit 11 if utf8

  header += !useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment) ? "\x00\x08" : "\x00\x00"; // compression method

  header += compressedObject.compressionMethod; // last mod file time

  header += decToHex(dosTime, 2); // last mod file date

  header += decToHex(dosDate, 2); // crc-32

  header += decToHex(compressedObject.crc32, 4); // compressed size

  header += decToHex(compressedObject.compressedSize, 4); // uncompressed size

  header += decToHex(compressedObject.uncompressedSize, 4); // file name length

  header += decToHex(encodedFileName.length, 2); // extra field length

  header += decToHex(extraFields.length, 2);
  var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
  var dirRecord = signature.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  decToHex(versionMadeBy, 2) + // file header (common to file and central directory)
  header + // file comment length
  decToHex(encodedComment.length, 2) + // disk number start
  "\x00\x00" + // internal file attributes
  "\x00\x00" + // external file attributes
  decToHex(extFileAttr, 4) + // relative offset of local header
  decToHex(offset, 4) + // file name
  encodedFileName + // extra field
  extraFields + // file comment
  encodedComment;
  return {
    fileRecord: fileRecord,
    dirRecord: dirRecord,
    compressedObject: compressedObject
  };
}

module.exports = out;

/***/ }),

/***/ "./node_modules/pizzip/js/signature.js":
/*!*********************************************!*\
  !*** ./node_modules/pizzip/js/signature.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

/***/ }),

/***/ "./node_modules/pizzip/js/stringReader.js":
/*!************************************************!*\
  !*** ./node_modules/pizzip/js/stringReader.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var DataReader = __webpack_require__(/*! ./dataReader.js */ "./node_modules/pizzip/js/dataReader.js");

var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

function StringReader(data, optimizedBinaryString) {
  this.data = data;

  if (!optimizedBinaryString) {
    this.data = utils.string2binary(this.data);
  }

  this.length = this.data.length;
  this.index = 0;
  this.zero = 0;
}

StringReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */

StringReader.prototype.byteAt = function (i) {
  return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */


StringReader.prototype.lastIndexOfSignature = function (sig) {
  return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readData
 */


StringReader.prototype.readData = function (size) {
  this.checkOffset(size); // this will work because the constructor applied the "& 0xff" mask.

  var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};

module.exports = StringReader;

/***/ }),

/***/ "./node_modules/pizzip/js/stringWriter.js":
/*!************************************************!*\
  !*** ./node_modules/pizzip/js/stringWriter.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");
/**
 * An object to write any content to a string.
 * @constructor
 */


function StringWriter() {
  this.data = [];
}

StringWriter.prototype = {
  /**
   * Append any content to the current string.
   * @param {Object} input the content to add.
   */
  append: function append(input) {
    input = utils.transformTo("string", input);
    this.data.push(input);
  },

  /**
   * Finalize the construction an return the result.
   * @return {string} the generated string.
   */
  finalize: function finalize() {
    return this.data.join("");
  }
};
module.exports = StringWriter;

/***/ }),

/***/ "./node_modules/pizzip/js/support.js":
/*!*******************************************!*\
  !*** ./node_modules/pizzip/js/support.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];


exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined"; // contains true if PizZip can read/generate nodejs Buffer, false otherwise.
// Browserify will provide a Buffer implementation for browsers, which is
// an augmented Uint8Array (i.e., can be used as either Buffer or U8).

exports.nodebuffer = typeof Buffer !== "undefined"; // contains true if PizZip can read/generate Uint8Array, false otherwise.

exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
  exports.blob = false;
} else {
  var buffer = new ArrayBuffer(0);

  try {
    exports.blob = new Blob([buffer], {
      type: "application/zip"
    }).size === 0;
  } catch (e) {
    try {
      var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      var builder = new Builder();
      builder.append(buffer);
      exports.blob = builder.getBlob("application/zip").size === 0;
    } catch (e) {
      exports.blob = false;
    }
  }
}

/***/ }),

/***/ "./node_modules/pizzip/js/uint8ArrayReader.js":
/*!****************************************************!*\
  !*** ./node_modules/pizzip/js/uint8ArrayReader.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ArrayReader = __webpack_require__(/*! ./arrayReader.js */ "./node_modules/pizzip/js/arrayReader.js");

function Uint8ArrayReader(data) {
  if (data) {
    this.data = data;
    this.length = this.data.length;
    this.index = 0;
    this.zero = 0;
  }
}

Uint8ArrayReader.prototype = new ArrayReader();
/**
 * @see DataReader.readData
 */

Uint8ArrayReader.prototype.readData = function (size) {
  this.checkOffset(size);

  if (size === 0) {
    // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
    return new Uint8Array(0);
  }

  var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
  this.index += size;
  return result;
};

module.exports = Uint8ArrayReader;

/***/ }),

/***/ "./node_modules/pizzip/js/uint8ArrayWriter.js":
/*!****************************************************!*\
  !*** ./node_modules/pizzip/js/uint8ArrayWriter.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");
/**
 * An object to write any content to an Uint8Array.
 * @constructor
 * @param {number} length The length of the array.
 */


function Uint8ArrayWriter(length) {
  this.data = new Uint8Array(length);
  this.index = 0;
}

Uint8ArrayWriter.prototype = {
  /**
   * Append any content to the current array.
   * @param {Object} input the content to add.
   */
  append: function append(input) {
    if (input.length !== 0) {
      // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
      input = utils.transformTo("uint8array", input);
      this.data.set(input, this.index);
      this.index += input.length;
    }
  },

  /**
   * Finalize the construction an return the result.
   * @return {Uint8Array} the generated array.
   */
  finalize: function finalize() {
    return this.data;
  }
};
module.exports = Uint8ArrayWriter;

/***/ }),

/***/ "./node_modules/pizzip/js/utf8.js":
/*!****************************************!*\
  !*** ./node_modules/pizzip/js/utf8.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

var support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js");

var nodeBuffer = __webpack_require__(/*! ./nodeBuffer.js */ "./node_modules/pizzip/js/nodeBuffer.js");
/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */
// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff


var _utf8len = new Array(256);

for (var i = 0; i < 256; i++) {
  _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
}

_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
// convert string to array (typed, when possible)

function string2buf(str) {
  var buf,
      c,
      c2,
      mPos,
      i,
      bufLen = 0;
  var strLen = str.length; // count binary size

  for (mPos = 0; mPos < strLen; mPos++) {
    c = str.charCodeAt(mPos);

    if ((c & 0xfc00) === 0xd800 && mPos + 1 < strLen) {
      c2 = str.charCodeAt(mPos + 1);

      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        mPos++;
      }
    }

    bufLen += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  } // allocate buffer


  if (support.uint8array) {
    buf = new Uint8Array(bufLen);
  } else {
    buf = new Array(bufLen);
  } // convert


  for (i = 0, mPos = 0; i < bufLen; mPos++) {
    c = str.charCodeAt(mPos);

    if ((c & 0xfc00) === 0xd800 && mPos + 1 < strLen) {
      c2 = str.charCodeAt(mPos + 1);

      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
        mPos++;
      }
    }

    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xc0 | c >>> 6;
      buf[i++] = 0x80 | c & 0x3f;
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xe0 | c >>> 12;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | c >>> 18;
      buf[i++] = 0x80 | c >>> 12 & 0x3f;
      buf[i++] = 0x80 | c >>> 6 & 0x3f;
      buf[i++] = 0x80 | c & 0x3f;
    }
  }

  return buf;
} // Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);


function utf8border(buf, max) {
  var pos;
  max = max || buf.length;

  if (max > buf.length) {
    max = buf.length;
  } // go back from last position, until start of sequence found


  pos = max - 1;

  while (pos >= 0 && (buf[pos] & 0xc0) === 0x80) {
    pos--;
  } // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.


  if (pos < 0) {
    return max;
  } // If we came to start of buffer - that means vuffer is too small,
  // return max too.


  if (pos === 0) {
    return max;
  }

  return pos + _utf8len[buf[pos]] > max ? pos : max;
} // convert array to string


function buf2string(buf) {
  var i, out, c, cLen;
  var len = buf.length; // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.

  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++]; // quick process ascii

    if (c < 0x80) {
      utf16buf[out++] = c;
      continue;
    }

    cLen = _utf8len[c]; // skip 5 & 6 byte codes

    if (cLen > 4) {
      utf16buf[out++] = 0xfffd;
      i += cLen - 1;
      continue;
    } // apply mask on first byte


    c &= cLen === 2 ? 0x1f : cLen === 3 ? 0x0f : 0x07; // join the rest

    while (cLen > 1 && i < len) {
      c = c << 6 | buf[i++] & 0x3f;
      cLen--;
    } // terminated by end of string?


    if (cLen > 1) {
      utf16buf[out++] = 0xfffd;
      continue;
    }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | c >> 10 & 0x3ff;
      utf16buf[out++] = 0xdc00 | c & 0x3ff;
    }
  } // shrinkBuf(utf16buf, out)


  if (utf16buf.length !== out) {
    if (utf16buf.subarray) {
      utf16buf = utf16buf.subarray(0, out);
    } else {
      utf16buf.length = out;
    }
  } // return String.fromCharCode.apply(null, utf16buf);


  return utils.applyFromCharCode(utf16buf);
} // That's all for the pako functions.

/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */


exports.utf8encode = function utf8encode(str) {
  if (support.nodebuffer) {
    return nodeBuffer(str, "utf-8");
  }

  return string2buf(str);
};
/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */


exports.utf8decode = function utf8decode(buf) {
  if (support.nodebuffer) {
    return utils.transformTo("nodebuffer", buf).toString("utf-8");
  }

  buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf); // return buf2string(buf);
  // Chrome prefers to work with "small" chunks of data
  // for the method buf2string.
  // Firefox and Chrome has their own shortcut, IE doesn't seem to really care.

  var result = [],
      len = buf.length,
      chunk = 65536;
  var k = 0;

  while (k < len) {
    var nextBoundary = utf8border(buf, Math.min(k + chunk, len));

    if (support.uint8array) {
      result.push(buf2string(buf.subarray(k, nextBoundary)));
    } else {
      result.push(buf2string(buf.slice(k, nextBoundary)));
    }

    k = nextBoundary;
  }

  return result.join("");
};

/***/ }),

/***/ "./node_modules/pizzip/js/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/pizzip/js/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js");

var compressions = __webpack_require__(/*! ./compressions.js */ "./node_modules/pizzip/js/compressions.js");

var nodeBuffer = __webpack_require__(/*! ./nodeBuffer.js */ "./node_modules/pizzip/js/nodeBuffer.js");
/**
 * Convert a string to a "binary string" : a string containing only char codes between 0 and 255.
 * @param {string} str the string to transform.
 * @return {String} the binary string.
 */


exports.string2binary = function (str) {
  var result = "";

  for (var i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) & 0xff);
  }

  return result;
};

exports.arrayBuffer2Blob = function (buffer, mimeType) {
  exports.checkSupport("blob");
  mimeType = mimeType || "application/zip";

  try {
    // Blob constructor
    return new Blob([buffer], {
      type: mimeType
    });
  } catch (e) {
    try {
      // deprecated, browser only, old way
      var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
      var builder = new Builder();
      builder.append(buffer);
      return builder.getBlob(mimeType);
    } catch (e) {
      // well, fuck ?!
      throw new Error("Bug : can't construct the Blob.");
    }
  }
};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */


function identity(input) {
  return input;
}
/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */


function stringToArrayLike(str, array) {
  for (var i = 0; i < str.length; ++i) {
    array[i] = str.charCodeAt(i) & 0xff;
  }

  return array;
}
/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */


function arrayLikeToString(array) {
  // Performances notes :
  // --------------------
  // String.fromCharCode.apply(null, array) is the fastest, see
  // see http://jsperf.com/converting-a-uint8array-to-a-string/2
  // but the stack is limited (and we can get huge arrays !).
  //
  // result += String.fromCharCode(array[i]); generate too many strings !
  //
  // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
  var chunk = 65536;
  var result = [],
      len = array.length,
      type = exports.getTypeOf(array);
  var k = 0,
      canUseApply = true;

  try {
    switch (type) {
      case "uint8array":
        String.fromCharCode.apply(null, new Uint8Array(0));
        break;

      case "nodebuffer":
        String.fromCharCode.apply(null, nodeBuffer(0));
        break;
    }
  } catch (e) {
    canUseApply = false;
  } // no apply : slow and painful algorithm
  // default browser on android 4.*


  if (!canUseApply) {
    var resultStr = "";

    for (var i = 0; i < array.length; i++) {
      resultStr += String.fromCharCode(array[i]);
    }

    return resultStr;
  }

  while (k < len && chunk > 1) {
    try {
      if (type === "array" || type === "nodebuffer") {
        result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
      } else {
        result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
      }

      k += chunk;
    } catch (e) {
      chunk = Math.floor(chunk / 2);
    }
  }

  return result.join("");
}

exports.applyFromCharCode = arrayLikeToString;
/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */

function arrayLikeToArrayLike(arrayFrom, arrayTo) {
  for (var i = 0; i < arrayFrom.length; i++) {
    arrayTo[i] = arrayFrom[i];
  }

  return arrayTo;
} // a matrix containing functions to transform everything into everything.


var transform = {}; // string to ?

transform.string = {
  string: identity,
  array: function array(input) {
    return stringToArrayLike(input, new Array(input.length));
  },
  arraybuffer: function arraybuffer(input) {
    return transform.string.uint8array(input).buffer;
  },
  uint8array: function uint8array(input) {
    return stringToArrayLike(input, new Uint8Array(input.length));
  },
  nodebuffer: function nodebuffer(input) {
    return stringToArrayLike(input, nodeBuffer(input.length));
  }
}; // array to ?

transform.array = {
  string: arrayLikeToString,
  array: identity,
  arraybuffer: function arraybuffer(input) {
    return new Uint8Array(input).buffer;
  },
  uint8array: function uint8array(input) {
    return new Uint8Array(input);
  },
  nodebuffer: function nodebuffer(input) {
    return nodeBuffer(input);
  }
}; // arraybuffer to ?

transform.arraybuffer = {
  string: function string(input) {
    return arrayLikeToString(new Uint8Array(input));
  },
  array: function array(input) {
    return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
  },
  arraybuffer: identity,
  uint8array: function uint8array(input) {
    return new Uint8Array(input);
  },
  nodebuffer: function nodebuffer(input) {
    return nodeBuffer(new Uint8Array(input));
  }
}; // uint8array to ?

transform.uint8array = {
  string: arrayLikeToString,
  array: function array(input) {
    return arrayLikeToArrayLike(input, new Array(input.length));
  },
  arraybuffer: function arraybuffer(input) {
    return input.buffer;
  },
  uint8array: identity,
  nodebuffer: function nodebuffer(input) {
    return nodeBuffer(input);
  }
}; // nodebuffer to ?

transform.nodebuffer = {
  string: arrayLikeToString,
  array: function array(input) {
    return arrayLikeToArrayLike(input, new Array(input.length));
  },
  arraybuffer: function arraybuffer(input) {
    return transform.nodebuffer.uint8array(input).buffer;
  },
  uint8array: function uint8array(input) {
    return arrayLikeToArrayLike(input, new Uint8Array(input.length));
  },
  nodebuffer: identity
};
/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */

exports.transformTo = function (outputType, input) {
  if (!input) {
    // undefined, null, etc
    // an empty string won't harm.
    input = "";
  }

  if (!outputType) {
    return input;
  }

  exports.checkSupport(outputType);
  var inputType = exports.getTypeOf(input);
  var result = transform[inputType][outputType](input);
  return result;
};
/**
 * Return the type of the input.
 * The type will be in a format valid for PizZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */


exports.getTypeOf = function (input) {
  if (input == null) {
    return;
  }

  if (typeof input === "string") {
    return "string";
  }

  if (Object.prototype.toString.call(input) === "[object Array]") {
    return "array";
  }

  if (support.nodebuffer && nodeBuffer.test(input)) {
    return "nodebuffer";
  }

  if (support.uint8array && input instanceof Uint8Array) {
    return "uint8array";
  }

  if (support.arraybuffer && input instanceof ArrayBuffer) {
    return "arraybuffer";
  }

  if (input instanceof Promise) {
    throw new Error("Cannot read data from a promise, you probably are running new PizZip(data) with a promise");
  }

  if (input instanceof Date) {
    throw new Error("Cannot read data from a Date, you probably are running new PizZip(data) with a date");
  }

  if (_typeof(input) === "object" && input.crc32 == null) {
    throw new Error("Unsupported data given to new PizZip(data) (object given)");
  }
};
/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */


exports.checkSupport = function (type) {
  var supported = support[type.toLowerCase()];

  if (!supported) {
    throw new Error(type + " is not supported by this browser");
  }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */

exports.pretty = function (str) {
  var res = "",
      code,
      i;

  for (i = 0; i < (str || "").length; i++) {
    code = str.charCodeAt(i);
    res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
  }

  return res;
};
/**
 * Find a compression registered in PizZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the PizZip compression object, null if none found.
 */


exports.findCompression = function (compressionMethod) {
  for (var method in compressions) {
    if (!compressions.hasOwnProperty(method)) {
      continue;
    }

    if (compressions[method].magic === compressionMethod) {
      return compressions[method];
    }
  }

  return null;
};
/**
 * Cross-window, cross-Node-context regular expression detection
 * @param  {Object}  object Anything
 * @return {Boolean}        true if the object is a regular expression,
 * false otherwise
 */


exports.isRegExp = function (object) {
  return Object.prototype.toString.call(object) === "[object RegExp]";
};
/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */


exports.extend = function () {
  var result = {};
  var i, attr;

  for (i = 0; i < arguments.length; i++) {
    // arguments is not enumerable in some browsers
    for (attr in arguments[i]) {
      if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
        result[attr] = arguments[i][attr];
      }
    }
  }

  return result;
};

/***/ }),

/***/ "./node_modules/pizzip/js/zipEntries.js":
/*!**********************************************!*\
  !*** ./node_modules/pizzip/js/zipEntries.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var StringReader = __webpack_require__(/*! ./stringReader.js */ "./node_modules/pizzip/js/stringReader.js");

var NodeBufferReader = __webpack_require__(/*! ./nodeBufferReader.js */ "./node_modules/pizzip/js/nodeBufferReader.js");

var Uint8ArrayReader = __webpack_require__(/*! ./uint8ArrayReader.js */ "./node_modules/pizzip/js/uint8ArrayReader.js");

var ArrayReader = __webpack_require__(/*! ./arrayReader.js */ "./node_modules/pizzip/js/arrayReader.js");

var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

var sig = __webpack_require__(/*! ./signature.js */ "./node_modules/pizzip/js/signature.js");

var ZipEntry = __webpack_require__(/*! ./zipEntry.js */ "./node_modules/pizzip/js/zipEntry.js");

var support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js"); //  class ZipEntries {{{

/**
 * All the entries in the zip file.
 * @constructor
 * @param {String|ArrayBuffer|Uint8Array} data the binary stream to load.
 * @param {Object} loadOptions Options for loading the stream.
 */


function ZipEntries(data, loadOptions) {
  this.files = [];
  this.loadOptions = loadOptions;

  if (data) {
    this.load(data);
  }
}

ZipEntries.prototype = {
  /**
   * Check that the reader is on the speficied signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function checkSignature(expectedSignature) {
    var signature = this.reader.readString(4);

    if (signature !== expectedSignature) {
      throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
    }
  },

  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function isSignature(askedIndex, expectedSignature) {
    var currentIndex = this.reader.index;
    this.reader.setIndex(askedIndex);
    var signature = this.reader.readString(4);
    var result = signature === expectedSignature;
    this.reader.setIndex(currentIndex);
    return result;
  },

  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function readBlockEndOfCentral() {
    this.diskNumber = this.reader.readInt(2);
    this.diskWithCentralDirStart = this.reader.readInt(2);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
    this.centralDirRecords = this.reader.readInt(2);
    this.centralDirSize = this.reader.readInt(4);
    this.centralDirOffset = this.reader.readInt(4);
    this.zipCommentLength = this.reader.readInt(2); // warning : the encoding depends of the system locale
    // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
    // On a windows machine, this field is encoded with the localized windows code page.

    var zipComment = this.reader.readData(this.zipCommentLength);
    var decodeParamType = support.uint8array ? "uint8array" : "array"; // To get consistent behavior with the generation part, we will assume that
    // this is utf8 encoded unless specified otherwise.

    var decodeContent = utils.transformTo(decodeParamType, zipComment);
    this.zipComment = this.loadOptions.decodeFileName(decodeContent);
  },

  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function readBlockZip64EndOfCentral() {
    this.zip64EndOfCentralSize = this.reader.readInt(8);
    this.versionMadeBy = this.reader.readString(2);
    this.versionNeeded = this.reader.readInt(2);
    this.diskNumber = this.reader.readInt(4);
    this.diskWithCentralDirStart = this.reader.readInt(4);
    this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
    this.centralDirRecords = this.reader.readInt(8);
    this.centralDirSize = this.reader.readInt(8);
    this.centralDirOffset = this.reader.readInt(8);
    this.zip64ExtensibleData = {};
    var extraDataSize = this.zip64EndOfCentralSize - 44;
    var index = 0;
    var extraFieldId, extraFieldLength, extraFieldValue;

    while (index < extraDataSize) {
      extraFieldId = this.reader.readInt(2);
      extraFieldLength = this.reader.readInt(4);
      extraFieldValue = this.reader.readString(extraFieldLength);
      this.zip64ExtensibleData[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
  },

  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function readBlockZip64EndOfCentralLocator() {
    this.diskWithZip64CentralDirStart = this.reader.readInt(4);
    this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
    this.disksCount = this.reader.readInt(4);

    if (this.disksCount > 1) {
      throw new Error("Multi-volumes zip are not supported");
    }
  },

  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function readLocalFiles() {
    var i, file;

    for (i = 0; i < this.files.length; i++) {
      file = this.files[i];
      this.reader.setIndex(file.localHeaderOffset);
      this.checkSignature(sig.LOCAL_FILE_HEADER);
      file.readLocalPart(this.reader);
      file.handleUTF8();
      file.processAttributes();
    }
  },

  /**
   * Read the central directory.
   */
  readCentralDir: function readCentralDir() {
    var file;
    this.reader.setIndex(this.centralDirOffset);

    while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
      file = new ZipEntry({
        zip64: this.zip64
      }, this.loadOptions);
      file.readCentralPart(this.reader);
      this.files.push(file);
    }

    if (this.centralDirRecords !== this.files.length) {
      if (this.centralDirRecords !== 0 && this.files.length === 0) {
        // We expected some records but couldn't find ANY.
        // This is really suspicious, as if something went wrong.
        throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      } else {// We found some records but not all.
        // Something is wrong but we got something for the user: no error here.
        // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
      }
    }
  },

  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function readEndOfCentral() {
    var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);

    if (offset < 0) {
      // Check if the content is a truncated zip or complete garbage.
      // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
      // extractible zip for example) but it can give a good hint.
      // If an ajax request was used without responseType, we will also
      // get unreadable data.
      var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

      if (isGarbage) {
        throw new Error("Can't find end of central directory : is this a zip file ?");
      } else {
        throw new Error("Corrupted zip : can't find end of central directory");
      }
    }

    this.reader.setIndex(offset);
    var endOfCentralDirOffset = offset;
    this.checkSignature(sig.CENTRAL_DIRECTORY_END);
    this.readBlockEndOfCentral();
    /* extract from the zip spec :
              4)  If one of the fields in the end of central directory
                  record is too small to hold required data, the field
                  should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                  ZIP64 format record should be created.
              5)  The end of central directory record and the
                  Zip64 end of central directory locator record must
                  reside on the same disk when splitting or spanning
                  an archive.
           */

    if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
      this.zip64 = true;
      /*
               Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
               the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
               all numbers as 64-bit double precision IEEE 754 floating point numbers.
               So, we have 53bits for integers and bitwise operations treat everything as 32bits.
               see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
               and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
               */
      // should look for a zip64 EOCD locator

      offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);

      if (offset < 0) {
        throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
      }

      this.reader.setIndex(offset);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
      this.readBlockZip64EndOfCentralLocator(); // now the zip64 EOCD record

      if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
        // console.warn("ZIP64 end of central directory not where expected.");
        this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);

        if (this.relativeOffsetEndOfZip64CentralDir < 0) {
          throw new Error("Corrupted zip : can't find the ZIP64 end of central directory");
        }
      }

      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
      this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
      this.readBlockZip64EndOfCentral();
    }

    var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;

    if (this.zip64) {
      expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator

      expectedEndOfCentralDirOffset += 12
      /* should not include the leading 12 bytes */
      + this.zip64EndOfCentralSize;
    }

    var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

    if (extraBytes > 0) {
      // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
      if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {// The offsets seem wrong, but we have something at the specified offset.
        // So… we keep it.
      } else {
        // the offset is wrong, update the "zero" of the reader
        // this happens if data has been prepended (crx files for example)
        this.reader.zero = extraBytes;
      }
    } else if (extraBytes < 0) {
      throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
    }
  },
  prepareReader: function prepareReader(data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);

    if (type === "string" && !support.uint8array) {
      this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
    } else if (type === "nodebuffer") {
      this.reader = new NodeBufferReader(data);
    } else if (support.uint8array) {
      this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data));
    } else if (support.array) {
      this.reader = new ArrayReader(utils.transformTo("array", data));
    } else {
      throw new Error("Unexpected error: unsupported type '" + type + "'");
    }
  },

  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function load(data) {
    this.prepareReader(data);
    this.readEndOfCentral();
    this.readCentralDir();
    this.readLocalFiles();
  }
}; // }}} end of ZipEntries

module.exports = ZipEntries;

/***/ }),

/***/ "./node_modules/pizzip/js/zipEntry.js":
/*!********************************************!*\
  !*** ./node_modules/pizzip/js/zipEntry.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var StringReader = __webpack_require__(/*! ./stringReader.js */ "./node_modules/pizzip/js/stringReader.js");

var utils = __webpack_require__(/*! ./utils.js */ "./node_modules/pizzip/js/utils.js");

var CompressedObject = __webpack_require__(/*! ./compressedObject.js */ "./node_modules/pizzip/js/compressedObject.js");

var pizzipProto = __webpack_require__(/*! ./object.js */ "./node_modules/pizzip/js/object.js");

var support = __webpack_require__(/*! ./support.js */ "./node_modules/pizzip/js/support.js");

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03; // class ZipEntry {{{

/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */

function ZipEntry(options, loadOptions) {
  this.options = options;
  this.loadOptions = loadOptions;
}

ZipEntry.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function isEncrypted() {
    // bit 1 is set
    return (this.bitFlag & 0x0001) === 0x0001;
  },

  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function useUTF8() {
    // bit 11 is set
    return (this.bitFlag & 0x0800) === 0x0800;
  },

  /**
   * Prepare the function used to generate the compressed content from this ZipFile.
   * @param {DataReader} reader the reader to use.
   * @param {number} from the offset from where we should read the data.
   * @param {number} length the length of the data to read.
   * @return {Function} the callback to get the compressed content (the type depends of the DataReader class).
   */
  prepareCompressedContent: function prepareCompressedContent(reader, from, length) {
    return function () {
      var previousIndex = reader.index;
      reader.setIndex(from);
      var compressedFileData = reader.readData(length);
      reader.setIndex(previousIndex);
      return compressedFileData;
    };
  },

  /**
   * Prepare the function used to generate the uncompressed content from this ZipFile.
   * @param {DataReader} reader the reader to use.
   * @param {number} from the offset from where we should read the data.
   * @param {number} length the length of the data to read.
   * @param {PizZip.compression} compression the compression used on this file.
   * @param {number} uncompressedSize the uncompressed size to expect.
   * @return {Function} the callback to get the uncompressed content (the type depends of the DataReader class).
   */
  prepareContent: function prepareContent(reader, from, length, compression, uncompressedSize) {
    return function () {
      var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
      var uncompressedFileData = compression.uncompress(compressedFileData);

      if (uncompressedFileData.length !== uncompressedSize) {
        throw new Error("Bug : uncompressed data size mismatch");
      }

      return uncompressedFileData;
    };
  },

  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function readLocalPart(reader) {
    // we already know everything from the central dir !
    // If the central dir data are false, we are doomed.
    // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
    // The less data we get here, the more reliable this should be.
    // Let's skip the whole header and dash to the data !
    reader.skip(22); // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
    // Strangely, the filename here is OK.
    // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
    // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
    // Search "unzip mismatching "local" filename continuing with "central" filename version" on
    // the internet.
    //
    // I think I see the logic here : the central directory is used to display
    // content and the local directory is used to extract the files. Mixing / and \
    // may be used to display \ to windows users and use / when extracting the files.
    // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394

    this.fileNameLength = reader.readInt(2);
    var localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir

    this.fileName = reader.readData(this.fileNameLength);
    reader.skip(localExtraFieldsLength);

    if (this.compressedSize === -1 || this.uncompressedSize === -1) {
      throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)");
    }

    var compression = utils.findCompression(this.compressionMethod);

    if (compression === null) {
      // no compression found
      throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
    }

    this.decompressed = new CompressedObject();
    this.decompressed.compressedSize = this.compressedSize;
    this.decompressed.uncompressedSize = this.uncompressedSize;
    this.decompressed.crc32 = this.crc32;
    this.decompressed.compressionMethod = this.compressionMethod;
    this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
    this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize); // we need to compute the crc32...

    if (this.loadOptions.checkCRC32) {
      this.decompressed = utils.transformTo("string", this.decompressed.getContent());

      if (pizzipProto.crc32(this.decompressed) !== this.crc32) {
        throw new Error("Corrupted zip : CRC32 mismatch");
      }
    }
  },

  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function readCentralPart(reader) {
    this.versionMadeBy = reader.readInt(2);
    this.versionNeeded = reader.readInt(2);
    this.bitFlag = reader.readInt(2);
    this.compressionMethod = reader.readString(2);
    this.date = reader.readDate();
    this.crc32 = reader.readInt(4);
    this.compressedSize = reader.readInt(4);
    this.uncompressedSize = reader.readInt(4);
    this.fileNameLength = reader.readInt(2);
    this.extraFieldsLength = reader.readInt(2);
    this.fileCommentLength = reader.readInt(2);
    this.diskNumberStart = reader.readInt(2);
    this.internalFileAttributes = reader.readInt(2);
    this.externalFileAttributes = reader.readInt(4);
    this.localHeaderOffset = reader.readInt(4);

    if (this.isEncrypted()) {
      throw new Error("Encrypted zip are not supported");
    }

    this.fileName = reader.readData(this.fileNameLength);
    this.readExtraFields(reader);
    this.parseZIP64ExtraField(reader);
    this.fileComment = reader.readData(this.fileCommentLength);
  },

  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function processAttributes() {
    this.unixPermissions = null;
    this.dosPermissions = null;
    var madeBy = this.versionMadeBy >> 8; // Check if we have the DOS directory flag set.
    // We look for it in the DOS and UNIX permissions
    // but some unknown platform could set it as a compatibility flag.

    this.dir = !!(this.externalFileAttributes & 0x0010);

    if (madeBy === MADE_BY_DOS) {
      // first 6 bits (0 to 5)
      this.dosPermissions = this.externalFileAttributes & 0x3f;
    }

    if (madeBy === MADE_BY_UNIX) {
      this.unixPermissions = this.externalFileAttributes >> 16 & 0xffff; // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
    } // fail safe : if the name ends with a / it probably means a folder


    if (!this.dir && this.fileNameStr.slice(-1) === "/") {
      this.dir = true;
    }
  },

  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   */
  parseZIP64ExtraField: function parseZIP64ExtraField() {
    if (!this.extraFields[0x0001]) {
      return;
    } // should be something, preparing the extra reader


    var extraReader = new StringReader(this.extraFields[0x0001].value); // I really hope that these 64bits integer can fit in 32 bits integer, because js
    // won't let us have more.

    if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
      this.uncompressedSize = extraReader.readInt(8);
    }

    if (this.compressedSize === utils.MAX_VALUE_32BITS) {
      this.compressedSize = extraReader.readInt(8);
    }

    if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
      this.localHeaderOffset = extraReader.readInt(8);
    }

    if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
      this.diskNumberStart = extraReader.readInt(4);
    }
  },

  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function readExtraFields(reader) {
    var start = reader.index;
    var extraFieldId, extraFieldLength, extraFieldValue;
    this.extraFields = this.extraFields || {};

    while (reader.index < start + this.extraFieldsLength) {
      extraFieldId = reader.readInt(2);
      extraFieldLength = reader.readInt(2);
      extraFieldValue = reader.readString(extraFieldLength);
      this.extraFields[extraFieldId] = {
        id: extraFieldId,
        length: extraFieldLength,
        value: extraFieldValue
      };
    }
  },

  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function handleUTF8() {
    var decodeParamType = support.uint8array ? "uint8array" : "array";

    if (this.useUTF8()) {
      this.fileNameStr = pizzipProto.utf8decode(this.fileName);
      this.fileCommentStr = pizzipProto.utf8decode(this.fileComment);
    } else {
      var upath = this.findExtraFieldUnicodePath();

      if (upath !== null) {
        this.fileNameStr = upath;
      } else {
        var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
      }

      var ucomment = this.findExtraFieldUnicodeComment();

      if (ucomment !== null) {
        this.fileCommentStr = ucomment;
      } else {
        var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
      }
    }
  },

  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function findExtraFieldUnicodePath() {
    var upathField = this.extraFields[0x7075];

    if (upathField) {
      var extraReader = new StringReader(upathField.value); // wrong version

      if (extraReader.readInt(1) !== 1) {
        return null;
      } // the crc of the filename changed, this field is out of date.


      if (pizzipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
        return null;
      }

      return pizzipProto.utf8decode(extraReader.readString(upathField.length - 5));
    }

    return null;
  },

  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function findExtraFieldUnicodeComment() {
    var ucommentField = this.extraFields[0x6375];

    if (ucommentField) {
      var extraReader = new StringReader(ucommentField.value); // wrong version

      if (extraReader.readInt(1) !== 1) {
        return null;
      } // the crc of the comment changed, this field is out of date.


      if (pizzipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
        return null;
      }

      return pizzipProto.utf8decode(extraReader.readString(ucommentField.length - 5));
    }

    return null;
  }
};
module.exports = ZipEntry;

/***/ }),

/***/ "./node_modules/pizzip/node_modules/pako/dist/pako.es5.js":
/*!****************************************************************!*\
  !*** ./node_modules/pizzip/node_modules/pako/dist/pako.es5.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports) {


/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
(function (global, factory) {
   true ? factory(exports) :
  0;
}(this, (function (exports) { 'use strict';

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  /* eslint-disable space-unary-ops */

  /* Public constants ==========================================================*/

  /* ===========================================================================*/
  //const Z_FILTERED          = 1;
  //const Z_HUFFMAN_ONLY      = 2;
  //const Z_RLE               = 3;

  var Z_FIXED$1 = 4; //const Z_DEFAULT_STRATEGY  = 0;

  /* Possible values of the data_type field (though see inflate()) */

  var Z_BINARY = 0;
  var Z_TEXT = 1; //const Z_ASCII             = 1; // = Z_TEXT

  var Z_UNKNOWN$1 = 2;
  /*============================================================================*/

  function zero$1(buf) {
    var len = buf.length;

    while (--len >= 0) {
      buf[len] = 0;
    }
  } // From zutil.h


  var STORED_BLOCK = 0;
  var STATIC_TREES = 1;
  var DYN_TREES = 2;
  /* The three kinds of block type */

  var MIN_MATCH$1 = 3;
  var MAX_MATCH$1 = 258;
  /* The minimum and maximum match lengths */
  // From deflate.h

  /* ===========================================================================
   * Internal compression state.
   */

  var LENGTH_CODES$1 = 29;
  /* number of length codes, not counting the special END_BLOCK code */

  var LITERALS$1 = 256;
  /* number of literal bytes 0..255 */

  var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
  /* number of Literal or Length codes, including the END_BLOCK code */

  var D_CODES$1 = 30;
  /* number of distance codes */

  var BL_CODES$1 = 19;
  /* number of codes used to transfer the bit lengths */

  var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
  /* maximum heap size */

  var MAX_BITS$1 = 15;
  /* All codes must not exceed MAX_BITS bits */

  var Buf_size = 16;
  /* size of bit buffer in bi_buf */

  /* ===========================================================================
   * Constants
   */

  var MAX_BL_BITS = 7;
  /* Bit length codes must not exceed MAX_BL_BITS bits */

  var END_BLOCK = 256;
  /* end of block literal code */

  var REP_3_6 = 16;
  /* repeat previous bit length 3-6 times (2 bits of repeat count) */

  var REPZ_3_10 = 17;
  /* repeat a zero length 3-10 times  (3 bits of repeat count) */

  var REPZ_11_138 = 18;
  /* repeat a zero length 11-138 times  (7 bits of repeat count) */

  /* eslint-disable comma-spacing,array-bracket-spacing */

  var extra_lbits =
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
  var extra_dbits =
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
  var extra_blbits =
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
  var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  /* eslint-enable comma-spacing,array-bracket-spacing */

  /* The lengths of the bit length codes are sent in order of decreasing
   * probability, to avoid transmitting the lengths for unused bit length codes.
   */

  /* ===========================================================================
   * Local data. These are initialized only once.
   */
  // We pre-fill arrays with 0 to avoid uninitialized gaps

  var DIST_CODE_LEN = 512;
  /* see definition of array dist_code below */
  // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1

  var static_ltree = new Array((L_CODES$1 + 2) * 2);
  zero$1(static_ltree);
  /* The static literal tree. Since the bit lengths are imposed, there is no
   * need for the L_CODES extra codes used during heap construction. However
   * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
   * below).
   */

  var static_dtree = new Array(D_CODES$1 * 2);
  zero$1(static_dtree);
  /* The static distance tree. (Actually a trivial tree since all codes use
   * 5 bits.)
   */

  var _dist_code = new Array(DIST_CODE_LEN);

  zero$1(_dist_code);
  /* Distance codes. The first 256 values correspond to the distances
   * 3 .. 258, the last 256 values correspond to the top 8 bits of
   * the 15 bit distances.
   */

  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);

  zero$1(_length_code);
  /* length code for each normalized match length (0 == MIN_MATCH) */

  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  /* First normalized length for each code (0 = MIN_MATCH) */

  var base_dist = new Array(D_CODES$1);
  zero$1(base_dist);
  /* First normalized distance for each code (0 = distance of 1) */

  function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
    this.static_tree = static_tree;
    /* static tree or NULL */

    this.extra_bits = extra_bits;
    /* extra bits for each code or NULL */

    this.extra_base = extra_base;
    /* base index for extra_bits */

    this.elems = elems;
    /* max number of elements in the tree */

    this.max_length = max_length;
    /* max bit length for the codes */
    // show if `static_tree` has data or dummy - needed for monomorphic objects

    this.has_stree = static_tree && static_tree.length;
  }

  var static_l_desc;
  var static_d_desc;
  var static_bl_desc;

  function TreeDesc(dyn_tree, stat_desc) {
    this.dyn_tree = dyn_tree;
    /* the dynamic tree */

    this.max_code = 0;
    /* largest code with non zero frequency */

    this.stat_desc = stat_desc;
    /* the corresponding static tree */
  }

  var d_code = function d_code(dist) {
    return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
  };
  /* ===========================================================================
   * Output a short LSB first on the stream.
   * IN assertion: there is enough room in pendingBuf.
   */


  var put_short = function put_short(s, w) {
    //    put_byte(s, (uch)((w) & 0xff));
    //    put_byte(s, (uch)((ush)(w) >> 8));
    s.pending_buf[s.pending++] = w & 0xff;
    s.pending_buf[s.pending++] = w >>> 8 & 0xff;
  };
  /* ===========================================================================
   * Send a value on a given number of bits.
   * IN assertion: length <= 16 and value fits in length bits.
   */


  var send_bits = function send_bits(s, value, length) {
    if (s.bi_valid > Buf_size - length) {
      s.bi_buf |= value << s.bi_valid & 0xffff;
      put_short(s, s.bi_buf);
      s.bi_buf = value >> Buf_size - s.bi_valid;
      s.bi_valid += length - Buf_size;
    } else {
      s.bi_buf |= value << s.bi_valid & 0xffff;
      s.bi_valid += length;
    }
  };

  var send_code = function send_code(s, c, tree) {
    send_bits(s, tree[c * 2]
    /*.Code*/
    , tree[c * 2 + 1]
    /*.Len*/
    );
  };
  /* ===========================================================================
   * Reverse the first len bits of a code, using straightforward code (a faster
   * method would use a table)
   * IN assertion: 1 <= len <= 15
   */


  var bi_reverse = function bi_reverse(code, len) {
    var res = 0;

    do {
      res |= code & 1;
      code >>>= 1;
      res <<= 1;
    } while (--len > 0);

    return res >>> 1;
  };
  /* ===========================================================================
   * Flush the bit buffer, keeping at most 7 bits in it.
   */


  var bi_flush = function bi_flush(s) {
    if (s.bi_valid === 16) {
      put_short(s, s.bi_buf);
      s.bi_buf = 0;
      s.bi_valid = 0;
    } else if (s.bi_valid >= 8) {
      s.pending_buf[s.pending++] = s.bi_buf & 0xff;
      s.bi_buf >>= 8;
      s.bi_valid -= 8;
    }
  };
  /* ===========================================================================
   * Compute the optimal bit lengths for a tree and update the total bit length
   * for the current block.
   * IN assertion: the fields freq and dad are set, heap[heap_max] and
   *    above are the tree nodes sorted by increasing frequency.
   * OUT assertions: the field len is set to the optimal bit length, the
   *     array bl_count contains the frequencies for each bit length.
   *     The length opt_len is updated; static_len is also updated if stree is
   *     not null.
   */


  var gen_bitlen = function gen_bitlen(s, desc) //    deflate_state *s;
  //    tree_desc *desc;    /* the tree descriptor */
  {
    var tree = desc.dyn_tree;
    var max_code = desc.max_code;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var extra = desc.stat_desc.extra_bits;
    var base = desc.stat_desc.extra_base;
    var max_length = desc.stat_desc.max_length;
    var h;
    /* heap index */

    var n, m;
    /* iterate over the tree elements */

    var bits;
    /* bit length */

    var xbits;
    /* extra bits */

    var f;
    /* frequency */

    var overflow = 0;
    /* number of elements with bit length too large */

    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      s.bl_count[bits] = 0;
    }
    /* In a first pass, compute the optimal bit lengths (which may
     * overflow in the case of the bit length tree).
     */


    tree[s.heap[s.heap_max] * 2 + 1]
    /*.Len*/
    = 0;
    /* root of the heap */

    for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
      n = s.heap[h];
      bits = tree[tree[n * 2 + 1]
      /*.Dad*/
      * 2 + 1]
      /*.Len*/
      + 1;

      if (bits > max_length) {
        bits = max_length;
        overflow++;
      }

      tree[n * 2 + 1]
      /*.Len*/
      = bits;
      /* We overwrite tree[n].Dad which is no longer needed */

      if (n > max_code) {
        continue;
      }
      /* not a leaf node */


      s.bl_count[bits]++;
      xbits = 0;

      if (n >= base) {
        xbits = extra[n - base];
      }

      f = tree[n * 2]
      /*.Freq*/
      ;
      s.opt_len += f * (bits + xbits);

      if (has_stree) {
        s.static_len += f * (stree[n * 2 + 1]
        /*.Len*/
        + xbits);
      }
    }

    if (overflow === 0) {
      return;
    } // Trace((stderr,"\nbit length overflow\n"));

    /* This happens for example on obj2 and pic of the Calgary corpus */

    /* Find the first bit length which could increase: */


    do {
      bits = max_length - 1;

      while (s.bl_count[bits] === 0) {
        bits--;
      }

      s.bl_count[bits]--;
      /* move one leaf down the tree */

      s.bl_count[bits + 1] += 2;
      /* move one overflow item as its brother */

      s.bl_count[max_length]--;
      /* The brother of the overflow item also moves one step up,
       * but this does not affect bl_count[max_length]
       */

      overflow -= 2;
    } while (overflow > 0);
    /* Now recompute all bit lengths, scanning in increasing frequency.
     * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
     * lengths instead of fixing only the wrong ones. This idea is taken
     * from 'ar' written by Haruhiko Okumura.)
     */


    for (bits = max_length; bits !== 0; bits--) {
      n = s.bl_count[bits];

      while (n !== 0) {
        m = s.heap[--h];

        if (m > max_code) {
          continue;
        }

        if (tree[m * 2 + 1]
        /*.Len*/
        !== bits) {
          // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
          s.opt_len += (bits - tree[m * 2 + 1]
          /*.Len*/
          ) * tree[m * 2]
          /*.Freq*/
          ;
          tree[m * 2 + 1]
          /*.Len*/
          = bits;
        }

        n--;
      }
    }
  };
  /* ===========================================================================
   * Generate the codes for a given tree and bit counts (which need not be
   * optimal).
   * IN assertion: the array bl_count contains the bit length statistics for
   * the given tree and the field len is set for all tree elements.
   * OUT assertion: the field code is set for all tree elements of non
   *     zero code length.
   */


  var gen_codes = function gen_codes(tree, max_code, bl_count) //    ct_data *tree;             /* the tree to decorate */
  //    int max_code;              /* largest code with non zero frequency */
  //    ushf *bl_count;            /* number of codes at each bit length */
  {
    var next_code = new Array(MAX_BITS$1 + 1);
    /* next code value for each bit length */

    var code = 0;
    /* running code value */

    var bits;
    /* bit index */

    var n;
    /* code index */

    /* The distribution counts are first used to generate the code values
     * without bit reversal.
     */

    for (bits = 1; bits <= MAX_BITS$1; bits++) {
      next_code[bits] = code = code + bl_count[bits - 1] << 1;
    }
    /* Check that the bit counts in bl_count are consistent. The last code
     * must be all ones.
     */
    //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
    //        "inconsistent bit counts");
    //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));


    for (n = 0; n <= max_code; n++) {
      var len = tree[n * 2 + 1]
      /*.Len*/
      ;

      if (len === 0) {
        continue;
      }
      /* Now reverse the bits */


      tree[n * 2]
      /*.Code*/
      = bi_reverse(next_code[len]++, len); //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
      //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
    }
  };
  /* ===========================================================================
   * Initialize the various 'constant' tables.
   */


  var tr_static_init = function tr_static_init() {
    var n;
    /* iterates over tree elements */

    var bits;
    /* bit counter */

    var length;
    /* length value */

    var code;
    /* code value */

    var dist;
    /* distance index */

    var bl_count = new Array(MAX_BITS$1 + 1);
    /* number of codes at each bit length for an optimal tree */
    // do check in _tr_init()
    //if (static_init_done) return;

    /* For some embedded targets, global variables are not initialized: */

    /*#ifdef NO_INIT_GLOBAL_POINTERS
      static_l_desc.static_tree = static_ltree;
      static_l_desc.extra_bits = extra_lbits;
      static_d_desc.static_tree = static_dtree;
      static_d_desc.extra_bits = extra_dbits;
      static_bl_desc.extra_bits = extra_blbits;
    #endif*/

    /* Initialize the mapping length (0..255) -> length code (0..28) */

    length = 0;

    for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
      base_length[code] = length;

      for (n = 0; n < 1 << extra_lbits[code]; n++) {
        _length_code[length++] = code;
      }
    } //Assert (length == 256, "tr_static_init: length != 256");

    /* Note that the length 255 (match length 258) can be represented
     * in two different ways: code 284 + 5 bits or code 285, so we
     * overwrite length_code[255] to use the best encoding:
     */


    _length_code[length - 1] = code;
    /* Initialize the mapping dist (0..32K) -> dist code (0..29) */

    dist = 0;

    for (code = 0; code < 16; code++) {
      base_dist[code] = dist;

      for (n = 0; n < 1 << extra_dbits[code]; n++) {
        _dist_code[dist++] = code;
      }
    } //Assert (dist == 256, "tr_static_init: dist != 256");


    dist >>= 7;
    /* from now on, all distances are divided by 128 */

    for (; code < D_CODES$1; code++) {
      base_dist[code] = dist << 7;

      for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
        _dist_code[256 + dist++] = code;
      }
    } //Assert (dist == 256, "tr_static_init: 256+dist != 512");

    /* Construct the codes of the static literal tree */


    for (bits = 0; bits <= MAX_BITS$1; bits++) {
      bl_count[bits] = 0;
    }

    n = 0;

    while (n <= 143) {
      static_ltree[n * 2 + 1]
      /*.Len*/
      = 8;
      n++;
      bl_count[8]++;
    }

    while (n <= 255) {
      static_ltree[n * 2 + 1]
      /*.Len*/
      = 9;
      n++;
      bl_count[9]++;
    }

    while (n <= 279) {
      static_ltree[n * 2 + 1]
      /*.Len*/
      = 7;
      n++;
      bl_count[7]++;
    }

    while (n <= 287) {
      static_ltree[n * 2 + 1]
      /*.Len*/
      = 8;
      n++;
      bl_count[8]++;
    }
    /* Codes 286 and 287 do not exist, but we must include them in the
     * tree construction to get a canonical Huffman tree (longest code
     * all ones)
     */


    gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
    /* The static distance tree is trivial: */

    for (n = 0; n < D_CODES$1; n++) {
      static_dtree[n * 2 + 1]
      /*.Len*/
      = 5;
      static_dtree[n * 2]
      /*.Code*/
      = bi_reverse(n, 5);
    } // Now data ready and we can init static trees


    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
    static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
    static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS); //static_init_done = true;
  };
  /* ===========================================================================
   * Initialize a new block.
   */


  var init_block = function init_block(s) {
    var n;
    /* iterates over tree elements */

    /* Initialize the trees. */

    for (n = 0; n < L_CODES$1; n++) {
      s.dyn_ltree[n * 2]
      /*.Freq*/
      = 0;
    }

    for (n = 0; n < D_CODES$1; n++) {
      s.dyn_dtree[n * 2]
      /*.Freq*/
      = 0;
    }

    for (n = 0; n < BL_CODES$1; n++) {
      s.bl_tree[n * 2]
      /*.Freq*/
      = 0;
    }

    s.dyn_ltree[END_BLOCK * 2]
    /*.Freq*/
    = 1;
    s.opt_len = s.static_len = 0;
    s.last_lit = s.matches = 0;
  };
  /* ===========================================================================
   * Flush the bit buffer and align the output on a byte boundary
   */


  var bi_windup = function bi_windup(s) {
    if (s.bi_valid > 8) {
      put_short(s, s.bi_buf);
    } else if (s.bi_valid > 0) {
      //put_byte(s, (Byte)s->bi_buf);
      s.pending_buf[s.pending++] = s.bi_buf;
    }

    s.bi_buf = 0;
    s.bi_valid = 0;
  };
  /* ===========================================================================
   * Copy a stored block, storing first the length and its
   * one's complement if requested.
   */


  var copy_block = function copy_block(s, buf, len, header) //DeflateState *s;
  //charf    *buf;    /* the input data */
  //unsigned len;     /* its length */
  //int      header;  /* true if block header must be written */
  {
    bi_windup(s);
    /* align on byte boundary */

    if (header) {
      put_short(s, len);
      put_short(s, ~len);
    } //  while (len--) {
    //    put_byte(s, *buf++);
    //  }


    s.pending_buf.set(s.window.subarray(buf, buf + len), s.pending);
    s.pending += len;
  };
  /* ===========================================================================
   * Compares to subtrees, using the tree depth as tie breaker when
   * the subtrees have equal frequency. This minimizes the worst case length.
   */


  var smaller = function smaller(tree, n, m, depth) {
    var _n2 = n * 2;

    var _m2 = m * 2;

    return tree[_n2]
    /*.Freq*/
    < tree[_m2]
    /*.Freq*/
    || tree[_n2]
    /*.Freq*/
    === tree[_m2]
    /*.Freq*/
    && depth[n] <= depth[m];
  };
  /* ===========================================================================
   * Restore the heap property by moving down the tree starting at node k,
   * exchanging a node with the smallest of its two sons if necessary, stopping
   * when the heap property is re-established (each father smaller than its
   * two sons).
   */


  var pqdownheap = function pqdownheap(s, tree, k) //    deflate_state *s;
  //    ct_data *tree;  /* the tree to restore */
  //    int k;               /* node to move down */
  {
    var v = s.heap[k];
    var j = k << 1;
    /* left son of k */

    while (j <= s.heap_len) {
      /* Set j to the smallest of the two sons: */
      if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
        j++;
      }
      /* Exit if v is smaller than both sons */


      if (smaller(tree, v, s.heap[j], s.depth)) {
        break;
      }
      /* Exchange v with the smallest son */


      s.heap[k] = s.heap[j];
      k = j;
      /* And continue down the tree, setting j to the left son of k */

      j <<= 1;
    }

    s.heap[k] = v;
  }; // inlined manually
  // const SMALLEST = 1;

  /* ===========================================================================
   * Send the block data compressed using the given Huffman trees
   */


  var compress_block = function compress_block(s, ltree, dtree) //    deflate_state *s;
  //    const ct_data *ltree; /* literal tree */
  //    const ct_data *dtree; /* distance tree */
  {
    var dist;
    /* distance of matched string */

    var lc;
    /* match length or unmatched char (if dist == 0) */

    var lx = 0;
    /* running index in l_buf */

    var code;
    /* the code to send */

    var extra;
    /* number of extra bits to send */

    if (s.last_lit !== 0) {
      do {
        dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
        lc = s.pending_buf[s.l_buf + lx];
        lx++;

        if (dist === 0) {
          send_code(s, lc, ltree);
          /* send a literal byte */
          //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
        } else {
          /* Here, lc is the match length - MIN_MATCH */
          code = _length_code[lc];
          send_code(s, code + LITERALS$1 + 1, ltree);
          /* send the length code */

          extra = extra_lbits[code];

          if (extra !== 0) {
            lc -= base_length[code];
            send_bits(s, lc, extra);
            /* send the extra length bits */
          }

          dist--;
          /* dist is now the match distance - 1 */

          code = d_code(dist); //Assert (code < D_CODES, "bad d_code");

          send_code(s, code, dtree);
          /* send the distance code */

          extra = extra_dbits[code];

          if (extra !== 0) {
            dist -= base_dist[code];
            send_bits(s, dist, extra);
            /* send the extra distance bits */
          }
        }
        /* literal or match pair ? */

        /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
        //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
        //       "pendingBuf overflow");

      } while (lx < s.last_lit);
    }

    send_code(s, END_BLOCK, ltree);
  };
  /* ===========================================================================
   * Construct one Huffman tree and assigns the code bit strings and lengths.
   * Update the total bit length for the current block.
   * IN assertion: the field freq is set for all tree elements.
   * OUT assertions: the fields len and code are set to the optimal bit length
   *     and corresponding code. The length opt_len is updated; static_len is
   *     also updated if stree is not null. The field max_code is set.
   */


  var build_tree = function build_tree(s, desc) //    deflate_state *s;
  //    tree_desc *desc; /* the tree descriptor */
  {
    var tree = desc.dyn_tree;
    var stree = desc.stat_desc.static_tree;
    var has_stree = desc.stat_desc.has_stree;
    var elems = desc.stat_desc.elems;
    var n, m;
    /* iterate over heap elements */

    var max_code = -1;
    /* largest code with non zero frequency */

    var node;
    /* new node being created */

    /* Construct the initial heap, with least frequent element in
     * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
     * heap[0] is not used.
     */

    s.heap_len = 0;
    s.heap_max = HEAP_SIZE$1;

    for (n = 0; n < elems; n++) {
      if (tree[n * 2]
      /*.Freq*/
      !== 0) {
        s.heap[++s.heap_len] = max_code = n;
        s.depth[n] = 0;
      } else {
        tree[n * 2 + 1]
        /*.Len*/
        = 0;
      }
    }
    /* The pkzip format requires that at least one distance code exists,
     * and that at least one bit should be sent even if there is only one
     * possible code. So to avoid special checks later on we force at least
     * two codes of non zero frequency.
     */


    while (s.heap_len < 2) {
      node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
      tree[node * 2]
      /*.Freq*/
      = 1;
      s.depth[node] = 0;
      s.opt_len--;

      if (has_stree) {
        s.static_len -= stree[node * 2 + 1]
        /*.Len*/
        ;
      }
      /* node is 0 or 1 so it does not have extra bits */

    }

    desc.max_code = max_code;
    /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
     * establish sub-heaps of increasing lengths:
     */

    for (n = s.heap_len >> 1
    /*int /2*/
    ; n >= 1; n--) {
      pqdownheap(s, tree, n);
    }
    /* Construct the Huffman tree by repeatedly combining the least two
     * frequent nodes.
     */


    node = elems;
    /* next internal node of the tree */

    do {
      //pqremove(s, tree, n);  /* n = node of least frequency */

      /*** pqremove ***/
      n = s.heap[1
      /*SMALLEST*/
      ];
      s.heap[1
      /*SMALLEST*/
      ] = s.heap[s.heap_len--];
      pqdownheap(s, tree, 1
      /*SMALLEST*/
      );
      /***/

      m = s.heap[1
      /*SMALLEST*/
      ];
      /* m = node of next least frequency */

      s.heap[--s.heap_max] = n;
      /* keep the nodes sorted by frequency */

      s.heap[--s.heap_max] = m;
      /* Create a new node father of n and m */

      tree[node * 2]
      /*.Freq*/
      = tree[n * 2]
      /*.Freq*/
      + tree[m * 2]
      /*.Freq*/
      ;
      s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
      tree[n * 2 + 1]
      /*.Dad*/
      = tree[m * 2 + 1]
      /*.Dad*/
      = node;
      /* and insert the new node in the heap */

      s.heap[1
      /*SMALLEST*/
      ] = node++;
      pqdownheap(s, tree, 1
      /*SMALLEST*/
      );
    } while (s.heap_len >= 2);

    s.heap[--s.heap_max] = s.heap[1
    /*SMALLEST*/
    ];
    /* At this point, the fields freq and dad are set. We can now
     * generate the bit lengths.
     */

    gen_bitlen(s, desc);
    /* The field len is now set, we can generate the bit codes */

    gen_codes(tree, max_code, s.bl_count);
  };
  /* ===========================================================================
   * Scan a literal or distance tree to determine the frequencies of the codes
   * in the bit length tree.
   */


  var scan_tree = function scan_tree(s, tree, max_code) //    deflate_state *s;
  //    ct_data *tree;   /* the tree to be scanned */
  //    int max_code;    /* and its largest code of non zero frequency */
  {
    var n;
    /* iterates over all tree elements */

    var prevlen = -1;
    /* last emitted length */

    var curlen;
    /* length of current code */

    var nextlen = tree[0 * 2 + 1]
    /*.Len*/
    ;
    /* length of next code */

    var count = 0;
    /* repeat count of the current code */

    var max_count = 7;
    /* max repeat count */

    var min_count = 4;
    /* min repeat count */

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }

    tree[(max_code + 1) * 2 + 1]
    /*.Len*/
    = 0xffff;
    /* guard */

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1]
      /*.Len*/
      ;

      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        s.bl_tree[curlen * 2]
        /*.Freq*/
        += count;
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          s.bl_tree[curlen * 2] /*.Freq*/++;
        }

        s.bl_tree[REP_3_6 * 2] /*.Freq*/++;
      } else if (count <= 10) {
        s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++;
      } else {
        s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++;
      }

      count = 0;
      prevlen = curlen;

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  /* ===========================================================================
   * Send a literal or distance tree in compressed form, using the codes in
   * bl_tree.
   */


  var send_tree = function send_tree(s, tree, max_code) //    deflate_state *s;
  //    ct_data *tree; /* the tree to be scanned */
  //    int max_code;       /* and its largest code of non zero frequency */
  {
    var n;
    /* iterates over all tree elements */

    var prevlen = -1;
    /* last emitted length */

    var curlen;
    /* length of current code */

    var nextlen = tree[0 * 2 + 1]
    /*.Len*/
    ;
    /* length of next code */

    var count = 0;
    /* repeat count of the current code */

    var max_count = 7;
    /* max repeat count */

    var min_count = 4;
    /* min repeat count */

    /* tree[max_code+1].Len = -1; */

    /* guard already set */

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    }

    for (n = 0; n <= max_code; n++) {
      curlen = nextlen;
      nextlen = tree[(n + 1) * 2 + 1]
      /*.Len*/
      ;

      if (++count < max_count && curlen === nextlen) {
        continue;
      } else if (count < min_count) {
        do {
          send_code(s, curlen, s.bl_tree);
        } while (--count !== 0);
      } else if (curlen !== 0) {
        if (curlen !== prevlen) {
          send_code(s, curlen, s.bl_tree);
          count--;
        } //Assert(count >= 3 && count <= 6, " 3_6?");


        send_code(s, REP_3_6, s.bl_tree);
        send_bits(s, count - 3, 2);
      } else if (count <= 10) {
        send_code(s, REPZ_3_10, s.bl_tree);
        send_bits(s, count - 3, 3);
      } else {
        send_code(s, REPZ_11_138, s.bl_tree);
        send_bits(s, count - 11, 7);
      }

      count = 0;
      prevlen = curlen;

      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      } else if (curlen === nextlen) {
        max_count = 6;
        min_count = 3;
      } else {
        max_count = 7;
        min_count = 4;
      }
    }
  };
  /* ===========================================================================
   * Construct the Huffman tree for the bit lengths and return the index in
   * bl_order of the last bit length code to send.
   */


  var build_bl_tree = function build_bl_tree(s) {
    var max_blindex;
    /* index of last bit length code of non zero freq */

    /* Determine the bit length frequencies for literal and distance trees */

    scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
    scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
    /* Build the bit length tree: */

    build_tree(s, s.bl_desc);
    /* opt_len now includes the length of the tree representations, except
     * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
     */

    /* Determine the number of bit length codes to send. The pkzip format
     * requires that at least 4 bit length codes be sent. (appnote.txt says
     * 3 but the actual value used is 4.)
     */

    for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
      if (s.bl_tree[bl_order[max_blindex] * 2 + 1]
      /*.Len*/
      !== 0) {
        break;
      }
    }
    /* Update opt_len to include the bit length tree and counts */


    s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4; //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
    //        s->opt_len, s->static_len));

    return max_blindex;
  };
  /* ===========================================================================
   * Send the header for a block using dynamic Huffman trees: the counts, the
   * lengths of the bit length codes, the literal tree and the distance tree.
   * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
   */


  var send_all_trees = function send_all_trees(s, lcodes, dcodes, blcodes) //    deflate_state *s;
  //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
  {
    var rank;
    /* index in bl_order */
    //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
    //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
    //        "too many codes");
    //Tracev((stderr, "\nbl counts: "));

    send_bits(s, lcodes - 257, 5);
    /* not +255 as stated in appnote.txt */

    send_bits(s, dcodes - 1, 5);
    send_bits(s, blcodes - 4, 4);
    /* not -3 as stated in appnote.txt */

    for (rank = 0; rank < blcodes; rank++) {
      //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
      send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]
      /*.Len*/
      , 3);
    } //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));


    send_tree(s, s.dyn_ltree, lcodes - 1);
    /* literal tree */
    //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

    send_tree(s, s.dyn_dtree, dcodes - 1);
    /* distance tree */
    //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
  };
  /* ===========================================================================
   * Check if the data type is TEXT or BINARY, using the following algorithm:
   * - TEXT if the two conditions below are satisfied:
   *    a) There are no non-portable control characters belonging to the
   *       "black list" (0..6, 14..25, 28..31).
   *    b) There is at least one printable character belonging to the
   *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
   * - BINARY otherwise.
   * - The following partially-portable control characters form a
   *   "gray list" that is ignored in this detection algorithm:
   *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
   * IN assertion: the fields Freq of dyn_ltree are set.
   */


  var detect_data_type = function detect_data_type(s) {
    /* black_mask is the bit mask of black-listed bytes
     * set bits 0..6, 14..25, and 28..31
     * 0xf3ffc07f = binary 11110011111111111100000001111111
     */
    var black_mask = 0xf3ffc07f;
    var n;
    /* Check for non-textual ("black-listed") bytes. */

    for (n = 0; n <= 31; n++, black_mask >>>= 1) {
      if (black_mask & 1 && s.dyn_ltree[n * 2]
      /*.Freq*/
      !== 0) {
        return Z_BINARY;
      }
    }
    /* Check for textual ("white-listed") bytes. */


    if (s.dyn_ltree[9 * 2]
    /*.Freq*/
    !== 0 || s.dyn_ltree[10 * 2]
    /*.Freq*/
    !== 0 || s.dyn_ltree[13 * 2]
    /*.Freq*/
    !== 0) {
      return Z_TEXT;
    }

    for (n = 32; n < LITERALS$1; n++) {
      if (s.dyn_ltree[n * 2]
      /*.Freq*/
      !== 0) {
        return Z_TEXT;
      }
    }
    /* There are no "black-listed" or "white-listed" bytes:
     * this stream either is empty or has tolerated ("gray-listed") bytes only.
     */


    return Z_BINARY;
  };

  var static_init_done = false;
  /* ===========================================================================
   * Initialize the tree data structures for a new zlib stream.
   */

  var _tr_init$1 = function _tr_init(s) {
    if (!static_init_done) {
      tr_static_init();
      static_init_done = true;
    }

    s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
    s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
    s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
    s.bi_buf = 0;
    s.bi_valid = 0;
    /* Initialize the first block of the first file: */

    init_block(s);
  };
  /* ===========================================================================
   * Send a stored block
   */


  var _tr_stored_block$1 = function _tr_stored_block(s, buf, stored_len, last) //DeflateState *s;
  //charf *buf;       /* input block */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
    /* send block type */

    copy_block(s, buf, stored_len, true);
    /* with header */
  };
  /* ===========================================================================
   * Send one empty static block to give enough lookahead for inflate.
   * This takes 10 bits, of which 7 may remain in the bit buffer.
   */


  var _tr_align$1 = function _tr_align(s) {
    send_bits(s, STATIC_TREES << 1, 3);
    send_code(s, END_BLOCK, static_ltree);
    bi_flush(s);
  };
  /* ===========================================================================
   * Determine the best encoding for the current block: dynamic trees, static
   * trees or store, and output the encoded block to the zip file.
   */


  var _tr_flush_block$1 = function _tr_flush_block(s, buf, stored_len, last) //DeflateState *s;
  //charf *buf;       /* input block, or NULL if too old */
  //ulg stored_len;   /* length of input block */
  //int last;         /* one if this is the last block for a file */
  {
    var opt_lenb, static_lenb;
    /* opt_len and static_len in bytes */

    var max_blindex = 0;
    /* index of last bit length code of non zero freq */

    /* Build the Huffman trees unless a stored block is forced */

    if (s.level > 0) {
      /* Check if the file is binary or text */
      if (s.strm.data_type === Z_UNKNOWN$1) {
        s.strm.data_type = detect_data_type(s);
      }
      /* Construct the literal and distance trees */


      build_tree(s, s.l_desc); // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));

      build_tree(s, s.d_desc); // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
      //        s->static_len));

      /* At this point, opt_len and static_len are the total bit lengths of
       * the compressed block data, excluding the tree representations.
       */

      /* Build the bit length tree for the above two trees, and get the index
       * in bl_order of the last bit length code to send.
       */

      max_blindex = build_bl_tree(s);
      /* Determine the best encoding. Compute the block lengths in bytes. */

      opt_lenb = s.opt_len + 3 + 7 >>> 3;
      static_lenb = s.static_len + 3 + 7 >>> 3; // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
      //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
      //        s->last_lit));

      if (static_lenb <= opt_lenb) {
        opt_lenb = static_lenb;
      }
    } else {
      // Assert(buf != (char*)0, "lost buf");
      opt_lenb = static_lenb = stored_len + 5;
      /* force a stored block */
    }

    if (stored_len + 4 <= opt_lenb && buf !== -1) {
      /* 4: two words for the lengths */

      /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
       * Otherwise we can't have processed more than WSIZE input bytes since
       * the last block flush, because compression would have been
       * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
       * transform a block into a stored block.
       */
      _tr_stored_block$1(s, buf, stored_len, last);
    } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
      send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
      compress_block(s, static_ltree, static_dtree);
    } else {
      send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
      send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
      compress_block(s, s.dyn_ltree, s.dyn_dtree);
    } // Assert (s->compressed_len == s->bits_sent, "bad compressed size");

    /* The above check is made mod 2^32, for files larger than 512 MB
     * and uLong implemented on 32 bits.
     */


    init_block(s);

    if (last) {
      bi_windup(s);
    } // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
    //       s->compressed_len-7*last));

  };
  /* ===========================================================================
   * Save the match info and tally the frequency counts. Return true if
   * the current block must be flushed.
   */


  var _tr_tally$1 = function _tr_tally(s, dist, lc) //    deflate_state *s;
  //    unsigned dist;  /* distance of matched string */
  //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
  {
    //let out_length, in_length, dcode;
    s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 0xff;
    s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;
    s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
    s.last_lit++;

    if (dist === 0) {
      /* lc is the unmatched char */
      s.dyn_ltree[lc * 2] /*.Freq*/++;
    } else {
      s.matches++;
      /* Here, lc is the match length - MIN_MATCH */

      dist--;
      /* dist = match distance - 1 */
      //Assert((ush)dist < (ush)MAX_DIST(s) &&
      //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
      //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

      s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2] /*.Freq*/++;
      s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++;
    } // (!) This block is disabled in zlib defaults,
    // don't enable it for binary compatibility
    //#ifdef TRUNCATE_BLOCK
    //  /* Try to guess if it is profitable to stop the current block here */
    //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
    //    /* Compute an upper bound for the compressed length */
    //    out_length = s.last_lit*8;
    //    in_length = s.strstart - s.block_start;
    //
    //    for (dcode = 0; dcode < D_CODES; dcode++) {
    //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
    //    }
    //    out_length >>>= 3;
    //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
    //    //       s->last_lit, in_length, out_length,
    //    //       100L - out_length*100L/in_length));
    //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
    //      return true;
    //    }
    //  }
    //#endif


    return s.last_lit === s.lit_bufsize - 1;
    /* We avoid equality with lit_bufsize because of wraparound at 64K
     * on 16 bit machines and because stored blocks are restricted to
     * 64K-1 bytes.
     */
  };

  var _tr_init_1 = _tr_init$1;
  var _tr_stored_block_1 = _tr_stored_block$1;
  var _tr_flush_block_1 = _tr_flush_block$1;
  var _tr_tally_1 = _tr_tally$1;
  var _tr_align_1 = _tr_align$1;
  var trees = {
    _tr_init: _tr_init_1,
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: _tr_flush_block_1,
    _tr_tally: _tr_tally_1,
    _tr_align: _tr_align_1
  };

  // It isn't worth it to make additional optimizations as in original.
  // Small size is preferable.
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var adler32 = function adler32(adler, buf, len, pos) {
    var s1 = adler & 0xffff | 0,
        s2 = adler >>> 16 & 0xffff | 0,
        n = 0;

    while (len !== 0) {
      // Set limit ~ twice less than 5552, to keep
      // s2 in 31-bits, because we force signed ints.
      // in other case %= will fail.
      n = len > 2000 ? 2000 : len;
      len -= n;

      do {
        s1 = s1 + buf[pos++] | 0;
        s2 = s2 + s1 | 0;
      } while (--n);

      s1 %= 65521;
      s2 %= 65521;
    }

    return s1 | s2 << 16 | 0;
  };

  var adler32_1 = adler32;

  // So write code to minimize size - no pregenerated tables
  // and array tools dependencies.
  // (C) 1995-2013 Jean-loup Gailly and Mark Adler
  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.
  // Use ordinary array, since untyped makes no boost here

  var makeTable = function makeTable() {
    var c,
        table = [];

    for (var n = 0; n < 256; n++) {
      c = n;

      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
      }

      table[n] = c;
    }

    return table;
  }; // Create table on load. Just 255 signed longs. Not a problem.


  var crcTable = new Uint32Array(makeTable());

  var crc32 = function crc32(crc, buf, len, pos) {
    var t = crcTable;
    var end = pos + len;
    crc ^= -1;

    for (var i = pos; i < end; i++) {
      crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return crc ^ -1; // >>> 0;
  };

  var crc32_1 = crc32;

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var messages = {
    2: 'need dictionary',

    /* Z_NEED_DICT       2  */
    1: 'stream end',

    /* Z_STREAM_END      1  */
    0: '',

    /* Z_OK              0  */
    '-1': 'file error',

    /* Z_ERRNO         (-1) */
    '-2': 'stream error',

    /* Z_STREAM_ERROR  (-2) */
    '-3': 'data error',

    /* Z_DATA_ERROR    (-3) */
    '-4': 'insufficient memory',

    /* Z_MEM_ERROR     (-4) */
    '-5': 'buffer error',

    /* Z_BUF_ERROR     (-5) */
    '-6': 'incompatible version'
    /* Z_VERSION_ERROR (-6) */

  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var constants$2 = {
    /* Allowed flush values; see deflate() and inflate() below for details */
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,

    /* Return codes for the compression/decompression functions. Negative values
    * are errors, positive values are used for special but normal events.
    */
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    //Z_VERSION_ERROR: -6,

    /* compression levels */
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,

    /* Possible values of the data_type field (though see inflate()) */
    Z_BINARY: 0,
    Z_TEXT: 1,
    //Z_ASCII:                1, // = Z_TEXT (deprecated)
    Z_UNKNOWN: 2,

    /* The deflate compression method */
    Z_DEFLATED: 8 //Z_NULL:                 null // Use -1 or null inline, depending on var type

  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.


  var _tr_init = trees._tr_init,
      _tr_stored_block = trees._tr_stored_block,
      _tr_flush_block = trees._tr_flush_block,
      _tr_tally = trees._tr_tally,
      _tr_align = trees._tr_align;
  /* Public constants ==========================================================*/

  /* ===========================================================================*/

  var Z_NO_FLUSH$2 = constants$2.Z_NO_FLUSH,
      Z_PARTIAL_FLUSH = constants$2.Z_PARTIAL_FLUSH,
      Z_FULL_FLUSH$1 = constants$2.Z_FULL_FLUSH,
      Z_FINISH$3 = constants$2.Z_FINISH,
      Z_BLOCK$1 = constants$2.Z_BLOCK,
      Z_OK$3 = constants$2.Z_OK,
      Z_STREAM_END$3 = constants$2.Z_STREAM_END,
      Z_STREAM_ERROR$2 = constants$2.Z_STREAM_ERROR,
      Z_DATA_ERROR$2 = constants$2.Z_DATA_ERROR,
      Z_BUF_ERROR$1 = constants$2.Z_BUF_ERROR,
      Z_DEFAULT_COMPRESSION$1 = constants$2.Z_DEFAULT_COMPRESSION,
      Z_FILTERED = constants$2.Z_FILTERED,
      Z_HUFFMAN_ONLY = constants$2.Z_HUFFMAN_ONLY,
      Z_RLE = constants$2.Z_RLE,
      Z_FIXED = constants$2.Z_FIXED,
      Z_DEFAULT_STRATEGY$1 = constants$2.Z_DEFAULT_STRATEGY,
      Z_UNKNOWN = constants$2.Z_UNKNOWN,
      Z_DEFLATED$2 = constants$2.Z_DEFLATED;
  /*============================================================================*/

  var MAX_MEM_LEVEL = 9;
  /* Maximum value for memLevel in deflateInit2 */

  var MAX_WBITS$1 = 15;
  /* 32K LZ77 window */

  var DEF_MEM_LEVEL = 8;
  var LENGTH_CODES = 29;
  /* number of length codes, not counting the special END_BLOCK code */

  var LITERALS = 256;
  /* number of literal bytes 0..255 */

  var L_CODES = LITERALS + 1 + LENGTH_CODES;
  /* number of Literal or Length codes, including the END_BLOCK code */

  var D_CODES = 30;
  /* number of distance codes */

  var BL_CODES = 19;
  /* number of codes used to transfer the bit lengths */

  var HEAP_SIZE = 2 * L_CODES + 1;
  /* maximum heap size */

  var MAX_BITS = 15;
  /* All codes must not exceed MAX_BITS bits */

  var MIN_MATCH = 3;
  var MAX_MATCH = 258;
  var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
  var PRESET_DICT = 0x20;
  var INIT_STATE = 42;
  var EXTRA_STATE = 69;
  var NAME_STATE = 73;
  var COMMENT_STATE = 91;
  var HCRC_STATE = 103;
  var BUSY_STATE = 113;
  var FINISH_STATE = 666;
  var BS_NEED_MORE = 1;
  /* block not completed, need more input or more output */

  var BS_BLOCK_DONE = 2;
  /* block flush performed */

  var BS_FINISH_STARTED = 3;
  /* finish started, need only more output at next deflate */

  var BS_FINISH_DONE = 4;
  /* finish done, accept no more input or output */

  var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

  var err = function err(strm, errorCode) {
    strm.msg = messages[errorCode];
    return errorCode;
  };

  var rank = function rank(f) {
    return (f << 1) - (f > 4 ? 9 : 0);
  };

  var zero = function zero(buf) {
    var len = buf.length;

    while (--len >= 0) {
      buf[len] = 0;
    }
  };
  /* eslint-disable new-cap */


  var HASH_ZLIB = function HASH_ZLIB(s, prev, data) {
    return (prev << s.hash_shift ^ data) & s.hash_mask;
  }; // This hash causes less collisions, https://github.com/nodeca/pako/issues/135
  // But breaks binary compatibility
  //let HASH_FAST = (s, prev, data) => ((prev << 8) + (prev >> 8) + (data << 4)) & s.hash_mask;


  var HASH = HASH_ZLIB;
  /* =========================================================================
   * Flush as much pending output as possible. All deflate() output goes
   * through this function so some applications may wish to modify it
   * to avoid allocating a large strm->output buffer and copying into it.
   * (See also read_buf()).
   */

  var flush_pending = function flush_pending(strm) {
    var s = strm.state; //_tr_flush_bits(s);

    var len = s.pending;

    if (len > strm.avail_out) {
      len = strm.avail_out;
    }

    if (len === 0) {
      return;
    }

    strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
    strm.next_out += len;
    s.pending_out += len;
    strm.total_out += len;
    strm.avail_out -= len;
    s.pending -= len;

    if (s.pending === 0) {
      s.pending_out = 0;
    }
  };

  var flush_block_only = function flush_block_only(s, last) {
    _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);

    s.block_start = s.strstart;
    flush_pending(s.strm);
  };

  var put_byte = function put_byte(s, b) {
    s.pending_buf[s.pending++] = b;
  };
  /* =========================================================================
   * Put a short in the pending buffer. The 16-bit value is put in MSB order.
   * IN assertion: the stream state is correct and there is enough room in
   * pending_buf.
   */


  var putShortMSB = function putShortMSB(s, b) {
    //  put_byte(s, (Byte)(b >> 8));
    //  put_byte(s, (Byte)(b & 0xff));
    s.pending_buf[s.pending++] = b >>> 8 & 0xff;
    s.pending_buf[s.pending++] = b & 0xff;
  };
  /* ===========================================================================
   * Read a new buffer from the current input stream, update the adler32
   * and total number of bytes read.  All deflate() input goes through
   * this function so some applications may wish to modify it to avoid
   * allocating a large strm->input buffer and copying from it.
   * (See also flush_pending()).
   */


  var read_buf = function read_buf(strm, buf, start, size) {
    var len = strm.avail_in;

    if (len > size) {
      len = size;
    }

    if (len === 0) {
      return 0;
    }

    strm.avail_in -= len; // zmemcpy(buf, strm->next_in, len);

    buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);

    if (strm.state.wrap === 1) {
      strm.adler = adler32_1(strm.adler, buf, len, start);
    } else if (strm.state.wrap === 2) {
      strm.adler = crc32_1(strm.adler, buf, len, start);
    }

    strm.next_in += len;
    strm.total_in += len;
    return len;
  };
  /* ===========================================================================
   * Set match_start to the longest match starting at the given string and
   * return its length. Matches shorter or equal to prev_length are discarded,
   * in which case the result is equal to prev_length and match_start is
   * garbage.
   * IN assertions: cur_match is the head of the hash chain for the current
   *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
   * OUT assertion: the match length is not greater than s->lookahead.
   */


  var longest_match = function longest_match(s, cur_match) {
    var chain_length = s.max_chain_length;
    /* max hash chain length */

    var scan = s.strstart;
    /* current string */

    var match;
    /* matched string */

    var len;
    /* length of current match */

    var best_len = s.prev_length;
    /* best match length so far */

    var nice_match = s.nice_match;
    /* stop if match long enough */

    var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0
    /*NIL*/
    ;
    var _win = s.window; // shortcut

    var wmask = s.w_mask;
    var prev = s.prev;
    /* Stop when cur_match becomes <= limit. To simplify the code,
     * we prevent matches with the string of window index 0.
     */

    var strend = s.strstart + MAX_MATCH;
    var scan_end1 = _win[scan + best_len - 1];
    var scan_end = _win[scan + best_len];
    /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
     * It is easy to get rid of this optimization if necessary.
     */
    // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

    /* Do not waste too much time if we already have a good match: */

    if (s.prev_length >= s.good_match) {
      chain_length >>= 2;
    }
    /* Do not look for matches beyond the end of the input. This is necessary
     * to make deflate deterministic.
     */


    if (nice_match > s.lookahead) {
      nice_match = s.lookahead;
    } // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");


    do {
      // Assert(cur_match < s->strstart, "no future");
      match = cur_match;
      /* Skip to next match if the match length cannot increase
       * or if the match length is less than 2.  Note that the checks below
       * for insufficient lookahead only occur occasionally for performance
       * reasons.  Therefore uninitialized memory will be accessed, and
       * conditional jumps will be made that depend on those values.
       * However the length of the match is limited to the lookahead, so
       * the output of deflate is not affected by the uninitialized values.
       */

      if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
        continue;
      }
      /* The check at best_len-1 can be removed because it will be made
       * again later. (This heuristic is not always a win.)
       * It is not necessary to compare scan[2] and match[2] since they
       * are always equal when the other bytes match, given that
       * the hash keys are equal and that HASH_BITS >= 8.
       */


      scan += 2;
      match++; // Assert(*scan == *match, "match[2]?");

      /* We check for insufficient lookahead only every 8th comparison;
       * the 256th check will be made at strstart+258.
       */

      do {
        /*jshint noempty:false*/
      } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend); // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");


      len = MAX_MATCH - (strend - scan);
      scan = strend - MAX_MATCH;

      if (len > best_len) {
        s.match_start = cur_match;
        best_len = len;

        if (len >= nice_match) {
          break;
        }

        scan_end1 = _win[scan + best_len - 1];
        scan_end = _win[scan + best_len];
      }
    } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

    if (best_len <= s.lookahead) {
      return best_len;
    }

    return s.lookahead;
  };
  /* ===========================================================================
   * Fill the window when the lookahead becomes insufficient.
   * Updates strstart and lookahead.
   *
   * IN assertion: lookahead < MIN_LOOKAHEAD
   * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
   *    At least one byte has been read, or avail_in == 0; reads are
   *    performed for at least two bytes (required for the zip translate_eol
   *    option -- not supported here).
   */


  var fill_window = function fill_window(s) {
    var _w_size = s.w_size;
    var p, n, m, more, str; //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

    do {
      more = s.window_size - s.lookahead - s.strstart; // JS ints have 32 bit, block below not needed

      /* Deal with !@#$% 64K limit: */
      //if (sizeof(int) <= 2) {
      //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
      //        more = wsize;
      //
      //  } else if (more == (unsigned)(-1)) {
      //        /* Very unlikely, but possible on 16 bit machine if
      //         * strstart == 0 && lookahead == 1 (input done a byte at time)
      //         */
      //        more--;
      //    }
      //}

      /* If the window is almost full and there is insufficient lookahead,
       * move the upper half to the lower one to make room in the upper half.
       */

      if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
        s.window.set(s.window.subarray(_w_size, _w_size + _w_size), 0);
        s.match_start -= _w_size;
        s.strstart -= _w_size;
        /* we now have strstart >= MAX_DIST */

        s.block_start -= _w_size;
        /* Slide the hash table (could be avoided with 32 bit values
         at the expense of memory usage). We slide even when level == 0
         to keep the hash table consistent if we switch back to level > 0
         later. (Using level 0 permanently is not an optimal usage of
         zlib, so we don't care about this pathological case.)
         */

        n = s.hash_size;
        p = n;

        do {
          m = s.head[--p];
          s.head[p] = m >= _w_size ? m - _w_size : 0;
        } while (--n);

        n = _w_size;
        p = n;

        do {
          m = s.prev[--p];
          s.prev[p] = m >= _w_size ? m - _w_size : 0;
          /* If n is not on any hash chain, prev[n] is garbage but
           * its value will never be used.
           */
        } while (--n);

        more += _w_size;
      }

      if (s.strm.avail_in === 0) {
        break;
      }
      /* If there was no sliding:
       *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
       *    more == window_size - lookahead - strstart
       * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
       * => more >= window_size - 2*WSIZE + 2
       * In the BIG_MEM or MMAP case (not yet supported),
       *   window_size == input_size + MIN_LOOKAHEAD  &&
       *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
       * Otherwise, window_size == 2*WSIZE so more >= 2.
       * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
       */
      //Assert(more >= 2, "more < 2");


      n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
      s.lookahead += n;
      /* Initialize the hash value now that we have some input: */

      if (s.lookahead + s.insert >= MIN_MATCH) {
        str = s.strstart - s.insert;
        s.ins_h = s.window[str];
        /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */

        s.ins_h = HASH(s, s.ins_h, s.window[str + 1]); //#if MIN_MATCH != 3
        //        Call update_hash() MIN_MATCH-3 more times
        //#endif

        while (s.insert) {
          /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
          s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
          s.insert--;

          if (s.lookahead + s.insert < MIN_MATCH) {
            break;
          }
        }
      }
      /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
       * but this is not important since only literal bytes will be emitted.
       */

    } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    /* If the WIN_INIT bytes after the end of the current data have never been
     * written, then zero those bytes in order to avoid memory check reports of
     * the use of uninitialized (or uninitialised as Julian writes) bytes by
     * the longest match routines.  Update the high water mark for the next
     * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
     * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
     */
    //  if (s.high_water < s.window_size) {
    //    const curr = s.strstart + s.lookahead;
    //    let init = 0;
    //
    //    if (s.high_water < curr) {
    //      /* Previous high water mark below current data -- zero WIN_INIT
    //       * bytes or up to end of window, whichever is less.
    //       */
    //      init = s.window_size - curr;
    //      if (init > WIN_INIT)
    //        init = WIN_INIT;
    //      zmemzero(s->window + curr, (unsigned)init);
    //      s->high_water = curr + init;
    //    }
    //    else if (s->high_water < (ulg)curr + WIN_INIT) {
    //      /* High water mark at or above current data, but below current data
    //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
    //       * to end of window, whichever is less.
    //       */
    //      init = (ulg)curr + WIN_INIT - s->high_water;
    //      if (init > s->window_size - s->high_water)
    //        init = s->window_size - s->high_water;
    //      zmemzero(s->window + s->high_water, (unsigned)init);
    //      s->high_water += init;
    //    }
    //  }
    //
    //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
    //    "not enough room for search");

  };
  /* ===========================================================================
   * Copy without compression as much as possible from the input stream, return
   * the current block state.
   * This function does not insert new strings in the dictionary since
   * uncompressible data is probably not useful. This function is used
   * only for the level=0 compression option.
   * NOTE: this function should be optimized to avoid extra copying from
   * window to pending_buf.
   */


  var deflate_stored = function deflate_stored(s, flush) {
    /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
     * to pending_buf_size, and each stored block has a 5 byte header:
     */
    var max_block_size = 0xffff;

    if (max_block_size > s.pending_buf_size - 5) {
      max_block_size = s.pending_buf_size - 5;
    }
    /* Copy as much as possible from input to output: */


    for (;;) {
      /* Fill the window as much as possible: */
      if (s.lookahead <= 1) {
        //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
        //  s->block_start >= (long)s->w_size, "slide too late");
        //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
        //        s.block_start >= s.w_size)) {
        //        throw  new Error("slide too late");
        //      }
        fill_window(s);

        if (s.lookahead === 0 && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */

      } //Assert(s->block_start >= 0L, "block gone");
      //    if (s.block_start < 0) throw new Error("block gone");


      s.strstart += s.lookahead;
      s.lookahead = 0;
      /* Emit a stored block if pending_buf will be full: */

      var max_start = s.block_start + max_block_size;

      if (s.strstart === 0 || s.strstart >= max_start) {
        /* strstart == 0 is possible when wraparound on 16-bit machine */
        s.lookahead = s.strstart - max_start;
        s.strstart = max_start;
        /*** FLUSH_BLOCK(s, 0); ***/

        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
      /* Flush if we may have to slide, otherwise block_start may become
       * negative and the data will be gone:
       */


      if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
    }

    s.insert = 0;

    if (flush === Z_FINISH$3) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);

      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/


      return BS_FINISH_DONE;
    }

    if (s.strstart > s.block_start) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }

    return BS_NEED_MORE;
  };
  /* ===========================================================================
   * Compress as much as possible from the input stream, return the current
   * block state.
   * This function does not perform lazy evaluation of matches and inserts
   * new strings in the dictionary only for unmatched strings or for short
   * matches. It is used only for the fast compression options.
   */


  var deflate_fast = function deflate_fast(s, flush) {
    var hash_head;
    /* head of the hash chain */

    var bflush;
    /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);

        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
          /* flush the current block */
        }
      }
      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */


      hash_head = 0
      /*NIL*/
      ;

      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }
      /* Find the longest match, discarding those <= prev_length.
       * At this point we have always match_length < MIN_MATCH
       */


      if (hash_head !== 0
      /*NIL*/
      && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */
      }

      if (s.match_length >= MIN_MATCH) {
        // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

        /*** _tr_tally_dist(s, s.strstart - s.match_start,
                       s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        /* Insert new strings in the hash table only if the match length
         * is not too large. This saves time but degrades compression.
         */

        if (s.match_length <= s.max_lazy_match
        /*max_insert_length*/
        && s.lookahead >= MIN_MATCH) {
          s.match_length--;
          /* string at strstart already in table */

          do {
            s.strstart++;
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/

            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/

            /* strstart never exceeds WSIZE-MAX_MATCH, so there are
             * always MIN_MATCH bytes ahead.
             */
          } while (--s.match_length !== 0);

          s.strstart++;
        } else {
          s.strstart += s.match_length;
          s.match_length = 0;
          s.ins_h = s.window[s.strstart];
          /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */

          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]); //#if MIN_MATCH != 3
          //                Call UPDATE_HASH() MIN_MATCH-3 more times
          //#endif

          /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
           * matter since it will be recomputed at next deflate call.
           */
        }
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s.window[s.strstart]));

        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
    }

    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;

    if (flush === Z_FINISH$3) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);

      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/


      return BS_FINISH_DONE;
    }

    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }

    return BS_BLOCK_DONE;
  };
  /* ===========================================================================
   * Same as above, but achieves better compression. We use a lazy
   * evaluation for matches: a match is finally adopted only if there is
   * no better match at the next window position.
   */


  var deflate_slow = function deflate_slow(s, flush) {
    var hash_head;
    /* head of hash chain */

    var bflush;
    /* set if current block must be flushed */

    var max_insert;
    /* Process the input block. */

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the next match, plus MIN_MATCH bytes to insert the
       * string following the next match.
       */
      if (s.lookahead < MIN_LOOKAHEAD) {
        fill_window(s);

        if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */

      }
      /* Insert the string window[strstart .. strstart+2] in the
       * dictionary, and set hash_head to the head of the hash chain:
       */


      hash_head = 0
      /*NIL*/
      ;

      if (s.lookahead >= MIN_MATCH) {
        /*** INSERT_STRING(s, s.strstart, hash_head); ***/
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
        hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = s.strstart;
        /***/
      }
      /* Find the longest match, discarding those <= prev_length.
       */


      s.prev_length = s.match_length;
      s.prev_match = s.match_start;
      s.match_length = MIN_MATCH - 1;

      if (hash_head !== 0
      /*NIL*/
      && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD
      /*MAX_DIST(s)*/
      ) {
        /* To simplify the code, we prevent matches with the string
         * of window index 0 (in particular we have to avoid a match
         * of the string with itself at the start of the input file).
         */
        s.match_length = longest_match(s, hash_head);
        /* longest_match() sets match_start */

        if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096
        /*TOO_FAR*/
        )) {
          /* If prev_match is also MIN_MATCH, match_start is garbage
           * but we will ignore the current match anyway.
           */
          s.match_length = MIN_MATCH - 1;
        }
      }
      /* If there was a match at the previous step and the current
       * match is not better, output the previous match:
       */


      if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
        max_insert = s.strstart + s.lookahead - MIN_MATCH;
        /* Do not insert strings in hash table beyond this. */
        //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

        /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                       s.prev_length - MIN_MATCH, bflush);***/

        bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
        /* Insert in hash table all strings up to the end of the match.
         * strstart-1 and strstart are already inserted. If there is not
         * enough lookahead, the last two strings are not inserted in
         * the hash table.
         */

        s.lookahead -= s.prev_length - 1;
        s.prev_length -= 2;

        do {
          if (++s.strstart <= max_insert) {
            /*** INSERT_STRING(s, s.strstart, hash_head); ***/
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
            /***/
          }
        } while (--s.prev_length !== 0);

        s.match_available = 0;
        s.match_length = MIN_MATCH - 1;
        s.strstart++;

        if (bflush) {
          /*** FLUSH_BLOCK(s, 0); ***/
          flush_block_only(s, false);

          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
          /***/

        }
      } else if (s.match_available) {
        /* If there was no match at the previous position, output a
         * single literal. If there was a match but the current match
         * is longer, truncate the previous match to a single literal.
         */
        //Tracevv((stderr,"%c", s->window[s->strstart-1]));

        /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

        if (bflush) {
          /*** FLUSH_BLOCK_ONLY(s, 0) ***/
          flush_block_only(s, false);
          /***/
        }

        s.strstart++;
        s.lookahead--;

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      } else {
        /* There is no previous match to compare with, wait for
         * the next step to decide.
         */
        s.match_available = 1;
        s.strstart++;
        s.lookahead--;
      }
    } //Assert (flush != Z_NO_FLUSH, "no flush?");


    if (s.match_available) {
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));

      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      s.match_available = 0;
    }

    s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;

    if (flush === Z_FINISH$3) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);

      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/


      return BS_FINISH_DONE;
    }

    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }

    return BS_BLOCK_DONE;
  };
  /* ===========================================================================
   * For Z_RLE, simply look for runs of bytes, generate matches only of distance
   * one.  Do not maintain a hash table.  (It will be regenerated if this run of
   * deflate switches away from Z_RLE.)
   */


  var deflate_rle = function deflate_rle(s, flush) {
    var bflush;
    /* set if current block must be flushed */

    var prev;
    /* byte at distance one to match */

    var scan, strend;
    /* scan goes up to strend for length of run */

    var _win = s.window;

    for (;;) {
      /* Make sure that we always have enough lookahead, except
       * at the end of the input file. We need MAX_MATCH bytes
       * for the longest run, plus one for the unrolled loop.
       */
      if (s.lookahead <= MAX_MATCH) {
        fill_window(s);

        if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }

        if (s.lookahead === 0) {
          break;
        }
        /* flush the current block */

      }
      /* See how many times the previous byte repeats */


      s.match_length = 0;

      if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
        scan = s.strstart - 1;
        prev = _win[scan];

        if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
          strend = s.strstart + MAX_MATCH;

          do {
            /*jshint noempty:false*/
          } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);

          s.match_length = MAX_MATCH - (strend - scan);

          if (s.match_length > s.lookahead) {
            s.match_length = s.lookahead;
          }
        } //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");

      }
      /* Emit match if have run of MIN_MATCH or longer, else emit literal */


      if (s.match_length >= MIN_MATCH) {
        //check_match(s, s.strstart, s.strstart - 1, s.match_length);

        /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
        bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
        s.lookahead -= s.match_length;
        s.strstart += s.match_length;
        s.match_length = 0;
      } else {
        /* No match, output a literal byte */
        //Tracevv((stderr,"%c", s->window[s->strstart]));

        /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
      }

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
    }

    s.insert = 0;

    if (flush === Z_FINISH$3) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);

      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/


      return BS_FINISH_DONE;
    }

    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }

    return BS_BLOCK_DONE;
  };
  /* ===========================================================================
   * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
   * (It will be regenerated if this run of deflate switches away from Huffman.)
   */


  var deflate_huff = function deflate_huff(s, flush) {
    var bflush;
    /* set if current block must be flushed */

    for (;;) {
      /* Make sure that we have a literal to write. */
      if (s.lookahead === 0) {
        fill_window(s);

        if (s.lookahead === 0) {
          if (flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }

          break;
          /* flush the current block */
        }
      }
      /* Output a literal byte */


      s.match_length = 0; //Tracevv((stderr,"%c", s->window[s->strstart]));

      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/

      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);

        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/

      }
    }

    s.insert = 0;

    if (flush === Z_FINISH$3) {
      /*** FLUSH_BLOCK(s, 1); ***/
      flush_block_only(s, true);

      if (s.strm.avail_out === 0) {
        return BS_FINISH_STARTED;
      }
      /***/


      return BS_FINISH_DONE;
    }

    if (s.last_lit) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);

      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/

    }

    return BS_BLOCK_DONE;
  };
  /* Values for max_lazy_match, good_match and max_chain_length, depending on
   * the desired pack level (0..9). The values given below have been tuned to
   * exclude worst case performance for pathological files. Better values may be
   * found for specific files.
   */


  function Config(good_length, max_lazy, nice_length, max_chain, func) {
    this.good_length = good_length;
    this.max_lazy = max_lazy;
    this.nice_length = nice_length;
    this.max_chain = max_chain;
    this.func = func;
  }

  var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
  ];
  /* ===========================================================================
   * Initialize the "longest match" routines for a new zlib stream
   */

  var lm_init = function lm_init(s) {
    s.window_size = 2 * s.w_size;
    /*** CLEAR_HASH(s); ***/

    zero(s.head); // Fill with NIL (= 0);

    /* Set the default configuration parameters:
     */

    s.max_lazy_match = configuration_table[s.level].max_lazy;
    s.good_match = configuration_table[s.level].good_length;
    s.nice_match = configuration_table[s.level].nice_length;
    s.max_chain_length = configuration_table[s.level].max_chain;
    s.strstart = 0;
    s.block_start = 0;
    s.lookahead = 0;
    s.insert = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    s.ins_h = 0;
  };

  function DeflateState() {
    this.strm = null;
    /* pointer back to this zlib stream */

    this.status = 0;
    /* as the name implies */

    this.pending_buf = null;
    /* output still pending */

    this.pending_buf_size = 0;
    /* size of pending_buf */

    this.pending_out = 0;
    /* next pending byte to output to the stream */

    this.pending = 0;
    /* nb of bytes in the pending buffer */

    this.wrap = 0;
    /* bit 0 true for zlib, bit 1 true for gzip */

    this.gzhead = null;
    /* gzip header information to write */

    this.gzindex = 0;
    /* where in extra, name, or comment */

    this.method = Z_DEFLATED$2;
    /* can only be DEFLATED */

    this.last_flush = -1;
    /* value of flush param for previous deflate call */

    this.w_size = 0;
    /* LZ77 window size (32K by default) */

    this.w_bits = 0;
    /* log2(w_size)  (8..16) */

    this.w_mask = 0;
    /* w_size - 1 */

    this.window = null;
    /* Sliding window. Input bytes are read into the second half of the window,
     * and move to the first half later to keep a dictionary of at least wSize
     * bytes. With this organization, matches are limited to a distance of
     * wSize-MAX_MATCH bytes, but this ensures that IO is always
     * performed with a length multiple of the block size.
     */

    this.window_size = 0;
    /* Actual size of window: 2*wSize, except when the user input buffer
     * is directly used as sliding window.
     */

    this.prev = null;
    /* Link to older string with same hash index. To limit the size of this
     * array to 64K, this link is maintained only for the last 32K strings.
     * An index in this array is thus a window index modulo 32K.
     */

    this.head = null;
    /* Heads of the hash chains or NIL. */

    this.ins_h = 0;
    /* hash index of string to be inserted */

    this.hash_size = 0;
    /* number of elements in hash table */

    this.hash_bits = 0;
    /* log2(hash_size) */

    this.hash_mask = 0;
    /* hash_size-1 */

    this.hash_shift = 0;
    /* Number of bits by which ins_h must be shifted at each input
     * step. It must be such that after MIN_MATCH steps, the oldest
     * byte no longer takes part in the hash key, that is:
     *   hash_shift * MIN_MATCH >= hash_bits
     */

    this.block_start = 0;
    /* Window position at the beginning of the current output block. Gets
     * negative when the window is moved backwards.
     */

    this.match_length = 0;
    /* length of best match */

    this.prev_match = 0;
    /* previous match */

    this.match_available = 0;
    /* set if previous match exists */

    this.strstart = 0;
    /* start of string to insert */

    this.match_start = 0;
    /* start of matching string */

    this.lookahead = 0;
    /* number of valid bytes ahead in window */

    this.prev_length = 0;
    /* Length of the best match at previous step. Matches not greater than this
     * are discarded. This is used in the lazy match evaluation.
     */

    this.max_chain_length = 0;
    /* To speed up deflation, hash chains are never searched beyond this
     * length.  A higher limit improves compression ratio but degrades the
     * speed.
     */

    this.max_lazy_match = 0;
    /* Attempt to find a better match only when the current match is strictly
     * smaller than this value. This mechanism is used only for compression
     * levels >= 4.
     */
    // That's alias to max_lazy_match, don't use directly
    //this.max_insert_length = 0;

    /* Insert new strings in the hash table only if the match length is not
     * greater than this length. This saves time but degrades compression.
     * max_insert_length is used only for compression levels <= 3.
     */

    this.level = 0;
    /* compression level (1..9) */

    this.strategy = 0;
    /* favor or force Huffman coding*/

    this.good_match = 0;
    /* Use a faster search when the previous match is longer than this */

    this.nice_match = 0;
    /* Stop searching when current match exceeds this */

    /* used by trees.c: */

    /* Didn't use ct_data typedef below to suppress compiler warning */
    // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
    // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
    // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */
    // Use flat array of DOUBLE size, with interleaved fata,
    // because JS does not support effective

    this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
    this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
    this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
    zero(this.dyn_ltree);
    zero(this.dyn_dtree);
    zero(this.bl_tree);
    this.l_desc = null;
    /* desc. for literal tree */

    this.d_desc = null;
    /* desc. for distance tree */

    this.bl_desc = null;
    /* desc. for bit length tree */
    //ush bl_count[MAX_BITS+1];

    this.bl_count = new Uint16Array(MAX_BITS + 1);
    /* number of codes at each bit length for an optimal tree */
    //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */

    this.heap = new Uint16Array(2 * L_CODES + 1);
    /* heap used to build the Huffman trees */

    zero(this.heap);
    this.heap_len = 0;
    /* number of elements in the heap */

    this.heap_max = 0;
    /* element of largest frequency */

    /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
     * The same heap array is used to build all trees.
     */

    this.depth = new Uint16Array(2 * L_CODES + 1); //uch depth[2*L_CODES+1];

    zero(this.depth);
    /* Depth of each subtree used as tie breaker for trees of equal frequency
     */

    this.l_buf = 0;
    /* buffer index for literals or lengths */

    this.lit_bufsize = 0;
    /* Size of match buffer for literals/lengths.  There are 4 reasons for
     * limiting lit_bufsize to 64K:
     *   - frequencies can be kept in 16 bit counters
     *   - if compression is not successful for the first block, all input
     *     data is still in the window so we can still emit a stored block even
     *     when input comes from standard input.  (This can also be done for
     *     all blocks if lit_bufsize is not greater than 32K.)
     *   - if compression is not successful for a file smaller than 64K, we can
     *     even emit a stored file instead of a stored block (saving 5 bytes).
     *     This is applicable only for zip (not gzip or zlib).
     *   - creating new Huffman trees less frequently may not provide fast
     *     adaptation to changes in the input data statistics. (Take for
     *     example a binary file with poorly compressible code followed by
     *     a highly compressible string table.) Smaller buffer sizes give
     *     fast adaptation but have of course the overhead of transmitting
     *     trees more frequently.
     *   - I can't count above 4
     */

    this.last_lit = 0;
    /* running index in l_buf */

    this.d_buf = 0;
    /* Buffer index for distances. To simplify the code, d_buf and l_buf have
     * the same number of elements. To use different lengths, an extra flag
     * array would be necessary.
     */

    this.opt_len = 0;
    /* bit length of current block with optimal trees */

    this.static_len = 0;
    /* bit length of current block with static trees */

    this.matches = 0;
    /* number of string matches in current block */

    this.insert = 0;
    /* bytes at end of window left to insert */

    this.bi_buf = 0;
    /* Output buffer. bits are inserted starting at the bottom (least
     * significant bits).
     */

    this.bi_valid = 0;
    /* Number of valid bits in bi_buf.  All bits above the last valid bit
     * are always zero.
     */
    // Used for window memory init. We safely ignore it for JS. That makes
    // sense only for pointers and memory check tools.
    //this.high_water = 0;

    /* High water mark offset in window for initialized bytes -- bytes above
     * this are set to zero in order to avoid memory check warnings when
     * longest match routines access bytes past the input.  This is then
     * updated to the new high water mark.
     */
  }

  var deflateResetKeep = function deflateResetKeep(strm) {
    if (!strm || !strm.state) {
      return err(strm, Z_STREAM_ERROR$2);
    }

    strm.total_in = strm.total_out = 0;
    strm.data_type = Z_UNKNOWN;
    var s = strm.state;
    s.pending = 0;
    s.pending_out = 0;

    if (s.wrap < 0) {
      s.wrap = -s.wrap;
      /* was made negative by deflate(..., Z_FINISH); */
    }

    s.status = s.wrap ? INIT_STATE : BUSY_STATE;
    strm.adler = s.wrap === 2 ? 0 // crc32(0, Z_NULL, 0)
    : 1; // adler32(0, Z_NULL, 0)

    s.last_flush = Z_NO_FLUSH$2;

    _tr_init(s);

    return Z_OK$3;
  };

  var deflateReset = function deflateReset(strm) {
    var ret = deflateResetKeep(strm);

    if (ret === Z_OK$3) {
      lm_init(strm.state);
    }

    return ret;
  };

  var deflateSetHeader = function deflateSetHeader(strm, head) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$2;
    }

    if (strm.state.wrap !== 2) {
      return Z_STREAM_ERROR$2;
    }

    strm.state.gzhead = head;
    return Z_OK$3;
  };

  var deflateInit2 = function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
    if (!strm) {
      // === Z_NULL
      return Z_STREAM_ERROR$2;
    }

    var wrap = 1;

    if (level === Z_DEFAULT_COMPRESSION$1) {
      level = 6;
    }

    if (windowBits < 0) {
      /* suppress zlib wrapper */
      wrap = 0;
      windowBits = -windowBits;
    } else if (windowBits > 15) {
      wrap = 2;
      /* write gzip wrapper instead */

      windowBits -= 16;
    }

    if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
      return err(strm, Z_STREAM_ERROR$2);
    }

    if (windowBits === 8) {
      windowBits = 9;
    }
    /* until 256-byte window bug fixed */


    var s = new DeflateState();
    strm.state = s;
    s.strm = strm;
    s.wrap = wrap;
    s.gzhead = null;
    s.w_bits = windowBits;
    s.w_size = 1 << s.w_bits;
    s.w_mask = s.w_size - 1;
    s.hash_bits = memLevel + 7;
    s.hash_size = 1 << s.hash_bits;
    s.hash_mask = s.hash_size - 1;
    s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
    s.window = new Uint8Array(s.w_size * 2);
    s.head = new Uint16Array(s.hash_size);
    s.prev = new Uint16Array(s.w_size); // Don't need mem init magic for JS.
    //s.high_water = 0;  /* nothing written to s->window yet */

    s.lit_bufsize = 1 << memLevel + 6;
    /* 16K elements by default */

    s.pending_buf_size = s.lit_bufsize * 4; //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
    //s->pending_buf = (uchf *) overlay;

    s.pending_buf = new Uint8Array(s.pending_buf_size); // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
    //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);

    s.d_buf = 1 * s.lit_bufsize; //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;

    s.l_buf = (1 + 2) * s.lit_bufsize;
    s.level = level;
    s.strategy = strategy;
    s.method = method;
    return deflateReset(strm);
  };

  var deflateInit = function deflateInit(strm, level) {
    return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
  };

  var deflate$2 = function deflate(strm, flush) {
    var beg, val; // for gzip header write only

    if (!strm || !strm.state || flush > Z_BLOCK$1 || flush < 0) {
      return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    }

    var s = strm.state;

    if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
      return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
    }

    s.strm = strm;
    /* just in case */

    var old_flush = s.last_flush;
    s.last_flush = flush;
    /* Write the header */

    if (s.status === INIT_STATE) {
      if (s.wrap === 2) {
        // GZIP header
        strm.adler = 0; //crc32(0L, Z_NULL, 0);

        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);

        if (!s.gzhead) {
          // s->gzhead == Z_NULL
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
        } else {
          put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
          put_byte(s, s.gzhead.time & 0xff);
          put_byte(s, s.gzhead.time >> 8 & 0xff);
          put_byte(s, s.gzhead.time >> 16 & 0xff);
          put_byte(s, s.gzhead.time >> 24 & 0xff);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 0xff);

          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 0xff);
            put_byte(s, s.gzhead.extra.length >> 8 & 0xff);
          }

          if (s.gzhead.hcrc) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
          }

          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      } else // DEFLATE header
        {
          var header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
          var level_flags = -1;

          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }

          header |= level_flags << 6;

          if (s.strstart !== 0) {
            header |= PRESET_DICT;
          }

          header += 31 - header % 31;
          s.status = BUSY_STATE;
          putShortMSB(s, header);
          /* Save the adler32 of the preset dictionary: */

          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 0xffff);
          }

          strm.adler = 1; // adler32(0L, Z_NULL, 0);
        }
    } //#ifdef GZIP


    if (s.status === EXTRA_STATE) {
      if (s.gzhead.extra
      /* != Z_NULL*/
      ) {
        beg = s.pending;
        /* start of bytes to update crc */

        while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              break;
            }
          }

          put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
          s.gzindex++;
        }

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (s.gzindex === s.gzhead.extra.length) {
          s.gzindex = 0;
          s.status = NAME_STATE;
        }
      } else {
        s.status = NAME_STATE;
      }
    }

    if (s.status === NAME_STATE) {
      if (s.gzhead.name
      /* != Z_NULL*/
      ) {
        beg = s.pending;
        /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          } // JS specific: little magic to add zero terminator to end of string


          if (s.gzindex < s.gzhead.name.length) {
            val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }

          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (val === 0) {
          s.gzindex = 0;
          s.status = COMMENT_STATE;
        }
      } else {
        s.status = COMMENT_STATE;
      }
    }

    if (s.status === COMMENT_STATE) {
      if (s.gzhead.comment
      /* != Z_NULL*/
      ) {
        beg = s.pending;
        /* start of bytes to update crc */
        //int val;

        do {
          if (s.pending === s.pending_buf_size) {
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }

            flush_pending(strm);
            beg = s.pending;

            if (s.pending === s.pending_buf_size) {
              val = 1;
              break;
            }
          } // JS specific: little magic to add zero terminator to end of string


          if (s.gzindex < s.gzhead.comment.length) {
            val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
          } else {
            val = 0;
          }

          put_byte(s, val);
        } while (val !== 0);

        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }

        if (val === 0) {
          s.status = HCRC_STATE;
        }
      } else {
        s.status = HCRC_STATE;
      }
    }

    if (s.status === HCRC_STATE) {
      if (s.gzhead.hcrc) {
        if (s.pending + 2 > s.pending_buf_size) {
          flush_pending(strm);
        }

        if (s.pending + 2 <= s.pending_buf_size) {
          put_byte(s, strm.adler & 0xff);
          put_byte(s, strm.adler >> 8 & 0xff);
          strm.adler = 0; //crc32(0L, Z_NULL, 0);

          s.status = BUSY_STATE;
        }
      } else {
        s.status = BUSY_STATE;
      }
    } //#endif

    /* Flush as much pending output as possible */


    if (s.pending !== 0) {
      flush_pending(strm);

      if (strm.avail_out === 0) {
        /* Since avail_out is 0, deflate will be called again with
         * more output space, but possibly with both pending and
         * avail_in equal to zero. There won't be anything to do,
         * but this is not an error situation so make sure we
         * return OK instead of BUF_ERROR at next call of deflate:
         */
        s.last_flush = -1;
        return Z_OK$3;
      }
      /* Make sure there is something to do and avoid duplicate consecutive
       * flushes. For repeated and useless calls with Z_FINISH, we keep
       * returning Z_STREAM_END instead of Z_BUF_ERROR.
       */

    } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
      return err(strm, Z_BUF_ERROR$1);
    }
    /* User must not provide more input after the first FINISH: */


    if (s.status === FINISH_STATE && strm.avail_in !== 0) {
      return err(strm, Z_BUF_ERROR$1);
    }
    /* Start a new block or continue the current one.
     */


    if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
      var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);

      if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
        s.status = FINISH_STATE;
      }

      if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          /* avoid BUF_ERROR next call, see above */
        }

        return Z_OK$3;
        /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
         * of deflate should use the same flush parameter to make sure
         * that the flush is complete. So we don't have to output an
         * empty block here, this will be done at next call. This also
         * ensures that for a very small output buffer, we emit at most
         * one empty block.
         */
      }

      if (bstate === BS_BLOCK_DONE) {
        if (flush === Z_PARTIAL_FLUSH) {
          _tr_align(s);
        } else if (flush !== Z_BLOCK$1) {
          /* FULL_FLUSH or SYNC_FLUSH */
          _tr_stored_block(s, 0, 0, false);
          /* For a full flush, this empty block will be recognized
           * as a special marker by inflate_sync().
           */


          if (flush === Z_FULL_FLUSH$1) {
            /*** CLEAR_HASH(s); ***/

            /* forget history */
            zero(s.head); // Fill with NIL (= 0);

            if (s.lookahead === 0) {
              s.strstart = 0;
              s.block_start = 0;
              s.insert = 0;
            }
          }
        }

        flush_pending(strm);

        if (strm.avail_out === 0) {
          s.last_flush = -1;
          /* avoid BUF_ERROR at next call, see above */

          return Z_OK$3;
        }
      }
    } //Assert(strm->avail_out > 0, "bug2");
    //if (strm.avail_out <= 0) { throw new Error("bug2");}


    if (flush !== Z_FINISH$3) {
      return Z_OK$3;
    }

    if (s.wrap <= 0) {
      return Z_STREAM_END$3;
    }
    /* Write the trailer */


    if (s.wrap === 2) {
      put_byte(s, strm.adler & 0xff);
      put_byte(s, strm.adler >> 8 & 0xff);
      put_byte(s, strm.adler >> 16 & 0xff);
      put_byte(s, strm.adler >> 24 & 0xff);
      put_byte(s, strm.total_in & 0xff);
      put_byte(s, strm.total_in >> 8 & 0xff);
      put_byte(s, strm.total_in >> 16 & 0xff);
      put_byte(s, strm.total_in >> 24 & 0xff);
    } else {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 0xffff);
    }

    flush_pending(strm);
    /* If avail_out is zero, the application will call deflate again
     * to flush the rest.
     */

    if (s.wrap > 0) {
      s.wrap = -s.wrap;
    }
    /* write the trailer only once! */


    return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
  };

  var deflateEnd = function deflateEnd(strm) {
    if (!strm
    /*== Z_NULL*/
    || !strm.state
    /*== Z_NULL*/
    ) {
      return Z_STREAM_ERROR$2;
    }

    var status = strm.state.status;

    if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
      return err(strm, Z_STREAM_ERROR$2);
    }

    strm.state = null;
    return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
  };
  /* =========================================================================
   * Initializes the compression dictionary from the given byte
   * sequence without producing any compressed output.
   */


  var deflateSetDictionary = function deflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;

    if (!strm
    /*== Z_NULL*/
    || !strm.state
    /*== Z_NULL*/
    ) {
      return Z_STREAM_ERROR$2;
    }

    var s = strm.state;
    var wrap = s.wrap;

    if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
      return Z_STREAM_ERROR$2;
    }
    /* when using zlib wrappers, compute Adler-32 for provided dictionary */


    if (wrap === 1) {
      /* adler32(strm->adler, dictionary, dictLength); */
      strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
    }

    s.wrap = 0;
    /* avoid computing Adler-32 in read_buf */

    /* if dictionary would fill window, just replace the history */

    if (dictLength >= s.w_size) {
      if (wrap === 0) {
        /* already empty otherwise */

        /*** CLEAR_HASH(s); ***/
        zero(s.head); // Fill with NIL (= 0);

        s.strstart = 0;
        s.block_start = 0;
        s.insert = 0;
      }
      /* use the tail */
      // dictionary = dictionary.slice(dictLength - s.w_size);


      var tmpDict = new Uint8Array(s.w_size);
      tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
      dictionary = tmpDict;
      dictLength = s.w_size;
    }
    /* insert dictionary into window and hash */


    var avail = strm.avail_in;
    var next = strm.next_in;
    var input = strm.input;
    strm.avail_in = dictLength;
    strm.next_in = 0;
    strm.input = dictionary;
    fill_window(s);

    while (s.lookahead >= MIN_MATCH) {
      var str = s.strstart;
      var n = s.lookahead - (MIN_MATCH - 1);

      do {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
      } while (--n);

      s.strstart = str;
      s.lookahead = MIN_MATCH - 1;
      fill_window(s);
    }

    s.strstart += s.lookahead;
    s.block_start = s.strstart;
    s.insert = s.lookahead;
    s.lookahead = 0;
    s.match_length = s.prev_length = MIN_MATCH - 1;
    s.match_available = 0;
    strm.next_in = next;
    strm.input = input;
    strm.avail_in = avail;
    s.wrap = wrap;
    return Z_OK$3;
  };

  var deflateInit_1 = deflateInit;
  var deflateInit2_1 = deflateInit2;
  var deflateReset_1 = deflateReset;
  var deflateResetKeep_1 = deflateResetKeep;
  var deflateSetHeader_1 = deflateSetHeader;
  var deflate_2$1 = deflate$2;
  var deflateEnd_1 = deflateEnd;
  var deflateSetDictionary_1 = deflateSetDictionary;
  var deflateInfo = 'pako deflate (from Nodeca project)';
  /* Not implemented
  module.exports.deflateBound = deflateBound;
  module.exports.deflateCopy = deflateCopy;
  module.exports.deflateParams = deflateParams;
  module.exports.deflatePending = deflatePending;
  module.exports.deflatePrime = deflatePrime;
  module.exports.deflateTune = deflateTune;
  */

  var deflate_1$2 = {
    deflateInit: deflateInit_1,
    deflateInit2: deflateInit2_1,
    deflateReset: deflateReset_1,
    deflateResetKeep: deflateResetKeep_1,
    deflateSetHeader: deflateSetHeader_1,
    deflate: deflate_2$1,
    deflateEnd: deflateEnd_1,
    deflateSetDictionary: deflateSetDictionary_1,
    deflateInfo: deflateInfo
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var _has = function _has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };

  var assign = function assign(obj
  /*from1, from2, from3, ...*/
  ) {
    var sources = Array.prototype.slice.call(arguments, 1);

    while (sources.length) {
      var source = sources.shift();

      if (!source) {
        continue;
      }

      if (_typeof(source) !== 'object') {
        throw new TypeError(source + 'must be non-object');
      }

      for (var p in source) {
        if (_has(source, p)) {
          obj[p] = source[p];
        }
      }
    }

    return obj;
  }; // Join array of chunks to single array.


  var flattenChunks = function flattenChunks(chunks) {
    // calculate data length
    var len = 0;

    for (var i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    } // join chunks


    var result = new Uint8Array(len);

    for (var _i = 0, pos = 0, _l = chunks.length; _i < _l; _i++) {
      var chunk = chunks[_i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  };

  var common = {
    assign: assign,
    flattenChunks: flattenChunks
  };

  // String encode/decode helpers
  //
  // - apply(Array) can fail on Android 2.2
  // - apply(Uint8Array) can fail on iOS 5.1 Safari
  //

  var STR_APPLY_UIA_OK = true;

  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch (__) {
    STR_APPLY_UIA_OK = false;
  } // Table with utf8 lengths (calculated by first byte of sequence)
  // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
  // because max possible codepoint is 0x10ffff


  var _utf8len = new Uint8Array(256);

  for (var q = 0; q < 256; q++) {
    _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  }

  _utf8len[254] = _utf8len[254] = 1; // Invalid sequence start
  // convert string to array (typed, when possible)

  var string2buf = function string2buf(str) {
    if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
      return new TextEncoder().encode(str);
    }

    var buf,
        c,
        c2,
        m_pos,
        i,
        str_len = str.length,
        buf_len = 0; // count binary size

    for (m_pos = 0; m_pos < str_len; m_pos++) {
      c = str.charCodeAt(m_pos);

      if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);

        if ((c2 & 0xfc00) === 0xdc00) {
          c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
          m_pos++;
        }
      }

      buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    } // allocate buffer


    buf = new Uint8Array(buf_len); // convert

    for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
      c = str.charCodeAt(m_pos);

      if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
        c2 = str.charCodeAt(m_pos + 1);

        if ((c2 & 0xfc00) === 0xdc00) {
          c = 0x10000 + (c - 0xd800 << 10) + (c2 - 0xdc00);
          m_pos++;
        }
      }

      if (c < 0x80) {
        /* one byte */
        buf[i++] = c;
      } else if (c < 0x800) {
        /* two bytes */
        buf[i++] = 0xC0 | c >>> 6;
        buf[i++] = 0x80 | c & 0x3f;
      } else if (c < 0x10000) {
        /* three bytes */
        buf[i++] = 0xE0 | c >>> 12;
        buf[i++] = 0x80 | c >>> 6 & 0x3f;
        buf[i++] = 0x80 | c & 0x3f;
      } else {
        /* four bytes */
        buf[i++] = 0xf0 | c >>> 18;
        buf[i++] = 0x80 | c >>> 12 & 0x3f;
        buf[i++] = 0x80 | c >>> 6 & 0x3f;
        buf[i++] = 0x80 | c & 0x3f;
      }
    }

    return buf;
  }; // Helper


  var buf2binstring = function buf2binstring(buf, len) {
    // On Chrome, the arguments in a function call that are allowed is `65534`.
    // If the length of the buffer is smaller than that, we can use this optimization,
    // otherwise we will take a slower path.
    if (len < 65534) {
      if (buf.subarray && STR_APPLY_UIA_OK) {
        return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
      }
    }

    var result = '';

    for (var i = 0; i < len; i++) {
      result += String.fromCharCode(buf[i]);
    }

    return result;
  }; // convert array to string


  var buf2string = function buf2string(buf, max) {
    var len = max || buf.length;

    if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
      return new TextDecoder().decode(buf.subarray(0, max));
    }

    var i, out; // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.

    var utf16buf = new Array(len * 2);

    for (out = 0, i = 0; i < len;) {
      var c = buf[i++]; // quick process ascii

      if (c < 0x80) {
        utf16buf[out++] = c;
        continue;
      }

      var c_len = _utf8len[c]; // skip 5 & 6 byte codes

      if (c_len > 4) {
        utf16buf[out++] = 0xfffd;
        i += c_len - 1;
        continue;
      } // apply mask on first byte


      c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07; // join the rest

      while (c_len > 1 && i < len) {
        c = c << 6 | buf[i++] & 0x3f;
        c_len--;
      } // terminated by end of string?


      if (c_len > 1) {
        utf16buf[out++] = 0xfffd;
        continue;
      }

      if (c < 0x10000) {
        utf16buf[out++] = c;
      } else {
        c -= 0x10000;
        utf16buf[out++] = 0xd800 | c >> 10 & 0x3ff;
        utf16buf[out++] = 0xdc00 | c & 0x3ff;
      }
    }

    return buf2binstring(utf16buf, out);
  }; // Calculate max possible position in utf8 buffer,
  // that will not break sequence. If that's not possible
  // - (very small limits) return max size as is.
  //
  // buf[] - utf8 bytes array
  // max   - length limit (mandatory);


  var utf8border = function utf8border(buf, max) {
    max = max || buf.length;

    if (max > buf.length) {
      max = buf.length;
    } // go back from last position, until start of sequence found


    var pos = max - 1;

    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) {
      pos--;
    } // Very small and broken sequence,
    // return max, because we should return something anyway.


    if (pos < 0) {
      return max;
    } // If we came to start of buffer - that means buffer is too small,
    // return max too.


    if (pos === 0) {
      return max;
    }

    return pos + _utf8len[buf[pos]] > max ? pos : max;
  };

  var strings = {
    string2buf: string2buf,
    buf2string: buf2string,
    utf8border: utf8border
  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  function ZStream() {
    /* next input byte */
    this.input = null; // JS specific, because we have no pointers

    this.next_in = 0;
    /* number of bytes available at input */

    this.avail_in = 0;
    /* total number of input bytes read so far */

    this.total_in = 0;
    /* next output byte should be put there */

    this.output = null; // JS specific, because we have no pointers

    this.next_out = 0;
    /* remaining free space at output */

    this.avail_out = 0;
    /* total number of bytes output so far */

    this.total_out = 0;
    /* last error message, NULL if no error */

    this.msg = ''
    /*Z_NULL*/
    ;
    /* not visible by applications */

    this.state = null;
    /* best guess about the data type: binary or text */

    this.data_type = 2
    /*Z_UNKNOWN*/
    ;
    /* adler32 value of the uncompressed data */

    this.adler = 0;
  }

  var zstream = ZStream;

  var toString$1 = Object.prototype.toString;
  /* Public constants ==========================================================*/

  /* ===========================================================================*/

  var Z_NO_FLUSH$1 = constants$2.Z_NO_FLUSH,
      Z_SYNC_FLUSH = constants$2.Z_SYNC_FLUSH,
      Z_FULL_FLUSH = constants$2.Z_FULL_FLUSH,
      Z_FINISH$2 = constants$2.Z_FINISH,
      Z_OK$2 = constants$2.Z_OK,
      Z_STREAM_END$2 = constants$2.Z_STREAM_END,
      Z_DEFAULT_COMPRESSION = constants$2.Z_DEFAULT_COMPRESSION,
      Z_DEFAULT_STRATEGY = constants$2.Z_DEFAULT_STRATEGY,
      Z_DEFLATED$1 = constants$2.Z_DEFLATED;
  /* ===========================================================================*/

  /**
   * class Deflate
   *
   * Generic JS-style wrapper for zlib calls. If you don't need
   * streaming behaviour - use more simple functions: [[deflate]],
   * [[deflateRaw]] and [[gzip]].
   **/

  /* internal
   * Deflate.chunks -> Array
   *
   * Chunks of output data, if [[Deflate#onData]] not overridden.
   **/

  /**
   * Deflate.result -> Uint8Array
   *
   * Compressed result, generated by default [[Deflate#onData]]
   * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
   * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
   **/

  /**
   * Deflate.err -> Number
   *
   * Error code after deflate finished. 0 (Z_OK) on success.
   * You will not need it in real life, because deflate errors
   * are possible only on wrong options or bad `onData` / `onEnd`
   * custom handlers.
   **/

  /**
   * Deflate.msg -> String
   *
   * Error message, if [[Deflate.err]] != 0
   **/

  /**
   * new Deflate(options)
   * - options (Object): zlib deflate options.
   *
   * Creates new deflator instance with specified params. Throws exception
   * on bad params. Supported options:
   *
   * - `level`
   * - `windowBits`
   * - `memLevel`
   * - `strategy`
   * - `dictionary`
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Additional options, for internal needs:
   *
   * - `chunkSize` - size of generated data chunks (16K by default)
   * - `raw` (Boolean) - do raw deflate
   * - `gzip` (Boolean) - create gzip wrapper
   * - `header` (Object) - custom header for gzip
   *   - `text` (Boolean) - true if compressed data believed to be text
   *   - `time` (Number) - modification time, unix timestamp
   *   - `os` (Number) - operation system code
   *   - `extra` (Array) - array of bytes with extra data (max 65536)
   *   - `name` (String) - file name (binary string)
   *   - `comment` (String) - comment (binary string)
   *   - `hcrc` (Boolean) - true if header crc should be added
   *
   * ##### Example:
   *
   * ```javascript
   * const pako = require('pako')
   *   , chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
   *   , chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
   *
   * const deflate = new pako.Deflate({ level: 3});
   *
   * deflate.push(chunk1, false);
   * deflate.push(chunk2, true);  // true -> last chunk
   *
   * if (deflate.err) { throw new Error(deflate.err); }
   *
   * console.log(deflate.result);
   * ```
   **/

  function Deflate$1(options) {
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY
    }, options || {});
    var opt = this.options;

    if (opt.raw && opt.windowBits > 0) {
      opt.windowBits = -opt.windowBits;
    } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
      opt.windowBits += 16;
    }

    this.err = 0; // error code, if happens (0 = Z_OK)

    this.msg = ''; // error message

    this.ended = false; // used to avoid multiple onEnd() calls

    this.chunks = []; // chunks of compressed data

    this.strm = new zstream();
    this.strm.avail_out = 0;
    var status = deflate_1$2.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy);

    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }

    if (opt.header) {
      deflate_1$2.deflateSetHeader(this.strm, opt.header);
    }

    if (opt.dictionary) {
      var dict; // Convert data if needed

      if (typeof opt.dictionary === 'string') {
        // If we need to compress text, change encoding to utf8.
        dict = strings.string2buf(opt.dictionary);
      } else if (toString$1.call(opt.dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(opt.dictionary);
      } else {
        dict = opt.dictionary;
      }

      status = deflate_1$2.deflateSetDictionary(this.strm, dict);

      if (status !== Z_OK$2) {
        throw new Error(messages[status]);
      }

      this._dict_set = true;
    }
  }
  /**
   * Deflate#push(data[, flush_mode]) -> Boolean
   * - data (Uint8Array|ArrayBuffer|String): input data. Strings will be
   *   converted to utf8 byte sequence.
   * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
   *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
   *
   * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
   * new compressed chunks. Returns `true` on success. The last data block must
   * have `flush_mode` Z_FINISH (or `true`). That will flush internal pending
   * buffers and call [[Deflate#onEnd]].
   *
   * On fail call [[Deflate#onEnd]] with error code and return false.
   *
   * ##### Example
   *
   * ```javascript
   * push(chunk, false); // push one of data chunks
   * ...
   * push(chunk, true);  // push last chunk
   * ```
   **/


  Deflate$1.prototype.push = function (data, flush_mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;

    var status, _flush_mode;

    if (this.ended) {
      return false;
    }

    if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1; // Convert data if needed

    if (typeof data === 'string') {
      // If we need to compress text, change encoding to utf8.
      strm.input = strings.string2buf(data);
    } else if (toString$1.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    for (;;) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      } // Make sure avail_out > 6 to avoid repeating markers


      if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }

      status = deflate_1$2.deflate(strm, _flush_mode); // Ended => flush and finish

      if (status === Z_STREAM_END$2) {
        if (strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
        }

        status = deflate_1$2.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK$2;
      } // Flush if out buffer full


      if (strm.avail_out === 0) {
        this.onData(strm.output);
        continue;
      } // Flush if requested and has data


      if (_flush_mode > 0 && strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
        strm.avail_out = 0;
        continue;
      }

      if (strm.avail_in === 0) break;
    }

    return true;
  };
  /**
   * Deflate#onData(chunk) -> Void
   * - chunk (Uint8Array): output data.
   *
   * By default, stores data blocks in `chunks[]` property and glue
   * those in `onEnd`. Override this handler, if you need another behaviour.
   **/


  Deflate$1.prototype.onData = function (chunk) {
    this.chunks.push(chunk);
  };
  /**
   * Deflate#onEnd(status) -> Void
   * - status (Number): deflate status. 0 (Z_OK) on success,
   *   other if not.
   *
   * Called once after you tell deflate that the input stream is
   * complete (Z_FINISH). By default - join collected chunks,
   * free memory and fill `results` / `err` properties.
   **/


  Deflate$1.prototype.onEnd = function (status) {
    // On success - join
    if (status === Z_OK$2) {
      this.result = common.flattenChunks(this.chunks);
    }

    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  /**
   * deflate(data[, options]) -> Uint8Array
   * - data (Uint8Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * Compress `data` with deflate algorithm and `options`.
   *
   * Supported options are:
   *
   * - level
   * - windowBits
   * - memLevel
   * - strategy
   * - dictionary
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Sugar (options):
   *
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
   *   negative windowBits implicitly.
   *
   * ##### Example:
   *
   * ```javascript
   * const pako = require('pako')
   * const data = new Uint8Array([1,2,3,4,5,6,7,8,9]);
   *
   * console.log(pako.deflate(data));
   * ```
   **/


  function deflate$1(input, options) {
    var deflator = new Deflate$1(options);
    deflator.push(input, true); // That will never happens, if you don't cheat with options :)

    if (deflator.err) {
      throw deflator.msg || messages[deflator.err];
    }

    return deflator.result;
  }
  /**
   * deflateRaw(data[, options]) -> Uint8Array
   * - data (Uint8Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * The same as [[deflate]], but creates raw data, without wrapper
   * (header and adler32 crc).
   **/


  function deflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return deflate$1(input, options);
  }
  /**
   * gzip(data[, options]) -> Uint8Array
   * - data (Uint8Array|String): input data to compress.
   * - options (Object): zlib deflate options.
   *
   * The same as [[deflate]], but create gzip wrapper instead of
   * deflate one.
   **/


  function gzip$1(input, options) {
    options = options || {};
    options.gzip = true;
    return deflate$1(input, options);
  }

  var Deflate_1$1 = Deflate$1;
  var deflate_2 = deflate$1;
  var deflateRaw_1$1 = deflateRaw$1;
  var gzip_1$1 = gzip$1;
  var constants$1 = constants$2;
  var deflate_1$1 = {
    Deflate: Deflate_1$1,
    deflate: deflate_2,
    deflateRaw: deflateRaw_1$1,
    gzip: gzip_1$1,
    constants: constants$1
  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.
  // See state defs from inflate.js

  var BAD$1 = 30;
  /* got a data error -- remain here until reset */

  var TYPE$1 = 12;
  /* i: waiting for type bits, including last-flag bit */

  /*
     Decode literal, length, and distance codes and write out the resulting
     literal and match bytes until either not enough input or output is
     available, an end-of-block is encountered, or a data error is encountered.
     When large enough input and output buffers are supplied to inflate(), for
     example, a 16K input buffer and a 64K output buffer, more than 95% of the
     inflate execution time is spent in this routine.

     Entry assumptions:

          state.mode === LEN
          strm.avail_in >= 6
          strm.avail_out >= 258
          start >= strm.avail_out
          state.bits < 8

     On return, state.mode is one of:

          LEN -- ran out of enough output space or enough available input
          TYPE -- reached end of block code, inflate() to interpret next block
          BAD -- error in block data

     Notes:

      - The maximum input bits used by a length/distance pair is 15 bits for the
        length code, 5 bits for the length extra, 15 bits for the distance code,
        and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
        Therefore if strm.avail_in >= 6, then there is enough input to avoid
        checking for available input while decoding.

      - The maximum bytes that a single length/distance pair can output is 258
        bytes, which is the maximum length that can be coded.  inflate_fast()
        requires strm.avail_out >= 258 for each loop to avoid checking for
        output space.
   */

  var inffast = function inflate_fast(strm, start) {
    var _in;
    /* local strm.input */


    var last;
    /* have enough input while in < last */

    var _out;
    /* local strm.output */


    var beg;
    /* inflate()'s initial strm.output */

    var end;
    /* while out < end, enough space available */
    //#ifdef INFLATE_STRICT

    var dmax;
    /* maximum distance from zlib header */
    //#endif

    var wsize;
    /* window size or zero if not using window */

    var whave;
    /* valid bytes in the window */

    var wnext;
    /* window write index */
    // Use `s_window` instead `window`, avoid conflict with instrumentation tools

    var s_window;
    /* allocated sliding window, if wsize != 0 */

    var hold;
    /* local strm.hold */

    var bits;
    /* local strm.bits */

    var lcode;
    /* local strm.lencode */

    var dcode;
    /* local strm.distcode */

    var lmask;
    /* mask for first level of length codes */

    var dmask;
    /* mask for first level of distance codes */

    var here;
    /* retrieved table entry */

    var op;
    /* code bits, operation, extra bits, or */

    /*  window position, window bytes to copy */

    var len;
    /* match length, unused bytes */

    var dist;
    /* match distance */

    var from;
    /* where to copy match from */

    var from_source;
    var input, output; // JS specific, because we have no pointers

    /* copy state to local variables */

    var state = strm.state; //here = state.here;

    _in = strm.next_in;
    input = strm.input;
    last = _in + (strm.avail_in - 5);
    _out = strm.next_out;
    output = strm.output;
    beg = _out - (start - strm.avail_out);
    end = _out + (strm.avail_out - 257); //#ifdef INFLATE_STRICT

    dmax = state.dmax; //#endif

    wsize = state.wsize;
    whave = state.whave;
    wnext = state.wnext;
    s_window = state.window;
    hold = state.hold;
    bits = state.bits;
    lcode = state.lencode;
    dcode = state.distcode;
    lmask = (1 << state.lenbits) - 1;
    dmask = (1 << state.distbits) - 1;
    /* decode literals and length/distances until end-of-block or not enough
       input data or output space */

    top: do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }

      here = lcode[hold & lmask];

      dolen: for (;;) {
        // Goto emulation
        op = here >>> 24
        /*here.bits*/
        ;
        hold >>>= op;
        bits -= op;
        op = here >>> 16 & 0xff
        /*here.op*/
        ;

        if (op === 0) {
          /* literal */
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          output[_out++] = here & 0xffff
          /*here.val*/
          ;
        } else if (op & 16) {
          /* length base */
          len = here & 0xffff
          /*here.val*/
          ;
          op &= 15;
          /* number of extra bits */

          if (op) {
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
            }

            len += hold & (1 << op) - 1;
            hold >>>= op;
            bits -= op;
          } //Tracevv((stderr, "inflate:         length %u\n", len));


          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }

          here = dcode[hold & dmask];

          dodist: for (;;) {
            // goto emulation
            op = here >>> 24
            /*here.bits*/
            ;
            hold >>>= op;
            bits -= op;
            op = here >>> 16 & 0xff
            /*here.op*/
            ;

            if (op & 16) {
              /* distance base */
              dist = here & 0xffff
              /*here.val*/
              ;
              op &= 15;
              /* number of extra bits */

              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;

                if (bits < op) {
                  hold += input[_in++] << bits;
                  bits += 8;
                }
              }

              dist += hold & (1 << op) - 1; //#ifdef INFLATE_STRICT

              if (dist > dmax) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD$1;
                break top;
              } //#endif


              hold >>>= op;
              bits -= op; //Tracevv((stderr, "inflate:         distance %u\n", dist));

              op = _out - beg;
              /* max distance in output */

              if (dist > op) {
                /* see if copy from window */
                op = dist - op;
                /* distance back in window */

                if (op > whave) {
                  if (state.sane) {
                    strm.msg = 'invalid distance too far back';
                    state.mode = BAD$1;
                    break top;
                  } // (!) This block is disabled in zlib defaults,
                  // don't enable it for binary compatibility
                  //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                  //                if (len <= op - whave) {
                  //                  do {
                  //                    output[_out++] = 0;
                  //                  } while (--len);
                  //                  continue top;
                  //                }
                  //                len -= op - whave;
                  //                do {
                  //                  output[_out++] = 0;
                  //                } while (--op > whave);
                  //                if (op === 0) {
                  //                  from = _out - dist;
                  //                  do {
                  //                    output[_out++] = output[from++];
                  //                  } while (--len);
                  //                  continue top;
                  //                }
                  //#endif

                }

                from = 0; // window index

                from_source = s_window;

                if (wnext === 0) {
                  /* very common case */
                  from += wsize - op;

                  if (op < len) {
                    /* some from window */
                    len -= op;

                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);

                    from = _out - dist;
                    /* rest from output */

                    from_source = output;
                  }
                } else if (wnext < op) {
                  /* wrap around window */
                  from += wsize + wnext - op;
                  op -= wnext;

                  if (op < len) {
                    /* some from end of window */
                    len -= op;

                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);

                    from = 0;

                    if (wnext < len) {
                      /* some from start of window */
                      op = wnext;
                      len -= op;

                      do {
                        output[_out++] = s_window[from++];
                      } while (--op);

                      from = _out - dist;
                      /* rest from output */

                      from_source = output;
                    }
                  }
                } else {
                  /* contiguous in window */
                  from += wnext - op;

                  if (op < len) {
                    /* some from window */
                    len -= op;

                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);

                    from = _out - dist;
                    /* rest from output */

                    from_source = output;
                  }
                }

                while (len > 2) {
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  output[_out++] = from_source[from++];
                  len -= 3;
                }

                if (len) {
                  output[_out++] = from_source[from++];

                  if (len > 1) {
                    output[_out++] = from_source[from++];
                  }
                }
              } else {
                from = _out - dist;
                /* copy direct from output */

                do {
                  /* minimum length is three */
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  output[_out++] = output[from++];
                  len -= 3;
                } while (len > 2);

                if (len) {
                  output[_out++] = output[from++];

                  if (len > 1) {
                    output[_out++] = output[from++];
                  }
                }
              }
            } else if ((op & 64) === 0) {
              /* 2nd level distance code */
              here = dcode[(here & 0xffff) + (hold & (1 << op) - 1)];
              continue dodist;
            } else {
              strm.msg = 'invalid distance code';
              state.mode = BAD$1;
              break top;
            }

            break; // need to emulate goto via "continue"
          }
        } else if ((op & 64) === 0) {
          /* 2nd level length code */
          here = lcode[(here & 0xffff) + (hold & (1 << op) - 1)];
          continue dolen;
        } else if (op & 32) {
          /* end-of-block */
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.mode = TYPE$1;
          break top;
        } else {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD$1;
          break top;
        }

        break; // need to emulate goto via "continue"
      }
    } while (_in < last && _out < end);
    /* return unused bytes (on entry, bits < 8, so in won't go too far back) */


    len = bits >> 3;
    _in -= len;
    bits -= len << 3;
    hold &= (1 << bits) - 1;
    /* update state and return */

    strm.next_in = _in;
    strm.next_out = _out;
    strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
    strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
    state.hold = hold;
    state.bits = bits;
    return;
  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  var MAXBITS = 15;
  var ENOUGH_LENS$1 = 852;
  var ENOUGH_DISTS$1 = 592; //const ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

  var CODES$1 = 0;
  var LENS$1 = 1;
  var DISTS$1 = 2;
  var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
  var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]);
  var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]);
  var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);

  var inflate_table = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
    var bits = opts.bits; //here = opts.here; /* table entry for duplication */

    var len = 0;
    /* a code's length in bits */

    var sym = 0;
    /* index of code symbols */

    var min = 0,
        max = 0;
    /* minimum and maximum code lengths */

    var root = 0;
    /* number of index bits for root table */

    var curr = 0;
    /* number of index bits for current table */

    var drop = 0;
    /* code bits to drop for sub-table */

    var left = 0;
    /* number of prefix codes available */

    var used = 0;
    /* code entries in table used */

    var huff = 0;
    /* Huffman code */

    var incr;
    /* for incrementing code, index */

    var fill;
    /* index for replicating entries */

    var low;
    /* low bits for current root entry */

    var mask;
    /* mask for low root bits */

    var next;
    /* next available space in table */

    var base = null;
    /* base value table to use */

    var base_index = 0; //  let shoextra;    /* extra bits table to use */

    var end;
    /* use base and extra for symbol > end */

    var count = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */

    var offs = new Uint16Array(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */

    var extra = null;
    var extra_index = 0;
    var here_bits, here_op, here_val;
    /*
     Process a set of code lengths to create a canonical Huffman code.  The
     code lengths are lens[0..codes-1].  Each length corresponds to the
     symbols 0..codes-1.  The Huffman code is generated by first sorting the
     symbols by length from short to long, and retaining the symbol order
     for codes with equal lengths.  Then the code starts with all zero bits
     for the first code of the shortest length, and the codes are integer
     increments for the same length, and zeros are appended as the length
     increases.  For the deflate format, these bits are stored backwards
     from their more natural integer increment ordering, and so when the
     decoding tables are built in the large loop below, the integer codes
     are incremented backwards.
      This routine assumes, but does not check, that all of the entries in
     lens[] are in the range 0..MAXBITS.  The caller must assure this.
     1..MAXBITS is interpreted as that code length.  zero means that that
     symbol does not occur in this code.
      The codes are sorted by computing a count of codes for each length,
     creating from that a table of starting indices for each length in the
     sorted table, and then entering the symbols in order in the sorted
     table.  The sorted table is work[], with that space being provided by
     the caller.
      The length counts are used for other purposes as well, i.e. finding
     the minimum and maximum length codes, determining if there are any
     codes at all, checking for a valid set of lengths, and looking ahead
     at length counts to determine sub-table sizes when building the
     decoding tables.
     */

    /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */

    for (len = 0; len <= MAXBITS; len++) {
      count[len] = 0;
    }

    for (sym = 0; sym < codes; sym++) {
      count[lens[lens_index + sym]]++;
    }
    /* bound code lengths, force root to be within code lengths */


    root = bits;

    for (max = MAXBITS; max >= 1; max--) {
      if (count[max] !== 0) {
        break;
      }
    }

    if (root > max) {
      root = max;
    }

    if (max === 0) {
      /* no symbols to code at all */
      //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
      //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
      //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
      table[table_index++] = 1 << 24 | 64 << 16 | 0; //table.op[opts.table_index] = 64;
      //table.bits[opts.table_index] = 1;
      //table.val[opts.table_index++] = 0;

      table[table_index++] = 1 << 24 | 64 << 16 | 0;
      opts.bits = 1;
      return 0;
      /* no symbols, but wait for decoding to report error */
    }

    for (min = 1; min < max; min++) {
      if (count[min] !== 0) {
        break;
      }
    }

    if (root < min) {
      root = min;
    }
    /* check for an over-subscribed or incomplete set of lengths */


    left = 1;

    for (len = 1; len <= MAXBITS; len++) {
      left <<= 1;
      left -= count[len];

      if (left < 0) {
        return -1;
      }
      /* over-subscribed */

    }

    if (left > 0 && (type === CODES$1 || max !== 1)) {
      return -1;
      /* incomplete set */
    }
    /* generate offsets into symbol table for each length for sorting */


    offs[1] = 0;

    for (len = 1; len < MAXBITS; len++) {
      offs[len + 1] = offs[len] + count[len];
    }
    /* sort symbols by length, by symbol order within each length */


    for (sym = 0; sym < codes; sym++) {
      if (lens[lens_index + sym] !== 0) {
        work[offs[lens[lens_index + sym]]++] = sym;
      }
    }
    /*
     Create and fill in decoding tables.  In this loop, the table being
     filled is at next and has curr index bits.  The code being used is huff
     with length len.  That code is converted to an index by dropping drop
     bits off of the bottom.  For codes where len is less than drop + curr,
     those top drop + curr - len bits are incremented through all values to
     fill the table with replicated entries.
      root is the number of index bits for the root table.  When len exceeds
     root, sub-tables are created pointed to by the root entry with an index
     of the low root bits of huff.  This is saved in low to check for when a
     new sub-table should be started.  drop is zero when the root table is
     being filled, and drop is root when sub-tables are being filled.
      When a new sub-table is needed, it is necessary to look ahead in the
     code lengths to determine what size sub-table is needed.  The length
     counts are used for this, and so count[] is decremented as codes are
     entered in the tables.
      used keeps track of how many table entries have been allocated from the
     provided *table space.  It is checked for LENS and DIST tables against
     the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
     the initial root table size constants.  See the comments in inftrees.h
     for more information.
      sym increments through all symbols, and the loop terminates when
     all codes of length max, i.e. all codes, have been processed.  This
     routine permits incomplete codes, so another loop after this one fills
     in the rest of the decoding tables with invalid code markers.
     */

    /* set up for code type */
    // poor man optimization - use if-else instead of switch,
    // to avoid deopts in old v8


    if (type === CODES$1) {
      base = extra = work;
      /* dummy value--not used */

      end = 19;
    } else if (type === LENS$1) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
    } else {
      /* DISTS */
      base = dbase;
      extra = dext;
      end = -1;
    }
    /* initialize opts for loop */


    huff = 0;
    /* starting code */

    sym = 0;
    /* starting code symbol */

    len = min;
    /* starting code length */

    next = table_index;
    /* current table to fill in */

    curr = root;
    /* current table index bits */

    drop = 0;
    /* current bits to drop from code for index */

    low = -1;
    /* trigger new sub-table when len > root */

    used = 1 << root;
    /* use root table entries */

    mask = used - 1;
    /* mask for comparing low */

    /* check available table space */

    if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
      return 1;
    }
    /* process all codes and make table entries */


    for (;;) {
      /* create table entry */
      here_bits = len - drop;

      if (work[sym] < end) {
        here_op = 0;
        here_val = work[sym];
      } else if (work[sym] > end) {
        here_op = extra[extra_index + work[sym]];
        here_val = base[base_index + work[sym]];
      } else {
        here_op = 32 + 64;
        /* end of block */

        here_val = 0;
      }
      /* replicate for those indices with low len bits equal to huff */


      incr = 1 << len - drop;
      fill = 1 << curr;
      min = fill;
      /* save offset to next table */

      do {
        fill -= incr;
        table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
      } while (fill !== 0);
      /* backwards increment the len-bit code huff */


      incr = 1 << len - 1;

      while (huff & incr) {
        incr >>= 1;
      }

      if (incr !== 0) {
        huff &= incr - 1;
        huff += incr;
      } else {
        huff = 0;
      }
      /* go to next symbol, update count, len */


      sym++;

      if (--count[len] === 0) {
        if (len === max) {
          break;
        }

        len = lens[lens_index + work[sym]];
      }
      /* create new sub-table if needed */


      if (len > root && (huff & mask) !== low) {
        /* if first time, transition to sub-tables */
        if (drop === 0) {
          drop = root;
        }
        /* increment past last table */


        next += min;
        /* here min is 1 << curr */

        /* determine length of next table */

        curr = len - drop;
        left = 1 << curr;

        while (curr + drop < max) {
          left -= count[curr + drop];

          if (left <= 0) {
            break;
          }

          curr++;
          left <<= 1;
        }
        /* check for enough space */


        used += 1 << curr;

        if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
          return 1;
        }
        /* point entry in root table to sub-table */


        low = huff & mask;
        /*table.op[low] = curr;
        table.bits[low] = root;
        table.val[low] = next - opts.table_index;*/

        table[low] = root << 24 | curr << 16 | next - table_index | 0;
      }
    }
    /* fill in remaining table entry if code is incomplete (guaranteed to have
     at most one remaining entry, since if the code is incomplete, the
     maximum code length that was allowed to get this far is one bit) */


    if (huff !== 0) {
      //table.op[next + huff] = 64;            /* invalid code marker */
      //table.bits[next + huff] = len - drop;
      //table.val[next + huff] = 0;
      table[next + huff] = len - drop << 24 | 64 << 16 | 0;
    }
    /* set return parameters */
    //opts.table_index += used;


    opts.bits = root;
    return 0;
  };

  var inftrees = inflate_table;

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.


  var CODES = 0;
  var LENS = 1;
  var DISTS = 2;
  /* Public constants ==========================================================*/

  /* ===========================================================================*/

  var Z_FINISH$1 = constants$2.Z_FINISH,
      Z_BLOCK = constants$2.Z_BLOCK,
      Z_TREES = constants$2.Z_TREES,
      Z_OK$1 = constants$2.Z_OK,
      Z_STREAM_END$1 = constants$2.Z_STREAM_END,
      Z_NEED_DICT$1 = constants$2.Z_NEED_DICT,
      Z_STREAM_ERROR$1 = constants$2.Z_STREAM_ERROR,
      Z_DATA_ERROR$1 = constants$2.Z_DATA_ERROR,
      Z_MEM_ERROR$1 = constants$2.Z_MEM_ERROR,
      Z_BUF_ERROR = constants$2.Z_BUF_ERROR,
      Z_DEFLATED = constants$2.Z_DEFLATED;
  /* STATES ====================================================================*/

  /* ===========================================================================*/

  var HEAD = 1;
  /* i: waiting for magic header */

  var FLAGS = 2;
  /* i: waiting for method and flags (gzip) */

  var TIME = 3;
  /* i: waiting for modification time (gzip) */

  var OS = 4;
  /* i: waiting for extra flags and operating system (gzip) */

  var EXLEN = 5;
  /* i: waiting for extra length (gzip) */

  var EXTRA = 6;
  /* i: waiting for extra bytes (gzip) */

  var NAME = 7;
  /* i: waiting for end of file name (gzip) */

  var COMMENT = 8;
  /* i: waiting for end of comment (gzip) */

  var HCRC = 9;
  /* i: waiting for header crc (gzip) */

  var DICTID = 10;
  /* i: waiting for dictionary check value */

  var DICT = 11;
  /* waiting for inflateSetDictionary() call */

  var TYPE = 12;
  /* i: waiting for type bits, including last-flag bit */

  var TYPEDO = 13;
  /* i: same, but skip check to exit inflate on new block */

  var STORED = 14;
  /* i: waiting for stored size (length and complement) */

  var COPY_ = 15;
  /* i/o: same as COPY below, but only first time in */

  var COPY = 16;
  /* i/o: waiting for input or output to copy stored block */

  var TABLE = 17;
  /* i: waiting for dynamic block table lengths */

  var LENLENS = 18;
  /* i: waiting for code length code lengths */

  var CODELENS = 19;
  /* i: waiting for length/lit and distance code lengths */

  var LEN_ = 20;
  /* i: same as LEN below, but only first time in */

  var LEN = 21;
  /* i: waiting for length/lit/eob code */

  var LENEXT = 22;
  /* i: waiting for length extra bits */

  var DIST = 23;
  /* i: waiting for distance code */

  var DISTEXT = 24;
  /* i: waiting for distance extra bits */

  var MATCH = 25;
  /* o: waiting for output space to copy string */

  var LIT = 26;
  /* o: waiting for output space to write literal */

  var CHECK = 27;
  /* i: waiting for 32-bit check value */

  var LENGTH = 28;
  /* i: waiting for 32-bit length (gzip) */

  var DONE = 29;
  /* finished check, done -- remain here until reset */

  var BAD = 30;
  /* got a data error -- remain here until reset */

  var MEM = 31;
  /* got an inflate() memory error -- remain here until reset */

  var SYNC = 32;
  /* looking for synchronization bytes to restart inflate() */

  /* ===========================================================================*/

  var ENOUGH_LENS = 852;
  var ENOUGH_DISTS = 592; //const ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

  var MAX_WBITS = 15;
  /* 32K LZ77 window */

  var DEF_WBITS = MAX_WBITS;

  var zswap32 = function zswap32(q) {
    return (q >>> 24 & 0xff) + (q >>> 8 & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24);
  };

  function InflateState() {
    this.mode = 0;
    /* current inflate mode */

    this.last = false;
    /* true if processing last block */

    this.wrap = 0;
    /* bit 0 true for zlib, bit 1 true for gzip */

    this.havedict = false;
    /* true if dictionary provided */

    this.flags = 0;
    /* gzip header method and flags (0 if zlib) */

    this.dmax = 0;
    /* zlib header max distance (INFLATE_STRICT) */

    this.check = 0;
    /* protected copy of check value */

    this.total = 0;
    /* protected copy of output count */
    // TODO: may be {}

    this.head = null;
    /* where to save gzip header information */

    /* sliding window */

    this.wbits = 0;
    /* log base 2 of requested window size */

    this.wsize = 0;
    /* window size or zero if not using window */

    this.whave = 0;
    /* valid bytes in the window */

    this.wnext = 0;
    /* window write index */

    this.window = null;
    /* allocated sliding window, if needed */

    /* bit accumulator */

    this.hold = 0;
    /* input bit accumulator */

    this.bits = 0;
    /* number of bits in "in" */

    /* for string and stored block copying */

    this.length = 0;
    /* literal or length of data to copy */

    this.offset = 0;
    /* distance back to copy string from */

    /* for table and code decoding */

    this.extra = 0;
    /* extra bits needed */

    /* fixed and dynamic code tables */

    this.lencode = null;
    /* starting table for length/literal codes */

    this.distcode = null;
    /* starting table for distance codes */

    this.lenbits = 0;
    /* index bits for lencode */

    this.distbits = 0;
    /* index bits for distcode */

    /* dynamic table building */

    this.ncode = 0;
    /* number of code length code lengths */

    this.nlen = 0;
    /* number of length code lengths */

    this.ndist = 0;
    /* number of distance code lengths */

    this.have = 0;
    /* number of code lengths in lens[] */

    this.next = null;
    /* next available space in codes[] */

    this.lens = new Uint16Array(320);
    /* temporary storage for code lengths */

    this.work = new Uint16Array(288);
    /* work area for code table building */

    /*
     because we don't have pointers in js, we use lencode and distcode directly
     as buffers so we don't need codes
    */
    //this.codes = new Int32Array(ENOUGH);       /* space for code tables */

    this.lendyn = null;
    /* dynamic table for length/literal codes (JS specific) */

    this.distdyn = null;
    /* dynamic table for distance codes (JS specific) */

    this.sane = 0;
    /* if false, allow invalid distance too far */

    this.back = 0;
    /* bits back of last unprocessed length/lit */

    this.was = 0;
    /* initial length of match */
  }

  var inflateResetKeep = function inflateResetKeep(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;
    strm.total_in = strm.total_out = state.total = 0;
    strm.msg = '';
    /*Z_NULL*/

    if (state.wrap) {
      /* to support ill-conceived Java test suite */
      strm.adler = state.wrap & 1;
    }

    state.mode = HEAD;
    state.last = 0;
    state.havedict = 0;
    state.dmax = 32768;
    state.head = null
    /*Z_NULL*/
    ;
    state.hold = 0;
    state.bits = 0; //state.lencode = state.distcode = state.next = state.codes;

    state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
    state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
    state.sane = 1;
    state.back = -1; //Tracev((stderr, "inflate: reset\n"));

    return Z_OK$1;
  };

  var inflateReset = function inflateReset(strm) {
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;
    state.wsize = 0;
    state.whave = 0;
    state.wnext = 0;
    return inflateResetKeep(strm);
  };

  var inflateReset2 = function inflateReset2(strm, windowBits) {
    var wrap;
    /* get the state */

    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;
    /* extract wrap request from windowBits parameter */

    if (windowBits < 0) {
      wrap = 0;
      windowBits = -windowBits;
    } else {
      wrap = (windowBits >> 4) + 1;

      if (windowBits < 48) {
        windowBits &= 15;
      }
    }
    /* set number of window bits, free window if different */


    if (windowBits && (windowBits < 8 || windowBits > 15)) {
      return Z_STREAM_ERROR$1;
    }

    if (state.window !== null && state.wbits !== windowBits) {
      state.window = null;
    }
    /* update state and reset the rest of it */


    state.wrap = wrap;
    state.wbits = windowBits;
    return inflateReset(strm);
  };

  var inflateInit2 = function inflateInit2(strm, windowBits) {
    if (!strm) {
      return Z_STREAM_ERROR$1;
    } //strm.msg = Z_NULL;                 /* in case we return an error */


    var state = new InflateState(); //if (state === Z_NULL) return Z_MEM_ERROR;
    //Tracev((stderr, "inflate: allocated\n"));

    strm.state = state;
    state.window = null
    /*Z_NULL*/
    ;
    var ret = inflateReset2(strm, windowBits);

    if (ret !== Z_OK$1) {
      strm.state = null
      /*Z_NULL*/
      ;
    }

    return ret;
  };

  var inflateInit = function inflateInit(strm) {
    return inflateInit2(strm, DEF_WBITS);
  };
  /*
   Return state with length and distance decoding tables and index sizes set to
   fixed code decoding.  Normally this returns fixed tables from inffixed.h.
   If BUILDFIXED is defined, then instead this routine builds the tables the
   first time it's called, and returns those tables the first time and
   thereafter.  This reduces the size of the code by about 2K bytes, in
   exchange for a little execution time.  However, BUILDFIXED should not be
   used for threaded applications, since the rewriting of the tables and virgin
   may not be thread-safe.
   */


  var virgin = true;
  var lenfix, distfix; // We have no pointers in JS, so keep tables separate

  var fixedtables = function fixedtables(state) {
    /* build fixed huffman tables if first call (may not be thread safe) */
    if (virgin) {
      lenfix = new Int32Array(512);
      distfix = new Int32Array(32);
      /* literal/length table */

      var sym = 0;

      while (sym < 144) {
        state.lens[sym++] = 8;
      }

      while (sym < 256) {
        state.lens[sym++] = 9;
      }

      while (sym < 280) {
        state.lens[sym++] = 7;
      }

      while (sym < 288) {
        state.lens[sym++] = 8;
      }

      inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
        bits: 9
      });
      /* distance table */

      sym = 0;

      while (sym < 32) {
        state.lens[sym++] = 5;
      }

      inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
        bits: 5
      });
      /* do this just once */

      virgin = false;
    }

    state.lencode = lenfix;
    state.lenbits = 9;
    state.distcode = distfix;
    state.distbits = 5;
  };
  /*
   Update the window with the last wsize (normally 32K) bytes written before
   returning.  If window does not exist yet, create it.  This is only called
   when a window is already in use, or when output has been written during this
   inflate call, but the end of the deflate stream has not been reached yet.
   It is also called to create a window for dictionary data when a dictionary
   is loaded.

   Providing output buffers larger than 32K to inflate() should provide a speed
   advantage, since only the last 32K of output is copied to the sliding window
   upon return from inflate(), and since all distances after the first 32K of
   output will fall in the output data, making match copies simpler and faster.
   The advantage may be dependent on the size of the processor's data caches.
   */


  var updatewindow = function updatewindow(strm, src, end, copy) {
    var dist;
    var state = strm.state;
    /* if it hasn't been done already, allocate space for the window */

    if (state.window === null) {
      state.wsize = 1 << state.wbits;
      state.wnext = 0;
      state.whave = 0;
      state.window = new Uint8Array(state.wsize);
    }
    /* copy state->wsize or less output bytes into the circular window */


    if (copy >= state.wsize) {
      state.window.set(src.subarray(end - state.wsize, end), 0);
      state.wnext = 0;
      state.whave = state.wsize;
    } else {
      dist = state.wsize - state.wnext;

      if (dist > copy) {
        dist = copy;
      } //zmemcpy(state->window + state->wnext, end - copy, dist);


      state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
      copy -= dist;

      if (copy) {
        //zmemcpy(state->window, end - copy, copy);
        state.window.set(src.subarray(end - copy, end), 0);
        state.wnext = copy;
        state.whave = state.wsize;
      } else {
        state.wnext += dist;

        if (state.wnext === state.wsize) {
          state.wnext = 0;
        }

        if (state.whave < state.wsize) {
          state.whave += dist;
        }
      }
    }

    return 0;
  };

  var inflate$2 = function inflate(strm, flush) {
    var state;
    var input, output; // input/output buffers

    var next;
    /* next input INDEX */

    var put;
    /* next output INDEX */

    var have, left;
    /* available input and output */

    var hold;
    /* bit buffer */

    var bits;
    /* bits in bit buffer */

    var _in, _out;
    /* save starting available input and output */


    var copy;
    /* number of stored or match bytes to copy */

    var from;
    /* where to copy match bytes from */

    var from_source;
    var here = 0;
    /* current decoding table entry */

    var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
    //let last;                   /* parent table entry */

    var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)

    var len;
    /* length to copy for repeats, bits to drop */

    var ret;
    /* return code */

    var hbuf = new Uint8Array(4);
    /* buffer for gzip header crc calculation */

    var opts;
    var n; // temporary variable for NEED_BITS

    var order =
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);

    if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
      return Z_STREAM_ERROR$1;
    }

    state = strm.state;

    if (state.mode === TYPE) {
      state.mode = TYPEDO;
    }
    /* skip check */
    //--- LOAD() ---


    put = strm.next_out;
    output = strm.output;
    left = strm.avail_out;
    next = strm.next_in;
    input = strm.input;
    have = strm.avail_in;
    hold = state.hold;
    bits = state.bits; //---

    _in = have;
    _out = left;
    ret = Z_OK$1;

    inf_leave: // goto emulation
    for (;;) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          } //=== NEEDBITS(16);


          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if (state.wrap & 2 && hold === 0x8b1f) {
            /* gzip header */
            state.check = 0
            /*crc32(0L, Z_NULL, 0)*/
            ; //=== CRC2(state.check, hold);

            hbuf[0] = hold & 0xff;
            hbuf[1] = hold >>> 8 & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0); //===//
            //=== INITBITS();

            hold = 0;
            bits = 0; //===//

            state.mode = FLAGS;
            break;
          }

          state.flags = 0;
          /* expect zlib header */

          if (state.head) {
            state.head.done = false;
          }

          if (!(state.wrap & 1) ||
          /* check if zlib header allowed */
          (((hold & 0xff) << 8) + (hold >> 8)) % 31) {
            strm.msg = 'incorrect header check';
            state.mode = BAD;
            break;
          }

          if ((hold & 0x0f) !== Z_DEFLATED) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          } //--- DROPBITS(4) ---//


          hold >>>= 4;
          bits -= 4; //---//

          len = (hold & 0x0f) + 8;

          if (state.wbits === 0) {
            state.wbits = len;
          } else if (len > state.wbits) {
            strm.msg = 'invalid window size';
            state.mode = BAD;
            break;
          } // !!! pako patch. Force use `options.windowBits` if passed.
          // Required to always use max window size by default.


          state.dmax = 1 << state.wbits; //state.dmax = 1 << len;
          //Tracev((stderr, "inflate:   zlib header ok\n"));

          strm.adler = state.check = 1
          /*adler32(0L, Z_NULL, 0)*/
          ;
          state.mode = hold & 0x200 ? DICTID : TYPE; //=== INITBITS();

          hold = 0;
          bits = 0; //===//

          break;

        case FLAGS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.flags = hold;

          if ((state.flags & 0xff) !== Z_DEFLATED) {
            strm.msg = 'unknown compression method';
            state.mode = BAD;
            break;
          }

          if (state.flags & 0xe000) {
            strm.msg = 'unknown header flags set';
            state.mode = BAD;
            break;
          }

          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }

          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = hold >>> 8 & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0); //===//
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//

          state.mode = TIME;

        /* falls through */

        case TIME:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if (state.head) {
            state.head.time = hold;
          }

          if (state.flags & 0x0200) {
            //=== CRC4(state.check, hold)
            hbuf[0] = hold & 0xff;
            hbuf[1] = hold >>> 8 & 0xff;
            hbuf[2] = hold >>> 16 & 0xff;
            hbuf[3] = hold >>> 24 & 0xff;
            state.check = crc32_1(state.check, hbuf, 4, 0); //===
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//

          state.mode = OS;

        /* falls through */

        case OS:
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if (state.head) {
            state.head.xflags = hold & 0xff;
            state.head.os = hold >> 8;
          }

          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = hold >>> 8 & 0xff;
            state.check = crc32_1(state.check, hbuf, 2, 0); //===//
          } //=== INITBITS();


          hold = 0;
          bits = 0; //===//

          state.mode = EXLEN;

        /* falls through */

        case EXLEN:
          if (state.flags & 0x0400) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            state.length = hold;

            if (state.head) {
              state.head.extra_len = hold;
            }

            if (state.flags & 0x0200) {
              //=== CRC2(state.check, hold);
              hbuf[0] = hold & 0xff;
              hbuf[1] = hold >>> 8 & 0xff;
              state.check = crc32_1(state.check, hbuf, 2, 0); //===//
            } //=== INITBITS();


            hold = 0;
            bits = 0; //===//
          } else if (state.head) {
            state.head.extra = null
            /*Z_NULL*/
            ;
          }

          state.mode = EXTRA;

        /* falls through */

        case EXTRA:
          if (state.flags & 0x0400) {
            copy = state.length;

            if (copy > have) {
              copy = have;
            }

            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;

                if (!state.head.extra) {
                  // Use untyped array for more convenient processing later
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }

                state.head.extra.set(input.subarray(next, // extra field is limited to 65536 bytes
                // - no need for additional size check
                next + copy),
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len); //zmemcpy(state.head.extra + len, next,
                //        len + copy > state.head.extra_max ?
                //        state.head.extra_max - len : copy);
              }

              if (state.flags & 0x0200) {
                state.check = crc32_1(state.check, input, copy, next);
              }

              have -= copy;
              next += copy;
              state.length -= copy;
            }

            if (state.length) {
              break inf_leave;
            }
          }

          state.length = 0;
          state.mode = NAME;

        /* falls through */

        case NAME:
          if (state.flags & 0x0800) {
            if (have === 0) {
              break inf_leave;
            }

            copy = 0;

            do {
              // TODO: 2 or 1 bytes?
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */

              if (state.head && len && state.length < 65536
              /*state.head.name_max*/
              ) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);

            if (state.flags & 0x0200) {
              state.check = crc32_1(state.check, input, copy, next);
            }

            have -= copy;
            next += copy;

            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }

          state.length = 0;
          state.mode = COMMENT;

        /* falls through */

        case COMMENT:
          if (state.flags & 0x1000) {
            if (have === 0) {
              break inf_leave;
            }

            copy = 0;

            do {
              len = input[next + copy++];
              /* use constant limit because in js we should not preallocate memory */

              if (state.head && len && state.length < 65536
              /*state.head.comm_max*/
              ) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);

            if (state.flags & 0x0200) {
              state.check = crc32_1(state.check, input, copy, next);
            }

            have -= copy;
            next += copy;

            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }

          state.mode = HCRC;

        /* falls through */

        case HCRC:
          if (state.flags & 0x0200) {
            //=== NEEDBITS(16); */
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            if (hold !== (state.check & 0xffff)) {
              strm.msg = 'header crc mismatch';
              state.mode = BAD;
              break;
            } //=== INITBITS();


            hold = 0;
            bits = 0; //===//
          }

          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }

          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;

        case DICTID:
          //=== NEEDBITS(32); */
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          strm.adler = state.check = zswap32(hold); //=== INITBITS();

          hold = 0;
          bits = 0; //===//

          state.mode = DICT;

        /* falls through */

        case DICT:
          if (state.havedict === 0) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits; //---

            return Z_NEED_DICT$1;
          }

          strm.adler = state.check = 1
          /*adler32(0L, Z_NULL, 0)*/
          ;
          state.mode = TYPE;

        /* falls through */

        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }

        /* falls through */

        case TYPEDO:
          if (state.last) {
            //--- BYTEBITS() ---//
            hold >>>= bits & 7;
            bits -= bits & 7; //---//

            state.mode = CHECK;
            break;
          } //=== NEEDBITS(3); */


          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.last = hold & 0x01
          /*BITS(1)*/
          ; //--- DROPBITS(1) ---//

          hold >>>= 1;
          bits -= 1; //---//

          switch (hold & 0x03) {
            case 0:
              /* stored block */
              //Tracev((stderr, "inflate:     stored block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = STORED;
              break;

            case 1:
              /* fixed block */
              fixedtables(state); //Tracev((stderr, "inflate:     fixed codes block%s\n",
              //        state.last ? " (last)" : ""));

              state.mode = LEN_;
              /* decode codes */

              if (flush === Z_TREES) {
                //--- DROPBITS(2) ---//
                hold >>>= 2;
                bits -= 2; //---//

                break inf_leave;
              }

              break;

            case 2:
              /* dynamic block */
              //Tracev((stderr, "inflate:     dynamic codes block%s\n",
              //        state.last ? " (last)" : ""));
              state.mode = TABLE;
              break;

            case 3:
              strm.msg = 'invalid block type';
              state.mode = BAD;
          } //--- DROPBITS(2) ---//


          hold >>>= 2;
          bits -= 2; //---//

          break;

        case STORED:
          //--- BYTEBITS() ---// /* go to byte boundary */
          hold >>>= bits & 7;
          bits -= bits & 7; //---//
          //=== NEEDBITS(32); */

          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          if ((hold & 0xffff) !== (hold >>> 16 ^ 0xffff)) {
            strm.msg = 'invalid stored block lengths';
            state.mode = BAD;
            break;
          }

          state.length = hold & 0xffff; //Tracev((stderr, "inflate:       stored length %u\n",
          //        state.length));
          //=== INITBITS();

          hold = 0;
          bits = 0; //===//

          state.mode = COPY_;

          if (flush === Z_TREES) {
            break inf_leave;
          }

        /* falls through */

        case COPY_:
          state.mode = COPY;

        /* falls through */

        case COPY:
          copy = state.length;

          if (copy) {
            if (copy > have) {
              copy = have;
            }

            if (copy > left) {
              copy = left;
            }

            if (copy === 0) {
              break inf_leave;
            } //--- zmemcpy(put, next, copy); ---


            output.set(input.subarray(next, next + copy), put); //---//

            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          } //Tracev((stderr, "inflate:       stored end\n"));


          state.mode = TYPE;
          break;

        case TABLE:
          //=== NEEDBITS(14); */
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8;
          } //===//


          state.nlen = (hold & 0x1f) + 257; //--- DROPBITS(5) ---//

          hold >>>= 5;
          bits -= 5; //---//

          state.ndist = (hold & 0x1f) + 1; //--- DROPBITS(5) ---//

          hold >>>= 5;
          bits -= 5; //---//

          state.ncode = (hold & 0x0f) + 4; //--- DROPBITS(4) ---//

          hold >>>= 4;
          bits -= 4; //---//
          //#ifndef PKZIP_BUG_WORKAROUND

          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = 'too many length or distance symbols';
            state.mode = BAD;
            break;
          } //#endif
          //Tracev((stderr, "inflate:       table sizes ok\n"));


          state.have = 0;
          state.mode = LENLENS;

        /* falls through */

        case LENLENS:
          while (state.have < state.ncode) {
            //=== NEEDBITS(3);
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            state.lens[order[state.have++]] = hold & 0x07; //BITS(3);
            //--- DROPBITS(3) ---//

            hold >>>= 3;
            bits -= 3; //---//
          }

          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          } // We have separate tables & no pointers. 2 commented lines below not needed.
          //state.next = state.codes;
          //state.lencode = state.next;
          // Switch to use dynamic table


          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = {
            bits: state.lenbits
          };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;

          if (ret) {
            strm.msg = 'invalid code lengths set';
            state.mode = BAD;
            break;
          } //Tracev((stderr, "inflate:       code lengths ok\n"));


          state.have = 0;
          state.mode = CODELENS;

        /* falls through */

        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;;) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              /*BITS(state.lenbits)*/

              here_bits = here >>> 24;
              here_op = here >>> 16 & 0xff;
              here_val = here & 0xffff;

              if (here_bits <= bits) {
                break;
              } //--- PULLBYTE() ---//


              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8; //---//
            }

            if (here_val < 16) {
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits; //---//

              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                //=== NEEDBITS(here.bits + 2);
                n = here_bits + 2;

                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }

                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                } //===//
                //--- DROPBITS(here.bits) ---//


                hold >>>= here_bits;
                bits -= here_bits; //---//

                if (state.have === 0) {
                  strm.msg = 'invalid bit length repeat';
                  state.mode = BAD;
                  break;
                }

                len = state.lens[state.have - 1];
                copy = 3 + (hold & 0x03); //BITS(2);
                //--- DROPBITS(2) ---//

                hold >>>= 2;
                bits -= 2; //---//
              } else if (here_val === 17) {
                //=== NEEDBITS(here.bits + 3);
                n = here_bits + 3;

                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }

                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                } //===//
                //--- DROPBITS(here.bits) ---//


                hold >>>= here_bits;
                bits -= here_bits; //---//

                len = 0;
                copy = 3 + (hold & 0x07); //BITS(3);
                //--- DROPBITS(3) ---//

                hold >>>= 3;
                bits -= 3; //---//
              } else {
                //=== NEEDBITS(here.bits + 7);
                n = here_bits + 7;

                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }

                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                } //===//
                //--- DROPBITS(here.bits) ---//


                hold >>>= here_bits;
                bits -= here_bits; //---//

                len = 0;
                copy = 11 + (hold & 0x7f); //BITS(7);
                //--- DROPBITS(7) ---//

                hold >>>= 7;
                bits -= 7; //---//
              }

              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }

              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          /* handle error breaks in while */


          if (state.mode === BAD) {
            break;
          }
          /* check for end-of-block code (better have one) */


          if (state.lens[256] === 0) {
            strm.msg = 'invalid code -- missing end-of-block';
            state.mode = BAD;
            break;
          }
          /* build code tables -- note: do not change the lenbits or distbits
             values here (9 and 6) without reading the comments in inftrees.h
             concerning the ENOUGH constants, which depend on those values */


          state.lenbits = 9;
          opts = {
            bits: state.lenbits
          };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts); // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;

          state.lenbits = opts.bits; // state.lencode = state.next;

          if (ret) {
            strm.msg = 'invalid literal/lengths set';
            state.mode = BAD;
            break;
          }

          state.distbits = 6; //state.distcode.copy(state.codes);
          // Switch to use dynamic table

          state.distcode = state.distdyn;
          opts = {
            bits: state.distbits
          };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts); // We have separate tables & no pointers. 2 commented lines below not needed.
          // state.next_index = opts.table_index;

          state.distbits = opts.bits; // state.distcode = state.next;

          if (ret) {
            strm.msg = 'invalid distances set';
            state.mode = BAD;
            break;
          } //Tracev((stderr, 'inflate:       codes ok\n'));


          state.mode = LEN_;

          if (flush === Z_TREES) {
            break inf_leave;
          }

        /* falls through */

        case LEN_:
          state.mode = LEN;

        /* falls through */

        case LEN:
          if (have >= 6 && left >= 258) {
            //--- RESTORE() ---
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits; //---

            inffast(strm, _out); //--- LOAD() ---

            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits; //---

            if (state.mode === TYPE) {
              state.back = -1;
            }

            break;
          }

          state.back = 0;

          for (;;) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            /*BITS(state.lenbits)*/

            here_bits = here >>> 24;
            here_op = here >>> 16 & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            } //--- PULLBYTE() ---//


            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8; //---//
          }

          if (here_op && (here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;

            for (;;) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 0xff;
              here_val = here & 0xffff;

              if (last_bits + here_bits <= bits) {
                break;
              } //--- PULLBYTE() ---//


              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8; //---//
            } //--- DROPBITS(last.bits) ---//


            hold >>>= last_bits;
            bits -= last_bits; //---//

            state.back += last_bits;
          } //--- DROPBITS(here.bits) ---//


          hold >>>= here_bits;
          bits -= here_bits; //---//

          state.back += here_bits;
          state.length = here_val;

          if (here_op === 0) {
            //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
            //        "inflate:         literal '%c'\n" :
            //        "inflate:         literal 0x%02x\n", here.val));
            state.mode = LIT;
            break;
          }

          if (here_op & 32) {
            //Tracevv((stderr, "inflate:         end of block\n"));
            state.back = -1;
            state.mode = TYPE;
            break;
          }

          if (here_op & 64) {
            strm.msg = 'invalid literal/length code';
            state.mode = BAD;
            break;
          }

          state.extra = here_op & 15;
          state.mode = LENEXT;

        /* falls through */

        case LENEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;

            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            state.length += hold & (1 << state.extra) - 1
            /*BITS(state.extra)*/
            ; //--- DROPBITS(state.extra) ---//

            hold >>>= state.extra;
            bits -= state.extra; //---//

            state.back += state.extra;
          } //Tracevv((stderr, "inflate:         length %u\n", state.length));


          state.was = state.length;
          state.mode = DIST;

        /* falls through */

        case DIST:
          for (;;) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            /*BITS(state.distbits)*/

            here_bits = here >>> 24;
            here_op = here >>> 16 & 0xff;
            here_val = here & 0xffff;

            if (here_bits <= bits) {
              break;
            } //--- PULLBYTE() ---//


            if (have === 0) {
              break inf_leave;
            }

            have--;
            hold += input[next++] << bits;
            bits += 8; //---//
          }

          if ((here_op & 0xf0) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;

            for (;;) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 0xff;
              here_val = here & 0xffff;

              if (last_bits + here_bits <= bits) {
                break;
              } //--- PULLBYTE() ---//


              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8; //---//
            } //--- DROPBITS(last.bits) ---//


            hold >>>= last_bits;
            bits -= last_bits; //---//

            state.back += last_bits;
          } //--- DROPBITS(here.bits) ---//


          hold >>>= here_bits;
          bits -= here_bits; //---//

          state.back += here_bits;

          if (here_op & 64) {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break;
          }

          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;

        /* falls through */

        case DISTEXT:
          if (state.extra) {
            //=== NEEDBITS(state.extra);
            n = state.extra;

            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            state.offset += hold & (1 << state.extra) - 1
            /*BITS(state.extra)*/
            ; //--- DROPBITS(state.extra) ---//

            hold >>>= state.extra;
            bits -= state.extra; //---//

            state.back += state.extra;
          } //#ifdef INFLATE_STRICT


          if (state.offset > state.dmax) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          } //#endif
          //Tracevv((stderr, "inflate:         distance %u\n", state.offset));


          state.mode = MATCH;

        /* falls through */

        case MATCH:
          if (left === 0) {
            break inf_leave;
          }

          copy = _out - left;

          if (state.offset > copy) {
            /* copy from window */
            copy = state.offset - copy;

            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = 'invalid distance too far back';
                state.mode = BAD;
                break;
              } // (!) This block is disabled in zlib defaults,
              // don't enable it for binary compatibility
              //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
              //          Trace((stderr, "inflate.c too far\n"));
              //          copy -= state.whave;
              //          if (copy > state.length) { copy = state.length; }
              //          if (copy > left) { copy = left; }
              //          left -= copy;
              //          state.length -= copy;
              //          do {
              //            output[put++] = 0;
              //          } while (--copy);
              //          if (state.length === 0) { state.mode = LEN; }
              //          break;
              //#endif

            }

            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }

            if (copy > state.length) {
              copy = state.length;
            }

            from_source = state.window;
          } else {
            /* copy from output */
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }

          if (copy > left) {
            copy = left;
          }

          left -= copy;
          state.length -= copy;

          do {
            output[put++] = from_source[from++];
          } while (--copy);

          if (state.length === 0) {
            state.mode = LEN;
          }

          break;

        case LIT:
          if (left === 0) {
            break inf_leave;
          }

          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;

        case CHECK:
          if (state.wrap) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }

              have--; // Use '|' instead of '+' to make sure that result is signed

              hold |= input[next++] << bits;
              bits += 8;
            } //===//


            _out -= left;
            strm.total_out += _out;
            state.total += _out;

            if (_out) {
              strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }

            _out = left; // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too

            if ((state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = 'incorrect data check';
              state.mode = BAD;
              break;
            } //=== INITBITS();


            hold = 0;
            bits = 0; //===//
            //Tracev((stderr, "inflate:   check matches trailer\n"));
          }

          state.mode = LENGTH;

        /* falls through */

        case LENGTH:
          if (state.wrap && state.flags) {
            //=== NEEDBITS(32);
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }

              have--;
              hold += input[next++] << bits;
              bits += 8;
            } //===//


            if (hold !== (state.total & 0xffffffff)) {
              strm.msg = 'incorrect length check';
              state.mode = BAD;
              break;
            } //=== INITBITS();


            hold = 0;
            bits = 0; //===//
            //Tracev((stderr, "inflate:   length matches trailer\n"));
          }

          state.mode = DONE;

        /* falls through */

        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;

        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;

        case MEM:
          return Z_MEM_ERROR$1;

        case SYNC:
        /* falls through */

        default:
          return Z_STREAM_ERROR$1;
      }
    } // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

    /*
       Return from inflate(), updating the total counts and the check value.
       If there was no progress during the inflate() call, return a buffer
       error.  Call updatewindow() to create and/or update the window state.
       Note: a memory error from inflate() is non-recoverable.
     */
    //--- RESTORE() ---


    strm.next_out = put;
    strm.avail_out = left;
    strm.next_in = next;
    strm.avail_in = have;
    state.hold = hold;
    state.bits = bits; //---

    if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
      if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
    }

    _in -= strm.avail_in;
    _out -= strm.avail_out;
    strm.total_in += _in;
    strm.total_out += _out;
    state.total += _out;

    if (state.wrap && _out) {
      strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
    }

    strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);

    if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
      ret = Z_BUF_ERROR;
    }

    return ret;
  };

  var inflateEnd = function inflateEnd(strm) {
    if (!strm || !strm.state
    /*|| strm->zfree == (free_func)0*/
    ) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;

    if (state.window) {
      state.window = null;
    }

    strm.state = null;
    return Z_OK$1;
  };

  var inflateGetHeader = function inflateGetHeader(strm, head) {
    /* check state */
    if (!strm || !strm.state) {
      return Z_STREAM_ERROR$1;
    }

    var state = strm.state;

    if ((state.wrap & 2) === 0) {
      return Z_STREAM_ERROR$1;
    }
    /* save header structure */


    state.head = head;
    head.done = false;
    return Z_OK$1;
  };

  var inflateSetDictionary = function inflateSetDictionary(strm, dictionary) {
    var dictLength = dictionary.length;
    var state;
    var dictid;
    var ret;
    /* check state */

    if (!strm
    /* == Z_NULL */
    || !strm.state
    /* == Z_NULL */
    ) {
      return Z_STREAM_ERROR$1;
    }

    state = strm.state;

    if (state.wrap !== 0 && state.mode !== DICT) {
      return Z_STREAM_ERROR$1;
    }
    /* check for correct dictionary identifier */


    if (state.mode === DICT) {
      dictid = 1;
      /* adler32(0, null, 0)*/

      /* dictid = adler32(dictid, dictionary, dictLength); */

      dictid = adler32_1(dictid, dictionary, dictLength, 0);

      if (dictid !== state.check) {
        return Z_DATA_ERROR$1;
      }
    }
    /* copy dictionary to window using updatewindow(), which will amend the
     existing dictionary if appropriate */


    ret = updatewindow(strm, dictionary, dictLength, dictLength);

    if (ret) {
      state.mode = MEM;
      return Z_MEM_ERROR$1;
    }

    state.havedict = 1; // Tracev((stderr, "inflate:   dictionary set\n"));

    return Z_OK$1;
  };

  var inflateReset_1 = inflateReset;
  var inflateReset2_1 = inflateReset2;
  var inflateResetKeep_1 = inflateResetKeep;
  var inflateInit_1 = inflateInit;
  var inflateInit2_1 = inflateInit2;
  var inflate_2$1 = inflate$2;
  var inflateEnd_1 = inflateEnd;
  var inflateGetHeader_1 = inflateGetHeader;
  var inflateSetDictionary_1 = inflateSetDictionary;
  var inflateInfo = 'pako inflate (from Nodeca project)';
  /* Not implemented
  module.exports.inflateCopy = inflateCopy;
  module.exports.inflateGetDictionary = inflateGetDictionary;
  module.exports.inflateMark = inflateMark;
  module.exports.inflatePrime = inflatePrime;
  module.exports.inflateSync = inflateSync;
  module.exports.inflateSyncPoint = inflateSyncPoint;
  module.exports.inflateUndermine = inflateUndermine;
  */

  var inflate_1$2 = {
    inflateReset: inflateReset_1,
    inflateReset2: inflateReset2_1,
    inflateResetKeep: inflateResetKeep_1,
    inflateInit: inflateInit_1,
    inflateInit2: inflateInit2_1,
    inflate: inflate_2$1,
    inflateEnd: inflateEnd_1,
    inflateGetHeader: inflateGetHeader_1,
    inflateSetDictionary: inflateSetDictionary_1,
    inflateInfo: inflateInfo
  };

  // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
  //
  // This software is provided 'as-is', without any express or implied
  // warranty. In no event will the authors be held liable for any damages
  // arising from the use of this software.
  //
  // Permission is granted to anyone to use this software for any purpose,
  // including commercial applications, and to alter it and redistribute it
  // freely, subject to the following restrictions:
  //
  // 1. The origin of this software must not be misrepresented; you must not
  //   claim that you wrote the original software. If you use this software
  //   in a product, an acknowledgment in the product documentation would be
  //   appreciated but is not required.
  // 2. Altered source versions must be plainly marked as such, and must not be
  //   misrepresented as being the original software.
  // 3. This notice may not be removed or altered from any source distribution.

  function GZheader() {
    /* true if compressed data believed to be text */
    this.text = 0;
    /* modification time */

    this.time = 0;
    /* extra flags (not used when writing a gzip file) */

    this.xflags = 0;
    /* operating system */

    this.os = 0;
    /* pointer to extra field or Z_NULL if none */

    this.extra = null;
    /* extra field length (valid if extra != Z_NULL) */

    this.extra_len = 0; // Actually, we don't need it in JS,
    // but leave for few code modifications
    //
    // Setup limits is not necessary because in js we should not preallocate memory
    // for inflate use constant limit in 65536 bytes
    //

    /* space at extra (only when reading header) */
    // this.extra_max  = 0;

    /* pointer to zero-terminated file name or Z_NULL */

    this.name = '';
    /* space at name (only when reading header) */
    // this.name_max   = 0;

    /* pointer to zero-terminated comment or Z_NULL */

    this.comment = '';
    /* space at comment (only when reading header) */
    // this.comm_max   = 0;

    /* true if there was or will be a header crc */

    this.hcrc = 0;
    /* true when done reading gzip header (not used when writing a gzip file) */

    this.done = false;
  }

  var gzheader = GZheader;

  var toString = Object.prototype.toString;
  /* Public constants ==========================================================*/

  /* ===========================================================================*/

  var Z_NO_FLUSH = constants$2.Z_NO_FLUSH,
      Z_FINISH = constants$2.Z_FINISH,
      Z_OK = constants$2.Z_OK,
      Z_STREAM_END = constants$2.Z_STREAM_END,
      Z_NEED_DICT = constants$2.Z_NEED_DICT,
      Z_STREAM_ERROR = constants$2.Z_STREAM_ERROR,
      Z_DATA_ERROR = constants$2.Z_DATA_ERROR,
      Z_MEM_ERROR = constants$2.Z_MEM_ERROR;
  /* ===========================================================================*/

  /**
   * class Inflate
   *
   * Generic JS-style wrapper for zlib calls. If you don't need
   * streaming behaviour - use more simple functions: [[inflate]]
   * and [[inflateRaw]].
   **/

  /* internal
   * inflate.chunks -> Array
   *
   * Chunks of output data, if [[Inflate#onData]] not overridden.
   **/

  /**
   * Inflate.result -> Uint8Array|String
   *
   * Uncompressed result, generated by default [[Inflate#onData]]
   * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
   * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
   **/

  /**
   * Inflate.err -> Number
   *
   * Error code after inflate finished. 0 (Z_OK) on success.
   * Should be checked if broken data possible.
   **/

  /**
   * Inflate.msg -> String
   *
   * Error message, if [[Inflate.err]] != 0
   **/

  /**
   * new Inflate(options)
   * - options (Object): zlib inflate options.
   *
   * Creates new inflator instance with specified params. Throws exception
   * on bad params. Supported options:
   *
   * - `windowBits`
   * - `dictionary`
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information on these.
   *
   * Additional options, for internal needs:
   *
   * - `chunkSize` - size of generated data chunks (16K by default)
   * - `raw` (Boolean) - do raw inflate
   * - `to` (String) - if equal to 'string', then result will be converted
   *   from utf8 to utf16 (javascript) string. When string output requested,
   *   chunk length can differ from `chunkSize`, depending on content.
   *
   * By default, when no options set, autodetect deflate/gzip data format via
   * wrapper header.
   *
   * ##### Example:
   *
   * ```javascript
   * const pako = require('pako')
   * const chunk1 = new Uint8Array([1,2,3,4,5,6,7,8,9])
   * const chunk2 = new Uint8Array([10,11,12,13,14,15,16,17,18,19]);
   *
   * const inflate = new pako.Inflate({ level: 3});
   *
   * inflate.push(chunk1, false);
   * inflate.push(chunk2, true);  // true -> last chunk
   *
   * if (inflate.err) { throw new Error(inflate.err); }
   *
   * console.log(inflate.result);
   * ```
   **/

  function Inflate$1(options) {
    this.options = common.assign({
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ''
    }, options || {});
    var opt = this.options; // Force window size for `raw` data, if not set directly,
    // because we have no header for autodetect.

    if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
      opt.windowBits = -opt.windowBits;

      if (opt.windowBits === 0) {
        opt.windowBits = -15;
      }
    } // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate


    if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
      opt.windowBits += 32;
    } // Gzip header has no info about windows size, we can do autodetect only
    // for deflate. So, if window size not set, force it to max when gzip possible


    if (opt.windowBits > 15 && opt.windowBits < 48) {
      // bit 3 (16) -> gzipped data
      // bit 4 (32) -> autodetect gzip/deflate
      if ((opt.windowBits & 15) === 0) {
        opt.windowBits |= 15;
      }
    }

    this.err = 0; // error code, if happens (0 = Z_OK)

    this.msg = ''; // error message

    this.ended = false; // used to avoid multiple onEnd() calls

    this.chunks = []; // chunks of compressed data

    this.strm = new zstream();
    this.strm.avail_out = 0;
    var status = inflate_1$2.inflateInit2(this.strm, opt.windowBits);

    if (status !== Z_OK) {
      throw new Error(messages[status]);
    }

    this.header = new gzheader();
    inflate_1$2.inflateGetHeader(this.strm, this.header); // Setup dictionary

    if (opt.dictionary) {
      // Convert data if needed
      if (typeof opt.dictionary === 'string') {
        opt.dictionary = strings.string2buf(opt.dictionary);
      } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
        opt.dictionary = new Uint8Array(opt.dictionary);
      }

      if (opt.raw) {
        //In raw mode we need to set the dictionary early
        status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);

        if (status !== Z_OK) {
          throw new Error(messages[status]);
        }
      }
    }
  }
  /**
   * Inflate#push(data[, flush_mode]) -> Boolean
   * - data (Uint8Array|ArrayBuffer): input data
   * - flush_mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE
   *   flush modes. See constants. Skipped or `false` means Z_NO_FLUSH,
   *   `true` means Z_FINISH.
   *
   * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
   * new output chunks. Returns `true` on success. If end of stream detected,
   * [[Inflate#onEnd]] will be called.
   *
   * `flush_mode` is not needed for normal operation, because end of stream
   * detected automatically. You may try to use it for advanced things, but
   * this functionality was not tested.
   *
   * On fail call [[Inflate#onEnd]] with error code and return false.
   *
   * ##### Example
   *
   * ```javascript
   * push(chunk, false); // push one of data chunks
   * ...
   * push(chunk, true);  // push last chunk
   * ```
   **/


  Inflate$1.prototype.push = function (data, flush_mode) {
    var strm = this.strm;
    var chunkSize = this.options.chunkSize;
    var dictionary = this.options.dictionary;

    var status, _flush_mode, last_avail_out;

    if (this.ended) return false;
    if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH; // Convert data if needed

    if (toString.call(data) === '[object ArrayBuffer]') {
      strm.input = new Uint8Array(data);
    } else {
      strm.input = data;
    }

    strm.next_in = 0;
    strm.avail_in = strm.input.length;

    for (;;) {
      if (strm.avail_out === 0) {
        strm.output = new Uint8Array(chunkSize);
        strm.next_out = 0;
        strm.avail_out = chunkSize;
      }

      status = inflate_1$2.inflate(strm, _flush_mode);

      if (status === Z_NEED_DICT && dictionary) {
        status = inflate_1$2.inflateSetDictionary(strm, dictionary);

        if (status === Z_OK) {
          status = inflate_1$2.inflate(strm, _flush_mode);
        } else if (status === Z_DATA_ERROR) {
          // Replace code with more verbose
          status = Z_NEED_DICT;
        }
      } // Skip snyc markers if more data follows and not raw mode


      while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
        inflate_1$2.inflateReset(strm);
        status = inflate_1$2.inflate(strm, _flush_mode);
      }

      switch (status) {
        case Z_STREAM_ERROR:
        case Z_DATA_ERROR:
        case Z_NEED_DICT:
        case Z_MEM_ERROR:
          this.onEnd(status);
          this.ended = true;
          return false;
      } // Remember real `avail_out` value, because we may patch out buffer content
      // to align utf8 strings boundaries.


      last_avail_out = strm.avail_out;

      if (strm.next_out) {
        if (strm.avail_out === 0 || status === Z_STREAM_END) {
          if (this.options.to === 'string') {
            var next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
            var tail = strm.next_out - next_out_utf8;
            var utf8str = strings.buf2string(strm.output, next_out_utf8); // move tail & realign counters

            strm.next_out = tail;
            strm.avail_out = chunkSize - tail;
            if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
            this.onData(utf8str);
          } else {
            this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
          }
        }
      } // Must repeat iteration if out buffer is full


      if (status === Z_OK && last_avail_out === 0) continue; // Finalize if end of stream reached.

      if (status === Z_STREAM_END) {
        status = inflate_1$2.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return true;
      }

      if (strm.avail_in === 0) break;
    }

    return true;
  };
  /**
   * Inflate#onData(chunk) -> Void
   * - chunk (Uint8Array|String): output data. When string output requested,
   *   each chunk will be string.
   *
   * By default, stores data blocks in `chunks[]` property and glue
   * those in `onEnd`. Override this handler, if you need another behaviour.
   **/


  Inflate$1.prototype.onData = function (chunk) {
    this.chunks.push(chunk);
  };
  /**
   * Inflate#onEnd(status) -> Void
   * - status (Number): inflate status. 0 (Z_OK) on success,
   *   other if not.
   *
   * Called either after you tell inflate that the input stream is
   * complete (Z_FINISH). By default - join collected chunks,
   * free memory and fill `results` / `err` properties.
   **/


  Inflate$1.prototype.onEnd = function (status) {
    // On success - join
    if (status === Z_OK) {
      if (this.options.to === 'string') {
        this.result = this.chunks.join('');
      } else {
        this.result = common.flattenChunks(this.chunks);
      }
    }

    this.chunks = [];
    this.err = status;
    this.msg = this.strm.msg;
  };
  /**
   * inflate(data[, options]) -> Uint8Array|String
   * - data (Uint8Array): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * Decompress `data` with inflate/ungzip and `options`. Autodetect
   * format via wrapper header by default. That's why we don't provide
   * separate `ungzip` method.
   *
   * Supported options are:
   *
   * - windowBits
   *
   * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
   * for more information.
   *
   * Sugar (options):
   *
   * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
   *   negative windowBits implicitly.
   * - `to` (String) - if equal to 'string', then result will be converted
   *   from utf8 to utf16 (javascript) string. When string output requested,
   *   chunk length can differ from `chunkSize`, depending on content.
   *
   *
   * ##### Example:
   *
   * ```javascript
   * const pako = require('pako');
   * const input = pako.deflate(new Uint8Array([1,2,3,4,5,6,7,8,9]));
   * let output;
   *
   * try {
   *   output = pako.inflate(input);
   * } catch (err) {
   *   console.log(err);
   * }
   * ```
   **/


  function inflate$1(input, options) {
    var inflator = new Inflate$1(options);
    inflator.push(input); // That will never happens, if you don't cheat with options :)

    if (inflator.err) throw inflator.msg || messages[inflator.err];
    return inflator.result;
  }
  /**
   * inflateRaw(data[, options]) -> Uint8Array|String
   * - data (Uint8Array): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * The same as [[inflate]], but creates raw data, without wrapper
   * (header and adler32 crc).
   **/


  function inflateRaw$1(input, options) {
    options = options || {};
    options.raw = true;
    return inflate$1(input, options);
  }
  /**
   * ungzip(data[, options]) -> Uint8Array|String
   * - data (Uint8Array): input data to decompress.
   * - options (Object): zlib inflate options.
   *
   * Just shortcut to [[inflate]], because it autodetects format
   * by header.content. Done for convenience.
   **/


  var Inflate_1$1 = Inflate$1;
  var inflate_2 = inflate$1;
  var inflateRaw_1$1 = inflateRaw$1;
  var ungzip$1 = inflate$1;
  var constants = constants$2;
  var inflate_1$1 = {
    Inflate: Inflate_1$1,
    inflate: inflate_2,
    inflateRaw: inflateRaw_1$1,
    ungzip: ungzip$1,
    constants: constants
  };

  var Deflate = deflate_1$1.Deflate,
      deflate = deflate_1$1.deflate,
      deflateRaw = deflate_1$1.deflateRaw,
      gzip = deflate_1$1.gzip;
  var Inflate = inflate_1$1.Inflate,
      inflate = inflate_1$1.inflate,
      inflateRaw = inflate_1$1.inflateRaw,
      ungzip = inflate_1$1.ungzip;
  var Deflate_1 = Deflate;
  var deflate_1 = deflate;
  var deflateRaw_1 = deflateRaw;
  var gzip_1 = gzip;
  var Inflate_1 = Inflate;
  var inflate_1 = inflate;
  var inflateRaw_1 = inflateRaw;
  var ungzip_1 = ungzip;
  var constants_1 = constants$2;
  var pako = {
    Deflate: Deflate_1,
    deflate: deflate_1,
    deflateRaw: deflateRaw_1,
    gzip: gzip_1,
    Inflate: Inflate_1,
    inflate: inflate_1,
    inflateRaw: inflateRaw_1,
    ungzip: ungzip_1,
    constants: constants_1
  };

  exports.Deflate = Deflate_1;
  exports.Inflate = Inflate_1;
  exports.constants = constants_1;
  exports['default'] = pako;
  exports.deflate = deflate_1;
  exports.deflateRaw = deflateRaw_1;
  exports.gzip = gzip_1;
  exports.inflate = inflate_1;
  exports.inflateRaw = inflateRaw_1;
  exports.ungzip = ungzip_1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ "./node_modules/pizzip/utils/es6/index.js":
/*!************************************************!*\
  !*** ./node_modules/pizzip/utils/es6/index.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


const PizZipUtils = {};
// just use the responseText with xhr1, response with xhr2.
// The transformation doesn't throw away high-order byte (with responseText)
// because PizZip handles that case. If not used with PizZip, you may need to
// do it, see https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
PizZipUtils._getBinaryFromXHR = function (xhr) {
	// for xhr.responseText, the 0xFF mask is applied by PizZip
	return xhr.response || xhr.responseText;
};

// taken from jQuery
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch (e) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch (e) {}
}

// Create the request object
const createXHR = window.ActiveXObject
	? /* Microsoft failed to properly
	   * implement the XMLHttpRequest in IE7 (can't request local files),
	   * so we use the ActiveXObject when it is available
	   * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	   * we need a fallback.
	   */
	  function () {
			return createStandardXHR() || createActiveXHR();
	  }
	: // For all other browsers, use the standard XMLHttpRequest object
	  createStandardXHR;

PizZipUtils.getBinaryContent = function (path, callback) {
	/*
	 * Here is the tricky part : getting the data.
	 * In firefox/chrome/opera/... setting the mimeType to 'text/plain; charset=x-user-defined'
	 * is enough, the result is in the standard xhr.responseText.
	 * cf https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest#Receiving_binary_data_in_older_browsers
	 * In IE <= 9, we must use (the IE only) attribute responseBody
	 * (for binary data, its content is different from responseText).
	 * In IE 10, the 'charset=x-user-defined' trick doesn't work, only the
	 * responseType will work :
	 * http://msdn.microsoft.com/en-us/library/ie/hh673569%28v=vs.85%29.aspx#Binary_Object_upload_and_download
	 *
	 * I'd like to use jQuery to avoid this XHR madness, but it doesn't support
	 * the responseType attribute : http://bugs.jquery.com/ticket/11461
	 */
	try {
		const xhr = createXHR();

		xhr.open("GET", path, true);

		// recent browsers
		if ("responseType" in xhr) {
			xhr.responseType = "arraybuffer";
		}

		// older browser
		if (xhr.overrideMimeType) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}

		xhr.onreadystatechange = function (evt) {
			let file, err;
			// use `xhr` and not `this`... thanks IE
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 0) {
					file = null;
					err = null;
					try {
						file = PizZipUtils._getBinaryFromXHR(xhr);
					} catch (e) {
						err = new Error(e);
					}
					callback(err, file);
				} else {
					callback(
						new Error(
							"Ajax error for " +
								path +
								" : " +
								this.status +
								" " +
								this.statusText
						),
						null
					);
				}
			}
		};

		xhr.send();
	} catch (e) {
		callback(new Error(e), null);
	}
};

module.exports = PizZipUtils;


/***/ }),

/***/ "./node_modules/pizzip/utils/index.js":
/*!********************************************!*\
  !*** ./node_modules/pizzip/utils/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./es6/index.js */ "./node_modules/pizzip/utils/es6/index.js");


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

/***/ "./resources/assets/js/components/real_estate_management/index.vue":
/*!*************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/index.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=163f288f& */ "./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__.render,
  _index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/real_estate_management/index.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_163f288f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./index.vue?vue&type=template&id=163f288f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/assets/js/components/real_estate_management/index.vue?vue&type=template&id=163f288f& ***!
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
  return _c(
    "form",
    {
      staticClass: "form-horizontal",
      attrs: { "accept-charset": "UTF-8", enctype: "multipart/form-data" }
    },
    [
      _c("input", { attrs: { name: "_token", type: "hidden", value: "xxx" } }),
      _vm._v(" "),
      _c("div", [
        _c("div", { staticClass: "box" }, [
          _c("div", { staticClass: "box-body" }, [
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
                _c(
                  "a",
                  {
                    staticClass: "btn btn-success",
                    attrs: { href: "real-estate-management/create" }
                  },
                  [
                    _c("i", { staticClass: "fa fa-plus fa-fw" }),
                    _vm._v(_vm._s(_vm.$t("firefly.add_new_apartment")))
                  ]
                ),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.selectedAccountId,
                        expression: "selectedAccountId"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { name: "account", id: "account" },
                    on: {
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
                          _vm.selectedAccountId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                        _vm.selectAccount
                      ]
                    }
                  },
                  [
                    _c("option", { attrs: { value: "", label: "All" } }),
                    _vm._v(" "),
                    _vm._l(_vm.accounts, function(account) {
                      return _c(
                        "option",
                        { key: account.id, domProps: { value: account.id } },
                        [_vm._v(_vm._s(account.name))]
                      )
                    })
                  ],
                  2
                )
              ]
            ),
            _vm._v(" "),
            _vm.isFilter
              ? _c("div", { staticStyle: { margin: "20px 0px 20px 0px" } }, [
                  _c(
                    "div",
                    {
                      staticStyle: {
                        display: "flex",
                        "align-items": "center",
                        "margin-bottom": "8px"
                      }
                    },
                    [
                      _c(
                        "span",
                        {
                          staticStyle: {
                            color: "#87a6eb",
                            "font-size": "18px",
                            "font-weight": "500",
                            cursor: "pointer",
                            "padding-left": "10px"
                          },
                          on: {
                            click: function($event) {
                              return _vm.selectAccountByAsset(
                                _vm.selectedAccount.id
                              )
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.selectedAccount.name))]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "apartment_list_table_container" }, [
                    _c(
                      "table",
                      {
                        staticClass:
                          "table table-responsive table-hover apartment_list_table",
                        attrs: { id: "sortable-table" }
                      },
                      [
                        _c("thead", [
                          _c(
                            "th",
                            {
                              staticClass: "text-left",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.apt")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-left",
                              staticStyle: { width: "12%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.name")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.utilities")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.raw_rent")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.utilities_total")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-center",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.vat%")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              staticStyle: { width: "11%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.total_rent")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "th",
                            {
                              staticClass: "text-right",
                              staticStyle: { width: "12%" }
                            },
                            [_vm._v(_vm._s(_vm.$t("firefly.deposit_account")))]
                          ),
                          _vm._v(" "),
                          _c("th", {
                            staticClass: "text-right",
                            staticStyle: { width: "10%" }
                          })
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.selectedAccount.apartments, function(
                          apartment,
                          index
                        ) {
                          return _c(
                            "tr",
                            {
                              key: apartment.id,
                              staticClass: "sortable-object apartment_row"
                            },
                            [
                              _c("td", { staticClass: "text-left" }, [
                                _vm._v(_vm._s(index + 1))
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
                                  [
                                    _vm._v(
                                      _vm._s(apartment.renter_account.name)
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-right" }, [
                                _vm._v(_vm._s(apartment.utilities))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-right" }, [
                                _vm._v(_vm._s(apartment.rawRent))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-right" }, [
                                _vm._v(_vm._s(apartment.utilitiesTotal))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-center" }, [
                                _vm._v(_vm._s(apartment.vat))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-right" }, [
                                _vm._v(_vm._s(apartment.totalRent))
                              ]),
                              _vm._v(" "),
                              _c("td", { staticClass: "text-right" }, [
                                _c(
                                  "a",
                                  {
                                    attrs: {
                                      href:
                                        "/accounts/show/" +
                                        apartment.source_account.id
                                    }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(apartment.source_account.name)
                                    )
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c("td", { staticStyle: {} }, [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "btn-group btn-group-xs pull-right"
                                  },
                                  [
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-default dropdown-toggle",
                                        attrs: {
                                          type: "button",
                                          "data-toggle": "dropdown",
                                          "aria-haspopup": "true",
                                          "aria-expanded": "false"
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(_vm.$t("firefly.actions")) +
                                            " "
                                        ),
                                        _c("span", { staticClass: "caret" })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "ul",
                                      {
                                        staticClass:
                                          "dropdown-menu dropdown-menu-right",
                                        attrs: { role: "menu" }
                                      },
                                      [
                                        _c("li", [
                                          _c(
                                            "a",
                                            {
                                              attrs: {
                                                href:
                                                  "real-estate-management/edit/" +
                                                  apartment.id
                                              }
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "fa fa-fw fa-pencil"
                                              }),
                                              _vm._v(
                                                " \n                                  " +
                                                  _vm._s(
                                                    _vm.$t("firefly.edit")
                                                  ) +
                                                  "\n                                "
                                              )
                                            ]
                                          )
                                        ])
                                      ]
                                    )
                                  ]
                                )
                              ])
                            ]
                          )
                        })
                      ],
                      2
                    )
                  ])
                ])
              : _c(
                  "div",
                  { staticStyle: { margin: "20px 0px 20px 0px" } },
                  _vm._l(_vm.accounts, function(account) {
                    return _c("div", { key: account.id }, [
                      _c(
                        "div",
                        {
                          staticStyle: {
                            display: "flex",
                            "align-items": "center",
                            "margin-bottom": "8px"
                          }
                        },
                        [
                          _c(
                            "span",
                            {
                              staticStyle: {
                                color: "#87a6eb",
                                "font-size": "18px",
                                "font-weight": "500",
                                cursor: "pointer",
                                "padding-left": "10px"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.selectAccountByAsset(account.id)
                                }
                              }
                            },
                            [_vm._v(_vm._s(account.name))]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "apartment_list_table_container" },
                        [
                          _c(
                            "table",
                            {
                              staticClass:
                                "table table-responsive table-hover apartment_list_table",
                              attrs: { id: "sortable-table" }
                            },
                            [
                              _c("thead", [
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-left",
                                    staticStyle: { width: "11%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.apt")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-left",
                                    staticStyle: { width: "12%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.name")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-right",
                                    staticStyle: { width: "11%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.utilities")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-right",
                                    staticStyle: { width: "11%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.raw_rent")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-right",
                                    staticStyle: { width: "11%" }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$t("firefly.utilities_total"))
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-center",
                                    staticStyle: { width: "11%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.vat%")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-right",
                                    staticStyle: { width: "11%" }
                                  },
                                  [_vm._v(_vm._s(_vm.$t("firefly.total_rent")))]
                                ),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  {
                                    staticClass: "text-right",
                                    staticStyle: { width: "12%" }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(_vm.$t("firefly.deposit_account"))
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("th", {
                                  staticClass: "text-right",
                                  staticStyle: { width: "10%" }
                                })
                              ]),
                              _vm._v(" "),
                              _vm._l(account.apartments, function(
                                apartment,
                                index
                              ) {
                                return _c(
                                  "tr",
                                  {
                                    key: apartment.id,
                                    staticClass: "sortable-object apartment_row"
                                  },
                                  [
                                    _c("td", { staticClass: "text-left" }, [
                                      _vm._v(_vm._s(index + 1))
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
                                        [
                                          _vm._v(
                                            _vm._s(
                                              apartment.renter_account.name
                                            )
                                          )
                                        ]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-right" }, [
                                      _vm._v(_vm._s(apartment.utilities))
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-right" }, [
                                      _vm._v(_vm._s(apartment.rawRent))
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-right" }, [
                                      _vm._v(_vm._s(apartment.utilitiesTotal))
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-center" }, [
                                      _vm._v(_vm._s(apartment.vat))
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-right" }, [
                                      _vm._v(_vm._s(apartment.totalRent))
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticClass: "text-right" }, [
                                      _c(
                                        "a",
                                        {
                                          attrs: {
                                            href:
                                              "/accounts/show/" +
                                              apartment.source_account.id
                                          }
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              apartment.source_account.name
                                            )
                                          )
                                        ]
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("td", { staticStyle: {} }, [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "btn-group btn-group-xs pull-right"
                                        },
                                        [
                                          _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-default dropdown-toggle",
                                              attrs: {
                                                type: "button",
                                                "data-toggle": "dropdown",
                                                "aria-haspopup": "true",
                                                "aria-expanded": "false"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                            " +
                                                  _vm._s(
                                                    _vm.$t("firefly.actions")
                                                  ) +
                                                  " "
                                              ),
                                              _c("span", {
                                                staticClass: "caret"
                                              })
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "ul",
                                            {
                                              staticClass:
                                                "dropdown-menu dropdown-menu-right",
                                              attrs: { role: "menu" }
                                            },
                                            [
                                              _c("li", [
                                                _c(
                                                  "a",
                                                  {
                                                    attrs: {
                                                      href:
                                                        "real-estate-management/edit/" +
                                                        apartment.id
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-fw fa-pencil"
                                                    }),
                                                    _vm._v(
                                                      " \n                                  " +
                                                        _vm._s(
                                                          _vm.$t("firefly.edit")
                                                        ) +
                                                        "\n                                "
                                                    )
                                                  ]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("li", [
                                                _c(
                                                  "a",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.generateWarning(
                                                          apartment
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fa fa-fw fa-file"
                                                    }),
                                                    _vm._v(
                                                      " \n                                  " +
                                                        _vm._s(
                                                          _vm.$t(
                                                            "firefly.create_warning"
                                                          )
                                                        ) +
                                                        "\n                                "
                                                    )
                                                  ]
                                                )
                                              ])
                                            ]
                                          )
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        ]
                      )
                    ])
                  }),
                  0
                ),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "btn btn-success",
                attrs: { href: "real-estate-management/create" }
              },
              [
                _c("i", { staticClass: "fa fa-plus fa-fw" }),
                _vm._v(_vm._s(_vm.$t("firefly.add_new_apartment")))
              ]
            )
          ])
        ])
      ])
    ]
  )
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
module.exports = JSON.parse('{"firefly":{"welcome_back":"Какво се случва?","flash_error":"Грешка!","flash_success":"Успех!","close":"Затвори","split_transaction_title":"Описание на разделена транзакция","errors_submission":"Имаше нещо нередно с вашите данни. Моля, проверете грешките.","split":"Раздели","single_split":"Раздел","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Транзакция #{ID}(\\"{title}\\")</a> беше записана.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Транзакция #{ID}</a> беше записана.","transaction_journal_information":"Информация за транзакция","no_budget_pointer":"Изглежда все още нямате бюджети. Трябва да създадете някои на страницата <a href=\\"budgets\\"> Бюджети </a>. Бюджетите могат да ви помогнат да следите разходите си.","no_bill_pointer":"Изглежда все още нямате сметки. Трябва да създадете някои на страницата <a href=\\"bills\\"> Сметки </a>. Сметките могат да ви помогнат да следите разходите си.","source_account":"Разходна сметка","hidden_fields_preferences":"Можете да активирате повече опции за транзакции във вашите <a href=\\"preferences\\">настройки</a>.","destination_account":"Приходна сметка","add_another_split":"Добавяне на друг раздел","submission":"Изпращане","create_another":"След съхраняването се върнете тук, за да създадете нова.","reset_after":"Изчистване на формуляра след изпращане","submit":"Потвърди","amount":"Сума","date":"Дата","tags":"Етикети","no_budget":"(без бюджет)","no_bill":"(няма сметка)","category":"Категория","attachments":"Прикачени файлове","notes":"Бележки","external_uri":"External URL","update_transaction":"Обнови транзакцията","after_update_create_another":"След обновяването се върнете тук, за да продължите с редакцията.","store_as_new":"Съхранете като нова транзакция, вместо да я актуализирате.","split_title_help":"Ако създадете разделена транзакция, трябва да има глобално описание за всички раздели на транзакцията.","none_in_select_list":"(нищо)","no_piggy_bank":"(без касичка)","description":"Описание","split_transaction_title_help":"Ако създадете разделена транзакция, трябва да има глобално описание за всички раздели на транзакцията.","destination_account_reconciliation":"Не може да редактирате приходната сметка на транзакция за съгласуване.","source_account_reconciliation":"Не може да редактирате разходната сметка на транзакция за съгласуване.","budget":"Бюджет","bill":"Сметка","you_create_withdrawal":"Създавате теглене.","you_create_transfer":"Създавате прехвърляне.","you_create_deposit":"Създавате депозит.","edit":"Промени","delete":"Изтрий","name":"Име","profile_whoops":"Опаааа!","profile_something_wrong":"Нещо се обърка!","profile_try_again":"Нещо се обърка. Моля, опитайте отново.","profile_oauth_clients":"OAuth клиенти","profile_oauth_no_clients":"Не сте създали клиенти на OAuth.","profile_oauth_clients_header":"Клиенти","profile_oauth_client_id":"ИД (ID) на клиент","profile_oauth_client_name":"Име","profile_oauth_client_secret":"Тайна","profile_oauth_create_new_client":"Създай нов клиент","profile_oauth_create_client":"Създай клиент","profile_oauth_edit_client":"Редактирай клиент","profile_oauth_name_help":"Нещо, което вашите потребители ще разпознаят и ще се доверят.","profile_oauth_redirect_url":"Линк на препратката","profile_oauth_redirect_url_help":"URL адрес за обратно извикване на оторизацията на вашето приложение.","profile_authorized_apps":"Удостоверени приложения","profile_authorized_clients":"Удостоверени клиенти","profile_scopes":"Сфери","profile_revoke":"Анулирай","profile_personal_access_tokens":"Персонални маркери за достъп","profile_personal_access_token":"Персонален маркер за достъп","profile_personal_access_token_explanation":"Това е новия ви персонален маркер за достъп. Това е единственият път, когато ще бъде показан, така че не го губете! Вече можете да използвате този маркер, за да отправяте заявки към API.","profile_no_personal_access_token":"Не сте създали никакви лични маркери за достъп.","profile_create_new_token":"Създай нов маркер","profile_create_token":"Създай маркер","profile_create":"Създай","profile_save_changes":"Запазване на промените","default_group_title_name":"(без група)","piggy_bank":"Касичка","profile_oauth_client_secret_title":"Тайна на клиента","profile_oauth_client_secret_expl":"Това е новата ви \\"тайна на клиента\\". Това е единственият път, когато ще бъде показана, така че не го губете! Вече можете да използвате този маркер, за да отправяте заявки към API.","profile_oauth_confidential":"Поверително","profile_oauth_confidential_help":"Изисквайте клиента да се удостоверява с тайна. Поверителните клиенти могат да притежават идентификационни данни по защитен начин, без да ги излагат на неоторизирани страни. Публичните приложения, като например десктопа или JavaScript SPA приложения, не могат да пазят тайни по сигурен начин.","multi_account_warning_unknown":"В зависимост от вида на транзакцията която създавате, източникът и / или целевата сметка на следващите разделяния може да бъде променена от това което е дефинирано в първото разделение на транзакцията.","multi_account_warning_withdrawal":"Имайте предвид, че разходна сметка на следващите разделяния ще бъде тази която е дефинирана в първия раздел на тегленето.","multi_account_warning_deposit":"Имайте предвид, че приходната сметка на следващите разделяния ще бъде тази която е дефинирана в първия раздел на депозита.","multi_account_warning_transfer":"Имайте предвид, че приходната + разходната сметка на следващите разделяния ще бъде тази която е дефинирана в първия раздел на прехвърлянето."},"form":{"interest_date":"Падеж на лихва","book_date":"Дата на осчетоводяване","process_date":"Дата на обработка","due_date":"Дата на падеж","foreign_amount":"Сума във валута","payment_date":"Дата на плащане","invoice_date":"Дата на фактура","internal_reference":"Вътрешна референция"},"config":{"html_language":"bg"}}');

/***/ }),

/***/ "./resources/assets/js/locales/cs.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/cs.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Jak to jde?","flash_error":"Chyba!","flash_success":"Úspěšně dokončeno!","close":"Zavřít","split_transaction_title":"Popis rozúčtování","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Rozdělit","single_split":"Rozdělit","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Informace o transakci","no_budget_pointer":"Zdá se, že ještě nemáte žádné rozpočty. Měli byste některé vytvořit na <a href=\\"budgets\\">rozpočty</a>-. Rozpočty vám mohou pomoci sledovat výdaje.","no_bill_pointer":"Zdá se, že ještě nemáte žádné účty. Měli byste některé vytvořit na <a href=\\"bills\\">účtech</a>. Účty vám mohou pomoci sledovat výdaje.","source_account":"Zdrojový účet","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Cílový účet","add_another_split":"Přidat další rozúčtování","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Odeslat","amount":"Částka","date":"Datum","tags":"Štítky","no_budget":"(žádný rozpočet)","no_bill":"(no bill)","category":"Kategorie","attachments":"Přílohy","notes":"Poznámky","external_uri":"Externí URL","update_transaction":"Aktualizovat transakci","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"Pokud vytvoříte rozúčtování, je třeba, aby zde byl celkový popis pro všechna rozúčtování dané transakce.","none_in_select_list":"(žádné)","no_piggy_bank":"(žádná pokladnička)","description":"Popis","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"Cílový účet odsouhlasené transakce nelze upravit.","source_account_reconciliation":"Nemůžete upravovat zdrojový účet srovnávací transakce.","budget":"Rozpočet","bill":"Účet","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Upravit","delete":"Odstranit","name":"Název","profile_whoops":"Omlouváme se, tohle nějak nefunguje","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"Zatím jste nevytvořili OAuth klienty.","profile_oauth_clients_header":"Klienti","profile_oauth_client_id":"ID zákazníka","profile_oauth_client_name":"Jméno","profile_oauth_client_secret":"Tajný klíč","profile_oauth_create_new_client":"Vytvořit nového klienta","profile_oauth_create_client":"Vytvořit klienta","profile_oauth_edit_client":"Upravit klienta","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Přesměrovat URL adresu","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Autorizovaní klienti","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Vytvořit nový token","profile_create_token":"Vytvořit token","profile_create":"Vytvořit","profile_save_changes":"Uložit změny","default_group_title_name":"(ungrouped)","piggy_bank":"Pokladnička","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Úrokové datum","book_date":"Datum rezervace","process_date":"Datum zpracování","due_date":"Datum splatnosti","foreign_amount":"Částka v cizí měně","payment_date":"Datum zaplacení","invoice_date":"Datum vystavení","internal_reference":"Interní reference"},"config":{"html_language":"cs"}}');

/***/ }),

/***/ "./resources/assets/js/locales/de.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/de.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Überblick","flash_error":"Fehler!","flash_success":"Geschafft!","close":"Schließen","split_transaction_title":"Beschreibung der Splittbuchung","errors_submission":"Ihre Übermittlung ist fehlgeschlagen. Bitte überprüfen Sie die Fehler.","split":"Teilen","single_split":"Teil","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Buchung #{ID} (\\"{title}\\")</a> wurde gespeichert.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Die Buchung #{ID}</a> (\\"{title}\\") wurde aktualisiert.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Buchung #{ID}</a> wurde gespeichert.","transaction_journal_information":"Transaktionsinformationen","no_budget_pointer":"Sie scheinen noch keine Kostenrahmen festgelegt zu haben. Sie sollten einige davon auf der Seite <a href=\\"budgets\\">Kostenrahmen</a>- anlegen. Kostenrahmen können Ihnen dabei helfen, den Überblick über die Ausgaben zu behalten.","no_bill_pointer":"Sie scheinen noch keine Rechnungen zu haben. Sie sollten einige auf der Seite <a href=\\"bills\\">Rechnungen</a> erstellen. Anhand der Rechnungen können Sie den Überblick über Ihre Ausgaben behalten.","source_account":"Quellkonto","hidden_fields_preferences":"Sie können weitere Buchungsoptionen in Ihren <a href=\\"preferences\\">Einstellungen</a> aktivieren.","destination_account":"Zielkonto","add_another_split":"Eine weitere Aufteilung hinzufügen","submission":"Übermittlung","create_another":"Nach dem Speichern hierher zurückkehren, um ein weiteres zu erstellen.","reset_after":"Formular nach der Übermittlung zurücksetzen","submit":"Absenden","amount":"Betrag","date":"Datum","tags":"Schlagwörter","no_budget":"(kein Budget)","no_bill":"(keine Belege)","category":"Kategorie","attachments":"Anhänge","notes":"Notizen","external_uri":"Externe URL","update_transaction":"Buchung aktualisieren","after_update_create_another":"Nach dem Aktualisieren hierher zurückkehren, um weiter zu bearbeiten.","store_as_new":"Als neue Buchung speichern statt zu aktualisieren.","split_title_help":"Wenn Sie eine Splittbuchung anlegen, muss es eine eindeutige Beschreibung für alle Aufteilungen der Buchhaltung geben.","none_in_select_list":"(Keine)","no_piggy_bank":"(kein Sparschwein)","description":"Beschreibung","split_transaction_title_help":"Wenn Sie eine Splittbuchung anlegen, muss es eine eindeutige Beschreibung für alle Aufteilungen der Buchung geben.","destination_account_reconciliation":"Sie können das Zielkonto einer Kontenausgleichsbuchung nicht bearbeiten.","source_account_reconciliation":"Sie können das Quellkonto einer Kontenausgleichsbuchung nicht bearbeiten.","budget":"Budget","bill":"Rechnung","you_create_withdrawal":"Sie haben eine Auszahlung erstellt.","you_create_transfer":"Sie haben eine Buchung erstellt.","you_create_deposit":"Sie haben eine Einzahlung erstellt.","edit":"Bearbeiten","delete":"Löschen","name":"Name","profile_whoops":"Huch!","profile_something_wrong":"Ein Problem ist aufgetreten!","profile_try_again":"Ein Problem ist aufgetreten. Bitte versuchen Sie es erneut.","profile_oauth_clients":"OAuth-Clients","profile_oauth_no_clients":"Sie haben noch keine OAuth-Clients erstellt.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client-ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Geheimnis","profile_oauth_create_new_client":"Neuen Client erstellen","profile_oauth_create_client":"Client erstellen","profile_oauth_edit_client":"Client bearbeiten","profile_oauth_name_help":"Etwas das Ihre Nutzer erkennen und dem sie vertrauen.","profile_oauth_redirect_url":"Weiterleitungs-URL","profile_oauth_redirect_url_help":"Die Authorisierungs-Callback-URL Ihrer Anwendung.","profile_authorized_apps":"Autorisierte Anwendungen","profile_authorized_clients":"Autorisierte Clients","profile_scopes":"Bereiche","profile_revoke":"Widerrufen","profile_personal_access_tokens":"Persönliche Zugangs-Tokens","profile_personal_access_token":"Persönlicher Zugangs-Token","profile_personal_access_token_explanation":"Hier ist Ihr neuer persönlicher Zugangsschlüssel. Dies ist das einzige Mal, dass er angezeigt wird, also verlieren Sie ihn nicht! Sie können diesen Token jetzt verwenden, um API-Anfragen zu stellen.","profile_no_personal_access_token":"Sie haben keine persönlichen Zugangsschlüssel erstellt.","profile_create_new_token":"Neuen Schlüssel erstellen","profile_create_token":"Schlüssel erstellen","profile_create":"Erstellen","profile_save_changes":"Änderungen speichern","default_group_title_name":"(ohne Gruppierung)","piggy_bank":"Sparschwein","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Hier ist Ihr neuer persönlicher Zugangsschlüssel. Dies ist das einzige Mal, dass er angezeigt wird, also verlieren Sie ihn nicht! Sie können diesen Token jetzt verwenden, um API-Anfragen zu stellen.","profile_oauth_confidential":"Vertraulich","profile_oauth_confidential_help":"Der Client muss sich mit einem Secret authentifizieren. Vertrauliche Clients können die Anmeldedaten speichern, ohne diese unautorisierten Akteuren mitzuteilen. Öffentliche Anwendungen wie native Desktop- oder JavaScript-SPA-Anwendungen können Geheimnisse nicht sicher speichern.","multi_account_warning_unknown":"Abhängig von der Art der Buchung, die Sie anlegen, kann das Quell- und/oder Zielkonto nachfolgender Aufteilungen durch das überschrieben werden, was in der ersten Aufteilung der Buchung definiert wurde.","multi_account_warning_withdrawal":"Bedenken Sie, dass das Quellkonto nachfolgender Aufteilungen von dem, was in der ersten Aufteilung der Abhebung definiert ist, außer Kraft gesetzt wird.","multi_account_warning_deposit":"Bedenken Sie, dass das Zielkonto nachfolgender Aufteilungen von dem, was in der ersten Aufteilung der Einzahlung definiert ist, außer Kraft gesetzt wird.","multi_account_warning_transfer":"Bedenken Sie, dass das Quell- und Zielkonto nachfolgender Aufteilungen durch das, was in der ersten Aufteilung der Übertragung definiert ist, außer Kraft gesetzt wird."},"form":{"interest_date":"Zinstermin","book_date":"Buchungsdatum","process_date":"Bearbeitungsdatum","due_date":"Fälligkeitstermin","foreign_amount":"Ausländischer Betrag","payment_date":"Zahlungsdatum","invoice_date":"Rechnungsdatum","internal_reference":"Interner Verweis"},"config":{"html_language":"de"}}');

/***/ }),

/***/ "./resources/assets/js/locales/el.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/el.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Τι παίζει;","flash_error":"Σφάλμα!","flash_success":"Επιτυχία!","close":"Κλείσιμο","split_transaction_title":"Περιγραφή της συναλλαγής με διαχωρισμό","errors_submission":"Υπήρξε κάποιο λάθος με την υποβολή σας. Παρακαλώ ελέγξτε τα σφάλματα.","split":"Διαχωρισμός","single_split":"Διαχωρισμός","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Η συναλλαγή #{ID} (\\"{title}\\")</a> έχει αποθηκευτεί.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Η συναλλαγή #{ID}</a> (\\"{title}\\") έχει ενημερωθεί.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Η συναλλαγή #{ID}</a> έχει αποθηκευτεί.","transaction_journal_information":"Πληροφορίες συναλλαγής","no_budget_pointer":"Φαίνεται πως δεν έχετε ορίσει προϋπολογισμούς ακόμη. Πρέπει να δημιουργήσετε κάποιον στη σελίδα <a href=\\"budgets\\">προϋπολογισμών</a>. Οι προϋπολογισμοί σας βοηθούν να επιβλέπετε τις δαπάνες σας.","no_bill_pointer":"Φαίνεται πως δεν έχετε ορίσει πάγια έξοδα ακόμη. Πρέπει να δημιουργήσετε κάποιο στη σελίδα <a href=\\"bills\\">πάγιων εξόδων</a>. Τα πάγια έξοδα σας βοηθούν να επιβλέπετε τις δαπάνες σας.","source_account":"Λογαριασμός προέλευσης","hidden_fields_preferences":"Μπορείτε να ενεργοποιήσετε περισσότερες επιλογές συναλλαγών στις <a href=\\"/preferences\\">προτιμήσεις</a>.","destination_account":"Λογαριασμός προορισμού","add_another_split":"Προσθήκη ενός ακόμα διαχωρισμού","submission":"Υποβολή","create_another":"Μετά την αποθήκευση, επιστρέψτε εδώ για να δημιουργήσετε ακόμη ένα.","reset_after":"Επαναφορά φόρμας μετά την υποβολή","submit":"Υποβολή","amount":"Ποσό","date":"Ημερομηνία","tags":"Ετικέτες","no_budget":"(χωρίς προϋπολογισμό)","no_bill":"(χωρίς πάγιο έξοδο)","category":"Κατηγορία","attachments":"Συνημμένα","notes":"Σημειώσεις","external_uri":"Εξωτερικό URL","update_transaction":"Ενημέρωση συναλλαγής","after_update_create_another":"Μετά την ενημέρωση, επιστρέψτε εδώ για να συνεχίσετε την επεξεργασία.","store_as_new":"Αποθήκευση ως νέα συναλλαγή αντί για ενημέρωση.","split_title_help":"Εάν δημιουργήσετε μια διαχωρισμένη συναλλαγή, πρέπει να υπάρχει μια καθολική περιγραφή για όλους τους διαχωρισμούς της συναλλαγής.","none_in_select_list":"(τίποτα)","no_piggy_bank":"(χωρίς κουμπαρά)","description":"Περιγραφή","split_transaction_title_help":"Εάν δημιουργήσετε μια διαχωρισμένη συναλλαγή, πρέπει να υπάρχει μια καθολική περιγραφή για όλους τους διαχωρισμούς της συναλλαγής.","destination_account_reconciliation":"Δεν μπορείτε να τροποποιήσετε τον λογαριασμό προορισμού σε μια συναλλαγή τακτοποίησης.","source_account_reconciliation":"Δεν μπορείτε να τροποποιήσετε τον λογαριασμό προέλευσης σε μια συναλλαγή τακτοποίησης.","budget":"Προϋπολογισμός","bill":"Πάγιο έξοδο","you_create_withdrawal":"Δημιουργείτε μια ανάληψη.","you_create_transfer":"Δημιουργείτε μια μεταφορά.","you_create_deposit":"Δημιουργείτε μια κατάθεση.","edit":"Επεξεργασία","delete":"Διαγραφή","name":"Όνομα","profile_whoops":"Ούπς!","profile_something_wrong":"Κάτι πήγε στραβά!","profile_try_again":"Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε ξανά.","profile_oauth_clients":"Πελάτες OAuth","profile_oauth_no_clients":"Δεν έχετε δημιουργήσει πελάτες OAuth.","profile_oauth_clients_header":"Πελάτες","profile_oauth_client_id":"Αναγνωριστικό πελάτη","profile_oauth_client_name":"Όνομα","profile_oauth_client_secret":"Μυστικό","profile_oauth_create_new_client":"Δημιουργία νέου πελάτη","profile_oauth_create_client":"Δημιουργία πελάτη","profile_oauth_edit_client":"Επεξεργασία πελάτη","profile_oauth_name_help":"Κάτι που οι χρήστες σας θα αναγνωρίζουν και θα εμπιστεύονται.","profile_oauth_redirect_url":"URL ανακατεύθυνσης","profile_oauth_redirect_url_help":"To authorization callback URL της εφαρμογής σας.","profile_authorized_apps":"Εξουσιοδοτημένες εφαρμογές","profile_authorized_clients":"Εξουσιοδοτημένοι πελάτες","profile_scopes":"Πεδία εφαρμογής","profile_revoke":"Ανάκληση","profile_personal_access_tokens":"Διακριτικά προσωπικής πρόσβασης","profile_personal_access_token":"Διακριτικά προσωπικής πρόσβασης","profile_personal_access_token_explanation":"Εδώ είναι το νέο διακριτικό προσωπικής πρόσβασης. Αυτή είναι η μόνη φορά που θα εμφανιστεί, οπότε μη το χάσετε! Μπορείτε να χρησιμοποιείτε αυτό το διακριτικό για να κάνετε κλήσεις API.","profile_no_personal_access_token":"Δεν έχετε δημιουργήσει προσωπικά διακριτικά πρόσβασης.","profile_create_new_token":"Δημιουργία νέου διακριτικού","profile_create_token":"Δημιουργία διακριτικού","profile_create":"Δημιουργία","profile_save_changes":"Αποθήκευση αλλαγών","default_group_title_name":"(χωρίς ομάδα)","piggy_bank":"Κουμπαράς","profile_oauth_client_secret_title":"Μυστικό Πελάτη","profile_oauth_client_secret_expl":"Εδώ είναι το νέο σας μυστικό πελάτη. Αυτή είναι η μόνη φορά που θα σας εμφανιστεί, οπότε μην το χάσετε! Μπορείτε να το χρησιμοποιείτε για να κάνετε αιτήματα API.","profile_oauth_confidential":"Εμπιστευτικό","profile_oauth_confidential_help":"Απαιτήστε από το πρόγραμμα πελάτη να πραγματοποιήσει έλεγχο ταυτότητας με ένα μυστικό. Οι έμπιστοι πελάτες μπορούν να διατηρούν διαπιστευτήρια με ασφαλή τρόπο χωρίς να τα εκθέτουν σε μη εξουσιοδοτημένα μέρη. Οι δημόσιες εφαρμογές, όπως οι εγγενείς εφαρμογές για επιτραπέζιους υπολογιστές ή JavaScript SPA, δεν μπορούν να κρατήσουν μυστικά με ασφάλεια.","multi_account_warning_unknown":"Ανάλογα με τον τύπο της συναλλαγής που δημιουργείτε, ο λογαριασμός προέλευσης ή/και προορισμού των επόμενων διαχωρισμών ενδέχεται να παρακαμφθεί από αυτό που ορίζεται στο πρώτο διαχωρισμό της συναλλαγής.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Ημερομηνία τοκισμού","book_date":"Ημερομηνία εγγραφής","process_date":"Ημερομηνία επεξεργασίας","due_date":"Ημερομηνία προθεσμίας","foreign_amount":"Ποσό σε ξένο νόμισμα","payment_date":"Ημερομηνία πληρωμής","invoice_date":"Ημερομηνία τιμολόγησης","internal_reference":"Εσωτερική αναφορά"},"config":{"html_language":"el"}}');

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
module.exports = JSON.parse('{"firefly":{"welcome_back":"¿Qué está pasando?","flash_error":"¡Error!","flash_success":"¡Operación correcta!","close":"Cerrar","split_transaction_title":"Descripción de la transacción dividida","errors_submission":"Hubo un problema con su envío. Por favor, compruebe los errores.","split":"Separar","single_split":"División","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">La transacción #{ID} (\\"{title}\\")</a> ha sido almacenada.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">La transacción #{ID}</a> (\\"{title}\\") ha sido actualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">La transacción #{ID}</a> ha sido guardada.","transaction_journal_information":"Información de transacción","no_budget_pointer":"Parece que aún no tienes presupuestos. Debes crear algunos en la página <a href=\\"budgets\\">presupuestos</a>. Los presupuestos pueden ayudarle a realizar un seguimiento de los gastos.","no_bill_pointer":"Parece que aún no tienes facturas. Deberías crear algunas en la página de <a href=\\"bills\\">facturas</a>. Las facturas pueden ayudarte a llevar un seguimiento de los gastos.","source_account":"Cuenta origen","hidden_fields_preferences":"Puede habilitar más opciones de transacción en sus <a href=\\"preferences\\">ajustes </a>.","destination_account":"Cuenta destino","add_another_split":"Añadir otra división","submission":"Envío","create_another":"Después de guardar, vuelve aquí para crear otro.","reset_after":"Restablecer formulario después del envío","submit":"Enviar","amount":"Cantidad","date":"Fecha","tags":"Etiquetas","no_budget":"(sin presupuesto)","no_bill":"(sin factura)","category":"Categoria","attachments":"Archivos adjuntos","notes":"Notas","external_uri":"URL externa","update_transaction":"Actualizar transacción","after_update_create_another":"Después de actualizar, vuelve aquí para continuar editando.","store_as_new":"Almacenar como una nueva transacción en lugar de actualizar.","split_title_help":"Si crea una transacción dividida, debe haber una descripción global para todos los fragmentos de la transacción.","none_in_select_list":"(ninguno)","no_piggy_bank":"(sin hucha)","description":"Descripción","split_transaction_title_help":"Si crea una transacción dividida, debe existir una descripción global para todas las divisiones de la transacción.","destination_account_reconciliation":"No puedes editar la cuenta de destino de una transacción de reconciliación.","source_account_reconciliation":"No puedes editar la cuenta de origen de una transacción de reconciliación.","budget":"Presupuesto","bill":"Factura","you_create_withdrawal":"Está creando un retiro.","you_create_transfer":"Está creando una transferencia.","you_create_deposit":"Está creando un depósito.","edit":"Editar","delete":"Eliminar","name":"Nombre","profile_whoops":"¡Ups!","profile_something_wrong":"¡Algo salió mal!","profile_try_again":"Algo salió mal. Por favor, vuelva a intentarlo.","profile_oauth_clients":"Clientes de OAuth","profile_oauth_no_clients":"No ha creado ningún cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID del cliente","profile_oauth_client_name":"Nombre","profile_oauth_client_secret":"Secreto","profile_oauth_create_new_client":"Crear un Nuevo Cliente","profile_oauth_create_client":"Crear Cliente","profile_oauth_edit_client":"Editar Cliente","profile_oauth_name_help":"Algo que sus usuarios reconocerán y confiarán.","profile_oauth_redirect_url":"Redirigir URL","profile_oauth_redirect_url_help":"La URL de devolución de autorización de su aplicación.","profile_authorized_apps":"Aplicaciones autorizadas","profile_authorized_clients":"Clientes autorizados","profile_scopes":"Ámbitos","profile_revoke":"Revocar","profile_personal_access_tokens":"Tokens de acceso personal","profile_personal_access_token":"Token de acceso personal","profile_personal_access_token_explanation":"Aquí está su nuevo token de acceso personal. Esta es la única vez que se mostrará así que ¡no lo pierda! Ahora puede usar este token para hacer solicitudes de la API.","profile_no_personal_access_token":"No ha creado ningún token de acceso personal.","profile_create_new_token":"Crear nuevo token","profile_create_token":"Crear token","profile_create":"Crear","profile_save_changes":"Guardar cambios","default_group_title_name":"(sin agrupación)","piggy_bank":"Hucha","profile_oauth_client_secret_title":"Secreto del Cliente","profile_oauth_client_secret_expl":"Aquí está su nuevo secreto de cliente. Esta es la única vez que se mostrará así que no lo pierda! Ahora puede usar este secreto para hacer solicitudes de API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Requerir que el cliente se autentifique con un secreto. Los clientes confidenciales pueden mantener las credenciales de forma segura sin exponerlas a partes no autorizadas. Las aplicaciones públicas, como aplicaciones de escritorio nativo o SPA de JavaScript, no pueden guardar secretos de forma segura.","multi_account_warning_unknown":"Dependiendo del tipo de transacción que cree, la cuenta de origen y/o destino de divisiones posteriores puede ser anulada por lo que se define en la primera división de la transacción.","multi_account_warning_withdrawal":"Tenga en cuenta que la cuenta de origen de las divisiones posteriores será anulada por lo que se defina en la primera división del retiro.","multi_account_warning_deposit":"Tenga en cuenta que la cuenta de destino de las divisiones posteriores será anulada por lo que se defina en la primera división del retiro.","multi_account_warning_transfer":"Tenga en cuenta que la cuenta de origen + destino de divisiones posteriores será anulada por lo que se defina en la primera división de la transferencia."},"form":{"interest_date":"Fecha de interés","book_date":"Fecha de registro","process_date":"Fecha de procesamiento","due_date":"Fecha de vencimiento","foreign_amount":"Cantidad extranjera","payment_date":"Fecha de pago","invoice_date":"Fecha de la factura","internal_reference":"Referencia interna"},"config":{"html_language":"es"}}');

/***/ }),

/***/ "./resources/assets/js/locales/fi.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/fi.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Mitä kuuluu?","flash_error":"Virhe!","flash_success":"Valmista tuli!","close":"Sulje","split_transaction_title":"Jaetun tapahtuman kuvaus","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Jaa","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Tapahtumatiedot","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Lähdetili","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Kohdetili","add_another_split":"Lisää tapahtumaan uusi osa","submission":"Vahvistus","create_another":"Tallennuksen jälkeen, palaa takaisin luomaan uusi tapahtuma.","reset_after":"Tyhjennä lomake lähetyksen jälkeen","submit":"Vahvista","amount":"Summa","date":"Päivämäärä","tags":"Tägit","no_budget":"(ei budjettia)","no_bill":"(no bill)","category":"Kategoria","attachments":"Liitteet","notes":"Muistiinpanot","external_uri":"External URL","update_transaction":"Päivitä tapahtuma","after_update_create_another":"Päivityksen jälkeen, palaa takaisin jatkamaan muokkausta.","store_as_new":"Tallenna uutena tapahtumana päivityksen sijaan.","split_title_help":"Jos luot jaetun tapahtuman, kokonaisuudelle tarvitaan nimi.","none_in_select_list":"(ei mitään)","no_piggy_bank":"(ei säästöpossu)","description":"Kuvaus","split_transaction_title_help":"Jos luot jaetun tapahtuman, kokonaisuudelle tarvitaan nimi.","destination_account_reconciliation":"Et voi muokata täsmäytystapahtuman kohdetiliä.","source_account_reconciliation":"Et voi muokata täsmäytystapahtuman lähdetiliä.","budget":"Budjetti","bill":"Lasku","you_create_withdrawal":"Olet luomassa nostoa.","you_create_transfer":"Olet luomassa siirtoa.","you_create_deposit":"Olet luomassa talletusta.","edit":"Muokkaa","delete":"Poista","name":"Nimi","profile_whoops":"Hupsis!","profile_something_wrong":"Jokin meni vikaan!","profile_try_again":"Jokin meni vikaan. Yritä uudelleen.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Asiakasohjelmat","profile_oauth_client_id":"Asiakastunnus","profile_oauth_client_name":"Nimi","profile_oauth_client_secret":"Salaisuus","profile_oauth_create_new_client":"Luo Uusi Asiakas","profile_oauth_create_client":"Luo Asiakas","profile_oauth_edit_client":"Muokkaa asiakasta","profile_oauth_name_help":"Jotain käyttäjillesi tuttua ja luotettavaa.","profile_oauth_redirect_url":"URL:n uudelleenohjaus","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Peruuta","profile_personal_access_tokens":"Henkilökohtaiset Käyttöoikeuskoodit","profile_personal_access_token":"Henkilökohtainen Käyttöoikeuskoodi","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Luo uusi tunnus","profile_create_token":"Luo tunnus","profile_create":"Luo","profile_save_changes":"Tallenna muutokset","default_group_title_name":"(ryhmittelemättömät)","piggy_bank":"Säästöpossu","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Korkopäivä","book_date":"Kirjauspäivä","process_date":"Käsittelypäivä","due_date":"Eräpäivä","foreign_amount":"Ulkomaan summa","payment_date":"Maksupäivä","invoice_date":"Laskun päivämäärä","internal_reference":"Sisäinen viite"},"config":{"html_language":"fi"}}');

/***/ }),

/***/ "./resources/assets/js/locales/fr.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/fr.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Quoi de neuf ?","flash_error":"Erreur !","flash_success":"Super !","close":"Fermer","split_transaction_title":"Description de l\'opération ventilée","errors_submission":"Certaines informations ne sont pas correctes dans votre formulaire. Veuillez vérifier les erreurs.","split":"Ventiler","single_split":"Ventilation","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">L\'opération n°{ID} (\\"{title}\\")</a> a été enregistrée.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">L\'opération n°{ID}</a> (\\"{title}\\") a été mise à jour.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">L\'opération n°{ID}</a> a été enregistrée.","transaction_journal_information":"Informations sur l\'opération","no_budget_pointer":"Vous semblez n’avoir encore aucun budget. Vous devriez en créer un sur la page des <a href=\\"budgets\\">budgets</a>. Les budgets peuvent vous aider à garder une trace des dépenses.","no_bill_pointer":"Vous semblez n\'avoir encore aucune facture. Vous devriez en créer une sur la page <a href=\\"bills\\">factures</a>-. Les factures peuvent vous aider à garder une trace des dépenses.","source_account":"Compte source","hidden_fields_preferences":"Vous pouvez activer plus d\'options d\'opérations dans vos <a href=\\"preferences\\">paramètres</a>.","destination_account":"Compte de destination","add_another_split":"Ajouter une autre fraction","submission":"Soumission","create_another":"Après enregistrement, revenir ici pour en créer un nouveau.","reset_after":"Réinitialiser le formulaire après soumission","submit":"Soumettre","amount":"Montant","date":"Date","tags":"Tags","no_budget":"(pas de budget)","no_bill":"(aucune facture)","category":"Catégorie","attachments":"Pièces jointes","notes":"Notes","external_uri":"URL externe","update_transaction":"Mettre à jour l\'opération","after_update_create_another":"Après la mise à jour, revenir ici pour continuer l\'édition.","store_as_new":"Enregistrer comme une nouvelle opération au lieu de mettre à jour.","split_title_help":"Si vous créez une opération ventilée, il doit y avoir une description globale pour chaque fractions de l\'opération.","none_in_select_list":"(aucun)","no_piggy_bank":"(aucune tirelire)","description":"Description","split_transaction_title_help":"Si vous créez une opération ventilée, il doit y avoir une description globale pour chaque fraction de l\'opération.","destination_account_reconciliation":"Vous ne pouvez pas modifier le compte de destination d\'une opération de rapprochement.","source_account_reconciliation":"Vous ne pouvez pas modifier le compte source d\'une opération de rapprochement.","budget":"Budget","bill":"Facture","you_create_withdrawal":"Vous saisissez une dépense.","you_create_transfer":"Vous saisissez un transfert.","you_create_deposit":"Vous saisissez un dépôt.","edit":"Modifier","delete":"Supprimer","name":"Nom","profile_whoops":"Oups !","profile_something_wrong":"Une erreur s\'est produite !","profile_try_again":"Une erreur s’est produite. Merci d’essayer à nouveau.","profile_oauth_clients":"Clients OAuth","profile_oauth_no_clients":"Vous n’avez pas encore créé de client OAuth.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Identifiant","profile_oauth_client_name":"Nom","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Créer un nouveau client","profile_oauth_create_client":"Créer un client","profile_oauth_edit_client":"Modifier le client","profile_oauth_name_help":"Quelque chose que vos utilisateurs reconnaîtront et qui inspirera confiance.","profile_oauth_redirect_url":"URL de redirection","profile_oauth_redirect_url_help":"URL de callback de votre application.","profile_authorized_apps":"Applications autorisées","profile_authorized_clients":"Clients autorisés","profile_scopes":"Permissions","profile_revoke":"Révoquer","profile_personal_access_tokens":"Jetons d\'accès personnels","profile_personal_access_token":"Jeton d\'accès personnel","profile_personal_access_token_explanation":"Voici votre nouveau jeton d’accès personnel. Ceci est la seule fois où vous pourrez le voir, ne le perdez pas ! Vous pouvez dès à présent utiliser ce jeton pour lancer des requêtes avec l’API.","profile_no_personal_access_token":"Vous n’avez pas encore créé de jeton d’accès personnel.","profile_create_new_token":"Créer un nouveau jeton","profile_create_token":"Créer un jeton","profile_create":"Créer","profile_save_changes":"Enregistrer les modifications","default_group_title_name":"(Sans groupement)","piggy_bank":"Tirelire","profile_oauth_client_secret_title":"Secret du client","profile_oauth_client_secret_expl":"Voici votre nouveau secret de client. C\'est la seule fois qu\'il sera affiché, donc ne le perdez pas ! Vous pouvez maintenant utiliser ce secret pour faire des requêtes d\'API.","profile_oauth_confidential":"Confidentiel","profile_oauth_confidential_help":"Exiger que le client s\'authentifie avec un secret. Les clients confidentiels peuvent détenir des informations d\'identification de manière sécurisée sans les exposer à des tiers non autorisés. Les applications publiques, telles que les applications de bureau natif ou les SPA JavaScript, ne peuvent pas tenir des secrets en toute sécurité.","multi_account_warning_unknown":"Selon le type d\'opération que vous créez, le(s) compte(s) source et/ou de destination des ventilations suivantes peuvent être remplacés par celui de la première ventilation de l\'opération.","multi_account_warning_withdrawal":"Gardez en tête que le compte source des ventilations suivantes peut être remplacé par celui de la première ventilation de la dépense.","multi_account_warning_deposit":"Gardez en tête que le compte de destination des ventilations suivantes peut être remplacé par celui de la première ventilation du dépôt.","multi_account_warning_transfer":"Gardez en tête que les comptes source et de destination des ventilations suivantes peuvent être remplacés par ceux de la première ventilation du transfert."},"form":{"interest_date":"Date de valeur (intérêts)","book_date":"Date de réservation","process_date":"Date de traitement","due_date":"Échéance","foreign_amount":"Montant en devise étrangère","payment_date":"Date de paiement","invoice_date":"Date de facturation","internal_reference":"Référence interne"},"config":{"html_language":"fr"}}');

/***/ }),

/***/ "./resources/assets/js/locales/hu.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/hu.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Mi a helyzet?","flash_error":"Hiba!","flash_success":"Siker!","close":"Bezárás","split_transaction_title":"Felosztott tranzakció leírása","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Felosztás","single_split":"Felosztás","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> mentve.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> mentve.","transaction_journal_information":"Tranzakciós információk","no_budget_pointer":"Úgy tűnik, még nincsenek költségkeretek. Költségkereteket a <a href=\\"budgets\\">költségkeretek</a> oldalon lehet létrehozni. A költségkeretek segítenek nyomon követni a költségeket.","no_bill_pointer":"Úgy tűnik, még nincsenek költségkeretek. Költségkereteket a <a href=\\"bills\\">költségkeretek</a> oldalon lehet létrehozni. A költségkeretek segítenek nyomon követni a költségeket.","source_account":"Forrás számla","hidden_fields_preferences":"A <a href=\\"preferences\\">beállításokban</a> több mező is engedélyezhető.","destination_account":"Célszámla","add_another_split":"Másik felosztás hozzáadása","submission":"Feliratkozás","create_another":"A tárolás után térjen vissza ide új létrehozásához.","reset_after":"Űrlap törlése a beküldés után","submit":"Beküldés","amount":"Összeg","date":"Dátum","tags":"Címkék","no_budget":"(nincs költségkeret)","no_bill":"(no bill)","category":"Kategória","attachments":"Mellékletek","notes":"Megjegyzések","external_uri":"External URL","update_transaction":"Tranzakció frissítése","after_update_create_another":"A frissítés után térjen vissza ide a szerkesztés folytatásához.","store_as_new":"Tárolás új tranzakcióként frissítés helyett.","split_title_help":"Felosztott tranzakció létrehozásakor meg kell adni egy globális leírást a tranzakció összes felosztása részére.","none_in_select_list":"(nincs)","no_piggy_bank":"(nincs malacpersely)","description":"Leírás","split_transaction_title_help":"Felosztott tranzakció létrehozásakor meg kell adni egy globális leírást a tranzakció összes felosztása részére.","destination_account_reconciliation":"Nem lehet szerkeszteni egy egyeztetett tranzakció célszámláját.","source_account_reconciliation":"Nem lehet szerkeszteni egy egyeztetett tranzakció forrásszámláját.","budget":"Költségkeret","bill":"Számla","you_create_withdrawal":"Egy költség létrehozása.","you_create_transfer":"Egy átutalás létrehozása.","you_create_deposit":"Egy bevétel létrehozása.","edit":"Szerkesztés","delete":"Törlés","name":"Név","profile_whoops":"Hoppá!","profile_something_wrong":"Hiba történt!","profile_try_again":"Hiba történt. Kérjük, próbálja meg újra.","profile_oauth_clients":"OAuth kliensek","profile_oauth_no_clients":"Nincs létrehozva egyetlen OAuth kliens sem.","profile_oauth_clients_header":"Kliensek","profile_oauth_client_id":"Kliens ID","profile_oauth_client_name":"Megnevezés","profile_oauth_client_secret":"Titkos kód","profile_oauth_create_new_client":"Új kliens létrehozása","profile_oauth_create_client":"Kliens létrehozása","profile_oauth_edit_client":"Kliens szerkesztése","profile_oauth_name_help":"Segítség, hogy a felhasználók tudják mihez kapcsolódik.","profile_oauth_redirect_url":"Átirányítási URL","profile_oauth_redirect_url_help":"Az alkalmazásban használt autentikációs URL.","profile_authorized_apps":"Engedélyezett alkalmazások","profile_authorized_clients":"Engedélyezett kliensek","profile_scopes":"Hatáskörök","profile_revoke":"Visszavonás","profile_personal_access_tokens":"Személyes hozzáférési tokenek","profile_personal_access_token":"Személyes hozzáférési token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"Nincs létrehozva egyetlen személyes hozzáférési token sem.","profile_create_new_token":"Új token létrehozása","profile_create_token":"Token létrehozása","profile_create":"Létrehozás","profile_save_changes":"Módosítások mentése","default_group_title_name":"(nem csoportosított)","piggy_bank":"Malacpersely","profile_oauth_client_secret_title":"Kliens titkos kódja","profile_oauth_client_secret_expl":"Ez a kliens titkos kódja. Ez az egyetlen alkalom, amikor meg van jelenítve, ne hagyd el! Ezzel a kóddal végezhetsz API hívásokat.","profile_oauth_confidential":"Bizalmas","profile_oauth_confidential_help":"Titkos kód használata a kliens bejelentkezéséhez. Bizonyos kliensek biztonságosan tudnak hitelesítő adatokat tárolni, anélkül hogy jogosulatlan fél hozzáférhetne. Nyilvános kliensek, például mint asztali vagy JavaScript SPA alkalmazások nem tudnak biztonságosan titkos kódot tárolni.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Kamatfizetési időpont","book_date":"Könyvelés dátuma","process_date":"Feldolgozás dátuma","due_date":"Lejárati időpont","foreign_amount":"Külföldi összeg","payment_date":"Fizetés dátuma","invoice_date":"Számla dátuma","internal_reference":"Belső hivatkozás"},"config":{"html_language":"hu"}}');

/***/ }),

/***/ "./resources/assets/js/locales/it.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/it.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"La tua situazione finanziaria","flash_error":"Errore!","flash_success":"Successo!","close":"Chiudi","split_transaction_title":"Descrizione della transazione suddivisa","errors_submission":"Errore durante l\'invio. Controlla gli errori segnalati qui sotto.","split":"Dividi","single_split":"Divisione","transaction_stored_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID} (\\"{title}\\")</a> è stata salvata.","transaction_updated_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID}</a> (\\"{title}\\") è stata aggiornata.","transaction_new_stored_link":"La <a href=\\"transactions/show/{ID}\\">transazione #{ID}</a> è stata salvata.","transaction_journal_information":"Informazioni transazione","no_budget_pointer":"Sembra che tu non abbia ancora dei budget. Dovresti crearne alcuni nella pagina dei <a href=\\"budgets\\">budget</a>. I budget possono aiutarti a tenere traccia delle spese.","no_bill_pointer":"Sembra che tu non abbia ancora delle bollette. Dovresti crearne alcune nella pagina delle <a href=\\"bills\\">bollette</a>. Le bollette possono aiutarti a tenere traccia delle spese.","source_account":"Conto di origine","hidden_fields_preferences":"Puoi abilitare maggiori opzioni per le transazioni nelle tue <a href=\\"preferences\\">impostazioni</a>.","destination_account":"Conto destinazione","add_another_split":"Aggiungi un\'altra divisione","submission":"Invio","create_another":"Dopo il salvataggio, torna qui per crearne un\'altra.","reset_after":"Resetta il modulo dopo l\'invio","submit":"Invia","amount":"Importo","date":"Data","tags":"Etichette","no_budget":"(nessun budget)","no_bill":"(nessuna bolletta)","category":"Categoria","attachments":"Allegati","notes":"Note","external_uri":"URL esterno","update_transaction":"Aggiorna transazione","after_update_create_another":"Dopo l\'aggiornamento, torna qui per continuare la modifica.","store_as_new":"Salva come nuova transazione invece di aggiornarla.","split_title_help":"Se crei una transazione suddivisa è necessario che ci sia una descrizione globale per tutte le suddivisioni della transazione.","none_in_select_list":"(nessuna)","no_piggy_bank":"(nessun salvadanaio)","description":"Descrizione","split_transaction_title_help":"Se crei una transazione suddivisa, è necessario che ci sia una descrizione globale per tutte le suddivisioni della transazione.","destination_account_reconciliation":"Non è possibile modificare il conto di destinazione di una transazione di riconciliazione.","source_account_reconciliation":"Non puoi modificare il conto di origine di una transazione di riconciliazione.","budget":"Budget","bill":"Bolletta","you_create_withdrawal":"Stai creando un prelievo.","you_create_transfer":"Stai creando un trasferimento.","you_create_deposit":"Stai creando un deposito.","edit":"Modifica","delete":"Elimina","name":"Nome","profile_whoops":"Oops!","profile_something_wrong":"Qualcosa non ha funzionato!","profile_try_again":"Qualcosa non ha funzionato. Riprova.","profile_oauth_clients":"Client OAuth","profile_oauth_no_clients":"Non hai creato nessun client OAuth.","profile_oauth_clients_header":"Client","profile_oauth_client_id":"ID client","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"Segreto","profile_oauth_create_new_client":"Crea nuovo client","profile_oauth_create_client":"Crea client","profile_oauth_edit_client":"Modifica client","profile_oauth_name_help":"Qualcosa di cui i tuoi utenti potranno riconoscere e fidarsi.","profile_oauth_redirect_url":"URL di reindirizzamento","profile_oauth_redirect_url_help":"L\'URL di callback dell\'autorizzazione della tua applicazione.","profile_authorized_apps":"Applicazioni autorizzate","profile_authorized_clients":"Client autorizzati","profile_scopes":"Ambiti","profile_revoke":"Revoca","profile_personal_access_tokens":"Token di acceso personale","profile_personal_access_token":"Token di acceso personale","profile_personal_access_token_explanation":"Ecco il tuo nuovo token di accesso personale. Questa è l\'unica volta che ti viene mostrato per cui non perderlo! Da adesso puoi utilizzare questo token per effettuare delle richieste API.","profile_no_personal_access_token":"Non hai creato alcun token di accesso personale.","profile_create_new_token":"Crea nuovo token","profile_create_token":"Crea token","profile_create":"Crea","profile_save_changes":"Salva modifiche","default_group_title_name":"(non in un gruppo)","piggy_bank":"Salvadanaio","profile_oauth_client_secret_title":"Segreto del client","profile_oauth_client_secret_expl":"Ecco il segreto del nuovo client. Questa è l\'unica occasione in cui viene mostrato pertanto non perderlo! Ora puoi usare questo segreto per effettuare delle richieste alle API.","profile_oauth_confidential":"Riservato","profile_oauth_confidential_help":"Richiede al client di autenticarsi con un segreto. I client riservati possono conservare le credenziali in modo sicuro senza esporle a soggetti non autorizzati. Le applicazioni pubbliche, come le applicazioni desktop native o JavaScript SPA, non sono in grado di conservare i segreti in modo sicuro.","multi_account_warning_unknown":"A seconda del tipo di transazione che hai creato, il conto di origine e/o destinazione delle successive suddivisioni può essere sovrascritto da qualsiasi cosa sia definita nella prima suddivisione della transazione.","multi_account_warning_withdrawal":"Ricorda che il conto di origine delle successive suddivisioni verrà sovrascritto da quello definito nella prima suddivisione del prelievo.","multi_account_warning_deposit":"Ricorda che il conto di destinazione delle successive suddivisioni verrà sovrascritto da quello definito nella prima suddivisione del deposito.","multi_account_warning_transfer":"Ricorda che il conto di origine e il conto di destinazione delle successive suddivisioni verranno sovrascritti da quelli definiti nella prima suddivisione del trasferimento."},"form":{"interest_date":"Data di valuta","book_date":"Data contabile","process_date":"Data elaborazione","due_date":"Data scadenza","foreign_amount":"Importo estero","payment_date":"Data pagamento","invoice_date":"Data fatturazione","internal_reference":"Riferimento interno"},"config":{"html_language":"it"}}');

/***/ }),

/***/ "./resources/assets/js/locales/nb.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/nb.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"Feil!","flash_success":"Suksess!","close":"Lukk","split_transaction_title":"Description of the split transaction","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Del opp","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"Transaksjonsinformasjon","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","add_another_split":"Legg til en oppdeling til","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"Send inn","amount":"Beløp","date":"Dato","tags":"Tagger","no_budget":"(ingen budsjett)","no_bill":"(no bill)","category":"Kategori","attachments":"Vedlegg","notes":"Notater","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","none_in_select_list":"(ingen)","no_piggy_bank":"(no piggy bank)","description":"Beskrivelse","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"Busjett","bill":"Regning","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"Rediger","delete":"Slett","name":"Navn","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"Sparegris","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Rentedato","book_date":"Bokføringsdato","process_date":"Prosesseringsdato","due_date":"Forfallsdato","foreign_amount":"Utenlandske beløp","payment_date":"Betalingsdato","invoice_date":"Fakturadato","internal_reference":"Intern referanse"},"config":{"html_language":"nb"}}');

/***/ }),

/***/ "./resources/assets/js/locales/nl.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/nl.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Hoe staat het er voor?","flash_error":"Fout!","flash_success":"Gelukt!","close":"Sluiten","split_transaction_title":"Beschrijving van de gesplitste transactie","errors_submission":"Er ging iets mis. Check de errors.","split":"Splitsen","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID} (\\"{title}\\")</a> is opgeslagen.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID}</a> (\\"{title}\\") is geüpdatet.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transactie #{ID}</a> is opgeslagen.","transaction_journal_information":"Transactieinformatie","no_budget_pointer":"Je hebt nog geen budgetten. Maak er een aantal op de <a href=\\"budgets\\">budgetten</a>-pagina. Met budgetten kan je je uitgaven beter bijhouden.","no_bill_pointer":"Je hebt nog geen contracten. Maak er een aantal op de <a href=\\"bills\\">contracten</a>-pagina. Met contracten kan je je uitgaven beter bijhouden.","source_account":"Bronrekening","hidden_fields_preferences":"Je kan meer transactieopties inschakelen in je <a href=\\"preferences\\">instellingen</a>.","destination_account":"Doelrekening","add_another_split":"Voeg een split toe","submission":"Indienen","create_another":"Terug naar deze pagina voor een nieuwe transactie.","reset_after":"Reset formulier na opslaan","submit":"Invoeren","amount":"Bedrag","date":"Datum","tags":"Tags","no_budget":"(geen budget)","no_bill":"(geen contract)","category":"Categorie","attachments":"Bijlagen","notes":"Notities","external_uri":"Externe URL","update_transaction":"Update transactie","after_update_create_another":"Na het opslaan terug om door te gaan met wijzigen.","store_as_new":"Opslaan als nieuwe transactie ipv de huidige bij te werken.","split_title_help":"Als je een gesplitste transactie maakt, moet er een algemene beschrijving zijn voor alle splitsingen van de transactie.","none_in_select_list":"(geen)","no_piggy_bank":"(geen spaarpotje)","description":"Omschrijving","split_transaction_title_help":"Als je een gesplitste transactie maakt, moet er een algemene beschrijving zijn voor alle splitsingen van de transactie.","destination_account_reconciliation":"Je kan de doelrekening van een afstemming niet wijzigen.","source_account_reconciliation":"Je kan de bronrekening van een afstemming niet wijzigen.","budget":"Budget","bill":"Contract","you_create_withdrawal":"Je maakt een uitgave.","you_create_transfer":"Je maakt een overschrijving.","you_create_deposit":"Je maakt inkomsten.","edit":"Wijzig","delete":"Verwijder","name":"Naam","profile_whoops":"Oeps!","profile_something_wrong":"Er is iets mis gegaan!","profile_try_again":"Er is iets misgegaan. Probeer het nogmaals.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"Je hebt nog geen OAuth-clients aangemaakt.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Naam","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Nieuwe client aanmaken","profile_oauth_create_client":"Client aanmaken","profile_oauth_edit_client":"Client bewerken","profile_oauth_name_help":"Iets dat je gebruikers herkennen en vertrouwen.","profile_oauth_redirect_url":"Redirect-URL","profile_oauth_redirect_url_help":"De authorisatie-callback-url van jouw applicatie.","profile_authorized_apps":"Geautoriseerde toepassingen","profile_authorized_clients":"Geautoriseerde clients","profile_scopes":"Scopes","profile_revoke":"Intrekken","profile_personal_access_tokens":"Persoonlijke toegangstokens","profile_personal_access_token":"Persoonlijk toegangstoken","profile_personal_access_token_explanation":"Hier is je nieuwe persoonlijke toegangstoken. Dit is de enige keer dat deze getoond wordt dus verlies deze niet! Je kan deze toegangstoken gebruiken om API-aanvragen te maken.","profile_no_personal_access_token":"Je hebt nog geen persoonlijke toegangstokens aangemaakt.","profile_create_new_token":"Nieuwe token aanmaken","profile_create_token":"Token aanmaken","profile_create":"Creër","profile_save_changes":"Aanpassingen opslaan","default_group_title_name":"(ongegroepeerd)","piggy_bank":"Spaarpotje","profile_oauth_client_secret_title":"Client secret","profile_oauth_client_secret_expl":"Hier is je nieuwe client secret. Dit is de enige keer dat deze getoond wordt dus verlies deze niet! Je kan dit secret gebruiken om API-aanvragen te maken.","profile_oauth_confidential":"Vertrouwelijk","profile_oauth_confidential_help":"Dit vinkje is bedoeld voor applicaties die geheimen kunnen bewaren. Applicaties zoals sommige desktop-apps en Javascript apps kunnen dit niet. In zo\'n geval haal je het vinkje weg.","multi_account_warning_unknown":"Afhankelijk van het type transactie wordt de bron- en/of doelrekening overschreven door wat er in de eerste split staat.","multi_account_warning_withdrawal":"De bronrekening wordt overschreven door wat er in de eerste split staat.","multi_account_warning_deposit":"De doelrekening wordt overschreven door wat er in de eerste split staat.","multi_account_warning_transfer":"De bron + doelrekening wordt overschreven door wat er in de eerste split staat."},"form":{"interest_date":"Rentedatum","book_date":"Boekdatum","process_date":"Verwerkingsdatum","due_date":"Vervaldatum","foreign_amount":"Bedrag in vreemde valuta","payment_date":"Betalingsdatum","invoice_date":"Factuurdatum","internal_reference":"Interne verwijzing"},"config":{"html_language":"nl"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pl.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/pl.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Co jest grane?","flash_error":"Błąd!","flash_success":"Sukces!","close":"Zamknij","split_transaction_title":"Opis podzielonej transakcji","errors_submission":"Coś poszło nie tak w czasie zapisu. Proszę sprawdź błędy.","split":"Podziel","single_split":"Podział","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID} (\\"{title}\\")</a> została zapisana.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID}</a> (\\"{title}\\") została zaktualizowana.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcja #{ID}</a> została zapisana.","transaction_journal_information":"Informacje o transakcji","no_budget_pointer":"Wygląda na to, że nie masz jeszcze budżetów. Powinieneś utworzyć kilka na stronie <a href=\\"budgets\\">budżetów</a>. Budżety mogą Ci pomóc śledzić wydatki.","no_bill_pointer":"Wygląda na to, że nie masz jeszcze rachunków. Powinieneś utworzyć kilka na stronie <a href=\\"bills\\">rachunków</a>. Rachunki mogą Ci pomóc śledzić wydatki.","source_account":"Konto źródłowe","hidden_fields_preferences":"Możesz włączyć więcej opcji transakcji w swoich <a href=\\"preferences\\">ustawieniach</a>.","destination_account":"Konto docelowe","add_another_split":"Dodaj kolejny podział","submission":"Zapisz","create_another":"Po zapisaniu wróć tutaj, aby utworzyć kolejny.","reset_after":"Wyczyść formularz po zapisaniu","submit":"Prześlij","amount":"Kwota","date":"Data","tags":"Tagi","no_budget":"(brak budżetu)","no_bill":"(brak rachunku)","category":"Kategoria","attachments":"Załączniki","notes":"Notatki","external_uri":"Zewnętrzny adres URL","update_transaction":"Zaktualizuj transakcję","after_update_create_another":"Po aktualizacji wróć tutaj, aby kontynuować edycję.","store_as_new":"Zapisz jako nową zamiast aktualizować.","split_title_help":"Podzielone transakcje muszą posiadać globalny opis.","none_in_select_list":"(żadne)","no_piggy_bank":"(brak skarbonki)","description":"Opis","split_transaction_title_help":"Jeśli tworzysz podzieloną transakcję, musi ona posiadać globalny opis dla wszystkich podziałów w transakcji.","destination_account_reconciliation":"Nie możesz edytować konta docelowego transakcji uzgadniania.","source_account_reconciliation":"Nie możesz edytować konta źródłowego transakcji uzgadniania.","budget":"Budżet","bill":"Rachunek","you_create_withdrawal":"Tworzysz wydatek.","you_create_transfer":"Tworzysz przelew.","you_create_deposit":"Tworzysz wpłatę.","edit":"Modyfikuj","delete":"Usuń","name":"Nazwa","profile_whoops":"Uuuups!","profile_something_wrong":"Coś poszło nie tak!","profile_try_again":"Coś poszło nie tak. Spróbuj ponownie.","profile_oauth_clients":"Klienci OAuth","profile_oauth_no_clients":"Nie utworzyłeś żadnych klientów OAuth.","profile_oauth_clients_header":"Klienci","profile_oauth_client_id":"ID klienta","profile_oauth_client_name":"Nazwa","profile_oauth_client_secret":"Sekretny klucz","profile_oauth_create_new_client":"Utwórz nowego klienta","profile_oauth_create_client":"Utwórz klienta","profile_oauth_edit_client":"Edytuj klienta","profile_oauth_name_help":"Coś, co Twoi użytkownicy będą rozpoznawać i ufać.","profile_oauth_redirect_url":"Przekierowanie URL","profile_oauth_redirect_url_help":"Adres URL wywołania zwrotnego autoryzacji aplikacji.","profile_authorized_apps":"Autoryzowane aplikacje","profile_authorized_clients":"Autoryzowani klienci","profile_scopes":"Zakresy","profile_revoke":"Unieważnij","profile_personal_access_tokens":"Osobiste tokeny dostępu","profile_personal_access_token":"Osobisty token dostępu","profile_personal_access_token_explanation":"Oto twój nowy osobisty token dostępu. Jest to jedyny raz, gdy zostanie wyświetlony, więc nie zgub go! Możesz teraz użyć tego tokenu, aby wykonać zapytania API.","profile_no_personal_access_token":"Nie utworzyłeś żadnych osobistych tokenów.","profile_create_new_token":"Utwórz nowy token","profile_create_token":"Utwórz token","profile_create":"Utwórz","profile_save_changes":"Zapisz zmiany","default_group_title_name":"(bez grupy)","piggy_bank":"Skarbonka","profile_oauth_client_secret_title":"Sekret klienta","profile_oauth_client_secret_expl":"Oto twój nowy sekret klienta. Jest to jedyny raz, gdy zostanie wyświetlony, więc nie zgub go! Możesz teraz użyć tego sekretu, aby wykonać zapytania API.","profile_oauth_confidential":"Poufne","profile_oauth_confidential_help":"Wymagaj od klienta uwierzytelnienia za pomocą sekretu. Poufni klienci mogą przechowywać poświadczenia w bezpieczny sposób bez narażania ich na dostęp przez nieuprawnione strony. Publiczne aplikacje, takie jak natywne aplikacje desktopowe lub JavaScript SPA, nie są w stanie bezpiecznie trzymać sekretów.","multi_account_warning_unknown":"W zależności od rodzaju transakcji, którą tworzysz, konto źródłowe i/lub docelowe kolejnych podziałów może zostać ustawione na konto zdefiniowane w pierwszym podziale transakcji.","multi_account_warning_withdrawal":"Pamiętaj, że konto źródłowe kolejnych podziałów zostanie ustawione na konto zdefiniowane w pierwszym podziale wypłaty.","multi_account_warning_deposit":"Pamiętaj, że konto docelowe kolejnych podziałów zostanie ustawione na konto zdefiniowane w pierwszym podziale wpłaty.","multi_account_warning_transfer":"Pamiętaj, że konta źródłowe i docelowe kolejnych podziałów zostaną ustawione na konto zdefiniowane w pierwszym podziale transferu."},"form":{"interest_date":"Data odsetek","book_date":"Data księgowania","process_date":"Data przetworzenia","due_date":"Termin realizacji","foreign_amount":"Kwota zagraniczna","payment_date":"Data płatności","invoice_date":"Data faktury","internal_reference":"Wewnętrzny numer"},"config":{"html_language":"pl"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pt-br.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/pt-br.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"O que está acontecendo?","flash_error":"Erro!","flash_success":"Sucesso!","close":"Fechar","split_transaction_title":"Descrição da transação dividida","errors_submission":"Há algo de errado com o seu envio. Por favor, verifique os erros abaixo.","split":"Dividir","single_split":"Divisão","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transação #{ID} (\\"{title}\\")</a> foi salva.","transaction_updated_link":"A <a href=\\"transactions/show/{ID}\\">Transação #{ID}</a> (\\"{title}\\") foi atualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transação #{ID}</a> foi salva.","transaction_journal_information":"Informação da transação","no_budget_pointer":"Parece que você ainda não tem orçamentos. Você deve criar alguns na página de <a href=\\"budgets\\">orçamentos</a>. Orçamentos podem ajudá-lo a manter o controle das despesas.","no_bill_pointer":"Parece que você ainda não tem contas. Você deve criar algumas em <a href=\\"bills\\">contas</a>. Contas podem ajudar você a manter o controle de despesas.","source_account":"Conta origem","hidden_fields_preferences":"Você pode habilitar mais opções de transação em suas <a href=\\"preferences\\">preferências</a>.","destination_account":"Conta destino","add_another_split":"Adicionar outra divisão","submission":"Envio","create_another":"Depois de armazenar, retorne aqui para criar outro.","reset_after":"Resetar o formulário após o envio","submit":"Enviar","amount":"Valor","date":"Data","tags":"Tags","no_budget":"(sem orçamento)","no_bill":"(sem conta)","category":"Categoria","attachments":"Anexos","notes":"Notas","external_uri":"URL externa","update_transaction":"Atualizar transação","after_update_create_another":"Depois de atualizar, retorne aqui para continuar editando.","store_as_new":"Armazene como uma nova transação em vez de atualizar.","split_title_help":"Se você criar uma transação dividida, é necessário haver uma descrição global para todas as partes da transação.","none_in_select_list":"(nenhum)","no_piggy_bank":"(nenhum cofrinho)","description":"Descrição","split_transaction_title_help":"Se você criar uma transação dividida, deve haver uma descrição global para todas as partes da transação.","destination_account_reconciliation":"Você não pode editar a conta de origem de uma transação de reconciliação.","source_account_reconciliation":"Você não pode editar a conta de origem de uma transação de reconciliação.","budget":"Orçamento","bill":"Fatura","you_create_withdrawal":"Você está criando uma saída.","you_create_transfer":"Você está criando uma transferência.","you_create_deposit":"Você está criando uma entrada.","edit":"Editar","delete":"Apagar","name":"Nome","profile_whoops":"Ops!","profile_something_wrong":"Alguma coisa deu errado!","profile_try_again":"Algo deu errado. Por favor tente novamente.","profile_oauth_clients":"Clientes OAuth","profile_oauth_no_clients":"Você não criou nenhum cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID do Cliente","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"Segredo","profile_oauth_create_new_client":"Criar um novo cliente","profile_oauth_create_client":"Criar um cliente","profile_oauth_edit_client":"Editar cliente","profile_oauth_name_help":"Alguma coisa que seus usuários vão reconhecer e identificar.","profile_oauth_redirect_url":"URL de redirecionamento","profile_oauth_redirect_url_help":"A URL de retorno da sua solicitação de autorização.","profile_authorized_apps":"Aplicativos autorizados","profile_authorized_clients":"Clientes autorizados","profile_scopes":"Escopos","profile_revoke":"Revogar","profile_personal_access_tokens":"Tokens de acesso pessoal","profile_personal_access_token":"Token de acesso pessoal","profile_personal_access_token_explanation":"Aqui está seu novo token de acesso pessoal. Esta é a única vez que ela será mostrada então não perca! Agora você pode usar esse token para fazer solicitações de API.","profile_no_personal_access_token":"Você não criou nenhum token de acesso pessoal.","profile_create_new_token":"Criar novo token","profile_create_token":"Criar token","profile_create":"Criar","profile_save_changes":"Salvar alterações","default_group_title_name":"(não agrupado)","piggy_bank":"Cofrinho","profile_oauth_client_secret_title":"Segredo do cliente","profile_oauth_client_secret_expl":"Aqui está o seu novo segredo de cliente. Esta é a única vez que ela será mostrada, então não o perca! Agora você pode usar este segredo para fazer requisições de API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Exige que o cliente se autentique com um segredo. Clientes confidenciais podem manter credenciais de forma segura sem expô-las à partes não autorizadas. Aplicações públicas, como aplicações de área de trabalho nativas ou JavaScript SPA, são incapazes de manter segredos com segurança.","multi_account_warning_unknown":"Dependendo do tipo de transação que você criar, a conta de origem e/ou de destino das divisões subsequentes pode ser sobrescrita pelo que estiver definido na primeira divisão da transação.","multi_account_warning_withdrawal":"Tenha em mente que a conta de origem das subsequentes divisões será sobrescrita pelo que estiver definido na primeira divisão da saída.","multi_account_warning_deposit":"Tenha em mente que a conta de destino das divisões subsequentes será sobrescrita pelo que estiver definido na primeira divisão da entrada.","multi_account_warning_transfer":"Tenha em mente que a conta de origem + de destino das divisões subsequentes será sobrescrita pelo que for definido na primeira divisão da transferência."},"form":{"interest_date":"Data de interesse","book_date":"Data reserva","process_date":"Data de processamento","due_date":"Data de vencimento","foreign_amount":"Montante em moeda estrangeira","payment_date":"Data de pagamento","invoice_date":"Data da Fatura","internal_reference":"Referência interna"},"config":{"html_language":"pt-br"}}');

/***/ }),

/***/ "./resources/assets/js/locales/pt.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/pt.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Tudo bem?","flash_error":"Erro!","flash_success":"Sucesso!","close":"Fechar","split_transaction_title":"Descrição da transacção dividida","errors_submission":"Aconteceu algo errado com a sua submissão. Por favor, verifique os erros.","split":"Dividir","single_split":"Dividir","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transação #{ID} (\\"{title}\\")</a> foi guardada.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transação #{ID}</a> (\\"{title}\\") foi atualizada.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transação#{ID}</a> foi guardada.","transaction_journal_information":"Informação da transação","no_budget_pointer":"Parece que ainda não tem orçamentos. Pode criar-los na página de <a href=\\"budgets\\">orçamentos</a>. Orçamentos podem ajudá-lo a controlar as despesas.","no_bill_pointer":"Parece que ainda não tem faturas. Pode criar-las na página de <a href=\\"bills\\">faturas</a>. Faturas podem ajudá-lo a controlar as despesas.","source_account":"Conta de origem","hidden_fields_preferences":"Pode ativar mais opções de transações nas suas <a href=\\"preferences\\">preferências</a>.","destination_account":"Conta de destino","add_another_split":"Adicionar outra divisão","submission":"Submissão","create_another":"Depois de guardar, voltar aqui para criar outra.","reset_after":"Repor o formulário após o envio","submit":"Enviar","amount":"Montante","date":"Data","tags":"Etiquetas","no_budget":"(sem orçamento)","no_bill":"(sem fatura)","category":"Categoria","attachments":"Anexos","notes":"Notas","external_uri":"URL Externo","update_transaction":"Actualizar transacção","after_update_create_another":"Após a atualização, regresse aqui para continuar a editar.","store_as_new":"Guarde como uma nova transação em vez de atualizar.","split_title_help":"Se criar uma transacção dividida, deve haver uma descrição global para todas as partes da transacção.","none_in_select_list":"(nenhum)","no_piggy_bank":"(nenhum mealheiro)","description":"Descricao","split_transaction_title_help":"Se criar uma transacção dividida, deve haver uma descrição global para todas as partes da transacção.","destination_account_reconciliation":"Não pode editar a conta de destino de uma transacção de reconciliação.","source_account_reconciliation":"Não pode editar a conta de origem de uma transacção de reconciliação.","budget":"Orcamento","bill":"Fatura","you_create_withdrawal":"Está a criar um levantamento.","you_create_transfer":"Está a criar uma transferência.","you_create_deposit":"Está a criar um depósito.","edit":"Alterar","delete":"Apagar","name":"Nome","profile_whoops":"Oops!","profile_something_wrong":"Algo correu mal!","profile_try_again":"Algo correu mal. Por favor, tente novamente.","profile_oauth_clients":"Clientes OAuth","profile_oauth_no_clients":"Não criou nenhum cliente OAuth.","profile_oauth_clients_header":"Clientes","profile_oauth_client_id":"ID do Cliente","profile_oauth_client_name":"Nome","profile_oauth_client_secret":"Código secreto","profile_oauth_create_new_client":"Criar Novo Cliente","profile_oauth_create_client":"Criar Cliente","profile_oauth_edit_client":"Editar Cliente","profile_oauth_name_help":"Algo que os utilizadores reconheçam e confiem.","profile_oauth_redirect_url":"URL de redireccionamento","profile_oauth_redirect_url_help":"URL de callback de autorização da aplicação.","profile_authorized_apps":"Aplicações autorizados","profile_authorized_clients":"Clientes autorizados","profile_scopes":"Contextos","profile_revoke":"Revogar","profile_personal_access_tokens":"Tokens de acesso pessoal","profile_personal_access_token":"Token de acesso pessoal","profile_personal_access_token_explanation":"Aqui está o seu novo token de acesso pessoal. Esta é a única vês que o mesmo será mostrado portanto não o perca! Pode utiliza-lo para fazer pedidos de API.","profile_no_personal_access_token":"Você ainda não criou tokens de acesso pessoal.","profile_create_new_token":"Criar novo token","profile_create_token":"Criar token","profile_create":"Criar","profile_save_changes":"Guardar alterações","default_group_title_name":"(não agrupado)","piggy_bank":"Mealheiro","profile_oauth_client_secret_title":"Segredo do cliente","profile_oauth_client_secret_expl":"Aqui está o seu segredo de cliente. Apenas estará visível uma vez portanto não o perca! Pode agora utilizar este segredo para fazer pedidos à API.","profile_oauth_confidential":"Confidencial","profile_oauth_confidential_help":"Exigir que o cliente se autentique com um segredo. Clientes confidenciais podem manter credenciais de forma segura sem expor as mesmas a terceiros não autorizadas. Aplicações públicas, como por exemplo aplicações nativas de sistema operativo ou SPA JavaScript, são incapazes de garantir a segurança dos segredos.","multi_account_warning_unknown":"Dependendo do tipo de transição que quer criar, a conta de origem e/ou a destino de subsequentes divisões pode ser sub-escrita por quaisquer regra definida na primeira divisão da transação.","multi_account_warning_withdrawal":"Mantenha em mente que a conta de origem de divisões subsequentes será sobre-escrita por quaisquer regra definida na primeira divisão do levantamento.","multi_account_warning_deposit":"Mantenha em mente que a conta de destino de divisões subsequentes será sobre-escrita por quaisquer regra definida na primeira divisão do depósito.","multi_account_warning_transfer":"Mantenha em mente que a conta de origem + destino de divisões subsequentes serão sobre-escritas por quaisquer regras definidas na divisão da transferência."},"form":{"interest_date":"Data de juros","book_date":"Data de registo","process_date":"Data de processamento","due_date":"Data de vencimento","foreign_amount":"Montante estrangeiro","payment_date":"Data de pagamento","invoice_date":"Data da factura","internal_reference":"Referencia interna"},"config":{"html_language":"pt"}}');

/***/ }),

/***/ "./resources/assets/js/locales/ro.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/ro.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Ce se redă?","flash_error":"Eroare!","flash_success":"Succes!","close":"Închide","split_transaction_title":"Descrierea tranzacției divizate","errors_submission":"A fost ceva în neregulă cu depunerea ta. Te rugăm să verifici erorile.","split":"Împarte","single_split":"Împarte","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Tranzacția #{ID} (\\"{title}\\")</a> a fost stocată.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Tranzacția #{ID}</a> (\\"{title}\\") a fost actualizată.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Tranzacția #{ID}</a> a fost stocată.","transaction_journal_information":"Informații despre tranzacții","no_budget_pointer":"Se pare că nu aveți încă bugete. Ar trebui să creați câteva pe pagina <a href=\\"/budgets\\">bugete</a>. Bugetele vă pot ajuta să țineți evidența cheltuielilor.","no_bill_pointer":"Se pare că nu aveți încă facturi. Ar trebui să creați unele pe pagina <a href=\\"bills\\">facturi</a>. Facturile vă pot ajuta să țineți evidența cheltuielilor.","source_account":"Contul sursă","hidden_fields_preferences":"Puteți activa mai multe opțiuni de tranzacție în <a href=\\"preferences\\">preferințele</a> dvs.","destination_account":"Contul de destinație","add_another_split":"Adăugați o divizare","submission":"Transmitere","create_another":"După stocare, reveniți aici pentru a crea alta.","reset_after":"Resetați formularul după trimitere","submit":"Trimite","amount":"Sumă","date":"Dată","tags":"Etichete","no_budget":"(nici un buget)","no_bill":"(fără factură)","category":"Categorie","attachments":"Atașamente","notes":"Notițe","external_uri":"URL extern","update_transaction":"Actualizați tranzacția","after_update_create_another":"După actualizare, reveniți aici pentru a continua editarea.","store_as_new":"Stocați ca o tranzacție nouă în loc să actualizați.","split_title_help":"Dacă creați o tranzacție divizată, trebuie să existe o descriere globală pentru toate diviziunile tranzacției.","none_in_select_list":"(nici unul)","no_piggy_bank":"(nicio pușculiță)","description":"Descriere","split_transaction_title_help":"Dacă creați o tranzacție divizată, trebuie să existe o descriere globală pentru toate diviziunile tranzacției.","destination_account_reconciliation":"Nu puteți edita contul de destinație al unei tranzacții de reconciliere.","source_account_reconciliation":"Nu puteți edita contul sursă al unei tranzacții de reconciliere.","budget":"Buget","bill":"Factură","you_create_withdrawal":"Creezi o retragere.","you_create_transfer":"Creezi un transfer.","you_create_deposit":"Creezi un depozit.","edit":"Editează","delete":"Șterge","name":"Nume","profile_whoops":"Hopaa!","profile_something_wrong":"A apărut o eroare!","profile_try_again":"A apărut o problemă. Încercați din nou.","profile_oauth_clients":"Clienți OAuth","profile_oauth_no_clients":"Nu ați creat niciun client OAuth.","profile_oauth_clients_header":"Clienți","profile_oauth_client_id":"ID Client","profile_oauth_client_name":"Nume","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Creare client nou","profile_oauth_create_client":"Creare client","profile_oauth_edit_client":"Editare client","profile_oauth_name_help":"Ceva ce utilizatorii vor recunoaște și vor avea încredere.","profile_oauth_redirect_url":"Redirectioneaza URL","profile_oauth_redirect_url_help":"URL-ul de retroapelare al aplicației dvs.","profile_authorized_apps":"Aplicațiile dvs autorizate","profile_authorized_clients":"Clienți autorizați","profile_scopes":"Domenii","profile_revoke":"Revocați","profile_personal_access_tokens":"Token de acces personal","profile_personal_access_token":"Token de acces personal","profile_personal_access_token_explanation":"Aici este noul dvs. token de acces personal. Este singura dată când va fi afișat așa că nu îl pierde! Acum poți folosi acest token pentru a face cereri API.","profile_no_personal_access_token":"Nu aţi creat nici un token personal de acces.","profile_create_new_token":"Crează un nou token","profile_create_token":"Crează token","profile_create":"Crează","profile_save_changes":"Salvează modificările","default_group_title_name":"(negrupat)","piggy_bank":"Pușculiță","profile_oauth_client_secret_title":"Secret client","profile_oauth_client_secret_expl":"Aici este noul tău cod secret de client. Este singura dată când va fi afișat așa că nu îl pierzi! Acum poți folosi acest cod pentru a face cereri API.","profile_oauth_confidential":"Confidenţial","profile_oauth_confidential_help":"Solicitați clientului să se autentifice cu un secret. Clienții confidențiali pot păstra acreditările într-un mod securizat fără a le expune unor părți neautorizate. Aplicațiile publice, cum ar fi aplicațiile native desktop sau JavaScript SPA, nu pot păstra secretele în siguranță.","multi_account_warning_unknown":"În funcție de tipul de tranzacție pe care o creați, contul sursei și/sau destinației fracționărilor ulterioare poate fi depășit cu orice se definește în prima împărțire a tranzacției.","multi_account_warning_withdrawal":"Reţineţi faptul că sursa scindărilor ulterioare va fi anulată de orice altceva definit în prima împărţire a retragerii.","multi_account_warning_deposit":"Țineți cont de faptul că destinația scindărilor ulterioare va fi depășită cu orice se definește la prima împărțire a depozitului.","multi_account_warning_transfer":"Reţineţi faptul că contul sursei + destinaţia fracţionărilor ulterioare va fi anulat de orice se defineşte în prima împărţire a transferului."},"form":{"interest_date":"Data de interes","book_date":"Rezervă dată","process_date":"Data procesării","due_date":"Data scadentă","foreign_amount":"Sumă străină","payment_date":"Data de plată","invoice_date":"Data facturii","internal_reference":"Referință internă"},"config":{"html_language":"ro"}}');

/***/ }),

/***/ "./resources/assets/js/locales/ru.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/ru.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Что происходит с моими финансами?","flash_error":"Ошибка!","flash_success":"Успешно!","close":"Закрыть","split_transaction_title":"Описание разделённой транзакции","errors_submission":"При отправке что-то пошло не так. Пожалуйста, проверьте ошибки ниже.","split":"Разделить","single_split":"Разделённая транзакция","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Транзакция #{ID} (\\"{title}\\")</a> сохранена.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Транзакция #{ID}</a> сохранена.","transaction_journal_information":"Информация о транзакции","no_budget_pointer":"Похоже, у вас пока нет бюджетов. Вы должны создать их на странице <a href=\\"budgets\\">Бюджеты</a>. Бюджеты могут помочь вам отслеживать расходы.","no_bill_pointer":"Похоже, у вас пока нет счетов на оплату. Вы должны создать их на странице <a href=\\"bills\\">Счета на оплату</a>. Счета на оплату могут помочь вам отслеживать расходы.","source_account":"Счёт-источник","hidden_fields_preferences":"Вы можете включить больше параметров транзакции в <a href=\\"preferences\\">настройках</a>.","destination_account":"Счёт назначения","add_another_split":"Добавить еще одну часть","submission":"Отправить","create_another":"После сохранения вернуться сюда и создать ещё одну аналогичную запись.","reset_after":"Сбросить форму после отправки","submit":"Подтвердить","amount":"Сумма","date":"Дата","tags":"Метки","no_budget":"(вне бюджета)","no_bill":"(нет счёта на оплату)","category":"Категория","attachments":"Вложения","notes":"Заметки","external_uri":"Внешний URL","update_transaction":"Обновить транзакцию","after_update_create_another":"После обновления вернитесь сюда, чтобы продолжить редактирование.","store_as_new":"Сохранить как новую транзакцию вместо обновления.","split_title_help":"Если вы создаёте разделённую транзакцию, то должны указать общее описание дле всех её составляющих.","none_in_select_list":"(нет)","no_piggy_bank":"(нет копилки)","description":"Описание","split_transaction_title_help":"Если вы создаёте разделённую транзакцию, то должны указать общее описание для всех её составляющих.","destination_account_reconciliation":"Вы не можете редактировать счёт назначения для сверяемой транзакции.","source_account_reconciliation":"Вы не можете редактировать счёт-источник для сверяемой транзакции.","budget":"Бюджет","bill":"Счёт к оплате","you_create_withdrawal":"Вы создаёте расход.","you_create_transfer":"Вы создаёте перевод.","you_create_deposit":"Вы создаёте доход.","edit":"Изменить","delete":"Удалить","name":"Название","profile_whoops":"Ууупс!","profile_something_wrong":"Что-то пошло не так!","profile_try_again":"Произошла ошибка. Пожалуйста, попробуйте снова.","profile_oauth_clients":"Клиенты OAuth","profile_oauth_no_clients":"У вас пока нет клиентов OAuth.","profile_oauth_clients_header":"Клиенты","profile_oauth_client_id":"ID клиента","profile_oauth_client_name":"Название","profile_oauth_client_secret":"Секретный ключ","profile_oauth_create_new_client":"Создать нового клиента","profile_oauth_create_client":"Создать клиента","profile_oauth_edit_client":"Изменить клиента","profile_oauth_name_help":"Что-то, что ваши пользователи знают, и чему доверяют.","profile_oauth_redirect_url":"URL редиректа","profile_oauth_redirect_url_help":"URL обратного вызова для вашего приложения.","profile_authorized_apps":"Авторизованные приложения","profile_authorized_clients":"Авторизованные клиенты","profile_scopes":"Разрешения","profile_revoke":"Отключить","profile_personal_access_tokens":"Персональные Access Tokens","profile_personal_access_token":"Персональный Access Token","profile_personal_access_token_explanation":"Вот ваш новый персональный токен доступа. Он будет показан вам только сейчас, поэтому не потеряйте его! Теперь вы можете использовать этот токен, чтобы делать запросы по API.","profile_no_personal_access_token":"Вы не создали ни одного персонального токена доступа.","profile_create_new_token":"Создать новый токен","profile_create_token":"Создать токен","profile_create":"Создать","profile_save_changes":"Сохранить изменения","default_group_title_name":"(без группировки)","piggy_bank":"Копилка","profile_oauth_client_secret_title":"Ключ клиента","profile_oauth_client_secret_expl":"Вот ваш новый ключ клиента. Он будет показан вам только сейчас, поэтому не потеряйте его! Теперь вы можете использовать этот ключ, чтобы делать запросы по API.","profile_oauth_confidential":"Конфиденциальный","profile_oauth_confidential_help":"Требовать, чтобы клиент аутентифицировался с секретным ключом. Конфиденциальные клиенты могут хранить учётные данные в надёжном виде, защищая их от несанкционированного доступа. Публичные приложения, такие как обычный рабочий стол или приложения JavaScript SPA, не могут надёжно хранить ваши ключи.","multi_account_warning_unknown":"В зависимости от типа транзакции, которую вы создаёте, счёт-источник и/или счёт назначения следующих частей разделённой транзакции могут быть заменены теми, которые указаны для первой части транзакции.","multi_account_warning_withdrawal":"Имейте в виду, что счёт-источник в других частях разделённой транзакции будет таким же, как в первой части расхода.","multi_account_warning_deposit":"Имейте в виду, что счёт назначения в других частях разделённой транзакции будет таким же, как в первой части дохода.","multi_account_warning_transfer":"Имейте в виду, что счёт-источник и счёт назначения в других частях разделённой транзакции будут такими же, как в первой части перевода."},"form":{"interest_date":"Дата начисления процентов","book_date":"Дата бронирования","process_date":"Дата обработки","due_date":"Срок оплаты","foreign_amount":"Сумма в иностранной валюте","payment_date":"Дата платежа","invoice_date":"Дата выставления счёта","internal_reference":"Внутренняя ссылка"},"config":{"html_language":"ru"}}');

/***/ }),

/***/ "./resources/assets/js/locales/sk.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/sk.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Ako to ide?","flash_error":"Chyba!","flash_success":"Hotovo!","close":"Zavrieť","split_transaction_title":"Popis rozúčtovania","errors_submission":"Pri odosielaní sa niečo nepodarilo. Skontrolujte prosím chyby.","split":"Rozúčtovať","single_split":"Rozúčtovať","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID} (\\"{title}\\")</a> bola uložená.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID}</a> (\\"{title}\\") bola upravená.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transakcia #{ID}</a> bola uložená.","transaction_journal_information":"Informácie o transakcii","no_budget_pointer":"Zdá sa, že zatiaľ nemáte žiadne rozpočty. Na stránke <a href=\\"/budgets\\">rozpočty</a> by ste si nejaké mali vytvoriť. Rozpočty môžu pomôcť udržať prehľad vo výdavkoch.","no_bill_pointer":"Zdá sa, že zatiaľ nemáte žiadne účty. Na stránke <a href=\\"/bills\\">účty</a> by ste mali nejaké vytvoriť. Účty môžu pomôcť udržať si prehľad vo výdavkoch.","source_account":"Zdrojový účet","hidden_fields_preferences":"Viac možností transakcií môžete povoliť vo svojich <a href=\\"/preferences\\">nastaveniach</a>.","destination_account":"Cieľový účet","add_another_split":"Pridať ďalšie rozúčtovanie","submission":"Odoslanie","create_another":"Po uložení sa vrátiť späť sem a vytvoriť ďalší.","reset_after":"Po odoslaní vynulovať formulár","submit":"Odoslať","amount":"Suma","date":"Dátum","tags":"Štítky","no_budget":"(žiadny rozpočet)","no_bill":"(žiadny účet)","category":"Kategória","attachments":"Prílohy","notes":"Poznámky","external_uri":"Externá URL","update_transaction":"Upraviť transakciu","after_update_create_another":"Po aktualizácii sa vrátiť späť a pokračovať v úpravách.","store_as_new":"Namiesto aktualizácie uložiť ako novú transakciu.","split_title_help":"Ak vytvoríte rozúčtovanie transakcie, je potrebné, aby ste určili všeobecný popis pre všetky rozúčtovania danej transakcie.","none_in_select_list":"(žiadne)","no_piggy_bank":"(žiadna pokladnička)","description":"Popis","split_transaction_title_help":"Ak vytvoríte rozúčtovanú transakciu, musí existovať globálny popis všetkých rozúčtovaní transakcie.","destination_account_reconciliation":"Nemôžete upraviť cieľový účet zúčtovacej transakcie.","source_account_reconciliation":"Nemôžete upraviť zdrojový účet zúčtovacej transakcie.","budget":"Rozpočet","bill":"Účet","you_create_withdrawal":"Vytvárate výber.","you_create_transfer":"Vytvárate prevod.","you_create_deposit":"Vytvárate vklad.","edit":"Upraviť","delete":"Odstrániť","name":"Názov","profile_whoops":"Ajaj!","profile_something_wrong":"Niečo sa pokazilo!","profile_try_again":"Niečo sa pokazilo. Prosím, skúste znova.","profile_oauth_clients":"OAuth klienti","profile_oauth_no_clients":"Zatiaľ ste nevytvorili žiadneho OAuth klienta.","profile_oauth_clients_header":"Klienti","profile_oauth_client_id":"ID klienta","profile_oauth_client_name":"Meno/Názov","profile_oauth_client_secret":"Tajný kľúč","profile_oauth_create_new_client":"Vytvoriť nového klienta","profile_oauth_create_client":"Vytvoriť klienta","profile_oauth_edit_client":"Upraviť klienta","profile_oauth_name_help":"Niečo, čo vaši použivatelia poznajú a budú tomu dôverovať.","profile_oauth_redirect_url":"URL presmerovania","profile_oauth_redirect_url_help":"Spätná URL pre overenie autorizácie vašej aplikácie.","profile_authorized_apps":"Povolené aplikácie","profile_authorized_clients":"Autorizovaní klienti","profile_scopes":"Rozsahy","profile_revoke":"Odvolať","profile_personal_access_tokens":"Osobné prístupové tokeny","profile_personal_access_token":"Osobný prístupový token","profile_personal_access_token_explanation":"Toto je váš nový osobný prístupový token. Toto je jediný raz, kedy sa zobrazí - nestraťte ho! Odteraz ho môžete používať pre prístup k API.","profile_no_personal_access_token":"Ešte ste nevytvorili žiadne osobné prístupové tokeny.","profile_create_new_token":"Vytvoriť nový token","profile_create_token":"Vytvoriť token","profile_create":"Vytvoriť","profile_save_changes":"Uložiť zmeny","default_group_title_name":"(nezoskupené)","piggy_bank":"Pokladnička","profile_oauth_client_secret_title":"Tajný kľúč klienta","profile_oauth_client_secret_expl":"Toto je váš tajný kľúč klienta. Toto je jediný raz, kedy sa zobrazí - nestraťte ho! Odteraz môžete tento tajný kľúč používať pre prístup k API.","profile_oauth_confidential":"Dôverné","profile_oauth_confidential_help":"Vyžadujte od klienta autentifikáciu pomocou tajného kľúča. Dôverní klienti môžu uchovávať poverenia bezpečným spôsobom bez toho, aby boli vystavení neoprávneným stranám. Verejné aplikácie, ako napríklad natívna pracovná plocha alebo aplikácie Java SPA, nedokážu tajné kľúče bezpečne uchovať.","multi_account_warning_unknown":"V závislosti od typu vytvorenej transakcie, môže byť zdrojový a/alebo cieľový účet následných rozúčtovaní prepísaný údajmi v prvom rozdelení transakcie.","multi_account_warning_withdrawal":"Majte na pamäti, že zdrojový bankový účet následných rozúčtovaní bude prepísaný tým, čo je definované v prvom rozdelení výberu.","multi_account_warning_deposit":"Majte na pamäti, že zdrojový bankový účet následných rozúčtovaní bude prepísaný tým, čo je definované v prvom rozúčtovaní vkladu.","multi_account_warning_transfer":"Majte na pamäti, že zdrojový a cieľový bankový účet následných rozúčtovaní bude prepísaný tým, čo je definované v prvom rozúčtovaní prevodu."},"form":{"interest_date":"Úrokový dátum","book_date":"Dátum rezervácie","process_date":"Dátum spracovania","due_date":"Dátum splatnosti","foreign_amount":"Suma v cudzej mene","payment_date":"Dátum úhrady","invoice_date":"Dátum vystavenia","internal_reference":"Interná referencia"},"config":{"html_language":"sk"}}');

/***/ }),

/***/ "./resources/assets/js/locales/sv.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/sv.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Vad spelas?","flash_error":"Fel!","flash_success":"Slutförd!","close":"Stäng","split_transaction_title":"Beskrivning av delad transaktion","errors_submission":"Något fel uppstod med inskickningen. Vänligen kontrollera felen nedan.","split":"Dela","single_split":"Dela","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID} (\\"{title}\\")</a> sparades.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID}</a> (\\"{title}\\") uppdaterades.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaktion #{ID}</a> sparades.","transaction_journal_information":"Transaktionsinformation","no_budget_pointer":"Du verkar inte ha några budgetar än. Du bör skapa några på <a href=\\"budgets\\">budgetar</a>-sidan. Budgetar kan hjälpa dig att hålla reda på utgifter.","no_bill_pointer":"Du verkar inte ha några räkningar ännu. Du bör skapa några på <a href=\\"bills\\">räkningar</a>-sidan. Räkningar kan hjälpa dig att hålla reda på utgifter.","source_account":"Källkonto","hidden_fields_preferences":"Du kan aktivera fler transaktionsalternativ i dina <a href=\\"preferences\\">inställningar</a>.","destination_account":"Till konto","add_another_split":"Lägga till en annan delning","submission":"Inskickning","create_another":"Efter sparat, återkom hit för att skapa ytterligare en.","reset_after":"Återställ formulär efter inskickat","submit":"Skicka","amount":"Belopp","date":"Datum","tags":"Etiketter","no_budget":"(ingen budget)","no_bill":"(ingen räkning)","category":"Kategori","attachments":"Bilagor","notes":"Noteringar","external_uri":"Extern URL","update_transaction":"Uppdatera transaktion","after_update_create_another":"Efter uppdaterat, återkom hit för att fortsätta redigera.","store_as_new":"Spara en ny transaktion istället för att uppdatera.","split_title_help":"Om du skapar en delad transaktion måste det finnas en global beskrivning för alla delningar av transaktionen.","none_in_select_list":"(Ingen)","no_piggy_bank":"(ingen spargris)","description":"Beskrivning","split_transaction_title_help":"Om du skapar en delad transaktion måste det finnas en global beskrivning för alla delningar av transaktionen.","destination_account_reconciliation":"Du kan inte redigera destinationskontot för en avstämningstransaktion.","source_account_reconciliation":"Du kan inte redigera källkontot för en avstämningstransaktion.","budget":"Budget","bill":"Nota","you_create_withdrawal":"Du skapar ett uttag.","you_create_transfer":"Du skapar en överföring.","you_create_deposit":"Du skapar en insättning.","edit":"Redigera","delete":"Ta bort","name":"Namn","profile_whoops":"Hoppsan!","profile_something_wrong":"Något gick fel!","profile_try_again":"Något gick fel. Försök igen.","profile_oauth_clients":"OAuth klienter","profile_oauth_no_clients":"Du har inte skapat några OAuth klienter.","profile_oauth_clients_header":"Klienter","profile_oauth_client_id":"Klient ID","profile_oauth_client_name":"Namn","profile_oauth_client_secret":"Hemlighet","profile_oauth_create_new_client":"Skapa ny klient","profile_oauth_create_client":"Skapa klient","profile_oauth_edit_client":"Redigera klient","profile_oauth_name_help":"Något som dina användare kommer att känna igen och lita på.","profile_oauth_redirect_url":"Omdirigera URL","profile_oauth_redirect_url_help":"Din applikations auktorisering callback URL.","profile_authorized_apps":"Auktoriserade applikationer","profile_authorized_clients":"Auktoriserade klienter","profile_scopes":"Omfattningar","profile_revoke":"Återkalla","profile_personal_access_tokens":"Personliga åtkomst-Tokens","profile_personal_access_token":"Personlig åtkomsttoken","profile_personal_access_token_explanation":"Här är din nya personliga tillgångs token. Detta är den enda gången det kommer att visas så förlora inte det! Du kan nu använda denna token för att göra API-förfrågningar.","profile_no_personal_access_token":"Du har inte skapat några personliga åtkomsttokens.","profile_create_new_token":"Skapa ny token","profile_create_token":"Skapa token","profile_create":"Skapa","profile_save_changes":"Spara ändringar","default_group_title_name":"(ogrupperad)","piggy_bank":"Spargris","profile_oauth_client_secret_title":"Klienthemlighet","profile_oauth_client_secret_expl":"Här är din nya klient hemlighet. Detta är den enda gången det kommer att visas så förlora inte det! Du kan nu använda denna hemlighet för att göra API-förfrågningar.","profile_oauth_confidential":"Konfidentiell","profile_oauth_confidential_help":"Kräv att klienten autentiserar med en hemlighet. Konfidentiella klienter kan hålla autentiseringsuppgifter på ett säkert sätt utan att utsätta dem för obehöriga parter. Publika applikationer, som skrivbord eller JavaScript-SPA-applikationer, kan inte hålla hemligheter på ett säkert sätt.","multi_account_warning_unknown":"Beroende på vilken typ av transaktion du skapar, källan och/eller destinationskontot för efterföljande delningar kan åsidosättas av vad som än definieras i den första delningen av transaktionen.","multi_account_warning_withdrawal":"Tänk på att källkontot för efterföljande uppdelningar kommer att upphävas av vad som än definieras i den första uppdelningen av uttaget.","multi_account_warning_deposit":"Tänk på att destinationskontot för efterföljande uppdelningar kommer att styras av vad som än definieras i den första uppdelningen av insättningen.","multi_account_warning_transfer":"Tänk på att käll + destinationskonto av efterföljande delningar kommer att styras av vad som definieras i den första uppdelningen av överföringen."},"form":{"interest_date":"Räntedatum","book_date":"Bokföringsdatum","process_date":"Behandlingsdatum","due_date":"Förfallodatum","foreign_amount":"Utländskt belopp","payment_date":"Betalningsdatum","invoice_date":"Fakturadatum","internal_reference":"Intern referens"},"config":{"html_language":"sv"}}');

/***/ }),

/***/ "./resources/assets/js/locales/vi.json":
/*!*********************************************!*\
  !*** ./resources/assets/js/locales/vi.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"Chào mừng trở lại?","flash_error":"Lỗi!","flash_success":"Thành công!","close":"Đóng","split_transaction_title":"Mô tả giao dịch tách","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"Chia ra","single_split":"Chia ra","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Giao dịch #{ID} (\\"{title}\\")</a> đã được lưu trữ.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\"> Giao dịch #{ID}</a> đã được lưu trữ.","transaction_journal_information":"Thông tin giao dịch","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Nguồn tài khoản","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Tài khoản đích","add_another_split":"Thêm một phân chia khác","submission":"Gửi","create_another":"Sau khi lưu trữ, quay trở lại đây để tạo một cái khác.","reset_after":"Đặt lại mẫu sau khi gửi","submit":"Gửi","amount":"Số tiền","date":"Ngày","tags":"Nhãn","no_budget":"(không có ngân sách)","no_bill":"(no bill)","category":"Danh mục","attachments":"Tệp đính kèm","notes":"Ghi chú","external_uri":"URL bên ngoài","update_transaction":"Cập nhật giao dịch","after_update_create_another":"Sau khi cập nhật, quay lại đây để tiếp tục chỉnh sửa.","store_as_new":"Lưu trữ như một giao dịch mới thay vì cập nhật.","split_title_help":"Nếu bạn tạo một giao dịch phân tách, phải có một mô tả toàn cầu cho tất cả các phân chia của giao dịch.","none_in_select_list":"(Trống)","no_piggy_bank":"(chưa có heo đất)","description":"Sự miêu tả","split_transaction_title_help":"Nếu bạn tạo một giao dịch phân tách, phải có một mô tả toàn cầu cho tất cả các phân chia của giao dịch.","destination_account_reconciliation":"Bạn không thể chỉnh sửa tài khoản đích của giao dịch đối chiếu.","source_account_reconciliation":"Bạn không thể chỉnh sửa tài khoản nguồn của giao dịch đối chiếu.","budget":"Ngân sách","bill":"Hóa đơn","you_create_withdrawal":"Bạn đang tạo một <strong>rút tiền</strong>.","you_create_transfer":"Bạn đang tạo một <strong>chuyển khoản</strong>.","you_create_deposit":"Bạn đang tạo một <strong>tiền gửi</strong>.","edit":"Sửa","delete":"Xóa","name":"Tên","profile_whoops":"Rất tiếc!","profile_something_wrong":"Có lỗi xảy ra!","profile_try_again":"Xảy ra lỗi. Vui lòng thử lại.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"Bạn đã không tạo ra bất kỳ OAuth clients nào.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Tên","profile_oauth_client_secret":"Mã bí mật","profile_oauth_create_new_client":"Tạo mới Client","profile_oauth_create_client":"Tạo Client","profile_oauth_edit_client":"Sửa Client","profile_oauth_name_help":"Một cái gì đó người dùng của bạn sẽ nhận ra và tin tưởng.","profile_oauth_redirect_url":"URL chuyển tiếp","profile_oauth_redirect_url_help":"URL gọi lại ủy quyền của ứng dụng của bạn.","profile_authorized_apps":"Uỷ quyền ứng dụng","profile_authorized_clients":"Client ủy quyền","profile_scopes":"Phạm vi","profile_revoke":"Thu hồi","profile_personal_access_tokens":"Mã truy cập cá nhân","profile_personal_access_token":"Mã truy cập cá nhân","profile_personal_access_token_explanation":"Đây là mã thông báo truy cập cá nhân mới của bạn. Đây là lần duy nhất nó sẽ được hiển thị vì vậy đừng đánh mất nó! Bây giờ bạn có thể sử dụng mã thông báo này để thực hiện API.","profile_no_personal_access_token":"Bạn chưa tạo bất kỳ mã thông báo truy cập cá nhân nào.","profile_create_new_token":"Tạo mã mới","profile_create_token":"Tạo mã","profile_create":"Tạo","profile_save_changes":"Lưu thay đổi","default_group_title_name":"(chưa nhóm)","piggy_bank":"Heo đất","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"Ngày lãi","book_date":"Ngày đặt sách","process_date":"Ngày xử lý","due_date":"Ngày đáo hạn","foreign_amount":"Ngoại tệ","payment_date":"Ngày thanh toán","invoice_date":"Ngày hóa đơn","internal_reference":"Tài liệu tham khảo nội bộ"},"config":{"html_language":"vi"}}');

/***/ }),

/***/ "./resources/assets/js/locales/zh-cn.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/zh-cn.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"今天理财了吗？","flash_error":"错误！","flash_success":"成功！","close":"关闭","split_transaction_title":"拆分交易的描述","errors_submission":"您提交的内容有误，请检查错误信息。","split":"拆分","single_split":"拆分","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">交易 #{ID} (“{title}”)</a> 已保存。","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">交易 #{ID}</a> 已保存。","transaction_journal_information":"交易信息","no_budget_pointer":"您还没有预算，您应该在<a href=\\"budgets\\">预算页面</a>进行创建。预算可以帮助您追踪支出。","no_bill_pointer":"您还没有账单，您应该在<a href=\\"bills\\">账单页面</a>进行创建。账单可以帮助您追踪支出。","source_account":"来源账户","hidden_fields_preferences":"您可以在<a href=\\"preferences\\">偏好设定</a>中启用更多交易选项。","destination_account":"目标账户","add_another_split":"增加另一笔拆分","submission":"提交","create_another":"保存后，返回此页面以创建新记录","reset_after":"提交后重置表单","submit":"提交","amount":"金额","date":"日期","tags":"标签","no_budget":"(无预算)","no_bill":"(无账单)","category":"分类","attachments":"附件","notes":"备注","external_uri":"外部链接","update_transaction":"更新交易","after_update_create_another":"更新后，返回此页面继续编辑。","store_as_new":"保存为新交易而不是更新此交易。","split_title_help":"如果您创建了一笔拆分交易，必须有一个所有拆分的全局描述。","none_in_select_list":"(空)","no_piggy_bank":"(无存钱罐)","description":"描述","split_transaction_title_help":"如果您创建了一笔拆分交易，必须有一个所有拆分的全局描述。","destination_account_reconciliation":"您不能编辑对账交易的目标账户","source_account_reconciliation":"您不能编辑对账交易的来源账户。","budget":"预算","bill":"账单","you_create_withdrawal":"您正在创建一笔支出","you_create_transfer":"您正在创建一笔转账","you_create_deposit":"您正在创建一笔收入","edit":"编辑","delete":"删除","name":"名称","profile_whoops":"很抱歉！","profile_something_wrong":"发生错误！","profile_try_again":"发生错误，请稍后再试。","profile_oauth_clients":"OAuth 客户端","profile_oauth_no_clients":"您尚未创建任何 OAuth 客户端。","profile_oauth_clients_header":"客户端","profile_oauth_client_id":"客户端 ID","profile_oauth_client_name":"名称","profile_oauth_client_secret":"密钥","profile_oauth_create_new_client":"创建新客户端","profile_oauth_create_client":"创建客户端","profile_oauth_edit_client":"编辑客户端","profile_oauth_name_help":"您的用户可以识别并信任的信息","profile_oauth_redirect_url":"跳转网址","profile_oauth_redirect_url_help":"您的应用程序的授权回调网址","profile_authorized_apps":"已授权应用","profile_authorized_clients":"已授权客户端","profile_scopes":"范围","profile_revoke":"撤消","profile_personal_access_tokens":"个人访问令牌","profile_personal_access_token":"个人访问令牌","profile_personal_access_token_explanation":"请妥善保存您的新个人访问令牌，此令牌仅会在这里展示一次。您现在已可以使用此令牌进行 API 请求。","profile_no_personal_access_token":"您还没有创建个人访问令牌。","profile_create_new_token":"创建新令牌","profile_create_token":"创建令牌","profile_create":"创建","profile_save_changes":"保存更改","default_group_title_name":"(未分组)","piggy_bank":"存钱罐","profile_oauth_client_secret_title":"客户端密钥","profile_oauth_client_secret_expl":"请妥善保存您的新客户端的密钥，此密钥仅会在这里展示一次。您现在已可以使用此密钥进行 API 请求。","profile_oauth_confidential":"使用加密","profile_oauth_confidential_help":"要求客户端使用密钥进行认证。加密客户端可以安全储存凭据且不将其泄露给未授权方，而公共应用程序（例如本地计算机或 JavaScript SPA 应用程序）无法保证凭据的安全性。","multi_account_warning_unknown":"根据您创建的交易类型，后续拆分的来源和/或目标账户可能被交易的首笔拆分的配置所覆盖。","multi_account_warning_withdrawal":"请注意，后续拆分的来源账户将会被支出的首笔拆分的配置所覆盖。","multi_account_warning_deposit":"请注意，后续拆分的目标账户将会被收入的首笔拆分的配置所覆盖。","multi_account_warning_transfer":"请注意，后续拆分的来源和目标账户将会被转账的首笔拆分的配置所覆盖。"},"form":{"interest_date":"利息日期","book_date":"登记日期","process_date":"处理日期","due_date":"到期日","foreign_amount":"外币金额","payment_date":"付款日期","invoice_date":"发票日期","internal_reference":"内部引用"},"config":{"html_language":"zh-cn"}}');

/***/ }),

/***/ "./resources/assets/js/locales/zh-tw.json":
/*!************************************************!*\
  !*** ./resources/assets/js/locales/zh-tw.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"firefly":{"welcome_back":"What\'s playing?","flash_error":"錯誤！","flash_success":"成功！","close":"關閉","split_transaction_title":"拆分交易的描述","errors_submission":"There was something wrong with your submission. Please check out the errors.","split":"分割","single_split":"Split","transaction_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID} (\\"{title}\\")</a> has been stored.","transaction_updated_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> (\\"{title}\\") has been updated.","transaction_new_stored_link":"<a href=\\"transactions/show/{ID}\\">Transaction #{ID}</a> has been stored.","transaction_journal_information":"交易資訊","no_budget_pointer":"You seem to have no budgets yet. You should create some on the <a href=\\"budgets\\">budgets</a>-page. Budgets can help you keep track of expenses.","no_bill_pointer":"You seem to have no bills yet. You should create some on the <a href=\\"bills\\">bills</a>-page. Bills can help you keep track of expenses.","source_account":"Source account","hidden_fields_preferences":"You can enable more transaction options in your <a href=\\"preferences\\">preferences</a>.","destination_account":"Destination account","add_another_split":"增加拆分","submission":"Submission","create_another":"After storing, return here to create another one.","reset_after":"Reset form after submission","submit":"送出","amount":"金額","date":"日期","tags":"標籤","no_budget":"(無預算)","no_bill":"(no bill)","category":"分類","attachments":"附加檔案","notes":"備註","external_uri":"External URL","update_transaction":"Update transaction","after_update_create_another":"After updating, return here to continue editing.","store_as_new":"Store as a new transaction instead of updating.","split_title_help":"若您建立一筆拆分交易，須有一個有關交易所有拆分的整體描述。","none_in_select_list":"(空)","no_piggy_bank":"(no piggy bank)","description":"描述","split_transaction_title_help":"If you create a split transaction, there must be a global description for all splits of the transaction.","destination_account_reconciliation":"You can\'t edit the destination account of a reconciliation transaction.","source_account_reconciliation":"You can\'t edit the source account of a reconciliation transaction.","budget":"預算","bill":"帳單","you_create_withdrawal":"You\'re creating a withdrawal.","you_create_transfer":"You\'re creating a transfer.","you_create_deposit":"You\'re creating a deposit.","edit":"編輯","delete":"刪除","name":"名稱","profile_whoops":"Whoops!","profile_something_wrong":"Something went wrong!","profile_try_again":"Something went wrong. Please try again.","profile_oauth_clients":"OAuth Clients","profile_oauth_no_clients":"You have not created any OAuth clients.","profile_oauth_clients_header":"Clients","profile_oauth_client_id":"Client ID","profile_oauth_client_name":"Name","profile_oauth_client_secret":"Secret","profile_oauth_create_new_client":"Create New Client","profile_oauth_create_client":"Create Client","profile_oauth_edit_client":"Edit Client","profile_oauth_name_help":"Something your users will recognize and trust.","profile_oauth_redirect_url":"Redirect URL","profile_oauth_redirect_url_help":"Your application\'s authorization callback URL.","profile_authorized_apps":"Authorized applications","profile_authorized_clients":"Authorized clients","profile_scopes":"Scopes","profile_revoke":"Revoke","profile_personal_access_tokens":"Personal Access Tokens","profile_personal_access_token":"Personal Access Token","profile_personal_access_token_explanation":"Here is your new personal access token. This is the only time it will be shown so don\'t lose it! You may now use this token to make API requests.","profile_no_personal_access_token":"You have not created any personal access tokens.","profile_create_new_token":"Create new token","profile_create_token":"Create token","profile_create":"Create","profile_save_changes":"Save changes","default_group_title_name":"(ungrouped)","piggy_bank":"小豬撲滿","profile_oauth_client_secret_title":"Client Secret","profile_oauth_client_secret_expl":"Here is your new client secret. This is the only time it will be shown so don\'t lose it! You may now use this secret to make API requests.","profile_oauth_confidential":"Confidential","profile_oauth_confidential_help":"Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely.","multi_account_warning_unknown":"Depending on the type of transaction you create, the source and/or destination account of subsequent splits may be overruled by whatever is defined in the first split of the transaction.","multi_account_warning_withdrawal":"Keep in mind that the source account of subsequent splits will be overruled by whatever is defined in the first split of the withdrawal.","multi_account_warning_deposit":"Keep in mind that the destination account of subsequent splits will be overruled by whatever is defined in the first split of the deposit.","multi_account_warning_transfer":"Keep in mind that the source + destination account of subsequent splits will be overruled by whatever is defined in the first split of the transfer."},"form":{"interest_date":"利率日期","book_date":"登記日期","process_date":"處理日期","due_date":"到期日","foreign_amount":"外幣金額","payment_date":"付款日期","invoice_date":"發票日期","internal_reference":"內部參考"},"config":{"html_language":"zh-tw"}}');

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/*!*******************************************************!*\
  !*** ./resources/assets/js/real_estate_management.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_real_estate_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/real_estate_management */ "./resources/assets/js/components/real_estate_management/index.vue");
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


Vue.component('real-estate-management', _components_real_estate_management__WEBPACK_IMPORTED_MODULE_0__["default"]);

var i18n = __webpack_require__(/*! ./i18n */ "./resources/assets/js/i18n.js");

var props = {};
new Vue({
  i18n: i18n,
  el: "#real_estate_management",
  render: function render(createElement) {
    return createElement(_components_real_estate_management__WEBPACK_IMPORTED_MODULE_0__["default"], {
      props: props
    });
  }
});
})();

/******/ })()
;