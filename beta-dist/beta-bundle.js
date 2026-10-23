var So = { exports: {} }, Hu = {};
var ih;
function D0() {
  if (ih) return Hu;
  ih = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, h) {
    var j = null;
    if (h !== void 0 && (j = "" + h), v.key !== void 0 && (j = "" + v.key), "key" in v) {
      h = {};
      for (var A in v)
        A !== "key" && (h[A] = v[A]);
    } else h = v;
    return v = h.ref, {
      $$typeof: s,
      type: o,
      key: j,
      ref: v !== void 0 ? v : null,
      props: h
    };
  }
  return Hu.Fragment = r, Hu.jsx = d, Hu.jsxs = d, Hu;
}
var sh;
function R0() {
  return sh || (sh = 1, So.exports = D0()), So.exports;
}
var i = R0(), bo = { exports: {} }, Lu = {}, xo = { exports: {} }, jo = {};
var ch;
function M0() {
  return ch || (ch = 1, function(s) {
    function r(Q, B) {
      var X = Q.length;
      Q.push(B);
      e: for (; 0 < X; ) {
        var ce = X - 1 >>> 1, he = Q[ce];
        if (0 < v(he, B))
          Q[ce] = B, Q[X] = he, X = ce;
        else break e;
      }
    }
    function d(Q) {
      return Q.length === 0 ? null : Q[0];
    }
    function o(Q) {
      if (Q.length === 0) return null;
      var B = Q[0], X = Q.pop();
      if (X !== B) {
        Q[0] = X;
        e: for (var ce = 0, he = Q.length, ot = he >>> 1; ce < ot; ) {
          var Sa = 2 * (ce + 1) - 1, gl = Q[Sa], p = Sa + 1, H = Q[p];
          if (0 > v(gl, X))
            p < he && 0 > v(H, gl) ? (Q[ce] = H, Q[p] = X, ce = p) : (Q[ce] = gl, Q[Sa] = X, ce = Sa);
          else if (p < he && 0 > v(H, X))
            Q[ce] = H, Q[p] = X, ce = p;
          else break e;
        }
      }
      return B;
    }
    function v(Q, B) {
      var X = Q.sortIndex - B.sortIndex;
      return X !== 0 ? X : Q.id - B.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      s.unstable_now = function() {
        return h.now();
      };
    } else {
      var j = Date, A = j.now();
      s.unstable_now = function() {
        return j.now() - A;
      };
    }
    var N = [], D = [], b = 1, y = null, z = 3, R = !1, U = !1, L = !1, q = !1, J = typeof setTimeout == "function" ? setTimeout : null, oe = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function xe(Q) {
      for (var B = d(D); B !== null; ) {
        if (B.callback === null) o(D);
        else if (B.startTime <= Q)
          o(D), B.sortIndex = B.expirationTime, r(N, B);
        else break;
        B = d(D);
      }
    }
    function Ge(Q) {
      if (L = !1, xe(Q), !U)
        if (d(N) !== null)
          U = !0, ee || (ee = !0, Xe());
        else {
          var B = d(D);
          B !== null && Le(Ge, B.startTime - Q);
        }
    }
    var ee = !1, I = -1, ne = 5, ke = -1;
    function Fe() {
      return q ? !0 : !(s.unstable_now() - ke < ne);
    }
    function De() {
      if (q = !1, ee) {
        var Q = s.unstable_now();
        ke = Q;
        var B = !0;
        try {
          e: {
            U = !1, L && (L = !1, oe(I), I = -1), R = !0;
            var X = z;
            try {
              t: {
                for (xe(Q), y = d(N); y !== null && !(y.expirationTime > Q && Fe()); ) {
                  var ce = y.callback;
                  if (typeof ce == "function") {
                    y.callback = null, z = y.priorityLevel;
                    var he = ce(
                      y.expirationTime <= Q
                    );
                    if (Q = s.unstable_now(), typeof he == "function") {
                      y.callback = he, xe(Q), B = !0;
                      break t;
                    }
                    y === d(N) && o(N), xe(Q);
                  } else o(N);
                  y = d(N);
                }
                if (y !== null) B = !0;
                else {
                  var ot = d(D);
                  ot !== null && Le(
                    Ge,
                    ot.startTime - Q
                  ), B = !1;
                }
              }
              break e;
            } finally {
              y = null, z = X, R = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Xe() : ee = !1;
        }
      }
    }
    var Xe;
    if (typeof V == "function")
      Xe = function() {
        V(De);
      };
    else if (typeof MessageChannel < "u") {
      var te = new MessageChannel(), We = te.port2;
      te.port1.onmessage = De, Xe = function() {
        We.postMessage(null);
      };
    } else
      Xe = function() {
        J(De, 0);
      };
    function Le(Q, B) {
      I = J(function() {
        Q(s.unstable_now());
      }, B);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(Q) {
      Q.callback = null;
    }, s.unstable_forceFrameRate = function(Q) {
      0 > Q || 125 < Q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ne = 0 < Q ? Math.floor(1e3 / Q) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, s.unstable_next = function(Q) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = z;
      }
      var X = z;
      z = B;
      try {
        return Q();
      } finally {
        z = X;
      }
    }, s.unstable_requestPaint = function() {
      q = !0;
    }, s.unstable_runWithPriority = function(Q, B) {
      switch (Q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Q = 3;
      }
      var X = z;
      z = Q;
      try {
        return B();
      } finally {
        z = X;
      }
    }, s.unstable_scheduleCallback = function(Q, B, X) {
      var ce = s.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? ce + X : ce) : X = ce, Q) {
        case 1:
          var he = -1;
          break;
        case 2:
          he = 250;
          break;
        case 5:
          he = 1073741823;
          break;
        case 4:
          he = 1e4;
          break;
        default:
          he = 5e3;
      }
      return he = X + he, Q = {
        id: b++,
        callback: B,
        priorityLevel: Q,
        startTime: X,
        expirationTime: he,
        sortIndex: -1
      }, X > ce ? (Q.sortIndex = X, r(D, Q), d(N) === null && Q === d(D) && (L ? (oe(I), I = -1) : L = !0, Le(Ge, X - ce))) : (Q.sortIndex = he, r(N, Q), U || R || (U = !0, ee || (ee = !0, Xe()))), Q;
    }, s.unstable_shouldYield = Fe, s.unstable_wrapCallback = function(Q) {
      var B = z;
      return function() {
        var X = z;
        z = B;
        try {
          return Q.apply(this, arguments);
        } finally {
          z = X;
        }
      };
    };
  }(jo)), jo;
}
var rh;
function O0() {
  return rh || (rh = 1, xo.exports = M0()), xo.exports;
}
var To = { exports: {} }, le = {};
var oh;
function U0() {
  if (oh) return le;
  oh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), j = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), z = Symbol.for("react.view_transition"), R = Symbol.iterator;
  function U(p) {
    return p === null || typeof p != "object" ? null : (p = R && p[R] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var L = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, q = Object.assign, J = {};
  function oe(p, H, F) {
    this.props = p, this.context = H, this.refs = J, this.updater = F || L;
  }
  oe.prototype.isReactComponent = {}, oe.prototype.setState = function(p, H) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, H, "setState");
  }, oe.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function V() {
  }
  V.prototype = oe.prototype;
  function xe(p, H, F) {
    this.props = p, this.context = H, this.refs = J, this.updater = F || L;
  }
  var Ge = xe.prototype = new V();
  Ge.constructor = xe, q(Ge, oe.prototype), Ge.isPureReactComponent = !0;
  var ee = Array.isArray;
  function I() {
  }
  var ne = { H: null, A: null, T: null, S: null }, ke = Object.prototype.hasOwnProperty;
  function Fe(p, H, F) {
    var W = F.ref;
    return {
      $$typeof: s,
      type: p,
      key: H,
      ref: W !== void 0 ? W : null,
      props: F
    };
  }
  function De(p, H) {
    return Fe(p.type, H, p.props);
  }
  function Xe(p) {
    return typeof p == "object" && p !== null && p.$$typeof === s;
  }
  function te(p) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(F) {
      return H[F];
    });
  }
  var We = /\/+/g;
  function Le(p, H) {
    return typeof p == "object" && p !== null && p.key != null ? te("" + p.key) : H.toString(36);
  }
  function Q(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(I, I) : (p.status = "pending", p.then(
          function(H) {
            p.status === "pending" && (p.status = "fulfilled", p.value = H);
          },
          function(H) {
            p.status === "pending" && (p.status = "rejected", p.reason = H);
          }
        )), p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function B(p, H, F, W, _e) {
    var Se = typeof p;
    (Se === "undefined" || Se === "boolean") && (p = null);
    var je = !1;
    if (p === null) je = !0;
    else
      switch (Se) {
        case "bigint":
        case "string":
        case "number":
          je = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case s:
            case r:
              je = !0;
              break;
            case b:
              return je = p._init, B(
                je(p._payload),
                H,
                F,
                W,
                _e
              );
          }
      }
    if (je)
      return _e = _e(p), je = W === "" ? "." + Le(p, 0) : W, ee(_e) ? (F = "", je != null && (F = je.replace(We, "$&/") + "/"), B(_e, H, F, "", function(ba) {
        return ba;
      })) : _e != null && (Xe(_e) && (_e = De(
        _e,
        F + (_e.key == null || p && p.key === _e.key ? "" : ("" + _e.key).replace(
          We,
          "$&/"
        ) + "/") + je
      )), H.push(_e)), 1;
    je = 0;
    var k = W === "" ? "." : W + ":";
    if (ee(p))
      for (var ae = 0; ae < p.length; ae++)
        W = p[ae], Se = k + Le(W, ae), je += B(
          W,
          H,
          F,
          Se,
          _e
        );
    else if (ae = U(p), typeof ae == "function")
      for (p = ae.call(p), ae = 0; !(W = p.next()).done; )
        W = W.value, Se = k + Le(W, ae++), je += B(
          W,
          H,
          F,
          Se,
          _e
        );
    else if (Se === "object") {
      if (typeof p.then == "function")
        return B(
          Q(p),
          H,
          F,
          W,
          _e
        );
      throw H = String(p), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return je;
  }
  function X(p, H, F) {
    if (p == null) return p;
    var W = [], _e = 0;
    return B(p, W, "", "", function(Se) {
      return H.call(F, Se, _e++);
    }), W;
  }
  function ce(p) {
    if (p._status === -1) {
      var H = p._result, F = H();
      F.then(
        function(W) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = W, F.status === void 0 && (F.status = "fulfilled", F.value = W));
        },
        function(W) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = W, F.status === void 0 && (F.status = "rejected", F.reason = W));
        }
      ), p._status === -1 && (p._status = 0, p._result = F);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var he = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  };
  function ot(p) {
    var H = ne.T, F = {};
    F.types = H !== null ? H.types : null, ne.T = F;
    try {
      var W = p(), _e = ne.S;
      _e !== null && _e(F, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then(I, he);
    } catch (Se) {
      he(Se);
    } finally {
      H !== null && F.types !== null && (H.types = F.types), ne.T = H;
    }
  }
  function Sa(p) {
    var H = ne.T;
    if (H !== null) {
      var F = H.types;
      F === null ? H.types = [p] : F.indexOf(p) === -1 && F.push(p);
    } else ot(Sa.bind(null, p));
  }
  var gl = {
    map: X,
    forEach: function(p, H, F) {
      X(
        p,
        function() {
          H.apply(this, arguments);
        },
        F
      );
    },
    count: function(p) {
      var H = 0;
      return X(p, function() {
        H++;
      }), H;
    },
    toArray: function(p) {
      return X(p, function(H) {
        return H;
      }) || [];
    },
    only: function(p) {
      if (!Xe(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return le.Activity = y, le.Children = gl, le.Component = oe, le.Fragment = d, le.Profiler = v, le.PureComponent = xe, le.StrictMode = o, le.Suspense = N, le.ViewTransition = z, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return ne.H.useMemoCache(p);
    }
  }, le.addTransitionType = Sa, le.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, le.cacheSignal = function() {
    return null;
  }, le.cloneElement = function(p, H, F) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var W = q({}, p.props), _e = p.key;
    if (H != null)
      for (Se in H.key !== void 0 && (_e = "" + H.key), H)
        !ke.call(H, Se) || Se === "key" || Se === "__self" || Se === "__source" || Se === "ref" && H.ref === void 0 || (W[Se] = H[Se]);
    var Se = arguments.length - 2;
    if (Se === 1) W.children = F;
    else if (1 < Se) {
      for (var je = Array(Se), k = 0; k < Se; k++)
        je[k] = arguments[k + 2];
      W.children = je;
    }
    return Fe(p.type, _e, W);
  }, le.createContext = function(p) {
    return p = {
      $$typeof: j,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: h,
      _context: p
    }, p;
  }, le.createElement = function(p, H, F) {
    var W, _e = {}, Se = null;
    if (H != null)
      for (W in H.key !== void 0 && (Se = "" + H.key), H)
        ke.call(H, W) && W !== "key" && W !== "__self" && W !== "__source" && (_e[W] = H[W]);
    var je = arguments.length - 2;
    if (je === 1) _e.children = F;
    else if (1 < je) {
      for (var k = Array(je), ae = 0; ae < je; ae++)
        k[ae] = arguments[ae + 2];
      _e.children = k;
    }
    if (p && p.defaultProps)
      for (W in je = p.defaultProps, je)
        _e[W] === void 0 && (_e[W] = je[W]);
    return Fe(p, Se, _e);
  }, le.createRef = function() {
    return { current: null };
  }, le.forwardRef = function(p) {
    return { $$typeof: A, render: p };
  }, le.isValidElement = Xe, le.lazy = function(p) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: p },
      _init: ce
    };
  }, le.memo = function(p, H) {
    return {
      $$typeof: D,
      type: p,
      compare: H === void 0 ? null : H
    };
  }, le.startTransition = ot, le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, le.use = function(p) {
    return ne.H.use(p);
  }, le.useActionState = function(p, H, F) {
    return ne.H.useActionState(p, H, F);
  }, le.useCallback = function(p, H) {
    return ne.H.useCallback(p, H);
  }, le.useContext = function(p) {
    return ne.H.useContext(p);
  }, le.useDebugValue = function() {
  }, le.useDeferredValue = function(p, H) {
    return ne.H.useDeferredValue(p, H);
  }, le.useEffect = function(p, H) {
    return ne.H.useEffect(p, H);
  }, le.useEffectEvent = function(p) {
    return ne.H.useEffectEvent(p);
  }, le.useId = function() {
    return ne.H.useId();
  }, le.useImperativeHandle = function(p, H, F) {
    return ne.H.useImperativeHandle(p, H, F);
  }, le.useInsertionEffect = function(p, H) {
    return ne.H.useInsertionEffect(p, H);
  }, le.useLayoutEffect = function(p, H) {
    return ne.H.useLayoutEffect(p, H);
  }, le.useMemo = function(p, H) {
    return ne.H.useMemo(p, H);
  }, le.useOptimistic = function(p, H) {
    return ne.H.useOptimistic(p, H);
  }, le.useReducer = function(p, H, F) {
    return ne.H.useReducer(p, H, F);
  }, le.useRef = function(p) {
    return ne.H.useRef(p);
  }, le.useState = function(p) {
    return ne.H.useState(p);
  }, le.useSyncExternalStore = function(p, H, F) {
    return ne.H.useSyncExternalStore(
      p,
      H,
      F
    );
  }, le.useTransition = function() {
    return ne.H.useTransition();
  }, le.version = "19.3.1", le;
}
var fh;
function Mo() {
  return fh || (fh = 1, To.exports = U0()), To.exports;
}
var No = { exports: {} }, rt = {};
var dh;
function H0() {
  if (dh) return rt;
  dh = 1;
  var s = Mo();
  function r(b) {
    var y = "https://react.dev/errors/" + b;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var z = 2; z < arguments.length; z++)
        y += "&args[]=" + encodeURIComponent(arguments[z]);
    }
    return "Minified React error #" + b + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, v = Symbol.for("react.portal"), h = Symbol.for("react.recoverable"), j = Symbol.for("react.optimistic_key");
  function A(b, y, z) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: R == null ? null : R === j ? j : "" + R,
      children: b,
      containerInfo: y,
      implementation: z
    };
  }
  var N = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(b, y) {
    if (b === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, rt.browser = function(b) {
    return { $$typeof: h, _reason: b };
  }, rt.createPortal = function(b, y) {
    var z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(r(299));
    return A(b, y, null, z);
  }, rt.flushSync = function(b) {
    var y = N.T, z = o.p;
    try {
      if (N.T = null, o.p = 2, b) return b();
    } finally {
      N.T = y, o.p = z, o.d.f();
    }
  }, rt.preconnect = function(b, y) {
    typeof b == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, o.d.C(b, y));
  }, rt.prefetchDNS = function(b) {
    typeof b == "string" && o.d.D(b);
  }, rt.preinit = function(b, y) {
    if (typeof b == "string" && y && typeof y.as == "string") {
      var z = y.as, R = D(z, y.crossOrigin), U = typeof y.integrity == "string" ? y.integrity : void 0, L = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      z === "style" ? o.d.S(
        b,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: R,
          integrity: U,
          fetchPriority: L
        }
      ) : z === "script" && o.d.X(b, {
        crossOrigin: R,
        integrity: U,
        fetchPriority: L,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, rt.preinitModule = function(b, y) {
    if (typeof b == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var z = D(
            y.as,
            y.crossOrigin
          );
          o.d.M(b, {
            crossOrigin: z,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
          });
        }
      } else y == null && o.d.M(b);
  }, rt.preload = function(b, y) {
    if (typeof b == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var z = y.as, R = D(z, y.crossOrigin);
      o.d.L(b, z, {
        crossOrigin: R,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, rt.preloadModule = function(b, y) {
    if (typeof b == "string")
      if (y) {
        var z = D(y.as, y.crossOrigin);
        o.d.m(b, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: z,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
        });
      } else o.d.m(b);
  }, rt.requestFormReset = function(b) {
    o.d.r(b);
  }, rt.unstable_batchedUpdates = function(b, y) {
    return b(y);
  }, rt.useFormState = function(b, y, z) {
    return N.H.useFormState(b, y, z);
  }, rt.useFormStatus = function() {
    return N.H.useHostTransitionStatus();
  }, rt.version = "19.3.1", rt;
}
var vh;
function L0() {
  if (vh) return No.exports;
  vh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), No.exports = H0(), No.exports;
}
var mh;
function q0() {
  if (mh) return Lu;
  mh = 1;
  var s = O0(), r = Mo(), d = L0();
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
  function j(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function A(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function N(e) {
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
          if (u === a) return N(n), e;
          if (u === l) return N(n), t;
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
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function y(e, t, a, l, n, u) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && a(e, l, n, u) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && y(
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
  function z(e) {
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
  function U(e) {
    var t = [null, null], a = z(e);
    return a === null || L(
      t,
      e,
      a.child,
      { foundSelf: !1 }
    ), t;
  }
  function L(e, t, a, l) {
    for (; a !== null; ) {
      if (a === t) l.foundSelf = !0;
      else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
        if (l.foundSelf) return e[1] = a, !0;
        e[0] = a;
      } else if ((a.tag !== 22 || a.memoizedState === null) && L(
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
  function q(e) {
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
  var J = null, oe = null;
  function V(e, t, a) {
    return e === a ? !0 : e === t ? (J = e, !0) : !1;
  }
  function xe(e, t, a) {
    return e === a ? (oe = e, !1) : e === t ? (oe !== null && (J = e), !0) : !1;
  }
  function Ge(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function ee(e, t, a) {
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
  var I = Object.assign, ne = Symbol.for("react.element"), ke = Symbol.for("react.transitional.element"), Fe = Symbol.for("react.portal"), De = Symbol.for("react.fragment"), Xe = Symbol.for("react.strict_mode"), te = Symbol.for("react.profiler"), We = Symbol.for("react.consumer"), Le = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), Sa = Symbol.for("react.legacy_hidden"), gl = Symbol.for("react.memo_cache_sentinel"), p = Symbol.for("react.view_transition"), H = Symbol.for("react.recoverable"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var _e = Symbol.for("react.client.reference");
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === _e ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case De:
        return "Fragment";
      case te:
        return "Profiler";
      case Xe:
        return "StrictMode";
      case B:
        return "Suspense";
      case X:
        return "SuspenseList";
      case ot:
        return "Activity";
      case p:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Fe:
          return "Portal";
        case Le:
          return e.displayName || "Context";
        case We:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ce:
          return t = e.displayName || null, t !== null ? t : Se(e.type) || "Memo";
        case he:
          t = e._payload, e = e._init;
          try {
            return Se(e(t));
          } catch {
          }
      }
    return null;
  }
  var je = Array.isArray, k = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ba = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, qs = [], Gl = -1;
  function ua(e) {
    return { current: e };
  }
  function at(e) {
    0 > Gl || (e.current = qs[Gl], qs[Gl] = null, Gl--);
  }
  function Re(e, t) {
    Gl++, qs[Gl] = e.current, e.current = t;
  }
  var ia = ua(null), Qn = ua(null), Ya = ua(null), Wu = ua(null);
  function Iu(e, t) {
    switch (Re(Ya, t), Re(Qn, e), Re(ia, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? hm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = hm(t), e = gm(t, e);
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
    at(ia), Re(ia, e);
  }
  function Ql() {
    at(ia), at(Qn), at(Ya);
  }
  function Bs(e) {
    var t = e.memoizedState;
    t !== null && (zn._currentValue = t.memoizedState, Re(Wu, e)), t = ia.current;
    var a = gm(t, e.type);
    t !== a && (Re(Qn, e), Re(ia, a));
  }
  function Pu(e) {
    Qn.current === e && (at(ia), at(Qn)), Wu.current === e && (at(Wu), zn._currentValue = ba);
  }
  var Ys, Uo;
  function Ga(e) {
    if (Ys === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Ys = t && t[1] || "", Uo = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ys + e + Uo;
  }
  var Gs = !1;
  function Qs(e, t) {
    if (!e || Gs) return "";
    Gs = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (Y) {
                  var _ = Y;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (Y) {
                  _ = Y;
                }
                O = !1;
                try {
                  var w = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), O = !0, new e();
                } finally {
                  O && (w !== void 0 ? Object.defineProperty(e.prototype, "props", w) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                _ = Y;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && _ && typeof Y.stack == "string")
              return [Y.stack, _.stack];
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
`), x = f.split(`
`);
        for (n = l = 0; l < m.length && !m[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < x.length && !x[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === m.length || n === x.length)
          for (l = m.length - 1, n = x.length - 1; 1 <= l && 0 <= n && m[l] !== x[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (m[l] !== x[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || m[l] !== x[n]) {
                  var C = `
` + m[l].replace(" at new ", " at ");
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), C;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Gs = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ga(a) : "";
  }
  function Uh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ga(e.type);
      case 16:
        return Ga("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ga("Suspense Fallback") : Ga("Suspense");
      case 19:
        return Ga("SuspenseList");
      case 0:
      case 15:
        return Qs(e.type, !1);
      case 11:
        return Qs(e.type.render, !1);
      case 1:
        return Qs(e.type, !0);
      case 31:
        return Ga("Activity");
      case 30:
        return Ga("ViewTransition");
      default:
        return "";
    }
  }
  function Ho(e) {
    try {
      var t = "", a = null;
      do
        t += Uh(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Xs = Object.prototype.hasOwnProperty, Zs = s.unstable_scheduleCallback, Vs = s.unstable_cancelCallback, Hh = s.unstable_shouldYield, Lh = s.unstable_requestPaint, Nt = s.unstable_now, qh = s.unstable_getCurrentPriorityLevel, Lo = s.unstable_ImmediatePriority, qo = s.unstable_UserBlockingPriority, ei = s.unstable_NormalPriority, Bh = s.unstable_LowPriority, Bo = s.unstable_IdlePriority, Yh = s.log, Gh = s.unstable_setDisableYieldValue, Xn = null, wt = null;
  function Qa(e) {
    if (typeof Yh == "function" && Gh(e), wt && typeof wt.setStrictMode == "function")
      try {
        wt.setStrictMode(Xn, e);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : Zh, Qh = Math.log, Xh = Math.LN2;
  function Zh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Qh(e) / Xh | 0) | 0;
  }
  var ti = 256, ai = 262144, li = 4194304;
  function yl(e) {
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
  function ni(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = yl(l) : (c &= f, c !== 0 ? n = yl(c) : a || (a = f & ~e, a !== 0 && (n = yl(a))))) : (f = l & ~u, f !== 0 ? n = yl(f) : c !== 0 ? n = yl(c) : a || (a = l & ~e, a !== 0 && (n = yl(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Zn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Yo(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - Et(a), n = 1 << l;
        t |= e[l], a &= ~n;
      }
    return t;
  }
  function Vh(e, t) {
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
  function Go() {
    var e = li;
    return li <<= 1, (li & 62914560) === 0 && (li = 4194304), e;
  }
  function Ks(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Vn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Kh(e, t, a, l, n, u) {
    var c = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, m = e.expirationTimes, x = e.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var C = 31 - Et(a), O = 1 << C;
      f[C] = 0, m[C] = -1;
      var _ = x[C];
      if (_ !== null)
        for (x[C] = null, C = 0; C < _.length; C++) {
          var w = _[C];
          w !== null && (w.lane &= -536870913);
        }
      a &= ~O;
    }
    l !== 0 && Qo(e, l, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function Qo(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Et(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Xo(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - Et(a), n = 1 << l;
      n & t | e[l] & t && (e[l] |= t), a &= ~n;
    }
  }
  function Zo(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Js(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Js(e) {
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
  function ks(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Vo() {
    var e = ae.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Pm(e.type));
  }
  function Ko(e, t) {
    var a = ae.p;
    try {
      return ae.p = e, t();
    } finally {
      ae.p = a;
    }
  }
  var xa = Math.random().toString(36).slice(2), lt = "__reactFiber$" + xa, pt = "__reactProps$" + xa, Xl = "__reactContainer$" + xa, Jo = "__reactEvents$" + xa, Jh = "__reactListeners$" + xa, kh = "__reactHandles$" + xa, ko = "__reactResources$" + xa, Kn = "__reactMarker$" + xa, ui = "__reactLoad$" + xa;
  function ii(e) {
    delete e[lt], delete e[pt], delete e[Jh], delete e[kh];
  }
  function pl(e) {
    var t;
    if (t = e[lt]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Xl] || a[lt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Mm(e); e !== null; ) {
            if (a = e[lt]) return a;
            e = Mm(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Zl(e) {
    if (e = e[lt] || e[Xl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Jn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Vl(e) {
    var t = e[ko];
    return t || (t = e[ko] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ie(e) {
    e[Kn] = !0;
  }
  function $o(e) {
    e[ui] = void 0;
  }
  var Fo = /* @__PURE__ */ new Set(), Wo = {};
  function _l(e, t) {
    Kl(e, t), Kl(e + "Capture", t);
  }
  function Kl(e, t) {
    for (Wo[e] = t, e = 0; e < t.length; e++)
      Fo.add(t[e]);
  }
  var $h = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Io = {}, Po = {};
  function Fh(e) {
    return Xs.call(Po, e) ? !0 : Xs.call(Io, e) ? !1 : $h.test(e) ? Po[e] = !0 : (Io[e] = !0, !1);
  }
  var be = !1;
  function ef() {
    var e = be;
    return be = !1, e;
  }
  function si(e, t, a) {
    if (Fh(t))
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
  function ci(e, t, a) {
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
  function ja(e, t, a, l) {
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
  function At(e) {
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
  function tf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Wh(e, t, a) {
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
  function $s(e) {
    if (!e._valueTracker) {
      var t = tf(e) ? "checked" : "value";
      e._valueTracker = Wh(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function af(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = tf(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  var Ih = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      Ih,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fs(e, t, a, l, n, u, c, f) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + At(t)) : e.value !== "" + At(t) && (e.value = "" + At(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? c === "number" && e.value == t ? Ws(e, At(e.value)) : Ws(e, At(t)) : a != null ? Ws(e, At(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + At(f) : e.removeAttribute("name");
  }
  function lf(e, t, a, l, n, u, c, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        $s(e);
        return;
      }
      a = a != null ? "" + At(a) : "", t = t != null ? "" + At(t) : a, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = f ? e.checked : !!l, e.defaultChecked = !!l, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), $s(e);
  }
  function Ws(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function Jl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++)
        t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + At(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          e[n].selected = !0, l && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function nf(e, t, a) {
    if (t != null && (t = "" + At(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + At(a) : "";
  }
  function uf(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (je(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = At(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), $s(e);
  }
  function kl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ph = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function sf(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ph.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function cf(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", be = !0);
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (sf(e, n, l), be = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && sf(e, u, t[u]);
  }
  function Is(e) {
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
  var eg = /* @__PURE__ */ new Map([
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
  ]), tg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ri(e) {
    return tg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function sa() {
  }
  var Ps = null;
  function ec(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var $l = null, Fl = null;
  function rf(e) {
    var t = Zl(e);
    if (t && (e = t.stateNode)) {
      var a = e[pt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Fs(
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
              'input[name="' + qt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[pt] || null;
                if (!n) throw Error(o(90));
                Fs(
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
              l = a[t], l.form === e.form && af(l);
          }
          break e;
        case "textarea":
          nf(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Jl(e, !!a.multiple, t, !1);
      }
    }
  }
  var tc = !1;
  function of(e, t, a) {
    if (tc) return e(t, a);
    tc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (tc = !1, ($l !== null || Fl !== null) && (rs(), $l && (t = $l, e = Fl, Fl = $l = null, rf(t), e)))
        for (t = 0; t < e.length; t++) rf(e[t]);
    }
  }
  function kn(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[pt] || null;
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
  var Ta = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ac = !1;
  if (Ta)
    try {
      var $n = {};
      Object.defineProperty($n, "passive", {
        get: function() {
          ac = !0;
        }
      }), window.addEventListener("test", $n, $n), window.removeEventListener("test", $n, $n);
    } catch {
      ac = !1;
    }
  var Xa = null, lc = null, oi = null;
  function ff() {
    if (oi) return oi;
    var e, t = lc, a = t.length, l, n = "value" in Xa ? Xa.value : Xa.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var c = a - e;
    for (l = 1; l <= c && t[a - l] === n[u - l]; l++) ;
    return oi = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function fi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function di() {
    return !0;
  }
  function df() {
    return !1;
  }
  function vt(e) {
    function t(a, l, n, u, c) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (a = e[f], this[f] = a ? a(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? di : df, this.isPropagationStopped = df, this;
    }
    return I(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = di);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = di);
      },
      persist: function() {
      },
      isPersistent: di
    }), t;
  }
  var Za = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vi = vt(Za), Fn = I({}, Za, { view: 0, detail: 0 }), ag = vt(Fn), nc, uc, Wn, mi = I({}, Fn, {
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
    getModifierState: sc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wn && (Wn && e.type === "mousemove" ? (nc = e.screenX - Wn.screenX, uc = e.screenY - Wn.screenY) : uc = nc = 0, Wn = e), nc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : uc;
    }
  }), vf = vt(mi), lg = I({}, mi, { dataTransfer: 0 }), ng = vt(lg), ug = I({}, Fn, { relatedTarget: 0 }), ic = vt(ug), ig = I({}, Za, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sg = vt(ig), cg = I({}, Za, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rg = vt(cg), og = I({}, Za, { data: 0 }), mf = vt(og), fg = {
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
  }, dg = {
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
  }, vg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function mg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = vg[e]) ? !!t[e] : !1;
  }
  function sc() {
    return mg;
  }
  var hg = I({}, Fn, {
    key: function(e) {
      if (e.key) {
        var t = fg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = fi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: sc,
    charCode: function(e) {
      return e.type === "keypress" ? fi(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? fi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gg = vt(hg), yg = I({}, mi, {
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
  }), hf = vt(yg), pg = I({}, Za, { submitter: 0 }), _g = vt(pg), Sg = I({}, Fn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sc
  }), bg = vt(Sg), xg = I({}, Za, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jg = vt(xg), Tg = I({}, mi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ng = vt(Tg), wg = I({}, Za, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Eg = vt(wg), Ag = [9, 13, 27, 32], cc = Ta && "CompositionEvent" in window, In = null;
  Ta && "documentMode" in document && (In = document.documentMode);
  var Cg = Ta && "TextEvent" in window && !In, gf = Ta && (!cc || In && 8 < In && 11 >= In), yf = " ", pf = !1;
  function _f(e, t) {
    switch (e) {
      case "keyup":
        return Ag.indexOf(t.keyCode) !== -1;
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
  function Sf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Wl = !1;
  function zg(e, t) {
    switch (e) {
      case "compositionend":
        return Sf(t);
      case "keypress":
        return t.which !== 32 ? null : (pf = !0, yf);
      case "textInput":
        return e = t.data, e === yf && pf ? null : e;
      default:
        return null;
    }
  }
  function Dg(e, t) {
    if (Wl)
      return e === "compositionend" || !cc && _f(e, t) ? (e = ff(), oi = lc = Xa = null, Wl = !1, e) : null;
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
        return gf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Rg = {
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
  function bf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Rg[e.type] : t === "textarea";
  }
  function xf(e, t, a, l) {
    $l ? Fl ? Fl.push(l) : Fl = [l] : $l = l, t = hs(t, "onChange"), 0 < t.length && (a = new vi(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var Pn = null, eu = null;
  function Mg(e) {
    rm(e, 0);
  }
  function hi(e) {
    var t = Jn(e);
    if (af(t)) return e;
  }
  function jf(e, t) {
    if (e === "change") return t;
  }
  var Tf = !1;
  if (Ta) {
    var rc;
    if (Ta) {
      var oc = "oninput" in document;
      if (!oc) {
        var Nf = document.createElement("div");
        Nf.setAttribute("oninput", "return;"), oc = typeof Nf.oninput == "function";
      }
      rc = oc;
    } else rc = !1;
    Tf = rc && (!document.documentMode || 9 < document.documentMode);
  }
  function wf() {
    Pn && (Pn.detachEvent("onpropertychange", Ef), eu = Pn = null);
  }
  function Ef(e) {
    if (e.propertyName === "value" && hi(eu)) {
      var t = [];
      xf(
        t,
        eu,
        e,
        ec(e)
      ), of(Mg, t);
    }
  }
  function Og(e, t, a) {
    e === "focusin" ? (wf(), Pn = t, eu = a, Pn.attachEvent("onpropertychange", Ef)) : e === "focusout" && wf();
  }
  function Ug(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return hi(eu);
  }
  function Hg(e, t) {
    if (e === "click") return hi(t);
  }
  function Lg(e, t) {
    if (e === "input" || e === "change")
      return hi(t);
  }
  function qg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ct = typeof Object.is == "function" ? Object.is : qg;
  function tu(e, t) {
    if (Ct(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Xs.call(t, n) || !Ct(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function fc(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Af(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Cf(e, t) {
    var a = Af(e);
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
      a = Af(a);
    }
  }
  function zf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Df(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = fc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = fc(e.document);
    }
    return t;
  }
  function dc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Bg = Ta && "documentMode" in document && 11 >= document.documentMode, Il = null, vc = null, au = null, mc = !1;
  function Rf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    mc || Il == null || Il !== fc(l) || (l = Il, "selectionStart" in l && dc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), au && tu(au, l) || (au = l, l = hs(vc, "onSelect"), 0 < l.length && (t = new vi(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Il)));
  }
  function Sl(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Pl = {
    animationend: Sl("Animation", "AnimationEnd"),
    animationiteration: Sl("Animation", "AnimationIteration"),
    animationstart: Sl("Animation", "AnimationStart"),
    transitionrun: Sl("Transition", "TransitionRun"),
    transitionstart: Sl("Transition", "TransitionStart"),
    transitioncancel: Sl("Transition", "TransitionCancel"),
    transitionend: Sl("Transition", "TransitionEnd")
  }, hc = {}, Mf = {};
  Ta && (Mf = document.createElement("div").style, "AnimationEvent" in window || (delete Pl.animationend.animation, delete Pl.animationiteration.animation, delete Pl.animationstart.animation), "TransitionEvent" in window || delete Pl.transitionend.transition);
  function bl(e) {
    if (hc[e]) return hc[e];
    if (!Pl[e]) return e;
    var t = Pl[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Mf)
        return hc[e] = t[a];
    return e;
  }
  var Of = bl("animationend"), Uf = bl("animationiteration"), Hf = bl("animationstart"), Yg = bl("transitionrun"), Gg = bl("transitionstart"), Qg = bl("transitioncancel"), Lf = bl("transitionend"), qf = /* @__PURE__ */ new Map(), gc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  gc.push("scrollEnd");
  function Ft(e, t) {
    qf.set(e, t), _l(t, [e]);
  }
  var Xg = 0;
  function Na(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = ea.identifierPrefix;
    var a = Xg++;
    return e = "_" + e + "t_" + a.toString(32) + "_", t.autoName = e;
  }
  function Bf(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, a = Sn;
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
  function wa(e, t) {
    return e = Bf(e), t = Bf(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var gi = typeof reportError == "function" ? reportError : function(e) {
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
  }, Bt = [], en = 0, yc = 0;
  function yi() {
    for (var e = en, t = yc = en = 0; t < e; ) {
      var a = Bt[t];
      Bt[t++] = null;
      var l = Bt[t];
      Bt[t++] = null;
      var n = Bt[t];
      Bt[t++] = null;
      var u = Bt[t];
      if (Bt[t++] = null, l !== null && n !== null) {
        var c = l.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), l.pending = n;
      }
      u !== 0 && Yf(a, n, u);
    }
  }
  function pi(e, t, a, l) {
    Bt[en++] = e, Bt[en++] = t, Bt[en++] = a, Bt[en++] = l, yc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function pc(e, t, a, l) {
    return pi(e, t, a, l), _i(e);
  }
  function xl(e, t) {
    return pi(e, null, null, t), _i(e);
  }
  function Yf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - Et(a), e = u.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function _i(e) {
    if (50 < Tu)
      throw Tu = 0, cs = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var tn = {};
  function Zg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, a, l) {
    return new Zg(e, t, a, l);
  }
  function _c(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ea(e, t) {
    var a = e.alternate;
    return a === null ? (a = _t(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 1206910976, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Gf(e, t) {
    e.flags &= 1206910978;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Si(e, t, a, l, n, u) {
    var c = 0;
    if (l = e, typeof l == "function") _c(l) && (c = 1);
    else if (typeof l == "string")
      c = p0(
        e,
        a,
        ia.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ot:
          return e = _t(31, a, t, n), e.elementType = ot, e.lanes = u, e;
        case De:
          return jl(a.children, n, u, t);
        case Xe:
          c = 8, n |= 24;
          break;
        case te:
          return e = _t(12, a, t, n | 2), e.elementType = te, e.lanes = u, e;
        case B:
          return e = _t(13, a, t, n), e.elementType = B, e.lanes = u, e;
        case X:
          return e = _t(19, a, t, n), e.elementType = X, e.lanes = u, e;
        case Sa:
        case p:
          return e = n | 32, e = _t(30, a, t, e), e.elementType = p, e.lanes = u, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Le:
                c = 10;
                break e;
              case We:
                c = 9;
                break e;
              case Q:
                c = 11;
                break e;
              case ce:
                c = 14;
                break e;
              case he:
                c = 16, l = null;
                break e;
            }
          c = 29, a = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = _t(c, a, t, n), t.elementType = e, t.type = l, t.lanes = u, t;
  }
  function jl(e, t, a, l) {
    return e = _t(7, e, l, t), e.lanes = a, e;
  }
  function Sc(e, t, a) {
    return e = _t(6, e, null, t), e.lanes = a, e;
  }
  function Qf(e) {
    var t = _t(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function bc(e, t, a) {
    return t = _t(
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
  var Xf = /* @__PURE__ */ new WeakMap();
  function Yt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Xf.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Ho(t)
      }, Xf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ho(t)
    };
  }
  var an = [], ln = 0, bi = null, lu = 0, Gt = [], Qt = 0, Va = null, ca = 1, ra = "";
  function Aa(e, t) {
    an[ln++] = lu, an[ln++] = bi, bi = e, lu = t;
  }
  function Zf(e, t, a) {
    Gt[Qt++] = ca, Gt[Qt++] = ra, Gt[Qt++] = Va, Va = e;
    var l = ca;
    e = ra;
    var n = 32 - Et(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - Et(t) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (l & (1 << c) - 1).toString(32), l >>= c, n -= c, ca = 1 << 32 - Et(t) + n | a << n | l, ra = u + e;
    } else
      ca = 1 << u | a << n | l, ra = e;
  }
  function xi(e) {
    e.return !== null && (Aa(e, 1), Zf(e, 1, 0));
  }
  function xc(e) {
    for (; e === bi; )
      bi = an[--ln], an[ln] = null, lu = an[--ln], an[ln] = null;
    for (; e === Va; )
      Va = Gt[--Qt], Gt[Qt] = null, ra = Gt[--Qt], Gt[Qt] = null, ca = Gt[--Qt], Gt[Qt] = null;
  }
  function Vf(e, t) {
    Gt[Qt++] = ca, Gt[Qt++] = ra, Gt[Qt++] = Va, ca = t.id, ra = t.overflow, Va = e;
  }
  var Pe = null, Me = null, re = !1, Ka = null, Xt = !1, jc = Error(o(519));
  function Ja(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nu(Yt(t, e)), jc;
  }
  function Kf(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[lt] = e, t[pt] = l, a) {
      case "dialog":
        de("cancel", t), de("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        de("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < wu.length; a++)
          de(wu[a], t);
        break;
      case "source":
        de("error", t);
        break;
      case "img":
      case "image":
      case "link":
        de("error", t), de("load", t);
        break;
      case "details":
        de("toggle", t);
        break;
      case "input":
        de("invalid", t), lf(
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
        de("invalid", t);
        break;
      case "textarea":
        de("invalid", t), uf(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || vm(t.textContent, a) ? (l.popover != null && (de("beforetoggle", t), de("toggle", t)), l.onScroll != null && de("scroll", t), l.onScrollEnd != null && de("scrollend", t), l.onClick != null && (t.onclick = sa), t = !0) : t = !1, t || Ja(e, !0);
  }
  function ji(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
        case 5:
        case 31:
        case 13:
          Xt = !1;
          return;
        case 27:
        case 3:
          Xt = !0;
          return;
        default:
          Pe = Pe.return;
      }
  }
  function nn(e) {
    if (e !== Pe) return !1;
    if (!re) return ji(e), re = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Pr(e.type, e.memoizedProps)), a = !a), a && Me && Ja(e), ji(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Me = Rm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Me = Rm(e);
    } else
      t === 27 ? (t = Me, rl(e.type) ? (e = co, co = null, Me = e) : Me = t) : Me = Pe ? Vt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Tl() {
    Me = Pe = null, re = !1;
  }
  function Tc() {
    var e = Ka;
    return e !== null && (xt === null ? xt = e : xt.push.apply(
      xt,
      e
    ), Ka = null), e;
  }
  function nu(e) {
    Ka === null ? Ka = [e] : Ka.push(e);
  }
  var Nc = ua(null), Nl = null, Ca = null;
  function ka(e, t, a) {
    Re(Nc, t._currentValue), t._currentValue = a;
  }
  function za(e) {
    e._currentValue = Nc.current, at(Nc);
  }
  function Ti(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function wc(e, t, a, l) {
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
              u.lanes |= a, f = u.alternate, f !== null && (f.lanes |= a), Ti(
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
        c.lanes |= a, u = c.alternate, u !== null && (u.lanes |= a), Ti(c, a, e), c = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Ti(
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
  function wl(e, t, a, l) {
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
          Ct(n.pendingProps.value, c.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === Wu.current) {
        if (c = n.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(zn) : e = [zn]);
      }
      n = n.return;
    }
    return e !== null && wc(
      t,
      e,
      a,
      l
    ), t.flags |= 262144, e !== null;
  }
  function Ni(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ct(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function El(e) {
    Nl = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return Jf(Nl, e);
  }
  function wi(e, t) {
    return Nl === null && El(e), Jf(e, t);
  }
  function Jf(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Ca === null) {
      if (e === null) throw Error(o(308));
      Ca = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ca = Ca.next = t;
    return a;
  }
  var Vg = typeof AbortController < "u" ? AbortController : function() {
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
  }, Kg = s.unstable_scheduleCallback, Jg = s.unstable_NormalPriority, Ze = {
    $$typeof: Le,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ec() {
    return {
      controller: new Vg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function uu(e) {
    e.refCount--, e.refCount === 0 && Kg(Jg, function() {
      e.controller.abort();
    });
  }
  function kf(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var a = e.transitionTypes;
      for (a === null && (a = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        a.indexOf(l) === -1 && a.push(l);
      }
    }
  }
  var iu = null;
  function kg(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var su = null, Ac = 0, Al = 0, un = null;
  function $g(e, t) {
    if (su === null) {
      var a = su = [];
      Ac = 0, Al = Zr(), un = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Ac++, t.then($f, $f), t;
  }
  function $f() {
    if (--Ac === 0 && (iu = null, su !== null)) {
      un !== null && (un.status = "fulfilled");
      var e = su;
      su = null, Al = 0, un = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Fg(e, t) {
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
  var Ff = k.S;
  k.S = function(e, t) {
    if (Qv = Nt(), typeof t == "object" && t !== null && typeof t.then == "function" && $g(e, t), iu !== null)
      for (var a = Tn; a !== null; )
        kf(a, iu), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = Tn; l !== null; )
        kf(l, a), l = l.next;
      if (Al !== 0) {
        l = iu, l === null && (l = iu = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    Ff !== null && Ff(e, t);
  };
  var Cl = ua(null);
  function Cc() {
    var e = Cl.current;
    return e !== null ? e : ze.pooledCache;
  }
  function Ei(e, t) {
    t === null ? Re(Cl, Cl.current) : Re(Cl, t.pool);
  }
  function Wf() {
    var e = Cc();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var sn = Error(o(460)), zc = Error(o(474)), Ai = Error(o(542)), Ci = { then: function() {
  } };
  function If(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Pf(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(sa, sa), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, td(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(sa, sa);
        else {
          if (e = ze, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, td(e), e;
        }
        throw Dl = t, sn;
    }
  }
  function zl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Dl = a, sn) : a;
    }
  }
  var Dl = null;
  function ed() {
    if (Dl === null) throw Error(o(459));
    var e = Dl;
    return Dl = null, e;
  }
  function td(e) {
    if (e === sn || e === Ai)
      throw Error(o(483));
  }
  var cn = null, cu = 0;
  function zi(e) {
    var t = cu;
    return cu += 1, cn === null && (cn = []), Pf(cn, e, t);
  }
  function $a(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Di(e, t) {
    throw t.$$typeof === ne ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ad(e) {
    function t(S, g) {
      if (e) {
        var T = S.deletions;
        T === null ? (S.deletions = [g], S.flags |= 16) : T.push(g);
      }
    }
    function a(S, g) {
      if (!e) return null;
      for (; g !== null; )
        t(S, g), g = g.sibling;
      return null;
    }
    function l(S) {
      for (var g = /* @__PURE__ */ new Map(); S !== null; )
        S.key === null ? g.set(S.index, S) : g.set(S.key, S), S = S.sibling;
      return g;
    }
    function n(S, g) {
      return S = Ea(S, g), S.index = 0, S.sibling = null, S;
    }
    function u(S, g, T) {
      return S.index = T, e ? (T = S.alternate, T !== null ? (T = T.index, T < g ? (S.flags |= 2, g) : T) : (S.flags |= 134217730, g)) : (S.flags |= 1048576, g);
    }
    function c(S) {
      return e && S.alternate === null && (S.flags |= 134217730), S;
    }
    function f(S, g, T, M) {
      return g === null || g.tag !== 6 ? (g = Sc(T, S.mode, M), g.return = S, g) : (g = n(g, T), g.return = S, g);
    }
    function m(S, g, T, M) {
      var Z = T.type;
      return Z === De ? (S = C(
        S,
        g,
        T.props.children,
        M,
        T.key
      ), $a(S, T), S) : g !== null && (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && zl(Z) === g.type) ? (g = n(g, T.props), $a(g, T), g.return = S, g) : (g = Si(
        T.type,
        T.key,
        T.props,
        null,
        S.mode,
        M
      ), $a(g, T), g.return = S, g);
    }
    function x(S, g, T, M) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== T.containerInfo || g.stateNode.implementation !== T.implementation ? (g = bc(T, S.mode, M), g.return = S, g) : (g = n(g, T.children || []), g.return = S, g);
    }
    function C(S, g, T, M, Z) {
      return g === null || g.tag !== 7 ? (g = jl(
        T,
        S.mode,
        M,
        Z
      ), g.return = S, g) : (g = n(g, T), g.return = S, g);
    }
    function O(S, g, T) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = Sc(
          "" + g,
          S.mode,
          T
        ), g.return = S, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ke:
            return T = Si(
              g.type,
              g.key,
              g.props,
              null,
              S.mode,
              T
            ), $a(T, g), T.return = S, T;
          case Fe:
            return g = bc(
              g,
              S.mode,
              T
            ), g.return = S, g;
          case he:
            return g = zl(g), O(S, g, T);
        }
        if (je(g) || W(g))
          return g = jl(
            g,
            S.mode,
            T,
            null
          ), g.return = S, g;
        if (typeof g.then == "function")
          return O(S, zi(g), T);
        if (g.$$typeof === Le)
          return O(
            S,
            wi(S, g),
            T
          );
        Di(S, g);
      }
      return null;
    }
    function _(S, g, T, M) {
      var Z = g !== null ? g.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return Z !== null ? null : f(S, g, "" + T, M);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ke:
            return T.key === Z ? m(S, g, T, M) : null;
          case Fe:
            return T.key === Z ? x(S, g, T, M) : null;
          case he:
            return T = zl(T), _(S, g, T, M);
        }
        if (je(T) || W(T))
          return Z !== null ? null : C(S, g, T, M, null);
        if (typeof T.then == "function")
          return _(
            S,
            g,
            zi(T),
            M
          );
        if (T.$$typeof === Le)
          return _(
            S,
            g,
            wi(S, T),
            M
          );
        Di(S, T);
      }
      return null;
    }
    function w(S, g, T, M, Z) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return S = S.get(T) || null, f(g, S, "" + M, Z);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case ke:
            return S = S.get(
              M.key === null ? T : M.key
            ) || null, m(g, S, M, Z);
          case Fe:
            return S = S.get(
              M.key === null ? T : M.key
            ) || null, x(g, S, M, Z);
          case he:
            return M = zl(M), w(
              S,
              g,
              T,
              M,
              Z
            );
        }
        if (je(M) || W(M))
          return S = S.get(T) || null, C(g, S, M, Z, null);
        if (typeof M.then == "function")
          return w(
            S,
            g,
            T,
            zi(M),
            Z
          );
        if (M.$$typeof === Le)
          return w(
            S,
            g,
            T,
            wi(g, M),
            Z
          );
        Di(g, M);
      }
      return null;
    }
    function Y(S, g, T, M) {
      for (var Z = null, me = null, $ = g, P = g = 0, Je = null; $ !== null && P < T.length; P++) {
        $.index > P ? (Je = $, $ = null) : Je = $.sibling;
        var pe = _(
          S,
          $,
          T[P],
          M
        );
        if (pe === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && pe.alternate === null && t(S, $), g = u(pe, g, P), me === null ? Z = pe : me.sibling = pe, me = pe, $ = Je;
      }
      if (P === T.length)
        return a(S, $), re && Aa(S, P), Z;
      if ($ === null) {
        for (; P < T.length; P++)
          $ = O(S, T[P], M), $ !== null && (g = u(
            $,
            g,
            P
          ), me === null ? Z = $ : me.sibling = $, me = $);
        return re && Aa(S, P), Z;
      }
      for ($ = l($); P < T.length; P++)
        Je = w(
          $,
          S,
          P,
          T[P],
          M
        ), Je !== null && (e && (pe = Je.alternate, pe !== null && $.delete(pe.key === null ? P : pe.key)), g = u(
          Je,
          g,
          P
        ), me === null ? Z = Je : me.sibling = Je, me = Je);
      return e && $.forEach(function(ml) {
        return t(S, ml);
      }), re && Aa(S, P), Z;
    }
    function K(S, g, T, M) {
      if (T == null) throw Error(o(151));
      for (var Z = null, me = null, $ = g, P = g = 0, Je = null, pe = T.next(); $ !== null && !pe.done; P++, pe = T.next()) {
        $.index > P ? (Je = $, $ = null) : Je = $.sibling;
        var ml = _(S, $, pe.value, M);
        if (ml === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && ml.alternate === null && t(S, $), g = u(ml, g, P), me === null ? Z = ml : me.sibling = ml, me = ml, $ = Je;
      }
      if (pe.done)
        return a(S, $), re && Aa(S, P), Z;
      if ($ === null) {
        for (; !pe.done; P++, pe = T.next())
          pe = O(S, pe.value, M), pe !== null && (g = u(pe, g, P), me === null ? Z = pe : me.sibling = pe, me = pe);
        return re && Aa(S, P), Z;
      }
      for ($ = l($); !pe.done; P++, pe = T.next())
        pe = w($, S, P, pe.value, M), pe !== null && (e && (Je = pe.alternate, Je !== null && $.delete(
          Je.key === null ? P : Je.key
        )), g = u(pe, g, P), me === null ? Z = pe : me.sibling = pe, me = pe);
      return e && $.forEach(function(z0) {
        return t(S, z0);
      }), re && Aa(S, P), Z;
    }
    function se(S, g, T, M) {
      if (typeof T == "object" && T !== null && T.type === De && T.key === null && T.props.ref === void 0 && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ke:
            e: {
              for (var Z = T.key; g !== null; ) {
                if (g.key === Z) {
                  if (Z = T.type, Z === De) {
                    if (g.tag === 7) {
                      a(
                        S,
                        g.sibling
                      ), M = n(
                        g,
                        T.props.children
                      ), $a(M, T), M.return = S, S = M;
                      break e;
                    }
                  } else if (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && zl(Z) === g.type) {
                    a(
                      S,
                      g.sibling
                    ), M = n(g, T.props), $a(M, T), M.return = S, S = M;
                    break e;
                  }
                  a(S, g);
                  break;
                } else t(S, g);
                g = g.sibling;
              }
              T.type === De ? (M = jl(
                T.props.children,
                S.mode,
                M,
                T.key
              ), $a(M, T), M.return = S, S = M) : (M = Si(
                T.type,
                T.key,
                T.props,
                null,
                S.mode,
                M
              ), $a(M, T), M.return = S, S = M);
            }
            return c(S);
          case Fe:
            e: {
              for (Z = T.key; g !== null; ) {
                if (g.key === Z)
                  if (g.tag === 4 && g.stateNode.containerInfo === T.containerInfo && g.stateNode.implementation === T.implementation) {
                    a(
                      S,
                      g.sibling
                    ), M = n(g, T.children || []), M.return = S, S = M;
                    break e;
                  } else {
                    a(S, g);
                    break;
                  }
                else t(S, g);
                g = g.sibling;
              }
              M = bc(T, S.mode, M), M.return = S, S = M;
            }
            return c(S);
          case he:
            return T = zl(T), se(
              S,
              g,
              T,
              M
            );
        }
        if (je(T))
          return Y(
            S,
            g,
            T,
            M
          );
        if (W(T)) {
          if (Z = W(T), typeof Z != "function") throw Error(o(150));
          return T = Z.call(T), K(
            S,
            g,
            T,
            M
          );
        }
        if (typeof T.then == "function")
          return se(
            S,
            g,
            zi(T),
            M
          );
        if (T.$$typeof === Le)
          return se(
            S,
            g,
            wi(S, T),
            M
          );
        Di(S, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, g !== null && g.tag === 6 ? (a(S, g.sibling), M = n(g, T), M.return = S, S = M) : (a(S, g), M = Sc(T, S.mode, M), M.return = S, S = M), c(S)) : a(S, g);
    }
    return function(S, g, T, M) {
      try {
        cu = 0;
        var Z = se(
          S,
          g,
          T,
          M
        );
        return cn = null, Z;
      } catch ($) {
        if ($ === sn || $ === Ai) throw $;
        var me = _t(29, $, null, S.mode);
        return me.lanes = M, me.return = S, me;
      } finally {
      }
    };
  }
  var Rl = ad(!0), ld = ad(!1), Fa = !1;
  function Dc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Rc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Wa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ia(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Te & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = _i(e), Yf(e, null, a), t;
    }
    return pi(e, l, t, a), _i(e);
  }
  function ru(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Xo(e, a);
    }
  }
  function Mc(e, t) {
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
  var Oc = !1;
  function ou() {
    if (Oc) {
      var e = un;
      if (e !== null) throw e;
    }
  }
  function fu(e, t, a, l) {
    Oc = !1;
    var n = e.updateQueue;
    Fa = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var m = f, x = m.next;
      m.next = null, c === null ? u = x : c.next = x, c = m;
      var C = e.alternate;
      C !== null && (C = C.updateQueue, f = C.lastBaseUpdate, f !== c && (f === null ? C.firstBaseUpdate = x : f.next = x, C.lastBaseUpdate = m));
    }
    if (u !== null) {
      var O = n.baseState;
      c = 0, C = x = m = null, f = u;
      do {
        var _ = f.lane & -536870913, w = _ !== f.lane;
        if (w ? (ve & _) === _ : (l & _) === _) {
          _ !== 0 && _ === Al && (Oc = !0), C !== null && (C = C.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var Y = e, K = f;
            _ = t;
            var se = a;
            switch (K.tag) {
              case 1:
                if (Y = K.payload, typeof Y == "function") {
                  O = Y.call(se, O, _);
                  break e;
                }
                O = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = K.payload, _ = typeof Y == "function" ? Y.call(se, O, _) : Y, _ == null) break e;
                O = I({}, O, _);
                break e;
              case 2:
                Fa = !0;
            }
          }
          _ = f.callback, _ !== null && (e.flags |= 64, w && (e.flags |= 8192), w = n.callbacks, w === null ? n.callbacks = [_] : w.push(_));
        } else
          w = {
            lane: _,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, C === null ? (x = C = w, m = O) : C = C.next = w, c |= _;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          w = f, f = w.next, w.next = null, n.lastBaseUpdate = w, n.shared.pending = null;
        }
      } while (!0);
      C === null && (m = O), n.baseState = m, n.firstBaseUpdate = x, n.lastBaseUpdate = C, u === null && (n.shared.lanes = 0), ul |= c, e.lanes = c, e.memoizedState = O;
    }
  }
  function nd(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function ud(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        nd(a[e], t);
  }
  var Pa = ua(null), Ri = ua(0);
  function id(e, t) {
    e = Ua, Re(Ri, e), Re(Pa, t), Ua = e | t.baseLanes;
  }
  function Uc() {
    Re(Ri, Ua), Re(Pa, Pa.current);
  }
  function Hc() {
    Ua = Ri.current, at(Pa), at(Ri);
  }
  var ut = ua(null), ft = null;
  function el(e) {
    var t = e.alternate;
    Re(it, it.current & 1), Re(ut, e), ft === null && (t === null || Pa.current !== null || t.memoizedState !== null) && (ft = e);
  }
  function Lc(e) {
    Re(it, it.current), Re(ut, e), ft === null && (ft = e);
  }
  function sd(e) {
    e.tag === 22 ? (Re(it, it.current), Re(ut, e), ft === null && (ft = e)) : tl();
  }
  function tl() {
    Re(it, it.current), Re(ut, ut.current);
  }
  function zt(e) {
    at(ut), ft === e && (ft = null), at(it);
  }
  var it = ua(0);
  function du(e, t) {
    Re(ut, ut.current), Re(it, t);
  }
  function qc(e) {
    at(it), at(ut), ft === e && (ft = null);
  }
  function Mi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || io(a) || so(a)))
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
  var Da = 0, ie = null, Ce = null, Ve = null, Oi = !1, rn = !1, Ml = !1, Ui = 0, vu = 0, on = null, Wg = 0;
  function Be() {
    throw Error(o(321));
  }
  function Bc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Ct(e[a], t[a])) return !1;
    return !0;
  }
  function Yc(e, t, a, l, n, u) {
    return Da = u, ie = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Zd : Vd, Ml = !1, u = a(l, n), Ml = !1, rn && (u = rd(
      t,
      a,
      l,
      n
    )), cd(e), u;
  }
  function cd(e) {
    k.H = Qi;
    var t = Ce !== null && Ce.next !== null;
    if (Da = 0, Ve = Ce = ie = null, Oi = !1, vu = 0, on = null, t) throw Error(o(300));
    e === null || Ke || (e = e.dependencies, e !== null && Ni(e) && (Ke = !0));
  }
  function rd(e, t, a, l) {
    ie = e;
    var n = 0;
    do {
      if (rn && (on = null), vu = 0, rn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ve = Ce = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      k.H = uy, u = t(a, l);
    } while (rn);
    return u;
  }
  function Ig() {
    var e = k.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? mu(t) : t, e = e.useState()[0], (Ce !== null ? Ce.memoizedState : null) !== e && (ie.flags |= 1024), t;
  }
  function Gc() {
    var e = Ui !== 0;
    return Ui = 0, e;
  }
  function Qc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Xc(e) {
    if (Oi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Oi = !1;
    }
    Da = 0, Ve = Ce = ie = null, rn = !1, vu = Ui = 0, on = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ve === null ? ie.memoizedState = Ve = e : Ve = Ve.next = e, Ve;
  }
  function Qe() {
    if (Ce === null) {
      var e = ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ce.next;
    var t = Ve === null ? ie.memoizedState : Ve.next;
    if (t !== null)
      Ve = t, Ce = e;
    else {
      if (e === null)
        throw ie.alternate === null ? Error(o(467)) : Error(o(310));
      Ce = e, e = {
        memoizedState: Ce.memoizedState,
        baseState: Ce.baseState,
        baseQueue: Ce.baseQueue,
        queue: Ce.queue,
        next: null
      }, Ve === null ? ie.memoizedState = Ve = e : Ve = Ve.next = e;
    }
    return Ve;
  }
  function Hi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function mu(e) {
    var t = vu;
    return vu += 1, on === null && (on = []), e = Pf(on, e, t), t = ie, (Ve === null ? t.memoizedState : Ve.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Zd : Vd), e;
  }
  function Li(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return mu(e);
      if (e.$$typeof === H) return;
      if (e.$$typeof === Le) return nt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Zc(e) {
    var t = null, a = ie.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = ie.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Hi(), ie.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = gl;
    return t.index++, a;
  }
  function Ra(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function qi(e) {
    var t = Qe();
    return Vc(t, Ce, e);
  }
  function Vc(e, t, a) {
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
      var f = c = null, m = null, x = t, C = !1;
      do {
        var O = x.lane & -536870913;
        if (O !== x.lane ? (ve & O) === O : (Da & O) === O) {
          var _ = x.revertLane;
          if (_ === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), O === Al && (C = !0);
          else if ((Da & _) === _) {
            x = x.next, _ === Al && (C = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, m === null ? (f = m = O, c = u) : m = m.next = O, ie.lanes |= _, ul |= _;
          O = x.action, Ml && a(u, O), u = x.hasEagerState ? x.eagerState : a(u, O);
        } else
          _ = {
            lane: O,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, m === null ? (f = m = _, c = u) : m = m.next = _, ie.lanes |= O, ul |= O;
        x = x.next;
      } while (x !== null && x !== t);
      if (m === null ? c = u : m.next = f, !Ct(u, e.memoizedState) && (Ke = !0, C && (a = un, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = c, e.baseQueue = m, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Kc(e) {
    var t = Qe(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, u = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var c = n = n.next;
      do
        u = e(u, c.action), c = c.next;
      while (c !== n);
      Ct(u, t.memoizedState) || (Ke = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function od(e, t, a) {
    var l = ie, n = Qe(), u = re;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !Ct(
      (Ce || n).memoizedState,
      a
    );
    if (c && (n.memoizedState = a, Ke = !0), n = n.queue, $c(vd.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || c || Ve !== null && (Ve.memoizedState.tag & 1) !== 0, fn(
      e ? 9 : 8,
      { destroy: void 0 },
      dd.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, ze === null) throw Error(o(349));
      u || (Da & 127) !== 0 || fd(l, t, a);
    }
    return a;
  }
  function fd(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ie.updateQueue, t === null ? (t = Hi(), ie.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function dd(e, t, a, l) {
    t.value = a, t.getSnapshot = l, md(t) && hd(e);
  }
  function vd(e, t, a) {
    return a(function() {
      md(t) && hd(e);
    });
  }
  function md(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Ct(e, a);
    } catch {
      return !0;
    }
  }
  function hd(e) {
    var t = xl(e, 2);
    t !== null && jt(t, e, 2);
  }
  function Jc(e) {
    var t = mt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ml) {
        Qa(!0);
        try {
          a();
        } finally {
          Qa(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ra,
      lastRenderedState: e
    }, t;
  }
  function gd(e, t, a, l) {
    return e.baseState = a, Vc(
      e,
      Ce,
      typeof l == "function" ? l : Ra
    );
  }
  function Pg(e, t, a, l, n) {
    if (Gi(e)) throw Error(o(485));
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
      k.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, yd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function yd(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var u = k.T, c = {};
      c.types = u !== null ? u.types : null, k.T = c;
      try {
        var f = a(n, l), m = k.S;
        m !== null && m(c, f), pd(e, t, f);
      } catch (x) {
        kc(e, t, x);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), k.T = u;
      }
    } else
      try {
        u = a(n, l), pd(e, t, u);
      } catch (x) {
        kc(e, t, x);
      }
  }
  function pd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        _d(e, t, l);
      },
      function(l) {
        return kc(e, t, l);
      }
    ) : _d(e, t, a);
  }
  function _d(e, t, a) {
    t.status = "fulfilled", t.value = a, Sd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, yd(e, a)));
  }
  function kc(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, Sd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Sd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function bd(e, t) {
    return t;
  }
  function xd(e, t) {
    if (re) {
      var a = ze.formState;
      if (a !== null) {
        e: {
          var l = ie;
          if (re) {
            if (Me) {
              t: {
                for (var n = Me, u = Xt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Vt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Me = Vt(
                  n.nextSibling
                ), l = n.data === "F!";
                break e;
              }
            }
            Ja(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = mt(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bd,
      lastRenderedState: t
    }, a.queue = l, a = Gd.bind(
      null,
      ie,
      l
    ), l.dispatch = a, l = Jc(!1), u = er.bind(
      null,
      ie,
      !1,
      l.queue
    ), l = mt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = Pg.bind(
      null,
      ie,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function jd(e) {
    var t = Qe();
    return Td(t, Ce, e);
  }
  function Td(e, t, a) {
    if (t = Vc(
      e,
      t,
      bd
    )[0], e = qi(Ra)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = mu(t);
      } catch (c) {
        throw c === sn ? Ai : c;
      }
    else l = t;
    t = Qe();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (ie.flags |= 2048, fn(
      9,
      { destroy: void 0 },
      ey.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function ey(e, t) {
    e.action = t;
  }
  function Nd(e) {
    var t = Qe(), a = Ce;
    if (a !== null)
      return Td(t, a, e);
    Qe(), t = t.memoizedState, a = Qe();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function fn(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = ie.updateQueue, t === null && (t = Hi(), ie.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function wd() {
    return Qe().memoizedState;
  }
  function Bi(e, t, a, l) {
    var n = mt();
    ie.flags |= e, n.memoizedState = fn(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Yi(e, t, a, l) {
    var n = Qe();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Ce !== null && l !== null && Bc(l, Ce.memoizedState.deps) ? n.memoizedState = fn(t, u, a, l) : (ie.flags |= e, n.memoizedState = fn(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Ed(e, t) {
    Bi(8390656, 8, e, t);
  }
  function $c(e, t) {
    Yi(2048, 8, e, t);
  }
  function ty(e) {
    ie.flags |= 4;
    var t = ie.updateQueue;
    if (t === null)
      t = Hi(), ie.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Ad(e) {
    var t = Qe().memoizedState;
    return ty({ ref: t, nextImpl: e }), function() {
      if ((Te & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Cd(e, t) {
    return Yi(4, 2, e, t);
  }
  function zd(e, t) {
    return Yi(4, 4, e, t);
  }
  function Dd(e, t) {
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
  function Rd(e, t, a) {
    a = a != null ? a.concat([e]) : null, Yi(4, 4, Dd.bind(null, t, e), a);
  }
  function Fc() {
  }
  function Md(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Bc(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Od(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Bc(t, l[1]))
      return l[0];
    if (l = e(), Ml) {
      Qa(!0);
      try {
        e();
      } finally {
        Qa(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function Wc(e, t, a) {
    return a === void 0 || (Da & 1073741824) !== 0 && (ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = Zv(), ie.lanes |= e, ul |= e, a);
  }
  function Ud(e, t, a, l) {
    return Ct(a, t) ? a : Pa.current !== null ? (e = Wc(e, a, l), Ct(e, t) || (Ke = !0), e) : (Da & 106) === 0 || (Da & 1073741824) !== 0 && (ve & 261930) === 0 ? (Ke = !0, e.memoizedState = a) : (e = Zv(), ie.lanes |= e, ul |= e, t);
  }
  function Hd(e, t, a, l, n) {
    var u = ae.p;
    ae.p = u !== 0 && 8 > u ? u : 8;
    var c = k.T, f = {};
    f.types = c !== null ? c.types : null, k.T = f, er(e, !1, t, a);
    try {
      var m = n(), x = k.S;
      if (x !== null && x(f, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var C = Fg(
          m,
          l
        );
        hu(
          e,
          t,
          C,
          Ot(e)
        );
      } else
        hu(
          e,
          t,
          l,
          Ot(e)
        );
    } catch (O) {
      hu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        Ot()
      );
    } finally {
      ae.p = u, c !== null && f.types !== null && (c.types = f.types), k.T = c;
    }
  }
  function ay() {
  }
  function Ic(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Ld(e).queue;
    Hd(
      e,
      n,
      t,
      ba,
      a === null ? ay : function() {
        return qd(e), a(l);
      }
    );
  }
  function Ld(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ba,
      baseState: ba,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ra,
        lastRenderedState: ba
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
        lastRenderedReducer: Ra,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function qd(e) {
    var t = Ld(e);
    t.next === null && (t = e.alternate.memoizedState), hu(
      e,
      t.next.queue,
      {},
      Ot()
    );
  }
  function Pc() {
    return nt(zn);
  }
  function Bd() {
    return Qe().memoizedState;
  }
  function Yd() {
    return Qe().memoizedState;
  }
  function ly(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ot();
          e = Wa(a);
          var l = Ia(t, e, a);
          l !== null && (jt(l, t, a), ru(l, t, a)), t = { cache: Ec() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ny(e, t, a) {
    var l = Ot();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gi(e) ? Qd(t, a) : (a = pc(e, t, a, l), a !== null && (jt(a, e, l), Xd(a, t, l)));
  }
  function Gd(e, t, a) {
    var l = Ot();
    hu(e, t, a, l);
  }
  function hu(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Gi(e)) Qd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, f = u(c, a);
          if (n.hasEagerState = !0, n.eagerState = f, Ct(f, c))
            return pi(e, t, n, 0), ze === null && yi(), !1;
        } catch {
        } finally {
        }
      if (a = pc(e, t, n, l), a !== null)
        return jt(a, e, l), Xd(a, t, l), !0;
    }
    return !1;
  }
  function er(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Zr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gi(e)) {
      if (t) throw Error(o(479));
    } else
      t = pc(
        e,
        a,
        l,
        2
      ), t !== null && jt(t, e, 2);
  }
  function Gi(e) {
    var t = e.alternate;
    return e === ie || t !== null && t === ie;
  }
  function Qd(e, t) {
    rn = Oi = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Xd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Xo(e, a);
    }
  }
  var Qi = {
    readContext: nt,
    use: Li,
    useCallback: Be,
    useContext: Be,
    useEffect: Be,
    useImperativeHandle: Be,
    useLayoutEffect: Be,
    useInsertionEffect: Be,
    useMemo: Be,
    useReducer: Be,
    useRef: Be,
    useState: Be,
    useDebugValue: Be,
    useDeferredValue: Be,
    useTransition: Be,
    useSyncExternalStore: Be,
    useId: Be,
    useHostTransitionStatus: Be,
    useFormState: Be,
    useActionState: Be,
    useOptimistic: Be,
    useMemoCache: Be,
    useCacheRefresh: Be,
    useEffectEvent: Be
  }, Zd = {
    readContext: nt,
    use: Li,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nt,
    useEffect: Ed,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Bi(
        4194308,
        4,
        Dd.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Bi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Bi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = mt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ml) {
        Qa(!0);
        try {
          e();
        } finally {
          Qa(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = mt();
      if (a !== void 0) {
        var n = a(t);
        if (Ml) {
          Qa(!0);
          try {
            a(t);
          } finally {
            Qa(!1);
          }
        }
      } else n = t;
      return l.memoizedState = l.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, l.queue = e, e = e.dispatch = ny.bind(
        null,
        ie,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = mt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Jc(e);
      var t = e.queue, a = Gd.bind(null, ie, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = mt();
      return Wc(a, e, t);
    },
    useTransition: function() {
      var e = Jc(!1);
      return e = Hd.bind(
        null,
        ie,
        e.queue,
        !0,
        !1
      ), mt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = ie, n = mt();
      if (re) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), ze === null)
          throw Error(o(349));
        (ve & 127) !== 0 || fd(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, Ed(vd.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, fn(
        9,
        { destroy: void 0 },
        dd.bind(
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
      var e = mt(), t = ze.identifierPrefix;
      if (re) {
        var a = ra, l = ca;
        a = (l & ~(1 << 32 - Et(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ui++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Wg++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Pc,
    useFormState: xd,
    useActionState: xd,
    useOptimistic: function(e) {
      var t = mt();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = er.bind(
        null,
        ie,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Zc,
    useCacheRefresh: function() {
      return mt().memoizedState = ly.bind(
        null,
        ie
      );
    },
    useEffectEvent: function(e) {
      var t = mt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((Te & 2) !== 0)
          throw Error(o(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Vd = {
    readContext: nt,
    use: Li,
    useCallback: Md,
    useContext: nt,
    useEffect: $c,
    useImperativeHandle: Rd,
    useInsertionEffect: Cd,
    useLayoutEffect: zd,
    useMemo: Od,
    useReducer: qi,
    useRef: wd,
    useState: function() {
      return qi(Ra);
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Ud(
        a,
        Ce.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = qi(Ra)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : mu(e),
        t
      ];
    },
    useSyncExternalStore: od,
    useId: Bd,
    useHostTransitionStatus: Pc,
    useFormState: jd,
    useActionState: jd,
    useOptimistic: function(e, t) {
      var a = Qe();
      return gd(a, Ce, e, t);
    },
    useMemoCache: Zc,
    useCacheRefresh: Yd,
    useEffectEvent: Ad
  }, uy = {
    readContext: nt,
    use: Li,
    useCallback: Md,
    useContext: nt,
    useEffect: $c,
    useImperativeHandle: Rd,
    useInsertionEffect: Cd,
    useLayoutEffect: zd,
    useMemo: Od,
    useReducer: Kc,
    useRef: wd,
    useState: function() {
      return Kc(Ra);
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Ce === null ? Wc(a, e, t) : Ud(
        a,
        Ce.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Kc(Ra)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : mu(e),
        t
      ];
    },
    useSyncExternalStore: od,
    useId: Bd,
    useHostTransitionStatus: Pc,
    useFormState: Nd,
    useActionState: Nd,
    useOptimistic: function(e, t) {
      var a = Qe();
      return Ce !== null ? gd(a, Ce, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Zc,
    useCacheRefresh: Yd,
    useEffectEvent: Ad
  };
  function tr(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : I({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var ar = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Wa(l);
      n.payload = t, a != null && (n.callback = a), t = Ia(e, n, l), t !== null && (jt(t, e, l), ru(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Wa(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Ia(e, n, l), t !== null && (jt(t, e, l), ru(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Ot(), l = Wa(a);
      l.tag = 2, t != null && (l.callback = t), t = Ia(e, l, a), t !== null && (jt(t, e, a), ru(t, e, a));
    }
  };
  function Kd(e, t, a, l, n, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, c) : t.prototype && t.prototype.isPureReactComponent ? !tu(a, l) || !tu(n, u) : !0;
  }
  function Jd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && ar.enqueueReplaceState(t, t.state, null);
  }
  function Ol(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = I({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function kd(e) {
    gi(e);
  }
  function $d(e) {
    console.error(e);
  }
  function Fd(e) {
    gi(e);
  }
  function Xi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Wd(e, t, a) {
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
  function lr(e, t, a) {
    return a = Wa(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Xi(e, t);
    }, a;
  }
  function Id(e) {
    return e = Wa(e), e.tag = 3, e;
  }
  function Pd(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Wd(t, a, l);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      Wd(t, a, l), typeof n != "function" && (il === null ? il = /* @__PURE__ */ new Set([this]) : il.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function iy(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && wl(
        t,
        a,
        n,
        !0
      ), a = ut.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return ft === null ? os() : a.alternate === null && Ye === 0 && (Ye = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === Ci ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Gr(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === Ci ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Gr(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Gr(e, l, n), os(), !1;
    }
    if (re)
      return t = ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== jc && (e = Error(o(422), { cause: l }), nu(Yt(e, a)))) : (l !== jc && (t = Error(o(423), {
        cause: l
      }), nu(
        Yt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Yt(l, a), n = lr(
        e.stateNode,
        l,
        n
      ), Mc(e, n), Ye !== 4 && (Ye = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Yt(u, a), ju === null ? ju = [u] : ju.push(u), Ye !== 4 && (Ye = 2), t === null) return !0;
    l = Yt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = lr(a.stateNode, l, e), Mc(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (il === null || !il.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = Id(n), Pd(
              n,
              e,
              a,
              l
            ), Mc(a, n), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var nr = Error(o(461)), Ke = !1;
  function $e(e, t, a, l) {
    t.child = e === null ? ld(t, null, a, l) : Rl(
      t,
      e.child,
      a,
      l
    );
  }
  function ev(e, t, a, l, n) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var c = {};
      for (var f in l)
        f !== "ref" && (c[f] = l[f]);
    } else c = l;
    return El(t), l = Yc(
      e,
      t,
      a,
      c,
      u,
      n
    ), f = Gc(), e !== null && !Ke ? (Qc(e, t, n), Ma(e, t, n)) : (re && f && xi(t), t.flags |= 1, $e(e, t, l, n), t.child);
  }
  function tv(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !_c(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, av(
        e,
        t,
        u,
        l,
        n
      )) : (e = Si(
        a.type,
        null,
        l,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !dr(e, n)) {
      var c = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : tu, a(c, l) && e.ref === t.ref)
        return Ma(e, t, n);
    }
    return t.flags |= 1, e = Ea(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function av(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (tu(u, l) && e.ref === t.ref)
        if (Ke = !1, t.pendingProps = l = u, dr(e, n))
          (e.flags & 131072) !== 0 && (Ke = !0);
        else
          return t.lanes = e.lanes, Ma(e, t, n);
    }
    return ur(
      e,
      t,
      a,
      l,
      n
    );
  }
  function lv(e, t, a, l) {
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
        return nv(
          e,
          t,
          u,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ei(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? id(t, u) : Uc(), sd(t);
      else
        return l = t.lanes = 536870912, nv(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Ei(t, u.cachePool), id(t, u), tl(), t.memoizedState = null) : (e !== null && Ei(t, null), Uc(), tl());
    return $e(e, t, n, a), t.child;
  }
  function gu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function nv(e, t, a, l, n) {
    var u = Cc();
    return u = u === null ? null : { parent: Ze._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ei(t, null), Uc(), sd(t), e !== null && wl(e, t, l, !0), t.childLanes = n, null;
  }
  function Zi(e, t) {
    return t = Vi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function uv(e, t, a) {
    return Rl(t, e.child, null, a), e = Zi(t, t.pendingProps), e.flags |= 2, zt(t), t.memoizedState = null, e;
  }
  function sy(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (re) {
        if (l.mode === "hidden")
          return e = Zi(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, gu(null, e);
        if (Lc(t), (e = Me) ? (e = Dm(
          e,
          Xt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Va !== null ? { id: ca, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Qf(e), a.return = t, t.child = a, Pe = t, Me = null)) : e = null, e === null) throw Ja(t);
        return t.lanes = 536870912, null;
      }
      return Zi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Lc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = uv(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Ke || wl(e, t, a, !1), n = (a & e.childLanes) !== 0, Ke || n) {
        if (Pa.current === null) {
          if (l = ze, l !== null && (c = Zo(l, a), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, xl(e, c), jt(l, e, c), nr;
          os();
        }
        t = uv(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, Me = Vt(c.nextSibling), Pe = t, re = !0, Ka = null, Xt = !1, e !== null && Vf(t, e), t = Zi(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function dn(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function ur(e, t, a, l, n) {
    return El(t), a = Yc(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Gc(), e !== null && !Ke ? (Qc(e, t, n), Ma(e, t, n)) : (re && l && xi(t), t.flags |= 1, $e(e, t, a, n), t.child);
  }
  function iv(e, t, a, l, n, u) {
    return El(t), t.updateQueue = null, a = rd(
      t,
      l,
      a,
      n
    ), cd(e), l = Gc(), e !== null && !Ke ? (Qc(e, t, u), Ma(e, t, u)) : (re && l && xi(t), t.flags |= 1, $e(e, t, a, u), t.child);
  }
  function sv(e, t, a, l, n) {
    if (El(t), t.stateNode === null) {
      var u = tn, c = a.contextType;
      typeof c == "object" && c !== null && (u = nt(c)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ar, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, Dc(t), c = a.contextType, u.context = typeof c == "object" && c !== null ? nt(c) : tn, u.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (tr(
        t,
        a,
        c,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ar.enqueueReplaceState(u, u.state, null), fu(t, l, u, n), ou(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, m = Ol(a, f);
      u.props = m;
      var x = u.context, C = a.contextType;
      c = tn, typeof C == "object" && C !== null && (c = nt(C));
      var O = a.getDerivedStateFromProps;
      C = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, C || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || x !== c) && Jd(
        t,
        u,
        l,
        c
      ), Fa = !1;
      var _ = t.memoizedState;
      u.state = _, fu(t, l, u, n), ou(), x = t.memoizedState, f || _ !== x || Fa ? (typeof O == "function" && (tr(
        t,
        a,
        O,
        l
      ), x = t.memoizedState), (m = Fa || Kd(
        t,
        a,
        m,
        l,
        _,
        x,
        c
      )) ? (C || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = x), u.props = l, u.state = x, u.context = c, l = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Rc(e, t), c = t.memoizedProps, C = Ol(a, c), u.props = C, O = t.pendingProps, _ = u.context, x = a.contextType, m = tn, typeof x == "object" && x !== null && (m = nt(x)), f = a.getDerivedStateFromProps, (x = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== O || _ !== m) && Jd(
        t,
        u,
        l,
        m
      ), Fa = !1, _ = t.memoizedState, u.state = _, fu(t, l, u, n), ou();
      var w = t.memoizedState;
      c !== O || _ !== w || Fa || e !== null && e.dependencies !== null && Ni(e.dependencies) ? (typeof f == "function" && (tr(
        t,
        a,
        f,
        l
      ), w = t.memoizedState), (C = Fa || Kd(
        t,
        a,
        C,
        l,
        _,
        w,
        m
      ) || e !== null && e.dependencies !== null && Ni(e.dependencies)) ? (x || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, w, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        w,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = w), u.props = l, u.state = w, u.context = m, l = C) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, dn(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = Rl(
      t,
      e.child,
      null,
      n
    ), t.child = Rl(
      t,
      null,
      a,
      n
    )) : $e(e, t, a, n), t.memoizedState = u.state, e = t.child) : e = Ma(
      e,
      t,
      n
    ), e;
  }
  function cv(e, t, a, l) {
    return Tl(), t.flags |= 256, $e(e, t, a, l), t.child;
  }
  var ir = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sr(e) {
    return { baseLanes: e, cachePool: Wf() };
  }
  function cr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Mt), e;
  }
  function rv(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (it.current & 2) !== 0), c && (n = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (re) {
        if (n ? el(t) : tl(), (e = Me) ? (e = Dm(
          e,
          Xt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Va !== null ? { id: ca, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Qf(e), a.return = t, t.child = a, Pe = t, Me = null)) : e = null, e === null) throw Ja(t);
        return so(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (tl(), n = t.mode, u = Vi(
        { mode: "hidden", children: u },
        n
      ), l = jl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = sr(a), l.childLanes = cr(
        e,
        c,
        a
      ), t.memoizedState = ir, gu(null, l)) : (el(t), rr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var m = f.dehydrated;
      if (m !== null)
        return cy(
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
    return n ? (tl(), n = l.fallback, u = t.mode, f = e.child, m = f.sibling, l = Ea(f, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, m !== null ? n = Ea(m, n) : (n = jl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, gu(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = sr(a) : (u = n.cachePool, u !== null ? (f = Ze._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Wf(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = cr(
      e,
      c,
      a
    ), t.memoizedState = ir, gu(e.child, l)) : (el(t), a = e.child, e = a.sibling, a = Ea(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function rr(e, t) {
    return t = Vi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Vi(e, t) {
    return e = _t(22, e, null, t), e.lanes = 0, e;
  }
  function Ki(e, t, a) {
    return Rl(t, e.child, null, a), e = rr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function cy(e, t, a, l, n, u, c, f) {
    if (a)
      return t.flags & 256 ? (el(t), t.flags &= -257, Ki(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (tl(), t.child = e.child, t.flags |= 128, null) : (tl(), u = n.fallback, c = t.mode, n = Vi(
        { mode: "visible", children: n.children },
        c
      ), u = jl(
        u,
        c,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Rl(t, e.child, null, f), n = t.child, n.memoizedState = sr(f), n.childLanes = cr(
        e,
        l,
        f
      ), t.memoizedState = ir, gu(null, n));
    if (el(t), so(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var m = l.dgst;
      return l = m, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, nu({ value: n, source: null, stack: null })), Ki(
        e,
        t,
        f
      );
    }
    if (Ke || wl(e, t, f, !1), l = (f & e.childLanes) !== 0, Ke || l) {
      if (Pa.current !== null)
        return Ki(
          e,
          t,
          f
        );
      if (l = ze, l !== null && (n = Zo(
        l,
        f
      ), n !== 0 && n !== c.retryLane))
        throw c.retryLane = n, xl(e, n), jt(l, e, n), nr;
      return io(u) || os(), Ki(
        e,
        t,
        f
      );
    }
    return io(u) ? (t.flags |= 192, t.child = e.child, null) : (e = c.treeContext, Me = Vt(u.nextSibling), Pe = t, re = !0, Ka = null, Xt = !1, e !== null && Vf(t, e), t = rr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function ov(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Ti(e.return, t, a);
  }
  function fv(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && Mi(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Ji(e, t, a, l, n, u) {
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
  function or(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var a = t.sibling;
      t.sibling = e.child, e.child = t, t = a;
    }
  }
  function fr(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, u = l.tail;
    l = l.children;
    var c = it.current;
    if (t.flags & 128)
      return du(t, c), null;
    var f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, du(t, c), n === "backwards" && e !== null ? (or(e), $e(e, t, l, a), or(e)) : $e(e, t, l, a), l = re ? lu : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && ov(e, a, t);
        else if (e.tag === 19)
          ov(e, a, t);
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
        a = fv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, or(t)), Ji(
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
          if (e = n.alternate, e !== null && Mi(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = a, a = n, n = e;
        }
        Ji(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        Ji(
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
        a = fv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), Ji(
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
  function dv(e, t, a) {
    var l = t.pendingProps;
    return ka(t, t.type, l.value), $e(e, t, l.children, a), t.child;
  }
  function Ma(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ul |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (wl(
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
      for (e = t.child, a = Ea(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Ea(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function dr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ni(e)));
  }
  function ry(e, t, a) {
    switch (t.tag) {
      case 3:
        Iu(t, t.stateNode.containerInfo), ka(t, Ze, e.memoizedState.cache), Tl();
        break;
      case 27:
      case 5:
        Bs(t);
        break;
      case 4:
        Iu(t, t.stateNode.containerInfo);
        break;
      case 10:
        ka(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Lc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return el(t), t.flags |= 128, null;
          l = wl(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? rv(e, t, a) : (el(t), e = Ma(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        }
        el(t);
        break;
      case 19:
        if (t.flags & 128)
          return fr(
            e,
            t,
            a
          );
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (wl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return fr(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), du(t, it.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, lv(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ka(t, Ze, e.memoizedState.cache);
    }
    return Ma(e, t, a);
  }
  function vv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ke = !0;
      else {
        if (!dr(e, a) && (t.flags & 128) === 0)
          return Ke = !1, ry(
            e,
            t,
            a
          );
        Ke = (e.flags & 131072) !== 0;
      }
    else
      Ke = !1, re && (t.flags & 1048576) !== 0 && Zf(t, lu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = zl(t.elementType), t.type = e, typeof e == "function")
            _c(e) ? (l = Ol(e, l), t.tag = 1, t = sv(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = ur(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === Q) {
                t.tag = 11, t = ev(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ce) {
                t.tag = 14, t = tv(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === Le) {
                t.tag = 10, t.type = e, t = dv(
                  null,
                  t,
                  a
                );
                break e;
              }
            }
            throw t = Se(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return ur(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = Ol(
          l,
          t.pendingProps
        ), sv(
          e,
          t,
          l,
          n,
          a
        );
      case 3:
        e: {
          if (Iu(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Rc(e, t), fu(t, l, null, a);
          var c = t.memoizedState;
          if (l = c.cache, ka(t, Ze, l), l !== u.cache && wc(
            t,
            [Ze],
            a,
            !0
          ), ou(), l = c.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = cv(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== n) {
              n = Yt(
                Error(o(424)),
                t
              ), nu(n), t = cv(
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
              for (Me = Vt(e.firstChild), Pe = t, re = !0, Ka = null, Xt = !0, a = ld(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (Tl(), l === n) {
              t = Ma(
                e,
                t,
                a
              );
              break e;
            }
            $e(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return dn(e, t), e === null ? (a = qm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : re || (t.stateNode = ym(
          t.type,
          t.pendingProps,
          Ya.current,
          t
        )) : t.memoizedState = qm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Bs(t), e === null && re && (l = t.stateNode = Om(
          t.type,
          t.pendingProps,
          Ya.current
        ), Pe = t, Xt = !0, n = Me, rl(t.type) ? (co = n, Me = Vt(l.firstChild)) : Me = n), $e(
          e,
          t,
          t.pendingProps.children,
          a
        ), dn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && re && ((n = l = Me) && (l = l0(
          l,
          t.type,
          t.pendingProps,
          Xt
        ), l !== null ? (t.stateNode = l, Pe = t, Me = Vt(l.firstChild), Xt = !1, n = !0) : n = !1), n || Ja(t)), Bs(t), n = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, l = u.children, Pr(n, u) ? l = null : c !== null && Pr(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = Yc(
          e,
          t,
          Ig,
          null,
          null,
          a
        ), zn._currentValue = n), dn(e, t), $e(e, t, l, a), t.child;
      case 6:
        return e === null && re && ((e = a = Me) && (a = n0(
          a,
          t.pendingProps,
          Xt
        ), a !== null ? (t.stateNode = a, Pe = t, Me = null, e = !0) : e = !1), e || Ja(t)), null;
      case 13:
        return rv(e, t, a);
      case 4:
        return Iu(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Rl(
          t,
          null,
          l,
          a
        ) : $e(e, t, l, a), t.child;
      case 11:
        return ev(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, dn(e, t), $e(e, t, l, a), t.child;
      case 8:
        return $e(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return $e(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return dv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, El(t), n = nt(n), l = l(n), t.flags |= 1, $e(e, t, l, a), t.child;
      case 14:
        return tv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return av(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return fr(e, t, a);
      case 31:
        return sy(e, t, a);
      case 22:
        return lv(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return El(t), l = nt(Ze), e === null ? (n = Cc(), n === null && (n = ze, u = Ec(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, Dc(t), ka(t, Ze, n)) : ((e.lanes & a) !== 0 && (Rc(e, t), fu(t, null, null, a), ou()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ka(t, Ze, l)) : (l = u.cache, ka(t, Ze, l), l !== n.cache && wc(
          t,
          [Ze],
          a,
          !0
        ))), $e(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : re && xi(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : dn(e, t), $e(e, t, l.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Oa(e) {
    e.flags |= 4;
  }
  function vr(e, t, a, l, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Qm(t, l) : Qm(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (kv()) e.flags |= 8192;
        else
          throw Dl = Ci, zc;
    } else e.flags &= -16777217;
  }
  function mv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Xm(t))
      if (kv()) e.flags |= 8192;
      else
        throw Dl = Ci, zc;
  }
  function ki(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Go() : 536870912, e.lanes |= t, yn |= t);
  }
  function yu(e, t) {
    if (!re)
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
  function oy(e, t, a) {
    var l = t.pendingProps;
    switch (xc(t), t.tag) {
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
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), za(Ze), Ql(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (nn(t) ? Oa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Tc())), Oe(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Oa(t), u !== null ? (Oe(t), mv(t, u)) : (Oe(t), vr(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (Oa(t), Oe(t), mv(t, u)) : (Oe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Oa(t), Oe(t), vr(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if (Pu(t), a = Ya.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Oe(t), t.subtreeFlags &= -33554433, null;
          }
          e = ia.current, nn(t) ? Kf(t) : (e = Om(n, l, a), t.stateNode = e, Oa(t));
        }
        return Oe(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Pu(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Oe(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = ia.current, nn(t))
            Kf(t);
          else {
            var c = Au(
              Ya.current
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
            u[lt] = t, u[pt] = l;
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
            e: switch (ct(u, n, l), n) {
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
            l && Oa(t);
          }
        }
        return Oe(t), t.subtreeFlags &= -33554433, vr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = Ya.current, nn(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = Pe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || vm(e.nodeValue, a)), e || Ja(t, !0);
          } else
            e = Au(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return Oe(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = nn(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[lt] = t;
            } else
              Tl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), e = !1;
          } else
            a = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Oe(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = nn(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[lt] = t;
            } else
              Tl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), n = !1;
          } else
            n = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return zt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), ki(t, t.updateQueue), Oe(t), null);
      case 4:
        return Ql(), e === null && kr(t.stateNode.containerInfo), t.flags |= 67108864, Oe(t), null;
      case 10:
        return za(t.type), Oe(t), null;
      case 19:
        if (qc(t), l = t.memoizedState, l === null) return Oe(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) yu(l, !1);
          else {
            if (Ye !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Mi(e), u !== null) {
                  for (t.flags |= 128, yu(l, !1), e = u.updateQueue, t.updateQueue = e, ki(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Gf(a, e), a = a.sibling;
                  return du(
                    t,
                    it.current & 1 | 2
                  ), re && Aa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Nt() > is && (t.flags |= 128, n = !0, yu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Mi(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, ki(t, e), yu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !re)
                return Oe(t), null;
            } else
              2 * Nt() - l.renderingStartTime > is && a !== 536870912 && (t.flags |= 128, n = !0, yu(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Nt(), e.sibling = null, u = it.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || re ? du(t, u) : (a = u, Re(ut, t), Re(it, a), ft === null && (ft = t)), re && Aa(t, l.treeForkCount), e;
        }
        return Oe(t), null;
      case 22:
      case 23:
        return zt(t), Hc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oe(t), a = t.updateQueue, a !== null && ki(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && at(Cl), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), za(Ze), Oe(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Oe(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function fy(e, t) {
    switch (xc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return za(Ze), Ql(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Pu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (zt(t), t.alternate === null)
            throw Error(o(340));
          Tl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (zt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Tl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return qc(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Ql(), null;
      case 10:
        return za(t.type), null;
      case 22:
      case 23:
        return zt(t), Hc(), e !== null && at(Cl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return za(Ze), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function hv(e, t) {
    switch (xc(t), t.tag) {
      case 3:
        za(Ze), Ql();
        break;
      case 26:
      case 27:
      case 5:
        Pu(t);
        break;
      case 4:
        Ql();
        break;
      case 31:
        t.memoizedState !== null && zt(t);
        break;
      case 13:
        zt(t);
        break;
      case 19:
        qc(t);
        break;
      case 10:
        za(t.type);
        break;
      case 22:
      case 23:
        zt(t), Hc(), e !== null && at(Cl);
        break;
      case 24:
        za(Ze);
    }
  }
  function pu(e, t) {
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
      Ee(t, t.return, f);
    }
  }
  function al(e, t, a) {
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
              var m = a, x = f;
              try {
                x();
              } catch (C) {
                Ee(
                  n,
                  m,
                  C
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (C) {
      Ee(t, t.return, C);
    }
  }
  function gv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        ud(t, a);
      } catch (l) {
        Ee(e, e.return, l);
      }
    }
  }
  function yv(e, t, a) {
    a.props = Ol(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ee(e, t, l);
    }
  }
  function oa(e, t) {
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
            var n = e.stateNode, u = Na(e.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = Tm(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var c = new Ut(e);
              y(
                e.child,
                !1,
                t0,
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
      Ee(e, t, f);
    }
  }
  function st(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          Ee(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          Ee(e, t, n);
        }
      else a.current = null;
  }
  function $i(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var a = 0; a < t.length; a++)
        zm(
          e.stateNode,
          t[a]
        );
  }
  function pv(e) {
    for (var t = e.return; t !== null && (hr(t) && zm(e.stateNode, t.stateNode), !mr(t)); )
      t = t.return;
  }
  function _u(e) {
    for (var t = e.return; t !== null && (hr(t) && a0(e.stateNode, t.stateNode), !mr(t)); )
      t = t.return;
  }
  function mr(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function hr(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function gr(e) {
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
      Ee(e, e.return, n);
    }
  }
  function yr(e, t, a) {
    try {
      var l = e.stateNode;
      Ly(l, e.type, a, t), l[pt] = t;
    } catch (n) {
      Ee(e, e.return, n);
    }
  }
  function _v(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && rl(e.type) || e.tag === 4;
  }
  function pr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || _v(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && rl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function _r(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = sa)), $i(e, l), be = !0;
    else if (n !== 4 && (n === 27 && ($i(e, l), l = null, rl(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
      for (_r(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        _r(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function Fi(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? a.insertBefore(n, t) : a.appendChild(n), $i(e, l), be = !0;
    else if (n !== 4 && (n === 27 && ($i(e, l), l = null, rl(e.type) && (a = e.stateNode)), e = e.child, e !== null))
      for (Fi(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        Fi(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function Sv(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ct(t, l, a), t[lt] = e, t[pt] = a;
    } catch (u) {
      Ee(e, e.return, u);
    }
  }
  var Wi = !1, Dt = null;
  function bv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Wi = !0);
  }
  var fa = null;
  function xv() {
    var e = fa;
    return fa = null, e;
  }
  var St = 0;
  function vn(e, t, a, l, n) {
    return St = 0, jv(
      e.child,
      t,
      a,
      l,
      n
    );
  }
  function jv(e, t, a, l, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var c = e.stateNode;
        if (l !== null) {
          var f = ao(c);
          l.push(f), f.view && (u = !0);
        } else
          u || ao(c).view && (u = !0);
        Wi = !0, xm(
          c,
          St === 0 ? t : t + "_" + St,
          a
        ), St++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || jv(
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
  function da(e, t) {
    for (; e !== null; )
      e.tag === 5 ? jm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || da(
        e.child,
        t
      )), e = e.sibling;
  }
  function Ii(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Ii(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var a = t.name;
          t = wa(t.default, t.share), t !== "none" && (vn(
            e,
            a,
            t,
            null,
            !1
          ) || da(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function Sr(e, t) {
    if (e.tag === 30) {
      var a = e.stateNode, l = e.memoizedProps, n = Na(l, a), u = wa(
        l.default,
        a.paired ? l.share : l.enter
      );
      u !== "none" ? vn(e, n, u, null, !1) ? (Ii(e), a.paired || t || bn(e, l.onEnter)) : da(e.child, !1) : Ii(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Sr(e, t), e = e.sibling;
    else Ii(e);
  }
  function br(e) {
    if (Dt !== null && Dt.size !== 0) {
      var t = Dt;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var a = e.memoizedProps, l = a.name;
              if (l != null && l !== "auto") {
                var n = t.get(l);
                if (n !== void 0) {
                  var u = wa(
                    a.default,
                    a.share
                  );
                  if (u !== "none" && (vn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, bn(e, a.onShare)) : da(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            br(e);
          }
          e = e.sibling;
        }
    }
  }
  function xr(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, a = Na(t, e.stateNode), l = Dt !== null ? Dt.get(a) : void 0, n = wa(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      n !== "none" && (vn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, Dt.delete(a), bn(e, t.onShare)) : bn(e, t.onExit) : da(e.child, !1)), Dt !== null && br(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        xr(e), e = e.sibling;
    else
      Dt !== null && br(e);
  }
  function Tv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = Na(t, e.stateNode);
        t = wa(t.default, t.update), e.flags &= -5, t !== "none" && vn(
          e,
          a,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && Tv(e);
      e = e.sibling;
    }
  }
  function jr(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, da(e.child, !1));
          }
          jr(e);
        }
        e = e.sibling;
      }
  }
  function Pi(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, da(e.child, !1), jr(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Pi(e), e = e.sibling;
    else jr(e);
  }
  function Nv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? da(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Nv(e), e = e.sibling;
  }
  function Tr(e, t, a, l, n, u, c) {
    for (var f = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (u !== null && St < u.length) {
          var x = u[St], C = ao(m);
          (x.view || C.view) && (f = !0);
          var O;
          if (O = (e.flags & 4) === 0)
            if (C.clip) O = !0;
            else {
              O = x.rect;
              var _ = C.rect;
              O = O.y !== _.y || O.x !== _.x || O.height !== _.height || O.width !== _.width;
            }
          O && (e.flags |= 4), C.abs ? C = !x.abs : (x = x.rect, C = C.rect, C = x.height !== C.height || x.width !== C.width), C && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && xm(
          m,
          St === 0 ? a : a + "_" + St,
          n
        ), f && (e.flags & 4) !== 0 || (fa === null && (fa = []), fa.push(
          m,
          St === 0 ? l : l + "_" + St,
          t.memoizedProps
        )), St++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && c ? e.flags |= t.flags & 32 : Tr(
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
  function wv(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var a = e.memoizedProps, l = e.stateNode, n = Na(a, l), u = wa(a.default, a.update), c;
        c = e.memoizedState, e.memoizedState = null, l = e;
        var f = e.child;
        St = 0, n = Tr(
          l,
          f,
          n,
          n,
          u,
          c,
          !1
        ), (e.flags & 4) !== 0 && n && bn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && wv(e);
      e = e.sibling;
    }
  }
  var et = !1, Ne = !1, va = !1, Nr = !1, Ev = typeof WeakSet == "function" ? WeakSet : Set, tt = null, ma = !1, Su = !1, es = !1, wr = !1;
  function dy(e, t, a) {
    if (e = e.containerInfo, Wr = Dn, e = Df(e), dc(e)) {
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
            var f = 0, m = -1, x = -1, C = 0, O = 0, _ = e, w = null;
            t: for (; ; ) {
              for (var Y; _ !== l || u !== 0 && _.nodeType !== 3 || (m = f + u), _ !== c || n !== 0 && _.nodeType !== 3 || (x = f + n), _.nodeType === 3 && (f += _.nodeValue.length), (Y = _.firstChild) !== null; )
                w = _, _ = Y;
              for (; ; ) {
                if (_ === e) break t;
                if (w === l && ++C === u && (m = f), w === c && ++O === n && (x = f), (Y = _.nextSibling) !== null) break;
                _ = w, w = _.parentNode;
              }
              _ = Y;
            }
            l = m === -1 || x === -1 ? null : { start: m, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ir = { focusedElem: e, selectionRange: l }, Dn = !1, a = (a & 335544064) === a, tt = t, t = a ? 9270 : 1024; tt !== null; ) {
      if (e = tt, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && xr(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && bv(e), ts(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && xr(l), ts(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && bv(e), ts(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, tt = l) : (a && Tv(e), ts(a));
      }
    }
    Dt = null;
  }
  function ts(e) {
    for (; tt !== null; ) {
      var t = tt, a = e, l = t.alternate, n = t.flags;
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
              var c = Ol(
                t.type,
                n
              );
              a = u.getSnapshotBeforeUpdate(
                c,
                l
              ), u.__reactInternalSnapshotBeforeUpdate = a;
            } catch (f) {
              Ee(t, t.return, f);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
              uo(l);
            else if (a === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  uo(l);
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
          a && l !== null && (a = Na(
            l.memoizedProps,
            l.stateNode
          ), n = t.memoizedProps, n = wa(n.default, n.update), n !== "none" && vn(
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
        l.return = t.return, tt = l;
        break;
      }
      tt = t.return;
    }
  }
  function Av(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ha(e, a), l & 4 && pu(5, a);
        break;
      case 1:
        if (ha(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              Ee(a, a.return, c);
            }
          else {
            var n = Ol(
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
              Ee(
                a,
                a.return,
                c
              );
            }
          }
        l & 64 && gv(a), l & 512 && oa(a, a.return);
        break;
      case 3:
        if (ha(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
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
            ud(e, t);
          } catch (c) {
            Ee(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Sv(a);
      case 26:
      case 5:
        ha(e, a), t === null && l & 4 && gr(a), l & 512 && oa(a, a.return);
        break;
      case 12:
        ha(e, a);
        break;
      case 31:
        ha(e, a), l & 4 && Rv(e, a);
        break;
      case 13:
        ha(e, a), l & 4 && Mv(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Ty.bind(
          null,
          a
        ), u0(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || et, !l) {
          var u = t !== null && t.memoizedState !== null || Ne;
          t = et, n = Ne, et = l, (Ne = u) && !n ? (l = 2, (a.subtreeFlags & 8772) !== 0 && (l |= 1), Pt(
            e,
            a,
            l
          )) : ha(e, a), et = t, Ne = n;
        }
        break;
      case 30:
        ha(e, a), l & 512 && oa(a, a.return);
        break;
      case 7:
        l & 512 && oa(a, a.return);
      default:
        ha(e, a);
    }
  }
  function Er(e, t) {
    for (e = e.child; e !== null; )
      Cv(e, t), e = e.sibling;
  }
  function Cv(e, t) {
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
          Ee(e, e.return, m);
        }
        Ar(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, be = !0;
        } catch (m) {
          Ee(e, e.return, m);
        }
        break;
      case 18:
        try {
          var f = e.stateNode;
          t ? bm(f, !0) : bm(e.stateNode, !1);
        } catch (m) {
          Ee(e, e.return, m);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && Er(e, t);
        break;
      default:
        Er(e, t);
    }
  }
  function Ar(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var a = e, l = t;
          switch (a.tag) {
            case 4:
              Cv(a, l);
              break e;
            case 22:
              a.memoizedState === null && Ar(a, l);
              break e;
            default:
              Ar(a, l);
          }
        }
        e = e.sibling;
      }
  }
  function zv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, zv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ii(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ue = null, bt = !1;
  function Wt(e, t, a) {
    for (a = a.child; a !== null; )
      Dv(e, t, a), a = a.sibling;
  }
  function Dv(e, t, a) {
    if (wt && typeof wt.onCommitFiberUnmount == "function")
      try {
        wt.onCommitFiberUnmount(Xn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Ne || st(a, t), Wt(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !Ne && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Ne || st(a, t), _u(a);
        var l = Ue, n = bt;
        rl(a.type) && (Ue = a.stateNode, bt = !1), Wt(
          e,
          t,
          a
        ), Um(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), Ue = l, bt = n;
        break;
      case 5:
        Ne || st(a, t), _u(a);
      case 6:
        if (a.tag === 6 && _u(a), l = Ue, n = bt, Ue = null, Wt(
          e,
          t,
          a
        ), Ue = l, bt = n, Ue !== null)
          if (bt)
            try {
              (Ue.nodeType === 9 ? Ue.body : Ue.nodeName === "HTML" ? Ue.ownerDocument.body : Ue).removeChild(a.stateNode), be = !0;
            } catch (u) {
              Ee(
                a,
                t,
                u
              );
            }
          else
            try {
              Ue.removeChild(a.stateNode), be = !0;
            } catch (u) {
              Ee(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        Ue !== null && (bt ? (e = Ue, Sm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Rn(e)) : Sm(Ue, a.stateNode));
        break;
      case 4:
        l = Ue, n = bt, Ue = a.stateNode.containerInfo, bt = !0, Wt(
          e,
          t,
          a
        ), Ue = l, bt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        al(2, a, t), Ne || al(4, a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 1:
        Ne || (st(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && yv(
          a,
          t,
          l
        )), Wt(
          e,
          t,
          a
        );
        break;
      case 21:
        Wt(
          e,
          t,
          a
        );
        break;
      case 22:
        Ne = (l = Ne) || a.memoizedState !== null, Wt(
          e,
          t,
          a
        ), Ne = l;
        break;
      case 30:
        st(a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 7:
        Ne || st(a, t), Wt(
          e,
          t,
          a
        );
        break;
      default:
        Wt(
          e,
          t,
          a
        );
    }
  }
  function Rv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Rn(e);
      } catch (a) {
        Ee(t, t.return, a);
      }
    }
  }
  function Mv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Rn(e);
      } catch (a) {
        Ee(t, t.return, a);
      }
  }
  function vy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ev()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ev()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function as(e, t) {
    var a = vy(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var n = Ny.bind(null, e, l);
        l.then(n, n);
      }
    });
  }
  function ht(e, t, a) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n], c = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (rl(m.type)) {
                Ue = m.stateNode, bt = !1;
                break e;
              }
              break;
            case 5:
              Ue = m.stateNode, bt = !1;
              break e;
            case 3:
            case 4:
              Ue = m.stateNode.containerInfo, bt = !0;
              break e;
          }
          m = m.return;
        }
        if (Ue === null) throw Error(o(160));
        Dv(c, f, u), Ue = null, bt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Ov(t, e, a), t = t.sibling;
  }
  var It = null;
  function Ov(e, t, a) {
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
        ht(t, e, a), gt(e), n & 4 && (al(3, e, e.return), pu(3, e), al(5, e, e.return));
        break;
      case 1:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), n & 64 && et && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = It, ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (et)
                  e.stateNode = ym(
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
                        l = n.getElementsByTagName("title")[0], (!l || l[Kn] || l[lt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = n.createElement(t), n.head.insertBefore(
                          l,
                          n.querySelector("head > title")
                        )), ct(l, t, a), l[lt] = e, Ie(l), t = l;
                        break e;
                      case "link":
                        if (u = Gm(
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
                        l = n.createElement(t), ct(l, t, a), n.head.appendChild(l);
                        break;
                      case "meta":
                        if (u = Gm(
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
                        l = n.createElement(t), ct(l, t, a), n.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[lt] = e, Ie(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                et || vo(u, e.type, e.stateNode);
            else
              e.stateNode = Ym(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || Ne || t.parentNode.removeChild(t)) : n.count--, a === null ? et || vo(u, e.type, e.stateNode) : Ym(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && yr(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), l !== null && n & 4 && yr(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = va, va = !1, ht(t, e, a), va = u, gt(e), n & 512 && (Ne || l === null || st(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            kl(t, ""), be = !0;
          } catch (C) {
            Ee(e, e.return, C);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, yr(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), n & 1024 && (Nr = !0);
        break;
      case 6:
        if (ht(t, e, a), gt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = t, be = !0;
          } catch (C) {
            Ee(e, e.return, C);
          }
        }
        break;
      case 3:
        if (be = !1, ys = null, u = It, It = Cu(t.containerInfo), ht(t, e, a), It = u, gt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Rn(t.containerInfo);
          } catch (C) {
            Ee(e, e.return, C);
          }
        Nr && (Nr = !1, Uv(e)), be = !1;
        break;
      case 4:
        n = va, va = et, l = ef(), u = It, It = Cu(
          e.stateNode.containerInfo
        ), ht(t, e, a), gt(e), It = u, be && Su && (es = !0), be = l, va = n;
        break;
      case 12:
        ht(t, e, a), gt(e);
        break;
      case 31:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, as(e, t)));
        break;
      case 13:
        ht(t, e, a), gt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (us = Nt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, as(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, c = l !== null && l.memoizedState !== null;
        var f = et, m = Ne, x = va;
        et = f || u, va = x || u, Ne = m || c, ht(t, e, a), Ne = m, va = x, et = f, gt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || c || et || Ne || (t = c || Ne, a = et, l = Ne, et = u || et, Ne = t, ll(e, 2), et = a, Ne = l), !u && va || Er(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, as(e, a))));
        break;
      case 19:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, as(e, t)));
        break;
      case 30:
        n & 512 && (Ne || l === null || st(l, l.return)), n = ef(), u = Su, c = (a & 335544064) === a, f = e.memoizedProps, Su = c && wa(
          f.default,
          f.update
        ) !== "none", ht(t, e, a), gt(e), c && l !== null && be && (e.flags |= 4), Su = u, be = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Ne || l === null || st(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        ht(t, e, a), gt(e);
    }
  }
  function gt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (_v(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var n = e.return; n !== null; ) {
          if (hr(n)) {
            var u = n.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (mr(n)) break;
          n = n.return;
        }
        var c = l;
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, m = pr(e);
            Fi(
              e,
              m,
              f,
              c
            );
            break;
          case 5:
            var x = a.stateNode;
            a.flags & 32 && (kl(x, ""), a.flags &= -33);
            var C = pr(e);
            Fi(
              e,
              C,
              x,
              c
            );
            break;
          case 3:
          case 4:
            var O = a.stateNode.containerInfo, _ = pr(e);
            _r(
              e,
              _,
              O,
              c
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (w) {
        Ee(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Uv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Uv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Dn = !0, t.reset(), Dn = !1), e = e.sibling;
      }
  }
  function mn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Hv(t, e), t = t.sibling;
    else wv(t);
  }
  function Hv(e, t) {
    var a = e.alternate;
    if (a === null) Sr(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (wr = ma = !1, xv(), mn(t, e), !ma && !es) {
            if (e = fa, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                a = e[l];
                var n = e[l + 1];
                jm(a, e[l + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
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
            )), wr = !0;
          }
          fa = null;
          break;
        case 5:
          mn(t, e);
          break;
        case 4:
          l = ma, ma = !1, mn(t, e), ma && (es = !0), ma = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? Sr(e, !1) : mn(t, e));
          break;
        case 30:
          l = ma, n = xv(), ma = !1, mn(t, e), ma && (e.flags |= 4);
          var u = e.memoizedProps, c = e.stateNode;
          t = Na(u, c), c = Na(a.memoizedProps, c);
          var f = wa(u.default, u.update);
          f === "none" ? t = !1 : (u = a.memoizedState, a.memoizedState = null, a = e.child, St = 0, t = Tr(
            e,
            a,
            t,
            c,
            f,
            u,
            !0
          ), St !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (bn(
            e,
            e.memoizedProps.onUpdate
          ), fa = n) : n !== null && (n.push.apply(n, fa), fa = n), ma = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          mn(t, e);
      }
  }
  function ha(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Av(e, t.alternate, t), t = t.sibling;
  }
  function ll(e, t) {
    for (e = e.child; e !== null; ) {
      var a = e, l = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          al(4, a, a.return), ll(
            a,
            l
          );
          break;
        case 1:
          st(a, a.return);
          var n = a.stateNode;
          typeof n.componentWillUnmount == "function" && yv(
            a,
            a.return,
            n
          ), ll(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Um(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          st(a, a.return), a.tag !== 5 && a.tag !== 27 || _u(a), ll(
            a,
            l
          );
          break;
        case 6:
          _u(a);
          break;
        case 26:
          st(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || Ne || n.parentNode.removeChild(n), ll(
            a,
            l
          );
          break;
        case 22:
          a.memoizedState === null && ll(
            a,
            l
          );
          break;
        case 30:
          st(a, a.return), ll(
            a,
            l
          );
          break;
        case 7:
          st(a, a.return);
        default:
          ll(
            a,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Pt(e, t, a) {
    for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, u = t, c = u.flags, f = (a & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Pt(
            n,
            u,
            a
          ), pu(4, u);
          break;
        case 1:
          if (Pt(
            n,
            u,
            a
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (C) {
              Ee(l, l.return, C);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var m = l.stateNode;
            try {
              var x = n.shared.hiddenCallbacks;
              if (x !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < x.length; n++)
                  nd(x[n], m);
            } catch (C) {
              Ee(l, l.return, C);
            }
          }
          f && c & 64 && gv(u), oa(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && Sv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || pv(u), Pt(
            n,
            u,
            a
          ), f && l === null && c & 4 && gr(u), oa(u, u.return);
          break;
        case 6:
          pv(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || et || vo(
            Cu(m.ownerDocument),
            u.type,
            m
          ), Pt(
            n,
            u,
            a
          ), f && l === null && c & 4 && gr(u), oa(u, u.return);
          break;
        case 12:
          Pt(
            n,
            u,
            a
          );
          break;
        case 31:
          Pt(
            n,
            u,
            a
          ), f && c & 4 && Rv(n, u);
          break;
        case 13:
          Pt(
            n,
            u,
            a
          ), f && c & 4 && Mv(n, u);
          break;
        case 22:
          u.memoizedState === null && Pt(
            n,
            u,
            a
          ), oa(u, u.return);
          break;
        case 30:
          Pt(
            n,
            u,
            a
          ), oa(u, u.return);
          break;
        case 7:
          oa(u, u.return);
        default:
          Pt(
            n,
            u,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Cr(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && uu(a));
  }
  function zr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && uu(e));
  }
  function Zt(e, t, a, l) {
    var n = (a & 335544064) === a;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Lv(
          e,
          t,
          a,
          l
        ), t = t.sibling;
    else n && Nv(t);
  }
  function Lv(e, t, a, l) {
    var n = (a & 335544064) === a;
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && Pi(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(
          e,
          t,
          a,
          l
        ), u & 2048 && pu(9, t);
        break;
      case 1:
        Zt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Zt(
          e,
          t,
          a,
          l
        ), n && wr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && uu(u)));
        break;
      case 12:
        if (u & 2048) {
          Zt(
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
          } catch (x) {
            Ee(t, t.return, x);
          }
        } else
          Zt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Zt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Zt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Pi(f), c._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : bu(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && Pi(t), c._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : (c._visibility |= 2, hn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Cr(f, t);
        break;
      case 24:
        Zt(
          e,
          t,
          a,
          l
        ), u & 2048 && zr(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (da(u.child, !0), da(t.child, !0))), Zt(
          e,
          t,
          a,
          l
        );
        break;
      default:
        Zt(
          e,
          t,
          a,
          l
        );
    }
  }
  function hn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, f = a, m = l, x = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          hn(
            u,
            c,
            f,
            m,
            n
          ), pu(8, c);
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          c.memoizedState !== null ? C._visibility & 2 ? hn(
            u,
            c,
            f,
            m,
            n
          ) : bu(
            u,
            c
          ) : (C._visibility |= 2, hn(
            u,
            c,
            f,
            m,
            n
          )), n && x & 2048 && Cr(
            c.alternate,
            c
          );
          break;
        case 24:
          hn(
            u,
            c,
            f,
            m,
            n
          ), n && x & 2048 && zr(c.alternate, c);
          break;
        default:
          hn(
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
  function bu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            bu(a, l), n & 2048 && Cr(
              l.alternate,
              l
            );
            break;
          case 24:
            bu(a, l), n & 2048 && zr(l.alternate, l);
            break;
          default:
            bu(a, l);
        }
        t = t.sibling;
      }
  }
  var Ul = 8192;
  function Hl(e, t, a) {
    if (e.subtreeFlags & Ul)
      for (e = e.child; e !== null; )
        qv(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function qv(e, t, a) {
    switch (e.tag) {
      case 26:
        Hl(
          e,
          t,
          a
        ), e.flags & Ul && (e.memoizedState !== null ? _0(
          a,
          It,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Vm(a, e)));
        break;
      case 5:
        Hl(
          e,
          t,
          a
        ), e.flags & Ul && (e = e.stateNode, (t & 335544128) === t && Vm(a, e));
        break;
      case 3:
      case 4:
        var l = It;
        It = Cu(e.stateNode.containerInfo), Hl(
          e,
          t,
          a
        ), It = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ul, Ul = 16777216, Hl(
          e,
          t,
          a
        ), Ul = l) : Hl(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & Ul) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, Dt === null && (Dt = /* @__PURE__ */ new Map()), Dt.set(l, n);
        }
        Hl(
          e,
          t,
          a
        );
        break;
      default:
        Hl(
          e,
          t,
          a
        );
    }
  }
  function Bv(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function xu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Gv(
            l,
            e
          );
        }
      Bv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Yv(e), e = e.sibling;
  }
  function Yv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xu(e), e.flags & 2048 && al(9, e, e.return);
        break;
      case 3:
        xu(e);
        break;
      case 12:
        xu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ls(e)) : xu(e);
        break;
      default:
        xu(e);
    }
  }
  function ls(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Gv(
            l,
            e
          );
        }
      Bv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          al(8, t, t.return), ls(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, ls(t));
          break;
        default:
          ls(t);
      }
      e = e.sibling;
    }
  }
  function Gv(e, t) {
    for (; tt !== null; ) {
      var a = tt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          al(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          uu(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, tt = l;
      else
        e: for (a = e; tt !== null; ) {
          l = tt;
          var n = l.sibling, u = l.return;
          if (zv(l), l === a) {
            tt = null;
            break e;
          }
          if (n !== null) {
            n.return = u, tt = n;
            break e;
          }
          tt = u;
        }
    }
  }
  var my = {
    getCacheForType: function(e) {
      var t = nt(Ze), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return nt(Ze).controller.signal;
    }
  }, hy = typeof WeakMap == "function" ? WeakMap : Map, Te = 0, ze = null, fe = null, ve = 0, we = 0, Rt = null, nl = !1, gn = !1, Dr = !1, Ua = 0, Ye = 0, ul = 0, Ll = 0, ns = 0, Mt = 0, yn = 0, ju = null, xt = null, Rr = !1, us = 0, Qv = 0, is = 1 / 0, ss = null, il = null, qe = 0, ea = null, ql = null, ga = 0, Mr = 0, Or = null, Xv = null, pn = null, _n = null, Sn = null, Tu = 0, cs = null;
  function Ot() {
    return (Te & 2) !== 0 && ve !== 0 ? ve & -ve : k.T !== null ? Zr() : Vo();
  }
  function Zv() {
    if (Mt === 0)
      if ((ve & 536870912) === 0 || re) {
        var e = ai;
        ai <<= 1, (ai & 3932160) === 0 && (ai = 262144), Mt = e;
      } else Mt = 536870912;
    return e = ut.current, e !== null && (e.flags |= 32), Mt;
  }
  function bn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = Tm(
        Na(e.memoizedProps, a)
      )), _n === null && (_n = []), _n.push(t.bind(null, l));
    }
  }
  function jt(e, t, a) {
    (e === ze && (we === 2 || we === 9) || e.cancelPendingCommit !== null) && (xn(e, 0), sl(
      e,
      ve,
      Mt,
      !1
    )), Vn(e, a), ((Te & 2) === 0 || e !== ze) && (e === ze && ((Te & 2) === 0 && (Ll |= a), Ye === 4 && sl(
      e,
      ve,
      Mt,
      !1
    )), ya(e));
  }
  function Vv(e, t, a) {
    if ((Te & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Zn(e, t), n = l ? py(e, t) : Hr(e, t, !0), u = l;
    do {
      if (n === 0) {
        gn && !l && sl(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !gy(a)) {
          n = Hr(e, t, !1), u = !1;
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
              n = ju;
              var m = f.current.memoizedState.isDehydrated;
              if (m && (xn(f, c).flags |= 256), c = Hr(
                f,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (Dr && !m) {
                  f.errorRecoveryDisabledLanes |= u, Ll |= u, n = 4;
                  break e;
                }
                u = xt, xt = n, u !== null && (xt === null ? xt = u : xt.push.apply(
                  xt,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          xn(e, 0), sl(e, t, 0, !0);
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
              sl(
                l,
                t,
                Mt,
                !nl
              );
              break e;
            case 2:
              xt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = us + 300 - Nt(), 10 < n)) {
            if (sl(
              l,
              t,
              Mt,
              !nl
            ), ni(l, 0, !0) !== 0) break e;
            ga = t, l.timeoutHandle = to(
              Kv.bind(
                null,
                l,
                a,
                xt,
                ss,
                Rr,
                t,
                Mt,
                Ll,
                yn,
                nl,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Kv(
            l,
            a,
            xt,
            ss,
            Rr,
            t,
            Mt,
            Ll,
            yn,
            nl,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ya(e);
  }
  function Kv(e, t, a, l, n, u, c, f, m, x, C, O, _, w) {
    e.timeoutHandle = -1;
    var Y = t.subtreeFlags, K = (u & 335544064) === u;
    if (O = null, (K || Y & 8192 || (Y & 16785408) === 16785408) && (O = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: sa
    }, Dt = null, qv(
      t,
      u,
      O
    ), K && (Y = O, K = e.containerInfo, K = (K.nodeType === 9 ? K : K.ownerDocument).__reactViewTransition, K != null && (Y.count++, Y.waitingForViewTransition = !0, Y = Ru.bind(Y), K.finished.then(Y, Y))), Y = (u & 62914560) === u ? us - Nt() : (u & 4194048) === u ? Qv - Nt() : 0, Y = S0(
      O,
      Y
    ), Y !== null)) {
      ga = u, e.cancelPendingCommit = Y(
        em.bind(
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
          x,
          C,
          O,
          null,
          _,
          w
        )
      ), sl(e, u, c, !x);
      return;
    }
    em(
      e,
      t,
      u,
      a,
      l,
      n,
      c,
      f,
      m,
      x,
      C,
      O
    );
  }
  function gy(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Ct(u(), n)) return !1;
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
  function sl(e, t, a, l) {
    t = Yo(e, t), t &= ~ns, t &= ~Ll, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Et(n), c = 1 << u;
      l[u] = -1, n &= ~c;
    }
    a !== 0 && Qo(e, a, t);
  }
  function rs() {
    return (Te & 6) === 0 ? (Nu(0), !1) : !0;
  }
  function Ur() {
    if (fe !== null) {
      if (we === 0)
        var e = fe.return;
      else
        e = fe, Ca = Nl = null, Xc(e), cn = null, cu = 0, e = fe;
      for (; e !== null; )
        hv(e.alternate, e), e = e.return;
      fe = null;
    }
  }
  function xn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, Yy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ga = 0, Ur(), ze = e, fe = a = Ea(e.current, null), ve = t, we = 0, Rt = null, nl = !1, gn = Zn(e, t), Dr = !1, yn = Mt = ns = Ll = ul = Ye = 0, xt = ju = null, Rr = !1, Ua = Yo(e, t), yi(), a;
  }
  function Jv(e, t) {
    ie = null, k.H = Qi, t === sn || t === Ai ? (t = ed(), we = 3) : t === zc ? (t = ed(), we = 4) : we = t === nr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Rt = t, fe === null && (Ye = 1, Xi(
      e,
      Yt(t, e.current)
    ));
  }
  function kv() {
    var e = ut.current;
    return e === null ? !0 : (ve & 4194048) === ve ? ft === null : (ve & 62914560) === ve || (ve & 536870912) !== 0 ? e === ft : !1;
  }
  function $v() {
    var e = k.H;
    return k.H = Qi, e === null ? Qi : e;
  }
  function Fv() {
    var e = k.A;
    return k.A = my, e;
  }
  function os() {
    Ye = 4, nl || (ve & 4194048) !== ve && ut.current !== null || (gn = !0), (ul & 134217727) === 0 && (Ll & 134217727) === 0 || ze === null || sl(
      ze,
      ve,
      Mt,
      !1
    );
  }
  function Hr(e, t, a) {
    var l = Te;
    Te |= 2;
    var n = $v(), u = Fv();
    (ze !== e || ve !== t) && (ss = null, xn(e, t)), t = !1;
    var c = Ye;
    e: do
      try {
        if (we !== 0 && fe !== null) {
          var f = fe, m = Rt;
          switch (we) {
            case 8:
              Ur(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ut.current === null && (t = !0);
              var x = we;
              if (we = 0, Rt = null, jn(e, f, m, x), a && gn) {
                c = 0;
                break e;
              }
              break;
            default:
              x = we, we = 0, Rt = null, jn(e, f, m, x);
          }
        }
        yy(), c = Ye;
        break;
      } catch (C) {
        Jv(e, C);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ca = Nl = null, Te = l, k.H = n, k.A = u, fe === null && (ze = null, ve = 0, yi()), c;
  }
  function yy() {
    for (; fe !== null; ) Wv(fe);
  }
  function py(e, t) {
    var a = Te;
    Te |= 2;
    var l = $v(), n = Fv();
    ze !== e || ve !== t ? (ss = null, is = Nt() + 500, xn(e, t)) : gn = Zn(
      e,
      t
    );
    e: do
      try {
        if (we !== 0 && fe !== null) {
          t = fe;
          var u = Rt;
          t: switch (we) {
            case 1:
              we = 0, Rt = null, jn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (If(u)) {
                we = 0, Rt = null, Iv(t);
                break;
              }
              t = function() {
                we !== 2 && we !== 9 || ze !== e || (we = 7), ya(e);
              }, u.then(t, t);
              break e;
            case 3:
              we = 7;
              break e;
            case 4:
              we = 5;
              break e;
            case 7:
              If(u) ? (we = 0, Rt = null, Iv(t)) : (we = 0, Rt = null, jn(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (fe.tag) {
                case 26:
                  c = fe.memoizedState;
                case 5:
                case 27:
                  var f = fe;
                  if (c ? Xm(c) : f.stateNode.complete) {
                    we = 0, Rt = null;
                    var m = f.sibling;
                    if (m !== null) fe = m;
                    else {
                      var x = f.return;
                      x !== null ? (fe = x, fs(x)) : fe = null;
                    }
                    break t;
                  }
              }
              we = 0, Rt = null, jn(e, t, u, 5);
              break;
            case 6:
              we = 0, Rt = null, jn(e, t, u, 6);
              break;
            case 8:
              Ur(), Ye = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        _y();
        break;
      } catch (C) {
        Jv(e, C);
      }
    while (!0);
    return Ca = Nl = null, k.H = l, k.A = n, Te = a, fe !== null ? 0 : (ze = null, ve = 0, yi(), Ye);
  }
  function _y() {
    for (; fe !== null && !Hh(); )
      Wv(fe);
  }
  function Wv(e) {
    var t = vv(e.alternate, e, Ua);
    e.memoizedProps = e.pendingProps, t === null ? fs(e) : fe = t;
  }
  function Iv(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = iv(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ve
        );
        break;
      case 11:
        t = iv(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ve
        );
        break;
      case 5:
        Xc(t);
        var l = t;
        l === Pe && (re ? (ji(l), l.tag === 5 && l.stateNode != null && (Me = l.stateNode)) : (ji(l), re = !0));
      default:
        hv(a, t), t = fe = Gf(t, Ua), t = vv(a, t, Ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? fs(e) : fe = t;
  }
  function jn(e, t, a, l) {
    Ca = Nl = null, Xc(t), cn = null, cu = 0;
    var n = t.return;
    try {
      if (iy(
        e,
        n,
        t,
        a,
        ve
      )) {
        Ye = 1, Xi(
          e,
          Yt(a, e.current)
        ), fe = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw fe = n, u;
      Ye = 1, Xi(
        e,
        Yt(a, e.current)
      ), fe = null;
      return;
    }
    t.flags & 32768 ? (re || l === 1 ? e = !0 : gn || (ve & 536870912) !== 0 ? e = !1 : (nl = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = ut.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Pv(t, e)) : fs(t);
  }
  function fs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Pv(
          t,
          nl
        );
        return;
      }
      e = t.return;
      var a = oy(
        t.alternate,
        t,
        Ua
      );
      if (a !== null) {
        fe = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        fe = t;
        return;
      }
      fe = t = e;
    } while (t !== null);
    Ye === 0 && (Ye = 5);
  }
  function Pv(e, t) {
    do {
      var a = fy(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, fe = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        fe = e;
        return;
      }
      fe = e = a;
    } while (e !== null);
    Ye = 6, fe = null;
  }
  function em(e, t, a, l, n, u, c, f, m, x, C, O) {
    e.cancelPendingCommit = null;
    do
      ds();
    while (qe !== 0);
    if ((Te & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === ze && (fe = ze = null, ve = 0), ql = t, ea = e, ga = a, Or = n, Xv = l, Sy(
        e,
        t,
        a,
        c,
        f,
        m,
        O
      );
    }
  }
  function Sy(e, t, a, l, n, u, c) {
    var f = t.lanes | t.childLanes;
    if (Mr = f, f |= yc, Kh(
      e,
      a,
      f,
      l,
      n,
      u
    ), _n = null, (a & 335544064) === a ? (Sn = kg(e), l = 10262) : (Sn = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, wy(ei, function() {
      return Yr(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Wi = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = k.T, k.T = null, n = ae.p, ae.p = 2, u = Te, Te |= 4;
      try {
        dy(e, t, a);
      } finally {
        Te = u, ae.p = n, k.T = l;
      }
    }
    qe = 1, Wi ? pn = Ky(
      c,
      e.containerInfo,
      Sn,
      Lr,
      qr,
      xy,
      Br,
      Yr,
      by
    ) : (Lr(), qr(), Br());
  }
  function by(e) {
    if (qe !== 0) {
      var t = ea.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function xy() {
    qe === 3 && (qe = 0, Hv(ql, ea), qe = 4);
  }
  function Lr() {
    if (qe === 1) {
      qe = 0;
      var e = ea, t = ql, a = ga, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null;
        var n = ae.p;
        ae.p = 2;
        var u = Te;
        Te |= 4;
        try {
          Su = es = !1, Ov(t, e, a), a = Ir;
          var c = Df(e.containerInfo), f = a.focusedElem, m = a.selectionRange;
          if (c !== f && f && f.ownerDocument && zf(
            f.ownerDocument.documentElement,
            f
          )) {
            if (m !== null && dc(f)) {
              var x = m.start, C = m.end;
              if (C === void 0 && (C = x), "selectionStart" in f)
                f.selectionStart = x, f.selectionEnd = Math.min(
                  C,
                  f.value.length
                );
              else {
                var O = f.ownerDocument || document, _ = O && O.defaultView || window;
                if (_.getSelection) {
                  var w = _.getSelection(), Y = f.textContent.length, K = Math.min(m.start, Y), se = m.end === void 0 ? K : Math.min(m.end, Y);
                  !w.extend && K > se && (c = se, se = K, K = c);
                  var S = Cf(
                    f,
                    K
                  ), g = Cf(
                    f,
                    se
                  );
                  if (S && g && (w.rangeCount !== 1 || w.anchorNode !== S.node || w.anchorOffset !== S.offset || w.focusNode !== g.node || w.focusOffset !== g.offset)) {
                    var T = O.createRange();
                    T.setStart(S.node, S.offset), w.removeAllRanges(), K > se ? (w.addRange(T), w.extend(g.node, g.offset)) : (T.setEnd(g.node, g.offset), w.addRange(T));
                  }
                }
              }
            }
            for (O = [], w = f; w = w.parentNode; )
              w.nodeType === 1 && O.push({
                element: w,
                left: w.scrollLeft,
                top: w.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < O.length; f++) {
              var M = O[f];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          Dn = !!Wr, Ir = Wr = null;
        } finally {
          Te = u, ae.p = n, k.T = l;
        }
      }
      e.current = t, qe = 2;
    }
  }
  function qr() {
    if (qe === 2) {
      qe = 0;
      var e = ea, t = ql, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = k.T, k.T = null;
        var l = ae.p;
        ae.p = 2;
        var n = Te;
        Te |= 4;
        try {
          Av(e, t.alternate, t);
        } finally {
          Te = n, ae.p = l, k.T = a;
        }
      }
      qe = 3;
    }
  }
  function Br() {
    if (qe === 4 || qe === 3) {
      qe = 0;
      var e = pn;
      pn = null, Lh();
      var t = ea, a = ql, l = ga, n = Xv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? qe = 5 : (qe = 0, ql = ea = null, tm(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (il = null), ks(l), a = a.stateNode, wt && typeof wt.onCommitFiberRoot == "function")
        try {
          wt.onCommitFiberRoot(
            Xn,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        a = k.T, u = ae.p, ae.p = 2, k.T = null;
        try {
          for (var c = t.onRecoverableError, f = 0; f < n.length; f++) {
            var m = n[f];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          k.T = a, ae.p = u;
        }
      }
      if (n = _n, c = Sn, Sn = null, n !== null && (_n = null, c === null && (c = []), e !== null))
        for (m = 0; m < n.length; m++)
          a = (0, n[m])(
            c
          ), a !== void 0 && e.finished.finally(a);
      (ga & 3) !== 0 && ds(), ya(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === cs ? Tu++ : (Tu = 0, cs = t) : (Tu = 0, cs = null), Nu(0);
    }
  }
  function tm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, uu(t)));
  }
  function ds() {
    return pn !== null && (pn.skipTransition(), pn = null), Lr(), qr(), Br(), Yr();
  }
  function Yr() {
    if (qe !== 5) return !1;
    var e = ea, t = Mr;
    Mr = 0;
    var a = ks(ga), l = k.T, n = ae.p;
    try {
      ae.p = 32 > a ? 32 : a, k.T = null, a = Or, Or = null;
      var u = ea, c = ga;
      if (qe = 0, ql = ea = null, ga = 0, (Te & 6) !== 0) throw Error(o(331));
      var f = Te;
      if (Te |= 4, Yv(u.current), Lv(
        u,
        u.current,
        c,
        a
      ), Te = f, Nu(0, !1), wt && typeof wt.onPostCommitFiberRoot == "function")
        try {
          wt.onPostCommitFiberRoot(Xn, u);
        } catch {
        }
      return !0;
    } finally {
      ae.p = n, k.T = l, tm(e, t);
    }
  }
  function am(e, t, a) {
    t = Yt(a, t), t = lr(e.stateNode, t, 2), e = Ia(e, t, 2), e !== null && (Vn(e, 2), ya(e));
  }
  function Ee(e, t, a) {
    if (e.tag === 3)
      am(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          am(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (il === null || !il.has(l))) {
            e = Yt(a, e), a = Id(2), l = Ia(t, a, 2), l !== null && (Pd(
              a,
              l,
              t,
              e
            ), Vn(l, 2), ya(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Gr(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new hy();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (Dr = !0, n.add(a), e = jy.bind(null, e, t, a), t.then(e, e));
  }
  function jy(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, ze === e && (ve & a) === a && ((Ye === 4 || Ye === 3 && (ve & 62914560) === ve && 300 > Nt() - us) && (Te & 2) === 0 ? xn(e, 0) : ns |= a, yn === ve && (yn = 0)), ya(e);
  }
  function lm(e, t) {
    t === 0 && (t = Go()), e = xl(e, t), e !== null && (Vn(e, t), ya(e));
  }
  function Ty(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), lm(e, a);
  }
  function Ny(e, t) {
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
    l !== null && l.delete(t), lm(e, a);
  }
  function wy(e, t) {
    return Zs(e, t);
  }
  var Tn = null, Nn = null, Qr = !1, vs = !1, Xr = !1, cl = 0;
  function ya(e) {
    e !== Nn && e.next === null && (Nn === null ? Tn = Nn = e : Nn = Nn.next = e), vs = !0, Qr || (Qr = !0, Ay());
  }
  function Nu(e, t) {
    if (!Xr && vs) {
      Xr = !0;
      do
        for (var a = !1, l = Tn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - Et(42 | e) + 1) - 1, u &= n & ~(c & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, sm(l, u));
          } else
            u = ve, u = ni(
              l,
              l === ze ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Zn(l, u) || (a = !0, sm(l, u));
          l = l.next;
        }
      while (a);
      Xr = !1;
    }
  }
  function Ey() {
    nm();
  }
  function nm() {
    vs = Qr = !1;
    var e = 0;
    cl !== 0 && By() && (e = cl);
    for (var t = Nt(), a = null, l = Tn; l !== null; ) {
      var n = l.next, u = um(l, t);
      u === 0 ? (l.next = null, a === null ? Tn = n : a.next = n, n === null && (Nn = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (vs = !0)), l = n;
    }
    qe !== 0 && qe !== 5 || Nu(e), cl !== 0 && (cl = 0);
  }
  function um(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - Et(u), f = 1 << c, m = n[c];
      m === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[c] = Vh(f, t)) : m <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = ze, a = ve, a = ni(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (we === 2 || we === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Vs(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Zn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Vs(l), ks(a)) {
        case 2:
        case 8:
          a = qo;
          break;
        case 32:
          a = ei;
          break;
        case 268435456:
          a = Bo;
          break;
        default:
          a = ei;
      }
      return l = im.bind(null, e), a = Zs(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Vs(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function im(e, t) {
    if (qe !== 0 && qe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (ds() && e.callbackNode !== a)
      return null;
    var l = ve;
    return l = ni(
      e,
      e === ze ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Vv(e, l, t), um(e, Nt()), e.callbackNode != null && e.callbackNode === a ? im.bind(null, e) : null);
  }
  function sm(e, t) {
    if (ds()) return null;
    Vv(e, t, !0);
  }
  function Ay() {
    Gy(function() {
      (Te & 6) !== 0 ? Zs(
        Lo,
        Ey
      ) : nm();
    });
  }
  function Zr() {
    if (cl === 0) {
      var e = Al;
      e === 0 && (e = ti, ti <<= 1, (ti & 261888) === 0 && (ti = 256)), cl = e;
    }
    return cl;
  }
  function cm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ri(e);
  }
  function Cy(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = cm(
        (n[pt] || null).action
      ), c = l.submitter;
      c && (t = (t = c[pt] || null) ? cm(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var f = new vi(
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
                if (cl !== 0) {
                  var m = new FormData(n, c);
                  Ic(
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
                typeof u == "function" && (f.preventDefault(), m = new FormData(n, c), Ic(
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
  for (var Vr = 0; Vr < gc.length; Vr++) {
    var Kr = gc[Vr], zy = Kr.toLowerCase(), Dy = Kr[0].toUpperCase() + Kr.slice(1);
    Ft(
      zy,
      "on" + Dy
    );
  }
  Ft(Of, "onAnimationEnd"), Ft(Uf, "onAnimationIteration"), Ft(Hf, "onAnimationStart"), Ft("dblclick", "onDoubleClick"), Ft("focusin", "onFocus"), Ft("focusout", "onBlur"), Ft(Yg, "onTransitionRun"), Ft(Gg, "onTransitionStart"), Ft(Qg, "onTransitionCancel"), Ft(Lf, "onTransitionEnd"), Kl("onMouseEnter", ["mouseout", "mouseover"]), Kl("onMouseLeave", ["mouseout", "mouseover"]), Kl("onPointerEnter", ["pointerout", "pointerover"]), Kl("onPointerLeave", ["pointerout", "pointerover"]), _l(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _l(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _l("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _l(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _l(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _l(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Ry = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wu)
  );
  function rm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], n = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = l.length - 1; 0 <= c; c--) {
            var f = l[c], m = f.instance, x = f.currentTarget;
            if (f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = x;
            try {
              u(n);
            } catch (C) {
              gi(C);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (c = 0; c < l.length; c++) {
            if (f = l[c], m = f.instance, x = f.currentTarget, f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = x;
            try {
              u(n);
            } catch (C) {
              gi(C);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function de(e, t) {
    var a = t[Jo];
    a === void 0 && (a = t[Jo] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (om(t, e, 2, !1), a.add(l));
  }
  function Jr(e, t, a) {
    var l = 0;
    t && (l |= 4), om(
      a,
      e,
      l,
      t
    );
  }
  var ms = "_reactListening" + Math.random().toString(36).slice(2);
  function kr(e) {
    if (!e[ms]) {
      e[ms] = !0, Fo.forEach(function(a) {
        a !== "selectionchange" && (Ry.has(a) || Jr(a, !1, e), Jr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ms] || (t[ms] = !0, Jr("selectionchange", !1, t));
    }
  }
  function om(e, t, a, l) {
    switch (Pm(t)) {
      case 2:
        var n = T0;
        break;
      case 8:
        n = N0;
        break;
      default:
        n = ho;
    }
    a = n.bind(
      null,
      t,
      a,
      e
    ), n = void 0, !ac || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function $r(e, t, a, l, n) {
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
            if (c = pl(f), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              l = u = c;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l.return;
      }
    of(function() {
      var x = u, C = ec(a), O = [];
      e: {
        var _ = qf.get(e);
        if (_ !== void 0) {
          var w = vi, Y = e;
          switch (e) {
            case "keypress":
              if (fi(a) === 0) break e;
            case "keydown":
            case "keyup":
              w = gg;
              break;
            case "focusin":
              Y = "focus", w = ic;
              break;
            case "focusout":
              Y = "blur", w = ic;
              break;
            case "beforeblur":
            case "afterblur":
              w = ic;
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
              w = vf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              w = ng;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              w = bg;
              break;
            case Of:
            case Uf:
            case Hf:
              w = sg;
              break;
            case Lf:
              w = jg;
              break;
            case "scroll":
            case "scrollend":
              w = ag;
              break;
            case "wheel":
              w = Ng;
              break;
            case "copy":
            case "cut":
            case "paste":
              w = rg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              w = hf;
              break;
            case "submit":
              w = _g;
              break;
            case "toggle":
            case "beforetoggle":
              w = Eg;
          }
          var K = (t & 4) !== 0, se = !K && (e === "scroll" || e === "scrollend"), S = K ? _ !== null ? _ + "Capture" : null : _;
          K = [];
          for (var g = x, T; g !== null; ) {
            var M = g;
            if (T = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || T === null || S === null || (M = kn(g, S), M != null && K.push(
              Eu(g, M, T)
            )), se) break;
            g = g.return;
          }
          0 < K.length && (_ = new w(
            _,
            Y,
            null,
            a,
            C
          ), O.push({ event: _, listeners: K }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (w = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", w && a !== Ps && (Y = a.relatedTarget || a.fromElement) && (pl(Y) || Y[Xl]))
            break e;
          (_ || w) && (Y = C.window === C ? C : (w = C.ownerDocument) ? w.defaultView || w.parentWindow : window, _ ? (w = a.relatedTarget || a.toElement, _ = x, w = w ? pl(w) : null, w !== null && (se = h(w), K = w.tag, w !== se || K !== 5 && K !== 27 && K !== 6) && (w = null)) : (_ = null, w = x), _ !== w && (K = vf, M = "onMouseLeave", S = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (K = hf, M = "onPointerLeave", S = "onPointerEnter", g = "pointer"), se = _ == null ? Y : Jn(_), T = w == null ? Y : Jn(w), Y = new K(
            M,
            g + "leave",
            _,
            a,
            C
          ), Y.target = se, Y.relatedTarget = T, M = null, pl(C) === x && (K = new K(
            S,
            g + "enter",
            w,
            a,
            C
          ), K.target = T, K.relatedTarget = se, M = K), se = M, K = _ && w ? ee(
            _,
            w,
            My
          ) : null, _ !== null && fm(
            O,
            Y,
            _,
            K,
            !1
          ), w !== null && se !== null && fm(
            O,
            se,
            w,
            K,
            !0
          )));
        }
        e: {
          if (_ = x ? Jn(x) : window, w = _.nodeName && _.nodeName.toLowerCase(), w === "select" || w === "input" && _.type === "file")
            var Z = jf;
          else if (bf(_))
            if (Tf)
              Z = Lg;
            else {
              Z = Ug;
              var me = Og;
            }
          else
            w = _.nodeName, !w || w.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? x && Is(x.elementType) && (Z = jf) : Z = Hg;
          if (Z && (Z = Z(e, x))) {
            xf(
              O,
              Z,
              a,
              C
            );
            break e;
          }
          me && me(e, _, x);
        }
        switch (me = x ? Jn(x) : window, e) {
          case "focusin":
            (bf(me) || me.contentEditable === "true") && (Il = me, vc = x, au = null);
            break;
          case "focusout":
            au = vc = Il = null;
            break;
          case "mousedown":
            mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mc = !1, Rf(O, a, C);
            break;
          case "selectionchange":
            if (Bg) break;
          case "keydown":
          case "keyup":
            Rf(O, a, C);
        }
        var $;
        if (cc)
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
          Wl ? _f(e, a) && (P = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (P = "onCompositionStart");
        P && (gf && a.locale !== "ko" && (Wl || P !== "onCompositionStart" ? P === "onCompositionEnd" && Wl && ($ = ff()) : (Xa = C, lc = "value" in Xa ? Xa.value : Xa.textContent, Wl = !0)), me = hs(x, P), 0 < me.length && (P = new mf(
          P,
          e,
          null,
          a,
          C
        ), O.push({ event: P, listeners: me }), $ ? P.data = $ : ($ = Sf(a), $ !== null && (P.data = $)))), ($ = Cg ? zg(e, a) : Dg(e, a)) && (P = hs(x, "onBeforeInput"), 0 < P.length && (me = new mf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          C
        ), O.push({
          event: me,
          listeners: P
        }), me.data = $)), Cy(
          O,
          e,
          x,
          a,
          C
        );
      }
      rm(O, t);
    });
  }
  function Eu(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function hs(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = kn(e, a), n != null && l.unshift(
        Eu(e, n, u)
      ), n = kn(e, t), n != null && l.push(
        Eu(e, n, u)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function My(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function fm(e, t, a, l, n) {
    for (var u = t._reactName, c = []; a !== null && a !== l; ) {
      var f = a, m = f.alternate, x = f.stateNode;
      if (f = f.tag, m !== null && m === l) break;
      f !== 5 && f !== 26 && f !== 27 || x === null || (m = x, n ? (x = kn(a, u), x != null && c.unshift(
        Eu(a, x, m)
      )) : n || (x = kn(a, u), x != null && c.push(
        Eu(a, x, m)
      ))), a = a.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var Oy = /\r\n?/g, Uy = /\u0000|\uFFFD/g;
  function dm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Oy, `
`).replace(Uy, "");
  }
  function vm(e, t) {
    return t = dm(t), dm(e) === t;
  }
  function Ae(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || kl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && kl(e, "" + l);
        else return;
        break;
      case "className":
        ci(e, "class", l);
        break;
      case "tabIndex":
        ci(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ci(e, a, l);
        break;
      case "style":
        cf(e, l, u);
        return;
      case "data":
        if (t !== "object") {
          ci(e, "data", l);
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
        l = ri(l), e.setAttribute(a, l);
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
          typeof u == "function" && (a === "formAction" ? (t !== "input" && Ae(e, t, "name", n.name, n, null), Ae(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ae(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ae(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ae(e, t, "encType", n.encType, n, null), Ae(e, t, "method", n.method, n, null), Ae(e, t, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = ri(l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = sa);
        return;
      case "onScroll":
        l != null && de("scroll", e);
        return;
      case "onScrollEnd":
        l != null && de("scrollend", e);
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
        a = ri(l), e.setAttributeNS(
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
        de("beforetoggle", e), de("toggle", e), si(e, "popover", l);
        break;
      case "xlinkActuate":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        si(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = eg.get(a) || a, si(e, a, l);
        else return;
    }
    be = !0;
  }
  function Fr(e, t, a, l, n, u) {
    switch (a) {
      case "style":
        cf(e, l, u);
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
        if (typeof l == "string") kl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          kl(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && de("scroll", e);
        return;
      case "onScrollEnd":
        l != null && de("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = sa);
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
        if (!Wo.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), u = a.slice(2, n ? a.length - 7 : void 0), t = e[pt] || null, t = t != null ? t[a] : null, typeof t == "function" && e.removeEventListener(u, t, n), typeof l == "function")) {
              typeof t != "function" && t !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(u, l, n);
              break e;
            }
            be = !0, a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : si(e, a, l);
          }
        return;
    }
    be = !0;
  }
  function ct(e, t, a) {
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
        de("error", e), de("load", e);
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
                  Ae(e, t, u, c, a, null);
              }
          }
        n && Ae(e, t, "srcSet", a.srcSet, a, null), l && Ae(e, t, "src", a.src, a, null);
        return;
      case "input":
        de("invalid", e);
        var f = u = c = n = null, m = null, x = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var C = a[l];
            if (C != null)
              switch (l) {
                case "name":
                  n = C;
                  break;
                case "type":
                  c = C;
                  break;
                case "checked":
                  m = C;
                  break;
                case "defaultChecked":
                  x = C;
                  break;
                case "value":
                  u = C;
                  break;
                case "defaultValue":
                  f = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ae(e, t, l, C, a, null);
              }
          }
        lf(
          e,
          u,
          f,
          m,
          x,
          c,
          n,
          !1
        );
        return;
      case "select":
        de("invalid", e), l = c = u = null;
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
                Ae(e, t, n, f, a, null);
            }
        t = u, a = c, e.multiple = !!l, t != null ? Jl(e, !!l, t, !1) : a != null && Jl(e, !!l, a, !0);
        return;
      case "textarea":
        de("invalid", e), u = n = l = null;
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
                Ae(e, t, c, f, a, null);
            }
        uf(e, l, n, u);
        return;
      case "option":
        for (m in a)
          if (a.hasOwnProperty(m) && (l = a[m], l != null))
            switch (m) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ae(e, t, m, l, a, null);
            }
        return;
      case "dialog":
        de("beforetoggle", e), de("toggle", e), de("cancel", e), de("close", e);
        break;
      case "iframe":
      case "object":
        de("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < wu.length; l++)
          de(wu[l], e);
        break;
      case "image":
        de("error", e), de("load", e);
        break;
      case "details":
        de("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        de("error", e), de("load", e);
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
        for (x in a)
          if (a.hasOwnProperty(x) && (l = a[x], l != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ae(e, t, x, l, a, null);
            }
        return;
      default:
        if (Is(t)) {
          for (C in a)
            a.hasOwnProperty(C) && (l = a[C], l !== void 0 && Fr(
              e,
              t,
              C,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (f in a)
      a.hasOwnProperty(f) && (l = a[f], l != null && Ae(e, t, f, l, a, null));
  }
  var Hy = {};
  function Ly(e, t, a, l) {
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
        var n = null, u = null, c = null, f = null, m = null, x = null, C = null;
        for (w in a) {
          var O = a[w];
          if (a.hasOwnProperty(w) && O != null)
            switch (w) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = O;
              default:
                l.hasOwnProperty(w) || Ae(e, t, w, null, l, O);
            }
        }
        for (var _ in l) {
          var w = l[_];
          if (O = a[_], l.hasOwnProperty(_) && (w != null || O != null))
            switch (_) {
              case "type":
                w !== O && (be = !0), u = w;
                break;
              case "name":
                w !== O && (be = !0), n = w;
                break;
              case "checked":
                w !== O && (be = !0), x = w;
                break;
              case "defaultChecked":
                w !== O && (be = !0), C = w;
                break;
              case "value":
                w !== O && (be = !0), c = w;
                break;
              case "defaultValue":
                w !== O && (be = !0), f = w;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(o(137, t));
                break;
              default:
                w !== O && Ae(
                  e,
                  t,
                  _,
                  w,
                  l,
                  O
                );
            }
        }
        Fs(
          e,
          c,
          f,
          m,
          x,
          C,
          u,
          n
        );
        return;
      case "select":
        w = c = f = _ = null;
        for (u in a)
          if (m = a[u], a.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                w = m;
              default:
                l.hasOwnProperty(u) || Ae(
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
                u !== m && (be = !0), _ = u;
                break;
              case "defaultValue":
                u !== m && (be = !0), f = u;
                break;
              case "multiple":
                u !== m && (be = !0), c = u;
              default:
                u !== m && Ae(
                  e,
                  t,
                  n,
                  u,
                  l,
                  m
                );
            }
        t = f, a = c, l = w, _ != null ? Jl(e, !!a, _, !1) : !!l != !!a && (t != null ? Jl(e, !!a, t, !0) : Jl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        w = _ = null;
        for (f in a)
          if (n = a[f], a.hasOwnProperty(f) && n != null && !l.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ae(e, t, f, null, l, n);
            }
        for (c in l)
          if (n = l[c], u = a[c], l.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                n !== u && (be = !0), _ = n;
                break;
              case "defaultValue":
                n !== u && (be = !0), w = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ae(e, t, c, n, l, u);
            }
        nf(e, _, w);
        return;
      case "option":
        for (var Y in a)
          if (_ = a[Y], a.hasOwnProperty(Y) && _ != null && !l.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ae(
                  e,
                  t,
                  Y,
                  null,
                  l,
                  _
                );
            }
        for (m in l)
          if (_ = l[m], w = a[m], l.hasOwnProperty(m) && _ !== w && (_ != null || w != null))
            switch (m) {
              case "selected":
                _ !== w && (be = !0), e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                Ae(
                  e,
                  t,
                  m,
                  _,
                  l,
                  w
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
        for (var K in a)
          _ = a[K], a.hasOwnProperty(K) && _ != null && !l.hasOwnProperty(K) && Ae(e, t, K, null, l, _);
        for (x in l)
          if (_ = l[x], w = a[x], l.hasOwnProperty(x) && _ !== w && (_ != null || w != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, t));
                break;
              default:
                Ae(
                  e,
                  t,
                  x,
                  _,
                  l,
                  w
                );
            }
        return;
      default:
        if (Is(t)) {
          for (var se in a)
            _ = a[se], a.hasOwnProperty(se) && _ !== void 0 && !l.hasOwnProperty(se) && Fr(
              e,
              t,
              se,
              void 0,
              l,
              _
            );
          for (C in l)
            _ = l[C], w = a[C], !l.hasOwnProperty(C) || _ === w || _ === void 0 && w === void 0 || Fr(
              e,
              t,
              C,
              _,
              l,
              w
            );
          return;
        }
    }
    for (var S in a)
      _ = a[S], a.hasOwnProperty(S) && _ != null && !l.hasOwnProperty(S) && Ae(e, t, S, null, l, _);
    for (O in l)
      _ = l[O], w = a[O], !l.hasOwnProperty(O) || _ === w || _ == null && w == null || Ae(e, t, O, _, l, w);
  }
  function mm(e) {
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
  function qy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, c = n.initiatorType, f = n.duration;
        if (u && f && mm(c)) {
          for (c = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var m = a[l], x = m.startTime;
            if (x > f) break;
            var C = m.transferSize, O = m.initiatorType;
            C && mm(O) && (m = m.responseEnd, c += C * (m < f ? 1 : (f - x) / (m - x)));
          }
          if (--l, t += 8 * (u + c) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Wr = null, Ir = null;
  function Au(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function hm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function gm(e, t) {
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
  function ym(e, t, a, l) {
    return a = Au(
      a
    ).createElement(e), a[lt] = l, a[pt] = t, ct(a, e, t), Ie(a), a;
  }
  function Pr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var eo = null;
  function By() {
    var e = window.event;
    return e && e.type === "popstate" ? e === eo ? !1 : (eo = e, !0) : (eo = null, !1);
  }
  var to = typeof setTimeout == "function" ? setTimeout : void 0, Yy = typeof clearTimeout == "function" ? clearTimeout : void 0, pm = typeof Promise == "function" ? Promise : void 0, _m = typeof requestAnimationFrame == "function" ? requestAnimationFrame : to, Gy = typeof queueMicrotask == "function" ? queueMicrotask : typeof pm < "u" ? function(e) {
    return pm.resolve(null).then(e).catch(Qy);
  } : to;
  function Qy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function rl(e) {
    return e === "head";
  }
  function Sm(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), Rn(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          ro(
            e.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = e.ownerDocument.head, ro(a);
          for (var u = a.firstChild; u; ) {
            var c = u.nextSibling, f = u.nodeName;
            u[Kn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = c;
          }
        } else
          a === "body" && ro(e.ownerDocument.body);
      a = n;
    } while (a);
    Rn(t);
  }
  function bm(e, t) {
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
  function xm(e, t, a) {
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
  function jm(e, t) {
    e = e.style, t = t.style;
    var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (a = t.display, e.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin, a != null ? e.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = a == null || typeof a == "boolean" ? "" : a, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Xy(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function ao(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Xy(t, a, e);
  }
  function Zy(e) {
    return e.documentElement.clientHeight;
  }
  function Vy(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Ky(e, t, a, l, n, u, c, f, m) {
    var x = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var C = x.startViewTransition({
        update: function() {
          var _ = x.defaultView, w = _.navigation && _.navigation.transition, Y = x.fonts.status;
          l();
          var K = [];
          if (Y === "loaded" && (Zy(x), x.fonts.status === "loading" && K.push(x.fonts.ready)), Y = K.length, e !== null)
            for (var se = e.suspenseyImages, S = 0, g = 0; g < se.length; g++) {
              var T = se[g];
              if (!T.complete) {
                var M = T.getBoundingClientRect();
                if (0 < M.bottom && 0 < M.right && M.top < _.innerHeight && M.left < _.innerWidth) {
                  if (S += Zm(T), S > ps) {
                    K.length = Y;
                    break;
                  }
                  T = new Promise(
                    Vy.bind(T)
                  ), K.push(T);
                }
              }
            }
          if (0 < K.length)
            return _ = Promise.race([
              Promise.all(K),
              new Promise(function(Z) {
                return setTimeout(Z, 500);
              })
            ]).then(n, n), (w ? Promise.allSettled([w.finished, _]) : _).then(u, u);
          if (n(), w)
            return w.finished.then(
              u,
              u
            );
          u();
        },
        types: a
      });
      x.__reactViewTransition = C;
      var O = [];
      return C.ready.then(
        function() {
          for (var _ = x.documentElement.getAnimations({
            subtree: !0
          }), w = 0; w < _.length; w++) {
            var Y = _[w], K = Y.effect, se = K.pseudoElement;
            if (se != null && se.startsWith("::view-transition")) {
              O.push(Y), Y = K.getKeyframes();
              for (var S = se = void 0, g = !0, T = 0; T < Y.length; T++) {
                var M = Y[T], Z = M.width;
                if (se === void 0) se = Z;
                else if (se !== Z) {
                  g = !1;
                  break;
                }
                if (Z = M.height, S === void 0) S = Z;
                else if (S !== Z) {
                  g = !1;
                  break;
                }
                delete M.width, delete M.height, M.transform === "none" && delete M.transform;
              }
              g && se !== void 0 && S !== void 0 && (K.setKeyframes(Y), g = getComputedStyle(
                K.target,
                K.pseudoElement
              ), g.width !== se || g.height !== S) && (g = Y[0], g.width = se, g.height = S, g = Y[Y.length - 1], g.width = se, g.height = S, K.setKeyframes(Y));
            }
          }
          c();
        },
        function(_) {
          x.__reactViewTransition === C && (x.__reactViewTransition = null);
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
      ), C.finished.finally(function() {
        for (var _ = 0; _ < O.length; _++)
          O[_].cancel();
        x.__reactViewTransition === C && (x.__reactViewTransition = null), f();
      }), C;
    } catch {
      return l(), n(), c(), null;
    }
  }
  function Bl(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Bl.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : I({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Bl.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, Bl.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Tm(e) {
    return {
      name: e,
      group: new Bl("group", e),
      imagePair: new Bl("image-pair", e),
      old: new Bl("old", e),
      new: new Bl("new", e)
    };
  }
  function Ut(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Ut.prototype.addEventListener = function(e, t, a) {
    var l = null, n = null;
    if (!(a != null && typeof a != "boolean" && (l = a.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (wm(u, e, t, a) === -1) {
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
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = wn(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), y(
          this._fragmentFiber.child,
          !1,
          Jy,
          e,
          f,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function Jy(e, t, a, l) {
    return q(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Ut.prototype.removeEventListener = function(e, t, a) {
    var l = this._eventListeners;
    if (l !== null && (t = wm(
      l,
      e,
      t,
      a
    ), t !== -1)) {
      var n = l[t];
      a = n.attachedListener;
      var u = n.cleanup;
      n = wn(n.optionsOrUseCapture), y(
        this._fragmentFiber.child,
        !1,
        ky,
        e,
        a,
        n
      ), l.splice(t, 1), u !== null && u();
    }
  };
  function ky(e, t, a, l) {
    return q(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function wn(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Nm(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function wm(e, t, a, l) {
    if (e.length === 0) return -1;
    l = Nm(l);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === a && Nm(u.optionsOrUseCapture) === l)
        return n;
    }
    return -1;
  }
  Ut.prototype.dispatchEvent = function(e) {
    var t = z(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = q(t);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (a)
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.addEventListener(
            u.type,
            u.attachedListener,
            wn(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            wn(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Ut.prototype.focus = function(e) {
    y(
      this._fragmentFiber.child,
      !0,
      Em,
      e,
      void 0,
      void 0
    );
  };
  function Em(e, t) {
    return e.tag === 6 ? !1 : (e = q(e), i0(e, t));
  }
  Ut.prototype.focusLast = function(e) {
    var t = [];
    y(
      this._fragmentFiber.child,
      !0,
      lo,
      t,
      void 0,
      void 0
    );
    for (var a = t.length - 1; 0 <= a && !Em(t[a], e); a--) ;
  };
  function lo(e, t) {
    return t.push(e), !1;
  }
  Ut.prototype.blur = function() {
    var e = z(
      this._fragmentFiber
    );
    e !== null && (e = q(e), e = Au(e).activeElement, e !== null && y(
      this._fragmentFiber.child,
      !1,
      $y,
      e,
      void 0,
      void 0
    ));
  };
  function $y(e, t) {
    return e.tag === 6 ? !1 : (e = q(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Ut.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(
      this._fragmentFiber.child,
      !1,
      Fy,
      e,
      void 0,
      void 0
    );
  };
  function Fy(e, t) {
    return e.tag === 6 || (e = q(e), t.observe(e)), !1;
  }
  Ut.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), y(
        this._fragmentFiber.child,
        !1,
        Wy,
        e,
        void 0,
        void 0
      );
      for (var a = t = 0; a < ta.length; a++) {
        var l = ta[a];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : ta[t++] = l;
      }
      ta.length = t;
    }
  };
  function Wy(e, t) {
    return e.tag === 6 || (e = q(e), t.unobserve(e)), !1;
  }
  var ta = [], no = !1;
  function Iy(e, t, a) {
    ta.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), no || (no = !0, s0(function() {
      no = !1;
      var l = ta;
      ta = [];
      for (var n = 0; n < l.length; n++) {
        var u = l[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ut.prototype.getClientRects = function() {
    var e = [];
    return y(
      this._fragmentFiber.child,
      !1,
      Py,
      e,
      void 0,
      void 0
    ), e;
  };
  function Py(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var a = e.ownerDocument.createRange();
      a.selectNodeContents(e), t.push.apply(t, a.getClientRects());
    } else
      e = q(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Ut.prototype.getRootNode = function(e) {
    var t = z(
      this._fragmentFiber
    );
    return t === null ? this : q(t).getRootNode(e);
  }, Ut.prototype.compareDocumentPosition = function(e) {
    var t = z(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    y(
      this._fragmentFiber.child,
      !1,
      lo,
      a,
      void 0,
      void 0
    );
    var l = q(t);
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
      return a === e ? n = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = U(t)[1], a === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = q(a).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = q(a[0]), n = q(a[a.length - 1]);
    var u = R(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), m = c & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && c & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || m || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || e0(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function e0(e, t, a, l, n) {
    var u = pl(n);
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
        for (u = t, t = z(t); u !== null; ) {
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
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === a) && (t = ee(
      a,
      u,
      Ge
    ), t === null ? t = !1 : (y(
      t,
      !0,
      V,
      u,
      a
    ), u = J, J = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === l) && (t = ee(
      l,
      u,
      Ge
    ), t === null ? t = !1 : (y(
      t,
      !0,
      xe,
      u,
      l
    ), u = J, oe = J = null, t = u !== null)), t) : !1;
  }
  function Am(e, t) {
    var a = e.ownerDocument.createRange();
    a.selectNodeContents(e), e = a.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Ut.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    y(
      this._fragmentFiber.child,
      !1,
      lo,
      t,
      void 0,
      void 0
    );
    var a = e !== !1;
    if (t.length === 0) {
      var l = U(
        this._fragmentFiber
      );
      if (l = a ? l[1] || l[0] || z(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = q(l), Am(e, a);
        return;
      }
      if (l = q(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          a = "host" in l ? l.host : null, a !== null && a.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = a ? t.length - 1 : 0; l !== (a ? -1 : t.length); ) {
      var n = t[l];
      n.tag === 6 ? (n = q(n), Am(n, a)) : q(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function t0(e, t) {
    return e = q(e), Cm(e, t), !1;
  }
  function Cm(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function zm(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          wn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var c = 0, f = 0; f < ta.length; f++) {
        var m = ta[f];
        (m.fragmentInstance !== t || m.observer !== u || m.instance !== e) && (ta[c++] = m);
      }
      ta.length = c, u.observe(e);
    }), Cm(e, t));
  }
  function a0(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          wn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      typeof u.rootMargin == "string" ? Iy(
        t,
        u,
        e
      ) : u.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function uo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          uo(a), ii(a);
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
  function l0(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Kn])
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
      if (e = Vt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function n0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Dm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function io(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function so(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function u0(e, t) {
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
  function Vt(e) {
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
  var co = null;
  function Rm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Vt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Mm(e) {
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
  function i0(e, t) {
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
  function s0(e) {
    _m(function() {
      _m(function(t) {
        return e(t);
      });
    });
  }
  function Om(e, t, a) {
    switch (t = Au(a), e) {
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
  function Um(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ae(e, t, l, null, Hy, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === sa && (e.onclick = null), ii(e);
  }
  function ro(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ii(e);
  }
  var Kt = /* @__PURE__ */ new Map(), Hm = /* @__PURE__ */ new Set();
  function Cu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ha = ae.d;
  ae.d = {
    f: c0,
    r: r0,
    D: o0,
    C: f0,
    L: d0,
    m: v0,
    X: h0,
    S: m0,
    M: g0
  };
  function c0() {
    var e = Ha.f(), t = rs();
    return e || t;
  }
  function r0(e) {
    var t = Zl(e);
    t !== null && t.tag === 5 && t.type === "form" ? qd(t) : Ha.r(e);
  }
  var En = typeof document > "u" ? null : document;
  function Lm(e, t, a) {
    var l = En;
    if (l && typeof t == "string" && t) {
      var n = qt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Hm.has(n) || (Hm.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), ct(t, "link", e), Ie(t), l.head.appendChild(t)));
    }
  }
  function o0(e) {
    Ha.D(e), Lm("dns-prefetch", e, null);
  }
  function f0(e, t) {
    Ha.C(e, t), Lm("preconnect", e, t);
  }
  function d0(e, t, a) {
    Ha.L(e, t, a);
    var l = En;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + qt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + qt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + qt(
        a.imageSizes
      ) + '"]')) : n += '[href="' + qt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = An(e);
          break;
        case "script":
          u = Cn(e);
      }
      if (!(Kt.has(u) || (e = I(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Kt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(zu(u)) || t === "script" && l.querySelector(Du(u))))) {
        var c = l.createElement("link");
        ct(c, "link", e), t === "style" && (c[ui] = !0, c.onload = c.onerror = function() {
          $o(c);
        }), Ie(c), l.head.appendChild(c);
      }
    }
  }
  function v0(e, t) {
    Ha.m(e, t);
    var a = En;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + qt(l) + '"][href="' + qt(e) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Cn(e);
      }
      if (!Kt.has(u) && (e = I({ rel: "modulepreload", href: e }, t), Kt.set(u, e), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Du(u)))
              return;
        }
        l = a.createElement("link"), ct(l, "link", e), Ie(l), a.head.appendChild(l);
      }
    }
  }
  function m0(e, t, a) {
    Ha.S(e, t, a);
    var l = En;
    if (l && e) {
      var n = Vl(l).hoistableStyles, u = An(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = l.querySelector(
          zu(u)
        ))
          f.loading = 5;
        else {
          e = I(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Kt.get(u)) && oo(e, a);
          var m = c = l.createElement("link");
          Ie(m), ct(m, "link", e), m._p = new Promise(function(x, C) {
            m.onload = x, m.onerror = C;
          }), m.addEventListener("load", function() {
            f.loading |= 1;
          }), m.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, gs(c, t, l);
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
  function h0(e, t) {
    Ha.X(e, t);
    var a = En;
    if (a && e) {
      var l = Vl(a).hoistableScripts, n = Cn(e), u = l.get(n);
      u || (u = a.querySelector(Du(n)), u || (e = I({ src: e, async: !0 }, t), (t = Kt.get(n)) && fo(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function g0(e, t) {
    Ha.M(e, t);
    var a = En;
    if (a && e) {
      var l = Vl(a).hoistableScripts, n = Cn(e), u = l.get(n);
      u || (u = a.querySelector(Du(n)), u || (e = I({ src: e, async: !0, type: "module" }, t), (t = Kt.get(n)) && fo(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function qm(e, t, a, l) {
    var n = (n = Ya.current) ? Cu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = An(a.href), t = Vl(
          n
        ).hoistableStyles, l = t.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = An(a.href);
          var u = Vl(
            n
          ).hoistableStyles, c = u.get(e);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = n.querySelector(
            zu(e)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = Kt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Kt.set(e, u)), y0(
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
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = Cn(a), t = Vl(
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
  function An(e) {
    return 'href="' + qt(e) + '"';
  }
  function zu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Bm(e) {
    return I({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function y0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[ui] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[ui] = !0, t.onload = t.onerror = $o.bind(null, t), ct(t, "link", a), Ie(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Cn(e) {
    return '[src="' + qt(e) + '"]';
  }
  function Du(e) {
    return "script[async]" + e;
  }
  function Ym(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + qt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Ie(l), l;
          var n = I({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ie(l), ct(l, "style", n), gs(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = An(a.href);
          var u = e.querySelector(
            zu(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ie(u), u;
          l = Bm(a), (n = Kt.get(n)) && oo(l, n), u = (e.ownerDocument || e).createElement("link"), Ie(u);
          var c = u;
          return c._p = new Promise(function(f, m) {
            c.onload = f, c.onerror = m;
          }), ct(u, "link", l), t.state.loading |= 4, gs(u, a.precedence, e), t.instance = u;
        case "script":
          return u = Cn(a.src), (n = e.querySelector(
            Du(u)
          )) ? (t.instance = n, Ie(n), n) : (l = a, (n = Kt.get(u)) && (l = I({}, a), fo(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ie(n), ct(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, gs(l, a.precedence, e));
    return t.instance;
  }
  function gs(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, c = 0; c < l.length; c++) {
      var f = l[c];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function oo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function fo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ys = null;
  function Gm(e, t, a) {
    if (ys === null) {
      var l = /* @__PURE__ */ new Map(), n = ys = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = ys, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[Kn] || u[lt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var f = l.get(c);
        f ? f.push(u) : l.set(c, [u]);
      }
    }
    return l;
  }
  function vo(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function p0(e, t, a) {
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
  function Qm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Xm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Zm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Vm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Zm(t), e.suspenseyImages.push(t)), e = b0.bind(e), t.decode().then(e, e));
  }
  function _0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = An(l.href), u = t.querySelector(
          zu(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ru.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, Ie(u);
          return;
        }
        u = t.ownerDocument || t, l = Bm(l), (n = Kt.get(n)) && oo(l, n), u = u.createElement("link"), Ie(u);
        var c = u;
        c._p = new Promise(function(f, m) {
          c.onload = f, c.onerror = m;
        }), ct(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ru.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var ps = 0;
  function S0(e, t) {
    return e.stylesheets && e.count === 0 && Ss(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ss(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && ps === 0 && (ps = 62500 * qy());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ss(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > ps ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Km(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Ss(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Ru() {
    this.count--, Km(this);
  }
  function b0() {
    this.imgCount--, Km(this);
  }
  var _s = null;
  function Ss(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _s = /* @__PURE__ */ new Map(), t.forEach(x0, e), _s = null, Ru.call(e));
  }
  function x0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = _s.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), _s.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), l = c);
        }
        l && a.set(null, l);
      }
      n = t.instance, c = n.getAttribute("data-precedence"), u = a.get(c) || l, u === l && a.set(null, n), a.set(c, n), this.count++, l = Ru.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var zn = {
    $$typeof: Le,
    Provider: null,
    Consumer: null,
    _currentValue: ba,
    _currentValue2: ba,
    _threadCount: 0
  };
  function j0(e, t, a, l, n, u, c, f, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ks(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ks(0), this.hiddenUpdates = Ks(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jm(e, t, a, l, n, u, c, f, m, x, C, O) {
    return e = new j0(
      e,
      t,
      a,
      c,
      m,
      x,
      C,
      O,
      f
    ), t = 1, u === !0 && (t |= 24), u = _t(3, null, null, t), e.current = u, u.stateNode = e, t = Ec(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, Dc(u), e;
  }
  function km(e) {
    return e ? (e = tn, e) : tn;
  }
  function $m(e, t, a, l, n, u) {
    n = km(n), l.context === null ? l.context = n : l.pendingContext = n, l = Wa(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Ia(e, l, t), a !== null && (jt(a, e, t), ru(a, e, t));
  }
  function Fm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function mo(e, t) {
    Fm(e, t), (e = e.alternate) && Fm(e, t);
  }
  function Wm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xl(e, 67108864);
      t !== null && jt(t, e, 67108864), mo(e, 67108864);
    }
  }
  function Im(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = Js(t);
      var a = xl(e, t);
      a !== null && jt(a, e, t), mo(e, t);
    }
  }
  var Dn = !0;
  function T0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = ae.p;
    try {
      ae.p = 2, ho(e, t, a, l);
    } finally {
      ae.p = u, k.T = n;
    }
  }
  function N0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = ae.p;
    try {
      ae.p = 8, ho(e, t, a, l);
    } finally {
      ae.p = u, k.T = n;
    }
  }
  function ho(e, t, a, l) {
    if (Dn) {
      var n = go(l);
      if (n === null)
        $r(
          e,
          t,
          l,
          bs,
          a
        ), eh(e, l);
      else if (E0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (eh(e, l), t & 4 && -1 < w0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Zl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = yl(u.pendingLanes);
                  if (c !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - Et(c);
                      f.entanglements[1] |= m, c &= ~m;
                    }
                    ya(u), (Te & 6) === 0 && (is = Nt() + 500, Nu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = xl(u, 2), f !== null && jt(f, u, 2), rs(), mo(u, 2);
            }
          if (u = go(l), u === null && $r(
            e,
            t,
            l,
            bs,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        $r(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function go(e) {
    return e = ec(e), yo(e);
  }
  var bs = null;
  function yo(e) {
    if (bs = null, e = pl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = j(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = A(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return bs = e, null;
  }
  function Pm(e) {
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
        switch (qh()) {
          case Lo:
            return 2;
          case qo:
            return 8;
          case ei:
          case Bh:
            return 32;
          case Bo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var po = !1, ol = null, fl = null, dl = null, Mu = /* @__PURE__ */ new Map(), Ou = /* @__PURE__ */ new Map(), vl = [], w0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function eh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ol = null;
        break;
      case "dragenter":
      case "dragleave":
        fl = null;
        break;
      case "mouseover":
      case "mouseout":
        dl = null;
        break;
      case "pointerover":
      case "pointerout":
        Mu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ou.delete(t.pointerId);
    }
  }
  function Uu(e, t, a, l, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Zl(t), t !== null && Wm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function E0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return ol = Uu(
          ol,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return fl = Uu(
          fl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return dl = Uu(
          dl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Mu.set(
          u,
          Uu(
            Mu.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Ou.set(
          u,
          Uu(
            Ou.get(u) || null,
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
  function th(e) {
    var t = pl(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = j(a), t !== null) {
            e.blockedOn = t, Ko(e.priority, function() {
              Im(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = A(a), t !== null) {
            e.blockedOn = t, Ko(e.priority, function() {
              Im(a);
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
  function xs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = go(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Ps = l, a.target.dispatchEvent(l), Ps = null;
      } else
        return t = Zl(a), t !== null && Wm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function ah(e, t, a) {
    xs(e) && a.delete(t);
  }
  function A0() {
    po = !1, ol !== null && xs(ol) && (ol = null), fl !== null && xs(fl) && (fl = null), dl !== null && xs(dl) && (dl = null), Mu.forEach(ah), Ou.forEach(ah);
  }
  function js(e, t) {
    e.blockedOn === t && (e.blockedOn = null, po || (po = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      A0
    )));
  }
  var Ts = null;
  function lh(e) {
    Ts !== e && (Ts = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        Ts === e && (Ts = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (yo(l || a) === null)
              continue;
            break;
          }
          var u = Zl(a);
          u !== null && (e.splice(t, 3), t -= 3, Ic(
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
  function Rn(e) {
    function t(m) {
      return js(m, e);
    }
    ol !== null && js(ol, e), fl !== null && js(fl, e), dl !== null && js(dl, e), Mu.forEach(t), Ou.forEach(t);
    for (var a = 0; a < vl.length; a++) {
      var l = vl[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < vl.length && (a = vl[0], a.blockedOn === null); )
      th(a), a.blockedOn === null && vl.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], c = n[pt] || null;
        if (typeof u == "function")
          c || lh(a);
        else if (c) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[pt] || null)
              f = c.formAction;
            else if (yo(n) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? a[l + 1] = f : (a.splice(l, 3), l -= 3), lh(a);
        }
      }
  }
  function nh() {
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
  function _o(e) {
    this._internalRoot = e;
  }
  Ns.prototype.render = _o.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Ot();
    $m(a, l, e, t, null, null);
  }, Ns.prototype.unmount = _o.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      $m(e.current, 2, null, e, null, null), rs(), t[Xl] = null;
    }
  };
  function Ns(e) {
    this._internalRoot = e;
  }
  Ns.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Vo();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < vl.length && t !== 0 && t < vl[a].priority; a++) ;
      vl.splice(a, 0, e), a === 0 && th(e);
    }
  };
  var uh = r.version;
  if (uh !== "19.3.1")
    throw Error(
      o(
        527,
        uh,
        "19.3.1"
      )
    );
  ae.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = D(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var C0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ws = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ws.isDisabled && ws.supportsFiber)
      try {
        Xn = ws.inject(
          C0
        ), wt = ws;
      } catch {
      }
  }
  return Lu.createRoot = function(e, t) {
    if (!v(e)) throw Error(o(299));
    var a = !1, l = "", n = kd, u = $d, c = Fd;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Jm(
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
      nh
    ), e[Xl] = t.current, kr(e), new _o(t);
  }, Lu.hydrateRoot = function(e, t, a) {
    if (!v(e)) throw Error(o(299));
    var l = !1, n = "", u = kd, c = $d, f = Fd, m = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.formState !== void 0 && (m = a.formState)), t = Jm(
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
      nh
    ), t.context = km(null), a = t.current, l = Ot(), l = Js(l), n = Wa(l), n.callback = null, Ia(a, n, l), a = l, t.current.lanes = a, Vn(t, a), ya(t), e[Xl] = t.current, kr(e), new Ns(t);
  }, Lu.version = "19.3.1", Lu;
}
var hh;
function B0() {
  if (hh) return bo.exports;
  hh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), bo.exports = q0(), bo.exports;
}
var Y0 = B0(), E = Mo();
const Eh = E.createContext(null);
function gh() {
  var s = window.users[window.currentUser] || {}, r = window.groupTheme, d = window.themeMode === "light";
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
    siteSettings: Object.assign({}, window.siteSettings),
    themeMode: window.themeMode || "dark",
    theme: {
      bg: d ? r.bgLight : r.bg,
      card: d ? r.cardLight : r.card,
      elevated: d ? r.elevatedLight : r.elevated,
      textPrimary: d ? r.textPrimaryLight : r.textPrimary,
      textSecondary: d ? r.textSecondaryLight : r.textSecondary
    }
  };
}
function G0({ children: s }) {
  const [r, d] = E.useState(gh), o = E.useCallback(function() {
    d(gh());
  }, []), v = E.useCallback(
    async function(A) {
      await window.setActiveMasterContext(A), o();
    },
    [o]
  ), h = E.useCallback(
    function(A) {
      window.setThemeMode(A), o();
    },
    [o]
  );
  E.useEffect(
    function() {
      return window.addEventListener("theme-changed", o), function() {
        window.removeEventListener("theme-changed", o);
      };
    },
    [o]
  );
  const j = E.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        setThemeMode: h
      });
    },
    [r, o, v, h]
  );
  return /* @__PURE__ */ i.jsx(Eh.Provider, { value: j, children: s });
}
function ye() {
  const s = E.useContext(Eh);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const Q0 = "_button_fpxiy_7", X0 = "_primary_fpxiy_22", Z0 = "_secondary_fpxiy_30", V0 = "_danger_fpxiy_39", K0 = "_spinner_fpxiy_52", J0 = "_labelLoading_fpxiy_61", Mn = {
  button: Q0,
  primary: X0,
  secondary: Z0,
  danger: V0,
  spinner: K0,
  labelLoading: J0
};
function G({
  variant: s = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...h
}) {
  var j = s === "secondary" ? Mn.secondary : s === "danger" ? Mn.danger : Mn.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [Mn.button, j, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...h,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: Mn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? Mn.labelLoading : void 0, children: o })
      ]
    }
  );
}
const k0 = "_backdrop_13xfr_1", $0 = "_dialog_13xfr_12", F0 = "_header_13xfr_23", W0 = "_title_13xfr_30", I0 = "_closeBtn_13xfr_35", On = {
  backdrop: k0,
  dialog: $0,
  header: F0,
  title: W0,
  closeBtn: I0
};
function Fu({ title: s, onClose: r, children: d }) {
  return E.useEffect(function() {
    function o(v) {
      v.key === "Escape" && r();
    }
    return document.addEventListener("keydown", o), function() {
      document.removeEventListener("keydown", o);
    };
  }, [r]), /* @__PURE__ */ i.jsx(
    "div",
    {
      className: On.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && r();
      },
      children: /* @__PURE__ */ i.jsxs("div", { className: On.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ i.jsxs("div", { className: On.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: On.title, children: s }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: On.closeBtn,
              onClick: r,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: On.body, children: d })
      ] })
    }
  );
}
const P0 = "_group_1wdnn_1", ep = "_label_1wdnn_8", tp = "_input_1wdnn_14", ap = "_error_1wdnn_32", qu = {
  group: P0,
  label: ep,
  input: tp,
  error: ap
};
function ue({ label: s, error: r, multiline: d = !1, id: o, ...v }) {
  var h = o || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: qu.group, children: [
    s ? /* @__PURE__ */ i.jsx("label", { className: qu.label, htmlFor: h, children: s }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: h, className: qu.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: h, className: qu.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: qu.error, children: r }) : null
  ] });
}
function la(s) {
  var r = s.table, d = s.select || "*", o = s.masterUsername, v = s.sort, h = s.enabled !== !1, [j, A] = E.useState([]), [N, D] = E.useState("loading"), [b, y] = E.useState(null), z = E.useRef(Math.random().toString(36).slice(2)).current, R = E.useCallback(
    async function() {
      if (!h || !o) {
        A([]), D("ready");
        return;
      }
      D("loading"), y(null);
      var U = window.supabase.from(r).select(d).eq("master_username", o), L = await U;
      if (L.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", L.error), y(L.error), D("error");
        return;
      }
      var q = L.data || [];
      v && (q = q.slice().sort(v)), A(q), D("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [r, d, o, h]
  );
  return E.useEffect(
    function() {
      if (R(), !(!h || !o)) {
        var U = window.supabase.channel("beta_" + r + "_" + o + "_" + z).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: r,
            filter: "master_username=eq." + o
          },
          function(L) {
            A(function(q) {
              var J = q;
              return L.eventType === "INSERT" ? J = [L.new].concat(q) : L.eventType === "UPDATE" ? J = q.map(function(oe) {
                return oe.id === L.old.id ? L.new : oe;
              }) : L.eventType === "DELETE" && (J = q.filter(function(oe) {
                return oe.id !== L.old.id;
              })), v ? J.slice().sort(v) : J;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(U);
        };
      }
    },
    [r, o, h, R]
  ), { items: j, status: N, error: b, reload: R };
}
function lp(s, r) {
  return new Date(r.started_at) - new Date(s.started_at);
}
function Oo() {
  var s = ye(), r = la({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: lp
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
    // Every mutation below reloads the list itself afterward rather than
    // waiting on the realtime subscription: this Supabase project's
    // active_cost_trackers table isn't in the realtime publication (a
    // dashboard setting, not something client code can fix), so without
    // this a just-stopped tracker would stay in `running` -- and its
    // TrackerCard's live-ticking timer would keep counting up -- until
    // something else happened to trigger a refetch.
    startTracker: function(v, h, j, A, N, D) {
      return window.startLiveCostTracker(
        v,
        h,
        j,
        A,
        N,
        D
      ).then(function(b) {
        return r.reload(), b;
      });
    },
    stopTracker: function(v, h) {
      return window.stopLiveCostTracker(v, h !== !1).then(function(j) {
        return r.reload(), j;
      });
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v).then(function(h) {
        return r.reload(), h;
      });
    },
    addPenalty: function(v, h, j) {
      return window.addPenaltyToLiveTracker(v, h, j).then(function(A) {
        return r.reload(), A;
      });
    },
    removePenalty: function(v, h) {
      return window.removePenaltyFromLiveTracker(v, h).then(function(j) {
        return r.reload(), j;
      });
    }
  };
}
const np = "_card_1j746_1", up = "_raised_1j746_8", yh = {
  card: np,
  raised: up
};
function ge({ raised: s = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [s ? yh.raised : yh.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const ip = "_card_b5s19_1", sp = "_description_b5s19_9", cp = "_meta_b5s19_19", rp = "_readout_b5s19_31", op = "_amount_b5s19_47", fp = "_penaltyList_b5s19_55", dp = "_removePenalty_b5s19_71", vp = "_penaltyForm_b5s19_87", mp = "_stopActions_b5s19_103", pa = {
  card: ip,
  description: sp,
  meta: cp,
  readout: rp,
  amount: op,
  penaltyList: fp,
  removePenalty: dp,
  penaltyForm: vp,
  stopActions: mp
};
function hp(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function gp(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, h = d / o * v, j = [];
  try {
    j = JSON.parse(s.penalties || "[]");
  } catch {
    j = [];
  }
  var A = j.reduce(function(z, R) {
    return z + (parseFloat(R.amount) || 0);
  }, 0), N = Math.floor(d / 36e5), D = Math.floor(d % 36e5 / 6e4), b = Math.floor(d % 6e4 / 1e3), y = String(N).padStart(2, "0") + ":" + String(D).padStart(2, "0") + ":" + String(b).padStart(2, "0");
  return {
    timeText: y,
    penalties: j,
    penaltyTotal: A,
    grandTotal: h + A
  };
}
function Hs({ tracker: s, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: h }) {
  var [j, A] = E.useState(Date.now()), [N, D] = E.useState(""), [b, y] = E.useState("");
  E.useEffect(function() {
    var L = window.setInterval(function() {
      A(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(L);
    };
  }, []);
  var z = gp(s, j), R = window.users[s.created_by], U = (s.assigned_to || []).map(function(L) {
    var q = window.users[L];
    return q ? q.displayName : L;
  });
  return /* @__PURE__ */ i.jsxs(ge, { className: pa.card, children: [
    /* @__PURE__ */ i.jsx("p", { className: pa.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("p", { className: pa.meta, children: [
      "by ",
      R ? R.displayName : s.created_by,
      " · ",
      s.currency,
      parseFloat(s.rate).toFixed(2),
      " per ",
      hp(parseInt(s.increment_interval))
    ] }),
    r ? /* @__PURE__ */ i.jsxs("p", { className: pa.meta, children: [
      "Assigned to: ",
      U.length > 0 ? U.join(", ") : "N/A"
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: pa.readout, children: [
      /* @__PURE__ */ i.jsx("span", { children: z.timeText }),
      /* @__PURE__ */ i.jsxs("span", { className: pa.amount, children: [
        s.currency,
        z.grandTotal.toFixed(2)
      ] })
    ] }),
    z.penalties.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: pa.penaltyList, children: z.penalties.map(function(L) {
      return /* @__PURE__ */ i.jsxs("li", { children: [
        L.description,
        ": ",
        s.currency,
        parseFloat(L.amount).toFixed(2),
        r ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: pa.removePenalty,
            onClick: function() {
              h(s.id, L.id);
            },
            "aria-label": "Remove penalty " + L.description,
            children: "×"
          }
        ) : null
      ] }, L.id);
    }) }) : null,
    r ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: pa.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: N,
            onChange: function(L) {
              D(L.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: b,
            onChange: function(L) {
              y(L.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "secondary",
            disabled: !N.trim() || !b,
            onClick: function() {
              v(s.id, N, Number(b)), D(""), y("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: pa.stopActions, children: [
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          d(s.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          d(s.id, !1);
        }, children: "Stop (no invoice)" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          o(s.id);
        }, children: "Delete" })
      ] })
    ] }) : null
  ] });
}
const yp = "_pill_wktg6_1", pp = {
  pill: yp
};
function _p(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, h = d / o * v, j = [];
  try {
    j = JSON.parse(s.penalties || "[]");
  } catch {
    j = [];
  }
  var A = j.reduce(function(b, y) {
    return b + (parseFloat(y.amount) || 0);
  }, 0), N = Math.floor(d / 6e4), D = Math.floor(d % 6e4 / 1e3);
  return {
    timeText: String(N).padStart(2, "0") + ":" + String(D).padStart(2, "0"),
    total: h + A
  };
}
function Sp() {
  var s = ye(), r = Oo(), [d, o] = E.useState(Date.now()), [v, h] = E.useState(!1), j = r.trackers.find(function(D) {
    return Array.isArray(D.assigned_to) && D.assigned_to.includes(s.currentUser);
  }), A = j ? j.id : null;
  if (E.useEffect(
    function() {
      if (A) {
        var D = window.setInterval(function() {
          o(Date.now());
        }, 1e3);
        return function() {
          window.clearInterval(D);
        };
      }
    },
    [A]
  ), !s.isSlave || !j) return null;
  var N = _p(j, d);
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: pp.pill,
        onClick: function() {
          h(!0);
        },
        children: [
          "💰 ",
          N.timeText,
          " · ",
          j.currency,
          N.total.toFixed(2)
        ]
      }
    ),
    v ? /* @__PURE__ */ i.jsx(
      Fu,
      {
        title: "Active Cost Tracker",
        onClose: function() {
          h(!1);
        },
        children: /* @__PURE__ */ i.jsx(Hs, { tracker: j, isAdmin: !1 })
      }
    ) : null
  ] });
}
function bp(s, r) {
  return s.position - r.position;
}
function Ah() {
  var s = ye(), r = s.activeMasterContext, d = la({
    table: "motd_messages",
    masterUsername: r,
    sort: bp
  }), o = la({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, h = o.items[0], j = h ? h.current_index : 0, A = v.length > 0 ? v[j % v.length] : null;
  function N() {
    d.reload(), o.reload();
  }
  return {
    messages: v,
    currentMessage: A,
    status: d.status,
    error: d.error,
    reload: N,
    // Each mutation reloads afterward rather than waiting on the realtime
    // subscription: this Supabase project's motd_messages/motd_state
    // tables aren't in the realtime publication (confirmed empty, a
    // dashboard setting -- see src/beta/README.md's "Hybrid data flow"
    // section), so without this an admin's own edit never showed up in
    // their own list until something else triggered a refetch.
    addMessage: async function(D) {
      await window.addMotdMessage({ body: D }), N();
    },
    deleteMessage: async function(D) {
      await window.deleteMotdMessage(D), N();
    },
    moveUp: async function(D) {
      await window.moveMotdMessageUp(D), N();
    },
    moveDown: async function(D) {
      await window.moveMotdMessageDown(D), N();
    }
  };
}
const xp = "_banner_whiaq_1", jp = {
  banner: xp
};
function Tp() {
  var s = ye(), r = Ah();
  return !s.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: jp.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
const Np = "_header_1f0gy_1", wp = "_title_1f0gy_23", Ep = "_subtitle_1f0gy_33", Ap = "_right_1f0gy_45", Cp = "_groupSelect_1f0gy_59", zp = "_userBadge_1f0gy_77", Dp = "_points_1f0gy_85", Rp = "_statusBtn_1f0gy_97", La = {
  header: Np,
  title: wp,
  subtitle: Ep,
  right: Ap,
  groupSelect: Cp,
  userBadge: zp,
  points: Dp,
  statusBtn: Rp
};
function Mp() {
  var s = ye(), r = window.users[s.currentUser] || {}, [d, o] = E.useState(!1), [v, h] = E.useState(s.statusMessage), [j, A] = E.useState(!1);
  function N() {
    s.setThemeMode(s.themeMode === "light" ? "dark" : "light");
  }
  function D() {
    window.logout();
  }
  function b() {
    h(s.statusMessage), o(!0);
  }
  async function y(z) {
    z.preventDefault(), A(!0);
    try {
      await window.updateMyStatusMessage(v), s.refresh(), o(!1);
    } finally {
      A(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs("header", { className: La.header, children: [
    /* @__PURE__ */ i.jsxs("div", { className: La.left, children: [
      /* @__PURE__ */ i.jsx("h1", { className: La.title, children: s.groupTerms.groupLabel }),
      /* @__PURE__ */ i.jsx("p", { className: La.subtitle, children: s.groupTerms.appSubtitle })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: La.right, children: [
      s.myMasterOptions.length > 1 ? /* @__PURE__ */ i.jsx(
        "select",
        {
          className: La.groupSelect,
          value: s.activeMasterContext,
          onChange: function(z) {
            s.switchGroup(z.target.value);
          },
          "aria-label": "Switch group",
          children: s.myMasterOptions.map(function(z) {
            var R = window.users[z];
            return /* @__PURE__ */ i.jsx("option", { value: z, children: R ? R.displayName : z }, z);
          })
        }
      ) : null,
      /* @__PURE__ */ i.jsx("span", { className: La.userBadge, children: s.displayName }),
      /* @__PURE__ */ i.jsx(Sp, {}),
      /* @__PURE__ */ i.jsxs(
        G,
        {
          variant: "secondary",
          className: La.statusBtn,
          onClick: b,
          title: s.statusMessage || "Set a status message",
          children: [
            "✏️ ",
            s.statusMessage || "Status"
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: N, children: s.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode" }),
      s.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: La.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: D, children: "Logout" })
    ] }),
    /* @__PURE__ */ i.jsx(Tp, {}),
    d ? /* @__PURE__ */ i.jsx(Fu, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ i.jsxs("form", { onSubmit: y, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Status message",
          value: v,
          onChange: function(z) {
            h(z.target.value);
          },
          placeholder: "e.g. 🐷 feeling good today",
          maxLength: 100,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: j, children: "Save" })
    ] }) }) : null
  ] });
}
const Op = "_nav_c0zce_1", Up = "_tab_c0zce_10", Hp = "_tabActive_c0zce_11", wo = {
  nav: Op,
  tab: Up,
  tabActive: Hp
};
function Lp({ activeTab: s, onChange: r }) {
  var d = ye(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && (o.push({ key: "overview", label: "Overview" }), o.push({ key: "dashboard", label: "Dashboard" }), o.push({ key: "tools", label: "Tools" })), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ i.jsx("nav", { className: wo.nav, "aria-label": "Main", children: o.map(function(v) {
    var h = v.key === s;
    return /* @__PURE__ */ i.jsx(
      "button",
      {
        className: h ? wo.tabActive : wo.tab,
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
function qp(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Ls() {
  var s = ye(), r = la({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: qp
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
function Bp() {
  var s = ye(), [r, d] = E.useState([]);
  return E.useEffect(
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
function Gn() {
  var s = ye(), r = s.activeMasterContext, [d, o] = E.useState([]), [v, h] = E.useState("loading"), [j, A] = E.useState(null), N = E.useRef(Math.random().toString(36).slice(2)).current, D = E.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), A(null);
      var y = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (y.error) {
        A(y.error), h("error");
        return;
      }
      var z = (y.data || []).map(function(V) {
        return V.slave_username;
      }), R = { data: [] }, U = { data: [] };
      z.length > 0 && (R = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), U = await window.supabase.from("users").select("username, display_name, status_message").in("username", z));
      var L = {};
      (R.data || []).forEach(function(V) {
        L[V.username] = V.points || 0;
      });
      var q = {}, J = {};
      (U.data || []).forEach(function(V) {
        q[V.username] = V.display_name || V.username, J[V.username] = V.status_message || "";
      });
      var oe = (y.data || []).map(function(V) {
        return {
          username: V.slave_username,
          displayName: q[V.slave_username] || V.slave_username,
          statusMessage: J[V.slave_username] || "",
          points: L[V.slave_username] || 0,
          status: V.status
        };
      });
      o(oe), h("ready");
    },
    [r]
  );
  E.useEffect(
    function() {
      if (D(), !!r) {
        var y = window.supabase.channel("beta_slave_roster_" + r + "_" + N).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + r
          },
          function() {
            D();
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
            D();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(y);
        };
      }
    },
    [r, D]
  );
  var b = d.filter(function(y) {
    return y.status === "active";
  });
  return {
    slaves: b,
    allSlaves: d,
    status: v,
    error: j,
    reload: D
  };
}
const Yp = "_heading_1bkor_1", Gp = "_row_1bkor_11", Qp = "_checkboxRow_1bkor_31", Xp = "_select_1bkor_47", Zp = "_fieldset_1bkor_69", Vp = "_hint_1bkor_83", qa = {
  heading: Yp,
  row: Gp,
  checkboxRow: Qp,
  select: Xp,
  fieldset: Zp,
  hint: Vp
};
var ph = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function Kp({ onCreated: s }) {
  var r = ye(), d = Gn(), [o, v] = E.useState(ph), [h, j] = E.useState([]), [A, N] = E.useState(!1);
  function D(z, R) {
    v(function(U) {
      return Object.assign({}, U, { [z]: R });
    });
  }
  function b(z) {
    j(function(R) {
      return R.includes(z) ? R.filter(function(U) {
        return U !== z;
      }) : R.concat(z);
    });
  }
  async function y(z) {
    if (z.preventDefault(), !!o.text.trim()) {
      N(!0);
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
        }), v(ph), j([]), s && s();
      } finally {
        N(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: qa.heading, children: "Create New Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: y, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Task description",
          value: o.text,
          onChange: function(z) {
            D("text", z.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: qa.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: o.isDemerit,
            onChange: function(z) {
              D("isDemerit", z.target.checked);
            }
          }
        ),
        "This is a demerit (penalty only, no points)"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: qa.row, children: [
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Points",
            type: "number",
            min: "0",
            value: o.points,
            onChange: function(z) {
              D("points", z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Penalty points",
            type: "number",
            min: "0",
            value: o.penaltyPoints,
            onChange: function(z) {
              D("penaltyPoints", z.target.value);
            }
          }
        ),
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Due date",
            type: "datetime-local",
            value: o.dueDate,
            onChange: function(z) {
              D("dueDate", z.target.value);
            }
          }
        )
      ] }),
      o.isDemerit ? null : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("label", { className: qa.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: o.isRepeating,
              onChange: function(z) {
                D("isRepeating", z.target.checked);
              }
            }
          ),
          "Repeats"
        ] }),
        o.isRepeating ? /* @__PURE__ */ i.jsxs(
          "select",
          {
            className: qa.select,
            value: o.repeatInterval,
            onChange: function(z) {
              D("repeatInterval", z.target.value);
            },
            children: [
              /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
              /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ i.jsxs("fieldset", { className: qa.fieldset, children: [
        /* @__PURE__ */ i.jsxs("legend", { children: [
          "Assign to ",
          r.groupTerms.slaveLabelPlural
        ] }),
        d.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: qa.hint, children: [
          "No ",
          r.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : d.slaves.map(function(z) {
          return /* @__PURE__ */ i.jsxs("label", { className: qa.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: h.includes(z.username),
                onChange: function() {
                  b(z.username);
                }
              }
            ),
            z.displayName
          ] }, z.username);
        })
      ] }),
      !o.isDemerit && h.length > 1 ? /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: qa.select,
          value: o.assignmentMode,
          onChange: function(z) {
            D("assignmentMode", z.target.value);
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
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: A, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const Jp = "_wrap_1qfmw_1", kp = "_spinner_1qfmw_10", _h = {
  wrap: Jp,
  spinner: kp
};
function $t({ label: s = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: _h.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: _h.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: s })
  ] });
}
const $p = "_wrap_buujm_1", Fp = "_message_buujm_9", Sh = {
  wrap: $p,
  message: Fp
};
function na({ message: s = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Sh.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: Sh.message, children: s }),
    r ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const Wp = "_wrap_mx4zv_1", Ip = "_icon_mx4zv_7", Pp = "_title_mx4zv_12", e1 = "_hint_mx4zv_18", Es = {
  wrap: Wp,
  icon: Ip,
  title: Pp,
  hint: e1
};
function He({ icon: s = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Es.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: Es.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ i.jsx("p", { className: Es.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: Es.hint, children: d }) : null
  ] });
}
const t1 = "_badge_1988s_1", a1 = "_neutral_1988s_10", l1 = "_success_1988s_15", n1 = "_warning_1988s_20", u1 = "_danger_1988s_25", Bu = {
  badge: t1,
  neutral: a1,
  success: l1,
  warning: n1,
  danger: u1
};
function Lt({ tone: s = "neutral", children: r }) {
  var d = s === "success" ? Bu.success : s === "warning" ? Bu.warning : s === "danger" ? Bu.danger : Bu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [Bu.badge, d].join(" "), children: r });
}
function Ch(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function i1(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const s1 = "_item_v1inl_1", c1 = "_header_v1inl_5", r1 = "_text_v1inl_11", o1 = "_meta_v1inl_16", f1 = "_appealText_v1inl_33", d1 = "_actions_v1inl_41", Un = {
  item: s1,
  header: c1,
  text: r1,
  meta: o1,
  appealText: f1,
  actions: d1
};
function v1({ task: s, actions: r }) {
  var d = ye(), o = window.users[s.assignedTo], v = s.type === "cost-tracker", h = v ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ i.jsxs(ge, { className: Un.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Un.header, children: [
      /* @__PURE__ */ i.jsx(Lt, { tone: i1(s), children: Ch(s) }),
      s.type === "demerit" ? /* @__PURE__ */ i.jsx(Lt, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Un.text, children: v ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: Un.meta, children: [
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
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Un.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Un.actions, children: [
      d.isSlave && !v && s.type !== "demerit" && s.assignedTo === d.currentUser && s.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
        r.checkOffTask(s.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && s.type === "demerit" && s.status === "demerit_issued" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.acceptDemerit(s.id);
        }, children: "Accept" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          r.appealDemerit(s.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && v && s.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
        r.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && s.status === "pending_approval" && v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && s.status === "pending_approval" && !v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveTask(s.id);
        }, children: "Approve" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && s.type === "demerit" && s.appealStatus === "pending" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveAppeal(s.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.denyAppeal(s.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        r.deleteTask(s.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function As({ tasks: s, status: r, error: d, onRetry: o, actions: v, emptyLabel: h }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    na,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : s.length === 0 ? /* @__PURE__ */ i.jsx(He, { icon: "✓", title: h || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: s.map(function(j) {
    return /* @__PURE__ */ i.jsx(v1, { task: j, actions: v }, j.id);
  }) });
}
const m1 = "_section_7c868_1", h1 = "_heading_7c868_5", Hn = {
  section: m1,
  heading: h1
};
function g1() {
  var s = ye(), r = Ls(), d = Bp(), o = {
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
    var v = r.tasks.filter(function(A) {
      return A.assignedTo === s.currentUser || d.includes(A.id);
    });
    return /* @__PURE__ */ i.jsx(
      As,
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
  var h = r.tasks.filter(function(A) {
    return A.type === "demerit" && A.appealStatus === "pending";
  }), j = r.tasks.filter(function(A) {
    return A.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Kp, { onCreated: r.reload }),
    h.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Hn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Hn.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ i.jsx(
        As,
        {
          tasks: h,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    j.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Hn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Hn.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        As,
        {
          tasks: j,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(ge, { className: Hn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Hn.heading, children: "All Tasks" }),
      /* @__PURE__ */ i.jsx(
        As,
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
const y1 = "_calendarContainer_1n2ar_1", p1 = "_detail_1n2ar_13", _1 = "_detailRow_1n2ar_25", Tt = {
  calendarContainer: y1,
  detail: p1,
  detailRow: _1
};
function S1(s) {
  var r = typeof window.rrule < "u" ? window.rrule.RRule : void 0;
  return s.map(function(d) {
    if (d.isRepeating && d.repeatInterval && d.dueDate && r) {
      var o = {
        daily: r.DAILY,
        weekly: r.WEEKLY,
        monthly: r.MONTHLY
      };
      return {
        id: String(d.id),
        title: d.text + " (Repeating)",
        rrule: {
          freq: o[d.repeatInterval] || r.DAILY,
          dtstart: d.dueDate
        },
        duration: "01:00",
        classNames: ["fc-event-repeating"],
        extendedProps: { originalTask: d }
      };
    }
    return {
      id: String(d.id),
      title: d.text,
      start: d.dueDate,
      end: d.endDateTime || null,
      allDay: !d.dueDate || d.dueDate.length === 10,
      classNames: ["fc-event-normal"],
      extendedProps: { originalTask: d }
    };
  });
}
function b1({ task: s }) {
  var r = s.dueDate ? window.formatDate(s.dueDate) : "N/A", d = s.endDateTime ? window.formatDate(s.endDateTime) : null, o = s.dueDate && s.dueDate.length === 10, v = s.createdBy && window.users[s.createdBy] ? window.users[s.createdBy].displayName : s.createdBy, h = s.completedBy && window.users[s.completedBy] ? window.users[s.completedBy].displayName : s.completedBy, j = s.approvedBy && window.users[s.approvedBy] ? window.users[s.approvedBy].displayName : s.approvedBy;
  return /* @__PURE__ */ i.jsxs("div", { className: Tt.detail, children: [
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Type:" }),
      " ",
      s.isRepeating ? "Repeating Task" : "One-time Task"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Status:" }),
      " ",
      Ch(s)
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Start:" }),
      " ",
      r
    ] }),
    d ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "End:" }),
      " ",
      d
    ] }) : null,
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "All Day:" }),
      " ",
      o ? "Yes" : "No"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Description:" }),
      " ",
      s.text || "No description available."
    ] }),
    s.points ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Points:" }),
      " ",
      s.points
    ] }) : null,
    s.penaltyPoints ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Penalty:" }),
      " ",
      s.penaltyPoints
    ] }) : null,
    s.createdBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Created By:" }),
      " ",
      v
    ] }) : null,
    s.completedBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Completed By:" }),
      " ",
      h
    ] }) : null,
    s.approvedBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Approved By:" }),
      " ",
      j
    ] }) : null,
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal Reason:" }),
      " ",
      s.appealText
    ] }) : null
  ] });
}
function x1() {
  var s = ye(), r = Ls(), d = E.useRef(null), o = E.useRef(null), [v, h] = E.useState(null), j = E.useMemo(
    function() {
      return r.tasks.filter(function(N) {
        return !N || !N.dueDate ? !1 : s.isSlave ? N.assignedTo === s.currentUser || (window.mySharedTaskIds || []).includes(N.id) : !0;
      });
    },
    [r.tasks, s.isSlave, s.currentUser]
  ), A = E.useMemo(function() {
    return S1(j);
  }, [j]);
  return E.useEffect(
    function() {
      if (!(!d.current || typeof window.FullCalendar > "u")) {
        var N = new window.FullCalendar.Calendar(d.current, {
          initialView: "dayGridMonth",
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          },
          height: "auto",
          contentHeight: "auto",
          aspectRatio: 1.8,
          eventClick: function(D) {
            h(D.event.extendedProps.originalTask);
          }
        });
        return N.render(), o.current = N, function() {
          N.destroy(), o.current = null;
        };
      }
    },
    []
  ), E.useEffect(
    function() {
      var N = o.current;
      N && (N.removeAllEventSources(), N.addEventSource(A));
    },
    [A]
  ), /* @__PURE__ */ i.jsxs("div", { children: [
    r.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(na, { message: r.error ? r.error.message : "", onRetry: r.reload }) : null,
    /* @__PURE__ */ i.jsx("div", { ref: d, className: Tt.calendarContainer }),
    v ? /* @__PURE__ */ i.jsx(Fu, { title: v.text, onClose: function() {
      h(null);
    }, children: /* @__PURE__ */ i.jsx(b1, { task: v }) }) : null
  ] });
}
function j1(s, r) {
  return new Date(r.timestamp) - new Date(s.timestamp);
}
function zh() {
  var s = ye(), r = la({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: j1
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const T1 = "_row_qtrye_1", N1 = "_tile_qtrye_8", w1 = "_number_qtrye_12", E1 = "_label_qtrye_17", Cs = {
  row: T1,
  tile: N1,
  number: w1,
  label: E1
};
function A1({ stats: s }) {
  return /* @__PURE__ */ i.jsx("div", { className: Cs.row, children: s.map(function(r) {
    return /* @__PURE__ */ i.jsxs(ge, { className: Cs.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: Cs.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: Cs.label, children: r.label })
    ] }, r.label);
  }) });
}
const C1 = "_list_azyhi_1", z1 = "_row_azyhi_7", D1 = "_positive_azyhi_13", R1 = "_zero_azyhi_18", M1 = "_negative_azyhi_23", $u = {
  list: C1,
  row: z1,
  positive: D1,
  zero: R1,
  negative: M1
};
function O1(s) {
  return s < 0 ? $u.negative : s === 0 ? $u.zero : $u.positive;
}
function U1({ slaves: s }) {
  var r = ye();
  return s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: $u.list, children: s.map(function(d) {
    return /* @__PURE__ */ i.jsxs(ge, { className: $u.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: O1(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const H1 = "_heading_1mu37_1", L1 = "_form_1mu37_6", q1 = "_select_1mu37_13", Eo = {
  heading: H1,
  form: L1,
  select: q1
};
function B1({ slaves: s }) {
  var r = ye(), [d, o] = E.useState(s[0] ? s[0].username : ""), [v, h] = E.useState(0);
  E.useEffect(
    function() {
      var A = s.find(function(N) {
        return N.username === d;
      });
      A ? h(A.points) : s[0] && o(s[0].username);
    },
    [s, d]
  );
  async function j(A) {
    if (A.preventDefault(), !!d) {
      var N = s.find(function(b) {
        return b.username === d;
      }), D = N ? N.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (N ? N.displayName : d) + " points changed from " + D + " to " + (Number(v) || 0),
        "success"
      );
    }
  }
  return s.length === 0 ? null : /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsxs("h3", { className: Eo.heading, children: [
      "Set ",
      r.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ i.jsxs("form", { className: Eo.form, onSubmit: j, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: Eo.select,
          value: d,
          onChange: function(A) {
            o(A.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: s.map(function(A) {
            return /* @__PURE__ */ i.jsx("option", { value: A.username, children: A.displayName }, A.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(A) {
            h(A.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Set" })
    ] })
  ] });
}
const Y1 = "_filters_khuxk_1", G1 = "_filterSelect_khuxk_8", Q1 = "_list_khuxk_18", X1 = "_item_khuxk_27", Z1 = "_user_khuxk_33", V1 = "_details_khuxk_37", K1 = "_time_khuxk_41", Ba = {
  filters: Y1,
  filterSelect: G1,
  list: Q1,
  item: X1,
  user: Z1,
  details: V1,
  time: K1
};
var J1 = [
  { value: "login", label: "Login" },
  { value: "logout", label: "Logout" },
  { value: "tasks", label: "Tasks" },
  { value: "suggestions", label: "Suggestions" },
  { value: "rewards", label: "Rewards & Shop" },
  { value: "cost_trackers", label: "Cost Trackers" },
  { value: "other", label: "Other" }
];
function k1(s) {
  return s === "login" ? "login" : s === "logout" ? "logout" : /suggestion/i.test(s) ? "suggestions" : /reward|purchase/i.test(s) ? "rewards" : /cost tracker/i.test(s) ? "cost_trackers" : /task|demerit|appeal|invoice/i.test(s) ? "tasks" : "other";
}
function $1({ activity: s, status: r, error: d, onRetry: o }) {
  var [v, h] = E.useState(""), [j, A] = E.useState(""), N = E.useMemo(
    function() {
      var b = {}, y = [];
      return s.forEach(function(z) {
        if (!b[z.user]) {
          b[z.user] = !0;
          var R = window.users[z.user];
          y.push({ value: z.user, label: R ? R.displayName : z.user });
        }
      }), y.sort(function(z, R) {
        return z.label.localeCompare(R.label);
      }), y;
    },
    [s]
  ), D = E.useMemo(
    function() {
      return s.filter(function(b) {
        return !(v && b.user !== v || j && k1(b.action) !== j);
      });
    },
    [s, v, j]
  );
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "", onRetry: o }) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ba.filters, children: [
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ba.filterSelect,
          value: v,
          onChange: function(b) {
            h(b.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All users" }),
            N.map(function(b) {
              return /* @__PURE__ */ i.jsx("option", { value: b.value, children: b.label }, b.value);
            })
          ]
        }
      ),
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ba.filterSelect,
          value: j,
          onChange: function(b) {
            A(b.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All activity" }),
            J1.map(function(b) {
              return /* @__PURE__ */ i.jsx("option", { value: b.value, children: b.label }, b.value);
            })
          ]
        }
      )
    ] }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No recent activity" }) : D.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No activity matches those filters" }) : /* @__PURE__ */ i.jsx("ul", { className: Ba.list, children: D.map(function(b, y) {
      var z = window.users[b.user];
      return /* @__PURE__ */ i.jsxs("li", { className: Ba.item, children: [
        /* @__PURE__ */ i.jsx("span", { className: Ba.user, children: z ? z.displayName : b.user }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: Ba.action, children: b.action.replace(/_/g, " ") }),
        b.details ? /* @__PURE__ */ i.jsxs("span", { className: Ba.details, children: [
          " — ",
          b.details
        ] }) : null,
        /* @__PURE__ */ i.jsx("span", { className: Ba.time, children: window.formatDate(b.timestamp) })
      ] }, y);
    }) })
  ] });
}
const F1 = "_grid_69ji7_1", W1 = "_section_69ji7_8", I1 = "_heading_69ji7_12", Yu = {
  grid: F1,
  section: W1,
  heading: I1
};
function P1() {
  var s = ye(), r = Ls(), d = Gn(), o = zh(), v = r.tasks, h = d.slaves.map(function(A) {
    return A.username;
  }), j = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(A) {
        return A.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(A) {
        return A.status === "completed";
      }).length
    },
    {
      label: "Demerits Issued",
      value: v.filter(function(A) {
        return A.type === "demerit" && h.indexOf(A.assignedTo) !== -1;
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(A1, { stats: j }),
    /* @__PURE__ */ i.jsxs("div", { className: Yu.grid, children: [
      /* @__PURE__ */ i.jsxs(ge, { className: Yu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Yu.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(U1, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(B1, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: Yu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Yu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        $1,
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
function e_(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Dh() {
  var s = ye(), r = la({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: e_
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
var bh = { description: "", justification: "", points: 10, dueDate: "" };
function t_({ onSubmit: s }) {
  var [r, d] = E.useState(bh), [o, v] = E.useState(!1);
  function h(A, N) {
    d(function(D) {
      return Object.assign({}, D, { [A]: N });
    });
  }
  async function j(A) {
    if (A.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await s(r), d(bh);
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          value: r.description,
          onChange: function(A) {
            h("description", A.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Why? (optional)",
          multiline: !0,
          rows: 3,
          value: r.justification,
          onChange: function(A) {
            h("justification", A.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Suggested points",
          type: "number",
          min: "0",
          value: r.points,
          onChange: function(A) {
            h("points", A.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(A) {
            h("dueDate", A.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const a_ = "_card_q0jnd_1", l_ = "_badgeRow_q0jnd_5", n_ = "_description_q0jnd_11", u_ = "_justification_q0jnd_15", i_ = "_metaLine_q0jnd_21", s_ = "_actions_q0jnd_27", Ln = {
  card: a_,
  badgeRow: l_,
  description: n_,
  justification: u_,
  metaLine: i_,
  actions: s_
};
function c_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function xh({ suggestion: s, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var h = window.users[s.reviewedBy];
  return /* @__PURE__ */ i.jsxs(ge, { className: Ln.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ln.badgeRow, children: [
      /* @__PURE__ */ i.jsx(Lt, { tone: c_(s.status), children: s.status }),
      /* @__PURE__ */ i.jsxs(Lt, { tone: "neutral", children: [
        s.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Ln.description, children: s.description }),
    s.justification ? /* @__PURE__ */ i.jsx("p", { className: Ln.justification, children: s.justification }) : null,
    /* @__PURE__ */ i.jsxs("p", { className: Ln.metaLine, children: [
      "Submitted ",
      window.formatDate(s.createdAt),
      s.suggestedDueDate ? " · Suggested due " + window.formatDate(s.suggestedDueDate) : "",
      s.reviewedAt ? " · Reviewed by " + (h ? h.displayName : s.reviewedBy) : ""
    ] }),
    r && s.status === "pending" ? /* @__PURE__ */ i.jsxs("div", { className: Ln.actions, children: [
      /* @__PURE__ */ i.jsx(G, { onClick: function() {
        d(s.id);
      }, children: "Approve" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
        o(s.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        v(s.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function r_() {
  var s = ye(), r = Dh();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx($t, { label: "Loading suggestions..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(
      na,
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
      /* @__PURE__ */ i.jsx(t_, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(xh, { suggestion: v, forAdmin: !1 }, v.id);
      })
    ] });
  }
  var o = r.suggestions.filter(function(v) {
    return v.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No suggestions pending review" }) : o.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        xh,
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
var jh = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function o_(s, r) {
  return s.title.localeCompare(r.title);
}
function f_(s, r) {
  return new Date(r.purchaseDate) - new Date(s.purchaseDate);
}
function d_() {
  var s = ye(), r = s.activeMasterContext, d = la({
    table: "rewards",
    masterUsername: r,
    sort: o_
  }), o = la({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: f_
  }), [v, h] = E.useState(jh), [j, A] = E.useState("loading"), N = E.useRef(Math.random().toString(36).slice(2)).current, D = E.useCallback(
    async function() {
      if (r) {
        A("loading");
        var b = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (b.error) {
          A("error");
          return;
        }
        h(
          b.data && b.data.length > 0 ? b.data[0] : jh
        ), A("ready");
      }
    },
    [r]
  );
  return E.useEffect(
    function() {
      if (D(), !!r) {
        var b = window.supabase.channel("beta_reward_settings_" + r + "_" + N).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + r
          },
          function() {
            D();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(b);
        };
      }
    },
    [r, D]
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
    settingsStatus: j,
    addReward: function(b, y, z, R) {
      return window.addReward(b, y, z, R);
    },
    updateReward: function(b, y, z, R, U) {
      return window.updateReward(b, y, z, R, U);
    },
    deleteReward: function(b) {
      return window.deleteReward(b);
    },
    purchaseReward: function(b) {
      return window.purchaseReward(b);
    },
    authorizePurchase: function(b) {
      return window.authorizePurchase(b);
    },
    denyPurchase: function(b) {
      return window.denyPurchase(b);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(b, y, z) {
      return window.updateRewardSystemSettings(b, y, z);
    }
  };
}
const v_ = "_card_1tc0o_1", m_ = "_title_1tc0o_7", h_ = "_description_1tc0o_12", g_ = "_badgeRow_1tc0o_19", y_ = "_actions_1tc0o_24", Gu = {
  card: v_,
  title: m_,
  description: h_,
  badgeRow: g_,
  actions: y_
};
function Rh({ reward: s, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(ge, { className: Gu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: Gu.title, children: s.title }),
    /* @__PURE__ */ i.jsx("p", { className: Gu.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("div", { className: Gu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(Lt, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Lt, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: Gu.actions, children: [
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
        d(s);
      }, children: "Edit" }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        o(s.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ i.jsx(G, { onClick: function() {
      r(s.id);
    }, children: "Purchase" })
  ] });
}
const p_ = "_grid_19ohq_1", __ = "_purchasesHeading_19ohq_7", S_ = "_purchaseCard_19ohq_11", b_ = "_badgeRow_19ohq_15", x_ = "_purchaseTitle_19ohq_19", j_ = "_purchaseMeta_19ohq_24", Yl = {
  grid: p_,
  purchasesHeading: __,
  purchaseCard: S_,
  badgeRow: b_,
  purchaseTitle: x_,
  purchaseMeta: j_
};
function T_(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function N_({ rewards: s, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: h }) {
  var j = ye(), A = h.filter(function(N) {
    return N.userId === j.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "Failed to load", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Yl.grid, children: s.map(function(N) {
      return /* @__PURE__ */ i.jsx(Rh, { reward: N, onPurchase: v }, N.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Yl.purchasesHeading, children: "My Reward Purchases" }),
    A.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No purchases yet" }) : A.map(function(N) {
      return /* @__PURE__ */ i.jsxs(ge, { className: Yl.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Yl.badgeRow, children: /* @__PURE__ */ i.jsx(Lt, { tone: T_(N.status), children: N.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Yl.purchaseTitle, children: N.rewards ? N.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Yl.purchaseMeta, children: [
          N.purchaseCost,
          " points · ",
          window.formatDate(N.purchaseDate)
        ] }),
        N.status === "denied" && N.notes ? /* @__PURE__ */ i.jsxs("p", { className: Yl.purchaseMeta, children: [
          "Reason: ",
          N.notes
        ] }) : null
      ] }, N.id);
    })
  ] });
}
const w_ = "_heading_p82cd_1", E_ = "_row_p82cd_6", A_ = "_selectGroup_p82cd_16", C_ = "_selectLabel_p82cd_23", z_ = "_select_p82cd_16", D_ = "_actions_p82cd_38", qn = {
  heading: w_,
  row: E_,
  selectGroup: A_,
  selectLabel: C_,
  select: z_,
  actions: D_
};
var Ao = { title: "", description: "", cost: 10, type: "instant" };
function R_({ editingReward: s, onSave: r, onCancelEdit: d }) {
  var [o, v] = E.useState(Ao), [h, j] = E.useState(!1);
  E.useEffect(
    function() {
      v(
        s ? {
          title: s.title,
          description: s.description,
          cost: s.cost,
          type: s.type
        } : Ao
      );
    },
    [s]
  );
  function A(D, b) {
    v(function(y) {
      return Object.assign({}, y, { [D]: b });
    });
  }
  async function N(D) {
    if (D.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      j(!0);
      try {
        await r(o, s ? s.id : null), v(Ao);
      } finally {
        j(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: qn.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: N, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Title",
          value: o.title,
          onChange: function(D) {
            A("title", D.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          multiline: !0,
          rows: 2,
          value: o.description,
          onChange: function(D) {
            A("description", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: qn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(D) {
              A("cost", D.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: qn.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: qn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: qn.select,
              value: o.type,
              onChange: function(D) {
                A("type", D.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "instant", children: "Instant purchase" }),
                /* @__PURE__ */ i.jsx("option", { value: "authorized", children: "Requires authorization" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: qn.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: h, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const M_ = "_heading_26k11_1", O_ = "_row_26k11_6", U_ = "_checkboxRow_26k11_16", H_ = "_readout_26k11_24", L_ = "_actions_26k11_30", Bn = {
  heading: M_,
  row: O_,
  checkboxRow: U_,
  readout: H_,
  actions: L_
};
function q_({ settings: s, onSave: r, onReset: d }) {
  var [o, v] = E.useState(s.instantPurchaseLimit || 0), [h, j] = E.useState(s.resetDurationDays || 0), [A, N] = E.useState(s.requiresAuthorizationAfterLimit !== !1);
  E.useEffect(
    function() {
      v(s.instantPurchaseLimit || 0), j(s.resetDurationDays || 0), N(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function D(b) {
    b.preventDefault(), r(Number(o) || 0, Number(h) || 0, A);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Bn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Bn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(b) {
              v(b.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: h,
            onChange: function(b) {
              j(b.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Bn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: A,
            onChange: function(b) {
              N(b.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Bn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Bn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Bn.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const B_ = "_card_zkx61_1", Y_ = "_title_zkx61_5", G_ = "_meta_zkx61_10", Q_ = "_actions_zkx61_16", zs = {
  card: B_,
  title: Y_,
  meta: G_,
  actions: Q_
};
function X_({ purchases: s, onAuthorize: r, onDeny: d }) {
  var o = s.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var h = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(ge, { className: zs.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: zs.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        h ? h.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: zs.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: zs.actions, children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r(v.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          d(v.id);
        }, children: "Deny" })
      ] })
    ] }, v.id);
  }) });
}
const Z_ = "_heading_1ewsp_1", V_ = "_grid_1ewsp_5", Ds = {
  heading: Z_,
  grid: V_
};
function K_({ rewardsState: s }) {
  var [r, d] = E.useState(null);
  async function o(h, j) {
    j ? await s.updateReward(j, h.title, h.description, Number(h.cost), h.type) : await s.addReward(h.title, h.description, Number(h.cost), h.type), d(null);
  }
  function v(h) {
    window.showConfirmModal("Delete this reward?", function(j) {
      j && s.deleteReward(h);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      R_,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ds.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Ds.grid, children: s.rewards.map(function(h) {
      return /* @__PURE__ */ i.jsx(
        Rh,
        {
          reward: h,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        h.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Ds.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      q_,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ds.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      X_,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function J_() {
  var s = ye(), r = d_();
  return s.isMaster ? /* @__PURE__ */ i.jsx(K_, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    N_,
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
const k_ = "_heading_pc1l6_1", $_ = "_form_pc1l6_11", F_ = "_row_pc1l6_33", W_ = "_statusMessage_pc1l6_51", Qu = {
  heading: k_,
  form: $_,
  row: F_,
  statusMessage: W_
};
function I_() {
  var s = ye(), r = Gn(), [d, o] = E.useState({ username: "", password: "", displayName: "" }), [v, h] = E.useState(!1);
  function j(b, y) {
    o(function(z) {
      return Object.assign({}, z, { [b]: y });
    });
  }
  async function A(b) {
    b.preventDefault(), h(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      h(!1);
    }
  }
  function N(b) {
    window.deactivatePig(b);
  }
  function D(b) {
    window.reactivatePig(b);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Qu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Qu.form, onSubmit: A, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Username",
            value: d.username,
            onChange: function(b) {
              j("username", b.target.value);
            },
            placeholder: "lowercase, min 3 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Password",
            type: "password",
            value: d.password,
            onChange: function(b) {
              j("password", b.target.value);
            },
            placeholder: "min 4 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Display name",
            value: d.displayName,
            onChange: function(b) {
              j("displayName", b.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ i.jsxs(G, { type: "submit", loading: v, children: [
          "Add ",
          s.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("h2", { className: Qu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(b) {
      var y = b.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Qu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Lt, { tone: y ? "success" : "neutral", children: y ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: b.displayName }),
          " (",
          b.username,
          ") ·",
          " ",
          b.points,
          " pts",
          b.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Qu.statusMessage, children: [
            " · ",
            b.statusMessage
          ] }) : null
        ] }),
        y ? /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "danger",
            onClick: function() {
              N(b.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          G,
          {
            onClick: function() {
              D(b.username);
            },
            children: "Reactivate"
          }
        )
      ] }, b.username);
    })
  ] });
}
function P_(s, r) {
  return new Date(r.created_at) - new Date(s.created_at);
}
function eS() {
  var s = ye(), r = la({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: P_
  }), d = E.useCallback(async function() {
    await window.generateInvite(), r.reload();
  }, [r]), o = E.useCallback(
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
const tS = "_heading_1pok1_1", aS = "_hint_1pok1_11", lS = "_row_1pok1_23", nS = "_actions_1pok1_45", Xu = {
  heading: tS,
  hint: aS,
  row: lS,
  actions: nS
};
function uS(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function iS() {
  var s = ye(), r = eS(), [d, o] = E.useState(null);
  function v(h) {
    navigator.clipboard.writeText(window.buildInviteLink(h)), o(h), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Xu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Xu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: r.generateInvite, children: "Generate Invite Link" }),
    r.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading invites..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load invites: " + (r.error ? r.error.message : "unknown error"),
        onRetry: r.reload
      }
    ) : null,
    r.status === "ready" && r.invites.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No invites generated yet" }) : null,
    r.status === "ready" && r.invites.length > 0 ? r.invites.map(function(h) {
      var j = h.status === "pending" && h.expires_at && new Date(h.expires_at) < /* @__PURE__ */ new Date(), A = j ? "expired" : h.status, N = h.status === "pending" && !j;
      return /* @__PURE__ */ i.jsxs("div", { className: Xu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Lt, { tone: uS(A), children: A.charAt(0).toUpperCase() + A.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: h.code }),
          h.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Xu.hint, children: [
            " · redeemed by ",
            h.redeemed_by
          ] }) : null
        ] }),
        N ? /* @__PURE__ */ i.jsxs("div", { className: Xu.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(h.code);
          }, children: d === h.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ i.jsx(
            G,
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
const sS = "_form_7nlkd_1", cS = {
  form: sS
};
function rS({ onAdd: s }) {
  var [r, d] = E.useState(""), [o, v] = E.useState(!1);
  async function h(j) {
    j.preventDefault();
    var A = r.trim();
    if (A) {
      v(!0);
      try {
        await s(A), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: cS.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      ue,
      {
        multiline: !0,
        rows: 2,
        value: r,
        onChange: function(j) {
          d(j.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.trim(), children: "Add Message" })
  ] });
}
const oS = "_heading_10ijk_1", fS = "_row_10ijk_11", dS = "_actions_10ijk_33", Co = {
  heading: oS,
  row: fS,
  actions: dS
};
function vS() {
  var s = Ah();
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Co.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(rS, { onAdd: s.addMessage }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading messages..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load messages: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" && s.messages.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No messages added yet" }) : null,
    s.status === "ready" && s.messages.length > 0 ? s.messages.map(function(r, d) {
      var o = d === 0, v = d === s.messages.length - 1, h = s.currentMessage && s.currentMessage.id === r.id;
      return /* @__PURE__ */ i.jsxs("div", { className: Co.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          h ? /* @__PURE__ */ i.jsx(Lt, { tone: "success", children: "Showing now" }) : null,
          " ",
          r.body
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Co.actions, children: [
          /* @__PURE__ */ i.jsx(
            G,
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
            G,
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
            G,
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
function mS() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(I_, {}),
    /* @__PURE__ */ i.jsx(iS, {}),
    /* @__PURE__ */ i.jsx(vS, {})
  ] });
}
function hS() {
  var s = ye(), [r, d] = E.useState([]), [o, v] = E.useState("loading"), h = E.useCallback(async function() {
    v("loading");
    var j = await window.fetchAllMasters();
    d(j || []), v("ready");
  }, []);
  return E.useEffect(
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
    deactivateMaster: function(j) {
      return new Promise(function(A) {
        window.showConfirmModal(
          "Deactivate master '" + j + "'? They (and their group) won't be able to log in.",
          async function(N) {
            N && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", j), window.showNotification("Master deactivated.", "success"), await h()), A();
          }
        );
      });
    },
    reactivateMaster: async function(j) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", j), window.showNotification("Master reactivated.", "success"), await h();
    }
  };
}
const gS = "_list_1yv13_1", yS = "_row_1yv13_10", pS = "_ratio_1yv13_18", zo = {
  list: gS,
  row: yS,
  ratio: pS
};
function _S({ theme: s }) {
  if (!window.ContrastUtils) return null;
  var r = window.ContrastUtils.checkThemeContrast(s);
  return /* @__PURE__ */ i.jsx("ul", { className: zo.list, children: r.map(function(d) {
    return /* @__PURE__ */ i.jsxs("li", { className: zo.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.label }),
      /* @__PURE__ */ i.jsxs("span", { className: zo.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ i.jsx(Lt, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const SS = "_heading_xjg2m_1", bS = "_row_xjg2m_11", xS = "_checkboxRow_xjg2m_31", jS = "_divider_xjg2m_47", TS = "_colorGroupLabel_xjg2m_57", NS = "_colorRow_xjg2m_71", wS = "_colorField_xjg2m_85", ES = "_actions_xjg2m_119", Jt = {
  heading: SS,
  row: bS,
  checkboxRow: xS,
  divider: jS,
  colorGroupLabel: TS,
  colorRow: NS,
  colorField: wS,
  actions: ES
};
var AS = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
}, CS = {
  bg: "#ffffff",
  card: "#f4f4f5",
  elevated: "#e4e4e7",
  textPrimary: "#18181b",
  textSecondary: "#52525b"
};
function Th(s) {
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
    appSubtitle: s ? s.appSubtitle : "Management Tool",
    theme: s ? s.theme : AS,
    themeLight: s ? s.themeLight : CS
  };
}
function Nh({ master: s, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, h] = E.useState(Th(s)), [j, A] = E.useState(!1), N = !!s;
  function D(R, U) {
    h(function(L) {
      return Object.assign({}, L, { [R]: U });
    });
  }
  function b(R, U) {
    h(function(L) {
      return Object.assign({}, L, { theme: Object.assign({}, L.theme, { [R]: U }) });
    });
  }
  function y(R, U) {
    h(function(L) {
      return Object.assign({}, L, { themeLight: Object.assign({}, L.themeLight, { [R]: U }) });
    });
  }
  async function z(R) {
    R.preventDefault(), A(!0);
    try {
      N ? await d(s.username, v) : (await r(v), h(Th(null)));
    } finally {
      A(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Jt.heading, children: N ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: z, children: [
      N ? null : /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Username",
          value: v.username,
          onChange: function(R) {
            D("username", R.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: N ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(R) {
            D("password", R.target.value);
          },
          required: !N
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Display name",
          value: v.displayName,
          onChange: function(R) {
            D("displayName", R.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Jt.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.isAdmin,
            onChange: function(R) {
              D("isAdmin", R.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Jt.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: v.groupLabel,
            onChange: function(R) {
              D("groupLabel", R.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: v.masterLabel,
            onChange: function(R) {
              D("masterLabel", R.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Jt.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Master label (plural)",
            value: v.masterLabelPlural,
            onChange: function(R) {
              D("masterLabelPlural", R.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: v.slaveLabel,
            onChange: function(R) {
              D("slaveLabel", R.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Slave label (plural)",
          value: v.slaveLabelPlural,
          onChange: function(R) {
            D("slaveLabelPlural", R.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "App header subtitle",
          placeholder: "Shown under the group label in this group's header",
          value: v.appSubtitle,
          onChange: function(R) {
            D("appSubtitle", R.target.value);
          },
          maxLength: 60
        }
      ),
      /* @__PURE__ */ i.jsx("hr", { className: Jt.divider }),
      /* @__PURE__ */ i.jsx("p", { className: Jt.colorGroupLabel, children: "Dark mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Jt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(R) {
        var U = R[0], L = R[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Jt.colorField, children: [
          L,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.theme[U],
              onChange: function(q) {
                b(U, q.target.value);
              }
            }
          )
        ] }, U);
      }) }),
      /* @__PURE__ */ i.jsx("p", { className: Jt.colorGroupLabel, children: "Light mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Jt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(R) {
        var U = R[0], L = R[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Jt.colorField, children: [
          L,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.themeLight[U],
              onChange: function(q) {
                y(U, q.target.value);
              }
            }
          )
        ] }, "light-" + U);
      }) }),
      /* @__PURE__ */ i.jsx(_S, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: Jt.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: j, children: N ? "Save changes" : "Create master" }),
        N ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const zS = "_heading_1uetk_1", DS = "_hint_1uetk_11", RS = "_row_1uetk_23", MS = "_actions_1uetk_45", Rs = {
  heading: zS,
  hint: DS,
  row: RS,
  actions: MS
};
function OS() {
  var s = ye(), [r, d] = E.useState(s.siteSettings.pageTitle), [o, v] = E.useState(s.siteSettings.loginHeading), [h, j] = E.useState(!1);
  E.useEffect(
    function() {
      d(s.siteSettings.pageTitle), v(s.siteSettings.loginHeading);
    },
    [s.siteSettings]
  );
  async function A(N) {
    N.preventDefault(), j(!0);
    try {
      await window.updateSiteSettings({
        pageTitle: r,
        loginHeading: o
      }), s.refresh();
    } finally {
      j(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Rs.heading, children: "Site Settings" }),
    /* @__PURE__ */ i.jsx("p", { className: Rs.hint, children: "These are shared site-wide, across every group - they show before anyone has logged in, so there's no group to scope them to." }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: A, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Rs.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Browser tab title",
            value: r,
            onChange: function(N) {
              d(N.target.value);
            },
            maxLength: 60
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Login screen heading",
            value: o,
            onChange: function(N) {
              v(N.target.value);
            },
            maxLength: 60
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: Rs.actions, children: /* @__PURE__ */ i.jsx(G, { type: "submit", loading: h, children: "Save" }) })
    ] })
  ] });
}
const US = "_heading_vrwe0_1", HS = "_row_vrwe0_5", LS = "_badgeRow_vrwe0_14", qS = "_meta_vrwe0_20", BS = "_actions_vrwe0_26", Zu = {
  heading: US,
  row: HS,
  badgeRow: LS,
  meta: qS,
  actions: BS
};
function YS() {
  var s = hS(), [r, d] = E.useState(null);
  async function o(h) {
    var j = await s.createMaster(h);
    j && await s.reload();
  }
  async function v(h, j) {
    await s.updateMasterAccount(h, {
      displayName: j.displayName,
      password: j.password,
      isAdmin: j.isAdmin
    }), await s.updateMasterTerminology(h, j), d(null), await s.reload();
  }
  return r ? /* @__PURE__ */ i.jsx(
    Nh,
    {
      master: r,
      onSaveExisting: v,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(OS, {}),
    /* @__PURE__ */ i.jsx(Nh, { onCreate: o }),
    /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : s.masters.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No masters yet" }) : s.masters.map(function(h) {
      var j = h.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Zu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Zu.badgeRow, children: [
            /* @__PURE__ */ i.jsx(Lt, { tone: j ? "success" : "neutral", children: j ? "Active" : "Inactive" }),
            h.isAdmin ? /* @__PURE__ */ i.jsx(Lt, { tone: "warning", children: "Admin" }) : null
          ] }),
          /* @__PURE__ */ i.jsx("strong", { children: h.displayName }),
          " (",
          h.username,
          ")",
          /* @__PURE__ */ i.jsxs("div", { className: Zu.meta, children: [
            "Group: ",
            h.groupLabel,
            " · ",
            h.masterLabel,
            " / ",
            h.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Zu.actions, children: [
          /* @__PURE__ */ i.jsx(
            G,
            {
              variant: "secondary",
              onClick: function() {
                d(h);
              },
              children: "Edit"
            }
          ),
          j ? /* @__PURE__ */ i.jsx(
            G,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(h.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            G,
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
var Ms = 100;
function GS() {
  var s = ye(), r = s.activeMasterContext, [d, o] = E.useState([]), [v, h] = E.useState("loading"), [j, A] = E.useState(null), [N, D] = E.useState(!1), b = E.useRef(Math.random().toString(36).slice(2)).current, y = E.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), A(null);
      var U = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Ms);
      if (U.error) {
        A(U.error), h("error");
        return;
      }
      var L = (U.data || []).slice().reverse();
      o(L), D((U.data || []).length === Ms), h("ready");
    },
    [r]
  ), z = E.useCallback(
    async function() {
      o(function(U) {
        if (U.length === 0) return U;
        var L = U[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", L.created_at).order("created_at", { ascending: !1 }).limit(Ms).then(function(q) {
          if (!q.error) {
            var J = (q.data || []).slice().reverse();
            D((q.data || []).length === Ms), o(function(oe) {
              return J.concat(oe);
            });
          }
        }), U;
      });
    },
    [r]
  ), R = E.useCallback(
    async function(U) {
      var L = await window.sendChatMessage({ body: U });
      L && o(function(q) {
        return q.some(function(J) {
          return J.id === L.id;
        }) ? q : q.concat([L]);
      });
    },
    []
  );
  return E.useEffect(
    function() {
      if (y(), !!r) {
        var U = window.supabase.channel("beta_chat_messages_" + r + "_" + b).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + r
          },
          function(q) {
            o(function(J) {
              return J.some(function(oe) {
                return oe.id === q.new.id;
              }) ? J : J.concat([q.new]);
            });
          }
        ).subscribe(), L = window.setInterval(y, 5e3);
        return function() {
          window.supabase.removeChannel(U), window.clearInterval(L);
        };
      }
    },
    [r, y]
  ), {
    messages: d,
    status: v,
    error: j,
    hasMoreOlder: N,
    loadOlder: z,
    sendMessage: R,
    reload: y
  };
}
const QS = "_row_gqneb_1", XS = "_meta_gqneb_19", ZS = "_status_gqneb_35", VS = "_time_gqneb_43", KS = "_body_gqneb_51", Vu = {
  row: QS,
  meta: XS,
  status: ZS,
  time: VS,
  body: KS
};
function JS({ message: s }) {
  var r = window.users[s.sender_username], d = r ? r.displayName : s.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Vu.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Vu.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Vu.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Vu.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Vu.body, children: s.body })
  ] });
}
const kS = "_form_nndvu_1", $S = "_input_nndvu_13", wh = {
  form: kS,
  input: $S
};
function FS({ onSend: s }) {
  var [r, d] = E.useState(""), [o, v] = E.useState(!1);
  async function h(j) {
    j.preventDefault();
    var A = r.trim();
    if (A) {
      v(!0);
      try {
        await s(A), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: wh.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        className: wh.input,
        value: r,
        onChange: function(j) {
          d(j.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.trim(), children: "Send" })
  ] });
}
const WS = "_heading_12c2o_1", IS = "_loadOlder_12c2o_11", PS = "_list_12c2o_19", Do = {
  heading: WS,
  loadOlder: IS,
  list: PS
};
function eb() {
  var s = GS(), r = E.useRef(null), d = E.useRef(!0);
  E.useEffect(
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
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Do.heading, children: "Group Chat" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading chat..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load chat: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      s.hasMoreOlder ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.loadOlder, className: Do.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: Do.list, ref: r, onScroll: o, children: s.messages.length === 0 ? /* @__PURE__ */ i.jsx(He, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(JS, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(FS, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
function tb(s, r) {
  return new Date(r.updated_at) - new Date(s.updated_at);
}
function Mh() {
  var s = ye(), r = la({
    table: "saved_spirals",
    masterUsername: s.activeMasterContext,
    sort: tb
  }), d = E.useCallback(
    async function(v) {
      var h = await window.saveSpiralToLibrary(v);
      return r.reload(), h;
    },
    [r]
  ), o = E.useCallback(
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
var Oh = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function ab(s, r, d, o) {
  return Object.assign(
    {
      id: s,
      x: r / 2,
      y: d / 2
    },
    Oh,
    {}
  );
}
function lb(s, r, d) {
  var o = Math.min(s.canvas.width, s.canvas.height), v = r.radiusPercent / 100 * o * 2, h = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  s.save(), s.translate(r.x, r.y), s.rotate(r.rotation * Math.PI / 180 + h * 0.5), s.strokeStyle = r.color, s.lineWidth = r.thickness, s.globalAlpha = r.opacity, s.lineCap = "round", s.lineJoin = "round";
  for (var j = 0; j < r.arms; j++) {
    s.save(), s.rotate(j * 2 * Math.PI / r.arms), s.beginPath();
    for (var A = !0, N = 0; N < v; N += 0.5) {
      var D = N * 0.08 + h, b = N * Math.cos(D), y = N * Math.sin(D);
      A ? (s.moveTo(b, y), A = !1) : s.lineTo(b, y);
    }
    s.stroke(), s.restore();
  }
  s.restore();
}
function nb(s) {
  var r = JSON.stringify(s, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function ub(s, r, d) {
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
const ib = "_canvas_1y7at_1", sb = {
  canvas: ib
};
function cb({ canvasRef: s, spiralsRef: r, backgroundColor: d }) {
  var o = E.useRef(d);
  return E.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), E.useEffect(function() {
    var v = s.current, h = v.getContext("2d");
    function j() {
      var D = v.parentElement;
      v.width = D.clientWidth, v.height = D.clientHeight, r.current.forEach(function(b) {
        b.x = v.width / 2, b.y = v.height / 2;
      });
    }
    var A = new ResizeObserver(j);
    A.observe(v.parentElement), j();
    var N = requestAnimationFrame(function D(b) {
      N = requestAnimationFrame(D), h.fillStyle = o.current, h.fillRect(0, 0, v.width, v.height), r.current.forEach(function(y) {
        lb(h, y, b);
      });
    });
    return function() {
      cancelAnimationFrame(N), A.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: s, className: sb.canvas });
}
const rb = "_sidebar_1jfxv_1", ob = "_controlGroup_1jfxv_19", fb = "_spiralList_1jfxv_53", db = "_spiralItem_1jfxv_67", vb = "_spiralItemActive_1jfxv_69", mb = "_actions_1jfxv_97", hb = "_controlRow_1jfxv_107", gb = "_valueDisplay_1jfxv_141", yb = "_sendAsTask_1jfxv_153", dt = {
  sidebar: rb,
  controlGroup: ob,
  spiralList: fb,
  spiralItem: db,
  spiralItemActive: vb,
  actions: mb,
  controlRow: hb,
  valueDisplay: gb,
  sendAsTask: yb
};
var pb = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function _b({
  textControls: s,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: h,
  onSelect: j,
  onClearAll: A,
  onPropertyChange: N,
  backgroundColor: D,
  onBackgroundChange: b,
  onSave: y,
  onLoadFile: z,
  onOpenTaskModal: R,
  savedSpiralName: U,
  onSaveToLibrary: L
}) {
  var q = E.useRef(null), [J, oe] = E.useState(U || "");
  return /* @__PURE__ */ i.jsxs("div", { className: dt.sidebar, children: [
    s,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ i.jsx("div", { className: dt.spiralList, children: r.map(function(V, xe) {
        return /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: xe === d ? dt.spiralItemActive : dt.spiralItem,
            children: [
              /* @__PURE__ */ i.jsxs("span", { children: [
                "Spiral ",
                xe + 1
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: dt.actions, children: [
                /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
                  j(xe);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
                  h(xe);
                }, children: "Delete" })
              ] })
            ]
          },
          V.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      pb.map(function(V) {
        return /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
          /* @__PURE__ */ i.jsxs("label", { children: [
            V.label,
            ":"
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: V.min,
              max: V.max,
              step: V.step,
              value: o[V.key],
              onChange: function(xe) {
                N(V.key, Number(xe.target.value));
              }
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: dt.valueDisplay, children: [
            V.key === "speed" || V.key === "opacity" || V.key === "timeOffset" ? Number(o[V.key]).toFixed(1) : o[V.key],
            V.suffix || ""
          ] })
        ] }, V.key);
      }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Color:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: o.color,
            onChange: function(V) {
              N("color", V.target.value);
            }
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Configuration" }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: y, children: "Save Config" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          q.current.click();
        }, children: "Load Config" })
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          ref: q,
          style: { display: "none" },
          onChange: function(V) {
            V.target.files[0] && z(V.target.files[0]), V.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Save to Library" }),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Name",
          value: J,
          onChange: function(V) {
            oe(V.target.value);
          },
          placeholder: "e.g. Calming blue swirl"
        }
      ),
      /* @__PURE__ */ i.jsx(
        G,
        {
          variant: "secondary",
          disabled: !J.trim(),
          onClick: function() {
            L(J.trim());
          },
          children: U ? "Update Saved Spiral" : "Save to Library"
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Global Settings" }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Background:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: D,
            onChange: function(V) {
              b(V.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: A, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: R, className: dt.sendAsTask, children: "Send as Task" })
  ] });
}
var Sb = [
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
function bb(s) {
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
function xb() {
  var [s, r] = E.useState(Sb), [d, o] = E.useState(2e3), [v, h] = E.useState(3e3), [j, A] = E.useState(0.5), [N, D] = E.useState(2.5), [b, y] = E.useState("#ffffff"), [z, R] = E.useState(!1), [U, L] = E.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), q = E.useRef(null), J = E.useRef(0), oe = E.useRef([]), V = E.useRef(!1), xe = E.useRef(v), Ge = E.useRef(j);
  E.useEffect(function() {
    xe.current = v;
  }, [v]), E.useEffect(function() {
    Ge.current = j;
  }, [j]);
  function ee(De) {
    L({ text: De, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        L({ text: De, shown: !0, instant: !1 });
      });
    });
  }
  function I() {
    L(function(De) {
      return { text: De.text, shown: !1, instant: !1 };
    });
  }
  function ne() {
    if (!V.current) {
      I();
      return;
    }
    J.current >= oe.current.length && (J.current = 0);
    var De = oe.current[J.current];
    if (De)
      if (De.type === "text") {
        setTimeout(function() {
          ee(De.value);
        }, 50), J.current++;
        var Xe = Ge.current * 1e3, te = Xe + xe.current + Xe + 50;
        q.current = setTimeout(ne, te);
      } else
        I(), J.current++, q.current = setTimeout(ne, De.value);
  }
  function ke() {
    q.current && clearTimeout(q.current), oe.current = bb(s), J.current = 0, V.current = !0, R(!0), ne();
  }
  function Fe() {
    V.current = !1, R(!1), q.current && clearTimeout(q.current), L({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return E.useEffect(function() {
    return function() {
      V.current = !1, q.current && clearTimeout(q.current);
    };
  }, []), {
    display: U,
    script: s,
    setScript: r,
    interval: d,
    setInterval: o,
    holdDuration: v,
    setHoldDuration: h,
    animSpeed: j,
    setAnimSpeed: A,
    fontSize: N,
    setFontSize: D,
    color: b,
    setColor: y,
    isRunning: z,
    startLoop: ke,
    stopLoop: Fe
  };
}
const jb = "_overlay_qasw4_1", Tb = {
  overlay: jb
};
function Nb({ display: s, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: Tb.overlay,
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
const wb = "_controlGroup_9ywy2_1", Eb = "_script_9ywy2_23", Ab = "_controlRow_9ywy2_47", Cb = "_valueDisplay_9ywy2_83", zb = "_buttonRow_9ywy2_97", kt = {
  controlGroup: wb,
  script: Eb,
  controlRow: Ab,
  valueDisplay: Cb,
  buttonRow: zb
};
function Db(s) {
  return /* @__PURE__ */ i.jsxs("div", { className: kt.controlGroup, children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ i.jsx(
      "textarea",
      {
        className: kt.script,
        value: s.script,
        onChange: function(r) {
          s.setScript(r.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: kt.valueDisplay, children: [
        s.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: kt.valueDisplay, children: [
        s.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: kt.valueDisplay, children: [
        s.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: kt.valueDisplay, children: [
        s.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: kt.controlRow, children: [
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
    /* @__PURE__ */ i.jsxs("div", { className: kt.buttonRow, children: [
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.startLoop, disabled: s.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.stopLoop, disabled: !s.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const Rb = "_row_vc5cz_1", Mb = "_checkboxRow_vc5cz_23", Ob = "_selectLabel_vc5cz_39", Ub = "_select_vc5cz_39", Hb = "_fieldset_vc5cz_73", Lb = "_hint_vc5cz_87", qb = "_actions_vc5cz_99", _a = {
  row: Rb,
  checkboxRow: Mb,
  selectLabel: Ob,
  select: Ub,
  fieldset: Hb,
  hint: Lb,
  actions: qb
};
function Bb({ onClose: s, onSent: r }) {
  var d = ye(), o = Gn(), [v, h] = E.useState("Experience the Spiral Animation"), [j, A] = E.useState(10), [N, D] = E.useState(5), [b, y] = E.useState(""), [z, R] = E.useState(!1), [U, L] = E.useState("daily"), [q, J] = E.useState([]), [oe, V] = E.useState(!1);
  function xe(ee) {
    J(function(I) {
      return I.includes(ee) ? I.filter(function(ne) {
        return ne !== ee;
      }) : I.concat(ee);
    });
  }
  async function Ge() {
    var ee = v.trim();
    if (!ee) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (q.length === 0) {
      window.showNotification(
        "Select at least one " + d.groupTerms.slaveLabel + " to assign this to",
        "error"
      );
      return;
    }
    if (b) {
      var I = new Date(b);
      if (isNaN(I.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (I < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    V(!0);
    try {
      var ne = {
        text: ee,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        points: Number(j) || 10,
        penaltyPoints: Number(N) || 5,
        dueDate: b || null,
        isRepeating: z,
        repeatInterval: z ? U : null,
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
      }, { error: ke } = await window.createTaskForPigs(ne, q);
      if (ke) {
        console.error("Error creating spiral task:", ke), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + ee + '" created successfully!',
        "success"
      ), r();
    } finally {
      V(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(Fu, { title: "🌀 Create Spiral Task", onClose: s, children: [
    /* @__PURE__ */ i.jsx(
      ue,
      {
        label: "Task Description",
        value: v,
        onChange: function(ee) {
          h(ee.target.value);
        },
        maxLength: 200
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: _a.row, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: j,
          onChange: function(ee) {
            A(ee.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Penalty Points",
          type: "number",
          min: "0",
          max: "50",
          value: N,
          onChange: function(ee) {
            D(ee.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: _a.row, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: b,
          onChange: function(ee) {
            y(ee.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: _a.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: z,
            onChange: function(ee) {
              R(ee.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    z ? /* @__PURE__ */ i.jsx("div", { className: _a.row, children: /* @__PURE__ */ i.jsxs("label", { className: _a.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: _a.select,
          value: U,
          onChange: function(ee) {
            L(ee.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
            /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
          ]
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ i.jsxs("fieldset", { className: _a.fieldset, children: [
      /* @__PURE__ */ i.jsxs("legend", { children: [
        "Assign to ",
        d.groupTerms.slaveLabelPlural
      ] }),
      o.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: _a.hint, children: [
        "No ",
        d.groupTerms.slaveLabelPlural,
        " added yet."
      ] }) : o.slaves.map(function(ee) {
        return /* @__PURE__ */ i.jsxs("label", { className: _a.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: q.includes(ee.username),
              onChange: function() {
                xe(ee.username);
              }
            }
          ),
          ee.displayName
        ] }, ee.username);
      })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: _a.actions, children: [
      /* @__PURE__ */ i.jsx(G, { loading: oe, onClick: Ge, disabled: q.length === 0, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s, children: "Cancel" })
    ] })
  ] });
}
const Yb = "_overlay_1ka14_1", Gb = "_closeBtn_1ka14_19", Qb = "_viewer_1ka14_51", Xb = "_canvasArea_1ka14_63", Os = {
  overlay: Yb,
  closeBtn: Gb,
  viewer: Qb,
  canvasArea: Xb
};
function Ku(s) {
  return s ? Object.assign({}, s) : null;
}
function Zb({ onClose: s, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = E.useRef(null), h = E.useRef([]), j = E.useRef(1), [, A] = E.useState(0), [N, D] = E.useState(0), [b, y] = E.useState(null), [z, R] = E.useState("#000000"), [U, L] = E.useState(!1), [q, J] = E.useState(o || null), [oe, V] = E.useState(d || ""), xe = xb(), Ge = Mh();
  function ee() {
    var B = v.current;
    return B ? { width: B.width, height: B.height } : { width: 0, height: 0 };
  }
  function I() {
    var B = ee(), X = ab(j.current++, B.width, B.height);
    h.current = h.current.concat(X), D(h.current.length - 1), y(Ku(X)), A(function(ce) {
      return ce + 1;
    });
  }
  function ne(B) {
    h.current = h.current.filter(function(ce, he) {
      return he !== B;
    });
    var X = Math.max(0, B - 1);
    D(X), y(Ku(h.current[X])), A(function(ce) {
      return ce + 1;
    });
  }
  function ke(B) {
    D(B), y(Ku(h.current[B]));
  }
  function Fe() {
    h.current = [], D(0), y(null), A(function(B) {
      return B + 1;
    });
  }
  function De(B, X) {
    var ce = h.current[N];
    ce && (ce[B] = X, y(Ku(ce)));
  }
  function Xe() {
    nb({
      spirals: h.current.map(function(B) {
        return Object.assign({}, B);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: z,
        selectedSpiralIndex: N
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function te(B) {
    var X = ee(), ce = (B.spirals || []).map(function(ot) {
      return j.current = Math.max(j.current, (ot.id || 0) + 1), Object.assign(
        { x: X.width / 2, y: X.height / 2 },
        Oh,
        ot
      );
    });
    h.current = ce;
    var he = B.globalSettings && B.globalSettings.selectedSpiralIndex || 0;
    D(he), y(Ku(ce[he] || ce[0])), B.globalSettings && B.globalSettings.backgroundColor && R(B.globalSettings.backgroundColor), A(function(ot) {
      return ot + 1;
    });
  }
  function We(B) {
    ub(
      B,
      function(X) {
        te(X), J(null), V(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(X) {
        window.showNotification(X, "error");
      }
    );
  }
  function Le(B) {
    Ge.saveSpiral({
      id: q,
      name: B,
      config: {
        spirals: h.current.map(function(X) {
          return Object.assign({}, X);
        }),
        textSettings: {},
        globalSettings: {
          backgroundColor: z,
          selectedSpiralIndex: N
        }
      }
    }).then(function(X) {
      X && J(X), V(B);
    });
  }
  E.useEffect(function() {
    r ? te(r) : h.current.length === 0 && I();
    function B(X) {
      X.key === "Escape" && s();
    }
    return document.addEventListener("keydown", B), function() {
      document.removeEventListener("keydown", B);
    };
  }, []);
  var Q = h.current.map(function(B) {
    return { id: B.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: Os.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: Os.closeBtn, onClick: s, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: Os.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Os.canvasArea, children: [
        /* @__PURE__ */ i.jsx(cb, { canvasRef: v, spiralsRef: h, backgroundColor: z }),
        /* @__PURE__ */ i.jsx(
          Nb,
          {
            display: xe.display,
            animSpeed: xe.animSpeed,
            fontSize: xe.fontSize,
            color: xe.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        _b,
        {
          textControls: /* @__PURE__ */ i.jsx(Db, { ...xe }),
          spirals: Q,
          activeIndex: N,
          activeSnapshot: b,
          onAdd: I,
          onDelete: ne,
          onSelect: ke,
          onClearAll: Fe,
          onPropertyChange: De,
          backgroundColor: z,
          onBackgroundChange: R,
          onSave: Xe,
          onLoadFile: We,
          onOpenTaskModal: function() {
            L(!0);
          },
          savedSpiralName: oe,
          onSaveToLibrary: Le
        }
      )
    ] }),
    U ? /* @__PURE__ */ i.jsx(
      Bb,
      {
        onClose: function() {
          L(!1);
        },
        onSent: function() {
          L(!1), s();
        }
      }
    ) : null
  ] });
}
const Vb = "_heading_iikbv_1", Kb = "_row_iikbv_11", Jb = "_meta_iikbv_45", kb = "_actions_iikbv_55", $b = "_renameRow_iikbv_67", Ju = {
  heading: Vb,
  row: Kb,
  meta: Jb,
  actions: kb,
  renameRow: $b
};
function Fb({ savedSpirals: s, status: r, error: d, onReload: o, onLoad: v, onRename: h, onDelete: j }) {
  var [A, N] = E.useState(null), [D, b] = E.useState("");
  function y(R) {
    N(R.id), b(R.name);
  }
  function z(R) {
    var U = D.trim();
    U && h(R, U), N(null);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ju.heading, children: "Saved Spirals" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading saved spirals..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load saved spirals: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No saved spirals yet", hint: "Save one from inside the generator." }) : null,
    r === "ready" ? s.map(function(R) {
      return /* @__PURE__ */ i.jsx("div", { className: Ju.row, children: A === R.id ? /* @__PURE__ */ i.jsxs("div", { className: Ju.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            value: D,
            onChange: function(U) {
              b(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          z(R);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          N(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: R.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Ju.meta, children: [
            "Updated ",
            new Date(R.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ju.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(R);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            y(R);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
            j(R.id);
          }, children: "Delete" })
        ] })
      ] }) }, R.id);
    }) : null
  ] });
}
function Wb(s, r) {
  return s.name.localeCompare(r.name);
}
function Ib() {
  var s = ye(), r = la({
    table: "saved_cost_tracker_presets",
    masterUsername: s.activeMasterContext,
    sort: Wb
  }), d = E.useCallback(
    async function(v) {
      var h = await window.saveCostTrackerPreset(v);
      return r.reload(), h;
    },
    [r]
  ), o = E.useCallback(
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
const Pb = "_heading_1ynjy_1", ex = "_row_1ynjy_11", tx = "_selectGroup_1ynjy_31", ax = "_selectLabel_1ynjy_45", lx = "_select_1ynjy_31", nx = "_fieldset_1ynjy_75", ux = "_checkboxRow_1ynjy_89", ix = "_hint_1ynjy_105", sx = "_penaltyForm_1ynjy_117", cx = "_penaltyList_1ynjy_141", rx = "_removePenalty_1ynjy_157", yt = {
  heading: Pb,
  row: ex,
  selectGroup: tx,
  selectLabel: ax,
  select: lx,
  fieldset: nx,
  checkboxRow: ux,
  hint: ix,
  penaltyForm: sx,
  penaltyList: cx,
  removePenalty: rx
};
function ox({ onStart: s, onSavePreset: r, presetToApply: d }) {
  var o = ye(), v = Gn(), [h, j] = E.useState("Cost Tracker Running"), [A, N] = E.useState(50), [D, b] = E.useState("€"), [y, z] = E.useState(6e4), [R, U] = E.useState([]), [L, q] = E.useState(!1), [J, oe] = E.useState([]), [V, xe] = E.useState(""), [Ge, ee] = E.useState(""), [I, ne] = E.useState("");
  function ke(te) {
    U(function(We) {
      return We.includes(te) ? We.filter(function(Le) {
        return Le !== te;
      }) : We.concat(te);
    });
  }
  if (E.useEffect(
    function() {
      d && (j(d.description || "Cost Tracker Running"), N(d.rate), b(d.currency), z(d.increment_interval));
    },
    [d]
  ), !window.hasPermission("create_task")) return null;
  function Fe() {
    oe(function(te) {
      return te.concat({
        description: V.trim(),
        amount: Number(Ge)
      });
    }), xe(""), ee("");
  }
  function De(te) {
    oe(function(We) {
      return We.filter(function(Le, Q) {
        return Q !== te;
      });
    });
  }
  async function Xe(te) {
    te.preventDefault(), q(!0);
    try {
      I.trim() && r && await r({
        id: d ? d.id : void 0,
        name: I.trim(),
        description: h,
        rate: Number(A) || 0,
        currency: D,
        incrementInterval: Number(y)
      }), await s(h, Number(A) || 0, D, Number(y), J, R), oe([]), ne(""), U([]);
    } finally {
      q(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: yt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: yt.form, onSubmit: Xe, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          value: h,
          onChange: function(te) {
            j(te.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: yt.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: A,
            onChange: function(te) {
              N(te.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: yt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: yt.selectLabel, children: "Currency" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: yt.select,
              value: D,
              onChange: function(te) {
                b(te.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "€", children: "Euro (€)" }),
                /* @__PURE__ */ i.jsx("option", { value: "£", children: "Pound (£)" }),
                /* @__PURE__ */ i.jsx("option", { value: "$", children: "Dollar ($)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: yt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: yt.selectLabel, children: "Per" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: yt.select,
              value: y,
              onChange: function(te) {
                z(te.target.value);
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
      /* @__PURE__ */ i.jsxs("div", { className: yt.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Penalty description",
            value: V,
            onChange: function(te) {
              xe(te.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: Ge,
            onChange: function(te) {
              ee(te.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            type: "button",
            variant: "secondary",
            disabled: !V.trim() || !Ge,
            onClick: Fe,
            children: "Add penalty"
          }
        )
      ] }),
      J.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: yt.penaltyList, children: J.map(function(te, We) {
        return /* @__PURE__ */ i.jsxs("li", { children: [
          te.description,
          ": ",
          D,
          te.amount.toFixed(2),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: yt.removePenalty,
              onClick: function() {
                De(We);
              },
              "aria-label": "Remove staged penalty " + te.description,
              children: "×"
            }
          )
        ] }, We);
      }) }) : null,
      /* @__PURE__ */ i.jsxs("fieldset", { className: yt.fieldset, children: [
        /* @__PURE__ */ i.jsxs("legend", { children: [
          "Assign to ",
          o.groupTerms.slaveLabelPlural
        ] }),
        v.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: yt.hint, children: [
          "No ",
          o.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : v.slaves.map(function(te) {
          return /* @__PURE__ */ i.jsxs("label", { className: yt.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: R.includes(te.username),
                onChange: function() {
                  ke(te.username);
                }
              }
            ),
            te.displayName
          ] }, te.username);
        })
      ] }),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Save as preset (optional)",
          placeholder: "Name this config to reuse it later",
          value: I,
          onChange: function(te) {
            ne(te.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: L, disabled: R.length === 0, children: "Start tracker" })
    ] })
  ] });
}
const fx = "_heading_girf2_1", dx = "_row_girf2_11", vx = "_meta_girf2_45", mx = "_actions_girf2_55", Us = {
  heading: fx,
  row: dx,
  meta: vx,
  actions: mx
};
function hx({ presets: s, status: r, error: d, onReload: o, onUse: v, onDelete: h }) {
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Us.heading, children: "Saved Presets" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading presets..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load presets: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No saved presets yet", hint: "Save one while starting a tracker below." }) : null,
    r === "ready" ? s.map(function(j) {
      return /* @__PURE__ */ i.jsxs("div", { className: Us.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: j.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Us.meta, children: [
            j.currency,
            Number(j.rate).toFixed(2),
            " per",
            " ",
            j.increment_interval === 1e3 ? "second" : j.increment_interval === 36e5 ? "hour" : "minute",
            j.description ? " · " + j.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Us.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(j);
          }, children: "Use" }),
          /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
            h(j.id);
          }, children: "Delete" })
        ] })
      ] }, j.id);
    }) : null
  ] });
}
const gx = "_heading_1k7pj_1", yx = "_row_1k7pj_11", px = "_meta_1k7pj_45", Ro = {
  heading: gx,
  row: yx,
  meta: px
};
function _x(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function Sx({ trackers: s, onDelete: r }) {
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ro.heading, children: "Recently Stopped" }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No stopped trackers yet" }) : s.map(function(d) {
      return /* @__PURE__ */ i.jsxs("div", { className: Ro.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: d.description }),
          /* @__PURE__ */ i.jsxs("div", { className: Ro.meta, children: [
            d.currency,
            Number(d.rate).toFixed(2),
            " per ",
            _x(Number(d.increment_interval)),
            " · stopped " + new Date(d.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          r(d.id);
        }, children: "Delete" })
      ] }, d.id);
    })
  ] });
}
const bx = "_heading_lmzbq_1", xx = {
  heading: bx
};
function jx() {
  var s = Oo(), r = Ib(), [d, o] = E.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      ox,
      {
        onStart: s.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      hx,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: xx.heading, children: "Active Cost Trackers" }),
    s.trackers.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No active cost trackers" }) : s.trackers.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        Hs,
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
      Sx,
      {
        trackers: s.stoppedTrackers,
        onDelete: s.deleteTracker
      }
    )
  ] });
}
const Tx = "_section_1o04b_1", Nx = "_sectionHeader_1o04b_9", wx = "_heading_1o04b_27", ku = {
  section: Tx,
  sectionHeader: Nx,
  heading: wx
};
function Ex() {
  var s = Mh(), [r, d] = E.useState(!1), [o, v] = E.useState(null), [h, j] = E.useState(null), [A, N] = E.useState("");
  function D() {
    v(null), j(null), N(""), d(!0);
  }
  function b(R) {
    v(R.config), j(R.id), N(R.name), d(!0);
  }
  function y() {
    d(!1), s.reload();
  }
  function z(R, U) {
    s.saveSpiral({ id: R.id, name: U, config: R.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { className: ku.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: ku.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: ku.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(G, { onClick: D, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        Fb,
        {
          savedSpirals: s.savedSpirals,
          status: s.status,
          error: s.error,
          onReload: s.reload,
          onLoad: b,
          onRename: z,
          onDelete: s.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: ku.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: ku.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(jx, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      Zb,
      {
        onClose: y,
        initialConfig: o,
        initialSavedId: h,
        initialName: A
      }
    ) : null
  ] });
}
const Ax = "_card_s0ykj_1", Cx = "_header_s0ykj_19", zx = "_name_s0ykj_33", Dx = "_onlineDot_s0ykj_41", Rx = "_offlineDot_s0ykj_43", Mx = "_status_s0ykj_75", Ox = "_points_s0ykj_93", Ux = "_negative_s0ykj_105", Hx = "_zero_s0ykj_113", Lx = "_positive_s0ykj_121", qx = "_metaRow_s0ykj_129", Bx = "_pendingBadge_s0ykj_145", Yx = "_trackerBadge_s0ykj_163", Ht = {
  card: Ax,
  header: Cx,
  name: zx,
  onlineDot: Dx,
  offlineDot: Rx,
  status: Mx,
  points: Ox,
  negative: Ux,
  zero: Hx,
  positive: Lx,
  metaRow: qx,
  pendingBadge: Bx,
  trackerBadge: Yx
};
function Gx(s) {
  return s < 0 ? Ht.negative : s === 0 ? Ht.zero : Ht.positive;
}
function Qx({
  slave: s,
  online: r,
  tracker: d,
  pendingCount: o,
  completionRate: v,
  onClick: h
}) {
  return /* @__PURE__ */ i.jsxs(
    ge,
    {
      className: Ht.card,
      onClick: h,
      role: "button",
      tabIndex: 0,
      onKeyDown: function(j) {
        (j.key === "Enter" || j.key === " ") && h();
      },
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: Ht.header, children: [
          /* @__PURE__ */ i.jsx("span", { className: Ht.name, children: s.displayName }),
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: r ? Ht.onlineDot : Ht.offlineDot,
              title: r ? "Online" : "Offline"
            }
          )
        ] }),
        s.statusMessage ? /* @__PURE__ */ i.jsx("div", { className: Ht.status, children: s.statusMessage }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: [Ht.points, Gx(s.points)].join(" "), children: [
          s.points,
          " pts"
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ht.metaRow, children: [
          /* @__PURE__ */ i.jsxs("span", { children: [
            v,
            "% complete"
          ] }),
          o > 0 ? /* @__PURE__ */ i.jsxs("span", { className: Ht.pendingBadge, children: [
            o,
            " pending"
          ] }) : null
        ] }),
        d ? /* @__PURE__ */ i.jsx("div", { className: Ht.trackerBadge, children: "💰 Tracker running" }) : null
      ]
    }
  );
}
const Xx = "_section_11wsb_1", Zx = "_heading_11wsb_9", Vx = "_list_11wsb_19", Kx = "_listItem_11wsb_37", Jx = "_status_11wsb_59", aa = {
  section: Xx,
  heading: Zx,
  list: Vx,
  listItem: Kx,
  status: Jx
};
function kx({
  slave: s,
  tasks: r,
  suggestions: d,
  tracker: o,
  onClose: v
}) {
  var h = r.filter(function(N) {
    return N.status === "todo" || N.status === "pending_approval";
  }), j = r.filter(function(N) {
    return N.status === "completed";
  }), A = d.filter(function(N) {
    return N.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs(Fu, { title: s.displayName, onClose: v, children: [
    o ? /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Active Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Hs, { tracker: o, isAdmin: !1 })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsxs("h4", { className: aa.heading, children: [
        "Tasks (",
        j.length,
        "/",
        r.length,
        " completed)"
      ] }),
      h.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending tasks" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: h.map(function(N) {
        return /* @__PURE__ */ i.jsxs("li", { className: aa.listItem, children: [
          N.text.split(`
`)[0],
          /* @__PURE__ */ i.jsx("span", { className: aa.status, children: N.status })
        ] }, N.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Pending Suggestions" }),
      A.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending suggestions" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: A.map(function(N) {
        return /* @__PURE__ */ i.jsx("li", { className: aa.listItem, children: N.description }, N.id);
      }) })
    ] })
  ] });
}
const $x = "_section_10rik_1", Fx = "_heading_10rik_9", Wx = "_grid_10rik_19", Ix = "_invoiceList_10rik_31", Px = "_invoiceItem_10rik_49", hl = {
  section: $x,
  heading: Fx,
  grid: Wx,
  invoiceList: Ix,
  invoiceItem: Px
};
function ej() {
  var s = ye(), r = Gn(), d = Oo(), o = Ls(), v = Dh(), h = zh(), [j, A] = E.useState(null), N = o.tasks.filter(function(U) {
    return U.type === "cost-tracker" && U.status === "pending_approval";
  });
  function D(U) {
    var L = h.activity.find(function(q) {
      return q.user === U;
    });
    return !!(L && L.action === "login");
  }
  function b(U) {
    var L = o.tasks.filter(function(J) {
      return J.assignedTo === U && J.type !== "demerit";
    });
    if (L.length === 0) return 0;
    var q = L.filter(function(J) {
      return J.status === "completed";
    });
    return Math.round(q.length / L.length * 100);
  }
  function y(U) {
    var L = v.suggestions.filter(function(J) {
      return J.suggestedBy === U && J.status === "pending";
    }).length, q = o.tasks.filter(function(J) {
      return J.assignedTo === U && J.appealStatus === "pending";
    }).length;
    return L + q;
  }
  function z(U) {
    return d.trackers.find(function(L) {
      return Array.isArray(L.assigned_to) && L.assigned_to.includes(U);
    });
  }
  var R = j ? r.slaves.find(function(U) {
    return U.username === j;
  }) : null;
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { className: hl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: hl.heading, children: "Active Cost Trackers" }),
      d.trackers.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No active cost trackers" }) : d.trackers.map(function(U) {
        return /* @__PURE__ */ i.jsx(
          Hs,
          {
            tracker: U,
            isAdmin: !0,
            onStop: d.stopTracker,
            onDelete: d.deleteTracker,
            onAddPenalty: d.addPenalty,
            onRemovePenalty: d.removePenalty
          },
          U.id
        );
      })
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: hl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: hl.heading, children: "Invoices Awaiting Approval" }),
      N.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No invoices awaiting approval" }) : /* @__PURE__ */ i.jsx("ul", { className: hl.invoiceList, children: N.map(function(U) {
        return /* @__PURE__ */ i.jsxs("li", { className: hl.invoiceItem, children: [
          /* @__PURE__ */ i.jsx("span", { children: U.text.split(`
`)[0] }),
          /* @__PURE__ */ i.jsx(
            G,
            {
              onClick: function() {
                o.approveInvoice(U.id);
              },
              children: "Approve"
            }
          )
        ] }, U.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsx("h2", { className: hl.heading, children: s.groupTerms.slaveLabelPlural }),
    r.slaves.length === 0 ? /* @__PURE__ */ i.jsx(
      He,
      {
        title: "No " + s.groupTerms.slaveLabelPlural + " added yet"
      }
    ) : /* @__PURE__ */ i.jsx("div", { className: hl.grid, children: r.slaves.map(function(U) {
      return /* @__PURE__ */ i.jsx(
        Qx,
        {
          slave: U,
          online: D(U.username),
          tracker: z(U.username),
          pendingCount: y(U.username),
          completionRate: b(U.username),
          onClick: function() {
            A(U.username);
          }
        },
        U.username
      );
    }) }),
    R ? /* @__PURE__ */ i.jsx(
      kx,
      {
        slave: R,
        tasks: o.tasks.filter(function(U) {
          return U.assignedTo === R.username;
        }),
        suggestions: v.suggestions.filter(function(U) {
          return U.suggestedBy === R.username;
        }),
        tracker: z(R.username),
        onClose: function() {
          A(null);
        }
      }
    ) : null
  ] });
}
function tj({ activeTab: s }) {
  var r = ye();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(g1, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(x1, {});
    case "overview":
      return r.isMaster ? /* @__PURE__ */ i.jsx(ej, {}) : null;
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(P1, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Ex, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(r_, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(J_, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(eb, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(mS, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(YS, {}) : null;
    default:
      return null;
  }
}
function aj() {
  var s = ye(), [r, d] = E.useState("tasks"), o = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", "data-theme": s.themeMode, style: o, children: [
    /* @__PURE__ */ i.jsx(Mp, {}),
    /* @__PURE__ */ i.jsx(Lp, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsx("main", { className: "betaContainer", children: /* @__PURE__ */ i.jsx(tj, { activeTab: r }) })
  ] });
}
function lj() {
  return /* @__PURE__ */ i.jsx(G0, { children: /* @__PURE__ */ i.jsx(aj, {}) });
}
var Yn = null;
function nj(s) {
  Yn || (Yn = Y0.createRoot(s), Yn.render(/* @__PURE__ */ i.jsx(lj, {})));
}
function uj() {
  Yn && (Yn.unmount(), Yn = null);
}
export {
  nj as mountBetaApp,
  uj as unmountBetaApp
};
