(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('near-api-js'), require('bn.js'), require('fs'), require('lodash-es'), require('mathjs'), require('big.js'), require('react'), require('@react-icons/all-files/fi/FiChevronDown'), require('@react-icons/all-files/fi/FiChevronLeft'), require('@react-icons/all-files/fi/FiChevronUp'), require('@react-icons/all-files/fa/FaSearch'), require('@react-icons/all-files/ri/RiRefreshLine'), require('@react-icons/all-files/ti/TiArrowSortedUp'), require('@react-icons/all-files/ti/TiArrowSortedDown'), require('@react-icons/all-files/hi/HiOutlineExternalLink'), require('@react-icons/all-files/ai/AiFillPushpin'), require('@react-icons/all-files/ai/AiOutlinePushpin'), require('@react-icons/all-files/ri/RiExchangeFill'), require('@react-icons/all-files/io5/IoWarning'), require('@react-icons/all-files/io5/IoCloseOutline'), require('@react-icons/all-files/ti/TiWarning'), require('@react-icons/all-files/cg/CgArrowsExchangeAltV')) :
  typeof define === 'function' && define.amd ? define(['exports', 'near-api-js', 'bn.js', 'fs', 'lodash-es', 'mathjs', 'big.js', 'react', '@react-icons/all-files/fi/FiChevronDown', '@react-icons/all-files/fi/FiChevronLeft', '@react-icons/all-files/fi/FiChevronUp', '@react-icons/all-files/fa/FaSearch', '@react-icons/all-files/ri/RiRefreshLine', '@react-icons/all-files/ti/TiArrowSortedUp', '@react-icons/all-files/ti/TiArrowSortedDown', '@react-icons/all-files/hi/HiOutlineExternalLink', '@react-icons/all-files/ai/AiFillPushpin', '@react-icons/all-files/ai/AiOutlinePushpin', '@react-icons/all-files/ri/RiExchangeFill', '@react-icons/all-files/io5/IoWarning', '@react-icons/all-files/io5/IoCloseOutline', '@react-icons/all-files/ti/TiWarning', '@react-icons/all-files/cg/CgArrowsExchangeAltV'], factory) :
  (global = global || self, factory(global['@ref-finance/ref-sdk'] = {}, global.nearApiJs, global.BN, global.fs, global._, global.math, global.Big, global.React, global.FiChevronDown, global.FiChevronLeft, global.FiChevronUp, global.FaSearch, global.RiRefreshLine, global.TiArrowSortedUp, global.TiArrowSortedDown, global.HiOutlineExternalLink, global.AiFillPushpin, global.AiOutlinePushpin, global.RiExchangeFill, global.IoWarning, global.IoCloseOutline, global.TiWarning, global.CgArrowsExchangeAltV));
}(this, (function (exports, nearApiJs, BN, fs, _, math, Big, React, FiChevronDown, FiChevronLeft, FiChevronUp, FaSearch, RiRefreshLine, TiArrowSortedUp, TiArrowSortedDown, HiOutlineExternalLink, AiFillPushpin, AiOutlinePushpin, RiExchangeFill, IoWarning, IoCloseOutline, TiWarning, CgArrowsExchangeAltV) { 'use strict';

  BN = BN && Object.prototype.hasOwnProperty.call(BN, 'default') ? BN['default'] : BN;
  fs = fs && Object.prototype.hasOwnProperty.call(fs, 'default') ? fs['default'] : fs;
  var ___default = 'default' in _ ? _['default'] : _;
  Big = Big && Object.prototype.hasOwnProperty.call(Big, 'default') ? Big['default'] : Big;
  var React__default = 'default' in React ? React['default'] : React;

  var FEE_DIVISOR = 10000;
  var STABLE_LP_TOKEN_DECIMALS = 18;
  var RATED_POOL_LP_TOKEN_DECIMALS = 24;
  var STORAGE_TO_REGISTER_WITH_MFT = '0.1';
  var ONE_YOCTO_NEAR = '0.000000000000000000000001';
  var ENV = '';
  var INDEXER_URL = '';
  var CONFIG = undefined;
  function getConfig(env, indexerUrl, custom_config) {
    if (env === void 0) {
      env = ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV;
    }
    if (indexerUrl === void 0) {
      indexerUrl = INDEXER_URL;
    }
    if (custom_config === void 0) {
      custom_config = CONFIG;
    }
    if (custom_config) {
      CONFIG = custom_config;
      return custom_config;
    }
    ENV = env;
    INDEXER_URL = indexerUrl;
    switch (env) {
      case 'mainnet':
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          walletUrl: 'https://wallet.near.org',
          WRAP_NEAR_CONTRACT_ID: 'wrap.near',
          REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
          REF_TOKEN_ID: 'token.v2.ref-finance.near',
          indexerUrl: indexerUrl || 'https://indexer.ref.finance',
          explorerUrl: 'https://testnet.nearblocks.io',
          REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-labs.near'
        };
      case 'testnet':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          indexerUrl: indexerUrl || 'https://testnet-indexer.ref-finance.com',
          WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
          REF_FI_CONTRACT_ID: 'ref-finance-101.testnet',
          REF_TOKEN_ID: 'ref.fakes.testnet',
          explorerUrl: 'https://testnet.nearblocks.io',
          REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-dev.testnet'
        };
      case 'dev':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          indexerUrl: indexerUrl || 'https://dev-indexer.ref-finance.com',
          WRAP_NEAR_CONTRACT_ID: 'wrap.testnet',
          REF_FI_CONTRACT_ID: 'exchange.ref-dev.testnet',
          REF_TOKEN_ID: 'ref.fakes.testnet',
          explorerUrl: 'https://testnet.nearblocks.io',
          REF_DCL_SWAP_CONTRACT_ID: 'refv2-dev.ref-dev.testnet'
        };
      default:
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          walletUrl: 'https://wallet.near.org',
          REF_FI_CONTRACT_ID: 'v2.ref-finance.near',
          WRAP_NEAR_CONTRACT_ID: 'wrap.near',
          REF_TOKEN_ID: 'token.v2.ref-finance.near',
          indexerUrl: indexerUrl || 'https://indexer.ref.finance',
          explorerUrl: 'https://nearblocks.io',
          REF_DCL_SWAP_CONTRACT_ID: 'dclv2.ref-labs.near'
        };
    }
  }
  exports.config = /*#__PURE__*/getConfig();
  exports.REF_FI_CONTRACT_ID = exports.config.REF_FI_CONTRACT_ID;
  exports.WRAP_NEAR_CONTRACT_ID = exports.config.WRAP_NEAR_CONTRACT_ID;
  exports.REF_TOKEN_ID = exports.config.REF_TOKEN_ID;
  exports.WNEAR_META_DATA = {
    id: exports.WRAP_NEAR_CONTRACT_ID,
    name: 'wNEAR',
    symbol: 'wNEAR',
    decimals: 24,
    icon: 'https://assets.ref.finance/images/w-NEAR-no-border.png'
  };
  exports.REF_META_DATA = {
    decimals: 18,
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
    id: exports.REF_TOKEN_ID,
    name: 'Ref Finance Token',
    symbol: 'REF'
  };
  var NEAR_META_DATA = {
    id: 'NEAR',
    name: 'NEAR',
    symbol: 'NEAR',
    decimals: 24,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2AAAANgCAIAAADF8JzzAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR4nO3d7VXb2rqw4eQd57/cgZ0KLCqwVwWIChAVYCrAqQBTgUUFERVEVBBTwTYdmArWO/by3uzMfBA+bHlK87r+nTP2WBFSjO/o8SN//Pvvvz8AAMB//T9nAgCA7wlEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAAC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ICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAICAQAQAICAQAQAICEQAAAICEQCAgEAEACAgEAEACAhEAAACAhEAgIBABAAgIBABAAgIRAAAAgIRAID/+fDhw/8H0I0VimXUJpsAAAAASUVORK5CYII='
  };
  var TokenLinks = {
    NEAR: 'https://awesomenear.com/near-protocol',
    wNEAR: 'https://awesomenear.com/near-protocol',
    REF: 'https://awesomenear.com/ref-finance',
    OCT: 'https://awesomenear.com/octopus-network',
    PARAS: 'https://awesomenear.com/paras',
    SKYWARD: 'https://awesomenear.com/skyward-finance',
    FLX: 'https://awesomenear.com/flux',
    PULSE: 'https://awesomenear.com/pulse',
    DBIO: 'https://awesomenear.com/debio-network',
    MYRIA: 'https://awesomenear.com/myriad-social',
    PXT: 'https://awesomenear.com/cryptoheroes',
    HAPI: 'https://awesomenear.com/hapi',
    OIN: 'https://awesomenear.com/oin-finance',
    ABR: 'https://awesomenear.com/allbridge',
    '1MIL': 'https://awesomenear.com/1millionnfts',
    MARMAJ: 'https://awesomenear.com/marmaj-foundation',
    marmaj: 'https://awesomenear.com/marmaj-foundation',
    USN: 'https://awesomenear.com/decentral-bank',
    '1INCH': 'https://awesomenear.com/1inch-network',
    GRT: 'https://awesomenear.com/the-graph',
    LINK: 'https://awesomenear.com/chainlink',
    Cheddar: 'https://awesomenear.com/cheddar-farm',
    AURORA: 'https://awesomenear.com/aurora-dev',
    $META: 'https://awesomenear.com/meta-pool',
    UMINT: 'https://awesomenear.com/youminter',
    UTO: 'https://awesomenear.com/secret-skellies-society',
    DEIP: 'https://awesomenear.com/deip',
    WOO: 'https://awesomenear.com/woo-dex',
    LINEAR: 'https://awesomenear.com/linear-protocol',
    PEM: 'https://awesomenear.com/pembrock-finance',
    ATO: 'https://awesomenear.com/atocha-protocol',
    SEAT: 'https://awesomenear.com/seatlab-nft',
    FAR: 'https://awesomenear.com/few-and-far',
    BSTN: 'https://awesomenear.com/bastion',
    BRRR: 'https://awesomenear.com/burrow',
    XNL: 'https://awesomenear.com/chronicle',
    KSW: 'https://awesomenear.com/killswitch-finance',
    STNEAR: 'https://awesomenear.com/meta-pool',
    NearX: 'https://awesomenear.com/stader',
    SD: 'https://awesomenear.com/stader',
    DISC: 'https://awesomenear.com/discovol'
  };
  var CONSTANT_D = 1.0001;
  var POINTLEFTRANGE = -800000;
  var POINTRIGHTRANGE = 800000;
  var switchEnv = function switchEnv() {
    exports.config = getConfig();
    exports.REF_FI_CONTRACT_ID = exports.config.REF_FI_CONTRACT_ID;
    exports.WRAP_NEAR_CONTRACT_ID = exports.config.WRAP_NEAR_CONTRACT_ID;
    exports.REF_TOKEN_ID = exports.config.REF_TOKEN_ID;
    exports.REF_META_DATA = {
      decimals: 18,
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
      id: exports.REF_TOKEN_ID,
      name: 'Ref Finance Token',
      symbol: 'REF'
    };
    exports.WNEAR_META_DATA = {
      id: exports.WRAP_NEAR_CONTRACT_ID,
      name: 'wNEAR',
      symbol: 'wNEAR',
      decimals: 24,
      icon: 'https://assets.ref.finance/images/w-NEAR-no-border.png'
    };
    return {
      config: exports.config,
      REF_FI_CONTRACT_ID: exports.REF_FI_CONTRACT_ID,
      WRAP_NEAR_CONTRACT_ID: exports.WRAP_NEAR_CONTRACT_ID,
      REF_TOKEN_ID: exports.REF_TOKEN_ID,
      REF_META_DATA: exports.REF_META_DATA,
      WNEAR_META_DATA: exports.WNEAR_META_DATA
    };
  };

  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return generator._invoke = function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state) throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg;;) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
              if ("suspendedStart" === state) throw state = "completed", context.arg;
              context.dispatchException(context.arg);
            } else "return" === context.method && context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
              return {
                value: record.arg,
                done: context.done
              };
            }
            "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      this._invoke = function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (object) {
      var keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var tradeFee = function tradeFee(amount, trade_fee) {
    return amount * trade_fee / FEE_DIVISOR;
  };
  var calc_d = function calc_d(amp, c_amounts) {
    var token_num = c_amounts.length;
    var sum_amounts = ___default.sum(c_amounts);
    var d_prev = 0;
    var d = sum_amounts;
    for (var i = 0; i < 256; i++) {
      var d_prod = d;
      for (var _iterator = _createForOfIteratorHelperLoose(c_amounts), _step; !(_step = _iterator()).done;) {
        var c_amount = _step.value;
        d_prod = d_prod * d / (c_amount * token_num);
      }
      d_prev = d;
      var ann = amp * Math.pow(token_num, token_num);
      var numerator = d_prev * (d_prod * token_num + ann * sum_amounts);
      var denominator = d_prev * (ann - 1) + d_prod * (token_num + 1);
      d = numerator / denominator;
      if (Math.abs(d - d_prev) <= 1) break;
    }
    return d;
  };
  var calc_y = function calc_y(amp, x_c_amount, current_c_amounts, index_x, index_y) {
    var token_num = current_c_amounts.length;
    var ann = amp * Math.pow(token_num, token_num);
    var d = calc_d(amp, current_c_amounts);
    var s = x_c_amount;
    var c = d * d / x_c_amount;
    for (var i = 0; i < token_num; i++) {
      if (i !== index_x && i !== index_y) {
        s += current_c_amounts[i];
        c = c * d / current_c_amounts[i];
      }
    }
    c = c * d / (ann * Math.pow(token_num, token_num));
    var b = d / ann + s;
    var y_prev = 0;
    var y = d;
    for (var _i = 0; _i < 256; _i++) {
      y_prev = y;
      var y_numerator = Math.pow(y, 2) + c;
      var y_denominator = 2 * y + b - d;
      y = y_numerator / y_denominator;
      if (Math.abs(y - y_prev) <= 1) break;
    }
    return y;
  };
  var calc_swap = function calc_swap(amp, in_token_idx, in_c_amount, out_token_idx, old_c_amounts, trade_fee) {
    var y = calc_y(amp, in_c_amount + old_c_amounts[in_token_idx], old_c_amounts, in_token_idx, out_token_idx);
    var dy = old_c_amounts[out_token_idx] - y;
    var fee = tradeFee(dy, trade_fee);
    var amount_swapped = dy - fee;
    return [amount_swapped, fee, dy];
  };
  var getSwappedAmount = function getSwappedAmount(tokenInId, tokenOutId, amountIn, stablePool, STABLE_LP_TOKEN_DECIMALS) {
    var amp = stablePool.amp;
    var trade_fee = stablePool.total_fee;
    // depended on pools
    var in_token_idx = stablePool.token_account_ids.findIndex(function (id) {
      return id === tokenInId;
    });
    var out_token_idx = stablePool.token_account_ids.findIndex(function (id) {
      return id === tokenOutId;
    });
    var rates = stablePool.rates.map(function (r) {
      return toReadableNumber(STABLE_LP_TOKEN_DECIMALS, r);
    });
    var base_old_c_amounts = stablePool.c_amounts.map(function (amount) {
      return toReadableNumber(STABLE_LP_TOKEN_DECIMALS, amount);
    });
    var old_c_amounts = base_old_c_amounts.map(function (amount, i) {
      return toNonDivisibleNumber(STABLE_LP_TOKEN_DECIMALS, scientificNotationToString(new Big(amount || 0).times(new Big(rates[i])).toString()));
    }).map(function (amount) {
      return Number(amount);
    });
    var in_c_amount = Number(toNonDivisibleNumber(STABLE_LP_TOKEN_DECIMALS, scientificNotationToString(new Big(amountIn).times(new Big(rates[in_token_idx])).toString())));
    var _calc_swap = calc_swap(amp, in_token_idx, in_c_amount, out_token_idx, old_c_amounts, trade_fee),
      amount_swapped = _calc_swap[0],
      fee = _calc_swap[1],
      dy = _calc_swap[2];
    return [amount_swapped / Number(rates[out_token_idx]), fee, dy / Number(rates[out_token_idx])];
  };

  var REF_WIDGET_STAR_TOKEN_LIST_KEY = 'REF_WIDGET_STAR_TOKEN_LIST_VALUE';
  var REF_WIDGET_ALL_TOKENS_LIST_KEY = 'REF_WIDGET_ALL_TOKENS_LIST_VALUE';
  var REF_WIDGET_ALL_LIGHT_TOKENS_LIST_KEY = 'REF_WIDGET_ALL_LIGHT_TOKENS_LIST_VALUE';
  var REF_WIDGET_SWAP_IN_KEY = 'REF_WIDGET_SWAP_IN_VALUE';
  var REF_WIDGET_SWAP_OUT_KEY = 'REF_WIDGET_SWAP_OUT_VALUE';
  var REF_WIDGET_SWAP_DETAIL_KEY = 'REF_WIDGET_SWAP_DETAIL_VALUE';
  var DEFAULT_START_TOKEN_LIST_TESTNET = ['wrap.testnet', 'usdtt.fakes.testnet', 'usdt.fakes.testnet', 'ref.fakes.testnet', 'usdn.testnet', 'eth.fakes.testnet'];
  var DEFAULT_START_TOKEN_LIST_MAINNET = ['wrap.near', 'usdt.tether-token.near', 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near', 'token.v2.ref-finance.near', 'usn', 'aurora', 'token.sweat'];
  var defaultTheme = {
    container: '#FFFFFF',
    buttonBg: '#00C6A2',
    primary: '#000000',
    secondary: '#7E8A93',
    borderRadius: '4px',
    fontFamily: 'sans-serif',
    hover: 'rgba(126, 138, 147, 0.2)',
    active: 'rgba(126, 138, 147, 0.2)',
    secondaryBg: '#F7F7F7',
    borderColor: 'rgba(126, 138, 147, 0.2)',
    iconDefault: 'rgba(126, 138, 147, 1)',
    iconHover: 'rgba(62, 62, 62, 1)'
  };
  var defaultDarkModeTheme = {
    container: '#26343E',
    buttonBg: '#00C6A2',
    primary: '#FFFFFF',
    secondary: '#7E8A93',
    borderRadius: '4px',
    fontFamily: 'sans-serif',
    hover: 'rgba(126, 138, 147, 0.2)',
    active: 'rgba(126, 138, 147, 0.2)',
    secondaryBg: 'rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(126, 138, 147, 0.2)',
    iconDefault: 'rgba(126, 138, 147, 1)',
    iconHover: 'rgba(183, 201, 214, 1)',
    refIcon: 'white'
  };

  var icons = {
    '4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near': 'https://assets.ref.finance/images/woo-wtrue.png',
    'wrap.near': 'data:image/png;base64,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',
    'wrap.testnet': 'data:image/png;base64,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',
    '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near': 'https://assets.ref.finance/images/4943.png',
    'berryclub.ek.near': 'https://assets.ref.finance/images/banana.png',
    'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near': 'https://assets.ref.finance/images/825.png',
    '1f9840a85d5af5bf1d1762f925bdaddc4201f984.factory.bridge.near': 'https://assets.ref.finance/images/7083.png',
    '514910771af9ca656af840dff83e8264ecf986ca.factory.bridge.near': 'https://assets.ref.finance/images/1975.png',
    'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near': 'https://assets.ref.finance/images/3408.png',
    '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near': 'https://assets.ref.finance/images/3717.png',
    '7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.factory.bridge.near': 'https://assets.ref.finance/images/7278.png',
    'a0b73e1ff0b80914ab6fe0444e65848c4c34450b.factory.bridge.near': 'https://assets.ref.finance/images/3635.png',
    '50d1c9771902476076ecfc8b2a83ad6b9355a4c9.factory.bridge.near': 'https://assets.ref.finance/images/4195.png',
    '4fabb145d64652a948d72533023f6e7a623c7c53.factory.bridge.near': 'https://assets.ref.finance/images/4687.png',
    '6f259637dcd74c767781e37bc6133cd6a68aa161.factory.bridge.near': 'https://assets.ref.finance/images/2502.png',
    '6b3595068778dd592e39a122f4f5a5cf09c90fe2.factory.bridge.near': 'https://assets.ref.finance/images/6758.png',
    'c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.factory.bridge.near': 'https://assets.ref.finance/images/2586.png',
    'c944e90c64b2c07662a292be6244bdf05cda44a7.factory.bridge.near': 'https://assets.ref.finance/images/6719.png',
    '9f8f72aa9304c8b593d555f12ef6589cc3a579a2.factory.bridge.near': 'https://assets.ref.finance/images/1518.png',
    '0bc529c00c6401aef6d220be8c6ea1667f6ad93e.factory.bridge.near': 'https://assets.ref.finance/images/5864.png',
    'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near': 'https://assets.ref.finance/images/2396.png',
    '0316eb71485b0ab14103307bf65a021042c6d380.factory.bridge.near': 'https://assets.ref.finance/images/6941.png',
    '111111111117dc0aa78b770fa6a738034120c302.factory.bridge.near': 'https://assets.ref.finance/images/8104.png',
    'f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near': 'https://assets.ref.finance/images/55sGoBm.png',
    'de30da39c46104798bb5aa3fe8b9e0e1f348163f.factory.bridge.near': 'https://assets.ref.finance/images/10052.png',
    'a4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016.factory.bridge.near': 'https://assets.ref.finance/images/4222.png',
    'token.cheddar.near': 'https://assets.ref.finance/images/cheddar.png',
    'farm.berryclub.ek.near': 'https://assets.ref.finance/images/cucumber.png',
    'd9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near': 'https://assets.ref.finance/images/HAPI.png'
  };

  var getTokenPriceList = /*#__PURE__*/function () {
    var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(exports.config.indexerUrl + '/list-token-price', {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                }
              }).then(function (res) {
                return res.json();
              }).then(function (list) {
                return list;
              });
            case 2:
              return _context.abrupt("return", _context.sent);
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getTokenPriceList() {
      return _ref.apply(this, arguments);
    };
  }();
  var getTokens = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(reload) {
      var storagedTokens;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              storagedTokens = typeof window !== 'undefined' && !reload ? localStorage.getItem(REF_WIDGET_ALL_TOKENS_LIST_KEY) : null;
              if (!storagedTokens) {
                _context2.next = 5;
                break;
              }
              _context2.t0 = JSON.parse(storagedTokens);
              _context2.next = 8;
              break;
            case 5:
              _context2.next = 7;
              return fetch(exports.config.indexerUrl + '/list-token', {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                }
              }).then(function (res) {
                return res.json();
              }).then(function (tokens) {
                var newTokens = Object.values(tokens).reduce(function (acc, cur, i) {
                  var _extends2;
                  var id = Object.keys(tokens)[i];
                  return _extends({}, acc, (_extends2 = {}, _extends2[id] = _extends({}, cur, {
                    id: id,
                    icon: !cur.icon || REPLACE_TOKENS.includes(id) ? icons[id] : cur.icon
                  }), _extends2));
                }, {});
                return newTokens;
              }).then(function (res) {
                typeof window !== 'undefined' && !reload && localStorage.setItem(REF_WIDGET_ALL_TOKENS_LIST_KEY, JSON.stringify(res));
                return res;
              });
            case 7:
              _context2.t0 = _context2.sent;
            case 8:
              return _context2.abrupt("return", _context2.t0);
            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function getTokens(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getTokensTiny = /*#__PURE__*/function () {
    var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(reload) {
      var storagedTokens;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              storagedTokens = typeof window !== 'undefined' && !reload ? localStorage.getItem(REF_WIDGET_ALL_LIGHT_TOKENS_LIST_KEY) : null;
              if (!storagedTokens) {
                _context3.next = 5;
                break;
              }
              _context3.t0 = JSON.parse(storagedTokens);
              _context3.next = 8;
              break;
            case 5:
              _context3.next = 7;
              return fetch(exports.config.indexerUrl + '/list-token-v2', {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                }
              }).then(function (res) {
                return res.json();
              }).then(function (tokens) {
                var newTokens = Object.values(tokens).reduce(function (acc, cur, i) {
                  var _extends3;
                  var id = Object.keys(tokens)[i];
                  return _extends({}, acc, (_extends3 = {}, _extends3[id] = _extends({}, cur, {
                    id: id
                  }), _extends3));
                }, {});
                return newTokens;
              }).then(function (res) {
                typeof window !== 'undefined' && !reload && localStorage.setItem(REF_WIDGET_ALL_LIGHT_TOKENS_LIST_KEY, JSON.stringify(res));
                return res;
              });
            case 7:
              _context3.t0 = _context3.sent;
            case 8:
              return _context3.abrupt("return", _context3.t0);
            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function getTokensTiny(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var getWhiteListTokensIndexer = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(whiteListIds) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return fetch(exports.config.indexerUrl + '/list-token', {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json; charset=UTF-8'
                }
              }).then(function (res) {
                return res.json();
              }).then(function (res) {
                return whiteListIds.reduce(function (acc, cur, i) {
                  var _extends4;
                  if (!res[cur] || !Object.values(res[cur]) || Object.values(res[cur]).length === 0) return acc;
                  return _extends({}, acc, (_extends4 = {}, _extends4[cur] = _extends({}, res[cur], {
                    id: cur
                  }), _extends4));
                }, {});
              }).then(function (res) {
                return Object.values(res);
              });
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return function getWhiteListTokensIndexer(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  //@ts-nocheck
  Big.RM = 0;
  Big.DP = 40;
  Big.NE = -40;
  Big.PE = 40;
  function checkIntegerSumOfAllocations(allocations, totalInput) {
    var totalInput = new Big(totalInput);
    var allocations = allocations.map(function (item) {
      return new Big(item).round();
    });
    var alloSum = allocations.map(function (item) {
      return new Big(item);
    }).reduce(function (a, b) {
      return a.plus(b);
    }, new Big(0));
    var offset = totalInput.minus(alloSum);
    //get largest allocation.
    var currMax = new Big(0);
    var currMaxInd = 0;
    for (var i = 0; i < allocations.length; i++) {
      if (allocations[i].gt(currMax)) {
        currMaxInd = i;
        currMax = allocations[i];
      }
    }
    var newAllocations = [];
    for (var j = 0; j < allocations.length; j++) {
      if (j === currMaxInd) {
        newAllocations.push(allocations[j].plus(offset).toString());
      } else {
        newAllocations.push(allocations[j].toString());
      }
    }
    return newAllocations;
  }

  var _marked5 = /*#__PURE__*/_regeneratorRuntime().mark(yenFromPy);
  Big.RM = 0;
  Big.DP = 40;
  Big.NE = -40;
  Big.PE = 40;
  function bisqrt(value) {
    // For some ridiculous reason, the .sqrt() method for Big decimals is extremely slow (~10-20ms),
    // which isn't so bad until you need to use it a bunch of times.
    // Since we're dealing with super large numbers anyway, we can convert the Big decimal number into a BigInt,
    // then run this BigInt Newton iteration square root function instead, and then convert back into a
    // Big number. And it speeds up the operation by a crazy factor, ~10x faster.
    if (value < BigInt(0)) {
      throw 'square root of negative numbers is not supported';
    }
    if (value < BigInt(2)) {
      return value;
    }
    function newtonIteration(n, x0) {
      var x1 = n / x0 + x0 >> BigInt(1);
      if (x0 === x1 || x0 === x1 - BigInt(1)) {
        return x0;
      }
      return newtonIteration(n, x1);
    }
    return newtonIteration(value, BigInt(1));
  }
  function getBetaForRoute(route, path) {
    if (!route.length) {
      route = [route];
    }
    if (route.length == 1) {
      var p = route[0];
      var beta = new Big(p.reserves[path[0]]);
    } else if (route.length == 2) {
      var p1 = route[0];
      var p2 = route[1];
      var beta = new Big(p1.reserves[path[0]]).times(new Big(p2.reserves[path[1]]));
    }
    return beta;
  }
  function getEpsilonForRoute(route, path) {
    if (!route.length) {
      route = [route];
    }
    if (route.length == 1) {
      // Single Hop case
      var p = route[0];
      var gamma = new Big(10000).minus(new Big(p.fee)).div(new Big(10000));
      var epsilon = Big(gamma);
    } else if (route.length == 2) {
      //Double Hop Case
      var p1 = route[0];
      var p2 = route[1];
      var gamma1 = new Big(10000).minus(new Big(p1.fee)).div(new Big(10000));
      var gamma2 = new Big(10000).minus(new Big(p2.fee)).div(Big(10000));
      var epsilon = new Big(p2.reserves[path[1]]).times(new Big(gamma1)).plus(new Big(p1.reserves[path[1]]).times(gamma1).times(gamma2));
    }
    return epsilon;
  }
  function getAlphaForRoute(route, path) {
    if (!route.length) {
      route = [route];
    }
    if (route.length == 1) {
      var _p$reserves;
      //console.log('single hop')
      var p = route[0];
      var inputToken = path[0];
      var outputToken = path[1];
      var gamma = new Big(10000).minus(new Big(p.fee)).div(new Big(10000));
      var key1 = p.token1Id;
      var key2 = p.token2Id;
      var val1 = p.token1Supply;
      var val2 = p.token2Supply;
      p['reserves'] = (_p$reserves = {}, _p$reserves[key1] = val1, _p$reserves[key2] = val2, _p$reserves);
      var alpha = new Big(p.reserves[inputToken]).times(new Big(p.reserves[outputToken]).times(new Big(gamma)));
    } else if (route.length == 2) {
      var _p1$reserves, _p2$reserves;
      //console.log('double hop')
      var p1 = route[0];
      var p2 = route[1];
      var key11 = p1.token1Id;
      var key12 = p1.token2Id;
      var val11 = p1.token1Supply;
      var val12 = p1.token2Supply;
      p1['reserves'] = (_p1$reserves = {}, _p1$reserves[key11] = val11, _p1$reserves[key12] = val12, _p1$reserves);
      var key21 = p2.token1Id;
      var key22 = p2.token2Id;
      var val21 = p2.token1Supply;
      var val22 = p2.token2Supply;
      p2['reserves'] = (_p2$reserves = {}, _p2$reserves[key21] = val21, _p2$reserves[key22] = val22, _p2$reserves);
      var _inputToken = path[0];
      var middleToken = path[1];
      var _outputToken = path[2];
      var gamma1 = new Big(10000).minus(Big(p1.fee)).div(new Big(10000));
      var gamma2 = new Big(10000).minus(new Big(p2.fee)).div(new Big(10000));
      var alpha1 = new Big(p1.reserves[_inputToken]).times(new Big(p1.reserves[middleToken])).times(gamma1);
      var alpha2 = new Big(p2.reserves[middleToken]).times(new Big(p2.reserves[_outputToken])).times(gamma2);
      var alpha = alpha1.times(alpha2);
    }
    return alpha;
  }
  function getAlphaSumFromRoutes(routes, nodeRoutes) {
    var alphaSum = new Big(0);
    for (var i in routes) {
      var route = routes[i];
      var nodeRoute = nodeRoutes[i];
      var alpha = getAlphaForRoute(route, nodeRoute);
      // console.log('alpha is...');
      // console.log(alpha.toString());
      // below, we are replacing the built-in Big sqrt() method with a
      // newton-iteration BigInt sqrt function, to speed it up by 10x.
      var radical = new Big(bisqrt(BigInt(new Big(alpha).round().toFixed())));
      // let radical = new Big(alpha).sqrt();
      var epsilon = getEpsilonForRoute(route, nodeRoute);
      var denom = new Big(epsilon);
      alphaSum = alphaSum.plus(radical.div(denom));
    }
    return alphaSum;
  }
  function getBetaSumFromRoutes(routes, nodeRoutes) {
    var betaSum = new Big(0);
    for (var i in routes) {
      var route = routes[i];
      var nodeRoute = nodeRoutes[i];
      var num = new Big(getBetaForRoute(route, nodeRoute));
      var denom = new Big(getEpsilonForRoute(route, nodeRoute));
      betaSum = betaSum.plus(num.div(denom));
    }
    return betaSum;
  }
  function getPhiFromRoutes(routes, nodeRoutes, totalInput) {
    var alphaSum = getAlphaSumFromRoutes(routes, nodeRoutes);
    var betaSum = getBetaSumFromRoutes(routes, nodeRoutes);
    var phi = new Big(totalInput).plus(betaSum).div(alphaSum);
    return phi;
  }
  function getAllocationForRoute(phi, route, path) {
    var alpha = getAlphaForRoute(route, path);
    var beta = getBetaForRoute(route, path);
    var epsilon = getEpsilonForRoute(route, path);
    // below, we are replacing the built-in Big sqrt() method with a
    // newton-iteration BigInt sqrt function, to speed it up by 10x.
    var allocation = new Big(phi).abs().times(new Big(bisqrt(BigInt(new Big(alpha).round().toFixed())))).minus(beta).div(epsilon);
    return allocation;
  }
  function getAllocationVectorForRoutes(phi, routes, nodeRoutes) {
    var allocationVec = [];
    for (var i in routes) {
      allocationVec.push(getAllocationForRoute(phi, routes[i], nodeRoutes[i]));
    }
    return allocationVec;
  }
  function getOptimalAllocationForRoutes(routes, nodeRoutes, totalInput) {
    // console.log("CALLING GET OPTIMAL ALLOCATION FOR ROUTES:")
    // console.log(routes)
    var totalInput = new Big(totalInput);
    var phi = getPhiFromRoutes(routes, nodeRoutes, totalInput);
    // console.log('PHI CALCULATED TO BE...')
    // console.log(phi.toString())
    var allocations = getAllocationVectorForRoutes(phi, routes, nodeRoutes);
    if (allocations.every(function (item) {
      return item.lt(new Big(0));
    })) {
      allocations = allocations.map(function (item) {
        return item.times(new Big(-1.0));
      });
    }
    if (allocations.some(function (item) {
      return item.lt(new Big(0));
    })) {
      allocations = reduceRoutes(routes, nodeRoutes, allocations, totalInput);
    }
    var sumAllocations = allocations.reduce(function (a, b) {
      return a.plus(b);
    }, new Big(0));
    var normalizedAllocations = allocations.map(function (a) {
      return a.div(sumAllocations).times(new Big(totalInput));
    });
    return normalizedAllocations;
  }
  function reduceRoutes(routes, nodeRoutes, allocationVec, totalInput) {
    // console.log("RUNNING REDUCE ROUTES")
    var totalInput = new Big(totalInput);
    var goodIndices = [];
    for (var i in allocationVec) {
      var dx = allocationVec[i];
      // console.log('DX IS...')
      // console.log(dx.toString())
      if (dx.gt(new Big(0))) {
        goodIndices.push(i);
      }
    }
    // console.log('GOOD INDICES ARE...');
    // console.log(goodIndices);
    var newRoutes = [];
    var newNodeRoutes = [];
    for (var i in goodIndices) {
      var goodIndex = goodIndices[i];
      newRoutes.push(routes[goodIndex]);
      newNodeRoutes.push(nodeRoutes[goodIndex]);
    }
    allocationVec = getOptimalAllocationForRoutes(newRoutes, newNodeRoutes, totalInput);
    var allocationDict = {};
    for (var i in goodIndices) {
      allocationDict[goodIndices[i]] = allocationVec[i];
    }
    var allocationVecNew = [];
    for (var i in routes) {
      if (goodIndices.includes(i)) {
        allocationVecNew.push(allocationDict[i]);
      } else {
        var zeroAllocation = new Big(0);
        allocationVecNew.push(zeroAllocation);
      }
    }
    return allocationVecNew;
  }
  function getNodeRoutesFromPathsAndPoolChains(paths, poolChains) {
    var multiplicity = [];
    for (var i in poolChains) {
      var pc = poolChains[i];
      var mul = pc.map(function (item) {
        return item.length;
      }).reduce(function (elem1, elem2) {
        return elem1 * elem2;
      }, 1);
      multiplicity.push(mul);
    }
    var nodeRoutes = [];
    for (var j in paths) {
      var path = paths[j];
      var m = multiplicity[j];
      for (var k = 0; k < m; k++) {
        nodeRoutes.push(path);
      }
    }
    return nodeRoutes;
  }
  function getPoolChainFromPaths(paths, pools, threshold) {
    if (threshold === void 0) {
      threshold = 0.001;
    }
    var poolChains = [];
    for (var pathInd in paths) {
      var path = paths[pathInd];
      var chain = [];
      var pairs = [];
      for (var i = 0; i < path.length - 1; i++) {
        pairs.push([path[i], path[i + 1]]);
      }
      for (var pairInd in pairs) {
        var pair = pairs[pairInd];
        // console.log(pair);
        var tokenPools = getPoolsByToken1ANDToken2(pools, pair[0], pair[1]);
        chain.push(tokenPools);
      }
      poolChains.push(chain);
    }
    // return poolChains;
    var culledPoolChains = getCulledPoolChains(poolChains, threshold);
    return culledPoolChains;
  }
  function getCulledPoolChains(poolChains, threshold) {
    if (threshold === void 0) {
      threshold = 0.001;
    }
    var newChains = [];
    for (var pathInd in poolChains) {
      var path = poolChains[pathInd];
      var newPath = [];
      for (var legInd in path) {
        var leg = path[legInd];
        var culledPath = cullPoolsWithInsufficientLiquidity(leg, threshold);
        newPath.push(culledPath);
      }
      newChains.push(newPath);
    }
    return newChains;
  }
  function getRoutesFromPoolChain(poolChains) {
    var routes = [];
    for (var pci in poolChains) {
      var poolChain = poolChains[pci];
      //get cartesian product of each pool chain to get the list of routes.
      var newRoutes = cartesianProduct(poolChain);
      routes.push.apply(routes, newRoutes);
    }
    for (var i in routes) {
      if (!routes[i].length) {
        routes[i] = [routes[i]];
      }
    }
    return routes;
  }
  function getOutputSingleHop(pool, inputToken, outputToken, totalInput) {
    var totalInput = new Big(totalInput);
    // check if pool is forward or backward for inputToken/outputToken cf. token1Id/token2Id
    if (inputToken === pool.token1Id && outputToken === pool.token2Id) {
      var _reserves;
      // forward Pool
      var reserves = (_reserves = {}, _reserves[inputToken] = new Big(pool.token1Supply), _reserves[outputToken] = new Big(pool.token2Supply), _reserves);
    } else if (inputToken === pool.token2Id && outputToken === pool.token1Id) {
      var _reserves2;
      // reverse pool
      var reserves = (_reserves2 = {}, _reserves2[outputToken] = new Big(pool.token1Supply), _reserves2[inputToken] = new Big(pool.token2Supply), _reserves2);
    } else {
      return new Big(0);
    }
    var gamma = new Big(10000).minus(new Big(pool.fee)).div(new Big(10000));
    // console.log(totalInput)
    // console.log(gamma)
    // console.log(reserves)
    var num = totalInput.times(gamma).times(reserves[outputToken]);
    var denom = reserves[inputToken].plus(gamma.times(totalInput));
    return num.div(denom);
  }
  function getOutputDoubleHop(pools, inputToken, middleToken, outputToken, totalInput) {
    var totalInput = new Big(totalInput);
    for (var poolIndex in pools) {
      var p = pools[poolIndex];
      p['gamma'] = new Big(10000).minus(new Big(p.fee)).div(new Big(10000));
    }
    var p1 = pools[0];
    var p2 = pools[1];
    if (inputToken === p1.token1Id && middleToken === p1.token2Id) {
      var _p1$reserves2;
      // forward Pool
      p1['reserves'] = (_p1$reserves2 = {}, _p1$reserves2[inputToken] = new Big(p1.token1Supply), _p1$reserves2[middleToken] = new Big(p1.token2Supply), _p1$reserves2);
    } else if (middleToken === p1.token1Id && inputToken === p1.token2Id) {
      var _p1$reserves3;
      //reverse pool
      p1['reserves'] = (_p1$reserves3 = {}, _p1$reserves3[middleToken] = new Big(p1.token1Supply), _p1$reserves3[inputToken] = new Big(p1.token2Supply), _p1$reserves3);
    }
    if (middleToken === p2.token1Id && outputToken === p2.token2Id) {
      var _p2$reserves2;
      // forward Pool
      p2['reserves'] = (_p2$reserves2 = {}, _p2$reserves2[middleToken] = new Big(p2.token1Supply), _p2$reserves2[outputToken] = new Big(p2.token2Supply), _p2$reserves2);
    } else if (outputToken === p2.token1Id && middleToken === p2.token2Id) {
      var _p2$reserves3;
      //reverse pool
      p2['reserves'] = (_p2$reserves3 = {}, _p2$reserves3[outputToken] = new Big(p2.token1Supply), _p2$reserves3[middleToken] = new Big(p2.token2Supply), _p2$reserves3);
    }
    var c1 = new Big(p1.reserves[middleToken]);
    var a1 = new Big(p1.reserves[inputToken]);
    var c2 = new Big(p2.reserves[middleToken]);
    var b2 = new Big(p2.reserves[outputToken]);
    var gamma1 = p1.gamma;
    var gamma2 = p2.gamma;
    var num = totalInput.times(c1).times(b2).times(gamma1).times(gamma2);
    var denom = c2.times(a1).plus(totalInput.times(c2.times(gamma1).plus(c1.times(gamma1).times(gamma2))));
    // denom = c2*a1 + totalInput * (c2*gamma1 + c1*gamma1*gamma2)

    return num.div(denom);
  }
  function getOutputFromRoute(route, nodeRoute, allocation) {
    if (new Big(allocation).eq(new Big(0))) {
      return new Big(0);
    } else {
      var allocation = new Big(allocation);
    }
    if (!route.length) {
      route = [route];
    }
    if (route.length == 1) {
      // single hop
      var inputToken = nodeRoute[0];
      var outputToken = nodeRoute[1];
      var pool = route[0];
      var output = getOutputSingleHop(pool, inputToken, outputToken, allocation);
    } else if (route.length == 2) {
      // DOUBLE HOP
      var _inputToken2 = nodeRoute[0];
      var middleToken = nodeRoute[1];
      var _outputToken2 = nodeRoute[2];
      var pools = route;
      var output = getOutputDoubleHop(pools, _inputToken2, middleToken, _outputToken2, allocation);
    }
    return output;
  }
  function getOptOutputVec(routes, nodeRoutes, totalInput) {
    var allocations = getOptimalAllocationForRoutes(routes, nodeRoutes, totalInput);
    var result = [];
    for (var i in routes) {
      var route = routes[i];
      var nodeRoute = nodeRoutes[i];
      var allocation = allocations[i];
      var output = getOutputFromRoute(route, nodeRoute, allocation);
      result.push(output);
    }
    return {
      result: result,
      allocations: allocations
    };
    //NOTE -- I made this return an object instead of the tuple returned in python. need to check the places it is called, and specify
    // result field instead of tuple 0 position, and allocations field instead of tuple 1 position.
  }
  function getBestOptInputAndOutput(routes, nodeRoutes, totalInput) {
    // let refDict = getOptOutputVecRefined(routes, nodeRoutes, totalInput);
    // let outputRefined = refDict.result;
    // let inputRefined = refDict.allocations;
    // inputRefined = checkIntegerSumOfAllocations(inputRefined, totalInput);
    var rawDict = getOptOutputVec(routes, nodeRoutes, totalInput);
    var outputRaw = rawDict.result;
    var inputRaw = rawDict.allocations;
    inputRaw = checkIntegerSumOfAllocations(inputRaw, totalInput);
    var res1 = new Big(0);
    var res2 = new Big(0);
    var res = outputRaw.map(function (v) {
      return new Big(v);
    }).reduce(function (bv1, bv2) {
      return bv1.plus(bv2);
    }, new Big(0));
    return {
      input: inputRaw,
      output: res
    };
  }
  function getBestOptimalAllocationsAndOutputs(_x, _x2, _x3, _x4, _x5, _x6) {
    return _getBestOptimalAllocationsAndOutputs.apply(this, arguments);
  }
  function _getBestOptimalAllocationsAndOutputs() {
    _getBestOptimalAllocationsAndOutputs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(pools, inputToken, outputToken, totalInput, maxPathLength, threshold) {
      return _regeneratorRuntime().wrap(function _callee2$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (maxPathLength === void 0) {
                maxPathLength = 3;
              }
              if (threshold === void 0) {
                threshold = 0.001;
              }
              return _context7.abrupt("return", function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(totalInput) {
                  var paths, poolChains, routes, nodeRoutes, inputOutput, allocations, outputs;
                  return _regeneratorRuntime().wrap(function _callee$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          totalInput = new Big(totalInput);
                          _context6.next = 3;
                          return getPathsFromPools(pools, inputToken, outputToken, maxPathLength);
                        case 3:
                          paths = _context6.sent;
                          if (paths.length) {
                            _context6.next = 6;
                            break;
                          }
                          return _context6.abrupt("return", {
                            allocations: [],
                            outputs: new Big(0),
                            routes: [],
                            nodeRoutes: []
                          });
                        case 6:
                          _context6.next = 8;
                          return getPoolChainFromPaths(paths, pools, threshold);
                        case 8:
                          poolChains = _context6.sent;
                          _context6.next = 11;
                          return getRoutesFromPoolChain(poolChains);
                        case 11:
                          routes = _context6.sent;
                          _context6.next = 14;
                          return getNodeRoutesFromPathsAndPoolChains(paths, poolChains);
                        case 14:
                          nodeRoutes = _context6.sent;
                          _context6.next = 17;
                          return getBestOptInputAndOutput(routes, nodeRoutes, totalInput);
                        case 17:
                          inputOutput = _context6.sent;
                          allocations = inputOutput.input;
                          outputs = inputOutput.output;
                          return _context6.abrupt("return", {
                            allocations: allocations,
                            outputs: outputs,
                            routes: routes,
                            nodeRoutes: nodeRoutes
                          });
                        case 21:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee);
                }));
                return function (_x33) {
                  return _ref.apply(this, arguments);
                };
              }()(totalInput));
            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee2);
    }));
    return _getBestOptimalAllocationsAndOutputs.apply(this, arguments);
  }
  function getHopActionsFromRoutes(routes, nodeRoutes, allocations) {
    // console.log('INSIDE GET HOP ACTIONS FROM ROUTES');
    // console.log('ROUTES ARE...');
    // console.log(routes);
    // console.log('NODE ROUTES ARE...');
    // console.log(nodeRoutes);
    // console.log('ALLOCATIONS ARE...');
    // console.log(allocations);
    var totalInput = allocations.map(function (a) {
      return new Big(a);
    }).reduce(function (a, b) {
      return a.plus(b);
    }, new Big(0)).toString();
    var hops = [];
    for (var i in routes) {
      var route = routes[i];
      var nodeRoute = nodeRoutes[i];
      var allocation = allocations[i];
      if (new Big(allocation).eq(new Big(0))) {
        continue;
      }
      if (!route.length) {
        route = [route];
      }
      if (!route[0]) {
        continue;
      }
      for (var j in route) {
        var pool = route[j];
        // console.log('J IS...');
        // console.log(j);
        // console.log('NODE ROUTE IS...');
        // console.log(nodeRoute);
        if (j == 0) {
          //first hop.
          // console.log(nodeRoute[0]);
          // console.log(nodeRoute[1]);
          var hop = {
            pool: pool,
            allocation: allocation.toString(),
            inputToken: nodeRoute[0],
            outputToken: nodeRoute[1],
            nodeRoute: nodeRoute,
            route: route,
            allRoutes: routes,
            allNodeRoutes: nodeRoutes,
            totalInputAmount: totalInput,
            allAllocations: allocations
          };
          // console.log('FIRST HOP IS...');
          // console.log(hop);
          hops.push(hop);
          if (nodeRoute.length > 2) {
            var middleTokenAllocation = getOutputSingleHop(pool, nodeRoute[0], nodeRoute[1], allocation);
          }
        } else {
          // second hop
          var hop = {
            pool: pool,
            allocation: middleTokenAllocation.toString(),
            inputToken: nodeRoute[1],
            outputToken: nodeRoute[2],
            nodeRoute: nodeRoute,
            route: route,
            allRoutes: routes,
            allNodeRoutes: nodeRoutes,
            totalInputAmount: totalInput,
            allAllocations: allocations
          };
          // console.log('SECOND HOP IS...');
          // console.log(hop);
          hops.push(hop);
        }
      }
    }
    // console.log('HOP ACTIONS FOUND TO BE');
    // console.log(hops);
    return hops;
  }

  // TODO: Clean this function. I don't need all the "actions" just the hops.
  // TODO: re-order actions to ensure each route is complete with zero input for second hop before starting next route.
  function getActionListFromRoutesAndAllocations(routes, nodeRoutes, allocations) {
    // REPLACE THE CODE BELOW WITH THE FUNCTION HERE.
    return getHopActionsFromRoutes(routes, nodeRoutes, allocations);
    // return actions;
  }

  //     #middleTokenTotals = getMiddleTokenTotals(routes,nodeRoutes,allocations)
  //     #TODO: complete this function with middle token checks.

  //     #consider all routes of length 2 with non-zero allocation. (double-hops)
  //     # among these, check for parallel swaps. That is, check for common node routes
  //     # for first hop. Then check for common node routes on second hop.
  //     # when common node routes occur for the first hop:
  //     # 1. Calculate the total expected output of intermediate token.
  //     # 2.
  //     # when common node routes occur for the second hop:
  //     # 1. get a ratio of the input allocations of the full routes associated with
  //     # these common node routes. allocate the total intermediate token output
  //     # toward these 2nd hop routes in the same ratio as their route input allocations.

  function getSmartRouteSwapActions(_x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16) {
    return _getSmartRouteSwapActions.apply(this, arguments);
  }
  function _getSmartRouteSwapActions() {
    _getSmartRouteSwapActions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(pools, inputToken, outputToken, totalInput, allTokens, maxPathLength, threshold, numberOfRoutesLimit, MAX_NUMBER_PARALLEL_POOLS, decimalsCulledPoolIds) {
      return _regeneratorRuntime().wrap(function _callee5$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (maxPathLength === void 0) {
                maxPathLength = 3;
              }
              if (threshold === void 0) {
                threshold = 0.001;
              }
              if (numberOfRoutesLimit === void 0) {
                numberOfRoutesLimit = 2;
              }
              if (MAX_NUMBER_PARALLEL_POOLS === void 0) {
                MAX_NUMBER_PARALLEL_POOLS = 4;
              }
              if (decimalsCulledPoolIds === void 0) {
                decimalsCulledPoolIds = [];
              }
              return _context10.abrupt("return", function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(totalInput) {
                  var resDict, allocations, routes, nodeRoutes, sortedIndexValues, topIndices, reducedRoutes, reducedNodeRoutes, _iterator3, _step3, ind, currentBestOutput, bestAllocations, bestNodeRoutes, bestRoutes, parallelNodeRoutes, parallelRoutes, n, currentNodeRoute, bestRoutesAreParallel, _filteredAllocationsAndOutputs, parallellAllocations, parallelOutputs, sortIndices, filteredParallelRoutes, filteredParallelNodeRoutes, i, parallelOutput, canHaveTwoRoutes, j, route1, route2, nodeRoute1, nodeRoute2, _route1PoolIds, route2PoolIds, sharePool, _iterator4, _step4, route1PoolId, currentRoutes, currentNodeRoutes, _filteredAllocationsAndOutputs2, _filteredAllocations, _filteredOutputs, totalOutput, _currentRoutes, _currentNodeRoutes, _filteredAllocationsAndOutputs3, _filteredAllocations2, _filteredOutputs2, _totalOutput, allSortedIndices, sortedIndices, filteredRoutes, filteredNodeRoutes, index, route1PoolIds, _route2PoolIds, sharedRoute, allFilteredRoutes, allFilteredNodeRoutes, firstRoute, firstRoutePoolIds, allFilteredRouteIds, secondRoute, filteredAllocationsAndOutputs, filteredAllocations, hops, actions, _supplies, hopInputTokenMeta, hopOutputTokenMeta, hopOutputTokenDecimals, expectedHopOutput, decimalEstimate, status, tokens, overallPriceImpact, action;
                  return _regeneratorRuntime().wrap(function _callee4$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          if (totalInput) {
                            _context9.next = 2;
                            break;
                          }
                          return _context9.abrupt("return", []);
                        case 2:
                          totalInput = new Big(totalInput); // remove pools that have an id from the decimalCulledPoolIds
                          pools = pools.filter(function (p) {
                            return !decimalsCulledPoolIds.includes(p.id);
                          });
                          _context9.next = 6;
                          return getBestOptimalAllocationsAndOutputs(pools, inputToken, outputToken, totalInput, maxPathLength, threshold);
                        case 6:
                          resDict = _context9.sent;
                          allocations = resDict.allocations; // let outputs = resDict.outputs;
                          routes = resDict.routes;
                          nodeRoutes = resDict.nodeRoutes;
                          sortedIndexValues = argsort(allocations);
                          topIndices = sortedIndexValues.slice(0, 10);
                          reducedRoutes = [];
                          reducedNodeRoutes = [];
                          for (_iterator3 = _createForOfIteratorHelperLoose(topIndices); !(_step3 = _iterator3()).done;) {
                            ind = _step3.value;
                            reducedRoutes.push(routes[ind]);
                            reducedNodeRoutes.push(nodeRoutes[ind]);
                          }
                          routes = reducedRoutes;
                          nodeRoutes = reducedNodeRoutes;

                          // TODO: compare pairs of routes to get the best allocation pair-wise.
                          currentBestOutput = new Big(0);
                          bestAllocations = resDict.allocations;
                          bestNodeRoutes = resDict.nodeRoutes;
                          bestRoutes = resDict.routes; // first check parallel swap with 4 actions. store result.
                          parallelNodeRoutes = [];
                          parallelRoutes = [];
                          for (n in bestRoutes) {
                            currentNodeRoute = bestNodeRoutes[n];
                            if (currentNodeRoute.length == 2) {
                              parallelNodeRoutes.push(currentNodeRoute);
                              parallelRoutes.push(bestRoutes[n]);
                            }
                          }
                          // console.log(`${parallelNodeRoutes.length} parallel routes found...`);
                          bestRoutesAreParallel = false;
                          if (parallelNodeRoutes.length > 0) {
                            // first calculate the expected result using only parallel routes.
                            // let filteredAllocationsAndOutputs = getOptOutputVecRefined(parallelRoutes, parallelNodeRoutes, totalInput);
                            _filteredAllocationsAndOutputs = getOptOutputVec(parallelRoutes, parallelNodeRoutes, totalInput);
                            parallellAllocations = _filteredAllocationsAndOutputs.allocations;
                            parallelOutputs = _filteredAllocationsAndOutputs.result;
                            if (parallellAllocations.length > MAX_NUMBER_PARALLEL_POOLS) {
                              // now sort by allocation value to the top 4 parallel swaps:
                              sortIndices = argsort(parallellAllocations);
                              sortIndices = sortIndices.slice(0, MAX_NUMBER_PARALLEL_POOLS);
                              filteredParallelRoutes = [];
                              filteredParallelNodeRoutes = [];
                              for (i in sortIndices) {
                                filteredParallelRoutes.push(parallelRoutes[sortIndices[i]]);
                                filteredParallelNodeRoutes.push(parallelNodeRoutes[sortIndices[i]]);
                              }
                              _filteredAllocationsAndOutputs = getOptOutputVec(filteredParallelRoutes, filteredParallelNodeRoutes, totalInput);
                              parallellAllocations = _filteredAllocationsAndOutputs.allocations;
                              parallelOutputs = _filteredAllocationsAndOutputs.result;
                            }
                            parallelOutput = parallelOutputs.reduce(function (a, b) {
                              return a.plus(b);
                            }, new Big(0));
                            if (new Big(parallelOutput).gt(currentBestOutput)) {
                              bestAllocations = parallellAllocations;
                              currentBestOutput = parallelOutput;
                              // console.log(
                              //   'BEST OUTPUT FROM PARALLEL SWAPS IS NOW... ',
                              //   currentBestOutput.toString()
                              // );
                              bestRoutes = parallelRoutes;
                              bestNodeRoutes = parallelNodeRoutes;
                              bestRoutesAreParallel = true;
                            }
                          }
                          canHaveTwoRoutes = false; // initialize this variable to check if we can have two routes, or if all routes share a pool for an edge case.
                          // console.log('THE NUMBER OF ROUTES IS...', routes.length);
                          _context9.t0 = _regeneratorRuntime().keys(routes);
                        case 29:
                          if ((_context9.t1 = _context9.t0()).done) {
                            _context9.next = 59;
                            break;
                          }
                          i = _context9.t1.value;
                          _context9.t2 = _regeneratorRuntime().keys(routes);
                        case 32:
                          if ((_context9.t3 = _context9.t2()).done) {
                            _context9.next = 57;
                            break;
                          }
                          j = _context9.t3.value;
                          if (!(j > i)) {
                            _context9.next = 55;
                            break;
                          }
                          route1 = routes[i];
                          route2 = routes[j];
                          nodeRoute1 = nodeRoutes[i];
                          nodeRoute2 = nodeRoutes[j]; // check if they share a pool.
                          _route1PoolIds = new Set(route1.map(function (r) {
                            return r.id;
                          }));
                          route2PoolIds = new Set(route2.map(function (r) {
                            return r.id;
                          }));
                          sharePool = false;
                          for (_iterator4 = _createForOfIteratorHelperLoose(_route1PoolIds); !(_step4 = _iterator4()).done;) {
                            route1PoolId = _step4.value;
                            if (route2PoolIds.has(route1PoolId)) {
                              sharePool = true;
                            }
                          }
                          if (!sharePool) {
                            _context9.next = 47;
                            break;
                          }
                          return _context9.abrupt("continue", 32);
                        case 47:
                          canHaveTwoRoutes = true;
                          currentRoutes = [route1, route2];
                          currentNodeRoutes = [nodeRoute1, nodeRoute2];
                          _filteredAllocationsAndOutputs2 = getOptOutputVec(currentRoutes, currentNodeRoutes, totalInput);
                          _filteredAllocations = _filteredAllocationsAndOutputs2.allocations;
                          _filteredOutputs = _filteredAllocationsAndOutputs2.result; // console.log('FILTERED ALLOCATIONS:');
                          // console.log(filteredAllocations.map((i) => i.toString()));
                          // console.log(filteredOutputs);
                          totalOutput = _filteredOutputs.reduce(function (a, b) {
                            return a.plus(b);
                          }, new Big(0));
                          if (new Big(totalOutput).gt(currentBestOutput)) {
                            bestAllocations = _filteredAllocations;
                            currentBestOutput = totalOutput;
                            // console.log('BEST OUTPUT IS NOW... ', currentBestOutput.toString());
                            bestRoutes = currentRoutes;
                            bestNodeRoutes = currentNodeRoutes;
                            bestRoutesAreParallel = false;
                            // bestResDict = currentResDict
                          }

                          // if (currentResDict.outputs.gt(currentBestOutput)) {
                          // console.log('DIFF IS...', currentResDict.outputs.minus(currentBestOutput).toString());
                          // bestResDict = currentResDict;
                          // currentBestOutput = bestResDict.outputs;
                          // console.log('BEST OUTPUT IS NOW... ', currentBestOutput.toString());
                          // console.log(bestResDict.routes);
                          // console.log(bestResDict.allocations.map((i) => i.toString()));
                          // console.log(bestResDict.outputs.toString());
                        case 55:
                          _context9.next = 32;
                          break;
                        case 57:
                          _context9.next = 29;
                          break;
                        case 59:
                          if (!canHaveTwoRoutes) {
                            // now we need to check through the routes in single manner to find the best one:
                            for (i in routes) {
                              _currentRoutes = [routes[i]];
                              _currentNodeRoutes = [nodeRoutes[i]]; // let filteredAllocationsAndOutputs = getOptOutputVecRefined(currentRoutes, currentNodeRoutes, totalInput);
                              _filteredAllocationsAndOutputs3 = getOptOutputVec(_currentRoutes, _currentNodeRoutes, totalInput);
                              _filteredAllocations2 = _filteredAllocationsAndOutputs3.allocations;
                              _filteredOutputs2 = _filteredAllocationsAndOutputs3.result; // console.log('FILTERED ALLOCATIONS:');
                              // console.log(filteredAllocations.map((i) => i.toString()));
                              // console.log(filteredOutputs);
                              _totalOutput = _filteredOutputs2.reduce(function (a, b) {
                                return a.plus(b);
                              }, new Big(0));
                              if (new Big(_totalOutput).gt(currentBestOutput)) {
                                bestAllocations = _filteredAllocations2;
                                currentBestOutput = _totalOutput;
                                // console.log('BEST OUTPUT IS NOW... ', currentBestOutput.toString());
                                bestRoutes = _currentRoutes;
                                bestNodeRoutes = _currentNodeRoutes;
                                bestRoutesAreParallel = false;
                                // bestResDict = currentResDict
                              }
                            }
                          }

                          // resDict = bestResDict;

                          allocations = bestAllocations;

                          // let outputs = resDict.outputs;
                          routes = bestRoutes;
                          nodeRoutes = bestNodeRoutes;
                          if (!(routes.length < 1)) {
                            _context9.next = 65;
                            break;
                          }
                          return _context9.abrupt("return", []);
                        case 65:
                          // check the top numberOfRoutesLimit
                          // console.log('initial allocations are...');
                          // console.log(allocations.map((a) => a.toString()));
                          // console.log('fixed allocations are...');
                          // console.log(allocations.map((a) => new Big(a).toFixed()));
                          //SORT BY ALLOCATIONS
                          allSortedIndices = argsort(allocations.map(function (a) {
                            return new Big(a);
                          }));
                          if (bestRoutesAreParallel) {
                            numberOfRoutesLimit = 4;
                          }
                          sortedIndices = allSortedIndices.slice(0, numberOfRoutesLimit); // console.log('sorted Indices are');
                          // console.log(sortedIndices);
                          filteredRoutes = [];
                          filteredNodeRoutes = [];
                          for (i in sortedIndices) {
                            index = sortedIndices[i];
                            filteredRoutes.push(routes[index]);
                            filteredNodeRoutes.push(nodeRoutes[index]);
                          }

                          // console.log('filteredRoutes are ...');
                          // console.log(filteredRoutes);
                          for (i in filteredRoutes) {
                            if (!filteredRoutes[i].length) {
                              filteredRoutes[i] = [filteredRoutes[i]];
                            }
                          }
                          // console.log('filtered Node routes are...');
                          // console.log(filteredNodeRoutes);

                          // THE BELOW CODE WILL ENSURE THAT ROUTES ARE INDEPENDENT (e.g. THE ROUTES WILL NOT SHARE A POOL)
                          route1PoolIds = filteredRoutes[0].map(function (pool) {
                            return pool.id;
                          }); // console.log('route 1 pool ids:');
                          // console.log(route1PoolIds);
                          if (!(filteredRoutes.length > 1)) {
                            _context9.next = 84;
                            break;
                          }
                          _route2PoolIds = filteredRoutes[1].map(function (pool) {
                            return pool.id;
                          }); // console.log('route 2 pool ids:');
                          // console.log(route2PoolIds);
                          sharedRoute = false;
                          _context9.t4 = _regeneratorRuntime().keys(_route2PoolIds);
                        case 77:
                          if ((_context9.t5 = _context9.t4()).done) {
                            _context9.next = 84;
                            break;
                          }
                          i = _context9.t5.value;
                          if (!route1PoolIds.includes(_route2PoolIds[i])) {
                            _context9.next = 82;
                            break;
                          }
                          // a pool was shared between routes. need to calculate a new second route.
                          // console.log(
                          //   'a pool was shared between routes. going to calculate a new second route'
                          // );
                          sharedRoute = true;
                          return _context9.abrupt("break", 84);
                        case 82:
                          _context9.next = 77;
                          break;
                        case 84:
                          if (!sharedRoute) {
                            _context9.next = 109;
                            break;
                          }
                          allFilteredRoutes = [];
                          allFilteredNodeRoutes = [];
                          for (i in allSortedIndices) {
                            allFilteredRoutes.push(routes[allSortedIndices[i]]);
                            allFilteredNodeRoutes.push(nodeRoutes[allSortedIndices[i]]);
                          }
                          firstRoute = allFilteredRoutes[0]; // console.log('first route is...');
                          // console.log(firstRoute);
                          firstRoutePoolIds = firstRoute.map(function (pool) {
                            return pool.id;
                          });
                          for (i in allFilteredRoutes) {
                            if (!allFilteredRoutes[i].length) {
                              allFilteredRoutes[i] = [allFilteredRoutes[i]];
                            }
                          }
                          // console.log('FIRST ROUTE POOL IDS ARE');
                          // console.log(firstRoutePoolIds);
                          allFilteredRouteIds = allFilteredRoutes.map(function (route) {
                            return route.map(function (pool) {
                              return pool.id;
                            });
                          }); // console.log('allFilteredRouteIds are ...');
                          // console.log(allFilteredRouteIds);
                          _context9.t6 = _regeneratorRuntime().keys(allFilteredRouteIds);
                        case 93:
                          if ((_context9.t7 = _context9.t6()).done) {
                            _context9.next = 109;
                            break;
                          }
                          i = _context9.t7.value;
                          _context9.t8 = _regeneratorRuntime().keys(allFilteredRouteIds[i]);
                        case 96:
                          if ((_context9.t9 = _context9.t8()).done) {
                            _context9.next = 107;
                            break;
                          }
                          j = _context9.t9.value;
                          if (!firstRoutePoolIds.includes(allFilteredRouteIds[i][j])) {
                            _context9.next = 100;
                            break;
                          }
                          return _context9.abrupt("break", 107);
                        case 100:
                          secondRoute = allFilteredRoutes[i];
                          if (!secondRoute.length) {
                            secondRoute = [secondRoute];
                          }
                          filteredRoutes = [allFilteredRoutes[0], secondRoute];
                          filteredNodeRoutes = [allFilteredNodeRoutes[0], allFilteredNodeRoutes[i]];
                          return _context9.abrupt("break", 107);
                        case 107:
                          _context9.next = 93;
                          break;
                        case 109:
                          // let filteredAllocations_check = getBestOptInput(
                          //   filteredRoutes,
                          //   filteredNodeRoutes,
                          //   totalInput
                          // );
                          // let filteredAllocationsAndOutputs = getOptOutputVecRefined(filteredRoutes, filteredNodeRoutes, totalInput);
                          filteredAllocationsAndOutputs = getOptOutputVec(filteredRoutes, filteredNodeRoutes, totalInput);
                          filteredAllocations = filteredAllocationsAndOutputs.allocations;
                          filteredAllocations = checkIntegerSumOfAllocations(filteredAllocations, totalInput).map(function (stringAllo) {
                            return new Big(stringAllo);
                          });
                          hops = getActionListFromRoutesAndAllocations(filteredRoutes, filteredNodeRoutes, filteredAllocations);
                          actions = []; // console.log('hops are...');
                          // console.log(hops);
                          _context9.t10 = _regeneratorRuntime().keys(hops);
                        case 116:
                          if ((_context9.t11 = _context9.t10()).done) {
                            _context9.next = 149;
                            break;
                          }
                          i = _context9.t11.value;
                          if (!allTokens[hops[i].inputToken]) {
                            _context9.next = 122;
                            break;
                          }
                          _context9.t12 = allTokens[hops[i].inputToken];
                          _context9.next = 125;
                          break;
                        case 122:
                          _context9.next = 124;
                          return ftGetTokenMetadata(hops[i].inputToken, 'token input');
                        case 124:
                          _context9.t12 = _context9.sent;
                        case 125:
                          hopInputTokenMeta = _context9.t12;
                          if (!allTokens[hops[i].outputToken]) {
                            _context9.next = 130;
                            break;
                          }
                          _context9.t13 = allTokens[hops[i].outputToken];
                          _context9.next = 133;
                          break;
                        case 130:
                          _context9.next = 132;
                          return ftGetTokenMetadata(hops[i].outputToken, 'token sm');
                        case 132:
                          _context9.t13 = _context9.sent;
                        case 133:
                          hopOutputTokenMeta = _context9.t13;
                          hopOutputTokenDecimals = hopOutputTokenMeta.decimals;
                          expectedHopOutput = getOutputSingleHop(hops[i].pool, hops[i].inputToken, hops[i].outputToken, hops[i].allocation);
                          decimalEstimate = new Big(expectedHopOutput).div(new Big(10).pow(hopOutputTokenDecimals)).toString(); // Need to check if expected Hop Output is > 1. If not, then cull the corresponding pool and re-calculate.
                          if (!new Big(expectedHopOutput).lt(new Big(1))) {
                            _context9.next = 140;
                            break;
                          }
                          // purge the pool and recalculate.

                          decimalsCulledPoolIds.push(hops[i].pool.id);
                          return _context9.abrupt("return", getSmartRouteSwapActions(pools, inputToken, outputToken, totalInput, allTokens, maxPathLength = maxPathLength, threshold = threshold, numberOfRoutesLimit = numberOfRoutesLimit, MAX_NUMBER_PARALLEL_POOLS = MAX_NUMBER_PARALLEL_POOLS, decimalsCulledPoolIds = decimalsCulledPoolIds));
                        case 140:
                          if (hops[i].inputToken == inputToken && hops[i].outputToken == outputToken) {
                            status = 'parallel swap';
                          } else {
                            status = 'stableSmart';
                          }
                          _context9.next = 143;
                          return Promise.all(hops[i].nodeRoute.map( /*#__PURE__*/function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(t) {
                              return _regeneratorRuntime().wrap(function _callee3$(_context8) {
                                while (1) {
                                  switch (_context8.prev = _context8.next) {
                                    case 0:
                                      if (!allTokens[t]) {
                                        _context8.next = 4;
                                        break;
                                      }
                                      _context8.t0 = allTokens[t];
                                      _context8.next = 7;
                                      break;
                                    case 4:
                                      _context8.next = 6;
                                      return ftGetTokenMetadata(t, 'smart');
                                    case 6:
                                      _context8.t0 = _context8.sent;
                                    case 7:
                                      return _context8.abrupt("return", _context8.t0);
                                    case 8:
                                    case "end":
                                      return _context8.stop();
                                  }
                                }
                              }, _callee3);
                            }));
                            return function (_x35) {
                              return _ref3.apply(this, arguments);
                            };
                          }()));
                        case 143:
                          tokens = _context9.sent;
                          actions[i] = {
                            estimate: decimalEstimate,
                            pool: {
                              fee: hops[i].pool.fee,
                              gamma_bps: new Big(10000).minus(new Big(hops[i].pool.fee)),
                              //.div(new Big(10000)), //hops[i].pool.gamma, //new Big(10000).minus(new Big(hops[i].pool.fee)).div(new Big(10000));
                              id: hops[i].pool.id,
                              partialAmountIn: new Big(hops[i].allocation).round().toString(),
                              supplies: (_supplies = {}, _supplies[hops[i].pool.token1Id] = hops[i].pool.token1Supply, _supplies[hops[i].pool.token2Id] = hops[i].pool.token2Supply, _supplies),
                              token0_ref_price: hops[i].pool.token0_price,
                              tokenIds: [hops[i].pool.token1Id, hops[i].pool.token2Id],
                              Dex: hops[i].pool.Dex
                            },
                            status: status,
                            token: hopInputTokenMeta,
                            outputToken: hops[i].outputToken,
                            inputToken: hops[i].inputToken,
                            nodeRoute: hops[i].nodeRoute,
                            route: hops[i].route,
                            allRoutes: hops[i].allRoutes,
                            allNodeRoutes: hops[i].allNodeRoutes,
                            totalInputAmount: hops[i].totalInputAmount,
                            allAllocations: hops[i].allAllocations,
                            tokens: tokens,
                            routeInputToken: inputToken,
                            routeOutputToken: outputToken,
                            overallPriceImpact: '0'
                          };
                          // console.log('INPUT TOKEN IS...');
                          // console.log(hops[i].inputToken);
                          actions[i].pool.x = actions[i].pool.supplies[hops[i].inputToken];
                          actions[i].pool.y = actions[i].pool.supplies[hops[i].outputToken];
                          _context9.next = 116;
                          break;
                        case 149:
                          _context9.next = 151;
                          return calculateSmartRouteV2PriceImpact(actions, allTokens);
                        case 151:
                          overallPriceImpact = _context9.sent;
                          for (i in actions) {
                            action = actions[i];
                            action.overallPriceImpact = overallPriceImpact;
                            if (action.outputToken === outputToken && action.inputToken != inputToken) {
                              // only want to set second hop partial amount in to zero
                              action.pool.partialAmountIn = '0';
                            }
                          }
                          return _context9.abrupt("return", actions);
                        case 154:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee4);
                }));
                return function (_x34) {
                  return _ref2.apply(this, arguments);
                };
              }()(totalInput));
            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee5);
    }));
    return _getSmartRouteSwapActions.apply(this, arguments);
  }
  function calculateSmartRouteV2PriceImpact(_x17, _x18) {
    return _calculateSmartRouteV2PriceImpact.apply(this, arguments);
  }
  function _calculateSmartRouteV2PriceImpact() {
    _calculateSmartRouteV2PriceImpact = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(actions, allTokens) {
      var deltaY, inputTokenMeta, deltaX, R, P, routes, nodeRoutes, allocations, totalAllocations, weights, i, route, nodeRoute, tokens, weight, num, denom, routeMarketPrice, num1, denom1, num2, denom2, priceImpact;
      return _regeneratorRuntime().wrap(function _callee7$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              // the goal is to take a weighted average of the price impact per route, treating each one at a time.
              // for single hop (parallel swaps), the price impact is calculated as before.
              // for double-hop, the market price, P, is determined using reserves of tokens in each pool in the route.
              // in both cases, we compare the 'market price', P , determined solely by reserves in pools, and the actual
              // average price, R,  expected to be paid in the transaction.
              // the price impact is then defined as (P-R)/R * 100 and is a percentage number, returned as a string.
              deltaY = actions.filter(function (a) {
                return a.outputToken == a.routeOutputToken;
              }).map(function (a) {
                return new Big(a.estimate);
              }).reduce(function (a, b) {
                return a.plus(b);
              }, new Big(0)); // console.log('DELTA Y IS...');
              // console.log(deltaY.toString());
              inputTokenMeta = actions[0].tokens[0];
              deltaX = new Big(actions[0].totalInputAmount).div(new Big(10).pow(inputTokenMeta.decimals));
              R = deltaY.div(deltaX);
              P = new Big(0);
              routes = actions[0].allRoutes;
              nodeRoutes = actions[0].allNodeRoutes;
              allocations = actions[0].allAllocations.map(function (a) {
                return new Big(a);
              });
              totalAllocations = allocations.map(function (a) {
                return new Big(a);
              }).reduce(function (a, b) {
                return a.plus(b);
              }, new Big(0));
              weights = allocations.map(function (a) {
                return a.div(totalAllocations);
              });
              _context12.t0 = _regeneratorRuntime().keys(routes);
            case 11:
              if ((_context12.t1 = _context12.t0()).done) {
                _context12.next = 23;
                break;
              }
              i = _context12.t1.value;
              route = routes[i];
              nodeRoute = nodeRoutes[i];
              _context12.next = 17;
              return Promise.all(nodeRoute.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(t) {
                  return _regeneratorRuntime().wrap(function _callee6$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          if (!allTokens[t]) {
                            _context11.next = 4;
                            break;
                          }
                          _context11.t0 = allTokens[t];
                          _context11.next = 7;
                          break;
                        case 4:
                          _context11.next = 6;
                          return ftGetTokenMetadata(t, 'sm routes');
                        case 6:
                          _context11.t0 = _context11.sent;
                        case 7:
                          return _context11.abrupt("return", _context11.t0);
                        case 8:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee6);
                }));
                return function (_x36) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 17:
              tokens = _context12.sent;
              weight = weights[i];
              if (route.length == 1) {
                num = new Big(route[0].reserves[nodeRoute[0]]).div(new Big(10).pow(tokens[0].decimals));
                denom = new Big(route[0].reserves[nodeRoute[1]]).div(new Big(10).pow(tokens[1].decimals));
                routeMarketPrice = num.div(denom);
              } else {
                num1 = new Big(route[0].reserves[nodeRoute[0]]).div(new Big(10).pow(tokens[0].decimals));
                denom1 = new Big(route[0].reserves[nodeRoute[1]]).div(new Big(10).pow(tokens[1].decimals));
                num2 = new Big(route[1].reserves[nodeRoute[1]]).div(new Big(10).pow(tokens[1].decimals));
                denom2 = new Big(route[1].reserves[nodeRoute[2]]).div(new Big(10).pow(tokens[2].decimals));
                routeMarketPrice = num1.div(denom1).times(num2).div(denom2);
              }
              P = P.plus(weight.times(new Big(1).div(routeMarketPrice)));
              _context12.next = 11;
              break;
            case 23:
              priceImpact = P.minus(R).div(R).times(new Big(100)).toString();
              return _context12.abrupt("return", priceImpact);
            case 25:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee7);
    }));
    return _calculateSmartRouteV2PriceImpact.apply(this, arguments);
  }
  function decor(arr) {
    var res = [];
    for (var i in arr) {
      res.push([arr[i], i]);
    }
    return res;
  }
  function argsort(arr) {
    var undecor = function undecor(a) {
      return a[1];
    }; // leave only index
    var decorated = decor(arr);
    return decorated.sort(function (a, b) {
      return new Big(b[0]).minus(new Big(a[0]));
    }).map(undecor);
  }
  function getPoolsByToken1ANDToken2(pools, token1, token2, cullZeroLiquidityPools) {
    if (cullZeroLiquidityPools === void 0) {
      cullZeroLiquidityPools = true;
    }
    var filteredPools = pools.filter(function (item) {
      return item.token1Id === token1 && item.token2Id === token2 || item.token1Id === token2 && item.token2Id === token1;
    });
    if (cullZeroLiquidityPools) {
      filteredPools = filteredPools.filter(function (item) {
        return item.token1Supply != '0' && item.token2Supply != '0';
      });
    }
    return filteredPools;
  }
  function getLiqudityOfPoolsFromList(pools) {
    var liquidities = [];
    for (var poolInd in pools) {
      var pool = pools[poolInd];
      pool.amounts = [pool.token1Supply, pool.token2Supply];
      var poolBigAmounts = pool.amounts.map(function (item) {
        return new Big(item);
      });
      var liquidity = poolBigAmounts[0].times(poolBigAmounts[1]);
      liquidities.push(liquidity);
    }
    return liquidities;
  }
  function getNormalizedLiquiditiesFromList(pools) {
    var liquidities = getLiqudityOfPoolsFromList(pools);
    var maxLiq = bigMax(liquidities);
    var normalizedLiquidities = liquidities.map(function (item) {
      return item.div(maxLiq);
    });
    return normalizedLiquidities;
  }
  function bigMax(arrayOfBigs) {
    if (arrayOfBigs.length < 1) {
      return null;
    }
    var maxElem = arrayOfBigs[0];
    for (var ind in arrayOfBigs) {
      var val = arrayOfBigs[ind];
      if (val.gt(maxElem)) {
        maxElem = val;
      }
    }
    return maxElem;
  }
  function cullPoolsWithInsufficientLiquidity(pools, threshold) {
    if (threshold === void 0) {
      threshold = 0.0001;
    }
    var thresh = new Big(threshold);
    var normLiq = getNormalizedLiquiditiesFromList(pools);
    var filteredPools = [];
    for (var i = 0; i < normLiq.length; i++) {
      if (normLiq[i] > thresh) {
        filteredPools.push(pools[i]);
      }
    }
    return filteredPools;
  }
  function cartesianProduct(a) {
    var result = a.reduce(function (a, b) {
      return a.flatMap(function (d) {
        return b.map(function (e) {
          return [d, e].flat();
        });
      });
    });
    return result;
  }
  function addEdge(g, edge) {
    var src = edge[0];
    var dst = edge[1];
    if (Object.keys(g).includes(src)) {
      if (!Object.keys(g[src]).includes(dst)) {
        g[src][dst] = 1;
      }
    } else {
      g[src] = {};
      g[src][dst] = 1;
    }
    if (Object.keys(g).includes(dst)) {
      if (!Object.keys(g[dst]).includes(src)) {
        g[dst][src] = 1;
      }
    } else {
      g[dst] = {};
      g[dst][src] = 1;
    }
  }
  function addEdges(g, edgeList) {
    for (var n in edgeList) {
      var edge = edgeList[n];
      addEdge(g, edge);
    }
  }
  function deleteEdge(g, edge) {
    var gNew = JSON.parse(JSON.stringify(g)); // using this to deep clone graph structure
    var e1 = edge[0];
    var e2 = edge[1];
    if (Object.keys(gNew).includes(e1)) {
      if (Object.keys(gNew[e1]).includes(e2)) {
        delete gNew[e1][e2];
      }
    }
    if (Object.keys(gNew).includes(e2)) {
      if (Object.keys(gNew[e2]).includes(e1)) {
        delete gNew[e2][e1];
      }
    }
    return gNew;
  }
  function deleteNode(g, node) {
    var gNew = JSON.parse(JSON.stringify(g)); // using this to deep clone graph structure
    if (Object.keys(gNew).includes(node)) {
      delete gNew[node];
    }
    var keys = Object.keys(gNew);
    for (var nodeInd in keys) {
      var nodeNow = keys[nodeInd];
      if (Object.keys(gNew[nodeNow]).includes(node)) {
        delete gNew[nodeNow][node];
      }
    }
    return gNew;
  }
  function dijkstra(graph, s) {
    var solutions = {};
    solutions[s] = {};
    solutions[s].path = [];
    solutions[s].dist = 0;
    while (true) {
      var parent = null;
      var nearest = null;
      var dist = Infinity;

      //for each existing solution
      for (var n in solutions) {
        if (!solutions[n]) {
          solutions[n] = {};
        }
        if (!solutions[n].path) continue;
        var ndist = solutions[n].dist;
        var adj = graph[n];
        //for each of its adjacent nodes...
        for (var a in adj) {
          //without a solution already...
          if (!solutions[a]) {
            solutions[a] = {};
          }
          if (solutions[a].path) continue;
          //choose nearest node with lowest *total* cost
          var d = adj[a] + ndist;
          if (d < dist) {
            //reference parent
            parent = solutions[n].path;
            nearest = a;
            dist = d;
          }
        }
      }

      //no more solutions
      if (dist === Infinity) {
        break;
      }

      //extend parent's solution path
      solutions[nearest].path = parent.concat(nearest);
      //extend parent's cost
      solutions[nearest].dist = dist;
    }
    return solutions;
  }
  function shortestPath(g, src, dst, ignore_nodes, ignore_edges) {
    if (ignore_nodes === void 0) {
      ignore_nodes = [];
    }
    if (ignore_edges === void 0) {
      ignore_edges = [];
    }
    var gTemp = JSON.parse(JSON.stringify(g)); // using this to deep clone graph structure. If we can use lodash, could use  _.cloneDeep(obj)
    // remove nodes
    for (var nodeInd in ignore_nodes) {
      var nodeNow = ignore_nodes[nodeInd];
      gTemp = deleteNode(gTemp, nodeNow);
    }
    // remove edges
    for (var edgeInd in ignore_edges) {
      var edgeNow = ignore_edges[edgeInd];
      gTemp = deleteEdge(gTemp, edgeNow);
    }
    var solution = dijkstra(gTemp, src)[dst];
    solution.path.unshift(src); // original algorithm doesn't include source node in path
    return solution;
  }
  var PathBuffer = /*#__PURE__*/function () {
    function PathBuffer() {
      this.paths = [];
      this.sortedpaths = [];
      //this.counter = count();
    }
    var _proto = PathBuffer.prototype;
    _proto.len = function len() {
      return this.sortedpaths.length;
    };
    _proto.push = function push(cost, path) {
      if (path && !arrayContains(this.paths, path)) {
        this.sortedpaths.push([cost, path]);
        this.sortedpaths.sort(function (a, b) {
          return a[0] - b[0];
        });
        //heappush(this.sortedpaths, (cost, this.counter.next().value,path));
        this.paths.push(path);
      }
    };
    _proto.pop = function pop() {
      //let val = heappop(this.sortedpaths);
      var val = this.sortedpaths.shift();
      var path = val[1];
      this.paths.splice(this.paths.indexOf(path), 1);
      return path;
    };
    return PathBuffer;
  }();
  function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every(function (val, index) {
      return val === b[index];
    });
  }
  function arrayContains(arr, obj) {
    // checks to see if the input array contains a reference object, obj, using
    // JSON.stringify() .
    var obj_json = JSON.stringify(obj);
    for (var itemInd in arr) {
      if (JSON.stringify(arr[itemInd]) == obj_json) {
        return true;
      }
    }
    return false;
  }
  function yenFromPy(g, source, target) {
    var listA, listB, prev_path, sol, length, path, ignore_nodes, ignore_edges, i, root, root_length, pathInd, _path, edgeToIgnore, _sol, _length, spur, _path2, _path3;
    return _regeneratorRuntime().wrap(function yenFromPy$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //adapted from the python implementation in networkx.algorithms.simple_paths.shortest_simple_paths()
            listA = [];
            listB = new PathBuffer();
            prev_path = null;
          case 3:
            if (!prev_path) {
              sol = shortestPath(g, source, target);
              length = sol.dist;
              path = sol.path;
              listB.push(length, path);
            } else {
              ignore_nodes = [];
              ignore_edges = [];
              for (i = 1; i < prev_path.length; i++) {
                root = prev_path.slice(0, i);
                root_length = root.length;
                for (pathInd in listA) {
                  _path = listA[pathInd];
                  if (arrayEquals(_path.slice(0, i), root)) {
                    edgeToIgnore = [_path[i - 1], _path[i]];
                    ignore_edges.push(edgeToIgnore);
                  }
                }
                try {
                  _sol = shortestPath(g, root[root.length - 1], target, ignore_nodes = ignore_nodes, ignore_edges = ignore_edges);
                  _length = _sol.dist;
                  spur = _sol.path;
                  _path2 = root.slice(0, root.length - 1).concat(spur);
                  listB.push(root_length + _length, _path2);
                } catch (e) {
                  //console.log(`yenFromPy error was... ${e}`)
                  //dont do anything.
                }
                ignore_nodes.push(root[root.length - 1]);
              }
            }
            if (!listB.sortedpaths) {
              _context5.next = 19;
              break;
            }
            _context5.prev = 6;
            _path3 = listB.pop();
            _context5.next = 10;
            return _path3;
          case 10:
            listA.push(_path3);
            prev_path = _path3;
            _context5.next = 17;
            break;
          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](6);
            return _context5.abrupt("break", 22);
          case 17:
            _context5.next = 20;
            break;
          case 19:
            return _context5.abrupt("break", 22);
          case 20:
            _context5.next = 3;
            break;
          case 22:
          case "end":
            return _context5.stop();
        }
      }
    }, _marked5, null, [[6, 14]]);
  }
  function getKShortestPaths(g, source, target, k, maxPathLength) {
    if (maxPathLength === void 0) {
      maxPathLength = 3;
    }
    return function (maxPathLength) {
      var paths = [];
      if (maxPathLength < 2) {
        var maxPathLength = 2;
      }
      var gen = yenFromPy(g, source, target);
      for (var n = 1; n <= k; n++) {
        try {
          var res = gen.next().value;
          if (res && !arrayContains(paths, res)) {
            if (res.length > maxPathLength) {
              // console.log(
              //   `found all hops of length ${
              //     maxPathLength - 1
              //   } or less... breaking out of generator`
              // );
              break;
            }
            paths.push(res);
          }
        } catch (e) {
          break;
        }
      }
      return paths;
    }(maxPathLength);
  }
  function getPathsFromPools(_x19, _x20, _x21, _x22) {
    return _getPathsFromPools.apply(this, arguments);
  }
  function _getPathsFromPools() {
    _getPathsFromPools = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(pools, inputToken, outputToken, maxPathLength) {
      var graph;
      return _regeneratorRuntime().wrap(function _callee8$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (maxPathLength === void 0) {
                maxPathLength = 3;
              }
              graph = getGraphFromPoolList(pools);
              return _context13.abrupt("return", getKShortestPaths(graph, inputToken, outputToken, 100, maxPathLength));
            case 3:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee8);
    }));
    return _getPathsFromPools.apply(this, arguments);
  }
  function getGraphFromPoolList(poolList) {
    var pools = poolList.filter(function (item) {
      return item.token1Supply != '0' && item.token2Supply != '0';
    });
    var transitions = pools.map(function (item) {
      return [item.token1Id, item.token2Id];
    });
    var g = {};
    addEdges(g, transitions);
    return g;
  }

  ////////////////////////////////////

  // MAIN FUNCTION

  ////////////////////////////////////

  // TODO -- incorporate the following integrated function, which tries to
  // account for stablecoins within the context of smart routing.

  //TODO -- need the right API / hooks for GETSTABLESWAPACTION function and GETPARALLELSWAPACTIONS functions.

  //TODO -- transform the actions generated in this function into tranaction to execute.

  //TRYING: GETSTABLESWAPACTION <==> instantSwapGetTransactions

  function stableSmart(_x28, _x29, _x30, _x31, _x32) {
    return _stableSmart.apply(this, arguments);
  }
  function _stableSmart() {
    _stableSmart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(pools, inputToken, outputToken, totalInput, allTokens) {
      var smartRouteActions;
      return _regeneratorRuntime().wrap(function _callee10$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return getSmartRouteSwapActions(pools, inputToken, outputToken, totalInput, allTokens);
            case 2:
              smartRouteActions = _context15.sent;
              return _context15.abrupt("return", smartRouteActions);
            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee10);
    }));
    return _stableSmart.apply(this, arguments);
  }
  function getExpectedOutputFromActionsORIG(actions, outputToken) {
    return actions.filter(function (item) {
      return item.outputToken === outputToken;
    }).map(function (item) {
      return new Big(item.estimate);
    }).reduce(function (a, b) {
      return a.plus(b);
    }, new Big(0));
  }

  (function (PoolMode) {
    PoolMode["PARALLEL"] = "parallel swap";
    PoolMode["SMART"] = "smart routing";
    PoolMode["SMART_V2"] = "stableSmart";
    PoolMode["STABLE"] = "stable swap";
  })(exports.PoolMode || (exports.PoolMode = {}));
  var getSimplePoolEstimate = function getSimplePoolEstimate(_ref) {
    var tokenIn = _ref.tokenIn,
      tokenOut = _ref.tokenOut,
      pool = _ref.pool,
      amountIn = _ref.amountIn;
    var amount_with_fee = Number(amountIn) * (FEE_DIVISOR - pool.fee);
    var in_balance = toReadableNumber(tokenIn.decimals, pool.supplies[tokenIn.id]);
    var out_balance = toReadableNumber(tokenOut.decimals, pool.supplies[tokenOut.id]);
    var estimate = new Big((amount_with_fee * Number(out_balance) / (FEE_DIVISOR * Number(in_balance) + amount_with_fee)).toString()).toFixed();
    return {
      estimate: estimate,
      pool: pool,
      outputToken: tokenOut.id,
      inputToken: tokenIn.id
    };
  };
  var getStablePoolEstimate = function getStablePoolEstimate(_ref2) {
    var tokenIn = _ref2.tokenIn,
      tokenOut = _ref2.tokenOut,
      amountIn = _ref2.amountIn,
      stablePool = _ref2.stablePool;
    var STABLE_LP_TOKEN_DECIMALS = getStablePoolDecimal(stablePool);
    var _getSwappedAmount = getSwappedAmount(tokenIn.id, tokenOut.id, amountIn, stablePool, STABLE_LP_TOKEN_DECIMALS),
      amount_swapped = _getSwappedAmount[0],
      dy = _getSwappedAmount[2];
    var amountOut = amount_swapped < 0 || isNaN(amount_swapped) ? '0' : toPrecision(scientificNotationToString(amount_swapped.toString()), 0);
    var dyOut = amount_swapped < 0 || isNaN(amount_swapped) || isNaN(dy) ? '0' : toPrecision(scientificNotationToString(dy.toString()), 0);
    var rates = stablePool.rates.reduce(function (acc, cur, i) {
      var _extends2;
      return _extends({}, acc, (_extends2 = {}, _extends2[stablePool.token_account_ids[i]] = cur, _extends2));
    }, {});
    return {
      estimate: toReadableNumber(STABLE_LP_TOKEN_DECIMALS, amountOut),
      noFeeAmountOut: toReadableNumber(STABLE_LP_TOKEN_DECIMALS, dyOut),
      pool: _extends({}, stablePool, {
        rates: rates
      }),
      outputToken: tokenOut.id,
      inputToken: tokenIn.id
    };
  };
  /**
   * @description Get the estimate of the amount of tokenOut that can be received
   *
   */
  var singlePoolSwap = function singlePoolSwap(_ref3) {
    var tokenIn = _ref3.tokenIn,
      tokenOut = _ref3.tokenOut,
      simplePools = _ref3.simplePools,
      amountIn = _ref3.amountIn,
      stablePools = _ref3.stablePools;
    if (!simplePools || simplePools.length === 0) {
      throw NoPoolError;
    }
    var parsedAmountIn = toNonDivisibleNumber(tokenIn.decimals, amountIn);
    // const pools = simplePools.concat(stablePools);
    var simplePoolsThisPair = simplePools.filter(function (p) {
      return p.tokenIds.includes(tokenIn.id) && p.tokenIds.includes(tokenOut.id) && (!stablePools || !isStablePool(stablePools, p.id));
    });
    var estimatesSimplePool = simplePoolsThisPair.map(function (pool) {
      return getSimplePoolEstimate({
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        pool: pool,
        amountIn: amountIn
      });
    });
    var stablePoolThisPair = stablePools == null ? void 0 : stablePools.filter(function (sp) {
      return sp.token_account_ids.includes(tokenIn.id) && sp.token_account_ids.includes(tokenOut.id);
    });
    // different stable lp token decimal for different type of pools
    var estimatesStablePool = stablePoolThisPair == null ? void 0 : stablePoolThisPair.map(function (stablePool) {
      return getStablePoolEstimate({
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        amountIn: amountIn,
        stablePool: stablePool,
        pool: simplePools.find(function (p) {
          return p.id === stablePool.id;
        })
      });
    });
    var maxSimplePoolEstimate = estimatesSimplePool === undefined || estimatesSimplePool.length === 0 ? undefined : estimatesSimplePool.length === 1 ? estimatesSimplePool[0] : ___default.maxBy(estimatesSimplePool, function (estimate) {
      return Number(estimate.estimate);
    });
    var maxStablePoolEstimate = estimatesStablePool === undefined || estimatesStablePool.length === 0 ? undefined : estimatesStablePool.length === 1 ? estimatesStablePool[0] : ___default.maxBy(estimatesStablePool, function (estimate) {
      return Number(estimate.estimate);
    });
    if (!maxStablePoolEstimate && !maxSimplePoolEstimate) throw NoPoolError;
    maxSimplePoolEstimate && (maxSimplePoolEstimate.pool.partialAmountIn = parsedAmountIn);
    maxStablePoolEstimate && (maxStablePoolEstimate.pool.partialAmountIn = parsedAmountIn);
    if (!maxStablePoolEstimate) {
      maxSimplePoolEstimate && (maxSimplePoolEstimate.pool.partialAmountIn = parsedAmountIn);
      return maxSimplePoolEstimate;
    } else if (!maxSimplePoolEstimate) {
      return maxStablePoolEstimate;
    } else {
      return Number(maxSimplePoolEstimate == null ? void 0 : maxSimplePoolEstimate.estimate) > Number(maxStablePoolEstimate == null ? void 0 : maxStablePoolEstimate.estimate) ? maxSimplePoolEstimate : maxStablePoolEstimate;
    }
  };
  var getStablePoolsThisPair = function getStablePoolsThisPair(_ref4) {
    var tokenInId = _ref4.tokenInId,
      tokenOutId = _ref4.tokenOutId,
      stablePools = _ref4.stablePools;
    return stablePools.filter(function (p) {
      return p.tokenIds.includes(tokenInId) && p.tokenIds.includes(tokenOutId) && tokenInId !== tokenOutId;
    });
  };
  var getPoolsByTokens = function getPoolsByTokens(_ref5) {
    var pools = _ref5.pools,
      tokenInId = _ref5.tokenInId,
      tokenOutId = _ref5.tokenOutId;
    if (tokenInId === tokenOutId) return [];
    return pools.filter(function (p) {
      return p.tokenIds.includes(tokenInId) && p.tokenIds.includes(tokenOutId);
    });
  };
  var getPoolEstimate = /*#__PURE__*/function () {
    var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref6) {
      var tokenIn, tokenOut, amountIn, stablePoolDetail, pool;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tokenIn = _ref6.tokenIn, tokenOut = _ref6.tokenOut, amountIn = _ref6.amountIn, stablePoolDetail = _ref6.stablePoolDetail, pool = _ref6.pool;
              if (!stablePoolDetail) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", getStablePoolEstimate({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                stablePool: stablePoolDetail,
                amountIn: amountIn,
                pool: pool
              }));
            case 5:
              return _context.abrupt("return", getSimplePoolEstimate({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                pool: pool,
                amountIn: amountIn
              }));
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getPoolEstimate(_x) {
      return _ref7.apply(this, arguments);
    };
  }();
  function getHybridStableSmart(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _getHybridStableSmart.apply(this, arguments);
  }
  // simple pools and stable pools for this pair
  function _getHybridStableSmart() {
    _getHybridStableSmart = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tokenIn, tokenOut, amountIn, stablePools, stablePoolsDetail, simplePools, allTokens) {
      var stablePoolsDetailById, parsedAmountIn, pool1, pool2, pools1, pools2, pools1Right, pools2Right, candidatePools, otherStables, _iterator, _step, otherStable, stablePoolsThisPair, tmpPools, tobeAddedPools, _otherStables, _iterator2, _step2, _otherStable, _stablePoolsThisPair, _tmpPools, _tobeAddedPools, _iterator3, _step3, _p, _middleTokens, _loop2, _iterator5, _step5, _i, _pools1Right, p1, middleTokens, _loop, _iterator4, _step4, tokensMedata, BestPoolPair, bestPool, estimate, tokenMidId, tokenMidMeta, estimate1, estimate2;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!isStablePoolToken(stablePoolsDetail, tokenIn.id) && !isStablePoolToken(stablePoolsDetail, tokenOut.id))) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", {
                actions: [],
                estimate: '0'
              });
            case 2:
              stablePoolsDetailById = stablePoolsDetail.reduce(function (acc, cur) {
                var _extends3;
                return _extends({}, acc, (_extends3 = {}, _extends3[cur.id] = cur, _extends3));
              }, {});
              parsedAmountIn = toNonDivisibleNumber(tokenIn.decimals, amountIn);
              pools1 = [];
              pools2 = [];
              pools1Right = [];
              pools2Right = [];
              candidatePools = [];
              /**
               * find possible routes for this pair
               *
               *
               */
              if (isStablePoolToken(stablePoolsDetail, tokenIn.id)) {
                // first hop will be through stable pool.
                pools1 = stablePools.filter(function (pool) {
                  return pool.tokenIds.includes(tokenIn.id);
                });
                otherStables = pools1.map(function (pool) {
                  return pool.tokenIds.filter(function (id) {
                    return id !== tokenIn.id;
                  });
                }).flat();
                for (_iterator = _createForOfIteratorHelperLoose(otherStables); !(_step = _iterator()).done;) {
                  otherStable = _step.value;
                  stablePoolsThisPair = getStablePoolsThisPair({
                    tokenInId: otherStable,
                    tokenOutId: tokenOut.id,
                    stablePools: stablePools
                  });
                  tmpPools = getPoolsByTokens({
                    tokenInId: otherStable,
                    tokenOutId: tokenOut.id,
                    pools: simplePools
                  });
                  tobeAddedPools = tmpPools.concat(stablePoolsThisPair);
                  pools2.push.apply(pools2, tobeAddedPools.filter(function (p) {
                    var supplies = Object.values(p.supplies);
                    return new Big(supplies[0]).times(new Big(supplies[1])).gt(0);
                  }));
                }
              }
              if (isStablePoolToken(stablePoolsDetail, tokenOut.id)) {
                // second hop will be through stable pool.
                pools2Right = stablePools.filter(function (pool) {
                  return pool.tokenIds.includes(tokenOut.id);
                });
                _otherStables = pools2Right.map(function (pool) {
                  return pool.tokenIds.filter(function (id) {
                    return id !== tokenOut.id;
                  });
                }).flat();
                for (_iterator2 = _createForOfIteratorHelperLoose(_otherStables); !(_step2 = _iterator2()).done;) {
                  _otherStable = _step2.value;
                  _stablePoolsThisPair = getStablePoolsThisPair({
                    tokenInId: tokenIn.id,
                    tokenOutId: _otherStable,
                    stablePools: stablePools
                  });
                  _tmpPools = getPoolsByTokens({
                    tokenInId: tokenIn.id,
                    tokenOutId: _otherStable,
                    pools: simplePools
                  });
                  _tobeAddedPools = _tmpPools.concat(_stablePoolsThisPair);
                  pools1Right.push.apply(pools1Right, _tobeAddedPools.filter(function (p) {
                    var supplies = Object.values(p.supplies);
                    return new Big(supplies[0]).times(new Big(supplies[1])).gt(0);
                  }));
                }
              }
              // find candidate pools
              for (_iterator3 = _createForOfIteratorHelperLoose(pools1); !(_step3 = _iterator3()).done;) {
                _p = _step3.value;
                _middleTokens = _p.tokenIds.filter(function (id) {
                  return id !== tokenIn.id;
                });
                _loop2 = function _loop2() {
                  var middleToken = _step5.value;
                  var p2s = pools2.filter(function (p) {
                    return p.tokenIds.includes(middleToken) && p.tokenIds.includes(tokenOut.id) && middleToken !== tokenOut.id;
                  });
                  var p2 = ___default.maxBy(p2s, function (p) {
                    return Number(new Big(toReadableNumber(tokenOut.decimals, p.supplies[tokenOut.id])));
                  });
                  if (middleToken === tokenOut.id) {
                    p2 = _p;
                  }
                  if (_p && p2) {
                    if (_p.id === p2.id) candidatePools.push([_p]);else candidatePools.push([_p, p2]);
                  }
                };
                for (_iterator5 = _createForOfIteratorHelperLoose(_middleTokens); !(_step5 = _iterator5()).done;) {
                  _loop2();
                }
              }
              for (_i = 0, _pools1Right = pools1Right; _i < _pools1Right.length; _i++) {
                p1 = _pools1Right[_i];
                middleTokens = p1.tokenIds.filter(function (id) {
                  return id !== tokenIn.id;
                });
                _loop = function _loop() {
                  var middleToken = _step4.value;
                  var p2s = pools2Right.filter(function (p) {
                    return p.tokenIds.includes(middleToken) && p.tokenIds.includes(tokenOut.id) && middleToken !== tokenOut.id;
                  });
                  var p2 = ___default.maxBy(p2s, function (p) {
                    return Number(new Big(toReadableNumber(tokenOut.decimals, p.supplies[tokenOut.id])));
                  });
                  if (middleToken === tokenOut.id) {
                    p2 = p1;
                  }
                  if (p1 && p2) {
                    if (p1.id === p2.id) candidatePools.push([p1]);else candidatePools.push([p1, p2]);
                  }
                };
                for (_iterator4 = _createForOfIteratorHelperLoose(middleTokens); !(_step4 = _iterator4()).done;) {
                  _loop();
                }
              }
              if (!(candidatePools.length > 0)) {
                _context3.next = 39;
                break;
              }
              _context3.next = 16;
              return ftGetTokensMetadata(candidatePools.map(function (cp) {
                return cp.map(function (p) {
                  return p.tokenIds;
                }).flat();
              }).flat(), allTokens);
            case 16:
              tokensMedata = _context3.sent;
              BestPoolPair = candidatePools.length === 1 ? candidatePools[0] : ___default.maxBy(candidatePools, function (poolPair) {
                // only one pool case, only for stable tokens
                if (poolPair.length === 1) {
                  if (isStablePool(stablePoolsDetail, poolPair[0].id)) {
                    var stablePoolThisPair = getStablePoolsThisPair({
                      tokenInId: tokenIn.id,
                      tokenOutId: tokenOut.id,
                      stablePools: stablePools
                    })[0];
                    var stablePoolDetailThisPair = stablePoolsDetail.find(function (spd) {
                      return spd.id === stablePoolThisPair.id;
                    });
                    return Number(getStablePoolEstimate({
                      tokenIn: tokenIn,
                      tokenOut: tokenOut,
                      stablePool: stablePoolDetailThisPair,
                      amountIn: amountIn,
                      pool: poolPair[0]
                    }).estimate);
                  } else {
                    return Number(getSimplePoolEstimate({
                      tokenIn: tokenIn,
                      tokenOut: tokenOut,
                      amountIn: amountIn,
                      pool: poolPair[0]
                    }).estimate);
                  }
                }
                var tmpPool1 = poolPair[0],
                  tmpPool2 = poolPair[1];
                var tokenMidId = poolPair[0].tokenIds.find(function (t) {
                  return poolPair[1].tokenIds.includes(t);
                });
                var tokenMidMeta = tokensMedata[tokenMidId];
                var estimate1 = _extends({}, isStablePool(stablePoolsDetail, tmpPool1.id) ? getStablePoolEstimate({
                  tokenIn: tokenIn,
                  tokenOut: tokenMidMeta,
                  amountIn: amountIn,
                  stablePool: stablePoolsDetailById[tmpPool1.id],
                  pool: tmpPool1
                }) : getSimplePoolEstimate({
                  tokenIn: tokenIn,
                  tokenOut: tokenMidMeta,
                  amountIn: amountIn,
                  pool: tmpPool1
                }), {
                  status: exports.PoolMode.SMART
                });
                var estimate2 = _extends({}, isStablePool(stablePoolsDetail, tmpPool2.id) ? getStablePoolEstimate({
                  tokenIn: tokenMidMeta,
                  tokenOut: tokenOut,
                  amountIn: estimate1.estimate,
                  stablePool: stablePoolsDetailById[tmpPool2.id],
                  pool: tmpPool2
                }) : getSimplePoolEstimate({
                  tokenIn: tokenMidMeta,
                  tokenOut: tokenOut,
                  pool: tmpPool2,
                  amountIn: estimate1.estimate
                }), {
                  status: exports.PoolMode.SMART
                });
                return Number(estimate2.estimate);
              }); // one pool case only get best price
              if (BestPoolPair) {
                _context3.next = 20;
                break;
              }
              return _context3.abrupt("return", {
                actions: [],
                estimate: '0'
              });
            case 20:
              if (!(BestPoolPair.length === 1)) {
                _context3.next = 26;
                break;
              }
              bestPool = BestPoolPair[0];
              _context3.next = 24;
              return getPoolEstimate({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                amountIn: amountIn,
                pool: bestPool,
                stablePoolDetail: stablePoolsDetailById[bestPool.id]
              });
            case 24:
              estimate = _context3.sent;
              return _context3.abrupt("return", {
                actions: [_extends({}, estimate, {
                  status: exports.PoolMode.STABLE,
                  pool: _extends({}, estimate.pool, {
                    partialAmountIn: parsedAmountIn
                  }),
                  tokens: [tokenIn, tokenOut],
                  inputToken: tokenIn.id,
                  outputToken: tokenOut.id,
                  totalInputAmount: toNonDivisibleNumber(tokenIn.decimals, amountIn)
                })],
                estimate: estimate.estimate
              });
            case 26:
              pool1 = BestPoolPair[0];
              pool2 = BestPoolPair[1];
              tokenMidId = BestPoolPair[0].tokenIds.find(function (t) {
                return BestPoolPair[1].tokenIds.includes(t);
              });
              _context3.t0 = allTokens[tokenMidId];
              if (_context3.t0) {
                _context3.next = 34;
                break;
              }
              _context3.next = 33;
              return ftGetTokenMetadata(tokenMidId, 'hybridSmartRoutingEstimate');
            case 33:
              _context3.t0 = _context3.sent;
            case 34:
              tokenMidMeta = _context3.t0;
              estimate1 = _extends({}, isStablePool(stablePoolsDetail, pool1.id) ? getStablePoolEstimate({
                tokenIn: tokenIn,
                tokenOut: tokenMidMeta,
                amountIn: amountIn,
                stablePool: stablePoolsDetailById[pool1.id],
                pool: pool1
              }) : getSimplePoolEstimate({
                tokenIn: tokenIn,
                tokenOut: tokenMidMeta,
                amountIn: amountIn,
                pool: pool1
              }), {
                tokens: [tokenIn, tokenMidMeta, tokenOut],
                inputToken: tokenIn.id,
                outputToken: tokenMidMeta.id,
                status: exports.PoolMode.SMART
              });
              estimate1.pool = _extends({}, estimate1.pool, {
                partialAmountIn: parsedAmountIn
              });
              estimate2 = _extends({}, isStablePool(stablePoolsDetail, pool2.id) ? getStablePoolEstimate({
                tokenIn: tokenMidMeta,
                tokenOut: tokenOut,
                amountIn: estimate1.estimate,
                stablePool: stablePoolsDetailById[pool2.id],
                pool: pool2
              }) : getSimplePoolEstimate({
                tokenIn: tokenMidMeta,
                tokenOut: tokenOut,
                amountIn: estimate1.estimate,
                pool: pool2
              }), {
                tokens: [tokenIn, tokenMidMeta, tokenOut],
                inputToken: tokenMidMeta.id,
                outputToken: tokenOut.id,
                status: exports.PoolMode.SMART
              });
              return _context3.abrupt("return", {
                actions: [estimate1, estimate2],
                estimate: estimate2.estimate
              });
            case 39:
              return _context3.abrupt("return", {
                actions: [],
                estimate: '0'
              });
            case 40:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _getHybridStableSmart.apply(this, arguments);
  }
  var estimateSwap = /*#__PURE__*/function () {
    var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref8) {
      var tokenIn, tokenOut, amountIn, simplePools, options, _ref10, enableSmartRouting, stablePools, stablePoolsDetail, parsedAmountIn, singleRouteEstimate, estimate, inputPools, allTokens, simplePoolSmartRoutingActions, simplePoolSmartRoutingEstimate, hybridSmartRoutingRes, hybridSmartRoutingEstimate, _singleRouteEstimate, _singleRouteEstimate$, _singleRouteEstimate2, _singleRouteEstimate3;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tokenIn = _ref8.tokenIn, tokenOut = _ref8.tokenOut, amountIn = _ref8.amountIn, simplePools = _ref8.simplePools, options = _ref8.options;
              if (!(tokenIn.id === tokenOut.id)) {
                _context2.next = 3;
                break;
              }
              throw SameInputTokenError;
            case 3:
              if (!ONLY_ZEROS.test(amountIn)) {
                _context2.next = 5;
                break;
              }
              throw ZeroInputError;
            case 5:
              _ref10 = options || {}, enableSmartRouting = _ref10.enableSmartRouting, stablePools = _ref10.stablePools, stablePoolsDetail = _ref10.stablePoolsDetail;
              parsedAmountIn = toNonDivisibleNumber(tokenIn.decimals, amountIn);
              singleRouteEstimate = [];
              _context2.prev = 8;
              estimate = singlePoolSwap({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                simplePools: simplePools,
                amountIn: amountIn,
                stablePools: stablePoolsDetail
              });
              singleRouteEstimate = [_extends({}, estimate, {
                status: exports.PoolMode.PARALLEL,
                pool: _extends({}, estimate == null ? void 0 : estimate.pool, {
                  partialAmountIn: parsedAmountIn
                }),
                totalInputAmount: toNonDivisibleNumber(tokenIn.decimals, amountIn),
                tokens: [tokenIn, tokenOut]
              })];
              if (enableSmartRouting) {
                _context2.next = 13;
                break;
              }
              return _context2.abrupt("return", singleRouteEstimate);
            case 13:
              _context2.next = 19;
              break;
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](8);
              if (enableSmartRouting) {
                _context2.next = 19;
                break;
              }
              throw _context2.t0;
            case 19:
              inputPools = simplePools.map(function (p) {
                return poolFormatter(p);
              });
              _context2.next = 22;
              return getTokensTiny();
            case 22:
              allTokens = _context2.sent;
              _context2.next = 25;
              return stableSmart(inputPools, tokenIn.id, tokenOut.id, parsedAmountIn, allTokens);
            case 25:
              simplePoolSmartRoutingActions = _context2.sent;
              simplePoolSmartRoutingEstimate = getExpectedOutputFromActionsORIG(simplePoolSmartRoutingActions, tokenOut.id).toString();
              _context2.next = 29;
              return getHybridStableSmart(tokenIn, tokenOut, amountIn, stablePools || [], stablePoolsDetail || [], simplePools, allTokens);
            case 29:
              hybridSmartRoutingRes = _context2.sent;
              hybridSmartRoutingEstimate = hybridSmartRoutingRes.estimate.toString();
              if (!new Big(simplePoolSmartRoutingEstimate || '0').gte(hybridSmartRoutingEstimate || '0')) {
                _context2.next = 39;
                break;
              }
              if (simplePoolSmartRoutingActions != null && simplePoolSmartRoutingActions.length) {
                _context2.next = 34;
                break;
              }
              throw NoPoolError;
            case 34:
              if (!(typeof singleRouteEstimate !== 'undefined' && singleRouteEstimate && (_singleRouteEstimate = singleRouteEstimate) != null && (_singleRouteEstimate$ = _singleRouteEstimate[0]) != null && _singleRouteEstimate$.estimate && new Big(singleRouteEstimate[0].estimate || '0').gt(simplePoolSmartRoutingEstimate || '0'))) {
                _context2.next = 36;
                break;
              }
              return _context2.abrupt("return", singleRouteEstimate);
            case 36:
              return _context2.abrupt("return", simplePoolSmartRoutingActions);
            case 39:
              if (!(typeof singleRouteEstimate !== 'undefined' && singleRouteEstimate && (_singleRouteEstimate2 = singleRouteEstimate) != null && (_singleRouteEstimate3 = _singleRouteEstimate2[0]) != null && _singleRouteEstimate3.estimate && new Big(singleRouteEstimate[0].estimate || '0').gt(hybridSmartRoutingEstimate || '0'))) {
                _context2.next = 41;
                break;
              }
              return _context2.abrupt("return", singleRouteEstimate);
            case 41:
              return _context2.abrupt("return", hybridSmartRoutingRes.actions);
            case 42:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 15]]);
    }));
    return function estimateSwap(_x9) {
      return _ref9.apply(this, arguments);
    };
  }();

  var parsePool = function parsePool(pool, id) {
    return {
      id: Number(typeof id === 'number' ? id : pool.id),
      tokenIds: pool.token_account_ids,
      supplies: pool.amounts.reduce(function (acc, amount, i) {
        acc[pool.token_account_ids[i]] = amount;
        return acc;
      }, {}),
      fee: pool.total_fee,
      shareSupply: pool.shares_total_supply,
      tvl: pool.tvl,
      token0_ref_price: pool.token0_ref_price,
      pool_kind: pool.pool_kind
    };
  };
  var poolFormatter = function poolFormatter(pool) {
    return {
      id: pool.id,
      token1Id: pool.tokenIds[0],
      token2Id: pool.tokenIds[1],
      token1Supply: pool.supplies[pool.tokenIds[0]],
      token2Supply: pool.supplies[pool.tokenIds[1]],
      fee: pool.fee,
      shares: pool.shareSupply,
      token0_price: pool.token0_ref_price || '0'
    };
  };
  var isStablePoolToken = function isStablePoolToken(stablePools, tokenId) {
    return stablePools.map(function (p) {
      return p.token_account_ids;
    }).flat().includes(tokenId.toString());
  };
  var isStablePool = function isStablePool(stablePools, poolId) {
    return stablePools.map(function (p) {
      return p.id.toString();
    }).includes(poolId.toString());
  };
  var getStablePoolDecimal = function getStablePoolDecimal(stablePool) {
    return stablePool.pool_kind === 'RATED_SWAP' ? RATED_POOL_LP_TOKEN_DECIMALS : STABLE_LP_TOKEN_DECIMALS;
  };
  var round = function round(decimals, minAmountOut) {
    return Number.isInteger(Number(minAmountOut)) ? minAmountOut : Math.ceil(Math.round(Number(minAmountOut) * Math.pow(10, decimals)) / Math.pow(10, decimals)).toString();
  };
  var convertToPercentDecimal = function convertToPercentDecimal(percent) {
    return math.divide(percent, 100);
  };
  var percentOf = function percentOf(percent, num) {
    return math.evaluate(convertToPercentDecimal(percent) + " * " + num);
  };
  var percentLess = function percentLess(percent, num) {
    return math.format(math.evaluate(num + " - " + percentOf(percent, num)), {
      notation: 'fixed'
    });
  };
  var getGas = function getGas(gas) {
    return gas ? new BN(gas) : new BN('100000000000000');
  };
  var getAmount = function getAmount(amount) {
    return amount ? new BN(nearApiJs.utils.format.parseNearAmount(amount) || '0') : new BN('0');
  };
  var ONLY_ZEROS = /^0*\.?0*$/;
  var toReadableNumber = function toReadableNumber(decimals, number) {
    if (number === void 0) {
      number = '0';
    }
    if (!decimals) return number;
    var wholeStr = number.substring(0, number.length - decimals) || '0';
    var fractionStr = number.substring(number.length - decimals).padStart(decimals, '0').substring(0, decimals);
    return (wholeStr + "." + fractionStr).replace(/\.?0+$/, '');
  };
  var toNonDivisibleNumber = function toNonDivisibleNumber(decimals, number) {
    if (decimals === null || decimals === undefined) return number;
    var _number$split = number.split('.'),
      wholePart = _number$split[0],
      _number$split$ = _number$split[1],
      fracPart = _number$split$ === void 0 ? '' : _number$split$;
    return ("" + wholePart + fracPart.padEnd(decimals, '0').slice(0, decimals)).replace(/^0+/, '').padStart(1, '0');
  };
  var scientificNotationToString = function scientificNotationToString(strParam) {
    var _strParam$match, _strParam$match2;
    var flag = /e/.test(strParam);
    if (!flag || !strParam) return strParam;
    var sysbol = true;
    if (/e-/.test(strParam)) {
      sysbol = false;
    }
    var negative = Number(strParam) < 0 ? '-' : '';
    var index = Number((_strParam$match = strParam.match(/\d+$/)) == null ? void 0 : _strParam$match[0]);
    var basis = (_strParam$match2 = strParam.match(/[\d\.]+/)) == null ? void 0 : _strParam$match2[0];
    if (!index || !basis) return strParam;
    var ifFraction = basis.includes('.');
    var wholeStr;
    var fractionStr;
    if (ifFraction) {
      wholeStr = basis.split('.')[0];
      fractionStr = basis.split('.')[1];
    } else {
      wholeStr = basis;
      fractionStr = '';
    }
    if (sysbol) {
      if (!ifFraction) {
        return negative + wholeStr.padEnd(index + wholeStr.length, '0');
      } else {
        if (fractionStr.length <= index) {
          return negative + wholeStr + fractionStr.padEnd(index, '0');
        } else {
          return negative + wholeStr + fractionStr.substring(0, index) + '.' + fractionStr.substring(index);
        }
      }
    } else {
      if (!ifFraction) return negative + wholeStr.padStart(index + wholeStr.length, '0').replace(/^0/, '0.');else {
        return negative + wholeStr.padStart(index + wholeStr.length, '0').replace(/^0/, '0.') + fractionStr;
      }
    }
  };
  var formatWithCommas = function formatWithCommas(value) {
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(value)) {
      value = value.replace(pattern, '$1,$2');
    }
    return value;
  };
  var toPrecision = function toPrecision(number, precision, withCommas, atLeastOne) {
    if (withCommas === void 0) {
      withCommas = false;
    }
    if (atLeastOne === void 0) {
      atLeastOne = true;
    }
    var _number$split2 = number.split('.'),
      whole = _number$split2[0],
      _number$split2$ = _number$split2[1],
      decimal = _number$split2$ === void 0 ? '' : _number$split2$;
    var str = ((withCommas ? formatWithCommas(whole) : whole) + "." + decimal.slice(0, precision)).replace(/\.$/, '');
    if (atLeastOne && Number(str) === 0 && str.length > 1) {
      var n = str.lastIndexOf('0');
      str = str.slice(0, n) + str.slice(n).replace('0', '1');
    }
    return str;
  };
  var transformTransactions = function transformTransactions(transactions, AccountId) {
    var parsedTransactions = transactions.map(function (t) {
      return {
        signerId: AccountId,
        receiverId: t.receiverId,
        actions: t.functionCalls.map(function (fc) {
          return {
            type: 'FunctionCall',
            params: {
              methodName: fc.methodName,
              args: fc.args || {},
              gas: getGas(fc.gas).toNumber().toFixed(),
              deposit: nearApiJs.utils.format.parseNearAmount(fc.amount || '0')
            }
          };
        })
      };
    });
    return parsedTransactions;
  };
  var WalletSelectorTransactions = function WalletSelectorTransactions(transactions, AccountId) {
    var parsedTransactions = transactions.map(function (t) {
      return {
        signerId: AccountId,
        receiverId: t.receiverId,
        actions: t.functionCalls.map(function (fc) {
          return {
            type: 'FunctionCall',
            params: {
              methodName: fc.methodName,
              args: fc.args || {},
              gas: getGas(fc.gas).toNumber().toFixed(),
              deposit: nearApiJs.utils.format.parseNearAmount(fc.amount || '0')
            }
          };
        })
      };
    });
    return {
      transactions: parsedTransactions
    };
  };
  var separateRoutes = function separateRoutes(actions, outputToken) {
    var res = [];
    var curRoute = [];
    for (var i in actions) {
      curRoute.push(actions[i]);
      if (actions[i].outputToken === outputToken) {
        res.push(curRoute);
        curRoute = [];
      }
    }
    return res;
  };
  var calculateExchangeRate = function calculateExchangeRate(from, to, precision) {
    return math.floor(math.evaluate(to + " / " + from), precision || 4).toString();
  };
  var getAvgFee = function getAvgFee(estimates, outputToken, parsedAmountIn) {
    if (!estimates || estimates.length === 0) {
      return 0;
    }
    var routes = separateRoutes(estimates, outputToken);
    var fee = new Big(0);
    routes.forEach(function (r) {
      var partialAmountIn = r[0].pool.partialAmountIn || '0';
      fee = fee.plus(r.reduce(function (acc, cur) {
        return acc.plus(cur.pool.fee || cur.pool.total_fee || 0);
      }, new Big(0)).times(partialAmountIn).div(ONLY_ZEROS.test(parsedAmountIn) ? '1' : parsedAmountIn));
    });
    return fee.toNumber();
  };
  var getAccountName = function getAccountName(AccountId) {
    if (!AccountId) return AccountId;
    var _AccountId$split = AccountId.split('.'),
      account = _AccountId$split[0],
      network = _AccountId$split[1];
    var niceAccountId = account.slice(0, 10) + "..." + (network || '');
    return account.length > 10 ? niceAccountId : AccountId;
  };
  var symbolsArr = ['e', 'E', '+', '-'];
  var multiply = function multiply(factor1, factor2) {
    return math.format(math.evaluate(factor1 + " * " + factor2), {
      notation: 'fixed'
    });
  };
  var toInternationalCurrencySystemLongString = function toInternationalCurrencySystemLongString(labelValue, percent) {
    return Math.abs(Number(labelValue)) >= 1.0e9 ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(percent || 2) + 'B' : Math.abs(Number(labelValue)) >= 1.0e6 ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(percent || 2) + 'M' : Math.abs(Number(labelValue)).toFixed(percent || 2);
  };
  var percentOfBigNumber = function percentOfBigNumber(percent, num, precision) {
    var valueBig = math.bignumber(num);
    var percentBig = math.bignumber(percent).div(100);
    return toPrecision(scientificNotationToString(valueBig.mul(percentBig).toString()), precision);
  };
  var toRealSymbol = function toRealSymbol(symbol) {
    if (!symbol) return '';
    var blackList = ['nUSDO'];
    if (symbol === 'nWETH' || symbol === 'WETH') return 'wETH';
    if (blackList.includes(symbol)) return symbol;
    return symbol.charAt(0) === 'n' && symbol.charAt(1) === symbol.charAt(1).toUpperCase() ? symbol.substring(1) : symbol;
  };
  var calculateFeeCharge = function calculateFeeCharge(fee, total) {
    return math.floor(math.evaluate("(" + fee + " / " + FEE_DIVISOR + ") * " + total), 3);
  };
  var calculateFeePercent = function calculateFeePercent(fee) {
    return math.divide(fee, 100);
  };
  function getExpectedOutputFromSwapTodos(estimates, outputToken) {
    if (!estimates || estimates.length === 0) return new Big(0);
    return estimates.filter(function (item) {
      return item.outputToken === outputToken;
    }).map(function (item) {
      return new Big(item.estimate || 0);
    }).reduce(function (a, b) {
      return a.plus(b);
    }, new Big(0));
  }
  var calculateAmountReceived = function calculateAmountReceived(pool, amountIn, tokenIn, tokenOut) {
    var partialAmountIn = toReadableNumber(tokenIn.decimals, amountIn);
    var in_balance = toReadableNumber(tokenIn.decimals, pool.supplies[tokenIn.id]);
    var out_balance = toReadableNumber(tokenOut.decimals, pool.supplies[tokenOut.id]);
    var big_in_balance = math.bignumber(in_balance);
    var big_out_balance = math.bignumber(out_balance);
    var constant_product = big_in_balance.mul(big_out_balance);
    var new_in_balance = big_in_balance.plus(math.bignumber(partialAmountIn));
    var new_out_balance = constant_product.div(new_in_balance);
    var tokenOutReceived = big_out_balance.minus(new_out_balance);
    return tokenOutReceived;
  };
  var calculateMarketPrice = function calculateMarketPrice(pool, tokenIn, tokenOut) {
    var cur_in_balance = toReadableNumber(tokenIn.decimals, pool.supplies[tokenIn.id]);
    var cur_out_balance = toReadableNumber(tokenOut.decimals, pool.supplies[tokenOut.id]);
    return math.evaluate("(" + cur_in_balance + " / " + cur_out_balance + ")");
  };
  var calculateSmartRoutingPriceImpact = function calculateSmartRoutingPriceImpact(tokenInAmount, swapTodos, tokenIn, tokenMid, tokenOut, stablePools) {
    var _swapTodos$0$pool$rat, _swapTodos$0$pool$rat2, _swapTodos$1$pool$rat, _swapTodos$1$pool$rat2;
    var isPool1StablePool = isStablePool(stablePools, swapTodos[0].pool.id);
    var isPool2StablePool = isStablePool(stablePools, swapTodos[1].pool.id);
    var marketPrice1 = isPool1StablePool ? (Number((_swapTodos$0$pool$rat = swapTodos[0].pool.rates) == null ? void 0 : _swapTodos$0$pool$rat[tokenMid.id]) / Number((_swapTodos$0$pool$rat2 = swapTodos[0].pool.rates) == null ? void 0 : _swapTodos$0$pool$rat2[tokenIn.id])).toString() : calculateMarketPrice(swapTodos[0].pool, tokenIn, tokenMid);
    var marketPrice2 = isPool2StablePool ? (Number((_swapTodos$1$pool$rat = swapTodos[1].pool.rates) == null ? void 0 : _swapTodos$1$pool$rat[tokenOut.id]) / Number((_swapTodos$1$pool$rat2 = swapTodos[1].pool.rates) == null ? void 0 : _swapTodos$1$pool$rat2[tokenMid.id])).toString() : calculateMarketPrice(swapTodos[1].pool, tokenMid, tokenOut);
    var generalMarketPrice = math.evaluate(marketPrice1 + " * " + marketPrice2);
    var tokenMidReceived = isPool1StablePool ? swapTodos[0].noFeeAmountOut : calculateAmountReceived(swapTodos[0].pool, toNonDivisibleNumber(tokenIn.decimals, tokenInAmount), tokenIn, tokenMid);
    var formattedTokenMidReceived = scientificNotationToString((tokenMidReceived == null ? void 0 : tokenMidReceived.toString()) || '0');
    var stableOutPool2;
    if (isPool2StablePool) {
      var stablePool2 = stablePools.find(function (p) {
        return p.id === swapTodos[1].pool.id;
      }) || stablePools[0];
      var stableOut = getSwappedAmount(tokenMid.id, tokenOut.id, formattedTokenMidReceived, stablePool2, getStablePoolDecimal(stablePool2));
      stableOutPool2 = stableOut[0] < 0 ? '0' : toPrecision(scientificNotationToString(stableOut[2].toString()), 0);
      stableOutPool2 = toReadableNumber(getStablePoolDecimal(stablePool2), stableOutPool2);
    }
    var tokenOutReceived = isPool2StablePool ? stableOutPool2 : calculateAmountReceived(swapTodos[1].pool, toNonDivisibleNumber(tokenMid.decimals, formattedTokenMidReceived), tokenMid, tokenOut);
    var newMarketPrice = math.evaluate(tokenInAmount + " / " + tokenOutReceived);
    var PriceImpact = new Big(newMarketPrice).minus(new Big(generalMarketPrice)).div(newMarketPrice).times(100).toString();
    return scientificNotationToString(PriceImpact);
  };
  var percent = function percent(numerator, denominator) {
    return math.evaluate("(" + numerator + " / " + denominator + ") * 100");
  };
  var calcStableSwapPriceImpact = function calcStableSwapPriceImpact(from, to, marketPrice) {
    if (marketPrice === void 0) {
      marketPrice = '1';
    }
    var newMarketPrice = math.evaluate(from + " / " + to);
    return math.format(percent(math.evaluate(newMarketPrice + " - " + marketPrice), newMarketPrice), {
      notation: 'fixed'
    });
  };
  var calculatePriceImpact = function calculatePriceImpact(pools, tokenIn, tokenOut, tokenInAmount) {
    var in_balance = '0',
      out_balance = '0';
    pools.forEach(function (pool, i) {
      var cur_in_balance = toReadableNumber(tokenIn.decimals, pool.supplies[tokenIn.id]);
      var cur_out_balance = toReadableNumber(tokenOut.decimals, pool.supplies[tokenOut.id]);
      in_balance = new Big(in_balance).plus(cur_in_balance).toString();
      out_balance = new Big(out_balance).plus(cur_out_balance).toString();
    });
    var finalMarketPrice = math.evaluate("(" + in_balance + " / " + out_balance + ")");
    var separatedReceivedAmount = pools.map(function (pool) {
      return calculateAmountReceived(pool, pool.partialAmountIn || '0', tokenIn, tokenOut);
    });
    var finalTokenOutReceived = math.sum.apply(math, separatedReceivedAmount);
    var newMarketPrice = math.evaluate(tokenInAmount + " / " + finalTokenOutReceived);
    var PriceImpact = new Big(newMarketPrice).minus(new Big(finalMarketPrice)).div(newMarketPrice).times(100).toString();
    return scientificNotationToString(PriceImpact);
  };
  function calculateSmartRoutesV2PriceImpact(actions, outputToken, tokenInPara, stablePools) {
    var _routes$0$0$tokens;
    var routes = separateRoutes(actions, outputToken);
    var tokenIn = ((_routes$0$0$tokens = routes[0][0].tokens) == null ? void 0 : _routes$0$0$tokens[0]) || tokenInPara;
    var totalInputAmount = routes[0][0].totalInputAmount;
    var priceImpactForRoutes = routes.map(function (r, i) {
      var readablePartialAmountIn = toReadableNumber(tokenIn.decimals, r[0].pool.partialAmountIn);
      if (r.length > 1) {
        var _r$0$tokens, _r$0$tokens2, _r$0$tokens3;
        var _tokenIn = (_r$0$tokens = r[0].tokens) == null ? void 0 : _r$0$tokens[0];
        var tokenMid = (_r$0$tokens2 = r[0].tokens) == null ? void 0 : _r$0$tokens2[1];
        var tokenOut = (_r$0$tokens3 = r[0].tokens) == null ? void 0 : _r$0$tokens3[2];
        return calculateSmartRoutingPriceImpact(readablePartialAmountIn, routes[i], _tokenIn || tokenInPara, tokenMid || tokenInPara, tokenOut || tokenInPara, stablePools);
      } else {
        var _r$0$pool$rates, _r$0$pool$rates2, _r$0$tokens4, _r$0$tokens5;
        return isStablePool(stablePools, r[0].pool.id) ? calcStableSwapPriceImpact(readablePartialAmountIn, r[0].noFeeAmountOut || '0', (Number((_r$0$pool$rates = r[0].pool.rates) == null ? void 0 : _r$0$pool$rates[outputToken]) / Number((_r$0$pool$rates2 = r[0].pool.rates) == null ? void 0 : _r$0$pool$rates2[tokenIn.id])).toString()) : calculatePriceImpact([r[0].pool], ((_r$0$tokens4 = r[0].tokens) == null ? void 0 : _r$0$tokens4[0]) || tokenIn, ((_r$0$tokens5 = r[0].tokens) == null ? void 0 : _r$0$tokens5[1]) || tokenIn, readablePartialAmountIn);
      }
    });
    var rawRes = priceImpactForRoutes.reduce(function (pre, cur, i) {
      return pre.plus(new Big(routes[i][0].pool.partialAmountIn || '0').div(new Big(totalInputAmount || '1')).mul(cur));
    }, new Big(0));
    return scientificNotationToString(rawRes.toString());
  }
  var getPriceImpact = function getPriceImpact(_ref) {
    var estimates = _ref.estimates,
      tokenIn = _ref.tokenIn,
      tokenOut = _ref.tokenOut,
      amountIn = _ref.amountIn,
      stablePools = _ref.stablePools;
    var PriceImpactValue = '0';
    var priceImpactValueSmartRouting = '0';
    var priceImpactValueSmartRoutingV2 = '0';
    if (typeof estimates === 'undefined') return '0';
    try {
      if ((estimates == null ? void 0 : estimates.length) === 2 && estimates[0].status === exports.PoolMode.SMART) {
        var _estimates$0$tokens;
        priceImpactValueSmartRouting = calculateSmartRoutingPriceImpact(amountIn, estimates, tokenIn, ((_estimates$0$tokens = estimates[0].tokens) == null ? void 0 : _estimates$0$tokens[1]) || tokenIn, tokenOut, stablePools);
      } else if ((estimates == null ? void 0 : estimates.length) === 1 && estimates[0].status === exports.PoolMode.STABLE) {
        var _estimates$0$pool$rat, _estimates$0$pool$rat2;
        priceImpactValueSmartRouting = calcStableSwapPriceImpact(toReadableNumber(tokenIn.decimals, estimates[0].totalInputAmount), estimates[0].noFeeAmountOut || '0', (Number((_estimates$0$pool$rat = estimates[0].pool.rates) == null ? void 0 : _estimates$0$pool$rat[tokenOut.id]) / Number((_estimates$0$pool$rat2 = estimates[0].pool.rates) == null ? void 0 : _estimates$0$pool$rat2[tokenIn.id])).toString());
      } else priceImpactValueSmartRouting = '0';
    } catch (error) {
      priceImpactValueSmartRouting = '0';
    }
    try {
      priceImpactValueSmartRoutingV2 = calculateSmartRoutesV2PriceImpact(estimates, tokenOut.id, tokenIn, stablePools);
    } catch (error) {
      priceImpactValueSmartRoutingV2 = '0';
    }
    try {
      if (estimates[0].status === exports.PoolMode.SMART || estimates[0].status === exports.PoolMode.STABLE) {
        PriceImpactValue = priceImpactValueSmartRouting;
      } else {
        PriceImpactValue = priceImpactValueSmartRoutingV2;
      }
      return PriceImpactValue;
    } catch (error) {
      return '0';
    }
  };
  var subtraction = function subtraction(initialValue, toBeSubtract) {
    return math.format(math.evaluate(initialValue + " - " + toBeSubtract), {
      notation: 'fixed'
    });
  };
  function getPoolAllocationPercents(pools) {
    if (pools.length === 1) return ['100'];
    if (pools) {
      var partialAmounts = pools.map(function (pool) {
        return math.bignumber(pool.partialAmountIn);
      });
      var ps = new Array(partialAmounts.length).fill('0');
      var sum = partialAmounts.length === 1 ? partialAmounts[0] : math.sum.apply(math, partialAmounts);
      var sortedAmount = _.sortBy(partialAmounts, function (p) {
        return Number(p);
      });
      var minIndexes = [];
      for (var k = 0; k < sortedAmount.length - 1; k++) {
        var minIndex = -1;
        for (var j = 0; j < partialAmounts.length; j++) {
          if (partialAmounts[j].eq(sortedAmount[k]) && !minIndexes.includes(j)) {
            minIndex = j;
            minIndexes.push(j);
            break;
          }
        }
        var res = math.round(percent(partialAmounts[minIndex].toString(), sum)).toString();
        if (Number(res) === 0) {
          ps[minIndex] = '1';
        } else {
          ps[minIndex] = res;
        }
      }
      var finalPIndex = ps.indexOf('0');
      ps[finalPIndex] = subtraction('100', ps.length === 1 ? Number(ps[0]) : math.sum.apply(math, ps.map(function (p) {
        return Number(p);
      }))).toString();
      return ps;
    } else {
      return [];
    }
  }
  var isMobile = function isMobile() {
    return window.screen.width <= 600;
  };
  function divide(numerator, denominator) {
    return math.format(math.evaluate(numerator + " / " + denominator), {
      notation: 'fixed'
    });
  }
  var getMax = function getMax(id, amount) {
    return id !== exports.WRAP_NEAR_CONTRACT_ID ? amount : Number(amount) <= 0.5 ? '0' : String(Number(amount) - 0.5);
  };
  function getPointByPrice(pointDelta, price, decimalRate, noNeedSlot) {
    var point = Math.log(+price * decimalRate) / Math.log(CONSTANT_D);
    var point_int = Math.round(point);
    var point_int_slot = point_int;
    if (!noNeedSlot) {
      point_int_slot = Math.floor(point_int / pointDelta) * pointDelta;
    }
    if (point_int_slot < POINTLEFTRANGE) {
      return POINTLEFTRANGE;
    } else if (point_int_slot > POINTRIGHTRANGE) {
      return 800000;
    }
    return point_int_slot;
  }
  var feeToPointDelta = function feeToPointDelta(fee) {
    switch (fee) {
      case 100:
        return 1;
      case 400:
        return 8;
      case 2000:
        return 40;
      case 10000:
        return 200;
      default:
        throw NoFeeToPool(fee);
    }
  };
  var priceToPoint = function priceToPoint(_ref2) {
    var tokenA = _ref2.tokenA,
      tokenB = _ref2.tokenB,
      amountA = _ref2.amountA,
      amountB = _ref2.amountB,
      fee = _ref2.fee;
    if (DCL_POOL_FEE_LIST.indexOf(fee) === -1) throw NoFeeToPool(fee);
    var decimal_price_A_by_B = new Big(amountB).div(amountA);
    var undecimal_price_A_by_B = decimal_price_A_by_B.times(new Big(10).pow(tokenB.decimals)).div(new Big(10).pow(tokenA.decimals));
    var pointDelta = feeToPointDelta(fee);
    var price = decimal_price_A_by_B;
    var decimalRate = new Big(10).pow(tokenB.decimals).div(new Big(10).pow(tokenA.decimals)).toNumber();
    return getPointByPrice(pointDelta, scientificNotationToString(price.toString()), decimalRate);
  };
  var pointToPrice = function pointToPrice(_ref3) {
    var tokenA = _ref3.tokenA,
      tokenB = _ref3.tokenB,
      point = _ref3.point;
    var undecimal_price = Math.pow(CONSTANT_D, point);
    var decimal_price_A_by_B = new Big(undecimal_price).times(new Big(10).pow(tokenA.decimals)).div(new Big(10).pow(tokenB.decimals));
    return scientificNotationToString(decimal_price_A_by_B.toString());
  };
  var registerAccountOnToken = function registerAccountOnToken(AccountId) {
    return {
      methodName: 'storage_deposit',
      args: {
        registration_only: true,
        account_id: AccountId
      },
      gas: '30000000000000',
      amount: STORAGE_TO_REGISTER_WITH_MFT
    };
  };

  var getKeyStore = function getKeyStore() {
    return typeof window === 'undefined' ? new nearApiJs.keyStores.InMemoryKeyStore() : new nearApiJs.keyStores.BrowserLocalStorageKeyStore();
  };
  var provider = /*#__PURE__*/new nearApiJs.providers.JsonRpcProvider({
    url: /*#__PURE__*/getConfig().nodeUrl
  });
  var getMemorySigner = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var AccountId, keyPath, credentials, credentialAccountId, myKeyStore, signer;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              AccountId = _ref.AccountId, keyPath = _ref.keyPath;
              _context.prev = 1;
              // const homedir = os.homedir();
              credentials = JSON.parse(fs.readFileSync(keyPath).toString());
              credentialAccountId = credentials == null ? void 0 : credentials.account_id;
              if (credentialAccountId) {
                _context.next = 6;
                break;
              }
              throw NoCredential;
            case 6:
              if (!(credentialAccountId !== AccountId)) {
                _context.next = 8;
                break;
              }
              throw AccountIdMisMatch;
            case 8:
              myKeyStore = new nearApiJs.keyStores.InMemoryKeyStore();
              myKeyStore.setKey(getConfig().networkId, AccountId, nearApiJs.KeyPair.fromString(credentials.private_key));
              signer = new nearApiJs.InMemorySigner(myKeyStore);
              return _context.abrupt("return", signer);
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              throw _context.t0;
            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    }));
    return function getMemorySigner(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var validateAccessKey = function validateAccessKey(transaction, accessKey) {
    if (accessKey.permission === 'FullAccess') {
      return accessKey;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    var _accessKey$permission = accessKey.permission.FunctionCall,
      receiver_id = _accessKey$permission.receiver_id,
      method_names = _accessKey$permission.method_names;
    if (transaction.receiverId !== receiver_id) {
      return null;
    }
    return transaction.actions.every(function (action) {
      if (action.type !== 'FunctionCall') {
        return false;
      }
      var _action$params = action.params,
        methodName = _action$params.methodName,
        deposit = _action$params.deposit;
      if (method_names.length && method_names.includes(methodName)) {
        return false;
      }
      return parseFloat(deposit) <= 0;
    });
  };
  var getSignedTransactionsByMemoryKey = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
      var transactionsRef, AccountId, keyPath, transactions, block, signedTransactions, signer, i, transaction, publicKey, accessKey, tx, _yield$nearTransactio, signedTx;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              transactionsRef = _ref3.transactionsRef, AccountId = _ref3.AccountId, keyPath = _ref3.keyPath;
              transactions = transformTransactions(transactionsRef, AccountId);
              _context2.next = 4;
              return provider.block({
                finality: 'final'
              });
            case 4:
              block = _context2.sent;
              signedTransactions = [];
              _context2.next = 8;
              return getMemorySigner({
                AccountId: AccountId,
                keyPath: keyPath
              });
            case 8:
              signer = _context2.sent;
              i = 0;
            case 10:
              if (!(i < transactions.length)) {
                _context2.next = 31;
                break;
              }
              transaction = transactions[i];
              _context2.next = 14;
              return signer.getPublicKey(AccountId, getConfig().networkId);
            case 14:
              publicKey = _context2.sent;
              if (publicKey) {
                _context2.next = 17;
                break;
              }
              throw NoPuiblicKeyError;
            case 17:
              _context2.next = 19;
              return provider.query({
                request_type: 'view_access_key',
                finality: 'final',
                account_id: AccountId,
                public_key: publicKey.toString()
              });
            case 19:
              accessKey = _context2.sent;
              if (validateAccessKey(transaction, accessKey)) {
                _context2.next = 22;
                break;
              }
              throw InValidAccessKeyError;
            case 22:
              tx = nearApiJs.transactions.createTransaction(AccountId, nearApiJs.utils.PublicKey.from(publicKey.toString()), transactions[i].receiverId, accessKey.nonce + i + 1, transaction.actions.map(function (action) {
                var _action$params2 = action.params,
                  methodName = _action$params2.methodName,
                  args = _action$params2.args,
                  gas = _action$params2.gas,
                  deposit = _action$params2.deposit;
                return nearApiJs.transactions.functionCall(methodName, args, new BN(gas), new BN(deposit));
              }), nearApiJs.utils.serialize.base_decode(block.header.hash));
              _context2.next = 25;
              return nearApiJs.transactions.signTransaction(tx, signer, transactions[i].signerId, getConfig().networkId);
            case 25:
              _yield$nearTransactio = _context2.sent;
              signedTx = _yield$nearTransactio[1];
              signedTransactions.push(signedTx);
            case 28:
              i += 1;
              _context2.next = 10;
              break;
            case 31:
              return _context2.abrupt("return", signedTransactions);
            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function getSignedTransactionsByMemoryKey(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var sendTransactionsByMemoryKey = /*#__PURE__*/function () {
    var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref5) {
      var signedTransactions, results, i;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              signedTransactions = _ref5.signedTransactions;
              _context3.prev = 1;
              results = [];
              i = 0;
            case 4:
              if (!(i < signedTransactions.length)) {
                _context3.next = 13;
                break;
              }
              _context3.t0 = results;
              _context3.next = 8;
              return provider.sendTransaction(signedTransactions[i]);
            case 8:
              _context3.t1 = _context3.sent;
              _context3.t0.push.call(_context3.t0, _context3.t1);
            case 10:
              i += 1;
              _context3.next = 4;
              break;
            case 13:
              return _context3.abrupt("return", results);
            case 16:
              _context3.prev = 16;
              _context3.t2 = _context3["catch"](1);
              throw _context3.t2;
            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 16]]);
    }));
    return function sendTransactionsByMemoryKey(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();

  var BANANA_ID = 'berryclub.ek.near';
  var CHEDDAR_ID = 'token.cheddar.near';
  var CUCUMBER_ID = 'farm.berryclub.ek.near';
  var HAPI_ID = 'd9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near';
  var WOO_ID = '4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near';
  var REPLACE_TOKENS = [BANANA_ID, CHEDDAR_ID, CUCUMBER_ID, HAPI_ID, WOO_ID];
  var near = /*#__PURE__*/new nearApiJs.Near( /*#__PURE__*/_extends({
    keyStore: /*#__PURE__*/getKeyStore(),
    headers: {}
  }, /*#__PURE__*/getConfig()));
  var init_env = function init_env(env, indexerUrl, config) {
    near = new nearApiJs.Near(_extends({
      keyStore: getKeyStore(),
      headers: {}
    }, getConfig(env, indexerUrl, config)));
    return switchEnv();
  };
  var refFiViewFunction = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var methodName, args, nearConnection;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              methodName = _ref.methodName, args = _ref.args;
              _context.next = 3;
              return near.account(exports.REF_FI_CONTRACT_ID);
            case 3:
              nearConnection = _context.sent;
              return _context.abrupt("return", nearConnection.viewFunction(exports.REF_FI_CONTRACT_ID, methodName, args));
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function refFiViewFunction(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var ftViewFunction = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tokenId, _ref3) {
      var methodName, args, nearConnection;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              methodName = _ref3.methodName, args = _ref3.args;
              _context2.next = 3;
              return near.account(exports.REF_FI_CONTRACT_ID);
            case 3:
              nearConnection = _context2.sent;
              return _context2.abrupt("return", nearConnection.viewFunction(tokenId, methodName, args));
            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function ftViewFunction(_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  var ftGetStorageBalance = function ftGetStorageBalance(tokenId, AccountId) {
    if (!AccountId) throw NoAccountIdFound;
    return ftViewFunction(tokenId, {
      methodName: 'storage_balance_of',
      args: {
        account_id: AccountId
      }
    });
  };
  var ftGetBalance = /*#__PURE__*/function () {
    var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tokenId, AccountId) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (AccountId) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", '0');
            case 2:
              if (!(tokenId === 'NEAR')) {
                _context3.next = 4;
                break;
              }
              return _context3.abrupt("return", getAccountNearBalance(AccountId)["catch"](function () {
                return '0';
              }));
            case 4:
              return _context3.abrupt("return", ftViewFunction(tokenId, {
                methodName: 'ft_balance_of',
                args: {
                  account_id: AccountId
                }
              }).then(function (res) {
                return res;
              })["catch"](function () {
                return '0';
              }));
            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function ftGetBalance(_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }();
  var getTotalPools = /*#__PURE__*/function () {
    var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", refFiViewFunction({
                methodName: 'get_number_of_pools'
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return function getTotalPools() {
      return _ref6.apply(this, arguments);
    };
  }();
  var ftGetTokenMetadata = /*#__PURE__*/function () {
    var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, tag) {
      var metadata;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(id === exports.REF_TOKEN_ID)) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return", exports.REF_META_DATA);
            case 2:
              _context5.next = 4;
              return ftViewFunction(id, {
                methodName: 'ft_metadata'
              })["catch"](function () {
                throw TokenNotExistError(id);
              });
            case 4:
              metadata = _context5.sent;
              if (!(!metadata.icon || id === BANANA_ID || id === CHEDDAR_ID || id === CUCUMBER_ID || id === HAPI_ID || id === WOO_ID || id === exports.WRAP_NEAR_CONTRACT_ID)) {
                _context5.next = 7;
                break;
              }
              return _context5.abrupt("return", _extends({}, metadata, {
                icon: icons[id],
                id: id
              }));
            case 7:
              return _context5.abrupt("return", _extends({}, metadata, {
                id: id
              }));
            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return function ftGetTokenMetadata(_x6, _x7) {
      return _ref7.apply(this, arguments);
    };
  }();
  var ftGetTokensMetadata = /*#__PURE__*/function () {
    var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(tokenIds, allTokens) {
      var ids, tokensMetadata;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = tokenIds;
              if (_context6.t0) {
                _context6.next = 5;
                break;
              }
              _context6.next = 4;
              return getGlobalWhitelist();
            case 4:
              _context6.t0 = _context6.sent;
            case 5:
              ids = _context6.t0;
              _context6.next = 8;
              return Promise.all(ids.map(function (id) {
                return (allTokens == null ? void 0 : allTokens[id]) || ftGetTokenMetadata(id)["catch"](function () {
                  return null;
                });
              }));
            case 8:
              tokensMetadata = _context6.sent;
              return _context6.abrupt("return", tokensMetadata.reduce(function (pre, cur, i) {
                var _extends2;
                return _extends({}, pre, (_extends2 = {}, _extends2[ids[i]] = cur, _extends2));
              }, {}));
            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return function ftGetTokensMetadata(_x8, _x9) {
      return _ref8.apply(this, arguments);
    };
  }();
  var getGlobalWhitelist = /*#__PURE__*/function () {
    var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var globalWhitelist;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return refFiViewFunction({
                methodName: 'get_whitelisted_tokens'
              });
            case 2:
              globalWhitelist = _context7.sent;
              return _context7.abrupt("return", Array.from(new Set(globalWhitelist)));
            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return function getGlobalWhitelist() {
      return _ref9.apply(this, arguments);
    };
  }();
  var getUserRegisteredTokens = /*#__PURE__*/function () {
    var _ref10 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(AccountId) {
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (AccountId) {
                _context8.next = 2;
                break;
              }
              return _context8.abrupt("return", []);
            case 2:
              return _context8.abrupt("return", refFiViewFunction({
                methodName: 'get_user_whitelisted_tokens',
                args: {
                  account_id: AccountId
                }
              }));
            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));
    return function getUserRegisteredTokens(_x10) {
      return _ref10.apply(this, arguments);
    };
  }();
  var getAccountNearBalance = /*#__PURE__*/function () {
    var _ref11 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(accountId) {
      var provider;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              provider = new nearApiJs.providers.JsonRpcProvider({
                url: getConfig().nodeUrl
              });
              return _context9.abrupt("return", provider.query({
                request_type: 'view_account',
                finality: 'final',
                account_id: accountId
              }).then(function (data) {
                return data.amount;
              }));
            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));
    return function getAccountNearBalance(_x11) {
      return _ref11.apply(this, arguments);
    };
  }();
  var nearDepositTransaction = function nearDepositTransaction(amount) {
    var transaction = {
      receiverId: exports.WRAP_NEAR_CONTRACT_ID,
      functionCalls: [{
        methodName: 'near_deposit',
        args: {},
        gas: '50000000000000',
        amount: amount
      }]
    };
    return transaction;
  };
  var nearWithdrawTransaction = function nearWithdrawTransaction(amount) {
    var transaction = {
      receiverId: exports.WRAP_NEAR_CONTRACT_ID,
      functionCalls: [{
        methodName: 'near_withdraw',
        args: {
          amount: nearApiJs.utils.format.parseNearAmount(amount)
        },
        amount: ONE_YOCTO_NEAR
      }]
    };
    return transaction;
  };
  var refDCLSwapViewFunction = /*#__PURE__*/function () {
    var _ref13 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(_ref12) {
      var methodName, args, nearConnection;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              methodName = _ref12.methodName, args = _ref12.args;
              _context10.next = 3;
              return near.account(exports.REF_FI_CONTRACT_ID);
            case 3:
              nearConnection = _context10.sent;
              if (exports.config.REF_DCL_SWAP_CONTRACT_ID) {
                _context10.next = 6;
                break;
              }
              throw DCLInValid;
            case 6:
              return _context10.abrupt("return", nearConnection.viewFunction(exports.config.REF_DCL_SWAP_CONTRACT_ID, methodName, args));
            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));
    return function refDCLSwapViewFunction(_x12) {
      return _ref13.apply(this, arguments);
    };
  }();
  var DCLSwapGetStorageBalance = function DCLSwapGetStorageBalance(tokenId, AccountId) {
    return refDCLSwapViewFunction({
      methodName: 'storage_balance_of',
      args: {
        account_id: AccountId
      }
    });
  };

  var DCL_POOL_FEE_LIST = [100, 400, 2000, 10000];
  var getDCLPoolId = function getDCLPoolId(tokenA, tokenB, fee) {
    if (DCL_POOL_FEE_LIST.indexOf(fee) === -1) throw NoFeeToPool(fee);
    var tokenSeq = [tokenA, tokenB].sort().join('|');
    return tokenSeq + "|" + fee;
  };
  var listDCLPools = function listDCLPools() {
    return refDCLSwapViewFunction({
      methodName: 'list_pools'
    });
  };
  var getDCLPool = /*#__PURE__*/function () {
    var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(pool_id) {
      var _pool_id$split, token_x, token_y, fee, token_seq, new_pool_id;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _pool_id$split = pool_id.split('|'), token_x = _pool_id$split[0], token_y = _pool_id$split[1], fee = _pool_id$split[2];
              token_seq = [token_x, token_y].sort().join('|');
              new_pool_id = token_seq + "|" + fee;
              return _context.abrupt("return", refDCLSwapViewFunction({
                methodName: 'get_pool',
                args: {
                  pool_id: new_pool_id
                }
              }));
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getDCLPool(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var formatError = function formatError(msg) {
    return new Error(msg);
  };
  var unNamedError = /*#__PURE__*/formatError('Something wrong happened');
  var SameInputTokenError = /*#__PURE__*/formatError('Input token should be different with output token');
  var ZeroInputError = /*#__PURE__*/formatError('Input amount should be greater than 0');
  var NoPoolError = /*#__PURE__*/formatError('No pool found for the input tokens');
  var NotLoginError = /*#__PURE__*/formatError('Please login in first');
  var SwapRouteError = /*#__PURE__*/formatError("Something wrong happened, we don't get correct routes corrreponding to current input");
  var TokenNotExistError = function TokenNotExistError(id) {
    return formatError(id + " doesn't exist in " + getConfig().networkId);
  };
  var NoPuiblicKeyError = /*#__PURE__*/formatError('No public key found');
  var NoLocalSignerError = /*#__PURE__*/formatError('No local signer found');
  var InValidAccessKeyError = /*#__PURE__*/formatError('Invalid access key');
  var AccountIdMisMatch = /*#__PURE__*/formatError("Your input account id doesn't match the account id in the credential");
  var NoCredential = /*#__PURE__*/formatError('No Credential to such path');
  var NoAccountIdFound = /*#__PURE__*/formatError('No account id found');
  var NoFeeToPool = function NoFeeToPool(fee) {
    return formatError("InValid fee " + fee + " to DCL pool, the valid fee should be one of " + DCL_POOL_FEE_LIST);
  };
  var DCLInValid = /*#__PURE__*/formatError("DCL contract currently in Valid on " + exports.config.networkId);
  var NoPoolOnThisPair = function NoPoolOnThisPair(tokenA, tokenB) {
    return formatError("No pools on pair " + tokenA + " <> " + tokenB);
  };
  var SlippageError = /*#__PURE__*/formatError('slippage tolerance should be in range (0, 100)');
  var NoOrderFound = function NoOrderFound(order_id) {
    return formatError("No order " + (order_id || '') + " found");
  };
  var OrderNoRemainedAmount = /*#__PURE__*/formatError('No remained amount on this order');

  var instantSwap = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref) {
      var _swapTodos;
      var tokenIn, tokenOut, amountIn, slippageTolerance, swapTodos, AccountId, referralId, transactions, registerToken, registered, actionsList, allSwapsTokens, i, swapTokens;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tokenIn = _ref.tokenIn, tokenOut = _ref.tokenOut, amountIn = _ref.amountIn, slippageTolerance = _ref.slippageTolerance, swapTodos = _ref.swapTodos, AccountId = _ref.AccountId, referralId = _ref.referralId;
              transactions = [];
              if (!((swapTodos == null ? void 0 : (_swapTodos = swapTodos[(swapTodos == null ? void 0 : swapTodos.length) - 1]) == null ? void 0 : _swapTodos.outputToken) !== tokenOut.id)) {
                _context2.next = 4;
                break;
              }
              throw SwapRouteError;
            case 4:
              registerToken = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token) {
                  var tokenRegistered;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return ftGetStorageBalance(token.id, AccountId)["catch"](function () {
                            throw new Error(token.id + " doesn't exist.");
                          });
                        case 2:
                          tokenRegistered = _context.sent;
                          if (tokenRegistered === null) {
                            transactions.push({
                              receiverId: token.id,
                              functionCalls: [{
                                methodName: 'storage_deposit',
                                args: {
                                  registration_only: true,
                                  account_id: AccountId
                                },
                                gas: '30000000000000',
                                amount: STORAGE_TO_REGISTER_WITH_MFT
                              }]
                            });
                          }
                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return function registerToken(_x2) {
                  return _ref3.apply(this, arguments);
                };
              }();
              if (!(tokenIn.id === exports.config.WRAP_NEAR_CONTRACT_ID)) {
                _context2.next = 12;
                break;
              }
              _context2.next = 8;
              return ftGetStorageBalance(exports.config.WRAP_NEAR_CONTRACT_ID, AccountId);
            case 8:
              registered = _context2.sent;
              if (!(registered === null)) {
                _context2.next = 12;
                break;
              }
              _context2.next = 12;
              return registerToken(tokenIn);
            case 12:
              _context2.next = 14;
              return registerToken(tokenOut);
            case 14:
              actionsList = [];
              allSwapsTokens = swapTodos.map(function (s) {
                return [s.inputToken, s.outputToken];
              }); // to get the hop tokens
              for (i in allSwapsTokens) {
                swapTokens = allSwapsTokens[i];
                if (swapTokens[0] === tokenIn.id && swapTokens[1] === tokenOut.id) {
                  // parallel, direct hop route.
                  actionsList.push({
                    pool_id: swapTodos[i].pool.id,
                    token_in: tokenIn.id,
                    token_out: tokenOut.id,
                    amount_in: swapTodos[i].pool.partialAmountIn,
                    min_amount_out: round(tokenOut.decimals, toNonDivisibleNumber(tokenOut.decimals, percentLess(slippageTolerance, swapTodos[i].estimate)))
                  });
                } else if (swapTokens[0] === tokenIn.id) {
                  // first hop in double hop route
                  //TODO -- put in a check to make sure this first hop matches with the next (i+1) hop as a second hop.
                  actionsList.push({
                    pool_id: swapTodos[i].pool.id,
                    token_in: swapTokens[0],
                    token_out: swapTokens[1],
                    amount_in: swapTodos[i].pool.partialAmountIn,
                    min_amount_out: '0'
                  });
                } else {
                  // second hop in double hop route.
                  //TODO -- put in a check to make sure this second hop matches with the previous (i-1) hop as a first hop.
                  actionsList.push({
                    pool_id: swapTodos[i].pool.id,
                    token_in: swapTokens[0],
                    token_out: swapTokens[1],
                    min_amount_out: round(tokenOut.decimals, toNonDivisibleNumber(tokenOut.decimals, percentLess(slippageTolerance, swapTodos[i].estimate)))
                  });
                }
              }
              transactions.push({
                receiverId: tokenIn.id,
                functionCalls: [{
                  methodName: 'ft_transfer_call',
                  args: {
                    receiver_id: exports.REF_FI_CONTRACT_ID,
                    amount: toNonDivisibleNumber(tokenIn.decimals, amountIn),
                    msg: !!referralId ? JSON.stringify({
                      force: 0,
                      actions: actionsList,
                      referral_id: referralId
                    }) : JSON.stringify({
                      force: 0,
                      actions: actionsList
                    })
                  },
                  gas: '180000000000000',
                  amount: ONE_YOCTO_NEAR
                }]
              });
              return _context2.abrupt("return", transactions);
            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function instantSwap(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var DEFAULT_PAGE_LIMIT = 100;
  var BLACK_TOKEN_LIST = ['meta-token.near'];
  var getRatedPoolDetail = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var id;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              return _context.abrupt("return", refFiViewFunction({
                methodName: 'get_rated_pool',
                args: {
                  pool_id: Number(id)
                }
              }).then(function (pool_info) {
                return _extends({}, pool_info, {
                  id: Number(id),
                  pool_kind: 'RATED_SWAP'
                });
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getRatedPoolDetail(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var getUnRatedPoolDetail = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
      var id;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref3.id;
              return _context2.abrupt("return", refFiViewFunction({
                methodName: 'get_stable_pool',
                args: {
                  pool_id: Number(id)
                }
              }).then(function (pool_info) {
                return _extends({}, pool_info, {
                  id: Number(id),
                  pool_kind: 'STABLE_SWAP',
                  rates: pool_info.c_amounts.map(function (_) {
                    return toNonDivisibleNumber(STABLE_LP_TOKEN_DECIMALS, '1');
                  })
                });
              }));
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function getUnRatedPoolDetail(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var getStablePools = /*#__PURE__*/function () {
    var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(stablePools) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", Promise.all(stablePools.map(function (pool) {
                return pool.pool_kind === 'RATED_SWAP' ? getRatedPoolDetail({
                  id: pool.id
                }) : getUnRatedPoolDetail({
                  id: pool.id
                });
              })));
            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function getStablePools(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();
  var getPool = /*#__PURE__*/function () {
    var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return refFiViewFunction({
                methodName: 'get_pool',
                args: {
                  pool_id: id
                }
              }).then(function (pool) {
                return parsePool(pool, id);
              });
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return function getPool(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();
  var getPoolByIds = /*#__PURE__*/function () {
    var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(ids) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return refFiViewFunction({
                methodName: 'get_pool_by_ids',
                args: {
                  pool_ids: ids
                }
              }).then(function (pools) {
                return pools.map(function (p, i) {
                  return parsePool(p, ids[i]);
                });
              });
            case 2:
              return _context5.abrupt("return", _context5.sent);
            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return function getPoolByIds(_x5) {
      return _ref7.apply(this, arguments);
    };
  }();
  var getRefPools = /*#__PURE__*/function () {
    var _ref8 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(page, perPage) {
      var index, poolData;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (page === void 0) {
                page = 1;
              }
              if (perPage === void 0) {
                perPage = DEFAULT_PAGE_LIMIT;
              }
              index = (page - 1) * perPage;
              _context6.next = 5;
              return refFiViewFunction({
                methodName: 'get_pools',
                args: {
                  from_index: index,
                  limit: perPage
                }
              });
            case 5:
              poolData = _context6.sent;
              return _context6.abrupt("return", poolData.map(function (rawPool, i) {
                return parsePool(rawPool, i + index);
              }).filter(function (p) {
                var _p$tokenIds;
                return !((_p$tokenIds = p.tokenIds) != null && _p$tokenIds.find(function (tokenId) {
                  return BLACK_TOKEN_LIST.includes(tokenId);
                }));
              }));
            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    return function getRefPools(_x6, _x7) {
      return _ref8.apply(this, arguments);
    };
  }();
  var fetchAllPools = /*#__PURE__*/function () {
    var _ref9 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(perPage) {
      var totalPools, pages, pools;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (perPage) {
                DEFAULT_PAGE_LIMIT = Math.min(perPage, 500);
              }
              _context7.next = 3;
              return getTotalPools();
            case 3:
              totalPools = _context7.sent;
              pages = Math.ceil(totalPools / DEFAULT_PAGE_LIMIT);
              _context7.next = 7;
              return Promise.all([].concat(Array(pages)).fill(0).map(function (_, i) {
                return getRefPools(i + 1);
              }));
            case 7:
              pools = _context7.sent.flat();
              return _context7.abrupt("return", {
                simplePools: pools.filter(function (p) {
                  return p.pool_kind && p.pool_kind === 'SIMPLE_POOL';
                }),
                unRatedPools: pools.filter(function (p) {
                  return p.pool_kind && p.pool_kind === 'STABLE_SWAP';
                }),
                ratedPools: pools.filter(function (p) {
                  return p.pool_kind && p.pool_kind === 'RATED_SWAP';
                })
              });
            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return function fetchAllPools(_x8) {
      return _ref9.apply(this, arguments);
    };
  }();

  var _excluded = ["slippageTolerance", "refreshTrigger", "onSwap", "AccountId", "poolFetchingState", "referralId"];
  var ThemeContext = /*#__PURE__*/React.createContext(defaultTheme);
  var ThemeContextProvider = function ThemeContextProvider(_ref) {
    var customTheme = _ref.customTheme,
      children = _ref.children;
    var _useState = React.useState(customTheme || defaultTheme),
      theme = _useState[0],
      setTheme = _useState[1];
    React.useEffect(function () {
      if (!customTheme) return;
      setTheme(customTheme);
    }, [customTheme]);
    return React__default.createElement(ThemeContext.Provider, {
      value: theme
    }, children);
  };
  var estimateValidator = function estimateValidator(swapTodos, tokenIn, parsedAmountIn, tokenOut) {
    var _swapTodos$, _swapTodos;
    var tokenInId = (_swapTodos$ = swapTodos[0]) == null ? void 0 : _swapTodos$.inputToken;
    var tokenOutId = (_swapTodos = swapTodos[swapTodos.length - 1]) == null ? void 0 : _swapTodos.outputToken;
    var totalPartialAmountIn = swapTodos.length === 0 ? new Big(swapTodos[0].pool.partialAmountIn || 0) : swapTodos.reduce(function (acc, cur, i) {
      return acc.plus(cur.pool.partialAmountIn || 0);
    }, new Big(0));
    if (tokenInId !== tokenIn.id || tokenOutId !== tokenOut.id || !totalPartialAmountIn.eq(parsedAmountIn || '0')) {
      return false;
    }
    return true;
  };
  var useAllTokens = function useAllTokens(_ref2) {
    var reload = _ref2.reload;
    var _useState2 = React.useState(),
      tokens = _useState2[0],
      setTokens = _useState2[1];
    var _useState3 = React.useState(true),
      tokensLoading = _useState3[0],
      setTokensLoading = _useState3[1];
    React.useEffect(function () {
      var fetchTokens = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var tokens;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return getTokens(reload);
                case 2:
                  tokens = _context.sent;
                  setTokens(tokens);
                  setTokensLoading(false);
                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function fetchTokens() {
          return _ref3.apply(this, arguments);
        };
      }();
      fetchTokens();
    }, [reload]);
    return {
      tokens: tokens,
      tokensLoading: tokensLoading
    };
  };
  var useTokensIndexer = function useTokensIndexer(_ref4) {
    var defaultTokenList = _ref4.defaultTokenList,
      AccountId = _ref4.AccountId;
    var _useState4 = React.useState([]),
      tokens = _useState4[0],
      setTokens = _useState4[1];
    var _useState5 = React.useState(false),
      tokenLoading = _useState5[0],
      setTokenLoading = _useState5[1];
    React.useEffect(function () {
      setTokenLoading(true);
      var getTokensList = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var whiteList, globalWhiteListTokens, parsedTokens, newList;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return getGlobalWhitelist();
                case 2:
                  whiteList = _context2.sent;
                  _context2.next = 5;
                  return getWhiteListTokensIndexer(whiteList);
                case 5:
                  globalWhiteListTokens = _context2.sent.filter(function (token) {
                    return !!token;
                  });
                  parsedTokens = globalWhiteListTokens.map(function (t) {
                    return t.id === exports.WRAP_NEAR_CONTRACT_ID ? _extends({}, NEAR_META_DATA, {
                      id: t.id
                    }) : t;
                  });
                  if (!defaultTokenList || defaultTokenList.length === 0) {
                    setTokens(parsedTokens);
                    setTokenLoading(false);
                  } else {
                    newList = defaultTokenList.map(function (t) {
                      return t.id === exports.WRAP_NEAR_CONTRACT_ID ? _extends({}, NEAR_META_DATA, {
                        id: t.id
                      }) : t;
                    }).filter(function (t) {
                      return parsedTokens.findIndex(function (p) {
                        return p.id === t.id;
                      }) !== -1;
                    });
                    setTokens(newList.map(function (t) {
                      return !t.icon || REPLACE_TOKENS.includes(t.id) ? _extends({}, t, {
                        icon: icons[t.id]
                      }) : t;
                    }));
                    setTokenLoading(false);
                  }
                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function getTokensList() {
          return _ref5.apply(this, arguments);
        };
      }();
      getTokensList();
    }, [AccountId, defaultTokenList]);
    return {
      tokens: tokens,
      tokenLoading: tokenLoading
    };
  };
  var useRefPools = function useRefPools(refreshTrigger) {
    var _useState6 = React.useState({
        simplePools: [],
        ratedPools: [],
        unRatedPools: []
      }),
      allPools = _useState6[0],
      setAllPools = _useState6[1];
    var _useState7 = React.useState('loading'),
      poolFetchingState = _useState7[0],
      setPoolFetchingState = _useState7[1];
    var _useState8 = React.useState([]),
      allStablePools = _useState8[0],
      setAllStablePools = _useState8[1];
    React.useEffect(function () {
      setPoolFetchingState('loading');
      fetchAllPools().then(function (allPools) {
        setAllPools(allPools);
        return allPools;
      }).then(function (allPools) {
        var pools = allPools.unRatedPools.concat(allPools.ratedPools);
        return getStablePools(pools).then(setAllStablePools);
      })["finally"](function () {
        setPoolFetchingState('end');
      });
    }, [refreshTrigger]);
    return {
      allPools: allPools,
      allStablePools: allStablePools,
      poolFetchingState: poolFetchingState
    };
  };
  var useSwap = function useSwap(params) {
    var _params$tokenIn, _params$tokenOut, _params$tokenIn2, _params$tokenOut2, _params$options;
    var slippageTolerance = params.slippageTolerance,
      refreshTrigger = params.refreshTrigger,
      onSwap = params.onSwap,
      AccountId = params.AccountId,
      poolFetchingState = params.poolFetchingState,
      referralId = params.referralId,
      swapParams = _objectWithoutPropertiesLoose(params, _excluded);
    var tokenIn = params.tokenIn,
      tokenOut = params.tokenOut,
      amountIn = params.amountIn;
    var _useState9 = React.useState([]),
      estimates = _useState9[0],
      setEstimates = _useState9[1];
    var _useState10 = React.useState(false),
      canSwap = _useState10[0],
      setCanSwap = _useState10[1];
    var _useState11 = React.useState(null),
      swapError = _useState11[0],
      setSwapError = _useState11[1];
    var _useState12 = React.useState(''),
      amountOut = _useState12[0],
      setAmountOut = _useState12[1];
    var _useState13 = React.useState(false),
      isEstimating = _useState13[0],
      setIsEstimating = _useState13[1];
    var _useState14 = React.useState(false),
      forceEstimate = _useState14[0],
      setForceEstimate = _useState14[1];
    var minAmountOut = amountOut ? percentLess(slippageTolerance, amountOut) : '';
    var fee = !params.tokenOut || !params.tokenIn ? 0 : getAvgFee(estimates, params.tokenOut.id, toNonDivisibleNumber(params.tokenIn.decimals, params.amountIn));
    var rate = calculateExchangeRate(ONLY_ZEROS.test(params.amountIn) ? '1' : params.amountIn, amountOut || '1');
    var makeSwap = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var transactionsRef, outEstimate, routes, bigEstimate, _minAmountOut;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!params.tokenIn || !params.tokenOut)) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return instantSwap({
                  tokenIn: params.tokenIn,
                  tokenOut: params.tokenOut,
                  amountIn: params.amountIn,
                  swapTodos: estimates,
                  slippageTolerance: slippageTolerance,
                  AccountId: AccountId || '',
                  referralId: referralId
                });
              case 4:
                transactionsRef = _context3.sent;
                if (tokenIn && tokenIn.id === exports.WRAP_NEAR_CONTRACT_ID) {
                  transactionsRef.splice(-1, 0, nearDepositTransaction(amountIn));
                }
                if (tokenOut && tokenOut.id === exports.WRAP_NEAR_CONTRACT_ID) {
                  outEstimate = new Big(0);
                  routes = separateRoutes(estimates, tokenOut.id);
                  bigEstimate = routes.reduce(function (acc, cur) {
                    var curEstimate = cur[cur.length - 1].estimate;
                    return acc.plus(curEstimate);
                  }, outEstimate);
                  _minAmountOut = percentLess(slippageTolerance, scientificNotationToString(bigEstimate.toString()));
                  transactionsRef.push(nearWithdrawTransaction(_minAmountOut));
                }
                onSwap(transactionsRef);
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function makeSwap() {
        return _ref6.apply(this, arguments);
      };
    }();
    var getEstimate = function getEstimate() {
      if (!params.tokenIn || !params.tokenOut || poolFetchingState === 'loading') {
        setCanSwap(false);
        return;
      }
      setCanSwap(false);
      if (ONLY_ZEROS.test(params.amountIn) || !params.tokenOut || !params.tokenIn) {
        setAmountOut('');
        setEstimates([]);
        return;
      }
      setSwapError(null);
      setIsEstimating(true);
      estimateSwap({
        tokenIn: params.tokenIn,
        tokenOut: params.tokenOut,
        amountIn: params.amountIn,
        simplePools: params.simplePools,
        options: params.options
      }).then(function (estimates) {
        if (ONLY_ZEROS.test(params.amountIn) || !params.tokenOut || !params.tokenIn) {
          setAmountOut('');
          return;
        }
        setSwapError(null);
        var expectAmountOut = getExpectedOutputFromSwapTodos(estimates, params.tokenOut.id).toString();
        setAmountOut(expectAmountOut);
        setEstimates(estimates);
        setCanSwap(true);
      })["catch"](function (e) {
        setSwapError(e);
        setCanSwap(false);
        setAmountOut('');
      })["finally"](function () {
        setIsEstimating(false);
        setForceEstimate(false);
      });
    };
    React.useEffect(function () {
      var estimateValidationPass = estimates.length > 0 && params.tokenIn && params.tokenOut && estimateValidator(estimates, params.tokenIn, toNonDivisibleNumber(params.tokenIn.decimals, params.amountIn), params.tokenOut);
      if (isEstimating && estimates && !forceEstimate) return;
      if ((estimateValidationPass || swapError) && !forceEstimate) return;
      getEstimate();
    }, [params.amountIn, (_params$tokenIn = params.tokenIn) == null ? void 0 : _params$tokenIn.id, (_params$tokenOut = params.tokenOut) == null ? void 0 : _params$tokenOut.id, refreshTrigger, poolFetchingState, isEstimating, forceEstimate]);
    React.useEffect(function () {
      // setEstimating(false);
      setForceEstimate(true);
    }, [(_params$tokenIn2 = params.tokenIn) == null ? void 0 : _params$tokenIn2.id, (_params$tokenOut2 = params.tokenOut) == null ? void 0 : _params$tokenOut2.id, (_params$options = params.options) == null ? void 0 : _params$options.enableSmartRouting]);
    return {
      amountOut: amountOut,
      minAmountOut: minAmountOut,
      fee: fee,
      rate: rate,
      estimates: estimates,
      makeSwap: makeSwap,
      canSwap: canSwap,
      swapError: swapError,
      setAmountOut: setAmountOut,
      isEstimating: isEstimating
    };
  };
  var TokenPriceContext = /*#__PURE__*/React.createContext(null);
  var useTokenPriceList = function useTokenPriceList() {
    var _useState15 = React.useState({}),
      tokenPriceList = _useState15[0],
      setTokenPriceList = _useState15[1];
    React.useEffect(function () {
      getTokenPriceList().then(setTokenPriceList);
    }, []);
    return tokenPriceList;
  };
  var TokenPriceContextProvider = function TokenPriceContextProvider(_ref7) {
    var children = _ref7.children;
    var tokenPriceList = useTokenPriceList();
    return React__default.createElement(TokenPriceContext.Provider, {
      value: tokenPriceList
    }, children);
  };
  var useTokenBalnces = function useTokenBalnces(tokens, AccountId) {
    var _useState16 = React.useState({}),
      balances = _useState16[0],
      setBalances = _useState16[1];
    React.useEffect(function () {
      var validTokens = tokens.filter(function (t) {
        return !!(t != null && t.id);
      });
      var ids = validTokens.map(function (token) {
        return token.id;
      });
      Promise.all(ids.map(function (id) {
        return ftGetBalance(id === exports.WRAP_NEAR_CONTRACT_ID ? 'NEAR' : id, AccountId);
      })).then(function (balances) {
        var balancesMap = validTokens.reduce(function (acc, token, index) {
          var _extends2;
          return _extends({}, acc, (_extends2 = {}, _extends2[token.id] = toReadableNumber(token.decimals, balances[index]), _extends2));
        }, {});
        setBalances(balancesMap);
      });
    }, [tokens.map(function (t) {
      return t == null ? void 0 : t.id;
    }).join('-')]);
    return balances;
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".__ref-swap-widget-container {\n  border-radius: 16px;\n  padding: 28px;\n  padding-bottom: 16px;\n  position: relative;\n  max-width: 90%;\n}\n\n.__ref-swap-widget-row-flex-center {\n  display: flex;\n  align-items: center;\n}\n\n.__ref-swap-widget-col-flex-start {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n.__ref-swap-widget-header {\n  justify-content: space-between;\n  margin-bottom: 25px;\n}\n\n.__ref-swap-widget-header-title {\n  font-weight: 700;\n  font-size: 20px;\n}\n.__ref-swap-widget-header-button-account {\n  font-size: 14px;\n  margin-right: 8px;\n  padding: 4px 13px;\n  border-radius: 25px;\n  min-width: 120px;\n  justify-content: center;\n}\n\n.__ref-swap-widget-header-button-account:hover {\n  background: rgba(255, 104, 158, 0.2) !important;\n}\n\n.__ref-swap-widget_slippage_selector {\n  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 12px;\n  position: absolute;\n  top: 30px;\n  right: 0px;\n  padding: 16px;\n  padding-right: 20px;\n  padding-left: 20px;\n  z-index: 100;\n  width: 230px;\n  font-size: 14px;\n}\n\n.__ref-swap-widget_slippage_selector_input_container {\n  width: 100%;\n  height: 26px;\n  margin-right: 4px;\n  padding: 2px 10px;\n}\n.__ref-swap-widget_slippage_selector_button {\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 16px;\n}\n\n.__ref-swap-widget-opacity-hover:hover {\n  opacity: 0.5;\n}\n\n.__ref-swap-widget-opacity-active:active {\n  opacity: 0.5;\n}\n\n.__ref-swap-widger-token-amount {\n  padding: 14px;\n  padding-bottom: 8px;\n  border-radius: 8px;\n  display: flex;\n  align-items: flex-start;\n}\n\n.__ref-swap-widger-token-amount_input {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n\n.__ref-swap-widget-token-amount_quick_selector {\n}\n\n.__ref-swap-widger-token-amount_balance {\n  margin-top: 7px;\n  justify-content: space-between;\n}\n\n.__ref-swap-widget-token-amount_quick_selector_item {\n  font-size: 12px;\n  padding: 6px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n  cursor: pointer;\n}\n.__ref-swap-widget-select-token_input {\n  padding: 14px;\n  border-radius: 8px;\n}\n\n.__ref-swap-widget_star_token {\n  padding: 8px 10px 8px 8px;\n  margin: 0px 6px 10px 0px;\n  position: relative;\n  cursor: pointer;\n  border-radius: 8px;\n}\n\n.__ref-swap-widget_token_icon {\n  border-radius: 100%;\n  flex-shrink: 0;\n}\n\n.__ref-swap-widget_token_list_table {\n  table-layout: auto;\n  width: 100%;\n  font-size: 14px;\n}\n\n.__ref-swap-widget_token_list_table_header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 6px 12px;\n  margin: 0px 6px;\n}\n\n.__ref-swap-widget_token-selector-star-tokens {\n  margin-top: 20px;\n  flex-wrap: wrap;\n}\n.__ref-swap-widget_token_list_table_content {\n  display: flex;\n  flex-direction: column;\n  max-height: 50vh;\n  min-height: 30vh;\n  overflow-y: auto;\n}\n\n.__ref-swap-widget_token-selector-token-list-item {\n  justify-content: space-between;\n  padding: 9px 20px;\n}\n.__ref-swap-widget-token-amount_token-select-button {\n  font-size: 16px;\n  border-radius: 18px;\n  padding: 6px 8px;\n  cursor: pointer;\n}\n\n.__ref-swap-widget-exchange-button {\n  width: 100%;\n  justify-content: center;\n  padding: 20px 0;\n}\n\n.__ref-swap-widget-submit-button {\n  width: 100%;\n  justify-content: center;\n  font-size: 18px;\n  font-weight: 700;\n  border-radius: 8px;\n  padding: 14px 0 14px 0;\n  margin-top: 14px;\n  cursor: pointer;\n}\n.__ref-widget-swap-detail-view {\n  justify-content: space-between;\n  width: 100%;\n  font-size: 14px;\n  margin-top: 16px;\n}\n\n.__ref-swap-widget-swap-detail-view-item {\n  justify-content: space-between;\n  margin-bottom: 12px;\n  width: 100%;\n}\n\n.__ref-swap-widget-loading {\n  animation: spin 2s linear infinite;\n}\n\n.__ref-swap-widget-notification {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  z-index: 100;\n  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 12px;\n  padding: 32px 20px;\n}\n\n.__ref-swap-widget-notification__button {\n  border-radius: 8px;\n  padding: 8px 20px;\n  margin-top: 14px;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\ninput.__ref-swap-widget-input-class {\n  margin: 0;\n  background-color: transparent;\n  display: block;\n  width: 100%;\n  padding: 0;\n  border-width: 0;\n}\n\ninput.__ref-swap-widget-input-class:focus {\n  outline: none;\n  border-width: 0;\n}\n\ninput.__ref-swap-widget-input-class::-webkit-outer-spin-button,\ninput.__ref-swap-widget-input-class::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\ninput.__ref-swap-widget-input-class[type='number'] {\n  -moz-appearance: textfield; /* Firefox */\n}\n\nbutton.__ref-swap-widget-button {\n  border: none;\n}\n\n.__ref-swap-widget-submit-button:hover {\n  opacity: 0.5;\n}\n\n.__ref-swap-widget-active:active {\n  color: #00c6a2;\n}\n\n.__ref-swap-widget-hover:hover {\n  color: #00c6a2;\n}\n\n.__ref-swap-widget_token_list_table_content::-webkit-scrollbar {\n  width: 4px;\n  height: 4px;\n  border-radius: 3px;\n}\n\n.__ref-swap-widget_token_list_table_content::-webkit-scrollbar-track {\n  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);\n}\n.__ref-swap-widget_token_list_table_content::-webkit-scrollbar-thumb {\n  background: #00c6a2;\n  border-radius: 8px;\n}\n\n.__ref-swap-widget-swap_routes {\n  border-radius: 12px;\n  padding: 8px 12px 8px 12px;\n  width: 100%;\n}\n\n.__ref-swap-widget-valueStyle {\n  background-image: -webkit-linear-gradient(left, #00ffd1, #00ffd1, #8c78ff);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n\n.__ref-swap-widget-swap_route_row {\n  justify-content: space-between;\n  margin-bottom: 4px;\n}\n";
  styleInject(css_248z);

  var getPriceImpact$1 = function getPriceImpact(value, tokenIn, tokenInAmount) {
    var textColor = Number(value) <= 1 ? 'text-greenLight' : 1 < Number(value) && Number(value) <= 2 ? 'text-warn' : 'text-error';
    var displayValue = scientificNotationToString(multiply(tokenInAmount || '0', divide(value, '100')));
    var tokenInInfo = Number(displayValue) <= 0 ? " / 0 " + toRealSymbol(tokenIn.symbol) : " / -" + toInternationalCurrencySystemLongString(displayValue, 3) + " " + toRealSymbol(tokenIn.symbol);
    if (Number(value) < 0.01) return React__default.createElement("span", {
      className: "text-greenLight"
    }, "< -0.01%", tokenInInfo);
    if (Number(value) > 1000) return React__default.createElement("span", {
      className: "text-error"
    }, "< -1000%", tokenInInfo);
    return React__default.createElement("span", {
      className: textColor + " font-sans"
    }, "\u2248 -" + toPrecision(value, 2) + "%", tokenInInfo);
  };
  var SmartRouteV2 = function SmartRouteV2(_ref) {
    var tokensRaw = _ref.tokens,
      p = _ref.p,
      pools = _ref.pools;
    var theme = React.useContext(ThemeContext);
    var tokens = tokensRaw.map(function (t) {
      return t.id === exports.WRAP_NEAR_CONTRACT_ID ? _extends({}, NEAR_META_DATA, {
        id: exports.WRAP_NEAR_CONTRACT_ID
      }) : t;
    });
    var ParaTokenFrom = function ParaTokenFrom(_ref2) {
      var tokenIn = _ref2.tokenIn,
        p = _ref2.p;
      return React__default.createElement("div", {
        className: "__ref-swap-widget-row-flex-center ",
        style: {
          width: '60px'
        }
      }, React__default.createElement("span", {
        style: {
          marginRight: '4px'
        }
      }, p, "%"), React__default.createElement("span", {
        className: ""
      }, React__default.createElement(Icon, {
        token: tokenIn
      })));
    };
    var Icon = function Icon(_ref3) {
      var token = _ref3.token;
      if (token.icon) {
        return React__default.createElement("img", {
          src: token.icon,
          alt: "",
          style: {
            borderRadius: '100%',
            height: '16px',
            width: '16px',
            flexShrink: 0
          }
        });
      } else {
        return React__default.createElement("div", {
          style: {
            borderRadius: '100%',
            height: '16px',
            width: '16px'
          }
        });
      }
    };
    var Hub = function Hub(_ref4) {
      var token = _ref4.token,
        poolId = _ref4.poolId;
      return React__default.createElement("div", {
        className: "__ref-swap-widget-row-flex-center",
        style: {
          width: '62px',
          height: '22px'
        }
      }, React__default.createElement("div", {
        className: "w-full flex items-center justify-start pl-2 ",
        style: {
          marginRight: '4px'
        }
      }, React__default.createElement("span", {
        className: "text-gray-400"
      }, "#" + poolId)), React__default.createElement(Icon, {
        token: token
      }));
    };
    if (tokens.length === 3) {
      var _pools$, _pools$2;
      return React__default.createElement("div", {
        className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap_route_row"
      }, React__default.createElement(ParaTokenFrom, {
        tokenIn: tokens[0],
        p: p
      }), React__default.createElement("div", {
        className: "",
        style: {
          position: 'relative',
          bottom: '1px'
        }
      }, React__default.createElement(ArrowRight, null)), React__default.createElement(Hub, {
        token: tokens[1],
        poolId: pools == null ? void 0 : (_pools$ = pools[0]) == null ? void 0 : _pools$.id
      }), React__default.createElement("div", {
        className: "px-3",
        style: {
          position: 'relative',
          bottom: '1px'
        }
      }, React__default.createElement(ArrowRight, null)), React__default.createElement(Hub, {
        token: tokens[2],
        poolId: pools == null ? void 0 : (_pools$2 = pools[1]) == null ? void 0 : _pools$2.id
      }));
    } else if (tokens.length === 2) {
      var _pools$3;
      return React__default.createElement("div", {
        className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap_route_row"
      }, React__default.createElement(ParaTokenFrom, {
        tokenIn: tokens[0],
        p: p
      }), React__default.createElement("div", {
        className: "px-3"
      }, React__default.createElement(ArrowRight, null)), React__default.createElement(Hub, {
        token: tokens[1],
        poolId: pools == null ? void 0 : (_pools$3 = pools[0]) == null ? void 0 : _pools$3.id
      }));
    } else {
      return null;
    }
  };
  var DetailView = function DetailView(_ref5) {
    var _estimates;
    var tokenIn = _ref5.tokenIn,
      tokenOut = _ref5.tokenOut,
      rate = _ref5.rate,
      fee = _ref5.fee,
      minReceived = _ref5.minReceived,
      amountIn = _ref5.amountIn,
      amountOut = _ref5.amountOut,
      priceImpact = _ref5.priceImpact,
      estimates = _ref5.estimates;
    var theme = React.useContext(ThemeContext);
    var storagedOpen = !!localStorage.getItem(REF_WIDGET_SWAP_DETAIL_KEY);
    var _useState = React.useState(storagedOpen || false),
      showDetail = _useState[0],
      setShowDetail = _useState[1];
    var _useState2 = React.useState(false),
      isRateReverse = _useState2[0],
      setIsRateReverse = _useState2[1];
    var tokensPerRoute = estimates.filter(function (swap) {
      return swap.inputToken === (tokenIn == null ? void 0 : tokenIn.id);
    }).map(function (swap) {
      return swap.tokens;
    });
    var identicalRoutes = separateRoutes(estimates, ((_estimates = estimates[estimates.length - 1]) == null ? void 0 : _estimates.outputToken) || '');
    var pools = identicalRoutes.map(function (r) {
      return r[0];
    }).map(function (hub) {
      return hub.pool;
    });
    var percents = React.useMemo(function () {
      if (!pools || pools.length === 0) return [];
      return getPoolAllocationPercents(pools);
    }, [pools]);
    var priceImpactDisplay = React.useMemo(function () {
      if (!priceImpact || !tokenIn || !amountIn) return null;
      return getPriceImpact$1(priceImpact, tokenIn, amountIn);
    }, [priceImpact, tokenIn, amountIn]);
    if (!tokenIn || !tokenOut) return null;
    var displayRate = "1 " + toRealSymbol(tokenIn.symbol) + " \u2248 " + (Number(rate) < 0.01 ? '< 0.01' : toPrecision(rate, 2)) + " " + toRealSymbol(tokenOut.symbol);
    var revertRate = new Big(1).div(ONLY_ZEROS.test(rate) ? '1' : rate || '1');
    var revertDisplayRate = "1 " + toRealSymbol(tokenOut.symbol) + " \u2248 " + (Number(revertRate) < 0.01 ? '< 0.01' : toPrecision(revertRate.toString(), 2)) + " " + toRealSymbol(tokenIn.symbol);
    var primary = theme.primary,
      secondary = theme.secondary,
      borderColor = theme.borderColor,
      iconDefault = theme.iconDefault;
    return React__default.createElement("div", {
      className: "__ref-widget-swap-detail-view __ref-swap-widget-col-flex-start",
      style: {
        color: secondary
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap-detail-view-item"
    }, React__default.createElement("div", {
      style: {
        color: primary,
        cursor: 'pointer'
      },
      className: "__ref-swap-widget-row-flex-center",
      onClick: function onClick() {
        if (showDetail) localStorage.removeItem(REF_WIDGET_SWAP_DETAIL_KEY);else {
          localStorage.setItem(REF_WIDGET_SWAP_DETAIL_KEY, '1');
        }
        setShowDetail(!showDetail);
      }
    }, React__default.createElement("div", null, "Detail"), React__default.createElement("div", {
      style: {
        position: 'relative'
      }
    }, !showDetail ? React__default.createElement(FiChevronDown.FiChevronDown, null) : React__default.createElement(FiChevronUp.FiChevronUp, null))), amountIn && amountOut && React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center"
    }, React__default.createElement("div", null, isRateReverse ? revertDisplayRate : displayRate), React__default.createElement(RiExchangeFill.RiExchangeFill, {
      onClick: function onClick() {
        setIsRateReverse(!isRateReverse);
      },
      size: 16,
      style: {
        marginLeft: '4px',
        cursor: 'pointer'
      },
      fill: iconDefault
    }))), !showDetail ? null : React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap-detail-view-item"
    }, React__default.createElement("div", null, "Minimum received"), React__default.createElement("div", null, toPrecision(minReceived || '0', 8))), React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap-detail-view-item"
    }, React__default.createElement("div", null, "Fee"), React__default.createElement("div", null, !amountIn ? '0' : calculateFeeCharge(fee, amountIn) + " " + toRealSymbol(tokenIn.symbol) + "(" + toPrecision(calculateFeePercent(fee).toString(), 2) + "%)"))), !showDetail ? null : React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center __ref-swap-widget-swap-detail-view-item"
    }, React__default.createElement("div", null, "Price impact"), React__default.createElement("div", null, priceImpactDisplay))), estimates && estimates.length > 1 && showDetail && React__default.createElement("div", {
      className: "__ref-swap-widget-swap_routes __ref-swap-widget-row-flex-center",
      style: {
        border: "1px solid " + borderColor,
        flexDirection: isMobile() ? 'column' : 'row',
        position: 'relative',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center"
    }, React__default.createElement(RouterIcon, null), React__default.createElement("span", {
      className: "__ref-swap-widget-valueStyle",
      style: {
        marginLeft: '4px',
        whiteSpace: 'nowrap'
      }
    }, 'Auto Router')), React__default.createElement("div", {
      className: "",
      style: {
        width: isMobile() ? '100%' : 'auto',
        minWidth: !isMobile() ? '70%' : ''
      }
    }, tokensPerRoute.every(function (r) {
      return !!r;
    }) && tokensPerRoute.map(function (tokens, index) {
      if (!tokens) return null;
      return React__default.createElement(SmartRouteV2, {
        key: index + '-swap-route',
        tokens: tokens,
        p: percents[index],
        pools: identicalRoutes[index].map(function (hub) {
          return hub.pool;
        })
      });
    }))));
  };
  var HalfAndMaxAmount = function HalfAndMaxAmount(_ref6) {
    var max = _ref6.max,
      onChangeAmount = _ref6.onChangeAmount,
      token = _ref6.token,
      amount = _ref6.amount;
    var halfValue = percentOfBigNumber(50, max, token.decimals);
    var theme = React.useContext(ThemeContext);
    var secondary = theme.secondary,
      borderRadius = theme.borderRadius,
      hover = theme.hover,
      active = theme.active,
      borderColor = theme.borderColor;
    var _useState3 = React.useState(false),
      hoverHalf = _useState3[0],
      setHoverHalf = _useState3[1];
    var _useState4 = React.useState(false),
      hoverMax = _useState4[0],
      setHoverMax = _useState4[1];
    return React__default.createElement("div", {
      className: "__ref-swap-widget-token-amount_quick_selector __ref-swap-widget-row-flex-center"
    }, React__default.createElement("span", {
      className: "__ref-swap-widget-token-amount_quick_selector_item ",
      style: {
        color: secondary,
        borderRadius: borderRadius,
        border: "1px solid " + borderColor,
        marginRight: '4px',
        background: amount === halfValue && !ONLY_ZEROS.test(halfValue) ? active : hoverHalf ? hover : 'transparent'
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverHalf(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverHalf(false);
      },
      onClick: function onClick() {
        var half = percentOfBigNumber(50, max, token.decimals);
        onChangeAmount(half);
      }
    }, "Half"), React__default.createElement("span", {
      className: "__ref-swap-widget-token-amount_quick_selector_item",
      onClick: function onClick() {
        onChangeAmount(max);
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverMax(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverMax(false);
      },
      style: {
        color: secondary,
        borderRadius: borderRadius,
        border: "1px solid " + borderColor,
        background: amount === max && !ONLY_ZEROS.test(max) ? active : hoverMax ? hover : 'transparent'
      }
    }, "Max"));
  };
  var TokenAmount = function TokenAmount(props) {
    var _ref$current2;
    var balance = props.balance,
      token = props.token,
      onSelectToken = props.onSelectToken,
      amount = props.amount,
      onChangeAmount = props.onChangeAmount,
      price = props.price,
      onForceUpdate = props.onForceUpdate,
      poolFetchingState = props.poolFetchingState;
    var theme = React.useContext(ThemeContext);
    var primary = theme.primary,
      secondary = theme.secondary,
      hover = theme.hover,
      secondaryBg = theme.secondaryBg,
      borderColor = theme.borderColor;
    var ref = React.useRef(null);
    var _useState5 = React.useState(false),
      hoverSelect = _useState5[0],
      setHoverSelect = _useState5[1];
    var handleChange = function handleChange(amount) {
      if (onChangeAmount) {
        onChangeAmount(amount);
      }
      if (ref.current) {
        ref.current.value = amount;
      }
    };
    React.useEffect(function () {
      if (ref.current && onChangeAmount && token && balance && token.id === exports.WRAP_NEAR_CONTRACT_ID && Number(balance) - Number(ref.current.value) < 0.5) {
        ref.current.setCustomValidity('Must have 0.5N or more left in wallet for gas fee.');
      } else {
        var _ref$current;
        (_ref$current = ref.current) == null ? void 0 : _ref$current.setCustomValidity('');
      }
    }, [ref, balance, ref.current, (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.value, token, amount]);
    var curMax = token ? getMax(token.id, balance || '0') : '0';
    return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
      className: "__ref-swap-widger-token-amount ",
      style: {
        background: secondaryBg,
        flexDirection: isMobile() ? 'column' : 'row'
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        width: isMobile() ? 'auto' : '40%'
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center __ref-swap-widget-token-amount_token-select-button",
      style: {
        color: primary,
        background: hoverSelect ? hover : 'transparent',
        border: "1px solide " + (hoverSelect ? borderColor : 'transparent')
      },
      onClick: onSelectToken,
      onMouseEnter: function onMouseEnter() {
        return setHoverSelect(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverSelect(false);
      }
    }, !token ? React__default.createElement(React__default.Fragment, null, React__default.createElement("span", {
      style: {
        whiteSpace: 'nowrap',
        height: '26px'
      },
      className: "__ref-swap-widget-row-flex-center"
    }, "Select Token")) : React__default.createElement(React__default.Fragment, null, React__default.createElement("img", {
      src: token == null ? void 0 : token.icon,
      alt: "",
      className: "__ref-swap-widget_token_icon",
      style: {
        height: '26px',
        width: '26px',
        marginRight: '8px'
      }
    }), React__default.createElement("span", null, toRealSymbol(token == null ? void 0 : token.symbol))), React__default.createElement(FiChevronDown.FiChevronDown, {
      style: {
        marginLeft: '4px',
        flexShrink: 0
      }
    })), onForceUpdate && React__default.createElement(RiRefreshLine.RiRefreshLine, {
      className: "" + (poolFetchingState === 'loading' ? '__ref-swap-widget-loading ' : ''),
      style: {
        cursor: 'pointer',
        color: secondary
      },
      size: 18,
      onClick: function onClick() {
        onForceUpdate();
      }
    })), React__default.createElement("div", {
      className: " __ref-swap-widget-token-amount_input",
      style: {
        width: isMobile() ? '100%' : '60%'
      }
    }, React__default.createElement("input", {
      ref: ref,
      max: !!onChangeAmount ? curMax : undefined,
      min: "0",
      onWheel: function onWheel() {
        if (ref.current) {
          ref.current.blur();
        }
      },
      className: "__ref-swap-widget-input-class",
      step: "any",
      value: amount,
      type: "number",
      placeholder: !onChangeAmount ? '-' : '0.0',
      onChange: function onChange(_ref7) {
        var target = _ref7.target;
        target.setCustomValidity('');
        handleChange(target.value);
      },
      disabled: !onChangeAmount,
      onKeyDown: function onKeyDown(e) {
        return symbolsArr.includes(e.key) && e.preventDefault();
      },
      style: {
        color: primary,
        marginBottom: '8px',
        width: '100%',
        textAlign: 'right',
        fontSize: '20px'
      }
    }), React__default.createElement("div", {
      style: {
        fontSize: '12px',
        color: secondary,
        textAlign: 'right'
      }
    }, !price ? '$-' : '~$' + toInternationalCurrencySystemLongString(multiply(price, amount || '0'), 2)))), !balance || !token || !onChangeAmount ? null : React__default.createElement("div", {
      className: "__ref-swap-widger-token-amount_balance __ref-swap-widget-row-flex-center",
      style: {
        fontSize: '12px',
        color: secondary
      }
    }, React__default.createElement("span", null, "Balance:\xA0", toPrecision(balance, 2)), token && React__default.createElement(HalfAndMaxAmount, {
      token: token,
      max: getMax(token.id, balance),
      onChangeAmount: handleChange,
      amount: amount
    })));
  };
  var SlippageSelector = function SlippageSelector(_ref8) {
    var slippageTolerance = _ref8.slippageTolerance,
      onChangeSlippageTolerance = _ref8.onChangeSlippageTolerance,
      showSlip = _ref8.showSlip,
      setShowSlip = _ref8.setShowSlip;
    var _useState6 = React.useState(false),
      invalid = _useState6[0],
      setInValid = _useState6[1];
    var theme = React.useContext(ThemeContext);
    var container = theme.container,
      buttonBg = theme.buttonBg,
      primary = theme.primary,
      borderRadius = theme.borderRadius,
      borderColor = theme.borderColor;
    var ref = React.useRef(null);
    var handleChange = function handleChange(amount) {
      onChangeSlippageTolerance(Number(amount));
      if (Number(amount) > 0 && Number(amount) < 100) {
        setInValid(false);
      } else {
        setInValid(true);
      }
      if (ref.current) {
        ref.current.value = amount;
      }
    };
    React.useEffect(function () {
      if (!showSlip) return;
      document.onclick = function () {
        return setShowSlip(false);
      };
      return function () {
        document.onclick = null;
      };
    }, [showSlip, setShowSlip]);
    if (!showSlip) return null;
    return React__default.createElement("div", {
      className: "__ref-swap-widget_slippage_selector __ref-swap-widget-col-flex-start",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: {
        background: container,
        border: "1px solid " + borderColor
      }
    }, React__default.createElement("span", {
      style: {
        color: primary,
        paddingBottom: '14px'
      }
    }, "Slippage tolerance"), React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center\n      "
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center\n        __ref-swap-widget_slippage_selector_input_container",
      style: {
        border: "1px solid " + (invalid ? '#FF7575' : borderColor),
        borderRadius: borderRadius
      }
    }, React__default.createElement("input", {
      ref: ref,
      max: 99.99999,
      min: 0.000001,
      defaultValue: slippageTolerance ? slippageTolerance : 0.5,
      onWheel: function onWheel() {
        if (ref.current) {
          ref.current.blur();
        }
      },
      value: slippageTolerance,
      step: "any",
      type: "number",
      required: true,
      placeholder: "",
      onChange: function onChange(_ref9) {
        var target = _ref9.target;
        return handleChange(target.value);
      },
      onKeyDown: function onKeyDown(e) {
        return symbolsArr.includes(e.key) && e.preventDefault();
      },
      style: {
        width: '100%',
        color: invalid ? '#FF7575' : primary
      },
      className: "__ref-swap-widget-input-class"
    }), React__default.createElement("span", {
      className: "ml-2"
    }, "%")), React__default.createElement("button", {
      className: "__ref-swap-widget_slippage_selector_button __ref-swap-widget-button " + (isMobile() ? '__ref-swap-widget-opacity-active' : '__ref-swap-widget-opacity-hover'),
      style: {
        color: primary,
        background: buttonBg,
        borderRadius: borderRadius
      },
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        onChangeSlippageTolerance(0.5);
        setInValid(false);
      }
    }, "Auto")), invalid && React__default.createElement("div", {
      className: " text-xs py-3 __ref-swap-widget-row-flex-center",
      style: {
        color: '#FF7575',
        fontSize: '12px',
        padding: '10px 0px',
        alignItems: 'start'
      }
    }, React__default.createElement(IoWarning.IoWarning, {
      className: "",
      style: {
        marginRight: '4px'
      },
      size: 20
    }), React__default.createElement("div", null, 'The slippage tolerance is invalid.')));
  };
  var StarToken = function StarToken(_ref10) {
    var price = _ref10.price,
      token = _ref10.token,
      onDelete = _ref10.onDelete,
      _onClick = _ref10.onClick;
    var theme = React.useContext(ThemeContext);
    var primary = theme.primary,
      secondary = theme.secondary,
      hover = theme.hover,
      borderColor = theme.borderColor;
    var _useState7 = React.useState(false),
      hoverIcon = _useState7[0],
      setHoverIcon = _useState7[1];
    var _useState8 = React.useState(false),
      hoverClose = _useState8[0],
      setHoverClose = _useState8[1];
    return React__default.createElement("div", {
      className: "__ref-swap-widget_star_token __ref-swap-widget-row-flex-center",
      onMouseEnter: function onMouseEnter() {
        return setHoverIcon(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverIcon(false);
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        _onClick(token);
      },
      style: {
        background: hoverIcon ? hover : 'transparent',
        border: "1px solid " + borderColor
      }
    }, hoverIcon && React__default.createElement("div", {
      style: {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        border: "1px solid " + borderColor,
        borderRadius: '100%',
        width: '16px',
        height: '16px',
        background: '#E3E3E3'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        onDelete(token);
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverClose(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverClose(false);
      }
    }, React__default.createElement(IoCloseOutline.IoCloseOutline, {
      stroke: hoverClose ? 'black' : '#7e8a93'
    })), React__default.createElement("img", {
      src: token.icon,
      alt: "",
      className: "__ref-swap-widget_token_icon",
      style: {
        height: '26px',
        width: '26px',
        marginRight: '2px'
      }
    }), React__default.createElement("div", {
      className: "__ref-swap-widget-col-flex-start"
    }, React__default.createElement("span", {
      style: {
        fontSize: '14px',
        color: primary
      }
    }, toRealSymbol(token.symbol)), React__default.createElement("span", {
      style: {
        fontSize: '10px',
        color: secondary
      }
    }, !price ? '$-' : '$' + toInternationalCurrencySystemLongString(price, 2))));
  };
  var Token = function Token(_ref11) {
    var token = _ref11.token,
      _onClick2 = _ref11.onClick,
      price = _ref11.price,
      balance = _ref11.balance,
      isSticky = _ref11.isSticky,
      onClickPin = _ref11.onClickPin,
      index = _ref11.index,
      setHoverIndex = _ref11.setHoverIndex,
      hoverIndex = _ref11.hoverIndex;
    var theme = React.useContext(ThemeContext);
    var primary = theme.primary,
      secondary = theme.secondary,
      hover = theme.hover,
      iconDefault = theme.iconDefault,
      iconHover = theme.iconHover;
    var displayBalance = 0 < Number(balance) && Number(balance) < 0.001 ? '< 0.001' : toPrecision(String(balance), 3);
    var _useState9 = React.useState(false),
      hoverOutLink = _useState9[0],
      setHoverOutLink = _useState9[1];
    var _useState10 = React.useState(false),
      hoverPin = _useState10[0],
      setHoverPin = _useState10[1];
    return React__default.createElement("div", {
      className: "__ref-swap-widget_token-selector-token-list-item __ref-swap-widget-row-flex-center",
      style: {
        background: hoverIndex === index ? hover : 'transparent'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        _onClick2(token);
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverIndex(index);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverIndex(-1);
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        justifyContent: 'space-between'
      }
    }, React__default.createElement("img", {
      src: token.icon,
      alt: "",
      className: "__ref-swap-widget_token_icon",
      style: {
        height: '36px',
        width: '36px',
        marginRight: '10px'
      }
    }), React__default.createElement("div", {
      className: "__ref-swap-widget-col-flex-start"
    }, React__default.createElement("span", {
      style: {
        fontSize: '14px',
        color: primary
      },
      className: "__ref-swap-widget-row-flex-center"
    }, toRealSymbol(token.symbol), TokenLinks[token.symbol] && React__default.createElement(HiOutlineExternalLink.HiOutlineExternalLink, {
      onMouseEnter: function onMouseEnter() {
        return setHoverOutLink(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverOutLink(false);
      },
      style: {
        marginLeft: '4px',
        marginTop: '2px'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(TokenLinks[token.symbol], '_blank');
      },
      stroke: hoverOutLink ? iconHover : iconDefault
    })), React__default.createElement("span", {
      style: {
        fontSize: '10px',
        color: secondary,
        marginTop: '2px'
      }
    }, !price ? '$-' : '$' + toInternationalCurrencySystemLongString(price, 2)))), React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        color: primary
      }
    }, displayBalance, isSticky ? React__default.createElement(AiFillPushpin.AiFillPushpin, {
      onMouseEnter: function onMouseEnter() {
        return setHoverPin(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverPin(false);
      },
      fill: hoverPin && hoverIndex === index ? iconHover : iconDefault,
      style: {
        marginLeft: '10px',
        cursor: 'pointer'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        onClickPin(token);
      }
    }) : React__default.createElement(AiOutlinePushpin.AiOutlinePushpin, {
      style: {
        marginLeft: '10px',
        cursor: 'pointer'
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverPin(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverPin(false);
      },
      fill: hoverPin && hoverIndex === index ? iconHover : iconDefault,
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        onClickPin(token);
      }
    })));
  };
  var TokenListTable = function TokenListTable(_ref12) {
    var tokens = _ref12.tokens,
      onClick = _ref12.onClick,
      balances = _ref12.balances,
      tokenPriceList = _ref12.tokenPriceList,
      starList = _ref12.starList,
      setStarList = _ref12.setStarList,
      onDelete = _ref12.onDelete;
    var _useState11 = React.useState('down'),
      currentSort = _useState11[0],
      setCurrentSort = _useState11[1];
    var theme = React.useContext(ThemeContext);
    var secondary = theme.secondary,
      borderColor = theme.borderColor;
    var onClickPin = function onClickPin(token) {
      if (starList.includes(token.id)) {
        onDelete(token);
      } else {
        var newList = [].concat(starList, [token.id]);
        setStarList(newList);
      }
    };
    var _useState12 = React.useState(-1),
      hoverIndex = _useState12[0],
      setHoverIndex = _useState12[1];
    var tokenSorting = function tokenSorting(a, b) {
      var b1 = balances[a.id];
      var b2 = balances[b.id];
      if (currentSort === 'up') {
        return Number(b1) - Number(b2);
      } else return Number(b2) - Number(b1);
    };
    return !tokens || tokens.length === 0 ? null : React__default.createElement("div", {
      className: "__ref-swap-widget_token_list_table"
    }, React__default.createElement("div", {
      className: "__ref-swap-widget_token_list_table_header",
      style: {
        color: secondary,
        borderBottom: "1px solid " + borderColor
      }
    }, React__default.createElement("span", {
      className: ""
    }, "Asset"), React__default.createElement("span", {
      onClick: function onClick() {
        setCurrentSort(currentSort === 'up' ? 'down' : 'up');
      },
      style: {
        cursor: 'pointer'
      },
      className: "__ref-swap-widget-row-flex-center"
    }, React__default.createElement("span", {
      className: "ml-1"
    }, "Balance"), currentSort === 'up' ? React__default.createElement(TiArrowSortedUp.TiArrowSortedUp, null) : React__default.createElement(TiArrowSortedDown.TiArrowSortedDown, null))), React__default.createElement("div", {
      className: "__ref-swap-widget_token_list_table_content"
    }, tokens.sort(tokenSorting).map(function (token, index) {
      var _tokenPriceList$token;
      return React__default.createElement(Token, {
        key: token.id + '-select-token-list-item-' + index,
        onClick: onClick,
        index: index,
        token: token,
        price: tokenPriceList == null ? void 0 : (_tokenPriceList$token = tokenPriceList[token.id]) == null ? void 0 : _tokenPriceList$token.price,
        balance: (balances == null ? void 0 : balances[token.id]) || '0',
        onClickPin: onClickPin,
        isSticky: starList.includes(token.id),
        setHoverIndex: setHoverIndex,
        hoverIndex: hoverIndex
      });
    })));
  };
  var TokenSelector = function TokenSelector(_ref13) {
    var onSelect = _ref13.onSelect,
      width = _ref13.width,
      tokens = _ref13.tokens,
      onClose = _ref13.onClose,
      balances = _ref13.balances,
      className = _ref13.className;
    var theme = React.useContext(ThemeContext);
    var container = theme.container,
      buttonBg = theme.buttonBg,
      primary = theme.primary,
      secondaryBg = theme.secondaryBg,
      iconDefault = theme.iconDefault;
    var _useState13 = React.useState(''),
      searchValue = _useState13[0],
      setSearchValue = _useState13[1];
    var tokenPriceList = React.useContext(TokenPriceContext);
    var handleSearch = function handleSearch(value) {
      setSearchValue(value);
    };
    var storagedStartList = localStorage.getItem(REF_WIDGET_STAR_TOKEN_LIST_KEY) ? JSON.parse(localStorage.getItem(REF_WIDGET_STAR_TOKEN_LIST_KEY) || '[]') : null;
    var DEFAULT_START_TOKEN_LIST = getConfig().networkId === 'testnet' ? DEFAULT_START_TOKEN_LIST_TESTNET : DEFAULT_START_TOKEN_LIST_MAINNET;
    var _useState14 = React.useState(storagedStartList || DEFAULT_START_TOKEN_LIST),
      starList = _useState14[0],
      _setStarList = _useState14[1];
    var onDelete = function onDelete(token) {
      var newStarList = starList.filter(function (starToken) {
        return starToken !== token.id;
      });
      _setStarList(newStarList);
      localStorage.setItem(REF_WIDGET_STAR_TOKEN_LIST_KEY, JSON.stringify(newStarList));
    };
    var tableListFilter = function tableListFilter(token) {
      var _token$symbol;
      if (!searchValue) return true;
      var searchValueLower = searchValue.toLowerCase();
      return ((_token$symbol = token.symbol) == null ? void 0 : _token$symbol.toLowerCase().includes(searchValueLower)) || false;
    };
    return React__default.createElement("div", {
      className: "__ref-swap_widget-token_selector __ref-swap-widget-container " + className,
      style: {
        position: 'relative',
        width: width,
        background: container
      }
    }, React__default.createElement(FiChevronLeft.FiChevronLeft, {
      onClick: onClose,
      style: {
        color: primary,
        position: 'absolute',
        cursor: 'pointer'
      }
    }), React__default.createElement("div", {
      className: "__ref-swap-widget-header-title __ref-swap-widget-row-flex-center",
      style: {
        color: primary,
        justifyContent: 'center',
        paddingBottom: '24px'
      }
    }, "Select a token"), React__default.createElement("div", {
      className: "__ref-swap-widget-select-token_input __ref-swap-widget-row-flex-center",
      style: {
        border: "1px solid " + buttonBg,
        background: secondaryBg
      }
    }, React__default.createElement(FaSearch.FaSearch, {
      fill: iconDefault,
      style: {
        marginRight: '8px'
      }
    }), React__default.createElement("input", {
      className: "__ref-swap-widget-input-class",
      placeholder: "Search token...",
      onChange: function onChange(evt) {
        return handleSearch(evt.target.value);
      },
      style: {
        fontSize: '14px',
        color: primary
      }
    })), React__default.createElement("div", {
      className: "__ref-swap-widget_token-selector-star-tokens __ref-swap-widget-row-flex-center"
    }, starList.map(function (id) {
      var _tokenPriceList$token2;
      if (!tokens || tokens.length === 0) return null;
      var token = tokens.find(function (token) {
        return token.id === id;
      });
      return !token ? null : React__default.createElement(StarToken, {
        key: token.id + '-star-token',
        token: token,
        price: tokenPriceList == null ? void 0 : (_tokenPriceList$token2 = tokenPriceList[token.id]) == null ? void 0 : _tokenPriceList$token2.price,
        onDelete: onDelete,
        onClick: onSelect
      });
    })), React__default.createElement(TokenListTable, {
      tokens: tokens.filter(tableListFilter),
      tokenPriceList: tokenPriceList,
      onClick: onSelect,
      balances: balances,
      starList: starList,
      setStarList: function setStarList(starList) {
        _setStarList(starList);
        localStorage.setItem(REF_WIDGET_STAR_TOKEN_LIST_KEY, JSON.stringify(starList));
      },
      onDelete: onDelete
    }));
  };
  var Slider = function Slider(_ref14) {
    var showSlip = _ref14.showSlip,
      setShowSlip = _ref14.setShowSlip;
    var _useState15 = React.useState(false),
      hover = _useState15[0],
      setHover = _useState15[1];
    return React__default.createElement("svg", {
      width: "17",
      height: "17",
      viewBox: "0 0 17 17",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      onMouseEnter: function onMouseEnter() {
        return setHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(false);
      },
      onClick: function onClick() {
        return setShowSlip(true);
      }
    }, React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12.6957 13.0652C12.6957 14.1338 11.8294 15 10.7609 15C9.69235 15 8.82611 14.1338 8.82611 13.0652C8.82612 11.9967 9.69235 11.1304 10.7609 11.1304C11.8294 11.1304 12.6957 11.9967 12.6957 13.0652ZM14.5749 12.0941C14.6145 12.0894 14.6548 12.0869 14.6957 12.0869L15.9565 12.0869C16.5088 12.0869 16.9565 12.5346 16.9565 13.0869C16.9565 13.6392 16.5088 14.0869 15.9565 14.0869L14.6957 14.0869C14.651 14.0869 14.6071 14.084 14.564 14.0783C14.1171 15.7605 12.5837 17 10.7609 17C8.93806 17 7.40472 15.7605 6.95777 14.0783C6.91471 14.084 6.87078 14.0869 6.82617 14.0869L1.00009 14.0869C0.447802 14.0869 8.61245e-05 13.6392 8.61728e-05 13.0869C8.62211e-05 12.5346 0.447802 12.0869 1.00009 12.0869L6.82617 12.0869C6.86702 12.0869 6.90729 12.0894 6.94686 12.0941C7.37926 10.3906 8.92291 9.13044 10.7609 9.13044C12.5989 9.13044 14.1425 10.3906 14.5749 12.0941ZM4.26086 3.93478C4.26086 2.86623 5.1271 2 6.19565 2C7.2642 2 8.13043 2.86623 8.13043 3.93478C8.13043 5.00333 7.2642 5.86957 6.19565 5.86957C5.1271 5.86956 4.26086 5.00333 4.26086 3.93478ZM6.19565 9.66601e-07C4.3728 8.07243e-07 2.83946 1.23952 2.39252 2.92168C2.34944 2.91601 2.3055 2.91309 2.26087 2.91309L0.999999 2.91309C0.447715 2.91309 -7.14972e-07 3.3608 -7.63254e-07 3.91309C-8.11537e-07 4.46537 0.447715 4.91309 0.999999 4.91309L2.26087 4.91309C2.30173 4.91309 2.34202 4.91063 2.3816 4.90587C2.81401 6.60936 4.35766 7.86956 6.19565 7.86957C8.03363 7.86957 9.57728 6.60936 10.0097 4.90588C10.0493 4.91064 10.0895 4.91309 10.1304 4.91309L15.9565 4.91309C16.5087 4.91309 16.9565 4.46537 16.9565 3.91309C16.9565 3.3608 16.5087 2.91309 15.9565 2.91309L10.1304 2.91309C10.0858 2.91309 10.0418 2.91601 9.99877 2.92167C9.55182 1.23952 8.01849 1.12596e-06 6.19565 9.66601e-07Z",
      fill: hover || showSlip ? '#00C6A2' : '#7E8A93'
    }));
  };
  var RefIcon = function RefIcon(props) {
    return React__default.createElement("svg", Object.assign({}, props, {
      width: "10",
      height: "10",
      viewBox: "0 0 10 10",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }), React__default.createElement("path", {
      d: "M6.36365 10H10L6.36365 6.36363V10Z",
      fill: "currentColor"
    }), React__default.createElement("path", {
      d: "M10 4.05312e-06L7.87879 3.86767e-06L10 2.12122L10 4.05312e-06Z",
      fill: "#00C6A2"
    }), React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M6.51531 6.36364C6.46444 6.36364 6.41387 6.36232 6.36365 6.35971V4.08371L8.83901 1.78516C9.18802 2.26148 9.3941 2.8491 9.3941 3.48485C9.3941 5.07476 8.10522 6.36364 6.51531 6.36364ZM8.19255 1.14486L6.36365 2.84313V0.60999C6.41387 0.607383 6.46444 0.606064 6.51531 0.606064C7.14111 0.606064 7.72027 0.805743 8.19255 1.14486Z",
      fill: "currentColor"
    }), React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M6.06046 0.606064H3.33319V3.29661L4.55696 4.52039L6.06046 3.12428V0.606064ZM6.06046 4.36486L4.5336 5.78267L3.33319 4.58226V10H6.06046V4.36486Z",
      fill: "currentColor"
    }), React__default.createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.0303 0.606064H0V4.50881L2.27284 2.23598L3.0303 2.99344V0.606064ZM3.0303 4.27909L2.27284 3.52162L0 5.79446V10H3.0303V4.27909Z",
      fill: "currentColor"
    }));
  };
  var Loading = function Loading() {
    return React__default.createElement("svg", {
      width: "38",
      height: "38",
      viewBox: "0 0 38 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "__ref-swap-widget-loading"
    }, React__default.createElement("circle", {
      cx: "19",
      cy: "19",
      r: "16",
      stroke: "#EEEEEE",
      strokeWidth: "6",
      strokeLinecap: "round"
    }), React__default.createElement("path", {
      d: "M19 35C27.8366 35 35 27.8366 35 19C35 10.1634 27.8366 3 19 3C10.1634 3 3 10.1634 3 19",
      stroke: "#00C6A2",
      strokeWidth: "4",
      strokeLinecap: "round"
    }));
  };
  var Warning = function Warning() {
    return React__default.createElement("svg", {
      width: "49",
      height: "49",
      viewBox: "0 0 49 49",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, React__default.createElement("path", {
      d: "M21.0359 5.99999C22.5755 3.33333 26.4245 3.33333 27.9641 6L42.2535 30.75C43.7931 33.4167 41.8686 36.75 38.7894 36.75H10.2106C7.13137 36.75 5.20688 33.4167 6.74648 30.75L21.0359 5.99999Z",
      stroke: "#FF689E",
      strokeWidth: "4",
      strokeLinecap: "round"
    }), React__default.createElement("line", {
      x1: "24",
      y1: "14",
      x2: "24",
      y2: "24",
      stroke: "#FF689E",
      strokeWidth: "4",
      strokeLinecap: "round"
    }), React__default.createElement("circle", {
      cx: "24",
      cy: "30",
      r: "2",
      fill: "#FF689E"
    }));
  };
  var Success = function Success() {
    return React__default.createElement("div", {
      style: {
        position: 'relative',
        height: '32px',
        width: '32px'
      }
    }, React__default.createElement("svg", {
      width: "38",
      height: "38",
      viewBox: "0 0 38 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        position: 'absolute',
        top: 0,
        left: 0
      }
    }, React__default.createElement("circle", {
      cx: "19",
      cy: "19",
      r: "16",
      stroke: "#EEEEEE",
      strokeWidth: "6",
      strokeLinecap: "round"
    })), React__default.createElement("svg", {
      width: "30",
      height: "23",
      viewBox: "0 0 30 23",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        position: 'absolute',
        top: 4,
        left: 4
      }
    }, React__default.createElement("path", {
      d: "M2 11.2727L10.4898 20L28 2",
      stroke: "#00C6A2",
      strokeWidth: "4",
      strokeLinecap: "round"
    })));
  };
  var RouterIcon = function RouterIcon() {
    return React__default.createElement("svg", {
      width: "16",
      height: "12",
      viewBox: "0 0 16 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "mr-2"
    }, React__default.createElement("path", {
      d: "M13.4862 6.25488C12.2813 6.25488 11.2485 7.10159 11.019 8.28698H6.02703L4.7647 7.21448C4.93684 6.8758 5.05159 6.48067 5.10897 6.0291C5.10897 5.52107 4.93684 4.9566 4.59257 4.56147L6.02703 3.1503H11.0763C11.478 4.44858 12.8551 5.23884 14.1748 4.84371C15.4945 4.44858 16.2978 3.09385 15.8961 1.79557C15.4945 0.497295 14.1174 -0.292963 12.7977 0.102166C11.937 0.327954 11.3059 1.00532 11.0763 1.79557H5.51062L3.50237 3.77122C3.21548 3.65832 2.92859 3.60188 2.58432 3.60188C1.20723 3.54543 0.0596573 4.61792 0.00227872 5.97265C-0.0550999 7.32738 0.977715 8.45632 2.3548 8.51276H2.58432C3.04334 8.51276 3.44499 8.39987 3.84664 8.17408L5.568 9.6417H11.1911C11.7075 10.8835 13.142 11.5045 14.4043 11.0529C15.6666 10.5449 16.2978 9.13368 15.8388 7.89185C15.4371 6.8758 14.5191 6.25488 13.4862 6.25488V6.25488ZM13.4862 1.344C14.1174 1.344 14.6338 1.85202 14.6338 2.47294C14.6338 3.09385 14.1174 3.60188 13.4862 3.60188C12.8551 3.60188 12.3387 3.09385 12.3387 2.47294C12.3387 1.85202 12.8551 1.344 13.4862 1.344ZM2.58432 7.15804C1.95315 7.15804 1.43674 6.65001 1.43674 6.0291C1.43674 5.40818 1.95315 4.90016 2.58432 4.90016C3.21548 4.90016 3.73189 5.40818 3.73189 6.0291C3.73189 6.65001 3.21548 7.15804 2.58432 7.15804ZM13.4862 9.86749C12.8551 9.86749 12.3387 9.35947 12.3387 8.73855C12.3387 8.11763 12.8551 7.60961 13.4862 7.60961C14.1174 7.60961 14.6338 8.11763 14.6338 8.73855C14.6338 9.35947 14.1174 9.86749 13.4862 9.86749Z",
      fill: "url(#paint0_linear_12461_2312)"
    }), React__default.createElement("defs", null, React__default.createElement("linearGradient", {
      id: "paint0_linear_12461_2312",
      x1: "8",
      y1: "0",
      x2: "8",
      y2: "11.2",
      gradientUnits: "userSpaceOnUse"
    }, React__default.createElement("stop", {
      stopColor: "#00C6A2"
    }), React__default.createElement("stop", {
      offset: "1",
      stopColor: "#8C78FF"
    }))));
  };
  var Notification = function Notification(_ref15) {
    var state = _ref15.state,
      tx = _ref15.tx,
      detail = _ref15.detail,
      open = _ref15.open,
      setOpen = _ref15.setOpen,
      setState = _ref15.setState;
    var theme = React.useContext(ThemeContext);
    var container = theme.container,
      buttonBg = theme.buttonBg,
      primary = theme.primary;
    if (!open) return null;
    return React__default.createElement("div", {
      className: "__ref-swap-widget-notification",
      style: {
        color: primary,
        background: container
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-notification__icon"
    }, state === null && React__default.createElement(Loading, null), state === 'fail' && React__default.createElement(Warning, null), state === 'success' && React__default.createElement(Success, null)), React__default.createElement("div", {
      style: {
        fontSize: '16px',
        marginTop: '10px',
        marginBottom: '6px'
      }
    }, state === 'success' && React__default.createElement("p", null, "Success!"), state === 'fail' && React__default.createElement("p", null, "Swap Failed!")), React__default.createElement("div", {
      className: "__ref-swap-widget-notification__text",
      style: {
        color: primary
      }
    }, (state === null || state === undefined) && React__default.createElement("p", null, "Waiting for confirmation"), state === 'fail' && !!tx && React__default.createElement("a", {
      className: "text-primary font-semibold",
      href: exports.config.explorerUrl + "/txns/" + tx,
      target: "_blank",
      style: {
        textDecoration: 'underline',
        fontSize: '14px',
        color: primary
      },
      rel: "noreferrer"
    }, "Click to view."), state === 'success' && detail), state !== null && React__default.createElement("button", {
      className: "__ref-swap-widget-notification__button __ref-swap-widget-button",
      style: {
        background: buttonBg,
        fontWeight: 700,
        color: 'white'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        setState && setState(null);
      }
    }, "Close"));
  };
  var ArrowRight = function ArrowRight() {
    return React__default.createElement("div", {
      className: "mx-1"
    }, React__default.createElement("svg", {
      width: "12",
      height: "5",
      viewBox: "0 0 12 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, React__default.createElement("path", {
      d: "M8.864 4.4C9.024 4.05867 9.17867 3.76 9.328 3.504C9.488 3.248 9.64267 3.03467 9.792 2.864H0.464V2.192H9.792C9.64267 2.01067 9.488 1.792 9.328 1.536C9.17867 1.28 9.024 0.986666 8.864 0.656H9.424C10.096 1.43467 10.8 2.01067 11.536 2.384V2.672C10.8 3.03467 10.096 3.61067 9.424 4.4H8.864Z",
      fill: "#7E8A93"
    })));
  };
  var AccountButton = function AccountButton(_ref16) {
    var AccountId = _ref16.AccountId,
      onDisConnect = _ref16.onDisConnect;
    var _useState16 = React.useState(false),
      hoverAccount = _useState16[0],
      setHoverAccount = _useState16[1];
    var theme = React.useContext(ThemeContext);
    var primary = theme.primary,
      secondaryBg = theme.secondaryBg,
      borderColor = theme.borderColor;
    return !AccountId ? null : React__default.createElement("div", {
      className: "__ref-swap-widget-header-button-account __ref-swap-widget-row-flex-center",
      style: {
        color: primary,
        background: secondaryBg,
        border: "1px solid " + borderColor,
        cursor: 'pointer'
      },
      onClick: function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        hoverAccount && onDisConnect();
      },
      onMouseEnter: function onMouseEnter() {
        return setHoverAccount(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoverAccount(false);
      }
    }, hoverAccount ? 'Disconnect' : getAccountName(AccountId));
  };

  var SwapWidget = function SwapWidget(props) {
    var _tokenPriceList$token, _tokenPriceList$token2;
    var theme = props.theme,
      defaultTokenList = props.defaultTokenList,
      onSwap = props.onSwap,
      connection = props.connection,
      width = props.width,
      height = props.height,
      enableSmartRouting = props.enableSmartRouting,
      className = props.className,
      transactionState = props.transactionState,
      onConnect = props.onConnect,
      defaultTokenIn = props.defaultTokenIn,
      defaultTokenOut = props.defaultTokenOut,
      onDisConnect = props.onDisConnect,
      darkMode = props.darkMode,
      referralId = props.referralId;
    var curTheme = theme || (darkMode ? defaultDarkModeTheme : defaultTheme);
    var STORAGED_TOKEN_IN = localStorage.getItem(REF_WIDGET_SWAP_IN_KEY);
    var STORAGED_TOKEN_OUT = localStorage.getItem(REF_WIDGET_SWAP_OUT_KEY);
    var container = curTheme.container,
      buttonBg = curTheme.buttonBg,
      primary = curTheme.primary,
      secondary = curTheme.secondary,
      fontFamily = curTheme.fontFamily,
      iconDefault = curTheme.iconDefault,
      refIcon = curTheme.refIcon;
    var AccountId = connection.AccountId,
      isSignedInProp = connection.isSignedIn;
    var isSignedIn = !!AccountId && isSignedInProp;
    var _useState = React.useState(),
      tokenIn = _useState[0],
      setTokenIn = _useState[1];
    var handleSetTokenIn = function handleSetTokenIn(token) {
      setTokenIn(token);
      localStorage.setItem(REF_WIDGET_SWAP_IN_KEY, token.id);
    };
    var handleSetTokenOut = function handleSetTokenOut(token) {
      setTokenOut(token);
      localStorage.setItem(REF_WIDGET_SWAP_OUT_KEY, token.id);
    };
    var _useState2 = React.useState(),
      tokenOut = _useState2[0],
      setTokenOut = _useState2[1];
    var _useState3 = React.useState(''),
      tokenInBalance = _useState3[0],
      setTokenInBalance = _useState3[1];
    var _useState4 = React.useState(''),
      tokenOutBalance = _useState4[0],
      setTokenOutBalance = _useState4[1];
    var _useState5 = React.useState(false),
      notOpen = _useState5[0],
      setNotOpen = _useState5[1];
    React.useEffect(function () {
      if (!transactionState) return;
      if (transactionState && transactionState.state !== null) {
        setNotOpen(true);
      }
      transactionState == null ? void 0 : transactionState.setState((transactionState == null ? void 0 : transactionState.state) || null);
    }, [transactionState]);
    var _useState6 = React.useState('swap'),
      widgetRoute = _useState6[0],
      setWidgetRoute = _useState6[1];
    var _useState7 = React.useState('1'),
      amountIn = _useState7[0],
      setAmountIn = _useState7[1];
    var _useState8 = React.useState(false),
      showSlip = _useState8[0],
      setShowSlip = _useState8[1];
    var _useState9 = React.useState(0.5),
      slippageTolerance = _useState9[0],
      setSlippageTolerance = _useState9[1];
    var _useTokensIndexer = useTokensIndexer({
        defaultTokenList: defaultTokenList,
        AccountId: AccountId
      }),
      tokens = _useTokensIndexer.tokens,
      tokenLoading = _useTokensIndexer.tokenLoading;
    // cache list tokens
    useAllTokens({
      reload: true
    });
    var balances = useTokenBalnces(tokens, AccountId);
    var _useState10 = React.useState(false),
      refreshTrigger = _useState10[0],
      setRreshTrigger = _useState10[1];
    var tokenPriceList = useTokenPriceList();
    var _useRefPools = useRefPools(refreshTrigger),
      allPools = _useRefPools.allPools,
      allStablePools = _useRefPools.allStablePools,
      poolFetchingState = _useRefPools.poolFetchingState;
    React.useEffect(function () {
      var defaultIn = STORAGED_TOKEN_IN || defaultTokenIn || exports.WRAP_NEAR_CONTRACT_ID;
      var defaultOut = STORAGED_TOKEN_OUT || defaultTokenOut || exports.REF_TOKEN_ID;
      if (tokens.length > 0 && defaultIn && tokens.findIndex(function (t) {
        return t.id === defaultIn;
      }) !== -1) {
        if (defaultIn === exports.WRAP_NEAR_CONTRACT_ID || defaultIn === 'NEAR') {
          handleSetTokenIn(_extends({}, NEAR_META_DATA, {
            id: exports.WRAP_NEAR_CONTRACT_ID
          }));
        } else {
          ftGetTokenMetadata(defaultIn).then(handleSetTokenIn);
        }
      } else if (tokens.length > 0 && defaultIn && tokens.findIndex(function (t) {
        return t.id === defaultIn;
      }) === -1) {
        handleSetTokenIn(_extends({}, NEAR_META_DATA, {
          id: exports.WRAP_NEAR_CONTRACT_ID
        }));
      }
      if (tokens.length > 0 && defaultOut && tokens.findIndex(function (t) {
        return t.id === defaultOut;
      }) !== -1) {
        if (defaultOut === exports.WRAP_NEAR_CONTRACT_ID || defaultOut === 'NEAR') {
          handleSetTokenOut(_extends({}, NEAR_META_DATA, {
            id: exports.WRAP_NEAR_CONTRACT_ID
          }));
        } else {
          ftGetTokenMetadata(defaultOut).then(handleSetTokenOut);
        }
      } else if (tokens.length > 0 && defaultOut && tokens.findIndex(function (t) {
        return t.id === defaultOut;
      }) === -1) {
        handleSetTokenOut(exports.REF_META_DATA);
      }
    }, [tokens, tokenLoading]);
    React.useEffect(function () {
      if (!tokenIn) return;
      var wrapedId = tokenIn.id === exports.WRAP_NEAR_CONTRACT_ID ? 'NEAR' : tokenIn.id;
      if (balances[wrapedId]) {
        setTokenInBalance(balances[wrapedId]);
        return;
      }
      ftGetBalance(wrapedId, AccountId).then(function (available) {
        setTokenInBalance(toReadableNumber(tokenIn.decimals, available));
      });
    }, [tokenIn, AccountId, balances]);
    React.useEffect(function () {
      if (!tokenOut) return;
      var wrapedId = tokenOut.id === exports.WRAP_NEAR_CONTRACT_ID ? 'NEAR' : tokenOut.id;
      if (balances[wrapedId]) {
        setTokenOutBalance(balances[wrapedId]);
        return;
      }
      ftGetBalance(wrapedId, AccountId).then(function (available) {
        setTokenOutBalance(toReadableNumber(tokenOut.decimals, available));
      });
    }, [tokenOut, AccountId, balances]);
    var _useSwap = useSwap({
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        amountIn: amountIn,
        simplePools: allPools.simplePools.filter(function (p) {
          return Number(p.shareSupply) > 0;
        }),
        options: {
          enableSmartRouting: enableSmartRouting,
          stablePools: allPools.ratedPools.concat(allPools.unRatedPools).filter(function (p) {
            return Number(p.shareSupply) > 0;
          }),
          stablePoolsDetail: allStablePools.filter(function (p) {
            return Number(p.shares_total_supply) > 0;
          })
        },
        slippageTolerance: slippageTolerance,
        onSwap: onSwap,
        AccountId: AccountId,
        refreshTrigger: refreshTrigger,
        poolFetchingState: poolFetchingState,
        referralId: referralId
      }),
      amountOut = _useSwap.amountOut,
      minAmountOut = _useSwap.minAmountOut,
      rate = _useSwap.rate,
      fee = _useSwap.fee,
      estimates = _useSwap.estimates,
      canSwap = _useSwap.canSwap,
      swapError = _useSwap.swapError,
      makeSwap = _useSwap.makeSwap,
      setAmountOut = _useSwap.setAmountOut;
    var priceImpact = React.useMemo(function () {
      if (!tokenIn || !tokenOut) return '0';
      return getPriceImpact({
        estimates: estimates,
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        amountIn: amountIn,
        amountOut: amountOut,
        stablePools: allStablePools
      });
    }, [estimates, tokenIn, tokenOut, amountIn, amountOut, allStablePools]);
    var handleSubmit = function handleSubmit(e) {
      e.preventDefault();
      setNotOpen(true);
      makeSwap();
    };
    var canSubmit = tokenIn && tokenOut && canSwap && !swapError && isSignedIn && new Big(tokenInBalance || '0').gte(amountIn || '0') && slippageTolerance > 0 && slippageTolerance < 100 && !ONLY_ZEROS.test(tokenInBalance);
    return React__default.createElement(ThemeContextProvider, {
      customTheme: curTheme
    }, React__default.createElement(TokenPriceContextProvider, null, widgetRoute === 'swap' && React__default.createElement("form", {
      className: "__ref-swap-widget-container " + className,
      onSubmit: handleSubmit,
      style: {
        background: container,
        fontFamily: fontFamily,
        width: width,
        height: height
      }
    }, React__default.createElement("div", {
      className: "__ref-swap-widget-header __ref-swap-widget-row-flex-center"
    }, React__default.createElement("div", {
      style: {
        color: primary
      },
      className: "__ref-swap-widget-header-title"
    }, "Swap"), React__default.createElement("div", {
      className: "__ref-swap-widget-header-button __ref-swap-widget-row-flex-center",
      style: {
        position: 'relative'
      }
    }, React__default.createElement(AccountButton, {
      onDisConnect: onDisConnect,
      AccountId: AccountId
    }), React__default.createElement(Slider, {
      showSlip: showSlip,
      setShowSlip: setShowSlip
    }), React__default.createElement(SlippageSelector, {
      slippageTolerance: slippageTolerance,
      onChangeSlippageTolerance: setSlippageTolerance,
      showSlip: showSlip,
      setShowSlip: setShowSlip
    }))), React__default.createElement(TokenAmount, {
      amount: amountIn,
      balance: tokenInBalance,
      token: tokenIn,
      price: !tokenIn ? null : tokenPriceList == null ? void 0 : (_tokenPriceList$token = tokenPriceList[tokenIn.id]) == null ? void 0 : _tokenPriceList$token.price,
      onChangeAmount: setAmountIn,
      onSelectToken: function onSelectToken() {
        setWidgetRoute('token-selector-in');
      }
    }), React__default.createElement("div", {
      className: "__ref-swap-widget-exchange-button __ref-swap-widget-row-flex-center ",
      style: {
        color: iconDefault
      }
    }, React__default.createElement(CgArrowsExchangeAltV.CgArrowsExchangeAltV, {
      style: {
        cursor: 'pointer'
      },
      className: "__ref-swap-widget-exchange-button-icon " + (isMobile() ? '__ref-swap-widget-active' : '__ref-swap-widget-hover'),
      size: 30,
      onClick: function onClick() {
        tokenOut && handleSetTokenIn(tokenOut);
        tokenIn && handleSetTokenOut(tokenIn);
        setAmountIn('1');
        setAmountOut('');
      }
    })), React__default.createElement(TokenAmount, {
      amount: toPrecision(amountOut, 8),
      balance: tokenOutBalance,
      token: tokenOut,
      price: !tokenOut ? null : tokenPriceList == null ? void 0 : (_tokenPriceList$token2 = tokenPriceList[tokenOut.id]) == null ? void 0 : _tokenPriceList$token2.price,
      onSelectToken: function onSelectToken() {
        setWidgetRoute('token-selector-out');
      },
      onForceUpdate: function onForceUpdate() {
        setRreshTrigger(!refreshTrigger);
      },
      poolFetchingState: poolFetchingState
    }), !swapError && amountIn && amountOut && React__default.createElement(DetailView, {
      fee: fee,
      rate: rate,
      amountIn: amountIn,
      minReceived: minAmountOut,
      tokenIn: tokenIn,
      tokenOut: tokenOut,
      amountOut: amountOut,
      priceImpact: priceImpact,
      estimates: estimates
    }), swapError && React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        color: '#DE9450',
        fontSize: '14px',
        paddingTop: '16px'
      }
    }, React__default.createElement(TiWarning.TiWarning, {
      fill: "#DE9450",
      size: 20
    }), "\xA0", swapError.message), isSignedIn ? React__default.createElement("button", {
      type: "submit",
      className: "__ref-swap-widget-submit-button __ref-swap-widget-button",
      style: {
        color: 'white',
        background: buttonBg,
        opacity: !canSubmit ? 0.5 : 1,
        cursor: !canSubmit ? 'not-allowed' : 'pointer'
      },
      disabled: !canSubmit
    }, 'Swap') : React__default.createElement("button", {
      type: "button",
      className: "__ref-swap-widget-submit-button __ref-swap-widget-button",
      onClick: onConnect,
      style: {
        color: 'white',
        background: buttonBg,
        cursor: 'pointer'
      }
    }, 'Connect Wallet'), React__default.createElement("div", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        justifyContent: 'center'
      }
    }, React__default.createElement("a", {
      className: "__ref-swap-widget-row-flex-center",
      style: {
        color: secondary,
        justifyContent: 'center',
        paddingTop: '12px',
        fontSize: '14px',
        display: 'inline-flex'
      },
      href: "https://ref.finance",
      target: "_blank",
      rel: "noreferrer"
    }, React__default.createElement(RefIcon, {
      style: {
        color: refIcon || 'black'
      }
    }), "\xA0 Powered by Ref.finance")), React__default.createElement(Notification, {
      state: transactionState == null ? void 0 : transactionState.state,
      setState: transactionState == null ? void 0 : transactionState.setState,
      open: notOpen,
      setOpen: setNotOpen,
      tx: transactionState == null ? void 0 : transactionState.tx,
      detail: transactionState == null ? void 0 : transactionState.detail
    })), widgetRoute === 'token-selector-in' && React__default.createElement(TokenSelector, {
      balances: balances,
      tokens: tokens,
      width: width,
      onSelect: function onSelect(token) {
        handleSetTokenIn(token);
        setWidgetRoute('swap');
      },
      onClose: function onClose() {
        return setWidgetRoute('swap');
      },
      AccountId: AccountId,
      className: className
    }), widgetRoute === 'token-selector-out' && React__default.createElement(TokenSelector, {
      tokens: tokens,
      balances: balances,
      width: width,
      onSelect: function onSelect(token) {
        handleSetTokenOut(token);
        setWidgetRoute('swap');
      },
      onClose: function onClose() {
        return setWidgetRoute('swap');
      },
      AccountId: AccountId,
      className: className
    })));
  };

  var DefaultTestnetTokenList = [{
    spec: 'ft-1.0.0',
    name: 'Wrapped NEAR fungible token',
    symbol: 'wNEAR',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'wrap.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Banana',
    symbol: 'BANANA',
    icon: 'https://assets.onlinelabels.com/images/clip-art/pitr/pitr_Bananas_icon.png',
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'banana.ft-fin.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'NEAR Wrapped USDC',
    symbol: 'nUSDC',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    reference: null,
    reference_hash: null,
    decimals: 2,
    id: 'nusdc.ft-fin.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'NEAR Wrapped Tether',
    symbol: 'nUSDT',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'nusdt.ft-fin.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Ref Finance Token',
    symbol: 'RFT',
    icon: '',
    reference: null,
    reference_hash: null,
    decimals: 8,
    id: 'rft.tokenfactory.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'USD Coin',
    symbol: 'USDC',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%232775C9'/%3E%3Cpath d='M15.75 27.5C9.26 27.5 4 22.24 4 15.75S9.26 4 15.75 4 27.5 9.26 27.5 15.75A11.75 11.75 0 0115.75 27.5zm-.7-16.11a2.58 2.58 0 00-2.45 2.47c0 1.21.74 2 2.31 2.33l1.1.26c1.07.25 1.51.61 1.51 1.22s-.77 1.21-1.77 1.21a1.9 1.9 0 01-1.8-.91.68.68 0 00-.61-.39h-.59a.35.35 0 00-.28.41 2.73 2.73 0 002.61 2.08v.84a.705.705 0 001.41 0v-.85a2.62 2.62 0 002.59-2.58c0-1.27-.73-2-2.46-2.37l-1-.22c-1-.25-1.47-.58-1.47-1.14 0-.56.6-1.18 1.6-1.18a1.64 1.64 0 011.59.81.8.8 0 00.72.46h.47a.42.42 0 00.31-.5 2.65 2.65 0 00-2.38-2v-.69a.705.705 0 00-1.41 0v.74zm-8.11 4.36a8.79 8.79 0 006 8.33h.14a.45.45 0 00.45-.45v-.21a.94.94 0 00-.58-.87 7.36 7.36 0 010-13.65.93.93 0 00.58-.86v-.23a.42.42 0 00-.56-.4 8.79 8.79 0 00-6.03 8.34zm17.62 0a8.79 8.79 0 00-6-8.32h-.15a.47.47 0 00-.47.47v.15a1 1 0 00.61.9 7.36 7.36 0 010 13.64 1 1 0 00-.6.89v.17a.47.47 0 00.62.44 8.79 8.79 0 005.99-8.34z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'usdc.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Tether USD',
    symbol: 'USDT.e',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'usdt.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23F4B731' fill-rule='nonzero' cx='16' cy='16' r='16'/%3E%3Cpath d='M9.277 8h6.552c3.985 0 7.006 2.116 8.13 5.194H26v1.861h-1.611c.031.294.047.594.047.898v.046c0 .342-.02.68-.06 1.01H26v1.86h-2.08C22.767 21.905 19.77 24 15.83 24H9.277v-5.131H7v-1.86h2.277v-1.954H7v-1.86h2.277V8zm1.831 10.869v3.462h4.72c2.914 0 5.078-1.387 6.085-3.462H11.108zm11.366-1.86H11.108v-1.954h11.37c.041.307.063.622.063.944v.045c0 .329-.023.65-.067.964zM15.83 9.665c2.926 0 5.097 1.424 6.098 3.528h-10.82V9.666h4.72z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'dai.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='256' height='256'%3E%3Cdefs%3E%3Ctext id='A' x='50' y='180' font-size='180'%3Eð%3C/text%3E%3C/defs%3E%3Cuse xlink:href='%23A'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'weth.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'HAPI',
    symbol: 'HAPI',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='600px' height='600px' viewBox='0 0 600 600' enable-background='new 0 0 600 600' xml:space='preserve'%3E %3Cg%3E %3Cg%3E %3Cpath fill='%23141414' d='M263.7,122.8c-3.6,0.3-7.1,0.9-10.7,1.8c-24.5,6-40.3,18.1-50.4,31c24.5-4.7,49.9,1.3,67.3,7.4 c0.5,0.2,1,0.4,1.6,0.6c-2.7-4.2-5.2-9-7.2-14.4C261.2,141.1,261.6,131.6,263.7,122.8z'/%3E %3Cpath fill='%23141414' d='M201.2,197.7c-9.8-1.1-19.1-2.1-24.6-2.1c-0.7,0-1.4,0-2,0.1c-38.1,2.6-67.2,37.3-69.1,82.4 c-1.4,32.2,13.5,53.1,23.3,63.4c-1.5-12.5-0.1-25,4.3-37.3c11.7-32.6,34.3-42.1,60.6-53.1c10.8-4.5,22.5-9.5,34.3-16.6l50.1-39.6 c-10.1,2.2-24.4,4.5-42.9,5.3C227.1,200.6,213.9,199.1,201.2,197.7z'/%3E %3Cpath fill='%23141414' d='M319.1,176.5c-0.5,1.1,0.9,2.1,1.8,1.2c5.3-5.4,16.3-14.3,30.8-14.2c15.6,0.1,35.5,10.2,40.5,22.1 c4,9.8-6.6,16.5-6.6,16.5l0,0c-2.5-2.7-8-6.3-18.2-6.6c-15-0.5-25.3,12.1-24.1,12.9c7.5,4.7,17.3,3.7,23.1,3.5 c5.8-0.2,15.1-2.5,17.8-3.5c4.7-1.8,11.7-7.8,14.9-16.1c2.5-6.5,8.4-28.7-25.2-34.4C352.7,154.3,327,159.6,319.1,176.5z'/%3E %3Cpath fill='%23141414' d='M473.1,225.1c-0.5-0.6-1.1-1.3-1.7-2l-0.3-0.3c-3.9-4.4-7.6-8.3-9.4-10.1c1.2-4.2,4-16.2,1-26.1 c-2.3-7.7-6.8-15.5-9.2-19.4l-0.8-1.2h0c-0.4-0.6-0.8-1.2-1.1-1.7c-0.3-0.4-0.5-0.7-0.6-1l-0.2-0.7c-2.5-7-8.6-22.3-16.4-28.1 l59.4-91.7c2.3-3.5-2.1-7.5-5.4-5l-86.8,66.5c-8.7-12.3-21.1-21.8-21.8-22.4c-0.8-0.6-2-0.7-2.9-0.2c-0.9,0.5-1.4,1.6-1.3,2.6 c0,0.1,0.6,5.9-2.9,17.6c7.5,2.7,13.9,6,19.3,9.7l-4.5,3.5c-8.8-5.7-20-10.5-34.3-12.6c-17.7-2.6-31.9,1-42.1,10.7c0,0,0,0,0,0 c5.9,3.8,13.1,8.7,17,12.4c0.8,0.7,1.5,1.5,2.2,2.3c-3.1,0.9-6.2,1.9-9.3,2.9c-0.3-0.2-0.5-0.5-0.8-0.7c-1.9-1.7-4.4-3.4-7-5.3 c-5.4-3.8-11.7-8.3-15.8-14c-2.2-3.1-3.8-6.5-4.3-10.4c-0.3-2.4-1-4-2.2-4.9c0,0,0,0,0,0c0,0,0,0,0,0c-0.6-0.5-2.8-2-5.8,0.3 c-2,1.6-4.4,5.3-6.5,10.3c-5.2,12.3-8.7,32.1-1.8,46.1c1.2,2.3,2.4,4.5,3.7,6.6c-0.4,1-0.7,2.1-0.9,3.1c-0.6,3.4-0.9,7.8-1.2,12.7 c-19.8-8.3-50.5-17.5-78.5-10.7c-23.9,5.8-39.4,17.5-49.6,30c7.4-3.1,15.2-5,23.5-5.6c5.6-0.4,16.4,0.8,27.9,2.1 c11.8,1.3,25.3,2.8,32.9,2.4c19.2-0.8,33.7-3.3,43.5-5.6c0,5.4,0.1,11.1,0.4,16.9c0.7,16.8,2.5,34.3,5,46.5 c3.6,17.9,16.5,55.2,31.4,64.6c5.5,3.5,13.5,8.2,22.9,13.4c-2.5,6.4-5.1,15.1-5.1,23.5c0,15.2,5.2,26.6,11,37 c4.6,8.2,9.6,15.7,12.8,24c2.5,6.5-2.7,27.7-5.6,38.9c-1.2,4.5-1.9,7.3-1.7,7c3.7-5.1,7.5-10.8,11.3-16.8 c15.3-24.2,19.4-47,19.5-48l0.2-1.4l-1.1-1c-0.2-0.2-17.2-15.7-18.3-33.3c-0.4-6.9,1-11.5,4.3-13.8c0.5-0.3,1-0.6,1.6-0.9 c7.5,3.7,15,7.3,22.2,10.5c2.8,3.5,9,9.4,11.8,12c3.4,3.2,6.9,7.8,12.2,7.8c5.3,0,15.9,0,21.3,0s13.1,0,17.3-2.1 c4.2-2.1,10.9-5.6,11-12.6c0-1.5,0.4-3.9,0.9-6.8c3.7-4.9,4.1-10.6,4.8-19.2c0.5-5.7,1.7-15.5,3-25.9c2-15.7,4.1-32,3.9-37.9 c-0.2-8.2-1.1-14.3-1.4-16.2C475.3,249.4,479.5,232.4,473.1,225.1z M318,310.6c-13.3-8.4-25.6-44.6-29-61.2 c-4.8-23.9-6.9-68.5-3.9-86.8c2.7-16.7,49-34.5,81.7-35.6c1.9-0.1,3.8-0.1,5.6-0.1c1,0,2,0,3,0c-0.1,4.9,1.3,15.6,13.8,25.5 c13.9,11,30.4,5,30.4,5l12.1-18.7c4.5,3.5,9.4,12.7,13,22.1c-0.9-0.4-1.9-0.7-3.1-0.9c-8.1-1.3-31.6-0.9-24,31.3 c1,4,5.2,9.4,17.2,22.3c2.8,3,5.1,5.3,7,7.2c5.6,5.6,7.4,7.4,7.5,11.8c0,0.3-0.2,1.6-0.4,3c-0.8-0.6-1.9-1.1-3.4-1 c-3.6-0.2-33.7,5.6-42.4,15.1c-1.7,1.9-4.5,2.6-6.7,1.4c-0.1-0.1-0.2-0.1-0.3-0.2c-1.4-0.8-2.3-1.9-2.8-3.5 c-1.3-5.1,2.9-13.2,4.6-16c0.6-1,0.3-2.3-0.6-2.9c-1-0.6-2.3-0.3-2.9,0.6c-0.1,0.2-0.9,1.5-1.9,3.5c-3.3,6.6-8.2,12.2-14.3,16.3 c-9.8,6.6-24,15.2-35.5,18.2c-18,4.7-24.9-8.2-25.2-8.8c-0.5-1-1.8-1.4-2.8-0.9c-1,0.5-1.5,1.8-0.9,2.8 c0.1,0.1,6.3,12.1,21.5,12.1c0.6,0,1.4-0.1,2.2-0.2c4.3-0.5,8.6,0.5,12.3,2.7c3.5,2.1,8,4.7,12.5,7c12.6,6.3,14.7,6.2,19.5,5.4 c1.1-0.2,49.8-2.4,80.1-8.2l3.6,0.2c2.4,0.1,4.3,2.3,4,4.7l0,0.1c-0.2,1.4-1,2.6-2.2,3.3c-2.7,1.5-6.5,3.5-9.9,4.9 c-1.6,0.6-3.3,1.2-5.1,1.6c-5.5,1.3-11.1,1.6-11.1,1.6s-5.4,1.2-13.5,2.1c-3.4,0.4-7.2,0.7-11.3,0.9c-14,0.7-13,1.6-24.8,1 c-2.9-0.1-5.7-0.3-8.3-0.6c-2.5-0.3-3.2,3.4-0.7,4c6.1,1.5,13.3,2.6,21.3,2.5c1,0,1.9,0,2.9,0c12.8-0.1,24.4,7.5,29.4,19.3 c2.1,5,4.1,12,5.4,18.5c1.8,8.4-5.3,16.1-13.8,15.3c-12.5-1.3-26.6-4.8-34.6-8.3C365.3,338.1,332.4,319.8,318,310.6z M448.7,169.2 l1.2,1.9c2.4,4,5.9,10.5,7.9,16.9c3.1,10.4-1.4,24.4-1.4,24.5l-0.5,1.5l1.1,1.1c0,0.1,5,5.2,10.3,11.1l0.1,0.2 c0.6,0.7,1.2,1.3,1.8,2c3.7,4.3,1.9,17-0.1,23.9l-0.2,0.6l0.1,0.6c0,0,0.3,1.5,0.6,3.9c-2.7,0.3-4.7,2.7-4.4,5.5l0.8,7.5l-8.6,0.1 l-13.5-15.3c-1-1.2-1-3,0.2-4c0,0,0,0,0,0c7.1-6.4,8.1-9.5,8.3-10.7c0.9-5.4,1.2-7.4,1.2-8.1c0-6.1-2.9-9-8.7-14.8 c-1.9-1.9-4.2-4.2-6.9-7.1c-0.6-0.6-1.1-1.2-1.7-1.8c2.1,0.6,4.9,1.2,8.5,1.5c8.4,0.7,10.9-1.4,10.9-1.4s1.5-2.7-1.1-6.6 c-2.6-3.9-6.2-6.7-13.2-6.9c-5-0.2-9.5,3.7-11.7,6c-0.9-1-2.9-4.7-3.8-10.9c-1.5-9.7,2.1-14.2,4.7-16.4c4.6-3.9,10.9-7.7,14.4-7.5 c0.9,0.1,1.9,0.2,2.7,0.4C447.8,167.7,448.2,168.4,448.7,169.2z M463.4,332.9c-0.7,8.2-1.1,12.8-3.8,16.5c-2.3,3.1-7.3,0.8-6.6-3 c0.4-2.1,0.7-4.3,0.8-6.4c0.3-10.7-4.9-20.9-6.7-27.7c0,0,0-0.1,0-0.1c-0.9-3.8,1.2-7.7,4.8-9.3c1.6-0.7,3.4-1.6,5.3-2.6 c4.6-2.3,9.9,1.3,9.2,6.4l0,0.1C465.2,317.2,463.9,327.1,463.4,332.9z M385.1,249.4c1.8-1.3,4.4-0.8,5.6,1.2 c0.8,1.4,1.9,2.9,3.4,4.1c4.5,3.7,9.8,3.5,13.2,3.5c3.3,0,5.4-0.6,6-0.8c0,0,0,0,0,0c2.4-0.5,4.3,2,3.1,4.2 c-2.6,4.8-6.1,11.1-6.5,11.4c-0.7,0.5-22.8,5.1-25.6,5.4s-11.6,1.2-18.2-3c-2.8-1.7-5.5-3.7-7.7-5.3c-1.7-1.2-1.4-3.8,0.4-4.7 C368.8,260.4,378.7,253.9,385.1,249.4z M436.8,263.8l8.3,9.1c1.5,1.7,0.5,4.4-1.7,4.7c-5,0.6-10,1.2-14.9,1.7 c-2.3,0.2-3.9-2.3-2.7-4.3c1.9-3,4.3-7,6.5-10.8C433.2,262.6,435.5,262.4,436.8,263.8z M396.4,117.1l83.5-69.1l-76.9,76.9 c-2.5,2.4-6.6,1.6-8.1-1.5h0C393.9,121.2,394.5,118.5,396.4,117.1z'/%3E %3Cpath fill='%23141414' d='M196.6,258.1c-25.6,10.7-45.8,19.2-56.4,48.7c-15.1,42,9.4,88.5,62.5,120.1c-17.4-68,3.5-93.1,22.1-115.3 c6.4-7.7,12.5-15,16.9-23.7c12.9-25.8,12.3-50.5,11.1-62C233.7,242.5,214.1,250.8,196.6,258.1z'/%3E %3C/g%3E %3Cg%3E %3Cpath d='M201.6,477.1h-9.1l-2.8,17.1h-14.3l2.8-17.1h-9.1l-2.8,17.1h-9.3l-1.5,9.1h9.3l-2.3,14h-9.4l-1.5,9.1h9.4l-2.8,17.1h9.1 l2.8-17.1h14.3l-2.8,17.1h9.1l2.8-17.1h9.3l1.5-9.1h-9.3l2.3-14h9.4l1.5-9.1h-9.4L201.6,477.1z M186,517.4h-14.3l2.3-14h14.3 L186,517.4z'/%3E %3Cpolygon points='260.8,505.3 230,505.3 230,477.1 218,477.1 218,543.6 230,543.6 230,515.4 260.8,515.4 260.8,543.6 272.9,543.6 272.9,477.1 260.8,477.1 '/%3E %3Cpath d='M307.1,477.1l-23.4,66.4h12.8l5.5-16.4h25l5.5,16.4h12.8l-23.4-66.4H307.1z M305.3,517.5l9-26.8h0.5l9,26.8H305.3z'/%3E %3Cpath d='M394,480c-3.5-1.9-7.8-2.9-12.9-2.9h-24.9v66.4h12v-22.4H381c5.1,0,9.4-0.9,12.9-2.8s6.2-4.5,7.9-7.8 c1.8-3.3,2.7-7.1,2.7-11.3c0-4.2-0.9-8-2.7-11.3C400.1,484.5,397.4,481.9,394,480z M390.9,505.4c-0.9,1.8-2.3,3.2-4.2,4.3 c-1.9,1-4.3,1.6-7.3,1.6h-11.1v-24h11c3,0,5.5,0.5,7.4,1.5c1.9,1,3.3,2.4,4.2,4.2c0.9,1.8,1.4,3.9,1.4,6.2 S391.8,503.6,390.9,505.4z'/%3E %3Crect x='417.1' y='477.1' width='12' height='66.4'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'hapi.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'PARAS',
    symbol: 'PARAS',
    icon: 'data:image/png;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'paras.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Ref Finance Token',
    symbol: 'REF',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'ref.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Pulse',
    symbol: 'PULSE',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSIjMEYyQUMzIi8+CjxwYXRoIGQ9Ik0xMDMuNTc0IDg0LjU3M0MxMDIuMDUyIDg2LjU4MDggMTAwLjg1MyA4OS4xNDAyIDk5LjY5NzIgOTEuNjU1OUM5OC41NDA5IDk0LjE3MTYgOTcuMzkyIDk2LjY1OTYgOTYuMjE0OSA5OC40MjU1Qzk1LjAzNzggMTAwLjE5MSA5My45Mjg0IDEwMS4wNTggOTIuNzMyNiAxMDEuMDU4QzkxLjI3MDMgMTAxLjA1OCA5MC40NDI1IDEwMC42NDMgODkuNzEwMiA5OS44NjcyQzg4Ljk3NzYgOTkuMDkxNiA4OC40MDY1IDk3LjkwNSA4Ny44NzAzIDk2LjY3MDRDODcuMzMzOSA5NS40MzU4IDg2Ljg0NzcgOTQuMTM1MSA4Ni4wMzA1IDkzLjAzNDlDODUuMjEzMyA5MS45MzQ3IDgzLjkxMDQgOTEuMDI5MSA4Mi4yMTk4IDkxLjAyOTFDODEuMjYzMyA5MS4wMjkxIDgwLjQyMzcgOTEuNDQ1MSA3OS43ODg2IDkyLjAzMkM3OS4xNTM0IDkyLjYxODkgNzguNjkwMSA5My4zOTAxIDc4LjI3NzQgOTQuMjI1OUM3Ny40NTIxIDk1Ljg5NjggNzYuODM1NCA5Ny45NjgyIDc2LjA0MzUgOTkuOTkyN0M3NS4yNTE2IDEwMi4wMTcgNzQuMjc3MSAxMDMuOTk1IDcyLjk1NTUgMTA1LjM4M0M3MS42MzM2IDEwNi43NzIgNjkuOTk5MiAxMDcuNjQgNjcuNTAxOCAxMDcuNjRIMzguMDY2MkMzNy42ODcxIDEwNy42MzUgMzcuMzM0NSAxMDcuODI1IDM3LjE0MzMgMTA4LjEzN0MzNi45NTIyIDEwOC40NDkgMzYuOTUyMiAxMDguODM2IDM3LjE0MzMgMTA5LjE0OEMzNy4zMzQ1IDEwOS40NjEgMzcuNjg3MSAxMDkuNjUxIDM4LjA2NjIgMTA5LjY0Nkg2Ny41MDE4QzcwLjU0NzkgMTA5LjY0NiA3Mi44OTg1IDEwOC40MTYgNzQuNTMyMyAxMDYuN0M3Ni4xNjYyIDEwNC45ODQgNzcuMTg3NSAxMDIuNzk3IDc4LjAxNDYgMTAwLjY4MkM3OC44NDE3IDk4LjU2NzUgNzkuNDc1IDk2LjQ3NDEgODAuMTgyOCA5NS4wNDA3QzgwLjUzNyA5NC4zMjQgODAuODg5MyA5My43OTE5IDgxLjIzNDEgOTMuNDczOEM4MS41Nzg5IDkzLjE1NTIgODEuODI2NiA5My4wMzQ5IDgyLjIxOTggOTMuMDM0OUM4My4yMjc5IDkzLjAzNDkgODMuNzQyNyA5My40NDUzIDg0LjMyMjIgOTQuMjI1OUM4NC45MDE4IDk1LjAwNiA4NS40MTIgOTYuMjEyNyA4NS45NjQ5IDk3LjQ4NTRDODYuNTE3NyA5OC43NTc3IDg3LjA4OTYgMTAwLjA3OCA4OC4xMzMxIDEwMS4xODRDODkuMTc2NiAxMDIuMjg5IDkwLjczNzUgMTAzLjA2NCA5Mi43MzI2IDEwMy4wNjRDOTQuOTkzOCAxMDMuMDY0IDk2LjY1OTEgMTAxLjQ4NiA5Ny45ODg4IDk5LjQ5MTJDOTkuMzE4NSA5Ny40OTYyIDEwMC40NTQgOTQuOTY5NSAxMDEuNjAzIDkyLjQ3MDlDMTAyLjc1MSA4OS45NzE4IDEwMy45NTMgODcuNTE2OSAxMDUuMjgyIDg1Ljc2MzhDMTA2LjYxMSA4NC4wMTA3IDEwNy45MjUgODMuMDA1OCAxMDkuNTUzIDgzLjAwNThDMTEwLjI5NSA4My4wMDU4IDExMC45NDYgODMuMjcyOCAxMTEuNjU2IDgzLjg4MzRDMTEyLjM2NSA4NC40OTM5IDExMy4wNjggODUuNDUxNyAxMTMuNzU4IDg2LjY0MTRDMTE1LjEzOCA4OS4wMjA3IDExNi40NDcgOTIuMzI4OCAxMTcuODMyIDk1LjY2NzVDMTE5LjIxNiA5OS4wMDYyIDEyMC43MTcgMTAyLjM3NiAxMjIuNjk0IDEwNS4wMDdDMTI0LjY3MSAxMDcuNjM4IDEyNy4yMzQgMTA5LjU4MyAxMzAuNTc4IDEwOS41ODNIMTYwLjkzNEMxNjEuMzEzIDEwOS41ODggMTYxLjY2NiAxMDkuMzk4IDE2MS44NTcgMTA5LjA4NkMxNjIuMDQ4IDEwOC43NzMgMTYyLjA0OCAxMDguMzg3IDE2MS44NTcgMTA4LjA3NEMxNjEuNjY2IDEwNy43NjIgMTYxLjMxMyAxMDcuNTcyIDE2MC45MzQgMTA3LjU3N0gxMzAuNTc4QzEyOC4wNjcgMTA3LjU3NyAxMjYuMTcgMTA2LjIzMiAxMjQuNDAyIDEwMy44NzlDMTIyLjYzNCAxMDEuNTI2IDEyMS4xMDggOTguMjgzNyAxMTkuNzM3IDk0Ljk3ODFDMTE4LjM2NiA5MS42NzIxIDExNy4xMDggODguMzA1MiAxMTUuNTk4IDg1LjcwMTJDMTE0Ljg0MyA4NC4zOTkxIDExNC4wOCA4My4yODQ2IDExMy4xMDEgODIuNDQxOEMxMTIuMTIyIDgxLjU5ODcgMTEwLjg4MyA4MSAxMDkuNTUzIDgxQzEwNy4wMzYgODEgMTA1LjA5NiA4Mi41NjUzIDEwMy41NzQgODQuNTczWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI1Ii8+Cjwvc3ZnPgo=',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'pulse.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Ether',
    symbol: 'ETH',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAs3SURBVHhe7Z1XqBQ9FMdFsYu999577wUfbCiiPoggFkQsCKJP9t57V7AgimLBjg8qKmLBXrD33hVUEAQ1H7+QXMb9Zndnd+/MJJf7h8Pu3c3Mzua3yTk5SeZmEZkySplADFMmEMOUCcQwZQggHz58EHfu3FF/2a0MAWTjxo2iWbNm6i+7ZT2QW7duiUWLFolixYqJQ4cOqVftlfVAZs6cKdauXSuqV68uKlWqpF61V1YDoUXMmTNHrFu3TtSoUUNCmTBhgnrXTlkL5Nu3b2Ly5MmyuwJIzZo1RaNGjUTx4sXFu3fvVCn7ZC2QVatWiQULFvwPSL169USnTp1UKftkJZCbN2+KGTNmSBiLFy/+BwhWoUIFsX//flXaLlkJZPr06WkwIoE0btxYNGzYUFSsWFGVtkvWATlw4IB05BqGGxAMBz9u3Dh1lD2yCsjXr1/THHk8IDwvVaqUeP36tTraDlkFZOXKldKRO2HEAoKD79ixozraDlkD5Pr16/848nhANBQc/N69e9VZzJc1QCIduRcgGA4eKLbICiD79u37nyN3WiwgvMZ7Y8eOVWczW8YDwZFPmTIlauvA4gHhsUSJEuLFixfqrObKeCArVqxwdeROiwUE43UcfNu2bdVZzZXRQK5duyYduRsEp8UDog1fsnPnTnV2M2U0kFiO3GlegeDgy5cvr85upowFQqg6d+5cVwCR5hUI71NuzJgx6lPMk5FAPn365Doij2ZegWCUIUX/9OlT9WlmyUggy5Yti+vInZYIEAwH37JlS/VpZsk4IJcvX5bTsl5bB5YoEMqRDd62bZv6VHNkHJBp06YlBANLFAiGgy9btqz6VHNkFJBdu3Z5duROSwYIxjEjRoxQn26GjAHy8ePHuCPyaJYsEMozgn/48KG6ivBlDJAlS5Yk5MidlgqQ+vXri+bNm6urCF9GALl48aJ05G6V7cWSBYJxDOu5Nm/erK4mXBkBJBlH7rRUgGAmOfjQgZBbSsaROy1VIBjHDxs2TF1VeAoVyPv37+WI3K2SE7H0AMKxJUuWFHfv3lVXF45CBZKKI3daegDBcPBNmzZVVxeOQgNy/vz5hEfkbsbxAGFtb6pAOL5y5cpye0NYCg1Iqo5c29KlS2WEVKdOHdGkSZOUoeDgS5cura4yeIUCZMeOHWLevHkpASEBScvAB/Xs2VMUKVJE1K1bV44pUgHDcbVq1RJDhgxRVxusAgfy5s0bMXXq1IRgOMsuX75c7gcZP368aN++vez3W7VqJfLnzy8KFCggU+tUKNncZMFwDA6eNcRBK3AgCxculOas8HiG82duffXq1WLkyJGiRYsWokGDBrI1UPHMlQOjaNGisqUUKlRIPrKclLKA0RUdWfnRDNCUD1qBAjl79qyYNWuWa6VHGq0CEGw7oHsaNGiQrCBMg9DmBKJNgylYsKAciQOFfYhUtlcwHEe3GKQCA/Lnzx/PyUMc9Zo1a+SAsV+/fvLXSgXxa3eCiAXECaZw4cISDPPpGijniweG93HwXHtQCgwIk0E4cjcAGhItAf8AuG7dukknzbgAENFgYLGAaNNgKMcibGYNdXdGxUeDgz8aOHCg+hb+KxAgr169kpUcCUKb01GzOJrKonuJB0KbFyBOAw4thgCgdu3aaWAA4AYGB8/a4iAUCBBG405Hrv2Dm6MGhFulx7JEgWjTYHisVq2a/GxapBMGgLguLAj5DuTMmTP/OHLtqPETdAW6u4h01IlYskC06e6MIICROlA0GH19vM51+y1fgfz+/TvNkWtHjR/p27ev7JboJrx2S7EsVSAYUDCgcC4CAEbtXJsGg4PnO/kpX4Fs3bpVwiB0BEz37t09O+pELD2AOE23GM5ZpkwZGeVxraRnBgwYoL6dP/INCCNyfAeOukOHDmmZVLcKTdXSG4jTNBidAaDlXLlyRX3L9JdvQPr06SObvHbU6dUa3MxPINp0d5Y3b16RJ08e9S3TX74Befz4sejcubOoWrWqdNi2AgEEj8DIkiWLdO4PHjxQ3zL95asPQQcPHpSTR/gOv6D4BUQ7+uzZs4usWbOK7du3q2/ln3wHosU+j3LlysmIxa1SUzG/gOTLl0+2ilGjRqlv4b8CA4K+fPkievXqJZt9MgPAaJbeQHT3hA9kJX6QChSI1smTJ+U4RKct3Co5EUsvIHRP2bJlEzlz5hRHjhxRVxusfANy4cIF9Sy6GLnrAZhbRXu1VIEAguiJVuHlfltbtmxRz9JfvgHhxpQMBt++fatecdfPnz/lYIvtAcmOU1IBQi4LEG3atJHXEkssEWK0fvv2bfVK+svXLosJKW4AQ3QSb07h6tWr0uEz+Eq0G0sGCAM+IieOI98WS3///hVDhw4VOXLkkAlRP+W7D9mwYYNMLtJa4n1xRBqe3bIMKL2CSQQI3VPu3Lllq+C64olsNPMnBCJdunRRr/qnQJw6IS/pdypg/vz5cff38YscPny49C9eujGvQCgDiB49eqhPii4WgJPuAQQ+Lqi1v4EAefToUVrWFzCsyWIx2q9fv1QJd92/f1+0bt1aLlaINdqPB4TuCRD80rmtbCzhR8hG66SizvKeOHFClfBXgQBBe/bskfcr0dO1pOFZU3Xs2DFVIrqY/q1SpUpa1tUrELqnXLlySRhe5jKYw2d2kHBcz4OwIjLIXVaBAUF0V5Ezh7Nnz5Z27949VSq6CBDoOphHiQYECDyyTgsQ/fv3V0dH1/Hjx2V6h7wbEAguMH4ABBlBKlAgbneE090Yd21Yv369+P79uyrtrpcvX/6TtIwEorsnlvA8efJEHeUuRuFdu3aVKR2CCCcMnpNyf/78uSodjAIFgk6fPh11txQtCGBebhlO0pLuhKSlBkISEBhMjMXTxIkTZYVzvBOEhgFQriloBQ4EEUrGWhKEryEyu3HjhjoiuggWqDxAeOnrufcW5QkUIkFoGEBiUi0MhQKEeel4q995DyjcZ/Hz58/qSHfRrcTbSUuZdu3ayTEOYawbDIz3iLDiRYB+KRQgiP/3waJrNxjagMI0MK2AKC1ZjR49Wm5/JqEZDQTGe8A4fPiwOjJ4hQYEsS3By/5CwFCOVsWAzatIAhKVed3MQznWEIepUIEg/IUzFI5lgCEgYG1XrKQlyT9CY3wFXZBb5UcaURZ+JWyFDoSs8KRJk2L6E6dRDoB0YyQtneukSGAOHjxYDu70KNut8iONckRcJvzbpNCBIAZmXrcpYBoekRpgyBQzhiE1wkDOKwiMsuSr6BJNkBFAENEU45DIyo9nwGGxNs44ERAY5QlxmQsxRcYAIcxMdKubtmS3RVOe7u3Hjx/qKsKXMUAQA0EiKbdKj2XJAiEC2717t/p0M2QUEETaw0so7LREgVCO8l4Sj0HLOCAIB+81FMYSAUIZQmGSkybKSCAs1I7MCseyRIEwaveSJwtDRgJBR48e9RwKewXC+0x0AdtUGQsEMSL3cnMaL0B4j1wWc/Qmy2ggzG/ruXg3ENq8AmHgyCSZyTIaCLp06VLce8DHA8LrrGDxMnEVtowHgjZt2hR1QguLB4R0Su/evdXZzJYVQJBe25UoELK4Nv1PQ2uAPHv2LKo/iQaEv0mNeFn4bYqsAYL4p5IsGfIChOfMb7Dp1CZZBQTRQiJDYTcgerrWNlkHhHVbkV1XJBAemXDirqe2yTog6Ny5c9LJayhOIBgrS1h1b6OsBIKocB0KO4FwtwVu7WSrrAWC9NouDYQsLstCbZbVQNjmwCwjQFjCwzTuqVOn1Lt2ymogiBk/PafOfbdsl/VAEEBs+gfEsZQhgDChxVKgjKAMASQjKROIYcoEYpgygRglIf4D6lp/+XognSwAAAAASUVORK5CYII=',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'eth.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Aurora',
    symbol: 'AURORA',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 288 288' style='enable-background:new 0 0 288 288;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .st0%7Bfill:%2370D44B;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E %3Cpath class='st0' d='M144,0L144,0c79.5,0,144,64.5,144,144v0c0,79.5-64.5,144-144,144h0C64.5,288,0,223.5,0,144v0 C0,64.5,64.5,0,144,0z'/%3E %3Cpath class='st1' d='M144,58.8c7.6,0,14.5,4.3,17.9,11.1l56.2,112.5c4.9,9.9,0.9,21.9-9,26.8c-2.8,1.4-5.8,2.1-8.9,2.1H87.8 c-11,0-20-9-20-20c0-3.1,0.7-6.2,2.1-8.9l56.2-112.5C129.5,63,136.4,58.7,144,58.8 M144,45c-12.8,0-24.5,7.2-30.2,18.7L57.6,176.2 c-8.3,16.7-1.6,36.9,15.1,45.3c4.7,2.3,9.9,3.6,15.1,3.6h112.5c18.6,0,33.8-15.1,33.8-33.7c0-5.2-1.2-10.4-3.6-15.1L174.2,63.7 C168.5,52.2,156.8,45,144,45z'/%3E %3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'aurora.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Skyward Finance Token',
    symbol: 'SKYWARD',
    icon: 'data:image/png;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'skyward.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Staked NEAR',
    symbol: 'STNEAR',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 67.79 67.79' version='1.1'%3E%3Cpath style='fill:%23fff' d='M33.934.311a33.9 33.9 0 1 0 33.89 33.9 33.9 33.9 0 0 0-33.89-33.9z' id='path505'%3E%3C/path%3E%3Cpath style='fill:%23ffbd00;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1' d='m11.803 27.8 12.387.359 2.361 5.959 7.616 3.31 8.523-3.322 2.348-5.87 12.269.03L54.822 54.2 31.837 58.86 12.89 52.648z' id='path1051'%3E%3C/path%3E%3Cpath style='fill:%23a0a0ff;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1' d='m34.657 12.575-10.43 9.633 1.096 10.01 8.844 5.21 9.785-5.287 1.086-11.33z' id='path1815'%3E%3C/path%3E%3Cpath id='path928' style='fill:%23666;fill-opacity:1' d='M33.928 4.282a29.93 29.93 0 0 1 4.682.367 29.93 29.93 0 0 1 25.244 29.572 29.93 29.93 0 0 1-29.92 29.92 29.93 29.93 0 0 1-.006-59.86zm.729 8.293c-2.03 5.668-8.815 9.76-8.815 14.521 0 4.76 3.912 8.62 8.737 8.62 4.824 0 8.736-3.86 8.736-8.62s-6.707-8.697-8.658-14.521zM37.84 22.67a2.524 2.446 0 0 1 .246.012 2.524 2.446 0 0 1 .246.035 2.524 2.446 0 0 1 .24.059 2.524 2.446 0 0 1 .233.08 2.524 2.446 0 0 1 .225.104 2.524 2.446 0 0 1 .213.123 2.524 2.446 0 0 1 .197.142 2.524 2.446 0 0 1 .183.162 2.524 2.446 0 0 1 .168.178 2.524 2.446 0 0 1 .147.191 2.524 2.446 0 0 1 .127.207 2.524 2.446 0 0 1 .105.217 2.524 2.446 0 0 1 .084.227 2.524 2.446 0 0 1 .06.232 2.524 2.446 0 0 1 .038.237 2.524 2.446 0 0 1 .012.24 2.524 2.446 0 0 1-.086.633 2.524 2.446 0 0 1-.252.59 2.524 2.446 0 0 1-.403.507 2.524 2.446 0 0 1-.521.389 2.524 2.446 0 0 1-.61.244 2.524 2.446 0 0 1-.652.084 2.524 2.446 0 0 1-.654-.084 2.524 2.446 0 0 1-.607-.244 2.524 2.446 0 0 1-.524-.389 2.524 2.446 0 0 1-.4-.508 2.524 2.446 0 0 1-.252-.59 2.524 2.446 0 0 1-.086-.632 2.524 2.446 0 0 1 .086-.633 2.524 2.446 0 0 1 .252-.59 2.524 2.446 0 0 1 .4-.506A2.524 2.446 0 0 1 36.58 23a2.524 2.446 0 0 1 .607-.247 2.524 2.446 0 0 1 .654-.082zM24.19 28.16a16.579 2.485 0 0 0-6.502 1.965 16.579 2.485 0 0 0 7.635 2.093 10.483 10.6 0 0 1-1.133-4.058zm20.848.078a10.483 10.6 0 0 1-1.086 3.904 16.579 2.485 0 0 0 6.894-2.017 16.579 2.485 0 0 0-5.808-1.887zm6.925 3.21c-.455 1.177-4.097 2.154-9.273 2.659a10.483 10.6 0 0 1-8.072 3.861 10.483 10.6 0 0 1-8.067-3.85c-5.276-.506-8.978-1.498-9.398-2.64h-.049v5.17h.049a.69.69 0 0 0-.049.24c0 1.8 7.81 3.25 17.43 3.25 9.62 0 17.43-1.45 17.43-3.25a.69.69 0 0 0 0-.24zm.032 7.323c-.67 1.73-8.22 3.03-17.43 3.03-9.23 0-16.771-1.34-17.381-3h-.049v5.17h.049a.69.69 0 0 0-.049.24c0 1.8 7.81 3.25 17.43 3.25 9.62 0 17.43-1.45 17.43-3.25a.69.69 0 0 0 0-.24zm0 7.21c-.67 1.69-8.22 3.03-17.43 3.03-9.23 0-16.771-1.34-17.381-3h-.049v5.17h.049a.69.69 0 0 0-.049.24c0 1.8 7.81 3.25 17.43 3.25 9.62 0 17.43-1.45 17.43-3.25a.69.69 0 0 0 0-.24z'%3E%3C/path%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'stnear.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Octopus Network Token',
    symbol: 'OCT',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='O' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 113.39 113.39' style='enable-background:new 0 0 113.39 113.39;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23014299;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E%3Ccircle class='st0' cx='56.69' cy='56.69' r='56.69'/%3E%3Cg%3E%3Cpath class='st1' d='M44.25,59.41c-1.43,0-2.59,1.16-2.59,2.59v20.28c0,1.43,1.16,2.59,2.59,2.59c1.43,0,2.59-1.16,2.59-2.59V62 C46.84,60.57,45.68,59.41,44.25,59.41z'/%3E%3Cpath class='st1' d='M56.69,59.41c-1.45,0-2.62,1.17-2.62,2.62v26.47c0,1.45,1.17,2.62,2.62,2.62s2.62-1.17,2.62-2.62V62.02 C59.31,60.58,58.14,59.41,56.69,59.41z'/%3E%3Cpath class='st1' d='M79.26,78.87c-0.33,0.15-0.64,0.28-0.95,0.38c0,0-0.01,0-0.01,0c-0.59,0.19-1.13,0.29-1.63,0.31h-0.06 c-1,0.03-1.84-0.27-2.59-0.75c-0.49-0.32-0.91-0.73-1.25-1.23c-0.3-0.43-0.53-0.93-0.71-1.51c0-0.01-0.01-0.02-0.01-0.03 c-0.22-0.74-0.34-1.61-0.34-2.59V62.02c0-1.45-1.17-2.62-2.62-2.62c-1.45,0-2.62,1.17-2.62,2.62v11.43c0,4.5,1.64,8.03,4.63,9.96 c1.5,0.97,3.21,1.45,5.04,1.45c1.68,0,3.45-0.41,5.25-1.22c1.32-0.59,1.9-2.14,1.31-3.46C82.13,78.86,80.57,78.27,79.26,78.87z'/%3E%3Cpath class='st1' d='M68.33,45.9c0-2.15-1.75-3.9-3.9-3.9c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9 C66.58,49.8,68.33,48.05,68.33,45.9z'/%3E%3Cpath class='st1' d='M48.96,41.99c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9s3.9-1.75,3.9-3.9S51.11,41.99,48.96,41.99z'/%3E%3Cpath class='st1' d='M56.69,22.28c-15.17,0-27.52,12.34-27.52,27.52v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 c0-12.26,9.98-22.24,22.24-22.24c12.26,0,22.24,9.98,22.24,22.24v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 C84.21,34.62,71.87,22.28,56.69,22.28z'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'oct.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Debio',
    symbol: 'DBIO',
    icon: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIxOTAgOTcgNDIwIDQyMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODAwIDgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+LnN0MHtmaWxsOiMzNjM2MzZ9LnN0M3tmaWxsOiNmZjU2ZTB9PC9zdHlsZT48L2RlZnM+PGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iNDAwIiBjeT0iMzA3LjM5IiByPSIyMDguNTgiLz48cGF0aCBkPSJNNDczLjk5IDIxMS4zczIuMzQgNTYuMjUtNzcuMzQgOTguNDMtNzAuMzEgOTMuNzQtNzAuMzEgOTMuNzQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNlNmU2ZTY7c3Ryb2tlLXdpZHRoOjM3LjQ5NzU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiLz48cGF0aCBkPSJNMzI2LjAxIDIxMS4zcy0yLjM0IDU2LjI1IDc3LjM0IDk4LjQzIDcwLjMxIDkzLjc0IDcwLjMxIDkzLjc0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS13aWR0aDozNy40OTc1O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwIi8+PGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNDAwIiBjeT0iMjE2LjQyIiByPSIyMC40OSIvPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjQwMCIgY3k9IjM5OC4zNiIgcj0iMjAuNDkiLz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzYuMzQyIDY1OC4wNzUpIiBjbGFzcz0ic3QzIiBzdHlsZT0id2hpdGUtc3BhY2U6cHJlO2ZvbnQtc2l6ZToxMTIuNDkyNXB4O2ZvbnQtZmFtaWx5OidBcnRlZ3JhU2Fucy1TZW1pQm9sZCciPkRlQmlvPC90ZXh0Pjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'dbio.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Game GEM!!',
    symbol: 'gGEM',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 4,
    id: 'gem.thegame.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Game Gold!!',
    symbol: 'gGOLD',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 2,
    id: 'gold.thegame.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Game Elixir!!',
    symbol: 'gELXR',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 2,
    id: 'elixir.thegame.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'USN',
    symbol: 'USN',
    icon: "data:image/svg+xml;charset=UTF-8,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='38' height='38' rx='19' fill='black'/%3E%3Cpath d='M14.8388 10.6601C14.4203 10.1008 13.6748 9.86519 12.9933 10.0768C12.3119 10.2885 11.85 10.8991 11.85 11.5883V14.7648H8V17.9412H11.85V20.0589H8V23.2353H11.85V28H15.15V16.5108L23.1612 27.2165C23.5797 27.7758 24.3252 28.0114 25.0067 27.7997C25.6881 27.5881 26.15 26.9775 26.15 26.2882V23.2353H30V20.0589H26.15V17.9412H30V14.7648H26.15V10.0001H22.85V21.3658L14.8388 10.6601Z' fill='white'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'usdn.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Learn NEAR Club',
    symbol: 'LNC',
    icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAwICAgICAwICAgMDAwMEBgQEBAQECAYGBQYJCAoKCQgJCQoMDwwKCw4LCQkNEQ0ODxAQERAKDBITEhATDxAQEP/bAEMBAwMDBAMECAQECBALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/AABEIACAAIAMBIgACEQEDEQH/xAAZAAADAAMAAAAAAAAAAAAAAAAABgcDBAj/xAAjEAACAgICAgMAAwAAAAAAAAABAgMEBQYAEQcSEyExFCJB/8QAGAEAAgMAAAAAAAAAAAAAAAAAAQMABwj/xAAlEQACAQMDBAIDAAAAAAAAAAABEQMAAgQxQWESIZHwUXGBwfH/2gAMAwEAAhEDEQA/AOqOHNHN5vF67jnyuZtCtVSSKJpCjN00kixoOlBP27qPz/fv64qZDzBq+L8h2/Gt2rk0yVXFJlROK3tVlVhMwhEoPSzeteZgr+vsqMVJ9W6zZHBLKCbLSV38J+GKva+aONC8p/v+U88ORWv5t3fyTFTbwTpWPvxpjMfl8lc2O49SvCLldbENGMwLJ72vidWf7CxB4ifcSDqmaPseS2rXIMtmdYva9kRJLWuY632TDPE5jf436HyxFlJjlAAdCrADvrjZ8OXHt6pEOGGPhjUP3alxZUc9ys78oo/R0rD5E1O3u+oXdboZaPGWrD15oLctU2EikhnjlUtGHQuCYwCPZf394jZDwNc2pdht75uMF3LZ2ji4I72LxQpGhZoT25YLMKySzdN1aVSpJBCOD2shVa7w5IcyaC3ojKDegex1T2HbTtRkxYpruq8MpannbTc1EcB4D3jx3UxaeLPK1fFSpgcfhsxBkcH/AC6V+epWirR5CKFZ42gn+OPpv7uHCQq31GDymeP9XymnarTwed27JbPk0LzXcrfIElmeRy8jKgJEUfsxCRKSqIFUdgd8YuHDPmzZIUpB5QB4ZAZ9+BQhxIoC4wR+SvDXvNf/2Q==',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'lnc.factory.tokenhub.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle fill='%23201A2D' cx='16' cy='16' r='16'/%3E%3Cg fill='%23FFF'%3E%3Cpath d='M22.818 9.586l-.6.6a8.494 8.494 0 010 11.464l.6.6a9.352 9.352 0 000-12.678v.014zM10.2 9.638a8.494 8.494 0 0111.464 0l.6-.6a9.352 9.352 0 00-12.678 0l.614.6zm-.562 12.018a8.494 8.494 0 010-11.458l-.6-.6a9.352 9.352 0 000 12.678l.6-.62zm12.018.554a8.494 8.494 0 01-11.464 0l-.6.6a9.352 9.352 0 0012.678 0l-.614-.6zm-1.942-8.286c-.12-1.252-1.2-1.672-2.566-1.8V10.4h-1.056v1.692h-.844V10.4H14.2v1.736h-2.142v1.13s.78-.014.768 0a.546.546 0 01.6.464v4.752a.37.37 0 01-.128.258.366.366 0 01-.272.092c.014.012-.768 0-.768 0l-.2 1.262h2.122v1.764h1.056V20.12h.844v1.73h1.058v-1.744c1.784-.108 3.028-.548 3.184-2.218.126-1.344-.506-1.944-1.516-2.186.614-.302.994-.862.908-1.778zm-1.48 3.756c0 1.312-2.248 1.162-2.964 1.162v-2.328c.716.002 2.964-.204 2.964 1.166zm-.49-3.28c0 1.2-1.876 1.054-2.472 1.054v-2.116c.596 0 2.472-.188 2.472 1.062z'/%3E%3Cpath d='M15.924 26.852C9.89 26.851 5 21.959 5 15.925 5 9.892 9.892 5 15.925 5c6.034 0 10.926 4.89 10.927 10.924a10.926 10.926 0 01-10.928 10.928zm0-21c-5.559.004-10.062 4.513-10.06 10.072.002 5.559 4.51 10.064 10.068 10.064 5.559 0 10.066-4.505 10.068-10.064A10.068 10.068 0 0015.924 5.852z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 8,
    id: 'wbtc.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Huobi BTC',
    symbol: 'HBTC',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'hbtc.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Celo Dollar',
    symbol: 'cUSD',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEwMCA1MGMwLTI3LjYxNDItMjIuMzg1OC01MC01MC01MHMtNTAgMjIuMzg1OC01MCA1MCAyMi4zODU4IDUwIDUwIDUwIDUwLTIyLjM4NTggNTAtNTB6IiBmaWxsPSIjNDVjZDg1Ii8+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTY5Ljg4MDUgNjIuNjQzOGMtMS41NjcxIDMuMzkzMS0zLjkzNzUgNi4zNTMyLTYuOTA2MSA4LjYyNDEtMi45Njg1IDIuMjcwOC02LjQ0NTggMy43ODQxLTEwLjEzMDcgNC40MDg3LTMuNjg1LjYyNDYtNy40NjY3LjM0MTctMTEuMDE3Ny0uODI0MS0zLjU1MTEtMS4xNjU4LTYuNzY0Ni0zLjE3OTQtOS4zNjIzLTUuODY2Ni0yLjU5NzgtMi42ODcxLTQuNTAxNS01Ljk2NjktNS41NDY1LTkuNTU1NC0xLjA0NDktMy41ODg1LTEuMTk5Ni03LjM3NzUtLjQ1MDctMTEuMDM5My43NDg5LTMuNjYxNyAyLjM3ODktNy4wODU3IDQuNzQ4OS05Ljk3NTggMi4zNzAxLTIuODkgNS40MDg3LTUuMTU4OSA4Ljg1MjktNi42MTAzbDIuMjY2OCA1LjM3OTJjLTIuNTcgMS4wODMxLTQuODM3NSAyLjc3NjEtNi42MDYgNC45MzI3LTEuNzY4NSAyLjE1NjUtMi45ODQ4IDQuNzExNS0zLjU0MzYgNy40NDM5LS41NTg5IDIuNzMyNC0uNDQzNSA1LjU1OTguMzM2MyA4LjIzNzYuNzc5OCAyLjY3NzcgMi4yMDAzIDUuMTI1MSA0LjEzODggNy4xMzAyIDEuOTM4NCAyLjAwNTIgNC4zMzYzIDMuNTA3OCA2Ljk4NjEgNC4zNzc3czUuNDcxNyAxLjA4MSA4LjIyMTUuNjE0OWMyLjc0OTctLjQ2NjEgNS4zNDQ0LTEuNTk1MyA3LjU1OTUtMy4yODk4IDIuMjE1Mi0xLjY5NDUgMy45ODQtMy45MDMzIDUuMTUzNC02LjQzNTNsNS45MTg5LjMwNDJ6Ii8+PHBhdGggZD0ibTU2LjEwNjEgMjQuNXYtNGg0LjUwMDV2NGMyIDAgNS4xNjY3LjY2NjcgNi41IDF2NC41Yy0xOS0zLTE1LjUwMTEgMy44NDYyLTggNSA2LjcyMTcgMS4wMzM5IDExIDIgMTEuNSA5IC40IDUuNi01LjgzMzMgNy42NjY3LTkgOHYzLjVoLTV2LTMuNWMtMi40IDAtNi42NjY3LTEuNjY2Ny04LjUtMi41di01LjVjNC41IDIuNSAxNyA0LjUgMTcgMHMtMTYuNTAxMS0zLTE4LjAwMDUtMTFjLTEuMDAyMy01LjM0NzUgNS4zMzMzLTcuODMzMyA5LTguNXoiLz48L2c+PC9zdmc+',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'cusd.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'LiNEAR',
    symbol: 'LINEAR',
    icon: "data:image/svg+xml,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M30.74 28.78c.21-.36.32-.78.32-1.21v-6.33c0-.24-.06-.46-.17-.66-.12-.21-.28-.38-.48-.49l-16.86-9.77c-.35-.2-.73-.31-1.13-.32-.64 0-1.24.26-1.69.72-.45.45-.7 1.07-.71 1.71v6.39c0 .24.06.47.18.67.11.21.28.37.48.48l16.82 9.71c.36.22.77.32 1.19.32.41 0 .82-.12 1.19-.33.36-.21.66-.52.86-.89zm.32-16.27c0-.42-.1-.84-.29-1.21-.2-.38-.49-.7-.85-.93-.36-.22-.78-.34-1.21-.34-.42 0-.84.12-1.21.34l-4.97 2.81c-.04.02-.08.07-.1.12-.03.04-.04.1-.04.14 0 .06.01.11.04.16.02.04.06.08.1.1l8.05 4.62c.05.02.1.04.15.04.05 0 .1-.02.15-.05.04-.02.08-.06.11-.11.02-.04.04-.1.03-.15l.04-5.54zM10.05 27.5c-.01.43.08.86.28 1.23.2.38.49.7.85.93.36.22.78.34 1.2.34.42 0 .83-.12 1.2-.34l4.92-2.85c.04-.02.08-.06.1-.11.03-.04.05-.1.05-.15 0-.05-.02-.11-.05-.15-.02-.05-.06-.09-.1-.12l-8.05-4.6c-.05-.03-.09-.04-.15-.04-.05 0-.1.01-.15.04-.05.02-.08.07-.11.12-.02.04-.04.09-.04.14l.05 5.56z' fill='url(%23paint0_linear_186_370)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_186_370' x1='11.135' y1='11.152' x2='30.145' y2='30.457' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231BB3CC'/%3E%3Cstop offset='1' stop-color='%23824ACC'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'linear-protocol.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Staked NEAR',
    symbol: 'STNEAR',
    icon: "data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='96' height='96' rx='48' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M48.0006 20L41.2575 26.7431L48.0006 33.4862L54.7437 26.7431L48.0006 20ZM37.281 30.7188L30.7144 37.2853L47.9998 54.5707L65.2851 37.2853L58.7186 30.7188L47.9998 41.4376L37.281 30.7188ZM26.7384 41.261L19.9953 48.0041L47.9995 76.0083L76.0037 48.0041L69.2606 41.2611L47.9995 62.5221L26.7384 41.261Z' fill='%23231B51'/%3E%3C/svg%3E",
    reference: 'https://metapool.app',
    reference_hash: null,
    decimals: 24,
    id: 'meta-v2.pool.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'NearX',
    symbol: 'NearX',
    icon: "data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.1421 21.3848L21.3848 17.1421L19.3669 15.1243C18.5576 17.0303 17.0303 18.5576 15.1243 19.3669L17.1421 21.3848ZM9.43294 19.5793C7.45322 18.909 5.82115 17.4848 4.87848 15.6484L3.24264 17.2843L7.48528 21.5269L9.43294 19.5793ZM4.63306 8.8757C5.44239 6.96975 6.96975 5.44239 8.8757 4.63306L7.24264 3L3 7.24264L4.63306 8.8757ZM15.6484 4.87848L17.3848 3.14214L21.6274 7.38478L19.5793 9.43294C18.909 7.45322 17.4848 5.82115 15.6484 4.87848Z' fill='black'/%3E%3Cpath d='M8.00119 11.9921C8.00119 11.0268 8.00119 10.0615 8.00119 9.09612C8.00119 8.50505 8.16497 8.1743 8.56285 8.05781C8.97778 7.93628 9.40619 7.97917 9.79565 8.45228C11.3533 10.3447 12.9343 12.218 14.5092 14.0959C14.5692 14.1676 14.6117 14.3122 14.734 14.2626C14.8496 14.2157 14.7858 14.0805 14.786 13.9878C14.7904 12.6326 14.7898 11.2774 14.7868 9.92226C14.7868 9.83668 14.838 9.7162 14.7271 9.67372C14.6401 9.64029 14.5824 9.74185 14.522 9.79358C14.0492 10.1981 13.5804 10.6073 13.1088 11.0133C13.0208 11.089 12.9332 11.2118 12.8002 11.1012C12.6657 10.9894 12.7696 10.8872 12.8364 10.7881C13.3547 10.0186 13.8728 9.24898 14.3909 8.47919C14.6656 8.07085 15.0079 7.92282 15.4056 8.04141C15.786 8.15475 15.9986 8.48592 15.9992 8.97668C16.0007 10.0905 15.9996 11.2045 15.9996 12.3183C15.9996 13.2094 16.0003 14.1005 15.9994 14.9916C15.999 15.4826 15.8137 15.798 15.4512 15.9324C15.0256 16.0901 14.5767 15.9683 14.2734 15.6058C12.6823 13.705 11.0924 11.8029 9.50198 9.90144C9.46029 9.85161 9.42303 9.7961 9.37377 9.75489C9.28998 9.68487 9.21967 9.68108 9.21314 9.81797C9.20999 9.88273 9.21188 9.94791 9.21188 10.0129C9.21188 11.3496 9.21062 12.6862 9.2142 14.0227C9.21441 14.1186 9.15609 14.2557 9.26114 14.3038C9.38093 14.3587 9.45061 14.2178 9.52998 14.1503C9.98259 13.7651 10.4291 13.3728 10.8805 12.9859C10.9729 12.9066 11.0626 12.7651 11.208 12.8973C11.3402 13.0176 11.2213 13.1196 11.159 13.2127C10.6323 13.9989 10.1032 14.7837 9.57145 15.5663C9.32788 15.9248 8.9881 16.056 8.61085 15.9488C8.23739 15.8428 8.00498 15.5246 8.00287 15.0827C7.99761 14.0523 8.00119 13.022 8.00119 11.9917V11.9921Z' fill='white'/%3E%3C/svg%3E",
    reference: 'https://near.staderlabs.com',
    reference_hash: null,
    decimals: 24,
    id: 'v2-nearx.staderlabs.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'refLove Finance Token',
    symbol: 'refLove',
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyODggMzI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyODggMzI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwQzA4Qjt9Cjwvc3R5bGU+CjxnPgoJPHBhdGggZD0iTTE3My40LDE5MS40VjI2OEgyNTBMMTczLjQsMTkxLjR6IE0xMDcuMiwxMjUuMmwzMCwzMGwzMC4zLTMwLjNWNjkuMmgtNjAuNFYxMjUuMnogTTEwNy4yLDE1Mi4zVjI2OGg2MC40VjE1MmwtMzAuMywzMC4zCgkJTDEwNy4yLDE1Mi4zeiBNMTc3LjEsNjkuMmgtMy43VjExOUwyMTIsODAuNUMyMDEuOCw3My4yLDE4OS42LDY5LjIsMTc3LjEsNjkuMnogTTM4LDE3NS41VjI2OGg2My4zVjE0Ni40bC0xNy4xLTE3LjFMMzgsMTc1LjV6CgkJIE0zOCwxNDguNWw0Ni4yLTQ2LjJsMTcuMSwxNy4xVjY5LjJIMzhWMTQ4LjV6IE0yMzYuOCwxMjguOUwyMzYuOCwxMjguOWMwLTEyLjUtMy45LTI0LjctMTEuMi0zNC44bC01Mi4xLDUydjQyLjRoMy43CgkJQzIxMC4xLDE4OC41LDIzNi44LDE2MS44LDIzNi44LDEyOC45eiIvPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSIyMTAuMiw1NiAyNTAsOTUuOCAyNTAsNTYgCSIvPgo8L2c+Cjwvc3ZnPgo=',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'v010.refve.testnet'
  }, {
    decimals: 18,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAs3SURBVHhe7Z1XqBQ9FMdFsYu999577wUfbCiiPoggFkQsCKJP9t57V7AgimLBjg8qKmLBXrD33hVUEAQ1H7+QXMb9Zndnd+/MJJf7h8Pu3c3Mzua3yTk5SeZmEZkySplADFMmEMOUCcQwZQggHz58EHfu3FF/2a0MAWTjxo2iWbNm6i+7ZT2QW7duiUWLFolixYqJQ4cOqVftlfVAZs6cKdauXSuqV68uKlWqpF61V1YDoUXMmTNHrFu3TtSoUUNCmTBhgnrXTlkL5Nu3b2Ly5MmyuwJIzZo1RaNGjUTx4sXFu3fvVCn7ZC2QVatWiQULFvwPSL169USnTp1UKftkJZCbN2+KGTNmSBiLFy/+BwhWoUIFsX//flXaLlkJZPr06WkwIoE0btxYNGzYUFSsWFGVtkvWATlw4IB05BqGGxAMBz9u3Dh1lD2yCsjXr1/THHk8IDwvVaqUeP36tTraDlkFZOXKldKRO2HEAoKD79ixozraDlkD5Pr16/848nhANBQc/N69e9VZzJc1QCIduRcgGA4eKLbICiD79u37nyN3WiwgvMZ7Y8eOVWczW8YDwZFPmTIlauvA4gHhsUSJEuLFixfqrObKeCArVqxwdeROiwUE43UcfNu2bdVZzZXRQK5duyYduRsEp8UDog1fsnPnTnV2M2U0kFiO3GlegeDgy5cvr85upowFQqg6d+5cVwCR5hUI71NuzJgx6lPMk5FAPn365Doij2ZegWCUIUX/9OlT9WlmyUggy5Yti+vInZYIEAwH37JlS/VpZsk4IJcvX5bTsl5bB5YoEMqRDd62bZv6VHNkHJBp06YlBANLFAiGgy9btqz6VHNkFJBdu3Z5duROSwYIxjEjRoxQn26GjAHy8ePHuCPyaJYsEMozgn/48KG6ivBlDJAlS5Yk5MidlgqQ+vXri+bNm6urCF9GALl48aJ05G6V7cWSBYJxDOu5Nm/erK4mXBkBJBlH7rRUgGAmOfjQgZBbSsaROy1VIBjHDxs2TF1VeAoVyPv37+WI3K2SE7H0AMKxJUuWFHfv3lVXF45CBZKKI3daegDBcPBNmzZVVxeOQgNy/vz5hEfkbsbxAGFtb6pAOL5y5cpye0NYCg1Iqo5c29KlS2WEVKdOHdGkSZOUoeDgS5cura4yeIUCZMeOHWLevHkpASEBScvAB/Xs2VMUKVJE1K1bV44pUgHDcbVq1RJDhgxRVxusAgfy5s0bMXXq1IRgOMsuX75c7gcZP368aN++vez3W7VqJfLnzy8KFCggU+tUKNncZMFwDA6eNcRBK3AgCxculOas8HiG82duffXq1WLkyJGiRYsWokGDBrI1UPHMlQOjaNGisqUUKlRIPrKclLKA0RUdWfnRDNCUD1qBAjl79qyYNWuWa6VHGq0CEGw7oHsaNGiQrCBMg9DmBKJNgylYsKAciQOFfYhUtlcwHEe3GKQCA/Lnzx/PyUMc9Zo1a+SAsV+/fvLXSgXxa3eCiAXECaZw4cISDPPpGijniweG93HwXHtQCgwIk0E4cjcAGhItAf8AuG7dukknzbgAENFgYLGAaNNgKMcibGYNdXdGxUeDgz8aOHCg+hb+KxAgr169kpUcCUKb01GzOJrKonuJB0KbFyBOAw4thgCgdu3aaWAA4AYGB8/a4iAUCBBG405Hrv2Dm6MGhFulx7JEgWjTYHisVq2a/GxapBMGgLguLAj5DuTMmTP/OHLtqPETdAW6u4h01IlYskC06e6MIICROlA0GH19vM51+y1fgfz+/TvNkWtHjR/p27ev7JboJrx2S7EsVSAYUDCgcC4CAEbtXJsGg4PnO/kpX4Fs3bpVwiB0BEz37t09O+pELD2AOE23GM5ZpkwZGeVxraRnBgwYoL6dP/INCCNyfAeOukOHDmmZVLcKTdXSG4jTNBidAaDlXLlyRX3L9JdvQPr06SObvHbU6dUa3MxPINp0d5Y3b16RJ08e9S3TX74Befz4sejcubOoWrWqdNi2AgEEj8DIkiWLdO4PHjxQ3zL95asPQQcPHpSTR/gOv6D4BUQ7+uzZs4usWbOK7du3q2/ln3wHosU+j3LlysmIxa1SUzG/gOTLl0+2ilGjRqlv4b8CA4K+fPkievXqJZt9MgPAaJbeQHT3hA9kJX6QChSI1smTJ+U4RKct3Co5EUsvIHRP2bJlEzlz5hRHjhxRVxusfANy4cIF9Sy6GLnrAZhbRXu1VIEAguiJVuHlfltbtmxRz9JfvgHhxpQMBt++fatecdfPnz/lYIvtAcmOU1IBQi4LEG3atJHXEkssEWK0fvv2bfVK+svXLosJKW4AQ3QSb07h6tWr0uEz+Eq0G0sGCAM+IieOI98WS3///hVDhw4VOXLkkAlRP+W7D9mwYYNMLtJa4n1xRBqe3bIMKL2CSQQI3VPu3Lllq+C64olsNPMnBCJdunRRr/qnQJw6IS/pdypg/vz5cff38YscPny49C9eujGvQCgDiB49eqhPii4WgJPuAQQ+Lqi1v4EAefToUVrWFzCsyWIx2q9fv1QJd92/f1+0bt1aLlaINdqPB4TuCRD80rmtbCzhR8hG66SizvKeOHFClfBXgQBBe/bskfcr0dO1pOFZU3Xs2DFVIrqY/q1SpUpa1tUrELqnXLlySRhe5jKYw2d2kHBcz4OwIjLIXVaBAUF0V5Ezh7Nnz5Z27949VSq6CBDoOphHiQYECDyyTgsQ/fv3V0dH1/Hjx2V6h7wbEAguMH4ABBlBKlAgbneE090Yd21Yv369+P79uyrtrpcvX/6TtIwEorsnlvA8efJEHeUuRuFdu3aVKR2CCCcMnpNyf/78uSodjAIFgk6fPh11txQtCGBebhlO0pLuhKSlBkISEBhMjMXTxIkTZYVzvBOEhgFQriloBQ4EEUrGWhKEryEyu3HjhjoiuggWqDxAeOnrufcW5QkUIkFoGEBiUi0MhQKEeel4q995DyjcZ/Hz58/qSHfRrcTbSUuZdu3ayTEOYawbDIz3iLDiRYB+KRQgiP/3waJrNxjagMI0MK2AKC1ZjR49Wm5/JqEZDQTGe8A4fPiwOjJ4hQYEsS3By/5CwFCOVsWAzatIAhKVed3MQznWEIepUIEg/IUzFI5lgCEgYG1XrKQlyT9CY3wFXZBb5UcaURZ+JWyFDoSs8KRJk2L6E6dRDoB0YyQtneukSGAOHjxYDu70KNut8iONckRcJvzbpNCBIAZmXrcpYBoekRpgyBQzhiE1wkDOKwiMsuSr6BJNkBFAENEU45DIyo9nwGGxNs44ERAY5QlxmQsxRcYAIcxMdKubtmS3RVOe7u3Hjx/qKsKXMUAQA0EiKbdKj2XJAiEC2717t/p0M2QUEETaw0so7LREgVCO8l4Sj0HLOCAIB+81FMYSAUIZQmGSkybKSCAs1I7MCseyRIEwaveSJwtDRgJBR48e9RwKewXC+0x0AdtUGQsEMSL3cnMaL0B4j1wWc/Qmy2ggzG/ruXg3ENq8AmHgyCSZyTIaCLp06VLce8DHA8LrrGDxMnEVtowHgjZt2hR1QguLB4R0Su/evdXZzJYVQJBe25UoELK4Nv1PQ2uAPHv2LKo/iQaEv0mNeFn4bYqsAYL4p5IsGfIChOfMb7Dp1CZZBQTRQiJDYTcgerrWNlkHhHVbkV1XJBAemXDirqe2yTog6Ny5c9LJayhOIBgrS1h1b6OsBIKocB0KO4FwtwVu7WSrrAWC9NouDYQsLstCbZbVQNjmwCwjQFjCwzTuqVOn1Lt2ymogiBk/PafOfbdsl/VAEEBs+gfEsZQhgDChxVKgjKAMASQjKROIYcoEYpgygRglIf4D6lp/+XognSwAAAAASUVORK5CYII=',
    name: 'Ether',
    reference: null,
    reference_hash: null,
    spec: 'ft-1.0.0',
    symbol: 'ETH',
    id: 'aurora'
  }, {
    spec: 'ft-1.0.0',
    name: 'USDT',
    symbol: 'USDT',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'usdt.itachicara.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'USDC',
    symbol: 'USDC',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'usdc.itachicara.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Staked CORN',
    symbol: 'xCORN',
    icon: "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M150.43 32L99.7144 61.4389L150.43 90.8705L201.145 61.4389L150.43 32Z' fill='%235C65A5'/%3E%3Cpath d='M201.146 61.4388L150.431 90.8703L201.146 120.309L251.854 90.8703L201.146 61.4388Z' fill='%233B4274'/%3E%3Cpath d='M99.7152 61.4388L49 90.8703L99.7152 120.309L150.43 90.8703L99.7152 61.4388Z' fill='%233B4274'/%3E%3Cpath d='M150.43 90.8707L99.7144 120.31L150.43 149.749L201.145 120.31L150.43 90.8707Z' fill='%235C65A5'/%3E%3Cpath d='M99.7152 120.31L49 90.8707V149.749L99.7152 179.187V120.31Z' fill='%235C65A5'/%3E%3Cpath d='M150.43 149.748L99.7144 120.309V179.187L150.43 208.626V149.748Z' fill='%233B4274'/%3E%3Cpath d='M99.7152 179.187L49 149.748V208.626L99.7152 238.058V179.187Z' fill='%233B4274'/%3E%3Cpath d='M150.43 208.626L99.7144 179.187V238.057L150.43 267.496V208.626Z' fill='%235C65A5'/%3E%3Cpath d='M150.431 267.496L201.146 238.057L150.431 208.626V267.496Z' fill='%233B4274'/%3E%3Cpath d='M224.085 213.702L209.447 198.197L194.809 213.702H167.656L195.643 182.183L167.656 150.665H194.809L209.447 166.933L224.085 150.665H251.086L223.175 182.183L251.086 213.702H224.085Z' fill='%233B4274'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'xcorn.corndao.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Tether USD',
    symbol: 'USDt',
    icon: "data:image/svg+xml,%3Csvg width='111' height='90' viewBox='0 0 111 90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.4825 0.862305H88.0496C89.5663 0.862305 90.9675 1.64827 91.7239 2.92338L110.244 34.1419C111.204 35.7609 110.919 37.8043 109.549 39.1171L58.5729 87.9703C56.9216 89.5528 54.2652 89.5528 52.6139 87.9703L1.70699 39.1831C0.305262 37.8398 0.0427812 35.7367 1.07354 34.1077L20.8696 2.82322C21.6406 1.60483 23.0087 0.862305 24.4825 0.862305ZM79.8419 14.8003V23.5597H61.7343V29.6329C74.4518 30.2819 83.9934 32.9475 84.0642 36.1425L84.0638 42.803C83.993 45.998 74.4518 48.6635 61.7343 49.3125V64.2168H49.7105V49.3125C36.9929 48.6635 27.4513 45.998 27.3805 42.803L27.381 36.1425C27.4517 32.9475 36.9929 30.2819 49.7105 29.6329V23.5597H31.6028V14.8003H79.8419ZM55.7224 44.7367C69.2943 44.7367 80.6382 42.4827 83.4143 39.4727C81.0601 36.9202 72.5448 34.9114 61.7343 34.3597V40.7183C59.7966 40.8172 57.7852 40.8693 55.7224 40.8693C53.6595 40.8693 51.6481 40.8172 49.7105 40.7183V34.3597C38.8999 34.9114 30.3846 36.9202 28.0304 39.4727C30.8066 42.4827 42.1504 44.7367 55.7224 44.7367Z' fill='%23009393'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'usdtt.fakes.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Staked CORN',
    symbol: 'xCORN',
    icon: "data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M150.43 32L99.7144 61.4389L150.43 90.8705L201.145 61.4389L150.43 32Z' fill='%235C65A5'/%3E%3Cpath d='M201.146 61.4388L150.431 90.8703L201.146 120.309L251.854 90.8703L201.146 61.4388Z' fill='%233B4274'/%3E%3Cpath d='M99.7152 61.4388L49 90.8703L99.7152 120.309L150.43 90.8703L99.7152 61.4388Z' fill='%233B4274'/%3E%3Cpath d='M150.43 90.8707L99.7144 120.31L150.43 149.749L201.145 120.31L150.43 90.8707Z' fill='%235C65A5'/%3E%3Cpath d='M99.7152 120.31L49 90.8707V149.749L99.7152 179.187V120.31Z' fill='%235C65A5'/%3E%3Cpath d='M150.43 149.748L99.7144 120.309V179.187L150.43 208.626V149.748Z' fill='%233B4274'/%3E%3Cpath d='M99.7152 179.187L49 149.748V208.626L99.7152 238.058V179.187Z' fill='%233B4274'/%3E%3Cpath d='M150.43 208.626L99.7144 179.187V238.057L150.43 267.496V208.626Z' fill='%235C65A5'/%3E%3Cpath d='M150.431 267.496L201.146 238.057L150.431 208.626V267.496Z' fill='%233B4274'/%3E%3Cpath d='M224.085 213.702L209.447 198.197L194.809 213.702H167.656L195.643 182.183L167.656 150.665H194.809L209.447 166.933L224.085 150.665H251.086L223.175 182.183L251.086 213.702H224.085Z' fill='%233B4274'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'xcorn.v1.corndao.testnet'
  }, {
    spec: 'ft-1.0.0',
    name: 'Tiptoken',
    symbol: 'TT',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'tiptoken.testnet'
  }];
  var DefaultMainnetTokenList = [{
    spec: 'ft-1.0.0',
    name: 'Wrapped NEAR fungible token',
    symbol: 'wNEAR',
    icon: null,
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'wrap.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'USD Coin',
    symbol: 'USDC',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='16' cy='16' r='16' fill='%232775C9'/%3E%3Cpath d='M15.75 27.5C9.26 27.5 4 22.24 4 15.75S9.26 4 15.75 4 27.5 9.26 27.5 15.75A11.75 11.75 0 0115.75 27.5zm-.7-16.11a2.58 2.58 0 00-2.45 2.47c0 1.21.74 2 2.31 2.33l1.1.26c1.07.25 1.51.61 1.51 1.22s-.77 1.21-1.77 1.21a1.9 1.9 0 01-1.8-.91.68.68 0 00-.61-.39h-.59a.35.35 0 00-.28.41 2.73 2.73 0 002.61 2.08v.84a.705.705 0 001.41 0v-.85a2.62 2.62 0 002.59-2.58c0-1.27-.73-2-2.46-2.37l-1-.22c-1-.25-1.47-.58-1.47-1.14 0-.56.6-1.18 1.6-1.18a1.64 1.64 0 011.59.81.8.8 0 00.72.46h.47a.42.42 0 00.31-.5 2.65 2.65 0 00-2.38-2v-.69a.705.705 0 00-1.41 0v.74zm-8.11 4.36a8.79 8.79 0 006 8.33h.14a.45.45 0 00.45-.45v-.21a.94.94 0 00-.58-.87 7.36 7.36 0 010-13.65.93.93 0 00.58-.86v-.23a.42.42 0 00-.56-.4 8.79 8.79 0 00-6.03 8.34zm17.62 0a8.79 8.79 0 00-6-8.32h-.15a.47.47 0 00-.47.47v.15a1 1 0 00.61.9 7.36 7.36 0 010 13.64 1 1 0 00-.6.89v.17a.47.47 0 00.62.44 8.79 8.79 0 005.99-8.34z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 6,
    id: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Tether USD',
    symbol: 'USDT.e',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 6,
    id: 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Dai Stablecoin',
    symbol: 'DAI',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23F4B731' fill-rule='nonzero' cx='16' cy='16' r='16'/%3E%3Cpath d='M9.277 8h6.552c3.985 0 7.006 2.116 8.13 5.194H26v1.861h-1.611c.031.294.047.594.047.898v.046c0 .342-.02.68-.06 1.01H26v1.86h-2.08C22.767 21.905 19.77 24 15.83 24H9.277v-5.131H7v-1.86h2.277v-1.954H7v-1.86h2.277V8zm1.831 10.869v3.462h4.72c2.914 0 5.078-1.387 6.085-3.462H11.108zm11.366-1.86H11.108v-1.954h11.37c.041.307.063.622.063.944v.045c0 .329-.023.65-.067.964zM15.83 9.665c2.926 0 5.097 1.424 6.098 3.528h-10.82V9.666h4.72z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Wrapped Ether',
    symbol: 'WETH',
    icon: null,
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: '1INCH Token',
    symbol: '1INCH',
    icon: null,
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '111111111117dc0aa78b770fa6a738034120c302.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Graph Token',
    symbol: 'GRT',
    icon: null,
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'c944e90c64b2c07662a292be6244bdf05cda44a7.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Skyward Finance Token',
    symbol: 'SKYWARD',
    icon: 'data:image/png;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.skyward.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Banana',
    symbol: 'BANANA',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='256' height='256'%3E%3Cdefs%3E%3Ctext id='A' x='50' y='180' font-size='180'%3Eð%3C/text%3E%3C/defs%3E%3Cuse xlink:href='%23A'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'berryclub.ek.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Cucumber',
    symbol: 'CUCUMBER',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='256' height='256'%3E%3Cdefs%3E%3Ctext id='A' x='50' y='180' font-size='180'%3Eð¥%3C/text%3E%3C/defs%3E%3Cuse xlink:href='%23A'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'farm.berryclub.ek.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'HuobiToken',
    symbol: 'HT',
    icon: null,
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '6f259637dcd74c767781e37bc6133cd6a68aa161.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Gitcoin',
    symbol: 'GTC',
    icon: null,
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'de30da39c46104798bb5aa3fe8b9e0e1f348163f.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Uniswap',
    symbol: 'UNI',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23FF007A' fill-rule='nonzero' cx='16' cy='16' r='16'/%3E%3Cg fill='%23FFF'%3E%3Cpath d='M12.261 5.767c-.285-.044-.297-.05-.163-.07.257-.04.865.015 1.284.114.977.233 1.866.828 2.816 1.885l.252.28.36-.057c1.52-.245 3.067-.05 4.36.547.356.164.917.491.987.576.023.026.064.199.091.383.096.637.048 1.125-.146 1.49-.106.198-.112.26-.041.43a.416.416 0 00.372.236c.322 0 .668-.52.828-1.243l.064-.287.126.143c.692.784 1.235 1.853 1.328 2.613l.025.199-.117-.18c-.2-.31-.4-.522-.658-.693-.464-.307-.955-.411-2.255-.48-1.174-.062-1.839-.162-2.497-.377-1.121-.365-1.686-.852-3.018-2.599-.591-.776-.957-1.205-1.32-1.55-.827-.786-1.639-1.198-2.678-1.36z' fill-rule='nonzero'/%3E%3Cpath d='M22.422 7.5c.03-.52.1-.863.242-1.176.056-.124.109-.226.117-.226a.773.773 0 01-.055.204c-.103.304-.12.72-.049 1.203.09.614.142.702.79 1.365.305.311.659.703.787.872l.233.306-.233-.219c-.285-.267-.941-.79-1.086-.864-.097-.05-.112-.049-.172.01-.055.056-.067.138-.074.529-.012.608-.095 1-.296 1.39-.108.21-.125.166-.027-.073.073-.178.08-.256.08-.845 0-1.184-.141-1.468-.966-1.956a9.046 9.046 0 00-.764-.396 2.916 2.916 0 01-.374-.182c.023-.023.827.211 1.15.336.482.185.561.209.62.186.039-.015.058-.129.077-.464zm-9.607 2.025c-.579-.797-.937-2.02-.86-2.934l.024-.283.132.024c.248.045.675.204.875.326.548.333.786.772 1.027 1.898.071.33.164.703.207.83.068.203.328.678.54.987.152.222.05.327-.286.297-.514-.047-1.21-.527-1.659-1.145zm8.905 5.935c-2.707-1.09-3.66-2.036-3.66-3.632 0-.235.008-.427.017-.427.01 0 .115.077.233.172.549.44 1.164.628 2.865.876 1.001.147 1.565.265 2.085.437 1.652.548 2.674 1.66 2.918 3.174.07.44.029 1.265-.086 1.7-.09.344-.367.963-.44.987-.02.006-.04-.071-.046-.178-.028-.568-.315-1.122-.798-1.537-.549-.471-1.286-.847-3.089-1.572zm-1.9.452a4.808 4.808 0 00-.131-.572l-.07-.206.129.144c.177.2.318.454.436.794.091.259.101.336.1.757 0 .414-.011.5-.095.734a2.32 2.32 0 01-.571.908c-.495.504-1.13.782-2.048.898-.16.02-.624.054-1.033.075-1.03.054-1.707.164-2.316.378a.488.488 0 01-.174.042c-.024-.025.39-.272.733-.437.483-.233.963-.36 2.04-.539.532-.089 1.082-.196 1.221-.239 1.318-.404 1.995-1.446 1.778-2.737z' fill-rule='nonzero'/%3E%3Cpath d='M21.06 18.116c-.36-.773-.442-1.52-.245-2.216.021-.074.055-.135.075-.135a.73.73 0 01.189.102c.166.112.498.3 1.383.782 1.105.603 1.735 1.07 2.164 1.602.375.467.607.999.719 1.647.063.367.026 1.25-.068 1.62-.297 1.166-.988 2.082-1.972 2.616a2.53 2.53 0 01-.288.143c-.014 0 .038-.133.117-.297.33-.692.369-1.366.118-2.116-.153-.459-.466-1.02-1.097-1.966-.734-1.1-.914-1.394-1.095-1.782zm-10.167 4.171c1.005-.848 2.254-1.45 3.393-1.635.49-.08 1.308-.048 1.762.068.728.186 1.38.604 1.719 1.101.33.486.473.91.62 1.852.06.372.123.745.142.83.11.488.327.879.595 1.075.425.311 1.158.33 1.878.05a.981.981 0 01.236-.074c.026.026-.336.269-.592.397a2.014 2.014 0 01-.983.238c-.66 0-1.208-.335-1.665-1.02-.09-.135-.292-.538-.45-.897-.482-1.1-.72-1.436-1.28-1.803-.489-.32-1.118-.377-1.591-.145-.622.305-.795 1.1-.35 1.603.177.2.507.373.777.406a.83.83 0 00.939-.83c0-.332-.128-.52-.448-.665-.437-.197-.907.033-.905.444.001.175.077.285.253.365.113.05.115.055.023.036-.401-.084-.495-.567-.172-.888.387-.386 1.188-.216 1.463.31.116.221.129.662.028.928-.225.595-.883.907-1.55.737-.454-.116-.639-.241-1.186-.805-.951-.98-1.32-1.17-2.692-1.384l-.263-.041.3-.253z' fill-rule='nonzero'/%3E%3Cpath d='M6.196 3.35l.096.117c3.708 4.54 5.624 6.896 5.746 7.064.2.278.125.527-.219.723-.191.109-.585.219-.781.219-.223 0-.474-.107-.657-.28-.129-.123-.65-.901-1.853-2.768a188.53 188.53 0 00-1.712-2.633c-.049-.046-.048-.045 1.618 2.936 1.046 1.872 1.4 2.533 1.4 2.622 0 .18-.05.274-.272.522-.37.413-.535.877-.655 1.837-.134 1.077-.51 1.837-1.554 3.138-.61.762-.71.902-.865 1.209-.194.386-.247.603-.269 1.091-.023.516.022.85.18 1.343.138.432.282.718.65 1.288.318.493.501.859.501 1.002 0 .114.022.114.515.003 1.179-.266 2.136-.735 2.675-1.309.333-.355.411-.551.414-1.038.001-.318-.01-.385-.096-.568-.14-.298-.395-.546-.957-.93-.737-.504-1.051-.91-1.138-1.467-.072-.457.011-.78.419-1.634.421-.884.526-1.26.597-2.151.045-.576.108-.803.274-.985.172-.19.328-.255.755-.313.696-.095 1.139-.275 1.503-.61.316-.292.448-.573.468-.995l.016-.32-.177-.206c-.254-.296-2.355-2.614-6.304-6.956l-.106-.115-.212.165zM7.91 19.732a.566.566 0 00-.174-.746c-.228-.152-.583-.08-.583.118 0 .06.033.104.108.143.127.065.136.139.037.288-.101.152-.093.286.023.377.186.146.45.065.59-.18zm5.524-7.176c-.327.1-.644.447-.743.81-.06.221-.026.61.064.73.145.194.286.245.666.242.744-.005 1.39-.324 1.466-.723.062-.327-.223-.78-.614-.98-.202-.102-.631-.143-.839-.079zm.87.68c.115-.163.064-.34-.13-.458-.372-.227-.934-.04-.934.312 0 .174.293.365.561.365.18 0 .424-.107.503-.219z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '1f9840a85d5af5bf1d1762f925bdaddc4201f984.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Wrapped BTC',
    symbol: 'WBTC',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle fill='%23201A2D' cx='16' cy='16' r='16'/%3E%3Cg fill='%23FFF'%3E%3Cpath d='M22.818 9.586l-.6.6a8.494 8.494 0 010 11.464l.6.6a9.352 9.352 0 000-12.678v.014zM10.2 9.638a8.494 8.494 0 0111.464 0l.6-.6a9.352 9.352 0 00-12.678 0l.614.6zm-.562 12.018a8.494 8.494 0 010-11.458l-.6-.6a9.352 9.352 0 000 12.678l.6-.62zm12.018.554a8.494 8.494 0 01-11.464 0l-.6.6a9.352 9.352 0 0012.678 0l-.614-.6zm-1.942-8.286c-.12-1.252-1.2-1.672-2.566-1.8V10.4h-1.056v1.692h-.844V10.4H14.2v1.736h-2.142v1.13s.78-.014.768 0a.546.546 0 01.6.464v4.752a.37.37 0 01-.128.258.366.366 0 01-.272.092c.014.012-.768 0-.768 0l-.2 1.262h2.122v1.764h1.056V20.12h.844v1.73h1.058v-1.744c1.784-.108 3.028-.548 3.184-2.218.126-1.344-.506-1.944-1.516-2.186.614-.302.994-.862.908-1.778zm-1.48 3.756c0 1.312-2.248 1.162-2.964 1.162v-2.328c.716.002 2.964-.204 2.964 1.166zm-.49-3.28c0 1.2-1.876 1.054-2.472 1.054v-2.116c.596 0 2.472-.188 2.472 1.062z'/%3E%3Cpath d='M15.924 26.852C9.89 26.851 5 21.959 5 15.925 5 9.892 9.892 5 15.925 5c6.034 0 10.926 4.89 10.927 10.924a10.926 10.926 0 01-10.928 10.928zm0-21c-5.559.004-10.062 4.513-10.06 10.072.002 5.559 4.51 10.064 10.068 10.064 5.559 0 10.066-4.505 10.068-10.064A10.068 10.068 0 0015.924 5.852z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 8,
    id: '2260fac5e5542a773aa44fbcfedf7c193bc2c599.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'ChainLink Token',
    symbol: 'LINK',
    icon: "data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle fill='%232A5ADA' cx='16' cy='16' r='16'/%3E%3Cpath d='M16 6l-1.799 1.055L9.3 9.945 7.5 11v10l1.799 1.055 4.947 2.89L16.045 26l1.799-1.055 4.857-2.89L24.5 21V11l-1.799-1.055-4.902-2.89L16 6zm-4.902 12.89v-5.78L16 10.22l4.902 2.89v5.78L16 21.78l-4.902-2.89z' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '514910771af9ca656af840dff83e8264ecf986ca.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Octopus Network Token',
    symbol: 'OCT',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='O' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 113.39 113.39' style='enable-background:new 0 0 113.39 113.39;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23014299;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E%3Ccircle class='st0' cx='56.69' cy='56.69' r='56.69'/%3E%3Cg%3E%3Cpath class='st1' d='M44.25,59.41c-1.43,0-2.59,1.16-2.59,2.59v20.28c0,1.43,1.16,2.59,2.59,2.59c1.43,0,2.59-1.16,2.59-2.59V62 C46.84,60.57,45.68,59.41,44.25,59.41z'/%3E%3Cpath class='st1' d='M56.69,59.41c-1.45,0-2.62,1.17-2.62,2.62v26.47c0,1.45,1.17,2.62,2.62,2.62s2.62-1.17,2.62-2.62V62.02 C59.31,60.58,58.14,59.41,56.69,59.41z'/%3E%3Cpath class='st1' d='M79.26,78.87c-0.33,0.15-0.64,0.28-0.95,0.38c0,0-0.01,0-0.01,0c-0.59,0.19-1.13,0.29-1.63,0.31h-0.06 c-1,0.03-1.84-0.27-2.59-0.75c-0.49-0.32-0.91-0.73-1.25-1.23c-0.3-0.43-0.53-0.93-0.71-1.51c0-0.01-0.01-0.02-0.01-0.03 c-0.22-0.74-0.34-1.61-0.34-2.59V62.02c0-1.45-1.17-2.62-2.62-2.62c-1.45,0-2.62,1.17-2.62,2.62v11.43c0,4.5,1.64,8.03,4.63,9.96 c1.5,0.97,3.21,1.45,5.04,1.45c1.68,0,3.45-0.41,5.25-1.22c1.32-0.59,1.9-2.14,1.31-3.46C82.13,78.86,80.57,78.27,79.26,78.87z'/%3E%3Cpath class='st1' d='M68.33,45.9c0-2.15-1.75-3.9-3.9-3.9c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9 C66.58,49.8,68.33,48.05,68.33,45.9z'/%3E%3Cpath class='st1' d='M48.96,41.99c-2.15,0-3.9,1.75-3.9,3.9s1.75,3.9,3.9,3.9s3.9-1.75,3.9-3.9S51.11,41.99,48.96,41.99z'/%3E%3Cpath class='st1' d='M56.69,22.28c-15.17,0-27.52,12.34-27.52,27.52v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 c0-12.26,9.98-22.24,22.24-22.24c12.26,0,22.24,9.98,22.24,22.24v15.09c0,1.46,1.18,2.64,2.64,2.64s2.64-1.18,2.64-2.64V49.8 C84.21,34.62,71.87,22.28,56.69,22.28z'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'f5cfbc74057c610c8ef151a439252680ac68c6dc.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Ref Finance Token',
    symbol: 'REF',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.v2.ref-finance.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'HAPI',
    symbol: 'HAPI',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='600px' height='600px' viewBox='0 0 600 600' enable-background='new 0 0 600 600' xml:space='preserve'%3E %3Cg%3E %3Cg%3E %3Cpath fill='%23141414' d='M263.7,122.8c-3.6,0.3-7.1,0.9-10.7,1.8c-24.5,6-40.3,18.1-50.4,31c24.5-4.7,49.9,1.3,67.3,7.4 c0.5,0.2,1,0.4,1.6,0.6c-2.7-4.2-5.2-9-7.2-14.4C261.2,141.1,261.6,131.6,263.7,122.8z'/%3E %3Cpath fill='%23141414' d='M201.2,197.7c-9.8-1.1-19.1-2.1-24.6-2.1c-0.7,0-1.4,0-2,0.1c-38.1,2.6-67.2,37.3-69.1,82.4 c-1.4,32.2,13.5,53.1,23.3,63.4c-1.5-12.5-0.1-25,4.3-37.3c11.7-32.6,34.3-42.1,60.6-53.1c10.8-4.5,22.5-9.5,34.3-16.6l50.1-39.6 c-10.1,2.2-24.4,4.5-42.9,5.3C227.1,200.6,213.9,199.1,201.2,197.7z'/%3E %3Cpath fill='%23141414' d='M319.1,176.5c-0.5,1.1,0.9,2.1,1.8,1.2c5.3-5.4,16.3-14.3,30.8-14.2c15.6,0.1,35.5,10.2,40.5,22.1 c4,9.8-6.6,16.5-6.6,16.5l0,0c-2.5-2.7-8-6.3-18.2-6.6c-15-0.5-25.3,12.1-24.1,12.9c7.5,4.7,17.3,3.7,23.1,3.5 c5.8-0.2,15.1-2.5,17.8-3.5c4.7-1.8,11.7-7.8,14.9-16.1c2.5-6.5,8.4-28.7-25.2-34.4C352.7,154.3,327,159.6,319.1,176.5z'/%3E %3Cpath fill='%23141414' d='M473.1,225.1c-0.5-0.6-1.1-1.3-1.7-2l-0.3-0.3c-3.9-4.4-7.6-8.3-9.4-10.1c1.2-4.2,4-16.2,1-26.1 c-2.3-7.7-6.8-15.5-9.2-19.4l-0.8-1.2h0c-0.4-0.6-0.8-1.2-1.1-1.7c-0.3-0.4-0.5-0.7-0.6-1l-0.2-0.7c-2.5-7-8.6-22.3-16.4-28.1 l59.4-91.7c2.3-3.5-2.1-7.5-5.4-5l-86.8,66.5c-8.7-12.3-21.1-21.8-21.8-22.4c-0.8-0.6-2-0.7-2.9-0.2c-0.9,0.5-1.4,1.6-1.3,2.6 c0,0.1,0.6,5.9-2.9,17.6c7.5,2.7,13.9,6,19.3,9.7l-4.5,3.5c-8.8-5.7-20-10.5-34.3-12.6c-17.7-2.6-31.9,1-42.1,10.7c0,0,0,0,0,0 c5.9,3.8,13.1,8.7,17,12.4c0.8,0.7,1.5,1.5,2.2,2.3c-3.1,0.9-6.2,1.9-9.3,2.9c-0.3-0.2-0.5-0.5-0.8-0.7c-1.9-1.7-4.4-3.4-7-5.3 c-5.4-3.8-11.7-8.3-15.8-14c-2.2-3.1-3.8-6.5-4.3-10.4c-0.3-2.4-1-4-2.2-4.9c0,0,0,0,0,0c0,0,0,0,0,0c-0.6-0.5-2.8-2-5.8,0.3 c-2,1.6-4.4,5.3-6.5,10.3c-5.2,12.3-8.7,32.1-1.8,46.1c1.2,2.3,2.4,4.5,3.7,6.6c-0.4,1-0.7,2.1-0.9,3.1c-0.6,3.4-0.9,7.8-1.2,12.7 c-19.8-8.3-50.5-17.5-78.5-10.7c-23.9,5.8-39.4,17.5-49.6,30c7.4-3.1,15.2-5,23.5-5.6c5.6-0.4,16.4,0.8,27.9,2.1 c11.8,1.3,25.3,2.8,32.9,2.4c19.2-0.8,33.7-3.3,43.5-5.6c0,5.4,0.1,11.1,0.4,16.9c0.7,16.8,2.5,34.3,5,46.5 c3.6,17.9,16.5,55.2,31.4,64.6c5.5,3.5,13.5,8.2,22.9,13.4c-2.5,6.4-5.1,15.1-5.1,23.5c0,15.2,5.2,26.6,11,37 c4.6,8.2,9.6,15.7,12.8,24c2.5,6.5-2.7,27.7-5.6,38.9c-1.2,4.5-1.9,7.3-1.7,7c3.7-5.1,7.5-10.8,11.3-16.8 c15.3-24.2,19.4-47,19.5-48l0.2-1.4l-1.1-1c-0.2-0.2-17.2-15.7-18.3-33.3c-0.4-6.9,1-11.5,4.3-13.8c0.5-0.3,1-0.6,1.6-0.9 c7.5,3.7,15,7.3,22.2,10.5c2.8,3.5,9,9.4,11.8,12c3.4,3.2,6.9,7.8,12.2,7.8c5.3,0,15.9,0,21.3,0s13.1,0,17.3-2.1 c4.2-2.1,10.9-5.6,11-12.6c0-1.5,0.4-3.9,0.9-6.8c3.7-4.9,4.1-10.6,4.8-19.2c0.5-5.7,1.7-15.5,3-25.9c2-15.7,4.1-32,3.9-37.9 c-0.2-8.2-1.1-14.3-1.4-16.2C475.3,249.4,479.5,232.4,473.1,225.1z M318,310.6c-13.3-8.4-25.6-44.6-29-61.2 c-4.8-23.9-6.9-68.5-3.9-86.8c2.7-16.7,49-34.5,81.7-35.6c1.9-0.1,3.8-0.1,5.6-0.1c1,0,2,0,3,0c-0.1,4.9,1.3,15.6,13.8,25.5 c13.9,11,30.4,5,30.4,5l12.1-18.7c4.5,3.5,9.4,12.7,13,22.1c-0.9-0.4-1.9-0.7-3.1-0.9c-8.1-1.3-31.6-0.9-24,31.3 c1,4,5.2,9.4,17.2,22.3c2.8,3,5.1,5.3,7,7.2c5.6,5.6,7.4,7.4,7.5,11.8c0,0.3-0.2,1.6-0.4,3c-0.8-0.6-1.9-1.1-3.4-1 c-3.6-0.2-33.7,5.6-42.4,15.1c-1.7,1.9-4.5,2.6-6.7,1.4c-0.1-0.1-0.2-0.1-0.3-0.2c-1.4-0.8-2.3-1.9-2.8-3.5 c-1.3-5.1,2.9-13.2,4.6-16c0.6-1,0.3-2.3-0.6-2.9c-1-0.6-2.3-0.3-2.9,0.6c-0.1,0.2-0.9,1.5-1.9,3.5c-3.3,6.6-8.2,12.2-14.3,16.3 c-9.8,6.6-24,15.2-35.5,18.2c-18,4.7-24.9-8.2-25.2-8.8c-0.5-1-1.8-1.4-2.8-0.9c-1,0.5-1.5,1.8-0.9,2.8 c0.1,0.1,6.3,12.1,21.5,12.1c0.6,0,1.4-0.1,2.2-0.2c4.3-0.5,8.6,0.5,12.3,2.7c3.5,2.1,8,4.7,12.5,7c12.6,6.3,14.7,6.2,19.5,5.4 c1.1-0.2,49.8-2.4,80.1-8.2l3.6,0.2c2.4,0.1,4.3,2.3,4,4.7l0,0.1c-0.2,1.4-1,2.6-2.2,3.3c-2.7,1.5-6.5,3.5-9.9,4.9 c-1.6,0.6-3.3,1.2-5.1,1.6c-5.5,1.3-11.1,1.6-11.1,1.6s-5.4,1.2-13.5,2.1c-3.4,0.4-7.2,0.7-11.3,0.9c-14,0.7-13,1.6-24.8,1 c-2.9-0.1-5.7-0.3-8.3-0.6c-2.5-0.3-3.2,3.4-0.7,4c6.1,1.5,13.3,2.6,21.3,2.5c1,0,1.9,0,2.9,0c12.8-0.1,24.4,7.5,29.4,19.3 c2.1,5,4.1,12,5.4,18.5c1.8,8.4-5.3,16.1-13.8,15.3c-12.5-1.3-26.6-4.8-34.6-8.3C365.3,338.1,332.4,319.8,318,310.6z M448.7,169.2 l1.2,1.9c2.4,4,5.9,10.5,7.9,16.9c3.1,10.4-1.4,24.4-1.4,24.5l-0.5,1.5l1.1,1.1c0,0.1,5,5.2,10.3,11.1l0.1,0.2 c0.6,0.7,1.2,1.3,1.8,2c3.7,4.3,1.9,17-0.1,23.9l-0.2,0.6l0.1,0.6c0,0,0.3,1.5,0.6,3.9c-2.7,0.3-4.7,2.7-4.4,5.5l0.8,7.5l-8.6,0.1 l-13.5-15.3c-1-1.2-1-3,0.2-4c0,0,0,0,0,0c7.1-6.4,8.1-9.5,8.3-10.7c0.9-5.4,1.2-7.4,1.2-8.1c0-6.1-2.9-9-8.7-14.8 c-1.9-1.9-4.2-4.2-6.9-7.1c-0.6-0.6-1.1-1.2-1.7-1.8c2.1,0.6,4.9,1.2,8.5,1.5c8.4,0.7,10.9-1.4,10.9-1.4s1.5-2.7-1.1-6.6 c-2.6-3.9-6.2-6.7-13.2-6.9c-5-0.2-9.5,3.7-11.7,6c-0.9-1-2.9-4.7-3.8-10.9c-1.5-9.7,2.1-14.2,4.7-16.4c4.6-3.9,10.9-7.7,14.4-7.5 c0.9,0.1,1.9,0.2,2.7,0.4C447.8,167.7,448.2,168.4,448.7,169.2z M463.4,332.9c-0.7,8.2-1.1,12.8-3.8,16.5c-2.3,3.1-7.3,0.8-6.6-3 c0.4-2.1,0.7-4.3,0.8-6.4c0.3-10.7-4.9-20.9-6.7-27.7c0,0,0-0.1,0-0.1c-0.9-3.8,1.2-7.7,4.8-9.3c1.6-0.7,3.4-1.6,5.3-2.6 c4.6-2.3,9.9,1.3,9.2,6.4l0,0.1C465.2,317.2,463.9,327.1,463.4,332.9z M385.1,249.4c1.8-1.3,4.4-0.8,5.6,1.2 c0.8,1.4,1.9,2.9,3.4,4.1c4.5,3.7,9.8,3.5,13.2,3.5c3.3,0,5.4-0.6,6-0.8c0,0,0,0,0,0c2.4-0.5,4.3,2,3.1,4.2 c-2.6,4.8-6.1,11.1-6.5,11.4c-0.7,0.5-22.8,5.1-25.6,5.4s-11.6,1.2-18.2-3c-2.8-1.7-5.5-3.7-7.7-5.3c-1.7-1.2-1.4-3.8,0.4-4.7 C368.8,260.4,378.7,253.9,385.1,249.4z M436.8,263.8l8.3,9.1c1.5,1.7,0.5,4.4-1.7,4.7c-5,0.6-10,1.2-14.9,1.7 c-2.3,0.2-3.9-2.3-2.7-4.3c1.9-3,4.3-7,6.5-10.8C433.2,262.6,435.5,262.4,436.8,263.8z M396.4,117.1l83.5-69.1l-76.9,76.9 c-2.5,2.4-6.6,1.6-8.1-1.5h0C393.9,121.2,394.5,118.5,396.4,117.1z'/%3E %3Cpath fill='%23141414' d='M196.6,258.1c-25.6,10.7-45.8,19.2-56.4,48.7c-15.1,42,9.4,88.5,62.5,120.1c-17.4-68,3.5-93.1,22.1-115.3 c6.4-7.7,12.5-15,16.9-23.7c12.9-25.8,12.3-50.5,11.1-62C233.7,242.5,214.1,250.8,196.6,258.1z'/%3E %3C/g%3E %3Cg%3E %3Cpath d='M201.6,477.1h-9.1l-2.8,17.1h-14.3l2.8-17.1h-9.1l-2.8,17.1h-9.3l-1.5,9.1h9.3l-2.3,14h-9.4l-1.5,9.1h9.4l-2.8,17.1h9.1 l2.8-17.1h14.3l-2.8,17.1h9.1l2.8-17.1h9.3l1.5-9.1h-9.3l2.3-14h9.4l1.5-9.1h-9.4L201.6,477.1z M186,517.4h-14.3l2.3-14h14.3 L186,517.4z'/%3E %3Cpolygon points='260.8,505.3 230,505.3 230,477.1 218,477.1 218,543.6 230,543.6 230,515.4 260.8,515.4 260.8,543.6 272.9,543.6 272.9,477.1 260.8,477.1 '/%3E %3Cpath d='M307.1,477.1l-23.4,66.4h12.8l5.5-16.4h25l5.5,16.4h12.8l-23.4-66.4H307.1z M305.3,517.5l9-26.8h0.5l9,26.8H305.3z'/%3E %3Cpath d='M394,480c-3.5-1.9-7.8-2.9-12.9-2.9h-24.9v66.4h12v-22.4H381c5.1,0,9.4-0.9,12.9-2.8s6.2-4.5,7.9-7.8 c1.8-3.3,2.7-7.1,2.7-11.3c0-4.2-0.9-8-2.7-11.3C400.1,484.5,397.4,481.9,394,480z M390.9,505.4c-0.9,1.8-2.3,3.2-4.2,4.3 c-1.9,1-4.3,1.6-7.3,1.6h-11.1v-24h11c3,0,5.5,0.5,7.4,1.5c1.9,1,3.3,2.4,4.2,4.2c0.9,1.8,1.4,3.9,1.4,6.2 S391.8,503.6,390.9,505.4z'/%3E %3Crect x='417.1' y='477.1' width='12' height='66.4'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'd9c2d319cd7e6177336b0a9c93c21cb48d84fb54.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'PARAS',
    symbol: 'PARAS',
    icon: 'data:image/png;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.paras.near'
  }, {
    spec: 'ft-1.0.0',
    name: '1MILNFT',
    symbol: '1MIL',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='O' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 146 146' xml:space='preserve'%3E %3Cpath style='fill:%23ff00c6; stroke:none;' d='M0 0L0 31L31 31L31 0L0 0z'/%3E %3Cpath style='fill:%23df01ae; stroke:none;' d='M31 0L31 31L32 31L31 0z'/%3E %3Cpath style='fill:%23000000; stroke:none;' d='M32 0L32 32L0 32L0 38L32 38L32 70L0 70L0 76L32 76L32 109L0 109L0 114L32 114L32 146L38 146L38 114L70 114L70 146L76 146L76 114C82.7843 114 102.446 110.653 107.397 115.603C112.241 120.448 109 139.378 109 146L114 146L114 114L146 114L146 109C139.378 109 120.448 112.241 115.603 107.397C110.653 102.446 114 82.7843 114 76L146 76L146 70L114 70L114 38L146 38L146 32C139.378 32 120.448 35.2414 115.603 30.3966C110.759 25.5518 114 6.6225 114 0L109 0L109 32L76 32L76 0L71 0L71 32L38 32L38 0L32 0z'/%3E %3Cpath style='fill:%23459f00; stroke:none;' d='M38 0L38 32L70 32L70 31L39 31L38 0z'/%3E %3Cpath style='fill:%236fff00; stroke:none;' d='M39 0L39 31L70 31L70 0L39 0z'/%3E %3Cpath style='fill:%230d2000; stroke:none;' d='M70 0L70 32L71 32L70 0z'/%3E %3Cpath style='fill:%233f0180; stroke:none;' d='M76 0L76 32L108 32L108 31L77 31L76 0z'/%3E %3Cpath style='fill:%237f00ff; stroke:none;' d='M77 0L77 31L108 31L108 0L77 0z'/%3E %3Cpath style='fill:%232f0060; stroke:none;' d='M108 0L108 32L109 32L108 0z'/%3E %3Cpath style='fill:%231d4101; stroke:none;' d='M114 0L114 31L115 31L114 0z'/%3E %3Cpath style='fill:%236fff00; stroke:none;' d='M115 0L115 31L146 31L146 0L115 0z'/%3E %3Cpath style='fill:%239f017c; stroke:none;' d='M0 31L0 32L32 32L0 31z'/%3E %3Cpath style='fill:%23459f00; stroke:none;' d='M115 31L115 32L146 32L115 31z'/%3E %3Cpath style='fill:%2300f0ff; stroke:none;' d='M0 38L0 69L31 69L31 38L0 38z'/%3E %3Cpath style='fill:%2300d2df; stroke:none;' d='M31 38L31 69L0 69L0 70L32 70L31 38z'/%3E %3Cpath style='fill:%23be0094; stroke:none;' d='M38 38L38 70L39 70L38 38z'/%3E %3Cpath style='fill:%23ff00c6; stroke:none;' d='M39 38L39 69L70 69L70 38L39 38z'/%3E %3Cpath style='fill:%23200018; stroke:none;' d='M70 38L70 70L71 70L70 38z'/%3E %3Cpath style='fill:%23007880; stroke:none;' d='M76 38L76 70L77 70L76 38z'/%3E %3Cpath style='fill:%2300f0ff; stroke:none;' d='M77 38L77 69L108 69L108 38L77 38z'/%3E %3Cpath style='fill:%23015a60; stroke:none;' d='M108 38L108 70L109 70L108 38z'/%3E %3Cpath style='fill:%23400032; stroke:none;' d='M114 38L114 70L115 70L114 38z'/%3E %3Cpath style='fill:%23de00ad; stroke:none;' d='M115 38L115 39L146 39L115 38z'/%3E %3Cpath style='fill:%23ff00c6; stroke:none;' d='M115 39L115 70L146 70L146 39L115 39z'/%3E %3Cpath style='fill:%23df01ae; stroke:none;' d='M39 69L39 70L70 70L39 69z'/%3E %3Cpath style='fill:%2300d2df; stroke:none;' d='M77 69L77 70L108 70L77 69z'/%3E %3Cpath style='fill:%2354bf00; stroke:none;' d='M0 76L0 77L32 77L0 76z'/%3E %3Cpath style='fill:%235f00be; stroke:none;' d='M38 76L38 108L39 108L39 77L70 77L38 76z'/%3E %3Cpath style='fill:%230f001f; stroke:none;' d='M70 76L70 108L71 108L70 76z'/%3E %3Cpath style='fill:%23388000; stroke:none;' d='M76 76L76 108L77 108L76 76z'/%3E %3Cpath style='fill:%2354bf00; stroke:none;' d='M77 76L77 77L108 77L77 76z'/%3E %3Cpath style='fill:%232a6000; stroke:none;' d='M108 76L108 108L109 108L108 76z'/%3E %3Cpath style='fill:%23003d40; stroke:none;' d='M114 76L114 108L115 108L114 76z'/%3E %3Cpath style='fill:%2300b4bf; stroke:none;' d='M115 76L115 77L146 77L115 76z'/%3E %3Cpath style='fill:%236fff00; stroke:none;' d='M0 77L0 108L32 108L32 77L0 77z'/%3E %3Cpath style='fill:%237f00ff; stroke:none;' d='M39 77L39 108L70 108L70 77L39 77z'/%3E %3Cpath style='fill:%236fff00; stroke:none;' d='M77 77L77 108L108 108L108 77L77 77z'/%3E %3Cpath style='fill:%2300f0ff; stroke:none;' d='M115 77L115 108L146 108L146 77L115 77z'/%3E %3Cpath style='fill:%230f2000; stroke:none;' d='M0 108L0 109L32 109L0 108M76 108L76 109L108 109L76 108z'/%3E %3Cpath style='fill:%23001e20; stroke:none;' d='M115 108L115 109L146 109L115 108z'/%3E %3Cpath style='fill:%23810064; stroke:none;' d='M0 114L0 115L32 115L0 114z'/%3E %3Cpath style='fill:%23398000; stroke:none;' d='M38 114L38 115L70 115L38 114z'/%3E %3Cpath style='fill:%23800063; stroke:none;' d='M76 114L76 146L77 146L77 115L108 115L76 114z'/%3E %3Cpath style='fill:%23200041; stroke:none;' d='M114 114L114 146L115 146L114 114z'/%3E %3Cpath style='fill:%23410080; stroke:none;' d='M115 114L115 115L146 115L115 114z'/%3E %3Cpath style='fill:%23ff00c6; stroke:none;' d='M0 115L0 146L31 146L31 115L0 115z'/%3E %3Cpath style='fill:%23df01ae; stroke:none;' d='M31 115L31 146L32 146L31 115z'/%3E %3Cpath style='fill:%2354bf00; stroke:none;' d='M38 115L38 146L39 146L38 115z'/%3E %3Cpath style='fill:%236fff00; stroke:none;' d='M39 115L39 146L70 146L70 115L39 115z'/%3E %3Cpath style='fill:%23ff00c6; stroke:none;' d='M77 115L77 146L108 146L108 115L77 115z'/%3E %3Cpath style='fill:%2360004a; stroke:none;' d='M108 115L108 146L109 146L108 115z'/%3E %3Cpath style='fill:%237f00ff; stroke:none;' d='M115 115L115 146L146 146L146 115L115 115z'/%3E %3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'a4ef4b0b23c1fc81d3f9ecf93510e64f58a4a016.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'marma j token',
    symbol: 'marmaj',
    icon: 'data:image/jpeg;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'marmaj.tkn.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Staked NEAR',
    symbol: 'STNEAR',
    icon: "data:image/svg+xml,%3csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='96' height='96' rx='48' fill='white'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M48.0006 20L41.2575 26.7431L48.0006 33.4862L54.7437 26.7431L48.0006 20ZM37.281 30.7188L30.7144 37.2853L47.9998 54.5707L65.2851 37.2853L58.7186 30.7188L47.9998 41.4376L37.281 30.7188ZM26.7384 41.261L19.9953 48.0041L47.9995 76.0083L76.0037 48.0041L69.2606 41.2611L47.9995 62.5221L26.7384 41.261Z' fill='%23231B51'/%3e%3c/svg%3e",
    reference: 'https://metapool.app',
    reference_hash: null,
    decimals: 24,
    id: 'meta-pool.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Cheddar',
    symbol: 'Cheddar',
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA2NCA2NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNjQgNjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDp1cmwoI1hNTElEXzE2Xyk7fQoJLnN0MXtmaWxsOiNGRkU5NTk7fQoJLnN0MntvcGFjaXR5OjAuMjt9Cgkuc3Qze2ZpbGw6IzQyNDI0Mjt9Cgkuc3Q0e29wYWNpdHk6MC45O2ZpbGw6dXJsKCNYTUxJRF8xN18pO2VuYWJsZS1iYWNrZ3JvdW5kOm5ldyAgICA7fQoJLnN0NXtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDZ7ZmlsbDp1cmwoI1hNTElEXzE4Xyk7fQoJLnN0N3tvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfMTlfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDh7ZmlsbDp1cmwoI1hNTElEXzIwXyk7fQoJLnN0OXtvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfMjFfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDEwe2ZpbGw6dXJsKCNTVkdJRF8yXyk7fQoJLnN0MTF7b3BhY2l0eTowLjk7ZmlsbDp1cmwoI1hNTElEXzIyXyk7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3QxMntmaWxsOnVybCgjWE1MSURfMjNfKTt9Cgkuc3QxM3tvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfMjRfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDE0e2ZpbGw6dXJsKCNTVkdJRF8zXyk7fQoJLnN0MTV7ZmlsbDp1cmwoI1hNTElEXzI2Xyk7fQoJLnN0MTZ7b3BhY2l0eTowLjk7ZmlsbDp1cmwoI1hNTElEXzI3Xyk7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3QxN3tmaWxsOnVybCgjWE1MSURfMzFfKTt9Cgkuc3QxOHtvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfMzNfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDE5e2ZpbGw6dXJsKCNTVkdJRF80Xyk7fQoJLnN0MjB7b3BhY2l0eTowLjk7ZmlsbDp1cmwoI1hNTElEXzM0Xyk7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3QyMXtmaWxsOnVybCgjWE1MSURfMzZfKTt9Cgkuc3QyMntvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfMzdfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDIze2ZpbGw6dXJsKCNTVkdJRF81Xyk7fQoJLnN0MjR7ZmlsbDp1cmwoI1hNTElEXzM4Xyk7fQoJLnN0MjV7b3BhY2l0eTowLjk7ZmlsbDp1cmwoI1hNTElEXzM5Xyk7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3QyNntmaWxsOnVybCgjWE1MSURfNDBfKTt9Cgkuc3QyN3tvcGFjaXR5OjAuOTtmaWxsOnVybCgjWE1MSURfNDFfKTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDI4e2ZpbGw6dXJsKCNTVkdJRF82Xyk7fQoJLnN0Mjl7b3BhY2l0eTowLjk7ZmlsbDp1cmwoI1hNTElEXzQyXyk7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cjwvc3R5bGU+CjxnIGlkPSJMYXllcl8xXzFfIj4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iWE1MSURfMTZfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0xODIxLjEzNTMiIHkxPSI5ODMuMTc0MyIgeDI9Ii0xODIxLjEzNTMiIHkyPSI5OTguMDU0MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSAtMTc5MC4yNzUzIC05NDYpIj4KCQk8c3RvcCAgb2Zmc2V0PSIxLjk3MDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNGN0JDMDAiLz4KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkNENzNFIi8+Cgk8L2xpbmVhckdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzY4XyIgY2xhc3M9InN0MCIgZD0iTTUyLjMsNDAuMnYxNC4xbC00MC4yLTYuMWMtMS41LTAuMy0yLjYtMS4zLTIuNi0yLjNjMC4xLTMuOC0wLjEtNy41LDAtMTEuMQoJCWMwLTAuNywwLjEtMS41LDEuMi0xLjdjMC43LTAuMSwxLjYsMC4yLDIuMywwLjNsNC45LDAuOGMwLDAuMSwwLDAuMywwLDAuNGMwLDEuNiwxLjcsMyw0LDMuMWMyLDAuMSwzLjYtMC44LDMuOS0yLjJMNDAuNiwzOAoJCWMtMC4xLDAuMi0wLjIsMC40LTAuMiwwLjVjMCwwLjcsMC45LDEuMywxLjksMS40YzEuMSwwLjEsMS45LTAuNCwxLjktMS4yYzAtMC4xLDAtMC4xLDAtMC4yQzQ0LjEsMzguNiw1Mi4zLDQwLjIsNTIuMyw0MC4yeiIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuNSwzNC44YzAuMy0xLjItMC40LTIuNiwzLjUtMS41bDQuOSwwLjhjMC40LTEsMi0xLjYsMy44LTEuNGMyLjIsMC4xLDQsMS4zLDQsMi41YzAsMC4xLDAsMC4yLDAsMC4zCgkJTDQwLjUsMzhsMCwwYzAuMy0wLjMsMS0wLjQsMS43LTAuNGMxLDAuMSwxLjksMC41LDEuOSwxLjFsOC4yLDEuNkwzMC44LDI3LjVjLTItMS4yLTQuNS0xLjctNi43LTEuM2MtMi4yLDAuMy01LDAuOC03LjEsMS42CgkJYy0yLjUsMC45LTQuOCwyLjQtNi4yLDMuNmMtMC4xLDAuMS0wLjYsMC41LTAuOSwxLjFDOS41LDMzLDkuNSwzMy44LDkuNSwzNC44eiIvPgoJPGcgY2xhc3M9InN0MiI+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTI1LjQsMjdjMS42LDAsMy4zLDAuNCw0LjcsMS4zbDIxLDEyLjV2MTIuNmwtMzguOC01LjljLTAuOS0wLjItMS43LTAuOC0xLjYtMS40YzAtMi4yLDAtNC4zLDAtNi41CgkJCWMwLTEuNSwwLTMuMSwwLTQuN2MwLTAuMSwwLTAuMiwwLTAuNGwwLDBjMC0wLjUsMC4xLTEuMiwwLjMtMS42YzAuMi0wLjQsMC41LTAuNywwLjYtMC44YzEuNC0xLjEsMy42LTIuNSw1LjgtMy40CgkJCWMxLjYtMC42LDQtMS4xLDYuOC0xLjVDMjQuNiwyNywyNC45LDI3LDI1LjQsMjcgTTI1LjQsMjYuMWMtMC40LDAtMC45LDAtMS4zLDAuMWMtMi4yLDAuMy01LDAuOC03LjEsMS42CgkJCWMtMi41LDAuOS00LjgsMi40LTYuMiwzLjZjLTAuMSwwLjEtMC42LDAuNS0wLjksMS4xYy0wLjMsMC41LTAuMywxLjItMC40LDEuOWMwLDAuMiwwLDAuMywwLDAuNGMwLDMuNywwLjEsNy41LDAuMSwxMS4xCgkJCWMwLDEuMSwxLjEsMi4xLDIuNiwyLjNsNDAuMiw2LjFWNDAuMkwzMC44LDI3LjVDMjkuMiwyNi42LDI3LjMsMjYuMSwyNS40LDI2LjFMMjUuNCwyNi4xeiIvPgoJPC9nPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF8xN18iIGN4PSItMzA0NS4xOTg3IiBjeT0iMjA0Ny40NDY5IiByPSI2Ljg2ODciIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuNDI1OCAwIDAgMC4zMjI1IC0xMjc5Ljk4MTMgLTYxNy4xODk5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzM1XyIgY2xhc3M9InN0NCIgZD0iTTE4LjQsNDMuOGMwLDEuMi0xLjMsMi4xLTMsMmMtMS42LTAuMS0zLTEuMi0zLTIuM3MxLjMtMi4xLDMtMkMxNyw0MS41LDE4LjQsNDIuNiwxOC40LDQzLjh6IgoJCS8+CgkKCQk8cmFkaWFsR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBjeD0iLTMwNjQuNDI3NSIgY3k9IjIwMTUuOTU3IiByPSIxNC4xMzIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjQyNTggMCAwIDAuMzIyNSAtMTI3OS45ODEzIC02MTcuMTg5OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4LjEzMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNERTdGMTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjMzODkiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQTdEMTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU5OTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNDRTc2MEQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg2MDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTZDMDUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0FENjUwMCIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0xNy44LDM0LjRjMCwxLjYsMS43LDMsNCwzLjFjMiwwLjEsMy42LTAuOCwzLjktMi4yaC0wLjFsLTAuMy0wLjFsMC40LDAuMWMwLTAuMSwwLTAuMiwwLTAuMwoJCWMwLTEuMy0xLjgtMi40LTQtMi41Yy0xLjgtMC4xLTMuNCwwLjUtMy44LDEuNEMxNy44LDM0LjIsMTcuOCwzNC40LDE3LjgsMzQuNHoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMThfIiBjeD0iLTEzMjguMjIwMiIgY3k9IjM0ODEuNzQ3MSIgcj0iNy4xMDIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMzA3OCAwLjIyMjggMC4yNDA5IDAuMTkwOSAtMTIyMS41MjUxIC0zNDAuNzk4NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4Ljc1MDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTk5MTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQwOTgiIHN0eWxlPSJzdG9wLWNvbG9yOiNENTk2MTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjczNSIgc3R5bGU9InN0b3AtY29sb3I6I0M5OEQwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQkE4MjA3Ii8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzMyXyIgY2xhc3M9InN0NiIgZD0iTTI2LjgsMjkuNGMwLDAuNS0wLjksMS0yLDAuOXMtMi0wLjYtMi0xLjJzMC45LTEsMi0wLjlDMjYsMjguMiwyNi44LDI4LjgsMjYuOCwyOS40eiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF8xOV8iIGN4PSItMzA3OS41NTMiIGN5PSIyMDQ0LjQxMSIgcj0iMTUuNjcyNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMC40MjU4IDAgMCAwLjMyMjUgLTEyNzkuOTgxMyAtNjE3LjE4OTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC4xMzAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojREU3RjE0Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC4zMzg5IiBzdHlsZT0ic3RvcC1jb2xvcjojREE3RDEyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC41OTkzIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0U3NjBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC44NjAyIiBzdHlsZT0ic3RvcC1jb2xvcjojQkE2QzA1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNBRDY1MDAiLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfMzBfIiBjbGFzcz0ic3Q3IiBkPSJNMzUuMSw0My40YzAsMi4xLTIuMiwzLjUtNSwzLjNzLTUtMi01LTRjMC0yLjEsMi4yLTMuNSw1LTMuM0MzMi44LDM5LjYsMzUuMSw0MS40LDM1LjEsNDMuNHoiCgkJLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMjBfIiBjeD0iLTMwNzYuMzYxNiIgY3k9IjIwMTEuMTY0OCIgcj0iMTAuOTExOCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMC40MjU4IDAgMCAwLjMyMjUgLTEyNzkuOTgxMyAtNjE3LjE4OTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC43NTAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojRDk5OTE0Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC40MDk4IiBzdHlsZT0ic3RvcC1jb2xvcjojRDU5NjEyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC43MzUiIHN0eWxlPSJzdG9wLWNvbG9yOiNDOThEMEQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0JBODIwNyIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGlkPSJYTUxJRF8yOV8iIGNsYXNzPSJzdDgiIGQ9Ik0zNS44LDMzLjFjMCwwLjgtMS4zLDEuMy0yLjksMS4yYy0xLjYtMC4yLTIuOS0wLjgtMi45LTEuNmMwLTAuOCwxLjMtMS4zLDIuOS0xLjIKCQlDMzQuNiwzMS43LDM1LjgsMzIuMywzNS44LDMzLjF6Ii8+CgkKCQk8cmFkaWFsR3JhZGllbnQgaWQ9IlhNTElEXzIxXyIgY3g9Ii0zMTAyLjMwMzUiIGN5PSIyMDU5Ljc2NjgiIHI9IjUuOTI4NSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMC40MjU4IDAgMCAwLjMyMjUgLTEyNzkuOTgxMyAtNjE3LjE4OTkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC4xMzAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojREU3RjE0Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC4zMzg5IiBzdHlsZT0ic3RvcC1jb2xvcjojREE3RDEyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC41OTkzIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0U3NjBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC44NjAyIiBzdHlsZT0ic3RvcC1jb2xvcjojQkE2QzA1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNBRDY1MDAiLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfMjhfIiBjbGFzcz0ic3Q5IiBkPSJNNDIuMyw0Ny43YzAsMS0xLjIsMS44LTIuNiwxLjdjLTEuNC0wLjEtMi42LTEtMi42LTIuMWMwLTEuMSwxLjItMS44LDIuNi0xLjcKCQlDNDEuMSw0NS45LDQyLjMsNDYuOCw0Mi4zLDQ3Ljd6Ii8+CgkKCQk8cmFkaWFsR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBjeD0iLTMxMDYuODA4OCIgY3k9IjIwMzAuMDM0MyIgcj0iOC44NDA4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjQyNTggMCAwIDAuMzIyNSAtMTI3OS45ODEzIC02MTcuMTg5OSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4LjYwMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNDNzczMTUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjM3NzQiIHN0eWxlPSJzdG9wLWNvbG9yOiNDMzcxMTMiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjY3MTgiIHN0eWxlPSJzdG9wLWNvbG9yOiNCNzZDMEYiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk2NjkiIHN0eWxlPSJzdG9wLWNvbG9yOiNBMzY0MDciLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0ExNjMwNiIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDEwIiBkPSJNNDAuMiwzOC41YzAsMC43LDAuOSwxLjMsMS45LDEuNGMxLjEsMC4xLDEuOS0wLjQsMS45LTEuMmMwLTAuMSwwLTAuMSwwLTAuMmwwLDBjMC0wLjUtMC45LTEtMS45LTEuMQoJCWMtMC43LTAuMS0xLjQsMC4xLTEuNywwLjRsMCwwQzQwLjMsMzguMSw0MC4yLDM4LjMsNDAuMiwzOC41eiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF8yMl8iIGN4PSItMzExOS4yMjA1IiBjeT0iMjA0OC44OTk5IiByPSI0LjM5ODUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuNDI1OCAwIDAgMC4zMjI1IC0xMjc5Ljk4MTMgLTYxNy4xODk5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzI1XyIgY2xhc3M9InN0MTEiIGQ9Ik00OC43LDQ0YzAsMC41LTAuNiwxLTEuMywwLjljLTAuNy0wLjEtMS4zLTAuNS0xLjMtMS4xYzAtMC41LDAuNi0xLDEuMy0wLjkKCQlDNDgsNDMsNDguNyw0My40LDQ4LjcsNDR6Ii8+CjwvZz4KPGcgaWQ9IkxheWVyXzFfMl8iPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJYTUxJRF8yM18iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTIxMjYuNTcyIiB5MT0iMTAyNi43NzYxIiB4Mj0iLTIxMjYuNTcyIiB5Mj0iMTAzOS45Mzc5IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjc2NTIgLTEuNjc0MTIzZS0wMiAtMS44Nzk5NDdlLTAyIDAuODU5MyAtMTU3Ni4yMTU3IC04OTMuNDA4NSkiPgoJCTxzdG9wICBvZmZzZXQ9IjEuOTcwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0Y3QkMwMCIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGQ0Q3M0UiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfN18iIGNsYXNzPSJzdDEyIiBkPSJNNDcsMjdsLTAuNCwxMC45bC0yOC41LTUuMWMtMS4xLTAuMi0xLjgtMS0xLjgtMS44YzAuMi0yLjksMC4xLTUuOCwwLjMtOC42CgkJYzAtMC41LDAuMS0xLjIsMC45LTEuM2MwLjUtMC4xLDEuMiwwLjIsMS43LDAuM2wzLjQsMC43YzAsMC4xLDAsMC4yLDAsMC4zYzAsMS4yLDEuMiwyLjMsMi43LDIuNGMxLjQsMC4xLDIuNi0wLjYsMi44LTEuNgoJCWwxMC41LDIuMmMtMC4xLDAuMS0wLjIsMC4zLTAuMiwwLjRjMCwwLjUsMC41LDEuMSwxLjMsMS4yYzAuNywwLjEsMS4zLTAuNCwxLjMtMC45YzAtMC4xLDAtMC4xLDAtMC4yQzQxLjEsMjUuNiw0NywyNyw0NywyN3oiLz4KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi41LDIyLjRjMC4yLTAuOS0wLjItMiwyLjUtMS4ybDMuNCwwLjdjMC4zLTAuNywxLjQtMS4yLDIuOC0xLjFjMS41LDAuMSwyLjgsMS4xLDIuOCwyYzAsMC4xLDAsMC4yLDAsMC4yCgkJbDEwLjUsMi4ybDAsMGMwLjItMC4zLDAuNy0wLjQsMS4zLTAuNGMwLjcsMC4xLDEuMywwLjQsMS4zLDAuOGw1LjgsMS4zTDMyLDE3Yy0xLjMtMC45LTMuMS0xLjMtNC44LTEuMWMtMS42LDAuMi0zLjYsMC41LTUuMSwxLjIKCQljLTEuOCwwLjYtMy40LDEuOC00LjUsMi43Yy0wLjEsMC4xLTAuNCwwLjQtMC42LDAuOEMxNi42LDIxLjEsMTYuNiwyMS43LDE2LjUsMjIuNHoiLz4KCTxnIGNsYXNzPSJzdDIiPgoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yOC4xLDE2LjVjMS4yLDAsMi4zLDAuNCwzLjMsMWwxNC43LDkuOEw0NS45LDM3bC0yNy42LTQuOWMtMC42LTAuMS0xLjItMC42LTEuMi0xLjIKCQkJYzAuMS0xLjYsMC4xLTMuMywwLjItNC45YzAtMS4yLDAuMS0yLjQsMC4xLTMuNmMwLTAuMSwwLTAuMiwwLTAuM2wwLDBjMC0wLjQsMC4xLTAuOSwwLjItMS4zYzAuMS0wLjMsMC40LTAuNSwwLjQtMC42CgkJCWMxLTAuOCwyLjYtMS45LDQuMy0yLjVjMS4yLTAuNCwyLjktMC44LDQuOS0xLjFDMjcuNSwxNi41LDI3LjgsMTYuNSwyOC4xLDE2LjUgTTI4LjEsMTUuOGMtMC40LDAtMC42LDAtMSwwLjEKCQkJYy0xLjYsMC4yLTMuNiwwLjUtNS4xLDEuMmMtMS44LDAuNi0zLjQsMS44LTQuNSwyLjdjLTAuMSwwLjEtMC40LDAuNC0wLjYsMC44Yy0wLjIsMC40LTAuMywwLjktMC4zLDEuNGMwLDAuMSwwLDAuMiwwLDAuMwoJCQljLTAuMSwyLjktMC4xLDUuOC0wLjMsOC42YzAsMC44LDAuNywxLjYsMS44LDEuOGwyOC41LDUuMUw0NywyN0wzMS45LDE3QzMwLjgsMTYuMywyOS40LDE1LjgsMjguMSwxNS44TDI4LjEsMTUuOHoiLz4KCTwvZz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMjRfIiBjeD0iLTM5OTEuOTUyOSIgY3k9IjI0MDEuOTY1MSIgcj0iNi44Njg3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjMwMzcgLTQuMzQ2MjA4ZS0wMyAtNy41ODc3MjFlLTAzIDAuMjQ4NCAtMTE3Mi42NTQ4IC01ODUuMTI5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzZfIiBjbGFzcz0ic3QxMyIgZD0iTTIyLjcsMjkuNGMwLDAuOS0xLDEuNi0yLjIsMS40Yy0xLjItMC4yLTIuMS0wLjktMi4xLTEuOWMwLTEsMS0xLjYsMi4yLTEuNAoJCVMyMi43LDI4LjUsMjIuNywyOS40eiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJTVkdJRF8zXyIgY3g9Ii00MDExLjE4MTYiIGN5PSIyMzcwLjQ3NTMiIHI9IjE0LjEzMjEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMzAzNyAtNC4zNDYyMDhlLTAzIC03LjU4NzcyMWUtMDMgMC4yNDg0IC0xMTcyLjY1NDggLTU4NS4xMjkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC4xMzAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojREU3RjE0Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC4zMzg5IiBzdHlsZT0ic3RvcC1jb2xvcjojREE3RDEyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC41OTkzIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0U3NjBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC44NjAyIiBzdHlsZT0ic3RvcC1jb2xvcjojQkE2QzA1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNBRDY1MDAiLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBjbGFzcz0ic3QxNCIgZD0iTTIyLjQsMjIuMmMwLDEuMiwxLjIsMi4zLDIuNywyLjRjMS40LDAuMSwyLjYtMC42LDIuOC0xLjZoLTAuMWgtMC4ybDAuMywwLjFjMC0wLjEsMC0wLjIsMC0wLjIKCQljMC0xLTEuMy0xLjktMi44LTJjLTEuMy0wLjEtMi40LDAuNC0yLjgsMS4xQzIyLjUsMjIsMjIuNCwyMi4xLDIyLjQsMjIuMnoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMjZfIiBjeD0iLTE3NjcuOTQ2NSIgY3k9IjQ1OTMuOTUyMSIgcj0iNy4xMDIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMjI0OCAwLjE2ODUgMC4xNjczIDAuMTQ5NSAtMTEzNy40NjU2IC0zNzEuNjE3OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4Ljc1MDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTk5MTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQwOTgiIHN0eWxlPSJzdG9wLWNvbG9yOiNENTk2MTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjczNSIgc3R5bGU9InN0b3AtY29sb3I6I0M5OEQwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQkE4MjA3Ii8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzVfIiBjbGFzcz0ic3QxNSIgZD0iTTI5LjEsMTguNGMwLDAuNC0wLjYsMC43LTEuNCwwLjdjLTAuNy0wLjEtMS4zLTAuNC0xLjMtMC45YzAtMC40LDAuNi0wLjcsMS40LTAuNwoJCUMyOC40LDE3LjYsMjkuMSwxNy45LDI5LjEsMTguNHoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMjdfIiBjeD0iLTQwMjYuMzA3MSIgY3k9IjIzOTguOTI5MiIgcj0iMTUuNjcyNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMC4zMDM3IC00LjM0NjIwOGUtMDMgLTcuNTg3NzIxZS0wMyAwLjI0ODQgLTExNzIuNjU0OCAtNTg1LjEyOSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4LjEzMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNERTdGMTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjMzODkiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQTdEMTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU5OTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNDRTc2MEQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg2MDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTZDMDUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0FENjUwMCIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGlkPSJYTUxJRF80XyIgY2xhc3M9InN0MTYiIGQ9Ik0zNC42LDI5LjNjLTAuMSwxLjUtMS43LDIuNy0zLjcsMi41Yy0yLTAuMi0zLjYtMS42LTMuNS0zLjFjMC4xLTEuNSwxLjctMi43LDMuNy0yLjUKCQlDMzMsMjYuMywzNC42LDI3LjcsMzQuNiwyOS4zeiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF8zMV8iIGN4PSItNDAyMy4xMTU3IiBjeT0iMjM2NS42ODMxIiByPSIxMC45MTE4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjMwMzcgLTQuMzQ2MjA4ZS0wMyAtNy41ODc3MjFlLTAzIDAuMjQ4NCAtMTE3Mi42NTQ4IC01ODUuMTI5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguNzUwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0Q5OTkxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNDA5OCIgc3R5bGU9InN0b3AtY29sb3I6I0Q1OTYxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNzM1IiBzdHlsZT0ic3RvcC1jb2xvcjojQzk4RDBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTgyMDciLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfM18iIGNsYXNzPSJzdDE3IiBkPSJNMzUuNCwyMS4zYzAsMC42LTEsMS0yLjEsMC45Yy0xLjEtMC4xLTIuMS0wLjYtMi4xLTEuM3MxLTEsMi4xLTAuOQoJCUMzNC41LDIwLjIsMzUuNCwyMC43LDM1LjQsMjEuM3oiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMzNfIiBjeD0iLTQwNDkuMDU3OSIgY3k9IjI0MTQuMjg1MiIgcj0iNS45Mjg1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjMwMzcgLTQuMzQ2MjA4ZS0wMyAtNy41ODc3MjFlLTAzIDAuMjQ4NCAtMTE3Mi42NTQ4IC01ODUuMTI5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzJfIiBjbGFzcz0ic3QxOCIgZD0iTTM5LjYsMzIuN2MwLDAuOC0wLjksMS4zLTEuOSwxLjNjLTEtMC4xLTEuOC0wLjgtMS44LTEuNnMwLjktMS4zLDEuOS0xLjMKCQlDMzguOSwzMS4yLDM5LjcsMzEuOSwzOS42LDMyLjd6Ii8+CgkKCQk8cmFkaWFsR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiBjeD0iLTQwNTMuNTYzIiBjeT0iMjM4NC41NTI1IiByPSI4Ljg0MDgiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMzAzNyAtNC4zNDYyMDhlLTAzIC03LjU4NzcyMWUtMDMgMC4yNDg0IC0xMTcyLjY1NDggLTU4NS4xMjkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC42MDAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojQzc3MzE1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC4zNzc0IiBzdHlsZT0ic3RvcC1jb2xvcjojQzM3MTEzIi8+CgkJPHN0b3AgIG9mZnNldD0iMC42NzE4IiBzdHlsZT0ic3RvcC1jb2xvcjojQjc2QzBGIi8+CgkJPHN0b3AgIG9mZnNldD0iMC45NjY5IiBzdHlsZT0ic3RvcC1jb2xvcjojQTM2NDA3Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNBMTYzMDYiLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBjbGFzcz0ic3QxOSIgZD0iTTM4LjQsMjUuNmMwLDAuNSwwLjUsMS4xLDEuMywxLjJjMC43LDAuMSwxLjMtMC40LDEuMy0wLjljMC0wLjEsMC0wLjEsMC0wLjJsMCwwYzAtMC40LTAuNi0wLjgtMS4zLTAuOAoJCWMtMC41LTAuMS0xLDAuMS0xLjMsMC40bDAsMEMzOC40LDI1LjMsMzguNCwyNS41LDM4LjQsMjUuNnoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMzRfIiBjeD0iLTQwNjUuOTc0NiIgY3k9IjI0MDMuNDE4MiIgcj0iNC4zOTg1IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjMwMzcgLTQuMzQ2MjA4ZS0wMyAtNy41ODc3MjFlLTAzIDAuMjQ4NCAtMTE3Mi42NTQ4IC01ODUuMTI5KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzFfIiBjbGFzcz0ic3QyMCIgZD0iTTQ0LjMsMjkuOWMwLDAuNC0wLjQsMC43LTEsMC43cy0xLTAuNC0xLTAuOWMwLTAuNCwwLjQtMC43LDEtMC43CgkJQzQzLjgsMjkuMSw0NC4zLDI5LjQsNDQuMywyOS45eiIvPgo8L2c+CjxnIGlkPSJMYXllcl8xXzNfIj4KCQoJCTxsaW5lYXJHcmFkaWVudCBpZD0iWE1MSURfMzZfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii0yNDIyLjUxNzMiIHkxPSIxMDA1LjY1NDYiIHgyPSItMjQyMi41MTczIiB5Mj0iMTAxNC43NjQzIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjYyODcgLTMuOTI5MDMwZS0wMiAtNS4wNDc5OThlLTAyIDAuODA3NyAtMTQ0MC42ODE1IC04OTIuMDUxMykiPgoJCTxzdG9wICBvZmZzZXQ9IjEuOTcwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0Y3QkMwMCIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGQ0Q3M0UiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfMTRfIiBjbGFzcz0ic3QyMSIgZD0iTTQwLjYsMTcuMmwtMC42LDcuMmwtMTYuNy0zLjhjLTAuNi0wLjItMS4xLTAuNy0xLTEuM2MwLjItMS45LDAuMy0zLjksMC40LTUuOAoJCWMwLTAuNCwwLjEtMC44LDAuNS0wLjljMC40LTAuMSwwLjcsMC4xLDEsMC4ybDIsMC41YzAsMC4xLDAsMC4yLDAsMC4yYy0wLjEsMC44LDAuNiwxLjUsMS41LDEuNmMwLjgsMC4xLDEuNS0wLjQsMS43LTEuMWw2LjIsMS41CgkJYy0wLjEsMC4xLTAuMSwwLjItMC4xLDAuM2MwLDAuNCwwLjMsMC43LDAuNywwLjhzMC44LTAuMiwwLjktMC41di0wLjFDMzcuMiwxNi4yLDQwLjYsMTcuMiw0MC42LDE3LjJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjIuOCwxMy43YzAuMi0wLjUsMC0xLjMsMS41LTAuN2wyLDAuNWMwLjItMC40LDAuOS0wLjgsMS43LTAuN2MwLjksMC4xLDEuNiwwLjcsMS41LDEuM2MwLDAuMSwwLDAuMSwwLDAuMgoJCWw2LjIsMS41bDAsMGMwLjItMC4yLDAuNC0wLjMsMC43LTAuMmMwLjQsMC4xLDAuNywwLjMsMC43LDAuNWwzLjQsMUwzMiwxMC4zYy0wLjgtMC42LTEuOC0wLjktMi44LTAuOGMtMSwwLjItMi4yLDAuNC0zLjEsMC43CgkJYy0xLjEsMC40LTIuMSwxLjItMi44LDEuN2MwLDAtMC4zLDAuMy0wLjQsMC41QzIyLjksMTIuOCwyMi44LDEzLjIsMjIuOCwxMy43eiIvPgoJPGcgY2xhc3M9InN0MiI+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTI5LjgsOS45YzAuNywwLDEuMywwLjMsMS45LDAuN2w4LjQsNi43bC0wLjUsNi41bC0xNi4xLTMuN2MtMC40LTAuMS0wLjYtMC40LTAuNi0wLjgKCQkJYzAuMS0xLjEsMC4yLTIuMiwwLjMtMy4zYzAuMS0wLjgsMC4xLTEuNiwwLjItMi40YzAtMC4xLDAtMC4xLDAtMC4ybDAsMGMwLTAuMywwLjEtMC42LDAuMi0wLjhjMC4xLTAuMiwwLjMtMC40LDAuMy0wLjQKCQkJYzAuNi0wLjUsMS42LTEuMywyLjYtMS42YzAuNy0wLjMsMS43LTAuNSwzLTAuNkMyOS40LDkuOSwyOS42LDkuOSwyOS44LDkuOSBNMjkuOSw5LjVjLTAuMiwwLTAuNCwwLTAuNiwwYy0xLDAuMi0yLjIsMC40LTMuMSwwLjcKCQkJYy0xLjEsMC40LTIuMSwxLjItMi44LDEuN2MwLDAtMC4zLDAuMy0wLjQsMC41Yy0wLjEsMC4zLTAuMiwwLjUtMC4yLDFjMCwwLjEsMCwwLjIsMCwwLjJjLTAuMiwxLjktMC4zLDMuOS0wLjQsNS44CgkJCWMtMC4xLDAuNSwwLjQsMS4xLDEsMS4zbDE2LjYsMy45bDAuNi03LjNMMzIsMTAuM0MzMS40LDkuOCwzMC42LDkuNiwyOS45LDkuNUwyOS45LDkuNXoiLz4KCTwvZz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMzdfIiBjeD0iLTYzMDAuMDcxMyIgY3k9IjMxODQuNDk5MyIgcj0iNi44Njg3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjE3OTYgLTYuODIyNTU0ZS0wMyAtMS4zOTA2NjJlLTAyIDAuMTY1NiAtMTA2MS43Nzg2IC01NTIuMjIzMykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4LjEzMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNERTdGMTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjMzODkiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQTdEMTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU5OTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNDRTc2MEQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg2MDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTZDMDUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0FENjUwMCIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGlkPSJYTUxJRF8xM18iIGNsYXNzPSJzdDIyIiBkPSJNMjYuMSwxOC41Yy0wLjEsMC42LTAuNiwxLjEtMS4zLDFjLTAuNy0wLjEtMS4yLTAuNi0xLjItMS4zYzAuMS0wLjYsMC42LTEuMSwxLjMtMQoJCUMyNS43LDE3LjMsMjYuMiwxNy45LDI2LjEsMTguNXoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iU1ZHSURfNV8iIGN4PSItNjMxOS4zMDAzIiBjeT0iMzE1My4wMDk1IiByPSIxNC4xMzIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0wLjE3OTYgLTYuODIyNTU0ZS0wMyAtMS4zOTA2NjJlLTAyIDAuMTY1NiAtMTA2MS43Nzg2IC01NTIuMjIzMykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4LjEzMDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNERTdGMTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjMzODkiIHN0eWxlPSJzdG9wLWNvbG9yOiNEQTdEMTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjU5OTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNDRTc2MEQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjg2MDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTZDMDUiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjk4NyIgc3R5bGU9InN0b3AtY29sb3I6I0FENjUwMCIvPgoJPC9yYWRpYWxHcmFkaWVudD4KCTxwYXRoIGNsYXNzPSJzdDIzIiBkPSJNMjYuMywxMy43Yy0wLjEsMC44LDAuNiwxLjUsMS41LDEuNmMwLjgsMC4xLDEuNS0wLjQsMS43LTEuMWgtMC4xaC0wLjFoMC4yYzAtMC4xLDAtMC4xLDAtMC4yCgkJYzAuMS0wLjYtMC42LTEuMy0xLjUtMS4zYy0wLjgtMC4xLTEuNCwwLjItMS43LDAuN0MyNi4zLDEzLjUsMjYuMywxMy42LDI2LjMsMTMuN3oiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMzhfIiBjeD0iLTI4OTUuMTQ2NyIgY3k9IjcyMzAuOTM4NSIgcj0iNy4xMDIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMTM5NSAwLjEwOTUgOS4zMzg2MjdlLTAyIDAuMTAxOSAtMTA0OS4wOTQyIC00MDkuMzQ3OCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KCQk8c3RvcCAgb2Zmc2V0PSI4Ljc1MDAwMGUtMDIiIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTk5MTQiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjQwOTgiIHN0eWxlPSJzdG9wLWNvbG9yOiNENTk2MTIiLz4KCQk8c3RvcCAgb2Zmc2V0PSIwLjczNSIgc3R5bGU9InN0b3AtY29sb3I6I0M5OEQwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQkE4MjA3Ii8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzEyXyIgY2xhc3M9InN0MjQiIGQ9Ik0zMC4zLDExLjJjMCwwLjMtMC40LDAuNC0wLjksMC40cy0wLjgtMC40LTAuOC0wLjZzMC40LTAuNCwwLjktMC40CgkJQzMwLDEwLjYsMzAuMywxMC45LDMwLjMsMTEuMnoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iWE1MSURfMzlfIiBjeD0iLTYzMzQuNDI1OCIgY3k9IjMxODEuNDYzNCIgcj0iMTUuNjcyNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMC4xNzk2IC02LjgyMjU1NGUtMDMgLTEuMzkwNjYyZS0wMiAwLjE2NTYgLTEwNjEuNzc4NiAtNTUyLjIyMzMpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CgkJPHN0b3AgIG9mZnNldD0iOC4xMzAwMDBlLTAyIiBzdHlsZT0ic3RvcC1jb2xvcjojREU3RjE0Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC4zMzg5IiBzdHlsZT0ic3RvcC1jb2xvcjojREE3RDEyIi8+CgkJPHN0b3AgIG9mZnNldD0iMC41OTkzIiBzdHlsZT0ic3RvcC1jb2xvcjojQ0U3NjBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC44NjAyIiBzdHlsZT0ic3RvcC1jb2xvcjojQkE2QzA1Ii8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNBRDY1MDAiLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfMTFfIiBjbGFzcz0ic3QyNSIgZD0iTTMzLjIsMTguNWMtMC4xLDEuMS0xLjEsMS44LTIuMiwxLjZzLTIuMS0xLjEtMi0yLjJjMC4xLTEuMSwxLjEtMS44LDIuMi0xLjYKCQlDMzIuNCwxNi42LDMzLjMsMTcuNSwzMy4yLDE4LjV6Ii8+CgkKCQk8cmFkaWFsR3JhZGllbnQgaWQ9IlhNTElEXzQwXyIgY3g9Ii02MzMxLjIzNDQiIGN5PSIzMTQ4LjIxNzMiIHI9IjEwLjkxMTgiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMTc5NiAtNi44MjI1NTRlLTAzIC0xLjM5MDY2MmUtMDIgMC4xNjU2IC0xMDYxLjc3ODYgLTU1Mi4yMjMzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguNzUwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0Q5OTkxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNDA5OCIgc3R5bGU9InN0b3AtY29sb3I6I0Q1OTYxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNzM1IiBzdHlsZT0ic3RvcC1jb2xvcjojQzk4RDBEIi8+CgkJPHN0b3AgIG9mZnNldD0iMC45ODciIHN0eWxlPSJzdG9wLWNvbG9yOiNCQTgyMDciLz4KCTwvcmFkaWFsR3JhZGllbnQ+Cgk8cGF0aCBpZD0iWE1MSURfMTBfIiBjbGFzcz0ic3QyNiIgZD0iTTMzLjksMTMuMmMwLDAuNC0wLjYsMC42LTEuMywwLjVjLTAuNi0wLjEtMS4yLTAuNC0xLjItMC45YzAtMC40LDAuNi0wLjYsMS4zLTAuNQoJCVMzMy45LDEyLjksMzMuOSwxMy4yeiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF80MV8iIGN4PSItNjM1Ny4xNzYzIiBjeT0iMzE5Ni44MTkzIiByPSI1LjkyODUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMTc5NiAtNi44MjI1NTRlLTAzIC0xLjM5MDY2MmUtMDIgMC4xNjU2IC0xMDYxLjc3ODYgLTU1Mi4yMjMzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzlfIiBjbGFzcz0ic3QyNyIgZD0iTTM2LDIwLjljMCwwLjUtMC41LDAuOS0xLjIsMC44Yy0wLjYtMC4xLTEuMS0wLjUtMS0xLjFjMC0wLjUsMC41LTAuOSwxLjItMC44CgkJQzM1LjYsMTkuOSwzNi4xLDIwLjMsMzYsMjAuOXoiLz4KCQoJCTxyYWRpYWxHcmFkaWVudCBpZD0iU1ZHSURfNl8iIGN4PSItNjM2MS42ODE2IiBjeT0iMzE2Ny4wODY3IiByPSI4Ljg0MDgiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMTc5NiAtNi44MjI1NTRlLTAzIC0xLjM5MDY2MmUtMDIgMC4xNjU2IC0xMDYxLjc3ODYgLTU1Mi4yMjMzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguNjAwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0M3NzMxNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzc3NCIgc3R5bGU9InN0b3AtY29sb3I6I0MzNzExMyIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNjcxOCIgc3R5bGU9InN0b3AtY29sb3I6I0I3NkMwRiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTY2OSIgc3R5bGU9InN0b3AtY29sb3I6I0EzNjQwNyIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQTE2MzA2Ii8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggY2xhc3M9InN0MjgiIGQ9Ik0zNS41LDE2LjFjMCwwLjQsMC4zLDAuNywwLjcsMC44YzAuNCwwLjEsMC44LTAuMiwwLjktMC41di0wLjFsMCwwYzAtMC4zLTAuNC0wLjUtMC43LTAuNQoJCWMtMC40LDAtMC42LDAtMC43LDAuMmwwLDBDMzUuNiwxNS45LDM1LjUsMTYsMzUuNSwxNi4xeiIvPgoJCgkJPHJhZGlhbEdyYWRpZW50IGlkPSJYTUxJRF80Ml8iIGN4PSItNjM3NC4wOTMzIiBjeT0iMzE4NS45NTI0IiByPSI0LjM5ODUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTAuMTc5NiAtNi44MjI1NTRlLTAzIC0xLjM5MDY2MmUtMDIgMC4xNjU2IC0xMDYxLjc3ODYgLTU1Mi4yMjMzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgoJCTxzdG9wICBvZmZzZXQ9IjguMTMwMDAwZS0wMiIgc3R5bGU9InN0b3AtY29sb3I6I0RFN0YxNCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuMzM4OSIgc3R5bGU9InN0b3AtY29sb3I6I0RBN0QxMiIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuNTk5MyIgc3R5bGU9InN0b3AtY29sb3I6I0NFNzYwRCIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuODYwMiIgc3R5bGU9InN0b3AtY29sb3I6I0JBNkMwNSIvPgoJCTxzdG9wICBvZmZzZXQ9IjAuOTg3IiBzdHlsZT0ic3RvcC1jb2xvcjojQUQ2NTAwIi8+Cgk8L3JhZGlhbEdyYWRpZW50PgoJPHBhdGggaWQ9IlhNTElEXzhfIiBjbGFzcz0ic3QyOSIgZD0iTTM4LjksMTkuMWMwLDAuMy0wLjMsMC40LTAuNiwwLjRjLTAuNCwwLTAuNS0wLjMtMC41LTAuNnMwLjMtMC40LDAuNi0wLjQKCQlDMzguNywxOC41LDM4LjksMTguOCwzOC45LDE5LjF6Ii8+CjwvZz4KPC9zdmc+Cg==',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'token.cheddar.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Pulse',
    symbol: 'PULSE',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNi41NTAzNSAxOS4xMjM5TDkuMTcxNjYgMTQuOTQ5MkM5LjMyNzMxIDE0LjcwMTMgOS41OTk0OCAxNC41NTA4IDkuODkyMiAxNC41NTA4SDE4LjQxNEMxOS41NDEyIDE0LjU1MDggMjAuNTYxNCAxMy44ODM2IDIxLjAxMzMgMTIuODUwOUMyMS4zNjQ3IDEyLjA0NzYgMjAuNzc2MSAxMS4xNDc3IDE5Ljg5OTMgMTEuMTQ3N0gxMS45NzQyTDExLjU0ODggMTEuMjU0TDEzLjY0NjEgNy40NDA3OEMxMy43OTU2IDcuMTY4OTEgMTQuMDgxMyA3IDE0LjM5MTUgN0gyMi4wNzU0QzI1LjA1NDMgNyAyNy4xMTA3IDkuOTgyNzkgMjYuMDUxMyAxMi43NjdMMjUuODYzMSAxMy4yNjEzQzI0LjU0NDQgMTYuNzI2OSAyMS4yMjE4IDE5LjAxNzYgMTcuNTEzOCAxOS4wMTc2SDYuOTc1NzVMNi41NTAzNSAxOS4xMjM5Wk04LjM2ODg0IDE5Ljk3NDdDNy4wNTA0MiAxOS45NzQ3IDUuODM2NTUgMjAuNjkyNSA1LjIwMTE4IDIxLjg0NzdDNC42MTIyMyAyMi45MTg1IDUuMzg2OTQgMjQuMjI4NyA2LjYwOTAzIDI0LjIyODdIMTAuODA0NEwxMy40NjMxIDE5Ljg2ODRMMTMuMTQ0MSAxOS45NzQ3SDguMzY4ODRaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjBfMykiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8yMF8zIiB4MT0iMTguMDI2NiIgeTE9IjUuNTI5MjYiIHgyPSIyLjI2ODYxIiB5Mj0iMzAuMTExNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjREQ1OUZGIi8+CjxzdG9wIG9mZnNldD0iMC40NzM5NTgiIHN0b3AtY29sb3I9IiM1MDY5RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAyNUZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '52a047ee205701895ee06a375492490ec9c597ce.factory.bridge.near'
  }, {
    decimals: 18,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAs3SURBVHhe7Z1XqBQ9FMdFsYu999577wUfbCiiPoggFkQsCKJP9t57V7AgimLBjg8qKmLBXrD33hVUEAQ1H7+QXMb9Zndnd+/MJJf7h8Pu3c3Mzua3yTk5SeZmEZkySplADFMmEMOUCcQwZQggHz58EHfu3FF/2a0MAWTjxo2iWbNm6i+7ZT2QW7duiUWLFolixYqJQ4cOqVftlfVAZs6cKdauXSuqV68uKlWqpF61V1YDoUXMmTNHrFu3TtSoUUNCmTBhgnrXTlkL5Nu3b2Ly5MmyuwJIzZo1RaNGjUTx4sXFu3fvVCn7ZC2QVatWiQULFvwPSL169USnTp1UKftkJZCbN2+KGTNmSBiLFy/+BwhWoUIFsX//flXaLlkJZPr06WkwIoE0btxYNGzYUFSsWFGVtkvWATlw4IB05BqGGxAMBz9u3Dh1lD2yCsjXr1/THHk8IDwvVaqUeP36tTraDlkFZOXKldKRO2HEAoKD79ixozraDlkD5Pr16/848nhANBQc/N69e9VZzJc1QCIduRcgGA4eKLbICiD79u37nyN3WiwgvMZ7Y8eOVWczW8YDwZFPmTIlauvA4gHhsUSJEuLFixfqrObKeCArVqxwdeROiwUE43UcfNu2bdVZzZXRQK5duyYduRsEp8UDog1fsnPnTnV2M2U0kFiO3GlegeDgy5cvr85upowFQqg6d+5cVwCR5hUI71NuzJgx6lPMk5FAPn365Doij2ZegWCUIUX/9OlT9WlmyUggy5Yti+vInZYIEAwH37JlS/VpZsk4IJcvX5bTsl5bB5YoEMqRDd62bZv6VHNkHJBp06YlBANLFAiGgy9btqz6VHNkFJBdu3Z5duROSwYIxjEjRoxQn26GjAHy8ePHuCPyaJYsEMozgn/48KG6ivBlDJAlS5Yk5MidlgqQ+vXri+bNm6urCF9GALl48aJ05G6V7cWSBYJxDOu5Nm/erK4mXBkBJBlH7rRUgGAmOfjQgZBbSsaROy1VIBjHDxs2TF1VeAoVyPv37+WI3K2SE7H0AMKxJUuWFHfv3lVXF45CBZKKI3daegDBcPBNmzZVVxeOQgNy/vz5hEfkbsbxAGFtb6pAOL5y5cpye0NYCg1Iqo5c29KlS2WEVKdOHdGkSZOUoeDgS5cura4yeIUCZMeOHWLevHkpASEBScvAB/Xs2VMUKVJE1K1bV44pUgHDcbVq1RJDhgxRVxusAgfy5s0bMXXq1IRgOMsuX75c7gcZP368aN++vez3W7VqJfLnzy8KFCggU+tUKNncZMFwDA6eNcRBK3AgCxculOas8HiG82duffXq1WLkyJGiRYsWokGDBrI1UPHMlQOjaNGisqUUKlRIPrKclLKA0RUdWfnRDNCUD1qBAjl79qyYNWuWa6VHGq0CEGw7oHsaNGiQrCBMg9DmBKJNgylYsKAciQOFfYhUtlcwHEe3GKQCA/Lnzx/PyUMc9Zo1a+SAsV+/fvLXSgXxa3eCiAXECaZw4cISDPPpGijniweG93HwXHtQCgwIk0E4cjcAGhItAf8AuG7dukknzbgAENFgYLGAaNNgKMcibGYNdXdGxUeDgz8aOHCg+hb+KxAgr169kpUcCUKb01GzOJrKonuJB0KbFyBOAw4thgCgdu3aaWAA4AYGB8/a4iAUCBBG405Hrv2Dm6MGhFulx7JEgWjTYHisVq2a/GxapBMGgLguLAj5DuTMmTP/OHLtqPETdAW6u4h01IlYskC06e6MIICROlA0GH19vM51+y1fgfz+/TvNkWtHjR/p27ev7JboJrx2S7EsVSAYUDCgcC4CAEbtXJsGg4PnO/kpX4Fs3bpVwiB0BEz37t09O+pELD2AOE23GM5ZpkwZGeVxraRnBgwYoL6dP/INCCNyfAeOukOHDmmZVLcKTdXSG4jTNBidAaDlXLlyRX3L9JdvQPr06SObvHbU6dUa3MxPINp0d5Y3b16RJ08e9S3TX74Befz4sejcubOoWrWqdNi2AgEEj8DIkiWLdO4PHjxQ3zL95asPQQcPHpSTR/gOv6D4BUQ7+uzZs4usWbOK7du3q2/ln3wHosU+j3LlysmIxa1SUzG/gOTLl0+2ilGjRqlv4b8CA4K+fPkievXqJZt9MgPAaJbeQHT3hA9kJX6QChSI1smTJ+U4RKct3Co5EUsvIHRP2bJlEzlz5hRHjhxRVxusfANy4cIF9Sy6GLnrAZhbRXu1VIEAguiJVuHlfltbtmxRz9JfvgHhxpQMBt++fatecdfPnz/lYIvtAcmOU1IBQi4LEG3atJHXEkssEWK0fvv2bfVK+svXLosJKW4AQ3QSb07h6tWr0uEz+Eq0G0sGCAM+IieOI98WS3///hVDhw4VOXLkkAlRP+W7D9mwYYNMLtJa4n1xRBqe3bIMKL2CSQQI3VPu3Lllq+C64olsNPMnBCJdunRRr/qnQJw6IS/pdypg/vz5cff38YscPny49C9eujGvQCgDiB49eqhPii4WgJPuAQQ+Lqi1v4EAefToUVrWFzCsyWIx2q9fv1QJd92/f1+0bt1aLlaINdqPB4TuCRD80rmtbCzhR8hG66SizvKeOHFClfBXgQBBe/bskfcr0dO1pOFZU3Xs2DFVIrqY/q1SpUpa1tUrELqnXLlySRhe5jKYw2d2kHBcz4OwIjLIXVaBAUF0V5Ezh7Nnz5Z27949VSq6CBDoOphHiQYECDyyTgsQ/fv3V0dH1/Hjx2V6h7wbEAguMH4ABBlBKlAgbneE090Yd21Yv369+P79uyrtrpcvX/6TtIwEorsnlvA8efJEHeUuRuFdu3aVKR2CCCcMnpNyf/78uSodjAIFgk6fPh11txQtCGBebhlO0pLuhKSlBkISEBhMjMXTxIkTZYVzvBOEhgFQriloBQ4EEUrGWhKEryEyu3HjhjoiuggWqDxAeOnrufcW5QkUIkFoGEBiUi0MhQKEeel4q995DyjcZ/Hz58/qSHfRrcTbSUuZdu3ayTEOYawbDIz3iLDiRYB+KRQgiP/3waJrNxjagMI0MK2AKC1ZjR49Wm5/JqEZDQTGe8A4fPiwOjJ4hQYEsS3By/5CwFCOVsWAzatIAhKVed3MQznWEIepUIEg/IUzFI5lgCEgYG1XrKQlyT9CY3wFXZBb5UcaURZ+JWyFDoSs8KRJk2L6E6dRDoB0YyQtneukSGAOHjxYDu70KNut8iONckRcJvzbpNCBIAZmXrcpYBoekRpgyBQzhiE1wkDOKwiMsuSr6BJNkBFAENEU45DIyo9nwGGxNs44ERAY5QlxmQsxRcYAIcxMdKubtmS3RVOe7u3Hjx/qKsKXMUAQA0EiKbdKj2XJAiEC2717t/p0M2QUEETaw0so7LREgVCO8l4Sj0HLOCAIB+81FMYSAUIZQmGSkybKSCAs1I7MCseyRIEwaveSJwtDRgJBR48e9RwKewXC+0x0AdtUGQsEMSL3cnMaL0B4j1wWc/Qmy2ggzG/ruXg3ENq8AmHgyCSZyTIaCLp06VLce8DHA8LrrGDxMnEVtowHgjZt2hR1QguLB4R0Su/evdXZzJYVQJBe25UoELK4Nv1PQ2uAPHv2LKo/iQaEv0mNeFn4bYqsAYL4p5IsGfIChOfMb7Dp1CZZBQTRQiJDYTcgerrWNlkHhHVbkV1XJBAemXDirqe2yTog6Ny5c9LJayhOIBgrS1h1b6OsBIKocB0KO4FwtwVu7WSrrAWC9NouDYQsLstCbZbVQNjmwCwjQFjCwzTuqVOn1Lt2ymogiBk/PafOfbdsl/VAEEBs+gfEsZQhgDChxVKgjKAMASQjKROIYcoEYpgygRglIf4D6lp/+XognSwAAAAASUVORK5CYII=',
    name: 'Ether',
    reference: null,
    reference_hash: null,
    spec: 'ft-1.0.0',
    symbol: 'ETH',
    id: 'aurora'
  }, {
    spec: 'ft-1.0.0',
    name: 'Pixeltoken',
    symbol: 'PXT',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANdJREFUWIXll70RwjAMhWUuNGwARVgEmuyQJRgo7AA7uGESGioaGlpTcK+w7nR+gcIyfJ1zys/7dHKSsO53SSqyqHlzEZFu7gm364Wq22z3VF07BpB8CANXn971JRP+Dejk8fSgLoz6kgm/Btjk58MqW4/TM6svmfBrQIOkSAiO92W2Hmc+gF8D6BV6h17qhOxUWPg18C16OizaN2AlxXTEFEWkxZ2QRe8DoJQctG8AIDH4vS8iFjY5aM8Au8Ox+DdgvRUBO+8W/g0AbUIf/5TqBsLf/x2/ADJHSOenTxC2AAAAAElFTkSuQmCC',
    reference: '',
    reference_hash: '',
    decimals: 6,
    id: 'pixeltoken.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Debio',
    symbol: 'DBIO',
    icon: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIxOTAgOTcgNDIwIDQyMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODAwIDgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48c3R5bGU+LnN0MHtmaWxsOiMzNjM2MzZ9LnN0M3tmaWxsOiNmZjU2ZTB9PC9zdHlsZT48L2RlZnM+PGNpcmNsZSBjbGFzcz0ic3QzIiBjeD0iNDAwIiBjeT0iMzA3LjM5IiByPSIyMDguNTgiLz48cGF0aCBkPSJNNDczLjk5IDIxMS4zczIuMzQgNTYuMjUtNzcuMzQgOTguNDMtNzAuMzEgOTMuNzQtNzAuMzEgOTMuNzQiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNlNmU2ZTY7c3Ryb2tlLXdpZHRoOjM3LjQ5NzU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTAiLz48cGF0aCBkPSJNMzI2LjAxIDIxMS4zcy0yLjM0IDU2LjI1IDc3LjM0IDk4LjQzIDcwLjMxIDkzLjc0IDcwLjMxIDkzLjc0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS13aWR0aDozNy40OTc1O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjEwIi8+PGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iNDAwIiBjeT0iMjE2LjQyIiByPSIyMC40OSIvPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjQwMCIgY3k9IjM5OC4zNiIgcj0iMjAuNDkiLz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzYuMzQyIDY1OC4wNzUpIiBjbGFzcz0ic3QzIiBzdHlsZT0id2hpdGUtc3BhY2U6cHJlO2ZvbnQtc2l6ZToxMTIuNDkyNXB4O2ZvbnQtZmFtaWx5OidBcnRlZ3JhU2Fucy1TZW1pQm9sZCciPkRlQmlvPC90ZXh0Pjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'dbio.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Aurora',
    symbol: 'AURORA',
    icon: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 288 288' style='enable-background:new 0 0 288 288;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .st0%7Bfill:%2370D44B;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E %3Cpath class='st0' d='M144,0L144,0c79.5,0,144,64.5,144,144v0c0,79.5-64.5,144-144,144h0C64.5,288,0,223.5,0,144v0 C0,64.5,64.5,0,144,0z'/%3E %3Cpath class='st1' d='M144,58.8c7.6,0,14.5,4.3,17.9,11.1l56.2,112.5c4.9,9.9,0.9,21.9-9,26.8c-2.8,1.4-5.8,2.1-8.9,2.1H87.8 c-11,0-20-9-20-20c0-3.1,0.7-6.2,2.1-8.9l56.2-112.5C129.5,63,136.4,58.7,144,58.8 M144,45c-12.8,0-24.5,7.2-30.2,18.7L57.6,176.2 c-8.3,16.7-1.6,36.9,15.1,45.3c4.7,2.3,9.9,3.6,15.1,3.6h112.5c18.6,0,33.8-15.1,33.8-33.7c0-5.2-1.2-10.4-3.6-15.1L174.2,63.7 C168.5,52.2,156.8,45,144,45z'/%3E %3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: 'aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Meta Token',
    symbol: '$META',
    icon: "data:image/svg+xml,%3csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='96' height='96' rx='48' fill='white'/%3e%3cpath d='M29.2241 28.7456C28.396 27.9423 27.0094 28.5289 27.0091 29.6825L27 66.6773C26.9997 67.8501 28.4257 68.4286 29.2426 67.5872L48.6529 47.5943L29.2241 28.7456Z' fill='%23231B51'/%3e%3cpath d='M66.7759 28.7456C67.604 27.9423 68.9906 28.5289 68.9909 29.6825L69 66.6773C69.0003 67.8501 67.5743 68.4286 66.7574 67.5872L47.3471 47.5943L66.7759 28.7456Z' fill='%23231B51'/%3e%3c/svg%3e",
    reference: 'https://metapool.app',
    reference_hash: null,
    decimals: 24,
    id: 'meta-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Potato ð¥',
    symbol: 'POTATO',
    icon: 'data:image/jpeg;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'v1.dacha-finance.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Flux Token',
    symbol: 'FLX',
    icon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='140px' height='140px' viewBox='0 0 140 140' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EFlux Logo New%3C/title%3E%3Cdefs%3E%3CradialGradient cx='50%25' cy='0%25' fx='50%25' fy='0%25' r='248.533062%25' gradientTransform='translate(0.500000,0.000000),scale(1.000000,0.393939),rotate(90.000000),translate(-0.500000,-0.000000)' id='radialGradient-1'%3E%3Cstop stop-color='%23FE84FC' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%232ED1FF' offset='100%25'%3E%3C/stop%3E%3C/radialGradient%3E%3C/defs%3E%3Cg id='logos' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group' transform='translate(-143.000000, -251.000000)'%3E%3Cg id='Group-2' transform='translate(0.000000, 251.000000)'%3E%3Cg id='Flux-Logo' transform='translate(143.000000, 0.000000)'%3E%3Cg id='Flux-Logo-New' transform='translate(70.000000, 70.000000) rotate(90.000000) translate(-70.000000, -70.000000) '%3E%3Ccircle id='Oval' fill='%23FFFFFF' cx='70' cy='70' r='70'%3E%3C/circle%3E%3Crect id='Rectangle' fill='%230F0E25' transform='translate(70.000000, 83.000000) rotate(90.000000) translate(-70.000000, -83.000000) ' x='57' y='50' width='26' height='66' rx='13'%3E%3C/rect%3E%3Cpath d='M50,30 C57.1797017,30 63,35.8202983 63,43 L63,96 L63,96 L50,96 C42.8202983,96 37,90.1797017 37,83 L37,43 C37,35.8202983 42.8202983,30 50,30 Z' id='Rectangle' fill='%230F0E25'%3E%3C/path%3E%3Cpath d='M63,44 L76,44 C83.1797017,44 89,49.8202983 89,57 L89,97 C89,104.179702 83.1797017,110 76,110 C68.8202983,110 63,104.179702 63,97 L63,44 L63,44 Z' id='Rectangle' fill='url(%23radialGradient-1)'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '3ea8ea4237344c9931214796d9417af1a1180770.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'nUSDO',
    symbol: 'nUSDO',
    icon: 'data:image/png;base64,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',
    reference: '',
    reference_hash: '',
    decimals: 8,
    id: 'v3.oin_finance.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'oinfinance',
    symbol: 'OIN',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 974.66 974.66'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bisolation:isolate;%7D.cls-2%7Bfill:%235a8dff;%7D.cls-3%7Bfill:%23fff;%7D.cls-4,.cls-5%7Bfill:%231b57f6;%7D.cls-5%7Bmix-blend-mode:multiply;%7D%3C/style%3E%3C/defs%3E%3Cg class='cls-1'%3E%3Cg id='å¾å±_1' data-name='å¾å± 1'%3E%3Ccircle class='cls-2' cx='487.33' cy='484.76' r='473.82'/%3E%3Ccircle class='cls-3' cx='487.33' cy='484.76' r='358.99'/%3E%3Cpath class='cls-4' d='M487.33,98.08c-213.55,0-386.67,173.12-386.67,386.68S273.78,871.43,487.33,871.43,874,698.31,874,484.76,700.88,98.08,487.33,98.08ZM368.59,297.83a9,9,0,0,1,12.71-.14,287,287,0,0,0,137.53,75,110.56,110.56,0,0,1,51.78,28.2,9,9,0,0,1-12.49,12.93,92.54,92.54,0,0,0-43.3-23.61,304.9,304.9,0,0,1-146.09-79.66A9,9,0,0,1,368.59,297.83Zm216.7,197.36a9,9,0,0,1,17.93,1.3c-1.86,25.6-15.92,49.6-38.58,65.86-18.31,13.13-40.08,19.87-63.28,19.87a130.41,130.41,0,0,1-32.7-4.3,9,9,0,0,1,4.52-17.4c29.91,7.76,58.67,3.23,81-12.78C572.48,534.61,583.82,515.45,585.29,495.19Zm-9.7-47.57a15.39,15.39,0,1,1,12.8,17.6A15.39,15.39,0,0,1,575.59,447.62Zm-244-118.07a9,9,0,0,1,12.71,0,335.48,335.48,0,0,0,163.36,90.53c30.07,6.9,50.7,33.19,48,61.16-1.64,17.07-9.08,30.42-21.52,38.59-8.23,5.41-18.1,8.14-28.9,8.14a76.36,76.36,0,0,1-23.39-3.91,9,9,0,1,1,5.52-17.1c14.54,4.69,27.64,3.93,36.9-2.15,7.73-5.08,12.39-13.82,13.49-25.29,2-20.88-15.76-37.71-34.1-41.92a353.42,353.42,0,0,1-172.1-95.35A9,9,0,0,1,331.59,329.55Zm-30,41.34a9,9,0,0,1,12.71-.23c36.29,35,81.18,62.68,133.43,82.22a9,9,0,0,1-3.15,17.41,8.89,8.89,0,0,1-3.14-.58c-54.58-20.41-101.55-49.38-139.62-86.11A9,9,0,0,1,301.56,370.89ZM452.39,512.8a15.39,15.39,0,1,1-12.8-17.6A15.38,15.38,0,0,1,452.39,512.8ZM278.9,429.48a9,9,0,0,1,12.54-2.07c38.33,27.47,67.76,43.32,105.66,61.43a9,9,0,1,1-7.75,16.21c-38.8-18.53-69-34.79-108.38-63A9,9,0,0,1,278.9,429.48Zm-4.46,60.34A9,9,0,0,1,287,487.67c45.31,32,91.6,55,137.57,68.37a9,9,0,0,1-2.5,17.62,8.76,8.76,0,0,1-2.51-.36c-47.9-13.9-96-37.78-142.94-70.95A9,9,0,0,1,274.44,489.82Zm18.28,73.95a9,9,0,0,1,12.38-2.89c44.19,27.46,93.91,45,123.06,51.75,27.43,6.32,56.78,9,65.69,9,77.91,0,141.29-63.38,141.29-141.29,0-65.78-46.6-123.81-110.81-138L516,340.57l0-.24a257.48,257.48,0,0,1-100.58-53,9,9,0,1,1,11.69-13.66A239.17,239.17,0,0,0,528.3,324.87l8.22,1.9,0,.16c68.06,19,116.62,82.18,116.62,153.46,0,87.82-71.45,159.27-159.27,159.27-9.61,0-40.9-2.87-69.72-9.51-30.5-7-82.46-25.38-128.52-54A9,9,0,0,1,292.72,563.77ZM493.85,688.36l-9-.07c-5.35-.12-10.74-.42-16.1-.9a302.94,302.94,0,0,1-109.22-31.85,9,9,0,1,1,8.2-16,284.85,284.85,0,0,0,102.64,29.94,225.63,225.63,0,0,0,23.34.87l7.29-.11c101.46-3.78,182.84-87.49,182.84-189.86,0-89.16-63.2-167.31-150.26-185.83l-.12,0-.11,0a206.73,206.73,0,0,1-49.14-18.68A9,9,0,0,1,492.69,260,188.85,188.85,0,0,0,537.56,277h0c95.18,20.37,164.23,105.85,164.23,203.35C701.82,595.07,608.53,688.36,493.85,688.36Z'/%3E%3Cpath class='cls-5' d='M144.68,484.76c0-206.19,161.39-374.67,364.73-386-7.27-.41-14.58-.64-21.94-.64-213.56,0-386.68,173.12-386.68,386.68S273.91,871.43,487.47,871.43c7.36,0,14.67-.23,21.94-.64C306.07,859.42,144.68,690.94,144.68,484.76Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 8,
    id: '9aeb50f542050172359a0e1a25a9933bc8c01259.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Myria',
    symbol: 'MYRIA',
    icon: 'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNjAwIj48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtLjEzKSI+PHBhdGggc3R5bGU9ImZpbGw6bm9uZSIgZD0iTTAgMGg2MDB2NjAwSDB6Ii8+PC9jbGlwUGF0aD48c3R5bGU+LmNscy00e2ZpbGw6I2ZmZn08L3N0eWxlPjwvZGVmcz48ZyBzdHlsZT0iY2xpcC1wYXRoOnVybCgjY2xpcC1wYXRoKSI+PHBhdGggZD0iTTYwMCAzMDAuMTNjMCAxNjUuNjktMTM0LjMxIDMwMC0zMDAgMzAwUzAgNDY1LjgxIDAgMzAwLjEzIDEzNC4zMS4xMyAzMDAgLjEzczMwMCAxMzQuMzEgMzAwIDMwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtLjEzKSIgc3R5bGU9ImZpbGw6Izg2MmFlOSIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTQ3MS4xMSA0MjEuMjFhMTcuNzUgMTcuNzUgMCAwIDAgMi4wNy04IDcuMjQgNy4yNCAwIDAgMCAwLTEuMVYyNjMuNDdhOTUuMzYgOTUuMzYgMCAwIDAtMTQyLjYxLTgxLjcybC0xLjQ5Ljg1LTEyNi42NCA3My4xMi0xLjExLjY1YTE4LjE4IDE4LjE4IDAgMCAwLTUuNzcgNS43NWMtLjE1LjIxLS4yNi40MS0uMzkuNjNhMTguMzMgMTguMzMgMCAwIDAgNi43MSAyNWwyNDMuODQgMTQwLjgzYTE4LjMzIDE4LjMzIDAgMCAwIDI1LTYuNzFjLjEzLS4yMi4yNC0uNDIuMzUtLjY1TTIxMi41NCAyNzEuOTNsMTQuNzQtOC41MyA2Mi44NC0zNi4yNiA0OS4zOC0yOC41MSAxLjYtLjkxYTc2LjM0IDc2LjM0IDAgMCAxIDExMyA2NS4yNnYxNDguNDNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0uMTMpIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTI4Ljg5IDQyMS4yMWExNy43NyAxNy43NyAwIDAgMS0yLjA4LTggNy41IDcuNSAwIDAgMSAwLTEuMVYyNjMuNDdhOTUuMzYgOTUuMzYgMCAwIDEgMTQyLjYxLTgxLjcybDEuNDkuODUgMTI2LjY1IDczLjExIDEuMTEuNjVhMTguMTcgMTguMTcgMCAwIDEgNS43NyA1Ljc1Yy4xNS4yMS4yNi40MS4zOS42M2ExOC4zMyAxOC4zMyAwIDAgMS02LjcxIDI1TDE1NC4yOCA0MjguNThhMTguMzMgMTguMzMgMCAwIDEtMjUtNi43MWMtLjEzLS4yMi0uMjQtLjQyLS4zNS0uNjVtMjU4LjUzLTE0OS4yOS0xNC43NC04LjUzLTYyLjgzLTM2LjI2LTQ5LjM5LTI4LjUyLTEuNi0uOTFhNzYuMzQgNzYuMzQgMCAwIDAtMTEzIDY1LjI2djE0OC40NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLS4xMykiLz48L2c+PC9zdmc+',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'myriadcore.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'xRef Finance Token',
    symbol: 'xREF',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNjIiIHZpZXdCb3g9IjAgMCA1NiA2MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEuODU2OTMgMTcuODg1NkMxLjg1NjkzIDE2LjAyNzggMi44ODY5MiAxNC4zMjMyIDQuNTMxNTEgMTMuNDU5MkwyNS45MjE2IDIuMjIxNzJDMjcuMzc3NSAxLjQ1NjgzIDI5LjExNjUgMS40NTY4MyAzMC41NzI0IDIuMjIxNzJMNTEuOTYyNCAxMy40NTkyQzUzLjYwNyAxNC4zMjMyIDU0LjYzNyAxNi4wMjc4IDU0LjYzNyAxNy44ODU2VjQ1LjYzMDRDNTQuNjM3IDQ3LjYwMjEgNTMuNDc4MiA0OS4zODk4IDUxLjY3ODMgNTAuMTk0N0wzMC4yODgyIDU5Ljc2MDZDMjguOTg5NCA2MC4zNDE0IDI3LjUwNDYgNjAuMzQxNSAyNi4yMDU3IDU5Ljc2MDZMNC44MTU3IDUwLjE5NDdDMy4wMTU3NCA0OS4zODk4IDEuODU2OTMgNDcuNjAyMSAxLjg1NjkzIDQ1LjYzMDRMMS44NTY5MyAxNy44ODU2WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzEyNDYxXzIwNzUpIiBzdHJva2U9IiMwMEM2QTIiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTMuNjk3OCAyMC4zMzJMMjguMjQ3MSAxNEwyOC4yMjAyIDMwLjU0MTdMMjAuMjgwMyAyMy43MTE2TDEyLjMxMzUgMzAuOTI5NVYyMi4zNjU0QzEyLjMxNTIgMjEuNDkyMiAxMi44NTM4IDIwLjY5OTMgMTMuNjk3OCAyMC4zMzJaIiBmaWxsPSIjMDBDNkEyIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMTQuMTAyMyA0Mi43NjQ1TDI4LjI0NzEgNDYuODYyNkwyOC4yMjAyIDM0LjU5NDRMMjAuMjc5NCAyNy45NDE0TDEyLjMxMzUgMzQuOTcyMlY0MC41Mjc0QzEyLjMxMzUgNDEuNTUxNSAxMy4wMzY3IDQyLjQ1NTkgMTQuMTAyMyA0Mi43NjQ1WiIgZmlsbD0iIzAwQzZBMiIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHBhdGggZD0iTTQzLjY0NDUgNDIuNzYzM0wyOC4yNzQ0IDQ2Ljg2MzJMMjguMjQ2OCAzNC41MTU3TDQzLjIyMSAyMi40NjQ4QzQzLjIyMSAyMi40NjQ4IDQ1Ljc5MyAyNC4zOTk2IDQ1LjAzNzMgMjcuODE5NkM0My43MDQ4IDMzLjg1MTEgMzUuMTc5NiAzNS45ODY5IDM1LjE3OTYgMzUuOTg2OUw0My45MDk2IDQxLjE1NjFDNDQuNjE1NSA0MS41NzggNDQuNDU1NCA0Mi41NDcgNDMuNjQ0NSA0Mi43NjMzWiIgZmlsbD0iIzQ1RkZERSIvPgo8cGF0aCBkPSJNMzguNTkwMyAxOC45NzkzTDI4LjI3MzQgMTRMMjguMjQ2OCAzMC40MzE1TDQwLjY5NSAyMC4zNTA5QzQwLjY5NSAyMC4zNTA5IDQwLjQyNzEgMjAuMDU5NyAzOS42OTAxIDE5LjU4MDVDMzkuNDI4OSAxOS40MTE0IDM4LjU5MDMgMTguOTc5MyAzOC41OTAzIDE4Ljk3OTNaIiBmaWxsPSIjNDVGRkRFIi8+CjxwYXRoIGQ9Ik00MC41NTEgMTYuMDEwMUw0Ni42NjAyIDE4LjI4MDVDNDYuOTY3NSAxOC4zOTQzIDQ3LjE2OCAxOC42NjU2IDQ3LjE2OCAxOC45NjVWMjMuMTIwN0M0Ny4xNjggMjMuNDM4OCA0Ni43MjYgMjMuNTgyMiA0Ni41MDQyIDIzLjMzNDNMNDAuMjU1MyAxNi4zNjg3QzQwLjA4OTMgMTYuMTgzMSA0MC4zMDYyIDE1LjkxODEgNDAuNTUxIDE2LjAxMDFaIiBmaWxsPSIjNDVGRkRFIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTI0NjFfMjA3NSIgeDE9IjI4LjI0NyIgeTE9IjEiIHgyPSIyOC4yNDciIHkyPSI2MC42NzM1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMTEzMjAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAxMzIwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'xtoken.ref-finance.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Solana',
    symbol: 'SOL',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI1MCIgeDI9IjUwIiB5MT0iMjciIHkyPSI3NCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTRlNmFkIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYTk2NGRlIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImIiPjxwYXRoIGQ9Im0wIDBoMTAwdjEwMGgtMTAweiIvPjwvY2xpcFBhdGg+PGcgY2xpcC1wYXRoPSJ1cmwoI2IpIj48cGF0aCBkPSJtNTAgMGM5Ljg4OTEgMCAxOS41NTYxIDIuOTMyNDUgMjcuNzc4NSA4LjQyNjUyIDguMjIyNSA1LjQ5NDA4IDE0LjYzMTEgMTMuMzAyOTggMTguNDE1NSAyMi40MzkyOHM0Ljc3NSAxOS4xODk3IDIuODQ1MyAyOC44ODg3Yy0xLjkyOTMgOS42OTkxLTYuNjkxMyAxOC42MDgyLTEzLjY4NCAyNS42MDA4LTYuOTkyNiA2Ljk5MjctMTUuOTAxNyAxMS43NTQ3LTI1LjYwMDggMTMuNjg0LTkuNjk5IDEuOTI5Ny0xOS43NTI0LjkzOTEtMjguODg4Ny0yLjg0NTNzLTE2Ljk0NTItMTAuMTkzLTIyLjQzOTI4LTE4LjQxNTVjLTUuNDk0MDctOC4yMjI0LTguNDI2NTItMTcuODg5NC04LjQyNjUyLTI3Ljc3ODUgMC0xMy4yNjA4IDUuMjY3ODQtMjUuOTc4NSAxNC42NDQ3LTM1LjM1NTMgOS4zNzY4LTkuMzc2ODYgMjIuMDk0NS0xNC42NDQ3IDM1LjM1NTMtMTQuNjQ0N3oiIGZpbGw9IiMwMDAiLz48ZyBmaWxsPSJ1cmwoI2EpIiBmaWxsLW9wYWNpdHk9Ii45MiI+PHBhdGggZD0ibTMwLjM4MDYgNjIuNzg4OWMuMzEzMS0uMzIzNC44MzQ5LS41MzkgMS4zNTY3LS41MzloNDYuMjMwN2MuODM0OSAwIDEuMjUyMyAxLjA3NzkuNjI2MiAxLjcyNDdsLTkuMTgzNiA5LjQ4NjRjLS4zMTMuMzIzNC0uODM0OC41MzktMS4zNTY2LjUzOWgtNDYuMTI2NGMtLjgzNDggMC0xLjI1MjItMS4wNzgtLjYyNjEtMS43MjQ4eiIvPjxwYXRoIGQ9Im0zMC4zODA2IDI3LjUzOWMuMzEzMS0uMzIzNC44MzQ5LS41MzkgMS4zNTY3LS41MzloNDYuMjMwN2MuODM0OSAwIDEuMjUyMyAxLjA3OC42MjYxIDEuNzI0OGwtOS4xODM1IDkuNDg2M2MtLjMxMzEuMzIzNC0uODM0OC41MzktMS4zNTY2LjUzOWgtNDYuMTI2NGMtLjgzNDkgMC0xLjI1MjMtMS4wNzgtLjYyNjEtMS43MjQ4eiIvPjxwYXRoIGQ9Im02OS41MTUgNDUuMDAxOGMtLjMxMzEtLjMyMzQtLjgzNDktLjUzOS0xLjM1NjctLjUzOWgtNDYuMjMwN2MtLjgzNDggMC0xLjI1MjIgMS4wNzgtLjYyNjEgMS43MjQ4bDkuMTgzNSA5LjQ4NjRjLjMxMzEuMzIzMy44MzQ5LjUzODkgMS4zNTY3LjUzODloNDYuMjMwNmMuODM0OSAwIDEuMjUyNC0xLjA3OC42MjYyLTEuNzI0OHoiLz48L2c+PC9nPjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'sol.token.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'TerraUSD',
    symbol: 'UST',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTgxLjA5NiAxMy43MjItLjAxLS4wMS4wMTQtLjAwOGE0NC4xNzQgNDQuMTc0IDAgMCAwIC0yOC43NjUtMTAuNTc0IDQ0LjE2NyA0NC4xNjcgMCAwIDAgLTE4LjAxIDMuODI1Yy0zLjcwNSAxLjU2NS02LjcxNSAzLjYzNS05LjE5NSA2Ljg4NS0xMi43NCAxNi44MyAyOS45NiAyOS4wNiA1Mi43OSAyOS4xMDQgMTAuNDkyIDcuNTI4IDEzLjQ0Ni0yMS4yMzYgMy4xNzctMjkuMjIyeiIgZmlsbD0iIzBkM2NhNCIvPjxwYXRoIGQ9Im0zNi44OTMgMTQuMDYzYy01Ljg2MyA4LjgxNi0yNS40MDMgMTUuMDI3LTI4LjYxNSAxNC4wNTdsLS4wMTktLjA0Yy4xMzItLjI2OC4yNjgtLjUzMi40LS43OTVhNDYuNjcyIDQ2LjY3MiAwIDAgMSA4LjQ4LTExLjU4IDQ3LjIxIDQ3LjIxIDAgMCAxIDkuMTg1LTcuMTUxYzIuNzM3LTEuNTg0IDUuNTM2LTEuNjg4IDYuNDU4LTEuNzIgOC43MDguMTc3IDQuMTYgNy4xNiA0LjExIDcuMjI5em0tNC44MDYgNjIuMzAzYy40MTggMi43NzItLjAwOSAxMy43MTMtLjU4IDE0LjYzNC0uNDg2LjAzMi0xLjUwMy4wOTUtNC40NDgtMS41NTdhNDYuODI3IDQ2LjgyNyAwIDAgMSAtOS45Mi03LjU3MyA0Ni45NTIgNDYuOTUyIDAgMCAxIC04LjQ4LTExLjU4IDQ2LjUyNCA0Ni41MjQgMCAwIDEgLTUuMjIzLTIxLjVjMC0yLjU4MS4yMDgtNS4xMTguNjEyLTcuNTg3YTQ2LjUxMSA0Ni41MTEgMCAwIDEgMi4yNjUtOC41OThjMy4zNzYgNC40ODMgNy4yNzggOC41NDQgMTAuNTk1IDEzLjA3MyAzLjE1OSA0LjMxNSA3LjUwNiAxMS4zNDQgOC4zODYgMTIuODUgNS41IDkuMzE2IDYuMzc2IDE1LjA3NCA2Ljc5MyAxNy44Mzh6bS0zLjMxMi0zOC44NTdjLTIuMDA2LTE1LjMxIDI5LjA1NS0yNS45NzkgNDIuNzA1LTI2LjM4MiAxLjYzOC4wMTggNi42MTYuMDc3IDkuNTI1IDIuNDM2IDUzLjQ5NSA1MC45MzctNDYuOTU3IDY0LjI0LTUyLjIzIDIzLjk0N3oiIGZpbGw9IiM1NDk0ZjgiLz48cGF0aCBkPSJtMjAuNDU3IDkyLjM1YzAgMS44MjUgMS4yNyAzLjMwNCAyLjg0NSAzLjMxMyAzNy40OTYuMjU5IDczLjY5NC0xLjQ2IDczLjY5NC03LjA4MyAwLTE3LjAwNy03Ni41MzkgMy43Ny03Ni41MzkgMy43N3oiIGZpbGw9IiM3NjAxMDEiLz48cGF0aCBkPSJtMjMuMzIgNDQuMTg3YTIuODYzIDIuODYzIDAgMCAwIC0yLjg2MyAyLjg2M3Y0NS4zYzAgMS41NzQgMS4yNyAyLjg1IDIuODQ1IDIuODU4IDM3LjQ5Ni0uMjc2IDczLjc0LTEyLjY4NyA3My42OTQtNi42M3YtNTEuMDI0Yy4wNDUtNi4wNTMtMzYuMTg5IDYuMzUzLTczLjY3NiA2LjYzNHoiIGZpbGw9IiNkZTMwMzAiLz48cGF0aCBkPSJtODQgODBjOC44LTEuNiAxMi4zMzMtLjMzMyAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2Ny0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzMy02My41IDcuNXYtNGMxMS41IDAgNTIuNS01LjUgNjMuNS03LjV6bTAtOC4yMzJjOC44LTEuNiAxMi4zMzMtLjMzMyAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2Ny0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzMy02My41IDcuNXYtNGMxNC41IDEgNTIuNS01LjUgNjMuNS03LjV6bTAtOC4yMzJjOC44LTEuNiAxMi4zMzMtLjMzNCAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2OC0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzMi02My41IDcuNXYtNGMxNC41IDEgNTIuNS01LjUgNjMuNS03LjV6bTAtOC4yMzNjOC44LTEuNiAxMi4zMzMtLjMzMyAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2Ny0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzMy02My41IDcuNXYtNGMxNC41IDEgNTIuNS01LjUgNjMuNS03LjV6bTAtOC4yMzNjOC44LTEuNiAxMi4zMzMtLjMzMyAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2Ni0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzNC02My41IDcuNXYtNGMxNC41IDEgNTIuNS01LjUgNjMuNS03LjV6bTAtOC4yMzJjOC44LTEuNiAxMi4zMzMtLjMzMyAxMyAuNXYzLjVjLTEuNi0xLjYtOS4zMzMtLjY2Ny0xMyAwLTIwLjUgNC41LTQ3LjgzMyA2LjMzMy02My41IDcuNXYtNGMxNC41IDEgNTIuNS01LjUgNjMuNS03LjV6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0ibTI4LjU5MyA3MS41NGEyMDQuMTEyIDIwNC4xMTIgMCAwIDAgNy4wNjYtLjM3NiAyNTEuNzQ1IDI1MS43NDUgMCAwIDAgNi43MDYtLjU3MmMxLjEzLS4xMDkgMi4yNy0uMjIyIDMuNDQ1LS4zNSAxLjE3LS4xMjYgMi4zNjgtLjI1OCAzLjYxMi0uNDEyIDEuMjQzLS4xNSAyLjUzNi0uMzEzIDMuODg5LS40OSAxLjM1Mi0uMTczIDIuNzYzLS4zNzIgNC4yMzgtLjU5di0yNy41M2MtMTAuNTMyIDEuNTU2LTIyLjMxNyAyLjg3Mi0zNC4yMjkgMi45NThhMi44NjMgMi44NjMgMCAwIDAgLTIuODYzIDIuODY0djI0LjY1M2MxLjQ4NCAwIDIuODk1LS4wMTggNC4yNDctLjA1IDEuMzUzLS4wMTggMi42NDYtLjA2IDMuODktLjEwNXoiIGZpbGw9IiMxYTNhYjkiLz48cGF0aCBkPSJtMjMuMDUzIDQ2LjQ4IDEuMjIxIDEuODYzLTIuMjIzLjEyNiAxLjAwMi0xLjk4OHptNS4xMzUtLjI5IDEuMjIgMS44NjItMi4yMjIuMTI2em01LjEzNS0uMjkyIDEuMjIgMS44NjItMi4yMjMuMTI2em01LjEzNS0uMjkxIDEuMjIgMS44NjItMi4yMjMuMTI2em01LjEzNC0uMjkyIDEuMjIxIDEuODYyLTIuMjIzLjEyNnptNS4xMzUtLjI5MSAxLjIyMSAxLjg2Mi0yLjIyMy4xMjZ6bTUuMTMzLS4yOTIgMS4yMiAxLjg2Mi0yLjIyMi4xMjZ6bS0yOC4wNDcgNS4wMjYgMS4yMiAxLjg2Mi0yLjIyMi4xMjd6bTUuMTM1LS4yOTEgMS4yMiAxLjg2My0yLjIyMy4xMjZ6bTUuMTM1LS4yOTIgMS4yMiAxLjg2My0yLjIyMy4xMjZ6bTUuMTM0LS4yOTEgMS4yMjEgMS44NjItMi4yMjMuMTI3em01LjEzNS0uMjkyIDEuMjIxIDEuODYzLTIuMjIzLjEyNnptNS4xMzUtLjI5MSAxLjIyIDEuODYyLTIuMjIzLjEyN3ptLTI4LjA0NyA1LjAyNiAxLjIyIDEuODYyLTIuMjIzLjEyNnptNS4xMzUtLjI5MiAxLjIyIDEuODYzLTIuMjIzLjEyNnptNS4xMzUtLjI5MiAxLjIyIDEuODYzLTIuMjIzLjEyNiAxLjAwMi0xLjk4OXptNS4xMzQtLjI5IDEuMjIxIDEuODYyLTIuMjIzLjEyNiAxLjAwMi0xLjk4OXptNS4xMzUtLjI5MyAxLjIyIDEuODYzLTIuMjIyLjEyNnptNS4xMzUtLjI5IDEuMjIgMS44NjItMi4yMjMuMTI2em01LjEzMi0uMjkyIDEuMjIxIDEuODYyLTIuMjIzLjEyNiAxLjAwMi0xLjk4OXptLTI4LjA0MiA1LjAyNiAxLjIyIDEuODYyLTIuMjIzLjEyNyAxLjAwMy0xLjk5em01LjEzNC0uMjkxIDEuMjIxIDEuODYyLTIuMjIzLjEyNnptNS4xMzUtLjI5MyAxLjIyMSAxLjg2My0yLjIyMy4xMjd6bTUuMTM1LS4yOSAxLjIyIDEuODYyLTIuMjIzLjEyNnptNS4xMzUtLjI5MiAxLjIyIDEuODYyLTIuMjIzLjEyNnptNS4xMzQtLjI5MSAxLjIyMSAxLjg2Mi0yLjIyMy4xMjZ6bS0yOC4wNDggNS4wMjYgMS4yMiAxLjg2My0yLjIyMy4xMjZ6bTUuMTM0LS4yOTEgMS4yMjEgMS44NjMtMi4yMjMuMTI2em01LjEzNS0uMjkyIDEuMjIxIDEuODYzLTIuMjIzLjEyNnptNS4xMzUtLjI5IDEuMjIgMS44NjItMi4yMjMuMTI2IDEuMDAzLTEuOTg5em01LjEzNS0uMjkzIDEuMjIgMS44NjMtMi4yMjMuMTI2em01LjEzNC0uMjkxIDEuMjIxIDEuODYyLTIuMjIzLjEyN3ptNS4xMzMtLjI5MiAxLjIyMSAxLjg2My0yLjIyMy4xMjZ6bS0zMC42NTUgOS4wNDEgMS4yMjIgMS44NjMtMi4yMjMuMTI2IDEuMDAyLTEuOTg5em01LjEzNi0uMjkxIDEuMjIgMS44NjMtMi4yMjMuMTI2em01LjEzNC0uMjkyIDEuMjIxIDEuODYzLTIuMjIzLjEyNnptNS4xMzUtLjI5MSAxLjIyMSAxLjg2My0yLjIyMy4xMjZ6bTUuMTM1LS4yOTEgMS4yMjEgMS44NjItMi4yMjMuMTI2IDEuMDAyLTEuOTg5em01LjEzNS0uMjkyIDEuMjIgMS44NjMtMi4yMjMuMTI2em01LjEzMy0uMjkyIDEuMjIgMS44NjMtMi4yMjMuMTI2em0tMjguMTk2LTIuMjY2IDEuMjIxIDEuODYzLTIuMjIzLjEyNiAxLjAwMi0xLjk4OHptNS4xMzUtLjI5IDEuMjIxIDEuODYyLTIuMjIzLjEyNnptNS4xMzUtLjI5MiAxLjIyIDEuODYyLTIuMjIzLjEyNnptNS4xMzQtLjI5MSAxLjIyMSAxLjg2Mi0yLjIyMy4xMjZ6bTUuMTM1LS4yOTIgMS4yMjEgMS44NjItMi4yMjMuMTI2em01LjEzNS0uMjkyIDEuMjIxIDEuODYzLTIuMjIzLjEyNnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'ust.token.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Celo',
    symbol: 'CELO',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZD0ibTAgMGgxMDB2MTAwaC0xMDB6Ii8+PC9jbGlwUGF0aD48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGQ9Im01MCAwYzkuODg5MSAwIDE5LjU1NjEgMi45MzI0NSAyNy43Nzg1IDguNDI2NTIgOC4yMjI1IDUuNDk0MDggMTQuNjMxMSAxMy4zMDI5OCAxOC40MTU1IDIyLjQzOTI4czQuNzc1IDE5LjE4OTcgMi44NDUzIDI4Ljg4ODdjLTEuOTI5MyA5LjY5OTEtNi42OTEzIDE4LjYwODItMTMuNjg0IDI1LjYwMDgtNi45OTI2IDYuOTkyNy0xNS45MDE3IDExLjc1NDctMjUuNjAwOCAxMy42ODQtOS42OTkgMS45Mjk3LTE5Ljc1MjQuOTM5MS0yOC44ODg3LTIuODQ1M3MtMTYuOTQ1Mi0xMC4xOTMtMjIuNDM5MjgtMTguNDE1NWMtNS40OTQwNy04LjIyMjQtOC40MjY1Mi0xNy44ODk0LTguNDI2NTItMjcuNzc4NSAwLTEzLjI2MDggNS4yNjc4NC0yNS45Nzg1IDE0LjY0NDctMzUuMzU1MyA5LjM3NjgtOS4zNzY4NiAyMi4wOTQ1LTE0LjY0NDcgMzUuMzU1My0xNC42NDQ3eiIgZmlsbD0iI2ZiY2M1YyIvPjxnIGZpbGw9IiNmZmYiPjxwYXRoIGQ9Im00My41NDIxIDczLjcyNDljMy40MDg1LjAwODMgNi43NDI5LS45OTQ4IDkuNTgxMS0yLjg4MjUgMi44MzgxLTEuODg3NiA1LjA1MjQtNC41NzQ4IDYuMzYyNi03LjcyMTVzMS42NTczLTYuNjExNC45OTc1LTkuOTU1NWMtLjY1OTktMy4zNDQtMi4yOTcxLTYuNDE3Mi00LjcwNDMtOC44MzAzLTIuNDA3My0yLjQxMzItNS40NzY0LTQuMDU3OS04LjgxODktNC43MjU5LTMuMzQyNC0uNjY4MS02LjgwNzktLjMyOTQtOS45NTc4Ljk3My0zLjE0OTkgMS4zMDI1LTUuODQyNSAzLjUxMDItNy43MzcxIDYuMzQzOC0xLjg5NDYgMi44MzM1LTIuOTA1OSA2LjE2NTQtMi45MDU5IDkuNTc0IDAgNC41NjEgMS44MDkgOC45MzU5IDUuMDMwMiAxMi4xNjQ5IDMuMjIxMiAzLjIyOTEgNy41OTE2IDUuMDQ4OCAxMi4xNTI2IDUuMDZ6bTAgNi4yNzUxYy00LjY0OTYuMDA4My05LjE5NzMtMS4zNjI5LTEzLjA2NzMtMy45NC0zLjg3MDEtMi41NzcyLTYuODg4Ny02LjI0NDQtOC42NzM4LTEwLjUzNzgtMS43ODUyLTQuMjkzMy0yLjI1NjYtOS4wMTk3LTEuMzU0Ni0xMy41ODFzMy4xMzY5LTguNzUyNSA2LjQyMTctMTIuMDQzM2MzLjI4NDgtMy4yOTA3IDcuNDcyMS01LjUzMzEgMTIuMDMxOC02LjQ0MzMgNC41NTk3LS45MTAxIDkuMjg2OS0uNDQ3MiAxMy41ODM0IDEuMzMwMnM3Ljk2OTIgNC43ODk0IDEwLjU1MzMgOC42NTQ5YzIuNTg0IDMuODY1NSAzLjk2MzQgOC40MTA2IDMuOTYzNCAxMy4wNjAzLjAwNTUgMy4wODQtLjU5NzIgNi4xMzg5LTEuNzczNiA4Ljk4OTgtMS4xNzYzIDIuODUwOS0yLjkwMzQgNS40NDE5LTUuMDgyMiA3LjYyNDZzLTQuNzY2NiAzLjkxNDQtNy42MTU0IDUuMDk1OS01LjkwMjYgMS43ODk3LTguOTg2NyAxLjc4OTd6Ii8+PHBhdGggZD0ibTU2LjUgNjAuNzI0OWMzLjQwODYuMDA4MyA2Ljc0MjktLjk5NDggOS41ODExLTIuODgyNHM1LjA1MjUtNC41NzQ5IDYuMzYyNi03LjcyMTZjMS4zMTAyLTMuMTQ2NyAxLjY1NzMtNi42MTEzLjk5NzUtOS45NTU0LS42NTk5LTMuMzQ0MS0yLjI5NzEtNi40MTcyLTQuNzA0My04LjgzMDQtMi40MDczLTIuNDEzMS01LjQ3NjQtNC4wNTc4LTguODE4OC00LjcyNTktMy4zNDI1LS42NjgtNi44MDgtLjMyOTQtOS45NTc5Ljk3MzEtMy4xNDk5IDEuMzAyNC01Ljg0MjUgMy41MTAyLTcuNzM3MSA2LjM0MzdzLTIuOTA1OSA2LjE2NTQtMi45MDU5IDkuNTc0YzAgNC41NjEgMS44MDkgOC45MzU5IDUuMDMwMiAxMi4xNjVzNy41OTE2IDUuMDQ4OCAxMi4xNTI2IDUuMDU5OXptMCA2LjI3NTFjLTQuNjQ3OSAwLTkuMTkxMy0xLjM3ODItMTMuMDU1OS0zLjk2MDUtMy44NjQ1LTIuNTgyMi02Ljg3NjYtNi4yNTI0LTguNjU1My0xMC41NDY0LTEuNzc4Ni00LjI5NDEtMi4yNDQtOS4wMTkyLTEuMzM3Mi0xMy41Nzc3LjkwNjctNC41NTg2IDMuMTQ0OS04Ljc0NTkgNi40MzE0LTEyLjAzMjRzNy40NzM4LTUuNTI0NyAxMi4wMzI0LTYuNDMxNGM0LjU1ODUtLjkwNjggOS4yODM2LS40NDE0IDEzLjU3NzcgMS4zMzcyIDQuMjk0IDEuNzc4NyA3Ljk2NDIgNC43OTA4IDEwLjU0NjQgOC42NTUzIDIuNTgyMiAzLjg2NDYgMy45NjA1IDguNDA4IDMuOTYwNSAxMy4wNTU5LS4wMTExIDYuMjI5Mi0yLjQ5MDYgMTIuMi02Ljg5NTMgMTYuNjA0N3MtMTAuMzc1NSA2Ljg4NDItMTYuNjA0NyA2Ljg5NTN6Ii8+PHBhdGggZD0ibTU3LjY4ODkgNjcuODU3MWMxLjYyMzQtMS45NzM4IDIuNzg2LTQuMjg0OCAzLjQwMzQtNi43NjQ3IDIuNDczNy0uNjM0MSA0Ljc4MTItMS43OTUgNi43NjQ3LTMuNDAzNC0uMDk4MyAyLjg5MDUtLjcyNDkgNS43Mzg2LTEuODQ4NyA4LjQwMzQtMi42NDQxIDEuMDg1MS01LjQ2MjUgMS42ODMtOC4zMTk0IDEuNzY0N3ptLTE3LjQzNy0yNy42MDVjLTIuNDM1NC42MzQ2LTQuNzAxNiAxLjc5NjQtNi42Mzg2IDMuNDAzMy4wNzI1LTIuODkzNi43MDAxLTUuNzQ2NCAxLjg0ODctOC40MDMzIDIuNjU4NS0xLjE0MzcgNS41MTA0LTEuNzcxMSA4LjQwMzQtMS44NDg4LTEuNjIzNCAxLjk3MzgtMi43ODYgNC4yODQ4LTMuNDAzNCA2Ljc2NDd6Ii8+PC9nPjwvZz48L3N2Zz4=',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'celo.token.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Celo Dollar',
    symbol: 'cUSD',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHdpZHRoPSIxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEwMCA1MGMwLTI3LjYxNDItMjIuMzg1OC01MC01MC01MHMtNTAgMjIuMzg1OC01MCA1MCAyMi4zODU4IDUwIDUwIDUwIDUwLTIyLjM4NTggNTAtNTB6IiBmaWxsPSIjNDVjZDg1Ii8+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTY5Ljg4MDUgNjIuNjQzOGMtMS41NjcxIDMuMzkzMS0zLjkzNzUgNi4zNTMyLTYuOTA2MSA4LjYyNDEtMi45Njg1IDIuMjcwOC02LjQ0NTggMy43ODQxLTEwLjEzMDcgNC40MDg3LTMuNjg1LjYyNDYtNy40NjY3LjM0MTctMTEuMDE3Ny0uODI0MS0zLjU1MTEtMS4xNjU4LTYuNzY0Ni0zLjE3OTQtOS4zNjIzLTUuODY2Ni0yLjU5NzgtMi42ODcxLTQuNTAxNS01Ljk2NjktNS41NDY1LTkuNTU1NC0xLjA0NDktMy41ODg1LTEuMTk5Ni03LjM3NzUtLjQ1MDctMTEuMDM5My43NDg5LTMuNjYxNyAyLjM3ODktNy4wODU3IDQuNzQ4OS05Ljk3NTggMi4zNzAxLTIuODkgNS40MDg3LTUuMTU4OSA4Ljg1MjktNi42MTAzbDIuMjY2OCA1LjM3OTJjLTIuNTcgMS4wODMxLTQuODM3NSAyLjc3NjEtNi42MDYgNC45MzI3LTEuNzY4NSAyLjE1NjUtMi45ODQ4IDQuNzExNS0zLjU0MzYgNy40NDM5LS41NTg5IDIuNzMyNC0uNDQzNSA1LjU1OTguMzM2MyA4LjIzNzYuNzc5OCAyLjY3NzcgMi4yMDAzIDUuMTI1MSA0LjEzODggNy4xMzAyIDEuOTM4NCAyLjAwNTIgNC4zMzYzIDMuNTA3OCA2Ljk4NjEgNC4zNzc3czUuNDcxNyAxLjA4MSA4LjIyMTUuNjE0OWMyLjc0OTctLjQ2NjEgNS4zNDQ0LTEuNTk1MyA3LjU1OTUtMy4yODk4IDIuMjE1Mi0xLjY5NDUgMy45ODQtMy45MDMzIDUuMTUzNC02LjQzNTNsNS45MTg5LjMwNDJ6Ii8+PHBhdGggZD0ibTU2LjEwNjEgMjQuNXYtNGg0LjUwMDV2NGMyIDAgNS4xNjY3LjY2NjcgNi41IDF2NC41Yy0xOS0zLTE1LjUwMTEgMy44NDYyLTggNSA2LjcyMTcgMS4wMzM5IDExIDIgMTEuNSA5IC40IDUuNi01LjgzMzMgNy42NjY3LTkgOHYzLjVoLTV2LTMuNWMtMi40IDAtNi42NjY3LTEuNjY2Ny04LjUtMi41di01LjVjNC41IDIuNSAxNyA0LjUgMTcgMHMtMTYuNTAxMS0zLTE4LjAwMDUtMTFjLTEuMDAyMy01LjM0NzUgNS4zMzMzLTcuODMzMyA5LTguNXoiLz48L2c+PC9zdmc+',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'cusd.token.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'ABR',
    symbol: 'ABR',
    icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyMSIgdmlld0JveD0iMCAwIDEyMSAxMjEiIHdpZHRoPSIxMjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSI2MC41IiBjeT0iNjAuNSIgZmlsbD0iIzBlMGIwZiIgZmlsbC1ydWxlPSJub256ZXJvIiByPSI2MC41Ii8+PGNpcmNsZSBjeD0iNjAuNSIgY3k9IjYwLjUiIHI9IjYwIiBzdHJva2U9IiMyZDJjMmUiIHN0cm9rZS1vcGFjaXR5PSIuODEiLz48ZyBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGQ9Im04MS4xNjg3IDUyLjIxNDctMTEuNjUzLTExLjY1MjloLTE3LjY1NTlsLTUuNjQ5MyA1LjY0OTl2LTIwLjEyNzdoLTYuMDAzN3YzNS42NjQ4IDcuNzY4NmwxMS42NTMgMTEuNjUyOWgxNy42NTU5bDUuNjUwMi01LjY0OTl2MjAuMTI3N2g2LjM1NjN2LTMzLjU0NjJ6bS0xNC40NzgxIDIyLjk1MjZoLTExLjY1MjJsLTguNDc1My04LjQ3NDh2LTQuOTQzNy02LjcwOTJsOC40NzUzLTguNDc0OGgxMS42NTIybDguNDc1MyA4LjQ3NDh2Ny40MTU1IDQuMjM3NHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJtMzEuNzMzNCA3Mi42OTUydi0zMi4xMzM3aC02LjAwMjh2MzQuOTU4NmwyMC40ODEgMjAuNDgwOGgyMC40ODAxdi02LjAwM2gtMTcuNjU1OXoiIGZpbGw9IiM2ZGQiLz48cGF0aCBkPSJtNTUuMDM4OCAyNS43MzA1djYuMDAzaDE3LjY1NTlsMTcuMzAyNCAxNy4zMDI3djMyLjEzMzdoNi4wMDI4di0zNC45NTg2bC0yMC40ODEtMjAuNDgwOHoiIGZpbGw9IiM2ZGQiLz48L2c+PC9nPjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'abr.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Utopia',
    symbol: 'UTO',
    icon: "data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='-40 -40 600 600'%3E%3Cdefs%3E%3Cstyle%3E .cls-1%7Bfill:%239f9f9f%7D.cls-2%7Bfill:%23fefefe%7D.cls-4%7Bfill:%23030303%7D %3C/style%3E%3C/defs%3E%3Cpath d='M371.65 15v23.92l-.47.71C368.82 41.48 366 41 363.36 41q-36.94.09-73.88 0h-176c-3.06 0-6.31.67-9.1-1.37l-.47-.71V15ZM55.21 355.33H31.66a2.81 2.81 0 0 1-.26-.3.82.82 0 0 1-.13-.37v-24H6.67V136.41h24.6l.69.44c2 2.64 1.38 5.75 1.39 8.67q.07 73.11 0 146.2c0 12.44.26 12.68 12.64 12.76 3 0 6-.29 8.85 1a3 3 0 0 1 1.23 1.1 12.38 12.38 0 0 1 1.18 6.17q.1 18 0 36.05c0 2.09.17 4.28-1.36 6.06ZM420.4 452.82v23.51c-3.87.66-178.64.93-195 .29v-23.8l.47-.71c2.79-2 6-1.37 9.1-1.37q75.33-.09 150.68 0c9.25 0 18.49-.06 27.74 0 2.25 0 4.6-.25 6.54 1.37ZM176.66 428H128v-23.83H79.16v-24.9l.39-.66c1.9-1.69 4.27-1.4 6.51-1.42 10.55-.08 21.09 0 31.63-.05 6.6-.05 7.89-1.5 8.12-8.1.16-4.52-.77-9.14 1.06-13.53a2.94 2.94 0 0 1 1.1-1.14 58.19 58.19 0 0 1 24.44-.12 3 3 0 0 1 1.2 1.07c1.29 2.36 1.19 4.95 1.2 7.5v30.75c.05 6.74 1.61 8.24 8.36 8.37 3.7.08 7.41-.1 11.1.23 2.23.2 3.9 1.14 4.1 3.54a107.23 107.23 0 0 1-.06 20 3.93 3.93 0 0 1-1 1.85c-.2.17-.43.31-.65.44Z'/%3E%3Cpath d='M225.4 452.82h-48.74V428c1.46-1.94 3.61-2 5.74-2.06 6.36-.1 12.72-.14 19.08.09 6.33-.23 12.67-.21 19-.07 1.93 0 4-.19 5.56 1.42 2.71 7.57 1.34 15.33 1 23-.04 1.09-.97 1.72-1.64 2.44ZM31.27 136.41V87.67h23.94l.7.45c1.36 1.51 1.34 3.39 1.35 5.22q.18 18.9 0 37.8a11.41 11.41 0 0 1-1 5 3.12 3.12 0 0 1-1.12 1.24c-7.1 2.15-14.32 1.17-21.51.74-1.03-.12-1.63-1.04-2.36-1.71Z'/%3E%3Cpath d='M55.21 87.67v-24.8h23.95l.69.44a3.53 3.53 0 0 1 1 1.84c.36 7.46 1.36 14.94-.69 22.33A3 3 0 0 1 79 88.65c-7.08 2-14.25 1.13-21.4.67-1.07-.06-1.67-.99-2.39-1.65ZM469.14 404.07V428h-24.8l-.71-.47a5.34 5.34 0 0 1-1.24-3.54q-.37-8.07 0-16.15a7 7 0 0 1 1.61-4.3 8.54 8.54 0 0 1 5.24-1.52c5-.13 10-.14 15 0 1.86.09 3.65.41 4.9 2.05Z'/%3E%3Cpath d='M79.16 62.87V38.92H104c.79.8 1.71 1.56 1.76 2.78.29 7 1.2 14-.69 20.86a3 3 0 0 1-1.13 1.23C96.52 66 89 64.92 81.56 64.53c-1.07-.06-1.68-1-2.4-1.66ZM444.34 428v24.8H420.4c-.67-.72-1.62-1.34-1.66-2.38-.33-7.7-1.67-15.44 1-23 1.15-1.33 2.78-1.33 4.32-1.4 5.11-.22 10.23-.18 15.35 0 1.9.03 3.68.36 4.93 1.98ZM79.16 379.27H55.21v-23.94c.52-.48.95-1.21 1.63-1.34a70.78 70.78 0 0 1 21.55-.16c1.55.19 2.36 1.57 2.5 3.09a109.82 109.82 0 0 1 0 19.53 4.76 4.76 0 0 1-1.73 2.82ZM444.34 111.61h24.8v73.54c-1.36 1.8-3.33 2-5.35 2-5 .13-9.94.18-14.9 0-5.5-.2-6.49-1.05-6.55-6.57-.18-14.62-.28-29.24.06-43.86-.24-6.35-.22-12.7-.12-19.06 0-2-.09-4 1.36-5.63ZM395.59 62.87h24.81v24.8c-.15.23-.3.46-.44.69a3.62 3.62 0 0 1-1.84 1c-7.43.4-14.88 1.3-22.25-.61a3 3 0 0 1-1.2-1.1c-1.72-8.12-2.21-16.24.23-24.32Z'/%3E%3Cpath d='M420.4 87.67h23.94v23.94c-.79.79-1.55 1.71-2.77 1.76-7 .29-14 1.2-20.87-.69a3.11 3.11 0 0 1-1.23-1.13c-2.14-7.1-1.16-14.3-.74-21.49.07-1.06 1-1.67 1.67-2.39ZM371.65 38.92h23.94v23.95c-.79.79-1.55 1.7-2.77 1.75-7 .3-14 1.2-20.87-.68a3.18 3.18 0 0 1-1.23-1.13c-2.13-7.1-1.16-14.31-.73-21.49.06-1.07 1.01-1.67 1.66-2.4Z'/%3E%3Cpath class='cls-1' d='M371.65 38.92v23.95c-.9 1.57-2.44 1.81-4 2-1.85.17-3.7.15-5.55.15q-124.27 0-248.55-.06c-3.25 0-6.93 1.15-9.57-2.05V38.92Z'/%3E%3Cpath class='cls-2' d='M104 62.87h267.65c1.92 1.47 2 3.6 2.07 5.74.1 3.68-.12 7.36.14 11 .28 4.05 1.77 5.54 5.81 5.83 3.53.25 7.07 0 10.6.14 2 .07 4 .3 5.32 2.07 1.93 1.47 2 3.6 2.08 5.74.11 3.53-.09 7.07.15 10.6.23 3.35 2 5.16 5.38 5.38 3.82.24 7.64 0 11.45.15 2.15.06 4.28.15 5.75 2.07 1.92 1.47 2 3.6 2.07 5.75.1 3.67-.12 7.35.13 11 .28 4 1.78 5.54 5.82 5.83 3.53.25 7.07 0 10.6.14 2 .06 4 .29 5.32 2.06v48.74h24.8v72.69c-1.25 1.62-3 2-4.92 2-3 .11-6 .06-9 .08-7.41.08-8.77 1.36-8.79 8.67-.05 14.34 0 28.68 0 43 0 3.27-.09 6.54 0 9.8.21 5.2 1.79 6.74 7.07 6.93 3.4.12 6.81 0 10.22.09 2 .06 4 .29 5.35 2.06v24.8c-1.45 1.93-3.59 2-5.71 2.05-6.32.1-12.64.16-19-.11-8 .24-16 .29-24 0-6.61.26-13.22.21-19.84.11a11 11 0 0 1-4.52-.85 3.53 3.53 0 0 1-1.28-.81c-1.44-2.28-1.36-4.85-1.38-7.4 0-3.11.09-6.23-.06-9.34-.22-4.62-1.65-6.06-6.2-6.29a67.32 67.32 0 0 0-7.65 0c-4.07.28-5.5 1.71-5.74 5.85-.22 3.68 0 7.37-.11 11.05-.06 2.4-.11 4.83-1.82 6.81-4.08 1.73-8.36.85-12.56 1s-8.19.09-12.28-.15c-6.36.26-12.72.22-19.08.12a11 11 0 0 1-4.54-.85 3.47 3.47 0 0 1-1.28-.82c-1.36-2.15-1.35-4.57-1.37-7 0-3.26.09-6.53-.07-9.79-.22-4.59-1.67-6-6.26-6.25-2.4-.12-4.82-.09-7.23 0-5.4.14-6.83 1.53-7 6.83-.11 3.54 0 7.09-.08 10.63-.07 2.27-.19 4.55-1.89 6.36-2.12 1.1-4.43.92-6.69.92q-29.41.09-58.84 0c-2.41 0-4.85.08-7.08-1.09-2.15-1.51-2.23-3.84-2.31-6.12-.14-3.56 0-7.12-.09-10.68-.17-5.33-1.6-6.72-7-6.86-2.13-.06-4.27-.09-6.41 0-4.58.25-6 1.68-6.19 6.35-.18 5.55.05 11.11-.27 16.67.34 6.24.22 12.48.14 18.72a11 11 0 0 1-1 4.55 2.94 2.94 0 0 1-1 1.19c-7.82 2.28-15.77 1.2-23.67.74-2.42-.14-2.95-2.34-3.11-4.45-.3-4 0-8-.22-11.93-.23-5.19-1.87-6.82-7-7-3.12-.14-6.25 0-9.38-.11-2-.07-4-.27-5.36-2.05-1.78-1.35-2-3.28-2.07-5.32-.09-3.82.1-7.65-.12-11.46-.24-4.14-1.67-5.57-5.75-5.83a69.87 69.87 0 0 0-8.92 0c-4.09.26-5.51 1.69-5.75 5.83-.23 3.81 0 7.64-.12 11.46 0 2-.29 4-2.07 5.32-.52.48-1 1.22-1.62 1.35a70.79 70.79 0 0 1-21.6.17c-2.15-.26-2.53-2.44-2.67-4.35-.32-4.26 0-8.53-.23-12.78-.22-5.2-1.85-6.83-7-7-4.26-.17-8.52 0-12.78-.2-3.1-.17-4.62-1.69-4.78-4.79-.22-4 0-8-.21-11.93-.23-5.18-1.86-6.8-7-7-3.12-.14-6.25 0-9.38-.11-2-.07-4-.28-5.36-2.05a5.39 5.39 0 0 1-2-4.1c-.09-1.71-.14-3.41-.14-5.12V145.58c0-3.16-.87-6.66 2.07-9.22 1.37-1.78 3.35-2 5.37-2 3.14-.11 6.27 0 9.4-.11 5.22-.22 6.91-1.8 7-7 .18-10.54 0-21.07.1-31.61 0-2.78-.52-5.79 2.08-7.93 1.47-1.93 3.6-2 5.74-2.08 3.68-.1 7.36.13 11-.13 4-.29 5.54-1.78 5.82-5.83.26-3.66 0-7.34.14-11 .15-2.2.21-4.33 2.21-5.8ZM469.14 404.07h-24.8l-.71-.47a5.84 5.84 0 0 1-1.28-3.92c-.19-5.76-.23-11.51 0-17.26.07-1.4.18-2.84 1.39-3.84 7.57-2.59 15.3-1.31 23-1 1 0 1.66 1 2.37 1.65Z'/%3E%3Cpath class='cls-1' d='M469.14 379.27h-24.8c-1.66-.8-1.87-2.36-1.95-3.92-.26-5.33-.25-10.66 0-16a5.23 5.23 0 0 1 1.95-4h24.8Z'/%3E%3Cpath d='M469.14 330.53h-24.36c-.65-3.68-.88-58.4-.29-72.69h24.65Z'/%3E%3Cpath class='cls-1' d='M55.21 136.41v170.18H31.72a2.76 2.76 0 0 1-.3-.29.64.64 0 0 1-.15-.36V136.41Z'/%3E%3Cpath d='M55.21 306.59H78.7a1.67 1.67 0 0 1 .31.28.73.73 0 0 1 .14.36v23.15h24.21a4.48 4.48 0 0 1 .45.45.8.8 0 0 1 .14.36v24.14h24v23.94H79.16v-23.94H55.21Z' fill='%23a1a1a1'/%3E%3Cpath class='cls-1' d='M420.4 428v24.8h-195V428c.7-1.53 2.11-1.78 3.55-1.94a48.57 48.57 0 0 1 5.12-.17h177.66c2.95.11 6.36-.98 8.67 2.11ZM152.71 355.33h23.49a1.72 1.72 0 0 1 .31.29.7.7 0 0 1 .14.36v23.29h24.8c2 1.24 2 3.31 2 5.26q.24 19.08 0 38.16c0 2-.25 4-2 5.33h-24.8v-23.5a1.7 1.7 0 0 0-.3-.3.62.62 0 0 0-.36-.14h-23.28Z'/%3E%3Cpath class='cls-1' d='M127.91 355.33V331a1.64 1.64 0 0 1 .29-.3.62.62 0 0 1 .36-.14h24.15v24.8Z'/%3E%3Cpath class='cls-2' d='M201.46 428v-48.73c1.48-1.95 3.64-2 5.79-2 6-.09 11.95-.17 17.92.12 7-.27 14-.31 20.93-.08 5.06.17 5.88 1.07 6.13 6.13.21 4-.06 8 .17 12 .27 4.69 1.92 6.25 6.65 6.56 11.72.77 13-.4 13-12.27 0-12.46 0-12.47 12.37-12.48h30.76c2.41 0 4.86-.13 7.15.88a3.53 3.53 0 0 1 1.27.77c2.32 4.12 1.32 8.63 1.39 13 .15 9.66.55 10.16 10.16 10.16h.85c7.68 0 8.7-1 8.75-8.55v-8.54a11.49 11.49 0 0 1 1.24-5.78 3 3 0 0 1 1.23-1 13.24 13.24 0 0 1 5.42-.92c14.31 0 28.63-.21 42.94.11 6.25-.24 12.51-.16 18.76-.12a14.32 14.32 0 0 1 6.23 1.14c1.93 1.13 1.76 3.1 1.84 4.9.2 4 0 7.93.14 11.88.2 5 1.73 6.58 6.68 6.8 3.26.15 6.51 0 9.77.1 2 .07 4 .29 5.33 2.06V428H201.46Z'/%3E%3Cpath class='cls-1' d='M79.16 87.67v48.74H55.21V87.67ZM104 62.87v24.8H79.16v-24.8ZM444.34 136.41H420.4v-24.8h23.94ZM395.59 87.67h-23.94v-24.8h23.94ZM420.4 111.61h-24.81V87.67h24.81Z'/%3E%3Cpath d='M322.9 379.27h-48.27a2.07 2.07 0 0 0-.31.27.68.68 0 0 0-.16.36v24h-23.67c.06.06-.06 0-.14-.14a.7.7 0 0 1-.14-.36v-24.15H225.4c-.46-.52-1.24-.92-1.33-1.59-.92-7.32-1.93-14.66.63-21.89l.7-.46h72.7c4-3.06 20.75-3.06 24.8 0 3.1 4.03 3.1 20.08 0 23.96ZM274.15 257.84H225.4V209.1c1.37-1.8 3.35-2 5.37-2q19-.19 38 0c2 0 4 .24 5.37 2 1.8 1.36 2 3.34 2 5.37q.19 19 0 38c.03 2.03-.14 4.01-1.99 5.37ZM395.59 257.84h-48.74V209.1c1.36-1.8 3.34-2 5.36-2q19-.19 38 0c2 0 4 .24 5.37 2 1.81 1.36 2 3.34 2 5.37q.21 19 0 38c.03 2.03-.18 4.01-1.99 5.37Z'/%3E%3Cpath class='cls-1' d='M395.59 257.84V209.1H420c.64 3.58.85 35.66.29 48.74Z'/%3E%3Cpath d='M444.34 404.07H420.4v-24.8c-3-4-3-19.92 0-23.94h23.94v48.74ZM395.59 379.27h-48.74c-.36-.45 0 .24-.35-.23-2.73-3.92-2.49-20 .35-23.71h24.8c4-3 19.93-3 23.94 0 3.04 4.02 3.04 19.93 0 23.94Z'/%3E%3Cpath class='cls-1' d='M274.15 209.1H225.4v-23.5c3.58-.64 35.65-.85 48.75-.3ZM395.59 209.1h-48.74v-23.5c3.58-.64 35.65-.85 48.74-.3ZM274.15 257.84V209.1h23.5c.64 3.58.85 35.65.3 48.74ZM322.9 355.33h-24.8V331a1.64 1.64 0 0 1 .29-.3.62.62 0 0 1 .36-.14h24.15ZM395.59 355.33h-23.94V331a1.64 1.64 0 0 1 .29-.3.62.62 0 0 1 .36-.14h23.29Z'/%3E%3Cpath d='M201.46 355.33V331a1.64 1.64 0 0 1 .29-.3.62.62 0 0 1 .36-.14h23.29v24.8c-4.01 3-19.93 3-23.94-.03Z'/%3E%3Cpath class='cls-1' d='M127.78 136.53v23.73h-23.64v-23.73ZM346.85 355.33v23.94c-4 3-19.93 3-24 0v-23.94ZM152.83 111.49V87.76h23.64v23.73Z'/%3E%3Cpath d='M322.9 379.27h24v24.35a2.07 2.07 0 0 1-.29.3.67.67 0 0 1-.37.15H322.9Z'/%3E%3Cpath class='cls-1' d='M127.79 136.27V111.7h24.91v24.57ZM201.45 379.25v-23.91h23.94v23.91ZM395.57 379.25v-23.91h24.86v23.91Z'/%3E%3Cpath class='cls-4' d='M469.17 404.08v-73.61h23.92v73.61ZM469.17 257.76v-72.61h23.92v72.61Z'/%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 8,
    id: 'utopia.secretskelliessociety.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'DEIP Token',
    symbol: 'DEIP',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUiIGhlaWdodD0iNDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iLjg5MiIgeT0iLjkxIiB3aWR0aD0iNDMuMTYxIiBoZWlnaHQ9IjQzLjE2MSIgcng9IjIxLjU4MSIgZmlsbD0iI0Y4RkVGQSIvPjxwYXRoIGQ9Ik05LjcgMTAuNmgxNC41MzRjNi41NjcgMCAxMS44OTIgNS4zMjMgMTEuODkyIDExLjg5IDAgNi41NjgtNS4zMjQgMTEuODkyLTExLjg5MiAxMS44OTJIOS43VjEwLjZaIiBmaWxsPSJ1cmwoI2EpIi8+PGNpcmNsZSBjeD0iMjIuNDczIiBjeT0iMjIuNDkxIiByPSI0Ljg0NSIgZmlsbD0iIzAwMCIvPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0iYSIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguMjE2IDExLjY5NTUgLTExLjkyNjc3IC4yMjAyOCAyMi42OTcgMjIuNjg3KSI+PHN0b3Agb2Zmc2V0PSIuMzU5IiBzdG9wLWNvbG9yPSIjRTlGRjAwIi8+PHN0b3Agb2Zmc2V0PSIuNzYiIHN0b3AtY29sb3I9IiMyNjM4MDAiLz48c3RvcCBvZmZzZXQ9IjEiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48L3N2Zz4=',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'deip-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Wootrade Network',
    symbol: 'WOO',
    icon: "data:image/svg+xml,%3Csvg width='125' height='83' viewBox='0 0 125 83' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M102.422 0H122.958L113.203 30.9433H92.9243L102.422 0ZM75.982 29.4048L86.0788 53.3388L89.8436 41.0299H109.951L98.5713 78.0422C97.6301 80.9485 94.9776 82.9145 91.8972 82.9145H80.4314C77.6078 82.9145 75.0408 81.2049 73.9285 78.5551L61.2648 47.8682L48.8578 78.5551C47.831 81.2904 45.2641 83 42.3549 83H30.718C27.6376 83 24.9851 80.9485 24.0439 78.0422L0 5.85842e-05H20.1934L36.2797 53.3388L46.8898 29.3193C49.2857 23.3358 55.0185 19.4038 61.4359 19.4038C67.8533 19.4038 73.6718 23.3358 75.982 29.4048Z' fill='%2320252F'/%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '4691937a7508860f876c9c0a2a617e7d9e945d4b.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'LiNEAR',
    symbol: 'LINEAR',
    icon: "data:image/svg+xml,%3Csvg width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M30.74 28.78c.21-.36.32-.78.32-1.21v-6.33c0-.24-.06-.46-.17-.66-.12-.21-.28-.38-.48-.49l-16.86-9.77c-.35-.2-.73-.31-1.13-.32-.64 0-1.24.26-1.69.72-.45.45-.7 1.07-.71 1.71v6.39c0 .24.06.47.18.67.11.21.28.37.48.48l16.82 9.71c.36.22.77.32 1.19.32.41 0 .82-.12 1.19-.33.36-.21.66-.52.86-.89zm.32-16.27c0-.42-.1-.84-.29-1.21-.2-.38-.49-.7-.85-.93-.36-.22-.78-.34-1.21-.34-.42 0-.84.12-1.21.34l-4.97 2.81c-.04.02-.08.07-.1.12-.03.04-.04.1-.04.14 0 .06.01.11.04.16.02.04.06.08.1.1l8.05 4.62c.05.02.1.04.15.04.05 0 .1-.02.15-.05.04-.02.08-.06.11-.11.02-.04.04-.1.03-.15l.04-5.54zM10.05 27.5c-.01.43.08.86.28 1.23.2.38.49.7.85.93.36.22.78.34 1.2.34.42 0 .83-.12 1.2-.34l4.92-2.85c.04-.02.08-.06.1-.11.03-.04.05-.1.05-.15 0-.05-.02-.11-.05-.15-.02-.05-.06-.09-.1-.12l-8.05-4.6c-.05-.03-.09-.04-.15-.04-.05 0-.1.01-.15.04-.05.02-.08.07-.11.12-.02.04-.04.09-.04.14l.05 5.56z' fill='url(%23paint0_linear_186_370)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_186_370' x1='11.135' y1='11.152' x2='30.145' y2='30.457' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%231BB3CC'/%3E%3Cstop offset='1' stop-color='%23824ACC'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'linear-protocol.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'USN',
    symbol: 'USN',
    icon: "data:image/svg+xml;charset=UTF-8,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='38' height='38' rx='19' fill='black'/%3E%3Cpath d='M14.8388 10.6601C14.4203 10.1008 13.6748 9.86519 12.9933 10.0768C12.3119 10.2885 11.85 10.8991 11.85 11.5883V14.7648H8V17.9412H11.85V20.0589H8V23.2353H11.85V28H15.15V16.5108L23.1612 27.2165C23.5797 27.7758 24.3252 28.0114 25.0067 27.7997C25.6881 27.5881 26.15 26.9775 26.15 26.2882V23.2353H30V20.0589H26.15V17.9412H30V14.7648H26.15V10.0001H22.85V21.3658L14.8388 10.6601Z' fill='white'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'usn'
  }, {
    spec: 'ft-1.0.0',
    name: 'Huobi BTC',
    symbol: 'HBTC',
    icon: "data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.0//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id='body_1' width='32' height='32'%3E%3Cg transform='matrix(1.3333334 0 0 1.3333334 0 0)'%3E%3Cimage x='0' y='0' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAA/tJREFUWIXtln9oVWUYxz/vOc67iWtNS9IkjcSui8RUsv40TbLfVoZE5R+li1JJioqYFlKI/bBQo+417A+pTSgkiH5p0ETIBIvaaosiRcRqYVM3t3Oe97zv0x+eO27jXt1kWoFfOJzDeX59npf3fc6B8/o/atNXOmKocgVnEmSt3vOvAaxr1stEdN5QAQwbbIAV7kO0dqgABrUCDR9rpVhdJqIO4KUdmjmnAEnCMon0Uom18/ltekXVSNafM4CVH+h4SVglkUdEDwELgoBHNu7RG846wIomb2xCXoQLpMdhRX8GrnWWwMDWV5v9mLMK0JuYx8QyX3ocNlZEtAWY3HPcE51w47z4rU9t1zM60qc9BYu36ExreQWArgTjNB5WEbaqMjE+AVZcZAzhyMBPA74ZUoBFeT/aJrwPZJAE0+sA9o2p9aPiKCYMg2dC53NrFlUdHWzhAQEk1mzGMAFVzFEBpxjDrrg3qg3CYOr6+pqDUT477tlc9iHgOqAW6AT2YGisXNp++HQAppzhttf9LcaYjwDoEUy3ABAYbtz+QvXOOHdVqLjVwNNAqXkQA+sM4ZpM/Q+uXJ2yG8cmZpVYEFFspyCxYkW7vHO7JV8XKK4RWN2v+ALgMNCUvl+tuEbJ15WtU9Iwe63WiWWWWLBdFht5rCgS66YP114YefVPAgsLrMBc4DmD+Q5oAT4vSrcw9R84gLXMEQtiQdLuJVa1lrfi3JQaoKHIvQK4tbK+fU2mvm1/EAY3pxDfFvk0pHEDAxDLlWIViRy2O0FEEdG25jdrDip6O1BdKk+Uy272zjdhOATcVWSvTuMGCJBQJYkpLo6I/pSap5cI2Zne64C7USabwPwB+CKfUnFlV6BDrCLdCTbWwtVd6KafuzXGfBnlspOAN4wJLq+sb9+lXh/tl79/XHkAm+hesWB7fd8KxHHfP0BHkWsvsCWztK0LuBd4V9X/GOWzNZycB8XqoIRKDqLEmU+d0yNBwmgTa+H1tAnzOg1cv7vItRl4OX1uArqA2iAIurzzyj+1mxIquQL7N5pem/CimLB4D4y3ksw0ATuAA6nrTcAvcX7KJOABjNlmCPLe6QxOzoiCDpjA7BgwAEDizIZ4+PBPxFI4hljxT2SWtFtgOVDo8IiqzgXGovq44n8D3QtMTO0KLM8sabOl6pQdxQCjFmuV6+h+jz9P3NmXTJl/bN8ln0W57ArgtaImfgdC4OKiFB5YWVnfvqFcjVMCAIy43xtz8NiDelwacH6SwhFVZketY1uiXHZOCnF1idCWtPgXp8p/WoCCLrrDmuO//jWdxF+jQEXIOz2tY52+PdXEzs4AnUXf19B8nQkr9pmHv++/Ec/rv6e/AQ/TFRmUSxQZAAAAAElFTkSuQmCC' width='24' height='24'/%3E%3C/g%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '0316eb71485b0ab14103307bf65a021042c6d380.factory.bridge.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'PembRock',
    symbol: 'PEM',
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBmaWxsPSIjMUUxRTFGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMTMuMiAxNzAuNDJhODMuNTEgODMuNTEgMCAwIDAgNzAuNy04Mi42IDgzLjUgODMuNSAwIDAgMC01Ljc4LTMwLjYxbDEzLjY4LTIzLjg3aC0yOC4wOGE4My4xIDgzLjEgMCAwIDAtNjMuMi0yOS4wNiA4My4xIDgzLjEgMCAwIDAtNjMuMiAyOS4wNkg4LjU4TDIyLjcgNTcuNzhhODMuNSA4My41IDAgMCAwLTUuNTUgMzAuMDUgODMuNTEgODMuNTEgMCAwIDAgNzAuNiA4Mi41N2wxMi43NyAyMi4xMSAxMi42Ny0yMi4xWiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0iI0VBRUNFRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTAwLjUzIDcuOTJBNzguNjYgNzguNjYgMCAwIDAgNDAuNjEgMzUuNmwtMS4xOCAxLjE3SDE2LjY1TDI4LjIzIDU3LjFsLS42OCAxLjc3Yy0zLjQgOC44Ny02LjA3IDE4LjEtNi4wNyAyOC4yIDAgMzkuNzcgMjkuMDMgNzMuMTQgNjYuOTQgNzlsMS44Ni4zIDEwLjM0IDE3Ljc5IDEwLjA2LTE3Ljc4IDEuODctLjNjMzcuOTUtNS44MSA2Ny4wMy0zOC44IDY3LjAzLTc4LjYxIDAtMTAuMy0yLjI0LTIwLjEzLTUuNzgtMjkuMTVsLS42OS0xLjc4IDExLjE4LTE5Ljc3aC0yMi42NWwtMS4xOC0xLjE3YTc4LjY2IDc4LjY2IDAgMCAwLTU5LjkzLTI3LjY3Wk0zNS44NCAyOS4wNEE4Ni40OCA4Ni40OCAwIDAgMSAxMDAuNTQgMGE4Ni40OCA4Ni40OCAwIDAgMSA2NC42OCAyOS4wNGgzMi42N0wxODEuODEgNTcuMmMzLjQ2IDkuNDMgNS42NSAxOS42MyA1LjY1IDMwLjI2IDAgNDMuMTItMzEuMDIgNzguOTUtNzEuODMgODYuMTRMMTAwLjY1IDIwMGwtMTUuMy0yNi40MmMtNDAuNzctNy4yMy03MS43NC00My40NC03MS43NC04Ni41MyAwLTEwLjQgMi42Mi0xOS45OSA1LjkzLTI5LjI1TDMgMjkuMDRoMzIuODRaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSIjRjY4MjFGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0zMS44NSA0NS40MSA2OC43NSAxMjAuNDIgOC4wNi0xNC4xMi0yNy40Ny00OC4xM2gyNC4zTDcyLjMzIDQ1LjRIMzEuODVabTQ5LjE5IDAgNDQuMTUgNzcuMzIgNy42Ny0xMy40NC0yOC4xOC00OS4zNGg4LjM3bDIzLjk5IDQyLjAyTDE0NSA4OGwtMTYuMDItMjguMDVoMTYuNDJsLTQuNDMgNy43NiA3LjgxIDEzLjcgMjAuNTctMzZIODEuMDRaTTU2LjMgNTkuOTVsMTYuNjIgMjkuMTFoOC42N0w2NC45NyA1OS45NUg1Ni4zWk00NC4yIDg0LjZhNTYuNjUgNTYuNjUgMCAwIDAgMzEuMDUgNTQuMTJsNi4zMiAxMS4wMWE2NC40NSA2NC40NSAwIDAgMS00NS4yOS02MS43YzAtNC45Ny41Ni05LjggMS42LTE0LjQ0bDYuMzMgMTEuMDJabTc5LjY1LTQ3LjlhNTUuNDYgNTUuNDYgMCAwIDAtMjMuNjYtNS4yNyA1NS40NSA1NS40NSAwIDAgMC0yMy42NSA1LjI2SDYxLjVhNjMuMjYgNjMuMjYgMCAwIDEgMzguNy0xMy4xNmMxNC41NCAwIDI3Ljk1IDQuOSAzOC43IDEzLjE2aC0xNS4wNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9IiNGNjgyMUYiIGQ9Ik00NC4xIDg4LjAyYzAtMS4xNC4wNC0yLjI4LjEtMy40MWwtNi4zLTExLjAyYTY1LjI2IDY1LjI2IDAgMCAwLTEuNiAxNC40MyA2NC40NSA2NC40NSAwIDAgMCA0NS4yOCA2MS43MWwtNi4zMS0xMWE1Ni42NSA1Ni42NSAwIDAgMS0zMS4xNS01MC43Wm0xMTMuMTIgMGMwLTEuMTQtLjItMi4yOC0uMjctMy40MWw2LjI1LTExLjAyYTY1LjMxIDY1LjMxIDAgMCAxIDEuODQgMTQuNDMgNjQuNDUgNjQuNDUgMCAwIDEtNDUuMjkgNjEuNzFsNi4zMS0xMWE1Ni42NSA1Ni42NSAwIDAgMCAzMS4xNi01MC43WiIvPjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.pembrock.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Atocha Coin',
    symbol: 'ATO',
    icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzYuODggMTM2Ljg4Ij48Y2lyY2xlIGN4PSI2OC40NCIgY3k9IjY4LjQ0IiByPSI2OC40NCIgc3R5bGU9ImZpbGw6Z29sZCIgZGF0YS1uYW1lPSJMYXllciAyIi8+PGcgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBkPSJNNzEuNjUgNzkuNXYyNC40MWMwIDEuMjcuMjQgMS40OSAxLjQ3IDEuMTcgMS4wOC0uMjkgMi4xMy0uNjggMy4xOC0xYTExLjU4IDExLjU4IDAgMCAwIDEuNS0uNTljMS40MS0uNzIgMi44NC0xLjQgNC4xOC0yLjIyYTI1LjU5IDI1LjU5IDAgMCAwIDUuNTktNC42NGMxLjM2LTEuNTIgMi41NC0zLjIgMy43OC00LjgyLjMzLS40My4xOS0uNzItLjM1LS43MS0uODYgMC0xLjcyLjEzLTIuNTguMjItLjQ5IDAtMSAuMTMtMS40Ny4xOWEuMzkuMzkgMCAwIDEtLjQ4LS4zN2wtLjMzLTJhMS41NSAxLjU1IDAgMCAwLS4wNy0uNDIgNS43OCA1Ljc4IDAgMCAxLS4zMy0yLjEzYy0uMDktMS0uMjUtMS45NC0uMzQtMi45Mi0uMDctLjc4LjA1LS44NC44My0uOTQgMS41OS0uMTkgMy4xOC0uNDQgNC43Ny0uNjVsMi43OS0uMzcgMS4xNC0uMTUgNC44Ny0uNzRjLjI3IDAgLjU0LS4wNS44LS4wOWwyLjE4LS4zNWEyLjc1IDIuNzUgMCAwIDEgLjU1LS4wOC40Ny40NyAwIDAgMSAuMzUuMTcgOS44NSA5Ljg1IDAgMCAxIC40NCAxLjFjLjI0LjY5LjQ2IDEuMzkuNjkgMi4wOGEyLjY5IDIuNjkgMCAwIDEgLjA5LjI4Yy4xNy44My4zMyAxLjY2LjUxIDIuNDkuMjYgMS4xNC41NCAyLjI3LjgxIDMuNC4zMSAxLjMxLjYgMi42My45MyAzLjkzLjE5Ljc1LjQ1IDEuNDkuNjUgMi4yNHMuNDUgMS44MS42NiAyLjcxYS40LjQgMCAwIDEtLjE0LjM0IDMuMzkgMy4zOSAwIDAgMS0uODEuMzVjLTEuMzYuMzYtMi43Mi42OS00LjA5IDFsLTIuNTEuNjVjLS42My4xNy0uNzcuMDgtLjkyLS41NHEtLjM5LTEuNTktLjgyLTMuMTdjMC0uMTQtLjIxLS4zNC0uMzItLjM0YS45MS45MSAwIDAgMC0uNTkuMjRjLS4yOS4zMy0uNDguNzQtLjc1IDEuMDgtLjkzIDEuMTgtMS45IDIuMzMtMi44MyAzLjUxYTMwIDMwIDAgMCAxLTQuNiA0LjMgMzkuNCAzOS40IDAgMCAxLTMuNzQgMi41OCAyNi41OSAyNi41OSAwIDAgMS0yLjcxIDEuNTljLTEuMDguNTMtMi4yIDEtMy4zMiAxLjQycy0yIC43OC0zLjA3IDEuMTFjLS43MS4yMy0xLjQ1LjM3LTIuMTcuNTUtLjIuMDUtLjQuMTQtLjYuMjFhNC41MSA0LjUxIDAgMCAxLS40NC4xNmMtLjYxLjE1LTEuMjMuMy0xLjg1LjQzYS42Mi42MiAwIDAgMC0uNTMuN2MwIC43OCAwIDEuNTctLjA2IDIuMzRhNS4yOCA1LjI4IDAgMCAxLS44IDIuNDkgMy44OCAzLjg4IDAgMCAxLTEuNTIgMS4zMiAxMi41NyAxMi41NyAwIDAgMS0xLjU0LjcxIDEuMjQgMS4yNCAwIDAgMS0uNzguMDcgNS44NiA1Ljg2IDAgMCAxLTMuNzMtMi45MiA4IDggMCAwIDEtLjQtMi42MiAxMCAxMCAwIDAgMSAwLTEuMjguNjcuNjcgMCAwIDAtLjYxLS43NGMtLjc1LS4xNC0xLjUtLjI2LTIuMjQtLjQ0cy0xLjU3LS40NC0yLjM1LS42OGMtLjUtLjE1LTEtLjI4LTEuNS0uNDctMS42My0uNjEtMy4yOC0xLjE5LTQuODktMS44NmExNS4xMiAxNS4xMiAwIDAgMS0yLjI3LTEuMjljLTEuMzgtLjg5LTIuNzgtMS43Ny00LjEtMi43Ni0xLS43Ni0xLjkyLTEuNjgtMi44OC0yLjUyYTM2LjMzIDM2LjMzIDAgMCAxLTQuODEtNS42OGMtLjU4LS43Ny0xLjEtMS41OC0xLjY4LTIuMzVhLjgxLjgxIDAgMCAwLS42LS4yOWMtLjE2IDAtLjM3LjI1LS40My40My0uMzEgMS0uNTcgMi4wNy0uODYgMy4xMXEtLjE5LjctLjQgMS4zOWMtLjExLjM1LS4zOS4zNC0uNjYuMjgtLjU4LS4xMy0xLjE2LS4yOC0xLjczLS40My0xLjYyLS40Mi0zLjI0LS44NC00Ljg2LTEuMjhhNi41NSA2LjU1IDAgMCAxLTEtLjQuMzQuMzQgMCAwIDEtLjEyLS4zYy4yMS0xIC40MS0xLjkzLjY2LTIuODkuMzMtMS4yNC43Mi0yLjQ3IDEtMy43Mi4zOC0xLjQ4LjcyLTMgMS4wOC00LjQ3LjIyLS44OS40Ni0xLjc4LjY4LTIuNjguMTgtLjcyLjM0LTEuNDUuNTItMi4xN3MuMzItMS4yMy41Mi0xLjgzLjM4LS41NS44OC0uNDJhNi43NCA2Ljc0IDAgMCAwIC45Mi4xNWMxLjIuMTUgMi4zOS4yOCAzLjU5LjQ0bDUuNi43NSA0LjYxLjU3Yy44NS4xMSAxLjY5LjI1IDIuNTMuMzYuMyAwIC40Ny4xOS40NC41MXYuNDNjLS4xMyAxLjI0LS4yMiAyLjQ5LS40IDMuNzJzLS40NSAyLjM4LS42NiAzLjU4Yy0uMDYuMzQtLjIzLjQ3LS41NS40MmwtMi4xNC0uMzVhMi4yIDIuMiAwIDAgMC0uNDcgMGMtLjQgMC0uNTcuMjItLjQyLjU5YTcuOTIgNy45MiAwIDAgMCAuNzEgMS4zNCAyNC45NCAyNC45NCAwIDAgMCAzLjUyIDQuMjFjLjkxLjg4IDEuODIgMS43NiAyLjc4IDIuNTdhMTkgMTkgMCAwIDAgNC4yOSAyLjY5YzEuMTEuNTEgMi4yMiAxIDMuMzcgMS40N3MyLjM4LjggMy41OCAxLjE4YTIgMiAwIDAgMCAuNTEuMDUuNDcuNDcgMCAwIDAgLjUyLS40IDIuOTEgMi45MSAwIDAgMCAuMDctLjU1Yy4wNy0zLjYuMTgtNy4xOS4yLTEwLjc5LjA1LTguMzIuMDYtMTYuNjQuMDgtMjVWNTQuODVjMC0uOS0uMi0xLjA5LTEuMS0xLjA5aC0xNmExMy41MSAxMy41MSAwIDAgMS0yLjc4LS4zOSAxLjMxIDEuMzEgMCAwIDEtLjczLS43IDMuNDUgMy40NSAwIDAgMS0uMzMtMS4zNXYtNC4zMWEzLjQ1IDMuNDUgMCAwIDEgLjMxLTEuMSAxIDEgMCAwIDEgLjk1LS42M2MxLjMtLjExIDIuNi0uMjQgMy45MS0uMjYgMy42MyAwIDcuMjUgMCAxMC44OC0uMDVoMy44M2MuNjYgMCAxLS4yNyAxLS45M1YzMi41NmExLjQzIDEuNDMgMCAwIDAtLjc1LTEuMzQgMTAuNDkgMTAuNDkgMCAwIDEtMy41NS0zLjU2IDcuNTcgNy41NyAwIDAgMS0xLjI5LTMuN2MtLjA2LTEuMTkgMC0yLjM5IDAtMy41OEE4LjM1IDguMzUgMCAwIDEgNTguNDEgMTdhOS41IDkuNSAwIDAgMSA0LTMuNzYgNi41MyA2LjUzIDAgMCAxIDIuNjgtMWMuNzMtLjA4IDEuNDQtLjMgMi4xNy0uMzRhNi4xNiA2LjE2IDAgMCAxIDEuNDIuMjJjLjEzIDAgLjI1LjA4LjM3LjA5YTEwLjM1IDEwLjM1IDAgMCAxIDUgMi4zNSA3LjYyIDcuNjIgMCAwIDEgMi4xOCAyLjhjLjQ2LjkzLjggMS45MyAxLjE3IDIuOWEyLjEyIDIuMTIgMCAwIDEgLjEuNjd2MS40NWE4LjEyIDguMTIgMCAwIDEtLjcxIDMuNTUgMTIuMzEgMTIuMzEgMCAwIDEtMi4xNyAzLjYzIDUuOCA1LjggMCAwIDEtMS45MyAxLjU3IDEuNjggMS42OCAwIDAgMC0xLjA2IDEuNzR2MTEuMjZjMCAuNjIuMjkuODYuOTIuODhIODUuNjljMS43NiAwIDMuNTIuMTQgNS4yOC4xNmExLjgyIDEuODIgMCAwIDEgMS42OCAxLjg1djQuNjFhMi4zMyAyLjMzIDAgMCAxLS41NyAxLjQ0IDEuMzUgMS4zNSAwIDAgMS0uNy40MSAyMC4wNyAyMC4wNyAwIDAgMS01LjE4LjM0SDcyLjY3Yy0uOTEgMC0xLjA3LjE2LTEuMDcgMS4wNnEuMDUgMTIuMzQuMDUgMjQuNjJabS00LjQ5LTUxLjU1YTUuNzQgNS43NCAwIDAgMCA1LjcxLTUuNjQgNS44MiA1LjgyIDAgMCAwLTYuMDgtNS42M2MtMi41Mi4wNS01LjExIDIuODMtNS4wNyA1LjcxYTUuNiA1LjYgMCAwIDAgNS40NCA1LjU2WiIvPjxwYXRoIGQ9Ik04MC45NCA3Ny41YTIwIDIwIDAgMCAxLTIuNjktLjM3IDcuMzMgNy4zMyAwIDAgMS00LjM0LTMgNy43IDcuNyAwIDAgMS0xLTYuMjQgNy43OCA3Ljc4IDAgMCAxIDMuNzYtNSAxMC4yNSAxMC4yNSAwIDAgMSA2LjM4LTEuNTEgOC4xIDguMSAwIDAgMSA2LjE3IDMuNEE3LjY1IDcuNjUgMCAwIDEgOTAuNTcgNzFhNi40NiA2LjQ2IDAgMCAxLTIuMTQgMy40NiAxMi4yNyAxMi4yNyAwIDAgMS0zLjQ2IDIuMjEgMTAuNjQgMTAuNjQgMCAwIDEtNC4wMy44M1ptMy01LjY2YTYuNjkgNi42OSAwIDAgMCAwLS44NSAyMi41IDIyLjUgMCAwIDAtMS4xNy00Ljc3IDEuODMgMS44MyAwIDAgMC0xLjQ4LTEuMzFjLTEuMjYtLjEzLTEuOTIgMS0xLjggMi4xOWEyMy43MiAyMy43MiAwIDAgMCAuNjQgMy40IDEzLjA3IDEzLjA3IDAgMCAwIC44NiAyLjM5IDEuNDggMS40OCAwIDAgMCAyLjMzLjU2IDEuODEgMS44MSAwIDAgMCAuNjEtMS42M1pNNDMuOTQgNzMuMzFhMy44NyAzLjg3IDAgMCAxIDItMy42QTguOTEgOC45MSAwIDAgMSA1MSA2OC4zOWE1LjU5IDUuNTkgMCAwIDAgLjYgMCAxIDEgMCAwIDAgMS0xIDEwIDEwIDAgMCAwLS4yNy0yLjU2IDEuMzMgMS4zMyAwIDAgMC0yLjM0LS41NGMtLjU3LjU1LTEgMS4yMS0xLjU3IDEuNzlhMi41NiAyLjU2IDAgMCAxLTIuMjIuOTQgMS40NyAxLjQ3IDAgMCAxLTEuMjEtMiAzLjkzIDMuOTMgMCAwIDEgMi0yLjA5IDEzLjI2IDEzLjI2IDAgMCAxIDIuNTctMS4wOCAxMC4zMSAxMC4zMSAwIDAgMSA1LjEzLS4yNyA3LjM1IDcuMzUgMCAwIDEgMi45MyAxLjM2QTMuMzggMy4zOCAwIDAgMSA1OSA2NS4zOWMuMDcgMS4yNy4wOCAyLjU0LjE1IDMuODEuMDYgMSAuMTYgMiAuMjYgM2ExLjIzIDEuMjMgMCAwIDAgLjg4IDEuMDVjLjY3LjI3Ljc0LjQ2LjU3IDEuMTRhMy44IDMuOCAwIDAgMS0yIDIuMzUgNC4zOCA0LjM4IDAgMCAxLTMuNjguNDUgMy4zIDMuMyAwIDAgMS0xLjE1LS42OWMtLjc0LS42OC0uODItLjc1LTEuNjItLjE5YTYuMjEgNi4yMSAwIDAgMS00LjY5IDEgNC4yMSA0LjIxIDAgMCAxLTMuMS0xLjgxIDMuMSAzLjEgMCAwIDEtLjY4LTIuMTlabTcuNy0yLjkxYTIgMiAwIDAgMC0xLjE3IDMuNDMgMS4yMiAxLjIyIDAgMCAwIDEuNzQtLjI0IDIuOSAyLjkgMCAwIDAgLjI2LTIuNjIuNzYuNzYgMCAwIDAtLjgyLS41N1oiLz48L2c+PC9zdmc+',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'atocha-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'SeatlabNFT',
    symbol: 'SEAT',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='32px' height='32px' viewBox='0 0 32 32' style='enable-background:new 0 0 32 32;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23050035;%7D .st1%7Bfill:url(%23SVGID_1_);%7D%0A%3C/style%3E%3Cg id='Layer_1'%3E%3Ccircle class='st0' cx='16' cy='16' r='16'/%3E%3C/g%3E%3Cg id='Isolation_Mode'%3E%3ClinearGradient id='SVGID_1_' gradientUnits='userSpaceOnUse' x1='6.2375' y1='16' x2='25.7625' y2='16'%3E%3Cstop offset='0' style='stop-color:%2300C2FF'/%3E%3Cstop offset='1' style='stop-color:%230067FF'/%3E%3C/linearGradient%3E%3Cpath class='st1' d='M14,6.1c-0.3,0-0.5,0.1-0.8,0.2L8.1,9.4L7.8,9.6L7.2,10c-0.5,0.3-0.9,0.6-0.9,1.7v4.1c0,0.9,0.3,1.6,0.9,1.9 l6.2,3.8c1,0.6,2.3-0.1,2.3-1.3v-2.9c0-0.7-0.4-1.4-1-1.8l-2.9-1.8l3-1.9c0.5-0.3,0.8-0.9,0.8-1.5V7.6C15.6,6.7,14.8,6.1,14,6.1z M14.7,10.4c0,0.3-0.2,0.6-0.4,0.8l-3.4,2.1l-1.8-1.1c-0.5-0.3-0.8-0.5-1.1-0.8c-0.3-0.3-0.2-0.8,0.2-1c0,0,0,0,0,0L13.7,7 C13.8,7,13.9,6.9,14,6.9c0.3,0,0.7,0.3,0.7,0.7V10.4z M24.9,14.3l-6.2-3.8c-1-0.6-2.3,0.1-2.3,1.3v2.9c0,0.7,0.4,1.4,1,1.8l2.9,1.8 l-3,1.9c-0.5,0.3-0.8,0.9-0.8,1.5v2.8c0,0.9,0.8,1.6,1.6,1.6c0.3,0,0.5-0.1,0.8-0.2l5.1-3.1l0.4-0.2l0.6-0.4 c0.5-0.3,0.9-0.6,0.9-1.7v-4.1C25.8,15.3,25.4,14.6,24.9,14.3z M23.8,21.6C23.8,21.6,23.8,21.6,23.8,21.6L18.3,25 c-0.1,0.1-0.2,0.1-0.4,0.1c-0.3,0-0.7-0.3-0.7-0.7v-2.8c0-0.3,0.2-0.6,0.4-0.8l3.4-2.1l1.8,1.1c0.5,0.3,0.8,0.5,1.1,0.8 C24.3,20.9,24.2,21.4,23.8,21.6z'/%3E%3C/g%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 5,
    id: 'token.stlb.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Burrow Token',
    symbol: 'BRRR',
    icon: 'data:image/png;base64,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',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.burrow.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'FUSOTAO',
    symbol: 'TAO',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTU1LjQxIDI5LjYzNS03LjI5NiA2LjE0N2ExLjY1OSAxLjY1OSAwIDAgMS0uNjc1IDIuMzlsMS44NDggOS41NDZjLjgwNS0uMjA4IDEuNTM2LS43MDIgMi4wODktMS41MzlhMTIuODE2IDEyLjgxNiAwIDAgMCAxLjk4Mi01LjI4OWMuMTctMS4yNTEuNTY0LTIuNDczIDEuMTU2LTMuNTg2YTEyLjgzMyAxMi44MzMgMCAwIDAgMS40ODItNS40NjljLjAzNS0uODYzLS4xODYtMS42LS41ODctMi4yeiIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Ik00NS4zNDIgMzUuOTA2YTEuNjM3IDEuNjM3IDAgMCAxIDIuMTgzLS42M2w3LjM3OC02LjE5M2MtMS4yODMtMS4xOTMtMy40NTktMS41NDctNS40NDUtLjkwM2wtMTIuNzQyIDQuMTM1Yy0uMzEuMS0uNTUzLjI5Ny0uNzE2LjU0Mmw5LjM0MiAzLjA0OXoiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJNNDMuODkyIDQ1LjM3YzEuMTQ5IDEuNTkyIDIuOTQ3IDIuNTcyIDQuNTk5IDIuNTI0bC0xLjg0NC05LjQ4N2ExLjY0NCAxLjY0NCAwIDAgMS0xLjUzOC0xLjY4bC05LjM2NC0zLjA1NWMuMDA0LjI2OC4wODcuNTQuMjYuNzhsNy44ODcgMTAuOTE5eiIgZmlsbD0idXJsKCNjKSIvPjxwYXRoIGQ9Im00MS40MSA1My4yMjMtOC4wNTYtNS4wOTJhMS42MzEgMS42MzEgMCAwIDEtMi40NjQuMDkxbC04LjQzOCA0LjcyMWMuNDQ0LjcwOCAxLjEzNiAxLjI1NiAyLjA5NyAxLjUyNyAxLjc5NC41MDYgMy43NC42MDMgNS42MDUuMjY1YTEwLjUzNiAxMC41MzYgMCAwIDEgMy43NDIgMGMxLjg3LjMzOSAzLjgyMS4yNCA1LjYxOS0uMjcuODI2LS4yMzMgMS40NTMtLjY3MyAxLjg5NS0xLjI0MnoiIGZpbGw9InVybCgjZCkiLz48cGF0aCBkPSJNMzIuMzg5IDQ1LjQzOGExLjY0NiAxLjY0NiAwIDAgMSAxLjI3IDEuODlsOC4xNDUgNS4xMzRjLjczNC0xLjU5NC4zOTctMy43ODItLjgyNy01LjQ4TDMzLjEyMyAzNi4wOWExLjM1NCAxLjM1NCAwIDAgMC0uNzM0LS41MTZ2OS44NjR6IiBmaWxsPSJ1cmwoI2UpIi8+PHBhdGggZD0iTTIyLjk3IDQ3LjAxN2MtMS4xNTEgMS41ODgtMS41MjQgMy42MDgtLjk2OSA1LjE3bDguNDItNC42OTJhMS42NDggMS42NDggMCAwIDEgMS4xMTctMS45ODd2LTkuODg0Yy0uMjUzLjA4Ny0uNDg1LjI1LS42NTkuNDlsLTcuOTA4IDEwLjkwM3oiIGZpbGw9InVybCgjZikiLz48cGF0aCBkPSJtMTUuODg2IDM1Ljc4Mi03LjI5NS02LjE0N2MtLjQwMS42LS42MjIgMS4zMzctLjU4NyAyLjJhMTIuODMgMTIuODMgMCAwIDAgMS40ODIgNS40NjkgMTAuNzUxIDEwLjc1MSAwIDAgMSAxLjE1NiAzLjU4NmMuMjU4IDEuODkyLjk1IDMuNzI3IDEuOTgyIDUuMjkuNTUzLjgzNiAxLjI4NCAxLjMzIDIuMDg5IDEuNTM4bDEuODQ4LTkuNTQ2YTEuNjU5IDEuNjU5IDAgMCAxLS42NzUtMi4zOXoiIGZpbGw9InVybCgjZykiLz48cGF0aCBkPSJNMTUuNTY4IDQ3Ljg1NmMxLjY0OS4wNDggMy40NDUtLjkzMiA0LjU5Mi0yLjUyMWw3Ljg3NS0xMC45MDhhMS4zNiAxLjM2IDAgMCAwIC4yNi0uNzhsLTkuMzUgMy4wNTJhMS42NDcgMS42NDcgMCAwIDEtMS41MzYgMS42NzlsLTEuODQgOS40Nzh6IiBmaWxsPSJ1cmwoI2gpIi8+PHBhdGggZD0iTTE2Ljc0NSAzNS4xOTNhMS42NCAxLjY0IDAgMCAxIDEuOTI3Ljc0bDkuMzU2LTMuMDUyYTEuMzU3IDEuMzU3IDAgMCAwLS43MTctLjU0M2wtMTIuNzYxLTQuMTRjLTEuOTktLjY0NC00LjE2OC0uMjktNS40NTMuOTA1bDcuMzkgNi4yYy4wOC0uMDQ0LjE2Ny0uMDguMjU4LS4xMXoiIGZpbGw9InVybCgjaSkiLz48cGF0aCBkPSJtNDAuNTcxIDE4LjA5LTMuNTQ2LTguODkyYy42ODktLjE5OCAxLjQ1My0uMTgyIDIuMjU4LjExOGExMi42NSAxMi42NSAwIDAgMSA0LjcwMyAzLjExIDEwLjYxNCAxMC42MTQgMCAwIDAgMy4wMjcgMi4yMTYgMTIuNjc2IDEyLjY3NiAwIDAgMSA0LjM4IDMuNTM1Yy42MTkuNzg4Ljg2IDEuNjQxLjgwNiAyLjQ3N2wtOS41OC0xLjE3OWExLjY0OSAxLjY0OSAwIDAgMC0uNjYyLTEuMTI2IDEuNjI2IDEuNjI2IDAgMCAwLTEuMzg2LS4yNnoiIGZpbGw9InVybCgjaikiLz48cGF0aCBkPSJNMzkuNzY0IDE4Ljc5Yy0uNDYzLjY0LS40IDEuNS4xMDQgMi4wNjZsLTUuNzczIDcuOThhMS4zNjMgMS4zNjMgMCAwIDEtLjI5Mi0uODVsLjAyMS0xMy40NDljLjAwNC0yLjA5NiAxLjAxMi00LjA2NCAyLjUzOC00LjkybDMuNTg1IDguOTZhMS42NiAxLjY2IDAgMCAwLS4xODMuMjEzeiIgZmlsbD0idXJsKCNrKSIvPjxwYXRoIGQ9Ik01Mi4xNiAyMS41NDhjLS40NjUgMS41OTEtMS45NSAzLjAwNi0zLjgxMiAzLjYxbC0xMi43ODIgNC4xNTVhMS4zNTIgMS4zNTIgMCAwIDEtLjgyLjAwOGw1Ljc4OC03Ljk5NmExLjY0IDEuNjQgMCAwIDAgMi4wNjctLjk0OWw5LjU1OSAxLjE3MnoiIGZpbGw9InVybCgjbCkiLz48cGF0aCBkPSJtMjcuNDYgOS4xOTgtMy41NDcgOC44OTJhMS42MjYgMS42MjYgMCAwIDAtMS4zODYuMjYgMS42NSAxLjY1IDAgMCAwLS42NjIgMS4xMjVsLTkuNTggMS4xNzljLS4wNTMtLjgzNi4xODctMS42OS44MDYtMi40NzdhMTIuNjc3IDEyLjY3NyAwIDAgMSA0LjM4LTMuNTM0IDEwLjYxNiAxMC42MTYgMCAwIDAgMy4wMjctMi4yMTcgMTIuNjUgMTIuNjUgMCAwIDEgNC43MDMtMy4xMWMuODA1LS4zIDEuNTY5LS4zMTYgMi4yNTgtLjExOHoiIGZpbGw9InVybCgjbSkiLz48cGF0aCBkPSJNMTYuMTk1IDI1LjE0M2MtMS44Ni0uNjA1LTMuMzQyLTIuMDE3LTMuODA2LTMuNjA3bDkuNTQ0LTEuMTdhMS42MzYgMS42MzYgMCAwIDAgMi4wNjQuOTQ4bDUuNzggNy45ODdhMS4zNDkgMS4zNDkgMCAwIDEtLjgxOS0uMDA4bC0xMi43NjMtNC4xNXoiIGZpbGw9InVybCgjbikiLz48cGF0aCBkPSJNMjQuNjM5IDIwLjg2N2ExLjY1NCAxLjY1NCAwIDAgMC0uMDc5LTIuMjgxbDMuNTktOC45N2MxLjUzLjg1NyAyLjUzOSAyLjgyOCAyLjU0MiA0LjkyNmwuMDIxIDEzLjQ2MmMuMDAxLjMyNy0uMTEuNjItLjI5Mi44NTJsLTUuNzgyLTcuOTg5eiIgZmlsbD0idXJsKCNvKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iaCIgeDE9IjgiIHkxPSI0My40NjciIHgyPSIxNi4zOTkiIHkyPSIzNy45MzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjOUEwQTBFIi8+PHN0b3Agb2Zmc2V0PSIuODY5IiBzdG9wLWNvbG9yPSIjREExODFGIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI0NS45MjYiIHkxPSIzNi4wNTMiIHgyPSI1MS4wNjgiIHkyPSI0My41NjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9Ii40NjQiIHN0b3AtY29sb3I9IiNFQTMwMkEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDNTE1MUIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjQ1LjkyNiIgeTE9IjM2LjA1MyIgeDI9IjUxLjA2OCIgeTI9IjQzLjU2MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjQ2NCIgc3RvcC1jb2xvcj0iI0VBMzAyQSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0M1MTUxQiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iMzEuOTAxIiB5MT0iNTQuOTMzIiB4Mj0iMzEuOTAxIiB5Mj0iNDcuNDIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzlFMEIwRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RBMTgxRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJlIiB4MT0iMzEuOTAxIiB5MT0iNTQuOTMzIiB4Mj0iMzEuOTAxIiB5Mj0iNDcuNDIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzlFMEIwRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RBMTgxRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmIiB4MT0iMzEuOTAxIiB5MT0iNTQuOTMzIiB4Mj0iMzEuOTAxIiB5Mj0iNDcuNDIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzlFMEIwRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RBMTgxRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iOCIgeTE9IjQzLjQ2NyIgeDI9IjE2LjM5OSIgeTI9IjM3LjkzOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM5QTBBMEUiLz48c3RvcCBvZmZzZXQ9Ii44NjkiIHN0b3AtY29sb3I9IiNEQTE4MUYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjQ1LjkyNiIgeTE9IjM2LjA1MyIgeDI9IjUxLjA2OCIgeTI9IjQzLjU2MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iLjQ2NCIgc3RvcC1jb2xvcj0iI0VBMzAyQSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0M1MTUxQiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJpIiB4MT0iOCIgeTE9IjQzLjQ2NyIgeDI9IjE2LjM5OSIgeTI9IjM3LjkzOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM5QTBBMEUiLz48c3RvcCBvZmZzZXQ9Ii44NjkiIHN0b3AtY29sb3I9IiNEQTE4MUYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iaiIgeDE9IjQyLjk2MyIgeTE9IjEyLjIzIiB4Mj0iMzMuODY1IiB5Mj0iMjcuMDUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRjlCMTk4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRUUxQzI1Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImsiIHgxPSI0Mi45NjMiIHkxPSIxMi4yMyIgeDI9IjMzLjg2NSIgeTI9IjI3LjA1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0Y5QjE5OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VFMUMyNSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJsIiB4MT0iNDIuOTYzIiB5MT0iMTIuMjMiIHgyPSIzMy44NjUiIHkyPSIyNy4wNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNGOUIxOTgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFRTFDMjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibSIgeDE9IjE4Ljc2NSIgeTE9IjEzLjQxNiIgeDI9IjI5LjU0NSIgeTI9IjMyLjU4NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNFRTI3MjkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFRTFDMjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibiIgeDE9IjE4Ljc2NSIgeTE9IjEzLjQxNiIgeDI9IjI5LjU0NSIgeTI9IjMyLjU4NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNFRTI3MjkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFRTFDMjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibyIgeDE9IjE4Ljc2NSIgeTE9IjEzLjQxNiIgeDI9IjI5LjU0NSIgeTI9IjMyLjU4NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNFRTI3MjkiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFRTFDMjUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=',
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'fusotao-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'NearX',
    symbol: 'NearX',
    icon: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM17.1421 21.3847L21.3848 17.1421L19.3669 15.1243C18.5576 17.0302 17.0303 18.5576 15.1243 19.3669L17.1421 21.3847ZM9.4329 19.5792C7.45318 18.9089 5.82112 17.4847 4.87847 15.6484L3.24263 17.2842L7.48527 21.5269L9.4329 19.5792ZM4.63307 8.87568C5.4424 6.96973 6.96977 5.44237 8.87573 4.63305L7.24263 2.99995L2.99999 7.24259L4.63307 8.87568ZM15.6484 4.87847L17.3848 3.14209L21.6274 7.38473L19.5792 9.4329C18.9089 7.45318 17.4847 5.82112 15.6484 4.87847Z' fill='%232FA8AF'/%3E%3Cpath d='M8.00119 11.9921C8.00119 11.0268 8.00119 10.0615 8.00119 9.09612C8.00119 8.50505 8.16497 8.1743 8.56285 8.05781C8.97778 7.93628 9.40619 7.97917 9.79565 8.45228C11.3533 10.3447 12.9343 12.218 14.5092 14.0959C14.5692 14.1676 14.6117 14.3122 14.734 14.2626C14.8496 14.2157 14.7858 14.0805 14.786 13.9878C14.7904 12.6326 14.7898 11.2774 14.7868 9.92226C14.7868 9.83668 14.838 9.7162 14.7271 9.67372C14.6401 9.64029 14.5824 9.74185 14.522 9.79358C14.0492 10.1981 13.5804 10.6073 13.1088 11.0133C13.0208 11.089 12.9332 11.2118 12.8002 11.1012C12.6657 10.9894 12.7696 10.8872 12.8364 10.7881C13.3547 10.0186 13.8728 9.24898 14.3909 8.47919C14.6656 8.07085 15.0079 7.92282 15.4056 8.04141C15.786 8.15475 15.9986 8.48592 15.9992 8.97668C16.0007 10.0905 15.9996 11.2045 15.9996 12.3183C15.9996 13.2094 16.0003 14.1005 15.9994 14.9916C15.999 15.4826 15.8137 15.798 15.4512 15.9324C15.0256 16.0901 14.5767 15.9683 14.2734 15.6058C12.6823 13.705 11.0924 11.8029 9.50198 9.90144C9.46029 9.85161 9.42303 9.7961 9.37377 9.75489C9.28998 9.68487 9.21967 9.68108 9.21314 9.81797C9.20999 9.88273 9.21188 9.94791 9.21188 10.0129C9.21188 11.3496 9.21062 12.6862 9.2142 14.0227C9.21441 14.1186 9.15609 14.2557 9.26114 14.3038C9.38093 14.3587 9.45061 14.2178 9.52998 14.1503C9.98259 13.7651 10.4291 13.3728 10.8805 12.9859C10.9729 12.9066 11.0626 12.7651 11.208 12.8973C11.3402 13.0176 11.2213 13.1196 11.159 13.2127C10.6323 13.9989 10.1032 14.7837 9.57145 15.5663C9.32788 15.9248 8.9881 16.056 8.61085 15.9488C8.23739 15.8428 8.00498 15.5246 8.00287 15.0827C7.99761 14.0523 8.00119 13.022 8.00119 11.9917V11.9921Z' fill='white'/%3E%3C/svg%3E%0A",
    reference: 'https://near.staderlabs.com',
    reference_hash: null,
    decimals: 24,
    id: 'v2-nearx.stader-labs.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'DISCOVOL TOKEN',
    symbol: 'DISC',
    icon: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTQxLjcgMTQxLjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE0MS43IDE0MS43IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGU+LnN0MHtmaWxsOiNmOTcxMTZ9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDYuMSAxOC43djEwNS42czIxLjMtNS41IDMzLjEtMjljMCAwIDEyLjctMjIuMi0uOS00OS43IDAgMC0xMC4xLTIwLjktMzIuMi0yNi45eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDUuNyA5LjRjMzEuMSAxOC4zIDM0LjUgNDguNCAzNC41IDQ4LjQgNi40IDM3LjktMTcgNjAuMy0xNyA2MC4zLTMxLjQgMzQuNS03My40IDIwLjMtNzMuNCAyMC4zIDMwLjYtOS4zIDQxLjktMzUuMSA0MS45LTM1LjEgMTYuNi0zNS41IDAtNjMuMiAwLTYzLjJDNzcgOS43IDQ3LjMgMy45IDQ3LjMgMy45YzMyLjQtMTEuMyA1OC40IDUuNSA1OC40IDUuNXptNyAxMS41UzExMS4xIDM4IDk0LjcgMzhjMCAwIDE2IDIuOCAxNy41IDE4LjggMCAwIDEuNC0xNy41IDE4LjItMTguMy0uMSAwLTE4LjUtMS41LTE3LjctMTcuNnpNMjUuNiAxNS45aDUuOXYxMTAuOEgyN1M4IDExMiAyLjIgODkuMmMwIDAtNy43LTI2LjIgNS01MC40LjEuMSA5LjUtMTcgMTguNC0yMi45eiIvPjwvc3ZnPg==',
    reference: null,
    reference_hash: null,
    decimals: 14,
    id: 'discovol-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Stader',
    symbol: 'SD',
    icon: "data:image/svg+xml,%3Csvg width='256' height='256' viewBox='0 0 256 256' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M128 256C198.692 256 256 198.692 256 128C256 57.3075 198.692 0 128 0C57.3075 0 0 57.3075 0 128C0 198.692 57.3075 256 128 256Z' fill='%236259D4'/%3E%3Cpath d='M126.852 191.869L126.822 181.088L153.98 165.105L153.886 133.025L163.667 127.882L164.056 170.723L126.852 191.869Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M153.98 165.105L126.822 181.088L126.852 191.869L164.056 170.723L163.667 127.882L153.886 133.025L153.98 165.105ZM154.207 133.218L154.3 165.104C154.301 165.218 154.241 165.323 154.143 165.381L127.143 181.271L127.171 191.32L163.735 170.538L163.352 128.41L154.207 133.218Z' fill='%236259D4'/%3E%3Cpath d='M134.785 112.611L145.906 106.314L173.184 123.396L173.334 175.037L164.063 170.734L163.673 127.894L134.785 112.611Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M163.673 127.894L164.063 170.734L173.334 175.037L173.184 123.396L145.906 106.314L134.785 112.611L163.673 127.894ZM135.451 112.601L163.823 127.611C163.927 127.666 163.992 127.773 163.993 127.891L164.381 170.529L173.013 174.535L172.865 123.574L145.898 106.687L135.451 112.601Z' fill='%236259D4'/%3E%3Cpath d='M126.443 53.3335L173.06 79.8728L173.094 90.9255L126.49 64.9081L126.443 53.3335Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M126.443 53.3335L126.49 64.9081L173.094 90.9255L173.06 79.8728L126.443 53.3335ZM126.766 53.8852L126.81 64.7198L172.773 90.3795L172.741 80.0592L126.766 53.8852Z' fill='%236259D4'/%3E%3Cpath d='M80.1584 134.322L80 80.4074L126.432 53.3335L126.48 64.9081L88.7187 86.0335L88.5731 128.106L80.1584 134.322Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M88.7187 86.0335L126.48 64.9081L126.432 53.3335L80 80.4074L80.1584 134.322L88.5731 128.106L88.7187 86.0335ZM88.2536 127.944L88.3987 86.0324C88.3991 85.9169 88.4617 85.8106 88.5624 85.7542L126.159 64.7209L126.115 53.8892L80.3205 80.5909L80.4766 133.689L88.2536 127.944Z' fill='%236259D4'/%3E%3Cpath d='M107.511 149.374L80.1562 134.324L88.5709 128.108L135.44 154.885L107.58 170.601L98.2445 175.794L126.85 191.879L164.054 170.733L173.325 175.035L126.619 202.66L80.2804 176.371L117.215 154.711L107.511 149.374Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M107.58 170.601L135.44 154.885L88.5709 128.108L80.1562 134.324L117.215 154.711L80.2804 176.371L126.619 202.66L173.325 175.035L164.054 170.733L126.85 191.879L98.2445 175.794L107.58 170.601ZM164.069 171.092L127.008 192.157C126.91 192.213 126.791 192.213 126.693 192.158L98.0877 176.073C97.9866 176.016 97.9242 175.909 97.9245 175.794C97.9248 175.678 97.9877 175.571 98.0889 175.515L107.423 170.322L134.792 154.884L88.5932 128.49L80.7483 134.285L107.666 149.093L117.369 154.431C117.47 154.486 117.533 154.592 117.535 154.707C117.536 154.822 117.476 154.929 117.377 154.987L80.9208 176.367L126.615 202.29L172.639 175.069L164.069 171.092Z' fill='%236259D4'/%3E%3Cpath d='M88.7207 86.0458L126.482 64.9204L173.085 90.9378L145.902 106.323L134.781 112.619L163.669 127.902L153.888 133.044L116.808 112.11L153.764 90.4499L144.947 85.4178L126.512 74.8955L99.0623 90.6069L88.7207 86.0458Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M173.085 90.9378L126.482 64.9204L88.7207 86.0458L99.0623 90.6069L126.512 74.8955L153.764 90.4499L116.808 112.11L153.888 133.044L163.669 127.902L134.781 112.619L173.085 90.9378ZM162.983 127.901L134.631 112.902C134.528 112.847 134.462 112.741 134.461 112.624C134.459 112.507 134.521 112.398 134.623 112.341L145.744 106.044L172.432 90.9397L126.482 65.287L89.4368 86.0119L99.0436 90.2489L126.353 74.6177C126.451 74.5614 126.572 74.5614 126.67 74.6175L153.923 90.172C154.022 90.2286 154.083 90.3338 154.084 90.4481C154.085 90.5623 154.024 90.6682 153.926 90.726L117.45 112.105L153.894 132.68L162.983 127.901Z' fill='%236259D4'/%3E%3Cpath d='M98.252 175.789L107.587 170.596L126.827 181.093L126.857 191.874L98.252 175.789Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M98.252 175.789L126.857 191.874L126.827 181.093L107.587 170.596L98.252 175.789ZM98.9075 175.791L126.536 191.326L126.508 181.283L107.589 170.962L98.9075 175.791Z' fill='%236259D4'/%3E%3Cpath d='M80.2804 176.368L80.2461 164.785L107.511 149.371L117.215 154.708L80.2804 176.368Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M80.2804 176.368L117.215 154.708L107.511 149.371L80.2461 164.785L80.2804 176.368ZM80.5987 175.81L116.567 154.717L107.513 149.737L80.5666 164.971L80.5987 175.81Z' fill='%236259D4'/%3E%3Cpath d='M116.809 112.109L116.92 101.073L144.947 85.417L153.764 90.4491L116.809 112.109Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M116.809 112.109L153.764 90.4491L144.947 85.417L116.92 101.073L116.809 112.109ZM117.134 111.547L153.125 90.4528L144.946 85.7845L117.238 101.262L117.134 111.547Z' fill='%236259D4'/%3E%3Cpath d='M88.5723 128.087L88.7179 86.0142L99.0595 90.5753L99.1537 123.589L135.407 143.582L135.442 154.864L88.5723 128.087Z' fill='white'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M99.1537 123.589L99.0595 90.5753L88.7179 86.0142L88.5723 128.087L135.442 154.864L135.407 143.582L99.1537 123.589ZM135.088 143.771L98.9992 123.869C98.8974 123.813 98.8341 123.706 98.8337 123.59L98.7401 90.7841L89.0362 86.5043L88.8929 127.901L135.12 154.311L135.088 143.771Z' fill='%236259D4'/%3E%3C/svg%3E",
    reference: '',
    reference_hash: '',
    decimals: 18,
    id: '30d20208d987713f46dfd34ef128bb16c404d10f.factory.bridge.near'
  }, {
    spec: 'ft-1.0',
    name: 'SWEAT',
    symbol: 'SWEAT',
    icon: "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' rx='50' fill='%23FF0D75'/%3E%3Cg clip-path='url(%23clip0_283_2788)'%3E%3Cpath d='M39.4653 77.5455L19.0089 40.02L35.5411 22.2805L55.9975 59.806L39.4653 77.5455Z' stroke='white' stroke-width='10'/%3E%3Cpath d='M66.0253 77.8531L45.569 40.3276L62.1012 22.5882L82.5576 60.1136L66.0253 77.8531Z' stroke='white' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_283_2788'%3E%3Crect width='100' height='56' fill='white' transform='translate(0 22)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 18,
    id: 'token.sweat'
  }, {
    spec: 'ft-1.0.0',
    name: 'APYSwap',
    symbol: 'APYS',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iLTEwIC0xMCAxMjAgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTQ2OF81MTk1KSI+CjxwYXRoIGQ9Ik0zOC40MzUzIDEyLjY4NUw3NC41ODY5IDc3Ljg2NzdMOTguOTk5OSA3OC41NjYzTDYyLjY3NDkgMTMuMzc4N0wzOC40MzUzIDEyLjY4NVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNDY4XzUxOTUpIi8+CjxwYXRoIGQ9Ik0xMi43NjcyIDU1LjQwNzFMODYuOTM2NiA1Ni42MzI2TDk4Ljk5ODIgNzcuODM0OEwwLjAxMTcwNDYgNzYuMTk5MkwxMi43NjcyIDU1LjQwNzFaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMTQ2OF81MTk1KSIvPgo8cGF0aCBkPSJNNjIuMjQxMSAxMy4wOTRMMjMuODY5OCA3Ny4wODU2TC0wLjUxMDgwNSA3Ni45MTIyTDM3Ljg2NzMgMTIuOTIwN0w2Mi4yNDExIDEzLjA5NFoiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8xNDY4XzUxOTUpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xNDY4XzUxOTUiIHgxPSI1NS45Njc3IiB5MT0iMjMuODc4MSIgeDI9Ijg1LjQ4MjUiIHkyPSI3Ny4wMTI2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwOEFFRUEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMkFGNTk4Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xNDY4XzUxOTUiIHgxPSIyOS40ODcxIiB5MT0iNjcuODQzIiB4Mj0iNjguOTYzNiIgeTI9IjY4LjgwMzIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzA4QUVFQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyQUY1OTgiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzE0NjhfNTE5NSIgeDE9IjUxLjk4MzUiIHkxPSIzLjEzMzQ1IiB4Mj0iMzEuMjQxOCIgeTI9IjM2LjE3MzUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzA4QUVFQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyQUY1OTgiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNDY4XzUxOTUiPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4=',
    reference: null,
    reference_hash: null,
    decimals: 24,
    id: 'apys.token.a11bd.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'Tether USD',
    symbol: 'USDt',
    icon: "data:image/svg+xml,%3Csvg width='111' height='90' viewBox='0 0 111 90' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.4825 0.862305H88.0496C89.5663 0.862305 90.9675 1.64827 91.7239 2.92338L110.244 34.1419C111.204 35.7609 110.919 37.8043 109.549 39.1171L58.5729 87.9703C56.9216 89.5528 54.2652 89.5528 52.6139 87.9703L1.70699 39.1831C0.305262 37.8398 0.0427812 35.7367 1.07354 34.1077L20.8696 2.82322C21.6406 1.60483 23.0087 0.862305 24.4825 0.862305ZM79.8419 14.8003V23.5597H61.7343V29.6329C74.4518 30.2819 83.9934 32.9475 84.0642 36.1425L84.0638 42.803C83.993 45.998 74.4518 48.6635 61.7343 49.3125V64.2168H49.7105V49.3125C36.9929 48.6635 27.4513 45.998 27.3805 42.803L27.381 36.1425C27.4517 32.9475 36.9929 30.2819 49.7105 29.6329V23.5597H31.6028V14.8003H79.8419ZM55.7224 44.7367C69.2943 44.7367 80.6382 42.4827 83.4143 39.4727C81.0601 36.9202 72.5448 34.9114 61.7343 34.3597V40.7183C59.7966 40.8172 57.7852 40.8693 55.7224 40.8693C53.6595 40.8693 51.6481 40.8172 49.7105 40.7183V34.3597C38.8999 34.9114 30.3846 36.9202 28.0304 39.4727C30.8066 42.4827 42.1504 44.7367 55.7224 44.7367Z' fill='%23009393'/%3E%3C/svg%3E",
    reference: null,
    reference_hash: null,
    decimals: 6,
    id: 'usdt.tether-token.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'NEAT',
    symbol: 'NEAT',
    icon: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='4.8' fill='%23202020'/%3E%3Crect width='40' height='40' rx='4.8' fill='url(%23paint0_linear_1_5571)'/%3E%3Crect x='10.4' y='12.6001' width='4.8' height='4.8' fill='white'/%3E%3Crect x='15.2' y='12.6001' width='4.8' height='4.8' fill='white'/%3E%3Crect x='24.8' y='12.6001' width='4.8' height='4.8' fill='white'/%3E%3Crect x='10.4' y='17.4001' width='4.8' height='4.8' fill='white'/%3E%3Crect x='24.8' y='17.4001' width='4.8' height='4.8' fill='white'/%3E%3Crect x='10.4' y='22.2002' width='4.8' height='4.8' fill='white'/%3E%3Crect x='24.8' y='22.2002' width='4.8' height='4.8' fill='white'/%3E%3Crect x='20' y='22.2002' width='4.8' height='4.8' fill='white'/%3E%3Crect x='17.6' y='17.4001' width='4.8' height='4.8' fill='white'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1_5571' x1='20' y1='0' x2='20' y2='40' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23262626'/%3E%3Cstop offset='1' stop-color='%23121212'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A",
    reference: null,
    reference_hash: null,
    decimals: 8,
    id: 'neat.nrc-20.near'
  }, {
    spec: 'ft-1.0.0',
    name: 'USMeme',
    symbol: 'USM',
    icon: 'https://storage.herewallet.app/upload/13151331-8f9c-4851-8038-36794688c693.jpg',
    reference: null,
    reference_hash: null,
    decimals: 8,
    id: 'usmeme.tg'
  }];
  function getDefaultTokenList() {
    var env = getConfig().networkId;
    switch (env) {
      case 'mainnet':
        return DefaultMainnetTokenList;
      case 'testnet':
        return DefaultTestnetTokenList;
      default:
        return DefaultMainnetTokenList;
    }
  }

  var DCL_POOL_SPLITER = '|';
  var DCLSwap = /*#__PURE__*/function () {
    var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
      var Swap, SwapByOutput, LimitOrderWithSwap, SwapByStopPoint, AccountId, swapInfo, transactions, tokenA, tokenB, amountA, pool_ids, tokenRegistered, output_token, min_output_amount, msg, _pool_ids, _output_token, output_amount, _msg, _tokenRegistered, pool_id, fee, buy_token, point, _tokenRegistered2, DCLRegistered, new_point, _msg2, _tokenRegistered3, _msg3, registered;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              Swap = _ref.Swap, SwapByOutput = _ref.SwapByOutput, LimitOrderWithSwap = _ref.LimitOrderWithSwap, SwapByStopPoint = _ref.SwapByStopPoint, AccountId = _ref.AccountId, swapInfo = _ref.swapInfo;
              transactions = [];
              tokenA = swapInfo.tokenA, tokenB = swapInfo.tokenB, amountA = swapInfo.amountA;
              if (!Swap) {
                _context.next = 15;
                break;
              }
              pool_ids = Swap.pool_ids;
              _context.next = 7;
              return ftGetStorageBalance(tokenB.id, AccountId)["catch"](function () {
                throw new Error(tokenB.id + " doesn't exist.");
              });
            case 7:
              tokenRegistered = _context.sent;
              if (tokenRegistered === null) {
                transactions.push({
                  receiverId: tokenB.id,
                  functionCalls: [registerAccountOnToken(AccountId)]
                });
              }
              output_token = tokenB.id;
              min_output_amount = toPrecision(Swap.min_output_amount, 0);
              msg = JSON.stringify({
                Swap: {
                  pool_ids: pool_ids,
                  output_token: output_token,
                  min_output_amount: min_output_amount,
                  client_id: ''
                }
              });
              transactions.push({
                receiverId: tokenA.id,
                functionCalls: [{
                  methodName: 'ft_transfer_call',
                  args: {
                    receiver_id: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                    amount: toNonDivisibleNumber(tokenA.decimals, amountA),
                    msg: msg
                  },
                  gas: '180000000000000',
                  amount: ONE_YOCTO_NEAR
                }]
              });
              _context.next = 52;
              break;
            case 15:
              if (!SwapByOutput) {
                _context.next = 27;
                break;
              }
              _pool_ids = SwapByOutput.pool_ids;
              _output_token = tokenB.id;
              output_amount = toNonDivisibleNumber(tokenB.decimals, SwapByOutput.output_amount);
              _msg = JSON.stringify({
                SwapByOutput: {
                  pool_ids: _pool_ids,
                  output_token: _output_token,
                  output_amount: output_amount,
                  client_id: ''
                }
              });
              _context.next = 22;
              return ftGetStorageBalance(tokenB.id, AccountId)["catch"](function () {
                throw new Error(tokenB.id + " doesn't exist.");
              });
            case 22:
              _tokenRegistered = _context.sent;
              if (_tokenRegistered === null) {
                transactions.push({
                  receiverId: tokenB.id,
                  functionCalls: [registerAccountOnToken(AccountId)]
                });
              }
              transactions.push({
                receiverId: tokenA.id,
                functionCalls: [{
                  methodName: 'ft_transfer_call',
                  args: {
                    receiver_id: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                    amount: toNonDivisibleNumber(tokenA.decimals, amountA),
                    msg: _msg
                  },
                  gas: '180000000000000',
                  amount: ONE_YOCTO_NEAR
                }]
              });
              _context.next = 52;
              break;
            case 27:
              if (!LimitOrderWithSwap) {
                _context.next = 45;
                break;
              }
              pool_id = LimitOrderWithSwap.pool_id;
              fee = Number(pool_id.split(DCL_POOL_SPLITER)[2]);
              buy_token = tokenB.id;
              point = priceToPoint({
                amountA: amountA,
                amountB: LimitOrderWithSwap.output_amount,
                tokenA: tokenA,
                tokenB: tokenB,
                fee: fee
              });
              _context.next = 34;
              return ftGetStorageBalance(tokenB.id, AccountId)["catch"](function () {
                throw new Error(tokenB.id + " doesn't exist.");
              });
            case 34:
              _tokenRegistered2 = _context.sent;
              if (_tokenRegistered2 === null) {
                transactions.push({
                  receiverId: tokenB.id,
                  functionCalls: [registerAccountOnToken(AccountId)]
                });
              }
              _context.next = 38;
              return DCLSwapGetStorageBalance(tokenB.id, AccountId)["catch"](function () {
                throw new Error(tokenB.id + " doesn't exist.");
              });
            case 38:
              DCLRegistered = _context.sent;
              if (DCLRegistered === null) {
                transactions.push({
                  receiverId: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                  functionCalls: [{
                    methodName: 'storage_deposit',
                    args: {
                      registration_only: true,
                      account_id: AccountId
                    },
                    gas: '30000000000000',
                    amount: '0.5'
                  }]
                });
              }
              new_point = pool_id.split(DCL_POOL_SPLITER)[0] === tokenA.id ? point : -point;
              _msg2 = JSON.stringify({
                LimitOrderWithSwap: {
                  pool_id: pool_id,
                  buy_token: buy_token,
                  point: new_point,
                  client_id: ''
                }
              });
              transactions.push({
                receiverId: tokenA.id,
                functionCalls: [{
                  methodName: 'ft_transfer_call',
                  args: {
                    receiver_id: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                    amount: toNonDivisibleNumber(tokenA.decimals, amountA),
                    msg: _msg2
                  },
                  gas: '180000000000000',
                  amount: ONE_YOCTO_NEAR
                }]
              });
              _context.next = 52;
              break;
            case 45:
              if (!SwapByStopPoint) {
                _context.next = 52;
                break;
              }
              _context.next = 48;
              return ftGetStorageBalance(tokenB.id, AccountId)["catch"](function () {
                throw new Error(tokenB.id + " doesn't exist.");
              });
            case 48:
              _tokenRegistered3 = _context.sent;
              if (_tokenRegistered3 === null) {
                transactions.push({
                  receiverId: tokenB.id,
                  functionCalls: [registerAccountOnToken(AccountId)]
                });
              }
              _msg3 = JSON.stringify({
                SwapByStopPoint: SwapByStopPoint
              });
              transactions.push({
                receiverId: tokenA.id,
                functionCalls: [{
                  methodName: 'ft_transfer_call',
                  args: {
                    receiver_id: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                    amount: toNonDivisibleNumber(tokenA.decimals, amountA),
                    msg: _msg3
                  },
                  gas: '180000000000000',
                  amount: ONE_YOCTO_NEAR
                }]
              });
            case 52:
              if (!(tokenA.id === exports.WRAP_NEAR_CONTRACT_ID)) {
                _context.next = 57;
                break;
              }
              _context.next = 55;
              return ftGetStorageBalance(exports.WRAP_NEAR_CONTRACT_ID, AccountId);
            case 55:
              registered = _context.sent;
              if (registered === null) {
                transactions.unshift({
                  receiverId: exports.WRAP_NEAR_CONTRACT_ID,
                  functionCalls: [registerAccountOnToken(AccountId)]
                });
              }
            case 57:
              return _context.abrupt("return", transactions);
            case 58:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function DCLSwap(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var quote = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref3) {
      var pool_ids, input_amount, input_token, output_token, tag;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pool_ids = _ref3.pool_ids, input_amount = _ref3.input_amount, input_token = _ref3.input_token, output_token = _ref3.output_token, tag = _ref3.tag;
              return _context2.abrupt("return", refDCLSwapViewFunction({
                methodName: 'quote',
                args: {
                  pool_ids: pool_ids,
                  input_token: input_token.id,
                  output_token: output_token.id,
                  input_amount: toNonDivisibleNumber(input_token.decimals, input_amount),
                  tag: tag
                }
              }));
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function quote(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();
  var list_user_assets = /*#__PURE__*/function () {
    var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(AccountId) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (AccountId) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              return _context3.abrupt("return", refDCLSwapViewFunction({
                methodName: 'list_user_assets',
                args: {
                  account_id: AccountId
                }
              }));
            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function list_user_assets(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();
  var DCLSwapByInputOnBestPool = /*#__PURE__*/function () {
    var _ref7 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref6) {
      var _bestEstimate$tag, _bestEstimate$tag$spl, _bestEstimate$tag2, _bestEstimate$tag2$sp;
      var tokenA, tokenB, amountA, slippageTolerance, AccountId, estimates, bestEstimate, bestFee;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              tokenA = _ref6.tokenA, tokenB = _ref6.tokenB, amountA = _ref6.amountA, slippageTolerance = _ref6.slippageTolerance, AccountId = _ref6.AccountId;
              if (!(slippageTolerance <= 0 || slippageTolerance >= 100)) {
                _context5.next = 3;
                break;
              }
              throw SlippageError;
            case 3:
              _context5.next = 5;
              return Promise.all(DCL_POOL_FEE_LIST.map( /*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(fee) {
                  var pool_id;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          pool_id = getDCLPoolId(tokenA.id, tokenB.id, fee);
                          return _context4.abrupt("return", quote({
                            pool_ids: [pool_id],
                            input_token: tokenA,
                            output_token: tokenB,
                            input_amount: amountA,
                            tag: tokenA.id + "-" + fee + "-" + amountA
                          })["catch"](function (e) {
                            return null;
                          }));
                        case 2:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));
                return function (_x5) {
                  return _ref8.apply(this, arguments);
                };
              }()));
            case 5:
              estimates = _context5.sent;
              if (!(!estimates || estimates.every(function (e) {
                return e === null;
              }))) {
                _context5.next = 8;
                break;
              }
              throw NoPoolOnThisPair(tokenA.id, tokenB.id);
            case 8:
              bestEstimate = estimates && estimates != null && estimates.some(function (e) {
                return !!e;
              }) ? ___default.maxBy(estimates, function (e) {
                return Number(!e || !e.tag ? -1 : e.amount);
              }) : null;
              bestFee = bestEstimate && bestEstimate.tag && (bestEstimate == null ? void 0 : (_bestEstimate$tag = bestEstimate.tag) == null ? void 0 : (_bestEstimate$tag$spl = _bestEstimate$tag.split('-')) == null ? void 0 : _bestEstimate$tag$spl[1]) && Number(bestEstimate == null ? void 0 : (_bestEstimate$tag2 = bestEstimate.tag) == null ? void 0 : (_bestEstimate$tag2$sp = _bestEstimate$tag2.split('-')) == null ? void 0 : _bestEstimate$tag2$sp[1]);
              return _context5.abrupt("return", DCLSwap({
                swapInfo: {
                  tokenA: tokenA,
                  tokenB: tokenB,
                  amountA: amountA
                },
                Swap: {
                  pool_ids: [getDCLPoolId(tokenA.id, tokenB.id, bestFee)],
                  min_output_amount: percentLess(slippageTolerance, bestEstimate.amount)
                },
                AccountId: AccountId
              }));
            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return function DCLSwapByInputOnBestPool(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();
  var quote_by_output = function quote_by_output(_ref9) {
    var pool_ids = _ref9.pool_ids,
      output_amount = _ref9.output_amount,
      input_token = _ref9.input_token,
      output_token = _ref9.output_token;
    return refDCLSwapViewFunction({
      methodName: 'quote_by_output',
      args: {
        pool_ids: pool_ids,
        input_token: input_token.id,
        output_token: output_token.id,
        output_amount: toNonDivisibleNumber(output_token.decimals, output_amount)
      }
    });
  };

  var list_history_orders = function list_history_orders(AccountId) {
    return refDCLSwapViewFunction({
      methodName: 'list_history_orders',
      args: {
        account_id: AccountId
      }
    });
  };
  var list_active_orders = function list_active_orders(AccountId) {
    return refDCLSwapViewFunction({
      methodName: 'list_active_orders',
      args: {
        account_id: AccountId
      }
    });
  };
  var get_order = /*#__PURE__*/function () {
    var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(order_id) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", refDCLSwapViewFunction({
                methodName: 'get_order',
                args: {
                  order_id: order_id
                }
              })["catch"](function () {
                throw NoOrderFound(order_id);
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function get_order(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var find_order = /*#__PURE__*/function () {
    var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref2) {
      var pool_id, point, AccountId;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pool_id = _ref2.pool_id, point = _ref2.point, AccountId = _ref2.AccountId;
              return _context2.abrupt("return", refDCLSwapViewFunction({
                methodName: 'find_order',
                args: {
                  account_id: AccountId,
                  pool_id: pool_id,
                  point: point
                }
              })["catch"](function () {
                throw NoOrderFound();
              }));
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function find_order(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  var cancel_order = /*#__PURE__*/function () {
    var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(order_id) {
      var order, transactions;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return get_order(order_id);
            case 2:
              order = _context3.sent;
              if (order.remain_amount) {
                _context3.next = 5;
                break;
              }
              throw OrderNoRemainedAmount;
            case 5:
              transactions = [{
                receiverId: exports.config.REF_DCL_SWAP_CONTRACT_ID,
                functionCalls: [{
                  methodName: 'cancel_order',
                  args: {
                    order_id: order_id,
                    amount: order.remain_amount
                  },
                  gas: '180000000000000'
                }]
              }];
              return _context3.abrupt("return", transactions);
            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function cancel_order(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();
  var claim_order = function claim_order(order_id) {
    var transactions = [{
      receiverId: exports.config.REF_DCL_SWAP_CONTRACT_ID,
      functionCalls: [{
        methodName: 'cancel_order',
        args: {
          order_id: order_id,
          amount: '0'
        },
        gas: '180000000000000'
      }]
    }];
    return transactions;
  };
  var get_pointorder_range = function get_pointorder_range(_ref5) {
    var pool_id = _ref5.pool_id,
      left_point = _ref5.left_point,
      right_point = _ref5.right_point;
    return refDCLSwapViewFunction({
      methodName: 'get_pointorder_range',
      args: {
        pool_id: pool_id,
        left_point: left_point || POINTLEFTRANGE,
        right_point: right_point || POINTRIGHTRANGE
      }
    });
  };

  exports.AccountIdMisMatch = AccountIdMisMatch;
  exports.CONSTANT_D = CONSTANT_D;
  exports.DCLInValid = DCLInValid;
  exports.DCLSwap = DCLSwap;
  exports.DCLSwapByInputOnBestPool = DCLSwapByInputOnBestPool;
  exports.DCLSwapGetStorageBalance = DCLSwapGetStorageBalance;
  exports.DCL_POOL_FEE_LIST = DCL_POOL_FEE_LIST;
  exports.DCL_POOL_SPLITER = DCL_POOL_SPLITER;
  exports.DefaultMainnetTokenList = DefaultMainnetTokenList;
  exports.DefaultTestnetTokenList = DefaultTestnetTokenList;
  exports.FEE_DIVISOR = FEE_DIVISOR;
  exports.InValidAccessKeyError = InValidAccessKeyError;
  exports.NEAR_META_DATA = NEAR_META_DATA;
  exports.NoAccountIdFound = NoAccountIdFound;
  exports.NoCredential = NoCredential;
  exports.NoFeeToPool = NoFeeToPool;
  exports.NoLocalSignerError = NoLocalSignerError;
  exports.NoOrderFound = NoOrderFound;
  exports.NoPoolError = NoPoolError;
  exports.NoPoolOnThisPair = NoPoolOnThisPair;
  exports.NoPuiblicKeyError = NoPuiblicKeyError;
  exports.NotLoginError = NotLoginError;
  exports.ONE_YOCTO_NEAR = ONE_YOCTO_NEAR;
  exports.ONLY_ZEROS = ONLY_ZEROS;
  exports.OrderNoRemainedAmount = OrderNoRemainedAmount;
  exports.POINTLEFTRANGE = POINTLEFTRANGE;
  exports.POINTRIGHTRANGE = POINTRIGHTRANGE;
  exports.RATED_POOL_LP_TOKEN_DECIMALS = RATED_POOL_LP_TOKEN_DECIMALS;
  exports.REPLACE_TOKENS = REPLACE_TOKENS;
  exports.STABLE_LP_TOKEN_DECIMALS = STABLE_LP_TOKEN_DECIMALS;
  exports.STORAGE_TO_REGISTER_WITH_MFT = STORAGE_TO_REGISTER_WITH_MFT;
  exports.SameInputTokenError = SameInputTokenError;
  exports.SlippageError = SlippageError;
  exports.SwapRouteError = SwapRouteError;
  exports.SwapWidget = SwapWidget;
  exports.TokenLinks = TokenLinks;
  exports.TokenNotExistError = TokenNotExistError;
  exports.WalletSelectorTransactions = WalletSelectorTransactions;
  exports.ZeroInputError = ZeroInputError;
  exports.calcStableSwapPriceImpact = calcStableSwapPriceImpact;
  exports.calc_d = calc_d;
  exports.calc_swap = calc_swap;
  exports.calc_y = calc_y;
  exports.calculateAmountReceived = calculateAmountReceived;
  exports.calculateExchangeRate = calculateExchangeRate;
  exports.calculateFeeCharge = calculateFeeCharge;
  exports.calculateFeePercent = calculateFeePercent;
  exports.calculateMarketPrice = calculateMarketPrice;
  exports.calculatePriceImpact = calculatePriceImpact;
  exports.calculateSmartRoutesV2PriceImpact = calculateSmartRoutesV2PriceImpact;
  exports.calculateSmartRoutingPriceImpact = calculateSmartRoutingPriceImpact;
  exports.cancel_order = cancel_order;
  exports.claim_order = claim_order;
  exports.convertToPercentDecimal = convertToPercentDecimal;
  exports.divide = divide;
  exports.estimateSwap = estimateSwap;
  exports.feeToPointDelta = feeToPointDelta;
  exports.fetchAllPools = fetchAllPools;
  exports.find_order = find_order;
  exports.formatError = formatError;
  exports.formatWithCommas = formatWithCommas;
  exports.ftGetBalance = ftGetBalance;
  exports.ftGetStorageBalance = ftGetStorageBalance;
  exports.ftGetTokenMetadata = ftGetTokenMetadata;
  exports.ftGetTokensMetadata = ftGetTokensMetadata;
  exports.ftViewFunction = ftViewFunction;
  exports.getAccountName = getAccountName;
  exports.getAccountNearBalance = getAccountNearBalance;
  exports.getAmount = getAmount;
  exports.getAvgFee = getAvgFee;
  exports.getConfig = getConfig;
  exports.getDCLPool = getDCLPool;
  exports.getDCLPoolId = getDCLPoolId;
  exports.getDefaultTokenList = getDefaultTokenList;
  exports.getExpectedOutputFromSwapTodos = getExpectedOutputFromSwapTodos;
  exports.getGas = getGas;
  exports.getGlobalWhitelist = getGlobalWhitelist;
  exports.getHybridStableSmart = getHybridStableSmart;
  exports.getKeyStore = getKeyStore;
  exports.getMax = getMax;
  exports.getMemorySigner = getMemorySigner;
  exports.getPointByPrice = getPointByPrice;
  exports.getPool = getPool;
  exports.getPoolAllocationPercents = getPoolAllocationPercents;
  exports.getPoolByIds = getPoolByIds;
  exports.getPoolEstimate = getPoolEstimate;
  exports.getPoolsByTokens = getPoolsByTokens;
  exports.getPriceImpact = getPriceImpact;
  exports.getRatedPoolDetail = getRatedPoolDetail;
  exports.getRefPools = getRefPools;
  exports.getSignedTransactionsByMemoryKey = getSignedTransactionsByMemoryKey;
  exports.getSimplePoolEstimate = getSimplePoolEstimate;
  exports.getStablePoolDecimal = getStablePoolDecimal;
  exports.getStablePoolEstimate = getStablePoolEstimate;
  exports.getStablePools = getStablePools;
  exports.getStablePoolsThisPair = getStablePoolsThisPair;
  exports.getSwappedAmount = getSwappedAmount;
  exports.getTotalPools = getTotalPools;
  exports.getUnRatedPoolDetail = getUnRatedPoolDetail;
  exports.getUserRegisteredTokens = getUserRegisteredTokens;
  exports.get_order = get_order;
  exports.get_pointorder_range = get_pointorder_range;
  exports.init_env = init_env;
  exports.instantSwap = instantSwap;
  exports.isMobile = isMobile;
  exports.isStablePool = isStablePool;
  exports.isStablePoolToken = isStablePoolToken;
  exports.listDCLPools = listDCLPools;
  exports.list_active_orders = list_active_orders;
  exports.list_history_orders = list_history_orders;
  exports.list_user_assets = list_user_assets;
  exports.multiply = multiply;
  exports.nearDepositTransaction = nearDepositTransaction;
  exports.nearWithdrawTransaction = nearWithdrawTransaction;
  exports.parsePool = parsePool;
  exports.percent = percent;
  exports.percentLess = percentLess;
  exports.percentOf = percentOf;
  exports.percentOfBigNumber = percentOfBigNumber;
  exports.pointToPrice = pointToPrice;
  exports.poolFormatter = poolFormatter;
  exports.priceToPoint = priceToPoint;
  exports.provider = provider;
  exports.quote = quote;
  exports.quote_by_output = quote_by_output;
  exports.refDCLSwapViewFunction = refDCLSwapViewFunction;
  exports.refFiViewFunction = refFiViewFunction;
  exports.registerAccountOnToken = registerAccountOnToken;
  exports.round = round;
  exports.scientificNotationToString = scientificNotationToString;
  exports.sendTransactionsByMemoryKey = sendTransactionsByMemoryKey;
  exports.separateRoutes = separateRoutes;
  exports.singlePoolSwap = singlePoolSwap;
  exports.subtraction = subtraction;
  exports.switchEnv = switchEnv;
  exports.symbolsArr = symbolsArr;
  exports.toInternationalCurrencySystemLongString = toInternationalCurrencySystemLongString;
  exports.toNonDivisibleNumber = toNonDivisibleNumber;
  exports.toPrecision = toPrecision;
  exports.toReadableNumber = toReadableNumber;
  exports.toRealSymbol = toRealSymbol;
  exports.transformTransactions = transformTransactions;
  exports.unNamedError = unNamedError;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ref-sdk.umd.development.js.map