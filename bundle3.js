(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
const { StopwordsIt } = require('@nlpjs/lang-it');
},{"@nlpjs/lang-it":24}],3:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Class for an Among of a Stemmer
 */
class Among {
  constructor(s, sub, result, method, instance) {
    this.s_size = s.length;
    this.s = s;
    this.substring_i = sub;
    this.result = result;
    this.method = method;
    this.instance = instance;
  }
}

module.exports = Among;

},{}],4:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

/**
 * Plugin to convert an array to a hashmap where every item existing in the
 * array is mapped to a 1.
 */
class ArrToObj {
  /**
   * Constructor of the class
   * @param {object} container Parent container, if not defined then the
   *    default container is used.
   */
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'arrToObj';
  }

  /**
   * Static method to convert an array to a hashmap object.
   * @param {object[]} arr Input array.
   * @returns {object} Output object.
   */
  static arrToObj(arr) {
    const result = {};
    for (let i = 0; i < arr.length; i += 1) {
      result[arr[i]] = 1;
    }
    return result;
  }

  run(input) {
    if (Array.isArray(input)) {
      return ArrToObj.arrToObj(input);
    }
    input.tokens = ArrToObj.arrToObj(input.tokens);
    return input;
  }
}

module.exports = ArrToObj;

},{"./container":8}],5:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');
const Tokenizer = require('./tokenizer');

/* eslint-disable */
class BaseStemmer {
  constructor(container = defaultContainer, dictionary) {
    this.container = container.container || container;
    this.cache = {};
    this.setCurrent("");
    this.dictionary = dictionary || { before: {}, after: {}};
  }

  setCurrent(value) {
    this.current = value;
    this.cursor = 0;
    this.limit = this.current.length;
    this.limit_backward = 0;
    this.bra = this.cursor;
    this.ket = this.limit;
  }

  getCurrent() {
    return this.current;
  }

  bc(s, ch) {
    if ((s[ch >>> 3] & (0x1 << (ch & 0x7))) == 0) {
      return true;
    }
    return false;
  }

  in_grouping(s, min, max) {
    if (this.cursor >= this.limit) return false;
    let ch = this.current.charCodeAt(this.cursor);
    if (ch > max || ch < min) return false;
    ch -= min;
    if (this.bc(s, ch)) return false;
    this.cursor++;
    return true;
  }

  in_grouping_b(s, min, max) {
    if (this.cursor <= this.limit_backward) return false;
    let ch = this.current.charCodeAt(this.cursor - 1);
    if (ch > max || ch < min) return false;
    ch -= min;
    if (this.bc(s, ch)) return false;
    this.cursor--;
    return true;
  }

  out_grouping(s, min, max) {
    if (this.cursor >= this.limit) return false;
    let ch = this.current.charCodeAt(this.cursor);
    if (ch > max || ch < min) {
      this.cursor++;
      return true;
    }
    ch -= min;
    if (this.bc(s, ch)) {
      this.cursor++;
      return true;
    }
    return false;
  }

  out_grouping_b(s, min, max) {
    if (this.cursor <= this.limit_backward) return false;
    let ch = this.current.charCodeAt(this.cursor - 1);
    if (ch > max || ch < min) {
      this.cursor--;
      return true;
    }
    ch -= min;
    if (this.bc(s, ch)) {
      this.cursor--;
      return true;
    }
    return false;
  }

  eq_s(s_size, s) {
    if (typeof s_size === 'string') {
      s = s_size;
      s_size = s.length;
    }
    if ((this.limit - this.cursor < s_size) || (this.current.slice(this.cursor, this.cursor + s_size) != s)) {
      return false;
    }
    this.cursor += s_size;
    return true;
  }

  eq_s_b(s_size, s) {
    if (typeof s_size === 'string') {
      s = s_size;
      s_size = s.length;
    }
    if ((this.cursor - this.limit_backward < s_size) || (this.current.slice(this.cursor - s_size, this.cursor) != s)) {
      return false;
    }
    this.cursor -= s_size;
    return true;
  }

  find_among(v, v_size) {
    let i = 0;
    let j = v_size || v.length;

    const c = this.cursor;
    const l = this.limit;

    let common_i = 0;
    let common_j = 0;

    let first_key_inspected = false;

    while (true) {
      const k = i + ((j - i) >>> 1);
      let diff = 0;
      let common = common_i < common_j ? common_i : common_j; // smaller
      var w = v[k];
      var i2;
      for (i2 = common; i2 < w.s_size; i2++) {
        if (c + common == l) {
          diff = -1;
          break;
        }
        diff = this.current.charCodeAt(c + common) - w.s.charCodeAt(i2);
        if (diff != 0) break;
        common++;
      }
      if (diff < 0) {
        j = k;
        common_j = common;
      } else {
        i = k;
        common_i = common;
      }
      if (j - i <= 1) {
        if (i > 0) break; // v->s has been inspected
        if (j == i) break; // only one item in v

        // - but now we need to go round once more to get
        // v->s inspected. This looks messy, but is actually
        // the optimal approach.

        if (first_key_inspected) break;
        first_key_inspected = true;
      }
    }
    while (true) {
      var w = v[i];
      if (common_i >= w.s_size) {
        this.cursor = c + w.s_size;
        if (w.method == null) {
          return w.result;
        }
        const res = w.method(w.instance);
        this.cursor = c + w.s_size;
        if (res) {
          return w.result;
        }
      }
      i = w.substring_i;
      if (i < 0) return 0;
    }
    return -1; // not reachable
  }

  // find_among_b is for backwards processing. Same comments apply
  find_among_b(v, v_size) {
    let i = 0;
    let j = v_size || v.length;

    const c = this.cursor;
    const lb = this.limit_backward;

    let common_i = 0;
    let common_j = 0;

    let first_key_inspected = false;

    while (true) {
      const k = i + ((j - i) >> 1);
      let diff = 0;
      let common = common_i < common_j ? common_i : common_j;
      var w = v[k];
      var i2;
      for (i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
        if (c - common == lb) {
          diff = -1;
          break;
        }
        diff = this.current.charCodeAt(c - 1 - common) - w.s.charCodeAt(i2);
        if (diff != 0) break;
        common++;
      }
      if (diff < 0) {
        j = k;
        common_j = common;
      } else {
        i = k;
        common_i = common;
      }
      if (j - i <= 1) {
        if (i > 0) break;
        if (j == i) break;
        if (first_key_inspected) break;
        first_key_inspected = true;
      }
    }
    while (true) {
      var w = v[i];
      if (common_i >= w.s_size) {
        this.cursor = c - w.s_size;
        if (w.method == null) return w.result;
        const res = w.method(this);
        this.cursor = c - w.s_size;
        if (res) return w.result;
      }
      i = w.substring_i;
      if (i < 0) return 0;
    }
    return -1; // not reachable
  }

  /* to replace chars between c_bra and c_ket in this.current by the
   * chars in s.
   */
  replace_s(c_bra, c_ket, s) {
    const adjustment = s.length - (c_ket - c_bra);
    this.current = this.current.slice(0, c_bra) + s + this.current.slice(c_ket);
    this.limit += adjustment;
    if (this.cursor >= c_ket) this.cursor += adjustment;
    else if (this.cursor > c_bra) this.cursor = c_bra;
    return adjustment;
  }

  slice_check() {
    if (
      this.bra < 0 ||
      this.bra > this.ket ||
      this.ket > this.limit ||
      this.limit > this.current.length
    ) {
      return false;
    }
    return true;
  }

  slice_from(s) {
    if (this.slice_check()) {
      this.replace_s(this.bra, this.ket, s);
      return true;
    }
    return false;
  }

  slice_del() {
    return this.slice_from("");
  }

  insert(c_bra, c_ket, s) {
    const adjustment = this.replace_s(c_bra, c_ket, s);
    if (c_bra <= this.bra) this.bra += adjustment;
    if (c_bra <= this.ket) this.ket += adjustment;
  }

  /* Copy the slice into the supplied StringBuffer */
  slice_to(s) {
    let result = "";
    if (this.slice_check()) {
      result = this.current.slice(this.bra, this.ket);
    }
    return result;
  }

  stemWord(word) {
    let result = this.cache[`.${word}`];
    if (result == null) {
      if (this.dictionary.before.hasOwnProperty(word)) {
        result = this.dictionary.before[word];
      } else {
        this.setCurrent(word);
        this.innerStem();
        result = this.getCurrent();
        if (this.dictionary.after.hasOwnProperty(result)) {
          result = this.dictionary.after[result];
        }
      }
      this.cache[`.${word}`] = result;
    }
    return result;
  }

  stemWords(words) {
    const results = [];
    for (let i = 0; i < words.length; i++) {
      const stemmed = this.stemWord(words[i]);
      if (stemmed) {
        results.push(stemmed.trim());
      }
    }
    return results;
  }

  stem(tokens) {
    if (tokens === undefined || tokens === null) {
      return tokens;
    }
    if (!Array.isArray(tokens)) {
      return this.stemWords([tokens])[0];
    }
    return this.stemWords(tokens);
  }

  getTokenizer() {
    if (!this.tokenizer) {
      this.tokenizer =
        this.container.get(`tokenizer-${this.name.slice(-2)}`) ||
        new Tokenizer();
    }
    return this.tokenizer;
  }

  getStopwords() {
    if (!this.stopwords) {
      this.stopwords = this.container.get(`tokenizer-${this.name.slice(-2)}`);
    }
    return this.stopwords;
  }

  tokenizeAndStem(text, keepStops = true) {
    const tokenizer = this.getTokenizer();
    let tokens = tokenizer.tokenize(text, true);
    if (!keepStops) {
      const stopwords = this.getStopwords();
      if (stopwords) {
        tokens = stopwords.removeStopwords(tokens);
      }
    }
    return this.stemWords(tokens);
  }
}

module.exports = BaseStemmer;

},{"./container":8,"./tokenizer":22}],6:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Clonable {
  /**
   * Constructor of the class
   * @param {object} settings
   */
  constructor(settings = {}, container = defaultContainer) {
    this.container = settings.container || container;
    this.applySettings(this, settings);
  }

  get logger() {
    return this.container.get('logger');
  }

  /**
   * Apply default settings to an object.
   * @param {object} obj Target object.
   * @param {object} settings Input settings.
   */
  applySettings(srcobj, settings = {}) {
    const obj = srcobj || {};
    Object.keys(settings).forEach((key) => {
      if (obj[key] === undefined) {
        obj[key] = settings[key];
      }
    });
    return obj;
  }

  toJSON() {
    const settings = this.jsonExport || {};
    const result = {};
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (
        key !== 'jsonExport' &&
        key !== 'jsonImport' &&
        key !== 'container' &&
        !key.startsWith('pipeline')
      ) {
        const fn = settings[key] === undefined ? true : settings[key];
        if (typeof fn === 'function') {
          const value = fn.bind(this)(result, this, key, this[key]);
          if (value) {
            result[key] = value;
          }
        } else if (typeof fn === 'boolean') {
          if (fn) {
            result[key] = this[key];
            if (key === 'settings') {
              delete result[key].container;
            }
          }
        } else if (typeof fn === 'string') {
          result[fn] = this[key];
        }
      }
    }
    return result;
  }

  fromJSON(json) {
    const settings = this.jsonImport || {};
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const fn = settings[key] === undefined ? true : settings[key];
      if (typeof fn === 'function') {
        const value = fn.bind(this)(this, json, key, json[key]);
        if (value) {
          this[key] = value;
        }
      } else if (typeof fn === 'boolean') {
        if (fn) {
          this[key] = json[key];
        }
      } else if (typeof fn === 'string') {
        this[fn] = json[key];
      }
    }
  }

  objToValues(obj, srcKeys) {
    const keys = srcKeys || Object.keys(obj);
    const result = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push(obj[keys[i]]);
    }
    return result;
  }

  valuesToObj(values, keys) {
    const result = {};
    for (let i = 0; i < values.length; i += 1) {
      result[keys[i]] = values[i];
    }
    return result;
  }

  getPipeline(tag) {
    return this.container.getPipeline(tag);
  }

  async runPipeline(input, pipeline) {
    return this.container.runPipeline(pipeline || this.pipeline, input, this);
  }

  use(item) {
    this.container.use(item);
  }
}

module.exports = Clonable;

},{"./container":8}],7:[function(require,module,exports){
(function (process){(function (){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const ArrToObj = require('./arr-to-obj');
const { Container } = require('./container');
const Normalizer = require('./normalizer');
const ObjToArr = require('./obj-to-arr');
const { loadEnvFromJson } = require('./helper');
const Stemmer = require('./stemmer');
const Stopwords = require('./stopwords');
const Tokenizer = require('./tokenizer');
const Timer = require('./timer');
const logger = require('./logger');
const MemoryStorage = require('./memory-storage');
const fs = require('./mock-fs');

function loadPipelinesStr(instance, pipelines) {
  instance.loadPipelinesFromString(pipelines);
}

function traverse(obj, preffix) {
  if (typeof obj === 'string') {
    if (obj.startsWith('$')) {
      return (
        process.env[`${preffix}${obj.slice(1)}`] || process.env[obj.slice(1)]
      );
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((x) => traverse(x, preffix));
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    const result = {};
    for (let i = 0; i < keys.length; i += 1) {
      result[keys[i]] = traverse(obj[keys[i]], preffix);
    }
    return result;
  }
  return obj;
}

function containerBootstrap(
  inputSettings,
  mustLoadEnv,
  container,
  preffix,
  pipelines,
  parent
) {
  const srcSettings = inputSettings || {};
  const instance = container || new Container(preffix);
  instance.parent = parent;
  if (!preffix) {
    instance.register('fs', fs);
    instance.use(ArrToObj);
    instance.use(Normalizer);
    instance.use(ObjToArr);
    instance.use(Stemmer);
    instance.use(Stopwords);
    instance.use(Tokenizer);
    instance.use(Timer);
    instance.use(logger);
    instance.use(MemoryStorage);
  }
  const settings = srcSettings;
  if (srcSettings.env) {
    loadEnvFromJson(preffix, srcSettings.env);
  }
  let configuration;
  configuration = settings;
  configuration = traverse(configuration, preffix ? `${preffix}_` : '');
  if (configuration.settings) {
    const keys = Object.keys(configuration.settings);
    for (let i = 0; i < keys.length; i += 1) {
      instance.registerConfiguration(
        keys[i],
        configuration.settings[keys[i]],
        true
      );
    }
  }
  if (configuration.use) {
    for (let i = 0; i < configuration.use.length; i += 1) {
      const item = configuration.use[i];
      if (Array.isArray(item)) {
        instance.register(item[0], item[1]);
      } else {
        instance.use(item);
      }
    }
  }
  if (configuration.terraform) {
    for (let i = 0; i < configuration.terraform.length; i += 1) {
      const current = configuration.terraform[i];
      const terra = instance.get(current.className);
      instance.register(current.name, terra, true);
    }
  }
  if (configuration.childs) {
    instance.childs = configuration.childs;
  }
  if (pipelines) {
    for (let i = 0; i < pipelines.length; i += 1) {
      const pipeline = pipelines[i];
      instance.registerPipeline(
        pipeline.tag,
        pipeline.pipeline,
        pipeline.overwrite
      );
    }
  }
  if (configuration.pipelines) {
    loadPipelinesStr(instance, configuration.pipelines);
  }
  return instance;
}

module.exports = containerBootstrap;

}).call(this)}).call(this,require('_process'))
},{"./arr-to-obj":4,"./container":8,"./helper":12,"./logger":14,"./memory-storage":15,"./mock-fs":16,"./normalizer":17,"./obj-to-arr":18,"./stemmer":19,"./stopwords":20,"./timer":21,"./tokenizer":22,"_process":1}],8:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { compareWildcars } = require('./helper');
const DefaultCompiler = require('./default-compiler');
const logger = require('./logger');

/**
 * Container class
 */
class Container {
  /**
   * Constructor of the class.
   */
  constructor(hasPreffix = false) {
    this.classes = {};
    this.factory = {};
    this.pipelines = {};
    this.configurations = {};
    this.compilers = {};
    this.cache = {
      bestKeys: {},
      pipelines: {},
    };
    this.registerCompiler(DefaultCompiler);
    if (!hasPreffix) {
      this.use(logger);
    }
  }

  registerCompiler(Compiler, name) {
    const instance = new Compiler(this);
    this.compilers[name || instance.name] = instance;
  }

  addClass(clazz, name) {
    this.classes[name || clazz.name] = clazz;
  }

  toJSON(instance) {
    const result = instance.toJSON ? instance.toJSON() : { ...instance };
    result.className = instance.constructor.name;
    return result;
  }

  fromJSON(obj, settings) {
    const Clazz = this.classes[obj.className];
    let instance;
    if (Clazz) {
      instance = new Clazz(settings);
      if (instance.fromJSON) {
        instance.fromJSON(obj);
      } else {
        Object.assign(instance, obj);
      }
    } else {
      instance = { ...obj };
    }
    delete instance.className;
    return instance;
  }

  register(name, Clazz, isSingleton = true) {
    this.cache.bestKeys = {};
    const isClass = typeof Clazz === 'function';
    const item = { name, isSingleton };
    if (isSingleton) {
      item.instance = isClass ? new Clazz() : Clazz;
    } else {
      item.instance = isClass ? Clazz : Clazz.constructor;
    }
    this.factory[name] = item;
  }

  getBestKey(name) {
    if (this.cache.bestKeys[name] !== undefined) {
      return this.cache.bestKeys[name];
    }
    const keys = Object.keys(this.factory);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(name, keys[i])) {
        this.cache.bestKeys[name] = keys[i];
        return keys[i];
      }
    }
    this.cache.bestKeys[name] = null;
    return undefined;
  }

  get(name, settings) {
    let item = this.factory[name];
    if (!item) {
      if (this.parent) {
        return this.parent.get(name, settings);
      }
      const key = this.getBestKey(name);
      if (key) {
        item = this.factory[key];
      }
      if (!item) {
        return undefined;
      }
    }
    if (item.isSingleton) {
      if (item.instance && item.instance.applySettings) {
        item.instance.applySettings(item.instance.settings, settings);
      }
      return item.instance;
    }
    const Clazz = item.instance;
    return new Clazz(settings, this);
  }

  buildLiteral(subtype, step, value, context) {
    return {
      type: 'literal',
      subtype,
      src: step,
      value,
      context,
      container: this,
    };
  }

  resolvePathWithType(step, context, input, srcObject) {
    const tokens = step.split('.');
    let token = tokens[0].trim();
    if (!token) {
      token = step.startsWith('.') ? 'this' : 'context';
    }
    const isnum = /^\d+$/.test(token);
    if (isnum) {
      return this.buildLiteral('number', step, parseFloat(token), context);
    }
    if (token.startsWith('"')) {
      return this.buildLiteral(
        'string',
        step,
        token.replace(/^"(.+(?="$))"$/, '$1'),
        context
      );
    }
    if (token.startsWith("'")) {
      return this.buildLiteral(
        'string',
        step,
        token.replace(/^'(.+(?='$))'$/, '$1'),
        context
      );
    }
    if (token === 'true') {
      return this.buildLiteral('boolean', step, true, context);
    }
    if (token === 'false') {
      return this.buildLiteral('boolean', step, false, context);
    }
    let currentObject = context;
    if (token === 'input' || token === 'output') {
      currentObject = input;
    } else if (token && token !== 'context' && token !== 'this') {
      currentObject = this.get(token) || currentObject[token];
    } else if (token === 'this') {
      currentObject = srcObject;
    }
    for (let i = 1; i < tokens.length; i += 1) {
      const currentToken = tokens[i];
      if (!currentObject || !currentObject[currentToken]) {
        if (i < tokens.length - 1) {
          throw Error(`Path not found in pipeline "${step}"`);
        }
      }
      const prevCurrentObject = currentObject;
      currentObject = currentObject[currentToken];
      if (typeof currentObject === 'function') {
        currentObject = currentObject.bind(prevCurrentObject);
      }
    }
    if (typeof currentObject === 'function') {
      return {
        type: 'function',
        src: step,
        value: currentObject,
        context,
        container: this,
      };
    }
    return {
      type: 'reference',
      src: step,
      value: currentObject,
      context,
      container: this,
    };
  }

  resolvePath(step, context, input, srcObject) {
    const result = this.resolvePathWithType(step, context, input, srcObject);
    return result ? result.value : result;
  }

  setValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] = value;
  }

  incValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    if (path.startsWith('.')) {
      tokens.push('this');
    }
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] += value;
  }

  decValue(path, valuePath, context, input, srcObject) {
    const value = this.resolvePath(valuePath, context, input, srcObject);
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    currentObject[tokens[tokens.length - 1]] -= value;
  }

  eqValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA === valueB;
  }

  neqValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA !== valueB;
  }

  gtValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA > valueB;
  }

  geValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA >= valueB;
  }

  ltValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA < valueB;
  }

  leValue(pathA, pathB, srcContext, input, srcObject) {
    const context = srcContext;
    const valueA = this.resolvePath(pathA, context, input, srcObject);
    const valueB = this.resolvePath(pathB, context, input, srcObject);
    context.floating = valueA <= valueB;
  }

  deleteValue(path, context, input, srcObject) {
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    delete currentObject[tokens[tokens.length - 1]];
  }

  getValue(srcPath, context, input, srcObject) {
    const path = srcPath || 'floating';
    const tokens = path.split('.');
    const newPath = tokens.slice(0, -1).join('.');
    const currentObject = this.resolvePath(newPath, context, input, srcObject);
    return currentObject[tokens[tokens.length - 1]];
  }

  async runPipeline(srcPipeline, input, srcObject, depth = 0) {
    if (depth > 10) {
      throw new Error(
        'Pipeline depth is too high: perhaps you are using recursive pipelines?'
      );
    }
    const pipeline =
      typeof srcPipeline === 'string'
        ? this.getPipeline(srcPipeline)
        : srcPipeline;
    if (!pipeline) {
      throw new Error(`Pipeline not found ${srcPipeline}`);
    }
    if (!pipeline.compiler) {
      const tag = JSON.stringify(pipeline);
      this.registerPipeline(tag, pipeline, false);
      const built = this.getPipeline(tag);
      return built.compiler.execute(built.compiled, input, srcObject, depth);
    }
    return pipeline.compiler.execute(
      pipeline.compiled,
      input,
      srcObject,
      depth
    );
  }

  use(item, name, isSingleton, onlyIfNotExists = false) {
    let instance;
    if (typeof item === 'function') {
      if (item.name.endsWith('Compiler')) {
        this.registerCompiler(item);
        return item.name;
      }
      const Clazz = item;
      instance = new Clazz({ container: this });
    } else {
      instance = item;
    }
    if (instance.register) {
      instance.register(this);
    }
    const tag = instance.settings ? instance.settings.tag : undefined;
    const itemName =
      name || instance.name || tag || item.name || instance.constructor.name;
    if (!onlyIfNotExists || !this.get(itemName)) {
      this.register(itemName, instance, isSingleton);
    }
    return itemName;
  }

  getCompiler(name) {
    const compiler = this.compilers[name];
    if (compiler) {
      return compiler;
    }
    if (this.parent) {
      return this.parent.getCompiler(name);
    }
    return this.compilers.default;
  }

  buildPipeline(srcPipeline, prevPipeline = []) {
    const pipeline = [];
    if (srcPipeline && srcPipeline.length > 0) {
      for (let i = 0; i < srcPipeline.length; i += 1) {
        const line = srcPipeline[i];
        if (line.trim() === '$super') {
          for (let j = 0; j < prevPipeline.length; j += 1) {
            const s = prevPipeline[j].trim();
            if (!s.startsWith('->')) {
              pipeline.push(prevPipeline[j]);
            }
          }
        } else {
          pipeline.push(line);
        }
      }
    }
    const compilerName =
      !pipeline.length || !pipeline[0].startsWith('// compiler=')
        ? 'default'
        : pipeline[0].slice(12);
    const compiler = this.getCompiler(compilerName);
    const compiled = compiler.compile(pipeline);
    return {
      pipeline,
      compiler,
      compiled,
    };
  }

  registerPipeline(tag, pipeline, overwrite = true) {
    if (overwrite || !this.pipelines[tag]) {
      this.cache.pipelines = {};
      const prev = this.getPipeline(tag);
      this.pipelines[tag] = this.buildPipeline(
        pipeline,
        prev ? prev.pipeline : []
      );
    }
  }

  registerPipelineForChilds(childName, tag, pipeline, overwrite = true) {
    if (!this.childPipelines) {
      this.childPipelines = {};
    }
    if (!this.childPipelines[childName]) {
      this.childPipelines[childName] = [];
    }
    this.childPipelines[childName].push({ tag, pipeline, overwrite });
  }

  getPipeline(tag) {
    if (this.pipelines[tag]) {
      return this.pipelines[tag];
    }
    if (this.cache.pipelines[tag] !== undefined) {
      return this.cache.pipelines[tag] || undefined;
    }
    const keys = Object.keys(this.pipelines);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(tag, keys[i])) {
        this.cache.pipelines[tag] = this.pipelines[keys[i]];
        return this.pipelines[keys[i]];
      }
    }
    this.cache.pipelines[tag] = null;
    return undefined;
  }

  registerConfiguration(tag, configuration, overwrite = true) {
    if (overwrite || !this.configurations[tag]) {
      this.configurations[tag] = configuration;
    }
  }

  getConfiguration(tag) {
    if (this.configurations[tag]) {
      return this.configurations[tag];
    }
    const keys = Object.keys(this.configurations);
    for (let i = 0; i < keys.length; i += 1) {
      if (compareWildcars(tag, keys[i])) {
        return this.configurations[keys[i]];
      }
    }
    return undefined;
  }

  loadPipelinesFromString(str = '') {
    const lines = str.split(/\n|\r|\r\n/);
    let currentName = '';
    let currentPipeline = [];
    let currentTitle = '';
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (line !== '') {
        if (line.startsWith('# ')) {
          if (currentName) {
            if (
              currentTitle &&
              !['default', 'pipelines'].includes(currentTitle.toLowerCase())
            ) {
              this.registerPipelineForChilds(
                currentTitle,
                currentName,
                currentPipeline
              );
            } else {
              this.registerPipeline(currentName, currentPipeline);
            }
          }
          currentTitle = line.slice(1).trim();
          currentName = '';
          currentPipeline = [];
        } else if (line.startsWith('## ')) {
          if (currentName) {
            if (
              currentTitle &&
              !['default', 'pipelines'].includes(currentTitle.toLowerCase())
            ) {
              this.registerPipelineForChilds(
                currentTitle,
                currentName,
                currentPipeline
              );
            } else {
              this.registerPipeline(currentName, currentPipeline);
            }
          }
          currentName = line.slice(2).trim();
          currentPipeline = [];
        } else if (currentName) {
          currentPipeline.push(line);
        }
      }
    }
    if (currentName) {
      if (
        currentTitle &&
        !['default', 'pipelines'].includes(currentTitle.toLowerCase())
      ) {
        this.registerPipelineForChilds(
          currentTitle,
          currentName,
          currentPipeline
        );
      } else {
        this.registerPipeline(currentName, currentPipeline);
      }
    }
  }

  async start(pipelineName = 'main') {
    const keys = Object.keys(this.factory);
    for (let i = 0; i < keys.length; i += 1) {
      const current = this.factory[keys[i]];
      if (current.isSingleton && current.instance && current.instance.start) {
        await current.instance.start();
      }
    }
    if (this.getPipeline(pipelineName)) {
      await this.runPipeline(pipelineName, {}, this);
    }
  }
}

const defaultContainer = new Container();

module.exports = {
  Container,
  defaultContainer,
};

},{"./default-compiler":10,"./helper":12,"./logger":14}],9:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Clonable = require('./clonable');

class Context extends Clonable {
  constructor(settings = {}, container = undefined) {
    super(
      {
        settings: {},
        container: settings.container || container || defaultContainer,
      },
      container
    );
    this.applySettings(this.settings, settings);
    if (!this.settings.tag) {
      this.settings.tag = 'context';
    }
    this.applySettings(
      this.settings,
      this.container.getConfiguration(this.settings.tag)
    );
  }

  getStorage() {
    const storage = this.container.get(this.settings.storageName || 'storage');
    if (!storage) {
      throw new Error('Storage not found');
    }
    return storage;
  }

  getContext(key) {
    const storage = this.getStorage();
    return storage.read(`${this.settings.tag}-${key}`);
  }

  setContext(key, value) {
    const storage = this.getStorage();
    const change = {
      [key]: value,
    };
    return storage.write(change);
  }

  async getContextValue(key, valueName) {
    const context = await this.getContext(key);
    return context ? context[valueName] : undefined;
  }

  async setContextValue(key, valueName, value) {
    let context = await this.getContext(key);
    if (!context) {
      context = {};
    }
    context[valueName] = value;
    return this.setContext(key, context);
  }
}

module.exports = Context;

},{"./clonable":6,"./container":8}],10:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class DefaultCompiler {
  constructor(container) {
    this.container = container.container || container;
    this.name = 'default';
  }

  getTokenFromWord(word) {
    if (word.startsWith('//')) {
      return {
        type: 'comment',
        value: word,
      };
    }
    if (
      [
        'set',
        'delete',
        'get',
        'inc',
        'dec',
        'eq',
        'neq',
        'gt',
        'ge',
        'lt',
        'le',
        'label',
        'goto',
        'jne',
        'je',
      ].includes(word)
    ) {
      return {
        type: word,
        arguments: [],
      };
    }
    if (word.startsWith('$')) {
      return {
        type: 'call',
        value: word.slice(1),
      };
    }
    return {
      type: 'reference',
      value: word,
    };
  }

  compile(pipeline) {
    const result = [];
    for (let i = 0; i < pipeline.length; i += 1) {
      const line = pipeline[i].trim();
      const words = line.split(' ');
      const tokens = [];
      let currentString = '';
      let currentQuote;
      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        let processed = false;
        if (!currentQuote) {
          if (word.startsWith('"')) {
            currentString = word;
            processed = true;
            currentQuote = '"';
            if (word.endsWith('"')) {
              currentQuote = undefined;
              tokens.push(this.getTokenFromWord(currentString));
            }
          } else if (word.startsWith("'")) {
            currentString = word;
            processed = true;
            currentQuote = "'";
            if (word.endsWith("'")) {
              currentQuote = undefined;
              tokens.push(this.getTokenFromWord(currentString));
            }
          }
        } else {
          currentString = `${currentString} ${word}`;
          processed = true;
          if (word.endsWith(currentQuote)) {
            currentQuote = undefined;
            tokens.push(this.getTokenFromWord(currentString));
          }
        }
        if (!processed) {
          tokens.push(this.getTokenFromWord(word));
        }
      }
      result.push(tokens);
    }
    return result;
  }

  executeCall(firstToken, context, input, srcObject, depth) {
    const pipeline = this.container.getPipeline(firstToken.value);
    if (!pipeline) {
      throw new Error(`Pipeline $${firstToken.value} not found.`);
    }
    return this.container.runPipeline(pipeline, input, srcObject, depth + 1);
  }

  executeReference(step, firstToken, context, input, srcObject) {
    const currentObject = this.container.resolvePath(
      firstToken.value,
      context,
      input,
      srcObject
    );
    const args = [];
    for (let i = 1; i < step.length; i += 1) {
      args.push(
        this.container.resolvePathWithType(
          step[i].value,
          context,
          input,
          srcObject
        )
      );
    }
    if (!currentObject) {
      throw new Error(`Method not found for step ${JSON.stringify(step)}`);
    }
    const method = currentObject.run || currentObject;
    if (typeof method === 'function') {
      return typeof currentObject === 'function'
        ? method(input, ...args)
        : method.bind(currentObject)(input, ...args);
    }
    return method;
  }

  doGoto(label, srcContext) {
    const context = srcContext;
    const index = context.labels[label];
    context.cursor = index;
  }

  async executeAction(step, context, input, srcObject, depth) {
    let firstToken = step[0];
    if (firstToken && firstToken.value && firstToken.value.startsWith('->')) {
      if (depth > 0) {
        return input;
      }
      firstToken = { ...firstToken };
      firstToken.value = firstToken.value.slice(2);
    }
    switch (firstToken.type) {
      case 'set':
        this.container.setValue(
          step[1].value,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'delete':
        this.container.deleteValue(step[1].value, context, input, srcObject);
        break;
      case 'get':
        return this.container.getValue(
          step[1] ? step[1].value : undefined,
          context,
          input,
          srcObject
        );
      case 'inc':
        this.container.incValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : '1',
          context,
          input,
          srcObject
        );
        break;
      case 'dec':
        this.container.decValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : '1',
          context,
          input,
          srcObject
        );
        break;
      case 'eq':
        this.container.eqValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'neq':
        this.container.neqValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'gt':
        this.container.gtValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'ge':
        this.container.geValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'lt':
        this.container.ltValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'le':
        this.container.leValue(
          step[1] ? step[1].value : undefined,
          step[2] ? step[2].value : undefined,
          context,
          input,
          srcObject
        );
        break;
      case 'goto':
        this.doGoto(step[1].value, context);
        break;
      case 'jne':
        if (!context.floating) {
          this.doGoto(step[1].value, context);
        }
        break;
      case 'je':
        if (context.floating) {
          this.doGoto(step[1].value, context);
        }
        break;
      case 'call':
        return this.executeCall(firstToken, context, input, srcObject, depth);
      case 'reference':
        return this.executeReference(
          step,
          firstToken,
          context,
          input,
          srcObject
        );
      default:
        break;
    }
    return input;
  }

  findLabels(compiled, srcLabels) {
    const labels = srcLabels;
    for (let i = 0; i < compiled.length; i += 1) {
      const current = compiled[i];
      if (current[0].type === 'label') {
        labels[current[1].value] = i;
      }
    }
  }

  async execute(compiled, srcInput, srcObject, depth) {
    let input = srcInput;
    const context = { cursor: 0, labels: {} };
    this.findLabels(compiled, context.labels);
    while (context.cursor < compiled.length) {
      input = await this.executeAction(
        compiled[context.cursor],
        context,
        input,
        srcObject,
        depth
      );
      context.cursor += 1;
    }
    return input;
  }
}

module.exports = DefaultCompiler;

},{}],11:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const containerBootstrap = require('./container-bootstrap');

class Dock {
  constructor() {
    this.containers = {};
  }

  getContainer(name) {
    return this.containers[name || 'default'];
  }

  async createContainer(
    name,
    settings,
    srcMustLoadEnv,
    preffix,
    parent,
    pipelines
  ) {
    const mustLoadEnv = srcMustLoadEnv === undefined ? true : srcMustLoadEnv;
    if (typeof name !== 'string') {
      settings = name;
      name = '';
    }
    if (!settings) {
      if (name === 'default' || name === '') {
        settings = 'conf.json';
      }
    }
    if (!this.containers[name]) {
      const container = containerBootstrap(
        settings,
        mustLoadEnv,
        undefined,
        preffix,
        pipelines
      );
      container.name = name;
      this.containers[name] = container;
      container.dock = this;
      container.parent = parent;
      await container.start();
      if (container.childs) {
        await this.buildChilds(container);
      }
    }
    return this.containers[name];
  }

  async buildChilds(container) {
    if (container && container.childs) {
      const keys = Object.keys(container.childs);
      const childs = {};
      for (let i = 0; i < keys.length; i += 1) {
        const settings = container.childs[keys[i]];
        settings.isChild = true;
        if (!settings.pathPipeline) {
          settings.pathPipeline = `${keys[i]}_pipeline.md`;
        }
        childs[keys[i]] = await this.createContainer(
          keys[i],
          settings,
          false,
          keys[i],
          container,
          container.childPipelines
            ? container.childPipelines[keys[i]]
            : undefined
        );
      }
      container.childs = childs;
    }
  }

  async terraform(settings, mustLoadEnv = true) {
    const defaultContainer = await this.createContainer(
      'default',
      settings,
      mustLoadEnv,
      ''
    );
    return defaultContainer;
  }

  start(settings, mustLoadEnv = true) {
    return this.terraform(settings, mustLoadEnv);
  }
}

const dock = new Dock();

module.exports = dock;

},{"./container-bootstrap":7}],12:[function(require,module,exports){
(function (process){(function (){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const rsAstralRange = '\\ud800-\\udfff';
const rsComboMarksRange = '\\u0300-\\u036f';
const reComboHalfMarksRange = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange = '\\u20d0-\\u20ff';
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff';
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff';
const rsComboRange =
  rsComboMarksRange +
  reComboHalfMarksRange +
  rsComboSymbolsRange +
  rsComboMarksExtendedRange +
  rsComboMarksSupplementRange;
const rsVarRange = '\\ufe0e\\ufe0f';
const rsAstral = `[${rsAstralRange}]`;
const rsCombo = `[${rsComboRange}]`;
const rsFitz = '\\ud83c[\\udffb-\\udfff]';
const rsModifier = `(?:${rsCombo}|${rsFitz})`;
const rsNonAstral = `[^${rsAstralRange}]`;
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
const rsZWJ = '\\u200d';
const reOptMod = `${rsModifier}?`;
const rsOptVar = `[${rsVarRange}]?`;
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join(
  '|'
)})${rsOptVar + reOptMod})*`;
const rsSeq = rsOptVar + reOptMod + rsOptJoin;
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`;
const rsSymbol = `(?:${[
  rsNonAstralCombo,
  rsCombo,
  rsRegional,
  rsSurrPair,
  rsAstral,
].join('|')})`;

/* eslint-disable no-misleading-character-class */
const reHasUnicode = RegExp(
  `[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`
);
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g');
/* eslint-enable no-misleading-character-class */

const hasUnicode = (str) => reHasUnicode.test(str);
const unicodeToArray = (str) => str.match(reUnicode) || [];
const asciiToArray = (str) => str.split('');
const stringToArray = (str) =>
  hasUnicode(str) ? unicodeToArray(str) : asciiToArray(str);

function compareWildcars(text, rule) {
  const escapeRegex = (str) => str.replace(/([.*+^=!:${}()|[\]/\\])/g, '\\$1');
  const regexRule = `^${rule.split('*').map(escapeRegex).join('.*')}$`.replace(
    /\?/g,
    '.'
  );
  return new RegExp(regexRule).test(text);
}

function loadEnvFromJson(preffix, json = {}) {
  const keys = Object.keys(json);
  preffix = preffix ? `${preffix}_` : '';
  for (let i = 0; i < keys.length; i += 1) {
    const key = `${preffix}${keys[i]}`;
    process.env[key] = json[keys[i]];
  }
}

module.exports = {
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnvFromJson,
};

}).call(this)}).call(this,require('_process'))
},{"_process":1}],13:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const Among = require('./among');
const ArrToObj = require('./arr-to-obj');
const BaseStemmer = require('./base-stemmer');
const containerBootstrap = require('./container-bootstrap');
const Clonable = require('./clonable');
const { Container, defaultContainer } = require('./container');
const Normalizer = require('./normalizer');
const ObjToArr = require('./obj-to-arr');
const Stemmer = require('./stemmer');
const Stopwords = require('./stopwords');
const Tokenizer = require('./tokenizer');
const Timer = require('./timer');
const logger = require('./logger');
const {
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnv,
} = require('./helper');
const MemoryStorage = require('./memory-storage');
const uuid = require('./uuid');
const dock = require('./dock');
const Context = require('./context');

async function dockStart(settings, mustLoadEnv) {
  await dock.start(settings, mustLoadEnv);
  return dock;
}

module.exports = {
  Among,
  ArrToObj,
  BaseStemmer,
  containerBootstrap,
  Clonable,
  Container,
  defaultContainer,
  hasUnicode,
  unicodeToArray,
  asciiToArray,
  stringToArray,
  compareWildcars,
  loadEnv,
  Normalizer,
  ObjToArr,
  Stemmer,
  Stopwords,
  Tokenizer,
  Timer,
  logger,
  MemoryStorage,
  uuid,
  dock,
  Context,
  dockStart,
};

},{"./among":3,"./arr-to-obj":4,"./base-stemmer":5,"./clonable":6,"./container":8,"./container-bootstrap":7,"./context":9,"./dock":11,"./helper":12,"./logger":14,"./memory-storage":15,"./normalizer":17,"./obj-to-arr":18,"./stemmer":19,"./stopwords":20,"./timer":21,"./tokenizer":22,"./uuid":23}],14:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

class Logger {
  constructor() {
    this.name = 'logger';
  }

  debug(...args) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }

  info(...args) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }

  warn(...args) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }

  error(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }

  log(...args) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }

  trace(...args) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }

  fatal(...args) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

const logger = new Logger();

module.exports = logger;

},{}],15:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Clonable = require('./clonable');

class MemoryStorage extends Clonable {
  constructor(settings = {}, container = undefined) {
    super(
      {
        settings: {},
        container: settings.container || container || defaultContainer,
      },
      container
    );
    this.applySettings(this.settings, settings);
    this.applySettings(this.settings, { etag: 1, memory: {} });
    if (!this.settings.tag) {
      this.settings.tag = 'storage';
    }
    this.applySettings(
      this.settings,
      this.container.getConfiguration(this.settings.tag)
    );
  }

  read(keys) {
    return new Promise((resolve) => {
      const data = {};
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      keys.forEach((key) => {
        const item = this.settings.memory[key];
        if (item) {
          data[key] = JSON.parse(item);
        }
      });
      resolve(data);
    });
  }

  saveItem(key, item) {
    const clone = { ...item };
    clone.eTag = this.settings.etag.toString();
    this.settings.etag += 1;
    this.settings.memory[key] = JSON.stringify(clone);
    return clone;
  }

  write(changes) {
    return new Promise((resolve, reject) => {
      Object.keys(changes).forEach((key) => {
        const newItem = changes[key];
        const oldStr = this.settings.memory[key];
        if (!oldStr || newItem.eTag === '*') {
          return resolve(this.saveItem(key, newItem));
        }
        const oldItem = JSON.parse(oldStr);
        if (newItem.eTag !== oldItem.eTag) {
          return reject(
            new Error(`Error writing "${key}" due to eTag conflict.`)
          );
        }
        return resolve(this.saveItem(key, newItem));
      });
    });
  }

  delete(keys) {
    return new Promise((resolve) => {
      keys.forEach((key) => delete this.settings.memory[key]);
      resolve();
    });
  }
}

module.exports = MemoryStorage;

},{"./clonable":6,"./container":8}],16:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function readFile() {
  return new Promise((resolve) => {
    resolve(undefined);
  });
}

function writeFile() {
  return new Promise((resolve, reject) => {
    reject(new Error('File cannot be written in web'));
  });
}

function existsSync() {
  return false;
}

function lstatSync() {
  return undefined;
}

function readFileSync() {
  return undefined;
}

module.exports = {
  readFile,
  writeFile,
  existsSync,
  lstatSync,
  readFileSync,
  name: 'fs',
};

},{}],17:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');

class Normalizer {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'normalize';
  }

  normalize(text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  run(srcInput) {
    const input = srcInput;
    const locale = input.locale || 'en';
    const normalizer = this.container.get(`normalizer-${locale}`) || this;
    input.text = normalizer.normalize(input.text, input);
    return input;
  }
}

module.exports = Normalizer;

},{"./container":8}],18:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class ObjToArr {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'objToArr';
  }

  static objToArr(obj) {
    return Object.keys(obj);
  }

  run(input) {
    if (!input.tokens) {
      return ObjToArr.objToArr(input);
    }
    input.tokens = ObjToArr.objToArr(input.tokens);
    return input;
  }
}

module.exports = ObjToArr;

},{"./container":8}],19:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Stemmer {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'stem';
  }

  stem(tokens) {
    return tokens;
  }

  getStemmer(srcInput) {
    const input = srcInput;
    const locale =
      input.locale || (input.settings ? input.settings.locale || 'en' : 'en');
    let stemmer = this.container.get(`stemmer-${locale}`);
    if (!stemmer) {
      const stemmerBert = this.container.get(`stemmer-bert`);
      if (stemmerBert && stemmerBert.activeFor(locale)) {
        stemmer = stemmerBert;
      } else {
        stemmer = this;
      }
    }
    return stemmer;
  }

  async addForTraining(srcInput) {
    const stemmer = this.getStemmer(srcInput);
    if (stemmer.addUtterance) {
      await stemmer.addUtterance(srcInput.utterance, srcInput.intent);
    }
    return srcInput;
  }

  async train(srcInput) {
    const stemmer = this.getStemmer(srcInput);
    if (stemmer.innerTrain) {
      await stemmer.innerTrain();
    }
    return srcInput;
  }

  async run(srcInput) {
    const input = srcInput;
    const stemmer = this.getStemmer(input);
    input.tokens = await stemmer.stem(input.tokens, input);
    return input;
  }
}

module.exports = Stemmer;

},{"./container":8}],20:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { defaultContainer } = require('./container');

class Stopwords {
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'removeStopwords';
    this.dictionary = {};
  }

  build(list) {
    for (let i = 0; i < list.length; i += 1) {
      this.dictionary[list[i]] = true;
    }
  }

  isNotStopword(token) {
    return !this.dictionary[token];
  }

  isStopword(token) {
    return !!this.dictionary[token];
  }

  removeStopwords(tokens) {
    return tokens.filter((x) => this.isNotStopword(x));
  }

  run(srcInput) {
    if (srcInput.settings && srcInput.settings.keepStopwords === false) {
      const input = srcInput;
      const locale = input.locale || 'en';
      const remover = this.container.get(`stopwords-${locale}`) || this;
      input.tokens = remover
        .removeStopwords(input.tokens, input)
        .filter((x) => x);
      return input;
    }
    return srcInput;
  }
}

module.exports = Stopwords;

},{"./container":8}],21:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');

/**
 * Class for a simple timer
 */
class Timer {
  /**
   * Constructor of the class
   * @param {object} container Parent container
   */
  constructor(container = defaultContainer) {
    this.container = container.container || container;
    this.name = 'timer';
  }

  /**
   * Starts the timer
   * @param {object} input
   */
  start(input) {
    if (input) {
      input.hrstart = new Date();
    }
    return input;
  }

  /**
   * Stops the timer
   * @param {object} srcInput
   */
  stop(srcInput) {
    const input = srcInput;
    if (input && input.hrstart) {
      const hrend = new Date();
      input.elapsed = hrend.getTime() - input.hrstart.getTime();
      delete input.hrstart;
    }
    return input;
  }

  run(srcInput) {
    this.start(srcInput);
  }
}

module.exports = Timer;

},{"./container":8}],22:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { defaultContainer } = require('./container');
const Normalizer = require('./normalizer');

class Tokenizer {
  constructor(container = defaultContainer, shouldNormalize = false) {
    this.container = container.container || container;

    this.name = 'tokenize';
    this.shouldNormalize = shouldNormalize;
  }

  getNormalizer() {
    if (!this.normalizer) {
      this.normalizer =
        this.container.get(`normalizer-${this.name.slice(-2)}`) ||
        new Normalizer();
    }
    return this.normalizer;
  }

  normalize(text, force) {
    if ((force === undefined && this.shouldNormalize) || force === true) {
      const normalizer = this.getNormalizer();
      return normalizer.normalize(text);
    }
    return text;
  }

  innerTokenize(text) {
    return text.split(/[\s,.!?;:([\]'"¡¿)/]+/).filter((x) => x);
  }

  tokenize(text, normalize) {
    let result;
    if (this.cache) {
      const now = new Date();
      const diff = Math.abs(now.getTime() - this.cache.created) / 3600000;
      if (diff > 1) {
        this.cache = undefined;
      }
    }
    if (!this.cache) {
      this.cache = {
        created: new Date().getTime(),
        normalized: {},
        nonNormalized: {},
      };
    } else {
      if (normalize) {
        if (Object.prototype.hasOwnProperty.call(this.cache.normalized, text)) {
          result = this.cache.normalized[text];
        }
      } else if (
        Object.prototype.hasOwnProperty.call(this.cache.nonNormalized, text)
      ) {
        result = this.cache.nonNormalized[text];
      }
      if (result) {
        return result;
      }
    }
    result = this.innerTokenize(this.normalize(text, normalize), normalize);
    if (normalize) {
      this.cache.normalized[text] = result;
    } else {
      this.cache.nonNormalized[text] = result;
    }
    return result;
  }

  async run(srcInput) {
    const input = srcInput;
    const locale = input.locale || 'en';
    let tokenizer = this.container.get(`tokenizer-${locale}`);
    if (!tokenizer) {
      const tokenizerBert = this.container.get(`tokenizer-bert`);
      if (tokenizerBert && tokenizerBert.activeFor(locale)) {
        tokenizer = tokenizerBert;
      } else {
        tokenizer = this;
      }
    }
    const tokens = await tokenizer.tokenize(input.text, input);
    input.tokens = tokens.filter((x) => x);
    return input;
  }
}

module.exports = Tokenizer;

},{"./container":8,"./normalizer":17}],23:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

module.exports = uuid;

},{}],24:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const LangIt = require('./lang-it');
const TokenizerIt = require('./tokenizer-it');
const StemmerIt = require('./stemmer-it');
const StopwordsIt = require('./stopwords-it');
const NormalizerIt = require('./normalizer-it');
const SentimentIt = require('./sentiment/sentiment_it');

module.exports = {
  LangIt,
  StemmerIt,
  StopwordsIt,
  TokenizerIt,
  NormalizerIt,
  SentimentIt,
};

},{"./lang-it":25,"./normalizer-it":26,"./sentiment/sentiment_it":29,"./stemmer-it":30,"./stopwords-it":31,"./tokenizer-it":32}],25:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const TokenizerIt = require('./tokenizer-it');
const StemmerIt = require('./stemmer-it');
const StopwordsIt = require('./stopwords-it');
const NormalizerIt = require('./normalizer-it');
const SentimentIt = require('./sentiment/sentiment_it');
const registerTrigrams = require('./trigrams');

class LangIt {
  register(container) {
    container.use(TokenizerIt);
    container.use(StemmerIt);
    container.use(StopwordsIt);
    container.use(NormalizerIt);
    container.register('sentiment-it', SentimentIt);
    registerTrigrams(container);
  }
}

module.exports = LangIt;

},{"./normalizer-it":26,"./sentiment/sentiment_it":29,"./stemmer-it":30,"./stopwords-it":31,"./tokenizer-it":32,"./trigrams":33}],26:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Normalizer } = require('@nlpjs/core');

class NormalizerIt extends Normalizer {
  constructor(container) {
    super(container);
    this.name = 'normalizer-it';
  }

  normalize(text) {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  run(srcInput) {
    const input = srcInput;
    input.text = this.normalize(input.text, input);
    return input;
  }
}

module.exports = NormalizerIt;

},{"@nlpjs/core":13}],27:[function(require,module,exports){
module.exports={
  "words": []
}

},{}],28:[function(require,module,exports){
module.exports={"fals":-0.5,"ver":0.12,"abbast":0,"abil":0.25,"abomin":-0.5,"aborr":-0.5,"accan":0,"accant":0,"accattiv":0.5,"access":0.35,"accett":0.5,"accogl":0.5,"accomand":0,"accort":0.25,"accur":0.5,"acre":-0.5,"acut":0.25,"adatt":0.5,"addirittur":0,"addoss":0,"adeguat":0.25,"adegu":0.5,"aderent":0,"ades":0,"adess":0,"adject":0,"adolescent":0,"adolescenzial":-0.25,"ador":0.75,"adult":0,"affabil":0.83,"affascin":0.67,"affatt":0,"affid":0.5,"affront":0.35,"aformad":0,"afric":0,"agevol":0.38,"agghiacc":-0.83,"aggrott":-0.5,"agro":-0.5,"ahim":-0.25,"alcun":0.03,"alesagg":0,"alien":-0.25,"alimentar":0,"allegr":0.75,"allist":0.03,"allor":0,"almen":0,"almoment":0,"alquant":0,"alta":0,"alt":0,"alte":0,"altern":0,"alti":0.17,"altissim":0.5,"alto":0,"altra":0,"altre":0,"altrett":0,"altrettant":0,"altri":0,"altriment":0,"altro":0,"altrov":0,"altru":0,"amabil":0.83,"amar":-0.83,"amat":0.5,"ambizion":0,"amen":0.83,"amer":0,"american":0,"americ":0,"amor":0.25,"ampi":0,"ana":0,"ancor":0.25,"andand":0,"andarealcr":-0.33,"andareallaltromond":-0.33,"andareavuot":-0.25,"andareinciel":-0.33,"andareinparadis":-0.33,"angel":0.33,"angosc":-0.5,"angust":-0.5,"anim":0.1,"animos":-0.5,"anonim":-0.25,"ansiet":0.17,"antic":0.07,"antichizz":0.07,"anzi":0.17,"apert":0.25,"apocalitt":-0.5,"appag":0.35,"apparent":0,"appassion":0.67,"appen":0,"append":0,"appien":0,"appos":0.5,"apprezz":0.75,"approfond":0,"appropr":0.5,"appunt":0,"aprend":0,"aquantop":0,"arab":0,"ardent":0.67,"ardit":0.67,"ardu":-0.5,"argentin":0,"arrid":0.33,"arriv":0,"arrog":-1,"arross":0,"arrovell":-0.5,"artat":-0.25,"articol":0,"asciutt":0,"ascolt":0,"asin":-0.25,"aspett":0,"assa":0,"assassin":-0.67,"assiem":0,"assol":0.75,"assolut":0,"assurd":-0.5,"astronom":-0.5,"astut":0.25,"atroc":0,"attend":0,"attent":0.33,"attes":0.25,"attillat":0,"attinent":0,"attiv":0.25,"attivitaricr":0.25,"atto":0.5,"attorn":0,"attraent":1,"attual":0,"aulic":0,"autent":0.38,"autobiograf":0,"autoconclus":0,"automat":0.25,"autoritar":-0.5,"autric":0,"avant":0.12,"avanzodigaler":-1,"avereinod":-0.25,"avved":0.25,"avvenent":1,"avvenirist":0.03,"avventur":0.5,"avvincent":0.83,"avvizz":0,"azzurr":0.17,"babbe":-0.5,"badalon":-0.5,"bagatell":-0.25,"bagg":-0.5,"balord":-0.5,"banal":-0.5,"ban":0,"basilar":0,"bass":-0.17,"bassissim":-0.25,"beat":0.75,"beh":-0.05,"bei":0.67,"bel":0.83,"bell":0.67,"bellissim":1,"ben":0.25,"benissim":0.83,"bianc":0,"biancheriaintim":0.5,"biancoduov":0.5,"biasim":0,"bizzarr":0,"ble":0,"blu":0,"boh":0,"bompian":0,"borghes":-0.25,"brav":0.5,"bravissim":1,"brev":0,"breviline":-0.17,"brevissim":0,"brill":0.25,"brillant":0.67,"brusc":-0.5,"brutal":-0.75,"brutt":-0.83,"buc":-0.33,"buff":0.5,"bug":-0.25,"buon":0.5,"burber":-0.5,"burrasc":-0.83,"calam":-1,"calcol":0.25,"cald":0.83,"calor":0.83,"cancan":-0.33,"candid":0,"canon":0.17,"capac":0.28,"capient":0.33,"cap":0,"capital":0.25,"capolavor":1,"car":0.33,"caratterial":0,"caratterist":0,"carin":0.5,"carinissim":0.83,"carismat":1,"carogn":-0.5,"cartace":0,"carton":0,"casin":-0.5,"casual":0,"categor":0,"catt":-0.83,"cattivariusc":-0.17,"cattivasort":-1,"caut":0.25,"cazz":0,"celaen":0,"celebr":0.5,"celer":0.17,"cel":0.22,"central":0,"centr":0.1,"cerc":0,"cert":0,"chet":0.2,"chiar":0.67,"chi":0.17,"chimic":0,"chiss":0,"chiud":0,"chius":-0.17,"cia":0,"ciarlat":-0.5,"cicchett":0,"ciliegiuol":0,"cinematograf":0,"cines":0,"cinic":-0.75,"cio":0,"circospett":0.25,"circostanz":0.12,"cit":0,"civil":0.25,"classic":0.33,"coart":-0.25,"cocent":-0.03,"coerent":0.25,"coglion":-0.5,"cogru":0.5,"coinvolgent":0.83,"color":0.22,"colpevol":-0.33,"colp":0.07,"colt":0.5,"comfort":0.5,"comic":-0.5,"commed":-0.07,"commercial":0,"commoss":0.25,"commovent":0.25,"commuov":0.17,"commuovent":0.25,"comod":0.5,"compatt":0,"compendiar":0,"competit":1,"compiac":0.67,"compless":0,"complet":0.3,"compl":0.5,"complic":-0.5,"comprens":0.5,"compres":0,"comprimar":0,"comun":0.83,"comunqu":0,"conattenzion":0.25,"concis":-0.25,"conclud":0,"conclus":0,"concorrenzial":1,"concret":0.25,"confess":0,"conform":-0.25,"confort":0.5,"confus":-0.67,"confusion":-0.33,"congruent":0.5,"congru":0.5,"conosc":0.05,"consapevol":0.17,"conseguent":0,"conserv":-0.25,"consider":0,"consigl":0.38,"consistent":0,"cons":0.5,"consum":0.25,"contemporane":0.03,"contemporan":0,"content":0.75,"contestual":0.03,"contingent":0,"continu":0,"contraddizion":-0.5,"contrar":-0.25,"contrast":-0.25,"contrattofutur":0,"convenient":0.4,"convenzional":0,"convincent":0.5,"coragg":0.67,"cordial":0.83,"corpos":0.25,"corrent":0,"corrett":0.25,"corrispondent":0,"corrug":-0.5,"cort":-0.17,"corvin":0,"coscient":0.17,"cosiddett":0,"costant":0,"costos":-0.25,"cos":0,"cre":0,"creat":0.33,"credibil":0.23,"cresc":0,"crescent":0.25,"cretin":-0.75,"criminal":-0.5,"crimin":-1,"cristallin":0.33,"critic":-0.25,"cronolog":0,"crud":-0.75,"crudel":-1,"cultural":0.25,"cup":-0.5,"curios":0.12,"curv":0,"danes":0,"dann":-1,"dant":0.5,"dapprim":0,"dar":0,"dark":-0.07,"davant":0,"davver":0,"debol":-0.33,"deced":-0.33,"decent":0.5,"decis":0,"decor":0.5,"deficient":-0.75,"definit":0,"defin":0,"defunt":-0.5,"degn":0.33,"deidrat":0,"delic":-0.5,"delinquent":-1,"delinquenzial":-1,"delittu":-1,"deliz":0.83,"deltutt":0.17,"deludent":-0.67,"delus":-0.67,"delusion":-0.5,"denar":0.25,"dens":0.25,"denunc":-0.25,"depriment":-0.75,"deprim":-0.25,"descritt":0.01,"descriv":-0.5,"detect":0,"determin":0,"detest":-0.5,"dettagl":0.2,"devast":-0.75,"diamant":0.67,"dic":0,"dicassett":0,"didatt":0,"dietr":0,"difett":-0.25,"different":0,"difficil":-0.5,"difficolt":-0.33,"diffident":-0.5,"diffus":0,"difront":0,"digital":0,"dignit":0.5,"dilett":0.33,"dimentic":-0.18,"dinam":0,"dinuov":0,"dipan":0.05,"dipart":-0.33,"dirett":0,"dirimpett":0,"dirompent":0.25,"disapprov":-0.5,"disarm":-0.5,"disastr":-1,"disciplin":0.5,"discret":0.5,"disdett":-1,"disgraz":-1,"disguid":-0.33,"disidrat":0,"disobbedient":-0.25,"disonest":-1,"disordin":-0.33,"dispend":-0.25,"disper":-1,"disperat":-0.5,"dispon":0.25,"dissacr":0,"distant":-0.25,"disturb":-0.25,"disubbidient":-0.25,"disugual":0.17,"dittatorial":-0.5,"diuturn":0,"divent":0,"divers":0,"div":0,"divertent":0.75,"divert":0.33,"divin":0.38,"divulg":0.33,"docent":0,"docil":0.5,"dolc":0.33,"dolcement":0.25,"dolcissim":0.67,"dolor":-0.83,"dolorefis":0.17,"dom":0,"doman":0,"domin":0.25,"dopotutt":0,"dopp":0,"dott":0.5,"drammat":-0.53,"drastic":0,"dunqu":0,"duplic":0,"dur":-0.07,"duratur":0.22,"durevol":0.22,"ebben":0,"eccellent":1,"eccentr":0,"eccess":-0.05,"ecceter":0,"eccezional":1,"eccit":0.83,"ecco":0,"eclat":0.33,"eclatant":0,"ecolog":0,"ecologist":0,"econom":0.4,"edit":0,"editorial":-0.17,"editr":0,"edmond":0,"educ":0.25,"effer":-1,"effett":0.25,"efficac":0.55,"efficient":0.55,"egoist":-0.5,"egreg":1,"eleg":0.33,"element":0.38,"elementar":0.25,"elen":0,"elettron":0,"elev":0,"eminent":1,"emot":0.25,"emozional":0.25,"emozion":0.83,"empi":-0.75,"ennesim":0,"enorm":0.07,"enric":0,"entusiasm":0.67,"entusiast":1,"epic":0.67,"epistol":0,"epope":0.5,"equivoc":-0.33,"eric":0,"ermet":-0.17,"eroic":0.75,"erot":0.17,"errat":-0.5,"errone":-0.25,"esagerat":-0.5,"esager":-0.75,"esalt":0.75,"esangu":-0.5,"esatt":0.5,"esaurient":0.25,"esaust":0,"esclus":0,"esecr":-0.5,"esempl":0.5,"esigu":-0.25,"esilar":0.25,"esil":-0.5,"esistent":0.25,"esistenzial":0,"esorbit":-0.75,"esordient":0.25,"espans":0.5,"espert":0.25,"esplic":0,"espress":0,"essenzial":0,"essereum":0.1,"estens":0,"estern":0,"estes":0,"estiv":0,"estrem":0,"esuber":0.5,"esult":1,"etern":0.25,"eventual":0,"evident":0,"evoc":0.25,"evviv":1,"extraterrestr":-0.25,"facil":0.25,"fall":-0.25,"famiger":-0.25,"famigliareal":0.1,"famil":0.05,"familiar":0,"famos":0.33,"fan":0.67,"fantascientif":0.03,"fantas":0.33,"fantast":1,"fars":0,"fascin":1,"fastid":-0.75,"fatal":-0.5,"fatic":-0.75,"fatto":0,"favol":1,"fecc":-0.25,"fedel":0.22,"fedenuzial":0.5,"feder":0,"felic":0.83,"femminil":0,"fenomenal":1,"ferm":0,"feroc":-0.5,"ferrant":0,"ferre":-0.07,"fetent":-0.75,"fiacc":-0.5,"fiasc":-0.17,"fievol":-0.5,"filosofal":0,"filosof":0,"final":0.17,"finalissim":0,"finanziar":0,"fin":0.5,"finimond":-0.33,"finor":0,"fint":-0.67,"finzion":-0.67,"fiorentin":0,"fisic":0.02,"fiss":0,"fitt":0,"fittiz":0,"flor":0,"fluid":0,"foll":0,"folt":0,"fondamental":0,"fond":-0.17,"fondocommercial":0,"font":0,"fors":0,"forsenn":-0.42,"fort":0.5,"fortement":0,"fortezz":0.5,"fortif":0.5,"fortu":0,"fortun":0.75,"fortunal":0.33,"fortunat":0.25,"forz":-0.25,"fotograf":0,"fragil":-0.25,"fraintend":-0.33,"fran":-1,"franc":0,"francesc":0,"frances":0,"frapoc":0.25,"fredd":-0.12,"fredian":0,"frenet":-0.5,"frequent":0.25,"fresc":0.33,"frescur":0.33,"frettol":-0.25,"frizzant":0.33,"fruibil":0,"fru":0,"fumos":-0.5,"funzional":0,"funzion":0.25,"fuoc":0,"fuor":0,"fuorilegg":-1,"fuoripericol":0.17,"fuorviant":-0.67,"furb":0.25,"furios":-0.75,"futil":-0.25,"futur":0,"futures":0,"gagliard":0.5,"gai":0.83,"galatt":0.25,"gattadapel":-0.5,"gel":-0.25,"general":0,"gener":0,"gen":-0.25,"genial":1,"gentagl":-0.25,"gentil":0.5,"genuin":0.38,"geograf":0,"giappones":0,"gigantesc":0.07,"gigant":0,"gioc":-0.67,"giocond":0.83,"giornalist":0,"giovan":0.33,"giovanil":0.25,"giovanissim":0.25,"giovincell":0,"giovinett":0,"giubil":0.33,"giungl":-0.33,"giust":0.5,"giustific":0.5,"gia":0,"giu":-0.17,"global":0,"god":0.33,"godibil":0.5,"gracil":-0.5,"gradevol":0.67,"grad":0.25,"grafic":0,"grammatical":0,"grand":0.25,"grandios":1,"grandissim":0.67,"gratis":0.5,"gratu":0.5,"gratuit":0.25,"grav":-0.5,"gravid":0.3,"graz":0.5,"grazios":0.33,"grec":0,"grig":-0.03,"gross":0,"grossolan":-0.5,"grossol":-0.5,"grottesc":-0.5,"guai":-0.5,"guard":0,"guast":-0.25,"gust":0.33,"gustos":0.5,"iattur":-1,"ideal":0.33,"ident":0,"idiot":-0.75,"idioz":-0.25,"idone":0.25,"iell":-1,"ier":0,"iettatur":-1,"ignor":-0.25,"ilar":0.83,"illegg":-0.5,"illog":-0.5,"illumin":0.58,"illusion":0,"illusor":0,"illustr":0.33,"imbarazz":-0.67,"imbatt":0.75,"imbecil":-0.25,"imbecill":-0.25,"imbrogl":-0.25,"immaginar":0.33,"immanc":0.33,"immed":0.18,"immediat":0,"immens":0.17,"immobil":0,"immodest":-1,"immortal":0.25,"impacc":-0.67,"impar":0.5,"imparegg":0.5,"imparzial":0.25,"impavid":0.67,"impazient":0,"impecc":0.5,"impegn":-0.07,"impellent":-0.75,"impenetr":0,"impercett":-0.5,"imperd":0.83,"impersonal":-0.25,"impicc":-0.5,"imponent":0.17,"import":0.25,"importantissim":0.5,"importun":0.12,"imposs":-0.25,"impost":0,"impostor":-0.25,"imprescind":0,"impress":0,"impression":0.25,"impreved":-0.03,"improb":-0.18,"improvvis":-0.5,"inaccess":-0.5,"inaccett":-0.67,"inappunt":0.67,"inarid":0,"inaspett":-0.5,"inaspettat":0,"inattes":0.25,"incalz":-0.12,"incant":0.5,"incantevol":1,"incapac":-0.75,"incess":0.22,"incessant":0,"incidental":0,"incint":1,"incis":0.25,"inclement":-0.07,"inclin":0,"incoffess":0.5,"incomod":-0.25,"incompar":0.5,"incompentent":-0.75,"incomplet":-0.42,"incomprens":-0.5,"inconcludent":-0.75,"incondizion":0,"inconfond":0.25,"inconsistent":0.5,"inconten":-0.75,"incontenibil":0,"incontr":0,"incontrovert":0,"incred":0.25,"incredibil":0,"indecent":-0.67,"indecifr":-0.33,"indecor":-0.67,"indelebil":0.25,"indescriv":0,"indian":0,"indietr":0,"indifferent":-0.25,"indimentic":0.67,"indipendent":0,"indisciplin":-0.25,"indiscret":0.12,"indispens":0.25,"indistint":-0.67,"individual":0,"individu":0.1,"indocil":-0.25,"indubb":0.33,"indumentointim":0.5,"industrial":0,"ineccep":0.75,"ined":0.25,"inefficac":-0.25,"inefficient":-0.25,"ineguagl":0.5,"inegual":0.17,"inesistent":-0.25,"inesplic":-0.5,"inett":-0.75,"inevit":0,"inevitabil":0,"infantil":-0.25,"infastid":-0.25,"infatt":0,"infedel":-0.5,"infelic":-0.25,"inferior":-0.23,"inferoc":-0.75,"infin":0.25,"infinit":0,"infless":-0.07,"influent":0.5,"infond":0.5,"infuoc":-0.75,"infur":-0.75,"ingann":-0.25,"ingegn":1,"ingenu":-0.5,"inghipp":-0.25,"ingiust":-0.5,"ingiustific":-0.5,"ingles":0,"ingombr":-0.25,"inimmagin":-0.35,"inizial":0,"innanzitutt":0,"inneg":0.25,"innervos":-0.25,"innocent":0.25,"innov":0.5,"innumerevol":0,"inoltr":0,"inopportun":-0.75,"inoppugn":0.25,"inpart":0,"inquiet":-0.75,"insegn":0,"insens":-0.25,"insespress":-0.5,"insiem":0.25,"insign":0.5,"insignific":-0.5,"insipid":-0.5,"insoddisfacent":-0.67,"insoddisfatt":-0.67,"insofferent":-0.25,"insol":-0.5,"insomm":-0.17,"insopport":-0.75,"insosten":-0.5,"inspiegabil":-0.25,"insubordin":-0.25,"insuccess":-0.17,"insufficient":-0.25,"insuls":-0.5,"insuper":0.75,"insussistent":-0.25,"intant":0,"intatt":0.25,"integr":0.25,"integral":0,"intellettual":0,"intelligent":0.5,"intellig":0.5,"intend":0,"intens":0.33,"inter":0.25,"interatt":0,"interess":0.67,"interessantissim":1,"interior":0,"intermed":0,"internazional":0,"intern":0,"interpersonal":0,"interrog":0,"intim":0.5,"intoller":0,"intorn":0,"intramont":0.5,"intransigent":-0.07,"intratt":-0.5,"intrepid":0.67,"intric":0,"intrig":-0.25,"introdutt":0,"introspett":0.17,"intuit":0.22,"inusit":-0.5,"inusual":0,"inutil":-0.25,"inutilizz":-0.67,"invadent":0.12,"invec":0,"inverosimil":0,"investig":0,"inviatospecial":0,"invinc":0.75,"invis":0,"involontar":0,"ipersens":-0.17,"iron":0.5,"irragionevol":-0.42,"irreal":0.33,"irrefren":-0.75,"irrefrenabil":0,"irreprens":0.67,"irresist":0.67,"irrilev":-0.5,"irrimediabil":-0.5,"irrinunc":1,"irrisolt":-0.5,"irrisor":-0.25,"irrit":-0.25,"irruent":-0.75,"islandes":0,"istantan":0,"istantane":0.18,"istrutt":0.5,"italian":0.03,"ital":0,"jan":0,"kafk":-0.5,"lacon":-0.25,"lagnanz":-0.5,"lagn":-0.5,"lambicc":0,"lament":-0.5,"lamentel":-0.5,"lampant":0.25,"lamp":-0.25,"languid":-0.5,"lapalissian":0,"lapaliss":0.25,"larg":0,"lasc":-0.18,"lavatadicap":0,"lavor":-0.25,"leader":0.5,"leal":0.5,"lealment":0.5,"lec":0,"legal":0,"leg":0,"leggendar":0.5,"legg":0.03,"legger":0,"leggiadr":0.33,"leggibil":0,"legittim":0,"lent":-0.12,"lenticc":-0.25,"lepid":0.5,"letal":-0.5,"letteral":0,"letterar":0.25,"lettric":0,"lezz":-0.25,"liber":0.03,"liberal":0.75,"liet":0.75,"liev":-0.5,"lievement":0,"lilian":0,"limit":-0.5,"lin":0,"linger":0.5,"linguist":0,"local":0,"lodevol":0.75,"logic":0.25,"londines":0,"lontan":0,"lont":-0.07,"lord":0,"lov":0.38,"luccic":0.67,"lucid":0.17,"lumin":0.67,"lung":0,"lussuregg":0.5,"luttuos":-0.83,"machiavell":0.25,"maestos":1,"magagn":-0.25,"magar":0.17,"maggior":0,"magic":0.67,"magistral":0.67,"magnanim":0.75,"magnet":0.25,"magnif":1,"magr":0,"mah":-0.33,"mai":0,"maiuscol":0.25,"malann":-0.5,"malasort":-1,"mal":-0.67,"malaticc":0.12,"malatt":-0.25,"malcontent":-0.67,"maless":-0.25,"malign":-0.25,"malincon":-0.67,"malintes":-0.33,"malissim":-0.83,"malvag":-0.5,"malvivent":-1,"mancant":-0.2,"manc":0,"manchevol":-0.25,"manegg":-0.25,"maneggion":0.67,"manesc":-0.75,"maniac":-0.42,"manifest":0,"manten":0,"mar":0,"marmagl":-0.25,"marmocc":0,"martir":-0.25,"martirizz":-0.5,"martor":-0.5,"marxist":0,"maschil":0,"mascolin":0,"massicc":0,"massim":0.33,"material":0,"matt":-0.42,"matur":0,"max":0.25,"med":0,"medieval":0,"mediocr":-0.5,"mediterrane":0,"megl":0.5,"melang":-0.25,"melens":-0.5,"melodramm":0,"memor":0.75,"men":-0.25,"mendic":-0.5,"mental":0,"mentecatt":-0.42,"mer":0.33,"meravigl":1,"merc":0.25,"merd":-0.5,"meritatissim":0.75,"meritevol":0.33,"meritor":0.33,"merl":-0.5,"mescol":-0.25,"messinscen":-0.67,"mett":0,"mettereincroc":-0.5,"mezz":0,"mezzosangu":-0.17,"mic":0,"miglior":1,"milanes":0,"mil":0,"milit":0,"minchion":-0.5,"minim":0,"minuz":0.25,"mirabil":0.75,"miragg":0,"misantrop":-0.5,"miscellane":-0.25,"misc":0,"miscredent":-0.25,"miscugl":-0.25,"miser":-1,"mister":0,"mistic":0.25,"mistif":-0.25,"mistion":-0.25,"mist":0,"mistur":-0.25,"mitic":1,"mix":-0.25,"modell":0.33,"modern":0.03,"mod":0.25,"modest":0.5,"modic":0.5,"molest":-0.75,"molt":0,"moltepl":0.25,"moltissim":0.07,"mondial":0,"mondoestern":0.25,"monolit":0,"monoton":-0.5,"monot":-0.75,"monumental":0.25,"moral":0,"morbid":0.25,"mordac":0.25,"moriger":0.5,"mor":-0.33,"mortal":-0.25,"mort":-0.5,"mostruos":-1,"mot":-0.25,"mozzaf":1,"multiform":0.25,"municipal":0,"municip":0,"munif":0.75,"muscol":0.25,"musical":0.25,"must":0,"napolet":0,"narrant":0,"narrat":0.03,"nascond":0,"nascost":-0.07,"natal":0,"nat":0,"natural":0.18,"naufrag":-0.17,"nazist":-0.25,"neanc":-0.25,"nebul":-0.67,"necessar":0,"negat":-0.25,"negoz":0,"nemmen":-0.25,"ner":0,"nessun":-0.25,"nett":0.5,"neutral":0.25,"neutr":0.25,"nippon":0,"nitid":0,"nn":0,"nobil":0.25,"noc":-0.25,"nodogord":0,"noi":-0.5,"noios":-0.75,"nois":-0.5,"nordic":0,"normal":0,"nostalg":-0.25,"nostran":0,"not":0.25,"notamusical":0,"notevol":0,"notor":0.25,"novell":0,"nover":0,"nov":0.33,"nud":0.12,"numer":0.17,"nuov":0.33,"obbedient":0.5,"obblig":-0.25,"obbligator":0,"obbrobr":-0.83,"obiett":0.25,"obli":-0.18,"obliqu":0,"ocaggin":-0.25,"occidental":0,"occorrent":0.33,"occult":-0.07,"ocul":0.25,"odi":-0.5,"odiern":0.03,"odios":-1,"offend":-0.25,"oggett":0.25,"oggi":0,"oggid":0,"oltretutt":0,"omel":0,"omolog":0,"omonim":0,"onest":0.5,"onir":0,"onlin":0,"onor":0.33,"operadart":1,"opportun":0.5,"oppost":-0.25,"ora":0,"oral":0,"orama":0,"orar":0,"ordinar":0,"orfan":-0.5,"oriental":0,"original":0.33,"originalissim":0.5,"originar":0,"origin":0,"orizzontal":0,"orma":0,"oro":0.25,"orrend":-0.83,"orribil":-1,"orripil":-1,"orror":-0.83,"ortogonal":0.17,"ortograf":0,"oscen":-0.75,"oscur":-0.2,"oscurant":-0.25,"ospital":0.83,"ossess":-0.5,"ostil":-0.75,"ottim":1,"ottimal":0.5,"ottocentesc":0,"ottus":-0.25,"ove":0,"ovunqu":0,"ovvi":0.25,"ozios":-0.75,"pac":0.25,"pacc":-0.5,"pag":-0.5,"pagh":0,"pagliacc":-0.5,"pales":0.25,"pallaalpied":-0.25,"pandian":0,"pan":-0.25,"panic":-0.83,"panoram":0,"pantagruel":0.17,"pant":-0.5,"paradigmat":0.5,"paradisiac":1,"paradossal":0,"paragon":0,"parallel":0,"paranormal":0,"parapigl":-0.33,"parecc":0,"par":0,"parl":0,"part":0,"particol":0.17,"particolar":0,"partirsidalmond":-0.33,"parzial":0,"pass":-0.07,"passareamigliorv":-0.33,"passatemp":0.33,"passional":0.33,"pastett":-0.25,"pasticc":-0.25,"patent":0,"pateracc":-0.25,"patet":-0.75,"pat":-0.42,"patolog":-0.25,"patrimon":0.25,"patriz":0.5,"pauros":-1,"pazient":0,"pazz":0.33,"pazzesc":-0.42,"peculiar":0,"pedant":-0.5,"pegg":-0.67,"peggior":-0.33,"pen":0.17,"penetr":1,"penos":-0.75,"pens":0,"pensier":0.17,"peraltr":0,"perc":0,"perd":-0.67,"perdent":-0.5,"perdut":0,"perenn":0,"perenter":0,"perfett":0.33,"perfid":-0.5,"perfin":0,"pericol":-0.75,"perl":0.5,"perlomen":0,"permanent":0.22,"permett":0,"perpendicol":0.17,"perpetu":0.25,"perpless":-0.5,"pers":-0.5,"persever":0.22,"persin":0,"person":0.1,"personal":0,"perspicac":1,"perspicu":0.25,"persuas":0.5,"pervers":-0.5,"per":0,"pesant":-0.75,"pesceless":-0.5,"pes":-0.75,"pesom":0.33,"pessim":-0.83,"pessimist":0,"pestifer":-0.5,"pestilent":-0.25,"petul":0.12,"pia":0,"piac":0.33,"piacevol":0.67,"piacevolissim":0.67,"piang":-0.2,"piant":-1,"piatt":-0.5,"piazzes":0,"piccion":-0.5,"picc":0.33,"piccol":0.33,"piccolissim":0,"pien":0.33,"piffl":0,"pio":0.5,"pittoresc":1,"piuttost":0,"piu":0,"plausibil":0.25,"plebagl":-0.25,"poc":0,"poch":-0.5,"pochissim":-0.18,"poetic":0.25,"poi":0,"polit":0,"poliziesc":0,"poll":-0.5,"ponder":-0.75,"popol":0.33,"popolar":0,"popul":0,"port":0,"posit":0.83,"possed":0.25,"possess":0.25,"possibil":0,"potent":0,"potenzial":0,"pover":-0.25,"pratic":0.25,"precedent":0,"precis":0.5,"prefer":0.33,"pregevol":0.75,"preg":0,"premess":0,"premur":0.5,"prend":0,"preoccup":0.17,"prepotent":0,"present":0,"press":0,"pressant":-0.75,"pressoc":0,"prestig":1,"prest":0.25,"presunt":0,"presuntu":-1,"pretenz":-0.25,"prett":0,"preved":-0.5,"prezios":0.67,"primafas":0,"primar":0.25,"primigen":0.33,"primissim":1,"primiz":0.33,"prim":0,"primoperiod":0,"primordial":0,"primord":0,"principal":0.17,"princip":0,"prioritar":0.25,"priv":-0.25,"probabil":0,"problem":-0.5,"problemat":-0.05,"prob":0.5,"prod":0.67,"prodig":0.75,"professional":0,"profession":0,"professor":0,"profond":0.33,"progress":0,"proib":-0.25,"promess":0,"promettent":0.67,"pront":0,"propiz":0.5,"proporzion":0.5,"propr":0,"proprietar":0,"prossim":0,"protett":0,"prov":0,"provett":0.17,"prudent":0.25,"prunai":-0.5,"psicolog":0,"psicopat":-0.75,"pubblic":0,"pubblicitar":0,"pubblicoufficial":0,"pueril":0,"pul":0.5,"pungent":-0.12,"pungitop":-0.5,"punizion":0.17,"punt":0,"puntual":0.38,"puntur":0,"pur":0.5,"puritan":-0.25,"purtropp":-0.5,"puttan":0.67,"puzz":-0.25,"puzzon":-0.75,"qua":0,"qualsias":0,"qualunqu":0,"quantomen":0,"quantum":0,"quart":0,"quas":-0.25,"querel":-0.5,"querimon":-0.5,"questuant":-0.5,"qui":0.25,"quind":0,"quiproqu":-0.33,"quotidian":0,"rabb":-0.5,"rabbios":-0.75,"raccapricc":-1,"raccomand":0,"raccom":0,"raccont":0,"radical":0.17,"rad":0,"raffin":0.67,"raffront":0,"ragazzett":0,"ragazzin":0,"ragazz":0,"raggir":-0.25,"ragguardevol":0.33,"ragionevol":0.25,"rampant":0,"rancor":-0.5,"rapid":0.18,"rar":0.25,"rarefatt":0,"rasp":-0.25,"rassegn":0,"razional":0.25,"real":0.1,"realist":0.18,"realment":0,"realt":0.25,"reazionar":-0.25,"recent":0,"recentissim":0.33,"reciproc":0.5,"reclam":-0.25,"recond":-0.2,"recrimin":-0.5,"regal":0,"regol":0.17,"regolar":0,"relat":0,"relig":0.5,"remot":-0.07,"rend":0,"reo":-0.33,"repellent":-1,"repentin":-0.5,"reprension":0,"resistent":0.22,"respons":-0.33,"responsabil":0,"ress":0,"rest":0,"ret":-0.25,"retor":-0.75,"retr":0,"retrograd":-0.17,"rettiline":0,"rett":0,"rezz":0.33,"riars":0,"ribell":-0.25,"ricc":0.33,"ricchezz":0.25,"ricchissim":0.25,"riconosc":0,"ricreazion":0.33,"rid":0.25,"ridicol":-0.5,"ridott":-0.5,"ridutt":0,"rifin":0.25,"rifugg":-0.5,"rigid":-0.07,"rigidezz":-0.25,"rigogl":0.5,"rigor":0.25,"rilass":0.5,"rileg":0,"rilev":0.5,"rilucent":0.67,"rimanegg":0,"riman":0,"rimpiang":-0.2,"rimpiatt":-0.07,"rimprover":0,"ringraz":0.5,"rinnov":0.22,"ripetit":-0.25,"ripetut":0,"ripet":0.22,"ripost":-0.2,"riprension":0,"riprov":0,"ripugn":-1,"risc":0,"rischios":-0.75,"risent":-0.5,"risolut":0,"risol":0,"risolutor":0,"rispett":0,"risplendent":0.67,"rispondent":0,"ristrett":0,"ritard":-0.25,"ritros":-0.5,"ritrov":0,"riusc":0.1,"rivolt":0,"rivoluzionar":0.25,"robust":0.22,"rocambolesc":0,"rocc":0.5,"rogn":-0.5,"rom":0,"romant":0.5,"ros":0,"rose":0.67,"ross":0,"rottur":-0.5,"rovesc":-0.5,"rud":-0.5,"ruff":0.67,"rusc":-0.5,"russ":0,"ruvid":-0.25,"sagac":-0.25,"sagg":0.25,"sal":0.5,"sald":0.22,"salgar":0,"salt":0,"san":0.33,"sant":0.5,"sanzion":0.17,"sap":0,"sapid":0.5,"sapient":0.5,"sapor":0.5,"sarcast":-0.5,"satir":-0.5,"satoll":0.33,"satur":0.33,"sav":0.55,"saz":0.33,"sbagl":-0.5,"sband":-0.33,"sbarbatell":0,"sbarb":0,"sbarbin":0,"sbrigat":-0.25,"scabr":-0.25,"scabros":-0.25,"scacc":-0.17,"scadent":-0.67,"scalogn":-1,"scaltrezz":-0.25,"scaltr":0.25,"scandin":0,"scarn":0,"scars":-0.25,"scatenat":-0.33,"scaten":-0.05,"sceller":-0.5,"scemenz":-0.25,"scem":-0.5,"scempiaggin":-0.25,"scen":-0.67,"scettic":-0.25,"schemadigioc":0.22,"scherz":0.22,"schiant":-0.33,"schi":-0.25,"schiett":0.38,"schifos":-1,"schiv":-0.5,"sciagur":-1,"scialb":-0.5,"sciap":-0.5,"scientif":0,"scintill":0.67,"sciocchezz":-0.25,"sciocc":-0.5,"sciolt":-0.12,"scip":-0.5,"scolast":0,"scoll":-0.17,"scomod":-0.25,"scompars":-0.5,"scompigl":-0.33,"sconcert":-0.5,"sconc":-0.75,"sconfitt":-0.17,"sconfort":-0.25,"sconosc":0.33,"sconquass":-0.33,"scont":0.17,"scontent":-0.67,"scontros":-0.5,"sconvolgent":-0.5,"scoppiett":0.5,"scopr":0,"scoragg":0,"scorbut":-0.5,"scorrett":-0.5,"scorrevol":0.25,"scors":0,"scortes":-0.25,"scostant":-0.5,"scritt":0,"scrittric":0,"scriv":0,"scrupol":0.5,"scugnizz":0,"scur":-0.2,"sdegn":-0.25,"sdolcin":-0.5,"seccant":-0.75,"seccatur":-0.5,"secc":0,"secondar":0,"sediz":0.25,"seducent":1,"segret":-0.2,"segu":0,"seguent":0,"selvagg":0.25,"seminal":0,"semplic":0,"semplicion":-0.5,"sempliciott":-0.5,"semplicissim":0.75,"semplific":0,"sempr":0,"sens":0.25,"sensibil":0.25,"sensit":0.25,"sensual":0.25,"sentimental":0.5,"separ":0,"serenissim":0.25,"seren":0.5,"ser":0.5,"serial":0,"sermon":0,"serr":-0.17,"serv":-0.25,"sessual":0,"settorepriv":0,"settorepubbl":0,"sever":-0.07,"sexy":0.5,"sfarfallon":-0.25,"sfas":-0.33,"sfasatur":-0.33,"sfavorevol":-0.25,"sfig":-1,"sfortun":-0.5,"sfrenat":-0.33,"sfren":-0.05,"sgarb":-0.5,"sgombr":0.03,"sgradevol":-0.25,"sgrammatic":-0.5,"sgraz":-0.5,"sibillin":-0.2,"sicil":0,"sicur":0.33,"signific":0.5,"signif":0.5,"signoril":0.5,"simil":0,"simpat":0.67,"simul":-0.67,"simultane":0.03,"sincer":0.5,"sinc":0.5,"sincr":0.03,"singol":0.5,"singolar":0,"sinistr":-1,"sintet":0,"sistem":0,"sit":-0.25,"smarr":-0.67,"smilz":0,"smodat":-0.33,"smod":-0.05,"smoderat":-0.33,"smoder":-0.05,"snell":0.53,"snob":0.67,"soav":0.67,"social":0.05,"socievol":0.25,"soddisfacent":0.35,"soddisfatt":0.67,"sod":0,"sofferent":0.17,"soffert":-0.5,"sofistic":0.67,"soft":0,"soggett":0,"sognant":0.25,"sol":0,"solenn":0,"solert":0.53,"solid":0.22,"solit":0,"solitar":-0.5,"sollazz":0.33,"sollec":0.5,"soltant":0,"somar":-0.25,"somigl":0,"somm":0.33,"sommar":0,"son":-0.25,"sonor":0,"sopr":0,"sopranazional":0,"soprannatural":0.25,"soprattutt":0,"sopratutt":0,"soqquadr":-0.33,"sord":-0.5,"sorprendent":0,"sorrid":0.33,"sort":0.33,"sospes":-0.12,"sospett":-0.5,"sostanz":0.5,"sostanzastupefacent":0.5,"sostanzial":0,"sottil":0,"sottomess":-0.25,"sottosopr":-0.33,"sottot":-0.5,"soviet":-0.25,"sovranazional":0,"sovr":0.25,"sovvers":0.25,"spagnol":0,"spar":0,"spassion":0.25,"spass":0.38,"spassos":0.75,"spavald":0.67,"spavent":-1,"spazial":0.25,"spazios":0,"specc":0.33,"special":0,"specif":0.38,"specific":0,"specimen":0.5,"spend":0,"spensier":0.75,"sper":0,"spess":0.03,"spettacol":0.83,"spettacolar":1,"spiacevol":-1,"spiazzant":-0.5,"spieg":0,"spiet":-0.83,"spint":0,"spir":0.1,"spirit":0.5,"spiritual":0,"splendent":0.67,"splend":0.25,"splendid":0.83,"spogl":0.12,"spontane":0.33,"sport":0.5,"sprec":-0.25,"spregiudic":-0.75,"sprezzant":-0.75,"spropos":-0.25,"sprovvist":-0.25,"squallid":-0.5,"squis":0.67,"sregolat":-0.33,"sregolatezz":-0.25,"sregol":-0.05,"stabil":0.22,"stamp":0.33,"stanc":-0.5,"stant":0,"stanz":0,"static":0,"statiun":0,"statiunitidamer":0,"statunitens":0,"stavolt":0,"stell":0.25,"stellar":0,"sterc":-0.25,"stereotip":-0.38,"stess":0,"stilett":0,"stiliform":0,"stilist":0,"stim":0.75,"stimol":0.5,"stizz":-0.5,"stoff":0.33,"stolid":-0.75,"stoltezz":-0.25,"stolt":-0.75,"storic":0.07,"storiograf":0.03,"strabil":1,"stradapanoram":0,"strafalcion":-0.25,"stramb":0.33,"strampal":0.33,"stran":0.25,"stranier":0,"straordinar":0.83,"strappalacrim":-0.25,"stravag":0.33,"straziant":-1,"straz":-0.67,"strem":0,"strepit":1,"strett":0,"string":0,"stringent":-0.75,"stronz":-0.75,"struggent":0.19,"struttur":0,"stucchevol":-0.67,"stud":0.5,"studios":0,"stuf":-0.5,"stupefacent":0.5,"stup":0,"stupend":0.17,"stupidaggin":-0.25,"stupid":-0.5,"stuzzic":0.67,"subbugl":-0.33,"subdol":0,"sub":0.03,"sublim":1,"success":0.83,"succint":-0.17,"succulent":0.5,"sufficient":0.5,"sugger":0,"suggest":1,"sunt":0,"super":0,"superb":1,"superficial":0,"superflu":-0.5,"superior":0.5,"suprem":0,"surreal":0,"svag":0.25,"svarion":-0.25,"svedes":0,"svegl":1,"svel":0,"svelt":1,"sventur":-1,"svev":0,"taglient":0,"tal":0,"talment":0,"talvolt":0,"tanf":-0.25,"tangibil":0.25,"tant":0.25,"tantin":0,"tantissim":0,"tarc":0,"tard":-0.12,"tassat":0,"teatral":0,"tecnic":0,"tedesc":0,"ted":-0.5,"tedios":-0.75,"teenager":0,"televis":0,"temerar":0.67,"temibil":-0.75,"temper":0.33,"tempest":0.18,"temp":0,"temporal":0,"tempr":0.33,"tenac":0,"tendenzial":0,"tenebr":-0.2,"ten":0,"tener":0.5,"tent":0,"tenu":-0.5,"tepp":-0.25,"terminal":0,"terribil":0,"terror":-0.83,"terzan":0,"tes":-0.07,"testadirap":-0.5,"teston":-0.5,"tetr":-0.2,"tett":0.25,"tienim":0,"tiepid":-0.25,"tim":0,"tipic":0,"tip":0.5,"tiratadorecc":0,"tir":0,"titan":0.42,"titub":-0.12,"toccant":0.67,"tolkienian":0,"toller":0.5,"tont":-0.5,"top":0.33,"topic":0,"torbid":0.25,"torment":-0.5,"torn":0.33,"torpid":-0.5,"tortuos":0,"tortur":-0.5,"toscan":0,"tosc":0,"tost":0.5,"total":0.17,"tozz":0,"tracc":0,"tracot":1,"traditor":-0.5,"tradizional":-0.17,"tradott":0,"trafitt":0,"trafittur":0,"traged":-1,"tragic":-0.83,"tram":0,"trambust":-0.33,"tranell":-0.25,"tranquill":0.5,"trapass":-0.5,"trascin":1,"trascur":0,"trasparent":0.33,"trastull":0.25,"trattabil":0.25,"tratt":0,"travagl":-0.5,"travolgent":0.67,"tremend":0,"trem":-1,"trepid":0.17,"trionfant":1,"tripud":0.33,"trist":-0.5,"tristezz":-0.25,"tristissim":-1,"tropp":-0.33,"trov":0,"truff":-0.25,"tumult":-0.25,"tuorl":0,"turb":-0.5,"turbolent":-0.33,"turchin":0,"turlupinatur":-0.25,"tutt":0.25,"ubbidient":0.5,"ufficial":0,"uffizial":0,"uficial":0,"ufizial":0,"uggios":-0.75,"ugual":0,"ulterior":0,"ultim":-0.17,"ultimissim":0.33,"uman":-0.5,"umil":0.5,"umorist":0.25,"unic":1,"uniform":-0.75,"unit":0.25,"universal":0.25,"universitar":0,"uom":0.1,"urban":0,"usa":0,"usand":0,"usual":-0.25,"util":0.5,"utiledeserciz":0.5,"utilissim":0.75,"utilizz":0,"vacu":-0.5,"vag":-0.5,"vai":0,"val":0.33,"valent":0.25,"valer":0,"valg":0,"valid":0.75,"valor":0.67,"valyr":0,"van":0,"var":0.25,"variet":0.5,"vast":0,"vecc":0.17,"vel":-0.07,"veloc":0.17,"velocissim":0.75,"ven":0,"venezian":0,"venez":0,"veniremen":-0.33,"ventenn":0,"ventos":0,"ventur":0,"venust":0.33,"verac":0.5,"verbal":0,"verd":0,"verdicc":0,"verdign":0,"verdin":0,"verdognol":0,"verdolin":0,"vergogn":-0.75,"verid":0.38,"veritier":0.38,"verosimil":0,"versatil":0.5,"vertic":0.33,"vertigin":0.25,"vett":0.33,"vetust":0.17,"vezzos":0.33,"vianormal":0.17,"viava":-0.33,"vibrant":0.5,"vicevers":0,"vicin":0,"victor":0.25,"vidim":0.25,"vigil":0.33,"vigor":0.5,"vill":-0.25,"vincent":0.5,"vincitor":0.25,"vincol":-0.07,"violent":-0.75,"viril":0,"virtuos":0.5,"viss":0,"vistos":0.5,"vital":0.42,"vittor":0.25,"vivac":0.75,"viv":0.33,"vivent":0,"vivian":0,"vivid":0.67,"vizz":0,"vol":0,"volentier":0.5,"volereben":0.67,"voleremal":-0.25,"volg":-0.67,"volontar":0,"volpin":0.25,"volumin":-0.25,"volut":0.25,"voluttu":0.5,"vulner":-0.5,"vuot":0,"zaff":-0.25,"zeccol":-0.25,"zelant":0.17,"zen":0,"zuccon":-0.5}
},{}],29:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const pattern = require('./pattern_it.json');
const negations = require('./negations_it.json');

module.exports = {
  afinn: undefined,
  pattern,
  senticon: undefined,
  negations,
  stemmed: true,
};

},{"./negations_it.json":27,"./pattern_it.json":28}],30:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Among, BaseStemmer } = require('@nlpjs/core');

/* eslint-disable */
class StemmerIt extends BaseStemmer {
  constructor(container) {
    super(container);
    this.name = 'stemmer-it';
    this.I_p2 = 0;
    this.I_p1 = 0;
    this.I_pV = 0;
  }

  copy_from(other) {
    this.I_p2 = other.I_p2;
    this.I_p1 = other.I_p1;
    this.I_pV = other.I_pV;
    super.copy_from(other);
  }

  r_prelude() {
    let among_var;
    let v_1;
    let v_2;
    let v_3;
    let v_4;
    let v_5;
    // (, line 34
    // test, line 35
    v_1 = this.cursor;
    // repeat, line 35
    replab0: while (true) {
      v_2 = this.cursor;
      let lab1 = true;
      lab1: while (lab1 == true) {
        lab1 = false;
        // (, line 35
        // [, line 36
        this.bra = this.cursor;
        // substring, line 36
        among_var = this.find_among(StemmerIt.a_0, 7);
        if (among_var == 0) {
          break;
        }
        // ], line 36
        this.ket = this.cursor;
        switch (among_var) {
          case 0:
            break lab1;
          case 1:
            // (, line 37
            // <-, line 37
            if (!this.slice_from('\u00E0')) {
              return false;
            }
            break;
          case 2:
            // (, line 38
            // <-, line 38
            if (!this.slice_from('\u00E8')) {
              return false;
            }
            break;
          case 3:
            // (, line 39
            // <-, line 39
            if (!this.slice_from('\u00EC')) {
              return false;
            }
            break;
          case 4:
            // (, line 40
            // <-, line 40
            if (!this.slice_from('\u00F2')) {
              return false;
            }
            break;
          case 5:
            // (, line 41
            // <-, line 41
            if (!this.slice_from('\u00F9')) {
              return false;
            }
            break;
          case 6:
            // (, line 42
            // <-, line 42
            if (!this.slice_from('qU')) {
              return false;
            }
            break;
          case 7:
            // (, line 43
            // next, line 43
            if (this.cursor >= this.limit) {
              break lab1;
            }
            this.cursor++;
            break;
        }
        continue replab0;
      }
      this.cursor = v_2;
      break;
    }
    this.cursor = v_1;
    // repeat, line 46
    replab2: while (true) {
      v_3 = this.cursor;
      let lab3 = true;
      lab3: while (lab3 == true) {
        lab3 = false;
        // goto, line 46
        golab4: while (true) {
          v_4 = this.cursor;
          let lab5 = true;
          lab5: while (lab5 == true) {
            lab5 = false;
            // (, line 46
            if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
              break;
            }
            // [, line 47
            this.bra = this.cursor;
            // or, line 47
            let lab6 = true;
            lab6: while (lab6 == true) {
              lab6 = false;
              v_5 = this.cursor;
              let lab7 = true;
              while (lab7 == true) {
                lab7 = false;
                // (, line 47
                // literal, line 47
                if (!this.eq_s(1, 'u')) {
                  break;
                }
                // ], line 47
                this.ket = this.cursor;
                if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
                  break;
                }
                // <-, line 47
                if (!this.slice_from('U')) {
                  return false;
                }
                break lab6;
              }
              this.cursor = v_5;
              // (, line 48
              // literal, line 48
              if (!this.eq_s(1, 'i')) {
                break lab5;
              }
              // ], line 48
              this.ket = this.cursor;
              if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
                break lab5;
              }
              // <-, line 48
              if (!this.slice_from('I')) {
                return false;
              }
            }
            this.cursor = v_4;
            break golab4;
          }
          this.cursor = v_4;
          if (this.cursor >= this.limit) {
            break lab3;
          }
          this.cursor++;
        }
        continue replab2;
      }
      this.cursor = v_3;
      break;
    }
    return true;
  }

  r_mark_regions() {
    let v_1;
    let v_2;
    let v_3;
    let v_6;
    let v_8;
    // (, line 52
    this.I_pV = this.limit;
    this.I_p1 = this.limit;
    this.I_p2 = this.limit;
    // do, line 58
    v_1 = this.cursor;
    let lab0 = true;
    lab0: while (lab0 == true) {
      lab0 = false;
      // (, line 58
      // or, line 60
      let lab1 = true;
      lab1: while (lab1 == true) {
        lab1 = false;
        v_2 = this.cursor;
        let lab2 = true;
        lab2: while (lab2 == true) {
          lab2 = false;
          // (, line 59
          if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
            break;
          }
          // or, line 59
          let lab3 = true;
          lab3: while (lab3 == true) {
            lab3 = false;
            v_3 = this.cursor;
            let lab4 = true;
            lab4: while (lab4 == true) {
              lab4 = false;
              // (, line 59
              if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
                break;
              }
              // gopast, line 59
              golab5: while (true) {
                let lab6 = true;
                while (lab6 == true) {
                  lab6 = false;
                  if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
                    break;
                  }
                  break golab5;
                }
                if (this.cursor >= this.limit) {
                  break lab4;
                }
                this.cursor++;
              }
              break lab3;
            }
            this.cursor = v_3;
            // (, line 59
            if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
              break lab2;
            }
            // gopast, line 59
            golab7: while (true) {
              let lab8 = true;
              while (lab8 == true) {
                lab8 = false;
                if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
                  break;
                }
                break golab7;
              }
              if (this.cursor >= this.limit) {
                break lab2;
              }
              this.cursor++;
            }
          }
          break lab1;
        }
        this.cursor = v_2;
        // (, line 61
        if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
          break lab0;
        }
        // or, line 61
        let lab9 = true;
        lab9: while (lab9 == true) {
          lab9 = false;
          v_6 = this.cursor;
          let lab10 = true;
          lab10: while (lab10 == true) {
            lab10 = false;
            // (, line 61
            if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
              break;
            }
            // gopast, line 61
            golab11: while (true) {
              let lab12 = true;
              while (lab12 == true) {
                lab12 = false;
                if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
                  break;
                }
                break golab11;
              }
              if (this.cursor >= this.limit) {
                break lab10;
              }
              this.cursor++;
            }
            break lab9;
          }
          this.cursor = v_6;
          // (, line 61
          if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
            break lab0;
          }
          // next, line 61
          if (this.cursor >= this.limit) {
            break lab0;
          }
          this.cursor++;
        }
      }
      // setmark pV, line 62
      this.I_pV = this.cursor;
    }
    this.cursor = v_1;
    // do, line 64
    v_8 = this.cursor;
    let lab13 = true;
    lab13: while (lab13 == true) {
      lab13 = false;
      // (, line 64
      // gopast, line 65
      golab14: while (true) {
        let lab15 = true;
        while (lab15 == true) {
          lab15 = false;
          if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
            break;
          }
          break golab14;
        }
        if (this.cursor >= this.limit) {
          break lab13;
        }
        this.cursor++;
      }
      // gopast, line 65
      golab16: while (true) {
        let lab17 = true;
        while (lab17 == true) {
          lab17 = false;
          if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
            break;
          }
          break golab16;
        }
        if (this.cursor >= this.limit) {
          break lab13;
        }
        this.cursor++;
      }
      // setmark p1, line 65
      this.I_p1 = this.cursor;
      // gopast, line 66
      golab18: while (true) {
        let lab19 = true;
        while (lab19 == true) {
          lab19 = false;
          if (!this.in_grouping(StemmerIt.g_v, 97, 249)) {
            break;
          }
          break golab18;
        }
        if (this.cursor >= this.limit) {
          break lab13;
        }
        this.cursor++;
      }
      // gopast, line 66
      golab20: while (true) {
        let lab21 = true;
        while (lab21 == true) {
          lab21 = false;
          if (!this.out_grouping(StemmerIt.g_v, 97, 249)) {
            break;
          }
          break golab20;
        }
        if (this.cursor >= this.limit) {
          break lab13;
        }
        this.cursor++;
      }
      // setmark p2, line 66
      this.I_p2 = this.cursor;
    }
    this.cursor = v_8;
    return true;
  }

  r_postlude() {
    let among_var;
    let v_1;
    // repeat, line 70
    replab0: while (true) {
      v_1 = this.cursor;
      let lab1 = true;
      lab1: while (lab1 == true) {
        lab1 = false;
        // (, line 70
        // [, line 72
        this.bra = this.cursor;
        // substring, line 72
        among_var = this.find_among(StemmerIt.a_1, 3);
        if (among_var == 0) {
          break;
        }
        // ], line 72
        this.ket = this.cursor;
        switch (among_var) {
          case 0:
            break lab1;
          case 1:
            // (, line 73
            // <-, line 73
            if (!this.slice_from('i')) {
              return false;
            }
            break;
          case 2:
            // (, line 74
            // <-, line 74
            if (!this.slice_from('u')) {
              return false;
            }
            break;
          case 3:
            // (, line 75
            // next, line 75
            if (this.cursor >= this.limit) {
              break lab1;
            }
            this.cursor++;
            break;
        }
        continue replab0;
      }
      this.cursor = v_1;
      break;
    }
    return true;
  }

  r_RV() {
    if (!(this.I_pV <= this.cursor)) {
      return false;
    }
    return true;
  }

  r_R1() {
    if (!(this.I_p1 <= this.cursor)) {
      return false;
    }
    return true;
  }

  r_R2() {
    if (!(this.I_p2 <= this.cursor)) {
      return false;
    }
    return true;
  }

  r_attached_pronoun() {
    let among_var;
    // (, line 86
    // [, line 87
    this.ket = this.cursor;
    // substring, line 87
    if (this.find_among_b(StemmerIt.a_2, 37) == 0) {
      return false;
    }
    // ], line 87
    this.bra = this.cursor;
    // among, line 97
    among_var = this.find_among_b(StemmerIt.a_3, 5);
    if (among_var == 0) {
      return false;
    }
    // (, line 97
    // call RV, line 97
    if (!this.r_RV()) {
      return false;
    }
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 98
        // delete, line 98
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 2:
        // (, line 99
        // <-, line 99
        if (!this.slice_from('e')) {
          return false;
        }
        break;
    }
    return true;
  }

  r_standard_suffix() {
    let among_var;
    let v_1;
    let v_2;
    let v_3;
    let v_4;
    // (, line 103
    // [, line 104
    this.ket = this.cursor;
    // substring, line 104
    among_var = this.find_among_b(StemmerIt.a_6, 51);
    if (among_var == 0) {
      return false;
    }
    // ], line 104
    this.bra = this.cursor;
    switch (among_var) {
      case 0:
        return false;
      case 1:
        // (, line 111
        // call R2, line 111
        if (!this.r_R2()) {
          return false;
        }
        // delete, line 111
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 2:
        // (, line 113
        // call R2, line 113
        if (!this.r_R2()) {
          return false;
        }
        // delete, line 113
        if (!this.slice_del()) {
          return false;
        }
        // try, line 114
        v_1 = this.limit - this.cursor;
        var lab0 = true;
        while (lab0 == true) {
          lab0 = false;
          // (, line 114
          // [, line 114
          this.ket = this.cursor;
          // literal, line 114
          if (!this.eq_s_b(2, 'ic')) {
            this.cursor = this.limit - v_1;
            break;
          }
          // ], line 114
          this.bra = this.cursor;
          // call R2, line 114
          if (!this.r_R2()) {
            this.cursor = this.limit - v_1;
            break;
          }
          // delete, line 114
          if (!this.slice_del()) {
            return false;
          }
        }
        break;
      case 3:
        // (, line 117
        // call R2, line 117
        if (!this.r_R2()) {
          return false;
        }
        // <-, line 117
        if (!this.slice_from('log')) {
          return false;
        }
        break;
      case 4:
        // (, line 119
        // call R2, line 119
        if (!this.r_R2()) {
          return false;
        }
        // <-, line 119
        if (!this.slice_from('u')) {
          return false;
        }
        break;
      case 5:
        // (, line 121
        // call R2, line 121
        if (!this.r_R2()) {
          return false;
        }
        // <-, line 121
        if (!this.slice_from('ente')) {
          return false;
        }
        break;
      case 6:
        // (, line 123
        // call RV, line 123
        if (!this.r_RV()) {
          return false;
        }
        // delete, line 123
        if (!this.slice_del()) {
          return false;
        }
        break;
      case 7:
        // (, line 124
        // call R1, line 125
        if (!this.r_R1()) {
          return false;
        }
        // delete, line 125
        if (!this.slice_del()) {
          return false;
        }
        // try, line 126
        v_2 = this.limit - this.cursor;
        var lab1 = true;
        lab1: while (lab1 == true) {
          lab1 = false;
          // (, line 126
          // [, line 127
          this.ket = this.cursor;
          // substring, line 127
          among_var = this.find_among_b(StemmerIt.a_4, 4);
          if (among_var == 0) {
            this.cursor = this.limit - v_2;
            break;
          }
          // ], line 127
          this.bra = this.cursor;
          // call R2, line 127
          if (!this.r_R2()) {
            this.cursor = this.limit - v_2;
            break;
          }
          // delete, line 127
          if (!this.slice_del()) {
            return false;
          }
          switch (among_var) {
            case 0:
              this.cursor = this.limit - v_2;
              break lab1;
            case 1:
              // (, line 128
              // [, line 128
              this.ket = this.cursor;
              // literal, line 128
              if (!this.eq_s_b(2, 'at')) {
                this.cursor = this.limit - v_2;
                break lab1;
              }
              // ], line 128
              this.bra = this.cursor;
              // call R2, line 128
              if (!this.r_R2()) {
                this.cursor = this.limit - v_2;
                break lab1;
              }
              // delete, line 128
              if (!this.slice_del()) {
                return false;
              }
              break;
          }
        }
        break;
      case 8:
        // (, line 133
        // call R2, line 134
        if (!this.r_R2()) {
          return false;
        }
        // delete, line 134
        if (!this.slice_del()) {
          return false;
        }
        // try, line 135
        v_3 = this.limit - this.cursor;
        var lab2 = true;
        lab2: while (lab2 == true) {
          lab2 = false;
          // (, line 135
          // [, line 136
          this.ket = this.cursor;
          // substring, line 136
          among_var = this.find_among_b(StemmerIt.a_5, 3);
          if (among_var == 0) {
            this.cursor = this.limit - v_3;
            break;
          }
          // ], line 136
          this.bra = this.cursor;
          switch (among_var) {
            case 0:
              this.cursor = this.limit - v_3;
              break lab2;
            case 1:
              // (, line 137
              // call R2, line 137
              if (!this.r_R2()) {
                this.cursor = this.limit - v_3;
                break lab2;
              }
              // delete, line 137
              if (!this.slice_del()) {
                return false;
              }
              break;
          }
        }
        break;
      case 9:
        // (, line 141
        // call R2, line 142
        if (!this.r_R2()) {
          return false;
        }
        // delete, line 142
        if (!this.slice_del()) {
          return false;
        }
        // try, line 143
        v_4 = this.limit - this.cursor;
        var lab3 = true;
        while (lab3 == true) {
          lab3 = false;
          // (, line 143
          // [, line 143
          this.ket = this.cursor;
          // literal, line 143
          if (!this.eq_s_b(2, 'at')) {
            this.cursor = this.limit - v_4;
            break;
          }
          // ], line 143
          this.bra = this.cursor;
          // call R2, line 143
          if (!this.r_R2()) {
            this.cursor = this.limit - v_4;
            break;
          }
          // delete, line 143
          if (!this.slice_del()) {
            return false;
          }
          // [, line 143
          this.ket = this.cursor;
          // literal, line 143
          if (!this.eq_s_b(2, 'ic')) {
            this.cursor = this.limit - v_4;
            break;
          }
          // ], line 143
          this.bra = this.cursor;
          // call R2, line 143
          if (!this.r_R2()) {
            this.cursor = this.limit - v_4;
            break;
          }
          // delete, line 143
          if (!this.slice_del()) {
            return false;
          }
        }
        break;
    }
    return true;
  }

  r_verb_suffix() {
    let among_var;
    let v_1;
    let v_2;
    // setlimit, line 148
    v_1 = this.limit - this.cursor;
    // tomark, line 148
    if (this.cursor < this.I_pV) {
      return false;
    }
    this.cursor = this.I_pV;
    v_2 = this.limit_backward;
    this.limit_backward = this.cursor;
    this.cursor = this.limit - v_1;
    // (, line 148
    // [, line 149
    this.ket = this.cursor;
    // substring, line 149
    among_var = this.find_among_b(StemmerIt.a_7, 87);
    if (among_var == 0) {
      this.limit_backward = v_2;
      return false;
    }
    // ], line 149
    this.bra = this.cursor;
    switch (among_var) {
      case 0:
        this.limit_backward = v_2;
        return false;
      case 1:
        // (, line 163
        // delete, line 163
        if (!this.slice_del()) {
          return false;
        }
        break;
    }
    this.limit_backward = v_2;
    return true;
  }

  r_vowel_suffix() {
    let v_1;
    let v_2;
    // (, line 170
    // try, line 171
    v_1 = this.limit - this.cursor;
    let lab0 = true;
    while (lab0 == true) {
      lab0 = false;
      // (, line 171
      // [, line 172
      this.ket = this.cursor;
      if (!this.in_grouping_b(StemmerIt.g_AEIO, 97, 242)) {
        this.cursor = this.limit - v_1;
        break;
      }
      // ], line 172
      this.bra = this.cursor;
      // call RV, line 172
      if (!this.r_RV()) {
        this.cursor = this.limit - v_1;
        break;
      }
      // delete, line 172
      if (!this.slice_del()) {
        return false;
      }
      // [, line 173
      this.ket = this.cursor;
      // literal, line 173
      if (!this.eq_s_b(1, 'i')) {
        this.cursor = this.limit - v_1;
        break;
      }
      // ], line 173
      this.bra = this.cursor;
      // call RV, line 173
      if (!this.r_RV()) {
        this.cursor = this.limit - v_1;
        break;
      }
      // delete, line 173
      if (!this.slice_del()) {
        return false;
      }
    }
    // try, line 175
    v_2 = this.limit - this.cursor;
    let lab1 = true;
    while (lab1 == true) {
      lab1 = false;
      // (, line 175
      // [, line 176
      this.ket = this.cursor;
      // literal, line 176
      if (!this.eq_s_b(1, 'h')) {
        this.cursor = this.limit - v_2;
        break;
      }
      // ], line 176
      this.bra = this.cursor;
      if (!this.in_grouping_b(StemmerIt.g_CG, 99, 103)) {
        this.cursor = this.limit - v_2;
        break;
      }
      // call RV, line 176
      if (!this.r_RV()) {
        this.cursor = this.limit - v_2;
        break;
      }
      // delete, line 176
      if (!this.slice_del()) {
        return false;
      }
    }
    return true;
  }

  innerStem() {
    let v_1;
    let v_2;
    let v_3;
    let v_4;
    let v_5;
    let v_6;
    let v_7;
    // (, line 181
    // do, line 182
    v_1 = this.cursor;
    let lab0 = true;
    while (lab0 == true) {
      lab0 = false;
      // call prelude, line 182
      if (!this.r_prelude()) {
        break;
      }
    }
    this.cursor = v_1;
    // do, line 183
    v_2 = this.cursor;
    let lab1 = true;
    while (lab1 == true) {
      lab1 = false;
      // call mark_regions, line 183
      if (!this.r_mark_regions()) {
        break;
      }
    }
    this.cursor = v_2;
    // backwards, line 184
    this.limit_backward = this.cursor;
    this.cursor = this.limit;
    // (, line 184
    // do, line 185
    v_3 = this.limit - this.cursor;
    let lab2 = true;
    while (lab2 == true) {
      lab2 = false;
      // call attached_pronoun, line 185
      if (!this.r_attached_pronoun()) {
        break;
      }
    }
    this.cursor = this.limit - v_3;
    // do, line 186
    v_4 = this.limit - this.cursor;
    let lab3 = true;
    lab3: while (lab3 == true) {
      lab3 = false;
      // (, line 186
      // or, line 186
      let lab4 = true;
      lab4: while (lab4 == true) {
        lab4 = false;
        v_5 = this.limit - this.cursor;
        let lab5 = true;
        while (lab5 == true) {
          lab5 = false;
          // call standard_suffix, line 186
          if (!this.r_standard_suffix()) {
            break;
          }
          break lab4;
        }
        this.cursor = this.limit - v_5;
        // call verb_suffix, line 186
        if (!this.r_verb_suffix()) {
          break lab3;
        }
      }
    }
    this.cursor = this.limit - v_4;
    // do, line 187
    v_6 = this.limit - this.cursor;
    let lab6 = true;
    while (lab6 == true) {
      lab6 = false;
      // call vowel_suffix, line 187
      if (!this.r_vowel_suffix()) {
        break;
      }
    }
    this.cursor = this.limit - v_6;
    this.cursor = this.limit_backward; // do, line 189
    v_7 = this.cursor;
    let lab7 = true;
    while (lab7 == true) {
      lab7 = false;
      // call postlude, line 189
      if (!this.r_postlude()) {
        break;
      }
    }
    this.cursor = v_7;
    return true;
  }
}

StemmerIt.methodObject = new StemmerIt();

StemmerIt.a_0 = [
  new Among('', -1, 7),
  new Among('qu', 0, 6),
  new Among('\u00E1', 0, 1),
  new Among('\u00E9', 0, 2),
  new Among('\u00ED', 0, 3),
  new Among('\u00F3', 0, 4),
  new Among('\u00FA', 0, 5)
];

StemmerIt.a_1 = [
  new Among('', -1, 3),
  new Among('I', 0, 1),
  new Among('U', 0, 2)
];

StemmerIt.a_2 = [
  new Among('la', -1, -1),
  new Among('cela', 0, -1),
  new Among('gliela', 0, -1),
  new Among('mela', 0, -1),
  new Among('tela', 0, -1),
  new Among('vela', 0, -1),
  new Among('le', -1, -1),
  new Among('cele', 6, -1),
  new Among('gliele', 6, -1),
  new Among('mele', 6, -1),
  new Among('tele', 6, -1),
  new Among('vele', 6, -1),
  new Among('ne', -1, -1),
  new Among('cene', 12, -1),
  new Among('gliene', 12, -1),
  new Among('mene', 12, -1),
  new Among('sene', 12, -1),
  new Among('tene', 12, -1),
  new Among('vene', 12, -1),
  new Among('ci', -1, -1),
  new Among('li', -1, -1),
  new Among('celi', 20, -1),
  new Among('glieli', 20, -1),
  new Among('meli', 20, -1),
  new Among('teli', 20, -1),
  new Among('veli', 20, -1),
  new Among('gli', 20, -1),
  new Among('mi', -1, -1),
  new Among('si', -1, -1),
  new Among('ti', -1, -1),
  new Among('vi', -1, -1),
  new Among('lo', -1, -1),
  new Among('celo', 31, -1),
  new Among('glielo', 31, -1),
  new Among('melo', 31, -1),
  new Among('telo', 31, -1),
  new Among('velo', 31, -1)
];

StemmerIt.a_3 = [
  new Among('ando', -1, 1),
  new Among('endo', -1, 1),
  new Among('ar', -1, 2),
  new Among('er', -1, 2),
  new Among('ir', -1, 2)
];

StemmerIt.a_4 = [
  new Among('ic', -1, -1),
  new Among('abil', -1, -1),
  new Among('os', -1, -1),
  new Among('iv', -1, 1)
];

StemmerIt.a_5 = [
  new Among('ic', -1, 1),
  new Among('abil', -1, 1),
  new Among('iv', -1, 1)
];

StemmerIt.a_6 = [
  new Among('ica', -1, 1),
  new Among('logia', -1, 3),
  new Among('osa', -1, 1),
  new Among('ista', -1, 1),
  new Among('iva', -1, 9),
  new Among('anza', -1, 1),
  new Among('enza', -1, 5),
  new Among('ice', -1, 1),
  new Among('atrice', 7, 1),
  new Among('iche', -1, 1),
  new Among('logie', -1, 3),
  new Among('abile', -1, 1),
  new Among('ibile', -1, 1),
  new Among('usione', -1, 4),
  new Among('azione', -1, 2),
  new Among('uzione', -1, 4),
  new Among('atore', -1, 2),
  new Among('ose', -1, 1),
  new Among('ante', -1, 1),
  new Among('mente', -1, 1),
  new Among('amente', 19, 7),
  new Among('iste', -1, 1),
  new Among('ive', -1, 9),
  new Among('anze', -1, 1),
  new Among('enze', -1, 5),
  new Among('ici', -1, 1),
  new Among('atrici', 25, 1),
  new Among('ichi', -1, 1),
  new Among('abili', -1, 1),
  new Among('ibili', -1, 1),
  new Among('ismi', -1, 1),
  new Among('usioni', -1, 4),
  new Among('azioni', -1, 2),
  new Among('uzioni', -1, 4),
  new Among('atori', -1, 2),
  new Among('osi', -1, 1),
  new Among('anti', -1, 1),
  new Among('amenti', -1, 6),
  new Among('imenti', -1, 6),
  new Among('isti', -1, 1),
  new Among('ivi', -1, 9),
  new Among('ico', -1, 1),
  new Among('ismo', -1, 1),
  new Among('oso', -1, 1),
  new Among('amento', -1, 6),
  new Among('imento', -1, 6),
  new Among('ivo', -1, 9),
  new Among('it\u00E0', -1, 8),
  new Among('ist\u00E0', -1, 1),
  new Among('ist\u00E8', -1, 1),
  new Among('ist\u00EC', -1, 1)
];

StemmerIt.a_7 = [
  new Among('isca', -1, 1),
  new Among('enda', -1, 1),
  new Among('ata', -1, 1),
  new Among('ita', -1, 1),
  new Among('uta', -1, 1),
  new Among('ava', -1, 1),
  new Among('eva', -1, 1),
  new Among('iva', -1, 1),
  new Among('erebbe', -1, 1),
  new Among('irebbe', -1, 1),
  new Among('isce', -1, 1),
  new Among('ende', -1, 1),
  new Among('are', -1, 1),
  new Among('ere', -1, 1),
  new Among('ire', -1, 1),
  new Among('asse', -1, 1),
  new Among('ate', -1, 1),
  new Among('avate', 16, 1),
  new Among('evate', 16, 1),
  new Among('ivate', 16, 1),
  new Among('ete', -1, 1),
  new Among('erete', 20, 1),
  new Among('irete', 20, 1),
  new Among('ite', -1, 1),
  new Among('ereste', -1, 1),
  new Among('ireste', -1, 1),
  new Among('ute', -1, 1),
  new Among('erai', -1, 1),
  new Among('irai', -1, 1),
  new Among('isci', -1, 1),
  new Among('endi', -1, 1),
  new Among('erei', -1, 1),
  new Among('irei', -1, 1),
  new Among('assi', -1, 1),
  new Among('ati', -1, 1),
  new Among('iti', -1, 1),
  new Among('eresti', -1, 1),
  new Among('iresti', -1, 1),
  new Among('uti', -1, 1),
  new Among('avi', -1, 1),
  new Among('evi', -1, 1),
  new Among('ivi', -1, 1),
  new Among('isco', -1, 1),
  new Among('ando', -1, 1),
  new Among('endo', -1, 1),
  new Among('Yamo', -1, 1),
  new Among('iamo', -1, 1),
  new Among('avamo', -1, 1),
  new Among('evamo', -1, 1),
  new Among('ivamo', -1, 1),
  new Among('eremo', -1, 1),
  new Among('iremo', -1, 1),
  new Among('assimo', -1, 1),
  new Among('ammo', -1, 1),
  new Among('emmo', -1, 1),
  new Among('eremmo', 54, 1),
  new Among('iremmo', 54, 1),
  new Among('immo', -1, 1),
  new Among('ano', -1, 1),
  new Among('iscano', 58, 1),
  new Among('avano', 58, 1),
  new Among('evano', 58, 1),
  new Among('ivano', 58, 1),
  new Among('eranno', -1, 1),
  new Among('iranno', -1, 1),
  new Among('ono', -1, 1),
  new Among('iscono', 65, 1),
  new Among('arono', 65, 1),
  new Among('erono', 65, 1),
  new Among('irono', 65, 1),
  new Among('erebbero', -1, 1),
  new Among('irebbero', -1, 1),
  new Among('assero', -1, 1),
  new Among('essero', -1, 1),
  new Among('issero', -1, 1),
  new Among('ato', -1, 1),
  new Among('ito', -1, 1),
  new Among('uto', -1, 1),
  new Among('avo', -1, 1),
  new Among('evo', -1, 1),
  new Among('ivo', -1, 1),
  new Among('ar', -1, 1),
  new Among('ir', -1, 1),
  new Among('er\u00E0', -1, 1),
  new Among('ir\u00E0', -1, 1),
  new Among('er\u00F2', -1, 1),
  new Among('ir\u00F2', -1, 1)
];

StemmerIt.g_v = [
  17,
  65,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  128,
  128,
  8,
  2,
  1
];

StemmerIt.g_AEIO = [
  17,
  65,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  128,
  128,
  8,
  2
];

StemmerIt.g_CG = [17];

module.exports = StemmerIt;

},{"@nlpjs/core":13}],31:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { Stopwords } = require('@nlpjs/core');

class StopwordsIt extends Stopwords {
  constructor(container, words) {
    super(container);
    this.name = 'stopwords-it';
    this.dictionary = {};
    const list = words || [
      'ad',
      'al',
      'allo',
      'ai',
      'agli',
      'all',
      'agl',
      'alla',
      'alle',
      'con',
      'col',
      'coi',
      'da',
      'dal',
      'dallo',
      'dai',
      'dagli',
      'dall',
      'dagl',
      'dalla',
      'dalle',
      'di',
      'del',
      'dello',
      'dei',
      'degli',
      'dell',
      'degl',
      'della',
      'delle',
      'in',
      'nel',
      'nello',
      'nei',
      'negli',
      'nell',
      'negl',
      'nella',
      'nelle',
      'su',
      'sul',
      'sullo',
      'sui',
      'sugli',
      'sull',
      'sugl',
      'sulla',
      'sulle',
      'per',
      'tra',
      'contro',
      'io',
      'tu',
      'lui',
      'lei',
      'noi',
      'voi',
      'loro',
      'mio',
      'mia',
      'miei',
      'mie',
      'tuo',
      'tua',
      'tuoi',
      'tue',
      'suo',
      'sua',
      'suoi',
      'sue',
      'nostro',
      'nostra',
      'nostri',
      'nostre',
      'vostro',
      'vostra',
      'vostri',
      'vostre',
      'mi',
      'ti',
      'ci',
      'vi',
      'lo',
      'la',
      'li',
      'le',
      'gli',
      'ne',
      'il',
      'un',
      'uno',
      'una',
      'ma',
      'ed',
      'se',
      'perché',
      'anche',
      'come',
      'dov',
      'dove',
      'che',
      'chi',
      'cui',
      'non',
      'più',
      'quale',
      'quanto',
      'quanti',
      'quanta',
      'quante',
      'quello',
      'quelli',
      'quella',
      'quelle',
      'questo',
      'questi',
      'questa',
      'queste',
      'si',
      'tutto',
      'tutti',
      'a',
      'c',
      'e',
      'i',
      'l',
      'o',
      'ho',
      'hai',
      'ha',
      'abbiamo',
      'avete',
      'hanno',
      'abbia',
      'abbiate',
      'abbiano',
      'avrò',
      'avrai',
      'avrà',
      'avremo',
      'avrete',
      'avranno',
      'avrei',
      'avresti',
      'avrebbe',
      'avremmo',
      'avreste',
      'avrebbero',
      'avevo',
      'avevi',
      'aveva',
      'avevamo',
      'avevate',
      'avevano',
      'ebbi',
      'avesti',
      'ebbe',
      'avemmo',
      'aveste',
      'ebbero',
      'avessi',
      'avesse',
      'avessimo',
      'avessero',
      'avendo',
      'avuto',
      'avuta',
      'avuti',
      'avute',
      'sono',
      'sei',
      'è',
      'siamo',
      'siete',
      'sia',
      'siate',
      'siano',
      'sarò',
      'sarai',
      'sarà',
      'saremo',
      'sarete',
      'saranno',
      'sarei',
      'saresti',
      'sarebbe',
      'saremmo',
      'sareste',
      'sarebbero',
      'ero',
      'eri',
      'era',
      'eravamo',
      'eravate',
      'erano',
      'fui',
      'fosti',
      'fu',
      'fummo',
      'foste',
      'furono',
      'fossi',
      'fosse',
      'fossimo',
      'fossero',
      'essendo',
      'faccio',
      'fai',
      'facciamo',
      'fanno',
      'faccia',
      'facciate',
      'facciano',
      'farò',
      'farai',
      'farà',
      'faremo',
      'farete',
      'faranno',
      'farei',
      'faresti',
      'farebbe',
      'faremmo',
      'fareste',
      'farebbero',
      'facevo',
      'facevi',
      'faceva',
      'facevamo',
      'facevate',
      'facevano',
      'feci',
      'facesti',
      'fece',
      'facemmo',
      'faceste',
      'fecero',
      'facessi',
      'facesse',
      'facessimo',
      'facessero',
      'facendo',
      'sto',
      'stai',
      'sta',
      'stiamo',
      'stanno',
      'stia',
      'stiate',
      'stiano',
      'starò',
      'starai',
      'starà',
      'staremo',
      'starete',
      'staranno',
      'starei',
      'staresti',
      'starebbe',
      'staremmo',
      'stareste',
      'starebbero',
      'stavo',
      'stavi',
      'stava',
      'stavamo',
      'stavate',
      'stavano',
      'stetti',
      'stesti',
      'stette',
      'stemmo',
      'steste',
      'stettero',
      'stessi',
      'stesse',
      'stessimo',
      'stessero',
      'stando',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '_',
    ];
    this.build(list);
  }
}

module.exports = StopwordsIt;

},{"@nlpjs/core":13}],32:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const { Tokenizer } = require('@nlpjs/core');

class TokenizerIt extends Tokenizer {
  constructor(container, shouldTokenize) {
    super(container, shouldTokenize);
    this.name = 'tokenizer-it';
  }
}

module.exports = TokenizerIt;

},{"@nlpjs/core":13}],33:[function(require,module,exports){
/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function registerTrigrams(container) {
  const language = container.get('Language');
  if (language) {
    language.addModel(
      'Latin',
      'ita',
      ' dito  deion inla e ddi ne  e ziore le ni ellonellarita do ddelittiridir coti essent alazittote i di ieretà  prndie laleo ainde ee igninteconi eli a s unmenogn neuo  ogidue aividuovid estti hadiv lia pno allproza atopersseser soi s la sue p peibena a l ilbere nil alilibha chein o se s quo eia e c rinzata ntohe onio i o stao cnel a o pnaze oso  poo hglii uondi cersamei plleun erari verro el unaa c chertua i assirtàa eei disant l tata aonaual leitàareter adnit daprideià ecia st sinalesttutistcomuni edono nasuaal si anz pa rerazguaitaresdersocmano oad i oesequeenzed  seio etton  tudicà dsiai rrsoocirioariquaialpreichratientraaniumase ll eria no n umdo araa tzzaer triatticoposscii lsonndapare ufon fontiuzistruttatisenintnesiar i hian cstichiannra  egeguispbilonta r norop meoprost mauesicassotalciesunlitoreinaitetan ranongiod ae rdevi ml iezzizi cunnorà a ittarialiacosssudall p asassopove eve'
    );
  }
}

module.exports = registerTrigrams;

},{}]},{},[2]);
