var No = { exports: {} }, Bu = {};
var fh;
function q0() {
  if (fh) return Bu;
  fh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, m) {
    var p = null;
    if (m !== void 0 && (p = "" + m), v.key !== void 0 && (p = "" + v.key), "key" in v) {
      m = {};
      for (var T in v)
        T !== "key" && (m[T] = v[T]);
    } else m = v;
    return v = m.ref, {
      $$typeof: s,
      type: o,
      key: p,
      ref: v !== void 0 ? v : null,
      props: m
    };
  }
  return Bu.Fragment = r, Bu.jsx = d, Bu.jsxs = d, Bu;
}
var dh;
function Y0() {
  return dh || (dh = 1, No.exports = q0()), No.exports;
}
var i = Y0(), To = { exports: {} }, qu = {}, wo = { exports: {} }, Eo = {};
var vh;
function G0() {
  return vh || (vh = 1, function(s) {
    function r(Q, q) {
      var K = Q.length;
      Q.push(q);
      e: for (; 0 < K; ) {
        var ce = K - 1 >>> 1, he = Q[ce];
        if (0 < v(he, q))
          Q[ce] = q, Q[K] = he, K = ce;
        else break e;
      }
    }
    function d(Q) {
      return Q.length === 0 ? null : Q[0];
    }
    function o(Q) {
      if (Q.length === 0) return null;
      var q = Q[0], K = Q.pop();
      if (K !== q) {
        Q[0] = K;
        e: for (var ce = 0, he = Q.length, ot = he >>> 1; ce < ot; ) {
          var ba = 2 * (ce + 1) - 1, pl = Q[ba], _ = ba + 1, L = Q[_];
          if (0 > v(pl, K))
            _ < he && 0 > v(L, pl) ? (Q[ce] = L, Q[_] = K, ce = _) : (Q[ce] = pl, Q[ba] = K, ce = ba);
          else if (_ < he && 0 > v(L, K))
            Q[ce] = L, Q[_] = K, ce = _;
          else break e;
        }
      }
      return q;
    }
    function v(Q, q) {
      var K = Q.sortIndex - q.sortIndex;
      return K !== 0 ? K : Q.id - q.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      s.unstable_now = function() {
        return m.now();
      };
    } else {
      var p = Date, T = p.now();
      s.unstable_now = function() {
        return p.now() - T;
      };
    }
    var j = [], M = [], A = 1, y = null, R = 3, z = !1, D = !1, H = !1, B = !1, Z = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function re(Q) {
      for (var q = d(M); q !== null; ) {
        if (q.callback === null) o(M);
        else if (q.startTime <= Q)
          o(M), q.sortIndex = q.expirationTime, r(j, q);
        else break;
        q = d(M);
      }
    }
    function Le(Q) {
      if (H = !1, re(Q), !D)
        if (d(j) !== null)
          D = !0, Ue || (Ue = !0, $e());
        else {
          var q = d(M);
          q !== null && Me(Le, q.startTime - Q);
        }
    }
    var Ue = !1, V = -1, ne = 5, Qe = -1;
    function Be() {
      return B ? !0 : !(s.unstable_now() - Qe < ne);
    }
    function We() {
      if (B = !1, Ue) {
        var Q = s.unstable_now();
        Qe = Q;
        var q = !0;
        try {
          e: {
            D = !1, H && (H = !1, te(V), V = -1), z = !0;
            var K = R;
            try {
              t: {
                for (re(Q), y = d(j); y !== null && !(y.expirationTime > Q && Be()); ) {
                  var ce = y.callback;
                  if (typeof ce == "function") {
                    y.callback = null, R = y.priorityLevel;
                    var he = ce(
                      y.expirationTime <= Q
                    );
                    if (Q = s.unstable_now(), typeof he == "function") {
                      y.callback = he, re(Q), q = !0;
                      break t;
                    }
                    y === d(j) && o(j), re(Q);
                  } else o(j);
                  y = d(j);
                }
                if (y !== null) q = !0;
                else {
                  var ot = d(M);
                  ot !== null && Me(
                    Le,
                    ot.startTime - Q
                  ), q = !1;
                }
              }
              break e;
            } finally {
              y = null, R = K, z = !1;
            }
            q = void 0;
          }
        } finally {
          q ? $e() : Ue = !1;
        }
      }
    }
    var $e;
    if (typeof X == "function")
      $e = function() {
        X(We);
      };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), Xe = P.port2;
      P.port1.onmessage = We, $e = function() {
        Xe.postMessage(null);
      };
    } else
      $e = function() {
        Z(We, 0);
      };
    function Me(Q, q) {
      V = Z(function() {
        Q(s.unstable_now());
      }, q);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(Q) {
      Q.callback = null;
    }, s.unstable_forceFrameRate = function(Q) {
      0 > Q || 125 < Q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ne = 0 < Q ? Math.floor(1e3 / Q) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, s.unstable_next = function(Q) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = R;
      }
      var K = R;
      R = q;
      try {
        return Q();
      } finally {
        R = K;
      }
    }, s.unstable_requestPaint = function() {
      B = !0;
    }, s.unstable_runWithPriority = function(Q, q) {
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
      var K = R;
      R = Q;
      try {
        return q();
      } finally {
        R = K;
      }
    }, s.unstable_scheduleCallback = function(Q, q, K) {
      var ce = s.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ce + K : ce) : K = ce, Q) {
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
      return he = K + he, Q = {
        id: A++,
        callback: q,
        priorityLevel: Q,
        startTime: K,
        expirationTime: he,
        sortIndex: -1
      }, K > ce ? (Q.sortIndex = K, r(M, Q), d(j) === null && Q === d(M) && (H ? (te(V), V = -1) : H = !0, Me(Le, K - ce))) : (Q.sortIndex = he, r(j, Q), D || z || (D = !0, Ue || (Ue = !0, $e()))), Q;
    }, s.unstable_shouldYield = Be, s.unstable_wrapCallback = function(Q) {
      var q = R;
      return function() {
        var K = R;
        R = q;
        try {
          return Q.apply(this, arguments);
        } finally {
          R = K;
        }
      };
    };
  }(Eo)), Eo;
}
var mh;
function Q0() {
  return mh || (mh = 1, wo.exports = G0()), wo.exports;
}
var Ao = { exports: {} }, le = {};
var hh;
function X0() {
  if (hh) return le;
  hh = 1;
  var s = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), p = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), M = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), R = Symbol.for("react.view_transition"), z = Symbol.iterator;
  function D(_) {
    return _ === null || typeof _ != "object" ? null : (_ = z && _[z] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, B = Object.assign, Z = {};
  function te(_, L, W) {
    this.props = _, this.context = L, this.refs = Z, this.updater = W || H;
  }
  te.prototype.isReactComponent = {}, te.prototype.setState = function(_, L) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, L, "setState");
  }, te.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function X() {
  }
  X.prototype = te.prototype;
  function re(_, L, W) {
    this.props = _, this.context = L, this.refs = Z, this.updater = W || H;
  }
  var Le = re.prototype = new X();
  Le.constructor = re, B(Le, te.prototype), Le.isPureReactComponent = !0;
  var Ue = Array.isArray;
  function V() {
  }
  var ne = { H: null, A: null, T: null, S: null }, Qe = Object.prototype.hasOwnProperty;
  function Be(_, L, W) {
    var I = W.ref;
    return {
      $$typeof: s,
      type: _,
      key: L,
      ref: I !== void 0 ? I : null,
      props: W
    };
  }
  function We(_, L) {
    return Be(_.type, L, _.props);
  }
  function $e(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === s;
  }
  function P(_) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(W) {
      return L[W];
    });
  }
  var Xe = /\/+/g;
  function Me(_, L) {
    return typeof _ == "object" && _ !== null && _.key != null ? P("" + _.key) : L.toString(36);
  }
  function Q(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(V, V) : (_.status = "pending", _.then(
          function(L) {
            _.status === "pending" && (_.status = "fulfilled", _.value = L);
          },
          function(L) {
            _.status === "pending" && (_.status = "rejected", _.reason = L);
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
  function q(_, L, W, I, _e) {
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
            case A:
              return xe = _._init, q(
                xe(_._payload),
                L,
                W,
                I,
                _e
              );
          }
      }
    if (xe)
      return _e = _e(_), xe = I === "" ? "." + Me(_, 0) : I, Ue(_e) ? (W = "", xe != null && (W = xe.replace(Xe, "$&/") + "/"), q(_e, L, W, "", function(xa) {
        return xa;
      })) : _e != null && ($e(_e) && (_e = We(
        _e,
        W + (_e.key == null || _ && _.key === _e.key ? "" : ("" + _e.key).replace(
          Xe,
          "$&/"
        ) + "/") + xe
      )), L.push(_e)), 1;
    xe = 0;
    var $ = I === "" ? "." : I + ":";
    if (Ue(_))
      for (var ae = 0; ae < _.length; ae++)
        I = _[ae], Se = $ + Me(I, ae), xe += q(
          I,
          L,
          W,
          Se,
          _e
        );
    else if (ae = D(_), typeof ae == "function")
      for (_ = ae.call(_), ae = 0; !(I = _.next()).done; )
        I = I.value, Se = $ + Me(I, ae++), xe += q(
          I,
          L,
          W,
          Se,
          _e
        );
    else if (Se === "object") {
      if (typeof _.then == "function")
        return q(
          Q(_),
          L,
          W,
          I,
          _e
        );
      throw L = String(_), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xe;
  }
  function K(_, L, W) {
    if (_ == null) return _;
    var I = [], _e = 0;
    return q(_, I, "", "", function(Se) {
      return L.call(W, Se, _e++);
    }), I;
  }
  function ce(_) {
    if (_._status === -1) {
      var L = _._result, W = L();
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
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  };
  function ot(_) {
    var L = ne.T, W = {};
    W.types = L !== null ? L.types : null, ne.T = W;
    try {
      var I = _(), _e = ne.S;
      _e !== null && _e(W, I), typeof I == "object" && I !== null && typeof I.then == "function" && I.then(V, he);
    } catch (Se) {
      he(Se);
    } finally {
      L !== null && W.types !== null && (L.types = W.types), ne.T = L;
    }
  }
  function ba(_) {
    var L = ne.T;
    if (L !== null) {
      var W = L.types;
      W === null ? L.types = [_] : W.indexOf(_) === -1 && W.push(_);
    } else ot(ba.bind(null, _));
  }
  var pl = {
    map: K,
    forEach: function(_, L, W) {
      K(
        _,
        function() {
          L.apply(this, arguments);
        },
        W
      );
    },
    count: function(_) {
      var L = 0;
      return K(_, function() {
        L++;
      }), L;
    },
    toArray: function(_) {
      return K(_, function(L) {
        return L;
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
  return le.Activity = y, le.Children = pl, le.Component = te, le.Fragment = d, le.Profiler = v, le.PureComponent = re, le.StrictMode = o, le.Suspense = j, le.ViewTransition = R, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ne, le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ne.H.useMemoCache(_);
    }
  }, le.addTransitionType = ba, le.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, le.cacheSignal = function() {
    return null;
  }, le.cloneElement = function(_, L, W) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var I = B({}, _.props), _e = _.key;
    if (L != null)
      for (Se in L.key !== void 0 && (_e = "" + L.key), L)
        !Qe.call(L, Se) || Se === "key" || Se === "__self" || Se === "__source" || Se === "ref" && L.ref === void 0 || (I[Se] = L[Se]);
    var Se = arguments.length - 2;
    if (Se === 1) I.children = W;
    else if (1 < Se) {
      for (var xe = Array(Se), $ = 0; $ < Se; $++)
        xe[$] = arguments[$ + 2];
      I.children = xe;
    }
    return Be(_.type, _e, I);
  }, le.createContext = function(_) {
    return _ = {
      $$typeof: p,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: m,
      _context: _
    }, _;
  }, le.createElement = function(_, L, W) {
    var I, _e = {}, Se = null;
    if (L != null)
      for (I in L.key !== void 0 && (Se = "" + L.key), L)
        Qe.call(L, I) && I !== "key" && I !== "__self" && I !== "__source" && (_e[I] = L[I]);
    var xe = arguments.length - 2;
    if (xe === 1) _e.children = W;
    else if (1 < xe) {
      for (var $ = Array(xe), ae = 0; ae < xe; ae++)
        $[ae] = arguments[ae + 2];
      _e.children = $;
    }
    if (_ && _.defaultProps)
      for (I in xe = _.defaultProps, xe)
        _e[I] === void 0 && (_e[I] = xe[I]);
    return Be(_, Se, _e);
  }, le.createRef = function() {
    return { current: null };
  }, le.forwardRef = function(_) {
    return { $$typeof: T, render: _ };
  }, le.isValidElement = $e, le.lazy = function(_) {
    return {
      $$typeof: A,
      _payload: { _status: -1, _result: _ },
      _init: ce
    };
  }, le.memo = function(_, L) {
    return {
      $$typeof: M,
      type: _,
      compare: L === void 0 ? null : L
    };
  }, le.startTransition = ot, le.unstable_useCacheRefresh = function() {
    return ne.H.useCacheRefresh();
  }, le.use = function(_) {
    return ne.H.use(_);
  }, le.useActionState = function(_, L, W) {
    return ne.H.useActionState(_, L, W);
  }, le.useCallback = function(_, L) {
    return ne.H.useCallback(_, L);
  }, le.useContext = function(_) {
    return ne.H.useContext(_);
  }, le.useDebugValue = function() {
  }, le.useDeferredValue = function(_, L) {
    return ne.H.useDeferredValue(_, L);
  }, le.useEffect = function(_, L) {
    return ne.H.useEffect(_, L);
  }, le.useEffectEvent = function(_) {
    return ne.H.useEffectEvent(_);
  }, le.useId = function() {
    return ne.H.useId();
  }, le.useImperativeHandle = function(_, L, W) {
    return ne.H.useImperativeHandle(_, L, W);
  }, le.useInsertionEffect = function(_, L) {
    return ne.H.useInsertionEffect(_, L);
  }, le.useLayoutEffect = function(_, L) {
    return ne.H.useLayoutEffect(_, L);
  }, le.useMemo = function(_, L) {
    return ne.H.useMemo(_, L);
  }, le.useOptimistic = function(_, L) {
    return ne.H.useOptimistic(_, L);
  }, le.useReducer = function(_, L, W) {
    return ne.H.useReducer(_, L, W);
  }, le.useRef = function(_) {
    return ne.H.useRef(_);
  }, le.useState = function(_) {
    return ne.H.useState(_);
  }, le.useSyncExternalStore = function(_, L, W) {
    return ne.H.useSyncExternalStore(
      _,
      L,
      W
    );
  }, le.useTransition = function() {
    return ne.H.useTransition();
  }, le.version = "19.3.1", le;
}
var gh;
function Lo() {
  return gh || (gh = 1, Ao.exports = X0()), Ao.exports;
}
var Co = { exports: {} }, rt = {};
var yh;
function V0() {
  if (yh) return rt;
  yh = 1;
  var s = Lo();
  function r(A) {
    var y = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        y += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + A + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, v = Symbol.for("react.portal"), m = Symbol.for("react.recoverable"), p = Symbol.for("react.optimistic_key");
  function T(A, y, R) {
    var z = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: z == null ? null : z === p ? p : "" + z,
      children: A,
      containerInfo: y,
      implementation: R
    };
  }
  var j = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function M(A, y) {
    if (A === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return rt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, rt.browser = function(A) {
    return { $$typeof: m, _reason: A };
  }, rt.createPortal = function(A, y) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(r(299));
    return T(A, y, null, R);
  }, rt.flushSync = function(A) {
    var y = j.T, R = o.p;
    try {
      if (j.T = null, o.p = 2, A) return A();
    } finally {
      j.T = y, o.p = R, o.d.f();
    }
  }, rt.preconnect = function(A, y) {
    typeof A == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, o.d.C(A, y));
  }, rt.prefetchDNS = function(A) {
    typeof A == "string" && o.d.D(A);
  }, rt.preinit = function(A, y) {
    if (typeof A == "string" && y && typeof y.as == "string") {
      var R = y.as, z = M(R, y.crossOrigin), D = typeof y.integrity == "string" ? y.integrity : void 0, H = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      R === "style" ? o.d.S(
        A,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: z,
          integrity: D,
          fetchPriority: H
        }
      ) : R === "script" && o.d.X(A, {
        crossOrigin: z,
        integrity: D,
        fetchPriority: H,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, rt.preinitModule = function(A, y) {
    if (typeof A == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var R = M(
            y.as,
            y.crossOrigin
          );
          o.d.M(A, {
            crossOrigin: R,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
          });
        }
      } else y == null && o.d.M(A);
  }, rt.preload = function(A, y) {
    if (typeof A == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var R = y.as, z = M(R, y.crossOrigin);
      o.d.L(A, R, {
        crossOrigin: z,
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
  }, rt.preloadModule = function(A, y) {
    if (typeof A == "string")
      if (y) {
        var R = M(y.as, y.crossOrigin);
        o.d.m(A, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: R,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0
        });
      } else o.d.m(A);
  }, rt.requestFormReset = function(A) {
    o.d.r(A);
  }, rt.unstable_batchedUpdates = function(A, y) {
    return A(y);
  }, rt.useFormState = function(A, y, R) {
    return j.H.useFormState(A, y, R);
  }, rt.useFormStatus = function() {
    return j.H.useHostTransitionStatus();
  }, rt.version = "19.3.1", rt;
}
var ph;
function Z0() {
  if (ph) return Co.exports;
  ph = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), Co.exports = V0(), Co.exports;
}
var _h;
function K0() {
  if (_h) return qu;
  _h = 1;
  var s = Q0(), r = Lo(), d = Z0();
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
  function m(e) {
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
  function T(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function j(e) {
    if (m(e) !== e)
      throw Error(o(188));
  }
  function M(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(o(188));
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
          if (u === a) return j(n), e;
          if (u === l) return j(n), t;
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
  function R(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function z(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function D(e) {
    var t = [null, null], a = R(e);
    return a === null || H(
      t,
      e,
      a.child,
      { foundSelf: !1 }
    ), t;
  }
  function H(e, t, a, l) {
    for (; a !== null; ) {
      if (a === t) l.foundSelf = !0;
      else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
        if (l.foundSelf) return e[1] = a, !0;
        e[0] = a;
      } else if ((a.tag !== 22 || a.memoizedState === null) && H(
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
  function B(e) {
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
  var Z = null, te = null;
  function X(e, t, a) {
    return e === a ? !0 : e === t ? (Z = e, !0) : !1;
  }
  function re(e, t, a) {
    return e === a ? (te = e, !1) : e === t ? (te !== null && (Z = e), !0) : !1;
  }
  function Le(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function Ue(e, t, a) {
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
  var V = Object.assign, ne = Symbol.for("react.element"), Qe = Symbol.for("react.transitional.element"), Be = Symbol.for("react.portal"), We = Symbol.for("react.fragment"), $e = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), Xe = Symbol.for("react.consumer"), Me = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), he = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), ba = Symbol.for("react.legacy_hidden"), pl = Symbol.for("react.memo_cache_sentinel"), _ = Symbol.for("react.view_transition"), L = Symbol.for("react.recoverable"), W = Symbol.iterator;
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
      case K:
        return "SuspenseList";
      case ot:
        return "Activity";
      case _:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Be:
          return "Portal";
        case Me:
          return e.displayName || "Context";
        case Xe:
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
  var xe = Array.isArray, $ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, xa = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Qs = [], Xl = -1;
  function ia(e) {
    return { current: e };
  }
  function at(e) {
    0 > Xl || (e.current = Qs[Xl], Qs[Xl] = null, Xl--);
  }
  function De(e, t) {
    Xl++, Qs[Xl] = e.current, e.current = t;
  }
  var sa = ia(null), Vn = ia(null), Ga = ia(null), Pu = ia(null);
  function ei(e, t) {
    switch (De(Ga, t), De(Vn, e), De(sa, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Sm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Sm(t), e = bm(t, e);
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
    at(sa), De(sa, e);
  }
  function Vl() {
    at(sa), at(Vn), at(Ga);
  }
  function Xs(e) {
    var t = e.memoizedState;
    t !== null && (Rn._currentValue = t.memoizedState, De(Pu, e)), t = sa.current;
    var a = bm(t, e.type);
    t !== a && (De(Vn, e), De(sa, a));
  }
  function ti(e) {
    Vn.current === e && (at(sa), at(Vn)), Pu.current === e && (at(Pu), Rn._currentValue = xa);
  }
  var Vs, Yo;
  function Qa(e) {
    if (Vs === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Vs = t && t[1] || "", Yo = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Vs + e + Yo;
  }
  var Zs = !1;
  function Ks(e, t) {
    if (!e || Zs) return "";
    Zs = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var U = function() {
                throw Error();
              };
              if (Object.defineProperty(U.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(U, []);
                } catch (Y) {
                  var S = Y;
                }
                Reflect.construct(e, [], U);
              } else {
                try {
                  U.call();
                } catch (Y) {
                  S = Y;
                }
                U = !1;
                try {
                  var E = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), U = !0, new e();
                } finally {
                  U && (E !== void 0 ? Object.defineProperty(e.prototype, "props", E) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                S = Y;
              }
              (U = e()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && S && typeof Y.stack == "string")
              return [Y.stack, S.stack];
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
        var h = c.split(`
`), x = f.split(`
`);
        for (n = l = 0; l < h.length && !h[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < x.length && !x[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === h.length || n === x.length)
          for (l = h.length - 1, n = x.length - 1; 1 <= l && 0 <= n && h[l] !== x[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (h[l] !== x[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || h[l] !== x[n]) {
                  var C = `
` + h[l].replace(" at new ", " at ");
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), C;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Zs = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Qa(a) : "";
  }
  function Xh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Qa(e.type);
      case 16:
        return Qa("Lazy");
      case 13:
        return e.child !== t && t !== null ? Qa("Suspense Fallback") : Qa("Suspense");
      case 19:
        return Qa("SuspenseList");
      case 0:
      case 15:
        return Ks(e.type, !1);
      case 11:
        return Ks(e.type.render, !1);
      case 1:
        return Ks(e.type, !0);
      case 31:
        return Qa("Activity");
      case 30:
        return Qa("ViewTransition");
      default:
        return "";
    }
  }
  function Go(e) {
    try {
      var t = "", a = null;
      do
        t += Xh(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Js = Object.prototype.hasOwnProperty, ks = s.unstable_scheduleCallback, $s = s.unstable_cancelCallback, Vh = s.unstable_shouldYield, Zh = s.unstable_requestPaint, wt = s.unstable_now, Kh = s.unstable_getCurrentPriorityLevel, Qo = s.unstable_ImmediatePriority, Xo = s.unstable_UserBlockingPriority, ai = s.unstable_NormalPriority, Jh = s.unstable_LowPriority, Vo = s.unstable_IdlePriority, kh = s.log, $h = s.unstable_setDisableYieldValue, Zn = null, Et = null;
  function Xa(e) {
    if (typeof kh == "function" && $h(e), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(Zn, e);
      } catch {
      }
  }
  var At = Math.clz32 ? Math.clz32 : Ih, Fh = Math.log, Wh = Math.LN2;
  function Ih(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Fh(e) / Wh | 0) | 0;
  }
  var li = 256, ni = 262144, ui = 4194304;
  function _l(e) {
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
  function ii(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = e.suspendedLanes, c = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = _l(l) : (c &= f, c !== 0 ? n = _l(c) : a || (a = f & ~e, a !== 0 && (n = _l(a))))) : (f = l & ~u, f !== 0 ? n = _l(f) : c !== 0 ? n = _l(c) : a || (a = l & ~e, a !== 0 && (n = _l(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Kn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Zo(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var l = 31 - At(a), n = 1 << l;
        t |= e[l], a &= ~n;
      }
    return t;
  }
  function Ph(e, t) {
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
  function Ko() {
    var e = ui;
    return ui <<= 1, (ui & 62914560) === 0 && (ui = 4194304), e;
  }
  function Fs(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Jn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function eg(e, t, a, l, n, u) {
    var c = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, h = e.expirationTimes, x = e.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var C = 31 - At(a), U = 1 << C;
      f[C] = 0, h[C] = -1;
      var S = x[C];
      if (S !== null)
        for (x[C] = null, C = 0; C < S.length; C++) {
          var E = S[C];
          E !== null && (E.lane &= -536870913);
        }
      a &= ~U;
    }
    l !== 0 && Jo(e, l, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(c & ~t));
  }
  function Jo(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - At(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 261930;
  }
  function ko(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - At(a), n = 1 << l;
      n & t | e[l] & t && (e[l] |= t), a &= ~n;
    }
  }
  function $o(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : Ws(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Ws(e) {
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
  function Is(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Fo() {
    var e = ae.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : nh(e.type));
  }
  function Wo(e, t) {
    var a = ae.p;
    try {
      return ae.p = e, t();
    } finally {
      ae.p = a;
    }
  }
  var ja = Math.random().toString(36).slice(2), lt = "__reactFiber$" + ja, pt = "__reactProps$" + ja, Zl = "__reactContainer$" + ja, Io = "__reactEvents$" + ja, tg = "__reactListeners$" + ja, ag = "__reactHandles$" + ja, Po = "__reactResources$" + ja, kn = "__reactMarker$" + ja, si = "__reactLoad$" + ja;
  function ci(e) {
    delete e[lt], delete e[pt], delete e[tg], delete e[ag];
  }
  function Sl(e) {
    var t;
    if (t = e[lt]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Zl] || a[lt]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Bm(e); e !== null; ) {
            if (a = e[lt]) return a;
            e = Bm(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Kl(e) {
    if (e = e[lt] || e[Zl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function $n(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Jl(e) {
    var t = e[Po];
    return t || (t = e[Po] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ie(e) {
    e[kn] = !0;
  }
  function ef(e) {
    e[si] = void 0;
  }
  var tf = /* @__PURE__ */ new Set(), af = {};
  function bl(e, t) {
    kl(e, t), kl(e + "Capture", t);
  }
  function kl(e, t) {
    for (af[e] = t, e = 0; e < t.length; e++)
      tf.add(t[e]);
  }
  var lg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), lf = {}, nf = {};
  function ng(e) {
    return Js.call(nf, e) ? !0 : Js.call(lf, e) ? !1 : lg.test(e) ? nf[e] = !0 : (lf[e] = !0, !1);
  }
  var be = !1;
  function uf() {
    var e = be;
    return be = !1, e;
  }
  function ri(e, t, a) {
    if (ng(t))
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
  function oi(e, t, a) {
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
  function Na(e, t, a, l) {
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
  function sf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ug(e, t, a) {
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
  function Ps(e) {
    if (!e._valueTracker) {
      var t = sf(e) ? "checked" : "value";
      e._valueTracker = ug(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function cf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = sf(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  var ig = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      ig,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ec(e, t, a, l, n, u, c, f) {
    e.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.type = c : e.removeAttribute("type"), t != null ? c === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ct(t)) : e.value !== "" + Ct(t) && (e.value = "" + Ct(t)) : c !== "submit" && c !== "reset" || e.removeAttribute("value"), t != null ? c === "number" && e.value == t ? tc(e, Ct(e.value)) : tc(e, Ct(t)) : a != null ? tc(e, Ct(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + Ct(f) : e.removeAttribute("name");
  }
  function rf(e, t, a, l, n, u, c, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Ps(e);
        return;
      }
      a = a != null ? "" + Ct(a) : "", t = t != null ? "" + Ct(t) : a, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = f ? e.checked : !!l, e.defaultChecked = !!l, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.name = c), Ps(e);
  }
  function tc(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function $l(e, t, a, l) {
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
  function of(e, t, a) {
    if (t != null && (t = "" + Ct(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + Ct(a) : "";
  }
  function ff(e, t, a, l) {
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
    a = Ct(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Ps(e);
  }
  function Fl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var sg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function df(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || sg.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function vf(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "", be = !0);
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (df(e, n, l), be = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && df(e, u, t[u]);
  }
  function ac(e) {
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
  var cg = /* @__PURE__ */ new Map([
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
  ]), rg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function fi(e) {
    return rg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ca() {
  }
  var lc = null;
  function nc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wl = null, Il = null;
  function mf(e) {
    var t = Kl(e);
    if (t && (e = t.stateNode)) {
      var a = e[pt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (ec(
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
                ec(
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
              l = a[t], l.form === e.form && cf(l);
          }
          break e;
        case "textarea":
          of(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && $l(e, !!a.multiple, t, !1);
      }
    }
  }
  var uc = !1;
  function hf(e, t, a) {
    if (uc) return e(t, a);
    uc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (uc = !1, (Wl !== null || Il !== null) && (fs(), Wl && (t = Wl, e = Il, Il = Wl = null, mf(t), e)))
        for (t = 0; t < e.length; t++) mf(e[t]);
    }
  }
  function Fn(e, t) {
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
  var Ta = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ic = !1;
  if (Ta)
    try {
      var Wn = {};
      Object.defineProperty(Wn, "passive", {
        get: function() {
          ic = !0;
        }
      }), window.addEventListener("test", Wn, Wn), window.removeEventListener("test", Wn, Wn);
    } catch {
      ic = !1;
    }
  var Va = null, sc = null, di = null;
  function gf() {
    if (di) return di;
    var e, t = sc, a = t.length, l, n = "value" in Va ? Va.value : Va.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var c = a - e;
    for (l = 1; l <= c && t[a - l] === n[u - l]; l++) ;
    return di = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function vi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function mi() {
    return !0;
  }
  function yf() {
    return !1;
  }
  function vt(e) {
    function t(a, l, n, u, c) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var f in e)
        e.hasOwnProperty(f) && (a = e[f], this[f] = a ? a(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? mi : yf, this.isPropagationStopped = yf, this;
    }
    return V(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = mi);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = mi);
      },
      persist: function() {
      },
      isPersistent: mi
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
  }, hi = vt(Za), In = V({}, Za, { view: 0, detail: 0 }), og = vt(In), cc, rc, Pn, gi = V({}, In, {
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
    getModifierState: fc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Pn && (Pn && e.type === "mousemove" ? (cc = e.screenX - Pn.screenX, rc = e.screenY - Pn.screenY) : rc = cc = 0, Pn = e), cc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : rc;
    }
  }), pf = vt(gi), fg = V({}, gi, { dataTransfer: 0 }), dg = vt(fg), vg = V({}, In, { relatedTarget: 0 }), oc = vt(vg), mg = V({}, Za, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hg = vt(mg), gg = V({}, Za, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), yg = vt(gg), pg = V({}, Za, { data: 0 }), _f = vt(pg), _g = {
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
  }, Sg = {
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
  }, bg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function xg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = bg[e]) ? !!t[e] : !1;
  }
  function fc() {
    return xg;
  }
  var jg = V({}, In, {
    key: function(e) {
      if (e.key) {
        var t = _g[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = vi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fc,
    charCode: function(e) {
      return e.type === "keypress" ? vi(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? vi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ng = vt(jg), Tg = V({}, gi, {
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
  }), Sf = vt(Tg), wg = V({}, Za, { submitter: 0 }), Eg = vt(wg), Ag = V({}, In, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fc
  }), Cg = vt(Ag), Dg = V({}, Za, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), zg = vt(Dg), Rg = V({}, gi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Mg = vt(Rg), Og = V({}, Za, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Ug = vt(Og), Hg = [9, 13, 27, 32], dc = Ta && "CompositionEvent" in window, eu = null;
  Ta && "documentMode" in document && (eu = document.documentMode);
  var Lg = Ta && "TextEvent" in window && !eu, bf = Ta && (!dc || eu && 8 < eu && 11 >= eu), xf = " ", jf = !1;
  function Nf(e, t) {
    switch (e) {
      case "keyup":
        return Hg.indexOf(t.keyCode) !== -1;
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
  function Tf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Pl = !1;
  function Bg(e, t) {
    switch (e) {
      case "compositionend":
        return Tf(t);
      case "keypress":
        return t.which !== 32 ? null : (jf = !0, xf);
      case "textInput":
        return e = t.data, e === xf && jf ? null : e;
      default:
        return null;
    }
  }
  function qg(e, t) {
    if (Pl)
      return e === "compositionend" || !dc && Nf(e, t) ? (e = gf(), di = sc = Va = null, Pl = !1, e) : null;
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
        return bf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Yg = {
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
  function wf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Yg[e.type] : t === "textarea";
  }
  function Ef(e, t, a, l) {
    Wl ? Il ? Il.push(l) : Il = [l] : Wl = l, t = ys(t, "onChange"), 0 < t.length && (a = new hi(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var tu = null, au = null;
  function Gg(e) {
    mm(e, 0);
  }
  function yi(e) {
    var t = $n(e);
    if (cf(t)) return e;
  }
  function Af(e, t) {
    if (e === "change") return t;
  }
  var Cf = !1;
  if (Ta) {
    var vc;
    if (Ta) {
      var mc = "oninput" in document;
      if (!mc) {
        var Df = document.createElement("div");
        Df.setAttribute("oninput", "return;"), mc = typeof Df.oninput == "function";
      }
      vc = mc;
    } else vc = !1;
    Cf = vc && (!document.documentMode || 9 < document.documentMode);
  }
  function zf() {
    tu && (tu.detachEvent("onpropertychange", Rf), au = tu = null);
  }
  function Rf(e) {
    if (e.propertyName === "value" && yi(au)) {
      var t = [];
      Ef(
        t,
        au,
        e,
        nc(e)
      ), hf(Gg, t);
    }
  }
  function Qg(e, t, a) {
    e === "focusin" ? (zf(), tu = t, au = a, tu.attachEvent("onpropertychange", Rf)) : e === "focusout" && zf();
  }
  function Xg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return yi(au);
  }
  function Vg(e, t) {
    if (e === "click") return yi(t);
  }
  function Zg(e, t) {
    if (e === "input" || e === "change")
      return yi(t);
  }
  function Kg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Dt = typeof Object.is == "function" ? Object.is : Kg;
  function lu(e, t) {
    if (Dt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Js.call(t, n) || !Dt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function hc(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Mf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Of(e, t) {
    var a = Mf(e);
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
      a = Mf(a);
    }
  }
  function Uf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Uf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Hf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = hc(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = hc(e.document);
    }
    return t;
  }
  function gc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Jg = Ta && "documentMode" in document && 11 >= document.documentMode, en = null, yc = null, nu = null, pc = !1;
  function Lf(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    pc || en == null || en !== hc(l) || (l = en, "selectionStart" in l && gc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), nu && lu(nu, l) || (nu = l, l = ys(yc, "onSelect"), 0 < l.length && (t = new hi(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = en)));
  }
  function xl(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var tn = {
    animationend: xl("Animation", "AnimationEnd"),
    animationiteration: xl("Animation", "AnimationIteration"),
    animationstart: xl("Animation", "AnimationStart"),
    transitionrun: xl("Transition", "TransitionRun"),
    transitionstart: xl("Transition", "TransitionStart"),
    transitioncancel: xl("Transition", "TransitionCancel"),
    transitionend: xl("Transition", "TransitionEnd")
  }, _c = {}, Bf = {};
  Ta && (Bf = document.createElement("div").style, "AnimationEvent" in window || (delete tn.animationend.animation, delete tn.animationiteration.animation, delete tn.animationstart.animation), "TransitionEvent" in window || delete tn.transitionend.transition);
  function jl(e) {
    if (_c[e]) return _c[e];
    if (!tn[e]) return e;
    var t = tn[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Bf)
        return _c[e] = t[a];
    return e;
  }
  var qf = jl("animationend"), Yf = jl("animationiteration"), Gf = jl("animationstart"), kg = jl("transitionrun"), $g = jl("transitionstart"), Fg = jl("transitioncancel"), Qf = jl("transitionend"), Xf = /* @__PURE__ */ new Map(), Sc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Sc.push("scrollEnd");
  function Wt(e, t) {
    Xf.set(e, t), bl(t, [e]);
  }
  var Wg = 0;
  function wa(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = ta.identifierPrefix;
    var a = Wg++;
    return e = "_" + e + "t_" + a.toString(32) + "_", t.autoName = e;
  }
  function Vf(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, a = xn;
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
  function Ea(e, t) {
    return e = Vf(e), t = Vf(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var pi = typeof reportError == "function" ? reportError : function(e) {
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
  }, Yt = [], an = 0, bc = 0;
  function _i() {
    for (var e = an, t = bc = an = 0; t < e; ) {
      var a = Yt[t];
      Yt[t++] = null;
      var l = Yt[t];
      Yt[t++] = null;
      var n = Yt[t];
      Yt[t++] = null;
      var u = Yt[t];
      if (Yt[t++] = null, l !== null && n !== null) {
        var c = l.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), l.pending = n;
      }
      u !== 0 && Zf(a, n, u);
    }
  }
  function Si(e, t, a, l) {
    Yt[an++] = e, Yt[an++] = t, Yt[an++] = a, Yt[an++] = l, bc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function xc(e, t, a, l) {
    return Si(e, t, a, l), bi(e);
  }
  function Nl(e, t) {
    return Si(e, null, null, t), bi(e);
  }
  function Zf(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = e.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - At(a), e = u.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), u) : null;
  }
  function bi(e) {
    if (50 < wu)
      throw wu = 0, os = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ln = {};
  function Ig(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, a, l) {
    return new Ig(e, t, a, l);
  }
  function jc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Aa(e, t) {
    var a = e.alternate;
    return a === null ? (a = _t(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 1206910976, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function Kf(e, t) {
    e.flags &= 1206910978;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function xi(e, t, a, l, n, u) {
    var c = 0;
    if (l = e, typeof l == "function") jc(l) && (c = 1);
    else if (typeof l == "string")
      c = w0(
        e,
        a,
        sa.current
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
        case K:
          return e = _t(19, a, t, n), e.elementType = K, e.lanes = u, e;
        case ba:
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
  function Tl(e, t, a, l) {
    return e = _t(7, e, l, t), e.lanes = a, e;
  }
  function Nc(e, t, a) {
    return e = _t(6, e, null, t), e.lanes = a, e;
  }
  function Jf(e) {
    var t = _t(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Tc(e, t, a) {
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
  var kf = /* @__PURE__ */ new WeakMap();
  function Gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = kf.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: Go(t)
      }, kf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Go(t)
    };
  }
  var nn = [], un = 0, ji = null, uu = 0, Qt = [], Xt = 0, Ka = null, ra = 1, oa = "";
  function Ca(e, t) {
    nn[un++] = uu, nn[un++] = ji, ji = e, uu = t;
  }
  function $f(e, t, a) {
    Qt[Xt++] = ra, Qt[Xt++] = oa, Qt[Xt++] = Ka, Ka = e;
    var l = ra;
    e = oa;
    var n = 32 - At(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - At(t) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (l & (1 << c) - 1).toString(32), l >>= c, n -= c, ra = 1 << 32 - At(t) + n | a << n | l, oa = u + e;
    } else
      ra = 1 << u | a << n | l, oa = e;
  }
  function Ni(e) {
    e.return !== null && (Ca(e, 1), $f(e, 1, 0));
  }
  function wc(e) {
    for (; e === ji; )
      ji = nn[--un], nn[un] = null, uu = nn[--un], nn[un] = null;
    for (; e === Ka; )
      Ka = Qt[--Xt], Qt[Xt] = null, oa = Qt[--Xt], Qt[Xt] = null, ra = Qt[--Xt], Qt[Xt] = null;
  }
  function Ff(e, t) {
    Qt[Xt++] = ra, Qt[Xt++] = oa, Qt[Xt++] = Ka, ra = t.id, oa = t.overflow, Ka = e;
  }
  var Pe = null, ze = null, oe = !1, Ja = null, Vt = !1, Ec = Error(o(519));
  function ka(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw iu(Gt(t, e)), Ec;
  }
  function Wf(e) {
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
        for (a = 0; a < Au.length; a++)
          de(Au[a], t);
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
        de("invalid", t), rf(
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
        de("invalid", t), ff(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || pm(t.textContent, a) ? (l.popover != null && (de("beforetoggle", t), de("toggle", t)), l.onScroll != null && de("scroll", t), l.onScrollEnd != null && de("scrollend", t), l.onClick != null && (t.onclick = ca), t = !0) : t = !1, t || ka(e, !0);
  }
  function Ti(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
        case 5:
        case 31:
        case 13:
          Vt = !1;
          return;
        case 27:
        case 3:
          Vt = !0;
          return;
        default:
          Pe = Pe.return;
      }
  }
  function sn(e) {
    if (e !== Pe) return !1;
    if (!oe) return Ti(e), oe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || lo(e.type, e.memoizedProps)), a = !a), a && ze && ka(e), Ti(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      ze = Lm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      ze = Lm(e);
    } else
      t === 27 ? (t = ze, ol(e.type) ? (e = vo, vo = null, ze = e) : ze = t) : ze = Pe ? Kt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function wl() {
    ze = Pe = null, oe = !1;
  }
  function Ac() {
    var e = Ja;
    return e !== null && (xt === null ? xt = e : xt.push.apply(
      xt,
      e
    ), Ja = null), e;
  }
  function iu(e) {
    Ja === null ? Ja = [e] : Ja.push(e);
  }
  var Cc = ia(null), El = null, Da = null;
  function $a(e, t, a) {
    De(Cc, t._currentValue), t._currentValue = a;
  }
  function za(e) {
    e._currentValue = Cc.current, at(Cc);
  }
  function wi(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function Dc(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var h = 0; h < t.length; h++)
            if (f.context === t[h]) {
              u.lanes |= a, f = u.alternate, f !== null && (f.lanes |= a), wi(
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
        c.lanes |= a, u = c.alternate, u !== null && (u.lanes |= a), wi(c, a, e), c = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), wi(
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
  function Al(e, t, a, l) {
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
          Dt(n.pendingProps.value, c.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === Pu.current) {
        if (c = n.alternate, c === null) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Rn) : e = [Rn]);
      }
      n = n.return;
    }
    return e !== null && Dc(
      t,
      e,
      a,
      l
    ), t.flags |= 262144, e !== null;
  }
  function Ei(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Dt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Cl(e) {
    El = e, Da = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function nt(e) {
    return If(El, e);
  }
  function Ai(e, t) {
    return El === null && Cl(e), If(e, t);
  }
  function If(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Da === null) {
      if (e === null) throw Error(o(308));
      Da = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Da = Da.next = t;
    return a;
  }
  var Pg = typeof AbortController < "u" ? AbortController : function() {
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
  }, ey = s.unstable_scheduleCallback, ty = s.unstable_NormalPriority, Ze = {
    $$typeof: Me,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function zc() {
    return {
      controller: new Pg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function su(e) {
    e.refCount--, e.refCount === 0 && ey(ty, function() {
      e.controller.abort();
    });
  }
  function Pf(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var a = e.transitionTypes;
      for (a === null && (a = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var l = t[e];
        a.indexOf(l) === -1 && a.push(l);
      }
    }
  }
  var cu = null;
  function ay(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var ru = null, Rc = 0, Dl = 0, cn = null;
  function ly(e, t) {
    if (ru === null) {
      var a = ru = [];
      Rc = 0, Dl = kr(), cn = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return Rc++, t.then(ed, ed), t;
  }
  function ed() {
    if (--Rc === 0 && (cu = null, ru !== null)) {
      cn !== null && (cn.status = "fulfilled");
      var e = ru;
      ru = null, Dl = 0, cn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ny(e, t) {
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
  var td = $.S;
  $.S = function(e, t) {
    if (Jv = wt(), typeof t == "object" && t !== null && typeof t.then == "function" && ly(e, t), cu !== null)
      for (var a = wn; a !== null; )
        Pf(a, cu), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = wn; l !== null; )
        Pf(l, a), l = l.next;
      if (Dl !== 0) {
        l = cu, l === null && (l = cu = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    td !== null && td(e, t);
  };
  var zl = ia(null);
  function Mc() {
    var e = zl.current;
    return e !== null ? e : Ce.pooledCache;
  }
  function Ci(e, t) {
    t === null ? De(zl, zl.current) : De(zl, t.pool);
  }
  function ad() {
    var e = Mc();
    return e === null ? null : { parent: Ze._currentValue, pool: e };
  }
  var rn = Error(o(460)), Oc = Error(o(474)), Di = Error(o(542)), zi = { then: function() {
  } };
  function ld(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function nd(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ca, ca), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, id(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(ca, ca);
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
            throw e = t.reason, id(e), e;
        }
        throw Ml = t, rn;
    }
  }
  function Rl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ml = a, rn) : a;
    }
  }
  var Ml = null;
  function ud() {
    if (Ml === null) throw Error(o(459));
    var e = Ml;
    return Ml = null, e;
  }
  function id(e) {
    if (e === rn || e === Di)
      throw Error(o(483));
  }
  var on = null, ou = 0;
  function Ri(e) {
    var t = ou;
    return ou += 1, on === null && (on = []), nd(on, e, t);
  }
  function Fa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Mi(e, t) {
    throw t.$$typeof === ne ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function sd(e) {
    function t(b, g) {
      if (e) {
        var w = b.deletions;
        w === null ? (b.deletions = [g], b.flags |= 16) : w.push(g);
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
      return b = Aa(b, g), b.index = 0, b.sibling = null, b;
    }
    function u(b, g, w) {
      return b.index = w, e ? (w = b.alternate, w !== null ? (w = w.index, w < g ? (b.flags |= 2, g) : w) : (b.flags |= 134217730, g)) : (b.flags |= 1048576, g);
    }
    function c(b) {
      return e && b.alternate === null && (b.flags |= 134217730), b;
    }
    function f(b, g, w, O) {
      return g === null || g.tag !== 6 ? (g = Nc(w, b.mode, O), g.return = b, g) : (g = n(g, w), g.return = b, g);
    }
    function h(b, g, w, O) {
      var J = w.type;
      return J === We ? (b = C(
        b,
        g,
        w.props.children,
        O,
        w.key
      ), Fa(b, w), b) : g !== null && (g.elementType === J || typeof J == "object" && J !== null && J.$$typeof === he && Rl(J) === g.type) ? (g = n(g, w.props), Fa(g, w), g.return = b, g) : (g = xi(
        w.type,
        w.key,
        w.props,
        null,
        b.mode,
        O
      ), Fa(g, w), g.return = b, g);
    }
    function x(b, g, w, O) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== w.containerInfo || g.stateNode.implementation !== w.implementation ? (g = Tc(w, b.mode, O), g.return = b, g) : (g = n(g, w.children || []), g.return = b, g);
    }
    function C(b, g, w, O, J) {
      return g === null || g.tag !== 7 ? (g = Tl(
        w,
        b.mode,
        O,
        J
      ), g.return = b, g) : (g = n(g, w), g.return = b, g);
    }
    function U(b, g, w) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = Nc(
          "" + g,
          b.mode,
          w
        ), g.return = b, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case Qe:
            return w = xi(
              g.type,
              g.key,
              g.props,
              null,
              b.mode,
              w
            ), Fa(w, g), w.return = b, w;
          case Be:
            return g = Tc(
              g,
              b.mode,
              w
            ), g.return = b, g;
          case he:
            return g = Rl(g), U(b, g, w);
        }
        if (xe(g) || I(g))
          return g = Tl(
            g,
            b.mode,
            w,
            null
          ), g.return = b, g;
        if (typeof g.then == "function")
          return U(b, Ri(g), w);
        if (g.$$typeof === Me)
          return U(
            b,
            Ai(b, g),
            w
          );
        Mi(b, g);
      }
      return null;
    }
    function S(b, g, w, O) {
      var J = g !== null ? g.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return J !== null ? null : f(b, g, "" + w, O);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Qe:
            return w.key === J ? h(b, g, w, O) : null;
          case Be:
            return w.key === J ? x(b, g, w, O) : null;
          case he:
            return w = Rl(w), S(b, g, w, O);
        }
        if (xe(w) || I(w))
          return J !== null ? null : C(b, g, w, O, null);
        if (typeof w.then == "function")
          return S(
            b,
            g,
            Ri(w),
            O
          );
        if (w.$$typeof === Me)
          return S(
            b,
            g,
            Ai(b, w),
            O
          );
        Mi(b, w);
      }
      return null;
    }
    function E(b, g, w, O, J) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return b = b.get(w) || null, f(g, b, "" + O, J);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case Qe:
            return b = b.get(
              O.key === null ? w : O.key
            ) || null, h(g, b, O, J);
          case Be:
            return b = b.get(
              O.key === null ? w : O.key
            ) || null, x(g, b, O, J);
          case he:
            return O = Rl(O), E(
              b,
              g,
              w,
              O,
              J
            );
        }
        if (xe(O) || I(O))
          return b = b.get(w) || null, C(g, b, O, J, null);
        if (typeof O.then == "function")
          return E(
            b,
            g,
            w,
            Ri(O),
            J
          );
        if (O.$$typeof === Me)
          return E(
            b,
            g,
            w,
            Ai(g, O),
            J
          );
        Mi(g, O);
      }
      return null;
    }
    function Y(b, g, w, O) {
      for (var J = null, me = null, F = g, ee = g = 0, ke = null; F !== null && ee < w.length; ee++) {
        F.index > ee ? (ke = F, F = null) : ke = F.sibling;
        var pe = S(
          b,
          F,
          w[ee],
          O
        );
        if (pe === null) {
          F === null && (F = ke);
          break;
        }
        e && F && pe.alternate === null && t(b, F), g = u(pe, g, ee), me === null ? J = pe : me.sibling = pe, me = pe, F = ke;
      }
      if (ee === w.length)
        return a(b, F), oe && Ca(b, ee), J;
      if (F === null) {
        for (; ee < w.length; ee++)
          F = U(b, w[ee], O), F !== null && (g = u(
            F,
            g,
            ee
          ), me === null ? J = F : me.sibling = F, me = F);
        return oe && Ca(b, ee), J;
      }
      for (F = l(F); ee < w.length; ee++)
        ke = E(
          F,
          b,
          ee,
          w[ee],
          O
        ), ke !== null && (e && (pe = ke.alternate, pe !== null && F.delete(pe.key === null ? ee : pe.key)), g = u(
          ke,
          g,
          ee
        ), me === null ? J = ke : me.sibling = ke, me = ke);
      return e && F.forEach(function(hl) {
        return t(b, hl);
      }), oe && Ca(b, ee), J;
    }
    function k(b, g, w, O) {
      if (w == null) throw Error(o(151));
      for (var J = null, me = null, F = g, ee = g = 0, ke = null, pe = w.next(); F !== null && !pe.done; ee++, pe = w.next()) {
        F.index > ee ? (ke = F, F = null) : ke = F.sibling;
        var hl = S(b, F, pe.value, O);
        if (hl === null) {
          F === null && (F = ke);
          break;
        }
        e && F && hl.alternate === null && t(b, F), g = u(hl, g, ee), me === null ? J = hl : me.sibling = hl, me = hl, F = ke;
      }
      if (pe.done)
        return a(b, F), oe && Ca(b, ee), J;
      if (F === null) {
        for (; !pe.done; ee++, pe = w.next())
          pe = U(b, pe.value, O), pe !== null && (g = u(pe, g, ee), me === null ? J = pe : me.sibling = pe, me = pe);
        return oe && Ca(b, ee), J;
      }
      for (F = l(F); !pe.done; ee++, pe = w.next())
        pe = E(F, b, ee, pe.value, O), pe !== null && (e && (ke = pe.alternate, ke !== null && F.delete(
          ke.key === null ? ee : ke.key
        )), g = u(pe, g, ee), me === null ? J = pe : me.sibling = pe, me = pe);
      return e && F.forEach(function(B0) {
        return t(b, B0);
      }), oe && Ca(b, ee), J;
    }
    function se(b, g, w, O) {
      if (typeof w == "object" && w !== null && w.type === We && w.key === null && w.props.ref === void 0 && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Qe:
            e: {
              for (var J = w.key; g !== null; ) {
                if (g.key === J) {
                  if (J = w.type, J === We) {
                    if (g.tag === 7) {
                      a(
                        b,
                        g.sibling
                      ), O = n(
                        g,
                        w.props.children
                      ), Fa(O, w), O.return = b, b = O;
                      break e;
                    }
                  } else if (g.elementType === J || typeof J == "object" && J !== null && J.$$typeof === he && Rl(J) === g.type) {
                    a(
                      b,
                      g.sibling
                    ), O = n(g, w.props), Fa(O, w), O.return = b, b = O;
                    break e;
                  }
                  a(b, g);
                  break;
                } else t(b, g);
                g = g.sibling;
              }
              w.type === We ? (O = Tl(
                w.props.children,
                b.mode,
                O,
                w.key
              ), Fa(O, w), O.return = b, b = O) : (O = xi(
                w.type,
                w.key,
                w.props,
                null,
                b.mode,
                O
              ), Fa(O, w), O.return = b, b = O);
            }
            return c(b);
          case Be:
            e: {
              for (J = w.key; g !== null; ) {
                if (g.key === J)
                  if (g.tag === 4 && g.stateNode.containerInfo === w.containerInfo && g.stateNode.implementation === w.implementation) {
                    a(
                      b,
                      g.sibling
                    ), O = n(g, w.children || []), O.return = b, b = O;
                    break e;
                  } else {
                    a(b, g);
                    break;
                  }
                else t(b, g);
                g = g.sibling;
              }
              O = Tc(w, b.mode, O), O.return = b, b = O;
            }
            return c(b);
          case he:
            return w = Rl(w), se(
              b,
              g,
              w,
              O
            );
        }
        if (xe(w))
          return Y(
            b,
            g,
            w,
            O
          );
        if (I(w)) {
          if (J = I(w), typeof J != "function") throw Error(o(150));
          return w = J.call(w), k(
            b,
            g,
            w,
            O
          );
        }
        if (typeof w.then == "function")
          return se(
            b,
            g,
            Ri(w),
            O
          );
        if (w.$$typeof === Me)
          return se(
            b,
            g,
            Ai(b, w),
            O
          );
        Mi(b, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint" ? (w = "" + w, g !== null && g.tag === 6 ? (a(b, g.sibling), O = n(g, w), O.return = b, b = O) : (a(b, g), O = Nc(w, b.mode, O), O.return = b, b = O), c(b)) : a(b, g);
    }
    return function(b, g, w, O) {
      try {
        ou = 0;
        var J = se(
          b,
          g,
          w,
          O
        );
        return on = null, J;
      } catch (F) {
        if (F === rn || F === Di) throw F;
        var me = _t(29, F, null, b.mode);
        return me.lanes = O, me.return = b, me;
      } finally {
      }
    };
  }
  var Ol = sd(!0), cd = sd(!1), Wa = !1;
  function Uc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Hc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ia(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Pa(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (je & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = bi(e), Zf(e, null, a), t;
    }
    return Si(e, l, t, a), bi(e);
  }
  function fu(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, ko(e, a);
    }
  }
  function Lc(e, t) {
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
  var Bc = !1;
  function du() {
    if (Bc) {
      var e = cn;
      if (e !== null) throw e;
    }
  }
  function vu(e, t, a, l) {
    Bc = !1;
    var n = e.updateQueue;
    Wa = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var h = f, x = h.next;
      h.next = null, c === null ? u = x : c.next = x, c = h;
      var C = e.alternate;
      C !== null && (C = C.updateQueue, f = C.lastBaseUpdate, f !== c && (f === null ? C.firstBaseUpdate = x : f.next = x, C.lastBaseUpdate = h));
    }
    if (u !== null) {
      var U = n.baseState;
      c = 0, C = x = h = null, f = u;
      do {
        var S = f.lane & -536870913, E = S !== f.lane;
        if (E ? (ve & S) === S : (l & S) === S) {
          S !== 0 && S === Dl && (Bc = !0), C !== null && (C = C.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var Y = e, k = f;
            S = t;
            var se = a;
            switch (k.tag) {
              case 1:
                if (Y = k.payload, typeof Y == "function") {
                  U = Y.call(se, U, S);
                  break e;
                }
                U = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = k.payload, S = typeof Y == "function" ? Y.call(se, U, S) : Y, S == null) break e;
                U = V({}, U, S);
                break e;
              case 2:
                Wa = !0;
            }
          }
          S = f.callback, S !== null && (e.flags |= 64, E && (e.flags |= 8192), E = n.callbacks, E === null ? n.callbacks = [S] : E.push(S));
        } else
          E = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, C === null ? (x = C = E, h = U) : C = C.next = E, c |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          E = f, f = E.next, E.next = null, n.lastBaseUpdate = E, n.shared.pending = null;
        }
      } while (!0);
      C === null && (h = U), n.baseState = h, n.firstBaseUpdate = x, n.lastBaseUpdate = C, u === null && (n.shared.lanes = 0), il |= c, e.lanes = c, e.memoizedState = U;
    }
  }
  function rd(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function od(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        rd(a[e], t);
  }
  var el = ia(null), Oi = ia(0);
  function fd(e, t) {
    e = Ha, De(Oi, e), De(el, t), Ha = e | t.baseLanes;
  }
  function qc() {
    De(Oi, Ha), De(el, el.current);
  }
  function Yc() {
    Ha = Oi.current, at(el), at(Oi);
  }
  var ut = ia(null), ft = null;
  function tl(e) {
    var t = e.alternate;
    De(it, it.current & 1), De(ut, e), ft === null && (t === null || el.current !== null || t.memoizedState !== null) && (ft = e);
  }
  function Gc(e) {
    De(it, it.current), De(ut, e), ft === null && (ft = e);
  }
  function dd(e) {
    e.tag === 22 ? (De(it, it.current), De(ut, e), ft === null && (ft = e)) : al();
  }
  function al() {
    De(it, it.current), De(ut, ut.current);
  }
  function zt(e) {
    at(ut), ft === e && (ft = null), at(it);
  }
  var it = ia(0);
  function mu(e, t) {
    De(ut, ut.current), De(it, t);
  }
  function Qc(e) {
    at(it), at(ut), ft === e && (ft = null);
  }
  function Ui(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || oo(a) || fo(a)))
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
  var Ra = 0, ie = null, Ae = null, Ke = null, Hi = !1, fn = !1, Ul = !1, Li = 0, hu = 0, dn = null, uy = 0;
  function Ye() {
    throw Error(o(321));
  }
  function Xc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!Dt(e[a], t[a])) return !1;
    return !0;
  }
  function Vc(e, t, a, l, n, u) {
    return Ra = u, ie = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $.H = e === null || e.memoizedState === null ? $d : Fd, Ul = !1, u = a(l, n), Ul = !1, fn && (u = md(
      t,
      a,
      l,
      n
    )), vd(e), u;
  }
  function vd(e) {
    $.H = Vi;
    var t = Ae !== null && Ae.next !== null;
    if (Ra = 0, Ke = Ae = ie = null, Hi = !1, hu = 0, dn = null, t) throw Error(o(300));
    e === null || Je || (e = e.dependencies, e !== null && Ei(e) && (Je = !0));
  }
  function md(e, t, a, l) {
    ie = e;
    var n = 0;
    do {
      if (fn && (dn = null), hu = 0, fn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ke = Ae = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      $.H = vy, u = t(a, l);
    } while (fn);
    return u;
  }
  function iy() {
    var e = $.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? gu(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (ie.flags |= 1024), t;
  }
  function Zc() {
    var e = Li !== 0;
    return Li = 0, e;
  }
  function Kc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Jc(e) {
    if (Hi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Hi = !1;
    }
    Ra = 0, Ke = Ae = ie = null, fn = !1, hu = Li = 0, dn = null;
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
  function Bi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function gu(e) {
    var t = hu;
    return hu += 1, dn === null && (dn = []), e = nd(dn, e, t), t = ie, (Ke === null ? t.memoizedState : Ke.next) === null && (t = t.alternate, $.H = t === null || t.memoizedState === null ? $d : Fd), e;
  }
  function qi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return gu(e);
      if (e.$$typeof === L) return;
      if (e.$$typeof === Me) return nt(e);
    }
    throw Error(o(438, String(e)));
  }
  function kc(e) {
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
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Bi(), ie.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = pl;
    return t.index++, a;
  }
  function Ma(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Yi(e) {
    var t = Ve();
    return $c(t, Ae, e);
  }
  function $c(e, t, a) {
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
      var f = c = null, h = null, x = t, C = !1;
      do {
        var U = x.lane & -536870913;
        if (U !== x.lane ? (ve & U) === U : (Ra & U) === U) {
          var S = x.revertLane;
          if (S === 0)
            h !== null && (h = h.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), U === Dl && (C = !0);
          else if ((Ra & S) === S) {
            x = x.next, S === Dl && (C = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, h === null ? (f = h = U, c = u) : h = h.next = U, ie.lanes |= S, il |= S;
          U = x.action, Ul && a(u, U), u = x.hasEagerState ? x.eagerState : a(u, U);
        } else
          S = {
            lane: U,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, h === null ? (f = h = S, c = u) : h = h.next = S, ie.lanes |= U, il |= U;
        x = x.next;
      } while (x !== null && x !== t);
      if (h === null ? c = u : h.next = f, !Dt(u, e.memoizedState) && (Je = !0, C && (a = cn, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = c, e.baseQueue = h, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Fc(e) {
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
      Dt(u, t.memoizedState) || (Je = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function hd(e, t, a) {
    var l = ie, n = Ve(), u = oe;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var c = !Dt(
      (Ae || n).memoizedState,
      a
    );
    if (c && (n.memoizedState = a, Je = !0), n = n.queue, Pc(pd.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || c || Ke !== null && (Ke.memoizedState.tag & 1) !== 0, vn(
      e ? 9 : 8,
      { destroy: void 0 },
      yd.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, Ce === null) throw Error(o(349));
      u || (Ra & 127) !== 0 || gd(l, t, a);
    }
    return a;
  }
  function gd(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ie.updateQueue, t === null ? (t = Bi(), ie.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function yd(e, t, a, l) {
    t.value = a, t.getSnapshot = l, _d(t) && Sd(e);
  }
  function pd(e, t, a) {
    return a(function() {
      _d(t) && Sd(e);
    });
  }
  function _d(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !Dt(e, a);
    } catch {
      return !0;
    }
  }
  function Sd(e) {
    var t = Nl(e, 2);
    t !== null && jt(t, e, 2);
  }
  function Wc(e) {
    var t = mt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Ul) {
        Xa(!0);
        try {
          a();
        } finally {
          Xa(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ma,
      lastRenderedState: e
    }, t;
  }
  function bd(e, t, a, l) {
    return e.baseState = a, $c(
      e,
      Ae,
      typeof l == "function" ? l : Ma
    );
  }
  function sy(e, t, a, l, n) {
    if (Xi(e)) throw Error(o(485));
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
      $.T !== null ? a(!0) : u.isTransition = !1, l(u), a = t.pending, a === null ? (u.next = t.pending = u, xd(t, u)) : (u.next = a.next, t.pending = a.next = u);
    }
  }
  function xd(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var u = $.T, c = {};
      c.types = u !== null ? u.types : null, $.T = c;
      try {
        var f = a(n, l), h = $.S;
        h !== null && h(c, f), jd(e, t, f);
      } catch (x) {
        Ic(e, t, x);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), $.T = u;
      }
    } else
      try {
        u = a(n, l), jd(e, t, u);
      } catch (x) {
        Ic(e, t, x);
      }
  }
  function jd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Nd(e, t, l);
      },
      function(l) {
        return Ic(e, t, l);
      }
    ) : Nd(e, t, a);
  }
  function Nd(e, t, a) {
    t.status = "fulfilled", t.value = a, Td(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, xd(e, a)));
  }
  function Ic(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, Td(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Td(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function wd(e, t) {
    return t;
  }
  function Ed(e, t) {
    if (oe) {
      var a = Ce.formState;
      if (a !== null) {
        e: {
          var l = ie;
          if (oe) {
            if (ze) {
              t: {
                for (var n = ze, u = Vt; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = Kt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                ze = Kt(
                  n.nextSibling
                ), l = n.data === "F!";
                break e;
              }
            }
            ka(l);
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
      lastRenderedReducer: wd,
      lastRenderedState: t
    }, a.queue = l, a = Kd.bind(
      null,
      ie,
      l
    ), l.dispatch = a, l = Wc(!1), u = nr.bind(
      null,
      ie,
      !1,
      l.queue
    ), l = mt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = sy.bind(
      null,
      ie,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function Ad(e) {
    var t = Ve();
    return Cd(t, Ae, e);
  }
  function Cd(e, t, a) {
    if (t = $c(
      e,
      t,
      wd
    )[0], e = Yi(Ma)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = gu(t);
      } catch (c) {
        throw c === rn ? Di : c;
      }
    else l = t;
    t = Ve();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (ie.flags |= 2048, vn(
      9,
      { destroy: void 0 },
      cy.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function cy(e, t) {
    e.action = t;
  }
  function Dd(e) {
    var t = Ve(), a = Ae;
    if (a !== null)
      return Cd(t, a, e);
    Ve(), t = t.memoizedState, a = Ve();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function vn(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = ie.updateQueue, t === null && (t = Bi(), ie.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function zd() {
    return Ve().memoizedState;
  }
  function Gi(e, t, a, l) {
    var n = mt();
    ie.flags |= e, n.memoizedState = vn(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Qi(e, t, a, l) {
    var n = Ve();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Ae !== null && l !== null && Xc(l, Ae.memoizedState.deps) ? n.memoizedState = vn(t, u, a, l) : (ie.flags |= e, n.memoizedState = vn(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Rd(e, t) {
    Gi(8390656, 8, e, t);
  }
  function Pc(e, t) {
    Qi(2048, 8, e, t);
  }
  function ry(e) {
    ie.flags |= 4;
    var t = ie.updateQueue;
    if (t === null)
      t = Bi(), ie.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Md(e) {
    var t = Ve().memoizedState;
    return ry({ ref: t, nextImpl: e }), function() {
      if ((je & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Od(e, t) {
    return Qi(4, 2, e, t);
  }
  function Ud(e, t) {
    return Qi(4, 4, e, t);
  }
  function Hd(e, t) {
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
  function Ld(e, t, a) {
    a = a != null ? a.concat([e]) : null, Qi(4, 4, Hd.bind(null, t, e), a);
  }
  function er() {
  }
  function Bd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Xc(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function qd(e, t) {
    var a = Ve();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Xc(t, l[1]))
      return l[0];
    if (l = e(), Ul) {
      Xa(!0);
      try {
        e();
      } finally {
        Xa(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function tr(e, t, a) {
    return a === void 0 || (Ra & 1073741824) !== 0 && (ve & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = $v(), ie.lanes |= e, il |= e, a);
  }
  function Yd(e, t, a, l) {
    return Dt(a, t) ? a : el.current !== null ? (e = tr(e, a, l), Dt(e, t) || (Je = !0), e) : (Ra & 106) === 0 || (Ra & 1073741824) !== 0 && (ve & 261930) === 0 ? (Je = !0, e.memoizedState = a) : (e = $v(), ie.lanes |= e, il |= e, t);
  }
  function Gd(e, t, a, l, n) {
    var u = ae.p;
    ae.p = u !== 0 && 8 > u ? u : 8;
    var c = $.T, f = {};
    f.types = c !== null ? c.types : null, $.T = f, nr(e, !1, t, a);
    try {
      var h = n(), x = $.S;
      if (x !== null && x(f, h), h !== null && typeof h == "object" && typeof h.then == "function") {
        var C = ny(
          h,
          l
        );
        yu(
          e,
          t,
          C,
          Ut(e)
        );
      } else
        yu(
          e,
          t,
          l,
          Ut(e)
        );
    } catch (U) {
      yu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: U },
        Ut()
      );
    } finally {
      ae.p = u, c !== null && f.types !== null && (c.types = f.types), $.T = c;
    }
  }
  function oy() {
  }
  function ar(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Qd(e).queue;
    Gd(
      e,
      n,
      t,
      xa,
      a === null ? oy : function() {
        return Xd(e), a(l);
      }
    );
  }
  function Qd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: xa,
      baseState: xa,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ma,
        lastRenderedState: xa
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
        lastRenderedReducer: Ma,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Xd(e) {
    var t = Qd(e);
    t.next === null && (t = e.alternate.memoizedState), yu(
      e,
      t.next.queue,
      {},
      Ut()
    );
  }
  function lr() {
    return nt(Rn);
  }
  function Vd() {
    return Ve().memoizedState;
  }
  function Zd() {
    return Ve().memoizedState;
  }
  function fy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Ut();
          e = Ia(a);
          var l = Pa(t, e, a);
          l !== null && (jt(l, t, a), fu(l, t, a)), t = { cache: zc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function dy(e, t, a) {
    var l = Ut();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xi(e) ? Jd(t, a) : (a = xc(e, t, a, l), a !== null && (jt(a, e, l), kd(a, t, l)));
  }
  function Kd(e, t, a) {
    var l = Ut();
    yu(e, t, a, l);
  }
  function yu(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xi(e)) Jd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var c = t.lastRenderedState, f = u(c, a);
          if (n.hasEagerState = !0, n.eagerState = f, Dt(f, c))
            return Si(e, t, n, 0), Ce === null && _i(), !1;
        } catch {
        } finally {
        }
      if (a = xc(e, t, n, l), a !== null)
        return jt(a, e, l), kd(a, t, l), !0;
    }
    return !1;
  }
  function nr(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: kr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xi(e)) {
      if (t) throw Error(o(479));
    } else
      t = xc(
        e,
        a,
        l,
        2
      ), t !== null && jt(t, e, 2);
  }
  function Xi(e) {
    var t = e.alternate;
    return e === ie || t !== null && t === ie;
  }
  function Jd(e, t) {
    fn = Hi = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function kd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, ko(e, a);
    }
  }
  var Vi = {
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
  }, $d = {
    readContext: nt,
    use: qi,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: nt,
    useEffect: Rd,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Gi(
        4194308,
        4,
        Hd.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Gi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Gi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = mt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Ul) {
        Xa(!0);
        try {
          e();
        } finally {
          Xa(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = mt();
      if (a !== void 0) {
        var n = a(t);
        if (Ul) {
          Xa(!0);
          try {
            a(t);
          } finally {
            Xa(!1);
          }
        }
      } else n = t;
      return l.memoizedState = l.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, l.queue = e, e = e.dispatch = dy.bind(
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
      e = Wc(e);
      var t = e.queue, a = Kd.bind(null, ie, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: er,
    useDeferredValue: function(e, t) {
      var a = mt();
      return tr(a, e, t);
    },
    useTransition: function() {
      var e = Wc(!1);
      return e = Gd.bind(
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
        (ve & 127) !== 0 || gd(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, Rd(pd.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, vn(
        9,
        { destroy: void 0 },
        yd.bind(
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
        var a = oa, l = ra;
        a = (l & ~(1 << 32 - At(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Li++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = uy++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: lr,
    useFormState: Ed,
    useActionState: Ed,
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
      return t.queue = a, t = nr.bind(
        null,
        ie,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: kc,
    useCacheRefresh: function() {
      return mt().memoizedState = fy.bind(
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
  }, Fd = {
    readContext: nt,
    use: qi,
    useCallback: Bd,
    useContext: nt,
    useEffect: Pc,
    useImperativeHandle: Ld,
    useInsertionEffect: Od,
    useLayoutEffect: Ud,
    useMemo: qd,
    useReducer: Yi,
    useRef: zd,
    useState: function() {
      return Yi(Ma);
    },
    useDebugValue: er,
    useDeferredValue: function(e, t) {
      var a = Ve();
      return Yd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Yi(Ma)[0], t = Ve().memoizedState;
      return [
        typeof e == "boolean" ? e : gu(e),
        t
      ];
    },
    useSyncExternalStore: hd,
    useId: Vd,
    useHostTransitionStatus: lr,
    useFormState: Ad,
    useActionState: Ad,
    useOptimistic: function(e, t) {
      var a = Ve();
      return bd(a, Ae, e, t);
    },
    useMemoCache: kc,
    useCacheRefresh: Zd,
    useEffectEvent: Md
  }, vy = {
    readContext: nt,
    use: qi,
    useCallback: Bd,
    useContext: nt,
    useEffect: Pc,
    useImperativeHandle: Ld,
    useInsertionEffect: Od,
    useLayoutEffect: Ud,
    useMemo: qd,
    useReducer: Fc,
    useRef: zd,
    useState: function() {
      return Fc(Ma);
    },
    useDebugValue: er,
    useDeferredValue: function(e, t) {
      var a = Ve();
      return Ae === null ? tr(a, e, t) : Yd(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Fc(Ma)[0], t = Ve().memoizedState;
      return [
        typeof e == "boolean" ? e : gu(e),
        t
      ];
    },
    useSyncExternalStore: hd,
    useId: Vd,
    useHostTransitionStatus: lr,
    useFormState: Dd,
    useActionState: Dd,
    useOptimistic: function(e, t) {
      var a = Ve();
      return Ae !== null ? bd(a, Ae, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: Zd,
    useEffectEvent: Md
  };
  function ur(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : V({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var ir = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ut(), n = Ia(l);
      n.payload = t, a != null && (n.callback = a), t = Pa(e, n, l), t !== null && (jt(t, e, l), fu(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Ut(), n = Ia(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = Pa(e, n, l), t !== null && (jt(t, e, l), fu(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Ut(), l = Ia(a);
      l.tag = 2, t != null && (l.callback = t), t = Pa(e, l, a), t !== null && (jt(t, e, a), fu(t, e, a));
    }
  };
  function Wd(e, t, a, l, n, u, c) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, c) : t.prototype && t.prototype.isPureReactComponent ? !lu(a, l) || !lu(n, u) : !0;
  }
  function Id(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && ir.enqueueReplaceState(t, t.state, null);
  }
  function Hl(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = V({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function Pd(e) {
    pi(e);
  }
  function ev(e) {
    console.error(e);
  }
  function tv(e) {
    pi(e);
  }
  function Zi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function av(e, t, a) {
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
  function sr(e, t, a) {
    return a = Ia(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Zi(e, t);
    }, a;
  }
  function lv(e) {
    return e = Ia(e), e.tag = 3, e;
  }
  function nv(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      e.payload = function() {
        return n(u);
      }, e.callback = function() {
        av(t, a, l);
      };
    }
    var c = a.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (e.callback = function() {
      av(t, a, l), typeof n != "function" && (sl === null ? sl = /* @__PURE__ */ new Set([this]) : sl.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function my(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && Al(
        t,
        a,
        n,
        !0
      ), a = ut.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return ft === null ? ds() : a.alternate === null && Ge === 0 && (Ge = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Zr(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Zr(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Zr(e, l, n), ds(), !1;
    }
    if (oe)
      return t = ut.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== Ec && (e = Error(o(422), { cause: l }), iu(Gt(e, a)))) : (l !== Ec && (t = Error(o(423), {
        cause: l
      }), iu(
        Gt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Gt(l, a), n = sr(
        e.stateNode,
        l,
        n
      ), Lc(e, n), Ge !== 4 && (Ge = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Gt(u, a), Tu === null ? Tu = [u] : Tu.push(u), Ge !== 4 && (Ge = 2), t === null) return !0;
    l = Gt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = sr(a.stateNode, l, e), Lc(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (sl === null || !sl.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = lv(n), nv(
              n,
              e,
              a,
              l
            ), Lc(a, n), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var cr = Error(o(461)), Je = !1;
  function Fe(e, t, a, l) {
    t.child = e === null ? cd(t, null, a, l) : Ol(
      t,
      e.child,
      a,
      l
    );
  }
  function uv(e, t, a, l, n) {
    a = a.render;
    var u = t.ref;
    if ("ref" in l) {
      var c = {};
      for (var f in l)
        f !== "ref" && (c[f] = l[f]);
    } else c = l;
    return Cl(t), l = Vc(
      e,
      t,
      a,
      c,
      u,
      n
    ), f = Zc(), e !== null && !Je ? (Kc(e, t, n), Oa(e, t, n)) : (oe && f && Ni(t), t.flags |= 1, Fe(e, t, l, n), t.child);
  }
  function iv(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !jc(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, sv(
        e,
        t,
        u,
        l,
        n
      )) : (e = xi(
        a.type,
        null,
        l,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !gr(e, n)) {
      var c = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : lu, a(c, l) && e.ref === t.ref)
        return Oa(e, t, n);
    }
    return t.flags |= 1, e = Aa(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function sv(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (lu(u, l) && e.ref === t.ref)
        if (Je = !1, t.pendingProps = l = u, gr(e, n))
          (e.flags & 131072) !== 0 && (Je = !0);
        else
          return t.lanes = e.lanes, Oa(e, t, n);
    }
    return rr(
      e,
      t,
      a,
      l,
      n
    );
  }
  function cv(e, t, a, l) {
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
        return rv(
          e,
          t,
          u,
          a,
          l
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Ci(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? fd(t, u) : qc(), dd(t);
      else
        return l = t.lanes = 536870912, rv(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Ci(t, u.cachePool), fd(t, u), al(), t.memoizedState = null) : (e !== null && Ci(t, null), qc(), al());
    return Fe(e, t, n, a), t.child;
  }
  function pu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function rv(e, t, a, l, n) {
    var u = Mc();
    return u = u === null ? null : { parent: Ze._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ci(t, null), qc(), dd(t), e !== null && Al(e, t, l, !0), t.childLanes = n, null;
  }
  function Ki(e, t) {
    return t = Ji(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ov(e, t, a) {
    return Ol(t, e.child, null, a), e = Ki(t, t.pendingProps), e.flags |= 2, zt(t), t.memoizedState = null, e;
  }
  function hy(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (oe) {
        if (l.mode === "hidden")
          return e = Ki(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, pu(null, e);
        if (Gc(t), (e = ze) ? (e = Hm(
          e,
          Vt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ka !== null ? { id: ra, overflow: oa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Jf(e), a.return = t, t.child = a, Pe = t, ze = null)) : e = null, e === null) throw ka(t);
        return t.lanes = 536870912, null;
      }
      return Ki(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Gc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = ov(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Je || Al(e, t, a, !1), n = (a & e.childLanes) !== 0, Je || n) {
        if (el.current === null) {
          if (l = Ce, l !== null && (c = $o(l, a), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, Nl(e, c), jt(l, e, c), cr;
          ds();
        }
        t = ov(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, ze = Kt(c.nextSibling), Pe = t, oe = !0, Ja = null, Vt = !1, e !== null && Ff(t, e), t = Ki(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Aa(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function mn(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function rr(e, t, a, l, n) {
    return Cl(t), a = Vc(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Zc(), e !== null && !Je ? (Kc(e, t, n), Oa(e, t, n)) : (oe && l && Ni(t), t.flags |= 1, Fe(e, t, a, n), t.child);
  }
  function fv(e, t, a, l, n, u) {
    return Cl(t), t.updateQueue = null, a = md(
      t,
      l,
      a,
      n
    ), vd(e), l = Zc(), e !== null && !Je ? (Kc(e, t, u), Oa(e, t, u)) : (oe && l && Ni(t), t.flags |= 1, Fe(e, t, a, u), t.child);
  }
  function dv(e, t, a, l, n) {
    if (Cl(t), t.stateNode === null) {
      var u = ln, c = a.contextType;
      typeof c == "object" && c !== null && (u = nt(c)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ir, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, Uc(t), c = a.contextType, u.context = typeof c == "object" && c !== null ? nt(c) : ln, u.state = t.memoizedState, c = a.getDerivedStateFromProps, typeof c == "function" && (ur(
        t,
        a,
        c,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && ir.enqueueReplaceState(u, u.state, null), vu(t, l, u, n), du(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, h = Hl(a, f);
      u.props = h;
      var x = u.context, C = a.contextType;
      c = ln, typeof C == "object" && C !== null && (c = nt(C));
      var U = a.getDerivedStateFromProps;
      C = typeof U == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, C || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || x !== c) && Id(
        t,
        u,
        l,
        c
      ), Wa = !1;
      var S = t.memoizedState;
      u.state = S, vu(t, l, u, n), du(), x = t.memoizedState, f || S !== x || Wa ? (typeof U == "function" && (ur(
        t,
        a,
        U,
        l
      ), x = t.memoizedState), (h = Wa || Wd(
        t,
        a,
        h,
        l,
        S,
        x,
        c
      )) ? (C || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = x), u.props = l, u.state = x, u.context = c, l = h) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Hc(e, t), c = t.memoizedProps, C = Hl(a, c), u.props = C, U = t.pendingProps, S = u.context, x = a.contextType, h = ln, typeof x == "object" && x !== null && (h = nt(x)), f = a.getDerivedStateFromProps, (x = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== U || S !== h) && Id(
        t,
        u,
        l,
        h
      ), Wa = !1, S = t.memoizedState, u.state = S, vu(t, l, u, n), du();
      var E = t.memoizedState;
      c !== U || S !== E || Wa || e !== null && e.dependencies !== null && Ei(e.dependencies) ? (typeof f == "function" && (ur(
        t,
        a,
        f,
        l
      ), E = t.memoizedState), (C = Wa || Wd(
        t,
        a,
        C,
        l,
        S,
        E,
        h
      ) || e !== null && e.dependencies !== null && Ei(e.dependencies)) ? (x || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, E, h), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        E,
        h
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = E), u.props = l, u.state = E, u.context = h, l = C) : (typeof u.componentDidUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, mn(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = Ol(
      t,
      e.child,
      null,
      n
    ), t.child = Ol(
      t,
      null,
      a,
      n
    )) : Fe(e, t, a, n), t.memoizedState = u.state, e = t.child) : e = Oa(
      e,
      t,
      n
    ), e;
  }
  function vv(e, t, a, l) {
    return wl(), t.flags |= 256, Fe(e, t, a, l), t.child;
  }
  var or = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function fr(e) {
    return { baseLanes: e, cachePool: ad() };
  }
  function dr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Ot), e;
  }
  function mv(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, c;
    if ((c = u) || (c = e !== null && e.memoizedState === null ? !1 : (it.current & 2) !== 0), c && (n = !0, t.flags &= -129), c = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (oe) {
        if (n ? tl(t) : al(), (e = ze) ? (e = Hm(
          e,
          Vt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ka !== null ? { id: ra, overflow: oa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Jf(e), a.return = t, t.child = a, Pe = t, ze = null)) : e = null, e === null) throw ka(t);
        return fo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (al(), n = t.mode, u = Ji(
        { mode: "hidden", children: u },
        n
      ), l = Tl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = fr(a), l.childLanes = dr(
        e,
        c,
        a
      ), t.memoizedState = or, pu(null, l)) : (tl(t), vr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var h = f.dehydrated;
      if (h !== null)
        return gy(
          e,
          t,
          u,
          c,
          l,
          h,
          f,
          a
        );
    }
    return n ? (al(), n = l.fallback, u = t.mode, f = e.child, h = f.sibling, l = Aa(f, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, h !== null ? n = Aa(h, n) : (n = Tl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, pu(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = fr(a) : (u = n.cachePool, u !== null ? (f = Ze._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = ad(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = dr(
      e,
      c,
      a
    ), t.memoizedState = or, pu(e.child, l)) : (tl(t), a = e.child, e = a.sibling, a = Aa(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (c = t.deletions, c === null ? (t.deletions = [e], t.flags |= 16) : c.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function vr(e, t) {
    return t = Ji(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ji(e, t) {
    return e = _t(22, e, null, t), e.lanes = 0, e;
  }
  function ki(e, t, a) {
    return Ol(t, e.child, null, a), e = vr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function gy(e, t, a, l, n, u, c, f) {
    if (a)
      return t.flags & 256 ? (tl(t), t.flags &= -257, ki(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (al(), t.child = e.child, t.flags |= 128, null) : (al(), u = n.fallback, c = t.mode, n = Ji(
        { mode: "visible", children: n.children },
        c
      ), u = Tl(
        u,
        c,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, Ol(t, e.child, null, f), n = t.child, n.memoizedState = fr(f), n.childLanes = dr(
        e,
        l,
        f
      ), t.memoizedState = or, pu(null, n));
    if (tl(t), fo(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var h = l.dgst;
      return l = h, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, iu({ value: n, source: null, stack: null })), ki(
        e,
        t,
        f
      );
    }
    if (Je || Al(e, t, f, !1), l = (f & e.childLanes) !== 0, Je || l) {
      if (el.current !== null)
        return ki(
          e,
          t,
          f
        );
      if (l = Ce, l !== null && (n = $o(
        l,
        f
      ), n !== 0 && n !== c.retryLane))
        throw c.retryLane = n, Nl(e, n), jt(l, e, n), cr;
      return oo(u) || ds(), ki(
        e,
        t,
        f
      );
    }
    return oo(u) ? (t.flags |= 192, t.child = e.child, null) : (e = c.treeContext, ze = Kt(u.nextSibling), Pe = t, oe = !0, Ja = null, Vt = !1, e !== null && Ff(t, e), t = vr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function hv(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), wi(e.return, t, a);
  }
  function gv(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && Ui(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function $i(e, t, a, l, n, u) {
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
  function mr(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var a = t.sibling;
      t.sibling = e.child, e.child = t, t = a;
    }
  }
  function hr(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, u = l.tail;
    l = l.children;
    var c = it.current;
    if (t.flags & 128)
      return mu(t, c), null;
    var f = (c & 2) !== 0;
    if (f ? (c = c & 1 | 2, t.flags |= 128) : c &= 1, mu(t, c), n === "backwards" && e !== null ? (mr(e), Fe(e, t, l, a), mr(e)) : Fe(e, t, l, a), l = oe ? uu : 0, !f && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && hv(e, a, t);
        else if (e.tag === 19)
          hv(e, a, t);
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
        a = gv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, mr(t)), $i(
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
          if (e = n.alternate, e !== null && Ui(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = a, a = n, n = e;
        }
        $i(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        $i(
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
        a = gv(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), $i(
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
  function yv(e, t, a) {
    var l = t.pendingProps;
    return $a(t, t.type, l.value), Fe(e, t, l.children, a), t.child;
  }
  function Oa(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), il |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (Al(
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
      for (e = t.child, a = Aa(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Aa(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function gr(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ei(e)));
  }
  function yy(e, t, a) {
    switch (t.tag) {
      case 3:
        ei(t, t.stateNode.containerInfo), $a(t, Ze, e.memoizedState.cache), wl();
        break;
      case 27:
      case 5:
        Xs(t);
        break;
      case 4:
        ei(t, t.stateNode.containerInfo);
        break;
      case 10:
        $a(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Gc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return tl(t), t.flags |= 128, null;
          l = Al(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? mv(e, t, a) : (tl(t), e = Oa(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        }
        tl(t);
        break;
      case 19:
        if (t.flags & 128)
          return hr(
            e,
            t,
            a
          );
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (Al(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return hr(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), mu(t, it.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, cv(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        $a(t, Ze, e.memoizedState.cache);
    }
    return Oa(e, t, a);
  }
  function pv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Je = !0;
      else {
        if (!gr(e, a) && (t.flags & 128) === 0)
          return Je = !1, yy(
            e,
            t,
            a
          );
        Je = (e.flags & 131072) !== 0;
      }
    else
      Je = !1, oe && (t.flags & 1048576) !== 0 && $f(t, uu, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Rl(t.elementType), t.type = e, typeof e == "function")
            jc(e) ? (l = Hl(e, l), t.tag = 1, t = dv(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = rr(
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
                t.tag = 11, t = uv(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ce) {
                t.tag = 14, t = iv(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === Me) {
                t.tag = 10, t.type = e, t = yv(
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
        return rr(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = Hl(
          l,
          t.pendingProps
        ), dv(
          e,
          t,
          l,
          n,
          a
        );
      case 3:
        e: {
          if (ei(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Hc(e, t), vu(t, l, null, a);
          var c = t.memoizedState;
          if (l = c.cache, $a(t, Ze, l), l !== u.cache && Dc(
            t,
            [Ze],
            a,
            !0
          ), du(), l = c.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: c.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = vv(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== n) {
              n = Gt(
                Error(o(424)),
                t
              ), iu(n), t = vv(
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
              for (ze = Kt(e.firstChild), Pe = t, oe = !0, Ja = null, Vt = !0, a = cd(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (wl(), l === n) {
              t = Oa(
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
        return mn(e, t), e === null ? (a = Xm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : oe || (t.stateNode = xm(
          t.type,
          t.pendingProps,
          Ga.current,
          t
        )) : t.memoizedState = Xm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Xs(t), e === null && oe && (l = t.stateNode = qm(
          t.type,
          t.pendingProps,
          Ga.current
        ), Pe = t, Vt = !0, n = ze, ol(t.type) ? (vo = n, ze = Kt(l.firstChild)) : ze = n), Fe(
          e,
          t,
          t.pendingProps.children,
          a
        ), mn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && oe && ((n = l = ze) && (l = f0(
          l,
          t.type,
          t.pendingProps,
          Vt
        ), l !== null ? (t.stateNode = l, Pe = t, ze = Kt(l.firstChild), Vt = !1, n = !0) : n = !1), n || ka(t)), Xs(t), n = t.type, u = t.pendingProps, c = e !== null ? e.memoizedProps : null, l = u.children, lo(n, u) ? l = null : c !== null && lo(n, c) && (t.flags |= 32), t.memoizedState !== null && (n = Vc(
          e,
          t,
          iy,
          null,
          null,
          a
        ), Rn._currentValue = n), mn(e, t), Fe(e, t, l, a), t.child;
      case 6:
        return e === null && oe && ((e = a = ze) && (a = d0(
          a,
          t.pendingProps,
          Vt
        ), a !== null ? (t.stateNode = a, Pe = t, ze = null, e = !0) : e = !1), e || ka(t)), null;
      case 13:
        return mv(e, t, a);
      case 4:
        return ei(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Ol(
          t,
          null,
          l,
          a
        ) : Fe(e, t, l, a), t.child;
      case 11:
        return uv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, mn(e, t), Fe(e, t, l, a), t.child;
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
        return yv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, Cl(t), n = nt(n), l = l(n), t.flags |= 1, Fe(e, t, l, a), t.child;
      case 14:
        return iv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return sv(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return hr(e, t, a);
      case 31:
        return hy(e, t, a);
      case 22:
        return cv(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Cl(t), l = nt(Ze), e === null ? (n = Mc(), n === null && (n = Ce, u = zc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, Uc(t), $a(t, Ze, n)) : ((e.lanes & a) !== 0 && (Hc(e, t), vu(t, null, null, a), du()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), $a(t, Ze, l)) : (l = u.cache, $a(t, Ze, l), l !== n.cache && Dc(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : oe && Ni(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : mn(e, t), Fe(e, t, l.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Ua(e) {
    e.flags |= 4;
  }
  function yr(e, t, a, l, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Jm(t, l) : Jm(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Pv()) e.flags |= 8192;
        else
          throw Ml = zi, Oc;
    } else e.flags &= -16777217;
  }
  function _v(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !km(t))
      if (Pv()) e.flags |= 8192;
      else
        throw Ml = zi, Oc;
  }
  function Fi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ko() : 536870912, e.lanes |= t, _n |= t);
  }
  function _u(e, t) {
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
  function py(e, t, a) {
    var l = t.pendingProps;
    switch (wc(t), t.tag) {
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
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), za(Ze), Vl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (sn(t) ? Ua(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ac())), Re(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Ua(t), u !== null ? (Re(t), _v(t, u)) : (Re(t), yr(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (Ua(t), Re(t), _v(t, u)) : (Re(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Ua(t), Re(t), yr(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if (ti(t), a = Ga.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ua(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Re(t), t.subtreeFlags &= -33554433, null;
          }
          e = sa.current, sn(t) ? Wf(t) : (e = qm(n, l, a), t.stateNode = e, Ua(t));
        }
        return Re(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (ti(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Ua(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Re(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = sa.current, sn(t))
            Wf(t);
          else {
            var c = Du(
              Ga.current
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
            l && Ua(t);
          }
        }
        return Re(t), t.subtreeFlags &= -33554433, yr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && Ua(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = Ga.current, sn(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = Pe, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || pm(e.nodeValue, a)), e || ka(t, !0);
          } else
            e = Du(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return Re(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = sn(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[lt] = t;
            } else
              wl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), e = !1;
          } else
            a = Ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Re(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = sn(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[lt] = t;
            } else
              wl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), n = !1;
          } else
            n = Ac(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return zt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Fi(t, t.updateQueue), Re(t), null);
      case 4:
        return Vl(), e === null && Ir(t.stateNode.containerInfo), t.flags |= 67108864, Re(t), null;
      case 10:
        return za(t.type), Re(t), null;
      case 19:
        if (Qc(t), l = t.memoizedState, l === null) return Re(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) _u(l, !1);
          else {
            if (Ge !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Ui(e), u !== null) {
                  for (t.flags |= 128, _u(l, !1), e = u.updateQueue, t.updateQueue = e, Fi(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Kf(a, e), a = a.sibling;
                  return mu(
                    t,
                    it.current & 1 | 2
                  ), oe && Ca(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && wt() > cs && (t.flags |= 128, n = !0, _u(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Ui(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Fi(t, e), _u(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !oe)
                return Re(t), null;
            } else
              2 * wt() - l.renderingStartTime > cs && a !== 536870912 && (t.flags |= 128, n = !0, _u(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = wt(), e.sibling = null, u = it.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || oe ? mu(t, u) : (a = u, De(ut, t), De(it, a), ft === null && (ft = t)), oe && Ca(t, l.treeForkCount), e;
        }
        return Re(t), null;
      case 22:
      case 23:
        return zt(t), Yc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Re(t), a = t.updateQueue, a !== null && Fi(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && at(zl), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), za(Ze), Re(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Re(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function _y(e, t) {
    switch (wc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return za(Ze), Vl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return ti(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (zt(t), t.alternate === null)
            throw Error(o(340));
          wl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (zt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          wl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Qc(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Vl(), null;
      case 10:
        return za(t.type), null;
      case 22:
      case 23:
        return zt(t), Yc(), e !== null && at(zl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return za(Ze), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Sv(e, t) {
    switch (wc(t), t.tag) {
      case 3:
        za(Ze), Vl();
        break;
      case 26:
      case 27:
      case 5:
        ti(t);
        break;
      case 4:
        Vl();
        break;
      case 31:
        t.memoizedState !== null && zt(t);
        break;
      case 13:
        zt(t);
        break;
      case 19:
        Qc(t);
        break;
      case 10:
        za(t.type);
        break;
      case 22:
      case 23:
        zt(t), Yc(), e !== null && at(zl);
        break;
      case 24:
        za(Ze);
    }
  }
  function Su(e, t) {
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
  function ll(e, t, a) {
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
              var h = a, x = f;
              try {
                x();
              } catch (C) {
                we(
                  n,
                  h,
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
  function bv(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        od(t, a);
      } catch (l) {
        we(e, e.return, l);
      }
    }
  }
  function xv(e, t, a) {
    a.props = Hl(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      we(e, t, l);
    }
  }
  function fa(e, t) {
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
            var n = e.stateNode, u = wa(e.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = Cm(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var c = new Ht(e);
              y(
                e.child,
                !1,
                r0,
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
  function Wi(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var a = 0; a < t.length; a++)
        Um(
          e.stateNode,
          t[a]
        );
  }
  function jv(e) {
    for (var t = e.return; t !== null && (_r(t) && Um(e.stateNode, t.stateNode), !pr(t)); )
      t = t.return;
  }
  function bu(e) {
    for (var t = e.return; t !== null && (_r(t) && o0(e.stateNode, t.stateNode), !pr(t)); )
      t = t.return;
  }
  function pr(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function _r(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Sr(e) {
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
  function br(e, t, a) {
    try {
      var l = e.stateNode;
      Zy(l, e.type, a, t), l[pt] = t;
    } catch (n) {
      we(e, e.return, n);
    }
  }
  function Nv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ol(e.type) || e.tag === 4;
  }
  function xr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Nv(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ol(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function jr(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ca)), Wi(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (Wi(e, l), l = null, ol(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
      for (jr(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        jr(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function Ii(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? a.insertBefore(n, t) : a.appendChild(n), Wi(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (Wi(e, l), l = null, ol(e.type) && (a = e.stateNode)), e = e.child, e !== null))
      for (Ii(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        Ii(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function Tv(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ct(t, l, a), t[lt] = e, t[pt] = a;
    } catch (u) {
      we(e, e.return, u);
    }
  }
  var Pi = !1, Rt = null;
  function wv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Pi = !0);
  }
  var da = null;
  function Ev() {
    var e = da;
    return da = null, e;
  }
  var St = 0;
  function hn(e, t, a, l, n) {
    return St = 0, Av(
      e.child,
      t,
      a,
      l,
      n
    );
  }
  function Av(e, t, a, l, n) {
    for (var u = !1; e !== null; ) {
      if (e.tag === 5) {
        var c = e.stateNode;
        if (l !== null) {
          var f = io(c);
          l.push(f), f.view && (u = !0);
        } else
          u || io(c).view && (u = !0);
        Pi = !0, Em(
          c,
          St === 0 ? t : t + "_" + St,
          a
        ), St++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && n || Av(
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
  function va(e, t) {
    for (; e !== null; )
      e.tag === 5 ? Am(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || va(
        e.child,
        t
      )), e = e.sibling;
  }
  function es(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (es(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var a = t.name;
          t = Ea(t.default, t.share), t !== "none" && (hn(
            e,
            a,
            t,
            null,
            !1
          ) || va(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function Nr(e, t) {
    if (e.tag === 30) {
      var a = e.stateNode, l = e.memoizedProps, n = wa(l, a), u = Ea(
        l.default,
        a.paired ? l.share : l.enter
      );
      u !== "none" ? hn(e, n, u, null, !1) ? (es(e), a.paired || t || jn(e, l.onEnter)) : va(e.child, !1) : es(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Nr(e, t), e = e.sibling;
    else es(e);
  }
  function Tr(e) {
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
                  var u = Ea(
                    a.default,
                    a.share
                  );
                  if (u !== "none" && (hn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, jn(e, a.onShare)) : va(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            Tr(e);
          }
          e = e.sibling;
        }
    }
  }
  function wr(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, a = wa(t, e.stateNode), l = Rt !== null ? Rt.get(a) : void 0, n = Ea(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      n !== "none" && (hn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, Rt.delete(a), jn(e, t.onShare)) : jn(e, t.onExit) : va(e.child, !1)), Rt !== null && Tr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        wr(e), e = e.sibling;
    else
      Rt !== null && Tr(e);
  }
  function Cv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = wa(t, e.stateNode);
        t = Ea(t.default, t.update), e.flags &= -5, t !== "none" && hn(
          e,
          a,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && Cv(e);
      e = e.sibling;
    }
  }
  function Er(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, va(e.child, !1));
          }
          Er(e);
        }
        e = e.sibling;
      }
  }
  function ts(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, va(e.child, !1), Er(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        ts(e), e = e.sibling;
    else Er(e);
  }
  function Dv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? va(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Dv(e), e = e.sibling;
  }
  function Ar(e, t, a, l, n, u, c) {
    for (var f = !1; t !== null; ) {
      if (t.tag === 5) {
        var h = t.stateNode;
        if (u !== null && St < u.length) {
          var x = u[St], C = io(h);
          (x.view || C.view) && (f = !0);
          var U;
          if (U = (e.flags & 4) === 0)
            if (C.clip) U = !0;
            else {
              U = x.rect;
              var S = C.rect;
              U = U.y !== S.y || U.x !== S.x || U.height !== S.height || U.width !== S.width;
            }
          U && (e.flags |= 4), C.abs ? C = !x.abs : (x = x.rect, C = C.rect, C = x.height !== C.height || x.width !== C.width), C && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && Em(
          h,
          St === 0 ? a : a + "_" + St,
          n
        ), f && (e.flags & 4) !== 0 || (da === null && (da = []), da.push(
          h,
          St === 0 ? l : l + "_" + St,
          t.memoizedProps
        )), St++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && c ? e.flags |= t.flags & 32 : Ar(
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
  function zv(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var a = e.memoizedProps, l = e.stateNode, n = wa(a, l), u = Ea(a.default, a.update), c;
        c = e.memoizedState, e.memoizedState = null, l = e;
        var f = e.child;
        St = 0, n = Ar(
          l,
          f,
          n,
          n,
          u,
          c,
          !1
        ), (e.flags & 4) !== 0 && n && jn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && zv(e);
      e = e.sibling;
    }
  }
  var et = !1, Ne = !1, ma = !1, Cr = !1, Rv = typeof WeakSet == "function" ? WeakSet : Set, tt = null, ha = !1, xu = !1, as = !1, Dr = !1;
  function Sy(e, t, a) {
    if (e = e.containerInfo, to = Mn, e = Hf(e), gc(e)) {
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
            var f = 0, h = -1, x = -1, C = 0, U = 0, S = e, E = null;
            t: for (; ; ) {
              for (var Y; S !== l || u !== 0 && S.nodeType !== 3 || (h = f + u), S !== c || n !== 0 && S.nodeType !== 3 || (x = f + n), S.nodeType === 3 && (f += S.nodeValue.length), (Y = S.firstChild) !== null; )
                E = S, S = Y;
              for (; ; ) {
                if (S === e) break t;
                if (E === l && ++C === u && (h = f), E === c && ++U === n && (x = f), (Y = S.nextSibling) !== null) break;
                S = E, E = S.parentNode;
              }
              S = Y;
            }
            l = h === -1 || x === -1 ? null : { start: h, end: x };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (ao = { focusedElem: e, selectionRange: l }, Mn = !1, a = (a & 335544064) === a, tt = t, t = a ? 9270 : 1024; tt !== null; ) {
      if (e = tt, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && wr(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && wv(e), ls(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && wr(l), ls(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && wv(e), ls(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, tt = l) : (a && Cv(e), ls(a));
      }
    }
    Rt = null;
  }
  function ls(e) {
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
              var c = Hl(
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
              ro(l);
            else if (a === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  ro(l);
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
          a && l !== null && (a = wa(
            l.memoizedProps,
            l.stateNode
          ), n = t.memoizedProps, n = Ea(n.default, n.update), n !== "none" && hn(
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
  function Mv(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ga(e, a), l & 4 && Su(5, a);
        break;
      case 1:
        if (ga(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (c) {
              we(a, a.return, c);
            }
          else {
            var n = Hl(
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
        l & 64 && bv(a), l & 512 && fa(a, a.return);
        break;
      case 3:
        if (ga(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
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
            od(e, t);
          } catch (c) {
            we(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Tv(a);
      case 26:
      case 5:
        ga(e, a), t === null && l & 4 && Sr(a), l & 512 && fa(a, a.return);
        break;
      case 12:
        ga(e, a);
        break;
      case 31:
        ga(e, a), l & 4 && Lv(e, a);
        break;
      case 13:
        ga(e, a), l & 4 && Bv(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Ry.bind(
          null,
          a
        ), v0(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || et, !l) {
          var u = t !== null && t.memoizedState !== null || Ne;
          t = et, n = Ne, et = l, (Ne = u) && !n ? (l = 2, (a.subtreeFlags & 8772) !== 0 && (l |= 1), ea(
            e,
            a,
            l
          )) : ga(e, a), et = t, Ne = n;
        }
        break;
      case 30:
        ga(e, a), l & 512 && fa(a, a.return);
        break;
      case 7:
        l & 512 && fa(a, a.return);
      default:
        ga(e, a);
    }
  }
  function zr(e, t) {
    for (e = e.child; e !== null; )
      Ov(e, t), e = e.sibling;
  }
  function Ov(e, t) {
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
        } catch (h) {
          we(e, e.return, h);
        }
        Rr(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, be = !0;
        } catch (h) {
          we(e, e.return, h);
        }
        break;
      case 18:
        try {
          var f = e.stateNode;
          t ? wm(f, !0) : wm(e.stateNode, !1);
        } catch (h) {
          we(e, e.return, h);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && zr(e, t);
        break;
      default:
        zr(e, t);
    }
  }
  function Rr(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var a = e, l = t;
          switch (a.tag) {
            case 4:
              Ov(a, l);
              break e;
            case 22:
              a.memoizedState === null && Rr(a, l);
              break e;
            default:
              Rr(a, l);
          }
        }
        e = e.sibling;
      }
  }
  function Uv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Uv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ci(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var He = null, bt = !1;
  function It(e, t, a) {
    for (a = a.child; a !== null; )
      Hv(e, t, a), a = a.sibling;
  }
  function Hv(e, t, a) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(Zn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Ne || st(a, t), It(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !Ne && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Ne || st(a, t), bu(a);
        var l = He, n = bt;
        ol(a.type) && (He = a.stateNode, bt = !1), It(
          e,
          t,
          a
        ), Ym(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), He = l, bt = n;
        break;
      case 5:
        Ne || st(a, t), bu(a);
      case 6:
        if (a.tag === 6 && bu(a), l = He, n = bt, He = null, It(
          e,
          t,
          a
        ), He = l, bt = n, He !== null)
          if (bt)
            try {
              (He.nodeType === 9 ? He.body : He.nodeName === "HTML" ? He.ownerDocument.body : He).removeChild(a.stateNode), be = !0;
            } catch (u) {
              we(
                a,
                t,
                u
              );
            }
          else
            try {
              He.removeChild(a.stateNode), be = !0;
            } catch (u) {
              we(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        He !== null && (bt ? (e = He, Tm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), On(e)) : Tm(He, a.stateNode));
        break;
      case 4:
        l = He, n = bt, He = a.stateNode.containerInfo, bt = !0, It(
          e,
          t,
          a
        ), He = l, bt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ll(2, a, t), Ne || ll(4, a, t), It(
          e,
          t,
          a
        );
        break;
      case 1:
        Ne || (st(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && xv(
          a,
          t,
          l
        )), It(
          e,
          t,
          a
        );
        break;
      case 21:
        It(
          e,
          t,
          a
        );
        break;
      case 22:
        Ne = (l = Ne) || a.memoizedState !== null, It(
          e,
          t,
          a
        ), Ne = l;
        break;
      case 30:
        st(a, t), It(
          e,
          t,
          a
        );
        break;
      case 7:
        Ne || st(a, t), It(
          e,
          t,
          a
        );
        break;
      default:
        It(
          e,
          t,
          a
        );
    }
  }
  function Lv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        On(e);
      } catch (a) {
        we(t, t.return, a);
      }
    }
  }
  function Bv(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        On(e);
      } catch (a) {
        we(t, t.return, a);
      }
  }
  function by(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Rv()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Rv()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function ns(e, t) {
    var a = by(e);
    t.forEach(function(l) {
      if (!a.has(l)) {
        a.add(l);
        var n = My.bind(null, e, l);
        l.then(n, n);
      }
    });
  }
  function ht(e, t, a) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n], c = e, f = t, h = f;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (ol(h.type)) {
                He = h.stateNode, bt = !1;
                break e;
              }
              break;
            case 5:
              He = h.stateNode, bt = !1;
              break e;
            case 3:
            case 4:
              He = h.stateNode.containerInfo, bt = !0;
              break e;
          }
          h = h.return;
        }
        if (He === null) throw Error(o(160));
        Hv(c, f, u), He = null, bt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        qv(t, e, a), t = t.sibling;
  }
  var Pt = null;
  function qv(e, t, a) {
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
        ht(t, e, a), gt(e), n & 4 && (ll(3, e, e.return), Su(3, e), ll(5, e, e.return));
        break;
      case 1:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), n & 64 && et && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = Pt, ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (et)
                  e.stateNode = xm(
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
                        l = n.getElementsByTagName("title")[0], (!l || l[kn] || l[lt] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = n.createElement(t), n.head.insertBefore(
                          l,
                          n.querySelector("head > title")
                        )), ct(l, t, a), l[lt] = e, Ie(l), t = l;
                        break e;
                      case "link":
                        if (u = Km(
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
                        if (u = Km(
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
                et || yo(u, e.type, e.stateNode);
            else
              e.stateNode = Zm(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || Ne || t.parentNode.removeChild(t)) : n.count--, a === null ? et || yo(u, e.type, e.stateNode) : Zm(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && br(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        ht(t, e, a), gt(e), n & 512 && (Ne || l === null || st(l, l.return)), l !== null && n & 4 && br(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = ma, ma = !1, ht(t, e, a), ma = u, gt(e), n & 512 && (Ne || l === null || st(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Fl(t, ""), be = !0;
          } catch (C) {
            we(e, e.return, C);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, br(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), n & 1024 && (Cr = !0);
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
        if (be = !1, _s = null, u = Pt, Pt = zu(t.containerInfo), ht(t, e, a), Pt = u, gt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            On(t.containerInfo);
          } catch (C) {
            we(e, e.return, C);
          }
        Cr && (Cr = !1, Yv(e)), be = !1;
        break;
      case 4:
        n = ma, ma = et, l = uf(), u = Pt, Pt = zu(
          e.stateNode.containerInfo
        ), ht(t, e, a), gt(e), Pt = u, be && xu && (as = !0), be = l, ma = n;
        break;
      case 12:
        ht(t, e, a), gt(e);
        break;
      case 31:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ns(e, t)));
        break;
      case 13:
        ht(t, e, a), gt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ss = wt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ns(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, c = l !== null && l.memoizedState !== null;
        var f = et, h = Ne, x = ma;
        et = f || u, ma = x || u, Ne = h || c, ht(t, e, a), Ne = h, ma = x, et = f, gt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || c || et || Ne || (t = c || Ne, a = et, l = Ne, et = u || et, Ne = t, nl(e, 2), et = a, Ne = l), !u && ma || zr(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, ns(e, a))));
        break;
      case 19:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ns(e, t)));
        break;
      case 30:
        n & 512 && (Ne || l === null || st(l, l.return)), n = uf(), u = xu, c = (a & 335544064) === a, f = e.memoizedProps, xu = c && Ea(
          f.default,
          f.update
        ) !== "none", ht(t, e, a), gt(e), c && l !== null && be && (e.flags |= 4), xu = u, be = n;
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
          if (Nv(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var n = e.return; n !== null; ) {
          if (_r(n)) {
            var u = n.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (pr(n)) break;
          n = n.return;
        }
        var c = l;
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, h = xr(e);
            Ii(
              e,
              h,
              f,
              c
            );
            break;
          case 5:
            var x = a.stateNode;
            a.flags & 32 && (Fl(x, ""), a.flags &= -33);
            var C = xr(e);
            Ii(
              e,
              C,
              x,
              c
            );
            break;
          case 3:
          case 4:
            var U = a.stateNode.containerInfo, S = xr(e);
            jr(
              e,
              S,
              U,
              c
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (E) {
        we(e, e.return, E);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Yv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Yv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Mn = !0, t.reset(), Mn = !1), e = e.sibling;
      }
  }
  function gn(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Gv(t, e), t = t.sibling;
    else zv(t);
  }
  function Gv(e, t) {
    var a = e.alternate;
    if (a === null) Nr(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (Dr = ha = !1, Ev(), gn(t, e), !ha && !as) {
            if (e = da, e !== null)
              for (var l = 0; l < e.length; l += 3) {
                a = e[l];
                var n = e[l + 1];
                Am(a, e[l + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
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
            )), Dr = !0;
          }
          da = null;
          break;
        case 5:
          gn(t, e);
          break;
        case 4:
          l = ha, ha = !1, gn(t, e), ha && (as = !0), ha = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? Nr(e, !1) : gn(t, e));
          break;
        case 30:
          l = ha, n = Ev(), ha = !1, gn(t, e), ha && (e.flags |= 4);
          var u = e.memoizedProps, c = e.stateNode;
          t = wa(u, c), c = wa(a.memoizedProps, c);
          var f = Ea(u.default, u.update);
          f === "none" ? t = !1 : (u = a.memoizedState, a.memoizedState = null, a = e.child, St = 0, t = Ar(
            e,
            a,
            t,
            c,
            f,
            u,
            !0
          ), St !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (jn(
            e,
            e.memoizedProps.onUpdate
          ), da = n) : n !== null && (n.push.apply(n, da), da = n), ha = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          gn(t, e);
      }
  }
  function ga(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Mv(e, t.alternate, t), t = t.sibling;
  }
  function nl(e, t) {
    for (e = e.child; e !== null; ) {
      var a = e, l = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ll(4, a, a.return), nl(
            a,
            l
          );
          break;
        case 1:
          st(a, a.return);
          var n = a.stateNode;
          typeof n.componentWillUnmount == "function" && xv(
            a,
            a.return,
            n
          ), nl(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Ym(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          st(a, a.return), a.tag !== 5 && a.tag !== 27 || bu(a), nl(
            a,
            l
          );
          break;
        case 6:
          bu(a);
          break;
        case 26:
          st(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || Ne || n.parentNode.removeChild(n), nl(
            a,
            l
          );
          break;
        case 22:
          a.memoizedState === null && nl(
            a,
            l
          );
          break;
        case 30:
          st(a, a.return), nl(
            a,
            l
          );
          break;
        case 7:
          st(a, a.return);
        default:
          nl(
            a,
            l
          );
      }
      e = e.sibling;
    }
  }
  function ea(e, t, a) {
    for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, u = t, c = u.flags, f = (a & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ea(
            n,
            u,
            a
          ), Su(4, u);
          break;
        case 1:
          if (ea(
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
            var h = l.stateNode;
            try {
              var x = n.shared.hiddenCallbacks;
              if (x !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < x.length; n++)
                  rd(x[n], h);
            } catch (C) {
              we(l, l.return, C);
            }
          }
          f && c & 64 && bv(u), fa(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && Tv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || jv(u), ea(
            n,
            u,
            a
          ), f && l === null && c & 4 && Sr(u), fa(u, u.return);
          break;
        case 6:
          jv(u);
          break;
        case 26:
          h = u.stateNode, u.memoizedState !== null || h === null || et || yo(
            zu(h.ownerDocument),
            u.type,
            h
          ), ea(
            n,
            u,
            a
          ), f && l === null && c & 4 && Sr(u), fa(u, u.return);
          break;
        case 12:
          ea(
            n,
            u,
            a
          );
          break;
        case 31:
          ea(
            n,
            u,
            a
          ), f && c & 4 && Lv(n, u);
          break;
        case 13:
          ea(
            n,
            u,
            a
          ), f && c & 4 && Bv(n, u);
          break;
        case 22:
          u.memoizedState === null && ea(
            n,
            u,
            a
          ), fa(u, u.return);
          break;
        case 30:
          ea(
            n,
            u,
            a
          ), fa(u, u.return);
          break;
        case 7:
          fa(u, u.return);
        default:
          ea(
            n,
            u,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Mr(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && su(a));
  }
  function Or(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && su(e));
  }
  function Zt(e, t, a, l) {
    var n = (a & 335544064) === a;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Qv(
          e,
          t,
          a,
          l
        ), t = t.sibling;
    else n && Dv(t);
  }
  function Qv(e, t, a, l) {
    var n = (a & 335544064) === a;
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && ts(t);
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
        ), u & 2048 && Su(9, t);
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
        ), n && Dr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && su(u)));
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
            var c = t.memoizedProps, f = c.id, h = c.onPostCommit;
            typeof h == "function" && h(
              f,
              t.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (x) {
            we(t, t.return, x);
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
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && ts(f), c._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : ju(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && ts(t), c._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : (c._visibility |= 2, yn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Mr(f, t);
        break;
      case 24:
        Zt(
          e,
          t,
          a,
          l
        ), u & 2048 && Or(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (va(u.child, !0), va(t.child, !0))), Zt(
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
  function yn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, c = t, f = a, h = l, x = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          yn(
            u,
            c,
            f,
            h,
            n
          ), Su(8, c);
          break;
        case 23:
          break;
        case 22:
          var C = c.stateNode;
          c.memoizedState !== null ? C._visibility & 2 ? yn(
            u,
            c,
            f,
            h,
            n
          ) : ju(
            u,
            c
          ) : (C._visibility |= 2, yn(
            u,
            c,
            f,
            h,
            n
          )), n && x & 2048 && Mr(
            c.alternate,
            c
          );
          break;
        case 24:
          yn(
            u,
            c,
            f,
            h,
            n
          ), n && x & 2048 && Or(c.alternate, c);
          break;
        default:
          yn(
            u,
            c,
            f,
            h,
            n
          );
      }
      t = t.sibling;
    }
  }
  function ju(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            ju(a, l), n & 2048 && Mr(
              l.alternate,
              l
            );
            break;
          case 24:
            ju(a, l), n & 2048 && Or(l.alternate, l);
            break;
          default:
            ju(a, l);
        }
        t = t.sibling;
      }
  }
  var Ll = 8192;
  function Bl(e, t, a) {
    if (e.subtreeFlags & Ll)
      for (e = e.child; e !== null; )
        Xv(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function Xv(e, t, a) {
    switch (e.tag) {
      case 26:
        Bl(
          e,
          t,
          a
        ), e.flags & Ll && (e.memoizedState !== null ? E0(
          a,
          Pt,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Fm(a, e)));
        break;
      case 5:
        Bl(
          e,
          t,
          a
        ), e.flags & Ll && (e = e.stateNode, (t & 335544128) === t && Fm(a, e));
        break;
      case 3:
      case 4:
        var l = Pt;
        Pt = zu(e.stateNode.containerInfo), Bl(
          e,
          t,
          a
        ), Pt = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ll, Ll = 16777216, Bl(
          e,
          t,
          a
        ), Ll = l) : Bl(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & Ll) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, Rt === null && (Rt = /* @__PURE__ */ new Map()), Rt.set(l, n);
        }
        Bl(
          e,
          t,
          a
        );
        break;
      default:
        Bl(
          e,
          t,
          a
        );
    }
  }
  function Vv(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Nu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Kv(
            l,
            e
          );
        }
      Vv(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Zv(e), e = e.sibling;
  }
  function Zv(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Nu(e), e.flags & 2048 && ll(9, e, e.return);
        break;
      case 3:
        Nu(e);
        break;
      case 12:
        Nu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, us(e)) : Nu(e);
        break;
      default:
        Nu(e);
    }
  }
  function us(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          tt = l, Kv(
            l,
            e
          );
        }
      Vv(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ll(8, t, t.return), us(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, us(t));
          break;
        default:
          us(t);
      }
      e = e.sibling;
    }
  }
  function Kv(e, t) {
    for (; tt !== null; ) {
      var a = tt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ll(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          su(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, tt = l;
      else
        e: for (a = e; tt !== null; ) {
          l = tt;
          var n = l.sibling, u = l.return;
          if (Uv(l), l === a) {
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
  var xy = {
    getCacheForType: function(e) {
      var t = nt(Ze), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return nt(Ze).controller.signal;
    }
  }, jy = typeof WeakMap == "function" ? WeakMap : Map, je = 0, Ce = null, fe = null, ve = 0, Te = 0, Mt = null, ul = !1, pn = !1, Ur = !1, Ha = 0, Ge = 0, il = 0, ql = 0, is = 0, Ot = 0, _n = 0, Tu = null, xt = null, Hr = !1, ss = 0, Jv = 0, cs = 1 / 0, rs = null, sl = null, qe = 0, ta = null, Yl = null, ya = 0, Lr = 0, Br = null, kv = null, Sn = null, bn = null, xn = null, wu = 0, os = null;
  function Ut() {
    return (je & 2) !== 0 && ve !== 0 ? ve & -ve : $.T !== null ? kr() : Fo();
  }
  function $v() {
    if (Ot === 0)
      if ((ve & 536870912) === 0 || oe) {
        var e = ni;
        ni <<= 1, (ni & 3932160) === 0 && (ni = 262144), Ot = e;
      } else Ot = 536870912;
    return e = ut.current, e !== null && (e.flags |= 32), Ot;
  }
  function jn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = Cm(
        wa(e.memoizedProps, a)
      )), bn === null && (bn = []), bn.push(t.bind(null, l));
    }
  }
  function jt(e, t, a) {
    (e === Ce && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null) && (Nn(e, 0), cl(
      e,
      ve,
      Ot,
      !1
    )), Jn(e, a), ((je & 2) === 0 || e !== Ce) && (e === Ce && ((je & 2) === 0 && (ql |= a), Ge === 4 && cl(
      e,
      ve,
      Ot,
      !1
    )), pa(e));
  }
  function Fv(e, t, a) {
    if ((je & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Kn(e, t), n = l ? wy(e, t) : Yr(e, t, !0), u = l;
    do {
      if (n === 0) {
        pn && !l && cl(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !Ny(a)) {
          n = Yr(e, t, !1), u = !1;
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
              var h = f.current.memoizedState.isDehydrated;
              if (h && (Nn(f, c).flags |= 256), c = Yr(
                f,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (Ur && !h) {
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
          Nn(e, 0), cl(e, t, 0, !0);
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
              cl(
                l,
                t,
                Ot,
                !ul
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
          if ((t & 62914560) === t && (n = ss + 300 - wt(), 10 < n)) {
            if (cl(
              l,
              t,
              Ot,
              !ul
            ), ii(l, 0, !0) !== 0) break e;
            ya = t, l.timeoutHandle = uo(
              Wv.bind(
                null,
                l,
                a,
                xt,
                rs,
                Hr,
                t,
                Ot,
                ql,
                _n,
                ul,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break e;
          }
          Wv(
            l,
            a,
            xt,
            rs,
            Hr,
            t,
            Ot,
            ql,
            _n,
            ul,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    pa(e);
  }
  function Wv(e, t, a, l, n, u, c, f, h, x, C, U, S, E) {
    e.timeoutHandle = -1;
    var Y = t.subtreeFlags, k = (u & 335544064) === u;
    if (U = null, (k || Y & 8192 || (Y & 16785408) === 16785408) && (U = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ca
    }, Rt = null, Xv(
      t,
      u,
      U
    ), k && (Y = U, k = e.containerInfo, k = (k.nodeType === 9 ? k : k.ownerDocument).__reactViewTransition, k != null && (Y.count++, Y.waitingForViewTransition = !0, Y = Ou.bind(Y), k.finished.then(Y, Y))), Y = (u & 62914560) === u ? ss - wt() : (u & 4194048) === u ? Jv - wt() : 0, Y = A0(
      U,
      Y
    ), Y !== null)) {
      ya = u, e.cancelPendingCommit = Y(
        um.bind(
          null,
          e,
          t,
          u,
          a,
          l,
          n,
          c,
          f,
          h,
          x,
          C,
          U,
          null,
          S,
          E
        )
      ), cl(e, u, c, !x);
      return;
    }
    um(
      e,
      t,
      u,
      a,
      l,
      n,
      c,
      f,
      h,
      x,
      C,
      U
    );
  }
  function Ny(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Dt(u(), n)) return !1;
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
  function cl(e, t, a, l) {
    t = Zo(e, t), t &= ~is, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - At(n), c = 1 << u;
      l[u] = -1, n &= ~c;
    }
    a !== 0 && Jo(e, a, t);
  }
  function fs() {
    return (je & 6) === 0 ? (Eu(0), !1) : !0;
  }
  function qr() {
    if (fe !== null) {
      if (Te === 0)
        var e = fe.return;
      else
        e = fe, Da = El = null, Jc(e), on = null, ou = 0, e = fe;
      for (; e !== null; )
        Sv(e.alternate, e), e = e.return;
      fe = null;
    }
  }
  function Nn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, ky(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ya = 0, qr(), Ce = e, fe = a = Aa(e.current, null), ve = t, Te = 0, Mt = null, ul = !1, pn = Kn(e, t), Ur = !1, _n = Ot = is = ql = il = Ge = 0, xt = Tu = null, Hr = !1, Ha = Zo(e, t), _i(), a;
  }
  function Iv(e, t) {
    ie = null, $.H = Vi, t === rn || t === Di ? (t = ud(), Te = 3) : t === Oc ? (t = ud(), Te = 4) : Te = t === cr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Mt = t, fe === null && (Ge = 1, Zi(
      e,
      Gt(t, e.current)
    ));
  }
  function Pv() {
    var e = ut.current;
    return e === null ? !0 : (ve & 4194048) === ve ? ft === null : (ve & 62914560) === ve || (ve & 536870912) !== 0 ? e === ft : !1;
  }
  function em() {
    var e = $.H;
    return $.H = Vi, e === null ? Vi : e;
  }
  function tm() {
    var e = $.A;
    return $.A = xy, e;
  }
  function ds() {
    Ge = 4, ul || (ve & 4194048) !== ve && ut.current !== null || (pn = !0), (il & 134217727) === 0 && (ql & 134217727) === 0 || Ce === null || cl(
      Ce,
      ve,
      Ot,
      !1
    );
  }
  function Yr(e, t, a) {
    var l = je;
    je |= 2;
    var n = em(), u = tm();
    (Ce !== e || ve !== t) && (rs = null, Nn(e, t)), t = !1;
    var c = Ge;
    e: do
      try {
        if (Te !== 0 && fe !== null) {
          var f = fe, h = Mt;
          switch (Te) {
            case 8:
              qr(), c = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ut.current === null && (t = !0);
              var x = Te;
              if (Te = 0, Mt = null, Tn(e, f, h, x), a && pn) {
                c = 0;
                break e;
              }
              break;
            default:
              x = Te, Te = 0, Mt = null, Tn(e, f, h, x);
          }
        }
        Ty(), c = Ge;
        break;
      } catch (C) {
        Iv(e, C);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Da = El = null, je = l, $.H = n, $.A = u, fe === null && (Ce = null, ve = 0, _i()), c;
  }
  function Ty() {
    for (; fe !== null; ) am(fe);
  }
  function wy(e, t) {
    var a = je;
    je |= 2;
    var l = em(), n = tm();
    Ce !== e || ve !== t ? (rs = null, cs = wt() + 500, Nn(e, t)) : pn = Kn(
      e,
      t
    );
    e: do
      try {
        if (Te !== 0 && fe !== null) {
          t = fe;
          var u = Mt;
          t: switch (Te) {
            case 1:
              Te = 0, Mt = null, Tn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (ld(u)) {
                Te = 0, Mt = null, lm(t);
                break;
              }
              t = function() {
                Te !== 2 && Te !== 9 || Ce !== e || (Te = 7), pa(e);
              }, u.then(t, t);
              break e;
            case 3:
              Te = 7;
              break e;
            case 4:
              Te = 5;
              break e;
            case 7:
              ld(u) ? (Te = 0, Mt = null, lm(t)) : (Te = 0, Mt = null, Tn(e, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (fe.tag) {
                case 26:
                  c = fe.memoizedState;
                case 5:
                case 27:
                  var f = fe;
                  if (c ? km(c) : f.stateNode.complete) {
                    Te = 0, Mt = null;
                    var h = f.sibling;
                    if (h !== null) fe = h;
                    else {
                      var x = f.return;
                      x !== null ? (fe = x, vs(x)) : fe = null;
                    }
                    break t;
                  }
              }
              Te = 0, Mt = null, Tn(e, t, u, 5);
              break;
            case 6:
              Te = 0, Mt = null, Tn(e, t, u, 6);
              break;
            case 8:
              qr(), Ge = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        Ey();
        break;
      } catch (C) {
        Iv(e, C);
      }
    while (!0);
    return Da = El = null, $.H = l, $.A = n, je = a, fe !== null ? 0 : (Ce = null, ve = 0, _i(), Ge);
  }
  function Ey() {
    for (; fe !== null && !Vh(); )
      am(fe);
  }
  function am(e) {
    var t = pv(e.alternate, e, Ha);
    e.memoizedProps = e.pendingProps, t === null ? vs(e) : fe = t;
  }
  function lm(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = fv(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ve
        );
        break;
      case 11:
        t = fv(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ve
        );
        break;
      case 5:
        Jc(t);
        var l = t;
        l === Pe && (oe ? (Ti(l), l.tag === 5 && l.stateNode != null && (ze = l.stateNode)) : (Ti(l), oe = !0));
      default:
        Sv(a, t), t = fe = Kf(t, Ha), t = pv(a, t, Ha);
    }
    e.memoizedProps = e.pendingProps, t === null ? vs(e) : fe = t;
  }
  function Tn(e, t, a, l) {
    Da = El = null, Jc(t), on = null, ou = 0;
    var n = t.return;
    try {
      if (my(
        e,
        n,
        t,
        a,
        ve
      )) {
        Ge = 1, Zi(
          e,
          Gt(a, e.current)
        ), fe = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw fe = n, u;
      Ge = 1, Zi(
        e,
        Gt(a, e.current)
      ), fe = null;
      return;
    }
    t.flags & 32768 ? (oe || l === 1 ? e = !0 : pn || (ve & 536870912) !== 0 ? e = !1 : (ul = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = ut.current, l !== null && l.tag === 13 && (l.flags |= 16384))), nm(t, e)) : vs(t);
  }
  function vs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        nm(
          t,
          ul
        );
        return;
      }
      e = t.return;
      var a = py(
        t.alternate,
        t,
        Ha
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
  function nm(e, t) {
    do {
      var a = _y(e.alternate, e);
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
  function um(e, t, a, l, n, u, c, f, h, x, C, U) {
    e.cancelPendingCommit = null;
    do
      ms();
    while (qe !== 0);
    if ((je & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === Ce && (fe = Ce = null, ve = 0), Yl = t, ta = e, ya = a, Br = n, kv = l, Ay(
        e,
        t,
        a,
        c,
        f,
        h,
        U
      );
    }
  }
  function Ay(e, t, a, l, n, u, c) {
    var f = t.lanes | t.childLanes;
    if (Lr = f, f |= bc, eg(
      e,
      a,
      f,
      l,
      n,
      u
    ), bn = null, (a & 335544064) === a ? (xn = ay(e), l = 10262) : (xn = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Oy(ai, function() {
      return Vr(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Pi = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = $.T, $.T = null, n = ae.p, ae.p = 2, u = je, je |= 4;
      try {
        Sy(e, t, a);
      } finally {
        je = u, ae.p = n, $.T = l;
      }
    }
    qe = 1, Pi ? Sn = e0(
      c,
      e.containerInfo,
      xn,
      Gr,
      Qr,
      Dy,
      Xr,
      Vr,
      Cy
    ) : (Gr(), Qr(), Xr());
  }
  function Cy(e) {
    if (qe !== 0) {
      var t = ta.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function Dy() {
    qe === 3 && (qe = 0, Gv(Yl, ta), qe = 4);
  }
  function Gr() {
    if (qe === 1) {
      qe = 0;
      var e = ta, t = Yl, a = ya, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = $.T, $.T = null;
        var n = ae.p;
        ae.p = 2;
        var u = je;
        je |= 4;
        try {
          xu = as = !1, qv(t, e, a), a = ao;
          var c = Hf(e.containerInfo), f = a.focusedElem, h = a.selectionRange;
          if (c !== f && f && f.ownerDocument && Uf(
            f.ownerDocument.documentElement,
            f
          )) {
            if (h !== null && gc(f)) {
              var x = h.start, C = h.end;
              if (C === void 0 && (C = x), "selectionStart" in f)
                f.selectionStart = x, f.selectionEnd = Math.min(
                  C,
                  f.value.length
                );
              else {
                var U = f.ownerDocument || document, S = U && U.defaultView || window;
                if (S.getSelection) {
                  var E = S.getSelection(), Y = f.textContent.length, k = Math.min(h.start, Y), se = h.end === void 0 ? k : Math.min(h.end, Y);
                  !E.extend && k > se && (c = se, se = k, k = c);
                  var b = Of(
                    f,
                    k
                  ), g = Of(
                    f,
                    se
                  );
                  if (b && g && (E.rangeCount !== 1 || E.anchorNode !== b.node || E.anchorOffset !== b.offset || E.focusNode !== g.node || E.focusOffset !== g.offset)) {
                    var w = U.createRange();
                    w.setStart(b.node, b.offset), E.removeAllRanges(), k > se ? (E.addRange(w), E.extend(g.node, g.offset)) : (w.setEnd(g.node, g.offset), E.addRange(w));
                  }
                }
              }
            }
            for (U = [], E = f; E = E.parentNode; )
              E.nodeType === 1 && U.push({
                element: E,
                left: E.scrollLeft,
                top: E.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < U.length; f++) {
              var O = U[f];
              O.element.scrollLeft = O.left, O.element.scrollTop = O.top;
            }
          }
          Mn = !!to, ao = to = null;
        } finally {
          je = u, ae.p = n, $.T = l;
        }
      }
      e.current = t, qe = 2;
    }
  }
  function Qr() {
    if (qe === 2) {
      qe = 0;
      var e = ta, t = Yl, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = $.T, $.T = null;
        var l = ae.p;
        ae.p = 2;
        var n = je;
        je |= 4;
        try {
          Mv(e, t.alternate, t);
        } finally {
          je = n, ae.p = l, $.T = a;
        }
      }
      qe = 3;
    }
  }
  function Xr() {
    if (qe === 4 || qe === 3) {
      qe = 0;
      var e = Sn;
      Sn = null, Zh();
      var t = ta, a = Yl, l = ya, n = kv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? qe = 5 : (qe = 0, Yl = ta = null, im(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (sl = null), Is(l), a = a.stateNode, Et && typeof Et.onCommitFiberRoot == "function")
        try {
          Et.onCommitFiberRoot(
            Zn,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        a = $.T, u = ae.p, ae.p = 2, $.T = null;
        try {
          for (var c = t.onRecoverableError, f = 0; f < n.length; f++) {
            var h = n[f];
            c(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          $.T = a, ae.p = u;
        }
      }
      if (n = bn, c = xn, xn = null, n !== null && (bn = null, c === null && (c = []), e !== null))
        for (h = 0; h < n.length; h++)
          a = (0, n[h])(
            c
          ), a !== void 0 && e.finished.finally(a);
      (ya & 3) !== 0 && ms(), pa(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === os ? wu++ : (wu = 0, os = t) : (wu = 0, os = null), Eu(0);
    }
  }
  function im(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, su(t)));
  }
  function ms() {
    return Sn !== null && (Sn.skipTransition(), Sn = null), Gr(), Qr(), Xr(), Vr();
  }
  function Vr() {
    if (qe !== 5) return !1;
    var e = ta, t = Lr;
    Lr = 0;
    var a = Is(ya), l = $.T, n = ae.p;
    try {
      ae.p = 32 > a ? 32 : a, $.T = null, a = Br, Br = null;
      var u = ta, c = ya;
      if (qe = 0, Yl = ta = null, ya = 0, (je & 6) !== 0) throw Error(o(331));
      var f = je;
      if (je |= 4, Zv(u.current), Qv(
        u,
        u.current,
        c,
        a
      ), je = f, Eu(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
        try {
          Et.onPostCommitFiberRoot(Zn, u);
        } catch {
        }
      return !0;
    } finally {
      ae.p = n, $.T = l, im(e, t);
    }
  }
  function sm(e, t, a) {
    t = Gt(a, t), t = sr(e.stateNode, t, 2), e = Pa(e, t, 2), e !== null && (Jn(e, 2), pa(e));
  }
  function we(e, t, a) {
    if (e.tag === 3)
      sm(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          sm(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (sl === null || !sl.has(l))) {
            e = Gt(a, e), a = lv(2), l = Pa(t, a, 2), l !== null && (nv(
              a,
              l,
              t,
              e
            ), Jn(l, 2), pa(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Zr(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new jy();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (Ur = !0, n.add(a), e = zy.bind(null, e, t, a), t.then(e, e));
  }
  function zy(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Ce === e && (ve & a) === a && ((Ge === 4 || Ge === 3 && (ve & 62914560) === ve && 300 > wt() - ss) && (je & 2) === 0 ? Nn(e, 0) : is |= a, _n === ve && (_n = 0)), pa(e);
  }
  function cm(e, t) {
    t === 0 && (t = Ko()), e = Nl(e, t), e !== null && (Jn(e, t), pa(e));
  }
  function Ry(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), cm(e, a);
  }
  function My(e, t) {
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
    l !== null && l.delete(t), cm(e, a);
  }
  function Oy(e, t) {
    return ks(e, t);
  }
  var wn = null, En = null, Kr = !1, hs = !1, Jr = !1, rl = 0;
  function pa(e) {
    e !== En && e.next === null && (En === null ? wn = En = e : En = En.next = e), hs = !0, Kr || (Kr = !0, Hy());
  }
  function Eu(e, t) {
    if (!Jr && hs) {
      Jr = !0;
      do
        for (var a = !1, l = wn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - At(42 | e) + 1) - 1, u &= n & ~(c & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, dm(l, u));
          } else
            u = ve, u = ii(
              l,
              l === Ce ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Kn(l, u) || (a = !0, dm(l, u));
          l = l.next;
        }
      while (a);
      Jr = !1;
    }
  }
  function Uy() {
    rm();
  }
  function rm() {
    hs = Kr = !1;
    var e = 0;
    rl !== 0 && Jy() && (e = rl);
    for (var t = wt(), a = null, l = wn; l !== null; ) {
      var n = l.next, u = om(l, t);
      u === 0 ? (l.next = null, a === null ? wn = n : a.next = n, n === null && (En = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (hs = !0)), l = n;
    }
    qe !== 0 && qe !== 5 || Eu(e), rl !== 0 && (rl = 0);
  }
  function om(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - At(u), f = 1 << c, h = n[c];
      h === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[c] = Ph(f, t)) : h <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = Ce, a = ve, a = ii(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (Te === 2 || Te === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && $s(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Kn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && $s(l), Is(a)) {
        case 2:
        case 8:
          a = Xo;
          break;
        case 32:
          a = ai;
          break;
        case 268435456:
          a = Vo;
          break;
        default:
          a = ai;
      }
      return l = fm.bind(null, e), a = ks(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && $s(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function fm(e, t) {
    if (qe !== 0 && qe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (ms() && e.callbackNode !== a)
      return null;
    var l = ve;
    return l = ii(
      e,
      e === Ce ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Fv(e, l, t), om(e, wt()), e.callbackNode != null && e.callbackNode === a ? fm.bind(null, e) : null);
  }
  function dm(e, t) {
    if (ms()) return null;
    Fv(e, t, !0);
  }
  function Hy() {
    $y(function() {
      (je & 6) !== 0 ? ks(
        Qo,
        Uy
      ) : rm();
    });
  }
  function kr() {
    if (rl === 0) {
      var e = Dl;
      e === 0 && (e = li, li <<= 1, (li & 261888) === 0 && (li = 256)), rl = e;
    }
    return rl;
  }
  function vm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : fi(e);
  }
  function Ly(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = vm(
        (n[pt] || null).action
      ), c = l.submitter;
      c && (t = (t = c[pt] || null) ? vm(t.formAction) : c.getAttribute("formAction"), t !== null && (u = t, c = null));
      var f = new hi(
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
                if (rl !== 0) {
                  var h = new FormData(n, c);
                  ar(
                    a,
                    {
                      pending: !0,
                      data: h,
                      method: n.method,
                      action: u
                    },
                    null,
                    h
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), h = new FormData(n, c), ar(
                  a,
                  {
                    pending: !0,
                    data: h,
                    method: n.method,
                    action: u
                  },
                  u,
                  h
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var $r = 0; $r < Sc.length; $r++) {
    var Fr = Sc[$r], By = Fr.toLowerCase(), qy = Fr[0].toUpperCase() + Fr.slice(1);
    Wt(
      By,
      "on" + qy
    );
  }
  Wt(qf, "onAnimationEnd"), Wt(Yf, "onAnimationIteration"), Wt(Gf, "onAnimationStart"), Wt("dblclick", "onDoubleClick"), Wt("focusin", "onFocus"), Wt("focusout", "onBlur"), Wt(kg, "onTransitionRun"), Wt($g, "onTransitionStart"), Wt(Fg, "onTransitionCancel"), Wt(Qf, "onTransitionEnd"), kl("onMouseEnter", ["mouseout", "mouseover"]), kl("onMouseLeave", ["mouseout", "mouseover"]), kl("onPointerEnter", ["pointerout", "pointerover"]), kl("onPointerLeave", ["pointerout", "pointerover"]), bl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), bl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), bl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), bl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), bl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), bl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Au = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Yy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Au)
  );
  function mm(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], n = l.event;
      l = l.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var c = l.length - 1; 0 <= c; c--) {
            var f = l[c], h = f.instance, x = f.currentTarget;
            if (f = f.listener, h !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = x;
            try {
              u(n);
            } catch (C) {
              pi(C);
            }
            n.currentTarget = null, u = h;
          }
        else
          for (c = 0; c < l.length; c++) {
            if (f = l[c], h = f.instance, x = f.currentTarget, f = f.listener, h !== u && n.isPropagationStopped())
              break e;
            u = f, n.currentTarget = x;
            try {
              u(n);
            } catch (C) {
              pi(C);
            }
            n.currentTarget = null, u = h;
          }
      }
    }
  }
  function de(e, t) {
    var a = t[Io];
    a === void 0 && (a = t[Io] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (hm(t, e, 2, !1), a.add(l));
  }
  function Wr(e, t, a) {
    var l = 0;
    t && (l |= 4), hm(
      a,
      e,
      l,
      t
    );
  }
  var gs = "_reactListening" + Math.random().toString(36).slice(2);
  function Ir(e) {
    if (!e[gs]) {
      e[gs] = !0, tf.forEach(function(a) {
        a !== "selectionchange" && (Yy.has(a) || Wr(a, !1, e), Wr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gs] || (t[gs] = !0, Wr("selectionchange", !1, t));
    }
  }
  function hm(e, t, a, l) {
    switch (nh(t)) {
      case 2:
        var n = R0;
        break;
      case 8:
        n = M0;
        break;
      default:
        n = _o;
    }
    a = n.bind(
      null,
      t,
      a,
      e
    ), n = void 0, !ic || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function Pr(e, t, a, l, n) {
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
              var h = c.tag;
              if ((h === 3 || h === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; f !== null; ) {
            if (c = Sl(f), c === null) return;
            if (h = c.tag, h === 5 || h === 6 || h === 26 || h === 27) {
              l = u = c;
              continue e;
            }
            f = f.parentNode;
          }
        }
        l = l.return;
      }
    hf(function() {
      var x = u, C = nc(a), U = [];
      e: {
        var S = Xf.get(e);
        if (S !== void 0) {
          var E = hi, Y = e;
          switch (e) {
            case "keypress":
              if (vi(a) === 0) break e;
            case "keydown":
            case "keyup":
              E = Ng;
              break;
            case "focusin":
              Y = "focus", E = oc;
              break;
            case "focusout":
              Y = "blur", E = oc;
              break;
            case "beforeblur":
            case "afterblur":
              E = oc;
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
              E = pf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              E = dg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              E = Cg;
              break;
            case qf:
            case Yf:
            case Gf:
              E = hg;
              break;
            case Qf:
              E = zg;
              break;
            case "scroll":
            case "scrollend":
              E = og;
              break;
            case "wheel":
              E = Mg;
              break;
            case "copy":
            case "cut":
            case "paste":
              E = yg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              E = Sf;
              break;
            case "submit":
              E = Eg;
              break;
            case "toggle":
            case "beforetoggle":
              E = Ug;
          }
          var k = (t & 4) !== 0, se = !k && (e === "scroll" || e === "scrollend"), b = k ? S !== null ? S + "Capture" : null : S;
          k = [];
          for (var g = x, w; g !== null; ) {
            var O = g;
            if (w = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || w === null || b === null || (O = Fn(g, b), O != null && k.push(
              Cu(g, O, w)
            )), se) break;
            g = g.return;
          }
          0 < k.length && (S = new E(
            S,
            Y,
            null,
            a,
            C
          ), U.push({ event: S, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (E = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", E && a !== lc && (Y = a.relatedTarget || a.fromElement) && (Sl(Y) || Y[Zl]))
            break e;
          (S || E) && (Y = C.window === C ? C : (E = C.ownerDocument) ? E.defaultView || E.parentWindow : window, S ? (E = a.relatedTarget || a.toElement, S = x, E = E ? Sl(E) : null, E !== null && (se = m(E), k = E.tag, E !== se || k !== 5 && k !== 27 && k !== 6) && (E = null)) : (S = null, E = x), S !== E && (k = pf, O = "onMouseLeave", b = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (k = Sf, O = "onPointerLeave", b = "onPointerEnter", g = "pointer"), se = S == null ? Y : $n(S), w = E == null ? Y : $n(E), Y = new k(
            O,
            g + "leave",
            S,
            a,
            C
          ), Y.target = se, Y.relatedTarget = w, O = null, Sl(C) === x && (k = new k(
            b,
            g + "enter",
            E,
            a,
            C
          ), k.target = w, k.relatedTarget = se, O = k), se = O, k = S && E ? Ue(
            S,
            E,
            Gy
          ) : null, S !== null && gm(
            U,
            Y,
            S,
            k,
            !1
          ), E !== null && se !== null && gm(
            U,
            se,
            E,
            k,
            !0
          )));
        }
        e: {
          if (S = x ? $n(x) : window, E = S.nodeName && S.nodeName.toLowerCase(), E === "select" || E === "input" && S.type === "file")
            var J = Af;
          else if (wf(S))
            if (Cf)
              J = Zg;
            else {
              J = Xg;
              var me = Qg;
            }
          else
            E = S.nodeName, !E || E.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? x && ac(x.elementType) && (J = Af) : J = Vg;
          if (J && (J = J(e, x))) {
            Ef(
              U,
              J,
              a,
              C
            );
            break e;
          }
          me && me(e, S, x);
        }
        switch (me = x ? $n(x) : window, e) {
          case "focusin":
            (wf(me) || me.contentEditable === "true") && (en = me, yc = x, nu = null);
            break;
          case "focusout":
            nu = yc = en = null;
            break;
          case "mousedown":
            pc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pc = !1, Lf(U, a, C);
            break;
          case "selectionchange":
            if (Jg) break;
          case "keydown":
          case "keyup":
            Lf(U, a, C);
        }
        var F;
        if (dc)
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
          Pl ? Nf(e, a) && (ee = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (ee = "onCompositionStart");
        ee && (bf && a.locale !== "ko" && (Pl || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && Pl && (F = gf()) : (Va = C, sc = "value" in Va ? Va.value : Va.textContent, Pl = !0)), me = ys(x, ee), 0 < me.length && (ee = new _f(
          ee,
          e,
          null,
          a,
          C
        ), U.push({ event: ee, listeners: me }), F ? ee.data = F : (F = Tf(a), F !== null && (ee.data = F)))), (F = Lg ? Bg(e, a) : qg(e, a)) && (ee = ys(x, "onBeforeInput"), 0 < ee.length && (me = new _f(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          C
        ), U.push({
          event: me,
          listeners: ee
        }), me.data = F)), Ly(
          U,
          e,
          x,
          a,
          C
        );
      }
      mm(U, t);
    });
  }
  function Cu(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function ys(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Fn(e, a), n != null && l.unshift(
        Cu(e, n, u)
      ), n = Fn(e, t), n != null && l.push(
        Cu(e, n, u)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Gy(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function gm(e, t, a, l, n) {
    for (var u = t._reactName, c = []; a !== null && a !== l; ) {
      var f = a, h = f.alternate, x = f.stateNode;
      if (f = f.tag, h !== null && h === l) break;
      f !== 5 && f !== 26 && f !== 27 || x === null || (h = x, n ? (x = Fn(a, u), x != null && c.unshift(
        Cu(a, x, h)
      )) : n || (x = Fn(a, u), x != null && c.push(
        Cu(a, x, h)
      ))), a = a.return;
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var Qy = /\r\n?/g, Xy = /\u0000|\uFFFD/g;
  function ym(e) {
    return (typeof e == "string" ? e : "" + e).replace(Qy, `
`).replace(Xy, "");
  }
  function pm(e, t) {
    return t = ym(t), ym(e) === t;
  }
  function Ee(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || Fl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && Fl(e, "" + l);
        else return;
        break;
      case "className":
        oi(e, "class", l);
        break;
      case "tabIndex":
        oi(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        oi(e, a, l);
        break;
      case "style":
        vf(e, l, u);
        return;
      case "data":
        if (t !== "object") {
          oi(e, "data", l);
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
        l = fi(l), e.setAttribute(a, l);
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
        l = fi(l), e.setAttribute(a, l);
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
        a = fi(l), e.setAttributeNS(
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
        de("beforetoggle", e), de("toggle", e), ri(e, "popover", l);
        break;
      case "xlinkActuate":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Na(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Na(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Na(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Na(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ri(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = cg.get(a) || a, ri(e, a, l);
        else return;
    }
    be = !0;
  }
  function eo(e, t, a, l, n, u) {
    switch (a) {
      case "style":
        vf(e, l, u);
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
        if (typeof l == "string") Fl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          Fl(e, "" + l);
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
        if (!af.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), u = a.slice(2, n ? a.length - 7 : void 0), t = e[pt] || null, t = t != null ? t[a] : null, typeof t == "function" && e.removeEventListener(u, t, n), typeof l == "function")) {
              typeof t != "function" && t !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(u, l, n);
              break e;
            }
            be = !0, a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ri(e, a, l);
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
        var f = u = c = n = null, h = null, x = null;
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
                  h = C;
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
        rf(
          e,
          u,
          f,
          h,
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
        t = u, a = c, e.multiple = !!l, t != null ? $l(e, !!l, t, !1) : a != null && $l(e, !!l, a, !0);
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
        ff(e, l, n, u);
        return;
      case "option":
        for (h in a)
          if (a.hasOwnProperty(h) && (l = a[h], l != null))
            switch (h) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ee(e, t, h, l, a, null);
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
        for (l = 0; l < Au.length; l++)
          de(Au[l], e);
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
        if (ac(t)) {
          for (C in a)
            a.hasOwnProperty(C) && (l = a[C], l !== void 0 && eo(
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
  var Vy = {};
  function Zy(e, t, a, l) {
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
        var n = null, u = null, c = null, f = null, h = null, x = null, C = null;
        for (E in a) {
          var U = a[E];
          if (a.hasOwnProperty(E) && U != null)
            switch (E) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = U;
              default:
                l.hasOwnProperty(E) || Ee(e, t, E, null, l, U);
            }
        }
        for (var S in l) {
          var E = l[S];
          if (U = a[S], l.hasOwnProperty(S) && (E != null || U != null))
            switch (S) {
              case "type":
                E !== U && (be = !0), u = E;
                break;
              case "name":
                E !== U && (be = !0), n = E;
                break;
              case "checked":
                E !== U && (be = !0), x = E;
                break;
              case "defaultChecked":
                E !== U && (be = !0), C = E;
                break;
              case "value":
                E !== U && (be = !0), c = E;
                break;
              case "defaultValue":
                E !== U && (be = !0), f = E;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(o(137, t));
                break;
              default:
                E !== U && Ee(
                  e,
                  t,
                  S,
                  E,
                  l,
                  U
                );
            }
        }
        ec(
          e,
          c,
          f,
          h,
          x,
          C,
          u,
          n
        );
        return;
      case "select":
        E = c = f = S = null;
        for (u in a)
          if (h = a[u], a.hasOwnProperty(u) && h != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                E = h;
              default:
                l.hasOwnProperty(u) || Ee(
                  e,
                  t,
                  u,
                  null,
                  l,
                  h
                );
            }
        for (n in l)
          if (u = l[n], h = a[n], l.hasOwnProperty(n) && (u != null || h != null))
            switch (n) {
              case "value":
                u !== h && (be = !0), S = u;
                break;
              case "defaultValue":
                u !== h && (be = !0), f = u;
                break;
              case "multiple":
                u !== h && (be = !0), c = u;
              default:
                u !== h && Ee(
                  e,
                  t,
                  n,
                  u,
                  l,
                  h
                );
            }
        t = f, a = c, l = E, S != null ? $l(e, !!a, S, !1) : !!l != !!a && (t != null ? $l(e, !!a, t, !0) : $l(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        E = S = null;
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
                n !== u && (be = !0), E = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Ee(e, t, c, n, l, u);
            }
        of(e, S, E);
        return;
      case "option":
        for (var Y in a)
          if (S = a[Y], a.hasOwnProperty(Y) && S != null && !l.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ee(
                  e,
                  t,
                  Y,
                  null,
                  l,
                  S
                );
            }
        for (h in l)
          if (S = l[h], E = a[h], l.hasOwnProperty(h) && S !== E && (S != null || E != null))
            switch (h) {
              case "selected":
                S !== E && (be = !0), e.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Ee(
                  e,
                  t,
                  h,
                  S,
                  l,
                  E
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
        for (var k in a)
          S = a[k], a.hasOwnProperty(k) && S != null && !l.hasOwnProperty(k) && Ee(e, t, k, null, l, S);
        for (x in l)
          if (S = l[x], E = a[x], l.hasOwnProperty(x) && S !== E && (S != null || E != null))
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
                  E
                );
            }
        return;
      default:
        if (ac(t)) {
          for (var se in a)
            S = a[se], a.hasOwnProperty(se) && S !== void 0 && !l.hasOwnProperty(se) && eo(
              e,
              t,
              se,
              void 0,
              l,
              S
            );
          for (C in l)
            S = l[C], E = a[C], !l.hasOwnProperty(C) || S === E || S === void 0 && E === void 0 || eo(
              e,
              t,
              C,
              S,
              l,
              E
            );
          return;
        }
    }
    for (var b in a)
      S = a[b], a.hasOwnProperty(b) && S != null && !l.hasOwnProperty(b) && Ee(e, t, b, null, l, S);
    for (U in l)
      S = l[U], E = a[U], !l.hasOwnProperty(U) || S === E || S == null && E == null || Ee(e, t, U, S, l, E);
  }
  function _m(e) {
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
  function Ky() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, c = n.initiatorType, f = n.duration;
        if (u && f && _m(c)) {
          for (c = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var h = a[l], x = h.startTime;
            if (x > f) break;
            var C = h.transferSize, U = h.initiatorType;
            C && _m(U) && (h = h.responseEnd, c += C * (h < f ? 1 : (f - x) / (h - x)));
          }
          if (--l, t += 8 * (u + c) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var to = null, ao = null;
  function Du(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Sm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function bm(e, t) {
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
  function xm(e, t, a, l) {
    return a = Du(
      a
    ).createElement(e), a[lt] = l, a[pt] = t, ct(a, e, t), Ie(a), a;
  }
  function lo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var no = null;
  function Jy() {
    var e = window.event;
    return e && e.type === "popstate" ? e === no ? !1 : (no = e, !0) : (no = null, !1);
  }
  var uo = typeof setTimeout == "function" ? setTimeout : void 0, ky = typeof clearTimeout == "function" ? clearTimeout : void 0, jm = typeof Promise == "function" ? Promise : void 0, Nm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : uo, $y = typeof queueMicrotask == "function" ? queueMicrotask : typeof jm < "u" ? function(e) {
    return jm.resolve(null).then(e).catch(Fy);
  } : uo;
  function Fy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ol(e) {
    return e === "head";
  }
  function Tm(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), On(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          mo(
            e.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = e.ownerDocument.head, mo(a);
          for (var u = a.firstChild; u; ) {
            var c = u.nextSibling, f = u.nodeName;
            u[kn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = c;
          }
        } else
          a === "body" && mo(e.ownerDocument.body);
      a = n;
    } while (a);
    On(t);
  }
  function wm(e, t) {
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
  function Em(e, t, a) {
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
  function Am(e, t) {
    e = e.style, t = t.style;
    var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (a = t.display, e.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin, a != null ? e.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = a == null || typeof a == "boolean" ? "" : a, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Wy(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function io(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Wy(t, a, e);
  }
  function Iy(e) {
    return e.documentElement.clientHeight;
  }
  function Py(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function e0(e, t, a, l, n, u, c, f, h) {
    var x = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var C = x.startViewTransition({
        update: function() {
          var S = x.defaultView, E = S.navigation && S.navigation.transition, Y = x.fonts.status;
          l();
          var k = [];
          if (Y === "loaded" && (Iy(x), x.fonts.status === "loading" && k.push(x.fonts.ready)), Y = k.length, e !== null)
            for (var se = e.suspenseyImages, b = 0, g = 0; g < se.length; g++) {
              var w = se[g];
              if (!w.complete) {
                var O = w.getBoundingClientRect();
                if (0 < O.bottom && 0 < O.right && O.top < S.innerHeight && O.left < S.innerWidth) {
                  if (b += $m(w), b > Ss) {
                    k.length = Y;
                    break;
                  }
                  w = new Promise(
                    Py.bind(w)
                  ), k.push(w);
                }
              }
            }
          if (0 < k.length)
            return S = Promise.race([
              Promise.all(k),
              new Promise(function(J) {
                return setTimeout(J, 500);
              })
            ]).then(n, n), (E ? Promise.allSettled([E.finished, S]) : S).then(u, u);
          if (n(), E)
            return E.finished.then(
              u,
              u
            );
          u();
        },
        types: a
      });
      x.__reactViewTransition = C;
      var U = [];
      return C.ready.then(
        function() {
          for (var S = x.documentElement.getAnimations({
            subtree: !0
          }), E = 0; E < S.length; E++) {
            var Y = S[E], k = Y.effect, se = k.pseudoElement;
            if (se != null && se.startsWith("::view-transition")) {
              U.push(Y), Y = k.getKeyframes();
              for (var b = se = void 0, g = !0, w = 0; w < Y.length; w++) {
                var O = Y[w], J = O.width;
                if (se === void 0) se = J;
                else if (se !== J) {
                  g = !1;
                  break;
                }
                if (J = O.height, b === void 0) b = J;
                else if (b !== J) {
                  g = !1;
                  break;
                }
                delete O.width, delete O.height, O.transform === "none" && delete O.transform;
              }
              g && se !== void 0 && b !== void 0 && (k.setKeyframes(Y), g = getComputedStyle(
                k.target,
                k.pseudoElement
              ), g.width !== se || g.height !== b) && (g = Y[0], g.width = se, g.height = b, g = Y[Y.length - 1], g.width = se, g.height = b, k.setKeyframes(Y));
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
            S !== null && h(S);
          } finally {
            l(), n(), c();
          }
        }
      ), C.finished.finally(function() {
        for (var S = 0; S < U.length; S++)
          U[S].cancel();
        x.__reactViewTransition === C && (x.__reactViewTransition = null), f();
      }), C;
    } catch {
      return l(), n(), c(), null;
    }
  }
  function Gl(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Gl.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : V({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Gl.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, Gl.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Cm(e) {
    return {
      name: e,
      group: new Gl("group", e),
      imagePair: new Gl("image-pair", e),
      old: new Gl("old", e),
      new: new Gl("new", e)
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
      if (zm(u, e, t, a) === -1) {
        var c = this, f = t;
        a != null && typeof a != "boolean" && a.once === !0 && (f = function(h) {
          c.removeEventListener(
            e,
            t,
            a
          ), typeof t == "function" ? t.call(this, h) : t.handleEvent(h);
        }), l !== null && (n = c.removeEventListener.bind(
          c,
          e,
          t,
          a
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = An(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), y(
          this._fragmentFiber.child,
          !1,
          t0,
          e,
          f,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function t0(e, t, a, l) {
    return B(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Ht.prototype.removeEventListener = function(e, t, a) {
    var l = this._eventListeners;
    if (l !== null && (t = zm(
      l,
      e,
      t,
      a
    ), t !== -1)) {
      var n = l[t];
      a = n.attachedListener;
      var u = n.cleanup;
      n = An(n.optionsOrUseCapture), y(
        this._fragmentFiber.child,
        !1,
        a0,
        e,
        a,
        n
      ), l.splice(t, 1), u !== null && u();
    }
  };
  function a0(e, t, a, l) {
    return B(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function An(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Dm(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function zm(e, t, a, l) {
    if (e.length === 0) return -1;
    l = Dm(l);
    for (var n = 0; n < e.length; n++) {
      var u = e[n];
      if (u.type === t && u.listener === a && Dm(u.optionsOrUseCapture) === l)
        return n;
    }
    return -1;
  }
  Ht.prototype.dispatchEvent = function(e) {
    var t = R(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = B(t);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !e.bubbles) {
      var l = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (a)
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.addEventListener(
            u.type,
            u.attachedListener,
            An(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            An(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Ht.prototype.focus = function(e) {
    y(
      this._fragmentFiber.child,
      !0,
      Rm,
      e,
      void 0,
      void 0
    );
  };
  function Rm(e, t) {
    return e.tag === 6 ? !1 : (e = B(e), m0(e, t));
  }
  Ht.prototype.focusLast = function(e) {
    var t = [];
    y(
      this._fragmentFiber.child,
      !0,
      so,
      t,
      void 0,
      void 0
    );
    for (var a = t.length - 1; 0 <= a && !Rm(t[a], e); a--) ;
  };
  function so(e, t) {
    return t.push(e), !1;
  }
  Ht.prototype.blur = function() {
    var e = R(
      this._fragmentFiber
    );
    e !== null && (e = B(e), e = Du(e).activeElement, e !== null && y(
      this._fragmentFiber.child,
      !1,
      l0,
      e,
      void 0,
      void 0
    ));
  };
  function l0(e, t) {
    return e.tag === 6 ? !1 : (e = B(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Ht.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), y(
      this._fragmentFiber.child,
      !1,
      n0,
      e,
      void 0,
      void 0
    );
  };
  function n0(e, t) {
    return e.tag === 6 || (e = B(e), t.observe(e)), !1;
  }
  Ht.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), y(
        this._fragmentFiber.child,
        !1,
        u0,
        e,
        void 0,
        void 0
      );
      for (var a = t = 0; a < aa.length; a++) {
        var l = aa[a];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : aa[t++] = l;
      }
      aa.length = t;
    }
  };
  function u0(e, t) {
    return e.tag === 6 || (e = B(e), t.unobserve(e)), !1;
  }
  var aa = [], co = !1;
  function i0(e, t, a) {
    aa.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), co || (co = !0, h0(function() {
      co = !1;
      var l = aa;
      aa = [];
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
      s0,
      e,
      void 0,
      void 0
    ), e;
  };
  function s0(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var a = e.ownerDocument.createRange();
      a.selectNodeContents(e), t.push.apply(t, a.getClientRects());
    } else
      e = B(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Ht.prototype.getRootNode = function(e) {
    var t = R(
      this._fragmentFiber
    );
    return t === null ? this : B(t).getRootNode(e);
  }, Ht.prototype.compareDocumentPosition = function(e) {
    var t = R(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    y(
      this._fragmentFiber.child,
      !1,
      so,
      a,
      void 0,
      void 0
    );
    var l = B(t);
    if (a.length === 0) {
      if (a = l, z(this._fragmentFiber)) {
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
      return a === e ? n = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = D(t)[1], a === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = B(a).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = B(a[0]), n = B(a[a.length - 1]);
    var u = z(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), h = c & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && c & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || h || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || c0(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function c0(e, t, a, l, n) {
    var u = Sl(n);
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
        for (u = t, t = R(t); u !== null; ) {
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
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === a) && (t = Ue(
      a,
      u,
      Le
    ), t === null ? t = !1 : (y(
      t,
      !0,
      X,
      u,
      a
    ), u = Z, Z = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === l) && (t = Ue(
      l,
      u,
      Le
    ), t === null ? t = !1 : (y(
      t,
      !0,
      re,
      u,
      l
    ), u = Z, te = Z = null, t = u !== null)), t) : !1;
  }
  function Mm(e, t) {
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
      so,
      t,
      void 0,
      void 0
    );
    var a = e !== !1;
    if (t.length === 0) {
      var l = D(
        this._fragmentFiber
      );
      if (l = a ? l[1] || l[0] || R(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = B(l), Mm(e, a);
        return;
      }
      if (l = B(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          a = "host" in l ? l.host : null, a !== null && a.scrollIntoView(e);
          return;
        }
        l.scrollIntoView(e);
      }
    }
    for (l = a ? t.length - 1 : 0; l !== (a ? -1 : t.length); ) {
      var n = t[l];
      n.tag === 6 ? (n = B(n), Mm(n, a)) : B(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function r0(e, t) {
    return e = B(e), Om(e, t), !1;
  }
  function Om(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Um(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          An(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var c = 0, f = 0; f < aa.length; f++) {
        var h = aa[f];
        (h.fragmentInstance !== t || h.observer !== u || h.instance !== e) && (aa[c++] = h);
      }
      aa.length = c, u.observe(e);
    }), Om(e, t));
  }
  function o0(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          An(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      typeof u.rootMargin == "string" ? i0(
        t,
        u,
        e
      ) : u.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function ro(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ro(a), ci(a);
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
  function f0(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[kn])
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
      if (e = Kt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function d0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Hm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Kt(e.nextSibling), e === null)) return null;
    return e;
  }
  function oo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function fo(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function v0(e, t) {
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
  function Kt(e) {
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
  var vo = null;
  function Lm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Kt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Bm(e) {
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
  function m0(e, t) {
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
  function h0(e) {
    Nm(function() {
      Nm(function(t) {
        return e(t);
      });
    });
  }
  function qm(e, t, a) {
    switch (t = Du(a), e) {
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
  function Ym(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ee(e, t, l, null, Vy, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === ca && (e.onclick = null), ci(e);
  }
  function mo(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ci(e);
  }
  var Jt = /* @__PURE__ */ new Map(), Gm = /* @__PURE__ */ new Set();
  function zu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var La = ae.d;
  ae.d = {
    f: g0,
    r: y0,
    D: p0,
    C: _0,
    L: S0,
    m: b0,
    X: j0,
    S: x0,
    M: N0
  };
  function g0() {
    var e = La.f(), t = fs();
    return e || t;
  }
  function y0(e) {
    var t = Kl(e);
    t !== null && t.tag === 5 && t.type === "form" ? Xd(t) : La.r(e);
  }
  var Cn = typeof document > "u" ? null : document;
  function Qm(e, t, a) {
    var l = Cn;
    if (l && typeof t == "string" && t) {
      var n = qt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Gm.has(n) || (Gm.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), ct(t, "link", e), Ie(t), l.head.appendChild(t)));
    }
  }
  function p0(e) {
    La.D(e), Qm("dns-prefetch", e, null);
  }
  function _0(e, t) {
    La.C(e, t), Qm("preconnect", e, t);
  }
  function S0(e, t, a) {
    La.L(e, t, a);
    var l = Cn;
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
          u = Dn(e);
          break;
        case "script":
          u = zn(e);
      }
      if (!(Jt.has(u) || (e = V(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Jt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(Ru(u)) || t === "script" && l.querySelector(Mu(u))))) {
        var c = l.createElement("link");
        ct(c, "link", e), t === "style" && (c[si] = !0, c.onload = c.onerror = function() {
          ef(c);
        }), Ie(c), l.head.appendChild(c);
      }
    }
  }
  function b0(e, t) {
    La.m(e, t);
    var a = Cn;
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
      if (!Jt.has(u) && (e = V({ rel: "modulepreload", href: e }, t), Jt.set(u, e), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Mu(u)))
              return;
        }
        l = a.createElement("link"), ct(l, "link", e), Ie(l), a.head.appendChild(l);
      }
    }
  }
  function x0(e, t, a) {
    La.S(e, t, a);
    var l = Cn;
    if (l && e) {
      var n = Jl(l).hoistableStyles, u = Dn(e);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var f = { loading: 0, preload: null };
        if (c = l.querySelector(
          Ru(u)
        ))
          f.loading = 5;
        else {
          e = V(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Jt.get(u)) && ho(e, a);
          var h = c = l.createElement("link");
          Ie(h), ct(h, "link", e), h._p = new Promise(function(x, C) {
            h.onload = x, h.onerror = C;
          }), h.addEventListener("load", function() {
            f.loading |= 1;
          }), h.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, ps(c, t, l);
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
  function j0(e, t) {
    La.X(e, t);
    var a = Cn;
    if (a && e) {
      var l = Jl(a).hoistableScripts, n = zn(e), u = l.get(n);
      u || (u = a.querySelector(Mu(n)), u || (e = V({ src: e, async: !0 }, t), (t = Jt.get(n)) && go(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function N0(e, t) {
    La.M(e, t);
    var a = Cn;
    if (a && e) {
      var l = Jl(a).hoistableScripts, n = zn(e), u = l.get(n);
      u || (u = a.querySelector(Mu(n)), u || (e = V({ src: e, async: !0, type: "module" }, t), (t = Jt.get(n)) && go(e, t), u = a.createElement("script"), Ie(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Xm(e, t, a, l) {
    var n = (n = Ga.current) ? zu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = Dn(a.href), t = Jl(
          n
        ).hoistableStyles, l = t.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Dn(a.href);
          var u = Jl(
            n
          ).hoistableStyles, c = u.get(e);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, c), (u = n.querySelector(
            Ru(e)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = Jt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Jt.set(e, u)), T0(
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
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = zn(a), t = Jl(
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
  function Dn(e) {
    return 'href="' + qt(e) + '"';
  }
  function Ru(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Vm(e) {
    return V({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function T0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[si] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[si] = !0, t.onload = t.onerror = ef.bind(null, t), ct(t, "link", a), Ie(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function zn(e) {
    return '[src="' + qt(e) + '"]';
  }
  function Mu(e) {
    return "script[async]" + e;
  }
  function Zm(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + qt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Ie(l), l;
          var n = V({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ie(l), ct(l, "style", n), ps(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = Dn(a.href);
          var u = e.querySelector(
            Ru(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Ie(u), u;
          l = Vm(a), (n = Jt.get(n)) && ho(l, n), u = (e.ownerDocument || e).createElement("link"), Ie(u);
          var c = u;
          return c._p = new Promise(function(f, h) {
            c.onload = f, c.onerror = h;
          }), ct(u, "link", l), t.state.loading |= 4, ps(u, a.precedence, e), t.instance = u;
        case "script":
          return u = zn(a.src), (n = e.querySelector(
            Mu(u)
          )) ? (t.instance = n, Ie(n), n) : (l = a, (n = Jt.get(u)) && (l = V({}, a), go(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), Ie(n), ct(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, ps(l, a.precedence, e));
    return t.instance;
  }
  function ps(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, c = 0; c < l.length; c++) {
      var f = l[c];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function ho(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function go(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var _s = null;
  function Km(e, t, a) {
    if (_s === null) {
      var l = /* @__PURE__ */ new Map(), n = _s = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = _s, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[kn] || u[lt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(t) || "";
        c = e + c;
        var f = l.get(c);
        f ? f.push(u) : l.set(c, [u]);
      }
    }
    return l;
  }
  function yo(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function w0(e, t, a) {
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
  function Jm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function km(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function $m(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Fm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += $m(t), e.suspenseyImages.push(t)), e = C0.bind(e), t.decode().then(e, e));
  }
  function E0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = Dn(l.href), u = t.querySelector(
          Ru(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ou.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, Ie(u);
          return;
        }
        u = t.ownerDocument || t, l = Vm(l), (n = Jt.get(n)) && ho(l, n), u = u.createElement("link"), Ie(u);
        var c = u;
        c._p = new Promise(function(f, h) {
          c.onload = f, c.onerror = h;
        }), ct(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Ou.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Ss = 0;
  function A0(e, t) {
    return e.stylesheets && e.count === 0 && xs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && xs(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ss === 0 && (Ss = 62500 * Ky());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && xs(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Ss ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Wm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) xs(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Ou() {
    this.count--, Wm(this);
  }
  function C0() {
    this.imgCount--, Wm(this);
  }
  var bs = null;
  function xs(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, bs = /* @__PURE__ */ new Map(), t.forEach(D0, e), bs = null, Ou.call(e));
  }
  function D0(e, t) {
    if (!(t.state.loading & 4)) {
      var a = bs.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), bs.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (a.set(c.dataset.precedence, c), l = c);
        }
        l && a.set(null, l);
      }
      n = t.instance, c = n.getAttribute("data-precedence"), u = a.get(c) || l, u === l && a.set(null, n), a.set(c, n), this.count++, l = Ou.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Rn = {
    $$typeof: Me,
    Provider: null,
    Consumer: null,
    _currentValue: xa,
    _currentValue2: xa,
    _threadCount: 0
  };
  function z0(e, t, a, l, n, u, c, f, h) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fs(0), this.hiddenUpdates = Fs(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Im(e, t, a, l, n, u, c, f, h, x, C, U) {
    return e = new z0(
      e,
      t,
      a,
      c,
      h,
      x,
      C,
      U,
      f
    ), t = 1, u === !0 && (t |= 24), u = _t(3, null, null, t), e.current = u, u.stateNode = e, t = zc(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, Uc(u), e;
  }
  function Pm(e) {
    return e ? (e = ln, e) : ln;
  }
  function eh(e, t, a, l, n, u) {
    n = Pm(n), l.context === null ? l.context = n : l.pendingContext = n, l = Ia(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = Pa(e, l, t), a !== null && (jt(a, e, t), fu(a, e, t));
  }
  function th(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function po(e, t) {
    th(e, t), (e = e.alternate) && th(e, t);
  }
  function ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Nl(e, 67108864);
      t !== null && jt(t, e, 67108864), po(e, 67108864);
    }
  }
  function lh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ut();
      t = Ws(t);
      var a = Nl(e, t);
      a !== null && jt(a, e, t), po(e, t);
    }
  }
  var Mn = !0;
  function R0(e, t, a, l) {
    var n = $.T;
    $.T = null;
    var u = ae.p;
    try {
      ae.p = 2, _o(e, t, a, l);
    } finally {
      ae.p = u, $.T = n;
    }
  }
  function M0(e, t, a, l) {
    var n = $.T;
    $.T = null;
    var u = ae.p;
    try {
      ae.p = 8, _o(e, t, a, l);
    } finally {
      ae.p = u, $.T = n;
    }
  }
  function _o(e, t, a, l) {
    if (Mn) {
      var n = So(l);
      if (n === null)
        Pr(
          e,
          t,
          l,
          js,
          a
        ), uh(e, l);
      else if (U0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (uh(e, l), t & 4 && -1 < O0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Kl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = _l(u.pendingLanes);
                  if (c !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; c; ) {
                      var h = 1 << 31 - At(c);
                      f.entanglements[1] |= h, c &= ~h;
                    }
                    pa(u), (je & 6) === 0 && (cs = wt() + 500, Eu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Nl(u, 2), f !== null && jt(f, u, 2), fs(), po(u, 2);
            }
          if (u = So(l), u === null && Pr(
            e,
            t,
            l,
            js,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        Pr(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function So(e) {
    return e = nc(e), bo(e);
  }
  var js = null;
  function bo(e) {
    if (js = null, e = Sl(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = T(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return js = e, null;
  }
  function nh(e) {
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
        switch (Kh()) {
          case Qo:
            return 2;
          case Xo:
            return 8;
          case ai:
          case Jh:
            return 32;
          case Vo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var xo = !1, fl = null, dl = null, vl = null, Uu = /* @__PURE__ */ new Map(), Hu = /* @__PURE__ */ new Map(), ml = [], O0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function uh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        fl = null;
        break;
      case "dragenter":
      case "dragleave":
        dl = null;
        break;
      case "mouseover":
      case "mouseout":
        vl = null;
        break;
      case "pointerover":
      case "pointerout":
        Uu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hu.delete(t.pointerId);
    }
  }
  function Lu(e, t, a, l, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Kl(t), t !== null && ah(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function U0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return fl = Lu(
          fl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return dl = Lu(
          dl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return vl = Lu(
          vl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Uu.set(
          u,
          Lu(
            Uu.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Hu.set(
          u,
          Lu(
            Hu.get(u) || null,
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
  function ih(e) {
    var t = Sl(e.target);
    if (t !== null) {
      var a = m(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = p(a), t !== null) {
            e.blockedOn = t, Wo(e.priority, function() {
              lh(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = T(a), t !== null) {
            e.blockedOn = t, Wo(e.priority, function() {
              lh(a);
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
  function Ns(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = So(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        lc = l, a.target.dispatchEvent(l), lc = null;
      } else
        return t = Kl(a), t !== null && ah(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function sh(e, t, a) {
    Ns(e) && a.delete(t);
  }
  function H0() {
    xo = !1, fl !== null && Ns(fl) && (fl = null), dl !== null && Ns(dl) && (dl = null), vl !== null && Ns(vl) && (vl = null), Uu.forEach(sh), Hu.forEach(sh);
  }
  function Ts(e, t) {
    e.blockedOn === t && (e.blockedOn = null, xo || (xo = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      H0
    )));
  }
  var ws = null;
  function ch(e) {
    ws !== e && (ws = e, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        ws === e && (ws = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (bo(l || a) === null)
              continue;
            break;
          }
          var u = Kl(a);
          u !== null && (e.splice(t, 3), t -= 3, ar(
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
  function On(e) {
    function t(h) {
      return Ts(h, e);
    }
    fl !== null && Ts(fl, e), dl !== null && Ts(dl, e), vl !== null && Ts(vl, e), Uu.forEach(t), Hu.forEach(t);
    for (var a = 0; a < ml.length; a++) {
      var l = ml[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < ml.length && (a = ml[0], a.blockedOn === null); )
      ih(a), a.blockedOn === null && ml.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], c = n[pt] || null;
        if (typeof u == "function")
          c || ch(a);
        else if (c) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[pt] || null)
              f = c.formAction;
            else if (bo(n) !== null) continue;
          } else f = c.action;
          typeof f == "function" ? a[l + 1] = f : (a.splice(l, 3), l -= 3), ch(a);
        }
      }
  }
  function rh() {
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
  function jo(e) {
    this._internalRoot = e;
  }
  Es.prototype.render = jo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Ut();
    eh(a, l, e, t, null, null);
  }, Es.prototype.unmount = jo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      eh(e.current, 2, null, e, null, null), fs(), t[Zl] = null;
    }
  };
  function Es(e) {
    this._internalRoot = e;
  }
  Es.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Fo();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < ml.length && t !== 0 && t < ml[a].priority; a++) ;
      ml.splice(a, 0, e), a === 0 && ih(e);
    }
  };
  var oh = r.version;
  if (oh !== "19.3.1")
    throw Error(
      o(
        527,
        oh,
        "19.3.1"
      )
    );
  ae.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = M(t), e = e !== null ? A(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var L0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: $,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var As = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!As.isDisabled && As.supportsFiber)
      try {
        Zn = As.inject(
          L0
        ), Et = As;
      } catch {
      }
  }
  return qu.createRoot = function(e, t) {
    if (!v(e)) throw Error(o(299));
    var a = !1, l = "", n = Pd, u = ev, c = tv;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = Im(
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
      rh
    ), e[Zl] = t.current, Ir(e), new jo(t);
  }, qu.hydrateRoot = function(e, t, a) {
    if (!v(e)) throw Error(o(299));
    var l = !1, n = "", u = Pd, c = ev, f = tv, h = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (c = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError), a.formState !== void 0 && (h = a.formState)), t = Im(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      n,
      h,
      u,
      c,
      f,
      rh
    ), t.context = Pm(null), a = t.current, l = Ut(), l = Ws(l), n = Ia(l), n.callback = null, Pa(a, n, l), a = l, t.current.lanes = a, Jn(t, a), pa(t), e[Zl] = t.current, Ir(e), new Es(t);
  }, qu.version = "19.3.1", qu;
}
var Sh;
function J0() {
  if (Sh) return To.exports;
  Sh = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (r) {
        console.error(r);
      }
  }
  return s(), To.exports = K0(), To.exports;
}
var k0 = J0(), N = Lo();
const Mh = N.createContext(null);
function bh() {
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
function $0({ children: s }) {
  const [r, d] = N.useState(bh), o = N.useCallback(function() {
    d(bh());
  }, []), v = N.useCallback(
    async function(T) {
      await window.setActiveMasterContext(T), o();
    },
    [o]
  ), m = N.useCallback(
    function(T) {
      window.setThemeMode(T), o();
    },
    [o]
  );
  N.useEffect(
    function() {
      return window.addEventListener("theme-changed", o), function() {
        window.removeEventListener("theme-changed", o);
      };
    },
    [o]
  );
  const p = N.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        setThemeMode: m
      });
    },
    [r, o, v, m]
  );
  return /* @__PURE__ */ i.jsx(Mh.Provider, { value: p, children: s });
}
function ye() {
  const s = N.useContext(Mh);
  if (!s)
    throw new Error("useApp() must be called inside <AppProvider>");
  return s;
}
const F0 = "_button_fpxiy_7", W0 = "_primary_fpxiy_22", I0 = "_secondary_fpxiy_30", P0 = "_danger_fpxiy_39", ep = "_spinner_fpxiy_52", tp = "_labelLoading_fpxiy_61", Un = {
  button: F0,
  primary: W0,
  secondary: I0,
  danger: P0,
  spinner: ep,
  labelLoading: tp
};
function G({
  variant: s = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...m
}) {
  var p = s === "secondary" ? Un.secondary : s === "danger" ? Un.danger : Un.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [Un.button, p, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...m,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: Un.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? Un.labelLoading : void 0, children: o })
      ]
    }
  );
}
const ap = "_backdrop_13xfr_1", lp = "_dialog_13xfr_12", np = "_header_13xfr_23", up = "_title_13xfr_30", ip = "_closeBtn_13xfr_35", Hn = {
  backdrop: ap,
  dialog: lp,
  header: np,
  title: up,
  closeBtn: ip
};
function Iu({ title: s, onClose: r, children: d }) {
  return N.useEffect(function() {
    function o(v) {
      v.key === "Escape" && r();
    }
    return document.addEventListener("keydown", o), function() {
      document.removeEventListener("keydown", o);
    };
  }, [r]), /* @__PURE__ */ i.jsx(
    "div",
    {
      className: Hn.backdrop,
      onClick: function(o) {
        o.target === o.currentTarget && r();
      },
      children: /* @__PURE__ */ i.jsxs("div", { className: Hn.dialog, role: "dialog", "aria-modal": "true", "aria-label": s, children: [
        /* @__PURE__ */ i.jsxs("div", { className: Hn.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: Hn.title, children: s }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: Hn.closeBtn,
              onClick: r,
              "aria-label": "Close dialog",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: Hn.body, children: d })
      ] })
    }
  );
}
const sp = "_group_1wdnn_1", cp = "_label_1wdnn_8", rp = "_input_1wdnn_14", op = "_error_1wdnn_32", Yu = {
  group: sp,
  label: cp,
  input: rp,
  error: op
};
function ue({ label: s, error: r, multiline: d = !1, id: o, ...v }) {
  var m = o || "field-" + (s == null ? void 0 : s.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: Yu.group, children: [
    s ? /* @__PURE__ */ i.jsx("label", { className: Yu.label, htmlFor: m, children: s }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: m, className: Yu.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: m, className: Yu.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: Yu.error, children: r }) : null
  ] });
}
function na(s) {
  var r = s.table, d = s.select || "*", o = s.masterUsername, v = s.sort, m = s.enabled !== !1, [p, T] = N.useState([]), [j, M] = N.useState("loading"), [A, y] = N.useState(null), R = N.useRef(Math.random().toString(36).slice(2)).current, z = N.useCallback(
    async function() {
      if (!m || !o) {
        T([]), M("ready");
        return;
      }
      M("loading"), y(null);
      var D = window.supabase.from(r).select(d).eq("master_username", o), H = await D;
      if (H.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", H.error), y(H.error), M("error");
        return;
      }
      var B = H.data || [];
      v && (B = B.slice().sort(v)), T(B), M("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [r, d, o, m]
  );
  return N.useEffect(
    function() {
      if (z(), !(!m || !o)) {
        var D = window.supabase.channel("beta_" + r + "_" + o + "_" + R).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: r,
            filter: "master_username=eq." + o
          },
          function(H) {
            T(function(B) {
              var Z = B;
              return H.eventType === "INSERT" ? Z = [H.new].concat(B) : H.eventType === "UPDATE" ? Z = B.map(function(te) {
                return te.id === H.old.id ? H.new : te;
              }) : H.eventType === "DELETE" && (Z = B.filter(function(te) {
                return te.id !== H.old.id;
              })), v ? Z.slice().sort(v) : Z;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(D);
        };
      }
    },
    [r, o, m, z]
  ), { items: p, status: j, error: A, reload: z };
}
function fp(s, r) {
  return new Date(r.started_at) - new Date(s.started_at);
}
function Bo() {
  var s = ye(), r = na({
    table: "active_cost_trackers",
    masterUsername: s.activeMasterContext,
    sort: fp
  }), d = r.items.filter(function(v) {
    return v.status === "running";
  }), o = r.items.filter(function(v) {
    return v.status === "stopped";
  }).sort(function(v, m) {
    return new Date(m.updated_at) - new Date(v.updated_at);
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
    startTracker: function(v, m, p, T, j, M) {
      return window.startLiveCostTracker(
        v,
        m,
        p,
        T,
        j,
        M
      ).then(function(A) {
        return r.reload(), A;
      });
    },
    stopTracker: function(v, m) {
      return window.stopLiveCostTracker(v, m !== !1).then(function(p) {
        return r.reload(), p;
      });
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v).then(function(m) {
        return r.reload(), m;
      });
    },
    addPenalty: function(v, m, p) {
      return window.addPenaltyToLiveTracker(v, m, p).then(function(T) {
        return r.reload(), T;
      });
    },
    removePenalty: function(v, m) {
      return window.removePenaltyFromLiveTracker(v, m).then(function(p) {
        return r.reload(), p;
      });
    }
  };
}
const dp = "_card_1j746_1", vp = "_raised_1j746_8", xh = {
  card: dp,
  raised: vp
};
function ge({ raised: s = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [s ? xh.raised : xh.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const mp = "_card_b5s19_1", hp = "_description_b5s19_9", gp = "_meta_b5s19_19", yp = "_readout_b5s19_31", pp = "_amount_b5s19_47", _p = "_penaltyList_b5s19_55", Sp = "_removePenalty_b5s19_71", bp = "_penaltyForm_b5s19_87", xp = "_stopActions_b5s19_103", _a = {
  card: mp,
  description: hp,
  meta: gp,
  readout: yp,
  amount: pp,
  penaltyList: _p,
  removePenalty: Sp,
  penaltyForm: bp,
  stopActions: xp
};
function jp(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function Np(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, m = d / o * v, p = [];
  try {
    p = JSON.parse(s.penalties || "[]");
  } catch {
    p = [];
  }
  var T = p.reduce(function(R, z) {
    return R + (parseFloat(z.amount) || 0);
  }, 0), j = Math.floor(d / 36e5), M = Math.floor(d % 36e5 / 6e4), A = Math.floor(d % 6e4 / 1e3), y = String(j).padStart(2, "0") + ":" + String(M).padStart(2, "0") + ":" + String(A).padStart(2, "0");
  return {
    timeText: y,
    penalties: p,
    penaltyTotal: T,
    grandTotal: m + T
  };
}
function Ys({ tracker: s, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: m }) {
  var [p, T] = N.useState(Date.now()), [j, M] = N.useState(""), [A, y] = N.useState("");
  N.useEffect(function() {
    var H = window.setInterval(function() {
      T(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(H);
    };
  }, []);
  var R = Np(s, p), z = window.users[s.created_by], D = (s.assigned_to || []).map(function(H) {
    var B = window.users[H];
    return B ? B.displayName : H;
  });
  return /* @__PURE__ */ i.jsxs(ge, { className: _a.card, children: [
    /* @__PURE__ */ i.jsx("p", { className: _a.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("p", { className: _a.meta, children: [
      "by ",
      z ? z.displayName : s.created_by,
      " · ",
      s.currency,
      parseFloat(s.rate).toFixed(2),
      " per ",
      jp(parseInt(s.increment_interval))
    ] }),
    r ? /* @__PURE__ */ i.jsxs("p", { className: _a.meta, children: [
      "Assigned to: ",
      D.length > 0 ? D.join(", ") : "N/A"
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: _a.readout, children: [
      /* @__PURE__ */ i.jsx("span", { children: R.timeText }),
      /* @__PURE__ */ i.jsxs("span", { className: _a.amount, children: [
        s.currency,
        R.grandTotal.toFixed(2)
      ] })
    ] }),
    R.penalties.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: _a.penaltyList, children: R.penalties.map(function(H) {
      return /* @__PURE__ */ i.jsxs("li", { children: [
        H.description,
        ": ",
        s.currency,
        parseFloat(H.amount).toFixed(2),
        r ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: _a.removePenalty,
            onClick: function() {
              m(s.id, H.id);
            },
            "aria-label": "Remove penalty " + H.description,
            children: "×"
          }
        ) : null
      ] }, H.id);
    }) }) : null,
    r ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: _a.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: j,
            onChange: function(H) {
              M(H.target.value);
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
            value: A,
            onChange: function(H) {
              y(H.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "secondary",
            disabled: !j.trim() || !A,
            onClick: function() {
              v(s.id, j, Number(A)), M(""), y("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: _a.stopActions, children: [
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
const Tp = "_pill_wktg6_1", wp = {
  pill: Tp
};
function Ep(s, r) {
  var d = Math.max(0, r - new Date(s.started_at).getTime()), o = parseInt(s.increment_interval) || 6e4, v = parseFloat(s.rate) || 0, m = d / o * v, p = [];
  try {
    p = JSON.parse(s.penalties || "[]");
  } catch {
    p = [];
  }
  var T = p.reduce(function(A, y) {
    return A + (parseFloat(y.amount) || 0);
  }, 0), j = Math.floor(d / 6e4), M = Math.floor(d % 6e4 / 1e3);
  return {
    timeText: String(j).padStart(2, "0") + ":" + String(M).padStart(2, "0"),
    total: m + T
  };
}
function Ap() {
  var s = ye(), r = Bo(), [d, o] = N.useState(Date.now()), [v, m] = N.useState(!1), p = r.trackers.find(function(M) {
    return Array.isArray(M.assigned_to) && M.assigned_to.includes(s.currentUser);
  }), T = p ? p.id : null;
  if (N.useEffect(
    function() {
      if (T) {
        var M = window.setInterval(function() {
          o(Date.now());
        }, 1e3);
        return function() {
          window.clearInterval(M);
        };
      }
    },
    [T]
  ), !s.isSlave || !p) return null;
  var j = Ep(p, d);
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: wp.pill,
        onClick: function() {
          m(!0);
        },
        children: [
          "💰 ",
          j.timeText,
          " · ",
          p.currency,
          j.total.toFixed(2)
        ]
      }
    ),
    v ? /* @__PURE__ */ i.jsx(
      Iu,
      {
        title: "Active Cost Tracker",
        onClose: function() {
          m(!1);
        },
        children: /* @__PURE__ */ i.jsx(Ys, { tracker: p, isAdmin: !1 })
      }
    ) : null
  ] });
}
function Cp(s, r) {
  return s.position - r.position;
}
function Oh() {
  var s = ye(), r = s.activeMasterContext, d = na({
    table: "motd_messages",
    masterUsername: r,
    sort: Cp
  }), o = na({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, m = o.items[0], p = m ? m.current_index : 0, T = v.length > 0 ? v[p % v.length] : null;
  function j() {
    d.reload(), o.reload();
  }
  return {
    messages: v,
    currentMessage: T,
    status: d.status,
    error: d.error,
    reload: j,
    // Each mutation reloads afterward rather than waiting on the realtime
    // subscription: this Supabase project's motd_messages/motd_state
    // tables aren't in the realtime publication (confirmed empty, a
    // dashboard setting -- see src/beta/README.md's "Hybrid data flow"
    // section), so without this an admin's own edit never showed up in
    // their own list until something else triggered a refetch.
    addMessage: async function(M) {
      await window.addMotdMessage({ body: M }), j();
    },
    deleteMessage: async function(M) {
      await window.deleteMotdMessage(M), j();
    },
    moveUp: async function(M) {
      await window.moveMotdMessageUp(M), j();
    },
    moveDown: async function(M) {
      await window.moveMotdMessageDown(M), j();
    }
  };
}
const Dp = "_banner_whiaq_1", zp = {
  banner: Dp
};
function Rp() {
  var s = ye(), r = Oh();
  return !s.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: zp.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
const Mp = "_header_1f0gy_1", Op = "_title_1f0gy_23", Up = "_subtitle_1f0gy_33", Hp = "_right_1f0gy_45", Lp = "_groupSelect_1f0gy_59", Bp = "_userBadge_1f0gy_77", qp = "_points_1f0gy_85", Yp = "_statusBtn_1f0gy_97", Ba = {
  header: Mp,
  title: Op,
  subtitle: Up,
  right: Hp,
  groupSelect: Lp,
  userBadge: Bp,
  points: qp,
  statusBtn: Yp
};
function Gp() {
  var s = ye(), r = window.users[s.currentUser] || {}, [d, o] = N.useState(!1), [v, m] = N.useState(s.statusMessage), [p, T] = N.useState(!1);
  function j() {
    s.setThemeMode(s.themeMode === "light" ? "dark" : "light");
  }
  function M() {
    window.logout();
  }
  function A() {
    m(s.statusMessage), o(!0);
  }
  async function y(R) {
    R.preventDefault(), T(!0);
    try {
      await window.updateMyStatusMessage(v), s.refresh(), o(!1);
    } finally {
      T(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs("header", { className: Ba.header, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ba.left, children: [
      /* @__PURE__ */ i.jsx("h1", { className: Ba.title, children: s.groupTerms.groupLabel }),
      /* @__PURE__ */ i.jsx("p", { className: Ba.subtitle, children: s.groupTerms.appSubtitle })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Ba.right, children: [
      s.myMasterOptions.length > 1 ? /* @__PURE__ */ i.jsx(
        "select",
        {
          className: Ba.groupSelect,
          value: s.activeMasterContext,
          onChange: function(R) {
            s.switchGroup(R.target.value);
          },
          "aria-label": "Switch group",
          children: s.myMasterOptions.map(function(R) {
            var z = window.users[R];
            return /* @__PURE__ */ i.jsx("option", { value: R, children: z ? z.displayName : R }, R);
          })
        }
      ) : null,
      /* @__PURE__ */ i.jsx("span", { className: Ba.userBadge, children: s.displayName }),
      /* @__PURE__ */ i.jsx(Ap, {}),
      /* @__PURE__ */ i.jsxs(
        G,
        {
          variant: "secondary",
          className: Ba.statusBtn,
          onClick: A,
          title: s.statusMessage || "Set a status message",
          children: [
            "✏️ ",
            s.statusMessage || "Status"
          ]
        }
      ),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: j, children: s.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode" }),
      s.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: Ba.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: M, children: "Logout" })
    ] }),
    /* @__PURE__ */ i.jsx(Rp, {}),
    d ? /* @__PURE__ */ i.jsx(Iu, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ i.jsxs("form", { onSubmit: y, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Status message",
          value: v,
          onChange: function(R) {
            m(R.target.value);
          },
          placeholder: "e.g. 🐷 feeling good today",
          maxLength: 100,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: p, children: "Save" })
    ] }) }) : null
  ] });
}
const Qp = "_nav_c0zce_1", Xp = "_tab_c0zce_10", Vp = "_tabActive_c0zce_11", Do = {
  nav: Qp,
  tab: Xp,
  tabActive: Vp
};
function Zp({ activeTab: s, onChange: r }) {
  var d = ye(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && (o.push({ key: "overview", label: "Overview" }), o.push({ key: "dashboard", label: "Dashboard" }), o.push({ key: "tools", label: "Tools" })), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ i.jsx("nav", { className: Do.nav, "aria-label": "Main", children: o.map(function(v) {
    var m = v.key === s;
    return /* @__PURE__ */ i.jsx(
      "button",
      {
        className: m ? Do.tabActive : Do.tab,
        "aria-current": m ? "page" : void 0,
        onClick: function() {
          r(v.key);
        },
        children: v.label
      },
      v.key
    );
  }) });
}
function Kp(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Gs() {
  var s = ye(), r = na({
    table: "tasks",
    masterUsername: s.activeMasterContext,
    sort: Kp
  });
  return {
    tasks: r.items,
    status: r.status,
    error: r.error,
    reload: r.reload,
    // Every mutation below reloads the list itself afterward rather than
    // waiting on the realtime subscription: this Supabase project's tasks
    // table isn't in the realtime publication (a dashboard setting, not
    // something client code can fix), so without this a just-completed
    // task would stay showing its old status until something else
    // triggered a refetch (e.g. a full page reload) - see useCostTrackers.js
    // for the same pattern.
    //
    // `fields` matches the shape window.createTask's optional overrides
    // argument expects - see js/database-tasks.js.
    createTask: function(d) {
      return window.createTask(d).then(function(o) {
        return r.reload(), o;
      });
    },
    checkOffTask: function(d) {
      return window.checkOffTask(d).then(function(o) {
        return r.reload(), o;
      });
    },
    approveTask: function(d) {
      return window.approveTask(d).then(function(o) {
        return r.reload(), o;
      });
    },
    rejectTask: function(d) {
      return window.rejectTask(d).then(function(o) {
        return r.reload(), o;
      });
    },
    deleteTask: function(d) {
      return window.deleteTask(d).then(function(o) {
        return r.reload(), o;
      });
    },
    acceptDemerit: function(d) {
      return window.acceptDemerit(d).then(function(o) {
        return r.reload(), o;
      });
    },
    appealDemerit: function(d) {
      return window.appealDemerit(d).then(function(o) {
        return r.reload(), o;
      });
    },
    approveAppeal: function(d) {
      return window.approveAppeal(d).then(function(o) {
        return r.reload(), o;
      });
    },
    denyAppeal: function(d) {
      return window.denyAppeal(d).then(function(o) {
        return r.reload(), o;
      });
    },
    markInvoiceAsPaid: function(d) {
      return window.markInvoiceAsPaid(d).then(function(o) {
        return r.reload(), o;
      });
    },
    approveInvoice: function(d) {
      return window.approveInvoice(d).then(function(o) {
        return r.reload(), o;
      });
    }
  };
}
function Jp() {
  var s = ye(), [r, d] = N.useState([]);
  return N.useEffect(
    function() {
      var o = !1;
      if (!s.isSlave || !s.activeMasterContext) {
        d([]);
        return;
      }
      return window.supabase.from("task_assignments").select("task_id").eq("assigned_to", s.currentUser).eq("master_username", s.activeMasterContext).then(function(v) {
        o || v.error || d(
          (v.data || []).map(function(m) {
            return m.task_id;
          })
        );
      }), function() {
        o = !0;
      };
    },
    [s.isSlave, s.currentUser, s.activeMasterContext]
  ), r;
}
function Xn() {
  var s = ye(), r = s.activeMasterContext, [d, o] = N.useState([]), [v, m] = N.useState("loading"), [p, T] = N.useState(null), j = N.useRef(Math.random().toString(36).slice(2)).current, M = N.useCallback(
    async function() {
      if (!r) {
        o([]), m("ready");
        return;
      }
      m("loading"), T(null);
      var y = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (y.error) {
        T(y.error), m("error");
        return;
      }
      var R = (y.data || []).map(function(X) {
        return X.slave_username;
      }), z = { data: [] }, D = { data: [] };
      R.length > 0 && (z = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), D = await window.supabase.from("users").select("username, display_name, status_message").in("username", R));
      var H = {};
      (z.data || []).forEach(function(X) {
        H[X.username] = X.points || 0;
      });
      var B = {}, Z = {};
      (D.data || []).forEach(function(X) {
        B[X.username] = X.display_name || X.username, Z[X.username] = X.status_message || "";
      });
      var te = (y.data || []).map(function(X) {
        return {
          username: X.slave_username,
          displayName: B[X.slave_username] || X.slave_username,
          statusMessage: Z[X.slave_username] || "",
          points: H[X.slave_username] || 0,
          status: X.status
        };
      });
      o(te), m("ready");
    },
    [r]
  );
  N.useEffect(
    function() {
      if (M(), !!r) {
        var y = window.supabase.channel("beta_slave_roster_" + r + "_" + j).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + r
          },
          function() {
            M();
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
            M();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(y);
        };
      }
    },
    [r, M]
  );
  var A = d.filter(function(y) {
    return y.status === "active";
  });
  return {
    slaves: A,
    allSlaves: d,
    status: v,
    error: p,
    reload: M
  };
}
const kp = "_heading_1bkor_1", $p = "_row_1bkor_11", Fp = "_checkboxRow_1bkor_31", Wp = "_select_1bkor_47", Ip = "_fieldset_1bkor_69", Pp = "_hint_1bkor_83", qa = {
  heading: kp,
  row: $p,
  checkboxRow: Fp,
  select: Wp,
  fieldset: Ip,
  hint: Pp
};
var jh = {
  text: "",
  isDemerit: !1,
  points: 10,
  penaltyPoints: 5,
  dueDate: "",
  isRepeating: !1,
  repeatInterval: "daily",
  assignmentMode: "individual"
};
function e1({ onCreated: s }) {
  var r = ye(), d = Xn(), [o, v] = N.useState(jh), [m, p] = N.useState([]), [T, j] = N.useState(!1);
  function M(R, z) {
    v(function(D) {
      return Object.assign({}, D, { [R]: z });
    });
  }
  function A(R) {
    p(function(z) {
      return z.includes(R) ? z.filter(function(D) {
        return D !== R;
      }) : z.concat(R);
    });
  }
  async function y(R) {
    if (R.preventDefault(), !!o.text.trim()) {
      j(!0);
      try {
        await window.createTask({
          text: o.text,
          isDemerit: o.isDemerit,
          points: o.points,
          penaltyPoints: o.penaltyPoints,
          dueDate: o.dueDate || null,
          isRepeating: o.isRepeating,
          repeatInterval: o.isRepeating ? o.repeatInterval : null,
          selectedPigs: m,
          assignmentMode: o.assignmentMode
        }), v(jh), p([]), s && s();
      } finally {
        j(!1);
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
          onChange: function(R) {
            M("text", R.target.value);
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
            onChange: function(R) {
              M("isDemerit", R.target.checked);
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
            onChange: function(R) {
              M("points", R.target.value);
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
            onChange: function(R) {
              M("penaltyPoints", R.target.value);
            }
          }
        ),
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Due date",
            type: "datetime-local",
            value: o.dueDate,
            onChange: function(R) {
              M("dueDate", R.target.value);
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
              onChange: function(R) {
                M("isRepeating", R.target.checked);
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
            onChange: function(R) {
              M("repeatInterval", R.target.value);
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
        ] }) : d.slaves.map(function(R) {
          return /* @__PURE__ */ i.jsxs("label", { className: qa.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: m.includes(R.username),
                onChange: function() {
                  A(R.username);
                }
              }
            ),
            R.displayName
          ] }, R.username);
        })
      ] }),
      !o.isDemerit && m.length > 1 ? /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: qa.select,
          value: o.assignmentMode,
          onChange: function(R) {
            M("assignmentMode", R.target.value);
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
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: T, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const t1 = "_wrap_1qfmw_1", a1 = "_spinner_1qfmw_10", Nh = {
  wrap: t1,
  spinner: a1
};
function Ft({ label: s = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Nh.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: Nh.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: s })
  ] });
}
const l1 = "_wrap_buujm_1", n1 = "_message_buujm_9", Th = {
  wrap: l1,
  message: n1
};
function ua({ message: s = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Th.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: Th.message, children: s }),
    r ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const u1 = "_wrap_mx4zv_1", i1 = "_icon_mx4zv_7", s1 = "_title_mx4zv_12", c1 = "_hint_mx4zv_18", Cs = {
  wrap: u1,
  icon: i1,
  title: s1,
  hint: c1
};
function Oe({ icon: s = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Cs.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: Cs.icon, "aria-hidden": "true", children: s }),
    /* @__PURE__ */ i.jsx("p", { className: Cs.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: Cs.hint, children: d }) : null
  ] });
}
const r1 = "_badge_1988s_1", o1 = "_neutral_1988s_10", f1 = "_success_1988s_15", d1 = "_warning_1988s_20", v1 = "_danger_1988s_25", Gu = {
  badge: r1,
  neutral: o1,
  success: f1,
  warning: d1,
  danger: v1
};
function Bt({ tone: s = "neutral", children: r }) {
  var d = s === "success" ? Gu.success : s === "warning" ? Gu.warning : s === "danger" ? Gu.danger : Gu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [Gu.badge, d].join(" "), children: r });
}
var qo = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function m1(s, r, d, o) {
  return Object.assign(
    {
      id: s,
      x: r / 2,
      y: d / 2
    },
    qo,
    {}
  );
}
function h1(s, r, d) {
  var o = Math.min(s.canvas.width, s.canvas.height), v = r.radiusPercent / 100 * o * 2, m = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  s.save(), s.translate(r.x, r.y), s.rotate(r.rotation * Math.PI / 180 + m * 0.5), s.strokeStyle = r.color, s.lineWidth = r.thickness, s.globalAlpha = r.opacity, s.lineCap = "round", s.lineJoin = "round";
  for (var p = 0; p < r.arms; p++) {
    s.save(), s.rotate(p * 2 * Math.PI / r.arms), s.beginPath();
    for (var T = !0, j = 0; j < v; j += 0.5) {
      var M = j * 0.08 + m, A = j * Math.cos(M), y = j * Math.sin(M);
      T ? (s.moveTo(A, y), T = !1) : s.lineTo(A, y);
    }
    s.stroke(), s.restore();
  }
  s.restore();
}
const g1 = "_canvas_1y7at_1", y1 = {
  canvas: g1
};
function Uh({ canvasRef: s, spiralsRef: r, backgroundColor: d }) {
  var o = N.useRef(d);
  return N.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), N.useEffect(function() {
    var v = s.current, m = v.getContext("2d");
    function p() {
      var M = v.parentElement;
      v.width = M.clientWidth, v.height = M.clientHeight, r.current.forEach(function(A) {
        A.x = v.width / 2, A.y = v.height / 2;
      });
    }
    var T = new ResizeObserver(p);
    T.observe(v.parentElement), p();
    var j = requestAnimationFrame(function M(A) {
      j = requestAnimationFrame(M), m.fillStyle = o.current, m.fillRect(0, 0, v.width, v.height), r.current.forEach(function(y) {
        h1(m, y, A);
      });
    });
    return function() {
      cancelAnimationFrame(j), T.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: s, className: y1.canvas });
}
const p1 = "_overlay_qasw4_1", _1 = {
  overlay: p1
};
function Hh({ display: s, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: _1.overlay,
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
var S1 = [
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
function b1(s) {
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
function Lh(s) {
  var r = s || {}, [d, o] = N.useState(r.script || S1), [v, m] = N.useState(r.interval || 2e3), [p, T] = N.useState(r.holdDuration || 3e3), [j, M] = N.useState(r.animSpeed || 0.5), [A, y] = N.useState(r.fontSize || 2.5), [R, z] = N.useState(r.color || "#ffffff"), [D, H] = N.useState(!1), [B, Z] = N.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), te = N.useRef(null), X = N.useRef(0), re = N.useRef([]), Le = N.useRef(!1), Ue = N.useRef(p), V = N.useRef(j);
  N.useEffect(function() {
    Ue.current = p;
  }, [p]), N.useEffect(function() {
    V.current = j;
  }, [j]);
  function ne(P) {
    Z({ text: P, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        Z({ text: P, shown: !0, instant: !1 });
      });
    });
  }
  function Qe() {
    Z(function(P) {
      return { text: P.text, shown: !1, instant: !1 };
    });
  }
  function Be() {
    if (!Le.current) {
      Qe();
      return;
    }
    X.current >= re.current.length && (X.current = 0);
    var P = re.current[X.current];
    if (P)
      if (P.type === "text") {
        setTimeout(function() {
          ne(P.value);
        }, 50), X.current++;
        var Xe = V.current * 1e3, Me = Xe + Ue.current + Xe + 50;
        te.current = setTimeout(Be, Me);
      } else
        Qe(), X.current++, te.current = setTimeout(Be, P.value);
  }
  function We() {
    te.current && clearTimeout(te.current), re.current = b1(d), X.current = 0, Le.current = !0, H(!0), Be();
  }
  function $e() {
    Le.current = !1, H(!1), te.current && clearTimeout(te.current), Z({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return N.useEffect(function() {
    return function() {
      Le.current = !1, te.current && clearTimeout(te.current);
    };
  }, []), {
    display: B,
    script: d,
    setScript: o,
    interval: v,
    setInterval: m,
    holdDuration: p,
    setHoldDuration: T,
    animSpeed: j,
    setAnimSpeed: M,
    fontSize: A,
    setFontSize: y,
    color: R,
    setColor: z,
    isRunning: D,
    startLoop: We,
    stopLoop: $e
  };
}
const x1 = "_overlay_1ka14_1", j1 = "_closeBtn_1ka14_19", N1 = "_viewer_1ka14_51", T1 = "_canvasArea_1ka14_63", yl = {
  overlay: x1,
  closeBtn: j1,
  viewer: N1,
  canvasArea: T1
};
function w1({ config: s, onClose: r }) {
  var d = N.useRef(null), o = N.useRef(
    (s && s.spirals || []).map(function(T) {
      return Object.assign({ x: 0, y: 0 }, qo, T);
    })
  ), v = s && s.textSettings || {}, m = s && s.globalSettings && s.globalSettings.backgroundColor || "#000000", p = Lh(v);
  return N.useEffect(function() {
    p.startLoop();
    function T(j) {
      j.key === "Escape" && r();
    }
    return document.addEventListener("keydown", T), function() {
      p.stopLoop(), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ i.jsxs("div", { className: yl.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: yl.closeBtn, onClick: r, "aria-label": "Close spiral viewer", children: "×" }),
    /* @__PURE__ */ i.jsx("div", { className: yl.viewer, children: /* @__PURE__ */ i.jsxs("div", { className: yl.canvasArea, children: [
      /* @__PURE__ */ i.jsx(Uh, { canvasRef: d, spiralsRef: o, backgroundColor: m }),
      /* @__PURE__ */ i.jsx(
        Hh,
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
function Bh(s) {
  return window.getStatusText(s.status, s.isOverdue, s.type, s.appealStatus);
}
function E1(s) {
  return s.type === "demerit" ? s.appealStatus === "pending" ? "warning" : s.appealStatus === "approved" ? "success" : (s.appealStatus === "denied", "danger") : s.isOverdue ? "danger" : s.status === "completed" ? "success" : s.status === "failed" ? "danger" : s.status === "pending_approval" ? "warning" : "neutral";
}
const A1 = "_item_v1inl_1", C1 = "_header_v1inl_5", D1 = "_text_v1inl_11", z1 = "_meta_v1inl_16", R1 = "_appealText_v1inl_33", M1 = "_actions_v1inl_41", Ln = {
  item: A1,
  header: C1,
  text: D1,
  meta: z1,
  appealText: R1,
  actions: M1
};
function O1({ task: s, actions: r }) {
  var d = ye(), [o, v] = N.useState(!1), m = window.users[s.assignedTo], p = s.type === "cost-tracker", T = s.type === "spiral", j = p ? window.extractTotalFromTaskText(s.text) : null;
  return /* @__PURE__ */ i.jsxs(ge, { className: Ln.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ln.header, children: [
      /* @__PURE__ */ i.jsx(Bt, { tone: E1(s), children: Bh(s) }),
      s.type === "demerit" ? /* @__PURE__ */ i.jsx(Bt, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Ln.text, children: p ? s.text.split(`
`)[0] : s.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: Ln.meta, children: [
      s.assignedTo ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Assigned to" }),
        /* @__PURE__ */ i.jsx("dd", { children: m ? m.displayName : s.assignedTo })
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
      p && j ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Amount due" }),
        /* @__PURE__ */ i.jsx("dd", { children: j })
      ] }) : null,
      s.dueDate ? /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Due" }),
        /* @__PURE__ */ i.jsx("dd", { children: window.formatDate(s.dueDate) })
      ] }) : null
    ] }),
    s.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Ln.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      s.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Ln.actions, children: [
      T && s.spiralConfig ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
        v(!0);
      }, children: "▶️ View Spiral" }) : null,
      d.isSlave && !p && s.type !== "demerit" && s.assignedTo === d.currentUser && s.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
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
      d.isSlave && p && s.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
        r.markInvoiceAsPaid(s.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && s.status === "pending_approval" && p ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveInvoice(s.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.rejectTask(s.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && s.status === "pending_approval" && !p ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
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
    ] }),
    o ? /* @__PURE__ */ i.jsx(
      w1,
      {
        config: s.spiralConfig,
        onClose: function() {
          v(!1);
        }
      }
    ) : null
  ] });
}
function Ds({ tasks: s, status: r, error: d, onRetry: o, actions: v, emptyLabel: m }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    ua,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { icon: "✓", title: m || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: s.map(function(p) {
    return /* @__PURE__ */ i.jsx(O1, { task: p, actions: v }, p.id);
  }) });
}
const U1 = "_section_7c868_1", H1 = "_heading_7c868_5", Bn = {
  section: U1,
  heading: H1
};
function L1() {
  var s = ye(), r = Gs(), d = Jp(), o = {
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
    var v = r.tasks.filter(function(T) {
      return T.assignedTo === s.currentUser || d.includes(T.id);
    });
    return /* @__PURE__ */ i.jsx(
      Ds,
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
  var m = r.tasks.filter(function(T) {
    return T.type === "demerit" && T.appealStatus === "pending";
  }), p = r.tasks.filter(function(T) {
    return T.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(e1, { onCreated: r.reload }),
    m.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Bn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Bn.heading, children: "Pending Appeals" }),
      /* @__PURE__ */ i.jsx(
        Ds,
        {
          tasks: m,
          status: "ready",
          actions: o,
          emptyLabel: "No appeals pending"
        }
      )
    ] }) : null,
    p.length > 0 ? /* @__PURE__ */ i.jsxs(ge, { className: Bn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Bn.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        Ds,
        {
          tasks: p,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(ge, { className: Bn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Bn.heading, children: "All Tasks" }),
      /* @__PURE__ */ i.jsx(
        Ds,
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
const B1 = "_calendarContainer_1n2ar_1", q1 = "_detail_1n2ar_13", Y1 = "_detailRow_1n2ar_25", Tt = {
  calendarContainer: B1,
  detail: q1,
  detailRow: Y1
};
function G1(s) {
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
function Q1({ task: s }) {
  var r = s.dueDate ? window.formatDate(s.dueDate) : "N/A", d = s.endDateTime ? window.formatDate(s.endDateTime) : null, o = s.dueDate && s.dueDate.length === 10, v = s.createdBy && window.users[s.createdBy] ? window.users[s.createdBy].displayName : s.createdBy, m = s.completedBy && window.users[s.completedBy] ? window.users[s.completedBy].displayName : s.completedBy, p = s.approvedBy && window.users[s.approvedBy] ? window.users[s.approvedBy].displayName : s.approvedBy;
  return /* @__PURE__ */ i.jsxs("div", { className: Tt.detail, children: [
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Type:" }),
      " ",
      s.isRepeating ? "Repeating Task" : "One-time Task"
    ] }),
    /* @__PURE__ */ i.jsxs("p", { className: Tt.detailRow, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Status:" }),
      " ",
      Bh(s)
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
      m
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
function X1() {
  var s = ye(), r = Gs(), d = N.useRef(null), o = N.useRef(null), [v, m] = N.useState(null), p = N.useMemo(
    function() {
      return r.tasks.filter(function(j) {
        return !j || !j.dueDate ? !1 : s.isSlave ? j.assignedTo === s.currentUser || (window.mySharedTaskIds || []).includes(j.id) : !0;
      });
    },
    [r.tasks, s.isSlave, s.currentUser]
  ), T = N.useMemo(function() {
    return G1(p);
  }, [p]);
  return N.useEffect(
    function() {
      if (!(!d.current || typeof window.FullCalendar > "u")) {
        var j = new window.FullCalendar.Calendar(d.current, {
          initialView: "dayGridMonth",
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          },
          height: "auto",
          contentHeight: "auto",
          aspectRatio: 1.8,
          eventClick: function(M) {
            m(M.event.extendedProps.originalTask);
          }
        });
        return j.render(), o.current = j, function() {
          j.destroy(), o.current = null;
        };
      }
    },
    []
  ), N.useEffect(
    function() {
      var j = o.current;
      j && (j.removeAllEventSources(), j.addEventSource(T));
    },
    [T]
  ), /* @__PURE__ */ i.jsxs("div", { children: [
    r.status === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading tasks..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(ua, { message: r.error ? r.error.message : "", onRetry: r.reload }) : null,
    /* @__PURE__ */ i.jsx("div", { ref: d, className: Tt.calendarContainer }),
    v ? /* @__PURE__ */ i.jsx(Iu, { title: v.text, onClose: function() {
      m(null);
    }, children: /* @__PURE__ */ i.jsx(Q1, { task: v }) }) : null
  ] });
}
function V1(s, r) {
  return new Date(r.timestamp) - new Date(s.timestamp);
}
function qh() {
  var s = ye(), r = na({
    table: "userActivity",
    masterUsername: s.activeMasterContext,
    sort: V1
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const Z1 = "_row_qtrye_1", K1 = "_tile_qtrye_8", J1 = "_number_qtrye_12", k1 = "_label_qtrye_17", zs = {
  row: Z1,
  tile: K1,
  number: J1,
  label: k1
};
function $1({ stats: s }) {
  return /* @__PURE__ */ i.jsx("div", { className: zs.row, children: s.map(function(r) {
    return /* @__PURE__ */ i.jsxs(ge, { className: zs.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: zs.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: zs.label, children: r.label })
    ] }, r.label);
  }) });
}
const F1 = "_list_azyhi_1", W1 = "_row_azyhi_7", I1 = "_positive_azyhi_13", P1 = "_zero_azyhi_18", e_ = "_negative_azyhi_23", Wu = {
  list: F1,
  row: W1,
  positive: I1,
  zero: P1,
  negative: e_
};
function t_(s) {
  return s < 0 ? Wu.negative : s === 0 ? Wu.zero : Wu.positive;
}
function a_({ slaves: s }) {
  var r = ye();
  return s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: Wu.list, children: s.map(function(d) {
    return /* @__PURE__ */ i.jsxs(ge, { className: Wu.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: t_(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const l_ = "_heading_1mu37_1", n_ = "_form_1mu37_6", u_ = "_select_1mu37_13", zo = {
  heading: l_,
  form: n_,
  select: u_
};
function i_({ slaves: s }) {
  var r = ye(), [d, o] = N.useState(s[0] ? s[0].username : ""), [v, m] = N.useState(0);
  N.useEffect(
    function() {
      var T = s.find(function(j) {
        return j.username === d;
      });
      T ? m(T.points) : s[0] && o(s[0].username);
    },
    [s, d]
  );
  async function p(T) {
    if (T.preventDefault(), !!d) {
      var j = s.find(function(A) {
        return A.username === d;
      }), M = j ? j.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (j ? j.displayName : d) + " points changed from " + M + " to " + (Number(v) || 0),
        "success"
      );
    }
  }
  return s.length === 0 ? null : /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsxs("h3", { className: zo.heading, children: [
      "Set ",
      r.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ i.jsxs("form", { className: zo.form, onSubmit: p, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: zo.select,
          value: d,
          onChange: function(T) {
            o(T.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: s.map(function(T) {
            return /* @__PURE__ */ i.jsx("option", { value: T.username, children: T.displayName }, T.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(T) {
            m(T.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Set" })
    ] })
  ] });
}
const s_ = "_nav_1ckgk_1", c_ = "_pickerWrap_1ckgk_23", r_ = "_pickerBtn_1ckgk_31", o_ = "_popover_1ckgk_63", f_ = "_popoverHeader_1ckgk_91", d_ = "_monthNavBtn_1ckgk_109", v_ = "_weekdayRow_1ckgk_139", m_ = "_grid_1ckgk_157", h_ = "_cellEmpty_1ckgk_169", g_ = "_cell_1ckgk_169", y_ = "_cellHasActivity_1ckgk_199", p_ = "_cellSelected_1ckgk_223", __ = "_cellToday_1ckgk_233", Nt = {
  nav: s_,
  pickerWrap: c_,
  pickerBtn: r_,
  popover: o_,
  popoverHeader: f_,
  monthNavBtn: d_,
  weekdayRow: v_,
  grid: m_,
  cellEmpty: h_,
  cell: g_,
  cellHasActivity: y_,
  cellSelected: p_,
  cellToday: __
};
var S_ = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function Ls(s) {
  return s < 10 ? "0" + s : "" + s;
}
function Bs(s) {
  return s.getFullYear() + "-" + Ls(s.getMonth() + 1) + "-" + Ls(s.getDate());
}
function qs() {
  return Bs(/* @__PURE__ */ new Date());
}
function wh(s, r) {
  var d = s.split("-").map(Number), o = new Date(d[0], d[1] - 1, d[2]);
  return o.setDate(o.getDate() + r), Bs(o);
}
function b_(s) {
  var r = s.split("-").map(Number), d = new Date(r[0], r[1] - 1, r[2]), o = s === qs(), v = d.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: d.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? void 0 : "numeric"
  });
  return o ? "Today — " + v : v;
}
function x_({ selectedDate: s, onSelectDate: r, activityDays: d }) {
  var [o, v] = N.useState(!1), [m, p] = N.useState(0), [T, j] = N.useState(0), M = N.useRef(null);
  N.useEffect(
    function() {
      var z = s.split("-").map(Number);
      p(z[0]), j(z[1] - 1);
    },
    [o]
    // eslint-disable-line react-hooks/exhaustive-deps -- re-sync the visible month only when the popover is (re)opened, not on every keystroke-free selectedDate change
  ), N.useEffect(
    function() {
      if (!o) return;
      function z(D) {
        M.current && !M.current.contains(D.target) && v(!1);
      }
      return document.addEventListener("mousedown", z), function() {
        document.removeEventListener("mousedown", z);
      };
    },
    [o]
  );
  function A(z) {
    var D = new Date(m, T + z, 1);
    p(D.getFullYear()), j(D.getMonth());
  }
  function y() {
    for (var z = new Date(m, T, 1), D = z.getDay(), H = new Date(m, T + 1, 0).getDate(), B = [], Z = 0; Z < D; Z++) B.push(null);
    for (var te = 1; te <= H; te++) B.push(te);
    return B;
  }
  var R = y();
  return /* @__PURE__ */ i.jsxs("div", { className: Nt.nav, children: [
    /* @__PURE__ */ i.jsx(
      G,
      {
        variant: "secondary",
        onClick: function() {
          r(wh(s, -1));
        },
        children: "‹ Previous day"
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Nt.pickerWrap, ref: M, children: [
      /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: Nt.pickerBtn,
          onClick: function() {
            v(function(z) {
              return !z;
            });
          },
          children: [
            "📅 ",
            b_(s)
          ]
        }
      ),
      o ? /* @__PURE__ */ i.jsxs("div", { className: Nt.popover, children: [
        /* @__PURE__ */ i.jsxs("div", { className: Nt.popoverHeader, children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: Nt.monthNavBtn,
              onClick: function() {
                A(-1);
              },
              "aria-label": "Previous month",
              children: "‹"
            }
          ),
          /* @__PURE__ */ i.jsx("span", { children: new Date(m, T, 1).toLocaleDateString(void 0, {
            month: "long",
            year: "numeric"
          }) }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: Nt.monthNavBtn,
              onClick: function() {
                A(1);
              },
              "aria-label": "Next month",
              children: "›"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: Nt.weekdayRow, children: S_.map(function(z) {
          return /* @__PURE__ */ i.jsx("span", { children: z }, z);
        }) }),
        /* @__PURE__ */ i.jsx("div", { className: Nt.grid, children: R.map(function(z, D) {
          if (z === null) return /* @__PURE__ */ i.jsx("span", { className: Nt.cellEmpty }, D);
          var H = m + "-" + Ls(T + 1) + "-" + Ls(z), B = d.has(H), Z = H === s, te = H === qs(), X = [Nt.cell];
          return B && X.push(Nt.cellHasActivity), Z && X.push(Nt.cellSelected), te && X.push(Nt.cellToday), /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: X.join(" "),
              disabled: !B,
              title: B ? "Activity logged on this day" : "No activity on this day",
              onClick: function() {
                r(H), v(!1);
              },
              children: z
            },
            D
          );
        }) })
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsx(
      G,
      {
        variant: "secondary",
        onClick: function() {
          r(wh(s, 1));
        },
        children: "Next day ›"
      }
    )
  ] });
}
const j_ = "_filters_2lis3_1", N_ = "_filterSelect_2lis3_15", T_ = "_list_2lis3_35", w_ = "_item_2lis3_53", E_ = "_user_2lis3_65", A_ = "_details_2lis3_73", C_ = "_time_2lis3_81", Ya = {
  filters: j_,
  filterSelect: N_,
  list: T_,
  item: w_,
  user: E_,
  details: A_,
  time: C_
};
var D_ = [
  { value: "login", label: "Login" },
  { value: "logout", label: "Logout" },
  { value: "tasks", label: "Tasks" },
  { value: "suggestions", label: "Suggestions" },
  { value: "rewards", label: "Rewards & Shop" },
  { value: "cost_trackers", label: "Cost Trackers" },
  { value: "other", label: "Other" }
];
function z_(s) {
  return s === "login" ? "login" : s === "logout" ? "logout" : /suggestion/i.test(s) ? "suggestions" : /reward|purchase/i.test(s) ? "rewards" : /cost tracker/i.test(s) ? "cost_trackers" : /task|demerit|appeal|invoice/i.test(s) ? "tasks" : "other";
}
function R_({ activity: s, status: r, error: d, onRetry: o }) {
  var [v, m] = N.useState(""), [p, T] = N.useState(""), [j, M] = N.useState(qs), A = N.useMemo(
    function() {
      var D = {}, H = [];
      return s.forEach(function(B) {
        if (!D[B.user]) {
          D[B.user] = !0;
          var Z = window.users[B.user];
          H.push({ value: B.user, label: Z ? Z.displayName : B.user });
        }
      }), H.sort(function(B, Z) {
        return B.label.localeCompare(Z.label);
      }), H;
    },
    [s]
  ), y = N.useMemo(
    function() {
      var D = /* @__PURE__ */ new Set();
      return s.forEach(function(H) {
        D.add(Bs(new Date(H.timestamp)));
      }), D;
    },
    [s]
  ), R = N.useMemo(
    function() {
      return s.filter(function(D) {
        return Bs(new Date(D.timestamp)) === j;
      });
    },
    [s, j]
  ), z = N.useMemo(
    function() {
      return R.filter(function(D) {
        return !(v && D.user !== v || p && z_(D.action) !== p);
      });
    },
    [R, v, p]
  );
  return r === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(ua, { message: d ? d.message : "", onRetry: o }) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ya.filters, children: [
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ya.filterSelect,
          value: v,
          onChange: function(D) {
            m(D.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All users" }),
            A.map(function(D) {
              return /* @__PURE__ */ i.jsx("option", { value: D.value, children: D.label }, D.value);
            })
          ]
        }
      ),
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ya.filterSelect,
          value: p,
          onChange: function(D) {
            T(D.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "", children: "All activity" }),
            D_.map(function(D) {
              return /* @__PURE__ */ i.jsx("option", { value: D.value, children: D.label }, D.value);
            })
          ]
        }
      )
    ] }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No recent activity" }) : R.length === 0 ? /* @__PURE__ */ i.jsx(
      Oe,
      {
        title: j === qs() ? "No activity yet today" : "No activity on this day"
      }
    ) : z.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No activity matches those filters" }) : /* @__PURE__ */ i.jsx("ul", { className: Ya.list, children: z.map(function(D, H) {
      var B = window.users[D.user];
      return /* @__PURE__ */ i.jsxs("li", { className: Ya.item, children: [
        /* @__PURE__ */ i.jsx("span", { className: Ya.user, children: B ? B.displayName : D.user }),
        " ",
        /* @__PURE__ */ i.jsx("span", { className: Ya.action, children: D.action.replace(/_/g, " ") }),
        D.details ? /* @__PURE__ */ i.jsxs("span", { className: Ya.details, children: [
          " — ",
          D.details
        ] }) : null,
        /* @__PURE__ */ i.jsx("span", { className: Ya.time, children: window.formatDate(D.timestamp) })
      ] }, H);
    }) }),
    /* @__PURE__ */ i.jsx(
      x_,
      {
        selectedDate: j,
        onSelectDate: M,
        activityDays: y
      }
    )
  ] });
}
const M_ = "_grid_69ji7_1", O_ = "_section_69ji7_8", U_ = "_heading_69ji7_12", Qu = {
  grid: M_,
  section: O_,
  heading: U_
};
function H_() {
  var s = ye(), r = Gs(), d = Xn(), o = qh(), v = r.tasks, m = d.slaves.map(function(T) {
    return T.username;
  }), p = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(T) {
        return T.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(T) {
        return T.status === "completed";
      }).length
    },
    {
      label: "Demerits Issued",
      value: v.filter(function(T) {
        return T.type === "demerit" && m.indexOf(T.assignedTo) !== -1;
      }).length
    },
    { label: s.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx($1, { stats: p }),
    /* @__PURE__ */ i.jsxs("div", { className: Qu.grid, children: [
      /* @__PURE__ */ i.jsxs(ge, { className: Qu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Qu.heading, children: [
          s.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(a_, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(i_, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: Qu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Qu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        R_,
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
function L_(s, r) {
  return new Date(r.createdAt) - new Date(s.createdAt);
}
function Yh() {
  var s = ye(), r = na({
    table: "suggestions",
    masterUsername: s.activeMasterContext,
    sort: L_
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
var Eh = { description: "", justification: "", points: 10, dueDate: "" };
function B_({ onSubmit: s }) {
  var [r, d] = N.useState(Eh), [o, v] = N.useState(!1);
  function m(T, j) {
    d(function(M) {
      return Object.assign({}, M, { [T]: j });
    });
  }
  async function p(T) {
    if (T.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await s(r), d(Eh);
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
          onChange: function(T) {
            m("description", T.target.value);
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
          onChange: function(T) {
            m("justification", T.target.value);
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
          onChange: function(T) {
            m("points", T.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(T) {
            m("dueDate", T.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const q_ = "_card_q0jnd_1", Y_ = "_badgeRow_q0jnd_5", G_ = "_description_q0jnd_11", Q_ = "_justification_q0jnd_15", X_ = "_metaLine_q0jnd_21", V_ = "_actions_q0jnd_27", qn = {
  card: q_,
  badgeRow: Y_,
  description: G_,
  justification: Q_,
  metaLine: X_,
  actions: V_
};
function Z_(s) {
  return s === "pending" ? "warning" : s === "rejected" ? "danger" : "success";
}
function Ah({ suggestion: s, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var m = window.users[s.reviewedBy];
  return /* @__PURE__ */ i.jsxs(ge, { className: qn.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: qn.badgeRow, children: [
      /* @__PURE__ */ i.jsx(Bt, { tone: Z_(s.status), children: s.status }),
      /* @__PURE__ */ i.jsxs(Bt, { tone: "neutral", children: [
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
      s.reviewedAt ? " · Reviewed by " + (m ? m.displayName : s.reviewedBy) : ""
    ] }),
    r && s.status === "pending" ? /* @__PURE__ */ i.jsxs("div", { className: qn.actions, children: [
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
function K_() {
  var s = ye(), r = Yh();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx(Ft, { label: "Loading suggestions..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(
      ua,
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
      /* @__PURE__ */ i.jsx(B_, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(Ah, { suggestion: v, forAdmin: !1 }, v.id);
      })
    ] });
  }
  var o = r.suggestions.filter(function(v) {
    return v.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No suggestions pending review" }) : o.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        Ah,
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
var Ch = {
  instantPurchaseLimit: 500,
  currentInstantSpend: 0,
  resetDurationDays: 30,
  lastResetAt: null,
  requiresAuthorizationAfterLimit: !0
};
function J_(s, r) {
  return s.title.localeCompare(r.title);
}
function k_(s, r) {
  return new Date(r.purchaseDate) - new Date(s.purchaseDate);
}
function $_() {
  var s = ye(), r = s.activeMasterContext, d = na({
    table: "rewards",
    masterUsername: r,
    sort: J_
  }), o = na({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: k_
  }), [v, m] = N.useState(Ch), [p, T] = N.useState("loading"), j = N.useRef(Math.random().toString(36).slice(2)).current, M = N.useCallback(
    async function() {
      if (r) {
        T("loading");
        var A = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (A.error) {
          T("error");
          return;
        }
        m(
          A.data && A.data.length > 0 ? A.data[0] : Ch
        ), T("ready");
      }
    },
    [r]
  );
  return N.useEffect(
    function() {
      if (M(), !!r) {
        var A = window.supabase.channel("beta_reward_settings_" + r + "_" + j).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + r
          },
          function() {
            M();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(A);
        };
      }
    },
    [r, M]
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
    addReward: function(A, y, R, z) {
      return window.addReward(A, y, R, z);
    },
    updateReward: function(A, y, R, z, D) {
      return window.updateReward(A, y, R, z, D);
    },
    deleteReward: function(A) {
      return window.deleteReward(A);
    },
    purchaseReward: function(A) {
      return window.purchaseReward(A);
    },
    authorizePurchase: function(A) {
      return window.authorizePurchase(A);
    },
    denyPurchase: function(A) {
      return window.denyPurchase(A);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(A, y, R) {
      return window.updateRewardSystemSettings(A, y, R);
    }
  };
}
const F_ = "_card_1tc0o_1", W_ = "_title_1tc0o_7", I_ = "_description_1tc0o_12", P_ = "_badgeRow_1tc0o_19", eS = "_actions_1tc0o_24", Xu = {
  card: F_,
  title: W_,
  description: I_,
  badgeRow: P_,
  actions: eS
};
function Gh({ reward: s, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(ge, { className: Xu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: Xu.title, children: s.title }),
    /* @__PURE__ */ i.jsx("p", { className: Xu.description, children: s.description }),
    /* @__PURE__ */ i.jsxs("div", { className: Xu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(Bt, { tone: "neutral", children: [
        s.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(Bt, { tone: s.type === "instant" ? "success" : "warning", children: s.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: Xu.actions, children: [
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
const tS = "_grid_19ohq_1", aS = "_purchasesHeading_19ohq_7", lS = "_purchaseCard_19ohq_11", nS = "_badgeRow_19ohq_15", uS = "_purchaseTitle_19ohq_19", iS = "_purchaseMeta_19ohq_24", Ql = {
  grid: tS,
  purchasesHeading: aS,
  purchaseCard: lS,
  badgeRow: nS,
  purchaseTitle: uS,
  purchaseMeta: iS
};
function sS(s) {
  return s === "denied" ? "danger" : s === "pending_authorization" ? "warning" : "success";
}
function cS({ rewards: s, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: m }) {
  var p = ye(), T = m.filter(function(j) {
    return j.userId === p.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(ua, { message: d ? d.message : "Failed to load", onRetry: o }) : s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Ql.grid, children: s.map(function(j) {
      return /* @__PURE__ */ i.jsx(Gh, { reward: j, onPurchase: v }, j.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Ql.purchasesHeading, children: "My Reward Purchases" }),
    T.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No purchases yet" }) : T.map(function(j) {
      return /* @__PURE__ */ i.jsxs(ge, { className: Ql.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Ql.badgeRow, children: /* @__PURE__ */ i.jsx(Bt, { tone: sS(j.status), children: j.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Ql.purchaseTitle, children: j.rewards ? j.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Ql.purchaseMeta, children: [
          j.purchaseCost,
          " points · ",
          window.formatDate(j.purchaseDate)
        ] }),
        j.status === "denied" && j.notes ? /* @__PURE__ */ i.jsxs("p", { className: Ql.purchaseMeta, children: [
          "Reason: ",
          j.notes
        ] }) : null
      ] }, j.id);
    })
  ] });
}
const rS = "_heading_p82cd_1", oS = "_row_p82cd_6", fS = "_selectGroup_p82cd_16", dS = "_selectLabel_p82cd_23", vS = "_select_p82cd_16", mS = "_actions_p82cd_38", Yn = {
  heading: rS,
  row: oS,
  selectGroup: fS,
  selectLabel: dS,
  select: vS,
  actions: mS
};
var Ro = { title: "", description: "", cost: 10, type: "instant" };
function hS({ editingReward: s, onSave: r, onCancelEdit: d }) {
  var [o, v] = N.useState(Ro), [m, p] = N.useState(!1);
  N.useEffect(
    function() {
      v(
        s ? {
          title: s.title,
          description: s.description,
          cost: s.cost,
          type: s.type
        } : Ro
      );
    },
    [s]
  );
  function T(M, A) {
    v(function(y) {
      return Object.assign({}, y, { [M]: A });
    });
  }
  async function j(M) {
    if (M.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      p(!0);
      try {
        await r(o, s ? s.id : null), v(Ro);
      } finally {
        p(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Yn.heading, children: s ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Title",
          value: o.title,
          onChange: function(M) {
            T("title", M.target.value);
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
          onChange: function(M) {
            T("description", M.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: Yn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(M) {
              T("cost", M.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: Yn.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: Yn.selectLabel, children: "Purchase type" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: Yn.select,
              value: o.type,
              onChange: function(M) {
                T("type", M.target.value);
              },
              children: [
                /* @__PURE__ */ i.jsx("option", { value: "instant", children: "Instant purchase" }),
                /* @__PURE__ */ i.jsx("option", { value: "authorized", children: "Requires authorization" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Yn.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: m, children: s ? "Save changes" : "Add reward" }),
        s ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const gS = "_heading_26k11_1", yS = "_row_26k11_6", pS = "_checkboxRow_26k11_16", _S = "_readout_26k11_24", SS = "_actions_26k11_30", Gn = {
  heading: gS,
  row: yS,
  checkboxRow: pS,
  readout: _S,
  actions: SS
};
function bS({ settings: s, onSave: r, onReset: d }) {
  var [o, v] = N.useState(s.instantPurchaseLimit || 0), [m, p] = N.useState(s.resetDurationDays || 0), [T, j] = N.useState(s.requiresAuthorizationAfterLimit !== !1);
  N.useEffect(
    function() {
      v(s.instantPurchaseLimit || 0), p(s.resetDurationDays || 0), j(s.requiresAuthorizationAfterLimit !== !1);
    },
    [s]
  );
  function M(A) {
    A.preventDefault(), r(Number(o) || 0, Number(m) || 0, T);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Gn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: M, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Gn.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
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
          ue,
          {
            label: "Limit reset duration (days, 0 = manual only)",
            type: "number",
            min: "0",
            value: m,
            onChange: function(A) {
              p(A.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Gn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: T,
            onChange: function(A) {
              j(A.target.checked);
            }
          }
        ),
        "Require authorization after limit reached"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Gn.readout, children: [
        "Current instant spend: ",
        s.currentInstantSpend || 0,
        " / ",
        s.instantPurchaseLimit || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Gn.readout, children: [
        "Last reset: ",
        s.lastResetAt ? window.formatDate(s.lastResetAt) : "N/A"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Gn.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const xS = "_card_zkx61_1", jS = "_title_zkx61_5", NS = "_meta_zkx61_10", TS = "_actions_zkx61_16", Rs = {
  card: xS,
  title: jS,
  meta: NS,
  actions: TS
};
function wS({ purchases: s, onAuthorize: r, onDeny: d }) {
  var o = s.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var m = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(ge, { className: Rs.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: Rs.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        m ? m.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: Rs.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Rs.actions, children: [
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
const ES = "_heading_1ewsp_1", AS = "_grid_1ewsp_5", Ms = {
  heading: ES,
  grid: AS
};
function CS({ rewardsState: s }) {
  var [r, d] = N.useState(null);
  async function o(m, p) {
    p ? await s.updateReward(p, m.title, m.description, Number(m.cost), m.type) : await s.addReward(m.title, m.description, Number(m.cost), m.type), d(null);
  }
  function v(m) {
    window.showConfirmModal("Delete this reward?", function(p) {
      p && s.deleteReward(m);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      hS,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ms.heading, children: "Current Rewards" }),
    s.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx(Ft, {}) : s.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: s.rewardsError ? s.rewardsError.message : "",
        onRetry: s.reloadRewards
      }
    ) : s.rewards.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Ms.grid, children: s.rewards.map(function(m) {
      return /* @__PURE__ */ i.jsx(
        Gh,
        {
          reward: m,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        m.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Ms.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      bS,
      {
        settings: s.settings,
        onSave: s.updateRewardSystemSettings,
        onReset: s.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Ms.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      wS,
      {
        purchases: s.purchases,
        onAuthorize: s.authorizePurchase,
        onDeny: s.denyPurchase
      }
    )
  ] });
}
function DS() {
  var s = ye(), r = $_();
  return s.isMaster ? /* @__PURE__ */ i.jsx(CS, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    cS,
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
const zS = "_heading_pc1l6_1", RS = "_form_pc1l6_11", MS = "_row_pc1l6_33", OS = "_statusMessage_pc1l6_51", Vu = {
  heading: zS,
  form: RS,
  row: MS,
  statusMessage: OS
};
function US() {
  var s = ye(), r = Xn(), [d, o] = N.useState({ username: "", password: "", displayName: "" }), [v, m] = N.useState(!1);
  function p(A, y) {
    o(function(R) {
      return Object.assign({}, R, { [A]: y });
    });
  }
  async function T(A) {
    A.preventDefault(), m(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      m(!1);
    }
  }
  function j(A) {
    window.deactivatePig(A);
  }
  function M(A) {
    window.reactivatePig(A);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Vu.heading, children: [
        "Add New ",
        s.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Vu.form, onSubmit: T, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Username",
            value: d.username,
            onChange: function(A) {
              p("username", A.target.value);
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
            onChange: function(A) {
              p("password", A.target.value);
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
            onChange: function(A) {
              p("displayName", A.target.value);
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
    /* @__PURE__ */ i.jsxs("h2", { className: Vu.heading, children: [
      "Current ",
      s.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No " + s.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(A) {
      var y = A.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Vu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Bt, { tone: y ? "success" : "neutral", children: y ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: A.displayName }),
          " (",
          A.username,
          ") ·",
          " ",
          A.points,
          " pts",
          A.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Vu.statusMessage, children: [
            " · ",
            A.statusMessage
          ] }) : null
        ] }),
        y ? /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "danger",
            onClick: function() {
              j(A.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          G,
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
function HS(s, r) {
  return new Date(r.created_at) - new Date(s.created_at);
}
function LS() {
  var s = ye(), r = na({
    table: "invites",
    masterUsername: s.activeMasterContext,
    sort: HS
  }), d = N.useCallback(async function() {
    await window.generateInvite(), r.reload();
  }, [r]), o = N.useCallback(
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
const BS = "_heading_1pok1_1", qS = "_hint_1pok1_11", YS = "_row_1pok1_23", GS = "_actions_1pok1_45", Zu = {
  heading: BS,
  hint: qS,
  row: YS,
  actions: GS
};
function QS(s) {
  return s === "pending" ? "warning" : s === "redeemed" ? "success" : "neutral";
}
function XS() {
  var s = ye(), r = LS(), [d, o] = N.useState(null);
  function v(m) {
    navigator.clipboard.writeText(window.buildInviteLink(m)), o(m), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Zu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Zu.hint, children: [
      "Generate a link to invite someone new as a ",
      s.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: r.generateInvite, children: "Generate Invite Link" }),
    r.status === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading invites..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: "Couldn't load invites: " + (r.error ? r.error.message : "unknown error"),
        onRetry: r.reload
      }
    ) : null,
    r.status === "ready" && r.invites.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No invites generated yet" }) : null,
    r.status === "ready" && r.invites.length > 0 ? r.invites.map(function(m) {
      var p = m.status === "pending" && m.expires_at && new Date(m.expires_at) < /* @__PURE__ */ new Date(), T = p ? "expired" : m.status, j = m.status === "pending" && !p;
      return /* @__PURE__ */ i.jsxs("div", { className: Zu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(Bt, { tone: QS(T), children: T.charAt(0).toUpperCase() + T.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: m.code }),
          m.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Zu.hint, children: [
            " · redeemed by ",
            m.redeemed_by
          ] }) : null
        ] }),
        j ? /* @__PURE__ */ i.jsxs("div", { className: Zu.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(m.code);
          }, children: d === m.code ? "Copied!" : "Copy Link" }),
          /* @__PURE__ */ i.jsx(
            G,
            {
              variant: "danger",
              onClick: function() {
                r.revokeInvite(m.code);
              },
              children: "Revoke"
            }
          )
        ] }) : null
      ] }, m.id);
    }) : null
  ] });
}
const VS = "_form_7nlkd_1", ZS = {
  form: VS
};
function KS({ onAdd: s }) {
  var [r, d] = N.useState(""), [o, v] = N.useState(!1);
  async function m(p) {
    p.preventDefault();
    var T = r.trim();
    if (T) {
      v(!0);
      try {
        await s(T), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: ZS.form, onSubmit: m, children: [
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
    /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.trim(), children: "Add Message" })
  ] });
}
const JS = "_heading_10ijk_1", kS = "_row_10ijk_11", $S = "_actions_10ijk_33", Mo = {
  heading: JS,
  row: kS,
  actions: $S
};
function FS() {
  var s = Oh();
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Mo.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(KS, { onAdd: s.addMessage }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading messages..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: "Couldn't load messages: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" && s.messages.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No messages added yet" }) : null,
    s.status === "ready" && s.messages.length > 0 ? s.messages.map(function(r, d) {
      var o = d === 0, v = d === s.messages.length - 1, m = s.currentMessage && s.currentMessage.id === r.id;
      return /* @__PURE__ */ i.jsxs("div", { className: Mo.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          m ? /* @__PURE__ */ i.jsx(Bt, { tone: "success", children: "Showing now" }) : null,
          " ",
          r.body
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Mo.actions, children: [
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
function WS() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(US, {}),
    /* @__PURE__ */ i.jsx(XS, {}),
    /* @__PURE__ */ i.jsx(FS, {})
  ] });
}
function IS() {
  var s = ye(), [r, d] = N.useState([]), [o, v] = N.useState("loading"), m = N.useCallback(async function() {
    v("loading");
    var p = await window.fetchAllMasters();
    d(p || []), v("ready");
  }, []);
  return N.useEffect(
    function() {
      s.isAdmin && m();
    },
    [s.isAdmin, m]
  ), {
    masters: r,
    status: o,
    reload: m,
    createMaster: window.createMaster,
    updateMasterTerminology: window.updateMasterTerminology,
    updateMasterAccount: window.updateMasterAccount,
    deactivateMaster: function(p) {
      return new Promise(function(T) {
        window.showConfirmModal(
          "Deactivate master '" + p + "'? They (and their group) won't be able to log in.",
          async function(j) {
            j && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", p), window.showNotification("Master deactivated.", "success"), await m()), T();
          }
        );
      });
    },
    reactivateMaster: async function(p) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", p), window.showNotification("Master reactivated.", "success"), await m();
    }
  };
}
const PS = "_list_1yv13_1", eb = "_row_1yv13_10", tb = "_ratio_1yv13_18", Oo = {
  list: PS,
  row: eb,
  ratio: tb
};
function ab({ theme: s }) {
  if (!window.ContrastUtils) return null;
  var r = window.ContrastUtils.checkThemeContrast(s);
  return /* @__PURE__ */ i.jsx("ul", { className: Oo.list, children: r.map(function(d) {
    return /* @__PURE__ */ i.jsxs("li", { className: Oo.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.label }),
      /* @__PURE__ */ i.jsxs("span", { className: Oo.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ i.jsx(Bt, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const lb = "_heading_xjg2m_1", nb = "_row_xjg2m_11", ub = "_checkboxRow_xjg2m_31", ib = "_divider_xjg2m_47", sb = "_colorGroupLabel_xjg2m_57", cb = "_colorRow_xjg2m_71", rb = "_colorField_xjg2m_85", ob = "_actions_xjg2m_119", kt = {
  heading: lb,
  row: nb,
  checkboxRow: ub,
  divider: ib,
  colorGroupLabel: sb,
  colorRow: cb,
  colorField: rb,
  actions: ob
};
var fb = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
}, db = {
  bg: "#ffffff",
  card: "#f4f4f5",
  elevated: "#e4e4e7",
  textPrimary: "#18181b",
  textSecondary: "#52525b"
};
function Dh(s) {
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
    theme: s ? s.theme : fb,
    themeLight: s ? s.themeLight : db
  };
}
function zh({ master: s, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, m] = N.useState(Dh(s)), [p, T] = N.useState(!1), j = !!s;
  function M(z, D) {
    m(function(H) {
      return Object.assign({}, H, { [z]: D });
    });
  }
  function A(z, D) {
    m(function(H) {
      return Object.assign({}, H, { theme: Object.assign({}, H.theme, { [z]: D }) });
    });
  }
  function y(z, D) {
    m(function(H) {
      return Object.assign({}, H, { themeLight: Object.assign({}, H.themeLight, { [z]: D }) });
    });
  }
  async function R(z) {
    z.preventDefault(), T(!0);
    try {
      j ? await d(s.username, v) : (await r(v), m(Dh(null)));
    } finally {
      T(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: kt.heading, children: j ? "Edit " + s.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: R, children: [
      j ? null : /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Username",
          value: v.username,
          onChange: function(z) {
            M("username", z.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: j ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(z) {
            M("password", z.target.value);
          },
          required: !j
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Display name",
          value: v.displayName,
          onChange: function(z) {
            M("displayName", z.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: kt.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.isAdmin,
            onChange: function(z) {
              M("isAdmin", z.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: kt.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: v.groupLabel,
            onChange: function(z) {
              M("groupLabel", z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: v.masterLabel,
            onChange: function(z) {
              M("masterLabel", z.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: kt.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Master label (plural)",
            value: v.masterLabelPlural,
            onChange: function(z) {
              M("masterLabelPlural", z.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: v.slaveLabel,
            onChange: function(z) {
              M("slaveLabel", z.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Slave label (plural)",
          value: v.slaveLabelPlural,
          onChange: function(z) {
            M("slaveLabelPlural", z.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "App header subtitle",
          placeholder: "Shown under the group label in this group's header",
          value: v.appSubtitle,
          onChange: function(z) {
            M("appSubtitle", z.target.value);
          },
          maxLength: 60
        }
      ),
      /* @__PURE__ */ i.jsx("hr", { className: kt.divider }),
      /* @__PURE__ */ i.jsx("p", { className: kt.colorGroupLabel, children: "Dark mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: kt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(z) {
        var D = z[0], H = z[1];
        return /* @__PURE__ */ i.jsxs("label", { className: kt.colorField, children: [
          H,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.theme[D],
              onChange: function(B) {
                A(D, B.target.value);
              }
            }
          )
        ] }, D);
      }) }),
      /* @__PURE__ */ i.jsx("p", { className: kt.colorGroupLabel, children: "Light mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: kt.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(z) {
        var D = z[0], H = z[1];
        return /* @__PURE__ */ i.jsxs("label", { className: kt.colorField, children: [
          H,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.themeLight[D],
              onChange: function(B) {
                y(D, B.target.value);
              }
            }
          )
        ] }, "light-" + D);
      }) }),
      /* @__PURE__ */ i.jsx(ab, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: kt.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: p, children: j ? "Save changes" : "Create master" }),
        j ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const vb = "_heading_1uetk_1", mb = "_hint_1uetk_11", hb = "_row_1uetk_23", gb = "_actions_1uetk_45", Os = {
  heading: vb,
  hint: mb,
  row: hb,
  actions: gb
};
function yb() {
  var s = ye(), [r, d] = N.useState(s.siteSettings.pageTitle), [o, v] = N.useState(s.siteSettings.loginHeading), [m, p] = N.useState(!1);
  N.useEffect(
    function() {
      d(s.siteSettings.pageTitle), v(s.siteSettings.loginHeading);
    },
    [s.siteSettings]
  );
  async function T(j) {
    j.preventDefault(), p(!0);
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
    /* @__PURE__ */ i.jsx("h3", { className: Os.heading, children: "Site Settings" }),
    /* @__PURE__ */ i.jsx("p", { className: Os.hint, children: "These are shared site-wide, across every group - they show before anyone has logged in, so there's no group to scope them to." }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: T, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Os.row, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Browser tab title",
            value: r,
            onChange: function(j) {
              d(j.target.value);
            },
            maxLength: 60
          }
        ),
        /* @__PURE__ */ i.jsx(
          ue,
          {
            label: "Login screen heading",
            value: o,
            onChange: function(j) {
              v(j.target.value);
            },
            maxLength: 60
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: Os.actions, children: /* @__PURE__ */ i.jsx(G, { type: "submit", loading: m, children: "Save" }) })
    ] })
  ] });
}
const pb = "_heading_vrwe0_1", _b = "_row_vrwe0_5", Sb = "_badgeRow_vrwe0_14", bb = "_meta_vrwe0_20", xb = "_actions_vrwe0_26", Ku = {
  heading: pb,
  row: _b,
  badgeRow: Sb,
  meta: bb,
  actions: xb
};
function jb() {
  var s = IS(), [r, d] = N.useState(null);
  async function o(m) {
    var p = await s.createMaster(m);
    p && await s.reload();
  }
  async function v(m, p) {
    await s.updateMasterAccount(m, {
      displayName: p.displayName,
      password: p.password,
      isAdmin: p.isAdmin
    }), await s.updateMasterTerminology(m, p), d(null), await s.reload();
  }
  return r ? /* @__PURE__ */ i.jsx(
    zh,
    {
      master: r,
      onSaveExisting: v,
      onCancel: function() {
        d(null);
      }
    }
  ) : /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(yb, {}),
    /* @__PURE__ */ i.jsx(zh, { onCreate: o }),
    /* @__PURE__ */ i.jsx("h2", { className: Ku.heading, children: "All Masters" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Ft, {}) : s.masters.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No masters yet" }) : s.masters.map(function(m) {
      var p = m.status === "active";
      return /* @__PURE__ */ i.jsxs(ge, { className: Ku.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Ku.badgeRow, children: [
            /* @__PURE__ */ i.jsx(Bt, { tone: p ? "success" : "neutral", children: p ? "Active" : "Inactive" }),
            m.isAdmin ? /* @__PURE__ */ i.jsx(Bt, { tone: "warning", children: "Admin" }) : null
          ] }),
          /* @__PURE__ */ i.jsx("strong", { children: m.displayName }),
          " (",
          m.username,
          ")",
          /* @__PURE__ */ i.jsxs("div", { className: Ku.meta, children: [
            "Group: ",
            m.groupLabel,
            " · ",
            m.masterLabel,
            " / ",
            m.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ku.actions, children: [
          /* @__PURE__ */ i.jsx(
            G,
            {
              variant: "secondary",
              onClick: function() {
                d(m);
              },
              children: "Edit"
            }
          ),
          p ? /* @__PURE__ */ i.jsx(
            G,
            {
              variant: "danger",
              onClick: function() {
                s.deactivateMaster(m.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            G,
            {
              onClick: function() {
                s.reactivateMaster(m.username);
              },
              children: "Reactivate"
            }
          )
        ] })
      ] }, m.username);
    })
  ] });
}
var Us = 100;
function Nb() {
  var s = ye(), r = s.activeMasterContext, [d, o] = N.useState([]), [v, m] = N.useState("loading"), [p, T] = N.useState(null), [j, M] = N.useState(!1), A = N.useRef(Math.random().toString(36).slice(2)).current, y = N.useCallback(
    async function() {
      if (!r) {
        o([]), m("ready");
        return;
      }
      m("loading"), T(null);
      var D = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Us);
      if (D.error) {
        T(D.error), m("error");
        return;
      }
      var H = (D.data || []).slice().reverse();
      o(H), M((D.data || []).length === Us), m("ready");
    },
    [r]
  ), R = N.useCallback(
    async function() {
      o(function(D) {
        if (D.length === 0) return D;
        var H = D[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", H.created_at).order("created_at", { ascending: !1 }).limit(Us).then(function(B) {
          if (!B.error) {
            var Z = (B.data || []).slice().reverse();
            M((B.data || []).length === Us), o(function(te) {
              return Z.concat(te);
            });
          }
        }), D;
      });
    },
    [r]
  ), z = N.useCallback(
    async function(D) {
      var H = await window.sendChatMessage({ body: D });
      H && o(function(B) {
        return B.some(function(Z) {
          return Z.id === H.id;
        }) ? B : B.concat([H]);
      });
    },
    []
  );
  return N.useEffect(
    function() {
      if (y(), !!r) {
        var D = window.supabase.channel("beta_chat_messages_" + r + "_" + A).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + r
          },
          function(B) {
            o(function(Z) {
              return Z.some(function(te) {
                return te.id === B.new.id;
              }) ? Z : Z.concat([B.new]);
            });
          }
        ).subscribe(), H = window.setInterval(y, 5e3);
        return function() {
          window.supabase.removeChannel(D), window.clearInterval(H);
        };
      }
    },
    [r, y]
  ), {
    messages: d,
    status: v,
    error: p,
    hasMoreOlder: j,
    loadOlder: R,
    sendMessage: z,
    reload: y
  };
}
const Tb = "_row_gqneb_1", wb = "_meta_gqneb_19", Eb = "_status_gqneb_35", Ab = "_time_gqneb_43", Cb = "_body_gqneb_51", Ju = {
  row: Tb,
  meta: wb,
  status: Eb,
  time: Ab,
  body: Cb
};
function Db({ message: s }) {
  var r = window.users[s.sender_username], d = r ? r.displayName : s.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Ju.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ju.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Ju.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Ju.time, children: new Date(s.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Ju.body, children: s.body })
  ] });
}
const zb = "_form_nndvu_1", Rb = "_input_nndvu_13", Rh = {
  form: zb,
  input: Rb
};
function Mb({ onSend: s }) {
  var [r, d] = N.useState(""), [o, v] = N.useState(!1);
  async function m(p) {
    p.preventDefault();
    var T = r.trim();
    if (T) {
      v(!0);
      try {
        await s(T), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: Rh.form, onSubmit: m, children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        className: Rh.input,
        value: r,
        onChange: function(p) {
          d(p.target.value);
        },
        placeholder: "Type a message...",
        maxLength: 500
      }
    ),
    /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.trim(), children: "Send" })
  ] });
}
const Ob = "_heading_12c2o_1", Ub = "_loadOlder_12c2o_11", Hb = "_list_12c2o_19", Uo = {
  heading: Ob,
  loadOlder: Ub,
  list: Hb
};
function Lb() {
  var s = Nb(), r = N.useRef(null), d = N.useRef(!0);
  N.useEffect(
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
    /* @__PURE__ */ i.jsx("h2", { className: Uo.heading, children: "Group Chat" }),
    s.status === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading chat..." }) : null,
    s.status === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: "Couldn't load chat: " + (s.error ? s.error.message : "unknown error"),
        onRetry: s.reload
      }
    ) : null,
    s.status === "ready" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      s.hasMoreOlder ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.loadOlder, className: Uo.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: Uo.list, ref: r, onScroll: o, children: s.messages.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { icon: "💬", title: "No messages yet. Say hello!" }) : s.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(Db, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(Mb, { onSend: s.sendMessage })
    ] }) : null
  ] });
}
function Bb(s, r) {
  return new Date(r.updated_at) - new Date(s.updated_at);
}
function Qh() {
  var s = ye(), r = na({
    table: "saved_spirals",
    masterUsername: s.activeMasterContext,
    sort: Bb
  }), d = N.useCallback(
    async function(v) {
      var m = await window.saveSpiralToLibrary(v);
      return r.reload(), m;
    },
    [r]
  ), o = N.useCallback(
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
function qb(s) {
  var r = JSON.stringify(s, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function Yb(s, r, d) {
  var o = new FileReader();
  o.onload = function(v) {
    try {
      var m = JSON.parse(v.target.result);
      r(m);
    } catch {
      d("Failed to load configuration. Invalid file format.");
    }
  }, o.readAsText(s);
}
const Gb = "_sidebar_1jfxv_1", Qb = "_controlGroup_1jfxv_19", Xb = "_spiralList_1jfxv_53", Vb = "_spiralItem_1jfxv_67", Zb = "_spiralItemActive_1jfxv_69", Kb = "_actions_1jfxv_97", Jb = "_controlRow_1jfxv_107", kb = "_valueDisplay_1jfxv_141", $b = "_sendAsTask_1jfxv_153", dt = {
  sidebar: Gb,
  controlGroup: Qb,
  spiralList: Xb,
  spiralItem: Vb,
  spiralItemActive: Zb,
  actions: Kb,
  controlRow: Jb,
  valueDisplay: kb,
  sendAsTask: $b
};
var Fb = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function Wb({
  textControls: s,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: m,
  onSelect: p,
  onClearAll: T,
  onPropertyChange: j,
  backgroundColor: M,
  onBackgroundChange: A,
  onSave: y,
  onLoadFile: R,
  onOpenTaskModal: z,
  savedSpiralName: D,
  onSaveToLibrary: H
}) {
  var B = N.useRef(null), [Z, te] = N.useState(D || "");
  return /* @__PURE__ */ i.jsxs("div", { className: dt.sidebar, children: [
    s,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ i.jsx("div", { className: dt.spiralList, children: r.map(function(X, re) {
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
                /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
                  p(re);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
                  m(re);
                }, children: "Delete" })
              ] })
            ]
          },
          X.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      Fb.map(function(X) {
        return /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
          /* @__PURE__ */ i.jsxs("label", { children: [
            X.label,
            ":"
          ] }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "range",
              min: X.min,
              max: X.max,
              step: X.step,
              value: o[X.key],
              onChange: function(re) {
                j(X.key, Number(re.target.value));
              }
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: dt.valueDisplay, children: [
            X.key === "speed" || X.key === "opacity" || X.key === "timeOffset" ? Number(o[X.key]).toFixed(1) : o[X.key],
            X.suffix || ""
          ] })
        ] }, X.key);
      }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx("label", { children: "Color:" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "color",
            value: o.color,
            onChange: function(X) {
              j("color", X.target.value);
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
          B.current.click();
        }, children: "Load Config" })
      ] }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "file",
          accept: ".json",
          ref: B,
          style: { display: "none" },
          onChange: function(X) {
            X.target.files[0] && R(X.target.files[0]), X.target.value = "";
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
          value: Z,
          onChange: function(X) {
            te(X.target.value);
          },
          placeholder: "e.g. Calming blue swirl"
        }
      ),
      /* @__PURE__ */ i.jsx(
        G,
        {
          variant: "secondary",
          disabled: !Z.trim(),
          onClick: function() {
            H(Z.trim());
          },
          children: D ? "Update Saved Spiral" : "Save to Library"
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
            value: M,
            onChange: function(X) {
              A(X.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: T, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: z, className: dt.sendAsTask, children: "Send as Task" })
  ] });
}
const Ib = "_controlGroup_9ywy2_1", Pb = "_script_9ywy2_23", ex = "_controlRow_9ywy2_47", tx = "_valueDisplay_9ywy2_83", ax = "_buttonRow_9ywy2_97", $t = {
  controlGroup: Ib,
  script: Pb,
  controlRow: ex,
  valueDisplay: tx,
  buttonRow: ax
};
function lx(s) {
  return /* @__PURE__ */ i.jsxs("div", { className: $t.controlGroup, children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ i.jsx(
      "textarea",
      {
        className: $t.script,
        value: s.script,
        onChange: function(r) {
          s.setScript(r.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: $t.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: $t.valueDisplay, children: [
        s.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: $t.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: $t.valueDisplay, children: [
        s.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: $t.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: $t.valueDisplay, children: [
        s.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: $t.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: $t.valueDisplay, children: [
        s.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: $t.controlRow, children: [
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
    /* @__PURE__ */ i.jsxs("div", { className: $t.buttonRow, children: [
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.startLoop, disabled: s.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: s.stopLoop, disabled: !s.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const nx = "_row_vc5cz_1", ux = "_checkboxRow_vc5cz_23", ix = "_selectLabel_vc5cz_39", sx = "_select_vc5cz_39", cx = "_fieldset_vc5cz_73", rx = "_hint_vc5cz_87", ox = "_actions_vc5cz_99", Sa = {
  row: nx,
  checkboxRow: ux,
  selectLabel: ix,
  select: sx,
  fieldset: cx,
  hint: rx,
  actions: ox
};
function fx({ config: s, onClose: r, onSent: d }) {
  var o = ye(), v = Xn(), [m, p] = N.useState("Experience the Spiral Animation"), [T, j] = N.useState(10), [M, A] = N.useState(5), [y, R] = N.useState(""), [z, D] = N.useState(!1), [H, B] = N.useState("daily"), [Z, te] = N.useState([]), [X, re] = N.useState(!1);
  function Le(V) {
    te(function(ne) {
      return ne.includes(V) ? ne.filter(function(Qe) {
        return Qe !== V;
      }) : ne.concat(V);
    });
  }
  async function Ue() {
    var V = m.trim();
    if (!V) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (Z.length === 0) {
      window.showNotification(
        "Select at least one " + o.groupTerms.slaveLabel + " to assign this to",
        "error"
      );
      return;
    }
    if (y) {
      var ne = new Date(y);
      if (isNaN(ne.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (ne < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    re(!0);
    try {
      var Qe = {
        text: V,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        points: Number(T) || 10,
        penaltyPoints: Number(M) || 5,
        dueDate: y || null,
        isRepeating: z,
        repeatInterval: z ? H : null,
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
      }, { error: Be } = await window.createTaskForPigs(Qe, Z);
      if (Be) {
        console.error("Error creating spiral task:", Be), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + V + '" created successfully!',
        "success"
      ), d();
    } finally {
      re(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(Iu, { title: "🌀 Create Spiral Task", onClose: r, children: [
    /* @__PURE__ */ i.jsx(
      ue,
      {
        label: "Task Description",
        value: m,
        onChange: function(V) {
          p(V.target.value);
        },
        maxLength: 200
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Sa.row, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: T,
          onChange: function(V) {
            j(V.target.value);
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
          value: M,
          onChange: function(V) {
            A(V.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Sa.row, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: y,
          onChange: function(V) {
            R(V.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Sa.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: z,
            onChange: function(V) {
              D(V.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    z ? /* @__PURE__ */ i.jsx("div", { className: Sa.row, children: /* @__PURE__ */ i.jsxs("label", { className: Sa.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Sa.select,
          value: H,
          onChange: function(V) {
            B(V.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
            /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
          ]
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ i.jsxs("fieldset", { className: Sa.fieldset, children: [
      /* @__PURE__ */ i.jsxs("legend", { children: [
        "Assign to ",
        o.groupTerms.slaveLabelPlural
      ] }),
      v.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: Sa.hint, children: [
        "No ",
        o.groupTerms.slaveLabelPlural,
        " added yet."
      ] }) : v.slaves.map(function(V) {
        return /* @__PURE__ */ i.jsxs("label", { className: Sa.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: Z.includes(V.username),
              onChange: function() {
                Le(V.username);
              }
            }
          ),
          V.displayName
        ] }, V.username);
      })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Sa.actions, children: [
      /* @__PURE__ */ i.jsx(G, { loading: X, onClick: Ue, disabled: Z.length === 0, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: r, children: "Cancel" })
    ] })
  ] });
}
function ku(s) {
  return s ? Object.assign({}, s) : null;
}
function dx({ onClose: s, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = N.useRef(null), m = N.useRef([]), p = N.useRef(1), [, T] = N.useState(0), [j, M] = N.useState(0), [A, y] = N.useState(null), [R, z] = N.useState("#000000"), [D, H] = N.useState(!1), [B, Z] = N.useState(o || null), [te, X] = N.useState(d || ""), re = Lh(), Le = Qh();
  function Ue() {
    var q = v.current;
    return q ? { width: q.width, height: q.height } : { width: 0, height: 0 };
  }
  function V() {
    var q = Ue(), K = m1(p.current++, q.width, q.height);
    m.current = m.current.concat(K), M(m.current.length - 1), y(ku(K)), T(function(ce) {
      return ce + 1;
    });
  }
  function ne(q) {
    m.current = m.current.filter(function(ce, he) {
      return he !== q;
    });
    var K = Math.max(0, q - 1);
    M(K), y(ku(m.current[K])), T(function(ce) {
      return ce + 1;
    });
  }
  function Qe(q) {
    M(q), y(ku(m.current[q]));
  }
  function Be() {
    m.current = [], M(0), y(null), T(function(q) {
      return q + 1;
    });
  }
  function We(q, K) {
    var ce = m.current[j];
    ce && (ce[q] = K, y(ku(ce)));
  }
  function $e() {
    qb({
      spirals: m.current.map(function(q) {
        return Object.assign({}, q);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: R,
        selectedSpiralIndex: j
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function P(q) {
    var K = Ue(), ce = (q.spirals || []).map(function(ot) {
      return p.current = Math.max(p.current, (ot.id || 0) + 1), Object.assign(
        { x: K.width / 2, y: K.height / 2 },
        qo,
        ot
      );
    });
    m.current = ce;
    var he = q.globalSettings && q.globalSettings.selectedSpiralIndex || 0;
    M(he), y(ku(ce[he] || ce[0])), q.globalSettings && q.globalSettings.backgroundColor && z(q.globalSettings.backgroundColor), T(function(ot) {
      return ot + 1;
    });
  }
  function Xe(q) {
    Yb(
      q,
      function(K) {
        P(K), Z(null), X(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(K) {
        window.showNotification(K, "error");
      }
    );
  }
  function Me(q) {
    Le.saveSpiral({
      id: B,
      name: q,
      config: {
        spirals: m.current.map(function(K) {
          return Object.assign({}, K);
        }),
        textSettings: {},
        globalSettings: {
          backgroundColor: R,
          selectedSpiralIndex: j
        }
      }
    }).then(function(K) {
      K && Z(K), X(q);
    });
  }
  N.useEffect(function() {
    r ? P(r) : m.current.length === 0 && V();
    function q(K) {
      K.key === "Escape" && s();
    }
    return document.addEventListener("keydown", q), function() {
      document.removeEventListener("keydown", q);
    };
  }, []);
  var Q = m.current.map(function(q) {
    return { id: q.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: yl.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: yl.closeBtn, onClick: s, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: yl.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: yl.canvasArea, children: [
        /* @__PURE__ */ i.jsx(Uh, { canvasRef: v, spiralsRef: m, backgroundColor: R }),
        /* @__PURE__ */ i.jsx(
          Hh,
          {
            display: re.display,
            animSpeed: re.animSpeed,
            fontSize: re.fontSize,
            color: re.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        Wb,
        {
          textControls: /* @__PURE__ */ i.jsx(lx, { ...re }),
          spirals: Q,
          activeIndex: j,
          activeSnapshot: A,
          onAdd: V,
          onDelete: ne,
          onSelect: Qe,
          onClearAll: Be,
          onPropertyChange: We,
          backgroundColor: R,
          onBackgroundChange: z,
          onSave: $e,
          onLoadFile: Xe,
          onOpenTaskModal: function() {
            H(!0);
          },
          savedSpiralName: te,
          onSaveToLibrary: Me
        }
      )
    ] }),
    D ? /* @__PURE__ */ i.jsx(
      fx,
      {
        config: {
          spirals: m.current.map(function(q) {
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
            backgroundColor: R,
            selectedSpiralIndex: j
          }
        },
        onClose: function() {
          H(!1);
        },
        onSent: function() {
          H(!1), s();
        }
      }
    ) : null
  ] });
}
const vx = "_heading_iikbv_1", mx = "_row_iikbv_11", hx = "_meta_iikbv_45", gx = "_actions_iikbv_55", yx = "_renameRow_iikbv_67", $u = {
  heading: vx,
  row: mx,
  meta: hx,
  actions: gx,
  renameRow: yx
};
function px({ savedSpirals: s, status: r, error: d, onReload: o, onLoad: v, onRename: m, onDelete: p }) {
  var [T, j] = N.useState(null), [M, A] = N.useState("");
  function y(z) {
    j(z.id), A(z.name);
  }
  function R(z) {
    var D = M.trim();
    D && m(z, D), j(null);
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: $u.heading, children: "Saved Spirals" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading saved spirals..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: "Couldn't load saved spirals: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No saved spirals yet", hint: "Save one from inside the generator." }) : null,
    r === "ready" ? s.map(function(z) {
      return /* @__PURE__ */ i.jsx("div", { className: $u.row, children: T === z.id ? /* @__PURE__ */ i.jsxs("div", { className: $u.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          ue,
          {
            value: M,
            onChange: function(D) {
              A(D.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          R(z);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          j(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: z.name }),
          /* @__PURE__ */ i.jsxs("div", { className: $u.meta, children: [
            "Updated ",
            new Date(z.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: $u.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(z);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            y(z);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
            p(z.id);
          }, children: "Delete" })
        ] })
      ] }) }, z.id);
    }) : null
  ] });
}
function _x(s, r) {
  return s.name.localeCompare(r.name);
}
function Sx() {
  var s = ye(), r = na({
    table: "saved_cost_tracker_presets",
    masterUsername: s.activeMasterContext,
    sort: _x
  }), d = N.useCallback(
    async function(v) {
      var m = await window.saveCostTrackerPreset(v);
      return r.reload(), m;
    },
    [r]
  ), o = N.useCallback(
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
const bx = "_heading_1ynjy_1", xx = "_row_1ynjy_11", jx = "_selectGroup_1ynjy_31", Nx = "_selectLabel_1ynjy_45", Tx = "_select_1ynjy_31", wx = "_fieldset_1ynjy_75", Ex = "_checkboxRow_1ynjy_89", Ax = "_hint_1ynjy_105", Cx = "_penaltyForm_1ynjy_117", Dx = "_penaltyList_1ynjy_141", zx = "_removePenalty_1ynjy_157", yt = {
  heading: bx,
  row: xx,
  selectGroup: jx,
  selectLabel: Nx,
  select: Tx,
  fieldset: wx,
  checkboxRow: Ex,
  hint: Ax,
  penaltyForm: Cx,
  penaltyList: Dx,
  removePenalty: zx
};
function Rx({ onStart: s, onSavePreset: r, presetToApply: d }) {
  var o = ye(), v = Xn(), [m, p] = N.useState("Cost Tracker Running"), [T, j] = N.useState(50), [M, A] = N.useState("€"), [y, R] = N.useState(6e4), [z, D] = N.useState([]), [H, B] = N.useState(!1), [Z, te] = N.useState([]), [X, re] = N.useState(""), [Le, Ue] = N.useState(""), [V, ne] = N.useState("");
  function Qe(P) {
    D(function(Xe) {
      return Xe.includes(P) ? Xe.filter(function(Me) {
        return Me !== P;
      }) : Xe.concat(P);
    });
  }
  if (N.useEffect(
    function() {
      d && (p(d.description || "Cost Tracker Running"), j(d.rate), A(d.currency), R(d.increment_interval));
    },
    [d]
  ), !window.hasPermission("create_task")) return null;
  function Be() {
    te(function(P) {
      return P.concat({
        description: X.trim(),
        amount: Number(Le)
      });
    }), re(""), Ue("");
  }
  function We(P) {
    te(function(Xe) {
      return Xe.filter(function(Me, Q) {
        return Q !== P;
      });
    });
  }
  async function $e(P) {
    P.preventDefault(), B(!0);
    try {
      V.trim() && r && await r({
        id: d ? d.id : void 0,
        name: V.trim(),
        description: m,
        rate: Number(T) || 0,
        currency: M,
        incrementInterval: Number(y)
      }), await s(m, Number(T) || 0, M, Number(y), Z, z), te([]), ne(""), D([]);
    } finally {
      B(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: yt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: yt.form, onSubmit: $e, children: [
      /* @__PURE__ */ i.jsx(
        ue,
        {
          label: "Description",
          value: m,
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
            value: T,
            onChange: function(P) {
              j(P.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: yt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: yt.selectLabel, children: "Currency" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: yt.select,
              value: M,
              onChange: function(P) {
                A(P.target.value);
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
                R(P.target.value);
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
            value: X,
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
              Ue(P.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            type: "button",
            variant: "secondary",
            disabled: !X.trim() || !Le,
            onClick: Be,
            children: "Add penalty"
          }
        )
      ] }),
      Z.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: yt.penaltyList, children: Z.map(function(P, Xe) {
        return /* @__PURE__ */ i.jsxs("li", { children: [
          P.description,
          ": ",
          M,
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
                checked: z.includes(P.username),
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
          value: V,
          onChange: function(P) {
            ne(P.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: H, disabled: z.length === 0, children: "Start tracker" })
    ] })
  ] });
}
const Mx = "_heading_girf2_1", Ox = "_row_girf2_11", Ux = "_meta_girf2_45", Hx = "_actions_girf2_55", Hs = {
  heading: Mx,
  row: Ox,
  meta: Ux,
  actions: Hx
};
function Lx({ presets: s, status: r, error: d, onReload: o, onUse: v, onDelete: m }) {
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Hs.heading, children: "Saved Presets" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(Ft, { label: "Loading presets..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      ua,
      {
        message: "Couldn't load presets: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No saved presets yet", hint: "Save one while starting a tracker below." }) : null,
    r === "ready" ? s.map(function(p) {
      return /* @__PURE__ */ i.jsxs("div", { className: Hs.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: p.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Hs.meta, children: [
            p.currency,
            Number(p.rate).toFixed(2),
            " per",
            " ",
            p.increment_interval === 1e3 ? "second" : p.increment_interval === 36e5 ? "hour" : "minute",
            p.description ? " · " + p.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Hs.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(p);
          }, children: "Use" }),
          /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
            m(p.id);
          }, children: "Delete" })
        ] })
      ] }, p.id);
    }) : null
  ] });
}
const Bx = "_heading_1k7pj_1", qx = "_row_1k7pj_11", Yx = "_meta_1k7pj_45", Ho = {
  heading: Bx,
  row: qx,
  meta: Yx
};
function Gx(s) {
  return s === 1e3 ? "second" : s === 36e5 ? "hour" : "minute";
}
function Qx({ trackers: s, onDelete: r }) {
  return /* @__PURE__ */ i.jsxs(ge, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ho.heading, children: "Recently Stopped" }),
    s.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No stopped trackers yet" }) : s.map(function(d) {
      return /* @__PURE__ */ i.jsxs("div", { className: Ho.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: d.description }),
          /* @__PURE__ */ i.jsxs("div", { className: Ho.meta, children: [
            d.currency,
            Number(d.rate).toFixed(2),
            " per ",
            Gx(Number(d.increment_interval)),
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
const Xx = "_heading_lmzbq_1", Vx = {
  heading: Xx
};
function Zx() {
  var s = Bo(), r = Sx(), [d, o] = N.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      Rx,
      {
        onStart: s.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      Lx,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: Vx.heading, children: "Active Cost Trackers" }),
    s.trackers.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No active cost trackers" }) : s.trackers.map(function(v) {
      return /* @__PURE__ */ i.jsx(
        Ys,
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
      Qx,
      {
        trackers: s.stoppedTrackers,
        onDelete: s.deleteTracker
      }
    )
  ] });
}
const Kx = "_section_1o04b_1", Jx = "_sectionHeader_1o04b_9", kx = "_heading_1o04b_27", Fu = {
  section: Kx,
  sectionHeader: Jx,
  heading: kx
};
function $x() {
  var s = Qh(), [r, d] = N.useState(!1), [o, v] = N.useState(null), [m, p] = N.useState(null), [T, j] = N.useState("");
  function M() {
    v(null), p(null), j(""), d(!0);
  }
  function A(z) {
    v(z.config), p(z.id), j(z.name), d(!0);
  }
  function y() {
    d(!1), s.reload();
  }
  function R(z, D) {
    s.saveSpiral({ id: z.id, name: D, config: z.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { className: Fu.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Fu.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: Fu.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(G, { onClick: M, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        px,
        {
          savedSpirals: s.savedSpirals,
          status: s.status,
          error: s.error,
          onReload: s.reload,
          onLoad: A,
          onRename: R,
          onDelete: s.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: Fu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Fu.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Zx, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      dx,
      {
        onClose: y,
        initialConfig: o,
        initialSavedId: m,
        initialName: T
      }
    ) : null
  ] });
}
const Fx = "_card_s0ykj_1", Wx = "_header_s0ykj_19", Ix = "_name_s0ykj_33", Px = "_onlineDot_s0ykj_41", ej = "_offlineDot_s0ykj_43", tj = "_status_s0ykj_75", aj = "_points_s0ykj_93", lj = "_negative_s0ykj_105", nj = "_zero_s0ykj_113", uj = "_positive_s0ykj_121", ij = "_metaRow_s0ykj_129", sj = "_pendingBadge_s0ykj_145", cj = "_trackerBadge_s0ykj_163", Lt = {
  card: Fx,
  header: Wx,
  name: Ix,
  onlineDot: Px,
  offlineDot: ej,
  status: tj,
  points: aj,
  negative: lj,
  zero: nj,
  positive: uj,
  metaRow: ij,
  pendingBadge: sj,
  trackerBadge: cj
};
function rj(s) {
  return s < 0 ? Lt.negative : s === 0 ? Lt.zero : Lt.positive;
}
function oj({
  slave: s,
  online: r,
  tracker: d,
  pendingCount: o,
  completionRate: v,
  onClick: m
}) {
  return /* @__PURE__ */ i.jsxs(
    ge,
    {
      className: Lt.card,
      onClick: m,
      role: "button",
      tabIndex: 0,
      onKeyDown: function(p) {
        (p.key === "Enter" || p.key === " ") && m();
      },
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: Lt.header, children: [
          /* @__PURE__ */ i.jsx("span", { className: Lt.name, children: s.displayName }),
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: r ? Lt.onlineDot : Lt.offlineDot,
              title: r ? "Online" : "Offline"
            }
          )
        ] }),
        s.statusMessage ? /* @__PURE__ */ i.jsx("div", { className: Lt.status, children: s.statusMessage }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: [Lt.points, rj(s.points)].join(" "), children: [
          s.points,
          " pts"
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Lt.metaRow, children: [
          /* @__PURE__ */ i.jsxs("span", { children: [
            v,
            "% complete"
          ] }),
          o > 0 ? /* @__PURE__ */ i.jsxs("span", { className: Lt.pendingBadge, children: [
            o,
            " pending"
          ] }) : null
        ] }),
        d ? /* @__PURE__ */ i.jsx("div", { className: Lt.trackerBadge, children: "💰 Tracker running" }) : null
      ]
    }
  );
}
const fj = "_section_11wsb_1", dj = "_heading_11wsb_9", vj = "_list_11wsb_19", mj = "_listItem_11wsb_37", hj = "_status_11wsb_59", la = {
  section: fj,
  heading: dj,
  list: vj,
  listItem: mj,
  status: hj
};
function gj({
  slave: s,
  tasks: r,
  suggestions: d,
  tracker: o,
  onClose: v
}) {
  var m = r.filter(function(j) {
    return j.status === "todo" || j.status === "pending_approval";
  }), p = r.filter(function(j) {
    return j.status === "completed";
  }), T = d.filter(function(j) {
    return j.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs(Iu, { title: s.displayName, onClose: v, children: [
    o ? /* @__PURE__ */ i.jsxs("div", { className: la.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: la.heading, children: "Active Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Ys, { tracker: o, isAdmin: !1 })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: la.section, children: [
      /* @__PURE__ */ i.jsxs("h4", { className: la.heading, children: [
        "Tasks (",
        p.length,
        "/",
        r.length,
        " completed)"
      ] }),
      m.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No pending tasks" }) : /* @__PURE__ */ i.jsx("ul", { className: la.list, children: m.map(function(j) {
        return /* @__PURE__ */ i.jsxs("li", { className: la.listItem, children: [
          j.text.split(`
`)[0],
          /* @__PURE__ */ i.jsx("span", { className: la.status, children: j.status })
        ] }, j.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: la.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: la.heading, children: "Pending Suggestions" }),
      T.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No pending suggestions" }) : /* @__PURE__ */ i.jsx("ul", { className: la.list, children: T.map(function(j) {
        return /* @__PURE__ */ i.jsx("li", { className: la.listItem, children: j.description }, j.id);
      }) })
    ] })
  ] });
}
const yj = "_section_10rik_1", pj = "_heading_10rik_9", _j = "_grid_10rik_19", Sj = "_invoiceList_10rik_31", bj = "_invoiceItem_10rik_49", gl = {
  section: yj,
  heading: pj,
  grid: _j,
  invoiceList: Sj,
  invoiceItem: bj
};
function xj() {
  var s = ye(), r = Xn(), d = Bo(), o = Gs(), v = Yh(), m = qh(), [p, T] = N.useState(null), j = o.tasks.filter(function(D) {
    return D.type === "cost-tracker" && D.status === "pending_approval";
  });
  function M(D) {
    var H = m.activity.find(function(B) {
      return B.user === D;
    });
    return !!(H && H.action === "login");
  }
  function A(D) {
    var H = o.tasks.filter(function(Z) {
      return Z.assignedTo === D && Z.type !== "demerit";
    });
    if (H.length === 0) return 0;
    var B = H.filter(function(Z) {
      return Z.status === "completed";
    });
    return Math.round(B.length / H.length * 100);
  }
  function y(D) {
    var H = v.suggestions.filter(function(Z) {
      return Z.suggestedBy === D && Z.status === "pending";
    }).length, B = o.tasks.filter(function(Z) {
      return Z.assignedTo === D && Z.appealStatus === "pending";
    }).length;
    return H + B;
  }
  function R(D) {
    return d.trackers.find(function(H) {
      return Array.isArray(H.assigned_to) && H.assigned_to.includes(D);
    });
  }
  var z = p ? r.slaves.find(function(D) {
    return D.username === p;
  }) : null;
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(ge, { className: gl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: gl.heading, children: "Active Cost Trackers" }),
      d.trackers.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No active cost trackers" }) : d.trackers.map(function(D) {
        return /* @__PURE__ */ i.jsx(
          Ys,
          {
            tracker: D,
            isAdmin: !0,
            onStop: d.stopTracker,
            onDelete: d.deleteTracker,
            onAddPenalty: d.addPenalty,
            onRemovePenalty: d.removePenalty
          },
          D.id
        );
      })
    ] }),
    /* @__PURE__ */ i.jsxs(ge, { className: gl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: gl.heading, children: "Invoices Awaiting Approval" }),
      j.length === 0 ? /* @__PURE__ */ i.jsx(Oe, { title: "No invoices awaiting approval" }) : /* @__PURE__ */ i.jsx("ul", { className: gl.invoiceList, children: j.map(function(D) {
        return /* @__PURE__ */ i.jsxs("li", { className: gl.invoiceItem, children: [
          /* @__PURE__ */ i.jsx("span", { children: D.text.split(`
`)[0] }),
          /* @__PURE__ */ i.jsx(
            G,
            {
              onClick: function() {
                o.approveInvoice(D.id);
              },
              children: "Approve"
            }
          )
        ] }, D.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsx("h2", { className: gl.heading, children: s.groupTerms.slaveLabelPlural }),
    r.slaves.length === 0 ? /* @__PURE__ */ i.jsx(
      Oe,
      {
        title: "No " + s.groupTerms.slaveLabelPlural + " added yet"
      }
    ) : /* @__PURE__ */ i.jsx("div", { className: gl.grid, children: r.slaves.map(function(D) {
      return /* @__PURE__ */ i.jsx(
        oj,
        {
          slave: D,
          online: M(D.username),
          tracker: R(D.username),
          pendingCount: y(D.username),
          completionRate: A(D.username),
          onClick: function() {
            T(D.username);
          }
        },
        D.username
      );
    }) }),
    z ? /* @__PURE__ */ i.jsx(
      gj,
      {
        slave: z,
        tasks: o.tasks.filter(function(D) {
          return D.assignedTo === z.username;
        }),
        suggestions: v.suggestions.filter(function(D) {
          return D.suggestedBy === z.username;
        }),
        tracker: R(z.username),
        onClose: function() {
          T(null);
        }
      }
    ) : null
  ] });
}
function jj({ activeTab: s }) {
  var r = ye();
  switch (s) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(L1, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(X1, {});
    case "overview":
      return r.isMaster ? /* @__PURE__ */ i.jsx(xj, {}) : null;
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(H_, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx($x, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(K_, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(DS, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(Lb, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(WS, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(jb, {}) : null;
    default:
      return null;
  }
}
function Nj() {
  var s = ye(), [r, d] = N.useState("tasks"), o = {
    "--color-bg": s.theme.bg,
    "--color-card": s.theme.card,
    "--color-elevated": s.theme.elevated,
    "--color-text-primary": s.theme.textPrimary,
    "--color-text-secondary": s.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", "data-theme": s.themeMode, style: o, children: [
    /* @__PURE__ */ i.jsx(Gp, {}),
    /* @__PURE__ */ i.jsx(Zp, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsx("main", { className: "betaContainer", children: /* @__PURE__ */ i.jsx(jj, { activeTab: r }) })
  ] });
}
function Tj() {
  return /* @__PURE__ */ i.jsx($0, { children: /* @__PURE__ */ i.jsx(Nj, {}) });
}
var Qn = null;
function wj(s) {
  Qn || (Qn = k0.createRoot(s), Qn.render(/* @__PURE__ */ i.jsx(Tj, {})));
}
function Ej() {
  Qn && (Qn.unmount(), Qn = null);
}
export {
  wj as mountBetaApp,
  Ej as unmountBetaApp
};
