// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../styles/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../scripts/screens/game/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;
var SQUARE_WIDTH = 24;
var SQUARE_BORDER_WIDTH = 3;
var PUZZLE_WIDTH = 10;
var PUZZLE_HEIGHT = 20;
var SIDEBAR_WIDTH = SQUARE_WIDTH * 6;
var WAR_ZONE_WIDTH = PUZZLE_WIDTH * SQUARE_WIDTH;
var Config = Object.freeze({
  SQUARE_WIDTH: SQUARE_WIDTH,
  SQUARE_BORDER_WIDTH: SQUARE_BORDER_WIDTH,
  PUZZLE_WIDTH: PUZZLE_WIDTH,
  PUZZLE_HEIGHT: PUZZLE_HEIGHT,
  SIDEBAR_WIDTH: SIDEBAR_WIDTH,
  WAR_ZONE_WIDTH: WAR_ZONE_WIDTH
});
exports.Config = Config;
},{}],"../scripts/GameConfig.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameConfig = void 0;

var _config = require("./screens/game/config");

var SIDEBAR_WIDTH = _config.Config.SIDEBAR_WIDTH,
    WAR_ZONE_WIDTH = _config.Config.WAR_ZONE_WIDTH,
    PUZZLE_HEIGHT = _config.Config.PUZZLE_HEIGHT,
    SQUARE_WIDTH = _config.Config.SQUARE_WIDTH;
var GameConfig = Object.freeze({
  CANVAS_WIDTH: SIDEBAR_WIDTH + WAR_ZONE_WIDTH,
  CANVAS_HEIGHT: PUZZLE_HEIGHT * SQUARE_WIDTH,
  DEBUG_GRAPHICS: false,
  ENABLE_LOG: true
});
exports.GameConfig = GameConfig;
},{"./screens/game/config":"../scripts/screens/game/config.ts"}],"../scripts/framework/Game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Game =
/** @class */
function () {
  function Game(_a) {
    var width = _a.width,
        height = _a.height,
        canvasID = _a.canvas,
        StartScreen = _a.screen;
    var canvas = document.querySelector(canvasID);
    Game.ctx = canvas.getContext("2d");
    Game.width = canvas.width = width;
    Game.height = canvas.height = height;
    Game.screen = new StartScreen();
    Game.loop();
  }

  Game.FRAME_RATE = 1000 / 60;
  Game.lastFrameTimeMs = 0;
  Game.running = true;
  Game.width = 0;
  Game.height = 0;

  Game.redraw = function () {
    var t = Date.now();
    var dt = t - Game.lastFrameTimeMs;

    if (Game.screen.update && typeof Game.screen.update === "function") {
      Game.screen.update(dt);
    }

    Game.screen.paint();
    Game.ctx.drawImage(Game.screen.paintCanvas(), 0, 0, Game.width, Game.height);
    Game.lastFrameTimeMs = Date.now();
    return Game.lastFrameTimeMs - t;
  };

  Game.loop = function () {
    if (!Game.running) {
      return;
    }

    var redrawDuration = Game.redraw();
    setTimeout(Game.loop, Math.max(0, Game.FRAME_RATE - redrawDuration));
  };

  return Game;
}();

exports.Game = Game;
},{}],"../scripts/framework/GraphicsPainter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphicsPainter = void 0;

var GraphicsPainter =
/** @class */
function () {
  function GraphicsPainter(_a) {
    var width = _a.width,
        height = _a.height;
    this.buffer = document.createElement("canvas");
    this.ctx = this.buffer.getContext("2d");
    this.buffer.width = this.width = width;
    this.buffer.height = this.height = height;
  }

  return GraphicsPainter;
}();

exports.GraphicsPainter = GraphicsPainter;
},{}],"../scripts/screens/game/Painter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Painter = void 0;

var _GraphicsPainter = require("../../framework/GraphicsPainter");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Painter =
/** @class */
function (_super) {
  __extends(Painter, _super);

  function Painter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Painter;
}(_GraphicsPainter.GraphicsPainter);

exports.Painter = Painter;
},{"../../framework/GraphicsPainter":"../scripts/framework/GraphicsPainter.ts"}],"../scripts/framework/GameScreen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameScreen = void 0;

var GameScreen =
/** @class */
function () {
  function GameScreen() {}

  GameScreen.prototype.paintCanvas = function () {
    this.paint();
    return this.painter.buffer;
  };

  return GameScreen;
}();

exports.GameScreen = GameScreen;
},{}],"../scripts/screens/game/colors.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapeColors = exports.UIColors = void 0;
var UIColors;
exports.UIColors = UIColors;

(function (UIColors) {
  UIColors["BACKGROUND"] = "#333333";
  UIColors["SIDEBAR_BACKGROUND"] = "#545454";
  UIColors["DEFAULT_SQUARE_COLOR"] = "#CC8081";
  UIColors["GUIDE"] = "#555555";
})(UIColors || (exports.UIColors = UIColors = {}));

var ShapeColors;
exports.ShapeColors = ShapeColors;

(function (ShapeColors) {
  ShapeColors["CYAN"] = "#6DECEE";
  ShapeColors["BLUE"] = "#0014E6";
  ShapeColors["ORANGE"] = "#E4A338";
  ShapeColors["YELLOW"] = "#F0EF4F";
  ShapeColors["GREEN"] = "#6EEB47";
  ShapeColors["PURPLE"] = "#9225E7";
  ShapeColors["RED"] = "#DC2F20";
})(ShapeColors || (exports.ShapeColors = ShapeColors = {}));
},{}],"../scripts/screens/game/playfield/Painter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Painter = void 0;

var _GraphicsPainter = require("../../../framework/GraphicsPainter");

var _colors = require("../colors");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Painter =
/** @class */
function (_super) {
  __extends(Painter, _super);

  function Painter() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.clear = function () {
      _this.ctx.fillStyle = _colors.UIColors.BACKGROUND;

      _this.ctx.fillRect(0, 0, _this.width, _this.height);
    };

    return _this;
  }

  Painter.prototype.paint = function () {
    this.ctx.fillStyle = _colors.ShapeColors.RED;
    this.ctx.beginPath();
    this.ctx.arc(10, 10, 5, 0, Math.PI * 2, false);
    this.ctx.fill();
  };

  return Painter;
}(_GraphicsPainter.GraphicsPainter);

exports.Painter = Painter;
},{"../../../framework/GraphicsPainter":"../scripts/framework/GraphicsPainter.ts","../colors":"../scripts/screens/game/colors.ts"}],"../scripts/screens/game/playfield/Screen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Screen = void 0;

var _GameScreen = require("../../../framework/GameScreen");

var _Painter = require("./Painter");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Screen =
/** @class */
function (_super) {
  __extends(Screen, _super);

  function Screen(width, height) {
    var _this = _super.call(this) || this;

    _this.paint = function () {
      _this.painter.clear();

      _this.painter.paint();
    };

    _this.painter = new _Painter.Painter({
      width: width,
      height: height
    });
    return _this;
  }

  return Screen;
}(_GameScreen.GameScreen);

exports.Screen = Screen;
},{"../../../framework/GameScreen":"../scripts/framework/GameScreen.ts","./Painter":"../scripts/screens/game/playfield/Painter.ts"}],"../scripts/screens/game/sidebar/Painter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Painter = void 0;

var _GraphicsPainter = require("../../../framework/GraphicsPainter");

var _colors = require("../colors");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Painter =
/** @class */
function (_super) {
  __extends(Painter, _super);

  function Painter() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.clear = function () {
      _this.ctx.fillStyle = _colors.UIColors.SIDEBAR_BACKGROUND;

      _this.ctx.fillRect(0, 0, _this.width, _this.height);
    };

    return _this;
  }

  Painter.prototype.paint = function () {
    this.ctx.fillStyle = _colors.ShapeColors.BLUE;
    this.ctx.beginPath();
    this.ctx.arc(10, 10, 5, 0, Math.PI * 2, false);
    this.ctx.fill();
  };

  return Painter;
}(_GraphicsPainter.GraphicsPainter);

exports.Painter = Painter;
},{"../../../framework/GraphicsPainter":"../scripts/framework/GraphicsPainter.ts","../colors":"../scripts/screens/game/colors.ts"}],"../scripts/screens/game/sidebar/Screen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Screen = void 0;

var _GameScreen = require("../../../framework/GameScreen");

var _Painter = require("./Painter");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var Screen =
/** @class */
function (_super) {
  __extends(Screen, _super);

  function Screen(width, height) {
    var _this = _super.call(this) || this;

    _this.paint = function () {
      _this.painter.clear();

      _this.painter.paint();
    };

    _this.painter = new _Painter.Painter({
      width: width,
      height: height
    });
    return _this;
  }

  return Screen;
}(_GameScreen.GameScreen);

exports.Screen = Screen;
},{"../../../framework/GameScreen":"../scripts/framework/GameScreen.ts","./Painter":"../scripts/screens/game/sidebar/Painter.ts"}],"../scripts/screens/game/Screen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Screen = void 0;

var _Painter = require("./Painter");

var _Game = require("../../framework/Game");

var _Screen = require("./playfield/Screen");

var _Screen2 = require("./sidebar/Screen");

var _config = require("./config");

var Screen =
/** @class */
function () {
  function Screen() {
    var _this = this;

    this.painter = new _Painter.Painter({
      width: _Game.Game.width,
      height: _Game.Game.height
    });
    this.playfield = new _Screen.Screen(_config.Config.WAR_ZONE_WIDTH, _Game.Game.height);
    this.sidebar = new _Screen2.Screen(_config.Config.SIDEBAR_WIDTH, _Game.Game.height);

    this.paint = function () {
      _this.playfield.paint();

      _this.sidebar.paint();
    };

    this.paintCanvas = function () {
      _this.paint();

      var playfieldBuffer = _this.playfield.painter.buffer;
      var sidebarBuffer = _this.sidebar.painter.buffer;

      _this.painter.ctx.drawImage(sidebarBuffer, 0, 0, _config.Config.SIDEBAR_WIDTH, _Game.Game.height);

      _this.painter.ctx.drawImage(playfieldBuffer, _config.Config.SIDEBAR_WIDTH, 0, _config.Config.WAR_ZONE_WIDTH, _Game.Game.height);

      return _this.painter.buffer;
    };
  }

  return Screen;
}();

exports.Screen = Screen;
},{"./Painter":"../scripts/screens/game/Painter.ts","../../framework/Game":"../scripts/framework/Game.ts","./playfield/Screen":"../scripts/screens/game/playfield/Screen.ts","./sidebar/Screen":"../scripts/screens/game/sidebar/Screen.ts","./config":"../scripts/screens/game/config.ts"}],"../scripts/index.ts":[function(require,module,exports) {
"use strict";

require("../styles/style.css");

var _GameConfig = require("./GameConfig");

var _Game = require("./framework/Game");

var _Screen = require("./screens/game/Screen");

var CANVAS_WIDTH = _GameConfig.GameConfig.CANVAS_WIDTH,
    CANVAS_HEIGHT = _GameConfig.GameConfig.CANVAS_HEIGHT;
var game = new _Game.Game({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  canvas: "#canvas",
  screen: _Screen.Screen
});
},{"../styles/style.css":"../styles/style.css","./GameConfig":"../scripts/GameConfig.ts","./framework/Game":"../scripts/framework/Game.ts","./screens/game/Screen":"../scripts/screens/game/Screen.ts"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58270" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../scripts/index.ts"], null)
//# sourceMappingURL=/scripts.09db7e4b.js.map