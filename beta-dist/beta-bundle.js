var rf = { exports: {} }, Mu = {};
var km;
function b0() {
  if (km) return Mu;
  km = 1;
  var s = Symbol.for("react.transitional.element"), f = Symbol.for("react.fragment");
  function d(o, m, y) {
    var E = null;
    if (y !== void 0 && (E = "" + y), m.key !== void 0 && (E = "" + m.key), "key" in m) {
      y = {};
      for (var D in m)
        D !== "key" && (y[D] = m[D]);
    } else y = m;
    return m = y.ref, {
      $$typeof: s,
      type: o,
      key: E,
      ref: m !== void 0 ? m : null,
      props: y
    };
  }
  return Mu.Fragment = f, Mu.jsx = d, Mu.jsxs = d, Mu;
}
var Fm;
function x0() {
  return Fm || (Fm = 1, rf.exports = b0()), rf.exports;
}
var c = x0(), ff = { exports: {} }, Ru = {}, of = { exports: {} }, df = {};
var Wm;
function T0() {
  return Wm || (Wm = 1, function(s) {
    function f(B, I) {
      var ee = B.length;
      B.push(I);
      e: for (; 0 < ee; ) {
        var Ee = ee - 1 >>> 1, pe = B[Ee];
        if (0 < m(pe, I))
          B[Ee] = I, B[ee] = pe, ee = Ee;
        else break e;
      }
    }
    function d(B) {
      return B.length === 0 ? null : B[0];
    }
    function o(B) {
      if (B.length === 0) return null;
      var I = B[0], ee = B.pop();
      if (ee !== I) {
        B[0] = ee;
        e: for (var Ee = 0, pe = B.length, Qt = pe >>> 1; Ee < Qt; ) {
          var dl = 2 * (Ee + 1) - 1, fa = B[dl], g = dl + 1, R = B[g];
          if (0 > m(fa, ee))
            g < pe && 0 > m(R, fa) ? (B[Ee] = R, B[g] = ee, Ee = g) : (B[Ee] = fa, B[dl] = ee, Ee = dl);
          else if (g < pe && 0 > m(R, ee))
            B[Ee] = R, B[g] = ee, Ee = g;
          else break e;
        }
      }
      return I;
    }
    function m(B, I) {
      var ee = B.sortIndex - I.sortIndex;
      return ee !== 0 ? ee : B.id - I.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      s.unstable_now = function() {
        return y.now();
      };
    } else {
      var E = Date, D = E.now();
      s.unstable_now = function() {
        return E.now() - D;
      };
    }
    var z = [], M = [], N = 1, S = null, A = 3, U = !1, L = !1, H = !1, X = !1, W = typeof setTimeout == "function" ? setTimeout : null, P = typeof clearTimeout == "function" ? clearTimeout : null, Ke = typeof setImmediate < "u" ? setImmediate : null;
    function ue(B) {
      for (var I = d(M); I !== null; ) {
        if (I.callback === null) o(M);
        else if (I.startTime <= B)
          o(M), I.sortIndex = I.expirationTime, f(z, I);
        else break;
        I = d(M);
      }
    }
    function Be(B) {
      if (H = !1, ue(B), !L)
        if (d(z) !== null)
          L = !0, Je || (Je = !0, qe());
        else {
          var I = d(M);
          I !== null && $e(Be, I.startTime - B);
        }
    }
    var Je = !1, Y = -1, k = 5, Oe = -1;
    function Ye() {
      return X ? !0 : !(s.unstable_now() - Oe < k);
    }
    function De() {
      if (X = !1, Je) {
        var B = s.unstable_now();
        Oe = B;
        var I = !0;
        try {
          e: {
            L = !1, H && (H = !1, P(Y), Y = -1), U = !0;
            var ee = A;
            try {
              t: {
                for (ue(B), S = d(z); S !== null && !(S.expirationTime > B && Ye()); ) {
                  var Ee = S.callback;
                  if (typeof Ee == "function") {
                    S.callback = null, A = S.priorityLevel;
                    var pe = Ee(
                      S.expirationTime <= B
                    );
                    if (B = s.unstable_now(), typeof pe == "function") {
                      S.callback = pe, ue(B), I = !0;
                      break t;
                    }
                    S === d(z) && o(z), ue(B);
                  } else o(z);
                  S = d(z);
                }
                if (S !== null) I = !0;
                else {
                  var Qt = d(M);
                  Qt !== null && $e(
                    Be,
                    Qt.startTime - B
                  ), I = !1;
                }
              }
              break e;
            } finally {
              S = null, A = ee, U = !1;
            }
            I = void 0;
          }
        } finally {
          I ? qe() : Je = !1;
        }
      }
    }
    var qe;
    if (typeof Ke == "function")
      qe = function() {
        Ke(De);
      };
    else if (typeof MessageChannel < "u") {
      var Ft = new MessageChannel(), ra = Ft.port2;
      Ft.port1.onmessage = De, qe = function() {
        ra.postMessage(null);
      };
    } else
      qe = function() {
        W(De, 0);
      };
    function $e(B, I) {
      Y = W(function() {
        B(s.unstable_now());
      }, I);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, s.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : k = 0 < B ? Math.floor(1e3 / B) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, s.unstable_next = function(B) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = A;
      }
      var ee = A;
      A = I;
      try {
        return B();
      } finally {
        A = ee;
      }
    }, s.unstable_requestPaint = function() {
      X = !0;
    }, s.unstable_runWithPriority = function(B, I) {
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
      var ee = A;
      A = B;
      try {
        return I();
      } finally {
        A = ee;
      }
    }, s.unstable_scheduleCallback = function(B, I, ee) {
      var Ee = s.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? Ee + ee : Ee) : ee = Ee, B) {
        case 1:
          var pe = -1;
          break;
        case 2:
          pe = 250;
          break;
        case 5:
          pe = 1073741823;
          break;
        case 4:
          pe = 1e4;
          break;
        default:
          pe = 5e3;
      }
      return pe = ee + pe, B = {
        id: N++,
        callback: I,
        priorityLevel: B,
        startTime: ee,
        expirationTime: pe,
        sortIndex: -1
      }, ee > Ee ? (B.sortIndex = ee, f(M, B), d(z) === null && B === d(M) && (H ? (P(Y), Y = -1) : H = !0, $e(Be, ee - Ee))) : (B.sortIndex = pe, f(z, B), L || U || (L = !0, Je || (Je = !0, qe()))), B;
    }, s.unstable_shouldYield = Ye, s.unstable_wrapCallback = function(B) {
      var I = A;
      return function() {
        var ee = A;
        A = I;
        try {
          return B.apply(this, arguments);
        } finally {
          A = ee;
        }
      };
    };
  }(df)), df;
}
var Im;
function j0() {
  return Im || (Im = 1, of.exports = T0()), of.exports;
}
var vf = { exports: {} }, le = {};
var Pm;
function N0() {
  if (Pm) return le;
  Pm = 1;
  var s = Symbol.for("react.transitional.element"), f = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), E = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), M = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), S = Symbol.for("react.activity"), A = Symbol.for("react.view_transition"), U = Symbol.iterator;
  function L(g) {
    return g === null || typeof g != "object" ? null : (g = U && g[U] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var H = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, X = Object.assign, W = {};
  function P(g, R, J) {
    this.props = g, this.context = R, this.refs = W, this.updater = J || H;
  }
  P.prototype.isReactComponent = {}, P.prototype.setState = function(g, R) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, R, "setState");
  }, P.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function Ke() {
  }
  Ke.prototype = P.prototype;
  function ue(g, R, J) {
    this.props = g, this.context = R, this.refs = W, this.updater = J || H;
  }
  var Be = ue.prototype = new Ke();
  Be.constructor = ue, X(Be, P.prototype), Be.isPureReactComponent = !0;
  var Je = Array.isArray;
  function Y() {
  }
  var k = { H: null, A: null, T: null, S: null }, Oe = Object.prototype.hasOwnProperty;
  function Ye(g, R, J) {
    var $ = J.ref;
    return {
      $$typeof: s,
      type: g,
      key: R,
      ref: $ !== void 0 ? $ : null,
      props: J
    };
  }
  function De(g, R) {
    return Ye(g.type, R, g.props);
  }
  function qe(g) {
    return typeof g == "object" && g !== null && g.$$typeof === s;
  }
  function Ft(g) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function(J) {
      return R[J];
    });
  }
  var ra = /\/+/g;
  function $e(g, R) {
    return typeof g == "object" && g !== null && g.key != null ? Ft("" + g.key) : R.toString(36);
  }
  function B(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(Y, Y) : (g.status = "pending", g.then(
          function(R) {
            g.status === "pending" && (g.status = "fulfilled", g.value = R);
          },
          function(R) {
            g.status === "pending" && (g.status = "rejected", g.reason = R);
          }
        )), g.status) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
        }
    }
    throw g;
  }
  function I(g, R, J, $, ve) {
    var me = typeof g;
    (me === "undefined" || me === "boolean") && (g = null);
    var ye = !1;
    if (g === null) ye = !0;
    else
      switch (me) {
        case "bigint":
        case "string":
        case "number":
          ye = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case s:
            case f:
              ye = !0;
              break;
            case N:
              return ye = g._init, I(
                ye(g._payload),
                R,
                J,
                $,
                ve
              );
          }
      }
    if (ye)
      return ve = ve(g), ye = $ === "" ? "." + $e(g, 0) : $, Je(ve) ? (J = "", ye != null && (J = ye.replace(ra, "$&/") + "/"), I(ve, R, J, "", function(vl) {
        return vl;
      })) : ve != null && (qe(ve) && (ve = De(
        ve,
        J + (ve.key == null || g && g.key === ve.key ? "" : ("" + ve.key).replace(
          ra,
          "$&/"
        ) + "/") + ye
      )), R.push(ve)), 1;
    ye = 0;
    var V = $ === "" ? "." : $ + ":";
    if (Je(g))
      for (var te = 0; te < g.length; te++)
        $ = g[te], me = V + $e($, te), ye += I(
          $,
          R,
          J,
          me,
          ve
        );
    else if (te = L(g), typeof te == "function")
      for (g = te.call(g), te = 0; !($ = g.next()).done; )
        $ = $.value, me = V + $e($, te++), ye += I(
          $,
          R,
          J,
          me,
          ve
        );
    else if (me === "object") {
      if (typeof g.then == "function")
        return I(
          B(g),
          R,
          J,
          $,
          ve
        );
      throw R = String(g), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ye;
  }
  function ee(g, R, J) {
    if (g == null) return g;
    var $ = [], ve = 0;
    return I(g, $, "", "", function(me) {
      return R.call(J, me, ve++);
    }), $;
  }
  function Ee(g) {
    if (g._status === -1) {
      var R = g._result, J = R();
      J.then(
        function($) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = $, J.status === void 0 && (J.status = "fulfilled", J.value = $));
        },
        function($) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = $, J.status === void 0 && (J.status = "rejected", J.reason = $));
        }
      ), g._status === -1 && (g._status = 0, g._result = J);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var pe = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  };
  function Qt(g) {
    var R = k.T, J = {};
    J.types = R !== null ? R.types : null, k.T = J;
    try {
      var $ = g(), ve = k.S;
      ve !== null && ve(J, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(Y, pe);
    } catch (me) {
      pe(me);
    } finally {
      R !== null && J.types !== null && (R.types = J.types), k.T = R;
    }
  }
  function dl(g) {
    var R = k.T;
    if (R !== null) {
      var J = R.types;
      J === null ? R.types = [g] : J.indexOf(g) === -1 && J.push(g);
    } else Qt(dl.bind(null, g));
  }
  var fa = {
    map: ee,
    forEach: function(g, R, J) {
      ee(
        g,
        function() {
          R.apply(this, arguments);
        },
        J
      );
    },
    count: function(g) {
      var R = 0;
      return ee(g, function() {
        R++;
      }), R;
    },
    toArray: function(g) {
      return ee(g, function(R) {
        return R;
      }) || [];
    },
    only: function(g) {
      if (!qe(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return le.Activity = S, le.Children = fa, le.Component = P, le.Fragment = d, le.Profiler = m, le.PureComponent = ue, le.StrictMode = o, le.Suspense = z, le.ViewTransition = A, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return k.H.useMemoCache(g);
    }
  }, le.addTransitionType = dl, le.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, le.cacheSignal = function() {
    return null;
  }, le.cloneElement = function(g, R, J) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var $ = X({}, g.props), ve = g.key;
    if (R != null)
      for (me in R.key !== void 0 && (ve = "" + R.key), R)
        !Oe.call(R, me) || me === "key" || me === "__self" || me === "__source" || me === "ref" && R.ref === void 0 || ($[me] = R[me]);
    var me = arguments.length - 2;
    if (me === 1) $.children = J;
    else if (1 < me) {
      for (var ye = Array(me), V = 0; V < me; V++)
        ye[V] = arguments[V + 2];
      $.children = ye;
    }
    return Ye(g.type, ve, $);
  }, le.createContext = function(g) {
    return g = {
      $$typeof: E,
      _currentValue: g,
      _currentValue2: g,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, g.Provider = g, g.Consumer = {
      $$typeof: y,
      _context: g
    }, g;
  }, le.createElement = function(g, R, J) {
    var $, ve = {}, me = null;
    if (R != null)
      for ($ in R.key !== void 0 && (me = "" + R.key), R)
        Oe.call(R, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ve[$] = R[$]);
    var ye = arguments.length - 2;
    if (ye === 1) ve.children = J;
    else if (1 < ye) {
      for (var V = Array(ye), te = 0; te < ye; te++)
        V[te] = arguments[te + 2];
      ve.children = V;
    }
    if (g && g.defaultProps)
      for ($ in ye = g.defaultProps, ye)
        ve[$] === void 0 && (ve[$] = ye[$]);
    return Ye(g, me, ve);
  }, le.createRef = function() {
    return { current: null };
  }, le.forwardRef = function(g) {
    return { $$typeof: D, render: g };
  }, le.isValidElement = qe, le.lazy = function(g) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: g },
      _init: Ee
    };
  }, le.memo = function(g, R) {
    return {
      $$typeof: M,
      type: g,
      compare: R === void 0 ? null : R
    };
  }, le.startTransition = Qt, le.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, le.use = function(g) {
    return k.H.use(g);
  }, le.useActionState = function(g, R, J) {
    return k.H.useActionState(g, R, J);
  }, le.useCallback = function(g, R) {
    return k.H.useCallback(g, R);
  }, le.useContext = function(g) {
    return k.H.useContext(g);
  }, le.useDebugValue = function() {
  }, le.useDeferredValue = function(g, R) {
    return k.H.useDeferredValue(g, R);
  }, le.useEffect = function(g, R) {
    return k.H.useEffect(g, R);
  }, le.useEffectEvent = function(g) {
    return k.H.useEffectEvent(g);
  }, le.useId = function() {
    return k.H.useId();
  }, le.useImperativeHandle = function(g, R, J) {
    return k.H.useImperativeHandle(g, R, J);
  }, le.useInsertionEffect = function(g, R) {
    return k.H.useInsertionEffect(g, R);
  }, le.useLayoutEffect = function(g, R) {
    return k.H.useLayoutEffect(g, R);
  }, le.useMemo = function(g, R) {
    return k.H.useMemo(g, R);
  }, le.useOptimistic = function(g, R) {
    return k.H.useOptimistic(g, R);
  }, le.useReducer = function(g, R, J) {
    return k.H.useReducer(g, R, J);
  }, le.useRef = function(g) {
    return k.H.useRef(g);
  }, le.useState = function(g) {
    return k.H.useState(g);
  }, le.useSyncExternalStore = function(g, R, J) {
    return k.H.useSyncExternalStore(
      g,
      R,
      J
    );
  }, le.useTransition = function() {
    return k.H.useTransition();
  }, le.version = "19.3.1", le;
}
var eh;
function bf() {
  return eh || (eh = 1, vf.exports = N0()), vf.exports;
}
var mf = { exports: {} }, it = {};
var th;
function E0() {
  if (th) return it;
  th = 1;
  var s = bf();
  function f(N) {
    var S = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        S += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + N + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var o = {
    d: {
      f: d,
      r: function() {
        throw Error(f(522));
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
  }, m = Symbol.for("react.portal"), y = Symbol.for("react.recoverable"), E = Symbol.for("react.optimistic_key");
  function D(N, S, A) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: U == null ? null : U === E ? E : "" + U,
      children: N,
      containerInfo: S,
      implementation: A
    };
  }
  var z = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(N, S) {
    if (N === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return it.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, it.browser = function(N) {
    return { $$typeof: y, _reason: N };
  }, it.createPortal = function(N, S) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(f(299));
    return D(N, S, null, A);
  }, it.flushSync = function(N) {
    var S = z.T, A = o.p;
    try {
      if (z.T = null, o.p = 2, N) return N();
    } finally {
      z.T = S, o.p = A, o.d.f();
    }
  }, it.preconnect = function(N, S) {
    typeof N == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, o.d.C(N, S));
  }, it.prefetchDNS = function(N) {
    typeof N == "string" && o.d.D(N);
  }, it.preinit = function(N, S) {
    if (typeof N == "string" && S && typeof S.as == "string") {
      var A = S.as, U = M(A, S.crossOrigin), L = typeof S.integrity == "string" ? S.integrity : void 0, H = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      A === "style" ? o.d.S(
        N,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: U,
          integrity: L,
          fetchPriority: H
        }
      ) : A === "script" && o.d.X(N, {
        crossOrigin: U,
        integrity: L,
        fetchPriority: H,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, it.preinitModule = function(N, S) {
    if (typeof N == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var A = M(
            S.as,
            S.crossOrigin
          );
          o.d.M(N, {
            crossOrigin: A,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
          });
        }
      } else S == null && o.d.M(N);
  }, it.preload = function(N, S) {
    if (typeof N == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var A = S.as, U = M(A, S.crossOrigin);
      o.d.L(N, A, {
        crossOrigin: U,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, it.preloadModule = function(N, S) {
    if (typeof N == "string")
      if (S) {
        var A = M(S.as, S.crossOrigin);
        o.d.m(N, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: A,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0
        });
      } else o.d.m(N);
  }, it.requestFormReset = function(N) {
    o.d.r(N);
  }, it.unstable_batchedUpdates = function(N, S) {
    return N(S);
  }, it.useFormState = function(N, S, A) {
    return z.H.useFormState(N, S, A);
  }, it.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, it.version = "19.3.1", it;
}
var lh;
function A0() {
  if (lh) return mf.exports;
  lh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (f) {
        console.error(f);
      }
  }
  return s(), mf.exports = E0(), mf.exports;
}
var ah;
function z0() {
  if (ah) return Ru;
  ah = 1;
  var s = j0(), f = bf(), d = A0();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function y(e) {
    for (var t = e, l = t; l && !l.alternate; )
      t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
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
  function D(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function z(e) {
    if (y(e) !== e)
      throw Error(o(188));
  }
  function M(e) {
    var t = e.alternate;
    if (!t) {
      if (t = y(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return z(n), e;
          if (u === a) return z(n), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, r = n.child; r; ) {
          if (r === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (r === a) {
            i = !0, a = n, l = u;
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = u.child; r; ) {
            if (r === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (r === a) {
              i = !0, a = u, l = n;
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : t;
  }
  function N(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = N(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function S(e, t, l, a, n, u) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && l(e, a, n, u) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && S(
        e.child,
        t,
        l,
        a,
        n,
        u
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function A(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function U(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function L(e) {
    var t = [null, null], l = A(e);
    return l === null || H(
      t,
      e,
      l.child,
      { foundSelf: !1 }
    ), t;
  }
  function H(e, t, l, a) {
    for (; l !== null; ) {
      if (l === t) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return e[1] = l, !0;
        e[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && H(
        e,
        t,
        l.child,
        a
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function X(e) {
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
  var W = null, P = null;
  function Ke(e, t, l) {
    return e === l ? !0 : e === t ? (W = e, !0) : !1;
  }
  function ue(e, t, l) {
    return e === l ? (P = e, !1) : e === t ? (P !== null && (W = e), !0) : !1;
  }
  function Be(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function Je(e, t, l) {
    for (var a = 0, n = e; n; n = l(n)) a++;
    n = 0;
    for (var u = t; u; u = l(u)) n++;
    for (; 0 < a - n; ) e = l(e), a--;
    for (; 0 < n - a; ) t = l(t), n--;
    for (; a--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = l(e), t = l(t);
    }
    return null;
  }
  var Y = Object.assign, k = Symbol.for("react.element"), Oe = Symbol.for("react.transitional.element"), Ye = Symbol.for("react.portal"), De = Symbol.for("react.fragment"), qe = Symbol.for("react.strict_mode"), Ft = Symbol.for("react.profiler"), ra = Symbol.for("react.consumer"), $e = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), I = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), Ee = Symbol.for("react.memo"), pe = Symbol.for("react.lazy"), Qt = Symbol.for("react.activity"), dl = Symbol.for("react.legacy_hidden"), fa = Symbol.for("react.memo_cache_sentinel"), g = Symbol.for("react.view_transition"), R = Symbol.for("react.recoverable"), J = Symbol.iterator;
  function $(e) {
    return e === null || typeof e != "object" ? null : (e = J && e[J] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ve = Symbol.for("react.client.reference");
  function me(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ve ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case De:
        return "Fragment";
      case Ft:
        return "Profiler";
      case qe:
        return "StrictMode";
      case I:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case Qt:
        return "Activity";
      case g:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ye:
          return "Portal";
        case $e:
          return e.displayName || "Context";
        case ra:
          return (e._context.displayName || "Context") + ".Consumer";
        case B:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Ee:
          return t = e.displayName || null, t !== null ? t : me(e.type) || "Memo";
        case pe:
          t = e._payload, e = e._init;
          try {
            return me(e(t));
          } catch {
          }
      }
    return null;
  }
  var ye = Array.isArray, V = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, vl = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ac = [], Ha = -1;
  function Wt(e) {
    return { current: e };
  }
  function Pe(e) {
    0 > Ha || (e.current = Ac[Ha], Ac[Ha] = null, Ha--);
  }
  function ze(e, t) {
    Ha++, Ac[Ha] = e.current, e.current = t;
  }
  var It = Wt(null), Bn = Wt(null), Ml = Wt(null), Zu = Wt(null);
  function Vu(e, t) {
    switch (ze(Ml, t), ze(Bn, e), ze(It, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? nm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = nm(t), e = um(t, e);
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
    Pe(It), ze(It, e);
  }
  function qa() {
    Pe(It), Pe(Bn), Pe(Ml);
  }
  function zc(e) {
    var t = e.memoizedState;
    t !== null && (Nn._currentValue = t.memoizedState, ze(Zu, e)), t = It.current;
    var l = um(t, e.type);
    t !== l && (ze(Bn, e), ze(It, l));
  }
  function Ku(e) {
    Bn.current === e && (Pe(It), Pe(Bn)), Zu.current === e && (Pe(Zu), Nn._currentValue = vl);
  }
  var Cc, jf;
  function Rl(e) {
    if (Cc === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Cc = t && t[1] || "", jf = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Cc + e + jf;
  }
  var wc = !1;
  function Dc(e, t) {
    if (!e || wc) return "";
    wc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (q) {
                  var p = q;
                }
                Reflect.construct(e, [], w);
              } else {
                try {
                  w.call();
                } catch (q) {
                  p = q;
                }
                w = !1;
                try {
                  var T = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), w = !0, new e();
                } finally {
                  w && (T !== void 0 ? Object.defineProperty(e.prototype, "props", T) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                p = q;
              }
              (w = e()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (q) {
            if (q && p && typeof q.stack == "string")
              return [q.stack, p.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], r = u[1];
      if (i && r) {
        var v = i.split(`
`), b = r.split(`
`);
        for (n = a = 0; a < v.length && !v[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === v.length || n === b.length)
          for (a = v.length - 1, n = b.length - 1; 1 <= a && 0 <= n && v[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (v[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || v[a] !== b[n]) {
                  var j = `
` + v[a].replace(" at new ", " at ");
                  return e.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", e.displayName)), j;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      wc = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Rl(l) : "";
  }
  function Nh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Rl(e.type);
      case 16:
        return Rl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Rl("Suspense Fallback") : Rl("Suspense");
      case 19:
        return Rl("SuspenseList");
      case 0:
      case 15:
        return Dc(e.type, !1);
      case 11:
        return Dc(e.type.render, !1);
      case 1:
        return Dc(e.type, !0);
      case 31:
        return Rl("Activity");
      case 30:
        return Rl("ViewTransition");
      default:
        return "";
    }
  }
  function Nf(e) {
    try {
      var t = "", l = null;
      do
        t += Nh(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Oc = Object.prototype.hasOwnProperty, Mc = s.unstable_scheduleCallback, Rc = s.unstable_cancelCallback, Eh = s.unstable_shouldYield, Ah = s.unstable_requestPaint, bt = s.unstable_now, zh = s.unstable_getCurrentPriorityLevel, Ef = s.unstable_ImmediatePriority, Af = s.unstable_UserBlockingPriority, Ju = s.unstable_NormalPriority, Ch = s.unstable_LowPriority, zf = s.unstable_IdlePriority, wh = s.log, Dh = s.unstable_setDisableYieldValue, Yn = null, xt = null;
  function Ul(e) {
    if (typeof wh == "function" && Dh(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Yn, e);
      } catch {
      }
  }
  var Tt = Math.clz32 ? Math.clz32 : Rh, Oh = Math.log, Mh = Math.LN2;
  function Rh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Oh(e) / Mh | 0) | 0;
  }
  var $u = 256, ku = 262144, Fu = 4194304;
  function oa(e) {
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
  function Wu(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = e.suspendedLanes, i = e.pingedLanes;
    e = e.warmLanes;
    var r = a & 134217727;
    return r !== 0 ? (a = r & ~u, a !== 0 ? n = oa(a) : (i &= r, i !== 0 ? n = oa(i) : l || (l = r & ~e, l !== 0 && (n = oa(l))))) : (r = a & ~u, r !== 0 ? n = oa(r) : i !== 0 ? n = oa(i) : l || (l = a & ~e, l !== 0 && (n = oa(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : n;
  }
  function Gn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Cf(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var a = 31 - Tt(l), n = 1 << a;
        t |= e[a], l &= ~n;
      }
    return t;
  }
  function Uh(e, t) {
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
  function wf() {
    var e = Fu;
    return Fu <<= 1, (Fu & 62914560) === 0 && (Fu = 4194304), e;
  }
  function Uc(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Xn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Hh(e, t, l, a, n, u) {
    var i = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var r = e.entanglements, v = e.expirationTimes, b = e.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var j = 31 - Tt(l), w = 1 << j;
      r[j] = 0, v[j] = -1;
      var p = b[j];
      if (p !== null)
        for (b[j] = null, j = 0; j < p.length; j++) {
          var T = p[j];
          T !== null && (T.lane &= -536870913);
        }
      l &= ~w;
    }
    a !== 0 && Df(e, a, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(i & ~t));
  }
  function Df(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - Tt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function Of(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - Tt(l), n = 1 << a;
      n & t | e[a] & t && (e[a] |= t), l &= ~n;
    }
  }
  function Mf(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Hc(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Hc(e) {
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
  function qc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Rf() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Xm(e.type));
  }
  function Uf(e, t) {
    var l = te.p;
    try {
      return te.p = e, t();
    } finally {
      te.p = l;
    }
  }
  var ml = Math.random().toString(36).slice(2), et = "__reactFiber$" + ml, ht = "__reactProps$" + ml, La = "__reactContainer$" + ml, Hf = "__reactEvents$" + ml, qh = "__reactListeners$" + ml, Lh = "__reactHandles$" + ml, qf = "__reactResources$" + ml, Qn = "__reactMarker$" + ml, Iu = "__reactLoad$" + ml;
  function Pu(e) {
    delete e[et], delete e[ht], delete e[qh], delete e[Lh];
  }
  function da(e) {
    var t;
    if (t = e[et]) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[La] || l[et]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = xm(e); e !== null; ) {
            if (l = e[et]) return l;
            e = xm(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Ba(e) {
    if (e = e[et] || e[La]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Zn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Ya(e) {
    var t = e[qf];
    return t || (t = e[qf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ke(e) {
    e[Qn] = !0;
  }
  function Lf(e) {
    e[Iu] = void 0;
  }
  var Bf = /* @__PURE__ */ new Set(), Yf = {};
  function va(e, t) {
    Ga(e, t), Ga(e + "Capture", t);
  }
  function Ga(e, t) {
    for (Yf[e] = t, e = 0; e < t.length; e++)
      Bf.add(t[e]);
  }
  var Bh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Gf = {}, Xf = {};
  function Yh(e) {
    return Oc.call(Xf, e) ? !0 : Oc.call(Gf, e) ? !1 : Bh.test(e) ? Xf[e] = !0 : (Gf[e] = !0, !1);
  }
  var he = !1;
  function Qf() {
    var e = he;
    return he = !1, e;
  }
  function ei(e, t, l) {
    if (Yh(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, l);
      }
  }
  function ti(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, l);
    }
  }
  function hl(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, a);
    }
  }
  function jt(e) {
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
  function Zf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Gh(e, t, l) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Lc(e) {
    if (!e._valueTracker) {
      var t = Zf(e) ? "checked" : "value";
      e._valueTracker = Gh(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Vf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), a = "";
    return e && (a = Zf(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  var Xh = /[\n"\\]/g;
  function Ot(e) {
    return e.replace(
      Xh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bc(e, t, l, a, n, u, i, r) {
    e.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? e.type = i : e.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + jt(t)) : e.value !== "" + jt(t) && (e.value = "" + jt(t)) : i !== "submit" && i !== "reset" || e.removeAttribute("value"), t != null ? i === "number" && e.value == t ? Yc(e, jt(e.value)) : Yc(e, jt(t)) : l != null ? Yc(e, jt(l)) : a != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.name = "" + jt(r) : e.removeAttribute("name");
  }
  function Kf(e, t, l, a, n, u, i, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Lc(e);
        return;
      }
      l = l != null ? "" + jt(l) : "", t = t != null ? "" + jt(t) : l, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = r ? e.checked : !!a, e.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.name = i), Lc(e);
  }
  function Yc(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function Xa(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < l.length; n++)
        t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + jt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          e[n].selected = !0, a && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Jf(e, t, l) {
    if (t != null && (t = "" + jt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + jt(l) : "";
  }
  function $f(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (ye(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = jt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), Lc(e);
  }
  function Qa(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Qh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function kf(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Qh.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Ff(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "", he = !0);
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && l[n] !== a && (kf(e, n, a), he = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && kf(e, u, t[u]);
  }
  function Gc(e) {
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
  var Zh = /* @__PURE__ */ new Map([
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
  ]), Vh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function li(e) {
    return Vh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Pt() {
  }
  var Xc = null;
  function Qc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Za = null, Va = null;
  function Wf(e) {
    var t = Ba(e);
    if (t && (e = t.stateNode)) {
      var l = e[ht] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Bc(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Ot(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[ht] || null;
                if (!n) throw Error(o(90));
                Bc(
                  a,
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
            for (t = 0; t < l.length; t++)
              a = l[t], a.form === e.form && Vf(a);
          }
          break e;
        case "textarea":
          Jf(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && Xa(e, !!l.multiple, t, !1);
      }
    }
  }
  var Zc = !1;
  function If(e, t, l) {
    if (Zc) return e(t, l);
    Zc = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (Zc = !1, (Za !== null || Va !== null) && (lc(), Za && (t = Za, e = Va, Va = Za = null, Wf(t), e)))
        for (t = 0; t < e.length; t++) Wf(e[t]);
    }
  }
  function Vn(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[ht] || null;
    if (a === null) return null;
    l = a[t];
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
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        o(231, t, typeof l)
      );
    return l;
  }
  var yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Vc = !1;
  if (yl)
    try {
      var Kn = {};
      Object.defineProperty(Kn, "passive", {
        get: function() {
          Vc = !0;
        }
      }), window.addEventListener("test", Kn, Kn), window.removeEventListener("test", Kn, Kn);
    } catch {
      Vc = !1;
    }
  var Hl = null, Kc = null, ai = null;
  function Pf() {
    if (ai) return ai;
    var e, t = Kc, l = t.length, a, n = "value" in Hl ? Hl.value : Hl.textContent, u = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++) ;
    var i = l - e;
    for (a = 1; a <= i && t[l - a] === n[u - a]; a++) ;
    return ai = n.slice(e, 1 < a ? 1 - a : void 0);
  }
  function ni(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function ui() {
    return !0;
  }
  function eo() {
    return !1;
  }
  function rt(e) {
    function t(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var r in e)
        e.hasOwnProperty(r) && (l = e[r], this[r] = l ? l(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ui : eo, this.isPropagationStopped = eo, this;
    }
    return Y(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ui);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ui);
      },
      persist: function() {
      },
      isPersistent: ui
    }), t;
  }
  var ql = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ii = rt(ql), Jn = Y({}, ql, { view: 0, detail: 0 }), Kh = rt(Jn), Jc, $c, $n, ci = Y({}, Jn, {
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
    getModifierState: Fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== $n && ($n && e.type === "mousemove" ? (Jc = e.screenX - $n.screenX, $c = e.screenY - $n.screenY) : $c = Jc = 0, $n = e), Jc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : $c;
    }
  }), to = rt(ci), Jh = Y({}, ci, { dataTransfer: 0 }), $h = rt(Jh), kh = Y({}, Jn, { relatedTarget: 0 }), kc = rt(kh), Fh = Y({}, ql, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wh = rt(Fh), Ih = Y({}, ql, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Ph = rt(Ih), ey = Y({}, ql, { data: 0 }), lo = rt(ey), ty = {
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
  }, ly = {
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
  }, ay = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function ny(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = ay[e]) ? !!t[e] : !1;
  }
  function Fc() {
    return ny;
  }
  var uy = Y({}, Jn, {
    key: function(e) {
      if (e.key) {
        var t = ty[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ni(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ly[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Fc,
    charCode: function(e) {
      return e.type === "keypress" ? ni(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ni(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), iy = rt(uy), cy = Y({}, ci, {
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
  }), ao = rt(cy), sy = Y({}, ql, { submitter: 0 }), ry = rt(sy), fy = Y({}, Jn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Fc
  }), oy = rt(fy), dy = Y({}, ql, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vy = rt(dy), my = Y({}, ci, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), hy = rt(my), yy = Y({}, ql, {
    newState: 0,
    oldState: 0,
    source: 0
  }), gy = rt(yy), py = [9, 13, 27, 32], Wc = yl && "CompositionEvent" in window, kn = null;
  yl && "documentMode" in document && (kn = document.documentMode);
  var _y = yl && "TextEvent" in window && !kn, no = yl && (!Wc || kn && 8 < kn && 11 >= kn), uo = " ", io = !1;
  function co(e, t) {
    switch (e) {
      case "keyup":
        return py.indexOf(t.keyCode) !== -1;
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
  function so(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ka = !1;
  function Sy(e, t) {
    switch (e) {
      case "compositionend":
        return so(t);
      case "keypress":
        return t.which !== 32 ? null : (io = !0, uo);
      case "textInput":
        return e = t.data, e === uo && io ? null : e;
      default:
        return null;
    }
  }
  function by(e, t) {
    if (Ka)
      return e === "compositionend" || !Wc && co(e, t) ? (e = Pf(), ai = Kc = Hl = null, Ka = !1, e) : null;
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
        return no && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var xy = {
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
  function ro(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!xy[e.type] : t === "textarea";
  }
  function fo(e, t, l, a) {
    Za ? Va ? Va.push(a) : Va = [a] : Za = a, t = sc(t, "onChange"), 0 < t.length && (l = new ii(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var Fn = null, Wn = null;
  function Ty(e) {
    Iv(e, 0);
  }
  function si(e) {
    var t = Zn(e);
    if (Vf(t)) return e;
  }
  function oo(e, t) {
    if (e === "change") return t;
  }
  var vo = !1;
  if (yl) {
    var Ic;
    if (yl) {
      var Pc = "oninput" in document;
      if (!Pc) {
        var mo = document.createElement("div");
        mo.setAttribute("oninput", "return;"), Pc = typeof mo.oninput == "function";
      }
      Ic = Pc;
    } else Ic = !1;
    vo = Ic && (!document.documentMode || 9 < document.documentMode);
  }
  function ho() {
    Fn && (Fn.detachEvent("onpropertychange", yo), Wn = Fn = null);
  }
  function yo(e) {
    if (e.propertyName === "value" && si(Wn)) {
      var t = [];
      fo(
        t,
        Wn,
        e,
        Qc(e)
      ), If(Ty, t);
    }
  }
  function jy(e, t, l) {
    e === "focusin" ? (ho(), Fn = t, Wn = l, Fn.attachEvent("onpropertychange", yo)) : e === "focusout" && ho();
  }
  function Ny(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return si(Wn);
  }
  function Ey(e, t) {
    if (e === "click") return si(t);
  }
  function Ay(e, t) {
    if (e === "input" || e === "change")
      return si(t);
  }
  function zy(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Nt = typeof Object.is == "function" ? Object.is : zy;
  function In(e, t) {
    if (Nt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!Oc.call(t, n) || !Nt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function es(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function go(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function po(e, t) {
    var l = go(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = e + l.textContent.length, e <= t && a >= t)
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = go(l);
    }
  }
  function _o(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? _o(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function So(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = es(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = es(e.document);
    }
    return t;
  }
  function ts(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Cy = yl && "documentMode" in document && 11 >= document.documentMode, Ja = null, ls = null, Pn = null, as = !1;
  function bo(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    as || Ja == null || Ja !== es(a) || (a = Ja, "selectionStart" in a && ts(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Pn && In(Pn, a) || (Pn = a, a = sc(ls, "onSelect"), 0 < a.length && (t = new ii(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = Ja)));
  }
  function ma(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var $a = {
    animationend: ma("Animation", "AnimationEnd"),
    animationiteration: ma("Animation", "AnimationIteration"),
    animationstart: ma("Animation", "AnimationStart"),
    transitionrun: ma("Transition", "TransitionRun"),
    transitionstart: ma("Transition", "TransitionStart"),
    transitioncancel: ma("Transition", "TransitionCancel"),
    transitionend: ma("Transition", "TransitionEnd")
  }, ns = {}, xo = {};
  yl && (xo = document.createElement("div").style, "AnimationEvent" in window || (delete $a.animationend.animation, delete $a.animationiteration.animation, delete $a.animationstart.animation), "TransitionEvent" in window || delete $a.transitionend.transition);
  function ha(e) {
    if (ns[e]) return ns[e];
    if (!$a[e]) return e;
    var t = $a[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in xo)
        return ns[e] = t[l];
    return e;
  }
  var To = ha("animationend"), jo = ha("animationiteration"), No = ha("animationstart"), wy = ha("transitionrun"), Dy = ha("transitionstart"), Oy = ha("transitioncancel"), Eo = ha("transitionend"), Ao = /* @__PURE__ */ new Map(), us = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  us.push("scrollEnd");
  function Zt(e, t) {
    Ao.set(e, t), va(t, [e]);
  }
  var My = 0;
  function gl(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = $t.identifierPrefix;
    var l = My++;
    return e = "_" + e + "t_" + l.toString(32) + "_", t.autoName = e;
  }
  function zo(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, l = hn;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = e[l[a]];
        if (n != null) {
          if (n === "none") return "none";
          t = t == null ? n : t + (" " + n);
        }
      }
    return t ?? e.default;
  }
  function pl(e, t) {
    return e = zo(e), t = zo(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var ri = typeof reportError == "function" ? reportError : function(e) {
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
  }, Mt = [], ka = 0, is = 0;
  function fi() {
    for (var e = ka, t = is = ka = 0; t < e; ) {
      var l = Mt[t];
      Mt[t++] = null;
      var a = Mt[t];
      Mt[t++] = null;
      var n = Mt[t];
      Mt[t++] = null;
      var u = Mt[t];
      if (Mt[t++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && Co(l, n, u);
    }
  }
  function oi(e, t, l, a) {
    Mt[ka++] = e, Mt[ka++] = t, Mt[ka++] = l, Mt[ka++] = a, is |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function cs(e, t, l, a) {
    return oi(e, t, l, a), di(e);
  }
  function ya(e, t) {
    return oi(e, null, null, t), di(e);
  }
  function Co(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - Tt(l), e = u.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function di(e) {
    if (50 < bu)
      throw bu = 0, tc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Fa = {};
  function Ry(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, l, a) {
    return new Ry(e, t, l, a);
  }
  function ss(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function _l(e, t) {
    var l = e.alternate;
    return l === null ? (l = yt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 1206910976, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function wo(e, t) {
    e.flags &= 1206910978;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function vi(e, t, l, a, n, u) {
    var i = 0;
    if (a = e, typeof a == "function") ss(a) && (i = 1);
    else if (typeof a == "string")
      i = s0(
        e,
        l,
        It.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (a) {
        case Qt:
          return e = yt(31, l, t, n), e.elementType = Qt, e.lanes = u, e;
        case De:
          return ga(l.children, n, u, t);
        case qe:
          i = 8, n |= 24;
          break;
        case Ft:
          return e = yt(12, l, t, n | 2), e.elementType = Ft, e.lanes = u, e;
        case I:
          return e = yt(13, l, t, n), e.elementType = I, e.lanes = u, e;
        case ee:
          return e = yt(19, l, t, n), e.elementType = ee, e.lanes = u, e;
        case dl:
        case g:
          return e = n | 32, e = yt(30, l, t, e), e.elementType = g, e.lanes = u, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case $e:
                i = 10;
                break e;
              case ra:
                i = 9;
                break e;
              case B:
                i = 11;
                break e;
              case Ee:
                i = 14;
                break e;
              case pe:
                i = 16, a = null;
                break e;
            }
          i = 29, l = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = yt(i, l, t, n), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function ga(e, t, l, a) {
    return e = yt(7, e, a, t), e.lanes = l, e;
  }
  function rs(e, t, l) {
    return e = yt(6, e, null, t), e.lanes = l, e;
  }
  function Do(e) {
    var t = yt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function fs(e, t, l) {
    return t = yt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Oo = /* @__PURE__ */ new WeakMap();
  function Rt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = Oo.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Nf(t)
      }, Oo.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Nf(t)
    };
  }
  var Wa = [], Ia = 0, mi = null, eu = 0, Ut = [], Ht = 0, Ll = null, el = 1, tl = "";
  function Sl(e, t) {
    Wa[Ia++] = eu, Wa[Ia++] = mi, mi = e, eu = t;
  }
  function Mo(e, t, l) {
    Ut[Ht++] = el, Ut[Ht++] = tl, Ut[Ht++] = Ll, Ll = e;
    var a = el;
    e = tl;
    var n = 32 - Tt(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Tt(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, el = 1 << 32 - Tt(t) + n | l << n | a, tl = u + e;
    } else
      el = 1 << u | l << n | a, tl = e;
  }
  function hi(e) {
    e.return !== null && (Sl(e, 1), Mo(e, 1, 0));
  }
  function os(e) {
    for (; e === mi; )
      mi = Wa[--Ia], Wa[Ia] = null, eu = Wa[--Ia], Wa[Ia] = null;
    for (; e === Ll; )
      Ll = Ut[--Ht], Ut[Ht] = null, tl = Ut[--Ht], Ut[Ht] = null, el = Ut[--Ht], Ut[Ht] = null;
  }
  function Ro(e, t) {
    Ut[Ht++] = el, Ut[Ht++] = tl, Ut[Ht++] = Ll, el = t.id, tl = t.overflow, Ll = e;
  }
  var Fe = null, Ce = null, ie = !1, Bl = null, qt = !1, ds = Error(o(519));
  function Yl(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw tu(Rt(t, e)), ds;
  }
  function Uo(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[et] = e, t[ht] = a, l) {
      case "dialog":
        se("cancel", t), se("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        se("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Tu.length; l++)
          se(Tu[l], t);
        break;
      case "source":
        se("error", t);
        break;
      case "img":
      case "image":
      case "link":
        se("error", t), se("load", t);
        break;
      case "details":
        se("toggle", t);
        break;
      case "input":
        se("invalid", t), Kf(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        se("invalid", t);
        break;
      case "textarea":
        se("invalid", t), $f(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || lm(t.textContent, l) ? (a.popover != null && (se("beforetoggle", t), se("toggle", t)), a.onScroll != null && se("scroll", t), a.onScrollEnd != null && se("scrollend", t), a.onClick != null && (t.onclick = Pt), t = !0) : t = !1, t || Yl(e, !0);
  }
  function yi(e) {
    for (Fe = e.return; Fe; )
      switch (Fe.tag) {
        case 5:
        case 31:
        case 13:
          qt = !1;
          return;
        case 27:
        case 3:
          qt = !0;
          return;
        default:
          Fe = Fe.return;
      }
  }
  function Pa(e) {
    if (e !== Fe) return !1;
    if (!ie) return yi(e), ie = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Xr(e.type, e.memoizedProps)), l = !l), l && Ce && Yl(e), yi(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Ce = bm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Ce = bm(e);
    } else
      t === 27 ? (t = Ce, la(e.type) ? (e = Wr, Wr = null, Ce = e) : Ce = t) : Ce = Fe ? Bt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function pa() {
    Ce = Fe = null, ie = !1;
  }
  function vs() {
    var e = Bl;
    return e !== null && (_t === null ? _t = e : _t.push.apply(
      _t,
      e
    ), Bl = null), e;
  }
  function tu(e) {
    Bl === null ? Bl = [e] : Bl.push(e);
  }
  var ms = Wt(null), _a = null, bl = null;
  function Gl(e, t, l) {
    ze(ms, t._currentValue), t._currentValue = l;
  }
  function xl(e) {
    e._currentValue = ms.current, Pe(ms);
  }
  function gi(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function hs(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var r = u;
          u = n;
          for (var v = 0; v < t.length; v++)
            if (r.context === t[v]) {
              u.lanes |= l, r = u.alternate, r !== null && (r.lanes |= l), gi(
                u.return,
                l,
                e
              ), a || (i = null);
              break e;
            }
          u = r.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(o(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), gi(i, l, e), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), gi(
          n.return,
          l,
          e
        ), i = n.child, i = i !== null ? i.sibling : null) : i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === e) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function Sa(e, t, l, a) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var r = n.type;
          Nt(n.pendingProps.value, i.value) || (e !== null ? e.push(r) : e = [r]);
        }
      } else if (n === Zu.current) {
        if (i = n.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Nn) : e = [Nn]);
      }
      n = n.return;
    }
    return e !== null && hs(
      t,
      e,
      l,
      a
    ), t.flags |= 262144, e !== null;
  }
  function pi(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Nt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ba(e) {
    _a = e, bl = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function tt(e) {
    return Ho(_a, e);
  }
  function _i(e, t) {
    return _a === null && ba(e), Ho(e, t);
  }
  function Ho(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, bl === null) {
      if (e === null) throw Error(o(308));
      bl = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else bl = bl.next = t;
    return l;
  }
  var Uy = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Hy = s.unstable_scheduleCallback, qy = s.unstable_NormalPriority, Ge = {
    $$typeof: $e,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ys() {
    return {
      controller: new Uy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function lu(e) {
    e.refCount--, e.refCount === 0 && Hy(qy, function() {
      e.controller.abort();
    });
  }
  function qo(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var l = e.transitionTypes;
      for (l === null && (l = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var a = t[e];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var au = null;
  function Ly(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var nu = null, gs = 0, xa = 0, en = null;
  function By(e, t) {
    if (nu === null) {
      var l = nu = [];
      gs = 0, xa = Mr(), en = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return gs++, t.then(Lo, Lo), t;
  }
  function Lo() {
    if (--gs === 0 && (au = null, nu !== null)) {
      en !== null && (en.status = "fulfilled");
      var e = nu;
      nu = null, xa = 0, en = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Yy(e, t) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < l.length; n++) (0, l[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var Bo = V.S;
  V.S = function(e, t) {
    if (Dv = bt(), typeof t == "object" && t !== null && typeof t.then == "function" && By(e, t), au !== null)
      for (var l = _n; l !== null; )
        qo(l, au), l = l.next;
    if (l = e.types, l !== null) {
      for (var a = _n; a !== null; )
        qo(a, l), a = a.next;
      if (xa !== 0) {
        a = au, a === null && (a = au = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Bo !== null && Bo(e, t);
  };
  var Ta = Wt(null);
  function ps() {
    var e = Ta.current;
    return e !== null ? e : Ae.pooledCache;
  }
  function Si(e, t) {
    t === null ? ze(Ta, Ta.current) : ze(Ta, t.pool);
  }
  function Yo() {
    var e = ps();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var tn = Error(o(460)), _s = Error(o(474)), bi = Error(o(542)), xi = { then: function() {
  } };
  function Go(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Xo(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Pt, Pt), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Zo(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(Pt, Pt);
        else {
          if (e = Ae, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Zo(e), e;
        }
        throw Na = t, tn;
    }
  }
  function ja(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Na = l, tn) : l;
    }
  }
  var Na = null;
  function Qo() {
    if (Na === null) throw Error(o(459));
    var e = Na;
    return Na = null, e;
  }
  function Zo(e) {
    if (e === tn || e === bi)
      throw Error(o(483));
  }
  var ln = null, uu = 0;
  function Ti(e) {
    var t = uu;
    return uu += 1, ln === null && (ln = []), Xo(ln, e, t);
  }
  function Xl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ji(e, t) {
    throw t.$$typeof === k ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Vo(e) {
    function t(_, h) {
      if (e) {
        var x = _.deletions;
        x === null ? (_.deletions = [h], _.flags |= 16) : x.push(h);
      }
    }
    function l(_, h) {
      if (!e) return null;
      for (; h !== null; )
        t(_, h), h = h.sibling;
      return null;
    }
    function a(_) {
      for (var h = /* @__PURE__ */ new Map(); _ !== null; )
        _.key === null ? h.set(_.index, _) : h.set(_.key, _), _ = _.sibling;
      return h;
    }
    function n(_, h) {
      return _ = _l(_, h), _.index = 0, _.sibling = null, _;
    }
    function u(_, h, x) {
      return _.index = x, e ? (x = _.alternate, x !== null ? (x = x.index, x < h ? (_.flags |= 2, h) : x) : (_.flags |= 134217730, h)) : (_.flags |= 1048576, h);
    }
    function i(_) {
      return e && _.alternate === null && (_.flags |= 134217730), _;
    }
    function r(_, h, x, C) {
      return h === null || h.tag !== 6 ? (h = rs(x, _.mode, C), h.return = _, h) : (h = n(h, x), h.return = _, h);
    }
    function v(_, h, x, C) {
      var G = x.type;
      return G === De ? (_ = j(
        _,
        h,
        x.props.children,
        C,
        x.key
      ), Xl(_, x), _) : h !== null && (h.elementType === G || typeof G == "object" && G !== null && G.$$typeof === pe && ja(G) === h.type) ? (h = n(h, x.props), Xl(h, x), h.return = _, h) : (h = vi(
        x.type,
        x.key,
        x.props,
        null,
        _.mode,
        C
      ), Xl(h, x), h.return = _, h);
    }
    function b(_, h, x, C) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== x.containerInfo || h.stateNode.implementation !== x.implementation ? (h = fs(x, _.mode, C), h.return = _, h) : (h = n(h, x.children || []), h.return = _, h);
    }
    function j(_, h, x, C, G) {
      return h === null || h.tag !== 7 ? (h = ga(
        x,
        _.mode,
        C,
        G
      ), h.return = _, h) : (h = n(h, x), h.return = _, h);
    }
    function w(_, h, x) {
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
        return h = rs(
          "" + h,
          _.mode,
          x
        ), h.return = _, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case Oe:
            return x = vi(
              h.type,
              h.key,
              h.props,
              null,
              _.mode,
              x
            ), Xl(x, h), x.return = _, x;
          case Ye:
            return h = fs(
              h,
              _.mode,
              x
            ), h.return = _, h;
          case pe:
            return h = ja(h), w(_, h, x);
        }
        if (ye(h) || $(h))
          return h = ga(
            h,
            _.mode,
            x,
            null
          ), h.return = _, h;
        if (typeof h.then == "function")
          return w(_, Ti(h), x);
        if (h.$$typeof === $e)
          return w(
            _,
            _i(_, h),
            x
          );
        ji(_, h);
      }
      return null;
    }
    function p(_, h, x, C) {
      var G = h !== null ? h.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return G !== null ? null : r(_, h, "" + x, C);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Oe:
            return x.key === G ? v(_, h, x, C) : null;
          case Ye:
            return x.key === G ? b(_, h, x, C) : null;
          case pe:
            return x = ja(x), p(_, h, x, C);
        }
        if (ye(x) || $(x))
          return G !== null ? null : j(_, h, x, C, null);
        if (typeof x.then == "function")
          return p(
            _,
            h,
            Ti(x),
            C
          );
        if (x.$$typeof === $e)
          return p(
            _,
            h,
            _i(_, x),
            C
          );
        ji(_, x);
      }
      return null;
    }
    function T(_, h, x, C, G) {
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return _ = _.get(x) || null, r(h, _, "" + C, G);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case Oe:
            return _ = _.get(
              C.key === null ? x : C.key
            ) || null, v(h, _, C, G);
          case Ye:
            return _ = _.get(
              C.key === null ? x : C.key
            ) || null, b(h, _, C, G);
          case pe:
            return C = ja(C), T(
              _,
              h,
              x,
              C,
              G
            );
        }
        if (ye(C) || $(C))
          return _ = _.get(x) || null, j(h, _, C, G, null);
        if (typeof C.then == "function")
          return T(
            _,
            h,
            x,
            Ti(C),
            G
          );
        if (C.$$typeof === $e)
          return T(
            _,
            h,
            x,
            _i(h, C),
            G
          );
        ji(h, C);
      }
      return null;
    }
    function q(_, h, x, C) {
      for (var G = null, oe = null, K = h, F = h = 0, Ze = null; K !== null && F < x.length; F++) {
        K.index > F ? (Ze = K, K = null) : Ze = K.sibling;
        var de = p(
          _,
          K,
          x[F],
          C
        );
        if (de === null) {
          K === null && (K = Ze);
          break;
        }
        e && K && de.alternate === null && t(_, K), h = u(de, h, F), oe === null ? G = de : oe.sibling = de, oe = de, K = Ze;
      }
      if (F === x.length)
        return l(_, K), ie && Sl(_, F), G;
      if (K === null) {
        for (; F < x.length; F++)
          K = w(_, x[F], C), K !== null && (h = u(
            K,
            h,
            F
          ), oe === null ? G = K : oe.sibling = K, oe = K);
        return ie && Sl(_, F), G;
      }
      for (K = a(K); F < x.length; F++)
        Ze = T(
          K,
          _,
          F,
          x[F],
          C
        ), Ze !== null && (e && (de = Ze.alternate, de !== null && K.delete(de.key === null ? F : de.key)), h = u(
          Ze,
          h,
          F
        ), oe === null ? G = Ze : oe.sibling = Ze, oe = Ze);
      return e && K.forEach(function(ca) {
        return t(_, ca);
      }), ie && Sl(_, F), G;
    }
    function Z(_, h, x, C) {
      if (x == null) throw Error(o(151));
      for (var G = null, oe = null, K = h, F = h = 0, Ze = null, de = x.next(); K !== null && !de.done; F++, de = x.next()) {
        K.index > F ? (Ze = K, K = null) : Ze = K.sibling;
        var ca = p(_, K, de.value, C);
        if (ca === null) {
          K === null && (K = Ze);
          break;
        }
        e && K && ca.alternate === null && t(_, K), h = u(ca, h, F), oe === null ? G = ca : oe.sibling = ca, oe = ca, K = Ze;
      }
      if (de.done)
        return l(_, K), ie && Sl(_, F), G;
      if (K === null) {
        for (; !de.done; F++, de = x.next())
          de = w(_, de.value, C), de !== null && (h = u(de, h, F), oe === null ? G = de : oe.sibling = de, oe = de);
        return ie && Sl(_, F), G;
      }
      for (K = a(K); !de.done; F++, de = x.next())
        de = T(K, _, F, de.value, C), de !== null && (e && (Ze = de.alternate, Ze !== null && K.delete(
          Ze.key === null ? F : Ze.key
        )), h = u(de, h, F), oe === null ? G = de : oe.sibling = de, oe = de);
      return e && K.forEach(function(S0) {
        return t(_, S0);
      }), ie && Sl(_, F), G;
    }
    function ne(_, h, x, C) {
      if (typeof x == "object" && x !== null && x.type === De && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Oe:
            e: {
              for (var G = x.key; h !== null; ) {
                if (h.key === G) {
                  if (G = x.type, G === De) {
                    if (h.tag === 7) {
                      l(
                        _,
                        h.sibling
                      ), C = n(
                        h,
                        x.props.children
                      ), Xl(C, x), C.return = _, _ = C;
                      break e;
                    }
                  } else if (h.elementType === G || typeof G == "object" && G !== null && G.$$typeof === pe && ja(G) === h.type) {
                    l(
                      _,
                      h.sibling
                    ), C = n(h, x.props), Xl(C, x), C.return = _, _ = C;
                    break e;
                  }
                  l(_, h);
                  break;
                } else t(_, h);
                h = h.sibling;
              }
              x.type === De ? (C = ga(
                x.props.children,
                _.mode,
                C,
                x.key
              ), Xl(C, x), C.return = _, _ = C) : (C = vi(
                x.type,
                x.key,
                x.props,
                null,
                _.mode,
                C
              ), Xl(C, x), C.return = _, _ = C);
            }
            return i(_);
          case Ye:
            e: {
              for (G = x.key; h !== null; ) {
                if (h.key === G)
                  if (h.tag === 4 && h.stateNode.containerInfo === x.containerInfo && h.stateNode.implementation === x.implementation) {
                    l(
                      _,
                      h.sibling
                    ), C = n(h, x.children || []), C.return = _, _ = C;
                    break e;
                  } else {
                    l(_, h);
                    break;
                  }
                else t(_, h);
                h = h.sibling;
              }
              C = fs(x, _.mode, C), C.return = _, _ = C;
            }
            return i(_);
          case pe:
            return x = ja(x), ne(
              _,
              h,
              x,
              C
            );
        }
        if (ye(x))
          return q(
            _,
            h,
            x,
            C
          );
        if ($(x)) {
          if (G = $(x), typeof G != "function") throw Error(o(150));
          return x = G.call(x), Z(
            _,
            h,
            x,
            C
          );
        }
        if (typeof x.then == "function")
          return ne(
            _,
            h,
            Ti(x),
            C
          );
        if (x.$$typeof === $e)
          return ne(
            _,
            h,
            _i(_, x),
            C
          );
        ji(_, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, h !== null && h.tag === 6 ? (l(_, h.sibling), C = n(h, x), C.return = _, _ = C) : (l(_, h), C = rs(x, _.mode, C), C.return = _, _ = C), i(_)) : l(_, h);
    }
    return function(_, h, x, C) {
      try {
        uu = 0;
        var G = ne(
          _,
          h,
          x,
          C
        );
        return ln = null, G;
      } catch (K) {
        if (K === tn || K === bi) throw K;
        var oe = yt(29, K, null, _.mode);
        return oe.lanes = C, oe.return = _, oe;
      } finally {
      }
    };
  }
  var Ea = Vo(!0), Ko = Vo(!1), Ql = !1;
  function Ss(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function bs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Zl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Vl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ge & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = di(e), Co(e, null, l), t;
    }
    return oi(e, a, t, l), di(e);
  }
  function iu(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Of(e, l);
    }
  }
  function xs(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, l = l.next;
        } while (l !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var Ts = !1;
  function cu() {
    if (Ts) {
      var e = en;
      if (e !== null) throw e;
    }
  }
  function su(e, t, l, a) {
    Ts = !1;
    var n = e.updateQueue;
    Ql = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var v = r, b = v.next;
      v.next = null, i === null ? u = b : i.next = b, i = v;
      var j = e.alternate;
      j !== null && (j = j.updateQueue, r = j.lastBaseUpdate, r !== i && (r === null ? j.firstBaseUpdate = b : r.next = b, j.lastBaseUpdate = v));
    }
    if (u !== null) {
      var w = n.baseState;
      i = 0, j = b = v = null, r = u;
      do {
        var p = r.lane & -536870913, T = p !== r.lane;
        if (T ? (fe & p) === p : (a & p) === p) {
          p !== 0 && p === xa && (Ts = !0), j !== null && (j = j.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          e: {
            var q = e, Z = r;
            p = t;
            var ne = l;
            switch (Z.tag) {
              case 1:
                if (q = Z.payload, typeof q == "function") {
                  w = q.call(ne, w, p);
                  break e;
                }
                w = q;
                break e;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = Z.payload, p = typeof q == "function" ? q.call(ne, w, p) : q, p == null) break e;
                w = Y({}, w, p);
                break e;
              case 2:
                Ql = !0;
            }
          }
          p = r.callback, p !== null && (e.flags |= 64, T && (e.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [p] : T.push(p));
        } else
          T = {
            lane: p,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, j === null ? (b = j = T, v = w) : j = j.next = T, i |= p;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          T = r, r = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      j === null && (v = w), n.baseState = v, n.firstBaseUpdate = b, n.lastBaseUpdate = j, u === null && (n.shared.lanes = 0), Il |= i, e.lanes = i, e.memoizedState = w;
    }
  }
  function Jo(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function $o(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Jo(l[e], t);
  }
  var Kl = Wt(null), Ni = Wt(0);
  function ko(e, t) {
    e = Al, ze(Ni, e), ze(Kl, t), Al = e | t.baseLanes;
  }
  function js() {
    ze(Ni, Al), ze(Kl, Kl.current);
  }
  function Ns() {
    Al = Ni.current, Pe(Kl), Pe(Ni);
  }
  var lt = Wt(null), ct = null;
  function Jl(e) {
    var t = e.alternate;
    ze(at, at.current & 1), ze(lt, e), ct === null && (t === null || Kl.current !== null || t.memoizedState !== null) && (ct = e);
  }
  function Es(e) {
    ze(at, at.current), ze(lt, e), ct === null && (ct = e);
  }
  function Fo(e) {
    e.tag === 22 ? (ze(at, at.current), ze(lt, e), ct === null && (ct = e)) : $l();
  }
  function $l() {
    ze(at, at.current), ze(lt, lt.current);
  }
  function Et(e) {
    Pe(lt), ct === e && (ct = null), Pe(at);
  }
  var at = Wt(0);
  function ru(e, t) {
    ze(lt, lt.current), ze(at, t);
  }
  function As(e) {
    Pe(at), Pe(lt), ct === e && (ct = null);
  }
  function Ei(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || kr(l) || Fr(l)))
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
  var Tl = 0, ae = null, je = null, Xe = null, Ai = !1, an = !1, Aa = !1, zi = 0, fu = 0, nn = null, Gy = 0;
  function Ue() {
    throw Error(o(321));
  }
  function zs(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Nt(e[l], t[l])) return !1;
    return !0;
  }
  function Cs(e, t, l, a, n, u) {
    return Tl = u, ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? Md : Rd, Aa = !1, u = l(a, n), Aa = !1, an && (u = Io(
      t,
      l,
      a,
      n
    )), Wo(e), u;
  }
  function Wo(e) {
    V.H = Ui;
    var t = je !== null && je.next !== null;
    if (Tl = 0, Xe = je = ae = null, Ai = !1, fu = 0, nn = null, t) throw Error(o(300));
    e === null || Qe || (e = e.dependencies, e !== null && pi(e) && (Qe = !0));
  }
  function Io(e, t, l, a) {
    ae = e;
    var n = 0;
    do {
      if (an && (nn = null), fu = 0, an = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Xe = je = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = ky, u = t(l, a);
    } while (an);
    return u;
  }
  function Xy() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? ou(t) : t, e = e.useState()[0], (je !== null ? je.memoizedState : null) !== e && (ae.flags |= 1024), t;
  }
  function ws() {
    var e = zi !== 0;
    return zi = 0, e;
  }
  function Ds(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Os(e) {
    if (Ai) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ai = !1;
    }
    Tl = 0, Xe = je = ae = null, an = !1, fu = zi = 0, nn = null;
  }
  function ft() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Xe === null ? ae.memoizedState = Xe = e : Xe = Xe.next = e, Xe;
  }
  function Le() {
    if (je === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = je.next;
    var t = Xe === null ? ae.memoizedState : Xe.next;
    if (t !== null)
      Xe = t, je = e;
    else {
      if (e === null)
        throw ae.alternate === null ? Error(o(467)) : Error(o(310));
      je = e, e = {
        memoizedState: je.memoizedState,
        baseState: je.baseState,
        baseQueue: je.baseQueue,
        queue: je.queue,
        next: null
      }, Xe === null ? ae.memoizedState = Xe = e : Xe = Xe.next = e;
    }
    return Xe;
  }
  function Ci() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ou(e) {
    var t = fu;
    return fu += 1, nn === null && (nn = []), e = Xo(nn, e, t), t = ae, (Xe === null ? t.memoizedState : Xe.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? Md : Rd), e;
  }
  function wi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ou(e);
      if (e.$$typeof === R) return;
      if (e.$$typeof === $e) return tt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Ms(e) {
    var t = null, l = ae.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = ae.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Ci(), ae.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = fa;
    return t.index++, l;
  }
  function jl(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Di(e) {
    var t = Le();
    return Rs(t, je, e);
  }
  function Rs(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var r = i = null, v = null, b = t, j = !1;
      do {
        var w = b.lane & -536870913;
        if (w !== b.lane ? (fe & w) === w : (Tl & w) === w) {
          var p = b.revertLane;
          if (p === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), w === xa && (j = !0);
          else if ((Tl & p) === p) {
            b = b.next, p === xa && (j = !0);
            continue;
          } else
            w = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, v === null ? (r = v = w, i = u) : v = v.next = w, ae.lanes |= p, Il |= p;
          w = b.action, Aa && l(u, w), u = b.hasEagerState ? b.eagerState : l(u, w);
        } else
          p = {
            lane: w,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, v === null ? (r = v = p, i = u) : v = v.next = p, ae.lanes |= w, Il |= w;
        b = b.next;
      } while (b !== null && b !== t);
      if (v === null ? i = u : v.next = r, !Nt(u, e.memoizedState) && (Qe = !0, j && (l = en, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = i, e.baseQueue = v, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function Us(e) {
    var t = Le(), l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, n = l.pending, u = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = e(u, i.action), i = i.next;
      while (i !== n);
      Nt(u, t.memoizedState) || (Qe = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Po(e, t, l) {
    var a = ae, n = Le(), u = ie;
    if (u) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = t();
    var i = !Nt(
      (je || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, Qe = !0), n = n.queue, Ls(ld.bind(null, a, n, e), [
      e
    ]), e = n.getSnapshot !== t || i || Xe !== null && (Xe.memoizedState.tag & 1) !== 0, un(
      e ? 9 : 8,
      { destroy: void 0 },
      td.bind(null, a, n, l, t),
      null
    ), e) {
      if (a.flags |= 2048, Ae === null) throw Error(o(349));
      u || (Tl & 127) !== 0 || ed(a, t, l);
    }
    return l;
  }
  function ed(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = ae.updateQueue, t === null ? (t = Ci(), ae.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function td(e, t, l, a) {
    t.value = l, t.getSnapshot = a, ad(t) && nd(e);
  }
  function ld(e, t, l) {
    return l(function() {
      ad(t) && nd(e);
    });
  }
  function ad(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Nt(e, l);
    } catch {
      return !0;
    }
  }
  function nd(e) {
    var t = ya(e, 2);
    t !== null && St(t, e, 2);
  }
  function Hs(e) {
    var t = ft();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Aa) {
        Ul(!0);
        try {
          l();
        } finally {
          Ul(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jl,
      lastRenderedState: e
    }, t;
  }
  function ud(e, t, l, a) {
    return e.baseState = l, Rs(
      e,
      je,
      typeof a == "function" ? a : jl
    );
  }
  function Qy(e, t, l, a, n) {
    if (Ri(e)) throw Error(o(485));
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
        then: function(i) {
          u.listeners.push(i);
        }
      };
      V.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, id(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function id(e, t) {
    var l = t.action, a = t.payload, n = e.state;
    if (t.isTransition) {
      var u = V.T, i = {};
      i.types = u !== null ? u.types : null, V.T = i;
      try {
        var r = l(n, a), v = V.S;
        v !== null && v(i, r), cd(e, t, r);
      } catch (b) {
        qs(e, t, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), V.T = u;
      }
    } else
      try {
        u = l(n, a), cd(e, t, u);
      } catch (b) {
        qs(e, t, b);
      }
  }
  function cd(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        sd(e, t, a);
      },
      function(a) {
        return qs(e, t, a);
      }
    ) : sd(e, t, l);
  }
  function sd(e, t, l) {
    t.status = "fulfilled", t.value = l, rd(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, id(e, l)));
  }
  function qs(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, rd(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function rd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function fd(e, t) {
    return t;
  }
  function od(e, t) {
    if (ie) {
      var l = Ae.formState;
      if (l !== null) {
        e: {
          var a = ae;
          if (ie) {
            if (Ce) {
              t: {
                for (var n = Ce, u = qt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Bt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ce = Bt(
                  n.nextSibling
                ), a = n.data === "F!";
                break e;
              }
            }
            Yl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = ft(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: fd,
      lastRenderedState: t
    }, l.queue = a, l = wd.bind(
      null,
      ae,
      a
    ), a.dispatch = l, a = Hs(!1), u = Qs.bind(
      null,
      ae,
      !1,
      a.queue
    ), a = ft(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = n, l = Qy.bind(
      null,
      ae,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function dd(e) {
    var t = Le();
    return vd(t, je, e);
  }
  function vd(e, t, l) {
    if (t = Rs(
      e,
      t,
      fd
    )[0], e = Di(jl)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = ou(t);
      } catch (i) {
        throw i === tn ? bi : i;
      }
    else a = t;
    t = Le();
    var n = t.queue, u = n.dispatch;
    return l !== t.memoizedState && (ae.flags |= 2048, un(
      9,
      { destroy: void 0 },
      Zy.bind(null, n, l),
      null
    )), [a, u, e];
  }
  function Zy(e, t) {
    e.action = t;
  }
  function md(e) {
    var t = Le(), l = je;
    if (l !== null)
      return vd(t, l, e);
    Le(), t = t.memoizedState, l = Le();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function un(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = ae.updateQueue, t === null && (t = Ci(), ae.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function hd() {
    return Le().memoizedState;
  }
  function Oi(e, t, l, a) {
    var n = ft();
    ae.flags |= e, n.memoizedState = un(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Mi(e, t, l, a) {
    var n = Le();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    je !== null && a !== null && zs(a, je.memoizedState.deps) ? n.memoizedState = un(t, u, l, a) : (ae.flags |= e, n.memoizedState = un(
      1 | t,
      u,
      l,
      a
    ));
  }
  function yd(e, t) {
    Oi(8390656, 8, e, t);
  }
  function Ls(e, t) {
    Mi(2048, 8, e, t);
  }
  function Vy(e) {
    ae.flags |= 4;
    var t = ae.updateQueue;
    if (t === null)
      t = Ci(), ae.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function gd(e) {
    var t = Le().memoizedState;
    return Vy({ ref: t, nextImpl: e }), function() {
      if ((ge & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function pd(e, t) {
    return Mi(4, 2, e, t);
  }
  function _d(e, t) {
    return Mi(4, 4, e, t);
  }
  function Sd(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function bd(e, t, l) {
    l = l != null ? l.concat([e]) : null, Mi(4, 4, Sd.bind(null, t, e), l);
  }
  function Bs() {
  }
  function xd(e, t) {
    var l = Le();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && zs(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function Td(e, t) {
    var l = Le();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && zs(t, a[1]))
      return a[0];
    if (a = e(), Aa) {
      Ul(!0);
      try {
        e();
      } finally {
        Ul(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function Ys(e, t, l) {
    return l === void 0 || (Tl & 1073741824) !== 0 && (fe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Mv(), ae.lanes |= e, Il |= e, l);
  }
  function jd(e, t, l, a) {
    return Nt(l, t) ? l : Kl.current !== null ? (e = Ys(e, l, a), Nt(e, t) || (Qe = !0), e) : (Tl & 106) === 0 || (Tl & 1073741824) !== 0 && (fe & 261930) === 0 ? (Qe = !0, e.memoizedState = l) : (e = Mv(), ae.lanes |= e, Il |= e, t);
  }
  function Nd(e, t, l, a, n) {
    var u = te.p;
    te.p = u !== 0 && 8 > u ? u : 8;
    var i = V.T, r = {};
    r.types = i !== null ? i.types : null, V.T = r, Qs(e, !1, t, l);
    try {
      var v = n(), b = V.S;
      if (b !== null && b(r, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var j = Yy(
          v,
          a
        );
        du(
          e,
          t,
          j,
          wt(e)
        );
      } else
        du(
          e,
          t,
          a,
          wt(e)
        );
    } catch (w) {
      du(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: w },
        wt()
      );
    } finally {
      te.p = u, i !== null && r.types !== null && (i.types = r.types), V.T = i;
    }
  }
  function Ky() {
  }
  function Gs(e, t, l, a) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Ed(e).queue;
    Nd(
      e,
      n,
      t,
      vl,
      l === null ? Ky : function() {
        return Ad(e), l(a);
      }
    );
  }
  function Ed(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: vl,
      baseState: vl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: vl
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ad(e) {
    var t = Ed(e);
    t.next === null && (t = e.alternate.memoizedState), du(
      e,
      t.next.queue,
      {},
      wt()
    );
  }
  function Xs() {
    return tt(Nn);
  }
  function zd() {
    return Le().memoizedState;
  }
  function Cd() {
    return Le().memoizedState;
  }
  function Jy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = wt();
          e = Zl(l);
          var a = Vl(t, e, l);
          a !== null && (St(a, t, l), iu(a, t, l)), t = { cache: ys() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function $y(e, t, l) {
    var a = wt();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ri(e) ? Dd(t, l) : (l = cs(e, t, l, a), l !== null && (St(l, e, a), Od(l, t, a)));
  }
  function wd(e, t, l) {
    var a = wt();
    du(e, t, l, a);
  }
  function du(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ri(e)) Dd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, r = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = r, Nt(r, i))
            return oi(e, t, n, 0), Ae === null && fi(), !1;
        } catch {
        } finally {
        }
      if (l = cs(e, t, n, a), l !== null)
        return St(l, e, a), Od(l, t, a), !0;
    }
    return !1;
  }
  function Qs(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: Mr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ri(e)) {
      if (t) throw Error(o(479));
    } else
      t = cs(
        e,
        l,
        a,
        2
      ), t !== null && St(t, e, 2);
  }
  function Ri(e) {
    var t = e.alternate;
    return e === ae || t !== null && t === ae;
  }
  function Dd(e, t) {
    an = Ai = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Od(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Of(e, l);
    }
  }
  var Ui = {
    readContext: tt,
    use: wi,
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
  }, Md = {
    readContext: tt,
    use: wi,
    useCallback: function(e, t) {
      return ft().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: tt,
    useEffect: yd,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Oi(
        4194308,
        4,
        Sd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Oi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Oi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = ft();
      t = t === void 0 ? null : t;
      var a = e();
      if (Aa) {
        Ul(!0);
        try {
          e();
        } finally {
          Ul(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = ft();
      if (l !== void 0) {
        var n = l(t);
        if (Aa) {
          Ul(!0);
          try {
            l(t);
          } finally {
            Ul(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, a.queue = e, e = e.dispatch = $y.bind(
        null,
        ae,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = ft();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Hs(e);
      var t = e.queue, l = wd.bind(null, ae, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Bs,
    useDeferredValue: function(e, t) {
      var l = ft();
      return Ys(l, e, t);
    },
    useTransition: function() {
      var e = Hs(!1);
      return e = Nd.bind(
        null,
        ae,
        e.queue,
        !0,
        !1
      ), ft().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var a = ae, n = ft();
      if (ie) {
        if (l === void 0)
          throw Error(o(407));
        l = l();
      } else {
        if (l = t(), Ae === null)
          throw Error(o(349));
        (fe & 127) !== 0 || ed(a, t, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return n.queue = u, yd(ld.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, un(
        9,
        { destroy: void 0 },
        td.bind(
          null,
          a,
          u,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = ft(), t = Ae.identifierPrefix;
      if (ie) {
        var l = tl, a = el;
        l = (a & ~(1 << 32 - Tt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = zi++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Gy++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Xs,
    useFormState: od,
    useActionState: od,
    useOptimistic: function(e) {
      var t = ft();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Qs.bind(
        null,
        ae,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Ms,
    useCacheRefresh: function() {
      return ft().memoizedState = Jy.bind(
        null,
        ae
      );
    },
    useEffectEvent: function(e) {
      var t = ft(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((ge & 2) !== 0)
          throw Error(o(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Rd = {
    readContext: tt,
    use: wi,
    useCallback: xd,
    useContext: tt,
    useEffect: Ls,
    useImperativeHandle: bd,
    useInsertionEffect: pd,
    useLayoutEffect: _d,
    useMemo: Td,
    useReducer: Di,
    useRef: hd,
    useState: function() {
      return Di(jl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(e, t) {
      var l = Le();
      return jd(
        l,
        je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Di(jl)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : ou(e),
        t
      ];
    },
    useSyncExternalStore: Po,
    useId: zd,
    useHostTransitionStatus: Xs,
    useFormState: dd,
    useActionState: dd,
    useOptimistic: function(e, t) {
      var l = Le();
      return ud(l, je, e, t);
    },
    useMemoCache: Ms,
    useCacheRefresh: Cd,
    useEffectEvent: gd
  }, ky = {
    readContext: tt,
    use: wi,
    useCallback: xd,
    useContext: tt,
    useEffect: Ls,
    useImperativeHandle: bd,
    useInsertionEffect: pd,
    useLayoutEffect: _d,
    useMemo: Td,
    useReducer: Us,
    useRef: hd,
    useState: function() {
      return Us(jl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(e, t) {
      var l = Le();
      return je === null ? Ys(l, e, t) : jd(
        l,
        je.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Us(jl)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : ou(e),
        t
      ];
    },
    useSyncExternalStore: Po,
    useId: zd,
    useHostTransitionStatus: Xs,
    useFormState: md,
    useActionState: md,
    useOptimistic: function(e, t) {
      var l = Le();
      return je !== null ? ud(l, je, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Ms,
    useCacheRefresh: Cd,
    useEffectEvent: gd
  };
  function Zs(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : Y({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Vs = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = wt(), n = Zl(a);
      n.payload = t, l != null && (n.callback = l), t = Vl(e, n, a), t !== null && (St(t, e, a), iu(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = wt(), n = Zl(a);
      n.tag = 1, n.payload = t, l != null && (n.callback = l), t = Vl(e, n, a), t !== null && (St(t, e, a), iu(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = wt(), a = Zl(l);
      a.tag = 2, t != null && (a.callback = t), t = Vl(e, a, l), t !== null && (St(t, e, l), iu(t, e, l));
    }
  };
  function Ud(e, t, l, a, n, u, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !In(l, a) || !In(n, u) : !0;
  }
  function Hd(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
  }
  function za(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = Y({}, l));
      for (var n in e)
        l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  function qd(e) {
    ri(e);
  }
  function Ld(e) {
    console.error(e);
  }
  function Bd(e) {
    ri(e);
  }
  function Hi(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Yd(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Ks(e, t, l) {
    return l = Zl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Hi(e, t);
    }, l;
  }
  function Gd(e) {
    return e = Zl(e), e.tag = 3, e;
  }
  function Xd(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Yd(t, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (e.callback = function() {
      Yd(t, l, a), typeof n != "function" && (Pl === null ? Pl = /* @__PURE__ */ new Set([this]) : Pl.add(this));
      var r = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Fy(e, t, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && Sa(
        t,
        l,
        n,
        !0
      ), l = lt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return ct === null ? ac() : l.alternate === null && He === 0 && (He = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === xi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), wr(e, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === xi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), wr(e, a, n)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return wr(e, a, n), ac(), !1;
    }
    if (ie)
      return t = lt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== ds && (e = Error(o(422), { cause: a }), tu(Rt(e, l)))) : (a !== ds && (t = Error(o(423), {
        cause: a
      }), tu(
        Rt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Rt(a, l), n = Ks(
        e.stateNode,
        a,
        n
      ), xs(e, n), He !== 4 && (He = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Rt(u, l), Su === null ? Su = [u] : Su.push(u), He !== 4 && (He = 2), t === null) return !0;
    a = Rt(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = n & -n, l.lanes |= e, e = Ks(l.stateNode, a, e), xs(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Pl === null || !Pl.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Gd(n), Xd(
              n,
              e,
              l,
              a
            ), xs(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Js = Error(o(461)), Qe = !1;
  function Ve(e, t, l, a) {
    t.child = e === null ? Ko(t, null, l, a) : Ea(
      t,
      e.child,
      l,
      a
    );
  }
  function Qd(e, t, l, a, n) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var r in a)
        r !== "ref" && (i[r] = a[r]);
    } else i = a;
    return ba(t), a = Cs(
      e,
      t,
      l,
      i,
      u,
      n
    ), r = ws(), e !== null && !Qe ? (Ds(e, t, n), Nl(e, t, n)) : (ie && r && hi(t), t.flags |= 1, Ve(e, t, a, n), t.child);
  }
  function Zd(e, t, l, a, n) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !ss(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Vd(
        e,
        t,
        u,
        a,
        n
      )) : (e = vi(
        l.type,
        null,
        a,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !tr(e, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : In, l(i, a) && e.ref === t.ref)
        return Nl(e, t, n);
    }
    return t.flags |= 1, e = _l(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Vd(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (In(u, a) && e.ref === t.ref)
        if (Qe = !1, t.pendingProps = a = u, tr(e, n))
          (e.flags & 131072) !== 0 && (Qe = !0);
        else
          return t.lanes = e.lanes, Nl(e, t, n);
    }
    return $s(
      e,
      t,
      l,
      a,
      n
    );
  }
  function Kd(e, t, l, a) {
    var n = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, e !== null) {
          for (a = t.child = e.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return Jd(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Si(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? ko(t, u) : js(), Fo(t);
      else
        return a = t.lanes = 536870912, Jd(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Si(t, u.cachePool), ko(t, u), $l(), t.memoizedState = null) : (e !== null && Si(t, null), js(), $l());
    return Ve(e, t, n, l), t.child;
  }
  function vu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Jd(e, t, l, a, n) {
    var u = ps();
    return u = u === null ? null : { parent: Ge._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Si(t, null), js(), Fo(t), e !== null && Sa(e, t, a, !0), t.childLanes = n, null;
  }
  function qi(e, t) {
    return t = Li(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function $d(e, t, l) {
    return Ea(t, e.child, null, l), e = qi(t, t.pendingProps), e.flags |= 2, Et(t), t.memoizedState = null, e;
  }
  function Wy(e, t, l) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ie) {
        if (a.mode === "hidden")
          return e = qi(t, a), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, vu(null, e);
        if (Es(t), (e = Ce) ? (e = Sm(
          e,
          qt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ll !== null ? { id: el, overflow: tl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Do(e), l.return = t, t.child = l, Fe = t, Ce = null)) : e = null, e === null) throw Yl(t);
        return t.lanes = 536870912, null;
      }
      return qi(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Es(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = $d(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Qe || Sa(e, t, l, !1), n = (l & e.childLanes) !== 0, Qe || n) {
        if (Kl.current === null) {
          if (a = Ae, a !== null && (i = Mf(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, ya(e, i), St(a, e, i), Js;
          ac();
        }
        t = $d(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, Ce = Bt(i.nextSibling), Fe = t, ie = !0, Bl = null, qt = !1, e !== null && Ro(t, e), t = qi(t, a), t.flags |= 134221824;
      return t;
    }
    return e = _l(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function cn(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function $s(e, t, l, a, n) {
    return ba(t), l = Cs(
      e,
      t,
      l,
      a,
      void 0,
      n
    ), a = ws(), e !== null && !Qe ? (Ds(e, t, n), Nl(e, t, n)) : (ie && a && hi(t), t.flags |= 1, Ve(e, t, l, n), t.child);
  }
  function kd(e, t, l, a, n, u) {
    return ba(t), t.updateQueue = null, l = Io(
      t,
      a,
      l,
      n
    ), Wo(e), a = ws(), e !== null && !Qe ? (Ds(e, t, u), Nl(e, t, u)) : (ie && a && hi(t), t.flags |= 1, Ve(e, t, l, u), t.child);
  }
  function Fd(e, t, l, a, n) {
    if (ba(t), t.stateNode === null) {
      var u = Fa, i = l.contextType;
      typeof i == "object" && i !== null && (u = tt(i)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Vs, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Ss(t), i = l.contextType, u.context = typeof i == "object" && i !== null ? tt(i) : Fa, u.state = t.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Zs(
        t,
        l,
        i,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Vs.enqueueReplaceState(u, u.state, null), su(t, a, u, n), cu(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var r = t.memoizedProps, v = za(l, r);
      u.props = v;
      var b = u.context, j = l.contextType;
      i = Fa, typeof j == "object" && j !== null && (i = tt(j));
      var w = l.getDerivedStateFromProps;
      j = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = t.pendingProps !== r, j || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || b !== i) && Hd(
        t,
        u,
        a,
        i
      ), Ql = !1;
      var p = t.memoizedState;
      u.state = p, su(t, a, u, n), cu(), b = t.memoizedState, r || p !== b || Ql ? (typeof w == "function" && (Zs(
        t,
        l,
        w,
        a
      ), b = t.memoizedState), (v = Ql || Ud(
        t,
        l,
        v,
        a,
        p,
        b,
        i
      )) ? (j || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = b), u.props = a, u.state = b, u.context = i, a = v) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, bs(e, t), i = t.memoizedProps, j = za(l, i), u.props = j, w = t.pendingProps, p = u.context, b = l.contextType, v = Fa, typeof b == "object" && b !== null && (v = tt(b)), r = l.getDerivedStateFromProps, (b = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== w || p !== v) && Hd(
        t,
        u,
        a,
        v
      ), Ql = !1, p = t.memoizedState, u.state = p, su(t, a, u, n), cu();
      var T = t.memoizedState;
      i !== w || p !== T || Ql || e !== null && e.dependencies !== null && pi(e.dependencies) ? (typeof r == "function" && (Zs(
        t,
        l,
        r,
        a
      ), T = t.memoizedState), (j = Ql || Ud(
        t,
        l,
        j,
        a,
        p,
        T,
        v
      ) || e !== null && e.dependencies !== null && pi(e.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, v), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        v
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = T), u.props = a, u.state = T, u.context = v, a = j) : (typeof u.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, cn(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = Ea(
      t,
      e.child,
      null,
      n
    ), t.child = Ea(
      t,
      null,
      l,
      n
    )) : Ve(e, t, l, n), t.memoizedState = u.state, e = t.child) : e = Nl(
      e,
      t,
      n
    ), e;
  }
  function Wd(e, t, l, a) {
    return pa(), t.flags |= 256, Ve(e, t, l, a), t.child;
  }
  var ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fs(e) {
    return { baseLanes: e, cachePool: Yo() };
  }
  function Ws(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Ct), e;
  }
  function Id(e, t, l) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ie) {
        if (n ? Jl(t) : $l(), (e = Ce) ? (e = Sm(
          e,
          qt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ll !== null ? { id: el, overflow: tl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Do(e), l.return = t, t.child = l, Fe = t, Ce = null)) : e = null, e === null) throw Yl(t);
        return Fr(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? ($l(), n = t.mode, u = Li(
        { mode: "hidden", children: u },
        n
      ), a = ga(
        a,
        n,
        l,
        null
      ), u.return = t, a.return = t, u.sibling = a, t.child = u, a = t.child, a.memoizedState = Fs(l), a.childLanes = Ws(
        e,
        i,
        l
      ), t.memoizedState = ks, vu(null, a)) : (Jl(t), Is(t, u));
    }
    var r = e.memoizedState;
    if (r !== null) {
      var v = r.dehydrated;
      if (v !== null)
        return Iy(
          e,
          t,
          u,
          i,
          a,
          v,
          r,
          l
        );
    }
    return n ? ($l(), n = a.fallback, u = t.mode, r = e.child, v = r.sibling, a = _l(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 1206910976, v !== null ? n = _l(v, n) : (n = ga(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = t, a.return = t, a.sibling = n, t.child = a, vu(null, a), a = t.child, n = e.child.memoizedState, n === null ? n = Fs(l) : (u = n.cachePool, u !== null ? (r = Ge._currentValue, u = u.parent !== r ? { parent: r, pool: r } : u) : u = Yo(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Ws(
      e,
      i,
      l
    ), t.memoizedState = ks, vu(e.child, a)) : (Jl(t), l = e.child, e = l.sibling, l = _l(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Is(e, t) {
    return t = Li(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Li(e, t) {
    return e = yt(22, e, null, t), e.lanes = 0, e;
  }
  function Bi(e, t, l) {
    return Ea(t, e.child, null, l), e = Is(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Iy(e, t, l, a, n, u, i, r) {
    if (l)
      return t.flags & 256 ? (Jl(t), t.flags &= -257, Bi(
        e,
        t,
        r
      )) : t.memoizedState !== null ? ($l(), t.child = e.child, t.flags |= 128, null) : ($l(), u = n.fallback, i = t.mode, n = Li(
        { mode: "visible", children: n.children },
        i
      ), u = ga(
        u,
        i,
        r,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Ea(t, e.child, null, r), n = t.child, n.memoizedState = Fs(r), n.childLanes = Ws(
        e,
        a,
        r
      ), t.memoizedState = ks, vu(null, n));
    if (Jl(t), Fr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var v = a.dgst;
      return a = v, a !== "" && (n = Error(o(419)), n.stack = "", n.digest = a, tu({ value: n, source: null, stack: null })), Bi(
        e,
        t,
        r
      );
    }
    if (Qe || Sa(e, t, r, !1), a = (r & e.childLanes) !== 0, Qe || a) {
      if (Kl.current !== null)
        return Bi(
          e,
          t,
          r
        );
      if (a = Ae, a !== null && (n = Mf(
        a,
        r
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, ya(e, n), St(a, e, n), Js;
      return kr(u) || ac(), Bi(
        e,
        t,
        r
      );
    }
    return kr(u) ? (t.flags |= 192, t.child = e.child, null) : (e = i.treeContext, Ce = Bt(u.nextSibling), Fe = t, ie = !0, Bl = null, qt = !1, e !== null && Ro(t, e), t = Is(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function Pd(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), gi(e.return, t, l);
  }
  function ev(e) {
    for (var t = null; e !== null; ) {
      var l = e.alternate;
      l !== null && Ei(l) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Yi(e, t, l, a, n, u) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = l, i.tailMode = n, i.treeForkCount = u);
  }
  function Ps(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var l = t.sibling;
      t.sibling = e.child, e.child = t, t = l;
    }
  }
  function er(e, t, l) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = at.current;
    if (t.flags & 128)
      return ru(t, i), null;
    var r = (i & 2) !== 0;
    if (r ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, ru(t, i), n === "backwards" && e !== null ? (Ps(e), Ve(e, t, a, l), Ps(e)) : Ve(e, t, a, l), a = ie ? eu : 0, !r && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Pd(e, l, t);
        else if (e.tag === 19)
          Pd(e, l, t);
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
        l = ev(t.child), l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null, Ps(t)), Yi(
          t,
          !0,
          n,
          null,
          u,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && Ei(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = l, l = n, n = e;
        }
        Yi(
          t,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Yi(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        l = ev(t.child), l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), Yi(
          t,
          !1,
          n,
          l,
          u,
          a
        );
    }
    return t.child;
  }
  function tv(e, t, l) {
    var a = t.pendingProps;
    return Gl(t, t.type, a.value), Ve(e, t, a.children, l), t.child;
  }
  function Nl(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), Il |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Sa(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, l = _l(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = _l(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function tr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && pi(e)));
  }
  function Py(e, t, l) {
    switch (t.tag) {
      case 3:
        Vu(t, t.stateNode.containerInfo), Gl(t, Ge, e.memoizedState.cache), pa();
        break;
      case 27:
      case 5:
        zc(t);
        break;
      case 4:
        Vu(t, t.stateNode.containerInfo);
        break;
      case 10:
        Gl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Es(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Jl(t), t.flags |= 128, null;
          a = Sa(
            e,
            t,
            l,
            !1
          );
          var n = t.child.childLanes;
          return a || (l & n) !== 0 ? Id(e, t, l) : (Jl(t), e = Nl(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        }
        Jl(t);
        break;
      case 19:
        if (t.flags & 128)
          return er(
            e,
            t,
            l
          );
        if (n = (e.flags & 128) !== 0, a = (l & t.childLanes) !== 0, a || (Sa(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), n) {
          if (a)
            return er(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), ru(t, at.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Kd(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        Gl(t, Ge, e.memoizedState.cache);
    }
    return Nl(e, t, l);
  }
  function lv(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Qe = !0;
      else {
        if (!tr(e, l) && (t.flags & 128) === 0)
          return Qe = !1, Py(
            e,
            t,
            l
          );
        Qe = (e.flags & 131072) !== 0;
      }
    else
      Qe = !1, ie && (t.flags & 1048576) !== 0 && Mo(t, eu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = ja(t.elementType), t.type = e, typeof e == "function")
            ss(e) ? (a = za(e, a), t.tag = 1, t = Fd(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = $s(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === B) {
                t.tag = 11, t = Qd(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === Ee) {
                t.tag = 14, t = Zd(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (n === $e) {
                t.tag = 10, t.type = e, t = tv(
                  null,
                  t,
                  l
                );
                break e;
              }
            }
            throw t = me(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return $s(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return a = t.type, n = za(
          a,
          t.pendingProps
        ), Fd(
          e,
          t,
          a,
          n,
          l
        );
      case 3:
        e: {
          if (Vu(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, bs(e, t), su(t, a, null, l);
          var i = t.memoizedState;
          if (a = i.cache, Gl(t, Ge, a), a !== u.cache && hs(
            t,
            [Ge],
            l,
            !0
          ), cu(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Wd(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== n) {
              n = Rt(
                Error(o(424)),
                t
              ), tu(n), t = Wd(
                e,
                t,
                a,
                l
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
              for (Ce = Bt(e.firstChild), Fe = t, ie = !0, Bl = null, qt = !0, l = Ko(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
            }
          else {
            if (pa(), a === n) {
              t = Nl(
                e,
                t,
                l
              );
              break e;
            }
            Ve(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return cn(e, t), e === null ? (l = Am(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : ie || (t.stateNode = im(
          t.type,
          t.pendingProps,
          Ml.current,
          t
        )) : t.memoizedState = Am(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return zc(t), e === null && ie && (a = t.stateNode = Tm(
          t.type,
          t.pendingProps,
          Ml.current
        ), Fe = t, qt = !0, n = Ce, la(t.type) ? (Wr = n, Ce = Bt(a.firstChild)) : Ce = n), Ve(
          e,
          t,
          t.pendingProps.children,
          l
        ), cn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ie && ((n = a = Ce) && (a = Jg(
          a,
          t.type,
          t.pendingProps,
          qt
        ), a !== null ? (t.stateNode = a, Fe = t, Ce = Bt(a.firstChild), qt = !1, n = !0) : n = !1), n || Yl(t)), zc(t), n = t.type, u = t.pendingProps, i = e !== null ? e.memoizedProps : null, a = u.children, Xr(n, u) ? a = null : i !== null && Xr(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = Cs(
          e,
          t,
          Xy,
          null,
          null,
          l
        ), Nn._currentValue = n), cn(e, t), Ve(e, t, a, l), t.child;
      case 6:
        return e === null && ie && ((e = l = Ce) && (l = $g(
          l,
          t.pendingProps,
          qt
        ), l !== null ? (t.stateNode = l, Fe = t, Ce = null, e = !0) : e = !1), e || Yl(t)), null;
      case 13:
        return Id(e, t, l);
      case 4:
        return Vu(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Ea(
          t,
          null,
          a,
          l
        ) : Ve(e, t, a, l), t.child;
      case 11:
        return Qd(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return a = t.pendingProps, cn(e, t), Ve(e, t, a, l), t.child;
      case 8:
        return Ve(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Ve(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return tv(e, t, l);
      case 9:
        return n = t.type._context, a = t.pendingProps.children, ba(t), n = tt(n), a = a(n), t.flags |= 1, Ve(e, t, a, l), t.child;
      case 14:
        return Zd(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Vd(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return er(e, t, l);
      case 31:
        return Wy(e, t, l);
      case 22:
        return Kd(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return ba(t), a = tt(Ge), e === null ? (n = ps(), n === null && (n = Ae, u = ys(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), t.memoizedState = { parent: a, cache: n }, Ss(t), Gl(t, Ge, n)) : ((e.lanes & l) !== 0 && (bs(e, t), su(t, null, null, l), cu()), n = e.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Gl(t, Ge, a)) : (a = u.cache, Gl(t, Ge, a), a !== n.cache && hs(
          t,
          [Ge],
          l,
          !0
        ))), Ve(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = t.pendingProps, a.name != null && a.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : ie && hi(t), e !== null && e.memoizedProps.name !== a.name ? t.flags |= 4194816 : cn(e, t), Ve(e, t, a.children, l), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function El(e) {
    e.flags |= 4;
  }
  function lr(e, t, l, a, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = l === null ? Dm(t, a) : Dm(t, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (qv()) e.flags |= 8192;
        else
          throw Na = xi, _s;
    } else e.flags &= -16777217;
  }
  function av(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Om(t))
      if (qv()) e.flags |= 8192;
      else
        throw Na = xi, _s;
  }
  function Gi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? wf() : 536870912, e.lanes |= t, dn |= t);
  }
  function mu(e, t) {
    if (!ie)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var l = e.tail, a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (t = e.tail, l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
      }
  }
  function we(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function eg(e, t, l) {
    var a = t.pendingProps;
    switch (os(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return we(t), null;
      case 1:
        return we(t), null;
      case 3:
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), xl(Ge), qa(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Pa(t) ? El(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vs())), we(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (El(t), u !== null ? (we(t), av(t, u)) : (we(t), lr(
          t,
          n,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (El(t), we(t), av(t, u)) : (we(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && El(t), we(t), lr(
          t,
          n,
          e,
          a,
          l
        )), null;
      case 27:
        if (Ku(t), l = Ml.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && El(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return we(t), t.subtreeFlags &= -33554433, null;
          }
          e = It.current, Pa(t) ? Uo(t) : (e = Tm(n, a, l), t.stateNode = e, El(t));
        }
        return we(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Ku(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && El(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return we(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = It.current, Pa(t))
            Uo(t);
          else {
            var i = Nu(
              Ml.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[et] = t, u[ht] = a;
            e: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break e;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break e;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = u;
            e: switch (ut(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && El(t);
          }
        }
        return we(t), t.subtreeFlags &= -33554433, lr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && El(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = Ml.current, Pa(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, n = Fe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            e[et] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || lm(e.nodeValue, l)), e || Yl(t, !0);
          } else
            e = Nu(e).createTextNode(
              a
            ), e[et] = t, t.stateNode = e;
        }
        return we(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = Pa(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[et] = t;
            } else
              pa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), e = !1;
          } else
            l = vs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Et(t), t) : (Et(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return we(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = Pa(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[et] = t;
            } else
              pa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), n = !1;
          } else
            n = vs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (Et(t), t) : (Et(t), null);
        }
        return Et(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Gi(t, t.updateQueue), we(t), null);
      case 4:
        return qa(), e === null && qr(t.stateNode.containerInfo), t.flags |= 67108864, we(t), null;
      case 10:
        return xl(t.type), we(t), null;
      case 19:
        if (As(t), a = t.memoizedState, a === null) return we(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) mu(a, !1);
          else {
            if (He !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Ei(e), u !== null) {
                  for (t.flags |= 128, mu(a, !1), e = u.updateQueue, t.updateQueue = e, Gi(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    wo(l, e), l = l.sibling;
                  return ru(
                    t,
                    at.current & 1 | 2
                  ), ie && Sl(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && bt() > Pi && (t.flags |= 128, n = !0, mu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Ei(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Gi(t, e), mu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !ie)
                return we(t), null;
            } else
              2 * bt() - a.renderingStartTime > Pi && l !== 536870912 && (t.flags |= 128, n = !0, mu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        if (a.tail !== null) {
          e = a.tail;
          e: {
            for (l = e; l !== null; ) {
              if (l.alternate !== null) {
                l = !1;
                break e;
              }
              l = l.sibling;
            }
            l = !0;
          }
          return a.rendering = e, a.tail = e.sibling, a.renderingStartTime = bt(), e.sibling = null, u = at.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || ie ? ru(t, u) : (l = u, ze(lt, t), ze(at, l), ct === null && (ct = t)), ie && Sl(t, a.treeForkCount), e;
        }
        return we(t), null;
      case 22:
      case 23:
        return Et(t), Ns(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (we(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : we(t), l = t.updateQueue, l !== null && Gi(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && Pe(Ta), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), xl(Ge), we(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, we(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function tg(e, t) {
    switch (os(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return xl(Ge), qa(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ku(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Et(t), t.alternate === null)
            throw Error(o(340));
          pa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Et(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          pa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return As(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return qa(), null;
      case 10:
        return xl(t.type), null;
      case 22:
      case 23:
        return Et(t), Ns(), e !== null && Pe(Ta), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return xl(Ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function nv(e, t) {
    switch (os(t), t.tag) {
      case 3:
        xl(Ge), qa();
        break;
      case 26:
      case 27:
      case 5:
        Ku(t);
        break;
      case 4:
        qa();
        break;
      case 31:
        t.memoizedState !== null && Et(t);
        break;
      case 13:
        Et(t);
        break;
      case 19:
        As(t);
        break;
      case 10:
        xl(t.type);
        break;
      case 22:
      case 23:
        Et(t), Ns(), e !== null && Pe(Ta);
        break;
      case 24:
        xl(Ge);
    }
  }
  function hu(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, i = l.inst;
            a = u(), i.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (r) {
      be(t, t.return, r);
    }
  }
  function kl(e, t, l) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var i = a.inst, r = i.destroy;
            if (r !== void 0) {
              i.destroy = void 0, n = t;
              var v = l, b = r;
              try {
                b();
              } catch (j) {
                be(
                  n,
                  v,
                  j
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (j) {
      be(t, t.return, j);
    }
  }
  function uv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        $o(t, l);
      } catch (a) {
        be(e, e.return, a);
      }
    }
  }
  function iv(e, t, l) {
    l.props = za(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      be(e, t, a);
    }
  }
  function ll(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            var n = e.stateNode, u = gl(e.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = vm(u)), a = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var i = new Dt(e);
              S(
                e.child,
                !1,
                Vg,
                i,
                void 0,
                void 0
              ), e.stateNode = i;
            }
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
      }
    } catch (r) {
      be(e, t, r);
    }
  }
  function nt(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          be(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          be(e, t, n);
        }
      else l.current = null;
  }
  function Xi(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var l = 0; l < t.length; l++)
        _m(
          e.stateNode,
          t[l]
        );
  }
  function cv(e) {
    for (var t = e.return; t !== null && (nr(t) && _m(e.stateNode, t.stateNode), !ar(t)); )
      t = t.return;
  }
  function yu(e) {
    for (var t = e.return; t !== null && (nr(t) && Kg(e.stateNode, t.stateNode), !ar(t)); )
      t = t.return;
  }
  function ar(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function nr(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function ur(e) {
    var t = e.type, l = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      be(e, e.return, n);
    }
  }
  function ir(e, t, l) {
    try {
      var a = e.stateNode;
      Ag(a, e.type, l, t), a[ht] = t;
    } catch (n) {
      be(e, e.return, n);
    }
  }
  function sv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && la(e.type) || e.tag === 4;
  }
  function cr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || sv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && la(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function sr(e, t, l, a) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(n), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Pt)), Xi(e, a), he = !0;
    else if (n !== 4 && (n === 27 && (Xi(e, a), a = null, la(e.type) && (l = e.stateNode, t = null)), e = e.child, e !== null))
      for (sr(
        e,
        t,
        l,
        a
      ), e = e.sibling; e !== null; )
        sr(
          e,
          t,
          l,
          a
        ), e = e.sibling;
  }
  function Qi(e, t, l, a) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? l.insertBefore(n, t) : l.appendChild(n), Xi(e, a), he = !0;
    else if (n !== 4 && (n === 27 && (Xi(e, a), a = null, la(e.type) && (l = e.stateNode)), e = e.child, e !== null))
      for (Qi(
        e,
        t,
        l,
        a
      ), e = e.sibling; e !== null; )
        Qi(
          e,
          t,
          l,
          a
        ), e = e.sibling;
  }
  function rv(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ut(t, a, l), t[et] = e, t[ht] = l;
    } catch (u) {
      be(e, e.return, u);
    }
  }
  var Zi = !1, At = null;
  function fv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Zi = !0);
  }
  var al = null;
  function ov() {
    var e = al;
    return al = null, e;
  }
  var gt = 0;
  function sn(e, t, l, a, n) {
    return gt = 0, dv(
      e.child,
      t,
      l,
      a,
      n
    );
  }
  function dv(e, t, l, a, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var i = e.stateNode;
        if (a !== null) {
          var r = Vr(i);
          a.push(r), r.view && (u = !0);
        } else
          u || Vr(i).view && (u = !0);
        Zi = !0, om(
          i,
          gt === 0 ? t : t + "_" + gt,
          l
        ), gt++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || dv(
        e.child,
        t,
        l,
        a,
        n
      ) && (u = !0));
      e = e.sibling;
    }
    return u;
  }
  function nl(e, t) {
    for (; e !== null; )
      e.tag === 5 ? dm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || nl(
        e.child,
        t
      )), e = e.sibling;
  }
  function Vi(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Vi(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var l = t.name;
          t = pl(t.default, t.share), t !== "none" && (sn(
            e,
            l,
            t,
            null,
            !1
          ) || nl(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function rr(e, t) {
    if (e.tag === 30) {
      var l = e.stateNode, a = e.memoizedProps, n = gl(a, l), u = pl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? sn(e, n, u, null, !1) ? (Vi(e), l.paired || t || yn(e, a.onEnter)) : nl(e.child, !1) : Vi(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        rr(e, t), e = e.sibling;
    else Vi(e);
  }
  function fr(e) {
    if (At !== null && At.size !== 0) {
      var t = At;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var l = e.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = t.get(a);
                if (n !== void 0) {
                  var u = pl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (sn(
                    e,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, yn(e, l.onShare)) : nl(e.child, !1)), t.delete(a), t.size === 0) break;
                }
              }
            }
            fr(e);
          }
          e = e.sibling;
        }
    }
  }
  function or(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, l = gl(t, e.stateNode), a = At !== null ? At.get(l) : void 0, n = pl(
        t.default,
        a !== void 0 ? t.share : t.exit
      );
      n !== "none" && (sn(e, l, n, null, !1) ? a !== void 0 ? (n = e.stateNode, a.paired = n, n.paired = a, At.delete(l), yn(e, t.onShare)) : yn(e, t.onExit) : nl(e.child, !1)), At !== null && fr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        or(e), e = e.sibling;
    else
      At !== null && fr(e);
  }
  function vv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, l = gl(t, e.stateNode);
        t = pl(t.default, t.update), e.flags &= -5, t !== "none" && sn(
          e,
          l,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && vv(e);
      e = e.sibling;
    }
  }
  function dr(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, nl(e.child, !1));
          }
          dr(e);
        }
        e = e.sibling;
      }
  }
  function Ki(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, nl(e.child, !1), dr(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Ki(e), e = e.sibling;
    else dr(e);
  }
  function mv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? nl(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && mv(e), e = e.sibling;
  }
  function vr(e, t, l, a, n, u, i) {
    for (var r = !1; t !== null; ) {
      if (t.tag === 5) {
        var v = t.stateNode;
        if (u !== null && gt < u.length) {
          var b = u[gt], j = Vr(v);
          (b.view || j.view) && (r = !0);
          var w;
          if (w = (e.flags & 4) === 0)
            if (j.clip) w = !0;
            else {
              w = b.rect;
              var p = j.rect;
              w = w.y !== p.y || w.x !== p.x || w.height !== p.height || w.width !== p.width;
            }
          w && (e.flags |= 4), j.abs ? j = !b.abs : (b = b.rect, j = j.rect, j = b.height !== j.height || b.width !== j.width), j && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && om(
          v,
          gt === 0 ? l : l + "_" + gt,
          n
        ), r && (e.flags & 4) !== 0 || (al === null && (al = []), al.push(
          v,
          gt === 0 ? a : a + "_" + gt,
          t.memoizedProps
        )), gt++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && i ? e.flags |= t.flags & 32 : vr(
        e,
        t.child,
        l,
        a,
        n,
        u,
        i
      ) && (r = !0));
      t = t.sibling;
    }
    return r;
  }
  function hv(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var l = e.memoizedProps, a = e.stateNode, n = gl(l, a), u = pl(l.default, l.update), i;
        i = e.memoizedState, e.memoizedState = null, a = e;
        var r = e.child;
        gt = 0, n = vr(
          a,
          r,
          n,
          n,
          u,
          i,
          !1
        ), (e.flags & 4) !== 0 && n && yn(e, l.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && hv(e);
      e = e.sibling;
    }
  }
  var We = !1, _e = !1, ul = !1, mr = !1, yv = typeof WeakSet == "function" ? WeakSet : Set, Ie = null, il = !1, gu = !1, Ji = !1, hr = !1;
  function lg(e, t, l) {
    if (e = e.containerInfo, Yr = En, e = So(e), ts(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var u = n.anchorOffset, i = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break e;
            }
            var r = 0, v = -1, b = -1, j = 0, w = 0, p = e, T = null;
            t: for (; ; ) {
              for (var q; p !== a || u !== 0 && p.nodeType !== 3 || (v = r + u), p !== i || n !== 0 && p.nodeType !== 3 || (b = r + n), p.nodeType === 3 && (r += p.nodeValue.length), (q = p.firstChild) !== null; )
                T = p, p = q;
              for (; ; ) {
                if (p === e) break t;
                if (T === a && ++j === u && (v = r), T === i && ++w === n && (b = r), (q = p.nextSibling) !== null) break;
                p = T, T = p.parentNode;
              }
              p = q;
            }
            a = v === -1 || b === -1 ? null : { start: v, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Gr = { focusedElem: e, selectionRange: a }, En = !1, l = (l & 335544064) === l, Ie = t, t = l ? 9270 : 1024; Ie !== null; ) {
      if (e = Ie, l && (a = e.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && or(a[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        l && fv(e), $i(l);
      else {
        if (e.tag === 22) {
          if (a = e.alternate, e.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && or(a), $i(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && fv(e), $i(l);
            continue;
          }
        }
        a = e.child, (e.subtreeFlags & t) !== 0 && a !== null ? (a.return = e, Ie = a) : (l && vv(e), $i(l));
      }
    }
    At = null;
  }
  function $i(e) {
    for (; Ie !== null; ) {
      var t = Ie, l = e, a = t.alternate, n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((n & 1024) !== 0 && a !== null) {
            l = void 0, n = a.memoizedProps, a = a.memoizedState;
            var u = t.stateNode;
            try {
              var i = za(
                t.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (r) {
              be(t, t.return, r);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = t.stateNode.containerInfo, l = a.nodeType, l === 9)
              $r(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  $r(a);
                  break;
                default:
                  a.textContent = "";
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
          l && a !== null && (l = gl(
            a.memoizedProps,
            a.stateNode
          ), n = t.memoizedProps, n = pl(n.default, n.update), n !== "none" && sn(
            a,
            l,
            n,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(o(163));
      }
      if (a = t.sibling, a !== null) {
        a.return = t.return, Ie = a;
        break;
      }
      Ie = t.return;
    }
  }
  function gv(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        cl(e, l), a & 4 && hu(5, l);
        break;
      case 1:
        if (cl(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (i) {
              be(l, l.return, i);
            }
          else {
            var n = za(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                n,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              be(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && uv(l), a & 512 && ll(l, l.return);
        break;
      case 3:
        if (cl(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            $o(e, t);
          } catch (i) {
            be(l, l.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && rv(l);
      case 26:
      case 5:
        cl(e, l), t === null && a & 4 && ur(l), a & 512 && ll(l, l.return);
        break;
      case 12:
        cl(e, l);
        break;
      case 31:
        cl(e, l), a & 4 && bv(e, l);
        break;
      case 13:
        cl(e, l), a & 4 && xv(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = mg.bind(
          null,
          l
        ), kg(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || We, !a) {
          var u = t !== null && t.memoizedState !== null || _e;
          t = We, n = _e, We = a, (_e = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), Jt(
            e,
            l,
            a
          )) : cl(e, l), We = t, _e = n;
        }
        break;
      case 30:
        cl(e, l), a & 512 && ll(l, l.return);
        break;
      case 7:
        a & 512 && ll(l, l.return);
      default:
        cl(e, l);
    }
  }
  function yr(e, t) {
    for (e = e.child; e !== null; )
      pv(e, t), e = e.sibling;
  }
  function pv(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var l = e.stateNode;
          if (t) {
            var a = l.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var n = e.stateNode, u = e.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (v) {
          be(e, e.return, v);
        }
        gr(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, he = !0;
        } catch (v) {
          be(e, e.return, v);
        }
        break;
      case 18:
        try {
          var r = e.stateNode;
          t ? fm(r, !0) : fm(e.stateNode, !1);
        } catch (v) {
          be(e, e.return, v);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && yr(e, t);
        break;
      default:
        yr(e, t);
    }
  }
  function gr(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var l = e, a = t;
          switch (l.tag) {
            case 4:
              pv(l, a);
              break e;
            case 22:
              l.memoizedState === null && gr(l, a);
              break e;
            default:
              gr(l, a);
          }
        }
        e = e.sibling;
      }
  }
  function _v(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, _v(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Pu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Me = null, pt = !1;
  function Vt(e, t, l) {
    for (l = l.child; l !== null; )
      Sv(e, t, l), l = l.sibling;
  }
  function Sv(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Yn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        _e || nt(l, t), Vt(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !_e && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        _e || nt(l, t), yu(l);
        var a = Me, n = pt;
        la(l.type) && (Me = l.stateNode, pt = !1), Vt(
          e,
          t,
          l
        ), jm(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), Me = a, pt = n;
        break;
      case 5:
        _e || nt(l, t), yu(l);
      case 6:
        if (l.tag === 6 && yu(l), a = Me, n = pt, Me = null, Vt(
          e,
          t,
          l
        ), Me = a, pt = n, Me !== null)
          if (pt)
            try {
              (Me.nodeType === 9 ? Me.body : Me.nodeName === "HTML" ? Me.ownerDocument.body : Me).removeChild(l.stateNode), he = !0;
            } catch (u) {
              be(
                l,
                t,
                u
              );
            }
          else
            try {
              Me.removeChild(l.stateNode), he = !0;
            } catch (u) {
              be(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Me !== null && (pt ? (e = Me, rm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), An(e)) : rm(Me, l.stateNode));
        break;
      case 4:
        a = Me, n = pt, Me = l.stateNode.containerInfo, pt = !0, Vt(
          e,
          t,
          l
        ), Me = a, pt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        kl(2, l, t), _e || kl(4, l, t), Vt(
          e,
          t,
          l
        );
        break;
      case 1:
        _e || (nt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && iv(
          l,
          t,
          a
        )), Vt(
          e,
          t,
          l
        );
        break;
      case 21:
        Vt(
          e,
          t,
          l
        );
        break;
      case 22:
        _e = (a = _e) || l.memoizedState !== null, Vt(
          e,
          t,
          l
        ), _e = a;
        break;
      case 30:
        nt(l, t), Vt(
          e,
          t,
          l
        );
        break;
      case 7:
        _e || nt(l, t), Vt(
          e,
          t,
          l
        );
        break;
      default:
        Vt(
          e,
          t,
          l
        );
    }
  }
  function bv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        An(e);
      } catch (l) {
        be(t, t.return, l);
      }
    }
  }
  function xv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        An(e);
      } catch (l) {
        be(t, t.return, l);
      }
  }
  function ag(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new yv()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new yv()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ki(e, t) {
    var l = ag(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = hg.bind(null, e, a);
        a.then(n, n);
      }
    });
  }
  function ot(e, t, l) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = e, r = t, v = r;
        e: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (la(v.type)) {
                Me = v.stateNode, pt = !1;
                break e;
              }
              break;
            case 5:
              Me = v.stateNode, pt = !1;
              break e;
            case 3:
            case 4:
              Me = v.stateNode.containerInfo, pt = !0;
              break e;
          }
          v = v.return;
        }
        if (Me === null) throw Error(o(160));
        Sv(i, r, u), Me = null, pt = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Tv(t, e, l), t = t.sibling;
  }
  var Kt = null;
  function Tv(e, t, l) {
    var a = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (a = e.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var u = 0; u < a.length; u++) {
            var i = a[u];
            i.ref.impl = i.nextImpl;
          }
        ot(t, e, l), dt(e), n & 4 && (kl(3, e, e.return), hu(3, e), kl(5, e, e.return));
        break;
      case 1:
        ot(t, e, l), dt(e), n & 512 && (_e || a === null || nt(a, a.return)), n & 64 && We && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? t : l.concat(t))));
        break;
      case 26:
        if (u = Kt, ot(t, e, l), dt(e), n & 512 && (_e || a === null || nt(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null)
                if (We)
                  e.stateNode = im(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, l = e.memoizedProps, n = u.ownerDocument || u;
                    t: switch (t) {
                      case "title":
                        a = n.getElementsByTagName("title")[0], (!a || a[Qn] || a[et] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(t), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), ut(a, t, l), a[et] = e, ke(a), t = a;
                        break e;
                      case "link":
                        if (u = wm(
                          "link",
                          "href",
                          n
                        ).get(t + (l.href || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && a.getAttribute("rel") === (l.rel == null ? null : l.rel) && a.getAttribute("title") === (l.title == null ? null : l.title) && a.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              u.splice(i, 1);
                              break t;
                            }
                        }
                        a = n.createElement(t), ut(a, t, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = wm(
                          "meta",
                          "content",
                          n
                        ).get(t + (l.content || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("content") === (l.content == null ? null : "" + l.content) && a.getAttribute("name") === (l.name == null ? null : l.name) && a.getAttribute("property") === (l.property == null ? null : l.property) && a.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && a.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              u.splice(i, 1);
                              break t;
                            }
                        }
                        a = n.createElement(t), ut(a, t, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    a[et] = e, ke(a), t = a;
                  }
                  e.stateNode = t;
                }
              else
                We || tf(u, e.type, e.stateNode);
            else
              e.stateNode = Cm(
                u,
                l,
                e.memoizedProps
              );
          else
            n !== l ? (n === null ? (t = a.stateNode, t === null || _e || t.parentNode.removeChild(t)) : n.count--, l === null ? We || tf(u, e.type, e.stateNode) : Cm(u, l, e.memoizedProps)) : l === null && e.stateNode !== null && ir(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        ot(t, e, l), dt(e), n & 512 && (_e || a === null || nt(a, a.return)), a !== null && n & 4 && ir(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = ul, ul = !1, ot(t, e, l), ul = u, dt(e), n & 512 && (_e || a === null || nt(a, a.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Qa(t, ""), he = !0;
          } catch (j) {
            be(e, e.return, j);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, ir(
          e,
          t,
          a !== null ? a.memoizedProps : t
        )), n & 1024 && (mr = !0);
        break;
      case 6:
        if (ot(t, e, l), dt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = t, he = !0;
          } catch (j) {
            be(e, e.return, j);
          }
        }
        break;
      case 3:
        if (he = !1, fc = null, u = Kt, Kt = Eu(t.containerInfo), ot(t, e, l), Kt = u, dt(e), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            An(t.containerInfo);
          } catch (j) {
            be(e, e.return, j);
          }
        mr && (mr = !1, jv(e)), he = !1;
        break;
      case 4:
        n = ul, ul = We, a = Qf(), u = Kt, Kt = Eu(
          e.stateNode.containerInfo
        ), ot(t, e, l), dt(e), Kt = u, he && gu && (Ji = !0), he = a, ul = n;
        break;
      case 12:
        ot(t, e, l), dt(e);
        break;
      case 31:
        ot(t, e, l), dt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ki(e, t)));
        break;
      case 13:
        ot(t, e, l), dt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Ii = bt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ki(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var r = We, v = _e, b = ul;
        We = r || u, ul = b || u, _e = v || i, ot(t, e, l), _e = v, ul = b, We = r, dt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || a === null || i || We || _e || (t = i || _e, l = We, a = _e, We = u || We, _e = t, Fl(e, 2), We = l, _e = a), !u && ul || yr(e, u)), n & 4 && (t = e.updateQueue, t !== null && (l = t.retryQueue, l !== null && (t.retryQueue = null, ki(e, l))));
        break;
      case 19:
        ot(t, e, l), dt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ki(e, t)));
        break;
      case 30:
        n & 512 && (_e || a === null || nt(a, a.return)), n = Qf(), u = gu, i = (l & 335544064) === l, r = e.memoizedProps, gu = i && pl(
          r.default,
          r.update
        ) !== "none", ot(t, e, l), dt(e), i && a !== null && he && (e.flags |= 4), gu = u, he = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (_e || a === null || nt(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = e);
      default:
        ot(t, e, l), dt(e);
    }
  }
  function dt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (sv(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = e.return; n !== null; ) {
          if (nr(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (ar(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var r = l.stateNode, v = cr(e);
            Qi(
              e,
              v,
              r,
              i
            );
            break;
          case 5:
            var b = l.stateNode;
            l.flags & 32 && (Qa(b, ""), l.flags &= -33);
            var j = cr(e);
            Qi(
              e,
              j,
              b,
              i
            );
            break;
          case 3:
          case 4:
            var w = l.stateNode.containerInfo, p = cr(e);
            sr(
              e,
              p,
              w,
              i
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        be(e, e.return, T);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        jv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, En = !0, t.reset(), En = !1), e = e.sibling;
      }
  }
  function rn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Nv(t, e), t = t.sibling;
    else hv(t);
  }
  function Nv(e, t) {
    var l = e.alternate;
    if (l === null) rr(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (hr = il = !1, ov(), rn(t, e), !il && !Ji) {
            if (e = al, e !== null)
              for (var a = 0; a < e.length; a += 3) {
                l = e[a];
                var n = e[a + 1];
                dm(l, e[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
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
            )), hr = !0;
          }
          al = null;
          break;
        case 5:
          rn(t, e);
          break;
        case 4:
          a = il, il = !1, rn(t, e), il && (Ji = !0), il = a;
          break;
        case 22:
          e.memoizedState === null && (l.memoizedState !== null ? rr(e, !1) : rn(t, e));
          break;
        case 30:
          a = il, n = ov(), il = !1, rn(t, e), il && (e.flags |= 4);
          var u = e.memoizedProps, i = e.stateNode;
          t = gl(u, i), i = gl(l.memoizedProps, i);
          var r = pl(u.default, u.update);
          r === "none" ? t = !1 : (u = l.memoizedState, l.memoizedState = null, l = e.child, gt = 0, t = vr(
            e,
            l,
            t,
            i,
            r,
            u,
            !0
          ), gt !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (yn(
            e,
            e.memoizedProps.onUpdate
          ), al = n) : n !== null && (n.push.apply(n, al), al = n), il = (e.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          rn(t, e);
      }
  }
  function cl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        gv(e, t.alternate, t), t = t.sibling;
  }
  function Fl(e, t) {
    for (e = e.child; e !== null; ) {
      var l = e, a = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          kl(4, l, l.return), Fl(
            l,
            a
          );
          break;
        case 1:
          nt(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && iv(
            l,
            l.return,
            n
          ), Fl(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && jm(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          nt(l, l.return), l.tag !== 5 && l.tag !== 27 || yu(l), Fl(
            l,
            a
          );
          break;
        case 6:
          yu(l);
          break;
        case 26:
          nt(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || _e || n.parentNode.removeChild(n), Fl(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && Fl(
            l,
            a
          );
          break;
        case 30:
          nt(l, l.return), Fl(
            l,
            a
          );
          break;
        case 7:
          nt(l, l.return);
        default:
          Fl(
            l,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Jt(e, t, l) {
    for (l = (t.subtreeFlags & 8772) !== 0 ? l : l & -2, t = t.child; t !== null; ) {
      var a = t.alternate, n = e, u = t, i = u.flags, r = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Jt(
            n,
            u,
            l
          ), hu(4, u);
          break;
        case 1:
          if (Jt(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (j) {
              be(a, a.return, j);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var v = a.stateNode;
            try {
              var b = n.shared.hiddenCallbacks;
              if (b !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < b.length; n++)
                  Jo(b[n], v);
            } catch (j) {
              be(a, a.return, j);
            }
          }
          r && i & 64 && uv(u), ll(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && rv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || cv(u), Jt(
            n,
            u,
            l
          ), r && a === null && i & 4 && ur(u), ll(u, u.return);
          break;
        case 6:
          cv(u);
          break;
        case 26:
          v = u.stateNode, u.memoizedState !== null || v === null || We || tf(
            Eu(v.ownerDocument),
            u.type,
            v
          ), Jt(
            n,
            u,
            l
          ), r && a === null && i & 4 && ur(u), ll(u, u.return);
          break;
        case 12:
          Jt(
            n,
            u,
            l
          );
          break;
        case 31:
          Jt(
            n,
            u,
            l
          ), r && i & 4 && bv(n, u);
          break;
        case 13:
          Jt(
            n,
            u,
            l
          ), r && i & 4 && xv(n, u);
          break;
        case 22:
          u.memoizedState === null && Jt(
            n,
            u,
            l
          ), ll(u, u.return);
          break;
        case 30:
          Jt(
            n,
            u,
            l
          ), ll(u, u.return);
          break;
        case 7:
          ll(u, u.return);
        default:
          Jt(
            n,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function pr(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && lu(l));
  }
  function _r(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && lu(e));
  }
  function Lt(e, t, l, a) {
    var n = (l & 335544064) === l;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Ev(
          e,
          t,
          l,
          a
        ), t = t.sibling;
    else n && mv(t);
  }
  function Ev(e, t, l, a) {
    var n = (l & 335544064) === l;
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && Ki(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Lt(
          e,
          t,
          l,
          a
        ), u & 2048 && hu(9, t);
        break;
      case 1:
        Lt(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        Lt(
          e,
          t,
          l,
          a
        ), n && hr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && lu(u)));
        break;
      case 12:
        if (u & 2048) {
          Lt(
            e,
            t,
            l,
            a
          ), u = t.stateNode;
          try {
            var i = t.memoizedProps, r = i.id, v = i.onPostCommit;
            typeof v == "function" && v(
              r,
              t.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (b) {
            be(t, t.return, b);
          }
        } else
          Lt(
            e,
            t,
            l,
            a
          );
        break;
      case 31:
        Lt(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        Lt(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, r = t.alternate, t.memoizedState !== null ? (n && r !== null && r.memoizedState === null && Ki(r), i._visibility & 2 ? Lt(
          e,
          t,
          l,
          a
        ) : pu(
          e,
          t
        )) : (n && r !== null && r.memoizedState !== null && Ki(t), i._visibility & 2 ? Lt(
          e,
          t,
          l,
          a
        ) : (i._visibility |= 2, fn(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && pr(r, t);
        break;
      case 24:
        Lt(
          e,
          t,
          l,
          a
        ), u & 2048 && _r(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (nl(u.child, !0), nl(t.child, !0))), Lt(
          e,
          t,
          l,
          a
        );
        break;
      default:
        Lt(
          e,
          t,
          l,
          a
        );
    }
  }
  function fn(e, t, l, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, i = t, r = l, v = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          fn(
            u,
            i,
            r,
            v,
            n
          ), hu(8, i);
          break;
        case 23:
          break;
        case 22:
          var j = i.stateNode;
          i.memoizedState !== null ? j._visibility & 2 ? fn(
            u,
            i,
            r,
            v,
            n
          ) : pu(
            u,
            i
          ) : (j._visibility |= 2, fn(
            u,
            i,
            r,
            v,
            n
          )), n && b & 2048 && pr(
            i.alternate,
            i
          );
          break;
        case 24:
          fn(
            u,
            i,
            r,
            v,
            n
          ), n && b & 2048 && _r(i.alternate, i);
          break;
        default:
          fn(
            u,
            i,
            r,
            v,
            n
          );
      }
      t = t.sibling;
    }
  }
  function pu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            pu(l, a), n & 2048 && pr(
              a.alternate,
              a
            );
            break;
          case 24:
            pu(l, a), n & 2048 && _r(a.alternate, a);
            break;
          default:
            pu(l, a);
        }
        t = t.sibling;
      }
  }
  var Ca = 8192;
  function wa(e, t, l) {
    if (e.subtreeFlags & Ca)
      for (e = e.child; e !== null; )
        Av(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Av(e, t, l) {
    switch (e.tag) {
      case 26:
        wa(
          e,
          t,
          l
        ), e.flags & Ca && (e.memoizedState !== null ? r0(
          l,
          Kt,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Rm(l, e)));
        break;
      case 5:
        wa(
          e,
          t,
          l
        ), e.flags & Ca && (e = e.stateNode, (t & 335544128) === t && Rm(l, e));
        break;
      case 3:
      case 4:
        var a = Kt;
        Kt = Eu(e.stateNode.containerInfo), wa(
          e,
          t,
          l
        ), Kt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Ca, Ca = 16777216, wa(
          e,
          t,
          l
        ), Ca = a) : wa(
          e,
          t,
          l
        ));
        break;
      case 30:
        if ((e.flags & Ca) !== 0 && (a = e.memoizedProps.name, a != null && a !== "auto")) {
          var n = e.stateNode;
          n.paired = null, At === null && (At = /* @__PURE__ */ new Map()), At.set(a, n);
        }
        wa(
          e,
          t,
          l
        );
        break;
      default:
        wa(
          e,
          t,
          l
        );
    }
  }
  function zv(e) {
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
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ie = a, wv(
            a,
            e
          );
        }
      zv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Cv(e), e = e.sibling;
  }
  function Cv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        _u(e), e.flags & 2048 && kl(9, e, e.return);
        break;
      case 3:
        _u(e);
        break;
      case 12:
        _u(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fi(e)) : _u(e);
        break;
      default:
        _u(e);
    }
  }
  function Fi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          Ie = a, wv(
            a,
            e
          );
        }
      zv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, t, t.return), Fi(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Fi(t));
          break;
        default:
          Fi(t);
      }
      e = e.sibling;
    }
  }
  function wv(e, t) {
    for (; Ie !== null; ) {
      var l = Ie;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          kl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          lu(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Ie = a;
      else
        e: for (l = e; Ie !== null; ) {
          a = Ie;
          var n = a.sibling, u = a.return;
          if (_v(a), a === l) {
            Ie = null;
            break e;
          }
          if (n !== null) {
            n.return = u, Ie = n;
            break e;
          }
          Ie = u;
        }
    }
  }
  var ng = {
    getCacheForType: function(e) {
      var t = tt(Ge), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return tt(Ge).controller.signal;
    }
  }, ug = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, Ae = null, ce = null, fe = 0, Se = 0, zt = null, Wl = !1, on = !1, Sr = !1, Al = 0, He = 0, Il = 0, Da = 0, Wi = 0, Ct = 0, dn = 0, Su = null, _t = null, br = !1, Ii = 0, Dv = 0, Pi = 1 / 0, ec = null, Pl = null, Re = 0, $t = null, Oa = null, sl = 0, xr = 0, Tr = null, Ov = null, vn = null, mn = null, hn = null, bu = 0, tc = null;
  function wt() {
    return (ge & 2) !== 0 && fe !== 0 ? fe & -fe : V.T !== null ? Mr() : Rf();
  }
  function Mv() {
    if (Ct === 0)
      if ((fe & 536870912) === 0 || ie) {
        var e = ku;
        ku <<= 1, (ku & 3932160) === 0 && (ku = 262144), Ct = e;
      } else Ct = 536870912;
    return e = lt.current, e !== null && (e.flags |= 32), Ct;
  }
  function yn(e, t) {
    if (t != null) {
      var l = e.stateNode, a = l.ref;
      a === null && (a = l.ref = vm(
        gl(e.memoizedProps, l)
      )), mn === null && (mn = []), mn.push(t.bind(null, a));
    }
  }
  function St(e, t, l) {
    (e === Ae && (Se === 2 || Se === 9) || e.cancelPendingCommit !== null) && (gn(e, 0), ea(
      e,
      fe,
      Ct,
      !1
    )), Xn(e, l), ((ge & 2) === 0 || e !== Ae) && (e === Ae && ((ge & 2) === 0 && (Da |= l), He === 4 && ea(
      e,
      fe,
      Ct,
      !1
    )), rl(e));
  }
  function Rv(e, t, l) {
    if ((ge & 6) !== 0) throw Error(o(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Gn(e, t), n = a ? sg(e, t) : Nr(e, t, !0), u = a;
    do {
      if (n === 0) {
        on && !a && ea(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !ig(l)) {
          n = Nr(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = e.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            e: {
              var r = e;
              n = Su;
              var v = r.current.memoizedState.isDehydrated;
              if (v && (gn(r, i).flags |= 256), i = Nr(
                r,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (Sr && !v) {
                  r.errorRecoveryDisabledLanes |= u, Da |= u, n = 4;
                  break e;
                }
                u = _t, _t = n, u !== null && (_t === null ? _t = u : _t.push.apply(
                  _t,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          gn(e, 0), ea(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              ea(
                a,
                t,
                Ct,
                !Wl
              );
              break e;
            case 2:
              _t = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = Ii + 300 - bt(), 10 < n)) {
            if (ea(
              a,
              t,
              Ct,
              !Wl
            ), Wu(a, 0, !0) !== 0) break e;
            sl = t, a.timeoutHandle = Zr(
              Uv.bind(
                null,
                a,
                l,
                _t,
                ec,
                br,
                t,
                Ct,
                Da,
                dn,
                Wl,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Uv(
            a,
            l,
            _t,
            ec,
            br,
            t,
            Ct,
            Da,
            dn,
            Wl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    rl(e);
  }
  function Uv(e, t, l, a, n, u, i, r, v, b, j, w, p, T) {
    e.timeoutHandle = -1;
    var q = t.subtreeFlags, Z = (u & 335544064) === u;
    if (w = null, (Z || q & 8192 || (q & 16785408) === 16785408) && (w = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Pt
    }, At = null, Av(
      t,
      u,
      w
    ), Z && (q = w, Z = e.containerInfo, Z = (Z.nodeType === 9 ? Z : Z.ownerDocument).__reactViewTransition, Z != null && (q.count++, q.waitingForViewTransition = !0, q = Cu.bind(q), Z.finished.then(q, q))), q = (u & 62914560) === u ? Ii - bt() : (u & 4194048) === u ? Dv - bt() : 0, q = f0(
      w,
      q
    ), q !== null)) {
      sl = u, e.cancelPendingCommit = q(
        Qv.bind(
          null,
          e,
          t,
          u,
          l,
          a,
          n,
          i,
          r,
          v,
          b,
          j,
          w,
          null,
          p,
          T
        )
      ), ea(e, u, i, !b);
      return;
    }
    Qv(
      e,
      t,
      u,
      l,
      a,
      n,
      i,
      r,
      v,
      b,
      j,
      w
    );
  }
  function ig(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Nt(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
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
  function ea(e, t, l, a) {
    t = Cf(e, t), t &= ~Wi, t &= ~Da, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Tt(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && Df(e, l, t);
  }
  function lc() {
    return (ge & 6) === 0 ? (xu(0), !1) : !0;
  }
  function jr() {
    if (ce !== null) {
      if (Se === 0)
        var e = ce.return;
      else
        e = ce, bl = _a = null, Os(e), ln = null, uu = 0, e = ce;
      for (; e !== null; )
        nv(e.alternate, e), e = e.return;
      ce = null;
    }
  }
  function gn(e, t) {
    var l = e.timeoutHandle;
    return l !== -1 && (e.timeoutHandle = -1, wg(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), sl = 0, jr(), Ae = e, ce = l = _l(e.current, null), fe = t, Se = 0, zt = null, Wl = !1, on = Gn(e, t), Sr = !1, dn = Ct = Wi = Da = Il = He = 0, _t = Su = null, br = !1, Al = Cf(e, t), fi(), l;
  }
  function Hv(e, t) {
    ae = null, V.H = Ui, t === tn || t === bi ? (t = Qo(), Se = 3) : t === _s ? (t = Qo(), Se = 4) : Se = t === Js ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, zt = t, ce === null && (He = 1, Hi(
      e,
      Rt(t, e.current)
    ));
  }
  function qv() {
    var e = lt.current;
    return e === null ? !0 : (fe & 4194048) === fe ? ct === null : (fe & 62914560) === fe || (fe & 536870912) !== 0 ? e === ct : !1;
  }
  function Lv() {
    var e = V.H;
    return V.H = Ui, e === null ? Ui : e;
  }
  function Bv() {
    var e = V.A;
    return V.A = ng, e;
  }
  function ac() {
    He = 4, Wl || (fe & 4194048) !== fe && lt.current !== null || (on = !0), (Il & 134217727) === 0 && (Da & 134217727) === 0 || Ae === null || ea(
      Ae,
      fe,
      Ct,
      !1
    );
  }
  function Nr(e, t, l) {
    var a = ge;
    ge |= 2;
    var n = Lv(), u = Bv();
    (Ae !== e || fe !== t) && (ec = null, gn(e, t)), t = !1;
    var i = He;
    e: do
      try {
        if (Se !== 0 && ce !== null) {
          var r = ce, v = zt;
          switch (Se) {
            case 8:
              jr(), i = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              lt.current === null && (t = !0);
              var b = Se;
              if (Se = 0, zt = null, pn(e, r, v, b), l && on) {
                i = 0;
                break e;
              }
              break;
            default:
              b = Se, Se = 0, zt = null, pn(e, r, v, b);
          }
        }
        cg(), i = He;
        break;
      } catch (j) {
        Hv(e, j);
      }
    while (!0);
    return t && e.shellSuspendCounter++, bl = _a = null, ge = a, V.H = n, V.A = u, ce === null && (Ae = null, fe = 0, fi()), i;
  }
  function cg() {
    for (; ce !== null; ) Yv(ce);
  }
  function sg(e, t) {
    var l = ge;
    ge |= 2;
    var a = Lv(), n = Bv();
    Ae !== e || fe !== t ? (ec = null, Pi = bt() + 500, gn(e, t)) : on = Gn(
      e,
      t
    );
    e: do
      try {
        if (Se !== 0 && ce !== null) {
          t = ce;
          var u = zt;
          t: switch (Se) {
            case 1:
              Se = 0, zt = null, pn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Go(u)) {
                Se = 0, zt = null, Gv(t);
                break;
              }
              t = function() {
                Se !== 2 && Se !== 9 || Ae !== e || (Se = 7), rl(e);
              }, u.then(t, t);
              break e;
            case 3:
              Se = 7;
              break e;
            case 4:
              Se = 5;
              break e;
            case 7:
              Go(u) ? (Se = 0, zt = null, Gv(t)) : (Se = 0, zt = null, pn(e, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (ce.tag) {
                case 26:
                  i = ce.memoizedState;
                case 5:
                case 27:
                  var r = ce;
                  if (i ? Om(i) : r.stateNode.complete) {
                    Se = 0, zt = null;
                    var v = r.sibling;
                    if (v !== null) ce = v;
                    else {
                      var b = r.return;
                      b !== null ? (ce = b, nc(b)) : ce = null;
                    }
                    break t;
                  }
              }
              Se = 0, zt = null, pn(e, t, u, 5);
              break;
            case 6:
              Se = 0, zt = null, pn(e, t, u, 6);
              break;
            case 8:
              jr(), He = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        rg();
        break;
      } catch (j) {
        Hv(e, j);
      }
    while (!0);
    return bl = _a = null, V.H = a, V.A = n, ge = l, ce !== null ? 0 : (Ae = null, fe = 0, fi(), He);
  }
  function rg() {
    for (; ce !== null && !Eh(); )
      Yv(ce);
  }
  function Yv(e) {
    var t = lv(e.alternate, e, Al);
    e.memoizedProps = e.pendingProps, t === null ? nc(e) : ce = t;
  }
  function Gv(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = kd(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          fe
        );
        break;
      case 11:
        t = kd(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          fe
        );
        break;
      case 5:
        Os(t);
        var a = t;
        a === Fe && (ie ? (yi(a), a.tag === 5 && a.stateNode != null && (Ce = a.stateNode)) : (yi(a), ie = !0));
      default:
        nv(l, t), t = ce = wo(t, Al), t = lv(l, t, Al);
    }
    e.memoizedProps = e.pendingProps, t === null ? nc(e) : ce = t;
  }
  function pn(e, t, l, a) {
    bl = _a = null, Os(t), ln = null, uu = 0;
    var n = t.return;
    try {
      if (Fy(
        e,
        n,
        t,
        l,
        fe
      )) {
        He = 1, Hi(
          e,
          Rt(l, e.current)
        ), ce = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ce = n, u;
      He = 1, Hi(
        e,
        Rt(l, e.current)
      ), ce = null;
      return;
    }
    t.flags & 32768 ? (ie || a === 1 ? e = !0 : on || (fe & 536870912) !== 0 ? e = !1 : (Wl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = lt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Xv(t, e)) : nc(t);
  }
  function nc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Xv(
          t,
          Wl
        );
        return;
      }
      e = t.return;
      var l = eg(
        t.alternate,
        t,
        Al
      );
      if (l !== null) {
        ce = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ce = t;
        return;
      }
      ce = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function Xv(e, t) {
    do {
      var l = tg(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ce = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ce = e;
        return;
      }
      ce = e = l;
    } while (e !== null);
    He = 6, ce = null;
  }
  function Qv(e, t, l, a, n, u, i, r, v, b, j, w) {
    e.cancelPendingCommit = null;
    do
      uc();
    while (Re !== 0);
    if ((ge & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === Ae && (ce = Ae = null, fe = 0), Oa = t, $t = e, sl = l, Tr = n, Ov = a, fg(
        e,
        t,
        l,
        i,
        r,
        v,
        w
      );
    }
  }
  function fg(e, t, l, a, n, u, i) {
    var r = t.lanes | t.childLanes;
    if (xr = r, r |= is, Hh(
      e,
      l,
      r,
      a,
      n,
      u
    ), mn = null, (l & 335544064) === l ? (hn = Ly(e), a = 10262) : (hn = null, a = 10256), (t.subtreeFlags & a) !== 0 || (t.flags & a) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, yg(Ju, function() {
      return Cr(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Zi = !1, a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
      a = V.T, V.T = null, n = te.p, te.p = 2, u = ge, ge |= 4;
      try {
        lg(e, t, l);
      } finally {
        ge = u, te.p = n, V.T = a;
      }
    }
    Re = 1, Zi ? vn = Hg(
      i,
      e.containerInfo,
      hn,
      Er,
      Ar,
      dg,
      zr,
      Cr,
      og
    ) : (Er(), Ar(), zr());
  }
  function og(e) {
    if (Re !== 0) {
      var t = $t.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function dg() {
    Re === 3 && (Re = 0, Nv(Oa, $t), Re = 4);
  }
  function Er() {
    if (Re === 1) {
      Re = 0;
      var e = $t, t = Oa, l = sl, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = V.T, V.T = null;
        var n = te.p;
        te.p = 2;
        var u = ge;
        ge |= 4;
        try {
          gu = Ji = !1, Tv(t, e, l), l = Gr;
          var i = So(e.containerInfo), r = l.focusedElem, v = l.selectionRange;
          if (i !== r && r && r.ownerDocument && _o(
            r.ownerDocument.documentElement,
            r
          )) {
            if (v !== null && ts(r)) {
              var b = v.start, j = v.end;
              if (j === void 0 && (j = b), "selectionStart" in r)
                r.selectionStart = b, r.selectionEnd = Math.min(
                  j,
                  r.value.length
                );
              else {
                var w = r.ownerDocument || document, p = w && w.defaultView || window;
                if (p.getSelection) {
                  var T = p.getSelection(), q = r.textContent.length, Z = Math.min(v.start, q), ne = v.end === void 0 ? Z : Math.min(v.end, q);
                  !T.extend && Z > ne && (i = ne, ne = Z, Z = i);
                  var _ = po(
                    r,
                    Z
                  ), h = po(
                    r,
                    ne
                  );
                  if (_ && h && (T.rangeCount !== 1 || T.anchorNode !== _.node || T.anchorOffset !== _.offset || T.focusNode !== h.node || T.focusOffset !== h.offset)) {
                    var x = w.createRange();
                    x.setStart(_.node, _.offset), T.removeAllRanges(), Z > ne ? (T.addRange(x), T.extend(h.node, h.offset)) : (x.setEnd(h.node, h.offset), T.addRange(x));
                  }
                }
              }
            }
            for (w = [], T = r; T = T.parentNode; )
              T.nodeType === 1 && w.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < w.length; r++) {
              var C = w[r];
              C.element.scrollLeft = C.left, C.element.scrollTop = C.top;
            }
          }
          En = !!Yr, Gr = Yr = null;
        } finally {
          ge = u, te.p = n, V.T = a;
        }
      }
      e.current = t, Re = 2;
    }
  }
  function Ar() {
    if (Re === 2) {
      Re = 0;
      var e = $t, t = Oa, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var a = te.p;
        te.p = 2;
        var n = ge;
        ge |= 4;
        try {
          gv(e, t.alternate, t);
        } finally {
          ge = n, te.p = a, V.T = l;
        }
      }
      Re = 3;
    }
  }
  function zr() {
    if (Re === 4 || Re === 3) {
      Re = 0;
      var e = vn;
      vn = null, Ah();
      var t = $t, l = Oa, a = sl, n = Ov, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? Re = 5 : (Re = 0, Oa = $t = null, Zv(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (Pl = null), qc(a), l = l.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Yn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = V.T, u = te.p, te.p = 2, V.T = null;
        try {
          for (var i = t.onRecoverableError, r = 0; r < n.length; r++) {
            var v = n[r];
            i(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          V.T = l, te.p = u;
        }
      }
      if (n = mn, i = hn, hn = null, n !== null && (mn = null, i === null && (i = []), e !== null))
        for (v = 0; v < n.length; v++)
          l = (0, n[v])(
            i
          ), l !== void 0 && e.finished.finally(l);
      (sl & 3) !== 0 && uc(), rl(t), u = t.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? t === tc ? bu++ : (bu = 0, tc = t) : (bu = 0, tc = null), xu(0);
    }
  }
  function Zv(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, lu(t)));
  }
  function uc() {
    return vn !== null && (vn.skipTransition(), vn = null), Er(), Ar(), zr(), Cr();
  }
  function Cr() {
    if (Re !== 5) return !1;
    var e = $t, t = xr;
    xr = 0;
    var l = qc(sl), a = V.T, n = te.p;
    try {
      te.p = 32 > l ? 32 : l, V.T = null, l = Tr, Tr = null;
      var u = $t, i = sl;
      if (Re = 0, Oa = $t = null, sl = 0, (ge & 6) !== 0) throw Error(o(331));
      var r = ge;
      if (ge |= 4, Cv(u.current), Ev(
        u,
        u.current,
        i,
        l
      ), ge = r, xu(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Yn, u);
        } catch {
        }
      return !0;
    } finally {
      te.p = n, V.T = a, Zv(e, t);
    }
  }
  function Vv(e, t, l) {
    t = Rt(l, t), t = Ks(e.stateNode, t, 2), e = Vl(e, t, 2), e !== null && (Xn(e, 2), rl(e));
  }
  function be(e, t, l) {
    if (e.tag === 3)
      Vv(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Vv(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Pl === null || !Pl.has(a))) {
            e = Rt(l, e), l = Gd(2), a = Vl(t, l, 2), a !== null && (Xd(
              l,
              a,
              t,
              e
            ), Xn(a, 2), rl(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function wr(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new ug();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(l) || (Sr = !0, n.add(l), e = vg.bind(null, e, t, l), t.then(e, e));
  }
  function vg(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ae === e && (fe & l) === l && ((He === 4 || He === 3 && (fe & 62914560) === fe && 300 > bt() - Ii) && (ge & 2) === 0 ? gn(e, 0) : Wi |= l, dn === fe && (dn = 0)), rl(e);
  }
  function Kv(e, t) {
    t === 0 && (t = wf()), e = ya(e, t), e !== null && (Xn(e, t), rl(e));
  }
  function mg(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Kv(e, l);
  }
  function hg(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(t), Kv(e, l);
  }
  function yg(e, t) {
    return Mc(e, t);
  }
  var _n = null, Sn = null, Dr = !1, ic = !1, Or = !1, ta = 0;
  function rl(e) {
    e !== Sn && e.next === null && (Sn === null ? _n = Sn = e : Sn = Sn.next = e), ic = !0, Dr || (Dr = !0, pg());
  }
  function xu(e, t) {
    if (!Or && ic) {
      Or = !0;
      do
        for (var l = !1, a = _n; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, r = a.pingedLanes;
              u = (1 << 31 - Tt(42 | e) + 1) - 1, u &= n & ~(i & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Fv(a, u));
          } else
            u = fe, u = Wu(
              a,
              a === Ae ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Gn(a, u) || (l = !0, Fv(a, u));
          a = a.next;
        }
      while (l);
      Or = !1;
    }
  }
  function gg() {
    Jv();
  }
  function Jv() {
    ic = Dr = !1;
    var e = 0;
    ta !== 0 && Cg() && (e = ta);
    for (var t = bt(), l = null, a = _n; a !== null; ) {
      var n = a.next, u = $v(a, t);
      u === 0 ? (a.next = null, l === null ? _n = n : l.next = n, n === null && (Sn = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (ic = !0)), a = n;
    }
    Re !== 0 && Re !== 5 || xu(e), ta !== 0 && (ta = 0);
  }
  function $v(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Tt(u), r = 1 << i, v = n[i];
      v === -1 ? ((r & l) === 0 || (r & a) !== 0) && (n[i] = Uh(r, t)) : v <= t && (e.expiredLanes |= r), u &= ~r;
    }
    if (t = Ae, l = fe, l = Wu(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (Se === 2 || Se === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && Rc(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Gn(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && Rc(a), qc(l)) {
        case 2:
        case 8:
          l = Af;
          break;
        case 32:
          l = Ju;
          break;
        case 268435456:
          l = zf;
          break;
        default:
          l = Ju;
      }
      return a = kv.bind(null, e), l = Mc(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && Rc(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function kv(e, t) {
    if (Re !== 0 && Re !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (uc() && e.callbackNode !== l)
      return null;
    var a = fe;
    return a = Wu(
      e,
      e === Ae ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (Rv(e, a, t), $v(e, bt()), e.callbackNode != null && e.callbackNode === l ? kv.bind(null, e) : null);
  }
  function Fv(e, t) {
    if (uc()) return null;
    Rv(e, t, !0);
  }
  function pg() {
    Dg(function() {
      (ge & 6) !== 0 ? Mc(
        Ef,
        gg
      ) : Jv();
    });
  }
  function Mr() {
    if (ta === 0) {
      var e = xa;
      e === 0 && (e = $u, $u <<= 1, ($u & 261888) === 0 && ($u = 256)), ta = e;
    }
    return ta;
  }
  function Wv(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : li(e);
  }
  function _g(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Wv(
        (n[ht] || null).action
      ), i = a.submitter;
      i && (t = (t = i[ht] || null) ? Wv(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var r = new ii(
        "action",
        "action",
        null,
        a,
        n
      );
      e.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ta !== 0) {
                  var v = new FormData(n, i);
                  Gs(
                    l,
                    {
                      pending: !0,
                      data: v,
                      method: n.method,
                      action: u
                    },
                    null,
                    v
                  );
                }
              } else
                typeof u == "function" && (r.preventDefault(), v = new FormData(n, i), Gs(
                  l,
                  {
                    pending: !0,
                    data: v,
                    method: n.method,
                    action: u
                  },
                  u,
                  v
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Rr = 0; Rr < us.length; Rr++) {
    var Ur = us[Rr], Sg = Ur.toLowerCase(), bg = Ur[0].toUpperCase() + Ur.slice(1);
    Zt(
      Sg,
      "on" + bg
    );
  }
  Zt(To, "onAnimationEnd"), Zt(jo, "onAnimationIteration"), Zt(No, "onAnimationStart"), Zt("dblclick", "onDoubleClick"), Zt("focusin", "onFocus"), Zt("focusout", "onBlur"), Zt(wy, "onTransitionRun"), Zt(Dy, "onTransitionStart"), Zt(Oy, "onTransitionCancel"), Zt(Eo, "onTransitionEnd"), Ga("onMouseEnter", ["mouseout", "mouseover"]), Ga("onMouseLeave", ["mouseout", "mouseover"]), Ga("onPointerEnter", ["pointerout", "pointerover"]), Ga("onPointerLeave", ["pointerout", "pointerover"]), va(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), va(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), va("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), va(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), va(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), va(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Tu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tu)
  );
  function Iv(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], n = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var r = a[i], v = r.instance, b = r.currentTarget;
            if (r = r.listener, v !== u && n.isPropagationStopped())
              break e;
            u = r, n.currentTarget = b;
            try {
              u(n);
            } catch (j) {
              ri(j);
            }
            n.currentTarget = null, u = v;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (r = a[i], v = r.instance, b = r.currentTarget, r = r.listener, v !== u && n.isPropagationStopped())
              break e;
            u = r, n.currentTarget = b;
            try {
              u(n);
            } catch (j) {
              ri(j);
            }
            n.currentTarget = null, u = v;
          }
      }
    }
  }
  function se(e, t) {
    var l = t[Hf];
    l === void 0 && (l = t[Hf] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Pv(t, e, 2, !1), l.add(a));
  }
  function Hr(e, t, l) {
    var a = 0;
    t && (a |= 4), Pv(
      l,
      e,
      a,
      t
    );
  }
  var cc = "_reactListening" + Math.random().toString(36).slice(2);
  function qr(e) {
    if (!e[cc]) {
      e[cc] = !0, Bf.forEach(function(l) {
        l !== "selectionchange" && (xg.has(l) || Hr(l, !1, e), Hr(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[cc] || (t[cc] = !0, Hr("selectionchange", !1, t));
    }
  }
  function Pv(e, t, l, a) {
    switch (Xm(t)) {
      case 2:
        var n = m0;
        break;
      case 8:
        n = h0;
        break;
      default:
        n = af;
    }
    l = n.bind(
      null,
      t,
      l,
      e
    ), n = void 0, !Vc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
      passive: n
    }) : e.addEventListener(t, l, !1);
  }
  function Lr(e, t, l, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var r = a.stateNode.containerInfo;
          if (r === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var v = i.tag;
              if ((v === 3 || v === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; r !== null; ) {
            if (i = da(r), i === null) return;
            if (v = i.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              a = u = i;
              continue e;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    If(function() {
      var b = u, j = Qc(l), w = [];
      e: {
        var p = Ao.get(e);
        if (p !== void 0) {
          var T = ii, q = e;
          switch (e) {
            case "keypress":
              if (ni(l) === 0) break e;
            case "keydown":
            case "keyup":
              T = iy;
              break;
            case "focusin":
              q = "focus", T = kc;
              break;
            case "focusout":
              q = "blur", T = kc;
              break;
            case "beforeblur":
            case "afterblur":
              T = kc;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              T = to;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = $h;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = oy;
              break;
            case To:
            case jo:
            case No:
              T = Wh;
              break;
            case Eo:
              T = vy;
              break;
            case "scroll":
            case "scrollend":
              T = Kh;
              break;
            case "wheel":
              T = hy;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = Ph;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = ao;
              break;
            case "submit":
              T = ry;
              break;
            case "toggle":
            case "beforetoggle":
              T = gy;
          }
          var Z = (t & 4) !== 0, ne = !Z && (e === "scroll" || e === "scrollend"), _ = Z ? p !== null ? p + "Capture" : null : p;
          Z = [];
          for (var h = b, x; h !== null; ) {
            var C = h;
            if (x = C.stateNode, C = C.tag, C !== 5 && C !== 26 && C !== 27 || x === null || _ === null || (C = Vn(h, _), C != null && Z.push(
              ju(h, C, x)
            )), ne) break;
            h = h.return;
          }
          0 < Z.length && (p = new T(
            p,
            q,
            null,
            l,
            j
          ), w.push({ event: p, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", T && l !== Xc && (q = l.relatedTarget || l.fromElement) && (da(q) || q[La]))
            break e;
          (p || T) && (q = j.window === j ? j : (T = j.ownerDocument) ? T.defaultView || T.parentWindow : window, p ? (T = l.relatedTarget || l.toElement, p = b, T = T ? da(T) : null, T !== null && (ne = y(T), Z = T.tag, T !== ne || Z !== 5 && Z !== 27 && Z !== 6) && (T = null)) : (p = null, T = b), p !== T && (Z = to, C = "onMouseLeave", _ = "onMouseEnter", h = "mouse", (e === "pointerout" || e === "pointerover") && (Z = ao, C = "onPointerLeave", _ = "onPointerEnter", h = "pointer"), ne = p == null ? q : Zn(p), x = T == null ? q : Zn(T), q = new Z(
            C,
            h + "leave",
            p,
            l,
            j
          ), q.target = ne, q.relatedTarget = x, C = null, da(j) === b && (Z = new Z(
            _,
            h + "enter",
            T,
            l,
            j
          ), Z.target = x, Z.relatedTarget = ne, C = Z), ne = C, Z = p && T ? Je(
            p,
            T,
            Tg
          ) : null, p !== null && em(
            w,
            q,
            p,
            Z,
            !1
          ), T !== null && ne !== null && em(
            w,
            ne,
            T,
            Z,
            !0
          )));
        }
        e: {
          if (p = b ? Zn(b) : window, T = p.nodeName && p.nodeName.toLowerCase(), T === "select" || T === "input" && p.type === "file")
            var G = oo;
          else if (ro(p))
            if (vo)
              G = Ay;
            else {
              G = Ny;
              var oe = jy;
            }
          else
            T = p.nodeName, !T || T.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? b && Gc(b.elementType) && (G = oo) : G = Ey;
          if (G && (G = G(e, b))) {
            fo(
              w,
              G,
              l,
              j
            );
            break e;
          }
          oe && oe(e, p, b);
        }
        switch (oe = b ? Zn(b) : window, e) {
          case "focusin":
            (ro(oe) || oe.contentEditable === "true") && (Ja = oe, ls = b, Pn = null);
            break;
          case "focusout":
            Pn = ls = Ja = null;
            break;
          case "mousedown":
            as = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            as = !1, bo(w, l, j);
            break;
          case "selectionchange":
            if (Cy) break;
          case "keydown":
          case "keyup":
            bo(w, l, j);
        }
        var K;
        if (Wc)
          e: {
            switch (e) {
              case "compositionstart":
                var F = "onCompositionStart";
                break e;
              case "compositionend":
                F = "onCompositionEnd";
                break e;
              case "compositionupdate":
                F = "onCompositionUpdate";
                break e;
            }
            F = void 0;
          }
        else
          Ka ? co(e, l) && (F = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (F = "onCompositionStart");
        F && (no && l.locale !== "ko" && (Ka || F !== "onCompositionStart" ? F === "onCompositionEnd" && Ka && (K = Pf()) : (Hl = j, Kc = "value" in Hl ? Hl.value : Hl.textContent, Ka = !0)), oe = sc(b, F), 0 < oe.length && (F = new lo(
          F,
          e,
          null,
          l,
          j
        ), w.push({ event: F, listeners: oe }), K ? F.data = K : (K = so(l), K !== null && (F.data = K)))), (K = _y ? Sy(e, l) : by(e, l)) && (F = sc(b, "onBeforeInput"), 0 < F.length && (oe = new lo(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          j
        ), w.push({
          event: oe,
          listeners: F
        }), oe.data = K)), _g(
          w,
          e,
          b,
          l,
          j
        );
      }
      Iv(w, t);
    });
  }
  function ju(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function sc(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Vn(e, l), n != null && a.unshift(
        ju(e, n, u)
      ), n = Vn(e, t), n != null && a.push(
        ju(e, n, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function Tg(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function em(e, t, l, a, n) {
    for (var u = t._reactName, i = []; l !== null && l !== a; ) {
      var r = l, v = r.alternate, b = r.stateNode;
      if (r = r.tag, v !== null && v === a) break;
      r !== 5 && r !== 26 && r !== 27 || b === null || (v = b, n ? (b = Vn(l, u), b != null && i.unshift(
        ju(l, b, v)
      )) : n || (b = Vn(l, u), b != null && i.push(
        ju(l, b, v)
      ))), l = l.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var jg = /\r\n?/g, Ng = /\u0000|\uFFFD/g;
  function tm(e) {
    return (typeof e == "string" ? e : "" + e).replace(jg, `
`).replace(Ng, "");
  }
  function lm(e, t) {
    return t = tm(t), tm(e) === t;
  }
  function xe(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          t === "body" || t === "textarea" && a === "" || Qa(e, a);
        else if (typeof a == "number" || typeof a == "bigint")
          t !== "body" && Qa(e, "" + a);
        else return;
        break;
      case "className":
        ti(e, "class", a);
        break;
      case "tabIndex":
        ti(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ti(e, l, a);
        break;
      case "style":
        Ff(e, a, u);
        return;
      case "data":
        if (t !== "object") {
          ti(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = li(a), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (t !== "input" && xe(e, t, "name", n.name, n, null), xe(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), xe(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), xe(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (xe(e, t, "encType", n.encType, n, null), xe(e, t, "method", n.method, n, null), xe(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = li(a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = Pt);
        return;
      case "onScroll":
        a != null && se("scroll", e);
        return;
      case "onScrollEnd":
        a != null && se("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
            (u != null ? u.__html : void 0) !== l && (e.innerHTML = l);
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = li(a), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
        break;
      case "popover":
        se("beforetoggle", e), se("toggle", e), ei(e, "popover", a);
        break;
      case "xlinkActuate":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        hl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        hl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        hl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        hl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ei(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = Zh.get(l) || l, ei(e, l, a);
        else return;
    }
    he = !0;
  }
  function Br(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        Ff(e, a, u);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
            (u != null ? u.__html : void 0) !== l && (e.innerHTML = l);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Qa(e, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Qa(e, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && se("scroll", e);
        return;
      case "onScrollEnd":
        a != null && se("scrollend", e);
        return;
      case "onClick":
        a != null && (e.onclick = Pt);
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
        if (!Yf.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), t = e[ht] || null, t = t != null ? t[l] : null, typeof t == "function" && e.removeEventListener(u, t, n), typeof a == "function")) {
              typeof t != "function" && t !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(u, a, n);
              break e;
            }
            he = !0, l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : ei(e, l, a);
          }
        return;
    }
    he = !0;
  }
  function ut(e, t, l) {
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
        se("error", e), se("load", e);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var i = l[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  xe(e, t, u, i, l, null);
              }
          }
        n && xe(e, t, "srcSet", l.srcSet, l, null), a && xe(e, t, "src", l.src, l, null);
        return;
      case "input":
        se("invalid", e);
        var r = u = i = n = null, v = null, b = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var j = l[a];
            if (j != null)
              switch (a) {
                case "name":
                  n = j;
                  break;
                case "type":
                  i = j;
                  break;
                case "checked":
                  v = j;
                  break;
                case "defaultChecked":
                  b = j;
                  break;
                case "value":
                  u = j;
                  break;
                case "defaultValue":
                  r = j;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (j != null)
                    throw Error(o(137, t));
                  break;
                default:
                  xe(e, t, a, j, l, null);
              }
          }
        Kf(
          e,
          u,
          r,
          v,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        se("invalid", e), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (r = l[n], r != null))
            switch (n) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                i = r;
                break;
              case "multiple":
                a = r;
              default:
                xe(e, t, n, r, l, null);
            }
        t = u, l = i, e.multiple = !!a, t != null ? Xa(e, !!a, t, !1) : l != null && Xa(e, !!a, l, !0);
        return;
      case "textarea":
        se("invalid", e), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (r = l[i], r != null))
            switch (i) {
              case "value":
                a = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(o(91));
                break;
              default:
                xe(e, t, i, r, l, null);
            }
        $f(e, a, n, u);
        return;
      case "option":
        for (v in l)
          if (l.hasOwnProperty(v) && (a = l[v], a != null))
            switch (v) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                xe(e, t, v, a, l, null);
            }
        return;
      case "dialog":
        se("beforetoggle", e), se("toggle", e), se("cancel", e), se("close", e);
        break;
      case "iframe":
      case "object":
        se("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Tu.length; a++)
          se(Tu[a], e);
        break;
      case "image":
        se("error", e), se("load", e);
        break;
      case "details":
        se("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        se("error", e), se("load", e);
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
        for (b in l)
          if (l.hasOwnProperty(b) && (a = l[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                xe(e, t, b, a, l, null);
            }
        return;
      default:
        if (Gc(t)) {
          for (j in l)
            l.hasOwnProperty(j) && (a = l[j], a !== void 0 && Br(
              e,
              t,
              j,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (a = l[r], a != null && xe(e, t, r, a, l, null));
  }
  var Eg = {};
  function Ag(e, t, l, a) {
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
        var n = null, u = null, i = null, r = null, v = null, b = null, j = null;
        for (T in l) {
          var w = l[T];
          if (l.hasOwnProperty(T) && w != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = w;
              default:
                a.hasOwnProperty(T) || xe(e, t, T, null, a, w);
            }
        }
        for (var p in a) {
          var T = a[p];
          if (w = l[p], a.hasOwnProperty(p) && (T != null || w != null))
            switch (p) {
              case "type":
                T !== w && (he = !0), u = T;
                break;
              case "name":
                T !== w && (he = !0), n = T;
                break;
              case "checked":
                T !== w && (he = !0), b = T;
                break;
              case "defaultChecked":
                T !== w && (he = !0), j = T;
                break;
              case "value":
                T !== w && (he = !0), i = T;
                break;
              case "defaultValue":
                T !== w && (he = !0), r = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(o(137, t));
                break;
              default:
                T !== w && xe(
                  e,
                  t,
                  p,
                  T,
                  a,
                  w
                );
            }
        }
        Bc(
          e,
          i,
          r,
          v,
          b,
          j,
          u,
          n
        );
        return;
      case "select":
        T = i = r = p = null;
        for (u in l)
          if (v = l[u], l.hasOwnProperty(u) && v != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = v;
              default:
                a.hasOwnProperty(u) || xe(
                  e,
                  t,
                  u,
                  null,
                  a,
                  v
                );
            }
        for (n in a)
          if (u = a[n], v = l[n], a.hasOwnProperty(n) && (u != null || v != null))
            switch (n) {
              case "value":
                u !== v && (he = !0), p = u;
                break;
              case "defaultValue":
                u !== v && (he = !0), r = u;
                break;
              case "multiple":
                u !== v && (he = !0), i = u;
              default:
                u !== v && xe(
                  e,
                  t,
                  n,
                  u,
                  a,
                  v
                );
            }
        t = r, l = i, a = T, p != null ? Xa(e, !!l, p, !1) : !!a != !!l && (t != null ? Xa(e, !!l, t, !0) : Xa(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        T = p = null;
        for (r in l)
          if (n = l[r], l.hasOwnProperty(r) && n != null && !a.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                xe(e, t, r, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (he = !0), p = n;
                break;
              case "defaultValue":
                n !== u && (he = !0), T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && xe(e, t, i, n, a, u);
            }
        Jf(e, p, T);
        return;
      case "option":
        for (var q in l)
          if (p = l[q], l.hasOwnProperty(q) && p != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                xe(
                  e,
                  t,
                  q,
                  null,
                  a,
                  p
                );
            }
        for (v in a)
          if (p = a[v], T = l[v], a.hasOwnProperty(v) && p !== T && (p != null || T != null))
            switch (v) {
              case "selected":
                p !== T && (he = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
                break;
              default:
                xe(
                  e,
                  t,
                  v,
                  p,
                  a,
                  T
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
        for (var Z in l)
          p = l[Z], l.hasOwnProperty(Z) && p != null && !a.hasOwnProperty(Z) && xe(e, t, Z, null, a, p);
        for (b in a)
          if (p = a[b], T = l[b], a.hasOwnProperty(b) && p !== T && (p != null || T != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(o(137, t));
                break;
              default:
                xe(
                  e,
                  t,
                  b,
                  p,
                  a,
                  T
                );
            }
        return;
      default:
        if (Gc(t)) {
          for (var ne in l)
            p = l[ne], l.hasOwnProperty(ne) && p !== void 0 && !a.hasOwnProperty(ne) && Br(
              e,
              t,
              ne,
              void 0,
              a,
              p
            );
          for (j in a)
            p = a[j], T = l[j], !a.hasOwnProperty(j) || p === T || p === void 0 && T === void 0 || Br(
              e,
              t,
              j,
              p,
              a,
              T
            );
          return;
        }
    }
    for (var _ in l)
      p = l[_], l.hasOwnProperty(_) && p != null && !a.hasOwnProperty(_) && xe(e, t, _, null, a, p);
    for (w in a)
      p = a[w], T = l[w], !a.hasOwnProperty(w) || p === T || p == null && T == null || xe(e, t, w, p, a, T);
  }
  function am(e) {
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
  function zg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, r = n.duration;
        if (u && r && am(i)) {
          for (i = 0, r = n.responseEnd, a += 1; a < l.length; a++) {
            var v = l[a], b = v.startTime;
            if (b > r) break;
            var j = v.transferSize, w = v.initiatorType;
            j && am(w) && (v = v.responseEnd, i += j * (v < r ? 1 : (r - b) / (v - b)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Yr = null, Gr = null;
  function Nu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function nm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function um(e, t) {
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
  function im(e, t, l, a) {
    return l = Nu(
      l
    ).createElement(e), l[et] = a, l[ht] = t, ut(l, e, t), ke(l), l;
  }
  function Xr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Qr = null;
  function Cg() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Qr ? !1 : (Qr = e, !0) : (Qr = null, !1);
  }
  var Zr = typeof setTimeout == "function" ? setTimeout : void 0, wg = typeof clearTimeout == "function" ? clearTimeout : void 0, cm = typeof Promise == "function" ? Promise : void 0, sm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Zr, Dg = typeof queueMicrotask == "function" ? queueMicrotask : typeof cm < "u" ? function(e) {
    return cm.resolve(null).then(e).catch(Og);
  } : Zr;
  function Og(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function la(e) {
    return e === "head";
  }
  function rm(e, t) {
    var l = t, a = 0;
    do {
      var n = l.nextSibling;
      if (e.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(n), An(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Ir(
            e.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = e.ownerDocument.head, Ir(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, r = u.nodeName;
            u[Qn] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Ir(e.ownerDocument.body);
      l = n;
    } while (l);
    An(t);
  }
  function fm(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = a;
    } while (l);
  }
  function om(e, t, l) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, l != null && (e.style.viewTransitionClass = l), l = getComputedStyle(e), l.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var a = 1;
      else
        for (var n = a = 0; n < t.length; n++) {
          var u = t[n];
          0 < u.width && 0 < u.height && a++;
        }
      a === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + l.paddingTop, e.marginBottom = "-" + l.paddingBottom);
    }
  }
  function dm(e, t) {
    e = e.style, t = t.style;
    var l = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (l = t.display, e.display = l == null || typeof l == "boolean" ? "" : l, l = t.margin, l != null ? e.margin = l : (l = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = l == null || typeof l == "boolean" ? "" : l, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Mg(e, t, l) {
    return l = l.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= l.innerHeight && e.left <= l.innerWidth
    };
  }
  function Vr(e) {
    var t = e.getBoundingClientRect(), l = getComputedStyle(e);
    return Mg(t, l, e);
  }
  function Rg(e) {
    return e.documentElement.clientHeight;
  }
  function Ug(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Hg(e, t, l, a, n, u, i, r, v) {
    var b = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var j = b.startViewTransition({
        update: function() {
          var p = b.defaultView, T = p.navigation && p.navigation.transition, q = b.fonts.status;
          a();
          var Z = [];
          if (q === "loaded" && (Rg(b), b.fonts.status === "loading" && Z.push(b.fonts.ready)), q = Z.length, e !== null)
            for (var ne = e.suspenseyImages, _ = 0, h = 0; h < ne.length; h++) {
              var x = ne[h];
              if (!x.complete) {
                var C = x.getBoundingClientRect();
                if (0 < C.bottom && 0 < C.right && C.top < p.innerHeight && C.left < p.innerWidth) {
                  if (_ += Mm(x), _ > oc) {
                    Z.length = q;
                    break;
                  }
                  x = new Promise(
                    Ug.bind(x)
                  ), Z.push(x);
                }
              }
            }
          if (0 < Z.length)
            return p = Promise.race([
              Promise.all(Z),
              new Promise(function(G) {
                return setTimeout(G, 500);
              })
            ]).then(n, n), (T ? Promise.allSettled([T.finished, p]) : p).then(u, u);
          if (n(), T)
            return T.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      b.__reactViewTransition = j;
      var w = [];
      return j.ready.then(
        function() {
          for (var p = b.documentElement.getAnimations({
            subtree: !0
          }), T = 0; T < p.length; T++) {
            var q = p[T], Z = q.effect, ne = Z.pseudoElement;
            if (ne != null && ne.startsWith("::view-transition")) {
              w.push(q), q = Z.getKeyframes();
              for (var _ = ne = void 0, h = !0, x = 0; x < q.length; x++) {
                var C = q[x], G = C.width;
                if (ne === void 0) ne = G;
                else if (ne !== G) {
                  h = !1;
                  break;
                }
                if (G = C.height, _ === void 0) _ = G;
                else if (_ !== G) {
                  h = !1;
                  break;
                }
                delete C.width, delete C.height, C.transform === "none" && delete C.transform;
              }
              h && ne !== void 0 && _ !== void 0 && (Z.setKeyframes(q), h = getComputedStyle(
                Z.target,
                Z.pseudoElement
              ), h.width !== ne || h.height !== _) && (h = q[0], h.width = ne, h.height = _, h = q[q.length - 1], h.width = ne, h.height = _, Z.setKeyframes(q));
            }
          }
          i();
        },
        function(p) {
          b.__reactViewTransition === j && (b.__reactViewTransition = null);
          try {
            if (typeof p == "object" && p !== null)
              switch (p.name) {
                case "InvalidStateError":
                  (p.message === "View transition was skipped because document visibility state is hidden." || p.message === "Skipping view transition because document visibility state has become hidden." || p.message === "Skipping view transition because viewport size changed." || p.message === "Transition was aborted because of invalid state") && (p = null);
              }
            p !== null && v(p);
          } finally {
            a(), n(), i();
          }
        }
      ), j.finished.finally(function() {
        for (var p = 0; p < w.length; p++)
          w[p].cancel();
        b.__reactViewTransition === j && (b.__reactViewTransition = null), r();
      }), j;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Ma(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Ma.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : Y({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Ma.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, l = e.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && a.push(l[n]);
    }
    return a;
  }, Ma.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function vm(e) {
    return {
      name: e,
      group: new Ma("group", e),
      imagePair: new Ma("image-pair", e),
      old: new Ma("old", e),
      new: new Ma("new", e)
    };
  }
  function Dt(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Dt.prototype.addEventListener = function(e, t, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (hm(u, e, t, l) === -1) {
        var i = this, r = t;
        l != null && typeof l != "boolean" && l.once === !0 && (r = function(v) {
          i.removeEventListener(
            e,
            t,
            l
          ), typeof t == "function" ? t.call(this, v) : t.handleEvent(v);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          e,
          t,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = bn(l), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: l,
          attachedListener: r,
          cleanup: n
        }), S(
          this._fragmentFiber.child,
          !1,
          qg,
          e,
          r,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function qg(e, t, l, a) {
    return X(e).addEventListener(
      t,
      l,
      a
    ), !1;
  }
  Dt.prototype.removeEventListener = function(e, t, l) {
    var a = this._eventListeners;
    if (a !== null && (t = hm(
      a,
      e,
      t,
      l
    ), t !== -1)) {
      var n = a[t];
      l = n.attachedListener;
      var u = n.cleanup;
      n = bn(n.optionsOrUseCapture), S(
        this._fragmentFiber.child,
        !1,
        Lg,
        e,
        l,
        n
      ), a.splice(t, 1), u !== null && u();
    }
  };
  function Lg(e, t, l, a) {
    return X(e).removeEventListener(
      t,
      l,
      a
    ), !1;
  }
  function bn(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function mm(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function hm(e, t, l, a) {
    if (e.length === 0) return -1;
    a = mm(a);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === l && mm(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  Dt.prototype.dispatchEvent = function(e) {
    var t = A(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = X(t);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !e.bubbles) {
      var a = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            bn(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(a), e = a.dispatchEvent(e), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            bn(u.optionsOrUseCapture)
          );
      return t.removeChild(a), e;
    }
    return t.dispatchEvent(e);
  }, Dt.prototype.focus = function(e) {
    S(
      this._fragmentFiber.child,
      !0,
      ym,
      e,
      void 0,
      void 0
    );
  };
  function ym(e, t) {
    return e.tag === 6 ? !1 : (e = X(e), Fg(e, t));
  }
  Dt.prototype.focusLast = function(e) {
    var t = [];
    S(
      this._fragmentFiber.child,
      !0,
      Kr,
      t,
      void 0,
      void 0
    );
    for (var l = t.length - 1; 0 <= l && !ym(t[l], e); l--) ;
  };
  function Kr(e, t) {
    return t.push(e), !1;
  }
  Dt.prototype.blur = function() {
    var e = A(
      this._fragmentFiber
    );
    e !== null && (e = X(e), e = Nu(e).activeElement, e !== null && S(
      this._fragmentFiber.child,
      !1,
      Bg,
      e,
      void 0,
      void 0
    ));
  };
  function Bg(e, t) {
    return e.tag === 6 ? !1 : (e = X(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Dt.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), S(
      this._fragmentFiber.child,
      !1,
      Yg,
      e,
      void 0,
      void 0
    );
  };
  function Yg(e, t) {
    return e.tag === 6 || (e = X(e), t.observe(e)), !1;
  }
  Dt.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), S(
        this._fragmentFiber.child,
        !1,
        Gg,
        e,
        void 0,
        void 0
      );
      for (var l = t = 0; l < kt.length; l++) {
        var a = kt[l];
        a.fragmentInstance === this && a.observer === e ? e.unobserve(a.instance) : kt[t++] = a;
      }
      kt.length = t;
    }
  };
  function Gg(e, t) {
    return e.tag === 6 || (e = X(e), t.unobserve(e)), !1;
  }
  var kt = [], Jr = !1;
  function Xg(e, t, l) {
    kt.push({
      fragmentInstance: e,
      observer: t,
      instance: l
    }), Jr || (Jr = !0, Wg(function() {
      Jr = !1;
      var a = kt;
      kt = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Dt.prototype.getClientRects = function() {
    var e = [];
    return S(
      this._fragmentFiber.child,
      !1,
      Qg,
      e,
      void 0,
      void 0
    ), e;
  };
  function Qg(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var l = e.ownerDocument.createRange();
      l.selectNodeContents(e), t.push.apply(t, l.getClientRects());
    } else
      e = X(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Dt.prototype.getRootNode = function(e) {
    var t = A(
      this._fragmentFiber
    );
    return t === null ? this : X(t).getRootNode(e);
  }, Dt.prototype.compareDocumentPosition = function(e) {
    var t = A(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    S(
      this._fragmentFiber.child,
      !1,
      Kr,
      l,
      void 0,
      void 0
    );
    var a = X(t);
    if (l.length === 0) {
      if (l = a, U(this._fragmentFiber)) {
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
        t != null && (l = t);
      }
      t = this._fragmentFiber;
      var n = a = l.compareDocumentPosition(e);
      return l === e ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = L(t)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = X(l).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = X(l[0]), n = X(l[l.length - 1]);
    var u = U(this._fragmentFiber) ? t.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = t.compareDocumentPosition(e), r = n.compareDocumentPosition(e), v = i & Node.DOCUMENT_POSITION_CONTAINED_BY || r & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return r = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && r & Node.DOCUMENT_POSITION_PRECEDING, t = a && t === e || u && n === e || v || r ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Zg(
      t,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Zg(e, t, l, a, n) {
    var u = da(n);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (l = !!u)
        e: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === t || u.alternate === t)) {
              l = !0;
              break e;
            }
            u = u.return;
          }
          l = !1;
        }
      return l;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = n.ownerDocument, n === u || n === u.documentElement || n === u.body;
      e: {
        for (u = t, t = A(t); u !== null; ) {
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
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === l) && (t = Je(
      l,
      u,
      Be
    ), t === null ? t = !1 : (S(
      t,
      !0,
      Ke,
      u,
      l
    ), u = W, W = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === a) && (t = Je(
      a,
      u,
      Be
    ), t === null ? t = !1 : (S(
      t,
      !0,
      ue,
      u,
      a
    ), u = W, P = W = null, t = u !== null)), t) : !1;
  }
  function gm(e, t) {
    var l = e.ownerDocument.createRange();
    l.selectNodeContents(e), e = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Dt.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    S(
      this._fragmentFiber.child,
      !1,
      Kr,
      t,
      void 0,
      void 0
    );
    var l = e !== !1;
    if (t.length === 0) {
      var a = L(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || A(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        e = X(a), gm(e, l);
        return;
      }
      if (a = X(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(e);
          return;
        }
        a.scrollIntoView(e);
      }
    }
    for (a = l ? t.length - 1 : 0; a !== (l ? -1 : t.length); ) {
      var n = t[a];
      n.tag === 6 ? (n = X(n), gm(n, l)) : X(n).scrollIntoView(e), a += l ? -1 : 1;
    }
  };
  function Vg(e, t) {
    return e = X(e), pm(e, t), !1;
  }
  function pm(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function _m(e, t) {
    var l = t._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        e.addEventListener(
          n.type,
          n.attachedListener,
          bn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (l = t._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, r = 0; r < kt.length; r++) {
        var v = kt[r];
        (v.fragmentInstance !== t || v.observer !== u || v.instance !== e) && (kt[i++] = v);
      }
      kt.length = i, u.observe(e);
    }), pm(e, t));
  }
  function Kg(e, t) {
    var l = t._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          bn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (l = t._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? Xg(
        t,
        u,
        e
      ) : u.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function $r(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          $r(l), Pu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function Jg(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Qn])
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
      if (e = Bt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function $g(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Bt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Sm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Bt(e.nextSibling), e === null)) return null;
    return e;
  }
  function kr(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Fr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function kg(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Bt(e) {
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
  var Wr = null;
  function bm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Bt(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function xm(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Fg(e, t) {
    function l() {
      a = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var a = !1;
    try {
      e.ownerDocument.addEventListener("focus", l, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.ownerDocument.removeEventListener("focus", l, !0);
    }
    return a;
  }
  function Wg(e) {
    sm(function() {
      sm(function(t) {
        return e(t);
      });
    });
  }
  function Tm(e, t, l) {
    switch (t = Nu(l), e) {
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
  function jm(e, t, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && xe(e, t, a, null, Eg, n);
    }
    l.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Pt && (e.onclick = null), Pu(e);
  }
  function Ir(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Pu(e);
  }
  var Yt = /* @__PURE__ */ new Map(), Nm = /* @__PURE__ */ new Set();
  function Eu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var zl = te.d;
  te.d = {
    f: Ig,
    r: Pg,
    D: e0,
    C: t0,
    L: l0,
    m: a0,
    X: u0,
    S: n0,
    M: i0
  };
  function Ig() {
    var e = zl.f(), t = lc();
    return e || t;
  }
  function Pg(e) {
    var t = Ba(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ad(t) : zl.r(e);
  }
  var xn = typeof document > "u" ? null : document;
  function Em(e, t, l) {
    var a = xn;
    if (a && typeof t == "string" && t) {
      var n = Ot(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Nm.has(n) || (Nm.add(n), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), ut(t, "link", e), ke(t), a.head.appendChild(t)));
    }
  }
  function e0(e) {
    zl.D(e), Em("dns-prefetch", e, null);
  }
  function t0(e, t) {
    zl.C(e, t), Em("preconnect", e, t);
  }
  function l0(e, t, l) {
    zl.L(e, t, l);
    var a = xn;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + Ot(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Ot(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Ot(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Ot(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Tn(e);
          break;
        case "script":
          u = jn(e);
      }
      if (!(Yt.has(u) || (e = Y(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Yt.set(u, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Au(u)) || t === "script" && a.querySelector(zu(u))))) {
        var i = a.createElement("link");
        ut(i, "link", e), t === "style" && (i[Iu] = !0, i.onload = i.onerror = function() {
          Lf(i);
        }), ke(i), a.head.appendChild(i);
      }
    }
  }
  function a0(e, t) {
    zl.m(e, t);
    var l = xn;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Ot(a) + '"][href="' + Ot(e) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = jn(e);
      }
      if (!Yt.has(u) && (e = Y({ rel: "modulepreload", href: e }, t), Yt.set(u, e), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(zu(u)))
              return;
        }
        a = l.createElement("link"), ut(a, "link", e), ke(a), l.head.appendChild(a);
      }
    }
  }
  function n0(e, t, l) {
    zl.S(e, t, l);
    var a = xn;
    if (a && e) {
      var n = Ya(a).hoistableStyles, u = Tn(e);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var r = { loading: 0, preload: null };
        if (i = a.querySelector(
          Au(u)
        ))
          r.loading = 5;
        else {
          e = Y(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Yt.get(u)) && Pr(e, l);
          var v = i = a.createElement("link");
          ke(v), ut(v, "link", e), v._p = new Promise(function(b, j) {
            v.onload = b, v.onerror = j;
          }), v.addEventListener("load", function() {
            r.loading |= 1;
          }), v.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, rc(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: r
        }, n.set(u, i);
      }
    }
  }
  function u0(e, t) {
    zl.X(e, t);
    var l = xn;
    if (l && e) {
      var a = Ya(l).hoistableScripts, n = jn(e), u = a.get(n);
      u || (u = l.querySelector(zu(n)), u || (e = Y({ src: e, async: !0 }, t), (t = Yt.get(n)) && ef(e, t), u = l.createElement("script"), ke(u), ut(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function i0(e, t) {
    zl.M(e, t);
    var l = xn;
    if (l && e) {
      var a = Ya(l).hoistableScripts, n = jn(e), u = a.get(n);
      u || (u = l.querySelector(zu(n)), u || (e = Y({ src: e, async: !0, type: "module" }, t), (t = Yt.get(n)) && ef(e, t), u = l.createElement("script"), ke(u), ut(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Am(e, t, l, a) {
    var n = (n = Ml.current) ? Eu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Tn(l.href), t = Ya(
          n
        ).hoistableStyles, a = t.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Tn(l.href);
          var u = Ya(
            n
          ).hoistableStyles, i = u.get(e);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, i), (u = n.querySelector(
            Au(e)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = Yt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Yt.set(e, u)), c0(
            n,
            e,
            u,
            i.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (l = jn(l), t = Ya(
          n
        ).hoistableScripts, a = t.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Tn(e) {
    return 'href="' + Ot(e) + '"';
  }
  function Au(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function zm(e) {
    return Y({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function c0(e, t, l, a) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[Iu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[Iu] = !0, t.onload = t.onerror = Lf.bind(null, t), ut(t, "link", l), ke(t), e.head.appendChild(t);
    a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function jn(e) {
    return '[src="' + Ot(e) + '"]';
  }
  function zu(e) {
    return "script[async]" + e;
  }
  function Cm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Ot(l.href) + '"]'
          );
          if (a)
            return t.instance = a, ke(a), a;
          var n = Y({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), ke(a), ut(a, "style", n), rc(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          n = Tn(l.href);
          var u = e.querySelector(
            Au(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, ke(u), u;
          a = zm(l), (n = Yt.get(n)) && Pr(a, n), u = (e.ownerDocument || e).createElement("link"), ke(u);
          var i = u;
          return i._p = new Promise(function(r, v) {
            i.onload = r, i.onerror = v;
          }), ut(u, "link", a), t.state.loading |= 4, rc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = jn(l.src), (n = e.querySelector(
            zu(u)
          )) ? (t.instance = n, ke(n), n) : (a = l, (n = Yt.get(u)) && (a = Y({}, l), ef(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), ke(n), ut(n, "link", a), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, rc(a, l.precedence, e));
    return t.instance;
  }
  function rc(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var r = a[i];
      if (r.dataset.precedence === t) u = r;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Pr(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function ef(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var fc = null;
  function wm(e, t, l) {
    if (fc === null) {
      var a = /* @__PURE__ */ new Map(), n = fc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = fc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Qn] || u[et] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = e + i;
        var r = a.get(i);
        r ? r.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function tf(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function s0(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
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
  function Dm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Om(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Mm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Rm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Mm(t), e.suspenseyImages.push(t)), e = o0.bind(e), t.decode().then(e, e));
  }
  function r0(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Tn(a.href), u = t.querySelector(
          Au(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Cu.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, ke(u);
          return;
        }
        u = t.ownerDocument || t, a = zm(a), (n = Yt.get(n)) && Pr(a, n), u = u.createElement("link"), ke(u);
        var i = u;
        i._p = new Promise(function(r, v) {
          i.onload = r, i.onerror = v;
        }), ut(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Cu.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var oc = 0;
  function f0(e, t) {
    return e.stylesheets && e.count === 0 && vc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && vc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && oc === 0 && (oc = 62500 * zg());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && vc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > oc ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Um(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) vc(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Cu() {
    this.count--, Um(this);
  }
  function o0() {
    this.imgCount--, Um(this);
  }
  var dc = null;
  function vc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, dc = /* @__PURE__ */ new Map(), t.forEach(d0, e), dc = null, Cu.call(e));
  }
  function d0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = dc.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), dc.set(e, l);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Cu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Nn = {
    $$typeof: $e,
    Provider: null,
    Consumer: null,
    _currentValue: vl,
    _currentValue2: vl,
    _threadCount: 0
  };
  function v0(e, t, l, a, n, u, i, r, v) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Uc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Uc(0), this.hiddenUpdates = Uc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Hm(e, t, l, a, n, u, i, r, v, b, j, w) {
    return e = new v0(
      e,
      t,
      l,
      i,
      v,
      b,
      j,
      w,
      r
    ), t = 1, u === !0 && (t |= 24), u = yt(3, null, null, t), e.current = u, u.stateNode = e, t = ys(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, Ss(u), e;
  }
  function qm(e) {
    return e ? (e = Fa, e) : Fa;
  }
  function Lm(e, t, l, a, n, u) {
    n = qm(n), a.context === null ? a.context = n : a.pendingContext = n, a = Zl(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = Vl(e, a, t), l !== null && (St(l, e, t), iu(l, e, t));
  }
  function Bm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function lf(e, t) {
    Bm(e, t), (e = e.alternate) && Bm(e, t);
  }
  function Ym(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ya(e, 67108864);
      t !== null && St(t, e, 67108864), lf(e, 67108864);
    }
  }
  function Gm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = wt();
      t = Hc(t);
      var l = ya(e, t);
      l !== null && St(l, e, t), lf(e, t);
    }
  }
  var En = !0;
  function m0(e, t, l, a) {
    var n = V.T;
    V.T = null;
    var u = te.p;
    try {
      te.p = 2, af(e, t, l, a);
    } finally {
      te.p = u, V.T = n;
    }
  }
  function h0(e, t, l, a) {
    var n = V.T;
    V.T = null;
    var u = te.p;
    try {
      te.p = 8, af(e, t, l, a);
    } finally {
      te.p = u, V.T = n;
    }
  }
  function af(e, t, l, a) {
    if (En) {
      var n = nf(a);
      if (n === null)
        Lr(
          e,
          t,
          a,
          mc,
          l
        ), Qm(e, a);
      else if (g0(
        n,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (Qm(e, a), t & 4 && -1 < y0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Ba(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = oa(u.pendingLanes);
                  if (i !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var v = 1 << 31 - Tt(i);
                      r.entanglements[1] |= v, i &= ~v;
                    }
                    rl(u), (ge & 6) === 0 && (Pi = bt() + 500, xu(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = ya(u, 2), r !== null && St(r, u, 2), lc(), lf(u, 2);
            }
          if (u = nf(a), u === null && Lr(
            e,
            t,
            a,
            mc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Lr(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function nf(e) {
    return e = Qc(e), uf(e);
  }
  var mc = null;
  function uf(e) {
    if (mc = null, e = da(e), e !== null) {
      var t = y(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = E(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = D(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return mc = e, null;
  }
  function Xm(e) {
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
        switch (zh()) {
          case Ef:
            return 2;
          case Af:
            return 8;
          case Ju:
          case Ch:
            return 32;
          case zf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var cf = !1, aa = null, na = null, ua = null, wu = /* @__PURE__ */ new Map(), Du = /* @__PURE__ */ new Map(), ia = [], y0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Qm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        aa = null;
        break;
      case "dragenter":
      case "dragleave":
        na = null;
        break;
      case "mouseover":
      case "mouseout":
        ua = null;
        break;
      case "pointerover":
      case "pointerout":
        wu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Du.delete(t.pointerId);
    }
  }
  function Ou(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Ba(t), t !== null && Ym(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function g0(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return aa = Ou(
          aa,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return na = Ou(
          na,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return ua = Ou(
          ua,
          e,
          t,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return wu.set(
          u,
          Ou(
            wu.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Du.set(
          u,
          Ou(
            Du.get(u) || null,
            e,
            t,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Zm(e) {
    var t = da(e.target);
    if (t !== null) {
      var l = y(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = E(l), t !== null) {
            e.blockedOn = t, Uf(e.priority, function() {
              Gm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = D(l), t !== null) {
            e.blockedOn = t, Uf(e.priority, function() {
              Gm(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function hc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = nf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Xc = a, l.target.dispatchEvent(a), Xc = null;
      } else
        return t = Ba(l), t !== null && Ym(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function Vm(e, t, l) {
    hc(e) && l.delete(t);
  }
  function p0() {
    cf = !1, aa !== null && hc(aa) && (aa = null), na !== null && hc(na) && (na = null), ua !== null && hc(ua) && (ua = null), wu.forEach(Vm), Du.forEach(Vm);
  }
  function yc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, cf || (cf = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      p0
    )));
  }
  var gc = null;
  function Km(e) {
    gc !== e && (gc = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        gc === e && (gc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], n = e[t + 2];
          if (typeof a != "function") {
            if (uf(a || l) === null)
              continue;
            break;
          }
          var u = Ba(l);
          u !== null && (e.splice(t, 3), t -= 3, Gs(
            u,
            {
              pending: !0,
              data: n,
              method: l.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function An(e) {
    function t(v) {
      return yc(v, e);
    }
    aa !== null && yc(aa, e), na !== null && yc(na, e), ua !== null && yc(ua, e), wu.forEach(t), Du.forEach(t);
    for (var l = 0; l < ia.length; l++) {
      var a = ia[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < ia.length && (l = ia[0], l.blockedOn === null); )
      Zm(l), l.blockedOn === null && ia.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[ht] || null;
        if (typeof u == "function")
          i || Km(l);
        else if (i) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[ht] || null)
              r = i.formAction;
            else if (uf(n) !== null) continue;
          } else r = i.action;
          typeof r == "function" ? l[a + 1] = r : (l.splice(a, 3), a -= 3), Km(l);
        }
      }
  }
  function Jm() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function sf(e) {
    this._internalRoot = e;
  }
  pc.prototype.render = sf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var l = t.current, a = wt();
    Lm(l, a, e, t, null, null);
  }, pc.prototype.unmount = sf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Lm(e.current, 2, null, e, null, null), lc(), t[La] = null;
    }
  };
  function pc(e) {
    this._internalRoot = e;
  }
  pc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Rf();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < ia.length && t !== 0 && t < ia[l].priority; l++) ;
      ia.splice(l, 0, e), l === 0 && Zm(e);
    }
  };
  var $m = f.version;
  if ($m !== "19.3.1")
    throw Error(
      o(
        527,
        $m,
        "19.3.1"
      )
    );
  te.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = M(t), e = e !== null ? N(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var _0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var _c = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!_c.isDisabled && _c.supportsFiber)
      try {
        Yn = _c.inject(
          _0
        ), xt = _c;
      } catch {
      }
  }
  return Ru.createRoot = function(e, t) {
    if (!m(e)) throw Error(o(299));
    var l = !1, a = "", n = qd, u = Ld, i = Bd;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = Hm(
      e,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      u,
      i,
      Jm
    ), e[La] = t.current, qr(e), new sf(t);
  }, Ru.hydrateRoot = function(e, t, l) {
    if (!m(e)) throw Error(o(299));
    var a = !1, n = "", u = qd, i = Ld, r = Bd, v = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), t = Hm(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      n,
      v,
      u,
      i,
      r,
      Jm
    ), t.context = qm(null), l = t.current, a = wt(), a = Hc(a), n = Zl(a), n.callback = null, Vl(l, n, a), l = a, t.current.lanes = l, Xn(t, l), rl(t), e[La] = t.current, qr(e), new pc(t);
  }, Ru.version = "19.3.1", Ru;
}
var nh;
function C0() {
  if (nh) return ff.exports;
  nh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (f) {
        console.error(f);
      }
  }
  return s(), ff.exports = z0(), ff.exports;
}
var w0 = C0(), O = bf();
const yh = O.createContext(null);
function uh() {
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
function D0({ children: s }) {
  const [f, d] = O.useState(uh), o = O.useCallback(function() {
    d(uh());
  }, []), m = O.useCallback(
    async function(D) {
      await window.setActiveMasterContext(D), o();
    },
    [o]
  ), y = O.useCallback(function() {
    window.exitBetaMode();
  }, []), E = O.useMemo(
    function() {
      return Object.assign({}, f, {
        refresh: o,
        switchGroup: m,
        exitBeta: y
      });
    },
    [f, o, m, y]
  );
  return /* @__PURE__ */ c.jsx(yh.Provider, { value: E, children: s });
}
function Te() {
  const s = O.useContext(yh);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const O0 = "_button_fpxiy_7", M0 = "_primary_fpxiy_22", R0 = "_secondary_fpxiy_30", U0 = "_danger_fpxiy_39", H0 = "_spinner_fpxiy_52", q0 = "_labelLoading_fpxiy_61", zn = {
  button: O0,
  primary: M0,
  secondary: R0,
  danger: U0,
  spinner: H0,
  labelLoading: q0
};
function Q({
  variant: s = "primary",
  loading: f = !1,
  disabled: d = !1,
  children: o,
  className: m,
  ...y
}) {
  var E = s === "secondary" ? zn.secondary : s === "danger" ? zn.danger : zn.primary;
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      className: [zn.button, E, m].filter(Boolean).join(" "),
      disabled: d || f,
      "aria-busy": f || void 0,
      ...y,
      children: [
        f ? /* @__PURE__ */ c.jsx("span", { className: zn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ c.jsx("span", { className: f ? zn.labelLoading : void 0, children: o })
      ]
    }
  );
}
const L0 = "_backdrop_13xfr_1", B0 = "_dialog_13xfr_12", Y0 = "_header_13xfr_23", G0 = "_title_13xfr_30", X0 = "_closeBtn_13xfr_35", Cn = {
  backdrop: L0,
  dialog: B0,
  header: Y0,
  title: G0,
  closeBtn: X0
};
function gh({ title: s, onClose: f, children: d }) {
  return O.useEffect(function() {
    function o(m) {
      m.key === "Escape" && f();
    }
    return document.addEventListener("keydown", o), function() {
      document.removeEventListener("keydown", o);
    };
  }, [f]), /* @__PURE__ */ c.jsx(
    "div",
    {
      className: Cn.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && f();
      },
      children: /* @__PURE__ */ c.jsxs("div", { className: Cn.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ c.jsxs("div", { className: Cn.header, children: [
          /* @__PURE__ */ c.jsx("h3", { className: Cn.title, children: s }),
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: Cn.closeBtn,
              onClick: f,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: Cn.body, children: d })
      ] })
    }
  );
}
const Q0 = "_group_1wdnn_1", Z0 = "_label_1wdnn_8", V0 = "_input_1wdnn_14", K0 = "_error_1wdnn_32", Uu = {
  group: Q0,
  label: Z0,
  input: V0,
  error: K0
};
function re({ label: s, error: f, multiline: d = !1, id: o, ...m }) {
  var y = o || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ c.jsxs("div", { className: Uu.group, children: [
    s ? /* @__PURE__ */ c.jsx("label", { className: Uu.label, htmlFor: y, children: s }) : null,
    d ? /* @__PURE__ */ c.jsx("textarea", { id: y, className: Uu.input, ...m }) : /* @__PURE__ */ c.jsx("input", { id: y, className: Uu.input, ...m }),
    f ? /* @__PURE__ */ c.jsx("p", { className: Uu.error, children: f }) : null
  ] });
}
const J0 = "_header_1ozxo_1", $0 = "_title_1ozxo_12", k0 = "_subtitle_1ozxo_17", F0 = "_right_1ozxo_23", W0 = "_groupSelect_1ozxo_30", I0 = "_userBadge_1ozxo_39", P0 = "_points_1ozxo_43", sa = {
  header: J0,
  title: $0,
  subtitle: k0,
  right: F0,
  groupSelect: W0,
  userBadge: I0,
  points: P0
};
function e1() {
  var s = Te(), f = window.users[s.currentUser] || {}, [d, o] = O.useState(!1), [m, y] = O.useState(s.statusMessage), [E, D] = O.useState(!1);
  function z() {
    s.exitBeta();
  }
  function M() {
    s.exitBeta(), window.logout();
  }
  function N() {
    y(s.statusMessage), o(!0);
  }
  async function S(A) {
    A.preventDefault(), D(!0);
    try {
      await window.updateMyStatusMessage(m), s.refresh(), o(!1);
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs("header", { className: sa.header, children: [
    /* @__PURE__ */ c.jsxs("div", { className: sa.left, children: [
      /* @__PURE__ */ c.jsx("h1", { className: sa.title, children: s.groupTerms.groupLabel }),
      /* @__PURE__ */ c.jsx("p", { className: sa.subtitle, children: "Beta dashboard" })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: sa.right, children: [
      s.myMasterOptions.length > 1 ? /* @__PURE__ */ c.jsx(
        "select",
        {
          className: sa.groupSelect,
          value: s.activeMasterContext,
          onChange: function(A) {
            s.switchGroup(A.target.value);
          },
          "aria-label": "Switch group",
          children: s.myMasterOptions.map(function(A) {
            var U = window.users[A];
            return /* @__PURE__ */ c.jsx("option", { value: A, children: U ? U.displayName : A }, A);
          })
        }
      ) : null,
      /* @__PURE__ */ c.jsx("span", { className: sa.userBadge, children: s.displayName }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: N, children: "✏️ Status" }),
      s.isMaster ? null : /* @__PURE__ */ c.jsxs("span", { className: sa.points, children: [
        f.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: z, children: "Switch to classic styling" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: M, children: "Logout" })
    ] }),
    d ? /* @__PURE__ */ c.jsx(gh, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ c.jsxs("form", { onSubmit: S, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Status message",
          value: m,
          onChange: function(A) {
            y(A.target.value);
          },
          placeholder: "e.g. 🐷 feeling good today",
          maxLength: 100,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: E, children: "Save" })
    ] }) }) : null
  ] });
}
const t1 = "_nav_c0zce_1", l1 = "_tab_c0zce_10", a1 = "_tabActive_c0zce_11", hf = {
  nav: t1,
  tab: l1,
  tabActive: a1
};
function n1({ activeTab: s, onChange: f }) {
  var d = Te(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && o.push({ key: "dashboard", label: "Dashboard" }), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ c.jsx("nav", { className: hf.nav, "aria-label": "Main", children: o.map(function(m) {
    var y = m.key === s;
    return /* @__PURE__ */ c.jsx(
      "button",
      {
        className: y ? hf.tabActive : hf.tab,
        "aria-current": y ? "page" : void 0,
        onClick: function() {
          f(m.key);
        },
        children: m.label
      },
      m.key
    );
  }) });
}
function Dl(s) {
  var f = s.table, d = s.select || "*", o = s.masterUsername, m = s.sort, y = s.enabled !== !1, [E, D] = O.useState([]), [z, M] = O.useState("loading"), [N, S] = O.useState(null), A = O.useRef(Math.random().toString(36).slice(2)).current, U = O.useCallback(
    async function() {
      if (!y || !o) {
        D([]), M("ready");
        return;
      }
      M("loading"), S(null);
      var L = window.supabase.from(f).select(d).eq("master_username", o), H = await L;
      if (H.error) {
        console.error("useRealtimeList(" + f + ") fetch error:", H.error), S(H.error), M("error");
        return;
      }
      var X = H.data || [];
      m && (X = X.slice().sort(m)), D(X), M("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [f, d, o, y]
  );
  return O.useEffect(
    function() {
      if (U(), !(!y || !o)) {
        var L = window.supabase.channel("beta_" + f + "_" + o + "_" + A).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: f,
            filter: "master_username=eq." + o
          },
          function(H) {
            D(function(X) {
              var W = X;
              return H.eventType === "INSERT" ? W = [H.new].concat(X) : H.eventType === "UPDATE" ? W = X.map(function(P) {
                return P.id === H.old.id ? H.new : P;
              }) : H.eventType === "DELETE" && (W = X.filter(function(P) {
                return P.id !== H.old.id;
              })), m ? W.slice().sort(m) : W;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(L);
        };
      }
    },
    [f, o, y, U]
  ), { items: E, status: z, error: N, reload: U };
}
function u1(s, f) {
  return new Date(f.createdAt) - new Date(s.createdAt);
}
function xf() {
  var s = Te(), f = Dl({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: u1
  });
  return {
    tasks: f.items,
    status: f.status,
    error: f.error,
    reload: f.reload,
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
      var o = f.items.find(function(m) {
        return m.id === d;
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
function i1() {
  var s = Te(), [f, d] = O.useState([]);
  return O.useEffect(
    function() {
      var o = !1;
      if (!s.isSlave || !s.activeMasterContext) {
        d([]);
        return;
      }
      return window.supabase.from("task_assignments").select("task_id").eq("assigned_to", s.currentUser).eq("master_username", s.activeMasterContext).then(function(m) {
        o || m.error || d(
          (m.data || []).map(function(y) {
            return y.task_id;
          })
        );
      }), function() {
        o = !0;
      };
    },
    [s.isSlave, s.currentUser, s.activeMasterContext]
  ), f;
}
function Tf() {
  var s = Te(), f = s.activeMasterContext, [d, o] = O.useState([]), [m, y] = O.useState("loading"), [E, D] = O.useState(null), z = O.useCallback(
    async function() {
      if (!f) {
        o([]), y("ready");
        return;
      }
      y("loading"), D(null);
      var N = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", f);
      if (N.error) {
        D(N.error), y("error");
        return;
      }
      var S = (N.data || []).map(function(P) {
        return P.slave_username;
      }), A = { data: [] }, U = { data: [] };
      S.length > 0 && (A = await window.supabase.from("userProfiles").select("username, points").eq("master_username", f), U = await window.supabase.from("users").select("username, display_name, status_message").in("username", S));
      var L = {};
      (A.data || []).forEach(function(P) {
        L[P.username] = P.points || 0;
      });
      var H = {}, X = {};
      (U.data || []).forEach(function(P) {
        H[P.username] = P.display_name || P.username, X[P.username] = P.status_message || "";
      });
      var W = (N.data || []).map(function(P) {
        return {
          username: P.slave_username,
          displayName: H[P.slave_username] || P.slave_username,
          statusMessage: X[P.slave_username] || "",
          points: L[P.slave_username] || 0,
          status: P.status
        };
      });
      o(W), y("ready");
    },
    [f]
  );
  O.useEffect(
    function() {
      if (z(), !!f) {
        var N = window.supabase.channel("beta_slave_roster_" + f).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + f
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
            filter: "master_username=eq." + f
          },
          function() {
            z();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(N);
        };
      }
    },
    [f, z]
  );
  var M = d.filter(function(N) {
    return N.status === "active";
  });
  return {
    slaves: M,
    allSlaves: d,
    status: m,
    error: E,
    reload: z
  };
}
const c1 = "_card_1j746_1", s1 = "_raised_1j746_8", ih = {
  card: c1,
  raised: s1
};
function Ne({ raised: s = !1, className: f, children: d, ...o }) {
  return /* @__PURE__ */ c.jsx(
    "div",
    {
      className: [s ? ih.raised : ih.card, f].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
var ph = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function r1(s, f, d, o) {
  return Object.assign(
    {
      id: s,
      x: f / 2,
      y: d / 2
    },
    ph,
    {}
  );
}
function f1(s, f, d) {
  var o = Math.min(s.canvas.width, s.canvas.height), m = f.radiusPercent / 100 * o * 2, y = (d + f.timeOffset * 1e3) * f.speed * 1e-3;
  s.save(), s.translate(f.x, f.y), s.rotate(f.rotation * Math.PI / 180 + y * 0.5), s.strokeStyle = f.color, s.lineWidth = f.thickness, s.globalAlpha = f.opacity, s.lineCap = "round", s.lineJoin = "round";
  for (var E = 0; E < f.arms; E++) {
    s.save(), s.rotate(E * 2 * Math.PI / f.arms), s.beginPath();
    for (var D = !0, z = 0; z < m; z += 0.5) {
      var M = z * 0.08 + y, N = z * Math.cos(M), S = z * Math.sin(M);
      D ? (s.moveTo(N, S), D = !1) : s.lineTo(N, S);
    }
    s.stroke(), s.restore();
  }
  s.restore();
}
function o1(s) {
  var f = JSON.stringify(s, null, 2), d = new Blob([f], { type: "application/json" }), o = URL.createObjectURL(d), m = document.createElement("a");
  m.href = o, m.download = "spiral-config.json", document.body.appendChild(m), m.click(), document.body.removeChild(m), URL.revokeObjectURL(o);
}
function d1(s, f, d) {
  var o = new FileReader();
  o.onload = function(m) {
    try {
      var y = JSON.parse(m.target.result);
      f(y);
    } catch {
      d("Failed to load configuration. Invalid file format.");
    }
  }, o.readAsText(s);
}
const v1 = "_canvas_nzlak_1", m1 = {
  canvas: v1
};
function h1({ canvasRef: s, spiralsRef: f, backgroundColor: d }) {
  var o = O.useRef(d);
  return O.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), O.useEffect(function() {
    var m = s.current, y = m.getContext("2d");
    function E() {
      var M = m.parentElement;
      m.width = M.clientWidth, m.height = M.clientHeight, f.current.forEach(function(N) {
        N.x = m.width / 2, N.y = m.height / 2;
      });
    }
    var D = new ResizeObserver(E);
    D.observe(m.parentElement), E();
    var z = requestAnimationFrame(function M(N) {
      z = requestAnimationFrame(M), y.fillStyle = o.current, y.fillRect(0, 0, m.width, m.height), f.current.forEach(function(S) {
        f1(y, S, N);
      });
    });
    return function() {
      cancelAnimationFrame(z), D.disconnect();
    };
  }, []), /* @__PURE__ */ c.jsx("canvas", { ref: s, className: m1.canvas });
}
const y1 = "_sidebar_83vy0_1", g1 = "_controlGroup_83vy0_10", p1 = "_spiralList_83vy0_27", _1 = "_spiralItem_83vy0_34", S1 = "_spiralItemActive_83vy0_35", b1 = "_actions_83vy0_49", x1 = "_controlRow_83vy0_54", T1 = "_valueDisplay_83vy0_71", j1 = "_sendAsTask_83vy0_77", vt = {
  sidebar: y1,
  controlGroup: g1,
  spiralList: p1,
  spiralItem: _1,
  spiralItemActive: S1,
  actions: b1,
  controlRow: x1,
  valueDisplay: T1,
  sendAsTask: j1
};
var N1 = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function E1({
  textControls: s,
  spirals: f,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: m,
  onDelete: y,
  onSelect: E,
  onClearAll: D,
  onPropertyChange: z,
  backgroundColor: M,
  onBackgroundChange: N,
  onSave: S,
  onLoadFile: A,
  onOpenTaskModal: U
}) {
  var L = O.useRef(null);
  return /* @__PURE__ */ c.jsxs("div", { className: vt.sidebar, children: [
    s,
    /* @__PURE__ */ c.jsxs("div", { className: vt.controlGroup, children: [
      /* @__PURE__ */ c.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ c.jsx("div", { className: vt.spiralList, children: f.map(function(H, X) {
        return /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: X === d ? vt.spiralItemActive : vt.spiralItem,
            children: [
              /* @__PURE__ */ c.jsxs("span", { children: [
                "Spiral ",
                X + 1
              ] }),
              /* @__PURE__ */ c.jsxs("div", { className: vt.actions, children: [
                /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
                  E(X);
                }, children: "Edit" }),
                /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
                  y(X);
                }, children: "Delete" })
              ] })
            ]
          },
          H.id
        );
      }) }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: m, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ c.jsxs("div", { className: vt.controlGroup, children: [
      /* @__PURE__ */ c.jsx("h3", { children: "Current Spiral Properties" }),
      N1.map(function(H) {
        return /* @__PURE__ */ c.jsxs("div", { className: vt.controlRow, children: [
          /* @__PURE__ */ c.jsxs("label", { children: [
            H.label,
            ":"
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "range",
              min: H.min,
              max: H.max,
              step: H.step,
              value: o[H.key],
              onChange: function(X) {
                z(H.key, Number(X.target.value));
              }
            }
          ),
          /* @__PURE__ */ c.jsxs("span", { className: vt.valueDisplay, children: [
            H.key === "speed" || H.key === "opacity" || H.key === "timeOffset" ? Number(o[H.key]).toFixed(1) : o[H.key],
            H.suffix || ""
          ] })
        ] }, H.key);
      }),
      /* @__PURE__ */ c.jsxs("div", { className: vt.controlRow, children: [
        /* @__PURE__ */ c.jsx("label", { children: "Color:" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "color",
            value: o.color,
            onChange: function(H) {
              z("color", H.target.value);
            }
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: vt.controlGroup, children: [
      /* @__PURE__ */ c.jsx("h3", { children: "Configuration" }),
      /* @__PURE__ */ c.jsxs("div", { className: vt.controlRow, children: [
        /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: S, children: "Save Config" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
          L.current.click();
        }, children: "Load Config" })
      ] }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          ref: L,
          style: { display: "none" },
          onChange: function(H) {
            H.target.files[0] && A(H.target.files[0]), H.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: vt.controlGroup, children: [
      /* @__PURE__ */ c.jsx("h3", { children: "Global Settings" }),
      /* @__PURE__ */ c.jsxs("div", { className: vt.controlRow, children: [
        /* @__PURE__ */ c.jsx("label", { children: "Background:" }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "color",
            value: M,
            onChange: function(H) {
              N(H.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: D, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ c.jsx(Q, { onClick: U, className: vt.sendAsTask, children: "Send as Task" })
  ] });
}
var A1 = [
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
function z1(s) {
  var f = s.split(`
`).filter(function(d) {
    return d.trim();
  });
  return f.map(function(d) {
    if (d = d.trim(), d.indexOf("DELAY:") === 0) {
      var o = parseInt(d.substring(6));
      return isNaN(o) ? null : { type: "delay", value: o };
    }
    return { type: "text", value: d };
  }).filter(Boolean);
}
function C1() {
  var [s, f] = O.useState(A1), [d, o] = O.useState(2e3), [m, y] = O.useState(3e3), [E, D] = O.useState(0.5), [z, M] = O.useState(2.5), [N, S] = O.useState("#ffffff"), [A, U] = O.useState(!1), [L, H] = O.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), X = O.useRef(null), W = O.useRef(0), P = O.useRef([]), Ke = O.useRef(!1), ue = O.useRef(m), Be = O.useRef(E);
  O.useEffect(function() {
    ue.current = m;
  }, [m]), O.useEffect(function() {
    Be.current = E;
  }, [E]);
  function Je(De) {
    H({ text: De, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        H({ text: De, shown: !0, instant: !1 });
      });
    });
  }
  function Y() {
    H(function(De) {
      return { text: De.text, shown: !1, instant: !1 };
    });
  }
  function k() {
    if (!Ke.current) {
      Y();
      return;
    }
    W.current >= P.current.length && (W.current = 0);
    var De = P.current[W.current];
    if (De)
      if (De.type === "text") {
        setTimeout(function() {
          Je(De.value);
        }, 50), W.current++;
        var qe = Be.current * 1e3, Ft = qe + ue.current + qe + 50;
        X.current = setTimeout(k, Ft);
      } else
        Y(), W.current++, X.current = setTimeout(k, De.value);
  }
  function Oe() {
    X.current && clearTimeout(X.current), P.current = z1(s), W.current = 0, Ke.current = !0, U(!0), k();
  }
  function Ye() {
    Ke.current = !1, U(!1), X.current && clearTimeout(X.current), H({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return O.useEffect(function() {
    return function() {
      Ke.current = !1, X.current && clearTimeout(X.current);
    };
  }, []), {
    display: L,
    script: s,
    setScript: f,
    interval: d,
    setInterval: o,
    holdDuration: m,
    setHoldDuration: y,
    animSpeed: E,
    setAnimSpeed: D,
    fontSize: z,
    setFontSize: M,
    color: N,
    setColor: S,
    isRunning: A,
    startLoop: Oe,
    stopLoop: Ye
  };
}
const w1 = "_overlay_1wcd7_1", D1 = {
  overlay: w1
};
function O1({ display: s, animSpeed: f, fontSize: d, color: o }) {
  return /* @__PURE__ */ c.jsx(
    "div",
    {
      className: D1.overlay,
      style: {
        opacity: s.shown ? 1 : 0,
        transform: "translate(-50%, -50%) scale(" + (s.shown ? 1 : s.instant ? 0 : 2) + ")",
        transition: s.instant ? "none" : "opacity " + f + "s ease-out, transform " + f + "s ease-out",
        fontSize: d + "rem",
        color: o
      },
      children: s.text
    }
  );
}
const M1 = "_controlGroup_1idk2_1", R1 = "_script_1idk2_12", U1 = "_controlRow_1idk2_24", H1 = "_valueDisplay_1idk2_42", q1 = "_buttonRow_1idk2_49", Gt = {
  controlGroup: M1,
  script: R1,
  controlRow: U1,
  valueDisplay: H1,
  buttonRow: q1
};
function L1(s) {
  return /* @__PURE__ */ c.jsxs("div", { className: Gt.controlGroup, children: [
    /* @__PURE__ */ c.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ c.jsx(
      "textarea",
      {
        className: Gt.script,
        value: s.script,
        onChange: function(f) {
          s.setScript(f.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.controlRow, children: [
      /* @__PURE__ */ c.jsx("label", { children: "Display Time:" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: "500",
          max: "5000",
          value: s.interval,
          onChange: function(f) {
            s.setInterval(Number(f.target.value));
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Gt.valueDisplay, children: [
        s.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.controlRow, children: [
      /* @__PURE__ */ c.jsx("label", { children: "Hold Duration:" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: "1000",
          max: "8000",
          value: s.holdDuration,
          onChange: function(f) {
            s.setHoldDuration(Number(f.target.value));
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Gt.valueDisplay, children: [
        s.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.controlRow, children: [
      /* @__PURE__ */ c.jsx("label", { children: "Animation Speed:" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: "0.1",
          max: "2",
          step: "0.1",
          value: s.animSpeed,
          onChange: function(f) {
            s.setAnimSpeed(Number(f.target.value));
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Gt.valueDisplay, children: [
        s.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.controlRow, children: [
      /* @__PURE__ */ c.jsx("label", { children: "Text Size:" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "range",
          min: "1",
          max: "6",
          step: "0.1",
          value: s.fontSize,
          onChange: function(f) {
            s.setFontSize(Number(f.target.value));
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("span", { className: Gt.valueDisplay, children: [
        s.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.controlRow, children: [
      /* @__PURE__ */ c.jsx("label", { children: "Text Color:" }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "color",
          value: s.color,
          onChange: function(f) {
            s.setColor(f.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Gt.buttonRow, children: [
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: s.startLoop, disabled: s.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: s.stopLoop, disabled: !s.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const B1 = "_row_1vgi4_1", Y1 = "_checkboxRow_1vgi4_12", G1 = "_selectLabel_1vgi4_19", X1 = "_select_1vgi4_19", Q1 = "_actions_1vgi4_36", Ra = {
  row: B1,
  checkboxRow: Y1,
  selectLabel: G1,
  select: X1,
  actions: Q1
};
function Z1({ onClose: s, onSent: f }) {
  var [d, o] = O.useState("Experience the Spiral Animation"), [m, y] = O.useState(10), [E, D] = O.useState(5), [z, M] = O.useState(""), [N, S] = O.useState(!1), [A, U] = O.useState("daily"), [L, H] = O.useState(!1);
  async function X() {
    var W = d.trim();
    if (!W) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (z) {
      var P = new Date(z);
      if (isNaN(P.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (P < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    H(!0);
    try {
      var Ke = {
        text: W,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        assignedTo: window.getSlaves()[0] || window.currentUser,
        points: Number(m) || 10,
        penaltyPoints: Number(E) || 5,
        dueDate: z || null,
        isRepeating: N,
        repeatInterval: N ? A : null,
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
      }, { error: ue } = await window.supabase.from("tasks").insert([Ke]);
      if (ue) {
        console.error("Error creating spiral task:", ue), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + W + '" created successfully!',
        "success"
      ), f();
    } finally {
      H(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs(gh, { title: "🌀 Create Spiral Task", onClose: s, children: [
    /* @__PURE__ */ c.jsx(
      re,
      {
        label: "Task Description",
        value: d,
        onChange: function(W) {
          o(W.target.value);
        },
        maxLength: 200
      }
    ),
    /* @__PURE__ */ c.jsxs("div", { className: Ra.row, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: m,
          onChange: function(W) {
            y(W.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Penalty Points",
          type: "number",
          min: "0",
          max: "50",
          value: E,
          onChange: function(W) {
            D(W.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Ra.row, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: z,
          onChange: function(W) {
            M(W.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: Ra.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: N,
            onChange: function(W) {
              S(W.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    N ? /* @__PURE__ */ c.jsx("div", { className: Ra.row, children: /* @__PURE__ */ c.jsxs("label", { className: Ra.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ c.jsxs(
        "select",
        {
          className: Ra.select,
          value: A,
          onChange: function(W) {
            U(W.target.value);
          },
          children: [
            /* @__PURE__ */ c.jsx("option", { value: "daily", children: "Daily" }),
            /* @__PURE__ */ c.jsx("option", { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ c.jsx("option", { value: "monthly", children: "Monthly" })
          ]
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: Ra.actions, children: [
      /* @__PURE__ */ c.jsx(Q, { loading: L, onClick: X, children: "Create Task" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: s, children: "Cancel" })
    ] })
  ] });
}
const V1 = "_overlay_2c0yy_1", K1 = "_closeBtn_2c0yy_10", J1 = "_viewer_2c0yy_26", $1 = "_canvasArea_2c0yy_32", Sc = {
  overlay: V1,
  closeBtn: K1,
  viewer: J1,
  canvasArea: $1
};
function Hu(s) {
  return s ? Object.assign({}, s) : null;
}
function k1({ onClose: s }) {
  var f = O.useRef(null), d = O.useRef([]), o = O.useRef(1), [, m] = O.useState(0), [y, E] = O.useState(0), [D, z] = O.useState(null), [M, N] = O.useState("#000000"), [S, A] = O.useState(!1), U = C1();
  function L() {
    var Y = f.current;
    return Y ? { width: Y.width, height: Y.height } : { width: 0, height: 0 };
  }
  function H() {
    var Y = L(), k = r1(o.current++, Y.width, Y.height);
    d.current = d.current.concat(k), E(d.current.length - 1), z(Hu(k)), m(function(Oe) {
      return Oe + 1;
    });
  }
  function X(Y) {
    d.current = d.current.filter(function(Oe, Ye) {
      return Ye !== Y;
    });
    var k = Math.max(0, Y - 1);
    E(k), z(Hu(d.current[k])), m(function(Oe) {
      return Oe + 1;
    });
  }
  function W(Y) {
    E(Y), z(Hu(d.current[Y]));
  }
  function P() {
    d.current = [], E(0), z(null), m(function(Y) {
      return Y + 1;
    });
  }
  function Ke(Y, k) {
    var Oe = d.current[y];
    Oe && (Oe[Y] = k, z(Hu(Oe)));
  }
  function ue() {
    o1({
      spirals: d.current.map(function(Y) {
        return Object.assign({}, Y);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: M,
        selectedSpiralIndex: y
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function Be(Y) {
    d1(
      Y,
      function(k) {
        var Oe = L(), Ye = (k.spirals || []).map(function(qe) {
          return o.current = Math.max(o.current, (qe.id || 0) + 1), Object.assign(
            { x: Oe.width / 2, y: Oe.height / 2 },
            ph,
            qe
          );
        });
        d.current = Ye;
        var De = k.globalSettings && k.globalSettings.selectedSpiralIndex || 0;
        E(De), z(Hu(Ye[De] || Ye[0])), k.globalSettings && k.globalSettings.backgroundColor && N(k.globalSettings.backgroundColor), m(function(qe) {
          return qe + 1;
        }), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(k) {
        window.showNotification(k, "error");
      }
    );
  }
  O.useEffect(function() {
    d.current.length === 0 && H();
    function Y(k) {
      k.key === "Escape" && s();
    }
    return document.addEventListener("keydown", Y), function() {
      document.removeEventListener("keydown", Y);
    };
  }, []);
  var Je = d.current.map(function(Y) {
    return { id: Y.id };
  });
  return /* @__PURE__ */ c.jsxs("div", { className: Sc.overlay, children: [
    /* @__PURE__ */ c.jsx("button", { type: "button", className: Sc.closeBtn, onClick: s, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ c.jsxs("div", { className: Sc.viewer, children: [
      /* @__PURE__ */ c.jsxs("div", { className: Sc.canvasArea, children: [
        /* @__PURE__ */ c.jsx(h1, { canvasRef: f, spiralsRef: d, backgroundColor: M }),
        /* @__PURE__ */ c.jsx(
          O1,
          {
            display: U.display,
            animSpeed: U.animSpeed,
            fontSize: U.fontSize,
            color: U.color
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx(
        E1,
        {
          textControls: /* @__PURE__ */ c.jsx(L1, { ...U }),
          spirals: Je,
          activeIndex: y,
          activeSnapshot: D,
          onAdd: H,
          onDelete: X,
          onSelect: W,
          onClearAll: P,
          onPropertyChange: Ke,
          backgroundColor: M,
          onBackgroundChange: N,
          onSave: ue,
          onLoadFile: Be,
          onOpenTaskModal: function() {
            A(!0);
          }
        }
      )
    ] }),
    S ? /* @__PURE__ */ c.jsx(
      Z1,
      {
        onClose: function() {
          A(!1);
        },
        onSent: function() {
          A(!1), s();
        }
      }
    ) : null
  ] });
}
const F1 = "_heading_18in8_1", W1 = "_headingRow_18in8_6", I1 = "_row_18in8_15", P1 = "_checkboxRow_18in8_25", ep = "_select_18in8_33", tp = "_fieldset_18in8_44", lp = "_hint_18in8_51", fl = {
  heading: F1,
  headingRow: W1,
  row: I1,
  checkboxRow: P1,
  select: ep,
  fieldset: tp,
  hint: lp
};
var ch = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function ap({ onCreated: s }) {
  var f = Te(), d = Tf(), [o, m] = O.useState(ch), [y, E] = O.useState([]), [D, z] = O.useState(!1), [M, N] = O.useState(!1);
  function S(L, H) {
    m(function(X) {
      return Object.assign({}, X, { [L]: H });
    });
  }
  function A(L) {
    E(function(H) {
      return H.includes(L) ? H.filter(function(X) {
        return X !== L;
      }) : H.concat(L);
    });
  }
  async function U(L) {
    if (L.preventDefault(), !!o.text.trim()) {
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
          selectedPigs: y,
          assignmentMode: o.assignmentMode
        }), m(ch), E([]), s && s();
      } finally {
        z(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsxs("div", { className: fl.headingRow, children: [
      /* @__PURE__ */ c.jsx("h2", { className: fl.heading, children: "Create New Task" }),
      /* @__PURE__ */ c.jsx(Q, { type: "button", variant: "secondary", onClick: function() {
        N(!0);
      }, children: "🌀 Create Spiral Task" })
    ] }),
    M ? /* @__PURE__ */ c.jsx(k1, { onClose: function() {
      N(!1);
    } }) : null,
    /* @__PURE__ */ c.jsxs("form", { onSubmit: U, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Task description",
          value: o.text,
          onChange: function(L) {
            S("text", L.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: fl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: o.isDemerit,
            onChange: function(L) {
              S("isDemerit", L.target.checked);
            }
          }
        ),
        "This is a demerit (penalty only, no points)"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: fl.row, children: [
        o.isDemerit ? null : /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Points",
            type: "number",
            min: "0",
            value: o.points,
            onChange: function(L) {
              S("points", L.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Penalty points",
            type: "number",
            min: "0",
            value: o.penaltyPoints,
            onChange: function(L) {
              S("penaltyPoints", L.target.value);
            }
          }
        ),
        o.isDemerit ? null : /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Due date",
            type: "datetime-local",
            value: o.dueDate,
            onChange: function(L) {
              S("dueDate", L.target.value);
            }
          }
        )
      ] }),
      o.isDemerit ? null : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("label", { className: fl.checkboxRow, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: o.isRepeating,
              onChange: function(L) {
                S("isRepeating", L.target.checked);
              }
            }
          ),
          "Repeats"
        ] }),
        o.isRepeating ? /* @__PURE__ */ c.jsxs(
          "select",
          {
            className: fl.select,
            value: o.repeatInterval,
            onChange: function(L) {
              S("repeatInterval", L.target.value);
            },
            children: [
              /* @__PURE__ */ c.jsx("option", { value: "daily", children: "Daily" }),
              /* @__PURE__ */ c.jsx("option", { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ c.jsx("option", { value: "monthly", children: "Monthly" })
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ c.jsxs("fieldset", { className: fl.fieldset, children: [
        /* @__PURE__ */ c.jsxs("legend", { children: [
          "Assign to ",
          f.groupTerms.slaveLabelPlural
        ] }),
        d.slaves.length === 0 ? /* @__PURE__ */ c.jsxs("p", { className: fl.hint, children: [
          "No ",
          f.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : d.slaves.map(function(L) {
          return /* @__PURE__ */ c.jsxs("label", { className: fl.checkboxRow, children: [
            /* @__PURE__ */ c.jsx(
              "input",
              {
                type: "checkbox",
                checked: y.includes(L.username),
                onChange: function() {
                  A(L.username);
                }
              }
            ),
            L.displayName
          ] }, L.username);
        })
      ] }),
      !o.isDemerit && y.length > 1 ? /* @__PURE__ */ c.jsxs(
        "select",
        {
          className: fl.select,
          value: o.assignmentMode,
          onChange: function(L) {
            S("assignmentMode", L.target.value);
          },
          "aria-label": "Assignment mode",
          children: [
            /* @__PURE__ */ c.jsxs("option", { value: "individual", children: [
              "One copy per ",
              f.groupTerms.slaveLabel
            ] }),
            /* @__PURE__ */ c.jsx("option", { value: "shared", children: "Shared (one task, anyone can complete it)" })
          ]
        }
      ) : null,
      /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: D, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const np = "_wrap_1qfmw_1", up = "_spinner_1qfmw_10", sh = {
  wrap: np,
  spinner: up
};
function ol({ label: s = "Loading..." }) {
  return /* @__PURE__ */ c.jsxs("div", { className: sh.wrap, role: "status", children: [
    /* @__PURE__ */ c.jsx("span", { className: sh.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsx("span", { children: s })
  ] });
}
const ip = "_wrap_buujm_1", cp = "_message_buujm_9", rh = {
  wrap: ip,
  message: cp
};
function Ol({ message: s = "Something went wrong.", onRetry: f }) {
  return /* @__PURE__ */ c.jsxs("div", { className: rh.wrap, role: "alert", children: [
    /* @__PURE__ */ c.jsx("p", { className: rh.message, children: s }),
    f ? /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: f, children: "Try again" }) : null
  ] });
}
const sp = "_wrap_mx4zv_1", rp = "_icon_mx4zv_7", fp = "_title_mx4zv_12", op = "_hint_mx4zv_18", bc = {
  wrap: sp,
  icon: rp,
  title: fp,
  hint: op
};
function st({ icon: s = "—", title: f, hint: d }) {
  return /* @__PURE__ */ c.jsxs("div", { className: bc.wrap, children: [
    /* @__PURE__ */ c.jsx("div", { className: bc.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ c.jsx("p", { className: bc.title, children: f }),
    d ? /* @__PURE__ */ c.jsx("p", { className: bc.hint, children: d }) : null
  ] });
}
const dp = "_badge_1988s_1", vp = "_neutral_1988s_10", mp = "_success_1988s_15", hp = "_warning_1988s_20", yp = "_danger_1988s_25", qu = {
  badge: dp,
  neutral: vp,
  success: mp,
  warning: hp,
  danger: yp
};
function mt({ tone: s = "neutral", children: f }) {
  var d = s === "success" ? qu.success : s === "warning" ? qu.warning : s === "danger" ? qu.danger : qu.neutral;
  return /* @__PURE__ */ c.jsx("span", { className: [qu.badge, d].join(" "), children: f });
}
function _h(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function Sh(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const gp = "_item_v1inl_1", pp = "_header_v1inl_5", _p = "_text_v1inl_11", Sp = "_meta_v1inl_16", bp = "_appealText_v1inl_33", xp = "_actions_v1inl_41", wn = {
  item: gp,
  header: pp,
  text: _p,
  meta: Sp,
  appealText: bp,
  actions: xp
};
function Tp({ task: s, actions: f }) {
  var d = Te(), o = window.users[s.assignedTo], m = s.type === "cost-tracker", y = m ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ c.jsxs(Ne, { className: wn.item, children: [
    /* @__PURE__ */ c.jsxs("div", { className: wn.header, children: [
      /* @__PURE__ */ c.jsx(mt, { tone: Sh(s), children: _h(s) }),
      s.type === "demerit" ? /* @__PURE__ */ c.jsx(mt, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: wn.text, children: m ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ c.jsxs("dl", { className: wn.meta, children: [
      s.assignedTo ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ c.jsx("dd", { children: o ? o.displayName : s.assignedTo })
      ] }) : /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Assignment" }),
        /* @__PURE__ */ c.jsx("dd", { children: "Shared" })
      ] }),
      !m && s.points ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Points" }),
        /* @__PURE__ */ c.jsxs("dd", { children: [
          "+",
          s.points
        ] })
      ] }) : null,
      s.penaltyPoints ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Penalty" }),
        /* @__PURE__ */ c.jsxs("dd", { children: [
          "-",
          s.penaltyPoints
        ] })
      ] }) : null,
      m && y ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ c.jsx("dd", { children: y })
      ] }) : null,
      s.dueDate ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ c.jsx("dd", { children: window.formatDate(s.dueDate) })
      ] }) : null
    ] }),
    s.appealText ? /* @__PURE__ */ c.jsxs("p", { className: wn.appealText, children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: wn.actions, children: [
      d.isSlave && !m && s.type !== "demerit" && s.assignedTo === d.currentUser && s.status === "todo" ? /* @__PURE__ */ c.jsx(Q, { onClick: function() {
        f.checkOffTask(s.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && s.type === "demerit" && s.status === "demerit_issued" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Q, { onClick: function() {
          f.acceptDemerit(s.id);
        }, children: "Accept" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
          f.appealDemerit(s.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && m && s.status === "todo" ? /* @__PURE__ */ c.jsx(Q, { onClick: function() {
        f.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && s.status === "pending_approval" && m ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Q, { onClick: function() {
          f.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
          f.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && s.status === "pending_approval" && !m ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Q, { onClick: function() {
          f.approveTask(s.id);
        }, children: "Approve" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
          f.rejectTask(s.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && s.type === "demerit" && s.appealStatus === "pending" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Q, { onClick: function() {
          f.approveAppeal(s.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
          f.denyAppeal(s.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
        f.deleteTask(s.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function xc({ tasks: s, status: f, error: d, onRetry: o, actions: m, emptyLabel: y }) {
  return f === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading tasks..." }) : f === "error" ? /* @__PURE__ */ c.jsx(
    Ol,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : s.length === 0 ? /* @__PURE__ */ c.jsx(st, { icon: "✓", title: y || "No tasks yet" }) : /* @__PURE__ */ c.jsx("div", { children: s.map(function(E) {
    return /* @__PURE__ */ c.jsx(Tp, { task: E, actions: m }, E.id);
  }) });
}
const jp = "_section_7c868_1", Np = "_heading_7c868_5", Dn = {
  section: jp,
  heading: Np
};
function Ep() {
  var s = Te(), f = xf(), d = i1(), o = {
    checkOffTask: f.checkOffTask,
    approveTask: f.approveTask,
    rejectTask: f.rejectTask,
    deleteTask: f.deleteTask,
    acceptDemerit: f.acceptDemerit,
    appealDemerit: f.appealDemerit,
    approveAppeal: f.approveAppeal,
    denyAppeal: f.denyAppeal,
    markInvoiceAsPaid: f.markInvoiceAsPaid,
    approveInvoice: f.approveInvoice
  };
  if (s.isSlave) {
    var m = f.tasks.filter(function(D) {
      return D.assignedTo === s.currentUser || d.includes(D.id);
    });
    return /* @__PURE__ */ c.jsx(
      xc,
      {
        tasks: m,
        status: f.status,
        error: f.error,
        onRetry: f.reload,
        actions: o,
        emptyLabel: "No tasks assigned to you yet."
      }
    );
  }
  var y = f.tasks.filter(function(D) {
    return D.type === "demerit" && D.appealStatus === "pending";
  }), E = f.tasks.filter(function(D) {
    return D.status === "pending_approval";
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(ap, { onCreated: f.reload }),
    y.length > 0 ? /* @__PURE__ */ c.jsxs(Ne, { className: Dn.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: Dn.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ c.jsx(
        xc,
        {
          tasks: y,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    E.length > 0 ? /* @__PURE__ */ c.jsxs(Ne, { className: Dn.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: Dn.heading, children: "Pending Approval" }),
      /* @__PURE__ */ c.jsx(
        xc,
        {
          tasks: E,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs(Ne, { className: Dn.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: Dn.heading, children: "All Tasks" }),
      /* @__PURE__ */ c.jsx(
        xc,
        {
          tasks: f.tasks,
          status: f.status,
          error: f.error,
          onRetry: f.reload,
          actions: o,
          emptyLabel: "No tasks created yet"
        }
      )
    ] })
  ] });
}
const Ap = "_day_1bhqz_1", zp = "_dayHeading_1bhqz_5", Cp = "_item_1bhqz_13", wp = "_text_1bhqz_17", Dp = "_meta_1bhqz_21", On = {
  day: Ap,
  dayHeading: zp,
  item: Cp,
  text: wp,
  meta: Dp
};
function Op(s) {
  return new Date(s).toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function Mp() {
  var s = Te(), f = xf();
  if (f.status === "loading") return /* @__PURE__ */ c.jsx(ol, { label: "Loading tasks..." });
  if (f.status === "error")
    return /* @__PURE__ */ c.jsx(Ol, { message: f.error ? f.error.message : "", onRetry: f.reload });
  var d = f.tasks.filter(function(m) {
    return m.dueDate ? s.isSlave ? m.assignedTo === s.currentUser : !0 : !1;
  });
  if (d.length === 0)
    return /* @__PURE__ */ c.jsx(st, { title: "No upcoming due dates" });
  var o = {};
  return d.slice().sort(function(m, y) {
    return new Date(m.dueDate) - new Date(y.dueDate);
  }).forEach(function(m) {
    var y = Op(m.dueDate);
    o[y] = o[y] || [], o[y].push(m);
  }), /* @__PURE__ */ c.jsx("div", { children: Object.keys(o).map(function(m) {
    return /* @__PURE__ */ c.jsxs("section", { className: On.day, children: [
      /* @__PURE__ */ c.jsx("h3", { className: On.dayHeading, children: m }),
      o[m].map(function(y) {
        var E = window.users[y.assignedTo];
        return /* @__PURE__ */ c.jsxs(Ne, { className: On.item, children: [
          /* @__PURE__ */ c.jsx(mt, { tone: Sh(y), children: _h(y) }),
          /* @__PURE__ */ c.jsx("p", { className: On.text, children: y.text }),
          !s.isSlave && y.assignedTo ? /* @__PURE__ */ c.jsxs("p", { className: On.meta, children: [
            "Assigned to ",
            E ? E.displayName : y.assignedTo
          ] }) : null,
          /* @__PURE__ */ c.jsxs("p", { className: On.meta, children: [
            "Due ",
            window.formatDate(y.dueDate)
          ] })
        ] }, y.id);
      })
    ] }, m);
  }) });
}
function Rp(s, f) {
  return new Date(f.timestamp) - new Date(s.timestamp);
}
function Up() {
  var s = Te(), f = Dl({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: Rp
  });
  return {
    activity: f.items.slice(0, 50),
    status: f.status,
    error: f.error,
    reload: f.reload
  };
}
const Hp = "_row_qtrye_1", qp = "_tile_qtrye_8", Lp = "_number_qtrye_12", Bp = "_label_qtrye_17", Tc = {
  row: Hp,
  tile: qp,
  number: Lp,
  label: Bp
};
function Yp({ stats: s }) {
  return /* @__PURE__ */ c.jsx("div", { className: Tc.row, children: s.map(function(f) {
    return /* @__PURE__ */ c.jsxs(Ne, { className: Tc.tile, children: [
      /* @__PURE__ */ c.jsx("div", { className: Tc.number, children: f.value }),
      /* @__PURE__ */ c.jsx("div", { className: Tc.label, children: f.label })
    ] }, f.label);
  }) });
}
const Gp = "_list_azyhi_1", Xp = "_row_azyhi_7", Qp = "_positive_azyhi_13", Zp = "_zero_azyhi_18", Vp = "_negative_azyhi_23", Qu = {
  list: Gp,
  row: Xp,
  positive: Qp,
  zero: Zp,
  negative: Vp
};
function Kp(s) {
  return s < 0 ? Qu.negative : s === 0 ? Qu.zero : Qu.positive;
}
function Jp({ slaves: s }) {
  var f = Te();
  return s.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No " + f.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ c.jsx("div", { className: Qu.list, children: s.map(function(d) {
    return /* @__PURE__ */ c.jsxs(Ne, { className: Qu.row, children: [
      /* @__PURE__ */ c.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ c.jsxs("span", { className: Kp(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const $p = "_heading_1mu37_1", kp = "_form_1mu37_6", Fp = "_select_1mu37_13", yf = {
  heading: $p,
  form: kp,
  select: Fp
};
function Wp({ slaves: s }) {
  var f = Te(), [d, o] = O.useState(s[0] ? s[0].username : ""), [m, y] = O.useState(0);
  O.useEffect(
    function() {
      var D = s.find(function(z) {
        return z.username === d;
      });
      D ? y(D.points) : s[0] && o(s[0].username);
    },
    [s, d]
  );
  async function E(D) {
    if (D.preventDefault(), !!d) {
      var z = s.find(function(N) {
        return N.username === d;
      }), M = z ? z.points : 0;
      await window.updateUserPoints(d, Number(m) || 0, "set"), window.showNotification(
        (z ? z.displayName : d) + " points changed from " + M + " to " + (Number(m) || 0),
        "success"
      );
    }
  }
  return s.length === 0 ? null : /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsxs("h3", { className: yf.heading, children: [
      "Set ",
      f.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ c.jsxs("form", { className: yf.form, onSubmit: E, children: [
      /* @__PURE__ */ c.jsx(
        "select",
        {
          className: yf.select,
          value: d,
          onChange: function(D) {
            o(D.target.value);
          },
          "aria-label": "Select " + f.groupTerms.slaveLabel,
          children: s.map(function(D) {
            return /* @__PURE__ */ c.jsx("option", { value: D.username, children: D.displayName }, D.username);
          })
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "New points",
          type: "number",
          value: m,
          onChange: function(D) {
            y(D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(Q, { type: "submit", children: "Set" })
    ] })
  ] });
}
const Ip = "_list_1jial_1", Pp = "_item_1jial_10", e_ = "_user_1jial_16", t_ = "_details_1jial_20", l_ = "_time_1jial_24", Mn = {
  list: Ip,
  item: Pp,
  user: e_,
  details: t_,
  time: l_
};
function a_({ activity: s, status: f, error: d, onRetry: o }) {
  return f === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading activity..." }) : f === "error" ? /* @__PURE__ */ c.jsx(Ol, { message: d ? d.message : "", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No recent activity" }) : /* @__PURE__ */ c.jsx("ul", { className: Mn.list, children: s.map(function(m, y) {
    var E = window.users[m.user];
    return /* @__PURE__ */ c.jsxs("li", { className: Mn.item, children: [
      /* @__PURE__ */ c.jsx("span", { className: Mn.user, children: E ? E.displayName : m.user }),
      " ",
      /* @__PURE__ */ c.jsx("span", { className: Mn.action, children: m.action.replace(/_/g, " ") }),
      m.details ? /* @__PURE__ */ c.jsxs("span", { className: Mn.details, children: [
        " — ",
        m.details
      ] }) : null,
      /* @__PURE__ */ c.jsx("span", { className: Mn.time, children: window.formatDate(m.timestamp) })
    ] }, y);
  }) });
}
function n_(s, f) {
  return new Date(f.started_at) - new Date(s.started_at);
}
function bh() {
  var s = Te(), f = Dl({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: n_
  }), d = f.items.filter(function(o) {
    return o.status === "running";
  });
  return {
    trackers: d,
    status: f.status,
    error: f.error,
    reload: f.reload,
    startTracker: function(o, m, y, E, D) {
      return window.startLiveCostTracker(
        o,
        m,
        y,
        E,
        D
      );
    },
    stopTracker: function(o, m) {
      return window.stopLiveCostTracker(o, m !== !1);
    },
    addPenalty: function(o, m, y) {
      return window.addPenaltyToLiveTracker(o, m, y);
    },
    removePenalty: function(o, m) {
      return window.removePenaltyFromLiveTracker(o, m);
    }
  };
}
const u_ = "_heading_6ayp8_1", i_ = "_row_6ayp8_6", c_ = "_selectGroup_6ayp8_16", s_ = "_selectLabel_6ayp8_23", r_ = "_select_6ayp8_16", f_ = "_penaltyForm_6ayp8_38", o_ = "_penaltyList_6ayp8_50", d_ = "_removePenalty_6ayp8_58", Xt = {
  heading: u_,
  row: i_,
  selectGroup: c_,
  selectLabel: s_,
  select: r_,
  penaltyForm: f_,
  penaltyList: o_,
  removePenalty: d_
};
function v_({ onStart: s }) {
  var [f, d] = O.useState("Cost Tracker Running"), [o, m] = O.useState(50), [y, E] = O.useState("€"), [D, z] = O.useState(6e4), [M, N] = O.useState(!1), [S, A] = O.useState([]), [U, L] = O.useState(""), [H, X] = O.useState("");
  if (!window.hasPermission("create_task")) return null;
  function W() {
    A(function(ue) {
      return ue.concat({
        description: U.trim(),
        amount: Number(H)
      });
    }), L(""), X("");
  }
  function P(ue) {
    A(function(Be) {
      return Be.filter(function(Je, Y) {
        return Y !== ue;
      });
    });
  }
  async function Ke(ue) {
    ue.preventDefault(), N(!0);
    try {
      await s(f, Number(o) || 0, y, Number(D), S), A([]);
    } finally {
      N(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: Xt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ c.jsxs("form", { className: Xt.form, onSubmit: Ke, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Description",
          value: f,
          onChange: function(ue) {
            d(ue.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: Xt.row, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: o,
            onChange: function(ue) {
              m(ue.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: Xt.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: Xt.selectLabel, children: "Currency" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Xt.select,
              value: y,
              onChange: function(ue) {
                E(ue.target.value);
              },
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "€", children: "Euro (€)" }),
                /* @__PURE__ */ c.jsx("option", { value: "£", children: "Pound (£)" }),
                /* @__PURE__ */ c.jsx("option", { value: "$", children: "Dollar ($)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: Xt.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: Xt.selectLabel, children: "Per" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Xt.select,
              value: D,
              onChange: function(ue) {
                z(ue.target.value);
              },
              children: [
                /* @__PURE__ */ c.jsx("option", { value: 1e3, children: "Second" }),
                /* @__PURE__ */ c.jsx("option", { value: 6e4, children: "Minute" }),
                /* @__PURE__ */ c.jsx("option", { value: 36e5, children: "Hour" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Xt.penaltyForm, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Penalty description",
            value: U,
            onChange: function(ue) {
              L(ue.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: H,
            onChange: function(ue) {
              X(ue.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          Q,
          {
            type: "button",
            variant: "secondary",
            disabled: !U.trim() || !H,
            onClick: W,
            children: "Add penalty"
          }
        )
      ] }),
      S.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: Xt.penaltyList, children: S.map(function(ue, Be) {
        return /* @__PURE__ */ c.jsxs("li", { children: [
          ue.description,
          ": ",
          y,
          ue.amount.toFixed(2),
          /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              className: Xt.removePenalty,
              onClick: function() {
                P(Be);
              },
              "aria-label": "Remove staged penalty " + ue.description,
              children: "×"
            }
          )
        ] }, Be);
      }) }) : null,
      /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: M, children: "Start tracker" })
    ] })
  ] });
}
const m_ = "_card_1e2js_1", h_ = "_description_1e2js_5", y_ = "_meta_1e2js_10", g_ = "_readout_1e2js_16", p_ = "_amount_1e2js_24", __ = "_penaltyList_1e2js_28", S_ = "_removePenalty_1e2js_36", b_ = "_penaltyForm_1e2js_44", x_ = "_stopActions_1e2js_52", Cl = {
  card: m_,
  description: h_,
  meta: y_,
  readout: g_,
  amount: p_,
  penaltyList: __,
  removePenalty: S_,
  penaltyForm: b_,
  stopActions: x_
};
function T_(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function j_(s, f) {
  var d = Math.max(0, f - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, m = parseFloat(s.rate) || 0, y = d / o * m, E = [];
  try {
    E = JSON.parse(s.penalties || "[]");
  } catch {
    E = [];
  }
  var D = E.reduce(function(A, U) {
    return A + (parseFloat(U.amount) || 0);
  }, 0), z = Math.floor(d / 36e5), M = Math.floor(d % 36e5 / 6e4), N = Math.floor(d % 6e4 / 1e3), S = String(z).padStart(2, "0") + ":" + String(M).padStart(2, "0") + ":" + String(N).padStart(2, "0");
  return {
    timeText: S,
    penalties: E,
    penaltyTotal: D,
    grandTotal: y + D
  };
}
function xh({ tracker: s, isAdmin: f, onStop: d, onAddPenalty: o, onRemovePenalty: m }) {
  var [y, E] = O.useState(Date.now()), [D, z] = O.useState(""), [M, N] = O.useState("");
  O.useEffect(function() {
    var U = window.setInterval(function() {
      E(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(U);
    };
  }, []);
  var S = j_(s, y), A = window.users[s.created_by];
  return /* @__PURE__ */ c.jsxs(Ne, { className: Cl.card, children: [
    /* @__PURE__ */ c.jsx("p", { className: Cl.description, children: s.description }),
    /* @__PURE__ */ c.jsxs("p", { className: Cl.meta, children: [
      "by ",
      A ? A.displayName : s.created_by,
      " · ",
      s.currency,
      parseFloat(s.rate).toFixed(2),
      " per ",
      T_(parseInt(s.increment_interval))
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: Cl.readout, children: [
      /* @__PURE__ */ c.jsx("span", { children: S.timeText }),
      /* @__PURE__ */ c.jsxs("span", { className: Cl.amount, children: [
        s.currency,
        S.grandTotal.toFixed(2)
      ] })
    ] }),
    S.penalties.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: Cl.penaltyList, children: S.penalties.map(function(U) {
      return /* @__PURE__ */ c.jsxs("li", { children: [
        U.description,
        ": ",
        s.currency,
        parseFloat(U.amount).toFixed(2),
        f ? /* @__PURE__ */ c.jsx(
          "button",
          {
            className: Cl.removePenalty,
            onClick: function() {
              m(s.id, U.id);
            },
            "aria-label": "Remove penalty " + U.description,
            children: "×"
          }
        ) : null
      ] }, U.id);
    }) }) : null,
    f ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: Cl.penaltyForm, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: D,
            onChange: function(U) {
              z(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: M,
            onChange: function(U) {
              N(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          Q,
          {
            variant: "secondary",
            disabled: !D.trim() || !M,
            onClick: function() {
              o(s.id, D, Number(M)), z(""), N("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Cl.stopActions, children: [
        /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
          d(s.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
          d(s.id, !1);
        }, children: "Stop (no invoice)" })
      ] })
    ] }) : null
  ] });
}
const N_ = "_heading_lmzbq_1", E_ = {
  heading: N_
};
function A_() {
  var s = bh();
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(v_, { onStart: s.startTracker }),
    /* @__PURE__ */ c.jsx("h3", { className: E_.heading, children: "Active Cost Trackers" }),
    s.trackers.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No active cost trackers" }) : s.trackers.map(function(f) {
      return /* @__PURE__ */ c.jsx(
        xh,
        {
          tracker: f,
          isAdmin: !0,
          onStop: s.stopTracker,
          onAddPenalty: s.addPenalty,
          onRemovePenalty: s.removePenalty
        },
        f.id
      );
    })
  ] });
}
const z_ = "_grid_69ji7_1", C_ = "_section_69ji7_8", w_ = "_heading_69ji7_12", Rn = {
  grid: z_,
  section: C_,
  heading: w_
};
function D_() {
  var s = Te(), f = xf(), d = Tf(), o = Up(), m = f.tasks, y = [
    { label: "Total Tasks", value: m.length },
    {
      label: "Pending",
      value: m.filter(function(E) {
        return E.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: m.filter(function(E) {
        return E.status === "completed";
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(Yp, { stats: y }),
    /* @__PURE__ */ c.jsxs("div", { className: Rn.grid, children: [
      /* @__PURE__ */ c.jsxs(Ne, { className: Rn.section, children: [
        /* @__PURE__ */ c.jsxs("h2", { className: Rn.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ c.jsx(Jp, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ c.jsx(Wp, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ c.jsxs(Ne, { className: Rn.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: Rn.heading, children: "Recent Activity" }),
      /* @__PURE__ */ c.jsx(
        a_,
        {
          activity: o.activity,
          status: o.status,
          error: o.error,
          onRetry: o.reload
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(Ne, { className: Rn.section, children: /* @__PURE__ */ c.jsx(A_, {}) })
  ] });
}
function O_(s, f) {
  return new Date(f.createdAt) - new Date(s.createdAt);
}
function M_() {
  var s = Te(), f = Dl({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: O_
  });
  return {
    suggestions: f.items,
    status: f.status,
    error: f.error,
    reload: f.reload,
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
var fh = { description: "", justification: "", points: 10, dueDate: "" };
function R_({ onSubmit: s }) {
  var [f, d] = O.useState(fh), [o, m] = O.useState(!1);
  function y(D, z) {
    d(function(M) {
      return Object.assign({}, M, { [D]: z });
    });
  }
  async function E(D) {
    if (D.preventDefault(), !!f.description.trim()) {
      m(!0);
      try {
        await s(f), d(fh);
      } finally {
        m(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: E, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Description",
          value: f.description,
          onChange: function(D) {
            y("description", D.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Why? (optional)",
          multiline: !0,
          rows: 3,
          value: f.justification,
          onChange: function(D) {
            y("justification", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Suggested points",
          type: "number",
          min: "0",
          value: f.points,
          onChange: function(D) {
            y("points", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: f.dueDate,
          onChange: function(D) {
            y("dueDate", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: o, disabled: !f.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const U_ = "_card_q0jnd_1", H_ = "_badgeRow_q0jnd_5", q_ = "_description_q0jnd_11", L_ = "_justification_q0jnd_15", B_ = "_metaLine_q0jnd_21", Y_ = "_actions_q0jnd_27", Un = {
  card: U_,
  badgeRow: H_,
  description: q_,
  justification: L_,
  metaLine: B_,
  actions: Y_
};
function G_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function oh({ suggestion: s, forAdmin: f, onApprove: d, onEdit: o, onReject: m }) {
  var y = window.users[s.reviewedBy];
  return /* @__PURE__ */ c.jsxs(Ne, { className: Un.card, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Un.badgeRow, children: [
      /* @__PURE__ */ c.jsx(mt, { tone: G_(s.status), children: s.status }),
      /* @__PURE__ */ c.jsxs(mt, { tone: "neutral", children: [
        s.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: Un.description, children: s.description }),
    s.justification ? /* @__PURE__ */ c.jsx("p", { className: Un.justification, children: s.justification }) : null,
    /* @__PURE__ */ c.jsxs("p", { className: Un.metaLine, children: [
      "Submitted ",
      window.formatDate(s.createdAt),
      s.suggestedDueDate ? " · Suggested due " + window.formatDate(s.suggestedDueDate) : "",
      s.reviewedAt ? " · Reviewed by " + (y ? y.displayName : s.reviewedBy) : ""
    ] }),
    f && s.status === "pending" ? /* @__PURE__ */ c.jsxs("div", { className: Un.actions, children: [
      /* @__PURE__ */ c.jsx(Q, { onClick: function() {
        d(s.id);
      }, children: "Approve" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
        o(s.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
        m(s.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function X_() {
  var s = Te(), f = M_();
  if (f.status === "loading") return /* @__PURE__ */ c.jsx(ol, { label: "Loading suggestions..." });
  if (f.status === "error")
    return /* @__PURE__ */ c.jsx(
      Ol,
      {
        message: "Couldn't load suggestions: " + (f.error ? f.error.message : ""),
        onRetry: f.reload
      }
    );
  if (s.isSlave) {
    var d = f.suggestions.filter(function(m) {
      return m.suggestedBy === s.currentUser;
    });
    return /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx(R_, { onSubmit: f.submitSuggestion }),
      /* @__PURE__ */ c.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No suggestions submitted yet" }) : d.map(function(m) {
        return /* @__PURE__ */ c.jsx(oh, { suggestion: m, forAdmin: !1 }, m.id);
      })
    ] });
  }
  var o = f.suggestions.filter(function(m) {
    return m.status === "pending";
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No suggestions pending review" }) : o.map(function(m) {
      return /* @__PURE__ */ c.jsx(
        oh,
        {
          suggestion: m,
          forAdmin: !0,
          onApprove: f.approveSuggestion,
          onEdit: f.editSuggestion,
          onReject: f.rejectSuggestion
        },
        m.id
      );
    })
  ] });
}
var dh = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function Q_(s, f) {
  return s.title.localeCompare(f.title);
}
function Z_(s, f) {
  return new Date(f.purchaseDate) - new Date(s.purchaseDate);
}
function V_() {
  var s = Te(), f = s.activeMasterContext, d = Dl({
    table: "rewards",
    masterUsername: f,
    sort: Q_
  }), o = Dl({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: f,
    sort: Z_
  }), [m, y] = O.useState(dh), [E, D] = O.useState("loading"), z = O.useCallback(
    async function() {
      if (f) {
        D("loading");
        var M = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", f).limit(1);
        if (M.error) {
          D("error");
          return;
        }
        y(
          M.data && M.data.length > 0 ? M.data[0] : dh
        ), D("ready");
      }
    },
    [f]
  );
  return O.useEffect(
    function() {
      if (z(), !!f) {
        var M = window.supabase.channel("beta_reward_settings_" + f).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + f
          },
          function() {
            z();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(M);
        };
      }
    },
    [f, z]
  ), {
    rewards: d.items,
    rewardsStatus: d.status,
    rewardsError: d.error,
    reloadRewards: d.reload,
    purchases: o.items,
    purchasesStatus: o.status,
    purchasesError: o.error,
    reloadPurchases: o.reload,
    settings: m,
    settingsStatus: E,
    addReward: function(M, N, S, A) {
      return window.addReward(M, N, S, A);
    },
    updateReward: function(M, N, S, A, U) {
      return window.updateReward(M, N, S, A, U);
    },
    deleteReward: function(M) {
      return window.deleteReward(M);
    },
    purchaseReward: function(M) {
      return window.purchaseReward(M);
    },
    authorizePurchase: function(M) {
      return window.authorizePurchase(M);
    },
    denyPurchase: function(M) {
      return window.denyPurchase(M);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(M, N, S) {
      return window.updateRewardSystemSettings(M, N, S);
    }
  };
}
const K_ = "_card_1tc0o_1", J_ = "_title_1tc0o_7", $_ = "_description_1tc0o_12", k_ = "_badgeRow_1tc0o_19", F_ = "_actions_1tc0o_24", Lu = {
  card: K_,
  title: J_,
  description: $_,
  badgeRow: k_,
  actions: F_
};
function Th({ reward: s, onPurchase: f, onEdit: d, onDelete: o, isAdmin: m }) {
  return /* @__PURE__ */ c.jsxs(Ne, { className: Lu.card, children: [
    /* @__PURE__ */ c.jsx("h3", { className: Lu.title, children: s.title }),
    /* @__PURE__ */ c.jsx("p", { className: Lu.description, children: s.description }),
    /* @__PURE__ */ c.jsxs("div", { className: Lu.badgeRow, children: [
      /* @__PURE__ */ c.jsxs(mt, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ c.jsx(mt, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    m ? /* @__PURE__ */ c.jsxs("div", { className: Lu.actions, children: [
      /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
        d(s);
      }, children: "Edit" }),
      /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
        o(s.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ c.jsx(Q, { onClick: function() {
      f(s.id);
    }, children: "Purchase" })
  ] });
}
const W_ = "_grid_19ohq_1", I_ = "_purchasesHeading_19ohq_7", P_ = "_purchaseCard_19ohq_11", eS = "_badgeRow_19ohq_15", tS = "_purchaseTitle_19ohq_19", lS = "_purchaseMeta_19ohq_24", Ua = {
  grid: W_,
  purchasesHeading: I_,
  purchaseCard: P_,
  badgeRow: eS,
  purchaseTitle: tS,
  purchaseMeta: lS
};
function aS(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function nS({ rewards: s, rewardsStatus: f, rewardsError: d, onRetry: o, onPurchase: m, purchases: y }) {
  var E = Te(), D = y.filter(function(z) {
    return z.userId === E.currentUser;
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Rewards Shop" }),
    f === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading rewards..." }) : f === "error" ? /* @__PURE__ */ c.jsx(Ol, { message: d ? d.message : "Failed to load", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No rewards available" }) : /* @__PURE__ */ c.jsx("div", { className: Ua.grid, children: s.map(function(z) {
      return /* @__PURE__ */ c.jsx(Th, { reward: z, onPurchase: m }, z.id);
    }) }),
    /* @__PURE__ */ c.jsx("h2", { className: Ua.purchasesHeading, children: "My Reward Purchases" }),
    D.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No purchases yet" }) : D.map(function(z) {
      return /* @__PURE__ */ c.jsxs(Ne, { className: Ua.purchaseCard, children: [
        /* @__PURE__ */ c.jsx("div", { className: Ua.badgeRow, children: /* @__PURE__ */ c.jsx(mt, { tone: aS(z.status), children: z.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ c.jsx("p", { className: Ua.purchaseTitle, children: z.rewards ? z.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ c.jsxs("p", { className: Ua.purchaseMeta, children: [
          z.purchaseCost,
          " points · ",
          window.formatDate(z.purchaseDate)
        ] }),
        z.status === "denied" && z.notes ? /* @__PURE__ */ c.jsxs("p", { className: Ua.purchaseMeta, children: [
          "Reason: ",
          z.notes
        ] }) : null
      ] }, z.id);
    })
  ] });
}
const uS = "_heading_p82cd_1", iS = "_row_p82cd_6", cS = "_selectGroup_p82cd_16", sS = "_selectLabel_p82cd_23", rS = "_select_p82cd_16", fS = "_actions_p82cd_38", Hn = {
  heading: uS,
  row: iS,
  selectGroup: cS,
  selectLabel: sS,
  select: rS,
  actions: fS
};
var gf = { title: "", description: "", cost: 10, type: "instant" };
function oS({ editingReward: s, onSave: f, onCancelEdit: d }) {
  var [o, m] = O.useState(gf), [y, E] = O.useState(!1);
  O.useEffect(
    function() {
      m(
        s ? {
          title: s.title,
          description: s.description,
          cost: s.cost,
          type: s.type
        } : gf
      );
    },
    [s]
  );
  function D(M, N) {
    m(function(S) {
      return Object.assign({}, S, { [M]: N });
    });
  }
  async function z(M) {
    if (M.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      E(!0);
      try {
        await f(o, s ? s.id : null), m(gf);
      } finally {
        E(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: Hn.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: z, children: [
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Title",
          value: o.title,
          onChange: function(M) {
            D("title", M.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Description",
          multiline: !0,
          rows: 2,
          value: o.description,
          onChange: function(M) {
            D("description", M.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: Hn.row, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(M) {
              D("cost", M.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: Hn.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: Hn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: Hn.select,
              value: o.type,
              onChange: function(M) {
                D("type", M.target.value);
              },
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "instant", children: "Instant purchase" }),
                /* @__PURE__ */ c.jsx("option", { value: "authorized", children: "Requires authorization" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Hn.actions, children: [
        /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: y, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ c.jsx(Q, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const dS = "_heading_26k11_1", vS = "_row_26k11_6", mS = "_checkboxRow_26k11_16", hS = "_readout_26k11_24", yS = "_actions_26k11_30", qn = {
  heading: dS,
  row: vS,
  checkboxRow: mS,
  readout: hS,
  actions: yS
};
function gS({ settings: s, onSave: f, onReset: d }) {
  var [o, m] = O.useState(s.instantPurchaseLimit || 0), [y, E] = O.useState(s.resetDurationDays || 0), [D, z] = O.useState(s.requiresAuthorizationAfterLimit !== !1);
  O.useEffect(
    function() {
      m(s.instantPurchaseLimit || 0), E(s.resetDurationDays || 0), z(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function M(N) {
    N.preventDefault(), f(Number(o) || 0, Number(y) || 0, D);
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: qn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: M, children: [
      /* @__PURE__ */ c.jsxs("div", { className: qn.row, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(N) {
              m(N.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: y,
            onChange: function(N) {
              E(N.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: qn.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: D,
            onChange: function(N) {
              z(N.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: qn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: qn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: qn.actions, children: [
        /* @__PURE__ */ c.jsx(Q, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ c.jsx(Q, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const pS = "_card_zkx61_1", _S = "_title_zkx61_5", SS = "_meta_zkx61_10", bS = "_actions_zkx61_16", jc = {
  card: pS,
  title: _S,
  meta: SS,
  actions: bS
};
function xS({ purchases: s, onAuthorize: f, onDeny: d }) {
  var o = s.filter(function(m) {
    return m.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No pending authorizations" }) : /* @__PURE__ */ c.jsx("div", { children: o.map(function(m) {
    var y = window.users[m.userId];
    return /* @__PURE__ */ c.jsxs(Ne, { className: jc.card, children: [
      /* @__PURE__ */ c.jsxs("p", { className: jc.title, children: [
        m.rewards ? m.rewards.title : "Unknown reward",
        " by",
        " ",
        y ? y.displayName : m.userId
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: jc.meta, children: [
        m.purchaseCost,
        " points · requested ",
        window.formatDate(m.purchaseDate)
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: jc.actions, children: [
        /* @__PURE__ */ c.jsx(Q, { onClick: function() {
          f(m.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ c.jsx(Q, { variant: "danger", onClick: function() {
          d(m.id);
        }, children: "Deny" })
      ] })
    ] }, m.id);
  }) });
}
const TS = "_heading_1ewsp_1", jS = "_grid_1ewsp_5", Nc = {
  heading: TS,
  grid: jS
};
function NS({ rewardsState: s }) {
  var [f, d] = O.useState(null);
  async function o(y, E) {
    E ? await s.updateReward(E, y.title, y.description, Number(y.cost), y.type) : await s.addReward(y.title, y.description, Number(y.cost), y.type), d(null);
  }
  function m(y) {
    window.showConfirmModal("Delete this reward?", function(E) {
      E && s.deleteReward(y);
    });
  }
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(
      oS,
      {
        editingReward: f,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ c.jsx("h2", { className: Nc.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ c.jsx(ol, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ c.jsx(
      Ol,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No rewards defined" }) : /* @__PURE__ */ c.jsx("div", { className: Nc.grid, children: s.rewards.map(function(y) {
      return /* @__PURE__ */ c.jsx(
        Th,
        {
          reward: y,
          isAdmin: !0,
          onEdit: d,
          onDelete: m
        },
        y.id
      );
    }) }),
    /* @__PURE__ */ c.jsx("h2", { className: Nc.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ c.jsx(
      gS,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ c.jsx("h2", { className: Nc.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ c.jsx(
      xS,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function ES() {
  var s = Te(), f = V_();
  return s.isMaster ? /* @__PURE__ */ c.jsx(NS, { rewardsState: f }) : /* @__PURE__ */ c.jsx(
    nS,
    {
      rewards: f.rewards,
      rewardsStatus: f.rewardsStatus,
      rewardsError: f.rewardsError,
      onRetry: f.reloadRewards,
      onPurchase: f.purchaseReward,
      purchases: f.purchases
    }
  );
}
const AS = "_heading_pc1l6_1", zS = "_form_pc1l6_11", CS = "_row_pc1l6_33", wS = "_statusMessage_pc1l6_51", Bu = {
  heading: AS,
  form: zS,
  row: CS,
  statusMessage: wS
};
function DS() {
  var s = Te(), f = Tf(), [d, o] = O.useState({ username: "", password: "", displayName: "" }), [m, y] = O.useState(!1);
  function E(N, S) {
    o(function(A) {
      return Object.assign({}, A, { [N]: S });
    });
  }
  async function D(N) {
    N.preventDefault(), y(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), f.reload();
    } finally {
      y(!1);
    }
  }
  function z(N) {
    window.deactivatePig(N);
  }
  function M(N) {
    window.reactivatePig(N);
  }
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs(Ne, { children: [
      /* @__PURE__ */ c.jsxs("h2", { className: Bu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ c.jsxs("form", { className: Bu.form, onSubmit: D, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Username",
            value: d.username,
            onChange: function(N) {
              E("username", N.target.value);
            },
            placeholder: "lowercase, min 3 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Password",
            type: "password",
            value: d.password,
            onChange: function(N) {
              E("password", N.target.value);
            },
            placeholder: "min 4 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Display name",
            value: d.displayName,
            onChange: function(N) {
              E("displayName", N.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ c.jsxs(Q, { type: "submit", loading: m, children: [
          "Add ",
          s.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("h2", { className: Bu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    f.allSlaves.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : f.allSlaves.map(function(N) {
      var S = N.status === "active";
      return /* @__PURE__ */ c.jsxs(Ne, { className: Bu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx(mt, { tone: S ? "success" : "neutral", children: S ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ c.jsx("strong", { children: N.displayName }),
          " (",
          N.username,
          ") ·",
          " ",
          N.points,
          " pts",
          N.statusMessage ? /* @__PURE__ */ c.jsxs("span", { className: Bu.statusMessage, children: [
            " · ",
            N.statusMessage
          ] }) : null
        ] }),
        S ? /* @__PURE__ */ c.jsx(
          Q,
          {
            variant: "danger",
            onClick: function() {
              z(N.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ c.jsx(
          Q,
          {
            onClick: function() {
              M(N.username);
            },
            children: "Reactivate"
          }
        )
      ] }, N.username);
    })
  ] });
}
function OS(s, f) {
  return new Date(f.created_at) - new Date(s.created_at);
}
function MS() {
  var s = Te(), f = Dl({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: OS
  }), d = O.useCallback(async function() {
    await window.generateInvite(), f.reload();
  }, [f]), o = O.useCallback(
    async function(m) {
      await window.revokeInvite(m), f.reload();
    },
    [f]
  );
  return {
    invites: f.items,
    status: f.status,
    error: f.error,
    reload: f.reload,
    generateInvite: d,
    revokeInvite: o
  };
}
const RS = "_heading_1pok1_1", US = "_hint_1pok1_11", HS = "_row_1pok1_23", qS = "_actions_1pok1_45", Yu = {
  heading: RS,
  hint: US,
  row: HS,
  actions: qS
};
function LS(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function BS() {
  var s = Te(), f = MS(), [d, o] = O.useState(null);
  function m(y) {
    navigator.clipboard.writeText(window.buildInviteLink(y)), o(y), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: Yu.heading, children: "Invites" }),
    /* @__PURE__ */ c.jsxs("p", { className: Yu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ c.jsx(Q, { onClick: f.generateInvite, children: "Generate Invite Link" }),
    f.status === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading invites..." }) : null,
    f.status === "error" ? /* @__PURE__ */ c.jsx(
      Ol,
      {
        message: "Couldn't load invites: " + (f.error ? f.error.message : "unknown error"),
        onRetry: f.reload
      }
    ) : null,
    f.status === "ready" && f.invites.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No invites generated yet" }) : null,
    f.status === "ready" && f.invites.length > 0 ? f.invites.map(function(y) {
      var E = y.status === "pending" && y.expires_at && new Date(y.expires_at) < /* @__PURE__ */ new Date(), D = E ? "expired" : y.status, z = y.status === "pending" && !E;
      return /* @__PURE__ */ c.jsxs("div", { className: Yu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx(mt, { tone: LS(D), children: D.charAt(0).toUpperCase() + D.slice(1) }),
          " ",
          /* @__PURE__ */ c.jsx("code", { children: y.code }),
          y.redeemed_by ? /* @__PURE__ */ c.jsxs("span", { className: Yu.hint, children: [
            " · redeemed by ",
            y.redeemed_by
          ] }) : null
        ] }),
        z ? /* @__PURE__ */ c.jsxs("div", { className: Yu.actions, children: [
          /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: function() {
            m(y.code);
          }, children: d === y.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "danger",
              onClick: function() {
                f.revokeInvite(y.code);
              },
              children: "Revoke"
            }
          )
        ] }) : null
      ] }, y.id);
    }) : null
  ] });
}
function YS(s, f) {
  return s.position - f.position;
}
function jh() {
  var s = Te(), f = s.activeMasterContext, d = Dl({
    table: "motd_messages",
    masterUsername: f,
    sort: YS
  }), o = Dl({
    table: "motd_state",
    masterUsername: f
  }), m = d.items, y = o.items[0], E = y ? y.current_index : 0, D = m.length > 0 ? m[E % m.length] : null;
  return {
    messages: m,
    currentMessage: D,
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
const GS = "_form_7nlkd_1", XS = {
  form: GS
};
function QS({ onAdd: s }) {
  var [f, d] = O.useState(""), [o, m] = O.useState(!1);
  async function y(E) {
    E.preventDefault();
    var D = f.trim();
    if (D) {
      m(!0);
      try {
        await s(D), d("");
      } finally {
        m(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs("form", { className: XS.form, onSubmit: y, children: [
    /* @__PURE__ */ c.jsx(
      re,
      {
        multiline: !0,
        rows: 2,
        value: f,
        onChange: function(E) {
          d(E.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: o, disabled: !f.trim(), children: "Add Message" })
  ] });
}
const ZS = "_heading_10ijk_1", VS = "_row_10ijk_11", KS = "_actions_10ijk_33", pf = {
  heading: ZS,
  row: VS,
  actions: KS
};
function JS() {
  var s = jh();
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: pf.heading, children: "Message of the Day" }),
    /* @__PURE__ */ c.jsx(QS, { onAdd: s.addMessage }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading messages..." }) : null,
    s.status === "error" ? /* @__PURE__ */ c.jsx(
      Ol,
      {
        message: "Couldn't load messages: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" && s.messages.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No messages added yet" }) : null,
    s.status === "ready" && s.messages.length > 0 ? s.messages.map(function(f, d) {
      var o = d === 0, m = d === s.messages.length - 1, y = s.currentMessage && s.currentMessage.id === f.id;
      return /* @__PURE__ */ c.jsxs("div", { className: pf.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          y ? /* @__PURE__ */ c.jsx(mt, { tone: "success", children: "Showing now" }) : null,
          " ",
          f.body
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: pf.actions, children: [
          /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "secondary",
              disabled: o,
              onClick: function() {
                s.moveUp(f.id);
              },
              children: "↑"
            }
          ),
          /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "secondary",
              disabled: m,
              onClick: function() {
                s.moveDown(f.id);
              },
              children: "↓"
            }
          ),
          /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "danger",
              onClick: function() {
                s.deleteMessage(f.id);
              },
              children: "Delete"
            }
          )
        ] })
      ] }, f.id);
    }) : null
  ] });
}
function $S() {
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(DS, {}),
    /* @__PURE__ */ c.jsx(BS, {}),
    /* @__PURE__ */ c.jsx(JS, {})
  ] });
}
function kS() {
  var s = Te(), [f, d] = O.useState([]), [o, m] = O.useState("loading"), y = O.useCallback(async function() {
    m("loading");
    var E = await window.fetchAllMasters();
    d(E || []), m("ready");
  }, []);
  return O.useEffect(
    function() {
      s.isAdmin && y();
    },
    [s.isAdmin, y]
  ), {
    masters: f,
    status: o,
    reload: y,
    createMaster: window.createMaster,
    updateMasterTerminology: window.updateMasterTerminology,
    updateMasterAccount: window.updateMasterAccount,
    deactivateMaster: function(E) {
      return new Promise(function(D) {
        window.showConfirmModal(
          "Deactivate master '" + E + "'? They (and their group) won't be able to log in.",
          async function(z) {
            z && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", E), window.showNotification("Master deactivated.", "success"), await y()), D();
          }
        );
      });
    },
    reactivateMaster: async function(E) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", E), window.showNotification("Master reactivated.", "success"), await y();
    }
  };
}
const FS = "_list_1yv13_1", WS = "_row_1yv13_10", IS = "_ratio_1yv13_18", _f = {
  list: FS,
  row: WS,
  ratio: IS
};
function PS({ theme: s }) {
  if (!window.ContrastUtils) return null;
  var f = window.ContrastUtils.checkThemeContrast(s);
  return /* @__PURE__ */ c.jsx("ul", { className: _f.list, children: f.map(function(d) {
    return /* @__PURE__ */ c.jsxs("li", { className: _f.row, children: [
      /* @__PURE__ */ c.jsx("span", { children: d.label }),
      /* @__PURE__ */ c.jsxs("span", { className: _f.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ c.jsx(mt, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const eb = "_heading_1sy2j_1", tb = "_row_1sy2j_6", lb = "_checkboxRow_1sy2j_16", ab = "_divider_1sy2j_24", nb = "_colorRow_1sy2j_29", ub = "_colorField_1sy2j_36", ib = "_actions_1sy2j_53", wl = {
  heading: eb,
  row: tb,
  checkboxRow: lb,
  divider: ab,
  colorRow: nb,
  colorField: ub,
  actions: ib
};
var cb = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
};
function vh(s) {
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
    theme: s ? s.theme : cb
  };
}
function mh({ master: s, onCreate: f, onSaveExisting: d, onCancel: o }) {
  var [m, y] = O.useState(vh(s)), [E, D] = O.useState(!1), z = !!s;
  function M(A, U) {
    y(function(L) {
      return Object.assign({}, L, { [A]: U });
    });
  }
  function N(A, U) {
    y(function(L) {
      return Object.assign({}, L, { theme: Object.assign({}, L.theme, { [A]: U }) });
    });
  }
  async function S(A) {
    A.preventDefault(), D(!0);
    try {
      z ? await d(s.username, m) : (await f(m), y(vh(null)));
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: wl.heading, children: z ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: S, children: [
      z ? null : /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Username",
          value: m.username,
          onChange: function(A) {
            M("username", A.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: z ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: m.password,
          onChange: function(A) {
            M("password", A.target.value);
          },
          required: !z
        }
      ),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Display name",
          value: m.displayName,
          onChange: function(A) {
            M("displayName", A.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: wl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: m.isAdmin,
            onChange: function(A) {
              M("isAdmin", A.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: wl.row, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: m.groupLabel,
            onChange: function(A) {
              M("groupLabel", A.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: m.masterLabel,
            onChange: function(A) {
              M("masterLabel", A.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: wl.row, children: [
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Master label (plural)",
            value: m.masterLabelPlural,
            onChange: function(A) {
              M("masterLabelPlural", A.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          re,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: m.slaveLabel,
            onChange: function(A) {
              M("slaveLabel", A.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx(
        re,
        {
          label: "Slave label (plural)",
          value: m.slaveLabelPlural,
          onChange: function(A) {
            M("slaveLabelPlural", A.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx("hr", { className: wl.divider }),
      /* @__PURE__ */ c.jsxs("label", { className: wl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: m.classicUiForced,
            onChange: function(A) {
              M("classicUiForced", A.target.checked);
            }
          }
        ),
        "Force classic styling for this group (disable beta)"
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: wl.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(A) {
        var U = A[0], L = A[1];
        return /* @__PURE__ */ c.jsxs("label", { className: wl.colorField, children: [
          L,
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "color",
              value: m.theme[U],
              onChange: function(H) {
                N(U, H.target.value);
              }
            }
          )
        ] }, U);
      }) }),
      /* @__PURE__ */ c.jsx(PS, { theme: m.theme }),
      /* @__PURE__ */ c.jsxs("div", { className: wl.actions, children: [
        /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: E, children: z ? "Save changes" : "Create master" }),
        z ? /* @__PURE__ */ c.jsx(Q, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const sb = "_heading_vrwe0_1", rb = "_row_vrwe0_5", fb = "_badgeRow_vrwe0_14", ob = "_meta_vrwe0_20", db = "_actions_vrwe0_26", Gu = {
  heading: sb,
  row: rb,
  badgeRow: fb,
  meta: ob,
  actions: db
};
function vb() {
  var s = kS(), [f, d] = O.useState(null);
  async function o(y) {
    var E = await s.createMaster(y);
    E && await s.reload();
  }
  async function m(y, E) {
    await s.updateMasterAccount(y, {
      displayName: E.displayName,
      password: E.password,
      isAdmin: E.isAdmin
    }), await s.updateMasterTerminology(y, E), d(null), await s.reload();
  }
  return f ? /* @__PURE__ */ c.jsx(
    mh,
    {
      master: f,
      onSaveExisting: m,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(mh, { onCreate: o }),
    /* @__PURE__ */ c.jsx("h2", { className: Gu.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ol, {}) : s.masters.length === 0 ? /* @__PURE__ */ c.jsx(st, { title: "No masters yet" }) : s.masters.map(function(y) {
      var E = y.status === "active";
      return /* @__PURE__ */ c.jsxs(Ne, { className: Gu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsxs("div", { className: Gu.badgeRow, children: [
            /* @__PURE__ */ c.jsx(mt, { tone: E ? "success" : "neutral", children: E ? "Active" : "Inactive" }),
            y.isAdmin ? /* @__PURE__ */ c.jsx(mt, { tone: "warning", children: "Admin" }) : null,
            y.classicUiForced ? /* @__PURE__ */ c.jsx(mt, { tone: "warning", children: "Classic Only" }) : null
          ] }),
          /* @__PURE__ */ c.jsx("strong", { children: y.displayName }),
          " (",
          y.username,
          ")",
          /* @__PURE__ */ c.jsxs("div", { className: Gu.meta, children: [
            "Group: ",
            y.groupLabel,
            " · ",
            y.masterLabel,
            " / ",
            y.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: Gu.actions, children: [
          /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "secondary",
              onClick: function() {
                d(y);
              },
              children: "Edit"
            }
          ),
          E ? /* @__PURE__ */ c.jsx(
            Q,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(y.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ c.jsx(
            Q,
            {
              onClick: function() {
                s.reactivateMaster(y.username);
              },
              children: "Reactivate"
            }
          )
        ] })
      ] }, y.username);
    })
  ] });
}
var Ec = 100;
function mb() {
  var s = Te(), f = s.activeMasterContext, [d, o] = O.useState([]), [m, y] = O.useState("loading"), [E, D] = O.useState(null), [z, M] = O.useState(!1), N = O.useCallback(
    async function() {
      if (!f) {
        o([]), y("ready");
        return;
      }
      y("loading"), D(null);
      var U = await window.supabase.from("chat_messages").select("*").eq("master_username", f).order("created_at", { ascending: !1 }).limit(Ec);
      if (U.error) {
        D(U.error), y("error");
        return;
      }
      var L = (U.data || []).slice().reverse();
      o(L), M((U.data || []).length === Ec), y("ready");
    },
    [f]
  ), S = O.useCallback(
    async function() {
      o(function(U) {
        if (U.length === 0) return U;
        var L = U[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", f).lt("created_at", L.created_at).order("created_at", { ascending: !1 }).limit(Ec).then(function(H) {
          if (!H.error) {
            var X = (H.data || []).slice().reverse();
            M((H.data || []).length === Ec), o(function(W) {
              return X.concat(W);
            });
          }
        }), U;
      });
    },
    [f]
  ), A = O.useCallback(
    async function(U) {
      await window.sendChatMessage({ body: U });
    },
    []
  );
  return O.useEffect(
    function() {
      if (N(), !!f) {
        var U = window.supabase.channel("beta_chat_messages_" + f).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + f
          },
          function(L) {
            o(function(H) {
              return H.concat([L.new]);
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(U);
        };
      }
    },
    [f, N]
  ), {
    messages: d,
    status: m,
    error: E,
    hasMoreOlder: z,
    loadOlder: S,
    sendMessage: A,
    reload: N
  };
}
const hb = "_row_gqneb_1", yb = "_meta_gqneb_19", gb = "_status_gqneb_35", pb = "_time_gqneb_43", _b = "_body_gqneb_51", Xu = {
  row: hb,
  meta: yb,
  status: gb,
  time: pb,
  body: _b
};
function Sb({ message: s }) {
  var f = window.users[s.sender_username], d = f ? f.displayName : s.sender_username, o = f && f.statusMessage ? f.statusMessage : "";
  return /* @__PURE__ */ c.jsxs("div", { className: Xu.row, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Xu.meta, children: [
      /* @__PURE__ */ c.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ c.jsxs("span", { className: Xu.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ c.jsx("span", { className: Xu.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: Xu.body, children: s.body })
  ] });
}
const bb = "_form_nndvu_1", xb = "_input_nndvu_13", hh = {
  form: bb,
  input: xb
};
function Tb({ onSend: s }) {
  var [f, d] = O.useState(""), [o, m] = O.useState(!1);
  async function y(E) {
    E.preventDefault();
    var D = f.trim();
    if (D) {
      m(!0);
      try {
        await s(D), d("");
      } finally {
        m(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs("form", { className: hh.form, onSubmit: y, children: [
    /* @__PURE__ */ c.jsx(
      "input",
      {
        className: hh.input,
        value: f,
        onChange: function(E) {
          d(E.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ c.jsx(Q, { type: "submit", loading: o, disabled: !f.trim(), children: "Send" })
  ] });
}
const jb = "_heading_12c2o_1", Nb = "_loadOlder_12c2o_11", Eb = "_list_12c2o_19", Sf = {
  heading: jb,
  loadOlder: Nb,
  list: Eb
};
function Ab() {
  var s = mb(), f = O.useRef(null), d = O.useRef(!0);
  O.useEffect(
    function() {
      var m = f.current;
      m && d.current && (m.scrollTop = m.scrollHeight);
    },
    [s.messages]
  );
  function o() {
    var m = f.current;
    m && (d.current = m.scrollHeight - m.scrollTop - m.clientHeight < 80);
  }
  return /* @__PURE__ */ c.jsxs(Ne, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: Sf.heading, children: "Group Chat" }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ol, { label: "Loading chat..." }) : null,
    s.status === "error" ? /* @__PURE__ */ c.jsx(
      Ol,
      {
        message: "Couldn't load chat: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.hasMoreOlder ? /* @__PURE__ */ c.jsx(Q, { variant: "secondary", onClick: s.loadOlder, className: Sf.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ c.jsx("div", { className: Sf.list, ref: f, onScroll: o, children: s.messages.length === 0 ? /* @__PURE__ */ c.jsx(st, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(m) {
        return /* @__PURE__ */ c.jsx(Sb, { message: m }, m.id);
      }) }),
      /* @__PURE__ */ c.jsx(Tb, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
const zb = "_banner_7xh6r_1", Cb = {
  banner: zb
};
function wb() {
  var s = Te(), f = bh();
  return !s.isSlave || f.trackers.length === 0 ? null : /* @__PURE__ */ c.jsx("div", { className: Cb.banner, children: /* @__PURE__ */ c.jsx(xh, { tracker: f.trackers[0], isAdmin: !1 }) });
}
const Db = "_banner_znl1a_1", Ob = {
  banner: Db
};
function Mb() {
  var s = Te(), f = jh();
  return !s.isSlave || !f.currentMessage ? null : /* @__PURE__ */ c.jsxs("div", { className: Ob.banner, children: [
    /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    f.currentMessage.body
  ] });
}
function Rb({ activeTab: s }) {
  var f = Te();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ c.jsx(Ep, {});
    case "calendar":
      return /* @__PURE__ */ c.jsx(Mp, {});
    case "dashboard":
      return f.isMaster ? /* @__PURE__ */ c.jsx(D_, {}) : null;
    case "suggest":
      return /* @__PURE__ */ c.jsx(X_, {});
    case "shop":
      return /* @__PURE__ */ c.jsx(ES, {});
    case "chat":
      return /* @__PURE__ */ c.jsx(Ab, {});
    case "admin":
      return f.isMaster ? /* @__PURE__ */ c.jsx($S, {}) : null;
    case "masters":
      return f.isAdmin ? /* @__PURE__ */ c.jsx(vb, {}) : null;
    default:
      return null;
  }
}
function Ub() {
  var s = Te(), [f, d] = O.useState("tasks"), o = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "betaApp", style: o, children: [
    /* @__PURE__ */ c.jsx(e1, {}),
    /* @__PURE__ */ c.jsx(n1, { activeTab: f, onChange: d }),
    /* @__PURE__ */ c.jsxs("main", { className: "betaContainer", children: [
      /* @__PURE__ */ c.jsx(Mb, {}),
      /* @__PURE__ */ c.jsx(Rb, { activeTab: f })
    ] }),
    /* @__PURE__ */ c.jsx(wb, {})
  ] });
}
function Hb() {
  return /* @__PURE__ */ c.jsx(D0, { children: /* @__PURE__ */ c.jsx(Ub, {}) });
}
var Ln = null;
function qb(s) {
  Ln || (Ln = w0.createRoot(s), Ln.render(/* @__PURE__ */ c.jsx(Hb, {})));
}
function Lb() {
  Ln && (Ln.unmount(), Ln = null);
}
export {
  qb as mountBetaApp,
  Lb as unmountBetaApp
};
