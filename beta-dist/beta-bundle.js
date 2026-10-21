var _o = { exports: {} }, Uu = {};
var uh;
function D0() {
  if (uh) return Uu;
  uh = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function d(o, v, h) {
    var j = null;
    if (h !== void 0 && (j = "" + h), v.key !== void 0 && (j = "" + v.key), "key" in v) {
      h = {};
      for (var w in v)
        w !== "key" && (h[w] = v[w]);
    } else h = v;
    return v = h.ref, {
      $$typeof: c,
      type: o,
      key: j,
      ref: v !== void 0 ? v : null,
      props: h
    };
  }
  return Uu.Fragment = r, Uu.jsx = d, Uu.jsxs = d, Uu;
}
var ih;
function O0() {
  return ih || (ih = 1, _o.exports = D0()), _o.exports;
}
var i = O0(), po = { exports: {} }, Hu = {}, So = { exports: {} }, bo = {};
var ch;
function M0() {
  return ch || (ch = 1, function(c) {
    function r(Q, q) {
      var Z = Q.length;
      Q.push(q);
      e: for (; 0 < Z; ) {
        var ie = Z - 1 >>> 1, me = Q[ie];
        if (0 < v(me, q))
          Q[ie] = q, Q[Z] = me, Z = ie;
        else break e;
      }
    }
    function d(Q) {
      return Q.length === 0 ? null : Q[0];
    }
    function o(Q) {
      if (Q.length === 0) return null;
      var q = Q[0], Z = Q.pop();
      if (Z !== q) {
        Q[0] = Z;
        e: for (var ie = 0, me = Q.length, ot = me >>> 1; ie < ot; ) {
          var _a = 2 * (ie + 1) - 1, vl = Q[_a], y = _a + 1, H = Q[y];
          if (0 > v(vl, Z))
            y < me && 0 > v(H, vl) ? (Q[ie] = H, Q[y] = Z, ie = y) : (Q[ie] = vl, Q[_a] = Z, ie = _a);
          else if (y < me && 0 > v(H, Z))
            Q[ie] = H, Q[y] = Z, ie = y;
          else break e;
        }
      }
      return q;
    }
    function v(Q, q) {
      var Z = Q.sortIndex - q.sortIndex;
      return Z !== 0 ? Z : Q.id - q.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      c.unstable_now = function() {
        return h.now();
      };
    } else {
      var j = Date, w = j.now();
      c.unstable_now = function() {
        return j.now() - w;
      };
    }
    var A = [], R = [], E = 1, _ = null, D = 3, C = !1, U = !1, L = !1, B = !1, X = typeof setTimeout == "function" ? setTimeout : null, re = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function pe(Q) {
      for (var q = d(R); q !== null; ) {
        if (q.callback === null) o(R);
        else if (q.startTime <= Q)
          o(R), q.sortIndex = q.expirationTime, r(A, q);
        else break;
        q = d(R);
      }
    }
    function Je(Q) {
      if (L = !1, pe(Q), !U)
        if (d(A) !== null)
          U = !0, Ye || (Ye = !0, Qe());
        else {
          var q = d(R);
          q !== null && He(Je, q.startTime - Q);
        }
    }
    var Ye = !1, P = -1, ue = 5, rt = -1;
    function $e() {
      return B ? !0 : !(c.unstable_now() - rt < ue);
    }
    function Ce() {
      if (B = !1, Ye) {
        var Q = c.unstable_now();
        rt = Q;
        var q = !0;
        try {
          e: {
            U = !1, L && (L = !1, re(P), P = -1), C = !0;
            var Z = D;
            try {
              t: {
                for (pe(Q), _ = d(A); _ !== null && !(_.expirationTime > Q && $e()); ) {
                  var ie = _.callback;
                  if (typeof ie == "function") {
                    _.callback = null, D = _.priorityLevel;
                    var me = ie(
                      _.expirationTime <= Q
                    );
                    if (Q = c.unstable_now(), typeof me == "function") {
                      _.callback = me, pe(Q), q = !0;
                      break t;
                    }
                    _ === d(A) && o(A), pe(Q);
                  } else o(A);
                  _ = d(A);
                }
                if (_ !== null) q = !0;
                else {
                  var ot = d(R);
                  ot !== null && He(
                    Je,
                    ot.startTime - Q
                  ), q = !1;
                }
              }
              break e;
            } finally {
              _ = null, D = Z, C = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Qe() : Ye = !1;
        }
      }
    }
    var Qe;
    if (typeof K == "function")
      Qe = function() {
        K(Ce);
      };
    else if (typeof MessageChannel < "u") {
      var ee = new MessageChannel(), Fe = ee.port2;
      ee.port1.onmessage = Ce, Qe = function() {
        Fe.postMessage(null);
      };
    } else
      Qe = function() {
        X(Ce, 0);
      };
    function He(Q, q) {
      P = X(function() {
        Q(c.unstable_now());
      }, q);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(Q) {
      Q.callback = null;
    }, c.unstable_forceFrameRate = function(Q) {
      0 > Q || 125 < Q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ue = 0 < Q ? Math.floor(1e3 / Q) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, c.unstable_next = function(Q) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = D;
      }
      var Z = D;
      D = q;
      try {
        return Q();
      } finally {
        D = Z;
      }
    }, c.unstable_requestPaint = function() {
      B = !0;
    }, c.unstable_runWithPriority = function(Q, q) {
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
      var Z = D;
      D = Q;
      try {
        return q();
      } finally {
        D = Z;
      }
    }, c.unstable_scheduleCallback = function(Q, q, Z) {
      var ie = c.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ie + Z : ie) : Z = ie, Q) {
        case 1:
          var me = -1;
          break;
        case 2:
          me = 250;
          break;
        case 5:
          me = 1073741823;
          break;
        case 4:
          me = 1e4;
          break;
        default:
          me = 5e3;
      }
      return me = Z + me, Q = {
        id: E++,
        callback: q,
        priorityLevel: Q,
        startTime: Z,
        expirationTime: me,
        sortIndex: -1
      }, Z > ie ? (Q.sortIndex = Z, r(R, Q), d(A) === null && Q === d(R) && (L ? (re(P), P = -1) : L = !0, He(Je, Z - ie))) : (Q.sortIndex = me, r(A, Q), U || C || (U = !0, Ye || (Ye = !0, Qe()))), Q;
    }, c.unstable_shouldYield = $e, c.unstable_wrapCallback = function(Q) {
      var q = D;
      return function() {
        var Z = D;
        D = q;
        try {
          return Q.apply(this, arguments);
        } finally {
          D = Z;
        }
      };
    };
  }(bo)), bo;
}
var sh;
function R0() {
  return sh || (sh = 1, So.exports = M0()), So.exports;
}
var xo = { exports: {} }, ae = {};
var rh;
function U0() {
  if (rh) return ae;
  rh = 1;
  var c = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), j = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), R = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), _ = Symbol.for("react.activity"), D = Symbol.for("react.view_transition"), C = Symbol.iterator;
  function U(y) {
    return y === null || typeof y != "object" ? null : (y = C && y[C] || y["@@iterator"], typeof y == "function" ? y : null);
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
  }, B = Object.assign, X = {};
  function re(y, H, F) {
    this.props = y, this.context = H, this.refs = X, this.updater = F || L;
  }
  re.prototype.isReactComponent = {}, re.prototype.setState = function(y, H) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, H, "setState");
  }, re.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function K() {
  }
  K.prototype = re.prototype;
  function pe(y, H, F) {
    this.props = y, this.context = H, this.refs = X, this.updater = F || L;
  }
  var Je = pe.prototype = new K();
  Je.constructor = pe, B(Je, re.prototype), Je.isPureReactComponent = !0;
  var Ye = Array.isArray;
  function P() {
  }
  var ue = { H: null, A: null, T: null, S: null }, rt = Object.prototype.hasOwnProperty;
  function $e(y, H, F) {
    var W = F.ref;
    return {
      $$typeof: c,
      type: y,
      key: H,
      ref: W !== void 0 ? W : null,
      props: F
    };
  }
  function Ce(y, H) {
    return $e(y.type, H, y.props);
  }
  function Qe(y) {
    return typeof y == "object" && y !== null && y.$$typeof === c;
  }
  function ee(y) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(F) {
      return H[F];
    });
  }
  var Fe = /\/+/g;
  function He(y, H) {
    return typeof y == "object" && y !== null && y.key != null ? ee("" + y.key) : H.toString(36);
  }
  function Q(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(P, P) : (y.status = "pending", y.then(
          function(H) {
            y.status === "pending" && (y.status = "fulfilled", y.value = H);
          },
          function(H) {
            y.status === "pending" && (y.status = "rejected", y.reason = H);
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
  function q(y, H, F, W, ye) {
    var Se = typeof y;
    (Se === "undefined" || Se === "boolean") && (y = null);
    var xe = !1;
    if (y === null) xe = !0;
    else
      switch (Se) {
        case "bigint":
        case "string":
        case "number":
          xe = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case c:
            case r:
              xe = !0;
              break;
            case E:
              return xe = y._init, q(
                xe(y._payload),
                H,
                F,
                W,
                ye
              );
          }
      }
    if (xe)
      return ye = ye(y), xe = W === "" ? "." + He(y, 0) : W, Ye(ye) ? (F = "", xe != null && (F = xe.replace(Fe, "$&/") + "/"), q(ye, H, F, "", function(pa) {
        return pa;
      })) : ye != null && (Qe(ye) && (ye = Ce(
        ye,
        F + (ye.key == null || y && y.key === ye.key ? "" : ("" + ye.key).replace(
          Fe,
          "$&/"
        ) + "/") + xe
      )), H.push(ye)), 1;
    xe = 0;
    var k = W === "" ? "." : W + ":";
    if (Ye(y))
      for (var te = 0; te < y.length; te++)
        W = y[te], Se = k + He(W, te), xe += q(
          W,
          H,
          F,
          Se,
          ye
        );
    else if (te = U(y), typeof te == "function")
      for (y = te.call(y), te = 0; !(W = y.next()).done; )
        W = W.value, Se = k + He(W, te++), xe += q(
          W,
          H,
          F,
          Se,
          ye
        );
    else if (Se === "object") {
      if (typeof y.then == "function")
        return q(
          Q(y),
          H,
          F,
          W,
          ye
        );
      throw H = String(y), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return xe;
  }
  function Z(y, H, F) {
    if (y == null) return y;
    var W = [], ye = 0;
    return q(y, W, "", "", function(Se) {
      return H.call(F, Se, ye++);
    }), W;
  }
  function ie(y) {
    if (y._status === -1) {
      var H = y._result, F = H();
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
  var me = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  };
  function ot(y) {
    var H = ue.T, F = {};
    F.types = H !== null ? H.types : null, ue.T = F;
    try {
      var W = y(), ye = ue.S;
      ye !== null && ye(F, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then(P, me);
    } catch (Se) {
      me(Se);
    } finally {
      H !== null && F.types !== null && (H.types = F.types), ue.T = H;
    }
  }
  function _a(y) {
    var H = ue.T;
    if (H !== null) {
      var F = H.types;
      F === null ? H.types = [y] : F.indexOf(y) === -1 && F.push(y);
    } else ot(_a.bind(null, y));
  }
  var vl = {
    map: Z,
    forEach: function(y, H, F) {
      Z(
        y,
        function() {
          H.apply(this, arguments);
        },
        F
      );
    },
    count: function(y) {
      var H = 0;
      return Z(y, function() {
        H++;
      }), H;
    },
    toArray: function(y) {
      return Z(y, function(H) {
        return H;
      }) || [];
    },
    only: function(y) {
      if (!Qe(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return ae.Activity = _, ae.Children = vl, ae.Component = re, ae.Fragment = d, ae.Profiler = v, ae.PureComponent = pe, ae.StrictMode = o, ae.Suspense = A, ae.ViewTransition = D, ae.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ue, ae.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return ue.H.useMemoCache(y);
    }
  }, ae.addTransitionType = _a, ae.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, ae.cacheSignal = function() {
    return null;
  }, ae.cloneElement = function(y, H, F) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var W = B({}, y.props), ye = y.key;
    if (H != null)
      for (Se in H.key !== void 0 && (ye = "" + H.key), H)
        !rt.call(H, Se) || Se === "key" || Se === "__self" || Se === "__source" || Se === "ref" && H.ref === void 0 || (W[Se] = H[Se]);
    var Se = arguments.length - 2;
    if (Se === 1) W.children = F;
    else if (1 < Se) {
      for (var xe = Array(Se), k = 0; k < Se; k++)
        xe[k] = arguments[k + 2];
      W.children = xe;
    }
    return $e(y.type, ye, W);
  }, ae.createContext = function(y) {
    return y = {
      $$typeof: j,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: h,
      _context: y
    }, y;
  }, ae.createElement = function(y, H, F) {
    var W, ye = {}, Se = null;
    if (H != null)
      for (W in H.key !== void 0 && (Se = "" + H.key), H)
        rt.call(H, W) && W !== "key" && W !== "__self" && W !== "__source" && (ye[W] = H[W]);
    var xe = arguments.length - 2;
    if (xe === 1) ye.children = F;
    else if (1 < xe) {
      for (var k = Array(xe), te = 0; te < xe; te++)
        k[te] = arguments[te + 2];
      ye.children = k;
    }
    if (y && y.defaultProps)
      for (W in xe = y.defaultProps, xe)
        ye[W] === void 0 && (ye[W] = xe[W]);
    return $e(y, Se, ye);
  }, ae.createRef = function() {
    return { current: null };
  }, ae.forwardRef = function(y) {
    return { $$typeof: w, render: y };
  }, ae.isValidElement = Qe, ae.lazy = function(y) {
    return {
      $$typeof: E,
      _payload: { _status: -1, _result: y },
      _init: ie
    };
  }, ae.memo = function(y, H) {
    return {
      $$typeof: R,
      type: y,
      compare: H === void 0 ? null : H
    };
  }, ae.startTransition = ot, ae.unstable_useCacheRefresh = function() {
    return ue.H.useCacheRefresh();
  }, ae.use = function(y) {
    return ue.H.use(y);
  }, ae.useActionState = function(y, H, F) {
    return ue.H.useActionState(y, H, F);
  }, ae.useCallback = function(y, H) {
    return ue.H.useCallback(y, H);
  }, ae.useContext = function(y) {
    return ue.H.useContext(y);
  }, ae.useDebugValue = function() {
  }, ae.useDeferredValue = function(y, H) {
    return ue.H.useDeferredValue(y, H);
  }, ae.useEffect = function(y, H) {
    return ue.H.useEffect(y, H);
  }, ae.useEffectEvent = function(y) {
    return ue.H.useEffectEvent(y);
  }, ae.useId = function() {
    return ue.H.useId();
  }, ae.useImperativeHandle = function(y, H, F) {
    return ue.H.useImperativeHandle(y, H, F);
  }, ae.useInsertionEffect = function(y, H) {
    return ue.H.useInsertionEffect(y, H);
  }, ae.useLayoutEffect = function(y, H) {
    return ue.H.useLayoutEffect(y, H);
  }, ae.useMemo = function(y, H) {
    return ue.H.useMemo(y, H);
  }, ae.useOptimistic = function(y, H) {
    return ue.H.useOptimistic(y, H);
  }, ae.useReducer = function(y, H, F) {
    return ue.H.useReducer(y, H, F);
  }, ae.useRef = function(y) {
    return ue.H.useRef(y);
  }, ae.useState = function(y) {
    return ue.H.useState(y);
  }, ae.useSyncExternalStore = function(y, H, F) {
    return ue.H.useSyncExternalStore(
      y,
      H,
      F
    );
  }, ae.useTransition = function() {
    return ue.H.useTransition();
  }, ae.version = "19.3.1", ae;
}
var oh;
function Do() {
  return oh || (oh = 1, xo.exports = U0()), xo.exports;
}
var jo = { exports: {} }, st = {};
var fh;
function H0() {
  if (fh) return st;
  fh = 1;
  var c = Do();
  function r(E) {
    var _ = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        _ += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + E + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function w(E, _, D) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: C == null ? null : C === j ? j : "" + C,
      children: E,
      containerInfo: _,
      implementation: D
    };
  }
  var A = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function R(E, _) {
    if (E === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, st.browser = function(E) {
    return { $$typeof: h, _reason: E };
  }, st.createPortal = function(E, _) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(r(299));
    return w(E, _, null, D);
  }, st.flushSync = function(E) {
    var _ = A.T, D = o.p;
    try {
      if (A.T = null, o.p = 2, E) return E();
    } finally {
      A.T = _, o.p = D, o.d.f();
    }
  }, st.preconnect = function(E, _) {
    typeof E == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, o.d.C(E, _));
  }, st.prefetchDNS = function(E) {
    typeof E == "string" && o.d.D(E);
  }, st.preinit = function(E, _) {
    if (typeof E == "string" && _ && typeof _.as == "string") {
      var D = _.as, C = R(D, _.crossOrigin), U = typeof _.integrity == "string" ? _.integrity : void 0, L = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      D === "style" ? o.d.S(
        E,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: C,
          integrity: U,
          fetchPriority: L
        }
      ) : D === "script" && o.d.X(E, {
        crossOrigin: C,
        integrity: U,
        fetchPriority: L,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, st.preinitModule = function(E, _) {
    if (typeof E == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var D = R(
            _.as,
            _.crossOrigin
          );
          o.d.M(E, {
            crossOrigin: D,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0,
            fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
          });
        }
      } else _ == null && o.d.M(E);
  }, st.preload = function(E, _) {
    if (typeof E == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var D = _.as, C = R(D, _.crossOrigin);
      o.d.L(E, D, {
        crossOrigin: C,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, st.preloadModule = function(E, _) {
    if (typeof E == "string")
      if (_) {
        var D = R(_.as, _.crossOrigin);
        o.d.m(E, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: D,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0,
          fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
        });
      } else o.d.m(E);
  }, st.requestFormReset = function(E) {
    o.d.r(E);
  }, st.unstable_batchedUpdates = function(E, _) {
    return E(_);
  }, st.useFormState = function(E, _, D) {
    return A.H.useFormState(E, _, D);
  }, st.useFormStatus = function() {
    return A.H.useHostTransitionStatus();
  }, st.version = "19.3.1", st;
}
var dh;
function L0() {
  if (dh) return jo.exports;
  dh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), jo.exports = H0(), jo.exports;
}
var vh;
function q0() {
  if (vh) return Hu;
  vh = 1;
  var c = R0(), r = Do(), d = L0();
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
  function w(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function A(e) {
    if (h(e) !== e)
      throw Error(o(188));
  }
  function R(e) {
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
          if (u === a) return A(n), e;
          if (u === l) return A(n), t;
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
  function E(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = E(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function _(e, t, a, l, n, u) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && a(e, l, n, u) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && _(
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
  function D(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function C(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function U(e) {
    var t = [null, null], a = D(e);
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
  var X = null, re = null;
  function K(e, t, a) {
    return e === a ? !0 : e === t ? (X = e, !0) : !1;
  }
  function pe(e, t, a) {
    return e === a ? (re = e, !1) : e === t ? (re !== null && (X = e), !0) : !1;
  }
  function Je(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function Ye(e, t, a) {
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
  var P = Object.assign, ue = Symbol.for("react.element"), rt = Symbol.for("react.transitional.element"), $e = Symbol.for("react.portal"), Ce = Symbol.for("react.fragment"), Qe = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), Fe = Symbol.for("react.consumer"), He = Symbol.for("react.context"), Q = Symbol.for("react.forward_ref"), q = Symbol.for("react.suspense"), Z = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), ot = Symbol.for("react.activity"), _a = Symbol.for("react.legacy_hidden"), vl = Symbol.for("react.memo_cache_sentinel"), y = Symbol.for("react.view_transition"), H = Symbol.for("react.recoverable"), F = Symbol.iterator;
  function W(e) {
    return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ye = Symbol.for("react.client.reference");
  function Se(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ce:
        return "Fragment";
      case ee:
        return "Profiler";
      case Qe:
        return "StrictMode";
      case q:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case ot:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case $e:
          return "Portal";
        case He:
          return e.displayName || "Context";
        case Fe:
          return (e._context.displayName || "Context") + ".Consumer";
        case Q:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ie:
          return t = e.displayName || null, t !== null ? t : Se(e.type) || "Memo";
        case me:
          t = e._payload, e = e._init;
          try {
            return Se(e(t));
          } catch {
          }
      }
    return null;
  }
  var xe = Array.isArray, k = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, pa = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Hc = [], Bl = -1;
  function na(e) {
    return { current: e };
  }
  function tt(e) {
    0 > Bl || (e.current = Hc[Bl], Hc[Bl] = null, Bl--);
  }
  function De(e, t) {
    Bl++, Hc[Bl] = e.current, e.current = t;
  }
  var ua = na(null), Gn = na(null), Ha = na(null), Fu = na(null);
  function Wu(e, t) {
    switch (De(Ha, t), De(Gn, e), De(ua, null), t.nodeType) {
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
    tt(ua), De(ua, e);
  }
  function Yl() {
    tt(ua), tt(Gn), tt(Ha);
  }
  function Lc(e) {
    var t = e.memoizedState;
    t !== null && (zn._currentValue = t.memoizedState, De(Fu, e)), t = ua.current;
    var a = hm(t, e.type);
    t !== a && (De(Gn, e), De(ua, a));
  }
  function Iu(e) {
    Gn.current === e && (tt(ua), tt(Gn)), Fu.current === e && (tt(Fu), zn._currentValue = pa);
  }
  var qc, Ro;
  function La(e) {
    if (qc === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        qc = t && t[1] || "", Ro = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + qc + e + Ro;
  }
  var Bc = !1;
  function Yc(e, t) {
    if (!e || Bc) return "";
    Bc = !0;
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
                  var p = Y;
                }
                Reflect.construct(e, [], M);
              } else {
                try {
                  M.call();
                } catch (Y) {
                  p = Y;
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
                p = Y;
              }
              (M = e()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && p && typeof Y.stack == "string")
              return [Y.stack, p.stack];
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
                  var N = `
` + m[l].replace(" at new ", " at ");
                  return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), N;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Bc = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? La(a) : "";
  }
  function Uh(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return La(e.type);
      case 16:
        return La("Lazy");
      case 13:
        return e.child !== t && t !== null ? La("Suspense Fallback") : La("Suspense");
      case 19:
        return La("SuspenseList");
      case 0:
      case 15:
        return Yc(e.type, !1);
      case 11:
        return Yc(e.type.render, !1);
      case 1:
        return Yc(e.type, !0);
      case 31:
        return La("Activity");
      case 30:
        return La("ViewTransition");
      default:
        return "";
    }
  }
  function Uo(e) {
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
  var Gc = Object.prototype.hasOwnProperty, Qc = c.unstable_scheduleCallback, Xc = c.unstable_cancelCallback, Hh = c.unstable_shouldYield, Lh = c.unstable_requestPaint, Nt = c.unstable_now, qh = c.unstable_getCurrentPriorityLevel, Ho = c.unstable_ImmediatePriority, Lo = c.unstable_UserBlockingPriority, Pu = c.unstable_NormalPriority, Bh = c.unstable_LowPriority, qo = c.unstable_IdlePriority, Yh = c.log, Gh = c.unstable_setDisableYieldValue, Qn = null, Et = null;
  function qa(e) {
    if (typeof Yh == "function" && Gh(e), Et && typeof Et.setStrictMode == "function")
      try {
        Et.setStrictMode(Qn, e);
      } catch {
      }
  }
  var At = Math.clz32 ? Math.clz32 : Zh, Qh = Math.log, Xh = Math.LN2;
  function Zh(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Qh(e) / Xh | 0) | 0;
  }
  var ei = 256, ti = 262144, ai = 4194304;
  function ml(e) {
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
  function li(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var f = l & 134217727;
    return f !== 0 ? (l = f & ~u, l !== 0 ? n = ml(l) : (s &= f, s !== 0 ? n = ml(s) : a || (a = f & ~e, a !== 0 && (n = ml(a))))) : (f = l & ~u, f !== 0 ? n = ml(f) : s !== 0 ? n = ml(s) : a || (a = l & ~e, a !== 0 && (n = ml(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, a = t & -t, u >= a || u === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function Xn(e, t) {
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
  function Yo() {
    var e = ai;
    return ai <<= 1, (ai & 62914560) === 0 && (ai = 4194304), e;
  }
  function Zc(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function Zn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Kh(e, t, a, l, n, u) {
    var s = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var f = e.entanglements, m = e.expirationTimes, b = e.hiddenUpdates;
    for (a = s & ~a; 0 < a; ) {
      var N = 31 - At(a), M = 1 << N;
      f[N] = 0, m[N] = -1;
      var p = b[N];
      if (p !== null)
        for (b[N] = null, N = 0; N < p.length; N++) {
          var T = p[N];
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
    return a = (a & 42) !== 0 ? 1 : Vc(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function Vc(e) {
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
  function Kc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Zo() {
    var e = te.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Im(e.type));
  }
  function Vo(e, t) {
    var a = te.p;
    try {
      return te.p = e, t();
    } finally {
      te.p = a;
    }
  }
  var Sa = Math.random().toString(36).slice(2), at = "__reactFiber$" + Sa, pt = "__reactProps$" + Sa, Gl = "__reactContainer$" + Sa, Ko = "__reactEvents$" + Sa, Jh = "__reactListeners$" + Sa, kh = "__reactHandles$" + Sa, Jo = "__reactResources$" + Sa, Vn = "__reactMarker$" + Sa, ni = "__reactLoad$" + Sa;
  function ui(e) {
    delete e[at], delete e[pt], delete e[Jh], delete e[kh];
  }
  function hl(e) {
    var t;
    if (t = e[at]) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Gl] || a[at]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = Om(e); e !== null; ) {
            if (a = e[at]) return a;
            e = Om(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function Ql(e) {
    if (e = e[at] || e[Gl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Kn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Xl(e) {
    var t = e[Jo];
    return t || (t = e[Jo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function We(e) {
    e[Vn] = !0;
  }
  function ko(e) {
    e[ni] = void 0;
  }
  var $o = /* @__PURE__ */ new Set(), Fo = {};
  function gl(e, t) {
    Zl(e, t), Zl(e + "Capture", t);
  }
  function Zl(e, t) {
    for (Fo[e] = t, e = 0; e < t.length; e++)
      $o.add(t[e]);
  }
  var $h = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Wo = {}, Io = {};
  function Fh(e) {
    return Gc.call(Io, e) ? !0 : Gc.call(Wo, e) ? !1 : $h.test(e) ? Io[e] = !0 : (Wo[e] = !0, !1);
  }
  var be = !1;
  function Po() {
    var e = be;
    return be = !1, e;
  }
  function ii(e, t, a) {
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
  function ba(e, t, a, l) {
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
  function zt(e) {
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
  function Jc(e) {
    if (!e._valueTracker) {
      var t = ef(e) ? "checked" : "value";
      e._valueTracker = Wh(
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
  var Ih = /[\n"\\]/g;
  function Lt(e) {
    return e.replace(
      Ih,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function kc(e, t, a, l, n, u, s, f) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? s === "number" && e.value == t ? $c(e, zt(e.value)) : $c(e, zt(t)) : a != null ? $c(e, zt(a)) : l != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.name = "" + zt(f) : e.removeAttribute("name");
  }
  function af(e, t, a, l, n, u, s, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Jc(e);
        return;
      }
      a = a != null ? "" + zt(a) : "", t = t != null ? "" + zt(t) : a, f || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = f ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), Jc(e);
  }
  function $c(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function Vl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++)
        t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + zt(a), t = null, n = 0; n < e.length; n++) {
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
    if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + zt(a) : "";
  }
  function nf(e, t, a, l) {
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
    a = zt(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l), Jc(e);
  }
  function Kl(e, t) {
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
  function uf(e, t, a) {
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
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && (uf(e, n, l), be = !0);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && uf(e, u, t[u]);
  }
  function Fc(e) {
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
  function si(e) {
    return tg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function ia() {
  }
  var Wc = null;
  function Ic(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Jl = null, kl = null;
  function sf(e) {
    var t = Ql(e);
    if (t && (e = t.stateNode)) {
      var a = e[pt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (kc(
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
              'input[name="' + Lt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[pt] || null;
                if (!n) throw Error(o(90));
                kc(
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
          t = a.value, t != null && Vl(e, !!a.multiple, t, !1);
      }
    }
  }
  var Pc = !1;
  function rf(e, t, a) {
    if (Pc) return e(t, a);
    Pc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Pc = !1, (Jl !== null || kl !== null) && (sc(), Jl && (t = Jl, e = kl, kl = Jl = null, sf(t), e)))
        for (t = 0; t < e.length; t++) sf(e[t]);
    }
  }
  function Jn(e, t) {
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
  var xa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), es = !1;
  if (xa)
    try {
      var kn = {};
      Object.defineProperty(kn, "passive", {
        get: function() {
          es = !0;
        }
      }), window.addEventListener("test", kn, kn), window.removeEventListener("test", kn, kn);
    } catch {
      es = !1;
    }
  var Ba = null, ts = null, ri = null;
  function of() {
    if (ri) return ri;
    var e, t = ts, a = t.length, l, n = "value" in Ba ? Ba.value : Ba.textContent, u = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var s = a - e;
    for (l = 1; l <= s && t[a - l] === n[u - l]; l++) ;
    return ri = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function oi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function fi() {
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
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? fi : ff, this.isPropagationStopped = ff, this;
    }
    return P(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = fi);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = fi);
      },
      persist: function() {
      },
      isPersistent: fi
    }), t;
  }
  var Ya = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, di = vt(Ya), $n = P({}, Ya, { view: 0, detail: 0 }), ag = vt($n), as, ls, Fn, vi = P({}, $n, {
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
    getModifierState: us,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Fn && (Fn && e.type === "mousemove" ? (as = e.screenX - Fn.screenX, ls = e.screenY - Fn.screenY) : ls = as = 0, Fn = e), as);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ls;
    }
  }), df = vt(vi), lg = P({}, vi, { dataTransfer: 0 }), ng = vt(lg), ug = P({}, $n, { relatedTarget: 0 }), ns = vt(ug), ig = P({}, Ya, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cg = vt(ig), sg = P({}, Ya, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rg = vt(sg), og = P({}, Ya, { data: 0 }), vf = vt(og), fg = {
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
  function us() {
    return mg;
  }
  var hg = P({}, $n, {
    key: function(e) {
      if (e.key) {
        var t = fg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = oi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: us,
    charCode: function(e) {
      return e.type === "keypress" ? oi(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? oi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gg = vt(hg), yg = P({}, vi, {
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
  }), mf = vt(yg), _g = P({}, Ya, { submitter: 0 }), pg = vt(_g), Sg = P({}, $n, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: us
  }), bg = vt(Sg), xg = P({}, Ya, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jg = vt(xg), Tg = P({}, vi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ng = vt(Tg), Eg = P({}, Ya, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Ag = vt(Eg), zg = [9, 13, 27, 32], is = xa && "CompositionEvent" in window, Wn = null;
  xa && "documentMode" in document && (Wn = document.documentMode);
  var wg = xa && "TextEvent" in window && !Wn, hf = xa && (!is || Wn && 8 < Wn && 11 >= Wn), gf = " ", yf = !1;
  function _f(e, t) {
    switch (e) {
      case "keyup":
        return zg.indexOf(t.keyCode) !== -1;
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
  function pf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $l = !1;
  function Cg(e, t) {
    switch (e) {
      case "compositionend":
        return pf(t);
      case "keypress":
        return t.which !== 32 ? null : (yf = !0, gf);
      case "textInput":
        return e = t.data, e === gf && yf ? null : e;
      default:
        return null;
    }
  }
  function Dg(e, t) {
    if ($l)
      return e === "compositionend" || !is && _f(e, t) ? (e = of(), ri = ts = Ba = null, $l = !1, e) : null;
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
  var Og = {
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
    return t === "input" ? !!Og[e.type] : t === "textarea";
  }
  function bf(e, t, a, l) {
    Jl ? kl ? kl.push(l) : kl = [l] : Jl = l, t = mc(t, "onChange"), 0 < t.length && (a = new di(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var In = null, Pn = null;
  function Mg(e) {
    sm(e, 0);
  }
  function mi(e) {
    var t = Kn(e);
    if (tf(t)) return e;
  }
  function xf(e, t) {
    if (e === "change") return t;
  }
  var jf = !1;
  if (xa) {
    var cs;
    if (xa) {
      var ss = "oninput" in document;
      if (!ss) {
        var Tf = document.createElement("div");
        Tf.setAttribute("oninput", "return;"), ss = typeof Tf.oninput == "function";
      }
      cs = ss;
    } else cs = !1;
    jf = cs && (!document.documentMode || 9 < document.documentMode);
  }
  function Nf() {
    In && (In.detachEvent("onpropertychange", Ef), Pn = In = null);
  }
  function Ef(e) {
    if (e.propertyName === "value" && mi(Pn)) {
      var t = [];
      bf(
        t,
        Pn,
        e,
        Ic(e)
      ), rf(Mg, t);
    }
  }
  function Rg(e, t, a) {
    e === "focusin" ? (Nf(), In = t, Pn = a, In.attachEvent("onpropertychange", Ef)) : e === "focusout" && Nf();
  }
  function Ug(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return mi(Pn);
  }
  function Hg(e, t) {
    if (e === "click") return mi(t);
  }
  function Lg(e, t) {
    if (e === "input" || e === "change")
      return mi(t);
  }
  function qg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var wt = typeof Object.is == "function" ? Object.is : qg;
  function eu(e, t) {
    if (wt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!Gc.call(t, n) || !wt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function rs(e) {
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
  function zf(e, t) {
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
  function wf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? wf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Cf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = rs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = rs(e.document);
    }
    return t;
  }
  function os(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Bg = xa && "documentMode" in document && 11 >= document.documentMode, Fl = null, fs = null, tu = null, ds = !1;
  function Df(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    ds || Fl == null || Fl !== rs(l) || (l = Fl, "selectionStart" in l && os(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), tu && eu(tu, l) || (tu = l, l = mc(fs, "onSelect"), 0 < l.length && (t = new di(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = Fl)));
  }
  function yl(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var Wl = {
    animationend: yl("Animation", "AnimationEnd"),
    animationiteration: yl("Animation", "AnimationIteration"),
    animationstart: yl("Animation", "AnimationStart"),
    transitionrun: yl("Transition", "TransitionRun"),
    transitionstart: yl("Transition", "TransitionStart"),
    transitioncancel: yl("Transition", "TransitionCancel"),
    transitionend: yl("Transition", "TransitionEnd")
  }, vs = {}, Of = {};
  xa && (Of = document.createElement("div").style, "AnimationEvent" in window || (delete Wl.animationend.animation, delete Wl.animationiteration.animation, delete Wl.animationstart.animation), "TransitionEvent" in window || delete Wl.transitionend.transition);
  function _l(e) {
    if (vs[e]) return vs[e];
    if (!Wl[e]) return e;
    var t = Wl[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Of)
        return vs[e] = t[a];
    return e;
  }
  var Mf = _l("animationend"), Rf = _l("animationiteration"), Uf = _l("animationstart"), Yg = _l("transitionrun"), Gg = _l("transitionstart"), Qg = _l("transitioncancel"), Hf = _l("transitionend"), Lf = /* @__PURE__ */ new Map(), ms = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ms.push("scrollEnd");
  function $t(e, t) {
    Lf.set(e, t), gl(t, [e]);
  }
  var Xg = 0;
  function ja(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = Pt.identifierPrefix;
    var a = Xg++;
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
  function Ta(e, t) {
    return e = qf(e), t = qf(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var hi = typeof reportError == "function" ? reportError : function(e) {
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
  }, qt = [], Il = 0, hs = 0;
  function gi() {
    for (var e = Il, t = hs = Il = 0; t < e; ) {
      var a = qt[t];
      qt[t++] = null;
      var l = qt[t];
      qt[t++] = null;
      var n = qt[t];
      qt[t++] = null;
      var u = qt[t];
      if (qt[t++] = null, l !== null && n !== null) {
        var s = l.pending;
        s === null ? n.next = n : (n.next = s.next, s.next = n), l.pending = n;
      }
      u !== 0 && Bf(a, n, u);
    }
  }
  function yi(e, t, a, l) {
    qt[Il++] = e, qt[Il++] = t, qt[Il++] = a, qt[Il++] = l, hs |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function gs(e, t, a, l) {
    return yi(e, t, a, l), _i(e);
  }
  function pl(e, t) {
    return yi(e, null, null, t), _i(e);
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
    if (50 < ju)
      throw ju = 0, cc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Pl = {};
  function Zg(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function St(e, t, a, l) {
    return new Zg(e, t, a, l);
  }
  function ys(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Na(e, t) {
    var a = e.alternate;
    return a === null ? (a = St(
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
  function pi(e, t, a, l, n, u) {
    var s = 0;
    if (l = e, typeof l == "function") ys(l) && (s = 1);
    else if (typeof l == "string")
      s = _0(
        e,
        a,
        ua.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (l) {
        case ot:
          return e = St(31, a, t, n), e.elementType = ot, e.lanes = u, e;
        case Ce:
          return Sl(a.children, n, u, t);
        case Qe:
          s = 8, n |= 24;
          break;
        case ee:
          return e = St(12, a, t, n | 2), e.elementType = ee, e.lanes = u, e;
        case q:
          return e = St(13, a, t, n), e.elementType = q, e.lanes = u, e;
        case Z:
          return e = St(19, a, t, n), e.elementType = Z, e.lanes = u, e;
        case _a:
        case y:
          return e = n | 32, e = St(30, a, t, e), e.elementType = y, e.lanes = u, e.stateNode = {
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
              case Fe:
                s = 9;
                break e;
              case Q:
                s = 11;
                break e;
              case ie:
                s = 14;
                break e;
              case me:
                s = 16, l = null;
                break e;
            }
          s = 29, a = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = St(s, a, t, n), t.elementType = e, t.type = l, t.lanes = u, t;
  }
  function Sl(e, t, a, l) {
    return e = St(7, e, l, t), e.lanes = a, e;
  }
  function _s(e, t, a) {
    return e = St(6, e, null, t), e.lanes = a, e;
  }
  function Gf(e) {
    var t = St(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ps(e, t, a) {
    return t = St(
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
  function Bt(e, t) {
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
  var en = [], tn = 0, Si = null, au = 0, Yt = [], Gt = 0, Ga = null, ca = 1, sa = "";
  function Ea(e, t) {
    en[tn++] = au, en[tn++] = Si, Si = e, au = t;
  }
  function Xf(e, t, a) {
    Yt[Gt++] = ca, Yt[Gt++] = sa, Yt[Gt++] = Ga, Ga = e;
    var l = ca;
    e = sa;
    var n = 32 - At(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - At(t) + n;
    if (30 < u) {
      var s = n - n % 5;
      u = (l & (1 << s) - 1).toString(32), l >>= s, n -= s, ca = 1 << 32 - At(t) + n | a << n | l, sa = u + e;
    } else
      ca = 1 << u | a << n | l, sa = e;
  }
  function bi(e) {
    e.return !== null && (Ea(e, 1), Xf(e, 1, 0));
  }
  function Ss(e) {
    for (; e === Si; )
      Si = en[--tn], en[tn] = null, au = en[--tn], en[tn] = null;
    for (; e === Ga; )
      Ga = Yt[--Gt], Yt[Gt] = null, sa = Yt[--Gt], Yt[Gt] = null, ca = Yt[--Gt], Yt[Gt] = null;
  }
  function Zf(e, t) {
    Yt[Gt++] = ca, Yt[Gt++] = sa, Yt[Gt++] = Ga, ca = t.id, sa = t.overflow, Ga = e;
  }
  var Ie = null, Oe = null, se = !1, Qa = null, Qt = !1, bs = Error(o(519));
  function Xa(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw lu(Bt(t, e)), bs;
  }
  function Vf(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[at] = e, t[pt] = l, a) {
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
        for (a = 0; a < Nu.length; a++)
          fe(Nu[a], t);
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
        fe("invalid", t), af(
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
        fe("invalid", t), nf(t, l.value, l.defaultValue, l.children);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || dm(t.textContent, a) ? (l.popover != null && (fe("beforetoggle", t), fe("toggle", t)), l.onScroll != null && fe("scroll", t), l.onScrollEnd != null && fe("scrollend", t), l.onClick != null && (t.onclick = ia), t = !0) : t = !1, t || Xa(e, !0);
  }
  function xi(e) {
    for (Ie = e.return; Ie; )
      switch (Ie.tag) {
        case 5:
        case 31:
        case 13:
          Qt = !1;
          return;
        case 27:
        case 3:
          Qt = !0;
          return;
        default:
          Ie = Ie.return;
      }
  }
  function an(e) {
    if (e !== Ie) return !1;
    if (!se) return xi(e), se = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Wr(e.type, e.memoizedProps)), a = !a), a && Oe && Xa(e), xi(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Oe = Dm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Oe = Dm(e);
    } else
      t === 27 ? (t = Oe, ul(e.type) ? (e = io, io = null, Oe = e) : Oe = t) : Oe = Ie ? Zt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function bl() {
    Oe = Ie = null, se = !1;
  }
  function xs() {
    var e = Qa;
    return e !== null && (jt === null ? jt = e : jt.push.apply(
      jt,
      e
    ), Qa = null), e;
  }
  function lu(e) {
    Qa === null ? Qa = [e] : Qa.push(e);
  }
  var js = na(null), xl = null, Aa = null;
  function Za(e, t, a) {
    De(js, t._currentValue), t._currentValue = a;
  }
  function za(e) {
    e._currentValue = js.current, tt(js);
  }
  function ji(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function Ts(e, t, a, l) {
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
              u.lanes |= a, f = u.alternate, f !== null && (f.lanes |= a), ji(
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
        s.lanes |= a, u = s.alternate, u !== null && (u.lanes |= a), ji(s, a, e), s = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= a, s = n.alternate, s !== null && (s.lanes |= a), ji(
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
  function jl(e, t, a, l) {
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
          wt(n.pendingProps.value, s.value) || (e !== null ? e.push(f) : e = [f]);
        }
      } else if (n === Fu.current) {
        if (s = n.alternate, s === null) throw Error(o(387));
        s.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(zn) : e = [zn]);
      }
      n = n.return;
    }
    return e !== null && Ts(
      t,
      e,
      a,
      l
    ), t.flags |= 262144, e !== null;
  }
  function Ti(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!wt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Tl(e) {
    xl = e, Aa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function lt(e) {
    return Kf(xl, e);
  }
  function Ni(e, t) {
    return xl === null && Tl(e), Kf(e, t);
  }
  function Kf(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Aa === null) {
      if (e === null) throw Error(o(308));
      Aa = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Aa = Aa.next = t;
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
  }, Kg = c.unstable_scheduleCallback, Jg = c.unstable_NormalPriority, Xe = {
    $$typeof: He,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ns() {
    return {
      controller: new Vg(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function nu(e) {
    e.refCount--, e.refCount === 0 && Kg(Jg, function() {
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
  var uu = null;
  function kg(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var iu = null, Es = 0, Nl = 0, ln = null;
  function $g(e, t) {
    if (iu === null) {
      var a = iu = [];
      Es = 0, Nl = Qr(), ln = {
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
    if (--Es === 0 && (uu = null, iu !== null)) {
      ln !== null && (ln.status = "fulfilled");
      var e = iu;
      iu = null, Nl = 0, ln = null;
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
  var $f = k.S;
  k.S = function(e, t) {
    if (Gv = Nt(), typeof t == "object" && t !== null && typeof t.then == "function" && $g(e, t), uu !== null)
      for (var a = xn; a !== null; )
        Jf(a, uu), a = a.next;
    if (a = e.types, a !== null) {
      for (var l = xn; l !== null; )
        Jf(l, a), l = l.next;
      if (Nl !== 0) {
        l = uu, l === null && (l = uu = []);
        for (var n = 0; n < a.length; n++) {
          var u = a[n];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    $f !== null && $f(e, t);
  };
  var El = na(null);
  function As() {
    var e = El.current;
    return e !== null ? e : we.pooledCache;
  }
  function Ei(e, t) {
    t === null ? De(El, El.current) : De(El, t.pool);
  }
  function Ff() {
    var e = As();
    return e === null ? null : { parent: Xe._currentValue, pool: e };
  }
  var nn = Error(o(460)), zs = Error(o(474)), Ai = Error(o(542)), zi = { then: function() {
  } };
  function Wf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function If(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(ia, ia), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, ed(e), e === void 0 && !("reason" in t) ? Error(o(600)) : e;
      default:
        if (typeof t.status == "string") t.then(ia, ia);
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
            throw e = t.reason, ed(e), e;
        }
        throw zl = t, nn;
    }
  }
  function Al(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (zl = a, nn) : a;
    }
  }
  var zl = null;
  function Pf() {
    if (zl === null) throw Error(o(459));
    var e = zl;
    return zl = null, e;
  }
  function ed(e) {
    if (e === nn || e === Ai)
      throw Error(o(483));
  }
  var un = null, cu = 0;
  function wi(e) {
    var t = cu;
    return cu += 1, un === null && (un = []), If(un, e, t);
  }
  function Va(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ci(e, t) {
    throw t.$$typeof === ue ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function td(e) {
    function t(S, g) {
      if (e) {
        var x = S.deletions;
        x === null ? (S.deletions = [g], S.flags |= 16) : x.push(g);
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
      return S = Na(S, g), S.index = 0, S.sibling = null, S;
    }
    function u(S, g, x) {
      return S.index = x, e ? (x = S.alternate, x !== null ? (x = x.index, x < g ? (S.flags |= 2, g) : x) : (S.flags |= 134217730, g)) : (S.flags |= 1048576, g);
    }
    function s(S) {
      return e && S.alternate === null && (S.flags |= 134217730), S;
    }
    function f(S, g, x, O) {
      return g === null || g.tag !== 6 ? (g = _s(x, S.mode, O), g.return = S, g) : (g = n(g, x), g.return = S, g);
    }
    function m(S, g, x, O) {
      var V = x.type;
      return V === Ce ? (S = N(
        S,
        g,
        x.props.children,
        O,
        x.key
      ), Va(S, x), S) : g !== null && (g.elementType === V || typeof V == "object" && V !== null && V.$$typeof === me && Al(V) === g.type) ? (g = n(g, x.props), Va(g, x), g.return = S, g) : (g = pi(
        x.type,
        x.key,
        x.props,
        null,
        S.mode,
        O
      ), Va(g, x), g.return = S, g);
    }
    function b(S, g, x, O) {
      return g === null || g.tag !== 4 || g.stateNode.containerInfo !== x.containerInfo || g.stateNode.implementation !== x.implementation ? (g = ps(x, S.mode, O), g.return = S, g) : (g = n(g, x.children || []), g.return = S, g);
    }
    function N(S, g, x, O, V) {
      return g === null || g.tag !== 7 ? (g = Sl(
        x,
        S.mode,
        O,
        V
      ), g.return = S, g) : (g = n(g, x), g.return = S, g);
    }
    function M(S, g, x) {
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return g = _s(
          "" + g,
          S.mode,
          x
        ), g.return = S, g;
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case rt:
            return x = pi(
              g.type,
              g.key,
              g.props,
              null,
              S.mode,
              x
            ), Va(x, g), x.return = S, x;
          case $e:
            return g = ps(
              g,
              S.mode,
              x
            ), g.return = S, g;
          case me:
            return g = Al(g), M(S, g, x);
        }
        if (xe(g) || W(g))
          return g = Sl(
            g,
            S.mode,
            x,
            null
          ), g.return = S, g;
        if (typeof g.then == "function")
          return M(S, wi(g), x);
        if (g.$$typeof === He)
          return M(
            S,
            Ni(S, g),
            x
          );
        Ci(S, g);
      }
      return null;
    }
    function p(S, g, x, O) {
      var V = g !== null ? g.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return V !== null ? null : f(S, g, "" + x, O);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case rt:
            return x.key === V ? m(S, g, x, O) : null;
          case $e:
            return x.key === V ? b(S, g, x, O) : null;
          case me:
            return x = Al(x), p(S, g, x, O);
        }
        if (xe(x) || W(x))
          return V !== null ? null : N(S, g, x, O, null);
        if (typeof x.then == "function")
          return p(
            S,
            g,
            wi(x),
            O
          );
        if (x.$$typeof === He)
          return p(
            S,
            g,
            Ni(S, x),
            O
          );
        Ci(S, x);
      }
      return null;
    }
    function T(S, g, x, O, V) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return S = S.get(x) || null, f(g, S, "" + O, V);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case rt:
            return S = S.get(
              O.key === null ? x : O.key
            ) || null, m(g, S, O, V);
          case $e:
            return S = S.get(
              O.key === null ? x : O.key
            ) || null, b(g, S, O, V);
          case me:
            return O = Al(O), T(
              S,
              g,
              x,
              O,
              V
            );
        }
        if (xe(O) || W(O))
          return S = S.get(x) || null, N(g, S, O, V, null);
        if (typeof O.then == "function")
          return T(
            S,
            g,
            x,
            wi(O),
            V
          );
        if (O.$$typeof === He)
          return T(
            S,
            g,
            x,
            Ni(g, O),
            V
          );
        Ci(g, O);
      }
      return null;
    }
    function Y(S, g, x, O) {
      for (var V = null, ve = null, $ = g, I = g = 0, Ke = null; $ !== null && I < x.length; I++) {
        $.index > I ? (Ke = $, $ = null) : Ke = $.sibling;
        var ge = p(
          S,
          $,
          x[I],
          O
        );
        if (ge === null) {
          $ === null && ($ = Ke);
          break;
        }
        e && $ && ge.alternate === null && t(S, $), g = u(ge, g, I), ve === null ? V = ge : ve.sibling = ge, ve = ge, $ = Ke;
      }
      if (I === x.length)
        return a(S, $), se && Ea(S, I), V;
      if ($ === null) {
        for (; I < x.length; I++)
          $ = M(S, x[I], O), $ !== null && (g = u(
            $,
            g,
            I
          ), ve === null ? V = $ : ve.sibling = $, ve = $);
        return se && Ea(S, I), V;
      }
      for ($ = l($); I < x.length; I++)
        Ke = T(
          $,
          S,
          I,
          x[I],
          O
        ), Ke !== null && (e && (ge = Ke.alternate, ge !== null && $.delete(ge.key === null ? I : ge.key)), g = u(
          Ke,
          g,
          I
        ), ve === null ? V = Ke : ve.sibling = Ke, ve = Ke);
      return e && $.forEach(function(ol) {
        return t(S, ol);
      }), se && Ea(S, I), V;
    }
    function J(S, g, x, O) {
      if (x == null) throw Error(o(151));
      for (var V = null, ve = null, $ = g, I = g = 0, Ke = null, ge = x.next(); $ !== null && !ge.done; I++, ge = x.next()) {
        $.index > I ? (Ke = $, $ = null) : Ke = $.sibling;
        var ol = p(S, $, ge.value, O);
        if (ol === null) {
          $ === null && ($ = Ke);
          break;
        }
        e && $ && ol.alternate === null && t(S, $), g = u(ol, g, I), ve === null ? V = ol : ve.sibling = ol, ve = ol, $ = Ke;
      }
      if (ge.done)
        return a(S, $), se && Ea(S, I), V;
      if ($ === null) {
        for (; !ge.done; I++, ge = x.next())
          ge = M(S, ge.value, O), ge !== null && (g = u(ge, g, I), ve === null ? V = ge : ve.sibling = ge, ve = ge);
        return se && Ea(S, I), V;
      }
      for ($ = l($); !ge.done; I++, ge = x.next())
        ge = T($, S, I, ge.value, O), ge !== null && (e && (Ke = ge.alternate, Ke !== null && $.delete(
          Ke.key === null ? I : Ke.key
        )), g = u(ge, g, I), ve === null ? V = ge : ve.sibling = ge, ve = ge);
      return e && $.forEach(function(C0) {
        return t(S, C0);
      }), se && Ea(S, I), V;
    }
    function ne(S, g, x, O) {
      if (typeof x == "object" && x !== null && x.type === Ce && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case rt:
            e: {
              for (var V = x.key; g !== null; ) {
                if (g.key === V) {
                  if (V = x.type, V === Ce) {
                    if (g.tag === 7) {
                      a(
                        S,
                        g.sibling
                      ), O = n(
                        g,
                        x.props.children
                      ), Va(O, x), O.return = S, S = O;
                      break e;
                    }
                  } else if (g.elementType === V || typeof V == "object" && V !== null && V.$$typeof === me && Al(V) === g.type) {
                    a(
                      S,
                      g.sibling
                    ), O = n(g, x.props), Va(O, x), O.return = S, S = O;
                    break e;
                  }
                  a(S, g);
                  break;
                } else t(S, g);
                g = g.sibling;
              }
              x.type === Ce ? (O = Sl(
                x.props.children,
                S.mode,
                O,
                x.key
              ), Va(O, x), O.return = S, S = O) : (O = pi(
                x.type,
                x.key,
                x.props,
                null,
                S.mode,
                O
              ), Va(O, x), O.return = S, S = O);
            }
            return s(S);
          case $e:
            e: {
              for (V = x.key; g !== null; ) {
                if (g.key === V)
                  if (g.tag === 4 && g.stateNode.containerInfo === x.containerInfo && g.stateNode.implementation === x.implementation) {
                    a(
                      S,
                      g.sibling
                    ), O = n(g, x.children || []), O.return = S, S = O;
                    break e;
                  } else {
                    a(S, g);
                    break;
                  }
                else t(S, g);
                g = g.sibling;
              }
              O = ps(x, S.mode, O), O.return = S, S = O;
            }
            return s(S);
          case me:
            return x = Al(x), ne(
              S,
              g,
              x,
              O
            );
        }
        if (xe(x))
          return Y(
            S,
            g,
            x,
            O
          );
        if (W(x)) {
          if (V = W(x), typeof V != "function") throw Error(o(150));
          return x = V.call(x), J(
            S,
            g,
            x,
            O
          );
        }
        if (typeof x.then == "function")
          return ne(
            S,
            g,
            wi(x),
            O
          );
        if (x.$$typeof === He)
          return ne(
            S,
            g,
            Ni(S, x),
            O
          );
        Ci(S, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, g !== null && g.tag === 6 ? (a(S, g.sibling), O = n(g, x), O.return = S, S = O) : (a(S, g), O = _s(x, S.mode, O), O.return = S, S = O), s(S)) : a(S, g);
    }
    return function(S, g, x, O) {
      try {
        cu = 0;
        var V = ne(
          S,
          g,
          x,
          O
        );
        return un = null, V;
      } catch ($) {
        if ($ === nn || $ === Ai) throw $;
        var ve = St(29, $, null, S.mode);
        return ve.lanes = O, ve.return = S, ve;
      } finally {
      }
    };
  }
  var wl = td(!0), ad = td(!1), Ka = !1;
  function ws(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Cs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ja(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ka(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (je & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = _i(e), Bf(e, null, a), t;
    }
    return yi(e, l, t, a), _i(e);
  }
  function su(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Qo(e, a);
    }
  }
  function Ds(e, t) {
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
  var Os = !1;
  function ru() {
    if (Os) {
      var e = ln;
      if (e !== null) throw e;
    }
  }
  function ou(e, t, a, l) {
    Os = !1;
    var n = e.updateQueue;
    Ka = !1;
    var u = n.firstBaseUpdate, s = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var m = f, b = m.next;
      m.next = null, s === null ? u = b : s.next = b, s = m;
      var N = e.alternate;
      N !== null && (N = N.updateQueue, f = N.lastBaseUpdate, f !== s && (f === null ? N.firstBaseUpdate = b : f.next = b, N.lastBaseUpdate = m));
    }
    if (u !== null) {
      var M = n.baseState;
      s = 0, N = b = m = null, f = u;
      do {
        var p = f.lane & -536870913, T = p !== f.lane;
        if (T ? (de & p) === p : (l & p) === p) {
          p !== 0 && p === Nl && (Os = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          e: {
            var Y = e, J = f;
            p = t;
            var ne = a;
            switch (J.tag) {
              case 1:
                if (Y = J.payload, typeof Y == "function") {
                  M = Y.call(ne, M, p);
                  break e;
                }
                M = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = J.payload, p = typeof Y == "function" ? Y.call(ne, M, p) : Y, p == null) break e;
                M = P({}, M, p);
                break e;
              case 2:
                Ka = !0;
            }
          }
          p = f.callback, p !== null && (e.flags |= 64, T && (e.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [p] : T.push(p));
        } else
          T = {
            lane: p,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, N === null ? (b = N = T, m = M) : N = N.next = T, s |= p;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          T = f, f = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      N === null && (m = M), n.baseState = m, n.firstBaseUpdate = b, n.lastBaseUpdate = N, u === null && (n.shared.lanes = 0), tl |= s, e.lanes = s, e.memoizedState = M;
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
  var $a = na(null), Di = na(0);
  function ud(e, t) {
    e = Ma, De(Di, e), De($a, t), Ma = e | t.baseLanes;
  }
  function Ms() {
    De(Di, Ma), De($a, $a.current);
  }
  function Rs() {
    Ma = Di.current, tt($a), tt(Di);
  }
  var nt = na(null), ft = null;
  function Fa(e) {
    var t = e.alternate;
    De(ut, ut.current & 1), De(nt, e), ft === null && (t === null || $a.current !== null || t.memoizedState !== null) && (ft = e);
  }
  function Us(e) {
    De(ut, ut.current), De(nt, e), ft === null && (ft = e);
  }
  function id(e) {
    e.tag === 22 ? (De(ut, ut.current), De(nt, e), ft === null && (ft = e)) : Wa();
  }
  function Wa() {
    De(ut, ut.current), De(nt, nt.current);
  }
  function Ct(e) {
    tt(nt), ft === e && (ft = null), tt(ut);
  }
  var ut = na(0);
  function fu(e, t) {
    De(nt, nt.current), De(ut, t);
  }
  function Hs(e) {
    tt(ut), tt(nt), ft === e && (ft = null);
  }
  function Oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || no(a) || uo(a)))
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
  var wa = 0, le = null, ze = null, Ze = null, Mi = !1, cn = !1, Cl = !1, Ri = 0, du = 0, sn = null, Wg = 0;
  function qe() {
    throw Error(o(321));
  }
  function Ls(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!wt(e[a], t[a])) return !1;
    return !0;
  }
  function qs(e, t, a, l, n, u) {
    return wa = u, le = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Xd : Zd, Cl = !1, u = a(l, n), Cl = !1, cn && (u = sd(
      t,
      a,
      l,
      n
    )), cd(e), u;
  }
  function cd(e) {
    k.H = Gi;
    var t = ze !== null && ze.next !== null;
    if (wa = 0, Ze = ze = le = null, Mi = !1, du = 0, sn = null, t) throw Error(o(300));
    e === null || Ve || (e = e.dependencies, e !== null && Ti(e) && (Ve = !0));
  }
  function sd(e, t, a, l) {
    le = e;
    var n = 0;
    do {
      if (cn && (sn = null), du = 0, cn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Ze = ze = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      k.H = uy, u = t(a, l);
    } while (cn);
    return u;
  }
  function Ig() {
    var e = k.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? vu(t) : t, e = e.useState()[0], (ze !== null ? ze.memoizedState : null) !== e && (le.flags |= 1024), t;
  }
  function Bs() {
    var e = Ri !== 0;
    return Ri = 0, e;
  }
  function Ys(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Gs(e) {
    if (Mi) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Mi = !1;
    }
    wa = 0, Ze = ze = le = null, cn = !1, du = Ri = 0, sn = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ze === null ? le.memoizedState = Ze = e : Ze = Ze.next = e, Ze;
  }
  function Ge() {
    if (ze === null) {
      var e = le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ze.next;
    var t = Ze === null ? le.memoizedState : Ze.next;
    if (t !== null)
      Ze = t, ze = e;
    else {
      if (e === null)
        throw le.alternate === null ? Error(o(467)) : Error(o(310));
      ze = e, e = {
        memoizedState: ze.memoizedState,
        baseState: ze.baseState,
        baseQueue: ze.baseQueue,
        queue: ze.queue,
        next: null
      }, Ze === null ? le.memoizedState = Ze = e : Ze = Ze.next = e;
    }
    return Ze;
  }
  function Ui() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function vu(e) {
    var t = du;
    return du += 1, sn === null && (sn = []), e = If(sn, e, t), t = le, (Ze === null ? t.memoizedState : Ze.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Xd : Zd), e;
  }
  function Hi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return vu(e);
      if (e.$$typeof === H) return;
      if (e.$$typeof === He) return lt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Qs(e) {
    var t = null, a = le.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = le.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = Ui(), le.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = vl;
    return t.index++, a;
  }
  function Ca(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Li(e) {
    var t = Ge();
    return Xs(t, ze, e);
  }
  function Xs(e, t, a) {
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
      var f = s = null, m = null, b = t, N = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (de & M) === M : (wa & M) === M) {
          var p = b.revertLane;
          if (p === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === Nl && (N = !0);
          else if ((wa & p) === p) {
            b = b.next, p === Nl && (N = !0);
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
            }, m === null ? (f = m = M, s = u) : m = m.next = M, le.lanes |= p, tl |= p;
          M = b.action, Cl && a(u, M), u = b.hasEagerState ? b.eagerState : a(u, M);
        } else
          p = {
            lane: M,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, m === null ? (f = m = p, s = u) : m = m.next = p, le.lanes |= M, tl |= M;
        b = b.next;
      } while (b !== null && b !== t);
      if (m === null ? s = u : m.next = f, !wt(u, e.memoizedState) && (Ve = !0, N && (a = ln, a !== null)))
        throw a;
      e.memoizedState = u, e.baseState = s, e.baseQueue = m, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Zs(e) {
    var t = Ge(), a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, u = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var s = n = n.next;
      do
        u = e(u, s.action), s = s.next;
      while (s !== n);
      wt(u, t.memoizedState) || (Ve = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function rd(e, t, a) {
    var l = le, n = Ge(), u = se;
    if (u) {
      if (a === void 0) throw Error(o(407));
      a = a();
    } else a = t();
    var s = !wt(
      (ze || n).memoizedState,
      a
    );
    if (s && (n.memoizedState = a, Ve = !0), n = n.queue, Js(dd.bind(null, l, n, e), [
      e
    ]), e = n.getSnapshot !== t || s || Ze !== null && (Ze.memoizedState.tag & 1) !== 0, rn(
      e ? 9 : 8,
      { destroy: void 0 },
      fd.bind(null, l, n, a, t),
      null
    ), e) {
      if (l.flags |= 2048, we === null) throw Error(o(349));
      u || (wa & 127) !== 0 || od(l, t, a);
    }
    return a;
  }
  function od(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = le.updateQueue, t === null ? (t = Ui(), le.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
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
      return !wt(e, a);
    } catch {
      return !0;
    }
  }
  function md(e) {
    var t = pl(e, 2);
    t !== null && Tt(t, e, 2);
  }
  function Vs(e) {
    var t = mt();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), Cl) {
        qa(!0);
        try {
          a();
        } finally {
          qa(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ca,
      lastRenderedState: e
    }, t;
  }
  function hd(e, t, a, l) {
    return e.baseState = a, Xs(
      e,
      ze,
      typeof l == "function" ? l : Ca
    );
  }
  function Pg(e, t, a, l, n) {
    if (Yi(e)) throw Error(o(485));
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
        Ks(e, t, b);
      } finally {
        u !== null && s.types !== null && (u.types = s.types), k.T = u;
      }
    } else
      try {
        u = a(n, l), yd(e, t, u);
      } catch (b) {
        Ks(e, t, b);
      }
  }
  function yd(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        _d(e, t, l);
      },
      function(l) {
        return Ks(e, t, l);
      }
    ) : _d(e, t, a);
  }
  function _d(e, t, a) {
    t.status = "fulfilled", t.value = a, pd(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, gd(e, a)));
  }
  function Ks(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, pd(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function pd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Sd(e, t) {
    return t;
  }
  function bd(e, t) {
    if (se) {
      var a = we.formState;
      if (a !== null) {
        e: {
          var l = le;
          if (se) {
            if (Oe) {
              t: {
                for (var n = Oe, u = Qt; n.nodeType !== 8; ) {
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
                Oe = Zt(
                  n.nextSibling
                ), l = n.data === "F!";
                break e;
              }
            }
            Xa(l);
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
      le,
      l
    ), l.dispatch = a, l = Vs(!1), u = Is.bind(
      null,
      le,
      !1,
      l.queue
    ), l = mt(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = Pg.bind(
      null,
      le,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function xd(e) {
    var t = Ge();
    return jd(t, ze, e);
  }
  function jd(e, t, a) {
    if (t = Xs(
      e,
      t,
      Sd
    )[0], e = Li(Ca)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = vu(t);
      } catch (s) {
        throw s === nn ? Ai : s;
      }
    else l = t;
    t = Ge();
    var n = t.queue, u = n.dispatch;
    return a !== t.memoizedState && (le.flags |= 2048, rn(
      9,
      { destroy: void 0 },
      ey.bind(null, n, a),
      null
    )), [l, u, e];
  }
  function ey(e, t) {
    e.action = t;
  }
  function Td(e) {
    var t = Ge(), a = ze;
    if (a !== null)
      return jd(t, a, e);
    Ge(), t = t.memoizedState, a = Ge();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function rn(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = le.updateQueue, t === null && (t = Ui(), le.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Nd() {
    return Ge().memoizedState;
  }
  function qi(e, t, a, l) {
    var n = mt();
    le.flags |= e, n.memoizedState = rn(
      1 | t,
      { destroy: void 0 },
      a,
      l === void 0 ? null : l
    );
  }
  function Bi(e, t, a, l) {
    var n = Ge();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    ze !== null && l !== null && Ls(l, ze.memoizedState.deps) ? n.memoizedState = rn(t, u, a, l) : (le.flags |= e, n.memoizedState = rn(
      1 | t,
      u,
      a,
      l
    ));
  }
  function Ed(e, t) {
    qi(8390656, 8, e, t);
  }
  function Js(e, t) {
    Bi(2048, 8, e, t);
  }
  function ty(e) {
    le.flags |= 4;
    var t = le.updateQueue;
    if (t === null)
      t = Ui(), le.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function Ad(e) {
    var t = Ge().memoizedState;
    return ty({ ref: t, nextImpl: e }), function() {
      if ((je & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function zd(e, t) {
    return Bi(4, 2, e, t);
  }
  function wd(e, t) {
    return Bi(4, 4, e, t);
  }
  function Cd(e, t) {
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
    a = a != null ? a.concat([e]) : null, Bi(4, 4, Cd.bind(null, t, e), a);
  }
  function ks() {
  }
  function Od(e, t) {
    var a = Ge();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Ls(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Md(e, t) {
    var a = Ge();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Ls(t, l[1]))
      return l[0];
    if (l = e(), Cl) {
      qa(!0);
      try {
        e();
      } finally {
        qa(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function $s(e, t, a) {
    return a === void 0 || (wa & 1073741824) !== 0 && (de & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = Xv(), le.lanes |= e, tl |= e, a);
  }
  function Rd(e, t, a, l) {
    return wt(a, t) ? a : $a.current !== null ? (e = $s(e, a, l), wt(e, t) || (Ve = !0), e) : (wa & 106) === 0 || (wa & 1073741824) !== 0 && (de & 261930) === 0 ? (Ve = !0, e.memoizedState = a) : (e = Xv(), le.lanes |= e, tl |= e, t);
  }
  function Ud(e, t, a, l, n) {
    var u = te.p;
    te.p = u !== 0 && 8 > u ? u : 8;
    var s = k.T, f = {};
    f.types = s !== null ? s.types : null, k.T = f, Is(e, !1, t, a);
    try {
      var m = n(), b = k.S;
      if (b !== null && b(f, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var N = Fg(
          m,
          l
        );
        mu(
          e,
          t,
          N,
          Rt(e)
        );
      } else
        mu(
          e,
          t,
          l,
          Rt(e)
        );
    } catch (M) {
      mu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: M },
        Rt()
      );
    } finally {
      te.p = u, s !== null && f.types !== null && (s.types = f.types), k.T = s;
    }
  }
  function ay() {
  }
  function Fs(e, t, a, l) {
    if (e.tag !== 5) throw Error(o(476));
    var n = Hd(e).queue;
    Ud(
      e,
      n,
      t,
      pa,
      a === null ? ay : function() {
        return Ld(e), a(l);
      }
    );
  }
  function Hd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: pa,
      baseState: pa,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ca,
        lastRenderedState: pa
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
        lastRenderedReducer: Ca,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ld(e) {
    var t = Hd(e);
    t.next === null && (t = e.alternate.memoizedState), mu(
      e,
      t.next.queue,
      {},
      Rt()
    );
  }
  function Ws() {
    return lt(zn);
  }
  function qd() {
    return Ge().memoizedState;
  }
  function Bd() {
    return Ge().memoizedState;
  }
  function ly(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = Rt();
          e = Ja(a);
          var l = ka(t, e, a);
          l !== null && (Tt(l, t, a), su(l, t, a)), t = { cache: Ns() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ny(e, t, a) {
    var l = Rt();
    a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(e) ? Gd(t, a) : (a = gs(e, t, a, l), a !== null && (Tt(a, e, l), Qd(a, t, l)));
  }
  function Yd(e, t, a) {
    var l = Rt();
    mu(e, t, a, l);
  }
  function mu(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yi(e)) Gd(t, n);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var s = t.lastRenderedState, f = u(s, a);
          if (n.hasEagerState = !0, n.eagerState = f, wt(f, s))
            return yi(e, t, n, 0), we === null && gi(), !1;
        } catch {
        } finally {
        }
      if (a = gs(e, t, n, l), a !== null)
        return Tt(a, e, l), Qd(a, t, l), !0;
    }
    return !1;
  }
  function Is(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: Qr(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(e)) {
      if (t) throw Error(o(479));
    } else
      t = gs(
        e,
        a,
        l,
        2
      ), t !== null && Tt(t, e, 2);
  }
  function Yi(e) {
    var t = e.alternate;
    return e === le || t !== null && t === le;
  }
  function Gd(e, t) {
    cn = Mi = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Qd(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Qo(e, a);
    }
  }
  var Gi = {
    readContext: lt,
    use: Hi,
    useCallback: qe,
    useContext: qe,
    useEffect: qe,
    useImperativeHandle: qe,
    useLayoutEffect: qe,
    useInsertionEffect: qe,
    useMemo: qe,
    useReducer: qe,
    useRef: qe,
    useState: qe,
    useDebugValue: qe,
    useDeferredValue: qe,
    useTransition: qe,
    useSyncExternalStore: qe,
    useId: qe,
    useHostTransitionStatus: qe,
    useFormState: qe,
    useActionState: qe,
    useOptimistic: qe,
    useMemoCache: qe,
    useCacheRefresh: qe,
    useEffectEvent: qe
  }, Xd = {
    readContext: lt,
    use: Hi,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: lt,
    useEffect: Ed,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, qi(
        4194308,
        4,
        Cd.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return qi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      qi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = mt();
      t = t === void 0 ? null : t;
      var l = e();
      if (Cl) {
        qa(!0);
        try {
          e();
        } finally {
          qa(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = mt();
      if (a !== void 0) {
        var n = a(t);
        if (Cl) {
          qa(!0);
          try {
            a(t);
          } finally {
            qa(!1);
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
        le,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = mt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Vs(e);
      var t = e.queue, a = Yd.bind(null, le, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: ks,
    useDeferredValue: function(e, t) {
      var a = mt();
      return $s(a, e, t);
    },
    useTransition: function() {
      var e = Vs(!1);
      return e = Ud.bind(
        null,
        le,
        e.queue,
        !0,
        !1
      ), mt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = le, n = mt();
      if (se) {
        if (a === void 0)
          throw Error(o(407));
        a = a();
      } else {
        if (a = t(), we === null)
          throw Error(o(349));
        (de & 127) !== 0 || od(l, t, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: t };
      return n.queue = u, Ed(dd.bind(null, l, u, e), [
        e
      ]), l.flags |= 2048, rn(
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
      var e = mt(), t = we.identifierPrefix;
      if (se) {
        var a = sa, l = ca;
        a = (l & ~(1 << 32 - At(l) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = Ri++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Wg++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Ws,
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
      return t.queue = a, t = Is.bind(
        null,
        le,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Qs,
    useCacheRefresh: function() {
      return mt().memoizedState = ly.bind(
        null,
        le
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
  }, Zd = {
    readContext: lt,
    use: Hi,
    useCallback: Od,
    useContext: lt,
    useEffect: Js,
    useImperativeHandle: Dd,
    useInsertionEffect: zd,
    useLayoutEffect: wd,
    useMemo: Md,
    useReducer: Li,
    useRef: Nd,
    useState: function() {
      return Li(Ca);
    },
    useDebugValue: ks,
    useDeferredValue: function(e, t) {
      var a = Ge();
      return Rd(
        a,
        ze.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Li(Ca)[0], t = Ge().memoizedState;
      return [
        typeof e == "boolean" ? e : vu(e),
        t
      ];
    },
    useSyncExternalStore: rd,
    useId: qd,
    useHostTransitionStatus: Ws,
    useFormState: xd,
    useActionState: xd,
    useOptimistic: function(e, t) {
      var a = Ge();
      return hd(a, ze, e, t);
    },
    useMemoCache: Qs,
    useCacheRefresh: Bd,
    useEffectEvent: Ad
  }, uy = {
    readContext: lt,
    use: Hi,
    useCallback: Od,
    useContext: lt,
    useEffect: Js,
    useImperativeHandle: Dd,
    useInsertionEffect: zd,
    useLayoutEffect: wd,
    useMemo: Md,
    useReducer: Zs,
    useRef: Nd,
    useState: function() {
      return Zs(Ca);
    },
    useDebugValue: ks,
    useDeferredValue: function(e, t) {
      var a = Ge();
      return ze === null ? $s(a, e, t) : Rd(
        a,
        ze.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zs(Ca)[0], t = Ge().memoizedState;
      return [
        typeof e == "boolean" ? e : vu(e),
        t
      ];
    },
    useSyncExternalStore: rd,
    useId: qd,
    useHostTransitionStatus: Ws,
    useFormState: Td,
    useActionState: Td,
    useOptimistic: function(e, t) {
      var a = Ge();
      return ze !== null ? hd(a, ze, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Qs,
    useCacheRefresh: Bd,
    useEffectEvent: Ad
  };
  function Ps(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : P({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var er = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = Rt(), n = Ja(l);
      n.payload = t, a != null && (n.callback = a), t = ka(e, n, l), t !== null && (Tt(t, e, l), su(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = Rt(), n = Ja(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = ka(e, n, l), t !== null && (Tt(t, e, l), su(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = Rt(), l = Ja(a);
      l.tag = 2, t != null && (l.callback = t), t = ka(e, l, a), t !== null && (Tt(t, e, a), su(t, e, a));
    }
  };
  function Vd(e, t, a, l, n, u, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, u, s) : t.prototype && t.prototype.isPureReactComponent ? !eu(a, l) || !eu(n, u) : !0;
  }
  function Kd(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && er.enqueueReplaceState(t, t.state, null);
  }
  function Dl(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = P({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  function Jd(e) {
    hi(e);
  }
  function kd(e) {
    console.error(e);
  }
  function $d(e) {
    hi(e);
  }
  function Qi(e, t) {
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
  function tr(e, t, a) {
    return a = Ja(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Qi(e, t);
    }, a;
  }
  function Wd(e) {
    return e = Ja(e), e.tag = 3, e;
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
      Fd(t, a, l), typeof n != "function" && (al === null ? al = /* @__PURE__ */ new Set([this]) : al.add(this));
      var f = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function iy(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && jl(
        t,
        a,
        n,
        !0
      ), a = nt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return ft === null ? rc() : a.alternate === null && Be === 0 && (Be = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Br(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === zi ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), Br(e, l, n)), !1;
        }
        throw Error(o(435, a.tag));
      }
      return Br(e, l, n), rc(), !1;
    }
    if (se)
      return t = nt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== bs && (e = Error(o(422), { cause: l }), lu(Bt(e, a)))) : (l !== bs && (t = Error(o(423), {
        cause: l
      }), lu(
        Bt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Bt(l, a), n = tr(
        e.stateNode,
        l,
        n
      ), Ds(e, n), Be !== 4 && (Be = 2)), !1;
    var u = Error(o(520), { cause: l });
    if (u = Bt(u, a), xu === null ? xu = [u] : xu.push(u), Be !== 4 && (Be = 2), t === null) return !0;
    l = Bt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = tr(a.stateNode, l, e), Ds(a, e), !1;
        case 1:
          if (t = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (al === null || !al.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = Wd(n), Id(
              n,
              e,
              a,
              l
            ), Ds(a, n), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ar = Error(o(461)), Ve = !1;
  function ke(e, t, a, l) {
    t.child = e === null ? ad(t, null, a, l) : wl(
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
    return Tl(t), l = qs(
      e,
      t,
      a,
      s,
      u,
      n
    ), f = Bs(), e !== null && !Ve ? (Ys(e, t, n), Da(e, t, n)) : (se && f && bi(t), t.flags |= 1, ke(e, t, l, n), t.child);
  }
  function ev(e, t, a, l, n) {
    if (e === null) {
      var u = a.type;
      return typeof u == "function" && !ys(u) && u.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = u, tv(
        e,
        t,
        u,
        l,
        n
      )) : (e = pi(
        a.type,
        null,
        l,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !or(e, n)) {
      var s = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : eu, a(s, l) && e.ref === t.ref)
        return Da(e, t, n);
    }
    return t.flags |= 1, e = Na(u, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function tv(e, t, a, l, n) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (eu(u, l) && e.ref === t.ref)
        if (Ve = !1, t.pendingProps = l = u, or(e, n))
          (e.flags & 131072) !== 0 && (Ve = !0);
        else
          return t.lanes = e.lanes, Da(e, t, n);
    }
    return lr(
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
        ), u !== null ? ud(t, u) : Ms(), id(t);
      else
        return l = t.lanes = 536870912, lv(
          e,
          t,
          u !== null ? u.baseLanes | a : a,
          a,
          l
        );
    } else
      u !== null ? (Ei(t, u.cachePool), ud(t, u), Wa(), t.memoizedState = null) : (e !== null && Ei(t, null), Ms(), Wa());
    return ke(e, t, n, a), t.child;
  }
  function hu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function lv(e, t, a, l, n) {
    var u = As();
    return u = u === null ? null : { parent: Xe._currentValue, pool: u }, t.memoizedState = {
      baseLanes: a,
      cachePool: u
    }, e !== null && Ei(t, null), Ms(), id(t), e !== null && jl(e, t, l, !0), t.childLanes = n, null;
  }
  function Xi(e, t) {
    return t = Zi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function nv(e, t, a) {
    return wl(t, e.child, null, a), e = Xi(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function cy(e, t, a) {
    var l = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (se) {
        if (l.mode === "hidden")
          return e = Xi(t, l), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, hu(null, e);
        if (Us(t), (e = Oe) ? (e = Cm(
          e,
          Qt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ca, overflow: sa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Gf(e), a.return = t, t.child = a, Ie = t, Oe = null)) : e = null, e === null) throw Xa(t);
        return t.lanes = 536870912, null;
      }
      return Xi(t, l);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var s = u.dehydrated;
      if (Us(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = nv(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Ve || jl(e, t, a, !1), n = (a & e.childLanes) !== 0, Ve || n) {
        if ($a.current === null) {
          if (l = we, l !== null && (s = Xo(l, a), s !== 0 && s !== u.retryLane))
            throw u.retryLane = s, pl(e, s), Tt(l, e, s), ar;
          rc();
        }
        t = nv(
          e,
          t,
          a
        );
      } else
        e = u.treeContext, Oe = Zt(s.nextSibling), Ie = t, se = !0, Qa = null, Qt = !1, e !== null && Zf(t, e), t = Xi(t, l), t.flags |= 134221824;
      return t;
    }
    return e = Na(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function on(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(o(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function lr(e, t, a, l, n) {
    return Tl(t), a = qs(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Bs(), e !== null && !Ve ? (Ys(e, t, n), Da(e, t, n)) : (se && l && bi(t), t.flags |= 1, ke(e, t, a, n), t.child);
  }
  function uv(e, t, a, l, n, u) {
    return Tl(t), t.updateQueue = null, a = sd(
      t,
      l,
      a,
      n
    ), cd(e), l = Bs(), e !== null && !Ve ? (Ys(e, t, u), Da(e, t, u)) : (se && l && bi(t), t.flags |= 1, ke(e, t, a, u), t.child);
  }
  function iv(e, t, a, l, n) {
    if (Tl(t), t.stateNode === null) {
      var u = Pl, s = a.contextType;
      typeof s == "object" && s !== null && (u = lt(s)), u = new a(l, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = er, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = l, u.state = t.memoizedState, u.refs = {}, ws(t), s = a.contextType, u.context = typeof s == "object" && s !== null ? lt(s) : Pl, u.state = t.memoizedState, s = a.getDerivedStateFromProps, typeof s == "function" && (Ps(
        t,
        a,
        s,
        l
      ), u.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (s = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), s !== u.state && er.enqueueReplaceState(u, u.state, null), ou(t, l, u, n), ru(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      u = t.stateNode;
      var f = t.memoizedProps, m = Dl(a, f);
      u.props = m;
      var b = u.context, N = a.contextType;
      s = Pl, typeof N == "object" && N !== null && (s = lt(N));
      var M = a.getDerivedStateFromProps;
      N = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, N || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== s) && Kd(
        t,
        u,
        l,
        s
      ), Ka = !1;
      var p = t.memoizedState;
      u.state = p, ou(t, l, u, n), ru(), b = t.memoizedState, f || p !== b || Ka ? (typeof M == "function" && (Ps(
        t,
        a,
        M,
        l
      ), b = t.memoizedState), (m = Ka || Vd(
        t,
        a,
        m,
        l,
        p,
        b,
        s
      )) ? (N || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = b), u.props = l, u.state = b, u.context = s, l = m) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      u = t.stateNode, Cs(e, t), s = t.memoizedProps, N = Dl(a, s), u.props = N, M = t.pendingProps, p = u.context, b = a.contextType, m = Pl, typeof b == "object" && b !== null && (m = lt(b)), f = a.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s !== M || p !== m) && Kd(
        t,
        u,
        l,
        m
      ), Ka = !1, p = t.memoizedState, u.state = p, ou(t, l, u, n), ru();
      var T = t.memoizedState;
      s !== M || p !== T || Ka || e !== null && e.dependencies !== null && Ti(e.dependencies) ? (typeof f == "function" && (Ps(
        t,
        a,
        f,
        l
      ), T = t.memoizedState), (N = Ka || Vd(
        t,
        a,
        N,
        l,
        p,
        T,
        m
      ) || e !== null && e.dependencies !== null && Ti(e.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, T, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        T,
        m
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = T), u.props = l, u.state = T, u.context = m, l = N) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return u = l, on(e, t), l = (t.flags & 128) !== 0, u || l ? (u = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && l ? (t.child = wl(
      t,
      e.child,
      null,
      n
    ), t.child = wl(
      t,
      null,
      a,
      n
    )) : ke(e, t, a, n), t.memoizedState = u.state, e = t.child) : e = Da(
      e,
      t,
      n
    ), e;
  }
  function cv(e, t, a, l) {
    return bl(), t.flags |= 256, ke(e, t, a, l), t.child;
  }
  var nr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ur(e) {
    return { baseLanes: e, cachePool: Ff() };
  }
  function ir(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= Mt), e;
  }
  function sv(e, t, a) {
    var l = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, s;
    if ((s = u) || (s = e !== null && e.memoizedState === null ? !1 : (ut.current & 2) !== 0), s && (n = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (se) {
        if (n ? Fa(t) : Wa(), (e = Oe) ? (e = Cm(
          e,
          Qt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ga !== null ? { id: ca, overflow: sa } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Gf(e), a.return = t, t.child = a, Ie = t, Oe = null)) : e = null, e === null) throw Xa(t);
        return uo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, n ? (Wa(), n = t.mode, u = Zi(
        { mode: "hidden", children: u },
        n
      ), l = Sl(
        l,
        n,
        a,
        null
      ), u.return = t, l.return = t, u.sibling = l, t.child = u, l = t.child, l.memoizedState = ur(a), l.childLanes = ir(
        e,
        s,
        a
      ), t.memoizedState = nr, hu(null, l)) : (Fa(t), cr(t, u));
    }
    var f = e.memoizedState;
    if (f !== null) {
      var m = f.dehydrated;
      if (m !== null)
        return sy(
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
    return n ? (Wa(), n = l.fallback, u = t.mode, f = e.child, m = f.sibling, l = Na(f, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = f.subtreeFlags & 1206910976, m !== null ? n = Na(m, n) : (n = Sl(
      n,
      u,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, hu(null, l), l = t.child, n = e.child.memoizedState, n === null ? n = ur(a) : (u = n.cachePool, u !== null ? (f = Xe._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Ff(), n = {
      baseLanes: n.baseLanes | a,
      cachePool: u
    }), l.memoizedState = n, l.childLanes = ir(
      e,
      s,
      a
    ), t.memoizedState = nr, hu(e.child, l)) : (Fa(t), a = e.child, e = a.sibling, a = Na(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function cr(e, t) {
    return t = Zi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Zi(e, t) {
    return e = St(22, e, null, t), e.lanes = 0, e;
  }
  function Vi(e, t, a) {
    return wl(t, e.child, null, a), e = cr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function sy(e, t, a, l, n, u, s, f) {
    if (a)
      return t.flags & 256 ? (Fa(t), t.flags &= -257, Vi(
        e,
        t,
        f
      )) : t.memoizedState !== null ? (Wa(), t.child = e.child, t.flags |= 128, null) : (Wa(), u = n.fallback, s = t.mode, n = Zi(
        { mode: "visible", children: n.children },
        s
      ), u = Sl(
        u,
        s,
        f,
        null
      ), u.flags |= 2, n.return = t, u.return = t, n.sibling = u, t.child = n, wl(t, e.child, null, f), n = t.child, n.memoizedState = ur(f), n.childLanes = ir(
        e,
        l,
        f
      ), t.memoizedState = nr, hu(null, n));
    if (Fa(t), uo(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var m = l.dgst;
      return l = m, l !== "" && (n = Error(o(419)), n.stack = "", n.digest = l, lu({ value: n, source: null, stack: null })), Vi(
        e,
        t,
        f
      );
    }
    if (Ve || jl(e, t, f, !1), l = (f & e.childLanes) !== 0, Ve || l) {
      if ($a.current !== null)
        return Vi(
          e,
          t,
          f
        );
      if (l = we, l !== null && (n = Xo(
        l,
        f
      ), n !== 0 && n !== s.retryLane))
        throw s.retryLane = n, pl(e, n), Tt(l, e, n), ar;
      return no(u) || rc(), Vi(
        e,
        t,
        f
      );
    }
    return no(u) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Oe = Zt(u.nextSibling), Ie = t, se = !0, Qa = null, Qt = !1, e !== null && Zf(t, e), t = cr(
      t,
      n.children
    ), t.flags |= 134221824, t);
  }
  function rv(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), ji(e.return, t, a);
  }
  function ov(e) {
    for (var t = null; e !== null; ) {
      var a = e.alternate;
      a !== null && Oi(a) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function Ki(e, t, a, l, n, u) {
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
  function sr(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var a = t.sibling;
      t.sibling = e.child, e.child = t, t = a;
    }
  }
  function rr(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, u = l.tail;
    l = l.children;
    var s = ut.current;
    if (t.flags & 128)
      return fu(t, s), null;
    var f = (s & 2) !== 0;
    if (f ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, fu(t, s), n === "backwards" && e !== null ? (sr(e), ke(e, t, l, a), sr(e)) : ke(e, t, l, a), l = se ? au : 0, !f && e !== null && (e.flags & 128) !== 0)
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
        a = ov(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null, sr(t)), Ki(
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
        Ki(
          t,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "together":
        Ki(
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
        a = ov(t.child), a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), Ki(
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
    return Za(t, t.type, l.value), ke(e, t, l.children, a), t.child;
  }
  function Da(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), tl |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (jl(
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
      for (e = t.child, a = Na(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Na(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function or(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ti(e)));
  }
  function ry(e, t, a) {
    switch (t.tag) {
      case 3:
        Wu(t, t.stateNode.containerInfo), Za(t, Xe, e.memoizedState.cache), bl();
        break;
      case 27:
      case 5:
        Lc(t);
        break;
      case 4:
        Wu(t, t.stateNode.containerInfo);
        break;
      case 10:
        Za(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Us(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return Fa(t), t.flags |= 128, null;
          l = jl(
            e,
            t,
            a,
            !1
          );
          var n = t.child.childLanes;
          return l || (a & n) !== 0 ? sv(e, t, a) : (Fa(t), e = Da(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        }
        Fa(t);
        break;
      case 19:
        if (t.flags & 128)
          return rr(
            e,
            t,
            a
          );
        if (n = (e.flags & 128) !== 0, l = (a & t.childLanes) !== 0, l || (jl(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return rr(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), fu(t, ut.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, av(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        Za(t, Xe, e.memoizedState.cache);
    }
    return Da(e, t, a);
  }
  function dv(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ve = !0;
      else {
        if (!or(e, a) && (t.flags & 128) === 0)
          return Ve = !1, ry(
            e,
            t,
            a
          );
        Ve = (e.flags & 131072) !== 0;
      }
    else
      Ve = !1, se && (t.flags & 1048576) !== 0 && Xf(t, au, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Al(t.elementType), t.type = e, typeof e == "function")
            ys(e) ? (l = Dl(e, l), t.tag = 1, t = iv(
              null,
              t,
              e,
              l,
              a
            )) : (t.tag = 0, t = lr(
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
                t.tag = 11, t = Pd(
                  null,
                  t,
                  e,
                  l,
                  a
                );
                break e;
              } else if (n === ie) {
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
        return lr(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = Dl(
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
          if (Wu(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          l = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Cs(e, t), ou(t, l, null, a);
          var s = t.memoizedState;
          if (l = s.cache, Za(t, Xe, l), l !== u.cache && Ts(
            t,
            [Xe],
            a,
            !0
          ), ru(), l = s.element, u.isDehydrated)
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
              n = Bt(
                Error(o(424)),
                t
              ), lu(n), t = cv(
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
              for (Oe = Zt(e.firstChild), Ie = t, se = !0, Qa = null, Qt = !0, a = ad(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
            }
          else {
            if (bl(), l === n) {
              t = Da(
                e,
                t,
                a
              );
              break e;
            }
            ke(e, t, l, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return on(e, t), e === null ? (a = Lm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : se || (t.stateNode = gm(
          t.type,
          t.pendingProps,
          Ha.current,
          t
        )) : t.memoizedState = Lm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Lc(t), e === null && se && (l = t.stateNode = Mm(
          t.type,
          t.pendingProps,
          Ha.current
        ), Ie = t, Qt = !0, n = Oe, ul(t.type) ? (io = n, Oe = Zt(l.firstChild)) : Oe = n), ke(
          e,
          t,
          t.pendingProps.children,
          a
        ), on(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && se && ((n = l = Oe) && (l = l0(
          l,
          t.type,
          t.pendingProps,
          Qt
        ), l !== null ? (t.stateNode = l, Ie = t, Oe = Zt(l.firstChild), Qt = !1, n = !0) : n = !1), n || Xa(t)), Lc(t), n = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = u.children, Wr(n, u) ? l = null : s !== null && Wr(n, s) && (t.flags |= 32), t.memoizedState !== null && (n = qs(
          e,
          t,
          Ig,
          null,
          null,
          a
        ), zn._currentValue = n), on(e, t), ke(e, t, l, a), t.child;
      case 6:
        return e === null && se && ((e = a = Oe) && (a = n0(
          a,
          t.pendingProps,
          Qt
        ), a !== null ? (t.stateNode = a, Ie = t, Oe = null, e = !0) : e = !1), e || Xa(t)), null;
      case 13:
        return sv(e, t, a);
      case 4:
        return Wu(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = wl(
          t,
          null,
          l,
          a
        ) : ke(e, t, l, a), t.child;
      case 11:
        return Pd(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return l = t.pendingProps, on(e, t), ke(e, t, l, a), t.child;
      case 8:
        return ke(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return ke(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return fv(e, t, a);
      case 9:
        return n = t.type._context, l = t.pendingProps.children, Tl(t), n = lt(n), l = l(n), t.flags |= 1, ke(e, t, l, a), t.child;
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
        return rr(e, t, a);
      case 31:
        return cy(e, t, a);
      case 22:
        return av(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Tl(t), l = lt(Xe), e === null ? (n = As(), n === null && (n = we, u = Ns(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), t.memoizedState = { parent: l, cache: n }, ws(t), Za(t, Xe, n)) : ((e.lanes & a) !== 0 && (Cs(e, t), ou(t, null, null, a), ru()), n = e.memoizedState, u = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Za(t, Xe, l)) : (l = u.cache, Za(t, Xe, l), l !== n.cache && Ts(
          t,
          [Xe],
          a,
          !0
        ))), ke(
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
        }), l = t.pendingProps, l.name != null && l.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : se && bi(t), e !== null && e.memoizedProps.name !== l.name ? t.flags |= 4194816 : on(e, t), ke(e, t, l.children, a), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Oa(e) {
    e.flags |= 4;
  }
  function fr(e, t, a, l, n) {
    var u;
    if ((u = (e.mode & 32) !== 0) && (u = a === null ? Gm(t, l) : Gm(t, l) && (l.src !== a.src || l.srcSet !== a.srcSet)), u) {
      if (e.flags |= 16777216, (n & 335544128) === n)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Jv()) e.flags |= 8192;
        else
          throw zl = zi, zs;
    } else e.flags &= -16777217;
  }
  function vv(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Qm(t))
      if (Jv()) e.flags |= 8192;
      else
        throw zl = zi, zs;
  }
  function Ji(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Yo() : 536870912, e.lanes |= t, hn |= t);
  }
  function gu(e, t) {
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
  function Me(e) {
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
    switch (Ss(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Me(t), null;
      case 1:
        return Me(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), za(Xe), Yl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (an(t) ? Oa(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, xs())), Me(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return e === null ? (Oa(t), u !== null ? (Me(t), vv(t, u)) : (Me(t), fr(
          t,
          n,
          null,
          l,
          a
        ))) : u ? u !== e.memoizedState ? (Oa(t), Me(t), vv(t, u)) : (Me(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && Oa(t), Me(t), fr(
          t,
          n,
          e,
          l,
          a
        )), null;
      case 27:
        if (Iu(t), a = Ha.current, n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Me(t), t.subtreeFlags &= -33554433, null;
          }
          e = ua.current, an(t) ? Vf(t) : (e = Mm(n, l, a), t.stateNode = e, Oa(t));
        }
        return Me(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Iu(t), n = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && Oa(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Me(t), t.subtreeFlags &= -33554433, null;
          }
          if (u = ua.current, an(t))
            Vf(t);
          else {
            var s = Au(
              Ha.current
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
            u[at] = t, u[pt] = l;
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
        return Me(t), t.subtreeFlags &= -33554433, fr(
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
          if (e = Ha.current, an(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = Ie, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[at] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || dm(e.nodeValue, a)), e || Xa(t, !0);
          } else
            e = Au(e).createTextNode(
              l
            ), e[at] = t, t.stateNode = e;
        }
        return Me(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = an(t), a !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[at] = t;
            } else
              bl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Me(t), e = !1;
          } else
            a = xs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Me(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = an(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[at] = t;
            } else
              bl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Me(t), n = !1;
          } else
            n = xs(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = l !== null, e = e !== null && e.memoizedState !== null, a && (l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), Ji(t, t.updateQueue), Me(t), null);
      case 4:
        return Yl(), e === null && Kr(t.stateNode.containerInfo), t.flags |= 67108864, Me(t), null;
      case 10:
        return za(t.type), Me(t), null;
      case 19:
        if (Hs(t), l = t.memoizedState, l === null) return Me(t), null;
        if (n = (t.flags & 128) !== 0, u = l.rendering, u === null)
          if (n) gu(l, !1);
          else {
            if (Be !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Oi(e), u !== null) {
                  for (t.flags |= 128, gu(l, !1), e = u.updateQueue, t.updateQueue = e, Ji(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    Yf(a, e), a = a.sibling;
                  return fu(
                    t,
                    ut.current & 1 | 2
                  ), se && Ea(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && Nt() > uc && (t.flags |= 128, n = !0, gu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (e = Oi(u), e !== null) {
              if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Ji(t, e), gu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !se)
                return Me(t), null;
            } else
              2 * Nt() - l.renderingStartTime > uc && a !== 536870912 && (t.flags |= 128, n = !0, gu(l, !1), t.lanes = 4194304);
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
          return l.rendering = e, l.tail = e.sibling, l.renderingStartTime = Nt(), e.sibling = null, u = ut.current, u = n ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !a || se ? fu(t, u) : (a = u, De(nt, t), De(ut, a), ft === null && (ft = t)), se && Ea(t, l.treeForkCount), e;
        }
        return Me(t), null;
      case 22:
      case 23:
        return Ct(t), Rs(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Me(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Me(t), a = t.updateQueue, a !== null && Ji(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && tt(El), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), za(Xe), Me(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Me(t), null;
    }
    throw Error(o(156, t.tag));
  }
  function fy(e, t) {
    switch (Ss(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return za(Xe), Yl(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Iu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(o(340));
          bl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          bl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Hs(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return Yl(), null;
      case 10:
        return za(t.type), null;
      case 22:
      case 23:
        return Ct(t), Rs(), e !== null && tt(El), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return za(Xe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function mv(e, t) {
    switch (Ss(t), t.tag) {
      case 3:
        za(Xe), Yl();
        break;
      case 26:
      case 27:
      case 5:
        Iu(t);
        break;
      case 4:
        Yl();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        Hs(t);
        break;
      case 10:
        za(t.type);
        break;
      case 22:
      case 23:
        Ct(t), Rs(), e !== null && tt(El);
        break;
      case 24:
        za(Xe);
    }
  }
  function yu(e, t) {
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
  function Ia(e, t, a) {
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
              } catch (N) {
                Ee(
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
      Ee(t, t.return, N);
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
    a.props = Dl(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      Ee(e, t, l);
    }
  }
  function ra(e, t) {
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
            var n = e.stateNode, u = ja(e.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = jm(u)), l = n.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var s = new Ut(e);
              _(
                e.child,
                !1,
                t0,
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
  function it(e, t) {
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
  function ki(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var a = 0; a < t.length; a++)
        wm(
          e.stateNode,
          t[a]
        );
  }
  function yv(e) {
    for (var t = e.return; t !== null && (vr(t) && wm(e.stateNode, t.stateNode), !dr(t)); )
      t = t.return;
  }
  function _u(e) {
    for (var t = e.return; t !== null && (vr(t) && a0(e.stateNode, t.stateNode), !dr(t)); )
      t = t.return;
  }
  function dr(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function vr(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function mr(e) {
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
  function hr(e, t, a) {
    try {
      var l = e.stateNode;
      Ly(l, e.type, a, t), l[pt] = t;
    } catch (n) {
      Ee(e, e.return, n);
    }
  }
  function _v(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ul(e.type) || e.tag === 4;
  }
  function gr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || _v(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ul(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function yr(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(n, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(n), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = ia)), ki(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (ki(e, l), l = null, ul(e.type) && (a = e.stateNode, t = null)), e = e.child, e !== null))
      for (yr(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        yr(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function $i(e, t, a, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      n = e.stateNode, t ? a.insertBefore(n, t) : a.appendChild(n), ki(e, l), be = !0;
    else if (n !== 4 && (n === 27 && (ki(e, l), l = null, ul(e.type) && (a = e.stateNode)), e = e.child, e !== null))
      for ($i(
        e,
        t,
        a,
        l
      ), e = e.sibling; e !== null; )
        $i(
          e,
          t,
          a,
          l
        ), e = e.sibling;
  }
  function pv(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      ct(t, l, a), t[at] = e, t[pt] = a;
    } catch (u) {
      Ee(e, e.return, u);
    }
  }
  var Fi = !1, Dt = null;
  function Sv(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Fi = !0);
  }
  var oa = null;
  function bv() {
    var e = oa;
    return oa = null, e;
  }
  var bt = 0;
  function fn(e, t, a, l, n) {
    return bt = 0, xv(
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
          var f = eo(s);
          l.push(f), f.view && (u = !0);
        } else
          u || eo(s).view && (u = !0);
        Fi = !0, bm(
          s,
          bt === 0 ? t : t + "_" + bt,
          a
        ), bt++;
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
  function fa(e, t) {
    for (; e !== null; )
      e.tag === 5 ? xm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || fa(
        e.child,
        t
      )), e = e.sibling;
  }
  function Wi(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Wi(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(o(544));
          var a = t.name;
          t = Ta(t.default, t.share), t !== "none" && (fn(
            e,
            a,
            t,
            null,
            !1
          ) || fa(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function _r(e, t) {
    if (e.tag === 30) {
      var a = e.stateNode, l = e.memoizedProps, n = ja(l, a), u = Ta(
        l.default,
        a.paired ? l.share : l.enter
      );
      u !== "none" ? fn(e, n, u, null, !1) ? (Wi(e), a.paired || t || pn(e, l.onEnter)) : fa(e.child, !1) : Wi(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        _r(e, t), e = e.sibling;
    else Wi(e);
  }
  function pr(e) {
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
                  var u = Ta(
                    a.default,
                    a.share
                  );
                  if (u !== "none" && (fn(
                    e,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = e.stateNode, n.paired = u, u.paired = n, pn(e, a.onShare)) : fa(e.child, !1)), t.delete(l), t.size === 0) break;
                }
              }
            }
            pr(e);
          }
          e = e.sibling;
        }
    }
  }
  function Sr(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, a = ja(t, e.stateNode), l = Dt !== null ? Dt.get(a) : void 0, n = Ta(
        t.default,
        l !== void 0 ? t.share : t.exit
      );
      n !== "none" && (fn(e, a, n, null, !1) ? l !== void 0 ? (n = e.stateNode, l.paired = n, n.paired = l, Dt.delete(a), pn(e, t.onShare)) : pn(e, t.onExit) : fa(e.child, !1)), Dt !== null && pr(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Sr(e), e = e.sibling;
    else
      Dt !== null && pr(e);
  }
  function jv(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, a = ja(t, e.stateNode);
        t = Ta(t.default, t.update), e.flags &= -5, t !== "none" && fn(
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
  function br(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, fa(e.child, !1));
          }
          br(e);
        }
        e = e.sibling;
      }
  }
  function Ii(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, fa(e.child, !1), br(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Ii(e), e = e.sibling;
    else br(e);
  }
  function Tv(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? fa(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Tv(e), e = e.sibling;
  }
  function xr(e, t, a, l, n, u, s) {
    for (var f = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (u !== null && bt < u.length) {
          var b = u[bt], N = eo(m);
          (b.view || N.view) && (f = !0);
          var M;
          if (M = (e.flags & 4) === 0)
            if (N.clip) M = !0;
            else {
              M = b.rect;
              var p = N.rect;
              M = M.y !== p.y || M.x !== p.x || M.height !== p.height || M.width !== p.width;
            }
          M && (e.flags |= 4), N.abs ? N = !b.abs : (b = b.rect, N = N.rect, N = b.height !== N.height || b.width !== N.width), N && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && bm(
          m,
          bt === 0 ? a : a + "_" + bt,
          n
        ), f && (e.flags & 4) !== 0 || (oa === null && (oa = []), oa.push(
          m,
          bt === 0 ? l : l + "_" + bt,
          t.memoizedProps
        )), bt++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s ? e.flags |= t.flags & 32 : xr(
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
        var a = e.memoizedProps, l = e.stateNode, n = ja(a, l), u = Ta(a.default, a.update), s;
        s = e.memoizedState, e.memoizedState = null, l = e;
        var f = e.child;
        bt = 0, n = xr(
          l,
          f,
          n,
          n,
          u,
          s,
          !1
        ), (e.flags & 4) !== 0 && n && pn(e, a.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Nv(e);
      e = e.sibling;
    }
  }
  var Pe = !1, Te = !1, da = !1, jr = !1, Ev = typeof WeakSet == "function" ? WeakSet : Set, et = null, va = !1, pu = !1, Pi = !1, Tr = !1;
  function dy(e, t, a) {
    if (e = e.containerInfo, $r = wn, e = Cf(e), os(e)) {
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
            var f = 0, m = -1, b = -1, N = 0, M = 0, p = e, T = null;
            t: for (; ; ) {
              for (var Y; p !== l || u !== 0 && p.nodeType !== 3 || (m = f + u), p !== s || n !== 0 && p.nodeType !== 3 || (b = f + n), p.nodeType === 3 && (f += p.nodeValue.length), (Y = p.firstChild) !== null; )
                T = p, p = Y;
              for (; ; ) {
                if (p === e) break t;
                if (T === l && ++N === u && (m = f), T === s && ++M === n && (b = f), (Y = p.nextSibling) !== null) break;
                p = T, T = p.parentNode;
              }
              p = Y;
            }
            l = m === -1 || b === -1 ? null : { start: m, end: b };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Fr = { focusedElem: e, selectionRange: l }, wn = !1, a = (a & 335544064) === a, et = t, t = a ? 9270 : 1024; et !== null; ) {
      if (e = et, a && (l = e.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          a && Sr(l[u]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        a && Sv(e), ec(a);
      else {
        if (e.tag === 22) {
          if (l = e.alternate, e.memoizedState !== null) {
            l !== null && l.memoizedState === null && a && Sr(l), ec(a);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            a && Sv(e), ec(a);
            continue;
          }
        }
        l = e.child, (e.subtreeFlags & t) !== 0 && l !== null ? (l.return = e, et = l) : (a && jv(e), ec(a));
      }
    }
    Dt = null;
  }
  function ec(e) {
    for (; et !== null; ) {
      var t = et, a = e, l = t.alternate, n = t.flags;
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
              var s = Dl(
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
              lo(l);
            else if (a === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  lo(l);
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
          a && l !== null && (a = ja(
            l.memoizedProps,
            l.stateNode
          ), n = t.memoizedProps, n = Ta(n.default, n.update), n !== "none" && fn(
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
        l.return = t.return, et = l;
        break;
      }
      et = t.return;
    }
  }
  function Av(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ma(e, a), l & 4 && yu(5, a);
        break;
      case 1:
        if (ma(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              Ee(a, a.return, s);
            }
          else {
            var n = Dl(
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
        l & 64 && hv(a), l & 512 && ra(a, a.return);
        break;
      case 3:
        if (ma(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
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
        t === null && l & 4 && pv(a);
      case 26:
      case 5:
        ma(e, a), t === null && l & 4 && mr(a), l & 512 && ra(a, a.return);
        break;
      case 12:
        ma(e, a);
        break;
      case 31:
        ma(e, a), l & 4 && Dv(e, a);
        break;
      case 13:
        ma(e, a), l & 4 && Ov(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Ty.bind(
          null,
          a
        ), u0(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || Pe, !l) {
          var u = t !== null && t.memoizedState !== null || Te;
          t = Pe, n = Te, Pe = l, (Te = u) && !n ? (l = 2, (a.subtreeFlags & 8772) !== 0 && (l |= 1), It(
            e,
            a,
            l
          )) : ma(e, a), Pe = t, Te = n;
        }
        break;
      case 30:
        ma(e, a), l & 512 && ra(a, a.return);
        break;
      case 7:
        l & 512 && ra(a, a.return);
      default:
        ma(e, a);
    }
  }
  function Nr(e, t) {
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
        e.memoizedState === null && Nr(e, t);
        break;
      default:
        Nr(e, t);
    }
  }
  function Er(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var a = e, l = t;
          switch (a.tag) {
            case 4:
              zv(a, l);
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
  function wv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ui(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Re = null, xt = !1;
  function Ft(e, t, a) {
    for (a = a.child; a !== null; )
      Cv(e, t, a), a = a.sibling;
  }
  function Cv(e, t, a) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount(Qn, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Te || it(a, t), Ft(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !Te && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Te || it(a, t), _u(a);
        var l = Re, n = xt;
        ul(a.type) && (Re = a.stateNode, xt = !1), Ft(
          e,
          t,
          a
        ), Rm(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), Re = l, xt = n;
        break;
      case 5:
        Te || it(a, t), _u(a);
      case 6:
        if (a.tag === 6 && _u(a), l = Re, n = xt, Re = null, Ft(
          e,
          t,
          a
        ), Re = l, xt = n, Re !== null)
          if (xt)
            try {
              (Re.nodeType === 9 ? Re.body : Re.nodeName === "HTML" ? Re.ownerDocument.body : Re).removeChild(a.stateNode), be = !0;
            } catch (u) {
              Ee(
                a,
                t,
                u
              );
            }
          else
            try {
              Re.removeChild(a.stateNode), be = !0;
            } catch (u) {
              Ee(
                a,
                t,
                u
              );
            }
        break;
      case 18:
        Re !== null && (xt ? (e = Re, pm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Cn(e)) : pm(Re, a.stateNode));
        break;
      case 4:
        l = Re, n = xt, Re = a.stateNode.containerInfo, xt = !0, Ft(
          e,
          t,
          a
        ), Re = l, xt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ia(2, a, t), Te || Ia(4, a, t), Ft(
          e,
          t,
          a
        );
        break;
      case 1:
        Te || (it(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && gv(
          a,
          t,
          l
        )), Ft(
          e,
          t,
          a
        );
        break;
      case 21:
        Ft(
          e,
          t,
          a
        );
        break;
      case 22:
        Te = (l = Te) || a.memoizedState !== null, Ft(
          e,
          t,
          a
        ), Te = l;
        break;
      case 30:
        it(a, t), Ft(
          e,
          t,
          a
        );
        break;
      case 7:
        Te || it(a, t), Ft(
          e,
          t,
          a
        );
        break;
      default:
        Ft(
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
        Cn(e);
      } catch (a) {
        Ee(t, t.return, a);
      }
    }
  }
  function Ov(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Cn(e);
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
  function tc(e, t) {
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
        var u = l[n], s = e, f = t, m = f;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (ul(m.type)) {
                Re = m.stateNode, xt = !1;
                break e;
              }
              break;
            case 5:
              Re = m.stateNode, xt = !1;
              break e;
            case 3:
            case 4:
              Re = m.stateNode.containerInfo, xt = !0;
              break e;
          }
          m = m.return;
        }
        if (Re === null) throw Error(o(160));
        Cv(s, f, u), Re = null, xt = !1, s = u.alternate, s !== null && (s.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Mv(t, e, a), t = t.sibling;
  }
  var Wt = null;
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
        ht(t, e, a), gt(e), n & 4 && (Ia(3, e, e.return), yu(3, e), Ia(5, e, e.return));
        break;
      case 1:
        ht(t, e, a), gt(e), n & 512 && (Te || l === null || it(l, l.return)), n & 64 && Pe && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
        break;
      case 26:
        if (u = Wt, ht(t, e, a), gt(e), n & 512 && (Te || l === null || it(l, l.return)), n & 4)
          if (n = l !== null ? l.memoizedState : null, a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null)
                if (Pe)
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
                        l = n.getElementsByTagName("title")[0], (!l || l[Vn] || l[at] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = n.createElement(t), n.head.insertBefore(
                          l,
                          n.querySelector("head > title")
                        )), ct(l, t, a), l[at] = e, We(l), t = l;
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
                        l = n.createElement(t), ct(l, t, a), n.head.appendChild(l);
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
                        l = n.createElement(t), ct(l, t, a), n.head.appendChild(l);
                        break;
                      default:
                        throw Error(o(468, t));
                    }
                    l[at] = e, We(l), t = l;
                  }
                  e.stateNode = t;
                }
              else
                Pe || oo(u, e.type, e.stateNode);
            else
              e.stateNode = Bm(
                u,
                a,
                e.memoizedProps
              );
          else
            n !== a ? (n === null ? (t = l.stateNode, t === null || Te || t.parentNode.removeChild(t)) : n.count--, a === null ? Pe || oo(u, e.type, e.stateNode) : Bm(u, a, e.memoizedProps)) : a === null && e.stateNode !== null && hr(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        ht(t, e, a), gt(e), n & 512 && (Te || l === null || it(l, l.return)), l !== null && n & 4 && hr(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = da, da = !1, ht(t, e, a), da = u, gt(e), n & 512 && (Te || l === null || it(l, l.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Kl(t, ""), be = !0;
          } catch (N) {
            Ee(e, e.return, N);
          }
        }
        n & 4 && e.stateNode != null && (t = e.memoizedProps, hr(
          e,
          t,
          l !== null ? l.memoizedProps : t
        )), n & 1024 && (jr = !0);
        break;
      case 6:
        if (ht(t, e, a), gt(e), n & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          t = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = t, be = !0;
          } catch (N) {
            Ee(e, e.return, N);
          }
        }
        break;
      case 3:
        if (be = !1, gc = null, u = Wt, Wt = zu(t.containerInfo), ht(t, e, a), Wt = u, gt(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Cn(t.containerInfo);
          } catch (N) {
            Ee(e, e.return, N);
          }
        jr && (jr = !1, Rv(e)), be = !1;
        break;
      case 4:
        n = da, da = Pe, l = Po(), u = Wt, Wt = zu(
          e.stateNode.containerInfo
        ), ht(t, e, a), gt(e), Wt = u, be && pu && (Pi = !0), be = l, da = n;
        break;
      case 12:
        ht(t, e, a), gt(e);
        break;
      case 31:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, tc(e, t)));
        break;
      case 13:
        ht(t, e, a), gt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (nc = Nt()), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, tc(e, t)));
        break;
      case 22:
        u = e.memoizedState !== null, s = l !== null && l.memoizedState !== null;
        var f = Pe, m = Te, b = da;
        Pe = f || u, da = b || u, Te = m || s, ht(t, e, a), Te = m, da = b, Pe = f, gt(e), n & 8192 && (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, !u || l === null || s || Pe || Te || (t = s || Te, a = Pe, l = Te, Pe = u || Pe, Te = t, Pa(e, 2), Pe = a, Te = l), !u && da || Nr(e, u)), n & 4 && (t = e.updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue = null, tc(e, a))));
        break;
      case 19:
        ht(t, e, a), gt(e), n & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, tc(e, t)));
        break;
      case 30:
        n & 512 && (Te || l === null || it(l, l.return)), n = Po(), u = pu, s = (a & 335544064) === a, f = e.memoizedProps, pu = s && Ta(
          f.default,
          f.update
        ) !== "none", ht(t, e, a), gt(e), s && l !== null && be && (e.flags |= 4), pu = u, be = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Te || l === null || it(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = e);
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
          if (vr(n)) {
            var u = n.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (dr(n)) break;
          n = n.return;
        }
        var s = l;
        if (a == null) throw Error(o(160));
        switch (a.tag) {
          case 27:
            var f = a.stateNode, m = gr(e);
            $i(
              e,
              m,
              f,
              s
            );
            break;
          case 5:
            var b = a.stateNode;
            a.flags & 32 && (Kl(b, ""), a.flags &= -33);
            var N = gr(e);
            $i(
              e,
              N,
              b,
              s
            );
            break;
          case 3:
          case 4:
            var M = a.stateNode.containerInfo, p = gr(e);
            yr(
              e,
              p,
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
  function Rv(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Rv(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, wn = !0, t.reset(), wn = !1), e = e.sibling;
      }
  }
  function dn(e, t) {
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
          if (Tr = va = !1, bv(), dn(t, e), !va && !Pi) {
            if (e = oa, e !== null)
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
            )), Tr = !0;
          }
          oa = null;
          break;
        case 5:
          dn(t, e);
          break;
        case 4:
          l = va, va = !1, dn(t, e), va && (Pi = !0), va = l;
          break;
        case 22:
          e.memoizedState === null && (a.memoizedState !== null ? _r(e, !1) : dn(t, e));
          break;
        case 30:
          l = va, n = bv(), va = !1, dn(t, e), va && (e.flags |= 4);
          var u = e.memoizedProps, s = e.stateNode;
          t = ja(u, s), s = ja(a.memoizedProps, s);
          var f = Ta(u.default, u.update);
          f === "none" ? t = !1 : (u = a.memoizedState, a.memoizedState = null, a = e.child, bt = 0, t = xr(
            e,
            a,
            t,
            s,
            f,
            u,
            !0
          ), bt !== (u === null ? 0 : u.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (pn(
            e,
            e.memoizedProps.onUpdate
          ), oa = n) : n !== null && (n.push.apply(n, oa), oa = n), va = (e.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          dn(t, e);
      }
  }
  function ma(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Av(e, t.alternate, t), t = t.sibling;
  }
  function Pa(e, t) {
    for (e = e.child; e !== null; ) {
      var a = e, l = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ia(4, a, a.return), Pa(
            a,
            l
          );
          break;
        case 1:
          it(a, a.return);
          var n = a.stateNode;
          typeof n.componentWillUnmount == "function" && gv(
            a,
            a.return,
            n
          ), Pa(
            a,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Rm(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          it(a, a.return), a.tag !== 5 && a.tag !== 27 || _u(a), Pa(
            a,
            l
          );
          break;
        case 6:
          _u(a);
          break;
        case 26:
          it(a, a.return), n = a.stateNode, a.memoizedState !== null || n === null || Te || n.parentNode.removeChild(n), Pa(
            a,
            l
          );
          break;
        case 22:
          a.memoizedState === null && Pa(
            a,
            l
          );
          break;
        case 30:
          it(a, a.return), Pa(
            a,
            l
          );
          break;
        case 7:
          it(a, a.return);
        default:
          Pa(
            a,
            l
          );
      }
      e = e.sibling;
    }
  }
  function It(e, t, a) {
    for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, u = t, s = u.flags, f = (a & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          It(
            n,
            u,
            a
          ), yu(4, u);
          break;
        case 1:
          if (It(
            n,
            u,
            a
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (N) {
              Ee(l, l.return, N);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var m = l.stateNode;
            try {
              var b = n.shared.hiddenCallbacks;
              if (b !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < b.length; n++)
                  ld(b[n], m);
            } catch (N) {
              Ee(l, l.return, N);
            }
          }
          f && s & 64 && hv(u), ra(u, u.return);
          break;
        case 27:
          (a & 2) !== 0 && pv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || yv(u), It(
            n,
            u,
            a
          ), f && l === null && s & 4 && mr(u), ra(u, u.return);
          break;
        case 6:
          yv(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || Pe || oo(
            zu(m.ownerDocument),
            u.type,
            m
          ), It(
            n,
            u,
            a
          ), f && l === null && s & 4 && mr(u), ra(u, u.return);
          break;
        case 12:
          It(
            n,
            u,
            a
          );
          break;
        case 31:
          It(
            n,
            u,
            a
          ), f && s & 4 && Dv(n, u);
          break;
        case 13:
          It(
            n,
            u,
            a
          ), f && s & 4 && Ov(n, u);
          break;
        case 22:
          u.memoizedState === null && It(
            n,
            u,
            a
          ), ra(u, u.return);
          break;
        case 30:
          It(
            n,
            u,
            a
          ), ra(u, u.return);
          break;
        case 7:
          ra(u, u.return);
        default:
          It(
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
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && nu(a));
  }
  function zr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && nu(e));
  }
  function Xt(e, t, a, l) {
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
    n && t.alternate === null && t.return !== null && t.return.alternate !== null && Ii(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Xt(
          e,
          t,
          a,
          l
        ), u & 2048 && yu(9, t);
        break;
      case 1:
        Xt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Xt(
          e,
          t,
          a,
          l
        ), n && Tr && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), u & 2048 && (u = null, t.alternate !== null && (u = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== u && (t.refCount++, u != null && nu(u)));
        break;
      case 12:
        if (u & 2048) {
          Xt(
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
          Xt(
            e,
            t,
            a,
            l
          );
        break;
      case 31:
        Xt(
          e,
          t,
          a,
          l
        );
        break;
      case 13:
        Xt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, f = t.alternate, t.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Ii(f), s._visibility & 2 ? Xt(
          e,
          t,
          a,
          l
        ) : Su(
          e,
          t
        )) : (n && f !== null && f.memoizedState !== null && Ii(t), s._visibility & 2 ? Xt(
          e,
          t,
          a,
          l
        ) : (s._visibility |= 2, vn(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && Ar(f, t);
        break;
      case 24:
        Xt(
          e,
          t,
          a,
          l
        ), u & 2048 && zr(t.alternate, t);
        break;
      case 30:
        n && (u = t.alternate, u !== null && (fa(u.child, !0), fa(t.child, !0))), Xt(
          e,
          t,
          a,
          l
        );
        break;
      default:
        Xt(
          e,
          t,
          a,
          l
        );
    }
  }
  function vn(e, t, a, l, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, s = t, f = a, m = l, b = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          vn(
            u,
            s,
            f,
            m,
            n
          ), yu(8, s);
          break;
        case 23:
          break;
        case 22:
          var N = s.stateNode;
          s.memoizedState !== null ? N._visibility & 2 ? vn(
            u,
            s,
            f,
            m,
            n
          ) : Su(
            u,
            s
          ) : (N._visibility |= 2, vn(
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
          vn(
            u,
            s,
            f,
            m,
            n
          ), n && b & 2048 && zr(s.alternate, s);
          break;
        default:
          vn(
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
  function Su(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            Su(a, l), n & 2048 && Ar(
              l.alternate,
              l
            );
            break;
          case 24:
            Su(a, l), n & 2048 && zr(l.alternate, l);
            break;
          default:
            Su(a, l);
        }
        t = t.sibling;
      }
  }
  var Ol = 8192;
  function Ml(e, t, a) {
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
        Ml(
          e,
          t,
          a
        ), e.flags & Ol && (e.memoizedState !== null ? p0(
          a,
          Wt,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Zm(a, e)));
        break;
      case 5:
        Ml(
          e,
          t,
          a
        ), e.flags & Ol && (e = e.stateNode, (t & 335544128) === t && Zm(a, e));
        break;
      case 3:
      case 4:
        var l = Wt;
        Wt = zu(e.stateNode.containerInfo), Ml(
          e,
          t,
          a
        ), Wt = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ol, Ol = 16777216, Ml(
          e,
          t,
          a
        ), Ol = l) : Ml(
          e,
          t,
          a
        ));
        break;
      case 30:
        if ((e.flags & Ol) !== 0 && (l = e.memoizedProps.name, l != null && l !== "auto")) {
          var n = e.stateNode;
          n.paired = null, Dt === null && (Dt = /* @__PURE__ */ new Map()), Dt.set(l, n);
        }
        Ml(
          e,
          t,
          a
        );
        break;
      default:
        Ml(
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
  function bu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          et = l, Yv(
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
        bu(e), e.flags & 2048 && Ia(9, e, e.return);
        break;
      case 3:
        bu(e);
        break;
      case 12:
        bu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ac(e)) : bu(e);
        break;
      default:
        bu(e);
    }
  }
  function ac(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          et = l, Yv(
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
          Ia(8, t, t.return), ac(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, ac(t));
          break;
        default:
          ac(t);
      }
      e = e.sibling;
    }
  }
  function Yv(e, t) {
    for (; et !== null; ) {
      var a = et;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ia(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          nu(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, et = l;
      else
        e: for (a = e; et !== null; ) {
          l = et;
          var n = l.sibling, u = l.return;
          if (wv(l), l === a) {
            et = null;
            break e;
          }
          if (n !== null) {
            n.return = u, et = n;
            break e;
          }
          et = u;
        }
    }
  }
  var my = {
    getCacheForType: function(e) {
      var t = lt(Xe), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return lt(Xe).controller.signal;
    }
  }, hy = typeof WeakMap == "function" ? WeakMap : Map, je = 0, we = null, oe = null, de = 0, Ne = 0, Ot = null, el = !1, mn = !1, wr = !1, Ma = 0, Be = 0, tl = 0, Rl = 0, lc = 0, Mt = 0, hn = 0, xu = null, jt = null, Cr = !1, nc = 0, Gv = 0, uc = 1 / 0, ic = null, al = null, Le = 0, Pt = null, Ul = null, ha = 0, Dr = 0, Or = null, Qv = null, gn = null, yn = null, _n = null, ju = 0, cc = null;
  function Rt() {
    return (je & 2) !== 0 && de !== 0 ? de & -de : k.T !== null ? Qr() : Zo();
  }
  function Xv() {
    if (Mt === 0)
      if ((de & 536870912) === 0 || se) {
        var e = ti;
        ti <<= 1, (ti & 3932160) === 0 && (ti = 262144), Mt = e;
      } else Mt = 536870912;
    return e = nt.current, e !== null && (e.flags |= 32), Mt;
  }
  function pn(e, t) {
    if (t != null) {
      var a = e.stateNode, l = a.ref;
      l === null && (l = a.ref = jm(
        ja(e.memoizedProps, a)
      )), yn === null && (yn = []), yn.push(t.bind(null, l));
    }
  }
  function Tt(e, t, a) {
    (e === we && (Ne === 2 || Ne === 9) || e.cancelPendingCommit !== null) && (Sn(e, 0), ll(
      e,
      de,
      Mt,
      !1
    )), Zn(e, a), ((je & 2) === 0 || e !== we) && (e === we && ((je & 2) === 0 && (Rl |= a), Be === 4 && ll(
      e,
      de,
      Mt,
      !1
    )), ga(e));
  }
  function Zv(e, t, a) {
    if ((je & 6) !== 0) throw Error(o(327));
    var l = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Xn(e, t), n = l ? _y(e, t) : Rr(e, t, !0), u = l;
    do {
      if (n === 0) {
        mn && !l && ll(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, u && !gy(a)) {
          n = Rr(e, t, !1), u = !1;
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
              n = xu;
              var m = f.current.memoizedState.isDehydrated;
              if (m && (Sn(f, s).flags |= 256), s = Rr(
                f,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (wr && !m) {
                  f.errorRecoveryDisabledLanes |= u, Rl |= u, n = 4;
                  break e;
                }
                u = jt, jt = n, u !== null && (jt === null ? jt = u : jt.push.apply(
                  jt,
                  u
                ));
              }
              n = s;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Sn(e, 0), ll(e, t, 0, !0);
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
              ll(
                l,
                t,
                Mt,
                !el
              );
              break e;
            case 2:
              jt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = nc + 300 - Nt(), 10 < n)) {
            if (ll(
              l,
              t,
              Mt,
              !el
            ), li(l, 0, !0) !== 0) break e;
            ha = t, l.timeoutHandle = Pr(
              Vv.bind(
                null,
                l,
                a,
                jt,
                ic,
                Cr,
                t,
                Mt,
                Rl,
                hn,
                el,
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
            jt,
            ic,
            Cr,
            t,
            Mt,
            Rl,
            hn,
            el,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ga(e);
  }
  function Vv(e, t, a, l, n, u, s, f, m, b, N, M, p, T) {
    e.timeoutHandle = -1;
    var Y = t.subtreeFlags, J = (u & 335544064) === u;
    if (M = null, (J || Y & 8192 || (Y & 16785408) === 16785408) && (M = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ia
    }, Dt = null, Lv(
      t,
      u,
      M
    ), J && (Y = M, J = e.containerInfo, J = (J.nodeType === 9 ? J : J.ownerDocument).__reactViewTransition, J != null && (Y.count++, Y.waitingForViewTransition = !0, Y = Du.bind(Y), J.finished.then(Y, Y))), Y = (u & 62914560) === u ? nc - Nt() : (u & 4194048) === u ? Gv - Nt() : 0, Y = S0(
      M,
      Y
    ), Y !== null)) {
      ha = u, e.cancelPendingCommit = Y(
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
          N,
          M,
          null,
          p,
          T
        )
      ), ll(e, u, s, !b);
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
      N,
      M
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
            if (!wt(u(), n)) return !1;
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
  function ll(e, t, a, l) {
    t = Bo(e, t), t &= ~lc, t &= ~Rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - At(n), s = 1 << u;
      l[u] = -1, n &= ~s;
    }
    a !== 0 && Go(e, a, t);
  }
  function sc() {
    return (je & 6) === 0 ? (Tu(0), !1) : !0;
  }
  function Mr() {
    if (oe !== null) {
      if (Ne === 0)
        var e = oe.return;
      else
        e = oe, Aa = xl = null, Gs(e), un = null, cu = 0, e = oe;
      for (; e !== null; )
        mv(e.alternate, e), e = e.return;
      oe = null;
    }
  }
  function Sn(e, t) {
    var a = e.timeoutHandle;
    return a !== -1 && (e.timeoutHandle = -1, Yy(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ha = 0, Mr(), we = e, oe = a = Na(e.current, null), de = t, Ne = 0, Ot = null, el = !1, mn = Xn(e, t), wr = !1, hn = Mt = lc = Rl = tl = Be = 0, jt = xu = null, Cr = !1, Ma = Bo(e, t), gi(), a;
  }
  function Kv(e, t) {
    le = null, k.H = Gi, t === nn || t === Ai ? (t = Pf(), Ne = 3) : t === zs ? (t = Pf(), Ne = 4) : Ne = t === ar ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ot = t, oe === null && (Be = 1, Qi(
      e,
      Bt(t, e.current)
    ));
  }
  function Jv() {
    var e = nt.current;
    return e === null ? !0 : (de & 4194048) === de ? ft === null : (de & 62914560) === de || (de & 536870912) !== 0 ? e === ft : !1;
  }
  function kv() {
    var e = k.H;
    return k.H = Gi, e === null ? Gi : e;
  }
  function $v() {
    var e = k.A;
    return k.A = my, e;
  }
  function rc() {
    Be = 4, el || (de & 4194048) !== de && nt.current !== null || (mn = !0), (tl & 134217727) === 0 && (Rl & 134217727) === 0 || we === null || ll(
      we,
      de,
      Mt,
      !1
    );
  }
  function Rr(e, t, a) {
    var l = je;
    je |= 2;
    var n = kv(), u = $v();
    (we !== e || de !== t) && (ic = null, Sn(e, t)), t = !1;
    var s = Be;
    e: do
      try {
        if (Ne !== 0 && oe !== null) {
          var f = oe, m = Ot;
          switch (Ne) {
            case 8:
              Mr(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              nt.current === null && (t = !0);
              var b = Ne;
              if (Ne = 0, Ot = null, bn(e, f, m, b), a && mn) {
                s = 0;
                break e;
              }
              break;
            default:
              b = Ne, Ne = 0, Ot = null, bn(e, f, m, b);
          }
        }
        yy(), s = Be;
        break;
      } catch (N) {
        Kv(e, N);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Aa = xl = null, je = l, k.H = n, k.A = u, oe === null && (we = null, de = 0, gi()), s;
  }
  function yy() {
    for (; oe !== null; ) Fv(oe);
  }
  function _y(e, t) {
    var a = je;
    je |= 2;
    var l = kv(), n = $v();
    we !== e || de !== t ? (ic = null, uc = Nt() + 500, Sn(e, t)) : mn = Xn(
      e,
      t
    );
    e: do
      try {
        if (Ne !== 0 && oe !== null) {
          t = oe;
          var u = Ot;
          t: switch (Ne) {
            case 1:
              Ne = 0, Ot = null, bn(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Wf(u)) {
                Ne = 0, Ot = null, Wv(t);
                break;
              }
              t = function() {
                Ne !== 2 && Ne !== 9 || we !== e || (Ne = 7), ga(e);
              }, u.then(t, t);
              break e;
            case 3:
              Ne = 7;
              break e;
            case 4:
              Ne = 5;
              break e;
            case 7:
              Wf(u) ? (Ne = 0, Ot = null, Wv(t)) : (Ne = 0, Ot = null, bn(e, t, u, 7));
              break;
            case 5:
              var s = null;
              switch (oe.tag) {
                case 26:
                  s = oe.memoizedState;
                case 5:
                case 27:
                  var f = oe;
                  if (s ? Qm(s) : f.stateNode.complete) {
                    Ne = 0, Ot = null;
                    var m = f.sibling;
                    if (m !== null) oe = m;
                    else {
                      var b = f.return;
                      b !== null ? (oe = b, oc(b)) : oe = null;
                    }
                    break t;
                  }
              }
              Ne = 0, Ot = null, bn(e, t, u, 5);
              break;
            case 6:
              Ne = 0, Ot = null, bn(e, t, u, 6);
              break;
            case 8:
              Mr(), Be = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        py();
        break;
      } catch (N) {
        Kv(e, N);
      }
    while (!0);
    return Aa = xl = null, k.H = l, k.A = n, je = a, oe !== null ? 0 : (we = null, de = 0, gi(), Be);
  }
  function py() {
    for (; oe !== null && !Hh(); )
      Fv(oe);
  }
  function Fv(e) {
    var t = dv(e.alternate, e, Ma);
    e.memoizedProps = e.pendingProps, t === null ? oc(e) : oe = t;
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
          de
        );
        break;
      case 11:
        t = uv(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          de
        );
        break;
      case 5:
        Gs(t);
        var l = t;
        l === Ie && (se ? (xi(l), l.tag === 5 && l.stateNode != null && (Oe = l.stateNode)) : (xi(l), se = !0));
      default:
        mv(a, t), t = oe = Yf(t, Ma), t = dv(a, t, Ma);
    }
    e.memoizedProps = e.pendingProps, t === null ? oc(e) : oe = t;
  }
  function bn(e, t, a, l) {
    Aa = xl = null, Gs(t), un = null, cu = 0;
    var n = t.return;
    try {
      if (iy(
        e,
        n,
        t,
        a,
        de
      )) {
        Be = 1, Qi(
          e,
          Bt(a, e.current)
        ), oe = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw oe = n, u;
      Be = 1, Qi(
        e,
        Bt(a, e.current)
      ), oe = null;
      return;
    }
    t.flags & 32768 ? (se || l === 1 ? e = !0 : mn || (de & 536870912) !== 0 ? e = !1 : (el = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = nt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Iv(t, e)) : oc(t);
  }
  function oc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Iv(
          t,
          el
        );
        return;
      }
      e = t.return;
      var a = oy(
        t.alternate,
        t,
        Ma
      );
      if (a !== null) {
        oe = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        oe = t;
        return;
      }
      oe = t = e;
    } while (t !== null);
    Be === 0 && (Be = 5);
  }
  function Iv(e, t) {
    do {
      var a = fy(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, oe = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        oe = e;
        return;
      }
      oe = e = a;
    } while (e !== null);
    Be = 6, oe = null;
  }
  function Pv(e, t, a, l, n, u, s, f, m, b, N, M) {
    e.cancelPendingCommit = null;
    do
      fc();
    while (Le !== 0);
    if ((je & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      e === we && (oe = we = null, de = 0), Ul = t, Pt = e, ha = a, Or = n, Qv = l, Sy(
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
  function Sy(e, t, a, l, n, u, s) {
    var f = t.lanes | t.childLanes;
    if (Dr = f, f |= hs, Kh(
      e,
      a,
      f,
      l,
      n,
      u
    ), yn = null, (a & 335544064) === a ? (_n = kg(e), l = 10262) : (_n = null, l = 10256), (t.subtreeFlags & l) !== 0 || (t.flags & l) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Ey(Pu, function() {
      return qr(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Fi = !1, l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
      l = k.T, k.T = null, n = te.p, te.p = 2, u = je, je |= 4;
      try {
        dy(e, t, a);
      } finally {
        je = u, te.p = n, k.T = l;
      }
    }
    Le = 1, Fi ? gn = Ky(
      s,
      e.containerInfo,
      _n,
      Ur,
      Hr,
      xy,
      Lr,
      qr,
      by
    ) : (Ur(), Hr(), Lr());
  }
  function by(e) {
    if (Le !== 0) {
      var t = Pt.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function xy() {
    Le === 3 && (Le = 0, Uv(Ul, Pt), Le = 4);
  }
  function Ur() {
    if (Le === 1) {
      Le = 0;
      var e = Pt, t = Ul, a = ha, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = k.T, k.T = null;
        var n = te.p;
        te.p = 2;
        var u = je;
        je |= 4;
        try {
          pu = Pi = !1, Mv(t, e, a), a = Fr;
          var s = Cf(e.containerInfo), f = a.focusedElem, m = a.selectionRange;
          if (s !== f && f && f.ownerDocument && wf(
            f.ownerDocument.documentElement,
            f
          )) {
            if (m !== null && os(f)) {
              var b = m.start, N = m.end;
              if (N === void 0 && (N = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  N,
                  f.value.length
                );
              else {
                var M = f.ownerDocument || document, p = M && M.defaultView || window;
                if (p.getSelection) {
                  var T = p.getSelection(), Y = f.textContent.length, J = Math.min(m.start, Y), ne = m.end === void 0 ? J : Math.min(m.end, Y);
                  !T.extend && J > ne && (s = ne, ne = J, J = s);
                  var S = zf(
                    f,
                    J
                  ), g = zf(
                    f,
                    ne
                  );
                  if (S && g && (T.rangeCount !== 1 || T.anchorNode !== S.node || T.anchorOffset !== S.offset || T.focusNode !== g.node || T.focusOffset !== g.offset)) {
                    var x = M.createRange();
                    x.setStart(S.node, S.offset), T.removeAllRanges(), J > ne ? (T.addRange(x), T.extend(g.node, g.offset)) : (x.setEnd(g.node, g.offset), T.addRange(x));
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
              var O = M[f];
              O.element.scrollLeft = O.left, O.element.scrollTop = O.top;
            }
          }
          wn = !!$r, Fr = $r = null;
        } finally {
          je = u, te.p = n, k.T = l;
        }
      }
      e.current = t, Le = 2;
    }
  }
  function Hr() {
    if (Le === 2) {
      Le = 0;
      var e = Pt, t = Ul, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = k.T, k.T = null;
        var l = te.p;
        te.p = 2;
        var n = je;
        je |= 4;
        try {
          Av(e, t.alternate, t);
        } finally {
          je = n, te.p = l, k.T = a;
        }
      }
      Le = 3;
    }
  }
  function Lr() {
    if (Le === 4 || Le === 3) {
      Le = 0;
      var e = gn;
      gn = null, Lh();
      var t = Pt, a = Ul, l = ha, n = Qv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((a.subtreeFlags & u) !== 0 || (a.flags & u) !== 0 ? Le = 5 : (Le = 0, Ul = Pt = null, em(t, t.pendingLanes)), u = t.pendingLanes, u === 0 && (al = null), Kc(l), a = a.stateNode, Et && typeof Et.onCommitFiberRoot == "function")
        try {
          Et.onCommitFiberRoot(
            Qn,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        a = k.T, u = te.p, te.p = 2, k.T = null;
        try {
          for (var s = t.onRecoverableError, f = 0; f < n.length; f++) {
            var m = n[f];
            s(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          k.T = a, te.p = u;
        }
      }
      if (n = yn, s = _n, _n = null, n !== null && (yn = null, s === null && (s = []), e !== null))
        for (m = 0; m < n.length; m++)
          a = (0, n[m])(
            s
          ), a !== void 0 && e.finished.finally(a);
      (ha & 3) !== 0 && fc(), ga(t), u = t.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? t === cc ? ju++ : (ju = 0, cc = t) : (ju = 0, cc = null), Tu(0);
    }
  }
  function em(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, nu(t)));
  }
  function fc() {
    return gn !== null && (gn.skipTransition(), gn = null), Ur(), Hr(), Lr(), qr();
  }
  function qr() {
    if (Le !== 5) return !1;
    var e = Pt, t = Dr;
    Dr = 0;
    var a = Kc(ha), l = k.T, n = te.p;
    try {
      te.p = 32 > a ? 32 : a, k.T = null, a = Or, Or = null;
      var u = Pt, s = ha;
      if (Le = 0, Ul = Pt = null, ha = 0, (je & 6) !== 0) throw Error(o(331));
      var f = je;
      if (je |= 4, Bv(u.current), Hv(
        u,
        u.current,
        s,
        a
      ), je = f, Tu(0, !1), Et && typeof Et.onPostCommitFiberRoot == "function")
        try {
          Et.onPostCommitFiberRoot(Qn, u);
        } catch {
        }
      return !0;
    } finally {
      te.p = n, k.T = l, em(e, t);
    }
  }
  function tm(e, t, a) {
    t = Bt(a, t), t = tr(e.stateNode, t, 2), e = ka(e, t, 2), e !== null && (Zn(e, 2), ga(e));
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
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (al === null || !al.has(l))) {
            e = Bt(a, e), a = Wd(2), l = ka(t, a, 2), l !== null && (Id(
              a,
              l,
              t,
              e
            ), Zn(l, 2), ga(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Br(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new hy();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (wr = !0, n.add(a), e = jy.bind(null, e, t, a), t.then(e, e));
  }
  function jy(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, we === e && (de & a) === a && ((Be === 4 || Be === 3 && (de & 62914560) === de && 300 > Nt() - nc) && (je & 2) === 0 ? Sn(e, 0) : lc |= a, hn === de && (hn = 0)), ga(e);
  }
  function am(e, t) {
    t === 0 && (t = Yo()), e = pl(e, t), e !== null && (Zn(e, t), ga(e));
  }
  function Ty(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), am(e, a);
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
    l !== null && l.delete(t), am(e, a);
  }
  function Ey(e, t) {
    return Qc(e, t);
  }
  var xn = null, jn = null, Yr = !1, dc = !1, Gr = !1, nl = 0;
  function ga(e) {
    e !== jn && e.next === null && (jn === null ? xn = jn = e : jn = jn.next = e), dc = !0, Yr || (Yr = !0, zy());
  }
  function Tu(e, t) {
    if (!Gr && dc) {
      Gr = !0;
      do
        for (var a = !1, l = xn; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var s = l.suspendedLanes, f = l.pingedLanes;
              u = (1 << 31 - At(42 | e) + 1) - 1, u &= n & ~(s & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, im(l, u));
          } else
            u = de, u = li(
              l,
              l === we ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || Xn(l, u) || (a = !0, im(l, u));
          l = l.next;
        }
      while (a);
      Gr = !1;
    }
  }
  function Ay() {
    lm();
  }
  function lm() {
    dc = Yr = !1;
    var e = 0;
    nl !== 0 && By() && (e = nl);
    for (var t = Nt(), a = null, l = xn; l !== null; ) {
      var n = l.next, u = nm(l, t);
      u === 0 ? (l.next = null, a === null ? xn = n : a.next = n, n === null && (jn = a)) : (a = l, (e !== 0 || (u & 3) !== 0) && (dc = !0)), l = n;
    }
    Le !== 0 && Le !== 5 || Tu(e), nl !== 0 && (nl = 0);
  }
  function nm(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var s = 31 - At(u), f = 1 << s, m = n[s];
      m === -1 ? ((f & a) === 0 || (f & l) !== 0) && (n[s] = Vh(f, t)) : m <= t && (e.expiredLanes |= f), u &= ~f;
    }
    if (t = we, a = de, a = li(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (Ne === 2 || Ne === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && Xc(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Xn(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (l !== null && Xc(l), Kc(a)) {
        case 2:
        case 8:
          a = Lo;
          break;
        case 32:
          a = Pu;
          break;
        case 268435456:
          a = qo;
          break;
        default:
          a = Pu;
      }
      return l = um.bind(null, e), a = Qc(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && Xc(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function um(e, t) {
    if (Le !== 0 && Le !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (fc() && e.callbackNode !== a)
      return null;
    var l = de;
    return l = li(
      e,
      e === we ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Zv(e, l, t), nm(e, Nt()), e.callbackNode != null && e.callbackNode === a ? um.bind(null, e) : null);
  }
  function im(e, t) {
    if (fc()) return null;
    Zv(e, t, !0);
  }
  function zy() {
    Gy(function() {
      (je & 6) !== 0 ? Qc(
        Ho,
        Ay
      ) : lm();
    });
  }
  function Qr() {
    if (nl === 0) {
      var e = Nl;
      e === 0 && (e = ei, ei <<= 1, (ei & 261888) === 0 && (ei = 256)), nl = e;
    }
    return nl;
  }
  function cm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : si(e);
  }
  function wy(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var u = cm(
        (n[pt] || null).action
      ), s = l.submitter;
      s && (t = (t = s[pt] || null) ? cm(t.formAction) : s.getAttribute("formAction"), t !== null && (u = t, s = null));
      var f = new di(
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
                if (nl !== 0) {
                  var m = new FormData(n, s);
                  Fs(
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
                typeof u == "function" && (f.preventDefault(), m = new FormData(n, s), Fs(
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
  for (var Xr = 0; Xr < ms.length; Xr++) {
    var Zr = ms[Xr], Cy = Zr.toLowerCase(), Dy = Zr[0].toUpperCase() + Zr.slice(1);
    $t(
      Cy,
      "on" + Dy
    );
  }
  $t(Mf, "onAnimationEnd"), $t(Rf, "onAnimationIteration"), $t(Uf, "onAnimationStart"), $t("dblclick", "onDoubleClick"), $t("focusin", "onFocus"), $t("focusout", "onBlur"), $t(Yg, "onTransitionRun"), $t(Gg, "onTransitionStart"), $t(Qg, "onTransitionCancel"), $t(Hf, "onTransitionEnd"), Zl("onMouseEnter", ["mouseout", "mouseover"]), Zl("onMouseLeave", ["mouseout", "mouseover"]), Zl("onPointerEnter", ["pointerout", "pointerover"]), Zl("onPointerLeave", ["pointerout", "pointerover"]), gl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), gl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), gl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), gl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), gl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), gl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Nu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Oy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Nu)
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
            } catch (N) {
              hi(N);
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
            } catch (N) {
              hi(N);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function fe(e, t) {
    var a = t[Ko];
    a === void 0 && (a = t[Ko] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (rm(t, e, 2, !1), a.add(l));
  }
  function Vr(e, t, a) {
    var l = 0;
    t && (l |= 4), rm(
      a,
      e,
      l,
      t
    );
  }
  var vc = "_reactListening" + Math.random().toString(36).slice(2);
  function Kr(e) {
    if (!e[vc]) {
      e[vc] = !0, $o.forEach(function(a) {
        a !== "selectionchange" && (Oy.has(a) || Vr(a, !1, e), Vr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[vc] || (t[vc] = !0, Vr("selectionchange", !1, t));
    }
  }
  function rm(e, t, a, l) {
    switch (Im(t)) {
      case 2:
        var n = T0;
        break;
      case 8:
        n = N0;
        break;
      default:
        n = vo;
    }
    a = n.bind(
      null,
      t,
      a,
      e
    ), n = void 0, !es || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function Jr(e, t, a, l, n) {
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
            if (s = hl(f), s === null) return;
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
      var b = u, N = Ic(a), M = [];
      e: {
        var p = Lf.get(e);
        if (p !== void 0) {
          var T = di, Y = e;
          switch (e) {
            case "keypress":
              if (oi(a) === 0) break e;
            case "keydown":
            case "keyup":
              T = gg;
              break;
            case "focusin":
              Y = "focus", T = ns;
              break;
            case "focusout":
              Y = "blur", T = ns;
              break;
            case "beforeblur":
            case "afterblur":
              T = ns;
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
              T = ng;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = bg;
              break;
            case Mf:
            case Rf:
            case Uf:
              T = cg;
              break;
            case Hf:
              T = jg;
              break;
            case "scroll":
            case "scrollend":
              T = ag;
              break;
            case "wheel":
              T = Ng;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = rg;
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
              T = Ag;
          }
          var J = (t & 4) !== 0, ne = !J && (e === "scroll" || e === "scrollend"), S = J ? p !== null ? p + "Capture" : null : p;
          J = [];
          for (var g = b, x; g !== null; ) {
            var O = g;
            if (x = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || x === null || S === null || (O = Jn(g, S), O != null && J.push(
              Eu(g, O, x)
            )), ne) break;
            g = g.return;
          }
          0 < J.length && (p = new T(
            p,
            Y,
            null,
            a,
            N
          ), M.push({ event: p, listeners: J }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", T && a !== Wc && (Y = a.relatedTarget || a.fromElement) && (hl(Y) || Y[Gl]))
            break e;
          (p || T) && (Y = N.window === N ? N : (T = N.ownerDocument) ? T.defaultView || T.parentWindow : window, p ? (T = a.relatedTarget || a.toElement, p = b, T = T ? hl(T) : null, T !== null && (ne = h(T), J = T.tag, T !== ne || J !== 5 && J !== 27 && J !== 6) && (T = null)) : (p = null, T = b), p !== T && (J = df, O = "onMouseLeave", S = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (J = mf, O = "onPointerLeave", S = "onPointerEnter", g = "pointer"), ne = p == null ? Y : Kn(p), x = T == null ? Y : Kn(T), Y = new J(
            O,
            g + "leave",
            p,
            a,
            N
          ), Y.target = ne, Y.relatedTarget = x, O = null, hl(N) === b && (J = new J(
            S,
            g + "enter",
            T,
            a,
            N
          ), J.target = x, J.relatedTarget = ne, O = J), ne = O, J = p && T ? Ye(
            p,
            T,
            My
          ) : null, p !== null && om(
            M,
            Y,
            p,
            J,
            !1
          ), T !== null && ne !== null && om(
            M,
            ne,
            T,
            J,
            !0
          )));
        }
        e: {
          if (p = b ? Kn(b) : window, T = p.nodeName && p.nodeName.toLowerCase(), T === "select" || T === "input" && p.type === "file")
            var V = xf;
          else if (Sf(p))
            if (jf)
              V = Lg;
            else {
              V = Ug;
              var ve = Rg;
            }
          else
            T = p.nodeName, !T || T.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? b && Fc(b.elementType) && (V = xf) : V = Hg;
          if (V && (V = V(e, b))) {
            bf(
              M,
              V,
              a,
              N
            );
            break e;
          }
          ve && ve(e, p, b);
        }
        switch (ve = b ? Kn(b) : window, e) {
          case "focusin":
            (Sf(ve) || ve.contentEditable === "true") && (Fl = ve, fs = b, tu = null);
            break;
          case "focusout":
            tu = fs = Fl = null;
            break;
          case "mousedown":
            ds = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ds = !1, Df(M, a, N);
            break;
          case "selectionchange":
            if (Bg) break;
          case "keydown":
          case "keyup":
            Df(M, a, N);
        }
        var $;
        if (is)
          e: {
            switch (e) {
              case "compositionstart":
                var I = "onCompositionStart";
                break e;
              case "compositionend":
                I = "onCompositionEnd";
                break e;
              case "compositionupdate":
                I = "onCompositionUpdate";
                break e;
            }
            I = void 0;
          }
        else
          $l ? _f(e, a) && (I = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (I = "onCompositionStart");
        I && (hf && a.locale !== "ko" && ($l || I !== "onCompositionStart" ? I === "onCompositionEnd" && $l && ($ = of()) : (Ba = N, ts = "value" in Ba ? Ba.value : Ba.textContent, $l = !0)), ve = mc(b, I), 0 < ve.length && (I = new vf(
          I,
          e,
          null,
          a,
          N
        ), M.push({ event: I, listeners: ve }), $ ? I.data = $ : ($ = pf(a), $ !== null && (I.data = $)))), ($ = wg ? Cg(e, a) : Dg(e, a)) && (I = mc(b, "onBeforeInput"), 0 < I.length && (ve = new vf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          N
        ), M.push({
          event: ve,
          listeners: I
        }), ve.data = $)), wy(
          M,
          e,
          b,
          a,
          N
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
  function mc(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Jn(e, a), n != null && l.unshift(
        Eu(e, n, u)
      ), n = Jn(e, t), n != null && l.push(
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
  function om(e, t, a, l, n) {
    for (var u = t._reactName, s = []; a !== null && a !== l; ) {
      var f = a, m = f.alternate, b = f.stateNode;
      if (f = f.tag, m !== null && m === l) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (m = b, n ? (b = Jn(a, u), b != null && s.unshift(
        Eu(a, b, m)
      )) : n || (b = Jn(a, u), b != null && s.push(
        Eu(a, b, m)
      ))), a = a.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var Ry = /\r\n?/g, Uy = /\u0000|\uFFFD/g;
  function fm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ry, `
`).replace(Uy, "");
  }
  function dm(e, t) {
    return t = fm(t), fm(e) === t;
  }
  function Ae(e, t, a, l, n, u) {
    switch (a) {
      case "children":
        if (typeof l == "string")
          t === "body" || t === "textarea" && l === "" || Kl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          t !== "body" && Kl(e, "" + l);
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
        l = si(l), e.setAttribute(a, l);
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
        l = si(l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = ia);
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
        a = si(l), e.setAttributeNS(
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
        fe("beforetoggle", e), fe("toggle", e), ii(e, "popover", l);
        break;
      case "xlinkActuate":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ii(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = eg.get(a) || a, ii(e, a, l);
        else return;
    }
    be = !0;
  }
  function kr(e, t, a, l, n, u) {
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
        if (typeof l == "string") Kl(e, l);
        else if (typeof l == "number" || typeof l == "bigint")
          Kl(e, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && fe("scroll", e);
        return;
      case "onScrollEnd":
        l != null && fe("scrollend", e);
        return;
      case "onClick":
        l != null && (e.onclick = ia);
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
            be = !0, a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ii(e, a, l);
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
        fe("error", e), fe("load", e);
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
        fe("invalid", e);
        var f = u = s = n = null, m = null, b = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var N = a[l];
            if (N != null)
              switch (l) {
                case "name":
                  n = N;
                  break;
                case "type":
                  s = N;
                  break;
                case "checked":
                  m = N;
                  break;
                case "defaultChecked":
                  b = N;
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
                  Ae(e, t, l, N, a, null);
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
        fe("invalid", e), l = s = u = null;
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
        t = u, a = s, e.multiple = !!l, t != null ? Vl(e, !!l, t, !1) : a != null && Vl(e, !!l, a, !0);
        return;
      case "textarea":
        fe("invalid", e), u = n = l = null;
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
        fe("beforetoggle", e), fe("toggle", e), fe("cancel", e), fe("close", e);
        break;
      case "iframe":
      case "object":
        fe("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Nu.length; l++)
          fe(Nu[l], e);
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
        if (Fc(t)) {
          for (N in a)
            a.hasOwnProperty(N) && (l = a[N], l !== void 0 && kr(
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
        var n = null, u = null, s = null, f = null, m = null, b = null, N = null;
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
        for (var p in l) {
          var T = l[p];
          if (M = a[p], l.hasOwnProperty(p) && (T != null || M != null))
            switch (p) {
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
                T !== M && (be = !0), N = T;
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
                  p,
                  T,
                  l,
                  M
                );
            }
        }
        kc(
          e,
          s,
          f,
          m,
          b,
          N,
          u,
          n
        );
        return;
      case "select":
        T = s = f = p = null;
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
                u !== m && (be = !0), p = u;
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
        t = f, a = s, l = T, p != null ? Vl(e, !!a, p, !1) : !!l != !!a && (t != null ? Vl(e, !!a, t, !0) : Vl(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        T = p = null;
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
                n !== u && (be = !0), p = n;
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
        lf(e, p, T);
        return;
      case "option":
        for (var Y in a)
          if (p = a[Y], a.hasOwnProperty(Y) && p != null && !l.hasOwnProperty(Y))
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
                  p
                );
            }
        for (m in l)
          if (p = l[m], T = a[m], l.hasOwnProperty(m) && p !== T && (p != null || T != null))
            switch (m) {
              case "selected":
                p !== T && (be = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
                break;
              default:
                Ae(
                  e,
                  t,
                  m,
                  p,
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
        for (var J in a)
          p = a[J], a.hasOwnProperty(J) && p != null && !l.hasOwnProperty(J) && Ae(e, t, J, null, l, p);
        for (b in l)
          if (p = l[b], T = a[b], l.hasOwnProperty(b) && p !== T && (p != null || T != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(o(137, t));
                break;
              default:
                Ae(
                  e,
                  t,
                  b,
                  p,
                  l,
                  T
                );
            }
        return;
      default:
        if (Fc(t)) {
          for (var ne in a)
            p = a[ne], a.hasOwnProperty(ne) && p !== void 0 && !l.hasOwnProperty(ne) && kr(
              e,
              t,
              ne,
              void 0,
              l,
              p
            );
          for (N in l)
            p = l[N], T = a[N], !l.hasOwnProperty(N) || p === T || p === void 0 && T === void 0 || kr(
              e,
              t,
              N,
              p,
              l,
              T
            );
          return;
        }
    }
    for (var S in a)
      p = a[S], a.hasOwnProperty(S) && p != null && !l.hasOwnProperty(S) && Ae(e, t, S, null, l, p);
    for (M in l)
      p = l[M], T = a[M], !l.hasOwnProperty(M) || p === T || p == null && T == null || Ae(e, t, M, p, l, T);
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
  function qy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), l = 0; l < a.length; l++) {
        var n = a[l], u = n.transferSize, s = n.initiatorType, f = n.duration;
        if (u && f && vm(s)) {
          for (s = 0, f = n.responseEnd, l += 1; l < a.length; l++) {
            var m = a[l], b = m.startTime;
            if (b > f) break;
            var N = m.transferSize, M = m.initiatorType;
            N && vm(M) && (m = m.responseEnd, s += N * (m < f ? 1 : (f - b) / (m - b)));
          }
          if (--l, t += 8 * (u + s) / (n.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var $r = null, Fr = null;
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
    ).createElement(e), a[at] = l, a[pt] = t, ct(a, e, t), We(a), a;
  }
  function Wr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ir = null;
  function By() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ir ? !1 : (Ir = e, !0) : (Ir = null, !1);
  }
  var Pr = typeof setTimeout == "function" ? setTimeout : void 0, Yy = typeof clearTimeout == "function" ? clearTimeout : void 0, ym = typeof Promise == "function" ? Promise : void 0, _m = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Pr, Gy = typeof queueMicrotask == "function" ? queueMicrotask : typeof ym < "u" ? function(e) {
    return ym.resolve(null).then(e).catch(Qy);
  } : Pr;
  function Qy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ul(e) {
    return e === "head";
  }
  function pm(e, t) {
    var a = t, l = 0;
    do {
      var n = a.nextSibling;
      if (e.removeChild(a), n && n.nodeType === 8)
        if (a = n.data, a === "/$" || a === "/&") {
          if (l === 0) {
            e.removeChild(n), Cn(t);
            return;
          }
          l--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          l++;
        else if (a === "html")
          co(
            e.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = e.ownerDocument.head, co(a);
          for (var u = a.firstChild; u; ) {
            var s = u.nextSibling, f = u.nodeName;
            u[Vn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || a.removeChild(u), u = s;
          }
        } else
          a === "body" && co(e.ownerDocument.body);
      a = n;
    } while (a);
    Cn(t);
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
  function Xy(e, t, a) {
    return a = a.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= a.innerHeight && e.left <= a.innerWidth
    };
  }
  function eo(e) {
    var t = e.getBoundingClientRect(), a = getComputedStyle(e);
    return Xy(t, a, e);
  }
  function Zy(e) {
    return e.documentElement.clientHeight;
  }
  function Vy(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function Ky(e, t, a, l, n, u, s, f, m) {
    var b = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var N = b.startViewTransition({
        update: function() {
          var p = b.defaultView, T = p.navigation && p.navigation.transition, Y = b.fonts.status;
          l();
          var J = [];
          if (Y === "loaded" && (Zy(b), b.fonts.status === "loading" && J.push(b.fonts.ready)), Y = J.length, e !== null)
            for (var ne = e.suspenseyImages, S = 0, g = 0; g < ne.length; g++) {
              var x = ne[g];
              if (!x.complete) {
                var O = x.getBoundingClientRect();
                if (0 < O.bottom && 0 < O.right && O.top < p.innerHeight && O.left < p.innerWidth) {
                  if (S += Xm(x), S > yc) {
                    J.length = Y;
                    break;
                  }
                  x = new Promise(
                    Vy.bind(x)
                  ), J.push(x);
                }
              }
            }
          if (0 < J.length)
            return p = Promise.race([
              Promise.all(J),
              new Promise(function(V) {
                return setTimeout(V, 500);
              })
            ]).then(n, n), (T ? Promise.allSettled([T.finished, p]) : p).then(u, u);
          if (n(), T)
            return T.finished.then(
              u,
              u
            );
          u();
        },
        types: a
      });
      b.__reactViewTransition = N;
      var M = [];
      return N.ready.then(
        function() {
          for (var p = b.documentElement.getAnimations({
            subtree: !0
          }), T = 0; T < p.length; T++) {
            var Y = p[T], J = Y.effect, ne = J.pseudoElement;
            if (ne != null && ne.startsWith("::view-transition")) {
              M.push(Y), Y = J.getKeyframes();
              for (var S = ne = void 0, g = !0, x = 0; x < Y.length; x++) {
                var O = Y[x], V = O.width;
                if (ne === void 0) ne = V;
                else if (ne !== V) {
                  g = !1;
                  break;
                }
                if (V = O.height, S === void 0) S = V;
                else if (S !== V) {
                  g = !1;
                  break;
                }
                delete O.width, delete O.height, O.transform === "none" && delete O.transform;
              }
              g && ne !== void 0 && S !== void 0 && (J.setKeyframes(Y), g = getComputedStyle(
                J.target,
                J.pseudoElement
              ), g.width !== ne || g.height !== S) && (g = Y[0], g.width = ne, g.height = S, g = Y[Y.length - 1], g.width = ne, g.height = S, J.setKeyframes(Y));
            }
          }
          s();
        },
        function(p) {
          b.__reactViewTransition === N && (b.__reactViewTransition = null);
          try {
            if (typeof p == "object" && p !== null)
              switch (p.name) {
                case "InvalidStateError":
                  (p.message === "View transition was skipped because document visibility state is hidden." || p.message === "Skipping view transition because document visibility state has become hidden." || p.message === "Skipping view transition because viewport size changed." || p.message === "Transition was aborted because of invalid state") && (p = null);
              }
            p !== null && m(p);
          } finally {
            l(), n(), s();
          }
        }
      ), N.finished.finally(function() {
        for (var p = 0; p < M.length; p++)
          M[p].cancel();
        b.__reactViewTransition === N && (b.__reactViewTransition = null), f();
      }), N;
    } catch {
      return l(), n(), s(), null;
    }
  }
  function Hl(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Hl.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : P({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Hl.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, a = e.getAnimations({ subtree: !0 }), l = [], n = 0; n < a.length; n++) {
      var u = a[n].effect;
      u !== null && u.target === e && u.pseudoElement === t && l.push(a[n]);
    }
    return l;
  }, Hl.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function jm(e) {
    return {
      name: e,
      group: new Hl("group", e),
      imagePair: new Hl("image-pair", e),
      old: new Hl("old", e),
      new: new Hl("new", e)
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
        ), l.addEventListener("abort", n, { once: !0 }), n = l.removeEventListener.bind(l, "abort", n)), l = Tn(a), u.push({
          type: e,
          listener: t,
          optionsOrUseCapture: a,
          attachedListener: f,
          cleanup: n
        }), _(
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
    return B(e).addEventListener(
      t,
      a,
      l
    ), !1;
  }
  Ut.prototype.removeEventListener = function(e, t, a) {
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
      n = Tn(n.optionsOrUseCapture), _(
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
    return B(e).removeEventListener(
      t,
      a,
      l
    ), !1;
  }
  function Tn(e) {
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
  Ut.prototype.dispatchEvent = function(e) {
    var t = D(
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
            Tn(u.optionsOrUseCapture)
          );
        }
      if (t.appendChild(l), e = l.dispatchEvent(e), a)
        for (n = 0; n < a.length; n++)
          u = a[n], l.removeEventListener(
            u.type,
            u.attachedListener,
            Tn(u.optionsOrUseCapture)
          );
      return t.removeChild(l), e;
    }
    return t.dispatchEvent(e);
  }, Ut.prototype.focus = function(e) {
    _(
      this._fragmentFiber.child,
      !0,
      Em,
      e,
      void 0,
      void 0
    );
  };
  function Em(e, t) {
    return e.tag === 6 ? !1 : (e = B(e), i0(e, t));
  }
  Ut.prototype.focusLast = function(e) {
    var t = [];
    _(
      this._fragmentFiber.child,
      !0,
      to,
      t,
      void 0,
      void 0
    );
    for (var a = t.length - 1; 0 <= a && !Em(t[a], e); a--) ;
  };
  function to(e, t) {
    return t.push(e), !1;
  }
  Ut.prototype.blur = function() {
    var e = D(
      this._fragmentFiber
    );
    e !== null && (e = B(e), e = Au(e).activeElement, e !== null && _(
      this._fragmentFiber.child,
      !1,
      $y,
      e,
      void 0,
      void 0
    ));
  };
  function $y(e, t) {
    return e.tag === 6 ? !1 : (e = B(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Ut.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), _(
      this._fragmentFiber.child,
      !1,
      Fy,
      e,
      void 0,
      void 0
    );
  };
  function Fy(e, t) {
    return e.tag === 6 || (e = B(e), t.observe(e)), !1;
  }
  Ut.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), _(
        this._fragmentFiber.child,
        !1,
        Wy,
        e,
        void 0,
        void 0
      );
      for (var a = t = 0; a < ea.length; a++) {
        var l = ea[a];
        l.fragmentInstance === this && l.observer === e ? e.unobserve(l.instance) : ea[t++] = l;
      }
      ea.length = t;
    }
  };
  function Wy(e, t) {
    return e.tag === 6 || (e = B(e), t.unobserve(e)), !1;
  }
  var ea = [], ao = !1;
  function Iy(e, t, a) {
    ea.push({
      fragmentInstance: e,
      observer: t,
      instance: a
    }), ao || (ao = !0, c0(function() {
      ao = !1;
      var l = ea;
      ea = [];
      for (var n = 0; n < l.length; n++) {
        var u = l[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ut.prototype.getClientRects = function() {
    var e = [];
    return _(
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
      e = B(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Ut.prototype.getRootNode = function(e) {
    var t = D(
      this._fragmentFiber
    );
    return t === null ? this : B(t).getRootNode(e);
  }, Ut.prototype.compareDocumentPosition = function(e) {
    var t = D(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    _(
      this._fragmentFiber.child,
      !1,
      to,
      a,
      void 0,
      void 0
    );
    var l = B(t);
    if (a.length === 0) {
      if (a = l, C(this._fragmentFiber)) {
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
      return a === e ? n = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = U(t)[1], a === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (e = B(a).compareDocumentPosition(
        e
      ), n = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = B(a[0]), n = B(a[a.length - 1]);
    var u = C(this._fragmentFiber) ? t.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var s = t.compareDocumentPosition(e), f = n.compareDocumentPosition(e), m = s & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = l && u && s & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, t = l && t === e || u && n === e || m || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && t === e || !u && n === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || e0(
      t,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function e0(e, t, a, l, n) {
    var u = hl(n);
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
        for (u = t, t = D(t); u !== null; ) {
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
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!u) && !(t = u === a) && (t = Ye(
      a,
      u,
      Je
    ), t === null ? t = !1 : (_(
      t,
      !0,
      K,
      u,
      a
    ), u = X, X = null, t = u !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!u) && !(t = u === l) && (t = Ye(
      l,
      u,
      Je
    ), t === null ? t = !1 : (_(
      t,
      !0,
      pe,
      u,
      l
    ), u = X, re = X = null, t = u !== null)), t) : !1;
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
    _(
      this._fragmentFiber.child,
      !1,
      to,
      t,
      void 0,
      void 0
    );
    var a = e !== !1;
    if (t.length === 0) {
      var l = U(
        this._fragmentFiber
      );
      if (l = a ? l[1] || l[0] || D(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        e = B(l), Am(e, a);
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
      n.tag === 6 ? (n = B(n), Am(n, a)) : B(n).scrollIntoView(e), l += a ? -1 : 1;
    }
  };
  function t0(e, t) {
    return e = B(e), zm(e, t), !1;
  }
  function zm(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function wm(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.addEventListener(
          n.type,
          n.attachedListener,
          Tn(n.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(u) {
      for (var s = 0, f = 0; f < ea.length; f++) {
        var m = ea[f];
        (m.fragmentInstance !== t || m.observer !== u || m.instance !== e) && (ea[s++] = m);
      }
      ea.length = s, u.observe(e);
    }), zm(e, t));
  }
  function a0(e, t) {
    var a = t._eventListeners;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l];
        e.removeEventListener(
          n.type,
          n.attachedListener,
          Tn(n.optionsOrUseCapture)
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
  function lo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          lo(a), ui(a);
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
        if (!e[Vn])
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
  function n0(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Cm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function no(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function uo(e) {
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
  var io = null;
  function Dm(e) {
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
  function c0(e) {
    _m(function() {
      _m(function(t) {
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
  function Rm(e, t, a) {
    for (var l in a) {
      var n = a[l];
      a.hasOwnProperty(l) && n != null && Ae(e, t, l, null, Hy, n);
    }
    a.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === ia && (e.onclick = null), ui(e);
  }
  function co(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ui(e);
  }
  var Vt = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
  function zu(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ra = te.d;
  te.d = {
    f: s0,
    r: r0,
    D: o0,
    C: f0,
    L: d0,
    m: v0,
    X: h0,
    S: m0,
    M: g0
  };
  function s0() {
    var e = Ra.f(), t = sc();
    return e || t;
  }
  function r0(e) {
    var t = Ql(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ld(t) : Ra.r(e);
  }
  var Nn = typeof document > "u" ? null : document;
  function Hm(e, t, a) {
    var l = Nn;
    if (l && typeof t == "string" && t) {
      var n = Lt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Um.has(n) || (Um.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), ct(t, "link", e), We(t), l.head.appendChild(t)));
    }
  }
  function o0(e) {
    Ra.D(e), Hm("dns-prefetch", e, null);
  }
  function f0(e, t) {
    Ra.C(e, t), Hm("preconnect", e, t);
  }
  function d0(e, t, a) {
    Ra.L(e, t, a);
    var l = Nn;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + Lt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + Lt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + Lt(
        a.imageSizes
      ) + '"]')) : n += '[href="' + Lt(e) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = En(e);
          break;
        case "script":
          u = An(e);
      }
      if (!(Vt.has(u) || (e = P(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Vt.set(u, e), l.querySelector(n) !== null || t === "style" && l.querySelector(wu(u)) || t === "script" && l.querySelector(Cu(u))))) {
        var s = l.createElement("link");
        ct(s, "link", e), t === "style" && (s[ni] = !0, s.onload = s.onerror = function() {
          ko(s);
        }), We(s), l.head.appendChild(s);
      }
    }
  }
  function v0(e, t) {
    Ra.m(e, t);
    var a = Nn;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + Lt(l) + '"][href="' + Lt(e) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = An(e);
      }
      if (!Vt.has(u) && (e = P({ rel: "modulepreload", href: e }, t), Vt.set(u, e), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Cu(u)))
              return;
        }
        l = a.createElement("link"), ct(l, "link", e), We(l), a.head.appendChild(l);
      }
    }
  }
  function m0(e, t, a) {
    Ra.S(e, t, a);
    var l = Nn;
    if (l && e) {
      var n = Xl(l).hoistableStyles, u = En(e);
      t = t || "default";
      var s = n.get(u);
      if (!s) {
        var f = { loading: 0, preload: null };
        if (s = l.querySelector(
          wu(u)
        ))
          f.loading = 5;
        else {
          e = P(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Vt.get(u)) && so(e, a);
          var m = s = l.createElement("link");
          We(m), ct(m, "link", e), m._p = new Promise(function(b, N) {
            m.onload = b, m.onerror = N;
          }), m.addEventListener("load", function() {
            f.loading |= 1;
          }), m.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, hc(s, t, l);
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
  function h0(e, t) {
    Ra.X(e, t);
    var a = Nn;
    if (a && e) {
      var l = Xl(a).hoistableScripts, n = An(e), u = l.get(n);
      u || (u = a.querySelector(Cu(n)), u || (e = P({ src: e, async: !0 }, t), (t = Vt.get(n)) && ro(e, t), u = a.createElement("script"), We(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function g0(e, t) {
    Ra.M(e, t);
    var a = Nn;
    if (a && e) {
      var l = Xl(a).hoistableScripts, n = An(e), u = l.get(n);
      u || (u = a.querySelector(Cu(n)), u || (e = P({ src: e, async: !0, type: "module" }, t), (t = Vt.get(n)) && ro(e, t), u = a.createElement("script"), We(u), ct(u, "link", e), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Lm(e, t, a, l) {
    var n = (n = Ha.current) ? zu(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = En(a.href), t = Xl(
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
          var u = Xl(
            n
          ).hoistableStyles, s = u.get(e);
          if (s || (n = n.ownerDocument || n, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, s), (u = n.querySelector(
            wu(e)
          )) ? u._p || (s.instance = u, s.state.loading = 5) : (u = Vt.get(e), u || (u = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Vt.set(e, u)), y0(
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
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = An(a), t = Xl(
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
    return 'href="' + Lt(e) + '"';
  }
  function wu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qm(e) {
    return P({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function y0(e, t, a, l) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[ni] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[ni] = !0, t.onload = t.onerror = ko.bind(null, t), ct(t, "link", a), We(t), e.head.appendChild(t);
    l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function An(e) {
    return '[src="' + Lt(e) + '"]';
  }
  function Cu(e) {
    return "script[async]" + e;
  }
  function Bm(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Lt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, We(l), l;
          var n = P({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), We(l), ct(l, "style", n), hc(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = En(a.href);
          var u = e.querySelector(
            wu(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, We(u), u;
          l = qm(a), (n = Vt.get(n)) && so(l, n), u = (e.ownerDocument || e).createElement("link"), We(u);
          var s = u;
          return s._p = new Promise(function(f, m) {
            s.onload = f, s.onerror = m;
          }), ct(u, "link", l), t.state.loading |= 4, hc(u, a.precedence, e), t.instance = u;
        case "script":
          return u = An(a.src), (n = e.querySelector(
            Cu(u)
          )) ? (t.instance = n, We(n), n) : (l = a, (n = Vt.get(u)) && (l = P({}, a), ro(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), We(n), ct(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, hc(l, a.precedence, e));
    return t.instance;
  }
  function hc(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, s = 0; s < l.length; s++) {
      var f = l[s];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function so(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function ro(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var gc = null;
  function Ym(e, t, a) {
    if (gc === null) {
      var l = /* @__PURE__ */ new Map(), n = gc = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = gc, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[Vn] || u[at] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = u.getAttribute(t) || "";
        s = e + s;
        var f = l.get(s);
        f ? f.push(u) : l.set(s, [u]);
      }
    }
    return l;
  }
  function oo(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function _0(e, t, a) {
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
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = b0.bind(e), t.decode().then(e, e));
  }
  function p0(e, t, a, l) {
    if (a.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = En(l.href), u = t.querySelector(
          wu(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Du.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = u, We(u);
          return;
        }
        u = t.ownerDocument || t, l = qm(l), (n = Vt.get(n)) && so(l, n), u = u.createElement("link"), We(u);
        var s = u;
        s._p = new Promise(function(f, m) {
          s.onload = f, s.onerror = m;
        }), ct(u, "link", l), a.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = Du.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var yc = 0;
  function S0(e, t) {
    return e.stylesheets && e.count === 0 && pc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var l = setTimeout(function() {
        if (e.stylesheets && pc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && yc === 0 && (yc = 62500 * qy());
      var n = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && pc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > yc ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(n);
      };
    } : null;
  }
  function Vm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) pc(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Du() {
    this.count--, Vm(this);
  }
  function b0() {
    this.imgCount--, Vm(this);
  }
  var _c = null;
  function pc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, _c = /* @__PURE__ */ new Map(), t.forEach(x0, e), _c = null, Du.call(e));
  }
  function x0(e, t) {
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
      n = t.instance, s = n.getAttribute("data-precedence"), u = a.get(s) || l, u === l && a.set(null, n), a.set(s, n), this.count++, l = Du.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var zn = {
    $$typeof: He,
    Provider: null,
    Consumer: null,
    _currentValue: pa,
    _currentValue2: pa,
    _threadCount: 0
  };
  function j0(e, t, a, l, n, u, s, f, m) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Zc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zc(0), this.hiddenUpdates = Zc(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Km(e, t, a, l, n, u, s, f, m, b, N, M) {
    return e = new j0(
      e,
      t,
      a,
      s,
      m,
      b,
      N,
      M,
      f
    ), t = 1, u === !0 && (t |= 24), u = St(3, null, null, t), e.current = u, u.stateNode = e, t = Ns(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, ws(u), e;
  }
  function Jm(e) {
    return e ? (e = Pl, e) : Pl;
  }
  function km(e, t, a, l, n, u) {
    n = Jm(n), l.context === null ? l.context = n : l.pendingContext = n, l = Ja(t), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = ka(e, l, t), a !== null && (Tt(a, e, t), su(a, e, t));
  }
  function $m(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function fo(e, t) {
    $m(e, t), (e = e.alternate) && $m(e, t);
  }
  function Fm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = pl(e, 67108864);
      t !== null && Tt(t, e, 67108864), fo(e, 67108864);
    }
  }
  function Wm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Rt();
      t = Vc(t);
      var a = pl(e, t);
      a !== null && Tt(a, e, t), fo(e, t);
    }
  }
  var wn = !0;
  function T0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = te.p;
    try {
      te.p = 2, vo(e, t, a, l);
    } finally {
      te.p = u, k.T = n;
    }
  }
  function N0(e, t, a, l) {
    var n = k.T;
    k.T = null;
    var u = te.p;
    try {
      te.p = 8, vo(e, t, a, l);
    } finally {
      te.p = u, k.T = n;
    }
  }
  function vo(e, t, a, l) {
    if (wn) {
      var n = mo(l);
      if (n === null)
        Jr(
          e,
          t,
          l,
          Sc,
          a
        ), Pm(e, l);
      else if (A0(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Pm(e, l), t & 4 && -1 < E0.indexOf(e)) {
        for (; n !== null; ) {
          var u = Ql(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var s = ml(u.pendingLanes);
                  if (s !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; s; ) {
                      var m = 1 << 31 - At(s);
                      f.entanglements[1] |= m, s &= ~m;
                    }
                    ga(u), (je & 6) === 0 && (uc = Nt() + 500, Tu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = pl(u, 2), f !== null && Tt(f, u, 2), sc(), fo(u, 2);
            }
          if (u = mo(l), u === null && Jr(
            e,
            t,
            l,
            Sc,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        Jr(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function mo(e) {
    return e = Ic(e), ho(e);
  }
  var Sc = null;
  function ho(e) {
    if (Sc = null, e = hl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = j(t), e !== null) return e;
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
    return Sc = e, null;
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
        switch (qh()) {
          case Ho:
            return 2;
          case Lo:
            return 8;
          case Pu:
          case Bh:
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
  var go = !1, il = null, cl = null, sl = null, Ou = /* @__PURE__ */ new Map(), Mu = /* @__PURE__ */ new Map(), rl = [], E0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Pm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        il = null;
        break;
      case "dragenter":
      case "dragleave":
        cl = null;
        break;
      case "mouseover":
      case "mouseout":
        sl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ou.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Mu.delete(t.pointerId);
    }
  }
  function Ru(e, t, a, l, n, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = Ql(t), t !== null && Fm(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function A0(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return il = Ru(
          il,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return cl = Ru(
          cl,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return sl = Ru(
          sl,
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
          Ru(
            Ou.get(u) || null,
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Mu.set(
          u,
          Ru(
            Mu.get(u) || null,
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
    var t = hl(e.target);
    if (t !== null) {
      var a = h(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = j(a), t !== null) {
            e.blockedOn = t, Vo(e.priority, function() {
              Wm(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = w(a), t !== null) {
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
  function bc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = mo(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Wc = l, a.target.dispatchEvent(l), Wc = null;
      } else
        return t = Ql(a), t !== null && Fm(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function th(e, t, a) {
    bc(e) && a.delete(t);
  }
  function z0() {
    go = !1, il !== null && bc(il) && (il = null), cl !== null && bc(cl) && (cl = null), sl !== null && bc(sl) && (sl = null), Ou.forEach(th), Mu.forEach(th);
  }
  function xc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, go || (go = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      z0
    )));
  }
  var jc = null;
  function ah(e) {
    jc !== e && (jc = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        jc === e && (jc = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (ho(l || a) === null)
              continue;
            break;
          }
          var u = Ql(a);
          u !== null && (e.splice(t, 3), t -= 3, Fs(
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
  function Cn(e) {
    function t(m) {
      return xc(m, e);
    }
    il !== null && xc(il, e), cl !== null && xc(cl, e), sl !== null && xc(sl, e), Ou.forEach(t), Mu.forEach(t);
    for (var a = 0; a < rl.length; a++) {
      var l = rl[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < rl.length && (a = rl[0], a.blockedOn === null); )
      eh(a), a.blockedOn === null && rl.shift();
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
            else if (ho(n) !== null) continue;
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
  function yo(e) {
    this._internalRoot = e;
  }
  Tc.prototype.render = yo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var a = t.current, l = Rt();
    km(a, l, e, t, null, null);
  }, Tc.prototype.unmount = yo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      km(e.current, 2, null, e, null, null), sc(), t[Gl] = null;
    }
  };
  function Tc(e) {
    this._internalRoot = e;
  }
  Tc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Zo();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < rl.length && t !== 0 && t < rl[a].priority; a++) ;
      rl.splice(a, 0, e), a === 0 && eh(e);
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
  te.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = R(t), e = e !== null ? E(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var w0 = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Nc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Nc.isDisabled && Nc.supportsFiber)
      try {
        Qn = Nc.inject(
          w0
        ), Et = Nc;
      } catch {
      }
  }
  return Hu.createRoot = function(e, t) {
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
    ), e[Gl] = t.current, Kr(e), new yo(t);
  }, Hu.hydrateRoot = function(e, t, a) {
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
    ), t.context = Jm(null), a = t.current, l = Rt(), l = Vc(l), n = Ja(l), n.callback = null, ka(a, n, l), a = l, t.current.lanes = a, Zn(t, a), ga(t), e[Gl] = t.current, Kr(e), new Tc(t);
  }, Hu.version = "19.3.1", Hu;
}
var mh;
function B0() {
  if (mh) return po.exports;
  mh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), po.exports = q0(), po.exports;
}
var Y0 = B0(), z = Do();
const Eh = z.createContext(null);
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
function G0({ children: c }) {
  const [r, d] = z.useState(hh), o = z.useCallback(function() {
    d(hh());
  }, []), v = z.useCallback(
    async function(A) {
      await window.setActiveMasterContext(A), o();
    },
    [o]
  ), h = z.useCallback(function() {
    window.exitBetaMode();
  }, []), j = z.useCallback(
    function(A) {
      window.setThemeMode(A), o();
    },
    [o]
  );
  z.useEffect(
    function() {
      return window.addEventListener("theme-changed", o), function() {
        window.removeEventListener("theme-changed", o);
      };
    },
    [o]
  );
  const w = z.useMemo(
    function() {
      return Object.assign({}, r, {
        refresh: o,
        switchGroup: v,
        exitBeta: h,
        setThemeMode: j
      });
    },
    [r, o, v, h, j]
  );
  return /* @__PURE__ */ i.jsx(Eh.Provider, { value: w, children: c });
}
function _e() {
  const c = z.useContext(Eh);
  if (!c)
    throw new Error("useApp() must be called inside <AppProvider>");
  return c;
}
const Q0 = "_button_fpxiy_7", X0 = "_primary_fpxiy_22", Z0 = "_secondary_fpxiy_30", V0 = "_danger_fpxiy_39", K0 = "_spinner_fpxiy_52", J0 = "_labelLoading_fpxiy_61", Dn = {
  button: Q0,
  primary: X0,
  secondary: Z0,
  danger: V0,
  spinner: K0,
  labelLoading: J0
};
function G({
  variant: c = "primary",
  loading: r = !1,
  disabled: d = !1,
  children: o,
  className: v,
  ...h
}) {
  var j = c === "secondary" ? Dn.secondary : c === "danger" ? Dn.danger : Dn.primary;
  return /* @__PURE__ */ i.jsxs(
    "button",
    {
      className: [Dn.button, j, v].filter(Boolean).join(" "),
      disabled: d || r,
      "aria-busy": r || void 0,
      ...h,
      children: [
        r ? /* @__PURE__ */ i.jsx("span", { className: Dn.spinner, "aria-hidden": "true" }) : null,
        /* @__PURE__ */ i.jsx("span", { className: r ? Dn.labelLoading : void 0, children: o })
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
function Oo({ title: c, onClose: r, children: d }) {
  return z.useEffect(function() {
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
      children: /* @__PURE__ */ i.jsxs("div", { className: On.dialog, role: "dialog", "aria-modal": "true", "aria-label": c, children: [
        /* @__PURE__ */ i.jsxs("div", { className: On.header, children: [
          /* @__PURE__ */ i.jsx("h3", { className: On.title, children: c }),
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
const P0 = "_group_1wdnn_1", e1 = "_label_1wdnn_8", t1 = "_input_1wdnn_14", a1 = "_error_1wdnn_32", Lu = {
  group: P0,
  label: e1,
  input: t1,
  error: a1
};
function ce({ label: c, error: r, multiline: d = !1, id: o, ...v }) {
  var h = o || "field-" + (c == null ? void 0 : c.replace(/\s+/g, "-").toLowerCase());
  return /* @__PURE__ */ i.jsxs("div", { className: Lu.group, children: [
    c ? /* @__PURE__ */ i.jsx("label", { className: Lu.label, htmlFor: h, children: c }) : null,
    d ? /* @__PURE__ */ i.jsx("textarea", { id: h, className: Lu.input, ...v }) : /* @__PURE__ */ i.jsx("input", { id: h, className: Lu.input, ...v }),
    r ? /* @__PURE__ */ i.jsx("p", { className: Lu.error, children: r }) : null
  ] });
}
const l1 = "_header_1ozxo_1", n1 = "_title_1ozxo_12", u1 = "_subtitle_1ozxo_17", i1 = "_right_1ozxo_23", c1 = "_groupSelect_1ozxo_30", s1 = "_userBadge_1ozxo_39", r1 = "_points_1ozxo_43", fl = {
  header: l1,
  title: n1,
  subtitle: u1,
  right: i1,
  groupSelect: c1,
  userBadge: s1,
  points: r1
};
function o1() {
  var c = _e(), r = window.users[c.currentUser] || {}, [d, o] = z.useState(!1), [v, h] = z.useState(c.statusMessage), [j, w] = z.useState(!1);
  function A() {
    c.exitBeta();
  }
  function R() {
    c.setThemeMode(c.themeMode === "light" ? "dark" : "light");
  }
  function E() {
    c.exitBeta(), window.logout();
  }
  function _() {
    h(c.statusMessage), o(!0);
  }
  async function D(C) {
    C.preventDefault(), w(!0);
    try {
      await window.updateMyStatusMessage(v), c.refresh(), o(!1);
    } finally {
      w(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs("header", { className: fl.header, children: [
    /* @__PURE__ */ i.jsxs("div", { className: fl.left, children: [
      /* @__PURE__ */ i.jsx("h1", { className: fl.title, children: c.groupTerms.groupLabel }),
      /* @__PURE__ */ i.jsx("p", { className: fl.subtitle, children: "Beta dashboard" })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: fl.right, children: [
      c.myMasterOptions.length > 1 ? /* @__PURE__ */ i.jsx(
        "select",
        {
          className: fl.groupSelect,
          value: c.activeMasterContext,
          onChange: function(C) {
            c.switchGroup(C.target.value);
          },
          "aria-label": "Switch group",
          children: c.myMasterOptions.map(function(C) {
            var U = window.users[C];
            return /* @__PURE__ */ i.jsx("option", { value: C, children: U ? U.displayName : C }, C);
          })
        }
      ) : null,
      /* @__PURE__ */ i.jsx("span", { className: fl.userBadge, children: c.displayName }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: _, children: "✏️ Status" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: R, children: c.themeMode === "light" ? "🌙 Dark mode" : "☀️ Light mode" }),
      c.isMaster ? null : /* @__PURE__ */ i.jsxs("span", { className: fl.points, children: [
        r.points || 0,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: A, children: "Switch to classic styling" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: E, children: "Logout" })
    ] }),
    d ? /* @__PURE__ */ i.jsx(Oo, { title: "Set Status Message", onClose: function() {
      o(!1);
    }, children: /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Status message",
          value: v,
          onChange: function(C) {
            h(C.target.value);
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
const f1 = "_nav_c0zce_1", d1 = "_tab_c0zce_10", v1 = "_tabActive_c0zce_11", To = {
  nav: f1,
  tab: d1,
  tabActive: v1
};
function m1({ activeTab: c, onChange: r }) {
  var d = _e(), o = [
    { key: "tasks", label: "Tasks" },
    { key: "chat", label: "Chat" },
    { key: "calendar", label: "Calendar" }
  ];
  return d.isMaster && (o.push({ key: "overview", label: "Overview" }), o.push({ key: "dashboard", label: "Dashboard" }), o.push({ key: "tools", label: "Tools" })), d.isSlave ? o.push({ key: "suggest", label: "Suggest Task" }) : o.push({ key: "suggest", label: "Suggestions" }), o.push({ key: "shop", label: "Rewards Shop" }), d.isMaster && o.push({ key: "admin", label: "Admin Settings" }), d.isAdmin && o.push({ key: "masters", label: "Masters" }), /* @__PURE__ */ i.jsx("nav", { className: To.nav, "aria-label": "Main", children: o.map(function(v) {
    var h = v.key === c;
    return /* @__PURE__ */ i.jsx(
      "button",
      {
        className: h ? To.tabActive : To.tab,
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
function aa(c) {
  var r = c.table, d = c.select || "*", o = c.masterUsername, v = c.sort, h = c.enabled !== !1, [j, w] = z.useState([]), [A, R] = z.useState("loading"), [E, _] = z.useState(null), D = z.useRef(Math.random().toString(36).slice(2)).current, C = z.useCallback(
    async function() {
      if (!h || !o) {
        w([]), R("ready");
        return;
      }
      R("loading"), _(null);
      var U = window.supabase.from(r).select(d).eq("master_username", o), L = await U;
      if (L.error) {
        console.error("useRealtimeList(" + r + ") fetch error:", L.error), _(L.error), R("error");
        return;
      }
      var B = L.data || [];
      v && (B = B.slice().sort(v)), w(B), R("ready");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `sort` is a
    // fresh function each render by design; re-running on identity change
    // would re-fetch every render, so it's intentionally left out here.
    [r, d, o, h]
  );
  return z.useEffect(
    function() {
      if (C(), !(!h || !o)) {
        var U = window.supabase.channel("beta_" + r + "_" + o + "_" + D).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: r,
            filter: "master_username=eq." + o
          },
          function(L) {
            w(function(B) {
              var X = B;
              return L.eventType === "INSERT" ? X = [L.new].concat(B) : L.eventType === "UPDATE" ? X = B.map(function(re) {
                return re.id === L.old.id ? L.new : re;
              }) : L.eventType === "DELETE" && (X = B.filter(function(re) {
                return re.id !== L.old.id;
              })), v ? X.slice().sort(v) : X;
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(U);
        };
      }
    },
    [r, o, h, C]
  ), { items: j, status: A, error: E, reload: C };
}
function h1(c, r) {
  return new Date(r.createdAt) - new Date(c.createdAt);
}
function Rc() {
  var c = _e(), r = aa({
    table: "tasks",
    masterUsername: c.activeMasterContext,
    sort: h1
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
function g1() {
  var c = _e(), [r, d] = z.useState([]);
  return z.useEffect(
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
function $u() {
  var c = _e(), r = c.activeMasterContext, [d, o] = z.useState([]), [v, h] = z.useState("loading"), [j, w] = z.useState(null), A = z.useRef(Math.random().toString(36).slice(2)).current, R = z.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), w(null);
      var _ = await window.supabase.from("master_slave_relationships").select("slave_username, status").eq("master_username", r);
      if (_.error) {
        w(_.error), h("error");
        return;
      }
      var D = (_.data || []).map(function(K) {
        return K.slave_username;
      }), C = { data: [] }, U = { data: [] };
      D.length > 0 && (C = await window.supabase.from("userProfiles").select("username, points").eq("master_username", r), U = await window.supabase.from("users").select("username, display_name, status_message").in("username", D));
      var L = {};
      (C.data || []).forEach(function(K) {
        L[K.username] = K.points || 0;
      });
      var B = {}, X = {};
      (U.data || []).forEach(function(K) {
        B[K.username] = K.display_name || K.username, X[K.username] = K.status_message || "";
      });
      var re = (_.data || []).map(function(K) {
        return {
          username: K.slave_username,
          displayName: B[K.slave_username] || K.slave_username,
          statusMessage: X[K.slave_username] || "",
          points: L[K.slave_username] || 0,
          status: K.status
        };
      });
      o(re), h("ready");
    },
    [r]
  );
  z.useEffect(
    function() {
      if (R(), !!r) {
        var _ = window.supabase.channel("beta_slave_roster_" + r + "_" + A).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "userProfiles",
            filter: "master_username=eq." + r
          },
          function() {
            R();
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
            R();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(_);
        };
      }
    },
    [r, R]
  );
  var E = d.filter(function(_) {
    return _.status === "active";
  });
  return {
    slaves: E,
    allSlaves: d,
    status: v,
    error: j,
    reload: R
  };
}
const y1 = "_card_1j746_1", _1 = "_raised_1j746_8", gh = {
  card: y1,
  raised: _1
};
function he({ raised: c = !1, className: r, children: d, ...o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: [c ? gh.raised : gh.card, r].filter(Boolean).join(" "),
      ...o,
      children: d
    }
  );
}
const p1 = "_heading_1bkor_1", S1 = "_row_1bkor_11", b1 = "_checkboxRow_1bkor_31", x1 = "_select_1bkor_47", j1 = "_fieldset_1bkor_69", T1 = "_hint_1bkor_83", Ua = {
  heading: p1,
  row: S1,
  checkboxRow: b1,
  select: x1,
  fieldset: j1,
  hint: T1
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
function N1({ onCreated: c }) {
  var r = _e(), d = $u(), [o, v] = z.useState(yh), [h, j] = z.useState([]), [w, A] = z.useState(!1);
  function R(D, C) {
    v(function(U) {
      return Object.assign({}, U, { [D]: C });
    });
  }
  function E(D) {
    j(function(C) {
      return C.includes(D) ? C.filter(function(U) {
        return U !== D;
      }) : C.concat(D);
    });
  }
  async function _(D) {
    if (D.preventDefault(), !!o.text.trim()) {
      A(!0);
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
        }), v(yh), j([]), c && c();
      } finally {
        A(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Ua.heading, children: "Create New Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: _, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Task description",
          value: o.text,
          onChange: function(D) {
            R("text", D.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Ua.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: o.isDemerit,
            onChange: function(D) {
              R("isDemerit", D.target.checked);
            }
          }
        ),
        "This is a demerit (penalty only, no points)"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Ua.row, children: [
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Points",
            type: "number",
            min: "0",
            value: o.points,
            onChange: function(D) {
              R("points", D.target.value);
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
            onChange: function(D) {
              R("penaltyPoints", D.target.value);
            }
          }
        ),
        o.isDemerit ? null : /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Due date",
            type: "datetime-local",
            value: o.dueDate,
            onChange: function(D) {
              R("dueDate", D.target.value);
            }
          }
        )
      ] }),
      o.isDemerit ? null : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("label", { className: Ua.checkboxRow, children: [
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              checked: o.isRepeating,
              onChange: function(D) {
                R("isRepeating", D.target.checked);
              }
            }
          ),
          "Repeats"
        ] }),
        o.isRepeating ? /* @__PURE__ */ i.jsxs(
          "select",
          {
            className: Ua.select,
            value: o.repeatInterval,
            onChange: function(D) {
              R("repeatInterval", D.target.value);
            },
            children: [
              /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
              /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
              /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
            ]
          }
        ) : null
      ] }),
      /* @__PURE__ */ i.jsxs("fieldset", { className: Ua.fieldset, children: [
        /* @__PURE__ */ i.jsxs("legend", { children: [
          "Assign to ",
          r.groupTerms.slaveLabelPlural
        ] }),
        d.slaves.length === 0 ? /* @__PURE__ */ i.jsxs("p", { className: Ua.hint, children: [
          "No ",
          r.groupTerms.slaveLabelPlural,
          " added yet."
        ] }) : d.slaves.map(function(D) {
          return /* @__PURE__ */ i.jsxs("label", { className: Ua.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: h.includes(D.username),
                onChange: function() {
                  E(D.username);
                }
              }
            ),
            D.displayName
          ] }, D.username);
        })
      ] }),
      !o.isDemerit && h.length > 1 ? /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: Ua.select,
          value: o.assignmentMode,
          onChange: function(D) {
            R("assignmentMode", D.target.value);
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
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: w, disabled: !o.text.trim(), children: o.isDemerit ? "Issue Demerit" : "Create Task" })
    ] })
  ] });
}
const E1 = "_wrap_1qfmw_1", A1 = "_spinner_1qfmw_10", _h = {
  wrap: E1,
  spinner: A1
};
function kt({ label: c = "Loading..." }) {
  return /* @__PURE__ */ i.jsxs("div", { className: _h.wrap, role: "status", children: [
    /* @__PURE__ */ i.jsx("span", { className: _h.spinner, "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("span", { children: c })
  ] });
}
const z1 = "_wrap_buujm_1", w1 = "_message_buujm_9", ph = {
  wrap: z1,
  message: w1
};
function la({ message: c = "Something went wrong.", onRetry: r }) {
  return /* @__PURE__ */ i.jsxs("div", { className: ph.wrap, role: "alert", children: [
    /* @__PURE__ */ i.jsx("p", { className: ph.message, children: c }),
    r ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: r, children: "Try again" }) : null
  ] });
}
const C1 = "_wrap_mx4zv_1", D1 = "_icon_mx4zv_7", O1 = "_title_mx4zv_12", M1 = "_hint_mx4zv_18", Ec = {
  wrap: C1,
  icon: D1,
  title: O1,
  hint: M1
};
function Ue({ icon: c = "—", title: r, hint: d }) {
  return /* @__PURE__ */ i.jsxs("div", { className: Ec.wrap, children: [
    /* @__PURE__ */ i.jsx("div", { className: Ec.icon, "aria-hidden": "true", children: c }),
    /* @__PURE__ */ i.jsx("p", { className: Ec.title, children: r }),
    d ? /* @__PURE__ */ i.jsx("p", { className: Ec.hint, children: d }) : null
  ] });
}
const R1 = "_badge_1988s_1", U1 = "_neutral_1988s_10", H1 = "_success_1988s_15", L1 = "_warning_1988s_20", q1 = "_danger_1988s_25", qu = {
  badge: R1,
  neutral: U1,
  success: H1,
  warning: L1,
  danger: q1
};
function _t({ tone: c = "neutral", children: r }) {
  var d = c === "success" ? qu.success : c === "warning" ? qu.warning : c === "danger" ? qu.danger : qu.neutral;
  return /* @__PURE__ */ i.jsx("span", { className: [qu.badge, d].join(" "), children: r });
}
function Ah(c) {
  return window.getStatusText(c.status, c.isOverdue, c.type, c.appealStatus);
}
function zh(c) {
  return c.type === "demerit" ? c.appealStatus === "pending" ? "warning" : c.appealStatus === "approved" ? "success" : (c.appealStatus === "denied", "danger") : c.isOverdue ? "danger" : c.status === "completed" ? "success" : c.status === "failed" ? "danger" : c.status === "pending_approval" ? "warning" : "neutral";
}
const B1 = "_item_v1inl_1", Y1 = "_header_v1inl_5", G1 = "_text_v1inl_11", Q1 = "_meta_v1inl_16", X1 = "_appealText_v1inl_33", Z1 = "_actions_v1inl_41", Mn = {
  item: B1,
  header: Y1,
  text: G1,
  meta: Q1,
  appealText: X1,
  actions: Z1
};
function V1({ task: c, actions: r }) {
  var d = _e(), o = window.users[c.assignedTo], v = c.type === "cost-tracker", h = v ? window.extractTotalFromTaskText(c.text) : null;
  return /* @__PURE__ */ i.jsxs(he, { className: Mn.item, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Mn.header, children: [
      /* @__PURE__ */ i.jsx(_t, { tone: zh(c), children: Ah(c) }),
      c.type === "demerit" ? /* @__PURE__ */ i.jsx(_t, { tone: "danger", children: "Demerit" }) : null
    ] }),
    /* @__PURE__ */ i.jsx("p", { className: Mn.text, children: v ? c.text.split(`
`)[0] : c.text }),
    /* @__PURE__ */ i.jsxs("dl", { className: Mn.meta, children: [
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
    c.appealText ? /* @__PURE__ */ i.jsxs("p", { className: Mn.appealText, children: [
      /* @__PURE__ */ i.jsx("strong", { children: "Appeal reason:" }),
      " ",
      c.appealText
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: Mn.actions, children: [
      d.isSlave && !v && c.type !== "demerit" && c.assignedTo === d.currentUser && c.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
        r.checkOffTask(c.id);
      }, children: "Mark complete" }) : null,
      d.isSlave && c.type === "demerit" && c.status === "demerit_issued" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.acceptDemerit(c.id);
        }, children: "Accept" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          r.appealDemerit(c.id);
        }, children: "Appeal" })
      ] }) : null,
      d.isSlave && v && c.status === "todo" ? /* @__PURE__ */ i.jsx(G, { onClick: function() {
        r.markInvoiceAsPaid(c.id);
      }, children: "Mark invoice as paid" }) : null,
      d.isMaster && c.status === "pending_approval" && v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveInvoice(c.id);
        }, children: "Approve payment" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.rejectTask(c.id);
        }, children: "Deny payment" })
      ] }) : null,
      d.isMaster && c.status === "pending_approval" && !v ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveTask(c.id);
        }, children: "Approve" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.rejectTask(c.id);
        }, children: "Reject & penalize" })
      ] }) : null,
      d.isMaster && c.type === "demerit" && c.appealStatus === "pending" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsx(G, { onClick: function() {
          r.approveAppeal(c.id);
        }, children: "Approve appeal" }),
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          r.denyAppeal(c.id);
        }, children: "Deny appeal (2x penalty)" })
      ] }) : null,
      d.isMaster ? /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        r.deleteTask(c.id);
      }, children: "Delete" }) : null
    ] })
  ] });
}
function Ac({ tasks: c, status: r, error: d, onRetry: o, actions: v, emptyLabel: h }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading tasks..." }) : r === "error" ? /* @__PURE__ */ i.jsx(
    la,
    {
      message: "Couldn't load tasks: " + (d ? d.message : "unknown error"),
      onRetry: o
    }
  ) : c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { icon: "✓", title: h || "No tasks yet" }) : /* @__PURE__ */ i.jsx("div", { children: c.map(function(j) {
    return /* @__PURE__ */ i.jsx(V1, { task: j, actions: v }, j.id);
  }) });
}
const K1 = "_section_7c868_1", J1 = "_heading_7c868_5", Rn = {
  section: K1,
  heading: J1
};
function k1() {
  var c = _e(), r = Rc(), d = g1(), o = {
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
    var v = r.tasks.filter(function(w) {
      return w.assignedTo === c.currentUser || d.includes(w.id);
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
  var h = r.tasks.filter(function(w) {
    return w.type === "demerit" && w.appealStatus === "pending";
  }), j = r.tasks.filter(function(w) {
    return w.status === "pending_approval";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(N1, { onCreated: r.reload }),
    h.length > 0 ? /* @__PURE__ */ i.jsxs(he, { className: Rn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Rn.heading, children: "Pending Appeals" }),
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
    j.length > 0 ? /* @__PURE__ */ i.jsxs(he, { className: Rn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Rn.heading, children: "Pending Approval" }),
      /* @__PURE__ */ i.jsx(
        Ac,
        {
          tasks: j,
          status: "ready",
          actions: o,
          emptyLabel: "Nothing pending"
        }
      )
    ] }) : null,
    /* @__PURE__ */ i.jsxs(he, { className: Rn.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Rn.heading, children: "All Tasks" }),
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
const $1 = "_day_1bhqz_1", F1 = "_dayHeading_1bhqz_5", W1 = "_item_1bhqz_13", I1 = "_text_1bhqz_17", P1 = "_meta_1bhqz_21", Un = {
  day: $1,
  dayHeading: F1,
  item: W1,
  text: I1,
  meta: P1
};
function e_(c) {
  return new Date(c).toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function t_() {
  var c = _e(), r = Rc();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx(kt, { label: "Loading tasks..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(la, { message: r.error ? r.error.message : "", onRetry: r.reload });
  var d = r.tasks.filter(function(v) {
    return v.dueDate ? c.isSlave ? v.assignedTo === c.currentUser : !0 : !1;
  });
  if (d.length === 0)
    return /* @__PURE__ */ i.jsx(Ue, { title: "No upcoming due dates" });
  var o = {};
  return d.slice().sort(function(v, h) {
    return new Date(v.dueDate) - new Date(h.dueDate);
  }).forEach(function(v) {
    var h = e_(v.dueDate);
    o[h] = o[h] || [], o[h].push(v);
  }), /* @__PURE__ */ i.jsx("div", { children: Object.keys(o).map(function(v) {
    return /* @__PURE__ */ i.jsxs("section", { className: Un.day, children: [
      /* @__PURE__ */ i.jsx("h3", { className: Un.dayHeading, children: v }),
      o[v].map(function(h) {
        var j = window.users[h.assignedTo];
        return /* @__PURE__ */ i.jsxs(he, { className: Un.item, children: [
          /* @__PURE__ */ i.jsx(_t, { tone: zh(h), children: Ah(h) }),
          /* @__PURE__ */ i.jsx("p", { className: Un.text, children: h.text }),
          !c.isSlave && h.assignedTo ? /* @__PURE__ */ i.jsxs("p", { className: Un.meta, children: [
            "Assigned to ",
            j ? j.displayName : h.assignedTo
          ] }) : null,
          /* @__PURE__ */ i.jsxs("p", { className: Un.meta, children: [
            "Due ",
            window.formatDate(h.dueDate)
          ] })
        ] }, h.id);
      })
    ] }, v);
  }) });
}
function a_(c, r) {
  return new Date(r.timestamp) - new Date(c.timestamp);
}
function wh() {
  var c = _e(), r = aa({
    table: "userActivity",
    masterUsername: c.activeMasterContext,
    sort: a_
  });
  return {
    activity: r.items.slice(0, 50),
    status: r.status,
    error: r.error,
    reload: r.reload
  };
}
const l_ = "_row_qtrye_1", n_ = "_tile_qtrye_8", u_ = "_number_qtrye_12", i_ = "_label_qtrye_17", zc = {
  row: l_,
  tile: n_,
  number: u_,
  label: i_
};
function c_({ stats: c }) {
  return /* @__PURE__ */ i.jsx("div", { className: zc.row, children: c.map(function(r) {
    return /* @__PURE__ */ i.jsxs(he, { className: zc.tile, children: [
      /* @__PURE__ */ i.jsx("div", { className: zc.number, children: r.value }),
      /* @__PURE__ */ i.jsx("div", { className: zc.label, children: r.label })
    ] }, r.label);
  }) });
}
const s_ = "_list_azyhi_1", r_ = "_row_azyhi_7", o_ = "_positive_azyhi_13", f_ = "_zero_azyhi_18", d_ = "_negative_azyhi_23", ku = {
  list: s_,
  row: r_,
  positive: o_,
  zero: f_,
  negative: d_
};
function v_(c) {
  return c < 0 ? ku.negative : c === 0 ? ku.zero : ku.positive;
}
function m_({ slaves: c }) {
  var r = _e();
  return c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No " + r.groupTerms.slaveLabelPlural + " to display" }) : /* @__PURE__ */ i.jsx("div", { className: ku.list, children: c.map(function(d) {
    return /* @__PURE__ */ i.jsxs(he, { className: ku.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.displayName }),
      /* @__PURE__ */ i.jsxs("span", { className: v_(d.points), children: [
        d.points,
        " pts"
      ] })
    ] }, d.username);
  }) });
}
const h_ = "_heading_1mu37_1", g_ = "_form_1mu37_6", y_ = "_select_1mu37_13", No = {
  heading: h_,
  form: g_,
  select: y_
};
function __({ slaves: c }) {
  var r = _e(), [d, o] = z.useState(c[0] ? c[0].username : ""), [v, h] = z.useState(0);
  z.useEffect(
    function() {
      var w = c.find(function(A) {
        return A.username === d;
      });
      w ? h(w.points) : c[0] && o(c[0].username);
    },
    [c, d]
  );
  async function j(w) {
    if (w.preventDefault(), !!d) {
      var A = c.find(function(E) {
        return E.username === d;
      }), R = A ? A.points : 0;
      await window.updateUserPoints(d, Number(v) || 0, "set"), window.showNotification(
        (A ? A.displayName : d) + " points changed from " + R + " to " + (Number(v) || 0),
        "success"
      );
    }
  }
  return c.length === 0 ? null : /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsxs("h3", { className: No.heading, children: [
      "Set ",
      r.groupTerms.slaveLabel,
      " points"
    ] }),
    /* @__PURE__ */ i.jsxs("form", { className: No.form, onSubmit: j, children: [
      /* @__PURE__ */ i.jsx(
        "select",
        {
          className: No.select,
          value: d,
          onChange: function(w) {
            o(w.target.value);
          },
          "aria-label": "Select " + r.groupTerms.slaveLabel,
          children: c.map(function(w) {
            return /* @__PURE__ */ i.jsx("option", { value: w.username, children: w.displayName }, w.username);
          })
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "New points",
          type: "number",
          value: v,
          onChange: function(w) {
            h(w.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Set" })
    ] })
  ] });
}
const p_ = "_list_1jial_1", S_ = "_item_1jial_10", b_ = "_user_1jial_16", x_ = "_details_1jial_20", j_ = "_time_1jial_24", Hn = {
  list: p_,
  item: S_,
  user: b_,
  details: x_,
  time: j_
};
function T_({ activity: c, status: r, error: d, onRetry: o }) {
  return r === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading activity..." }) : r === "error" ? /* @__PURE__ */ i.jsx(la, { message: d ? d.message : "", onRetry: o }) : c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No recent activity" }) : /* @__PURE__ */ i.jsx("ul", { className: Hn.list, children: c.map(function(v, h) {
    var j = window.users[v.user];
    return /* @__PURE__ */ i.jsxs("li", { className: Hn.item, children: [
      /* @__PURE__ */ i.jsx("span", { className: Hn.user, children: j ? j.displayName : v.user }),
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
const N_ = "_grid_69ji7_1", E_ = "_section_69ji7_8", A_ = "_heading_69ji7_12", Bu = {
  grid: N_,
  section: E_,
  heading: A_
};
function z_() {
  var c = _e(), r = Rc(), d = $u(), o = wh(), v = r.tasks, h = [
    { label: "Total Tasks", value: v.length },
    {
      label: "Pending",
      value: v.filter(function(j) {
        return j.status === "pending_approval";
      }).length
    },
    {
      label: "Completed",
      value: v.filter(function(j) {
        return j.status === "completed";
      }).length
    },
    { label: c.groupTerms.slaveLabelPlural, value: d.slaves.length }
  ];
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(c_, { stats: h }),
    /* @__PURE__ */ i.jsxs("div", { className: Bu.grid, children: [
      /* @__PURE__ */ i.jsxs(he, { className: Bu.section, children: [
        /* @__PURE__ */ i.jsxs("h2", { className: Bu.heading, children: [
          c.groupTerms.slaveLabel,
          " Progress"
        ] }),
        /* @__PURE__ */ i.jsx(m_, { slaves: d.slaves })
      ] }),
      /* @__PURE__ */ i.jsx(__, { slaves: d.slaves })
    ] }),
    /* @__PURE__ */ i.jsxs(he, { className: Bu.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Bu.heading, children: "Recent Activity" }),
      /* @__PURE__ */ i.jsx(
        T_,
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
function w_(c, r) {
  return new Date(r.createdAt) - new Date(c.createdAt);
}
function Ch() {
  var c = _e(), r = aa({
    table: "suggestions",
    masterUsername: c.activeMasterContext,
    sort: w_
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
function C_({ onSubmit: c }) {
  var [r, d] = z.useState(Sh), [o, v] = z.useState(!1);
  function h(w, A) {
    d(function(R) {
      return Object.assign({}, R, { [w]: A });
    });
  }
  async function j(w) {
    if (w.preventDefault(), !!r.description.trim()) {
      v(!0);
      try {
        await c(r), d(Sh);
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggest a Task" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: j, children: [
      /* @__PURE__ */ i.jsx(
        ce,
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
        ce,
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
        ce,
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
        ce,
        {
          label: "Suggested due date (optional)",
          type: "datetime-local",
          value: r.dueDate,
          onChange: function(w) {
            h("dueDate", w.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: o, disabled: !r.description.trim(), children: "Submit suggestion" })
    ] })
  ] });
}
const D_ = "_card_q0jnd_1", O_ = "_badgeRow_q0jnd_5", M_ = "_description_q0jnd_11", R_ = "_justification_q0jnd_15", U_ = "_metaLine_q0jnd_21", H_ = "_actions_q0jnd_27", Ln = {
  card: D_,
  badgeRow: O_,
  description: M_,
  justification: R_,
  metaLine: U_,
  actions: H_
};
function L_(c) {
  return c === "pending" ? "warning" : c === "rejected" ? "danger" : "success";
}
function bh({ suggestion: c, forAdmin: r, onApprove: d, onEdit: o, onReject: v }) {
  var h = window.users[c.reviewedBy];
  return /* @__PURE__ */ i.jsxs(he, { className: Ln.card, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Ln.badgeRow, children: [
      /* @__PURE__ */ i.jsx(_t, { tone: L_(c.status), children: c.status }),
      /* @__PURE__ */ i.jsxs(_t, { tone: "neutral", children: [
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
      /* @__PURE__ */ i.jsx(G, { onClick: function() {
        d(c.id);
      }, children: "Approve" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
        o(c.id);
      }, children: "Edit & approve" }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        v(c.id);
      }, children: "Reject" })
    ] }) : null
  ] });
}
function q_() {
  var c = _e(), r = Ch();
  if (r.status === "loading") return /* @__PURE__ */ i.jsx(kt, { label: "Loading suggestions..." });
  if (r.status === "error")
    return /* @__PURE__ */ i.jsx(
      la,
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
      /* @__PURE__ */ i.jsx(C_, { onSubmit: r.submitSuggestion }),
      /* @__PURE__ */ i.jsx("h2", { style: { marginTop: "var(--space-5)" }, children: "My Suggestions" }),
      d.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No suggestions submitted yet" }) : d.map(function(v) {
        return /* @__PURE__ */ i.jsx(bh, { suggestion: v, forAdmin: !1 }, v.id);
      })
    ] });
  }
  var o = r.suggestions.filter(function(v) {
    return v.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Suggested Tasks" }),
    o.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No suggestions pending review" }) : o.map(function(v) {
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
function B_(c, r) {
  return c.title.localeCompare(r.title);
}
function Y_(c, r) {
  return new Date(r.purchaseDate) - new Date(c.purchaseDate);
}
function G_() {
  var c = _e(), r = c.activeMasterContext, d = aa({
    table: "rewards",
    masterUsername: r,
    sort: B_
  }), o = aa({
    table: "userRewardPurchases",
    select: "*, rewards(title, cost, type)",
    masterUsername: r,
    sort: Y_
  }), [v, h] = z.useState(xh), [j, w] = z.useState("loading"), A = z.useRef(Math.random().toString(36).slice(2)).current, R = z.useCallback(
    async function() {
      if (r) {
        w("loading");
        var E = await window.supabase.from("rewardSystemSettings").select("*").eq("master_username", r).limit(1);
        if (E.error) {
          w("error");
          return;
        }
        h(
          E.data && E.data.length > 0 ? E.data[0] : xh
        ), w("ready");
      }
    },
    [r]
  );
  return z.useEffect(
    function() {
      if (R(), !!r) {
        var E = window.supabase.channel("beta_reward_settings_" + r + "_" + A).on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rewardSystemSettings",
            filter: "master_username=eq." + r
          },
          function() {
            R();
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(E);
        };
      }
    },
    [r, R]
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
    addReward: function(E, _, D, C) {
      return window.addReward(E, _, D, C);
    },
    updateReward: function(E, _, D, C, U) {
      return window.updateReward(E, _, D, C, U);
    },
    deleteReward: function(E) {
      return window.deleteReward(E);
    },
    purchaseReward: function(E) {
      return window.purchaseReward(E);
    },
    authorizePurchase: function(E) {
      return window.authorizePurchase(E);
    },
    denyPurchase: function(E) {
      return window.denyPurchase(E);
    },
    resetInstantPurchaseLimit: function() {
      return window.resetInstantPurchaseLimit();
    },
    updateRewardSystemSettings: function(E, _, D) {
      return window.updateRewardSystemSettings(E, _, D);
    }
  };
}
const Q_ = "_card_1tc0o_1", X_ = "_title_1tc0o_7", Z_ = "_description_1tc0o_12", V_ = "_badgeRow_1tc0o_19", K_ = "_actions_1tc0o_24", Yu = {
  card: Q_,
  title: X_,
  description: Z_,
  badgeRow: V_,
  actions: K_
};
function Dh({ reward: c, onPurchase: r, onEdit: d, onDelete: o, isAdmin: v }) {
  return /* @__PURE__ */ i.jsxs(he, { className: Yu.card, children: [
    /* @__PURE__ */ i.jsx("h3", { className: Yu.title, children: c.title }),
    /* @__PURE__ */ i.jsx("p", { className: Yu.description, children: c.description }),
    /* @__PURE__ */ i.jsxs("div", { className: Yu.badgeRow, children: [
      /* @__PURE__ */ i.jsxs(_t, { tone: "neutral", children: [
        c.cost,
        " points"
      ] }),
      /* @__PURE__ */ i.jsx(_t, { tone: c.type === "instant" ? "success" : "warning", children: c.type === "instant" ? "Instant" : "Needs authorization" })
    ] }),
    v ? /* @__PURE__ */ i.jsxs("div", { className: Yu.actions, children: [
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
        d(c);
      }, children: "Edit" }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
        o(c.id);
      }, children: "Delete" })
    ] }) : /* @__PURE__ */ i.jsx(G, { onClick: function() {
      r(c.id);
    }, children: "Purchase" })
  ] });
}
const J_ = "_grid_19ohq_1", k_ = "_purchasesHeading_19ohq_7", $_ = "_purchaseCard_19ohq_11", F_ = "_badgeRow_19ohq_15", W_ = "_purchaseTitle_19ohq_19", I_ = "_purchaseMeta_19ohq_24", Ll = {
  grid: J_,
  purchasesHeading: k_,
  purchaseCard: $_,
  badgeRow: F_,
  purchaseTitle: W_,
  purchaseMeta: I_
};
function P_(c) {
  return c === "denied" ? "danger" : c === "pending_authorization" ? "warning" : "success";
}
function ep({ rewards: c, rewardsStatus: r, rewardsError: d, onRetry: o, onPurchase: v, purchases: h }) {
  var j = _e(), w = h.filter(function(A) {
    return A.userId === j.currentUser;
  });
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx("h2", { children: "Rewards Shop" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading rewards..." }) : r === "error" ? /* @__PURE__ */ i.jsx(la, { message: d ? d.message : "Failed to load", onRetry: o }) : c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No rewards available" }) : /* @__PURE__ */ i.jsx("div", { className: Ll.grid, children: c.map(function(A) {
      return /* @__PURE__ */ i.jsx(Dh, { reward: A, onPurchase: v }, A.id);
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Ll.purchasesHeading, children: "My Reward Purchases" }),
    w.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No purchases yet" }) : w.map(function(A) {
      return /* @__PURE__ */ i.jsxs(he, { className: Ll.purchaseCard, children: [
        /* @__PURE__ */ i.jsx("div", { className: Ll.badgeRow, children: /* @__PURE__ */ i.jsx(_t, { tone: P_(A.status), children: A.status.replace(/_/g, " ") }) }),
        /* @__PURE__ */ i.jsx("p", { className: Ll.purchaseTitle, children: A.rewards ? A.rewards.title : "Unknown reward" }),
        /* @__PURE__ */ i.jsxs("p", { className: Ll.purchaseMeta, children: [
          A.purchaseCost,
          " points · ",
          window.formatDate(A.purchaseDate)
        ] }),
        A.status === "denied" && A.notes ? /* @__PURE__ */ i.jsxs("p", { className: Ll.purchaseMeta, children: [
          "Reason: ",
          A.notes
        ] }) : null
      ] }, A.id);
    })
  ] });
}
const tp = "_heading_p82cd_1", ap = "_row_p82cd_6", lp = "_selectGroup_p82cd_16", np = "_selectLabel_p82cd_23", up = "_select_p82cd_16", ip = "_actions_p82cd_38", qn = {
  heading: tp,
  row: ap,
  selectGroup: lp,
  selectLabel: np,
  select: up,
  actions: ip
};
var Eo = { title: "", description: "", cost: 10, type: "instant" };
function cp({ editingReward: c, onSave: r, onCancelEdit: d }) {
  var [o, v] = z.useState(Eo), [h, j] = z.useState(!1);
  z.useEffect(
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
  function w(R, E) {
    v(function(_) {
      return Object.assign({}, _, { [R]: E });
    });
  }
  async function A(R) {
    if (R.preventDefault(), !(!o.title.trim() || !o.cost || Number(o.cost) < 1)) {
      j(!0);
      try {
        await r(o, c ? c.id : null), v(Eo);
      } finally {
        j(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: qn.heading, children: c ? "Edit Reward" : "Add Reward" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: A, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Title",
          value: o.title,
          onChange: function(R) {
            w("title", R.target.value);
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
          onChange: function(R) {
            w("description", R.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: qn.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Cost (points)",
            type: "number",
            min: "1",
            value: o.cost,
            onChange: function(R) {
              w("cost", R.target.value);
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
              onChange: function(R) {
                w("type", R.target.value);
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
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: h, children: c ? "Save changes" : "Add reward" }),
        c ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const sp = "_heading_26k11_1", rp = "_row_26k11_6", op = "_checkboxRow_26k11_16", fp = "_readout_26k11_24", dp = "_actions_26k11_30", Bn = {
  heading: sp,
  row: rp,
  checkboxRow: op,
  readout: fp,
  actions: dp
};
function vp({ settings: c, onSave: r, onReset: d }) {
  var [o, v] = z.useState(c.instantPurchaseLimit || 0), [h, j] = z.useState(c.resetDurationDays || 0), [w, A] = z.useState(c.requiresAuthorizationAfterLimit !== !1);
  z.useEffect(
    function() {
      v(c.instantPurchaseLimit || 0), j(c.resetDurationDays || 0), A(c.requiresAuthorizationAfterLimit !== !1);
    },
    [c]
  );
  function R(E) {
    E.preventDefault(), r(Number(o) || 0, Number(h) || 0, w);
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Bn.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: R, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Bn.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Instant purchase limit (total points)",
            type: "number",
            min: "0",
            value: o,
            onChange: function(E) {
              v(E.target.value);
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
            onChange: function(E) {
              j(E.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: Bn.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: w,
            onChange: function(E) {
              A(E.target.checked);
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
        /* @__PURE__ */ i.jsx(G, { type: "submit", children: "Update settings" }),
        /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: d, children: "Reset instant spend now" })
      ] })
    ] })
  ] });
}
const mp = "_card_zkx61_1", hp = "_title_zkx61_5", gp = "_meta_zkx61_10", yp = "_actions_zkx61_16", wc = {
  card: mp,
  title: hp,
  meta: gp,
  actions: yp
};
function _p({ purchases: c, onAuthorize: r, onDeny: d }) {
  var o = c.filter(function(v) {
    return v.status === "pending_authorization";
  });
  return o.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No pending authorizations" }) : /* @__PURE__ */ i.jsx("div", { children: o.map(function(v) {
    var h = window.users[v.userId];
    return /* @__PURE__ */ i.jsxs(he, { className: wc.card, children: [
      /* @__PURE__ */ i.jsxs("p", { className: wc.title, children: [
        v.rewards ? v.rewards.title : "Unknown reward",
        " by",
        " ",
        h ? h.displayName : v.userId
      ] }),
      /* @__PURE__ */ i.jsxs("p", { className: wc.meta, children: [
        v.purchaseCost,
        " points · requested ",
        window.formatDate(v.purchaseDate)
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: wc.actions, children: [
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
const pp = "_heading_1ewsp_1", Sp = "_grid_1ewsp_5", Cc = {
  heading: pp,
  grid: Sp
};
function bp({ rewardsState: c }) {
  var [r, d] = z.useState(null);
  async function o(h, j) {
    j ? await c.updateReward(j, h.title, h.description, Number(h.cost), h.type) : await c.addReward(h.title, h.description, Number(h.cost), h.type), d(null);
  }
  function v(h) {
    window.showConfirmModal("Delete this reward?", function(j) {
      j && c.deleteReward(h);
    });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      cp,
      {
        editingReward: r,
        onSave: o,
        onCancelEdit: function() {
          d(null);
        }
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Cc.heading, children: "Current Rewards" }),
    c.rewardsStatus === "loading" ? /* @__PURE__ */ i.jsx(kt, {}) : c.rewardsStatus === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: c.rewardsError ? c.rewardsError.message : "",
        onRetry: c.reloadRewards
      }
    ) : c.rewards.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No rewards defined" }) : /* @__PURE__ */ i.jsx("div", { className: Cc.grid, children: c.rewards.map(function(h) {
      return /* @__PURE__ */ i.jsx(
        Dh,
        {
          reward: h,
          isAdmin: !0,
          onEdit: d,
          onDelete: v
        },
        h.id
      );
    }) }),
    /* @__PURE__ */ i.jsx("h2", { className: Cc.heading, children: "Reward System Settings" }),
    /* @__PURE__ */ i.jsx(
      vp,
      {
        settings: c.settings,
        onSave: c.updateRewardSystemSettings,
        onReset: c.resetInstantPurchaseLimit
      }
    ),
    /* @__PURE__ */ i.jsx("h2", { className: Cc.heading, children: "Pending Reward Authorizations" }),
    /* @__PURE__ */ i.jsx(
      _p,
      {
        purchases: c.purchases,
        onAuthorize: c.authorizePurchase,
        onDeny: c.denyPurchase
      }
    )
  ] });
}
function xp() {
  var c = _e(), r = G_();
  return c.isMaster ? /* @__PURE__ */ i.jsx(bp, { rewardsState: r }) : /* @__PURE__ */ i.jsx(
    ep,
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
const jp = "_heading_pc1l6_1", Tp = "_form_pc1l6_11", Np = "_row_pc1l6_33", Ep = "_statusMessage_pc1l6_51", Gu = {
  heading: jp,
  form: Tp,
  row: Np,
  statusMessage: Ep
};
function Ap() {
  var c = _e(), r = $u(), [d, o] = z.useState({ username: "", password: "", displayName: "" }), [v, h] = z.useState(!1);
  function j(E, _) {
    o(function(D) {
      return Object.assign({}, D, { [E]: _ });
    });
  }
  async function w(E) {
    E.preventDefault(), h(!0);
    try {
      await window.addNewPig(d), o({ username: "", password: "", displayName: "" }), r.reload();
    } finally {
      h(!1);
    }
  }
  function A(E) {
    window.deactivatePig(E);
  }
  function R(E) {
    window.reactivatePig(E);
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(he, { children: [
      /* @__PURE__ */ i.jsxs("h2", { className: Gu.heading, children: [
        "Add New ",
        c.groupTerms.slaveLabel
      ] }),
      /* @__PURE__ */ i.jsxs("form", { className: Gu.form, onSubmit: w, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Username",
            value: d.username,
            onChange: function(E) {
              j("username", E.target.value);
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
            onChange: function(E) {
              j("password", E.target.value);
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
            onChange: function(E) {
              j("displayName", E.target.value);
            },
            placeholder: "optional"
          }
        ),
        /* @__PURE__ */ i.jsxs(G, { type: "submit", loading: v, children: [
          "Add ",
          c.groupTerms.slaveLabel
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("h2", { className: Gu.heading, children: [
      "Current ",
      c.groupTerms.slaveLabelPlural
    ] }),
    r.allSlaves.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No " + c.groupTerms.slaveLabelPlural + " added yet" }) : r.allSlaves.map(function(E) {
      var _ = E.status === "active";
      return /* @__PURE__ */ i.jsxs(he, { className: Gu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(_t, { tone: _ ? "success" : "neutral", children: _ ? "Active" : "Inactive" }),
          " ",
          /* @__PURE__ */ i.jsx("strong", { children: E.displayName }),
          " (",
          E.username,
          ") ·",
          " ",
          E.points,
          " pts",
          E.statusMessage ? /* @__PURE__ */ i.jsxs("span", { className: Gu.statusMessage, children: [
            " · ",
            E.statusMessage
          ] }) : null
        ] }),
        _ ? /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "danger",
            onClick: function() {
              A(E.username);
            },
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ i.jsx(
          G,
          {
            onClick: function() {
              R(E.username);
            },
            children: "Reactivate"
          }
        )
      ] }, E.username);
    })
  ] });
}
function zp(c, r) {
  return new Date(r.created_at) - new Date(c.created_at);
}
function wp() {
  var c = _e(), r = aa({
    table: "invites",
    masterUsername: c.activeMasterContext,
    sort: zp
  }), d = z.useCallback(async function() {
    await window.generateInvite(), r.reload();
  }, [r]), o = z.useCallback(
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
const Cp = "_heading_1pok1_1", Dp = "_hint_1pok1_11", Op = "_row_1pok1_23", Mp = "_actions_1pok1_45", Qu = {
  heading: Cp,
  hint: Dp,
  row: Op,
  actions: Mp
};
function Rp(c) {
  return c === "pending" ? "warning" : c === "redeemed" ? "success" : "neutral";
}
function Up() {
  var c = _e(), r = wp(), [d, o] = z.useState(null);
  function v(h) {
    navigator.clipboard.writeText(window.buildInviteLink(h)), o(h), setTimeout(function() {
      o(null);
    }, 2e3);
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Qu.heading, children: "Invites" }),
    /* @__PURE__ */ i.jsxs("p", { className: Qu.hint, children: [
      "Generate a link to invite someone new as a ",
      c.groupTerms.slaveLabel,
      " in this group."
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: r.generateInvite, children: "Generate Invite Link" }),
    r.status === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading invites..." }) : null,
    r.status === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: "Couldn't load invites: " + (r.error ? r.error.message : "unknown error"),
        onRetry: r.reload
      }
    ) : null,
    r.status === "ready" && r.invites.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No invites generated yet" }) : null,
    r.status === "ready" && r.invites.length > 0 ? r.invites.map(function(h) {
      var j = h.status === "pending" && h.expires_at && new Date(h.expires_at) < /* @__PURE__ */ new Date(), w = j ? "expired" : h.status, A = h.status === "pending" && !j;
      return /* @__PURE__ */ i.jsxs("div", { className: Qu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx(_t, { tone: Rp(w), children: w.charAt(0).toUpperCase() + w.slice(1) }),
          " ",
          /* @__PURE__ */ i.jsx("code", { children: h.code }),
          h.redeemed_by ? /* @__PURE__ */ i.jsxs("span", { className: Qu.hint, children: [
            " · redeemed by ",
            h.redeemed_by
          ] }) : null
        ] }),
        A ? /* @__PURE__ */ i.jsxs("div", { className: Qu.actions, children: [
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
function Hp(c, r) {
  return c.position - r.position;
}
function Oh() {
  var c = _e(), r = c.activeMasterContext, d = aa({
    table: "motd_messages",
    masterUsername: r,
    sort: Hp
  }), o = aa({
    table: "motd_state",
    masterUsername: r
  }), v = d.items, h = o.items[0], j = h ? h.current_index : 0, w = v.length > 0 ? v[j % v.length] : null;
  return {
    messages: v,
    currentMessage: w,
    status: d.status,
    error: d.error,
    reload: function() {
      d.reload(), o.reload();
    },
    addMessage: async function(A) {
      await window.addMotdMessage({ body: A });
    },
    deleteMessage: async function(A) {
      await window.deleteMotdMessage(A);
    },
    moveUp: async function(A) {
      await window.moveMotdMessageUp(A);
    },
    moveDown: async function(A) {
      await window.moveMotdMessageDown(A);
    }
  };
}
const Lp = "_form_7nlkd_1", qp = {
  form: Lp
};
function Bp({ onAdd: c }) {
  var [r, d] = z.useState(""), [o, v] = z.useState(!1);
  async function h(j) {
    j.preventDefault();
    var w = r.trim();
    if (w) {
      v(!0);
      try {
        await c(w), d("");
      } finally {
        v(!1);
      }
    }
  }
  return /* @__PURE__ */ i.jsxs("form", { className: qp.form, onSubmit: h, children: [
    /* @__PURE__ */ i.jsx(
      ce,
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
const Yp = "_heading_10ijk_1", Gp = "_row_10ijk_11", Qp = "_actions_10ijk_33", Ao = {
  heading: Yp,
  row: Gp,
  actions: Qp
};
function Xp() {
  var c = Oh();
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Ao.heading, children: "Message of the Day" }),
    /* @__PURE__ */ i.jsx(Bp, { onAdd: c.addMessage }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading messages..." }) : null,
    c.status === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: "Couldn't load messages: " + (c.error ? c.error.message : "unknown error"),
        onRetry: c.reload
      }
    ) : null,
    c.status === "ready" && c.messages.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No messages added yet" }) : null,
    c.status === "ready" && c.messages.length > 0 ? c.messages.map(function(r, d) {
      var o = d === 0, v = d === c.messages.length - 1, h = c.currentMessage && c.currentMessage.id === r.id;
      return /* @__PURE__ */ i.jsxs("div", { className: Ao.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          h ? /* @__PURE__ */ i.jsx(_t, { tone: "success", children: "Showing now" }) : null,
          " ",
          r.body
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ao.actions, children: [
          /* @__PURE__ */ i.jsx(
            G,
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
            G,
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
            G,
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
function Zp() {
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(Ap, {}),
    /* @__PURE__ */ i.jsx(Up, {}),
    /* @__PURE__ */ i.jsx(Xp, {})
  ] });
}
function Vp() {
  var c = _e(), [r, d] = z.useState([]), [o, v] = z.useState("loading"), h = z.useCallback(async function() {
    v("loading");
    var j = await window.fetchAllMasters();
    d(j || []), v("ready");
  }, []);
  return z.useEffect(
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
    deactivateMaster: function(j) {
      return new Promise(function(w) {
        window.showConfirmModal(
          "Deactivate master '" + j + "'? They (and their group) won't be able to log in.",
          async function(A) {
            A && (await window.supabase.from("users").update({ status: "inactive" }).eq("username", j), window.showNotification("Master deactivated.", "success"), await h()), w();
          }
        );
      });
    },
    reactivateMaster: async function(j) {
      await window.supabase.from("users").update({ status: "active" }).eq("username", j), window.showNotification("Master reactivated.", "success"), await h();
    }
  };
}
const Kp = "_list_1yv13_1", Jp = "_row_1yv13_10", kp = "_ratio_1yv13_18", zo = {
  list: Kp,
  row: Jp,
  ratio: kp
};
function $p({ theme: c }) {
  if (!window.ContrastUtils) return null;
  var r = window.ContrastUtils.checkThemeContrast(c);
  return /* @__PURE__ */ i.jsx("ul", { className: zo.list, children: r.map(function(d) {
    return /* @__PURE__ */ i.jsxs("li", { className: zo.row, children: [
      /* @__PURE__ */ i.jsx("span", { children: d.label }),
      /* @__PURE__ */ i.jsxs("span", { className: zo.ratio, children: [
        d.ratio ? d.ratio.toFixed(1) + ":1" : "n/a",
        " (needs ",
        d.required,
        ":1)"
      ] }),
      /* @__PURE__ */ i.jsx(_t, { tone: d.passes ? "success" : "danger", children: d.passes ? "Pass" : "Fail" })
    ] }, d.label);
  }) });
}
const Fp = "_heading_xjg2m_1", Wp = "_row_xjg2m_11", Ip = "_checkboxRow_xjg2m_31", Pp = "_divider_xjg2m_47", eS = "_colorGroupLabel_xjg2m_57", tS = "_colorRow_xjg2m_71", aS = "_colorField_xjg2m_85", lS = "_actions_xjg2m_119", Ht = {
  heading: Fp,
  row: Wp,
  checkboxRow: Ip,
  divider: Pp,
  colorGroupLabel: eS,
  colorRow: tS,
  colorField: aS,
  actions: lS
};
var nS = {
  bg: "#09090b",
  card: "#131316",
  elevated: "#1a1a20",
  textPrimary: "#fafafa",
  textSecondary: "#a1a1aa"
}, uS = {
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
    theme: c ? c.theme : nS,
    themeLight: c ? c.themeLight : uS
  };
}
function Th({ master: c, onCreate: r, onSaveExisting: d, onCancel: o }) {
  var [v, h] = z.useState(jh(c)), [j, w] = z.useState(!1), A = !!c;
  function R(C, U) {
    h(function(L) {
      return Object.assign({}, L, { [C]: U });
    });
  }
  function E(C, U) {
    h(function(L) {
      return Object.assign({}, L, { theme: Object.assign({}, L.theme, { [C]: U }) });
    });
  }
  function _(C, U) {
    h(function(L) {
      return Object.assign({}, L, { themeLight: Object.assign({}, L.themeLight, { [C]: U }) });
    });
  }
  async function D(C) {
    C.preventDefault(), w(!0);
    try {
      A ? await d(c.username, v) : (await r(v), h(jh(null)));
    } finally {
      w(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: Ht.heading, children: A ? "Edit " + c.username : "Create New Master" }),
    /* @__PURE__ */ i.jsxs("form", { onSubmit: D, children: [
      A ? null : /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Username",
          value: v.username,
          onChange: function(C) {
            R("username", C.target.value);
          },
          required: !0
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: A ? "New password (leave blank to keep current)" : "Password",
          type: "password",
          value: v.password,
          onChange: function(C) {
            R("password", C.target.value);
          },
          required: !A
        }
      ),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Display name",
          value: v.displayName,
          onChange: function(C) {
            R("displayName", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: Ht.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.isAdmin,
            onChange: function(C) {
              R("isAdmin", C.target.checked);
            }
          }
        ),
        "Admin access"
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Ht.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Group label",
            placeholder: "The Polycule, The Drift...",
            value: v.groupLabel,
            onChange: function(C) {
              R("groupLabel", C.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Master label",
            placeholder: "Master, Sir, Daddy...",
            value: v.masterLabel,
            onChange: function(C) {
              R("masterLabel", C.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: Ht.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Master label (plural)",
            value: v.masterLabelPlural,
            onChange: function(C) {
              R("masterLabelPlural", C.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Slave label",
            placeholder: "pig, pet, sub...",
            value: v.slaveLabel,
            onChange: function(C) {
              R("slaveLabel", C.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Slave label (plural)",
          value: v.slaveLabelPlural,
          onChange: function(C) {
            R("slaveLabelPlural", C.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx("hr", { className: Ht.divider }),
      /* @__PURE__ */ i.jsxs("label", { className: Ht.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: v.classicUiForced,
            onChange: function(C) {
              R("classicUiForced", C.target.checked);
            }
          }
        ),
        "Force classic styling for this group (disable beta)"
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: Ht.colorGroupLabel, children: "Dark mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Ht.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(C) {
        var U = C[0], L = C[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Ht.colorField, children: [
          L,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.theme[U],
              onChange: function(B) {
                E(U, B.target.value);
              }
            }
          )
        ] }, U);
      }) }),
      /* @__PURE__ */ i.jsx("p", { className: Ht.colorGroupLabel, children: "Light mode colors" }),
      /* @__PURE__ */ i.jsx("div", { className: Ht.colorRow, children: [
        ["bg", "Background"],
        ["card", "Card"],
        ["elevated", "Elevated"],
        ["textPrimary", "Primary text"],
        ["textSecondary", "Secondary text"]
      ].map(function(C) {
        var U = C[0], L = C[1];
        return /* @__PURE__ */ i.jsxs("label", { className: Ht.colorField, children: [
          L,
          /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "color",
              value: v.themeLight[U],
              onChange: function(B) {
                _(U, B.target.value);
              }
            }
          )
        ] }, "light-" + U);
      }) }),
      /* @__PURE__ */ i.jsx($p, { theme: v.theme }),
      /* @__PURE__ */ i.jsxs("div", { className: Ht.actions, children: [
        /* @__PURE__ */ i.jsx(G, { type: "submit", loading: j, children: A ? "Save changes" : "Create master" }),
        A ? /* @__PURE__ */ i.jsx(G, { type: "button", variant: "secondary", onClick: o, children: "Cancel" }) : null
      ] })
    ] })
  ] });
}
const iS = "_heading_vrwe0_1", cS = "_row_vrwe0_5", sS = "_badgeRow_vrwe0_14", rS = "_meta_vrwe0_20", oS = "_actions_vrwe0_26", Xu = {
  heading: iS,
  row: cS,
  badgeRow: sS,
  meta: rS,
  actions: oS
};
function fS() {
  var c = Vp(), [r, d] = z.useState(null);
  async function o(h) {
    var j = await c.createMaster(h);
    j && await c.reload();
  }
  async function v(h, j) {
    await c.updateMasterAccount(h, {
      displayName: j.displayName,
      password: j.password,
      isAdmin: j.isAdmin
    }), await c.updateMasterTerminology(h, j), d(null), await c.reload();
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
    /* @__PURE__ */ i.jsx("h2", { className: Xu.heading, children: "All Masters" }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx(kt, {}) : c.masters.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No masters yet" }) : c.masters.map(function(h) {
      var j = h.status === "active";
      return /* @__PURE__ */ i.jsxs(he, { className: Xu.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("div", { className: Xu.badgeRow, children: [
            /* @__PURE__ */ i.jsx(_t, { tone: j ? "success" : "neutral", children: j ? "Active" : "Inactive" }),
            h.isAdmin ? /* @__PURE__ */ i.jsx(_t, { tone: "warning", children: "Admin" }) : null,
            h.classicUiForced ? /* @__PURE__ */ i.jsx(_t, { tone: "warning", children: "Classic Only" }) : null
          ] }),
          /* @__PURE__ */ i.jsx("strong", { children: h.displayName }),
          " (",
          h.username,
          ")",
          /* @__PURE__ */ i.jsxs("div", { className: Xu.meta, children: [
            "Group: ",
            h.groupLabel,
            " · ",
            h.masterLabel,
            " / ",
            h.slaveLabel
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Xu.actions, children: [
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
                c.deactivateMaster(h.username);
              },
              children: "Deactivate"
            }
          ) : /* @__PURE__ */ i.jsx(
            G,
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
var Dc = 100;
function dS() {
  var c = _e(), r = c.activeMasterContext, [d, o] = z.useState([]), [v, h] = z.useState("loading"), [j, w] = z.useState(null), [A, R] = z.useState(!1), E = z.useRef(Math.random().toString(36).slice(2)).current, _ = z.useCallback(
    async function() {
      if (!r) {
        o([]), h("ready");
        return;
      }
      h("loading"), w(null);
      var U = await window.supabase.from("chat_messages").select("*").eq("master_username", r).order("created_at", { ascending: !1 }).limit(Dc);
      if (U.error) {
        w(U.error), h("error");
        return;
      }
      var L = (U.data || []).slice().reverse();
      o(L), R((U.data || []).length === Dc), h("ready");
    },
    [r]
  ), D = z.useCallback(
    async function() {
      o(function(U) {
        if (U.length === 0) return U;
        var L = U[0];
        return window.supabase.from("chat_messages").select("*").eq("master_username", r).lt("created_at", L.created_at).order("created_at", { ascending: !1 }).limit(Dc).then(function(B) {
          if (!B.error) {
            var X = (B.data || []).slice().reverse();
            R((B.data || []).length === Dc), o(function(re) {
              return X.concat(re);
            });
          }
        }), U;
      });
    },
    [r]
  ), C = z.useCallback(
    async function(U) {
      var L = await window.sendChatMessage({ body: U });
      L && o(function(B) {
        return B.some(function(X) {
          return X.id === L.id;
        }) ? B : B.concat([L]);
      });
    },
    []
  );
  return z.useEffect(
    function() {
      if (_(), !!r) {
        var U = window.supabase.channel("beta_chat_messages_" + r + "_" + E).on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: "master_username=eq." + r
          },
          function(L) {
            o(function(B) {
              return B.some(function(X) {
                return X.id === L.new.id;
              }) ? B : B.concat([L.new]);
            });
          }
        ).subscribe();
        return function() {
          window.supabase.removeChannel(U);
        };
      }
    },
    [r, _]
  ), {
    messages: d,
    status: v,
    error: j,
    hasMoreOlder: A,
    loadOlder: D,
    sendMessage: C,
    reload: _
  };
}
const vS = "_row_gqneb_1", mS = "_meta_gqneb_19", hS = "_status_gqneb_35", gS = "_time_gqneb_43", yS = "_body_gqneb_51", Zu = {
  row: vS,
  meta: mS,
  status: hS,
  time: gS,
  body: yS
};
function _S({ message: c }) {
  var r = window.users[c.sender_username], d = r ? r.displayName : c.sender_username, o = r && r.statusMessage ? r.statusMessage : "";
  return /* @__PURE__ */ i.jsxs("div", { className: Zu.row, children: [
    /* @__PURE__ */ i.jsxs("div", { className: Zu.meta, children: [
      /* @__PURE__ */ i.jsx("strong", { children: d }),
      o ? /* @__PURE__ */ i.jsxs("span", { className: Zu.status, children: [
        " ",
        o
      ] }) : null,
      /* @__PURE__ */ i.jsx("span", { className: Zu.time, children: new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: Zu.body, children: c.body })
  ] });
}
const pS = "_form_nndvu_1", SS = "_input_nndvu_13", Nh = {
  form: pS,
  input: SS
};
function bS({ onSend: c }) {
  var [r, d] = z.useState(""), [o, v] = z.useState(!1);
  async function h(j) {
    j.preventDefault();
    var w = r.trim();
    if (w) {
      v(!0);
      try {
        await c(w), d("");
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
const xS = "_heading_12c2o_1", jS = "_loadOlder_12c2o_11", TS = "_list_12c2o_19", wo = {
  heading: xS,
  loadOlder: jS,
  list: TS
};
function NS() {
  var c = dS(), r = z.useRef(null), d = z.useRef(!0);
  z.useEffect(
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
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h2", { className: wo.heading, children: "Group Chat" }),
    c.status === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading chat..." }) : null,
    c.status === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: "Couldn't load chat: " + (c.error ? c.error.message : "unknown error"),
        onRetry: c.reload
      }
    ) : null,
    c.status === "ready" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      c.hasMoreOlder ? /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: c.loadOlder, className: wo.loadOlder, children: "Load older messages" }) : null,
      /* @__PURE__ */ i.jsx("div", { className: wo.list, ref: r, onScroll: o, children: c.messages.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { icon: "💬", title: "No messages yet. Say hello!" }) : c.messages.map(function(v) {
        return /* @__PURE__ */ i.jsx(_S, { message: v }, v.id);
      }) }),
      /* @__PURE__ */ i.jsx(bS, { onSend: c.sendMessage })
    ] }) : null
  ] });
}
function ES(c, r) {
  return new Date(r.updated_at) - new Date(c.updated_at);
}
function Mh() {
  var c = _e(), r = aa({
    table: "saved_spirals",
    masterUsername: c.activeMasterContext,
    sort: ES
  }), d = z.useCallback(
    async function(v) {
      var h = await window.saveSpiralToLibrary(v);
      return r.reload(), h;
    },
    [r]
  ), o = z.useCallback(
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
var Rh = {
  speed: 1,
  radiusPercent: 50,
  arms: 3,
  thickness: 3,
  color: "#4fc3f7",
  opacity: 0.8,
  timeOffset: 0,
  rotation: 0
};
function AS(c, r, d, o) {
  return Object.assign(
    {
      id: c,
      x: r / 2,
      y: d / 2
    },
    Rh,
    {}
  );
}
function zS(c, r, d) {
  var o = Math.min(c.canvas.width, c.canvas.height), v = r.radiusPercent / 100 * o * 2, h = (d + r.timeOffset * 1e3) * r.speed * 1e-3;
  c.save(), c.translate(r.x, r.y), c.rotate(r.rotation * Math.PI / 180 + h * 0.5), c.strokeStyle = r.color, c.lineWidth = r.thickness, c.globalAlpha = r.opacity, c.lineCap = "round", c.lineJoin = "round";
  for (var j = 0; j < r.arms; j++) {
    c.save(), c.rotate(j * 2 * Math.PI / r.arms), c.beginPath();
    for (var w = !0, A = 0; A < v; A += 0.5) {
      var R = A * 0.08 + h, E = A * Math.cos(R), _ = A * Math.sin(R);
      w ? (c.moveTo(E, _), w = !1) : c.lineTo(E, _);
    }
    c.stroke(), c.restore();
  }
  c.restore();
}
function wS(c) {
  var r = JSON.stringify(c, null, 2), d = new Blob([r], { type: "application/json" }), o = URL.createObjectURL(d), v = document.createElement("a");
  v.href = o, v.download = "spiral-config.json", document.body.appendChild(v), v.click(), document.body.removeChild(v), URL.revokeObjectURL(o);
}
function CS(c, r, d) {
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
const DS = "_canvas_1y7at_1", OS = {
  canvas: DS
};
function MS({ canvasRef: c, spiralsRef: r, backgroundColor: d }) {
  var o = z.useRef(d);
  return z.useEffect(
    function() {
      o.current = d;
    },
    [d]
  ), z.useEffect(function() {
    var v = c.current, h = v.getContext("2d");
    function j() {
      var R = v.parentElement;
      v.width = R.clientWidth, v.height = R.clientHeight, r.current.forEach(function(E) {
        E.x = v.width / 2, E.y = v.height / 2;
      });
    }
    var w = new ResizeObserver(j);
    w.observe(v.parentElement), j();
    var A = requestAnimationFrame(function R(E) {
      A = requestAnimationFrame(R), h.fillStyle = o.current, h.fillRect(0, 0, v.width, v.height), r.current.forEach(function(_) {
        zS(h, _, E);
      });
    });
    return function() {
      cancelAnimationFrame(A), w.disconnect();
    };
  }, []), /* @__PURE__ */ i.jsx("canvas", { ref: c, className: OS.canvas });
}
const RS = "_sidebar_1jfxv_1", US = "_controlGroup_1jfxv_19", HS = "_spiralList_1jfxv_53", LS = "_spiralItem_1jfxv_67", qS = "_spiralItemActive_1jfxv_69", BS = "_actions_1jfxv_97", YS = "_controlRow_1jfxv_107", GS = "_valueDisplay_1jfxv_141", QS = "_sendAsTask_1jfxv_153", dt = {
  sidebar: RS,
  controlGroup: US,
  spiralList: HS,
  spiralItem: LS,
  spiralItemActive: qS,
  actions: BS,
  controlRow: YS,
  valueDisplay: GS,
  sendAsTask: QS
};
var XS = [
  { key: "speed", label: "Speed", min: 0.1, max: 5, step: 0.1 },
  { key: "radiusPercent", label: "Radius", min: 10, max: 100, step: 1, suffix: "%" },
  { key: "arms", label: "Arms", min: 1, max: 20, step: 1 },
  { key: "thickness", label: "Thickness", min: 1, max: 20, step: 1 },
  { key: "opacity", label: "Opacity", min: 0.1, max: 1, step: 0.1 },
  { key: "timeOffset", label: "Time Offset", min: 0, max: 10, step: 0.1 },
  { key: "rotation", label: "Rotation", min: 0, max: 360, step: 1, suffix: "°" }
];
function ZS({
  textControls: c,
  spirals: r,
  activeIndex: d,
  activeSnapshot: o,
  onAdd: v,
  onDelete: h,
  onSelect: j,
  onClearAll: w,
  onPropertyChange: A,
  backgroundColor: R,
  onBackgroundChange: E,
  onSave: _,
  onLoadFile: D,
  onOpenTaskModal: C,
  savedSpiralName: U,
  onSaveToLibrary: L
}) {
  var B = z.useRef(null), [X, re] = z.useState(U || "");
  return /* @__PURE__ */ i.jsxs("div", { className: dt.sidebar, children: [
    c,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Spirals" }),
      /* @__PURE__ */ i.jsx("div", { className: dt.spiralList, children: r.map(function(K, pe) {
        return /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: pe === d ? dt.spiralItemActive : dt.spiralItem,
            children: [
              /* @__PURE__ */ i.jsxs("span", { children: [
                "Spiral ",
                pe + 1
              ] }),
              /* @__PURE__ */ i.jsxs("div", { className: dt.actions, children: [
                /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
                  j(pe);
                }, children: "Edit" }),
                /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
                  h(pe);
                }, children: "Delete" })
              ] })
            ]
          },
          K.id
        );
      }) }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: v, children: "Add New Spiral" })
    ] }),
    o ? /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Current Spiral Properties" }),
      XS.map(function(K) {
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
              onChange: function(pe) {
                A(K.key, Number(pe.target.value));
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
              A("color", K.target.value);
            }
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Configuration" }),
      /* @__PURE__ */ i.jsxs("div", { className: dt.controlRow, children: [
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: _, children: "Save Config" }),
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
          onChange: function(K) {
            K.target.files[0] && D(K.target.files[0]), K.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: dt.controlGroup, children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Save to Library" }),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Name",
          value: X,
          onChange: function(K) {
            re(K.target.value);
          },
          placeholder: "e.g. Calming blue swirl"
        }
      ),
      /* @__PURE__ */ i.jsx(
        G,
        {
          variant: "secondary",
          disabled: !X.trim(),
          onClick: function() {
            L(X.trim());
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
            value: R,
            onChange: function(K) {
              E(K.target.value);
            }
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: w, children: "Clear All Spirals" })
    ] }),
    /* @__PURE__ */ i.jsx(G, { onClick: C, className: dt.sendAsTask, children: "Send as Task" })
  ] });
}
var VS = [
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
function KS(c) {
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
function JS() {
  var [c, r] = z.useState(VS), [d, o] = z.useState(2e3), [v, h] = z.useState(3e3), [j, w] = z.useState(0.5), [A, R] = z.useState(2.5), [E, _] = z.useState("#ffffff"), [D, C] = z.useState(!1), [U, L] = z.useState({ text: "Start the text loop!", shown: !1, instant: !1 }), B = z.useRef(null), X = z.useRef(0), re = z.useRef([]), K = z.useRef(!1), pe = z.useRef(v), Je = z.useRef(j);
  z.useEffect(function() {
    pe.current = v;
  }, [v]), z.useEffect(function() {
    Je.current = j;
  }, [j]);
  function Ye(Ce) {
    L({ text: Ce, shown: !1, instant: !0 }), requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        L({ text: Ce, shown: !0, instant: !1 });
      });
    });
  }
  function P() {
    L(function(Ce) {
      return { text: Ce.text, shown: !1, instant: !1 };
    });
  }
  function ue() {
    if (!K.current) {
      P();
      return;
    }
    X.current >= re.current.length && (X.current = 0);
    var Ce = re.current[X.current];
    if (Ce)
      if (Ce.type === "text") {
        setTimeout(function() {
          Ye(Ce.value);
        }, 50), X.current++;
        var Qe = Je.current * 1e3, ee = Qe + pe.current + Qe + 50;
        B.current = setTimeout(ue, ee);
      } else
        P(), X.current++, B.current = setTimeout(ue, Ce.value);
  }
  function rt() {
    B.current && clearTimeout(B.current), re.current = KS(c), X.current = 0, K.current = !0, C(!0), ue();
  }
  function $e() {
    K.current = !1, C(!1), B.current && clearTimeout(B.current), L({ text: "Start the text loop!", shown: !1, instant: !1 });
  }
  return z.useEffect(function() {
    return function() {
      K.current = !1, B.current && clearTimeout(B.current);
    };
  }, []), {
    display: U,
    script: c,
    setScript: r,
    interval: d,
    setInterval: o,
    holdDuration: v,
    setHoldDuration: h,
    animSpeed: j,
    setAnimSpeed: w,
    fontSize: A,
    setFontSize: R,
    color: E,
    setColor: _,
    isRunning: D,
    startLoop: rt,
    stopLoop: $e
  };
}
const kS = "_overlay_qasw4_1", $S = {
  overlay: kS
};
function FS({ display: c, animSpeed: r, fontSize: d, color: o }) {
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: $S.overlay,
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
const WS = "_controlGroup_9ywy2_1", IS = "_script_9ywy2_23", PS = "_controlRow_9ywy2_47", eb = "_valueDisplay_9ywy2_83", tb = "_buttonRow_9ywy2_97", Kt = {
  controlGroup: WS,
  script: IS,
  controlRow: PS,
  valueDisplay: eb,
  buttonRow: tb
};
function ab(c) {
  return /* @__PURE__ */ i.jsxs("div", { className: Kt.controlGroup, children: [
    /* @__PURE__ */ i.jsx("h3", { children: "Text Animation" }),
    /* @__PURE__ */ i.jsx(
      "textarea",
      {
        className: Kt.script,
        value: c.script,
        onChange: function(r) {
          c.setScript(r.target.value);
        },
        placeholder: "Enter your text script here. Use 'DELAY:ms' for delays."
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: Kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: Kt.valueDisplay, children: [
        c.interval,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: Kt.valueDisplay, children: [
        c.holdDuration,
        "ms"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: Kt.valueDisplay, children: [
        c.animSpeed.toFixed(1),
        "s"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Kt.controlRow, children: [
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
      /* @__PURE__ */ i.jsxs("span", { className: Kt.valueDisplay, children: [
        c.fontSize.toFixed(1),
        "rem"
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: Kt.controlRow, children: [
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
    /* @__PURE__ */ i.jsxs("div", { className: Kt.buttonRow, children: [
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: c.startLoop, disabled: c.isRunning, children: "Start Text Loop" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: c.stopLoop, disabled: !c.isRunning, children: "Stop Text Loop" })
    ] })
  ] });
}
const lb = "_row_cg4zb_1", nb = "_checkboxRow_cg4zb_23", ub = "_selectLabel_cg4zb_37", ib = "_select_cg4zb_37", cb = "_actions_cg4zb_71", ql = {
  row: lb,
  checkboxRow: nb,
  selectLabel: ub,
  select: ib,
  actions: cb
};
function sb({ onClose: c, onSent: r }) {
  var [d, o] = z.useState("Experience the Spiral Animation"), [v, h] = z.useState(10), [j, w] = z.useState(5), [A, R] = z.useState(""), [E, _] = z.useState(!1), [D, C] = z.useState("daily"), [U, L] = z.useState(!1);
  async function B() {
    var X = d.trim();
    if (!X) {
      window.showNotification("Please enter a task description", "error");
      return;
    }
    if (A) {
      var re = new Date(A);
      if (isNaN(re.getTime())) {
        window.showNotification("Invalid due date format", "error");
        return;
      }
      if (re < /* @__PURE__ */ new Date()) {
        window.showNotification("Due date cannot be in the past", "error");
        return;
      }
    }
    L(!0);
    try {
      var K = {
        text: X,
        status: "todo",
        type: "spiral",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: window.currentUser,
        master_username: window.activeMasterContext,
        assignedTo: window.getSlaves()[0] || window.currentUser,
        points: Number(v) || 10,
        penaltyPoints: Number(j) || 5,
        dueDate: A || null,
        isRepeating: E,
        repeatInterval: E ? D : null,
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
      }, { error: pe } = await window.supabase.from("tasks").insert([K]);
      if (pe) {
        console.error("Error creating spiral task:", pe), window.showNotification("Failed to create spiral task.", "error");
        return;
      }
      window.showNotification(
        'Spiral task "' + X + '" created successfully!',
        "success"
      ), r();
    } finally {
      L(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(Oo, { title: "🌀 Create Spiral Task", onClose: c, children: [
    /* @__PURE__ */ i.jsx(
      ce,
      {
        label: "Task Description",
        value: d,
        onChange: function(X) {
          o(X.target.value);
        },
        maxLength: 200
      }
    ),
    /* @__PURE__ */ i.jsxs("div", { className: ql.row, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Points (Reward)",
          type: "number",
          min: "1",
          max: "100",
          value: v,
          onChange: function(X) {
            h(X.target.value);
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
          value: j,
          onChange: function(X) {
            w(X.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: ql.row, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Due Date (Optional)",
          type: "datetime-local",
          value: A,
          onChange: function(X) {
            R(X.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("label", { className: ql.checkboxRow, children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "checkbox",
            checked: E,
            onChange: function(X) {
              _(X.target.checked);
            }
          }
        ),
        "Repeating Task"
      ] })
    ] }),
    E ? /* @__PURE__ */ i.jsx("div", { className: ql.row, children: /* @__PURE__ */ i.jsxs("label", { className: ql.selectLabel, children: [
      "Repeat Every",
      /* @__PURE__ */ i.jsxs(
        "select",
        {
          className: ql.select,
          value: D,
          onChange: function(X) {
            C(X.target.value);
          },
          children: [
            /* @__PURE__ */ i.jsx("option", { value: "daily", children: "Daily" }),
            /* @__PURE__ */ i.jsx("option", { value: "weekly", children: "Weekly" }),
            /* @__PURE__ */ i.jsx("option", { value: "monthly", children: "Monthly" })
          ]
        }
      )
    ] }) }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: ql.actions, children: [
      /* @__PURE__ */ i.jsx(G, { loading: U, onClick: B, children: "Create Task" }),
      /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: c, children: "Cancel" })
    ] })
  ] });
}
const rb = "_overlay_1ka14_1", ob = "_closeBtn_1ka14_19", fb = "_viewer_1ka14_51", db = "_canvasArea_1ka14_63", Oc = {
  overlay: rb,
  closeBtn: ob,
  viewer: fb,
  canvasArea: db
};
function Vu(c) {
  return c ? Object.assign({}, c) : null;
}
function vb({ onClose: c, initialConfig: r, initialName: d, initialSavedId: o }) {
  var v = z.useRef(null), h = z.useRef([]), j = z.useRef(1), [, w] = z.useState(0), [A, R] = z.useState(0), [E, _] = z.useState(null), [D, C] = z.useState("#000000"), [U, L] = z.useState(!1), [B, X] = z.useState(o || null), [re, K] = z.useState(d || ""), pe = JS(), Je = Mh();
  function Ye() {
    var q = v.current;
    return q ? { width: q.width, height: q.height } : { width: 0, height: 0 };
  }
  function P() {
    var q = Ye(), Z = AS(j.current++, q.width, q.height);
    h.current = h.current.concat(Z), R(h.current.length - 1), _(Vu(Z)), w(function(ie) {
      return ie + 1;
    });
  }
  function ue(q) {
    h.current = h.current.filter(function(ie, me) {
      return me !== q;
    });
    var Z = Math.max(0, q - 1);
    R(Z), _(Vu(h.current[Z])), w(function(ie) {
      return ie + 1;
    });
  }
  function rt(q) {
    R(q), _(Vu(h.current[q]));
  }
  function $e() {
    h.current = [], R(0), _(null), w(function(q) {
      return q + 1;
    });
  }
  function Ce(q, Z) {
    var ie = h.current[A];
    ie && (ie[q] = Z, _(Vu(ie)));
  }
  function Qe() {
    wS({
      spirals: h.current.map(function(q) {
        return Object.assign({}, q);
      }),
      textSettings: {},
      globalSettings: {
        backgroundColor: D,
        selectedSpiralIndex: A
      }
    }), window.showNotification("Spiral configuration saved successfully.", "success");
  }
  function ee(q) {
    var Z = Ye(), ie = (q.spirals || []).map(function(ot) {
      return j.current = Math.max(j.current, (ot.id || 0) + 1), Object.assign(
        { x: Z.width / 2, y: Z.height / 2 },
        Rh,
        ot
      );
    });
    h.current = ie;
    var me = q.globalSettings && q.globalSettings.selectedSpiralIndex || 0;
    R(me), _(Vu(ie[me] || ie[0])), q.globalSettings && q.globalSettings.backgroundColor && C(q.globalSettings.backgroundColor), w(function(ot) {
      return ot + 1;
    });
  }
  function Fe(q) {
    CS(
      q,
      function(Z) {
        ee(Z), X(null), K(""), window.showNotification("Spiral configuration loaded successfully.", "success");
      },
      function(Z) {
        window.showNotification(Z, "error");
      }
    );
  }
  function He(q) {
    Je.saveSpiral({
      id: B,
      name: q,
      config: {
        spirals: h.current.map(function(Z) {
          return Object.assign({}, Z);
        }),
        textSettings: {},
        globalSettings: {
          backgroundColor: D,
          selectedSpiralIndex: A
        }
      }
    }).then(function(Z) {
      Z && X(Z), K(q);
    });
  }
  z.useEffect(function() {
    r ? ee(r) : h.current.length === 0 && P();
    function q(Z) {
      Z.key === "Escape" && c();
    }
    return document.addEventListener("keydown", q), function() {
      document.removeEventListener("keydown", q);
    };
  }, []);
  var Q = h.current.map(function(q) {
    return { id: q.id };
  });
  return /* @__PURE__ */ i.jsxs("div", { className: Oc.overlay, children: [
    /* @__PURE__ */ i.jsx("button", { type: "button", className: Oc.closeBtn, onClick: c, "aria-label": "Close spiral generator", children: "×" }),
    /* @__PURE__ */ i.jsxs("div", { className: Oc.viewer, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Oc.canvasArea, children: [
        /* @__PURE__ */ i.jsx(MS, { canvasRef: v, spiralsRef: h, backgroundColor: D }),
        /* @__PURE__ */ i.jsx(
          FS,
          {
            display: pe.display,
            animSpeed: pe.animSpeed,
            fontSize: pe.fontSize,
            color: pe.color
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx(
        ZS,
        {
          textControls: /* @__PURE__ */ i.jsx(ab, { ...pe }),
          spirals: Q,
          activeIndex: A,
          activeSnapshot: E,
          onAdd: P,
          onDelete: ue,
          onSelect: rt,
          onClearAll: $e,
          onPropertyChange: Ce,
          backgroundColor: D,
          onBackgroundChange: C,
          onSave: Qe,
          onLoadFile: Fe,
          onOpenTaskModal: function() {
            L(!0);
          },
          savedSpiralName: re,
          onSaveToLibrary: He
        }
      )
    ] }),
    U ? /* @__PURE__ */ i.jsx(
      sb,
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
const mb = "_heading_iikbv_1", hb = "_row_iikbv_11", gb = "_meta_iikbv_45", yb = "_actions_iikbv_55", _b = "_renameRow_iikbv_67", Ku = {
  heading: mb,
  row: hb,
  meta: gb,
  actions: yb,
  renameRow: _b
};
function pb({ savedSpirals: c, status: r, error: d, onReload: o, onLoad: v, onRename: h, onDelete: j }) {
  var [w, A] = z.useState(null), [R, E] = z.useState("");
  function _(C) {
    A(C.id), E(C.name);
  }
  function D(C) {
    var U = R.trim();
    U && h(C, U), A(null);
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Ku.heading, children: "Saved Spirals" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading saved spirals..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: "Couldn't load saved spirals: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No saved spirals yet", hint: "Save one from inside the generator." }) : null,
    r === "ready" ? c.map(function(C) {
      return /* @__PURE__ */ i.jsx("div", { className: Ku.row, children: w === C.id ? /* @__PURE__ */ i.jsxs("div", { className: Ku.renameRow, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            value: R,
            onChange: function(U) {
              E(U.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          D(C);
        }, children: "Save" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          A(null);
        }, children: "Cancel" })
      ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: C.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Ku.meta, children: [
            "Updated ",
            new Date(C.updated_at).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Ku.actions, children: [
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            v(C);
          }, children: "Load" }),
          /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
            _(C);
          }, children: "Rename" }),
          /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
            j(C.id);
          }, children: "Delete" })
        ] })
      ] }) }, C.id);
    }) : null
  ] });
}
function Sb(c, r) {
  return new Date(r.started_at) - new Date(c.started_at);
}
function Mo() {
  var c = _e(), r = aa({
    table: "active_cost_trackers",
    masterUsername: c.activeMasterContext,
    sort: Sb
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
    startTracker: function(v, h, j, w, A, R) {
      return window.startLiveCostTracker(
        v,
        h,
        j,
        w,
        A,
        R
      );
    },
    stopTracker: function(v, h) {
      return window.stopLiveCostTracker(v, h !== !1);
    },
    deleteTracker: function(v) {
      return window.deleteCostTracker(v);
    },
    addPenalty: function(v, h, j) {
      return window.addPenaltyToLiveTracker(v, h, j);
    },
    removePenalty: function(v, h) {
      return window.removePenaltyFromLiveTracker(v, h);
    }
  };
}
function bb(c, r) {
  return c.name.localeCompare(r.name);
}
function xb() {
  var c = _e(), r = aa({
    table: "saved_cost_tracker_presets",
    masterUsername: c.activeMasterContext,
    sort: bb
  }), d = z.useCallback(
    async function(v) {
      var h = await window.saveCostTrackerPreset(v);
      return r.reload(), h;
    },
    [r]
  ), o = z.useCallback(
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
const jb = "_heading_1ynjy_1", Tb = "_row_1ynjy_11", Nb = "_selectGroup_1ynjy_31", Eb = "_selectLabel_1ynjy_45", Ab = "_select_1ynjy_31", zb = "_fieldset_1ynjy_75", wb = "_checkboxRow_1ynjy_89", Cb = "_hint_1ynjy_105", Db = "_penaltyForm_1ynjy_117", Ob = "_penaltyList_1ynjy_141", Mb = "_removePenalty_1ynjy_157", yt = {
  heading: jb,
  row: Tb,
  selectGroup: Nb,
  selectLabel: Eb,
  select: Ab,
  fieldset: zb,
  checkboxRow: wb,
  hint: Cb,
  penaltyForm: Db,
  penaltyList: Ob,
  removePenalty: Mb
};
function Rb({ onStart: c, onSavePreset: r, presetToApply: d }) {
  var o = _e(), v = $u(), [h, j] = z.useState("Cost Tracker Running"), [w, A] = z.useState(50), [R, E] = z.useState("€"), [_, D] = z.useState(6e4), [C, U] = z.useState([]), [L, B] = z.useState(!1), [X, re] = z.useState([]), [K, pe] = z.useState(""), [Je, Ye] = z.useState(""), [P, ue] = z.useState("");
  function rt(ee) {
    U(function(Fe) {
      return Fe.includes(ee) ? Fe.filter(function(He) {
        return He !== ee;
      }) : Fe.concat(ee);
    });
  }
  if (z.useEffect(
    function() {
      d && (j(d.description || "Cost Tracker Running"), A(d.rate), E(d.currency), D(d.increment_interval));
    },
    [d]
  ), !window.hasPermission("create_task")) return null;
  function $e() {
    re(function(ee) {
      return ee.concat({
        description: K.trim(),
        amount: Number(Je)
      });
    }), pe(""), Ye("");
  }
  function Ce(ee) {
    re(function(Fe) {
      return Fe.filter(function(He, Q) {
        return Q !== ee;
      });
    });
  }
  async function Qe(ee) {
    ee.preventDefault(), B(!0);
    try {
      P.trim() && r && await r({
        id: d ? d.id : void 0,
        name: P.trim(),
        description: h,
        rate: Number(w) || 0,
        currency: R,
        incrementInterval: Number(_)
      }), await c(h, Number(w) || 0, R, Number(_), X, C), re([]), ue(""), U([]);
    } finally {
      B(!1);
    }
  }
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: yt.heading, children: "Start a Cost Tracker" }),
    /* @__PURE__ */ i.jsxs("form", { className: yt.form, onSubmit: Qe, children: [
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Description",
          value: h,
          onChange: function(ee) {
            j(ee.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { className: yt.row, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Rate",
            type: "number",
            min: "0",
            step: "0.01",
            value: w,
            onChange: function(ee) {
              A(ee.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsxs("div", { className: yt.selectGroup, children: [
          /* @__PURE__ */ i.jsx("label", { className: yt.selectLabel, children: "Currency" }),
          /* @__PURE__ */ i.jsxs(
            "select",
            {
              className: yt.select,
              value: R,
              onChange: function(ee) {
                E(ee.target.value);
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
              value: _,
              onChange: function(ee) {
                D(ee.target.value);
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
          ce,
          {
            label: "Penalty description",
            value: K,
            onChange: function(ee) {
              pe(ee.target.value);
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
            value: Je,
            onChange: function(ee) {
              Ye(ee.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            type: "button",
            variant: "secondary",
            disabled: !K.trim() || !Je,
            onClick: $e,
            children: "Add penalty"
          }
        )
      ] }),
      X.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: yt.penaltyList, children: X.map(function(ee, Fe) {
        return /* @__PURE__ */ i.jsxs("li", { children: [
          ee.description,
          ": ",
          R,
          ee.amount.toFixed(2),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: yt.removePenalty,
              onClick: function() {
                Ce(Fe);
              },
              "aria-label": "Remove staged penalty " + ee.description,
              children: "×"
            }
          )
        ] }, Fe);
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
        ] }) : v.slaves.map(function(ee) {
          return /* @__PURE__ */ i.jsxs("label", { className: yt.checkboxRow, children: [
            /* @__PURE__ */ i.jsx(
              "input",
              {
                type: "checkbox",
                checked: C.includes(ee.username),
                onChange: function() {
                  rt(ee.username);
                }
              }
            ),
            ee.displayName
          ] }, ee.username);
        })
      ] }),
      /* @__PURE__ */ i.jsx(
        ce,
        {
          label: "Save as preset (optional)",
          placeholder: "Name this config to reuse it later",
          value: P,
          onChange: function(ee) {
            ue(ee.target.value);
          }
        }
      ),
      /* @__PURE__ */ i.jsx(G, { type: "submit", loading: L, disabled: C.length === 0, children: "Start tracker" })
    ] })
  ] });
}
const Ub = "_heading_girf2_1", Hb = "_row_girf2_11", Lb = "_meta_girf2_45", qb = "_actions_girf2_55", Mc = {
  heading: Ub,
  row: Hb,
  meta: Lb,
  actions: qb
};
function Bb({ presets: c, status: r, error: d, onReload: o, onUse: v, onDelete: h }) {
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Mc.heading, children: "Saved Presets" }),
    r === "loading" ? /* @__PURE__ */ i.jsx(kt, { label: "Loading presets..." }) : null,
    r === "error" ? /* @__PURE__ */ i.jsx(
      la,
      {
        message: "Couldn't load presets: " + (d ? d.message : "unknown error"),
        onRetry: o
      }
    ) : null,
    r === "ready" && c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No saved presets yet", hint: "Save one while starting a tracker below." }) : null,
    r === "ready" ? c.map(function(j) {
      return /* @__PURE__ */ i.jsxs("div", { className: Mc.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: j.name }),
          /* @__PURE__ */ i.jsxs("div", { className: Mc.meta, children: [
            j.currency,
            Number(j.rate).toFixed(2),
            " per",
            " ",
            j.increment_interval === 1e3 ? "second" : j.increment_interval === 36e5 ? "hour" : "minute",
            j.description ? " · " + j.description : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Mc.actions, children: [
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
const Yb = "_card_b5s19_1", Gb = "_description_b5s19_9", Qb = "_meta_b5s19_19", Xb = "_readout_b5s19_31", Zb = "_amount_b5s19_47", Vb = "_penaltyList_b5s19_55", Kb = "_removePenalty_b5s19_71", Jb = "_penaltyForm_b5s19_87", kb = "_stopActions_b5s19_103", ya = {
  card: Yb,
  description: Gb,
  meta: Qb,
  readout: Xb,
  amount: Zb,
  penaltyList: Vb,
  removePenalty: Kb,
  penaltyForm: Jb,
  stopActions: kb
};
function $b(c) {
  return c === 1e3 ? "second" : c === 36e5 ? "hour" : "minute";
}
function Fb(c, r) {
  var d = Math.max(0, r - new Date(c.started_at).getTime()), o = parseInt(c.increment_interval) || 6e4, v = parseFloat(c.rate) || 0, h = d / o * v, j = [];
  try {
    j = JSON.parse(c.penalties || "[]");
  } catch {
    j = [];
  }
  var w = j.reduce(function(D, C) {
    return D + (parseFloat(C.amount) || 0);
  }, 0), A = Math.floor(d / 36e5), R = Math.floor(d % 36e5 / 6e4), E = Math.floor(d % 6e4 / 1e3), _ = String(A).padStart(2, "0") + ":" + String(R).padStart(2, "0") + ":" + String(E).padStart(2, "0");
  return {
    timeText: _,
    penalties: j,
    penaltyTotal: w,
    grandTotal: h + w
  };
}
function Uc({ tracker: c, isAdmin: r, onStop: d, onDelete: o, onAddPenalty: v, onRemovePenalty: h }) {
  var [j, w] = z.useState(Date.now()), [A, R] = z.useState(""), [E, _] = z.useState("");
  z.useEffect(function() {
    var L = window.setInterval(function() {
      w(Date.now());
    }, 1e3);
    return function() {
      window.clearInterval(L);
    };
  }, []);
  var D = Fb(c, j), C = window.users[c.created_by], U = (c.assigned_to || []).map(function(L) {
    var B = window.users[L];
    return B ? B.displayName : L;
  });
  return /* @__PURE__ */ i.jsxs(he, { className: ya.card, children: [
    /* @__PURE__ */ i.jsx("p", { className: ya.description, children: c.description }),
    /* @__PURE__ */ i.jsxs("p", { className: ya.meta, children: [
      "by ",
      C ? C.displayName : c.created_by,
      " · ",
      c.currency,
      parseFloat(c.rate).toFixed(2),
      " per ",
      $b(parseInt(c.increment_interval))
    ] }),
    r ? /* @__PURE__ */ i.jsxs("p", { className: ya.meta, children: [
      "Assigned to: ",
      U.length > 0 ? U.join(", ") : "N/A"
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: ya.readout, children: [
      /* @__PURE__ */ i.jsx("span", { children: D.timeText }),
      /* @__PURE__ */ i.jsxs("span", { className: ya.amount, children: [
        c.currency,
        D.grandTotal.toFixed(2)
      ] })
    ] }),
    D.penalties.length > 0 ? /* @__PURE__ */ i.jsx("ul", { className: ya.penaltyList, children: D.penalties.map(function(L) {
      return /* @__PURE__ */ i.jsxs("li", { children: [
        L.description,
        ": ",
        c.currency,
        parseFloat(L.amount).toFixed(2),
        r ? /* @__PURE__ */ i.jsx(
          "button",
          {
            className: ya.removePenalty,
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
      /* @__PURE__ */ i.jsxs("div", { className: ya.penaltyForm, children: [
        /* @__PURE__ */ i.jsx(
          ce,
          {
            label: "Add penalty",
            placeholder: "Description",
            value: A,
            onChange: function(L) {
              R(L.target.value);
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
            value: E,
            onChange: function(L) {
              _(L.target.value);
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          G,
          {
            variant: "secondary",
            disabled: !A.trim() || !E,
            onClick: function() {
              v(c.id, A, Number(E)), R(""), _("");
            },
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: ya.stopActions, children: [
        /* @__PURE__ */ i.jsx(G, { variant: "danger", onClick: function() {
          d(c.id, !0);
        }, children: "Stop & invoice" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          d(c.id, !1);
        }, children: "Stop (no invoice)" }),
        /* @__PURE__ */ i.jsx(G, { variant: "secondary", onClick: function() {
          o(c.id);
        }, children: "Delete" })
      ] })
    ] }) : null
  ] });
}
const Wb = "_heading_1k7pj_1", Ib = "_row_1k7pj_11", Pb = "_meta_1k7pj_45", Co = {
  heading: Wb,
  row: Ib,
  meta: Pb
};
function ex(c) {
  return c === 1e3 ? "second" : c === 36e5 ? "hour" : "minute";
}
function tx({ trackers: c, onDelete: r }) {
  return /* @__PURE__ */ i.jsxs(he, { children: [
    /* @__PURE__ */ i.jsx("h3", { className: Co.heading, children: "Recently Stopped" }),
    c.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No stopped trackers yet" }) : c.map(function(d) {
      return /* @__PURE__ */ i.jsxs("div", { className: Co.row, children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: d.description }),
          /* @__PURE__ */ i.jsxs("div", { className: Co.meta, children: [
            d.currency,
            Number(d.rate).toFixed(2),
            " per ",
            ex(Number(d.increment_interval)),
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
const ax = "_heading_lmzbq_1", lx = {
  heading: ax
};
function nx() {
  var c = Mo(), r = xb(), [d, o] = z.useState(null);
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsx(
      Rb,
      {
        onStart: c.startTracker,
        onSavePreset: r.savePreset,
        presetToApply: d
      }
    ),
    /* @__PURE__ */ i.jsx(
      Bb,
      {
        presets: r.presets,
        status: r.status,
        error: r.error,
        onReload: r.reload,
        onUse: o,
        onDelete: r.deletePreset
      }
    ),
    /* @__PURE__ */ i.jsx("h3", { className: lx.heading, children: "Active Cost Trackers" }),
    c.trackers.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No active cost trackers" }) : c.trackers.map(function(v) {
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
      tx,
      {
        trackers: c.stoppedTrackers,
        onDelete: c.deleteTracker
      }
    )
  ] });
}
const ux = "_section_1o04b_1", ix = "_sectionHeader_1o04b_9", cx = "_heading_1o04b_27", Ju = {
  section: ux,
  sectionHeader: ix,
  heading: cx
};
function sx() {
  var c = Mh(), [r, d] = z.useState(!1), [o, v] = z.useState(null), [h, j] = z.useState(null), [w, A] = z.useState("");
  function R() {
    v(null), j(null), A(""), d(!0);
  }
  function E(C) {
    v(C.config), j(C.id), A(C.name), d(!0);
  }
  function _() {
    d(!1), c.reload();
  }
  function D(C, U) {
    c.saveSpiral({ id: C.id, name: U, config: C.config });
  }
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(he, { className: Ju.section, children: [
      /* @__PURE__ */ i.jsxs("div", { className: Ju.sectionHeader, children: [
        /* @__PURE__ */ i.jsx("h2", { className: Ju.heading, children: "Spirals" }),
        /* @__PURE__ */ i.jsx(G, { onClick: R, children: "🌀 New Spiral" })
      ] }),
      /* @__PURE__ */ i.jsx(
        pb,
        {
          savedSpirals: c.savedSpirals,
          status: c.status,
          error: c.error,
          onReload: c.reload,
          onLoad: E,
          onRename: D,
          onDelete: c.deleteSpiral
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs(he, { className: Ju.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: Ju.heading, children: "Cost Tracker" }),
      /* @__PURE__ */ i.jsx(nx, {})
    ] }),
    r ? /* @__PURE__ */ i.jsx(
      vb,
      {
        onClose: _,
        initialConfig: o,
        initialSavedId: h,
        initialName: w
      }
    ) : null
  ] });
}
const rx = "_card_zzjxq_1", ox = "_header_zzjxq_10", fx = "_name_zzjxq_17", dx = "_onlineDot_zzjxq_21", vx = "_offlineDot_zzjxq_22", mx = "_points_zzjxq_38", hx = "_negative_zzjxq_44", gx = "_zero_zzjxq_48", yx = "_positive_zzjxq_52", _x = "_metaRow_zzjxq_56", px = "_pendingBadge_zzjxq_64", Sx = "_trackerBadge_zzjxq_73", Jt = {
  card: rx,
  header: ox,
  name: fx,
  onlineDot: dx,
  offlineDot: vx,
  points: mx,
  negative: hx,
  zero: gx,
  positive: yx,
  metaRow: _x,
  pendingBadge: px,
  trackerBadge: Sx
};
function bx(c) {
  return c < 0 ? Jt.negative : c === 0 ? Jt.zero : Jt.positive;
}
function xx({
  slave: c,
  online: r,
  tracker: d,
  pendingCount: o,
  completionRate: v,
  onClick: h
}) {
  return /* @__PURE__ */ i.jsxs(
    he,
    {
      className: Jt.card,
      onClick: h,
      role: "button",
      tabIndex: 0,
      onKeyDown: function(j) {
        (j.key === "Enter" || j.key === " ") && h();
      },
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: Jt.header, children: [
          /* @__PURE__ */ i.jsx("span", { className: Jt.name, children: c.displayName }),
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: r ? Jt.onlineDot : Jt.offlineDot,
              title: r ? "Online" : "Offline"
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: [Jt.points, bx(c.points)].join(" "), children: [
          c.points,
          " pts"
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: Jt.metaRow, children: [
          /* @__PURE__ */ i.jsxs("span", { children: [
            v,
            "% complete"
          ] }),
          o > 0 ? /* @__PURE__ */ i.jsxs("span", { className: Jt.pendingBadge, children: [
            o,
            " pending"
          ] }) : null
        ] }),
        d ? /* @__PURE__ */ i.jsx("div", { className: Jt.trackerBadge, children: "💰 Tracker running" }) : null
      ]
    }
  );
}
const jx = "_section_szg0t_1", Tx = "_heading_szg0t_5", Nx = "_list_szg0t_10", Ex = "_listItem_szg0t_19", Ax = "_status_szg0t_30", ta = {
  section: jx,
  heading: Tx,
  list: Nx,
  listItem: Ex,
  status: Ax
};
function zx({
  slave: c,
  tasks: r,
  suggestions: d,
  tracker: o,
  onClose: v
}) {
  var h = r.filter(function(A) {
    return A.status === "todo" || A.status === "pending_approval";
  }), j = r.filter(function(A) {
    return A.status === "completed";
  }), w = d.filter(function(A) {
    return A.status === "pending";
  });
  return /* @__PURE__ */ i.jsxs(Oo, { title: c.displayName, onClose: v, children: [
    o ? /* @__PURE__ */ i.jsxs("div", { className: ta.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: ta.heading, children: "Active Cost Tracker" }),
      /* @__PURE__ */ i.jsx(Uc, { tracker: o, isAdmin: !1 })
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: ta.section, children: [
      /* @__PURE__ */ i.jsxs("h4", { className: ta.heading, children: [
        "Tasks (",
        j.length,
        "/",
        r.length,
        " completed)"
      ] }),
      h.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No pending tasks" }) : /* @__PURE__ */ i.jsx("ul", { className: ta.list, children: h.map(function(A) {
        return /* @__PURE__ */ i.jsxs("li", { className: ta.listItem, children: [
          A.text.split(`
`)[0],
          /* @__PURE__ */ i.jsx("span", { className: ta.status, children: A.status })
        ] }, A.id);
      }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: ta.section, children: [
      /* @__PURE__ */ i.jsx("h4", { className: ta.heading, children: "Pending Suggestions" }),
      w.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No pending suggestions" }) : /* @__PURE__ */ i.jsx("ul", { className: ta.list, children: w.map(function(A) {
        return /* @__PURE__ */ i.jsx("li", { className: ta.listItem, children: A.description }, A.id);
      }) })
    ] })
  ] });
}
const wx = "_section_nse19_1", Cx = "_heading_nse19_5", Dx = "_grid_nse19_10", Ox = "_invoiceList_nse19_16", Mx = "_invoiceItem_nse19_25", dl = {
  section: wx,
  heading: Cx,
  grid: Dx,
  invoiceList: Ox,
  invoiceItem: Mx
};
function Rx() {
  var c = _e(), r = $u(), d = Mo(), o = Rc(), v = Ch(), h = wh(), [j, w] = z.useState(null), A = o.tasks.filter(function(U) {
    return U.type === "cost-tracker" && U.status === "pending_approval";
  });
  function R(U) {
    var L = h.activity.find(function(B) {
      return B.user === U;
    });
    return !!(L && L.action === "login");
  }
  function E(U) {
    var L = o.tasks.filter(function(X) {
      return X.assignedTo === U && X.type !== "demerit";
    });
    if (L.length === 0) return 0;
    var B = L.filter(function(X) {
      return X.status === "completed";
    });
    return Math.round(B.length / L.length * 100);
  }
  function _(U) {
    var L = v.suggestions.filter(function(X) {
      return X.suggestedBy === U && X.status === "pending";
    }).length, B = o.tasks.filter(function(X) {
      return X.assignedTo === U && X.appealStatus === "pending";
    }).length;
    return L + B;
  }
  function D(U) {
    return d.trackers.find(function(L) {
      return Array.isArray(L.assigned_to) && L.assigned_to.includes(U);
    });
  }
  var C = j ? r.slaves.find(function(U) {
    return U.username === j;
  }) : null;
  return /* @__PURE__ */ i.jsxs("div", { children: [
    /* @__PURE__ */ i.jsxs(he, { className: dl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: dl.heading, children: "Active Cost Trackers" }),
      d.trackers.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No active cost trackers" }) : d.trackers.map(function(U) {
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
    /* @__PURE__ */ i.jsxs(he, { className: dl.section, children: [
      /* @__PURE__ */ i.jsx("h2", { className: dl.heading, children: "Invoices Awaiting Approval" }),
      A.length === 0 ? /* @__PURE__ */ i.jsx(Ue, { title: "No invoices awaiting approval" }) : /* @__PURE__ */ i.jsx("ul", { className: dl.invoiceList, children: A.map(function(U) {
        return /* @__PURE__ */ i.jsxs("li", { className: dl.invoiceItem, children: [
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
    /* @__PURE__ */ i.jsx("h2", { className: dl.heading, children: c.groupTerms.slaveLabelPlural }),
    r.slaves.length === 0 ? /* @__PURE__ */ i.jsx(
      Ue,
      {
        title: "No " + c.groupTerms.slaveLabelPlural + " added yet"
      }
    ) : /* @__PURE__ */ i.jsx("div", { className: dl.grid, children: r.slaves.map(function(U) {
      return /* @__PURE__ */ i.jsx(
        xx,
        {
          slave: U,
          online: R(U.username),
          tracker: D(U.username),
          pendingCount: _(U.username),
          completionRate: E(U.username),
          onClick: function() {
            w(U.username);
          }
        },
        U.username
      );
    }) }),
    C ? /* @__PURE__ */ i.jsx(
      zx,
      {
        slave: C,
        tasks: o.tasks.filter(function(U) {
          return U.assignedTo === C.username;
        }),
        suggestions: v.suggestions.filter(function(U) {
          return U.suggestedBy === C.username;
        }),
        tracker: D(C.username),
        onClose: function() {
          w(null);
        }
      }
    ) : null
  ] });
}
const Ux = "_banner_7xh6r_1", Hx = {
  banner: Ux
};
function Lx() {
  var c = _e(), r = Mo();
  if (!c.isSlave) return null;
  var d = r.trackers.find(function(o) {
    return Array.isArray(o.assigned_to) && o.assigned_to.includes(c.currentUser);
  });
  return d ? /* @__PURE__ */ i.jsx("div", { className: Hx.banner, children: /* @__PURE__ */ i.jsx(Uc, { tracker: d, isAdmin: !1 }) }) : null;
}
const qx = "_banner_znl1a_1", Bx = {
  banner: qx
};
function Yx() {
  var c = _e(), r = Oh();
  return !c.isSlave || !r.currentMessage ? null : /* @__PURE__ */ i.jsxs("div", { className: Bx.banner, children: [
    /* @__PURE__ */ i.jsx("span", { "aria-hidden": "true", children: "📣" }),
    " ",
    r.currentMessage.body
  ] });
}
function Gx({ activeTab: c }) {
  var r = _e();
  switch (c) {
    case "tasks":
      return /* @__PURE__ */ i.jsx(k1, {});
    case "calendar":
      return /* @__PURE__ */ i.jsx(t_, {});
    case "overview":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Rx, {}) : null;
    case "dashboard":
      return r.isMaster ? /* @__PURE__ */ i.jsx(z_, {}) : null;
    case "tools":
      return r.isMaster ? /* @__PURE__ */ i.jsx(sx, {}) : null;
    case "suggest":
      return /* @__PURE__ */ i.jsx(q_, {});
    case "shop":
      return /* @__PURE__ */ i.jsx(xp, {});
    case "chat":
      return /* @__PURE__ */ i.jsx(NS, {});
    case "admin":
      return r.isMaster ? /* @__PURE__ */ i.jsx(Zp, {}) : null;
    case "masters":
      return r.isAdmin ? /* @__PURE__ */ i.jsx(fS, {}) : null;
    default:
      return null;
  }
}
function Qx() {
  var c = _e(), [r, d] = z.useState("tasks"), o = {
    "--color-bg": c.theme.bg,
    "--color-card": c.theme.card,
    "--color-elevated": c.theme.elevated,
    "--color-text-primary": c.theme.textPrimary,
    "--color-text-secondary": c.theme.textSecondary
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "betaApp", "data-theme": c.themeMode, style: o, children: [
    /* @__PURE__ */ i.jsx(o1, {}),
    /* @__PURE__ */ i.jsx(m1, { activeTab: r, onChange: d }),
    /* @__PURE__ */ i.jsxs("main", { className: "betaContainer", children: [
      /* @__PURE__ */ i.jsx(Yx, {}),
      /* @__PURE__ */ i.jsx(Gx, { activeTab: r })
    ] }),
    /* @__PURE__ */ i.jsx(Lx, {})
  ] });
}
function Xx() {
  return /* @__PURE__ */ i.jsx(G0, { children: /* @__PURE__ */ i.jsx(Qx, {}) });
}
var Yn = null;
function Zx(c) {
  Yn || (Yn = Y0.createRoot(c), Yn.render(/* @__PURE__ */ i.jsx(Xx, {})));
}
function Vx() {
  Yn && (Yn.unmount(), Yn = null);
}
export {
  Zx as mountBetaApp,
  Vx as unmountBetaApp
};
