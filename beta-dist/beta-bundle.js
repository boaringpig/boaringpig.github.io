var nr = { exports: {} }, Du = {};
var Zm;
function m0() {
  if (Zm) return Du;
  Zm = 1;
  var s = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function v(r, h, _) {
    var C = null;
    if (_ !== void 0 && (C = "" + _), h.key !== void 0 && (C = "" + h.key), "key" in h) {
      _ = {};
      for (var D in h)
        D !== "key" && (_[D] = h[D]);
    } else _ = h;
    return h = _.ref, {
      $$typeof: s,
      type: r,
      key: C,
      ref: h !== void 0 ? h : null,
      props: _
    };
  }
  return Du.Fragment = o, Du.jsx = v, Du.jsxs = v, Du;
}
var Vm;
function h0() {
  return Vm || (Vm = 1, nr.exports = m0()), nr.exports;
}
var c = h0(), ur = { exports: {} }, Ou = {}, ir = { exports: {} }, cr = {};
var Km;
function g0() {
  return Km || (Km = 1, function(s) {
    function o(q, K) {
      var J = q.length;
      q.push(K);
      t: for (; 0 < J; ) {
        var jt = J - 1 >>> 1, gt = q[jt];
        if (0 < h(gt, K))
          q[jt] = K, q[J] = gt, J = jt;
        else break t;
      }
    }
    function v(q) {
      return q.length === 0 ? null : q[0];
    }
    function r(q) {
      if (q.length === 0) return null;
      var K = q[0], J = q.pop();
      if (J !== K) {
        q[0] = J;
        t: for (var jt = 0, gt = q.length, He = gt >>> 1; jt < He; ) {
          var il = 2 * (jt + 1) - 1, sa = q[il], g = il + 1, w = q[g];
          if (0 > h(sa, J))
            g < gt && 0 > h(w, sa) ? (q[jt] = w, q[g] = J, jt = g) : (q[jt] = sa, q[il] = J, jt = il);
          else if (g < gt && 0 > h(w, J))
            q[jt] = w, q[g] = J, jt = g;
          else break t;
        }
      }
      return K;
    }
    function h(q, K) {
      var J = q.sortIndex - K.sortIndex;
      return J !== 0 ? J : q.id - K.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var _ = performance;
      s.unstable_now = function() {
        return _.now();
      };
    } else {
      var C = Date, D = C.now();
      s.unstable_now = function() {
        return C.now() - D;
      };
    }
    var O = [], M = [], A = 1, x = null, N = 3, H = !1, $ = !1, it = !1, tt = !1, wt = typeof setTimeout == "function" ? setTimeout : null, ot = typeof clearTimeout == "function" ? clearTimeout : null, ia = typeof setImmediate < "u" ? setImmediate : null;
    function Qe(q) {
      for (var K = v(M); K !== null; ) {
        if (K.callback === null) r(M);
        else if (K.startTime <= q)
          r(M), K.sortIndex = K.expirationTime, o(O, K);
        else break;
        K = v(M);
      }
    }
    function Ze(q) {
      if (it = !1, Qe(q), !$)
        if (v(O) !== null)
          $ = !0, de || (de = !0, ve());
        else {
          var K = v(M);
          K !== null && Lt(Ze, K.startTime - q);
        }
    }
    var de = !1, et = -1, dt = 5, Ve = -1;
    function Ne() {
      return tt ? !0 : !(s.unstable_now() - Ve < dt);
    }
    function Ee() {
      if (tt = !1, de) {
        var q = s.unstable_now();
        Ve = q;
        var K = !0;
        try {
          t: {
            $ = !1, it && (it = !1, ot(et), et = -1), H = !0;
            var J = N;
            try {
              e: {
                for (Qe(q), x = v(O); x !== null && !(x.expirationTime > q && Ne()); ) {
                  var jt = x.callback;
                  if (typeof jt == "function") {
                    x.callback = null, N = x.priorityLevel;
                    var gt = jt(
                      x.expirationTime <= q
                    );
                    if (q = s.unstable_now(), typeof gt == "function") {
                      x.callback = gt, Qe(q), K = !0;
                      break e;
                    }
                    x === v(O) && r(O), Qe(q);
                  } else r(O);
                  x = v(O);
                }
                if (x !== null) K = !0;
                else {
                  var He = v(M);
                  He !== null && Lt(
                    Ze,
                    He.startTime - q
                  ), K = !1;
                }
              }
              break t;
            } finally {
              x = null, N = J, H = !1;
            }
            K = void 0;
          }
        } finally {
          K ? ve() : de = !1;
        }
      }
    }
    var ve;
    if (typeof ia == "function")
      ve = function() {
        ia(Ee);
      };
    else if (typeof MessageChannel < "u") {
      var Al = new MessageChannel(), ca = Al.port2;
      Al.port1.onmessage = Ee, ve = function() {
        ca.postMessage(null);
      };
    } else
      ve = function() {
        wt(Ee, 0);
      };
    function Lt(q, K) {
      et = wt(function() {
        q(s.unstable_now());
      }, K);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, s.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : dt = 0 < q ? Math.floor(1e3 / q) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return N;
    }, s.unstable_next = function(q) {
      switch (N) {
        case 1:
        case 2:
        case 3:
          var K = 3;
          break;
        default:
          K = N;
      }
      var J = N;
      N = K;
      try {
        return q();
      } finally {
        N = J;
      }
    }, s.unstable_requestPaint = function() {
      tt = !0;
    }, s.unstable_runWithPriority = function(q, K) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var J = N;
      N = q;
      try {
        return K();
      } finally {
        N = J;
      }
    }, s.unstable_scheduleCallback = function(q, K, J) {
      var jt = s.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? jt + J : jt) : J = jt, q) {
        case 1:
          var gt = -1;
          break;
        case 2:
          gt = 250;
          break;
        case 5:
          gt = 1073741823;
          break;
        case 4:
          gt = 1e4;
          break;
        default:
          gt = 5e3;
      }
      return gt = J + gt, q = {
        id: A++,
        callback: K,
        priorityLevel: q,
        startTime: J,
        expirationTime: gt,
        sortIndex: -1
      }, J > jt ? (q.sortIndex = J, o(M, q), v(O) === null && q === v(M) && (it ? (ot(et), et = -1) : it = !0, Lt(Ze, J - jt))) : (q.sortIndex = gt, o(O, q), $ || H || ($ = !0, de || (de = !0, ve()))), q;
    }, s.unstable_shouldYield = Ne, s.unstable_wrapCallback = function(q) {
      var K = N;
      return function() {
        var J = N;
        N = K;
        try {
          return q.apply(this, arguments);
        } finally {
          N = J;
        }
      };
    };
  }(cr)), cr;
}
var Jm;
function y0() {
  return Jm || (Jm = 1, ir.exports = g0()), ir.exports;
}
var sr = { exports: {} }, F = {};
var $m;
function _0() {
  if ($m) return F;
  $m = 1;
  var s = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), C = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), M = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), x = Symbol.for("react.activity"), N = Symbol.for("react.view_transition"), H = Symbol.iterator;
  function $(g) {
    return g === null || typeof g != "object" ? null : (g = H && g[H] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var it = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, tt = Object.assign, wt = {};
  function ot(g, w, X) {
    this.props = g, this.context = w, this.refs = wt, this.updater = X || it;
  }
  ot.prototype.isReactComponent = {}, ot.prototype.setState = function(g, w) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, w, "setState");
  }, ot.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function ia() {
  }
  ia.prototype = ot.prototype;
  function Qe(g, w, X) {
    this.props = g, this.context = w, this.refs = wt, this.updater = X || it;
  }
  var Ze = Qe.prototype = new ia();
  Ze.constructor = Qe, tt(Ze, ot.prototype), Ze.isPureReactComponent = !0;
  var de = Array.isArray;
  function et() {
  }
  var dt = { H: null, A: null, T: null, S: null }, Ve = Object.prototype.hasOwnProperty;
  function Ne(g, w, X) {
    var Q = X.ref;
    return {
      $$typeof: s,
      type: g,
      key: w,
      ref: Q !== void 0 ? Q : null,
      props: X
    };
  }
  function Ee(g, w) {
    return Ne(g.type, w, g.props);
  }
  function ve(g) {
    return typeof g == "object" && g !== null && g.$$typeof === s;
  }
  function Al(g) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function(X) {
      return w[X];
    });
  }
  var ca = /\/+/g;
  function Lt(g, w) {
    return typeof g == "object" && g !== null && g.key != null ? Al("" + g.key) : w.toString(36);
  }
  function q(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(et, et) : (g.status = "pending", g.then(
          function(w) {
            g.status === "pending" && (g.status = "fulfilled", g.value = w);
          },
          function(w) {
            g.status === "pending" && (g.status = "rejected", g.reason = w);
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
  function K(g, w, X, Q, st) {
    var ft = typeof g;
    (ft === "undefined" || ft === "boolean") && (g = null);
    var vt = !1;
    if (g === null) vt = !0;
    else
      switch (ft) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case s:
            case o:
              vt = !0;
              break;
            case A:
              return vt = g._init, K(
                vt(g._payload),
                w,
                X,
                Q,
                st
              );
          }
      }
    if (vt)
      return st = st(g), vt = Q === "" ? "." + Lt(g, 0) : Q, de(st) ? (X = "", vt != null && (X = vt.replace(ca, "$&/") + "/"), K(st, w, X, "", function(cl) {
        return cl;
      })) : st != null && (ve(st) && (st = Ee(
        st,
        X + (st.key == null || g && g.key === st.key ? "" : ("" + st.key).replace(
          ca,
          "$&/"
        ) + "/") + vt
      )), w.push(st)), 1;
    vt = 0;
    var L = Q === "" ? "." : Q + ":";
    if (de(g))
      for (var k = 0; k < g.length; k++)
        Q = g[k], ft = L + Lt(Q, k), vt += K(
          Q,
          w,
          X,
          ft,
          st
        );
    else if (k = $(g), typeof k == "function")
      for (g = k.call(g), k = 0; !(Q = g.next()).done; )
        Q = Q.value, ft = L + Lt(Q, k++), vt += K(
          Q,
          w,
          X,
          ft,
          st
        );
    else if (ft === "object") {
      if (typeof g.then == "function")
        return K(
          q(g),
          w,
          X,
          Q,
          st
        );
      throw w = String(g), Error(
        "Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function J(g, w, X) {
    if (g == null) return g;
    var Q = [], st = 0;
    return K(g, Q, "", "", function(ft) {
      return w.call(X, ft, st++);
    }), Q;
  }
  function jt(g) {
    if (g._status === -1) {
      var w = g._result, X = w();
      X.then(
        function(Q) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = Q, X.status === void 0 && (X.status = "fulfilled", X.value = Q));
        },
        function(Q) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = Q, X.status === void 0 && (X.status = "rejected", X.reason = Q));
        }
      ), g._status === -1 && (g._status = 0, g._result = X);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var gt = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var w = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(w)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  };
  function He(g) {
    var w = dt.T, X = {};
    X.types = w !== null ? w.types : null, dt.T = X;
    try {
      var Q = g(), st = dt.S;
      st !== null && st(X, Q), typeof Q == "object" && Q !== null && typeof Q.then == "function" && Q.then(et, gt);
    } catch (ft) {
      gt(ft);
    } finally {
      w !== null && X.types !== null && (w.types = X.types), dt.T = w;
    }
  }
  function il(g) {
    var w = dt.T;
    if (w !== null) {
      var X = w.types;
      X === null ? w.types = [g] : X.indexOf(g) === -1 && X.push(g);
    } else He(il.bind(null, g));
  }
  var sa = {
    map: J,
    forEach: function(g, w, X) {
      J(
        g,
        function() {
          w.apply(this, arguments);
        },
        X
      );
    },
    count: function(g) {
      var w = 0;
      return J(g, function() {
        w++;
      }), w;
    },
    toArray: function(g) {
      return J(g, function(w) {
        return w;
      }) || [];
    },
    only: function(g) {
      if (!ve(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return F.Activity = x, F.Children = sa, F.Component = ot, F.Fragment = v, F.Profiler = h, F.PureComponent = Qe, F.StrictMode = r, F.Suspense = O, F.ViewTransition = N, F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = dt, F.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return dt.H.useMemoCache(g);
    }
  }, F.addTransitionType = il, F.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, F.cacheSignal = function() {
    return null;
  }, F.cloneElement = function(g, w, X) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var Q = tt({}, g.props), st = g.key;
    if (w != null)
      for (ft in w.key !== void 0 && (st = "" + w.key), w)
        !Ve.call(w, ft) || ft === "key" || ft === "__self" || ft === "__source" || ft === "ref" && w.ref === void 0 || (Q[ft] = w[ft]);
    var ft = arguments.length - 2;
    if (ft === 1) Q.children = X;
    else if (1 < ft) {
      for (var vt = Array(ft), L = 0; L < ft; L++)
        vt[L] = arguments[L + 2];
      Q.children = vt;
    }
    return Ne(g.type, st, Q);
  }, F.createContext = function(g) {
    return g = {
      $$typeof: C,
      _currentValue: g,
      _currentValue2: g,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, g.Provider = g, g.Consumer = {
      $$typeof: _,
      _context: g
    }, g;
  }, F.createElement = function(g, w, X) {
    var Q, st = {}, ft = null;
    if (w != null)
      for (Q in w.key !== void 0 && (ft = "" + w.key), w)
        Ve.call(w, Q) && Q !== "key" && Q !== "__self" && Q !== "__source" && (st[Q] = w[Q]);
    var vt = arguments.length - 2;
    if (vt === 1) st.children = X;
    else if (1 < vt) {
      for (var L = Array(vt), k = 0; k < vt; k++)
        L[k] = arguments[k + 2];
      st.children = L;
    }
    if (g && g.defaultProps)
      for (Q in vt = g.defaultProps, vt)
        st[Q] === void 0 && (st[Q] = vt[Q]);
    return Ne(g, ft, st);
  }, F.createRef = function() {
    return { current: null };
  }, F.forwardRef = function(g) {
    return { $$typeof: D, render: g };
  }, F.isValidElement = ve, F.lazy = function(g) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: g },
      _init: jt
    };
  }, F.memo = function(g, w) {
    return {
      $$typeof: M,
      type: g,
      compare: w === void 0 ? null : w
    };
  }, F.startTransition = He, F.unstable_useCacheRefresh = function() {
    return dt.H.useCacheRefresh();
  }, F.use = function(g) {
    return dt.H.use(g);
  }, F.useActionState = function(g, w, X) {
    return dt.H.useActionState(g, w, X);
  }, F.useCallback = function(g, w) {
    return dt.H.useCallback(g, w);
  }, F.useContext = function(g) {
    return dt.H.useContext(g);
  }, F.useDebugValue = function() {
  }, F.useDeferredValue = function(g, w) {
    return dt.H.useDeferredValue(g, w);
  }, F.useEffect = function(g, w) {
    return dt.H.useEffect(g, w);
  }, F.useEffectEvent = function(g) {
    return dt.H.useEffectEvent(g);
  }, F.useId = function() {
    return dt.H.useId();
  }, F.useImperativeHandle = function(g, w, X) {
    return dt.H.useImperativeHandle(g, w, X);
  }, F.useInsertionEffect = function(g, w) {
    return dt.H.useInsertionEffect(g, w);
  }, F.useLayoutEffect = function(g, w) {
    return dt.H.useLayoutEffect(g, w);
  }, F.useMemo = function(g, w) {
    return dt.H.useMemo(g, w);
  }, F.useOptimistic = function(g, w) {
    return dt.H.useOptimistic(g, w);
  }, F.useReducer = function(g, w, X) {
    return dt.H.useReducer(g, w, X);
  }, F.useRef = function(g) {
    return dt.H.useRef(g);
  }, F.useState = function(g) {
    return dt.H.useState(g);
  }, F.useSyncExternalStore = function(g, w, X) {
    return dt.H.useSyncExternalStore(
      g,
      w,
      X
    );
  }, F.useTransition = function() {
    return dt.H.useTransition();
  }, F.version = "19.3.1", F;
}
var km;
function gr() {
  return km || (km = 1, sr.exports = _0()), sr.exports;
}
var fr = { exports: {} }, It = {};
var Fm;
function p0() {
  if (Fm) return It;
  Fm = 1;
  var s = gr();
  function o(A) {
    var x = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        x += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + A + "; visit " + x + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v() {
  }
  var r = {
    d: {
      f: v,
      r: function() {
        throw Error(o(522));
      },
      D: v,
      C: v,
      L: v,
      m: v,
      X: v,
      S: v,
      M: v
    },
    p: 0,
    findDOMNode: null
  }, h = Symbol.for("react.portal"), _ = Symbol.for("react.recoverable"), C = Symbol.for("react.optimistic_key");
  function D(A, x, N) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: H == null ? null : H === C ? C : "" + H,
      children: A,
      containerInfo: x,
      implementation: N
    };
  }
  var O = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(A, x) {
    if (A === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return It.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, It.browser = function(A) {
    return { $$typeof: _, _reason: A };
  }, It.createPortal = function(A, x) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error(o(299));
    return D(A, x, null, N);
  }, It.flushSync = function(A) {
    var x = O.T, N = r.p;
    try {
      if (O.T = null, r.p = 2, A) return A();
    } finally {
      O.T = x, r.p = N, r.d.f();
    }
  }, It.preconnect = function(A, x) {
    typeof A == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, r.d.C(A, x));
  }, It.prefetchDNS = function(A) {
    typeof A == "string" && r.d.D(A);
  }, It.preinit = function(A, x) {
    if (typeof A == "string" && x && typeof x.as == "string") {
      var N = x.as, H = M(N, x.crossOrigin), $ = typeof x.integrity == "string" ? x.integrity : void 0, it = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      N === "style" ? r.d.S(
        A,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: H,
          integrity: $,
          fetchPriority: it
        }
      ) : N === "script" && r.d.X(A, {
        crossOrigin: H,
        integrity: $,
        fetchPriority: it,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, It.preinitModule = function(A, x) {
    if (typeof A == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var N = M(
            x.as,
            x.crossOrigin
          );
          r.d.M(A, {
            crossOrigin: N,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0,
            fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0
          });
        }
      } else x == null && r.d.M(A);
  }, It.preload = function(A, x) {
    if (typeof A == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var N = x.as, H = M(N, x.crossOrigin);
      r.d.L(A, N, {
        crossOrigin: H,
        integrity: typeof x.integrity == "string" ? x.integrity : void 0,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0,
        type: typeof x.type == "string" ? x.type : void 0,
        fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
        referrerPolicy: typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
        imageSrcSet: typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
        imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
        media: typeof x.media == "string" ? x.media : void 0
      });
    }
  }, It.preloadModule = function(A, x) {
    if (typeof A == "string")
      if (x) {
        var N = M(x.as, x.crossOrigin);
        r.d.m(A, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: N,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0,
          nonce: typeof x.nonce == "string" ? x.nonce : void 0,
          fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0
        });
      } else r.d.m(A);
  }, It.requestFormReset = function(A) {
    r.d.r(A);
  }, It.unstable_batchedUpdates = function(A, x) {
    return A(x);
  }, It.useFormState = function(A, x, N) {
    return O.H.useFormState(A, x, N);
  }, It.useFormStatus = function() {
    return O.H.useHostTransitionStatus();
  }, It.version = "19.3.1", It;
}
var Wm;
function b0() {
  if (Wm) return fr.exports;
  Wm = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), fr.exports = p0(), fr.exports;
}
var Im;
function S0() {
  if (Im) return Ou;
  Im = 1;
  var s = y0(), o = gr(), v = b0();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function _(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function C(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function D(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function O(t) {
    if (_(t) !== t)
      throw Error(r(188));
  }
  function M(t) {
    var e = t.alternate;
    if (!e) {
      if (e = _(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
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
          if (u === l) return O(n), t;
          if (u === a) return O(n), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, f = n.child; f; ) {
          if (f === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (f === a) {
            i = !0, a = n, l = u;
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = u.child; f; ) {
            if (f === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (f === a) {
              i = !0, a = u, l = n;
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (l.alternate !== a) throw Error(r(190));
    }
    if (l.tag !== 3) throw Error(r(188));
    return l.stateNode.current === l ? t : e;
  }
  function A(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = A(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function x(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && x(
        t.child,
        e,
        l,
        a,
        n,
        u
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function N(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function H(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function $(t) {
    var e = [null, null], l = N(t);
    return l === null || it(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function it(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && it(
        t,
        e,
        l.child,
        a
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function tt(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var wt = null, ot = null;
  function ia(t, e, l) {
    return t === l ? !0 : t === e ? (wt = t, !0) : !1;
  }
  function Qe(t, e, l) {
    return t === l ? (ot = t, !1) : t === e ? (ot !== null && (wt = t), !0) : !1;
  }
  function Ze(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function de(t, e, l) {
    for (var a = 0, n = t; n; n = l(n)) a++;
    n = 0;
    for (var u = e; u; u = l(u)) n++;
    for (; 0 < a - n; ) t = l(t), a--;
    for (; 0 < n - a; ) e = l(e), n--;
    for (; a--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = l(t), e = l(e);
    }
    return null;
  }
  var et = Object.assign, dt = Symbol.for("react.element"), Ve = Symbol.for("react.transitional.element"), Ne = Symbol.for("react.portal"), Ee = Symbol.for("react.fragment"), ve = Symbol.for("react.strict_mode"), Al = Symbol.for("react.profiler"), ca = Symbol.for("react.consumer"), Lt = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), J = Symbol.for("react.suspense_list"), jt = Symbol.for("react.memo"), gt = Symbol.for("react.lazy"), He = Symbol.for("react.activity"), il = Symbol.for("react.legacy_hidden"), sa = Symbol.for("react.memo_cache_sentinel"), g = Symbol.for("react.view_transition"), w = Symbol.for("react.recoverable"), X = Symbol.iterator;
  function Q(t) {
    return t === null || typeof t != "object" ? null : (t = X && t[X] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var st = Symbol.for("react.client.reference");
  function ft(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === st ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Ee:
        return "Fragment";
      case Al:
        return "Profiler";
      case ve:
        return "StrictMode";
      case K:
        return "Suspense";
      case J:
        return "SuspenseList";
      case He:
        return "Activity";
      case g:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Ne:
          return "Portal";
        case Lt:
          return t.displayName || "Context";
        case ca:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case jt:
          return e = t.displayName || null, e !== null ? e : ft(t.type) || "Memo";
        case gt:
          e = t._payload, t = t._init;
          try {
            return ft(t(e));
          } catch {
          }
      }
    return null;
  }
  var vt = Array.isArray, L = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, cl = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Tc = [], wa = -1;
  function Ke(t) {
    return { current: t };
  }
  function Vt(t) {
    0 > wa || (t.current = Tc[wa], Tc[wa] = null, wa--);
  }
  function Et(t, e) {
    wa++, Tc[wa] = t.current, t.current = e;
  }
  var Je = Ke(null), Hn = Ke(null), Cl = Ke(null), Lu = Ke(null);
  function Gu(t, e) {
    switch (Et(Cl, e), Et(Hn, t), Et(Je, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Pv(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Pv(e), t = tm(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Vt(Je), Et(Je, t);
  }
  function Ra() {
    Vt(Je), Vt(Hn), Vt(Cl);
  }
  function xc(t) {
    var e = t.memoizedState;
    e !== null && (Tn._currentValue = e.memoizedState, Et(Lu, t)), e = Je.current;
    var l = tm(e, t.type);
    e !== l && (Et(Hn, t), Et(Je, l));
  }
  function Xu(t) {
    Hn.current === t && (Vt(Je), Vt(Hn)), Lu.current === t && (Vt(Lu), Tn._currentValue = cl);
  }
  var jc, pr;
  function Dl(t) {
    if (jc === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        jc = e && e[1] || "", pr = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + jc + t + pr;
  }
  var Nc = !1;
  function Ec(t, e) {
    if (!t || Nc) return "";
    Nc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var z = function() {
                throw Error();
              };
              if (Object.defineProperty(z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(z, []);
                } catch (R) {
                  var y = R;
                }
                Reflect.construct(t, [], z);
              } else {
                try {
                  z.call();
                } catch (R) {
                  y = R;
                }
                z = !1;
                try {
                  var T = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), z = !0, new t();
                } finally {
                  z && (T !== void 0 ? Object.defineProperty(t.prototype, "props", T) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                y = R;
              }
              (z = t()) && typeof z.catch == "function" && z.catch(function() {
              });
            }
          } catch (R) {
            if (R && y && typeof R.stack == "string")
              return [R.stack, y.stack];
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
      var u = a.DetermineComponentFrameRoot(), i = u[0], f = u[1];
      if (i && f) {
        var d = i.split(`
`), b = f.split(`
`);
        for (n = a = 0; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === d.length || n === b.length)
          for (a = d.length - 1, n = b.length - 1; 1 <= a && 0 <= n && d[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (d[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || d[a] !== b[n]) {
                  var j = `
` + d[a].replace(" at new ", " at ");
                  return t.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", t.displayName)), j;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Nc = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Dl(l) : "";
  }
  function _h(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Dl(t.type);
      case 16:
        return Dl("Lazy");
      case 13:
        return t.child !== e && e !== null ? Dl("Suspense Fallback") : Dl("Suspense");
      case 19:
        return Dl("SuspenseList");
      case 0:
      case 15:
        return Ec(t.type, !1);
      case 11:
        return Ec(t.type.render, !1);
      case 1:
        return Ec(t.type, !0);
      case 31:
        return Dl("Activity");
      case 30:
        return Dl("ViewTransition");
      default:
        return "";
    }
  }
  function br(t) {
    try {
      var e = "", l = null;
      do
        e += _h(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var zc = Object.prototype.hasOwnProperty, Ac = s.unstable_scheduleCallback, Cc = s.unstable_cancelCallback, ph = s.unstable_shouldYield, bh = s.unstable_requestPaint, me = s.unstable_now, Sh = s.unstable_getCurrentPriorityLevel, Sr = s.unstable_ImmediatePriority, Tr = s.unstable_UserBlockingPriority, Qu = s.unstable_NormalPriority, Th = s.unstable_LowPriority, xr = s.unstable_IdlePriority, xh = s.log, jh = s.unstable_setDisableYieldValue, qn = null, he = null;
  function Ol(t) {
    if (typeof xh == "function" && jh(t), he && typeof he.setStrictMode == "function")
      try {
        he.setStrictMode(qn, t);
      } catch {
      }
  }
  var ge = Math.clz32 ? Math.clz32 : zh, Nh = Math.log, Eh = Math.LN2;
  function zh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Nh(t) / Eh | 0) | 0;
  }
  var Zu = 256, Vu = 262144, Ku = 4194304;
  function fa(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Ju(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = fa(a) : (i &= f, i !== 0 ? n = fa(i) : l || (l = f & ~t, l !== 0 && (n = fa(l))))) : (f = a & ~u, f !== 0 ? n = fa(f) : i !== 0 ? n = fa(i) : l || (l = a & ~t, l !== 0 && (n = fa(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Bn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function jr(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - ge(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function Ah(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function Nr() {
    var t = Ku;
    return Ku <<= 1, (Ku & 62914560) === 0 && (Ku = 4194304), t;
  }
  function Dc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Yn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ch(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var f = t.entanglements, d = t.expirationTimes, b = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var j = 31 - ge(l), z = 1 << j;
      f[j] = 0, d[j] = -1;
      var y = b[j];
      if (y !== null)
        for (b[j] = null, j = 0; j < y.length; j++) {
          var T = y[j];
          T !== null && (T.lane &= -536870913);
        }
      l &= ~z;
    }
    a !== 0 && Er(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function Er(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - ge(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function zr(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - ge(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Ar(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Oc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Oc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Mc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Cr() {
    var t = k.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : qm(t.type));
  }
  function Dr(t, e) {
    var l = k.p;
    try {
      return k.p = t, e();
    } finally {
      k.p = l;
    }
  }
  var sl = Math.random().toString(36).slice(2), Kt = "__reactFiber$" + sl, ie = "__reactProps$" + sl, Ua = "__reactContainer$" + sl, Or = "__reactEvents$" + sl, Dh = "__reactListeners$" + sl, Oh = "__reactHandles$" + sl, Mr = "__reactResources$" + sl, Ln = "__reactMarker$" + sl, $u = "__reactLoad$" + sl;
  function ku(t) {
    delete t[Kt], delete t[ie], delete t[Dh], delete t[Oh];
  }
  function ra(t) {
    var e;
    if (e = t[Kt]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Ua] || l[Kt]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = ym(t); t !== null; ) {
            if (l = t[Kt]) return l;
            t = ym(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Ha(t) {
    if (t = t[Kt] || t[Ua]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Gn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function qa(t) {
    var e = t[Mr];
    return e || (e = t[Mr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Gt(t) {
    t[Ln] = !0;
  }
  function wr(t) {
    t[$u] = void 0;
  }
  var Rr = /* @__PURE__ */ new Set(), Ur = {};
  function oa(t, e) {
    Ba(t, e), Ba(t + "Capture", e);
  }
  function Ba(t, e) {
    for (Ur[t] = e, t = 0; t < e.length; t++)
      Rr.add(e[t]);
  }
  var Mh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Hr = {}, qr = {};
  function wh(t) {
    return zc.call(qr, t) ? !0 : zc.call(Hr, t) ? !1 : Mh.test(t) ? qr[t] = !0 : (Hr[t] = !0, !1);
  }
  var rt = !1;
  function Br() {
    var t = rt;
    return rt = !1, t;
  }
  function Fu(t, e, l) {
    if (wh(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, l);
      }
  }
  function Wu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, l);
    }
  }
  function fl(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, a);
    }
  }
  function ye(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Yr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Rh(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function wc(t) {
    if (!t._valueTracker) {
      var e = Yr(t) ? "checked" : "value";
      t._valueTracker = Rh(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Lr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Yr(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var Uh = /[\n"\\]/g;
  function ze(t) {
    return t.replace(
      Uh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Rc(t, e, l, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + ye(e)) : t.value !== "" + ye(e) && (t.value = "" + ye(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Uc(t, ye(t.value)) : Uc(t, ye(e)) : l != null ? Uc(t, ye(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + ye(f) : t.removeAttribute("name");
  }
  function Gr(t, e, l, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        wc(t);
        return;
      }
      l = l != null ? "" + ye(l) : "", e = e != null ? "" + ye(e) : l, f || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), wc(t);
  }
  function Uc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Ya(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + ye(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Xr(t, e, l) {
    if (e != null && (e = "" + ye(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + ye(l) : "";
  }
  function Qr(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(r(92));
        if (vt(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = ye(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), wc(t);
  }
  function La(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Hh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zr(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Hh.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Vr(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", rt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Zr(t, n, a), rt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Zr(t, u, e[u]);
  }
  function Hc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var qh = /* @__PURE__ */ new Map([
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
  ]), Bh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Iu(t) {
    return Bh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function $e() {
  }
  var qc = null;
  function Bc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ga = null, Xa = null;
  function Kr(t) {
    var e = Ha(t);
    if (e && (t = e.stateNode)) {
      var l = t[ie] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Rc(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + ze(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[ie] || null;
                if (!n) throw Error(r(90));
                Rc(
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
            for (e = 0; e < l.length; e++)
              a = l[e], a.form === t.form && Lr(a);
          }
          break t;
        case "textarea":
          Xr(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Ya(t, !!l.multiple, e, !1);
      }
    }
  }
  var Yc = !1;
  function Jr(t, e, l) {
    if (Yc) return t(e, l);
    Yc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Yc = !1, (Ga !== null || Xa !== null) && (Ii(), Ga && (e = Ga, t = Xa, Xa = Ga = null, Kr(e), t)))
        for (e = 0; e < t.length; e++) Kr(t[e]);
    }
  }
  function Xn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[ie] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
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
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        r(231, e, typeof l)
      );
    return l;
  }
  var rl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lc = !1;
  if (rl)
    try {
      var Qn = {};
      Object.defineProperty(Qn, "passive", {
        get: function() {
          Lc = !0;
        }
      }), window.addEventListener("test", Qn, Qn), window.removeEventListener("test", Qn, Qn);
    } catch {
      Lc = !1;
    }
  var Ml = null, Gc = null, Pu = null;
  function $r() {
    if (Pu) return Pu;
    var t, e = Gc, l = e.length, a, n = "value" in Ml ? Ml.value : Ml.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return Pu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ti(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ei() {
    return !0;
  }
  function kr() {
    return !1;
  }
  function ee(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ei : kr, this.isPropagationStopped = kr, this;
    }
    return et(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ei);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ei);
      },
      persist: function() {
      },
      isPersistent: ei
    }), e;
  }
  var wl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, li = ee(wl), Zn = et({}, wl, { view: 0, detail: 0 }), Yh = ee(Zn), Xc, Qc, Vn, ai = et({}, Zn, {
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
    getModifierState: Vc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Vn && (Vn && t.type === "mousemove" ? (Xc = t.screenX - Vn.screenX, Qc = t.screenY - Vn.screenY) : Qc = Xc = 0, Vn = t), Xc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Qc;
    }
  }), Fr = ee(ai), Lh = et({}, ai, { dataTransfer: 0 }), Gh = ee(Lh), Xh = et({}, Zn, { relatedTarget: 0 }), Zc = ee(Xh), Qh = et({}, wl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Zh = ee(Qh), Vh = et({}, wl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Kh = ee(Vh), Jh = et({}, wl, { data: 0 }), Wr = ee(Jh), $h = {
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
  }, kh = {
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
  }, Fh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Wh(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Fh[t]) ? !!e[t] : !1;
  }
  function Vc() {
    return Wh;
  }
  var Ih = et({}, Zn, {
    key: function(t) {
      if (t.key) {
        var e = $h[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ti(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? kh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Vc,
    charCode: function(t) {
      return t.type === "keypress" ? ti(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ti(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Ph = ee(Ih), tg = et({}, ai, {
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
  }), Ir = ee(tg), eg = et({}, wl, { submitter: 0 }), lg = ee(eg), ag = et({}, Zn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Vc
  }), ng = ee(ag), ug = et({}, wl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ig = ee(ug), cg = et({}, ai, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), sg = ee(cg), fg = et({}, wl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), rg = ee(fg), og = [9, 13, 27, 32], Kc = rl && "CompositionEvent" in window, Kn = null;
  rl && "documentMode" in document && (Kn = document.documentMode);
  var dg = rl && "TextEvent" in window && !Kn, Pr = rl && (!Kc || Kn && 8 < Kn && 11 >= Kn), to = " ", eo = !1;
  function lo(t, e) {
    switch (t) {
      case "keyup":
        return og.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ao(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Qa = !1;
  function vg(t, e) {
    switch (t) {
      case "compositionend":
        return ao(e);
      case "keypress":
        return e.which !== 32 ? null : (eo = !0, to);
      case "textInput":
        return t = e.data, t === to && eo ? null : t;
      default:
        return null;
    }
  }
  function mg(t, e) {
    if (Qa)
      return t === "compositionend" || !Kc && lo(t, e) ? (t = $r(), Pu = Gc = Ml = null, Qa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Pr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var hg = {
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
  function no(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!hg[t.type] : e === "textarea";
  }
  function uo(t, e, l, a) {
    Ga ? Xa ? Xa.push(a) : Xa = [a] : Ga = a, e = nc(e, "onChange"), 0 < e.length && (l = new li(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var Jn = null, $n = null;
  function gg(t) {
    Jv(t, 0);
  }
  function ni(t) {
    var e = Gn(t);
    if (Lr(e)) return t;
  }
  function io(t, e) {
    if (t === "change") return e;
  }
  var co = !1;
  if (rl) {
    var Jc;
    if (rl) {
      var $c = "oninput" in document;
      if (!$c) {
        var so = document.createElement("div");
        so.setAttribute("oninput", "return;"), $c = typeof so.oninput == "function";
      }
      Jc = $c;
    } else Jc = !1;
    co = Jc && (!document.documentMode || 9 < document.documentMode);
  }
  function fo() {
    Jn && (Jn.detachEvent("onpropertychange", ro), $n = Jn = null);
  }
  function ro(t) {
    if (t.propertyName === "value" && ni($n)) {
      var e = [];
      uo(
        e,
        $n,
        t,
        Bc(t)
      ), Jr(gg, e);
    }
  }
  function yg(t, e, l) {
    t === "focusin" ? (fo(), Jn = e, $n = l, Jn.attachEvent("onpropertychange", ro)) : t === "focusout" && fo();
  }
  function _g(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ni($n);
  }
  function pg(t, e) {
    if (t === "click") return ni(e);
  }
  function bg(t, e) {
    if (t === "input" || t === "change")
      return ni(e);
  }
  function Sg(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var _e = typeof Object.is == "function" ? Object.is : Sg;
  function kn(t, e) {
    if (_e(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!zc.call(e, n) || !_e(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function kc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function oo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function vo(t, e) {
    var l = oo(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = t + l.textContent.length, t <= e && a >= e)
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = oo(l);
    }
  }
  function mo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? mo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function ho(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = kc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = kc(t.document);
    }
    return e;
  }
  function Fc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Tg = rl && "documentMode" in document && 11 >= document.documentMode, Za = null, Wc = null, Fn = null, Ic = !1;
  function go(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ic || Za == null || Za !== kc(a) || (a = Za, "selectionStart" in a && Fc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Fn && kn(Fn, a) || (Fn = a, a = nc(Wc, "onSelect"), 0 < a.length && (e = new li(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = Za)));
  }
  function da(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var Va = {
    animationend: da("Animation", "AnimationEnd"),
    animationiteration: da("Animation", "AnimationIteration"),
    animationstart: da("Animation", "AnimationStart"),
    transitionrun: da("Transition", "TransitionRun"),
    transitionstart: da("Transition", "TransitionStart"),
    transitioncancel: da("Transition", "TransitionCancel"),
    transitionend: da("Transition", "TransitionEnd")
  }, Pc = {}, yo = {};
  rl && (yo = document.createElement("div").style, "AnimationEvent" in window || (delete Va.animationend.animation, delete Va.animationiteration.animation, delete Va.animationstart.animation), "TransitionEvent" in window || delete Va.transitionend.transition);
  function va(t) {
    if (Pc[t]) return Pc[t];
    if (!Va[t]) return t;
    var e = Va[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in yo)
        return Pc[t] = e[l];
    return t;
  }
  var _o = va("animationend"), po = va("animationiteration"), bo = va("animationstart"), xg = va("transitionrun"), jg = va("transitionstart"), Ng = va("transitioncancel"), So = va("transitionend"), To = /* @__PURE__ */ new Map(), ts = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ts.push("scrollEnd");
  function qe(t, e) {
    To.set(t, e), oa(e, [t]);
  }
  var Eg = 0;
  function ol(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = Ge.identifierPrefix;
    var l = Eg++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function xo(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = dn;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = t[l[a]];
        if (n != null) {
          if (n === "none") return "none";
          e = e == null ? n : e + (" " + n);
        }
      }
    return e ?? t.default;
  }
  function dl(t, e) {
    return t = xo(t), e = xo(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var ui = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ae = [], Ka = 0, es = 0;
  function ii() {
    for (var t = Ka, e = es = Ka = 0; e < t; ) {
      var l = Ae[e];
      Ae[e++] = null;
      var a = Ae[e];
      Ae[e++] = null;
      var n = Ae[e];
      Ae[e++] = null;
      var u = Ae[e];
      if (Ae[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && jo(l, n, u);
    }
  }
  function ci(t, e, l, a) {
    Ae[Ka++] = t, Ae[Ka++] = e, Ae[Ka++] = l, Ae[Ka++] = a, es |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ls(t, e, l, a) {
    return ci(t, e, l, a), si(t);
  }
  function ma(t, e) {
    return ci(t, null, null, e), si(t);
  }
  function jo(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - ge(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function si(t) {
    if (50 < _u)
      throw _u = 0, Wi = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ja = {};
  function zg(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ce(t, e, l, a) {
    return new zg(t, e, l, a);
  }
  function as(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function vl(t, e) {
    var l = t.alternate;
    return l === null ? (l = ce(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function No(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function fi(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") as(a) && (i = 1);
    else if (typeof a == "string")
      i = e0(
        t,
        l,
        Je.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case He:
          return t = ce(31, l, e, n), t.elementType = He, t.lanes = u, t;
        case Ee:
          return ha(l.children, n, u, e);
        case ve:
          i = 8, n |= 24;
          break;
        case Al:
          return t = ce(12, l, e, n | 2), t.elementType = Al, t.lanes = u, t;
        case K:
          return t = ce(13, l, e, n), t.elementType = K, t.lanes = u, t;
        case J:
          return t = ce(19, l, e, n), t.elementType = J, t.lanes = u, t;
        case il:
        case g:
          return t = n | 32, t = ce(30, l, e, t), t.elementType = g, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case Lt:
                i = 10;
                break t;
              case ca:
                i = 9;
                break t;
              case q:
                i = 11;
                break t;
              case jt:
                i = 14;
                break t;
              case gt:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = ce(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function ha(t, e, l, a) {
    return t = ce(7, t, a, e), t.lanes = l, t;
  }
  function ns(t, e, l) {
    return t = ce(6, t, null, e), t.lanes = l, t;
  }
  function Eo(t) {
    var e = ce(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function us(t, e, l) {
    return e = ce(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var zo = /* @__PURE__ */ new WeakMap();
  function Ce(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = zo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: br(e)
      }, zo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: br(e)
    };
  }
  var $a = [], ka = 0, ri = null, Wn = 0, De = [], Oe = 0, Rl = null, ke = 1, Fe = "";
  function ml(t, e) {
    $a[ka++] = Wn, $a[ka++] = ri, ri = t, Wn = e;
  }
  function Ao(t, e, l) {
    De[Oe++] = ke, De[Oe++] = Fe, De[Oe++] = Rl, Rl = t;
    var a = ke;
    t = Fe;
    var n = 32 - ge(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - ge(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, ke = 1 << 32 - ge(e) + n | l << n | a, Fe = u + t;
    } else
      ke = 1 << u | l << n | a, Fe = t;
  }
  function oi(t) {
    t.return !== null && (ml(t, 1), Ao(t, 1, 0));
  }
  function is(t) {
    for (; t === ri; )
      ri = $a[--ka], $a[ka] = null, Wn = $a[--ka], $a[ka] = null;
    for (; t === Rl; )
      Rl = De[--Oe], De[Oe] = null, Fe = De[--Oe], De[Oe] = null, ke = De[--Oe], De[Oe] = null;
  }
  function Co(t, e) {
    De[Oe++] = ke, De[Oe++] = Fe, De[Oe++] = Rl, ke = e.id, Fe = e.overflow, Rl = t;
  }
  var Xt = null, zt = null, P = !1, Ul = null, Me = !1, cs = Error(r(519));
  function Hl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw In(Ce(e, t)), cs;
  }
  function Do(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[Kt] = t, e[ie] = a, l) {
      case "dialog":
        at("cancel", e), at("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        at("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < bu.length; l++)
          at(bu[l], e);
        break;
      case "source":
        at("error", e);
        break;
      case "img":
      case "image":
      case "link":
        at("error", e), at("load", e);
        break;
      case "details":
        at("toggle", e);
        break;
      case "input":
        at("invalid", e), Gr(
          e,
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
        at("invalid", e);
        break;
      case "textarea":
        at("invalid", e), Qr(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Wv(e.textContent, l) ? (a.popover != null && (at("beforetoggle", e), at("toggle", e)), a.onScroll != null && at("scroll", e), a.onScrollEnd != null && at("scrollend", e), a.onClick != null && (e.onclick = $e), e = !0) : e = !1, e || Hl(t, !0);
  }
  function di(t) {
    for (Xt = t.return; Xt; )
      switch (Xt.tag) {
        case 5:
        case 31:
        case 13:
          Me = !1;
          return;
        case 27:
        case 3:
          Me = !0;
          return;
        default:
          Xt = Xt.return;
      }
  }
  function Fa(t) {
    if (t !== Xt) return !1;
    if (!P) return di(t), P = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Bf(t.type, t.memoizedProps)), l = !l), l && zt && Hl(t), di(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      zt = gm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      zt = gm(t);
    } else
      e === 27 ? (e = zt, Il(t.type) ? (t = Jf, Jf = null, zt = t) : zt = e) : zt = Xt ? Re(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ga() {
    zt = Xt = null, P = !1;
  }
  function ss() {
    var t = Ul;
    return t !== null && (re === null ? re = t : re.push.apply(
      re,
      t
    ), Ul = null), t;
  }
  function In(t) {
    Ul === null ? Ul = [t] : Ul.push(t);
  }
  var fs = Ke(null), ya = null, hl = null;
  function ql(t, e, l) {
    Et(fs, e._currentValue), e._currentValue = l;
  }
  function gl(t) {
    t._currentValue = fs.current, Vt(fs);
  }
  function vi(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function rs(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var d = 0; d < e.length; d++)
            if (f.context === e[d]) {
              u.lanes |= l, f = u.alternate, f !== null && (f.lanes |= l), vi(
                u.return,
                l,
                t
              ), a || (i = null);
              break t;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(r(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), vi(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), vi(
          n.return,
          l,
          t
        ), i = n.child, i = i !== null ? i.sibling : null) : i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
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
  function _a(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          _e(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === Lu.current) {
        if (i = n.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Tn) : t = [Tn]);
      }
      n = n.return;
    }
    return t !== null && rs(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function mi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!_e(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function pa(t) {
    ya = t, hl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Jt(t) {
    return Oo(ya, t);
  }
  function hi(t, e) {
    return ya === null && pa(t), Oo(t, e);
  }
  function Oo(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, hl === null) {
      if (t === null) throw Error(r(308));
      hl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else hl = hl.next = e;
    return l;
  }
  var Ag = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, Cg = s.unstable_scheduleCallback, Dg = s.unstable_NormalPriority, Ut = {
    $$typeof: Lt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function os() {
    return {
      controller: new Ag(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pn(t) {
    t.refCount--, t.refCount === 0 && Cg(Dg, function() {
      t.controller.abort();
    });
  }
  function Mo(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var tu = null;
  function Og(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var eu = null, ds = 0, ba = 0, Wa = null;
  function Mg(t, e) {
    if (eu === null) {
      var l = eu = [];
      ds = 0, ba = Cf(), Wa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return ds++, e.then(wo, wo), e;
  }
  function wo() {
    if (--ds === 0 && (tu = null, eu !== null)) {
      Wa !== null && (Wa.status = "fulfilled");
      var t = eu;
      eu = null, ba = 0, Wa = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function wg(t, e) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var n = 0; n < l.length; n++) (0, l[n])(e);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var Ro = L.S;
  L.S = function(t, e) {
    if (Ev = me(), typeof e == "object" && e !== null && typeof e.then == "function" && Mg(t, e), tu !== null)
      for (var l = gn; l !== null; )
        Mo(l, tu), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = gn; a !== null; )
        Mo(a, l), a = a.next;
      if (ba !== 0) {
        a = tu, a === null && (a = tu = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Ro !== null && Ro(t, e);
  };
  var Sa = Ke(null);
  function vs() {
    var t = Sa.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function gi(t, e) {
    e === null ? Et(Sa, Sa.current) : Et(Sa, e.pool);
  }
  function Uo() {
    var t = vs();
    return t === null ? null : { parent: Ut._currentValue, pool: t };
  }
  var Ia = Error(r(460)), ms = Error(r(474)), yi = Error(r(542)), _i = { then: function() {
  } };
  function Ho(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function qo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then($e, $e), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Yo(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then($e, $e);
        else {
          if (t = Nt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Yo(t), t;
        }
        throw xa = e, Ia;
    }
  }
  function Ta(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (xa = l, Ia) : l;
    }
  }
  var xa = null;
  function Bo() {
    if (xa === null) throw Error(r(459));
    var t = xa;
    return xa = null, t;
  }
  function Yo(t) {
    if (t === Ia || t === yi)
      throw Error(r(483));
  }
  var Pa = null, lu = 0;
  function pi(t) {
    var e = lu;
    return lu += 1, Pa === null && (Pa = []), qo(Pa, t, e);
  }
  function Bl(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function bi(t, e) {
    throw e.$$typeof === dt ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Lo(t) {
    function e(p, m) {
      if (t) {
        var S = p.deletions;
        S === null ? (p.deletions = [m], p.flags |= 16) : S.push(m);
      }
    }
    function l(p, m) {
      if (!t) return null;
      for (; m !== null; )
        e(p, m), m = m.sibling;
      return null;
    }
    function a(p) {
      for (var m = /* @__PURE__ */ new Map(); p !== null; )
        p.key === null ? m.set(p.index, p) : m.set(p.key, p), p = p.sibling;
      return m;
    }
    function n(p, m) {
      return p = vl(p, m), p.index = 0, p.sibling = null, p;
    }
    function u(p, m, S) {
      return p.index = S, t ? (S = p.alternate, S !== null ? (S = S.index, S < m ? (p.flags |= 2, m) : S) : (p.flags |= 134217730, m)) : (p.flags |= 1048576, m);
    }
    function i(p) {
      return t && p.alternate === null && (p.flags |= 134217730), p;
    }
    function f(p, m, S, E) {
      return m === null || m.tag !== 6 ? (m = ns(S, p.mode, E), m.return = p, m) : (m = n(m, S), m.return = p, m);
    }
    function d(p, m, S, E) {
      var B = S.type;
      return B === Ee ? (p = j(
        p,
        m,
        S.props.children,
        E,
        S.key
      ), Bl(p, S), p) : m !== null && (m.elementType === B || typeof B == "object" && B !== null && B.$$typeof === gt && Ta(B) === m.type) ? (m = n(m, S.props), Bl(m, S), m.return = p, m) : (m = fi(
        S.type,
        S.key,
        S.props,
        null,
        p.mode,
        E
      ), Bl(m, S), m.return = p, m);
    }
    function b(p, m, S, E) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== S.containerInfo || m.stateNode.implementation !== S.implementation ? (m = us(S, p.mode, E), m.return = p, m) : (m = n(m, S.children || []), m.return = p, m);
    }
    function j(p, m, S, E, B) {
      return m === null || m.tag !== 7 ? (m = ha(
        S,
        p.mode,
        E,
        B
      ), m.return = p, m) : (m = n(m, S), m.return = p, m);
    }
    function z(p, m, S) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = ns(
          "" + m,
          p.mode,
          S
        ), m.return = p, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Ve:
            return S = fi(
              m.type,
              m.key,
              m.props,
              null,
              p.mode,
              S
            ), Bl(S, m), S.return = p, S;
          case Ne:
            return m = us(
              m,
              p.mode,
              S
            ), m.return = p, m;
          case gt:
            return m = Ta(m), z(p, m, S);
        }
        if (vt(m) || Q(m))
          return m = ha(
            m,
            p.mode,
            S,
            null
          ), m.return = p, m;
        if (typeof m.then == "function")
          return z(p, pi(m), S);
        if (m.$$typeof === Lt)
          return z(
            p,
            hi(p, m),
            S
          );
        bi(p, m);
      }
      return null;
    }
    function y(p, m, S, E) {
      var B = m !== null ? m.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return B !== null ? null : f(p, m, "" + S, E);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Ve:
            return S.key === B ? d(p, m, S, E) : null;
          case Ne:
            return S.key === B ? b(p, m, S, E) : null;
          case gt:
            return S = Ta(S), y(p, m, S, E);
        }
        if (vt(S) || Q(S))
          return B !== null ? null : j(p, m, S, E, null);
        if (typeof S.then == "function")
          return y(
            p,
            m,
            pi(S),
            E
          );
        if (S.$$typeof === Lt)
          return y(
            p,
            m,
            hi(p, S),
            E
          );
        bi(p, S);
      }
      return null;
    }
    function T(p, m, S, E, B) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return p = p.get(S) || null, f(m, p, "" + E, B);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case Ve:
            return p = p.get(
              E.key === null ? S : E.key
            ) || null, d(m, p, E, B);
          case Ne:
            return p = p.get(
              E.key === null ? S : E.key
            ) || null, b(m, p, E, B);
          case gt:
            return E = Ta(E), T(
              p,
              m,
              S,
              E,
              B
            );
        }
        if (vt(E) || Q(E))
          return p = p.get(S) || null, j(m, p, E, B, null);
        if (typeof E.then == "function")
          return T(
            p,
            m,
            S,
            pi(E),
            B
          );
        if (E.$$typeof === Lt)
          return T(
            p,
            m,
            S,
            hi(m, E),
            B
          );
        bi(m, E);
      }
      return null;
    }
    function R(p, m, S, E) {
      for (var B = null, ut = null, G = m, V = m = 0, Bt = null; G !== null && V < S.length; V++) {
        G.index > V ? (Bt = G, G = null) : Bt = G.sibling;
        var ct = y(
          p,
          G,
          S[V],
          E
        );
        if (ct === null) {
          G === null && (G = Bt);
          break;
        }
        t && G && ct.alternate === null && e(p, G), m = u(ct, m, V), ut === null ? B = ct : ut.sibling = ct, ut = ct, G = Bt;
      }
      if (V === S.length)
        return l(p, G), P && ml(p, V), B;
      if (G === null) {
        for (; V < S.length; V++)
          G = z(p, S[V], E), G !== null && (m = u(
            G,
            m,
            V
          ), ut === null ? B = G : ut.sibling = G, ut = G);
        return P && ml(p, V), B;
      }
      for (G = a(G); V < S.length; V++)
        Bt = T(
          G,
          p,
          V,
          S[V],
          E
        ), Bt !== null && (t && (ct = Bt.alternate, ct !== null && G.delete(ct.key === null ? V : ct.key)), m = u(
          Bt,
          m,
          V
        ), ut === null ? B = Bt : ut.sibling = Bt, ut = Bt);
      return t && G.forEach(function(aa) {
        return e(p, aa);
      }), P && ml(p, V), B;
    }
    function Y(p, m, S, E) {
      if (S == null) throw Error(r(151));
      for (var B = null, ut = null, G = m, V = m = 0, Bt = null, ct = S.next(); G !== null && !ct.done; V++, ct = S.next()) {
        G.index > V ? (Bt = G, G = null) : Bt = G.sibling;
        var aa = y(p, G, ct.value, E);
        if (aa === null) {
          G === null && (G = Bt);
          break;
        }
        t && G && aa.alternate === null && e(p, G), m = u(aa, m, V), ut === null ? B = aa : ut.sibling = aa, ut = aa, G = Bt;
      }
      if (ct.done)
        return l(p, G), P && ml(p, V), B;
      if (G === null) {
        for (; !ct.done; V++, ct = S.next())
          ct = z(p, ct.value, E), ct !== null && (m = u(ct, m, V), ut === null ? B = ct : ut.sibling = ct, ut = ct);
        return P && ml(p, V), B;
      }
      for (G = a(G); !ct.done; V++, ct = S.next())
        ct = T(G, p, V, ct.value, E), ct !== null && (t && (Bt = ct.alternate, Bt !== null && G.delete(
          Bt.key === null ? V : Bt.key
        )), m = u(ct, m, V), ut === null ? B = ct : ut.sibling = ct, ut = ct);
      return t && G.forEach(function(v0) {
        return e(p, v0);
      }), P && ml(p, V), B;
    }
    function I(p, m, S, E) {
      if (typeof S == "object" && S !== null && S.type === Ee && S.key === null && S.props.ref === void 0 && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Ve:
            t: {
              for (var B = S.key; m !== null; ) {
                if (m.key === B) {
                  if (B = S.type, B === Ee) {
                    if (m.tag === 7) {
                      l(
                        p,
                        m.sibling
                      ), E = n(
                        m,
                        S.props.children
                      ), Bl(E, S), E.return = p, p = E;
                      break t;
                    }
                  } else if (m.elementType === B || typeof B == "object" && B !== null && B.$$typeof === gt && Ta(B) === m.type) {
                    l(
                      p,
                      m.sibling
                    ), E = n(m, S.props), Bl(E, S), E.return = p, p = E;
                    break t;
                  }
                  l(p, m);
                  break;
                } else e(p, m);
                m = m.sibling;
              }
              S.type === Ee ? (E = ha(
                S.props.children,
                p.mode,
                E,
                S.key
              ), Bl(E, S), E.return = p, p = E) : (E = fi(
                S.type,
                S.key,
                S.props,
                null,
                p.mode,
                E
              ), Bl(E, S), E.return = p, p = E);
            }
            return i(p);
          case Ne:
            t: {
              for (B = S.key; m !== null; ) {
                if (m.key === B)
                  if (m.tag === 4 && m.stateNode.containerInfo === S.containerInfo && m.stateNode.implementation === S.implementation) {
                    l(
                      p,
                      m.sibling
                    ), E = n(m, S.children || []), E.return = p, p = E;
                    break t;
                  } else {
                    l(p, m);
                    break;
                  }
                else e(p, m);
                m = m.sibling;
              }
              E = us(S, p.mode, E), E.return = p, p = E;
            }
            return i(p);
          case gt:
            return S = Ta(S), I(
              p,
              m,
              S,
              E
            );
        }
        if (vt(S))
          return R(
            p,
            m,
            S,
            E
          );
        if (Q(S)) {
          if (B = Q(S), typeof B != "function") throw Error(r(150));
          return S = B.call(S), Y(
            p,
            m,
            S,
            E
          );
        }
        if (typeof S.then == "function")
          return I(
            p,
            m,
            pi(S),
            E
          );
        if (S.$$typeof === Lt)
          return I(
            p,
            m,
            hi(p, S),
            E
          );
        bi(p, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, m !== null && m.tag === 6 ? (l(p, m.sibling), E = n(m, S), E.return = p, p = E) : (l(p, m), E = ns(S, p.mode, E), E.return = p, p = E), i(p)) : l(p, m);
    }
    return function(p, m, S, E) {
      try {
        lu = 0;
        var B = I(
          p,
          m,
          S,
          E
        );
        return Pa = null, B;
      } catch (G) {
        if (G === Ia || G === yi) throw G;
        var ut = ce(29, G, null, p.mode);
        return ut.lanes = E, ut.return = p, ut;
      } finally {
      }
    };
  }
  var ja = Lo(!0), Go = Lo(!1), Yl = !1;
  function hs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gs(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ll(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Gl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (mt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = si(t), jo(t, null, l), e;
    }
    return ci(t, a, e, l), si(t);
  }
  function au(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, zr(t, l);
    }
  }
  function ys(t, e) {
    var l = t.updateQueue, a = t.alternate;
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
        u === null ? n = u = e : u = u.next = e;
      } else n = u = e;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var _s = !1;
  function nu() {
    if (_s) {
      var t = Wa;
      if (t !== null) throw t;
    }
  }
  function uu(t, e, l, a) {
    _s = !1;
    var n = t.updateQueue;
    Yl = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var d = f, b = d.next;
      d.next = null, i === null ? u = b : i.next = b, i = d;
      var j = t.alternate;
      j !== null && (j = j.updateQueue, f = j.lastBaseUpdate, f !== i && (f === null ? j.firstBaseUpdate = b : f.next = b, j.lastBaseUpdate = d));
    }
    if (u !== null) {
      var z = n.baseState;
      i = 0, j = b = d = null, f = u;
      do {
        var y = f.lane & -536870913, T = y !== f.lane;
        if (T ? (nt & y) === y : (a & y) === y) {
          y !== 0 && y === ba && (_s = !0), j !== null && (j = j.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var R = t, Y = f;
            y = e;
            var I = l;
            switch (Y.tag) {
              case 1:
                if (R = Y.payload, typeof R == "function") {
                  z = R.call(I, z, y);
                  break t;
                }
                z = R;
                break t;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = Y.payload, y = typeof R == "function" ? R.call(I, z, y) : R, y == null) break t;
                z = et({}, z, y);
                break t;
              case 2:
                Yl = !0;
            }
          }
          y = f.callback, y !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [y] : T.push(y));
        } else
          T = {
            lane: y,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, j === null ? (b = j = T, d = z) : j = j.next = T, i |= y;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          T = f, f = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      j === null && (d = z), n.baseState = d, n.firstBaseUpdate = b, n.lastBaseUpdate = j, u === null && (n.shared.lanes = 0), $l |= i, t.lanes = i, t.memoizedState = z;
    }
  }
  function Xo(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function Qo(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Xo(l[t], e);
  }
  var Xl = Ke(null), Si = Ke(0);
  function Zo(t, e) {
    t = Sl, Et(Si, t), Et(Xl, e), Sl = t | e.baseLanes;
  }
  function ps() {
    Et(Si, Sl), Et(Xl, Xl.current);
  }
  function bs() {
    Sl = Si.current, Vt(Xl), Vt(Si);
  }
  var $t = Ke(null), Pt = null;
  function Ql(t) {
    var e = t.alternate;
    Et(kt, kt.current & 1), Et($t, t), Pt === null && (e === null || Xl.current !== null || e.memoizedState !== null) && (Pt = t);
  }
  function Ss(t) {
    Et(kt, kt.current), Et($t, t), Pt === null && (Pt = t);
  }
  function Vo(t) {
    t.tag === 22 ? (Et(kt, kt.current), Et($t, t), Pt === null && (Pt = t)) : Zl();
  }
  function Zl() {
    Et(kt, kt.current), Et($t, $t.current);
  }
  function pe(t) {
    Vt($t), Pt === t && (Pt = null), Vt(kt);
  }
  var kt = Ke(0);
  function iu(t, e) {
    Et($t, $t.current), Et(kt, e);
  }
  function Ts(t) {
    Vt(kt), Vt($t), Pt === t && (Pt = null);
  }
  function Ti(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Vf(l) || Kf(l)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var yl = 0, W = null, Tt = null, Ht = null, xi = !1, tn = !1, Na = !1, ji = 0, cu = 0, en = null, Rg = 0;
  function Ot() {
    throw Error(r(321));
  }
  function xs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!_e(t[l], e[l])) return !1;
    return !0;
  }
  function js(t, e, l, a, n, u) {
    return yl = u, W = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, L.H = t === null || t.memoizedState === null ? Ad : Cd, Na = !1, u = l(a, n), Na = !1, tn && (u = Jo(
      e,
      l,
      a,
      n
    )), Ko(t), u;
  }
  function Ko(t) {
    L.H = Oi;
    var e = Tt !== null && Tt.next !== null;
    if (yl = 0, Ht = Tt = W = null, xi = !1, cu = 0, en = null, e) throw Error(r(300));
    t === null || qt || (t = t.dependencies, t !== null && mi(t) && (qt = !0));
  }
  function Jo(t, e, l, a) {
    W = t;
    var n = 0;
    do {
      if (tn && (en = null), cu = 0, tn = !1, 25 <= n) throw Error(r(301));
      if (n += 1, Ht = Tt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      L.H = Xg, u = e(l, a);
    } while (tn);
    return u;
  }
  function Ug() {
    var t = L.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? su(e) : e, t = t.useState()[0], (Tt !== null ? Tt.memoizedState : null) !== t && (W.flags |= 1024), e;
  }
  function Ns() {
    var t = ji !== 0;
    return ji = 0, t;
  }
  function Es(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function zs(t) {
    if (xi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      xi = !1;
    }
    yl = 0, Ht = Tt = W = null, tn = !1, cu = ji = 0, en = null;
  }
  function le() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ht === null ? W.memoizedState = Ht = t : Ht = Ht.next = t, Ht;
  }
  function Rt() {
    if (Tt === null) {
      var t = W.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = Ht === null ? W.memoizedState : Ht.next;
    if (e !== null)
      Ht = e, Tt = t;
    else {
      if (t === null)
        throw W.alternate === null ? Error(r(467)) : Error(r(310));
      Tt = t, t = {
        memoizedState: Tt.memoizedState,
        baseState: Tt.baseState,
        baseQueue: Tt.baseQueue,
        queue: Tt.queue,
        next: null
      }, Ht === null ? W.memoizedState = Ht = t : Ht = Ht.next = t;
    }
    return Ht;
  }
  function Ni() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function su(t) {
    var e = cu;
    return cu += 1, en === null && (en = []), t = qo(en, t, e), e = W, (Ht === null ? e.memoizedState : Ht.next) === null && (e = e.alternate, L.H = e === null || e.memoizedState === null ? Ad : Cd), t;
  }
  function Ei(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return su(t);
      if (t.$$typeof === w) return;
      if (t.$$typeof === Lt) return Jt(t);
    }
    throw Error(r(438, String(t)));
  }
  function As(t) {
    var e = null, l = W.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = W.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ni(), W.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = sa;
    return e.index++, l;
  }
  function _l(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function zi(t) {
    var e = Rt();
    return Cs(e, Tt, t);
  }
  function Cs(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      e.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      e = n.next;
      var f = i = null, d = null, b = e, j = !1;
      do {
        var z = b.lane & -536870913;
        if (z !== b.lane ? (nt & z) === z : (yl & z) === z) {
          var y = b.revertLane;
          if (y === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), z === ba && (j = !0);
          else if ((yl & y) === y) {
            b = b.next, y === ba && (j = !0);
            continue;
          } else
            z = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, d === null ? (f = d = z, i = u) : d = d.next = z, W.lanes |= y, $l |= y;
          z = b.action, Na && l(u, z), u = b.hasEagerState ? b.eagerState : l(u, z);
        } else
          y = {
            lane: z,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, d === null ? (f = d = y, i = u) : d = d.next = y, W.lanes |= z, $l |= z;
        b = b.next;
      } while (b !== null && b !== e);
      if (d === null ? i = u : d.next = f, !_e(u, t.memoizedState) && (qt = !0, j && (l = Wa, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Ds(t) {
    var e = Rt(), l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      _e(u, e.memoizedState) || (qt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function $o(t, e, l) {
    var a = W, n = Rt(), u = P;
    if (u) {
      if (l === void 0) throw Error(r(407));
      l = l();
    } else l = e();
    var i = !_e(
      (Tt || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, qt = !0), n = n.queue, ws(Wo.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || Ht !== null && (Ht.memoizedState.tag & 1) !== 0, ln(
      t ? 9 : 8,
      { destroy: void 0 },
      Fo.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Nt === null) throw Error(r(349));
      u || (yl & 127) !== 0 || ko(a, e, l);
    }
    return l;
  }
  function ko(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = W.updateQueue, e === null ? (e = Ni(), W.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Fo(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Io(e) && Po(t);
  }
  function Wo(t, e, l) {
    return l(function() {
      Io(e) && Po(t);
    });
  }
  function Io(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !_e(t, l);
    } catch {
      return !0;
    }
  }
  function Po(t) {
    var e = ma(t, 2);
    e !== null && oe(e, t, 2);
  }
  function Os(t) {
    var e = le();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Na) {
        Ol(!0);
        try {
          l();
        } finally {
          Ol(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _l,
      lastRenderedState: t
    }, e;
  }
  function td(t, e, l, a) {
    return t.baseState = l, Cs(
      t,
      Tt,
      typeof a == "function" ? a : _l
    );
  }
  function Hg(t, e, l, a, n) {
    if (Di(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: n,
        action: t,
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
      L.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, ed(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ed(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = L.T, i = {};
      i.types = u !== null ? u.types : null, L.T = i;
      try {
        var f = l(n, a), d = L.S;
        d !== null && d(i, f), ld(t, e, f);
      } catch (b) {
        Ms(t, e, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), L.T = u;
      }
    } else
      try {
        u = l(n, a), ld(t, e, u);
      } catch (b) {
        Ms(t, e, b);
      }
  }
  function ld(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        ad(t, e, a);
      },
      function(a) {
        return Ms(t, e, a);
      }
    ) : ad(t, e, l);
  }
  function ad(t, e, l) {
    e.status = "fulfilled", e.value = l, nd(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, ed(t, l)));
  }
  function Ms(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, nd(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function nd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function ud(t, e) {
    return e;
  }
  function id(t, e) {
    if (P) {
      var l = Nt.formState;
      if (l !== null) {
        t: {
          var a = W;
          if (P) {
            if (zt) {
              e: {
                for (var n = zt, u = Me; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = Re(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                zt = Re(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Hl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = le(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ud,
      lastRenderedState: e
    }, l.queue = a, l = Nd.bind(
      null,
      W,
      a
    ), a.dispatch = l, a = Os(!1), u = Bs.bind(
      null,
      W,
      !1,
      a.queue
    ), a = le(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Hg.bind(
      null,
      W,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function cd(t) {
    var e = Rt();
    return sd(e, Tt, t);
  }
  function sd(t, e, l) {
    if (e = Cs(
      t,
      e,
      ud
    )[0], t = zi(_l)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = su(e);
      } catch (i) {
        throw i === Ia ? yi : i;
      }
    else a = e;
    e = Rt();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (W.flags |= 2048, ln(
      9,
      { destroy: void 0 },
      qg.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function qg(t, e) {
    t.action = e;
  }
  function fd(t) {
    var e = Rt(), l = Tt;
    if (l !== null)
      return sd(e, l, t);
    Rt(), e = e.memoizedState, l = Rt();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function ln(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = W.updateQueue, e === null && (e = Ni(), W.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function rd() {
    return Rt().memoizedState;
  }
  function Ai(t, e, l, a) {
    var n = le();
    W.flags |= t, n.memoizedState = ln(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Ci(t, e, l, a) {
    var n = Rt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Tt !== null && a !== null && xs(a, Tt.memoizedState.deps) ? n.memoizedState = ln(e, u, l, a) : (W.flags |= t, n.memoizedState = ln(
      1 | e,
      u,
      l,
      a
    ));
  }
  function od(t, e) {
    Ai(8390656, 8, t, e);
  }
  function ws(t, e) {
    Ci(2048, 8, t, e);
  }
  function Bg(t) {
    W.flags |= 4;
    var e = W.updateQueue;
    if (e === null)
      e = Ni(), W.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function dd(t) {
    var e = Rt().memoizedState;
    return Bg({ ref: e, nextImpl: t }), function() {
      if ((mt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function vd(t, e) {
    return Ci(4, 2, t, e);
  }
  function md(t, e) {
    return Ci(4, 4, t, e);
  }
  function hd(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function gd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Ci(4, 4, hd.bind(null, e, t), l);
  }
  function Rs() {
  }
  function yd(t, e) {
    var l = Rt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && xs(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function _d(t, e) {
    var l = Rt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && xs(e, a[1]))
      return a[0];
    if (a = t(), Na) {
      Ol(!0);
      try {
        t();
      } finally {
        Ol(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Us(t, e, l) {
    return l === void 0 || (yl & 1073741824) !== 0 && (nt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Av(), W.lanes |= t, $l |= t, l);
  }
  function pd(t, e, l, a) {
    return _e(l, e) ? l : Xl.current !== null ? (t = Us(t, l, a), _e(t, e) || (qt = !0), t) : (yl & 106) === 0 || (yl & 1073741824) !== 0 && (nt & 261930) === 0 ? (qt = !0, t.memoizedState = l) : (t = Av(), W.lanes |= t, $l |= t, e);
  }
  function bd(t, e, l, a, n) {
    var u = k.p;
    k.p = u !== 0 && 8 > u ? u : 8;
    var i = L.T, f = {};
    f.types = i !== null ? i.types : null, L.T = f, Bs(t, !1, e, l);
    try {
      var d = n(), b = L.S;
      if (b !== null && b(f, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var j = wg(
          d,
          a
        );
        fu(
          t,
          e,
          j,
          xe(t)
        );
      } else
        fu(
          t,
          e,
          a,
          xe(t)
        );
    } catch (z) {
      fu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: z },
        xe()
      );
    } finally {
      k.p = u, i !== null && f.types !== null && (i.types = f.types), L.T = i;
    }
  }
  function Yg() {
  }
  function Hs(t, e, l, a) {
    if (t.tag !== 5) throw Error(r(476));
    var n = Sd(t).queue;
    bd(
      t,
      n,
      e,
      cl,
      l === null ? Yg : function() {
        return Td(t), l(a);
      }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: cl,
      baseState: cl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _l,
        lastRenderedState: cl
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _l,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Td(t) {
    var e = Sd(t);
    e.next === null && (e = t.alternate.memoizedState), fu(
      t,
      e.next.queue,
      {},
      xe()
    );
  }
  function qs() {
    return Jt(Tn);
  }
  function xd() {
    return Rt().memoizedState;
  }
  function jd() {
    return Rt().memoizedState;
  }
  function Lg(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = xe();
          t = Ll(l);
          var a = Gl(e, t, l);
          a !== null && (oe(a, e, l), au(a, e, l)), e = { cache: os() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Gg(t, e, l) {
    var a = xe();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Di(t) ? Ed(e, l) : (l = ls(t, e, l, a), l !== null && (oe(l, t, a), zd(l, e, a)));
  }
  function Nd(t, e, l) {
    var a = xe();
    fu(t, e, l, a);
  }
  function fu(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Di(t)) Ed(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, f = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = f, _e(f, i))
            return ci(t, e, n, 0), Nt === null && ii(), !1;
        } catch {
        } finally {
        }
      if (l = ls(t, e, n, a), l !== null)
        return oe(l, t, a), zd(l, e, a), !0;
    }
    return !1;
  }
  function Bs(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Cf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Di(t)) {
      if (e) throw Error(r(479));
    } else
      e = ls(
        t,
        l,
        a,
        2
      ), e !== null && oe(e, t, 2);
  }
  function Di(t) {
    var e = t.alternate;
    return t === W || e !== null && e === W;
  }
  function Ed(t, e) {
    tn = xi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function zd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, zr(t, l);
    }
  }
  var Oi = {
    readContext: Jt,
    use: Ei,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot,
    useEffectEvent: Ot
  }, Ad = {
    readContext: Jt,
    use: Ei,
    useCallback: function(t, e) {
      return le().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Jt,
    useEffect: od,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Ai(
        4194308,
        4,
        hd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Ai(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Ai(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = le();
      e = e === void 0 ? null : e;
      var a = t();
      if (Na) {
        Ol(!0);
        try {
          t();
        } finally {
          Ol(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = le();
      if (l !== void 0) {
        var n = l(e);
        if (Na) {
          Ol(!0);
          try {
            l(e);
          } finally {
            Ol(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Gg.bind(
        null,
        W,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = le();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Os(t);
      var e = t.queue, l = Nd.bind(null, W, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Rs,
    useDeferredValue: function(t, e) {
      var l = le();
      return Us(l, t, e);
    },
    useTransition: function() {
      var t = Os(!1);
      return t = bd.bind(
        null,
        W,
        t.queue,
        !0,
        !1
      ), le().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = W, n = le();
      if (P) {
        if (l === void 0)
          throw Error(r(407));
        l = l();
      } else {
        if (l = e(), Nt === null)
          throw Error(r(349));
        (nt & 127) !== 0 || ko(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, od(Wo.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, ln(
        9,
        { destroy: void 0 },
        Fo.bind(
          null,
          a,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = le(), e = Nt.identifierPrefix;
      if (P) {
        var l = Fe, a = ke;
        l = (a & ~(1 << 32 - ge(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = ji++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Rg++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: qs,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t) {
      var e = le();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = Bs.bind(
        null,
        W,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: As,
    useCacheRefresh: function() {
      return le().memoizedState = Lg.bind(
        null,
        W
      );
    },
    useEffectEvent: function(t) {
      var e = le(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((mt & 2) !== 0)
          throw Error(r(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Cd = {
    readContext: Jt,
    use: Ei,
    useCallback: yd,
    useContext: Jt,
    useEffect: ws,
    useImperativeHandle: gd,
    useInsertionEffect: vd,
    useLayoutEffect: md,
    useMemo: _d,
    useReducer: zi,
    useRef: rd,
    useState: function() {
      return zi(_l);
    },
    useDebugValue: Rs,
    useDeferredValue: function(t, e) {
      var l = Rt();
      return pd(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = zi(_l)[0], e = Rt().memoizedState;
      return [
        typeof t == "boolean" ? t : su(t),
        e
      ];
    },
    useSyncExternalStore: $o,
    useId: xd,
    useHostTransitionStatus: qs,
    useFormState: cd,
    useActionState: cd,
    useOptimistic: function(t, e) {
      var l = Rt();
      return td(l, Tt, t, e);
    },
    useMemoCache: As,
    useCacheRefresh: jd,
    useEffectEvent: dd
  }, Xg = {
    readContext: Jt,
    use: Ei,
    useCallback: yd,
    useContext: Jt,
    useEffect: ws,
    useImperativeHandle: gd,
    useInsertionEffect: vd,
    useLayoutEffect: md,
    useMemo: _d,
    useReducer: Ds,
    useRef: rd,
    useState: function() {
      return Ds(_l);
    },
    useDebugValue: Rs,
    useDeferredValue: function(t, e) {
      var l = Rt();
      return Tt === null ? Us(l, t, e) : pd(
        l,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ds(_l)[0], e = Rt().memoizedState;
      return [
        typeof t == "boolean" ? t : su(t),
        e
      ];
    },
    useSyncExternalStore: $o,
    useId: xd,
    useHostTransitionStatus: qs,
    useFormState: fd,
    useActionState: fd,
    useOptimistic: function(t, e) {
      var l = Rt();
      return Tt !== null ? td(l, Tt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: As,
    useCacheRefresh: jd,
    useEffectEvent: dd
  };
  function Ys(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : et({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Ls = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = xe(), n = Ll(a);
      n.payload = e, l != null && (n.callback = l), e = Gl(t, n, a), e !== null && (oe(e, t, a), au(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = xe(), n = Ll(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = Gl(t, n, a), e !== null && (oe(e, t, a), au(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = xe(), a = Ll(l);
      a.tag = 2, e != null && (a.callback = e), e = Gl(t, a, l), e !== null && (oe(e, t, l), au(e, t, l));
    }
  };
  function Dd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !kn(l, a) || !kn(n, u) : !0;
  }
  function Od(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Ls.enqueueReplaceState(e, e.state, null);
  }
  function Ea(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = et({}, l));
      for (var n in t)
        l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function Md(t) {
    ui(t);
  }
  function wd(t) {
    console.error(t);
  }
  function Rd(t) {
    ui(t);
  }
  function Mi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ud(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Gs(t, e, l) {
    return l = Ll(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Mi(t, e);
    }, l;
  }
  function Hd(t) {
    return t = Ll(t), t.tag = 3, t;
  }
  function qd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Ud(e, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Ud(e, l, a), typeof n != "function" && (kl === null ? kl = /* @__PURE__ */ new Set([this]) : kl.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function Qg(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && _a(
        e,
        l,
        n,
        !0
      ), l = $t.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Pt === null ? Pi() : l.alternate === null && Mt === 0 && (Mt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Ef(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Ef(t, a, n)), !1;
        }
        throw Error(r(435, l.tag));
      }
      return Ef(t, a, n), Pi(), !1;
    }
    if (P)
      return e = $t.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== cs && (t = Error(r(422), { cause: a }), In(Ce(t, l)))) : (a !== cs && (e = Error(r(423), {
        cause: a
      }), In(
        Ce(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Ce(a, l), n = Gs(
        t.stateNode,
        a,
        n
      ), ys(t, n), Mt !== 4 && (Mt = 2)), !1;
    var u = Error(r(520), { cause: a });
    if (u = Ce(u, l), yu === null ? yu = [u] : yu.push(u), Mt !== 4 && (Mt = 2), e === null) return !0;
    a = Ce(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Gs(l.stateNode, a, t), ys(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (kl === null || !kl.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Hd(n), qd(
              n,
              t,
              l,
              a
            ), ys(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Xs = Error(r(461)), qt = !1;
  function Yt(t, e, l, a) {
    e.child = t === null ? Go(e, null, l, a) : ja(
      e,
      t.child,
      l,
      a
    );
  }
  function Bd(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return pa(e), a = js(
      t,
      e,
      l,
      i,
      u,
      n
    ), f = Ns(), t !== null && !qt ? (Es(t, e, n), pl(t, e, n)) : (P && f && oi(e), e.flags |= 1, Yt(t, e, a, n), e.child);
  }
  function Yd(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !as(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Ld(
        t,
        e,
        u,
        a,
        n
      )) : (t = fi(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Fs(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : kn, l(i, a) && t.ref === e.ref)
        return pl(t, e, n);
    }
    return e.flags |= 1, t = vl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ld(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (kn(u, a) && t.ref === e.ref)
        if (qt = !1, e.pendingProps = a = u, Fs(t, n))
          (t.flags & 131072) !== 0 && (qt = !0);
        else
          return e.lanes = t.lanes, pl(t, e, n);
    }
    return Qs(
      t,
      e,
      l,
      a,
      n
    );
  }
  function Gd(t, e, l, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (a = e.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, e.child = null;
        return Xd(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && gi(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Zo(e, u) : ps(), Vo(e);
      else
        return a = e.lanes = 536870912, Xd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (gi(e, u.cachePool), Zo(e, u), Zl(), e.memoizedState = null) : (t !== null && gi(e, null), ps(), Zl());
    return Yt(t, e, n, l), e.child;
  }
  function ru(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Xd(t, e, l, a, n) {
    var u = vs();
    return u = u === null ? null : { parent: Ut._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && gi(e, null), ps(), Vo(e), t !== null && _a(t, e, a, !0), e.childLanes = n, null;
  }
  function wi(t, e) {
    return e = Ri(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Qd(t, e, l) {
    return ja(e, t.child, null, l), t = wi(e, e.pendingProps), t.flags |= 2, pe(e), e.memoizedState = null, t;
  }
  function Zg(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (P) {
        if (a.mode === "hidden")
          return t = wi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, ru(null, t);
        if (Ss(e), (t = zt) ? (t = hm(
          t,
          Me
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Rl !== null ? { id: ke, overflow: Fe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Eo(t), l.return = e, e.child = l, Xt = e, zt = null)) : t = null, t === null) throw Hl(e);
        return e.lanes = 536870912, null;
      }
      return wi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Ss(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Qd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (qt || _a(t, e, l, !1), n = (l & t.childLanes) !== 0, qt || n) {
        if (Xl.current === null) {
          if (a = Nt, a !== null && (i = Ar(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, ma(t, i), oe(a, t, i), Xs;
          Pi();
        }
        e = Qd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, zt = Re(i.nextSibling), Xt = e, P = !0, Ul = null, Me = !1, t !== null && Co(e, t), e = wi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = vl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function an(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(r(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Qs(t, e, l, a, n) {
    return pa(e), l = js(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Ns(), t !== null && !qt ? (Es(t, e, n), pl(t, e, n)) : (P && a && oi(e), e.flags |= 1, Yt(t, e, l, n), e.child);
  }
  function Zd(t, e, l, a, n, u) {
    return pa(e), e.updateQueue = null, l = Jo(
      e,
      a,
      l,
      n
    ), Ko(t), a = Ns(), t !== null && !qt ? (Es(t, e, u), pl(t, e, u)) : (P && a && oi(e), e.flags |= 1, Yt(t, e, l, u), e.child);
  }
  function Vd(t, e, l, a, n) {
    if (pa(e), e.stateNode === null) {
      var u = Ja, i = l.contextType;
      typeof i == "object" && i !== null && (u = Jt(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Ls, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, hs(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? Jt(i) : Ja, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Ys(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Ls.enqueueReplaceState(u, u.state, null), uu(e, a, u, n), nu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var f = e.memoizedProps, d = Ea(l, f);
      u.props = d;
      var b = u.context, j = l.contextType;
      i = Ja, typeof j == "object" && j !== null && (i = Jt(j));
      var z = l.getDerivedStateFromProps;
      j = typeof z == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, j || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== i) && Od(
        e,
        u,
        a,
        i
      ), Yl = !1;
      var y = e.memoizedState;
      u.state = y, uu(e, a, u, n), nu(), b = e.memoizedState, f || y !== b || Yl ? (typeof z == "function" && (Ys(
        e,
        l,
        z,
        a
      ), b = e.memoizedState), (d = Yl || Dd(
        e,
        l,
        d,
        a,
        y,
        b,
        i
      )) ? (j || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = b), u.props = a, u.state = b, u.context = i, a = d) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, gs(t, e), i = e.memoizedProps, j = Ea(l, i), u.props = j, z = e.pendingProps, y = u.context, b = l.contextType, d = Ja, typeof b == "object" && b !== null && (d = Jt(b)), f = l.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== z || y !== d) && Od(
        e,
        u,
        a,
        d
      ), Yl = !1, y = e.memoizedState, u.state = y, uu(e, a, u, n), nu();
      var T = e.memoizedState;
      i !== z || y !== T || Yl || t !== null && t.dependencies !== null && mi(t.dependencies) ? (typeof f == "function" && (Ys(
        e,
        l,
        f,
        a
      ), T = e.memoizedState), (j = Yl || Dd(
        e,
        l,
        j,
        a,
        y,
        T,
        d
      ) || t !== null && t.dependencies !== null && mi(t.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        d
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = d, a = j) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, an(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = ja(
      e,
      t.child,
      null,
      n
    ), e.child = ja(
      e,
      null,
      l,
      n
    )) : Yt(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = pl(
      t,
      e,
      n
    ), t;
  }
  function Kd(t, e, l, a) {
    return ga(), e.flags |= 256, Yt(t, e, l, a), e.child;
  }
  var Zs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vs(t) {
    return { baseLanes: t, cachePool: Uo() };
  }
  function Ks(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Te), t;
  }
  function Jd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (kt.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (P) {
        if (n ? Ql(e) : Zl(), (t = zt) ? (t = hm(
          t,
          Me
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Rl !== null ? { id: ke, overflow: Fe } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Eo(t), l.return = e, e.child = l, Xt = e, zt = null)) : t = null, t === null) throw Hl(e);
        return Kf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (Zl(), n = e.mode, u = Ri(
        { mode: "hidden", children: u },
        n
      ), a = ha(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Vs(l), a.childLanes = Ks(
        t,
        i,
        l
      ), e.memoizedState = Zs, ru(null, a)) : (Ql(e), Js(e, u));
    }
    var f = t.memoizedState;
    if (f !== null) {
      var d = f.dehydrated;
      if (d !== null)
        return Vg(
          t,
          e,
          u,
          i,
          a,
          d,
          f,
          l
        );
    }
    return n ? (Zl(), n = a.fallback, u = e.mode, f = t.child, d = f.sibling, a = vl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 1206910976, d !== null ? n = vl(d, n) : (n = ha(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, ru(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Vs(l) : (u = n.cachePool, u !== null ? (f = Ut._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Uo(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Ks(
      t,
      i,
      l
    ), e.memoizedState = Zs, ru(t.child, a)) : (Ql(e), l = t.child, t = l.sibling, l = vl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Js(t, e) {
    return e = Ri(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Ri(t, e) {
    return t = ce(22, t, null, e), t.lanes = 0, t;
  }
  function Ui(t, e, l) {
    return ja(e, t.child, null, l), t = Js(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Vg(t, e, l, a, n, u, i, f) {
    if (l)
      return e.flags & 256 ? (Ql(e), e.flags &= -257, Ui(
        t,
        e,
        f
      )) : e.memoizedState !== null ? (Zl(), e.child = t.child, e.flags |= 128, null) : (Zl(), u = n.fallback, i = e.mode, n = Ri(
        { mode: "visible", children: n.children },
        i
      ), u = ha(
        u,
        i,
        f,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, ja(e, t.child, null, f), n = e.child, n.memoizedState = Vs(f), n.childLanes = Ks(
        t,
        a,
        f
      ), e.memoizedState = Zs, ru(null, n));
    if (Ql(e), Kf(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var d = a.dgst;
      return a = d, a !== "" && (n = Error(r(419)), n.stack = "", n.digest = a, In({ value: n, source: null, stack: null })), Ui(
        t,
        e,
        f
      );
    }
    if (qt || _a(t, e, f, !1), a = (f & t.childLanes) !== 0, qt || a) {
      if (Xl.current !== null)
        return Ui(
          t,
          e,
          f
        );
      if (a = Nt, a !== null && (n = Ar(
        a,
        f
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, ma(t, n), oe(a, t, n), Xs;
      return Vf(u) || Pi(), Ui(
        t,
        e,
        f
      );
    }
    return Vf(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, zt = Re(u.nextSibling), Xt = e, P = !0, Ul = null, Me = !1, t !== null && Co(e, t), e = Js(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function $d(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), vi(t.return, e, l);
  }
  function kd(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && Ti(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Hi(t, e, l, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = l, i.tailMode = n, i.treeForkCount = u);
  }
  function $s(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function ks(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = kt.current;
    if (e.flags & 128)
      return iu(e, i), null;
    var f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, iu(e, i), n === "backwards" && t !== null ? ($s(t), Yt(t, e, a, l), $s(t)) : Yt(t, e, a, l), a = P ? Wn : 0, !f && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && $d(t, l, e);
        else if (t.tag === 19)
          $d(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "backwards":
        l = kd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, $s(e)), Hi(
          e,
          !0,
          n,
          null,
          u,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (l = null, n = e.child, e.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Ti(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        Hi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Hi(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        l = kd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Hi(
          e,
          !1,
          n,
          l,
          u,
          a
        );
    }
    return e.child;
  }
  function Fd(t, e, l) {
    var a = e.pendingProps;
    return ql(e, e.type, a.value), Yt(t, e, a.children, l), e.child;
  }
  function pl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), $l |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (_a(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, l = vl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = vl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Fs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && mi(t)));
  }
  function Kg(t, e, l) {
    switch (e.tag) {
      case 3:
        Gu(e, e.stateNode.containerInfo), ql(e, Ut, t.memoizedState.cache), ga();
        break;
      case 27:
      case 5:
        xc(e);
        break;
      case 4:
        Gu(e, e.stateNode.containerInfo);
        break;
      case 10:
        ql(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Ss(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Ql(e), e.flags |= 128, null;
          a = _a(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Jd(t, e, l) : (Ql(e), t = pl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        Ql(e);
        break;
      case 19:
        if (e.flags & 128)
          return ks(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (_a(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return ks(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), iu(e, kt.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Gd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        ql(e, Ut, t.memoizedState.cache);
    }
    return pl(t, e, l);
  }
  function Wd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        qt = !0;
      else {
        if (!Fs(t, l) && (e.flags & 128) === 0)
          return qt = !1, Kg(
            t,
            e,
            l
          );
        qt = (t.flags & 131072) !== 0;
      }
    else
      qt = !1, P && (e.flags & 1048576) !== 0 && Ao(e, Wn, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ta(e.elementType), e.type = t, typeof t == "function")
            as(t) ? (a = Ea(t, a), e.tag = 1, e = Vd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Qs(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === q) {
                e.tag = 11, e = Bd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === jt) {
                e.tag = 14, e = Yd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === Lt) {
                e.tag = 10, e.type = t, e = Fd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = ft(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return Qs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = Ea(
          a,
          e.pendingProps
        ), Vd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (Gu(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, gs(t, e), uu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, ql(e, Ut, a), a !== u.cache && rs(
            e,
            [Ut],
            l,
            !0
          ), nu(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Kd(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = Ce(
                Error(r(424)),
                e
              ), In(n), e = Kd(
                t,
                e,
                a,
                l
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (zt = Re(t.firstChild), Xt = e, P = !0, Ul = null, Me = !0, l = Go(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
            }
          else {
            if (ga(), a === n) {
              e = pl(
                t,
                e,
                l
              );
              break t;
            }
            Yt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return an(t, e), t === null ? (l = Tm(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : P || (e.stateNode = em(
          e.type,
          e.pendingProps,
          Cl.current,
          e
        )) : e.memoizedState = Tm(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return xc(e), t === null && P && (a = e.stateNode = _m(
          e.type,
          e.pendingProps,
          Cl.current
        ), Xt = e, Me = !0, n = zt, Il(e.type) ? (Jf = n, zt = Re(a.firstChild)) : zt = n), Yt(
          t,
          e,
          e.pendingProps.children,
          l
        ), an(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && P && ((n = a = zt) && (a = Ly(
          a,
          e.type,
          e.pendingProps,
          Me
        ), a !== null ? (e.stateNode = a, Xt = e, zt = Re(a.firstChild), Me = !1, n = !0) : n = !1), n || Hl(e)), xc(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Bf(n, u) ? a = null : i !== null && Bf(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = js(
          t,
          e,
          Ug,
          null,
          null,
          l
        ), Tn._currentValue = n), an(t, e), Yt(t, e, a, l), e.child;
      case 6:
        return t === null && P && ((t = l = zt) && (l = Gy(
          l,
          e.pendingProps,
          Me
        ), l !== null ? (e.stateNode = l, Xt = e, zt = null, t = !0) : t = !1), t || Hl(e)), null;
      case 13:
        return Jd(t, e, l);
      case 4:
        return Gu(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = ja(
          e,
          null,
          a,
          l
        ) : Yt(t, e, a, l), e.child;
      case 11:
        return Bd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, an(t, e), Yt(t, e, a, l), e.child;
      case 8:
        return Yt(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return Yt(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return Fd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, pa(e), n = Jt(n), a = a(n), e.flags |= 1, Yt(t, e, a, l), e.child;
      case 14:
        return Yd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Ld(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return ks(t, e, l);
      case 31:
        return Zg(t, e, l);
      case 22:
        return Gd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return pa(e), a = Jt(Ut), t === null ? (n = vs(), n === null && (n = Nt, u = os(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, hs(e), ql(e, Ut, n)) : ((t.lanes & l) !== 0 && (gs(t, e), uu(e, null, null, l), nu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ql(e, Ut, a)) : (a = u.cache, ql(e, Ut, a), a !== n.cache && rs(
          e,
          [Ut],
          l,
          !0
        ))), Yt(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : P && oi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : an(t, e), Yt(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function bl(t) {
    t.flags |= 4;
  }
  function Ws(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? Em(e, a) : Em(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Mv()) t.flags |= 8192;
        else
          throw xa = _i, ms;
    } else t.flags &= -16777217;
  }
  function Id(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !zm(e))
      if (Mv()) t.flags |= 8192;
      else
        throw xa = _i, ms;
  }
  function qi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Nr() : 536870912, t.lanes |= e, fn |= e);
  }
  function ou(t, e) {
    if (!P)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var l = t.tail, a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (e = t.tail, l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
      }
  }
  function At(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function Jg(t, e, l) {
    var a = e.pendingProps;
    switch (is(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return At(e), null;
      case 1:
        return At(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), gl(Ut), Ra(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Fa(e) ? bl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ss())), At(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (bl(e), u !== null ? (At(e), Id(e, u)) : (At(e), Ws(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (bl(e), At(e), Id(e, u)) : (At(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && bl(e), At(e), Ws(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Xu(e), l = Cl.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && bl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return At(e), e.subtreeFlags &= -33554433, null;
          }
          t = Je.current, Fa(e) ? Do(e) : (t = _m(n, a, l), e.stateNode = t, bl(e));
        }
        return At(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Xu(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && bl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(r(166));
            return At(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = Je.current, Fa(e))
            Do(e);
          else {
            var i = Tu(
              Cl.current
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
            u[Kt] = e, u[ie] = a;
            t: for (i = e.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === e) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === e)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            e.stateNode = u;
            t: switch (Wt(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && bl(e);
          }
        }
        return At(e), e.subtreeFlags &= -33554433, Ws(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && bl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = Cl.current, Fa(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = Xt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Kt] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Wv(t.nodeValue, l)), t || Hl(e, !0);
          } else
            t = Tu(t).createTextNode(
              a
            ), t[Kt] = e, e.stateNode = t;
        }
        return At(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Fa(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[Kt] = e;
            } else
              ga(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            At(e), t = !1;
          } else
            l = ss(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (pe(e), e) : (pe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return At(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = Fa(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
              n[Kt] = e;
            } else
              ga(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            At(e), n = !1;
          } else
            n = ss(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (pe(e), e) : (pe(e), null);
        }
        return pe(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), qi(e, e.updateQueue), At(e), null);
      case 4:
        return Ra(), t === null && wf(e.stateNode.containerInfo), e.flags |= 67108864, At(e), null;
      case 10:
        return gl(e.type), At(e), null;
      case 19:
        if (Ts(e), a = e.memoizedState, a === null) return At(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) ou(a, !1);
          else {
            if (Mt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Ti(t), u !== null) {
                  for (e.flags |= 128, ou(a, !1), t = u.updateQueue, e.updateQueue = t, qi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    No(l, t), l = l.sibling;
                  return iu(
                    e,
                    kt.current & 1 | 2
                  ), P && ml(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && me() > ki && (e.flags |= 128, n = !0, ou(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Ti(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, qi(e, t), ou(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !P)
                return At(e), null;
            } else
              2 * me() - a.renderingStartTime > ki && l !== 536870912 && (e.flags |= 128, n = !0, ou(a, !1), e.lanes = 4194304);
          a.isBackwards ? (u.sibling = e.child, e.child = u) : (t = a.last, t !== null ? t.sibling = u : e.child = u, a.last = u);
        }
        if (a.tail !== null) {
          t = a.tail;
          t: {
            for (l = t; l !== null; ) {
              if (l.alternate !== null) {
                l = !1;
                break t;
              }
              l = l.sibling;
            }
            l = !0;
          }
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = me(), t.sibling = null, u = kt.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || P ? iu(e, u) : (l = u, Et($t, e), Et(kt, l), Pt === null && (Pt = e)), P && ml(e, a.treeForkCount), t;
        }
        return At(e), null;
      case 22:
      case 23:
        return pe(e), bs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (At(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : At(e), l = e.updateQueue, l !== null && qi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Vt(Sa), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), gl(Ut), At(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, At(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function $g(t, e) {
    switch (is(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return gl(Ut), Ra(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Xu(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (pe(e), e.alternate === null)
            throw Error(r(340));
          ga();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (pe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          ga();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Ts(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ra(), null;
      case 10:
        return gl(e.type), null;
      case 22:
      case 23:
        return pe(e), bs(), t !== null && Vt(Sa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return gl(Ut), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Pd(t, e) {
    switch (is(e), e.tag) {
      case 3:
        gl(Ut), Ra();
        break;
      case 26:
      case 27:
      case 5:
        Xu(e);
        break;
      case 4:
        Ra();
        break;
      case 31:
        e.memoizedState !== null && pe(e);
        break;
      case 13:
        pe(e);
        break;
      case 19:
        Ts(e);
        break;
      case 10:
        gl(e.type);
        break;
      case 22:
      case 23:
        pe(e), bs(), t !== null && Vt(Sa);
        break;
      case 24:
        gl(Ut);
    }
  }
  function du(t, e) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var u = l.create, i = l.inst;
            a = u(), i.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (f) {
      pt(e, e.return, f);
    }
  }
  function Vl(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = e;
              var d = l, b = f;
              try {
                b();
              } catch (j) {
                pt(
                  n,
                  d,
                  j
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (j) {
      pt(e, e.return, j);
    }
  }
  function tv(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Qo(e, l);
      } catch (a) {
        pt(t, t.return, a);
      }
    }
  }
  function ev(t, e, l) {
    l.props = Ea(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      pt(t, e, a);
    }
  }
  function We(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            var n = t.stateNode, u = ol(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = sm(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new je(t);
              x(
                t.child,
                !1,
                By,
                i,
                void 0,
                void 0
              ), t.stateNode = i;
            }
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
      }
    } catch (f) {
      pt(t, e, f);
    }
  }
  function Ft(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          pt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          pt(t, e, n);
        }
      else l.current = null;
  }
  function Bi(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        mm(
          t.stateNode,
          e[l]
        );
  }
  function lv(t) {
    for (var e = t.return; e !== null && (Ps(e) && mm(t.stateNode, e.stateNode), !Is(e)); )
      e = e.return;
  }
  function vu(t) {
    for (var e = t.return; e !== null && (Ps(e) && Yy(t.stateNode, e.stateNode), !Is(e)); )
      e = e.return;
  }
  function Is(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Ps(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function tf(t) {
    var e = t.type, l = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      pt(t, t.return, n);
    }
  }
  function ef(t, e, l) {
    try {
      var a = t.stateNode;
      by(a, t.type, l, e), a[ie] = e;
    } catch (n) {
      pt(t, t.return, n);
    }
  }
  function av(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Il(t.type) || t.tag === 4;
  }
  function lf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || av(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Il(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function af(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = $e)), Bi(t, a), rt = !0;
    else if (n !== 4 && (n === 27 && (Bi(t, a), a = null, Il(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (af(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        af(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Yi(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Bi(t, a), rt = !0;
    else if (n !== 4 && (n === 27 && (Bi(t, a), a = null, Il(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Yi(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Yi(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function nv(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      Wt(e, a, l), e[Kt] = t, e[ie] = l;
    } catch (u) {
      pt(t, t.return, u);
    }
  }
  var Li = !1, be = null;
  function uv(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Li = !0);
  }
  var Ie = null;
  function iv() {
    var t = Ie;
    return Ie = null, t;
  }
  var se = 0;
  function nn(t, e, l, a, n) {
    return se = 0, cv(
      t.child,
      e,
      l,
      a,
      n
    );
  }
  function cv(t, e, l, a, n) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var f = Gf(i);
          a.push(f), f.view && (u = !0);
        } else
          u || Gf(i).view && (u = !0);
        Li = !0, im(
          i,
          se === 0 ? e : e + "_" + se,
          l
        ), se++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || cv(
        t.child,
        e,
        l,
        a,
        n
      ) && (u = !0));
      t = t.sibling;
    }
    return u;
  }
  function Pe(t, e) {
    for (; t !== null; )
      t.tag === 5 ? cm(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Pe(
        t.child,
        e
      )), t = t.sibling;
  }
  function Gi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Gi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var l = e.name;
          e = dl(e.default, e.share), e !== "none" && (nn(
            t,
            l,
            e,
            null,
            !1
          ) || Pe(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function nf(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = ol(a, l), u = dl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? nn(t, n, u, null, !1) ? (Gi(t), l.paired || e || vn(t, a.onEnter)) : Pe(t.child, !1) : Gi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        nf(t, e), t = t.sibling;
    else Gi(t);
  }
  function uf(t) {
    if (be !== null && be.size !== 0) {
      var e = be;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = dl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (nn(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, vn(t, l.onShare)) : Pe(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            uf(t);
          }
          t = t.sibling;
        }
    }
  }
  function cf(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = ol(e, t.stateNode), a = be !== null ? be.get(l) : void 0, n = dl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (nn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, be.delete(l), vn(t, e.onShare)) : vn(t, e.onExit) : Pe(t.child, !1)), be !== null && uf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        cf(t), t = t.sibling;
    else
      be !== null && uf(t);
  }
  function sv(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = ol(e, t.stateNode);
        e = dl(e.default, e.update), t.flags &= -5, e !== "none" && nn(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && sv(t);
      t = t.sibling;
    }
  }
  function sf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, Pe(t.child, !1));
          }
          sf(t);
        }
        t = t.sibling;
      }
  }
  function Xi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Pe(t.child, !1), sf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Xi(t), t = t.sibling;
    else sf(t);
  }
  function fv(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Pe(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && fv(t), t = t.sibling;
  }
  function ff(t, e, l, a, n, u, i) {
    for (var f = !1; e !== null; ) {
      if (e.tag === 5) {
        var d = e.stateNode;
        if (u !== null && se < u.length) {
          var b = u[se], j = Gf(d);
          (b.view || j.view) && (f = !0);
          var z;
          if (z = (t.flags & 4) === 0)
            if (j.clip) z = !0;
            else {
              z = b.rect;
              var y = j.rect;
              z = z.y !== y.y || z.x !== y.x || z.height !== y.height || z.width !== y.width;
            }
          z && (t.flags |= 4), j.abs ? j = !b.abs : (b = b.rect, j = j.rect, j = b.height !== j.height || b.width !== j.width), j && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && im(
          d,
          se === 0 ? l : l + "_" + se,
          n
        ), f && (t.flags & 4) !== 0 || (Ie === null && (Ie = []), Ie.push(
          d,
          se === 0 ? a : a + "_" + se,
          e.memoizedProps
        )), se++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : ff(
        t,
        e.child,
        l,
        a,
        n,
        u,
        i
      ) && (f = !0));
      e = e.sibling;
    }
    return f;
  }
  function rv(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = ol(l, a), u = dl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var f = t.child;
        se = 0, n = ff(
          a,
          f,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && vn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && rv(t);
      t = t.sibling;
    }
  }
  var Qt = !1, yt = !1, tl = !1, rf = !1, ov = typeof WeakSet == "function" ? WeakSet : Set, Zt = null, el = !1, mu = !1, Qi = !1, of = !1;
  function kg(t, e, l) {
    if (t = t.containerInfo, Hf = xn, t = ho(t), Fc(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var u = n.anchorOffset, i = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break t;
            }
            var f = 0, d = -1, b = -1, j = 0, z = 0, y = t, T = null;
            e: for (; ; ) {
              for (var R; y !== a || u !== 0 && y.nodeType !== 3 || (d = f + u), y !== i || n !== 0 && y.nodeType !== 3 || (b = f + n), y.nodeType === 3 && (f += y.nodeValue.length), (R = y.firstChild) !== null; )
                T = y, y = R;
              for (; ; ) {
                if (y === t) break e;
                if (T === a && ++j === u && (d = f), T === i && ++z === n && (b = f), (R = y.nextSibling) !== null) break;
                y = T, T = y.parentNode;
              }
              y = R;
            }
            a = d === -1 || b === -1 ? null : { start: d, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (qf = { focusedElem: t, selectionRange: a }, xn = !1, l = (l & 335544064) === l, Zt = e, e = l ? 9270 : 1024; Zt !== null; ) {
      if (t = Zt, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && cf(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && uv(t), Zi(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && cf(a), Zi(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && uv(t), Zi(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, Zt = a) : (l && sv(t), Zi(l));
      }
    }
    be = null;
  }
  function Zi(t) {
    for (; Zt !== null; ) {
      var e = Zt, l = t, a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((n & 1024) !== 0 && a !== null) {
            l = void 0, n = a.memoizedProps, a = a.memoizedState;
            var u = e.stateNode;
            try {
              var i = Ea(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (f) {
              pt(e, e.return, f);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              Zf(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Zf(a);
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
          l && a !== null && (l = ol(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = dl(n.default, n.update), n !== "none" && nn(
            a,
            l,
            n,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(r(163));
      }
      if (a = e.sibling, a !== null) {
        a.return = e.return, Zt = a;
        break;
      }
      Zt = e.return;
    }
  }
  function dv(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ll(t, l), a & 4 && du(5, l);
        break;
      case 1:
        if (ll(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              pt(l, l.return, i);
            }
          else {
            var n = Ea(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              pt(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && tv(l), a & 512 && We(l, l.return);
        break;
      case 3:
        if (ll(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Qo(t, e);
          } catch (i) {
            pt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && nv(l);
      case 26:
      case 5:
        ll(t, l), e === null && a & 4 && tf(l), a & 512 && We(l, l.return);
        break;
      case 12:
        ll(t, l);
        break;
      case 31:
        ll(t, l), a & 4 && gv(t, l);
        break;
      case 13:
        ll(t, l), a & 4 && yv(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = cy.bind(
          null,
          l
        ), Xy(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || Qt, !a) {
          var u = e !== null && e.memoizedState !== null || yt;
          e = Qt, n = yt, Qt = a, (yt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), Le(
            t,
            l,
            a
          )) : ll(t, l), Qt = e, yt = n;
        }
        break;
      case 30:
        ll(t, l), a & 512 && We(l, l.return);
        break;
      case 7:
        a & 512 && We(l, l.return);
      default:
        ll(t, l);
    }
  }
  function df(t, e) {
    for (t = t.child; t !== null; )
      vv(t, e), t = t.sibling;
  }
  function vv(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var l = t.stateNode;
          if (e) {
            var a = l.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var n = t.stateNode, u = t.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (d) {
          pt(t, t.return, d);
        }
        vf(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, rt = !0;
        } catch (d) {
          pt(t, t.return, d);
        }
        break;
      case 18:
        try {
          var f = t.stateNode;
          e ? um(f, !0) : um(t.stateNode, !1);
        } catch (d) {
          pt(t, t.return, d);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && df(t, e);
        break;
      default:
        df(t, e);
    }
  }
  function vf(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              vv(l, a);
              break t;
            case 22:
              l.memoizedState === null && vf(l, a);
              break t;
            default:
              vf(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function mv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, mv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && ku(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ct = null, fe = !1;
  function Be(t, e, l) {
    for (l = l.child; l !== null; )
      hv(t, e, l), l = l.sibling;
  }
  function hv(t, e, l) {
    if (he && typeof he.onCommitFiberUnmount == "function")
      try {
        he.onCommitFiberUnmount(qn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        yt || Ft(l, e), Be(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !yt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        yt || Ft(l, e), vu(l);
        var a = Ct, n = fe;
        Il(l.type) && (Ct = l.stateNode, fe = !1), Be(
          t,
          e,
          l
        ), pm(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), Ct = a, fe = n;
        break;
      case 5:
        yt || Ft(l, e), vu(l);
      case 6:
        if (l.tag === 6 && vu(l), a = Ct, n = fe, Ct = null, Be(
          t,
          e,
          l
        ), Ct = a, fe = n, Ct !== null)
          if (fe)
            try {
              (Ct.nodeType === 9 ? Ct.body : Ct.nodeName === "HTML" ? Ct.ownerDocument.body : Ct).removeChild(l.stateNode), rt = !0;
            } catch (u) {
              pt(
                l,
                e,
                u
              );
            }
          else
            try {
              Ct.removeChild(l.stateNode), rt = !0;
            } catch (u) {
              pt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Ct !== null && (fe ? (t = Ct, nm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), jn(t)) : nm(Ct, l.stateNode));
        break;
      case 4:
        a = Ct, n = fe, Ct = l.stateNode.containerInfo, fe = !0, Be(
          t,
          e,
          l
        ), Ct = a, fe = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Vl(2, l, e), yt || Vl(4, l, e), Be(
          t,
          e,
          l
        );
        break;
      case 1:
        yt || (Ft(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && ev(
          l,
          e,
          a
        )), Be(
          t,
          e,
          l
        );
        break;
      case 21:
        Be(
          t,
          e,
          l
        );
        break;
      case 22:
        yt = (a = yt) || l.memoizedState !== null, Be(
          t,
          e,
          l
        ), yt = a;
        break;
      case 30:
        Ft(l, e), Be(
          t,
          e,
          l
        );
        break;
      case 7:
        yt || Ft(l, e), Be(
          t,
          e,
          l
        );
        break;
      default:
        Be(
          t,
          e,
          l
        );
    }
  }
  function gv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        jn(t);
      } catch (l) {
        pt(e, e.return, l);
      }
    }
  }
  function yv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        jn(t);
      } catch (l) {
        pt(e, e.return, l);
      }
  }
  function Fg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new ov()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new ov()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Vi(t, e) {
    var l = Fg(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = sy.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function ae(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, f = e, d = f;
        t: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Il(d.type)) {
                Ct = d.stateNode, fe = !1;
                break t;
              }
              break;
            case 5:
              Ct = d.stateNode, fe = !1;
              break t;
            case 3:
            case 4:
              Ct = d.stateNode.containerInfo, fe = !0;
              break t;
          }
          d = d.return;
        }
        if (Ct === null) throw Error(r(160));
        hv(i, f, u), Ct = null, fe = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        _v(e, t, l), e = e.sibling;
  }
  var Ye = null;
  function _v(t, e, l) {
    var a = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var u = 0; u < a.length; u++) {
            var i = a[u];
            i.ref.impl = i.nextImpl;
          }
        ae(e, t, l), ne(t), n & 4 && (Vl(3, t, t.return), du(3, t), Vl(5, t, t.return));
        break;
      case 1:
        ae(e, t, l), ne(t), n & 512 && (yt || a === null || Ft(a, a.return)), n & 64 && Qt && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = Ye, ae(e, t, l), ne(t), n & 512 && (yt || a === null || Ft(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (Qt)
                  t.stateNode = em(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, l = t.memoizedProps, n = u.ownerDocument || u;
                    e: switch (e) {
                      case "title":
                        a = n.getElementsByTagName("title")[0], (!a || a[Ln] || a[Kt] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Wt(a, e, l), a[Kt] = t, Gt(a), e = a;
                        break t;
                      case "link":
                        if (u = Nm(
                          "link",
                          "href",
                          n
                        ).get(e + (l.href || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && a.getAttribute("rel") === (l.rel == null ? null : l.rel) && a.getAttribute("title") === (l.title == null ? null : l.title) && a.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              u.splice(i, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), Wt(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = Nm(
                          "meta",
                          "content",
                          n
                        ).get(e + (l.content || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("content") === (l.content == null ? null : "" + l.content) && a.getAttribute("name") === (l.name == null ? null : l.name) && a.getAttribute("property") === (l.property == null ? null : l.property) && a.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && a.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              u.splice(i, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), Wt(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    a[Kt] = t, Gt(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                Qt || Wf(u, t.type, t.stateNode);
            else
              t.stateNode = jm(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || yt || e.parentNode.removeChild(e)) : n.count--, l === null ? Qt || Wf(u, t.type, t.stateNode) : jm(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && ef(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        ae(e, t, l), ne(t), n & 512 && (yt || a === null || Ft(a, a.return)), a !== null && n & 4 && ef(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = tl, tl = !1, ae(e, t, l), tl = u, ne(t), n & 512 && (yt || a === null || Ft(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            La(e, ""), rt = !0;
          } catch (j) {
            pt(t, t.return, j);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, ef(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (rf = !0);
        break;
      case 6:
        if (ae(e, t, l), ne(t), n & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, rt = !0;
          } catch (j) {
            pt(t, t.return, j);
          }
        }
        break;
      case 3:
        if (rt = !1, ic = null, u = Ye, Ye = xu(e.containerInfo), ae(e, t, l), Ye = u, ne(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            jn(e.containerInfo);
          } catch (j) {
            pt(t, t.return, j);
          }
        rf && (rf = !1, pv(t)), rt = !1;
        break;
      case 4:
        n = tl, tl = Qt, a = Br(), u = Ye, Ye = xu(
          t.stateNode.containerInfo
        ), ae(e, t, l), ne(t), Ye = u, rt && mu && (Qi = !0), rt = a, tl = n;
        break;
      case 12:
        ae(e, t, l), ne(t);
        break;
      case 31:
        ae(e, t, l), ne(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Vi(t, e)));
        break;
      case 13:
        ae(e, t, l), ne(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && ($i = me()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Vi(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var f = Qt, d = yt, b = tl;
        Qt = f || u, tl = b || u, yt = d || i, ae(e, t, l), yt = d, tl = b, Qt = f, ne(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || Qt || yt || (e = i || yt, l = Qt, a = yt, Qt = u || Qt, yt = e, Kl(t, 2), Qt = l, yt = a), !u && tl || df(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, Vi(t, l))));
        break;
      case 19:
        ae(e, t, l), ne(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Vi(t, e)));
        break;
      case 30:
        n & 512 && (yt || a === null || Ft(a, a.return)), n = Br(), u = mu, i = (l & 335544064) === l, f = t.memoizedProps, mu = i && dl(
          f.default,
          f.update
        ) !== "none", ae(e, t, l), ne(t), i && a !== null && rt && (t.flags |= 4), mu = u, rt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (yt || a === null || Ft(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        ae(e, t, l), ne(t);
    }
  }
  function ne(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (av(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = t.return; n !== null; ) {
          if (Ps(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (Is(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(r(160));
        switch (l.tag) {
          case 27:
            var f = l.stateNode, d = lf(t);
            Yi(
              t,
              d,
              f,
              i
            );
            break;
          case 5:
            var b = l.stateNode;
            l.flags & 32 && (La(b, ""), l.flags &= -33);
            var j = lf(t);
            Yi(
              t,
              j,
              b,
              i
            );
            break;
          case 3:
          case 4:
            var z = l.stateNode.containerInfo, y = lf(t);
            af(
              t,
              y,
              z,
              i
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (T) {
        pt(t, t.return, T);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function pv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        pv(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, xn = !0, e.reset(), xn = !1), t = t.sibling;
      }
  }
  function un(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        bv(e, t), e = e.sibling;
    else rv(e);
  }
  function bv(t, e) {
    var l = t.alternate;
    if (l === null) nf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (of = el = !1, iv(), un(e, t), !el && !Qi) {
            if (t = Ie, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                l = t[a];
                var n = t[a + 1];
                cm(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + n + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), of = !0;
          }
          Ie = null;
          break;
        case 5:
          un(e, t);
          break;
        case 4:
          a = el, el = !1, un(e, t), el && (Qi = !0), el = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? nf(t, !1) : un(e, t));
          break;
        case 30:
          a = el, n = iv(), el = !1, un(e, t), el && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = ol(u, i), i = ol(l.memoizedProps, i);
          var f = dl(u.default, u.update);
          f === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, se = 0, e = ff(
            t,
            l,
            e,
            i,
            f,
            u,
            !0
          ), se !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (vn(
            t,
            t.memoizedProps.onUpdate
          ), Ie = n) : n !== null && (n.push.apply(n, Ie), Ie = n), el = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          un(e, t);
      }
  }
  function ll(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        dv(t, e.alternate, e), e = e.sibling;
  }
  function Kl(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Vl(4, l, l.return), Kl(
            l,
            a
          );
          break;
        case 1:
          Ft(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && ev(
            l,
            l.return,
            n
          ), Kl(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && pm(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          Ft(l, l.return), l.tag !== 5 && l.tag !== 27 || vu(l), Kl(
            l,
            a
          );
          break;
        case 6:
          vu(l);
          break;
        case 26:
          Ft(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || yt || n.parentNode.removeChild(n), Kl(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && Kl(
            l,
            a
          );
          break;
        case 30:
          Ft(l, l.return), Kl(
            l,
            a
          );
          break;
        case 7:
          Ft(l, l.return);
        default:
          Kl(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Le(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, f = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Le(
            n,
            u,
            l
          ), du(4, u);
          break;
        case 1:
          if (Le(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (j) {
              pt(a, a.return, j);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var d = a.stateNode;
            try {
              var b = n.shared.hiddenCallbacks;
              if (b !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < b.length; n++)
                  Xo(b[n], d);
            } catch (j) {
              pt(a, a.return, j);
            }
          }
          f && i & 64 && tv(u), We(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && nv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || lv(u), Le(
            n,
            u,
            l
          ), f && a === null && i & 4 && tf(u), We(u, u.return);
          break;
        case 6:
          lv(u);
          break;
        case 26:
          d = u.stateNode, u.memoizedState !== null || d === null || Qt || Wf(
            xu(d.ownerDocument),
            u.type,
            d
          ), Le(
            n,
            u,
            l
          ), f && a === null && i & 4 && tf(u), We(u, u.return);
          break;
        case 12:
          Le(
            n,
            u,
            l
          );
          break;
        case 31:
          Le(
            n,
            u,
            l
          ), f && i & 4 && gv(n, u);
          break;
        case 13:
          Le(
            n,
            u,
            l
          ), f && i & 4 && yv(n, u);
          break;
        case 22:
          u.memoizedState === null && Le(
            n,
            u,
            l
          ), We(u, u.return);
          break;
        case 30:
          Le(
            n,
            u,
            l
          ), We(u, u.return);
          break;
        case 7:
          We(u, u.return);
        default:
          Le(
            n,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function mf(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && Pn(l));
  }
  function hf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Pn(t));
  }
  function we(t, e, l, a) {
    var n = (l & 335544064) === l;
    if (e.subtreeFlags & (n ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Sv(
          t,
          e,
          l,
          a
        ), e = e.sibling;
    else n && fv(e);
  }
  function Sv(t, e, l, a) {
    var n = (l & 335544064) === l;
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Xi(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        we(
          t,
          e,
          l,
          a
        ), u & 2048 && du(9, e);
        break;
      case 1:
        we(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        we(
          t,
          e,
          l,
          a
        ), n && of && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && Pn(u)));
        break;
      case 12:
        if (u & 2048) {
          we(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, f = i.id, d = i.onPostCommit;
            typeof d == "function" && d(
              f,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (b) {
            pt(e, e.return, b);
          }
        } else
          we(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        we(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        we(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, f = e.alternate, e.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Xi(f), i._visibility & 2 ? we(
          t,
          e,
          l,
          a
        ) : hu(
          t,
          e
        )) : (n && f !== null && f.memoizedState !== null && Xi(e), i._visibility & 2 ? we(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, cn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && mf(f, e);
        break;
      case 24:
        we(
          t,
          e,
          l,
          a
        ), u & 2048 && hf(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (Pe(u.child, !0), Pe(e.child, !0))), we(
          t,
          e,
          l,
          a
        );
        break;
      default:
        we(
          t,
          e,
          l,
          a
        );
    }
  }
  function cn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, f = l, d = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          cn(
            u,
            i,
            f,
            d,
            n
          ), du(8, i);
          break;
        case 23:
          break;
        case 22:
          var j = i.stateNode;
          i.memoizedState !== null ? j._visibility & 2 ? cn(
            u,
            i,
            f,
            d,
            n
          ) : hu(
            u,
            i
          ) : (j._visibility |= 2, cn(
            u,
            i,
            f,
            d,
            n
          )), n && b & 2048 && mf(
            i.alternate,
            i
          );
          break;
        case 24:
          cn(
            u,
            i,
            f,
            d,
            n
          ), n && b & 2048 && hf(i.alternate, i);
          break;
        default:
          cn(
            u,
            i,
            f,
            d,
            n
          );
      }
      e = e.sibling;
    }
  }
  function hu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            hu(l, a), n & 2048 && mf(
              a.alternate,
              a
            );
            break;
          case 24:
            hu(l, a), n & 2048 && hf(a.alternate, a);
            break;
          default:
            hu(l, a);
        }
        e = e.sibling;
      }
  }
  var za = 8192;
  function Aa(t, e, l) {
    if (t.subtreeFlags & za)
      for (t = t.child; t !== null; )
        Tv(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Tv(t, e, l) {
    switch (t.tag) {
      case 26:
        Aa(
          t,
          e,
          l
        ), t.flags & za && (t.memoizedState !== null ? l0(
          l,
          Ye,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && Cm(l, t)));
        break;
      case 5:
        Aa(
          t,
          e,
          l
        ), t.flags & za && (t = t.stateNode, (e & 335544128) === e && Cm(l, t));
        break;
      case 3:
      case 4:
        var a = Ye;
        Ye = xu(t.stateNode.containerInfo), Aa(
          t,
          e,
          l
        ), Ye = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = za, za = 16777216, Aa(
          t,
          e,
          l
        ), za = a) : Aa(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & za) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, be === null && (be = /* @__PURE__ */ new Map()), be.set(a, n);
        }
        Aa(
          t,
          e,
          l
        );
        break;
      default:
        Aa(
          t,
          e,
          l
        );
    }
  }
  function xv(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function gu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          Zt = a, Nv(
            a,
            t
          );
        }
      xv(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        jv(t), t = t.sibling;
  }
  function jv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        gu(t), t.flags & 2048 && Vl(9, t, t.return);
        break;
      case 3:
        gu(t);
        break;
      case 12:
        gu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Ki(t)) : gu(t);
        break;
      default:
        gu(t);
    }
  }
  function Ki(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          Zt = a, Nv(
            a,
            t
          );
        }
      xv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Vl(8, e, e.return), Ki(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Ki(e));
          break;
        default:
          Ki(e);
      }
      t = t.sibling;
    }
  }
  function Nv(t, e) {
    for (; Zt !== null; ) {
      var l = Zt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Vl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Pn(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Zt = a;
      else
        t: for (l = t; Zt !== null; ) {
          a = Zt;
          var n = a.sibling, u = a.return;
          if (mv(a), a === l) {
            Zt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Zt = n;
            break t;
          }
          Zt = u;
        }
    }
  }
  var Wg = {
    getCacheForType: function(t) {
      var e = Jt(Ut), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return Jt(Ut).controller.signal;
    }
  }, Ig = typeof WeakMap == "function" ? WeakMap : Map, mt = 0, Nt = null, lt = null, nt = 0, _t = 0, Se = null, Jl = !1, sn = !1, gf = !1, Sl = 0, Mt = 0, $l = 0, Ca = 0, Ji = 0, Te = 0, fn = 0, yu = null, re = null, yf = !1, $i = 0, Ev = 0, ki = 1 / 0, Fi = null, kl = null, Dt = 0, Ge = null, Da = null, al = 0, _f = 0, pf = null, zv = null, rn = null, on = null, dn = null, _u = 0, Wi = null;
  function xe() {
    return (mt & 2) !== 0 && nt !== 0 ? nt & -nt : L.T !== null ? Cf() : Cr();
  }
  function Av() {
    if (Te === 0)
      if ((nt & 536870912) === 0 || P) {
        var t = Vu;
        Vu <<= 1, (Vu & 3932160) === 0 && (Vu = 262144), Te = t;
      } else Te = 536870912;
    return t = $t.current, t !== null && (t.flags |= 32), Te;
  }
  function vn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = sm(
        ol(t.memoizedProps, l)
      )), on === null && (on = []), on.push(e.bind(null, a));
    }
  }
  function oe(t, e, l) {
    (t === Nt && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null) && (mn(t, 0), Fl(
      t,
      nt,
      Te,
      !1
    )), Yn(t, l), ((mt & 2) === 0 || t !== Nt) && (t === Nt && ((mt & 2) === 0 && (Ca |= l), Mt === 4 && Fl(
      t,
      nt,
      Te,
      !1
    )), nl(t));
  }
  function Cv(t, e, l) {
    if ((mt & 6) !== 0) throw Error(r(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Bn(t, e), n = a ? ey(t, e) : Sf(t, e, !0), u = a;
    do {
      if (n === 0) {
        sn && !a && Fl(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Pg(l)) {
          n = Sf(t, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            e = i;
            t: {
              var f = t;
              n = yu;
              var d = f.current.memoizedState.isDehydrated;
              if (d && (mn(f, i).flags |= 256), i = Sf(
                f,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (gf && !d) {
                  f.errorRecoveryDisabledLanes |= u, Ca |= u, n = 4;
                  break t;
                }
                u = re, re = n, u !== null && (re === null ? re = u : re.push.apply(
                  re,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          mn(t, 0), Fl(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              Fl(
                a,
                e,
                Te,
                !Jl
              );
              break t;
            case 2:
              re = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (n = $i + 300 - me(), 10 < n)) {
            if (Fl(
              a,
              e,
              Te,
              !Jl
            ), Ju(a, 0, !0) !== 0) break t;
            al = e, a.timeoutHandle = Lf(
              Dv.bind(
                null,
                a,
                l,
                re,
                Fi,
                yf,
                e,
                Te,
                Ca,
                fn,
                Jl,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          Dv(
            a,
            l,
            re,
            Fi,
            yf,
            e,
            Te,
            Ca,
            fn,
            Jl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    nl(t);
  }
  function Dv(t, e, l, a, n, u, i, f, d, b, j, z, y, T) {
    t.timeoutHandle = -1;
    var R = e.subtreeFlags, Y = (u & 335544064) === u;
    if (z = null, (Y || R & 8192 || (R & 16785408) === 16785408) && (z = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: $e
    }, be = null, Tv(
      e,
      u,
      z
    ), Y && (R = z, Y = t.containerInfo, Y = (Y.nodeType === 9 ? Y : Y.ownerDocument).__reactViewTransition, Y != null && (R.count++, R.waitingForViewTransition = !0, R = Eu.bind(R), Y.finished.then(R, R))), R = (u & 62914560) === u ? $i - me() : (u & 4194048) === u ? Ev - me() : 0, R = a0(
      z,
      R
    ), R !== null)) {
      al = u, t.cancelPendingCommit = R(
        Bv.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          f,
          d,
          b,
          j,
          z,
          null,
          y,
          T
        )
      ), Fl(t, u, i, !b);
      return;
    }
    Bv(
      t,
      e,
      u,
      l,
      a,
      n,
      i,
      f,
      d,
      b,
      j,
      z
    );
  }
  function Pg(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!_e(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Fl(t, e, l, a) {
    e = jr(t, e), e &= ~Ji, e &= ~Ca, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - ge(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && Er(t, l, e);
  }
  function Ii() {
    return (mt & 6) === 0 ? (pu(0), !1) : !0;
  }
  function bf() {
    if (lt !== null) {
      if (_t === 0)
        var t = lt.return;
      else
        t = lt, hl = ya = null, zs(t), Pa = null, lu = 0, t = lt;
      for (; t !== null; )
        Pd(t.alternate, t), t = t.return;
      lt = null;
    }
  }
  function mn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, xy(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), al = 0, bf(), Nt = t, lt = l = vl(t.current, null), nt = e, _t = 0, Se = null, Jl = !1, sn = Bn(t, e), gf = !1, fn = Te = Ji = Ca = $l = Mt = 0, re = yu = null, yf = !1, Sl = jr(t, e), ii(), l;
  }
  function Ov(t, e) {
    W = null, L.H = Oi, e === Ia || e === yi ? (e = Bo(), _t = 3) : e === ms ? (e = Bo(), _t = 4) : _t = e === Xs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Se = e, lt === null && (Mt = 1, Mi(
      t,
      Ce(e, t.current)
    ));
  }
  function Mv() {
    var t = $t.current;
    return t === null ? !0 : (nt & 4194048) === nt ? Pt === null : (nt & 62914560) === nt || (nt & 536870912) !== 0 ? t === Pt : !1;
  }
  function wv() {
    var t = L.H;
    return L.H = Oi, t === null ? Oi : t;
  }
  function Rv() {
    var t = L.A;
    return L.A = Wg, t;
  }
  function Pi() {
    Mt = 4, Jl || (nt & 4194048) !== nt && $t.current !== null || (sn = !0), ($l & 134217727) === 0 && (Ca & 134217727) === 0 || Nt === null || Fl(
      Nt,
      nt,
      Te,
      !1
    );
  }
  function Sf(t, e, l) {
    var a = mt;
    mt |= 2;
    var n = wv(), u = Rv();
    (Nt !== t || nt !== e) && (Fi = null, mn(t, e)), e = !1;
    var i = Mt;
    t: do
      try {
        if (_t !== 0 && lt !== null) {
          var f = lt, d = Se;
          switch (_t) {
            case 8:
              bf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              $t.current === null && (e = !0);
              var b = _t;
              if (_t = 0, Se = null, hn(t, f, d, b), l && sn) {
                i = 0;
                break t;
              }
              break;
            default:
              b = _t, _t = 0, Se = null, hn(t, f, d, b);
          }
        }
        ty(), i = Mt;
        break;
      } catch (j) {
        Ov(t, j);
      }
    while (!0);
    return e && t.shellSuspendCounter++, hl = ya = null, mt = a, L.H = n, L.A = u, lt === null && (Nt = null, nt = 0, ii()), i;
  }
  function ty() {
    for (; lt !== null; ) Uv(lt);
  }
  function ey(t, e) {
    var l = mt;
    mt |= 2;
    var a = wv(), n = Rv();
    Nt !== t || nt !== e ? (Fi = null, ki = me() + 500, mn(t, e)) : sn = Bn(
      t,
      e
    );
    t: do
      try {
        if (_t !== 0 && lt !== null) {
          e = lt;
          var u = Se;
          e: switch (_t) {
            case 1:
              _t = 0, Se = null, hn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Ho(u)) {
                _t = 0, Se = null, Hv(e);
                break;
              }
              e = function() {
                _t !== 2 && _t !== 9 || Nt !== t || (_t = 7), nl(t);
              }, u.then(e, e);
              break t;
            case 3:
              _t = 7;
              break t;
            case 4:
              _t = 5;
              break t;
            case 7:
              Ho(u) ? (_t = 0, Se = null, Hv(e)) : (_t = 0, Se = null, hn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (lt.tag) {
                case 26:
                  i = lt.memoizedState;
                case 5:
                case 27:
                  var f = lt;
                  if (i ? zm(i) : f.stateNode.complete) {
                    _t = 0, Se = null;
                    var d = f.sibling;
                    if (d !== null) lt = d;
                    else {
                      var b = f.return;
                      b !== null ? (lt = b, tc(b)) : lt = null;
                    }
                    break e;
                  }
              }
              _t = 0, Se = null, hn(t, e, u, 5);
              break;
            case 6:
              _t = 0, Se = null, hn(t, e, u, 6);
              break;
            case 8:
              bf(), Mt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        ly();
        break;
      } catch (j) {
        Ov(t, j);
      }
    while (!0);
    return hl = ya = null, L.H = a, L.A = n, mt = l, lt !== null ? 0 : (Nt = null, nt = 0, ii(), Mt);
  }
  function ly() {
    for (; lt !== null && !ph(); )
      Uv(lt);
  }
  function Uv(t) {
    var e = Wd(t.alternate, t, Sl);
    t.memoizedProps = t.pendingProps, e === null ? tc(t) : lt = e;
  }
  function Hv(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Zd(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          nt
        );
        break;
      case 11:
        e = Zd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          nt
        );
        break;
      case 5:
        zs(e);
        var a = e;
        a === Xt && (P ? (di(a), a.tag === 5 && a.stateNode != null && (zt = a.stateNode)) : (di(a), P = !0));
      default:
        Pd(l, e), e = lt = No(e, Sl), e = Wd(l, e, Sl);
    }
    t.memoizedProps = t.pendingProps, e === null ? tc(t) : lt = e;
  }
  function hn(t, e, l, a) {
    hl = ya = null, zs(e), Pa = null, lu = 0;
    var n = e.return;
    try {
      if (Qg(
        t,
        n,
        e,
        l,
        nt
      )) {
        Mt = 1, Mi(
          t,
          Ce(l, t.current)
        ), lt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw lt = n, u;
      Mt = 1, Mi(
        t,
        Ce(l, t.current)
      ), lt = null;
      return;
    }
    e.flags & 32768 ? (P || a === 1 ? t = !0 : sn || (nt & 536870912) !== 0 ? t = !1 : (Jl = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = $t.current, a !== null && a.tag === 13 && (a.flags |= 16384))), qv(e, t)) : tc(e);
  }
  function tc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        qv(
          e,
          Jl
        );
        return;
      }
      t = e.return;
      var l = Jg(
        e.alternate,
        e,
        Sl
      );
      if (l !== null) {
        lt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        lt = e;
        return;
      }
      lt = e = t;
    } while (e !== null);
    Mt === 0 && (Mt = 5);
  }
  function qv(t, e) {
    do {
      var l = $g(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, lt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        lt = t;
        return;
      }
      lt = t = l;
    } while (t !== null);
    Mt = 6, lt = null;
  }
  function Bv(t, e, l, a, n, u, i, f, d, b, j, z) {
    t.cancelPendingCommit = null;
    do
      ec();
    while (Dt !== 0);
    if ((mt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === Nt && (lt = Nt = null, nt = 0), Da = e, Ge = t, al = l, pf = n, zv = a, ay(
        t,
        e,
        l,
        i,
        f,
        d,
        z
      );
    }
  }
  function ay(t, e, l, a, n, u, i) {
    var f = e.lanes | e.childLanes;
    if (_f = f, f |= es, Ch(
      t,
      l,
      f,
      a,
      n,
      u
    ), on = null, (l & 335544064) === l ? (dn = Og(t), a = 10262) : (dn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, fy(Qu, function() {
      return Nf(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Li = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = L.T, L.T = null, n = k.p, k.p = 2, u = mt, mt |= 4;
      try {
        kg(t, e, l);
      } finally {
        mt = u, k.p = n, L.T = a;
      }
    }
    Dt = 1, Li ? rn = Cy(
      i,
      t.containerInfo,
      dn,
      Tf,
      xf,
      uy,
      jf,
      Nf,
      ny
    ) : (Tf(), xf(), jf());
  }
  function ny(t) {
    if (Dt !== 0) {
      var e = Ge.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function uy() {
    Dt === 3 && (Dt = 0, bv(Da, Ge), Dt = 4);
  }
  function Tf() {
    if (Dt === 1) {
      Dt = 0;
      var t = Ge, e = Da, l = al, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = L.T, L.T = null;
        var n = k.p;
        k.p = 2;
        var u = mt;
        mt |= 4;
        try {
          mu = Qi = !1, _v(e, t, l), l = qf;
          var i = ho(t.containerInfo), f = l.focusedElem, d = l.selectionRange;
          if (i !== f && f && f.ownerDocument && mo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (d !== null && Fc(f)) {
              var b = d.start, j = d.end;
              if (j === void 0 && (j = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  j,
                  f.value.length
                );
              else {
                var z = f.ownerDocument || document, y = z && z.defaultView || window;
                if (y.getSelection) {
                  var T = y.getSelection(), R = f.textContent.length, Y = Math.min(d.start, R), I = d.end === void 0 ? Y : Math.min(d.end, R);
                  !T.extend && Y > I && (i = I, I = Y, Y = i);
                  var p = vo(
                    f,
                    Y
                  ), m = vo(
                    f,
                    I
                  );
                  if (p && m && (T.rangeCount !== 1 || T.anchorNode !== p.node || T.anchorOffset !== p.offset || T.focusNode !== m.node || T.focusOffset !== m.offset)) {
                    var S = z.createRange();
                    S.setStart(p.node, p.offset), T.removeAllRanges(), Y > I ? (T.addRange(S), T.extend(m.node, m.offset)) : (S.setEnd(m.node, m.offset), T.addRange(S));
                  }
                }
              }
            }
            for (z = [], T = f; T = T.parentNode; )
              T.nodeType === 1 && z.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < z.length; f++) {
              var E = z[f];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          xn = !!Hf, qf = Hf = null;
        } finally {
          mt = u, k.p = n, L.T = a;
        }
      }
      t.current = e, Dt = 2;
    }
  }
  function xf() {
    if (Dt === 2) {
      Dt = 0;
      var t = Ge, e = Da, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = L.T, L.T = null;
        var a = k.p;
        k.p = 2;
        var n = mt;
        mt |= 4;
        try {
          dv(t, e.alternate, e);
        } finally {
          mt = n, k.p = a, L.T = l;
        }
      }
      Dt = 3;
    }
  }
  function jf() {
    if (Dt === 4 || Dt === 3) {
      Dt = 0;
      var t = rn;
      rn = null, bh();
      var e = Ge, l = Da, a = al, n = zv, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? Dt = 5 : (Dt = 0, Da = Ge = null, Yv(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (kl = null), Mc(a), l = l.stateNode, he && typeof he.onCommitFiberRoot == "function")
        try {
          he.onCommitFiberRoot(
            qn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = L.T, u = k.p, k.p = 2, L.T = null;
        try {
          for (var i = e.onRecoverableError, f = 0; f < n.length; f++) {
            var d = n[f];
            i(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          L.T = l, k.p = u;
        }
      }
      if (n = on, i = dn, dn = null, n !== null && (on = null, i === null && (i = []), t !== null))
        for (d = 0; d < n.length; d++)
          l = (0, n[d])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (al & 3) !== 0 && ec(), nl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === Wi ? _u++ : (_u = 0, Wi = e) : (_u = 0, Wi = null), pu(0);
    }
  }
  function Yv(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Pn(e)));
  }
  function ec() {
    return rn !== null && (rn.skipTransition(), rn = null), Tf(), xf(), jf(), Nf();
  }
  function Nf() {
    if (Dt !== 5) return !1;
    var t = Ge, e = _f;
    _f = 0;
    var l = Mc(al), a = L.T, n = k.p;
    try {
      k.p = 32 > l ? 32 : l, L.T = null, l = pf, pf = null;
      var u = Ge, i = al;
      if (Dt = 0, Da = Ge = null, al = 0, (mt & 6) !== 0) throw Error(r(331));
      var f = mt;
      if (mt |= 4, jv(u.current), Sv(
        u,
        u.current,
        i,
        l
      ), mt = f, pu(0, !1), he && typeof he.onPostCommitFiberRoot == "function")
        try {
          he.onPostCommitFiberRoot(qn, u);
        } catch {
        }
      return !0;
    } finally {
      k.p = n, L.T = a, Yv(t, e);
    }
  }
  function Lv(t, e, l) {
    e = Ce(l, e), e = Gs(t.stateNode, e, 2), t = Gl(t, e, 2), t !== null && (Yn(t, 2), nl(t));
  }
  function pt(t, e, l) {
    if (t.tag === 3)
      Lv(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Lv(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (kl === null || !kl.has(a))) {
            t = Ce(l, t), l = Hd(2), a = Gl(e, l, 2), a !== null && (qd(
              l,
              a,
              e,
              t
            ), Yn(a, 2), nl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Ef(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Ig();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (gf = !0, n.add(l), t = iy.bind(null, t, e, l), e.then(t, t));
  }
  function iy(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Nt === t && (nt & l) === l && ((Mt === 4 || Mt === 3 && (nt & 62914560) === nt && 300 > me() - $i) && (mt & 2) === 0 ? mn(t, 0) : Ji |= l, fn === nt && (fn = 0)), nl(t);
  }
  function Gv(t, e) {
    e === 0 && (e = Nr()), t = ma(t, e), t !== null && (Yn(t, e), nl(t));
  }
  function cy(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Gv(t, l);
  }
  function sy(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(e), Gv(t, l);
  }
  function fy(t, e) {
    return Ac(t, e);
  }
  var gn = null, yn = null, zf = !1, lc = !1, Af = !1, Wl = 0;
  function nl(t) {
    t !== yn && t.next === null && (yn === null ? gn = yn = t : yn = yn.next = t), lc = !0, zf || (zf = !0, oy());
  }
  function pu(t, e) {
    if (!Af && lc) {
      Af = !0;
      do
        for (var l = !1, a = gn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - ge(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Vv(a, u));
          } else
            u = nt, u = Ju(
              a,
              a === Nt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Bn(a, u) || (l = !0, Vv(a, u));
          a = a.next;
        }
      while (l);
      Af = !1;
    }
  }
  function ry() {
    Xv();
  }
  function Xv() {
    lc = zf = !1;
    var t = 0;
    Wl !== 0 && Ty() && (t = Wl);
    for (var e = me(), l = null, a = gn; a !== null; ) {
      var n = a.next, u = Qv(a, e);
      u === 0 ? (a.next = null, l === null ? gn = n : l.next = n, n === null && (yn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (lc = !0)), a = n;
    }
    Dt !== 0 && Dt !== 5 || pu(t), Wl !== 0 && (Wl = 0);
  }
  function Qv(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - ge(u), f = 1 << i, d = n[i];
      d === -1 ? ((f & l) === 0 || (f & a) !== 0) && (n[i] = Ah(f, e)) : d <= e && (t.expiredLanes |= f), u &= ~f;
    }
    if (e = Nt, l = nt, l = Ju(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (_t === 2 || _t === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Cc(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Bn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && Cc(a), Mc(l)) {
        case 2:
        case 8:
          l = Tr;
          break;
        case 32:
          l = Qu;
          break;
        case 268435456:
          l = xr;
          break;
        default:
          l = Qu;
      }
      return a = Zv.bind(null, t), l = Ac(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && Cc(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Zv(t, e) {
    if (Dt !== 0 && Dt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (ec() && t.callbackNode !== l)
      return null;
    var a = nt;
    return a = Ju(
      t,
      t === Nt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Cv(t, a, e), Qv(t, me()), t.callbackNode != null && t.callbackNode === l ? Zv.bind(null, t) : null);
  }
  function Vv(t, e) {
    if (ec()) return null;
    Cv(t, e, !0);
  }
  function oy() {
    jy(function() {
      (mt & 6) !== 0 ? Ac(
        Sr,
        ry
      ) : Xv();
    });
  }
  function Cf() {
    if (Wl === 0) {
      var t = ba;
      t === 0 && (t = Zu, Zu <<= 1, (Zu & 261888) === 0 && (Zu = 256)), Wl = t;
    }
    return Wl;
  }
  function Kv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Iu(t);
  }
  function dy(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Kv(
        (n[ie] || null).action
      ), i = a.submitter;
      i && (e = (e = i[ie] || null) ? Kv(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var f = new li(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Wl !== 0) {
                  var d = new FormData(n, i);
                  Hs(
                    l,
                    {
                      pending: !0,
                      data: d,
                      method: n.method,
                      action: u
                    },
                    null,
                    d
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), d = new FormData(n, i), Hs(
                  l,
                  {
                    pending: !0,
                    data: d,
                    method: n.method,
                    action: u
                  },
                  u,
                  d
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Df = 0; Df < ts.length; Df++) {
    var Of = ts[Df], vy = Of.toLowerCase(), my = Of[0].toUpperCase() + Of.slice(1);
    qe(
      vy,
      "on" + my
    );
  }
  qe(_o, "onAnimationEnd"), qe(po, "onAnimationIteration"), qe(bo, "onAnimationStart"), qe("dblclick", "onDoubleClick"), qe("focusin", "onFocus"), qe("focusout", "onBlur"), qe(xg, "onTransitionRun"), qe(jg, "onTransitionStart"), qe(Ng, "onTransitionCancel"), qe(So, "onTransitionEnd"), Ba("onMouseEnter", ["mouseout", "mouseover"]), Ba("onMouseLeave", ["mouseout", "mouseover"]), Ba("onPointerEnter", ["pointerout", "pointerover"]), Ba("onPointerLeave", ["pointerout", "pointerover"]), oa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), oa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), oa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), oa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), oa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), oa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var bu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), hy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(bu)
  );
  function Jv(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], d = f.instance, b = f.currentTarget;
            if (f = f.listener, d !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (j) {
              ui(j);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], d = f.instance, b = f.currentTarget, f = f.listener, d !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (j) {
              ui(j);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function at(t, e) {
    var l = e[Or];
    l === void 0 && (l = e[Or] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || ($v(e, t, 2, !1), l.add(a));
  }
  function Mf(t, e, l) {
    var a = 0;
    e && (a |= 4), $v(
      l,
      t,
      a,
      e
    );
  }
  var ac = "_reactListening" + Math.random().toString(36).slice(2);
  function wf(t) {
    if (!t[ac]) {
      t[ac] = !0, Rr.forEach(function(l) {
        l !== "selectionchange" && (hy.has(l) || Mf(l, !1, t), Mf(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ac] || (e[ac] = !0, Mf("selectionchange", !1, e));
    }
  }
  function $v(t, e, l, a) {
    switch (qm(e)) {
      case 2:
        var n = c0;
        break;
      case 8:
        n = s0;
        break;
      default:
        n = Pf;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Lc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Rf(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = ra(f), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Jr(function() {
      var b = u, j = Bc(l), z = [];
      t: {
        var y = To.get(t);
        if (y !== void 0) {
          var T = li, R = t;
          switch (t) {
            case "keypress":
              if (ti(l) === 0) break t;
            case "keydown":
            case "keyup":
              T = Ph;
              break;
            case "focusin":
              R = "focus", T = Zc;
              break;
            case "focusout":
              R = "blur", T = Zc;
              break;
            case "beforeblur":
            case "afterblur":
              T = Zc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              T = Fr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = Gh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = ng;
              break;
            case _o:
            case po:
            case bo:
              T = Zh;
              break;
            case So:
              T = ig;
              break;
            case "scroll":
            case "scrollend":
              T = Yh;
              break;
            case "wheel":
              T = sg;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = Kh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = Ir;
              break;
            case "submit":
              T = lg;
              break;
            case "toggle":
            case "beforetoggle":
              T = rg;
          }
          var Y = (e & 4) !== 0, I = !Y && (t === "scroll" || t === "scrollend"), p = Y ? y !== null ? y + "Capture" : null : y;
          Y = [];
          for (var m = b, S; m !== null; ) {
            var E = m;
            if (S = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || S === null || p === null || (E = Xn(m, p), E != null && Y.push(
              Su(m, E, S)
            )), I) break;
            m = m.return;
          }
          0 < Y.length && (y = new T(
            y,
            R,
            null,
            l,
            j
          ), z.push({ event: y, listeners: Y }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (T = t === "mouseover" || t === "pointerover", y = t === "mouseout" || t === "pointerout", T && l !== qc && (R = l.relatedTarget || l.fromElement) && (ra(R) || R[Ua]))
            break t;
          (y || T) && (R = j.window === j ? j : (T = j.ownerDocument) ? T.defaultView || T.parentWindow : window, y ? (T = l.relatedTarget || l.toElement, y = b, T = T ? ra(T) : null, T !== null && (I = _(T), Y = T.tag, T !== I || Y !== 5 && Y !== 27 && Y !== 6) && (T = null)) : (y = null, T = b), y !== T && (Y = Fr, E = "onMouseLeave", p = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (Y = Ir, E = "onPointerLeave", p = "onPointerEnter", m = "pointer"), I = y == null ? R : Gn(y), S = T == null ? R : Gn(T), R = new Y(
            E,
            m + "leave",
            y,
            l,
            j
          ), R.target = I, R.relatedTarget = S, E = null, ra(j) === b && (Y = new Y(
            p,
            m + "enter",
            T,
            l,
            j
          ), Y.target = S, Y.relatedTarget = I, E = Y), I = E, Y = y && T ? de(
            y,
            T,
            gy
          ) : null, y !== null && kv(
            z,
            R,
            y,
            Y,
            !1
          ), T !== null && I !== null && kv(
            z,
            I,
            T,
            Y,
            !0
          )));
        }
        t: {
          if (y = b ? Gn(b) : window, T = y.nodeName && y.nodeName.toLowerCase(), T === "select" || T === "input" && y.type === "file")
            var B = io;
          else if (no(y))
            if (co)
              B = bg;
            else {
              B = _g;
              var ut = yg;
            }
          else
            T = y.nodeName, !T || T.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? b && Hc(b.elementType) && (B = io) : B = pg;
          if (B && (B = B(t, b))) {
            uo(
              z,
              B,
              l,
              j
            );
            break t;
          }
          ut && ut(t, y, b);
        }
        switch (ut = b ? Gn(b) : window, t) {
          case "focusin":
            (no(ut) || ut.contentEditable === "true") && (Za = ut, Wc = b, Fn = null);
            break;
          case "focusout":
            Fn = Wc = Za = null;
            break;
          case "mousedown":
            Ic = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ic = !1, go(z, l, j);
            break;
          case "selectionchange":
            if (Tg) break;
          case "keydown":
          case "keyup":
            go(z, l, j);
        }
        var G;
        if (Kc)
          t: {
            switch (t) {
              case "compositionstart":
                var V = "onCompositionStart";
                break t;
              case "compositionend":
                V = "onCompositionEnd";
                break t;
              case "compositionupdate":
                V = "onCompositionUpdate";
                break t;
            }
            V = void 0;
          }
        else
          Qa ? lo(t, l) && (V = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (V = "onCompositionStart");
        V && (Pr && l.locale !== "ko" && (Qa || V !== "onCompositionStart" ? V === "onCompositionEnd" && Qa && (G = $r()) : (Ml = j, Gc = "value" in Ml ? Ml.value : Ml.textContent, Qa = !0)), ut = nc(b, V), 0 < ut.length && (V = new Wr(
          V,
          t,
          null,
          l,
          j
        ), z.push({ event: V, listeners: ut }), G ? V.data = G : (G = ao(l), G !== null && (V.data = G)))), (G = dg ? vg(t, l) : mg(t, l)) && (V = nc(b, "onBeforeInput"), 0 < V.length && (ut = new Wr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          j
        ), z.push({
          event: ut,
          listeners: V
        }), ut.data = G)), dy(
          z,
          t,
          b,
          l,
          j
        );
      }
      Jv(z, e);
    });
  }
  function Su(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function nc(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Xn(t, l), n != null && a.unshift(
        Su(t, n, u)
      ), n = Xn(t, e), n != null && a.push(
        Su(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function gy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function kv(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var f = l, d = f.alternate, b = f.stateNode;
      if (f = f.tag, d !== null && d === a) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (d = b, n ? (b = Xn(l, u), b != null && i.unshift(
        Su(l, b, d)
      )) : n || (b = Xn(l, u), b != null && i.push(
        Su(l, b, d)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var yy = /\r\n?/g, _y = /\u0000|\uFFFD/g;
  function Fv(t) {
    return (typeof t == "string" ? t : "" + t).replace(yy, `
`).replace(_y, "");
  }
  function Wv(t, e) {
    return e = Fv(e), Fv(t) === e;
  }
  function bt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || La(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && La(t, "" + a);
        else return;
        break;
      case "className":
        Wu(t, "class", a);
        break;
      case "tabIndex":
        Wu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Wu(t, l, a);
        break;
      case "style":
        Vr(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          Wu(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = Iu(a), t.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && bt(t, e, "name", n.name, n, null), bt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), bt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), bt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (bt(t, e, "encType", n.encType, n, null), bt(t, e, "method", n.method, n, null), bt(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = Iu(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = $e);
        return;
      case "onScroll":
        a != null && at("scroll", t);
        return;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(r(60));
            (u != null ? u.__html : void 0) !== l && (t.innerHTML = l);
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
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
          t.removeAttribute("xlink:href");
          break;
        }
        l = Iu(a), t.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
        break;
      case "popover":
        at("beforetoggle", t), at("toggle", t), Fu(t, "popover", a);
        break;
      case "xlinkActuate":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        fl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        fl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Fu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = qh.get(l) || l, Fu(t, l, a);
        else return;
    }
    rt = !0;
  }
  function Uf(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Vr(t, a, u);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(r(60));
            (u != null ? u.__html : void 0) !== l && (t.innerHTML = l);
          }
        }
        break;
      case "children":
        if (typeof a == "string") La(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          La(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && at("scroll", t);
        return;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = $e);
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
        if (!Ur.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[ie] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            rt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : Fu(t, l, a);
          }
        return;
    }
    rt = !0;
  }
  function Wt(t, e, l) {
    switch (e) {
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
        at("error", t), at("load", t);
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
                  throw Error(r(137, e));
                default:
                  bt(t, e, u, i, l, null);
              }
          }
        n && bt(t, e, "srcSet", l.srcSet, l, null), a && bt(t, e, "src", l.src, l, null);
        return;
      case "input":
        at("invalid", t);
        var f = u = i = n = null, d = null, b = null;
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
                  d = j;
                  break;
                case "defaultChecked":
                  b = j;
                  break;
                case "value":
                  u = j;
                  break;
                case "defaultValue":
                  f = j;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (j != null)
                    throw Error(r(137, e));
                  break;
                default:
                  bt(t, e, a, j, l, null);
              }
          }
        Gr(
          t,
          u,
          f,
          d,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        at("invalid", t), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (f = l[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                bt(t, e, n, f, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? Ya(t, !!a, e, !1) : l != null && Ya(t, !!a, l, !0);
        return;
      case "textarea":
        at("invalid", t), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (f = l[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(r(91));
                break;
              default:
                bt(t, e, i, f, l, null);
            }
        Qr(t, a, n, u);
        return;
      case "option":
        for (d in l)
          if (l.hasOwnProperty(d) && (a = l[d], a != null))
            switch (d) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                bt(t, e, d, a, l, null);
            }
        return;
      case "dialog":
        at("beforetoggle", t), at("toggle", t), at("cancel", t), at("close", t);
        break;
      case "iframe":
      case "object":
        at("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < bu.length; a++)
          at(bu[a], t);
        break;
      case "image":
        at("error", t), at("load", t);
        break;
      case "details":
        at("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        at("error", t), at("load", t);
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
                throw Error(r(137, e));
              default:
                bt(t, e, b, a, l, null);
            }
        return;
      default:
        if (Hc(e)) {
          for (j in l)
            l.hasOwnProperty(j) && (a = l[j], a !== void 0 && Uf(
              t,
              e,
              j,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (f in l)
      l.hasOwnProperty(f) && (a = l[f], a != null && bt(t, e, f, a, l, null));
  }
  var py = {};
  function by(t, e, l, a) {
    switch (e) {
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
        var n = null, u = null, i = null, f = null, d = null, b = null, j = null;
        for (T in l) {
          var z = l[T];
          if (l.hasOwnProperty(T) && z != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = z;
              default:
                a.hasOwnProperty(T) || bt(t, e, T, null, a, z);
            }
        }
        for (var y in a) {
          var T = a[y];
          if (z = l[y], a.hasOwnProperty(y) && (T != null || z != null))
            switch (y) {
              case "type":
                T !== z && (rt = !0), u = T;
                break;
              case "name":
                T !== z && (rt = !0), n = T;
                break;
              case "checked":
                T !== z && (rt = !0), b = T;
                break;
              case "defaultChecked":
                T !== z && (rt = !0), j = T;
                break;
              case "value":
                T !== z && (rt = !0), i = T;
                break;
              case "defaultValue":
                T !== z && (rt = !0), f = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(r(137, e));
                break;
              default:
                T !== z && bt(
                  t,
                  e,
                  y,
                  T,
                  a,
                  z
                );
            }
        }
        Rc(
          t,
          i,
          f,
          d,
          b,
          j,
          u,
          n
        );
        return;
      case "select":
        T = i = f = y = null;
        for (u in l)
          if (d = l[u], l.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = d;
              default:
                a.hasOwnProperty(u) || bt(
                  t,
                  e,
                  u,
                  null,
                  a,
                  d
                );
            }
        for (n in a)
          if (u = a[n], d = l[n], a.hasOwnProperty(n) && (u != null || d != null))
            switch (n) {
              case "value":
                u !== d && (rt = !0), y = u;
                break;
              case "defaultValue":
                u !== d && (rt = !0), f = u;
                break;
              case "multiple":
                u !== d && (rt = !0), i = u;
              default:
                u !== d && bt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  d
                );
            }
        e = f, l = i, a = T, y != null ? Ya(t, !!l, y, !1) : !!a != !!l && (e != null ? Ya(t, !!l, e, !0) : Ya(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        T = y = null;
        for (f in l)
          if (n = l[f], l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                bt(t, e, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (rt = !0), y = n;
                break;
              case "defaultValue":
                n !== u && (rt = !0), T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && bt(t, e, i, n, a, u);
            }
        Xr(t, y, T);
        return;
      case "option":
        for (var R in l)
          if (y = l[R], l.hasOwnProperty(R) && y != null && !a.hasOwnProperty(R))
            switch (R) {
              case "selected":
                t.selected = !1;
                break;
              default:
                bt(
                  t,
                  e,
                  R,
                  null,
                  a,
                  y
                );
            }
        for (d in a)
          if (y = a[d], T = l[d], a.hasOwnProperty(d) && y !== T && (y != null || T != null))
            switch (d) {
              case "selected":
                y !== T && (rt = !0), t.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                bt(
                  t,
                  e,
                  d,
                  y,
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
        for (var Y in l)
          y = l[Y], l.hasOwnProperty(Y) && y != null && !a.hasOwnProperty(Y) && bt(t, e, Y, null, a, y);
        for (b in a)
          if (y = a[b], T = l[b], a.hasOwnProperty(b) && y !== T && (y != null || T != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(r(137, e));
                break;
              default:
                bt(
                  t,
                  e,
                  b,
                  y,
                  a,
                  T
                );
            }
        return;
      default:
        if (Hc(e)) {
          for (var I in l)
            y = l[I], l.hasOwnProperty(I) && y !== void 0 && !a.hasOwnProperty(I) && Uf(
              t,
              e,
              I,
              void 0,
              a,
              y
            );
          for (j in a)
            y = a[j], T = l[j], !a.hasOwnProperty(j) || y === T || y === void 0 && T === void 0 || Uf(
              t,
              e,
              j,
              y,
              a,
              T
            );
          return;
        }
    }
    for (var p in l)
      y = l[p], l.hasOwnProperty(p) && y != null && !a.hasOwnProperty(p) && bt(t, e, p, null, a, y);
    for (z in a)
      y = a[z], T = l[z], !a.hasOwnProperty(z) || y === T || y == null && T == null || bt(t, e, z, y, a, T);
  }
  function Iv(t) {
    switch (t) {
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
  function Sy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Iv(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < l.length; a++) {
            var d = l[a], b = d.startTime;
            if (b > f) break;
            var j = d.transferSize, z = d.initiatorType;
            j && Iv(z) && (d = d.responseEnd, i += j * (d < f ? 1 : (f - b) / (d - b)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Hf = null, qf = null;
  function Tu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Pv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function tm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function em(t, e, l, a) {
    return l = Tu(
      l
    ).createElement(t), l[Kt] = a, l[ie] = e, Wt(l, t, e), Gt(l), l;
  }
  function Bf(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Yf = null;
  function Ty() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Yf ? !1 : (Yf = t, !0) : (Yf = null, !1);
  }
  var Lf = typeof setTimeout == "function" ? setTimeout : void 0, xy = typeof clearTimeout == "function" ? clearTimeout : void 0, lm = typeof Promise == "function" ? Promise : void 0, am = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Lf, jy = typeof queueMicrotask == "function" ? queueMicrotask : typeof lm < "u" ? function(t) {
    return lm.resolve(null).then(t).catch(Ny);
  } : Lf;
  function Ny(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Il(t) {
    return t === "head";
  }
  function nm(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), jn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          $f(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, $f(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[Ln] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && $f(t.ownerDocument.body);
      l = n;
    } while (l);
    jn(e);
  }
  function um(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = a;
    } while (l);
  }
  function im(t, e, l) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, l != null && (t.style.viewTransitionClass = l), l = getComputedStyle(t), l.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var a = 1;
      else
        for (var n = a = 0; n < e.length; n++) {
          var u = e[n];
          0 < u.width && 0 < u.height && a++;
        }
      a === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + l.paddingTop, t.marginBottom = "-" + l.paddingBottom);
    }
  }
  function cm(t, e) {
    t = t.style, e = e.style;
    var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function Ey(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Gf(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return Ey(e, l, t);
  }
  function zy(t) {
    return t.documentElement.clientHeight;
  }
  function Ay(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Cy(t, e, l, a, n, u, i, f, d) {
    var b = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var j = b.startViewTransition({
        update: function() {
          var y = b.defaultView, T = y.navigation && y.navigation.transition, R = b.fonts.status;
          a();
          var Y = [];
          if (R === "loaded" && (zy(b), b.fonts.status === "loading" && Y.push(b.fonts.ready)), R = Y.length, t !== null)
            for (var I = t.suspenseyImages, p = 0, m = 0; m < I.length; m++) {
              var S = I[m];
              if (!S.complete) {
                var E = S.getBoundingClientRect();
                if (0 < E.bottom && 0 < E.right && E.top < y.innerHeight && E.left < y.innerWidth) {
                  if (p += Am(S), p > cc) {
                    Y.length = R;
                    break;
                  }
                  S = new Promise(
                    Ay.bind(S)
                  ), Y.push(S);
                }
              }
            }
          if (0 < Y.length)
            return y = Promise.race([
              Promise.all(Y),
              new Promise(function(B) {
                return setTimeout(B, 500);
              })
            ]).then(n, n), (T ? Promise.allSettled([T.finished, y]) : y).then(u, u);
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
      var z = [];
      return j.ready.then(
        function() {
          for (var y = b.documentElement.getAnimations({
            subtree: !0
          }), T = 0; T < y.length; T++) {
            var R = y[T], Y = R.effect, I = Y.pseudoElement;
            if (I != null && I.startsWith("::view-transition")) {
              z.push(R), R = Y.getKeyframes();
              for (var p = I = void 0, m = !0, S = 0; S < R.length; S++) {
                var E = R[S], B = E.width;
                if (I === void 0) I = B;
                else if (I !== B) {
                  m = !1;
                  break;
                }
                if (B = E.height, p === void 0) p = B;
                else if (p !== B) {
                  m = !1;
                  break;
                }
                delete E.width, delete E.height, E.transform === "none" && delete E.transform;
              }
              m && I !== void 0 && p !== void 0 && (Y.setKeyframes(R), m = getComputedStyle(
                Y.target,
                Y.pseudoElement
              ), m.width !== I || m.height !== p) && (m = R[0], m.width = I, m.height = p, m = R[R.length - 1], m.width = I, m.height = p, Y.setKeyframes(R));
            }
          }
          i();
        },
        function(y) {
          b.__reactViewTransition === j && (b.__reactViewTransition = null);
          try {
            if (typeof y == "object" && y !== null)
              switch (y.name) {
                case "InvalidStateError":
                  (y.message === "View transition was skipped because document visibility state is hidden." || y.message === "Skipping view transition because document visibility state has become hidden." || y.message === "Skipping view transition because viewport size changed." || y.message === "Transition was aborted because of invalid state") && (y = null);
              }
            y !== null && d(y);
          } finally {
            a(), n(), i();
          }
        }
      ), j.finished.finally(function() {
        for (var y = 0; y < z.length; y++)
          z[y].cancel();
        b.__reactViewTransition === j && (b.__reactViewTransition = null), f();
      }), j;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Oa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Oa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : et({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Oa.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, Oa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function sm(t) {
    return {
      name: t,
      group: new Oa("group", t),
      imagePair: new Oa("image-pair", t),
      old: new Oa("old", t),
      new: new Oa("new", t)
    };
  }
  function je(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  je.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (rm(u, t, e, l) === -1) {
        var i = this, f = e;
        l != null && typeof l != "boolean" && l.once === !0 && (f = function(d) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, d) : e.handleEvent(d);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = _n(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: f,
          cleanup: n
        }), x(
          this._fragmentFiber.child,
          !1,
          Dy,
          t,
          f,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function Dy(t, e, l, a) {
    return tt(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  je.prototype.removeEventListener = function(t, e, l) {
    var a = this._eventListeners;
    if (a !== null && (e = rm(
      a,
      t,
      e,
      l
    ), e !== -1)) {
      var n = a[e];
      l = n.attachedListener;
      var u = n.cleanup;
      n = _n(n.optionsOrUseCapture), x(
        this._fragmentFiber.child,
        !1,
        Oy,
        t,
        l,
        n
      ), a.splice(e, 1), u !== null && u();
    }
  };
  function Oy(t, e, l, a) {
    return tt(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function _n(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function fm(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function rm(t, e, l, a) {
    if (t.length === 0) return -1;
    a = fm(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && fm(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  je.prototype.dispatchEvent = function(t) {
    var e = N(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = tt(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            _n(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            _n(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, je.prototype.focus = function(t) {
    x(
      this._fragmentFiber.child,
      !0,
      om,
      t,
      void 0,
      void 0
    );
  };
  function om(t, e) {
    return t.tag === 6 ? !1 : (t = tt(t), Qy(t, e));
  }
  je.prototype.focusLast = function(t) {
    var e = [];
    x(
      this._fragmentFiber.child,
      !0,
      Xf,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !om(e[l], t); l--) ;
  };
  function Xf(t, e) {
    return e.push(t), !1;
  }
  je.prototype.blur = function() {
    var t = N(
      this._fragmentFiber
    );
    t !== null && (t = tt(t), t = Tu(t).activeElement, t !== null && x(
      this._fragmentFiber.child,
      !1,
      My,
      t,
      void 0,
      void 0
    ));
  };
  function My(t, e) {
    return t.tag === 6 ? !1 : (t = tt(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  je.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), x(
      this._fragmentFiber.child,
      !1,
      wy,
      t,
      void 0,
      void 0
    );
  };
  function wy(t, e) {
    return t.tag === 6 || (t = tt(t), e.observe(t)), !1;
  }
  je.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), x(
        this._fragmentFiber.child,
        !1,
        Ry,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < Xe.length; l++) {
        var a = Xe[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : Xe[e++] = a;
      }
      Xe.length = e;
    }
  };
  function Ry(t, e) {
    return t.tag === 6 || (t = tt(t), e.unobserve(t)), !1;
  }
  var Xe = [], Qf = !1;
  function Uy(t, e, l) {
    Xe.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Qf || (Qf = !0, Zy(function() {
      Qf = !1;
      var a = Xe;
      Xe = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  je.prototype.getClientRects = function() {
    var t = [];
    return x(
      this._fragmentFiber.child,
      !1,
      Hy,
      t,
      void 0,
      void 0
    ), t;
  };
  function Hy(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = tt(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  je.prototype.getRootNode = function(t) {
    var e = N(
      this._fragmentFiber
    );
    return e === null ? this : tt(e).getRootNode(t);
  }, je.prototype.compareDocumentPosition = function(t) {
    var e = N(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    x(
      this._fragmentFiber.child,
      !1,
      Xf,
      l,
      void 0,
      void 0
    );
    var a = tt(e);
    if (l.length === 0) {
      if (l = a, H(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (l = e);
      }
      e = this._fragmentFiber;
      var n = a = l.compareDocumentPosition(t);
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = $(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = tt(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = tt(l[0]), n = tt(l[l.length - 1]);
    var u = H(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), f = n.compareDocumentPosition(t), d = i & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || d || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || qy(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function qy(t, e, l, a, n) {
    var u = ra(n);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (l = !!u)
        t: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === e || u.alternate === e)) {
              l = !0;
              break t;
            }
            u = u.return;
          }
          l = !1;
        }
      return l;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = n.ownerDocument, n === u || n === u.documentElement || n === u.body;
      t: {
        for (u = e, e = N(e); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== e && u.alternate !== e)) {
            u = !0;
            break t;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = de(
      l,
      u,
      Ze
    ), e === null ? e = !1 : (x(
      e,
      !0,
      ia,
      u,
      l
    ), u = wt, wt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = de(
      a,
      u,
      Ze
    ), e === null ? e = !1 : (x(
      e,
      !0,
      Qe,
      u,
      a
    ), u = wt, ot = wt = null, e = u !== null)), e) : !1;
  }
  function dm(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  je.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    x(
      this._fragmentFiber.child,
      !1,
      Xf,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = $(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || N(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = tt(a), dm(t, l);
        return;
      }
      if (a = tt(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = tt(n), dm(n, l)) : tt(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function By(t, e) {
    return t = tt(t), vm(t, e), !1;
  }
  function vm(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function mm(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.addEventListener(
          n.type,
          n.attachedListener,
          _n(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, f = 0; f < Xe.length; f++) {
        var d = Xe[f];
        (d.fragmentInstance !== e || d.observer !== u || d.instance !== t) && (Xe[i++] = d);
      }
      Xe.length = i, u.observe(t);
    }), vm(t, e));
  }
  function Yy(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          _n(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? Uy(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Zf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zf(l), ku(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Ly(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Ln])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Re(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Gy(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Re(t.nextSibling), t === null)) return null;
    return t;
  }
  function hm(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Re(t.nextSibling), t === null)) return null;
    return t;
  }
  function Vf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Kf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Xy(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Re(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Jf = null;
  function gm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return Re(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function ym(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Qy(t, e) {
    function l() {
      a = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var a = !1;
    try {
      t.ownerDocument.addEventListener("focus", l, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", l, !0);
    }
    return a;
  }
  function Zy(t) {
    am(function() {
      am(function(e) {
        return t(e);
      });
    });
  }
  function _m(t, e, l) {
    switch (e = Tu(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function pm(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && bt(t, e, a, null, py, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === $e && (t.onclick = null), ku(t);
  }
  function $f(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    ku(t);
  }
  var Ue = /* @__PURE__ */ new Map(), bm = /* @__PURE__ */ new Set();
  function xu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Tl = k.d;
  k.d = {
    f: Vy,
    r: Ky,
    D: Jy,
    C: $y,
    L: ky,
    m: Fy,
    X: Iy,
    S: Wy,
    M: Py
  };
  function Vy() {
    var t = Tl.f(), e = Ii();
    return t || e;
  }
  function Ky(t) {
    var e = Ha(t);
    e !== null && e.tag === 5 && e.type === "form" ? Td(e) : Tl.r(t);
  }
  var pn = typeof document > "u" ? null : document;
  function Sm(t, e, l) {
    var a = pn;
    if (a && typeof e == "string" && e) {
      var n = ze(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), bm.has(n) || (bm.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Wt(e, "link", t), Gt(e), a.head.appendChild(e)));
    }
  }
  function Jy(t) {
    Tl.D(t), Sm("dns-prefetch", t, null);
  }
  function $y(t, e) {
    Tl.C(t, e), Sm("preconnect", t, e);
  }
  function ky(t, e, l) {
    Tl.L(t, e, l);
    var a = pn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + ze(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + ze(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + ze(
        l.imageSizes
      ) + '"]')) : n += '[href="' + ze(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = bn(t);
          break;
        case "script":
          u = Sn(t);
      }
      if (!(Ue.has(u) || (t = et(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), Ue.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(ju(u)) || e === "script" && a.querySelector(Nu(u))))) {
        var i = a.createElement("link");
        Wt(i, "link", t), e === "style" && (i[$u] = !0, i.onload = i.onerror = function() {
          wr(i);
        }), Gt(i), a.head.appendChild(i);
      }
    }
  }
  function Fy(t, e) {
    Tl.m(t, e);
    var l = pn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + ze(a) + '"][href="' + ze(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Sn(t);
      }
      if (!Ue.has(u) && (t = et({ rel: "modulepreload", href: t }, e), Ue.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Nu(u)))
              return;
        }
        a = l.createElement("link"), Wt(a, "link", t), Gt(a), l.head.appendChild(a);
      }
    }
  }
  function Wy(t, e, l) {
    Tl.S(t, e, l);
    var a = pn;
    if (a && t) {
      var n = qa(a).hoistableStyles, u = bn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          ju(u)
        ))
          f.loading = 5;
        else {
          t = et(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = Ue.get(u)) && kf(t, l);
          var d = i = a.createElement("link");
          Gt(d), Wt(d, "link", t), d._p = new Promise(function(b, j) {
            d.onload = b, d.onerror = j;
          }), d.addEventListener("load", function() {
            f.loading |= 1;
          }), d.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, uc(i, e, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: f
        }, n.set(u, i);
      }
    }
  }
  function Iy(t, e) {
    Tl.X(t, e);
    var l = pn;
    if (l && t) {
      var a = qa(l).hoistableScripts, n = Sn(t), u = a.get(n);
      u || (u = l.querySelector(Nu(n)), u || (t = et({ src: t, async: !0 }, e), (e = Ue.get(n)) && Ff(t, e), u = l.createElement("script"), Gt(u), Wt(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Py(t, e) {
    Tl.M(t, e);
    var l = pn;
    if (l && t) {
      var a = qa(l).hoistableScripts, n = Sn(t), u = a.get(n);
      u || (u = l.querySelector(Nu(n)), u || (t = et({ src: t, async: !0, type: "module" }, e), (e = Ue.get(n)) && Ff(t, e), u = l.createElement("script"), Gt(u), Wt(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Tm(t, e, l, a) {
    var n = (n = Cl.current) ? xu(n) : null;
    if (!n) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = bn(l.href), e = qa(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = bn(l.href);
          var u = qa(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            ju(t)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = Ue.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Ue.set(t, u)), t0(
            n,
            t,
            u,
            i.state
          ))), e && a === null)
            throw Error(r(528, ""));
          return i;
        }
        if (e && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Sn(l), e = qa(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function bn(t) {
    return 'href="' + ze(t) + '"';
  }
  function ju(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function xm(t) {
    return et({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function t0(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[$u] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[$u] = !0, e.onload = e.onerror = wr.bind(null, e), Wt(e, "link", l), Gt(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Sn(t) {
    return '[src="' + ze(t) + '"]';
  }
  function Nu(t) {
    return "script[async]" + t;
  }
  function jm(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + ze(l.href) + '"]'
          );
          if (a)
            return e.instance = a, Gt(a), a;
          var n = et({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Gt(a), Wt(a, "style", n), uc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = bn(l.href);
          var u = t.querySelector(
            ju(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Gt(u), u;
          a = xm(l), (n = Ue.get(n)) && kf(a, n), u = (t.ownerDocument || t).createElement("link"), Gt(u);
          var i = u;
          return i._p = new Promise(function(f, d) {
            i.onload = f, i.onerror = d;
          }), Wt(u, "link", a), e.state.loading |= 4, uc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Sn(l.src), (n = t.querySelector(
            Nu(u)
          )) ? (e.instance = n, Gt(n), n) : (a = l, (n = Ue.get(u)) && (a = et({}, l), Ff(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Gt(n), Wt(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, uc(a, l.precedence, t));
    return e.instance;
  }
  function uc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === e) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function kf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Ff(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var ic = null;
  function Nm(t, e, l) {
    if (ic === null) {
      var a = /* @__PURE__ */ new Map(), n = ic = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = ic, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Ln] || u[Kt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Wf(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function e0(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Em(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function zm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Am(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Cm(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Am(e), t.suspenseyImages.push(e)), t = n0.bind(t), e.decode().then(t, t));
  }
  function l0(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = bn(a.href), u = e.querySelector(
          ju(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Eu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, Gt(u);
          return;
        }
        u = e.ownerDocument || e, a = xm(a), (n = Ue.get(n)) && kf(a, n), u = u.createElement("link"), Gt(u);
        var i = u;
        i._p = new Promise(function(f, d) {
          i.onload = f, i.onerror = d;
        }), Wt(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Eu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var cc = 0;
  function a0(t, e) {
    return t.stylesheets && t.count === 0 && fc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && fc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && cc === 0 && (cc = 62500 * Sy());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && fc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > cc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Dm(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) fc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Eu() {
    this.count--, Dm(this);
  }
  function n0() {
    this.imgCount--, Dm(this);
  }
  var sc = null;
  function fc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, sc = /* @__PURE__ */ new Map(), e.forEach(u0, t), sc = null, Eu.call(t));
  }
  function u0(t, e) {
    if (!(e.state.loading & 4)) {
      var l = sc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), sc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Eu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Tn = {
    $$typeof: Lt,
    Provider: null,
    Consumer: null,
    _currentValue: cl,
    _currentValue2: cl,
    _threadCount: 0
  };
  function i0(t, e, l, a, n, u, i, f, d) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Dc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Dc(0), this.hiddenUpdates = Dc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = d, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Om(t, e, l, a, n, u, i, f, d, b, j, z) {
    return t = new i0(
      t,
      e,
      l,
      i,
      d,
      b,
      j,
      z,
      f
    ), e = 1, u === !0 && (e |= 24), u = ce(3, null, null, e), t.current = u, u.stateNode = t, e = os(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, hs(u), t;
  }
  function Mm(t) {
    return t ? (t = Ja, t) : Ja;
  }
  function wm(t, e, l, a, n, u) {
    n = Mm(n), a.context === null ? a.context = n : a.pendingContext = n, a = Ll(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = Gl(t, a, e), l !== null && (oe(l, t, e), au(l, t, e));
  }
  function Rm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function If(t, e) {
    Rm(t, e), (t = t.alternate) && Rm(t, e);
  }
  function Um(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ma(t, 67108864);
      e !== null && oe(e, t, 67108864), If(t, 67108864);
    }
  }
  function Hm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = xe();
      e = Oc(e);
      var l = ma(t, e);
      l !== null && oe(l, t, e), If(t, e);
    }
  }
  var xn = !0;
  function c0(t, e, l, a) {
    var n = L.T;
    L.T = null;
    var u = k.p;
    try {
      k.p = 2, Pf(t, e, l, a);
    } finally {
      k.p = u, L.T = n;
    }
  }
  function s0(t, e, l, a) {
    var n = L.T;
    L.T = null;
    var u = k.p;
    try {
      k.p = 8, Pf(t, e, l, a);
    } finally {
      k.p = u, L.T = n;
    }
  }
  function Pf(t, e, l, a) {
    if (xn) {
      var n = tr(a);
      if (n === null)
        Rf(
          t,
          e,
          a,
          rc,
          l
        ), Bm(t, a);
      else if (r0(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Bm(t, a), e & 4 && -1 < f0.indexOf(t)) {
        for (; n !== null; ) {
          var u = Ha(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = fa(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - ge(i);
                      f.entanglements[1] |= d, i &= ~d;
                    }
                    nl(u), (mt & 6) === 0 && (ki = me() + 500, pu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = ma(u, 2), f !== null && oe(f, u, 2), Ii(), If(u, 2);
            }
          if (u = tr(a), u === null && Rf(
            t,
            e,
            a,
            rc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Rf(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function tr(t) {
    return t = Bc(t), er(t);
  }
  var rc = null;
  function er(t) {
    if (rc = null, t = ra(t), t !== null) {
      var e = _(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = C(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = D(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return rc = t, null;
  }
  function qm(t) {
    switch (t) {
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
        switch (Sh()) {
          case Sr:
            return 2;
          case Tr:
            return 8;
          case Qu:
          case Th:
            return 32;
          case xr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lr = !1, Pl = null, ta = null, ea = null, zu = /* @__PURE__ */ new Map(), Au = /* @__PURE__ */ new Map(), la = [], f0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Bm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Pl = null;
        break;
      case "dragenter":
      case "dragleave":
        ta = null;
        break;
      case "mouseover":
      case "mouseout":
        ea = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Au.delete(e.pointerId);
    }
  }
  function Cu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = Ha(e), e !== null && Um(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function r0(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return Pl = Cu(
          Pl,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ta = Cu(
          ta,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return ea = Cu(
          ea,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return zu.set(
          u,
          Cu(
            zu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Au.set(
          u,
          Cu(
            Au.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Ym(t) {
    var e = ra(t.target);
    if (e !== null) {
      var l = _(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = C(l), e !== null) {
            t.blockedOn = e, Dr(t.priority, function() {
              Hm(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = D(l), e !== null) {
            t.blockedOn = e, Dr(t.priority, function() {
              Hm(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function oc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = tr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        qc = a, l.target.dispatchEvent(a), qc = null;
      } else
        return e = Ha(l), e !== null && Um(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Lm(t, e, l) {
    oc(t) && l.delete(e);
  }
  function o0() {
    lr = !1, Pl !== null && oc(Pl) && (Pl = null), ta !== null && oc(ta) && (ta = null), ea !== null && oc(ea) && (ea = null), zu.forEach(Lm), Au.forEach(Lm);
  }
  function dc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, lr || (lr = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      o0
    )));
  }
  var vc = null;
  function Gm(t) {
    vc !== t && (vc = t, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        vc === t && (vc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (er(a || l) === null)
              continue;
            break;
          }
          var u = Ha(l);
          u !== null && (t.splice(e, 3), e -= 3, Hs(
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
  function jn(t) {
    function e(d) {
      return dc(d, t);
    }
    Pl !== null && dc(Pl, t), ta !== null && dc(ta, t), ea !== null && dc(ea, t), zu.forEach(e), Au.forEach(e);
    for (var l = 0; l < la.length; l++) {
      var a = la[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < la.length && (l = la[0], l.blockedOn === null); )
      Ym(l), l.blockedOn === null && la.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[ie] || null;
        if (typeof u == "function")
          i || Gm(l);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[ie] || null)
              f = i.formAction;
            else if (er(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? l[a + 1] = f : (l.splice(a, 3), a -= 3), Gm(l);
        }
      }
  }
  function Xm() {
    function t(u) {
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
    function e() {
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
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
      };
    }
  }
  function ar(t) {
    this._internalRoot = t;
  }
  mc.prototype.render = ar.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var l = e.current, a = xe();
    wm(l, a, t, e, null, null);
  }, mc.prototype.unmount = ar.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      wm(t.current, 2, null, t, null, null), Ii(), e[Ua] = null;
    }
  };
  function mc(t) {
    this._internalRoot = t;
  }
  mc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Cr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < la.length && e !== 0 && e < la[l].priority; l++) ;
      la.splice(l, 0, t), l === 0 && Ym(t);
    }
  };
  var Qm = o.version;
  if (Qm !== "19.3.1")
    throw Error(
      r(
        527,
        Qm,
        "19.3.1"
      )
    );
  k.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = M(e), t = t !== null ? A(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var d0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var hc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hc.isDisabled && hc.supportsFiber)
      try {
        qn = hc.inject(
          d0
        ), he = hc;
      } catch {
      }
  }
  return Ou.createRoot = function(t, e) {
    if (!h(t)) throw Error(r(299));
    var l = !1, a = "", n = Md, u = wd, i = Rd;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Om(
      t,
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
      Xm
    ), t[Ua] = e.current, wf(t), new ar(e);
  }, Ou.hydrateRoot = function(t, e, l) {
    if (!h(t)) throw Error(r(299));
    var a = !1, n = "", u = Md, i = wd, f = Rd, d = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (d = l.formState)), e = Om(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      d,
      u,
      i,
      f,
      Xm
    ), e.context = Mm(null), l = e.current, a = xe(), a = Oc(a), n = Ll(a), n.callback = null, Gl(l, n, a), l = a, e.current.lanes = l, Yn(e, l), nl(e), t[Ua] = e.current, wf(t), new mc(e);
  }, Ou.version = "19.3.1", Ou;
}
var Pm;
function T0() {
  if (Pm) return ur.exports;
  Pm = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), ur.exports = S0(), ur.exports;
}
var x0 = T0(), U = gr();
const oh = U.createContext(null);
function th() {
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
function j0({ children: s }) {
  const [o, v] = U.useState(th), r = U.useCallback(function() {
    v(th());
  }, []), h = U.useCallback(
    async function(D) {
      await window.setActiveMasterContext(D), r();
    },
    [r]
  ), _ = U.useCallback(function() {
    window.exitBetaMode();
  }, []), C = U.useMemo(
    function() {
      return Object.assign({}, o, {
        refresh: r,
        switchGroup: h,
        exitBeta: _
      });
    },
    [o, r, h, _]
  );
  return /* @__PURE__ */ c.jsx(oh.Provider, { value: C, children: s });
}
function St() {
  const s = U.useContext(oh);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const N0 = "_button_fpxiy_7", E0 = "_primary_fpxiy_22", z0 = "_secondary_fpxiy_30", A0 = "_danger_fpxiy_39", C0 = "_spinner_fpxiy_52", D0 = "_labelLoading_fpxiy_61", Nn = {
  button: N0,
  primary: E0,
  secondary: z0,
  danger: A0,
  spinner: C0,
  labelLoading: D0
};
function Z({
  variant: s = "primary",
  loading: o = !1,
  disabled: v = !1,
  children: r,
  className: h,
  ..._
}) {
  var C = s === "secondary" ? Nn.secondary : s === "danger" ? Nn.danger : Nn.primary;
  return /* @__PURE__ */ c.jsxs(
    "button",
    {
      className: [Nn.button, C, h].filter(Boolean).join(" "),
      disabled: v || o,
      "aria-busy": o || void 0,
      ..._,
      children: [
        o ? /* @__PURE__ */ c.jsx("span", { className: Nn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ c.jsx("span", { className: o ? Nn.labelLoading : void 0, children: r })
      ]
    }
  );
}
const O0 = "_backdrop_13xfr_1", M0 = "_dialog_13xfr_12", w0 = "_header_13xfr_23", R0 = "_title_13xfr_30", U0 = "_closeBtn_13xfr_35", En = {
  backdrop: O0,
  dialog: M0,
  header: w0,
  title: R0,
  closeBtn: U0
};
function H0({ title: s, onClose: o, children: v }) {
  return U.useEffect(function() {
    function r(h) {
      h.key === "Escape" && o();
    }
    return document.addEventListener("keydown", r), function() {
      document.removeEventListener("keydown", r);
    };
  }, [o]), /* @__PURE__ */ c.jsx(
    "div",
    {
      className: En.backdrop,
      onClick: function(r) {
        r.target === r.currentTarget && o();
      },
      children: /* @__PURE__ */ c.jsxs("div", { className: En.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ c.jsxs("div", { className: En.header, children: [
          /* @__PURE__ */ c.jsx("h3", { className: En.title, children: s }),
          /* @__PURE__ */ c.jsx(
            "button",
            {
              className: En.closeBtn,
              onClick: o,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: En.body, children: v })
      ] })
    }
  );
}
const q0 = "_group_1wdnn_1", B0 = "_label_1wdnn_8", Y0 = "_input_1wdnn_14", L0 = "_error_1wdnn_32", Mu = {
  group: q0,
  label: B0,
  input: Y0,
  error: L0
};
function ht({ label: s, error: o, multiline: v = !1, id: r, ...h }) {
  var _ = r || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ c.jsxs("div", { className: Mu.group, children: [
    s ? /* @__PURE__ */ c.jsx("label", { className: Mu.label, htmlFor: _, children: s }) : null,
    v ? /* @__PURE__ */ c.jsx("textarea", { id: _, className: Mu.input, ...h }) : /* @__PURE__ */ c.jsx("input", { id: _, className: Mu.input, ...h }),
    o ? /* @__PURE__ */ c.jsx("p", { className: Mu.error, children: o }) : null
  ] });
}
const G0 = "_header_1ozxo_1", X0 = "_title_1ozxo_12", Q0 = "_subtitle_1ozxo_17", Z0 = "_right_1ozxo_23", V0 = "_groupSelect_1ozxo_30", K0 = "_userBadge_1ozxo_39", J0 = "_points_1ozxo_43", na = {
  header: G0,
  title: X0,
  subtitle: Q0,
  right: Z0,
  groupSelect: V0,
  userBadge: K0,
  points: J0
};
function $0() {
  var s = St(), o = window.users[s.currentUser] || {}, [v, r] = U.useState(!1), [h, _] = U.useState(s.statusMessage), [C, D] = U.useState(!1);
  function O() {
    s.exitBeta();
  }
  function M() {
    s.exitBeta(), window.logout();
  }
  function A() {
    _(s.statusMessage), r(!0);
  }
  async function x(N) {
    N.preventDefault(), D(!0);
    try {
      await window.updateMyStatusMessage(h), s.refresh(), r(!1);
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs("header", { className: na.header, children: [
    /* @__PURE__ */ c.jsxs("div", { className: na.left, children: [
      /* @__PURE__ */ c.jsx("h1", { className: na.title, children: s.groupTerms.groupLabel }),
      /* @__PURE__ */ c.jsx("p", { className: na.subtitle, children: "Beta dashboard" })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: na.right, children: [
      s.myMasterOptions.length > 1 ? /* @__PURE__ */ c.jsx(
        "select",
        {
          className: na.groupSelect,
          value: s.activeMasterContext,
          onChange: function(N) {
            s.switchGroup(N.target.value);
          },
          "aria-label": "Switch group",
          children: s.myMasterOptions.map(function(N) {
            var H = window.users[N];
            return /* @__PURE__ */ c.jsx("option", { value: N, children: H ? H.displayName : N }, N);
          })
        }
      ) : null,
      /* @__PURE__ */ c.jsx("span", { className: na.userBadge, children: s.displayName }),
      /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: A, children: "✏️ Status" }),
      s.isMaster ? null : /* @__PURE__ */ c.jsxs("span", { className: na.points, children: [
        o.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: O, children: "Exit beta" }),
      /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: M, children: "Logout" })
    ] }),
    v ? /* @__PURE__ */ c.jsx(H0, { title: "Set Status Message", onClose: function() {
      r(!1);
    }, children: /* @__PURE__ */ c.jsxs("form", { onSubmit: x, children: [
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Status message",
          value: h,
          onChange: function(N) {
            _(N.target.value);
          },
          placeholder: "e.g. 🐷 feeling good today",
          maxLength: 100,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: C, children: "Save" })
    ] }) }) : null
  ] });
}
const k0 = "_nav_c0zce_1", F0 = "_tab_c0zce_10", W0 = "_tabActive_c0zce_11", rr = {
  nav: k0,
  tab: F0,
  tabActive: W0
};
function I0({ activeTab: s, onChange: o }) {
  var v = St(), r = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return v.isMaster && r.push({ key: "dashboard", label: "Dashboard" }), v.isSlave ? r.push({ key: "suggest", label: "Suggest Task" }) : r.push({ key: "suggest", label: "Suggestions" }), r.push({ key: "shop", label: "Rewards Shop" }), v.isMaster && r.push({ key: "admin", label: "Admin Settings" }), v.isAdmin && r.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ c.jsx("nav", { className: rr.nav, "aria-label": "Main", children: r.map(function(h) {
    var _ = h.key === s;
    return /* @__PURE__ */ c.jsx(
      "button",
      {
        className: _ ? rr.tabActive : rr.tab,
        "aria-current": _ ? "page" : void 0,
        onClick: function() {
          o(h.key);
        },
        children: h.label
      },
      h.key
    );
  }) });
}
function El(s) {
  var o = s.table, v = s.select || "*", r = s.masterUsername, h = s.sort, _ = s.enabled !== !1, [C, D] = U.useState([]), [O, M] = U.useState("loading"), [A, x] = U.useState(null), N = U.useCallback(
    async function() {
      if (!_ || !r) {
        D([]), M("ready");
        return;
      }
      M("loading"), x(null);
      var H = window.supabase.from(o).select(v).eq("master_username", r), $ = await H;
      if ($.error) {
        console.error("useRealtimeList(" + o + ") fetch error:", $.error), x($.error), M("error");
        return;
      }
      var it = $.data || [];
      h && (it = it.slice().sort(h)), D(it), M("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [o, v, r, _]
  );
  return U.useEffect(
    function() {
      if (N(), !(!_ || !r)) {
        var H = window.supabase.channel("beta_" + o + "_" + r).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: o,
            filter: "master_username=eq." + r
          },
          function($) {
            D(function(it) {
              var tt = it;
              return $.eventType === "INSERT" ? tt = [$.new].concat(it) : $.eventType === "UPDATE" ? tt = it.map(function(wt) {
                return wt.id === $.old.id ? $.new : wt;
              }) : $.eventType === "DELETE" && (tt = it.filter(function(wt) {
                return wt.id !== $.old.id;
              })), h ? tt.slice().sort(h) : tt;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(H);
        };
      }
    },
    [o, r, _, N]
  ), { items: C, status: O, error: A, reload: N };
}
function P0(s, o) {
  return new Date(o.createdAt) - new Date(s.createdAt);
}
function yr() {
  var s = St(), o = El({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: P0
  });
  return {
    tasks: o.items,
    status: o.status,
    error: o.error,
    reload: o.reload,
    // `fields` matches the shape window.createTask's optional overrides
    // argument expects - see js/database-tasks.js.
    createTask: function(v) {
      return window.createTask(v);
    },
    checkOffTask: function(v) {
      return window.checkOffTask(v);
    },
    approveTask: function(v) {
      return window.approveTask(v);
    },
    rejectTask: function(v) {
      return window.rejectTask(v);
    },
    deleteTask: function(v) {
      return window.deleteTask(v);
    },
    acceptDemerit: function(v) {
      return window.acceptDemerit(v);
    },
    appealDemerit: function(v) {
      var r = o.items.find(function(h) {
        return h.id === v;
      });
      r && window.appealDemerit(v);
    },
    approveAppeal: function(v) {
      return window.approveAppeal(v);
    },
    denyAppeal: function(v) {
      return window.denyAppeal(v);
    },
    markInvoiceAsPaid: function(v) {
      return window.markInvoiceAsPaid(v);
    },
    approveInvoice: function(v) {
      return window.approveInvoice(v);
    }
  };
}
function t1() {
  var s = St(), [o, v] = U.useState([]);
  return U.useEffect(
    function() {
      var r = !1;
      if (!s.isSlave || !s.activeMasterContext) {
        v([]);
        return;
      }
      return window.supabase.from("task_assignments").select("task_id").eq("assigned_to", s.currentUser).eq("master_username", s.activeMasterContext).then(function(h) {
        r || h.error || v(
          (h.data || []).map(function(_) {
            return _.task_id;
          })
        );
      }), function() {
        r = !0;
      };
    },
    [s.isSlave, s.currentUser, s.activeMasterContext]
  ), o;
}
function _r() {
  var s = St(), o = s.activeMasterContext, [v, r] = U.useState([]), [h, _] = U.useState("loading"), [C, D] = U.useState(null), O = U.useCallback(
    async function() {
      if (!o) {
        r([]), _("ready");
        return;
      }
      _("loading"), D(null);
      var A = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", o);
      if (A.error) {
        D(A.error), _("error");
        return;
      }
      var x = (A.data || []).map(function(ot) {
        return ot.slave_username;
      }), N = { data: [] }, H = { data: [] };
      x.length > 0 && (N = await window.supabase.from("userProfiles").select("username, points").eq("master_username", o), H = await window.supabase.from("users").select("username, display_name, status_message").in("username", x));
      var $ = {};
      (N.data || []).forEach(function(ot) {
        $[ot.username] = ot.points || 0;
      });
      var it = {}, tt = {};
      (H.data || []).forEach(function(ot) {
        it[ot.username] = ot.display_name || ot.username, tt[ot.username] = ot.status_message || "";
      });
      var wt = (A.data || []).map(function(ot) {
        return {
          username: ot.slave_username,
          displayName: it[ot.slave_username] || ot.slave_username,
          statusMessage: tt[ot.slave_username] || "",
          points: $[ot.slave_username] || 0,
          status: ot.status
        };
      });
      r(wt), _("ready");
    },
    [o]
  );
  U.useEffect(
    function() {
      if (O(), !!o) {
        var A = window.supabase.channel("beta_slave_roster_" + o).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + o
          },
          function() {
            O();
          }
        ).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "master_slave_relationships",
            filter: "master_username=eq." + o
          },
          function() {
            O();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(A);
        };
      }
    },
    [o, O]
  );
  var M = v.filter(function(A) {
    return A.status === "active";
  });
  return {
    slaves: M,
    allSlaves: v,
    status: h,
    error: C,
    reload: O
  };
}
const e1 = "_card_1j746_1", l1 = "_raised_1j746_8", eh = {
  card: e1,
  raised: l1
};
function xt({ raised: s = !1, className: o, children: v, ...r }) {
  return /* @__PURE__ */ c.jsx(
    "div",
    {
      className: [s ? eh.raised : eh.card, o].filter(Boolean).join(" "),
      ...r,
      children: v
    }
  );
}
const a1 = "_heading_1hq5i_1", n1 = "_row_1hq5i_6", u1 = "_checkboxRow_1hq5i_16", i1 = "_select_1hq5i_24", c1 = "_fieldset_1hq5i_35", s1 = "_hint_1hq5i_42", xl = {
  heading: a1,
  row: n1,
  checkboxRow: u1,
  select: i1,
  fieldset: c1,
  hint: s1
};
var lh = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function f1({ onCreated: s }) {
  var o = St(), v = _r(), [r, h] = U.useState(lh), [_, C] = U.useState([]), [D, O] = U.useState(!1);
  function M(N, H) {
    h(function($) {
      return Object.assign({}, $, { [N]: H });
    });
  }
  function A(N) {
    C(function(H) {
      return H.includes(N) ? H.filter(function($) {
        return $ !== N;
      }) : H.concat(N);
    });
  }
  async function x(N) {
    if (N.preventDefault(), !!r.text.trim()) {
      O(!0);
      try {
        await window.createTask({
          text: r.text,
          isDemerit: r.isDemerit,
          points: r.points,
          penaltyPoints: r.penaltyPoints,
          dueDate: r.dueDate || null,
          isRepeating: r.isRepeating,
          repeatInterval: r.isRepeating ? r.repeatInterval : null,
          selectedPigs: _,
          assignmentMode: r.assignmentMode
        }), h(lh), C([]), s && s();
      } finally {
        O(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: xl.heading, children: "Create New Task" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: x, children: [
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Task description",
          value: r.text,
          onChange: function(N) {
            M("text", N.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: xl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: r.isDemerit,
            onChange: function(N) {
              M("isDemerit", N.target.checked);
            }
          }
        ),
        "This is a demerit (penalty only, no points)"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: xl.row, children: [
        r.isDemerit ? null : /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Points",
            type: "number",
            min: "0",
            value: r.points,
            onChange: function(N) {
              M("points", N.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Penalty points",
            type: "number",
            min: "0",
            value: r.penaltyPoints,
            onChange: function(N) {
              M("penaltyPoints", N.target.value);
            }
          }
        ),
        r.isDemerit ? null : /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Due date",
            type: "datetime-local",
            value: r.dueDate,
            onChange: function(N) {
              M("dueDate", N.target.value);
            }
          }
        )
      ] }),
      r.isDemerit ? null : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("label", { className: xl.checkboxRow, children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "checkbox",
              checked: r.isRepeating,
              onChange: function(N) {
                M("isRepeating", N.target.checked);
              }
            }
          ),
          "Repeats"
        ] }),
        r.isRepeating ? /* @__PURE__ */ c.jsxs(
          "select",
          {
            className: xl.select,
            value: r.repeatInterval,
            onChange: function(N) {
              M("repeatInterval", N.target.value);
            },
            children: [
              /* @__PURE__ */ c.jsx("option", { value: "daily", children: "Daily" }),
              /* @__PURE__ */ c.jsx("option", { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ c.jsx("option", { value: "monthly", children: "Monthly" })
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ c.jsxs("fieldset", { className: xl.fieldset, children: [
        /* @__PURE__ */ c.jsxs("legend", { children: [
          "Assign to ",
          o.groupTerms.slaveLabelPlural
        ] }),
        v.slaves.length === 0 ? /* @__PURE__ */ c.jsxs("p", { className: xl.hint, children: [
          "No ",
          o.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : v.slaves.map(function(N) {
          return /* @__PURE__ */ c.jsxs("label", { className: xl.checkboxRow, children: [
            /* @__PURE__ */ c.jsx(
              "input",
              {
                type: "checkbox",
                checked: _.includes(N.username),
                onChange: function() {
                  A(N.username);
                }
              }
            ),
            N.displayName
          ] }, N.username);
        })
      ] }),
      !r.isDemerit && _.length > 1 ? /* @__PURE__ */ c.jsxs(
        "select",
        {
          className: xl.select,
          value: r.assignmentMode,
          onChange: function(N) {
            M("assignmentMode", N.target.value);
          },
          "aria-label": "Assignment mode",
          children: [
            /* @__PURE__ */ c.jsxs("option", { value: "individual", children: [
              "One copy per ",
              o.groupTerms.slaveLabel
            ] }),
            /* @__PURE__ */ c.jsx("option", { value: "shared", children: "Shared (one task, anyone can complete it)" })
          ]
        }
      ) : null,
      /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: D, disabled: !r.text.trim(), children: r.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const r1 = "_wrap_1qfmw_1", o1 = "_spinner_1qfmw_10", ah = {
  wrap: r1,
  spinner: o1
};
function ul({ label: s = "Loading..." }) {
  return /* @__PURE__ */ c.jsxs("div", { className: ah.wrap, role: "status", children: [
    /* @__PURE__ */ c.jsx("span", { className: ah.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ c.jsx("span", { children: s })
  ] });
}
const d1 = "_wrap_buujm_1", v1 = "_message_buujm_9", nh = {
  wrap: d1,
  message: v1
};
function zl({ message: s = "Something went wrong.", onRetry: o }) {
  return /* @__PURE__ */ c.jsxs("div", { className: nh.wrap, role: "alert", children: [
    /* @__PURE__ */ c.jsx("p", { className: nh.message, children: s }),
    o ? /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: o, children: "Try again" }) : null
  ] });
}
const m1 = "_wrap_mx4zv_1", h1 = "_icon_mx4zv_7", g1 = "_title_mx4zv_12", y1 = "_hint_mx4zv_18", gc = {
  wrap: m1,
  icon: h1,
  title: g1,
  hint: y1
};
function te({ icon: s = "—", title: o, hint: v }) {
  return /* @__PURE__ */ c.jsxs("div", { className: gc.wrap, children: [
    /* @__PURE__ */ c.jsx("div", { className: gc.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ c.jsx("p", { className: gc.title, children: o }),
    v ? /* @__PURE__ */ c.jsx("p", { className: gc.hint, children: v }) : null
  ] });
}
const _1 = "_badge_1988s_1", p1 = "_neutral_1988s_10", b1 = "_success_1988s_15", S1 = "_warning_1988s_20", T1 = "_danger_1988s_25", wu = {
  badge: _1,
  neutral: p1,
  success: b1,
  warning: S1,
  danger: T1
};
function ue({ tone: s = "neutral", children: o }) {
  var v = s === "success" ? wu.success : s === "warning" ? wu.warning : s === "danger" ? wu.danger : wu.neutral;
  return /* @__PURE__ */ c.jsx("span", { className: [wu.badge, v].join(" "), children: o });
}
function dh(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function vh(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const x1 = "_item_v1inl_1", j1 = "_header_v1inl_5", N1 = "_text_v1inl_11", E1 = "_meta_v1inl_16", z1 = "_appealText_v1inl_33", A1 = "_actions_v1inl_41", zn = {
  item: x1,
  header: j1,
  text: N1,
  meta: E1,
  appealText: z1,
  actions: A1
};
function C1({ task: s, actions: o }) {
  var v = St(), r = window.users[s.assignedTo], h = s.type === "cost-tracker", _ = h ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ c.jsxs(xt, { className: zn.item, children: [
    /* @__PURE__ */ c.jsxs("div", { className: zn.header, children: [
      /* @__PURE__ */ c.jsx(ue, { tone: vh(s), children: dh(s) }),
      s.type === "demerit" ? /* @__PURE__ */ c.jsx(ue, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: zn.text, children: h ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ c.jsxs("dl", { className: zn.meta, children: [
      s.assignedTo ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ c.jsx("dd", { children: r ? r.displayName : s.assignedTo })
      ] }) : /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Assignment" }),
        /* @__PURE__ */ c.jsx("dd", { children: "Shared" })
      ] }),
      !h && s.points ? /* @__PURE__ */ c.jsxs("div", { children: [
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
      h && _ ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ c.jsx("dd", { children: _ })
      ] }) : null,
      s.dueDate ? /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ c.jsx("dd", { children: window.formatDate(s.dueDate) })
      ] }) : null
    ] }),
    s.appealText ? /* @__PURE__ */ c.jsxs("p", { className: zn.appealText, children: [
      /* @__PURE__ */ c.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ c.jsxs("div", { className: zn.actions, children: [
      v.isSlave && !h && s.type !== "demerit" && s.assignedTo === v.currentUser && s.status === "todo" ? /* @__PURE__ */ c.jsx(Z, { onClick: function() {
        o.checkOffTask(s.id);
      }, children: "Mark complete" }) : null,
      v.isSlave && s.type === "demerit" && s.status === "demerit_issued" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Z, { onClick: function() {
          o.acceptDemerit(s.id);
        }, children: "Accept" }),
        /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: function() {
          o.appealDemerit(s.id);
        }, children: "Appeal" })
      ] }) : null,
      v.isSlave && h && s.status === "todo" ? /* @__PURE__ */ c.jsx(Z, { onClick: function() {
        o.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      v.isMaster && s.status === "pending_approval" && h ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Z, { onClick: function() {
          o.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
          o.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      v.isMaster && s.status === "pending_approval" && !h ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Z, { onClick: function() {
          o.approveTask(s.id);
        }, children: "Approve" }),
        /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
          o.rejectTask(s.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      v.isMaster && s.type === "demerit" && s.appealStatus === "pending" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Z, { onClick: function() {
          o.approveAppeal(s.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
          o.denyAppeal(s.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      v.isMaster ? /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
        o.deleteTask(s.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function yc({ tasks: s, status: o, error: v, onRetry: r, actions: h, emptyLabel: _ }) {
  return o === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading tasks..." }) : o === "error" ? /* @__PURE__ */ c.jsx(
    zl,
    {
      message: "Couldn't load tasks: " + (v ? v.message : "unknown error"),
      onRetry: r
    }
  ) : s.length === 0 ? /* @__PURE__ */ c.jsx(te, { icon: "✓", title: _ || "No tasks yet" }) : /* @__PURE__ */ c.jsx("div", { children: s.map(function(C) {
    return /* @__PURE__ */ c.jsx(C1, { task: C, actions: h }, C.id);
  }) });
}
const D1 = "_section_7c868_1", O1 = "_heading_7c868_5", An = {
  section: D1,
  heading: O1
};
function M1() {
  var s = St(), o = yr(), v = t1(), r = {
    checkOffTask: o.checkOffTask,
    approveTask: o.approveTask,
    rejectTask: o.rejectTask,
    deleteTask: o.deleteTask,
    acceptDemerit: o.acceptDemerit,
    appealDemerit: o.appealDemerit,
    approveAppeal: o.approveAppeal,
    denyAppeal: o.denyAppeal,
    markInvoiceAsPaid: o.markInvoiceAsPaid,
    approveInvoice: o.approveInvoice
  };
  if (s.isSlave) {
    var h = o.tasks.filter(function(D) {
      return D.assignedTo === s.currentUser || v.includes(D.id);
    });
    return /* @__PURE__ */ c.jsx(
      yc,
      {
        tasks: h,
        status: o.status,
        error: o.error,
        onRetry: o.reload,
        actions: r,
        emptyLabel: "No tasks assigned to you yet."
      }
    );
  }
  var _ = o.tasks.filter(function(D) {
    return D.type === "demerit" && D.appealStatus === "pending";
  }), C = o.tasks.filter(function(D) {
    return D.status === "pending_approval";
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(f1, { onCreated: o.reload }),
    _.length > 0 ? /* @__PURE__ */ c.jsxs(xt, { className: An.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: An.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ c.jsx(
        yc,
        {
          tasks: _,
          status: "ready",
          actions: r,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    C.length > 0 ? /* @__PURE__ */ c.jsxs(xt, { className: An.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: An.heading, children: "Pending Approval" }),
      /* @__PURE__ */ c.jsx(
        yc,
        {
          tasks: C,
          status: "ready",
          actions: r,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ c.jsxs(xt, { className: An.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: An.heading, children: "All Tasks" }),
      /* @__PURE__ */ c.jsx(
        yc,
        {
          tasks: o.tasks,
          status: o.status,
          error: o.error,
          onRetry: o.reload,
          actions: r,
          emptyLabel: "No tasks created yet"
        }
      )
    ] })
  ] });
}
const w1 = "_day_1bhqz_1", R1 = "_dayHeading_1bhqz_5", U1 = "_item_1bhqz_13", H1 = "_text_1bhqz_17", q1 = "_meta_1bhqz_21", Cn = {
  day: w1,
  dayHeading: R1,
  item: U1,
  text: H1,
  meta: q1
};
function B1(s) {
  return new Date(s).toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function Y1() {
  var s = St(), o = yr();
  if (o.status === "loading") return /* @__PURE__ */ c.jsx(ul, { label: "Loading tasks..." });
  if (o.status === "error")
    return /* @__PURE__ */ c.jsx(zl, { message: o.error ? o.error.message : "", onRetry: o.reload });
  var v = o.tasks.filter(function(h) {
    return h.dueDate ? s.isSlave ? h.assignedTo === s.currentUser : !0 : !1;
  });
  if (v.length === 0)
    return /* @__PURE__ */ c.jsx(te, { title: "No upcoming due dates" });
  var r = {};
  return v.slice().sort(function(h, _) {
    return new Date(h.dueDate) - new Date(_.dueDate);
  }).forEach(function(h) {
    var _ = B1(h.dueDate);
    r[_] = r[_] || [], r[_].push(h);
  }), /* @__PURE__ */ c.jsx("div", { children: Object.keys(r).map(function(h) {
    return /* @__PURE__ */ c.jsxs("section", { className: Cn.day, children: [
      /* @__PURE__ */ c.jsx("h3", { className: Cn.dayHeading, children: h }),
      r[h].map(function(_) {
        var C = window.users[_.assignedTo];
        return /* @__PURE__ */ c.jsxs(xt, { className: Cn.item, children: [
          /* @__PURE__ */ c.jsx(ue, { tone: vh(_), children: dh(_) }),
          /* @__PURE__ */ c.jsx("p", { className: Cn.text, children: _.text }),
          !s.isSlave && _.assignedTo ? /* @__PURE__ */ c.jsxs("p", { className: Cn.meta, children: [
            "Assigned to ",
            C ? C.displayName : _.assignedTo
          ] }) : null,
          /* @__PURE__ */ c.jsxs("p", { className: Cn.meta, children: [
            "Due ",
            window.formatDate(_.dueDate)
          ] })
        ] }, _.id);
      })
    ] }, h);
  }) });
}
function L1(s, o) {
  return new Date(o.timestamp) - new Date(s.timestamp);
}
function G1() {
  var s = St(), o = El({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: L1
  });
  return {
    activity: o.items.slice(0, 50),
    status: o.status,
    error: o.error,
    reload: o.reload
  };
}
const X1 = "_row_qtrye_1", Q1 = "_tile_qtrye_8", Z1 = "_number_qtrye_12", V1 = "_label_qtrye_17", _c = {
  row: X1,
  tile: Q1,
  number: Z1,
  label: V1
};
function K1({ stats: s }) {
  return /* @__PURE__ */ c.jsx("div", { className: _c.row, children: s.map(function(o) {
    return /* @__PURE__ */ c.jsxs(xt, { className: _c.tile, children: [
      /* @__PURE__ */ c.jsx("div", { className: _c.number, children: o.value }),
      /* @__PURE__ */ c.jsx("div", { className: _c.label, children: o.label })
    ] }, o.label);
  }) });
}
const J1 = "_list_azyhi_1", $1 = "_row_azyhi_7", k1 = "_positive_azyhi_13", F1 = "_zero_azyhi_18", W1 = "_negative_azyhi_23", Yu = {
  list: J1,
  row: $1,
  positive: k1,
  zero: F1,
  negative: W1
};
function I1(s) {
  return s < 0 ? Yu.negative : s === 0 ? Yu.zero : Yu.positive;
}
function P1({ slaves: s }) {
  var o = St();
  return s.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No " + o.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ c.jsx("div", { className: Yu.list, children: s.map(function(v) {
    return /* @__PURE__ */ c.jsxs(xt, { className: Yu.row, children: [
      /* @__PURE__ */ c.jsx("span", { children: v.displayName }),
      /* @__PURE__ */ c.jsxs("span", { className: I1(v.points), children: [
        v.points,
        " pts"
      ] })
    ] }, v.username);
  }) });
}
const t_ = "_heading_1mu37_1", e_ = "_form_1mu37_6", l_ = "_select_1mu37_13", or = {
  heading: t_,
  form: e_,
  select: l_
};
function a_({ slaves: s }) {
  var o = St(), [v, r] = U.useState(s[0] ? s[0].username : ""), [h, _] = U.useState(0);
  U.useEffect(
    function() {
      var D = s.find(function(O) {
        return O.username === v;
      });
      D ? _(D.points) : s[0] && r(s[0].username);
    },
    [s, v]
  );
  async function C(D) {
    if (D.preventDefault(), !!v) {
      var O = s.find(function(A) {
        return A.username === v;
      }), M = O ? O.points : 0;
      await window.updateUserPoints(v, Number(h) || 0, "set"), window.showNotification(
        (O ? O.displayName : v) + " points changed from " + M + " to " + (Number(h) || 0),
        "success"
      );
    }
  }
  return s.length === 0 ? null : /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsxs("h3", { className: or.heading, children: [
      "Set ",
      o.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ c.jsxs("form", { className: or.form, onSubmit: C, children: [
      /* @__PURE__ */ c.jsx(
        "select",
        {
          className: or.select,
          value: v,
          onChange: function(D) {
            r(D.target.value);
          },
          "aria-label": "Select " + o.groupTerms.slaveLabel,
          children: s.map(function(D) {
            return /* @__PURE__ */ c.jsx("option", { value: D.username, children: D.displayName }, D.username);
          })
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "New points",
          type: "number",
          value: h,
          onChange: function(D) {
            _(D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(Z, { type: "submit", children: "Set" })
    ] })
  ] });
}
const n_ = "_list_1jial_1", u_ = "_item_1jial_10", i_ = "_user_1jial_16", c_ = "_details_1jial_20", s_ = "_time_1jial_24", Dn = {
  list: n_,
  item: u_,
  user: i_,
  details: c_,
  time: s_
};
function f_({ activity: s, status: o, error: v, onRetry: r }) {
  return o === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading activity..." }) : o === "error" ? /* @__PURE__ */ c.jsx(zl, { message: v ? v.message : "", onRetry: r }) : s.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No recent activity" }) : /* @__PURE__ */ c.jsx("ul", { className: Dn.list, children: s.map(function(h, _) {
    var C = window.users[h.user];
    return /* @__PURE__ */ c.jsxs("li", { className: Dn.item, children: [
      /* @__PURE__ */ c.jsx("span", { className: Dn.user, children: C ? C.displayName : h.user }),
      " ",
      /* @__PURE__ */ c.jsx("span", { className: Dn.action, children: h.action.replace(/_/g, " ") }),
      h.details ? /* @__PURE__ */ c.jsxs("span", { className: Dn.details, children: [
        " — ",
        h.details
      ] }) : null,
      /* @__PURE__ */ c.jsx("span", { className: Dn.time, children: window.formatDate(h.timestamp) })
    ] }, _);
  }) });
}
function r_(s, o) {
  return new Date(o.started_at) - new Date(s.started_at);
}
function mh() {
  var s = St(), o = El({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: r_
  }), v = o.items.filter(function(r) {
    return r.status === "running";
  });
  return {
    trackers: v,
    status: o.status,
    error: o.error,
    reload: o.reload,
    startTracker: function(r, h, _, C, D) {
      return window.startLiveCostTracker(
        r,
        h,
        _,
        C,
        D
      );
    },
    stopTracker: function(r, h) {
      return window.stopLiveCostTracker(r, h !== !1);
    },
    addPenalty: function(r, h, _) {
      return window.addPenaltyToLiveTracker(r, h, _);
    },
    removePenalty: function(r, h) {
      return window.removePenaltyFromLiveTracker(r, h);
    }
  };
}
const o_ = "_heading_16vgt_1", d_ = "_row_16vgt_6", v_ = "_selectGroup_16vgt_16", m_ = "_selectLabel_16vgt_23", h_ = "_select_16vgt_16", jl = {
  heading: o_,
  row: d_,
  selectGroup: v_,
  selectLabel: m_,
  select: h_
};
function g_({ onStart: s }) {
  var [o, v] = U.useState("Cost Tracker Running"), [r, h] = U.useState(50), [_, C] = U.useState("€"), [D, O] = U.useState(6e4), [M, A] = U.useState(!1);
  async function x(N) {
    N.preventDefault(), A(!0);
    try {
      await s(o, Number(r) || 0, _, Number(D), []);
    } finally {
      A(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: jl.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ c.jsxs("form", { className: jl.form, onSubmit: x, children: [
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Description",
          value: o,
          onChange: function(N) {
            v(N.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: jl.row, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: r,
            onChange: function(N) {
              h(N.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: jl.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: jl.selectLabel, children: "Currency" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: jl.select,
              value: _,
              onChange: function(N) {
                C(N.target.value);
              },
              children: [
                /* @__PURE__ */ c.jsx("option", { value: "€", children: "Euro (€)" }),
                /* @__PURE__ */ c.jsx("option", { value: "£", children: "Pound (£)" }),
                /* @__PURE__ */ c.jsx("option", { value: "$", children: "Dollar ($)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: jl.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: jl.selectLabel, children: "Per" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: jl.select,
              value: D,
              onChange: function(N) {
                O(N.target.value);
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
      /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: M, children: "Start tracker" })
    ] })
  ] });
}
const y_ = "_card_1qcj8_1", __ = "_description_1qcj8_5", p_ = "_meta_1qcj8_10", b_ = "_readout_1qcj8_16", S_ = "_amount_1qcj8_24", T_ = "_penaltyList_1qcj8_28", x_ = "_removePenalty_1qcj8_36", j_ = "_penaltyForm_1qcj8_44", ua = {
  card: y_,
  description: __,
  meta: p_,
  readout: b_,
  amount: S_,
  penaltyList: T_,
  removePenalty: x_,
  penaltyForm: j_
};
function N_(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function E_(s, o) {
  var v = Math.max(0, o - new Date(s.started_at).getTime()), r = parseInt(s.increment_interval) || 6e4, h = parseFloat(s.rate) || 0, _ = v / r * h, C = [];
  try {
    C = JSON.parse(s.penalties || "[]");
  } catch {
    C = [];
  }
  var D = C.reduce(function(N, H) {
    return N + (parseFloat(H.amount) || 0);
  }, 0), O = Math.floor(v / 36e5), M = Math.floor(v % 36e5 / 6e4), A = Math.floor(v % 6e4 / 1e3), x = String(O).padStart(2, "0") + ":" + String(M).padStart(2, "0") + ":" + String(A).padStart(2, "0");
  return {
    timeText: x,
    penalties: C,
    penaltyTotal: D,
    grandTotal: _ + D
  };
}
function hh({ tracker: s, isAdmin: o, onStop: v, onAddPenalty: r, onRemovePenalty: h }) {
  var [_, C] = U.useState(Date.now()), [D, O] = U.useState(""), [M, A] = U.useState("");
  U.useEffect(function() {
    var H = window.setInterval(function() {
      C(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(H);
    };
  }, []);
  var x = E_(s, _), N = window.users[s.created_by];
  return /* @__PURE__ */ c.jsxs(xt, { className: ua.card, children: [
    /* @__PURE__ */ c.jsx("p", { className: ua.description, children: s.description }),
    /* @__PURE__ */ c.jsxs("p", { className: ua.meta, children: [
      "by ",
      N ? N.displayName : s.created_by,
      " · ",
      s.currency,
      parseFloat(s.rate).toFixed(2),
      " per ",
      N_(parseInt(s.increment_interval))
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: ua.readout, children: [
      /* @__PURE__ */ c.jsx("span", { children: x.timeText }),
      /* @__PURE__ */ c.jsxs("span", { className: ua.amount, children: [
        s.currency,
        x.grandTotal.toFixed(2)
      ] })
    ] }),
    x.penalties.length > 0 ? /* @__PURE__ */ c.jsx("ul", { className: ua.penaltyList, children: x.penalties.map(function(H) {
      return /* @__PURE__ */ c.jsxs("li", { children: [
        H.description,
        ": ",
        s.currency,
        parseFloat(H.amount).toFixed(2),
        o ? /* @__PURE__ */ c.jsx(
          "button",
          {
            className: ua.removePenalty,
            onClick: function() {
              h(s.id, H.id);
            },
            "aria-label": "Remove penalty " + H.description,
            children: "×"
          }
        ) : null
      ] }, H.id);
    }) }) : null,
    o ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: ua.penaltyForm, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: D,
            onChange: function(H) {
              O(H.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: M,
            onChange: function(H) {
              A(H.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          Z,
          {
            variant: "secondary",
            disabled: !D.trim() || !M,
            onClick: function() {
              r(s.id, D, Number(M)), O(""), A("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
        v(s.id);
      }, children: "Stop & invoice" })
    ] }) : null
  ] });
}
const z_ = "_heading_lmzbq_1", A_ = {
  heading: z_
};
function C_() {
  var s = mh();
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(g_, { onStart: s.startTracker }),
    /* @__PURE__ */ c.jsx("h3", { className: A_.heading, children: "Active Cost Trackers" }),
    s.trackers.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No active cost trackers" }) : s.trackers.map(function(o) {
      return /* @__PURE__ */ c.jsx(
        hh,
        {
          tracker: o,
          isAdmin: !0,
          onStop: s.stopTracker,
          onAddPenalty: s.addPenalty,
          onRemovePenalty: s.removePenalty
        },
        o.id
      );
    })
  ] });
}
const D_ = "_grid_69ji7_1", O_ = "_section_69ji7_8", M_ = "_heading_69ji7_12", On = {
  grid: D_,
  section: O_,
  heading: M_
};
function w_() {
  var s = St(), o = yr(), v = _r(), r = G1(), h = o.tasks, _ = [
    { label: "Total Tasks", value: h.length },
    {
      label: "Pending",
      value: h.filter(function(C) {
        return C.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: h.filter(function(C) {
        return C.status === "completed";
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: v.slaves.length }
  ];
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(K1, { stats: _ }),
    /* @__PURE__ */ c.jsxs("div", { className: On.grid, children: [
      /* @__PURE__ */ c.jsxs(xt, { className: On.section, children: [
        /* @__PURE__ */ c.jsxs("h2", { className: On.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ c.jsx(P1, { slaves: v.slaves })
      ] }),
      /* @__PURE__ */ c.jsx(a_, { slaves: v.slaves })
    ] }),
    /* @__PURE__ */ c.jsxs(xt, { className: On.section, children: [
      /* @__PURE__ */ c.jsx("h2", { className: On.heading, children: "Recent Activity" }),
      /* @__PURE__ */ c.jsx(
        f_,
        {
          activity: r.activity,
          status: r.status,
          error: r.error,
          onRetry: r.reload
        }
      )
    ] }),
    /* @__PURE__ */ c.jsx(xt, { className: On.section, children: /* @__PURE__ */ c.jsx(C_, {}) })
  ] });
}
function R_(s, o) {
  return new Date(o.createdAt) - new Date(s.createdAt);
}
function U_() {
  var s = St(), o = El({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: R_
  });
  return {
    suggestions: o.items,
    status: o.status,
    error: o.error,
    reload: o.reload,
    submitSuggestion: function(v) {
      return window.submitTaskSuggestion(v);
    },
    rejectSuggestion: function(v) {
      return window.rejectSuggestion(v);
    },
    approveSuggestion: function(v) {
      return window.approveSuggestion(v);
    },
    // Opens the classic, self-contained edit modal (it appends to
    // document.body itself, so it works fine from the React tree too -
    // see src/beta/README.md's "Hybrid data flow" section).
    editSuggestion: function(v) {
      window.showEditSuggestionModal(v);
    }
  };
}
var uh = { description: "", justification: "", points: 10, dueDate: "" };
function H_({ onSubmit: s }) {
  var [o, v] = U.useState(uh), [r, h] = U.useState(!1);
  function _(D, O) {
    v(function(M) {
      return Object.assign({}, M, { [D]: O });
    });
  }
  async function C(D) {
    if (D.preventDefault(), !!o.description.trim()) {
      h(!0);
      try {
        await s(o), v(uh);
      } finally {
        h(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: C, children: [
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Description",
          value: o.description,
          onChange: function(D) {
            _("description", D.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Why? (optional)",
          multiline: !0,
          rows: 3,
          value: o.justification,
          onChange: function(D) {
            _("justification", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Suggested points",
          type: "number",
          min: "0",
          value: o.points,
          onChange: function(D) {
            _("points", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: o.dueDate,
          onChange: function(D) {
            _("dueDate", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: r, disabled: !o.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const q_ = "_card_q0jnd_1", B_ = "_badgeRow_q0jnd_5", Y_ = "_description_q0jnd_11", L_ = "_justification_q0jnd_15", G_ = "_metaLine_q0jnd_21", X_ = "_actions_q0jnd_27", Mn = {
  card: q_,
  badgeRow: B_,
  description: Y_,
  justification: L_,
  metaLine: G_,
  actions: X_
};
function Q_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function ih({ suggestion: s, forAdmin: o, onApprove: v, onEdit: r, onReject: h }) {
  var _ = window.users[s.reviewedBy];
  return /* @__PURE__ */ c.jsxs(xt, { className: Mn.card, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Mn.badgeRow, children: [
      /* @__PURE__ */ c.jsx(ue, { tone: Q_(s.status), children: s.status }),
      /* @__PURE__ */ c.jsxs(ue, { tone: "neutral", children: [
        s.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("p", { className: Mn.description, children: s.description }),
    s.justification ? /* @__PURE__ */ c.jsx("p", { className: Mn.justification, children: s.justification }) : null,
    /* @__PURE__ */ c.jsxs("p", { className: Mn.metaLine, children: [
      "Submitted ",
      window.formatDate(s.createdAt),
      s.suggestedDueDate ? " · Suggested due " + window.formatDate(s.suggestedDueDate) : "",
      s.reviewedAt ? " · Reviewed by " + (_ ? _.displayName : s.reviewedBy) : ""
    ] }),
    o && s.status === "pending" ? /* @__PURE__ */ c.jsxs("div", { className: Mn.actions, children: [
      /* @__PURE__ */ c.jsx(Z, { onClick: function() {
        v(s.id);
      }, children: "Approve" }),
      /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: function() {
        r(s.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
        h(s.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function Z_() {
  var s = St(), o = U_();
  if (o.status === "loading") return /* @__PURE__ */ c.jsx(ul, { label: "Loading suggestions..." });
  if (o.status === "error")
    return /* @__PURE__ */ c.jsx(
      zl,
      {
        message: "Couldn't load suggestions: " + (o.error ? o.error.message : ""),
        onRetry: o.reload
      }
    );
  if (s.isSlave) {
    var v = o.suggestions.filter(function(h) {
      return h.suggestedBy === s.currentUser;
    });
    return /* @__PURE__ */ c.jsxs("div", { children: [
      /* @__PURE__ */ c.jsx(H_, { onSubmit: o.submitSuggestion }),
      /* @__PURE__ */ c.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      v.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No suggestions submitted yet" }) : v.map(function(h) {
        return /* @__PURE__ */ c.jsx(ih, { suggestion: h, forAdmin: !1 }, h.id);
      })
    ] });
  }
  var r = o.suggestions.filter(function(h) {
    return h.status === "pending";
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Suggested Tasks" }),
    r.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No suggestions pending review" }) : r.map(function(h) {
      return /* @__PURE__ */ c.jsx(
        ih,
        {
          suggestion: h,
          forAdmin: !0,
          onApprove: o.approveSuggestion,
          onEdit: o.editSuggestion,
          onReject: o.rejectSuggestion
        },
        h.id
      );
    })
  ] });
}
var ch = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function V_(s, o) {
  return s.title.localeCompare(o.title);
}
function K_(s, o) {
  return new Date(o.purchaseDate) - new Date(s.purchaseDate);
}
function J_() {
  var s = St(), o = s.activeMasterContext, v = El({
    table: "rewards",
    masterUsername: o,
    sort: V_
  }), r = El({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: o,
    sort: K_
  }), [h, _] = U.useState(ch), [C, D] = U.useState("loading"), O = U.useCallback(
    async function() {
      if (o) {
        D("loading");
        var M = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", o).limit(1);
        if (M.error) {
          D("error");
          return;
        }
        _(
          M.data && M.data.length > 0 ? M.data[0] : ch
        ), D("ready");
      }
    },
    [o]
  );
  return U.useEffect(
    function() {
      if (O(), !!o) {
        var M = window.supabase.channel("beta_reward_settings_" + o).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + o
          },
          function() {
            O();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(M);
        };
      }
    },
    [o, O]
  ), {
    rewards: v.items,
    rewardsStatus: v.status,
    rewardsError: v.error,
    reloadRewards: v.reload,
    purchases: r.items,
    purchasesStatus: r.status,
    purchasesError: r.error,
    reloadPurchases: r.reload,
    settings: h,
    settingsStatus: C,
    addReward: function(M, A, x, N) {
      return window.addReward(M, A, x, N);
    },
    updateReward: function(M, A, x, N, H) {
      return window.updateReward(M, A, x, N, H);
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
    updateRewardSystemSettings: function(M, A, x) {
      return window.updateRewardSystemSettings(M, A, x);
    }
  };
}
const $_ = "_card_1tc0o_1", k_ = "_title_1tc0o_7", F_ = "_description_1tc0o_12", W_ = "_badgeRow_1tc0o_19", I_ = "_actions_1tc0o_24", Ru = {
  card: $_,
  title: k_,
  description: F_,
  badgeRow: W_,
  actions: I_
};
function gh({ reward: s, onPurchase: o, onEdit: v, onDelete: r, isAdmin: h }) {
  return /* @__PURE__ */ c.jsxs(xt, { className: Ru.card, children: [
    /* @__PURE__ */ c.jsx("h3", { className: Ru.title, children: s.title }),
    /* @__PURE__ */ c.jsx("p", { className: Ru.description, children: s.description }),
    /* @__PURE__ */ c.jsxs("div", { className: Ru.badgeRow, children: [
      /* @__PURE__ */ c.jsxs(ue, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ c.jsx(ue, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    h ? /* @__PURE__ */ c.jsxs("div", { className: Ru.actions, children: [
      /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: function() {
        v(s);
      }, children: "Edit" }),
      /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
        r(s.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ c.jsx(Z, { onClick: function() {
      o(s.id);
    }, children: "Purchase" })
  ] });
}
const P_ = "_grid_19ohq_1", tp = "_purchasesHeading_19ohq_7", ep = "_purchaseCard_19ohq_11", lp = "_badgeRow_19ohq_15", ap = "_purchaseTitle_19ohq_19", np = "_purchaseMeta_19ohq_24", Ma = {
  grid: P_,
  purchasesHeading: tp,
  purchaseCard: ep,
  badgeRow: lp,
  purchaseTitle: ap,
  purchaseMeta: np
};
function up(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function ip({ rewards: s, rewardsStatus: o, rewardsError: v, onRetry: r, onPurchase: h, purchases: _ }) {
  var C = St(), D = _.filter(function(O) {
    return O.userId === C.currentUser;
  });
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("h2", { children: "Rewards Shop" }),
    o === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading rewards..." }) : o === "error" ? /* @__PURE__ */ c.jsx(zl, { message: v ? v.message : "Failed to load", onRetry: r }) : s.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No rewards available" }) : /* @__PURE__ */ c.jsx("div", { className: Ma.grid, children: s.map(function(O) {
      return /* @__PURE__ */ c.jsx(gh, { reward: O, onPurchase: h }, O.id);
    }) }),
    /* @__PURE__ */ c.jsx("h2", { className: Ma.purchasesHeading, children: "My Reward Purchases" }),
    D.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No purchases yet" }) : D.map(function(O) {
      return /* @__PURE__ */ c.jsxs(xt, { className: Ma.purchaseCard, children: [
        /* @__PURE__ */ c.jsx("div", { className: Ma.badgeRow, children: /* @__PURE__ */ c.jsx(ue, { tone: up(O.status), children: O.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ c.jsx("p", { className: Ma.purchaseTitle, children: O.rewards ? O.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ c.jsxs("p", { className: Ma.purchaseMeta, children: [
          O.purchaseCost,
          " points · ",
          window.formatDate(O.purchaseDate)
        ] }),
        O.status === "denied" && O.notes ? /* @__PURE__ */ c.jsxs("p", { className: Ma.purchaseMeta, children: [
          "Reason: ",
          O.notes
        ] }) : null
      ] }, O.id);
    })
  ] });
}
const cp = "_heading_p82cd_1", sp = "_row_p82cd_6", fp = "_selectGroup_p82cd_16", rp = "_selectLabel_p82cd_23", op = "_select_p82cd_16", dp = "_actions_p82cd_38", wn = {
  heading: cp,
  row: sp,
  selectGroup: fp,
  selectLabel: rp,
  select: op,
  actions: dp
};
var dr = { title: "", description: "", cost: 10, type: "instant" };
function vp({ editingReward: s, onSave: o, onCancelEdit: v }) {
  var [r, h] = U.useState(dr), [_, C] = U.useState(!1);
  U.useEffect(
    function() {
      h(
        s ? {
          title: s.title,
          description: s.description,
          cost: s.cost,
          type: s.type
        } : dr
      );
    },
    [s]
  );
  function D(M, A) {
    h(function(x) {
      return Object.assign({}, x, { [M]: A });
    });
  }
  async function O(M) {
    if (M.preventDefault(), !(!r.title.trim() || !r.cost || Number(r.cost) < 1)) {
      C(!0);
      try {
        await o(r, s ? s.id : null), h(dr);
      } finally {
        C(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: wn.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: O, children: [
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Title",
          value: r.title,
          onChange: function(M) {
            D("title", M.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Description",
          multiline: !0,
          rows: 2,
          value: r.description,
          onChange: function(M) {
            D("description", M.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("div", { className: wn.row, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: r.cost,
            onChange: function(M) {
              D("cost", M.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: wn.selectGroup, children: [
          /* @__PURE__ */ c.jsx("label", { className: wn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ c.jsxs(
            "select",
            {
              className: wn.select,
              value: r.type,
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
      /* @__PURE__ */ c.jsxs("div", { className: wn.actions, children: [
        /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: _, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ c.jsx(Z, { type: "button", variant: "secondary", onClick: v, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const mp = "_heading_26k11_1", hp = "_row_26k11_6", gp = "_checkboxRow_26k11_16", yp = "_readout_26k11_24", _p = "_actions_26k11_30", Rn = {
  heading: mp,
  row: hp,
  checkboxRow: gp,
  readout: yp,
  actions: _p
};
function pp({ settings: s, onSave: o, onReset: v }) {
  var [r, h] = U.useState(s.instantPurchaseLimit || 0), [_, C] = U.useState(s.resetDurationDays || 0), [D, O] = U.useState(s.requiresAuthorizationAfterLimit !== !1);
  U.useEffect(
    function() {
      h(s.instantPurchaseLimit || 0), C(s.resetDurationDays || 0), O(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function M(A) {
    A.preventDefault(), o(Number(r) || 0, Number(_) || 0, D);
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h3", { className: Rn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: M, children: [
      /* @__PURE__ */ c.jsxs("div", { className: Rn.row, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: r,
            onChange: function(A) {
              h(A.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: _,
            onChange: function(A) {
              C(A.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: Rn.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: D,
            onChange: function(A) {
              O(A.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: Rn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: Rn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Rn.actions, children: [
        /* @__PURE__ */ c.jsx(Z, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ c.jsx(Z, { type: "button", variant: "secondary", onClick: v, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const bp = "_card_zkx61_1", Sp = "_title_zkx61_5", Tp = "_meta_zkx61_10", xp = "_actions_zkx61_16", pc = {
  card: bp,
  title: Sp,
  meta: Tp,
  actions: xp
};
function jp({ purchases: s, onAuthorize: o, onDeny: v }) {
  var r = s.filter(function(h) {
    return h.status === "pending_authorization";
  });
  return r.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No pending authorizations" }) : /* @__PURE__ */ c.jsx("div", { children: r.map(function(h) {
    var _ = window.users[h.userId];
    return /* @__PURE__ */ c.jsxs(xt, { className: pc.card, children: [
      /* @__PURE__ */ c.jsxs("p", { className: pc.title, children: [
        h.rewards ? h.rewards.title : "Unknown reward",
        " by",
        " ",
        _ ? _.displayName : h.userId
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: pc.meta, children: [
        h.purchaseCost,
        " points · requested ",
        window.formatDate(h.purchaseDate)
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: pc.actions, children: [
        /* @__PURE__ */ c.jsx(Z, { onClick: function() {
          o(h.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ c.jsx(Z, { variant: "danger", onClick: function() {
          v(h.id);
        }, children: "Deny" })
      ] })
    ] }, h.id);
  }) });
}
const Np = "_heading_1ewsp_1", Ep = "_grid_1ewsp_5", bc = {
  heading: Np,
  grid: Ep
};
function zp({ rewardsState: s }) {
  var [o, v] = U.useState(null);
  async function r(_, C) {
    C ? await s.updateReward(C, _.title, _.description, Number(_.cost), _.type) : await s.addReward(_.title, _.description, Number(_.cost), _.type), v(null);
  }
  function h(_) {
    window.showConfirmModal("Delete this reward?", function(C) {
      C && s.deleteReward(_);
    });
  }
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(
      vp,
      {
        editingReward: o,
        onSave: r,
        onCancelEdit: function() {
          v(null);
        }
      }
    ),
    /* @__PURE__ */ c.jsx("h2", { className: bc.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ c.jsx(ul, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ c.jsx(
      zl,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No rewards defined" }) : /* @__PURE__ */ c.jsx("div", { className: bc.grid, children: s.rewards.map(function(_) {
      return /* @__PURE__ */ c.jsx(
        gh,
        {
          reward: _,
          isAdmin: !0,
          onEdit: v,
          onDelete: h
        },
        _.id
      );
    }) }),
    /* @__PURE__ */ c.jsx("h2", { className: bc.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ c.jsx(
      pp,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ c.jsx("h2", { className: bc.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ c.jsx(
      jp,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function Ap() {
  var s = St(), o = J_();
  return s.isMaster ? /* @__PURE__ */ c.jsx(zp, { rewardsState: o }) : /* @__PURE__ */ c.jsx(
    ip,
    {
      rewards: o.rewards,
      rewardsStatus: o.rewardsStatus,
      rewardsError: o.rewardsError,
      onRetry: o.reloadRewards,
      onPurchase: o.purchaseReward,
      purchases: o.purchases
    }
  );
}
const Cp = "_heading_pc1l6_1", Dp = "_form_pc1l6_11", Op = "_row_pc1l6_33", Mp = "_statusMessage_pc1l6_51", Uu = {
  heading: Cp,
  form: Dp,
  row: Op,
  statusMessage: Mp
};
function wp() {
  var s = St(), o = _r(), [v, r] = U.useState({ username: "", password: "", displayName: "" }), [h, _] = U.useState(!1);
  function C(A, x) {
    r(function(N) {
      return Object.assign({}, N, { [A]: x });
    });
  }
  async function D(A) {
    A.preventDefault(), _(!0);
    try {
      await window.addNewPig(v), r({ username: "", password: "", displayName: "" }), o.reload();
    } finally {
      _(!1);
    }
  }
  function O(A) {
    window.deactivatePig(A);
  }
  function M(A) {
    window.reactivatePig(A);
  }
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsxs(xt, { children: [
      /* @__PURE__ */ c.jsxs("h2", { className: Uu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ c.jsxs("form", { className: Uu.form, onSubmit: D, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Username",
            value: v.username,
            onChange: function(A) {
              C("username", A.target.value);
            },
            placeholder: "lowercase, min 3 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Password",
            type: "password",
            value: v.password,
            onChange: function(A) {
              C("password", A.target.value);
            },
            placeholder: "min 4 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Display name",
            value: v.displayName,
            onChange: function(A) {
              C("displayName", A.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ c.jsxs(Z, { type: "submit", loading: h, children: [
          "Add ",
          s.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs("h2", { className: Uu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    o.allSlaves.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : o.allSlaves.map(function(A) {
      var x = A.status === "active";
      return /* @__PURE__ */ c.jsxs(xt, { className: Uu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx(ue, { tone: x ? "success" : "neutral", children: x ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ c.jsx("strong", { children: A.displayName }),
          " (",
          A.username,
          ") ·",
          " ",
          A.points,
          " pts",
          A.statusMessage ? /* @__PURE__ */ c.jsxs("span", { className: Uu.statusMessage, children: [
            " · ",
            A.statusMessage
          ] }) : null
        ] }),
        x ? /* @__PURE__ */ c.jsx(
          Z,
          {
            variant: "danger",
            onClick: function() {
              O(A.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ c.jsx(
          Z,
          {
            onClick: function() {
              M(A.username);
            },
            children: "Reactivate"
          }
        )
      ] }, A.username);
    })
  ] });
}
function Rp(s, o) {
  return new Date(o.created_at) - new Date(s.created_at);
}
function Up() {
  var s = St(), o = El({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: Rp
  }), v = U.useCallback(async function() {
    await window.generateInvite(), o.reload();
  }, [o]), r = U.useCallback(
    async function(h) {
      await window.revokeInvite(h), o.reload();
    },
    [o]
  );
  return {
    invites: o.items,
    status: o.status,
    error: o.error,
    reload: o.reload,
    generateInvite: v,
    revokeInvite: r
  };
}
const Hp = "_heading_1pok1_1", qp = "_hint_1pok1_11", Bp = "_row_1pok1_23", Yp = "_actions_1pok1_45", Hu = {
  heading: Hp,
  hint: qp,
  row: Bp,
  actions: Yp
};
function Lp(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function Gp() {
  var s = St(), o = Up(), [v, r] = U.useState(null);
  function h(_) {
    navigator.clipboard.writeText(window.buildInviteLink(_)), r(_), setTimeout(function() {
      r(null);
    }, 2e3);
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: Hu.heading, children: "Invites" }),
    /* @__PURE__ */ c.jsxs("p", { className: Hu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ c.jsx(Z, { onClick: o.generateInvite, children: "Generate Invite Link" }),
    o.status === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading invites..." }) : null,
    o.status === "error" ? /* @__PURE__ */ c.jsx(
      zl,
      {
        message: "Couldn't load invites: " + (o.error ? o.error.message : "unknown error"),
        onRetry: o.reload
      }
    ) : null,
    o.status === "ready" && o.invites.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No invites generated yet" }) : null,
    o.status === "ready" && o.invites.length > 0 ? o.invites.map(function(_) {
      var C = _.status === "pending" && _.expires_at && new Date(_.expires_at) < /* @__PURE__ */ new Date(), D = C ? "expired" : _.status, O = _.status === "pending" && !C;
      return /* @__PURE__ */ c.jsxs("div", { className: Hu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsx(ue, { tone: Lp(D), children: D.charAt(0).toUpperCase() + D.slice(1) }),
          " ",
          /* @__PURE__ */ c.jsx("code", { children: _.code }),
          _.redeemed_by ? /* @__PURE__ */ c.jsxs("span", { className: Hu.hint, children: [
            " · redeemed by ",
            _.redeemed_by
          ] }) : null
        ] }),
        O ? /* @__PURE__ */ c.jsxs("div", { className: Hu.actions, children: [
          /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: function() {
            h(_.code);
          }, children: v === _.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "danger",
              onClick: function() {
                o.revokeInvite(_.code);
              },
              children: "Revoke"
            }
          )
        ] }) : null
      ] }, _.id);
    }) : null
  ] });
}
function Xp(s, o) {
  return s.position - o.position;
}
function yh() {
  var s = St(), o = s.activeMasterContext, v = El({
    table: "motd_messages",
    masterUsername: o,
    sort: Xp
  }), r = El({
    table: "motd_state",
    masterUsername: o
  }), h = v.items, _ = r.items[0], C = _ ? _.current_index : 0, D = h.length > 0 ? h[C % h.length] : null;
  return {
    messages: h,
    currentMessage: D,
    status: v.status,
    error: v.error,
    reload: function() {
      v.reload(), r.reload();
    },
    addMessage: async function(O) {
      await window.addMotdMessage({ body: O });
    },
    deleteMessage: async function(O) {
      await window.deleteMotdMessage(O);
    },
    moveUp: async function(O) {
      await window.moveMotdMessageUp(O);
    },
    moveDown: async function(O) {
      await window.moveMotdMessageDown(O);
    }
  };
}
const Qp = "_form_7nlkd_1", Zp = {
  form: Qp
};
function Vp({ onAdd: s }) {
  var [o, v] = U.useState(""), [r, h] = U.useState(!1);
  async function _(C) {
    C.preventDefault();
    var D = o.trim();
    if (D) {
      h(!0);
      try {
        await s(D), v("");
      } finally {
        h(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs("form", { className: Zp.form, onSubmit: _, children: [
    /* @__PURE__ */ c.jsx(
      ht,
      {
        multiline: !0,
        rows: 2,
        value: o,
        onChange: function(C) {
          v(C.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: r, disabled: !o.trim(), children: "Add Message" })
  ] });
}
const Kp = "_heading_10ijk_1", Jp = "_row_10ijk_11", $p = "_actions_10ijk_33", vr = {
  heading: Kp,
  row: Jp,
  actions: $p
};
function kp() {
  var s = yh();
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: vr.heading, children: "Message of the Day" }),
    /* @__PURE__ */ c.jsx(Vp, { onAdd: s.addMessage }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading messages..." }) : null,
    s.status === "error" ? /* @__PURE__ */ c.jsx(
      zl,
      {
        message: "Couldn't load messages: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" && s.messages.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No messages added yet" }) : null,
    s.status === "ready" && s.messages.length > 0 ? s.messages.map(function(o, v) {
      var r = v === 0, h = v === s.messages.length - 1, _ = s.currentMessage && s.currentMessage.id === o.id;
      return /* @__PURE__ */ c.jsxs("div", { className: vr.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          _ ? /* @__PURE__ */ c.jsx(ue, { tone: "success", children: "Showing now" }) : null,
          " ",
          o.body
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: vr.actions, children: [
          /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "secondary",
              disabled: r,
              onClick: function() {
                s.moveUp(o.id);
              },
              children: "↑"
            }
          ),
          /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "secondary",
              disabled: h,
              onClick: function() {
                s.moveDown(o.id);
              },
              children: "↓"
            }
          ),
          /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "danger",
              onClick: function() {
                s.deleteMessage(o.id);
              },
              children: "Delete"
            }
          )
        ] })
      ] }, o.id);
    }) : null
  ] });
}
function Fp() {
  return /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(wp, {}),
    /* @__PURE__ */ c.jsx(Gp, {}),
    /* @__PURE__ */ c.jsx(kp, {})
  ] });
}
function Wp() {
  var s = St(), [o, v] = U.useState([]), [r, h] = U.useState("loading"), _ = U.useCallback(async function() {
    h("loading");
    var C = await window.fetchAllMasters();
    v(C || []), h("ready");
  }, []);
  return U.useEffect(
    function() {
      s.isAdmin && _();
    },
    [s.isAdmin, _]
  ), {
    masters: o,
    status: r,
    reload: _,
    createMaster: window.createMaster,
    updateMasterTerminology: window.updateMasterTerminology,
    updateMasterAccount: window.updateMasterAccount,
    deactivateMaster: function(C) {
      return new Promise(function(D) {
        window.showConfirmModal(
          "Deactivate master '" + C + "'? They (and their group) won't be able to log in.",
          async function(O) {
            O && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", C), window.showNotification("Master deactivated.", "success"), await _()), D();
          }
        );
      });
    },
    reactivateMaster: async function(C) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", C), window.showNotification("Master reactivated.", "success"), await _();
    }
  };
}
const Ip = "_list_1yv13_1", Pp = "_row_1yv13_10", tb = "_ratio_1yv13_18", mr = {
  list: Ip,
  row: Pp,
  ratio: tb
};
function eb({ theme: s }) {
  if (!window.ContrastUtils) return null;
  var o = window.ContrastUtils.checkThemeContrast(s);
  return /* @__PURE__ */ c.jsx("ul", { className: mr.list, children: o.map(function(v) {
    return /* @__PURE__ */ c.jsxs("li", { className: mr.row, children: [
      /* @__PURE__ */ c.jsx("span", { children: v.label }),
      /* @__PURE__ */ c.jsxs("span", { className: mr.ratio, children: [
        v.ratio ? v.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        v.required,
        ":1)"
      ] }),
      /* @__PURE__ */ c.jsx(ue, { tone: v.passes ? "success" : "danger", children: v.passes ? "Pass" : "Fail" })
    ] }, v.label);
  }) });
}
const lb = "_heading_1sy2j_1", ab = "_row_1sy2j_6", nb = "_checkboxRow_1sy2j_16", ub = "_divider_1sy2j_24", ib = "_colorRow_1sy2j_29", cb = "_colorField_1sy2j_36", sb = "_actions_1sy2j_53", Nl = {
  heading: lb,
  row: ab,
  checkboxRow: nb,
  divider: ub,
  colorRow: ib,
  colorField: cb,
  actions: sb
};
var fb = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
};
function sh(s) {
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
    betaUiEnabled: s ? s.betaUiEnabled : !1,
    theme: s ? s.theme : fb
  };
}
function fh({ master: s, onCreate: o, onSaveExisting: v, onCancel: r }) {
  var [h, _] = U.useState(sh(s)), [C, D] = U.useState(!1), O = !!s;
  function M(N, H) {
    _(function($) {
      return Object.assign({}, $, { [N]: H });
    });
  }
  function A(N, H) {
    _(function($) {
      return Object.assign({}, $, { theme: Object.assign({}, $.theme, { [N]: H }) });
    });
  }
  async function x(N) {
    N.preventDefault(), D(!0);
    try {
      O ? await v(s.username, h) : (await o(h), _(sh(null)));
    } finally {
      D(!1);
    }
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: Nl.heading, children: O ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ c.jsxs("form", { onSubmit: x, children: [
      O ? null : /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Username",
          value: h.username,
          onChange: function(N) {
            M("username", N.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: O ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: h.password,
          onChange: function(N) {
            M("password", N.target.value);
          },
          required: !O
        }
      ),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Display name",
          value: h.displayName,
          onChange: function(N) {
            M("displayName", N.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: Nl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: h.isAdmin,
            onChange: function(N) {
              M("isAdmin", N.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Nl.row, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: h.groupLabel,
            onChange: function(N) {
              M("groupLabel", N.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: h.masterLabel,
            onChange: function(N) {
              M("masterLabel", N.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: Nl.row, children: [
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Master label (plural)",
            value: h.masterLabelPlural,
            onChange: function(N) {
              M("masterLabelPlural", N.target.value);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(
          ht,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: h.slaveLabel,
            onChange: function(N) {
              M("slaveLabel", N.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ c.jsx(
        ht,
        {
          label: "Slave label (plural)",
          value: h.slaveLabelPlural,
          onChange: function(N) {
            M("slaveLabelPlural", N.target.value);
          }
        }
      ),
      /* @__PURE__ */ c.jsx("hr", { className: Nl.divider }),
      /* @__PURE__ */ c.jsxs("label", { className: Nl.checkboxRow, children: [
        /* @__PURE__ */ c.jsx(
          "input",
          {
            type: "checkbox",
            checked: h.betaUiEnabled,
            onChange: function(N) {
              M("betaUiEnabled", N.target.checked);
            }
          }
        ),
        "Enable React beta dashboard for this group"
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: Nl.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(N) {
        var H = N[0], $ = N[1];
        return /* @__PURE__ */ c.jsxs("label", { className: Nl.colorField, children: [
          $,
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "color",
              value: h.theme[H],
              onChange: function(it) {
                A(H, it.target.value);
              }
            }
          )
        ] }, H);
      }) }),
      /* @__PURE__ */ c.jsx(eb, { theme: h.theme }),
      /* @__PURE__ */ c.jsxs("div", { className: Nl.actions, children: [
        /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: C, children: O ? "Save changes" : "Create master" }),
        O ? /* @__PURE__ */ c.jsx(Z, { type: "button", variant: "secondary", onClick: r, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const rb = "_heading_vrwe0_1", ob = "_row_vrwe0_5", db = "_badgeRow_vrwe0_14", vb = "_meta_vrwe0_20", mb = "_actions_vrwe0_26", qu = {
  heading: rb,
  row: ob,
  badgeRow: db,
  meta: vb,
  actions: mb
};
function hb() {
  var s = Wp(), [o, v] = U.useState(null);
  async function r(_) {
    var C = await s.createMaster(_);
    C && await s.reload();
  }
  async function h(_, C) {
    await s.updateMasterAccount(_, {
      displayName: C.displayName,
      password: C.password,
      isAdmin: C.isAdmin
    }), await s.updateMasterTerminology(_, C), v(null), await s.reload();
  }
  return o ? /* @__PURE__ */ c.jsx(
    fh,
    {
      master: o,
      onSaveExisting: h,
      onCancel: function() {
        v(null);
      }
    }
  ) : /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx(fh, { onCreate: r }),
    /* @__PURE__ */ c.jsx("h2", { className: qu.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ul, {}) : s.masters.length === 0 ? /* @__PURE__ */ c.jsx(te, { title: "No masters yet" }) : s.masters.map(function(_) {
      var C = _.status === "active";
      return /* @__PURE__ */ c.jsxs(xt, { className: qu.row, children: [
        /* @__PURE__ */ c.jsxs("div", { children: [
          /* @__PURE__ */ c.jsxs("div", { className: qu.badgeRow, children: [
            /* @__PURE__ */ c.jsx(ue, { tone: C ? "success" : "neutral", children: C ? "Active" : "Inactive" }),
            _.isAdmin ? /* @__PURE__ */ c.jsx(ue, { tone: "warning", children: "Admin" }) : null,
            _.betaUiEnabled ? /* @__PURE__ */ c.jsx(ue, { tone: "success", children: "Beta UI" }) : null
          ] }),
          /* @__PURE__ */ c.jsx("strong", { children: _.displayName }),
          " (",
          _.username,
          ")",
          /* @__PURE__ */ c.jsxs("div", { className: qu.meta, children: [
            "Group: ",
            _.groupLabel,
            " · ",
            _.masterLabel,
            " / ",
            _.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: qu.actions, children: [
          /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "secondary",
              onClick: function() {
                v(_);
              },
              children: "Edit"
            }
          ),
          C ? /* @__PURE__ */ c.jsx(
            Z,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(_.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ c.jsx(
            Z,
            {
              onClick: function() {
                s.reactivateMaster(_.username);
              },
              children: "Reactivate"
            }
          )
        ] })
      ] }, _.username);
    })
  ] });
}
var Sc = 100;
function gb() {
  var s = St(), o = s.activeMasterContext, [v, r] = U.useState([]), [h, _] = U.useState("loading"), [C, D] = U.useState(null), [O, M] = U.useState(!1), A = U.useCallback(
    async function() {
      if (!o) {
        r([]), _("ready");
        return;
      }
      _("loading"), D(null);
      var H = await window.supabase.from("chat_messages").select("*").eq("master_username", o).order("created_at", { ascending: !1 }).limit(Sc);
      if (H.error) {
        D(H.error), _("error");
        return;
      }
      var $ = (H.data || []).slice().reverse();
      r($), M((H.data || []).length === Sc), _("ready");
    },
    [o]
  ), x = U.useCallback(
    async function() {
      r(function(H) {
        if (H.length === 0) return H;
        var $ = H[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", o).lt("created_at", $.created_at).order("created_at", { ascending: !1 }).limit(Sc).then(function(it) {
          if (!it.error) {
            var tt = (it.data || []).slice().reverse();
            M((it.data || []).length === Sc), r(function(wt) {
              return tt.concat(wt);
            });
          }
        }), H;
      });
    },
    [o]
  ), N = U.useCallback(
    async function(H) {
      await window.sendChatMessage({ body: H });
    },
    []
  );
  return U.useEffect(
    function() {
      if (A(), !!o) {
        var H = window.supabase.channel("beta_chat_messages_" + o).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + o
          },
          function($) {
            r(function(it) {
              return it.concat([$.new]);
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(H);
        };
      }
    },
    [o, A]
  ), {
    messages: v,
    status: h,
    error: C,
    hasMoreOlder: O,
    loadOlder: x,
    sendMessage: N,
    reload: A
  };
}
const yb = "_row_gqneb_1", _b = "_meta_gqneb_19", pb = "_status_gqneb_35", bb = "_time_gqneb_43", Sb = "_body_gqneb_51", Bu = {
  row: yb,
  meta: _b,
  status: pb,
  time: bb,
  body: Sb
};
function Tb({ message: s }) {
  var o = window.users[s.sender_username], v = o ? o.displayName : s.sender_username, r = o && o.statusMessage ? o.statusMessage : "";
  return /* @__PURE__ */ c.jsxs("div", { className: Bu.row, children: [
    /* @__PURE__ */ c.jsxs("div", { className: Bu.meta, children: [
      /* @__PURE__ */ c.jsx("strong", { children: v }),
      r ? /* @__PURE__ */ c.jsxs("span", { className: Bu.status, children: [
        " ",
        r
      ] }) : null,
      /* @__PURE__ */ c.jsx("span", { className: Bu.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: Bu.body, children: s.body })
  ] });
}
const xb = "_form_nndvu_1", jb = "_input_nndvu_13", rh = {
  form: xb,
  input: jb
};
function Nb({ onSend: s }) {
  var [o, v] = U.useState(""), [r, h] = U.useState(!1);
  async function _(C) {
    C.preventDefault();
    var D = o.trim();
    if (D) {
      h(!0);
      try {
        await s(D), v("");
      } finally {
        h(!1);
      }
    }
  }
  return /* @__PURE__ */ c.jsxs("form", { className: rh.form, onSubmit: _, children: [
    /* @__PURE__ */ c.jsx(
      "input",
      {
        className: rh.input,
        value: o,
        onChange: function(C) {
          v(C.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ c.jsx(Z, { type: "submit", loading: r, disabled: !o.trim(), children: "Send" })
  ] });
}
const Eb = "_heading_12c2o_1", zb = "_loadOlder_12c2o_11", Ab = "_list_12c2o_19", hr = {
  heading: Eb,
  loadOlder: zb,
  list: Ab
};
function Cb() {
  var s = gb(), o = U.useRef(null), v = U.useRef(!0);
  U.useEffect(
    function() {
      var h = o.current;
      h && v.current && (h.scrollTop = h.scrollHeight);
    },
    [s.messages]
  );
  function r() {
    var h = o.current;
    h && (v.current = h.scrollHeight - h.scrollTop - h.clientHeight < 80);
  }
  return /* @__PURE__ */ c.jsxs(xt, { children: [
    /* @__PURE__ */ c.jsx("h2", { className: hr.heading, children: "Group Chat" }),
    s.status === "loading" ? /* @__PURE__ */ c.jsx(ul, { label: "Loading chat..." }) : null,
    s.status === "error" ? /* @__PURE__ */ c.jsx(
      zl,
      {
        message: "Couldn't load chat: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      s.hasMoreOlder ? /* @__PURE__ */ c.jsx(Z, { variant: "secondary", onClick: s.loadOlder, className: hr.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ c.jsx("div", { className: hr.list, ref: o, onScroll: r, children: s.messages.length === 0 ? /* @__PURE__ */ c.jsx(te, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(h) {
        return /* @__PURE__ */ c.jsx(Tb, { message: h }, h.id);
      }) }),
      /* @__PURE__ */ c.jsx(Nb, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
const Db = "_banner_7xh6r_1", Ob = {
  banner: Db
};
function Mb() {
  var s = St(), o = mh();
  return !s.isSlave || o.trackers.length === 0 ? null : /* @__PURE__ */ c.jsx("div", { className: Ob.banner, children: /* @__PURE__ */ c.jsx(hh, { tracker: o.trackers[0], isAdmin: !1 }) });
}
const wb = "_banner_znl1a_1", Rb = {
  banner: wb
};
function Ub() {
  var s = St(), o = yh();
  return !s.isSlave || !o.currentMessage ? null : /* @__PURE__ */ c.jsxs("div", { className: Rb.banner, children: [
    /* @__PURE__ */ c.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    o.currentMessage.body
  ] });
}
function Hb({ activeTab: s }) {
  var o = St();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ c.jsx(M1, {});
    case "calendar":
      return /* @__PURE__ */ c.jsx(Y1, {});
    case "dashboard":
      return o.isMaster ? /* @__PURE__ */ c.jsx(w_, {}) : null;
    case "suggest":
      return /* @__PURE__ */ c.jsx(Z_, {});
    case "shop":
      return /* @__PURE__ */ c.jsx(Ap, {});
    case "chat":
      return /* @__PURE__ */ c.jsx(Cb, {});
    case "admin":
      return o.isMaster ? /* @__PURE__ */ c.jsx(Fp, {}) : null;
    case "masters":
      return o.isAdmin ? /* @__PURE__ */ c.jsx(hb, {}) : null;
    default:
      return null;
  }
}
function qb() {
  var s = St(), [o, v] = U.useState("tasks"), r = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "betaApp", style: r, children: [
    /* @__PURE__ */ c.jsx($0, {}),
    /* @__PURE__ */ c.jsx(I0, { activeTab: o, onChange: v }),
    /* @__PURE__ */ c.jsxs("main", { className: "betaContainer", children: [
      /* @__PURE__ */ c.jsx(Ub, {}),
      /* @__PURE__ */ c.jsx(Hb, { activeTab: o })
    ] }),
    /* @__PURE__ */ c.jsx(Mb, {})
  ] });
}
function Bb() {
  return /* @__PURE__ */ c.jsx(j0, { children: /* @__PURE__ */ c.jsx(qb, {}) });
}
var Un = null;
function Yb(s) {
  Un || (Un = x0.createRoot(s), Un.render(/* @__PURE__ */ c.jsx(Bb, {})));
}
function Lb() {
  Un && (Un.unmount(), Un = null);
}
export {
  Yb as mountBetaApp,
  Lb as unmountBetaApp
};
