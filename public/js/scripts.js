(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _marvelApi = require("./modules/marvel-api");

var _galleryPoo = require("./modules/gallery-poo");

(0, _marvelApi.getConnection)();

},{"./modules/gallery-poo":2,"./modules/marvel-api":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lightbox = exports.Lightbox = function () {
  function Lightbox(container) {
    _classCallCheck(this, Lightbox);

    this.container = container, this.lightbox(container);
  }

  _createClass(Lightbox, [{
    key: 'lightbox',
    value: function lightbox(container) {
      var images = this.getImages(container),
          larges = this.getLargeImages(images),
          descriptions = this.getDescriptions(images);

      this.openLightBoxEvent(container, images, larges, descriptions);
    }
  }, {
    key: 'getImages',
    value: function getImages(container) {
      return [].concat(_toConsumableArray(container.querySelectorAll('img')));
    }
  }, {
    key: 'getLargeImages',
    value: function getLargeImages(gallery) {
      return gallery.map(function (el) {
        return el.src;
      });
    }
  }, {
    key: 'getDescriptions',
    value: function getDescriptions(gallery) {
      return gallery.map(function (el) {
        return el.alt;
      });
    }
  }, {
    key: 'openLightBoxEvent',
    value: function openLightBoxEvent(container, gallery, larges, descriptions) {
      var _this = this;

      container.addEventListener('click', function (e) {
        var el = e.target,
            i = gallery.indexOf(el);

        if (el.tagName === 'IMG') {
          _this.openLightBox(gallery, i, larges, descriptions);
        }
      });
    }
  }, {
    key: 'openLightBox',
    value: function openLightBox(gallery, i, larges, descriptions) {
      var lightboxEl = document.createElement('div');

      var lightBoxContent = '\n      <div class="lightbox-overlay">\n        <figure class="lightbox-container">\n          <div class="close-modal"></div>\n          <img src="' + larges[i] + '" class="lightbox-image">\n          <figcaption>\n            <p class="lightbox-description">' + descriptions[i] + '</p>\n          <figcaption>\n          <nav class="class="lightbox-navigation"">\n            <a href="" class="lightbox-navigation__button prev"></a>\n            <span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + larges.length + ' </span>\n            <a href="" class="lightbox-navigation__button next"></a>\n          </nav>\n        </figure>\n      </div>\n    ';

      lightboxEl.innerHTML = lightBoxContent;

      lightboxEl.id = 'lightbox';

      document.body.appendChild(lightboxEl);

      this.closeModal(lightboxEl);

      this.navigateLightBox(lightboxEl, i, larges, descriptions);
    }
  }, {
    key: 'closeModal',
    value: function closeModal(modalEl) {
      var closeModal = modalEl.querySelector('.close-modal');

      closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.removeChild(modalEl);
      });
    }
  }, {
    key: 'navigateLightBox',
    value: function navigateLightBox(lightboxEl, i, larges, descriptions) {
      var prev = lightboxEl.querySelector('.prev'),
          next = lightboxEl.querySelector('.next'),
          image = lightboxEl.querySelector('img'),
          description = lightboxEl.querySelector('p'),
          counter = lightboxEl.querySelector('span'),
          close = lightboxEl.querySelector('.close-modal');

      window.addEventListener('keyup', function (e) {
        if (e.key === 'ArrowRight') next.click();
        if (e.key === 'ArrowLeft') prev.click();
        if (e.key === 'Escape') close.click();
      });

      lightboxEl.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target;

        if (target === prev) {
          if (i > 0) {
            image.src = larges[i - 1];
            i--;
          } else {
            image.src = larges[larges.length - 1];
            i = larges.length - 1;
          }
        } else if (target === next) {
          if (i < larges.length - 1) {
            image.src = larges[i + 1];
            i++;
          } else {
            image.src = larges[0];
            i = 0;
          }
        }

        description.textContent = descriptions[i];
        counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
      });
    }
  }]);

  return Lightbox;
}();

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getImages = exports.getImages = function getImages() {
  var d = document,
      c = console.log;

  var getImages = function getImages(container) {
    return [].concat(_toConsumableArray(container.querySelectorAll('img')));
  };

  var getLargeImages = function getLargeImages(gallery) {
    return gallery.map(function (el) {
      return el.src;
    });
  };

  var getDescriptions = function getDescriptions(gallery) {
    return gallery.map(function (el) {
      return el.alt;
    });
  };

  var OpenLightBoxEvent = function OpenLightBoxEvent(container, gallery, larges, descriptions) {
    container.addEventListener('click', function (e) {
      var el = e.target,
          i = gallery.indexOf(el);

      if (el.tagName === 'IMG') {
        openLightBox(gallery, i, larges, descriptions);
      }
    });
  };

  var openLightBox = function openLightBox(gallery, i, larges, descriptions) {
    var lightboxEl = d.createElement('div');

    var lightBoxContent = '\n        <div class="lightbox-overlay">\n          <figure class="lightbox-container">\n            <div class="close-modal"></div>\n            <img src="' + larges[i] + '" class="lightbox-image">\n            <figcaption>\n              <p class="lightbox-description">' + descriptions[i] + '</p>\n            <figcaption>\n            <nav class="class="lightbox-navigation"">\n              <a href="" class="lightbox-navigation__button prev"></a>\n              <span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + larges.length + ' </span>\n              <a href="" class="lightbox-navigation__button next"></a>\n            </nav>\n          </figure>\n        </div>\n      ';

    lightboxEl.innerHTML = lightBoxContent;

    lightboxEl.id = 'lightbox';

    d.body.appendChild(lightboxEl);

    closeModal(lightboxEl);

    navigateLightBox(lightboxEl, i, larges, descriptions);
  };

  var closeModal = function closeModal(modalEl) {
    var closeModal = modalEl.querySelector('.close-modal');

    closeModal.addEventListener('click', function (e) {
      e.preventDefault();
      d.body.removeChild(modalEl);
    });
  };

  var navigateLightBox = function navigateLightBox(lightboxEl, i, larges, descriptions) {
    var prev = lightboxEl.querySelector('.prev'),
        next = lightboxEl.querySelector('.next'),
        image = lightboxEl.querySelector('img'),
        description = lightboxEl.querySelector('p'),
        counter = lightboxEl.querySelector('span'),
        close = lightboxEl.querySelector('.close-modal');

    window.addEventListener('keyup', function (e) {
      if (e.key === 'ArrowRight') next.click();
      if (e.key === 'ArrowLeft') prev.click();
      if (e.key === 'Escape') close.click();
    });

    lightboxEl.addEventListener('click', function (e) {
      e.preventDefault();
      var target = e.target;

      if (target === prev) {
        if (i > 0) {
          image.src = larges[i - 1];
          i--;
        } else {
          image.src = larges[larges.length - 1];
          i = larges.length - 1;
        }
      } else if (target === next) {
        if (i < larges.length - 1) {
          image.src = larges[i + 1];
          i++;
        } else {
          image.src = larges[0];
          i = 0;
        }
      }

      description.textContent = descriptions[i];
      counter.textContent = 'Imagen ' + (i + 1) + ' de ' + larges.length;
    });
  };

  var lightbox = function lightbox(container) {
    var images = getImages(container),
        larges = getLargeImages(images),
        descriptions = getDescriptions(images);

    OpenLightBoxEvent(container, images, larges, descriptions);
  };

  lightbox(d.querySelector('.heroes-container'));
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnection = undefined;

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _gallery = require('./gallery');

var _galleryPoo = require('./gallery-poo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConnection = exports.getConnection = function getConnection() {
  var d = document,
      c = console.log,
      publicKey = 'c443fa04e8c144e8f8a0ffd67a580fe4',
      privateKey = '884764bc040025c43308aa4e9c3f8f508906f903',
      content = document.querySelector('section.heroes-container');

  var ts = Date.now(),
      hash = (0, _md2.default)(ts + privateKey + publicKey),
      URL = 'http://gateway.marvel.com/v1/public/characters?ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash,
      search = d.querySelector('.search');

  fetch(URL).then(function (res) {
    return res.json();
  }).then(function (res) {
    res.data.results.forEach(function (e) {
      drawHero(e);
    });
    (0, _gallery.getImages)();
    //const gallery = new Lightbox(document.querySelector('.heroes-container'))
  }).catch(function (err) {
    return console.log(err);
  });

  var drawHero = function drawHero(e) {
    var image = e.thumbnail.path + '/portrait_incredible.' + e.thumbnail.extension;

    var hero = '\n      <div class="hero">\n        <h3 class="hero-name">' + e.name + '</h3>\n        <img class="hero-image" src="' + image + '" alt="' + e.name + '">\n        <p class="hero-description">' + e.description + '</p>\n      </div>\n    ';

    content.insertAdjacentHTML('beforeEnd', hero);
  };
};

},{"./gallery":3,"./gallery-poo":2,"md5":8}],5:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],6:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],7:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],8:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":5,"crypt":6,"is-buffer":7}]},{},[1]);

//# sourceMappingURL=scripts.js.map
