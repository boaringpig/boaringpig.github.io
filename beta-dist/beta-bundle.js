var _o = { exports: {} }, Hu = {};
var uh;
function z0() {
  if (uh) return Hu;
  uh = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, h) {
    var x = null;
    if (h !== void 0 && (x = "" + h), v.key !== void 0 && (x = "" + v.key), "key" in v) {
      h = {};
      for (var C in v)
        C !== "key" && (h[C] = v[C]);
    } else h = v;
    return v = h.ref, {
      $$typeof: c,
      type: o,
      key: x,
      ref: v !== void 0 ? v : null,
      props: h
    };
  }
  return Hu.Fragment = r, Hu.jsx = d, Hu.jsxs = d, Hu;
}
var ih;
function D0() {
  return ih || (ih = 1, _o.exports = z0()), _o.exports;
}
var i = D0(), So = { exports: {} }, Lu = {}, bo = { exports: {} }, xo = {};
var ch;
function R0() {
  return ch || (ch = 1, function(c) {
    function r(G, B) {
      var X = G.length;
      G.push(B);
      e: for (; 0 < X; ) {
        var ce = X - 1 >>> 1, he = G[ce];
        if (0 < v(he, B))
          G[ce] = B, G[X] = he, X = ce;
        else break e;
      }
    }
    function d(G) {
      return G.length === 0 ? null : G[0];
    }
    function o(G) {
      if (G.length === 0) return null;
      var B = G[0], X = G.pop();
      if (X !== B) {
        G[0] = X;
        e: for (var ce = 0, he = G.length, ot = he >>> 1; ce < ot; ) {
          var Sa = 2 * (ce + 1) - 1, hl = G[Sa], p = Sa + 1, H = G[p];
          if (0 > v(hl, X))
            p < he && 0 > v(H, hl) ? (G[ce] = H, G[p] = X, ce = p) : (G[ce] = hl, G[Sa] = X, ce = Sa);
          else if (p < he && 0 > v(H, X))
            G[ce] = H, G[p] = X, ce = p;
          else break e;
        }
      }
      return B;
    }
    function v(G, B) {
      var X = G.sortIndex - B.sortIndex;
      return X !== 0 ? X : G.id - B.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      c.unstable_now = function() {
        return h.now();
      };
    } else {
      var x = Date, C = x.now();
      c.unstable_now = function() {
        return x.now() - C;
      };
    }
    var N = [], D = [], w = 1, y = null, z = 3, O = !1, U = !1, L = !1, q = !1, J = typeof setTimeout == "function" ? setTimeout : null, oe = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function xe(G) {
      for (var B = d(D); B !== null; ) {
        if (B.callback === null) o(D);
        else if (B.startTime <= G)
          o(D), B.sortIndex = B.expirationTime, r(N, B);
        else break;
        B = d(D);
      }
    }
    function Ge(G) {
      if (L = !1, xe(G), !U)
        if (d(N) !== null)
          U = !0, ee || (ee = !0, Xe());
        else {
          var B = d(D);
          B !== null && He(Ge, B.startTime - G);
        }
    }
    var ee = !1, I = -1, ne = 5, ke = -1;
    function Fe() {
      return q ? !0 : !(c.unstable_now() - ke < ne);
    }
    function De() {
      if (q = !1, ee) {
        var G = c.unstable_now();
        ke = G;
        var B = !0;
        try {
          e: {
            U = !1, L && (L = !1, oe(I), I = -1), O = !0;
            var X = z;
            try {
              t: {
                for (xe(G), y = d(N); y !== null && !(y.expirationTime > G && Fe()); ) {
                  var ce = y.callback;
                  if (typeof ce == "function") {
                    y.callback = null, z = y.priorityLevel;
                    var he = ce(
                      y.expirationTime <= G
                    );
                    if (G = c.unstable_now(), typeof he == "function") {
                      y.callback = he, xe(G), B = !0;
                      break t;
                    }
                    y === d(N) && o(N), xe(G);
                  } else o(N);
                  y = d(N);
                }
                if (y !== null) B = !0;
                else {
                  var ot = d(D);
                  ot !== null && He(
                    Ge,
                    ot.startTime - G
                  ), B = !1;
                }
              }
              break e;
            } finally {
              y = null, z = X, O = !1;
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
    function He(G, B) {
      I = J(function() {
        G(c.unstable_now());
      }, B);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, c.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ne = 0 < G ? Math.floor(1e3 / G) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, c.unstable_next = function(G) {
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
        return G();
      } finally {
        z = X;
      }
    }, c.unstable_requestPaint = function() {
      q = !0;
    }, c.unstable_runWithPriority = function(G, B) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var X = z;
      z = G;
      try {
        return B();
      } finally {
        z = X;
      }
    }, c.unstable_scheduleCallback = function(G, B, X) {
      var ce = c.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? ce + X : ce) : X = ce, G) {
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
      return he = X + he, G = {
        id: w++,
        callback: B,
        priorityLevel: G,
        startTime: X,
        expirationTime: he,
        sortIndex: -1
      }, X > ce ? (G.sortIndex = X, r(D, G), d(N) === null && G === d(D) && (L ? (oe(I), I = -1) : L = !0, He(Ge, X - ce))) : (G.sortIndex = he, r(N, G), U || O || (U = !0, ee || (ee = !0, Xe()))), G;
    }, c.unstable_shouldYield = Fe, c.unstable_wrapCallback = function(G) {
      var B = z;
      return function() {
        var X = z;
        z = B;
        try {
          return G.apply(this, arguments);
        } finally {
          z = X;
        }
      };
    };
  }(xo)), xo;
}
var sh;
function M0() {
  return sh || (sh = 1, bo.exports = R0()), bo.exports;
}
var jo = { exports: {} }, le = {};
var rh;
function O0() {
  if (rh) return le;
  rh = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), x = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), N = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), z = Symbol.for("react.view_transition"), O = Symbol.iterator;
  function U(p) {
    return p === null || typeof p != "object" ? null : (p = O && p[O] || p["@@iterator"], typeof p == "function" ? p : null);
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
      $$typeof: c,
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
    return typeof p == "object" && p !== null && p.$$typeof === c;
  }
  function te(p) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(F) {
      return H[F];
    });
  }
  var We = /\/+/g;
  function He(p, H) {
    return typeof p == "object" && p !== null && p.key != null ? te("" + p.key) : H.toString(36);
  }
  function G(p) {
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
            case c:
            case r:
              je = !0;
              break;
            case w:
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
      return _e = _e(p), je = W === "" ? "." + He(p, 0) : W, ee(_e) ? (F = "", je != null && (F = je.replace(We, "$&/") + "/"), B(_e, H, F, "", function(ba) {
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
        W = p[ae], Se = k + He(W, ae), je += B(
          W,
          H,
          F,
          Se,
          _e
        );
    else if (ae = U(p), typeof ae == "function")
      for (p = ae.call(p), ae = 0; !(W = p.next()).done; )
        W = W.value, Se = k + He(W, ae++), je += B(
          W,
          H,
          F,
          Se,
          _e
        );
    else if (Se === "object") {
      if (typeof p.then == "function")
        return B(
          G(p),
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
  var hl = {
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
  return le.Activity = y, le.Children = hl, le.Component = oe, le.Fragment = d, le.Profiler = v, le.PureComponent = xe, le.StrictMode = o, le.Suspense = N, le.ViewTransition = z, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, le.__COMPILER_RUNTIME = {
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
      $$typeof: x,
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
    return { $$typeof: C, render: p };
  }, le.isValidElement = Xe, le.lazy = function(p) {
    return {
      $$typeof: w,
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
var oh;
function Ro() {
  return oh || (oh = 1, jo.exports = O0()), jo.exports;
}
var To = { exports: {} }, rt = {};
var fh;
function U0() {
  if (fh) return rt;
  fh = 1;
  var c = Ro();
  function r(w) {
    var y = "https://react.dev/errors/" + w;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var z = 2; z < arguments.length; z++)
        y += "&args[]=" + encodeURIComponent(arguments[z]);
    }
    return "Minified React error #" + w + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, v = Symbol.for("react.portal"), h = Symbol.for("react.recoverable"), x = Symbol.for("react.optimistic_key");
  function C(w, y, z) {
    var O = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: O == null ? null : O === x ? x : "" + O,
      children: w,
      containerInfo: y,
      implementation: z
    };
  }
  var N = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(w, y) {
    if (w === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, rt.browser = function(w) {
    return { $$typeof: h, _reason: w };
  }, rt.createPortal = function(w, y) {
    var z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(r(299));
    return C(w, y, null, z);
  }, rt.flushSync = function(w) {
    var y = N.T, z = o.p;
    try {
      if (N.T = null, o.p = 2, w) return w();
    } finally {
      N.T = y, o.p = z, o.d.f();
    }
  }, rt.preconnect = function(w, y) {
    typeof w == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, o.d.C(w, y));
  }, rt.prefetchDNS = function(w) {
    typeof w == "string" && o.d.D(w);
  }, rt.preinit = function(w, y) {
    if (typeof w == "string" && y && typeof y.as == "string") {
      var z = y.as, O = D(z, y.crossOrigin), U = typeof y.integrity == "string" ? y.integrity : void 0, L = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      z === "style" ? o.d.S(
        w,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: O,
          integrity: U,
          fetchPriority: L
        }
      ) : z === "script" && o.d.X(w, {
        crossOrigin: O,
        integrity: U,
        fetchPriority: L,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, rt.preinitModule = function(w, y) {
    if (typeof w == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var z = D(
            y.as,
            y.crossOrigin
          );
          o.d.M(w, {
            crossOrigin: z,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
          });
        }
      } else y == null && o.d.M(w);
  }, rt.preload = function(w, y) {
    if (typeof w == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var z = y.as, O = D(z, y.crossOrigin);
      o.d.L(w, z, {
        crossOrigin: O,
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
  }, rt.preloadModule = function(w, y) {
    if (typeof w == "string")
      if (y) {
        var z = D(y.as, y.crossOrigin);
        o.d.m(w, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: z,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
        });
      } else o.d.m(w);
  }, rt.requestFormReset = function(w) {
    o.d.r(w);
  }, rt.unstable_batchedUpdates = function(w, y) {
    return w(y);
  }, rt.useFormState = function(w, y, z) {
    return N.H.useFormState(w, y, z);
  }, rt.useFormStatus = function() {
    return N.H.useHostTransitionStatus();
  }, rt.version = "19.3.1", rt;
}
var dh;
function H0() {
  if (dh) return To.exports;
  dh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), To.exports = U0(), To.exports;
}
var vh;
function L0() {
  if (vh) return Lu;
  vh = 1;
  var c = M0(), r = Ro(), d = H0();
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
  function x(e) {
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
        for (var s = !1, f = n.child; f; ) {
          if (f === a) {
            s = !0, a = n, l = u;
            break;
          }
          if (f === l) {
            s = !0, l = n, a = u;
            break;
          }
          f = f.sibling;
        }
        if (!s) {
          for (f = u.child; f; ) {
            if (f === a) {
              s = !0, a = u, l = n;
              break;
            }
            if (f === l) {
              s = !0, l = u, a = n;
              break;
            }
            f = f.sibling;
          }
          if (!s) throw Error(o(189));
        }
      }
      if (a.alternate !== l) throw Error(o(190));
    }
    if (a.tag !== 3) throw Error(o(188));
    return a.stateNode.current === a ? e : t;
  }
  function w(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = w(e), t !== null) return t;
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
  function O(e) {
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
  var I = Object.assign, ne = Symbol.for("react.element"), ke = Symbol.for("react.transitional.element"), Fe = Symbol.for("react.portal"), De = Symbol.for("react.fragment"), Xe = Symbol.for("react.strict_mode"), te = Symbol.for("react.profiler"), We = Symbol.for("react.consumer"), He = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), Sa = Symbol.for("react.legacy_hidden"), hl = Symbol.for("react.memo_cache_sentinel"), p = Symbol.for("react.view_transition"), H = Symbol.for("react.recoverable"), F = Symbol.iterator;
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
        case He:
          return e.displayName || "Context";
        case We:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
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
  }, Lc = [], Yl = -1;
  function ua(e) {
    return { current: e };
  }
  function at(e) {
    0 > Yl || (e.current = Lc[Yl], Lc[Yl] = null, Yl--);
  }
  function Re(e, t) {
    Yl++, Lc[Yl] = e.current, e.current = t;
  }
  var ia = ua(null), Qn = ua(null), qa = ua(null), Wu = ua(null);
  function Iu(e, t) {
    switch (Re(qa, t), Re(Qn, e), Re(ia, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? mm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = mm(t), e = hm(t, e);
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
  function Gl() {
    at(ia), at(Qn), at(qa);
  }
  function qc(e) {
    var t = e.memoizedState;
    t !== null && (Cn._currentValue = t.memoizedState, Re(Wu, e)), t = ia.current;
    var a = hm(t, e.type);
    t !== a && (Re(Qn, e), Re(ia, a));
  }
  function Pu(e) {
    Qn.current === e && (at(ia), at(Qn)), Wu.current === e && (at(Wu), Cn._currentValue = ba);
  }
  var Bc, Oo;
  function Ba(e) {
    if (Bc === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Bc = t && t[1] || "", Oo = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Bc + e + Oo;
  }
  var Yc = !1;
  function Gc(e, t) {
    if (!e || Yc) return "";
    Yc = !0;
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
                } catch (Y) {
                  var _ = Y;
                }
                Reflect.construct(e, [], M);
              } else {
                try {
                  M.call();
                } catch (Y) {
                  _ = Y;
                }
                M = !1;
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
                  }), M = !0, new e();
                } finally {
                  M && (T !== void 0 ? Object.defineProperty(e.prototype, "props", T) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                _ = Y;
              }
              (M = e()) && typeof M.catch == "function" && M.catch(function() {
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
      var u = l.DetermineComponentFrameRoot(), s = u[0], f = u[1];
      if (s && f) {
        var m = s.split(`
`), b = f.split(`
`);
        for (n = l = 0; l < m.length && !m[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === m.length || n === b.length)
          for (l = m.length - 1, n = b.length - 1; 1 <= l && 0 <= n && m[l] !== b[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (m[l] !== b[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || m[l] !== b[n]) {
                  var E = `
` + m[l].replace(" at new ", " at ");
                  return e.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", e.displayName)), E;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Yc = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ba(a) : "";
  }
  function Oh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ba(e.type);
      case 16:
        return Ba("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ba("Suspense Fallback") : Ba("Suspense");
      case 19:
        return Ba("SuspenseList");
      case 0:
      case 15:
        return Gc(e.type, !1);
      case 11:
        return Gc(e.type.render, !1);
      case 1:
        return Gc(e.type, !0);
      case 31:
        return Ba("Activity");
      case 30:
        return Ba("ViewTransition");
      default:
        return "";
    }
  }
  function Uo(e) {
    try {
      var t = "", a = null;
      do
        t += Oh(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Qc = Object.prototype.hasOwnProperty, Xc = c.unstable_scheduleCallback, Zc = c.unstable_cancelCallback, Uh = c.unstable_shouldYield, Hh = c.unstable_requestPaint, wt = c.unstable_now, Lh = c.unstable_getCurrentPriorityLevel, Ho = c.unstable_ImmediatePriority, Lo = c.unstable_UserBlockingPriority, ei = c.unstable_NormalPriority, qh = c.unstable_LowPriority, qo = c.unstable_IdlePriority, Bh = c.log, Yh = c.unstable_setDisableYieldValue, Xn = null, Et = null;
  function Ya(e) {
    if (typeof Bh == "function" && Yh(e), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(Xn, e);
      } catch {
      }
  }
  var At = Math.clz32 ? Math.clz32 : Xh, Gh = Math.log, Qh = Math.LN2;
  function Xh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Gh(e) / Qh | 0) | 0;
  }
  var ti = 256, ai = 262144, li = 4194304;
  function gl(e) {
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
    var n = 0, u = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = gl(l) : (s &= f, s !== 0 ? n = gl(s) : a || (a = f & ~e, a !== 0 && (n = gl(a))))) : (f = l & ~u, f !== 0 ? n = gl(f) : s !== 0 ? n = gl(s) : a || (a = l & ~e, a !== 0 && (n = gl(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Zn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Bo(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - At(a), n = 1 << l;
        t |= e[l], a &= ~n;
      }
    return t;
  }
  function Zh(e, t) {
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
  function Yo() {
    var e = li;
    return li <<= 1, (li & 62914560) === 0 && (li = 4194304), e;
  }
  function Vc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Vn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Vh(e, t, a, l, n, u) {
    var s = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, m = e.expirationTimes, b = e.hiddenUpdates;
    for (a = s & ~a; 0 < a; ) {
      var E = 31 - At(a), M = 1 << E;
      f[E] = 0, m[E] = -1;
      var _ = b[E];
      if (_ !== null)
        for (b[E] = null, E = 0; E < _.length; E++) {
          var T = _[E];
          T !== null && (T.lane &= -536870913);
        }
      a &= ~M;
    }
    l !== 0 && Go(e, l, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(s & ~t));
  }
  function Go(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - At(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Qo(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - At(a), n = 1 << l;
      n & t | e[l] & t && (e[l] |= t), a &= ~n;
    }
  }
  function Xo(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Kc(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Kc(e) {
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
  function Jc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Zo() {
    var e = ae.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Im(e.type));
  }
  function Vo(e, t) {
    var a = ae.p;
    try {
      return ae.p = e, t();
    } finally {
      ae.p = a;
    }
  }
  var xa = Math.random().toString(36).slice(2), lt = "__reactFiber$" + xa, pt = "__reactProps$" + xa, Ql = "__reactContainer$" + xa, Ko = "__reactEvents$" + xa, Kh = "__reactListeners$" + xa, Jh = "__reactHandles$" + xa, Jo = "__reactResources$" + xa, Kn = "__reactMarker$" + xa, ui = "__reactLoad$" + xa;
  function ii(e) {
    delete e[lt], delete e[pt], delete e[Kh], delete e[Jh];
  }
  function yl(e) {
    var t;
    if (t = e[lt]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Ql] || a[lt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Rm(e); e !== null; ) {
            if (a = e[lt]) return a;
            e = Rm(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Xl(e) {
    if (e = e[lt] || e[Ql]) {
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
  function Zl(e) {
    var t = e[Jo];
    return t || (t = e[Jo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ie(e) {
    e[Kn] = !0;
  }
  function ko(e) {
    e[ui] = void 0;
  }
  var $o = /* @__PURE__ */ new Set(), Fo = {};
  function pl(e, t) {
    Vl(e, t), Vl(e + "Capture", t);
  }
  function Vl(e, t) {
    for (Fo[e] = t, e = 0; e < t.length; e++)
      $o.add(t[e]);
  }
  var kh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Wo = {}, Io = {};
  function $h(e) {
    return Qc.call(Io, e) ? !0 : Qc.call(Wo, e) ? !1 : kh.test(e) ? Io[e] = !0 : (Wo[e] = !0, !1);
  }
  var be = !1;
  function Po() {
    var e = be;
    return be = !1, e;
  }
  function ci(e, t, a) {
    if ($h(t))
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
  function si(e, t, a) {
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
  function Ct(e) {
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
  function ef(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Fh(e, t, a) {
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
        set: function(s) {
          a = "" + s, u.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(s) {
          a = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function kc(e) {
    if (!e._valueTracker) {
      var t = ef(e) ? "checked" : "value";
      e._valueTracker = Fh(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function tf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = ef(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  var Wh = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      Wh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function $c(e, t, a, l, n, u, s, f) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ct(t)) : e.value !== "" + Ct(t) && (e.value = "" + Ct(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? s === "number" && e.value == t ? Fc(e, Ct(e.value)) : Fc(e, Ct(t)) : a != null ? Fc(e, Ct(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + Ct(f) : e.removeAttribute("name");
  }
  function af(e, t, a, l, n, u, s, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        kc(e);
        return;
      }
      a = a != null ? "" + Ct(a) : "", t = t != null ? "" + Ct(t) : a, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = f ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), kc(e);
  }
  function Fc(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function Kl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++)
        t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + Ct(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          e[n].selected = !0, l && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function lf(e, t, a) {
    if (t != null && (t = "" + Ct(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Ct(a) : "";
  }
  function nf(e, t, a, l) {
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
    a = Ct(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), kc(e);
  }
  function Jl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ih = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function uf(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Ih.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function cf(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", be = !0);
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (uf(e, n, l), be = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && uf(e, u, t[u]);
  }
  function Wc(e) {
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
  var Ph = /* @__PURE__ */ new Map([
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
  ]), eg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ri(e) {
    return eg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ca() {
  }
  var Ic = null;
  function Pc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var kl = null, $l = null;
  function sf(e) {
    var t = Xl(e);
    if (t && (e = t.stateNode)) {
      var a = e[pt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if ($c(
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
                $c(
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
              l = a[t], l.form === e.form && tf(l);
          }
          break e;
        case "textarea":
          lf(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Kl(e, !!a.multiple, t, !1);
      }
    }
  }
  var es = !1;
  function rf(e, t, a) {
    if (es) return e(t, a);
    es = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (es = !1, (kl !== null || $l !== null) && (rc(), kl && (t = kl, e = $l, $l = kl = null, sf(t), e)))
        for (t = 0; t < e.length; t++) sf(e[t]);
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
  var Ta = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ts = !1;
  if (Ta)
    try {
      var $n = {};
      Object.defineProperty($n, "passive", {
        get: function() {
          ts = !0;
        }
      }), window.addEventListener("test", $n, $n), window.removeEventListener("test", $n, $n);
    } catch {
      ts = !1;
    }
  var Ga = null, as = null, oi = null;
  function of() {
    if (oi) return oi;
    var e, t = as, a = t.length, l, n = "value" in Ga ? Ga.value : Ga.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var s = a - e;
    for (l = 1; l <= s && t[a - l] === n[u - l]; l++) ;
    return oi = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function fi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function di() {
    return !0;
  }
  function ff() {
    return !1;
  }
  function vt(e) {
    function t(a, l, n, u, s) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = s, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (a = e[f], this[f] = a ? a(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? di : ff, this.isPropagationStopped = ff, this;
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
  var Qa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vi = vt(Qa), Fn = I({}, Qa, { view: 0, detail: 0 }), tg = vt(Fn), ls, ns, Wn, mi = I({}, Fn, {
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
    getModifierState: is,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Wn && (Wn && e.type === "mousemove" ? (ls = e.screenX - Wn.screenX, ns = e.screenY - Wn.screenY) : ns = ls = 0, Wn = e), ls);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ns;
    }
  }), df = vt(mi), ag = I({}, mi, { dataTransfer: 0 }), lg = vt(ag), ng = I({}, Fn, { relatedTarget: 0 }), us = vt(ng), ug = I({}, Qa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ig = vt(ug), cg = I({}, Qa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), sg = vt(cg), rg = I({}, Qa, { data: 0 }), vf = vt(rg), og = {
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
  }, fg = {
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
  }, dg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = dg[e]) ? !!t[e] : !1;
  }
  function is() {
    return vg;
  }
  var mg = I({}, Fn, {
    key: function(e) {
      if (e.key) {
        var t = og[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = fi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: is,
    charCode: function(e) {
      return e.type === "keypress" ? fi(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? fi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hg = vt(mg), gg = I({}, mi, {
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
  }), mf = vt(gg), yg = I({}, Qa, { submitter: 0 }), pg = vt(yg), _g = I({}, Fn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: is
  }), Sg = vt(_g), bg = I({}, Qa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), xg = vt(bg), jg = I({}, mi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Tg = vt(jg), Ng = I({}, Qa, {
    newState: 0,
    oldState: 0,
    source: 0
  }), wg = vt(Ng), Eg = [9, 13, 27, 32], cs = Ta && "CompositionEvent" in window, In = null;
  Ta && "documentMode" in document && (In = document.documentMode);
  var Ag = Ta && "TextEvent" in window && !In, hf = Ta && (!cs || In && 8 < In && 11 >= In), gf = " ", yf = !1;
  function pf(e, t) {
    switch (e) {
      case "keyup":
        return Eg.indexOf(t.keyCode) !== -1;
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
  function _f(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Fl = !1;
  function Cg(e, t) {
    switch (e) {
      case "compositionend":
        return _f(t);
      case "keypress":
        return t.which !== 32 ? null : (yf = !0, gf);
      case "textInput":
        return e = t.data, e === gf && yf ? null : e;
      default:
        return null;
    }
  }
  function zg(e, t) {
    if (Fl)
      return e === "compositionend" || !cs && pf(e, t) ? (e = of(), oi = as = Ga = null, Fl = !1, e) : null;
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
        return hf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Dg = {
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
  function Sf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Dg[e.type] : t === "textarea";
  }
  function bf(e, t, a, l) {
    kl ? $l ? $l.push(l) : $l = [l] : kl = l, t = hc(t, "onChange"), 0 < t.length && (a = new vi(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var Pn = null, eu = null;
  function Rg(e) {
    sm(e, 0);
  }
  function hi(e) {
    var t = Jn(e);
    if (tf(t)) return e;
  }
  function xf(e, t) {
    if (e === "change") return t;
  }
  var jf = !1;
  if (Ta) {
    var ss;
    if (Ta) {
      var rs = "oninput" in document;
      if (!rs) {
        var Tf = document.createElement("div");
        Tf.setAttribute("oninput", "return;"), rs = typeof Tf.oninput == "function";
      }
      ss = rs;
    } else ss = !1;
    jf = ss && (!document.documentMode || 9 < document.documentMode);
  }
  function Nf() {
    Pn && (Pn.detachEvent("onpropertychange", wf), eu = Pn = null);
  }
  function wf(e) {
    if (e.propertyName === "value" && hi(eu)) {
      var t = [];
      bf(
        t,
        eu,
        e,
        Pc(e)
      ), rf(Rg, t);
    }
  }
  function Mg(e, t, a) {
    e === "focusin" ? (Nf(), Pn = t, eu = a, Pn.attachEvent("onpropertychange", wf)) : e === "focusout" && Nf();
  }
  function Og(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return hi(eu);
  }
  function Ug(e, t) {
    if (e === "click") return hi(t);
  }
  function Hg(e, t) {
    if (e === "input" || e === "change")
      return hi(t);
  }
  function Lg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var zt = typeof Object.is == "function" ? Object.is : Lg;
  function tu(e, t) {
    if (zt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Qc.call(t, n) || !zt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function os(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ef(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Af(e, t) {
    var a = Ef(e);
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
      a = Ef(a);
    }
  }
  function Cf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Cf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function zf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = os(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = os(e.document);
    }
    return t;
  }
  function fs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var qg = Ta && "documentMode" in document && 11 >= document.documentMode, Wl = null, ds = null, au = null, vs = !1;
  function Df(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    vs || Wl == null || Wl !== os(l) || (l = Wl, "selectionStart" in l && fs(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), au && tu(au, l) || (au = l, l = hc(ds, "onSelect"), 0 < l.length && (t = new vi(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Wl)));
  }
  function _l(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Il = {
    animationend: _l("Animation", "AnimationEnd"),
    animationiteration: _l("Animation", "AnimationIteration"),
    animationstart: _l("Animation", "AnimationStart"),
    transitionrun: _l("Transition", "TransitionRun"),
    transitionstart: _l("Transition", "TransitionStart"),
    transitioncancel: _l("Transition", "TransitionCancel"),
    transitionend: _l("Transition", "TransitionEnd")
  }, ms = {}, Rf = {};
  Ta && (Rf = document.createElement("div").style, "AnimationEvent" in window || (delete Il.animationend.animation, delete Il.animationiteration.animation, delete Il.animationstart.animation), "TransitionEvent" in window || delete Il.transitionend.transition);
  function Sl(e) {
    if (ms[e]) return ms[e];
    if (!Il[e]) return e;
    var t = Il[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Rf)
        return ms[e] = t[a];
    return e;
  }
  var Mf = Sl("animationend"), Of = Sl("animationiteration"), Uf = Sl("animationstart"), Bg = Sl("transitionrun"), Yg = Sl("transitionstart"), Gg = Sl("transitioncancel"), Hf = Sl("transitionend"), Lf = /* @__PURE__ */ new Map(), hs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  hs.push("scrollEnd");
  function Ft(e, t) {
    Lf.set(e, t), pl(t, [e]);
  }
  var Qg = 0;
  function Na(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = ea.identifierPrefix;
    var a = Qg++;
    return e = "_" + e + "t_" + a.toString(32) + "_", t.autoName = e;
  }
  function qf(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, a = _n;
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
    return e = qf(e), t = qf(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
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
  }, Bt = [], Pl = 0, gs = 0;
  function yi() {
    for (var e = Pl, t = gs = Pl = 0; t < e; ) {
      var a = Bt[t];
      Bt[t++] = null;
      var l = Bt[t];
      Bt[t++] = null;
      var n = Bt[t];
      Bt[t++] = null;
      var u = Bt[t];
      if (Bt[t++] = null, l !== null && n !== null) {
        var s = l.pending;
        s === null ? n.next = n : (n.next = s.next, s.next = n), l.pending = n;
      }
      u !== 0 && Bf(a, n, u);
    }
  }
  function pi(e, t, a, l) {
    Bt[Pl++] = e, Bt[Pl++] = t, Bt[Pl++] = a, Bt[Pl++] = l, gs |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function ys(e, t, a, l) {
    return pi(e, t, a, l), _i(e);
  }
  function bl(e, t) {
    return pi(e, null, null, t), _i(e);
  }
  function Bf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - At(a), e = u.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function _i(e) {
    if (50 < Tu)
      throw Tu = 0, sc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var en = {};
  function Xg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, a, l) {
    return new Xg(e, t, a, l);
  }
  function ps(e) {
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
  function Yf(e, t) {
    e.flags &= 1206910978;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Si(e, t, a, l, n, u) {
    var s = 0;
    if (l = e, typeof l == "function") ps(l) && (s = 1);
    else if (typeof l == "string")
      s = y0(
        e,
        a,
        ia.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ot:
          return e = _t(31, a, t, n), e.elementType = ot, e.lanes = u, e;
        case De:
          return xl(a.children, n, u, t);
        case Xe:
          s = 8, n |= 24;
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
              case He:
                s = 10;
                break e;
              case We:
                s = 9;
                break e;
              case G:
                s = 11;
                break e;
              case ce:
                s = 14;
                break e;
              case he:
                s = 16, l = null;
                break e;
            }
          s = 29, a = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = _t(s, a, t, n), t.elementType = e, t.type = l, t.lanes = u, t;
  }
  function xl(e, t, a, l) {
    return e = _t(7, e, l, t), e.lanes = a, e;
  }
  function _s(e, t, a) {
    return e = _t(6, e, null, t), e.lanes = a, e;
  }
  function Gf(e) {
    var t = _t(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ss(e, t, a) {
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
  var Qf = /* @__PURE__ */ new WeakMap();
  function Yt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Qf.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Uo(t)
      }, Qf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Uo(t)
    };
  }
  var tn = [], an = 0, bi = null, lu = 0, Gt = [], Qt = 0, Xa = null, sa = 1, ra = "";
  function Aa(e, t) {
    tn[an++] = lu, tn[an++] = bi, bi = e, lu = t;
  }
  function Xf(e, t, a) {
    Gt[Qt++] = sa, Gt[Qt++] = ra, Gt[Qt++] = Xa, Xa = e;
    var l = sa;
    e = ra;
    var n = 32 - At(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - At(t) + n;
    if (30 < u) {
      var s = n - n % 5;
      u = (l & (1 << s) - 1).toString(32), l >>= s, n -= s, sa = 1 << 32 - At(t) + n | a << n | l, ra = u + e;
    } else
      sa = 1 << u | a << n | l, ra = e;
  }
  function xi(e) {
    e.return !== null && (Aa(e, 1), Xf(e, 1, 0));
  }
  function bs(e) {
    for (; e === bi; )
      bi = tn[--an], tn[an] = null, lu = tn[--an], tn[an] = null;
    for (; e === Xa; )
      Xa = Gt[--Qt], Gt[Qt] = null, ra = Gt[--Qt], Gt[Qt] = null, sa = Gt[--Qt], Gt[Qt] = null;
  }
  function Zf(e, t) {
    Gt[Qt++] = sa, Gt[Qt++] = ra, Gt[Qt++] = Xa, sa = t.id, ra = t.overflow, Xa = e;
  }
  var Pe = null, Me = null, re = !1, Za = null, Xt = !1, xs = Error(o(519));
  function Va(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw nu(Yt(t, e)), xs;
  }
  function Vf(e) {
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
        de("invalid", t), af(
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
        de("invalid", t), nf(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || dm(t.textContent, a) ? (l.popover != null && (de("beforetoggle", t), de("toggle", t)), l.onScroll != null && de("scroll", t), l.onScrollEnd != null && de("scrollend", t), l.onClick != null && (t.onclick = ca), t = !0) : t = !1, t || Va(e, !0);
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
  function ln(e) {
    if (e !== Pe) return !1;
    if (!re) return ji(e), re = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Ir(e.type, e.memoizedProps)), a = !a), a && Me && Va(e), ji(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Me = Dm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Me = Dm(e);
    } else
      t === 27 ? (t = Me, cl(e.type) ? (e = co, co = null, Me = e) : Me = t) : Me = Pe ? Vt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function jl() {
    Me = Pe = null, re = !1;
  }
  function js() {
    var e = Za;
    return e !== null && (xt === null ? xt = e : xt.push.apply(
      xt,
      e
    ), Za = null), e;
  }
  function nu(e) {
    Za === null ? Za = [e] : Za.push(e);
  }
  var Ts = ua(null), Tl = null, Ca = null;
  function Ka(e, t, a) {
    Re(Ts, t._currentValue), t._currentValue = a;
  }
  function za(e) {
    e._currentValue = Ts.current, at(Ts);
  }
  function Ti(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function Ns(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var s = n.child;
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
              ), l || (s = null);
              break e;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (s = n.return, s === null) throw Error(o(341));
        s.lanes |= a, u = s.alternate, u !== null && (u.lanes |= a), Ti(s, a, e), s = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, s = n.alternate, s !== null && (s.lanes |= a), Ti(
          n.return,
          a,
          e
        ), s = n.child, s = s !== null ? s.sibling : null) : s = n.child;
      if (s !== null) s.return = n;
      else
        for (s = n; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          if (n = s.sibling, n !== null) {
            n.return = s.return, s = n;
            break;
          }
          s = s.return;
        }
      n = s;
    }
  }
  function Nl(e, t, a, l) {
    e = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var s = n.alternate;
        if (s === null) throw Error(o(387));
        if (s = s.memoizedProps, s !== null) {
          var f = n.type;
          zt(n.pendingProps.value, s.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === Wu.current) {
        if (s = n.alternate, s === null) throw Error(o(387));
        s.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Cn) : e = [Cn]);
      }
      n = n.return;
    }
    return e !== null && Ns(
      t,
      e,
      a,
      l
    ), t.flags |= 262144, e !== null;
  }
  function Ni(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!zt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function wl(e) {
    Tl = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return Kf(Tl, e);
  }
  function wi(e, t) {
    return Tl === null && wl(e), Kf(e, t);
  }
  function Kf(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Ca === null) {
      if (e === null) throw Error(o(308));
      Ca = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ca = Ca.next = t;
    return a;
  }
  var Zg = typeof AbortController < "u" ? AbortController : function() {
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
  }, Vg = c.unstable_scheduleCallback, Kg = c.unstable_NormalPriority, Ze = {
    $$typeof: He,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ws() {
    return {
      controller: new Zg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function uu(e) {
    e.refCount--, e.refCount === 0 && Vg(Kg, function() {
      e.controller.abort();
    });
  }
  function Jf(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var a = e.transitionTypes;
      for (a === null && (a = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        a.indexOf(l) === -1 && a.push(l);
      }
    }
  }
  var iu = null;
  function Jg(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var cu = null, Es = 0, El = 0, nn = null;
  function kg(e, t) {
    if (cu === null) {
      var a = cu = [];
      Es = 0, El = Xr(), nn = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Es++, t.then(kf, kf), t;
  }
  function kf() {
    if (--Es === 0 && (iu = null, cu !== null)) {
      nn !== null && (nn.status = "fulfilled");
      var e = cu;
      cu = null, El = 0, nn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function $g(e, t) {
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
  var $f = k.S;
  k.S = function(e, t) {
    if (Gv = wt(), typeof t == "object" && t !== null && typeof t.then == "function" && kg(e, t), iu !== null)
      for (var a = jn; a !== null; )
        Jf(a, iu), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = jn; l !== null; )
        Jf(l, a), l = l.next;
      if (El !== 0) {
        l = iu, l === null && (l = iu = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    $f !== null && $f(e, t);
  };
  var Al = ua(null);
  function As() {
    var e = Al.current;
    return e !== null ? e : ze.pooledCache;
  }
  function Ei(e, t) {
    t === null ? Re(Al, Al.current) : Re(Al, t.pool);
  }
  function Ff() {
    var e = As();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var un = Error(o(460)), Cs = Error(o(474)), Ai = Error(o(542)), Ci = { then: function() {
  } };
  function Wf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function If(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ca, ca), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ed(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(ca, ca);
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
            throw e = t.reason, ed(e), e;
        }
        throw zl = t, un;
    }
  }
  function Cl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (zl = a, un) : a;
    }
  }
  var zl = null;
  function Pf() {
    if (zl === null) throw Error(o(459));
    var e = zl;
    return zl = null, e;
  }
  function ed(e) {
    if (e === un || e === Ai)
      throw Error(o(483));
  }
  var cn = null, su = 0;
  function zi(e) {
    var t = su;
    return su += 1, cn === null && (cn = []), If(cn, e, t);
  }
  function Ja(e, t) {
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
  function td(e) {
    function t(S, g) {
      if (e) {
        var j = S.deletions;
        j === null ? (S.deletions = [g], S.flags |= 16) : j.push(g);
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
    function u(S, g, j) {
      return S.index = j, e ? (j = S.alternate, j !== null ? (j = j.index, j < g ? (S.flags |= 2, g) : j) : (S.flags |= 134217730, g)) : (S.flags |= 1048576, g);
    }
    function s(S) {
      return e && S.alternate === null && (S.flags |= 134217730), S;
    }
    function f(S, g, j, R) {
      return g === null || g.tag !== 6 ? (g = _s(j, S.mode, R), g.return = S, g) : (g = n(g, j), g.return = S, g);
    }
    function m(S, g, j, R) {
      var Z = j.type;
      return Z === De ? (S = E(
        S,
        g,
        j.props.children,
        R,
        j.key
      ), Ja(S, j), S) : g !== null && (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && Cl(Z) === g.type) ? (g = n(g, j.props), Ja(g, j), g.return = S, g) : (g = Si(
        j.type,
        j.key,
        j.props,
        null,
        S.mode,
        R
      ), Ja(g, j), g.return = S, g);
    }
    function b(S, g, j, R) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== j.containerInfo || g.stateNode.implementation !== j.implementation ? (g = Ss(j, S.mode, R), g.return = S, g) : (g = n(g, j.children || []), g.return = S, g);
    }
    function E(S, g, j, R, Z) {
      return g === null || g.tag !== 7 ? (g = xl(
        j,
        S.mode,
        R,
        Z
      ), g.return = S, g) : (g = n(g, j), g.return = S, g);
    }
    function M(S, g, j) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = _s(
          "" + g,
          S.mode,
          j
        ), g.return = S, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ke:
            return j = Si(
              g.type,
              g.key,
              g.props,
              null,
              S.mode,
              j
            ), Ja(j, g), j.return = S, j;
          case Fe:
            return g = Ss(
              g,
              S.mode,
              j
            ), g.return = S, g;
          case he:
            return g = Cl(g), M(S, g, j);
        }
        if (je(g) || W(g))
          return g = xl(
            g,
            S.mode,
            j,
            null
          ), g.return = S, g;
        if (typeof g.then == "function")
          return M(S, zi(g), j);
        if (g.$$typeof === He)
          return M(
            S,
            wi(S, g),
            j
          );
        Di(S, g);
      }
      return null;
    }
    function _(S, g, j, R) {
      var Z = g !== null ? g.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return Z !== null ? null : f(S, g, "" + j, R);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case ke:
            return j.key === Z ? m(S, g, j, R) : null;
          case Fe:
            return j.key === Z ? b(S, g, j, R) : null;
          case he:
            return j = Cl(j), _(S, g, j, R);
        }
        if (je(j) || W(j))
          return Z !== null ? null : E(S, g, j, R, null);
        if (typeof j.then == "function")
          return _(
            S,
            g,
            zi(j),
            R
          );
        if (j.$$typeof === He)
          return _(
            S,
            g,
            wi(S, j),
            R
          );
        Di(S, j);
      }
      return null;
    }
    function T(S, g, j, R, Z) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return S = S.get(j) || null, f(g, S, "" + R, Z);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case ke:
            return S = S.get(
              R.key === null ? j : R.key
            ) || null, m(g, S, R, Z);
          case Fe:
            return S = S.get(
              R.key === null ? j : R.key
            ) || null, b(g, S, R, Z);
          case he:
            return R = Cl(R), T(
              S,
              g,
              j,
              R,
              Z
            );
        }
        if (je(R) || W(R))
          return S = S.get(j) || null, E(g, S, R, Z, null);
        if (typeof R.then == "function")
          return T(
            S,
            g,
            j,
            zi(R),
            Z
          );
        if (R.$$typeof === He)
          return T(
            S,
            g,
            j,
            wi(g, R),
            Z
          );
        Di(g, R);
      }
      return null;
    }
    function Y(S, g, j, R) {
      for (var Z = null, me = null, $ = g, P = g = 0, Je = null; $ !== null && P < j.length; P++) {
        $.index > P ? (Je = $, $ = null) : Je = $.sibling;
        var ge = _(
          S,
          $,
          j[P],
          R
        );
        if (ge === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && ge.alternate === null && t(S, $), g = u(ge, g, P), me === null ? Z = ge : me.sibling = ge, me = ge, $ = Je;
      }
      if (P === j.length)
        return a(S, $), re && Aa(S, P), Z;
      if ($ === null) {
        for (; P < j.length; P++)
          $ = M(S, j[P], R), $ !== null && (g = u(
            $,
            g,
            P
          ), me === null ? Z = $ : me.sibling = $, me = $);
        return re && Aa(S, P), Z;
      }
      for ($ = l($); P < j.length; P++)
        Je = T(
          $,
          S,
          P,
          j[P],
          R
        ), Je !== null && (e && (ge = Je.alternate, ge !== null && $.delete(ge.key === null ? P : ge.key)), g = u(
          Je,
          g,
          P
        ), me === null ? Z = Je : me.sibling = Je, me = Je);
      return e && $.forEach(function(dl) {
        return t(S, dl);
      }), re && Aa(S, P), Z;
    }
    function K(S, g, j, R) {
      if (j == null) throw Error(o(151));
      for (var Z = null, me = null, $ = g, P = g = 0, Je = null, ge = j.next(); $ !== null && !ge.done; P++, ge = j.next()) {
        $.index > P ? (Je = $, $ = null) : Je = $.sibling;
        var dl = _(S, $, ge.value, R);
        if (dl === null) {
          $ === null && ($ = Je);
          break;
        }
        e && $ && dl.alternate === null && t(S, $), g = u(dl, g, P), me === null ? Z = dl : me.sibling = dl, me = dl, $ = Je;
      }
      if (ge.done)
        return a(S, $), re && Aa(S, P), Z;
      if ($ === null) {
        for (; !ge.done; P++, ge = j.next())
          ge = M(S, ge.value, R), ge !== null && (g = u(ge, g, P), me === null ? Z = ge : me.sibling = ge, me = ge);
        return re && Aa(S, P), Z;
      }
      for ($ = l($); !ge.done; P++, ge = j.next())
        ge = T($, S, P, ge.value, R), ge !== null && (e && (Je = ge.alternate, Je !== null && $.delete(
          Je.key === null ? P : Je.key
        )), g = u(ge, g, P), me === null ? Z = ge : me.sibling = ge, me = ge);
      return e && $.forEach(function(C0) {
        return t(S, C0);
      }), re && Aa(S, P), Z;
    }
    function ie(S, g, j, R) {
      if (typeof j == "object" && j !== null && j.type === De && j.key === null && j.props.ref === void 0 && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case ke:
            e: {
              for (var Z = j.key; g !== null; ) {
                if (g.key === Z) {
                  if (Z = j.type, Z === De) {
                    if (g.tag === 7) {
                      a(
                        S,
                        g.sibling
                      ), R = n(
                        g,
                        j.props.children
                      ), Ja(R, j), R.return = S, S = R;
                      break e;
                    }
                  } else if (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && Cl(Z) === g.type) {
                    a(
                      S,
                      g.sibling
                    ), R = n(g, j.props), Ja(R, j), R.return = S, S = R;
                    break e;
                  }
                  a(S, g);
                  break;
                } else t(S, g);
                g = g.sibling;
              }
              j.type === De ? (R = xl(
                j.props.children,
                S.mode,
                R,
                j.key
              ), Ja(R, j), R.return = S, S = R) : (R = Si(
                j.type,
                j.key,
                j.props,
                null,
                S.mode,
                R
              ), Ja(R, j), R.return = S, S = R);
            }
            return s(S);
          case Fe:
            e: {
              for (Z = j.key; g !== null; ) {
                if (g.key === Z)
                  if (g.tag === 4 && g.stateNode.containerInfo === j.containerInfo && g.stateNode.implementation === j.implementation) {
                    a(
                      S,
                      g.sibling
                    ), R = n(g, j.children || []), R.return = S, S = R;
                    break e;
                  } else {
                    a(S, g);
                    break;
                  }
                else t(S, g);
                g = g.sibling;
              }
              R = Ss(j, S.mode, R), R.return = S, S = R;
            }
            return s(S);
          case he:
            return j = Cl(j), ie(
              S,
              g,
              j,
              R
            );
        }
        if (je(j))
          return Y(
            S,
            g,
            j,
            R
          );
        if (W(j)) {
          if (Z = W(j), typeof Z != "function") throw Error(o(150));
          return j = Z.call(j), K(
            S,
            g,
            j,
            R
          );
        }
        if (typeof j.then == "function")
          return ie(
            S,
            g,
            zi(j),
            R
          );
        if (j.$$typeof === He)
          return ie(
            S,
            g,
            wi(S, j),
            R
          );
        Di(S, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint" ? (j = "" + j, g !== null && g.tag === 6 ? (a(S, g.sibling), R = n(g, j), R.return = S, S = R) : (a(S, g), R = _s(j, S.mode, R), R.return = S, S = R), s(S)) : a(S, g);
    }
    return function(S, g, j, R) {
      try {
        su = 0;
        var Z = ie(
          S,
          g,
          j,
          R
        );
        return cn = null, Z;
      } catch ($) {
        if ($ === un || $ === Ai) throw $;
        var me = _t(29, $, null, S.mode);
        return me.lanes = R, me.return = S, me;
      } finally {
      }
    };
  }
  var Dl = td(!0), ad = td(!1), ka = !1;
  function zs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ds(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function $a(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Fa(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Te & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = _i(e), Bf(e, null, a), t;
    }
    return pi(e, l, t, a), _i(e);
  }
  function ru(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Qo(e, a);
    }
  }
  function Rs(e, t) {
    var a = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var n = null, u = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var s = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = s : u = u.next = s, a = a.next;
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
  var Ms = !1;
  function ou() {
    if (Ms) {
      var e = nn;
      if (e !== null) throw e;
    }
  }
  function fu(e, t, a, l) {
    Ms = !1;
    var n = e.updateQueue;
    ka = !1;
    var u = n.firstBaseUpdate, s = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var m = f, b = m.next;
      m.next = null, s === null ? u = b : s.next = b, s = m;
      var E = e.alternate;
      E !== null && (E = E.updateQueue, f = E.lastBaseUpdate, f !== s && (f === null ? E.firstBaseUpdate = b : f.next = b, E.lastBaseUpdate = m));
    }
    if (u !== null) {
      var M = n.baseState;
      s = 0, E = b = m = null, f = u;
      do {
        var _ = f.lane & -536870913, T = _ !== f.lane;
        if (T ? (ve & _) === _ : (l & _) === _) {
          _ !== 0 && _ === El && (Ms = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var Y = e, K = f;
            _ = t;
            var ie = a;
            switch (K.tag) {
              case 1:
                if (Y = K.payload, typeof Y == "function") {
                  M = Y.call(ie, M, _);
                  break e;
                }
                M = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = K.payload, _ = typeof Y == "function" ? Y.call(ie, M, _) : Y, _ == null) break e;
                M = I({}, M, _);
                break e;
              case 2:
                ka = !0;
            }
          }
          _ = f.callback, _ !== null && (e.flags |= 64, T && (e.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [_] : T.push(_));
        } else
          T = {
            lane: _,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, E === null ? (b = E = T, m = M) : E = E.next = T, s |= _;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          T = f, f = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      E === null && (m = M), n.baseState = m, n.firstBaseUpdate = b, n.lastBaseUpdate = E, u === null && (n.shared.lanes = 0), ll |= s, e.lanes = s, e.memoizedState = M;
    }
  }
  function ld(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function nd(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        ld(a[e], t);
  }
  var Wa = ua(null), Ri = ua(0);
  function ud(e, t) {
    e = Ua, Re(Ri, e), Re(Wa, t), Ua = e | t.baseLanes;
  }
  function Os() {
    Re(Ri, Ua), Re(Wa, Wa.current);
  }
  function Us() {
    Ua = Ri.current, at(Wa), at(Ri);
  }
  var ut = ua(null), ft = null;
  function Ia(e) {
    var t = e.alternate;
    Re(it, it.current & 1), Re(ut, e), ft === null && (t === null || Wa.current !== null || t.memoizedState !== null) && (ft = e);
  }
  function Hs(e) {
    Re(it, it.current), Re(ut, e), ft === null && (ft = e);
  }
  function id(e) {
    e.tag === 22 ? (Re(it, it.current), Re(ut, e), ft === null && (ft = e)) : Pa();
  }
  function Pa() {
    Re(it, it.current), Re(ut, ut.current);
  }
  function Dt(e) {
    at(ut), ft === e && (ft = null), at(it);
  }
  var it = ua(0);
  function du(e, t) {
    Re(ut, ut.current), Re(it, t);
  }
  function Ls(e) {
    at(it), at(ut), ft === e && (ft = null);
  }
  function Mi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || uo(a) || io(a)))
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
  var Da = 0, ue = null, Ce = null, Ve = null, Oi = !1, sn = !1, Rl = !1, Ui = 0, vu = 0, rn = null, Fg = 0;
  function Be() {
    throw Error(o(321));
  }
  function qs(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!zt(e[a], t[a])) return !1;
    return !0;
  }
  function Bs(e, t, a, l, n, u) {
    return Da = u, ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Xd : Zd, Rl = !1, u = a(l, n), Rl = !1, sn && (u = sd(
      t,
      a,
      l,
      n
    )), cd(e), u;
  }
  function cd(e) {
    k.H = Qi;
    var t = Ce !== null && Ce.next !== null;
    if (Da = 0, Ve = Ce = ue = null, Oi = !1, vu = 0, rn = null, t) throw Error(o(300));
    e === null || Ke || (e = e.dependencies, e !== null && Ni(e) && (Ke = !0));
  }
  function sd(e, t, a, l) {
    ue = e;
    var n = 0;
    do {
      if (sn && (rn = null), vu = 0, sn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ve = Ce = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      k.H = ny, u = t(a, l);
    } while (sn);
    return u;
  }
  function Wg() {
    var e = k.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? mu(t) : t, e = e.useState()[0], (Ce !== null ? Ce.memoizedState : null) !== e && (ue.flags |= 1024), t;
  }
  function Ys() {
    var e = Ui !== 0;
    return Ui = 0, e;
  }
  function Gs(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Qs(e) {
    if (Oi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Oi = !1;
    }
    Da = 0, Ve = Ce = ue = null, sn = !1, vu = Ui = 0, rn = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ve === null ? ue.memoizedState = Ve = e : Ve = Ve.next = e, Ve;
  }
  function Qe() {
    if (Ce === null) {
      var e = ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ce.next;
    var t = Ve === null ? ue.memoizedState : Ve.next;
    if (t !== null)
      Ve = t, Ce = e;
    else {
      if (e === null)
        throw ue.alternate === null ? Error(o(467)) : Error(o(310));
      Ce = e, e = {
        memoizedState: Ce.memoizedState,
        baseState: Ce.baseState,
        baseQueue: Ce.baseQueue,
        queue: Ce.queue,
        next: null
      }, Ve === null ? ue.memoizedState = Ve = e : Ve = Ve.next = e;
    }
    return Ve;
  }
  function Hi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function mu(e) {
    var t = vu;
    return vu += 1, rn === null && (rn = []), e = If(rn, e, t), t = ue, (Ve === null ? t.memoizedState : Ve.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Xd : Zd), e;
  }
  function Li(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return mu(e);
      if (e.$$typeof === H) return;
      if (e.$$typeof === He) return nt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Xs(e) {
    var t = null, a = ue.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = ue.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Hi(), ue.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = hl;
    return t.index++, a;
  }
  function Ra(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function qi(e) {
    var t = Qe();
    return Zs(t, Ce, e);
  }
  function Zs(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = a;
    var n = e.baseQueue, u = l.pending;
    if (u !== null) {
      if (n !== null) {
        var s = n.next;
        n.next = u.next, u.next = s;
      }
      t.baseQueue = n = u, l.pending = null;
    }
    if (u = e.baseState, n === null) e.memoizedState = u;
    else {
      t = n.next;
      var f = s = null, m = null, b = t, E = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (ve & M) === M : (Da & M) === M) {
          var _ = b.revertLane;
          if (_ === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === El && (E = !0);
          else if ((Da & _) === _) {
            b = b.next, _ === El && (E = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, m === null ? (f = m = M, s = u) : m = m.next = M, ue.lanes |= _, ll |= _;
          M = b.action, Rl && a(u, M), u = b.hasEagerState ? b.eagerState : a(u, M);
        } else
          _ = {
            lane: M,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, m === null ? (f = m = _, s = u) : m = m.next = _, ue.lanes |= M, ll |= M;
        b = b.next;
      } while (b !== null && b !== t);
      if (m === null ? s = u : m.next = f, !zt(u, e.memoizedState) && (Ke = !0, E && (a = nn, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = s, e.baseQueue = m, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Vs(e) {
    var t = Qe(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, u = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var s = n = n.next;
      do
        u = e(u, s.action), s = s.next;
      while (s !== n);
      zt(u, t.memoizedState) || (Ke = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function rd(e, t, a) {
    var l = ue, n = Qe(), u = re;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var s = !zt(
      (Ce || n).memoizedState,
      a
    );
    if (s && (n.memoizedState = a, Ke = !0), n = n.queue, ks(dd.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || s || Ve !== null && (Ve.memoizedState.tag & 1) !== 0, on(
      e ? 9 : 8,
      { destroy: void 0 },
      fd.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, ze === null) throw Error(o(349));
      u || (Da & 127) !== 0 || od(l, t, a);
    }
    return a;
  }
  function od(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ue.updateQueue, t === null ? (t = Hi(), ue.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function fd(e, t, a, l) {
    t.value = a, t.getSnapshot = l, vd(t) && md(e);
  }
  function dd(e, t, a) {
    return a(function() {
      vd(t) && md(e);
    });
  }
  function vd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !zt(e, a);
    } catch {
      return !0;
    }
  }
  function md(e) {
    var t = bl(e, 2);
    t !== null && jt(t, e, 2);
  }
  function Ks(e) {
    var t = mt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Rl) {
        Ya(!0);
        try {
          a();
        } finally {
          Ya(!1);
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
  function hd(e, t, a, l) {
    return e.baseState = a, Zs(
      e,
      Ce,
      typeof l == "function" ? l : Ra
    );
  }
  function Ig(e, t, a, l, n) {
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
        then: function(s) {
          u.listeners.push(s);
        }
      };
      k.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, gd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function gd(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var u = k.T, s = {};
      s.types = u !== null ? u.types : null, k.T = s;
      try {
        var f = a(n, l), m = k.S;
        m !== null && m(s, f), yd(e, t, f);
      } catch (b) {
        Js(e, t, b);
      } finally {
        u !== null && s.types !== null && (u.types = s.types), k.T = u;
      }
    } else
      try {
        u = a(n, l), yd(e, t, u);
      } catch (b) {
        Js(e, t, b);
      }
  }
  function yd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        pd(e, t, l);
      },
      function(l) {
        return Js(e, t, l);
      }
    ) : pd(e, t, a);
  }
  function pd(e, t, a) {
    t.status = "fulfilled", t.value = a, _d(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, gd(e, a)));
  }
  function Js(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, _d(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function _d(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Sd(e, t) {
    return t;
  }
  function bd(e, t) {
    if (re) {
      var a = ze.formState;
      if (a !== null) {
        e: {
          var l = ue;
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
            Va(l);
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
      lastRenderedReducer: Sd,
      lastRenderedState: t
    }, a.queue = l, a = Yd.bind(
      null,
      ue,
      l
    ), l.dispatch = a, l = Ks(!1), u = Ps.bind(
      null,
      ue,
      !1,
      l.queue
    ), l = mt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = Ig.bind(
      null,
      ue,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function xd(e) {
    var t = Qe();
    return jd(t, Ce, e);
  }
  function jd(e, t, a) {
    if (t = Zs(
      e,
      t,
      Sd
    )[0], e = qi(Ra)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = mu(t);
      } catch (s) {
        throw s === un ? Ai : s;
      }
    else l = t;
    t = Qe();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (ue.flags |= 2048, on(
      9,
      { destroy: void 0 },
      Pg.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function Pg(e, t) {
    e.action = t;
  }
  function Td(e) {
    var t = Qe(), a = Ce;
    if (a !== null)
      return jd(t, a, e);
    Qe(), t = t.memoizedState, a = Qe();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function on(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = ue.updateQueue, t === null && (t = Hi(), ue.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Nd() {
    return Qe().memoizedState;
  }
  function Bi(e, t, a, l) {
    var n = mt();
    ue.flags |= e, n.memoizedState = on(
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
    Ce !== null && l !== null && qs(l, Ce.memoizedState.deps) ? n.memoizedState = on(t, u, a, l) : (ue.flags |= e, n.memoizedState = on(
      1 | t,
      u,
      a,
      l
    ));
  }
  function wd(e, t) {
    Bi(8390656, 8, e, t);
  }
  function ks(e, t) {
    Yi(2048, 8, e, t);
  }
  function ey(e) {
    ue.flags |= 4;
    var t = ue.updateQueue;
    if (t === null)
      t = Hi(), ue.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Ed(e) {
    var t = Qe().memoizedState;
    return ey({ ref: t, nextImpl: e }), function() {
      if ((Te & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Ad(e, t) {
    return Yi(4, 2, e, t);
  }
  function Cd(e, t) {
    return Yi(4, 4, e, t);
  }
  function zd(e, t) {
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
  function Dd(e, t, a) {
    a = a != null ? a.concat([e]) : null, Yi(4, 4, zd.bind(null, t, e), a);
  }
  function $s() {
  }
  function Rd(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && qs(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Md(e, t) {
    var a = Qe();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && qs(t, l[1]))
      return l[0];
    if (l = e(), Rl) {
      Ya(!0);
      try {
        e();
      } finally {
        Ya(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function Fs(e, t, a) {
    return a === void 0 || (Da & 1073741824) !== 0 && (ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = Xv(), ue.lanes |= e, ll |= e, a);
  }
  function Od(e, t, a, l) {
    return zt(a, t) ? a : Wa.current !== null ? (e = Fs(e, a, l), zt(e, t) || (Ke = !0), e) : (Da & 106) === 0 || (Da & 1073741824) !== 0 && (ve & 261930) === 0 ? (Ke = !0, e.memoizedState = a) : (e = Xv(), ue.lanes |= e, ll |= e, t);
  }
  function Ud(e, t, a, l, n) {
    var u = ae.p;
    ae.p = u !== 0 && 8 > u ? u : 8;
    var s = k.T, f = {};
    f.types = s !== null ? s.types : null, k.T = f, Ps(e, !1, t, a);
    try {
      var m = n(), b = k.S;
      if (b !== null && b(f, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var E = $g(
          m,
          l
        );
        hu(
          e,
          t,
          E,
          Ut(e)
        );
      } else
        hu(
          e,
          t,
          l,
          Ut(e)
        );
    } catch (M) {
      hu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: M },
        Ut()
      );
    } finally {
      ae.p = u, s !== null && f.types !== null && (s.types = f.types), k.T = s;
    }
  }
  function ty() {
  }
  function Ws(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Hd(e).queue;
    Ud(
      e,
      n,
      t,
      ba,
      a === null ? ty : function() {
        return Ld(e), a(l);
      }
    );
  }
  function Hd(e) {
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
  function Ld(e) {
    var t = Hd(e);
    t.next === null && (t = e.alternate.memoizedState), hu(
      e,
      t.next.queue,
      {},
      Ut()
    );
  }
  function Is() {
    return nt(Cn);
  }
  function qd() {
    return Qe().memoizedState;
  }
  function Bd() {
    return Qe().memoizedState;
  }
  function ay(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ut();
          e = $a(a);
          var l = Fa(t, e, a);
          l !== null && (jt(l, t, a), ru(l, t, a)), t = { cache: ws() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ly(e, t, a) {
    var l = Ut();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gi(e) ? Gd(t, a) : (a = ys(e, t, a, l), a !== null && (jt(a, e, l), Qd(a, t, l)));
  }
  function Yd(e, t, a) {
    var l = Ut();
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
    if (Gi(e)) Gd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var s = t.lastRenderedState, f = u(s, a);
          if (n.hasEagerState = !0, n.eagerState = f, zt(f, s))
            return pi(e, t, n, 0), ze === null && yi(), !1;
        } catch {
        } finally {
        }
      if (a = ys(e, t, n, l), a !== null)
        return jt(a, e, l), Qd(a, t, l), !0;
    }
    return !1;
  }
  function Ps(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Xr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gi(e)) {
      if (t) throw Error(o(479));
    } else
      t = ys(
        e,
        a,
        l,
        2
      ), t !== null && jt(t, e, 2);
  }
  function Gi(e) {
    var t = e.alternate;
    return e === ue || t !== null && t === ue;
  }
  function Gd(e, t) {
    sn = Oi = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Qd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Qo(e, a);
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
  }, Xd = {
    readContext: nt,
    use: Li,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nt,
    useEffect: wd,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Bi(
        4194308,
        4,
        zd.bind(null, t, e),
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
      if (Rl) {
        Ya(!0);
        try {
          e();
        } finally {
          Ya(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = mt();
      if (a !== void 0) {
        var n = a(t);
        if (Rl) {
          Ya(!0);
          try {
            a(t);
          } finally {
            Ya(!1);
          }
        }
      } else n = t;
      return l.memoizedState = l.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, l.queue = e, e = e.dispatch = ly.bind(
        null,
        ue,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = mt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Ks(e);
      var t = e.queue, a = Yd.bind(null, ue, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: $s,
    useDeferredValue: function(e, t) {
      var a = mt();
      return Fs(a, e, t);
    },
    useTransition: function() {
      var e = Ks(!1);
      return e = Ud.bind(
        null,
        ue,
        e.queue,
        !0,
        !1
      ), mt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = ue, n = mt();
      if (re) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), ze === null)
          throw Error(o(349));
        (ve & 127) !== 0 || od(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, wd(dd.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, on(
        9,
        { destroy: void 0 },
        fd.bind(
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
        var a = ra, l = sa;
        a = (l & ~(1 << 32 - At(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ui++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Fg++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Is,
    useFormState: bd,
    useActionState: bd,
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
      return t.queue = a, t = Ps.bind(
        null,
        ue,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Xs,
    useCacheRefresh: function() {
      return mt().memoizedState = ay.bind(
        null,
        ue
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
  }, Zd = {
    readContext: nt,
    use: Li,
    useCallback: Rd,
    useContext: nt,
    useEffect: ks,
    useImperativeHandle: Dd,
    useInsertionEffect: Ad,
    useLayoutEffect: Cd,
    useMemo: Md,
    useReducer: qi,
    useRef: Nd,
    useState: function() {
      return qi(Ra);
    },
    useDebugValue: $s,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Od(
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
    useSyncExternalStore: rd,
    useId: qd,
    useHostTransitionStatus: Is,
    useFormState: xd,
    useActionState: xd,
    useOptimistic: function(e, t) {
      var a = Qe();
      return hd(a, Ce, e, t);
    },
    useMemoCache: Xs,
    useCacheRefresh: Bd,
    useEffectEvent: Ed
  }, ny = {
    readContext: nt,
    use: Li,
    useCallback: Rd,
    useContext: nt,
    useEffect: ks,
    useImperativeHandle: Dd,
    useInsertionEffect: Ad,
    useLayoutEffect: Cd,
    useMemo: Md,
    useReducer: Vs,
    useRef: Nd,
    useState: function() {
      return Vs(Ra);
    },
    useDebugValue: $s,
    useDeferredValue: function(e, t) {
      var a = Qe();
      return Ce === null ? Fs(a, e, t) : Od(
        a,
        Ce.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Vs(Ra)[0], t = Qe().memoizedState;
      return [
        typeof e == "boolean" ? e : mu(e),
        t
      ];
    },
    useSyncExternalStore: rd,
    useId: qd,
    useHostTransitionStatus: Is,
    useFormState: Td,
    useActionState: Td,
    useOptimistic: function(e, t) {
      var a = Qe();
      return Ce !== null ? hd(a, Ce, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Xs,
    useCacheRefresh: Bd,
    useEffectEvent: Ed
  };
  function er(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : I({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var tr = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ut(), n = $a(l);
      n.payload = t, a != null && (n.callback = a), t = Fa(e, n, l), t !== null && (jt(t, e, l), ru(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ut(), n = $a(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Fa(e, n, l), t !== null && (jt(t, e, l), ru(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Ut(), l = $a(a);
      l.tag = 2, t != null && (l.callback = t), t = Fa(e, l, a), t !== null && (jt(t, e, a), ru(t, e, a));
    }
  };
  function Vd(e, t, a, l, n, u, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, s) : t.prototype && t.prototype.isPureReactComponent ? !tu(a, l) || !tu(n, u) : !0;
  }
  function Kd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && tr.enqueueReplaceState(t, t.state, null);
  }
  function Ml(e, t) {
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
  function Jd(e) {
    gi(e);
  }
  function kd(e) {
    console.error(e);
  }
  function $d(e) {
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
  function Fd(e, t, a) {
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
  function ar(e, t, a) {
    return a = $a(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Xi(e, t);
    }, a;
  }
  function Wd(e) {
    return e = $a(e), e.tag = 3, e;
  }
  function Id(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Fd(t, a, l);
      };
    }
    var s = a.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      Fd(t, a, l), typeof n != "function" && (nl === null ? nl = /* @__PURE__ */ new Set([this]) : nl.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function uy(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && Nl(
        t,
        a,
        n,
        !0
      ), a = ut.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return ft === null ? oc() : a.alternate === null && Ye === 0 && (Ye = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === Ci ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Yr(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === Ci ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Yr(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Yr(e, l, n), oc(), !1;
    }
    if (re)
      return t = ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== xs && (e = Error(o(422), { cause: l }), nu(Yt(e, a)))) : (l !== xs && (t = Error(o(423), {
        cause: l
      }), nu(
        Yt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Yt(l, a), n = ar(
        e.stateNode,
        l,
        n
      ), Rs(e, n), Ye !== 4 && (Ye = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Yt(u, a), ju === null ? ju = [u] : ju.push(u), Ye !== 4 && (Ye = 2), t === null) return !0;
    l = Yt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = ar(a.stateNode, l, e), Rs(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (nl === null || !nl.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = Wd(n), Id(
              n,
              e,
              a,
              l
            ), Rs(a, n), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var lr = Error(o(461)), Ke = !1;
  function $e(e, t, a, l) {
    t.child = e === null ? ad(t, null, a, l) : Dl(
      t,
      e.child,
      a,
      l
    );
  }
  function Pd(e, t, a, l, n) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var s = {};
      for (var f in l)
        f !== "ref" && (s[f] = l[f]);
    } else s = l;
    return wl(t), l = Bs(
      e,
      t,
      a,
      s,
      u,
      n
    ), f = Ys(), e !== null && !Ke ? (Gs(e, t, n), Ma(e, t, n)) : (re && f && xi(t), t.flags |= 1, $e(e, t, l, n), t.child);
  }
  function ev(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !ps(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, tv(
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
    if (u = e.child, !fr(e, n)) {
      var s = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : tu, a(s, l) && e.ref === t.ref)
        return Ma(e, t, n);
    }
    return t.flags |= 1, e = Ea(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function tv(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (tu(u, l) && e.ref === t.ref)
        if (Ke = !1, t.pendingProps = l = u, fr(e, n))
          (e.flags & 131072) !== 0 && (Ke = !0);
        else
          return t.lanes = e.lanes, Ma(e, t, n);
    }
    return nr(
      e,
      t,
      a,
      l,
      n
    );
  }
  function av(e, t, a, l) {
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
        return lv(
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
        ), u !== null ? ud(t, u) : Os(), id(t);
      else
        return l = t.lanes = 536870912, lv(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Ei(t, u.cachePool), ud(t, u), Pa(), t.memoizedState = null) : (e !== null && Ei(t, null), Os(), Pa());
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
  function lv(e, t, a, l, n) {
    var u = As();
    return u = u === null ? null : { parent: Ze._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ei(t, null), Os(), id(t), e !== null && Nl(e, t, l, !0), t.childLanes = n, null;
  }
  function Zi(e, t) {
    return t = Vi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function nv(e, t, a) {
    return Dl(t, e.child, null, a), e = Zi(t, t.pendingProps), e.flags |= 2, Dt(t), t.memoizedState = null, e;
  }
  function iy(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (re) {
        if (l.mode === "hidden")
          return e = Zi(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, gu(null, e);
        if (Hs(t), (e = Me) ? (e = zm(
          e,
          Xt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xa !== null ? { id: sa, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Gf(e), a.return = t, t.child = a, Pe = t, Me = null)) : e = null, e === null) throw Va(t);
        return t.lanes = 536870912, null;
      }
      return Zi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var s = u.dehydrated;
      if (Hs(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = nv(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Ke || Nl(e, t, a, !1), n = (a & e.childLanes) !== 0, Ke || n) {
        if (Wa.current === null) {
          if (l = ze, l !== null && (s = Xo(l, a), s !== 0 && s !== u.retryLane))
            throw u.retryLane = s, bl(e, s), jt(l, e, s), lr;
          oc();
        }
        t = nv(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, Me = Vt(s.nextSibling), Pe = t, re = !0, Za = null, Xt = !1, e !== null && Zf(t, e), t = Zi(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function fn(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function nr(e, t, a, l, n) {
    return wl(t), a = Bs(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Ys(), e !== null && !Ke ? (Gs(e, t, n), Ma(e, t, n)) : (re && l && xi(t), t.flags |= 1, $e(e, t, a, n), t.child);
  }
  function uv(e, t, a, l, n, u) {
    return wl(t), t.updateQueue = null, a = sd(
      t,
      l,
      a,
      n
    ), cd(e), l = Ys(), e !== null && !Ke ? (Gs(e, t, u), Ma(e, t, u)) : (re && l && xi(t), t.flags |= 1, $e(e, t, a, u), t.child);
  }
  function iv(e, t, a, l, n) {
    if (wl(t), t.stateNode === null) {
      var u = en, s = a.contextType;
      typeof s == "object" && s !== null && (u = nt(s)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = tr, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, zs(t), s = a.contextType, u.context = typeof s == "object" && s !== null ? nt(s) : en, u.state = t.memoizedState, s = a.getDerivedStateFromProps, typeof s == "function" && (er(
        t,
        a,
        s,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (s = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), s !== u.state && tr.enqueueReplaceState(u, u.state, null), fu(t, l, u, n), ou(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, m = Ml(a, f);
      u.props = m;
      var b = u.context, E = a.contextType;
      s = en, typeof E == "object" && E !== null && (s = nt(E));
      var M = a.getDerivedStateFromProps;
      E = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, E || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== s) && Kd(
        t,
        u,
        l,
        s
      ), ka = !1;
      var _ = t.memoizedState;
      u.state = _, fu(t, l, u, n), ou(), b = t.memoizedState, f || _ !== b || ka ? (typeof M == "function" && (er(
        t,
        a,
        M,
        l
      ), b = t.memoizedState), (m = ka || Vd(
        t,
        a,
        m,
        l,
        _,
        b,
        s
      )) ? (E || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = b), u.props = l, u.state = b, u.context = s, l = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Ds(e, t), s = t.memoizedProps, E = Ml(a, s), u.props = E, M = t.pendingProps, _ = u.context, b = a.contextType, m = en, typeof b == "object" && b !== null && (m = nt(b)), f = a.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s !== M || _ !== m) && Kd(
        t,
        u,
        l,
        m
      ), ka = !1, _ = t.memoizedState, u.state = _, fu(t, l, u, n), ou();
      var T = t.memoizedState;
      s !== M || _ !== T || ka || e !== null && e.dependencies !== null && Ni(e.dependencies) ? (typeof f == "function" && (er(
        t,
        a,
        f,
        l
      ), T = t.memoizedState), (E = ka || Vd(
        t,
        a,
        E,
        l,
        _,
        T,
        m
      ) || e !== null && e.dependencies !== null && Ni(e.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, T, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        T,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = T), u.props = l, u.state = T, u.context = m, l = E) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, fn(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = Dl(
      t,
      e.child,
      null,
      n
    ), t.child = Dl(
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
    return jl(), t.flags |= 256, $e(e, t, a, l), t.child;
  }
  var ur = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ir(e) {
    return { baseLanes: e, cachePool: Ff() };
  }
  function cr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ot), e;
  }
  function sv(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, s;
    if ((s = u) || (s = e !== null && e.memoizedState === null ? !1 : (it.current & 2) !== 0), s && (n = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (re) {
        if (n ? Ia(t) : Pa(), (e = Me) ? (e = zm(
          e,
          Xt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Xa !== null ? { id: sa, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Gf(e), a.return = t, t.child = a, Pe = t, Me = null)) : e = null, e === null) throw Va(t);
        return io(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (Pa(), n = t.mode, u = Vi(
        { mode: "hidden", children: u },
        n
      ), l = xl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = ir(a), l.childLanes = cr(
        e,
        s,
        a
      ), t.memoizedState = ur, gu(null, l)) : (Ia(t), sr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var m = f.dehydrated;
      if (m !== null)
        return cy(
          e,
          t,
          u,
          s,
          l,
          m,
          f,
          a
        );
    }
    return n ? (Pa(), n = l.fallback, u = t.mode, f = e.child, m = f.sibling, l = Ea(f, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, m !== null ? n = Ea(m, n) : (n = xl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, gu(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = ir(a) : (u = n.cachePool, u !== null ? (f = Ze._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Ff(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = cr(
      e,
      s,
      a
    ), t.memoizedState = ur, gu(e.child, l)) : (Ia(t), a = e.child, e = a.sibling, a = Ea(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function sr(e, t) {
    return t = Vi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Vi(e, t) {
    return e = _t(22, e, null, t), e.lanes = 0, e;
  }
  function Ki(e, t, a) {
    return Dl(t, e.child, null, a), e = sr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function cy(e, t, a, l, n, u, s, f) {
    if (a)
      return t.flags & 256 ? (Ia(t), t.flags &= -257, Ki(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (Pa(), t.child = e.child, t.flags |= 128, null) : (Pa(), u = n.fallback, s = t.mode, n = Vi(
        { mode: "visible", children: n.children },
        s
      ), u = xl(
        u,
        s,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Dl(t, e.child, null, f), n = t.child, n.memoizedState = ir(f), n.childLanes = cr(
        e,
        l,
        f
      ), t.memoizedState = ur, gu(null, n));
    if (Ia(t), io(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var m = l.dgst;
      return l = m, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, nu({ value: n, source: null, stack: null })), Ki(
        e,
        t,
        f
      );
    }
    if (Ke || Nl(e, t, f, !1), l = (f & e.childLanes) !== 0, Ke || l) {
      if (Wa.current !== null)
        return Ki(
          e,
          t,
          f
        );
      if (l = ze, l !== null && (n = Xo(
        l,
        f
      ), n !== 0 && n !== s.retryLane))
        throw s.retryLane = n, bl(e, n), jt(l, e, n), lr;
      return uo(u) || oc(), Ki(
        e,
        t,
        f
      );
    }
    return uo(u) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Me = Vt(u.nextSibling), Pe = t, re = !0, Za = null, Xt = !1, e !== null && Zf(t, e), t = sr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function rv(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Ti(e.return, t, a);
  }
  function ov(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && Mi(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Ji(e, t, a, l, n, u) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: n,
      treeForkCount: u
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = l, s.tail = a, s.tailMode = n, s.treeForkCount = u);
  }
  function rr(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var a = t.sibling;
      t.sibling = e.child, e.child = t, t = a;
    }
  }
  function or(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, u = l.tail;
    l = l.children;
    var s = it.current;
    if (t.flags & 128)
      return du(t, s), null;
    var f = (s & 2) !== 0;
    if (f ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, du(t, s), n === "backwards" && e !== null ? (rr(e), $e(e, t, l, a), rr(e)) : $e(e, t, l, a), l = re ? lu : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && rv(e, a, t);
        else if (e.tag === 19)
          rv(e, a, t);
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
        a = ov(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, rr(t)), Ji(
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
        a = ov(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), Ji(
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
  function fv(e, t, a) {
    var l = t.pendingProps;
    return Ka(t, t.type, l.value), $e(e, t, l.children, a), t.child;
  }
  function Ma(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ll |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (Nl(
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
  function fr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ni(e)));
  }
  function sy(e, t, a) {
    switch (t.tag) {
      case 3:
        Iu(t, t.stateNode.containerInfo), Ka(t, Ze, e.memoizedState.cache), jl();
        break;
      case 27:
      case 5:
        qc(t);
        break;
      case 4:
        Iu(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ka(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Hs(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return Ia(t), t.flags |= 128, null;
          l = Nl(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? sv(e, t, a) : (Ia(t), e = Ma(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        }
        Ia(t);
        break;
      case 19:
        if (t.flags & 128)
          return or(
            e,
            t,
            a
          );
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (Nl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return or(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), du(t, it.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, av(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        Ka(t, Ze, e.memoizedState.cache);
    }
    return Ma(e, t, a);
  }
  function dv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ke = !0;
      else {
        if (!fr(e, a) && (t.flags & 128) === 0)
          return Ke = !1, sy(
            e,
            t,
            a
          );
        Ke = (e.flags & 131072) !== 0;
      }
    else
      Ke = !1, re && (t.flags & 1048576) !== 0 && Xf(t, lu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Cl(t.elementType), t.type = e, typeof e == "function")
            ps(e) ? (l = Ml(e, l), t.tag = 1, t = iv(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = nr(
              null,
              t,
              e,
              l,
              a
            ));
          else {
            if (e != null) {
              var n = e.$$typeof;
              if (n === G) {
                t.tag = 11, t = Pd(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ce) {
                t.tag = 14, t = ev(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === He) {
                t.tag = 10, t.type = e, t = fv(
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
        return nr(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = Ml(
          l,
          t.pendingProps
        ), iv(
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
          n = u.element, Ds(e, t), fu(t, l, null, a);
          var s = t.memoizedState;
          if (l = s.cache, Ka(t, Ze, l), l !== u.cache && Ns(
            t,
            [Ze],
            a,
            !0
          ), ou(), l = s.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
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
              for (Me = Vt(e.firstChild), Pe = t, re = !0, Za = null, Xt = !0, a = ad(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (jl(), l === n) {
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
        return fn(e, t), e === null ? (a = Lm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : re || (t.stateNode = gm(
          t.type,
          t.pendingProps,
          qa.current,
          t
        )) : t.memoizedState = Lm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return qc(t), e === null && re && (l = t.stateNode = Mm(
          t.type,
          t.pendingProps,
          qa.current
        ), Pe = t, Xt = !0, n = Me, cl(t.type) ? (co = n, Me = Vt(l.firstChild)) : Me = n), $e(
          e,
          t,
          t.pendingProps.children,
          a
        ), fn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && re && ((n = l = Me) && (l = a0(
          l,
          t.type,
          t.pendingProps,
          Xt
        ), l !== null ? (t.stateNode = l, Pe = t, Me = Vt(l.firstChild), Xt = !1, n = !0) : n = !1), n || Va(t)), qc(t), n = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = u.children, Ir(n, u) ? l = null : s !== null && Ir(n, s) && (t.flags |= 32), t.memoizedState !== null && (n = Bs(
          e,
          t,
          Wg,
          null,
          null,
          a
        ), Cn._currentValue = n), fn(e, t), $e(e, t, l, a), t.child;
      case 6:
        return e === null && re && ((e = a = Me) && (a = l0(
          a,
          t.pendingProps,
          Xt
        ), a !== null ? (t.stateNode = a, Pe = t, Me = null, e = !0) : e = !1), e || Va(t)), null;
      case 13:
        return sv(e, t, a);
      case 4:
        return Iu(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Dl(
          t,
          null,
          l,
          a
        ) : $e(e, t, l, a), t.child;
      case 11:
        return Pd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, fn(e, t), $e(e, t, l, a), t.child;
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
        return fv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, wl(t), n = nt(n), l = l(n), t.flags |= 1, $e(e, t, l, a), t.child;
      case 14:
        return ev(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return tv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return or(e, t, a);
      case 31:
        return iy(e, t, a);
      case 22:
        return av(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return wl(t), l = nt(Ze), e === null ? (n = As(), n === null && (n = ze, u = ws(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, zs(t), Ka(t, Ze, n)) : ((e.lanes & a) !== 0 && (Ds(e, t), fu(t, null, null, a), ou()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Ka(t, Ze, l)) : (l = u.cache, Ka(t, Ze, l), l !== n.cache && Ns(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : re && xi(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : fn(e, t), $e(e, t, l.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Oa(e) {
    e.flags |= 4;
  }
  function dr(e, t, a, l, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Gm(t, l) : Gm(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jv()) e.flags |= 8192;
        else
          throw zl = Ci, Cs;
    } else e.flags &= -16777217;
  }
  function vv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Qm(t))
      if (Jv()) e.flags |= 8192;
      else
        throw zl = Ci, Cs;
  }
  function ki(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Yo() : 536870912, e.lanes |= t, gn |= t);
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
  function ry(e, t, a) {
    var l = t.pendingProps;
    switch (bs(t), t.tag) {
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
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), za(Ze), Gl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (ln(t) ? Oa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, js())), Oe(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Oa(t), u !== null ? (Oe(t), vv(t, u)) : (Oe(t), dr(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (Oa(t), Oe(t), vv(t, u)) : (Oe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Oa(t), Oe(t), dr(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if (Pu(t), a = qa.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Oe(t), t.subtreeFlags &= -33554433, null;
          }
          e = ia.current, ln(t) ? Vf(t) : (e = Mm(n, l, a), t.stateNode = e, Oa(t));
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
          if (u = ia.current, ln(t))
            Vf(t);
          else {
            var s = Au(
              qa.current
            );
            switch (u) {
              case 1:
                u = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = s.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof l.is == "string" ? s.createElement("select", {
                      is: l.is
                    }) : s.createElement("select"), l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                    break;
                  default:
                    u = typeof l.is == "string" ? s.createElement(n, { is: l.is }) : s.createElement(n);
                }
            }
            u[lt] = t, u[pt] = l;
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                u.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            t.stateNode = u;
            e: switch (st(u, n, l), n) {
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
        return Oe(t), t.subtreeFlags &= -33554433, dr(
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
          if (e = qa.current, ln(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = Pe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || dm(e.nodeValue, a)), e || Va(t, !0);
          } else
            e = Au(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return Oe(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = ln(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[lt] = t;
            } else
              jl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), e = !1;
          } else
            a = js(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Oe(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = ln(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[lt] = t;
            } else
              jl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Oe(t), n = !1;
          } else
            n = js(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (Dt(t), t) : (Dt(t), null);
        }
        return Dt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), ki(t, t.updateQueue), Oe(t), null);
      case 4:
        return Gl(), e === null && Jr(t.stateNode.containerInfo), t.flags |= 67108864, Oe(t), null;
      case 10:
        return za(t.type), Oe(t), null;
      case 19:
        if (Ls(t), l = t.memoizedState, l === null) return Oe(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) yu(l, !1);
          else {
            if (Ye !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Mi(e), u !== null) {
                  for (t.flags |= 128, yu(l, !1), e = u.updateQueue, t.updateQueue = e, ki(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Yf(a, e), a = a.sibling;
                  return du(
                    t,
                    it.current & 1 | 2
                  ), re && Aa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && wt() > ic && (t.flags |= 128, n = !0, yu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Mi(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, ki(t, e), yu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !re)
                return Oe(t), null;
            } else
              2 * wt() - l.renderingStartTime > ic && a !== 536870912 && (t.flags |= 128, n = !0, yu(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = wt(), e.sibling = null, u = it.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || re ? du(t, u) : (a = u, Re(ut, t), Re(it, a), ft === null && (ft = t)), re && Aa(t, l.treeForkCount), e;
        }
        return Oe(t), null;
      case 22:
      case 23:
        return Dt(t), Us(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Oe(t), a = t.updateQueue, a !== null && ki(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && at(Al), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), za(Ze), Oe(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Oe(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function oy(e, t) {
    switch (bs(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return za(Ze), Gl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Pu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Dt(t), t.alternate === null)
            throw Error(o(340));
          jl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Dt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          jl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Ls(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Gl(), null;
      case 10:
        return za(t.type), null;
      case 22:
      case 23:
        return Dt(t), Us(), e !== null && at(Al), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return za(Ze), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function mv(e, t) {
    switch (bs(t), t.tag) {
      case 3:
        za(Ze), Gl();
        break;
      case 26:
      case 27:
      case 5:
        Pu(t);
        break;
      case 4:
        Gl();
        break;
      case 31:
        t.memoizedState !== null && Dt(t);
        break;
      case 13:
        Dt(t);
        break;
      case 19:
        Ls(t);
        break;
      case 10:
        za(t.type);
        break;
      case 22:
      case 23:
        Dt(t), Us(), e !== null && at(Al);
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
            var u = a.create, s = a.inst;
            l = u(), s.destroy = l;
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (f) {
      Ee(t, t.return, f);
    }
  }
  function el(e, t, a) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            var s = l.inst, f = s.destroy;
            if (f !== void 0) {
              s.destroy = void 0, n = t;
              var m = a, b = f;
              try {
                b();
              } catch (E) {
                Ee(
                  n,
                  m,
                  E
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (E) {
      Ee(t, t.return, E);
    }
  }
  function hv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        nd(t, a);
      } catch (l) {
        Ee(e, e.return, l);
      }
    }
  }
  function gv(e, t, a) {
    a.props = Ml(
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
            (n.ref === null || n.ref.name !== u) && (n.ref = jm(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var s = new Ht(e);
              y(
                e.child,
                !1,
                e0,
                s,
                void 0,
                void 0
              ), e.stateNode = s;
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
  function ct(e, t) {
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
        Cm(
          e.stateNode,
          t[a]
        );
  }
  function yv(e) {
    for (var t = e.return; t !== null && (mr(t) && Cm(e.stateNode, t.stateNode), !vr(t)); )
      t = t.return;
  }
  function _u(e) {
    for (var t = e.return; t !== null && (mr(t) && t0(e.stateNode, t.stateNode), !vr(t)); )
      t = t.return;
  }
  function vr(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function mr(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function hr(e) {
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
  function gr(e, t, a) {
    try {
      var l = e.stateNode;
      Hy(l, e.type, a, t), l[pt] = t;
    } catch (n) {
      Ee(e, e.return, n);
    }
  }
  function pv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && cl(e.type) || e.tag === 4;
  }
  function yr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || pv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && cl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function pr(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ca)), $i(e, l), be = !0;
    else if (n !== 4 && (n === 27 && ($i(e, l), l = null, cl(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
      for (pr(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        pr(
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
    else if (n !== 4 && (n === 27 && ($i(e, l), l = null, cl(e.type) && (a = e.stateNode)), e = e.child, e !== null))
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
  function _v(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      st(t, l, a), t[lt] = e, t[pt] = a;
    } catch (u) {
      Ee(e, e.return, u);
    }
  }
  var Wi = !1, Rt = null;
  function Sv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Wi = !0);
  }
  var fa = null;
  function bv() {
    var e = fa;
    return fa = null, e;
  }
  var St = 0;
  function dn(e, t, a, l, n) {
    return St = 0, xv(
      e.child,
      t,
      a,
      l,
      n
    );
  }
  function xv(e, t, a, l, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var s = e.stateNode;
        if (l !== null) {
          var f = to(s);
          l.push(f), f.view && (u = !0);
        } else
          u || to(s).view && (u = !0);
        Wi = !0, bm(
          s,
          St === 0 ? t : t + "_" + St,
          a
        ), St++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || xv(
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
      e.tag === 5 ? xm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || da(
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
          t = wa(t.default, t.share), t !== "none" && (dn(
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
  function _r(e, t) {
    if (e.tag === 30) {
      var a = e.stateNode, l = e.memoizedProps, n = Na(l, a), u = wa(
        l.default,
        a.paired ? l.share : l.enter
      );
      u !== "none" ? dn(e, n, u, null, !1) ? (Ii(e), a.paired || t || Sn(e, l.onEnter)) : da(e.child, !1) : Ii(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        _r(e, t), e = e.sibling;
    else Ii(e);
  }
  function Sr(e) {
    if (Rt !== null && Rt.size !== 0) {
      var t = Rt;
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
                  if (u !== "none" && (dn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, Sn(e, a.onShare)) : da(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            Sr(e);
          }
          e = e.sibling;
        }
    }
  }
  function br(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, a = Na(t, e.stateNode), l = Rt !== null ? Rt.get(a) : void 0, n = wa(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      n !== "none" && (dn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, Rt.delete(a), Sn(e, t.onShare)) : Sn(e, t.onExit) : da(e.child, !1)), Rt !== null && Sr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        br(e), e = e.sibling;
    else
      Rt !== null && Sr(e);
  }
  function jv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = Na(t, e.stateNode);
        t = wa(t.default, t.update), e.flags &= -5, t !== "none" && dn(
          e,
          a,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && jv(e);
      e = e.sibling;
    }
  }
  function xr(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, da(e.child, !1));
          }
          xr(e);
        }
        e = e.sibling;
      }
  }
  function Pi(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, da(e.child, !1), xr(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Pi(e), e = e.sibling;
    else xr(e);
  }
  function Tv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? da(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Tv(e), e = e.sibling;
  }
  function jr(e, t, a, l, n, u, s) {
    for (var f = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (u !== null && St < u.length) {
          var b = u[St], E = to(m);
          (b.view || E.view) && (f = !0);
          var M;
          if (M = (e.flags & 4) === 0)
            if (E.clip) M = !0;
            else {
              M = b.rect;
              var _ = E.rect;
              M = M.y !== _.y || M.x !== _.x || M.height !== _.height || M.width !== _.width;
            }
          M && (e.flags |= 4), E.abs ? E = !b.abs : (b = b.rect, E = E.rect, E = b.height !== E.height || b.width !== E.width), E && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && bm(
          m,
          St === 0 ? a : a + "_" + St,
          n
        ), f && (e.flags & 4) !== 0 || (fa === null && (fa = []), fa.push(
          m,
          St === 0 ? l : l + "_" + St,
          t.memoizedProps
        )), St++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s ? e.flags |= t.flags & 32 : jr(
        e,
        t.child,
        a,
        l,
        n,
        u,
        s
      ) && (f = !0));
      t = t.sibling;
    }
    return f;
  }
  function Nv(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var a = e.memoizedProps, l = e.stateNode, n = Na(a, l), u = wa(a.default, a.update), s;
        s = e.memoizedState, e.memoizedState = null, l = e;
        var f = e.child;
        St = 0, n = jr(
          l,
          f,
          n,
          n,
          u,
          s,
          !1
        ), (e.flags & 4) !== 0 && n && Sn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Nv(e);
      e = e.sibling;
    }
  }
  var et = !1, Ne = !1, va = !1, Tr = !1, wv = typeof WeakSet == "function" ? WeakSet : Set, tt = null, ma = !1, Su = !1, ec = !1, Nr = !1;
  function fy(e, t, a) {
    if (e = e.containerInfo, Fr = zn, e = zf(e), fs(e)) {
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
            var u = n.anchorOffset, s = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, s.nodeType;
            } catch {
              l = null;
              break e;
            }
            var f = 0, m = -1, b = -1, E = 0, M = 0, _ = e, T = null;
            t: for (; ; ) {
              for (var Y; _ !== l || u !== 0 && _.nodeType !== 3 || (m = f + u), _ !== s || n !== 0 && _.nodeType !== 3 || (b = f + n), _.nodeType === 3 && (f += _.nodeValue.length), (Y = _.firstChild) !== null; )
                T = _, _ = Y;
              for (; ; ) {
                if (_ === e) break t;
                if (T === l && ++E === u && (m = f), T === s && ++M === n && (b = f), (Y = _.nextSibling) !== null) break;
                _ = T, T = _.parentNode;
              }
              _ = Y;
            }
            l = m === -1 || b === -1 ? null : { start: m, end: b };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Wr = { focusedElem: e, selectionRange: l }, zn = !1, a = (a & 335544064) === a, tt = t, t = a ? 9270 : 1024; tt !== null; ) {
      if (e = tt, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && br(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && Sv(e), tc(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && br(l), tc(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && Sv(e), tc(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, tt = l) : (a && jv(e), tc(a));
      }
    }
    Rt = null;
  }
  function tc(e) {
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
              var s = Ml(
                t.type,
                n
              );
              a = u.getSnapshotBeforeUpdate(
                s,
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
              no(l);
            else if (a === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  no(l);
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
          ), n = t.memoizedProps, n = wa(n.default, n.update), n !== "none" && dn(
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
  function Ev(e, t, a) {
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
            } catch (s) {
              Ee(a, a.return, s);
            }
          else {
            var n = Ml(
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
            } catch (s) {
              Ee(
                a,
                a.return,
                s
              );
            }
          }
        l & 64 && hv(a), l & 512 && oa(a, a.return);
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
            nd(e, t);
          } catch (s) {
            Ee(a, a.return, s);
          }
        }
        break;
      case 27:
        t === null && l & 4 && _v(a);
      case 26:
      case 5:
        ha(e, a), t === null && l & 4 && hr(a), l & 512 && oa(a, a.return);
        break;
      case 12:
        ha(e, a);
        break;
      case 31:
        ha(e, a), l & 4 && Dv(e, a);
        break;
      case 13:
        ha(e, a), l & 4 && Rv(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = jy.bind(
          null,
          a
        ), n0(e, a))));
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
  function wr(e, t) {
    for (e = e.child; e !== null; )
      Av(e, t), e = e.sibling;
  }
  function Av(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var a = e.stateNode;
          if (t) {
            var l = a.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var n = e.stateNode, u = e.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
          }
        } catch (m) {
          Ee(e, e.return, m);
        }
        Er(e, t);
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
          t ? Sm(f, !0) : Sm(e.stateNode, !1);
        } catch (m) {
          Ee(e, e.return, m);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && wr(e, t);
        break;
      default:
        wr(e, t);
    }
  }
  function Er(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var a = e, l = t;
          switch (a.tag) {
            case 4:
              Av(a, l);
              break e;
            case 22:
              a.memoizedState === null && Er(a, l);
              break e;
            default:
              Er(a, l);
          }
        }
        e = e.sibling;
      }
  }
  function Cv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Cv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ii(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ue = null, bt = !1;
  function Wt(e, t, a) {
    for (a = a.child; a !== null; )
      zv(e, t, a), a = a.sibling;
  }
  function zv(e, t, a) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(Xn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Ne || ct(a, t), Wt(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !Ne && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Ne || ct(a, t), _u(a);
        var l = Ue, n = bt;
        cl(a.type) && (Ue = a.stateNode, bt = !1), Wt(
          e,
          t,
          a
        ), Om(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), Ue = l, bt = n;
        break;
      case 5:
        Ne || ct(a, t), _u(a);
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
        Ue !== null && (bt ? (e = Ue, _m(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Dn(e)) : _m(Ue, a.stateNode));
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
        el(2, a, t), Ne || el(4, a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 1:
        Ne || (ct(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && gv(
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
        ct(a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 7:
        Ne || ct(a, t), Wt(
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
  function Dv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Dn(e);
      } catch (a) {
        Ee(t, t.return, a);
      }
    }
  }
  function Rv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Dn(e);
      } catch (a) {
        Ee(t, t.return, a);
      }
  }
  function dy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new wv()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new wv()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ac(e, t) {
    var a = dy(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var n = Ty.bind(null, e, l);
        l.then(n, n);
      }
    });
  }
  function ht(e, t, a) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n], s = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (cl(m.type)) {
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
        zv(s, f, u), Ue = null, bt = !1, s = u.alternate, s !== null && (s.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Mv(t, e, a), t = t.sibling;
  }
  var It = null;
  function Mv(e, t, a) {
    var l = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (l = e.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var u = 0; u < l.length; u++) {
            var s = l[u];
            s.ref.impl = s.nextImpl;
          }
        ht(t, e, a), gt(e), n & 4 && (el(3, e, e.return), pu(3, e), el(5, e, e.return));
        break;
      case 1:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || ct(l, l.return)), n & 64 && et && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = It, ht(t, e, a), gt(e), n & 512 && (Ne || l === null || ct(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (et)
                  e.stateNode = gm(
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
                        )), st(l, t, a), l[lt] = e, Ie(l), t = l;
                        break e;
                      case "link":
                        if (u = Ym(
                          "link",
                          "href",
                          n
                        ).get(t + (a.href || ""))) {
                          for (s = 0; s < u.length; s++)
                            if (l = u[s], l.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && l.getAttribute("rel") === (a.rel == null ? null : a.rel) && l.getAttribute("title") === (a.title == null ? null : a.title) && l.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              u.splice(s, 1);
                              break t;
                            }
                        }
                        l = n.createElement(t), st(l, t, a), n.head.appendChild(l);
                        break;
                      case "meta":
                        if (u = Ym(
                          "meta",
                          "content",
                          n
                        ).get(t + (a.content || ""))) {
                          for (s = 0; s < u.length; s++)
                            if (l = u[s], l.getAttribute("content") === (a.content == null ? null : "" + a.content) && l.getAttribute("name") === (a.name == null ? null : a.name) && l.getAttribute("property") === (a.property == null ? null : a.property) && l.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && l.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              u.splice(s, 1);
                              break t;
                            }
                        }
                        l = n.createElement(t), st(l, t, a), n.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[lt] = e, Ie(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                et || fo(u, e.type, e.stateNode);
            else
              e.stateNode = Bm(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || Ne || t.parentNode.removeChild(t)) : n.count--, a === null ? et || fo(u, e.type, e.stateNode) : Bm(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && gr(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || ct(l, l.return)), l !== null && n & 4 && gr(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = va, va = !1, ht(t, e, a), va = u, gt(e), n & 512 && (Ne || l === null || ct(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Jl(t, ""), be = !0;
          } catch (E) {
            Ee(e, e.return, E);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, gr(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), n & 1024 && (Tr = !0);
        break;
      case 6:
        if (ht(t, e, a), gt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = t, be = !0;
          } catch (E) {
            Ee(e, e.return, E);
          }
        }
        break;
      case 3:
        if (be = !1, yc = null, u = It, It = Cu(t.containerInfo), ht(t, e, a), It = u, gt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Dn(t.containerInfo);
          } catch (E) {
            Ee(e, e.return, E);
          }
        Tr && (Tr = !1, Ov(e)), be = !1;
        break;
      case 4:
        n = va, va = et, l = Po(), u = It, It = Cu(
          e.stateNode.containerInfo
        ), ht(t, e, a), gt(e), It = u, be && Su && (ec = !0), be = l, va = n;
        break;
      case 12:
        ht(t, e, a), gt(e);
        break;
      case 31:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ac(e, t)));
        break;
      case 13:
        ht(t, e, a), gt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (uc = wt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ac(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, s = l !== null && l.memoizedState !== null;
        var f = et, m = Ne, b = va;
        et = f || u, va = b || u, Ne = m || s, ht(t, e, a), Ne = m, va = b, et = f, gt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || s || et || Ne || (t = s || Ne, a = et, l = Ne, et = u || et, Ne = t, tl(e, 2), et = a, Ne = l), !u && va || wr(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, ac(e, a))));
        break;
      case 19:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ac(e, t)));
        break;
      case 30:
        n & 512 && (Ne || l === null || ct(l, l.return)), n = Po(), u = Su, s = (a & 335544064) === a, f = e.memoizedProps, Su = s && wa(
          f.default,
          f.update
        ) !== "none", ht(t, e, a), gt(e), s && l !== null && be && (e.flags |= 4), Su = u, be = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Ne || l === null || ct(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        ht(t, e, a), gt(e);
    }
  }
  function gt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (pv(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var n = e.return; n !== null; ) {
          if (mr(n)) {
            var u = n.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (vr(n)) break;
          n = n.return;
        }
        var s = l;
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, m = yr(e);
            Fi(
              e,
              m,
              f,
              s
            );
            break;
          case 5:
            var b = a.stateNode;
            a.flags & 32 && (Jl(b, ""), a.flags &= -33);
            var E = yr(e);
            Fi(
              e,
              E,
              b,
              s
            );
            break;
          case 3:
          case 4:
            var M = a.stateNode.containerInfo, _ = yr(e);
            pr(
              e,
              _,
              M,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        Ee(e, e.return, T);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ov(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ov(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, zn = !0, t.reset(), zn = !1), e = e.sibling;
      }
  }
  function vn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Uv(t, e), t = t.sibling;
    else Nv(t);
  }
  function Uv(e, t) {
    var a = e.alternate;
    if (a === null) _r(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (Nr = ma = !1, bv(), vn(t, e), !ma && !ec) {
            if (e = fa, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                a = e[l];
                var n = e[l + 1];
                xm(a, e[l + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
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
            )), Nr = !0;
          }
          fa = null;
          break;
        case 5:
          vn(t, e);
          break;
        case 4:
          l = ma, ma = !1, vn(t, e), ma && (ec = !0), ma = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? _r(e, !1) : vn(t, e));
          break;
        case 30:
          l = ma, n = bv(), ma = !1, vn(t, e), ma && (e.flags |= 4);
          var u = e.memoizedProps, s = e.stateNode;
          t = Na(u, s), s = Na(a.memoizedProps, s);
          var f = wa(u.default, u.update);
          f === "none" ? t = !1 : (u = a.memoizedState, a.memoizedState = null, a = e.child, St = 0, t = jr(
            e,
            a,
            t,
            s,
            f,
            u,
            !0
          ), St !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Sn(
            e,
            e.memoizedProps.onUpdate
          ), fa = n) : n !== null && (n.push.apply(n, fa), fa = n), ma = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          vn(t, e);
      }
  }
  function ha(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ev(e, t.alternate, t), t = t.sibling;
  }
  function tl(e, t) {
    for (e = e.child; e !== null; ) {
      var a = e, l = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          el(4, a, a.return), tl(
            a,
            l
          );
          break;
        case 1:
          ct(a, a.return);
          var n = a.stateNode;
          typeof n.componentWillUnmount == "function" && gv(
            a,
            a.return,
            n
          ), tl(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Om(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          ct(a, a.return), a.tag !== 5 && a.tag !== 27 || _u(a), tl(
            a,
            l
          );
          break;
        case 6:
          _u(a);
          break;
        case 26:
          ct(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || Ne || n.parentNode.removeChild(n), tl(
            a,
            l
          );
          break;
        case 22:
          a.memoizedState === null && tl(
            a,
            l
          );
          break;
        case 30:
          ct(a, a.return), tl(
            a,
            l
          );
          break;
        case 7:
          ct(a, a.return);
        default:
          tl(
            a,
            l
          );
      }
      e = e.sibling;
    }
  }
  function Pt(e, t, a) {
    for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, u = t, s = u.flags, f = (a & 1) !== 0;
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
            } catch (E) {
              Ee(l, l.return, E);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var m = l.stateNode;
            try {
              var b = n.shared.hiddenCallbacks;
              if (b !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < b.length; n++)
                  ld(b[n], m);
            } catch (E) {
              Ee(l, l.return, E);
            }
          }
          f && s & 64 && hv(u), oa(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && _v(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || yv(u), Pt(
            n,
            u,
            a
          ), f && l === null && s & 4 && hr(u), oa(u, u.return);
          break;
        case 6:
          yv(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || et || fo(
            Cu(m.ownerDocument),
            u.type,
            m
          ), Pt(
            n,
            u,
            a
          ), f && l === null && s & 4 && hr(u), oa(u, u.return);
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
          ), f && s & 4 && Dv(n, u);
          break;
        case 13:
          Pt(
            n,
            u,
            a
          ), f && s & 4 && Rv(n, u);
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
  function Ar(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && uu(a));
  }
  function Cr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && uu(e));
  }
  function Zt(e, t, a, l) {
    var n = (a & 335544064) === a;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Hv(
          e,
          t,
          a,
          l
        ), t = t.sibling;
    else n && Tv(t);
  }
  function Hv(e, t, a, l) {
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
        ), n && Nr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && uu(u)));
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
            var s = t.memoizedProps, f = s.id, m = s.onPostCommit;
            typeof m == "function" && m(
              f,
              t.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (b) {
            Ee(t, t.return, b);
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
        s = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Pi(f), s._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : bu(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && Pi(t), s._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : (s._visibility |= 2, mn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Ar(f, t);
        break;
      case 24:
        Zt(
          e,
          t,
          a,
          l
        ), u & 2048 && Cr(t.alternate, t);
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
  function mn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, s = t, f = a, m = l, b = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          mn(
            u,
            s,
            f,
            m,
            n
          ), pu(8, s);
          break;
        case 23:
          break;
        case 22:
          var E = s.stateNode;
          s.memoizedState !== null ? E._visibility & 2 ? mn(
            u,
            s,
            f,
            m,
            n
          ) : bu(
            u,
            s
          ) : (E._visibility |= 2, mn(
            u,
            s,
            f,
            m,
            n
          )), n && b & 2048 && Ar(
            s.alternate,
            s
          );
          break;
        case 24:
          mn(
            u,
            s,
            f,
            m,
            n
          ), n && b & 2048 && Cr(s.alternate, s);
          break;
        default:
          mn(
            u,
            s,
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
            bu(a, l), n & 2048 && Ar(
              l.alternate,
              l
            );
            break;
          case 24:
            bu(a, l), n & 2048 && Cr(l.alternate, l);
            break;
          default:
            bu(a, l);
        }
        t = t.sibling;
      }
  }
  var Ol = 8192;
  function Ul(e, t, a) {
    if (e.subtreeFlags & Ol)
      for (e = e.child; e !== null; )
        Lv(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function Lv(e, t, a) {
    switch (e.tag) {
      case 26:
        Ul(
          e,
          t,
          a
        ), e.flags & Ol && (e.memoizedState !== null ? p0(
          a,
          It,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Zm(a, e)));
        break;
      case 5:
        Ul(
          e,
          t,
          a
        ), e.flags & Ol && (e = e.stateNode, (t & 335544128) === t && Zm(a, e));
        break;
      case 3:
      case 4:
        var l = It;
        It = Cu(e.stateNode.containerInfo), Ul(
          e,
          t,
          a
        ), It = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ol, Ol = 16777216, Ul(
          e,
          t,
          a
        ), Ol = l) : Ul(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & Ol) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, Rt === null && (Rt = /* @__PURE__ */ new Map()), Rt.set(l, n);
        }
        Ul(
          e,
          t,
          a
        );
        break;
      default:
        Ul(
          e,
          t,
          a
        );
    }
  }
  function qv(e) {
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
          tt = l, Yv(
            l,
            e
          );
        }
      qv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Bv(e), e = e.sibling;
  }
  function Bv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xu(e), e.flags & 2048 && el(9, e, e.return);
        break;
      case 3:
        xu(e);
        break;
      case 12:
        xu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, lc(e)) : xu(e);
        break;
      default:
        xu(e);
    }
  }
  function lc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Yv(
            l,
            e
          );
        }
      qv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          el(8, t, t.return), lc(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, lc(t));
          break;
        default:
          lc(t);
      }
      e = e.sibling;
    }
  }
  function Yv(e, t) {
    for (; tt !== null; ) {
      var a = tt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          el(8, a, t);
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
          if (Cv(l), l === a) {
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
  var vy = {
    getCacheForType: function(e) {
      var t = nt(Ze), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return nt(Ze).controller.signal;
    }
  }, my = typeof WeakMap == "function" ? WeakMap : Map, Te = 0, ze = null, fe = null, ve = 0, we = 0, Mt = null, al = !1, hn = !1, zr = !1, Ua = 0, Ye = 0, ll = 0, Hl = 0, nc = 0, Ot = 0, gn = 0, ju = null, xt = null, Dr = !1, uc = 0, Gv = 0, ic = 1 / 0, cc = null, nl = null, Le = 0, ea = null, Ll = null, ga = 0, Rr = 0, Mr = null, Qv = null, yn = null, pn = null, _n = null, Tu = 0, sc = null;
  function Ut() {
    return (Te & 2) !== 0 && ve !== 0 ? ve & -ve : k.T !== null ? Xr() : Zo();
  }
  function Xv() {
    if (Ot === 0)
      if ((ve & 536870912) === 0 || re) {
        var e = ai;
        ai <<= 1, (ai & 3932160) === 0 && (ai = 262144), Ot = e;
      } else Ot = 536870912;
    return e = ut.current, e !== null && (e.flags |= 32), Ot;
  }
  function Sn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = jm(
        Na(e.memoizedProps, a)
      )), pn === null && (pn = []), pn.push(t.bind(null, l));
    }
  }
  function jt(e, t, a) {
    (e === ze && (we === 2 || we === 9) || e.cancelPendingCommit !== null) && (bn(e, 0), ul(
      e,
      ve,
      Ot,
      !1
    )), Vn(e, a), ((Te & 2) === 0 || e !== ze) && (e === ze && ((Te & 2) === 0 && (Hl |= a), Ye === 4 && ul(
      e,
      ve,
      Ot,
      !1
    )), ya(e));
  }
  function Zv(e, t, a) {
    if ((Te & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Zn(e, t), n = l ? yy(e, t) : Ur(e, t, !0), u = l;
    do {
      if (n === 0) {
        hn && !l && ul(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !hy(a)) {
          n = Ur(e, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var s = 0;
          else
            s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var f = e;
              n = ju;
              var m = f.current.memoizedState.isDehydrated;
              if (m && (bn(f, s).flags |= 256), s = Ur(
                f,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (zr && !m) {
                  f.errorRecoveryDisabledLanes |= u, Hl |= u, n = 4;
                  break e;
                }
                u = xt, xt = n, u !== null && (xt === null ? xt = u : xt.push.apply(
                  xt,
                  u
                ));
              }
              n = s;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          bn(e, 0), ul(e, t, 0, !0);
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
              ul(
                l,
                t,
                Ot,
                !al
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
          if ((t & 62914560) === t && (n = uc + 300 - wt(), 10 < n)) {
            if (ul(
              l,
              t,
              Ot,
              !al
            ), ni(l, 0, !0) !== 0) break e;
            ga = t, l.timeoutHandle = eo(
              Vv.bind(
                null,
                l,
                a,
                xt,
                cc,
                Dr,
                t,
                Ot,
                Hl,
                gn,
                al,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Vv(
            l,
            a,
            xt,
            cc,
            Dr,
            t,
            Ot,
            Hl,
            gn,
            al,
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
  function Vv(e, t, a, l, n, u, s, f, m, b, E, M, _, T) {
    e.timeoutHandle = -1;
    var Y = t.subtreeFlags, K = (u & 335544064) === u;
    if (M = null, (K || Y & 8192 || (Y & 16785408) === 16785408) && (M = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ca
    }, Rt = null, Lv(
      t,
      u,
      M
    ), K && (Y = M, K = e.containerInfo, K = (K.nodeType === 9 ? K : K.ownerDocument).__reactViewTransition, K != null && (Y.count++, Y.waitingForViewTransition = !0, Y = Ru.bind(Y), K.finished.then(Y, Y))), Y = (u & 62914560) === u ? uc - wt() : (u & 4194048) === u ? Gv - wt() : 0, Y = _0(
      M,
      Y
    ), Y !== null)) {
      ga = u, e.cancelPendingCommit = Y(
        Pv.bind(
          null,
          e,
          t,
          u,
          a,
          l,
          n,
          s,
          f,
          m,
          b,
          E,
          M,
          null,
          _,
          T
        )
      ), ul(e, u, s, !b);
      return;
    }
    Pv(
      e,
      t,
      u,
      a,
      l,
      n,
      s,
      f,
      m,
      b,
      E,
      M
    );
  }
  function hy(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!zt(u(), n)) return !1;
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
  function ul(e, t, a, l) {
    t = Bo(e, t), t &= ~nc, t &= ~Hl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - At(n), s = 1 << u;
      l[u] = -1, n &= ~s;
    }
    a !== 0 && Go(e, a, t);
  }
  function rc() {
    return (Te & 6) === 0 ? (Nu(0), !1) : !0;
  }
  function Or() {
    if (fe !== null) {
      if (we === 0)
        var e = fe.return;
      else
        e = fe, Ca = Tl = null, Qs(e), cn = null, su = 0, e = fe;
      for (; e !== null; )
        mv(e.alternate, e), e = e.return;
      fe = null;
    }
  }
  function bn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, By(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ga = 0, Or(), ze = e, fe = a = Ea(e.current, null), ve = t, we = 0, Mt = null, al = !1, hn = Zn(e, t), zr = !1, gn = Ot = nc = Hl = ll = Ye = 0, xt = ju = null, Dr = !1, Ua = Bo(e, t), yi(), a;
  }
  function Kv(e, t) {
    ue = null, k.H = Qi, t === un || t === Ai ? (t = Pf(), we = 3) : t === Cs ? (t = Pf(), we = 4) : we = t === lr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Mt = t, fe === null && (Ye = 1, Xi(
      e,
      Yt(t, e.current)
    ));
  }
  function Jv() {
    var e = ut.current;
    return e === null ? !0 : (ve & 4194048) === ve ? ft === null : (ve & 62914560) === ve || (ve & 536870912) !== 0 ? e === ft : !1;
  }
  function kv() {
    var e = k.H;
    return k.H = Qi, e === null ? Qi : e;
  }
  function $v() {
    var e = k.A;
    return k.A = vy, e;
  }
  function oc() {
    Ye = 4, al || (ve & 4194048) !== ve && ut.current !== null || (hn = !0), (ll & 134217727) === 0 && (Hl & 134217727) === 0 || ze === null || ul(
      ze,
      ve,
      Ot,
      !1
    );
  }
  function Ur(e, t, a) {
    var l = Te;
    Te |= 2;
    var n = kv(), u = $v();
    (ze !== e || ve !== t) && (cc = null, bn(e, t)), t = !1;
    var s = Ye;
    e: do
      try {
        if (we !== 0 && fe !== null) {
          var f = fe, m = Mt;
          switch (we) {
            case 8:
              Or(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ut.current === null && (t = !0);
              var b = we;
              if (we = 0, Mt = null, xn(e, f, m, b), a && hn) {
                s = 0;
                break e;
              }
              break;
            default:
              b = we, we = 0, Mt = null, xn(e, f, m, b);
          }
        }
        gy(), s = Ye;
        break;
      } catch (E) {
        Kv(e, E);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ca = Tl = null, Te = l, k.H = n, k.A = u, fe === null && (ze = null, ve = 0, yi()), s;
  }
  function gy() {
    for (; fe !== null; ) Fv(fe);
  }
  function yy(e, t) {
    var a = Te;
    Te |= 2;
    var l = kv(), n = $v();
    ze !== e || ve !== t ? (cc = null, ic = wt() + 500, bn(e, t)) : hn = Zn(
      e,
      t
    );
    e: do
      try {
        if (we !== 0 && fe !== null) {
          t = fe;
          var u = Mt;
          t: switch (we) {
            case 1:
              we = 0, Mt = null, xn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Wf(u)) {
                we = 0, Mt = null, Wv(t);
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
              Wf(u) ? (we = 0, Mt = null, Wv(t)) : (we = 0, Mt = null, xn(e, t, u, 7));
              break;
            case 5:
              var s = null;
              switch (fe.tag) {
                case 26:
                  s = fe.memoizedState;
                case 5:
                case 27:
                  var f = fe;
                  if (s ? Qm(s) : f.stateNode.complete) {
                    we = 0, Mt = null;
                    var m = f.sibling;
                    if (m !== null) fe = m;
                    else {
                      var b = f.return;
                      b !== null ? (fe = b, fc(b)) : fe = null;
                    }
                    break t;
                  }
              }
              we = 0, Mt = null, xn(e, t, u, 5);
              break;
            case 6:
              we = 0, Mt = null, xn(e, t, u, 6);
              break;
            case 8:
              Or(), Ye = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        py();
        break;
      } catch (E) {
        Kv(e, E);
      }
    while (!0);
    return Ca = Tl = null, k.H = l, k.A = n, Te = a, fe !== null ? 0 : (ze = null, ve = 0, yi(), Ye);
  }
  function py() {
    for (; fe !== null && !Uh(); )
      Fv(fe);
  }
  function Fv(e) {
    var t = dv(e.alternate, e, Ua);
    e.memoizedProps = e.pendingProps, t === null ? fc(e) : fe = t;
  }
  function Wv(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = uv(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ve
        );
        break;
      case 11:
        t = uv(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ve
        );
        break;
      case 5:
        Qs(t);
        var l = t;
        l === Pe && (re ? (ji(l), l.tag === 5 && l.stateNode != null && (Me = l.stateNode)) : (ji(l), re = !0));
      default:
        mv(a, t), t = fe = Yf(t, Ua), t = dv(a, t, Ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? fc(e) : fe = t;
  }
  function xn(e, t, a, l) {
    Ca = Tl = null, Qs(t), cn = null, su = 0;
    var n = t.return;
    try {
      if (uy(
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
    t.flags & 32768 ? (re || l === 1 ? e = !0 : hn || (ve & 536870912) !== 0 ? e = !1 : (al = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = ut.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Iv(t, e)) : fc(t);
  }
  function fc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Iv(
          t,
          al
        );
        return;
      }
      e = t.return;
      var a = ry(
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
  function Iv(e, t) {
    do {
      var a = oy(e.alternate, e);
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
  function Pv(e, t, a, l, n, u, s, f, m, b, E, M) {
    e.cancelPendingCommit = null;
    do
      dc();
    while (Le !== 0);
    if ((Te & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === ze && (fe = ze = null, ve = 0), Ll = t, ea = e, ga = a, Mr = n, Qv = l, _y(
        e,
        t,
        a,
        s,
        f,
        m,
        M
      );
    }
  }
  function _y(e, t, a, l, n, u, s) {
    var f = t.lanes | t.childLanes;
    if (Rr = f, f |= gs, Vh(
      e,
      a,
      f,
      l,
      n,
      u
    ), pn = null, (a & 335544064) === a ? (_n = Jg(e), l = 10262) : (_n = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Ny(ei, function() {
      return Br(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Wi = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = k.T, k.T = null, n = ae.p, ae.p = 2, u = Te, Te |= 4;
      try {
        fy(e, t, a);
      } finally {
        Te = u, ae.p = n, k.T = l;
      }
    }
    Le = 1, Wi ? yn = Vy(
      s,
      e.containerInfo,
      _n,
      Hr,
      Lr,
      by,
      qr,
      Br,
      Sy
    ) : (Hr(), Lr(), qr());
  }
  function Sy(e) {
    if (Le !== 0) {
      var t = ea.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function by() {
    Le === 3 && (Le = 0, Uv(Ll, ea), Le = 4);
  }
  function Hr() {
    if (Le === 1) {
      Le = 0;
      var e = ea, t = Ll, a = ga, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null;
        var n = ae.p;
        ae.p = 2;
        var u = Te;
        Te |= 4;
        try {
          Su = ec = !1, Mv(t, e, a), a = Wr;
          var s = zf(e.containerInfo), f = a.focusedElem, m = a.selectionRange;
          if (s !== f && f && f.ownerDocument && Cf(
            f.ownerDocument.documentElement,
            f
          )) {
            if (m !== null && fs(f)) {
              var b = m.start, E = m.end;
              if (E === void 0 && (E = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  E,
                  f.value.length
                );
              else {
                var M = f.ownerDocument || document, _ = M && M.defaultView || window;
                if (_.getSelection) {
                  var T = _.getSelection(), Y = f.textContent.length, K = Math.min(m.start, Y), ie = m.end === void 0 ? K : Math.min(m.end, Y);
                  !T.extend && K > ie && (s = ie, ie = K, K = s);
                  var S = Af(
                    f,
                    K
                  ), g = Af(
                    f,
                    ie
                  );
                  if (S && g && (T.rangeCount !== 1 || T.anchorNode !== S.node || T.anchorOffset !== S.offset || T.focusNode !== g.node || T.focusOffset !== g.offset)) {
                    var j = M.createRange();
                    j.setStart(S.node, S.offset), T.removeAllRanges(), K > ie ? (T.addRange(j), T.extend(g.node, g.offset)) : (j.setEnd(g.node, g.offset), T.addRange(j));
                  }
                }
              }
            }
            for (M = [], T = f; T = T.parentNode; )
              T.nodeType === 1 && M.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < M.length; f++) {
              var R = M[f];
              R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
            }
          }
          zn = !!Fr, Wr = Fr = null;
        } finally {
          Te = u, ae.p = n, k.T = l;
        }
      }
      e.current = t, Le = 2;
    }
  }
  function Lr() {
    if (Le === 2) {
      Le = 0;
      var e = ea, t = Ll, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = k.T, k.T = null;
        var l = ae.p;
        ae.p = 2;
        var n = Te;
        Te |= 4;
        try {
          Ev(e, t.alternate, t);
        } finally {
          Te = n, ae.p = l, k.T = a;
        }
      }
      Le = 3;
    }
  }
  function qr() {
    if (Le === 4 || Le === 3) {
      Le = 0;
      var e = yn;
      yn = null, Hh();
      var t = ea, a = Ll, l = ga, n = Qv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? Le = 5 : (Le = 0, Ll = ea = null, em(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (nl = null), Jc(l), a = a.stateNode, Et && typeof Et.onCommitFiberRoot == "function")
        try {
          Et.onCommitFiberRoot(
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
          for (var s = t.onRecoverableError, f = 0; f < n.length; f++) {
            var m = n[f];
            s(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          k.T = a, ae.p = u;
        }
      }
      if (n = pn, s = _n, _n = null, n !== null && (pn = null, s === null && (s = []), e !== null))
        for (m = 0; m < n.length; m++)
          a = (0, n[m])(
            s
          ), a !== void 0 && e.finished.finally(a);
      (ga & 3) !== 0 && dc(), ya(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === sc ? Tu++ : (Tu = 0, sc = t) : (Tu = 0, sc = null), Nu(0);
    }
  }
  function em(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, uu(t)));
  }
  function dc() {
    return yn !== null && (yn.skipTransition(), yn = null), Hr(), Lr(), qr(), Br();
  }
  function Br() {
    if (Le !== 5) return !1;
    var e = ea, t = Rr;
    Rr = 0;
    var a = Jc(ga), l = k.T, n = ae.p;
    try {
      ae.p = 32 > a ? 32 : a, k.T = null, a = Mr, Mr = null;
      var u = ea, s = ga;
      if (Le = 0, Ll = ea = null, ga = 0, (Te & 6) !== 0) throw Error(o(331));
      var f = Te;
      if (Te |= 4, Bv(u.current), Hv(
        u,
        u.current,
        s,
        a
      ), Te = f, Nu(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
        try {
          Et.onPostCommitFiberRoot(Xn, u);
        } catch {
        }
      return !0;
    } finally {
      ae.p = n, k.T = l, em(e, t);
    }
  }
  function tm(e, t, a) {
    t = Yt(a, t), t = ar(e.stateNode, t, 2), e = Fa(e, t, 2), e !== null && (Vn(e, 2), ya(e));
  }
  function Ee(e, t, a) {
    if (e.tag === 3)
      tm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          tm(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (nl === null || !nl.has(l))) {
            e = Yt(a, e), a = Wd(2), l = Fa(t, a, 2), l !== null && (Id(
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
  function Yr(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new my();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (zr = !0, n.add(a), e = xy.bind(null, e, t, a), t.then(e, e));
  }
  function xy(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, ze === e && (ve & a) === a && ((Ye === 4 || Ye === 3 && (ve & 62914560) === ve && 300 > wt() - uc) && (Te & 2) === 0 ? bn(e, 0) : nc |= a, gn === ve && (gn = 0)), ya(e);
  }
  function am(e, t) {
    t === 0 && (t = Yo()), e = bl(e, t), e !== null && (Vn(e, t), ya(e));
  }
  function jy(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), am(e, a);
  }
  function Ty(e, t) {
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
    l !== null && l.delete(t), am(e, a);
  }
  function Ny(e, t) {
    return Xc(e, t);
  }
  var jn = null, Tn = null, Gr = !1, vc = !1, Qr = !1, il = 0;
  function ya(e) {
    e !== Tn && e.next === null && (Tn === null ? jn = Tn = e : Tn = Tn.next = e), vc = !0, Gr || (Gr = !0, Ey());
  }
  function Nu(e, t) {
    if (!Qr && vc) {
      Qr = !0;
      do
        for (var a = !1, l = jn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var s = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - At(42 | e) + 1) - 1, u &= n & ~(s & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, im(l, u));
          } else
            u = ve, u = ni(
              l,
              l === ze ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Zn(l, u) || (a = !0, im(l, u));
          l = l.next;
        }
      while (a);
      Qr = !1;
    }
  }
  function wy() {
    lm();
  }
  function lm() {
    vc = Gr = !1;
    var e = 0;
    il !== 0 && qy() && (e = il);
    for (var t = wt(), a = null, l = jn; l !== null; ) {
      var n = l.next, u = nm(l, t);
      u === 0 ? (l.next = null, a === null ? jn = n : a.next = n, n === null && (Tn = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (vc = !0)), l = n;
    }
    Le !== 0 && Le !== 5 || Nu(e), il !== 0 && (il = 0);
  }
  function nm(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var s = 31 - At(u), f = 1 << s, m = n[s];
      m === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[s] = Zh(f, t)) : m <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = ze, a = ve, a = ni(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (we === 2 || we === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Zc(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Zn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Zc(l), Jc(a)) {
        case 2:
        case 8:
          a = Lo;
          break;
        case 32:
          a = ei;
          break;
        case 268435456:
          a = qo;
          break;
        default:
          a = ei;
      }
      return l = um.bind(null, e), a = Xc(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Zc(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function um(e, t) {
    if (Le !== 0 && Le !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (dc() && e.callbackNode !== a)
      return null;
    var l = ve;
    return l = ni(
      e,
      e === ze ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Zv(e, l, t), nm(e, wt()), e.callbackNode != null && e.callbackNode === a ? um.bind(null, e) : null);
  }
  function im(e, t) {
    if (dc()) return null;
    Zv(e, t, !0);
  }
  function Ey() {
    Yy(function() {
      (Te & 6) !== 0 ? Xc(
        Ho,
        wy
      ) : lm();
    });
  }
  function Xr() {
    if (il === 0) {
      var e = El;
      e === 0 && (e = ti, ti <<= 1, (ti & 261888) === 0 && (ti = 256)), il = e;
    }
    return il;
  }
  function cm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ri(e);
  }
  function Ay(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = cm(
        (n[pt] || null).action
      ), s = l.submitter;
      s && (t = (t = s[pt] || null) ? cm(t.formAction) : s.getAttribute("formAction"), t !== null && (u = t, s = null));
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
                if (il !== 0) {
                  var m = new FormData(n, s);
                  Ws(
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
                typeof u == "function" && (f.preventDefault(), m = new FormData(n, s), Ws(
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
  for (var Zr = 0; Zr < hs.length; Zr++) {
    var Vr = hs[Zr], Cy = Vr.toLowerCase(), zy = Vr[0].toUpperCase() + Vr.slice(1);
    Ft(
      Cy,
      "on" + zy
    );
  }
  Ft(Mf, "onAnimationEnd"), Ft(Of, "onAnimationIteration"), Ft(Uf, "onAnimationStart"), Ft("dblclick", "onDoubleClick"), Ft("focusin", "onFocus"), Ft("focusout", "onBlur"), Ft(Bg, "onTransitionRun"), Ft(Yg, "onTransitionStart"), Ft(Gg, "onTransitionCancel"), Ft(Hf, "onTransitionEnd"), Vl("onMouseEnter", ["mouseout", "mouseover"]), Vl("onMouseLeave", ["mouseout", "mouseover"]), Vl("onPointerEnter", ["pointerout", "pointerover"]), Vl("onPointerLeave", ["pointerout", "pointerover"]), pl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), pl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), pl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), pl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), pl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), pl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Dy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wu)
  );
  function sm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], n = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var s = l.length - 1; 0 <= s; s--) {
            var f = l[s], m = f.instance, b = f.currentTarget;
            if (f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (E) {
              gi(E);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (f = l[s], m = f.instance, b = f.currentTarget, f = f.listener, m !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (E) {
              gi(E);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function de(e, t) {
    var a = t[Ko];
    a === void 0 && (a = t[Ko] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (rm(t, e, 2, !1), a.add(l));
  }
  function Kr(e, t, a) {
    var l = 0;
    t && (l |= 4), rm(
      a,
      e,
      l,
      t
    );
  }
  var mc = "_reactListening" + Math.random().toString(36).slice(2);
  function Jr(e) {
    if (!e[mc]) {
      e[mc] = !0, $o.forEach(function(a) {
        a !== "selectionchange" && (Dy.has(a) || Kr(a, !1, e), Kr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[mc] || (t[mc] = !0, Kr("selectionchange", !1, t));
    }
  }
  function rm(e, t, a, l) {
    switch (Im(t)) {
      case 2:
        var n = j0;
        break;
      case 8:
        n = T0;
        break;
      default:
        n = mo;
    }
    a = n.bind(
      null,
      t,
      a,
      e
    ), n = void 0, !ts || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function kr(e, t, a, l, n) {
    var u = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var f = l.stateNode.containerInfo;
          if (f === n) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var m = s.tag;
              if ((m === 3 || m === 4) && s.stateNode.containerInfo === n)
                return;
              s = s.return;
            }
          for (; f !== null; ) {
            if (s = yl(f), s === null) return;
            if (m = s.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              l = u = s;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l.return;
      }
    rf(function() {
      var b = u, E = Pc(a), M = [];
      e: {
        var _ = Lf.get(e);
        if (_ !== void 0) {
          var T = vi, Y = e;
          switch (e) {
            case "keypress":
              if (fi(a) === 0) break e;
            case "keydown":
            case "keyup":
              T = hg;
              break;
            case "focusin":
              Y = "focus", T = us;
              break;
            case "focusout":
              Y = "blur", T = us;
              break;
            case "beforeblur":
            case "afterblur":
              T = us;
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
              T = df;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = lg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = Sg;
              break;
            case Mf:
            case Of:
            case Uf:
              T = ig;
              break;
            case Hf:
              T = xg;
              break;
            case "scroll":
            case "scrollend":
              T = tg;
              break;
            case "wheel":
              T = Tg;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = sg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = mf;
              break;
            case "submit":
              T = pg;
              break;
            case "toggle":
            case "beforetoggle":
              T = wg;
          }
          var K = (t & 4) !== 0, ie = !K && (e === "scroll" || e === "scrollend"), S = K ? _ !== null ? _ + "Capture" : null : _;
          K = [];
          for (var g = b, j; g !== null; ) {
            var R = g;
            if (j = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || j === null || S === null || (R = kn(g, S), R != null && K.push(
              Eu(g, R, j)
            )), ie) break;
            g = g.return;
          }
          0 < K.length && (_ = new T(
            _,
            Y,
            null,
            a,
            E
          ), M.push({ event: _, listeners: K }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", _ = e === "mouseout" || e === "pointerout", T && a !== Ic && (Y = a.relatedTarget || a.fromElement) && (yl(Y) || Y[Ql]))
            break e;
          (_ || T) && (Y = E.window === E ? E : (T = E.ownerDocument) ? T.defaultView || T.parentWindow : window, _ ? (T = a.relatedTarget || a.toElement, _ = b, T = T ? yl(T) : null, T !== null && (ie = h(T), K = T.tag, T !== ie || K !== 5 && K !== 27 && K !== 6) && (T = null)) : (_ = null, T = b), _ !== T && (K = df, R = "onMouseLeave", S = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (K = mf, R = "onPointerLeave", S = "onPointerEnter", g = "pointer"), ie = _ == null ? Y : Jn(_), j = T == null ? Y : Jn(T), Y = new K(
            R,
            g + "leave",
            _,
            a,
            E
          ), Y.target = ie, Y.relatedTarget = j, R = null, yl(E) === b && (K = new K(
            S,
            g + "enter",
            T,
            a,
            E
          ), K.target = j, K.relatedTarget = ie, R = K), ie = R, K = _ && T ? ee(
            _,
            T,
            Ry
          ) : null, _ !== null && om(
            M,
            Y,
            _,
            K,
            !1
          ), T !== null && ie !== null && om(
            M,
            ie,
            T,
            K,
            !0
          )));
        }
        e: {
          if (_ = b ? Jn(b) : window, T = _.nodeName && _.nodeName.toLowerCase(), T === "select" || T === "input" && _.type === "file")
            var Z = xf;
          else if (Sf(_))
            if (jf)
              Z = Hg;
            else {
              Z = Og;
              var me = Mg;
            }
          else
            T = _.nodeName, !T || T.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? b && Wc(b.elementType) && (Z = xf) : Z = Ug;
          if (Z && (Z = Z(e, b))) {
            bf(
              M,
              Z,
              a,
              E
            );
            break e;
          }
          me && me(e, _, b);
        }
        switch (me = b ? Jn(b) : window, e) {
          case "focusin":
            (Sf(me) || me.contentEditable === "true") && (Wl = me, ds = b, au = null);
            break;
          case "focusout":
            au = ds = Wl = null;
            break;
          case "mousedown":
            vs = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vs = !1, Df(M, a, E);
            break;
          case "selectionchange":
            if (qg) break;
          case "keydown":
          case "keyup":
            Df(M, a, E);
        }
        var $;
        if (cs)
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
          Fl ? pf(e, a) && (P = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (P = "onCompositionStart");
        P && (hf && a.locale !== "ko" && (Fl || P !== "onCompositionStart" ? P === "onCompositionEnd" && Fl && ($ = of()) : (Ga = E, as = "value" in Ga ? Ga.value : Ga.textContent, Fl = !0)), me = hc(b, P), 0 < me.length && (P = new vf(
          P,
          e,
          null,
          a,
          E
        ), M.push({ event: P, listeners: me }), $ ? P.data = $ : ($ = _f(a), $ !== null && (P.data = $)))), ($ = Ag ? Cg(e, a) : zg(e, a)) && (P = hc(b, "onBeforeInput"), 0 < P.length && (me = new vf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          E
        ), M.push({
          event: me,
          listeners: P
        }), me.data = $)), Ay(
          M,
          e,
          b,
          a,
          E
        );
      }
      sm(M, t);
    });
  }
  function Eu(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function hc(e, t) {
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
  function Ry(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function om(e, t, a, l, n) {
    for (var u = t._reactName, s = []; a !== null && a !== l; ) {
      var f = a, m = f.alternate, b = f.stateNode;
      if (f = f.tag, m !== null && m === l) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (m = b, n ? (b = kn(a, u), b != null && s.unshift(
        Eu(a, b, m)
      )) : n || (b = kn(a, u), b != null && s.push(
        Eu(a, b, m)
      ))), a = a.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var My = /\r\n?/g, Oy = /\u0000|\uFFFD/g;
  function fm(e) {
    return (typeof e == "string" ? e : "" + e).replace(My, `
`).replace(Oy, "");
  }
  function dm(e, t) {
    return t = fm(t), fm(e) === t;
  }
  function Ae(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || Jl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && Jl(e, "" + l);
        else return;
        break;
      case "className":
        si(e, "class", l);
        break;
      case "tabIndex":
        si(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        si(e, a, l);
        break;
      case "style":
        cf(e, l, u);
        return;
      case "data":
        if (t !== "object") {
          si(e, "data", l);
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
        l != null && (e.onclick = ca);
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
        de("beforetoggle", e), de("toggle", e), ci(e, "popover", l);
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
        ci(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = Ph.get(a) || a, ci(e, a, l);
        else return;
    }
    be = !0;
  }
  function $r(e, t, a, l, n, u) {
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
        if (typeof l == "string") Jl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          Jl(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && de("scroll", e);
        return;
      case "onScrollEnd":
        l != null && de("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = ca);
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
        if (!Fo.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), u = a.slice(2, n ? a.length - 7 : void 0), t = e[pt] || null, t = t != null ? t[a] : null, typeof t == "function" && e.removeEventListener(u, t, n), typeof l == "function")) {
              typeof t != "function" && t !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(u, l, n);
              break e;
            }
            be = !0, a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ci(e, a, l);
          }
        return;
    }
    be = !0;
  }
  function st(e, t, a) {
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
            var s = a[u];
            if (s != null)
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
                  Ae(e, t, u, s, a, null);
              }
          }
        n && Ae(e, t, "srcSet", a.srcSet, a, null), l && Ae(e, t, "src", a.src, a, null);
        return;
      case "input":
        de("invalid", e);
        var f = u = s = n = null, m = null, b = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var E = a[l];
            if (E != null)
              switch (l) {
                case "name":
                  n = E;
                  break;
                case "type":
                  s = E;
                  break;
                case "checked":
                  m = E;
                  break;
                case "defaultChecked":
                  b = E;
                  break;
                case "value":
                  u = E;
                  break;
                case "defaultValue":
                  f = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ae(e, t, l, E, a, null);
              }
          }
        af(
          e,
          u,
          f,
          m,
          b,
          s,
          n,
          !1
        );
        return;
      case "select":
        de("invalid", e), l = s = u = null;
        for (n in a)
          if (a.hasOwnProperty(n) && (f = a[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                s = f;
                break;
              case "multiple":
                l = f;
              default:
                Ae(e, t, n, f, a, null);
            }
        t = u, a = s, e.multiple = !!l, t != null ? Kl(e, !!l, t, !1) : a != null && Kl(e, !!l, a, !0);
        return;
      case "textarea":
        de("invalid", e), u = n = l = null;
        for (s in a)
          if (a.hasOwnProperty(s) && (f = a[s], f != null))
            switch (s) {
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
                Ae(e, t, s, f, a, null);
            }
        nf(e, l, n, u);
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
        for (b in a)
          if (a.hasOwnProperty(b) && (l = a[b], l != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ae(e, t, b, l, a, null);
            }
        return;
      default:
        if (Wc(t)) {
          for (E in a)
            a.hasOwnProperty(E) && (l = a[E], l !== void 0 && $r(
              e,
              t,
              E,
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
  var Uy = {};
  function Hy(e, t, a, l) {
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
        var n = null, u = null, s = null, f = null, m = null, b = null, E = null;
        for (T in a) {
          var M = a[T];
          if (a.hasOwnProperty(T) && M != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = M;
              default:
                l.hasOwnProperty(T) || Ae(e, t, T, null, l, M);
            }
        }
        for (var _ in l) {
          var T = l[_];
          if (M = a[_], l.hasOwnProperty(_) && (T != null || M != null))
            switch (_) {
              case "type":
                T !== M && (be = !0), u = T;
                break;
              case "name":
                T !== M && (be = !0), n = T;
                break;
              case "checked":
                T !== M && (be = !0), b = T;
                break;
              case "defaultChecked":
                T !== M && (be = !0), E = T;
                break;
              case "value":
                T !== M && (be = !0), s = T;
                break;
              case "defaultValue":
                T !== M && (be = !0), f = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(o(137, t));
                break;
              default:
                T !== M && Ae(
                  e,
                  t,
                  _,
                  T,
                  l,
                  M
                );
            }
        }
        $c(
          e,
          s,
          f,
          m,
          b,
          E,
          u,
          n
        );
        return;
      case "select":
        T = s = f = _ = null;
        for (u in a)
          if (m = a[u], a.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = m;
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
                u !== m && (be = !0), s = u;
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
        t = f, a = s, l = T, _ != null ? Kl(e, !!a, _, !1) : !!l != !!a && (t != null ? Kl(e, !!a, t, !0) : Kl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        T = _ = null;
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
        for (s in l)
          if (n = l[s], u = a[s], l.hasOwnProperty(s) && (n != null || u != null))
            switch (s) {
              case "value":
                n !== u && (be = !0), _ = n;
                break;
              case "defaultValue":
                n !== u && (be = !0), T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ae(e, t, s, n, l, u);
            }
        lf(e, _, T);
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
          if (_ = l[m], T = a[m], l.hasOwnProperty(m) && _ !== T && (_ != null || T != null))
            switch (m) {
              case "selected":
                _ !== T && (be = !0), e.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                Ae(
                  e,
                  t,
                  m,
                  _,
                  l,
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
        for (var K in a)
          _ = a[K], a.hasOwnProperty(K) && _ != null && !l.hasOwnProperty(K) && Ae(e, t, K, null, l, _);
        for (b in l)
          if (_ = l[b], T = a[b], l.hasOwnProperty(b) && _ !== T && (_ != null || T != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(o(137, t));
                break;
              default:
                Ae(
                  e,
                  t,
                  b,
                  _,
                  l,
                  T
                );
            }
        return;
      default:
        if (Wc(t)) {
          for (var ie in a)
            _ = a[ie], a.hasOwnProperty(ie) && _ !== void 0 && !l.hasOwnProperty(ie) && $r(
              e,
              t,
              ie,
              void 0,
              l,
              _
            );
          for (E in l)
            _ = l[E], T = a[E], !l.hasOwnProperty(E) || _ === T || _ === void 0 && T === void 0 || $r(
              e,
              t,
              E,
              _,
              l,
              T
            );
          return;
        }
    }
    for (var S in a)
      _ = a[S], a.hasOwnProperty(S) && _ != null && !l.hasOwnProperty(S) && Ae(e, t, S, null, l, _);
    for (M in l)
      _ = l[M], T = a[M], !l.hasOwnProperty(M) || _ === T || _ == null && T == null || Ae(e, t, M, _, l, T);
  }
  function vm(e) {
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
  function Ly() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, s = n.initiatorType, f = n.duration;
        if (u && f && vm(s)) {
          for (s = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var m = a[l], b = m.startTime;
            if (b > f) break;
            var E = m.transferSize, M = m.initiatorType;
            E && vm(M) && (m = m.responseEnd, s += E * (m < f ? 1 : (f - b) / (m - b)));
          }
          if (--l, t += 8 * (u + s) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Fr = null, Wr = null;
  function Au(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function mm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function hm(e, t) {
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
  function gm(e, t, a, l) {
    return a = Au(
      a
    ).createElement(e), a[lt] = l, a[pt] = t, st(a, e, t), Ie(a), a;
  }
  function Ir(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Pr = null;
  function qy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Pr ? !1 : (Pr = e, !0) : (Pr = null, !1);
  }
  var eo = typeof setTimeout == "function" ? setTimeout : void 0, By = typeof clearTimeout == "function" ? clearTimeout : void 0, ym = typeof Promise == "function" ? Promise : void 0, pm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : eo, Yy = typeof queueMicrotask == "function" ? queueMicrotask : typeof ym < "u" ? function(e) {
    return ym.resolve(null).then(e).catch(Gy);
  } : eo;
  function Gy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function cl(e) {
    return e === "head";
  }
  function _m(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), Dn(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          so(
            e.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = e.ownerDocument.head, so(a);
          for (var u = a.firstChild; u; ) {
            var s = u.nextSibling, f = u.nodeName;
            u[Kn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = s;
          }
        } else
          a === "body" && so(e.ownerDocument.body);
      a = n;
    } while (a);
    Dn(t);
  }
  function Sm(e, t) {
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
  function bm(e, t, a) {
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
  function xm(e, t) {
    e = e.style, t = t.style;
    var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (a = t.display, e.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin, a != null ? e.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = a == null || typeof a == "boolean" ? "" : a, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Qy(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function to(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Qy(t, a, e);
  }
  function Xy(e) {
    return e.documentElement.clientHeight;
  }
  function Zy(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Vy(e, t, a, l, n, u, s, f, m) {
    var b = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var E = b.startViewTransition({
        update: function() {
          var _ = b.defaultView, T = _.navigation && _.navigation.transition, Y = b.fonts.status;
          l();
          var K = [];
          if (Y === "loaded" && (Xy(b), b.fonts.status === "loading" && K.push(b.fonts.ready)), Y = K.length, e !== null)
            for (var ie = e.suspenseyImages, S = 0, g = 0; g < ie.length; g++) {
              var j = ie[g];
              if (!j.complete) {
                var R = j.getBoundingClientRect();
                if (0 < R.bottom && 0 < R.right && R.top < _.innerHeight && R.left < _.innerWidth) {
                  if (S += Xm(j), S > pc) {
                    K.length = Y;
                    break;
                  }
                  j = new Promise(
                    Zy.bind(j)
                  ), K.push(j);
                }
              }
            }
          if (0 < K.length)
            return _ = Promise.race([
              Promise.all(K),
              new Promise(function(Z) {
                return setTimeout(Z, 500);
              })
            ]).then(n, n), (T ? Promise.allSettled([T.finished, _]) : _).then(u, u);
          if (n(), T)
            return T.finished.then(
              u,
              u
            );
          u();
        },
        types: a
      });
      b.__reactViewTransition = E;
      var M = [];
      return E.ready.then(
        function() {
          for (var _ = b.documentElement.getAnimations({
            subtree: !0
          }), T = 0; T < _.length; T++) {
            var Y = _[T], K = Y.effect, ie = K.pseudoElement;
            if (ie != null && ie.startsWith("::view-transition")) {
              M.push(Y), Y = K.getKeyframes();
              for (var S = ie = void 0, g = !0, j = 0; j < Y.length; j++) {
                var R = Y[j], Z = R.width;
                if (ie === void 0) ie = Z;
                else if (ie !== Z) {
                  g = !1;
                  break;
                }
                if (Z = R.height, S === void 0) S = Z;
                else if (S !== Z) {
                  g = !1;
                  break;
                }
                delete R.width, delete R.height, R.transform === "none" && delete R.transform;
              }
              g && ie !== void 0 && S !== void 0 && (K.setKeyframes(Y), g = getComputedStyle(
                K.target,
                K.pseudoElement
              ), g.width !== ie || g.height !== S) && (g = Y[0], g.width = ie, g.height = S, g = Y[Y.length - 1], g.width = ie, g.height = S, K.setKeyframes(Y));
            }
          }
          s();
        },
        function(_) {
          b.__reactViewTransition === E && (b.__reactViewTransition = null);
          try {
            if (typeof _ == "object" && _ !== null)
              switch (_.name) {
                case "InvalidStateError":
                  (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null);
              }
            _ !== null && m(_);
          } finally {
            l(), n(), s();
          }
        }
      ), E.finished.finally(function() {
        for (var _ = 0; _ < M.length; _++)
          M[_].cancel();
        b.__reactViewTransition === E && (b.__reactViewTransition = null), f();
      }), E;
    } catch {
      return l(), n(), s(), null;
    }
  }
  function ql(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  ql.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : I({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, ql.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, ql.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function jm(e) {
    return {
      name: e,
      group: new ql("group", e),
      imagePair: new ql("image-pair", e),
      old: new ql("old", e),
      new: new ql("new", e)
    };
  }
  function Ht(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Ht.prototype.addEventListener = function(e, t, a) {
    var l = null, n = null;
    if (!(a != null && typeof a != "boolean" && (l = a.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (Nm(u, e, t, a) === -1) {
        var s = this, f = t;
        a != null && typeof a != "boolean" && a.once === !0 && (f = function(m) {
          s.removeEventListener(
            e,
            t,
            a
          ), typeof t == "function" ? t.call(this, m) : t.handleEvent(m);
        }), l !== null && (n = s.removeEventListener.bind(
          s,
          e,
          t,
          a
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = Nn(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), y(
          this._fragmentFiber.child,
          !1,
          Ky,
          e,
          f,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function Ky(e, t, a, l) {
    return q(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Ht.prototype.removeEventListener = function(e, t, a) {
    var l = this._eventListeners;
    if (l !== null && (t = Nm(
      l,
      e,
      t,
      a
    ), t !== -1)) {
      var n = l[t];
      a = n.attachedListener;
      var u = n.cleanup;
      n = Nn(n.optionsOrUseCapture), y(
        this._fragmentFiber.child,
        !1,
        Jy,
        e,
        a,
        n
      ), l.splice(t, 1), u !== null && u();
    }
  };
  function Jy(e, t, a, l) {
    return q(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function Nn(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Tm(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Nm(e, t, a, l) {
    if (e.length === 0) return -1;
    l = Tm(l);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === a && Tm(u.optionsOrUseCapture) === l)
        return n;
    }
    return -1;
  }
  Ht.prototype.dispatchEvent = function(e) {
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
            Nn(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            Nn(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Ht.prototype.focus = function(e) {
    y(
      this._fragmentFiber.child,
      !0,
      wm,
      e,
      void 0,
      void 0
    );
  };
  function wm(e, t) {
    return e.tag === 6 ? !1 : (e = q(e), u0(e, t));
  }
  Ht.prototype.focusLast = function(e) {
    var t = [];
    y(
      this._fragmentFiber.child,
      !0,
      ao,
      t,
      void 0,
      void 0
    );
    for (var a = t.length - 1; 0 <= a && !wm(t[a], e); a--) ;
  };
  function ao(e, t) {
    return t.push(e), !1;
  }
  Ht.prototype.blur = function() {
    var e = z(
      this._fragmentFiber
    );
    e !== null && (e = q(e), e = Au(e).activeElement, e !== null && y(
      this._fragmentFiber.child,
      !1,
      ky,
      e,
      void 0,
      void 0
    ));
  };
  function ky(e, t) {
    return e.tag === 6 ? !1 : (e = q(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Ht.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(
      this._fragmentFiber.child,
      !1,
      $y,
      e,
      void 0,
      void 0
    );
  };
  function $y(e, t) {
    return e.tag === 6 || (e = q(e), t.observe(e)), !1;
  }
  Ht.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), y(
        this._fragmentFiber.child,
        !1,
        Fy,
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
  function Fy(e, t) {
    return e.tag === 6 || (e = q(e), t.unobserve(e)), !1;
  }
  var ta = [], lo = !1;
  function Wy(e, t, a) {
    ta.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), lo || (lo = !0, i0(function() {
      lo = !1;
      var l = ta;
      ta = [];
      for (var n = 0; n < l.length; n++) {
        var u = l[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ht.prototype.getClientRects = function() {
    var e = [];
    return y(
      this._fragmentFiber.child,
      !1,
      Iy,
      e,
      void 0,
      void 0
    ), e;
  };
  function Iy(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var a = e.ownerDocument.createRange();
      a.selectNodeContents(e), t.push.apply(t, a.getClientRects());
    } else
      e = q(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Ht.prototype.getRootNode = function(e) {
    var t = z(
      this._fragmentFiber
    );
    return t === null ? this : q(t).getRootNode(e);
  }, Ht.prototype.compareDocumentPosition = function(e) {
    var t = z(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    y(
      this._fragmentFiber.child,
      !1,
      ao,
      a,
      void 0,
      void 0
    );
    var l = q(t);
    if (a.length === 0) {
      if (a = l, O(this._fragmentFiber)) {
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
    var u = O(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var s = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), m = s & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && s & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || m || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Py(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Py(e, t, a, l, n) {
    var u = yl(n);
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
  function Em(e, t) {
    var a = e.ownerDocument.createRange();
    a.selectNodeContents(e), e = a.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Ht.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(o(566));
    var t = [];
    y(
      this._fragmentFiber.child,
      !1,
      ao,
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
        e = q(l), Em(e, a);
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
      n.tag === 6 ? (n = q(n), Em(n, a)) : q(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function e0(e, t) {
    return e = q(e), Am(e, t), !1;
  }
  function Am(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Cm(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          Nn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var s = 0, f = 0; f < ta.length; f++) {
        var m = ta[f];
        (m.fragmentInstance !== t || m.observer !== u || m.instance !== e) && (ta[s++] = m);
      }
      ta.length = s, u.observe(e);
    }), Am(e, t));
  }
  function t0(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          Nn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      typeof u.rootMargin == "string" ? Wy(
        t,
        u,
        e
      ) : u.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function no(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          no(a), ii(a);
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
  function a0(e, t, a, l) {
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
  function l0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function zm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Vt(e.nextSibling), e === null)) return null;
    return e;
  }
  function uo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function io(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function n0(e, t) {
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
  function Dm(e) {
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
  function Rm(e) {
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
  function u0(e, t) {
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
  function i0(e) {
    pm(function() {
      pm(function(t) {
        return e(t);
      });
    });
  }
  function Mm(e, t, a) {
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
  function Om(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ae(e, t, l, null, Uy, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === ca && (e.onclick = null), ii(e);
  }
  function so(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ii(e);
  }
  var Kt = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
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
    r: s0,
    D: r0,
    C: o0,
    L: f0,
    m: d0,
    X: m0,
    S: v0,
    M: h0
  };
  function c0() {
    var e = Ha.f(), t = rc();
    return e || t;
  }
  function s0(e) {
    var t = Xl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ld(t) : Ha.r(e);
  }
  var wn = typeof document > "u" ? null : document;
  function Hm(e, t, a) {
    var l = wn;
    if (l && typeof t == "string" && t) {
      var n = qt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Um.has(n) || (Um.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), st(t, "link", e), Ie(t), l.head.appendChild(t)));
    }
  }
  function r0(e) {
    Ha.D(e), Hm("dns-prefetch", e, null);
  }
  function o0(e, t) {
    Ha.C(e, t), Hm("preconnect", e, t);
  }
  function f0(e, t, a) {
    Ha.L(e, t, a);
    var l = wn;
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
          u = En(e);
          break;
        case "script":
          u = An(e);
      }
      if (!(Kt.has(u) || (e = I(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Kt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(zu(u)) || t === "script" && l.querySelector(Du(u))))) {
        var s = l.createElement("link");
        st(s, "link", e), t === "style" && (s[ui] = !0, s.onload = s.onerror = function() {
          ko(s);
        }), Ie(s), l.head.appendChild(s);
      }
    }
  }
  function d0(e, t) {
    Ha.m(e, t);
    var a = wn;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + qt(l) + '"][href="' + qt(e) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = An(e);
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
        l = a.createElement("link"), st(l, "link", e), Ie(l), a.head.appendChild(l);
      }
    }
  }
  function v0(e, t, a) {
    Ha.S(e, t, a);
    var l = wn;
    if (l && e) {
      var n = Zl(l).hoistableStyles, u = En(e);
      t = t || "default";
      var s = n.get(u);
      if (!s) {
        var f = { loading: 0, preload: null };
        if (s = l.querySelector(
          zu(u)
        ))
          f.loading = 5;
        else {
          e = I(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Kt.get(u)) && ro(e, a);
          var m = s = l.createElement("link");
          Ie(m), st(m, "link", e), m._p = new Promise(function(b, E) {
            m.onload = b, m.onerror = E;
          }), m.addEventListener("load", function() {
            f.loading |= 1;
          }), m.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, gc(s, t, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: f
        }, n.set(u, s);
      }
    }
  }
  function m0(e, t) {
    Ha.X(e, t);
    var a = wn;
    if (a && e) {
      var l = Zl(a).hoistableScripts, n = An(e), u = l.get(n);
      u || (u = a.querySelector(Du(n)), u || (e = I({ src: e, async: !0 }, t), (t = Kt.get(n)) && oo(e, t), u = a.createElement("script"), Ie(u), st(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function h0(e, t) {
    Ha.M(e, t);
    var a = wn;
    if (a && e) {
      var l = Zl(a).hoistableScripts, n = An(e), u = l.get(n);
      u || (u = a.querySelector(Du(n)), u || (e = I({ src: e, async: !0, type: "module" }, t), (t = Kt.get(n)) && oo(e, t), u = a.createElement("script"), Ie(u), st(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Lm(e, t, a, l) {
    var n = (n = qa.current) ? Cu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = En(a.href), t = Zl(
          n
        ).hoistableStyles, l = t.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = En(a.href);
          var u = Zl(
            n
          ).hoistableStyles, s = u.get(e);
          if (s || (n = n.ownerDocument || n, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, s), (u = n.querySelector(
            zu(e)
          )) ? u._p || (s.instance = u, s.state.loading = 5) : (u = Kt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Kt.set(e, u)), g0(
            n,
            e,
            u,
            s.state
          ))), t && l === null)
            throw Error(o(528, ""));
          return s;
        }
        if (t && l !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = An(a), t = Zl(
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
  function En(e) {
    return 'href="' + qt(e) + '"';
  }
  function zu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qm(e) {
    return I({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function g0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[ui] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[ui] = !0, t.onload = t.onerror = ko.bind(null, t), st(t, "link", a), Ie(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function An(e) {
    return '[src="' + qt(e) + '"]';
  }
  function Du(e) {
    return "script[async]" + e;
  }
  function Bm(e, t, a) {
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
          ), Ie(l), st(l, "style", n), gc(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = En(a.href);
          var u = e.querySelector(
            zu(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ie(u), u;
          l = qm(a), (n = Kt.get(n)) && ro(l, n), u = (e.ownerDocument || e).createElement("link"), Ie(u);
          var s = u;
          return s._p = new Promise(function(f, m) {
            s.onload = f, s.onerror = m;
          }), st(u, "link", l), t.state.loading |= 4, gc(u, a.precedence, e), t.instance = u;
        case "script":
          return u = An(a.src), (n = e.querySelector(
            Du(u)
          )) ? (t.instance = n, Ie(n), n) : (l = a, (n = Kt.get(u)) && (l = I({}, a), oo(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ie(n), st(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, gc(l, a.precedence, e));
    return t.instance;
  }
  function gc(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, s = 0; s < l.length; s++) {
      var f = l[s];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function ro(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function oo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var yc = null;
  function Ym(e, t, a) {
    if (yc === null) {
      var l = /* @__PURE__ */ new Map(), n = yc = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = yc, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[Kn] || u[lt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = u.getAttribute(t) || "";
        s = e + s;
        var f = l.get(s);
        f ? f.push(u) : l.set(s, [u]);
      }
    }
    return l;
  }
  function fo(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function y0(e, t, a) {
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
  function Gm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Qm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Xm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Zm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = S0.bind(e), t.decode().then(e, e));
  }
  function p0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = En(l.href), u = t.querySelector(
          zu(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ru.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, Ie(u);
          return;
        }
        u = t.ownerDocument || t, l = qm(l), (n = Kt.get(n)) && ro(l, n), u = u.createElement("link"), Ie(u);
        var s = u;
        s._p = new Promise(function(f, m) {
          s.onload = f, s.onerror = m;
        }), st(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ru.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var pc = 0;
  function _0(e, t) {
    return e.stylesheets && e.count === 0 && Sc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && Sc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && pc === 0 && (pc = 62500 * Ly());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Sc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > pc ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Vm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Sc(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Ru() {
    this.count--, Vm(this);
  }
  function S0() {
    this.imgCount--, Vm(this);
  }
  var _c = null;
  function Sc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _c = /* @__PURE__ */ new Map(), t.forEach(b0, e), _c = null, Ru.call(e));
  }
  function b0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = _c.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), _c.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var s = n[u];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (a.set(s.dataset.precedence, s), l = s);
        }
        l && a.set(null, l);
      }
      n = t.instance, s = n.getAttribute("data-precedence"), u = a.get(s) || l, u === l && a.set(null, n), a.set(s, n), this.count++, l = Ru.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Cn = {
    $$typeof: He,
    Provider: null,
    Consumer: null,
    _currentValue: ba,
    _currentValue2: ba,
    _threadCount: 0
  };
  function x0(e, t, a, l, n, u, s, f, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vc(0), this.hiddenUpdates = Vc(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Km(e, t, a, l, n, u, s, f, m, b, E, M) {
    return e = new x0(
      e,
      t,
      a,
      s,
      m,
      b,
      E,
      M,
      f
    ), t = 1, u === !0 && (t |= 24), u = _t(3, null, null, t), e.current = u, u.stateNode = e, t = ws(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, zs(u), e;
  }
  function Jm(e) {
    return e ? (e = en, e) : en;
  }
  function km(e, t, a, l, n, u) {
    n = Jm(n), l.context === null ? l.context = n : l.pendingContext = n, l = $a(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Fa(e, l, t), a !== null && (jt(a, e, t), ru(a, e, t));
  }
  function $m(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function vo(e, t) {
    $m(e, t), (e = e.alternate) && $m(e, t);
  }
  function Fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = bl(e, 67108864);
      t !== null && jt(t, e, 67108864), vo(e, 67108864);
    }
  }
  function Wm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ut();
      t = Kc(t);
      var a = bl(e, t);
      a !== null && jt(a, e, t), vo(e, t);
    }
  }
  var zn = !0;
  function j0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = ae.p;
    try {
      ae.p = 2, mo(e, t, a, l);
    } finally {
      ae.p = u, k.T = n;
    }
  }
  function T0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = ae.p;
    try {
      ae.p = 8, mo(e, t, a, l);
    } finally {
      ae.p = u, k.T = n;
    }
  }
  function mo(e, t, a, l) {
    if (zn) {
      var n = ho(l);
      if (n === null)
        kr(
          e,
          t,
          l,
          bc,
          a
        ), Pm(e, l);
      else if (w0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Pm(e, l), t & 4 && -1 < N0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Xl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var s = gl(u.pendingLanes);
                  if (s !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; s; ) {
                      var m = 1 << 31 - At(s);
                      f.entanglements[1] |= m, s &= ~m;
                    }
                    ya(u), (Te & 6) === 0 && (ic = wt() + 500, Nu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = bl(u, 2), f !== null && jt(f, u, 2), rc(), vo(u, 2);
            }
          if (u = ho(l), u === null && kr(
            e,
            t,
            l,
            bc,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        kr(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function ho(e) {
    return e = Pc(e), go(e);
  }
  var bc = null;
  function go(e) {
    if (bc = null, e = yl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = x(t), e !== null) return e;
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
    return bc = e, null;
  }
  function Im(e) {
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
        switch (Lh()) {
          case Ho:
            return 2;
          case Lo:
            return 8;
          case ei:
          case qh:
            return 32;
          case qo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var yo = !1, sl = null, rl = null, ol = null, Mu = /* @__PURE__ */ new Map(), Ou = /* @__PURE__ */ new Map(), fl = [], N0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Pm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        sl = null;
        break;
      case "dragenter":
      case "dragleave":
        rl = null;
        break;
      case "mouseover":
      case "mouseout":
        ol = null;
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
    }, t !== null && (t = Xl(t), t !== null && Fm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function w0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return sl = Uu(
          sl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return rl = Uu(
          rl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return ol = Uu(
          ol,
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
  function eh(e) {
    var t = yl(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = x(a), t !== null) {
            e.blockedOn = t, Vo(e.priority, function() {
              Wm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = C(a), t !== null) {
            e.blockedOn = t, Vo(e.priority, function() {
              Wm(a);
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
  function xc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ho(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Ic = l, a.target.dispatchEvent(l), Ic = null;
      } else
        return t = Xl(a), t !== null && Fm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function th(e, t, a) {
    xc(e) && a.delete(t);
  }
  function E0() {
    yo = !1, sl !== null && xc(sl) && (sl = null), rl !== null && xc(rl) && (rl = null), ol !== null && xc(ol) && (ol = null), Mu.forEach(th), Ou.forEach(th);
  }
  function jc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, yo || (yo = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      E0
    )));
  }
  var Tc = null;
  function ah(e) {
    Tc !== e && (Tc = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Tc === e && (Tc = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (go(l || a) === null)
              continue;
            break;
          }
          var u = Xl(a);
          u !== null && (e.splice(t, 3), t -= 3, Ws(
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
  function Dn(e) {
    function t(m) {
      return jc(m, e);
    }
    sl !== null && jc(sl, e), rl !== null && jc(rl, e), ol !== null && jc(ol, e), Mu.forEach(t), Ou.forEach(t);
    for (var a = 0; a < fl.length; a++) {
      var l = fl[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < fl.length && (a = fl[0], a.blockedOn === null); )
      eh(a), a.blockedOn === null && fl.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], s = n[pt] || null;
        if (typeof u == "function")
          s || ah(a);
        else if (s) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, s = u[pt] || null)
              f = s.formAction;
            else if (go(n) !== null) continue;
          } else f = s.action;
          typeof f == "function" ? a[l + 1] = f : (a.splice(l, 3), l -= 3), ah(a);
        }
      }
  }
  function lh() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(s) {
            return n = s;
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
  function po(e) {
    this._internalRoot = e;
  }
  Nc.prototype.render = po.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Ut();
    km(a, l, e, t, null, null);
  }, Nc.prototype.unmount = po.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      km(e.current, 2, null, e, null, null), rc(), t[Ql] = null;
    }
  };
  function Nc(e) {
    this._internalRoot = e;
  }
  Nc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Zo();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < fl.length && t !== 0 && t < fl[a].priority; a++) ;
      fl.splice(a, 0, e), a === 0 && eh(e);
    }
  };
  var nh = r.version;
  if (nh !== "19.3.1")
    throw Error(
      o(
        527,
        nh,
        "19.3.1"
      )
    );
  ae.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = D(t), e = e !== null ? w(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var A0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wc.isDisabled && wc.supportsFiber)
      try {
        Xn = wc.inject(
          A0
        ), Et = wc;
      } catch {
      }
  }
  return Lu.createRoot = function(e, t) {
    if (!v(e)) throw Error(o(299));
    var a = !1, l = "", n = Jd, u = kd, s = $d;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Km(
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
      s,
      lh
    ), e[Ql] = t.current, Jr(e), new po(t);
  }, Lu.hydrateRoot = function(e, t, a) {
    if (!v(e)) throw Error(o(299));
    var l = !1, n = "", u = Jd, s = kd, f = $d, m = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (s = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.formState !== void 0 && (m = a.formState)), t = Km(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      n,
      m,
      u,
      s,
      f,
      lh
    ), t.context = Jm(null), a = t.current, l = Ut(), l = Kc(l), n = $a(l), n.callback = null, Fa(a, n, l), a = l, t.current.lanes = a, Vn(t, a), ya(t), e[Ql] = t.current, Jr(e), new Nc(t);
  }, Lu.version = "19.3.1", Lu;
}
var mh;
function q0() {
  if (mh) return So.exports;
  mh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), So.exports = L0(), So.exports;
}
var B0 = q0(), A = Ro();
const wh = A.createContext(null);
function hh() {
  var c = window.users[window.currentUser] || {}, r = window.groupTheme, d = window.themeMode === "light";
  return {
    currentUser: window.currentUser,
    displayName: c.displayName || window.currentUser,
    statusMessage: c.statusMessage || "",
    isMaster: window.isMaster(),
    isSlave: window.isSlave(),
    isAdmin: window.isAdmin(),
    activeMasterContext: window.activeMasterContext,
    myMasterOptions: (window.myMasterOptions || []).slice(),
    groupTerms: Object.assign({}, window.groupTerms),
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
function Y0({ children: c }) {
  const [r, d] = A.useState(hh), o = A.useCallback(function() {
    d(hh());
  }, []), v = A.useCallback(
    async function(C) {
      await window.setActiveMasterContext(C), o();
    },
    [o]
  ), h = A.useCallback(
    function(C) {
      window.setThemeMode(C), o();
    },
    [o]
  );
  A.useEffect(
    function() {
      return window.addEventListener("theme-changed", o), function() {
        window.removeEventListener("theme-changed", o);
      };
    },
    [o]
  );
  const x = A.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        setThemeMode: h
      });
    },
    [r, o, v, h]
  );
  return /* @__PURE__ */ i.jsx(wh.Provider, { value: x, children: c });
}
function pe() {
  const c = A.useContext(wh);
  if (!c)
    throw new Error("useApp() must be called inside <AppProvider>");
  return c;
}
const G0 = "_button_fpxiy_7", Q0 = "_primary_fpxiy_22", X0 = "_secondary_fpxiy_30", Z0 = "_danger_fpxiy_39", V0 = "_spinner_fpxiy_52", K0 = "_labelLoading_fpxiy_61", Rn = {
  button: G0,
  primary: Q0,
  secondary: X0,
  danger: Z0,
  spinner: V0,
  labelLoading: K0
};
function Q({
  variant: c = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...h
}) {
  var x = c === "secondary" ? Rn.secondary : c === "danger" ? Rn.danger : Rn.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [Rn.button, x, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...h,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: Rn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? Rn.labelLoading : void 0, children: o })
      ]
    }
  );
}
const J0 = "_backdrop_13xfr_1", k0 = "_dialog_13xfr_12", $0 = "_header_13xfr_23", F0 = "_title_13xfr_30", W0 = "_closeBtn_13xfr_35", Mn = {
  backdrop: J0,
  dialog: k0,
  header: $0,
  title: F0,
  closeBtn: W0
};
function Fu({ title: c, onClose: r, children: d }) {
  return A.useEffect(function() {
    function o(v) {
      v.key === "Escape" && r();
    }
    return document.addEventListener("keydown", o), function() {
      document.removeEventListener("keydown", o);
    };
  }, [r]), /* @__PURE__ */ i.jsx(
    "div",
    {
      className: Mn.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && r();
      },
      children: /* @__PURE__ */ i.jsxs("div", { className: Mn.dialog, role: "dialog", "aria-modal": "true", "aria-label": c, children: [
        /* @__PURE__ */ i.jsxs("div", { className: Mn.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: Mn.title, children: c }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: Mn.closeBtn,
              onClick: r,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: Mn.body, children: d })
      ] })
    }
  );
}
const I0 = "_group_1wdnn_1", P0 = "_label_1wdnn_8", e1 = "_input_1wdnn_14", t1 = "_error_1wdnn_32", qu = {
  group: I0,
  label: P0,
  input: e1,
  error: t1
};
function se({ label: c, error: r, multiline: d = !1, id: o, ...v }) {
  var h = o || "field-" + (c == null ? void 0 : c.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: qu.group, children: [
    c ? /* @__PURE__ */ i.jsx("label", { className: qu.label, htmlFor: h, children: c }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: h, className: qu.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: h, className: qu.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: qu.error, children: r }) : null
  ] });
}
function la(c) {
  var r = c.table, d = c.select || "*", o = c.masterUsername, v = c.sort, h = c.enabled !== !1, [x, C] = A.useState([]), [N, D] = A.useState("loading"), [w, y] = A.useState(null), z = A.useRef(Math.random().toString(36).slice(2)).current, O = A.useCallback(
    async function() {
      if (!h || !o) {
        C([]), D("ready");
        return;
      }
      D("loading"), y(null);
      var U = window.supabase.from(r).select(d).eq("master_username", o), L = await U;
      if (L.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", L.error), y(L.error), D("error");
        return;
      }
      var q = L.data || [];
      v && (q = q.slice().sort(v)), C(q), D("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [r, d, o, h]
  );
  return A.useEffect(
    function() {
      if (O(), !(!h || !o)) {
        var U = window.supabase.channel("beta_" + r + "_" + o + "_" + z).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: r,
            filter: "master_username=eq." + o
          },
          function(L) {
            C(function(q) {
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
    [r, o, h, O]
  ), { items: x, status: N, error: w, reload: O };
}
function a1(c, r) {
  return new Date(r.started_at) - new Date(c.started_at);
}
function Mo() {
  var c = pe(), r = la({
    table: "active_cost_trackers",
    masterUsername: c.activeMasterContext,
    sort: a1
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
    startTracker: function(v, h, x, C, N, D) {
      return window.startLiveCostTracker(
        v,
        h,
        x,
        C,
        N,
        D
      );
    },
    stopTracker: function(v, h) {
      return window.stopLiveCostTracker(v, h !== !1);
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v);
    },
    addPenalty: function(v, h, x) {
      return window.addPenaltyToLiveTracker(v, h, x);
    },
    removePenalty: function(v, h) {
      return window.removePenaltyFromLiveTracker(v, h);
    }
  };
}
const l1 = "_card_1j746_1", n1 = "_raised_1j746_8", gh = {
  card: l1,
  raised: n1
};
function ye({ raised: c = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [c ? gh.raised : gh.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const u1 = "_card_b5s19_1", i1 = "_description_b5s19_9", c1 = "_meta_b5s19_19", s1 = "_readout_b5s19_31", r1 = "_amount_b5s19_47", o1 = "_penaltyList_b5s19_55", f1 = "_removePenalty_b5s19_71", d1 = "_penaltyForm_b5s19_87", v1 = "_stopActions_b5s19_103", pa = {
  card: u1,
  description: i1,
  meta: c1,
  readout: s1,
  amount: r1,
  penaltyList: o1,
  removePenalty: f1,
  penaltyForm: d1,
  stopActions: v1
};
function m1(c) {
  return c === 1e3 ? "second" : c === 36e5 ? "hour" : "minute";
}
function h1(c, r) {
  var d = Math.max(0, r - new Date(c.started_at).getTime()), o = parseInt(c.increment_interval) || 6e4, v = parseFloat(c.rate) || 0, h = d / o * v, x = [];
  try {
    x = JSON.parse(c.penalties || "[]");
  } catch {
    x = [];
  }
  var C = x.reduce(function(z, O) {
    return z + (parseFloat(O.amount) || 0);
  }, 0), N = Math.floor(d / 36e5), D = Math.floor(d % 36e5 / 6e4), w = Math.floor(d % 6e4 / 1e3), y = String(N).padStart(2, "0") + ":" + String(D).padStart(2, "0") + ":" + String(w).padStart(2, "0");
  return {
    timeText: y,
    penalties: x,
    penaltyTotal: C,
    grandTotal: h + C
  };
}
function Uc({ tracker: c, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: h }) {
  var [x, C] = A.useState(Date.now()), [N, D] = A.useState(""), [w, y] = A.useState("");
  A.useEffect(function() {
    var L = window.setInterval(function() {
      C(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(L);
    };
  }, []);
  var z = h1(c, x), O = window.users[c.created_by], U = (c.assigned_to || []).map(function(L) {
    var q = window.users[L];
    return q ? q.displayName : L;
  });
  return /* @__PURE__ */ i.jsxs(ye, { className: pa.card, children: [
    /* @__PURE__ */ i.jsx("p", { className: pa.description, children: c.description }),
    /* @__PURE__ */ i.jsxs("p", { className: pa.meta, children: [
      "by ",
      O ? O.displayName : c.created_by,
      " · ",
      c.currency,
      parseFloat(c.rate).toFixed(2),
      " per ",
      m1(parseInt(c.increment_interval))
    ] }),
    r ? /* @__PURE__ */ i.jsxs("p", { className: pa.meta, children: [
      "Assigned to: ",
      U.length > 0 ? U.join(", ") : "N/A"
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: pa.readout, children: [
      /* @__PURE__ */ i.jsx("span", { children: z.timeText }),
      /* @__PURE__ */ i.jsxs("span", { className: pa.amount, children: [
        c.currency,
        z.grandTotal.toFixed(2)
      ] })
    ] }),
    z.penalties.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: pa.penaltyList, children: z.penalties.map(function(L) {
      return /* @__PURE__ */ i.jsxs("li", { children: [
        L.description,
        ": ",
        c.currency,
        parseFloat(L.amount).toFixed(2),
        r ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: pa.removePenalty,
            onClick: function() {
              h(c.id, L.id);
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
          se,
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
          se,
          {
            label: "Amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: w,
            onChange: function(L) {
              y(L.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          Q,
          {
            variant: "secondary",
            disabled: !N.trim() || !w,
            onClick: function() {
              v(c.id, N, Number(w)), D(""), y("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: pa.stopActions, children: [
        /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
          d(c.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          d(c.id, !1);
        }, children: "Stop (no invoice)" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          o(c.id);
        }, children: "Delete" })
      ] })
    ] }) : null
  ] });
}
const g1 = "_pill_wktg6_1", y1 = {
  pill: g1
};
function p1(c, r) {
  var d = Math.max(0, r - new Date(c.started_at).getTime()), o = parseInt(c.increment_interval) || 6e4, v = parseFloat(c.rate) || 0, h = d / o * v, x = [];
  try {
    x = JSON.parse(c.penalties || "[]");
  } catch {
    x = [];
  }
  var C = x.reduce(function(w, y) {
    return w + (parseFloat(y.amount) || 0);
  }, 0), N = Math.floor(d / 6e4), D = Math.floor(d % 6e4 / 1e3);
  return {
    timeText: String(N).padStart(2, "0") + ":" + String(D).padStart(2, "0"),
    total: h + C
  };
}
function _1() {
  var c = pe(), r = Mo(), [d, o] = A.useState(Date.now()), [v, h] = A.useState(!1), x = r.trackers.find(function(D) {
    return Array.isArray(D.assigned_to) && D.assigned_to.includes(c.currentUser);
  }), C = x ? x.id : null;
  if (A.useEffect(
    function() {
      if (C) {
        var D = window.setInterval(function() {
          o(Date.now());
        }, 1e3);
        return function() {
          window.clearInterval(D);
        };
      }
    },
    [C]
  ), !c.isSlave || !x) return null;
  var N = p1(x, d);
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: y1.pill,
        onClick: function() {
          h(!0);
        },
        children: [
          "💰 ",
          N.timeText,
          " · ",
          x.currency,
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
        children: /* @__PURE__ */ i.jsx(Uc, { tracker: x, isAdmin: !1 })
      }
    ) : null
  ] });
}
const S1 = "_header_1ozxo_1", b1 = "_title_1ozxo_12", x1 = "_subtitle_1ozxo_17", j1 = "_right_1ozxo_23", T1 = "_groupSelect_1ozxo_30", N1 = "_userBadge_1ozxo_39", w1 = "_points_1ozxo_43", vl = {
  header: S1,
  title: b1,
  subtitle: x1,
  right: j1,
  groupSelect: T1,
  userBadge: N1,
  points: w1
};
function E1() {
  var c = pe(), r = window.users[c.currentUser] || {}, [d, o] = A.useState(!1), [v, h] = A.useState(c.statusMessage), [x, C] = A.useState(!1);
  function N() {
    c.setThemeMode(c.themeMode === "light" ? "dark" : "light");
  }
  function D() {
    window.logout();
  }
  function w() {
    h(c.statusMessage), o(!0);
  }
  async function y(z) {
    z.preventDefault(), C(!0);
    try {
      await window.updateMyStatusMessage(v), c.refresh(), o(!1);
    } finally {
      C(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs("header", { className: vl.header, children: [
    /* @__PURE__ */ i.jsxs("div", { className: vl.left, children: [
      /* @__PURE__ */ i.jsx("h1", { className: vl.title, children: c.groupTerms.groupLabel }),
      /* @__PURE__ */ i.jsx("p", { className: vl.subtitle, children: "Beta dashboard" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: vl.right, children: [
      c.myMasterOptions.length > 1 ? /* @__PURE__ */ i.jsx(
        "select",
        {
          className: vl.groupSelect,
          value: c.activeMasterContext,
          onChange: function(z) {
            c.switchGroup(z.target.value);
          },
          "aria-label": "Switch group",
          children: c.myMasterOptions.map(function(z) {
            var O = window.users[z];
            return /* @__PURE__ */ i.jsx("option", { value: z, children: O ? O.displayName : z }, z);
          })
        }
      ) : null,
      /* @__PURE__ */ i.jsx("span", { className: vl.userBadge, children: c.displayName }),
      /* @__PURE__ */ i.jsx(_1, {}),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: w, children: "✏️ Status" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: N, children: c.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode" }),
      c.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: vl.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: D, children: "Logout" })
    ] }),
    d ? /* @__PURE__ */ i.jsx(Fu, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ i.jsxs("form", { onSubmit: y, children: [
      /* @__PURE__ */ i.jsx(
        se,
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
      /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: x, children: "Save" })
    ] }) }) : null
  ] });
}
const A1 = "_nav_c0zce_1", C1 = "_tab_c0zce_10", z1 = "_tabActive_c0zce_11", No = {
  nav: A1,
  tab: C1,
  tabActive: z1
};
function D1({ activeTab: c, onChange: r }) {
  var d = pe(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && (o.push({ key: "overview", label: "Overview" }), o.push({ key: "dashboard", label: "Dashboard" }), o.push({ key: "tools", label: "Tools" })), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ i.jsx("nav", { className: No.nav, "aria-label": "Main", children: o.map(function(v) {
    var h = v.key === c;
    return /* @__PURE__ */ i.jsx(
      "button",
      {
        className: h ? No.tabActive : No.tab,
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
function R1(c, r) {
  return new Date(r.createdAt) - new Date(c.createdAt);
}
function Hc() {
  var c = pe(), r = la({
    table: "tasks",
    masterUsername: c.activeMasterContext,
    sort: R1
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
function M1() {
  var c = pe(), [r, d] = A.useState([]);
  return A.useEffect(
    function() {
      var o = !1;
      if (!c.isSlave || !c.activeMasterContext) {
        d([]);
        return;
      }
      return window.supabase.from("task_assignments").select("task_id").eq("assigned_to", c.currentUser).eq("master_username", c.activeMasterContext).then(function(v) {
        o || v.error || d(
          (v.data || []).map(function(h) {
            return h.task_id;
          })
        );
      }), function() {
        o = !0;
      };
    },
    [c.isSlave, c.currentUser, c.activeMasterContext]
  ), r;
}
function Gn() {
  var c = pe(), r = c.activeMasterContext, [d, o] = A.useState([]), [v, h] = A.useState("loading"), [x, C] = A.useState(null), N = A.useRef(Math.random().toString(36).slice(2)).current, D = A.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), C(null);
      var y = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (y.error) {
        C(y.error), h("error");
        return;
      }
      var z = (y.data || []).map(function(V) {
        return V.slave_username;
      }), O = { data: [] }, U = { data: [] };
      z.length > 0 && (O = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), U = await window.supabase.from("users").select("username, display_name, status_message").in("username", z));
      var L = {};
      (O.data || []).forEach(function(V) {
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
  A.useEffect(
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
  var w = d.filter(function(y) {
    return y.status === "active";
  });
  return {
    slaves: w,
    allSlaves: d,
    status: v,
    error: x,
    reload: D
  };
}
const O1 = "_heading_1bkor_1", U1 = "_row_1bkor_11", H1 = "_checkboxRow_1bkor_31", L1 = "_select_1bkor_47", q1 = "_fieldset_1bkor_69", B1 = "_hint_1bkor_83", La = {
  heading: O1,
  row: U1,
  checkboxRow: H1,
  select: L1,
  fieldset: q1,
  hint: B1
};
var yh = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function Y1({ onCreated: c }) {
  var r = pe(), d = Gn(), [o, v] = A.useState(yh), [h, x] = A.useState([]), [C, N] = A.useState(!1);
  function D(z, O) {
    v(function(U) {
      return Object.assign({}, U, { [z]: O });
    });
  }
  function w(z) {
    x(function(O) {
      return O.includes(z) ? O.filter(function(U) {
        return U !== z;
      }) : O.concat(z);
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
        }), v(yh), x([]), c && c();
      } finally {
        N(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: La.heading, children: "Create New Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: y, children: [
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: "Task description",
          value: o.text,
          onChange: function(z) {
            D("text", z.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: La.checkboxRow, children: [
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
      /* @__PURE__ */ i.jsxs("div", { className: La.row, children: [
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          se,
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
          se,
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
          se,
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
        /* @__PURE__ */ i.jsxs("label", { className: La.checkboxRow, children: [
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
            className: La.select,
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
      /* @__PURE__ */ i.jsxs("fieldset", { className: La.fieldset, children: [
        /* @__PURE__ */ i.jsxs("legend", { children: [
          "Assign to ",
          r.groupTerms.slaveLabelPlural
        ] }),
        d.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: La.hint, children: [
          "No ",
          r.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : d.slaves.map(function(z) {
          return /* @__PURE__ */ i.jsxs("label", { className: La.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: h.includes(z.username),
                onChange: function() {
                  w(z.username);
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
          className: La.select,
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
      /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: C, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const G1 = "_wrap_1qfmw_1", Q1 = "_spinner_1qfmw_10", ph = {
  wrap: G1,
  spinner: Q1
};
function $t({ label: c = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: ph.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: ph.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: c })
  ] });
}
const X1 = "_wrap_buujm_1", Z1 = "_message_buujm_9", _h = {
  wrap: X1,
  message: Z1
};
function na({ message: c = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: _h.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: _h.message, children: c }),
    r ? /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const V1 = "_wrap_mx4zv_1", K1 = "_icon_mx4zv_7", J1 = "_title_mx4zv_12", k1 = "_hint_mx4zv_18", Ec = {
  wrap: V1,
  icon: K1,
  title: J1,
  hint: k1
};
function qe({ icon: c = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Ec.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: Ec.icon, "aria-hidden": "true", children: c }),
    /* @__PURE__ */ i.jsx("p", { className: Ec.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: Ec.hint, children: d }) : null
  ] });
}
const $1 = "_badge_1988s_1", F1 = "_neutral_1988s_10", W1 = "_success_1988s_15", I1 = "_warning_1988s_20", P1 = "_danger_1988s_25", Bu = {
  badge: $1,
  neutral: F1,
  success: W1,
  warning: I1,
  danger: P1
};
function Nt({ tone: c = "neutral", children: r }) {
  var d = c === "success" ? Bu.success : c === "warning" ? Bu.warning : c === "danger" ? Bu.danger : Bu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [Bu.badge, d].join(" "), children: r });
}
function Eh(c) {
  return window.getStatusText(c.status, c.isOverdue, c.type, c.appealStatus);
}
function ep(c) {
  return c.type === "demerit" ? c.appealStatus === "pending" ? "warning" : c.appealStatus === "approved" ? "success" : (c.appealStatus === "denied", "danger") : c.isOverdue ? "danger" : c.status === "completed" ? "success" : c.status === "failed" ? "danger" : c.status === "pending_approval" ? "warning" : "neutral";
}
const tp = "_item_v1inl_1", ap = "_header_v1inl_5", lp = "_text_v1inl_11", np = "_meta_v1inl_16", up = "_appealText_v1inl_33", ip = "_actions_v1inl_41", On = {
  item: tp,
  header: ap,
  text: lp,
  meta: np,
  appealText: up,
  actions: ip
};
function cp({ task: c, actions: r }) {
  var d = pe(), o = window.users[c.assignedTo], v = c.type === "cost-tracker", h = v ? window.extractTotalFromTaskText(c.text) : null;
  return /* @__PURE__ */ i.jsxs(ye, { className: On.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: On.header, children: [
      /* @__PURE__ */ i.jsx(Nt, { tone: ep(c), children: Eh(c) }),
      c.type === "demerit" ? /* @__PURE__ */ i.jsx(Nt, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: On.text, children: v ? c.text.split(`
`)[0] : c.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: On.meta, children: [
      c.assignedTo ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ i.jsx("dd", { children: o ? o.displayName : c.assignedTo })
      ] }) : /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assignment" }),
        /* @__PURE__ */ i.jsx("dd", { children: "Shared" })
      ] }),
      !v && c.points ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Points" }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          "+",
          c.points
        ] })
      ] }) : null,
      c.penaltyPoints ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Penalty" }),
        /* @__PURE__ */ i.jsxs("dd", { children: [
          "-",
          c.penaltyPoints
        ] })
      ] }) : null,
      v && h ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ i.jsx("dd", { children: h })
      ] }) : null,
      c.dueDate ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ i.jsx("dd", { children: window.formatDate(c.dueDate) })
      ] }) : null
    ] }),
    c.appealText ? /* @__PURE__ */ i.jsxs("p", { className: On.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      c.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: On.actions, children: [
      d.isSlave && !v && c.type !== "demerit" && c.assignedTo === d.currentUser && c.status === "todo" ? /* @__PURE__ */ i.jsx(Q, { onClick: function() {
        r.checkOffTask(c.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && c.type === "demerit" && c.status === "demerit_issued" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Q, { onClick: function() {
          r.acceptDemerit(c.id);
        }, children: "Accept" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          r.appealDemerit(c.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && v && c.status === "todo" ? /* @__PURE__ */ i.jsx(Q, { onClick: function() {
        r.markInvoiceAsPaid(c.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && c.status === "pending_approval" && v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Q, { onClick: function() {
          r.approveInvoice(c.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
          r.rejectTask(c.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && c.status === "pending_approval" && !v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Q, { onClick: function() {
          r.approveTask(c.id);
        }, children: "Approve" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
          r.rejectTask(c.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && c.type === "demerit" && c.appealStatus === "pending" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Q, { onClick: function() {
          r.approveAppeal(c.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
          r.denyAppeal(c.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
        r.deleteTask(c.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function Ac({ tasks: c, status: r, error: d, onRetry: o, actions: v, emptyLabel: h }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    na,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { icon: "✓", title: h || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: c.map(function(x) {
    return /* @__PURE__ */ i.jsx(cp, { task: x, actions: v }, x.id);
  }) });
}
const sp = "_section_7c868_1", rp = "_heading_7c868_5", Un = {
  section: sp,
  heading: rp
};
function op() {
  var c = pe(), r = Hc(), d = M1(), o = {
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
  if (c.isSlave) {
    var v = r.tasks.filter(function(C) {
      return C.assignedTo === c.currentUser || d.includes(C.id);
    });
    return /* @__PURE__ */ i.jsx(
      Ac,
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
  }), x = r.tasks.filter(function(C) {
    return C.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Y1, { onCreated: r.reload }),
    h.length > 0 ? /* @__PURE__ */ i.jsxs(ye, { className: Un.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Un.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ i.jsx(
        Ac,
        {
          tasks: h,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    x.length > 0 ? /* @__PURE__ */ i.jsxs(ye, { className: Un.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Un.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        Ac,
        {
          tasks: x,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(ye, { className: Un.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Un.heading, children: "All Tasks" }),
      /* @__PURE__ */ i.jsx(
        Ac,
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
const fp = "_calendarContainer_1n2ar_1", dp = "_detail_1n2ar_13", vp = "_detailRow_1n2ar_25", Tt = {
  calendarContainer: fp,
  detail: dp,
  detailRow: vp
};
function mp(c) {
  var r = typeof window.rrule < "u" ? window.rrule.RRule : void 0;
  return c.map(function(d) {
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
function hp({ task: c }) {
  var r = c.dueDate ? window.formatDate(c.dueDate) : "N/A", d = c.endDateTime ? window.formatDate(c.endDateTime) : null, o = c.dueDate && c.dueDate.length === 10, v = c.createdBy && window.users[c.createdBy] ? window.users[c.createdBy].displayName : c.createdBy, h = c.completedBy && window.users[c.completedBy] ? window.users[c.completedBy].displayName : c.completedBy, x = c.approvedBy && window.users[c.approvedBy] ? window.users[c.approvedBy].displayName : c.approvedBy;
  return /* @__PURE__ */ i.jsxs("div", { className: Tt.detail, children: [
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Type:" }),
      " ",
      c.isRepeating ? "Repeating Task" : "One-time Task"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Status:" }),
      " ",
      Eh(c)
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
      c.text || "No description available."
    ] }),
    c.points ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Points:" }),
      " ",
      c.points
    ] }) : null,
    c.penaltyPoints ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Penalty:" }),
      " ",
      c.penaltyPoints
    ] }) : null,
    c.createdBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Created By:" }),
      " ",
      v
    ] }) : null,
    c.completedBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Completed By:" }),
      " ",
      h
    ] }) : null,
    c.approvedBy ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Approved By:" }),
      " ",
      x
    ] }) : null,
    c.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal Reason:" }),
      " ",
      c.appealText
    ] }) : null
  ] });
}
function gp() {
  var c = pe(), r = Hc(), d = A.useRef(null), o = A.useRef(null), [v, h] = A.useState(null), x = A.useMemo(
    function() {
      return r.tasks.filter(function(N) {
        return !N || !N.dueDate ? !1 : c.isSlave ? N.assignedTo === c.currentUser || (window.mySharedTaskIds || []).includes(N.id) : !0;
      });
    },
    [r.tasks, c.isSlave, c.currentUser]
  ), C = A.useMemo(function() {
    return mp(x);
  }, [x]);
  return A.useEffect(
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
  ), A.useEffect(
    function() {
      var N = o.current;
      N && (N.removeAllEventSources(), N.addEventSource(C));
    },
    [C]
  ), /* @__PURE__ */ i.jsxs("div", { children: [
    r.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(na, { message: r.error ? r.error.message : "", onRetry: r.reload }) : null,
    /* @__PURE__ */ i.jsx("div", { ref: d, className: Tt.calendarContainer }),
    v ? /* @__PURE__ */ i.jsx(Fu, { title: v.text, onClose: function() {
      h(null);
    }, children: /* @__PURE__ */ i.jsx(hp, { task: v }) }) : null
  ] });
}
function yp(c, r) {
  return new Date(r.timestamp) - new Date(c.timestamp);
}
function Ah() {
  var c = pe(), r = la({
    table: "userActivity",
    masterUsername: c.activeMasterContext,
    sort: yp
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const pp = "_row_qtrye_1", _p = "_tile_qtrye_8", Sp = "_number_qtrye_12", bp = "_label_qtrye_17", Cc = {
  row: pp,
  tile: _p,
  number: Sp,
  label: bp
};
function xp({ stats: c }) {
  return /* @__PURE__ */ i.jsx("div", { className: Cc.row, children: c.map(function(r) {
    return /* @__PURE__ */ i.jsxs(ye, { className: Cc.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: Cc.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: Cc.label, children: r.label })
    ] }, r.label);
  }) });
}
const jp = "_list_azyhi_1", Tp = "_row_azyhi_7", Np = "_positive_azyhi_13", wp = "_zero_azyhi_18", Ep = "_negative_azyhi_23", $u = {
  list: jp,
  row: Tp,
  positive: Np,
  zero: wp,
  negative: Ep
};
function Ap(c) {
  return c < 0 ? $u.negative : c === 0 ? $u.zero : $u.positive;
}
function Cp({ slaves: c }) {
  var r = pe();
  return c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: $u.list, children: c.map(function(d) {
    return /* @__PURE__ */ i.jsxs(ye, { className: $u.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: Ap(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const zp = "_heading_1mu37_1", Dp = "_form_1mu37_6", Rp = "_select_1mu37_13", wo = {
  heading: zp,
  form: Dp,
  select: Rp
};
function Mp({ slaves: c }) {
  var r = pe(), [d, o] = A.useState(c[0] ? c[0].username : ""), [v, h] = A.useState(0);
  A.useEffect(
    function() {
      var C = c.find(function(N) {
        return N.username === d;
      });
      C ? h(C.points) : c[0] && o(c[0].username);
    },
    [c, d]
  );
  async function x(C) {
    if (C.preventDefault(), !!d) {
      var N = c.find(function(w) {
        return w.username === d;
      }), D = N ? N.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (N ? N.displayName : d) + " points changed from " + D + " to " + (Number(v) || 0),
        "success"
      );
    }
  }
  return c.length === 0 ? null : /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsxs("h3", { className: wo.heading, children: [
      "Set ",
      r.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ i.jsxs("form", { className: wo.form, onSubmit: x, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: wo.select,
          value: d,
          onChange: function(C) {
            o(C.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: c.map(function(C) {
            return /* @__PURE__ */ i.jsx("option", { value: C.username, children: C.displayName }, C.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(C) {
            h(C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Q, { type: "submit", children: "Set" })
    ] })
  ] });
}
const Op = "_list_1jial_1", Up = "_item_1jial_10", Hp = "_user_1jial_16", Lp = "_details_1jial_20", qp = "_time_1jial_24", Hn = {
  list: Op,
  item: Up,
  user: Hp,
  details: Lp,
  time: qp
};
function Bp({ activity: c, status: r, error: d, onRetry: o }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "", onRetry: o }) : c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No recent activity" }) : /* @__PURE__ */ i.jsx("ul", { className: Hn.list, children: c.map(function(v, h) {
    var x = window.users[v.user];
    return /* @__PURE__ */ i.jsxs("li", { className: Hn.item, children: [
      /* @__PURE__ */ i.jsx("span", { className: Hn.user, children: x ? x.displayName : v.user }),
      " ",
      /* @__PURE__ */ i.jsx("span", { className: Hn.action, children: v.action.replace(/_/g, " ") }),
      v.details ? /* @__PURE__ */ i.jsxs("span", { className: Hn.details, children: [
        " — ",
        v.details
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Hn.time, children: window.formatDate(v.timestamp) })
    ] }, h);
  }) });
}
const Yp = "_grid_69ji7_1", Gp = "_section_69ji7_8", Qp = "_heading_69ji7_12", Yu = {
  grid: Yp,
  section: Gp,
  heading: Qp
};
function Xp() {
  var c = pe(), r = Hc(), d = Gn(), o = Ah(), v = r.tasks, h = d.slaves.map(function(C) {
    return C.username;
  }), x = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(C) {
        return C.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(C) {
        return C.status === "completed";
      }).length
    },
    {
      label: "Demerits Issued",
      value: v.filter(function(C) {
        return C.type === "demerit" && h.indexOf(C.assignedTo) !== -1;
      }).length
    },
    { label: c.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(xp, { stats: x }),
    /* @__PURE__ */ i.jsxs("div", { className: Yu.grid, children: [
      /* @__PURE__ */ i.jsxs(ye, { className: Yu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Yu.heading, children: [
          c.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(Cp, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(Mp, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(ye, { className: Yu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Yu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        Bp,
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
function Zp(c, r) {
  return new Date(r.createdAt) - new Date(c.createdAt);
}
function Ch() {
  var c = pe(), r = la({
    table: "suggestions",
    masterUsername: c.activeMasterContext,
    sort: Zp
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
var Sh = { description: "", justification: "", points: 10, dueDate: "" };
function Vp({ onSubmit: c }) {
  var [r, d] = A.useState(Sh), [o, v] = A.useState(!1);
  function h(C, N) {
    d(function(D) {
      return Object.assign({}, D, { [C]: N });
    });
  }
  async function x(C) {
    if (C.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await c(r), d(Sh);
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: x, children: [
      /* @__PURE__ */ i.jsx(
        se,
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
        se,
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
        se,
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
        se,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(C) {
            h("dueDate", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const Kp = "_card_q0jnd_1", Jp = "_badgeRow_q0jnd_5", kp = "_description_q0jnd_11", $p = "_justification_q0jnd_15", Fp = "_metaLine_q0jnd_21", Wp = "_actions_q0jnd_27", Ln = {
  card: Kp,
  badgeRow: Jp,
  description: kp,
  justification: $p,
  metaLine: Fp,
  actions: Wp
};
function Ip(c) {
  return c === "pending" ? "warning" : c === "rejected" ? "danger" : "success";
}
function bh({ suggestion: c, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var h = window.users[c.reviewedBy];
  return /* @__PURE__ */ i.jsxs(ye, { className: Ln.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ln.badgeRow, children: [
      /* @__PURE__ */ i.jsx(Nt, { tone: Ip(c.status), children: c.status }),
      /* @__PURE__ */ i.jsxs(Nt, { tone: "neutral", children: [
        c.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Ln.description, children: c.description }),
    c.justification ? /* @__PURE__ */ i.jsx("p", { className: Ln.justification, children: c.justification }) : null,
    /* @__PURE__ */ i.jsxs("p", { className: Ln.metaLine, children: [
      "Submitted ",
      window.formatDate(c.createdAt),
      c.suggestedDueDate ? " · Suggested due " + window.formatDate(c.suggestedDueDate) : "",
      c.reviewedAt ? " · Reviewed by " + (h ? h.displayName : c.reviewedBy) : ""
    ] }),
    r && c.status === "pending" ? /* @__PURE__ */ i.jsxs("div", { className: Ln.actions, children: [
      /* @__PURE__ */ i.jsx(Q, { onClick: function() {
        d(c.id);
      }, children: "Approve" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
        o(c.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
        v(c.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function Pp() {
  var c = pe(), r = Ch();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx($t, { label: "Loading suggestions..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load suggestions: " + (r.error ? r.error.message : ""),
        onRetry: r.reload
      }
    );
  if (c.isSlave) {
    var d = r.suggestions.filter(function(v) {
      return v.suggestedBy === c.currentUser;
    });
    return /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx(Vp, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(bh, { suggestion: v, forAdmin: !1 }, v.id);
      })
    ] });
  }
  var o = r.suggestions.filter(function(v) {
    return v.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No suggestions pending review" }) : o.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        bh,
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
var xh = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function e_(c, r) {
  return c.title.localeCompare(r.title);
}
function t_(c, r) {
  return new Date(r.purchaseDate) - new Date(c.purchaseDate);
}
function a_() {
  var c = pe(), r = c.activeMasterContext, d = la({
    table: "rewards",
    masterUsername: r,
    sort: e_
  }), o = la({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: t_
  }), [v, h] = A.useState(xh), [x, C] = A.useState("loading"), N = A.useRef(Math.random().toString(36).slice(2)).current, D = A.useCallback(
    async function() {
      if (r) {
        C("loading");
        var w = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (w.error) {
          C("error");
          return;
        }
        h(
          w.data && w.data.length > 0 ? w.data[0] : xh
        ), C("ready");
      }
    },
    [r]
  );
  return A.useEffect(
    function() {
      if (D(), !!r) {
        var w = window.supabase.channel("beta_reward_settings_" + r + "_" + N).on(
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
          window.supabase.removeChannel(w);
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
    settingsStatus: x,
    addReward: function(w, y, z, O) {
      return window.addReward(w, y, z, O);
    },
    updateReward: function(w, y, z, O, U) {
      return window.updateReward(w, y, z, O, U);
    },
    deleteReward: function(w) {
      return window.deleteReward(w);
    },
    purchaseReward: function(w) {
      return window.purchaseReward(w);
    },
    authorizePurchase: function(w) {
      return window.authorizePurchase(w);
    },
    denyPurchase: function(w) {
      return window.denyPurchase(w);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(w, y, z) {
      return window.updateRewardSystemSettings(w, y, z);
    }
  };
}
const l_ = "_card_1tc0o_1", n_ = "_title_1tc0o_7", u_ = "_description_1tc0o_12", i_ = "_badgeRow_1tc0o_19", c_ = "_actions_1tc0o_24", Gu = {
  card: l_,
  title: n_,
  description: u_,
  badgeRow: i_,
  actions: c_
};
function zh({ reward: c, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(ye, { className: Gu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: Gu.title, children: c.title }),
    /* @__PURE__ */ i.jsx("p", { className: Gu.description, children: c.description }),
    /* @__PURE__ */ i.jsxs("div", { className: Gu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(Nt, { tone: "neutral", children: [
        c.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Nt, { tone: c.type === "instant" ? "success" : "warning", children: c.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: Gu.actions, children: [
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
        d(c);
      }, children: "Edit" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
        o(c.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ i.jsx(Q, { onClick: function() {
      r(c.id);
    }, children: "Purchase" })
  ] });
}
const s_ = "_grid_19ohq_1", r_ = "_purchasesHeading_19ohq_7", o_ = "_purchaseCard_19ohq_11", f_ = "_badgeRow_19ohq_15", d_ = "_purchaseTitle_19ohq_19", v_ = "_purchaseMeta_19ohq_24", Bl = {
  grid: s_,
  purchasesHeading: r_,
  purchaseCard: o_,
  badgeRow: f_,
  purchaseTitle: d_,
  purchaseMeta: v_
};
function m_(c) {
  return c === "denied" ? "danger" : c === "pending_authorization" ? "warning" : "success";
}
function h_({ rewards: c, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: h }) {
  var x = pe(), C = h.filter(function(N) {
    return N.userId === x.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "Failed to load", onRetry: o }) : c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Bl.grid, children: c.map(function(N) {
      return /* @__PURE__ */ i.jsx(zh, { reward: N, onPurchase: v }, N.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Bl.purchasesHeading, children: "My Reward Purchases" }),
    C.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No purchases yet" }) : C.map(function(N) {
      return /* @__PURE__ */ i.jsxs(ye, { className: Bl.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Bl.badgeRow, children: /* @__PURE__ */ i.jsx(Nt, { tone: m_(N.status), children: N.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Bl.purchaseTitle, children: N.rewards ? N.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Bl.purchaseMeta, children: [
          N.purchaseCost,
          " points · ",
          window.formatDate(N.purchaseDate)
        ] }),
        N.status === "denied" && N.notes ? /* @__PURE__ */ i.jsxs("p", { className: Bl.purchaseMeta, children: [
          "Reason: ",
          N.notes
        ] }) : null
      ] }, N.id);
    })
  ] });
}
const g_ = "_heading_p82cd_1", y_ = "_row_p82cd_6", p_ = "_selectGroup_p82cd_16", __ = "_selectLabel_p82cd_23", S_ = "_select_p82cd_16", b_ = "_actions_p82cd_38", qn = {
  heading: g_,
  row: y_,
  selectGroup: p_,
  selectLabel: __,
  select: S_,
  actions: b_
};
var Eo = { title: "", description: "", cost: 10, type: "instant" };
function x_({ editingReward: c, onSave: r, onCancelEdit: d }) {
  var [o, v] = A.useState(Eo), [h, x] = A.useState(!1);
  A.useEffect(
    function() {
      v(
        c ? {
          title: c.title,
          description: c.description,
          cost: c.cost,
          type: c.type
        } : Eo
      );
    },
    [c]
  );
  function C(D, w) {
    v(function(y) {
      return Object.assign({}, y, { [D]: w });
    });
  }
  async function N(D) {
    if (D.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      x(!0);
      try {
        await r(o, c ? c.id : null), v(Eo);
      } finally {
        x(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: qn.heading, children: c ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: N, children: [
      /* @__PURE__ */ i.jsx(
        se,
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
        se,
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
      /* @__PURE__ */ i.jsxs("div", { className: qn.row, children: [
        /* @__PURE__ */ i.jsx(
          se,
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
        /* @__PURE__ */ i.jsxs("div", { className: qn.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: qn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: qn.select,
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
      /* @__PURE__ */ i.jsxs("div", { className: qn.actions, children: [
        /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: h, children: c ? "Save changes" : "Add reward" }),
        c ? /* @__PURE__ */ i.jsx(Q, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const j_ = "_heading_26k11_1", T_ = "_row_26k11_6", N_ = "_checkboxRow_26k11_16", w_ = "_readout_26k11_24", E_ = "_actions_26k11_30", Bn = {
  heading: j_,
  row: T_,
  checkboxRow: N_,
  readout: w_,
  actions: E_
};
function A_({ settings: c, onSave: r, onReset: d }) {
  var [o, v] = A.useState(c.instantPurchaseLimit || 0), [h, x] = A.useState(c.resetDurationDays || 0), [C, N] = A.useState(c.requiresAuthorizationAfterLimit !== !1);
  A.useEffect(
    function() {
      v(c.instantPurchaseLimit || 0), x(c.resetDurationDays || 0), N(c.requiresAuthorizationAfterLimit !== !1);
    },
    [c]
  );
  function D(w) {
    w.preventDefault(), r(Number(o) || 0, Number(h) || 0, C);
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Bn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Bn.row, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(w) {
              v(w.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: h,
            onChange: function(w) {
              x(w.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Bn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: C,
            onChange: function(w) {
              N(w.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Bn.readout, children: [
        "Current instant spend: ",
        c.currentInstantSpend || 0,
        " / ",
        c.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Bn.readout, children: [
        "Last reset: ",
        c.lastResetAt ? window.formatDate(c.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Bn.actions, children: [
        /* @__PURE__ */ i.jsx(Q, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(Q, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const C_ = "_card_zkx61_1", z_ = "_title_zkx61_5", D_ = "_meta_zkx61_10", R_ = "_actions_zkx61_16", zc = {
  card: C_,
  title: z_,
  meta: D_,
  actions: R_
};
function M_({ purchases: c, onAuthorize: r, onDeny: d }) {
  var o = c.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var h = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(ye, { className: zc.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: zc.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        h ? h.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: zc.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: zc.actions, children: [
        /* @__PURE__ */ i.jsx(Q, { onClick: function() {
          r(v.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
          d(v.id);
        }, children: "Deny" })
      ] })
    ] }, v.id);
  }) });
}
const O_ = "_heading_1ewsp_1", U_ = "_grid_1ewsp_5", Dc = {
  heading: O_,
  grid: U_
};
function H_({ rewardsState: c }) {
  var [r, d] = A.useState(null);
  async function o(h, x) {
    x ? await c.updateReward(x, h.title, h.description, Number(h.cost), h.type) : await c.addReward(h.title, h.description, Number(h.cost), h.type), d(null);
  }
  function v(h) {
    window.showConfirmModal("Delete this reward?", function(x) {
      x && c.deleteReward(h);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      x_,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Dc.heading, children: "Current Rewards" }),
    c.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : c.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: c.rewardsError ? c.rewardsError.message : "",
        onRetry: c.reloadRewards
      }
    ) : c.rewards.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Dc.grid, children: c.rewards.map(function(h) {
      return /* @__PURE__ */ i.jsx(
        zh,
        {
          reward: h,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        h.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Dc.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      A_,
      {
        settings: c.settings,
        onSave: c.updateRewardSystemSettings,
        onReset: c.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Dc.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      M_,
      {
        purchases: c.purchases,
        onAuthorize: c.authorizePurchase,
        onDeny: c.denyPurchase
      }
    )
  ] });
}
function L_() {
  var c = pe(), r = a_();
  return c.isMaster ? /* @__PURE__ */ i.jsx(H_, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    h_,
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
const q_ = "_heading_pc1l6_1", B_ = "_form_pc1l6_11", Y_ = "_row_pc1l6_33", G_ = "_statusMessage_pc1l6_51", Qu = {
  heading: q_,
  form: B_,
  row: Y_,
  statusMessage: G_
};
function Q_() {
  var c = pe(), r = Gn(), [d, o] = A.useState({ username: "", password: "", displayName: "" }), [v, h] = A.useState(!1);
  function x(w, y) {
    o(function(z) {
      return Object.assign({}, z, { [w]: y });
    });
  }
  async function C(w) {
    w.preventDefault(), h(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      h(!1);
    }
  }
  function N(w) {
    window.deactivatePig(w);
  }
  function D(w) {
    window.reactivatePig(w);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ye, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Qu.heading, children: [
        "Add New ",
        c.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Qu.form, onSubmit: C, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Username",
            value: d.username,
            onChange: function(w) {
              x("username", w.target.value);
            },
            placeholder: "lowercase, min 3 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Password",
            type: "password",
            value: d.password,
            onChange: function(w) {
              x("password", w.target.value);
            },
            placeholder: "min 4 chars",
            required: !0
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Display name",
            value: d.displayName,
            onChange: function(w) {
              x("displayName", w.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ i.jsxs(Q, { type: "submit", loading: v, children: [
          "Add ",
          c.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("h2", { className: Qu.heading, children: [
      "Current ",
      c.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No " + c.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(w) {
      var y = w.status === "active";
      return /* @__PURE__ */ i.jsxs(ye, { className: Qu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Nt, { tone: y ? "success" : "neutral", children: y ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: w.displayName }),
          " (",
          w.username,
          ") ·",
          " ",
          w.points,
          " pts",
          w.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Qu.statusMessage, children: [
            " · ",
            w.statusMessage
          ] }) : null
        ] }),
        y ? /* @__PURE__ */ i.jsx(
          Q,
          {
            variant: "danger",
            onClick: function() {
              N(w.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          Q,
          {
            onClick: function() {
              D(w.username);
            },
            children: "Reactivate"
          }
        )
      ] }, w.username);
    })
  ] });
}
function X_(c, r) {
  return new Date(r.created_at) - new Date(c.created_at);
}
function Z_() {
  var c = pe(), r = la({
    table: "invites",
    masterUsername: c.activeMasterContext,
    sort: X_
  }), d = A.useCallback(async function() {
    await window.generateInvite(), r.reload();
  }, [r]), o = A.useCallback(
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
const V_ = "_heading_1pok1_1", K_ = "_hint_1pok1_11", J_ = "_row_1pok1_23", k_ = "_actions_1pok1_45", Xu = {
  heading: V_,
  hint: K_,
  row: J_,
  actions: k_
};
function $_(c) {
  return c === "pending" ? "warning" : c === "redeemed" ? "success" : "neutral";
}
function F_() {
  var c = pe(), r = Z_(), [d, o] = A.useState(null);
  function v(h) {
    navigator.clipboard.writeText(window.buildInviteLink(h)), o(h), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Xu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Xu.hint, children: [
      "Generate a link to invite someone new as a ",
      c.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(Q, { onClick: r.generateInvite, children: "Generate Invite Link" }),
    r.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading invites..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load invites: " + (r.error ? r.error.message : "unknown error"),
        onRetry: r.reload
      }
    ) : null,
    r.status === "ready" && r.invites.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No invites generated yet" }) : null,
    r.status === "ready" && r.invites.length > 0 ? r.invites.map(function(h) {
      var x = h.status === "pending" && h.expires_at && new Date(h.expires_at) < /* @__PURE__ */ new Date(), C = x ? "expired" : h.status, N = h.status === "pending" && !x;
      return /* @__PURE__ */ i.jsxs("div", { className: Xu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Nt, { tone: $_(C), children: C.charAt(0).toUpperCase() + C.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: h.code }),
          h.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Xu.hint, children: [
            " · redeemed by ",
            h.redeemed_by
          ] }) : null
        ] }),
        N ? /* @__PURE__ */ i.jsxs("div", { className: Xu.actions, children: [
          /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
            v(h.code);
          }, children: d === h.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ i.jsx(
            Q,
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
function W_(c, r) {
  return c.position - r.position;
}
function Dh() {
  var c = pe(), r = c.activeMasterContext, d = la({
    table: "motd_messages",
    masterUsername: r,
    sort: W_
  }), o = la({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, h = o.items[0], x = h ? h.current_index : 0, C = v.length > 0 ? v[x % v.length] : null;
  return {
    messages: v,
    currentMessage: C,
    status: d.status,
    error: d.error,
    reload: function() {
      d.reload(), o.reload();
    },
    addMessage: async function(N) {
      await window.addMotdMessage({ body: N });
    },
    deleteMessage: async function(N) {
      await window.deleteMotdMessage(N);
    },
    moveUp: async function(N) {
      await window.moveMotdMessageUp(N);
    },
    moveDown: async function(N) {
      await window.moveMotdMessageDown(N);
    }
  };
}
const I_ = "_form_7nlkd_1", P_ = {
  form: I_
};
function eS({ onAdd: c }) {
  var [r, d] = A.useState(""), [o, v] = A.useState(!1);
  async function h(x) {
    x.preventDefault();
    var C = r.trim();
    if (C) {
      v(!0);
      try {
        await c(C), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: P_.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      se,
      {
        multiline: !0,
        rows: 2,
        value: r,
        onChange: function(x) {
          d(x.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: o, disabled: !r.trim(), children: "Add Message" })
  ] });
}
const tS = "_heading_10ijk_1", aS = "_row_10ijk_11", lS = "_actions_10ijk_33", Ao = {
  heading: tS,
  row: aS,
  actions: lS
};
function nS() {
  var c = Dh();
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Ao.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(eS, { onAdd: c.addMessage }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading messages..." }) : null,
    c.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load messages: " + (c.error ? c.error.message : "unknown error"),
        onRetry: c.reload
      }
    ) : null,
    c.status === "ready" && c.messages.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No messages added yet" }) : null,
    c.status === "ready" && c.messages.length > 0 ? c.messages.map(function(r, d) {
      var o = d === 0, v = d === c.messages.length - 1, h = c.currentMessage && c.currentMessage.id === r.id;
      return /* @__PURE__ */ i.jsxs("div", { className: Ao.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          h ? /* @__PURE__ */ i.jsx(Nt, { tone: "success", children: "Showing now" }) : null,
          " ",
          r.body
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ao.actions, children: [
          /* @__PURE__ */ i.jsx(
            Q,
            {
              variant: "secondary",
              disabled: o,
              onClick: function() {
                c.moveUp(r.id);
              },
              children: "↑"
            }
          ),
          /* @__PURE__ */ i.jsx(
            Q,
            {
              variant: "secondary",
              disabled: v,
              onClick: function() {
                c.moveDown(r.id);
              },
              children: "↓"
            }
          ),
          /* @__PURE__ */ i.jsx(
            Q,
            {
              variant: "danger",
              onClick: function() {
                c.deleteMessage(r.id);
              },
              children: "Delete"
            }
          )
        ] })
      ] }, r.id);
    }) : null
  ] });
}
function uS() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Q_, {}),
    /* @__PURE__ */ i.jsx(F_, {}),
    /* @__PURE__ */ i.jsx(nS, {})
  ] });
}
function iS() {
  var c = pe(), [r, d] = A.useState([]), [o, v] = A.useState("loading"), h = A.useCallback(async function() {
    v("loading");
    var x = await window.fetchAllMasters();
    d(x || []), v("ready");
  }, []);
  return A.useEffect(
    function() {
      c.isAdmin && h();
    },
    [c.isAdmin, h]
  ), {
    masters: r,
    status: o,
    reload: h,
    createMaster: window.createMaster,
    updateMasterTerminology: window.updateMasterTerminology,
    updateMasterAccount: window.updateMasterAccount,
    deactivateMaster: function(x) {
      return new Promise(function(C) {
        window.showConfirmModal(
          "Deactivate master '" + x + "'? They (and their group) won't be able to log in.",
          async function(N) {
            N && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", x), window.showNotification("Master deactivated.", "success"), await h()), C();
          }
        );
      });
    },
    reactivateMaster: async function(x) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", x), window.showNotification("Master reactivated.", "success"), await h();
    }
  };
}
const cS = "_list_1yv13_1", sS = "_row_1yv13_10", rS = "_ratio_1yv13_18", Co = {
  list: cS,
  row: sS,
  ratio: rS
};
function oS({ theme: c }) {
  if (!window.ContrastUtils) return null;
  var r = window.ContrastUtils.checkThemeContrast(c);
  return /* @__PURE__ */ i.jsx("ul", { className: Co.list, children: r.map(function(d) {
    return /* @__PURE__ */ i.jsxs("li", { className: Co.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.label }),
      /* @__PURE__ */ i.jsxs("span", { className: Co.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ i.jsx(Nt, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const fS = "_heading_xjg2m_1", dS = "_row_xjg2m_11", vS = "_checkboxRow_xjg2m_31", mS = "_divider_xjg2m_47", hS = "_colorGroupLabel_xjg2m_57", gS = "_colorRow_xjg2m_71", yS = "_colorField_xjg2m_85", pS = "_actions_xjg2m_119", Lt = {
  heading: fS,
  row: dS,
  checkboxRow: vS,
  divider: mS,
  colorGroupLabel: hS,
  colorRow: gS,
  colorField: yS,
  actions: pS
};
var _S = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
}, SS = {
  bg: "#ffffff",
  card: "#f4f4f5",
  elevated: "#e4e4e7",
  textPrimary: "#18181b",
  textSecondary: "#52525b"
};
function jh(c) {
  return {
    username: c ? c.username : "",
    password: "",
    displayName: c ? c.displayName : "",
    isAdmin: c ? c.isAdmin : !1,
    groupLabel: c ? c.groupLabel : "Household",
    masterLabel: c ? c.masterLabel : "Master",
    masterLabelPlural: c ? c.masterLabelPlural : "Masters",
    slaveLabel: c ? c.slaveLabel : "pig",
    slaveLabelPlural: c ? c.slaveLabelPlural : "pigs",
    classicUiForced: c ? c.classicUiForced : !1,
    theme: c ? c.theme : _S,
    themeLight: c ? c.themeLight : SS
  };
}
function Th({ master: c, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, h] = A.useState(jh(c)), [x, C] = A.useState(!1), N = !!c;
  function D(O, U) {
    h(function(L) {
      return Object.assign({}, L, { [O]: U });
    });
  }
  function w(O, U) {
    h(function(L) {
      return Object.assign({}, L, { theme: Object.assign({}, L.theme, { [O]: U }) });
    });
  }
  function y(O, U) {
    h(function(L) {
      return Object.assign({}, L, { themeLight: Object.assign({}, L.themeLight, { [O]: U }) });
    });
  }
  async function z(O) {
    O.preventDefault(), C(!0);
    try {
      N ? await d(c.username, v) : (await r(v), h(jh(null)));
    } finally {
      C(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Lt.heading, children: N ? "Edit " + c.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: z, children: [
      N ? null : /* @__PURE__ */ i.jsx(
        se,
        {
          label: "Username",
          value: v.username,
          onChange: function(O) {
            D("username", O.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: N ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(O) {
            D("password", O.target.value);
          },
          required: !N
        }
      ),
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: "Display name",
          value: v.displayName,
          onChange: function(O) {
            D("displayName", O.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Lt.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.isAdmin,
            onChange: function(O) {
              D("isAdmin", O.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Lt.row, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: v.groupLabel,
            onChange: function(O) {
              D("groupLabel", O.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: v.masterLabel,
            onChange: function(O) {
              D("masterLabel", O.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Lt.row, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Master label (plural)",
            value: v.masterLabelPlural,
            onChange: function(O) {
              D("masterLabelPlural", O.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: v.slaveLabel,
            onChange: function(O) {
              D("slaveLabel", O.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: "Slave label (plural)",
          value: v.slaveLabelPlural,
          onChange: function(O) {
            D("slaveLabelPlural", O.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx("hr", { className: Lt.divider }),
      /* @__PURE__ */ i.jsxs("label", { className: Lt.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.classicUiForced,
            onChange: function(O) {
              D("classicUiForced", O.target.checked);
            }
          }
        ),
        "Force classic styling for this group (disable beta)"
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: Lt.colorGroupLabel, children: "Dark mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Lt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(O) {
        var U = O[0], L = O[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Lt.colorField, children: [
          L,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.theme[U],
              onChange: function(q) {
                w(U, q.target.value);
              }
            }
          )
        ] }, U);
      }) }),
      /* @__PURE__ */ i.jsx("p", { className: Lt.colorGroupLabel, children: "Light mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Lt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(O) {
        var U = O[0], L = O[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Lt.colorField, children: [
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
      /* @__PURE__ */ i.jsx(oS, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: Lt.actions, children: [
        /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: x, children: N ? "Save changes" : "Create master" }),
        N ? /* @__PURE__ */ i.jsx(Q, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const bS = "_heading_vrwe0_1", xS = "_row_vrwe0_5", jS = "_badgeRow_vrwe0_14", TS = "_meta_vrwe0_20", NS = "_actions_vrwe0_26", Zu = {
  heading: bS,
  row: xS,
  badgeRow: jS,
  meta: TS,
  actions: NS
};
function wS() {
  var c = iS(), [r, d] = A.useState(null);
  async function o(h) {
    var x = await c.createMaster(h);
    x && await c.reload();
  }
  async function v(h, x) {
    await c.updateMasterAccount(h, {
      displayName: x.displayName,
      password: x.password,
      isAdmin: x.isAdmin
    }), await c.updateMasterTerminology(h, x), d(null), await c.reload();
  }
  return r ? /* @__PURE__ */ i.jsx(
    Th,
    {
      master: r,
      onSaveExisting: v,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Th, { onCreate: o }),
    /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "All Masters" }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : c.masters.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No masters yet" }) : c.masters.map(function(h) {
      var x = h.status === "active";
      return /* @__PURE__ */ i.jsxs(ye, { className: Zu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Zu.badgeRow, children: [
            /* @__PURE__ */ i.jsx(Nt, { tone: x ? "success" : "neutral", children: x ? "Active" : "Inactive" }),
            h.isAdmin ? /* @__PURE__ */ i.jsx(Nt, { tone: "warning", children: "Admin" }) : null,
            h.classicUiForced ? /* @__PURE__ */ i.jsx(Nt, { tone: "warning", children: "Classic Only" }) : null
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
            Q,
            {
              variant: "secondary",
              onClick: function() {
                d(h);
              },
              children: "Edit"
            }
          ),
          x ? /* @__PURE__ */ i.jsx(
            Q,
            {
              variant: "danger",
              onClick: function() {
                c.deactivateMaster(h.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            Q,
            {
              onClick: function() {
                c.reactivateMaster(h.username);
              },
              children: "Reactivate"
            }
          )
        ] })
      ] }, h.username);
    })
  ] });
}
var Rc = 100;
function ES() {
  var c = pe(), r = c.activeMasterContext, [d, o] = A.useState([]), [v, h] = A.useState("loading"), [x, C] = A.useState(null), [N, D] = A.useState(!1), w = A.useRef(Math.random().toString(36).slice(2)).current, y = A.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), C(null);
      var U = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Rc);
      if (U.error) {
        C(U.error), h("error");
        return;
      }
      var L = (U.data || []).slice().reverse();
      o(L), D((U.data || []).length === Rc), h("ready");
    },
    [r]
  ), z = A.useCallback(
    async function() {
      o(function(U) {
        if (U.length === 0) return U;
        var L = U[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", L.created_at).order("created_at", { ascending: !1 }).limit(Rc).then(function(q) {
          if (!q.error) {
            var J = (q.data || []).slice().reverse();
            D((q.data || []).length === Rc), o(function(oe) {
              return J.concat(oe);
            });
          }
        }), U;
      });
    },
    [r]
  ), O = A.useCallback(
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
  return A.useEffect(
    function() {
      if (y(), !!r) {
        var U = window.supabase.channel("beta_chat_messages_" + r + "_" + w).on(
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
    error: x,
    hasMoreOlder: N,
    loadOlder: z,
    sendMessage: O,
    reload: y
  };
}
const AS = "_row_gqneb_1", CS = "_meta_gqneb_19", zS = "_status_gqneb_35", DS = "_time_gqneb_43", RS = "_body_gqneb_51", Vu = {
  row: AS,
  meta: CS,
  status: zS,
  time: DS,
  body: RS
};
function MS({ message: c }) {
  var r = window.users[c.sender_username], d = r ? r.displayName : c.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Vu.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Vu.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Vu.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Vu.time, children: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Vu.body, children: c.body })
  ] });
}
const OS = "_form_nndvu_1", US = "_input_nndvu_13", Nh = {
  form: OS,
  input: US
};
function HS({ onSend: c }) {
  var [r, d] = A.useState(""), [o, v] = A.useState(!1);
  async function h(x) {
    x.preventDefault();
    var C = r.trim();
    if (C) {
      v(!0);
      try {
        await c(C), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: Nh.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        className: Nh.input,
        value: r,
        onChange: function(x) {
          d(x.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: o, disabled: !r.trim(), children: "Send" })
  ] });
}
const LS = "_heading_12c2o_1", qS = "_loadOlder_12c2o_11", BS = "_list_12c2o_19", zo = {
  heading: LS,
  loadOlder: qS,
  list: BS
};
function YS() {
  var c = ES(), r = A.useRef(null), d = A.useRef(!0);
  A.useEffect(
    function() {
      var v = r.current;
      v && d.current && (v.scrollTop = v.scrollHeight);
    },
    [c.messages]
  );
  function o() {
    var v = r.current;
    v && (d.current = v.scrollHeight - v.scrollTop - v.clientHeight < 80);
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: zo.heading, children: "Group Chat" }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading chat..." }) : null,
    c.status === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load chat: " + (c.error ? c.error.message : "unknown error"),
        onRetry: c.reload
      }
    ) : null,
    c.status === "ready" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      c.hasMoreOlder ? /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: c.loadOlder, className: zo.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: zo.list, ref: r, onScroll: o, children: c.messages.length === 0 ? /* @__PURE__ */ i.jsx(qe, { icon: "💬", title: "No messages yet. Say hello!" }) : c.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(MS, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(HS, { onSend: c.sendMessage })
    ] }) : null
  ] });
}
function GS(c, r) {
  return new Date(r.updated_at) - new Date(c.updated_at);
}
function Rh() {
  var c = pe(), r = la({
    table: "saved_spirals",
    masterUsername: c.activeMasterContext,
    sort: GS
  }), d = A.useCallback(
    async function(v) {
      var h = await window.saveSpiralToLibrary(v);
      return r.reload(), h;
    },
    [r]
  ), o = A.useCallback(
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
var Mh = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function QS(c, r, d, o) {
  return Object.assign(
    {
      id: c,
      x: r / 2,
      y: d / 2
    },
    Mh,
    {}
  );
}
function XS(c, r, d) {
  var o = Math.min(c.canvas.width, c.canvas.height), v = r.radiusPercent / 100 * o * 2, h = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  c.save(), c.translate(r.x, r.y), c.rotate(r.rotation * Math.PI / 180 + h * 0.5), c.strokeStyle = r.color, c.lineWidth = r.thickness, c.globalAlpha = r.opacity, c.lineCap = "round", c.lineJoin = "round";
  for (var x = 0; x < r.arms; x++) {
    c.save(), c.rotate(x * 2 * Math.PI / r.arms), c.beginPath();
    for (var C = !0, N = 0; N < v; N += 0.5) {
      var D = N * 0.08 + h, w = N * Math.cos(D), y = N * Math.sin(D);
      C ? (c.moveTo(w, y), C = !1) : c.lineTo(w, y);
    }
    c.stroke(), c.restore();
  }
  c.restore();
}
function ZS(c) {
  var r = JSON.stringify(c, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function VS(c, r, d) {
  var o = new FileReader();
  o.onload = function(v) {
    try {
      var h = JSON.parse(v.target.result);
      r(h);
    } catch {
      d("Failed to load configuration. Invalid file format.");
    }
  }, o.readAsText(c);
}
const KS = "_canvas_1y7at_1", JS = {
  canvas: KS
};
function kS({ canvasRef: c, spiralsRef: r, backgroundColor: d }) {
  var o = A.useRef(d);
  return A.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), A.useEffect(function() {
    var v = c.current, h = v.getContext("2d");
    function x() {
      var D = v.parentElement;
      v.width = D.clientWidth, v.height = D.clientHeight, r.current.forEach(function(w) {
        w.x = v.width / 2, w.y = v.height / 2;
      });
    }
    var C = new ResizeObserver(x);
    C.observe(v.parentElement), x();
    var N = requestAnimationFrame(function D(w) {
      N = requestAnimationFrame(D), h.fillStyle = o.current, h.fillRect(0, 0, v.width, v.height), r.current.forEach(function(y) {
        XS(h, y, w);
      });
    });
    return function() {
      cancelAnimationFrame(N), C.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: c, className: JS.canvas });
}
const $S = "_sidebar_1jfxv_1", FS = "_controlGroup_1jfxv_19", WS = "_spiralList_1jfxv_53", IS = "_spiralItem_1jfxv_67", PS = "_spiralItemActive_1jfxv_69", eb = "_actions_1jfxv_97", tb = "_controlRow_1jfxv_107", ab = "_valueDisplay_1jfxv_141", lb = "_sendAsTask_1jfxv_153", dt = {
  sidebar: $S,
  controlGroup: FS,
  spiralList: WS,
  spiralItem: IS,
  spiralItemActive: PS,
  actions: eb,
  controlRow: tb,
  valueDisplay: ab,
  sendAsTask: lb
};
var nb = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function ub({
  textControls: c,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: h,
  onSelect: x,
  onClearAll: C,
  onPropertyChange: N,
  backgroundColor: D,
  onBackgroundChange: w,
  onSave: y,
  onLoadFile: z,
  onOpenTaskModal: O,
  savedSpiralName: U,
  onSaveToLibrary: L
}) {
  var q = A.useRef(null), [J, oe] = A.useState(U || "");
  return /* @__PURE__ */ i.jsxs("div", { className: dt.sidebar, children: [
    c,
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
                /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
                  x(xe);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
                  h(xe);
                }, children: "Delete" })
              ] })
            ]
          },
          V.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      nb.map(function(V) {
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
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: y, children: "Save Config" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
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
        se,
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
        Q,
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
              w(V.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: C, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(Q, { onClick: O, className: dt.sendAsTask, children: "Send as Task" })
  ] });
}
var ib = [
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
function cb(c) {
  var r = c.split(`
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
function sb() {
  var [c, r] = A.useState(ib), [d, o] = A.useState(2e3), [v, h] = A.useState(3e3), [x, C] = A.useState(0.5), [N, D] = A.useState(2.5), [w, y] = A.useState("#ffffff"), [z, O] = A.useState(!1), [U, L] = A.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), q = A.useRef(null), J = A.useRef(0), oe = A.useRef([]), V = A.useRef(!1), xe = A.useRef(v), Ge = A.useRef(x);
  A.useEffect(function() {
    xe.current = v;
  }, [v]), A.useEffect(function() {
    Ge.current = x;
  }, [x]);
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
    q.current && clearTimeout(q.current), oe.current = cb(c), J.current = 0, V.current = !0, O(!0), ne();
  }
  function Fe() {
    V.current = !1, O(!1), q.current && clearTimeout(q.current), L({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return A.useEffect(function() {
    return function() {
      V.current = !1, q.current && clearTimeout(q.current);
    };
  }, []), {
    display: U,
    script: c,
    setScript: r,
    interval: d,
    setInterval: o,
    holdDuration: v,
    setHoldDuration: h,
    animSpeed: x,
    setAnimSpeed: C,
    fontSize: N,
    setFontSize: D,
    color: w,
    setColor: y,
    isRunning: z,
    startLoop: ke,
    stopLoop: Fe
  };
}
const rb = "_overlay_qasw4_1", ob = {
  overlay: rb
};
function fb({ display: c, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: ob.overlay,
      style: {
        opacity: c.shown ? 1 : 0,
        transform: "translate(-50%, -50%) scale(" + (c.shown ? 1 : c.instant ? 0 : 2) + ")",
        transition: c.instant ? "none" : "opacity " + r + "s ease-out, transform " + r + "s ease-out",
        fontSize: d + "rem",
        color: o
      },
      children: c.text
    }
  );
}
const db = "_controlGroup_9ywy2_1", vb = "_script_9ywy2_23", mb = "_controlRow_9ywy2_47", hb = "_valueDisplay_9ywy2_83", gb = "_buttonRow_9ywy2_97", Jt = {
  controlGroup: db,
  script: vb,
  controlRow: mb,
  valueDisplay: hb,
  buttonRow: gb
};
function yb(c) {
  return /* @__PURE__ */ i.jsxs("div", { className: Jt.controlGroup, children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ i.jsx(
      "textarea",
      {
        className: Jt.script,
        value: c.script,
        onChange: function(r) {
          c.setScript(r.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Display Time:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "500",
          max: "5000",
          value: c.interval,
          onChange: function(r) {
            c.setInterval(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Jt.valueDisplay, children: [
        c.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Hold Duration:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "1000",
          max: "8000",
          value: c.holdDuration,
          onChange: function(r) {
            c.setHoldDuration(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Jt.valueDisplay, children: [
        c.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Animation Speed:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "0.1",
          max: "2",
          step: "0.1",
          value: c.animSpeed,
          onChange: function(r) {
            c.setAnimSpeed(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Jt.valueDisplay, children: [
        c.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Text Size:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "range",
          min: "1",
          max: "6",
          step: "0.1",
          value: c.fontSize,
          onChange: function(r) {
            c.setFontSize(Number(r.target.value));
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("span", { className: Jt.valueDisplay, children: [
        c.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.controlRow, children: [
      /* @__PURE__ */ i.jsx("label", { children: "Text Color:" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "color",
          value: c.color,
          onChange: function(r) {
            c.setColor(r.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Jt.buttonRow, children: [
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: c.startLoop, disabled: c.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: c.stopLoop, disabled: !c.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const pb = "_row_vc5cz_1", _b = "_checkboxRow_vc5cz_23", Sb = "_selectLabel_vc5cz_39", bb = "_select_vc5cz_39", xb = "_fieldset_vc5cz_73", jb = "_hint_vc5cz_87", Tb = "_actions_vc5cz_99", _a = {
  row: pb,
  checkboxRow: _b,
  selectLabel: Sb,
  select: bb,
  fieldset: xb,
  hint: jb,
  actions: Tb
};
function Nb({ onClose: c, onSent: r }) {
  var d = pe(), o = Gn(), [v, h] = A.useState("Experience the Spiral Animation"), [x, C] = A.useState(10), [N, D] = A.useState(5), [w, y] = A.useState(""), [z, O] = A.useState(!1), [U, L] = A.useState("daily"), [q, J] = A.useState([]), [oe, V] = A.useState(!1);
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
    if (w) {
      var I = new Date(w);
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
        points: Number(x) || 10,
        penaltyPoints: Number(N) || 5,
        dueDate: w || null,
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
  return /* @__PURE__ */ i.jsxs(Fu, { title: "🌀 Create Spiral Task", onClose: c, children: [
    /* @__PURE__ */ i.jsx(
      se,
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
        se,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: x,
          onChange: function(ee) {
            C(ee.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        se,
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
        se,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: w,
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
              O(ee.target.checked);
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
      /* @__PURE__ */ i.jsx(Q, { loading: oe, onClick: Ge, disabled: q.length === 0, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: c, children: "Cancel" })
    ] })
  ] });
}
const wb = "_overlay_1ka14_1", Eb = "_closeBtn_1ka14_19", Ab = "_viewer_1ka14_51", Cb = "_canvasArea_1ka14_63", Mc = {
  overlay: wb,
  closeBtn: Eb,
  viewer: Ab,
  canvasArea: Cb
};
function Ku(c) {
  return c ? Object.assign({}, c) : null;
}
function zb({ onClose: c, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = A.useRef(null), h = A.useRef([]), x = A.useRef(1), [, C] = A.useState(0), [N, D] = A.useState(0), [w, y] = A.useState(null), [z, O] = A.useState("#000000"), [U, L] = A.useState(!1), [q, J] = A.useState(o || null), [oe, V] = A.useState(d || ""), xe = sb(), Ge = Rh();
  function ee() {
    var B = v.current;
    return B ? { width: B.width, height: B.height } : { width: 0, height: 0 };
  }
  function I() {
    var B = ee(), X = QS(x.current++, B.width, B.height);
    h.current = h.current.concat(X), D(h.current.length - 1), y(Ku(X)), C(function(ce) {
      return ce + 1;
    });
  }
  function ne(B) {
    h.current = h.current.filter(function(ce, he) {
      return he !== B;
    });
    var X = Math.max(0, B - 1);
    D(X), y(Ku(h.current[X])), C(function(ce) {
      return ce + 1;
    });
  }
  function ke(B) {
    D(B), y(Ku(h.current[B]));
  }
  function Fe() {
    h.current = [], D(0), y(null), C(function(B) {
      return B + 1;
    });
  }
  function De(B, X) {
    var ce = h.current[N];
    ce && (ce[B] = X, y(Ku(ce)));
  }
  function Xe() {
    ZS({
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
      return x.current = Math.max(x.current, (ot.id || 0) + 1), Object.assign(
        { x: X.width / 2, y: X.height / 2 },
        Mh,
        ot
      );
    });
    h.current = ce;
    var he = B.globalSettings && B.globalSettings.selectedSpiralIndex || 0;
    D(he), y(Ku(ce[he] || ce[0])), B.globalSettings && B.globalSettings.backgroundColor && O(B.globalSettings.backgroundColor), C(function(ot) {
      return ot + 1;
    });
  }
  function We(B) {
    VS(
      B,
      function(X) {
        te(X), J(null), V(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(X) {
        window.showNotification(X, "error");
      }
    );
  }
  function He(B) {
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
  A.useEffect(function() {
    r ? te(r) : h.current.length === 0 && I();
    function B(X) {
      X.key === "Escape" && c();
    }
    return document.addEventListener("keydown", B), function() {
      document.removeEventListener("keydown", B);
    };
  }, []);
  var G = h.current.map(function(B) {
    return { id: B.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: Mc.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: Mc.closeBtn, onClick: c, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: Mc.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Mc.canvasArea, children: [
        /* @__PURE__ */ i.jsx(kS, { canvasRef: v, spiralsRef: h, backgroundColor: z }),
        /* @__PURE__ */ i.jsx(
          fb,
          {
            display: xe.display,
            animSpeed: xe.animSpeed,
            fontSize: xe.fontSize,
            color: xe.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ub,
        {
          textControls: /* @__PURE__ */ i.jsx(yb, { ...xe }),
          spirals: G,
          activeIndex: N,
          activeSnapshot: w,
          onAdd: I,
          onDelete: ne,
          onSelect: ke,
          onClearAll: Fe,
          onPropertyChange: De,
          backgroundColor: z,
          onBackgroundChange: O,
          onSave: Xe,
          onLoadFile: We,
          onOpenTaskModal: function() {
            L(!0);
          },
          savedSpiralName: oe,
          onSaveToLibrary: He
        }
      )
    ] }),
    U ? /* @__PURE__ */ i.jsx(
      Nb,
      {
        onClose: function() {
          L(!1);
        },
        onSent: function() {
          L(!1), c();
        }
      }
    ) : null
  ] });
}
const Db = "_heading_iikbv_1", Rb = "_row_iikbv_11", Mb = "_meta_iikbv_45", Ob = "_actions_iikbv_55", Ub = "_renameRow_iikbv_67", Ju = {
  heading: Db,
  row: Rb,
  meta: Mb,
  actions: Ob,
  renameRow: Ub
};
function Hb({ savedSpirals: c, status: r, error: d, onReload: o, onLoad: v, onRename: h, onDelete: x }) {
  var [C, N] = A.useState(null), [D, w] = A.useState("");
  function y(O) {
    N(O.id), w(O.name);
  }
  function z(O) {
    var U = D.trim();
    U && h(O, U), N(null);
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ju.heading, children: "Saved Spirals" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading saved spirals..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load saved spirals: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No saved spirals yet", hint: "Save one from inside the generator." }) : null,
    r === "ready" ? c.map(function(O) {
      return /* @__PURE__ */ i.jsx("div", { className: Ju.row, children: C === O.id ? /* @__PURE__ */ i.jsxs("div", { className: Ju.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            value: D,
            onChange: function(U) {
              w(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          z(O);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          N(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: O.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Ju.meta, children: [
            "Updated ",
            new Date(O.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ju.actions, children: [
          /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
            v(O);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
            y(O);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
            x(O.id);
          }, children: "Delete" })
        ] })
      ] }) }, O.id);
    }) : null
  ] });
}
function Lb(c, r) {
  return c.name.localeCompare(r.name);
}
function qb() {
  var c = pe(), r = la({
    table: "saved_cost_tracker_presets",
    masterUsername: c.activeMasterContext,
    sort: Lb
  }), d = A.useCallback(
    async function(v) {
      var h = await window.saveCostTrackerPreset(v);
      return r.reload(), h;
    },
    [r]
  ), o = A.useCallback(
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
const Bb = "_heading_1ynjy_1", Yb = "_row_1ynjy_11", Gb = "_selectGroup_1ynjy_31", Qb = "_selectLabel_1ynjy_45", Xb = "_select_1ynjy_31", Zb = "_fieldset_1ynjy_75", Vb = "_checkboxRow_1ynjy_89", Kb = "_hint_1ynjy_105", Jb = "_penaltyForm_1ynjy_117", kb = "_penaltyList_1ynjy_141", $b = "_removePenalty_1ynjy_157", yt = {
  heading: Bb,
  row: Yb,
  selectGroup: Gb,
  selectLabel: Qb,
  select: Xb,
  fieldset: Zb,
  checkboxRow: Vb,
  hint: Kb,
  penaltyForm: Jb,
  penaltyList: kb,
  removePenalty: $b
};
function Fb({ onStart: c, onSavePreset: r, presetToApply: d }) {
  var o = pe(), v = Gn(), [h, x] = A.useState("Cost Tracker Running"), [C, N] = A.useState(50), [D, w] = A.useState("€"), [y, z] = A.useState(6e4), [O, U] = A.useState([]), [L, q] = A.useState(!1), [J, oe] = A.useState([]), [V, xe] = A.useState(""), [Ge, ee] = A.useState(""), [I, ne] = A.useState("");
  function ke(te) {
    U(function(We) {
      return We.includes(te) ? We.filter(function(He) {
        return He !== te;
      }) : We.concat(te);
    });
  }
  if (A.useEffect(
    function() {
      d && (x(d.description || "Cost Tracker Running"), N(d.rate), w(d.currency), z(d.increment_interval));
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
      return We.filter(function(He, G) {
        return G !== te;
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
        rate: Number(C) || 0,
        currency: D,
        incrementInterval: Number(y)
      }), await c(h, Number(C) || 0, D, Number(y), J, O), oe([]), ne(""), U([]);
    } finally {
      q(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: yt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: yt.form, onSubmit: Xe, children: [
      /* @__PURE__ */ i.jsx(
        se,
        {
          label: "Description",
          value: h,
          onChange: function(te) {
            x(te.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: yt.row, children: [
        /* @__PURE__ */ i.jsx(
          se,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: C,
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
                w(te.target.value);
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
          se,
          {
            label: "Penalty description",
            value: V,
            onChange: function(te) {
              xe(te.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          se,
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
          Q,
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
                checked: O.includes(te.username),
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
        se,
        {
          label: "Save as preset (optional)",
          placeholder: "Name this config to reuse it later",
          value: I,
          onChange: function(te) {
            ne(te.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Q, { type: "submit", loading: L, disabled: O.length === 0, children: "Start tracker" })
    ] })
  ] });
}
const Wb = "_heading_girf2_1", Ib = "_row_girf2_11", Pb = "_meta_girf2_45", ex = "_actions_girf2_55", Oc = {
  heading: Wb,
  row: Ib,
  meta: Pb,
  actions: ex
};
function tx({ presets: c, status: r, error: d, onReload: o, onUse: v, onDelete: h }) {
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Oc.heading, children: "Saved Presets" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading presets..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: "Couldn't load presets: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No saved presets yet", hint: "Save one while starting a tracker below." }) : null,
    r === "ready" ? c.map(function(x) {
      return /* @__PURE__ */ i.jsxs("div", { className: Oc.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: x.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Oc.meta, children: [
            x.currency,
            Number(x.rate).toFixed(2),
            " per",
            " ",
            x.increment_interval === 1e3 ? "second" : x.increment_interval === 36e5 ? "hour" : "minute",
            x.description ? " · " + x.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Oc.actions, children: [
          /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
            v(x);
          }, children: "Use" }),
          /* @__PURE__ */ i.jsx(Q, { variant: "danger", onClick: function() {
            h(x.id);
          }, children: "Delete" })
        ] })
      ] }, x.id);
    }) : null
  ] });
}
const ax = "_heading_1k7pj_1", lx = "_row_1k7pj_11", nx = "_meta_1k7pj_45", Do = {
  heading: ax,
  row: lx,
  meta: nx
};
function ux(c) {
  return c === 1e3 ? "second" : c === 36e5 ? "hour" : "minute";
}
function ix({ trackers: c, onDelete: r }) {
  return /* @__PURE__ */ i.jsxs(ye, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Do.heading, children: "Recently Stopped" }),
    c.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No stopped trackers yet" }) : c.map(function(d) {
      return /* @__PURE__ */ i.jsxs("div", { className: Do.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: d.description }),
          /* @__PURE__ */ i.jsxs("div", { className: Do.meta, children: [
            d.currency,
            Number(d.rate).toFixed(2),
            " per ",
            ux(Number(d.increment_interval)),
            " · stopped " + new Date(d.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsx(Q, { variant: "secondary", onClick: function() {
          r(d.id);
        }, children: "Delete" })
      ] }, d.id);
    })
  ] });
}
const cx = "_heading_lmzbq_1", sx = {
  heading: cx
};
function rx() {
  var c = Mo(), r = qb(), [d, o] = A.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      Fb,
      {
        onStart: c.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      tx,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: sx.heading, children: "Active Cost Trackers" }),
    c.trackers.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No active cost trackers" }) : c.trackers.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        Uc,
        {
          tracker: v,
          isAdmin: !0,
          onStop: c.stopTracker,
          onDelete: c.deleteTracker,
          onAddPenalty: c.addPenalty,
          onRemovePenalty: c.removePenalty
        },
        v.id
      );
    }),
    /* @__PURE__ */ i.jsx(
      ix,
      {
        trackers: c.stoppedTrackers,
        onDelete: c.deleteTracker
      }
    )
  ] });
}
const ox = "_section_1o04b_1", fx = "_sectionHeader_1o04b_9", dx = "_heading_1o04b_27", ku = {
  section: ox,
  sectionHeader: fx,
  heading: dx
};
function vx() {
  var c = Rh(), [r, d] = A.useState(!1), [o, v] = A.useState(null), [h, x] = A.useState(null), [C, N] = A.useState("");
  function D() {
    v(null), x(null), N(""), d(!0);
  }
  function w(O) {
    v(O.config), x(O.id), N(O.name), d(!0);
  }
  function y() {
    d(!1), c.reload();
  }
  function z(O, U) {
    c.saveSpiral({ id: O.id, name: U, config: O.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ye, { className: ku.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: ku.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: ku.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(Q, { onClick: D, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        Hb,
        {
          savedSpirals: c.savedSpirals,
          status: c.status,
          error: c.error,
          onReload: c.reload,
          onLoad: w,
          onRename: z,
          onDelete: c.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(ye, { className: ku.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: ku.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(rx, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      zb,
      {
        onClose: y,
        initialConfig: o,
        initialSavedId: h,
        initialName: C
      }
    ) : null
  ] });
}
const mx = "_card_ngtsx_1", hx = "_header_ngtsx_19", gx = "_name_ngtsx_33", yx = "_onlineDot_ngtsx_41", px = "_offlineDot_ngtsx_43", _x = "_points_ngtsx_75", Sx = "_negative_ngtsx_87", bx = "_zero_ngtsx_95", xx = "_positive_ngtsx_103", jx = "_metaRow_ngtsx_111", Tx = "_pendingBadge_ngtsx_127", Nx = "_trackerBadge_ngtsx_145", kt = {
  card: mx,
  header: hx,
  name: gx,
  onlineDot: yx,
  offlineDot: px,
  points: _x,
  negative: Sx,
  zero: bx,
  positive: xx,
  metaRow: jx,
  pendingBadge: Tx,
  trackerBadge: Nx
};
function wx(c) {
  return c < 0 ? kt.negative : c === 0 ? kt.zero : kt.positive;
}
function Ex({
  slave: c,
  online: r,
  tracker: d,
  pendingCount: o,
  completionRate: v,
  onClick: h
}) {
  return /* @__PURE__ */ i.jsxs(
    ye,
    {
      className: kt.card,
      onClick: h,
      role: "button",
      tabIndex: 0,
      onKeyDown: function(x) {
        (x.key === "Enter" || x.key === " ") && h();
      },
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: kt.header, children: [
          /* @__PURE__ */ i.jsx("span", { className: kt.name, children: c.displayName }),
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: r ? kt.onlineDot : kt.offlineDot,
              title: r ? "Online" : "Offline"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: [kt.points, wx(c.points)].join(" "), children: [
          c.points,
          " pts"
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: kt.metaRow, children: [
          /* @__PURE__ */ i.jsxs("span", { children: [
            v,
            "% complete"
          ] }),
          o > 0 ? /* @__PURE__ */ i.jsxs("span", { className: kt.pendingBadge, children: [
            o,
            " pending"
          ] }) : null
        ] }),
        d ? /* @__PURE__ */ i.jsx("div", { className: kt.trackerBadge, children: "💰 Tracker running" }) : null
      ]
    }
  );
}
const Ax = "_section_11wsb_1", Cx = "_heading_11wsb_9", zx = "_list_11wsb_19", Dx = "_listItem_11wsb_37", Rx = "_status_11wsb_59", aa = {
  section: Ax,
  heading: Cx,
  list: zx,
  listItem: Dx,
  status: Rx
};
function Mx({
  slave: c,
  tasks: r,
  suggestions: d,
  tracker: o,
  onClose: v
}) {
  var h = r.filter(function(N) {
    return N.status === "todo" || N.status === "pending_approval";
  }), x = r.filter(function(N) {
    return N.status === "completed";
  }), C = d.filter(function(N) {
    return N.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs(Fu, { title: c.displayName, onClose: v, children: [
    o ? /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Active Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Uc, { tracker: o, isAdmin: !1 })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsxs("h4", { className: aa.heading, children: [
        "Tasks (",
        x.length,
        "/",
        r.length,
        " completed)"
      ] }),
      h.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No pending tasks" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: h.map(function(N) {
        return /* @__PURE__ */ i.jsxs("li", { className: aa.listItem, children: [
          N.text.split(`
`)[0],
          /* @__PURE__ */ i.jsx("span", { className: aa.status, children: N.status })
        ] }, N.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Pending Suggestions" }),
      C.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No pending suggestions" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: C.map(function(N) {
        return /* @__PURE__ */ i.jsx("li", { className: aa.listItem, children: N.description }, N.id);
      }) })
    ] })
  ] });
}
const Ox = "_section_10rik_1", Ux = "_heading_10rik_9", Hx = "_grid_10rik_19", Lx = "_invoiceList_10rik_31", qx = "_invoiceItem_10rik_49", ml = {
  section: Ox,
  heading: Ux,
  grid: Hx,
  invoiceList: Lx,
  invoiceItem: qx
};
function Bx() {
  var c = pe(), r = Gn(), d = Mo(), o = Hc(), v = Ch(), h = Ah(), [x, C] = A.useState(null), N = o.tasks.filter(function(U) {
    return U.type === "cost-tracker" && U.status === "pending_approval";
  });
  function D(U) {
    var L = h.activity.find(function(q) {
      return q.user === U;
    });
    return !!(L && L.action === "login");
  }
  function w(U) {
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
  var O = x ? r.slaves.find(function(U) {
    return U.username === x;
  }) : null;
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ye, { className: ml.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: ml.heading, children: "Active Cost Trackers" }),
      d.trackers.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No active cost trackers" }) : d.trackers.map(function(U) {
        return /* @__PURE__ */ i.jsx(
          Uc,
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
    /* @__PURE__ */ i.jsxs(ye, { className: ml.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: ml.heading, children: "Invoices Awaiting Approval" }),
      N.length === 0 ? /* @__PURE__ */ i.jsx(qe, { title: "No invoices awaiting approval" }) : /* @__PURE__ */ i.jsx("ul", { className: ml.invoiceList, children: N.map(function(U) {
        return /* @__PURE__ */ i.jsxs("li", { className: ml.invoiceItem, children: [
          /* @__PURE__ */ i.jsx("span", { children: U.text.split(`
`)[0] }),
          /* @__PURE__ */ i.jsx(
            Q,
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
    /* @__PURE__ */ i.jsx("h2", { className: ml.heading, children: c.groupTerms.slaveLabelPlural }),
    r.slaves.length === 0 ? /* @__PURE__ */ i.jsx(
      qe,
      {
        title: "No " + c.groupTerms.slaveLabelPlural + " added yet"
      }
    ) : /* @__PURE__ */ i.jsx("div", { className: ml.grid, children: r.slaves.map(function(U) {
      return /* @__PURE__ */ i.jsx(
        Ex,
        {
          slave: U,
          online: D(U.username),
          tracker: z(U.username),
          pendingCount: y(U.username),
          completionRate: w(U.username),
          onClick: function() {
            C(U.username);
          }
        },
        U.username
      );
    }) }),
    O ? /* @__PURE__ */ i.jsx(
      Mx,
      {
        slave: O,
        tasks: o.tasks.filter(function(U) {
          return U.assignedTo === O.username;
        }),
        suggestions: v.suggestions.filter(function(U) {
          return U.suggestedBy === O.username;
        }),
        tracker: z(O.username),
        onClose: function() {
          C(null);
        }
      }
    ) : null
  ] });
}
const Yx = "_banner_znl1a_1", Gx = {
  banner: Yx
};
function Qx() {
  var c = pe(), r = Dh();
  return !c.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: Gx.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
function Xx({ activeTab: c }) {
  var r = pe();
  switch (c) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(op, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(gp, {});
    case "overview":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Bx, {}) : null;
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Xp, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx(vx, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(Pp, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(L_, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(YS, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(uS, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(wS, {}) : null;
    default:
      return null;
  }
}
function Zx() {
  var c = pe(), [r, d] = A.useState("tasks"), o = {
    "--color-bg": c.theme.bg,
    "--color-card": c.theme.card,
    "--color-elevated": c.theme.elevated,
    "--color-text-primary": c.theme.textPrimary,
    "--color-text-secondary": c.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", "data-theme": c.themeMode, style: o, children: [
    /* @__PURE__ */ i.jsx(E1, {}),
    /* @__PURE__ */ i.jsx(D1, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsxs("main", { className: "betaContainer", children: [
      /* @__PURE__ */ i.jsx(Qx, {}),
      /* @__PURE__ */ i.jsx(Xx, { activeTab: r })
    ] })
  ] });
}
function Vx() {
  return /* @__PURE__ */ i.jsx(Y0, { children: /* @__PURE__ */ i.jsx(Zx, {}) });
}
var Yn = null;
function Kx(c) {
  Yn || (Yn = B0.createRoot(c), Yn.render(/* @__PURE__ */ i.jsx(Vx, {})));
}
function Jx() {
  Yn && (Yn.unmount(), Yn = null);
}
export {
  Kx as mountBetaApp,
  Jx as unmountBetaApp
};
