
import mediator,{MediatorProps} from "./mediator";

const createMediator = () => mediator.install({});

const sub:any = createMediator();

function _typeof(obj) {
    let _typeof;
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps?:any) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var StorageClass = function (s?:any) {
  function StorageClass(s1?: any) {
    var storage =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : window.localStorage;

    _classCallCheck(this, StorageClass);

    this.storage = window.localStorage;
    this.namespace = "pro_";
    this.storage = storage;
  }

  _createClass(StorageClass, [{
    key: "config",
    value: function config(namespace) {
      if (namespace === false) {
        this.namespace = "";
        return;
      }

      if (namespace) {
        this.namespace = namespace;
      }
    }
  }, {
    key: "clearStorage",
    value: function clearStorage(option) {
      var res = {
        errMsg: "clearStorage:ok"
      };

      if (option) {
        var success = option.success,
            fail = option.fail,
            complete = option.complete;

        try {
          this.clearStorageSync();
          success && success(res);
          complete && complete(res);
        } catch (_unused) {
          var _res = {
            errMsg: "clearStorage:fail"
          };
          fail && fail(_res);
          complete && complete(_res);
          return Promise.reject(_res);
        }
      }

      return Promise.resolve(res);
    }
  }, {
    key: "clearStorageSync",
    value: function clearStorageSync() {
      var removedKeys:any = [];

      for (var i = 0; i < this.storage.length; i++) {
        var key = this.storage.key(i);

        if (!key) {
          continue;
        }

        var regexp = new RegExp("^".concat(this.namespace, ".+"), "i");

        if (!regexp.test(key)) {
          continue;
        }

        removedKeys.push(key);
      }

      for (var _key in removedKeys) {
        this.storage.removeItem(removedKeys[_key]);
        sub.publish(key, undefined);
      }
    }
  }, {
    key: "getStorage",
    value: function getStorage(option) {
      var key = option.key,
          success = option.success,
          fail = option.fail,
          complete = option.complete;
      var res = {
        errMsg: "getStorage:ok"
      };
      var successRes = {
        errMsg: "getStorage:ok",
        data: ""
      };

      var _this$getItem = this.getItem(key),
          result = _this$getItem.result,
          data = _this$getItem.data;

      if (result) {
        var val = data;
        successRes.data = val.value;
      } else {
        res.errMsg = "getStorage:fail data not found";
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }

      success && success(successRes);
      complete && complete(successRes);
      return Promise.resolve(successRes);
    }
  }, {
    key: "getStorageInfo",
    value: function getStorageInfo(option) {
      var res = {
        errMsg: "getStorageInfo:ok"
      };

      if (option) {
        var success = option.success,
            complete = option.complete,
            fail = option.fail;

        try {
          var info = this.getStorageInfoSync();
          success && success(info);
          complete && complete(res);
        } catch (_unused2) {
          fail && fail(res);
          complete && complete(res);
        }
      }

      return Promise.resolve(res);
    }
  }, {
    key: "getStorageInfoSync",
    value: function getStorageInfoSync() {
      return {
        keys: Object.keys(this.storage),
        limitSize: 0,
        currentSize: 0,
        keysLength: this.storage.length
      };
    }
  }, {
    key: "hasKey",
    value: function hasKey(key) {
      var res = this.getItem(key);
      return res.result;
    }
  }, {
    key: "isExpire",
    value: function isExpire(key) {
      var res = this.getItem(key);

      if (res.result) {
        var data = res.data;

        if (data.expire === null) {
          return false;
        }

        return data.expire < new Date().getTime();
      }

      return false;
    }
  }, {
    key: "key",
    value: function key(index) {
      return this.storage.key(index);
    }
  }, {
    key: "removeStorage",
    value: function removeStorage(option) {
      var key = option.key,
          success = option.success,
          fail = option.fail,
          complete = option.complete;
      var res = {
        errMsg: "removeStorage:ok"
      };

      if (!this.hasKey(key)) {
        res.errMsg = "key ".concat(key, " not exists !");
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }

      this.removeStorageSync(key);
      success && success(res);
      complete && complete(res);
      return Promise.resolve(res);
    }
  }, {
    key: "removeStorageSync",
    value: function removeStorageSync(key) {
      sub.publish(key, undefined);
      return this.storage.removeItem(this.getItemKey(key));
    }
  }, {
    key: "setStorage",
    value: function setStorage(option) {
      var key = option.key,
          data = option.data,
          success = option.success,
          fail = option.fail,
          complete = option.complete;
      var res = {
        errMsg: "setStorage:ok"
      };

      try {
        this.setStorageSync(key, data);

        if (this.hasKey(key)) {
          success && success(res);
          complete && complete(res);
          return Promise.resolve(res);
        } else {
          res.errMsg = "key ".concat(key, " setStorage2:fail");
          fail && fail(res);
          complete && complete(res);
          return Promise.reject(res);
        }
      } catch (e) {
        res.errMsg = "key ".concat(key, " setStorage:fail");
        fail && fail(res);
        complete && complete(res);
        return Promise.reject(res);
      }
    }
  }, {
    key: "setStorageSync",
    value: function setStorageSync(key, data, expire) {
      var storeData = {
        value: data,
        expire: expire ? new Date().getTime() + expire : null
      };
      var stringifyValue = JSON.stringify(storeData);
       // 防止重复发布
      // 被修改就发布事件
      sub.publish(key, data);
      this.storage.setItem(this.getItemKey(key), stringifyValue);
    }
  }, {
    key: "getItemKey",
    value: function getItemKey(key) {
      return this.namespace + key;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      try {
        var item;
        var data = this.storage.getItem(this.getItemKey(key));

        if (data !== null) {
          item = JSON.parse(data);
        }

        if (item && _typeof(item) === "object" && "expire" in item && "value" in item) {
          return {
            result: true,
            data: item
          };
        }
      } catch (e) {
        return {
          result: false
        };
      }

      return {
        result: false
      };
    }
  }, {
    key: "getStorageSync",
    value: function getStorageSync(key) {
      var res = this.getItem(key);

      if (res.result) {
        var data = res.data;

        if (!this.isExpire(key)) {
          return data.value;
        }
      }

      return undefined;
    }
  }]);

  return StorageClass;
}();

var StorageType;

(function (StorageType) {
  StorageType["Session"] = "session";
  StorageType["Local"] = "local";
  StorageType["WebSQL"] = "webSQL";
  StorageType["IndexDB"] = "indexDB";
})(StorageType || (StorageType = {}));

var webStorage = new StorageClass();

var useStorage = function useStorage() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  webStorage.config(namespace);
  return webStorage;
};

const createStorage = (options) => {
  var _options$namespace;

  var _options = {
    storage: (options === null || options === void 0 ? void 0 : options.storage) || StorageType.Local,
    namespace: (_options$namespace = options === null || options === void 0 ? void 0 : options.namespace) !== null && _options$namespace !== void 0 ? _options$namespace : "pro_"
  };

  if (typeof window === "undefined") {
    throw new Error("Vue3Storage: Storage \"".concat(_options.storage, "\" is not supported"));
  }

  var storage;

  switch (_options.storage) {
    case StorageType.Local:
      storage = window.localStorage;
      break;

    case StorageType.Session:
      storage = window.sessionStorage;
      break;

    default:
      throw new Error("Vue3Storage: Storage \"".concat(_options.storage, "\" is not supported yet"));
  }

  webStorage = new StorageClass(storage);
  webStorage.config(_options.namespace);
}

var useSubStorage = (key:string,callback:Function=()=>{}) => {
  sub.subscribe(key, (value) => callback(value));
}

export { StorageType, useStorage ,createStorage,useSubStorage, };
