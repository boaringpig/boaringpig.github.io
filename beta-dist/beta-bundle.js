var df = { exports: {} }, Ou = {};
var Pm;
function E0() {
  if (Pm) return Ou;
  Pm = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, h) {
    var E = null;
    if (h !== void 0 && (E = "" + h), v.key !== void 0 && (E = "" + v.key), "key" in v) {
      h = {};
      for (var C in v)
        C !== "key" && (h[C] = v[C]);
    } else h = v;
    return v = h.ref, {
      $$typeof: s,
      type: o,
      key: E,
      ref: v !== void 0 ? v : null,
      props: h
    };
  }
  return Ou.Fragment = r, Ou.jsx = d, Ou.jsxs = d, Ou;
}
var eh;
function A0() {
  return eh || (eh = 1, df.exports = E0()), df.exports;
}
var i = A0(), vf = { exports: {} }, Mu = {}, mf = { exports: {} }, hf = {};
var th;
function w0() {
  return th || (th = 1, function(s) {
    function r(B, H) {
      var G = B.length;
      B.push(H);
      e: for (; 0 < G; ) {
        var ie = G - 1 >>> 1, ve = B[ie];
        if (0 < v(ve, H))
          B[ie] = H, B[G] = ve, G = ie;
        else break e;
      }
    }
    function d(B) {
      return B.length === 0 ? null : B[0];
    }
    function o(B) {
      if (B.length === 0) return null;
      var H = B[0], G = B.pop();
      if (G !== H) {
        B[0] = G;
        e: for (var ie = 0, ve = B.length, st = ve >>> 1; ie < st; ) {
          var ma = 2 * (ie + 1) - 1, fl = B[ma], y = ma + 1, U = B[y];
          if (0 > v(fl, G))
            y < ve && 0 > v(U, fl) ? (B[ie] = U, B[y] = G, ie = y) : (B[ie] = fl, B[ma] = G, ie = ma);
          else if (y < ve && 0 > v(U, G))
            B[ie] = U, B[y] = G, ie = y;
          else break e;
        }
      }
      return H;
    }
    function v(B, H) {
      var G = B.sortIndex - H.sortIndex;
      return G !== 0 ? G : B.id - H.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      s.unstable_now = function() {
        return h.now();
      };
    } else {
      var E = Date, C = E.now();
      s.unstable_now = function() {
        return E.now() - C;
      };
    }
    var z = [], D = [], A = 1, b = null, T = 3, R = !1, Y = !1, $ = !1, V = !1, k = typeof setTimeout == "function" ? setTimeout : null, I = typeof clearTimeout == "function" ? clearTimeout : null, ee = typeof setImmediate < "u" ? setImmediate : null;
    function ge(B) {
      for (var H = d(D); H !== null; ) {
        if (H.callback === null) o(D);
        else if (H.startTime <= B)
          o(D), H.sortIndex = H.expirationTime, r(z, H);
        else break;
        H = d(D);
      }
    }
    function Ie(B) {
      if ($ = !1, ge(B), !Y)
        if (d(z) !== null)
          Y = !0, Le || (Le = !0, Je());
        else {
          var H = d(D);
          H !== null && Be(Ie, H.startTime - B);
        }
    }
    var Le = !1, le = -1, Z = 5, Ze = -1;
    function Pe() {
      return V ? !0 : !(s.unstable_now() - Ze < Z);
    }
    function ze() {
      if (V = !1, Le) {
        var B = s.unstable_now();
        Ze = B;
        var H = !0;
        try {
          e: {
            Y = !1, $ && ($ = !1, I(le), le = -1), R = !0;
            var G = T;
            try {
              t: {
                for (ge(B), b = d(z); b !== null && !(b.expirationTime > B && Pe()); ) {
                  var ie = b.callback;
                  if (typeof ie == "function") {
                    b.callback = null, T = b.priorityLevel;
                    var ve = ie(
                      b.expirationTime <= B
                    );
                    if (B = s.unstable_now(), typeof ve == "function") {
                      b.callback = ve, ge(B), H = !0;
                      break t;
                    }
                    b === d(z) && o(z), ge(B);
                  } else o(z);
                  b = d(z);
                }
                if (b !== null) H = !0;
                else {
                  var st = d(D);
                  st !== null && Be(
                    Ie,
                    st.startTime - B
                  ), H = !1;
                }
              }
              break e;
            } finally {
              b = null, T = G, R = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Je() : Le = !1;
        }
      }
    }
    var Je;
    if (typeof ee == "function")
      Je = function() {
        ee(ze);
      };
    else if (typeof MessageChannel < "u") {
      var xt = new MessageChannel(), va = xt.port2;
      xt.port1.onmessage = ze, Je = function() {
        va.postMessage(null);
      };
    } else
      Je = function() {
        k(ze, 0);
      };
    function Be(B, H) {
      le = k(function() {
        B(s.unstable_now());
      }, H);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, s.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Z = 0 < B ? Math.floor(1e3 / B) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return T;
    }, s.unstable_next = function(B) {
      switch (T) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = T;
      }
      var G = T;
      T = H;
      try {
        return B();
      } finally {
        T = G;
      }
    }, s.unstable_requestPaint = function() {
      V = !0;
    }, s.unstable_runWithPriority = function(B, H) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var G = T;
      T = B;
      try {
        return H();
      } finally {
        T = G;
      }
    }, s.unstable_scheduleCallback = function(B, H, G) {
      var ie = s.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? ie + G : ie) : G = ie, B) {
        case 1:
          var ve = -1;
          break;
        case 2:
          ve = 250;
          break;
        case 5:
          ve = 1073741823;
          break;
        case 4:
          ve = 1e4;
          break;
        default:
          ve = 5e3;
      }
      return ve = G + ve, B = {
        id: A++,
        callback: H,
        priorityLevel: B,
        startTime: G,
        expirationTime: ve,
        sortIndex: -1
      }, G > ie ? (B.sortIndex = G, r(D, B), d(z) === null && B === d(D) && ($ ? (I(le), le = -1) : $ = !0, Be(Ie, G - ie))) : (B.sortIndex = ve, r(z, B), Y || R || (Y = !0, Le || (Le = !0, Je()))), B;
    }, s.unstable_shouldYield = Pe, s.unstable_wrapCallback = function(B) {
      var H = T;
      return function() {
        var G = T;
        T = H;
        try {
          return B.apply(this, arguments);
        } finally {
          T = G;
        }
      };
    };
  }(hf)), hf;
}
var ah;
function z0() {
  return ah || (ah = 1, mf.exports = w0()), mf.exports;
}
var gf = { exports: {} }, ae = {};
var lh;
function C0() {
  if (lh) return ae;
  lh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), E = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), T = Symbol.for("react.view_transition"), R = Symbol.iterator;
  function Y(y) {
    return y === null || typeof y != "object" ? null : (y = R && y[R] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var $ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, k = {};
  function I(y, U, F) {
    this.props = y, this.context = U, this.refs = k, this.updater = F || $;
  }
  I.prototype.isReactComponent = {}, I.prototype.setState = function(y, U) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, U, "setState");
  }, I.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function ee() {
  }
  ee.prototype = I.prototype;
  function ge(y, U, F) {
    this.props = y, this.context = U, this.refs = k, this.updater = F || $;
  }
  var Ie = ge.prototype = new ee();
  Ie.constructor = ge, V(Ie, I.prototype), Ie.isPureReactComponent = !0;
  var Le = Array.isArray;
  function le() {
  }
  var Z = { H: null, A: null, T: null, S: null }, Ze = Object.prototype.hasOwnProperty;
  function Pe(y, U, F) {
    var W = F.ref;
    return {
      $$typeof: s,
      type: y,
      key: U,
      ref: W !== void 0 ? W : null,
      props: F
    };
  }
  function ze(y, U) {
    return Pe(y.type, U, y.props);
  }
  function Je(y) {
    return typeof y == "object" && y !== null && y.$$typeof === s;
  }
  function xt(y) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(F) {
      return U[F];
    });
  }
  var va = /\/+/g;
  function Be(y, U) {
    return typeof y == "object" && y !== null && y.key != null ? xt("" + y.key) : U.toString(36);
  }
  function B(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(le, le) : (y.status = "pending", y.then(
          function(U) {
            y.status === "pending" && (y.status = "fulfilled", y.value = U);
          },
          function(U) {
            y.status === "pending" && (y.status = "rejected", y.reason = U);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function H(y, U, F, W, he) {
    var ye = typeof y;
    (ye === "undefined" || ye === "boolean") && (y = null);
    var Se = !1;
    if (y === null) Se = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          Se = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case s:
            case r:
              Se = !0;
              break;
            case A:
              return Se = y._init, H(
                Se(y._payload),
                U,
                F,
                W,
                he
              );
          }
      }
    if (Se)
      return he = he(y), Se = W === "" ? "." + Be(y, 0) : W, Le(he) ? (F = "", Se != null && (F = Se.replace(va, "$&/") + "/"), H(he, U, F, "", function(ha) {
        return ha;
      })) : he != null && (Je(he) && (he = ze(
        he,
        F + (he.key == null || y && y.key === he.key ? "" : ("" + he.key).replace(
          va,
          "$&/"
        ) + "/") + Se
      )), U.push(he)), 1;
    Se = 0;
    var K = W === "" ? "." : W + ":";
    if (Le(y))
      for (var te = 0; te < y.length; te++)
        W = y[te], ye = K + Be(W, te), Se += H(
          W,
          U,
          F,
          ye,
          he
        );
    else if (te = Y(y), typeof te == "function")
      for (y = te.call(y), te = 0; !(W = y.next()).done; )
        W = W.value, ye = K + Be(W, te++), Se += H(
          W,
          U,
          F,
          ye,
          he
        );
    else if (ye === "object") {
      if (typeof y.then == "function")
        return H(
          B(y),
          U,
          F,
          W,
          he
        );
      throw U = String(y), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Se;
  }
  function G(y, U, F) {
    if (y == null) return y;
    var W = [], he = 0;
    return H(y, W, "", "", function(ye) {
      return U.call(F, ye, he++);
    }), W;
  }
  function ie(y) {
    if (y._status === -1) {
      var U = y._result, F = U();
      F.then(
        function(W) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = W, F.status === void 0 && (F.status = "fulfilled", F.value = W));
        },
        function(W) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = W, F.status === void 0 && (F.status = "rejected", F.reason = W));
        }
      ), y._status === -1 && (y._status = 0, y._result = F);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  };
  function st(y) {
    var U = Z.T, F = {};
    F.types = U !== null ? U.types : null, Z.T = F;
    try {
      var W = y(), he = Z.S;
      he !== null && he(F, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then(le, ve);
    } catch (ye) {
      ve(ye);
    } finally {
      U !== null && F.types !== null && (U.types = F.types), Z.T = U;
    }
  }
  function ma(y) {
    var U = Z.T;
    if (U !== null) {
      var F = U.types;
      F === null ? U.types = [y] : F.indexOf(y) === -1 && F.push(y);
    } else st(ma.bind(null, y));
  }
  var fl = {
    map: G,
    forEach: function(y, U, F) {
      G(
        y,
        function() {
          U.apply(this, arguments);
        },
        F
      );
    },
    count: function(y) {
      var U = 0;
      return G(y, function() {
        U++;
      }), U;
    },
    toArray: function(y) {
      return G(y, function(U) {
        return U;
      }) || [];
    },
    only: function(y) {
      if (!Je(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return ae.Activity = b, ae.Children = fl, ae.Component = I, ae.Fragment = d, ae.Profiler = v, ae.PureComponent = ge, ae.StrictMode = o, ae.Suspense = z, ae.ViewTransition = T, ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return Z.H.useMemoCache(y);
    }
  }, ae.addTransitionType = ma, ae.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, ae.cacheSignal = function() {
    return null;
  }, ae.cloneElement = function(y, U, F) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var W = V({}, y.props), he = y.key;
    if (U != null)
      for (ye in U.key !== void 0 && (he = "" + U.key), U)
        !Ze.call(U, ye) || ye === "key" || ye === "__self" || ye === "__source" || ye === "ref" && U.ref === void 0 || (W[ye] = U[ye]);
    var ye = arguments.length - 2;
    if (ye === 1) W.children = F;
    else if (1 < ye) {
      for (var Se = Array(ye), K = 0; K < ye; K++)
        Se[K] = arguments[K + 2];
      W.children = Se;
    }
    return Pe(y.type, he, W);
  }, ae.createContext = function(y) {
    return y = {
      $$typeof: E,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: h,
      _context: y
    }, y;
  }, ae.createElement = function(y, U, F) {
    var W, he = {}, ye = null;
    if (U != null)
      for (W in U.key !== void 0 && (ye = "" + U.key), U)
        Ze.call(U, W) && W !== "key" && W !== "__self" && W !== "__source" && (he[W] = U[W]);
    var Se = arguments.length - 2;
    if (Se === 1) he.children = F;
    else if (1 < Se) {
      for (var K = Array(Se), te = 0; te < Se; te++)
        K[te] = arguments[te + 2];
      he.children = K;
    }
    if (y && y.defaultProps)
      for (W in Se = y.defaultProps, Se)
        he[W] === void 0 && (he[W] = Se[W]);
    return Pe(y, ye, he);
  }, ae.createRef = function() {
    return { current: null };
  }, ae.forwardRef = function(y) {
    return { $$typeof: C, render: y };
  }, ae.isValidElement = Je, ae.lazy = function(y) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: y },
      _init: ie
    };
  }, ae.memo = function(y, U) {
    return {
      $$typeof: D,
      type: y,
      compare: U === void 0 ? null : U
    };
  }, ae.startTransition = st, ae.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, ae.use = function(y) {
    return Z.H.use(y);
  }, ae.useActionState = function(y, U, F) {
    return Z.H.useActionState(y, U, F);
  }, ae.useCallback = function(y, U) {
    return Z.H.useCallback(y, U);
  }, ae.useContext = function(y) {
    return Z.H.useContext(y);
  }, ae.useDebugValue = function() {
  }, ae.useDeferredValue = function(y, U) {
    return Z.H.useDeferredValue(y, U);
  }, ae.useEffect = function(y, U) {
    return Z.H.useEffect(y, U);
  }, ae.useEffectEvent = function(y) {
    return Z.H.useEffectEvent(y);
  }, ae.useId = function() {
    return Z.H.useId();
  }, ae.useImperativeHandle = function(y, U, F) {
    return Z.H.useImperativeHandle(y, U, F);
  }, ae.useInsertionEffect = function(y, U) {
    return Z.H.useInsertionEffect(y, U);
  }, ae.useLayoutEffect = function(y, U) {
    return Z.H.useLayoutEffect(y, U);
  }, ae.useMemo = function(y, U) {
    return Z.H.useMemo(y, U);
  }, ae.useOptimistic = function(y, U) {
    return Z.H.useOptimistic(y, U);
  }, ae.useReducer = function(y, U, F) {
    return Z.H.useReducer(y, U, F);
  }, ae.useRef = function(y) {
    return Z.H.useRef(y);
  }, ae.useState = function(y) {
    return Z.H.useState(y);
  }, ae.useSyncExternalStore = function(y, U, F) {
    return Z.H.useSyncExternalStore(
      y,
      U,
      F
    );
  }, ae.useTransition = function() {
    return Z.H.useTransition();
  }, ae.version = "19.3.1", ae;
}
var nh;
function Nf() {
  return nh || (nh = 1, gf.exports = C0()), gf.exports;
}
var yf = { exports: {} }, ct = {};
var uh;
function D0() {
  if (uh) return ct;
  uh = 1;
  var s = Nf();
  function r(A) {
    var b = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var T = 2; T < arguments.length; T++)
        b += "&args[]=" + encodeURIComponent(arguments[T]);
    }
    return "Minified React error #" + A + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var o = {
    d: {
      f: d,
      r: function() {
        throw Error(r(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, v = Symbol.for("react.portal"), h = Symbol.for("react.recoverable"), E = Symbol.for("react.optimistic_key");
  function C(A, b, T) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: R == null ? null : R === E ? E : "" + R,
      children: A,
      containerInfo: b,
      implementation: T
    };
  }
  var z = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(A, b) {
    if (A === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ct.browser = function(A) {
    return { $$typeof: h, _reason: A };
  }, ct.createPortal = function(A, b) {
    var T = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(r(299));
    return C(A, b, null, T);
  }, ct.flushSync = function(A) {
    var b = z.T, T = o.p;
    try {
      if (z.T = null, o.p = 2, A) return A();
    } finally {
      z.T = b, o.p = T, o.d.f();
    }
  }, ct.preconnect = function(A, b) {
    typeof A == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, o.d.C(A, b));
  }, ct.prefetchDNS = function(A) {
    typeof A == "string" && o.d.D(A);
  }, ct.preinit = function(A, b) {
    if (typeof A == "string" && b && typeof b.as == "string") {
      var T = b.as, R = D(T, b.crossOrigin), Y = typeof b.integrity == "string" ? b.integrity : void 0, $ = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      T === "style" ? o.d.S(
        A,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: R,
          integrity: Y,
          fetchPriority: $
        }
      ) : T === "script" && o.d.X(A, {
        crossOrigin: R,
        integrity: Y,
        fetchPriority: $,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, ct.preinitModule = function(A, b) {
    if (typeof A == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var T = D(
            b.as,
            b.crossOrigin
          );
          o.d.M(A, {
            crossOrigin: T,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
            nonce: typeof b.nonce == "string" ? b.nonce : void 0,
            fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0
          });
        }
      } else b == null && o.d.M(A);
  }, ct.preload = function(A, b) {
    if (typeof A == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var T = b.as, R = D(T, b.crossOrigin);
      o.d.L(A, T, {
        crossOrigin: R,
        integrity: typeof b.integrity == "string" ? b.integrity : void 0,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0,
        type: typeof b.type == "string" ? b.type : void 0,
        fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
        referrerPolicy: typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
        imageSrcSet: typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
        imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
        media: typeof b.media == "string" ? b.media : void 0
      });
    }
  }, ct.preloadModule = function(A, b) {
    if (typeof A == "string")
      if (b) {
        var T = D(b.as, b.crossOrigin);
        o.d.m(A, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: T,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0,
          nonce: typeof b.nonce == "string" ? b.nonce : void 0,
          fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0
        });
      } else o.d.m(A);
  }, ct.requestFormReset = function(A) {
    o.d.r(A);
  }, ct.unstable_batchedUpdates = function(A, b) {
    return A(b);
  }, ct.useFormState = function(A, b, T) {
    return z.H.useFormState(A, b, T);
  }, ct.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, ct.version = "19.3.1", ct;
}
var ih;
function O0() {
  if (ih) return yf.exports;
  ih = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), yf.exports = D0(), yf.exports;
}
var ch;
function M0() {
  if (ch) return Mu;
  ch = 1;
  var s = z0(), r = Nf(), d = O0();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
    for (var t = e, a = t; a && !a.alternate; )
      t = a, (t.flags & 4098) !== 0 && (e = t.return), a = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? e : null;
  }
  function E(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function C(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function z(e) {
    if (h(e) !== e)
      throw Error(o(188));
  }
  function D(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
      var n = a.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (l = n.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === a) return z(n), e;
          if (u === l) return z(n), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (a.return !== l.return) a = n, l = u;
      else {
        for (var c = !1, f = n.child; f; ) {
          if (f === a) {
            c = !0, a = n, l = u;
            break;
          }
          if (f === l) {
            c = !0, l = n, a = u;
            break;
          }
          f = f.sibling;
        }
        if (!c) {
          for (f = u.child; f; ) {
            if (f === a) {
              c = !0, a = u, l = n;
              break;
            }
            if (f === l) {
              c = !0, l = u, a = n;
              break;
            }
            f = f.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (a.alternate !== l) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : t;
  }
  function A(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = A(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function b(e, t, a, l, n, u) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && a(e, l, n, u) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && b(
        e.child,
        t,
        a,
        l,
        n,
        u
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function T(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function R(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function Y(e) {
    var t = [null, null], a = T(e);
    return a === null || $(
      t,
      e,
      a.child,
      { foundSelf: !1 }
    ), t;
  }
  function $(e, t, a, l) {
    for (; a !== null; ) {
      if (a === t) l.foundSelf = !0;
      else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
        if (l.foundSelf) return e[1] = a, !0;
        e[0] = a;
      } else if ((a.tag !== 22 || a.memoizedState === null) && $(
        e,
        t,
        a.child,
        l
      ))
        return !0;
      a = a.sibling;
    }
    return !1;
  }
  function V(e) {
    switch (e.tag) {
      case 5:
      case 27:
      case 6:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(o(559));
    }
  }
  var k = null, I = null;
  function ee(e, t, a) {
    return e === a ? !0 : e === t ? (k = e, !0) : !1;
  }
  function ge(e, t, a) {
    return e === a ? (I = e, !1) : e === t ? (I !== null && (k = e), !0) : !1;
  }
  function Ie(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function Le(e, t, a) {
    for (var l = 0, n = e; n; n = a(n)) l++;
    n = 0;
    for (var u = t; u; u = a(u)) n++;
    for (; 0 < l - n; ) e = a(e), l--;
    for (; 0 < n - l; ) t = a(t), n--;
    for (; l--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = a(e), t = a(t);
    }
    return null;
  }
  var le = Object.assign, Z = Symbol.for("react.element"), Ze = Symbol.for("react.transitional.element"), Pe = Symbol.for("react.portal"), ze = Symbol.for("react.fragment"), Je = Symbol.for("react.strict_mode"), xt = Symbol.for("react.profiler"), va = Symbol.for("react.consumer"), Be = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), H = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), st = Symbol.for("react.activity"), ma = Symbol.for("react.legacy_hidden"), fl = Symbol.for("react.memo_cache_sentinel"), y = Symbol.for("react.view_transition"), U = Symbol.for("react.recoverable"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var he = Symbol.for("react.client.reference");
  function ye(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === he ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ze:
        return "Fragment";
      case xt:
        return "Profiler";
      case Je:
        return "StrictMode";
      case H:
        return "Suspense";
      case G:
        return "SuspenseList";
      case st:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Pe:
          return "Portal";
        case Be:
          return e.displayName || "Context";
        case va:
          return (e._context.displayName || "Context") + ".Consumer";
        case B:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return t = e.displayName || null, t !== null ? t : ye(e.type) || "Memo";
        case ve:
          t = e._payload, e = e._init;
          try {
            return ye(e(t));
          } catch {
          }
      }
    return null;
  }
  var Se = Array.isArray, K = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ha = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Cc = [], Hl = -1;
  function ea(e) {
    return { current: e };
  }
  function et(e) {
    0 > Hl || (e.current = Cc[Hl], Cc[Hl] = null, Hl--);
  }
  function Ce(e, t) {
    Hl++, Cc[Hl] = e.current, e.current = t;
  }
  var ta = ea(null), Ln = ea(null), Ra = ea(null), Ku = ea(null);
  function Ju(e, t) {
    switch (Ce(Ra, t), Ce(Ln, e), Ce(ta, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? sm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = sm(t), e = rm(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    et(ta), Ce(ta, e);
  }
  function ql() {
    et(ta), et(Ln), et(Ra);
  }
  function Dc(e) {
    var t = e.memoizedState;
    t !== null && (Nn._currentValue = t.memoizedState, Ce(Ku, e)), t = ta.current;
    var a = rm(t, e.type);
    t !== a && (Ce(Ln, e), Ce(ta, a));
  }
  function $u(e) {
    Ln.current === e && (et(ta), et(Ln)), Ku.current === e && (et(Ku), Nn._currentValue = ha);
  }
  var Oc, wf;
  function Ua(e) {
    if (Oc === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Oc = t && t[1] || "", wf = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Oc + e + wf;
  }
  var Mc = !1;
  function Rc(e, t) {
    if (!e || Mc) return "";
    Mc = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (q) {
                  var _ = q;
                }
                Reflect.construct(e, [], M);
              } else {
                try {
                  M.call();
                } catch (q) {
                  _ = q;
                }
                M = !1;
                try {
                  var j = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), M = !0, new e();
                } finally {
                  M && (j !== void 0 ? Object.defineProperty(e.prototype, "props", j) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                _ = q;
              }
              (M = e()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (q) {
            if (q && _ && typeof q.stack == "string")
              return [q.stack, _.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = l.DetermineComponentFrameRoot(), c = u[0], f = u[1];
      if (c && f) {
        var m = c.split(`
`), S = f.split(`
`);
        for (n = l = 0; l < m.length && !m[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < S.length && !S[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === m.length || n === S.length)
          for (l = m.length - 1, n = S.length - 1; 1 <= l && 0 <= n && m[l] !== S[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (m[l] !== S[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || m[l] !== S[n]) {
                  var N = `
` + m[l].replace(" at new ", " at ");
                  return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), N;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Mc = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ua(a) : "";
  }
  function Ch(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ua(e.type);
      case 16:
        return Ua("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ua("Suspense Fallback") : Ua("Suspense");
      case 19:
        return Ua("SuspenseList");
      case 0:
      case 15:
        return Rc(e.type, !1);
      case 11:
        return Rc(e.type.render, !1);
      case 1:
        return Rc(e.type, !0);
      case 31:
        return Ua("Activity");
      case 30:
        return Ua("ViewTransition");
      default:
        return "";
    }
  }
  function zf(e) {
    try {
      var t = "", a = null;
      do
        t += Ch(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Uc = Object.prototype.hasOwnProperty, Hc = s.unstable_scheduleCallback, qc = s.unstable_cancelCallback, Dh = s.unstable_shouldYield, Oh = s.unstable_requestPaint, jt = s.unstable_now, Mh = s.unstable_getCurrentPriorityLevel, Cf = s.unstable_ImmediatePriority, Df = s.unstable_UserBlockingPriority, ku = s.unstable_NormalPriority, Rh = s.unstable_LowPriority, Of = s.unstable_IdlePriority, Uh = s.log, Hh = s.unstable_setDisableYieldValue, Bn = null, Tt = null;
  function Ha(e) {
    if (typeof Uh == "function" && Hh(e), Tt && typeof Tt.setStrictMode == "function")
      try {
        Tt.setStrictMode(Bn, e);
      } catch {
      }
  }
  var Nt = Math.clz32 ? Math.clz32 : Bh, qh = Math.log, Lh = Math.LN2;
  function Bh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (qh(e) / Lh | 0) | 0;
  }
  var Fu = 256, Wu = 262144, Iu = 4194304;
  function ol(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & -e;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Pu(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = ol(l) : (c &= f, c !== 0 ? n = ol(c) : a || (a = f & ~e, a !== 0 && (n = ol(a))))) : (f = l & ~u, f !== 0 ? n = ol(f) : c !== 0 ? n = ol(c) : a || (a = l & ~e, a !== 0 && (n = ol(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Yn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mf(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - Nt(a), n = 1 << l;
        t |= e[l], a &= ~n;
      }
    return t;
  }
  function Yh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Rf() {
    var e = Iu;
    return Iu <<= 1, (Iu & 62914560) === 0 && (Iu = 4194304), e;
  }
  function Lc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Gn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Gh(e, t, a, l, n, u) {
    var c = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, m = e.expirationTimes, S = e.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var N = 31 - Nt(a), M = 1 << N;
      f[N] = 0, m[N] = -1;
      var _ = S[N];
      if (_ !== null)
        for (S[N] = null, N = 0; N < _.length; N++) {
          var j = _[N];
          j !== null && (j.lane &= -536870913);
        }
      a &= ~M;
    }
    l !== 0 && Uf(e, l, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function Uf(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Nt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Hf(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - Nt(a), n = 1 << l;
      n & t | e[l] & t && (e[l] |= t), a &= ~n;
    }
  }
  function qf(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Bc(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Bc(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Yc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Lf() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Km(e.type));
  }
  function Bf(e, t) {
    var a = te.p;
    try {
      return te.p = e, t();
    } finally {
      te.p = a;
    }
  }
  var ga = Math.random().toString(36).slice(2), tt = "__reactFiber$" + ga, gt = "__reactProps$" + ga, Ll = "__reactContainer$" + ga, Yf = "__reactEvents$" + ga, Xh = "__reactListeners$" + ga, Qh = "__reactHandles$" + ga, Gf = "__reactResources$" + ga, Xn = "__reactMarker$" + ga, ei = "__reactLoad$" + ga;
  function ti(e) {
    delete e[tt], delete e[gt], delete e[Xh], delete e[Qh];
  }
  function dl(e) {
    var t;
    if (t = e[tt]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Ll] || a[tt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Em(e); e !== null; ) {
            if (a = e[tt]) return a;
            e = Em(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Bl(e) {
    if (e = e[tt] || e[Ll]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Qn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Yl(e) {
    var t = e[Gf];
    return t || (t = e[Gf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function $e(e) {
    e[Xn] = !0;
  }
  function Xf(e) {
    e[ei] = void 0;
  }
  var Qf = /* @__PURE__ */ new Set(), Zf = {};
  function vl(e, t) {
    Gl(e, t), Gl(e + "Capture", t);
  }
  function Gl(e, t) {
    for (Zf[e] = t, e = 0; e < t.length; e++)
      Qf.add(t[e]);
  }
  var Zh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Vf = {}, Kf = {};
  function Vh(e) {
    return Uc.call(Kf, e) ? !0 : Uc.call(Vf, e) ? !1 : Zh.test(e) ? Kf[e] = !0 : (Vf[e] = !0, !1);
  }
  var _e = !1;
  function Jf() {
    var e = _e;
    return _e = !1, e;
  }
  function ai(e, t, a) {
    if (Vh(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, a);
      }
  }
  function li(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, a);
    }
  }
  function ya(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, l);
    }
  }
  function Et(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function $f(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Kh(e, t, a) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var n = l.get, u = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(c) {
          a = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(c) {
          a = "" + c;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Gc(e) {
    if (!e._valueTracker) {
      var t = $f(e) ? "checked" : "value";
      e._valueTracker = Kh(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function kf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = $f(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  var Jh = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(
      Jh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Xc(e, t, a, l, n, u, c, f) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Et(t)) : e.value !== "" + Et(t) && (e.value = "" + Et(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? c === "number" && e.value == t ? Qc(e, Et(e.value)) : Qc(e, Et(t)) : a != null ? Qc(e, Et(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + Et(f) : e.removeAttribute("name");
  }
  function Ff(e, t, a, l, n, u, c, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Gc(e);
        return;
      }
      a = a != null ? "" + Et(a) : "", t = t != null ? "" + Et(t) : a, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = f ? e.checked : !!l, e.defaultChecked = !!l, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), Gc(e);
  }
  function Qc(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function Xl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++)
        t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Et(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          e[n].selected = !0, l && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Wf(e, t, a) {
    if (t != null && (t = "" + Et(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Et(a) : "";
  }
  function If(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (Se(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = Et(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Gc(e);
  }
  function Ql(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var $h = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Pf(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || $h.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function eo(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", _e = !0);
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (Pf(e, n, l), _e = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Pf(e, u, t[u]);
  }
  function Zc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var kh = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Fh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ni(e) {
    return Fh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function aa() {
  }
  var Vc = null;
  function Kc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Zl = null, Vl = null;
  function to(e) {
    var t = Bl(e);
    if (t && (e = t.stateNode)) {
      var a = e[gt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Xc(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Rt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[gt] || null;
                if (!n) throw Error(o(90));
                Xc(
                  l,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              l = a[t], l.form === e.form && kf(l);
          }
          break e;
        case "textarea":
          Wf(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Xl(e, !!a.multiple, t, !1);
      }
    }
  }
  var Jc = !1;
  function ao(e, t, a) {
    if (Jc) return e(t, a);
    Jc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Jc = !1, (Zl !== null || Vl !== null) && (nc(), Zl && (t = Zl, e = Vl, Vl = Zl = null, to(t), e)))
        for (t = 0; t < e.length; t++) to(e[t]);
    }
  }
  function Zn(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[gt] || null;
    if (l === null) return null;
    a = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        o(231, t, typeof a)
      );
    return a;
  }
  var _a = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $c = !1;
  if (_a)
    try {
      var Vn = {};
      Object.defineProperty(Vn, "passive", {
        get: function() {
          $c = !0;
        }
      }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
    } catch {
      $c = !1;
    }
  var qa = null, kc = null, ui = null;
  function lo() {
    if (ui) return ui;
    var e, t = kc, a = t.length, l, n = "value" in qa ? qa.value : qa.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var c = a - e;
    for (l = 1; l <= c && t[a - l] === n[u - l]; l++) ;
    return ui = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function ii(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ci() {
    return !0;
  }
  function no() {
    return !1;
  }
  function ot(e) {
    function t(a, l, n, u, c) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (a = e[f], this[f] = a ? a(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ci : no, this.isPropagationStopped = no, this;
    }
    return le(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ci);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ci);
      },
      persist: function() {
      },
      isPersistent: ci
    }), t;
  }
  var La = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, si = ot(La), Kn = le({}, La, { view: 0, detail: 0 }), Wh = ot(Kn), Fc, Wc, Jn, ri = le({}, Kn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Pc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Jn && (Jn && e.type === "mousemove" ? (Fc = e.screenX - Jn.screenX, Wc = e.screenY - Jn.screenY) : Wc = Fc = 0, Jn = e), Fc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Wc;
    }
  }), uo = ot(ri), Ih = le({}, ri, { dataTransfer: 0 }), Ph = ot(Ih), eg = le({}, Kn, { relatedTarget: 0 }), Ic = ot(eg), tg = le({}, La, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ag = ot(tg), lg = le({}, La, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ng = ot(lg), ug = le({}, La, { data: 0 }), io = ot(ug), ig = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, cg = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, sg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function rg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = sg[e]) ? !!t[e] : !1;
  }
  function Pc() {
    return rg;
  }
  var fg = le({}, Kn, {
    key: function(e) {
      if (e.key) {
        var t = ig[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ii(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pc,
    charCode: function(e) {
      return e.type === "keypress" ? ii(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ii(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), og = ot(fg), dg = le({}, ri, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), co = ot(dg), vg = le({}, La, { submitter: 0 }), mg = ot(vg), hg = le({}, Kn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pc
  }), gg = ot(hg), yg = le({}, La, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _g = ot(yg), pg = le({}, ri, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Sg = ot(pg), bg = le({}, La, {
    newState: 0,
    oldState: 0,
    source: 0
  }), xg = ot(bg), jg = [9, 13, 27, 32], es = _a && "CompositionEvent" in window, $n = null;
  _a && "documentMode" in document && ($n = document.documentMode);
  var Tg = _a && "TextEvent" in window && !$n, so = _a && (!es || $n && 8 < $n && 11 >= $n), ro = " ", fo = !1;
  function oo(e, t) {
    switch (e) {
      case "keyup":
        return jg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function vo(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Kl = !1;
  function Ng(e, t) {
    switch (e) {
      case "compositionend":
        return vo(t);
      case "keypress":
        return t.which !== 32 ? null : (fo = !0, ro);
      case "textInput":
        return e = t.data, e === ro && fo ? null : e;
      default:
        return null;
    }
  }
  function Eg(e, t) {
    if (Kl)
      return e === "compositionend" || !es && oo(e, t) ? (e = lo(), ui = kc = qa = null, Kl = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return so && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ag = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function mo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Ag[e.type] : t === "textarea";
  }
  function ho(e, t, a, l) {
    Zl ? Vl ? Vl.push(l) : Vl = [l] : Zl = l, t = fc(t, "onChange"), 0 < t.length && (a = new si(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var kn = null, Fn = null;
  function wg(e) {
    am(e, 0);
  }
  function fi(e) {
    var t = Qn(e);
    if (kf(t)) return e;
  }
  function go(e, t) {
    if (e === "change") return t;
  }
  var yo = !1;
  if (_a) {
    var ts;
    if (_a) {
      var as = "oninput" in document;
      if (!as) {
        var _o = document.createElement("div");
        _o.setAttribute("oninput", "return;"), as = typeof _o.oninput == "function";
      }
      ts = as;
    } else ts = !1;
    yo = ts && (!document.documentMode || 9 < document.documentMode);
  }
  function po() {
    kn && (kn.detachEvent("onpropertychange", So), Fn = kn = null);
  }
  function So(e) {
    if (e.propertyName === "value" && fi(Fn)) {
      var t = [];
      ho(
        t,
        Fn,
        e,
        Kc(e)
      ), ao(wg, t);
    }
  }
  function zg(e, t, a) {
    e === "focusin" ? (po(), kn = t, Fn = a, kn.attachEvent("onpropertychange", So)) : e === "focusout" && po();
  }
  function Cg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return fi(Fn);
  }
  function Dg(e, t) {
    if (e === "click") return fi(t);
  }
  function Og(e, t) {
    if (e === "input" || e === "change")
      return fi(t);
  }
  function Mg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var At = typeof Object.is == "function" ? Object.is : Mg;
  function Wn(e, t) {
    if (At(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Uc.call(t, n) || !At(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function ls(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function bo(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function xo(e, t) {
    var a = bo(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= t && l >= t)
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = bo(a);
    }
  }
  function jo(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? jo(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function To(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = ls(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = ls(e.document);
    }
    return t;
  }
  function ns(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Rg = _a && "documentMode" in document && 11 >= document.documentMode, Jl = null, us = null, In = null, is = !1;
  function No(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    is || Jl == null || Jl !== ls(l) || (l = Jl, "selectionStart" in l && ns(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), In && Wn(In, l) || (In = l, l = fc(us, "onSelect"), 0 < l.length && (t = new si(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Jl)));
  }
  function ml(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var $l = {
    animationend: ml("Animation", "AnimationEnd"),
    animationiteration: ml("Animation", "AnimationIteration"),
    animationstart: ml("Animation", "AnimationStart"),
    transitionrun: ml("Transition", "TransitionRun"),
    transitionstart: ml("Transition", "TransitionStart"),
    transitioncancel: ml("Transition", "TransitionCancel"),
    transitionend: ml("Transition", "TransitionEnd")
  }, cs = {}, Eo = {};
  _a && (Eo = document.createElement("div").style, "AnimationEvent" in window || (delete $l.animationend.animation, delete $l.animationiteration.animation, delete $l.animationstart.animation), "TransitionEvent" in window || delete $l.transitionend.transition);
  function hl(e) {
    if (cs[e]) return cs[e];
    if (!$l[e]) return e;
    var t = $l[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Eo)
        return cs[e] = t[a];
    return e;
  }
  var Ao = hl("animationend"), wo = hl("animationiteration"), zo = hl("animationstart"), Ug = hl("transitionrun"), Hg = hl("transitionstart"), qg = hl("transitioncancel"), Co = hl("transitionend"), Do = /* @__PURE__ */ new Map(), ss = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ss.push("scrollEnd");
  function Kt(e, t) {
    Do.set(e, t), vl(t, [e]);
  }
  var Lg = 0;
  function pa(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = Ft.identifierPrefix;
    var a = Lg++;
    return e = "_" + e + "t_" + a.toString(32) + "_", t.autoName = e;
  }
  function Oo(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, a = hn;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = e[a[l]];
        if (n != null) {
          if (n === "none") return "none";
          t = t == null ? n : t + (" " + n);
        }
      }
    return t ?? e.default;
  }
  function Sa(e, t) {
    return e = Oo(e), t = Oo(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var oi = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Ut = [], kl = 0, rs = 0;
  function di() {
    for (var e = kl, t = rs = kl = 0; t < e; ) {
      var a = Ut[t];
      Ut[t++] = null;
      var l = Ut[t];
      Ut[t++] = null;
      var n = Ut[t];
      Ut[t++] = null;
      var u = Ut[t];
      if (Ut[t++] = null, l !== null && n !== null) {
        var c = l.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), l.pending = n;
      }
      u !== 0 && Mo(a, n, u);
    }
  }
  function vi(e, t, a, l) {
    Ut[kl++] = e, Ut[kl++] = t, Ut[kl++] = a, Ut[kl++] = l, rs |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function fs(e, t, a, l) {
    return vi(e, t, a, l), mi(e);
  }
  function gl(e, t) {
    return vi(e, null, null, t), mi(e);
  }
  function Mo(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - Nt(a), e = u.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function mi(e) {
    if (50 < Su)
      throw Su = 0, lc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Fl = {};
  function Bg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, a, l) {
    return new Bg(e, t, a, l);
  }
  function os(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ba(e, t) {
    var a = e.alternate;
    return a === null ? (a = yt(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 1206910976, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Ro(e, t) {
    e.flags &= 1206910978;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function hi(e, t, a, l, n, u) {
    var c = 0;
    if (l = e, typeof l == "function") os(l) && (c = 1);
    else if (typeof l == "string")
      c = v0(
        e,
        a,
        ta.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case st:
          return e = yt(31, a, t, n), e.elementType = st, e.lanes = u, e;
        case ze:
          return yl(a.children, n, u, t);
        case Je:
          c = 8, n |= 24;
          break;
        case xt:
          return e = yt(12, a, t, n | 2), e.elementType = xt, e.lanes = u, e;
        case H:
          return e = yt(13, a, t, n), e.elementType = H, e.lanes = u, e;
        case G:
          return e = yt(19, a, t, n), e.elementType = G, e.lanes = u, e;
        case ma:
        case y:
          return e = n | 32, e = yt(30, a, t, e), e.elementType = y, e.lanes = u, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Be:
                c = 10;
                break e;
              case va:
                c = 9;
                break e;
              case B:
                c = 11;
                break e;
              case ie:
                c = 14;
                break e;
              case ve:
                c = 16, l = null;
                break e;
            }
          c = 29, a = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = yt(c, a, t, n), t.elementType = e, t.type = l, t.lanes = u, t;
  }
  function yl(e, t, a, l) {
    return e = yt(7, e, l, t), e.lanes = a, e;
  }
  function ds(e, t, a) {
    return e = yt(6, e, null, t), e.lanes = a, e;
  }
  function Uo(e) {
    var t = yt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function vs(e, t, a) {
    return t = yt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Ho = /* @__PURE__ */ new WeakMap();
  function Ht(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Ho.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: zf(t)
      }, Ho.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: zf(t)
    };
  }
  var Wl = [], Il = 0, gi = null, Pn = 0, qt = [], Lt = 0, Ba = null, la = 1, na = "";
  function xa(e, t) {
    Wl[Il++] = Pn, Wl[Il++] = gi, gi = e, Pn = t;
  }
  function qo(e, t, a) {
    qt[Lt++] = la, qt[Lt++] = na, qt[Lt++] = Ba, Ba = e;
    var l = la;
    e = na;
    var n = 32 - Nt(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - Nt(t) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (l & (1 << c) - 1).toString(32), l >>= c, n -= c, la = 1 << 32 - Nt(t) + n | a << n | l, na = u + e;
    } else
      la = 1 << u | a << n | l, na = e;
  }
  function yi(e) {
    e.return !== null && (xa(e, 1), qo(e, 1, 0));
  }
  function ms(e) {
    for (; e === gi; )
      gi = Wl[--Il], Wl[Il] = null, Pn = Wl[--Il], Wl[Il] = null;
    for (; e === Ba; )
      Ba = qt[--Lt], qt[Lt] = null, na = qt[--Lt], qt[Lt] = null, la = qt[--Lt], qt[Lt] = null;
  }
  function Lo(e, t) {
    qt[Lt++] = la, qt[Lt++] = na, qt[Lt++] = Ba, la = t.id, na = t.overflow, Ba = e;
  }
  var ke = null, De = null, se = !1, Ya = null, Bt = !1, hs = Error(o(519));
  function Ga(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw eu(Ht(t, e)), hs;
  }
  function Bo(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[tt] = e, t[gt] = l, a) {
      case "dialog":
        fe("cancel", t), fe("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        fe("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < xu.length; a++)
          fe(xu[a], t);
        break;
      case "source":
        fe("error", t);
        break;
      case "img":
      case "image":
      case "link":
        fe("error", t), fe("load", t);
        break;
      case "details":
        fe("toggle", t);
        break;
      case "input":
        fe("invalid", t), Ff(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        fe("invalid", t);
        break;
      case "textarea":
        fe("invalid", t), If(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || im(t.textContent, a) ? (l.popover != null && (fe("beforetoggle", t), fe("toggle", t)), l.onScroll != null && fe("scroll", t), l.onScrollEnd != null && fe("scrollend", t), l.onClick != null && (t.onclick = aa), t = !0) : t = !1, t || Ga(e, !0);
  }
  function _i(e) {
    for (ke = e.return; ke; )
      switch (ke.tag) {
        case 5:
        case 31:
        case 13:
          Bt = !1;
          return;
        case 27:
        case 3:
          Bt = !0;
          return;
        default:
          ke = ke.return;
      }
  }
  function Pl(e) {
    if (e !== ke) return !1;
    if (!se) return _i(e), se = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Vr(e.type, e.memoizedProps)), a = !a), a && De && Ga(e), _i(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      De = Nm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      De = Nm(e);
    } else
      t === 27 ? (t = De, ll(e.type) ? (e = ef, ef = null, De = e) : De = t) : De = ke ? Gt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function _l() {
    De = ke = null, se = !1;
  }
  function gs() {
    var e = Ya;
    return e !== null && (St === null ? St = e : St.push.apply(
      St,
      e
    ), Ya = null), e;
  }
  function eu(e) {
    Ya === null ? Ya = [e] : Ya.push(e);
  }
  var ys = ea(null), pl = null, ja = null;
  function Xa(e, t, a) {
    Ce(ys, t._currentValue), t._currentValue = a;
  }
  function Ta(e) {
    e._currentValue = ys.current, et(ys);
  }
  function pi(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function _s(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var m = 0; m < t.length; m++)
            if (f.context === t[m]) {
              u.lanes |= a, f = u.alternate, f !== null && (f.lanes |= a), pi(
                u.return,
                a,
                e
              ), l || (c = null);
              break e;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (c = n.return, c === null) throw Error(o(341));
        c.lanes |= a, u = c.alternate, u !== null && (u.lanes |= a), pi(c, a, e), c = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), pi(
          n.return,
          a,
          e
        ), c = n.child, c = c !== null ? c.sibling : null) : c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (n = c.sibling, n !== null) {
            n.return = c.return, c = n;
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function Sl(e, t, a, l) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(o(387));
        if (c = c.memoizedProps, c !== null) {
          var f = n.type;
          At(n.pendingProps.value, c.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === Ku.current) {
        if (c = n.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Nn) : e = [Nn]);
      }
      n = n.return;
    }
    return e !== null && _s(
      t,
      e,
      a,
      l
    ), t.flags |= 262144, e !== null;
  }
  function Si(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!At(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function bl(e) {
    pl = e, ja = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function at(e) {
    return Yo(pl, e);
  }
  function bi(e, t) {
    return pl === null && bl(e), Yo(e, t);
  }
  function Yo(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, ja === null) {
      if (e === null) throw Error(o(308));
      ja = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ja = ja.next = t;
    return a;
  }
  var Yg = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, Gg = s.unstable_scheduleCallback, Xg = s.unstable_NormalPriority, Ye = {
    $$typeof: Be,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ps() {
    return {
      controller: new Yg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function tu(e) {
    e.refCount--, e.refCount === 0 && Gg(Xg, function() {
      e.controller.abort();
    });
  }
  function Go(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var a = e.transitionTypes;
      for (a === null && (a = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        a.indexOf(l) === -1 && a.push(l);
      }
    }
  }
  var au = null;
  function Qg(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var lu = null, Ss = 0, xl = 0, en = null;
  function Zg(e, t) {
    if (lu === null) {
      var a = lu = [];
      Ss = 0, xl = Hr(), en = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Ss++, t.then(Xo, Xo), t;
  }
  function Xo() {
    if (--Ss === 0 && (au = null, lu !== null)) {
      en !== null && (en.status = "fulfilled");
      var e = lu;
      lu = null, xl = 0, en = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Vg(e, t) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        a.push(n);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var n = 0; n < a.length; n++) (0, a[n])(t);
      },
      function(n) {
        for (l.status = "rejected", l.reason = n, n = 0; n < a.length; n++)
          (0, a[n])(void 0);
      }
    ), l;
  }
  var Qo = K.S;
  K.S = function(e, t) {
    if (Uv = jt(), typeof t == "object" && t !== null && typeof t.then == "function" && Zg(e, t), au !== null)
      for (var a = pn; a !== null; )
        Go(a, au), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = pn; l !== null; )
        Go(l, a), l = l.next;
      if (xl !== 0) {
        l = au, l === null && (l = au = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    Qo !== null && Qo(e, t);
  };
  var jl = ea(null);
  function bs() {
    var e = jl.current;
    return e !== null ? e : we.pooledCache;
  }
  function xi(e, t) {
    t === null ? Ce(jl, jl.current) : Ce(jl, t.pool);
  }
  function Zo() {
    var e = bs();
    return e === null ? null : { parent: Ye._currentValue, pool: e };
  }
  var tn = Error(o(460)), xs = Error(o(474)), ji = Error(o(542)), Ti = { then: function() {
  } };
  function Vo(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ko(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(aa, aa), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, $o(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(aa, aa);
        else {
          if (e = we, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, $o(e), e;
        }
        throw Nl = t, tn;
    }
  }
  function Tl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Nl = a, tn) : a;
    }
  }
  var Nl = null;
  function Jo() {
    if (Nl === null) throw Error(o(459));
    var e = Nl;
    return Nl = null, e;
  }
  function $o(e) {
    if (e === tn || e === ji)
      throw Error(o(483));
  }
  var an = null, nu = 0;
  function Ni(e) {
    var t = nu;
    return nu += 1, an === null && (an = []), Ko(an, e, t);
  }
  function Qa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ei(e, t) {
    throw t.$$typeof === Z ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ko(e) {
    function t(p, g) {
      if (e) {
        var x = p.deletions;
        x === null ? (p.deletions = [g], p.flags |= 16) : x.push(g);
      }
    }
    function a(p, g) {
      if (!e) return null;
      for (; g !== null; )
        t(p, g), g = g.sibling;
      return null;
    }
    function l(p) {
      for (var g = /* @__PURE__ */ new Map(); p !== null; )
        p.key === null ? g.set(p.index, p) : g.set(p.key, p), p = p.sibling;
      return g;
    }
    function n(p, g) {
      return p = ba(p, g), p.index = 0, p.sibling = null, p;
    }
    function u(p, g, x) {
      return p.index = x, e ? (x = p.alternate, x !== null ? (x = x.index, x < g ? (p.flags |= 2, g) : x) : (p.flags |= 134217730, g)) : (p.flags |= 1048576, g);
    }
    function c(p) {
      return e && p.alternate === null && (p.flags |= 134217730), p;
    }
    function f(p, g, x, O) {
      return g === null || g.tag !== 6 ? (g = ds(x, p.mode, O), g.return = p, g) : (g = n(g, x), g.return = p, g);
    }
    function m(p, g, x, O) {
      var X = x.type;
      return X === ze ? (p = N(
        p,
        g,
        x.props.children,
        O,
        x.key
      ), Qa(p, x), p) : g !== null && (g.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ve && Tl(X) === g.type) ? (g = n(g, x.props), Qa(g, x), g.return = p, g) : (g = hi(
        x.type,
        x.key,
        x.props,
        null,
        p.mode,
        O
      ), Qa(g, x), g.return = p, g);
    }
    function S(p, g, x, O) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = vs(x, p.mode, O), g.return = p, g) : (g = n(g, x.children || []), g.return = p, g);
    }
    function N(p, g, x, O, X) {
      return g === null || g.tag !== 7 ? (g = yl(
        x,
        p.mode,
        O,
        X
      ), g.return = p, g) : (g = n(g, x), g.return = p, g);
    }
    function M(p, g, x) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = ds(
          "" + g,
          p.mode,
          x
        ), g.return = p, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case Ze:
            return x = hi(
              g.type,
              g.key,
              g.props,
              null,
              p.mode,
              x
            ), Qa(x, g), x.return = p, x;
          case Pe:
            return g = vs(
              g,
              p.mode,
              x
            ), g.return = p, g;
          case ve:
            return g = Tl(g), M(p, g, x);
        }
        if (Se(g) || W(g))
          return g = yl(
            g,
            p.mode,
            x,
            null
          ), g.return = p, g;
        if (typeof g.then == "function")
          return M(p, Ni(g), x);
        if (g.$$typeof === Be)
          return M(
            p,
            bi(p, g),
            x
          );
        Ei(p, g);
      }
      return null;
    }
    function _(p, g, x, O) {
      var X = g !== null ? g.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return X !== null ? null : f(p, g, "" + x, O);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ze:
            return x.key === X ? m(p, g, x, O) : null;
          case Pe:
            return x.key === X ? S(p, g, x, O) : null;
          case ve:
            return x = Tl(x), _(p, g, x, O);
        }
        if (Se(x) || W(x))
          return X !== null ? null : N(p, g, x, O, null);
        if (typeof x.then == "function")
          return _(
            p,
            g,
            Ni(x),
            O
          );
        if (x.$$typeof === Be)
          return _(
            p,
            g,
            bi(p, x),
            O
          );
        Ei(p, x);
      }
      return null;
    }
    function j(p, g, x, O, X) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return p = p.get(x) || null, f(g, p, "" + O, X);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case Ze:
            return p = p.get(
              O.key === null ? x : O.key
            ) || null, m(g, p, O, X);
          case Pe:
            return p = p.get(
              O.key === null ? x : O.key
            ) || null, S(g, p, O, X);
          case ve:
            return O = Tl(O), j(
              p,
              g,
              x,
              O,
              X
            );
        }
        if (Se(O) || W(O))
          return p = p.get(x) || null, N(g, p, O, X, null);
        if (typeof O.then == "function")
          return j(
            p,
            g,
            x,
            Ni(O),
            X
          );
        if (O.$$typeof === Be)
          return j(
            p,
            g,
            x,
            bi(g, O),
            X
          );
        Ei(g, O);
      }
      return null;
    }
    function q(p, g, x, O) {
      for (var X = null, de = null, J = g, P = g = 0, Qe = null; J !== null && P < x.length; P++) {
        J.index > P ? (Qe = J, J = null) : Qe = J.sibling;
        var me = _(
          p,
          J,
          x[P],
          O
        );
        if (me === null) {
          J === null && (J = Qe);
          break;
        }
        e && J && me.alternate === null && t(p, J), g = u(me, g, P), de === null ? X = me : de.sibling = me, de = me, J = Qe;
      }
      if (P === x.length)
        return a(p, J), se && xa(p, P), X;
      if (J === null) {
        for (; P < x.length; P++)
          J = M(p, x[P], O), J !== null && (g = u(
            J,
            g,
            P
          ), de === null ? X = J : de.sibling = J, de = J);
        return se && xa(p, P), X;
      }
      for (J = l(J); P < x.length; P++)
        Qe = j(
          J,
          p,
          P,
          x[P],
          O
        ), Qe !== null && (e && (me = Qe.alternate, me !== null && J.delete(me.key === null ? P : me.key)), g = u(
          Qe,
          g,
          P
        ), de === null ? X = Qe : de.sibling = Qe, de = Qe);
      return e && J.forEach(function(sl) {
        return t(p, sl);
      }), se && xa(p, P), X;
    }
    function Q(p, g, x, O) {
      if (x == null) throw Error(o(151));
      for (var X = null, de = null, J = g, P = g = 0, Qe = null, me = x.next(); J !== null && !me.done; P++, me = x.next()) {
        J.index > P ? (Qe = J, J = null) : Qe = J.sibling;
        var sl = _(p, J, me.value, O);
        if (sl === null) {
          J === null && (J = Qe);
          break;
        }
        e && J && sl.alternate === null && t(p, J), g = u(sl, g, P), de === null ? X = sl : de.sibling = sl, de = sl, J = Qe;
      }
      if (me.done)
        return a(p, J), se && xa(p, P), X;
      if (J === null) {
        for (; !me.done; P++, me = x.next())
          me = M(p, me.value, O), me !== null && (g = u(me, g, P), de === null ? X = me : de.sibling = me, de = me);
        return se && xa(p, P), X;
      }
      for (J = l(J); !me.done; P++, me = x.next())
        me = j(J, p, P, me.value, O), me !== null && (e && (Qe = me.alternate, Qe !== null && J.delete(
          Qe.key === null ? P : Qe.key
        )), g = u(me, g, P), de === null ? X = me : de.sibling = me, de = me);
      return e && J.forEach(function(N0) {
        return t(p, N0);
      }), se && xa(p, P), X;
    }
    function ue(p, g, x, O) {
      if (typeof x == "object" && x !== null && x.type === ze && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ze:
            e: {
              for (var X = x.key; g !== null; ) {
                if (g.key === X) {
                  if (X = x.type, X === ze) {
                    if (g.tag === 7) {
                      a(
                        p,
                        g.sibling
                      ), O = n(
                        g,
                        x.props.children
                      ), Qa(O, x), O.return = p, p = O;
                      break e;
                    }
                  } else if (g.elementType === X || typeof X == "object" && X !== null && X.$$typeof === ve && Tl(X) === g.type) {
                    a(
                      p,
                      g.sibling
                    ), O = n(g, x.props), Qa(O, x), O.return = p, p = O;
                    break e;
                  }
                  a(p, g);
                  break;
                } else t(p, g);
                g = g.sibling;
              }
              x.type === ze ? (O = yl(
                x.props.children,
                p.mode,
                O,
                x.key
              ), Qa(O, x), O.return = p, p = O) : (O = hi(
                x.type,
                x.key,
                x.props,
                null,
                p.mode,
                O
              ), Qa(O, x), O.return = p, p = O);
            }
            return c(p);
          case Pe:
            e: {
              for (X = x.key; g !== null; ) {
                if (g.key === X)
                  if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                    a(
                      p,
                      g.sibling
                    ), O = n(g, x.children || []), O.return = p, p = O;
                    break e;
                  } else {
                    a(p, g);
                    break;
                  }
                else t(p, g);
                g = g.sibling;
              }
              O = vs(x, p.mode, O), O.return = p, p = O;
            }
            return c(p);
          case ve:
            return x = Tl(x), ue(
              p,
              g,
              x,
              O
            );
        }
        if (Se(x))
          return q(
            p,
            g,
            x,
            O
          );
        if (W(x)) {
          if (X = W(x), typeof X != "function") throw Error(o(150));
          return x = X.call(x), Q(
            p,
            g,
            x,
            O
          );
        }
        if (typeof x.then == "function")
          return ue(
            p,
            g,
            Ni(x),
            O
          );
        if (x.$$typeof === Be)
          return ue(
            p,
            g,
            bi(p, x),
            O
          );
        Ei(p, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, g !== null && g.tag === 6 ? (a(p, g.sibling), O = n(g, x), O.return = p, p = O) : (a(p, g), O = ds(x, p.mode, O), O.return = p, p = O), c(p)) : a(p, g);
    }
    return function(p, g, x, O) {
      try {
        nu = 0;
        var X = ue(
          p,
          g,
          x,
          O
        );
        return an = null, X;
      } catch (J) {
        if (J === tn || J === ji) throw J;
        var de = yt(29, J, null, p.mode);
        return de.lanes = O, de.return = p, de;
      } finally {
      }
    };
  }
  var El = ko(!0), Fo = ko(!1), Za = !1;
  function js(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ts(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Va(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ka(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (be & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = mi(e), Mo(e, null, a), t;
    }
    return vi(e, l, t, a), mi(e);
  }
  function uu(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Hf(e, a);
    }
  }
  function Ns(e, t) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var n = null, u = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = c : u = u.next = c, a = a.next;
        } while (a !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var Es = !1;
  function iu() {
    if (Es) {
      var e = en;
      if (e !== null) throw e;
    }
  }
  function cu(e, t, a, l) {
    Es = !1;
    var n = e.updateQueue;
    Za = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var m = f, S = m.next;
      m.next = null, c === null ? u = S : c.next = S, c = m;
      var N = e.alternate;
      N !== null && (N = N.updateQueue, f = N.lastBaseUpdate, f !== c && (f === null ? N.firstBaseUpdate = S : f.next = S, N.lastBaseUpdate = m));
    }
    if (u !== null) {
      var M = n.baseState;
      c = 0, N = S = m = null, f = u;
      do {
        var _ = f.lane & -536870913, j = _ !== f.lane;
        if (j ? (oe & _) === _ : (l & _) === _) {
          _ !== 0 && _ === xl && (Es = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var q = e, Q = f;
            _ = t;
            var ue = a;
            switch (Q.tag) {
              case 1:
                if (q = Q.payload, typeof q == "function") {
                  M = q.call(ue, M, _);
                  break e;
                }
                M = q;
                break e;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = Q.payload, _ = typeof q == "function" ? q.call(ue, M, _) : q, _ == null) break e;
                M = le({}, M, _);
                break e;
              case 2:
                Za = !0;
            }
          }
          _ = f.callback, _ !== null && (e.flags |= 64, j && (e.flags |= 8192), j = n.callbacks, j === null ? n.callbacks = [_] : j.push(_));
        } else
          j = {
            lane: _,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, N === null ? (S = N = j, m = M) : N = N.next = j, c |= _;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          j = f, f = j.next, j.next = null, n.lastBaseUpdate = j, n.shared.pending = null;
        }
      } while (!0);
      N === null && (m = M), n.baseState = m, n.firstBaseUpdate = S, n.lastBaseUpdate = N, u === null && (n.shared.lanes = 0), Pa |= c, e.lanes = c, e.memoizedState = M;
    }
  }
  function Wo(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function Io(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        Wo(a[e], t);
  }
  var Ja = ea(null), Ai = ea(0);
  function Po(e, t) {
    e = za, Ce(Ai, e), Ce(Ja, t), za = e | t.baseLanes;
  }
  function As() {
    Ce(Ai, za), Ce(Ja, Ja.current);
  }
  function ws() {
    za = Ai.current, et(Ja), et(Ai);
  }
  var lt = ea(null), rt = null;
  function $a(e) {
    var t = e.alternate;
    Ce(nt, nt.current & 1), Ce(lt, e), rt === null && (t === null || Ja.current !== null || t.memoizedState !== null) && (rt = e);
  }
  function zs(e) {
    Ce(nt, nt.current), Ce(lt, e), rt === null && (rt = e);
  }
  function ed(e) {
    e.tag === 22 ? (Ce(nt, nt.current), Ce(lt, e), rt === null && (rt = e)) : ka();
  }
  function ka() {
    Ce(nt, nt.current), Ce(lt, lt.current);
  }
  function wt(e) {
    et(lt), rt === e && (rt = null), et(nt);
  }
  var nt = ea(0);
  function su(e, t) {
    Ce(lt, lt.current), Ce(nt, t);
  }
  function Cs(e) {
    et(nt), et(lt), rt === e && (rt = null);
  }
  function wi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Ir(a) || Pr(a)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Na = 0, ne = null, Ae = null, Ge = null, zi = !1, ln = !1, Al = !1, Ci = 0, ru = 0, nn = null, Kg = 0;
  function Ue() {
    throw Error(o(321));
  }
  function Ds(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!At(e[a], t[a])) return !1;
    return !0;
  }
  function Os(e, t, a, l, n, u) {
    return Na = u, ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, K.H = e === null || e.memoizedState === null ? qd : Ld, Al = !1, u = a(l, n), Al = !1, ln && (u = ad(
      t,
      a,
      l,
      n
    )), td(e), u;
  }
  function td(e) {
    K.H = qi;
    var t = Ae !== null && Ae.next !== null;
    if (Na = 0, Ge = Ae = ne = null, zi = !1, ru = 0, nn = null, t) throw Error(o(300));
    e === null || Xe || (e = e.dependencies, e !== null && Si(e) && (Xe = !0));
  }
  function ad(e, t, a, l) {
    ne = e;
    var n = 0;
    do {
      if (ln && (nn = null), ru = 0, ln = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ge = Ae = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      K.H = ey, u = t(a, l);
    } while (ln);
    return u;
  }
  function Jg() {
    var e = K.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? fu(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (ne.flags |= 1024), t;
  }
  function Ms() {
    var e = Ci !== 0;
    return Ci = 0, e;
  }
  function Rs(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Us(e) {
    if (zi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      zi = !1;
    }
    Na = 0, Ge = Ae = ne = null, ln = !1, ru = Ci = 0, nn = null;
  }
  function dt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ge === null ? ne.memoizedState = Ge = e : Ge = Ge.next = e, Ge;
  }
  function qe() {
    if (Ae === null) {
      var e = ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ge === null ? ne.memoizedState : Ge.next;
    if (t !== null)
      Ge = t, Ae = e;
    else {
      if (e === null)
        throw ne.alternate === null ? Error(o(467)) : Error(o(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, Ge === null ? ne.memoizedState = Ge = e : Ge = Ge.next = e;
    }
    return Ge;
  }
  function Di() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fu(e) {
    var t = ru;
    return ru += 1, nn === null && (nn = []), e = Ko(nn, e, t), t = ne, (Ge === null ? t.memoizedState : Ge.next) === null && (t = t.alternate, K.H = t === null || t.memoizedState === null ? qd : Ld), e;
  }
  function Oi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return fu(e);
      if (e.$$typeof === U) return;
      if (e.$$typeof === Be) return at(e);
    }
    throw Error(o(438, String(e)));
  }
  function Hs(e) {
    var t = null, a = ne.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = ne.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Di(), ne.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = fl;
    return t.index++, a;
  }
  function Ea(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Mi(e) {
    var t = qe();
    return qs(t, Ae, e);
  }
  function qs(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var n = e.baseQueue, u = l.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        n.next = u.next, u.next = c;
      }
      t.baseQueue = n = u, l.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var f = c = null, m = null, S = t, N = !1;
      do {
        var M = S.lane & -536870913;
        if (M !== S.lane ? (oe & M) === M : (Na & M) === M) {
          var _ = S.revertLane;
          if (_ === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), M === xl && (N = !0);
          else if ((Na & _) === _) {
            S = S.next, _ === xl && (N = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, m === null ? (f = m = M, c = u) : m = m.next = M, ne.lanes |= _, Pa |= _;
          M = S.action, Al && a(u, M), u = S.hasEagerState ? S.eagerState : a(u, M);
        } else
          _ = {
            lane: M,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, m === null ? (f = m = _, c = u) : m = m.next = _, ne.lanes |= M, Pa |= M;
        S = S.next;
      } while (S !== null && S !== t);
      if (m === null ? c = u : m.next = f, !At(u, e.memoizedState) && (Xe = !0, N && (a = en, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = c, e.baseQueue = m, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Ls(e) {
    var t = qe(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, u = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var c = n = n.next;
      do
        u = e(u, c.action), c = c.next;
      while (c !== n);
      At(u, t.memoizedState) || (Xe = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function ld(e, t, a) {
    var l = ne, n = qe(), u = se;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !At(
      (Ae || n).memoizedState,
      a
    );
    if (c && (n.memoizedState = a, Xe = !0), n = n.queue, Gs(id.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || c || Ge !== null && (Ge.memoizedState.tag & 1) !== 0, un(
      e ? 9 : 8,
      { destroy: void 0 },
      ud.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, we === null) throw Error(o(349));
      u || (Na & 127) !== 0 || nd(l, t, a);
    }
    return a;
  }
  function nd(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ne.updateQueue, t === null ? (t = Di(), ne.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function ud(e, t, a, l) {
    t.value = a, t.getSnapshot = l, cd(t) && sd(e);
  }
  function id(e, t, a) {
    return a(function() {
      cd(t) && sd(e);
    });
  }
  function cd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !At(e, a);
    } catch {
      return !0;
    }
  }
  function sd(e) {
    var t = gl(e, 2);
    t !== null && bt(t, e, 2);
  }
  function Bs(e) {
    var t = dt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Al) {
        Ha(!0);
        try {
          a();
        } finally {
          Ha(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ea,
      lastRenderedState: e
    }, t;
  }
  function rd(e, t, a, l) {
    return e.baseState = a, qs(
      e,
      Ae,
      typeof l == "function" ? l : Ea
    );
  }
  function $g(e, t, a, l, n) {
    if (Hi(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(c) {
          u.listeners.push(c);
        }
      };
      K.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, fd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function fd(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var u = K.T, c = {};
      c.types = u !== null ? u.types : null, K.T = c;
      try {
        var f = a(n, l), m = K.S;
        m !== null && m(c, f), od(e, t, f);
      } catch (S) {
        Ys(e, t, S);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), K.T = u;
      }
    } else
      try {
        u = a(n, l), od(e, t, u);
      } catch (S) {
        Ys(e, t, S);
      }
  }
  function od(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        dd(e, t, l);
      },
      function(l) {
        return Ys(e, t, l);
      }
    ) : dd(e, t, a);
  }
  function dd(e, t, a) {
    t.status = "fulfilled", t.value = a, vd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, fd(e, a)));
  }
  function Ys(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, vd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function vd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function md(e, t) {
    return t;
  }
  function hd(e, t) {
    if (se) {
      var a = we.formState;
      if (a !== null) {
        e: {
          var l = ne;
          if (se) {
            if (De) {
              t: {
                for (var n = De, u = Bt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Gt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                De = Gt(
                  n.nextSibling
                ), l = n.data === "F!";
                break e;
              }
            }
            Ga(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = dt(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: md,
      lastRenderedState: t
    }, a.queue = l, a = Rd.bind(
      null,
      ne,
      l
    ), l.dispatch = a, l = Bs(!1), u = Ks.bind(
      null,
      ne,
      !1,
      l.queue
    ), l = dt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = $g.bind(
      null,
      ne,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function gd(e) {
    var t = qe();
    return yd(t, Ae, e);
  }
  function yd(e, t, a) {
    if (t = qs(
      e,
      t,
      md
    )[0], e = Mi(Ea)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = fu(t);
      } catch (c) {
        throw c === tn ? ji : c;
      }
    else l = t;
    t = qe();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (ne.flags |= 2048, un(
      9,
      { destroy: void 0 },
      kg.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function kg(e, t) {
    e.action = t;
  }
  function _d(e) {
    var t = qe(), a = Ae;
    if (a !== null)
      return yd(t, a, e);
    qe(), t = t.memoizedState, a = qe();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function un(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = ne.updateQueue, t === null && (t = Di(), ne.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function pd() {
    return qe().memoizedState;
  }
  function Ri(e, t, a, l) {
    var n = dt();
    ne.flags |= e, n.memoizedState = un(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Ui(e, t, a, l) {
    var n = qe();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Ae !== null && l !== null && Ds(l, Ae.memoizedState.deps) ? n.memoizedState = un(t, u, a, l) : (ne.flags |= e, n.memoizedState = un(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Sd(e, t) {
    Ri(8390656, 8, e, t);
  }
  function Gs(e, t) {
    Ui(2048, 8, e, t);
  }
  function Fg(e) {
    ne.flags |= 4;
    var t = ne.updateQueue;
    if (t === null)
      t = Di(), ne.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function bd(e) {
    var t = qe().memoizedState;
    return Fg({ ref: t, nextImpl: e }), function() {
      if ((be & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function xd(e, t) {
    return Ui(4, 2, e, t);
  }
  function jd(e, t) {
    return Ui(4, 4, e, t);
  }
  function Td(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Nd(e, t, a) {
    a = a != null ? a.concat([e]) : null, Ui(4, 4, Td.bind(null, t, e), a);
  }
  function Xs() {
  }
  function Ed(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Ds(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Ad(e, t) {
    var a = qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Ds(t, l[1]))
      return l[0];
    if (l = e(), Al) {
      Ha(!0);
      try {
        e();
      } finally {
        Ha(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function Qs(e, t, a) {
    return a === void 0 || (Na & 1073741824) !== 0 && (oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = qv(), ne.lanes |= e, Pa |= e, a);
  }
  function wd(e, t, a, l) {
    return At(a, t) ? a : Ja.current !== null ? (e = Qs(e, a, l), At(e, t) || (Xe = !0), e) : (Na & 106) === 0 || (Na & 1073741824) !== 0 && (oe & 261930) === 0 ? (Xe = !0, e.memoizedState = a) : (e = qv(), ne.lanes |= e, Pa |= e, t);
  }
  function zd(e, t, a, l, n) {
    var u = te.p;
    te.p = u !== 0 && 8 > u ? u : 8;
    var c = K.T, f = {};
    f.types = c !== null ? c.types : null, K.T = f, Ks(e, !1, t, a);
    try {
      var m = n(), S = K.S;
      if (S !== null && S(f, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var N = Vg(
          m,
          l
        );
        ou(
          e,
          t,
          N,
          Ot(e)
        );
      } else
        ou(
          e,
          t,
          l,
          Ot(e)
        );
    } catch (M) {
      ou(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: M },
        Ot()
      );
    } finally {
      te.p = u, c !== null && f.types !== null && (c.types = f.types), K.T = c;
    }
  }
  function Wg() {
  }
  function Zs(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Cd(e).queue;
    zd(
      e,
      n,
      t,
      ha,
      a === null ? Wg : function() {
        return Dd(e), a(l);
      }
    );
  }
  function Cd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ha,
      baseState: ha,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ea,
        lastRenderedState: ha
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ea,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Dd(e) {
    var t = Cd(e);
    t.next === null && (t = e.alternate.memoizedState), ou(
      e,
      t.next.queue,
      {},
      Ot()
    );
  }
  function Vs() {
    return at(Nn);
  }
  function Od() {
    return qe().memoizedState;
  }
  function Md() {
    return qe().memoizedState;
  }
  function Ig(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ot();
          e = Va(a);
          var l = Ka(t, e, a);
          l !== null && (bt(l, t, a), uu(l, t, a)), t = { cache: ps() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Pg(e, t, a) {
    var l = Ot();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hi(e) ? Ud(t, a) : (a = fs(e, t, a, l), a !== null && (bt(a, e, l), Hd(a, t, l)));
  }
  function Rd(e, t, a) {
    var l = Ot();
    ou(e, t, a, l);
  }
  function ou(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hi(e)) Ud(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, f = u(c, a);
          if (n.hasEagerState = !0, n.eagerState = f, At(f, c))
            return vi(e, t, n, 0), we === null && di(), !1;
        } catch {
        } finally {
        }
      if (a = fs(e, t, n, l), a !== null)
        return bt(a, e, l), Hd(a, t, l), !0;
    }
    return !1;
  }
  function Ks(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Hr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hi(e)) {
      if (t) throw Error(o(479));
    } else
      t = fs(
        e,
        a,
        l,
        2
      ), t !== null && bt(t, e, 2);
  }
  function Hi(e) {
    var t = e.alternate;
    return e === ne || t !== null && t === ne;
  }
  function Ud(e, t) {
    ln = zi = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Hd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Hf(e, a);
    }
  }
  var qi = {
    readContext: at,
    use: Oi,
    useCallback: Ue,
    useContext: Ue,
    useEffect: Ue,
    useImperativeHandle: Ue,
    useLayoutEffect: Ue,
    useInsertionEffect: Ue,
    useMemo: Ue,
    useReducer: Ue,
    useRef: Ue,
    useState: Ue,
    useDebugValue: Ue,
    useDeferredValue: Ue,
    useTransition: Ue,
    useSyncExternalStore: Ue,
    useId: Ue,
    useHostTransitionStatus: Ue,
    useFormState: Ue,
    useActionState: Ue,
    useOptimistic: Ue,
    useMemoCache: Ue,
    useCacheRefresh: Ue,
    useEffectEvent: Ue
  }, qd = {
    readContext: at,
    use: Oi,
    useCallback: function(e, t) {
      return dt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: at,
    useEffect: Sd,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Ri(
        4194308,
        4,
        Td.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Ri(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Ri(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = dt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Al) {
        Ha(!0);
        try {
          e();
        } finally {
          Ha(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = dt();
      if (a !== void 0) {
        var n = a(t);
        if (Al) {
          Ha(!0);
          try {
            a(t);
          } finally {
            Ha(!1);
          }
        }
      } else n = t;
      return l.memoizedState = l.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, l.queue = e, e = e.dispatch = Pg.bind(
        null,
        ne,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = dt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Bs(e);
      var t = e.queue, a = Rd.bind(null, ne, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Xs,
    useDeferredValue: function(e, t) {
      var a = dt();
      return Qs(a, e, t);
    },
    useTransition: function() {
      var e = Bs(!1);
      return e = zd.bind(
        null,
        ne,
        e.queue,
        !0,
        !1
      ), dt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = ne, n = dt();
      if (se) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), we === null)
          throw Error(o(349));
        (oe & 127) !== 0 || nd(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, Sd(id.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, un(
        9,
        { destroy: void 0 },
        ud.bind(
          null,
          l,
          u,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = dt(), t = we.identifierPrefix;
      if (se) {
        var a = na, l = la;
        a = (l & ~(1 << 32 - Nt(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ci++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Kg++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Vs,
    useFormState: hd,
    useActionState: hd,
    useOptimistic: function(e) {
      var t = dt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Ks.bind(
        null,
        ne,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Hs,
    useCacheRefresh: function() {
      return dt().memoizedState = Ig.bind(
        null,
        ne
      );
    },
    useEffectEvent: function(e) {
      var t = dt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((be & 2) !== 0)
          throw Error(o(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Ld = {
    readContext: at,
    use: Oi,
    useCallback: Ed,
    useContext: at,
    useEffect: Gs,
    useImperativeHandle: Nd,
    useInsertionEffect: xd,
    useLayoutEffect: jd,
    useMemo: Ad,
    useReducer: Mi,
    useRef: pd,
    useState: function() {
      return Mi(Ea);
    },
    useDebugValue: Xs,
    useDeferredValue: function(e, t) {
      var a = qe();
      return wd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Mi(Ea)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : fu(e),
        t
      ];
    },
    useSyncExternalStore: ld,
    useId: Od,
    useHostTransitionStatus: Vs,
    useFormState: gd,
    useActionState: gd,
    useOptimistic: function(e, t) {
      var a = qe();
      return rd(a, Ae, e, t);
    },
    useMemoCache: Hs,
    useCacheRefresh: Md,
    useEffectEvent: bd
  }, ey = {
    readContext: at,
    use: Oi,
    useCallback: Ed,
    useContext: at,
    useEffect: Gs,
    useImperativeHandle: Nd,
    useInsertionEffect: xd,
    useLayoutEffect: jd,
    useMemo: Ad,
    useReducer: Ls,
    useRef: pd,
    useState: function() {
      return Ls(Ea);
    },
    useDebugValue: Xs,
    useDeferredValue: function(e, t) {
      var a = qe();
      return Ae === null ? Qs(a, e, t) : wd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Ls(Ea)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : fu(e),
        t
      ];
    },
    useSyncExternalStore: ld,
    useId: Od,
    useHostTransitionStatus: Vs,
    useFormState: _d,
    useActionState: _d,
    useOptimistic: function(e, t) {
      var a = qe();
      return Ae !== null ? rd(a, Ae, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Hs,
    useCacheRefresh: Md,
    useEffectEvent: bd
  };
  function Js(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : le({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var $s = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Va(l);
      n.payload = t, a != null && (n.callback = a), t = Ka(e, n, l), t !== null && (bt(t, e, l), uu(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Va(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Ka(e, n, l), t !== null && (bt(t, e, l), uu(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Ot(), l = Va(a);
      l.tag = 2, t != null && (l.callback = t), t = Ka(e, l, a), t !== null && (bt(t, e, a), uu(t, e, a));
    }
  };
  function Bd(e, t, a, l, n, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, c) : t.prototype && t.prototype.isPureReactComponent ? !Wn(a, l) || !Wn(n, u) : !0;
  }
  function Yd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && $s.enqueueReplaceState(t, t.state, null);
  }
  function wl(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = le({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function Gd(e) {
    oi(e);
  }
  function Xd(e) {
    console.error(e);
  }
  function Qd(e) {
    oi(e);
  }
  function Li(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Zd(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function ks(e, t, a) {
    return a = Va(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Li(e, t);
    }, a;
  }
  function Vd(e) {
    return e = Va(e), e.tag = 3, e;
  }
  function Kd(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Zd(t, a, l);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      Zd(t, a, l), typeof n != "function" && (el === null ? el = /* @__PURE__ */ new Set([this]) : el.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function ty(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && Sl(
        t,
        a,
        n,
        !0
      ), a = lt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return rt === null ? uc() : a.alternate === null && He === 0 && (He = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === Ti ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Mr(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === Ti ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Mr(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Mr(e, l, n), uc(), !1;
    }
    if (se)
      return t = lt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== hs && (e = Error(o(422), { cause: l }), eu(Ht(e, a)))) : (l !== hs && (t = Error(o(423), {
        cause: l
      }), eu(
        Ht(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Ht(l, a), n = ks(
        e.stateNode,
        l,
        n
      ), Ns(e, n), He !== 4 && (He = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Ht(u, a), pu === null ? pu = [u] : pu.push(u), He !== 4 && (He = 2), t === null) return !0;
    l = Ht(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = ks(a.stateNode, l, e), Ns(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (el === null || !el.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = Vd(n), Kd(
              n,
              e,
              a,
              l
            ), Ns(a, n), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var Fs = Error(o(461)), Xe = !1;
  function Ve(e, t, a, l) {
    t.child = e === null ? Fo(t, null, a, l) : El(
      t,
      e.child,
      a,
      l
    );
  }
  function Jd(e, t, a, l, n) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var c = {};
      for (var f in l)
        f !== "ref" && (c[f] = l[f]);
    } else c = l;
    return bl(t), l = Os(
      e,
      t,
      a,
      c,
      u,
      n
    ), f = Ms(), e !== null && !Xe ? (Rs(e, t, n), Aa(e, t, n)) : (se && f && yi(t), t.flags |= 1, Ve(e, t, l, n), t.child);
  }
  function $d(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !os(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, kd(
        e,
        t,
        u,
        l,
        n
      )) : (e = hi(
        a.type,
        null,
        l,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !nr(e, n)) {
      var c = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Wn, a(c, l) && e.ref === t.ref)
        return Aa(e, t, n);
    }
    return t.flags |= 1, e = ba(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function kd(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Wn(u, l) && e.ref === t.ref)
        if (Xe = !1, t.pendingProps = l = u, nr(e, n))
          (e.flags & 131072) !== 0 && (Xe = !0);
        else
          return t.lanes = e.lanes, Aa(e, t, n);
    }
    return Ws(
      e,
      t,
      a,
      l,
      n
    );
  }
  function Fd(e, t, a, l) {
    var n = l.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | a : a, e !== null) {
          for (l = t.child = e.child, n = 0; l !== null; )
            n = n | l.lanes | l.childLanes, l = l.sibling;
          l = n & ~u;
        } else l = 0, t.child = null;
        return Wd(
          e,
          t,
          u,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && xi(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Po(t, u) : As(), ed(t);
      else
        return l = t.lanes = 536870912, Wd(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (xi(t, u.cachePool), Po(t, u), ka(), t.memoizedState = null) : (e !== null && xi(t, null), As(), ka());
    return Ve(e, t, n, a), t.child;
  }
  function du(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Wd(e, t, a, l, n) {
    var u = bs();
    return u = u === null ? null : { parent: Ye._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && xi(t, null), As(), ed(t), e !== null && Sl(e, t, l, !0), t.childLanes = n, null;
  }
  function Bi(e, t) {
    return t = Yi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Id(e, t, a) {
    return El(t, e.child, null, a), e = Bi(t, t.pendingProps), e.flags |= 2, wt(t), t.memoizedState = null, e;
  }
  function ay(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (se) {
        if (l.mode === "hidden")
          return e = Bi(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, du(null, e);
        if (zs(t), (e = De) ? (e = Tm(
          e,
          Bt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ba !== null ? { id: la, overflow: na } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Uo(e), a.return = t, t.child = a, ke = t, De = null)) : e = null, e === null) throw Ga(t);
        return t.lanes = 536870912, null;
      }
      return Bi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (zs(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = Id(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Xe || Sl(e, t, a, !1), n = (a & e.childLanes) !== 0, Xe || n) {
        if (Ja.current === null) {
          if (l = we, l !== null && (c = qf(l, a), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, gl(e, c), bt(l, e, c), Fs;
          uc();
        }
        t = Id(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, De = Gt(c.nextSibling), ke = t, se = !0, Ya = null, Bt = !1, e !== null && Lo(t, e), t = Bi(t, l), t.flags |= 134221824;
      return t;
    }
    return e = ba(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function cn(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Ws(e, t, a, l, n) {
    return bl(t), a = Os(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Ms(), e !== null && !Xe ? (Rs(e, t, n), Aa(e, t, n)) : (se && l && yi(t), t.flags |= 1, Ve(e, t, a, n), t.child);
  }
  function Pd(e, t, a, l, n, u) {
    return bl(t), t.updateQueue = null, a = ad(
      t,
      l,
      a,
      n
    ), td(e), l = Ms(), e !== null && !Xe ? (Rs(e, t, u), Aa(e, t, u)) : (se && l && yi(t), t.flags |= 1, Ve(e, t, a, u), t.child);
  }
  function ev(e, t, a, l, n) {
    if (bl(t), t.stateNode === null) {
      var u = Fl, c = a.contextType;
      typeof c == "object" && c !== null && (u = at(c)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = $s, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, js(t), c = a.contextType, u.context = typeof c == "object" && c !== null ? at(c) : Fl, u.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (Js(
        t,
        a,
        c,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && $s.enqueueReplaceState(u, u.state, null), cu(t, l, u, n), iu(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, m = wl(a, f);
      u.props = m;
      var S = u.context, N = a.contextType;
      c = Fl, typeof N == "object" && N !== null && (c = at(N));
      var M = a.getDerivedStateFromProps;
      N = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, N || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || S !== c) && Yd(
        t,
        u,
        l,
        c
      ), Za = !1;
      var _ = t.memoizedState;
      u.state = _, cu(t, l, u, n), iu(), S = t.memoizedState, f || _ !== S || Za ? (typeof M == "function" && (Js(
        t,
        a,
        M,
        l
      ), S = t.memoizedState), (m = Za || Bd(
        t,
        a,
        m,
        l,
        _,
        S,
        c
      )) ? (N || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = S), u.props = l, u.state = S, u.context = c, l = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Ts(e, t), c = t.memoizedProps, N = wl(a, c), u.props = N, M = t.pendingProps, _ = u.context, S = a.contextType, m = Fl, typeof S == "object" && S !== null && (m = at(S)), f = a.getDerivedStateFromProps, (S = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== M || _ !== m) && Yd(
        t,
        u,
        l,
        m
      ), Za = !1, _ = t.memoizedState, u.state = _, cu(t, l, u, n), iu();
      var j = t.memoizedState;
      c !== M || _ !== j || Za || e !== null && e.dependencies !== null && Si(e.dependencies) ? (typeof f == "function" && (Js(
        t,
        a,
        f,
        l
      ), j = t.memoizedState), (N = Za || Bd(
        t,
        a,
        N,
        l,
        _,
        j,
        m
      ) || e !== null && e.dependencies !== null && Si(e.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, j, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        j,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = j), u.props = l, u.state = j, u.context = m, l = N) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, cn(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = El(
      t,
      e.child,
      null,
      n
    ), t.child = El(
      t,
      null,
      a,
      n
    )) : Ve(e, t, a, n), t.memoizedState = u.state, e = t.child) : e = Aa(
      e,
      t,
      n
    ), e;
  }
  function tv(e, t, a, l) {
    return _l(), t.flags |= 256, Ve(e, t, a, l), t.child;
  }
  var Is = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ps(e) {
    return { baseLanes: e, cachePool: Zo() };
  }
  function er(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Dt), e;
  }
  function av(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (nt.current & 2) !== 0), c && (n = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (se) {
        if (n ? $a(t) : ka(), (e = De) ? (e = Tm(
          e,
          Bt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ba !== null ? { id: la, overflow: na } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Uo(e), a.return = t, t.child = a, ke = t, De = null)) : e = null, e === null) throw Ga(t);
        return Pr(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (ka(), n = t.mode, u = Yi(
        { mode: "hidden", children: u },
        n
      ), l = yl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = Ps(a), l.childLanes = er(
        e,
        c,
        a
      ), t.memoizedState = Is, du(null, l)) : ($a(t), tr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var m = f.dehydrated;
      if (m !== null)
        return ly(
          e,
          t,
          u,
          c,
          l,
          m,
          f,
          a
        );
    }
    return n ? (ka(), n = l.fallback, u = t.mode, f = e.child, m = f.sibling, l = ba(f, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, m !== null ? n = ba(m, n) : (n = yl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, du(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = Ps(a) : (u = n.cachePool, u !== null ? (f = Ye._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Zo(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = er(
      e,
      c,
      a
    ), t.memoizedState = Is, du(e.child, l)) : ($a(t), a = e.child, e = a.sibling, a = ba(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function tr(e, t) {
    return t = Yi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Yi(e, t) {
    return e = yt(22, e, null, t), e.lanes = 0, e;
  }
  function Gi(e, t, a) {
    return El(t, e.child, null, a), e = tr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function ly(e, t, a, l, n, u, c, f) {
    if (a)
      return t.flags & 256 ? ($a(t), t.flags &= -257, Gi(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (ka(), t.child = e.child, t.flags |= 128, null) : (ka(), u = n.fallback, c = t.mode, n = Yi(
        { mode: "visible", children: n.children },
        c
      ), u = yl(
        u,
        c,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, El(t, e.child, null, f), n = t.child, n.memoizedState = Ps(f), n.childLanes = er(
        e,
        l,
        f
      ), t.memoizedState = Is, du(null, n));
    if ($a(t), Pr(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var m = l.dgst;
      return l = m, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, eu({ value: n, source: null, stack: null })), Gi(
        e,
        t,
        f
      );
    }
    if (Xe || Sl(e, t, f, !1), l = (f & e.childLanes) !== 0, Xe || l) {
      if (Ja.current !== null)
        return Gi(
          e,
          t,
          f
        );
      if (l = we, l !== null && (n = qf(
        l,
        f
      ), n !== 0 && n !== c.retryLane))
        throw c.retryLane = n, gl(e, n), bt(l, e, n), Fs;
      return Ir(u) || uc(), Gi(
        e,
        t,
        f
      );
    }
    return Ir(u) ? (t.flags |= 192, t.child = e.child, null) : (e = c.treeContext, De = Gt(u.nextSibling), ke = t, se = !0, Ya = null, Bt = !1, e !== null && Lo(t, e), t = tr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function lv(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), pi(e.return, t, a);
  }
  function nv(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && wi(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Xi(e, t, a, l, n, u) {
    var c = e.memoizedState;
    c === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: n,
      treeForkCount: u
    } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = l, c.tail = a, c.tailMode = n, c.treeForkCount = u);
  }
  function ar(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var a = t.sibling;
      t.sibling = e.child, e.child = t, t = a;
    }
  }
  function lr(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, u = l.tail;
    l = l.children;
    var c = nt.current;
    if (t.flags & 128)
      return su(t, c), null;
    var f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, su(t, c), n === "backwards" && e !== null ? (ar(e), Ve(e, t, l, a), ar(e)) : Ve(e, t, l, a), l = se ? Pn : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && lv(e, a, t);
        else if (e.tag === 19)
          lv(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (n) {
      case "backwards":
        a = nv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, ar(t)), Xi(
          t,
          !0,
          n,
          null,
          u,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && wi(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = a, a = n, n = e;
        }
        Xi(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        Xi(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        a = nv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), Xi(
          t,
          !1,
          n,
          a,
          u,
          l
        );
    }
    return t.child;
  }
  function uv(e, t, a) {
    var l = t.pendingProps;
    return Xa(t, t.type, l.value), Ve(e, t, l.children, a), t.child;
  }
  function Aa(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), Pa |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (Sl(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, a = ba(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = ba(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function nr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Si(e)));
  }
  function ny(e, t, a) {
    switch (t.tag) {
      case 3:
        Ju(t, t.stateNode.containerInfo), Xa(t, Ye, e.memoizedState.cache), _l();
        break;
      case 27:
      case 5:
        Dc(t);
        break;
      case 4:
        Ju(t, t.stateNode.containerInfo);
        break;
      case 10:
        Xa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, zs(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return $a(t), t.flags |= 128, null;
          l = Sl(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? av(e, t, a) : ($a(t), e = Aa(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        }
        $a(t);
        break;
      case 19:
        if (t.flags & 128)
          return lr(
            e,
            t,
            a
          );
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (Sl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return lr(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), su(t, nt.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Fd(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        Xa(t, Ye, e.memoizedState.cache);
    }
    return Aa(e, t, a);
  }
  function iv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Xe = !0;
      else {
        if (!nr(e, a) && (t.flags & 128) === 0)
          return Xe = !1, ny(
            e,
            t,
            a
          );
        Xe = (e.flags & 131072) !== 0;
      }
    else
      Xe = !1, se && (t.flags & 1048576) !== 0 && qo(t, Pn, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Tl(t.elementType), t.type = e, typeof e == "function")
            os(e) ? (l = wl(e, l), t.tag = 1, t = ev(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = Ws(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === B) {
                t.tag = 11, t = Jd(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ie) {
                t.tag = 14, t = $d(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === Be) {
                t.tag = 10, t.type = e, t = uv(
                  null,
                  t,
                  a
                );
                break e;
              }
            }
            throw t = ye(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ws(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = wl(
          l,
          t.pendingProps
        ), ev(
          e,
          t,
          l,
          n,
          a
        );
      case 3:
        e: {
          if (Ju(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Ts(e, t), cu(t, l, null, a);
          var c = t.memoizedState;
          if (l = c.cache, Xa(t, Ye, l), l !== u.cache && _s(
            t,
            [Ye],
            a,
            !0
          ), iu(), l = c.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = tv(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== n) {
              n = Ht(
                Error(o(424)),
                t
              ), eu(n), t = tv(
                e,
                t,
                l,
                a
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (De = Gt(e.firstChild), ke = t, se = !0, Ya = null, Bt = !0, a = Fo(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (_l(), l === n) {
              t = Aa(
                e,
                t,
                a
              );
              break e;
            }
            Ve(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return cn(e, t), e === null ? (a = Dm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : se || (t.stateNode = fm(
          t.type,
          t.pendingProps,
          Ra.current,
          t
        )) : t.memoizedState = Dm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Dc(t), e === null && se && (l = t.stateNode = Am(
          t.type,
          t.pendingProps,
          Ra.current
        ), ke = t, Bt = !0, n = De, ll(t.type) ? (ef = n, De = Gt(l.firstChild)) : De = n), Ve(
          e,
          t,
          t.pendingProps.children,
          a
        ), cn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && se && ((n = l = De) && (l = Iy(
          l,
          t.type,
          t.pendingProps,
          Bt
        ), l !== null ? (t.stateNode = l, ke = t, De = Gt(l.firstChild), Bt = !1, n = !0) : n = !1), n || Ga(t)), Dc(t), n = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, l = u.children, Vr(n, u) ? l = null : c !== null && Vr(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = Os(
          e,
          t,
          Jg,
          null,
          null,
          a
        ), Nn._currentValue = n), cn(e, t), Ve(e, t, l, a), t.child;
      case 6:
        return e === null && se && ((e = a = De) && (a = Py(
          a,
          t.pendingProps,
          Bt
        ), a !== null ? (t.stateNode = a, ke = t, De = null, e = !0) : e = !1), e || Ga(t)), null;
      case 13:
        return av(e, t, a);
      case 4:
        return Ju(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = El(
          t,
          null,
          l,
          a
        ) : Ve(e, t, l, a), t.child;
      case 11:
        return Jd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, cn(e, t), Ve(e, t, l, a), t.child;
      case 8:
        return Ve(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Ve(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return uv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, bl(t), n = at(n), l = l(n), t.flags |= 1, Ve(e, t, l, a), t.child;
      case 14:
        return $d(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return kd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return lr(e, t, a);
      case 31:
        return ay(e, t, a);
      case 22:
        return Fd(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return bl(t), l = at(Ye), e === null ? (n = bs(), n === null && (n = we, u = ps(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, js(t), Xa(t, Ye, n)) : ((e.lanes & a) !== 0 && (Ts(e, t), cu(t, null, null, a), iu()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Xa(t, Ye, l)) : (l = u.cache, Xa(t, Ye, l), l !== n.cache && _s(
          t,
          [Ye],
          a,
          !0
        ))), Ve(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : se && yi(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : cn(e, t), Ve(e, t, l.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function wa(e) {
    e.flags |= 4;
  }
  function ur(e, t, a, l, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Um(t, l) : Um(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Gv()) e.flags |= 8192;
        else
          throw Nl = Ti, xs;
    } else e.flags &= -16777217;
  }
  function cv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Hm(t))
      if (Gv()) e.flags |= 8192;
      else
        throw Nl = Ti, xs;
  }
  function Qi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Rf() : 536870912, e.lanes |= t, dn |= t);
  }
  function vu(e, t) {
    if (!se)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var a = e.tail, l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
          break;
        default:
          for (t = e.tail, a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
      }
  }
  function Oe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags & 1206910976, l |= n.flags & 1206910976, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function uy(e, t, a) {
    var l = t.pendingProps;
    switch (ms(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Oe(t), null;
      case 1:
        return Oe(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Ta(Ye), ql(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (Pl(t) ? wa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gs())), Oe(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (wa(t), u !== null ? (Oe(t), cv(t, u)) : (Oe(t), ur(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (wa(t), Oe(t), cv(t, u)) : (Oe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && wa(t), Oe(t), ur(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if ($u(t), a = Ra.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && wa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Oe(t), t.subtreeFlags &= -33554433, null;
          }
          e = ta.current, Pl(t) ? Bo(t) : (e = Am(n, l, a), t.stateNode = e, wa(t));
        }
        return Oe(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if ($u(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && wa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Oe(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = ta.current, Pl(t))
            Bo(t);
          else {
            var c = Tu(
              Ra.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof l.is == "string" ? c.createElement("select", {
                      is: l.is
                    }) : c.createElement("select"), l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                    break;
                  default:
                    u = typeof l.is == "string" ? c.createElement(n, { is: l.is }) : c.createElement(n);
                }
            }
            u[tt] = t, u[gt] = l;
            e: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === t) break e;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t)
                  break e;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            t.stateNode = u;
            e: switch (it(u, n, l), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && wa(t);
          }
        }
        return Oe(t), t.subtreeFlags &= -33554433, ur(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && wa(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = Ra.current, Pl(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = ke, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[tt] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || im(e.nodeValue, a)), e || Ga(t, !0);
          } else
            e = Tu(e).createTextNode(
              l
            ), e[tt] = t, t.stateNode = e;
        }
        return Oe(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Pl(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[tt] = t;
            } else
              _l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), e = !1;
          } else
            a = gs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (wt(t), t) : (wt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Oe(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = Pl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[tt] = t;
            } else
              _l(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), n = !1;
          } else
            n = gs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (wt(t), t) : (wt(t), null);
        }
        return wt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Qi(t, t.updateQueue), Oe(t), null);
      case 4:
        return ql(), e === null && Yr(t.stateNode.containerInfo), t.flags |= 67108864, Oe(t), null;
      case 10:
        return Ta(t.type), Oe(t), null;
      case 19:
        if (Cs(t), l = t.memoizedState, l === null) return Oe(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) vu(l, !1);
          else {
            if (He !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = wi(e), u !== null) {
                  for (t.flags |= 128, vu(l, !1), e = u.updateQueue, t.updateQueue = e, Qi(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Ro(a, e), a = a.sibling;
                  return su(
                    t,
                    nt.current & 1 | 2
                  ), se && xa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && jt() > tc && (t.flags |= 128, n = !0, vu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = wi(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Qi(t, e), vu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !se)
                return Oe(t), null;
            } else
              2 * jt() - l.renderingStartTime > tc && a !== 536870912 && (t.flags |= 128, n = !0, vu(l, !1), t.lanes = 4194304);
          l.isBackwards ? (u.sibling = t.child, t.child = u) : (e = l.last, e !== null ? e.sibling = u : t.child = u, l.last = u);
        }
        if (l.tail !== null) {
          e = l.tail;
          e: {
            for (a = e; a !== null; ) {
              if (a.alternate !== null) {
                a = !1;
                break e;
              }
              a = a.sibling;
            }
            a = !0;
          }
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = jt(), e.sibling = null, u = nt.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || se ? su(t, u) : (a = u, Ce(lt, t), Ce(nt, a), rt === null && (rt = t)), se && xa(t, l.treeForkCount), e;
        }
        return Oe(t), null;
      case 22:
      case 23:
        return wt(t), ws(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oe(t), a = t.updateQueue, a !== null && Qi(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && et(jl), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Ta(Ye), Oe(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Oe(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function iy(e, t) {
    switch (ms(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Ta(Ye), ql(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return $u(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (wt(t), t.alternate === null)
            throw Error(o(340));
          _l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (wt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          _l();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Cs(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return ql(), null;
      case 10:
        return Ta(t.type), null;
      case 22:
      case 23:
        return wt(t), ws(), e !== null && et(jl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Ta(Ye), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function sv(e, t) {
    switch (ms(t), t.tag) {
      case 3:
        Ta(Ye), ql();
        break;
      case 26:
      case 27:
      case 5:
        $u(t);
        break;
      case 4:
        ql();
        break;
      case 31:
        t.memoizedState !== null && wt(t);
        break;
      case 13:
        wt(t);
        break;
      case 19:
        Cs(t);
        break;
      case 10:
        Ta(t.type);
        break;
      case 22:
      case 23:
        wt(t), ws(), e !== null && et(jl);
        break;
      case 24:
        Ta(Ye);
    }
  }
  function mu(e, t) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var u = a.create, c = a.inst;
            l = u(), c.destroy = l;
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (f) {
      Ne(t, t.return, f);
    }
  }
  function Fa(e, t, a) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            var c = l.inst, f = c.destroy;
            if (f !== void 0) {
              c.destroy = void 0, n = t;
              var m = a, S = f;
              try {
                S();
              } catch (N) {
                Ne(
                  n,
                  m,
                  N
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (N) {
      Ne(t, t.return, N);
    }
  }
  function rv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Io(t, a);
      } catch (l) {
        Ne(e, e.return, l);
      }
    }
  }
  function fv(e, t, a) {
    a.props = wl(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ne(e, t, l);
    }
  }
  function ua(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            var n = e.stateNode, u = pa(e.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = ym(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var c = new Mt(e);
              b(
                e.child,
                !1,
                Fy,
                c,
                void 0,
                void 0
              ), e.stateNode = c;
            }
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (f) {
      Ne(e, t, f);
    }
  }
  function ut(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          Ne(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          Ne(e, t, n);
        }
      else a.current = null;
  }
  function Zi(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var a = 0; a < t.length; a++)
        jm(
          e.stateNode,
          t[a]
        );
  }
  function ov(e) {
    for (var t = e.return; t !== null && (cr(t) && jm(e.stateNode, t.stateNode), !ir(t)); )
      t = t.return;
  }
  function hu(e) {
    for (var t = e.return; t !== null && (cr(t) && Wy(e.stateNode, t.stateNode), !ir(t)); )
      t = t.return;
  }
  function ir(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function cr(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function sr(e) {
    var t = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      Ne(e, e.return, n);
    }
  }
  function rr(e, t, a) {
    try {
      var l = e.stateNode;
      Oy(l, e.type, a, t), l[gt] = t;
    } catch (n) {
      Ne(e, e.return, n);
    }
  }
  function dv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ll(e.type) || e.tag === 4;
  }
  function fr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || dv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ll(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function or(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = aa)), Zi(e, l), _e = !0;
    else if (n !== 4 && (n === 27 && (Zi(e, l), l = null, ll(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
      for (or(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        or(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function Vi(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? a.insertBefore(n, t) : a.appendChild(n), Zi(e, l), _e = !0;
    else if (n !== 4 && (n === 27 && (Zi(e, l), l = null, ll(e.type) && (a = e.stateNode)), e = e.child, e !== null))
      for (Vi(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        Vi(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function vv(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      it(t, l, a), t[tt] = e, t[gt] = a;
    } catch (u) {
      Ne(e, e.return, u);
    }
  }
  var Ki = !1, zt = null;
  function mv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ki = !0);
  }
  var ia = null;
  function hv() {
    var e = ia;
    return ia = null, e;
  }
  var _t = 0;
  function sn(e, t, a, l, n) {
    return _t = 0, gv(
      e.child,
      t,
      a,
      l,
      n
    );
  }
  function gv(e, t, a, l, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var c = e.stateNode;
        if (l !== null) {
          var f = $r(c);
          l.push(f), f.view && (u = !0);
        } else
          u || $r(c).view && (u = !0);
        Ki = !0, hm(
          c,
          _t === 0 ? t : t + "_" + _t,
          a
        ), _t++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || gv(
        e.child,
        t,
        a,
        l,
        n
      ) && (u = !0));
      e = e.sibling;
    }
    return u;
  }
  function ca(e, t) {
    for (; e !== null; )
      e.tag === 5 ? gm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || ca(
        e.child,
        t
      )), e = e.sibling;
  }
  function Ji(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Ji(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var a = t.name;
          t = Sa(t.default, t.share), t !== "none" && (sn(
            e,
            a,
            t,
            null,
            !1
          ) || ca(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function dr(e, t) {
    if (e.tag === 30) {
      var a = e.stateNode, l = e.memoizedProps, n = pa(l, a), u = Sa(
        l.default,
        a.paired ? l.share : l.enter
      );
      u !== "none" ? sn(e, n, u, null, !1) ? (Ji(e), a.paired || t || gn(e, l.onEnter)) : ca(e.child, !1) : Ji(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        dr(e, t), e = e.sibling;
    else Ji(e);
  }
  function vr(e) {
    if (zt !== null && zt.size !== 0) {
      var t = zt;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var a = e.memoizedProps, l = a.name;
              if (l != null && l !== "auto") {
                var n = t.get(l);
                if (n !== void 0) {
                  var u = Sa(
                    a.default,
                    a.share
                  );
                  if (u !== "none" && (sn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, gn(e, a.onShare)) : ca(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            vr(e);
          }
          e = e.sibling;
        }
    }
  }
  function mr(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, a = pa(t, e.stateNode), l = zt !== null ? zt.get(a) : void 0, n = Sa(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      n !== "none" && (sn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, zt.delete(a), gn(e, t.onShare)) : gn(e, t.onExit) : ca(e.child, !1)), zt !== null && vr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        mr(e), e = e.sibling;
    else
      zt !== null && vr(e);
  }
  function yv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = pa(t, e.stateNode);
        t = Sa(t.default, t.update), e.flags &= -5, t !== "none" && sn(
          e,
          a,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && yv(e);
      e = e.sibling;
    }
  }
  function hr(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, ca(e.child, !1));
          }
          hr(e);
        }
        e = e.sibling;
      }
  }
  function $i(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, ca(e.child, !1), hr(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        $i(e), e = e.sibling;
    else hr(e);
  }
  function _v(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? ca(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && _v(e), e = e.sibling;
  }
  function gr(e, t, a, l, n, u, c) {
    for (var f = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (u !== null && _t < u.length) {
          var S = u[_t], N = $r(m);
          (S.view || N.view) && (f = !0);
          var M;
          if (M = (e.flags & 4) === 0)
            if (N.clip) M = !0;
            else {
              M = S.rect;
              var _ = N.rect;
              M = M.y !== _.y || M.x !== _.x || M.height !== _.height || M.width !== _.width;
            }
          M && (e.flags |= 4), N.abs ? N = !S.abs : (S = S.rect, N = N.rect, N = S.height !== N.height || S.width !== N.width), N && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && hm(
          m,
          _t === 0 ? a : a + "_" + _t,
          n
        ), f && (e.flags & 4) !== 0 || (ia === null && (ia = []), ia.push(
          m,
          _t === 0 ? l : l + "_" + _t,
          t.memoizedProps
        )), _t++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && c ? e.flags |= t.flags & 32 : gr(
        e,
        t.child,
        a,
        l,
        n,
        u,
        c
      ) && (f = !0));
      t = t.sibling;
    }
    return f;
  }
  function pv(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var a = e.memoizedProps, l = e.stateNode, n = pa(a, l), u = Sa(a.default, a.update), c;
        c = e.memoizedState, e.memoizedState = null, l = e;
        var f = e.child;
        _t = 0, n = gr(
          l,
          f,
          n,
          n,
          u,
          c,
          !1
        ), (e.flags & 4) !== 0 && n && gn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && pv(e);
      e = e.sibling;
    }
  }
  var Fe = !1, je = !1, sa = !1, yr = !1, Sv = typeof WeakSet == "function" ? WeakSet : Set, We = null, ra = !1, gu = !1, ki = !1, _r = !1;
  function cy(e, t, a) {
    if (e = e.containerInfo, Qr = En, e = To(e), ns(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var u = n.anchorOffset, c = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, c.nodeType;
            } catch {
              l = null;
              break e;
            }
            var f = 0, m = -1, S = -1, N = 0, M = 0, _ = e, j = null;
            t: for (; ; ) {
              for (var q; _ !== l || u !== 0 && _.nodeType !== 3 || (m = f + u), _ !== c || n !== 0 && _.nodeType !== 3 || (S = f + n), _.nodeType === 3 && (f += _.nodeValue.length), (q = _.firstChild) !== null; )
                j = _, _ = q;
              for (; ; ) {
                if (_ === e) break t;
                if (j === l && ++N === u && (m = f), j === c && ++M === n && (S = f), (q = _.nextSibling) !== null) break;
                _ = j, j = _.parentNode;
              }
              _ = q;
            }
            l = m === -1 || S === -1 ? null : { start: m, end: S };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Zr = { focusedElem: e, selectionRange: l }, En = !1, a = (a & 335544064) === a, We = t, t = a ? 9270 : 1024; We !== null; ) {
      if (e = We, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && mr(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && mv(e), Fi(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && mr(l), Fi(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && mv(e), Fi(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, We = l) : (a && yv(e), Fi(a));
      }
    }
    zt = null;
  }
  function Fi(e) {
    for (; We !== null; ) {
      var t = We, a = e, l = t.alternate, n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((n & 1024) !== 0 && l !== null) {
            a = void 0, n = l.memoizedProps, l = l.memoizedState;
            var u = t.stateNode;
            try {
              var c = wl(
                t.type,
                n
              );
              a = u.getSnapshotBeforeUpdate(
                c,
                l
              ), u.__reactInternalSnapshotBeforeUpdate = a;
            } catch (f) {
              Ne(t, t.return, f);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
              Wr(l);
            else if (a === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Wr(l);
                  break;
                default:
                  l.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          a && l !== null && (a = pa(
            l.memoizedProps,
            l.stateNode
          ), n = t.memoizedProps, n = Sa(n.default, n.update), n !== "none" && sn(
            l,
            a,
            n,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(o(163));
      }
      if (l = t.sibling, l !== null) {
        l.return = t.return, We = l;
        break;
      }
      We = t.return;
    }
  }
  function bv(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        fa(e, a), l & 4 && mu(5, a);
        break;
      case 1:
        if (fa(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              Ne(a, a.return, c);
            }
          else {
            var n = wl(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                n,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (c) {
              Ne(
                a,
                a.return,
                c
              );
            }
          }
        l & 64 && rv(a), l & 512 && ua(a, a.return);
        break;
      case 3:
        if (fa(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            Io(e, t);
          } catch (c) {
            Ne(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && l & 4 && vv(a);
      case 26:
      case 5:
        fa(e, a), t === null && l & 4 && sr(a), l & 512 && ua(a, a.return);
        break;
      case 12:
        fa(e, a);
        break;
      case 31:
        fa(e, a), l & 4 && Nv(e, a);
        break;
      case 13:
        fa(e, a), l & 4 && Ev(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = py.bind(
          null,
          a
        ), e0(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Fe, !l) {
          var u = t !== null && t.memoizedState !== null || je;
          t = Fe, n = je, Fe = l, (je = u) && !n ? (l = 2, (a.subtreeFlags & 8772) !== 0 && (l |= 1), kt(
            e,
            a,
            l
          )) : fa(e, a), Fe = t, je = n;
        }
        break;
      case 30:
        fa(e, a), l & 512 && ua(a, a.return);
        break;
      case 7:
        l & 512 && ua(a, a.return);
      default:
        fa(e, a);
    }
  }
  function pr(e, t) {
    for (e = e.child; e !== null; )
      xv(e, t), e = e.sibling;
  }
  function xv(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var a = e.stateNode;
          if (t) {
            var l = a.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var n = e.stateNode, u = e.memoizedProps.style, c = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = c == null || typeof c == "boolean" ? "" : ("" + c).trim();
          }
        } catch (m) {
          Ne(e, e.return, m);
        }
        Sr(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, _e = !0;
        } catch (m) {
          Ne(e, e.return, m);
        }
        break;
      case 18:
        try {
          var f = e.stateNode;
          t ? mm(f, !0) : mm(e.stateNode, !1);
        } catch (m) {
          Ne(e, e.return, m);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && pr(e, t);
        break;
      default:
        pr(e, t);
    }
  }
  function Sr(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var a = e, l = t;
          switch (a.tag) {
            case 4:
              xv(a, l);
              break e;
            case 22:
              a.memoizedState === null && Sr(a, l);
              break e;
            default:
              Sr(a, l);
          }
        }
        e = e.sibling;
      }
  }
  function jv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, jv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ti(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Me = null, pt = !1;
  function Jt(e, t, a) {
    for (a = a.child; a !== null; )
      Tv(e, t, a), a = a.sibling;
  }
  function Tv(e, t, a) {
    if (Tt && typeof Tt.onCommitFiberUnmount == "function")
      try {
        Tt.onCommitFiberUnmount(Bn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        je || ut(a, t), Jt(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !je && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        je || ut(a, t), hu(a);
        var l = Me, n = pt;
        ll(a.type) && (Me = a.stateNode, pt = !1), Jt(
          e,
          t,
          a
        ), wm(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), Me = l, pt = n;
        break;
      case 5:
        je || ut(a, t), hu(a);
      case 6:
        if (a.tag === 6 && hu(a), l = Me, n = pt, Me = null, Jt(
          e,
          t,
          a
        ), Me = l, pt = n, Me !== null)
          if (pt)
            try {
              (Me.nodeType === 9 ? Me.body : Me.nodeName === "HTML" ? Me.ownerDocument.body : Me).removeChild(a.stateNode), _e = !0;
            } catch (u) {
              Ne(
                a,
                t,
                u
              );
            }
          else
            try {
              Me.removeChild(a.stateNode), _e = !0;
            } catch (u) {
              Ne(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        Me !== null && (pt ? (e = Me, vm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), An(e)) : vm(Me, a.stateNode));
        break;
      case 4:
        l = Me, n = pt, Me = a.stateNode.containerInfo, pt = !0, Jt(
          e,
          t,
          a
        ), Me = l, pt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Fa(2, a, t), je || Fa(4, a, t), Jt(
          e,
          t,
          a
        );
        break;
      case 1:
        je || (ut(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && fv(
          a,
          t,
          l
        )), Jt(
          e,
          t,
          a
        );
        break;
      case 21:
        Jt(
          e,
          t,
          a
        );
        break;
      case 22:
        je = (l = je) || a.memoizedState !== null, Jt(
          e,
          t,
          a
        ), je = l;
        break;
      case 30:
        ut(a, t), Jt(
          e,
          t,
          a
        );
        break;
      case 7:
        je || ut(a, t), Jt(
          e,
          t,
          a
        );
        break;
      default:
        Jt(
          e,
          t,
          a
        );
    }
  }
  function Nv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        An(e);
      } catch (a) {
        Ne(t, t.return, a);
      }
    }
  }
  function Ev(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        An(e);
      } catch (a) {
        Ne(t, t.return, a);
      }
  }
  function sy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Sv()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Sv()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Wi(e, t) {
    var a = sy(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var n = Sy.bind(null, e, l);
        l.then(n, n);
      }
    });
  }
  function vt(e, t, a) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n], c = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (ll(m.type)) {
                Me = m.stateNode, pt = !1;
                break e;
              }
              break;
            case 5:
              Me = m.stateNode, pt = !1;
              break e;
            case 3:
            case 4:
              Me = m.stateNode.containerInfo, pt = !0;
              break e;
          }
          m = m.return;
        }
        if (Me === null) throw Error(o(160));
        Tv(c, f, u), Me = null, pt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Av(t, e, a), t = t.sibling;
  }
  var $t = null;
  function Av(e, t, a) {
    var l = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var u = 0; u < l.length; u++) {
            var c = l[u];
            c.ref.impl = c.nextImpl;
          }
        vt(t, e, a), mt(e), n & 4 && (Fa(3, e, e.return), mu(3, e), Fa(5, e, e.return));
        break;
      case 1:
        vt(t, e, a), mt(e), n & 512 && (je || l === null || ut(l, l.return)), n & 64 && Fe && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = $t, vt(t, e, a), mt(e), n & 512 && (je || l === null || ut(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (Fe)
                  e.stateNode = fm(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, a = e.memoizedProps, n = u.ownerDocument || u;
                    t: switch (t) {
                      case "title":
                        l = n.getElementsByTagName("title")[0], (!l || l[Xn] || l[tt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = n.createElement(t), n.head.insertBefore(
                          l,
                          n.querySelector("head > title")
                        )), it(l, t, a), l[tt] = e, $e(l), t = l;
                        break e;
                      case "link":
                        if (u = Rm(
                          "link",
                          "href",
                          n
                        ).get(t + (a.href || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (l = u[c], l.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && l.getAttribute("rel") === (a.rel == null ? null : a.rel) && l.getAttribute("title") === (a.title == null ? null : a.title) && l.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              u.splice(c, 1);
                              break t;
                            }
                        }
                        l = n.createElement(t), it(l, t, a), n.head.appendChild(l);
                        break;
                      case "meta":
                        if (u = Rm(
                          "meta",
                          "content",
                          n
                        ).get(t + (a.content || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (l = u[c], l.getAttribute("content") === (a.content == null ? null : "" + a.content) && l.getAttribute("name") === (a.name == null ? null : a.name) && l.getAttribute("property") === (a.property == null ? null : a.property) && l.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && l.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              u.splice(c, 1);
                              break t;
                            }
                        }
                        l = n.createElement(t), it(l, t, a), n.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[tt] = e, $e(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                Fe || nf(u, e.type, e.stateNode);
            else
              e.stateNode = Mm(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || je || t.parentNode.removeChild(t)) : n.count--, a === null ? Fe || nf(u, e.type, e.stateNode) : Mm(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && rr(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        vt(t, e, a), mt(e), n & 512 && (je || l === null || ut(l, l.return)), l !== null && n & 4 && rr(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = sa, sa = !1, vt(t, e, a), sa = u, mt(e), n & 512 && (je || l === null || ut(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Ql(t, ""), _e = !0;
          } catch (N) {
            Ne(e, e.return, N);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, rr(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), n & 1024 && (yr = !0);
        break;
      case 6:
        if (vt(t, e, a), mt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = t, _e = !0;
          } catch (N) {
            Ne(e, e.return, N);
          }
        }
        break;
      case 3:
        if (_e = !1, dc = null, u = $t, $t = Nu(t.containerInfo), vt(t, e, a), $t = u, mt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            An(t.containerInfo);
          } catch (N) {
            Ne(e, e.return, N);
          }
        yr && (yr = !1, wv(e)), _e = !1;
        break;
      case 4:
        n = sa, sa = Fe, l = Jf(), u = $t, $t = Nu(
          e.stateNode.containerInfo
        ), vt(t, e, a), mt(e), $t = u, _e && gu && (ki = !0), _e = l, sa = n;
        break;
      case 12:
        vt(t, e, a), mt(e);
        break;
      case 31:
        vt(t, e, a), mt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Wi(e, t)));
        break;
      case 13:
        vt(t, e, a), mt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ec = jt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Wi(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, c = l !== null && l.memoizedState !== null;
        var f = Fe, m = je, S = sa;
        Fe = f || u, sa = S || u, je = m || c, vt(t, e, a), je = m, sa = S, Fe = f, mt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || c || Fe || je || (t = c || je, a = Fe, l = je, Fe = u || Fe, je = t, Wa(e, 2), Fe = a, je = l), !u && sa || pr(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, Wi(e, a))));
        break;
      case 19:
        vt(t, e, a), mt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Wi(e, t)));
        break;
      case 30:
        n & 512 && (je || l === null || ut(l, l.return)), n = Jf(), u = gu, c = (a & 335544064) === a, f = e.memoizedProps, gu = c && Sa(
          f.default,
          f.update
        ) !== "none", vt(t, e, a), mt(e), c && l !== null && _e && (e.flags |= 4), gu = u, _e = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (je || l === null || ut(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        vt(t, e, a), mt(e);
    }
  }
  function mt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (dv(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var n = e.return; n !== null; ) {
          if (cr(n)) {
            var u = n.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (ir(n)) break;
          n = n.return;
        }
        var c = l;
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, m = fr(e);
            Vi(
              e,
              m,
              f,
              c
            );
            break;
          case 5:
            var S = a.stateNode;
            a.flags & 32 && (Ql(S, ""), a.flags &= -33);
            var N = fr(e);
            Vi(
              e,
              N,
              S,
              c
            );
            break;
          case 3:
          case 4:
            var M = a.stateNode.containerInfo, _ = fr(e);
            or(
              e,
              _,
              M,
              c
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (j) {
        Ne(e, e.return, j);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function wv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        wv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, En = !0, t.reset(), En = !1), e = e.sibling;
      }
  }
  function rn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        zv(t, e), t = t.sibling;
    else pv(t);
  }
  function zv(e, t) {
    var a = e.alternate;
    if (a === null) dr(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (_r = ra = !1, hv(), rn(t, e), !ra && !ki) {
            if (e = ia, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                a = e[l];
                var n = e[l + 1];
                gm(a, e[l + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + n + ")"
                  }
                );
              }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), e.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), _r = !0;
          }
          ia = null;
          break;
        case 5:
          rn(t, e);
          break;
        case 4:
          l = ra, ra = !1, rn(t, e), ra && (ki = !0), ra = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? dr(e, !1) : rn(t, e));
          break;
        case 30:
          l = ra, n = hv(), ra = !1, rn(t, e), ra && (e.flags |= 4);
          var u = e.memoizedProps, c = e.stateNode;
          t = pa(u, c), c = pa(a.memoizedProps, c);
          var f = Sa(u.default, u.update);
          f === "none" ? t = !1 : (u = a.memoizedState, a.memoizedState = null, a = e.child, _t = 0, t = gr(
            e,
            a,
            t,
            c,
            f,
            u,
            !0
          ), _t !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (gn(
            e,
            e.memoizedProps.onUpdate
          ), ia = n) : n !== null && (n.push.apply(n, ia), ia = n), ra = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          rn(t, e);
      }
  }
  function fa(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        bv(e, t.alternate, t), t = t.sibling;
  }
  function Wa(e, t) {
    for (e = e.child; e !== null; ) {
      var a = e, l = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Fa(4, a, a.return), Wa(
            a,
            l
          );
          break;
        case 1:
          ut(a, a.return);
          var n = a.stateNode;
          typeof n.componentWillUnmount == "function" && fv(
            a,
            a.return,
            n
          ), Wa(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && wm(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          ut(a, a.return), a.tag !== 5 && a.tag !== 27 || hu(a), Wa(
            a,
            l
          );
          break;
        case 6:
          hu(a);
          break;
        case 26:
          ut(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || je || n.parentNode.removeChild(n), Wa(
            a,
            l
          );
          break;
        case 22:
          a.memoizedState === null && Wa(
            a,
            l
          );
          break;
        case 30:
          ut(a, a.return), Wa(
            a,
            l
          );
          break;
        case 7:
          ut(a, a.return);
        default:
          Wa(
            a,
            l
          );
      }
      e = e.sibling;
    }
  }
  function kt(e, t, a) {
    for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, u = t, c = u.flags, f = (a & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          kt(
            n,
            u,
            a
          ), mu(4, u);
          break;
        case 1:
          if (kt(
            n,
            u,
            a
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (N) {
              Ne(l, l.return, N);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var m = l.stateNode;
            try {
              var S = n.shared.hiddenCallbacks;
              if (S !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < S.length; n++)
                  Wo(S[n], m);
            } catch (N) {
              Ne(l, l.return, N);
            }
          }
          f && c & 64 && rv(u), ua(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && vv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || ov(u), kt(
            n,
            u,
            a
          ), f && l === null && c & 4 && sr(u), ua(u, u.return);
          break;
        case 6:
          ov(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || Fe || nf(
            Nu(m.ownerDocument),
            u.type,
            m
          ), kt(
            n,
            u,
            a
          ), f && l === null && c & 4 && sr(u), ua(u, u.return);
          break;
        case 12:
          kt(
            n,
            u,
            a
          );
          break;
        case 31:
          kt(
            n,
            u,
            a
          ), f && c & 4 && Nv(n, u);
          break;
        case 13:
          kt(
            n,
            u,
            a
          ), f && c & 4 && Ev(n, u);
          break;
        case 22:
          u.memoizedState === null && kt(
            n,
            u,
            a
          ), ua(u, u.return);
          break;
        case 30:
          kt(
            n,
            u,
            a
          ), ua(u, u.return);
          break;
        case 7:
          ua(u, u.return);
        default:
          kt(
            n,
            u,
            a
          );
      }
      t = t.sibling;
    }
  }
  function br(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && tu(a));
  }
  function xr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && tu(e));
  }
  function Yt(e, t, a, l) {
    var n = (a & 335544064) === a;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Cv(
          e,
          t,
          a,
          l
        ), t = t.sibling;
    else n && _v(t);
  }
  function Cv(e, t, a, l) {
    var n = (a & 335544064) === a;
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && $i(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Yt(
          e,
          t,
          a,
          l
        ), u & 2048 && mu(9, t);
        break;
      case 1:
        Yt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Yt(
          e,
          t,
          a,
          l
        ), n && _r && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && tu(u)));
        break;
      case 12:
        if (u & 2048) {
          Yt(
            e,
            t,
            a,
            l
          ), u = t.stateNode;
          try {
            var c = t.memoizedProps, f = c.id, m = c.onPostCommit;
            typeof m == "function" && m(
              f,
              t.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (S) {
            Ne(t, t.return, S);
          }
        } else
          Yt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Yt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Yt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && $i(f), c._visibility & 2 ? Yt(
          e,
          t,
          a,
          l
        ) : yu(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && $i(t), c._visibility & 2 ? Yt(
          e,
          t,
          a,
          l
        ) : (c._visibility |= 2, fn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && br(f, t);
        break;
      case 24:
        Yt(
          e,
          t,
          a,
          l
        ), u & 2048 && xr(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (ca(u.child, !0), ca(t.child, !0))), Yt(
          e,
          t,
          a,
          l
        );
        break;
      default:
        Yt(
          e,
          t,
          a,
          l
        );
    }
  }
  function fn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, f = a, m = l, S = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          fn(
            u,
            c,
            f,
            m,
            n
          ), mu(8, c);
          break;
        case 23:
          break;
        case 22:
          var N = c.stateNode;
          c.memoizedState !== null ? N._visibility & 2 ? fn(
            u,
            c,
            f,
            m,
            n
          ) : yu(
            u,
            c
          ) : (N._visibility |= 2, fn(
            u,
            c,
            f,
            m,
            n
          )), n && S & 2048 && br(
            c.alternate,
            c
          );
          break;
        case 24:
          fn(
            u,
            c,
            f,
            m,
            n
          ), n && S & 2048 && xr(c.alternate, c);
          break;
        default:
          fn(
            u,
            c,
            f,
            m,
            n
          );
      }
      t = t.sibling;
    }
  }
  function yu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            yu(a, l), n & 2048 && br(
              l.alternate,
              l
            );
            break;
          case 24:
            yu(a, l), n & 2048 && xr(l.alternate, l);
            break;
          default:
            yu(a, l);
        }
        t = t.sibling;
      }
  }
  var zl = 8192;
  function Cl(e, t, a) {
    if (e.subtreeFlags & zl)
      for (e = e.child; e !== null; )
        Dv(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function Dv(e, t, a) {
    switch (e.tag) {
      case 26:
        Cl(
          e,
          t,
          a
        ), e.flags & zl && (e.memoizedState !== null ? m0(
          a,
          $t,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Lm(a, e)));
        break;
      case 5:
        Cl(
          e,
          t,
          a
        ), e.flags & zl && (e = e.stateNode, (t & 335544128) === t && Lm(a, e));
        break;
      case 3:
      case 4:
        var l = $t;
        $t = Nu(e.stateNode.containerInfo), Cl(
          e,
          t,
          a
        ), $t = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = zl, zl = 16777216, Cl(
          e,
          t,
          a
        ), zl = l) : Cl(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & zl) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, zt === null && (zt = /* @__PURE__ */ new Map()), zt.set(l, n);
        }
        Cl(
          e,
          t,
          a
        );
        break;
      default:
        Cl(
          e,
          t,
          a
        );
    }
  }
  function Ov(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function _u(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          We = l, Rv(
            l,
            e
          );
        }
      Ov(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Mv(e), e = e.sibling;
  }
  function Mv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        _u(e), e.flags & 2048 && Fa(9, e, e.return);
        break;
      case 3:
        _u(e);
        break;
      case 12:
        _u(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ii(e)) : _u(e);
        break;
      default:
        _u(e);
    }
  }
  function Ii(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          We = l, Rv(
            l,
            e
          );
        }
      Ov(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Fa(8, t, t.return), Ii(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Ii(t));
          break;
        default:
          Ii(t);
      }
      e = e.sibling;
    }
  }
  function Rv(e, t) {
    for (; We !== null; ) {
      var a = We;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Fa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          tu(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, We = l;
      else
        e: for (a = e; We !== null; ) {
          l = We;
          var n = l.sibling, u = l.return;
          if (jv(l), l === a) {
            We = null;
            break e;
          }
          if (n !== null) {
            n.return = u, We = n;
            break e;
          }
          We = u;
        }
    }
  }
  var ry = {
    getCacheForType: function(e) {
      var t = at(Ye), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return at(Ye).controller.signal;
    }
  }, fy = typeof WeakMap == "function" ? WeakMap : Map, be = 0, we = null, re = null, oe = 0, Te = 0, Ct = null, Ia = !1, on = !1, jr = !1, za = 0, He = 0, Pa = 0, Dl = 0, Pi = 0, Dt = 0, dn = 0, pu = null, St = null, Tr = !1, ec = 0, Uv = 0, tc = 1 / 0, ac = null, el = null, Re = 0, Ft = null, Ol = null, oa = 0, Nr = 0, Er = null, Hv = null, vn = null, mn = null, hn = null, Su = 0, lc = null;
  function Ot() {
    return (be & 2) !== 0 && oe !== 0 ? oe & -oe : K.T !== null ? Hr() : Lf();
  }
  function qv() {
    if (Dt === 0)
      if ((oe & 536870912) === 0 || se) {
        var e = Wu;
        Wu <<= 1, (Wu & 3932160) === 0 && (Wu = 262144), Dt = e;
      } else Dt = 536870912;
    return e = lt.current, e !== null && (e.flags |= 32), Dt;
  }
  function gn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = ym(
        pa(e.memoizedProps, a)
      )), mn === null && (mn = []), mn.push(t.bind(null, l));
    }
  }
  function bt(e, t, a) {
    (e === we && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null) && (yn(e, 0), tl(
      e,
      oe,
      Dt,
      !1
    )), Gn(e, a), ((be & 2) === 0 || e !== we) && (e === we && ((be & 2) === 0 && (Dl |= a), He === 4 && tl(
      e,
      oe,
      Dt,
      !1
    )), da(e));
  }
  function Lv(e, t, a) {
    if ((be & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Yn(e, t), n = l ? vy(e, t) : wr(e, t, !0), u = l;
    do {
      if (n === 0) {
        on && !l && tl(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !oy(a)) {
          n = wr(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = e.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            t = c;
            e: {
              var f = e;
              n = pu;
              var m = f.current.memoizedState.isDehydrated;
              if (m && (yn(f, c).flags |= 256), c = wr(
                f,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (jr && !m) {
                  f.errorRecoveryDisabledLanes |= u, Dl |= u, n = 4;
                  break e;
                }
                u = St, St = n, u !== null && (St === null ? St = u : St.push.apply(
                  St,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          yn(e, 0), tl(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              tl(
                l,
                t,
                Dt,
                !Ia
              );
              break e;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = ec + 300 - jt(), 10 < n)) {
            if (tl(
              l,
              t,
              Dt,
              !Ia
            ), Pu(l, 0, !0) !== 0) break e;
            oa = t, l.timeoutHandle = Jr(
              Bv.bind(
                null,
                l,
                a,
                St,
                ac,
                Tr,
                t,
                Dt,
                Dl,
                dn,
                Ia,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Bv(
            l,
            a,
            St,
            ac,
            Tr,
            t,
            Dt,
            Dl,
            dn,
            Ia,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    da(e);
  }
  function Bv(e, t, a, l, n, u, c, f, m, S, N, M, _, j) {
    e.timeoutHandle = -1;
    var q = t.subtreeFlags, Q = (u & 335544064) === u;
    if (M = null, (Q || q & 8192 || (q & 16785408) === 16785408) && (M = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: aa
    }, zt = null, Dv(
      t,
      u,
      M
    ), Q && (q = M, Q = e.containerInfo, Q = (Q.nodeType === 9 ? Q : Q.ownerDocument).__reactViewTransition, Q != null && (q.count++, q.waitingForViewTransition = !0, q = wu.bind(q), Q.finished.then(q, q))), q = (u & 62914560) === u ? ec - jt() : (u & 4194048) === u ? Uv - jt() : 0, q = h0(
      M,
      q
    ), q !== null)) {
      oa = u, e.cancelPendingCommit = q(
        Jv.bind(
          null,
          e,
          t,
          u,
          a,
          l,
          n,
          c,
          f,
          m,
          S,
          N,
          M,
          null,
          _,
          j
        )
      ), tl(e, u, c, !S);
      return;
    }
    Jv(
      e,
      t,
      u,
      a,
      l,
      n,
      c,
      f,
      m,
      S,
      N,
      M
    );
  }
  function oy(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!At(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function tl(e, t, a, l) {
    t = Mf(e, t), t &= ~Pi, t &= ~Dl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Nt(n), c = 1 << u;
      l[u] = -1, n &= ~c;
    }
    a !== 0 && Uf(e, a, t);
  }
  function nc() {
    return (be & 6) === 0 ? (bu(0), !1) : !0;
  }
  function Ar() {
    if (re !== null) {
      if (Te === 0)
        var e = re.return;
      else
        e = re, ja = pl = null, Us(e), an = null, nu = 0, e = re;
      for (; e !== null; )
        sv(e.alternate, e), e = e.return;
      re = null;
    }
  }
  function yn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, Uy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), oa = 0, Ar(), we = e, re = a = ba(e.current, null), oe = t, Te = 0, Ct = null, Ia = !1, on = Yn(e, t), jr = !1, dn = Dt = Pi = Dl = Pa = He = 0, St = pu = null, Tr = !1, za = Mf(e, t), di(), a;
  }
  function Yv(e, t) {
    ne = null, K.H = qi, t === tn || t === ji ? (t = Jo(), Te = 3) : t === xs ? (t = Jo(), Te = 4) : Te = t === Fs ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ct = t, re === null && (He = 1, Li(
      e,
      Ht(t, e.current)
    ));
  }
  function Gv() {
    var e = lt.current;
    return e === null ? !0 : (oe & 4194048) === oe ? rt === null : (oe & 62914560) === oe || (oe & 536870912) !== 0 ? e === rt : !1;
  }
  function Xv() {
    var e = K.H;
    return K.H = qi, e === null ? qi : e;
  }
  function Qv() {
    var e = K.A;
    return K.A = ry, e;
  }
  function uc() {
    He = 4, Ia || (oe & 4194048) !== oe && lt.current !== null || (on = !0), (Pa & 134217727) === 0 && (Dl & 134217727) === 0 || we === null || tl(
      we,
      oe,
      Dt,
      !1
    );
  }
  function wr(e, t, a) {
    var l = be;
    be |= 2;
    var n = Xv(), u = Qv();
    (we !== e || oe !== t) && (ac = null, yn(e, t)), t = !1;
    var c = He;
    e: do
      try {
        if (Te !== 0 && re !== null) {
          var f = re, m = Ct;
          switch (Te) {
            case 8:
              Ar(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              lt.current === null && (t = !0);
              var S = Te;
              if (Te = 0, Ct = null, _n(e, f, m, S), a && on) {
                c = 0;
                break e;
              }
              break;
            default:
              S = Te, Te = 0, Ct = null, _n(e, f, m, S);
          }
        }
        dy(), c = He;
        break;
      } catch (N) {
        Yv(e, N);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ja = pl = null, be = l, K.H = n, K.A = u, re === null && (we = null, oe = 0, di()), c;
  }
  function dy() {
    for (; re !== null; ) Zv(re);
  }
  function vy(e, t) {
    var a = be;
    be |= 2;
    var l = Xv(), n = Qv();
    we !== e || oe !== t ? (ac = null, tc = jt() + 500, yn(e, t)) : on = Yn(
      e,
      t
    );
    e: do
      try {
        if (Te !== 0 && re !== null) {
          t = re;
          var u = Ct;
          t: switch (Te) {
            case 1:
              Te = 0, Ct = null, _n(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Vo(u)) {
                Te = 0, Ct = null, Vv(t);
                break;
              }
              t = function() {
                Te !== 2 && Te !== 9 || we !== e || (Te = 7), da(e);
              }, u.then(t, t);
              break e;
            case 3:
              Te = 7;
              break e;
            case 4:
              Te = 5;
              break e;
            case 7:
              Vo(u) ? (Te = 0, Ct = null, Vv(t)) : (Te = 0, Ct = null, _n(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (re.tag) {
                case 26:
                  c = re.memoizedState;
                case 5:
                case 27:
                  var f = re;
                  if (c ? Hm(c) : f.stateNode.complete) {
                    Te = 0, Ct = null;
                    var m = f.sibling;
                    if (m !== null) re = m;
                    else {
                      var S = f.return;
                      S !== null ? (re = S, ic(S)) : re = null;
                    }
                    break t;
                  }
              }
              Te = 0, Ct = null, _n(e, t, u, 5);
              break;
            case 6:
              Te = 0, Ct = null, _n(e, t, u, 6);
              break;
            case 8:
              Ar(), He = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        my();
        break;
      } catch (N) {
        Yv(e, N);
      }
    while (!0);
    return ja = pl = null, K.H = l, K.A = n, be = a, re !== null ? 0 : (we = null, oe = 0, di(), He);
  }
  function my() {
    for (; re !== null && !Dh(); )
      Zv(re);
  }
  function Zv(e) {
    var t = iv(e.alternate, e, za);
    e.memoizedProps = e.pendingProps, t === null ? ic(e) : re = t;
  }
  function Vv(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Pd(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          oe
        );
        break;
      case 11:
        t = Pd(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          oe
        );
        break;
      case 5:
        Us(t);
        var l = t;
        l === ke && (se ? (_i(l), l.tag === 5 && l.stateNode != null && (De = l.stateNode)) : (_i(l), se = !0));
      default:
        sv(a, t), t = re = Ro(t, za), t = iv(a, t, za);
    }
    e.memoizedProps = e.pendingProps, t === null ? ic(e) : re = t;
  }
  function _n(e, t, a, l) {
    ja = pl = null, Us(t), an = null, nu = 0;
    var n = t.return;
    try {
      if (ty(
        e,
        n,
        t,
        a,
        oe
      )) {
        He = 1, Li(
          e,
          Ht(a, e.current)
        ), re = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw re = n, u;
      He = 1, Li(
        e,
        Ht(a, e.current)
      ), re = null;
      return;
    }
    t.flags & 32768 ? (se || l === 1 ? e = !0 : on || (oe & 536870912) !== 0 ? e = !1 : (Ia = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = lt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Kv(t, e)) : ic(t);
  }
  function ic(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Kv(
          t,
          Ia
        );
        return;
      }
      e = t.return;
      var a = uy(
        t.alternate,
        t,
        za
      );
      if (a !== null) {
        re = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        re = t;
        return;
      }
      re = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function Kv(e, t) {
    do {
      var a = iy(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, re = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        re = e;
        return;
      }
      re = e = a;
    } while (e !== null);
    He = 6, re = null;
  }
  function Jv(e, t, a, l, n, u, c, f, m, S, N, M) {
    e.cancelPendingCommit = null;
    do
      cc();
    while (Re !== 0);
    if ((be & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === we && (re = we = null, oe = 0), Ol = t, Ft = e, oa = a, Er = n, Hv = l, hy(
        e,
        t,
        a,
        c,
        f,
        m,
        M
      );
    }
  }
  function hy(e, t, a, l, n, u, c) {
    var f = t.lanes | t.childLanes;
    if (Nr = f, f |= rs, Gh(
      e,
      a,
      f,
      l,
      n,
      u
    ), mn = null, (a & 335544064) === a ? (hn = Qg(e), l = 10262) : (hn = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, by(ku, function() {
      return Or(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Ki = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = K.T, K.T = null, n = te.p, te.p = 2, u = be, be |= 4;
      try {
        cy(e, t, a);
      } finally {
        be = u, te.p = n, K.T = l;
      }
    }
    Re = 1, Ki ? vn = Gy(
      c,
      e.containerInfo,
      hn,
      zr,
      Cr,
      yy,
      Dr,
      Or,
      gy
    ) : (zr(), Cr(), Dr());
  }
  function gy(e) {
    if (Re !== 0) {
      var t = Ft.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function yy() {
    Re === 3 && (Re = 0, zv(Ol, Ft), Re = 4);
  }
  function zr() {
    if (Re === 1) {
      Re = 0;
      var e = Ft, t = Ol, a = oa, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = K.T, K.T = null;
        var n = te.p;
        te.p = 2;
        var u = be;
        be |= 4;
        try {
          gu = ki = !1, Av(t, e, a), a = Zr;
          var c = To(e.containerInfo), f = a.focusedElem, m = a.selectionRange;
          if (c !== f && f && f.ownerDocument && jo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (m !== null && ns(f)) {
              var S = m.start, N = m.end;
              if (N === void 0 && (N = S), "selectionStart" in f)
                f.selectionStart = S, f.selectionEnd = Math.min(
                  N,
                  f.value.length
                );
              else {
                var M = f.ownerDocument || document, _ = M && M.defaultView || window;
                if (_.getSelection) {
                  var j = _.getSelection(), q = f.textContent.length, Q = Math.min(m.start, q), ue = m.end === void 0 ? Q : Math.min(m.end, q);
                  !j.extend && Q > ue && (c = ue, ue = Q, Q = c);
                  var p = xo(
                    f,
                    Q
                  ), g = xo(
                    f,
                    ue
                  );
                  if (p && g && (j.rangeCount !== 1 || j.anchorNode !== p.node || j.anchorOffset !== p.offset || j.focusNode !== g.node || j.focusOffset !== g.offset)) {
                    var x = M.createRange();
                    x.setStart(p.node, p.offset), j.removeAllRanges(), Q > ue ? (j.addRange(x), j.extend(g.node, g.offset)) : (x.setEnd(g.node, g.offset), j.addRange(x));
                  }
                }
              }
            }
            for (M = [], j = f; j = j.parentNode; )
              j.nodeType === 1 && M.push({
                element: j,
                left: j.scrollLeft,
                top: j.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < M.length; f++) {
              var O = M[f];
              O.element.scrollLeft = O.left, O.element.scrollTop = O.top;
            }
          }
          En = !!Qr, Zr = Qr = null;
        } finally {
          be = u, te.p = n, K.T = l;
        }
      }
      e.current = t, Re = 2;
    }
  }
  function Cr() {
    if (Re === 2) {
      Re = 0;
      var e = Ft, t = Ol, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = K.T, K.T = null;
        var l = te.p;
        te.p = 2;
        var n = be;
        be |= 4;
        try {
          bv(e, t.alternate, t);
        } finally {
          be = n, te.p = l, K.T = a;
        }
      }
      Re = 3;
    }
  }
  function Dr() {
    if (Re === 4 || Re === 3) {
      Re = 0;
      var e = vn;
      vn = null, Oh();
      var t = Ft, a = Ol, l = oa, n = Hv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? Re = 5 : (Re = 0, Ol = Ft = null, $v(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (el = null), Yc(l), a = a.stateNode, Tt && typeof Tt.onCommitFiberRoot == "function")
        try {
          Tt.onCommitFiberRoot(
            Bn,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        a = K.T, u = te.p, te.p = 2, K.T = null;
        try {
          for (var c = t.onRecoverableError, f = 0; f < n.length; f++) {
            var m = n[f];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          K.T = a, te.p = u;
        }
      }
      if (n = mn, c = hn, hn = null, n !== null && (mn = null, c === null && (c = []), e !== null))
        for (m = 0; m < n.length; m++)
          a = (0, n[m])(
            c
          ), a !== void 0 && e.finished.finally(a);
      (oa & 3) !== 0 && cc(), da(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === lc ? Su++ : (Su = 0, lc = t) : (Su = 0, lc = null), bu(0);
    }
  }
  function $v(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, tu(t)));
  }
  function cc() {
    return vn !== null && (vn.skipTransition(), vn = null), zr(), Cr(), Dr(), Or();
  }
  function Or() {
    if (Re !== 5) return !1;
    var e = Ft, t = Nr;
    Nr = 0;
    var a = Yc(oa), l = K.T, n = te.p;
    try {
      te.p = 32 > a ? 32 : a, K.T = null, a = Er, Er = null;
      var u = Ft, c = oa;
      if (Re = 0, Ol = Ft = null, oa = 0, (be & 6) !== 0) throw Error(o(331));
      var f = be;
      if (be |= 4, Mv(u.current), Cv(
        u,
        u.current,
        c,
        a
      ), be = f, bu(0, !1), Tt && typeof Tt.onPostCommitFiberRoot == "function")
        try {
          Tt.onPostCommitFiberRoot(Bn, u);
        } catch {
        }
      return !0;
    } finally {
      te.p = n, K.T = l, $v(e, t);
    }
  }
  function kv(e, t, a) {
    t = Ht(a, t), t = ks(e.stateNode, t, 2), e = Ka(e, t, 2), e !== null && (Gn(e, 2), da(e));
  }
  function Ne(e, t, a) {
    if (e.tag === 3)
      kv(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          kv(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (el === null || !el.has(l))) {
            e = Ht(a, e), a = Vd(2), l = Ka(t, a, 2), l !== null && (Kd(
              a,
              l,
              t,
              e
            ), Gn(l, 2), da(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Mr(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new fy();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (jr = !0, n.add(a), e = _y.bind(null, e, t, a), t.then(e, e));
  }
  function _y(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, we === e && (oe & a) === a && ((He === 4 || He === 3 && (oe & 62914560) === oe && 300 > jt() - ec) && (be & 2) === 0 ? yn(e, 0) : Pi |= a, dn === oe && (dn = 0)), da(e);
  }
  function Fv(e, t) {
    t === 0 && (t = Rf()), e = gl(e, t), e !== null && (Gn(e, t), da(e));
  }
  function py(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Fv(e, a);
  }
  function Sy(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, n = e.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    l !== null && l.delete(t), Fv(e, a);
  }
  function by(e, t) {
    return Hc(e, t);
  }
  var pn = null, Sn = null, Rr = !1, sc = !1, Ur = !1, al = 0;
  function da(e) {
    e !== Sn && e.next === null && (Sn === null ? pn = Sn = e : Sn = Sn.next = e), sc = !0, Rr || (Rr = !0, jy());
  }
  function bu(e, t) {
    if (!Ur && sc) {
      Ur = !0;
      do
        for (var a = !1, l = pn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - Nt(42 | e) + 1) - 1, u &= n & ~(c & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, em(l, u));
          } else
            u = oe, u = Pu(
              l,
              l === we ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Yn(l, u) || (a = !0, em(l, u));
          l = l.next;
        }
      while (a);
      Ur = !1;
    }
  }
  function xy() {
    Wv();
  }
  function Wv() {
    sc = Rr = !1;
    var e = 0;
    al !== 0 && Ry() && (e = al);
    for (var t = jt(), a = null, l = pn; l !== null; ) {
      var n = l.next, u = Iv(l, t);
      u === 0 ? (l.next = null, a === null ? pn = n : a.next = n, n === null && (Sn = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (sc = !0)), l = n;
    }
    Re !== 0 && Re !== 5 || bu(e), al !== 0 && (al = 0);
  }
  function Iv(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - Nt(u), f = 1 << c, m = n[c];
      m === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[c] = Yh(f, t)) : m <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = we, a = oe, a = Pu(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && qc(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Yn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && qc(l), Yc(a)) {
        case 2:
        case 8:
          a = Df;
          break;
        case 32:
          a = ku;
          break;
        case 268435456:
          a = Of;
          break;
        default:
          a = ku;
      }
      return l = Pv.bind(null, e), a = Hc(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && qc(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Pv(e, t) {
    if (Re !== 0 && Re !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (cc() && e.callbackNode !== a)
      return null;
    var l = oe;
    return l = Pu(
      e,
      e === we ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Lv(e, l, t), Iv(e, jt()), e.callbackNode != null && e.callbackNode === a ? Pv.bind(null, e) : null);
  }
  function em(e, t) {
    if (cc()) return null;
    Lv(e, t, !0);
  }
  function jy() {
    Hy(function() {
      (be & 6) !== 0 ? Hc(
        Cf,
        xy
      ) : Wv();
    });
  }
  function Hr() {
    if (al === 0) {
      var e = xl;
      e === 0 && (e = Fu, Fu <<= 1, (Fu & 261888) === 0 && (Fu = 256)), al = e;
    }
    return al;
  }
  function tm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ni(e);
  }
  function Ty(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = tm(
        (n[gt] || null).action
      ), c = l.submitter;
      c && (t = (t = c[gt] || null) ? tm(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var f = new si(
        "action",
        "action",
        null,
        l,
        n
      );
      e.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (al !== 0) {
                  var m = new FormData(n, c);
                  Zs(
                    a,
                    {
                      pending: !0,
                      data: m,
                      method: n.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), m = new FormData(n, c), Zs(
                  a,
                  {
                    pending: !0,
                    data: m,
                    method: n.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var qr = 0; qr < ss.length; qr++) {
    var Lr = ss[qr], Ny = Lr.toLowerCase(), Ey = Lr[0].toUpperCase() + Lr.slice(1);
    Kt(
      Ny,
      "on" + Ey
    );
  }
  Kt(Ao, "onAnimationEnd"), Kt(wo, "onAnimationIteration"), Kt(zo, "onAnimationStart"), Kt("dblclick", "onDoubleClick"), Kt("focusin", "onFocus"), Kt("focusout", "onBlur"), Kt(Ug, "onTransitionRun"), Kt(Hg, "onTransitionStart"), Kt(qg, "onTransitionCancel"), Kt(Co, "onTransitionEnd"), Gl("onMouseEnter", ["mouseout", "mouseover"]), Gl("onMouseLeave", ["mouseout", "mouseover"]), Gl("onPointerEnter", ["pointerout", "pointerover"]), Gl("onPointerLeave", ["pointerout", "pointerover"]), vl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), vl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), vl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), vl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), vl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), vl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var xu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ay = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xu)
  );
  function am(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], n = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = l.length - 1; 0 <= c; c--) {
            var f = l[c], m = f.instance, S = f.currentTarget;
            if (f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (N) {
              oi(N);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (c = 0; c < l.length; c++) {
            if (f = l[c], m = f.instance, S = f.currentTarget, f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = S;
            try {
              u(n);
            } catch (N) {
              oi(N);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function fe(e, t) {
    var a = t[Yf];
    a === void 0 && (a = t[Yf] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (lm(t, e, 2, !1), a.add(l));
  }
  function Br(e, t, a) {
    var l = 0;
    t && (l |= 4), lm(
      a,
      e,
      l,
      t
    );
  }
  var rc = "_reactListening" + Math.random().toString(36).slice(2);
  function Yr(e) {
    if (!e[rc]) {
      e[rc] = !0, Qf.forEach(function(a) {
        a !== "selectionchange" && (Ay.has(a) || Br(a, !1, e), Br(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[rc] || (t[rc] = !0, Br("selectionchange", !1, t));
    }
  }
  function lm(e, t, a, l) {
    switch (Km(t)) {
      case 2:
        var n = p0;
        break;
      case 8:
        n = S0;
        break;
      default:
        n = cf;
    }
    a = n.bind(
      null,
      t,
      a,
      e
    ), n = void 0, !$c || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function Gr(e, t, a, l, n) {
    var u = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var c = l.tag;
        if (c === 3 || c === 4) {
          var f = l.stateNode.containerInfo;
          if (f === n) break;
          if (c === 4)
            for (c = l.return; c !== null; ) {
              var m = c.tag;
              if ((m === 3 || m === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; f !== null; ) {
            if (c = dl(f), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              l = u = c;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l.return;
      }
    ao(function() {
      var S = u, N = Kc(a), M = [];
      e: {
        var _ = Do.get(e);
        if (_ !== void 0) {
          var j = si, q = e;
          switch (e) {
            case "keypress":
              if (ii(a) === 0) break e;
            case "keydown":
            case "keyup":
              j = og;
              break;
            case "focusin":
              q = "focus", j = Ic;
              break;
            case "focusout":
              q = "blur", j = Ic;
              break;
            case "beforeblur":
            case "afterblur":
              j = Ic;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = uo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = Ph;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = gg;
              break;
            case Ao:
            case wo:
            case zo:
              j = ag;
              break;
            case Co:
              j = _g;
              break;
            case "scroll":
            case "scrollend":
              j = Wh;
              break;
            case "wheel":
              j = Sg;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = ng;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = co;
              break;
            case "submit":
              j = mg;
              break;
            case "toggle":
            case "beforetoggle":
              j = xg;
          }
          var Q = (t & 4) !== 0, ue = !Q && (e === "scroll" || e === "scrollend"), p = Q ? _ !== null ? _ + "Capture" : null : _;
          Q = [];
          for (var g = S, x; g !== null; ) {
            var O = g;
            if (x = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || x === null || p === null || (O = Zn(g, p), O != null && Q.push(
              ju(g, O, x)
            )), ue) break;
            g = g.return;
          }
          0 < Q.length && (_ = new j(
            _,
            q,
            null,
            a,
            N
          ), M.push({ event: _, listeners: Q }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (j = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", j && a !== Vc && (q = a.relatedTarget || a.fromElement) && (dl(q) || q[Ll]))
            break e;
          (_ || j) && (q = N.window === N ? N : (j = N.ownerDocument) ? j.defaultView || j.parentWindow : window, _ ? (j = a.relatedTarget || a.toElement, _ = S, j = j ? dl(j) : null, j !== null && (ue = h(j), Q = j.tag, j !== ue || Q !== 5 && Q !== 27 && Q !== 6) && (j = null)) : (_ = null, j = S), _ !== j && (Q = uo, O = "onMouseLeave", p = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (Q = co, O = "onPointerLeave", p = "onPointerEnter", g = "pointer"), ue = _ == null ? q : Qn(_), x = j == null ? q : Qn(j), q = new Q(
            O,
            g + "leave",
            _,
            a,
            N
          ), q.target = ue, q.relatedTarget = x, O = null, dl(N) === S && (Q = new Q(
            p,
            g + "enter",
            j,
            a,
            N
          ), Q.target = x, Q.relatedTarget = ue, O = Q), ue = O, Q = _ && j ? Le(
            _,
            j,
            wy
          ) : null, _ !== null && nm(
            M,
            q,
            _,
            Q,
            !1
          ), j !== null && ue !== null && nm(
            M,
            ue,
            j,
            Q,
            !0
          )));
        }
        e: {
          if (_ = S ? Qn(S) : window, j = _.nodeName && _.nodeName.toLowerCase(), j === "select" || j === "input" && _.type === "file")
            var X = go;
          else if (mo(_))
            if (yo)
              X = Og;
            else {
              X = Cg;
              var de = zg;
            }
          else
            j = _.nodeName, !j || j.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? S && Zc(S.elementType) && (X = go) : X = Dg;
          if (X && (X = X(e, S))) {
            ho(
              M,
              X,
              a,
              N
            );
            break e;
          }
          de && de(e, _, S);
        }
        switch (de = S ? Qn(S) : window, e) {
          case "focusin":
            (mo(de) || de.contentEditable === "true") && (Jl = de, us = S, In = null);
            break;
          case "focusout":
            In = us = Jl = null;
            break;
          case "mousedown":
            is = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            is = !1, No(M, a, N);
            break;
          case "selectionchange":
            if (Rg) break;
          case "keydown":
          case "keyup":
            No(M, a, N);
        }
        var J;
        if (es)
          e: {
            switch (e) {
              case "compositionstart":
                var P = "onCompositionStart";
                break e;
              case "compositionend":
                P = "onCompositionEnd";
                break e;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break e;
            }
            P = void 0;
          }
        else
          Kl ? oo(e, a) && (P = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (P = "onCompositionStart");
        P && (so && a.locale !== "ko" && (Kl || P !== "onCompositionStart" ? P === "onCompositionEnd" && Kl && (J = lo()) : (qa = N, kc = "value" in qa ? qa.value : qa.textContent, Kl = !0)), de = fc(S, P), 0 < de.length && (P = new io(
          P,
          e,
          null,
          a,
          N
        ), M.push({ event: P, listeners: de }), J ? P.data = J : (J = vo(a), J !== null && (P.data = J)))), (J = Tg ? Ng(e, a) : Eg(e, a)) && (P = fc(S, "onBeforeInput"), 0 < P.length && (de = new io(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          N
        ), M.push({
          event: de,
          listeners: P
        }), de.data = J)), Ty(
          M,
          e,
          S,
          a,
          N
        );
      }
      am(M, t);
    });
  }
  function ju(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function fc(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Zn(e, a), n != null && l.unshift(
        ju(e, n, u)
      ), n = Zn(e, t), n != null && l.push(
        ju(e, n, u)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function wy(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function nm(e, t, a, l, n) {
    for (var u = t._reactName, c = []; a !== null && a !== l; ) {
      var f = a, m = f.alternate, S = f.stateNode;
      if (f = f.tag, m !== null && m === l) break;
      f !== 5 && f !== 26 && f !== 27 || S === null || (m = S, n ? (S = Zn(a, u), S != null && c.unshift(
        ju(a, S, m)
      )) : n || (S = Zn(a, u), S != null && c.push(
        ju(a, S, m)
      ))), a = a.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var zy = /\r\n?/g, Cy = /\u0000|\uFFFD/g;
  function um(e) {
    return (typeof e == "string" ? e : "" + e).replace(zy, `
`).replace(Cy, "");
  }
  function im(e, t) {
    return t = um(t), um(e) === t;
  }
  function Ee(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || Ql(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && Ql(e, "" + l);
        else return;
        break;
      case "className":
        li(e, "class", l);
        break;
      case "tabIndex":
        li(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        li(e, a, l);
        break;
      case "style":
        eo(e, l, u);
        return;
      case "data":
        if (t !== "object") {
          li(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ni(l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (a === "formAction" ? (t !== "input" && Ee(e, t, "name", n.name, n, null), Ee(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ee(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ee(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ee(e, t, "encType", n.encType, n, null), Ee(e, t, "method", n.method, n, null), Ee(e, t, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ni(l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = aa);
        return;
      case "onScroll":
        l != null && fe("scroll", e);
        return;
      case "onScrollEnd":
        l != null && fe("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(o(60));
            (u != null ? u.__html : void 0) !== a && (e.innerHTML = a);
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        a = ni(l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        fe("beforetoggle", e), fe("toggle", e), ai(e, "popover", l);
        break;
      case "xlinkActuate":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        ya(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        ya(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        ya(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        ya(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ai(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = kh.get(a) || a, ai(e, a, l);
        else return;
    }
    _e = !0;
  }
  function Xr(e, t, a, l, n, u) {
    switch (a) {
      case "style":
        eo(e, l, u);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(o(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(o(60));
            (u != null ? u.__html : void 0) !== a && (e.innerHTML = a);
          }
        }
        break;
      case "children":
        if (typeof l == "string") Ql(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          Ql(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && fe("scroll", e);
        return;
      case "onScrollEnd":
        l != null && fe("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = aa);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Zf.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), u = a.slice(2, n ? a.length - 7 : void 0), t = e[gt] || null, t = t != null ? t[a] : null, typeof t == "function" && e.removeEventListener(u, t, n), typeof l == "function")) {
              typeof t != "function" && t !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(u, l, n);
              break e;
            }
            _e = !0, a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ai(e, a, l);
          }
        return;
    }
    _e = !0;
  }
  function it(e, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        fe("error", e), fe("load", e);
        var l = !1, n = !1, u;
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var c = a[u];
            if (c != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Ee(e, t, u, c, a, null);
              }
          }
        n && Ee(e, t, "srcSet", a.srcSet, a, null), l && Ee(e, t, "src", a.src, a, null);
        return;
      case "input":
        fe("invalid", e);
        var f = u = c = n = null, m = null, S = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var N = a[l];
            if (N != null)
              switch (l) {
                case "name":
                  n = N;
                  break;
                case "type":
                  c = N;
                  break;
                case "checked":
                  m = N;
                  break;
                case "defaultChecked":
                  S = N;
                  break;
                case "value":
                  u = N;
                  break;
                case "defaultValue":
                  f = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ee(e, t, l, N, a, null);
              }
          }
        Ff(
          e,
          u,
          f,
          m,
          S,
          c,
          n,
          !1
        );
        return;
      case "select":
        fe("invalid", e), l = c = u = null;
        for (n in a)
          if (a.hasOwnProperty(n) && (f = a[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                c = f;
                break;
              case "multiple":
                l = f;
              default:
                Ee(e, t, n, f, a, null);
            }
        t = u, a = c, e.multiple = !!l, t != null ? Xl(e, !!l, t, !1) : a != null && Xl(e, !!l, a, !0);
        return;
      case "textarea":
        fe("invalid", e), u = n = l = null;
        for (c in a)
          if (a.hasOwnProperty(c) && (f = a[c], f != null))
            switch (c) {
              case "value":
                l = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(o(91));
                break;
              default:
                Ee(e, t, c, f, a, null);
            }
        If(e, l, n, u);
        return;
      case "option":
        for (m in a)
          if (a.hasOwnProperty(m) && (l = a[m], l != null))
            switch (m) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ee(e, t, m, l, a, null);
            }
        return;
      case "dialog":
        fe("beforetoggle", e), fe("toggle", e), fe("cancel", e), fe("close", e);
        break;
      case "iframe":
      case "object":
        fe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < xu.length; l++)
          fe(xu[l], e);
        break;
      case "image":
        fe("error", e), fe("load", e);
        break;
      case "details":
        fe("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        fe("error", e), fe("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (S in a)
          if (a.hasOwnProperty(S) && (l = a[S], l != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ee(e, t, S, l, a, null);
            }
        return;
      default:
        if (Zc(t)) {
          for (N in a)
            a.hasOwnProperty(N) && (l = a[N], l !== void 0 && Xr(
              e,
              t,
              N,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (f in a)
      a.hasOwnProperty(f) && (l = a[f], l != null && Ee(e, t, f, l, a, null));
  }
  var Dy = {};
  function Oy(e, t, a, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, c = null, f = null, m = null, S = null, N = null;
        for (j in a) {
          var M = a[j];
          if (a.hasOwnProperty(j) && M != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = M;
              default:
                l.hasOwnProperty(j) || Ee(e, t, j, null, l, M);
            }
        }
        for (var _ in l) {
          var j = l[_];
          if (M = a[_], l.hasOwnProperty(_) && (j != null || M != null))
            switch (_) {
              case "type":
                j !== M && (_e = !0), u = j;
                break;
              case "name":
                j !== M && (_e = !0), n = j;
                break;
              case "checked":
                j !== M && (_e = !0), S = j;
                break;
              case "defaultChecked":
                j !== M && (_e = !0), N = j;
                break;
              case "value":
                j !== M && (_e = !0), c = j;
                break;
              case "defaultValue":
                j !== M && (_e = !0), f = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null)
                  throw Error(o(137, t));
                break;
              default:
                j !== M && Ee(
                  e,
                  t,
                  _,
                  j,
                  l,
                  M
                );
            }
        }
        Xc(
          e,
          c,
          f,
          m,
          S,
          N,
          u,
          n
        );
        return;
      case "select":
        j = c = f = _ = null;
        for (u in a)
          if (m = a[u], a.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                j = m;
              default:
                l.hasOwnProperty(u) || Ee(
                  e,
                  t,
                  u,
                  null,
                  l,
                  m
                );
            }
        for (n in l)
          if (u = l[n], m = a[n], l.hasOwnProperty(n) && (u != null || m != null))
            switch (n) {
              case "value":
                u !== m && (_e = !0), _ = u;
                break;
              case "defaultValue":
                u !== m && (_e = !0), f = u;
                break;
              case "multiple":
                u !== m && (_e = !0), c = u;
              default:
                u !== m && Ee(
                  e,
                  t,
                  n,
                  u,
                  l,
                  m
                );
            }
        t = f, a = c, l = j, _ != null ? Xl(e, !!a, _, !1) : !!l != !!a && (t != null ? Xl(e, !!a, t, !0) : Xl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        j = _ = null;
        for (f in a)
          if (n = a[f], a.hasOwnProperty(f) && n != null && !l.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ee(e, t, f, null, l, n);
            }
        for (c in l)
          if (n = l[c], u = a[c], l.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                n !== u && (_e = !0), _ = n;
                break;
              case "defaultValue":
                n !== u && (_e = !0), j = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ee(e, t, c, n, l, u);
            }
        Wf(e, _, j);
        return;
      case "option":
        for (var q in a)
          if (_ = a[q], a.hasOwnProperty(q) && _ != null && !l.hasOwnProperty(q))
            switch (q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ee(
                  e,
                  t,
                  q,
                  null,
                  l,
                  _
                );
            }
        for (m in l)
          if (_ = l[m], j = a[m], l.hasOwnProperty(m) && _ !== j && (_ != null || j != null))
            switch (m) {
              case "selected":
                _ !== j && (_e = !0), e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                Ee(
                  e,
                  t,
                  m,
                  _,
                  l,
                  j
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Q in a)
          _ = a[Q], a.hasOwnProperty(Q) && _ != null && !l.hasOwnProperty(Q) && Ee(e, t, Q, null, l, _);
        for (S in l)
          if (_ = l[S], j = a[S], l.hasOwnProperty(S) && _ !== j && (_ != null || j != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, t));
                break;
              default:
                Ee(
                  e,
                  t,
                  S,
                  _,
                  l,
                  j
                );
            }
        return;
      default:
        if (Zc(t)) {
          for (var ue in a)
            _ = a[ue], a.hasOwnProperty(ue) && _ !== void 0 && !l.hasOwnProperty(ue) && Xr(
              e,
              t,
              ue,
              void 0,
              l,
              _
            );
          for (N in l)
            _ = l[N], j = a[N], !l.hasOwnProperty(N) || _ === j || _ === void 0 && j === void 0 || Xr(
              e,
              t,
              N,
              _,
              l,
              j
            );
          return;
        }
    }
    for (var p in a)
      _ = a[p], a.hasOwnProperty(p) && _ != null && !l.hasOwnProperty(p) && Ee(e, t, p, null, l, _);
    for (M in l)
      _ = l[M], j = a[M], !l.hasOwnProperty(M) || _ === j || _ == null && j == null || Ee(e, t, M, _, l, j);
  }
  function cm(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function My() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, c = n.initiatorType, f = n.duration;
        if (u && f && cm(c)) {
          for (c = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var m = a[l], S = m.startTime;
            if (S > f) break;
            var N = m.transferSize, M = m.initiatorType;
            N && cm(M) && (m = m.responseEnd, c += N * (m < f ? 1 : (f - S) / (m - S)));
          }
          if (--l, t += 8 * (u + c) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Qr = null, Zr = null;
  function Tu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function sm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function rm(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function fm(e, t, a, l) {
    return a = Tu(
      a
    ).createElement(e), a[tt] = l, a[gt] = t, it(a, e, t), $e(a), a;
  }
  function Vr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Kr = null;
  function Ry() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Kr ? !1 : (Kr = e, !0) : (Kr = null, !1);
  }
  var Jr = typeof setTimeout == "function" ? setTimeout : void 0, Uy = typeof clearTimeout == "function" ? clearTimeout : void 0, om = typeof Promise == "function" ? Promise : void 0, dm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Jr, Hy = typeof queueMicrotask == "function" ? queueMicrotask : typeof om < "u" ? function(e) {
    return om.resolve(null).then(e).catch(qy);
  } : Jr;
  function qy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ll(e) {
    return e === "head";
  }
  function vm(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), An(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          tf(
            e.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = e.ownerDocument.head, tf(a);
          for (var u = a.firstChild; u; ) {
            var c = u.nextSibling, f = u.nodeName;
            u[Xn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = c;
          }
        } else
          a === "body" && tf(e.ownerDocument.body);
      a = n;
    } while (a);
    An(t);
  }
  function mm(e, t) {
    var a = e;
    e = 0;
    do {
      var l = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), l && l.nodeType === 8)
        if (a = l.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = l;
    } while (a);
  }
  function hm(e, t, a) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, a != null && (e.style.viewTransitionClass = a), a = getComputedStyle(e), a.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var l = 1;
      else
        for (var n = l = 0; n < t.length; n++) {
          var u = t[n];
          0 < u.width && 0 < u.height && l++;
        }
      l === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + a.paddingTop, e.marginBottom = "-" + a.paddingBottom);
    }
  }
  function gm(e, t) {
    e = e.style, t = t.style;
    var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (a = t.display, e.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin, a != null ? e.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = a == null || typeof a == "boolean" ? "" : a, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Ly(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function $r(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Ly(t, a, e);
  }
  function By(e) {
    return e.documentElement.clientHeight;
  }
  function Yy(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Gy(e, t, a, l, n, u, c, f, m) {
    var S = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var N = S.startViewTransition({
        update: function() {
          var _ = S.defaultView, j = _.navigation && _.navigation.transition, q = S.fonts.status;
          l();
          var Q = [];
          if (q === "loaded" && (By(S), S.fonts.status === "loading" && Q.push(S.fonts.ready)), q = Q.length, e !== null)
            for (var ue = e.suspenseyImages, p = 0, g = 0; g < ue.length; g++) {
              var x = ue[g];
              if (!x.complete) {
                var O = x.getBoundingClientRect();
                if (0 < O.bottom && 0 < O.right && O.top < _.innerHeight && O.left < _.innerWidth) {
                  if (p += qm(x), p > vc) {
                    Q.length = q;
                    break;
                  }
                  x = new Promise(
                    Yy.bind(x)
                  ), Q.push(x);
                }
              }
            }
          if (0 < Q.length)
            return _ = Promise.race([
              Promise.all(Q),
              new Promise(function(X) {
                return setTimeout(X, 500);
              })
            ]).then(n, n), (j ? Promise.allSettled([j.finished, _]) : _).then(u, u);
          if (n(), j)
            return j.finished.then(
              u,
              u
            );
          u();
        },
        types: a
      });
      S.__reactViewTransition = N;
      var M = [];
      return N.ready.then(
        function() {
          for (var _ = S.documentElement.getAnimations({
            subtree: !0
          }), j = 0; j < _.length; j++) {
            var q = _[j], Q = q.effect, ue = Q.pseudoElement;
            if (ue != null && ue.startsWith("::view-transition")) {
              M.push(q), q = Q.getKeyframes();
              for (var p = ue = void 0, g = !0, x = 0; x < q.length; x++) {
                var O = q[x], X = O.width;
                if (ue === void 0) ue = X;
                else if (ue !== X) {
                  g = !1;
                  break;
                }
                if (X = O.height, p === void 0) p = X;
                else if (p !== X) {
                  g = !1;
                  break;
                }
                delete O.width, delete O.height, O.transform === "none" && delete O.transform;
              }
              g && ue !== void 0 && p !== void 0 && (Q.setKeyframes(q), g = getComputedStyle(
                Q.target,
                Q.pseudoElement
              ), g.width !== ue || g.height !== p) && (g = q[0], g.width = ue, g.height = p, g = q[q.length - 1], g.width = ue, g.height = p, Q.setKeyframes(q));
            }
          }
          c();
        },
        function(_) {
          S.__reactViewTransition === N && (S.__reactViewTransition = null);
          try {
            if (typeof _ == "object" && _ !== null)
              switch (_.name) {
                case "InvalidStateError":
                  (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null);
              }
            _ !== null && m(_);
          } finally {
            l(), n(), c();
          }
        }
      ), N.finished.finally(function() {
        for (var _ = 0; _ < M.length; _++)
          M[_].cancel();
        S.__reactViewTransition === N && (S.__reactViewTransition = null), f();
      }), N;
    } catch {
      return l(), n(), c(), null;
    }
  }
  function Ml(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Ml.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : le({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Ml.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, Ml.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function ym(e) {
    return {
      name: e,
      group: new Ml("group", e),
      imagePair: new Ml("image-pair", e),
      old: new Ml("old", e),
      new: new Ml("new", e)
    };
  }
  function Mt(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Mt.prototype.addEventListener = function(e, t, a) {
    var l = null, n = null;
    if (!(a != null && typeof a != "boolean" && (l = a.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (pm(u, e, t, a) === -1) {
        var c = this, f = t;
        a != null && typeof a != "boolean" && a.once === !0 && (f = function(m) {
          c.removeEventListener(
            e,
            t,
            a
          ), typeof t == "function" ? t.call(this, m) : t.handleEvent(m);
        }), l !== null && (n = c.removeEventListener.bind(
          c,
          e,
          t,
          a
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = bn(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), b(
          this._fragmentFiber.child,
          !1,
          Xy,
          e,
          f,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function Xy(e, t, a, l) {
    return V(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Mt.prototype.removeEventListener = function(e, t, a) {
    var l = this._eventListeners;
    if (l !== null && (t = pm(
      l,
      e,
      t,
      a
    ), t !== -1)) {
      var n = l[t];
      a = n.attachedListener;
      var u = n.cleanup;
      n = bn(n.optionsOrUseCapture), b(
        this._fragmentFiber.child,
        !1,
        Qy,
        e,
        a,
        n
      ), l.splice(t, 1), u !== null && u();
    }
  };
  function Qy(e, t, a, l) {
    return V(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function bn(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function _m(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function pm(e, t, a, l) {
    if (e.length === 0) return -1;
    l = _m(l);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === a && _m(u.optionsOrUseCapture) === l)
        return n;
    }
    return -1;
  }
  Mt.prototype.dispatchEvent = function(e) {
    var t = T(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = V(t);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (a)
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.addEventListener(
            u.type,
            u.attachedListener,
            bn(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            bn(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Mt.prototype.focus = function(e) {
    b(
      this._fragmentFiber.child,
      !0,
      Sm,
      e,
      void 0,
      void 0
    );
  };
  function Sm(e, t) {
    return e.tag === 6 ? !1 : (e = V(e), t0(e, t));
  }
  Mt.prototype.focusLast = function(e) {
    var t = [];
    b(
      this._fragmentFiber.child,
      !0,
      kr,
      t,
      void 0,
      void 0
    );
    for (var a = t.length - 1; 0 <= a && !Sm(t[a], e); a--) ;
  };
  function kr(e, t) {
    return t.push(e), !1;
  }
  Mt.prototype.blur = function() {
    var e = T(
      this._fragmentFiber
    );
    e !== null && (e = V(e), e = Tu(e).activeElement, e !== null && b(
      this._fragmentFiber.child,
      !1,
      Zy,
      e,
      void 0,
      void 0
    ));
  };
  function Zy(e, t) {
    return e.tag === 6 ? !1 : (e = V(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Mt.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), b(
      this._fragmentFiber.child,
      !1,
      Vy,
      e,
      void 0,
      void 0
    );
  };
  function Vy(e, t) {
    return e.tag === 6 || (e = V(e), t.observe(e)), !1;
  }
  Mt.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), b(
        this._fragmentFiber.child,
        !1,
        Ky,
        e,
        void 0,
        void 0
      );
      for (var a = t = 0; a < Wt.length; a++) {
        var l = Wt[a];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : Wt[t++] = l;
      }
      Wt.length = t;
    }
  };
  function Ky(e, t) {
    return e.tag === 6 || (e = V(e), t.unobserve(e)), !1;
  }
  var Wt = [], Fr = !1;
  function Jy(e, t, a) {
    Wt.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), Fr || (Fr = !0, a0(function() {
      Fr = !1;
      var l = Wt;
      Wt = [];
      for (var n = 0; n < l.length; n++) {
        var u = l[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Mt.prototype.getClientRects = function() {
    var e = [];
    return b(
      this._fragmentFiber.child,
      !1,
      $y,
      e,
      void 0,
      void 0
    ), e;
  };
  function $y(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var a = e.ownerDocument.createRange();
      a.selectNodeContents(e), t.push.apply(t, a.getClientRects());
    } else
      e = V(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Mt.prototype.getRootNode = function(e) {
    var t = T(
      this._fragmentFiber
    );
    return t === null ? this : V(t).getRootNode(e);
  }, Mt.prototype.compareDocumentPosition = function(e) {
    var t = T(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    b(
      this._fragmentFiber.child,
      !1,
      kr,
      a,
      void 0,
      void 0
    );
    var l = V(t);
    if (a.length === 0) {
      if (a = l, R(this._fragmentFiber)) {
        e: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break e;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (a = t);
      }
      t = this._fragmentFiber;
      var n = l = a.compareDocumentPosition(e);
      return a === e ? n = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = Y(t)[1], a === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = V(a).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = V(a[0]), n = V(a[a.length - 1]);
    var u = R(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), m = c & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && c & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || m || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || ky(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function ky(e, t, a, l, n) {
    var u = dl(n);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (a = !!u)
        e: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === t || u.alternate === t)) {
              a = !0;
              break e;
            }
            u = u.return;
          }
          a = !1;
        }
      return a;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = n.ownerDocument, n === u || n === u.documentElement || n === u.body;
      e: {
        for (u = t, t = T(t); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== t && u.alternate !== t)) {
            u = !0;
            break e;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === a) && (t = Le(
      a,
      u,
      Ie
    ), t === null ? t = !1 : (b(
      t,
      !0,
      ee,
      u,
      a
    ), u = k, k = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === l) && (t = Le(
      l,
      u,
      Ie
    ), t === null ? t = !1 : (b(
      t,
      !0,
      ge,
      u,
      l
    ), u = k, I = k = null, t = u !== null)), t) : !1;
  }
  function bm(e, t) {
    var a = e.ownerDocument.createRange();
    a.selectNodeContents(e), e = a.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Mt.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    b(
      this._fragmentFiber.child,
      !1,
      kr,
      t,
      void 0,
      void 0
    );
    var a = e !== !1;
    if (t.length === 0) {
      var l = Y(
        this._fragmentFiber
      );
      if (l = a ? l[1] || l[0] || T(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = V(l), bm(e, a);
        return;
      }
      if (l = V(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          a = "host" in l ? l.host : null, a !== null && a.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = a ? t.length - 1 : 0; l !== (a ? -1 : t.length); ) {
      var n = t[l];
      n.tag === 6 ? (n = V(n), bm(n, a)) : V(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function Fy(e, t) {
    return e = V(e), xm(e, t), !1;
  }
  function xm(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function jm(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          bn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var c = 0, f = 0; f < Wt.length; f++) {
        var m = Wt[f];
        (m.fragmentInstance !== t || m.observer !== u || m.instance !== e) && (Wt[c++] = m);
      }
      Wt.length = c, u.observe(e);
    }), xm(e, t));
  }
  function Wy(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          bn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      typeof u.rootMargin == "string" ? Jy(
        t,
        u,
        e
      ) : u.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function Wr(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wr(a), ti(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Iy(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Xn])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Gt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Py(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Gt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Tm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Gt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ir(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Pr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function e0(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Gt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var ef = null;
  function Nm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Gt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Em(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function t0(e, t) {
    function a() {
      l = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var l = !1;
    try {
      e.ownerDocument.addEventListener("focus", a, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.ownerDocument.removeEventListener("focus", a, !0);
    }
    return l;
  }
  function a0(e) {
    dm(function() {
      dm(function(t) {
        return e(t);
      });
    });
  }
  function Am(e, t, a) {
    switch (t = Tu(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function wm(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ee(e, t, l, null, Dy, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === aa && (e.onclick = null), ti(e);
  }
  function tf(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ti(e);
  }
  var Xt = /* @__PURE__ */ new Map(), zm = /* @__PURE__ */ new Set();
  function Nu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ca = te.d;
  te.d = {
    f: l0,
    r: n0,
    D: u0,
    C: i0,
    L: c0,
    m: s0,
    X: f0,
    S: r0,
    M: o0
  };
  function l0() {
    var e = Ca.f(), t = nc();
    return e || t;
  }
  function n0(e) {
    var t = Bl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Dd(t) : Ca.r(e);
  }
  var xn = typeof document > "u" ? null : document;
  function Cm(e, t, a) {
    var l = xn;
    if (l && typeof t == "string" && t) {
      var n = Rt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), zm.has(n) || (zm.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), it(t, "link", e), $e(t), l.head.appendChild(t)));
    }
  }
  function u0(e) {
    Ca.D(e), Cm("dns-prefetch", e, null);
  }
  function i0(e, t) {
    Ca.C(e, t), Cm("preconnect", e, t);
  }
  function c0(e, t, a) {
    Ca.L(e, t, a);
    var l = xn;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + Rt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + Rt(
        a.imageSizes
      ) + '"]')) : n += '[href="' + Rt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = jn(e);
          break;
        case "script":
          u = Tn(e);
      }
      if (!(Xt.has(u) || (e = le(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Xt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(Eu(u)) || t === "script" && l.querySelector(Au(u))))) {
        var c = l.createElement("link");
        it(c, "link", e), t === "style" && (c[ei] = !0, c.onload = c.onerror = function() {
          Xf(c);
        }), $e(c), l.head.appendChild(c);
      }
    }
  }
  function s0(e, t) {
    Ca.m(e, t);
    var a = xn;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Rt(l) + '"][href="' + Rt(e) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Tn(e);
      }
      if (!Xt.has(u) && (e = le({ rel: "modulepreload", href: e }, t), Xt.set(u, e), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Au(u)))
              return;
        }
        l = a.createElement("link"), it(l, "link", e), $e(l), a.head.appendChild(l);
      }
    }
  }
  function r0(e, t, a) {
    Ca.S(e, t, a);
    var l = xn;
    if (l && e) {
      var n = Yl(l).hoistableStyles, u = jn(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = l.querySelector(
          Eu(u)
        ))
          f.loading = 5;
        else {
          e = le(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Xt.get(u)) && af(e, a);
          var m = c = l.createElement("link");
          $e(m), it(m, "link", e), m._p = new Promise(function(S, N) {
            m.onload = S, m.onerror = N;
          }), m.addEventListener("load", function() {
            f.loading |= 1;
          }), m.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, oc(c, t, l);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: f
        }, n.set(u, c);
      }
    }
  }
  function f0(e, t) {
    Ca.X(e, t);
    var a = xn;
    if (a && e) {
      var l = Yl(a).hoistableScripts, n = Tn(e), u = l.get(n);
      u || (u = a.querySelector(Au(n)), u || (e = le({ src: e, async: !0 }, t), (t = Xt.get(n)) && lf(e, t), u = a.createElement("script"), $e(u), it(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function o0(e, t) {
    Ca.M(e, t);
    var a = xn;
    if (a && e) {
      var l = Yl(a).hoistableScripts, n = Tn(e), u = l.get(n);
      u || (u = a.querySelector(Au(n)), u || (e = le({ src: e, async: !0, type: "module" }, t), (t = Xt.get(n)) && lf(e, t), u = a.createElement("script"), $e(u), it(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Dm(e, t, a, l) {
    var n = (n = Ra.current) ? Nu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = jn(a.href), t = Yl(
          n
        ).hoistableStyles, l = t.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = jn(a.href);
          var u = Yl(
            n
          ).hoistableStyles, c = u.get(e);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = n.querySelector(
            Eu(e)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = Xt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Xt.set(e, u)), d0(
            n,
            e,
            u,
            c.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return c;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = Tn(a), t = Yl(
          n
        ).hoistableScripts, l = t.get(a), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function jn(e) {
    return 'href="' + Rt(e) + '"';
  }
  function Eu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Om(e) {
    return le({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function d0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[ei] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[ei] = !0, t.onload = t.onerror = Xf.bind(null, t), it(t, "link", a), $e(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Tn(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function Au(e) {
    return "script[async]" + e;
  }
  function Mm(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Rt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, $e(l), l;
          var n = le({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), $e(l), it(l, "style", n), oc(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = jn(a.href);
          var u = e.querySelector(
            Eu(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, $e(u), u;
          l = Om(a), (n = Xt.get(n)) && af(l, n), u = (e.ownerDocument || e).createElement("link"), $e(u);
          var c = u;
          return c._p = new Promise(function(f, m) {
            c.onload = f, c.onerror = m;
          }), it(u, "link", l), t.state.loading |= 4, oc(u, a.precedence, e), t.instance = u;
        case "script":
          return u = Tn(a.src), (n = e.querySelector(
            Au(u)
          )) ? (t.instance = n, $e(n), n) : (l = a, (n = Xt.get(u)) && (l = le({}, a), lf(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), $e(n), it(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, oc(l, a.precedence, e));
    return t.instance;
  }
  function oc(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, c = 0; c < l.length; c++) {
      var f = l[c];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function af(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function lf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var dc = null;
  function Rm(e, t, a) {
    if (dc === null) {
      var l = /* @__PURE__ */ new Map(), n = dc = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = dc, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[Xn] || u[tt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var f = l.get(c);
        f ? f.push(u) : l.set(c, [u]);
      }
    }
    return l;
  }
  function nf(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function v0(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Um(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Hm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Lm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += qm(t), e.suspenseyImages.push(t)), e = g0.bind(e), t.decode().then(e, e));
  }
  function m0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = jn(l.href), u = t.querySelector(
          Eu(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = wu.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, $e(u);
          return;
        }
        u = t.ownerDocument || t, l = Om(l), (n = Xt.get(n)) && af(l, n), u = u.createElement("link"), $e(u);
        var c = u;
        c._p = new Promise(function(f, m) {
          c.onload = f, c.onerror = m;
        }), it(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = wu.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var vc = 0;
  function h0(e, t) {
    return e.stylesheets && e.count === 0 && hc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && hc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && vc === 0 && (vc = 62500 * My());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && hc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > vc ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Bm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) hc(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function wu() {
    this.count--, Bm(this);
  }
  function g0() {
    this.imgCount--, Bm(this);
  }
  var mc = null;
  function hc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, mc = /* @__PURE__ */ new Map(), t.forEach(y0, e), mc = null, wu.call(e));
  }
  function y0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = mc.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), mc.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), l = c);
        }
        l && a.set(null, l);
      }
      n = t.instance, c = n.getAttribute("data-precedence"), u = a.get(c) || l, u === l && a.set(null, n), a.set(c, n), this.count++, l = wu.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Nn = {
    $$typeof: Be,
    Provider: null,
    Consumer: null,
    _currentValue: ha,
    _currentValue2: ha,
    _threadCount: 0
  };
  function _0(e, t, a, l, n, u, c, f, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Lc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Lc(0), this.hiddenUpdates = Lc(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ym(e, t, a, l, n, u, c, f, m, S, N, M) {
    return e = new _0(
      e,
      t,
      a,
      c,
      m,
      S,
      N,
      M,
      f
    ), t = 1, u === !0 && (t |= 24), u = yt(3, null, null, t), e.current = u, u.stateNode = e, t = ps(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, js(u), e;
  }
  function Gm(e) {
    return e ? (e = Fl, e) : Fl;
  }
  function Xm(e, t, a, l, n, u) {
    n = Gm(n), l.context === null ? l.context = n : l.pendingContext = n, l = Va(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Ka(e, l, t), a !== null && (bt(a, e, t), uu(a, e, t));
  }
  function Qm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function uf(e, t) {
    Qm(e, t), (e = e.alternate) && Qm(e, t);
  }
  function Zm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = gl(e, 67108864);
      t !== null && bt(t, e, 67108864), uf(e, 67108864);
    }
  }
  function Vm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = Bc(t);
      var a = gl(e, t);
      a !== null && bt(a, e, t), uf(e, t);
    }
  }
  var En = !0;
  function p0(e, t, a, l) {
    var n = K.T;
    K.T = null;
    var u = te.p;
    try {
      te.p = 2, cf(e, t, a, l);
    } finally {
      te.p = u, K.T = n;
    }
  }
  function S0(e, t, a, l) {
    var n = K.T;
    K.T = null;
    var u = te.p;
    try {
      te.p = 8, cf(e, t, a, l);
    } finally {
      te.p = u, K.T = n;
    }
  }
  function cf(e, t, a, l) {
    if (En) {
      var n = sf(l);
      if (n === null)
        Gr(
          e,
          t,
          l,
          gc,
          a
        ), Jm(e, l);
      else if (x0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Jm(e, l), t & 4 && -1 < b0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Bl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = ol(u.pendingLanes);
                  if (c !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - Nt(c);
                      f.entanglements[1] |= m, c &= ~m;
                    }
                    da(u), (be & 6) === 0 && (tc = jt() + 500, bu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = gl(u, 2), f !== null && bt(f, u, 2), nc(), uf(u, 2);
            }
          if (u = sf(l), u === null && Gr(
            e,
            t,
            l,
            gc,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        Gr(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function sf(e) {
    return e = Kc(e), rf(e);
  }
  var gc = null;
  function rf(e) {
    if (gc = null, e = dl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = E(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = C(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return gc = e, null;
  }
  function Km(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Mh()) {
          case Cf:
            return 2;
          case Df:
            return 8;
          case ku:
          case Rh:
            return 32;
          case Of:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ff = !1, nl = null, ul = null, il = null, zu = /* @__PURE__ */ new Map(), Cu = /* @__PURE__ */ new Map(), cl = [], b0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Jm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        nl = null;
        break;
      case "dragenter":
      case "dragleave":
        ul = null;
        break;
      case "mouseover":
      case "mouseout":
        il = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cu.delete(t.pointerId);
    }
  }
  function Du(e, t, a, l, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Bl(t), t !== null && Zm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function x0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return nl = Du(
          nl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return ul = Du(
          ul,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return il = Du(
          il,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return zu.set(
          u,
          Du(
            zu.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Cu.set(
          u,
          Du(
            Cu.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
    }
    return !1;
  }
  function $m(e) {
    var t = dl(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = E(a), t !== null) {
            e.blockedOn = t, Bf(e.priority, function() {
              Vm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = C(a), t !== null) {
            e.blockedOn = t, Bf(e.priority, function() {
              Vm(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function yc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = sf(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Vc = l, a.target.dispatchEvent(l), Vc = null;
      } else
        return t = Bl(a), t !== null && Zm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function km(e, t, a) {
    yc(e) && a.delete(t);
  }
  function j0() {
    ff = !1, nl !== null && yc(nl) && (nl = null), ul !== null && yc(ul) && (ul = null), il !== null && yc(il) && (il = null), zu.forEach(km), Cu.forEach(km);
  }
  function _c(e, t) {
    e.blockedOn === t && (e.blockedOn = null, ff || (ff = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      j0
    )));
  }
  var pc = null;
  function Fm(e) {
    pc !== e && (pc = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        pc === e && (pc = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (rf(l || a) === null)
              continue;
            break;
          }
          var u = Bl(a);
          u !== null && (e.splice(t, 3), t -= 3, Zs(
            u,
            {
              pending: !0,
              data: n,
              method: a.method,
              action: l
            },
            l,
            n
          ));
        }
      }
    ));
  }
  function An(e) {
    function t(m) {
      return _c(m, e);
    }
    nl !== null && _c(nl, e), ul !== null && _c(ul, e), il !== null && _c(il, e), zu.forEach(t), Cu.forEach(t);
    for (var a = 0; a < cl.length; a++) {
      var l = cl[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < cl.length && (a = cl[0], a.blockedOn === null); )
      $m(a), a.blockedOn === null && cl.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], c = n[gt] || null;
        if (typeof u == "function")
          c || Fm(a);
        else if (c) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[gt] || null)
              f = c.formAction;
            else if (rf(n) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? a[l + 1] = f : (a.splice(l, 3), l -= 3), Fm(a);
        }
      }
  }
  function Wm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return n = c;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), l || setTimeout(a, 20);
    }
    function a() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, n = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function of(e) {
    this._internalRoot = e;
  }
  Sc.prototype.render = of.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Ot();
    Xm(a, l, e, t, null, null);
  }, Sc.prototype.unmount = of.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Xm(e.current, 2, null, e, null, null), nc(), t[Ll] = null;
    }
  };
  function Sc(e) {
    this._internalRoot = e;
  }
  Sc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Lf();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < cl.length && t !== 0 && t < cl[a].priority; a++) ;
      cl.splice(a, 0, e), a === 0 && $m(e);
    }
  };
  var Im = r.version;
  if (Im !== "19.3.1")
    throw Error(
      o(
        527,
        Im,
        "19.3.1"
      )
    );
  te.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = D(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var T0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bc.isDisabled && bc.supportsFiber)
      try {
        Bn = bc.inject(
          T0
        ), Tt = bc;
      } catch {
      }
  }
  return Mu.createRoot = function(e, t) {
    if (!v(e)) throw Error(o(299));
    var a = !1, l = "", n = Gd, u = Xd, c = Qd;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Ym(
      e,
      1,
      !1,
      null,
      null,
      a,
      l,
      null,
      n,
      u,
      c,
      Wm
    ), e[Ll] = t.current, Yr(e), new of(t);
  }, Mu.hydrateRoot = function(e, t, a) {
    if (!v(e)) throw Error(o(299));
    var l = !1, n = "", u = Gd, c = Xd, f = Qd, m = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.formState !== void 0 && (m = a.formState)), t = Ym(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      n,
      m,
      u,
      c,
      f,
      Wm
    ), t.context = Gm(null), a = t.current, l = Ot(), l = Bc(l), n = Va(l), n.callback = null, Ka(a, n, l), a = l, t.current.lanes = a, Gn(t, a), da(t), e[Ll] = t.current, Yr(e), new Sc(t);
  }, Mu.version = "19.3.1", Mu;
}
var sh;
function R0() {
  if (sh) return vf.exports;
  sh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), vf.exports = M0(), vf.exports;
}
var U0 = R0(), w = Nf();
const Sh = w.createContext(null);
function rh() {
  var s = window.users[window.currentUser] || {};
  return {
    currentUser: window.currentUser,
    displayName: s.displayName || window.currentUser,
    statusMessage: s.statusMessage || "",
    isMaster: window.isMaster(),
    isSlave: window.isSlave(),
    isAdmin: window.isAdmin(),
    activeMasterContext: window.activeMasterContext,
    myMasterOptions: (window.myMasterOptions || []).slice(),
    groupTerms: Object.assign({}, window.groupTerms),
    theme: {
      bg: window.groupTheme.bg,
      card: window.groupTheme.card,
      elevated: window.groupTheme.elevated,
      textPrimary: window.groupTheme.textPrimary,
      textSecondary: window.groupTheme.textSecondary
    }
  };
}
function H0({ children: s }) {
  const [r, d] = w.useState(rh), o = w.useCallback(function() {
    d(rh());
  }, []), v = w.useCallback(
    async function(C) {
      await window.setActiveMasterContext(C), o();
    },
    [o]
  ), h = w.useCallback(function() {
    window.exitBetaMode();
  }, []), E = w.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        exitBeta: h
      });
    },
    [r, o, v, h]
  );
  return /* @__PURE__ */ i.jsx(Sh.Provider, { value: E, children: s });
}
function xe() {
  const s = w.useContext(Sh);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const q0 = "_button_fpxiy_7", L0 = "_primary_fpxiy_22", B0 = "_secondary_fpxiy_30", Y0 = "_danger_fpxiy_39", G0 = "_spinner_fpxiy_52", X0 = "_labelLoading_fpxiy_61", wn = {
  button: q0,
  primary: L0,
  secondary: B0,
  danger: Y0,
  spinner: G0,
  labelLoading: X0
};
function L({
  variant: s = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...h
}) {
  var E = s === "secondary" ? wn.secondary : s === "danger" ? wn.danger : wn.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [wn.button, E, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...h,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: wn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? wn.labelLoading : void 0, children: o })
      ]
    }
  );
}
const Q0 = "_backdrop_13xfr_1", Z0 = "_dialog_13xfr_12", V0 = "_header_13xfr_23", K0 = "_title_13xfr_30", J0 = "_closeBtn_13xfr_35", zn = {
  backdrop: Q0,
  dialog: Z0,
  header: V0,
  title: K0,
  closeBtn: J0
};
function bh({ title: s, onClose: r, children: d }) {
  return w.useEffect(function() {
    function o(v) {
      v.key === "Escape" && r();
    }
    return document.addEventListener("keydown", o), function() {
      document.removeEventListener("keydown", o);
    };
  }, [r]), /* @__PURE__ */ i.jsx(
    "div",
    {
      className: zn.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && r();
      },
      children: /* @__PURE__ */ i.jsxs("div", { className: zn.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ i.jsxs("div", { className: zn.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: zn.title, children: s }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: zn.closeBtn,
              onClick: r,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: zn.body, children: d })
      ] })
    }
  );
}
const $0 = "_group_1wdnn_1", k0 = "_label_1wdnn_8", F0 = "_input_1wdnn_14", W0 = "_error_1wdnn_32", Ru = {
  group: $0,
  label: k0,
  input: F0,
  error: W0
};
function ce({ label: s, error: r, multiline: d = !1, id: o, ...v }) {
  var h = o || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: Ru.group, children: [
    s ? /* @__PURE__ */ i.jsx("label", { className: Ru.label, htmlFor: h, children: s }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: h, className: Ru.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: h, className: Ru.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: Ru.error, children: r }) : null
  ] });
}
const I0 = "_header_1ozxo_1", P0 = "_title_1ozxo_12", e1 = "_subtitle_1ozxo_17", t1 = "_right_1ozxo_23", a1 = "_groupSelect_1ozxo_30", l1 = "_userBadge_1ozxo_39", n1 = "_points_1ozxo_43", rl = {
  header: I0,
  title: P0,
  subtitle: e1,
  right: t1,
  groupSelect: a1,
  userBadge: l1,
  points: n1
};
function u1() {
  var s = xe(), r = window.users[s.currentUser] || {}, [d, o] = w.useState(!1), [v, h] = w.useState(s.statusMessage), [E, C] = w.useState(!1);
  function z() {
    s.exitBeta();
  }
  function D() {
    s.exitBeta(), window.logout();
  }
  function A() {
    h(s.statusMessage), o(!0);
  }
  async function b(T) {
    T.preventDefault(), C(!0);
    try {
      await window.updateMyStatusMessage(v), s.refresh(), o(!1);
    } finally {
      C(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs("header", { className: rl.header, children: [
    /* @__PURE__ */ i.jsxs("div", { className: rl.left, children: [
      /* @__PURE__ */ i.jsx("h1", { className: rl.title, children: s.groupTerms.groupLabel }),
      /* @__PURE__ */ i.jsx("p", { className: rl.subtitle, children: "Beta dashboard" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: rl.right, children: [
      s.myMasterOptions.length > 1 ? /* @__PURE__ */ i.jsx(
        "select",
        {
          className: rl.groupSelect,
          value: s.activeMasterContext,
          onChange: function(T) {
            s.switchGroup(T.target.value);
          },
          "aria-label": "Switch group",
          children: s.myMasterOptions.map(function(T) {
            var R = window.users[T];
            return /* @__PURE__ */ i.jsx("option", { value: T, children: R ? R.displayName : T }, T);
          })
        }
      ) : null,
      /* @__PURE__ */ i.jsx("span", { className: rl.userBadge, children: s.displayName }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: A, children: "✏️ Status" }),
      s.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: rl.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: z, children: "Switch to classic styling" }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: D, children: "Logout" })
    ] }),
    d ? /* @__PURE__ */ i.jsx(bh, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ i.jsxs("form", { onSubmit: b, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Status message",
          value: v,
          onChange: function(T) {
            h(T.target.value);
          },
          placeholder: "e.g. 🐷 feeling good today",
          maxLength: 100,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ i.jsx(L, { type: "submit", loading: E, children: "Save" })
    ] }) }) : null
  ] });
}
const i1 = "_nav_c0zce_1", c1 = "_tab_c0zce_10", s1 = "_tabActive_c0zce_11", _f = {
  nav: i1,
  tab: c1,
  tabActive: s1
};
function r1({ activeTab: s, onChange: r }) {
  var d = xe(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && (o.push({ key: "dashboard", label: "Dashboard" }), o.push({ key: "tools", label: "Tools" })), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ i.jsx("nav", { className: _f.nav, "aria-label": "Main", children: o.map(function(v) {
    var h = v.key === s;
    return /* @__PURE__ */ i.jsx(
      "button",
      {
        className: h ? _f.tabActive : _f.tab,
        "aria-current": h ? "page" : void 0,
        onClick: function() {
          r(v.key);
        },
        children: v.label
      },
      v.key
    );
  }) });
}
function It(s) {
  var r = s.table, d = s.select || "*", o = s.masterUsername, v = s.sort, h = s.enabled !== !1, [E, C] = w.useState([]), [z, D] = w.useState("loading"), [A, b] = w.useState(null), T = w.useRef(Math.random().toString(36).slice(2)).current, R = w.useCallback(
    async function() {
      if (!h || !o) {
        C([]), D("ready");
        return;
      }
      D("loading"), b(null);
      var Y = window.supabase.from(r).select(d).eq("master_username", o), $ = await Y;
      if ($.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", $.error), b($.error), D("error");
        return;
      }
      var V = $.data || [];
      v && (V = V.slice().sort(v)), C(V), D("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [r, d, o, h]
  );
  return w.useEffect(
    function() {
      if (R(), !(!h || !o)) {
        var Y = window.supabase.channel("beta_" + r + "_" + o + "_" + T).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: r,
            filter: "master_username=eq." + o
          },
          function($) {
            C(function(V) {
              var k = V;
              return $.eventType === "INSERT" ? k = [$.new].concat(V) : $.eventType === "UPDATE" ? k = V.map(function(I) {
                return I.id === $.old.id ? $.new : I;
              }) : $.eventType === "DELETE" && (k = V.filter(function(I) {
                return I.id !== $.old.id;
              })), v ? k.slice().sort(v) : k;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(Y);
        };
      }
    },
    [r, o, h, R]
  ), { items: E, status: z, error: A, reload: R };
}
function f1(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Ef() {
  var s = xe(), r = It({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: f1
  });
  return {
    tasks: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    // `fields` matches the shape window.createTask's optional overrides
    // argument expects - see js/database-tasks.js.
    createTask: function(d) {
      return window.createTask(d);
    },
    checkOffTask: function(d) {
      return window.checkOffTask(d);
    },
    approveTask: function(d) {
      return window.approveTask(d);
    },
    rejectTask: function(d) {
      return window.rejectTask(d);
    },
    deleteTask: function(d) {
      return window.deleteTask(d);
    },
    acceptDemerit: function(d) {
      return window.acceptDemerit(d);
    },
    appealDemerit: function(d) {
      var o = r.items.find(function(v) {
        return v.id === d;
      });
      o && window.appealDemerit(d);
    },
    approveAppeal: function(d) {
      return window.approveAppeal(d);
    },
    denyAppeal: function(d) {
      return window.denyAppeal(d);
    },
    markInvoiceAsPaid: function(d) {
      return window.markInvoiceAsPaid(d);
    },
    approveInvoice: function(d) {
      return window.approveInvoice(d);
    }
  };
}
function o1() {
  var s = xe(), [r, d] = w.useState([]);
  return w.useEffect(
    function() {
      var o = !1;
      if (!s.isSlave || !s.activeMasterContext) {
        d([]);
        return;
      }
      return window.supabase.from("task_assignments").select("task_id").eq("assigned_to", s.currentUser).eq("master_username", s.activeMasterContext).then(function(v) {
        o || v.error || d(
          (v.data || []).map(function(h) {
            return h.task_id;
          })
        );
      }), function() {
        o = !0;
      };
    },
    [s.isSlave, s.currentUser, s.activeMasterContext]
  ), r;
}
function Af() {
  var s = xe(), r = s.activeMasterContext, [d, o] = w.useState([]), [v, h] = w.useState("loading"), [E, C] = w.useState(null), z = w.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), C(null);
      var A = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (A.error) {
        C(A.error), h("error");
        return;
      }
      var b = (A.data || []).map(function(I) {
        return I.slave_username;
      }), T = { data: [] }, R = { data: [] };
      b.length > 0 && (T = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), R = await window.supabase.from("users").select("username, display_name, status_message").in("username", b));
      var Y = {};
      (T.data || []).forEach(function(I) {
        Y[I.username] = I.points || 0;
      });
      var $ = {}, V = {};
      (R.data || []).forEach(function(I) {
        $[I.username] = I.display_name || I.username, V[I.username] = I.status_message || "";
      });
      var k = (A.data || []).map(function(I) {
        return {
          username: I.slave_username,
          displayName: $[I.slave_username] || I.slave_username,
          statusMessage: V[I.slave_username] || "",
          points: Y[I.slave_username] || 0,
          status: I.status
        };
      });
      o(k), h("ready");
    },
    [r]
  );
  w.useEffect(
    function() {
      if (z(), !!r) {
        var A = window.supabase.channel("beta_slave_roster_" + r).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + r
          },
          function() {
            z();
          }
        ).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "master_slave_relationships",
            filter: "master_username=eq." + r
          },
          function() {
            z();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(A);
        };
      }
    },
    [r, z]
  );
  var D = d.filter(function(A) {
    return A.status === "active";
  });
  return {
    slaves: D,
    allSlaves: d,
    status: v,
    error: E,
    reload: z
  };
}
const d1 = "_card_1j746_1", v1 = "_raised_1j746_8", fh = {
  card: d1,
  raised: v1
};
function pe({ raised: s = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [s ? fh.raised : fh.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const m1 = "_heading_1bkor_1", h1 = "_row_1bkor_11", g1 = "_checkboxRow_1bkor_31", y1 = "_select_1bkor_47", _1 = "_fieldset_1bkor_69", p1 = "_hint_1bkor_83", Da = {
  heading: m1,
  row: h1,
  checkboxRow: g1,
  select: y1,
  fieldset: _1,
  hint: p1
};
var oh = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function S1({ onCreated: s }) {
  var r = xe(), d = Af(), [o, v] = w.useState(oh), [h, E] = w.useState([]), [C, z] = w.useState(!1);
  function D(T, R) {
    v(function(Y) {
      return Object.assign({}, Y, { [T]: R });
    });
  }
  function A(T) {
    E(function(R) {
      return R.includes(T) ? R.filter(function(Y) {
        return Y !== T;
      }) : R.concat(T);
    });
  }
  async function b(T) {
    if (T.preventDefault(), !!o.text.trim()) {
      z(!0);
      try {
        await window.createTask({
          text: o.text,
          isDemerit: o.isDemerit,
          points: o.points,
          penaltyPoints: o.penaltyPoints,
          dueDate: o.dueDate || null,
          isRepeating: o.isRepeating,
          repeatInterval: o.isRepeating ? o.repeatInterval : null,
          selectedPigs: h,
          assignmentMode: o.assignmentMode
        }), v(oh), E([]), s && s();
      } finally {
        z(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Da.heading, children: "Create New Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: b, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Task description",
          value: o.text,
          onChange: function(T) {
            D("text", T.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Da.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: o.isDemerit,
            onChange: function(T) {
              D("isDemerit", T.target.checked);
            }
          }
        ),
        "This is a demerit (penalty only, no points)"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Da.row, children: [
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Points",
            type: "number",
            min: "0",
            value: o.points,
            onChange: function(T) {
              D("points", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Penalty points",
            type: "number",
            min: "0",
            value: o.penaltyPoints,
            onChange: function(T) {
              D("penaltyPoints", T.target.value);
            }
          }
        ),
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Due date",
            type: "datetime-local",
            value: o.dueDate,
            onChange: function(T) {
              D("dueDate", T.target.value);
            }
          }
        )
      ] }),
      o.isDemerit ? null : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("label", { className: Da.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: o.isRepeating,
              onChange: function(T) {
                D("isRepeating", T.target.checked);
              }
            }
          ),
          "Repeats"
        ] }),
        o.isRepeating ? /* @__PURE__ */ i.jsxs(
          "select",
          {
            className: Da.select,
            value: o.repeatInterval,
            onChange: function(T) {
              D("repeatInterval", T.target.value);
            },
            children: [
              /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
              /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ i.jsxs("fieldset", { className: Da.fieldset, children: [
        /* @__PURE__ */ i.jsxs("legend", { children: [
          "Assign to ",
          r.groupTerms.slaveLabelPlural
        ] }),
        d.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: Da.hint, children: [
          "No ",
          r.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : d.slaves.map(function(T) {
          return /* @__PURE__ */ i.jsxs("label", { className: Da.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: h.includes(T.username),
                onChange: function() {
                  A(T.username);
                }
              }
            ),
            T.displayName
          ] }, T.username);
        })
      ] }),
      !o.isDemerit && h.length > 1 ? /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Da.select,
          value: o.assignmentMode,
          onChange: function(T) {
            D("assignmentMode", T.target.value);
          },
          "aria-label": "Assignment mode",
          children: [
            /* @__PURE__ */ i.jsxs("option", { value: "individual", children: [
              "One copy per ",
              r.groupTerms.slaveLabel
            ] }),
            /* @__PURE__ */ i.jsx("option", { value: "shared", children: "Shared (one task, anyone can complete it)" })
          ]
        }
      ) : null,
      /* @__PURE__ */ i.jsx(L, { type: "submit", loading: C, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const b1 = "_wrap_1qfmw_1", x1 = "_spinner_1qfmw_10", dh = {
  wrap: b1,
  spinner: x1
};
function Vt({ label: s = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: dh.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: dh.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: s })
  ] });
}
const j1 = "_wrap_buujm_1", T1 = "_message_buujm_9", vh = {
  wrap: j1,
  message: T1
};
function Pt({ message: s = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: vh.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: vh.message, children: s }),
    r ? /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const N1 = "_wrap_mx4zv_1", E1 = "_icon_mx4zv_7", A1 = "_title_mx4zv_12", w1 = "_hint_mx4zv_18", xc = {
  wrap: N1,
  icon: E1,
  title: A1,
  hint: w1
};
function Ke({ icon: s = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: xc.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: xc.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ i.jsx("p", { className: xc.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: xc.hint, children: d }) : null
  ] });
}
const z1 = "_badge_1988s_1", C1 = "_neutral_1988s_10", D1 = "_success_1988s_15", O1 = "_warning_1988s_20", M1 = "_danger_1988s_25", Uu = {
  badge: z1,
  neutral: C1,
  success: D1,
  warning: O1,
  danger: M1
};
function ht({ tone: s = "neutral", children: r }) {
  var d = s === "success" ? Uu.success : s === "warning" ? Uu.warning : s === "danger" ? Uu.danger : Uu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [Uu.badge, d].join(" "), children: r });
}
function xh(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function jh(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const R1 = "_item_v1inl_1", U1 = "_header_v1inl_5", H1 = "_text_v1inl_11", q1 = "_meta_v1inl_16", L1 = "_appealText_v1inl_33", B1 = "_actions_v1inl_41", Cn = {
  item: R1,
  header: U1,
  text: H1,
  meta: q1,
  appealText: L1,
  actions: B1
};
function Y1({ task: s, actions: r }) {
  var d = xe(), o = window.users[s.assignedTo], v = s.type === "cost-tracker", h = v ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ i.jsxs(pe, { className: Cn.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Cn.header, children: [
      /* @__PURE__ */ i.jsx(ht, { tone: jh(s), children: xh(s) }),
      s.type === "demerit" ? /* @__PURE__ */ i.jsx(ht, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Cn.text, children: v ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: Cn.meta, children: [
      s.assignedTo ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ i.jsx("dd", { children: o ? o.displayName : s.assignedTo })
      ] }) : /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assignment" }),
        /* @__PURE__ */ i.jsx("dd", { children: "Shared" })
      ] }),
      !v && s.points ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Points" }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          "+",
          s.points
        ] })
      ] }) : null,
      s.penaltyPoints ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Penalty" }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          "-",
          s.penaltyPoints
        ] })
      ] }) : null,
      v && h ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ i.jsx("dd", { children: h })
      ] }) : null,
      s.dueDate ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ i.jsx("dd", { children: window.formatDate(s.dueDate) })
      ] }) : null
    ] }),
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Cn.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Cn.actions, children: [
      d.isSlave && !v && s.type !== "demerit" && s.assignedTo === d.currentUser && s.status === "todo" ? /* @__PURE__ */ i.jsx(L, { onClick: function() {
        r.checkOffTask(s.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && s.type === "demerit" && s.status === "demerit_issued" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(L, { onClick: function() {
          r.acceptDemerit(s.id);
        }, children: "Accept" }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          r.appealDemerit(s.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && v && s.status === "todo" ? /* @__PURE__ */ i.jsx(L, { onClick: function() {
        r.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && s.status === "pending_approval" && v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(L, { onClick: function() {
          r.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && s.status === "pending_approval" && !v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(L, { onClick: function() {
          r.approveTask(s.id);
        }, children: "Approve" }),
        /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && s.type === "demerit" && s.appealStatus === "pending" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(L, { onClick: function() {
          r.approveAppeal(s.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
          r.denyAppeal(s.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
        r.deleteTask(s.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function jc({ tasks: s, status: r, error: d, onRetry: o, actions: v, emptyLabel: h }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    Pt,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { icon: "✓", title: h || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: s.map(function(E) {
    return /* @__PURE__ */ i.jsx(Y1, { task: E, actions: v }, E.id);
  }) });
}
const G1 = "_section_7c868_1", X1 = "_heading_7c868_5", Dn = {
  section: G1,
  heading: X1
};
function Q1() {
  var s = xe(), r = Ef(), d = o1(), o = {
    checkOffTask: r.checkOffTask,
    approveTask: r.approveTask,
    rejectTask: r.rejectTask,
    deleteTask: r.deleteTask,
    acceptDemerit: r.acceptDemerit,
    appealDemerit: r.appealDemerit,
    approveAppeal: r.approveAppeal,
    denyAppeal: r.denyAppeal,
    markInvoiceAsPaid: r.markInvoiceAsPaid,
    approveInvoice: r.approveInvoice
  };
  if (s.isSlave) {
    var v = r.tasks.filter(function(C) {
      return C.assignedTo === s.currentUser || d.includes(C.id);
    });
    return /* @__PURE__ */ i.jsx(
      jc,
      {
        tasks: v,
        status: r.status,
        error: r.error,
        onRetry: r.reload,
        actions: o,
        emptyLabel: "No tasks assigned to you yet."
      }
    );
  }
  var h = r.tasks.filter(function(C) {
    return C.type === "demerit" && C.appealStatus === "pending";
  }), E = r.tasks.filter(function(C) {
    return C.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(S1, { onCreated: r.reload }),
    h.length > 0 ? /* @__PURE__ */ i.jsxs(pe, { className: Dn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Dn.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ i.jsx(
        jc,
        {
          tasks: h,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    E.length > 0 ? /* @__PURE__ */ i.jsxs(pe, { className: Dn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Dn.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        jc,
        {
          tasks: E,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(pe, { className: Dn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Dn.heading, children: "All Tasks" }),
      /* @__PURE__ */ i.jsx(
        jc,
        {
          tasks: r.tasks,
          status: r.status,
          error: r.error,
          onRetry: r.reload,
          actions: o,
          emptyLabel: "No tasks created yet"
        }
      )
    ] })
  ] });
}
const Z1 = "_day_1bhqz_1", V1 = "_dayHeading_1bhqz_5", K1 = "_item_1bhqz_13", J1 = "_text_1bhqz_17", $1 = "_meta_1bhqz_21", On = {
  day: Z1,
  dayHeading: V1,
  item: K1,
  text: J1,
  meta: $1
};
function k1(s) {
  return new Date(s).toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function F1() {
  var s = xe(), r = Ef();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx(Vt, { label: "Loading tasks..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(Pt, { message: r.error ? r.error.message : "", onRetry: r.reload });
  var d = r.tasks.filter(function(v) {
    return v.dueDate ? s.isSlave ? v.assignedTo === s.currentUser : !0 : !1;
  });
  if (d.length === 0)
    return /* @__PURE__ */ i.jsx(Ke, { title: "No upcoming due dates" });
  var o = {};
  return d.slice().sort(function(v, h) {
    return new Date(v.dueDate) - new Date(h.dueDate);
  }).forEach(function(v) {
    var h = k1(v.dueDate);
    o[h] = o[h] || [], o[h].push(v);
  }), /* @__PURE__ */ i.jsx("div", { children: Object.keys(o).map(function(v) {
    return /* @__PURE__ */ i.jsxs("section", { className: On.day, children: [
      /* @__PURE__ */ i.jsx("h3", { className: On.dayHeading, children: v }),
      o[v].map(function(h) {
        var E = window.users[h.assignedTo];
        return /* @__PURE__ */ i.jsxs(pe, { className: On.item, children: [
          /* @__PURE__ */ i.jsx(ht, { tone: jh(h), children: xh(h) }),
          /* @__PURE__ */ i.jsx("p", { className: On.text, children: h.text }),
          !s.isSlave && h.assignedTo ? /* @__PURE__ */ i.jsxs("p", { className: On.meta, children: [
            "Assigned to ",
            E ? E.displayName : h.assignedTo
          ] }) : null,
          /* @__PURE__ */ i.jsxs("p", { className: On.meta, children: [
            "Due ",
            window.formatDate(h.dueDate)
          ] })
        ] }, h.id);
      })
    ] }, v);
  }) });
}
function W1(s, r) {
  return new Date(r.timestamp) - new Date(s.timestamp);
}
function I1() {
  var s = xe(), r = It({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: W1
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const P1 = "_row_qtrye_1", e_ = "_tile_qtrye_8", t_ = "_number_qtrye_12", a_ = "_label_qtrye_17", Tc = {
  row: P1,
  tile: e_,
  number: t_,
  label: a_
};
function l_({ stats: s }) {
  return /* @__PURE__ */ i.jsx("div", { className: Tc.row, children: s.map(function(r) {
    return /* @__PURE__ */ i.jsxs(pe, { className: Tc.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: Tc.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: Tc.label, children: r.label })
    ] }, r.label);
  }) });
}
const n_ = "_list_azyhi_1", u_ = "_row_azyhi_7", i_ = "_positive_azyhi_13", c_ = "_zero_azyhi_18", s_ = "_negative_azyhi_23", Vu = {
  list: n_,
  row: u_,
  positive: i_,
  zero: c_,
  negative: s_
};
function r_(s) {
  return s < 0 ? Vu.negative : s === 0 ? Vu.zero : Vu.positive;
}
function f_({ slaves: s }) {
  var r = xe();
  return s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: Vu.list, children: s.map(function(d) {
    return /* @__PURE__ */ i.jsxs(pe, { className: Vu.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: r_(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const o_ = "_heading_1mu37_1", d_ = "_form_1mu37_6", v_ = "_select_1mu37_13", pf = {
  heading: o_,
  form: d_,
  select: v_
};
function m_({ slaves: s }) {
  var r = xe(), [d, o] = w.useState(s[0] ? s[0].username : ""), [v, h] = w.useState(0);
  w.useEffect(
    function() {
      var C = s.find(function(z) {
        return z.username === d;
      });
      C ? h(C.points) : s[0] && o(s[0].username);
    },
    [s, d]
  );
  async function E(C) {
    if (C.preventDefault(), !!d) {
      var z = s.find(function(A) {
        return A.username === d;
      }), D = z ? z.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (z ? z.displayName : d) + " points changed from " + D + " to " + (Number(v) || 0),
        "success"
      );
    }
  }
  return s.length === 0 ? null : /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsxs("h3", { className: pf.heading, children: [
      "Set ",
      r.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ i.jsxs("form", { className: pf.form, onSubmit: E, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: pf.select,
          value: d,
          onChange: function(C) {
            o(C.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: s.map(function(C) {
            return /* @__PURE__ */ i.jsx("option", { value: C.username, children: C.displayName }, C.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(C) {
            h(C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(L, { type: "submit", children: "Set" })
    ] })
  ] });
}
const h_ = "_list_1jial_1", g_ = "_item_1jial_10", y_ = "_user_1jial_16", __ = "_details_1jial_20", p_ = "_time_1jial_24", Mn = {
  list: h_,
  item: g_,
  user: y_,
  details: __,
  time: p_
};
function S_({ activity: s, status: r, error: d, onRetry: o }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(Pt, { message: d ? d.message : "", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No recent activity" }) : /* @__PURE__ */ i.jsx("ul", { className: Mn.list, children: s.map(function(v, h) {
    var E = window.users[v.user];
    return /* @__PURE__ */ i.jsxs("li", { className: Mn.item, children: [
      /* @__PURE__ */ i.jsx("span", { className: Mn.user, children: E ? E.displayName : v.user }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: Mn.action, children: v.action.replace(/_/g, " ") }),
      v.details ? /* @__PURE__ */ i.jsxs("span", { className: Mn.details, children: [
        " — ",
        v.details
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Mn.time, children: window.formatDate(v.timestamp) })
    ] }, h);
  }) });
}
const b_ = "_grid_69ji7_1", x_ = "_section_69ji7_8", j_ = "_heading_69ji7_12", Hu = {
  grid: b_,
  section: x_,
  heading: j_
};
function T_() {
  var s = xe(), r = Ef(), d = Af(), o = I1(), v = r.tasks, h = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(E) {
        return E.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(E) {
        return E.status === "completed";
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(l_, { stats: h }),
    /* @__PURE__ */ i.jsxs("div", { className: Hu.grid, children: [
      /* @__PURE__ */ i.jsxs(pe, { className: Hu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Hu.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(f_, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(m_, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(pe, { className: Hu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Hu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        S_,
        {
          activity: o.activity,
          status: o.status,
          error: o.error,
          onRetry: o.reload
        }
      )
    ] })
  ] });
}
function N_(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function E_() {
  var s = xe(), r = It({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: N_
  });
  return {
    suggestions: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    submitSuggestion: function(d) {
      return window.submitTaskSuggestion(d);
    },
    rejectSuggestion: function(d) {
      return window.rejectSuggestion(d);
    },
    approveSuggestion: function(d) {
      return window.approveSuggestion(d);
    },
    // Opens the classic, self-contained edit modal (it appends to
    // document.body itself, so it works fine from the React tree too -
    // see src/beta/README.md's "Hybrid data flow" section).
    editSuggestion: function(d) {
      window.showEditSuggestionModal(d);
    }
  };
}
var mh = { description: "", justification: "", points: 10, dueDate: "" };
function A_({ onSubmit: s }) {
  var [r, d] = w.useState(mh), [o, v] = w.useState(!1);
  function h(C, z) {
    d(function(D) {
      return Object.assign({}, D, { [C]: z });
    });
  }
  async function E(C) {
    if (C.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await s(r), d(mh);
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: E, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Description",
          value: r.description,
          onChange: function(C) {
            h("description", C.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Why? (optional)",
          multiline: !0,
          rows: 3,
          value: r.justification,
          onChange: function(C) {
            h("justification", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Suggested points",
          type: "number",
          min: "0",
          value: r.points,
          onChange: function(C) {
            h("points", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(C) {
            h("dueDate", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(L, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const w_ = "_card_q0jnd_1", z_ = "_badgeRow_q0jnd_5", C_ = "_description_q0jnd_11", D_ = "_justification_q0jnd_15", O_ = "_metaLine_q0jnd_21", M_ = "_actions_q0jnd_27", Rn = {
  card: w_,
  badgeRow: z_,
  description: C_,
  justification: D_,
  metaLine: O_,
  actions: M_
};
function R_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function hh({ suggestion: s, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var h = window.users[s.reviewedBy];
  return /* @__PURE__ */ i.jsxs(pe, { className: Rn.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Rn.badgeRow, children: [
      /* @__PURE__ */ i.jsx(ht, { tone: R_(s.status), children: s.status }),
      /* @__PURE__ */ i.jsxs(ht, { tone: "neutral", children: [
        s.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Rn.description, children: s.description }),
    s.justification ? /* @__PURE__ */ i.jsx("p", { className: Rn.justification, children: s.justification }) : null,
    /* @__PURE__ */ i.jsxs("p", { className: Rn.metaLine, children: [
      "Submitted ",
      window.formatDate(s.createdAt),
      s.suggestedDueDate ? " · Suggested due " + window.formatDate(s.suggestedDueDate) : "",
      s.reviewedAt ? " · Reviewed by " + (h ? h.displayName : s.reviewedBy) : ""
    ] }),
    r && s.status === "pending" ? /* @__PURE__ */ i.jsxs("div", { className: Rn.actions, children: [
      /* @__PURE__ */ i.jsx(L, { onClick: function() {
        d(s.id);
      }, children: "Approve" }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
        o(s.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
        v(s.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function U_() {
  var s = xe(), r = E_();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx(Vt, { label: "Loading suggestions..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load suggestions: " + (r.error ? r.error.message : ""),
        onRetry: r.reload
      }
    );
  if (s.isSlave) {
    var d = r.suggestions.filter(function(v) {
      return v.suggestedBy === s.currentUser;
    });
    return /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx(A_, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(hh, { suggestion: v, forAdmin: !1 }, v.id);
      })
    ] });
  }
  var o = r.suggestions.filter(function(v) {
    return v.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No suggestions pending review" }) : o.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        hh,
        {
          suggestion: v,
          forAdmin: !0,
          onApprove: r.approveSuggestion,
          onEdit: r.editSuggestion,
          onReject: r.rejectSuggestion
        },
        v.id
      );
    })
  ] });
}
var gh = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function H_(s, r) {
  return s.title.localeCompare(r.title);
}
function q_(s, r) {
  return new Date(r.purchaseDate) - new Date(s.purchaseDate);
}
function L_() {
  var s = xe(), r = s.activeMasterContext, d = It({
    table: "rewards",
    masterUsername: r,
    sort: H_
  }), o = It({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: q_
  }), [v, h] = w.useState(gh), [E, C] = w.useState("loading"), z = w.useCallback(
    async function() {
      if (r) {
        C("loading");
        var D = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (D.error) {
          C("error");
          return;
        }
        h(
          D.data && D.data.length > 0 ? D.data[0] : gh
        ), C("ready");
      }
    },
    [r]
  );
  return w.useEffect(
    function() {
      if (z(), !!r) {
        var D = window.supabase.channel("beta_reward_settings_" + r).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + r
          },
          function() {
            z();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(D);
        };
      }
    },
    [r, z]
  ), {
    rewards: d.items,
    rewardsStatus: d.status,
    rewardsError: d.error,
    reloadRewards: d.reload,
    purchases: o.items,
    purchasesStatus: o.status,
    purchasesError: o.error,
    reloadPurchases: o.reload,
    settings: v,
    settingsStatus: E,
    addReward: function(D, A, b, T) {
      return window.addReward(D, A, b, T);
    },
    updateReward: function(D, A, b, T, R) {
      return window.updateReward(D, A, b, T, R);
    },
    deleteReward: function(D) {
      return window.deleteReward(D);
    },
    purchaseReward: function(D) {
      return window.purchaseReward(D);
    },
    authorizePurchase: function(D) {
      return window.authorizePurchase(D);
    },
    denyPurchase: function(D) {
      return window.denyPurchase(D);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(D, A, b) {
      return window.updateRewardSystemSettings(D, A, b);
    }
  };
}
const B_ = "_card_1tc0o_1", Y_ = "_title_1tc0o_7", G_ = "_description_1tc0o_12", X_ = "_badgeRow_1tc0o_19", Q_ = "_actions_1tc0o_24", qu = {
  card: B_,
  title: Y_,
  description: G_,
  badgeRow: X_,
  actions: Q_
};
function Th({ reward: s, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(pe, { className: qu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: qu.title, children: s.title }),
    /* @__PURE__ */ i.jsx("p", { className: qu.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("div", { className: qu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(ht, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(ht, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: qu.actions, children: [
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
        d(s);
      }, children: "Edit" }),
      /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
        o(s.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ i.jsx(L, { onClick: function() {
      r(s.id);
    }, children: "Purchase" })
  ] });
}
const Z_ = "_grid_19ohq_1", V_ = "_purchasesHeading_19ohq_7", K_ = "_purchaseCard_19ohq_11", J_ = "_badgeRow_19ohq_15", $_ = "_purchaseTitle_19ohq_19", k_ = "_purchaseMeta_19ohq_24", Rl = {
  grid: Z_,
  purchasesHeading: V_,
  purchaseCard: K_,
  badgeRow: J_,
  purchaseTitle: $_,
  purchaseMeta: k_
};
function F_(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function W_({ rewards: s, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: h }) {
  var E = xe(), C = h.filter(function(z) {
    return z.userId === E.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(Pt, { message: d ? d.message : "Failed to load", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Rl.grid, children: s.map(function(z) {
      return /* @__PURE__ */ i.jsx(Th, { reward: z, onPurchase: v }, z.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Rl.purchasesHeading, children: "My Reward Purchases" }),
    C.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No purchases yet" }) : C.map(function(z) {
      return /* @__PURE__ */ i.jsxs(pe, { className: Rl.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Rl.badgeRow, children: /* @__PURE__ */ i.jsx(ht, { tone: F_(z.status), children: z.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Rl.purchaseTitle, children: z.rewards ? z.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Rl.purchaseMeta, children: [
          z.purchaseCost,
          " points · ",
          window.formatDate(z.purchaseDate)
        ] }),
        z.status === "denied" && z.notes ? /* @__PURE__ */ i.jsxs("p", { className: Rl.purchaseMeta, children: [
          "Reason: ",
          z.notes
        ] }) : null
      ] }, z.id);
    })
  ] });
}
const I_ = "_heading_p82cd_1", P_ = "_row_p82cd_6", ep = "_selectGroup_p82cd_16", tp = "_selectLabel_p82cd_23", ap = "_select_p82cd_16", lp = "_actions_p82cd_38", Un = {
  heading: I_,
  row: P_,
  selectGroup: ep,
  selectLabel: tp,
  select: ap,
  actions: lp
};
var Sf = { title: "", description: "", cost: 10, type: "instant" };
function np({ editingReward: s, onSave: r, onCancelEdit: d }) {
  var [o, v] = w.useState(Sf), [h, E] = w.useState(!1);
  w.useEffect(
    function() {
      v(
        s ? {
          title: s.title,
          description: s.description,
          cost: s.cost,
          type: s.type
        } : Sf
      );
    },
    [s]
  );
  function C(D, A) {
    v(function(b) {
      return Object.assign({}, b, { [D]: A });
    });
  }
  async function z(D) {
    if (D.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      E(!0);
      try {
        await r(o, s ? s.id : null), v(Sf);
      } finally {
        E(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Un.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: z, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Title",
          value: o.title,
          onChange: function(D) {
            C("title", D.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Description",
          multiline: !0,
          rows: 2,
          value: o.description,
          onChange: function(D) {
            C("description", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: Un.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(D) {
              C("cost", D.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: Un.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: Un.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: Un.select,
              value: o.type,
              onChange: function(D) {
                C("type", D.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "instant", children: "Instant purchase" }),
                /* @__PURE__ */ i.jsx("option", { value: "authorized", children: "Requires authorization" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Un.actions, children: [
        /* @__PURE__ */ i.jsx(L, { type: "submit", loading: h, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ i.jsx(L, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const up = "_heading_26k11_1", ip = "_row_26k11_6", cp = "_checkboxRow_26k11_16", sp = "_readout_26k11_24", rp = "_actions_26k11_30", Hn = {
  heading: up,
  row: ip,
  checkboxRow: cp,
  readout: sp,
  actions: rp
};
function fp({ settings: s, onSave: r, onReset: d }) {
  var [o, v] = w.useState(s.instantPurchaseLimit || 0), [h, E] = w.useState(s.resetDurationDays || 0), [C, z] = w.useState(s.requiresAuthorizationAfterLimit !== !1);
  w.useEffect(
    function() {
      v(s.instantPurchaseLimit || 0), E(s.resetDurationDays || 0), z(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function D(A) {
    A.preventDefault(), r(Number(o) || 0, Number(h) || 0, C);
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Hn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Hn.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(A) {
              v(A.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: h,
            onChange: function(A) {
              E(A.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Hn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: C,
            onChange: function(A) {
              z(A.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Hn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Hn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Hn.actions, children: [
        /* @__PURE__ */ i.jsx(L, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(L, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const op = "_card_zkx61_1", dp = "_title_zkx61_5", vp = "_meta_zkx61_10", mp = "_actions_zkx61_16", Nc = {
  card: op,
  title: dp,
  meta: vp,
  actions: mp
};
function hp({ purchases: s, onAuthorize: r, onDeny: d }) {
  var o = s.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var h = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(pe, { className: Nc.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: Nc.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        h ? h.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Nc.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Nc.actions, children: [
        /* @__PURE__ */ i.jsx(L, { onClick: function() {
          r(v.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
          d(v.id);
        }, children: "Deny" })
      ] })
    ] }, v.id);
  }) });
}
const gp = "_heading_1ewsp_1", yp = "_grid_1ewsp_5", Ec = {
  heading: gp,
  grid: yp
};
function _p({ rewardsState: s }) {
  var [r, d] = w.useState(null);
  async function o(h, E) {
    E ? await s.updateReward(E, h.title, h.description, Number(h.cost), h.type) : await s.addReward(h.title, h.description, Number(h.cost), h.type), d(null);
  }
  function v(h) {
    window.showConfirmModal("Delete this reward?", function(E) {
      E && s.deleteReward(h);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      np,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ec.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx(Vt, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Ec.grid, children: s.rewards.map(function(h) {
      return /* @__PURE__ */ i.jsx(
        Th,
        {
          reward: h,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        h.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Ec.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      fp,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ec.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      hp,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function pp() {
  var s = xe(), r = L_();
  return s.isMaster ? /* @__PURE__ */ i.jsx(_p, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    W_,
    {
      rewards: r.rewards,
      rewardsStatus: r.rewardsStatus,
      rewardsError: r.rewardsError,
      onRetry: r.reloadRewards,
      onPurchase: r.purchaseReward,
      purchases: r.purchases
    }
  );
}
const Sp = "_heading_pc1l6_1", bp = "_form_pc1l6_11", xp = "_row_pc1l6_33", jp = "_statusMessage_pc1l6_51", Lu = {
  heading: Sp,
  form: bp,
  row: xp,
  statusMessage: jp
};
function Tp() {
  var s = xe(), r = Af(), [d, o] = w.useState({ username: "", password: "", displayName: "" }), [v, h] = w.useState(!1);
  function E(A, b) {
    o(function(T) {
      return Object.assign({}, T, { [A]: b });
    });
  }
  async function C(A) {
    A.preventDefault(), h(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      h(!1);
    }
  }
  function z(A) {
    window.deactivatePig(A);
  }
  function D(A) {
    window.reactivatePig(A);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(pe, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Lu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Lu.form, onSubmit: C, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Username",
            value: d.username,
            onChange: function(A) {
              E("username", A.target.value);
            },
            placeholder: "lowercase, min 3 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Password",
            type: "password",
            value: d.password,
            onChange: function(A) {
              E("password", A.target.value);
            },
            placeholder: "min 4 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Display name",
            value: d.displayName,
            onChange: function(A) {
              E("displayName", A.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ i.jsxs(L, { type: "submit", loading: v, children: [
          "Add ",
          s.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("h2", { className: Lu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(A) {
      var b = A.status === "active";
      return /* @__PURE__ */ i.jsxs(pe, { className: Lu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(ht, { tone: b ? "success" : "neutral", children: b ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: A.displayName }),
          " (",
          A.username,
          ") ·",
          " ",
          A.points,
          " pts",
          A.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Lu.statusMessage, children: [
            " · ",
            A.statusMessage
          ] }) : null
        ] }),
        b ? /* @__PURE__ */ i.jsx(
          L,
          {
            variant: "danger",
            onClick: function() {
              z(A.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          L,
          {
            onClick: function() {
              D(A.username);
            },
            children: "Reactivate"
          }
        )
      ] }, A.username);
    })
  ] });
}
function Np(s, r) {
  return new Date(r.created_at) - new Date(s.created_at);
}
function Ep() {
  var s = xe(), r = It({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: Np
  }), d = w.useCallback(async function() {
    await window.generateInvite(), r.reload();
  }, [r]), o = w.useCallback(
    async function(v) {
      await window.revokeInvite(v), r.reload();
    },
    [r]
  );
  return {
    invites: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    generateInvite: d,
    revokeInvite: o
  };
}
const Ap = "_heading_1pok1_1", wp = "_hint_1pok1_11", zp = "_row_1pok1_23", Cp = "_actions_1pok1_45", Bu = {
  heading: Ap,
  hint: wp,
  row: zp,
  actions: Cp
};
function Dp(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function Op() {
  var s = xe(), r = Ep(), [d, o] = w.useState(null);
  function v(h) {
    navigator.clipboard.writeText(window.buildInviteLink(h)), o(h), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Bu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Bu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(L, { onClick: r.generateInvite, children: "Generate Invite Link" }),
    r.status === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading invites..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load invites: " + (r.error ? r.error.message : "unknown error"),
        onRetry: r.reload
      }
    ) : null,
    r.status === "ready" && r.invites.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No invites generated yet" }) : null,
    r.status === "ready" && r.invites.length > 0 ? r.invites.map(function(h) {
      var E = h.status === "pending" && h.expires_at && new Date(h.expires_at) < /* @__PURE__ */ new Date(), C = E ? "expired" : h.status, z = h.status === "pending" && !E;
      return /* @__PURE__ */ i.jsxs("div", { className: Bu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(ht, { tone: Dp(C), children: C.charAt(0).toUpperCase() + C.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: h.code }),
          h.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Bu.hint, children: [
            " · redeemed by ",
            h.redeemed_by
          ] }) : null
        ] }),
        z ? /* @__PURE__ */ i.jsxs("div", { className: Bu.actions, children: [
          /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
            v(h.code);
          }, children: d === h.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "danger",
              onClick: function() {
                r.revokeInvite(h.code);
              },
              children: "Revoke"
            }
          )
        ] }) : null
      ] }, h.id);
    }) : null
  ] });
}
function Mp(s, r) {
  return s.position - r.position;
}
function Nh() {
  var s = xe(), r = s.activeMasterContext, d = It({
    table: "motd_messages",
    masterUsername: r,
    sort: Mp
  }), o = It({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, h = o.items[0], E = h ? h.current_index : 0, C = v.length > 0 ? v[E % v.length] : null;
  return {
    messages: v,
    currentMessage: C,
    status: d.status,
    error: d.error,
    reload: function() {
      d.reload(), o.reload();
    },
    addMessage: async function(z) {
      await window.addMotdMessage({ body: z });
    },
    deleteMessage: async function(z) {
      await window.deleteMotdMessage(z);
    },
    moveUp: async function(z) {
      await window.moveMotdMessageUp(z);
    },
    moveDown: async function(z) {
      await window.moveMotdMessageDown(z);
    }
  };
}
const Rp = "_form_7nlkd_1", Up = {
  form: Rp
};
function Hp({ onAdd: s }) {
  var [r, d] = w.useState(""), [o, v] = w.useState(!1);
  async function h(E) {
    E.preventDefault();
    var C = r.trim();
    if (C) {
      v(!0);
      try {
        await s(C), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: Up.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      ce,
      {
        multiline: !0,
        rows: 2,
        value: r,
        onChange: function(E) {
          d(E.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ i.jsx(L, { type: "submit", loading: o, disabled: !r.trim(), children: "Add Message" })
  ] });
}
const qp = "_heading_10ijk_1", Lp = "_row_10ijk_11", Bp = "_actions_10ijk_33", bf = {
  heading: qp,
  row: Lp,
  actions: Bp
};
function Yp() {
  var s = Nh();
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: bf.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(Hp, { onAdd: s.addMessage }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading messages..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load messages: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" && s.messages.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No messages added yet" }) : null,
    s.status === "ready" && s.messages.length > 0 ? s.messages.map(function(r, d) {
      var o = d === 0, v = d === s.messages.length - 1, h = s.currentMessage && s.currentMessage.id === r.id;
      return /* @__PURE__ */ i.jsxs("div", { className: bf.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          h ? /* @__PURE__ */ i.jsx(ht, { tone: "success", children: "Showing now" }) : null,
          " ",
          r.body
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: bf.actions, children: [
          /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "secondary",
              disabled: o,
              onClick: function() {
                s.moveUp(r.id);
              },
              children: "↑"
            }
          ),
          /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "secondary",
              disabled: v,
              onClick: function() {
                s.moveDown(r.id);
              },
              children: "↓"
            }
          ),
          /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "danger",
              onClick: function() {
                s.deleteMessage(r.id);
              },
              children: "Delete"
            }
          )
        ] })
      ] }, r.id);
    }) : null
  ] });
}
function Gp() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Tp, {}),
    /* @__PURE__ */ i.jsx(Op, {}),
    /* @__PURE__ */ i.jsx(Yp, {})
  ] });
}
function Xp() {
  var s = xe(), [r, d] = w.useState([]), [o, v] = w.useState("loading"), h = w.useCallback(async function() {
    v("loading");
    var E = await window.fetchAllMasters();
    d(E || []), v("ready");
  }, []);
  return w.useEffect(
    function() {
      s.isAdmin && h();
    },
    [s.isAdmin, h]
  ), {
    masters: r,
    status: o,
    reload: h,
    createMaster: window.createMaster,
    updateMasterTerminology: window.updateMasterTerminology,
    updateMasterAccount: window.updateMasterAccount,
    deactivateMaster: function(E) {
      return new Promise(function(C) {
        window.showConfirmModal(
          "Deactivate master '" + E + "'? They (and their group) won't be able to log in.",
          async function(z) {
            z && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", E), window.showNotification("Master deactivated.", "success"), await h()), C();
          }
        );
      });
    },
    reactivateMaster: async function(E) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", E), window.showNotification("Master reactivated.", "success"), await h();
    }
  };
}
const Qp = "_list_1yv13_1", Zp = "_row_1yv13_10", Vp = "_ratio_1yv13_18", xf = {
  list: Qp,
  row: Zp,
  ratio: Vp
};
function Kp({ theme: s }) {
  if (!window.ContrastUtils) return null;
  var r = window.ContrastUtils.checkThemeContrast(s);
  return /* @__PURE__ */ i.jsx("ul", { className: xf.list, children: r.map(function(d) {
    return /* @__PURE__ */ i.jsxs("li", { className: xf.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.label }),
      /* @__PURE__ */ i.jsxs("span", { className: xf.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ i.jsx(ht, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const Jp = "_heading_1sy2j_1", $p = "_row_1sy2j_6", kp = "_checkboxRow_1sy2j_16", Fp = "_divider_1sy2j_24", Wp = "_colorRow_1sy2j_29", Ip = "_colorField_1sy2j_36", Pp = "_actions_1sy2j_53", Oa = {
  heading: Jp,
  row: $p,
  checkboxRow: kp,
  divider: Fp,
  colorRow: Wp,
  colorField: Ip,
  actions: Pp
};
var eS = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
};
function yh(s) {
  return {
    username: s ? s.username : "",
    password: "",
    displayName: s ? s.displayName : "",
    isAdmin: s ? s.isAdmin : !1,
    groupLabel: s ? s.groupLabel : "Household",
    masterLabel: s ? s.masterLabel : "Master",
    masterLabelPlural: s ? s.masterLabelPlural : "Masters",
    slaveLabel: s ? s.slaveLabel : "pig",
    slaveLabelPlural: s ? s.slaveLabelPlural : "pigs",
    classicUiForced: s ? s.classicUiForced : !1,
    theme: s ? s.theme : eS
  };
}
function _h({ master: s, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, h] = w.useState(yh(s)), [E, C] = w.useState(!1), z = !!s;
  function D(T, R) {
    h(function(Y) {
      return Object.assign({}, Y, { [T]: R });
    });
  }
  function A(T, R) {
    h(function(Y) {
      return Object.assign({}, Y, { theme: Object.assign({}, Y.theme, { [T]: R }) });
    });
  }
  async function b(T) {
    T.preventDefault(), C(!0);
    try {
      z ? await d(s.username, v) : (await r(v), h(yh(null)));
    } finally {
      C(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Oa.heading, children: z ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: b, children: [
      z ? null : /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Username",
          value: v.username,
          onChange: function(T) {
            D("username", T.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: z ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(T) {
            D("password", T.target.value);
          },
          required: !z
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Display name",
          value: v.displayName,
          onChange: function(T) {
            D("displayName", T.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Oa.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.isAdmin,
            onChange: function(T) {
              D("isAdmin", T.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Oa.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: v.groupLabel,
            onChange: function(T) {
              D("groupLabel", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: v.masterLabel,
            onChange: function(T) {
              D("masterLabel", T.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Oa.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Master label (plural)",
            value: v.masterLabelPlural,
            onChange: function(T) {
              D("masterLabelPlural", T.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: v.slaveLabel,
            onChange: function(T) {
              D("slaveLabel", T.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Slave label (plural)",
          value: v.slaveLabelPlural,
          onChange: function(T) {
            D("slaveLabelPlural", T.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx("hr", { className: Oa.divider }),
      /* @__PURE__ */ i.jsxs("label", { className: Oa.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.classicUiForced,
            onChange: function(T) {
              D("classicUiForced", T.target.checked);
            }
          }
        ),
        "Force classic styling for this group (disable beta)"
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: Oa.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(T) {
        var R = T[0], Y = T[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Oa.colorField, children: [
          Y,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.theme[R],
              onChange: function($) {
                A(R, $.target.value);
              }
            }
          )
        ] }, R);
      }) }),
      /* @__PURE__ */ i.jsx(Kp, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: Oa.actions, children: [
        /* @__PURE__ */ i.jsx(L, { type: "submit", loading: E, children: z ? "Save changes" : "Create master" }),
        z ? /* @__PURE__ */ i.jsx(L, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const tS = "_heading_vrwe0_1", aS = "_row_vrwe0_5", lS = "_badgeRow_vrwe0_14", nS = "_meta_vrwe0_20", uS = "_actions_vrwe0_26", Yu = {
  heading: tS,
  row: aS,
  badgeRow: lS,
  meta: nS,
  actions: uS
};
function iS() {
  var s = Xp(), [r, d] = w.useState(null);
  async function o(h) {
    var E = await s.createMaster(h);
    E && await s.reload();
  }
  async function v(h, E) {
    await s.updateMasterAccount(h, {
      displayName: E.displayName,
      password: E.password,
      isAdmin: E.isAdmin
    }), await s.updateMasterTerminology(h, E), d(null), await s.reload();
  }
  return r ? /* @__PURE__ */ i.jsx(
    _h,
    {
      master: r,
      onSaveExisting: v,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(_h, { onCreate: o }),
    /* @__PURE__ */ i.jsx("h2", { className: Yu.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Vt, {}) : s.masters.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No masters yet" }) : s.masters.map(function(h) {
      var E = h.status === "active";
      return /* @__PURE__ */ i.jsxs(pe, { className: Yu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Yu.badgeRow, children: [
            /* @__PURE__ */ i.jsx(ht, { tone: E ? "success" : "neutral", children: E ? "Active" : "Inactive" }),
            h.isAdmin ? /* @__PURE__ */ i.jsx(ht, { tone: "warning", children: "Admin" }) : null,
            h.classicUiForced ? /* @__PURE__ */ i.jsx(ht, { tone: "warning", children: "Classic Only" }) : null
          ] }),
          /* @__PURE__ */ i.jsx("strong", { children: h.displayName }),
          " (",
          h.username,
          ")",
          /* @__PURE__ */ i.jsxs("div", { className: Yu.meta, children: [
            "Group: ",
            h.groupLabel,
            " · ",
            h.masterLabel,
            " / ",
            h.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Yu.actions, children: [
          /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "secondary",
              onClick: function() {
                d(h);
              },
              children: "Edit"
            }
          ),
          E ? /* @__PURE__ */ i.jsx(
            L,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(h.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            L,
            {
              onClick: function() {
                s.reactivateMaster(h.username);
              },
              children: "Reactivate"
            }
          )
        ] })
      ] }, h.username);
    })
  ] });
}
var Ac = 100;
function cS() {
  var s = xe(), r = s.activeMasterContext, [d, o] = w.useState([]), [v, h] = w.useState("loading"), [E, C] = w.useState(null), [z, D] = w.useState(!1), A = w.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), C(null);
      var R = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Ac);
      if (R.error) {
        C(R.error), h("error");
        return;
      }
      var Y = (R.data || []).slice().reverse();
      o(Y), D((R.data || []).length === Ac), h("ready");
    },
    [r]
  ), b = w.useCallback(
    async function() {
      o(function(R) {
        if (R.length === 0) return R;
        var Y = R[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", Y.created_at).order("created_at", { ascending: !1 }).limit(Ac).then(function($) {
          if (!$.error) {
            var V = ($.data || []).slice().reverse();
            D(($.data || []).length === Ac), o(function(k) {
              return V.concat(k);
            });
          }
        }), R;
      });
    },
    [r]
  ), T = w.useCallback(
    async function(R) {
      await window.sendChatMessage({ body: R });
    },
    []
  );
  return w.useEffect(
    function() {
      if (A(), !!r) {
        var R = window.supabase.channel("beta_chat_messages_" + r).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + r
          },
          function(Y) {
            o(function($) {
              return $.concat([Y.new]);
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(R);
        };
      }
    },
    [r, A]
  ), {
    messages: d,
    status: v,
    error: E,
    hasMoreOlder: z,
    loadOlder: b,
    sendMessage: T,
    reload: A
  };
}
const sS = "_row_gqneb_1", rS = "_meta_gqneb_19", fS = "_status_gqneb_35", oS = "_time_gqneb_43", dS = "_body_gqneb_51", Gu = {
  row: sS,
  meta: rS,
  status: fS,
  time: oS,
  body: dS
};
function vS({ message: s }) {
  var r = window.users[s.sender_username], d = r ? r.displayName : s.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Gu.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Gu.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Gu.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Gu.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Gu.body, children: s.body })
  ] });
}
const mS = "_form_nndvu_1", hS = "_input_nndvu_13", ph = {
  form: mS,
  input: hS
};
function gS({ onSend: s }) {
  var [r, d] = w.useState(""), [o, v] = w.useState(!1);
  async function h(E) {
    E.preventDefault();
    var C = r.trim();
    if (C) {
      v(!0);
      try {
        await s(C), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: ph.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        className: ph.input,
        value: r,
        onChange: function(E) {
          d(E.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ i.jsx(L, { type: "submit", loading: o, disabled: !r.trim(), children: "Send" })
  ] });
}
const yS = "_heading_12c2o_1", _S = "_loadOlder_12c2o_11", pS = "_list_12c2o_19", jf = {
  heading: yS,
  loadOlder: _S,
  list: pS
};
function SS() {
  var s = cS(), r = w.useRef(null), d = w.useRef(!0);
  w.useEffect(
    function() {
      var v = r.current;
      v && d.current && (v.scrollTop = v.scrollHeight);
    },
    [s.messages]
  );
  function o() {
    var v = r.current;
    v && (d.current = v.scrollHeight - v.scrollTop - v.clientHeight < 80);
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: jf.heading, children: "Group Chat" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading chat..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load chat: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      s.hasMoreOlder ? /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: s.loadOlder, className: jf.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: jf.list, ref: r, onScroll: o, children: s.messages.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(vS, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(gS, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
function bS(s, r) {
  return new Date(r.updated_at) - new Date(s.updated_at);
}
function Eh() {
  var s = xe(), r = It({
    table: "saved_spirals",
    masterUsername: s.activeMasterContext,
    sort: bS
  }), d = w.useCallback(
    async function(v) {
      var h = await window.saveSpiralToLibrary(v);
      return r.reload(), h;
    },
    [r]
  ), o = w.useCallback(
    async function(v) {
      await window.deleteSavedSpiral(v), r.reload();
    },
    [r]
  );
  return {
    savedSpirals: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    saveSpiral: d,
    deleteSpiral: o
  };
}
var Ah = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function xS(s, r, d, o) {
  return Object.assign(
    {
      id: s,
      x: r / 2,
      y: d / 2
    },
    Ah,
    {}
  );
}
function jS(s, r, d) {
  var o = Math.min(s.canvas.width, s.canvas.height), v = r.radiusPercent / 100 * o * 2, h = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  s.save(), s.translate(r.x, r.y), s.rotate(r.rotation * Math.PI / 180 + h * 0.5), s.strokeStyle = r.color, s.lineWidth = r.thickness, s.globalAlpha = r.opacity, s.lineCap = "round", s.lineJoin = "round";
  for (var E = 0; E < r.arms; E++) {
    s.save(), s.rotate(E * 2 * Math.PI / r.arms), s.beginPath();
    for (var C = !0, z = 0; z < v; z += 0.5) {
      var D = z * 0.08 + h, A = z * Math.cos(D), b = z * Math.sin(D);
      C ? (s.moveTo(A, b), C = !1) : s.lineTo(A, b);
    }
    s.stroke(), s.restore();
  }
  s.restore();
}
function TS(s) {
  var r = JSON.stringify(s, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function NS(s, r, d) {
  var o = new FileReader();
  o.onload = function(v) {
    try {
      var h = JSON.parse(v.target.result);
      r(h);
    } catch {
      d("Failed to load configuration. Invalid file format.");
    }
  }, o.readAsText(s);
}
const ES = "_canvas_1y7at_1", AS = {
  canvas: ES
};
function wS({ canvasRef: s, spiralsRef: r, backgroundColor: d }) {
  var o = w.useRef(d);
  return w.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), w.useEffect(function() {
    var v = s.current, h = v.getContext("2d");
    function E() {
      var D = v.parentElement;
      v.width = D.clientWidth, v.height = D.clientHeight, r.current.forEach(function(A) {
        A.x = v.width / 2, A.y = v.height / 2;
      });
    }
    var C = new ResizeObserver(E);
    C.observe(v.parentElement), E();
    var z = requestAnimationFrame(function D(A) {
      z = requestAnimationFrame(D), h.fillStyle = o.current, h.fillRect(0, 0, v.width, v.height), r.current.forEach(function(b) {
        jS(h, b, A);
      });
    });
    return function() {
      cancelAnimationFrame(z), C.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: s, className: AS.canvas });
}
const zS = "_sidebar_1jfxv_1", CS = "_controlGroup_1jfxv_19", DS = "_spiralList_1jfxv_53", OS = "_spiralItem_1jfxv_67", MS = "_spiralItemActive_1jfxv_69", RS = "_actions_1jfxv_97", US = "_controlRow_1jfxv_107", HS = "_valueDisplay_1jfxv_141", qS = "_sendAsTask_1jfxv_153", ft = {
  sidebar: zS,
  controlGroup: CS,
  spiralList: DS,
  spiralItem: OS,
  spiralItemActive: MS,
  actions: RS,
  controlRow: US,
  valueDisplay: HS,
  sendAsTask: qS
};
var LS = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function BS({
  textControls: s,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: h,
  onSelect: E,
  onClearAll: C,
  onPropertyChange: z,
  backgroundColor: D,
  onBackgroundChange: A,
  onSave: b,
  onLoadFile: T,
  onOpenTaskModal: R,
  savedSpiralName: Y,
  onSaveToLibrary: $
}) {
  var V = w.useRef(null), [k, I] = w.useState(Y || "");
  return /* @__PURE__ */ i.jsxs("div", { className: ft.sidebar, children: [
    s,
    /* @__PURE__ */ i.jsxs("div", { className: ft.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ i.jsx("div", { className: ft.spiralList, children: r.map(function(ee, ge) {
        return /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: ge === d ? ft.spiralItemActive : ft.spiralItem,
            children: [
              /* @__PURE__ */ i.jsxs("span", { children: [
                "Spiral ",
                ge + 1
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: ft.actions, children: [
                /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
                  E(ge);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
                  h(ge);
                }, children: "Delete" })
              ] })
            ]
          },
          ee.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: ft.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      LS.map(function(ee) {
        return /* @__PURE__ */ i.jsxs("div", { className: ft.controlRow, children: [
          /* @__PURE__ */ i.jsxs("label", { children: [
            ee.label,
            ":"
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: ee.min,
              max: ee.max,
              step: ee.step,
              value: o[ee.key],
              onChange: function(ge) {
                z(ee.key, Number(ge.target.value));
              }
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: ft.valueDisplay, children: [
            ee.key === "speed" || ee.key === "opacity" || ee.key === "timeOffset" ? Number(o[ee.key]).toFixed(1) : o[ee.key],
            ee.suffix || ""
          ] })
        ] }, ee.key);
      }),
      /* @__PURE__ */ i.jsxs("div", { className: ft.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Color:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: o.color,
            onChange: function(ee) {
              z("color", ee.target.value);
            }
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: ft.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Configuration" }),
      /* @__PURE__ */ i.jsxs("div", { className: ft.controlRow, children: [
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: b, children: "Save Config" }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          V.current.click();
        }, children: "Load Config" })
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          ref: V,
          style: { display: "none" },
          onChange: function(ee) {
            ee.target.files[0] && T(ee.target.files[0]), ee.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: ft.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Save to Library" }),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Name",
          value: k,
          onChange: function(ee) {
            I(ee.target.value);
          },
          placeholder: "e.g. Calming blue swirl"
        }
      ),
      /* @__PURE__ */ i.jsx(
        L,
        {
          variant: "secondary",
          disabled: !k.trim(),
          onClick: function() {
            $(k.trim());
          },
          children: Y ? "Update Saved Spiral" : "Save to Library"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: ft.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Global Settings" }),
      /* @__PURE__ */ i.jsxs("div", { className: ft.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Background:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: D,
            onChange: function(ee) {
              A(ee.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: C, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(L, { onClick: R, className: ft.sendAsTask, children: "Send as Task" })
  ] });
}
var YS = [
  "Welcome to the Spiral Generator",
  "DELAY:2000",
  "Watch the patterns dance",
  "DELAY:1500",
  "Customize every parameter",
  "DELAY:2000",
  "Create your own visual symphony",
  "DELAY:3000",
  "The possibilities are infinite"
].join(`
`);
function GS(s) {
  var r = s.split(`
`).filter(function(d) {
    return d.trim();
  });
  return r.map(function(d) {
    if (d = d.trim(), d.indexOf("DELAY:") === 0) {
      var o = parseInt(d.substring(6));
      return isNaN(o) ? null : { type: "delay", value: o };
    }
    return { type: "text", value: d };
  }).filter(Boolean);
}
function XS() {
  var [s, r] = w.useState(YS), [d, o] = w.useState(2e3), [v, h] = w.useState(3e3), [E, C] = w.useState(0.5), [z, D] = w.useState(2.5), [A, b] = w.useState("#ffffff"), [T, R] = w.useState(!1), [Y, $] = w.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), V = w.useRef(null), k = w.useRef(0), I = w.useRef([]), ee = w.useRef(!1), ge = w.useRef(v), Ie = w.useRef(E);
  w.useEffect(function() {
    ge.current = v;
  }, [v]), w.useEffect(function() {
    Ie.current = E;
  }, [E]);
  function Le(ze) {
    $({ text: ze, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        $({ text: ze, shown: !0, instant: !1 });
      });
    });
  }
  function le() {
    $(function(ze) {
      return { text: ze.text, shown: !1, instant: !1 };
    });
  }
  function Z() {
    if (!ee.current) {
      le();
      return;
    }
    k.current >= I.current.length && (k.current = 0);
    var ze = I.current[k.current];
    if (ze)
      if (ze.type === "text") {
        setTimeout(function() {
          Le(ze.value);
        }, 50), k.current++;
        var Je = Ie.current * 1e3, xt = Je + ge.current + Je + 50;
        V.current = setTimeout(Z, xt);
      } else
        le(), k.current++, V.current = setTimeout(Z, ze.value);
  }
  function Ze() {
    V.current && clearTimeout(V.current), I.current = GS(s), k.current = 0, ee.current = !0, R(!0), Z();
  }
  function Pe() {
    ee.current = !1, R(!1), V.current && clearTimeout(V.current), $({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return w.useEffect(function() {
    return function() {
      ee.current = !1, V.current && clearTimeout(V.current);
    };
  }, []), {
    display: Y,
    script: s,
    setScript: r,
    interval: d,
    setInterval: o,
    holdDuration: v,
    setHoldDuration: h,
    animSpeed: E,
    setAnimSpeed: C,
    fontSize: z,
    setFontSize: D,
    color: A,
    setColor: b,
    isRunning: T,
    startLoop: Ze,
    stopLoop: Pe
  };
}
const QS = "_overlay_qasw4_1", ZS = {
  overlay: QS
};
function VS({ display: s, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: ZS.overlay,
      style: {
        opacity: s.shown ? 1 : 0,
        transform: "translate(-50%, -50%) scale(" + (s.shown ? 1 : s.instant ? 0 : 2) + ")",
        transition: s.instant ? "none" : "opacity " + r + "s ease-out, transform " + r + "s ease-out",
        fontSize: d + "rem",
        color: o
      },
      children: s.text
    }
  );
}
const KS = "_controlGroup_9ywy2_1", JS = "_script_9ywy2_23", $S = "_controlRow_9ywy2_47", kS = "_valueDisplay_9ywy2_83", FS = "_buttonRow_9ywy2_97", Qt = {
  controlGroup: KS,
  script: JS,
  controlRow: $S,
  valueDisplay: kS,
  buttonRow: FS
};
function WS(s) {
  return /* @__PURE__ */ i.jsxs("div", { className: Qt.controlGroup, children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ i.jsx(
      "textarea",
      {
        className: Qt.script,
        value: s.script,
        onChange: function(r) {
          s.setScript(r.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Display Time:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "500",
          max: "5000",
          value: s.interval,
          onChange: function(r) {
            s.setInterval(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Qt.valueDisplay, children: [
        s.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Hold Duration:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "1000",
          max: "8000",
          value: s.holdDuration,
          onChange: function(r) {
            s.setHoldDuration(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Qt.valueDisplay, children: [
        s.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Animation Speed:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "0.1",
          max: "2",
          step: "0.1",
          value: s.animSpeed,
          onChange: function(r) {
            s.setAnimSpeed(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Qt.valueDisplay, children: [
        s.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Text Size:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "1",
          max: "6",
          step: "0.1",
          value: s.fontSize,
          onChange: function(r) {
            s.setFontSize(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Qt.valueDisplay, children: [
        s.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Text Color:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "color",
          value: s.color,
          onChange: function(r) {
            s.setColor(r.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Qt.buttonRow, children: [
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: s.startLoop, disabled: s.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: s.stopLoop, disabled: !s.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const IS = "_row_cg4zb_1", PS = "_checkboxRow_cg4zb_23", eb = "_selectLabel_cg4zb_37", tb = "_select_cg4zb_37", ab = "_actions_cg4zb_71", Ul = {
  row: IS,
  checkboxRow: PS,
  selectLabel: eb,
  select: tb,
  actions: ab
};
function lb({ onClose: s, onSent: r }) {
  var [d, o] = w.useState("Experience the Spiral Animation"), [v, h] = w.useState(10), [E, C] = w.useState(5), [z, D] = w.useState(""), [A, b] = w.useState(!1), [T, R] = w.useState("daily"), [Y, $] = w.useState(!1);
  async function V() {
    var k = d.trim();
    if (!k) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (z) {
      var I = new Date(z);
      if (isNaN(I.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (I < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    $(!0);
    try {
      var ee = {
        text: k,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        assignedTo: window.getSlaves()[0] || window.currentUser,
        points: Number(v) || 10,
        penaltyPoints: Number(E) || 5,
        dueDate: z || null,
        isRepeating: A,
        repeatInterval: A ? T : null,
        completedAt: null,
        completedBy: null,
        approvedAt: null,
        approvedBy: null,
        isOverdue: !1,
        appealStatus: null,
        appealedAt: null,
        appealReviewedAt: null,
        appealReviewedBy: null,
        acceptedAt: null,
        appealText: null,
        rejectedAt: null,
        rejectedBy: null
      }, { error: ge } = await window.supabase.from("tasks").insert([ee]);
      if (ge) {
        console.error("Error creating spiral task:", ge), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + k + '" created successfully!',
        "success"
      ), r();
    } finally {
      $(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(bh, { title: "🌀 Create Spiral Task", onClose: s, children: [
    /* @__PURE__ */ i.jsx(
      ce,
      {
        label: "Task Description",
        value: d,
        onChange: function(k) {
          o(k.target.value);
        },
        maxLength: 200
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Ul.row, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: v,
          onChange: function(k) {
            h(k.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Penalty Points",
          type: "number",
          min: "0",
          max: "50",
          value: E,
          onChange: function(k) {
            C(k.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Ul.row, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: z,
          onChange: function(k) {
            D(k.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Ul.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: A,
            onChange: function(k) {
              b(k.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    A ? /* @__PURE__ */ i.jsx("div", { className: Ul.row, children: /* @__PURE__ */ i.jsxs("label", { className: Ul.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ul.select,
          value: T,
          onChange: function(k) {
            R(k.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
            /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
          ]
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Ul.actions, children: [
      /* @__PURE__ */ i.jsx(L, { loading: Y, onClick: V, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: s, children: "Cancel" })
    ] })
  ] });
}
const nb = "_overlay_1ka14_1", ub = "_closeBtn_1ka14_19", ib = "_viewer_1ka14_51", cb = "_canvasArea_1ka14_63", wc = {
  overlay: nb,
  closeBtn: ub,
  viewer: ib,
  canvasArea: cb
};
function Xu(s) {
  return s ? Object.assign({}, s) : null;
}
function sb({ onClose: s, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = w.useRef(null), h = w.useRef([]), E = w.useRef(1), [, C] = w.useState(0), [z, D] = w.useState(0), [A, b] = w.useState(null), [T, R] = w.useState("#000000"), [Y, $] = w.useState(!1), [V, k] = w.useState(o || null), [I, ee] = w.useState(d || ""), ge = XS(), Ie = Eh();
  function Le() {
    var H = v.current;
    return H ? { width: H.width, height: H.height } : { width: 0, height: 0 };
  }
  function le() {
    var H = Le(), G = xS(E.current++, H.width, H.height);
    h.current = h.current.concat(G), D(h.current.length - 1), b(Xu(G)), C(function(ie) {
      return ie + 1;
    });
  }
  function Z(H) {
    h.current = h.current.filter(function(ie, ve) {
      return ve !== H;
    });
    var G = Math.max(0, H - 1);
    D(G), b(Xu(h.current[G])), C(function(ie) {
      return ie + 1;
    });
  }
  function Ze(H) {
    D(H), b(Xu(h.current[H]));
  }
  function Pe() {
    h.current = [], D(0), b(null), C(function(H) {
      return H + 1;
    });
  }
  function ze(H, G) {
    var ie = h.current[z];
    ie && (ie[H] = G, b(Xu(ie)));
  }
  function Je() {
    TS({
      spirals: h.current.map(function(H) {
        return Object.assign({}, H);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: T,
        selectedSpiralIndex: z
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function xt(H) {
    var G = Le(), ie = (H.spirals || []).map(function(st) {
      return E.current = Math.max(E.current, (st.id || 0) + 1), Object.assign(
        { x: G.width / 2, y: G.height / 2 },
        Ah,
        st
      );
    });
    h.current = ie;
    var ve = H.globalSettings && H.globalSettings.selectedSpiralIndex || 0;
    D(ve), b(Xu(ie[ve] || ie[0])), H.globalSettings && H.globalSettings.backgroundColor && R(H.globalSettings.backgroundColor), C(function(st) {
      return st + 1;
    });
  }
  function va(H) {
    NS(
      H,
      function(G) {
        xt(G), k(null), ee(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(G) {
        window.showNotification(G, "error");
      }
    );
  }
  function Be(H) {
    Ie.saveSpiral({
      id: V,
      name: H,
      config: {
        spirals: h.current.map(function(G) {
          return Object.assign({}, G);
        }),
        textSettings: {},
        globalSettings: {
          backgroundColor: T,
          selectedSpiralIndex: z
        }
      }
    }).then(function(G) {
      G && k(G), ee(H);
    });
  }
  w.useEffect(function() {
    r ? xt(r) : h.current.length === 0 && le();
    function H(G) {
      G.key === "Escape" && s();
    }
    return document.addEventListener("keydown", H), function() {
      document.removeEventListener("keydown", H);
    };
  }, []);
  var B = h.current.map(function(H) {
    return { id: H.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: wc.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: wc.closeBtn, onClick: s, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: wc.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: wc.canvasArea, children: [
        /* @__PURE__ */ i.jsx(wS, { canvasRef: v, spiralsRef: h, backgroundColor: T }),
        /* @__PURE__ */ i.jsx(
          VS,
          {
            display: ge.display,
            animSpeed: ge.animSpeed,
            fontSize: ge.fontSize,
            color: ge.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        BS,
        {
          textControls: /* @__PURE__ */ i.jsx(WS, { ...ge }),
          spirals: B,
          activeIndex: z,
          activeSnapshot: A,
          onAdd: le,
          onDelete: Z,
          onSelect: Ze,
          onClearAll: Pe,
          onPropertyChange: ze,
          backgroundColor: T,
          onBackgroundChange: R,
          onSave: Je,
          onLoadFile: va,
          onOpenTaskModal: function() {
            $(!0);
          },
          savedSpiralName: I,
          onSaveToLibrary: Be
        }
      )
    ] }),
    Y ? /* @__PURE__ */ i.jsx(
      lb,
      {
        onClose: function() {
          $(!1);
        },
        onSent: function() {
          $(!1), s();
        }
      }
    ) : null
  ] });
}
const rb = "_heading_1l9fq_1", fb = "_row_1l9fq_6", ob = "_meta_1l9fq_23", db = "_actions_1l9fq_28", vb = "_renameRow_1l9fq_34", Qu = {
  heading: rb,
  row: fb,
  meta: ob,
  actions: db,
  renameRow: vb
};
function mb({ savedSpirals: s, status: r, error: d, onReload: o, onLoad: v, onRename: h, onDelete: E }) {
  var [C, z] = w.useState(null), [D, A] = w.useState("");
  function b(R) {
    z(R.id), A(R.name);
  }
  function T(R) {
    var Y = D.trim();
    Y && h(R, Y), z(null);
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Qu.heading, children: "Saved Spirals" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading saved spirals..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load saved spirals: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No saved spirals yet", hint: "Save one from inside the generator." }) : null,
    r === "ready" ? s.map(function(R) {
      return /* @__PURE__ */ i.jsx("div", { className: Qu.row, children: C === R.id ? /* @__PURE__ */ i.jsxs("div", { className: Qu.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            value: D,
            onChange: function(Y) {
              A(Y.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          T(R);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          z(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: R.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Qu.meta, children: [
            "Updated ",
            new Date(R.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Qu.actions, children: [
          /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
            v(R);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
            b(R);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
            E(R.id);
          }, children: "Delete" })
        ] })
      ] }) }, R.id);
    }) : null
  ] });
}
function hb(s, r) {
  return new Date(r.started_at) - new Date(s.started_at);
}
function wh() {
  var s = xe(), r = It({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: hb
  }), d = r.items.filter(function(v) {
    return v.status === "running";
  }), o = r.items.filter(function(v) {
    return v.status === "stopped";
  }).sort(function(v, h) {
    return new Date(h.updated_at) - new Date(v.updated_at);
  }).slice(0, 20);
  return {
    trackers: d,
    stoppedTrackers: o,
    status: r.status,
    error: r.error,
    reload: r.reload,
    startTracker: function(v, h, E, C, z) {
      return window.startLiveCostTracker(
        v,
        h,
        E,
        C,
        z
      );
    },
    stopTracker: function(v, h) {
      return window.stopLiveCostTracker(v, h !== !1);
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v);
    },
    addPenalty: function(v, h, E) {
      return window.addPenaltyToLiveTracker(v, h, E);
    },
    removePenalty: function(v, h) {
      return window.removePenaltyFromLiveTracker(v, h);
    }
  };
}
function gb(s, r) {
  return s.name.localeCompare(r.name);
}
function yb() {
  var s = xe(), r = It({
    table: "saved_cost_tracker_presets",
    masterUsername: s.activeMasterContext,
    sort: gb
  }), d = w.useCallback(
    async function(v) {
      var h = await window.saveCostTrackerPreset(v);
      return r.reload(), h;
    },
    [r]
  ), o = w.useCallback(
    async function(v) {
      await window.deleteCostTrackerPreset(v), r.reload();
    },
    [r]
  );
  return {
    presets: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    savePreset: d,
    deletePreset: o
  };
}
const _b = "_heading_1oe9c_1", pb = "_row_1oe9c_11", Sb = "_selectGroup_1oe9c_31", bb = "_selectLabel_1oe9c_45", xb = "_select_1oe9c_31", jb = "_penaltyForm_1oe9c_75", Tb = "_penaltyList_1oe9c_99", Nb = "_removePenalty_1oe9c_115", Zt = {
  heading: _b,
  row: pb,
  selectGroup: Sb,
  selectLabel: bb,
  select: xb,
  penaltyForm: jb,
  penaltyList: Tb,
  removePenalty: Nb
};
function Eb({ onStart: s, onSavePreset: r, presetToApply: d }) {
  var [o, v] = w.useState("Cost Tracker Running"), [h, E] = w.useState(50), [C, z] = w.useState("€"), [D, A] = w.useState(6e4), [b, T] = w.useState(!1), [R, Y] = w.useState([]), [$, V] = w.useState(""), [k, I] = w.useState(""), [ee, ge] = w.useState("");
  if (w.useEffect(
    function() {
      d && (v(d.description || "Cost Tracker Running"), E(d.rate), z(d.currency), A(d.increment_interval));
    },
    [d]
  ), !window.hasPermission("create_task")) return null;
  function Ie() {
    Y(function(Z) {
      return Z.concat({
        description: $.trim(),
        amount: Number(k)
      });
    }), V(""), I("");
  }
  function Le(Z) {
    Y(function(Ze) {
      return Ze.filter(function(Pe, ze) {
        return ze !== Z;
      });
    });
  }
  async function le(Z) {
    Z.preventDefault(), T(!0);
    try {
      ee.trim() && r && await r({
        id: d ? d.id : void 0,
        name: ee.trim(),
        description: o,
        rate: Number(h) || 0,
        currency: C,
        incrementInterval: Number(D)
      }), await s(o, Number(h) || 0, C, Number(D), R), Y([]), ge("");
    } finally {
      T(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Zt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: Zt.form, onSubmit: le, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Description",
          value: o,
          onChange: function(Z) {
            v(Z.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: Zt.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: h,
            onChange: function(Z) {
              E(Z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: Zt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: Zt.selectLabel, children: "Currency" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: Zt.select,
              value: C,
              onChange: function(Z) {
                z(Z.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "€", children: "Euro (€)" }),
                /* @__PURE__ */ i.jsx("option", { value: "£", children: "Pound (£)" }),
                /* @__PURE__ */ i.jsx("option", { value: "$", children: "Dollar ($)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Zt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: Zt.selectLabel, children: "Per" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: Zt.select,
              value: D,
              onChange: function(Z) {
                A(Z.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: 1e3, children: "Second" }),
                /* @__PURE__ */ i.jsx("option", { value: 6e4, children: "Minute" }),
                /* @__PURE__ */ i.jsx("option", { value: 36e5, children: "Hour" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Zt.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Penalty description",
            value: $,
            onChange: function(Z) {
              V(Z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: k,
            onChange: function(Z) {
              I(Z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          L,
          {
            type: "button",
            variant: "secondary",
            disabled: !$.trim() || !k,
            onClick: Ie,
            children: "Add penalty"
          }
        )
      ] }),
      R.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: Zt.penaltyList, children: R.map(function(Z, Ze) {
        return /* @__PURE__ */ i.jsxs("li", { children: [
          Z.description,
          ": ",
          C,
          Z.amount.toFixed(2),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: Zt.removePenalty,
              onClick: function() {
                Le(Ze);
              },
              "aria-label": "Remove staged penalty " + Z.description,
              children: "×"
            }
          )
        ] }, Ze);
      }) }) : null,
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Save as preset (optional)",
          placeholder: "Name this config to reuse it later",
          value: ee,
          onChange: function(Z) {
            ge(Z.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(L, { type: "submit", loading: b, children: "Start tracker" })
    ] })
  ] });
}
const Ab = "_heading_joyyu_1", wb = "_row_joyyu_6", zb = "_meta_joyyu_23", Cb = "_actions_joyyu_28", zc = {
  heading: Ab,
  row: wb,
  meta: zb,
  actions: Cb
};
function Db({ presets: s, status: r, error: d, onReload: o, onUse: v, onDelete: h }) {
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: zc.heading, children: "Saved Presets" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Vt, { label: "Loading presets..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      Pt,
      {
        message: "Couldn't load presets: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No saved presets yet", hint: "Save one while starting a tracker below." }) : null,
    r === "ready" ? s.map(function(E) {
      return /* @__PURE__ */ i.jsxs("div", { className: zc.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: E.name }),
          /* @__PURE__ */ i.jsxs("div", { className: zc.meta, children: [
            E.currency,
            Number(E.rate).toFixed(2),
            " per",
            " ",
            E.increment_interval === 1e3 ? "second" : E.increment_interval === 36e5 ? "hour" : "minute",
            E.description ? " · " + E.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: zc.actions, children: [
          /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
            v(E);
          }, children: "Use" }),
          /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
            h(E.id);
          }, children: "Delete" })
        ] })
      ] }, E.id);
    }) : null
  ] });
}
const Ob = "_card_b5s19_1", Mb = "_description_b5s19_9", Rb = "_meta_b5s19_19", Ub = "_readout_b5s19_31", Hb = "_amount_b5s19_47", qb = "_penaltyList_b5s19_55", Lb = "_removePenalty_b5s19_71", Bb = "_penaltyForm_b5s19_87", Yb = "_stopActions_b5s19_103", Ma = {
  card: Ob,
  description: Mb,
  meta: Rb,
  readout: Ub,
  amount: Hb,
  penaltyList: qb,
  removePenalty: Lb,
  penaltyForm: Bb,
  stopActions: Yb
};
function Gb(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function Xb(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, h = d / o * v, E = [];
  try {
    E = JSON.parse(s.penalties || "[]");
  } catch {
    E = [];
  }
  var C = E.reduce(function(T, R) {
    return T + (parseFloat(R.amount) || 0);
  }, 0), z = Math.floor(d / 36e5), D = Math.floor(d % 36e5 / 6e4), A = Math.floor(d % 6e4 / 1e3), b = String(z).padStart(2, "0") + ":" + String(D).padStart(2, "0") + ":" + String(A).padStart(2, "0");
  return {
    timeText: b,
    penalties: E,
    penaltyTotal: C,
    grandTotal: h + C
  };
}
function zh({ tracker: s, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: h }) {
  var [E, C] = w.useState(Date.now()), [z, D] = w.useState(""), [A, b] = w.useState("");
  w.useEffect(function() {
    var Y = window.setInterval(function() {
      C(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(Y);
    };
  }, []);
  var T = Xb(s, E), R = window.users[s.created_by];
  return /* @__PURE__ */ i.jsxs(pe, { className: Ma.card, children: [
    /* @__PURE__ */ i.jsx("p", { className: Ma.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("p", { className: Ma.meta, children: [
      "by ",
      R ? R.displayName : s.created_by,
      " · ",
      s.currency,
      parseFloat(s.rate).toFixed(2),
      " per ",
      Gb(parseInt(s.increment_interval))
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Ma.readout, children: [
      /* @__PURE__ */ i.jsx("span", { children: T.timeText }),
      /* @__PURE__ */ i.jsxs("span", { className: Ma.amount, children: [
        s.currency,
        T.grandTotal.toFixed(2)
      ] })
    ] }),
    T.penalties.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: Ma.penaltyList, children: T.penalties.map(function(Y) {
      return /* @__PURE__ */ i.jsxs("li", { children: [
        Y.description,
        ": ",
        s.currency,
        parseFloat(Y.amount).toFixed(2),
        r ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: Ma.removePenalty,
            onClick: function() {
              h(s.id, Y.id);
            },
            "aria-label": "Remove penalty " + Y.description,
            children: "×"
          }
        ) : null
      ] }, Y.id);
    }) }) : null,
    r ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: Ma.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: z,
            onChange: function(Y) {
              D(Y.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: A,
            onChange: function(Y) {
              b(Y.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          L,
          {
            variant: "secondary",
            disabled: !z.trim() || !A,
            onClick: function() {
              v(s.id, z, Number(A)), D(""), b("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Ma.stopActions, children: [
        /* @__PURE__ */ i.jsx(L, { variant: "danger", onClick: function() {
          d(s.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          d(s.id, !1);
        }, children: "Stop (no invoice)" }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          o(s.id);
        }, children: "Delete" })
      ] })
    ] }) : null
  ] });
}
const Qb = "_heading_eejx6_1", Zb = "_row_eejx6_6", Vb = "_meta_eejx6_23", Tf = {
  heading: Qb,
  row: Zb,
  meta: Vb
};
function Kb(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function Jb({ trackers: s, onDelete: r }) {
  return /* @__PURE__ */ i.jsxs(pe, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Tf.heading, children: "Recently Stopped" }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No stopped trackers yet" }) : s.map(function(d) {
      return /* @__PURE__ */ i.jsxs("div", { className: Tf.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: d.description }),
          /* @__PURE__ */ i.jsxs("div", { className: Tf.meta, children: [
            d.currency,
            Number(d.rate).toFixed(2),
            " per ",
            Kb(Number(d.increment_interval)),
            " · stopped " + new Date(d.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsx(L, { variant: "secondary", onClick: function() {
          r(d.id);
        }, children: "Delete" })
      ] }, d.id);
    })
  ] });
}
const $b = "_heading_lmzbq_1", kb = {
  heading: $b
};
function Fb() {
  var s = wh(), r = yb(), [d, o] = w.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      Eb,
      {
        onStart: s.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      Db,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: kb.heading, children: "Active Cost Trackers" }),
    s.trackers.length === 0 ? /* @__PURE__ */ i.jsx(Ke, { title: "No active cost trackers" }) : s.trackers.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        zh,
        {
          tracker: v,
          isAdmin: !0,
          onStop: s.stopTracker,
          onDelete: s.deleteTracker,
          onAddPenalty: s.addPenalty,
          onRemovePenalty: s.removePenalty
        },
        v.id
      );
    }),
    /* @__PURE__ */ i.jsx(
      Jb,
      {
        trackers: s.stoppedTrackers,
        onDelete: s.deleteTracker
      }
    )
  ] });
}
const Wb = "_section_1e3lw_1", Ib = "_sectionHeader_1e3lw_5", Pb = "_heading_1e3lw_14", Zu = {
  section: Wb,
  sectionHeader: Ib,
  heading: Pb
};
function ex() {
  var s = Eh(), [r, d] = w.useState(!1), [o, v] = w.useState(null), [h, E] = w.useState(null), [C, z] = w.useState("");
  function D() {
    v(null), E(null), z(""), d(!0);
  }
  function A(R) {
    v(R.config), E(R.id), z(R.name), d(!0);
  }
  function b() {
    d(!1), s.reload();
  }
  function T(R, Y) {
    s.saveSpiral({ id: R.id, name: Y, config: R.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(pe, { className: Zu.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Zu.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(L, { onClick: D, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        mb,
        {
          savedSpirals: s.savedSpirals,
          status: s.status,
          error: s.error,
          onReload: s.reload,
          onLoad: A,
          onRename: T,
          onDelete: s.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(pe, { className: Zu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Fb, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      sb,
      {
        onClose: b,
        initialConfig: o,
        initialSavedId: h,
        initialName: C
      }
    ) : null
  ] });
}
const tx = "_banner_7xh6r_1", ax = {
  banner: tx
};
function lx() {
  var s = xe(), r = wh();
  return !s.isSlave || r.trackers.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: ax.banner, children: /* @__PURE__ */ i.jsx(zh, { tracker: r.trackers[0], isAdmin: !1 }) });
}
const nx = "_banner_znl1a_1", ux = {
  banner: nx
};
function ix() {
  var s = xe(), r = Nh();
  return !s.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: ux.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
function cx({ activeTab: s }) {
  var r = xe();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(Q1, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(F1, {});
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(T_, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx(ex, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(U_, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(pp, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(SS, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Gp, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(iS, {}) : null;
    default:
      return null;
  }
}
function sx() {
  var s = xe(), [r, d] = w.useState("tasks"), o = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", style: o, children: [
    /* @__PURE__ */ i.jsx(u1, {}),
    /* @__PURE__ */ i.jsx(r1, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsxs("main", { className: "betaContainer", children: [
      /* @__PURE__ */ i.jsx(ix, {}),
      /* @__PURE__ */ i.jsx(cx, { activeTab: r })
    ] }),
    /* @__PURE__ */ i.jsx(lx, {})
  ] });
}
function rx() {
  return /* @__PURE__ */ i.jsx(H0, { children: /* @__PURE__ */ i.jsx(sx, {}) });
}
var qn = null;
function fx(s) {
  qn || (qn = U0.createRoot(s), qn.render(/* @__PURE__ */ i.jsx(rx, {})));
}
function ox() {
  qn && (qn.unmount(), qn = null);
}
export {
  fx as mountBetaApp,
  ox as unmountBetaApp
};
