var So = { exports: {} }, Lu = {};
var sh;
function O0() {
  if (sh) return Lu;
  sh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, h) {
    var p = null;
    if (h !== void 0 && (p = "" + h), v.key !== void 0 && (p = "" + v.key), "key" in v) {
      h = {};
      for (var w in v)
        w !== "key" && (h[w] = v[w]);
    } else h = v;
    return v = h.ref, {
      $$typeof: s,
      type: o,
      key: p,
      ref: v !== void 0 ? v : null,
      props: h
    };
  }
  return Lu.Fragment = r, Lu.jsx = d, Lu.jsxs = d, Lu;
}
var ch;
function U0() {
  return ch || (ch = 1, So.exports = O0()), So.exports;
}
var i = U0(), bo = { exports: {} }, qu = {}, xo = { exports: {} }, jo = {};
var rh;
function H0() {
  return rh || (rh = 1, function(s) {
    function r(G, q) {
      var V = G.length;
      G.push(q);
      e: for (; 0 < V; ) {
        var ce = V - 1 >>> 1, he = G[ce];
        if (0 < v(he, q))
          G[ce] = q, G[V] = he, V = ce;
        else break e;
      }
    }
    function d(G) {
      return G.length === 0 ? null : G[0];
    }
    function o(G) {
      if (G.length === 0) return null;
      var q = G[0], V = G.pop();
      if (V !== q) {
        G[0] = V;
        e: for (var ce = 0, he = G.length, ot = he >>> 1; ce < ot; ) {
          var Sa = 2 * (ce + 1) - 1, yl = G[Sa], _ = Sa + 1, H = G[_];
          if (0 > v(yl, V))
            _ < he && 0 > v(H, yl) ? (G[ce] = H, G[_] = V, ce = _) : (G[ce] = yl, G[Sa] = V, ce = Sa);
          else if (_ < he && 0 > v(H, V))
            G[ce] = H, G[_] = V, ce = _;
          else break e;
        }
      }
      return q;
    }
    function v(G, q) {
      var V = G.sortIndex - q.sortIndex;
      return V !== 0 ? V : G.id - q.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      s.unstable_now = function() {
        return h.now();
      };
    } else {
      var p = Date, w = p.now();
      s.unstable_now = function() {
        return p.now() - w;
      };
    }
    var T = [], D = [], j = 1, y = null, z = 3, R = !1, U = !1, L = !1, Q = !1, k = typeof setTimeout == "function" ? setTimeout : null, ne = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function re(G) {
      for (var q = d(D); q !== null; ) {
        if (q.callback === null) o(D);
        else if (q.startTime <= G)
          o(D), q.sortIndex = q.expirationTime, r(T, q);
        else break;
        q = d(D);
      }
    }
    function Le(G) {
      if (L = !1, re(G), !U)
        if (d(T) !== null)
          U = !0, Oe || (Oe = !0, $e());
        else {
          var q = d(D);
          q !== null && Me(Le, q.startTime - G);
        }
    }
    var Oe = !1, X = -1, le = 5, Qe = -1;
    function qe() {
      return Q ? !0 : !(s.unstable_now() - Qe < le);
    }
    function We() {
      if (Q = !1, Oe) {
        var G = s.unstable_now();
        Qe = G;
        var q = !0;
        try {
          e: {
            U = !1, L && (L = !1, ne(X), X = -1), R = !0;
            var V = z;
            try {
              t: {
                for (re(G), y = d(T); y !== null && !(y.expirationTime > G && qe()); ) {
                  var ce = y.callback;
                  if (typeof ce == "function") {
                    y.callback = null, z = y.priorityLevel;
                    var he = ce(
                      y.expirationTime <= G
                    );
                    if (G = s.unstable_now(), typeof he == "function") {
                      y.callback = he, re(G), q = !0;
                      break t;
                    }
                    y === d(T) && o(T), re(G);
                  } else o(T);
                  y = d(T);
                }
                if (y !== null) q = !0;
                else {
                  var ot = d(D);
                  ot !== null && Me(
                    Le,
                    ot.startTime - G
                  ), q = !1;
                }
              }
              break e;
            } finally {
              y = null, z = V, R = !1;
            }
            q = void 0;
          }
        } finally {
          q ? $e() : Oe = !1;
        }
      }
    }
    var $e;
    if (typeof K == "function")
      $e = function() {
        K(We);
      };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), Xe = P.port2;
      P.port1.onmessage = We, $e = function() {
        Xe.postMessage(null);
      };
    } else
      $e = function() {
        k(We, 0);
      };
    function Me(G, q) {
      X = k(function() {
        G(s.unstable_now());
      }, q);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, s.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : le = 0 < G ? Math.floor(1e3 / G) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, s.unstable_next = function(G) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = z;
      }
      var V = z;
      z = q;
      try {
        return G();
      } finally {
        z = V;
      }
    }, s.unstable_requestPaint = function() {
      Q = !0;
    }, s.unstable_runWithPriority = function(G, q) {
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
      var V = z;
      z = G;
      try {
        return q();
      } finally {
        z = V;
      }
    }, s.unstable_scheduleCallback = function(G, q, V) {
      var ce = s.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? ce + V : ce) : V = ce, G) {
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
      return he = V + he, G = {
        id: j++,
        callback: q,
        priorityLevel: G,
        startTime: V,
        expirationTime: he,
        sortIndex: -1
      }, V > ce ? (G.sortIndex = V, r(D, G), d(T) === null && G === d(D) && (L ? (ne(X), X = -1) : L = !0, Me(Le, V - ce))) : (G.sortIndex = he, r(T, G), U || R || (U = !0, Oe || (Oe = !0, $e()))), G;
    }, s.unstable_shouldYield = qe, s.unstable_wrapCallback = function(G) {
      var q = z;
      return function() {
        var V = z;
        z = q;
        try {
          return G.apply(this, arguments);
        } finally {
          z = V;
        }
      };
    };
  }(jo)), jo;
}
var oh;
function L0() {
  return oh || (oh = 1, xo.exports = H0()), xo.exports;
}
var To = { exports: {} }, ae = {};
var fh;
function q0() {
  if (fh) return ae;
  fh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), p = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), z = Symbol.for("react.view_transition"), R = Symbol.iterator;
  function U(_) {
    return _ === null || typeof _ != "object" ? null : (_ = R && _[R] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, Q = Object.assign, k = {};
  function ne(_, H, W) {
    this.props = _, this.context = H, this.refs = k, this.updater = W || L;
  }
  ne.prototype.isReactComponent = {}, ne.prototype.setState = function(_, H) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, H, "setState");
  }, ne.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function K() {
  }
  K.prototype = ne.prototype;
  function re(_, H, W) {
    this.props = _, this.context = H, this.refs = k, this.updater = W || L;
  }
  var Le = re.prototype = new K();
  Le.constructor = re, Q(Le, ne.prototype), Le.isPureReactComponent = !0;
  var Oe = Array.isArray;
  function X() {
  }
  var le = { H: null, A: null, T: null, S: null }, Qe = Object.prototype.hasOwnProperty;
  function qe(_, H, W) {
    var I = W.ref;
    return {
      $$typeof: s,
      type: _,
      key: H,
      ref: I !== void 0 ? I : null,
      props: W
    };
  }
  function We(_, H) {
    return qe(_.type, H, _.props);
  }
  function $e(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === s;
  }
  function P(_) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(W) {
      return H[W];
    });
  }
  var Xe = /\/+/g;
  function Me(_, H) {
    return typeof _ == "object" && _ !== null && _.key != null ? P("" + _.key) : H.toString(36);
  }
  function G(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(X, X) : (_.status = "pending", _.then(
          function(H) {
            _.status === "pending" && (_.status = "fulfilled", _.value = H);
          },
          function(H) {
            _.status === "pending" && (_.status = "rejected", _.reason = H);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function q(_, H, W, I, _e) {
    var Se = typeof _;
    (Se === "undefined" || Se === "boolean") && (_ = null);
    var xe = !1;
    if (_ === null) xe = !0;
    else
      switch (Se) {
        case "bigint":
        case "string":
        case "number":
          xe = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case s:
            case r:
              xe = !0;
              break;
            case j:
              return xe = _._init, q(
                xe(_._payload),
                H,
                W,
                I,
                _e
              );
          }
      }
    if (xe)
      return _e = _e(_), xe = I === "" ? "." + Me(_, 0) : I, Oe(_e) ? (W = "", xe != null && (W = xe.replace(Xe, "$&/") + "/"), q(_e, H, W, "", function(ba) {
        return ba;
      })) : _e != null && ($e(_e) && (_e = We(
        _e,
        W + (_e.key == null || _ && _.key === _e.key ? "" : ("" + _e.key).replace(
          Xe,
          "$&/"
        ) + "/") + xe
      )), H.push(_e)), 1;
    xe = 0;
    var $ = I === "" ? "." : I + ":";
    if (Oe(_))
      for (var te = 0; te < _.length; te++)
        I = _[te], Se = $ + Me(I, te), xe += q(
          I,
          H,
          W,
          Se,
          _e
        );
    else if (te = U(_), typeof te == "function")
      for (_ = te.call(_), te = 0; !(I = _.next()).done; )
        I = I.value, Se = $ + Me(I, te++), xe += q(
          I,
          H,
          W,
          Se,
          _e
        );
    else if (Se === "object") {
      if (typeof _.then == "function")
        return q(
          G(_),
          H,
          W,
          I,
          _e
        );
      throw H = String(_), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xe;
  }
  function V(_, H, W) {
    if (_ == null) return _;
    var I = [], _e = 0;
    return q(_, I, "", "", function(Se) {
      return H.call(W, Se, _e++);
    }), I;
  }
  function ce(_) {
    if (_._status === -1) {
      var H = _._result, W = H();
      W.then(
        function(I) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = I, W.status === void 0 && (W.status = "fulfilled", W.value = I));
        },
        function(I) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = I, W.status === void 0 && (W.status = "rejected", W.reason = I));
        }
      ), _._status === -1 && (_._status = 0, _._result = W);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var he = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  };
  function ot(_) {
    var H = le.T, W = {};
    W.types = H !== null ? H.types : null, le.T = W;
    try {
      var I = _(), _e = le.S;
      _e !== null && _e(W, I), typeof I == "object" && I !== null && typeof I.then == "function" && I.then(X, he);
    } catch (Se) {
      he(Se);
    } finally {
      H !== null && W.types !== null && (H.types = W.types), le.T = H;
    }
  }
  function Sa(_) {
    var H = le.T;
    if (H !== null) {
      var W = H.types;
      W === null ? H.types = [_] : W.indexOf(_) === -1 && W.push(_);
    } else ot(Sa.bind(null, _));
  }
  var yl = {
    map: V,
    forEach: function(_, H, W) {
      V(
        _,
        function() {
          H.apply(this, arguments);
        },
        W
      );
    },
    count: function(_) {
      var H = 0;
      return V(_, function() {
        H++;
      }), H;
    },
    toArray: function(_) {
      return V(_, function(H) {
        return H;
      }) || [];
    },
    only: function(_) {
      if (!$e(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return ae.Activity = y, ae.Children = yl, ae.Component = ne, ae.Fragment = d, ae.Profiler = v, ae.PureComponent = re, ae.StrictMode = o, ae.Suspense = T, ae.ViewTransition = z, ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = le, ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return le.H.useMemoCache(_);
    }
  }, ae.addTransitionType = Sa, ae.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, ae.cacheSignal = function() {
    return null;
  }, ae.cloneElement = function(_, H, W) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var I = Q({}, _.props), _e = _.key;
    if (H != null)
      for (Se in H.key !== void 0 && (_e = "" + H.key), H)
        !Qe.call(H, Se) || Se === "key" || Se === "__self" || Se === "__source" || Se === "ref" && H.ref === void 0 || (I[Se] = H[Se]);
    var Se = arguments.length - 2;
    if (Se === 1) I.children = W;
    else if (1 < Se) {
      for (var xe = Array(Se), $ = 0; $ < Se; $++)
        xe[$] = arguments[$ + 2];
      I.children = xe;
    }
    return qe(_.type, _e, I);
  }, ae.createContext = function(_) {
    return _ = {
      $$typeof: p,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: h,
      _context: _
    }, _;
  }, ae.createElement = function(_, H, W) {
    var I, _e = {}, Se = null;
    if (H != null)
      for (I in H.key !== void 0 && (Se = "" + H.key), H)
        Qe.call(H, I) && I !== "key" && I !== "__self" && I !== "__source" && (_e[I] = H[I]);
    var xe = arguments.length - 2;
    if (xe === 1) _e.children = W;
    else if (1 < xe) {
      for (var $ = Array(xe), te = 0; te < xe; te++)
        $[te] = arguments[te + 2];
      _e.children = $;
    }
    if (_ && _.defaultProps)
      for (I in xe = _.defaultProps, xe)
        _e[I] === void 0 && (_e[I] = xe[I]);
    return qe(_, Se, _e);
  }, ae.createRef = function() {
    return { current: null };
  }, ae.forwardRef = function(_) {
    return { $$typeof: w, render: _ };
  }, ae.isValidElement = $e, ae.lazy = function(_) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: _ },
      _init: ce
    };
  }, ae.memo = function(_, H) {
    return {
      $$typeof: D,
      type: _,
      compare: H === void 0 ? null : H
    };
  }, ae.startTransition = ot, ae.unstable_useCacheRefresh = function() {
    return le.H.useCacheRefresh();
  }, ae.use = function(_) {
    return le.H.use(_);
  }, ae.useActionState = function(_, H, W) {
    return le.H.useActionState(_, H, W);
  }, ae.useCallback = function(_, H) {
    return le.H.useCallback(_, H);
  }, ae.useContext = function(_) {
    return le.H.useContext(_);
  }, ae.useDebugValue = function() {
  }, ae.useDeferredValue = function(_, H) {
    return le.H.useDeferredValue(_, H);
  }, ae.useEffect = function(_, H) {
    return le.H.useEffect(_, H);
  }, ae.useEffectEvent = function(_) {
    return le.H.useEffectEvent(_);
  }, ae.useId = function() {
    return le.H.useId();
  }, ae.useImperativeHandle = function(_, H, W) {
    return le.H.useImperativeHandle(_, H, W);
  }, ae.useInsertionEffect = function(_, H) {
    return le.H.useInsertionEffect(_, H);
  }, ae.useLayoutEffect = function(_, H) {
    return le.H.useLayoutEffect(_, H);
  }, ae.useMemo = function(_, H) {
    return le.H.useMemo(_, H);
  }, ae.useOptimistic = function(_, H) {
    return le.H.useOptimistic(_, H);
  }, ae.useReducer = function(_, H, W) {
    return le.H.useReducer(_, H, W);
  }, ae.useRef = function(_) {
    return le.H.useRef(_);
  }, ae.useState = function(_) {
    return le.H.useState(_);
  }, ae.useSyncExternalStore = function(_, H, W) {
    return le.H.useSyncExternalStore(
      _,
      H,
      W
    );
  }, ae.useTransition = function() {
    return le.H.useTransition();
  }, ae.version = "19.3.1", ae;
}
var dh;
function Mo() {
  return dh || (dh = 1, To.exports = q0()), To.exports;
}
var No = { exports: {} }, rt = {};
var vh;
function B0() {
  if (vh) return rt;
  vh = 1;
  var s = Mo();
  function r(j) {
    var y = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var z = 2; z < arguments.length; z++)
        y += "&args[]=" + encodeURIComponent(arguments[z]);
    }
    return "Minified React error #" + j + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, v = Symbol.for("react.portal"), h = Symbol.for("react.recoverable"), p = Symbol.for("react.optimistic_key");
  function w(j, y, z) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: R == null ? null : R === p ? p : "" + R,
      children: j,
      containerInfo: y,
      implementation: z
    };
  }
  var T = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(j, y) {
    if (j === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, rt.browser = function(j) {
    return { $$typeof: h, _reason: j };
  }, rt.createPortal = function(j, y) {
    var z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(r(299));
    return w(j, y, null, z);
  }, rt.flushSync = function(j) {
    var y = T.T, z = o.p;
    try {
      if (T.T = null, o.p = 2, j) return j();
    } finally {
      T.T = y, o.p = z, o.d.f();
    }
  }, rt.preconnect = function(j, y) {
    typeof j == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, o.d.C(j, y));
  }, rt.prefetchDNS = function(j) {
    typeof j == "string" && o.d.D(j);
  }, rt.preinit = function(j, y) {
    if (typeof j == "string" && y && typeof y.as == "string") {
      var z = y.as, R = D(z, y.crossOrigin), U = typeof y.integrity == "string" ? y.integrity : void 0, L = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      z === "style" ? o.d.S(
        j,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: R,
          integrity: U,
          fetchPriority: L
        }
      ) : z === "script" && o.d.X(j, {
        crossOrigin: R,
        integrity: U,
        fetchPriority: L,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, rt.preinitModule = function(j, y) {
    if (typeof j == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var z = D(
            y.as,
            y.crossOrigin
          );
          o.d.M(j, {
            crossOrigin: z,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
          });
        }
      } else y == null && o.d.M(j);
  }, rt.preload = function(j, y) {
    if (typeof j == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var z = y.as, R = D(z, y.crossOrigin);
      o.d.L(j, z, {
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
  }, rt.preloadModule = function(j, y) {
    if (typeof j == "string")
      if (y) {
        var z = D(y.as, y.crossOrigin);
        o.d.m(j, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: z,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
        });
      } else o.d.m(j);
  }, rt.requestFormReset = function(j) {
    o.d.r(j);
  }, rt.unstable_batchedUpdates = function(j, y) {
    return j(y);
  }, rt.useFormState = function(j, y, z) {
    return T.H.useFormState(j, y, z);
  }, rt.useFormStatus = function() {
    return T.H.useHostTransitionStatus();
  }, rt.version = "19.3.1", rt;
}
var mh;
function Y0() {
  if (mh) return No.exports;
  mh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), No.exports = B0(), No.exports;
}
var hh;
function G0() {
  if (hh) return qu;
  hh = 1;
  var s = L0(), r = Mo(), d = Y0();
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
  function p(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function w(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function T(e) {
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
          if (u === a) return T(n), e;
          if (u === l) return T(n), t;
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
  function j(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = j(e), t !== null) return t;
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
  function Q(e) {
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
  var k = null, ne = null;
  function K(e, t, a) {
    return e === a ? !0 : e === t ? (k = e, !0) : !1;
  }
  function re(e, t, a) {
    return e === a ? (ne = e, !1) : e === t ? (ne !== null && (k = e), !0) : !1;
  }
  function Le(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function Oe(e, t, a) {
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
  var X = Object.assign, le = Symbol.for("react.element"), Qe = Symbol.for("react.transitional.element"), qe = Symbol.for("react.portal"), We = Symbol.for("react.fragment"), $e = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), Xe = Symbol.for("react.consumer"), Me = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), Sa = Symbol.for("react.legacy_hidden"), yl = Symbol.for("react.memo_cache_sentinel"), _ = Symbol.for("react.view_transition"), H = Symbol.for("react.recoverable"), W = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = W && e[W] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var _e = Symbol.for("react.client.reference");
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === _e ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case We:
        return "Fragment";
      case P:
        return "Profiler";
      case $e:
        return "StrictMode";
      case q:
        return "Suspense";
      case V:
        return "SuspenseList";
      case ot:
        return "Activity";
      case _:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case qe:
          return "Portal";
        case Me:
          return e.displayName || "Context";
        case Xe:
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
  var xe = Array.isArray, $ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ba = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, qs = [], Ql = -1;
  function ua(e) {
    return { current: e };
  }
  function at(e) {
    0 > Ql || (e.current = qs[Ql], qs[Ql] = null, Ql--);
  }
  function ze(e, t) {
    Ql++, qs[Ql] = e.current, e.current = t;
  }
  var ia = ua(null), Xn = ua(null), Ya = ua(null), Iu = ua(null);
  function Pu(e, t) {
    switch (ze(Ya, t), ze(Xn, e), ze(ia, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? gm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = gm(t), e = ym(t, e);
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
    at(ia), ze(ia, e);
  }
  function Xl() {
    at(ia), at(Xn), at(Ya);
  }
  function Bs(e) {
    var t = e.memoizedState;
    t !== null && (Dn._currentValue = t.memoizedState, ze(Iu, e)), t = ia.current;
    var a = ym(t, e.type);
    t !== a && (ze(Xn, e), ze(ia, a));
  }
  function ei(e) {
    Xn.current === e && (at(ia), at(Xn)), Iu.current === e && (at(Iu), Dn._currentValue = ba);
  }
  var Ys, Ho;
  function Ga(e) {
    if (Ys === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Ys = t && t[1] || "", Ho = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ys + e + Ho;
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
                } catch (B) {
                  var S = B;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (B) {
                  S = B;
                }
                O = !1;
                try {
                  var A = Object.getOwnPropertyDescriptor(
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
                  O && (A !== void 0 ? Object.defineProperty(e.prototype, "props", A) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                S = B;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (B) {
            if (B && S && typeof B.stack == "string")
              return [B.stack, S.stack];
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
  function qh(e, t) {
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
  function Lo(e) {
    try {
      var t = "", a = null;
      do
        t += qh(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Xs = Object.prototype.hasOwnProperty, Vs = s.unstable_scheduleCallback, Zs = s.unstable_cancelCallback, Bh = s.unstable_shouldYield, Yh = s.unstable_requestPaint, Nt = s.unstable_now, Gh = s.unstable_getCurrentPriorityLevel, qo = s.unstable_ImmediatePriority, Bo = s.unstable_UserBlockingPriority, ti = s.unstable_NormalPriority, Qh = s.unstable_LowPriority, Yo = s.unstable_IdlePriority, Xh = s.log, Vh = s.unstable_setDisableYieldValue, Vn = null, wt = null;
  function Qa(e) {
    if (typeof Xh == "function" && Vh(e), wt && typeof wt.setStrictMode == "function")
      try {
        wt.setStrictMode(Vn, e);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : Jh, Zh = Math.log, Kh = Math.LN2;
  function Jh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Zh(e) / Kh | 0) | 0;
  }
  var ai = 256, li = 262144, ni = 4194304;
  function pl(e) {
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
  function ui(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = pl(l) : (c &= f, c !== 0 ? n = pl(c) : a || (a = f & ~e, a !== 0 && (n = pl(a))))) : (f = l & ~u, f !== 0 ? n = pl(f) : c !== 0 ? n = pl(c) : a || (a = l & ~e, a !== 0 && (n = pl(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Zn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Go(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - Et(a), n = 1 << l;
        t |= e[l], a &= ~n;
      }
    return t;
  }
  function kh(e, t) {
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
  function Qo() {
    var e = ni;
    return ni <<= 1, (ni & 62914560) === 0 && (ni = 4194304), e;
  }
  function Ks(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Kn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function $h(e, t, a, l, n, u) {
    var c = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, m = e.expirationTimes, x = e.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var C = 31 - Et(a), O = 1 << C;
      f[C] = 0, m[C] = -1;
      var S = x[C];
      if (S !== null)
        for (x[C] = null, C = 0; C < S.length; C++) {
          var A = S[C];
          A !== null && (A.lane &= -536870913);
        }
      a &= ~O;
    }
    l !== 0 && Xo(e, l, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function Xo(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - Et(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function Vo(e, t) {
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
  function Ko() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : eh(e.type));
  }
  function Jo(e, t) {
    var a = te.p;
    try {
      return te.p = e, t();
    } finally {
      te.p = a;
    }
  }
  var xa = Math.random().toString(36).slice(2), lt = "__reactFiber$" + xa, pt = "__reactProps$" + xa, Vl = "__reactContainer$" + xa, ko = "__reactEvents$" + xa, Fh = "__reactListeners$" + xa, Wh = "__reactHandles$" + xa, $o = "__reactResources$" + xa, Jn = "__reactMarker$" + xa, ii = "__reactLoad$" + xa;
  function si(e) {
    delete e[lt], delete e[pt], delete e[Fh], delete e[Wh];
  }
  function _l(e) {
    var t;
    if (t = e[lt]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Vl] || a[lt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Om(e); e !== null; ) {
            if (a = e[lt]) return a;
            e = Om(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Zl(e) {
    if (e = e[lt] || e[Vl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function kn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Kl(e) {
    var t = e[$o];
    return t || (t = e[$o] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ie(e) {
    e[Jn] = !0;
  }
  function Fo(e) {
    e[ii] = void 0;
  }
  var Wo = /* @__PURE__ */ new Set(), Io = {};
  function Sl(e, t) {
    Jl(e, t), Jl(e + "Capture", t);
  }
  function Jl(e, t) {
    for (Io[e] = t, e = 0; e < t.length; e++)
      Wo.add(t[e]);
  }
  var Ih = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Po = {}, ef = {};
  function Ph(e) {
    return Xs.call(ef, e) ? !0 : Xs.call(Po, e) ? !1 : Ih.test(e) ? ef[e] = !0 : (Po[e] = !0, !1);
  }
  var be = !1;
  function tf() {
    var e = be;
    return be = !1, e;
  }
  function ci(e, t, a) {
    if (Ph(t))
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
  function ri(e, t, a) {
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
  function af(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function eg(e, t, a) {
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
      var t = af(e) ? "checked" : "value";
      e._valueTracker = eg(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function lf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = af(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  var tg = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      tg,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fs(e, t, a, l, n, u, c, f) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + At(t)) : e.value !== "" + At(t) && (e.value = "" + At(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? c === "number" && e.value == t ? Ws(e, At(e.value)) : Ws(e, At(t)) : a != null ? Ws(e, At(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + At(f) : e.removeAttribute("name");
  }
  function nf(e, t, a, l, n, u, c, f) {
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
  function kl(e, t, a, l) {
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
  function uf(e, t, a) {
    if (t != null && (t = "" + At(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + At(a) : "";
  }
  function sf(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(o(92));
        if (xe(l)) {
          if (1 < l.length) throw Error(o(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = At(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), $s(e);
  }
  function $l(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var ag = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cf(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || ag.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function rf(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", be = !0);
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (cf(e, n, l), be = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && cf(e, u, t[u]);
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
  var lg = /* @__PURE__ */ new Map([
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
  ]), ng = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function oi(e) {
    return ng.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function sa() {
  }
  var Ps = null;
  function ec(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Fl = null, Wl = null;
  function of(e) {
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
              l = a[t], l.form === e.form && lf(l);
          }
          break e;
        case "textarea":
          uf(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && kl(e, !!a.multiple, t, !1);
      }
    }
  }
  var tc = !1;
  function ff(e, t, a) {
    if (tc) return e(t, a);
    tc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (tc = !1, (Fl !== null || Wl !== null) && (os(), Fl && (t = Fl, e = Wl, Wl = Fl = null, of(t), e)))
        for (t = 0; t < e.length; t++) of(e[t]);
    }
  }
  function $n(e, t) {
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
      var Fn = {};
      Object.defineProperty(Fn, "passive", {
        get: function() {
          ac = !0;
        }
      }), window.addEventListener("test", Fn, Fn), window.removeEventListener("test", Fn, Fn);
    } catch {
      ac = !1;
    }
  var Xa = null, lc = null, fi = null;
  function df() {
    if (fi) return fi;
    var e, t = lc, a = t.length, l, n = "value" in Xa ? Xa.value : Xa.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var c = a - e;
    for (l = 1; l <= c && t[a - l] === n[u - l]; l++) ;
    return fi = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function di(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function vi() {
    return !0;
  }
  function vf() {
    return !1;
  }
  function vt(e) {
    function t(a, l, n, u, c) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (a = e[f], this[f] = a ? a(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? vi : vf, this.isPropagationStopped = vf, this;
    }
    return X(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = vi);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = vi);
      },
      persist: function() {
      },
      isPersistent: vi
    }), t;
  }
  var Va = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, mi = vt(Va), Wn = X({}, Va, { view: 0, detail: 0 }), ug = vt(Wn), nc, uc, In, hi = X({}, Wn, {
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
      return "movementX" in e ? e.movementX : (e !== In && (In && e.type === "mousemove" ? (nc = e.screenX - In.screenX, uc = e.screenY - In.screenY) : uc = nc = 0, In = e), nc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : uc;
    }
  }), mf = vt(hi), ig = X({}, hi, { dataTransfer: 0 }), sg = vt(ig), cg = X({}, Wn, { relatedTarget: 0 }), ic = vt(cg), rg = X({}, Va, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), og = vt(rg), fg = X({}, Va, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), dg = vt(fg), vg = X({}, Va, { data: 0 }), hf = vt(vg), mg = {
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
  }, hg = {
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
  }, gg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function yg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = gg[e]) ? !!t[e] : !1;
  }
  function sc() {
    return yg;
  }
  var pg = X({}, Wn, {
    key: function(e) {
      if (e.key) {
        var t = mg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = di(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hg[e.keyCode] || "Unidentified" : "";
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
      return e.type === "keypress" ? di(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? di(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _g = vt(pg), Sg = X({}, hi, {
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
  }), gf = vt(Sg), bg = X({}, Va, { submitter: 0 }), xg = vt(bg), jg = X({}, Wn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: sc
  }), Tg = vt(jg), Ng = X({}, Va, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), wg = vt(Ng), Eg = X({}, hi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ag = vt(Eg), Cg = X({}, Va, {
    newState: 0,
    oldState: 0,
    source: 0
  }), zg = vt(Cg), Dg = [9, 13, 27, 32], cc = Ta && "CompositionEvent" in window, Pn = null;
  Ta && "documentMode" in document && (Pn = document.documentMode);
  var Rg = Ta && "TextEvent" in window && !Pn, yf = Ta && (!cc || Pn && 8 < Pn && 11 >= Pn), pf = " ", _f = !1;
  function Sf(e, t) {
    switch (e) {
      case "keyup":
        return Dg.indexOf(t.keyCode) !== -1;
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
  function bf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Il = !1;
  function Mg(e, t) {
    switch (e) {
      case "compositionend":
        return bf(t);
      case "keypress":
        return t.which !== 32 ? null : (_f = !0, pf);
      case "textInput":
        return e = t.data, e === pf && _f ? null : e;
      default:
        return null;
    }
  }
  function Og(e, t) {
    if (Il)
      return e === "compositionend" || !cc && Sf(e, t) ? (e = df(), fi = lc = Xa = null, Il = !1, e) : null;
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
        return yf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ug = {
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
  function xf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Ug[e.type] : t === "textarea";
  }
  function jf(e, t, a, l) {
    Fl ? Wl ? Wl.push(l) : Wl = [l] : Fl = l, t = gs(t, "onChange"), 0 < t.length && (a = new mi(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var eu = null, tu = null;
  function Hg(e) {
    om(e, 0);
  }
  function gi(e) {
    var t = kn(e);
    if (lf(t)) return e;
  }
  function Tf(e, t) {
    if (e === "change") return t;
  }
  var Nf = !1;
  if (Ta) {
    var rc;
    if (Ta) {
      var oc = "oninput" in document;
      if (!oc) {
        var wf = document.createElement("div");
        wf.setAttribute("oninput", "return;"), oc = typeof wf.oninput == "function";
      }
      rc = oc;
    } else rc = !1;
    Nf = rc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ef() {
    eu && (eu.detachEvent("onpropertychange", Af), tu = eu = null);
  }
  function Af(e) {
    if (e.propertyName === "value" && gi(tu)) {
      var t = [];
      jf(
        t,
        tu,
        e,
        ec(e)
      ), ff(Hg, t);
    }
  }
  function Lg(e, t, a) {
    e === "focusin" ? (Ef(), eu = t, tu = a, eu.attachEvent("onpropertychange", Af)) : e === "focusout" && Ef();
  }
  function qg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return gi(tu);
  }
  function Bg(e, t) {
    if (e === "click") return gi(t);
  }
  function Yg(e, t) {
    if (e === "input" || e === "change")
      return gi(t);
  }
  function Gg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ct = typeof Object.is == "function" ? Object.is : Gg;
  function au(e, t) {
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
  function Cf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zf(e, t) {
    var a = Cf(e);
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
      a = Cf(a);
    }
  }
  function Df(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Df(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Rf(e) {
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
  var Qg = Ta && "documentMode" in document && 11 >= document.documentMode, Pl = null, vc = null, lu = null, mc = !1;
  function Mf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    mc || Pl == null || Pl !== fc(l) || (l = Pl, "selectionStart" in l && dc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), lu && au(lu, l) || (lu = l, l = gs(vc, "onSelect"), 0 < l.length && (t = new mi(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Pl)));
  }
  function bl(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var en = {
    animationend: bl("Animation", "AnimationEnd"),
    animationiteration: bl("Animation", "AnimationIteration"),
    animationstart: bl("Animation", "AnimationStart"),
    transitionrun: bl("Transition", "TransitionRun"),
    transitionstart: bl("Transition", "TransitionStart"),
    transitioncancel: bl("Transition", "TransitionCancel"),
    transitionend: bl("Transition", "TransitionEnd")
  }, hc = {}, Of = {};
  Ta && (Of = document.createElement("div").style, "AnimationEvent" in window || (delete en.animationend.animation, delete en.animationiteration.animation, delete en.animationstart.animation), "TransitionEvent" in window || delete en.transitionend.transition);
  function xl(e) {
    if (hc[e]) return hc[e];
    if (!en[e]) return e;
    var t = en[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Of)
        return hc[e] = t[a];
    return e;
  }
  var Uf = xl("animationend"), Hf = xl("animationiteration"), Lf = xl("animationstart"), Xg = xl("transitionrun"), Vg = xl("transitionstart"), Zg = xl("transitioncancel"), qf = xl("transitionend"), Bf = /* @__PURE__ */ new Map(), gc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  gc.push("scrollEnd");
  function Ft(e, t) {
    Bf.set(e, t), Sl(t, [e]);
  }
  var Kg = 0;
  function Na(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = ea.identifierPrefix;
    var a = Kg++;
    return e = "_" + e + "t_" + a.toString(32) + "_", t.autoName = e;
  }
  function Yf(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, a = bn;
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
    return e = Yf(e), t = Yf(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var yi = typeof reportError == "function" ? reportError : function(e) {
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
  }, Bt = [], tn = 0, yc = 0;
  function pi() {
    for (var e = tn, t = yc = tn = 0; t < e; ) {
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
      u !== 0 && Gf(a, n, u);
    }
  }
  function _i(e, t, a, l) {
    Bt[tn++] = e, Bt[tn++] = t, Bt[tn++] = a, Bt[tn++] = l, yc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function pc(e, t, a, l) {
    return _i(e, t, a, l), Si(e);
  }
  function jl(e, t) {
    return _i(e, null, null, t), Si(e);
  }
  function Gf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - Et(a), e = u.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function Si(e) {
    if (50 < Nu)
      throw Nu = 0, rs = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var an = {};
  function Jg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, a, l) {
    return new Jg(e, t, a, l);
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
  function Qf(e, t) {
    e.flags &= 1206910978;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function bi(e, t, a, l, n, u) {
    var c = 0;
    if (l = e, typeof l == "function") _c(l) && (c = 1);
    else if (typeof l == "string")
      c = b0(
        e,
        a,
        ia.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ot:
          return e = _t(31, a, t, n), e.elementType = ot, e.lanes = u, e;
        case We:
          return Tl(a.children, n, u, t);
        case $e:
          c = 8, n |= 24;
          break;
        case P:
          return e = _t(12, a, t, n | 2), e.elementType = P, e.lanes = u, e;
        case q:
          return e = _t(13, a, t, n), e.elementType = q, e.lanes = u, e;
        case V:
          return e = _t(19, a, t, n), e.elementType = V, e.lanes = u, e;
        case Sa:
        case _:
          return e = n | 32, e = _t(30, a, t, e), e.elementType = _, e.lanes = u, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Me:
                c = 10;
                break e;
              case Xe:
                c = 9;
                break e;
              case G:
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
  function Tl(e, t, a, l) {
    return e = _t(7, e, l, t), e.lanes = a, e;
  }
  function Sc(e, t, a) {
    return e = _t(6, e, null, t), e.lanes = a, e;
  }
  function Xf(e) {
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
  var Vf = /* @__PURE__ */ new WeakMap();
  function Yt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Vf.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Lo(t)
      }, Vf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Lo(t)
    };
  }
  var ln = [], nn = 0, xi = null, nu = 0, Gt = [], Qt = 0, Za = null, ca = 1, ra = "";
  function Aa(e, t) {
    ln[nn++] = nu, ln[nn++] = xi, xi = e, nu = t;
  }
  function Zf(e, t, a) {
    Gt[Qt++] = ca, Gt[Qt++] = ra, Gt[Qt++] = Za, Za = e;
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
  function ji(e) {
    e.return !== null && (Aa(e, 1), Zf(e, 1, 0));
  }
  function xc(e) {
    for (; e === xi; )
      xi = ln[--nn], ln[nn] = null, nu = ln[--nn], ln[nn] = null;
    for (; e === Za; )
      Za = Gt[--Qt], Gt[Qt] = null, ra = Gt[--Qt], Gt[Qt] = null, ca = Gt[--Qt], Gt[Qt] = null;
  }
  function Kf(e, t) {
    Gt[Qt++] = ca, Gt[Qt++] = ra, Gt[Qt++] = Za, ca = t.id, ra = t.overflow, Za = e;
  }
  var Pe = null, De = null, oe = !1, Ka = null, Xt = !1, jc = Error(o(519));
  function Ja(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw uu(Yt(t, e)), jc;
  }
  function Jf(e) {
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
        for (a = 0; a < Eu.length; a++)
          de(Eu[a], t);
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
        de("invalid", t), nf(
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
        de("invalid", t), sf(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || mm(t.textContent, a) ? (l.popover != null && (de("beforetoggle", t), de("toggle", t)), l.onScroll != null && de("scroll", t), l.onScrollEnd != null && de("scrollend", t), l.onClick != null && (t.onclick = sa), t = !0) : t = !1, t || Ja(e, !0);
  }
  function Ti(e) {
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
  function un(e) {
    if (e !== Pe) return !1;
    if (!oe) return Ti(e), oe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Pr(e.type, e.memoizedProps)), a = !a), a && De && Ja(e), Ti(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      De = Mm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      De = Mm(e);
    } else
      t === 27 ? (t = De, rl(e.type) ? (e = co, co = null, De = e) : De = t) : De = Pe ? Zt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Nl() {
    De = Pe = null, oe = !1;
  }
  function Tc() {
    var e = Ka;
    return e !== null && (xt === null ? xt = e : xt.push.apply(
      xt,
      e
    ), Ka = null), e;
  }
  function uu(e) {
    Ka === null ? Ka = [e] : Ka.push(e);
  }
  var Nc = ua(null), wl = null, Ca = null;
  function ka(e, t, a) {
    ze(Nc, t._currentValue), t._currentValue = a;
  }
  function za(e) {
    e._currentValue = Nc.current, at(Nc);
  }
  function Ni(e, t, a) {
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
              u.lanes |= a, f = u.alternate, f !== null && (f.lanes |= a), Ni(
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
        c.lanes |= a, u = c.alternate, u !== null && (u.lanes |= a), Ni(c, a, e), c = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Ni(
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
  function El(e, t, a, l) {
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
      } else if (n === Iu.current) {
        if (c = n.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Dn) : e = [Dn]);
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
  function wi(e) {
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
  function Al(e) {
    wl = e, Ca = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return kf(wl, e);
  }
  function Ei(e, t) {
    return wl === null && Al(e), kf(e, t);
  }
  function kf(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Ca === null) {
      if (e === null) throw Error(o(308));
      Ca = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ca = Ca.next = t;
    return a;
  }
  var kg = typeof AbortController < "u" ? AbortController : function() {
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
  }, $g = s.unstable_scheduleCallback, Fg = s.unstable_NormalPriority, Ze = {
    $$typeof: Me,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ec() {
    return {
      controller: new kg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function iu(e) {
    e.refCount--, e.refCount === 0 && $g(Fg, function() {
      e.controller.abort();
    });
  }
  function $f(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var a = e.transitionTypes;
      for (a === null && (a = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        a.indexOf(l) === -1 && a.push(l);
      }
    }
  }
  var su = null;
  function Wg(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var cu = null, Ac = 0, Cl = 0, sn = null;
  function Ig(e, t) {
    if (cu === null) {
      var a = cu = [];
      Ac = 0, Cl = Vr(), sn = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Ac++, t.then(Ff, Ff), t;
  }
  function Ff() {
    if (--Ac === 0 && (su = null, cu !== null)) {
      sn !== null && (sn.status = "fulfilled");
      var e = cu;
      cu = null, Cl = 0, sn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Pg(e, t) {
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
  var Wf = $.S;
  $.S = function(e, t) {
    if (Xv = Nt(), typeof t == "object" && t !== null && typeof t.then == "function" && Ig(e, t), su !== null)
      for (var a = Nn; a !== null; )
        $f(a, su), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = Nn; l !== null; )
        $f(l, a), l = l.next;
      if (Cl !== 0) {
        l = su, l === null && (l = su = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    Wf !== null && Wf(e, t);
  };
  var zl = ua(null);
  function Cc() {
    var e = zl.current;
    return e !== null ? e : Ce.pooledCache;
  }
  function Ai(e, t) {
    t === null ? ze(zl, zl.current) : ze(zl, t.pool);
  }
  function If() {
    var e = Cc();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var cn = Error(o(460)), zc = Error(o(474)), Ci = Error(o(542)), zi = { then: function() {
  } };
  function Pf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function ed(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(sa, sa), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ad(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(sa, sa);
        else {
          if (e = Ce, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, ad(e), e;
        }
        throw Rl = t, cn;
    }
  }
  function Dl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Rl = a, cn) : a;
    }
  }
  var Rl = null;
  function td() {
    if (Rl === null) throw Error(o(459));
    var e = Rl;
    return Rl = null, e;
  }
  function ad(e) {
    if (e === cn || e === Ci)
      throw Error(o(483));
  }
  var rn = null, ru = 0;
  function Di(e) {
    var t = ru;
    return ru += 1, rn === null && (rn = []), ed(rn, e, t);
  }
  function $a(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ri(e, t) {
    throw t.$$typeof === le ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function ld(e) {
    function t(b, g) {
      if (e) {
        var N = b.deletions;
        N === null ? (b.deletions = [g], b.flags |= 16) : N.push(g);
      }
    }
    function a(b, g) {
      if (!e) return null;
      for (; g !== null; )
        t(b, g), g = g.sibling;
      return null;
    }
    function l(b) {
      for (var g = /* @__PURE__ */ new Map(); b !== null; )
        b.key === null ? g.set(b.index, b) : g.set(b.key, b), b = b.sibling;
      return g;
    }
    function n(b, g) {
      return b = Ea(b, g), b.index = 0, b.sibling = null, b;
    }
    function u(b, g, N) {
      return b.index = N, e ? (N = b.alternate, N !== null ? (N = N.index, N < g ? (b.flags |= 2, g) : N) : (b.flags |= 134217730, g)) : (b.flags |= 1048576, g);
    }
    function c(b) {
      return e && b.alternate === null && (b.flags |= 134217730), b;
    }
    function f(b, g, N, M) {
      return g === null || g.tag !== 6 ? (g = Sc(N, b.mode, M), g.return = b, g) : (g = n(g, N), g.return = b, g);
    }
    function m(b, g, N, M) {
      var Z = N.type;
      return Z === We ? (b = C(
        b,
        g,
        N.props.children,
        M,
        N.key
      ), $a(b, N), b) : g !== null && (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && Dl(Z) === g.type) ? (g = n(g, N.props), $a(g, N), g.return = b, g) : (g = bi(
        N.type,
        N.key,
        N.props,
        null,
        b.mode,
        M
      ), $a(g, N), g.return = b, g);
    }
    function x(b, g, N, M) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== N.containerInfo || g.stateNode.implementation !== N.implementation ? (g = bc(N, b.mode, M), g.return = b, g) : (g = n(g, N.children || []), g.return = b, g);
    }
    function C(b, g, N, M, Z) {
      return g === null || g.tag !== 7 ? (g = Tl(
        N,
        b.mode,
        M,
        Z
      ), g.return = b, g) : (g = n(g, N), g.return = b, g);
    }
    function O(b, g, N) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = Sc(
          "" + g,
          b.mode,
          N
        ), g.return = b, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case Qe:
            return N = bi(
              g.type,
              g.key,
              g.props,
              null,
              b.mode,
              N
            ), $a(N, g), N.return = b, N;
          case qe:
            return g = bc(
              g,
              b.mode,
              N
            ), g.return = b, g;
          case he:
            return g = Dl(g), O(b, g, N);
        }
        if (xe(g) || I(g))
          return g = Tl(
            g,
            b.mode,
            N,
            null
          ), g.return = b, g;
        if (typeof g.then == "function")
          return O(b, Di(g), N);
        if (g.$$typeof === Me)
          return O(
            b,
            Ei(b, g),
            N
          );
        Ri(b, g);
      }
      return null;
    }
    function S(b, g, N, M) {
      var Z = g !== null ? g.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return Z !== null ? null : f(b, g, "" + N, M);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Qe:
            return N.key === Z ? m(b, g, N, M) : null;
          case qe:
            return N.key === Z ? x(b, g, N, M) : null;
          case he:
            return N = Dl(N), S(b, g, N, M);
        }
        if (xe(N) || I(N))
          return Z !== null ? null : C(b, g, N, M, null);
        if (typeof N.then == "function")
          return S(
            b,
            g,
            Di(N),
            M
          );
        if (N.$$typeof === Me)
          return S(
            b,
            g,
            Ei(b, N),
            M
          );
        Ri(b, N);
      }
      return null;
    }
    function A(b, g, N, M, Z) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return b = b.get(N) || null, f(g, b, "" + M, Z);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Qe:
            return b = b.get(
              M.key === null ? N : M.key
            ) || null, m(g, b, M, Z);
          case qe:
            return b = b.get(
              M.key === null ? N : M.key
            ) || null, x(g, b, M, Z);
          case he:
            return M = Dl(M), A(
              b,
              g,
              N,
              M,
              Z
            );
        }
        if (xe(M) || I(M))
          return b = b.get(N) || null, C(g, b, M, Z, null);
        if (typeof M.then == "function")
          return A(
            b,
            g,
            N,
            Di(M),
            Z
          );
        if (M.$$typeof === Me)
          return A(
            b,
            g,
            N,
            Ei(g, M),
            Z
          );
        Ri(g, M);
      }
      return null;
    }
    function B(b, g, N, M) {
      for (var Z = null, me = null, F = g, ee = g = 0, ke = null; F !== null && ee < N.length; ee++) {
        F.index > ee ? (ke = F, F = null) : ke = F.sibling;
        var pe = S(
          b,
          F,
          N[ee],
          M
        );
        if (pe === null) {
          F === null && (F = ke);
          break;
        }
        e && F && pe.alternate === null && t(b, F), g = u(pe, g, ee), me === null ? Z = pe : me.sibling = pe, me = pe, F = ke;
      }
      if (ee === N.length)
        return a(b, F), oe && Aa(b, ee), Z;
      if (F === null) {
        for (; ee < N.length; ee++)
          F = O(b, N[ee], M), F !== null && (g = u(
            F,
            g,
            ee
          ), me === null ? Z = F : me.sibling = F, me = F);
        return oe && Aa(b, ee), Z;
      }
      for (F = l(F); ee < N.length; ee++)
        ke = A(
          F,
          b,
          ee,
          N[ee],
          M
        ), ke !== null && (e && (pe = ke.alternate, pe !== null && F.delete(pe.key === null ? ee : pe.key)), g = u(
          ke,
          g,
          ee
        ), me === null ? Z = ke : me.sibling = ke, me = ke);
      return e && F.forEach(function(ml) {
        return t(b, ml);
      }), oe && Aa(b, ee), Z;
    }
    function J(b, g, N, M) {
      if (N == null) throw Error(o(151));
      for (var Z = null, me = null, F = g, ee = g = 0, ke = null, pe = N.next(); F !== null && !pe.done; ee++, pe = N.next()) {
        F.index > ee ? (ke = F, F = null) : ke = F.sibling;
        var ml = S(b, F, pe.value, M);
        if (ml === null) {
          F === null && (F = ke);
          break;
        }
        e && F && ml.alternate === null && t(b, F), g = u(ml, g, ee), me === null ? Z = ml : me.sibling = ml, me = ml, F = ke;
      }
      if (pe.done)
        return a(b, F), oe && Aa(b, ee), Z;
      if (F === null) {
        for (; !pe.done; ee++, pe = N.next())
          pe = O(b, pe.value, M), pe !== null && (g = u(pe, g, ee), me === null ? Z = pe : me.sibling = pe, me = pe);
        return oe && Aa(b, ee), Z;
      }
      for (F = l(F); !pe.done; ee++, pe = N.next())
        pe = A(F, b, ee, pe.value, M), pe !== null && (e && (ke = pe.alternate, ke !== null && F.delete(
          ke.key === null ? ee : ke.key
        )), g = u(pe, g, ee), me === null ? Z = pe : me.sibling = pe, me = pe);
      return e && F.forEach(function(M0) {
        return t(b, M0);
      }), oe && Aa(b, ee), Z;
    }
    function se(b, g, N, M) {
      if (typeof N == "object" && N !== null && N.type === We && N.key === null && N.props.ref === void 0 && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Qe:
            e: {
              for (var Z = N.key; g !== null; ) {
                if (g.key === Z) {
                  if (Z = N.type, Z === We) {
                    if (g.tag === 7) {
                      a(
                        b,
                        g.sibling
                      ), M = n(
                        g,
                        N.props.children
                      ), $a(M, N), M.return = b, b = M;
                      break e;
                    }
                  } else if (g.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === he && Dl(Z) === g.type) {
                    a(
                      b,
                      g.sibling
                    ), M = n(g, N.props), $a(M, N), M.return = b, b = M;
                    break e;
                  }
                  a(b, g);
                  break;
                } else t(b, g);
                g = g.sibling;
              }
              N.type === We ? (M = Tl(
                N.props.children,
                b.mode,
                M,
                N.key
              ), $a(M, N), M.return = b, b = M) : (M = bi(
                N.type,
                N.key,
                N.props,
                null,
                b.mode,
                M
              ), $a(M, N), M.return = b, b = M);
            }
            return c(b);
          case qe:
            e: {
              for (Z = N.key; g !== null; ) {
                if (g.key === Z)
                  if (g.tag === 4 && g.stateNode.containerInfo === N.containerInfo && g.stateNode.implementation === N.implementation) {
                    a(
                      b,
                      g.sibling
                    ), M = n(g, N.children || []), M.return = b, b = M;
                    break e;
                  } else {
                    a(b, g);
                    break;
                  }
                else t(b, g);
                g = g.sibling;
              }
              M = bc(N, b.mode, M), M.return = b, b = M;
            }
            return c(b);
          case he:
            return N = Dl(N), se(
              b,
              g,
              N,
              M
            );
        }
        if (xe(N))
          return B(
            b,
            g,
            N,
            M
          );
        if (I(N)) {
          if (Z = I(N), typeof Z != "function") throw Error(o(150));
          return N = Z.call(N), J(
            b,
            g,
            N,
            M
          );
        }
        if (typeof N.then == "function")
          return se(
            b,
            g,
            Di(N),
            M
          );
        if (N.$$typeof === Me)
          return se(
            b,
            g,
            Ei(b, N),
            M
          );
        Ri(b, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, g !== null && g.tag === 6 ? (a(b, g.sibling), M = n(g, N), M.return = b, b = M) : (a(b, g), M = Sc(N, b.mode, M), M.return = b, b = M), c(b)) : a(b, g);
    }
    return function(b, g, N, M) {
      try {
        ru = 0;
        var Z = se(
          b,
          g,
          N,
          M
        );
        return rn = null, Z;
      } catch (F) {
        if (F === cn || F === Ci) throw F;
        var me = _t(29, F, null, b.mode);
        return me.lanes = M, me.return = b, me;
      } finally {
      }
    };
  }
  var Ml = ld(!0), nd = ld(!1), Fa = !1;
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
    if (l = l.shared, (je & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = Si(e), Gf(e, null, a), t;
    }
    return _i(e, l, t, a), Si(e);
  }
  function ou(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Vo(e, a);
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
  function fu() {
    if (Oc) {
      var e = sn;
      if (e !== null) throw e;
    }
  }
  function du(e, t, a, l) {
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
        var S = f.lane & -536870913, A = S !== f.lane;
        if (A ? (ve & S) === S : (l & S) === S) {
          S !== 0 && S === Cl && (Oc = !0), C !== null && (C = C.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var B = e, J = f;
            S = t;
            var se = a;
            switch (J.tag) {
              case 1:
                if (B = J.payload, typeof B == "function") {
                  O = B.call(se, O, S);
                  break e;
                }
                O = B;
                break e;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = J.payload, S = typeof B == "function" ? B.call(se, O, S) : B, S == null) break e;
                O = X({}, O, S);
                break e;
              case 2:
                Fa = !0;
            }
          }
          S = f.callback, S !== null && (e.flags |= 64, A && (e.flags |= 8192), A = n.callbacks, A === null ? n.callbacks = [S] : A.push(S));
        } else
          A = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, C === null ? (x = C = A, m = O) : C = C.next = A, c |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          A = f, f = A.next, A.next = null, n.lastBaseUpdate = A, n.shared.pending = null;
        }
      } while (!0);
      C === null && (m = O), n.baseState = m, n.firstBaseUpdate = x, n.lastBaseUpdate = C, u === null && (n.shared.lanes = 0), ul |= c, e.lanes = c, e.memoizedState = O;
    }
  }
  function ud(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function id(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        ud(a[e], t);
  }
  var Pa = ua(null), Mi = ua(0);
  function sd(e, t) {
    e = Ua, ze(Mi, e), ze(Pa, t), Ua = e | t.baseLanes;
  }
  function Uc() {
    ze(Mi, Ua), ze(Pa, Pa.current);
  }
  function Hc() {
    Ua = Mi.current, at(Pa), at(Mi);
  }
  var ut = ua(null), ft = null;
  function el(e) {
    var t = e.alternate;
    ze(it, it.current & 1), ze(ut, e), ft === null && (t === null || Pa.current !== null || t.memoizedState !== null) && (ft = e);
  }
  function Lc(e) {
    ze(it, it.current), ze(ut, e), ft === null && (ft = e);
  }
  function cd(e) {
    e.tag === 22 ? (ze(it, it.current), ze(ut, e), ft === null && (ft = e)) : tl();
  }
  function tl() {
    ze(it, it.current), ze(ut, ut.current);
  }
  function zt(e) {
    at(ut), ft === e && (ft = null), at(it);
  }
  var it = ua(0);
  function vu(e, t) {
    ze(ut, ut.current), ze(it, t);
  }
  function qc(e) {
    at(it), at(ut), ft === e && (ft = null);
  }
  function Oi(e) {
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
  var Da = 0, ie = null, Ae = null, Ke = null, Ui = !1, on = !1, Ol = !1, Hi = 0, mu = 0, fn = null, ey = 0;
  function Ye() {
    throw Error(o(321));
  }
  function Bc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Ct(e[a], t[a])) return !1;
    return !0;
  }
  function Yc(e, t, a, l, n, u) {
    return Da = u, ie = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $.H = e === null || e.memoizedState === null ? Zd : Kd, Ol = !1, u = a(l, n), Ol = !1, on && (u = od(
      t,
      a,
      l,
      n
    )), rd(e), u;
  }
  function rd(e) {
    $.H = Xi;
    var t = Ae !== null && Ae.next !== null;
    if (Da = 0, Ke = Ae = ie = null, Ui = !1, mu = 0, fn = null, t) throw Error(o(300));
    e === null || Je || (e = e.dependencies, e !== null && wi(e) && (Je = !0));
  }
  function od(e, t, a, l) {
    ie = e;
    var n = 0;
    do {
      if (on && (fn = null), mu = 0, on = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ke = Ae = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      $.H = cy, u = t(a, l);
    } while (on);
    return u;
  }
  function ty() {
    var e = $.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? hu(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (ie.flags |= 1024), t;
  }
  function Gc() {
    var e = Hi !== 0;
    return Hi = 0, e;
  }
  function Qc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Xc(e) {
    if (Ui) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ui = !1;
    }
    Da = 0, Ke = Ae = ie = null, on = !1, mu = Hi = 0, fn = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ke === null ? ie.memoizedState = Ke = e : Ke = Ke.next = e, Ke;
  }
  function Ve() {
    if (Ae === null) {
      var e = ie.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = Ke === null ? ie.memoizedState : Ke.next;
    if (t !== null)
      Ke = t, Ae = e;
    else {
      if (e === null)
        throw ie.alternate === null ? Error(o(467)) : Error(o(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, Ke === null ? ie.memoizedState = Ke = e : Ke = Ke.next = e;
    }
    return Ke;
  }
  function Li() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function hu(e) {
    var t = mu;
    return mu += 1, fn === null && (fn = []), e = ed(fn, e, t), t = ie, (Ke === null ? t.memoizedState : Ke.next) === null && (t = t.alternate, $.H = t === null || t.memoizedState === null ? Zd : Kd), e;
  }
  function qi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return hu(e);
      if (e.$$typeof === H) return;
      if (e.$$typeof === Me) return nt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Vc(e) {
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
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Li(), ie.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = yl;
    return t.index++, a;
  }
  function Ra(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Bi(e) {
    var t = Ve();
    return Zc(t, Ae, e);
  }
  function Zc(e, t, a) {
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
          var S = x.revertLane;
          if (S === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), O === Cl && (C = !0);
          else if ((Da & S) === S) {
            x = x.next, S === Cl && (C = !0);
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
            }, m === null ? (f = m = O, c = u) : m = m.next = O, ie.lanes |= S, ul |= S;
          O = x.action, Ol && a(u, O), u = x.hasEagerState ? x.eagerState : a(u, O);
        } else
          S = {
            lane: O,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, m === null ? (f = m = S, c = u) : m = m.next = S, ie.lanes |= O, ul |= O;
        x = x.next;
      } while (x !== null && x !== t);
      if (m === null ? c = u : m.next = f, !Ct(u, e.memoizedState) && (Je = !0, C && (a = sn, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = c, e.baseQueue = m, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Kc(e) {
    var t = Ve(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, u = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var c = n = n.next;
      do
        u = e(u, c.action), c = c.next;
      while (c !== n);
      Ct(u, t.memoizedState) || (Je = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function fd(e, t, a) {
    var l = ie, n = Ve(), u = oe;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !Ct(
      (Ae || n).memoizedState,
      a
    );
    if (c && (n.memoizedState = a, Je = !0), n = n.queue, $c(md.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || c || Ke !== null && (Ke.memoizedState.tag & 1) !== 0, dn(
      e ? 9 : 8,
      { destroy: void 0 },
      vd.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, Ce === null) throw Error(o(349));
      u || (Da & 127) !== 0 || dd(l, t, a);
    }
    return a;
  }
  function dd(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ie.updateQueue, t === null ? (t = Li(), ie.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function vd(e, t, a, l) {
    t.value = a, t.getSnapshot = l, hd(t) && gd(e);
  }
  function md(e, t, a) {
    return a(function() {
      hd(t) && gd(e);
    });
  }
  function hd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Ct(e, a);
    } catch {
      return !0;
    }
  }
  function gd(e) {
    var t = jl(e, 2);
    t !== null && jt(t, e, 2);
  }
  function Jc(e) {
    var t = mt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ol) {
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
  function yd(e, t, a, l) {
    return e.baseState = a, Zc(
      e,
      Ae,
      typeof l == "function" ? l : Ra
    );
  }
  function ay(e, t, a, l, n) {
    if (Qi(e)) throw Error(o(485));
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
      $.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, pd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function pd(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var u = $.T, c = {};
      c.types = u !== null ? u.types : null, $.T = c;
      try {
        var f = a(n, l), m = $.S;
        m !== null && m(c, f), _d(e, t, f);
      } catch (x) {
        kc(e, t, x);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), $.T = u;
      }
    } else
      try {
        u = a(n, l), _d(e, t, u);
      } catch (x) {
        kc(e, t, x);
      }
  }
  function _d(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Sd(e, t, l);
      },
      function(l) {
        return kc(e, t, l);
      }
    ) : Sd(e, t, a);
  }
  function Sd(e, t, a) {
    t.status = "fulfilled", t.value = a, bd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, pd(e, a)));
  }
  function kc(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, bd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function bd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function xd(e, t) {
    return t;
  }
  function jd(e, t) {
    if (oe) {
      var a = Ce.formState;
      if (a !== null) {
        e: {
          var l = ie;
          if (oe) {
            if (De) {
              t: {
                for (var n = De, u = Xt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Zt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                De = Zt(
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
      lastRenderedReducer: xd,
      lastRenderedState: t
    }, a.queue = l, a = Qd.bind(
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
    }, l.queue = n, a = ay.bind(
      null,
      ie,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function Td(e) {
    var t = Ve();
    return Nd(t, Ae, e);
  }
  function Nd(e, t, a) {
    if (t = Zc(
      e,
      t,
      xd
    )[0], e = Bi(Ra)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = hu(t);
      } catch (c) {
        throw c === cn ? Ci : c;
      }
    else l = t;
    t = Ve();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (ie.flags |= 2048, dn(
      9,
      { destroy: void 0 },
      ly.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function ly(e, t) {
    e.action = t;
  }
  function wd(e) {
    var t = Ve(), a = Ae;
    if (a !== null)
      return Nd(t, a, e);
    Ve(), t = t.memoizedState, a = Ve();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function dn(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = ie.updateQueue, t === null && (t = Li(), ie.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Ed() {
    return Ve().memoizedState;
  }
  function Yi(e, t, a, l) {
    var n = mt();
    ie.flags |= e, n.memoizedState = dn(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Gi(e, t, a, l) {
    var n = Ve();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Ae !== null && l !== null && Bc(l, Ae.memoizedState.deps) ? n.memoizedState = dn(t, u, a, l) : (ie.flags |= e, n.memoizedState = dn(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Ad(e, t) {
    Yi(8390656, 8, e, t);
  }
  function $c(e, t) {
    Gi(2048, 8, e, t);
  }
  function ny(e) {
    ie.flags |= 4;
    var t = ie.updateQueue;
    if (t === null)
      t = Li(), ie.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Cd(e) {
    var t = Ve().memoizedState;
    return ny({ ref: t, nextImpl: e }), function() {
      if ((je & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function zd(e, t) {
    return Gi(4, 2, e, t);
  }
  function Dd(e, t) {
    return Gi(4, 4, e, t);
  }
  function Rd(e, t) {
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
  function Md(e, t, a) {
    a = a != null ? a.concat([e]) : null, Gi(4, 4, Rd.bind(null, t, e), a);
  }
  function Fc() {
  }
  function Od(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Bc(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Ud(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Bc(t, l[1]))
      return l[0];
    if (l = e(), Ol) {
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
  function Hd(e, t, a, l) {
    return Ct(a, t) ? a : Pa.current !== null ? (e = Wc(e, a, l), Ct(e, t) || (Je = !0), e) : (Da & 106) === 0 || (Da & 1073741824) !== 0 && (ve & 261930) === 0 ? (Je = !0, e.memoizedState = a) : (e = Zv(), ie.lanes |= e, ul |= e, t);
  }
  function Ld(e, t, a, l, n) {
    var u = te.p;
    te.p = u !== 0 && 8 > u ? u : 8;
    var c = $.T, f = {};
    f.types = c !== null ? c.types : null, $.T = f, er(e, !1, t, a);
    try {
      var m = n(), x = $.S;
      if (x !== null && x(f, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var C = Pg(
          m,
          l
        );
        gu(
          e,
          t,
          C,
          Ot(e)
        );
      } else
        gu(
          e,
          t,
          l,
          Ot(e)
        );
    } catch (O) {
      gu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        Ot()
      );
    } finally {
      te.p = u, c !== null && f.types !== null && (c.types = f.types), $.T = c;
    }
  }
  function uy() {
  }
  function Ic(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = qd(e).queue;
    Ld(
      e,
      n,
      t,
      ba,
      a === null ? uy : function() {
        return Bd(e), a(l);
      }
    );
  }
  function qd(e) {
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
  function Bd(e) {
    var t = qd(e);
    t.next === null && (t = e.alternate.memoizedState), gu(
      e,
      t.next.queue,
      {},
      Ot()
    );
  }
  function Pc() {
    return nt(Dn);
  }
  function Yd() {
    return Ve().memoizedState;
  }
  function Gd() {
    return Ve().memoizedState;
  }
  function iy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ot();
          e = Wa(a);
          var l = Ia(t, e, a);
          l !== null && (jt(l, t, a), ou(l, t, a)), t = { cache: Ec() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function sy(e, t, a) {
    var l = Ot();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qi(e) ? Xd(t, a) : (a = pc(e, t, a, l), a !== null && (jt(a, e, l), Vd(a, t, l)));
  }
  function Qd(e, t, a) {
    var l = Ot();
    gu(e, t, a, l);
  }
  function gu(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Qi(e)) Xd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, f = u(c, a);
          if (n.hasEagerState = !0, n.eagerState = f, Ct(f, c))
            return _i(e, t, n, 0), Ce === null && pi(), !1;
        } catch {
        } finally {
        }
      if (a = pc(e, t, n, l), a !== null)
        return jt(a, e, l), Vd(a, t, l), !0;
    }
    return !1;
  }
  function er(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Vr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Qi(e)) {
      if (t) throw Error(o(479));
    } else
      t = pc(
        e,
        a,
        l,
        2
      ), t !== null && jt(t, e, 2);
  }
  function Qi(e) {
    var t = e.alternate;
    return e === ie || t !== null && t === ie;
  }
  function Xd(e, t) {
    on = Ui = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Vd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Vo(e, a);
    }
  }
  var Xi = {
    readContext: nt,
    use: qi,
    useCallback: Ye,
    useContext: Ye,
    useEffect: Ye,
    useImperativeHandle: Ye,
    useLayoutEffect: Ye,
    useInsertionEffect: Ye,
    useMemo: Ye,
    useReducer: Ye,
    useRef: Ye,
    useState: Ye,
    useDebugValue: Ye,
    useDeferredValue: Ye,
    useTransition: Ye,
    useSyncExternalStore: Ye,
    useId: Ye,
    useHostTransitionStatus: Ye,
    useFormState: Ye,
    useActionState: Ye,
    useOptimistic: Ye,
    useMemoCache: Ye,
    useCacheRefresh: Ye,
    useEffectEvent: Ye
  }, Zd = {
    readContext: nt,
    use: qi,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nt,
    useEffect: Ad,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Yi(
        4194308,
        4,
        Rd.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Yi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Yi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = mt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ol) {
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
        if (Ol) {
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
      }, l.queue = e, e = e.dispatch = sy.bind(
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
      var t = e.queue, a = Qd.bind(null, ie, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = mt();
      return Wc(a, e, t);
    },
    useTransition: function() {
      var e = Jc(!1);
      return e = Ld.bind(
        null,
        ie,
        e.queue,
        !0,
        !1
      ), mt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = ie, n = mt();
      if (oe) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), Ce === null)
          throw Error(o(349));
        (ve & 127) !== 0 || dd(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, Ad(md.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, dn(
        9,
        { destroy: void 0 },
        vd.bind(
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
      var e = mt(), t = Ce.identifierPrefix;
      if (oe) {
        var a = ra, l = ca;
        a = (l & ~(1 << 32 - Et(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Hi++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = ey++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Pc,
    useFormState: jd,
    useActionState: jd,
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
    useMemoCache: Vc,
    useCacheRefresh: function() {
      return mt().memoizedState = iy.bind(
        null,
        ie
      );
    },
    useEffectEvent: function(e) {
      var t = mt(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((je & 2) !== 0)
          throw Error(o(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, Kd = {
    readContext: nt,
    use: qi,
    useCallback: Od,
    useContext: nt,
    useEffect: $c,
    useImperativeHandle: Md,
    useInsertionEffect: zd,
    useLayoutEffect: Dd,
    useMemo: Ud,
    useReducer: Bi,
    useRef: Ed,
    useState: function() {
      return Bi(Ra);
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = Ve();
      return Hd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Bi(Ra)[0], t = Ve().memoizedState;
      return [
        typeof e == "boolean" ? e : hu(e),
        t
      ];
    },
    useSyncExternalStore: fd,
    useId: Yd,
    useHostTransitionStatus: Pc,
    useFormState: Td,
    useActionState: Td,
    useOptimistic: function(e, t) {
      var a = Ve();
      return yd(a, Ae, e, t);
    },
    useMemoCache: Vc,
    useCacheRefresh: Gd,
    useEffectEvent: Cd
  }, cy = {
    readContext: nt,
    use: qi,
    useCallback: Od,
    useContext: nt,
    useEffect: $c,
    useImperativeHandle: Md,
    useInsertionEffect: zd,
    useLayoutEffect: Dd,
    useMemo: Ud,
    useReducer: Kc,
    useRef: Ed,
    useState: function() {
      return Kc(Ra);
    },
    useDebugValue: Fc,
    useDeferredValue: function(e, t) {
      var a = Ve();
      return Ae === null ? Wc(a, e, t) : Hd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Kc(Ra)[0], t = Ve().memoizedState;
      return [
        typeof e == "boolean" ? e : hu(e),
        t
      ];
    },
    useSyncExternalStore: fd,
    useId: Yd,
    useHostTransitionStatus: Pc,
    useFormState: wd,
    useActionState: wd,
    useOptimistic: function(e, t) {
      var a = Ve();
      return Ae !== null ? yd(a, Ae, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Vc,
    useCacheRefresh: Gd,
    useEffectEvent: Cd
  };
  function tr(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : X({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var ar = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Wa(l);
      n.payload = t, a != null && (n.callback = a), t = Ia(e, n, l), t !== null && (jt(t, e, l), ou(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ot(), n = Wa(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Ia(e, n, l), t !== null && (jt(t, e, l), ou(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Ot(), l = Wa(a);
      l.tag = 2, t != null && (l.callback = t), t = Ia(e, l, a), t !== null && (jt(t, e, a), ou(t, e, a));
    }
  };
  function Jd(e, t, a, l, n, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, c) : t.prototype && t.prototype.isPureReactComponent ? !au(a, l) || !au(n, u) : !0;
  }
  function kd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && ar.enqueueReplaceState(t, t.state, null);
  }
  function Ul(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = X({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function $d(e) {
    yi(e);
  }
  function Fd(e) {
    console.error(e);
  }
  function Wd(e) {
    yi(e);
  }
  function Vi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Id(e, t, a) {
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
      Vi(e, t);
    }, a;
  }
  function Pd(e) {
    return e = Wa(e), e.tag = 3, e;
  }
  function ev(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        Id(t, a, l);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      Id(t, a, l), typeof n != "function" && (il === null ? il = /* @__PURE__ */ new Set([this]) : il.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function ry(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && El(
        t,
        a,
        n,
        !0
      ), a = ut.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return ft === null ? fs() : a.alternate === null && Ge === 0 && (Ge = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Gr(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Gr(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Gr(e, l, n), fs(), !1;
    }
    if (oe)
      return t = ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== jc && (e = Error(o(422), { cause: l }), uu(Yt(e, a)))) : (l !== jc && (t = Error(o(423), {
        cause: l
      }), uu(
        Yt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Yt(l, a), n = lr(
        e.stateNode,
        l,
        n
      ), Mc(e, n), Ge !== 4 && (Ge = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Yt(u, a), Tu === null ? Tu = [u] : Tu.push(u), Ge !== 4 && (Ge = 2), t === null) return !0;
    l = Yt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = lr(a.stateNode, l, e), Mc(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (il === null || !il.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = Pd(n), ev(
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
  var nr = Error(o(461)), Je = !1;
  function Fe(e, t, a, l) {
    t.child = e === null ? nd(t, null, a, l) : Ml(
      t,
      e.child,
      a,
      l
    );
  }
  function tv(e, t, a, l, n) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var c = {};
      for (var f in l)
        f !== "ref" && (c[f] = l[f]);
    } else c = l;
    return Al(t), l = Yc(
      e,
      t,
      a,
      c,
      u,
      n
    ), f = Gc(), e !== null && !Je ? (Qc(e, t, n), Ma(e, t, n)) : (oe && f && ji(t), t.flags |= 1, Fe(e, t, l, n), t.child);
  }
  function av(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !_c(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, lv(
        e,
        t,
        u,
        l,
        n
      )) : (e = bi(
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
      if (a = a.compare, a = a !== null ? a : au, a(c, l) && e.ref === t.ref)
        return Ma(e, t, n);
    }
    return t.flags |= 1, e = Ea(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function lv(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (au(u, l) && e.ref === t.ref)
        if (Je = !1, t.pendingProps = l = u, dr(e, n))
          (e.flags & 131072) !== 0 && (Je = !0);
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
  function nv(e, t, a, l) {
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
        return uv(
          e,
          t,
          u,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ai(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? sd(t, u) : Uc(), cd(t);
      else
        return l = t.lanes = 536870912, uv(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Ai(t, u.cachePool), sd(t, u), tl(), t.memoizedState = null) : (e !== null && Ai(t, null), Uc(), tl());
    return Fe(e, t, n, a), t.child;
  }
  function yu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function uv(e, t, a, l, n) {
    var u = Cc();
    return u = u === null ? null : { parent: Ze._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ai(t, null), Uc(), cd(t), e !== null && El(e, t, l, !0), t.childLanes = n, null;
  }
  function Zi(e, t) {
    return t = Ki(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function iv(e, t, a) {
    return Ml(t, e.child, null, a), e = Zi(t, t.pendingProps), e.flags |= 2, zt(t), t.memoizedState = null, e;
  }
  function oy(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (oe) {
        if (l.mode === "hidden")
          return e = Zi(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, yu(null, e);
        if (Lc(t), (e = De) ? (e = Rm(
          e,
          Xt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Za !== null ? { id: ca, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Xf(e), a.return = t, t.child = a, Pe = t, De = null)) : e = null, e === null) throw Ja(t);
        return t.lanes = 536870912, null;
      }
      return Zi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Lc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = iv(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Je || El(e, t, a, !1), n = (a & e.childLanes) !== 0, Je || n) {
        if (Pa.current === null) {
          if (l = Ce, l !== null && (c = Zo(l, a), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, jl(e, c), jt(l, e, c), nr;
          fs();
        }
        t = iv(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, De = Zt(c.nextSibling), Pe = t, oe = !0, Ka = null, Xt = !1, e !== null && Kf(t, e), t = Zi(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Ea(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function vn(e, t) {
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
    return Al(t), a = Yc(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Gc(), e !== null && !Je ? (Qc(e, t, n), Ma(e, t, n)) : (oe && l && ji(t), t.flags |= 1, Fe(e, t, a, n), t.child);
  }
  function sv(e, t, a, l, n, u) {
    return Al(t), t.updateQueue = null, a = od(
      t,
      l,
      a,
      n
    ), rd(e), l = Gc(), e !== null && !Je ? (Qc(e, t, u), Ma(e, t, u)) : (oe && l && ji(t), t.flags |= 1, Fe(e, t, a, u), t.child);
  }
  function cv(e, t, a, l, n) {
    if (Al(t), t.stateNode === null) {
      var u = an, c = a.contextType;
      typeof c == "object" && c !== null && (u = nt(c)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ar, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, Dc(t), c = a.contextType, u.context = typeof c == "object" && c !== null ? nt(c) : an, u.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (tr(
        t,
        a,
        c,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ar.enqueueReplaceState(u, u.state, null), du(t, l, u, n), fu(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, m = Ul(a, f);
      u.props = m;
      var x = u.context, C = a.contextType;
      c = an, typeof C == "object" && C !== null && (c = nt(C));
      var O = a.getDerivedStateFromProps;
      C = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, C || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || x !== c) && kd(
        t,
        u,
        l,
        c
      ), Fa = !1;
      var S = t.memoizedState;
      u.state = S, du(t, l, u, n), fu(), x = t.memoizedState, f || S !== x || Fa ? (typeof O == "function" && (tr(
        t,
        a,
        O,
        l
      ), x = t.memoizedState), (m = Fa || Jd(
        t,
        a,
        m,
        l,
        S,
        x,
        c
      )) ? (C || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = x), u.props = l, u.state = x, u.context = c, l = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Rc(e, t), c = t.memoizedProps, C = Ul(a, c), u.props = C, O = t.pendingProps, S = u.context, x = a.contextType, m = an, typeof x == "object" && x !== null && (m = nt(x)), f = a.getDerivedStateFromProps, (x = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== O || S !== m) && kd(
        t,
        u,
        l,
        m
      ), Fa = !1, S = t.memoizedState, u.state = S, du(t, l, u, n), fu();
      var A = t.memoizedState;
      c !== O || S !== A || Fa || e !== null && e.dependencies !== null && wi(e.dependencies) ? (typeof f == "function" && (tr(
        t,
        a,
        f,
        l
      ), A = t.memoizedState), (C = Fa || Jd(
        t,
        a,
        C,
        l,
        S,
        A,
        m
      ) || e !== null && e.dependencies !== null && wi(e.dependencies)) ? (x || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, A, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        A,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = A), u.props = l, u.state = A, u.context = m, l = C) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, vn(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = Ml(
      t,
      e.child,
      null,
      n
    ), t.child = Ml(
      t,
      null,
      a,
      n
    )) : Fe(e, t, a, n), t.memoizedState = u.state, e = t.child) : e = Ma(
      e,
      t,
      n
    ), e;
  }
  function rv(e, t, a, l) {
    return Nl(), t.flags |= 256, Fe(e, t, a, l), t.child;
  }
  var ir = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function sr(e) {
    return { baseLanes: e, cachePool: If() };
  }
  function cr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Mt), e;
  }
  function ov(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (it.current & 2) !== 0), c && (n = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (oe) {
        if (n ? el(t) : tl(), (e = De) ? (e = Rm(
          e,
          Xt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Za !== null ? { id: ca, overflow: ra } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Xf(e), a.return = t, t.child = a, Pe = t, De = null)) : e = null, e === null) throw Ja(t);
        return so(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (tl(), n = t.mode, u = Ki(
        { mode: "hidden", children: u },
        n
      ), l = Tl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = sr(a), l.childLanes = cr(
        e,
        c,
        a
      ), t.memoizedState = ir, yu(null, l)) : (el(t), rr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var m = f.dehydrated;
      if (m !== null)
        return fy(
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
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, m !== null ? n = Ea(m, n) : (n = Tl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, yu(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = sr(a) : (u = n.cachePool, u !== null ? (f = Ze._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = If(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = cr(
      e,
      c,
      a
    ), t.memoizedState = ir, yu(e.child, l)) : (el(t), a = e.child, e = a.sibling, a = Ea(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function rr(e, t) {
    return t = Ki(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ki(e, t) {
    return e = _t(22, e, null, t), e.lanes = 0, e;
  }
  function Ji(e, t, a) {
    return Ml(t, e.child, null, a), e = rr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function fy(e, t, a, l, n, u, c, f) {
    if (a)
      return t.flags & 256 ? (el(t), t.flags &= -257, Ji(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (tl(), t.child = e.child, t.flags |= 128, null) : (tl(), u = n.fallback, c = t.mode, n = Ki(
        { mode: "visible", children: n.children },
        c
      ), u = Tl(
        u,
        c,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Ml(t, e.child, null, f), n = t.child, n.memoizedState = sr(f), n.childLanes = cr(
        e,
        l,
        f
      ), t.memoizedState = ir, yu(null, n));
    if (el(t), so(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var m = l.dgst;
      return l = m, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, uu({ value: n, source: null, stack: null })), Ji(
        e,
        t,
        f
      );
    }
    if (Je || El(e, t, f, !1), l = (f & e.childLanes) !== 0, Je || l) {
      if (Pa.current !== null)
        return Ji(
          e,
          t,
          f
        );
      if (l = Ce, l !== null && (n = Zo(
        l,
        f
      ), n !== 0 && n !== c.retryLane))
        throw c.retryLane = n, jl(e, n), jt(l, e, n), nr;
      return io(u) || fs(), Ji(
        e,
        t,
        f
      );
    }
    return io(u) ? (t.flags |= 192, t.child = e.child, null) : (e = c.treeContext, De = Zt(u.nextSibling), Pe = t, oe = !0, Ka = null, Xt = !1, e !== null && Kf(t, e), t = rr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function fv(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Ni(e.return, t, a);
  }
  function dv(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && Oi(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function ki(e, t, a, l, n, u) {
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
      return vu(t, c), null;
    var f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, vu(t, c), n === "backwards" && e !== null ? (or(e), Fe(e, t, l, a), or(e)) : Fe(e, t, l, a), l = oe ? nu : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && fv(e, a, t);
        else if (e.tag === 19)
          fv(e, a, t);
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
        a = dv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, or(t)), ki(
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
          if (e = n.alternate, e !== null && Oi(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = a, a = n, n = e;
        }
        ki(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        ki(
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
        a = dv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), ki(
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
  function vv(e, t, a) {
    var l = t.pendingProps;
    return ka(t, t.type, l.value), Fe(e, t, l.children, a), t.child;
  }
  function Ma(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ul |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (El(
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
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && wi(e)));
  }
  function dy(e, t, a) {
    switch (t.tag) {
      case 3:
        Pu(t, t.stateNode.containerInfo), ka(t, Ze, e.memoizedState.cache), Nl();
        break;
      case 27:
      case 5:
        Bs(t);
        break;
      case 4:
        Pu(t, t.stateNode.containerInfo);
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
          l = El(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? ov(e, t, a) : (el(t), e = Ma(
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
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (El(
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
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), vu(t, it.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, nv(
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
  function mv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Je = !0;
      else {
        if (!dr(e, a) && (t.flags & 128) === 0)
          return Je = !1, dy(
            e,
            t,
            a
          );
        Je = (e.flags & 131072) !== 0;
      }
    else
      Je = !1, oe && (t.flags & 1048576) !== 0 && Zf(t, nu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Dl(t.elementType), t.type = e, typeof e == "function")
            _c(e) ? (l = Ul(e, l), t.tag = 1, t = cv(
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
              if (n === G) {
                t.tag = 11, t = tv(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ce) {
                t.tag = 14, t = av(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === Me) {
                t.tag = 10, t.type = e, t = vv(
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
        return l = t.type, n = Ul(
          l,
          t.pendingProps
        ), cv(
          e,
          t,
          l,
          n,
          a
        );
      case 3:
        e: {
          if (Pu(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Rc(e, t), du(t, l, null, a);
          var c = t.memoizedState;
          if (l = c.cache, ka(t, Ze, l), l !== u.cache && wc(
            t,
            [Ze],
            a,
            !0
          ), fu(), l = c.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = rv(
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
              ), uu(n), t = rv(
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
              for (De = Zt(e.firstChild), Pe = t, oe = !0, Ka = null, Xt = !0, a = nd(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (Nl(), l === n) {
              t = Ma(
                e,
                t,
                a
              );
              break e;
            }
            Fe(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return vn(e, t), e === null ? (a = Bm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : oe || (t.stateNode = pm(
          t.type,
          t.pendingProps,
          Ya.current,
          t
        )) : t.memoizedState = Bm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Bs(t), e === null && oe && (l = t.stateNode = Um(
          t.type,
          t.pendingProps,
          Ya.current
        ), Pe = t, Xt = !0, n = De, rl(t.type) ? (co = n, De = Zt(l.firstChild)) : De = n), Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), vn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && oe && ((n = l = De) && (l = i0(
          l,
          t.type,
          t.pendingProps,
          Xt
        ), l !== null ? (t.stateNode = l, Pe = t, De = Zt(l.firstChild), Xt = !1, n = !0) : n = !1), n || Ja(t)), Bs(t), n = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, l = u.children, Pr(n, u) ? l = null : c !== null && Pr(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = Yc(
          e,
          t,
          ty,
          null,
          null,
          a
        ), Dn._currentValue = n), vn(e, t), Fe(e, t, l, a), t.child;
      case 6:
        return e === null && oe && ((e = a = De) && (a = s0(
          a,
          t.pendingProps,
          Xt
        ), a !== null ? (t.stateNode = a, Pe = t, De = null, e = !0) : e = !1), e || Ja(t)), null;
      case 13:
        return ov(e, t, a);
      case 4:
        return Pu(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Ml(
          t,
          null,
          l,
          a
        ) : Fe(e, t, l, a), t.child;
      case 11:
        return tv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, vn(e, t), Fe(e, t, l, a), t.child;
      case 8:
        return Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return vv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, Al(t), n = nt(n), l = l(n), t.flags |= 1, Fe(e, t, l, a), t.child;
      case 14:
        return av(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return lv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return fr(e, t, a);
      case 31:
        return oy(e, t, a);
      case 22:
        return nv(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Al(t), l = nt(Ze), e === null ? (n = Cc(), n === null && (n = Ce, u = Ec(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, Dc(t), ka(t, Ze, n)) : ((e.lanes & a) !== 0 && (Rc(e, t), du(t, null, null, a), fu()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ka(t, Ze, l)) : (l = u.cache, ka(t, Ze, l), l !== n.cache && wc(
          t,
          [Ze],
          a,
          !0
        ))), Fe(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : oe && ji(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : vn(e, t), Fe(e, t, l.children, a), t.child;
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
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Xm(t, l) : Xm(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if ($v()) e.flags |= 8192;
        else
          throw Rl = zi, zc;
    } else e.flags &= -16777217;
  }
  function hv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Vm(t))
      if ($v()) e.flags |= 8192;
      else
        throw Rl = zi, zc;
  }
  function $i(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Qo() : 536870912, e.lanes |= t, pn |= t);
  }
  function pu(e, t) {
    if (!oe)
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
  function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags & 1206910976, l |= n.flags & 1206910976, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function vy(e, t, a) {
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
        return Re(t), null;
      case 1:
        return Re(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), za(Ze), Xl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (un(t) ? Oa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Tc())), Re(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Oa(t), u !== null ? (Re(t), hv(t, u)) : (Re(t), vr(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (Oa(t), Re(t), hv(t, u)) : (Re(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Oa(t), Re(t), vr(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if (ei(t), a = Ya.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Re(t), t.subtreeFlags &= -33554433, null;
          }
          e = ia.current, un(t) ? Jf(t) : (e = Um(n, l, a), t.stateNode = e, Oa(t));
        }
        return Re(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (ei(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Re(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = ia.current, un(t))
            Jf(t);
          else {
            var c = Cu(
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
        return Re(t), t.subtreeFlags &= -33554433, vr(
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
          if (e = Ya.current, un(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = Pe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || mm(e.nodeValue, a)), e || Ja(t, !0);
          } else
            e = Cu(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return Re(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = un(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[lt] = t;
            } else
              Nl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), e = !1;
          } else
            a = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Re(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = un(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[lt] = t;
            } else
              Nl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), n = !1;
          } else
            n = Tc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return zt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), $i(t, t.updateQueue), Re(t), null);
      case 4:
        return Xl(), e === null && kr(t.stateNode.containerInfo), t.flags |= 67108864, Re(t), null;
      case 10:
        return za(t.type), Re(t), null;
      case 19:
        if (qc(t), l = t.memoizedState, l === null) return Re(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) pu(l, !1);
          else {
            if (Ge !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Oi(e), u !== null) {
                  for (t.flags |= 128, pu(l, !1), e = u.updateQueue, t.updateQueue = e, $i(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Qf(a, e), a = a.sibling;
                  return vu(
                    t,
                    it.current & 1 | 2
                  ), oe && Aa(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Nt() > ss && (t.flags |= 128, n = !0, pu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Oi(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, $i(t, e), pu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !oe)
                return Re(t), null;
            } else
              2 * Nt() - l.renderingStartTime > ss && a !== 536870912 && (t.flags |= 128, n = !0, pu(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Nt(), e.sibling = null, u = it.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || oe ? vu(t, u) : (a = u, ze(ut, t), ze(it, a), ft === null && (ft = t)), oe && Aa(t, l.treeForkCount), e;
        }
        return Re(t), null;
      case 22:
      case 23:
        return zt(t), Hc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Re(t), a = t.updateQueue, a !== null && $i(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && at(zl), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), za(Ze), Re(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Re(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function my(e, t) {
    switch (xc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return za(Ze), Xl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return ei(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (zt(t), t.alternate === null)
            throw Error(o(340));
          Nl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (zt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Nl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return qc(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Xl(), null;
      case 10:
        return za(t.type), null;
      case 22:
      case 23:
        return zt(t), Hc(), e !== null && at(zl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return za(Ze), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gv(e, t) {
    switch (xc(t), t.tag) {
      case 3:
        za(Ze), Xl();
        break;
      case 26:
      case 27:
      case 5:
        ei(t);
        break;
      case 4:
        Xl();
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
        zt(t), Hc(), e !== null && at(zl);
        break;
      case 24:
        za(Ze);
    }
  }
  function _u(e, t) {
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
      we(t, t.return, f);
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
                we(
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
      we(t, t.return, C);
    }
  }
  function yv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        id(t, a);
      } catch (l) {
        we(e, e.return, l);
      }
    }
  }
  function pv(e, t, a) {
    a.props = Ul(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      we(e, t, l);
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
            (n.ref === null || n.ref.name !== u) && (n.ref = Nm(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var c = new Ut(e);
              y(
                e.child,
                !1,
                n0,
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
      we(e, t, f);
    }
  }
  function st(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          we(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          we(e, t, n);
        }
      else a.current = null;
  }
  function Fi(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var a = 0; a < t.length; a++)
        Dm(
          e.stateNode,
          t[a]
        );
  }
  function _v(e) {
    for (var t = e.return; t !== null && (hr(t) && Dm(e.stateNode, t.stateNode), !mr(t)); )
      t = t.return;
  }
  function Su(e) {
    for (var t = e.return; t !== null && (hr(t) && u0(e.stateNode, t.stateNode), !mr(t)); )
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
      we(e, e.return, n);
    }
  }
  function yr(e, t, a) {
    try {
      var l = e.stateNode;
      Yy(l, e.type, a, t), l[pt] = t;
    } catch (n) {
      we(e, e.return, n);
    }
  }
  function Sv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && rl(e.type) || e.tag === 4;
  }
  function pr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Sv(e.return)) return null;
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
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = sa)), Fi(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (Fi(e, l), l = null, rl(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
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
  function Wi(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? a.insertBefore(n, t) : a.appendChild(n), Fi(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (Fi(e, l), l = null, rl(e.type) && (a = e.stateNode)), e = e.child, e !== null))
      for (Wi(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        Wi(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function bv(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ct(t, l, a), t[lt] = e, t[pt] = a;
    } catch (u) {
      we(e, e.return, u);
    }
  }
  var Ii = !1, Dt = null;
  function xv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ii = !0);
  }
  var fa = null;
  function jv() {
    var e = fa;
    return fa = null, e;
  }
  var St = 0;
  function mn(e, t, a, l, n) {
    return St = 0, Tv(
      e.child,
      t,
      a,
      l,
      n
    );
  }
  function Tv(e, t, a, l, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var c = e.stateNode;
        if (l !== null) {
          var f = ao(c);
          l.push(f), f.view && (u = !0);
        } else
          u || ao(c).view && (u = !0);
        Ii = !0, jm(
          c,
          St === 0 ? t : t + "_" + St,
          a
        ), St++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || Tv(
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
      e.tag === 5 ? Tm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || da(
        e.child,
        t
      )), e = e.sibling;
  }
  function Pi(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Pi(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var a = t.name;
          t = wa(t.default, t.share), t !== "none" && (mn(
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
      u !== "none" ? mn(e, n, u, null, !1) ? (Pi(e), a.paired || t || xn(e, l.onEnter)) : da(e.child, !1) : Pi(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Sr(e, t), e = e.sibling;
    else Pi(e);
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
                  if (u !== "none" && (mn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, xn(e, a.onShare)) : da(e.child, !1)), t.delete(l), t.size === 0) break;
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
      n !== "none" && (mn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, Dt.delete(a), xn(e, t.onShare)) : xn(e, t.onExit) : da(e.child, !1)), Dt !== null && br(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        xr(e), e = e.sibling;
    else
      Dt !== null && br(e);
  }
  function Nv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = Na(t, e.stateNode);
        t = wa(t.default, t.update), e.flags &= -5, t !== "none" && mn(
          e,
          a,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && Nv(e);
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
  function es(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, da(e.child, !1), jr(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        es(e), e = e.sibling;
    else jr(e);
  }
  function wv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? da(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && wv(e), e = e.sibling;
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
              var S = C.rect;
              O = O.y !== S.y || O.x !== S.x || O.height !== S.height || O.width !== S.width;
            }
          O && (e.flags |= 4), C.abs ? C = !x.abs : (x = x.rect, C = C.rect, C = x.height !== C.height || x.width !== C.width), C && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && jm(
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
  function Ev(e, t) {
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
        ), (e.flags & 4) !== 0 && n && xn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Ev(e);
      e = e.sibling;
    }
  }
  var et = !1, Te = !1, va = !1, Nr = !1, Av = typeof WeakSet == "function" ? WeakSet : Set, tt = null, ma = !1, bu = !1, ts = !1, wr = !1;
  function hy(e, t, a) {
    if (e = e.containerInfo, Wr = Rn, e = Rf(e), dc(e)) {
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
            var f = 0, m = -1, x = -1, C = 0, O = 0, S = e, A = null;
            t: for (; ; ) {
              for (var B; S !== l || u !== 0 && S.nodeType !== 3 || (m = f + u), S !== c || n !== 0 && S.nodeType !== 3 || (x = f + n), S.nodeType === 3 && (f += S.nodeValue.length), (B = S.firstChild) !== null; )
                A = S, S = B;
              for (; ; ) {
                if (S === e) break t;
                if (A === l && ++C === u && (m = f), A === c && ++O === n && (x = f), (B = S.nextSibling) !== null) break;
                S = A, A = S.parentNode;
              }
              S = B;
            }
            l = m === -1 || x === -1 ? null : { start: m, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ir = { focusedElem: e, selectionRange: l }, Rn = !1, a = (a & 335544064) === a, tt = t, t = a ? 9270 : 1024; tt !== null; ) {
      if (e = tt, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && xr(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && xv(e), as(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && xr(l), as(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && xv(e), as(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, tt = l) : (a && Nv(e), as(a));
      }
    }
    Dt = null;
  }
  function as(e) {
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
              var c = Ul(
                t.type,
                n
              );
              a = u.getSnapshotBeforeUpdate(
                c,
                l
              ), u.__reactInternalSnapshotBeforeUpdate = a;
            } catch (f) {
              we(t, t.return, f);
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
          ), n = t.memoizedProps, n = wa(n.default, n.update), n !== "none" && mn(
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
  function Cv(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ha(e, a), l & 4 && _u(5, a);
        break;
      case 1:
        if (ha(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              we(a, a.return, c);
            }
          else {
            var n = Ul(
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
              we(
                a,
                a.return,
                c
              );
            }
          }
        l & 64 && yv(a), l & 512 && oa(a, a.return);
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
            id(e, t);
          } catch (c) {
            we(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && l & 4 && bv(a);
      case 26:
      case 5:
        ha(e, a), t === null && l & 4 && gr(a), l & 512 && oa(a, a.return);
        break;
      case 12:
        ha(e, a);
        break;
      case 31:
        ha(e, a), l & 4 && Mv(e, a);
        break;
      case 13:
        ha(e, a), l & 4 && Ov(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Ey.bind(
          null,
          a
        ), c0(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || et, !l) {
          var u = t !== null && t.memoizedState !== null || Te;
          t = et, n = Te, et = l, (Te = u) && !n ? (l = 2, (a.subtreeFlags & 8772) !== 0 && (l |= 1), Pt(
            e,
            a,
            l
          )) : ha(e, a), et = t, Te = n;
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
      zv(e, t), e = e.sibling;
  }
  function zv(e, t) {
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
          we(e, e.return, m);
        }
        Ar(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, be = !0;
        } catch (m) {
          we(e, e.return, m);
        }
        break;
      case 18:
        try {
          var f = e.stateNode;
          t ? xm(f, !0) : xm(e.stateNode, !1);
        } catch (m) {
          we(e, e.return, m);
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
              zv(a, l);
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
  function Dv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Dv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && si(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ue = null, bt = !1;
  function Wt(e, t, a) {
    for (a = a.child; a !== null; )
      Rv(e, t, a), a = a.sibling;
  }
  function Rv(e, t, a) {
    if (wt && typeof wt.onCommitFiberUnmount == "function")
      try {
        wt.onCommitFiberUnmount(Vn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Te || st(a, t), Wt(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !Te && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Te || st(a, t), Su(a);
        var l = Ue, n = bt;
        rl(a.type) && (Ue = a.stateNode, bt = !1), Wt(
          e,
          t,
          a
        ), Hm(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), Ue = l, bt = n;
        break;
      case 5:
        Te || st(a, t), Su(a);
      case 6:
        if (a.tag === 6 && Su(a), l = Ue, n = bt, Ue = null, Wt(
          e,
          t,
          a
        ), Ue = l, bt = n, Ue !== null)
          if (bt)
            try {
              (Ue.nodeType === 9 ? Ue.body : Ue.nodeName === "HTML" ? Ue.ownerDocument.body : Ue).removeChild(a.stateNode), be = !0;
            } catch (u) {
              we(
                a,
                t,
                u
              );
            }
          else
            try {
              Ue.removeChild(a.stateNode), be = !0;
            } catch (u) {
              we(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        Ue !== null && (bt ? (e = Ue, bm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Mn(e)) : bm(Ue, a.stateNode));
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
        al(2, a, t), Te || al(4, a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 1:
        Te || (st(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && pv(
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
        Te = (l = Te) || a.memoizedState !== null, Wt(
          e,
          t,
          a
        ), Te = l;
        break;
      case 30:
        st(a, t), Wt(
          e,
          t,
          a
        );
        break;
      case 7:
        Te || st(a, t), Wt(
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
  function Mv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Mn(e);
      } catch (a) {
        we(t, t.return, a);
      }
    }
  }
  function Ov(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Mn(e);
      } catch (a) {
        we(t, t.return, a);
      }
  }
  function gy(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Av()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Av()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ls(e, t) {
    var a = gy(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var n = Ay.bind(null, e, l);
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
        Rv(c, f, u), Ue = null, bt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Uv(t, e, a), t = t.sibling;
  }
  var It = null;
  function Uv(e, t, a) {
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
        ht(t, e, a), gt(e), n & 4 && (al(3, e, e.return), _u(3, e), al(5, e, e.return));
        break;
      case 1:
        ht(t, e, a), gt(e), n & 512 && (Te || l === null || st(l, l.return)), n & 64 && et && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = It, ht(t, e, a), gt(e), n & 512 && (Te || l === null || st(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (et)
                  e.stateNode = pm(
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
                        l = n.getElementsByTagName("title")[0], (!l || l[Jn] || l[lt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = n.createElement(t), n.head.insertBefore(
                          l,
                          n.querySelector("head > title")
                        )), ct(l, t, a), l[lt] = e, Ie(l), t = l;
                        break e;
                      case "link":
                        if (u = Qm(
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
                        if (u = Qm(
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
              e.stateNode = Gm(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || Te || t.parentNode.removeChild(t)) : n.count--, a === null ? et || vo(u, e.type, e.stateNode) : Gm(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && yr(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        ht(t, e, a), gt(e), n & 512 && (Te || l === null || st(l, l.return)), l !== null && n & 4 && yr(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = va, va = !1, ht(t, e, a), va = u, gt(e), n & 512 && (Te || l === null || st(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            $l(t, ""), be = !0;
          } catch (C) {
            we(e, e.return, C);
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
            we(e, e.return, C);
          }
        }
        break;
      case 3:
        if (be = !1, ps = null, u = It, It = zu(t.containerInfo), ht(t, e, a), It = u, gt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Mn(t.containerInfo);
          } catch (C) {
            we(e, e.return, C);
          }
        Nr && (Nr = !1, Hv(e)), be = !1;
        break;
      case 4:
        n = va, va = et, l = tf(), u = It, It = zu(
          e.stateNode.containerInfo
        ), ht(t, e, a), gt(e), It = u, be && bu && (ts = !0), be = l, va = n;
        break;
      case 12:
        ht(t, e, a), gt(e);
        break;
      case 31:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ls(e, t)));
        break;
      case 13:
        ht(t, e, a), gt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (is = Nt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ls(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, c = l !== null && l.memoizedState !== null;
        var f = et, m = Te, x = va;
        et = f || u, va = x || u, Te = m || c, ht(t, e, a), Te = m, va = x, et = f, gt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || c || et || Te || (t = c || Te, a = et, l = Te, et = u || et, Te = t, ll(e, 2), et = a, Te = l), !u && va || Er(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, ls(e, a))));
        break;
      case 19:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ls(e, t)));
        break;
      case 30:
        n & 512 && (Te || l === null || st(l, l.return)), n = tf(), u = bu, c = (a & 335544064) === a, f = e.memoizedProps, bu = c && wa(
          f.default,
          f.update
        ) !== "none", ht(t, e, a), gt(e), c && l !== null && be && (e.flags |= 4), bu = u, be = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Te || l === null || st(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
      default:
        ht(t, e, a), gt(e);
    }
  }
  function gt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (Sv(l)) {
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
            Wi(
              e,
              m,
              f,
              c
            );
            break;
          case 5:
            var x = a.stateNode;
            a.flags & 32 && ($l(x, ""), a.flags &= -33);
            var C = pr(e);
            Wi(
              e,
              C,
              x,
              c
            );
            break;
          case 3:
          case 4:
            var O = a.stateNode.containerInfo, S = pr(e);
            _r(
              e,
              S,
              O,
              c
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (A) {
        we(e, e.return, A);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Hv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Hv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Rn = !0, t.reset(), Rn = !1), e = e.sibling;
      }
  }
  function hn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Lv(t, e), t = t.sibling;
    else Ev(t);
  }
  function Lv(e, t) {
    var a = e.alternate;
    if (a === null) Sr(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (wr = ma = !1, jv(), hn(t, e), !ma && !ts) {
            if (e = fa, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                a = e[l];
                var n = e[l + 1];
                Tm(a, e[l + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
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
          hn(t, e);
          break;
        case 4:
          l = ma, ma = !1, hn(t, e), ma && (ts = !0), ma = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? Sr(e, !1) : hn(t, e));
          break;
        case 30:
          l = ma, n = jv(), ma = !1, hn(t, e), ma && (e.flags |= 4);
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
          ), St !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (xn(
            e,
            e.memoizedProps.onUpdate
          ), fa = n) : n !== null && (n.push.apply(n, fa), fa = n), ma = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          hn(t, e);
      }
  }
  function ha(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Cv(e, t.alternate, t), t = t.sibling;
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
          typeof n.componentWillUnmount == "function" && pv(
            a,
            a.return,
            n
          ), ll(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Hm(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          st(a, a.return), a.tag !== 5 && a.tag !== 27 || Su(a), ll(
            a,
            l
          );
          break;
        case 6:
          Su(a);
          break;
        case 26:
          st(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || Te || n.parentNode.removeChild(n), ll(
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
          ), _u(4, u);
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
              we(l, l.return, C);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var m = l.stateNode;
            try {
              var x = n.shared.hiddenCallbacks;
              if (x !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < x.length; n++)
                  ud(x[n], m);
            } catch (C) {
              we(l, l.return, C);
            }
          }
          f && c & 64 && yv(u), oa(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && bv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || _v(u), Pt(
            n,
            u,
            a
          ), f && l === null && c & 4 && gr(u), oa(u, u.return);
          break;
        case 6:
          _v(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || et || vo(
            zu(m.ownerDocument),
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
          ), f && c & 4 && Mv(n, u);
          break;
        case 13:
          Pt(
            n,
            u,
            a
          ), f && c & 4 && Ov(n, u);
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
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && iu(a));
  }
  function zr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && iu(e));
  }
  function Vt(e, t, a, l) {
    var n = (a & 335544064) === a;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        qv(
          e,
          t,
          a,
          l
        ), t = t.sibling;
    else n && wv(t);
  }
  function qv(e, t, a, l) {
    var n = (a & 335544064) === a;
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && es(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Vt(
          e,
          t,
          a,
          l
        ), u & 2048 && _u(9, t);
        break;
      case 1:
        Vt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Vt(
          e,
          t,
          a,
          l
        ), n && wr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && iu(u)));
        break;
      case 12:
        if (u & 2048) {
          Vt(
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
            we(t, t.return, x);
          }
        } else
          Vt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Vt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Vt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && es(f), c._visibility & 2 ? Vt(
          e,
          t,
          a,
          l
        ) : xu(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && es(t), c._visibility & 2 ? Vt(
          e,
          t,
          a,
          l
        ) : (c._visibility |= 2, gn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Cr(f, t);
        break;
      case 24:
        Vt(
          e,
          t,
          a,
          l
        ), u & 2048 && zr(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (da(u.child, !0), da(t.child, !0))), Vt(
          e,
          t,
          a,
          l
        );
        break;
      default:
        Vt(
          e,
          t,
          a,
          l
        );
    }
  }
  function gn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, f = a, m = l, x = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          gn(
            u,
            c,
            f,
            m,
            n
          ), _u(8, c);
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          c.memoizedState !== null ? C._visibility & 2 ? gn(
            u,
            c,
            f,
            m,
            n
          ) : xu(
            u,
            c
          ) : (C._visibility |= 2, gn(
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
          gn(
            u,
            c,
            f,
            m,
            n
          ), n && x & 2048 && zr(c.alternate, c);
          break;
        default:
          gn(
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
  function xu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            xu(a, l), n & 2048 && Cr(
              l.alternate,
              l
            );
            break;
          case 24:
            xu(a, l), n & 2048 && zr(l.alternate, l);
            break;
          default:
            xu(a, l);
        }
        t = t.sibling;
      }
  }
  var Hl = 8192;
  function Ll(e, t, a) {
    if (e.subtreeFlags & Hl)
      for (e = e.child; e !== null; )
        Bv(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function Bv(e, t, a) {
    switch (e.tag) {
      case 26:
        Ll(
          e,
          t,
          a
        ), e.flags & Hl && (e.memoizedState !== null ? x0(
          a,
          It,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Km(a, e)));
        break;
      case 5:
        Ll(
          e,
          t,
          a
        ), e.flags & Hl && (e = e.stateNode, (t & 335544128) === t && Km(a, e));
        break;
      case 3:
      case 4:
        var l = It;
        It = zu(e.stateNode.containerInfo), Ll(
          e,
          t,
          a
        ), It = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Hl, Hl = 16777216, Ll(
          e,
          t,
          a
        ), Hl = l) : Ll(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & Hl) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, Dt === null && (Dt = /* @__PURE__ */ new Map()), Dt.set(l, n);
        }
        Ll(
          e,
          t,
          a
        );
        break;
      default:
        Ll(
          e,
          t,
          a
        );
    }
  }
  function Yv(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ju(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Qv(
            l,
            e
          );
        }
      Yv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Gv(e), e = e.sibling;
  }
  function Gv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ju(e), e.flags & 2048 && al(9, e, e.return);
        break;
      case 3:
        ju(e);
        break;
      case 12:
        ju(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ns(e)) : ju(e);
        break;
      default:
        ju(e);
    }
  }
  function ns(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Qv(
            l,
            e
          );
        }
      Yv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          al(8, t, t.return), ns(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, ns(t));
          break;
        default:
          ns(t);
      }
      e = e.sibling;
    }
  }
  function Qv(e, t) {
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
          iu(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, tt = l;
      else
        e: for (a = e; tt !== null; ) {
          l = tt;
          var n = l.sibling, u = l.return;
          if (Dv(l), l === a) {
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
  var yy = {
    getCacheForType: function(e) {
      var t = nt(Ze), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return nt(Ze).controller.signal;
    }
  }, py = typeof WeakMap == "function" ? WeakMap : Map, je = 0, Ce = null, fe = null, ve = 0, Ne = 0, Rt = null, nl = !1, yn = !1, Dr = !1, Ua = 0, Ge = 0, ul = 0, ql = 0, us = 0, Mt = 0, pn = 0, Tu = null, xt = null, Rr = !1, is = 0, Xv = 0, ss = 1 / 0, cs = null, il = null, Be = 0, ea = null, Bl = null, ga = 0, Mr = 0, Or = null, Vv = null, _n = null, Sn = null, bn = null, Nu = 0, rs = null;
  function Ot() {
    return (je & 2) !== 0 && ve !== 0 ? ve & -ve : $.T !== null ? Vr() : Ko();
  }
  function Zv() {
    if (Mt === 0)
      if ((ve & 536870912) === 0 || oe) {
        var e = li;
        li <<= 1, (li & 3932160) === 0 && (li = 262144), Mt = e;
      } else Mt = 536870912;
    return e = ut.current, e !== null && (e.flags |= 32), Mt;
  }
  function xn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = Nm(
        Na(e.memoizedProps, a)
      )), Sn === null && (Sn = []), Sn.push(t.bind(null, l));
    }
  }
  function jt(e, t, a) {
    (e === Ce && (Ne === 2 || Ne === 9) || e.cancelPendingCommit !== null) && (jn(e, 0), sl(
      e,
      ve,
      Mt,
      !1
    )), Kn(e, a), ((je & 2) === 0 || e !== Ce) && (e === Ce && ((je & 2) === 0 && (ql |= a), Ge === 4 && sl(
      e,
      ve,
      Mt,
      !1
    )), ya(e));
  }
  function Kv(e, t, a) {
    if ((je & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Zn(e, t), n = l ? by(e, t) : Hr(e, t, !0), u = l;
    do {
      if (n === 0) {
        yn && !l && sl(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !_y(a)) {
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
              n = Tu;
              var m = f.current.memoizedState.isDehydrated;
              if (m && (jn(f, c).flags |= 256), c = Hr(
                f,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (Dr && !m) {
                  f.errorRecoveryDisabledLanes |= u, ql |= u, n = 4;
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
          jn(e, 0), sl(e, t, 0, !0);
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
          if ((t & 62914560) === t && (n = is + 300 - Nt(), 10 < n)) {
            if (sl(
              l,
              t,
              Mt,
              !nl
            ), ui(l, 0, !0) !== 0) break e;
            ga = t, l.timeoutHandle = to(
              Jv.bind(
                null,
                l,
                a,
                xt,
                cs,
                Rr,
                t,
                Mt,
                ql,
                pn,
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
          Jv(
            l,
            a,
            xt,
            cs,
            Rr,
            t,
            Mt,
            ql,
            pn,
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
  function Jv(e, t, a, l, n, u, c, f, m, x, C, O, S, A) {
    e.timeoutHandle = -1;
    var B = t.subtreeFlags, J = (u & 335544064) === u;
    if (O = null, (J || B & 8192 || (B & 16785408) === 16785408) && (O = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: sa
    }, Dt = null, Bv(
      t,
      u,
      O
    ), J && (B = O, J = e.containerInfo, J = (J.nodeType === 9 ? J : J.ownerDocument).__reactViewTransition, J != null && (B.count++, B.waitingForViewTransition = !0, B = Mu.bind(B), J.finished.then(B, B))), B = (u & 62914560) === u ? is - Nt() : (u & 4194048) === u ? Xv - Nt() : 0, B = j0(
      O,
      B
    ), B !== null)) {
      ga = u, e.cancelPendingCommit = B(
        tm.bind(
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
          S,
          A
        )
      ), sl(e, u, c, !x);
      return;
    }
    tm(
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
  function _y(e) {
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
    t = Go(e, t), t &= ~us, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - Et(n), c = 1 << u;
      l[u] = -1, n &= ~c;
    }
    a !== 0 && Xo(e, a, t);
  }
  function os() {
    return (je & 6) === 0 ? (wu(0), !1) : !0;
  }
  function Ur() {
    if (fe !== null) {
      if (Ne === 0)
        var e = fe.return;
      else
        e = fe, Ca = wl = null, Xc(e), rn = null, ru = 0, e = fe;
      for (; e !== null; )
        gv(e.alternate, e), e = e.return;
      fe = null;
    }
  }
  function jn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, Xy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ga = 0, Ur(), Ce = e, fe = a = Ea(e.current, null), ve = t, Ne = 0, Rt = null, nl = !1, yn = Zn(e, t), Dr = !1, pn = Mt = us = ql = ul = Ge = 0, xt = Tu = null, Rr = !1, Ua = Go(e, t), pi(), a;
  }
  function kv(e, t) {
    ie = null, $.H = Xi, t === cn || t === Ci ? (t = td(), Ne = 3) : t === zc ? (t = td(), Ne = 4) : Ne = t === nr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Rt = t, fe === null && (Ge = 1, Vi(
      e,
      Yt(t, e.current)
    ));
  }
  function $v() {
    var e = ut.current;
    return e === null ? !0 : (ve & 4194048) === ve ? ft === null : (ve & 62914560) === ve || (ve & 536870912) !== 0 ? e === ft : !1;
  }
  function Fv() {
    var e = $.H;
    return $.H = Xi, e === null ? Xi : e;
  }
  function Wv() {
    var e = $.A;
    return $.A = yy, e;
  }
  function fs() {
    Ge = 4, nl || (ve & 4194048) !== ve && ut.current !== null || (yn = !0), (ul & 134217727) === 0 && (ql & 134217727) === 0 || Ce === null || sl(
      Ce,
      ve,
      Mt,
      !1
    );
  }
  function Hr(e, t, a) {
    var l = je;
    je |= 2;
    var n = Fv(), u = Wv();
    (Ce !== e || ve !== t) && (cs = null, jn(e, t)), t = !1;
    var c = Ge;
    e: do
      try {
        if (Ne !== 0 && fe !== null) {
          var f = fe, m = Rt;
          switch (Ne) {
            case 8:
              Ur(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ut.current === null && (t = !0);
              var x = Ne;
              if (Ne = 0, Rt = null, Tn(e, f, m, x), a && yn) {
                c = 0;
                break e;
              }
              break;
            default:
              x = Ne, Ne = 0, Rt = null, Tn(e, f, m, x);
          }
        }
        Sy(), c = Ge;
        break;
      } catch (C) {
        kv(e, C);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ca = wl = null, je = l, $.H = n, $.A = u, fe === null && (Ce = null, ve = 0, pi()), c;
  }
  function Sy() {
    for (; fe !== null; ) Iv(fe);
  }
  function by(e, t) {
    var a = je;
    je |= 2;
    var l = Fv(), n = Wv();
    Ce !== e || ve !== t ? (cs = null, ss = Nt() + 500, jn(e, t)) : yn = Zn(
      e,
      t
    );
    e: do
      try {
        if (Ne !== 0 && fe !== null) {
          t = fe;
          var u = Rt;
          t: switch (Ne) {
            case 1:
              Ne = 0, Rt = null, Tn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Pf(u)) {
                Ne = 0, Rt = null, Pv(t);
                break;
              }
              t = function() {
                Ne !== 2 && Ne !== 9 || Ce !== e || (Ne = 7), ya(e);
              }, u.then(t, t);
              break e;
            case 3:
              Ne = 7;
              break e;
            case 4:
              Ne = 5;
              break e;
            case 7:
              Pf(u) ? (Ne = 0, Rt = null, Pv(t)) : (Ne = 0, Rt = null, Tn(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (fe.tag) {
                case 26:
                  c = fe.memoizedState;
                case 5:
                case 27:
                  var f = fe;
                  if (c ? Vm(c) : f.stateNode.complete) {
                    Ne = 0, Rt = null;
                    var m = f.sibling;
                    if (m !== null) fe = m;
                    else {
                      var x = f.return;
                      x !== null ? (fe = x, ds(x)) : fe = null;
                    }
                    break t;
                  }
              }
              Ne = 0, Rt = null, Tn(e, t, u, 5);
              break;
            case 6:
              Ne = 0, Rt = null, Tn(e, t, u, 6);
              break;
            case 8:
              Ur(), Ge = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        xy();
        break;
      } catch (C) {
        kv(e, C);
      }
    while (!0);
    return Ca = wl = null, $.H = l, $.A = n, je = a, fe !== null ? 0 : (Ce = null, ve = 0, pi(), Ge);
  }
  function xy() {
    for (; fe !== null && !Bh(); )
      Iv(fe);
  }
  function Iv(e) {
    var t = mv(e.alternate, e, Ua);
    e.memoizedProps = e.pendingProps, t === null ? ds(e) : fe = t;
  }
  function Pv(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = sv(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ve
        );
        break;
      case 11:
        t = sv(
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
        l === Pe && (oe ? (Ti(l), l.tag === 5 && l.stateNode != null && (De = l.stateNode)) : (Ti(l), oe = !0));
      default:
        gv(a, t), t = fe = Qf(t, Ua), t = mv(a, t, Ua);
    }
    e.memoizedProps = e.pendingProps, t === null ? ds(e) : fe = t;
  }
  function Tn(e, t, a, l) {
    Ca = wl = null, Xc(t), rn = null, ru = 0;
    var n = t.return;
    try {
      if (ry(
        e,
        n,
        t,
        a,
        ve
      )) {
        Ge = 1, Vi(
          e,
          Yt(a, e.current)
        ), fe = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw fe = n, u;
      Ge = 1, Vi(
        e,
        Yt(a, e.current)
      ), fe = null;
      return;
    }
    t.flags & 32768 ? (oe || l === 1 ? e = !0 : yn || (ve & 536870912) !== 0 ? e = !1 : (nl = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = ut.current, l !== null && l.tag === 13 && (l.flags |= 16384))), em(t, e)) : ds(t);
  }
  function ds(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        em(
          t,
          nl
        );
        return;
      }
      e = t.return;
      var a = vy(
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
    Ge === 0 && (Ge = 5);
  }
  function em(e, t) {
    do {
      var a = my(e.alternate, e);
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
    Ge = 6, fe = null;
  }
  function tm(e, t, a, l, n, u, c, f, m, x, C, O) {
    e.cancelPendingCommit = null;
    do
      vs();
    while (Be !== 0);
    if ((je & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === Ce && (fe = Ce = null, ve = 0), Bl = t, ea = e, ga = a, Or = n, Vv = l, jy(
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
  function jy(e, t, a, l, n, u, c) {
    var f = t.lanes | t.childLanes;
    if (Mr = f, f |= yc, $h(
      e,
      a,
      f,
      l,
      n,
      u
    ), Sn = null, (a & 335544064) === a ? (bn = Wg(e), l = 10262) : (bn = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Cy(ti, function() {
      return Yr(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Ii = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = $.T, $.T = null, n = te.p, te.p = 2, u = je, je |= 4;
      try {
        hy(e, t, a);
      } finally {
        je = u, te.p = n, $.T = l;
      }
    }
    Be = 1, Ii ? _n = $y(
      c,
      e.containerInfo,
      bn,
      Lr,
      qr,
      Ny,
      Br,
      Yr,
      Ty
    ) : (Lr(), qr(), Br());
  }
  function Ty(e) {
    if (Be !== 0) {
      var t = ea.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function Ny() {
    Be === 3 && (Be = 0, Lv(Bl, ea), Be = 4);
  }
  function Lr() {
    if (Be === 1) {
      Be = 0;
      var e = ea, t = Bl, a = ga, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = $.T, $.T = null;
        var n = te.p;
        te.p = 2;
        var u = je;
        je |= 4;
        try {
          bu = ts = !1, Uv(t, e, a), a = Ir;
          var c = Rf(e.containerInfo), f = a.focusedElem, m = a.selectionRange;
          if (c !== f && f && f.ownerDocument && Df(
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
                var O = f.ownerDocument || document, S = O && O.defaultView || window;
                if (S.getSelection) {
                  var A = S.getSelection(), B = f.textContent.length, J = Math.min(m.start, B), se = m.end === void 0 ? J : Math.min(m.end, B);
                  !A.extend && J > se && (c = se, se = J, J = c);
                  var b = zf(
                    f,
                    J
                  ), g = zf(
                    f,
                    se
                  );
                  if (b && g && (A.rangeCount !== 1 || A.anchorNode !== b.node || A.anchorOffset !== b.offset || A.focusNode !== g.node || A.focusOffset !== g.offset)) {
                    var N = O.createRange();
                    N.setStart(b.node, b.offset), A.removeAllRanges(), J > se ? (A.addRange(N), A.extend(g.node, g.offset)) : (N.setEnd(g.node, g.offset), A.addRange(N));
                  }
                }
              }
            }
            for (O = [], A = f; A = A.parentNode; )
              A.nodeType === 1 && O.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < O.length; f++) {
              var M = O[f];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          Rn = !!Wr, Ir = Wr = null;
        } finally {
          je = u, te.p = n, $.T = l;
        }
      }
      e.current = t, Be = 2;
    }
  }
  function qr() {
    if (Be === 2) {
      Be = 0;
      var e = ea, t = Bl, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = $.T, $.T = null;
        var l = te.p;
        te.p = 2;
        var n = je;
        je |= 4;
        try {
          Cv(e, t.alternate, t);
        } finally {
          je = n, te.p = l, $.T = a;
        }
      }
      Be = 3;
    }
  }
  function Br() {
    if (Be === 4 || Be === 3) {
      Be = 0;
      var e = _n;
      _n = null, Yh();
      var t = ea, a = Bl, l = ga, n = Vv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? Be = 5 : (Be = 0, Bl = ea = null, am(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (il = null), ks(l), a = a.stateNode, wt && typeof wt.onCommitFiberRoot == "function")
        try {
          wt.onCommitFiberRoot(
            Vn,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        a = $.T, u = te.p, te.p = 2, $.T = null;
        try {
          for (var c = t.onRecoverableError, f = 0; f < n.length; f++) {
            var m = n[f];
            c(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          $.T = a, te.p = u;
        }
      }
      if (n = Sn, c = bn, bn = null, n !== null && (Sn = null, c === null && (c = []), e !== null))
        for (m = 0; m < n.length; m++)
          a = (0, n[m])(
            c
          ), a !== void 0 && e.finished.finally(a);
      (ga & 3) !== 0 && vs(), ya(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === rs ? Nu++ : (Nu = 0, rs = t) : (Nu = 0, rs = null), wu(0);
    }
  }
  function am(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, iu(t)));
  }
  function vs() {
    return _n !== null && (_n.skipTransition(), _n = null), Lr(), qr(), Br(), Yr();
  }
  function Yr() {
    if (Be !== 5) return !1;
    var e = ea, t = Mr;
    Mr = 0;
    var a = ks(ga), l = $.T, n = te.p;
    try {
      te.p = 32 > a ? 32 : a, $.T = null, a = Or, Or = null;
      var u = ea, c = ga;
      if (Be = 0, Bl = ea = null, ga = 0, (je & 6) !== 0) throw Error(o(331));
      var f = je;
      if (je |= 4, Gv(u.current), qv(
        u,
        u.current,
        c,
        a
      ), je = f, wu(0, !1), wt && typeof wt.onPostCommitFiberRoot == "function")
        try {
          wt.onPostCommitFiberRoot(Vn, u);
        } catch {
        }
      return !0;
    } finally {
      te.p = n, $.T = l, am(e, t);
    }
  }
  function lm(e, t, a) {
    t = Yt(a, t), t = lr(e.stateNode, t, 2), e = Ia(e, t, 2), e !== null && (Kn(e, 2), ya(e));
  }
  function we(e, t, a) {
    if (e.tag === 3)
      lm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          lm(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (il === null || !il.has(l))) {
            e = Yt(a, e), a = Pd(2), l = Ia(t, a, 2), l !== null && (ev(
              a,
              l,
              t,
              e
            ), Kn(l, 2), ya(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Gr(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new py();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (Dr = !0, n.add(a), e = wy.bind(null, e, t, a), t.then(e, e));
  }
  function wy(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ce === e && (ve & a) === a && ((Ge === 4 || Ge === 3 && (ve & 62914560) === ve && 300 > Nt() - is) && (je & 2) === 0 ? jn(e, 0) : us |= a, pn === ve && (pn = 0)), ya(e);
  }
  function nm(e, t) {
    t === 0 && (t = Qo()), e = jl(e, t), e !== null && (Kn(e, t), ya(e));
  }
  function Ey(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), nm(e, a);
  }
  function Ay(e, t) {
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
    l !== null && l.delete(t), nm(e, a);
  }
  function Cy(e, t) {
    return Vs(e, t);
  }
  var Nn = null, wn = null, Qr = !1, ms = !1, Xr = !1, cl = 0;
  function ya(e) {
    e !== wn && e.next === null && (wn === null ? Nn = wn = e : wn = wn.next = e), ms = !0, Qr || (Qr = !0, Dy());
  }
  function wu(e, t) {
    if (!Xr && ms) {
      Xr = !0;
      do
        for (var a = !1, l = Nn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - Et(42 | e) + 1) - 1, u &= n & ~(c & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, cm(l, u));
          } else
            u = ve, u = ui(
              l,
              l === Ce ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Zn(l, u) || (a = !0, cm(l, u));
          l = l.next;
        }
      while (a);
      Xr = !1;
    }
  }
  function zy() {
    um();
  }
  function um() {
    ms = Qr = !1;
    var e = 0;
    cl !== 0 && Qy() && (e = cl);
    for (var t = Nt(), a = null, l = Nn; l !== null; ) {
      var n = l.next, u = im(l, t);
      u === 0 ? (l.next = null, a === null ? Nn = n : a.next = n, n === null && (wn = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (ms = !0)), l = n;
    }
    Be !== 0 && Be !== 5 || wu(e), cl !== 0 && (cl = 0);
  }
  function im(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - Et(u), f = 1 << c, m = n[c];
      m === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[c] = kh(f, t)) : m <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = Ce, a = ve, a = ui(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (Ne === 2 || Ne === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Zs(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Zn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Zs(l), ks(a)) {
        case 2:
        case 8:
          a = Bo;
          break;
        case 32:
          a = ti;
          break;
        case 268435456:
          a = Yo;
          break;
        default:
          a = ti;
      }
      return l = sm.bind(null, e), a = Vs(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Zs(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function sm(e, t) {
    if (Be !== 0 && Be !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (vs() && e.callbackNode !== a)
      return null;
    var l = ve;
    return l = ui(
      e,
      e === Ce ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Kv(e, l, t), im(e, Nt()), e.callbackNode != null && e.callbackNode === a ? sm.bind(null, e) : null);
  }
  function cm(e, t) {
    if (vs()) return null;
    Kv(e, t, !0);
  }
  function Dy() {
    Vy(function() {
      (je & 6) !== 0 ? Vs(
        qo,
        zy
      ) : um();
    });
  }
  function Vr() {
    if (cl === 0) {
      var e = Cl;
      e === 0 && (e = ai, ai <<= 1, (ai & 261888) === 0 && (ai = 256)), cl = e;
    }
    return cl;
  }
  function rm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : oi(e);
  }
  function Ry(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = rm(
        (n[pt] || null).action
      ), c = l.submitter;
      c && (t = (t = c[pt] || null) ? rm(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var f = new mi(
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
  for (var Zr = 0; Zr < gc.length; Zr++) {
    var Kr = gc[Zr], My = Kr.toLowerCase(), Oy = Kr[0].toUpperCase() + Kr.slice(1);
    Ft(
      My,
      "on" + Oy
    );
  }
  Ft(Uf, "onAnimationEnd"), Ft(Hf, "onAnimationIteration"), Ft(Lf, "onAnimationStart"), Ft("dblclick", "onDoubleClick"), Ft("focusin", "onFocus"), Ft("focusout", "onBlur"), Ft(Xg, "onTransitionRun"), Ft(Vg, "onTransitionStart"), Ft(Zg, "onTransitionCancel"), Ft(qf, "onTransitionEnd"), Jl("onMouseEnter", ["mouseout", "mouseover"]), Jl("onMouseLeave", ["mouseout", "mouseover"]), Jl("onPointerEnter", ["pointerout", "pointerover"]), Jl("onPointerLeave", ["pointerout", "pointerover"]), Sl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Sl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Sl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Sl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Sl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Sl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Eu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Uy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Eu)
  );
  function om(e, t) {
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
              yi(C);
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
              yi(C);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function de(e, t) {
    var a = t[ko];
    a === void 0 && (a = t[ko] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (fm(t, e, 2, !1), a.add(l));
  }
  function Jr(e, t, a) {
    var l = 0;
    t && (l |= 4), fm(
      a,
      e,
      l,
      t
    );
  }
  var hs = "_reactListening" + Math.random().toString(36).slice(2);
  function kr(e) {
    if (!e[hs]) {
      e[hs] = !0, Wo.forEach(function(a) {
        a !== "selectionchange" && (Uy.has(a) || Jr(a, !1, e), Jr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[hs] || (t[hs] = !0, Jr("selectionchange", !1, t));
    }
  }
  function fm(e, t, a, l) {
    switch (eh(t)) {
      case 2:
        var n = E0;
        break;
      case 8:
        n = A0;
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
            if (c = _l(f), c === null) return;
            if (m = c.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              l = u = c;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l.return;
      }
    ff(function() {
      var x = u, C = ec(a), O = [];
      e: {
        var S = Bf.get(e);
        if (S !== void 0) {
          var A = mi, B = e;
          switch (e) {
            case "keypress":
              if (di(a) === 0) break e;
            case "keydown":
            case "keyup":
              A = _g;
              break;
            case "focusin":
              B = "focus", A = ic;
              break;
            case "focusout":
              B = "blur", A = ic;
              break;
            case "beforeblur":
            case "afterblur":
              A = ic;
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
              A = mf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = sg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = Tg;
              break;
            case Uf:
            case Hf:
            case Lf:
              A = og;
              break;
            case qf:
              A = wg;
              break;
            case "scroll":
            case "scrollend":
              A = ug;
              break;
            case "wheel":
              A = Ag;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = dg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = gf;
              break;
            case "submit":
              A = xg;
              break;
            case "toggle":
            case "beforetoggle":
              A = zg;
          }
          var J = (t & 4) !== 0, se = !J && (e === "scroll" || e === "scrollend"), b = J ? S !== null ? S + "Capture" : null : S;
          J = [];
          for (var g = x, N; g !== null; ) {
            var M = g;
            if (N = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || N === null || b === null || (M = $n(g, b), M != null && J.push(
              Au(g, M, N)
            )), se) break;
            g = g.return;
          }
          0 < J.length && (S = new A(
            S,
            B,
            null,
            a,
            C
          ), O.push({ event: S, listeners: J }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (A = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", A && a !== Ps && (B = a.relatedTarget || a.fromElement) && (_l(B) || B[Vl]))
            break e;
          (S || A) && (B = C.window === C ? C : (A = C.ownerDocument) ? A.defaultView || A.parentWindow : window, S ? (A = a.relatedTarget || a.toElement, S = x, A = A ? _l(A) : null, A !== null && (se = h(A), J = A.tag, A !== se || J !== 5 && J !== 27 && J !== 6) && (A = null)) : (S = null, A = x), S !== A && (J = mf, M = "onMouseLeave", b = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (J = gf, M = "onPointerLeave", b = "onPointerEnter", g = "pointer"), se = S == null ? B : kn(S), N = A == null ? B : kn(A), B = new J(
            M,
            g + "leave",
            S,
            a,
            C
          ), B.target = se, B.relatedTarget = N, M = null, _l(C) === x && (J = new J(
            b,
            g + "enter",
            A,
            a,
            C
          ), J.target = N, J.relatedTarget = se, M = J), se = M, J = S && A ? Oe(
            S,
            A,
            Hy
          ) : null, S !== null && dm(
            O,
            B,
            S,
            J,
            !1
          ), A !== null && se !== null && dm(
            O,
            se,
            A,
            J,
            !0
          )));
        }
        e: {
          if (S = x ? kn(x) : window, A = S.nodeName && S.nodeName.toLowerCase(), A === "select" || A === "input" && S.type === "file")
            var Z = Tf;
          else if (xf(S))
            if (Nf)
              Z = Yg;
            else {
              Z = qg;
              var me = Lg;
            }
          else
            A = S.nodeName, !A || A.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? x && Is(x.elementType) && (Z = Tf) : Z = Bg;
          if (Z && (Z = Z(e, x))) {
            jf(
              O,
              Z,
              a,
              C
            );
            break e;
          }
          me && me(e, S, x);
        }
        switch (me = x ? kn(x) : window, e) {
          case "focusin":
            (xf(me) || me.contentEditable === "true") && (Pl = me, vc = x, lu = null);
            break;
          case "focusout":
            lu = vc = Pl = null;
            break;
          case "mousedown":
            mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            mc = !1, Mf(O, a, C);
            break;
          case "selectionchange":
            if (Qg) break;
          case "keydown":
          case "keyup":
            Mf(O, a, C);
        }
        var F;
        if (cc)
          e: {
            switch (e) {
              case "compositionstart":
                var ee = "onCompositionStart";
                break e;
              case "compositionend":
                ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ee = "onCompositionUpdate";
                break e;
            }
            ee = void 0;
          }
        else
          Il ? Sf(e, a) && (ee = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ee = "onCompositionStart");
        ee && (yf && a.locale !== "ko" && (Il || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && Il && (F = df()) : (Xa = C, lc = "value" in Xa ? Xa.value : Xa.textContent, Il = !0)), me = gs(x, ee), 0 < me.length && (ee = new hf(
          ee,
          e,
          null,
          a,
          C
        ), O.push({ event: ee, listeners: me }), F ? ee.data = F : (F = bf(a), F !== null && (ee.data = F)))), (F = Rg ? Mg(e, a) : Og(e, a)) && (ee = gs(x, "onBeforeInput"), 0 < ee.length && (me = new hf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          C
        ), O.push({
          event: me,
          listeners: ee
        }), me.data = F)), Ry(
          O,
          e,
          x,
          a,
          C
        );
      }
      om(O, t);
    });
  }
  function Au(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function gs(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = $n(e, a), n != null && l.unshift(
        Au(e, n, u)
      ), n = $n(e, t), n != null && l.push(
        Au(e, n, u)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Hy(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function dm(e, t, a, l, n) {
    for (var u = t._reactName, c = []; a !== null && a !== l; ) {
      var f = a, m = f.alternate, x = f.stateNode;
      if (f = f.tag, m !== null && m === l) break;
      f !== 5 && f !== 26 && f !== 27 || x === null || (m = x, n ? (x = $n(a, u), x != null && c.unshift(
        Au(a, x, m)
      )) : n || (x = $n(a, u), x != null && c.push(
        Au(a, x, m)
      ))), a = a.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var Ly = /\r\n?/g, qy = /\u0000|\uFFFD/g;
  function vm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ly, `
`).replace(qy, "");
  }
  function mm(e, t) {
    return t = vm(t), vm(e) === t;
  }
  function Ee(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || $l(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && $l(e, "" + l);
        else return;
        break;
      case "className":
        ri(e, "class", l);
        break;
      case "tabIndex":
        ri(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ri(e, a, l);
        break;
      case "style":
        rf(e, l, u);
        return;
      case "data":
        if (t !== "object") {
          ri(e, "data", l);
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
        l = oi(l), e.setAttribute(a, l);
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
        l = oi(l), e.setAttribute(a, l);
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
        a = oi(l), e.setAttributeNS(
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
          a = lg.get(a) || a, ci(e, a, l);
        else return;
    }
    be = !0;
  }
  function Fr(e, t, a, l, n, u) {
    switch (a) {
      case "style":
        rf(e, l, u);
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
        if (typeof l == "string") $l(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          $l(e, "" + l);
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
        if (!Io.hasOwnProperty(a))
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
                  Ee(e, t, u, c, a, null);
              }
          }
        n && Ee(e, t, "srcSet", a.srcSet, a, null), l && Ee(e, t, "src", a.src, a, null);
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
                  Ee(e, t, l, C, a, null);
              }
          }
        nf(
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
                Ee(e, t, n, f, a, null);
            }
        t = u, a = c, e.multiple = !!l, t != null ? kl(e, !!l, t, !1) : a != null && kl(e, !!l, a, !0);
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
                Ee(e, t, c, f, a, null);
            }
        sf(e, l, n, u);
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
        de("beforetoggle", e), de("toggle", e), de("cancel", e), de("close", e);
        break;
      case "iframe":
      case "object":
        de("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Eu.length; l++)
          de(Eu[l], e);
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
                Ee(e, t, x, l, a, null);
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
      a.hasOwnProperty(f) && (l = a[f], l != null && Ee(e, t, f, l, a, null));
  }
  var By = {};
  function Yy(e, t, a, l) {
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
        for (A in a) {
          var O = a[A];
          if (a.hasOwnProperty(A) && O != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = O;
              default:
                l.hasOwnProperty(A) || Ee(e, t, A, null, l, O);
            }
        }
        for (var S in l) {
          var A = l[S];
          if (O = a[S], l.hasOwnProperty(S) && (A != null || O != null))
            switch (S) {
              case "type":
                A !== O && (be = !0), u = A;
                break;
              case "name":
                A !== O && (be = !0), n = A;
                break;
              case "checked":
                A !== O && (be = !0), x = A;
                break;
              case "defaultChecked":
                A !== O && (be = !0), C = A;
                break;
              case "value":
                A !== O && (be = !0), c = A;
                break;
              case "defaultValue":
                A !== O && (be = !0), f = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(o(137, t));
                break;
              default:
                A !== O && Ee(
                  e,
                  t,
                  S,
                  A,
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
        A = c = f = S = null;
        for (u in a)
          if (m = a[u], a.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                A = m;
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
                u !== m && (be = !0), S = u;
                break;
              case "defaultValue":
                u !== m && (be = !0), f = u;
                break;
              case "multiple":
                u !== m && (be = !0), c = u;
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
        t = f, a = c, l = A, S != null ? kl(e, !!a, S, !1) : !!l != !!a && (t != null ? kl(e, !!a, t, !0) : kl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        A = S = null;
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
                n !== u && (be = !0), S = n;
                break;
              case "defaultValue":
                n !== u && (be = !0), A = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ee(e, t, c, n, l, u);
            }
        uf(e, S, A);
        return;
      case "option":
        for (var B in a)
          if (S = a[B], a.hasOwnProperty(B) && S != null && !l.hasOwnProperty(B))
            switch (B) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ee(
                  e,
                  t,
                  B,
                  null,
                  l,
                  S
                );
            }
        for (m in l)
          if (S = l[m], A = a[m], l.hasOwnProperty(m) && S !== A && (S != null || A != null))
            switch (m) {
              case "selected":
                S !== A && (be = !0), e.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Ee(
                  e,
                  t,
                  m,
                  S,
                  l,
                  A
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
        for (var J in a)
          S = a[J], a.hasOwnProperty(J) && S != null && !l.hasOwnProperty(J) && Ee(e, t, J, null, l, S);
        for (x in l)
          if (S = l[x], A = a[x], l.hasOwnProperty(x) && S !== A && (S != null || A != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(o(137, t));
                break;
              default:
                Ee(
                  e,
                  t,
                  x,
                  S,
                  l,
                  A
                );
            }
        return;
      default:
        if (Is(t)) {
          for (var se in a)
            S = a[se], a.hasOwnProperty(se) && S !== void 0 && !l.hasOwnProperty(se) && Fr(
              e,
              t,
              se,
              void 0,
              l,
              S
            );
          for (C in l)
            S = l[C], A = a[C], !l.hasOwnProperty(C) || S === A || S === void 0 && A === void 0 || Fr(
              e,
              t,
              C,
              S,
              l,
              A
            );
          return;
        }
    }
    for (var b in a)
      S = a[b], a.hasOwnProperty(b) && S != null && !l.hasOwnProperty(b) && Ee(e, t, b, null, l, S);
    for (O in l)
      S = l[O], A = a[O], !l.hasOwnProperty(O) || S === A || S == null && A == null || Ee(e, t, O, S, l, A);
  }
  function hm(e) {
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
  function Gy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, c = n.initiatorType, f = n.duration;
        if (u && f && hm(c)) {
          for (c = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var m = a[l], x = m.startTime;
            if (x > f) break;
            var C = m.transferSize, O = m.initiatorType;
            C && hm(O) && (m = m.responseEnd, c += C * (m < f ? 1 : (f - x) / (m - x)));
          }
          if (--l, t += 8 * (u + c) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Wr = null, Ir = null;
  function Cu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function gm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ym(e, t) {
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
  function pm(e, t, a, l) {
    return a = Cu(
      a
    ).createElement(e), a[lt] = l, a[pt] = t, ct(a, e, t), Ie(a), a;
  }
  function Pr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var eo = null;
  function Qy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === eo ? !1 : (eo = e, !0) : (eo = null, !1);
  }
  var to = typeof setTimeout == "function" ? setTimeout : void 0, Xy = typeof clearTimeout == "function" ? clearTimeout : void 0, _m = typeof Promise == "function" ? Promise : void 0, Sm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : to, Vy = typeof queueMicrotask == "function" ? queueMicrotask : typeof _m < "u" ? function(e) {
    return _m.resolve(null).then(e).catch(Zy);
  } : to;
  function Zy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function rl(e) {
    return e === "head";
  }
  function bm(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), Mn(t);
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
            u[Jn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = c;
          }
        } else
          a === "body" && ro(e.ownerDocument.body);
      a = n;
    } while (a);
    Mn(t);
  }
  function xm(e, t) {
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
  function jm(e, t, a) {
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
  function Tm(e, t) {
    e = e.style, t = t.style;
    var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (a = t.display, e.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin, a != null ? e.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = a == null || typeof a == "boolean" ? "" : a, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Ky(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function ao(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Ky(t, a, e);
  }
  function Jy(e) {
    return e.documentElement.clientHeight;
  }
  function ky(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function $y(e, t, a, l, n, u, c, f, m) {
    var x = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var C = x.startViewTransition({
        update: function() {
          var S = x.defaultView, A = S.navigation && S.navigation.transition, B = x.fonts.status;
          l();
          var J = [];
          if (B === "loaded" && (Jy(x), x.fonts.status === "loading" && J.push(x.fonts.ready)), B = J.length, e !== null)
            for (var se = e.suspenseyImages, b = 0, g = 0; g < se.length; g++) {
              var N = se[g];
              if (!N.complete) {
                var M = N.getBoundingClientRect();
                if (0 < M.bottom && 0 < M.right && M.top < S.innerHeight && M.left < S.innerWidth) {
                  if (b += Zm(N), b > _s) {
                    J.length = B;
                    break;
                  }
                  N = new Promise(
                    ky.bind(N)
                  ), J.push(N);
                }
              }
            }
          if (0 < J.length)
            return S = Promise.race([
              Promise.all(J),
              new Promise(function(Z) {
                return setTimeout(Z, 500);
              })
            ]).then(n, n), (A ? Promise.allSettled([A.finished, S]) : S).then(u, u);
          if (n(), A)
            return A.finished.then(
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
          for (var S = x.documentElement.getAnimations({
            subtree: !0
          }), A = 0; A < S.length; A++) {
            var B = S[A], J = B.effect, se = J.pseudoElement;
            if (se != null && se.startsWith("::view-transition")) {
              O.push(B), B = J.getKeyframes();
              for (var b = se = void 0, g = !0, N = 0; N < B.length; N++) {
                var M = B[N], Z = M.width;
                if (se === void 0) se = Z;
                else if (se !== Z) {
                  g = !1;
                  break;
                }
                if (Z = M.height, b === void 0) b = Z;
                else if (b !== Z) {
                  g = !1;
                  break;
                }
                delete M.width, delete M.height, M.transform === "none" && delete M.transform;
              }
              g && se !== void 0 && b !== void 0 && (J.setKeyframes(B), g = getComputedStyle(
                J.target,
                J.pseudoElement
              ), g.width !== se || g.height !== b) && (g = B[0], g.width = se, g.height = b, g = B[B.length - 1], g.width = se, g.height = b, J.setKeyframes(B));
            }
          }
          c();
        },
        function(S) {
          x.__reactViewTransition === C && (x.__reactViewTransition = null);
          try {
            if (typeof S == "object" && S !== null)
              switch (S.name) {
                case "InvalidStateError":
                  (S.message === "View transition was skipped because document visibility state is hidden." || S.message === "Skipping view transition because document visibility state has become hidden." || S.message === "Skipping view transition because viewport size changed." || S.message === "Transition was aborted because of invalid state") && (S = null);
              }
            S !== null && m(S);
          } finally {
            l(), n(), c();
          }
        }
      ), C.finished.finally(function() {
        for (var S = 0; S < O.length; S++)
          O[S].cancel();
        x.__reactViewTransition === C && (x.__reactViewTransition = null), f();
      }), C;
    } catch {
      return l(), n(), c(), null;
    }
  }
  function Yl(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Yl.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : X({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Yl.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, Yl.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Nm(e) {
    return {
      name: e,
      group: new Yl("group", e),
      imagePair: new Yl("image-pair", e),
      old: new Yl("old", e),
      new: new Yl("new", e)
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
      if (Em(u, e, t, a) === -1) {
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
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = En(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), y(
          this._fragmentFiber.child,
          !1,
          Fy,
          e,
          f,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function Fy(e, t, a, l) {
    return Q(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Ut.prototype.removeEventListener = function(e, t, a) {
    var l = this._eventListeners;
    if (l !== null && (t = Em(
      l,
      e,
      t,
      a
    ), t !== -1)) {
      var n = l[t];
      a = n.attachedListener;
      var u = n.cleanup;
      n = En(n.optionsOrUseCapture), y(
        this._fragmentFiber.child,
        !1,
        Wy,
        e,
        a,
        n
      ), l.splice(t, 1), u !== null && u();
    }
  };
  function Wy(e, t, a, l) {
    return Q(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function En(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function wm(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Em(e, t, a, l) {
    if (e.length === 0) return -1;
    l = wm(l);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === a && wm(u.optionsOrUseCapture) === l)
        return n;
    }
    return -1;
  }
  Ut.prototype.dispatchEvent = function(e) {
    var t = z(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = Q(t);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (a)
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.addEventListener(
            u.type,
            u.attachedListener,
            En(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            En(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Ut.prototype.focus = function(e) {
    y(
      this._fragmentFiber.child,
      !0,
      Am,
      e,
      void 0,
      void 0
    );
  };
  function Am(e, t) {
    return e.tag === 6 ? !1 : (e = Q(e), r0(e, t));
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
    for (var a = t.length - 1; 0 <= a && !Am(t[a], e); a--) ;
  };
  function lo(e, t) {
    return t.push(e), !1;
  }
  Ut.prototype.blur = function() {
    var e = z(
      this._fragmentFiber
    );
    e !== null && (e = Q(e), e = Cu(e).activeElement, e !== null && y(
      this._fragmentFiber.child,
      !1,
      Iy,
      e,
      void 0,
      void 0
    ));
  };
  function Iy(e, t) {
    return e.tag === 6 ? !1 : (e = Q(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Ut.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(
      this._fragmentFiber.child,
      !1,
      Py,
      e,
      void 0,
      void 0
    );
  };
  function Py(e, t) {
    return e.tag === 6 || (e = Q(e), t.observe(e)), !1;
  }
  Ut.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), y(
        this._fragmentFiber.child,
        !1,
        e0,
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
  function e0(e, t) {
    return e.tag === 6 || (e = Q(e), t.unobserve(e)), !1;
  }
  var ta = [], no = !1;
  function t0(e, t, a) {
    ta.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), no || (no = !0, o0(function() {
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
      a0,
      e,
      void 0,
      void 0
    ), e;
  };
  function a0(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var a = e.ownerDocument.createRange();
      a.selectNodeContents(e), t.push.apply(t, a.getClientRects());
    } else
      e = Q(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Ut.prototype.getRootNode = function(e) {
    var t = z(
      this._fragmentFiber
    );
    return t === null ? this : Q(t).getRootNode(e);
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
    var l = Q(t);
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
      return a === e ? n = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = U(t)[1], a === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = Q(a).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = Q(a[0]), n = Q(a[a.length - 1]);
    var u = R(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), m = c & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && c & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || m || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || l0(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function l0(e, t, a, l, n) {
    var u = _l(n);
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
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === a) && (t = Oe(
      a,
      u,
      Le
    ), t === null ? t = !1 : (y(
      t,
      !0,
      K,
      u,
      a
    ), u = k, k = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === l) && (t = Oe(
      l,
      u,
      Le
    ), t === null ? t = !1 : (y(
      t,
      !0,
      re,
      u,
      l
    ), u = k, ne = k = null, t = u !== null)), t) : !1;
  }
  function Cm(e, t) {
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
        e = Q(l), Cm(e, a);
        return;
      }
      if (l = Q(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          a = "host" in l ? l.host : null, a !== null && a.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = a ? t.length - 1 : 0; l !== (a ? -1 : t.length); ) {
      var n = t[l];
      n.tag === 6 ? (n = Q(n), Cm(n, a)) : Q(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function n0(e, t) {
    return e = Q(e), zm(e, t), !1;
  }
  function zm(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Dm(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          En(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var c = 0, f = 0; f < ta.length; f++) {
        var m = ta[f];
        (m.fragmentInstance !== t || m.observer !== u || m.instance !== e) && (ta[c++] = m);
      }
      ta.length = c, u.observe(e);
    }), zm(e, t));
  }
  function u0(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          En(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      typeof u.rootMargin == "string" ? t0(
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
          uo(a), si(a);
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
  function i0(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Jn])
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
      if (e = Zt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function s0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Rm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function io(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function so(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function c0(e, t) {
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
  function Zt(e) {
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
  function Mm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Zt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Om(e) {
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
  function r0(e, t) {
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
  function o0(e) {
    Sm(function() {
      Sm(function(t) {
        return e(t);
      });
    });
  }
  function Um(e, t, a) {
    switch (t = Cu(a), e) {
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
  function Hm(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ee(e, t, l, null, By, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === sa && (e.onclick = null), si(e);
  }
  function ro(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    si(e);
  }
  var Kt = /* @__PURE__ */ new Map(), Lm = /* @__PURE__ */ new Set();
  function zu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ha = te.d;
  te.d = {
    f: f0,
    r: d0,
    D: v0,
    C: m0,
    L: h0,
    m: g0,
    X: p0,
    S: y0,
    M: _0
  };
  function f0() {
    var e = Ha.f(), t = os();
    return e || t;
  }
  function d0(e) {
    var t = Zl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Bd(t) : Ha.r(e);
  }
  var An = typeof document > "u" ? null : document;
  function qm(e, t, a) {
    var l = An;
    if (l && typeof t == "string" && t) {
      var n = qt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Lm.has(n) || (Lm.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), ct(t, "link", e), Ie(t), l.head.appendChild(t)));
    }
  }
  function v0(e) {
    Ha.D(e), qm("dns-prefetch", e, null);
  }
  function m0(e, t) {
    Ha.C(e, t), qm("preconnect", e, t);
  }
  function h0(e, t, a) {
    Ha.L(e, t, a);
    var l = An;
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
          u = Cn(e);
          break;
        case "script":
          u = zn(e);
      }
      if (!(Kt.has(u) || (e = X(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Kt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(Du(u)) || t === "script" && l.querySelector(Ru(u))))) {
        var c = l.createElement("link");
        ct(c, "link", e), t === "style" && (c[ii] = !0, c.onload = c.onerror = function() {
          Fo(c);
        }), Ie(c), l.head.appendChild(c);
      }
    }
  }
  function g0(e, t) {
    Ha.m(e, t);
    var a = An;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + qt(l) + '"][href="' + qt(e) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = zn(e);
      }
      if (!Kt.has(u) && (e = X({ rel: "modulepreload", href: e }, t), Kt.set(u, e), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ru(u)))
              return;
        }
        l = a.createElement("link"), ct(l, "link", e), Ie(l), a.head.appendChild(l);
      }
    }
  }
  function y0(e, t, a) {
    Ha.S(e, t, a);
    var l = An;
    if (l && e) {
      var n = Kl(l).hoistableStyles, u = Cn(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = l.querySelector(
          Du(u)
        ))
          f.loading = 5;
        else {
          e = X(
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
          }), f.loading |= 4, ys(c, t, l);
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
  function p0(e, t) {
    Ha.X(e, t);
    var a = An;
    if (a && e) {
      var l = Kl(a).hoistableScripts, n = zn(e), u = l.get(n);
      u || (u = a.querySelector(Ru(n)), u || (e = X({ src: e, async: !0 }, t), (t = Kt.get(n)) && fo(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function _0(e, t) {
    Ha.M(e, t);
    var a = An;
    if (a && e) {
      var l = Kl(a).hoistableScripts, n = zn(e), u = l.get(n);
      u || (u = a.querySelector(Ru(n)), u || (e = X({ src: e, async: !0, type: "module" }, t), (t = Kt.get(n)) && fo(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Bm(e, t, a, l) {
    var n = (n = Ya.current) ? zu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = Cn(a.href), t = Kl(
          n
        ).hoistableStyles, l = t.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Cn(a.href);
          var u = Kl(
            n
          ).hoistableStyles, c = u.get(e);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = n.querySelector(
            Du(e)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = Kt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Kt.set(e, u)), S0(
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
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = zn(a), t = Kl(
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
  function Cn(e) {
    return 'href="' + qt(e) + '"';
  }
  function Du(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ym(e) {
    return X({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function S0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[ii] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[ii] = !0, t.onload = t.onerror = Fo.bind(null, t), ct(t, "link", a), Ie(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function zn(e) {
    return '[src="' + qt(e) + '"]';
  }
  function Ru(e) {
    return "script[async]" + e;
  }
  function Gm(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + qt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Ie(l), l;
          var n = X({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ie(l), ct(l, "style", n), ys(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = Cn(a.href);
          var u = e.querySelector(
            Du(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ie(u), u;
          l = Ym(a), (n = Kt.get(n)) && oo(l, n), u = (e.ownerDocument || e).createElement("link"), Ie(u);
          var c = u;
          return c._p = new Promise(function(f, m) {
            c.onload = f, c.onerror = m;
          }), ct(u, "link", l), t.state.loading |= 4, ys(u, a.precedence, e), t.instance = u;
        case "script":
          return u = zn(a.src), (n = e.querySelector(
            Ru(u)
          )) ? (t.instance = n, Ie(n), n) : (l = a, (n = Kt.get(u)) && (l = X({}, a), fo(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ie(n), ct(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, ys(l, a.precedence, e));
    return t.instance;
  }
  function ys(e, t, a) {
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
  var ps = null;
  function Qm(e, t, a) {
    if (ps === null) {
      var l = /* @__PURE__ */ new Map(), n = ps = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = ps, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[Jn] || u[lt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
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
  function b0(e, t, a) {
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
  function Xm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function Vm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Zm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Km(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Zm(t), e.suspenseyImages.push(t)), e = T0.bind(e), t.decode().then(e, e));
  }
  function x0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = Cn(l.href), u = t.querySelector(
          Du(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Mu.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, Ie(u);
          return;
        }
        u = t.ownerDocument || t, l = Ym(l), (n = Kt.get(n)) && oo(l, n), u = u.createElement("link"), Ie(u);
        var c = u;
        c._p = new Promise(function(f, m) {
          c.onload = f, c.onerror = m;
        }), ct(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Mu.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var _s = 0;
  function j0(e, t) {
    return e.stylesheets && e.count === 0 && bs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && bs(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && _s === 0 && (_s = 62500 * Gy());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && bs(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > _s ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Jm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) bs(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Mu() {
    this.count--, Jm(this);
  }
  function T0() {
    this.imgCount--, Jm(this);
  }
  var Ss = null;
  function bs(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ss = /* @__PURE__ */ new Map(), t.forEach(N0, e), Ss = null, Mu.call(e));
  }
  function N0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Ss.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Ss.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), l = c);
        }
        l && a.set(null, l);
      }
      n = t.instance, c = n.getAttribute("data-precedence"), u = a.get(c) || l, u === l && a.set(null, n), a.set(c, n), this.count++, l = Mu.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Dn = {
    $$typeof: Me,
    Provider: null,
    Consumer: null,
    _currentValue: ba,
    _currentValue2: ba,
    _threadCount: 0
  };
  function w0(e, t, a, l, n, u, c, f, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ks(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ks(0), this.hiddenUpdates = Ks(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function km(e, t, a, l, n, u, c, f, m, x, C, O) {
    return e = new w0(
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
  function $m(e) {
    return e ? (e = an, e) : an;
  }
  function Fm(e, t, a, l, n, u) {
    n = $m(n), l.context === null ? l.context = n : l.pendingContext = n, l = Wa(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Ia(e, l, t), a !== null && (jt(a, e, t), ou(a, e, t));
  }
  function Wm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function mo(e, t) {
    Wm(e, t), (e = e.alternate) && Wm(e, t);
  }
  function Im(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = jl(e, 67108864);
      t !== null && jt(t, e, 67108864), mo(e, 67108864);
    }
  }
  function Pm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ot();
      t = Js(t);
      var a = jl(e, t);
      a !== null && jt(a, e, t), mo(e, t);
    }
  }
  var Rn = !0;
  function E0(e, t, a, l) {
    var n = $.T;
    $.T = null;
    var u = te.p;
    try {
      te.p = 2, ho(e, t, a, l);
    } finally {
      te.p = u, $.T = n;
    }
  }
  function A0(e, t, a, l) {
    var n = $.T;
    $.T = null;
    var u = te.p;
    try {
      te.p = 8, ho(e, t, a, l);
    } finally {
      te.p = u, $.T = n;
    }
  }
  function ho(e, t, a, l) {
    if (Rn) {
      var n = go(l);
      if (n === null)
        $r(
          e,
          t,
          l,
          xs,
          a
        ), th(e, l);
      else if (z0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (th(e, l), t & 4 && -1 < C0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Zl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = pl(u.pendingLanes);
                  if (c !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var m = 1 << 31 - Et(c);
                      f.entanglements[1] |= m, c &= ~m;
                    }
                    ya(u), (je & 6) === 0 && (ss = Nt() + 500, wu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = jl(u, 2), f !== null && jt(f, u, 2), os(), mo(u, 2);
            }
          if (u = go(l), u === null && $r(
            e,
            t,
            l,
            xs,
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
  var xs = null;
  function yo(e) {
    if (xs = null, e = _l(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = w(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return xs = e, null;
  }
  function eh(e) {
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
        switch (Gh()) {
          case qo:
            return 2;
          case Bo:
            return 8;
          case ti:
          case Qh:
            return 32;
          case Yo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var po = !1, ol = null, fl = null, dl = null, Ou = /* @__PURE__ */ new Map(), Uu = /* @__PURE__ */ new Map(), vl = [], C0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function th(e, t) {
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
        Ou.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Uu.delete(t.pointerId);
    }
  }
  function Hu(e, t, a, l, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Zl(t), t !== null && Im(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function z0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return ol = Hu(
          ol,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return fl = Hu(
          fl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return dl = Hu(
          dl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Ou.set(
          u,
          Hu(
            Ou.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Uu.set(
          u,
          Hu(
            Uu.get(u) || null,
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
  function ah(e) {
    var t = _l(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = p(a), t !== null) {
            e.blockedOn = t, Jo(e.priority, function() {
              Pm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = w(a), t !== null) {
            e.blockedOn = t, Jo(e.priority, function() {
              Pm(a);
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
  function js(e) {
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
        return t = Zl(a), t !== null && Im(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function lh(e, t, a) {
    js(e) && a.delete(t);
  }
  function D0() {
    po = !1, ol !== null && js(ol) && (ol = null), fl !== null && js(fl) && (fl = null), dl !== null && js(dl) && (dl = null), Ou.forEach(lh), Uu.forEach(lh);
  }
  function Ts(e, t) {
    e.blockedOn === t && (e.blockedOn = null, po || (po = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      D0
    )));
  }
  var Ns = null;
  function nh(e) {
    Ns !== e && (Ns = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        Ns === e && (Ns = null);
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
  function Mn(e) {
    function t(m) {
      return Ts(m, e);
    }
    ol !== null && Ts(ol, e), fl !== null && Ts(fl, e), dl !== null && Ts(dl, e), Ou.forEach(t), Uu.forEach(t);
    for (var a = 0; a < vl.length; a++) {
      var l = vl[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < vl.length && (a = vl[0], a.blockedOn === null); )
      ah(a), a.blockedOn === null && vl.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], c = n[pt] || null;
        if (typeof u == "function")
          c || nh(a);
        else if (c) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[pt] || null)
              f = c.formAction;
            else if (yo(n) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? a[l + 1] = f : (a.splice(l, 3), l -= 3), nh(a);
        }
      }
  }
  function uh() {
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
  ws.prototype.render = _o.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Ot();
    Fm(a, l, e, t, null, null);
  }, ws.prototype.unmount = _o.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Fm(e.current, 2, null, e, null, null), os(), t[Vl] = null;
    }
  };
  function ws(e) {
    this._internalRoot = e;
  }
  ws.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Ko();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < vl.length && t !== 0 && t < vl[a].priority; a++) ;
      vl.splice(a, 0, e), a === 0 && ah(e);
    }
  };
  var ih = r.version;
  if (ih !== "19.3.1")
    throw Error(
      o(
        527,
        ih,
        "19.3.1"
      )
    );
  te.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = D(t), e = e !== null ? j(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var R0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: $,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Es = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Es.isDisabled && Es.supportsFiber)
      try {
        Vn = Es.inject(
          R0
        ), wt = Es;
      } catch {
      }
  }
  return qu.createRoot = function(e, t) {
    if (!v(e)) throw Error(o(299));
    var a = !1, l = "", n = $d, u = Fd, c = Wd;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = km(
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
      uh
    ), e[Vl] = t.current, kr(e), new _o(t);
  }, qu.hydrateRoot = function(e, t, a) {
    if (!v(e)) throw Error(o(299));
    var l = !1, n = "", u = $d, c = Fd, f = Wd, m = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.formState !== void 0 && (m = a.formState)), t = km(
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
      uh
    ), t.context = $m(null), a = t.current, l = Ot(), l = Js(l), n = Wa(l), n.callback = null, Ia(a, n, l), a = l, t.current.lanes = a, Kn(t, a), ya(t), e[Vl] = t.current, kr(e), new ws(t);
  }, qu.version = "19.3.1", qu;
}
var gh;
function Q0() {
  if (gh) return bo.exports;
  gh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), bo.exports = G0(), bo.exports;
}
var X0 = Q0(), E = Mo();
const Ah = E.createContext(null);
function yh() {
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
function V0({ children: s }) {
  const [r, d] = E.useState(yh), o = E.useCallback(function() {
    d(yh());
  }, []), v = E.useCallback(
    async function(w) {
      await window.setActiveMasterContext(w), o();
    },
    [o]
  ), h = E.useCallback(
    function(w) {
      window.setThemeMode(w), o();
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
  const p = E.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        setThemeMode: h
      });
    },
    [r, o, v, h]
  );
  return /* @__PURE__ */ i.jsx(Ah.Provider, { value: p, children: s });
}
function ye() {
  const s = E.useContext(Ah);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const Z0 = "_button_fpxiy_7", K0 = "_primary_fpxiy_22", J0 = "_secondary_fpxiy_30", k0 = "_danger_fpxiy_39", $0 = "_spinner_fpxiy_52", F0 = "_labelLoading_fpxiy_61", On = {
  button: Z0,
  primary: K0,
  secondary: J0,
  danger: k0,
  spinner: $0,
  labelLoading: F0
};
function Y({
  variant: s = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...h
}) {
  var p = s === "secondary" ? On.secondary : s === "danger" ? On.danger : On.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [On.button, p, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...h,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: On.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? On.labelLoading : void 0, children: o })
      ]
    }
  );
}
const W0 = "_backdrop_13xfr_1", I0 = "_dialog_13xfr_12", P0 = "_header_13xfr_23", ep = "_title_13xfr_30", tp = "_closeBtn_13xfr_35", Un = {
  backdrop: W0,
  dialog: I0,
  header: P0,
  title: ep,
  closeBtn: tp
};
function Wu({ title: s, onClose: r, children: d }) {
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
      className: Un.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && r();
      },
      children: /* @__PURE__ */ i.jsxs("div", { className: Un.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ i.jsxs("div", { className: Un.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: Un.title, children: s }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: Un.closeBtn,
              onClick: r,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: Un.body, children: d })
      ] })
    }
  );
}
const ap = "_group_1wdnn_1", lp = "_label_1wdnn_8", np = "_input_1wdnn_14", up = "_error_1wdnn_32", Bu = {
  group: ap,
  label: lp,
  input: np,
  error: up
};
function ue({ label: s, error: r, multiline: d = !1, id: o, ...v }) {
  var h = o || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: Bu.group, children: [
    s ? /* @__PURE__ */ i.jsx("label", { className: Bu.label, htmlFor: h, children: s }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: h, className: Bu.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: h, className: Bu.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: Bu.error, children: r }) : null
  ] });
}
function la(s) {
  var r = s.table, d = s.select || "*", o = s.masterUsername, v = s.sort, h = s.enabled !== !1, [p, w] = E.useState([]), [T, D] = E.useState("loading"), [j, y] = E.useState(null), z = E.useRef(Math.random().toString(36).slice(2)).current, R = E.useCallback(
    async function() {
      if (!h || !o) {
        w([]), D("ready");
        return;
      }
      D("loading"), y(null);
      var U = window.supabase.from(r).select(d).eq("master_username", o), L = await U;
      if (L.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", L.error), y(L.error), D("error");
        return;
      }
      var Q = L.data || [];
      v && (Q = Q.slice().sort(v)), w(Q), D("ready");
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
            w(function(Q) {
              var k = Q;
              return L.eventType === "INSERT" ? k = [L.new].concat(Q) : L.eventType === "UPDATE" ? k = Q.map(function(ne) {
                return ne.id === L.old.id ? L.new : ne;
              }) : L.eventType === "DELETE" && (k = Q.filter(function(ne) {
                return ne.id !== L.old.id;
              })), v ? k.slice().sort(v) : k;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(U);
        };
      }
    },
    [r, o, h, R]
  ), { items: p, status: T, error: j, reload: R };
}
function ip(s, r) {
  return new Date(r.started_at) - new Date(s.started_at);
}
function Oo() {
  var s = ye(), r = la({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: ip
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
    startTracker: function(v, h, p, w, T, D) {
      return window.startLiveCostTracker(
        v,
        h,
        p,
        w,
        T,
        D
      ).then(function(j) {
        return r.reload(), j;
      });
    },
    stopTracker: function(v, h) {
      return window.stopLiveCostTracker(v, h !== !1).then(function(p) {
        return r.reload(), p;
      });
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v).then(function(h) {
        return r.reload(), h;
      });
    },
    addPenalty: function(v, h, p) {
      return window.addPenaltyToLiveTracker(v, h, p).then(function(w) {
        return r.reload(), w;
      });
    },
    removePenalty: function(v, h) {
      return window.removePenaltyFromLiveTracker(v, h).then(function(p) {
        return r.reload(), p;
      });
    }
  };
}
const sp = "_card_1j746_1", cp = "_raised_1j746_8", ph = {
  card: sp,
  raised: cp
};
function ge({ raised: s = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [s ? ph.raised : ph.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const rp = "_card_b5s19_1", op = "_description_b5s19_9", fp = "_meta_b5s19_19", dp = "_readout_b5s19_31", vp = "_amount_b5s19_47", mp = "_penaltyList_b5s19_55", hp = "_removePenalty_b5s19_71", gp = "_penaltyForm_b5s19_87", yp = "_stopActions_b5s19_103", pa = {
  card: rp,
  description: op,
  meta: fp,
  readout: dp,
  amount: vp,
  penaltyList: mp,
  removePenalty: hp,
  penaltyForm: gp,
  stopActions: yp
};
function pp(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function _p(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, h = d / o * v, p = [];
  try {
    p = JSON.parse(s.penalties || "[]");
  } catch {
    p = [];
  }
  var w = p.reduce(function(z, R) {
    return z + (parseFloat(R.amount) || 0);
  }, 0), T = Math.floor(d / 36e5), D = Math.floor(d % 36e5 / 6e4), j = Math.floor(d % 6e4 / 1e3), y = String(T).padStart(2, "0") + ":" + String(D).padStart(2, "0") + ":" + String(j).padStart(2, "0");
  return {
    timeText: y,
    penalties: p,
    penaltyTotal: w,
    grandTotal: h + w
  };
}
function Hs({ tracker: s, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: h }) {
  var [p, w] = E.useState(Date.now()), [T, D] = E.useState(""), [j, y] = E.useState("");
  E.useEffect(function() {
    var L = window.setInterval(function() {
      w(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(L);
    };
  }, []);
  var z = _p(s, p), R = window.users[s.created_by], U = (s.assigned_to || []).map(function(L) {
    var Q = window.users[L];
    return Q ? Q.displayName : L;
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
      pp(parseInt(s.increment_interval))
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
            value: T,
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
            value: j,
            onChange: function(L) {
              y(L.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          Y,
          {
            variant: "secondary",
            disabled: !T.trim() || !j,
            onClick: function() {
              v(s.id, T, Number(j)), D(""), y("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: pa.stopActions, children: [
        /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
          d(s.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          d(s.id, !1);
        }, children: "Stop (no invoice)" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          o(s.id);
        }, children: "Delete" })
      ] })
    ] }) : null
  ] });
}
const Sp = "_pill_wktg6_1", bp = {
  pill: Sp
};
function xp(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, h = d / o * v, p = [];
  try {
    p = JSON.parse(s.penalties || "[]");
  } catch {
    p = [];
  }
  var w = p.reduce(function(j, y) {
    return j + (parseFloat(y.amount) || 0);
  }, 0), T = Math.floor(d / 6e4), D = Math.floor(d % 6e4 / 1e3);
  return {
    timeText: String(T).padStart(2, "0") + ":" + String(D).padStart(2, "0"),
    total: h + w
  };
}
function jp() {
  var s = ye(), r = Oo(), [d, o] = E.useState(Date.now()), [v, h] = E.useState(!1), p = r.trackers.find(function(D) {
    return Array.isArray(D.assigned_to) && D.assigned_to.includes(s.currentUser);
  }), w = p ? p.id : null;
  if (E.useEffect(
    function() {
      if (w) {
        var D = window.setInterval(function() {
          o(Date.now());
        }, 1e3);
        return function() {
          window.clearInterval(D);
        };
      }
    },
    [w]
  ), !s.isSlave || !p) return null;
  var T = xp(p, d);
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: bp.pill,
        onClick: function() {
          h(!0);
        },
        children: [
          "💰 ",
          T.timeText,
          " · ",
          p.currency,
          T.total.toFixed(2)
        ]
      }
    ),
    v ? /* @__PURE__ */ i.jsx(
      Wu,
      {
        title: "Active Cost Tracker",
        onClose: function() {
          h(!1);
        },
        children: /* @__PURE__ */ i.jsx(Hs, { tracker: p, isAdmin: !1 })
      }
    ) : null
  ] });
}
function Tp(s, r) {
  return s.position - r.position;
}
function Ch() {
  var s = ye(), r = s.activeMasterContext, d = la({
    table: "motd_messages",
    masterUsername: r,
    sort: Tp
  }), o = la({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, h = o.items[0], p = h ? h.current_index : 0, w = v.length > 0 ? v[p % v.length] : null;
  function T() {
    d.reload(), o.reload();
  }
  return {
    messages: v,
    currentMessage: w,
    status: d.status,
    error: d.error,
    reload: T,
    // Each mutation reloads afterward rather than waiting on the realtime
    // subscription: this Supabase project's motd_messages/motd_state
    // tables aren't in the realtime publication (confirmed empty, a
    // dashboard setting -- see src/beta/README.md's "Hybrid data flow"
    // section), so without this an admin's own edit never showed up in
    // their own list until something else triggered a refetch.
    addMessage: async function(D) {
      await window.addMotdMessage({ body: D }), T();
    },
    deleteMessage: async function(D) {
      await window.deleteMotdMessage(D), T();
    },
    moveUp: async function(D) {
      await window.moveMotdMessageUp(D), T();
    },
    moveDown: async function(D) {
      await window.moveMotdMessageDown(D), T();
    }
  };
}
const Np = "_banner_whiaq_1", wp = {
  banner: Np
};
function Ep() {
  var s = ye(), r = Ch();
  return !s.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: wp.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
const Ap = "_header_1f0gy_1", Cp = "_title_1f0gy_23", zp = "_subtitle_1f0gy_33", Dp = "_right_1f0gy_45", Rp = "_groupSelect_1f0gy_59", Mp = "_userBadge_1f0gy_77", Op = "_points_1f0gy_85", Up = "_statusBtn_1f0gy_97", La = {
  header: Ap,
  title: Cp,
  subtitle: zp,
  right: Dp,
  groupSelect: Rp,
  userBadge: Mp,
  points: Op,
  statusBtn: Up
};
function Hp() {
  var s = ye(), r = window.users[s.currentUser] || {}, [d, o] = E.useState(!1), [v, h] = E.useState(s.statusMessage), [p, w] = E.useState(!1);
  function T() {
    s.setThemeMode(s.themeMode === "light" ? "dark" : "light");
  }
  function D() {
    window.logout();
  }
  function j() {
    h(s.statusMessage), o(!0);
  }
  async function y(z) {
    z.preventDefault(), w(!0);
    try {
      await window.updateMyStatusMessage(v), s.refresh(), o(!1);
    } finally {
      w(!1);
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
      /* @__PURE__ */ i.jsx(jp, {}),
      /* @__PURE__ */ i.jsxs(
        Y,
        {
          variant: "secondary",
          className: La.statusBtn,
          onClick: j,
          title: s.statusMessage || "Set a status message",
          children: [
            "✏️ ",
            s.statusMessage || "Status"
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: T, children: s.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode" }),
      s.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: La.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: D, children: "Logout" })
    ] }),
    /* @__PURE__ */ i.jsx(Ep, {}),
    d ? /* @__PURE__ */ i.jsx(Wu, { title: "Set Status Message", onClose: function() {
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
      /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: p, children: "Save" })
    ] }) }) : null
  ] });
}
const Lp = "_nav_c0zce_1", qp = "_tab_c0zce_10", Bp = "_tabActive_c0zce_11", wo = {
  nav: Lp,
  tab: qp,
  tabActive: Bp
};
function Yp({ activeTab: s, onChange: r }) {
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
function Gp(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Ls() {
  var s = ye(), r = la({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: Gp
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
function Qp() {
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
function Qn() {
  var s = ye(), r = s.activeMasterContext, [d, o] = E.useState([]), [v, h] = E.useState("loading"), [p, w] = E.useState(null), T = E.useRef(Math.random().toString(36).slice(2)).current, D = E.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), w(null);
      var y = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (y.error) {
        w(y.error), h("error");
        return;
      }
      var z = (y.data || []).map(function(K) {
        return K.slave_username;
      }), R = { data: [] }, U = { data: [] };
      z.length > 0 && (R = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), U = await window.supabase.from("users").select("username, display_name, status_message").in("username", z));
      var L = {};
      (R.data || []).forEach(function(K) {
        L[K.username] = K.points || 0;
      });
      var Q = {}, k = {};
      (U.data || []).forEach(function(K) {
        Q[K.username] = K.display_name || K.username, k[K.username] = K.status_message || "";
      });
      var ne = (y.data || []).map(function(K) {
        return {
          username: K.slave_username,
          displayName: Q[K.slave_username] || K.slave_username,
          statusMessage: k[K.slave_username] || "",
          points: L[K.slave_username] || 0,
          status: K.status
        };
      });
      o(ne), h("ready");
    },
    [r]
  );
  E.useEffect(
    function() {
      if (D(), !!r) {
        var y = window.supabase.channel("beta_slave_roster_" + r + "_" + T).on(
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
  var j = d.filter(function(y) {
    return y.status === "active";
  });
  return {
    slaves: j,
    allSlaves: d,
    status: v,
    error: p,
    reload: D
  };
}
const Xp = "_heading_1bkor_1", Vp = "_row_1bkor_11", Zp = "_checkboxRow_1bkor_31", Kp = "_select_1bkor_47", Jp = "_fieldset_1bkor_69", kp = "_hint_1bkor_83", qa = {
  heading: Xp,
  row: Vp,
  checkboxRow: Zp,
  select: Kp,
  fieldset: Jp,
  hint: kp
};
var _h = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function $p({ onCreated: s }) {
  var r = ye(), d = Qn(), [o, v] = E.useState(_h), [h, p] = E.useState([]), [w, T] = E.useState(!1);
  function D(z, R) {
    v(function(U) {
      return Object.assign({}, U, { [z]: R });
    });
  }
  function j(z) {
    p(function(R) {
      return R.includes(z) ? R.filter(function(U) {
        return U !== z;
      }) : R.concat(z);
    });
  }
  async function y(z) {
    if (z.preventDefault(), !!o.text.trim()) {
      T(!0);
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
        }), v(_h), p([]), s && s();
      } finally {
        T(!1);
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
                  j(z.username);
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
      /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: w, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const Fp = "_wrap_1qfmw_1", Wp = "_spinner_1qfmw_10", Sh = {
  wrap: Fp,
  spinner: Wp
};
function $t({ label: s = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Sh.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: Sh.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: s })
  ] });
}
const Ip = "_wrap_buujm_1", Pp = "_message_buujm_9", bh = {
  wrap: Ip,
  message: Pp
};
function na({ message: s = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: bh.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: bh.message, children: s }),
    r ? /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const e1 = "_wrap_mx4zv_1", t1 = "_icon_mx4zv_7", a1 = "_title_mx4zv_12", l1 = "_hint_mx4zv_18", As = {
  wrap: e1,
  icon: t1,
  title: a1,
  hint: l1
};
function He({ icon: s = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: As.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: As.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ i.jsx("p", { className: As.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: As.hint, children: d }) : null
  ] });
}
const n1 = "_badge_1988s_1", u1 = "_neutral_1988s_10", i1 = "_success_1988s_15", s1 = "_warning_1988s_20", c1 = "_danger_1988s_25", Yu = {
  badge: n1,
  neutral: u1,
  success: i1,
  warning: s1,
  danger: c1
};
function Lt({ tone: s = "neutral", children: r }) {
  var d = s === "success" ? Yu.success : s === "warning" ? Yu.warning : s === "danger" ? Yu.danger : Yu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [Yu.badge, d].join(" "), children: r });
}
var Uo = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function r1(s, r, d, o) {
  return Object.assign(
    {
      id: s,
      x: r / 2,
      y: d / 2
    },
    Uo,
    {}
  );
}
function o1(s, r, d) {
  var o = Math.min(s.canvas.width, s.canvas.height), v = r.radiusPercent / 100 * o * 2, h = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  s.save(), s.translate(r.x, r.y), s.rotate(r.rotation * Math.PI / 180 + h * 0.5), s.strokeStyle = r.color, s.lineWidth = r.thickness, s.globalAlpha = r.opacity, s.lineCap = "round", s.lineJoin = "round";
  for (var p = 0; p < r.arms; p++) {
    s.save(), s.rotate(p * 2 * Math.PI / r.arms), s.beginPath();
    for (var w = !0, T = 0; T < v; T += 0.5) {
      var D = T * 0.08 + h, j = T * Math.cos(D), y = T * Math.sin(D);
      w ? (s.moveTo(j, y), w = !1) : s.lineTo(j, y);
    }
    s.stroke(), s.restore();
  }
  s.restore();
}
const f1 = "_canvas_1y7at_1", d1 = {
  canvas: f1
};
function zh({ canvasRef: s, spiralsRef: r, backgroundColor: d }) {
  var o = E.useRef(d);
  return E.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), E.useEffect(function() {
    var v = s.current, h = v.getContext("2d");
    function p() {
      var D = v.parentElement;
      v.width = D.clientWidth, v.height = D.clientHeight, r.current.forEach(function(j) {
        j.x = v.width / 2, j.y = v.height / 2;
      });
    }
    var w = new ResizeObserver(p);
    w.observe(v.parentElement), p();
    var T = requestAnimationFrame(function D(j) {
      T = requestAnimationFrame(D), h.fillStyle = o.current, h.fillRect(0, 0, v.width, v.height), r.current.forEach(function(y) {
        o1(h, y, j);
      });
    });
    return function() {
      cancelAnimationFrame(T), w.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: s, className: d1.canvas });
}
const v1 = "_overlay_qasw4_1", m1 = {
  overlay: v1
};
function Dh({ display: s, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: m1.overlay,
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
var h1 = [
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
function g1(s) {
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
function Rh(s) {
  var r = s || {}, [d, o] = E.useState(r.script || h1), [v, h] = E.useState(r.interval || 2e3), [p, w] = E.useState(r.holdDuration || 3e3), [T, D] = E.useState(r.animSpeed || 0.5), [j, y] = E.useState(r.fontSize || 2.5), [z, R] = E.useState(r.color || "#ffffff"), [U, L] = E.useState(!1), [Q, k] = E.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), ne = E.useRef(null), K = E.useRef(0), re = E.useRef([]), Le = E.useRef(!1), Oe = E.useRef(p), X = E.useRef(T);
  E.useEffect(function() {
    Oe.current = p;
  }, [p]), E.useEffect(function() {
    X.current = T;
  }, [T]);
  function le(P) {
    k({ text: P, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        k({ text: P, shown: !0, instant: !1 });
      });
    });
  }
  function Qe() {
    k(function(P) {
      return { text: P.text, shown: !1, instant: !1 };
    });
  }
  function qe() {
    if (!Le.current) {
      Qe();
      return;
    }
    K.current >= re.current.length && (K.current = 0);
    var P = re.current[K.current];
    if (P)
      if (P.type === "text") {
        setTimeout(function() {
          le(P.value);
        }, 50), K.current++;
        var Xe = X.current * 1e3, Me = Xe + Oe.current + Xe + 50;
        ne.current = setTimeout(qe, Me);
      } else
        Qe(), K.current++, ne.current = setTimeout(qe, P.value);
  }
  function We() {
    ne.current && clearTimeout(ne.current), re.current = g1(d), K.current = 0, Le.current = !0, L(!0), qe();
  }
  function $e() {
    Le.current = !1, L(!1), ne.current && clearTimeout(ne.current), k({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return E.useEffect(function() {
    return function() {
      Le.current = !1, ne.current && clearTimeout(ne.current);
    };
  }, []), {
    display: Q,
    script: d,
    setScript: o,
    interval: v,
    setInterval: h,
    holdDuration: p,
    setHoldDuration: w,
    animSpeed: T,
    setAnimSpeed: D,
    fontSize: j,
    setFontSize: y,
    color: z,
    setColor: R,
    isRunning: U,
    startLoop: We,
    stopLoop: $e
  };
}
const y1 = "_overlay_1ka14_1", p1 = "_closeBtn_1ka14_19", _1 = "_viewer_1ka14_51", S1 = "_canvasArea_1ka14_63", gl = {
  overlay: y1,
  closeBtn: p1,
  viewer: _1,
  canvasArea: S1
};
function b1({ config: s, onClose: r }) {
  var d = E.useRef(null), o = E.useRef(
    (s && s.spirals || []).map(function(w) {
      return Object.assign({ x: 0, y: 0 }, Uo, w);
    })
  ), v = s && s.textSettings || {}, h = s && s.globalSettings && s.globalSettings.backgroundColor || "#000000", p = Rh(v);
  return E.useEffect(function() {
    p.startLoop();
    function w(T) {
      T.key === "Escape" && r();
    }
    return document.addEventListener("keydown", w), function() {
      p.stopLoop(), document.removeEventListener("keydown", w);
    };
  }, []), /* @__PURE__ */ i.jsxs("div", { className: gl.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: gl.closeBtn, onClick: r, "aria-label": "Close spiral viewer", children: "×" }),
    /* @__PURE__ */ i.jsx("div", { className: gl.viewer, children: /* @__PURE__ */ i.jsxs("div", { className: gl.canvasArea, children: [
      /* @__PURE__ */ i.jsx(zh, { canvasRef: d, spiralsRef: o, backgroundColor: h }),
      /* @__PURE__ */ i.jsx(
        Dh,
        {
          display: p.display,
          animSpeed: p.animSpeed,
          fontSize: p.fontSize,
          color: p.color
        }
      )
    ] }) })
  ] });
}
function Mh(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function x1(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const j1 = "_item_v1inl_1", T1 = "_header_v1inl_5", N1 = "_text_v1inl_11", w1 = "_meta_v1inl_16", E1 = "_appealText_v1inl_33", A1 = "_actions_v1inl_41", Hn = {
  item: j1,
  header: T1,
  text: N1,
  meta: w1,
  appealText: E1,
  actions: A1
};
function C1({ task: s, actions: r }) {
  var d = ye(), [o, v] = E.useState(!1), h = window.users[s.assignedTo], p = s.type === "cost-tracker", w = s.type === "spiral", T = p ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ i.jsxs(ge, { className: Hn.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Hn.header, children: [
      /* @__PURE__ */ i.jsx(Lt, { tone: x1(s), children: Mh(s) }),
      s.type === "demerit" ? /* @__PURE__ */ i.jsx(Lt, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Hn.text, children: p ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: Hn.meta, children: [
      s.assignedTo ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ i.jsx("dd", { children: h ? h.displayName : s.assignedTo })
      ] }) : /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assignment" }),
        /* @__PURE__ */ i.jsx("dd", { children: "Shared" })
      ] }),
      !p && s.points ? /* @__PURE__ */ i.jsxs("div", { children: [
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
      p && T ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ i.jsx("dd", { children: T })
      ] }) : null,
      s.dueDate ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ i.jsx("dd", { children: window.formatDate(s.dueDate) })
      ] }) : null
    ] }),
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Hn.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Hn.actions, children: [
      w && s.spiralConfig ? /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
        v(!0);
      }, children: "▶️ View Spiral" }) : null,
      d.isSlave && !p && s.type !== "demerit" && s.assignedTo === d.currentUser && s.status === "todo" ? /* @__PURE__ */ i.jsx(Y, { onClick: function() {
        r.checkOffTask(s.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && s.type === "demerit" && s.status === "demerit_issued" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Y, { onClick: function() {
          r.acceptDemerit(s.id);
        }, children: "Accept" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          r.appealDemerit(s.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && p && s.status === "todo" ? /* @__PURE__ */ i.jsx(Y, { onClick: function() {
        r.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && s.status === "pending_approval" && p ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Y, { onClick: function() {
          r.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && s.status === "pending_approval" && !p ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Y, { onClick: function() {
          r.approveTask(s.id);
        }, children: "Approve" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && s.type === "demerit" && s.appealStatus === "pending" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(Y, { onClick: function() {
          r.approveAppeal(s.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
          r.denyAppeal(s.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
        r.deleteTask(s.id);
      }, children: "Delete" }) : null
    ] }),
    o ? /* @__PURE__ */ i.jsx(
      b1,
      {
        config: s.spiralConfig,
        onClose: function() {
          v(!1);
        }
      }
    ) : null
  ] });
}
function Cs({ tasks: s, status: r, error: d, onRetry: o, actions: v, emptyLabel: h }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    na,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : s.length === 0 ? /* @__PURE__ */ i.jsx(He, { icon: "✓", title: h || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: s.map(function(p) {
    return /* @__PURE__ */ i.jsx(C1, { task: p, actions: v }, p.id);
  }) });
}
const z1 = "_section_7c868_1", D1 = "_heading_7c868_5", Ln = {
  section: z1,
  heading: D1
};
function R1() {
  var s = ye(), r = Ls(), d = Qp(), o = {
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
    var v = r.tasks.filter(function(w) {
      return w.assignedTo === s.currentUser || d.includes(w.id);
    });
    return /* @__PURE__ */ i.jsx(
      Cs,
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
  var h = r.tasks.filter(function(w) {
    return w.type === "demerit" && w.appealStatus === "pending";
  }), p = r.tasks.filter(function(w) {
    return w.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx($p, { onCreated: r.reload }),
    h.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Ln.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Ln.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ i.jsx(
        Cs,
        {
          tasks: h,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    p.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Ln.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Ln.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        Cs,
        {
          tasks: p,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(ge, { className: Ln.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Ln.heading, children: "All Tasks" }),
      /* @__PURE__ */ i.jsx(
        Cs,
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
const M1 = "_calendarContainer_1n2ar_1", O1 = "_detail_1n2ar_13", U1 = "_detailRow_1n2ar_25", Tt = {
  calendarContainer: M1,
  detail: O1,
  detailRow: U1
};
function H1(s) {
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
function L1({ task: s }) {
  var r = s.dueDate ? window.formatDate(s.dueDate) : "N/A", d = s.endDateTime ? window.formatDate(s.endDateTime) : null, o = s.dueDate && s.dueDate.length === 10, v = s.createdBy && window.users[s.createdBy] ? window.users[s.createdBy].displayName : s.createdBy, h = s.completedBy && window.users[s.completedBy] ? window.users[s.completedBy].displayName : s.completedBy, p = s.approvedBy && window.users[s.approvedBy] ? window.users[s.approvedBy].displayName : s.approvedBy;
  return /* @__PURE__ */ i.jsxs("div", { className: Tt.detail, children: [
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Type:" }),
      " ",
      s.isRepeating ? "Repeating Task" : "One-time Task"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Status:" }),
      " ",
      Mh(s)
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
      p
    ] }) : null,
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal Reason:" }),
      " ",
      s.appealText
    ] }) : null
  ] });
}
function q1() {
  var s = ye(), r = Ls(), d = E.useRef(null), o = E.useRef(null), [v, h] = E.useState(null), p = E.useMemo(
    function() {
      return r.tasks.filter(function(T) {
        return !T || !T.dueDate ? !1 : s.isSlave ? T.assignedTo === s.currentUser || (window.mySharedTaskIds || []).includes(T.id) : !0;
      });
    },
    [r.tasks, s.isSlave, s.currentUser]
  ), w = E.useMemo(function() {
    return H1(p);
  }, [p]);
  return E.useEffect(
    function() {
      if (!(!d.current || typeof window.FullCalendar > "u")) {
        var T = new window.FullCalendar.Calendar(d.current, {
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
        return T.render(), o.current = T, function() {
          T.destroy(), o.current = null;
        };
      }
    },
    []
  ), E.useEffect(
    function() {
      var T = o.current;
      T && (T.removeAllEventSources(), T.addEventSource(w));
    },
    [w]
  ), /* @__PURE__ */ i.jsxs("div", { children: [
    r.status === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading tasks..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(na, { message: r.error ? r.error.message : "", onRetry: r.reload }) : null,
    /* @__PURE__ */ i.jsx("div", { ref: d, className: Tt.calendarContainer }),
    v ? /* @__PURE__ */ i.jsx(Wu, { title: v.text, onClose: function() {
      h(null);
    }, children: /* @__PURE__ */ i.jsx(L1, { task: v }) }) : null
  ] });
}
function B1(s, r) {
  return new Date(r.timestamp) - new Date(s.timestamp);
}
function Oh() {
  var s = ye(), r = la({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: B1
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const Y1 = "_row_qtrye_1", G1 = "_tile_qtrye_8", Q1 = "_number_qtrye_12", X1 = "_label_qtrye_17", zs = {
  row: Y1,
  tile: G1,
  number: Q1,
  label: X1
};
function V1({ stats: s }) {
  return /* @__PURE__ */ i.jsx("div", { className: zs.row, children: s.map(function(r) {
    return /* @__PURE__ */ i.jsxs(ge, { className: zs.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: zs.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: zs.label, children: r.label })
    ] }, r.label);
  }) });
}
const Z1 = "_list_azyhi_1", K1 = "_row_azyhi_7", J1 = "_positive_azyhi_13", k1 = "_zero_azyhi_18", $1 = "_negative_azyhi_23", Fu = {
  list: Z1,
  row: K1,
  positive: J1,
  zero: k1,
  negative: $1
};
function F1(s) {
  return s < 0 ? Fu.negative : s === 0 ? Fu.zero : Fu.positive;
}
function W1({ slaves: s }) {
  var r = ye();
  return s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: Fu.list, children: s.map(function(d) {
    return /* @__PURE__ */ i.jsxs(ge, { className: Fu.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: F1(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const I1 = "_heading_1mu37_1", P1 = "_form_1mu37_6", e_ = "_select_1mu37_13", Eo = {
  heading: I1,
  form: P1,
  select: e_
};
function t_({ slaves: s }) {
  var r = ye(), [d, o] = E.useState(s[0] ? s[0].username : ""), [v, h] = E.useState(0);
  E.useEffect(
    function() {
      var w = s.find(function(T) {
        return T.username === d;
      });
      w ? h(w.points) : s[0] && o(s[0].username);
    },
    [s, d]
  );
  async function p(w) {
    if (w.preventDefault(), !!d) {
      var T = s.find(function(j) {
        return j.username === d;
      }), D = T ? T.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (T ? T.displayName : d) + " points changed from " + D + " to " + (Number(v) || 0),
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
    /* @__PURE__ */ i.jsxs("form", { className: Eo.form, onSubmit: p, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: Eo.select,
          value: d,
          onChange: function(w) {
            o(w.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: s.map(function(w) {
            return /* @__PURE__ */ i.jsx("option", { value: w.username, children: w.displayName }, w.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(w) {
            h(w.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Y, { type: "submit", children: "Set" })
    ] })
  ] });
}
const a_ = "_filters_2lis3_1", l_ = "_filterSelect_2lis3_15", n_ = "_list_2lis3_35", u_ = "_item_2lis3_53", i_ = "_user_2lis3_65", s_ = "_details_2lis3_73", c_ = "_time_2lis3_81", Ba = {
  filters: a_,
  filterSelect: l_,
  list: n_,
  item: u_,
  user: i_,
  details: s_,
  time: c_
};
var r_ = [
  { value: "login", label: "Login" },
  { value: "logout", label: "Logout" },
  { value: "tasks", label: "Tasks" },
  { value: "suggestions", label: "Suggestions" },
  { value: "rewards", label: "Rewards & Shop" },
  { value: "cost_trackers", label: "Cost Trackers" },
  { value: "other", label: "Other" }
];
function o_(s) {
  return s === "login" ? "login" : s === "logout" ? "logout" : /suggestion/i.test(s) ? "suggestions" : /reward|purchase/i.test(s) ? "rewards" : /cost tracker/i.test(s) ? "cost_trackers" : /task|demerit|appeal|invoice/i.test(s) ? "tasks" : "other";
}
function f_({ activity: s, status: r, error: d, onRetry: o }) {
  var [v, h] = E.useState(""), [p, w] = E.useState(""), T = E.useMemo(
    function() {
      var j = {}, y = [];
      return s.forEach(function(z) {
        if (!j[z.user]) {
          j[z.user] = !0;
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
      return s.filter(function(j) {
        return !(v && j.user !== v || p && o_(j.action) !== p);
      });
    },
    [s, v, p]
  );
  return r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "", onRetry: o }) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ba.filters, children: [
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ba.filterSelect,
          value: v,
          onChange: function(j) {
            h(j.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All users" }),
            T.map(function(j) {
              return /* @__PURE__ */ i.jsx("option", { value: j.value, children: j.label }, j.value);
            })
          ]
        }
      ),
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ba.filterSelect,
          value: p,
          onChange: function(j) {
            w(j.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All activity" }),
            r_.map(function(j) {
              return /* @__PURE__ */ i.jsx("option", { value: j.value, children: j.label }, j.value);
            })
          ]
        }
      )
    ] }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No recent activity" }) : D.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No activity matches those filters" }) : /* @__PURE__ */ i.jsx("ul", { className: Ba.list, children: D.map(function(j, y) {
      var z = window.users[j.user];
      return /* @__PURE__ */ i.jsxs("li", { className: Ba.item, children: [
        /* @__PURE__ */ i.jsx("span", { className: Ba.user, children: z ? z.displayName : j.user }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: Ba.action, children: j.action.replace(/_/g, " ") }),
        j.details ? /* @__PURE__ */ i.jsxs("span", { className: Ba.details, children: [
          " — ",
          j.details
        ] }) : null,
        /* @__PURE__ */ i.jsx("span", { className: Ba.time, children: window.formatDate(j.timestamp) })
      ] }, y);
    }) })
  ] });
}
const d_ = "_grid_69ji7_1", v_ = "_section_69ji7_8", m_ = "_heading_69ji7_12", Gu = {
  grid: d_,
  section: v_,
  heading: m_
};
function h_() {
  var s = ye(), r = Ls(), d = Qn(), o = Oh(), v = r.tasks, h = d.slaves.map(function(w) {
    return w.username;
  }), p = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(w) {
        return w.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(w) {
        return w.status === "completed";
      }).length
    },
    {
      label: "Demerits Issued",
      value: v.filter(function(w) {
        return w.type === "demerit" && h.indexOf(w.assignedTo) !== -1;
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(V1, { stats: p }),
    /* @__PURE__ */ i.jsxs("div", { className: Gu.grid, children: [
      /* @__PURE__ */ i.jsxs(ge, { className: Gu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Gu.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(W1, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(t_, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: Gu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Gu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        f_,
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
function g_(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Uh() {
  var s = ye(), r = la({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: g_
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
var xh = { description: "", justification: "", points: 10, dueDate: "" };
function y_({ onSubmit: s }) {
  var [r, d] = E.useState(xh), [o, v] = E.useState(!1);
  function h(w, T) {
    d(function(D) {
      return Object.assign({}, D, { [w]: T });
    });
  }
  async function p(w) {
    if (w.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await s(r), d(xh);
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: p, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          value: r.description,
          onChange: function(w) {
            h("description", w.target.value);
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
          onChange: function(w) {
            h("justification", w.target.value);
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
          onChange: function(w) {
            h("points", w.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(w) {
            h("dueDate", w.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const p_ = "_card_q0jnd_1", __ = "_badgeRow_q0jnd_5", S_ = "_description_q0jnd_11", b_ = "_justification_q0jnd_15", x_ = "_metaLine_q0jnd_21", j_ = "_actions_q0jnd_27", qn = {
  card: p_,
  badgeRow: __,
  description: S_,
  justification: b_,
  metaLine: x_,
  actions: j_
};
function T_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function jh({ suggestion: s, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var h = window.users[s.reviewedBy];
  return /* @__PURE__ */ i.jsxs(ge, { className: qn.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: qn.badgeRow, children: [
      /* @__PURE__ */ i.jsx(Lt, { tone: T_(s.status), children: s.status }),
      /* @__PURE__ */ i.jsxs(Lt, { tone: "neutral", children: [
        s.suggestedPoints,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: qn.description, children: s.description }),
    s.justification ? /* @__PURE__ */ i.jsx("p", { className: qn.justification, children: s.justification }) : null,
    /* @__PURE__ */ i.jsxs("p", { className: qn.metaLine, children: [
      "Submitted ",
      window.formatDate(s.createdAt),
      s.suggestedDueDate ? " · Suggested due " + window.formatDate(s.suggestedDueDate) : "",
      s.reviewedAt ? " · Reviewed by " + (h ? h.displayName : s.reviewedBy) : ""
    ] }),
    r && s.status === "pending" ? /* @__PURE__ */ i.jsxs("div", { className: qn.actions, children: [
      /* @__PURE__ */ i.jsx(Y, { onClick: function() {
        d(s.id);
      }, children: "Approve" }),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
        o(s.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
        v(s.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function N_() {
  var s = ye(), r = Uh();
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
      /* @__PURE__ */ i.jsx(y_, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(jh, { suggestion: v, forAdmin: !1 }, v.id);
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
        jh,
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
var Th = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function w_(s, r) {
  return s.title.localeCompare(r.title);
}
function E_(s, r) {
  return new Date(r.purchaseDate) - new Date(s.purchaseDate);
}
function A_() {
  var s = ye(), r = s.activeMasterContext, d = la({
    table: "rewards",
    masterUsername: r,
    sort: w_
  }), o = la({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: E_
  }), [v, h] = E.useState(Th), [p, w] = E.useState("loading"), T = E.useRef(Math.random().toString(36).slice(2)).current, D = E.useCallback(
    async function() {
      if (r) {
        w("loading");
        var j = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (j.error) {
          w("error");
          return;
        }
        h(
          j.data && j.data.length > 0 ? j.data[0] : Th
        ), w("ready");
      }
    },
    [r]
  );
  return E.useEffect(
    function() {
      if (D(), !!r) {
        var j = window.supabase.channel("beta_reward_settings_" + r + "_" + T).on(
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
          window.supabase.removeChannel(j);
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
    settingsStatus: p,
    addReward: function(j, y, z, R) {
      return window.addReward(j, y, z, R);
    },
    updateReward: function(j, y, z, R, U) {
      return window.updateReward(j, y, z, R, U);
    },
    deleteReward: function(j) {
      return window.deleteReward(j);
    },
    purchaseReward: function(j) {
      return window.purchaseReward(j);
    },
    authorizePurchase: function(j) {
      return window.authorizePurchase(j);
    },
    denyPurchase: function(j) {
      return window.denyPurchase(j);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(j, y, z) {
      return window.updateRewardSystemSettings(j, y, z);
    }
  };
}
const C_ = "_card_1tc0o_1", z_ = "_title_1tc0o_7", D_ = "_description_1tc0o_12", R_ = "_badgeRow_1tc0o_19", M_ = "_actions_1tc0o_24", Qu = {
  card: C_,
  title: z_,
  description: D_,
  badgeRow: R_,
  actions: M_
};
function Hh({ reward: s, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(ge, { className: Qu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: Qu.title, children: s.title }),
    /* @__PURE__ */ i.jsx("p", { className: Qu.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("div", { className: Qu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(Lt, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Lt, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: Qu.actions, children: [
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
        d(s);
      }, children: "Edit" }),
      /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
        o(s.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ i.jsx(Y, { onClick: function() {
      r(s.id);
    }, children: "Purchase" })
  ] });
}
const O_ = "_grid_19ohq_1", U_ = "_purchasesHeading_19ohq_7", H_ = "_purchaseCard_19ohq_11", L_ = "_badgeRow_19ohq_15", q_ = "_purchaseTitle_19ohq_19", B_ = "_purchaseMeta_19ohq_24", Gl = {
  grid: O_,
  purchasesHeading: U_,
  purchaseCard: H_,
  badgeRow: L_,
  purchaseTitle: q_,
  purchaseMeta: B_
};
function Y_(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function G_({ rewards: s, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: h }) {
  var p = ye(), w = h.filter(function(T) {
    return T.userId === p.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx($t, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(na, { message: d ? d.message : "Failed to load", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Gl.grid, children: s.map(function(T) {
      return /* @__PURE__ */ i.jsx(Hh, { reward: T, onPurchase: v }, T.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Gl.purchasesHeading, children: "My Reward Purchases" }),
    w.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No purchases yet" }) : w.map(function(T) {
      return /* @__PURE__ */ i.jsxs(ge, { className: Gl.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Gl.badgeRow, children: /* @__PURE__ */ i.jsx(Lt, { tone: Y_(T.status), children: T.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Gl.purchaseTitle, children: T.rewards ? T.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Gl.purchaseMeta, children: [
          T.purchaseCost,
          " points · ",
          window.formatDate(T.purchaseDate)
        ] }),
        T.status === "denied" && T.notes ? /* @__PURE__ */ i.jsxs("p", { className: Gl.purchaseMeta, children: [
          "Reason: ",
          T.notes
        ] }) : null
      ] }, T.id);
    })
  ] });
}
const Q_ = "_heading_p82cd_1", X_ = "_row_p82cd_6", V_ = "_selectGroup_p82cd_16", Z_ = "_selectLabel_p82cd_23", K_ = "_select_p82cd_16", J_ = "_actions_p82cd_38", Bn = {
  heading: Q_,
  row: X_,
  selectGroup: V_,
  selectLabel: Z_,
  select: K_,
  actions: J_
};
var Ao = { title: "", description: "", cost: 10, type: "instant" };
function k_({ editingReward: s, onSave: r, onCancelEdit: d }) {
  var [o, v] = E.useState(Ao), [h, p] = E.useState(!1);
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
  function w(D, j) {
    v(function(y) {
      return Object.assign({}, y, { [D]: j });
    });
  }
  async function T(D) {
    if (D.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      p(!0);
      try {
        await r(o, s ? s.id : null), v(Ao);
      } finally {
        p(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Bn.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: T, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Title",
          value: o.title,
          onChange: function(D) {
            w("title", D.target.value);
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
            w("description", D.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: Bn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(D) {
              w("cost", D.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: Bn.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: Bn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: Bn.select,
              value: o.type,
              onChange: function(D) {
                w("type", D.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "instant", children: "Instant purchase" }),
                /* @__PURE__ */ i.jsx("option", { value: "authorized", children: "Requires authorization" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Bn.actions, children: [
        /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: h, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ i.jsx(Y, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const $_ = "_heading_26k11_1", F_ = "_row_26k11_6", W_ = "_checkboxRow_26k11_16", I_ = "_readout_26k11_24", P_ = "_actions_26k11_30", Yn = {
  heading: $_,
  row: F_,
  checkboxRow: W_,
  readout: I_,
  actions: P_
};
function eS({ settings: s, onSave: r, onReset: d }) {
  var [o, v] = E.useState(s.instantPurchaseLimit || 0), [h, p] = E.useState(s.resetDurationDays || 0), [w, T] = E.useState(s.requiresAuthorizationAfterLimit !== !1);
  E.useEffect(
    function() {
      v(s.instantPurchaseLimit || 0), p(s.resetDurationDays || 0), T(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function D(j) {
    j.preventDefault(), r(Number(o) || 0, Number(h) || 0, w);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Yn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Yn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(j) {
              v(j.target.value);
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
            onChange: function(j) {
              p(j.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Yn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: w,
            onChange: function(j) {
              T(j.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Yn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Yn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Yn.actions, children: [
        /* @__PURE__ */ i.jsx(Y, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(Y, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const tS = "_card_zkx61_1", aS = "_title_zkx61_5", lS = "_meta_zkx61_10", nS = "_actions_zkx61_16", Ds = {
  card: tS,
  title: aS,
  meta: lS,
  actions: nS
};
function uS({ purchases: s, onAuthorize: r, onDeny: d }) {
  var o = s.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var h = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(ge, { className: Ds.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: Ds.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        h ? h.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Ds.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Ds.actions, children: [
        /* @__PURE__ */ i.jsx(Y, { onClick: function() {
          r(v.id);
        }, children: "Authorize" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
          d(v.id);
        }, children: "Deny" })
      ] })
    ] }, v.id);
  }) });
}
const iS = "_heading_1ewsp_1", sS = "_grid_1ewsp_5", Rs = {
  heading: iS,
  grid: sS
};
function cS({ rewardsState: s }) {
  var [r, d] = E.useState(null);
  async function o(h, p) {
    p ? await s.updateReward(p, h.title, h.description, Number(h.cost), h.type) : await s.addReward(h.title, h.description, Number(h.cost), h.type), d(null);
  }
  function v(h) {
    window.showConfirmModal("Delete this reward?", function(p) {
      p && s.deleteReward(h);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      k_,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Rs.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      na,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Rs.grid, children: s.rewards.map(function(h) {
      return /* @__PURE__ */ i.jsx(
        Hh,
        {
          reward: h,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        h.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Rs.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      eS,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Rs.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      uS,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function rS() {
  var s = ye(), r = A_();
  return s.isMaster ? /* @__PURE__ */ i.jsx(cS, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    G_,
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
const oS = "_heading_pc1l6_1", fS = "_form_pc1l6_11", dS = "_row_pc1l6_33", vS = "_statusMessage_pc1l6_51", Xu = {
  heading: oS,
  form: fS,
  row: dS,
  statusMessage: vS
};
function mS() {
  var s = ye(), r = Qn(), [d, o] = E.useState({ username: "", password: "", displayName: "" }), [v, h] = E.useState(!1);
  function p(j, y) {
    o(function(z) {
      return Object.assign({}, z, { [j]: y });
    });
  }
  async function w(j) {
    j.preventDefault(), h(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      h(!1);
    }
  }
  function T(j) {
    window.deactivatePig(j);
  }
  function D(j) {
    window.reactivatePig(j);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Xu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Xu.form, onSubmit: w, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Username",
            value: d.username,
            onChange: function(j) {
              p("username", j.target.value);
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
            onChange: function(j) {
              p("password", j.target.value);
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
            onChange: function(j) {
              p("displayName", j.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ i.jsxs(Y, { type: "submit", loading: v, children: [
          "Add ",
          s.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("h2", { className: Xu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(j) {
      var y = j.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Xu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Lt, { tone: y ? "success" : "neutral", children: y ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: j.displayName }),
          " (",
          j.username,
          ") ·",
          " ",
          j.points,
          " pts",
          j.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Xu.statusMessage, children: [
            " · ",
            j.statusMessage
          ] }) : null
        ] }),
        y ? /* @__PURE__ */ i.jsx(
          Y,
          {
            variant: "danger",
            onClick: function() {
              T(j.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          Y,
          {
            onClick: function() {
              D(j.username);
            },
            children: "Reactivate"
          }
        )
      ] }, j.username);
    })
  ] });
}
function hS(s, r) {
  return new Date(r.created_at) - new Date(s.created_at);
}
function gS() {
  var s = ye(), r = la({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: hS
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
const yS = "_heading_1pok1_1", pS = "_hint_1pok1_11", _S = "_row_1pok1_23", SS = "_actions_1pok1_45", Vu = {
  heading: yS,
  hint: pS,
  row: _S,
  actions: SS
};
function bS(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function xS() {
  var s = ye(), r = gS(), [d, o] = E.useState(null);
  function v(h) {
    navigator.clipboard.writeText(window.buildInviteLink(h)), o(h), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Vu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Vu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(Y, { onClick: r.generateInvite, children: "Generate Invite Link" }),
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
      var p = h.status === "pending" && h.expires_at && new Date(h.expires_at) < /* @__PURE__ */ new Date(), w = p ? "expired" : h.status, T = h.status === "pending" && !p;
      return /* @__PURE__ */ i.jsxs("div", { className: Vu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Lt, { tone: bS(w), children: w.charAt(0).toUpperCase() + w.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: h.code }),
          h.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Vu.hint, children: [
            " · redeemed by ",
            h.redeemed_by
          ] }) : null
        ] }),
        T ? /* @__PURE__ */ i.jsxs("div", { className: Vu.actions, children: [
          /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
            v(h.code);
          }, children: d === h.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ i.jsx(
            Y,
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
const jS = "_form_7nlkd_1", TS = {
  form: jS
};
function NS({ onAdd: s }) {
  var [r, d] = E.useState(""), [o, v] = E.useState(!1);
  async function h(p) {
    p.preventDefault();
    var w = r.trim();
    if (w) {
      v(!0);
      try {
        await s(w), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: TS.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      ue,
      {
        multiline: !0,
        rows: 2,
        value: r,
        onChange: function(p) {
          d(p.target.value);
        },
        placeholder: "New message...",
        maxLength: 300
      }
    ),
    /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: o, disabled: !r.trim(), children: "Add Message" })
  ] });
}
const wS = "_heading_10ijk_1", ES = "_row_10ijk_11", AS = "_actions_10ijk_33", Co = {
  heading: wS,
  row: ES,
  actions: AS
};
function CS() {
  var s = Ch();
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Co.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(NS, { onAdd: s.addMessage }),
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
            Y,
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
            Y,
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
            Y,
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
function zS() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(mS, {}),
    /* @__PURE__ */ i.jsx(xS, {}),
    /* @__PURE__ */ i.jsx(CS, {})
  ] });
}
function DS() {
  var s = ye(), [r, d] = E.useState([]), [o, v] = E.useState("loading"), h = E.useCallback(async function() {
    v("loading");
    var p = await window.fetchAllMasters();
    d(p || []), v("ready");
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
    deactivateMaster: function(p) {
      return new Promise(function(w) {
        window.showConfirmModal(
          "Deactivate master '" + p + "'? They (and their group) won't be able to log in.",
          async function(T) {
            T && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", p), window.showNotification("Master deactivated.", "success"), await h()), w();
          }
        );
      });
    },
    reactivateMaster: async function(p) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", p), window.showNotification("Master reactivated.", "success"), await h();
    }
  };
}
const RS = "_list_1yv13_1", MS = "_row_1yv13_10", OS = "_ratio_1yv13_18", zo = {
  list: RS,
  row: MS,
  ratio: OS
};
function US({ theme: s }) {
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
const HS = "_heading_xjg2m_1", LS = "_row_xjg2m_11", qS = "_checkboxRow_xjg2m_31", BS = "_divider_xjg2m_47", YS = "_colorGroupLabel_xjg2m_57", GS = "_colorRow_xjg2m_71", QS = "_colorField_xjg2m_85", XS = "_actions_xjg2m_119", Jt = {
  heading: HS,
  row: LS,
  checkboxRow: qS,
  divider: BS,
  colorGroupLabel: YS,
  colorRow: GS,
  colorField: QS,
  actions: XS
};
var VS = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
}, ZS = {
  bg: "#ffffff",
  card: "#f4f4f5",
  elevated: "#e4e4e7",
  textPrimary: "#18181b",
  textSecondary: "#52525b"
};
function Nh(s) {
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
    theme: s ? s.theme : VS,
    themeLight: s ? s.themeLight : ZS
  };
}
function wh({ master: s, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, h] = E.useState(Nh(s)), [p, w] = E.useState(!1), T = !!s;
  function D(R, U) {
    h(function(L) {
      return Object.assign({}, L, { [R]: U });
    });
  }
  function j(R, U) {
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
    R.preventDefault(), w(!0);
    try {
      T ? await d(s.username, v) : (await r(v), h(Nh(null)));
    } finally {
      w(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Jt.heading, children: T ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: z, children: [
      T ? null : /* @__PURE__ */ i.jsx(
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
          label: T ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(R) {
            D("password", R.target.value);
          },
          required: !T
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
              onChange: function(Q) {
                j(U, Q.target.value);
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
              onChange: function(Q) {
                y(U, Q.target.value);
              }
            }
          )
        ] }, "light-" + U);
      }) }),
      /* @__PURE__ */ i.jsx(US, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: Jt.actions, children: [
        /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: p, children: T ? "Save changes" : "Create master" }),
        T ? /* @__PURE__ */ i.jsx(Y, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const KS = "_heading_1uetk_1", JS = "_hint_1uetk_11", kS = "_row_1uetk_23", $S = "_actions_1uetk_45", Ms = {
  heading: KS,
  hint: JS,
  row: kS,
  actions: $S
};
function FS() {
  var s = ye(), [r, d] = E.useState(s.siteSettings.pageTitle), [o, v] = E.useState(s.siteSettings.loginHeading), [h, p] = E.useState(!1);
  E.useEffect(
    function() {
      d(s.siteSettings.pageTitle), v(s.siteSettings.loginHeading);
    },
    [s.siteSettings]
  );
  async function w(T) {
    T.preventDefault(), p(!0);
    try {
      await window.updateSiteSettings({
        pageTitle: r,
        loginHeading: o
      }), s.refresh();
    } finally {
      p(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ms.heading, children: "Site Settings" }),
    /* @__PURE__ */ i.jsx("p", { className: Ms.hint, children: "These are shared site-wide, across every group - they show before anyone has logged in, so there's no group to scope them to." }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: w, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Ms.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Browser tab title",
            value: r,
            onChange: function(T) {
              d(T.target.value);
            },
            maxLength: 60
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Login screen heading",
            value: o,
            onChange: function(T) {
              v(T.target.value);
            },
            maxLength: 60
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: Ms.actions, children: /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: h, children: "Save" }) })
    ] })
  ] });
}
const WS = "_heading_vrwe0_1", IS = "_row_vrwe0_5", PS = "_badgeRow_vrwe0_14", eb = "_meta_vrwe0_20", tb = "_actions_vrwe0_26", Zu = {
  heading: WS,
  row: IS,
  badgeRow: PS,
  meta: eb,
  actions: tb
};
function ab() {
  var s = DS(), [r, d] = E.useState(null);
  async function o(h) {
    var p = await s.createMaster(h);
    p && await s.reload();
  }
  async function v(h, p) {
    await s.updateMasterAccount(h, {
      displayName: p.displayName,
      password: p.password,
      isAdmin: p.isAdmin
    }), await s.updateMasterTerminology(h, p), d(null), await s.reload();
  }
  return r ? /* @__PURE__ */ i.jsx(
    wh,
    {
      master: r,
      onSaveExisting: v,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(FS, {}),
    /* @__PURE__ */ i.jsx(wh, { onCreate: o }),
    /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx($t, {}) : s.masters.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No masters yet" }) : s.masters.map(function(h) {
      var p = h.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Zu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Zu.badgeRow, children: [
            /* @__PURE__ */ i.jsx(Lt, { tone: p ? "success" : "neutral", children: p ? "Active" : "Inactive" }),
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
            Y,
            {
              variant: "secondary",
              onClick: function() {
                d(h);
              },
              children: "Edit"
            }
          ),
          p ? /* @__PURE__ */ i.jsx(
            Y,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(h.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            Y,
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
var Os = 100;
function lb() {
  var s = ye(), r = s.activeMasterContext, [d, o] = E.useState([]), [v, h] = E.useState("loading"), [p, w] = E.useState(null), [T, D] = E.useState(!1), j = E.useRef(Math.random().toString(36).slice(2)).current, y = E.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), w(null);
      var U = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Os);
      if (U.error) {
        w(U.error), h("error");
        return;
      }
      var L = (U.data || []).slice().reverse();
      o(L), D((U.data || []).length === Os), h("ready");
    },
    [r]
  ), z = E.useCallback(
    async function() {
      o(function(U) {
        if (U.length === 0) return U;
        var L = U[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", L.created_at).order("created_at", { ascending: !1 }).limit(Os).then(function(Q) {
          if (!Q.error) {
            var k = (Q.data || []).slice().reverse();
            D((Q.data || []).length === Os), o(function(ne) {
              return k.concat(ne);
            });
          }
        }), U;
      });
    },
    [r]
  ), R = E.useCallback(
    async function(U) {
      var L = await window.sendChatMessage({ body: U });
      L && o(function(Q) {
        return Q.some(function(k) {
          return k.id === L.id;
        }) ? Q : Q.concat([L]);
      });
    },
    []
  );
  return E.useEffect(
    function() {
      if (y(), !!r) {
        var U = window.supabase.channel("beta_chat_messages_" + r + "_" + j).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + r
          },
          function(Q) {
            o(function(k) {
              return k.some(function(ne) {
                return ne.id === Q.new.id;
              }) ? k : k.concat([Q.new]);
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
    error: p,
    hasMoreOlder: T,
    loadOlder: z,
    sendMessage: R,
    reload: y
  };
}
const nb = "_row_gqneb_1", ub = "_meta_gqneb_19", ib = "_status_gqneb_35", sb = "_time_gqneb_43", cb = "_body_gqneb_51", Ku = {
  row: nb,
  meta: ub,
  status: ib,
  time: sb,
  body: cb
};
function rb({ message: s }) {
  var r = window.users[s.sender_username], d = r ? r.displayName : s.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Ku.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ku.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Ku.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Ku.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Ku.body, children: s.body })
  ] });
}
const ob = "_form_nndvu_1", fb = "_input_nndvu_13", Eh = {
  form: ob,
  input: fb
};
function db({ onSend: s }) {
  var [r, d] = E.useState(""), [o, v] = E.useState(!1);
  async function h(p) {
    p.preventDefault();
    var w = r.trim();
    if (w) {
      v(!0);
      try {
        await s(w), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: Eh.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        className: Eh.input,
        value: r,
        onChange: function(p) {
          d(p.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: o, disabled: !r.trim(), children: "Send" })
  ] });
}
const vb = "_heading_12c2o_1", mb = "_loadOlder_12c2o_11", hb = "_list_12c2o_19", Do = {
  heading: vb,
  loadOlder: mb,
  list: hb
};
function gb() {
  var s = lb(), r = E.useRef(null), d = E.useRef(!0);
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
      s.hasMoreOlder ? /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: s.loadOlder, className: Do.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: Do.list, ref: r, onScroll: o, children: s.messages.length === 0 ? /* @__PURE__ */ i.jsx(He, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(rb, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(db, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
function yb(s, r) {
  return new Date(r.updated_at) - new Date(s.updated_at);
}
function Lh() {
  var s = ye(), r = la({
    table: "saved_spirals",
    masterUsername: s.activeMasterContext,
    sort: yb
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
function pb(s) {
  var r = JSON.stringify(s, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function _b(s, r, d) {
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
const Sb = "_sidebar_1jfxv_1", bb = "_controlGroup_1jfxv_19", xb = "_spiralList_1jfxv_53", jb = "_spiralItem_1jfxv_67", Tb = "_spiralItemActive_1jfxv_69", Nb = "_actions_1jfxv_97", wb = "_controlRow_1jfxv_107", Eb = "_valueDisplay_1jfxv_141", Ab = "_sendAsTask_1jfxv_153", dt = {
  sidebar: Sb,
  controlGroup: bb,
  spiralList: xb,
  spiralItem: jb,
  spiralItemActive: Tb,
  actions: Nb,
  controlRow: wb,
  valueDisplay: Eb,
  sendAsTask: Ab
};
var Cb = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function zb({
  textControls: s,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: h,
  onSelect: p,
  onClearAll: w,
  onPropertyChange: T,
  backgroundColor: D,
  onBackgroundChange: j,
  onSave: y,
  onLoadFile: z,
  onOpenTaskModal: R,
  savedSpiralName: U,
  onSaveToLibrary: L
}) {
  var Q = E.useRef(null), [k, ne] = E.useState(U || "");
  return /* @__PURE__ */ i.jsxs("div", { className: dt.sidebar, children: [
    s,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ i.jsx("div", { className: dt.spiralList, children: r.map(function(K, re) {
        return /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: re === d ? dt.spiralItemActive : dt.spiralItem,
            children: [
              /* @__PURE__ */ i.jsxs("span", { children: [
                "Spiral ",
                re + 1
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: dt.actions, children: [
                /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
                  p(re);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
                  h(re);
                }, children: "Delete" })
              ] })
            ]
          },
          K.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      Cb.map(function(K) {
        return /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
          /* @__PURE__ */ i.jsxs("label", { children: [
            K.label,
            ":"
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: K.min,
              max: K.max,
              step: K.step,
              value: o[K.key],
              onChange: function(re) {
                T(K.key, Number(re.target.value));
              }
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: dt.valueDisplay, children: [
            K.key === "speed" || K.key === "opacity" || K.key === "timeOffset" ? Number(o[K.key]).toFixed(1) : o[K.key],
            K.suffix || ""
          ] })
        ] }, K.key);
      }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Color:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: o.color,
            onChange: function(K) {
              T("color", K.target.value);
            }
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Configuration" }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: y, children: "Save Config" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          Q.current.click();
        }, children: "Load Config" })
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          ref: Q,
          style: { display: "none" },
          onChange: function(K) {
            K.target.files[0] && z(K.target.files[0]), K.target.value = "";
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
          value: k,
          onChange: function(K) {
            ne(K.target.value);
          },
          placeholder: "e.g. Calming blue swirl"
        }
      ),
      /* @__PURE__ */ i.jsx(
        Y,
        {
          variant: "secondary",
          disabled: !k.trim(),
          onClick: function() {
            L(k.trim());
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
            onChange: function(K) {
              j(K.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: w, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(Y, { onClick: R, className: dt.sendAsTask, children: "Send as Task" })
  ] });
}
const Db = "_controlGroup_9ywy2_1", Rb = "_script_9ywy2_23", Mb = "_controlRow_9ywy2_47", Ob = "_valueDisplay_9ywy2_83", Ub = "_buttonRow_9ywy2_97", kt = {
  controlGroup: Db,
  script: Rb,
  controlRow: Mb,
  valueDisplay: Ob,
  buttonRow: Ub
};
function Hb(s) {
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
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: s.startLoop, disabled: s.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: s.stopLoop, disabled: !s.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const Lb = "_row_vc5cz_1", qb = "_checkboxRow_vc5cz_23", Bb = "_selectLabel_vc5cz_39", Yb = "_select_vc5cz_39", Gb = "_fieldset_vc5cz_73", Qb = "_hint_vc5cz_87", Xb = "_actions_vc5cz_99", _a = {
  row: Lb,
  checkboxRow: qb,
  selectLabel: Bb,
  select: Yb,
  fieldset: Gb,
  hint: Qb,
  actions: Xb
};
function Vb({ config: s, onClose: r, onSent: d }) {
  var o = ye(), v = Qn(), [h, p] = E.useState("Experience the Spiral Animation"), [w, T] = E.useState(10), [D, j] = E.useState(5), [y, z] = E.useState(""), [R, U] = E.useState(!1), [L, Q] = E.useState("daily"), [k, ne] = E.useState([]), [K, re] = E.useState(!1);
  function Le(X) {
    ne(function(le) {
      return le.includes(X) ? le.filter(function(Qe) {
        return Qe !== X;
      }) : le.concat(X);
    });
  }
  async function Oe() {
    var X = h.trim();
    if (!X) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (k.length === 0) {
      window.showNotification(
        "Select at least one " + o.groupTerms.slaveLabel + " to assign this to",
        "error"
      );
      return;
    }
    if (y) {
      var le = new Date(y);
      if (isNaN(le.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (le < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    re(!0);
    try {
      var Qe = {
        text: X,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        points: Number(w) || 10,
        penaltyPoints: Number(D) || 5,
        dueDate: y || null,
        isRepeating: R,
        repeatInterval: R ? L : null,
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
        rejectedBy: null,
        spiralConfig: s || null
      }, { error: qe } = await window.createTaskForPigs(Qe, k);
      if (qe) {
        console.error("Error creating spiral task:", qe), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + X + '" created successfully!',
        "success"
      ), d();
    } finally {
      re(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(Wu, { title: "🌀 Create Spiral Task", onClose: r, children: [
    /* @__PURE__ */ i.jsx(
      ue,
      {
        label: "Task Description",
        value: h,
        onChange: function(X) {
          p(X.target.value);
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
          value: w,
          onChange: function(X) {
            T(X.target.value);
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
          value: D,
          onChange: function(X) {
            j(X.target.value);
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
          value: y,
          onChange: function(X) {
            z(X.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: _a.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: R,
            onChange: function(X) {
              U(X.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    R ? /* @__PURE__ */ i.jsx("div", { className: _a.row, children: /* @__PURE__ */ i.jsxs("label", { className: _a.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: _a.select,
          value: L,
          onChange: function(X) {
            Q(X.target.value);
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
        o.groupTerms.slaveLabelPlural
      ] }),
      v.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: _a.hint, children: [
        "No ",
        o.groupTerms.slaveLabelPlural,
        " added yet."
      ] }) : v.slaves.map(function(X) {
        return /* @__PURE__ */ i.jsxs("label", { className: _a.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: k.includes(X.username),
              onChange: function() {
                Le(X.username);
              }
            }
          ),
          X.displayName
        ] }, X.username);
      })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: _a.actions, children: [
      /* @__PURE__ */ i.jsx(Y, { loading: K, onClick: Oe, disabled: k.length === 0, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: r, children: "Cancel" })
    ] })
  ] });
}
function Ju(s) {
  return s ? Object.assign({}, s) : null;
}
function Zb({ onClose: s, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = E.useRef(null), h = E.useRef([]), p = E.useRef(1), [, w] = E.useState(0), [T, D] = E.useState(0), [j, y] = E.useState(null), [z, R] = E.useState("#000000"), [U, L] = E.useState(!1), [Q, k] = E.useState(o || null), [ne, K] = E.useState(d || ""), re = Rh(), Le = Lh();
  function Oe() {
    var q = v.current;
    return q ? { width: q.width, height: q.height } : { width: 0, height: 0 };
  }
  function X() {
    var q = Oe(), V = r1(p.current++, q.width, q.height);
    h.current = h.current.concat(V), D(h.current.length - 1), y(Ju(V)), w(function(ce) {
      return ce + 1;
    });
  }
  function le(q) {
    h.current = h.current.filter(function(ce, he) {
      return he !== q;
    });
    var V = Math.max(0, q - 1);
    D(V), y(Ju(h.current[V])), w(function(ce) {
      return ce + 1;
    });
  }
  function Qe(q) {
    D(q), y(Ju(h.current[q]));
  }
  function qe() {
    h.current = [], D(0), y(null), w(function(q) {
      return q + 1;
    });
  }
  function We(q, V) {
    var ce = h.current[T];
    ce && (ce[q] = V, y(Ju(ce)));
  }
  function $e() {
    pb({
      spirals: h.current.map(function(q) {
        return Object.assign({}, q);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: z,
        selectedSpiralIndex: T
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function P(q) {
    var V = Oe(), ce = (q.spirals || []).map(function(ot) {
      return p.current = Math.max(p.current, (ot.id || 0) + 1), Object.assign(
        { x: V.width / 2, y: V.height / 2 },
        Uo,
        ot
      );
    });
    h.current = ce;
    var he = q.globalSettings && q.globalSettings.selectedSpiralIndex || 0;
    D(he), y(Ju(ce[he] || ce[0])), q.globalSettings && q.globalSettings.backgroundColor && R(q.globalSettings.backgroundColor), w(function(ot) {
      return ot + 1;
    });
  }
  function Xe(q) {
    _b(
      q,
      function(V) {
        P(V), k(null), K(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(V) {
        window.showNotification(V, "error");
      }
    );
  }
  function Me(q) {
    Le.saveSpiral({
      id: Q,
      name: q,
      config: {
        spirals: h.current.map(function(V) {
          return Object.assign({}, V);
        }),
        textSettings: {},
        globalSettings: {
          backgroundColor: z,
          selectedSpiralIndex: T
        }
      }
    }).then(function(V) {
      V && k(V), K(q);
    });
  }
  E.useEffect(function() {
    r ? P(r) : h.current.length === 0 && X();
    function q(V) {
      V.key === "Escape" && s();
    }
    return document.addEventListener("keydown", q), function() {
      document.removeEventListener("keydown", q);
    };
  }, []);
  var G = h.current.map(function(q) {
    return { id: q.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: gl.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: gl.closeBtn, onClick: s, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: gl.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: gl.canvasArea, children: [
        /* @__PURE__ */ i.jsx(zh, { canvasRef: v, spiralsRef: h, backgroundColor: z }),
        /* @__PURE__ */ i.jsx(
          Dh,
          {
            display: re.display,
            animSpeed: re.animSpeed,
            fontSize: re.fontSize,
            color: re.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        zb,
        {
          textControls: /* @__PURE__ */ i.jsx(Hb, { ...re }),
          spirals: G,
          activeIndex: T,
          activeSnapshot: j,
          onAdd: X,
          onDelete: le,
          onSelect: Qe,
          onClearAll: qe,
          onPropertyChange: We,
          backgroundColor: z,
          onBackgroundChange: R,
          onSave: $e,
          onLoadFile: Xe,
          onOpenTaskModal: function() {
            L(!0);
          },
          savedSpiralName: ne,
          onSaveToLibrary: Me
        }
      )
    ] }),
    U ? /* @__PURE__ */ i.jsx(
      Vb,
      {
        config: {
          spirals: h.current.map(function(q) {
            return Object.assign({}, q);
          }),
          textSettings: {
            script: re.script,
            interval: re.interval,
            holdDuration: re.holdDuration,
            animSpeed: re.animSpeed,
            fontSize: re.fontSize,
            color: re.color
          },
          globalSettings: {
            backgroundColor: z,
            selectedSpiralIndex: T
          }
        },
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
const Kb = "_heading_iikbv_1", Jb = "_row_iikbv_11", kb = "_meta_iikbv_45", $b = "_actions_iikbv_55", Fb = "_renameRow_iikbv_67", ku = {
  heading: Kb,
  row: Jb,
  meta: kb,
  actions: $b,
  renameRow: Fb
};
function Wb({ savedSpirals: s, status: r, error: d, onReload: o, onLoad: v, onRename: h, onDelete: p }) {
  var [w, T] = E.useState(null), [D, j] = E.useState("");
  function y(R) {
    T(R.id), j(R.name);
  }
  function z(R) {
    var U = D.trim();
    U && h(R, U), T(null);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: ku.heading, children: "Saved Spirals" }),
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
      return /* @__PURE__ */ i.jsx("div", { className: ku.row, children: w === R.id ? /* @__PURE__ */ i.jsxs("div", { className: ku.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            value: D,
            onChange: function(U) {
              j(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          z(R);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          T(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: R.name }),
          /* @__PURE__ */ i.jsxs("div", { className: ku.meta, children: [
            "Updated ",
            new Date(R.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: ku.actions, children: [
          /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
            v(R);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
            y(R);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
            p(R.id);
          }, children: "Delete" })
        ] })
      ] }) }, R.id);
    }) : null
  ] });
}
function Ib(s, r) {
  return s.name.localeCompare(r.name);
}
function Pb() {
  var s = ye(), r = la({
    table: "saved_cost_tracker_presets",
    masterUsername: s.activeMasterContext,
    sort: Ib
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
const ex = "_heading_1ynjy_1", tx = "_row_1ynjy_11", ax = "_selectGroup_1ynjy_31", lx = "_selectLabel_1ynjy_45", nx = "_select_1ynjy_31", ux = "_fieldset_1ynjy_75", ix = "_checkboxRow_1ynjy_89", sx = "_hint_1ynjy_105", cx = "_penaltyForm_1ynjy_117", rx = "_penaltyList_1ynjy_141", ox = "_removePenalty_1ynjy_157", yt = {
  heading: ex,
  row: tx,
  selectGroup: ax,
  selectLabel: lx,
  select: nx,
  fieldset: ux,
  checkboxRow: ix,
  hint: sx,
  penaltyForm: cx,
  penaltyList: rx,
  removePenalty: ox
};
function fx({ onStart: s, onSavePreset: r, presetToApply: d }) {
  var o = ye(), v = Qn(), [h, p] = E.useState("Cost Tracker Running"), [w, T] = E.useState(50), [D, j] = E.useState("€"), [y, z] = E.useState(6e4), [R, U] = E.useState([]), [L, Q] = E.useState(!1), [k, ne] = E.useState([]), [K, re] = E.useState(""), [Le, Oe] = E.useState(""), [X, le] = E.useState("");
  function Qe(P) {
    U(function(Xe) {
      return Xe.includes(P) ? Xe.filter(function(Me) {
        return Me !== P;
      }) : Xe.concat(P);
    });
  }
  if (E.useEffect(
    function() {
      d && (p(d.description || "Cost Tracker Running"), T(d.rate), j(d.currency), z(d.increment_interval));
    },
    [d]
  ), !window.hasPermission("create_task")) return null;
  function qe() {
    ne(function(P) {
      return P.concat({
        description: K.trim(),
        amount: Number(Le)
      });
    }), re(""), Oe("");
  }
  function We(P) {
    ne(function(Xe) {
      return Xe.filter(function(Me, G) {
        return G !== P;
      });
    });
  }
  async function $e(P) {
    P.preventDefault(), Q(!0);
    try {
      X.trim() && r && await r({
        id: d ? d.id : void 0,
        name: X.trim(),
        description: h,
        rate: Number(w) || 0,
        currency: D,
        incrementInterval: Number(y)
      }), await s(h, Number(w) || 0, D, Number(y), k, R), ne([]), le(""), U([]);
    } finally {
      Q(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: yt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: yt.form, onSubmit: $e, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          value: h,
          onChange: function(P) {
            p(P.target.value);
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
            value: w,
            onChange: function(P) {
              T(P.target.value);
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
              onChange: function(P) {
                j(P.target.value);
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
              onChange: function(P) {
                z(P.target.value);
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
            value: K,
            onChange: function(P) {
              re(P.target.value);
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
            value: Le,
            onChange: function(P) {
              Oe(P.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          Y,
          {
            type: "button",
            variant: "secondary",
            disabled: !K.trim() || !Le,
            onClick: qe,
            children: "Add penalty"
          }
        )
      ] }),
      k.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: yt.penaltyList, children: k.map(function(P, Xe) {
        return /* @__PURE__ */ i.jsxs("li", { children: [
          P.description,
          ": ",
          D,
          P.amount.toFixed(2),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: yt.removePenalty,
              onClick: function() {
                We(Xe);
              },
              "aria-label": "Remove staged penalty " + P.description,
              children: "×"
            }
          )
        ] }, Xe);
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
        ] }) : v.slaves.map(function(P) {
          return /* @__PURE__ */ i.jsxs("label", { className: yt.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: R.includes(P.username),
                onChange: function() {
                  Qe(P.username);
                }
              }
            ),
            P.displayName
          ] }, P.username);
        })
      ] }),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Save as preset (optional)",
          placeholder: "Name this config to reuse it later",
          value: X,
          onChange: function(P) {
            le(P.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(Y, { type: "submit", loading: L, disabled: R.length === 0, children: "Start tracker" })
    ] })
  ] });
}
const dx = "_heading_girf2_1", vx = "_row_girf2_11", mx = "_meta_girf2_45", hx = "_actions_girf2_55", Us = {
  heading: dx,
  row: vx,
  meta: mx,
  actions: hx
};
function gx({ presets: s, status: r, error: d, onReload: o, onUse: v, onDelete: h }) {
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
    r === "ready" ? s.map(function(p) {
      return /* @__PURE__ */ i.jsxs("div", { className: Us.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: p.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Us.meta, children: [
            p.currency,
            Number(p.rate).toFixed(2),
            " per",
            " ",
            p.increment_interval === 1e3 ? "second" : p.increment_interval === 36e5 ? "hour" : "minute",
            p.description ? " · " + p.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Us.actions, children: [
          /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
            v(p);
          }, children: "Use" }),
          /* @__PURE__ */ i.jsx(Y, { variant: "danger", onClick: function() {
            h(p.id);
          }, children: "Delete" })
        ] })
      ] }, p.id);
    }) : null
  ] });
}
const yx = "_heading_1k7pj_1", px = "_row_1k7pj_11", _x = "_meta_1k7pj_45", Ro = {
  heading: yx,
  row: px,
  meta: _x
};
function Sx(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function bx({ trackers: s, onDelete: r }) {
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
            Sx(Number(d.increment_interval)),
            " · stopped " + new Date(d.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsx(Y, { variant: "secondary", onClick: function() {
          r(d.id);
        }, children: "Delete" })
      ] }, d.id);
    })
  ] });
}
const xx = "_heading_lmzbq_1", jx = {
  heading: xx
};
function Tx() {
  var s = Oo(), r = Pb(), [d, o] = E.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      fx,
      {
        onStart: s.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      gx,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: jx.heading, children: "Active Cost Trackers" }),
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
      bx,
      {
        trackers: s.stoppedTrackers,
        onDelete: s.deleteTracker
      }
    )
  ] });
}
const Nx = "_section_1o04b_1", wx = "_sectionHeader_1o04b_9", Ex = "_heading_1o04b_27", $u = {
  section: Nx,
  sectionHeader: wx,
  heading: Ex
};
function Ax() {
  var s = Lh(), [r, d] = E.useState(!1), [o, v] = E.useState(null), [h, p] = E.useState(null), [w, T] = E.useState("");
  function D() {
    v(null), p(null), T(""), d(!0);
  }
  function j(R) {
    v(R.config), p(R.id), T(R.name), d(!0);
  }
  function y() {
    d(!1), s.reload();
  }
  function z(R, U) {
    s.saveSpiral({ id: R.id, name: U, config: R.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { className: $u.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: $u.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: $u.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(Y, { onClick: D, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        Wb,
        {
          savedSpirals: s.savedSpirals,
          status: s.status,
          error: s.error,
          onReload: s.reload,
          onLoad: j,
          onRename: z,
          onDelete: s.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: $u.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: $u.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Tx, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      Zb,
      {
        onClose: y,
        initialConfig: o,
        initialSavedId: h,
        initialName: w
      }
    ) : null
  ] });
}
const Cx = "_card_s0ykj_1", zx = "_header_s0ykj_19", Dx = "_name_s0ykj_33", Rx = "_onlineDot_s0ykj_41", Mx = "_offlineDot_s0ykj_43", Ox = "_status_s0ykj_75", Ux = "_points_s0ykj_93", Hx = "_negative_s0ykj_105", Lx = "_zero_s0ykj_113", qx = "_positive_s0ykj_121", Bx = "_metaRow_s0ykj_129", Yx = "_pendingBadge_s0ykj_145", Gx = "_trackerBadge_s0ykj_163", Ht = {
  card: Cx,
  header: zx,
  name: Dx,
  onlineDot: Rx,
  offlineDot: Mx,
  status: Ox,
  points: Ux,
  negative: Hx,
  zero: Lx,
  positive: qx,
  metaRow: Bx,
  pendingBadge: Yx,
  trackerBadge: Gx
};
function Qx(s) {
  return s < 0 ? Ht.negative : s === 0 ? Ht.zero : Ht.positive;
}
function Xx({
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
      onKeyDown: function(p) {
        (p.key === "Enter" || p.key === " ") && h();
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
        /* @__PURE__ */ i.jsxs("div", { className: [Ht.points, Qx(s.points)].join(" "), children: [
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
const Vx = "_section_11wsb_1", Zx = "_heading_11wsb_9", Kx = "_list_11wsb_19", Jx = "_listItem_11wsb_37", kx = "_status_11wsb_59", aa = {
  section: Vx,
  heading: Zx,
  list: Kx,
  listItem: Jx,
  status: kx
};
function $x({
  slave: s,
  tasks: r,
  suggestions: d,
  tracker: o,
  onClose: v
}) {
  var h = r.filter(function(T) {
    return T.status === "todo" || T.status === "pending_approval";
  }), p = r.filter(function(T) {
    return T.status === "completed";
  }), w = d.filter(function(T) {
    return T.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs(Wu, { title: s.displayName, onClose: v, children: [
    o ? /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Active Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Hs, { tracker: o, isAdmin: !1 })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsxs("h4", { className: aa.heading, children: [
        "Tasks (",
        p.length,
        "/",
        r.length,
        " completed)"
      ] }),
      h.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending tasks" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: h.map(function(T) {
        return /* @__PURE__ */ i.jsxs("li", { className: aa.listItem, children: [
          T.text.split(`
`)[0],
          /* @__PURE__ */ i.jsx("span", { className: aa.status, children: T.status })
        ] }, T.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: aa.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: aa.heading, children: "Pending Suggestions" }),
      w.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No pending suggestions" }) : /* @__PURE__ */ i.jsx("ul", { className: aa.list, children: w.map(function(T) {
        return /* @__PURE__ */ i.jsx("li", { className: aa.listItem, children: T.description }, T.id);
      }) })
    ] })
  ] });
}
const Fx = "_section_10rik_1", Wx = "_heading_10rik_9", Ix = "_grid_10rik_19", Px = "_invoiceList_10rik_31", ej = "_invoiceItem_10rik_49", hl = {
  section: Fx,
  heading: Wx,
  grid: Ix,
  invoiceList: Px,
  invoiceItem: ej
};
function tj() {
  var s = ye(), r = Qn(), d = Oo(), o = Ls(), v = Uh(), h = Oh(), [p, w] = E.useState(null), T = o.tasks.filter(function(U) {
    return U.type === "cost-tracker" && U.status === "pending_approval";
  });
  function D(U) {
    var L = h.activity.find(function(Q) {
      return Q.user === U;
    });
    return !!(L && L.action === "login");
  }
  function j(U) {
    var L = o.tasks.filter(function(k) {
      return k.assignedTo === U && k.type !== "demerit";
    });
    if (L.length === 0) return 0;
    var Q = L.filter(function(k) {
      return k.status === "completed";
    });
    return Math.round(Q.length / L.length * 100);
  }
  function y(U) {
    var L = v.suggestions.filter(function(k) {
      return k.suggestedBy === U && k.status === "pending";
    }).length, Q = o.tasks.filter(function(k) {
      return k.assignedTo === U && k.appealStatus === "pending";
    }).length;
    return L + Q;
  }
  function z(U) {
    return d.trackers.find(function(L) {
      return Array.isArray(L.assigned_to) && L.assigned_to.includes(U);
    });
  }
  var R = p ? r.slaves.find(function(U) {
    return U.username === p;
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
      T.length === 0 ? /* @__PURE__ */ i.jsx(He, { title: "No invoices awaiting approval" }) : /* @__PURE__ */ i.jsx("ul", { className: hl.invoiceList, children: T.map(function(U) {
        return /* @__PURE__ */ i.jsxs("li", { className: hl.invoiceItem, children: [
          /* @__PURE__ */ i.jsx("span", { children: U.text.split(`
`)[0] }),
          /* @__PURE__ */ i.jsx(
            Y,
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
        Xx,
        {
          slave: U,
          online: D(U.username),
          tracker: z(U.username),
          pendingCount: y(U.username),
          completionRate: j(U.username),
          onClick: function() {
            w(U.username);
          }
        },
        U.username
      );
    }) }),
    R ? /* @__PURE__ */ i.jsx(
      $x,
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
          w(null);
        }
      }
    ) : null
  ] });
}
function aj({ activeTab: s }) {
  var r = ye();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(R1, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(q1, {});
    case "overview":
      return r.isMaster ? /* @__PURE__ */ i.jsx(tj, {}) : null;
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(h_, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Ax, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(N_, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(rS, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(gb, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(zS, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(ab, {}) : null;
    default:
      return null;
  }
}
function lj() {
  var s = ye(), [r, d] = E.useState("tasks"), o = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", "data-theme": s.themeMode, style: o, children: [
    /* @__PURE__ */ i.jsx(Hp, {}),
    /* @__PURE__ */ i.jsx(Yp, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsx("main", { className: "betaContainer", children: /* @__PURE__ */ i.jsx(aj, { activeTab: r }) })
  ] });
}
function nj() {
  return /* @__PURE__ */ i.jsx(V0, { children: /* @__PURE__ */ i.jsx(lj, {}) });
}
var Gn = null;
function uj(s) {
  Gn || (Gn = X0.createRoot(s), Gn.render(/* @__PURE__ */ i.jsx(nj, {})));
}
function ij() {
  Gn && (Gn.unmount(), Gn = null);
}
export {
  uj as mountBetaApp,
  ij as unmountBetaApp
};
