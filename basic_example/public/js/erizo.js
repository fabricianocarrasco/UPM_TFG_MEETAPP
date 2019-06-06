var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.inherits = function (n, p) {
    function h() {
    }

    h.prototype = p.prototype;
    n.superClass_ = p.prototype;
    n.prototype = new h;
    n.prototype.constructor = n;
    for (var e in p) if (Object.defineProperties) {
        var f = Object.getOwnPropertyDescriptor(p, e);
        f && Object.defineProperty(n, e, f)
    } else n[e] = p[e]
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (n, p, h) {
    n != Array.prototype && n != Object.prototype && (n[p] = h.value)
};
$jscomp.getGlobal = function (n) {
    return "undefined" != typeof window && window === n ? n : "undefined" != typeof global && null != global ? global : n
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
    $jscomp.initSymbol = function () {
    };
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (n) {
    return $jscomp.SYMBOL_PREFIX + (n || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function () {
    $jscomp.initSymbol();
    var n = $jscomp.global.Symbol.iterator;
    n || (n = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[n] && $jscomp.defineProperty(Array.prototype, n, {
        configurable: !0,
        writable: !0,
        value: function () {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function () {
    }
};
$jscomp.arrayIterator = function (n) {
    var p = 0;
    return $jscomp.iteratorPrototype(function () {
        return p < n.length ? {done: !1, value: n[p++]} : {done: !0}
    })
};
$jscomp.iteratorPrototype = function (n) {
    $jscomp.initSymbolIterator();
    n = {next: n};
    n[$jscomp.global.Symbol.iterator] = function () {
        return this
    };
    return n
};
$jscomp.makeIterator = function (n) {
    $jscomp.initSymbolIterator();
    var p = n[Symbol.iterator];
    return p ? p.call(n) : $jscomp.arrayIterator(n)
};
$jscomp.arrayFromIterator = function (n) {
    for (var p, h = []; !(p = n.next()).done;) h.push(p.value);
    return h
};
$jscomp.arrayFromIterable = function (n) {
    return n instanceof Array ? n : $jscomp.arrayFromIterator($jscomp.makeIterator(n))
};
$jscomp.polyfill = function (n, p, h, e) {
    if (p) {
        h = $jscomp.global;
        n = n.split(".");
        for (e = 0; e < n.length - 1; e++) {
            var f = n[e];
            f in h || (h[f] = {});
            h = h[f]
        }
        n = n[n.length - 1];
        e = h[n];
        p = p(e);
        p != e && null != p && $jscomp.defineProperty(h, n, {configurable: !0, writable: !0, value: p})
    }
};
$jscomp.polyfill("Array.from", function (n) {
    return n ? n : function (n, h, e) {
        $jscomp.initSymbolIterator();
        h = null != h ? h : function (a) {
            return a
        };
        var f = [], c = n[Symbol.iterator];
        if ("function" == typeof c) for (n = c.call(n); !(c = n.next()).done;) f.push(h.call(e, c.value)); else for (var c = n.length, a = 0; a < c; a++) f.push(h.call(e, n[a]));
        return f
    }
}, "es6-impl", "es3");
$jscomp.iteratorFromArray = function (n, p) {
    $jscomp.initSymbolIterator();
    n instanceof String && (n += "");
    var h = 0, e = {
        next: function () {
            if (h < n.length) {
                var f = h++;
                return {value: p(f, n[f]), done: !1}
            }
            e.next = function () {
                return {done: !0, value: void 0}
            };
            return e.next()
        }
    };
    e[Symbol.iterator] = function () {
        return e
    };
    return e
};
$jscomp.polyfill("Array.prototype.keys", function (n) {
    return n ? n : function () {
        return $jscomp.iteratorFromArray(this, function (n) {
            return n
        })
    }
}, "es6-impl", "es3");
$jscomp.owns = function (n, p) {
    return Object.prototype.hasOwnProperty.call(n, p)
};
$jscomp.polyfill("WeakMap", function (n) {
    function p(a) {
        $jscomp.owns(a, e) || $jscomp.defineProperty(a, e, {value: {}})
    }

    function h(a) {
        var t = Object[a];
        t && (Object[a] = function (a) {
            p(a);
            return t(a)
        })
    }

    if (function () {
        if (!n || !Object.seal) return !1;
        try {
            var a = Object.seal({}), t = Object.seal({}), c = new n([[a, 2], [t, 3]]);
            if (2 != c.get(a) || 3 != c.get(t)) return !1;
            c.delete(a);
            c.set(t, 4);
            return !c.has(a) && 4 == c.get(t)
        } catch (b) {
            return !1
        }
    }()) return n;
    var e = "$jscomp_hidden_" + Math.random().toString().substring(2);
    h("freeze");
    h("preventExtensions");
    h("seal");
    var f = 0, c = function (a) {
        this.id_ = (f += Math.random() + 1).toString();
        if (a) {
            $jscomp.initSymbol();
            $jscomp.initSymbolIterator();
            a = $jscomp.makeIterator(a);
            for (var t; !(t = a.next()).done;) t = t.value, this.set(t[0], t[1])
        }
    };
    c.prototype.set = function (a, t) {
        p(a);
        if (!$jscomp.owns(a, e)) throw Error("WeakMap key fail: " + a);
        a[e][this.id_] = t;
        return this
    };
    c.prototype.get = function (a) {
        return $jscomp.owns(a, e) ? a[e][this.id_] : void 0
    };
    c.prototype.has = function (a) {
        return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_)
    };
    c.prototype.delete =
        function (a) {
            return $jscomp.owns(a, e) && $jscomp.owns(a[e], this.id_) ? delete a[e][this.id_] : !1
        };
    return c
}, "es6-impl", "es3");
$jscomp.MapEntry = function () {
};
$jscomp.polyfill("Map", function (n) {
    if (!$jscomp.ASSUME_NO_NATIVE_MAP && function () {
        if (!n || !n.prototype.entries || "function" != typeof Object.seal) return !1;
        try {
            var a = Object.seal({x: 4}), c = new n($jscomp.makeIterator([[a, "s"]]));
            if ("s" != c.get(a) || 1 != c.size || c.get({x: 4}) || c.set({x: 4}, "t") != c || 2 != c.size) return !1;
            var b = c.entries(), g = b.next();
            if (g.done || g.value[0] != a || "s" != g.value[1]) return !1;
            g = b.next();
            return g.done || 4 != g.value[0].x || "t" != g.value[1] || !b.next().done ? !1 : !0
        } catch (l) {
            return !1
        }
    }()) return n;
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    var p = new WeakMap, h = function (a) {
        this.data_ = {};
        this.head_ = c();
        this.size = 0;
        if (a) {
            a = $jscomp.makeIterator(a);
            for (var t; !(t = a.next()).done;) t = t.value, this.set(t[0], t[1])
        }
    };
    h.prototype.set = function (a, c) {
        var b = e(this, a);
        b.list || (b.list = this.data_[b.id] = []);
        b.entry ? b.entry.value = c : (b.entry = {
            next: this.head_,
            previous: this.head_.previous,
            head: this.head_,
            key: a,
            value: c
        }, b.list.push(b.entry), this.head_.previous.next = b.entry, this.head_.previous = b.entry, this.size++);
        return this
    };
    h.prototype.delete =
        function (a) {
            a = e(this, a);
            return a.entry && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.data_[a.id], a.entry.previous.next = a.entry.next, a.entry.next.previous = a.entry.previous, a.entry.head = null, this.size--, !0) : !1
        };
    h.prototype.clear = function () {
        this.data_ = {};
        this.head_ = this.head_.previous = c();
        this.size = 0
    };
    h.prototype.has = function (a) {
        return !!e(this, a).entry
    };
    h.prototype.get = function (a) {
        return (a = e(this, a).entry) && a.value
    };
    h.prototype.entries = function () {
        return f(this, function (a) {
            return [a.key,
                a.value]
        })
    };
    h.prototype.keys = function () {
        return f(this, function (a) {
            return a.key
        })
    };
    h.prototype.values = function () {
        return f(this, function (a) {
            return a.value
        })
    };
    h.prototype.forEach = function (a, c) {
        for (var b = this.entries(), g; !(g = b.next()).done;) g = g.value, a.call(c, g[1], g[0], this)
    };
    h.prototype[Symbol.iterator] = h.prototype.entries;
    var e = function (c, m) {
        var b = m && typeof m;
        "object" == b || "function" == b ? p.has(m) ? b = p.get(m) : (b = "" + ++a, p.set(m, b)) : b = "p_" + m;
        var g = c.data_[b];
        if (g && $jscomp.owns(c.data_, b)) for (c = 0; c < g.length; c++) {
            var l =
                g[c];
            if (m !== m && l.key !== l.key || m === l.key) return {id: b, list: g, index: c, entry: l}
        }
        return {id: b, list: g, index: -1, entry: void 0}
    }, f = function (a, c) {
        var b = a.head_;
        return $jscomp.iteratorPrototype(function () {
            if (b) {
                for (; b.head != a.head_;) b = b.previous;
                for (; b.next != b.head;) return b = b.next, {done: !1, value: c(b)};
                b = null
            }
            return {done: !0, value: void 0}
        })
    }, c = function () {
        var a = {};
        return a.previous = a.next = a.head = a
    }, a = 0;
    return h
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function (n) {
    return n ? n : function () {
        return $jscomp.iteratorFromArray(this, function (n, h) {
            return h
        })
    }
}, "es6", "es3");
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (n) {
    function p() {
        this.batch_ = null
    }

    function h(a) {
        return a instanceof f ? a : new f(function (c, m) {
            c(a)
        })
    }

    if (n && !$jscomp.FORCE_POLYFILL_PROMISE) return n;
    p.prototype.asyncExecute = function (a) {
        null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_());
        this.batch_.push(a);
        return this
    };
    p.prototype.asyncExecuteBatch_ = function () {
        var a = this;
        this.asyncExecuteFunction(function () {
            a.executeBatch_()
        })
    };
    var e = $jscomp.global.setTimeout;
    p.prototype.asyncExecuteFunction = function (a) {
        e(a,
            0)
    };
    p.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length;) {
            var a = this.batch_;
            this.batch_ = [];
            for (var c = 0; c < a.length; ++c) {
                var m = a[c];
                delete a[c];
                try {
                    m()
                } catch (b) {
                    this.asyncThrow_(b)
                }
            }
        }
        this.batch_ = null
    };
    p.prototype.asyncThrow_ = function (a) {
        this.asyncExecuteFunction(function () {
            throw a;
        })
    };
    var f = function (a) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        var c = this.createResolveAndReject_();
        try {
            a(c.resolve, c.reject)
        } catch (m) {
            c.reject(m)
        }
    };
    f.prototype.createResolveAndReject_ =
        function () {
            function a(b) {
                return function (a) {
                    m || (m = !0, b.call(c, a))
                }
            }

            var c = this, m = !1;
            return {resolve: a(this.resolveTo_), reject: a(this.reject_)}
        };
    f.prototype.resolveTo_ = function (a) {
        if (a === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (a instanceof f) this.settleSameAsPromise_(a); else {
            a:switch (typeof a) {
                case "object":
                    var c = null != a;
                    break a;
                case "function":
                    c = !0;
                    break a;
                default:
                    c = !1
            }
            c ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
        }
    };
    f.prototype.resolveToNonPromiseObj_ = function (a) {
        var c =
            void 0;
        try {
            c = a.then
        } catch (m) {
            this.reject_(m);
            return
        }
        "function" == typeof c ? this.settleSameAsThenable_(c, a) : this.fulfill_(a)
    };
    f.prototype.reject_ = function (a) {
        this.settle_(2, a)
    };
    f.prototype.fulfill_ = function (a) {
        this.settle_(1, a)
    };
    f.prototype.settle_ = function (a, c) {
        if (0 != this.state_) throw Error("Cannot settle(" + a + ", " + c | "): Promise already settled in state" + this.state_);
        this.state_ = a;
        this.result_ = c;
        this.executeOnSettledCallbacks_()
    };
    f.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
            for (var a =
                this.onSettledCallbacks_, c = 0; c < a.length; ++c) a[c].call(), a[c] = null;
            this.onSettledCallbacks_ = null
        }
    };
    var c = new p;
    f.prototype.settleSameAsPromise_ = function (a) {
        var c = this.createResolveAndReject_();
        a.callWhenSettled_(c.resolve, c.reject)
    };
    f.prototype.settleSameAsThenable_ = function (a, c) {
        var m = this.createResolveAndReject_();
        try {
            a.call(c, m.resolve, m.reject)
        } catch (b) {
            m.reject(b)
        }
    };
    f.prototype.then = function (a, c) {
        function m(a, c) {
            return "function" == typeof a ? function (d) {
                try {
                    b(a(d))
                } catch (u) {
                    g(u)
                }
            } : c
        }

        var b, g, l = new f(function (a,
                                      c) {
            b = a;
            g = c
        });
        this.callWhenSettled_(m(a, b), m(c, g));
        return l
    };
    f.prototype.catch = function (a) {
        return this.then(void 0, a)
    };
    f.prototype.callWhenSettled_ = function (a, f) {
        function m() {
            switch (b.state_) {
                case 1:
                    a(b.result_);
                    break;
                case 2:
                    f(b.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + b.state_);
            }
        }

        var b = this;
        null == this.onSettledCallbacks_ ? c.asyncExecute(m) : this.onSettledCallbacks_.push(function () {
            c.asyncExecute(m)
        })
    };
    f.resolve = h;
    f.reject = function (a) {
        return new f(function (c, f) {
            f(a)
        })
    };
    f.race = function (a) {
        return new f(function (c,
                               f) {
            for (var b = $jscomp.makeIterator(a), g = b.next(); !g.done; g = b.next()) h(g.value).callWhenSettled_(c, f)
        })
    };
    f.all = function (a) {
        var c = $jscomp.makeIterator(a), e = c.next();
        return e.done ? h([]) : new f(function (a, g) {
            function b(b) {
                return function (g) {
                    d[b] = g;
                    f--;
                    0 == f && a(d)
                }
            }

            var d = [], f = 0;
            do d.push(void 0), f++, h(e.value).callWhenSettled_(b(d.length - 1), g), e = c.next(); while (!e.done)
        })
    };
    return f
}, "es6-impl", "es3");
$jscomp.findInternal = function (n, p, h) {
    n instanceof String && (n = String(n));
    for (var e = n.length, f = 0; f < e; f++) {
        var c = n[f];
        if (p.call(h, c, f, n)) return {i: f, v: c}
    }
    return {i: -1, v: void 0}
};
$jscomp.polyfill("Array.prototype.find", function (n) {
    return n ? n : function (n, h) {
        return $jscomp.findInternal(this, n, h).v
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Object.assign", function (n) {
    return n ? n : function (n, h) {
        for (var e = 1; e < arguments.length; e++) {
            var f = arguments[e];
            if (f) for (var c in f) $jscomp.owns(f, c) && (n[c] = f[c])
        }
        return n
    }
}, "es6-impl", "es3");
var Erizo = function (n) {
    function p(e) {
        if (h[e]) return h[e].exports;
        var f = h[e] = {i: e, l: !1, exports: {}};
        n[e].call(f.exports, f, f.exports, p);
        f.l = !0;
        return f.exports
    }

    var h = {};
    p.m = n;
    p.c = h;
    p.d = function (e, f, c) {
        p.o(e, f) || Object.defineProperty(e, f, {configurable: !1, enumerable: !0, get: c})
    };
    p.n = function (e) {
        var f = e && e.__esModule ? function () {
            return e["default"]
        } : function () {
            return e
        };
        p.d(f, "a", f);
        return f
    };
    p.o = function (e, f) {
        return Object.prototype.hasOwnProperty.call(e, f)
    };
    p.p = "";
    return p(p.s = 25)
}([function (n, p, h) {
    var e =
        function () {
            var f = "";
            var c = function (a) {
                console.log.apply(console, [].concat($jscomp.arrayFromIterable(a)))
            };
            return {
                DEBUG: 0, TRACE: 1, INFO: 2, WARNING: 3, ERROR: 4, NONE: 5, setLogLevel: function (a) {
                    var c = a;
                    a > e.NONE ? c = e.NONE : a < e.DEBUG && (c = e.DEBUG);
                    e.logLevel = c
                }, setOutputFunction: function (a) {
                    c = a
                }, setLogPrefix: function (a) {
                    f = a
                }, log: function (a, t) {
                    for (var m = [], b = 1; b < arguments.length; ++b) m[b - 1] = arguments[b];
                    b = f;
                    if (!(a < e.logLevel)) if (a === e.DEBUG ? b += "DEBUG" : a === e.TRACE ? b += "TRACE" : a === e.INFO ? b += "INFO" : a === e.WARNING ? b +=
                        "WARNING" : a === e.ERROR && (b += "ERROR"), m = [b + ": "].concat(m), void 0 !== e.panel) {
                        for (var b = "", g = 0; g < m.length; g += 1) b += m[g];
                        e.panel.value = e.panel.value + "\n" + b
                    } else c.apply(e, [m])
                }, debug: function (a) {
                    for (var c = [], f = 0; f < arguments.length; ++f) c[f - 0] = arguments[f];
                    e.log.apply(e, [].concat([e.DEBUG], $jscomp.arrayFromIterable(c)))
                }, trace: function (a) {
                    for (var c = [], f = 0; f < arguments.length; ++f) c[f - 0] = arguments[f];
                    e.log.apply(e, [].concat([e.TRACE], $jscomp.arrayFromIterable(c)))
                }, info: function (a) {
                    for (var c = [], f = 0; f < arguments.length; ++f) c[f -
                    0] = arguments[f];
                    e.log.apply(e, [].concat([e.INFO], $jscomp.arrayFromIterable(c)))
                }, warning: function (a) {
                    for (var c = [], f = 0; f < arguments.length; ++f) c[f - 0] = arguments[f];
                    e.log.apply(e, [].concat([e.WARNING], $jscomp.arrayFromIterable(c)))
                }, error: function (a) {
                    for (var c = [], f = 0; f < arguments.length; ++f) c[f - 0] = arguments[f];
                    e.log.apply(e, [].concat([e.ERROR], $jscomp.arrayFromIterable(c)))
                }
            }
        }();
    p.a = e
}, function (n, p, h) {
    h.d(p, "b", function () {
        return f
    });
    h.d(p, "c", function () {
        return c
    });
    h.d(p, "d", function () {
        return a
    });
    h.d(p,
        "e", function () {
            return m
        });
    h.d(p, "f", function () {
        return b
    });
    h.d(p, "a", function () {
        return t
    });
    var e = h(0), f = function () {
        var a = {}, b = {};
        a.addEventListener = function (a, g) {
            void 0 === b[a] && (b[a] = []);
            b[a].push(g)
        };
        a.removeEventListener = function (a, g) {
            b[a] && (g = b[a].indexOf(g), -1 !== g && b[a].splice(g, 1))
        };
        a.removeAllListeners = function () {
            b = {}
        };
        a.dispatchEvent = function (a) {
            if (!a || !a.type) throw Error("Undefined event");
            e.a.debug("Event: " + a.type);
            for (var g = b[a.type] || [], d = 0; d < g.length; d += 1) g[d](a)
        };
        a.on = a.addEventListener;
        a.off = a.removeEventListener;
        a.emit = a.dispatchEvent;
        return a
    }, c = function () {
        this.emitter = f()
    };
    c.prototype.addEventListener = function (a, b) {
        this.emitter.addEventListener(a, b)
    };
    c.prototype.removeEventListener = function (a, b) {
        this.emitter.removeEventListener(a, b)
    };
    c.prototype.dispatchEvent = function (a) {
        this.emitter.dispatchEvent(a)
    };
    c.prototype.on = function (a, b) {
        this.addEventListener(a, b)
    };
    c.prototype.off = function (a, b) {
        this.removeEventListener(a, b)
    };
    c.prototype.emit = function (a) {
        this.dispatchEvent(a)
    };
    var a =
        function (a) {
            var b = {};
            b.type = a.type;
            return b
        }, t = function (b) {
        var g = a(b);
        g.stream = b.stream;
        g.state = b.state;
        return g
    }, m = function (b) {
        var g = a(b);
        g.streams = b.streams;
        g.message = b.message;
        return g
    }, b = function (b) {
        var g = a(b);
        g.stream = b.stream;
        g.msg = b.msg;
        g.bandwidth = b.bandwidth;
        g.attrs = b.attrs;
        return g
    }
}, function (n, p, h) {
    var e = h(5)("ACTIVE", "PASSIVE", "ACTPASS", "INACTIVE");
    e.byValue = function (f) {
        return e[f.toUpperCase()]
    };
    e.toString = function (f) {
        switch (f) {
            case e.ACTIVE:
                return "active";
            case e.PASSIVE:
                return "passive";
            case e.ACTPASS:
                return "actpass";
            case e.INACTIVE:
                return "inactive";
            default:
                return null
        }
    };
    e.reverse = function (f) {
        switch (f) {
            case e.ACTIVE:
                return e.PASSIVE;
            case e.PASSIVE:
                return e.ACTIVE;
            case e.ACTPASS:
                return e.PASSIVE;
            case e.INACTIVE:
                return e.INACTIVE;
            default:
                return e.ACTIVE
        }
    };
    n.exports = e
}, function (n, p, h) {
    var e = h(5)("SEND", "RECV");
    e.byValue = function (f) {
        return e[f.toUpperCase()]
    };
    e.toString = function (f) {
        switch (f) {
            case e.SEND:
                return "send";
            case e.RECV:
                return "recv";
            default:
                return "unknown"
        }
    };
    e.reverse = function (f) {
        switch (f) {
            case e.SEND:
                return e.RECV;
            case e.RECV:
                return e.SEND;
            default:
                return e.SEND
        }
    };
    n.exports = e
}, function (n, p, h) {
    var e = h(1);
    p.a = function () {
        var f = Object(e.b)({});
        f.url = "";
        return f
    }
}, function (n, p) {
    function h(e) {
        for (var f = [], c = 0; c < arguments.length; ++c) f[c - 0] = arguments[c];
        var a = this;
        if (!(this instanceof h)) return new (Function.prototype.bind.apply(h, [null].concat(Array.prototype.slice.call(f))));
        Array.from(f).forEach(function (c) {
            $jscomp.initSymbol();
            a[c] = Symbol.for("LICODE_SEMANTIC_SDP_" + c)
        })
    }

    n.exports = h
}, function (n, p, h) {
    var e = h(5)("SENDRECV",
        "SENDONLY", "RECVONLY", "INACTIVE");
    e.byValue = function (f) {
        return e[f.toUpperCase()]
    };
    e.toString = function (f) {
        switch (f) {
            case e.SENDRECV:
                return "sendrecv";
            case e.SENDONLY:
                return "sendonly";
            case e.RECVONLY:
                return "recvonly";
            case e.INACTIVE:
                return "inactive";
            default:
                return "unknown"
        }
    };
    e.reverse = function (f) {
        switch (f) {
            case e.SENDRECV:
                return e.SENDRECV;
            case e.SENDONLY:
                return e.RECVONLY;
            case e.RECVONLY:
                return e.SENDONLY;
            case e.INACTIVE:
                return e.INACTIVE;
            default:
                return e.SENDRECV
        }
    };
    n.exports = e
}, function (n, p, h) {
    p.a =
        function () {
            var e = {}, f = {};
            e.add = function (c, a) {
                f[c] = a
            };
            e.get = function (c) {
                return f[c]
            };
            e.has = function (c) {
                return void 0 !== f[c]
            };
            e.size = function () {
                return Object.keys(f).length
            };
            e.forEach = function (c) {
                for (var a = Object.keys(f), e = 0; e < a.length; e += 1) {
                    var m = a[e];
                    c(f[m], m)
                }
            };
            e.keys = function () {
                return Object.keys(f)
            };
            e.remove = function (c) {
                delete f[c]
            };
            e.clear = function () {
                f = {}
            };
            return e
        }
}, function (n, p, h) {
    (function (e) {
        var f = h(0), c = function () {
            var a = "none";
            "undefined" !== typeof e && e.exports ? a = "fake" : null !== window.navigator.userAgent.match("Firefox") ?
                a = "mozilla" : null !== window.navigator.userAgent.match("Chrome") ? (a = "chrome-stable", null !== window.navigator.userAgent.match("Electron") && (a = "electron")) : null !== window.navigator.userAgent.match("Safari") ? a = "safari" : null !== window.navigator.userAgent.match("AppleWebKit") && (a = "safari");
            return a
        };
        p.a = {
            GetUserMedia: function (a, t, m) {
                t = void 0 === t ? function () {
                } : t;
                m = void 0 === m ? function () {
                } : m;
                var b, g = function (a, b, g) {
                    navigator.mediaDevices.getUserMedia(a).then(b).catch(g)
                }, l = function () {
                    f.a.debug("Screen access requested");
                    switch (c()) {
                        case "electron":
                            f.a.debug("Screen sharing in Electron");
                            b = {};
                            b.video = a.video || {};
                            b.video.mandatory = a.video.mandatory || {};
                            b.video.mandatory.chromeMediaSource = "desktop";
                            b.video.mandatory.chromeMediaSourceId = a.desktopStreamId;
                            g(b, t, m);
                            break;
                        case "mozilla":
                            f.a.debug("Screen sharing in Firefox");
                            b = {};
                            void 0 !== a.video ? (b.video = a.video, b.video.mediaSource || (b.video.mediaSource = "window")) : b = {
                                audio: a.audio,
                                video: {mediaSource: "window"}
                            };
                            g(b, t, m);
                            break;
                        case "chrome-stable":
                            f.a.debug("Screen sharing in Chrome");
                            b = {};
                            if (a.desktopStreamId) b.video = a.video || {mandatory: {}}, b.video.mandatory = b.video.mandatory || {}, b.video.mandatory.chromeMediaSource = "desktop", b.video.mandatory.chromeMediaSourceId = a.desktopStreamId, g(b, t, m); else {
                                var d = "okeephmleflklcdebijnponpabbmmgeo";
                                a.extensionId && (f.a.debug("extensionId supplied, using " + a.extensionId), d = a.extensionId);
                                f.a.debug("Screen access on chrome stable, looking for extension");
                                try {
                                    chrome.runtime.sendMessage(d, {getStream: !0}, function (d) {
                                        void 0 === d ? (f.a.error("Access to screen denied"),
                                            m({code: "Access to screen denied"})) : (d = d.streamId, void 0 !== a.video.mandatory ? (b.video = a.video || {mandatory: {}}, b.video.mandatory.chromeMediaSource = "desktop", b.video.mandatory.chromeMediaSourceId = d) : b = {
                                            video: {
                                                mandatory: {
                                                    chromeMediaSource: "desktop",
                                                    chromeMediaSourceId: d
                                                }
                                            }
                                        }, g(b, t, m))
                                    })
                                } catch (r) {
                                    f.a.debug("Screensharing plugin is not accessible "), m({code: "no_plugin_present"})
                                }
                            }
                            break;
                        default:
                            f.a.error("This browser does not support ScreenSharing")
                    }
                };
                a.screen ? l() : "undefined" !== typeof e && e.exports ? f.a.error("Video/audio streams not supported in erizofc yet") :
                    (f.a.debug("Calling getUserMedia with config", a), g(a, t, m))
            }, getBrowser: c
        }
    }).call(p, h(40)(n))
}, function (n, p, h) {
    var e = this;
    n = h(29);
    var f = h.n(n);
    n = h(2);
    var c = h.n(n), a = h(21), t = h(0), m = h(37);
    p.a = function (b) {
        var g = {}, l = new m.a, d = new m.a, r = !1, w, u, q, k, v = -1;
        t.a.info("Starting Base stack", b);
        g.pcConfig = {iceServers: [], sdpSemantics: "plan-b"};
        g.con = {};
        void 0 !== b.iceServers && (g.pcConfig.iceServers = b.iceServers);
        !0 === b.forceTurn && (g.pcConfig.iceTransportPolicy = "relay");
        g.audio = b.audio;
        g.video = b.video;
        void 0 === g.audio &&
        (g.audio = !0);
        void 0 === g.video && (g.video = !0);
        b.remoteCandidates = [];
        b.localCandidates = [];
        b.remoteDescriptionSet = !1;
        g.mediaConstraints = {
            offerToReceiveVideo: void 0 !== g.video && !1 !== g.video,
            offerToReceiveAudio: void 0 !== g.audio && !1 !== g.audio
        };
        g.peerConnection = new RTCPeerConnection(g.pcConfig, g.con);
        var x = function (a, b, k) {
            t.a.error("message:", k, "in baseStack at", a);
            void 0 !== b && b("error")
        }, y = function (k, d, c) {
            w = c;
            k || (w.sdp = g.enableSimulcast(w.sdp));
            q = f.a.SDPInfo.processString(w.sdp);
            a.a.setMaxBW(q, b);
            w.sdp = q.toString();
            g.localSdp = q;
            b.callback({type: w.type, sdp: w.sdp, config: {maxVideoBW: b.maxVideoBW}}, d)
        }, h = function (k, d) {
            w = d;
            w.type = "answer";
            q = f.a.SDPInfo.processString(w.sdp);
            a.a.setMaxBW(q, b);
            w.sdp = q.toString();
            g.localSdp = q;
            b.callback({type: w.type, sdp: w.sdp, config: {maxVideoBW: b.maxVideoBW}}, k);
            t.a.info("Setting local description", w);
            t.a.debug("processOffer - Local Description", w.type, w.sdp);
            return g.peerConnection.setLocalDescription(w)
        }, C = function () {
            w.type = "offer";
            q = f.a.SDPInfo.processString(w.sdp);
            a.a.setMaxBW(q,
                b);
            q.medias.forEach(function (a) {
                a.getSetup() !== c.a.ACTPASS && a.setSetup(c.a.ACTPASS)
            });
            w.sdp = q.toString();
            g.localSdp = q
        }, n = l.protectFunction(function (c, q) {
            var m = (k = f.a.SDPInfo.processString(c.sdp)) && k.origin && k.origin.sessionVersion;
            v >= m ? (t.a.warning("message: processOffer discarding old sdp sessionVersion: " + m + ", latestSessionVersion: " + v), b.callback({
                type: "answer",
                sdp: w.sdp,
                config: {maxVideoBW: b.maxVideoBW}
            }, q)) : (l.startEnqueuing(), v = m, a.a.setMaxBW(k, b), c.sdp = k.toString(), g.remoteSdp = k, g.peerConnection.setRemoteDescription(c).then(function () {
                b.remoteDescriptionSet =
                    !0
            }).then(function () {
                return g.peerConnection.createAnswer(g.mediaConstraints)
            }).catch(x.bind(null, "createAnswer", void 0)).then(h.bind(e, q)).catch(x.bind(null, "process Offer", void 0)).then(function () {
                r = !0;
                d.stopEnqueuing();
                d.dequeueAll();
                l.stopEnqueuing();
                l.nextInQueue()
            }))
        }), F = d.protectFunction(function (a, b) {
            r || d.startEnqueuing();
            n(a, b)
        }), p = l.protectFunction(function (c) {
            var q = (k = f.a.SDPInfo.processString(c.sdp)) && k.origin && k.origin.sessionVersion;
            v >= q ? t.a.warning("processAnswer discarding old sdp, sessionVersion: " +
                q + ", latestSessionVersion: " + v) : (l.startEnqueuing(), v = q, t.a.info("Set remote and local description"), a.a.setMaxBW(k, b), g.setStartVideoBW(k), g.setHardMinVideoBW(k), c.sdp = k.toString(), C(), t.a.debug("processAnswer - Remote Description", c.type, c.sdp), t.a.debug("processAnswer - Local Description", c.type, w.sdp), g.remoteSdp = k, u = c, g.peerConnection.setLocalDescription(w).then(function () {
                return g.peerConnection.setRemoteDescription(new RTCSessionDescription(c))
            }).then(function () {
                b.remoteDescriptionSet = !0;
                for (t.a.info("Candidates to be added: ",
                    b.remoteCandidates.length, b.remoteCandidates); 0 < b.remoteCandidates.length;) g.peerConnection.addIceCandidate(b.remoteCandidates.shift());
                for (t.a.info("Local candidates to send:", b.localCandidates.length); 0 < b.localCandidates.length;) b.callback({
                    type: "candidate",
                    candidate: b.localCandidates.shift()
                })
            }).catch(x.bind(null, "processAnswer", void 0)).then(function () {
                r = !0;
                d.stopEnqueuing();
                d.dequeueAll();
                l.stopEnqueuing();
                l.nextInQueue()
            }))
        });
        g.peerConnection.onicecandidate = function (a) {
            (a = a.candidate) ? (a = {
                sdpMLineIndex: a.sdpMLineIndex,
                sdpMid: a.sdpMid, candidate: a.candidate
            }, a.candidate.match(/a=/) || (a.candidate = "a\x3d" + a.candidate)) : (t.a.info("Gathered all candidates. Sending END candidate"), a = {
                sdpMLineIndex: -1,
                sdpMid: "end",
                candidate: "end"
            });
            b.remoteDescriptionSet ? b.callback({
                type: "candidate",
                candidate: a
            }) : (b.localCandidates.push(a), t.a.info("Storing candidate: ", b.localCandidates.length, a))
        };
        g.setStartVideoBW = function (a) {
            t.a.error("startVideoBW not implemented for this browser");
            return a
        };
        g.setHardMinVideoBW = function (a) {
            t.a.error("hardMinVideoBw not implemented for this browser");
            return a
        };
        g.enableSimulcast = function (a) {
            t.a.error("Simulcast not implemented");
            return a
        };
        g.close = function () {
            g.state = "closed";
            g.peerConnection.close()
        };
        g.setSimulcast = function (a) {
            g.simulcast = a
        };
        g.setVideo = function (a) {
            g.video = a
        };
        g.setAudio = function (a) {
            g.audio = a
        };
        g.updateSpec = function (d, c, l) {
            l = void 0 === l ? function () {
            } : l;
            var e = !b.p2p && d.maxVideoBW;
            if (b.p2p && d.maxVideoBW || d.maxAudioBW) d.maxVideoBW && (t.a.debug("Maxvideo Requested:", d.maxVideoBW, "limit:", b.limitMaxVideoBW), d.maxVideoBW > b.limitMaxVideoBW &&
            (d.maxVideoBW = b.limitMaxVideoBW), b.maxVideoBW = d.maxVideoBW, t.a.debug("Result", b.maxVideoBW)), d.maxAudioBW && (d.maxAudioBW > b.limitMaxAudioBW && (d.maxAudioBW = b.limitMaxAudioBW), b.maxAudioBW = d.maxAudioBW), q = f.a.SDPInfo.processString(w.sdp), a.a.setMaxBW(q, b), w.sdp = q.toString(), g.localSdp = q, d.Sdp || d.maxAudioBW ? (t.a.debug("Updating with SDP renegotiation", b.maxVideoBW, b.maxAudioBW), g.peerConnection.setLocalDescription(w).then(function () {
                k = f.a.SDPInfo.processString(u.sdp);
                a.a.setMaxBW(k, b);
                u.sdp = k.toString();
                g.remoteSdp = k;
                return g.peerConnection.setRemoteDescription(new RTCSessionDescription(u))
            }).then(function () {
                b.remoteDescriptionSet = !0;
                b.callback({type: "updatestream", sdp: w.sdp}, c)
            }).catch(x.bind(null, "updateSpec", l))) : (t.a.debug("Updating without SDP renegotiation, newVideoBW:", b.maxVideoBW, "newAudioBW:", b.maxAudioBW), b.callback({
                type: "updatestream",
                sdp: w.sdp
            }, c));
            if (e || d.minVideoBW || void 0 !== d.slideShowMode || void 0 !== d.muteStream || void 0 !== d.qualityLayer || void 0 !== d.slideShowBelowLayer || void 0 !==
                d.video) t.a.debug("MaxVideoBW Changed to ", d.maxVideoBW), t.a.debug("MinVideo Changed to ", d.minVideoBW), t.a.debug("SlideShowMode Changed to ", d.slideShowMode), t.a.debug("muteStream changed to ", d.muteStream), t.a.debug("Video Constraints", d.video), t.a.debug("Will activate slideshow when below layer", d.slideShowBelowLayer), b.callback({
                type: "updatestream",
                config: d
            }, c)
        };
        var A = l.protectFunction(function (a, b) {
            a = void 0 === a ? !1 : a;
            b = void 0 === b ? "" : b;
            l.startEnqueuing();
            t.a.debug("Creating offer", g.mediaConstraints,
                b);
            g.peerConnection.createOffer(g.mediaConstraints).then(y.bind(null, a, b)).catch(x.bind(null, "Create Offer", void 0)).then(function () {
                l.stopEnqueuing();
                l.nextInQueue()
            })
        });
        g.createOffer = d.protectFunction(function (a, b, k) {
            a = void 0 === a ? !1 : a;
            b = void 0 === b ? !1 : b;
            k = void 0 === k ? "" : k;
            r || d.startEnqueuing();
            a || b || (g.mediaConstraints = {offerToReceiveVideo: !1, offerToReceiveAudio: !1});
            A(a, k)
        });
        g.addStream = function (a) {
            g.peerConnection.addStream(a)
        };
        g.removeStream = function (a) {
            g.peerConnection.removeStream(a)
        };
        g.processSignalingMessage =
            function (a, d) {
                if ("offer" === a.type) F(a, d); else if ("answer" === a.type) p(a); else if ("candidate" === a.type) try {
                    var k = "object" === typeof a.candidate ? a.candidate : JSON.parse(a.candidate);
                    if ("end" !== k.candidate) {
                        k.candidate = k.candidate.replace(/a=/g, "");
                        k.sdpMLineIndex = parseInt(k.sdpMLineIndex, 10);
                        var c = new RTCIceCandidate(k);
                        b.remoteDescriptionSet ? g.peerConnection.addIceCandidate(c) : b.remoteCandidates.push(c)
                    }
                } catch (J) {
                    t.a.error("Error parsing candidate", a.candidate)
                }
            };
        return g
    }
}, function (n, p) {
    var h = n.exports =
        {
            v: [{name: "version", reg: /^(\d*)$/}],
            o: [{
                name: "origin",
                reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
                names: "username sessionId sessionVersion netType ipVer address".split(" "),
                format: "%s %s %d %s IP%d %s"
            }],
            s: [{name: "name"}],
            i: [{name: "description"}],
            u: [{name: "uri"}],
            e: [{name: "email"}],
            p: [{name: "phone"}],
            z: [{name: "timezones"}],
            r: [{name: "repeats"}],
            t: [{name: "timing", reg: /^(\d*) (\d*)/, names: ["start", "stop"], format: "%d %d"}],
            c: [{name: "connection", reg: /^IN IP(\d) (\S*)/, names: ["version", "ip"], format: "IN IP%d %s"}],
            b: [{push: "bandwidth", reg: /^(TIAS|AS|CT|RR|RS):(\d*)/, names: ["type", "limit"], format: "%s:%s"}],
            m: [{
                reg: /^(\w*) (\d*) ([\w\/]*)(?: (.*))?/,
                names: ["type", "port", "protocol", "payloads"],
                format: "%s %d %s %s"
            }],
            a: [{
                push: "rtp",
                reg: /^rtpmap:(\d*) ([\w\-\.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
                names: ["payload", "codec", "rate", "encoding"],
                format: function (e) {
                    return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s"
                }
            }, {push: "fmtp", reg: /^fmtp:(\d*) ([\S| ]*)/, names: ["payload", "config"], format: "fmtp:%d %s"},
                {name: "control", reg: /^control:(.*)/, format: "control:%s"}, {
                    name: "rtcp",
                    reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
                    names: ["port", "netType", "ipVer", "address"],
                    format: function (e) {
                        return null != e.address ? "rtcp:%d %s IP%d %s" : "rtcp:%d"
                    }
                }, {
                    push: "rtcpFbTrrInt",
                    reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
                    names: ["payload", "value"],
                    format: "rtcp-fb:%d trr-int %d"
                }, {
                    push: "rtcpFb",
                    reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
                    names: ["payload", "type", "subtype"],
                    format: function (e) {
                        return null != e.subtype ? "rtcp-fb:%s %s %s" :
                            "rtcp-fb:%s %s"
                    }
                }, {
                    push: "ext",
                    reg: /^extmap:(\d+)(?:\/(\w+))? (\S*)(?: (\S*))?/,
                    names: ["value", "direction", "uri", "config"],
                    format: function (e) {
                        return "extmap:%d" + (e.direction ? "/%s" : "%v") + " %s" + (e.config ? " %s" : "")
                    }
                }, {
                    push: "crypto",
                    reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
                    names: ["id", "suite", "config", "sessionConfig"],
                    format: function (e) {
                        return null != e.sessionConfig ? "crypto:%d %s %s %s" : "crypto:%d %s %s"
                    }
                }, {name: "setup", reg: /^setup:(\w*)/, format: "setup:%s"}, {
                    name: "mid",
                    reg: /^mid:([^\s]*)/,
                    format: "mid:%s"
                },
                {name: "msid", reg: /^msid:(.*)/, format: "msid:%s"}, {
                    name: "ptime",
                    reg: /^ptime:(\d*)/,
                    format: "ptime:%d"
                }, {name: "maxptime", reg: /^maxptime:(\d*)/, format: "maxptime:%d"}, {
                    name: "direction",
                    reg: /^(sendrecv|recvonly|sendonly|inactive)/
                }, {name: "icelite", reg: /^(ice-lite)/}, {
                    name: "iceUfrag",
                    reg: /^ice-ufrag:(\S*)/,
                    format: "ice-ufrag:%s"
                }, {name: "icePwd", reg: /^ice-pwd:(\S*)/, format: "ice-pwd:%s"}, {
                    name: "fingerprint",
                    reg: /^fingerprint:(\S*) (\S*)/,
                    names: ["type", "hash"],
                    format: "fingerprint:%s %s"
                }, {
                    push: "candidates",
                    reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
                    names: "foundation component transport priority ip port type raddr rport tcptype generation network-id network-cost".split(" "),
                    format: function (e) {
                        var f = "candidate:%s %d %s %d %s %d typ %s" + (null != e.raddr ? " raddr %s rport %d" : "%v%v");
                        f += null != e.tcptype ? " tcptype %s" : "%v";
                        null != e.generation && (f += " generation %d");
                        f += null != e["network-id"] ? " network-id %d" : "%v";
                        return f += null != e["network-cost"] ? " network-cost %d" : "%v"
                    }
                }, {name: "endOfCandidates", reg: /^(end-of-candidates)/}, {
                    name: "remoteCandidates", reg: /^remote-candidates:(.*)/,
                    format: "remote-candidates:%s"
                }, {name: "iceOptions", reg: /^ice-options:(\S*)/, format: "ice-options:%s"}, {
                    push: "ssrcs",
                    reg: /^ssrc:(\d*) ([\w_]*)(?::(.*))?/,
                    names: ["id", "attribute", "value"],
                    format: function (e) {
                        var f = "ssrc:%d";
                        null != e.attribute && (f += " %s", null != e.value && (f += ":%s"));
                        return f
                    }
                }, {
                    push: "ssrcGroups",
                    reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
                    names: ["semantics", "ssrcs"],
                    format: "ssrc-group:%s %s"
                }, {
                    name: "msidSemantic", reg: /^msid-semantic:\s?(\w*) (\S*)/, names: ["semantic",
                        "token"], format: "msid-semantic: %s %s"
                }, {
                    push: "groups",
                    reg: /^group:(\w*) (.*)/,
                    names: ["type", "mids"],
                    format: "group:%s %s"
                }, {name: "rtcpMux", reg: /^(rtcp-mux)/}, {name: "rtcpRsize", reg: /^(rtcp-rsize)/}, {
                    name: "sctpmap",
                    reg: /^sctpmap:([\w_\/]*) (\S*)(?: (\S*))?/,
                    names: ["sctpmapNumber", "app", "maxMessageSize"],
                    format: function (e) {
                        return null != e.maxMessageSize ? "sctpmap:%s %s %s" : "sctpmap:%s %s"
                    }
                }, {name: "xGoogleFlag", reg: /^x-google-flag:([^\s]*)/, format: "x-google-flag:%s"}, {
                    push: "rids", reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
                    names: ["id", "direction", "params"], format: function (e) {
                        return e.params ? "rid:%s %s %s" : "rid:%s %s"
                    }
                }, {
                    push: "imageattrs",
                    reg: /^imageattr:(\d+|\*)[\s\t]+(send|recv)[\s\t]+(\*|\[\S+\](?:[\s\t]+\[\S+\])*)(?:[\s\t]+(recv|send)[\s\t]+(\*|\[\S+\](?:[\s\t]+\[\S+\])*))?/,
                    names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
                    format: function (e) {
                        return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "")
                    }
                }, {
                    name: "simulcast",
                    reg: /^simulcast:(send|recv) ([a-zA-Z0-9\-_~;,]+)(?:\s?(send|recv) ([a-zA-Z0-9\-_~;,]+))?$/,
                    names: ["dir1", "list1",
                        "dir2", "list2"],
                    format: function (e) {
                        return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "")
                    }
                }, {
                    name: "simulcast_03",
                    reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
                    names: ["value"],
                    format: "simulcast: %s"
                }, {name: "framerate", reg: /^framerate:(\d+(?:$|\.\d+))/, format: "framerate:%s"}, {
                    push: "invalid",
                    names: ["value"]
                }]
        };
    Object.keys(h).forEach(function (e) {
        h[e].forEach(function (f) {
            f.reg || (f.reg = /(.*)/);
            f.format || (f.format = "%s")
        })
    })
}, function (n, p) {
    var h = function (e, f, c, a, t, m, b, g, l, d) {
        this.foundation = e;
        this.componentId = f;
        this.transport =
            c;
        this.priority = a;
        this.address = t;
        this.port = m;
        this.type = b;
        this.generation = g;
        this.relAddr = l;
        this.relPort = d
    };
    h.prototype.clone = function () {
        return new h(this.foundation, this.componentId, this.transport, this.priority, this.address, this.port, this.type, this.generation, this.relAddr, this.relPort)
    };
    h.prototype.plain = function () {
        var e = {
            foundation: this.foundation,
            componentId: this.componentId,
            transport: this.transport,
            priority: this.priority,
            address: this.address,
            port: this.port,
            type: this.type,
            generation: this.generation
        };
        this.relAddr && (e.relAddr = this.relAddr);
        this.relPort && (e.relPort = this.relPort);
        return e
    };
    h.prototype.getFoundation = function () {
        return this.foundation
    };
    h.prototype.getComponentId = function () {
        return this.componentId
    };
    h.prototype.getTransport = function () {
        return this.transport
    };
    h.prototype.getPriority = function () {
        return this.priority
    };
    h.prototype.getAddress = function () {
        return this.address
    };
    h.prototype.getPort = function () {
        return this.port
    };
    h.prototype.getType = function () {
        return this.type
    };
    h.prototype.getGeneration =
        function () {
            return this.generation
        };
    h.prototype.getRelAddr = function () {
        return this.relAddr
    };
    h.prototype.getRelPort = function () {
        return this.relPort
    };
    n.exports = h
}, function (n, p) {
    var h = function (e, f, c, a, t, m) {
        this.codec = e;
        this.type = f;
        this.rate = c;
        this.encoding = a;
        this.params = t || {};
        this.feedback = m || []
    };
    h.prototype.clone = function () {
        var e = new h(this.codec, this.type, this.rate, this.encoding, this.params, this.feedback);
        this.rtx && e.setRTX(this.rtx);
        return e
    };
    h.prototype.plain = function () {
        return {
            codec: this.codec, type: this.type,
            rate: this.rate, encoding: this.encoding, params: this.params, feedback: this.feedback
        }
    };
    h.prototype.setRTX = function (e) {
        this.rtx = e
    };
    h.prototype.getType = function () {
        return this.type
    };
    h.prototype.setType = function (e) {
        this.type = e
    };
    h.prototype.getCodec = function () {
        return this.codec
    };
    h.prototype.getParams = function () {
        return this.params
    };
    h.prototype.setParam = function (e, f) {
        this.params[e] = f
    };
    h.prototype.hasRTX = function () {
        return this.rtx
    };
    h.prototype.getRTX = function () {
        return this.rtx
    };
    h.prototype.getRate = function () {
        return this.rate
    };
    h.prototype.getEncoding = function () {
        return this.encoding
    };
    h.prototype.getFeedback = function () {
        return this.feedback
    };
    h.mapFromNames = function (e, f) {
        var c = new Map, a = 96;
        e.forEach(function (e) {
            e = e.toLowerCase();
            var m = "pcmu" === e ? 0 : "pcma" === e ? 8 : a += 1;
            m = new h(e, m);
            f && "ulpfec" !== e && "flexfec-03" !== e && "red" !== e && (a += 1, m.setRTX(a));
            c.set(m.getCodec().toLowerCase(), m)
        });
        return c
    };
    n.exports = h
}, function (n, p, h) {
    var e = h(2), f = function (c, a, f) {
        this.setup = c;
        this.hash = a;
        this.fingerprint = f
    };
    f.prototype.clone = function () {
        return new f(this.setup,
            this.hash, this.fingerprint)
    };
    f.prototype.plain = function () {
        return {setup: e.toString(this.setup), hash: this.hash, fingerprint: this.fingerprint}
    };
    f.prototype.getFingerprint = function () {
        return this.fingerprint
    };
    f.prototype.getHash = function () {
        return this.hash
    };
    f.prototype.getSetup = function () {
        return this.setup
    };
    f.prototype.setSetup = function (c) {
        this.setup = c
    };
    n.exports = f
}, function (n, p) {
    function h(c) {
        c = new Uint8Array(c);
        for (var a = 0; a < c.length; a += 1) c[a] = Math.floor(256 * Math.random() + 0);
        return c
    }

    function e(c) {
        return Array.prototype.map.call(new Uint8Array(c),
            function (a) {
                return ("00" + a.toString(16)).slice(-2)
            }).join("")
    }

    var f = function (c, a, f) {
        this.ufrag = c;
        this.pwd = a;
        this.opts = f;
        this.endOfCandidates = this.lite = !1
    };
    f.prototype.clone = function () {
        var c = new f(this.ufrag, this.pwd, this.opts);
        c.setLite(this.lite);
        c.setEndOfCandidates(this.endOfCandidates);
        return c
    };
    f.prototype.plain = function () {
        var c = {ufrag: this.ufrag, pwd: this.pwd};
        this.lite && (c.lite = this.lite);
        this.endOfCandidates && (c.endOfCandidates = this.endOfCandidates);
        return c
    };
    f.prototype.getUfrag = function () {
        return this.ufrag
    };
    f.prototype.getPwd = function () {
        return this.pwd
    };
    f.prototype.isLite = function () {
        return this.lite
    };
    f.prototype.getOpts = function () {
        return this.opts
    };
    f.prototype.setLite = function (c) {
        this.lite = c
    };
    f.prototype.isEndOfCandidates = function () {
        return this.endOfCandidates
    };
    f.prototype.setEndOfCandidates = function (c) {
        this.endOfCandidates = c
    };
    f.generate = function () {
        var c = new f, a = h(8), t = h(24);
        c.ufrag = e(a);
        c.pwd = e(t);
        return c
    };
    n.exports = f
}, function (n, p, h) {
    var e = h(16), f = h(6), c = h(3), a = function (a, c, b) {
        this.id = a;
        this.type =
            b;
        this.port = c;
        this.direction = f.SENDRECV;
        this.extensions = new Map;
        this.codecs = new Map;
        this.rids = new Map;
        this.simulcast_03 = this.simulcast = null;
        this.bitrate = 0;
        this.connection = this.dtls = this.ice = null;
        this.candidates = []
    };
    a.prototype.clone = function () {
        var c = new a(this.id, this.port, this.type);
        c.setDirection(this.direction);
        c.setBitrate(this.bitrate);
        c.setConnection(this.connection);
        this.codecs.forEach(function (a) {
            c.addCodec(a.clone())
        });
        this.extensions.forEach(function (a, b) {
            c.addExtension(b, a)
        });
        this.rids.forEach(function (a,
                                    b) {
            c.addRID(b, a.clone())
        });
        this.simulcast && c.setSimulcast(this.simulcast.clone());
        this.xGoogleFlag && c.setXGoogleFlag(this.xGoogleFlag);
        this.ice && c.setICE(this.ice.clone());
        this.dtls && c.setDTLS(this.dtls.clone());
        this.candidates.forEach(function (a) {
            c.addCandidate(a.clone())
        });
        this.setup && c.setSetup(this.setup);
        return c
    };
    a.prototype.plain = function () {
        var a = {
            id: this.id,
            port: this.port,
            type: this.type,
            connection: this.connection,
            direction: f.toString(this.direction),
            xGoogleFlag: this.xGoogleFlag,
            extensions: {},
            rids: [],
            codecs: [],
            candidates: []
        };
        this.bitrate && (a.bitrate = this.bitrate);
        this.codecs.forEach(function (c) {
            a.codecs.push(c.plain())
        });
        this.extensions.forEach(function (c) {
            a.extensions.push(c.plain())
        });
        this.rids.forEach(function (c) {
            a.rids.push(c.plain())
        });
        this.simulcast && (a.simulcast = this.simulcast.plain());
        this.candidates.forEach(function (c) {
            a.candidates.push(c.plain())
        });
        a.ice = this.ice && this.ice.plain();
        a.dtls = this.dtls && this.dtls.plain();
        return a
    };
    a.prototype.getType = function () {
        return this.type
    };
    a.prototype.getPort = function () {
        return this.port
    };
    a.prototype.getId = function () {
        return this.id
    };
    a.prototype.addExtension = function (a, c) {
        this.extensions.set(a, c)
    };
    a.prototype.addRID = function (a) {
        this.rids.set(a.getId(), a)
    };
    a.prototype.addCodec = function (a) {
        this.codecs.set(a.getType(), a)
    };
    a.prototype.getCodecForType = function (a) {
        return this.codecs.get(a)
    };
    a.prototype.getCodec = function (a) {
        var c;
        this.codecs.forEach(function (b) {
            b.getCodec().toLowerCase() === a.toLowerCase() && (c = b)
        });
        return c
    };
    a.prototype.hasCodec =
        function (a) {
            return null !== this.getCodec(a)
        };
    a.prototype.getCodecs = function () {
        return this.codecs
    };
    a.prototype.getExtensions = function () {
        return this.extensions
    };
    a.prototype.getRIDs = function () {
        return this.rids
    };
    a.prototype.getRID = function (a) {
        return this.rids.get(a)
    };
    a.prototype.getBitrate = function () {
        return this.bitrate
    };
    a.prototype.setBitrate = function (a) {
        this.bitrate = a
    };
    a.prototype.getDirection = function () {
        return this.direction
    };
    a.prototype.setDirection = function (a) {
        this.direction = a
    };
    a.prototype.getDTLS =
        function () {
            return this.dtls
        };
    a.prototype.setDTLS = function (a) {
        this.dtls = a
    };
    a.prototype.getICE = function () {
        return this.ice
    };
    a.prototype.setICE = function (a) {
        this.ice = a
    };
    a.prototype.addCandidate = function (a) {
        this.candidates.push(a)
    };
    a.prototype.addCandidates = function (a) {
        var c = this;
        a.forEach(function (a) {
            c.addCandidate(a)
        })
    };
    a.prototype.getCandidates = function () {
        return this.candidates
    };
    a.prototype.setXGoogleFlag = function (a) {
        this.xGoogleFlag = a
    };
    a.prototype.getXGoogleFlag = function () {
        return this.xGoogleFlag
    };
    a.prototype.getConnection = function () {
        return this.connection
    };
    a.prototype.setConnection = function (a) {
        this.connection = a
    };
    a.prototype.answer = function (t) {
        var m = new a(this.id, this.port, this.type);
        m.setDirection(f.reverse(this.direction));
        t.codecs && this.codecs.forEach(function (a) {
            if (t.codecs.has(a.getCodec().toLowerCase())) {
                var b = t.codecs.get(a.getCodec().toLowerCase()).clone();
                b.setType(a.getType());
                b.hasRTX() && b.setRTX(a.getRTX());
                m.addCodec(b)
            }
        });
        this.extensions.forEach(function (a, b) {
            t.extensions.has(b) &&
            m.addExtension(b, a)
        });
        if (t.simulcast && this.simulcast) {
            var b = new e, g = this.simulcast.getSimulcastStreams(c.SEND);
            g && g.forEach(function (a) {
                var d = [];
                a.forEach(function (a) {
                    d.push(a.clone())
                });
                b.addSimulcastAlternativeStreams(c.RECV, d)
            });
            (g = this.simulcast.getSimulcastStreams(c.RECV)) && g.forEach(function (a) {
                var d = [];
                a.forEach(function (a) {
                    d.push(a.clone())
                });
                b.addSimulcastAlternativeStreams(c.SEND, d)
            });
            this.rids.forEach(function (a) {
                var b = a.clone();
                b.setDirection(c.reverse(a.getDirection()));
                m.addRID(b)
            });
            m.setSimulcast(b)
        }
        return m
    };
    a.prototype.getSimulcast = function () {
        return this.simulcast
    };
    a.prototype.setSimulcast = function (a) {
        this.simulcast = a
    };
    a.prototype.getSimulcast03 = function () {
        return this.simulcast_03
    };
    a.prototype.setSimulcast03 = function (a) {
        this.simulcast_03 = a
    };
    a.prototype.getSetup = function () {
        return this.setup
    };
    a.prototype.setSetup = function (a) {
        this.setup = a
    };
    n.exports = a
}, function (n, p, h) {
    var e = h(3), f = function () {
        this.send = [];
        this.recv = [];
        this.plainString = null
    };
    f.prototype.clone = function () {
        var c =
            new f;
        this.send.forEach(function (a) {
            var f = [];
            a.forEach(function (a) {
                f.push(a.clone())
            });
            c.addSimulcastAlternativeStreams(f)
        });
        this.recv.forEach(function (a) {
            var f = [];
            a.forEach(function (a) {
                f.push(a.clone())
            });
            c.addSimulcastAlternativeStreams(f)
        });
        return c
    };
    f.prototype.plain = function () {
        var c = {send: [], recv: []};
        this.send.forEach(function (a) {
            var f = [];
            a.forEach(function (a) {
                f.push(a.plain())
            });
            c.send.push(f)
        });
        this.recv.forEach(function (a) {
            var f = [];
            a.forEach(function (a) {
                f.push(a.plain())
            });
            c.recv.push(f)
        });
        return c
    };
    f.prototype.addSimulcastAlternativeStreams = function (c, a) {
        return c === e.SEND ? this.send.push(a) : this.recv.push(a)
    };
    f.prototype.addSimulcastStream = function (c, a) {
        return c === e.SEND ? this.send.push([a]) : this.recv.push([a])
    };
    f.prototype.getSimulcastStreams = function (c) {
        return c === e.SEND ? this.send : this.recv
    };
    f.prototype.setSimulcastPlainString = function (c) {
        this.plainString = c
    };
    f.prototype.getSimulcastPlainString = function () {
        return this.plainString
    };
    n.exports = f
}, function (n, p) {
    var h = function (e, f) {
        var c =
            this;
        this.semantics = e;
        this.ssrcs = [];
        f.forEach(function (a) {
            c.ssrcs.push(parseInt(a, 10))
        })
    };
    h.prototype.clone = function () {
        return new h(this.semantics, this.ssrcs)
    };
    h.prototype.plain = function () {
        var e = {semantics: this.semantics, ssrcs: []};
        e.ssrcs = this.ssrcs;
        return e
    };
    h.prototype.getSemantics = function () {
        return this.semantics
    };
    h.prototype.getSSRCs = function () {
        return this.ssrcs
    };
    n.exports = h
}, function (n, p) {
    var h = function (e) {
        this.ssrc = e
    };
    h.prototype.clone = function () {
        var e = new h(this.ssrc);
        e.setCName(this.cname);
        e.setStreamId(this.streamId);
        this.setTrackId(this.trackId)
    };
    h.prototype.plain = function () {
        var e = {ssrc: this.ssrc};
        this.cname && (e.cname = this.cname);
        this.label && (e.label = this.label);
        this.mslabel && (e.mslabel = this.mslabel);
        this.streamId && (e.streamId = this.streamId);
        this.trackId && (e.trackid = this.trackId);
        return e
    };
    h.prototype.getCName = function () {
        return this.cname
    };
    h.prototype.setCName = function (e) {
        this.cname = e
    };
    h.prototype.getStreamId = function () {
        return this.streamId
    };
    h.prototype.setStreamId = function (e) {
        this.streamId =
            e
    };
    h.prototype.getTrackId = function () {
        return this.trackId
    };
    h.prototype.setTrackId = function (e) {
        this.trackId = e
    };
    h.prototype.getMSLabel = function () {
        return this.mslabel
    };
    h.prototype.setMSLabel = function (e) {
        this.mslabel = e
    };
    h.prototype.getLabel = function () {
        return this.label
    };
    h.prototype.setLabel = function (e) {
        this.label = e
    };
    h.prototype.getSSRC = function () {
        return this.ssrc
    };
    n.exports = h
}, function (n, p) {
    var h = function (e) {
        this.id = e;
        this.tracks = new Map
    };
    h.prototype.clone = function () {
        var e = new h(this.id);
        this.tracks.forEach(function (f) {
            e.addTrack(f.clone())
        });
        return e
    };
    h.prototype.plain = function () {
        var e = {id: this.id, tracks: []};
        this.tracks.forEach(function (f) {
            e.tracks.push(f.plain())
        });
        return e
    };
    h.prototype.getId = function () {
        return this.id
    };
    h.prototype.addTrack = function (e) {
        this.tracks.set(e.getId(), e)
    };
    h.prototype.getFirstTrack = function (e) {
        var f;
        this.tracks.forEach(function (c) {
            c.getMedia().toLowerCase() === e.toLowerCase() && (f = c)
        });
        return f
    };
    h.prototype.getTracks = function () {
        return this.tracks
    };
    h.prototype.removeAllTracks = function () {
        this.tracks.clear()
    };
    h.prototype.getTrack =
        function (e) {
            return this.tracks.get(e)
        };
    n.exports = h
}, function (n, p) {
    var h = function (e, f) {
        this.media = e;
        this.id = f;
        this.ssrcs = [];
        this.groups = [];
        this.encodings = []
    };
    h.prototype.clone = function () {
        var e = new h(this.media, this.id);
        this.mediaId && e.setMediaId(this.mediaId);
        this.ssrcs.forEach(function (f) {
            e.addSSRC(f)
        });
        this.groups.forEach(function (f) {
            e.addSourceGroup(f.clone())
        });
        this.encodings.forEach(function (f) {
            var c = [];
            f.forEach(function (a) {
                c.push(a.cloned())
            });
            e.addAlternativeEncoding(c)
        });
        return e
    };
    h.prototype.plain =
        function () {
            var e = {media: this.media, id: this.id, ssrcs: [], groups: [], encodings: []};
            this.mediaId && (e.mediaId = this.mediaId);
            this.ssrcs.forEach(function (f) {
                e.ssrcs.push(f)
            });
            this.groups.forEach(function (f) {
                e.groups.push(f.plain())
            });
            this.encodings.forEach(function (f) {
                var c = [];
                f.forEach(function (a) {
                    c.push(a.plain())
                });
                e.encodings.push(c)
            });
            return e
        };
    h.prototype.getMedia = function () {
        return this.media
    };
    h.prototype.setMediaId = function (e) {
        this.mediaId = e
    };
    h.prototype.getMediaId = function () {
        return this.mediaId
    };
    h.prototype.getId = function () {
        return this.id
    };
    h.prototype.addSSRC = function (e) {
        this.ssrcs.push(e)
    };
    h.prototype.getSSRCs = function () {
        return this.ssrcs
    };
    h.prototype.addSourceGroup = function (e) {
        this.groups.push(e)
    };
    h.prototype.getSourceGroup = function (e) {
        var f;
        this.groups.forEach(function (c) {
            c.getSemantics().toLowerCase() === e.toLowerCase() && (f = c)
        });
        return f
    };
    h.prototype.getSourceGroups = function () {
        return this.groups
    };
    h.prototype.hasSourceGroup = function (e) {
        var f = !1;
        this.groups.forEach(function (c) {
            c.getSemantics().toLowerCase() ===
            e.toLowerCase() && (f = !0)
        });
        return f
    };
    h.prototype.getEncodings = function () {
        return this.encodings
    };
    h.prototype.addAlternaticeEncodings = function (e) {
        this.encodings.push(e)
    };
    h.prototype.setEncodings = function (e) {
        this.encodings = e
    };
    n.exports = h
}, function (n, p, h) {
    p.a = {
        addSim: function (e) {
            var f = "a\x3dssrc-group:SIM";
            e.forEach(function (c) {
                f += " " + c
            });
            return f + "\r\n"
        }, addGroup: function (e, f) {
            return "a\x3dssrc-group:FID " + e + " " + f + "\r\n"
        }, addSpatialLayer: function (e, f, c, a, t, m) {
            return "a\x3dssrc:" + t + " cname:" + e + "\r\n" + ("a\x3dssrc:" +
                t + " msid:" + f + "\r\n") + ("a\x3dssrc:" + t + " mslabel:" + c + "\r\n") + ("a\x3dssrc:" + t + " label:" + a + "\r\n") + ("a\x3dssrc:" + m + " cname:" + e + "\r\n") + ("a\x3dssrc:" + m + " msid:" + f + "\r\n") + ("a\x3dssrc:" + m + " mslabel:" + c + "\r\n") + ("a\x3dssrc:" + m + " label:" + a + "\r\n")
        }, setMaxBW: function (e, f) {
            if (f.p2p) {
                if (f.video && f.maxVideoBW) {
                    var c = e.getMedia("video");
                    c && c.setBitrate(f.maxVideoBW)
                }
                f.audio && f.maxAudioBW && (e = e.getMedia("audio")) && e.setBitrate(f.maxAudioBW)
            }
        }, enableOpusNacks: function (e) {
            var f = e.match(/a=rtpmap:(.*)opus.*\r\n/);
            null !== f && (e = e.replace(f[0], f[0] + "a\x3drtcp-fb:" + f[1] + "nack\r\n"));
            return e
        }, setParamForCodecs: function (e, f, c, a) {
            e.medias.forEach(function (e) {
                e.id === f && e.codecs.forEach(function (f) {
                    f.setParam(c, a)
                })
            })
        }
    }
}, function (n, p, h) {
    var e = this, f = h(1), c = h(8), a = h(7), t = h(43), m = h(45), b = h(0);
    p.a = function (g, l) {
        var d = Object(f.b)(l);
        d.stream = l.stream;
        d.url = l.url;
        d.recording = l.recording;
        d.room = void 0;
        d.showing = !1;
        d.local = !1;
        d.video = l.video;
        d.audio = l.audio;
        d.screen = l.screen;
        d.videoSize = l.videoSize;
        d.videoFrameRate = l.videoFrameRate;
        d.extensionId = l.extensionId;
        d.desktopStreamId = l.desktopStreamId;
        d.audioMuted = !1;
        d.videoMuted = !1;
        d.unsubscribing = {callbackReceived: !1, pcEventReceived: !1};
        d.p2p = !1;
        d.ConnectionHelpers = void 0 === g ? c.a : g;
        var r = function (a) {
            a.stream.id === d.getLabel() && d.emit(Object(f.f)({type: "added", stream: a.stream}))
        }, w = function (a) {
            a.stream.id === d.getLabel() && d.emit(Object(f.f)({type: "removed", stream: d}))
        }, u = function (a) {
            d.emit(Object(f.f)({type: "icestatechanged", msg: a}))
        };
        if (!(void 0 === d.videoSize || d.videoSize instanceof
            Array && 4 === d.videoSize.length)) throw Error("Invalid Video Size");
        if (void 0 === l.local || !0 === l.local) d.local = !0;
        d.getID = function () {
            return d.local && !l.streamID ? "local" : l.streamID
        };
        d.getLabel = function () {
            return d.stream && d.stream.id ? d.stream.id : l.label
        };
        d.getAttributes = function () {
            return l.attributes
        };
        d.setAttributes = function (a) {
            d.local ? d.emit(Object(f.f)({
                type: "internal-set-attributes",
                stream: d,
                attrs: a
            })) : b.a.error("Failed to set attributes data. This Stream object has not been published.")
        };
        d.updateLocalAttributes =
            function (a) {
                l.attributes = a
            };
        d.hasAudio = function () {
            return !1 !== l.audio && void 0 !== l.audio
        };
        d.hasVideo = function () {
            return !1 !== l.video && void 0 !== l.video
        };
        d.hasData = function () {
            return !1 !== l.data && void 0 !== l.data
        };
        d.hasScreen = function () {
            return l.screen
        };
        d.hasMedia = function () {
            return l.audio || l.video || l.screen
        };
        d.isExternal = function () {
            return void 0 !== d.url || void 0 !== d.recording
        };
        d.addPC = function (b, k) {
            k ? (d.p2p = !0, void 0 === d.pc && (d.pc = Object(a.a)()), d.pc.add(k, b), b.on("ice-state-change", u)) : (d.pc && (d.pc.off("add-stream",
                r), d.pc.off("remove-stream", w), d.pc.off("ice-state-change", u)), d.pc = b, d.pc.on("add-stream", r), d.pc.on("remove-stream", w), d.pc.on("ice-state-change", u))
        };
        d.sendData = function (a) {
            d.local && d.hasData() ? d.emit(Object(f.f)({
                type: "internal-send-data",
                stream: d,
                msg: a
            })) : b.a.error("Failed to send data. This Stream object has not been published.")
        };
        d.init = function () {
            try {
                if ((l.audio || l.video || l.screen) && void 0 === l.url) {
                    b.a.info("Requested access to local media");
                    var a = l.video;
                    !0 === a || !0 === l.screen ? (a = !0 === a ||
                    null === a ? {} : a, void 0 !== d.videoSize && (a.width = {
                        min: d.videoSize[0],
                        max: d.videoSize[2]
                    }, a.height = {
                        min: d.videoSize[1],
                        max: d.videoSize[3]
                    }), void 0 !== d.videoFrameRate && (a.frameRate = {
                        min: d.videoFrameRate[0],
                        max: d.videoFrameRate[1]
                    })) : !0 === l.screen && void 0 === a && (a = !0);
                    d.ConnectionHelpers.GetUserMedia({
                        video: a,
                        audio: l.audio,
                        fake: l.fake,
                        screen: l.screen,
                        extensionId: d.extensionId,
                        desktopStreamId: d.desktopStreamId
                    }, function (a) {
                        b.a.info("User has granted access to local media.");
                        d.stream = a;
                        d.dispatchEvent(Object(f.f)({type: "access-accepted"}));
                        d.stream.getTracks().forEach(function (a) {
                            b.a.info("getTracks", a);
                            a.onended = function () {
                                d.stream.getTracks().forEach(function (a) {
                                    a.onended = null
                                });
                                var b = Object(f.f)({type: "stream-ended", stream: d, msg: a.kind});
                                d.dispatchEvent(b)
                            }
                        })
                    }, function (a) {
                        b.a.error("Failed to get access to local media. Error code was " + a.code + ".");
                        a = Object(f.f)({type: "access-denied", msg: a});
                        d.dispatchEvent(a)
                    })
                } else {
                    var k = Object(f.f)({type: "access-accepted"});
                    d.dispatchEvent(k)
                }
            } catch (B) {
                b.a.error("Failed to get access to local media. Error was " +
                    B + "."), a = Object(f.f)({type: "access-denied", msg: B}), d.dispatchEvent(a)
            }
        };
        d.close = function () {
            d.local && (void 0 !== d.room && d.room.unpublish(d), d.hide(), void 0 !== d.stream && d.stream.getTracks().forEach(function (a) {
                a.onended = null;
                a.stop()
            }), d.stream = void 0);
            d.pc && !d.p2p ? (d.pc.off("add-stream", r), d.pc.off("remove-stream", w), d.pc.off("ice-state-change", u)) : d.pc && d.p2p && d.pc.forEach(function (a) {
                a.off("add-stream", r);
                a.off("remove-stream", w);
                a.off("ice-state-change", u)
            });
            d.removeAllListeners()
        };
        d.play = function (a,
                           b) {
            b = b || {};
            d.elementID = a;
            d.hasVideo() || d.hasScreen() ? void 0 !== a && (a = Object(t.a)({
                id: d.getID(),
                stream: d,
                elementID: a,
                options: b
            }), d.player = a, d.showing = !0) : d.hasAudio() && (a = Object(m.a)({
                id: d.getID(),
                stream: d,
                elementID: a,
                options: b
            }), d.player = a, d.showing = !0)
        };
        d.stop = function () {
            d.showing && void 0 !== d.player && (d.player.destroy(), d.showing = !1)
        };
        d.show = d.play;
        d.hide = d.stop;
        var q = function () {
            if (void 0 !== d.player && void 0 !== d.stream) {
                var a = d.player.video, b = document.defaultView.getComputedStyle(a),
                    k = parseInt(b.getPropertyValue("width"),
                        10), g = parseInt(b.getPropertyValue("height"), 10),
                    c = parseInt(b.getPropertyValue("left"), 10), b = parseInt(b.getPropertyValue("top"), 10);
                var q = "object" === typeof d.elementID && "function" === typeof d.elementID.appendChild ? d.elementID : document.getElementById(d.elementID);
                var f = document.defaultView.getComputedStyle(q);
                q = parseInt(f.getPropertyValue("width"), 10);
                var f = parseInt(f.getPropertyValue("height"), 10), l = document.createElement("canvas");
                l.id = "testing";
                l.width = q;
                l.height = f;
                l.setAttribute("style", "display: none");
                l.getContext("2d").drawImage(a, c, b, k, g);
                return l
            }
            return null
        };
        d.getVideoFrameURL = function (a) {
            var b = q();
            return null !== b ? a ? b.toDataURL(a) : b.toDataURL() : null
        };
        d.getVideoFrame = function () {
            var a = q();
            return null !== a ? a.getContext("2d").getImageData(0, 0, a.width, a.height) : null
        };
        d.checkOptions = function (a, k) {
            if (!0 === k) {
                if (a.audio || a.screen) b.a.warning("Cannot update type of subscription"), a.audio = void 0, a.screen = void 0
            } else !1 === d.local && (!0 === a.video && !1 === d.hasVideo() && (b.a.warning("Trying to subscribe to video when there is no video, won't subscribe to video"),
                a.video = !1), !0 === a.audio && !1 === d.hasAudio() && (b.a.warning("Trying to subscribe to audio when there is no audio, won't subscribe to audio"), a.audio = !1));
            !1 !== d.local || d.hasVideo() || !0 !== a.slideShowMode || (b.a.warning("Cannot enable slideShowMode if it is not a video subscription, please check your parameters"), a.slideShowMode = !1)
        };
        var k = function (a) {
            a = void 0 === a ? function () {
            } : a;
            if (d.room && d.room.p2p) b.a.warning("muteAudio/muteVideo are not implemented in p2p streams"), a("error"); else {
                if (d.stream) for (var k =
                    0; k < d.stream.getVideoTracks().length; k += 1) d.stream.getVideoTracks()[k].enabled = !d.videoMuted;
                k = {muteStream: {audio: d.audioMuted, video: d.videoMuted}};
                d.checkOptions(k, !0);
                d.pc && d.pc.updateSpec(k, d.getID(), a)
            }
        };
        d.muteAudio = function (a, b) {
            d.audioMuted = a;
            k(void 0 === b ? function () {
            } : b)
        };
        d.muteVideo = function (a, b) {
            d.videoMuted = a;
            k(void 0 === b ? function () {
            } : b)
        };
        d._setStaticQualityLayer = function (a, k, g) {
            g = void 0 === g ? function () {
            } : g;
            d.room && d.room.p2p ? (b.a.warning("setStaticQualityLayer is not implemented in p2p streams"),
                g("error")) : (a = {
                qualityLayer: {
                    spatialLayer: a,
                    temporalLayer: k
                }
            }, d.checkOptions(a, !0), d.pc.updateSpec(a, d.getID(), g))
        };
        d._setDynamicQualityLayer = function (a) {
            if (d.room && d.room.p2p) b.a.warning("setDynamicQualityLayer is not implemented in p2p streams"), a("error"); else {
                var k = {qualityLayer: {spatialLayer: -1, temporalLayer: -1}};
                d.checkOptions(k, !0);
                d.pc.updateSpec(k, d.getID(), a)
            }
        };
        d._enableSlideShowBelowSpatialLayer = function (a, k, g) {
            k = void 0 === k ? 0 : k;
            g = void 0 === g ? function () {
            } : g;
            d.room && d.room.p2p ? (b.a.warning("enableSlideShowBelowSpatialLayer is not implemented in p2p streams"),
                g("error")) : (a = {
                slideShowBelowLayer: {
                    enabled: a,
                    spatialLayer: k
                }
            }, d.checkOptions(a, !0), b.a.debug("Calling updateSpec with config", a), d.pc.updateSpec(a, d.getID(), g))
        };
        d._setMinSpatialLayer = d._enableSlideShowBelowSpatialLayer.bind(e, !0);
        var v = function (a, b, k) {
            !0 !== b && (b = !1);
            a = "string" === typeof a ? [a] : a;
            a = a instanceof Array ? a : [];
            0 < a.length && d.room.sendControlMessage(d, "control", {
                name: "controlhandlers",
                enable: k,
                publisherSide: b,
                handlers: a
            })
        };
        d.disableHandlers = function (a, b) {
            v(a, b, !1)
        };
        d.enableHandlers = function (a,
                                     b) {
            v(a, b, !0)
        };
        d.updateConfiguration = function (a, b) {
            b = void 0 === b ? function () {
            } : b;
            if (void 0 !== a) if (d.pc) if (d.checkOptions(a, !0), d.local) if (d.room.p2p) for (var k = 0; k < d.pc.length; k += 1) d.pc[k].updateSpec(a, d.getID(), b); else d.pc.updateSpec(a, d.getID(), b); else d.pc.updateSpec(a, d.getID(), b); else b("This stream has no peerConnection attached, ignoring")
        };
        return d
    }
}, function (n, p, h) {
    var e = h(4), f = h(44);
    p.a = function (c) {
        var a = Object(e.a)({}), t;
        a.elementID = c.elementID;
        a.id = c.id;
        a.div = document.createElement("div");
        a.div.setAttribute("id", "bar_" + a.id);
        a.div.setAttribute("class", "licode_bar");
        a.bar = document.createElement("div");
        a.bar.setAttribute("style", "width: 100%; height: 15%; max-height: 30px; position: absolute; bottom: 0; right: 0; background-color: rgba(255,255,255,0.62)");
        a.bar.setAttribute("id", "subbar_" + a.id);
        a.bar.setAttribute("class", "licode_subbar");
        a.link = document.createElement("a");
        a.link.setAttribute("href", "http://www.lynckia.com/");
        a.link.setAttribute("class", "licode_link");
        a.link.setAttribute("target",
            "_blank");
        a.logo = document.createElement("img");
        a.logo.setAttribute("style", "width: 100%; height: 100%; max-width: 30px; position: absolute; top: 0; left: 2px;");
        a.logo.setAttribute("class", "licode_logo");
        a.logo.setAttribute("alt", "Lynckia");
        a.logo.setAttribute("src", a.url + "/assets/star.svg");
        var m = function (b) {
            var g = b;
            "block" !== b ? g = "none" : clearTimeout(t);
            a.div.setAttribute("style", "width: 100%; height: 100%; position: relative; bottom: 0; right: 0; display: " + g)
        };
        a.display = function () {
            m("block")
        };
        a.hide =
            function () {
                t = setTimeout(m, 1E3)
            };
        document.getElementById(a.elementID).appendChild(a.div);
        a.div.appendChild(a.bar);
        a.bar.appendChild(a.link);
        a.link.appendChild(a.logo);
        c.stream.screen || void 0 !== c.options && void 0 !== c.options.speaker && !0 !== c.options.speaker || (a.speaker = Object(f.a)({
            elementID: "subbar_" + a.id,
            id: a.id,
            stream: c.stream,
            media: c.media
        }));
        a.display();
        a.hide();
        return a
    }
}, function (n, p) {
    p = function () {
        return this
    }();
    try {
        p = p || Function("return this")() || (0, eval)("this")
    } catch (h) {
        "object" === typeof window &&
        (p = window)
    }
    n.exports = p
}, function (n, p, h) {
    Object.defineProperty(p, "__esModule", {value: !0});
    n = h(26);
    var e = h(1), f = h(22), c = h(0);
    h(47);
    h(49);
    h = {
        Room: n.a.bind(null, void 0, void 0, void 0),
        LicodeEvent: e.d,
        RoomEvent: e.e,
        StreamEvent: e.f,
        Stream: f.a.bind(null, void 0),
        Logger: c.a
    };
    p["default"] = h
}, function (n, p, h) {
    var e = h(27), f = h(8), c = h(1), a = h(41), t = h(22), m = h(7), b = h(46), g = h(0);
    p.a = function (l, d, r, w) {
        var u = Object(c.b)(w);
        u.remoteStreams = Object(m.a)();
        u.localStreams = Object(m.a)();
        u.roomID = "";
        u.state = 0;
        u.p2p = !1;
        u.ConnectionHelpers =
            void 0 === d ? f.a : d;
        u.erizoConnectionManager = void 0 === r ? new e.a : new r.ErizoConnectionManager;
        var q = Object(a.a)(l);
        u.socket = q;
        var k = u.remoteStreams, v = u.localStreams, x = function (a) {
            a.removeAllListeners();
            a.pc && !u.p2p && a.pc.removeStream(a);
            g.a.debug("Removed stream");
            a.stream && (a.hide(), a.stop(), a.close(), delete a.stream);
            a.pc && (a.local && u.p2p ? a.pc.forEach(function (b, k) {
                b.close();
                a.pc.remove(k)
            }) : (u.erizoConnectionManager.maybeCloseConnection(a.pc), delete a.pc))
        }, y = function (a, b) {
            0 !== u.state && a && !a.failed &&
            (a.failed = !0, b = Object(c.f)({
                type: "stream-failed",
                msg: b || "Stream failed after connection",
                stream: a
            }), u.dispatchEvent(b), a.local ? u.unpublish(a) : u.unsubscribe(a))
        }, h = function (a, b) {
            g.a.info("Stream subscribed");
            a.stream = b.stream;
            u.p2p || a.pc.addStream(a);
            a = Object(c.f)({type: "stream-subscribed", stream: a});
            u.dispatchEvent(a)
        }, C = function (a) {
            g.a.debug("maybeDispatchStreamUnsubscribed - unsubscribe id " + a.getID(), a.unsubscribing);
            if (a && a.unsubscribing.callbackReceived && a.unsubscribing.pcEventReceived) {
                g.a.info("Dispatching Stream unsubscribed " +
                    a.getID());
                x(a);
                delete a.failed;
                var b = Object(c.f)({type: "stream-unsubscribed", stream: a});
                a.unsubscribing.callbackReceived = !1;
                a.unsubscribing.pcEventReceived = !1;
                u.dispatchEvent(b)
            } else g.a.debug("Not dispatching stream unsubscribed yet " + a.getID())
        }, n = function (a, b) {
            return {
                callback: function (k, d) {
                    q.sendSDP("signaling_message", {streamId: a.getID(), streamIds: d, peerSocket: b, msg: k})
                },
                audio: a.hasAudio(),
                video: a.hasVideo(),
                iceServers: u.iceServers,
                maxAudioBW: a.maxAudioBW,
                maxVideoBW: a.maxVideoBW,
                limitMaxAudioBW: w.maxAudioBW,
                limitMaxVideoBW: w.maxVideoBW,
                forceTurn: a.forceTurn,
                p2p: !0
            }
        }, F = function (a, b) {
            a.addPC(u.erizoConnectionManager.getOrBuildErizoConnection(n(a, b)));
            a.on("added", h.bind(null, a));
            a.on("icestatechanged", function (b) {
                g.a.info(a.getID() + " - iceConnectionState: " + b.msg.state);
                "failed" === b.msg.state && y(a)
            })
        }, p = function (a, b) {
            var k = u.erizoConnectionManager.getOrBuildErizoConnection(n(a, b));
            a.addPC(k, b);
            a.on("icestatechanged", function (k) {
                g.a.info(a.getID() + " - iceConnectionState: " + k.msg.state);
                "failed" === k.msg.state &&
                (a.pc.get(b).close(), a.pc.remove(b))
            });
            k.addStream(a);
            k.createOffer()
        }, A = function (a) {
            u.remoteStreams.forEach(function (b) {
                b.local || b.getLabel() !== a || (b.unsubscribing.pcEventReceived = !0, C(b))
            })
        }, G = function (a, b, k) {
            var d = {
                callback: function (b, k) {
                    k = void 0 === k ? a.getID() : k;
                    g.a.info("Sending message", b, a.getID(), k);
                    q.sendSDP("signaling_message", {
                        streamId: k,
                        msg: b,
                        browser: a.pc && a.pc.browser
                    }, void 0, function () {
                    })
                },
                nop2p: !0,
                audio: b.audio && a.hasAudio(),
                video: b.video && a.hasVideo(),
                maxAudioBW: b.maxAudioBW,
                maxVideoBW: b.maxVideoBW,
                limitMaxAudioBW: w.maxAudioBW,
                limitMaxVideoBW: w.maxVideoBW,
                label: a.getLabel(),
                iceServers: u.iceServers,
                forceTurn: a.forceTurn,
                p2p: !1,
                streamRemovedListener: A
            };
            k || (d.simulcast = b.simulcast, d.startVideoBW = b.startVideoBW, d.hardMinVideoBW = b.hardMinVideoBW);
            return d
        }, D = function (a, b, k) {
            a.addPC(u.erizoConnectionManager.getOrBuildErizoConnection(G(a, k, !0), b, w.singlePC));
            a.on("added", h.bind(null, a));
            a.on("icestatechanged", function (b) {
                g.a.info(a.getID() + " - iceConnectionState: " + b.msg.state);
                "failed" === b.msg.state &&
                y(a)
            })
        }, N = function (a, b, k) {
            a.addPC(u.erizoConnectionManager.getOrBuildErizoConnection(G(a, k), b, w.singlePC));
            a.on("icestatechanged", function (b) {
                g.a.info(a.getID() + " - iceConnectionState: " + b.msg.state);
                "failed" === b.msg.state && y(a)
            });
            a.pc.addStream(a);
            k.createOffer || a.pc.createOffer(!1, w.singlePC, a.getID())
        }, O = function (a) {
            var b = a.streamIds, d = a.erizoId, g = a.options, c;
            switch (a.type) {
                case "multiple-initializing":
                    b.forEach(function (a) {
                        c = k.get(a);
                        D(c, d, g)
                    });
                    break;
                default:
                    b.forEach(function (a) {
                        c = k.get(a)
                    }),
                    c && c.pc && c.pc.processSignalingMessage(a, b)
            }
        }, J = function (a) {
            var b = a.streamIds;
            g.a.warning("onAutomaticStreamsUnsubscription", a.type, b, a);
            var d;
            b.forEach(function (a) {
                d = k.get(a)
            });
            d && d.pc && d.pc.processSignalingMessage(a, b);
            b.forEach(function (a) {
                d = k.get(a);
                x(d);
                delete d.failed
            })
        }, K = function (a) {
            var b = a.stream;
            a = a.msg;
            b.local ? q.sendMessage("sendDataStream", {
                id: b.getID(),
                msg: a
            }) : g.a.error("You can not send data through a remote stream")
        }, M = function (a) {
            var b = a.stream;
            a = a.attrs;
            b.local ? (b.updateLocalAttributes(a),
                q.sendMessage("updateStreamAttributes", {
                    id: b.getID(),
                    attrs: a
                })) : g.a.error("You can not update attributes in a remote stream")
        };
        l = function (a, b) {
            b.args ? a.apply(null, [].concat($jscomp.arrayFromIterable(b.args))) : a()
        };
        var H = function (a, b, k) {
            return {
                state: a,
                data: b.hasData(),
                audio: b.hasAudio(),
                video: b.hasVideo(),
                label: b.getLabel(),
                screen: b.hasScreen(),
                attributes: b.getAttributes(),
                metadata: k.metadata,
                createOffer: k.createOffer,
                muteStream: k.muteStream
            }
        }, I = function (a, b, k, d) {
            d = void 0 === d ? function () {
            } : d;
            null ===
            a ? (g.a.error("Error when publishing the stream", k), d(void 0, k)) : (g.a.info("Stream published"), b.getID = function () {
                return a
            }, b.on("internal-send-data", K), b.on("internal-set-attributes", M), v.add(a, b), b.room = u, d(a))
        }, P = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            if (a.url) {
                var d = "url";
                var c = a.url
            } else d = "recording", c = a.recording;
            g.a.info("Checking publish options for", a.getID());
            a.checkOptions(b);
            q.sendSDP("publish", H(d, a, b), c, function (b, d) {
                I(b, a, d, k)
            })
        }, Q = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            a.maxAudioBW =
                b.maxAudioBW;
            a.maxVideoBW = b.maxVideoBW;
            q.sendSDP("publish", H("p2p", a, b), void 0, function (b, d) {
                I(b, a, d, k)
            })
        }, R = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            q.sendSDP("publish", H("data", a, b), void 0, function (b, d) {
                I(b, a, d, k)
            })
        }, S = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            g.a.info("Publishing to Erizo Normally, is createOffer", b.createOffer);
            var d = H("erizo", a, b);
            d.minVideoBW = b.minVideoBW;
            d.maxVideoBW = b.maxVideoBW;
            d.scheme = b.scheme;
            q.sendSDP("publish", d, void 0, function (d, c, q) {
                null === d ? (g.a.error("Error publishing stream",
                    q), k(void 0, q)) : (I(d, a, q, void 0), N(a, c, b), k(d))
            })
        }, T = function (a, b) {
            a = b && a.hasVideo();
            var k = b && b.width, d = b && b.height;
            b = b && b.frameRate;
            return k || d || b ? {width: k, height: d, frameRate: b} : a
        }, U = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            b.maxVideoBW = b.maxVideoBW || w.defaultVideoBW;
            b.maxVideoBW > w.maxVideoBW && (b.maxVideoBW = w.maxVideoBW);
            b.audio = void 0 === b.audio ? !0 : b.audio;
            b.video = void 0 === b.video ? !0 : b.video;
            b.data = void 0 === b.data ? !0 : b.data;
            a.checkOptions(b);
            var d = {
                streamId: a.getID(),
                audio: b.audio && a.hasAudio(),
                video: T(a, b.video),
                maxVideoBW: b.maxVideoBW,
                data: b.data && a.hasData(),
                browser: u.ConnectionHelpers.getBrowser(),
                createOffer: b.createOffer,
                metadata: b.metadata,
                muteStream: b.muteStream,
                slideShowMode: b.slideShowMode
            };
            q.sendSDP("subscribe", d, void 0, function (d, c, q) {
                null === d ? (g.a.error("Error subscribing to stream ", q), k(void 0, q)) : (g.a.info("Subscriber added"), D(a, c, b), a.pc.createOffer(!0, !1, a.getID()), k(!0))
            })
        }, V = function (a, b, k) {
            k = void 0 === k ? function () {
            } : k;
            q.sendSDP("subscribe", {
                streamId: a.getID(), data: b.data,
                metadata: b.metadata
            }, void 0, function (b, d) {
                null === b ? (g.a.error("Error subscribing to stream ", d), k(void 0, d)) : (g.a.info("Stream subscribed"), b = Object(c.f)({
                    type: "stream-subscribed",
                    stream: a
                }), u.dispatchEvent(b), k(!0))
            })
        };
        u.connect = function (a) {
            a = void 0 === a ? {} : a;
            var d = b.a.decodeBase64(w.token);
            0 !== u.state && g.a.warning("Room already connected");
            u.state = 1;
            q.connect(JSON.parse(d), a, function (a) {
                var b = [], d = a.streams || [], q = a.id;
                u.p2p = a.p2p;
                u.iceServers = a.iceServers;
                u.state = 2;
                w.singlePC = a.singlePC;
                w.defaultVideoBW =
                    a.defaultVideoBW;
                w.maxVideoBW = a.maxVideoBW;
                for (var f = Object.keys(d), l = 0; l < f.length; l += 1) {
                    var e = d[f[l]];
                    a = Object(t.a)(u.ConnectionHelpers, {
                        streamID: e.id,
                        local: !1,
                        audio: e.audio,
                        video: e.video,
                        data: e.data,
                        label: e.label,
                        screen: e.screen,
                        attributes: e.attributes
                    });
                    a.room = u;
                    b.push(a);
                    k.add(e.id, a)
                }
                u.roomID = q;
                g.a.info("Connected to room " + u.roomID);
                b = Object(c.e)({type: "room-connected", streams: b});
                u.dispatchEvent(b)
            }, function (a) {
                g.a.error("Not Connected! Error: " + a);
                a = Object(c.e)({type: "room-error", message: a});
                u.dispatchEvent(a)
            })
        };
        u.disconnect = function () {
            g.a.debug("Disconnection requested");
            var a = Object(c.e)({type: "room-disconnected", message: "expected-disconnection"});
            u.dispatchEvent(a)
        };
        u.publish = function (a, b, k) {
            b = void 0 === b ? {} : b;
            k = void 0 === k ? function () {
            } : k;
            b.maxVideoBW = b.maxVideoBW || w.defaultVideoBW;
            b.maxVideoBW > w.maxVideoBW && (b.maxVideoBW = w.maxVideoBW);
            void 0 === b.minVideoBW && (b.minVideoBW = 0);
            b.minVideoBW > w.defaultVideoBW && (b.minVideoBW = w.defaultVideoBW);
            a.forceTurn = b.forceTurn;
            b.simulcast = b.simulcast ||
                !1;
            b.muteStream = {audio: a.audioMuted, video: a.videoMuted};
            a && a.local && !a.failed && !v.has(a.getID()) ? a.hasMedia() ? a.isExternal() ? P(a, b, k) : u.p2p ? Q(a, b, k) : S(a, b, k) : a.hasData() && R(a, b, k) : (g.a.error("Trying to publish invalid stream"), k(void 0, "Invalid Stream"))
        };
        u.startRecording = function (a, b) {
            b = void 0 === b ? function () {
            } : b;
            void 0 === a ? (g.a.error("Trying to start recording on an invalid stream", a), b(void 0, "Invalid Stream")) : (g.a.debug("Start Recording stream: " + a.getID()), q.sendMessage("startRecorder", {to: a.getID()},
                function (a, k) {
                    null === a ? (g.a.error("Error on start recording", k), b(void 0, k)) : (g.a.info("Start recording", a), b(a))
                }))
        };
        u.stopRecording = function (a, b) {
            b = void 0 === b ? function () {
            } : b;
            q.sendMessage("stopRecorder", {id: a}, function (k, d) {
                null === k ? (g.a.error("Error on stop recording", d), b(void 0, d)) : (g.a.info("Stop recording", a), b(!0))
            })
        };
        u.unpublish = function (a, b) {
            b = void 0 === b ? function () {
            } : b;
            if (a && a.local) {
                q.sendMessage("unpublish", a.getID(), function (k, d) {
                    null === k ? (g.a.error("Error unpublishing stream", d), b(void 0,
                        d)) : (delete a.failed, b(!0))
                });
                g.a.info("Stream unpublished");
                a.room = void 0;
                if (a.hasMedia() && !a.isExternal()) {
                    var k = v.has(a.getID()) ? v.get(a.getID()) : a;
                    x(k)
                }
                v.remove(a.getID());
                a.getID = function () {
                };
                a.off("internal-send-data", K);
                a.off("internal-set-attributes", M)
            } else g.a.error("Cannot unpublish, stream does not exist or is not local"), b(void 0, "Cannot unpublish, stream does not exist or is not local")
        };
        u.sendControlMessage = function (a, b, k) {
            a && a.getID() && (b = {type: "control", action: k}, q.sendSDP("signaling_message",
                {streamId: a.getID(), msg: b}))
        };
        u.subscribe = function (a, b, d) {
            b = void 0 === b ? {} : b;
            d = void 0 === d ? function () {
            } : d;
            if (!a || a.local || a.failed) b = "Error on subscribe", a ? a.local ? (g.a.warning("Cannot subscribe to local stream, you should subscribe to the remote version of your local stream"), b = "Local copy of stream") : a.failed && (g.a.warning("Cannot subscribe to failed stream."), b = "Failed stream") : (g.a.warning("Cannot subscribe to invalid stream"), b = "Invalid or undefined stream"), d(void 0, b); else {
                if (a.hasMedia()) if (a.hasVideo() ||
                a.hasScreen() || (b.video = !1), a.hasAudio() || (b.audio = !1), b.muteStream = {
                    audio: a.audioMuted,
                    video: a.videoMuted
                }, a.forceTurn = b.forceTurn, u.p2p) {
                    var c = k.get(a.getID());
                    c.maxAudioBW = b.maxAudioBW;
                    c.maxVideoBW = b.maxVideoBW;
                    q.sendSDP("subscribe", {streamId: a.getID(), metadata: b.metadata});
                    d(!0)
                } else U(a, b, d); else if (a.hasData() && !1 !== b.data) V(a, b, d); else {
                    g.a.warning("There's nothing to subscribe to");
                    d(void 0, "Nothing to subscribe to");
                    return
                }
                g.a.info("Subscribing to: " + a.getID())
            }
        };
        u.unsubscribe = function (a,
                                  b) {
            b = void 0 === b ? function () {
            } : b;
            void 0 !== q && (a && !a.local ? q.sendMessage("unsubscribe", a.getID(), function (k, d) {
                null === k ? b(void 0, d) : (b(!0), a.unsubscribing.callbackReceived = !0, C(a))
            }, function () {
                g.a.error("Error calling unsubscribe.")
            }) : b(void 0, "Error unsubscribing, stream does not exist or is not local"))
        };
        u.autoSubscribe = function (a, b, k, d) {
            q && q.sendMessage("autoSubscribe", {selectors: a, negativeSelectors: b, options: k}, function (a) {
                a && d(a)
            })
        };
        u.getStreamStats = function (a, b) {
            b = void 0 === b ? function () {
            } : b;
            if (!q) return "Error getting stats - no socket";
            if (!a) return "Error getting stats - no stream";
            q.sendMessage("getStreamStats", a.getID(), function (a) {
                a && b(a)
            })
        };
        u.getStreamsByAttribute = function (a, b) {
            var d = [];
            k.forEach(function (k) {
                void 0 !== k.getAttributes() && k.getAttributes()[a] === b && d.push(k)
            });
            return d
        };
        u.on("room-disconnected", function () {
            u.state = 0;
            q.state = q.DISCONNECTED;
            k.forEach(function (a, b) {
                x(a);
                k.remove(b);
                a && !a.failed && (a = Object(c.f)({type: "stream-removed", stream: a}), u.dispatchEvent(a))
            });
            k = Object(m.a)();
            v.forEach(function (a, b) {
                x(a);
                v.remove(b)
            });
            v = Object(m.a)();
            try {
                q.disconnect()
            } catch (W) {
                g.a.debug("Socket already disconnected")
            }
            q = void 0
        });
        q.on("onAddStream", l.bind(null, function (a) {
            if (!k.has(a.id)) {
                var b = Object(t.a)(u.Connection, {
                    streamID: a.id,
                    local: v.has(a.id),
                    audio: a.audio,
                    video: a.video,
                    data: a.data,
                    label: a.label,
                    screen: a.screen,
                    attributes: a.attributes
                });
                b.room = u;
                k.add(a.id, b);
                a = Object(c.f)({type: "stream-added", stream: b});
                u.dispatchEvent(a)
            }
        }));
        q.on("signaling_message_erizo", l.bind(null, function (a) {
            var b;
            "auto-streams-subscription" === a.context ?
                O(a.mess) : "auto-streams-unsubscription" === a.context ? J(a.mess) : (b = a.peerId ? k.get(a.peerId) : v.get(a.streamId)) && b.pc && !b.failed ? b.pc.processSignalingMessage(a.mess) : g.a.debug("Failed applying a signaling message, stream is no longer present")
        }));
        q.on("signaling_message_peer", l.bind(null, function (a) {
            var b = v.get(a.streamId);
            b && !b.failed ? b.pc.get(a.peerSocket).processSignalingMessage(a.msg) : (b = k.get(a.streamId), b.pc || F(b, a.peerSocket), b.pc.processSignalingMessage(a.msg))
        }));
        q.on("publish_me", l.bind(null,
            function (a) {
                var b = v.get(a.streamId);
                p(b, a.peerSocket)
            }));
        q.on("unpublish_me", l.bind(null, function (a) {
            var b = v.get(a.streamId);
            b && (a = a.peerSocket, void 0 !== b.pc && b.pc.has(a) && (b.pc.get(a).close(), b.pc.remove(a)))
        }));
        q.on("onBandwidthAlert", l.bind(null, function (a) {
            g.a.info("Bandwidth Alert on", a.streamID, "message", a.message, "BW:", a.bandwidth);
            if (a.streamID) {
                var b = k.get(a.streamID);
                b && !b.failed && (a = Object(c.f)({
                    type: "bandwidth-alert",
                    stream: b,
                    msg: a.message,
                    bandwidth: a.bandwidth
                }), b.dispatchEvent(a))
            }
        }));
        q.on("onDataStream", l.bind(null, function (a) {
            var b = k.get(a.id);
            a = Object(c.f)({type: "stream-data", msg: a.msg, stream: b});
            b.dispatchEvent(a)
        }));
        q.on("onUpdateAttributeStream", l.bind(null, function (a) {
            var b = k.get(a.id), d = Object(c.f)({type: "stream-attributes-update", attrs: a.attrs, stream: b});
            b.updateLocalAttributes(a.attrs);
            b.dispatchEvent(d)
        }));
        q.on("onRemoveStream", l.bind(null, function (a) {
            var b = v.get(a.id);
            if (b) y(b); else if (b = k.get(a.id)) x(b), k.remove(a.id), a = Object(c.f)({
                type: "stream-removed",
                stream: b
            }),
                u.dispatchEvent(a)
        }));
        q.on("disconnect", l.bind(null, function () {
            g.a.info("Socket disconnected, lost connection to ErizoController");
            if (0 !== u.state) {
                g.a.error("Unexpected disconnection from ErizoController");
                var a = Object(c.e)({type: "room-disconnected", message: "unexpected-disconnection"});
                u.dispatchEvent(a)
            }
        }));
        q.on("connection_failed", l.bind(null, function (a) {
            if (a.streamId) {
                var b = "ICE Connection Failed on " + a.type + " " + a.streamId + " " + u.state;
                g.a.error(b);
                a = "publish" === a.type ? v.get(a.streamId) : k.get(a.streamId);
                y(a, b)
            }
        }));
        q.on("error", l.bind(null, function (a) {
            g.a.error("Cannot connect to erizo Controller");
            a = Object(c.e)({type: "room-error", message: a});
            u.dispatchEvent(a)
        }));
        return u
    }
}, function (n, p, h) {
    var e = h(28), f = h(38), c = h(39), a = h(0), t = h(1), m = h(7), b = h(8), g = t.c, l = 103, d = function (d, w) {
        var r = g.call(this) || this;
        a.a.debug("Building a new Connection");
        r.stack = {};
        r.erizoId = w;
        r.streamsMap = Object(m.a)();
        l += 1;
        d.sessionId = l;
        r.sessionId = l;
        d.streamRemovedListener || (d.streamRemovedListener = function () {
        });
        r.streamRemovedListener =
            d.streamRemovedListener;
        r.browser = b.a.getBrowser();
        if ("fake" === r.browser) a.a.warning("Publish/subscribe video/audio streams not supported in erizofc yet"), r.stack = Object(c.a)(d); else if ("mozilla" === r.browser) a.a.debug("Firefox Stack"), r.stack = Object(f.a)(d); else if ("safari" === r.browser) a.a.debug("Safari using Chrome Stable Stack"), r.stack = Object(e.a)(d); else if ("chrome-stable" === r.browser || "electron" === r.browser) a.a.debug("Chrome Stable Stack"), r.stack = Object(e.a)(d); else throw a.a.error("No stack available for this browser"),
            Error("WebRTC stack not available");
        r.stack.updateSpec || (r.stack.updateSpec = function (b, k) {
            k = void 0 === k ? function () {
            } : k;
            a.a.error("Update Configuration not implemented in this browser");
            k("unimplemented")
        });
        r.stack.setSignallingCallback || (r.stack.setSignallingCallback = function () {
            a.a.error("setSignallingCallback is not implemented in this stack")
        });
        r.stack.peerConnection && (r.peerConnection = r.stack.peerConnection, r.stack.peerConnection.onaddstream = function (a) {
            r.emit(Object(t.a)({type: "add-stream", stream: a.stream}))
        },
            r.stack.peerConnection.onremovestream = function (a) {
                r.emit(Object(t.a)({type: "remove-stream", stream: a.stream}));
                r.streamRemovedListener(a.stream.id)
            }, r.stack.peerConnection.oniceconnectionstatechange = function () {
            r.emit(Object(t.a)({type: "ice-state-change", state: r.stack.peerConnection.iceConnectionState}))
        });
        return r
    };
    $jscomp.inherits(d, g);
    d.prototype.close = function () {
        a.a.debug("Closing ErizoConnection");
        this.streamsMap.clear();
        this.stack.close()
    };
    d.prototype.createOffer = function (a, b, d) {
        this.stack.createOffer(a,
            b, d)
    };
    d.prototype.addStream = function (b) {
        a.a.debug("message: Adding stream to Connection, streamId: " + b.getID());
        this.streamsMap.add(b.getID(), b);
        b.local && this.stack.addStream(b.stream)
    };
    d.prototype.removeStream = function (b) {
        var d = b.getID();
        this.streamsMap.has(d) ? (b.local ? this.stack.removeStream(b.stream) : 1 === this.streamsMap.size() && this.streamRemovedListener(b.getLabel()), this.streamsMap.remove(d)) : a.a.warning("message: Cannot remove stream not in map, streamId: " + d)
    };
    d.prototype.processSignalingMessage =
        function (a, b) {
            this.stack.processSignalingMessage(a, b)
        };
    d.prototype.sendSignalingMessage = function (a) {
        this.stack.sendSignalingMessage(a)
    };
    d.prototype.setSimulcast = function (a) {
        this.stack.setSimulcast(a)
    };
    d.prototype.setVideo = function (a) {
        this.stack.setVideo(a)
    };
    d.prototype.setAudio = function (a) {
        this.stack.setAudio(a)
    };
    d.prototype.updateSpec = function (a, b, d) {
        this.stack.updateSpec(a, b, d)
    };
    n = function () {
        this.ErizoConnectionsMap = new Map
    };
    n.prototype.getOrBuildErizoConnection = function (b, g, c) {
        c = void 0 === c ? !1 :
            c;
        a.a.debug("message: getOrBuildErizoConnection, erizoId: " + g);
        if (void 0 === g) return new d(b);
        if (c) this.ErizoConnectionsMap.has(g) ? c = this.ErizoConnectionsMap.get(g) : (c = {}, this.ErizoConnectionsMap.set(g, c)), c["single-pc"] || (c["single-pc"] = new d(b, g)), c = c["single-pc"]; else if (c = new d(b, g), this.ErizoConnectionsMap.has(g)) this.ErizoConnectionsMap.get(g)[c.sessionId] = c; else {
            var q = {};
            q[c.sessionId] = c;
            this.ErizoConnectionsMap.set(g, q)
        }
        b.simulcast && c.setSimulcast(b.simulcast);
        b.video && c.setVideo(b.video);
        b.audio && c.setVideo(b.audio);
        return c
    };
    n.prototype.maybeCloseConnection = function (b) {
        a.a.debug("Trying to remove connection " + b.sessionId + "\n       with erizoId " + b.erizoId);
        0 === b.streamsMap.size() && (b.close(), void 0 !== this.ErizoConnectionsMap.get(b.erizoId) && (delete this.ErizoConnectionsMap.get(b.erizoId)["single-pc"], delete this.ErizoConnectionsMap.get(b.erizoId)[b.sessionId]))
    };
    p.a = n
}, function (n, p, h) {
    var e = h(9), f = h(21), c = h(0);
    p.a = function (a) {
        c.a.info("Starting Chrome stable stack", a);
        var t = Object(e.a)(a);
        t.mediaConstraints = {offerToReceiveVideo: !0, offerToReceiveAudio: !0};
        t.enableSimulcast = function (a) {
            var b = a;
            if (!t.simulcast) return b;
            a = b.match(/a=ssrc-group:FID ([0-9]*) ([0-9]*)\r?\n/);
            if (!a || 0 >= a.length) return b;
            var g = t.simulcast.numSpatialLayers || 2;
            var c = parseInt(a[1], 10), d = parseInt(a[2], 10),
                e = b.match(new RegExp("a\x3dssrc:" + a[1] + " cname:(.*)\r?\n"))[1],
                m = b.match(new RegExp("a\x3dssrc:" + a[1] + " msid:(.*)\r?\n"))[1],
                u = b.match(new RegExp("a\x3dssrc:" + a[1] + " mslabel:(.*)\r?\n"))[1],
                q = b.match(new RegExp("a\x3dssrc:" +
                    a[1] + " label:(.*)\r?\n"))[1];
            b.match(new RegExp("a\x3dssrc:" + a[1] + ".*\r?\n", "g")).forEach(function (a) {
                b = b.replace(a, "")
            });
            b.match(new RegExp("a\x3dssrc:" + a[2] + ".*\r?\n", "g")).forEach(function (a) {
                b = b.replace(a, "")
            });
            for (var k = [c], v = [d], x = 1; x < g; x += 1) k.push(c + 1E3 * x), v.push(d + 1E3 * x);
            g = f.a.addSim(k);
            for (x = 0; x < k.length; x += 1) c = k[x], d = v[x], g += f.a.addGroup(c, d);
            for (x = 0; x < k.length; x += 1) c = k[x], d = v[x], g += f.a.addSpatialLayer(e, m, u, q, c, d);
            return b.replace(a[0], g + "a\x3dx-google-flag:conference\r\n")
        };
        t.setStartVideoBW =
            function (e) {
                t.video && a.startVideoBW && (c.a.debug("startVideoBW requested: " + a.startVideoBW), f.a.setParamForCodecs(e, "video", "x-google-start-bitrate", a.startVideoBW))
            };
        t.setHardMinVideoBW = function (e) {
            t.video && a.hardMinVideoBW && (c.a.debug("hardMinVideoBW requested: " + a.hardMinVideoBW), f.a.setParamForCodecs(e, "video", "x-google-min-bitrate", a.hardMinVideoBW))
        };
        return t
    }
}, function (n, p, h) {
    p = h(30);
    var e = h(11), f = h(12), c = h(13), a = h(14), t = h(15), m = h(2), b = h(17), g = h(18), l = h(19), d = h(20);
    h = h(6);
    n.exports = {
        SDPInfo: p,
        CandidateInfo: e,
        CodecInfo: f,
        DTLSInfo: c,
        ICEInfo: a,
        MediaInfo: t,
        Setup: m,
        SourceGroupInfo: b,
        SourceInfo: g,
        StreamInfo: l,
        TrackInfo: d,
        Direction: h
    }
}, function (n, p, h) {
    function e(a, b) {
        var k = new Map;
        b.rtp.forEach(function (d) {
            var c = d.payload, q = d.codec, f = d.rate;
            d = d.encoding;
            var e = {}, l = [];
            b.fmtp.forEach(function (a) {
                a.payload === c && a.config.split(";").forEach(function (a) {
                    a = a.split("\x3d");
                    e[a[0].trim()] = (a[1] || "").trim()
                })
            });
            b.rtcpFb && b.rtcpFb.forEach(function (a) {
                a.payload === c && l.push({type: a.type, subtype: a.subtype})
            });
            "RTX" === q.toUpperCase() ? k.set(parseInt(e.apt, 10), c) : a.addCodec(new g(q, c, f, d, e, l))
        });
        k.forEach(function (b, k) {
            (k = a.getCodecForType(k)) && k.setRTX(b)
        })
    }

    function f(a, b) {
        (b = b.rids) && b.forEach(function (b) {
            var k = new F(b.id, q.byValue(b.direction)), d = [], g = new Map;
            if (b.params) {
                var c = m.parseParams(b.params);
                Object.keys(c).forEach(function (a) {
                    "pt" === a ? d = c[a].split(",") : g.set(a, c[a])
                });
                k.setFormats(d);
                k.setParams(g)
            }
            a.addRID(k)
        })
    }

    function c(a, b, k) {
        var d = b.simulcast["dir" + a];
        a = b.simulcast["list" + a];
        if (d) {
            var g =
                q.byValue(d);
            m.parseSimulcastStreamList(a).forEach(function (a) {
                var b = [];
                a.forEach(function (a) {
                    b.push(new E(a.scid, a.paused))
                });
                k.addSimulcastAlternativeStreams(g, b)
            })
        }
    }

    function a(a, b) {
        var k = [];
        if (b.simulcast) {
            var d = new C;
            c("1", b, d);
            c("2", b, d);
            d.getSimulcastStreams(q.SEND).forEach(function (b) {
                var d = [];
                b.forEach(function (b) {
                    var k = new B(b.getId(), b.isPaused());
                    if (b = a.getRID(k.getId())) b.getFormats().forEach(function (b) {
                        (b = a.getCodecForType(b)) && k.addCodec(b)
                    }), k.setParams(b.getParams()), d.push(k)
                });
                d.length && k.push(d)
            });
            a.setSimulcast(d)
        }
        b.simulcast_03 && (d = new C, d.setSimulcastPlainString(b.simulcast_03.value), a.setSimulcast03(d));
        return k
    }

    function t(a, b, d) {
        var g = new Map, c = d.type;
        if (d.ssrcs) {
            var q, f, e;
            d.ssrcs.forEach(function (k) {
                var d = k.id, l = k.attribute;
                k = k.value;
                e = g.get(d);
                e || (e = new v(d), g.set(e.getSSRC(), e));
                "cname" === l.toLowerCase() ? e.setCName(k) : "mslabel" === l.toLowerCase() ? e.setMSLabel(k) : "label" === l.toLowerCase() ? e.setLabel(k) : "msid" === l.toLowerCase() && (l = k.split(" "), d = l[0], l = l[1], e.setStreamId(d),
                    e.setTrackId(l), f = b.getStream(d), f || (f = new x(d), b.addStream(f)), q = f.getTrack(l), q || (q = new y(c, l), q.setEncodings(a), f.addTrack(q)), q.addSSRC(e))
            })
        }
        if (d.msid) {
            var l = d.msid.split(" "), r = l[0], m = l[1], l = b.getStream(r);
            l || (l = new x(r), b.addStream(l));
            var t = l.getTrack(m);
            t || (t = new y(c, m), t.setMediaId(d.mid), t.setEncodings(a), l.addTrack(t));
            g.forEach(function (a, b) {
                a = g.get(b);
                a.getStreamId() || (a.setStreamId(r), a.setTrackId(m), t.addSSRC(a))
            })
        }
        d.ssrcGroups && d.ssrcGroups.forEach(function (a) {
            var d = a.ssrcs.split(" ");
            a = new k(a.semantics, d);
            d = g.get(parseInt(d[0], 10));
            b.getStream(d.getStreamId()).getTrack(d.getTrackId()).addSourceGroup(a)
        })
    }

    var m = h(31), b = h(11), g = h(12), l = h(13), d = h(14), r = h(15), w = h(2), u = h(6), q = h(3), k = h(17),
        v = h(18), x = h(19), y = h(20), B = h(34), C = h(16), E = h(35), F = h(36), z = function (a) {
            this.version = a || 1;
            this.name = "sdp-semantic";
            this.streams = new Map;
            this.medias = [];
            this.candidates = [];
            this.dtls = this.ice = this.connection = null
        };
    z.prototype.clone = function () {
        var a = new z(this.version);
        a.name = this.name;
        a.setConnection(this.connection);
        this.medias.forEach(function (b) {
            a.addMedia(b.clone())
        });
        this.streams.forEach(function (b) {
            a.addStream(b.clone())
        });
        this.candidates.forEach(function (b) {
            a.addCandidate(b.clone())
        });
        a.setICE(this.ice.clone());
        a.setDTLS(this.dtls.clone());
        return a
    };
    z.prototype.plain = function () {
        var a = {
            version: this.version,
            name: this.name,
            streams: [],
            medias: [],
            candidates: [],
            connection: this.connection
        };
        this.medias.forEach(function (b) {
            a.medias.push(b.plain())
        });
        this.streams.forEach(function (b) {
            a.streams.push(b.plain())
        });
        this.candidates.forEach(function (b) {
            a.candidates.push(b.plain())
        });
        a.ice = this.ice && this.ice.plain();
        a.dtls = this.dtls && this.dtls.plain();
        return a
    };
    z.prototype.setVersion = function (a) {
        this.version = a
    };
    z.prototype.setOrigin = function (a) {
        this.origin = a
    };
    z.prototype.setName = function (a) {
        this.name = a
    };
    z.prototype.getConnection = function () {
        return this.connection
    };
    z.prototype.setConnection = function (a) {
        this.connection = a
    };
    z.prototype.setTiming = function (a) {
        this.timing = a
    };
    z.prototype.addMedia = function (a) {
        this.medias.push(a)
    };
    z.prototype.getMedia = function (a) {
        var b;
        this.medias.forEach(function (k) {
            k.getType().toLowerCase() ===
            a.toLowerCase() && (b = k)
        });
        return b
    };
    z.prototype.getMedias = function (a) {
        if (!a) return this.medias;
        var b = [];
        this.medias.forEach(function (k) {
            k.getType().toLowerCase() === a.toLowerCase() && b.push(k)
        });
        return b
    };
    z.prototype.getMediaById = function (a) {
        var b;
        this.medias.forEach(function (k) {
            k.getId().toLowerCase() === a.toLowerCase() && (b = k)
        });
        return b
    };
    z.prototype.getVersion = function () {
        return this.version
    };
    z.prototype.getDTLS = function () {
        return this.dtls
    };
    z.prototype.setDTLS = function (a) {
        this.dtls = a
    };
    z.prototype.getICE =
        function () {
            return this.ice
        };
    z.prototype.setICE = function (a) {
        this.ice = a
    };
    z.prototype.addCandidate = function (a) {
        this.candidates.push(a)
    };
    z.prototype.addCandidates = function (a) {
        var b = this;
        a.forEach(function (a) {
            b.addCandidate(a)
        })
    };
    z.prototype.getCandidates = function () {
        return this.candidates
    };
    z.prototype.getStream = function (a) {
        return this.streams.get(a)
    };
    z.prototype.getStreams = function () {
        return this.streams
    };
    z.prototype.getFirstStream = function () {
        return 0 < this.streams.values().length ? this.streams.values()[0] :
            null
    };
    z.prototype.addStream = function (a) {
        this.streams.set(a.getId(), a)
    };
    z.prototype.removeStream = function (a) {
        this.streams.delete(a.getId())
    };
    z.prototype.toJSON = function () {
        var a = {version: 0, media: []};
        a.version = this.version || 0;
        a.origin = this.origin || {
            username: "-",
            sessionId: (new Date).getTime(),
            sessionVersion: this.version,
            netType: "IN",
            ipVer: 4,
            address: "127.0.0.1"
        };
        a.name = this.name || "semantic-sdp";
        a.connection = this.getConnection();
        a.timing = this.timing || {start: 0, stop: 0};
        var b = this.getICE();
        b && (b.isLite() &&
        (a.icelite = "ice-lite"), a.iceOptions = b.getOpts(), a.iceUfrag = b.getUfrag(), a.icePwd = b.getPwd());
        a.msidSemantic = this.msidSemantic || {semantic: "WMS", token: "*"};
        a.groups = [];
        var k = {type: "BUNDLE", mids: []}, d = this.getDTLS();
        d && (a.fingerprint = {type: d.getHash(), hash: d.getFingerprint()}, a.setup = w.toString(d.getSetup()));
        this.medias.forEach(function (g) {
            var c = {
                type: g.getType(),
                port: g.getPort(),
                protocol: "UDP/TLS/RTP/SAVPF",
                fmtp: [],
                rtp: [],
                rtcpFb: [],
                ext: [],
                bandwidth: [],
                candidates: [],
                ssrcGroups: [],
                ssrcs: [],
                rids: []
            };
            c.direction = u.toString(g.getDirection());
            c.rtcpMux = "rtcp-mux";
            c.connection = g.getConnection();
            c.xGoogleFlag = g.getXGoogleFlag();
            c.mid = g.getId();
            k.mids.push(g.getId());
            c.rtcp = g.rtcp;
            0 < g.getBitrate() && c.bandwidth.push({type: "AS", limit: g.getBitrate()});
            g.getCandidates().forEach(function (a) {
                c.candidates.push({
                    foundation: a.getFoundation(),
                    component: a.getComponentId(),
                    transport: a.getTransport(),
                    priority: a.getPriority(),
                    ip: a.getAddress(),
                    port: a.getPort(),
                    type: a.getType(),
                    relAddr: a.getRelAddr(),
                    relPort: a.getRelPort(),
                    generation: a.getGeneration()
                })
            });
            if (b = g.getICE()) b.isLite() && (c.icelite = "ice-lite"), c.iceOptions = b.getOpts(), c.iceUfrag = b.getUfrag(), c.icePwd = b.getPwd(), b.isEndOfCandidates() && (c.endOfCandidates = b.isEndOfCandidates());
            if (d = g.getDTLS()) c.fingerprint = {
                type: d.getHash(),
                hash: d.getFingerprint()
            }, c.setup = w.toString(d.getSetup());
            g.setup && (c.setup = w.toString(g.setup));
            g.getCodecs().forEach(function (a) {
                c.rtp.push({payload: a.getType(), codec: a.getCodec(), rate: a.getRate(), encoding: a.getEncoding()});
                var b = a.getParams();
                0 < Object.keys(b).length && c.fmtp.push({
                    payload: a.getType(),
                    config: Object.keys(b).map(function (a) {
                        return a + (b[a] ? "\x3d" + b[a] : "")
                    }).join(";")
                });
                a.getFeedback().forEach(function (b) {
                    c.rtcpFb.push({payload: a.getType(), type: b.type, subtype: b.subtype})
                });
                a.hasRTX() && (c.rtp.push({
                    payload: a.getRTX(),
                    codec: "rtx",
                    rate: a.getRate(),
                    encoding: a.getEncoding()
                }), c.fmtp.push({payload: a.getRTX(), config: "apt\x3d" + a.getType()}))
            });
            var l = [];
            c.rtp.forEach(function (a) {
                l.push(a.payload)
            });
            c.payloads = l.join(" ");
            g.getExtensions().forEach(function (a,
                                                b) {
                c.ext.push({value: b, uri: a})
            });
            g.getRIDs().forEach(function (a) {
                var b = {id: a.getId(), direction: q.toString(a.getDirection()), params: ""};
                a.getFormats().length && (b.params = "pt\x3d" + a.getFormats().join(","));
                a.getParams().forEach(function (a, k) {
                    b.params += "" + (b.params.length ? ";" : "") + k + "\x3d" + a
                });
                c.rids.push(b)
            });
            var f = g.getSimulcast();
            g = g.getSimulcast03();
            if (f) {
                var e = 1;
                c.simulcast = {};
                var v = f.getSimulcastStreams(q.SEND), f = f.getSimulcastStreams(q.RECV);
                if (v && v.length) {
                    var x = "";
                    v.forEach(function (a) {
                        var b =
                            "";
                        a.forEach(function (a) {
                            b += (b.length ? "," : "") + (a.isPaused() ? "~" : "") + a.getId()
                        });
                        x += (x.length ? ";" : "") + b
                    });
                    c.simulcast["dir" + e] = "send";
                    c.simulcast["list" + e] = x;
                    e += 1
                }
                if (f && f.length) {
                    var r = [];
                    f.forEach(function (a) {
                        var b = "";
                        a.forEach(function (a) {
                            b += (b.length ? "," : "") + (a.isPaused() ? "~" : "") + a.getId()
                        });
                        r += (r.length ? ";" : "") + b
                    });
                    c.simulcast["dir" + e] = "recv";
                    c.simulcast["list" + e] = r;
                    e += 1
                }
            }
            g && (c.simulcast_03 = {value: g.getSimulcastPlainString()});
            a.media.push(c)
        });
        k.mids.sort();
        a.media.sort(function (a, b) {
            return a.mid <
            b.mid ? -1 : a.mid > b.mid ? 1 : 0
        });
        for (var g = $jscomp.makeIterator(this.streams.values()), c = g.next(); !c.done; c = g.next()) for (var c = c.value, f = $jscomp.makeIterator(c.getTracks().values()), l = f.next(); !l.done; l = f.next()) for (var l = l.value, e = {}, v = $jscomp.makeIterator(a.media), x = v.next(); !x.done; e = {md: e.md}, x = v.next()) if (e.md = x.value, l.getMediaId()) {
            if (l.getMediaId() === e.md.mid) {
                l.getSourceGroups().forEach(function (a) {
                    return function (b) {
                        a.md.ssrcGroups.push({semantics: b.getSemantics(), ssrcs: b.getSSRCs().join(" ")})
                    }
                }(e));
                l.getSSRCs().forEach(function (a) {
                    return function (b) {
                        a.md.ssrcs.push({id: b.ssrc, attribute: "cname", value: b.getCName()})
                    }
                }(e));
                c.getId() && l.getId() && (e.md.msid = c.getId() + " " + l.getId());
                break
            }
        } else if (e.md.type.toLowerCase() === l.getMedia().toLowerCase()) {
            l.getSourceGroups().forEach(function (a) {
                return function (b) {
                    a.md.ssrcGroups.push({semantics: b.getSemantics(), ssrcs: b.getSSRCs().join(" ")})
                }
            }(e));
            l.getSSRCs().forEach(function (a) {
                return function (b) {
                    a.md.ssrcs.push({id: b.ssrc, attribute: "cname", value: b.getCName()});
                    b.getStreamId() && b.getTrackId() && a.md.ssrcs.push({
                        id: b.ssrc,
                        attribute: "msid",
                        value: b.getStreamId() + " " + b.getTrackId()
                    });
                    b.getMSLabel() && a.md.ssrcs.push({id: b.ssrc, attribute: "mslabel", value: b.getMSLabel()});
                    b.getLabel() && a.md.ssrcs.push({id: b.ssrc, attribute: "label", value: b.getLabel()})
                }
            }(e));
            break
        }
        k.mids = k.mids.join(" ");
        a.groups.push(k);
        return a
    };
    z.prototype.toString = function () {
        var a = this.toJSON();
        return m.write(a)
    };
    z.processString = function (a) {
        a = m.parse(a);
        return z.process(a)
    };
    z.process = function (k) {
        var c =
            new z;
        c.setVersion(k.version);
        c.setTiming(k.timing);
        c.setConnection(k.connection);
        c.setOrigin(k.origin);
        c.msidSemantic = k.msidSemantic;
        c.name = k.name;
        var g = k.iceUfrag, q = k.icePwd, v = k.iceOptions;
        (g || q || v) && c.setICE(new d(g, q, v));
        var x = k.fingerprint;
        if (x) {
            var m = x.type, y = x.hash, h = null;
            k.setup && (h = w.byValue(k.setup));
            c.setDTLS(new l(h, m, y))
        }
        k.media.forEach(function (k) {
            var m = new r(k.mid, k.port, k.type);
            m.setXGoogleFlag(k.xGoogleFlag);
            m.rtcp = k.rtcp;
            m.setConnection(k.connection);
            k.bandwidth && 0 < k.bandwidth.length &&
            k.bandwidth.forEach(function (a) {
                "AS" === a.type && m.setBitrate(a.limit)
            });
            g = k.iceUfrag;
            q = k.icePwd;
            v = k.iceOptions;
            if (g || q || v) {
                var y = new d(g, q, v);
                k.endOfCandidates && y.setEndOfCandidates("end-of-candidates");
                m.setICE(y)
            }
            if (x = k.fingerprint) {
                var y = x.type, h = x.hash, C = w.ACTPASS;
                k.setup && (C = w.byValue(k.setup));
                m.setDTLS(new l(C, y, h))
            }
            k.setup && m.setSetup(w.byValue(k.setup));
            y = u.SENDRECV;
            k.direction && (y = u.byValue(k.direction.toUpperCase()));
            m.setDirection(y);
            (y = k.candidates) && y.forEach(function (a) {
                m.addCandidate(new b(a.foundation,
                    a.component, a.transport, a.priority, a.ip, a.port, a.type, a.generation, a.relAddr, a.relPort))
            });
            e(m, k);
            (y = k.ext) && y.forEach(function (a) {
                m.addExtension(a.value, a.uri)
            });
            f(m, k);
            y = a(m, k);
            t(y, c, k);
            c.addMedia(m)
        });
        return c
    };
    n.exports = z
}, function (n, p, h) {
    n = h(32);
    h = h(33);
    p.write = h;
    p.parse = n.parse;
    p.parseFmtpConfig = n.parseFmtpConfig;
    p.parseParams = n.parseParams;
    p.parsePayloads = n.parsePayloads;
    p.parseRemoteCandidates = n.parseRemoteCandidates;
    p.parseImageAttributes = n.parseImageAttributes;
    p.parseSimulcastStreamList =
        n.parseSimulcastStreamList
}, function (n, p, h) {
    var e = function (a) {
        return String(Number(a)) === a ? Number(a) : a
    }, f = h(10), c = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
    p.parse = function (a) {
        var m = {}, b = [], g = m;
        a.split(/(\r\n|\r|\n)/).filter(c).forEach(function (a) {
            var d = a[0], c = a.slice(2);
            "m" === d && (b.push({rtp: [], fmtp: []}), g = b[b.length - 1]);
            for (a = 0; a < (f[d] || []).length; a += 1) {
                var l = f[d][a];
                if (l.reg.test(c)) {
                    d = l;
                    a = g;
                    l = c;
                    c = d.name && d.names;
                    d.push && !a[d.push] ? a[d.push] = [] : c && !a[d.name] && (a[d.name] = {});
                    var c = d.push ? {} : c ?
                        a[d.name] : a, l = l.match(d.reg), m = c, q = d.names, k = d.name;
                    if (k && !q) m[k] = e(l[1]); else for (k = 0; k < q.length; k += 1) null != l[k + 1] && (m[q[k]] = e(l[k + 1]));
                    d.push && a[d.push].push(c);
                    break
                }
            }
        });
        m.media = b;
        return m
    };
    var a = function (a, c) {
        c = c.split(/=(.+)/, 2);
        2 === c.length && (a[c[0]] = e(c[1]));
        return a
    };
    p.parseParams = function (c) {
        return c.split(/\;\s?/).reduce(a, {})
    };
    p.parseFmtpConfig = p.parseParams;
    p.parsePayloads = function (a) {
        return a.split(" ").map(Number)
    };
    p.parseRemoteCandidates = function (a) {
        var c = [];
        a = a.split(" ").map(e);
        for (var b =
            0; b < a.length; b += 3) c.push({component: a[b], ip: a[b + 1], port: a[b + 2]});
        return c
    };
    p.parseImageAttributes = function (c) {
        return c.split(" ").map(function (c) {
            return c.substring(1, c.length - 1).split(",").reduce(a, {})
        })
    };
    p.parseSimulcastStreamList = function (a) {
        return a.split(";").map(function (a) {
            return a.split(",").map(function (a) {
                var b = !1;
                "~" !== a[0] ? a = e(a) : (a = e(a.substring(1, a.length)), b = !0);
                return {scid: a, paused: b}
            })
        })
    }
}, function (n, p, h) {
    var e = h(10), f = /%[sdv%]/g, c = function (a) {
        var b = 1, c = arguments, d = c.length;
        return a.replace(f,
            function (a) {
                if (b >= d) return a;
                var g = c[b];
                b += 1;
                switch (a) {
                    case "%%":
                        return "%";
                    case "%s":
                        return String(g);
                    case "%d":
                        return Number(g);
                    case "%v":
                        return ""
                }
            })
    }, a = function (a, g, f) {
        var b = g.format instanceof Function ? g.format(g.push ? f : f[g.name]) : g.format;
        a = [a + "\x3d" + b];
        if (g.names) for (b = 0; b < g.names.length; b += 1) {
            var e = g.names[b];
            g.name ? a.push(f[g.name][e]) : a.push(f[g.names[b]])
        } else a.push(f[g.name]);
        return c.apply(null, a)
    }, t = "vosiuepcbtrza".split(""), m = ["i", "c", "b", "a"];
    n.exports = function (b, c) {
        c = c || {};
        null == b.version &&
        (b.version = 0);
        null == b.name && (b.name = " ");
        b.media.forEach(function (a) {
            null == a.payloads && (a.payloads = "")
        });
        var g = c.innerOrder || m, d = [];
        (c.outerOrder || t).forEach(function (c) {
            e[c].forEach(function (g) {
                g.name in b && null != b[g.name] ? d.push(a(c, g, b)) : g.push in b && null != b[g.push] && b[g.push].forEach(function (b) {
                    d.push(a(c, g, b))
                })
            })
        });
        b.media.forEach(function (b) {
            d.push(a("m", e.m[0], b));
            g.forEach(function (c) {
                e[c].forEach(function (g) {
                    g.name in b && null != b[g.name] ? d.push(a(c, g, b)) : g.push in b && null != b[g.push] && b[g.push].forEach(function (b) {
                        d.push(a(c,
                            g, b))
                    })
                })
            })
        });
        return d.join("\r\n") + "\r\n"
    }
}, function (n, p) {
    var h = function (e, f) {
        this.id = e;
        this.paused = f;
        this.codecs = new Map;
        this.params = new Map
    };
    h.prototype.clone = function () {
        var e = new h(this.id, this.paused);
        this.codecs.forEach(function (f) {
            e.addCodec(f.cloned())
        });
        e.setParams(this.params);
        return e
    };
    h.prototype.plain = function () {
        var e = this, f = {id: this.id, paused: this.paused, codecs: {}, params: {}};
        this.codecs.keys().forEach(function (c) {
            f.codecs[c] = e.codecs.get(c).plain()
        });
        this.params.keys().forEach(function (c) {
            f.params[c] =
                e.params.get(c).param
        });
        return f
    };
    h.prototype.getId = function () {
        return this.id
    };
    h.prototype.getCodecs = function () {
        return this.codecs
    };
    h.prototype.addCodec = function (e) {
        this.codecs.set(e.getType(), e)
    };
    h.prototype.getParams = function () {
        return this.params
    };
    h.prototype.setParams = function (e) {
        this.params = new Map(e)
    };
    h.prototype.isPaused = function () {
        return this.paused
    };
    n.exports = h
}, function (n, p) {
    var h = function (e, f) {
        this.paused = f;
        this.id = e
    };
    h.prototype.clone = function () {
        return new h(this.id, this.paused)
    };
    h.prototype.plain =
        function () {
            return {id: this.id, paused: this.paused}
        };
    h.prototype.isPaused = function () {
        return this.paused
    };
    h.prototype.getId = function () {
        return this.id
    };
    n.exports = h
}, function (n, p, h) {
    var e = h(3), f = function (c, a) {
        this.id = c;
        this.direction = a;
        this.formats = [];
        this.params = new Map
    };
    f.prototype.clone = function () {
        var c = new f(this.id, this.direction);
        c.setFormats(this.formats);
        c.setParams(this.params);
        return c
    };
    f.prototype.plain = function () {
        var c = {id: this.id, direction: e.toString(this.direction), formats: this.formats, params: {}};
        this.params.forEach(function (a, f) {
            c.params[f] = a
        });
        return c
    };
    f.prototype.getId = function () {
        return this.id
    };
    f.prototype.getDirection = function () {
        return this.direction
    };
    f.prototype.setDirection = function (c) {
        this.direction = c
    };
    f.prototype.getFormats = function () {
        return this.formats
    };
    f.prototype.setFormats = function (c) {
        var a = this;
        this.formats = [];
        c.forEach(function (c) {
            a.formats.push(parseInt(c, 10))
        })
    };
    f.prototype.getParams = function () {
        return this.params
    };
    f.prototype.setParams = function (c) {
        this.params = new Map(c)
    };
    n.exports = f
}, function (n, p, h) {
    n = function () {
        this._enqueuing = !1;
        this._queuedArgs = []
    };
    n.prototype.protectFunction = function (e) {
        return this._protectedFunction.bind(this, e)
    };
    n.prototype.isEnqueueing = function () {
        return this._enqueuing
    };
    n.prototype.startEnqueuing = function () {
        this._enqueuing = !0
    };
    n.prototype.stopEnqueuing = function () {
        this._enqueuing = !1
    };
    n.prototype.nextInQueue = function () {
        if (0 < this._queuedArgs.length) {
            var e = this._queuedArgs.shift();
            e.protectedFunction.apply(null, [].concat($jscomp.arrayFromIterable(e.args)))
        }
    };
    n.prototype.dequeueAll = function () {
        var e = this._queuedArgs;
        this._queuedArgs = [];
        e.forEach(function (f) {
            f.protectedFunction.apply(null, [].concat($jscomp.arrayFromIterable(f.args)))
        })
    };
    n.prototype._protectedFunction = function (e, f) {
        for (var c = [], a = 1; a < arguments.length; ++a) c[a - 1] = arguments[a];
        this.isEnqueueing() ? this._enqueue.apply(this, [].concat([e], $jscomp.arrayFromIterable(c))) : e.apply(null, [].concat($jscomp.arrayFromIterable(c)))
    };
    n.prototype._enqueue = function (e, f) {
        for (var c = [], a = 1; a < arguments.length; ++a) c[a -
        1] = arguments[a];
        this._queuedArgs.push({protectedFunction: e, args: c})
    };
    p.a = n
}, function (n, p, h) {
    var e = h(0), f = h(9);
    p.a = function (c) {
        e.a.info("Starting Firefox stack");
        var a = Object(f.a)(c),
            t = [{rid: "low", scaleResolutionDownBy: 3}, {rid: "med", scaleResolutionDownBy: 2}, {rid: "high"}],
            m = function (b) {
                var d = a.simulcast.numSpatialLayers || 2, c = t.length, d = d < c ? d : c, g = b.getParameters() || {};
                g.encodings = [];
                for (var f = c - 1; f >= c - d; --f) g.encodings.push(t[f]);
                return b.setParameters(g)
            }, b = function () {
                if (!a.simulcast) return [];
                var b =
                    [];
                a.peerConnection.getSenders().forEach(function (a) {
                    "video" === a.track.kind && b.push(m(a))
                });
                return b
            };
        a.enableSimulcast = function (a) {
            return a
        };
        var g = a.createOffer;
        a.createOffer = function (a, d, c) {
            d = void 0 === d ? !1 : d;
            c = void 0 === c ? "" : c;
            var f = [];
            !0 !== a && (f = b());
            Promise.all(f).then(function () {
                g(a, d, c)
            })
        };
        return a
    }
}, function (n, p, h) {
    var e = h(0);
    p.a = function (f) {
        var c = {
            pcConfig: {}, peerConnection: {}, desc: {}, signalCallback: void 0, close: function () {
                e.a.info("Close FcStack")
            }, createOffer: function () {
                e.a.debug("FCSTACK: CreateOffer")
            },
            addStream: function (a) {
                e.a.debug("FCSTACK: addStream", a)
            }, processSignalingMessage: function (a) {
                e.a.debug("FCSTACK: processSignaling", a);
                void 0 !== c.signalCallback && c.signalCallback(a)
            }, sendSignalingMessage: function (a) {
                e.a.debug("FCSTACK: Sending signaling Message", a);
                f.callback(a)
            }, setSignalingCallback: function (a) {
                a = void 0 === a ? function () {
                } : a;
                e.a.debug("FCSTACK: Setting signalling callback");
                c.signalCallback = a
            }
        };
        return c
    }
}, function (n, p) {
    n.exports = function (h) {
        if (!h.webpackPolyfill) {
            var e = Object.create(h);
            e.children || (e.children = []);
            Object.defineProperty(e, "loaded", {
                enumerable: !0, get: function () {
                    return e.l
                }
            });
            Object.defineProperty(e, "id", {
                enumerable: !0, get: function () {
                    return e.i
                }
            });
            Object.defineProperty(e, "exports", {enumerable: !0});
            e.webpackPolyfill = 1
        }
        return e
    }
}, function (n, p, h) {
    h.d(p, "a", function () {
        return t
    });
    n = h(42);
    var e = h.n(n), f = h(0), c = h(1), a = function (a, b) {
        a = Object(c.d)({type: a});
        a.args = b.args;
        return a
    }, t = function (m) {
        var b = Object(c.b)(), g = function () {
        }, l = [];
        $jscomp.initSymbol();
        b.CONNECTED = Symbol("connected");
        $jscomp.initSymbol();
        b.RECONNECTING = Symbol("reconnecting");
        $jscomp.initSymbol();
        b.DISCONNECTED = Symbol("disconnected");
        b.state = b.DISCONNECTED;
        b.IO = void 0 === m ? e.a : m;
        var d, r = function (d, c) {
            for (var k = [], g = 1; g < arguments.length; ++g) k[g - 1] = arguments[g];
            b.emit(a(d, {args: k}))
        }, t = function () {
            b.state === b.CONNECTED && l.forEach(function (a) {
                b.sendMessage.apply(b, [].concat($jscomp.arrayFromIterable(a)))
            })
        };
        b.connect = function (a, c, k, e) {
            k = void 0 === k ? g : k;
            e = void 0 === e ? g : e;
            d = b.IO.connect((a.secure ? "wss://" : "ws://") + a.host,
                {
                    reconnection: !0,
                    reconnectionAttempts: 3,
                    secure: a.secure,
                    forceNew: !0,
                    transports: ["websocket"],
                    rejectUnauthorized: !1
                });
            var q = 1E3, l = d.io.engine.transport.ws.onclose;
            d.io.engine.transport.ws.onclose = function (a) {
                f.a.warning("WebSocket closed, code:", a.code);
                q = a.code;
                l(a)
            };
            b.socket = d;
            d.on("onAddStream", r.bind(b, "onAddStream"));
            d.on("signaling_message_erizo", r.bind(b, "signaling_message_erizo"));
            d.on("signaling_message_peer", r.bind(b, "signaling_message_peer"));
            d.on("publish_me", r.bind(b, "publish_me"));
            d.on("unpublish_me",
                r.bind(b, "unpublish_me"));
            d.on("onBandwidthAlert", r.bind(b, "onBandwidthAlert"));
            d.on("onDataStream", r.bind(b, "onDataStream"));
            d.on("onUpdateAttributeStream", r.bind(b, "onUpdateAttributeStream"));
            d.on("onRemoveStream", r.bind(b, "onRemoveStream"));
            d.on("onAutomaticStreamsSubscription", r.bind(b, "onAutomaticStreamsSubscription"));
            d.on("disconnect", function (a) {
                f.a.debug("disconnect", b.id, a);
                1E3 !== q ? b.state = b.RECONNECTING : (r("disconnect", a), d.close())
            });
            d.on("connection_failed", function (a) {
                f.a.error("connection failed, id:",
                    b.id);
                r("connection_failed", a)
            });
            d.on("error", function (a) {
                f.a.warning("socket error, id:", b.id, ", error:", a.message);
                r("error")
            });
            d.on("connect_error", function (a) {
                f.a.warning("connect error, id:", b.id, ", error:", a.message)
            });
            d.on("connect_timeout", function (a) {
                f.a.warning("connect timeout, id:", b.id, ", error:", a.message)
            });
            d.on("reconnecting", function (a) {
                f.a.debug("reconnecting, id:", b.id, ", attempet:", a)
            });
            d.on("reconnect", function (a) {
                f.a.debug("reconnected, id:", b.id, ", attempet:", a);
                b.state = b.CONNECTED;
                d.emit("reconnected", b.id);
                t()
            });
            d.on("reconnect_attempt", function (a) {
                f.a.debug("reconnect attempt, id:", b.id, ", attempet:", a)
            });
            d.on("reconnect_error", function (a) {
                f.a.debug("error reconnecting, id:", b.id, ", error:", a.message)
            });
            d.on("reconnect_failed", function () {
                f.a.warning("reconnect failed, id:", b.id);
                b.state = b.DISCONNECTED;
                r("disconnect", "reconnect failed")
            });
            c.token = a;
            b.sendMessage("token", c, function (a) {
                b.state = b.CONNECTED;
                b.id = a.clientId;
                k(a)
            }, e)
        };
        b.disconnect = function () {
            b.state = b.DISCONNECTED;
            d.disconnect()
        };
        b.sendMessage = function (a, c, k, e) {
            k = void 0 === k ? g : k;
            e = void 0 === e ? g : e;
            b.state === b.DISCONNECTED && "token" !== a ? f.a.error("Trying to send a message over a disconnected Socket") : b.state === b.RECONNECTING ? l.push([a, c, k, e]) : d.emit(a, c, function (a, b) {
                "success" === a ? k(b) : "error" === a ? e(b) : k(a, b)
            })
        };
        b.sendSDP = function (a, c, k, e) {
            e = void 0 === e ? g : e;
            b.state === b.DISCONNECTED ? f.a.error("Trying to send a message over a disconnected Socket") : d.emit(a, c, k, function (a) {
                for (var b = [], k = 0; k < arguments.length; ++k) b[k -
                0] = arguments[k];
                e.apply(null, [].concat($jscomp.arrayFromIterable(b)))
            })
        };
        return b
    }
}, function (n, p, h) {
    !function (e, f) {
        n.exports = f()
    }(this, function () {
        return function (e) {
            function f(a) {
                if (c[a]) return c[a].exports;
                var t = c[a] = {exports: {}, id: a, loaded: !1};
                return e[a].call(t.exports, t, t.exports, f), t.loaded = !0, t.exports
            }

            var c = {};
            return f.m = e, f.c = c, f.p = "", f(0)
        }([function (e, f, c) {
            function a(a, b) {
                "object" === ("undefined" == typeof a ? "undefined" : t(a)) && (b = a, a = void 0);
                b = b || {};
                var c;
                a = m(a);
                var q = a.source, k = a.id, f = a.path,
                    f = d[k] && f in d[k].nsps;
                return b.forceNew || b["force new connection"] || !1 === b.multiplex || f ? (l("ignoring socket cache for %s", q), c = g(q, b)) : (d[k] || (l("new io instance for %s", q), d[k] = g(q, b)), c = d[k]), a.query && !b.query && (b.query = a.query), c.socket(a.path, b)
            }

            $jscomp.initSymbol();
            $jscomp.initSymbol();
            $jscomp.initSymbolIterator();
            var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
                return typeof a
            } : function (a) {
                $jscomp.initSymbol();
                $jscomp.initSymbol();
                $jscomp.initSymbol();
                return a &&
                "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
            }, m = c(1), b = c(7), g = c(13), l = c(3)("socket.io-client");
            e.exports = f = a;
            var d = f.managers = {};
            f.protocol = b.protocol;
            f.connect = a;
            f.Manager = c(13);
            f.Socket = c(39)
        }, function (e, f, c) {
            (function (a) {
                var f = c(2), m = c(3)("socket.io-client:url");
                e.exports = function (b, c) {
                    var g = b;
                    c = c || a.location;
                    null == b && (b = c.protocol + "//" + c.host);
                    "string" == typeof b && ("/" === b.charAt(0) && (b = "/" === b.charAt(1) ? c.protocol + b : c.host + b), /^(https?|wss?):\/\//.test(b) ||
                    (m("protocol-less url %s", b), b = "undefined" != typeof c ? c.protocol + "//" + b : "https://" + b), m("parse %s", b), g = f(b));
                    g.port || (/^(http|ws)$/.test(g.protocol) ? g.port = "80" : /^(http|ws)s$/.test(g.protocol) && (g.port = "443"));
                    g.path = g.path || "/";
                    b = -1 !== g.host.indexOf(":") ? "[" + g.host + "]" : g.host;
                    return g.id = g.protocol + "://" + b + ":" + g.port, g.href = g.protocol + "://" + b + (c && c.port === g.port ? "" : ":" + g.port), g
                }
            }).call(f, function () {
                return this
            }())
        }, function (e, f) {
            var c = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                a = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
            e.exports = function (f) {
                var e = f, b = f.indexOf("["), g = f.indexOf("]");
                -1 != b && -1 != g && (f = f.substring(0, b) + f.substring(b, g).replace(/:/g, ";") + f.substring(g, f.length));
                f = c.exec(f || "");
                for (var l = {}, d = 14; d--;) l[a[d]] = f[d] || "";
                return -1 != b && -1 != g && (l.source = e, l.host = l.host.substring(1, l.host.length - 1).replace(/;/g, ":"), l.authority = l.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), l.ipv6uri =
                    !0), l
            }
        }, function (e, f, c) {
            (function (a) {
                function t() {
                    try {
                        var b = f.storage.debug
                    } catch (l) {
                    }
                    return !b && "undefined" != typeof a && "env" in a && (b = a.env.DEBUG), b
                }

                f = e.exports = c(5);
                f.log = function () {
                    return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                };
                f.formatArgs = function (a) {
                    var b = this.useColors;
                    if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + f.humanize(this.diff), b) {
                        b = "color: " + this.color;
                        a.splice(1, 0, b, "color: inherit");
                        var d = 0, c = 0;
                        a[0].replace(/%[a-zA-Z%]/g,
                            function (a) {
                                "%%" !== a && (d++, "%c" === a && (c = d))
                            });
                        a.splice(c, 0, b)
                    }
                };
                f.save = function (a) {
                    try {
                        null == a ? f.storage.removeItem("debug") : f.storage.debug = a
                    } catch (l) {
                    }
                };
                f.load = t;
                f.useColors = function () {
                    return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception &&
                        window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                };
                var m = f;
                if ("undefined" != typeof chrome && "undefined" != typeof chrome.storage) var b = chrome.storage.local; else a:{
                    try {
                        b = window.localStorage;
                        break a
                    } catch (g) {
                    }
                    b = void 0
                }
                m.storage = b;
                f.colors = "lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" ");
                f.formatters.j = function (a) {
                    try {
                        return JSON.stringify(a)
                    } catch (l) {
                        return "[UnexpectedJSONParseError]: " + l.message
                    }
                };
                f.enable(t())
            }).call(f, c(4))
        }, function (e, f) {
            function c() {
                throw Error("setTimeout has not been defined");
            }

            function a() {
                throw Error("clearTimeout has not been defined");
            }

            function t(a) {
                if (r === setTimeout) return setTimeout(a, 0);
                if ((r === c || !r) && setTimeout) return r = setTimeout, setTimeout(a, 0);
                try {
                    return r(a, 0)
                } catch (y) {
                    try {
                        return r.call(null, a, 0)
                    } catch (B) {
                        return r.call(this, a, 0)
                    }
                }
            }

            function m(b) {
                if (w ===
                    clearTimeout) return clearTimeout(b);
                if ((w === a || !w) && clearTimeout) return w = clearTimeout, clearTimeout(b);
                try {
                    return w(b)
                } catch (y) {
                    try {
                        return w.call(null, b)
                    } catch (B) {
                        return w.call(this, b)
                    }
                }
            }

            function b() {
                k && h && (k = !1, h.length ? q = h.concat(q) : v = -1, q.length && g())
            }

            function g() {
                if (!k) {
                    var a = t(b);
                    k = !0;
                    for (var d = q.length; d;) {
                        h = q;
                        for (q = []; ++v < d;) h && h[v].run();
                        v = -1;
                        d = q.length
                    }
                    h = null;
                    k = !1;
                    m(a)
                }
            }

            function l(a, b) {
                this.fun = a;
                this.array = b
            }

            function d() {
            }

            e = e.exports = {};
            try {
                var r = "function" == typeof setTimeout ? setTimeout :
                    c
            } catch (x) {
                r = c
            }
            try {
                var w = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (x) {
                w = a
            }
            !0;
            var h, q = [], k = !1, v = -1;
            e.nextTick = function (a) {
                var b = Array(arguments.length - 1);
                if (1 < arguments.length) for (var d = 1; d < arguments.length; d++) b[d - 1] = arguments[d];
                q.push(new l(a, b));
                1 !== q.length || k || t(g)
            };
            l.prototype.run = function () {
                this.fun.apply(null, this.array)
            };
            e.title = "browser";
            e.browser = !0;
            e.env = {};
            e.argv = [];
            e.version = "";
            e.versions = {};
            e.on = d;
            e.addListener = d;
            e.once = d;
            e.off = d;
            e.removeListener = d;
            e.removeAllListeners = d;
            e.emit = d;
            e.prependListener = d;
            e.prependOnceListener = d;
            e.listeners = function (a) {
                return []
            };
            e.binding = function (a) {
                throw Error("process.binding is not supported");
            };
            e.cwd = function () {
                return "/"
            };
            e.chdir = function (a) {
                throw Error("process.chdir is not supported");
            };
            e.umask = function () {
                return 0
            }
        }, function (e, f, c) {
            function a(a) {
                var b, c = 0;
                for (b in a) c = (c << 5) - c + a.charCodeAt(b), c |= 0;
                return f.colors[Math.abs(c) % f.colors.length]
            }

            function t(b) {
                function c() {
                    if (c.enabled) {
                        var a = +new Date;
                        c.diff = a - (m || a);
                        c.prev = m;
                        m = c.curr =
                            a;
                        for (var b = Array(arguments.length), a = 0; a < b.length; a++) b[a] = arguments[a];
                        b[0] = f.coerce(b[0]);
                        "string" != typeof b[0] && b.unshift("%O");
                        var g = 0;
                        b[0] = b[0].replace(/%([a-zA-Z%])/g, function (a, d) {
                            if ("%%" === a) return a;
                            g++;
                            d = f.formatters[d];
                            "function" == typeof d && (a = d.call(c, b[g]), b.splice(g, 1), g--);
                            return a
                        });
                        f.formatArgs.call(c, b);
                        (c.log || f.log || console.log.bind(console)).apply(c, b)
                    }
                }

                return c.namespace = b, c.enabled = f.enabled(b), c.useColors = f.useColors(), c.color = a(b), "function" == typeof f.init && f.init(c), c
            }

            f =
                e.exports = t.debug = t["default"] = t;
            f.coerce = function (a) {
                return a instanceof Error ? a.stack || a.message : a
            };
            f.disable = function () {
                f.enable("")
            };
            f.enable = function (a) {
                f.save(a);
                f.names = [];
                f.skips = [];
                for (var b = ("string" == typeof a ? a : "").split(/[\s,]+/), c = b.length, d = 0; d < c; d++) b[d] && (a = b[d].replace(/\*/g, ".*?"), "-" === a[0] ? f.skips.push(new RegExp("^" + a.substr(1) + "$")) : f.names.push(new RegExp("^" + a + "$")))
            };
            f.enabled = function (a) {
                var b;
                var c = 0;
                for (b = f.skips.length; c < b; c++) if (f.skips[c].test(a)) return !1;
                c = 0;
                for (b =
                         f.names.length; c < b; c++) if (f.names[c].test(a)) return !0;
                return !1
            };
            f.humanize = c(6);
            f.names = [];
            f.skips = [];
            f.formatters = {};
            var m
        }, function (e, f) {
            function c(a) {
                if (a = String(a), !(100 < a.length)) if (a = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a)) {
                    var c = parseFloat(a[1]);
                    switch ((a[2] || "ms").toLowerCase()) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return c * l;
                        case "days":
                        case "day":
                        case "d":
                            return c * g;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return c *
                                b;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return c * m;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return c * t;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return c
                    }
                }
            }

            function a(a, b, c) {
                if (!(a < b)) return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
            }

            var t = 1E3, m = 60 * t, b = 60 * m, g = 24 * b, l = 365.25 * g;
            e.exports = function (d, f) {
                f = f || {};
                var e = typeof d;
                if ("string" === e && 0 < d.length) return c(d);
                if ("number" === e && !1 === isNaN(d)) return f["long"] ? a(d,
                    g, "day") || a(d, b, "hour") || a(d, m, "minute") || a(d, t, "second") || d + " ms" : d >= g ? Math.round(d / g) + "d" : d >= b ? Math.round(d / b) + "h" : d >= m ? Math.round(d / m) + "m" : d >= t ? Math.round(d / t) + "s" : d + "ms";
                throw Error("val is not a non-empty string or a valid number. val\x3d" + JSON.stringify(d));
            }
        }, function (e, f, c) {
            function a() {
            }

            function t(a) {
                var b = "" + a.type;
                return f.BINARY_EVENT !== a.type && f.BINARY_ACK !== a.type || (b += a.attachments + "-"), a.nsp && "/" !== a.nsp && (b += a.nsp + ","), null != a.id && (b += a.id), null != a.data && (b += JSON.stringify(a.data)),
                    d("encoded %j as %s", a, b), b
            }

            function m(a, b) {
                h.removeBlobs(a, function (a) {
                    var k = h.deconstructPacket(a);
                    a = t(k.packet);
                    k = k.buffers;
                    k.unshift(a);
                    b(k)
                })
            }

            function b() {
                this.reconstructor = null
            }

            function g(a) {
                this.reconPack = a;
                this.buffers = []
            }

            function l() {
                return {type: f.ERROR, data: "parser error"}
            }

            var d = c(3)("socket.io-parser");
            e = c(8);
            var r = c(9), h = c(11), u = c(12);
            f.protocol = 4;
            f.types = "CONNECT DISCONNECT EVENT ACK ERROR BINARY_EVENT BINARY_ACK".split(" ");
            f.CONNECT = 0;
            f.DISCONNECT = 1;
            f.EVENT = 2;
            f.ACK = 3;
            f.ERROR = 4;
            f.BINARY_EVENT =
                5;
            f.BINARY_ACK = 6;
            f.Encoder = a;
            f.Decoder = b;
            a.prototype.encode = function (a, b) {
                (a.type !== f.EVENT && a.type !== f.ACK || !r(a.data) || (a.type = a.type === f.EVENT ? f.BINARY_EVENT : f.BINARY_ACK), d("encoding packet %j", a), f.BINARY_EVENT === a.type || f.BINARY_ACK === a.type) ? m(a, b) : (a = t(a), b([a]))
            };
            e(b.prototype);
            b.prototype.add = function (a) {
                if ("string" == typeof a) {
                    var b, c = 0, e = {type: Number(a.charAt(0))};
                    if (null == f.types[e.type]) a = l(); else {
                        if (f.BINARY_EVENT === e.type || f.BINARY_ACK === e.type) {
                            for (b = ""; "-" !== a.charAt(++c) && (b += a.charAt(c),
                            c != a.length);) ;
                            if (b != Number(b) || "-" !== a.charAt(c)) throw Error("Illegal attachments");
                            e.attachments = Number(b)
                        }
                        if ("/" === a.charAt(c + 1)) for (e.nsp = ""; ++c;) {
                            b = a.charAt(c);
                            if ("," === b) break;
                            if (e.nsp += b, c === a.length) break
                        } else e.nsp = "/";
                        b = a.charAt(c + 1);
                        if ("" !== b && Number(b) == b) {
                            for (e.id = ""; ++c;) {
                                b = a.charAt(c);
                                if (null == b || Number(b) != b) {
                                    --c;
                                    break
                                }
                                if (e.id += a.charAt(c), c === a.length) break
                            }
                            e.id = Number(e.id)
                        }
                        if (a.charAt(++c)) {
                            b:{
                                c = a.substr(c);
                                try {
                                    e.data = JSON.parse(c)
                                } catch (y) {
                                    c = l();
                                    break b
                                }
                                c = e
                            }
                            e = c
                        }
                        a = (d("decoded %s as %j",
                            a, e), e)
                    }
                    f.BINARY_EVENT === a.type || f.BINARY_ACK === a.type ? (this.reconstructor = new g(a), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", a)) : this.emit("decoded", a)
                } else {
                    if (!u(a) && !a.base64) throw Error("Unknown type: " + a);
                    if (!this.reconstructor) throw Error("got binary data when not reconstructing a packet");
                    (a = this.reconstructor.takeBinaryData(a)) && (this.reconstructor = null, this.emit("decoded", a))
                }
            };
            b.prototype.destroy = function () {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            };
            g.prototype.takeBinaryData = function (a) {
                return (this.buffers.push(a), this.buffers.length === this.reconPack.attachments) ? (a = h.reconstructPacket(this.reconPack, this.buffers), this.finishedReconstruction(), a) : null
            };
            g.prototype.finishedReconstruction = function () {
                this.reconPack = null;
                this.buffers = []
            }
        }, function (e, f, c) {
            function a(c) {
                if (c) {
                    for (var f in a.prototype) c[f] = a.prototype[f];
                    return c
                }
            }

            e.exports = a;
            a.prototype.on = a.prototype.addEventListener = function (a, c) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" +
                a] = this._callbacks["$" + a] || []).push(c), this
            };
            a.prototype.once = function (a, c) {
                function b() {
                    this.off(a, b);
                    c.apply(this, arguments)
                }

                return b.fn = c, this.on(a, b), this
            };
            a.prototype.off = a.prototype.removeListener = a.prototype.removeAllListeners = a.prototype.removeEventListener = function (a, c) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var b = this._callbacks["$" + a];
                if (!b) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + a], this;
                for (var g, f = 0; f < b.length; f++) if (g =
                    b[f], g === c || g.fn === c) {
                    b.splice(f, 1);
                    break
                }
                return this
            };
            a.prototype.emit = function (a) {
                this._callbacks = this._callbacks || {};
                var c = [].slice.call(arguments, 1), b = this._callbacks["$" + a];
                if (b) for (var b = b.slice(0), g = 0, f = b.length; g < f; ++g) b[g].apply(this, c);
                return this
            };
            a.prototype.listeners = function (a) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + a] || []
            };
            a.prototype.hasListeners = function (a) {
                return !!this.listeners(a).length
            }
        }, function (e, f, c) {
            (function (a) {
                function f(b) {
                    if (!b || "object" != typeof b) return !1;
                    if (m(b)) {
                        for (var c = 0, d = b.length; c < d; c++) if (f(b[c])) return !0;
                        return !1
                    }
                    if ("function" == typeof a.Buffer && a.Buffer.isBuffer && a.Buffer.isBuffer(b) || "function" == typeof a.ArrayBuffer && b instanceof ArrayBuffer || g && b instanceof Blob || l && b instanceof File) return !0;
                    if (b.toJSON && "function" == typeof b.toJSON && 1 === arguments.length) return f(b.toJSON(), !0);
                    for (c in b) if (Object.prototype.hasOwnProperty.call(b, c) && f(b[c])) return !0;
                    return !1
                }

                var m = c(10), b = Object.prototype.toString,
                    g = "function" == typeof a.Blob || "[object BlobConstructor]" ===
                        b.call(a.Blob),
                    l = "function" == typeof a.File || "[object FileConstructor]" === b.call(a.File);
                e.exports = f
            }).call(f, function () {
                return this
            }())
        }, function (e, f) {
            var c = {}.toString;
            e.exports = Array.isArray || function (a) {
                return "[object Array]" == c.call(a)
            }
        }, function (e, f, c) {
            (function (a) {
                function e(a, c) {
                    if (!a) return a;
                    if (g(a)) {
                        var d = {_placeholder: !0, num: c.length};
                        return c.push(a), d
                    }
                    if (b(a)) {
                        d = Array(a.length);
                        for (var k = 0; k < a.length; k++) d[k] = e(a[k], c);
                        return d
                    }
                    if ("object" == typeof a && !(a instanceof Date)) {
                        d = {};
                        for (k in a) d[k] =
                            e(a[k], c);
                        return d
                    }
                    return a
                }

                function m(a, c) {
                    if (!a) return a;
                    if (a && a._placeholder) return c[a.num];
                    if (b(a)) for (var d = 0; d < a.length; d++) a[d] = m(a[d], c); else if ("object" == typeof a) for (d in a) a[d] = m(a[d], c);
                    return a
                }

                var b = c(10), g = c(12), l = Object.prototype.toString,
                    d = "function" == typeof a.Blob || "[object BlobConstructor]" === l.call(a.Blob),
                    r = "function" == typeof a.File || "[object FileConstructor]" === l.call(a.File);
                f.deconstructPacket = function (a) {
                    var b = [];
                    return a.data = e(a.data, b), a.attachments = b.length, {
                        packet: a,
                        buffers: b
                    }
                };
                f.reconstructPacket = function (a, b) {
                    return a.data = m(a.data, b), a.attachments = void 0, a
                };
                f.removeBlobs = function (a, c) {
                    function f(a, q, l) {
                        if (!a) return a;
                        if (d && a instanceof Blob || r && a instanceof File) {
                            k++;
                            var v = new FileReader;
                            v.onload = function () {
                                l ? l[q] = this.result : e = this.result;
                                --k || c(e)
                            };
                            v.readAsArrayBuffer(a)
                        } else if (b(a)) for (v = 0; v < a.length; v++) f(a[v], v, a); else if ("object" == typeof a && !g(a)) for (v in a) f(a[v], v, a)
                    }

                    var k = 0, e = a;
                    f(e);
                    k || c(e)
                }
            }).call(f, function () {
                return this
            }())
        }, function (e, f) {
            (function (c) {
                e.exports =
                    function (a) {
                        return c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer
                    }
            }).call(f, function () {
                return this
            }())
        }, function (e, f, c) {
            function a(b, c) {
                if (!(this instanceof a)) return new a(b, c);
                b && "object" === ("undefined" == typeof b ? "undefined" : h(b)) && (c = b, b = void 0);
                c = c || {};
                c.path = c.path || "/socket.io";
                this.nsps = {};
                this.subs = [];
                this.opts = c;
                this.reconnection(!1 !== c.reconnection);
                this.reconnectionAttempts(c.reconnectionAttempts || 1 / 0);
                this.reconnectionDelay(c.reconnectionDelay || 1E3);
                this.reconnectionDelayMax(c.reconnectionDelayMax ||
                    5E3);
                this.randomizationFactor(c.randomizationFactor || .5);
                this.backoff = new u({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                });
                this.timeout(null == c.timeout ? 2E4 : c.timeout);
                this.readyState = "closed";
                this.uri = b;
                this.connecting = [];
                this.lastPing = null;
                this.encoding = !1;
                this.packetBuffer = [];
                b = c.parser || g;
                this.encoder = new b.Encoder;
                this.decoder = new b.Decoder;
                (this.autoConnect = !1 !== c.autoConnect) && this.open()
            }

            $jscomp.initSymbol();
            $jscomp.initSymbol();
            $jscomp.initSymbolIterator();
            var h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) {
                return typeof a
            } : function (a) {
                $jscomp.initSymbol();
                $jscomp.initSymbol();
                $jscomp.initSymbol();
                return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
            }, m = c(14), b = c(39);
            f = c(8);
            var g = c(7), l = c(41), d = c(42), r = c(3)("socket.io-client:manager"), w = c(37), u = c(43),
                q = Object.prototype.hasOwnProperty;
            e.exports = a;
            a.prototype.emitAll = function () {
                this.emit.apply(this, arguments);
                for (var a in this.nsps) q.call(this.nsps,
                    a) && this.nsps[a].emit.apply(this.nsps[a], arguments)
            };
            a.prototype.updateSocketIds = function () {
                for (var a in this.nsps) q.call(this.nsps, a) && (this.nsps[a].id = this.generateId(a))
            };
            a.prototype.generateId = function (a) {
                return ("/" === a ? "" : a + "#") + this.engine.id
            };
            f(a.prototype);
            a.prototype.reconnection = function (a) {
                return arguments.length ? (this._reconnection = !!a, this) : this._reconnection
            };
            a.prototype.reconnectionAttempts = function (a) {
                return arguments.length ? (this._reconnectionAttempts = a, this) : this._reconnectionAttempts
            };
            a.prototype.reconnectionDelay = function (a) {
                return arguments.length ? (this._reconnectionDelay = a, this.backoff && this.backoff.setMin(a), this) : this._reconnectionDelay
            };
            a.prototype.randomizationFactor = function (a) {
                return arguments.length ? (this._randomizationFactor = a, this.backoff && this.backoff.setJitter(a), this) : this._randomizationFactor
            };
            a.prototype.reconnectionDelayMax = function (a) {
                return arguments.length ? (this._reconnectionDelayMax = a, this.backoff && this.backoff.setMax(a), this) : this._reconnectionDelayMax
            };
            a.prototype.timeout = function (a) {
                return arguments.length ? (this._timeout = a, this) : this._timeout
            };
            a.prototype.maybeReconnectOnOpen = function () {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            };
            a.prototype.open = a.prototype.connect = function (a, b) {
                if (r("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                r("opening %s", this.uri);
                var c = this.engine = m(this.uri, this.opts), k = this;
                this.readyState = "opening";
                this.skipReconnect = !1;
                var d = l(c, "open", function () {
                    k.onopen();
                    a && a()
                });
                b = l(c, "error", function (b) {
                    if (r("connect_error"), k.cleanup(), k.readyState = "closed", k.emitAll("connect_error", b), a) {
                        var c = Error("Connection error");
                        c.data = b;
                        a(c)
                    } else k.maybeReconnectOnOpen()
                });
                if (!1 !== this._timeout) {
                    var g = this._timeout;
                    r("connect attempt will timeout after %d", g);
                    var f = setTimeout(function () {
                        r("connect attempt timed out after %d", g);
                        d.destroy();
                        c.close();
                        c.emit("error", "timeout");
                        k.emitAll("connect_timeout", g)
                    }, g);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(f)
                        }
                    })
                }
                return this.subs.push(d),
                    this.subs.push(b), this
            };
            a.prototype.onopen = function () {
                r("open");
                this.cleanup();
                this.readyState = "open";
                this.emit("open");
                var a = this.engine;
                this.subs.push(l(a, "data", d(this, "ondata")));
                this.subs.push(l(a, "ping", d(this, "onping")));
                this.subs.push(l(a, "pong", d(this, "onpong")));
                this.subs.push(l(a, "error", d(this, "onerror")));
                this.subs.push(l(a, "close", d(this, "onclose")));
                this.subs.push(l(this.decoder, "decoded", d(this, "ondecoded")))
            };
            a.prototype.onping = function () {
                this.lastPing = new Date;
                this.emitAll("ping")
            };
            a.prototype.onpong = function () {
                this.emitAll("pong", new Date - this.lastPing)
            };
            a.prototype.ondata = function (a) {
                this.decoder.add(a)
            };
            a.prototype.ondecoded = function (a) {
                this.emit("packet", a)
            };
            a.prototype.onerror = function (a) {
                r("error", a);
                this.emitAll("error", a)
            };
            a.prototype.socket = function (a, c) {
                function k() {
                    ~w(g.connecting, d) || g.connecting.push(d)
                }

                var d = this.nsps[a];
                if (!d) {
                    d = new b(this, a, c);
                    this.nsps[a] = d;
                    var g = this;
                    d.on("connecting", k);
                    d.on("connect", function () {
                        d.id = g.generateId(a)
                    });
                    this.autoConnect && k()
                }
                return d
            };
            a.prototype.destroy = function (a) {
                a = w(this.connecting, a);
                ~a && this.connecting.splice(a, 1);
                this.connecting.length || this.close()
            };
            a.prototype.packet = function (a) {
                r("writing packet %j", a);
                var b = this;
                a.query && 0 === a.type && (a.nsp += "?" + a.query);
                b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0, this.encoder.encode(a, function (c) {
                    for (var d = 0; d < c.length; d++) b.engine.write(c[d], a.options);
                    b.encoding = !1;
                    b.processPacketQueue()
                }))
            };
            a.prototype.processPacketQueue = function () {
                if (0 < this.packetBuffer.length && !this.encoding) {
                    var a =
                        this.packetBuffer.shift();
                    this.packet(a)
                }
            };
            a.prototype.cleanup = function () {
                r("cleanup");
                for (var a = this.subs.length, b = 0; b < a; b++) this.subs.shift().destroy();
                this.packetBuffer = [];
                this.encoding = !1;
                this.lastPing = null;
                this.decoder.destroy()
            };
            a.prototype.close = a.prototype.disconnect = function () {
                r("disconnect");
                this.skipReconnect = !0;
                this.reconnecting = !1;
                "opening" === this.readyState && this.cleanup();
                this.backoff.reset();
                this.readyState = "closed";
                this.engine && this.engine.close()
            };
            a.prototype.onclose = function (a) {
                r("onclose");
                this.cleanup();
                this.backoff.reset();
                this.readyState = "closed";
                this.emit("close", a);
                this._reconnection && !this.skipReconnect && this.reconnect()
            };
            a.prototype.reconnect = function () {
                if (this.reconnecting || this.skipReconnect) return this;
                var a = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) r("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
                    var b = this.backoff.duration();
                    r("will wait %dms before reconnect attempt", b);
                    this.reconnecting = !0;
                    var c = setTimeout(function () {
                        a.skipReconnect ||
                        (r("attempting reconnect"), a.emitAll("reconnect_attempt", a.backoff.attempts), a.emitAll("reconnecting", a.backoff.attempts), a.skipReconnect || a.open(function (b) {
                            b ? (r("reconnect attempt error"), a.reconnecting = !1, a.reconnect(), a.emitAll("reconnect_error", b.data)) : (r("reconnect success"), a.onreconnect())
                        }))
                    }, b);
                    this.subs.push({
                        destroy: function () {
                            clearTimeout(c)
                        }
                    })
                }
            };
            a.prototype.onreconnect = function () {
                var a = this.backoff.attempts;
                this.reconnecting = !1;
                this.backoff.reset();
                this.updateSocketIds();
                this.emitAll("reconnect",
                    a)
            }
        }, function (e, f, c) {
            e.exports = c(15)
        }, function (e, f, c) {
            e.exports = c(16);
            e.exports.parser = c(23)
        }, function (e, f, c) {
            (function (a) {
                function f(b, c) {
                    if (!(this instanceof f)) return new f(b, c);
                    c = c || {};
                    b && "object" == typeof b && (c = b, b = null);
                    b ? (b = r(b), c.hostname = b.host, c.secure = "https" === b.protocol || "wss" === b.protocol, c.port = b.port, b.query && (c.query = b.query)) : c.host && (c.hostname = r(c.host).host);
                    this.secure = null != c.secure ? c.secure : a.location && "https:" === location.protocol;
                    c.hostname && !c.port && (c.port = this.secure ? "443" :
                        "80");
                    this.agent = c.agent || !1;
                    this.hostname = c.hostname || (a.location ? location.hostname : "localhost");
                    this.port = c.port || (a.location && location.port ? location.port : this.secure ? 443 : 80);
                    this.query = c.query || {};
                    "string" == typeof this.query && (this.query = u.decode(this.query));
                    this.upgrade = !1 !== c.upgrade;
                    this.path = (c.path || "/engine.io").replace(/\/$/, "") + "/";
                    this.forceJSONP = !!c.forceJSONP;
                    this.jsonp = !1 !== c.jsonp;
                    this.forceBase64 = !!c.forceBase64;
                    this.enablesXDR = !!c.enablesXDR;
                    this.timestampParam = c.timestampParam ||
                        "t";
                    this.timestampRequests = c.timestampRequests;
                    this.transports = c.transports || ["polling", "websocket"];
                    this.transportOptions = c.transportOptions || {};
                    this.readyState = "";
                    this.writeBuffer = [];
                    this.prevBufferLen = 0;
                    this.policyPort = c.policyPort || 843;
                    this.rememberUpgrade = c.rememberUpgrade || !1;
                    this.binaryType = null;
                    this.onlyBinaryUpgrades = c.onlyBinaryUpgrades;
                    this.perMessageDeflate = !1 !== c.perMessageDeflate && (c.perMessageDeflate || {});
                    !0 === this.perMessageDeflate && (this.perMessageDeflate = {});
                    this.perMessageDeflate &&
                    null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024);
                    this.pfx = c.pfx || null;
                    this.key = c.key || null;
                    this.passphrase = c.passphrase || null;
                    this.cert = c.cert || null;
                    this.ca = c.ca || null;
                    this.ciphers = c.ciphers || null;
                    this.rejectUnauthorized = void 0 === c.rejectUnauthorized || c.rejectUnauthorized;
                    this.forceNode = !!c.forceNode;
                    b = "object" == typeof a && a;
                    b.global === b && (c.extraHeaders && 0 < Object.keys(c.extraHeaders).length && (this.extraHeaders = c.extraHeaders), c.localAddress && (this.localAddress = c.localAddress));
                    this.pingTimeoutTimer = this.pingIntervalTimer = this.pingTimeout = this.pingInterval = this.upgrades = this.id = null;
                    this.open()
                }

                var m = c(17), b = c(8), g = c(3)("engine.io-client:socket"), l = c(37), d = c(23), r = c(2), h = c(38),
                    u = c(31);
                e.exports = f;
                f.priorWebsocketSuccess = !1;
                b(f.prototype);
                f.protocol = d.protocol;
                f.Socket = f;
                f.Transport = c(22);
                f.transports = c(17);
                f.parser = c(23);
                f.prototype.createTransport = function (a) {
                    g('creating transport "%s"', a);
                    var b = this.query, c = {}, f;
                    for (f in b) b.hasOwnProperty(f) && (c[f] = b[f]);
                    c.EIO = d.protocol;
                    c.transport = a;
                    b = this.transportOptions[a] || {};
                    this.id && (c.sid = this.id);
                    return new m[a]({
                        query: c,
                        socket: this,
                        agent: b.agent || this.agent,
                        hostname: b.hostname || this.hostname,
                        port: b.port || this.port,
                        secure: b.secure || this.secure,
                        path: b.path || this.path,
                        forceJSONP: b.forceJSONP || this.forceJSONP,
                        jsonp: b.jsonp || this.jsonp,
                        forceBase64: b.forceBase64 || this.forceBase64,
                        enablesXDR: b.enablesXDR || this.enablesXDR,
                        timestampRequests: b.timestampRequests || this.timestampRequests,
                        timestampParam: b.timestampParam || this.timestampParam,
                        policyPort: b.policyPort || this.policyPort,
                        pfx: b.pfx || this.pfx,
                        key: b.key || this.key,
                        passphrase: b.passphrase || this.passphrase,
                        cert: b.cert || this.cert,
                        ca: b.ca || this.ca,
                        ciphers: b.ciphers || this.ciphers,
                        rejectUnauthorized: b.rejectUnauthorized || this.rejectUnauthorized,
                        perMessageDeflate: b.perMessageDeflate || this.perMessageDeflate,
                        extraHeaders: b.extraHeaders || this.extraHeaders,
                        forceNode: b.forceNode || this.forceNode,
                        localAddress: b.localAddress || this.localAddress,
                        requestTimeout: b.requestTimeout || this.requestTimeout,
                        protocols: b.protocols || void 0
                    })
                };
                f.prototype.open = function () {
                    if (this.rememberUpgrade && f.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) var a = "websocket"; else {
                        if (0 === this.transports.length) {
                            var b = this;
                            return void setTimeout(function () {
                                b.emit("error", "No transports available")
                            }, 0)
                        }
                        a = this.transports[0]
                    }
                    this.readyState = "opening";
                    try {
                        a = this.createTransport(a)
                    } catch (v) {
                        return this.transports.shift(), void this.open()
                    }
                    a.open();
                    this.setTransport(a)
                };
                f.prototype.setTransport = function (a) {
                    g("setting transport %s",
                        a.name);
                    var b = this;
                    this.transport && (g("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners());
                    this.transport = a;
                    a.on("drain", function () {
                        b.onDrain()
                    }).on("packet", function (a) {
                        b.onPacket(a)
                    }).on("error", function (a) {
                        b.onError(a)
                    }).on("close", function () {
                        b.onClose("transport close")
                    })
                };
                f.prototype.probe = function (a) {
                    function b() {
                        if (u.onlyBinaryUpgrades) {
                            var b = !this.supportsBinary && u.transport.supportsBinary;
                            h = h || b
                        }
                        h || (g('probe transport "%s" opened', a), r.send([{
                            type: "ping",
                            data: "probe"
                        }]), r.once("packet", function (b) {
                            if (!h) if ("pong" === b.type && "probe" === b.data) {
                                if (g('probe transport "%s" pong', a), u.upgrading = !0, u.emit("upgrading", r), r) f.priorWebsocketSuccess = "websocket" === r.name, g('pausing current transport "%s"', u.transport.name), u.transport.pause(function () {
                                    h || "closed" !== u.readyState && (g("changing transport and sending upgrade packet"), m(), u.setTransport(r), r.send([{type: "upgrade"}]), u.emit("upgrade", r), r = null, u.upgrading = !1, u.flush())
                                })
                            } else g('probe transport "%s" failed',
                                a), b = Error("probe error"), b.transport = r.name, u.emit("upgradeError", b)
                        }))
                    }

                    function c() {
                        h || (h = !0, m(), r.close(), r = null)
                    }

                    function d(b) {
                        var d = Error("probe error: " + b);
                        d.transport = r.name;
                        c();
                        g('probe transport "%s" failed because of error: %s', a, b);
                        u.emit("upgradeError", d)
                    }

                    function e() {
                        d("transport closed")
                    }

                    function l() {
                        d("socket closed")
                    }

                    function q(a) {
                        r && a.name !== r.name && (g('"%s" works - aborting "%s"', a.name, r.name), c())
                    }

                    function m() {
                        r.removeListener("open", b);
                        r.removeListener("error", d);
                        r.removeListener("close",
                            e);
                        u.removeListener("close", l);
                        u.removeListener("upgrading", q)
                    }

                    g('probing transport "%s"', a);
                    var r = this.createTransport(a, {probe: 1}), h = !1, u = this;
                    f.priorWebsocketSuccess = !1;
                    r.once("open", b);
                    r.once("error", d);
                    r.once("close", e);
                    this.once("close", l);
                    this.once("upgrading", q);
                    r.open()
                };
                f.prototype.onOpen = function () {
                    if (g("socket open"), this.readyState = "open", f.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                        g("starting upgrade probes");
                        for (var a = 0, b = this.upgrades.length; a < b; a++) this.probe(this.upgrades[a])
                    }
                };
                f.prototype.onPacket = function (a) {
                    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (g('socket receive: type "%s", data "%s"', a.type, a.data), this.emit("packet", a), this.emit("heartbeat"), a.type) {
                        case "open":
                            this.onHandshake(h(a.data));
                            break;
                        case "pong":
                            this.setPing();
                            this.emit("pong");
                            break;
                        case "error":
                            var b = Error("server error");
                            b.code = a.data;
                            this.onError(b);
                            break;
                        case "message":
                            this.emit("data",
                                a.data), this.emit("message", a.data)
                    } else g('packet received with socket readyState "%s"', this.readyState)
                };
                f.prototype.onHandshake = function (a) {
                    this.emit("handshake", a);
                    this.id = a.sid;
                    this.transport.query.sid = a.sid;
                    this.upgrades = this.filterUpgrades(a.upgrades);
                    this.pingInterval = a.pingInterval;
                    this.pingTimeout = a.pingTimeout;
                    this.onOpen();
                    "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                };
                f.prototype.onHeartbeat = function (a) {
                    clearTimeout(this.pingTimeoutTimer);
                    var b = this;
                    b.pingTimeoutTimer = setTimeout(function () {
                        "closed" !== b.readyState && b.onClose("ping timeout")
                    }, a || b.pingInterval + b.pingTimeout)
                };
                f.prototype.setPing = function () {
                    var a = this;
                    clearTimeout(a.pingIntervalTimer);
                    a.pingIntervalTimer = setTimeout(function () {
                        g("writing ping packet - expecting pong within %sms", a.pingTimeout);
                        a.ping();
                        a.onHeartbeat(a.pingTimeout)
                    }, a.pingInterval)
                };
                f.prototype.ping = function () {
                    var a = this;
                    this.sendPacket("ping", function () {
                        a.emit("ping")
                    })
                };
                f.prototype.onDrain = function () {
                    this.writeBuffer.splice(0,
                        this.prevBufferLen);
                    this.prevBufferLen = 0;
                    0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                };
                f.prototype.flush = function () {
                    "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (g("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                };
                f.prototype.write = f.prototype.send = function (a, b, c) {
                    return this.sendPacket("message", a, b, c), this
                };
                f.prototype.sendPacket =
                    function (a, b, c, d) {
                        if ("function" == typeof b && (d = b, b = void 0), "function" == typeof c && (d = c, c = null), "closing" !== this.readyState && "closed" !== this.readyState) c = c || {}, c.compress = !1 !== c.compress, a = {
                            type: a,
                            data: b,
                            options: c
                        }, this.emit("packetCreate", a), this.writeBuffer.push(a), d && this.once("flush", d), this.flush()
                    };
                f.prototype.close = function () {
                    function a() {
                        d.onClose("forced close");
                        g("socket closing - telling transport to close");
                        d.transport.close()
                    }

                    function b() {
                        d.removeListener("upgrade", b);
                        d.removeListener("upgradeError",
                            b);
                        a()
                    }

                    function c() {
                        d.once("upgrade", b);
                        d.once("upgradeError", b)
                    }

                    if ("opening" === this.readyState || "open" === this.readyState) {
                        this.readyState = "closing";
                        var d = this;
                        this.writeBuffer.length ? this.once("drain", function () {
                            this.upgrading ? c() : a()
                        }) : this.upgrading ? c() : a()
                    }
                    return this
                };
                f.prototype.onError = function (a) {
                    g("socket error %j", a);
                    f.priorWebsocketSuccess = !1;
                    this.emit("error", a);
                    this.onClose("transport error", a)
                };
                f.prototype.onClose = function (a, b) {
                    if ("opening" === this.readyState || "open" === this.readyState ||
                        "closing" === this.readyState) g('socket close with reason: "%s"', a), clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", a, b), this.writeBuffer = [], this.prevBufferLen = 0
                };
                f.prototype.filterUpgrades = function (a) {
                    for (var b = [], c = 0, d = a.length; c < d; c++) ~l(this.transports, a[c]) && b.push(a[c]);
                    return b
                }
            }).call(f, function () {
                return this
            }())
        },
            function (e, f, c) {
                (function (a) {
                    var e = c(18), m = c(20), b = c(34), g = c(35);
                    f.polling = function (c) {
                        var d, g = !1, f = !1, l = !1 !== c.jsonp;
                        a.location && (f = "https:" === location.protocol, (g = location.port) || (g = f ? 443 : 80), g = c.hostname !== location.hostname || g !== c.port, f = c.secure !== f);
                        if (c.xdomain = g, c.xscheme = f, d = new e(c), "open" in d && !c.forceJSONP) return new m(c);
                        if (!l) throw Error("JSONP disabled");
                        return new b(c)
                    };
                    f.websocket = g
                }).call(f, function () {
                    return this
                }())
            }, function (e, f, c) {
                (function (a) {
                    var f = c(19);
                    e.exports = function (c) {
                        var b =
                            c.xdomain, g = c.xscheme;
                        c = c.enablesXDR;
                        try {
                            if ("undefined" != typeof XMLHttpRequest && (!b || f)) return new XMLHttpRequest
                        } catch (l) {
                        }
                        try {
                            if ("undefined" != typeof XDomainRequest && !g && c) return new XDomainRequest
                        } catch (l) {
                        }
                        if (!b) try {
                            return new (a[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                        } catch (l) {
                        }
                    }
                }).call(f, function () {
                    return this
                }())
            }, function (e, f) {
                try {
                    e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                } catch (c) {
                    e.exports = !1
                }
            }, function (e, f, c) {
                (function (a) {
                    function f() {
                    }

                    function m(b) {
                        if (d.call(this, b), this.requestTimeout = b.requestTimeout, this.extraHeaders = b.extraHeaders, a.location) {
                            var c = "https:" === location.protocol, g = location.port;
                            g || (g = c ? 443 : 80);
                            this.xd = b.hostname !== a.location.hostname || g !== b.port;
                            this.xs = b.secure !== c
                        }
                    }

                    function b(a) {
                        this.method = a.method || "GET";
                        this.uri = a.uri;
                        this.xd = !!a.xd;
                        this.xs = !!a.xs;
                        this.async = !1 !== a.async;
                        this.data = void 0 !== a.data ? a.data : null;
                        this.agent = a.agent;
                        this.isBinary = a.isBinary;
                        this.supportsBinary = a.supportsBinary;
                        this.enablesXDR =
                            a.enablesXDR;
                        this.requestTimeout = a.requestTimeout;
                        this.pfx = a.pfx;
                        this.key = a.key;
                        this.passphrase = a.passphrase;
                        this.cert = a.cert;
                        this.ca = a.ca;
                        this.ciphers = a.ciphers;
                        this.rejectUnauthorized = a.rejectUnauthorized;
                        this.extraHeaders = a.extraHeaders;
                        this.create()
                    }

                    function g() {
                        for (var a in b.requests) b.requests.hasOwnProperty(a) && b.requests[a].abort()
                    }

                    var l = c(18), d = c(21), r = c(8), h = c(32), u = c(3)("engine.io-client:polling-xhr");
                    e.exports = m;
                    e.exports.Request = b;
                    h(m, d);
                    m.prototype.supportsBinary = !0;
                    m.prototype.request =
                        function (a) {
                            return a = a || {}, a.uri = this.uri(), a.xd = this.xd, a.xs = this.xs, a.agent = this.agent || !1, a.supportsBinary = this.supportsBinary, a.enablesXDR = this.enablesXDR, a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized, a.requestTimeout = this.requestTimeout, a.extraHeaders = this.extraHeaders, new b(a)
                        };
                    m.prototype.doWrite = function (a, b) {
                        a = this.request({
                            method: "POST", data: a, isBinary: "string" != typeof a && void 0 !==
                                a
                        });
                        var c = this;
                        a.on("success", b);
                        a.on("error", function (a) {
                            c.onError("xhr post error", a)
                        });
                        this.sendXhr = a
                    };
                    m.prototype.doPoll = function () {
                        u("xhr poll");
                        var a = this.request(), b = this;
                        a.on("data", function (a) {
                            b.onData(a)
                        });
                        a.on("error", function (a) {
                            b.onError("xhr poll error", a)
                        });
                        this.pollXhr = a
                    };
                    r(b.prototype);
                    b.prototype.create = function () {
                        var c = {agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR};
                        c.pfx = this.pfx;
                        c.key = this.key;
                        c.passphrase = this.passphrase;
                        c.cert = this.cert;
                        c.ca = this.ca;
                        c.ciphers = this.ciphers;
                        c.rejectUnauthorized = this.rejectUnauthorized;
                        var d = this.xhr = new l(c), g = this;
                        try {
                            u("xhr open %s: %s", this.method, this.uri);
                            d.open(this.method, this.uri, this.async);
                            try {
                                if (this.extraHeaders) {
                                    d.setDisableHeaderCheck && d.setDisableHeaderCheck(!0);
                                    for (var f in this.extraHeaders) this.extraHeaders.hasOwnProperty(f) && d.setRequestHeader(f, this.extraHeaders[f])
                                }
                            } catch (y) {
                            }
                            if ("POST" === this.method) try {
                                this.isBinary ? d.setRequestHeader("Content-type", "application/octet-stream") : d.setRequestHeader("Content-type",
                                    "text/plain;charset\x3dUTF-8")
                            } catch (y) {
                            }
                            try {
                                d.setRequestHeader("Accept", "*/*")
                            } catch (y) {
                            }
                            "withCredentials" in d && (d.withCredentials = !0);
                            this.requestTimeout && (d.timeout = this.requestTimeout);
                            this.hasXDR() ? (d.onload = function () {
                                g.onLoad()
                            }, d.onerror = function () {
                                g.onError(d.responseText)
                            }) : d.onreadystatechange = function () {
                                if (2 === d.readyState) {
                                    try {
                                        var a = d.getResponseHeader("Content-Type")
                                    } catch (B) {
                                    }
                                    "application/octet-stream" === a && (d.responseType = "arraybuffer")
                                }
                                4 === d.readyState && (200 === d.status || 1223 === d.status ?
                                    g.onLoad() : setTimeout(function () {
                                        g.onError(d.status)
                                    }, 0))
                            };
                            u("xhr data %s", this.data);
                            d.send(this.data)
                        } catch (y) {
                            return void setTimeout(function () {
                                g.onError(y)
                            }, 0)
                        }
                        a.document && (this.index = b.requestsCount++, b.requests[this.index] = this)
                    };
                    b.prototype.onSuccess = function () {
                        this.emit("success");
                        this.cleanup()
                    };
                    b.prototype.onData = function (a) {
                        this.emit("data", a);
                        this.onSuccess()
                    };
                    b.prototype.onError = function (a) {
                        this.emit("error", a);
                        this.cleanup(!0)
                    };
                    b.prototype.cleanup = function (c) {
                        if ("undefined" != typeof this.xhr &&
                            null !== this.xhr) {
                            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = f : this.xhr.onreadystatechange = f, c) try {
                                this.xhr.abort()
                            } catch (k) {
                            }
                            a.document && delete b.requests[this.index];
                            this.xhr = null
                        }
                    };
                    b.prototype.onLoad = function () {
                        try {
                            try {
                                var a = this.xhr.getResponseHeader("Content-Type")
                            } catch (v) {
                            }
                            var b = "application/octet-stream" === a ? this.xhr.response || this.xhr.responseText : this.xhr.responseText
                        } catch (v) {
                            this.onError(v)
                        }
                        null != b && this.onData(b)
                    };
                    b.prototype.hasXDR = function () {
                        return "undefined" != typeof a.XDomainRequest &&
                            !this.xs && this.enablesXDR
                    };
                    b.prototype.abort = function () {
                        this.cleanup()
                    };
                    b.requestsCount = 0;
                    b.requests = {};
                    a.document && (a.attachEvent ? a.attachEvent("onunload", g) : a.addEventListener && a.addEventListener("beforeunload", g, !1))
                }).call(f, function () {
                    return this
                }())
            }, function (e, f, c) {
                function a(a) {
                    var b = a && a.forceBase64;
                    d && !b || (this.supportsBinary = !1);
                    h.call(this, a)
                }

                var h = c(22), m = c(31), b = c(23);
                f = c(32);
                var g = c(33), l = c(3)("engine.io-client:polling");
                e.exports = a;
                var d = null != (new (c(18))({xdomain: !1})).responseType;
                f(a, h);
                a.prototype.name = "polling";
                a.prototype.doOpen = function () {
                    this.poll()
                };
                a.prototype.pause = function (a) {
                    function b() {
                        l("paused");
                        c.readyState = "paused";
                        a()
                    }

                    var c = this;
                    if (this.readyState = "pausing", this.polling || !this.writable) {
                        var d = 0;
                        this.polling && (l("we are currently polling - waiting to pause"), d++, this.once("pollComplete", function () {
                            l("pre-pause polling complete");
                            --d || b()
                        }));
                        this.writable || (l("we are currently writing - waiting to pause"), d++, this.once("drain", function () {
                            l("pre-pause writing complete");
                            --d || b()
                        }))
                    } else b()
                };
                a.prototype.poll = function () {
                    l("polling");
                    this.polling = !0;
                    this.doPoll();
                    this.emit("poll")
                };
                a.prototype.onData = function (a) {
                    var c = this;
                    l("polling got data %s", a);
                    b.decodePayload(a, this.socket.binaryType, function (a, b, d) {
                        return "opening" === c.readyState && c.onOpen(), "close" === a.type ? (c.onClose(), !1) : void c.onPacket(a)
                    });
                    "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : l('ignoring poll - transport state "%s"', this.readyState))
                };
                a.prototype.doClose = function () {
                    function a() {
                        l("writing close packet");
                        b.write([{type: "close"}])
                    }

                    var b = this;
                    "open" === this.readyState ? (l("transport open - closing"), a()) : (l("transport not open - deferring close"), this.once("open", a))
                };
                a.prototype.write = function (a) {
                    var c = this;
                    this.writable = !1;
                    var d = function () {
                        c.writable = !0;
                        c.emit("drain")
                    };
                    b.encodePayload(a, this.supportsBinary, function (a) {
                        c.doWrite(a, d)
                    })
                };
                a.prototype.uri = function () {
                    var a = this.query || {}, b = this.secure ? "https" : "http", c = "";
                    !1 !== this.timestampRequests &&
                    (a[this.timestampParam] = g());
                    this.supportsBinary || a.sid || (a.b64 = 1);
                    a = m.encode(a);
                    this.port && ("https" === b && 443 !== Number(this.port) || "http" === b && 80 !== Number(this.port)) && (c = ":" + this.port);
                    a.length && (a = "?" + a);
                    var d = -1 !== this.hostname.indexOf(":");
                    return b + "://" + (d ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
                }
            }, function (e, f, c) {
                function a(a) {
                    this.path = a.path;
                    this.hostname = a.hostname;
                    this.port = a.port;
                    this.secure = a.secure;
                    this.query = a.query;
                    this.timestampParam = a.timestampParam;
                    this.timestampRequests =
                        a.timestampRequests;
                    this.readyState = "";
                    this.agent = a.agent || !1;
                    this.socket = a.socket;
                    this.enablesXDR = a.enablesXDR;
                    this.pfx = a.pfx;
                    this.key = a.key;
                    this.passphrase = a.passphrase;
                    this.cert = a.cert;
                    this.ca = a.ca;
                    this.ciphers = a.ciphers;
                    this.rejectUnauthorized = a.rejectUnauthorized;
                    this.forceNode = a.forceNode;
                    this.extraHeaders = a.extraHeaders;
                    this.localAddress = a.localAddress
                }

                var h = c(23);
                f = c(8);
                e.exports = a;
                f(a.prototype);
                a.prototype.onError = function (a, b) {
                    a = Error(a);
                    return a.type = "TransportError", a.description = b, this.emit("error",
                        a), this
                };
                a.prototype.open = function () {
                    return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
                };
                a.prototype.close = function () {
                    return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
                };
                a.prototype.send = function (a) {
                    if ("open" !== this.readyState) throw Error("Transport not open");
                    this.write(a)
                };
                a.prototype.onOpen = function () {
                    this.readyState = "open";
                    this.writable = !0;
                    this.emit("open")
                };
                a.prototype.onData = function (a) {
                    a = h.decodePacket(a,
                        this.socket.binaryType);
                    this.onPacket(a)
                };
                a.prototype.onPacket = function (a) {
                    this.emit("packet", a)
                };
                a.prototype.onClose = function () {
                    this.readyState = "closed";
                    this.emit("close")
                }
            }, function (e, f, c) {
                (function (a) {
                    function e(a, b, c) {
                        if (!b) return f.encodeBase64Packet(a, c);
                        var d = new FileReader;
                        return d.onload = function () {
                            a.data = d.result;
                            f.encodePacket(a, b, !0, c)
                        }, d.readAsArrayBuffer(a.data)
                    }

                    function m(a, b, c) {
                        var d = Array(a.length);
                        c = h(a.length, c);
                        for (var g = function (a, c, g) {
                            b(c, function (b, c) {
                                d[a] = c;
                                g(b, d)
                            })
                        }, f = 0; f <
                             a.length; f++) g(f, a[f], c)
                    }

                    var b, g = c(24), l = c(9), d = c(25), h = c(26), w = c(27);
                    a && a.ArrayBuffer && (b = c(29));
                    var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
                        q = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), k = u || q;
                    f.protocol = 3;
                    var v = f.packets = {open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6},
                        x = g(v), y = {type: "error", data: "parser error"}, n = c(30);
                    f.encodePacket = function (b, c, d, g) {
                        "function" == typeof c && (g = c, c = !1);
                        "function" == typeof d && (g = d, d = null);
                        var l = void 0 ===
                        b.data ? void 0 : b.data.buffer || b.data;
                        if (a.ArrayBuffer && l instanceof ArrayBuffer) {
                            if (c) {
                                d = b.data;
                                c = new Uint8Array(d);
                                d = new Uint8Array(1 + d.byteLength);
                                d[0] = v[b.type];
                                for (b = 0; b < c.length; b++) d[b + 1] = c[b];
                                b = g(d.buffer)
                            } else b = f.encodeBase64Packet(b, g);
                            return b
                        }
                        if (n && l instanceof a.Blob) return c ? k ? b = e(b, c, g) : (c = new Uint8Array(1), c[0] = v[b.type], b = new n([c.buffer, b.data]), b = g(b)) : b = f.encodeBase64Packet(b, g), b;
                        if (l && l.base64) return g("b" + f.packets[b.type] + b.data.data);
                        c = v[b.type];
                        return void 0 !== b.data && (c +=
                            d ? w.encode(String(b.data), {strict: !1}) : String(b.data)), g("" + c)
                    };
                    f.encodeBase64Packet = function (b, c) {
                        var d = "b" + f.packets[b.type];
                        if (n && b.data instanceof a.Blob) {
                            var g = new FileReader;
                            return g.onload = function () {
                                var a = g.result.split(",")[1];
                                c(d + a)
                            }, g.readAsDataURL(b.data)
                        }
                        try {
                            var k = String.fromCharCode.apply(null, new Uint8Array(b.data))
                        } catch (D) {
                            b = new Uint8Array(b.data);
                            k = Array(b.length);
                            for (var e = 0; e < b.length; e++) k[e] = b[e];
                            k = String.fromCharCode.apply(null, k)
                        }
                        return d += a.btoa(k), c(d)
                    };
                    f.decodePacket = function (a,
                                               b, c) {
                        if (void 0 === a) return y;
                        if ("string" == typeof a) {
                            if ("b" === a.charAt(0)) return f.decodeBase64Packet(a.substr(1), b);
                            if (b = c) {
                                b = a;
                                try {
                                    b = w.decode(b, {strict: !1})
                                } catch (z) {
                                    b = !1
                                }
                                b = (a = b, !1 === a)
                            }
                            if (b) return y;
                            c = a.charAt(0);
                            return Number(c) == c && x[c] ? 1 < a.length ? {
                                type: x[c],
                                data: a.substring(1)
                            } : {type: x[c]} : y
                        }
                        c = (new Uint8Array(a))[0];
                        a = d(a, 1);
                        return n && "blob" === b && (a = new n([a])), {type: x[c], data: a}
                    };
                    f.decodeBase64Packet = function (a, c) {
                        var d = x[a.charAt(0)];
                        if (!b) return {type: d, data: {base64: !0, data: a.substr(1)}};
                        a =
                            b.decode(a.substr(1));
                        return "blob" === c && n && (a = new n([a])), {type: d, data: a}
                    };
                    f.encodePayload = function (a, b, c) {
                        function d(a, c) {
                            f.encodePacket(a, !!g && b, !1, function (a) {
                                c(null, a.length + ":" + a)
                            })
                        }

                        "function" == typeof b && (c = b, b = null);
                        var g = l(a);
                        return b && g ? n && !k ? f.encodePayloadAsBlob(a, c) : f.encodePayloadAsArrayBuffer(a, c) : a.length ? void m(a, d, function (a, b) {
                            return c(b.join(""))
                        }) : c("0:")
                    };
                    f.decodePayload = function (a, b, c) {
                        if ("string" != typeof a) return f.decodePayloadAsBinary(a, b, c);
                        "function" == typeof b && (c = b, b = null);
                        var d;
                        if ("" === a) return c(y, 0, 1);
                        for (var g, k, e = "", l = 0, m = a.length; l < m; l++) {
                            var v = a.charAt(l);
                            if (":" === v) {
                                if ("" === e || e != (g = Number(e)) || (k = a.substr(l + 1, g), e != k.length)) return c(y, 0, 1);
                                if (k.length) {
                                    if (d = f.decodePacket(k, b, !1), y.type === d.type && y.data === d.data) return c(y, 0, 1);
                                    if (!1 === c(d, l + g, m)) return
                                }
                                l += g;
                                e = ""
                            } else e += v
                        }
                        return "" !== e ? c(y, 0, 1) : void 0
                    };
                    f.encodePayloadAsArrayBuffer = function (a, b) {
                        function c(a, b) {
                            f.encodePacket(a, !0, !0, function (a) {
                                return b(null, a)
                            })
                        }

                        return a.length ? void m(a, c, function (a, c) {
                            a =
                                c.reduce(function (a, b) {
                                    var c;
                                    return c = "string" == typeof b ? b.length : b.byteLength, a + c.toString().length + c + 2
                                }, 0);
                            var d = new Uint8Array(a), g = 0;
                            return c.forEach(function (a) {
                                var b = "string" == typeof a, c = a;
                                if (b) {
                                    for (var c = new Uint8Array(a.length), f = 0; f < a.length; f++) c[f] = a.charCodeAt(f);
                                    c = c.buffer
                                }
                                b ? d[g++] = 0 : d[g++] = 1;
                                a = c.byteLength.toString();
                                for (f = 0; f < a.length; f++) d[g++] = parseInt(a[f]);
                                d[g++] = 255;
                                c = new Uint8Array(c);
                                for (f = 0; f < c.length; f++) d[g++] = c[f]
                            }), b(d.buffer)
                        }) : b(new ArrayBuffer(0))
                    };
                    f.encodePayloadAsBlob =
                        function (a, b) {
                            m(a, function (a, b) {
                                f.encodePacket(a, !0, !0, function (a) {
                                    var c = new Uint8Array(1);
                                    if (c[0] = 1, "string" == typeof a) {
                                        for (var d = new Uint8Array(a.length), g = 0; g < a.length; g++) d[g] = a.charCodeAt(g);
                                        a = d.buffer;
                                        c[0] = 0
                                    }
                                    for (var d = (a instanceof ArrayBuffer ? a.byteLength : a.size).toString(), f = new Uint8Array(d.length + 1), g = 0; g < d.length; g++) f[g] = parseInt(d[g]);
                                    if (f[d.length] = 255, n) a = new n([c.buffer, f.buffer, a]), b(null, a)
                                })
                            }, function (a, c) {
                                return b(new n(c))
                            })
                        };
                    f.decodePayloadAsBinary = function (a, b, c) {
                        "function" ==
                        typeof b && (c = b, b = null);
                        for (var g = []; 0 < a.byteLength;) {
                            for (var k = new Uint8Array(a), e = 0 === k[0], l = "", m = 1; 255 !== k[m]; m++) {
                                if (310 < l.length) return c(y, 0, 1);
                                l += k[m]
                            }
                            a = d(a, 2 + l.length);
                            l = parseInt(l);
                            k = d(a, 0, l);
                            if (e) try {
                                k = String.fromCharCode.apply(null, new Uint8Array(k))
                            } catch (J) {
                                for (e = new Uint8Array(k), k = "", m = 0; m < e.length; m++) k += String.fromCharCode(e[m])
                            }
                            g.push(k);
                            a = d(a, l)
                        }
                        var v = g.length;
                        g.forEach(function (a, d) {
                            c(f.decodePacket(a, b, !0), d, v)
                        })
                    }
                }).call(f, function () {
                    return this
                }())
            }, function (e, f) {
                e.exports = Object.keys ||
                    function (c) {
                        var a = [], f = Object.prototype.hasOwnProperty, e;
                        for (e in c) f.call(c, e) && a.push(e);
                        return a
                    }
            }, function (e, f) {
                e.exports = function (c, a, f) {
                    var e = c.byteLength;
                    if (a = a || 0, f = f || e, c.slice) return c.slice(a, f);
                    if (0 > a && (a += e), 0 > f && (f += e), f > e && (f = e), a >= e || a >= f || 0 === e) return new ArrayBuffer(0);
                    c = new Uint8Array(c);
                    for (var e = new Uint8Array(f - a), b = 0; a < f; a++, b++) e[b] = c[a];
                    return e.buffer
                }
            }, function (e, f) {
                function c() {
                }

                e.exports = function (a, f, e) {
                    function b(a, c) {
                        if (0 >= b.count) throw Error("after called too many times");
                        --b.count;
                        a ? (g = !0, f(a), f = e) : 0 !== b.count || g || f(null, c)
                    }

                    var g = !1;
                    return e = e || c, b.count = a, 0 === a ? f() : b
                }
            }, function (e, f, c) {
                var a;
                (function (e, m) {
                    !function (b) {
                        function g(a) {
                            for (var b, c, d = [], g = 0, f = a.length; g < f;) b = a.charCodeAt(g++), 55296 <= b && 56319 >= b && g < f ? (c = a.charCodeAt(g++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), g--)) : d.push(b);
                            return d
                        }

                        function l(a, b) {
                            if (55296 <= a && 57343 >= a) {
                                if (b) throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value");
                                return !1
                            }
                            return !0
                        }

                        function d() {
                            if (q >= u) throw Error("Invalid byte index");
                            var a = 255 & h[q];
                            if (q++, 128 == (192 & a)) return 63 & a;
                            throw Error("Invalid continuation byte");
                        }

                        function m(a) {
                            var b, c, g, f, k;
                            if (q > u) throw Error("Invalid byte index");
                            if (q == u) return !1;
                            if (b = 255 & h[q], q++, 0 == (128 & b)) return b;
                            if (192 == (224 & b)) {
                                if (c = d(), k = (31 & b) << 6 | c, 128 <= k) return k;
                                throw Error("Invalid continuation byte");
                            }
                            if (224 == (240 & b)) {
                                if (c = d(), g = d(), k = (15 & b) << 12 | c << 6 | g, 2048 <= k) return l(k, a) ? k : 65533;
                                throw Error("Invalid continuation byte");
                            }
                            if (240 == (248 &
                                b) && (c = d(), g = d(), f = d(), k = (7 & b) << 18 | c << 12 | g << 6 | f, 65536 <= k && 1114111 >= k)) return k;
                            throw Error("Invalid UTF-8 detected");
                        }

                        b = "object" == typeof f && f;
                        "object" == typeof e && e && e.exports == b && e;
                        var h, u, q, k = String.fromCharCode, v = {
                            version: "2.1.2", encode: function (a, b) {
                                b = b || {};
                                b = !1 !== b.strict;
                                a = g(a);
                                for (var c = a.length, d = -1, f = ""; ++d < c;) {
                                    var e = a[d];
                                    var v = b;
                                    if (0 == (4294967168 & e)) v = k(e); else {
                                        var m = "";
                                        v = (0 == (4294965248 & e) ? m = k(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (l(e, v) || (e = 65533), m = k(e >> 12 & 15 | 224), m += k(e >> 6 & 63 | 128)) : 0 == (4292870144 &
                                            e) && (m = k(e >> 18 & 7 | 240), m += k(e >> 12 & 63 | 128), m += k(e >> 6 & 63 | 128)), m + k(63 & e | 128))
                                    }
                                    f += v
                                }
                                return f
                            }, decode: function (a, b) {
                                b = b || {};
                                b = !1 !== b.strict;
                                h = g(a);
                                u = h.length;
                                q = 0;
                                var c;
                                for (a = []; !1 !== (c = m(b));) a.push(c);
                                c = a.length;
                                for (var d = -1, f = ""; ++d < c;) b = a[d], 65535 < b && (b -= 65536, f += k(b >>> 10 & 1023 | 55296), b = 56320 | 1023 & b), f += k(b);
                                return f
                            }
                        };
                        a = function () {
                            return v
                        }.call(f, c, f, e);
                        !(void 0 !== a && (e.exports = a))
                    }(this)
                }).call(f, c(28)(e), function () {
                    return this
                }())
            }, function (e, f) {
                e.exports = function (c) {
                    return c.webpackPolyfill || (c.deprecate =
                        function () {
                        }, c.paths = [], c.children = [], c.webpackPolyfill = 1), c
                }
            }, function (e, f) {
                !function () {
                    for (var c = new Uint8Array(256), a = 0; 64 > a; a++) c["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(a)] = a;
                    f.encode = function (a) {
                        var c = new Uint8Array(a), b = c.length, g = "";
                        for (a = 0; a < b; a += 3) g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c[a] >> 2], g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(3 & c[a]) << 4 | c[a + 1] >> 4], g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(15 &
                            c[a + 1]) << 2 | c[a + 2] >> 6], g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[63 & c[a + 2]];
                        return 2 === b % 3 ? g = g.substring(0, g.length - 1) + "\x3d" : 1 === b % 3 && (g = g.substring(0, g.length - 2) + "\x3d\x3d"), g
                    };
                    f.decode = function (a) {
                        var f = .75 * a.length;
                        var b = a.length, g = 0;
                        "\x3d" === a[a.length - 1] && (f--, "\x3d" === a[a.length - 2] && f--);
                        var e = new ArrayBuffer(f), d = new Uint8Array(e);
                        for (f = 0; f < b; f += 4) {
                            var h = c[a.charCodeAt(f)];
                            var w = c[a.charCodeAt(f + 1)];
                            var u = c[a.charCodeAt(f + 2)];
                            var q = c[a.charCodeAt(f + 3)];
                            d[g++] = h <<
                                2 | w >> 4;
                            d[g++] = (15 & w) << 4 | u >> 2;
                            d[g++] = (3 & u) << 6 | 63 & q
                        }
                        return e
                    }
                }()
            }, function (e, f) {
                (function (c) {
                    function a(a) {
                        for (var b = 0; b < a.length; b++) {
                            var c = a[b];
                            if (c.buffer instanceof ArrayBuffer) {
                                var d = c.buffer;
                                if (c.byteLength !== d.byteLength) {
                                    var g = new Uint8Array(c.byteLength);
                                    g.set(new Uint8Array(d, c.byteOffset, c.byteLength));
                                    d = g.buffer
                                }
                                a[b] = d
                            }
                        }
                    }

                    function f(c, d) {
                        d = d || {};
                        var g = new b;
                        a(c);
                        for (var f = 0; f < c.length; f++) g.append(c[f]);
                        return d.type ? g.getBlob(d.type) : g.getBlob()
                    }

                    function m(b, c) {
                        return a(b), new Blob(b, c ||
                            {})
                    }

                    var b = c.BlobBuilder || c.WebKitBlobBuilder || c.MSBlobBuilder || c.MozBlobBuilder;
                    try {
                        var g = 2 === (new Blob(["hi"])).size
                    } catch (r) {
                        g = !1
                    }
                    var l;
                    if (l = g) try {
                        l = 2 === (new Blob([new Uint8Array([1, 2])])).size
                    } catch (r) {
                        l = !1
                    }
                    var d = b && b.prototype.append && b.prototype.getBlob;
                    e.exports = g ? l ? c.Blob : m : d ? f : void 0
                }).call(f, function () {
                    return this
                }())
            }, function (e, f) {
                f.encode = function (c) {
                    var a = "", f;
                    for (f in c) c.hasOwnProperty(f) && (a.length && (a += "\x26"), a += encodeURIComponent(f) + "\x3d" + encodeURIComponent(c[f]));
                    return a
                };
                f.decode =
                    function (c) {
                        var a = {};
                        c = c.split("\x26");
                        for (var f = 0, e = c.length; f < e; f++) {
                            var b = c[f].split("\x3d");
                            a[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
                        }
                        return a
                    }
            }, function (e, f) {
                e.exports = function (c, a) {
                    var f = function () {
                    };
                    f.prototype = a.prototype;
                    c.prototype = new f;
                    c.prototype.constructor = c
                }
            }, function (e, f) {
                function c(a) {
                    var c = "";
                    do c = m[a % b] + c, a = Math.floor(a / b); while (0 < a);
                    return c
                }

                function a() {
                    var a = c(+new Date);
                    return a !== h ? (l = 0, h = a) : a + "." + c(l++)
                }

                for (var h, m = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
                         b = 64, g = {}, l = 0, d = 0; d < b; d++) g[m[d]] = d;
                a.encode = c;
                a.decode = function (a) {
                    var c = 0;
                    for (d = 0; d < a.length; d++) c = c * b + g[a.charAt(d)];
                    return c
                };
                e.exports = a
            }, function (e, f, c) {
                (function (a) {
                    function f() {
                    }

                    function m(c) {
                        b.call(this, c);
                        this.query = this.query || {};
                        l || (a.___eio || (a.___eio = []), l = a.___eio);
                        this.index = l.length;
                        var d = this;
                        l.push(function (a) {
                            d.onData(a)
                        });
                        this.query.j = this.index;
                        a.document && a.addEventListener && a.addEventListener("beforeunload", function () {
                            d.script && (d.script.onerror = f)
                        }, !1)
                    }

                    var b = c(21), g = c(32);
                    e.exports = m;
                    var l, d = /\n/g, h = /\\n/g;
                    g(m, b);
                    m.prototype.supportsBinary = !1;
                    m.prototype.doClose = function () {
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
                        this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null);
                        b.prototype.doClose.call(this)
                    };
                    m.prototype.doPoll = function () {
                        var a = this, b = document.createElement("script");
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
                        b.async = !0;
                        b.src = this.uri();
                        b.onerror = function (b) {
                            a.onError("jsonp poll error",
                                b)
                        };
                        var c = document.getElementsByTagName("script")[0];
                        c ? c.parentNode.insertBefore(b, c) : (document.head || document.body).appendChild(b);
                        this.script = b;
                        "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function () {
                            var a = document.createElement("iframe");
                            document.body.appendChild(a);
                            document.body.removeChild(a)
                        }, 100)
                    };
                    m.prototype.doWrite = function (a, b) {
                        function c() {
                            g();
                            b()
                        }

                        function g() {
                            if (e.iframe) try {
                                e.form.removeChild(e.iframe)
                            } catch (E) {
                                e.onError("jsonp polling iframe removal error",
                                    E)
                            }
                            try {
                                f = document.createElement('\x3ciframe src\x3d"js:0" name\x3d"' + e.iframeId + '"\x3e')
                            } catch (E) {
                                f = document.createElement("iframe"), f.name = e.iframeId, f.src = "js:0"
                            }
                            f.id = e.iframeId;
                            e.form.appendChild(f);
                            e.iframe = f
                        }

                        var f, e = this;
                        if (!this.form) {
                            var l = document.createElement("form"), m = document.createElement("textarea"),
                                r = this.iframeId = "eio_iframe_" + this.index;
                            l.className = "socketio";
                            l.style.position = "absolute";
                            l.style.top = "-1000px";
                            l.style.left = "-1000px";
                            l.target = r;
                            l.method = "POST";
                            l.setAttribute("accept-charset",
                                "utf-8");
                            m.name = "d";
                            l.appendChild(m);
                            document.body.appendChild(l);
                            this.form = l;
                            this.area = m
                        }
                        this.form.action = this.uri();
                        g();
                        a = a.replace(h, "\\\n");
                        this.area.value = a.replace(d, "\\n");
                        try {
                            this.form.submit()
                        } catch (E) {
                        }
                        this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                            "complete" === e.iframe.readyState && c()
                        } : this.iframe.onload = c
                    }
                }).call(f, function () {
                    return this
                }())
            }, function (e, f, c) {
                (function (a) {
                    function f(a) {
                        a && a.forceBase64 && (this.supportsBinary = !1);
                        this.perMessageDeflate = a.perMessageDeflate;
                        this.usingBrowserWebSocket = n && !a.forceNode;
                        this.protocols = a.protocols;
                        this.usingBrowserWebSocket || (q = u);
                        m.call(this, a)
                    }

                    var m = c(22), b = c(23), g = c(31), l = c(32), d = c(33), h = c(3)("engine.io-client:websocket"),
                        n = a.WebSocket || a.MozWebSocket;
                    if ("undefined" == typeof window) try {
                        var u = c(36)
                    } catch (k) {
                    }
                    var q = n;
                    q || "undefined" != typeof window || (q = u);
                    e.exports = f;
                    l(f, m);
                    f.prototype.name = "websocket";
                    f.prototype.supportsBinary = !0;
                    f.prototype.doOpen = function () {
                        if (this.check()) {
                            var a = this.uri(), b = this.protocols, c = {
                                agent: this.agent,
                                perMessageDeflate: this.perMessageDeflate
                            };
                            c.pfx = this.pfx;
                            c.key = this.key;
                            c.passphrase = this.passphrase;
                            c.cert = this.cert;
                            c.ca = this.ca;
                            c.ciphers = this.ciphers;
                            c.rejectUnauthorized = this.rejectUnauthorized;
                            this.extraHeaders && (c.headers = this.extraHeaders);
                            this.localAddress && (c.localAddress = this.localAddress);
                            try {
                                this.ws = this.usingBrowserWebSocket ? b ? new q(a, b) : new q(a) : new q(a, b, c)
                            } catch (y) {
                                return this.emit("error", y)
                            }
                            void 0 === this.ws.binaryType && (this.supportsBinary = !1);
                            this.ws.supports && this.ws.supports.binary ?
                                (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer";
                            this.addEventListeners()
                        }
                    };
                    f.prototype.addEventListeners = function () {
                        var a = this;
                        this.ws.onopen = function () {
                            a.onOpen()
                        };
                        this.ws.onclose = function () {
                            a.onClose()
                        };
                        this.ws.onmessage = function (b) {
                            a.onData(b.data)
                        };
                        this.ws.onerror = function (b) {
                            a.onError("websocket error", b)
                        }
                    };
                    f.prototype.write = function (c) {
                        function d() {
                            g.emit("flush");
                            setTimeout(function () {
                                g.writable = !0;
                                g.emit("drain")
                            }, 0)
                        }

                        var g = this;
                        this.writable = !1;
                        for (var f =
                            c.length, e = 0, k = f; e < k; e++) !function (c) {
                            b.encodePacket(c, g.supportsBinary, function (b) {
                                if (!g.usingBrowserWebSocket) {
                                    var e = {};
                                    (c.options && (e.compress = c.options.compress), g.perMessageDeflate) && ("string" == typeof b ? a.Buffer.byteLength(b) : b.length) < g.perMessageDeflate.threshold && (e.compress = !1)
                                }
                                try {
                                    g.usingBrowserWebSocket ? g.ws.send(b) : g.ws.send(b, e)
                                } catch (A) {
                                    h("websocket closed before onclose event")
                                }
                                --f || d()
                            })
                        }(c[e])
                    };
                    f.prototype.onClose = function () {
                        m.prototype.onClose.call(this)
                    };
                    f.prototype.doClose = function () {
                        "undefined" !=
                        typeof this.ws && this.ws.close()
                    };
                    f.prototype.uri = function () {
                        var a = this.query || {}, b = this.secure ? "wss" : "ws", c = "";
                        this.port && ("wss" === b && 443 !== Number(this.port) || "ws" === b && 80 !== Number(this.port)) && (c = ":" + this.port);
                        this.timestampRequests && (a[this.timestampParam] = d());
                        this.supportsBinary || (a.b64 = 1);
                        a = g.encode(a);
                        a.length && (a = "?" + a);
                        var f = -1 !== this.hostname.indexOf(":");
                        return b + "://" + (f ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
                    };
                    f.prototype.check = function () {
                        return !(!q || "__initialize" in q && this.name ===
                            f.prototype.name)
                    }
                }).call(f, function () {
                    return this
                }())
            }, function (e, f) {
            }, function (e, f) {
                var c = [].indexOf;
                e.exports = function (a, f) {
                    if (c) return a.indexOf(f);
                    for (var e = 0; e < a.length; ++e) if (a[e] === f) return e;
                    return -1
                }
            }, function (e, f) {
                (function (c) {
                    var a = /^[\],:{}\s]*$/, f = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        h = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        b = /(?:^|:|,)(?:\s*\[)+/g, g = /^\s+/, l = /\s+$/;
                    e.exports = function (d) {
                        return "string" == typeof d && d ? (d = d.replace(g, "").replace(l, ""), c.JSON &&
                        JSON.parse ? JSON.parse(d) : a.test(d.replace(f, "@").replace(h, "]").replace(b, "")) ? (new Function("return " + d))() : void 0) : null
                    }
                }).call(f, function () {
                    return this
                }())
            }, function (e, f, c) {
                function a(a, b, c) {
                    this.io = a;
                    this.nsp = b;
                    this.json = this;
                    this.ids = 0;
                    this.acks = {};
                    this.receiveBuffer = [];
                    this.sendBuffer = [];
                    this.connected = !1;
                    this.disconnected = !0;
                    c && c.query && (this.query = c.query);
                    this.io.autoConnect && this.open()
                }

                $jscomp.initSymbol();
                $jscomp.initSymbol();
                $jscomp.initSymbolIterator();
                var h = "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator ? function (a) {
                    return typeof a
                } : function (a) {
                    $jscomp.initSymbol();
                    $jscomp.initSymbol();
                    $jscomp.initSymbol();
                    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
                }, m = c(7);
                f = c(8);
                var b = c(40), g = c(41), l = c(42), d = c(3)("socket.io-client:socket"), r = c(31);
                e.exports = a;
                var n = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    connecting: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1,
                    ping: 1,
                    pong: 1
                }, u = f.prototype.emit;
                f(a.prototype);
                a.prototype.subEvents = function () {
                    if (!this.subs) {
                        var a = this.io;
                        this.subs = [g(a, "open", l(this, "onopen")), g(a, "packet", l(this, "onpacket")), g(a, "close", l(this, "onclose"))]
                    }
                };
                a.prototype.open = a.prototype.connect = function () {
                    return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
                };
                a.prototype.send = function () {
                    var a = b(arguments);
                    return a.unshift("message"), this.emit.apply(this, a), this
                };
                a.prototype.emit = function (a) {
                    if (n.hasOwnProperty(a)) return u.apply(this, arguments), this;
                    var c = b(arguments), g = {type: m.EVENT, data: c};
                    return g.options = {}, g.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof c[c.length - 1] && (d("emitting packet with ack id %d", this.ids), this.acks[this.ids] = c.pop(), g.id = this.ids++), this.connected ? this.packet(g) : this.sendBuffer.push(g), delete this.flags, this
                };
                a.prototype.packet = function (a) {
                    a.nsp = this.nsp;
                    this.io.packet(a)
                };
                a.prototype.onopen = function () {
                    if (d("transport is open - connecting"),
                    "/" !== this.nsp) if (this.query) {
                        var a = "object" === h(this.query) ? r.encode(this.query) : this.query;
                        d("sending connect packet with query %s", a);
                        this.packet({type: m.CONNECT, query: a})
                    } else this.packet({type: m.CONNECT})
                };
                a.prototype.onclose = function (a) {
                    d("close (%s)", a);
                    this.connected = !1;
                    this.disconnected = !0;
                    delete this.id;
                    this.emit("disconnect", a)
                };
                a.prototype.onpacket = function (a) {
                    if (a.nsp === this.nsp) switch (a.type) {
                        case m.CONNECT:
                            this.onconnect();
                            break;
                        case m.EVENT:
                            this.onevent(a);
                            break;
                        case m.BINARY_EVENT:
                            this.onevent(a);
                            break;
                        case m.ACK:
                            this.onack(a);
                            break;
                        case m.BINARY_ACK:
                            this.onack(a);
                            break;
                        case m.DISCONNECT:
                            this.ondisconnect();
                            break;
                        case m.ERROR:
                            this.emit("error", a.data)
                    }
                };
                a.prototype.onevent = function (a) {
                    var b = a.data || [];
                    d("emitting event %j", b);
                    null != a.id && (d("attaching ack callback to event"), b.push(this.ack(a.id)));
                    this.connected ? u.apply(this, b) : this.receiveBuffer.push(b)
                };
                a.prototype.ack = function (a) {
                    var c = this, g = !1;
                    return function () {
                        if (!g) {
                            g = !0;
                            var f = b(arguments);
                            d("sending ack %j", f);
                            c.packet({
                                type: m.ACK,
                                id: a, data: f
                            })
                        }
                    }
                };
                a.prototype.onack = function (a) {
                    var b = this.acks[a.id];
                    "function" == typeof b ? (d("calling ack %s with %j", a.id, a.data), b.apply(this, a.data), delete this.acks[a.id]) : d("bad ack %s", a.id)
                };
                a.prototype.onconnect = function () {
                    this.connected = !0;
                    this.disconnected = !1;
                    this.emit("connect");
                    this.emitBuffered()
                };
                a.prototype.emitBuffered = function () {
                    var a;
                    for (a = 0; a < this.receiveBuffer.length; a++) u.apply(this, this.receiveBuffer[a]);
                    this.receiveBuffer = [];
                    for (a = 0; a < this.sendBuffer.length; a++) this.packet(this.sendBuffer[a]);
                    this.sendBuffer = []
                };
                a.prototype.ondisconnect = function () {
                    d("server disconnect (%s)", this.nsp);
                    this.destroy();
                    this.onclose("io server disconnect")
                };
                a.prototype.destroy = function () {
                    if (this.subs) {
                        for (var a = 0; a < this.subs.length; a++) this.subs[a].destroy();
                        this.subs = null
                    }
                    this.io.destroy(this)
                };
                a.prototype.close = a.prototype.disconnect = function () {
                    return this.connected && (d("performing disconnect (%s)", this.nsp), this.packet({type: m.DISCONNECT})), this.destroy(), this.connected && this.onclose("io client disconnect"),
                        this
                };
                a.prototype.compress = function (a) {
                    return this.flags = this.flags || {}, this.flags.compress = a, this
                }
            }, function (e, f) {
                e.exports = function (c, a) {
                    for (var f = [], e = (a = a || 0) || 0; e < c.length; e++) f[e - a] = c[e];
                    return f
                }
            }, function (e, f) {
                e.exports = function (c, a, f) {
                    return c.on(a, f), {
                        destroy: function () {
                            c.removeListener(a, f)
                        }
                    }
                }
            }, function (e, f) {
                var c = [].slice;
                e.exports = function (a, f) {
                    if ("string" == typeof f && (f = a[f]), "function" != typeof f) throw Error("bind() requires a function");
                    var e = c.call(arguments, 2);
                    return function () {
                        return f.apply(a,
                            e.concat(c.call(arguments)))
                    }
                }
            }, function (e, f) {
                function c(a) {
                    a = a || {};
                    this.ms = a.min || 100;
                    this.max = a.max || 1E4;
                    this.factor = a.factor || 2;
                    this.jitter = 0 < a.jitter && 1 >= a.jitter ? a.jitter : 0;
                    this.attempts = 0
                }

                e.exports = c;
                c.prototype.duration = function () {
                    var a = this.ms * Math.pow(this.factor, this.attempts++);
                    if (this.jitter) var c = Math.random(), f = Math.floor(c * this.jitter * a),
                        a = 0 == (1 & Math.floor(10 * c)) ? a - f : a + f;
                    return 0 | Math.min(a, this.max)
                };
                c.prototype.reset = function () {
                    this.attempts = 0
                };
                c.prototype.setMin = function (a) {
                    this.ms =
                        a
                };
                c.prototype.setMax = function (a) {
                    this.max = a
                };
                c.prototype.setJitter = function (a) {
                    this.jitter = a
                }
            }])
    })
}, function (n, p, h) {
    var e = h(4), f = h(23);
    p.a = function (c) {
        var a = Object(e.a)({});
        a.id = c.id;
        a.stream = c.stream.stream;
        a.elementID = c.elementID;
        var h = function () {
            a.bar.display()
        }, m = function () {
            a.bar.hide()
        }, b = function (b, c, d, f) {
            (f ? 1 / b * c > d : 1 / b * c < d) ? (a.video.style.width = c + "px", a.video.style.height = 1 / b * c + "px", a.video.style.top = -(1 / b * c / 2 - d / 2) + "px", a.video.style.left = "0px") : (a.video.style.height = d + "px", a.video.style.width =
                b * d + "px", a.video.style.left = -(b * d / 2 - c / 2) + "px", a.video.style.top = "0px")
        };
        a.destroy = function () {
            a.video.pause();
            delete a.resizer;
            a.parentNode.removeChild(a.div)
        };
        a.resize = function () {
            var g = a.container.offsetWidth, f = a.container.offsetHeight;
            c.stream.screen || !1 === c.options.crop ? b(16 / 9, g, f, !1) : g === a.containerWidth && f === a.containerHeight || b(4 / 3, g, f, !0);
            a.containerWidth = g;
            a.containerHeight = f
        };
        a.div = document.createElement("div");
        a.div.setAttribute("id", "player_" + a.id);
        a.div.setAttribute("class", "licode_player");
        a.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;");
        !1 !== c.options.loader && (a.loader = document.createElement("img"), a.loader.setAttribute("style", "width: 16px; height: 16px; position: absolute; top: 50%; left: 50%; margin-top: -8px; margin-left: -8px"), a.loader.setAttribute("id", "back_" + a.id), a.loader.setAttribute("class", "licode_loader"), a.loader.setAttribute("src", a.url + "/assets/loader.gif"));
        a.video = document.createElement("video");
        a.video.setAttribute("id", "stream" + a.id);
        a.video.setAttribute("class", "licode_stream");
        a.video.setAttribute("style", "width: 100%; height: 100%; position: absolute");
        a.video.setAttribute("autoplay", "autoplay");
        a.video.setAttribute("playsinline", "playsinline");
        c.stream.local && (a.video.volume = 0);
        a.container = void 0 !== a.elementID ? "object" === typeof a.elementID && "function" === typeof a.elementID.appendChild ? a.elementID : document.getElementById(a.elementID) : document.body;
        a.container.appendChild(a.div);
        a.parentNode =
            a.div.parentNode;
        a.loader && a.div.appendChild(a.loader);
        a.div.appendChild(a.video);
        a.containerWidth = 0;
        a.containerHeight = 0;
        !1 !== c.options.resizer && (a.resizer = L.ResizeSensor(a.container, a.resize), a.resize());
        !1 !== c.options.bar ? (a.bar = Object(f.a)({
            elementID: "player_" + a.id,
            id: a.id,
            stream: c.stream,
            media: a.video,
            options: c.options
        }), a.div.onmouseover = h, a.div.onmouseout = m) : a.media = a.video;
        a.video.srcObject = a.stream;
        return a
    }
}, function (n, p, h) {
    var e = h(4);
    p.a = function (f) {
        var c = Object(e.a)({}), a = 50;
        c.elementID =
            f.elementID;
        c.media = f.media;
        c.id = f.id;
        c.stream = f.stream;
        c.div = document.createElement("div");
        c.div.setAttribute("style", "width: 40%; height: 100%; max-width: 32px; position: absolute; right: 0;z-index:0;");
        c.icon = document.createElement("img");
        c.icon.setAttribute("id", "volume_" + c.id);
        c.icon.setAttribute("src", c.url + "/assets/sound48.png");
        c.icon.setAttribute("style", "width: 80%; height: 100%; position: absolute;");
        c.div.appendChild(c.icon);
        c.icon.onclick = function () {
            c.media.muted ? (c.media.muted = !1, c.icon.setAttribute("src",
                c.url + "/assets/sound48.png"), c.stream.local ? c.stream.stream.getAudioTracks()[0].enabled = !0 : (c.picker.value = a, c.media.volume = c.picker.value / 100)) : (c.media.muted = !0, c.icon.setAttribute("src", c.url + "/assets/mute48.png"), c.stream.local ? c.stream.stream.getAudioTracks()[0].enabled = !1 : (a = c.picker.value, c.picker.value = 0, c.media.volume = 0))
        };
        if (!c.stream.local) {
            c.picker = document.createElement("input");
            c.picker.setAttribute("id", "picker_" + c.id);
            c.picker.type = "range";
            c.picker.min = 0;
            c.picker.max = 100;
            c.picker.step =
                10;
            c.picker.value = a;
            c.picker.setAttribute("orient", "vertical");
            c.div.appendChild(c.picker);
            c.media.volume = c.picker.value / 100;
            c.media.muted = !1;
            c.picker.oninput = function () {
                0 < c.picker.value ? (c.media.muted = !1, c.icon.setAttribute("src", c.url + "/assets/sound48.png")) : (c.media.muted = !0, c.icon.setAttribute("src", c.url + "/assets/mute48.png"));
                c.media.volume = c.picker.value / 100
            };
            var h = function (a) {
                c.picker.setAttribute("style", "background: transparent; width: 32px;\n                                         height: 100px; position: absolute; bottom: 90%;\n                                         z-index: 1; right: 0px; -webkit-appearance: slider-vertical;\n                                         bottom: " +
                    c.div.offsetHeight + "px; display: " + a)
            };
            c.div.onmouseover = function () {
                h("block")
            };
            c.div.onmouseout = function () {
                h("none")
            };
            h("none")
        }
        document.getElementById(c.elementID).appendChild(c.div);
        return c
    }
}, function (n, p, h) {
    var e = h(4), f = h(23);
    p.a = function (c) {
        var a = Object(e.a)({});
        a.id = c.id;
        a.stream = c.stream.stream;
        a.elementID = c.elementID;
        a.audio = document.createElement("audio");
        a.audio.setAttribute("id", "stream" + a.id);
        a.audio.setAttribute("class", "licode_stream");
        a.audio.setAttribute("style", "width: 100%; height: 100%; position: absolute");
        a.audio.setAttribute("autoplay", "autoplay");
        c.stream.local && (a.audio.volume = 0);
        if (void 0 !== a.elementID) {
            a.destroy = function () {
                a.audio.pause();
                a.parentNode.removeChild(a.div)
            };
            var h = function () {
                a.bar.display()
            };
            var m = function () {
                a.bar.hide()
            };
            a.div = document.createElement("div");
            a.div.setAttribute("id", "player_" + a.id);
            a.div.setAttribute("class", "licode_player");
            a.div.setAttribute("style", "width: 100%; height: 100%; position: relative; overflow: hidden;");
            a.container = "object" === typeof a.elementID && "function" ===
            typeof a.elementID.appendChild ? a.elementID : document.getElementById(a.elementID);
            a.container.appendChild(a.div);
            a.parentNode = a.div.parentNode;
            a.div.appendChild(a.audio);
            !1 !== c.options.bar ? (a.bar = Object(f.a)({
                elementID: "player_" + a.id,
                id: a.id,
                stream: c.stream,
                media: a.audio,
                options: c.options
            }), a.div.onmouseover = h, a.div.onmouseout = m) : a.media = a.audio
        } else a.destroy = function () {
            a.audio.pause();
            a.parentNode.removeChild(a.audio)
        }, document.body.appendChild(a.audio), a.parentNode = document.body;
        a.audio.srcObject =
            a.stream;
        return a
    }
}, function (n, p, h) {
    n = function () {
        for (var e, f, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), a = [], h = 0; h < c.length; h += 1) a[c[h]] = h;
        var m = function () {
            if (!e || f >= e.length) return -1;
            var a = e.charCodeAt(f) & 255;
            f += 1;
            return a
        }, b = function () {
            if (!e) return -1;
            for (; ;) {
                if (f >= e.length) return -1;
                var b = e.charAt(f);
                f += 1;
                if (a[b]) return a[b];
                if ("A" === b) return 0
            }
        }, g = function (a) {
            a = a.toString(16);
            1 === a.length && (a = "0" + a);
            return unescape("%" + a)
        };
        return {
            encodeBase64: function (a) {
                var b;
                e = a;
                f = 0;
                a = "";
                var g = Array(3);
                var l = 0;
                for (b = !1; !b && -1 !== (g[0] = m());) g[1] = m(), g[2] = m(), a += c[g[0] >> 2], -1 !== g[1] ? (a += c[g[0] << 4 & 48 | g[1] >> 4], -1 !== g[2] ? (a += c[g[1] << 2 & 60 | g[2] >> 6], a += c[g[2] & 63]) : (a += c[g[1] << 2 & 60], a += "\x3d", b = !0)) : (a += c[g[0] << 4 & 48], a += "\x3d", a += "\x3d", b = !0), l += 4, 76 <= l && (a += "\n", l = 0);
                return a
            }, decodeBase64: function (a) {
                var c;
                e = a;
                f = 0;
                a = "";
                var l = Array(4);
                for (c = !1; !c && -1 !== (l[0] = b()) && -1 !== (l[1] = b());) l[2] = b(), l[3] = b(), a += g(l[0] << 2 & 255 | l[1] >> 4), -1 !== l[2] ? (a += g(l[1] << 4 & 255 | l[2] >> 2), -1 !== l[3] ? a += g(l[2] <<
                    6 & 255 | l[3]) : c = !0) : c = !0;
                return a
            }
        }
    }();
    p.a = n
}, function (n, p, h) {
    (function (e) {
        n.exports = e.adapter = h(48)
    }).call(p, h(24))
}, function (n, p, h) {
    (function (e) {
        n.exports = function () {
            return function c(a, e, h) {
                function b(d, l) {
                    if (!e[d]) {
                        if (!a[d]) {
                            if (g) return g(d, !0);
                            l = Error("Cannot find module '" + d + "'");
                            throw l.code = "MODULE_NOT_FOUND", l;
                        }
                        l = e[d] = {exports: {}};
                        a[d][0].call(l.exports, function (c) {
                            var g = a[d][1][c];
                            return b(g ? g : c)
                        }, l, l.exports, c, a, e, h)
                    }
                    return e[d].exports
                }

                for (var g = !1, l = 0; l < h.length; l++) b(h[l]);
                return b
            }({
                1: [function (c,
                              a, e) {
                    function h(a, b, c, d, g) {
                        b = r.writeRtpDescription(a.kind, b);
                        b += r.writeIceParameters(a.iceGatherer.getLocalParameters());
                        b += r.writeDtlsParameters(a.dtlsTransport.getLocalParameters(), "offer" === c ? "actpass" : g || "active");
                        b += "a\x3dmid:" + a.mid + "\r\n";
                        b = a.direction ? b + ("a\x3d" + a.direction + "\r\n") : a.rtpSender && a.rtpReceiver ? b + "a\x3dsendrecv\r\n" : a.rtpSender ? b + "a\x3dsendonly\r\n" : a.rtpReceiver ? b + "a\x3drecvonly\r\n" : b + "a\x3dinactive\r\n";
                        a.rtpSender && (c = "msid:" + d.id + " " + a.rtpSender.track.id + "\r\n", b = b + ("a\x3d" +
                            c) + ("a\x3dssrc:" + a.sendEncodingParameters[0].ssrc + " " + c), a.sendEncodingParameters[0].rtx && (b += "a\x3dssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " " + c, b += "a\x3dssrc-group:FID " + a.sendEncodingParameters[0].ssrc + " " + a.sendEncodingParameters[0].rtx.ssrc + "\r\n"));
                        b += "a\x3dssrc:" + a.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n";
                        a.rtpSender && a.sendEncodingParameters[0].rtx && (b += "a\x3dssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n");
                        return b
                    }

                    function b(a, b) {
                        var c = !1;
                        a = JSON.parse(JSON.stringify(a));
                        return a.filter(function (a) {
                            if (a && (a.urls || a.url)) {
                                var d = a.urls || a.url;
                                a.url && !a.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                                var g = "string" === typeof d;
                                g && (d = [d]);
                                d = d.filter(function (a) {
                                    return 0 !== a.indexOf("turn:") || -1 === a.indexOf("transport\x3dudp") || -1 !== a.indexOf("turn:[") || c ? 0 === a.indexOf("stun:") && 14393 <= b && -1 === a.indexOf("?transport\x3dudp") : c = !0
                                });
                                delete a.url;
                                a.urls = g ? d[0] : d;
                                return !!d.length
                            }
                            return !1
                        })
                    }

                    function g(a, b) {
                        var c = {
                            codecs: [],
                            headerExtensions: [], fecMechanisms: []
                        }, d = function (a, b) {
                            a = parseInt(a, 10);
                            for (var c = 0; c < b.length; c++) if (b[c].payloadType === a || b[c].preferredPayloadType === a) return b[c]
                        }, g = function (a, b, c, g) {
                            a = d(a.parameters.apt, c);
                            b = d(b.parameters.apt, g);
                            return a && b && a.name.toLowerCase() === b.name.toLowerCase()
                        };
                        a.codecs.forEach(function (d) {
                            for (var e = 0; e < b.codecs.length; e++) {
                                var k = b.codecs[e];
                                if (d.name.toLowerCase() === k.name.toLowerCase() && d.clockRate === k.clockRate && ("rtx" !== d.name.toLowerCase() || !d.parameters || !k.parameters.apt ||
                                    g(d, k, a.codecs, b.codecs))) {
                                    k = JSON.parse(JSON.stringify(k));
                                    k.numChannels = Math.min(d.numChannels, k.numChannels);
                                    c.codecs.push(k);
                                    k.rtcpFeedback = k.rtcpFeedback.filter(function (a) {
                                        for (var b = 0; b < d.rtcpFeedback.length; b++) if (d.rtcpFeedback[b].type === a.type && d.rtcpFeedback[b].parameter === a.parameter) return !0;
                                        return !1
                                    });
                                    break
                                }
                            }
                        });
                        a.headerExtensions.forEach(function (a) {
                            for (var d = 0; d < b.headerExtensions.length; d++) {
                                var g = b.headerExtensions[d];
                                if (a.uri === g.uri) {
                                    c.headerExtensions.push(g);
                                    break
                                }
                            }
                        });
                        return c
                    }

                    function l(a, b, c) {
                        return -1 !== {
                            offer: {
                                setLocalDescription: ["stable", "have-local-offer"],
                                setRemoteDescription: ["stable", "have-remote-offer"]
                            },
                            answer: {
                                setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                                setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
                            }
                        }[b][a].indexOf(c)
                    }

                    function d(a, b) {
                        var c = a.getRemoteCandidates().find(function (a) {
                            return b.foundation === a.foundation && b.ip === a.ip && b.port === a.port && b.priority === a.priority && b.protocol === a.protocol && b.type === a.type
                        });
                        c || a.addRemoteCandidate(b);
                        return !c
                    }

                    var r = c("sdp");
                    a.exports = function (a, c) {
                        var e = function (d) {
                            var g = this, e = document.createDocumentFragment();
                            ["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function (a) {
                                g[a] = e[a].bind(e)
                            });
                            this.canTrickleIceCandidates = this.ondatachannel = this.onnegotiationneeded = this.onicegatheringstatechange = this.oniceconnectionstatechange = this.onsignalingstatechange = this.onremovestream = this.ontrack = this.onaddstream = this.onicecandidate = null;
                            this.needNegotiation = !1;
                            this.localStreams = [];
                            this.remoteStreams =
                                [];
                            this.remoteDescription = this.localDescription = null;
                            this.signalingState = "stable";
                            this.iceGatheringState = this.iceConnectionState = "new";
                            d = JSON.parse(JSON.stringify(d || {}));
                            this.usingBundle = "max-bundle" === d.bundlePolicy;
                            if ("negotiate" === d.rtcpMuxPolicy) throw d = Error("rtcpMuxPolicy 'negotiate' is not supported"), d.name = "NotSupportedError", d;
                            d.rtcpMuxPolicy || (d.rtcpMuxPolicy = "require");
                            switch (d.iceTransportPolicy) {
                                case "all":
                                case "relay":
                                    break;
                                default:
                                    d.iceTransportPolicy = "all"
                            }
                            switch (d.bundlePolicy) {
                                case "balanced":
                                case "max-compat":
                                case "max-bundle":
                                    break;
                                default:
                                    d.bundlePolicy = "balanced"
                            }
                            d.iceServers = b(d.iceServers || [], c);
                            this._iceGatherers = [];
                            if (d.iceCandidatePoolSize) for (var k = d.iceCandidatePoolSize; 0 < k; k--) this._iceGatherers = new a.RTCIceGatherer({
                                iceServers: d.iceServers,
                                gatherPolicy: d.iceTransportPolicy
                            }); else d.iceCandidatePoolSize = 0;
                            this._config = d;
                            this.transceivers = [];
                            this._sdpSessionId = r.generateSessionId();
                            this._sdpSessionVersion = 0;
                            this._dtlsRole = void 0
                        };
                        e.prototype._emitGatheringStateChange = function () {
                            var a = new Event("icegatheringstatechange");
                            this.dispatchEvent(a);
                            if ("function" === typeof this.onicegatheringstatechange) this.onicegatheringstatechange(a)
                        };
                        e.prototype.getConfiguration = function () {
                            return this._config
                        };
                        e.prototype.getLocalStreams = function () {
                            return this.localStreams
                        };
                        e.prototype.getRemoteStreams = function () {
                            return this.remoteStreams
                        };
                        e.prototype._createTransceiver = function (a) {
                            var b = 0 < this.transceivers.length;
                            a = {
                                track: null,
                                iceGatherer: null,
                                iceTransport: null,
                                dtlsTransport: null,
                                localCapabilities: null,
                                remoteCapabilities: null,
                                rtpSender: null,
                                rtpReceiver: null,
                                kind: a,
                                mid: null,
                                sendEncodingParameters: null,
                                recvEncodingParameters: null,
                                stream: null,
                                wantReceive: !0
                            };
                            this.usingBundle && b ? (a.iceTransport = this.transceivers[0].iceTransport, a.dtlsTransport = this.transceivers[0].dtlsTransport) : (b = this._createIceAndDtlsTransports(), a.iceTransport = b.iceTransport, a.dtlsTransport = b.dtlsTransport);
                            this.transceivers.push(a);
                            return a
                        };
                        e.prototype.addTrack = function (b, c) {
                            for (var d, g = 0; g < this.transceivers.length; g++) this.transceivers[g].track || this.transceivers[g].kind !==
                            b.kind || (d = this.transceivers[g]);
                            d || (d = this._createTransceiver(b.kind));
                            this._maybeFireNegotiationNeeded();
                            -1 === this.localStreams.indexOf(c) && this.localStreams.push(c);
                            d.track = b;
                            d.stream = c;
                            d.rtpSender = new a.RTCRtpSender(b, d.dtlsTransport);
                            return d.rtpSender
                        };
                        e.prototype.addStream = function (a) {
                            var b = this;
                            if (15025 <= c) a.getTracks().forEach(function (c) {
                                b.addTrack(c, a)
                            }); else {
                                var d = a.clone();
                                a.getTracks().forEach(function (a, b) {
                                    var c = d.getTracks()[b];
                                    a.addEventListener("enabled", function (a) {
                                        c.enabled = a.enabled
                                    })
                                });
                                d.getTracks().forEach(function (a) {
                                    b.addTrack(a, d)
                                })
                            }
                        };
                        e.prototype.removeStream = function (a) {
                            a = this.localStreams.indexOf(a);
                            -1 < a && (this.localStreams.splice(a, 1), this._maybeFireNegotiationNeeded())
                        };
                        e.prototype.getSenders = function () {
                            return this.transceivers.filter(function (a) {
                                return !!a.rtpSender
                            }).map(function (a) {
                                return a.rtpSender
                            })
                        };
                        e.prototype.getReceivers = function () {
                            return this.transceivers.filter(function (a) {
                                return !!a.rtpReceiver
                            }).map(function (a) {
                                return a.rtpReceiver
                            })
                        };
                        e.prototype._createIceGatherer =
                            function (b, c) {
                                var d = this;
                                if (c && 0 < b) return this.transceivers[0].iceGatherer;
                                if (this._iceGatherers.length) return this._iceGatherers.shift();
                                var g = new a.RTCIceGatherer({
                                    iceServers: this._config.iceServers,
                                    gatherPolicy: this._config.iceTransportPolicy
                                });
                                Object.defineProperty(g, "state", {value: "new", writable: !0});
                                this.transceivers[b].candidates = [];
                                this.transceivers[b].bufferCandidates = function (a) {
                                    var c = !a.candidate || 0 === Object.keys(a.candidate).length;
                                    g.state = c ? "completed" : "gathering";
                                    null !== d.transceivers[b].candidates &&
                                    d.transceivers[b].candidates.push(a.candidate)
                                };
                                g.addEventListener("localcandidate", this.transceivers[b].bufferCandidates);
                                return g
                            };
                        e.prototype._gather = function (b, c) {
                            var d = this, g = this.transceivers[c].iceGatherer;
                            if (!g.onlocalcandidate) {
                                var e = this.transceivers[c].candidates;
                                this.transceivers[c].candidates = null;
                                g.removeEventListener("localcandidate", this.transceivers[c].bufferCandidates);
                                g.onlocalcandidate = function (a) {
                                    if (!(d.usingBundle && 0 < c)) {
                                        var e = new Event("icecandidate");
                                        e.candidate = {
                                            sdpMid: b,
                                            sdpMLineIndex: c
                                        };
                                        var k = a.candidate;
                                        if (a = !k || 0 === Object.keys(k).length) {
                                            if ("new" === g.state || "gathering" === g.state) g.state = "completed"
                                        } else "new" === g.state && (g.state = "gathering"), k.component = 1, e.candidate.candidate = r.writeCandidate(k);
                                        k = r.splitSections(d.localDescription.sdp);
                                        k[e.candidate.sdpMLineIndex + 1] = a ? k[e.candidate.sdpMLineIndex + 1] + "a\x3dend-of-candidates\r\n" : k[e.candidate.sdpMLineIndex + 1] + ("a\x3d" + e.candidate.candidate + "\r\n");
                                        d.localDescription.sdp = k.join("");
                                        k = d.transceivers.every(function (a) {
                                            return a.iceGatherer &&
                                                "completed" === a.iceGatherer.state
                                        });
                                        "gathering" !== d.iceGatheringState && (d.iceGatheringState = "gathering", d._emitGatheringStateChange());
                                        if (!a && (d.dispatchEvent(e), "function" === typeof d.onicecandidate)) d.onicecandidate(e);
                                        if (k) {
                                            d.dispatchEvent(new Event("icecandidate"));
                                            if ("function" === typeof d.onicecandidate) d.onicecandidate(new Event("icecandidate"));
                                            d.iceGatheringState = "complete";
                                            d._emitGatheringStateChange()
                                        }
                                    }
                                };
                                a.setTimeout(function () {
                                    e.forEach(function (a) {
                                        var b = new Event("RTCIceGatherEvent");
                                        b.candidate =
                                            a;
                                        g.onlocalcandidate(b)
                                    })
                                }, 0)
                            }
                        };
                        e.prototype._createIceAndDtlsTransports = function () {
                            var b = this, c = new a.RTCIceTransport(null);
                            c.onicestatechange = function () {
                                b._updateConnectionState()
                            };
                            var d = new a.RTCDtlsTransport(c);
                            d.ondtlsstatechange = function () {
                                b._updateConnectionState()
                            };
                            d.onerror = function () {
                                Object.defineProperty(d, "state", {value: "failed", writable: !0});
                                b._updateConnectionState()
                            };
                            return {iceTransport: c, dtlsTransport: d}
                        };
                        e.prototype._disposeIceAndDtlsTransports = function (a) {
                            var b = this.transceivers[a].iceGatherer;
                            b && (delete b.onlocalcandidate, delete this.transceivers[a].iceGatherer);
                            if (b = this.transceivers[a].iceTransport) delete b.onicestatechange, delete this.transceivers[a].iceTransport;
                            if (b = this.transceivers[a].dtlsTransport) delete b.ondtlsstatechange, delete b.onerror, delete this.transceivers[a].dtlsTransport
                        };
                        e.prototype._transceive = function (a, b, d) {
                            var e = g(a.localCapabilities, a.remoteCapabilities);
                            b && a.rtpSender && (e.encodings = a.sendEncodingParameters, e.rtcp = {
                                cname: r.localCName,
                                compound: a.rtcpParameters.compound
                            },
                            a.recvEncodingParameters.length && (e.rtcp.ssrc = a.recvEncodingParameters[0].ssrc), a.rtpSender.send(e));
                            d && a.rtpReceiver && 0 < e.codecs.length && ("video" === a.kind && a.recvEncodingParameters && 15019 > c && a.recvEncodingParameters.forEach(function (a) {
                                delete a.rtx
                            }), e.encodings = a.recvEncodingParameters, e.rtcp = {
                                cname: a.rtcpParameters.cname,
                                compound: a.rtcpParameters.compound
                            }, a.sendEncodingParameters.length && (e.rtcp.ssrc = a.sendEncodingParameters[0].ssrc), a.rtpReceiver.receive(e))
                        };
                        e.prototype.setLocalDescription =
                            function (a) {
                                var b = this, c = arguments;
                                if (!l("setLocalDescription", a.type, this.signalingState)) return new Promise(function (d, g) {
                                    d = Error("Can not set local " + a.type + " in state " + b.signalingState);
                                    d.name = "InvalidStateError";
                                    2 < c.length && "function" === typeof c[2] && c[2].apply(null, [d]);
                                    g(d)
                                });
                                if ("offer" === a.type) {
                                    var d = r.splitSections(a.sdp);
                                    var e = d.shift();
                                    d.forEach(function (a, c) {
                                        a = r.parseRtpParameters(a);
                                        b.transceivers[c].localCapabilities = a
                                    });
                                    this.transceivers.forEach(function (a, c) {
                                        b._gather(a.mid, c)
                                    })
                                } else if ("answer" ===
                                    a.type) {
                                    d = r.splitSections(b.remoteDescription.sdp);
                                    e = d.shift();
                                    var k = 0 < r.matchPrefix(e, "a\x3dice-lite").length;
                                    d.forEach(function (a, c) {
                                        var d = b.transceivers[c], l = d.iceGatherer, h = d.iceTransport,
                                            m = d.dtlsTransport, v = d.localCapabilities, q = d.remoteCapabilities;
                                        if (!(r.isRejected(a) && 1 === !r.matchPrefix(a, "a\x3dbundle-only").length || d.isDatachannel)) {
                                            var n = r.getIceParameters(a, e);
                                            a = r.getDtlsParameters(a, e);
                                            k && (a.role = "server");
                                            b.usingBundle && 0 !== c || (b._gather(d.mid, c), "new" === h.state && h.start(l, n, k ? "controlling" :
                                                "controlled"), "new" === m.state && m.start(a));
                                            c = g(v, q);
                                            b._transceive(d, 0 < c.codecs.length, !1)
                                        }
                                    })
                                }
                                this.localDescription = {type: a.type, sdp: a.sdp};
                                switch (a.type) {
                                    case "offer":
                                        this._updateSignalingState("have-local-offer");
                                        break;
                                    case "answer":
                                        this._updateSignalingState("stable");
                                        break;
                                    default:
                                        throw new TypeError('unsupported type "' + a.type + '"');
                                }
                                var h = 1 < arguments.length && "function" === typeof arguments[1] && arguments[1];
                                return new Promise(function (a) {
                                    h && h.apply(null);
                                    a()
                                })
                            };
                        e.prototype.setRemoteDescription = function (b) {
                            var g =
                                this, e = arguments;
                            if (!l("setRemoteDescription", b.type, this.signalingState)) return new Promise(function (a, c) {
                                a = Error("Can not set remote " + b.type + " in state " + g.signalingState);
                                a.name = "InvalidStateError";
                                2 < e.length && "function" === typeof e[2] && e[2].apply(null, [a]);
                                c(a)
                            });
                            var k = {};
                            this.remoteStreams.forEach(function (a) {
                                k[a.id] = a
                            });
                            var h = [], m = r.splitSections(b.sdp), q = m.shift(),
                                n = 0 < r.matchPrefix(q, "a\x3dice-lite").length,
                                u = 0 < r.matchPrefix(q, "a\x3dgroup:BUNDLE ").length;
                            this.usingBundle = u;
                            var p = r.matchPrefix(q,
                                "a\x3dice-options:")[0];
                            this.canTrickleIceCandidates = p ? 0 <= p.substr(14).split(" ").indexOf("trickle") : !1;
                            m.forEach(function (e, l) {
                                var m = r.splitLines(e), v = r.getKind(e),
                                    x = r.isRejected(e) && 1 === !r.matchPrefix(e, "a\x3dbundle-only").length,
                                    m = m[0].substr(2).split(" ")[2], p = r.getDirection(e, q), y = r.parseMsid(e),
                                    t = r.getMid(e) || r.generateIdentifier();
                                if ("application" === v && "DTLS/SCTP" === m) g.transceivers[l] = {
                                    mid: t,
                                    isDatachannel: !0
                                }; else {
                                    var C = r.parseRtpParameters(e);
                                    if (!x) {
                                        var w = r.getIceParameters(e, q);
                                        var B = r.getDtlsParameters(e,
                                            q);
                                        B.role = "client"
                                    }
                                    var m = r.parseRtpEncodingParameters(e), E = r.parseRtcpParameters(e),
                                        F = 0 < r.matchPrefix(e, "a\x3dend-of-candidates", q).length,
                                        z = r.matchPrefix(e, "a\x3dcandidate:").map(function (a) {
                                            return r.parseCandidate(a)
                                        }).filter(function (a) {
                                            return 1 === a.component
                                        });
                                    ("offer" === b.type || "answer" === b.type) && !x && u && 0 < l && g.transceivers[l] && (g._disposeIceAndDtlsTransports(l), g.transceivers[l].iceGatherer = g.transceivers[0].iceGatherer, g.transceivers[l].iceTransport = g.transceivers[0].iceTransport, g.transceivers[l].dtlsTransport =
                                        g.transceivers[0].dtlsTransport, g.transceivers[l].rtpSender && g.transceivers[l].rtpSender.setTransport(g.transceivers[0].dtlsTransport), g.transceivers[l].rtpReceiver && g.transceivers[l].rtpReceiver.setTransport(g.transceivers[0].dtlsTransport));
                                    if ("offer" === b.type && !x) {
                                        var A = g.transceivers[l] || g._createTransceiver(v);
                                        A.mid = t;
                                        A.iceGatherer || (A.iceGatherer = g._createIceGatherer(l, u));
                                        z.length && "new" === A.iceTransport.state && (!F || u && 0 !== l ? z.forEach(function (a) {
                                            d(A.iceTransport, a)
                                        }) : A.iceTransport.setRemoteCandidates(z));
                                        e = a.RTCRtpReceiver.getCapabilities(v);
                                        15019 > c && (e.codecs = e.codecs.filter(function (a) {
                                            return "rtx" !== a.name
                                        }));
                                        x = A.sendEncodingParameters || [{ssrc: 1001 * (2 * l + 2)}];
                                        w = !1;
                                        if ("sendrecv" === p || "sendonly" === p) {
                                            w = !A.rtpReceiver;
                                            var D = A.rtpReceiver || new a.RTCRtpReceiver(A.dtlsTransport, v);
                                            w && (p = D.track, y ? (k[y.stream] || (k[y.stream] = new a.MediaStream, Object.defineProperty(k[y.stream], "id", {
                                                get: function () {
                                                    return y.stream
                                                }
                                            })), Object.defineProperty(p, "id", {
                                                get: function () {
                                                    return y.track
                                                }
                                            }), B = k[y.stream]) : (k.default ||
                                            (k.default = new a.MediaStream), B = k.default), B.addTrack(p), h.push([p, D, B]))
                                        }
                                        A.localCapabilities = e;
                                        A.remoteCapabilities = C;
                                        A.rtpReceiver = D;
                                        A.rtcpParameters = E;
                                        A.sendEncodingParameters = x;
                                        A.recvEncodingParameters = m;
                                        g._transceive(g.transceivers[l], !1, w)
                                    } else if ("answer" === b.type && !x) {
                                        A = g.transceivers[l];
                                        v = A.iceGatherer;
                                        t = A.iceTransport;
                                        var G = A.dtlsTransport;
                                        D = A.rtpReceiver;
                                        x = A.sendEncodingParameters;
                                        e = A.localCapabilities;
                                        g.transceivers[l].recvEncodingParameters = m;
                                        g.transceivers[l].remoteCapabilities = C;
                                        g.transceivers[l].rtcpParameters =
                                            E;
                                        z.length && "new" === t.state && (!n && !F || u && 0 !== l ? z.forEach(function (a) {
                                            d(A.iceTransport, a)
                                        }) : t.setRemoteCandidates(z));
                                        u && 0 !== l || ("new" === t.state && t.start(v, w, "controlling"), "new" === G.state && G.start(B));
                                        g._transceive(A, "sendrecv" === p || "recvonly" === p, "sendrecv" === p || "sendonly" === p);
                                        !D || "sendrecv" !== p && "sendonly" !== p ? delete A.rtpReceiver : (p = D.track, y ? (k[y.stream] || (k[y.stream] = new a.MediaStream), k[y.stream].addTrack(p), h.push([p, D, k[y.stream]])) : (k.default || (k.default = new a.MediaStream), k.default.addTrack(p),
                                            h.push([p, D, k.default])))
                                    }
                                }
                            });
                            void 0 === this._dtlsRole && (this._dtlsRole = "offer" === b.type ? "active" : "passive");
                            this.remoteDescription = {type: b.type, sdp: b.sdp};
                            switch (b.type) {
                                case "offer":
                                    this._updateSignalingState("have-remote-offer");
                                    break;
                                case "answer":
                                    this._updateSignalingState("stable");
                                    break;
                                default:
                                    throw new TypeError('unsupported type "' + b.type + '"');
                            }
                            Object.keys(k).forEach(function (b) {
                                var c = k[b];
                                if (c.getTracks().length) {
                                    if (-1 === g.remoteStreams.indexOf(c)) {
                                        g.remoteStreams.push(c);
                                        var d = new Event("addstream");
                                        d.stream = c;
                                        a.setTimeout(function () {
                                            g.dispatchEvent(d);
                                            if ("function" === typeof g.onaddstream) g.onaddstream(d)
                                        })
                                    }
                                    h.forEach(function (b) {
                                        var d = b[0], e = b[1];
                                        if (c.id === b[2].id) {
                                            var k = new Event("track");
                                            k.track = d;
                                            k.receiver = e;
                                            k.transceiver = {receiver: e};
                                            k.streams = [c];
                                            a.setTimeout(function () {
                                                g.dispatchEvent(k);
                                                if ("function" === typeof g.ontrack) g.ontrack(k)
                                            })
                                        }
                                    })
                                }
                            });
                            a.setTimeout(function () {
                                g && g.transceivers && g.transceivers.forEach(function (a) {
                                    a.iceTransport && "new" === a.iceTransport.state && 0 < a.iceTransport.getRemoteCandidates().length &&
                                    (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), a.iceTransport.addRemoteCandidate({}))
                                })
                            }, 4E3);
                            return new Promise(function (a) {
                                1 < e.length && "function" === typeof e[1] && e[1].apply(null);
                                a()
                            })
                        };
                        e.prototype.close = function () {
                            this.transceivers.forEach(function (a) {
                                a.iceTransport && a.iceTransport.stop();
                                a.dtlsTransport && a.dtlsTransport.stop();
                                a.rtpSender && a.rtpSender.stop();
                                a.rtpReceiver && a.rtpReceiver.stop()
                            });
                            this._updateSignalingState("closed")
                        };
                        e.prototype._updateSignalingState =
                            function (a) {
                                this.signalingState = a;
                                a = new Event("signalingstatechange");
                                this.dispatchEvent(a);
                                if ("function" === typeof this.onsignalingstatechange) this.onsignalingstatechange(a)
                            };
                        e.prototype._maybeFireNegotiationNeeded = function () {
                            var b = this;
                            "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, a.setTimeout(function () {
                                    if (!1 !== b.needNegotiation) {
                                        b.needNegotiation = !1;
                                        var a = new Event("negotiationneeded");
                                        b.dispatchEvent(a);
                                        if ("function" === typeof b.onnegotiationneeded) b.onnegotiationneeded(a)
                                    }
                                },
                                0))
                        };
                        e.prototype._updateConnectionState = function () {
                            var a = {
                                "new": 0,
                                closed: 0,
                                connecting: 0,
                                checking: 0,
                                connected: 0,
                                completed: 0,
                                disconnected: 0,
                                failed: 0
                            };
                            this.transceivers.forEach(function (b) {
                                a[b.iceTransport.state]++;
                                a[b.dtlsTransport.state]++
                            });
                            a.connected += a.completed;
                            var b = "new";
                            if (0 < a.failed) b = "failed"; else if (0 < a.connecting || 0 < a.checking) b = "connecting"; else if (0 < a.disconnected) b = "disconnected"; else if (0 < a.new) b = "new"; else if (0 < a.connected || 0 < a.completed) b = "connected";
                            if (b !== this.iceConnectionState &&
                                (this.iceConnectionState = b, b = new Event("iceconnectionstatechange"), this.dispatchEvent(b), "function" === typeof this.oniceconnectionstatechange)) this.oniceconnectionstatechange(b)
                        };
                        e.prototype.createOffer = function () {
                            var b = this, d = arguments, g;
                            1 === arguments.length && "function" !== typeof arguments[0] ? g = arguments[0] : 3 === arguments.length && (g = arguments[2]);
                            var e = this.transceivers.filter(function (a) {
                                return "audio" === a.kind
                            }).length, l = this.transceivers.filter(function (a) {
                                return "video" === a.kind
                            }).length;
                            if (g) {
                                if (g.mandatory ||
                                    g.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                                void 0 !== g.offerToReceiveAudio && (e = !0 === g.offerToReceiveAudio ? 1 : !1 === g.offerToReceiveAudio ? 0 : g.offerToReceiveAudio);
                                void 0 !== g.offerToReceiveVideo && (l = !0 === g.offerToReceiveVideo ? 1 : !1 === g.offerToReceiveVideo ? 0 : g.offerToReceiveVideo)
                            }
                            for (this.transceivers.forEach(function (a) {
                                "audio" === a.kind ? (e--, 0 > e && (a.wantReceive = !1)) : "video" === a.kind && (l--, 0 > l && (a.wantReceive = !1))
                            }); 0 < e || 0 < l;) 0 < e && (this._createTransceiver("audio"),
                                e--), 0 < l && (this._createTransceiver("video"), l--);
                            var m = r.writeSessionBoilerplate(this._sdpSessionId, this._sdpSessionVersion++);
                            this.transceivers.forEach(function (d, g) {
                                var e = d.track, k = d.kind, l = r.generateIdentifier();
                                d.mid = l;
                                d.iceGatherer || (d.iceGatherer = b._createIceGatherer(g, b.usingBundle));
                                l = a.RTCRtpSender.getCapabilities(k);
                                15019 > c && (l.codecs = l.codecs.filter(function (a) {
                                    return "rtx" !== a.name
                                }));
                                l.codecs.forEach(function (a) {
                                    "H264" === a.name && void 0 === a.parameters["level-asymmetry-allowed"] && (a.parameters["level-asymmetry-allowed"] =
                                        "1")
                                });
                                g = d.sendEncodingParameters || [{ssrc: 1001 * (2 * g + 1)}];
                                e && 15019 <= c && "video" === k && !g[0].rtx && (g[0].rtx = {ssrc: g[0].ssrc + 1});
                                d.wantReceive && (d.rtpReceiver = new a.RTCRtpReceiver(d.dtlsTransport, k));
                                d.localCapabilities = l;
                                d.sendEncodingParameters = g
                            });
                            "max-compat" !== this._config.bundlePolicy && (m += "a\x3dgroup:BUNDLE " + this.transceivers.map(function (a) {
                                return a.mid
                            }).join(" ") + "\r\n");
                            m += "a\x3dice-options:trickle\r\n";
                            this.transceivers.forEach(function (a, c) {
                                m += h(a, a.localCapabilities, "offer", a.stream, b._dtlsRole);
                                m += "a\x3drtcp-rsize\r\n";
                                !a.iceGatherer || "new" === b.iceGatheringState || 0 !== c && b.usingBundle || (a.iceGatherer.getLocalCandidates().forEach(function (a) {
                                    a.component = 1;
                                    m += "a\x3d" + r.writeCandidate(a) + "\r\n"
                                }), "completed" === a.iceGatherer.state && (m += "a\x3dend-of-candidates\r\n"))
                            });
                            var q = new a.RTCSessionDescription({type: "offer", sdp: m});
                            return new Promise(function (a) {
                                0 < d.length && "function" === typeof d[0] ? (d[0].apply(null, [q]), a()) : a(q)
                            })
                        };
                        e.prototype.createAnswer = function () {
                            var b = this, d = arguments, e = r.writeSessionBoilerplate(this._sdpSessionId,
                                this._sdpSessionVersion++);
                            this.usingBundle && (e += "a\x3dgroup:BUNDLE " + this.transceivers.map(function (a) {
                                return a.mid
                            }).join(" ") + "\r\n");
                            var l = r.splitSections(this.remoteDescription.sdp).length - 1;
                            this.transceivers.forEach(function (a, d) {
                                if (!(d + 1 > l)) if (a.isDatachannel) e += "m\x3dapplication 0 DTLS/SCTP 5000\r\nc\x3dIN IP4 0.0.0.0\r\na\x3dmid:" + a.mid + "\r\n"; else {
                                    if (a.stream) {
                                        var k;
                                        "audio" === a.kind ? k = a.stream.getAudioTracks()[0] : "video" === a.kind && (k = a.stream.getVideoTracks()[0]);
                                        k && 15019 <= c && "video" ===
                                        a.kind && !a.sendEncodingParameters[0].rtx && (a.sendEncodingParameters[0].rtx = {ssrc: a.sendEncodingParameters[0].ssrc + 1})
                                    }
                                    d = g(a.localCapabilities, a.remoteCapabilities);
                                    !d.codecs.filter(function (a) {
                                        return "rtx" === a.name.toLowerCase()
                                    }).length && a.sendEncodingParameters[0].rtx && delete a.sendEncodingParameters[0].rtx;
                                    e += h(a, d, "answer", a.stream, b._dtlsRole);
                                    a.rtcpParameters && a.rtcpParameters.reducedSize && (e += "a\x3drtcp-rsize\r\n")
                                }
                            });
                            var m = new a.RTCSessionDescription({type: "answer", sdp: e});
                            return new Promise(function (a) {
                                0 <
                                d.length && "function" === typeof d[0] ? (d[0].apply(null, [m]), a()) : a(m)
                            })
                        };
                        e.prototype.addIceCandidate = function (a) {
                            var b;
                            if (a && "" !== a.candidate) if (void 0 !== a.sdpMLineIndex || a.sdpMid) if (this.remoteDescription) {
                                var c = a.sdpMLineIndex;
                                if (a.sdpMid) for (b = 0; b < this.transceivers.length; b++) if (this.transceivers[b].mid === a.sdpMid) {
                                    c = b;
                                    break
                                }
                                if (b = this.transceivers[c]) {
                                    if (b.isDatachannel) return Promise.resolve();
                                    var g = 0 < Object.keys(a.candidate).length ? r.parseCandidate(a.candidate) : {};
                                    if ("tcp" === g.protocol && (0 === g.port ||
                                        9 === g.port) || g.component && 1 !== g.component) return Promise.resolve();
                                    if ((0 === c || 0 < c && b.iceTransport !== this.transceivers[0].iceTransport) && !d(b.iceTransport, g)) {
                                        var e = Error("Can not add ICE candidate");
                                        e.name = "OperationError"
                                    }
                                    if (!e) {
                                        var k = a.candidate.trim();
                                        0 === k.indexOf("a\x3d") && (k = k.substr(2));
                                        b = r.splitSections(this.remoteDescription.sdp);
                                        b[c + 1] += "a\x3d" + (g.type ? k : "end-of-candidates") + "\r\n";
                                        this.remoteDescription.sdp = b.join("")
                                    }
                                } else e = Error("Can not add ICE candidate"), e.name = "OperationError"
                            } else e =
                                Error("Can not add ICE candidate without a remote description"), e.name = "InvalidStateError"; else throw new TypeError("sdpMLineIndex or sdpMid required"); else for (c = 0; c < this.transceivers.length && (this.transceivers[c].isDatachannel || (this.transceivers[c].iceTransport.addRemoteCandidate({}), b = r.splitSections(this.remoteDescription.sdp), b[c + 1] += "a\x3dend-of-candidates\r\n", this.remoteDescription.sdp = b.join(""), !this.usingBundle)); c++) ;
                            var l = arguments;
                            return new Promise(function (a, b) {
                                e ? (2 < l.length && "function" ===
                                typeof l[2] && l[2].apply(null, [e]), b(e)) : (1 < l.length && "function" === typeof l[1] && l[1].apply(null), a())
                            })
                        };
                        e.prototype.getStats = function () {
                            var a = [];
                            this.transceivers.forEach(function (b) {
                                ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (c) {
                                    b[c] && a.push(b[c].getStats())
                                })
                            });
                            var b = 1 < arguments.length && "function" === typeof arguments[1] && arguments[1];
                            return new Promise(function (c) {
                                var d = new Map;
                                Promise.all(a).then(function (a) {
                                    a.forEach(function (a) {
                                        Object.keys(a).forEach(function (b) {
                                            var c =
                                                a[b];
                                            a[b].type = {
                                                inboundrtp: "inbound-rtp",
                                                outboundrtp: "outbound-rtp",
                                                candidatepair: "candidate-pair",
                                                localcandidate: "local-candidate",
                                                remotecandidate: "remote-candidate"
                                            }[c.type] || c.type;
                                            d.set(b, a[b])
                                        })
                                    });
                                    b && b.apply(null, d);
                                    c(d)
                                })
                            })
                        };
                        return e
                    }
                }, {sdp: 2}], 2: [function (c, a, e) {
                    var h = {
                        generateIdentifier: function () {
                            return Math.random().toString(36).substr(2, 10)
                        }
                    };
                    h.localCName = h.generateIdentifier();
                    h.splitLines = function (a) {
                        return a.trim().split("\n").map(function (a) {
                            return a.trim()
                        })
                    };
                    h.splitSections = function (a) {
                        return a.split("\nm\x3d").map(function (a,
                                                                b) {
                            return (0 < b ? "m\x3d" + a : a).trim() + "\r\n"
                        })
                    };
                    h.matchPrefix = function (a, c) {
                        return h.splitLines(a).filter(function (a) {
                            return 0 === a.indexOf(c)
                        })
                    };
                    h.parseCandidate = function (a) {
                        a = 0 === a.indexOf("a\x3dcandidate:") ? a.substring(12).split(" ") : a.substring(10).split(" ");
                        for (var b = {
                            foundation: a[0],
                            component: parseInt(a[1], 10),
                            protocol: a[2].toLowerCase(),
                            priority: parseInt(a[3], 10),
                            ip: a[4],
                            port: parseInt(a[5], 10),
                            type: a[7]
                        }, c = 8; c < a.length; c += 2) switch (a[c]) {
                            case "raddr":
                                b.relatedAddress = a[c + 1];
                                break;
                            case "rport":
                                b.relatedPort =
                                    parseInt(a[c + 1], 10);
                                break;
                            case "tcptype":
                                b.tcpType = a[c + 1];
                                break;
                            case "ufrag":
                                b.ufrag = a[c + 1];
                                b.usernameFragment = a[c + 1];
                                break;
                            default:
                                b[a[c]] = a[c + 1]
                        }
                        return b
                    };
                    h.writeCandidate = function (a) {
                        var b = [];
                        b.push(a.foundation);
                        b.push(a.component);
                        b.push(a.protocol.toUpperCase());
                        b.push(a.priority);
                        b.push(a.ip);
                        b.push(a.port);
                        var c = a.type;
                        b.push("typ");
                        b.push(c);
                        "host" !== c && a.relatedAddress && a.relatedPort && (b.push("raddr"), b.push(a.relatedAddress), b.push("rport"), b.push(a.relatedPort));
                        a.tcpType && "tcp" === a.protocol.toLowerCase() &&
                        (b.push("tcptype"), b.push(a.tcpType));
                        a.ufrag && (b.push("ufrag"), b.push(a.ufrag));
                        return "candidate:" + b.join(" ")
                    };
                    h.parseIceOptions = function (a) {
                        return a.substr(14).split(" ")
                    };
                    h.parseRtpMap = function (a) {
                        a = a.substr(9).split(" ");
                        var b = {payloadType: parseInt(a.shift(), 10)};
                        a = a[0].split("/");
                        b.name = a[0];
                        b.clockRate = parseInt(a[1], 10);
                        b.numChannels = 3 === a.length ? parseInt(a[2], 10) : 1;
                        return b
                    };
                    h.writeRtpMap = function (a) {
                        var b = a.payloadType;
                        void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType);
                        return "a\x3drtpmap:" +
                            b + " " + a.name + "/" + a.clockRate + (1 !== a.numChannels ? "/" + a.numChannels : "") + "\r\n"
                    };
                    h.parseExtmap = function (a) {
                        a = a.substr(9).split(" ");
                        return {
                            id: parseInt(a[0], 10),
                            direction: 0 < a[0].indexOf("/") ? a[0].split("/")[1] : "sendrecv",
                            uri: a[1]
                        }
                    };
                    h.writeExtmap = function (a) {
                        return "a\x3dextmap:" + (a.id || a.preferredId) + (a.direction && "sendrecv" !== a.direction ? "/" + a.direction : "") + " " + a.uri + "\r\n"
                    };
                    h.parseFmtp = function (a) {
                        for (var b = {}, c = a.substr(a.indexOf(" ") + 1).split(";"), d = 0; d < c.length; d++) a = c[d].trim().split("\x3d"), b[a[0].trim()] =
                            a[1];
                        return b
                    };
                    h.writeFmtp = function (a) {
                        var b = "", c = a.payloadType;
                        void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType);
                        if (a.parameters && Object.keys(a.parameters).length) {
                            var d = [];
                            Object.keys(a.parameters).forEach(function (b) {
                                d.push(b + "\x3d" + a.parameters[b])
                            });
                            b += "a\x3dfmtp:" + c + " " + d.join(";") + "\r\n"
                        }
                        return b
                    };
                    h.parseRtcpFb = function (a) {
                        a = a.substr(a.indexOf(" ") + 1).split(" ");
                        return {type: a.shift(), parameter: a.join(" ")}
                    };
                    h.writeRtcpFb = function (a) {
                        var b = "", c = a.payloadType;
                        void 0 !== a.preferredPayloadType &&
                        (c = a.preferredPayloadType);
                        a.rtcpFeedback && a.rtcpFeedback.length && a.rtcpFeedback.forEach(function (a) {
                            b += "a\x3drtcp-fb:" + c + " " + a.type + (a.parameter && a.parameter.length ? " " + a.parameter : "") + "\r\n"
                        });
                        return b
                    };
                    h.parseSsrcMedia = function (a) {
                        var b = a.indexOf(" "), c = {ssrc: parseInt(a.substr(7, b - 7), 10)}, d = a.indexOf(":", b);
                        -1 < d ? (c.attribute = a.substr(b + 1, d - b - 1), c.value = a.substr(d + 1)) : c.attribute = a.substr(b + 1);
                        return c
                    };
                    h.getMid = function (a) {
                        if (a = h.matchPrefix(a, "a\x3dmid:")[0]) return a.substr(6)
                    };
                    h.parseFingerprint =
                        function (a) {
                            a = a.substr(14).split(" ");
                            return {algorithm: a[0].toLowerCase(), value: a[1]}
                        };
                    h.getDtlsParameters = function (a, c) {
                        return {
                            role: "auto",
                            fingerprints: h.matchPrefix(a + c, "a\x3dfingerprint:").map(h.parseFingerprint)
                        }
                    };
                    h.writeDtlsParameters = function (a, c) {
                        var b = "a\x3dsetup:" + c + "\r\n";
                        a.fingerprints.forEach(function (a) {
                            b += "a\x3dfingerprint:" + a.algorithm + " " + a.value + "\r\n"
                        });
                        return b
                    };
                    h.getIceParameters = function (a, c) {
                        a = h.splitLines(a);
                        a = a.concat(h.splitLines(c));
                        return {
                            usernameFragment: a.filter(function (a) {
                                return 0 ===
                                    a.indexOf("a\x3dice-ufrag:")
                            })[0].substr(12), password: a.filter(function (a) {
                                return 0 === a.indexOf("a\x3dice-pwd:")
                            })[0].substr(10)
                        }
                    };
                    h.writeIceParameters = function (a) {
                        return "a\x3dice-ufrag:" + a.usernameFragment + "\r\na\x3dice-pwd:" + a.password + "\r\n"
                    };
                    h.parseRtpParameters = function (a) {
                        for (var b = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: [],
                            rtcp: []
                        }, c = h.splitLines(a)[0].split(" "), d = 3; d < c.length; d++) {
                            var e = c[d], m = h.matchPrefix(a, "a\x3drtpmap:" + e + " ")[0];
                            if (m) {
                                var m = h.parseRtpMap(m), n = h.matchPrefix(a, "a\x3dfmtp:" +
                                    e + " ");
                                m.parameters = n.length ? h.parseFmtp(n[0]) : {};
                                m.rtcpFeedback = h.matchPrefix(a, "a\x3drtcp-fb:" + e + " ").map(h.parseRtcpFb);
                                b.codecs.push(m);
                                switch (m.name.toUpperCase()) {
                                    case "RED":
                                    case "ULPFEC":
                                        b.fecMechanisms.push(m.name.toUpperCase())
                                }
                            }
                        }
                        h.matchPrefix(a, "a\x3dextmap:").forEach(function (a) {
                            b.headerExtensions.push(h.parseExtmap(a))
                        });
                        return b
                    };
                    h.writeRtpDescription = function (a, c) {
                        var b = "", b = b + ("m\x3d" + a + " "), b = b + (0 < c.codecs.length ? "9" : "0"),
                            b = b + " UDP/TLS/RTP/SAVPF ", b = b + (c.codecs.map(function (a) {
                                return void 0 !==
                                a.preferredPayloadType ? a.preferredPayloadType : a.payloadType
                            }).join(" ") + "\r\n"), b = b + "c\x3dIN IP4 0.0.0.0\r\n",
                            b = b + "a\x3drtcp:9 IN IP4 0.0.0.0\r\n";
                        c.codecs.forEach(function (a) {
                            b += h.writeRtpMap(a);
                            b += h.writeFmtp(a);
                            b += h.writeRtcpFb(a)
                        });
                        var d = 0;
                        c.codecs.forEach(function (a) {
                            a.maxptime > d && (d = a.maxptime)
                        });
                        0 < d && (b += "a\x3dmaxptime:" + d + "\r\n");
                        b += "a\x3drtcp-mux\r\n";
                        c.headerExtensions.forEach(function (a) {
                            b += h.writeExtmap(a)
                        });
                        return b
                    };
                    h.parseRtpEncodingParameters = function (a) {
                        var b = [], c = h.parseRtpParameters(a),
                            d = -1 !== c.fecMechanisms.indexOf("RED"), e = -1 !== c.fecMechanisms.indexOf("ULPFEC"),
                            m = h.matchPrefix(a, "a\x3dssrc:").map(function (a) {
                                return h.parseSsrcMedia(a)
                            }).filter(function (a) {
                                return "cname" === a.attribute
                            }), n = 0 < m.length && m[0].ssrc, q,
                            m = h.matchPrefix(a, "a\x3dssrc-group:FID").map(function (a) {
                                a = a.split(" ");
                                a.shift();
                                return a.map(function (a) {
                                    return parseInt(a, 10)
                                })
                            });
                        0 < m.length && 1 < m[0].length && m[0][0] === n && (q = m[0][1]);
                        c.codecs.forEach(function (a) {
                            "RTX" === a.name.toUpperCase() && a.parameters.apt && (a = {
                                ssrc: n,
                                codecPayloadType: parseInt(a.parameters.apt, 10), rtx: {ssrc: q}
                            }, b.push(a), d && (a = JSON.parse(JSON.stringify(a)), a.fec = {
                                ssrc: q,
                                mechanism: e ? "red+ulpfec" : "red"
                            }, b.push(a)))
                        });
                        0 === b.length && n && b.push({ssrc: n});
                        var k = h.matchPrefix(a, "b\x3d");
                        k.length && (k = 0 === k[0].indexOf("b\x3dTIAS:") ? parseInt(k[0].substr(7), 10) : 0 === k[0].indexOf("b\x3dAS:") ? 950 * parseInt(k[0].substr(5), 10) - 16E3 : void 0, b.forEach(function (a) {
                            a.maxBitrate = k
                        }));
                        return b
                    };
                    h.parseRtcpParameters = function (a) {
                        var b = {}, c = h.matchPrefix(a, "a\x3dssrc:").map(function (a) {
                            return h.parseSsrcMedia(a)
                        }).filter(function (a) {
                            return "cname" ===
                                a.attribute
                        })[0];
                        c && (b.cname = c.value, b.ssrc = c.ssrc);
                        c = h.matchPrefix(a, "a\x3drtcp-rsize");
                        b.reducedSize = 0 < c.length;
                        b.compound = 0 === c.length;
                        a = h.matchPrefix(a, "a\x3drtcp-mux");
                        b.mux = 0 < a.length;
                        return b
                    };
                    h.parseMsid = function (a) {
                        var b = h.matchPrefix(a, "a\x3dmsid:");
                        if (1 === b.length) return a = b[0].substr(7).split(" "), {stream: a[0], track: a[1]};
                        a = h.matchPrefix(a, "a\x3dssrc:").map(function (a) {
                            return h.parseSsrcMedia(a)
                        }).filter(function (a) {
                            return "msid" === a.attribute
                        });
                        if (0 < a.length) return a = a[0].value.split(" "),
                            {stream: a[0], track: a[1]}
                    };
                    h.generateSessionId = function () {
                        return Math.random().toString().substr(2, 21)
                    };
                    h.writeSessionBoilerplate = function (a, c) {
                        c = void 0 !== c ? c : 2;
                        return "v\x3d0\r\no\x3dthisisadapterortc " + (a ? a : h.generateSessionId()) + " " + c + " IN IP4 127.0.0.1\r\ns\x3d-\r\nt\x3d0 0\r\n"
                    };
                    h.writeMediaSection = function (a, c, e, d) {
                        c = h.writeRtpDescription(a.kind, c);
                        c += h.writeIceParameters(a.iceGatherer.getLocalParameters());
                        c += h.writeDtlsParameters(a.dtlsTransport.getLocalParameters(), "offer" === e ? "actpass" : "active");
                        c += "a\x3dmid:" + a.mid + "\r\n";
                        c = a.direction ? c + ("a\x3d" + a.direction + "\r\n") : a.rtpSender && a.rtpReceiver ? c + "a\x3dsendrecv\r\n" : a.rtpSender ? c + "a\x3dsendonly\r\n" : a.rtpReceiver ? c + "a\x3drecvonly\r\n" : c + "a\x3dinactive\r\n";
                        a.rtpSender && (e = "msid:" + d.id + " " + a.rtpSender.track.id + "\r\n", c = c + ("a\x3d" + e) + ("a\x3dssrc:" + a.sendEncodingParameters[0].ssrc + " " + e), a.sendEncodingParameters[0].rtx && (c += "a\x3dssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " " + e, c += "a\x3dssrc-group:FID " + a.sendEncodingParameters[0].ssrc + " " +
                            a.sendEncodingParameters[0].rtx.ssrc + "\r\n"));
                        c += "a\x3dssrc:" + a.sendEncodingParameters[0].ssrc + " cname:" + h.localCName + "\r\n";
                        a.rtpSender && a.sendEncodingParameters[0].rtx && (c += "a\x3dssrc:" + a.sendEncodingParameters[0].rtx.ssrc + " cname:" + h.localCName + "\r\n");
                        return c
                    };
                    h.getDirection = function (a, c) {
                        a = h.splitLines(a);
                        for (var b = 0; b < a.length; b++) switch (a[b]) {
                            case "a\x3dsendrecv":
                            case "a\x3dsendonly":
                            case "a\x3drecvonly":
                            case "a\x3dinactive":
                                return a[b].substr(2)
                        }
                        return c ? h.getDirection(c) : "sendrecv"
                    };
                    h.getKind =
                        function (a) {
                            return h.splitLines(a)[0].split(" ")[0].substr(2)
                        };
                    h.isRejected = function (a) {
                        return "0" === a.split(" ", 2)[1]
                    };
                    h.parseMLine = function (a) {
                        a = h.splitLines(a)[0].split(" ");
                        return {
                            kind: a[0].substr(2),
                            port: parseInt(a[1], 10),
                            protocol: a[2],
                            fmt: a.slice(3).join(" ")
                        }
                    };
                    "object" === typeof a && (a.exports = h)
                }, {}], 3: [function (c, a, h) {
                    h = "undefined" !== typeof e ? e : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {};
                    c = c("./adapter_factory.js");
                    a.exports = c({window: h.window})
                }, {"./adapter_factory.js": 4}],
                4: [function (c, a, e) {
                    var h = c("./utils");
                    a.exports = function (a, g) {
                        a = a && a.window;
                        var b = {shimChrome: !0, shimFirefox: !0, shimEdge: !0, shimSafari: !0};
                        for (d in g) hasOwnProperty.call(g, d) && (b[d] = g[d]);
                        g = h.log;
                        var d = h.detectBrowser(a);
                        var e = {
                                browserDetails: d,
                                extractVersion: h.extractVersion,
                                disableLog: h.disableLog,
                                disableWarnings: h.disableWarnings
                            }, m = c("./chrome/chrome_shim") || null, n = c("./edge/edge_shim") || null,
                            q = c("./firefox/firefox_shim") || null, k = c("./safari/safari_shim") || null,
                            v = c("./common_shim") || null;
                        switch (d.browser) {
                            case "chrome":
                                if (!m ||
                                    !m.shimPeerConnection || !b.shimChrome) {
                                    g("Chrome shim is not included in this adapter release.");
                                    break
                                }
                                g("adapter.js shimming chrome.");
                                e.browserShim = m;
                                v.shimCreateObjectURL(a);
                                m.shimGetUserMedia(a);
                                m.shimMediaStream(a);
                                m.shimSourceObject(a);
                                m.shimPeerConnection(a);
                                m.shimOnTrack(a);
                                m.shimAddTrackRemoveTrack(a);
                                m.shimGetSendersWithDtmf(a);
                                v.shimRTCIceCandidate(a);
                                break;
                            case "firefox":
                                if (!q || !q.shimPeerConnection || !b.shimFirefox) {
                                    g("Firefox shim is not included in this adapter release.");
                                    break
                                }
                                g("adapter.js shimming firefox.");
                                e.browserShim = q;
                                v.shimCreateObjectURL(a);
                                q.shimGetUserMedia(a);
                                q.shimSourceObject(a);
                                q.shimPeerConnection(a);
                                q.shimOnTrack(a);
                                v.shimRTCIceCandidate(a);
                                break;
                            case "edge":
                                if (!n || !n.shimPeerConnection || !b.shimEdge) {
                                    g("MS edge shim is not included in this adapter release.");
                                    break
                                }
                                g("adapter.js shimming edge.");
                                e.browserShim = n;
                                v.shimCreateObjectURL(a);
                                n.shimGetUserMedia(a);
                                n.shimPeerConnection(a);
                                n.shimReplaceTrack(a);
                                break;
                            case "safari":
                                if (!k || !b.shimSafari) {
                                    g("Safari shim is not included in this adapter release.");
                                    break
                                }
                                g("adapter.js shimming safari.");
                                e.browserShim = k;
                                v.shimCreateObjectURL(a);
                                k.shimRTCIceServerUrls(a);
                                k.shimCallbacksAPI(a);
                                k.shimLocalStreamsAPI(a);
                                k.shimRemoteStreamsAPI(a);
                                k.shimTrackEventTransceiver(a);
                                k.shimGetUserMedia(a);
                                k.shimCreateOfferLegacy(a);
                                v.shimRTCIceCandidate(a);
                                break;
                            default:
                                g("Unsupported browser!")
                        }
                        return e
                    }
                }, {
                    "./chrome/chrome_shim": 5,
                    "./common_shim": 7,
                    "./edge/edge_shim": 8,
                    "./firefox/firefox_shim": 10,
                    "./safari/safari_shim": 12,
                    "./utils": 13
                }], 5: [function (c, a, e) {
                    var h = c("../utils.js"),
                        b = h.log;
                    a.exports = {
                        shimMediaStream: function (a) {
                            a.MediaStream = a.MediaStream || a.webkitMediaStream
                        }, shimOnTrack: function (a) {
                            if ("object" === typeof a && a.RTCPeerConnection && !("ontrack" in a.RTCPeerConnection.prototype)) {
                                Object.defineProperty(a.RTCPeerConnection.prototype, "ontrack", {
                                    get: function () {
                                        return this._ontrack
                                    }, set: function (a) {
                                        this._ontrack && this.removeEventListener("track", this._ontrack);
                                        this.addEventListener("track", this._ontrack = a)
                                    }
                                });
                                var b = a.RTCPeerConnection.prototype.setRemoteDescription;
                                a.RTCPeerConnection.prototype.setRemoteDescription =
                                    function () {
                                        var c = this;
                                        c._ontrackpoly || (c._ontrackpoly = function (b) {
                                            b.stream.addEventListener("addtrack", function (d) {
                                                var g = a.RTCPeerConnection.prototype.getReceivers ? c.getReceivers().find(function (a) {
                                                    return a.track && a.track.id === d.track.id
                                                }) : {track: d.track};
                                                var e = new Event("track");
                                                e.track = d.track;
                                                e.receiver = g;
                                                e.transceiver = {receiver: g};
                                                e.streams = [b.stream];
                                                c.dispatchEvent(e)
                                            });
                                            b.stream.getTracks().forEach(function (d) {
                                                var e = a.RTCPeerConnection.prototype.getReceivers ? c.getReceivers().find(function (a) {
                                                    return a.track &&
                                                        a.track.id === d.id
                                                }) : {track: d};
                                                var g = new Event("track");
                                                g.track = d;
                                                g.receiver = e;
                                                g.transceiver = {receiver: e};
                                                g.streams = [b.stream];
                                                c.dispatchEvent(g)
                                            })
                                        }, c.addEventListener("addstream", c._ontrackpoly));
                                        return b.apply(c, arguments)
                                    }
                            }
                        }, shimAddTrackRemoveTrack: function (a) {
                            function b(a, b) {
                                var c = b.sdp;
                                Object.keys(a._reverseStreams || []).forEach(function (b) {
                                    b = a._reverseStreams[b];
                                    c = c.replace(new RegExp(a._streams[b.id].id, "g"), b.id)
                                });
                                return new RTCSessionDescription({type: b.type, sdp: c})
                            }

                            function c(a, b) {
                                var c =
                                    b.sdp;
                                Object.keys(a._reverseStreams || []).forEach(function (b) {
                                    b = a._reverseStreams[b];
                                    c = c.replace(new RegExp(b.id, "g"), a._streams[b.id].id)
                                });
                                return new RTCSessionDescription({type: b.type, sdp: c})
                            }

                            var e = h.detectBrowser(a);
                            if (!(a.RTCPeerConnection.prototype.addTrack && 63 <= e.version)) {
                                var g = a.RTCPeerConnection.prototype.getLocalStreams;
                                a.RTCPeerConnection.prototype.getLocalStreams = function () {
                                    var a = this, b = g.apply(this);
                                    a._reverseStreams = a._reverseStreams || {};
                                    return b.map(function (b) {
                                        return a._reverseStreams[b.id]
                                    })
                                };
                                var m = a.RTCPeerConnection.prototype.addStream;
                                a.RTCPeerConnection.prototype.addStream = function (b) {
                                    var c = this;
                                    c._streams = c._streams || {};
                                    c._reverseStreams = c._reverseStreams || {};
                                    b.getTracks().forEach(function (a) {
                                        if (c.getSenders().find(function (b) {
                                            return b.track === a
                                        })) throw new DOMException("Track already exists.", "InvalidAccessError");
                                    });
                                    if (!c._reverseStreams[b.id]) {
                                        var d = new a.MediaStream(b.getTracks());
                                        c._streams[b.id] = d;
                                        c._reverseStreams[d.id] = b;
                                        b = d
                                    }
                                    m.apply(c, [b])
                                };
                                var n = a.RTCPeerConnection.prototype.removeStream;
                                a.RTCPeerConnection.prototype.removeStream = function (a) {
                                    this._streams = this._streams || {};
                                    this._reverseStreams = this._reverseStreams || {};
                                    n.apply(this, [this._streams[a.id] || a]);
                                    delete this._reverseStreams[this._streams[a.id] ? this._streams[a.id].id : a.id];
                                    delete this._streams[a.id]
                                };
                                a.RTCPeerConnection.prototype.addTrack = function (b, c) {
                                    var d = this;
                                    if ("closed" === d.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                                    var e = [].slice.call(arguments, 1);
                                    if (1 !== e.length || !e[0].getTracks().find(function (a) {
                                        return a === b
                                    })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                                    if (d.getSenders().find(function (a) {
                                        return a.track === b
                                    })) throw new DOMException("Track already exists.", "InvalidAccessError");
                                    d._streams = d._streams || {};
                                    d._reverseStreams = d._reverseStreams || {};
                                    (e = d._streams[c.id]) ? (e.addTrack(b), Promise.resolve().then(function () {
                                            d.dispatchEvent(new Event("negotiationneeded"))
                                        })) :
                                        (e = new a.MediaStream([b]), d._streams[c.id] = e, d._reverseStreams[e.id] = c, d.addStream(e));
                                    return d.getSenders().find(function (a) {
                                        return a.track === b
                                    })
                                };
                                ["createOffer", "createAnswer"].forEach(function (c) {
                                    var d = a.RTCPeerConnection.prototype[c];
                                    a.RTCPeerConnection.prototype[c] = function () {
                                        var a = this, c = arguments;
                                        return arguments.length && "function" === typeof arguments[0] ? d.apply(a, [function (d) {
                                            d = b(a, d);
                                            c[0].apply(null, [d])
                                        }, function (a) {
                                            c[1] && c[1].apply(null, a)
                                        }, arguments[2]]) : d.apply(a, arguments).then(function (c) {
                                            return b(a,
                                                c)
                                        })
                                    }
                                });
                                var k = a.RTCPeerConnection.prototype.setLocalDescription;
                                a.RTCPeerConnection.prototype.setLocalDescription = function () {
                                    if (!arguments.length || !arguments[0].type) return k.apply(this, arguments);
                                    arguments[0] = c(this, arguments[0]);
                                    return k.apply(this, arguments)
                                };
                                var v = Object.getOwnPropertyDescriptor(a.RTCPeerConnection.prototype, "localDescription");
                                Object.defineProperty(a.RTCPeerConnection.prototype, "localDescription", {
                                    get: function () {
                                        var a = v.get.apply(this);
                                        return "" === a.type ? a : b(this, a)
                                    }
                                });
                                a.RTCPeerConnection.prototype.removeTrack =
                                    function (a) {
                                        var b = this;
                                        if ("closed" === b.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                                        if (!a._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                                        if (a._pc !== b) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                                        b._streams = b._streams || {};
                                        var c;
                                        Object.keys(b._streams).forEach(function (d) {
                                            b._streams[d].getTracks().find(function (b) {
                                                return a.track ===
                                                    b
                                            }) && (c = b._streams[d])
                                        });
                                        c && (1 === c.getTracks().length ? b.removeStream(b._reverseStreams[c.id]) : c.removeTrack(a.track), b.dispatchEvent(new Event("negotiationneeded")))
                                    }
                            }
                        }, shimGetSendersWithDtmf: function (a) {
                            if ("object" === typeof a && a.RTCPeerConnection && !("getSenders" in a.RTCPeerConnection.prototype) && "createDTMFSender" in a.RTCPeerConnection.prototype) {
                                var b = function (a, b) {
                                    return {
                                        track: b, get dtmf() {
                                            void 0 === this._dtmf && (this._dtmf = "audio" === b.kind ? a.createDTMFSender(b) : null);
                                            return this._dtmf
                                        }, _pc: a
                                    }
                                };
                                if (!a.RTCPeerConnection.prototype.getSenders) {
                                    a.RTCPeerConnection.prototype.getSenders = function () {
                                        this._senders = this._senders || [];
                                        return this._senders.slice()
                                    };
                                    var c = a.RTCPeerConnection.prototype.addTrack;
                                    a.RTCPeerConnection.prototype.addTrack = function (a, d) {
                                        var e = c.apply(this, arguments);
                                        e || (e = b(this, a), this._senders.push(e));
                                        return e
                                    };
                                    var e = a.RTCPeerConnection.prototype.removeTrack;
                                    a.RTCPeerConnection.prototype.removeTrack = function (a) {
                                        e.apply(this, arguments);
                                        var b = this._senders.indexOf(a);
                                        -1 !== b &&
                                        this._senders.splice(b, 1)
                                    }
                                }
                                var g = a.RTCPeerConnection.prototype.addStream;
                                a.RTCPeerConnection.prototype.addStream = function (a) {
                                    var c = this;
                                    c._senders = c._senders || [];
                                    g.apply(c, [a]);
                                    a.getTracks().forEach(function (a) {
                                        c._senders.push(b(c, a))
                                    })
                                };
                                var h = a.RTCPeerConnection.prototype.removeStream;
                                a.RTCPeerConnection.prototype.removeStream = function (a) {
                                    var b = this;
                                    b._senders = b._senders || [];
                                    h.apply(b, [a]);
                                    a.getTracks().forEach(function (a) {
                                        var c = b._senders.find(function (b) {
                                            return b.track === a
                                        });
                                        c && b._senders.splice(b._senders.indexOf(c),
                                            1)
                                    })
                                }
                            } else if ("object" === typeof a && a.RTCPeerConnection && "getSenders" in a.RTCPeerConnection.prototype && "createDTMFSender" in a.RTCPeerConnection.prototype && a.RTCRtpSender && !("dtmf" in a.RTCRtpSender.prototype)) {
                                var m = a.RTCPeerConnection.prototype.getSenders;
                                a.RTCPeerConnection.prototype.getSenders = function () {
                                    var a = this, b = m.apply(a, []);
                                    b.forEach(function (b) {
                                        b._pc = a
                                    });
                                    return b
                                };
                                Object.defineProperty(a.RTCRtpSender.prototype, "dtmf", {
                                    get: function () {
                                        void 0 === this._dtmf && (this._dtmf = "audio" === this.track.kind ?
                                            this._pc.createDTMFSender(this.track) : null);
                                        return this._dtmf
                                    }
                                })
                            }
                        }, shimSourceObject: function (a) {
                            var b = a && a.URL;
                            "object" === typeof a && (!a.HTMLMediaElement || "srcObject" in a.HTMLMediaElement.prototype || Object.defineProperty(a.HTMLMediaElement.prototype, "srcObject", {
                                get: function () {
                                    return this._srcObject
                                }, set: function (a) {
                                    var c = this;
                                    this._srcObject = a;
                                    this.src && b.revokeObjectURL(this.src);
                                    a ? (this.src = b.createObjectURL(a), a.addEventListener("addtrack", function () {
                                        c.src && b.revokeObjectURL(c.src);
                                        c.src = b.createObjectURL(a)
                                    }),
                                        a.addEventListener("removetrack", function () {
                                            c.src && b.revokeObjectURL(c.src);
                                            c.src = b.createObjectURL(a)
                                        })) : this.src = ""
                                }
                            }))
                        }, shimPeerConnection: function (a) {
                            var c = h.detectBrowser(a);
                            if (a.RTCPeerConnection) {
                                var d = a.RTCPeerConnection;
                                a.RTCPeerConnection = function (a, b) {
                                    if (a && a.iceServers) {
                                        for (var c = [], e = 0; e < a.iceServers.length; e++) {
                                            var g = a.iceServers[e];
                                            !g.hasOwnProperty("urls") && g.hasOwnProperty("url") ? (h.deprecated("RTCIceServer.url", "RTCIceServer.urls"), g = JSON.parse(JSON.stringify(g)), g.urls = g.url, c.push(g)) :
                                                c.push(a.iceServers[e])
                                        }
                                        a.iceServers = c
                                    }
                                    return new d(a, b)
                                };
                                a.RTCPeerConnection.prototype = d.prototype;
                                Object.defineProperty(a.RTCPeerConnection, "generateCertificate", {
                                    get: function () {
                                        return d.generateCertificate
                                    }
                                })
                            } else a.RTCPeerConnection = function (c, d) {
                                b("PeerConnection");
                                c && c.iceTransportPolicy && (c.iceTransports = c.iceTransportPolicy);
                                return new a.webkitRTCPeerConnection(c, d)
                            }, a.RTCPeerConnection.prototype = a.webkitRTCPeerConnection.prototype, a.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(a.RTCPeerConnection,
                                "generateCertificate", {
                                    get: function () {
                                        return a.webkitRTCPeerConnection.generateCertificate
                                    }
                                });
                            var e = a.RTCPeerConnection.prototype.getStats;
                            a.RTCPeerConnection.prototype.getStats = function (a, b, c) {
                                var d = this, g = arguments;
                                if (0 < arguments.length && "function" === typeof a) return e.apply(this, arguments);
                                if (0 === e.length && (0 === arguments.length || "function" !== typeof arguments[0])) return e.apply(this, []);
                                var k = function (a) {
                                    var b = {};
                                    a.result().forEach(function (a) {
                                        var c = {
                                            id: a.id, timestamp: a.timestamp, type: {
                                                localcandidate: "local-candidate",
                                                remotecandidate: "remote-candidate"
                                            }[a.type] || a.type
                                        };
                                        a.names().forEach(function (b) {
                                            c[b] = a.stat(b)
                                        });
                                        b[c.id] = c
                                    });
                                    return b
                                }, h = function (a) {
                                    return new Map(Object.keys(a).map(function (b) {
                                        return [b, a[b]]
                                    }))
                                };
                                return 2 <= arguments.length ? e.apply(this, [function (a) {
                                    g[1](h(k(a)))
                                }, arguments[0]]) : (new Promise(function (a, b) {
                                    e.apply(d, [function (b) {
                                        a(h(k(b)))
                                    }, b])
                                })).then(b, c)
                            };
                            51 > c.version && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (b) {
                                var c = a.RTCPeerConnection.prototype[b];
                                a.RTCPeerConnection.prototype[b] = function () {
                                    var a = arguments, b = this, d = new Promise(function (d, e) {
                                        c.apply(b, [a[0], d, e])
                                    });
                                    return 2 > a.length ? d : d.then(function () {
                                        a[1].apply(null, [])
                                    }, function (b) {
                                        3 <= a.length && a[2].apply(null, [b])
                                    })
                                }
                            });
                            52 > c.version && ["createOffer", "createAnswer"].forEach(function (b) {
                                var c = a.RTCPeerConnection.prototype[b];
                                a.RTCPeerConnection.prototype[b] = function () {
                                    var a = this;
                                    if (1 > arguments.length || 1 === arguments.length && "object" === typeof arguments[0]) {
                                        var b = 1 === arguments.length ? arguments[0] :
                                            void 0;
                                        return new Promise(function (d, e) {
                                            c.apply(a, [d, e, b])
                                        })
                                    }
                                    return c.apply(this, arguments)
                                }
                            });
                            ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (b) {
                                var c = a.RTCPeerConnection.prototype[b];
                                a.RTCPeerConnection.prototype[b] = function () {
                                    arguments[0] = new ("addIceCandidate" === b ? a.RTCIceCandidate : a.RTCSessionDescription)(arguments[0]);
                                    return c.apply(this, arguments)
                                }
                            });
                            var g = a.RTCPeerConnection.prototype.addIceCandidate;
                            a.RTCPeerConnection.prototype.addIceCandidate = function () {
                                return arguments[0] ?
                                    g.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                            }
                        }, shimGetUserMedia: c("./getusermedia")
                    }
                }, {"../utils.js": 13, "./getusermedia": 6}], 6: [function (c, a, e) {
                    var h = c("../utils.js"), b = h.log;
                    a.exports = function (a) {
                        var c = h.detectBrowser(a), d = a && a.navigator, e = function (a) {
                            if ("object" !== typeof a || a.mandatory || a.optional) return a;
                            var b = {};
                            Object.keys(a).forEach(function (c) {
                                if ("require" !== c && "advanced" !== c && "mediaSource" !== c) {
                                    var d = "object" === typeof a[c] ? a[c] : {ideal: a[c]};
                                    void 0 !==
                                    d.exact && "number" === typeof d.exact && (d.min = d.max = d.exact);
                                    var e = function (a, b) {
                                        return a ? a + b.charAt(0).toUpperCase() + b.slice(1) : "deviceId" === b ? "sourceId" : b
                                    };
                                    if (void 0 !== d.ideal) {
                                        b.optional = b.optional || [];
                                        var g = {};
                                        "number" === typeof d.ideal ? (g[e("min", c)] = d.ideal, b.optional.push(g), g = {}, g[e("max", c)] = d.ideal) : g[e("", c)] = d.ideal;
                                        b.optional.push(g)
                                    }
                                    void 0 !== d.exact && "number" !== typeof d.exact ? (b.mandatory = b.mandatory || {}, b.mandatory[e("", c)] = d.exact) : ["min", "max"].forEach(function (a) {
                                        void 0 !== d[a] && (b.mandatory =
                                            b.mandatory || {}, b.mandatory[e(a, c)] = d[a])
                                    })
                                }
                            });
                            a.advanced && (b.optional = (b.optional || []).concat(a.advanced));
                            return b
                        }, g = function (a, g) {
                            if ((a = JSON.parse(JSON.stringify(a))) && "object" === typeof a.audio) {
                                var k = function (a, b, c) {
                                    b in a && !(c in a) && (a[c] = a[b], delete a[b])
                                };
                                a = JSON.parse(JSON.stringify(a));
                                k(a.audio, "autoGainControl", "googAutoGainControl");
                                k(a.audio, "noiseSuppression", "googNoiseSuppression");
                                a.audio = e(a.audio)
                            }
                            if (a && "object" === typeof a.video) {
                                var h = a.video.facingMode, h = h && ("object" === typeof h ?
                                    h : {ideal: h}), k = 66 > c.version;
                                if (!(!h || "user" !== h.exact && "environment" !== h.exact && "user" !== h.ideal && "environment" !== h.ideal || d.mediaDevices.getSupportedConstraints && d.mediaDevices.getSupportedConstraints().facingMode && !k)) {
                                    delete a.video.facingMode;
                                    if ("environment" === h.exact || "environment" === h.ideal) var l = ["back", "rear"]; else if ("user" === h.exact || "user" === h.ideal) l = ["front"];
                                    if (l) return d.mediaDevices.enumerateDevices().then(function (c) {
                                        c = c.filter(function (a) {
                                            return "videoinput" === a.kind
                                        });
                                        var d = c.find(function (a) {
                                            return l.some(function (b) {
                                                return -1 !==
                                                    a.label.toLowerCase().indexOf(b)
                                            })
                                        });
                                        !d && c.length && -1 !== l.indexOf("back") && (d = c[c.length - 1]);
                                        d && (a.video.deviceId = h.exact ? {exact: d.deviceId} : {ideal: d.deviceId});
                                        a.video = e(a.video);
                                        b("chrome: " + JSON.stringify(a));
                                        return g(a)
                                    })
                                }
                                a.video = e(a.video)
                            }
                            b("chrome: " + JSON.stringify(a));
                            return g(a)
                        }, m = function (a) {
                            return {
                                name: {
                                    PermissionDeniedError: "NotAllowedError",
                                    InvalidStateError: "NotReadableError",
                                    DevicesNotFoundError: "NotFoundError",
                                    ConstraintNotSatisfiedError: "OverconstrainedError",
                                    TrackStartError: "NotReadableError",
                                    MediaDeviceFailedDueToShutdown: "NotReadableError",
                                    MediaDeviceKillSwitchOn: "NotReadableError"
                                }[a.name] || a.name,
                                message: a.message,
                                constraint: a.constraintName,
                                toString: function () {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        };
                        d.getUserMedia = function (a, b, c) {
                            g(a, function (a) {
                                d.webkitGetUserMedia(a, b, function (a) {
                                    c && c(m(a))
                                })
                            })
                        };
                        var n = function (a) {
                            return new Promise(function (b, c) {
                                d.getUserMedia(a, b, c)
                            })
                        };
                        d.mediaDevices || (d.mediaDevices = {
                            getUserMedia: n, enumerateDevices: function () {
                                return new Promise(function (b) {
                                    var c =
                                        {audio: "audioinput", video: "videoinput"};
                                    return a.MediaStreamTrack.getSources(function (a) {
                                        b(a.map(function (a) {
                                            return {label: a.label, kind: c[a.kind], deviceId: a.id, groupId: ""}
                                        }))
                                    })
                                })
                            }, getSupportedConstraints: function () {
                                return {
                                    deviceId: !0,
                                    echoCancellation: !0,
                                    facingMode: !0,
                                    frameRate: !0,
                                    height: !0,
                                    width: !0
                                }
                            }
                        });
                        if (d.mediaDevices.getUserMedia) {
                            var k = d.mediaDevices.getUserMedia.bind(d.mediaDevices);
                            d.mediaDevices.getUserMedia = function (a) {
                                return g(a, function (a) {
                                    return k(a).then(function (b) {
                                        if (a.audio && !b.getAudioTracks().length ||
                                            a.video && !b.getVideoTracks().length) throw b.getTracks().forEach(function (a) {
                                            a.stop()
                                        }), new DOMException("", "NotFoundError");
                                        return b
                                    }, function (a) {
                                        return Promise.reject(m(a))
                                    })
                                })
                            }
                        } else d.mediaDevices.getUserMedia = function (a) {
                            return n(a)
                        };
                        "undefined" === typeof d.mediaDevices.addEventListener && (d.mediaDevices.addEventListener = function () {
                            b("Dummy mediaDevices.addEventListener called.")
                        });
                        "undefined" === typeof d.mediaDevices.removeEventListener && (d.mediaDevices.removeEventListener = function () {
                            b("Dummy mediaDevices.removeEventListener called.")
                        })
                    }
                },
                    {"../utils.js": 13}], 7: [function (c, a, e) {
                    function h(a, b, c) {
                        if (a.RTCPeerConnection) {
                            a = a.RTCPeerConnection.prototype;
                            var d = a.addEventListener;
                            a.addEventListener = function (a, e) {
                                if (a !== b) return d.apply(this, arguments);
                                var g = function (a) {
                                    e(c(a))
                                };
                                this._eventMap = this._eventMap || {};
                                this._eventMap[e] = g;
                                return d.apply(this, [a, g])
                            };
                            var e = a.removeEventListener;
                            a.removeEventListener = function (a, c) {
                                if (a !== b || !this._eventMap || !this._eventMap[c]) return e.apply(this, arguments);
                                var d = this._eventMap[c];
                                delete this._eventMap[c];
                                return e.apply(this, [a, d])
                            };
                            Object.defineProperty(a, "on" + b, {
                                get: function () {
                                    return this["_on" + b]
                                }, set: function (a) {
                                    this["_on" + b] && (this.removeEventListener(b, this["_on" + b]), delete this["_on" + b]);
                                    a && this.addEventListener(b, this["_on" + b] = a)
                                }
                            })
                        }
                    }

                    var b = c("sdp"), g = c("./utils");
                    a.exports = {
                        shimRTCIceCandidate: function (a) {
                            if (!(a.RTCIceCandidate && "foundation" in a.RTCIceCandidate.prototype)) {
                                var c = a.RTCIceCandidate;
                                a.RTCIceCandidate = function (a) {
                                    "object" === typeof a && a.candidate && 0 === a.candidate.indexOf("a\x3d") &&
                                    (a = JSON.parse(JSON.stringify(a)), a.candidate = a.candidate.substr(2));
                                    var d = new c(a);
                                    a = b.parseCandidate(a.candidate);
                                    var e = Object.assign(d, a);
                                    e.toJSON = function () {
                                        return {
                                            candidate: e.candidate,
                                            sdpMid: e.sdpMid,
                                            sdpMLineIndex: e.sdpMLineIndex,
                                            usernameFragment: e.usernameFragment
                                        }
                                    };
                                    return e
                                };
                                h(a, "icecandidate", function (b) {
                                    b.candidate && Object.defineProperty(b, "candidate", {
                                        value: new a.RTCIceCandidate(b.candidate),
                                        writable: "false"
                                    });
                                    return b
                                })
                            }
                        }, shimCreateObjectURL: function (a) {
                            var b = a && a.URL;
                            if ("object" === typeof a &&
                                a.HTMLMediaElement && "srcObject" in a.HTMLMediaElement.prototype && b.createObjectURL && b.revokeObjectURL) {
                                var c = b.createObjectURL.bind(b), e = b.revokeObjectURL.bind(b), h = new Map, l = 0;
                                b.createObjectURL = function (a) {
                                    if ("getTracks" in a) {
                                        var b = "polyblob:" + ++l;
                                        h.set(b, a);
                                        g.deprecated("URL.createObjectURL(stream)", "elem.srcObject \x3d stream");
                                        return b
                                    }
                                    return c(a)
                                };
                                b.revokeObjectURL = function (a) {
                                    e(a);
                                    h.delete(a)
                                };
                                var k = Object.getOwnPropertyDescriptor(a.HTMLMediaElement.prototype, "src");
                                Object.defineProperty(a.HTMLMediaElement.prototype,
                                    "src", {
                                        get: function () {
                                            return k.get.apply(this)
                                        }, set: function (a) {
                                            this.srcObject = h.get(a) || null;
                                            return k.set.apply(this, [a])
                                        }
                                    });
                                var m = a.HTMLMediaElement.prototype.setAttribute;
                                a.HTMLMediaElement.prototype.setAttribute = function () {
                                    2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = h.get(arguments[1]) || null);
                                    return m.apply(this, arguments)
                                }
                            }
                        }
                    }
                }, {"./utils": 13, sdp: 2}], 8: [function (c, a, e) {
                    var h = c("../utils"), b = c("rtcpeerconnection-shim");
                    a.exports = {
                        shimGetUserMedia: c("./getusermedia"),
                        shimPeerConnection: function (a) {
                            var c = h.detectBrowser(a);
                            if (a.RTCIceGatherer && (a.RTCIceCandidate || (a.RTCIceCandidate = function (a) {
                                return a
                            }), a.RTCSessionDescription || (a.RTCSessionDescription = function (a) {
                                return a
                            }), 15025 > c.version)) {
                                var d = Object.getOwnPropertyDescriptor(a.MediaStreamTrack.prototype, "enabled");
                                Object.defineProperty(a.MediaStreamTrack.prototype, "enabled", {
                                    set: function (a) {
                                        d.set.call(this, a);
                                        var b = new Event("enabled");
                                        b.enabled = a;
                                        this.dispatchEvent(b)
                                    }
                                })
                            }
                            !a.RTCRtpSender || "dtmf" in a.RTCRtpSender.prototype ||
                            Object.defineProperty(a.RTCRtpSender.prototype, "dtmf", {
                                get: function () {
                                    void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new a.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null));
                                    return this._dtmf
                                }
                            });
                            a.RTCPeerConnection = b(a, c.version)
                        }, shimReplaceTrack: function (a) {
                            !a.RTCRtpSender || "replaceTrack" in a.RTCRtpSender.prototype || (a.RTCRtpSender.prototype.replaceTrack = a.RTCRtpSender.prototype.setTrack)
                        }
                    }
                }, {"../utils": 13, "./getusermedia": 9, "rtcpeerconnection-shim": 1}], 9: [function (c,
                                                                                                      a, e) {
                    a.exports = function (a) {
                        a = a && a.navigator;
                        var b = function (a) {
                            return {
                                name: {PermissionDeniedError: "NotAllowedError"}[a.name] || a.name,
                                message: a.message,
                                constraint: a.constraint,
                                toString: function () {
                                    return this.name
                                }
                            }
                        }, c = a.mediaDevices.getUserMedia.bind(a.mediaDevices);
                        a.mediaDevices.getUserMedia = function (a) {
                            return c(a).catch(function (a) {
                                return Promise.reject(b(a))
                            })
                        }
                    }
                }, {}], 10: [function (c, a, e) {
                    var h = c("../utils");
                    a.exports = {
                        shimOnTrack: function (a) {
                            "object" !== typeof a || !a.RTCPeerConnection || "ontrack" in
                            a.RTCPeerConnection.prototype || Object.defineProperty(a.RTCPeerConnection.prototype, "ontrack", {
                                get: function () {
                                    return this._ontrack
                                }, set: function (a) {
                                    this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly));
                                    this.addEventListener("track", this._ontrack = a);
                                    this.addEventListener("addstream", this._ontrackpoly = function (a) {
                                        a.stream.getTracks().forEach(function (b) {
                                            var c = new Event("track");
                                            c.track = b;
                                            c.receiver = {track: b};
                                            c.transceiver = {receiver: c.receiver};
                                            c.streams = [a.stream];
                                            this.dispatchEvent(c)
                                        }.bind(this))
                                    }.bind(this))
                                }
                            });
                            "object" === typeof a && a.RTCTrackEvent && "receiver" in a.RTCTrackEvent.prototype && !("transceiver" in a.RTCTrackEvent.prototype) && Object.defineProperty(a.RTCTrackEvent.prototype, "transceiver", {
                                get: function () {
                                    return {receiver: this.receiver}
                                }
                            })
                        }, shimSourceObject: function (a) {
                            "object" === typeof a && (!a.HTMLMediaElement || "srcObject" in a.HTMLMediaElement.prototype || Object.defineProperty(a.HTMLMediaElement.prototype, "srcObject", {
                                get: function () {
                                    return this.mozSrcObject
                                },
                                set: function (a) {
                                    this.mozSrcObject = a
                                }
                            }))
                        }, shimPeerConnection: function (a) {
                            var b = h.detectBrowser(a);
                            if ("object" === typeof a && (a.RTCPeerConnection || a.mozRTCPeerConnection)) {
                                a.RTCPeerConnection || (a.RTCPeerConnection = function (c, d) {
                                    if (38 > b.version && c && c.iceServers) {
                                        for (var e = [], g = 0; g < c.iceServers.length; g++) {
                                            var h = c.iceServers[g];
                                            if (h.hasOwnProperty("urls")) for (var l = 0; l < h.urls.length; l++) {
                                                var m = {url: h.urls[l]};
                                                0 === h.urls[l].indexOf("turn") && (m.username = h.username, m.credential = h.credential);
                                                e.push(m)
                                            } else e.push(c.iceServers[g])
                                        }
                                        c.iceServers =
                                            e
                                    }
                                    return new a.mozRTCPeerConnection(c, d)
                                }, a.RTCPeerConnection.prototype = a.mozRTCPeerConnection.prototype, a.mozRTCPeerConnection.generateCertificate && Object.defineProperty(a.RTCPeerConnection, "generateCertificate", {
                                    get: function () {
                                        return a.mozRTCPeerConnection.generateCertificate
                                    }
                                }), a.RTCSessionDescription = a.mozRTCSessionDescription, a.RTCIceCandidate = a.mozRTCIceCandidate);
                                ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (b) {
                                    var c = a.RTCPeerConnection.prototype[b];
                                    a.RTCPeerConnection.prototype[b] =
                                        function () {
                                            arguments[0] = new ("addIceCandidate" === b ? a.RTCIceCandidate : a.RTCSessionDescription)(arguments[0]);
                                            return c.apply(this, arguments)
                                        }
                                });
                                var c = a.RTCPeerConnection.prototype.addIceCandidate;
                                a.RTCPeerConnection.prototype.addIceCandidate = function () {
                                    return arguments[0] ? c.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                                };
                                var d = function (a) {
                                    var b = new Map;
                                    Object.keys(a).forEach(function (c) {
                                        b.set(c, a[c]);
                                        b[c] = a[c]
                                    });
                                    return b
                                }, e = {
                                    inboundrtp: "inbound-rtp",
                                    outboundrtp: "outbound-rtp",
                                    candidatepair: "candidate-pair",
                                    localcandidate: "local-candidate",
                                    remotecandidate: "remote-candidate"
                                }, m = a.RTCPeerConnection.prototype.getStats;
                                a.RTCPeerConnection.prototype.getStats = function (a, c, g) {
                                    return m.apply(this, [a || null]).then(function (a) {
                                        48 > b.version && (a = d(a));
                                        if (53 > b.version && !c) try {
                                            a.forEach(function (a) {
                                                a.type = e[a.type] || a.type
                                            })
                                        } catch (x) {
                                            if ("TypeError" !== x.name) throw x;
                                            a.forEach(function (b, c) {
                                                a.set(c, Object.assign({}, b, {type: e[b.type] || b.type}))
                                            })
                                        }
                                        return a
                                    }).then(c, g)
                                }
                            }
                        }, shimGetUserMedia: c("./getusermedia")
                    }
                },
                    {"../utils": 13, "./getusermedia": 11}], 11: [function (c, a, e) {
                    var h = c("../utils"), b = h.log;
                    a.exports = function (a) {
                        var c = h.detectBrowser(a), d = a && a.navigator;
                        a = a && a.MediaStreamTrack;
                        var e = function (a) {
                            return {
                                name: {
                                    InternalError: "NotReadableError",
                                    NotSupportedError: "TypeError",
                                    PermissionDeniedError: "NotAllowedError",
                                    SecurityError: "NotAllowedError"
                                }[a.name] || a.name,
                                message: {"The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context."}[a.message] || a.message,
                                constraint: a.constraint,
                                toString: function () {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        }, g = function (a, g, h) {
                            var k = function (a) {
                                if ("object" !== typeof a || a.require) return a;
                                var b = [];
                                Object.keys(a).forEach(function (c) {
                                    if ("require" !== c && "advanced" !== c && "mediaSource" !== c) {
                                        var d = a[c] = "object" === typeof a[c] ? a[c] : {ideal: a[c]};
                                        void 0 === d.min && void 0 === d.max && void 0 === d.exact || b.push(c);
                                        void 0 !== d.exact && ("number" === typeof d.exact ? d.min = d.max = d.exact : a[c] = d.exact, delete d.exact);
                                        if (void 0 !== d.ideal) {
                                            a.advanced =
                                                a.advanced || [];
                                            var e = {};
                                            e[c] = "number" === typeof d.ideal ? {min: d.ideal, max: d.ideal} : d.ideal;
                                            a.advanced.push(e);
                                            delete d.ideal;
                                            Object.keys(d).length || delete a[c]
                                        }
                                    }
                                });
                                b.length && (a.require = b);
                                return a
                            };
                            a = JSON.parse(JSON.stringify(a));
                            38 > c.version && (b("spec: " + JSON.stringify(a)), a.audio && (a.audio = k(a.audio)), a.video && (a.video = k(a.video)), b("ff37: " + JSON.stringify(a)));
                            return d.mozGetUserMedia(a, g, function (a) {
                                h(e(a))
                            })
                        }, m = function (a) {
                            return new Promise(function (b, c) {
                                g(a, b, c)
                            })
                        };
                        d.mediaDevices || (d.mediaDevices =
                            {
                                getUserMedia: m, addEventListener: function () {
                                }, removeEventListener: function () {
                                }
                            });
                        d.mediaDevices.enumerateDevices = d.mediaDevices.enumerateDevices || function () {
                            return new Promise(function (a) {
                                a([{
                                    kind: "audioinput",
                                    deviceId: "default",
                                    label: "",
                                    groupId: ""
                                }, {kind: "videoinput", deviceId: "default", label: "", groupId: ""}])
                            })
                        };
                        if (41 > c.version) {
                            var n = d.mediaDevices.enumerateDevices.bind(d.mediaDevices);
                            d.mediaDevices.enumerateDevices = function () {
                                return n().then(void 0, function (a) {
                                    if ("NotFoundError" === a.name) return [];
                                    throw a;
                                })
                            }
                        }
                        if (49 > c.version) {
                            var k = d.mediaDevices.getUserMedia.bind(d.mediaDevices);
                            d.mediaDevices.getUserMedia = function (a) {
                                return k(a).then(function (b) {
                                    if (a.audio && !b.getAudioTracks().length || a.video && !b.getVideoTracks().length) throw b.getTracks().forEach(function (a) {
                                        a.stop()
                                    }), new DOMException("The object can not be found here.", "NotFoundError");
                                    return b
                                }, function (a) {
                                    return Promise.reject(e(a))
                                })
                            }
                        }
                        if (!(55 < c.version && "autoGainControl" in d.mediaDevices.getSupportedConstraints())) {
                            var p = function (a,
                                              b, c) {
                                b in a && !(c in a) && (a[c] = a[b], delete a[b])
                            }, t = d.mediaDevices.getUserMedia.bind(d.mediaDevices);
                            d.mediaDevices.getUserMedia = function (a) {
                                "object" === typeof a && "object" === typeof a.audio && (a = JSON.parse(JSON.stringify(a)), p(a.audio, "autoGainControl", "mozAutoGainControl"), p(a.audio, "noiseSuppression", "mozNoiseSuppression"));
                                return t(a)
                            };
                            if (a && a.prototype.getSettings) {
                                var y = a.prototype.getSettings;
                                a.prototype.getSettings = function () {
                                    var a = y.apply(this, arguments);
                                    p(a, "mozAutoGainControl", "autoGainControl");
                                    p(a, "mozNoiseSuppression", "noiseSuppression");
                                    return a
                                }
                            }
                            if (a && a.prototype.applyConstraints) {
                                var B = a.prototype.applyConstraints;
                                a.prototype.applyConstraints = function (a) {
                                    "audio" === this.kind && "object" === typeof a && (a = JSON.parse(JSON.stringify(a)), p(a, "autoGainControl", "mozAutoGainControl"), p(a, "noiseSuppression", "mozNoiseSuppression"));
                                    return B.apply(this, [a])
                                }
                            }
                        }
                        d.getUserMedia = function (a, b, e) {
                            if (44 > c.version) return g(a, b, e);
                            h.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
                            d.mediaDevices.getUserMedia(a).then(b, e)
                        }
                    }
                }, {"../utils": 13}], 12: [function (c, a, e) {
                    var h = c("../utils");
                    a.exports = {
                        shimCallbacksAPI: function (a) {
                            if ("object" === typeof a && a.RTCPeerConnection) {
                                a = a.RTCPeerConnection.prototype;
                                var b = a.createOffer, c = a.createAnswer, d = a.setLocalDescription,
                                    e = a.setRemoteDescription, h = a.addIceCandidate;
                                a.createOffer = function (a, c) {
                                    var d = b.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]]);
                                    if (!c) return d;
                                    d.then(a, c);
                                    return Promise.resolve()
                                };
                                a.createAnswer = function (a, b) {
                                    var d =
                                        c.apply(this, [2 <= arguments.length ? arguments[2] : arguments[0]]);
                                    if (!b) return d;
                                    d.then(a, b);
                                    return Promise.resolve()
                                };
                                var m = function (a, b, c) {
                                    a = d.apply(this, [a]);
                                    if (!c) return a;
                                    a.then(b, c);
                                    return Promise.resolve()
                                };
                                a.setLocalDescription = m;
                                m = function (a, b, c) {
                                    a = e.apply(this, [a]);
                                    if (!c) return a;
                                    a.then(b, c);
                                    return Promise.resolve()
                                };
                                a.setRemoteDescription = m;
                                m = function (a, b, c) {
                                    a = h.apply(this, [a]);
                                    if (!c) return a;
                                    a.then(b, c);
                                    return Promise.resolve()
                                };
                                a.addIceCandidate = m
                            }
                        }, shimLocalStreamsAPI: function (a) {
                            if ("object" ===
                                typeof a && a.RTCPeerConnection) {
                                "getLocalStreams" in a.RTCPeerConnection.prototype || (a.RTCPeerConnection.prototype.getLocalStreams = function () {
                                    this._localStreams || (this._localStreams = []);
                                    return this._localStreams
                                });
                                "getStreamById" in a.RTCPeerConnection.prototype || (a.RTCPeerConnection.prototype.getStreamById = function (a) {
                                    var b = null;
                                    this._localStreams && this._localStreams.forEach(function (c) {
                                        c.id === a && (b = c)
                                    });
                                    this._remoteStreams && this._remoteStreams.forEach(function (c) {
                                        c.id === a && (b = c)
                                    });
                                    return b
                                });
                                if (!("addStream" in
                                    a.RTCPeerConnection.prototype)) {
                                    var b = a.RTCPeerConnection.prototype.addTrack;
                                    a.RTCPeerConnection.prototype.addStream = function (a) {
                                        this._localStreams || (this._localStreams = []);
                                        -1 === this._localStreams.indexOf(a) && this._localStreams.push(a);
                                        var c = this;
                                        a.getTracks().forEach(function (d) {
                                            b.call(c, d, a)
                                        })
                                    };
                                    a.RTCPeerConnection.prototype.addTrack = function (a, c) {
                                        c && (this._localStreams ? -1 === this._localStreams.indexOf(c) && this._localStreams.push(c) : this._localStreams = [c]);
                                        b.call(this, a, c)
                                    }
                                }
                                "removeStream" in a.RTCPeerConnection.prototype ||
                                (a.RTCPeerConnection.prototype.removeStream = function (a) {
                                    this._localStreams || (this._localStreams = []);
                                    var b = this._localStreams.indexOf(a);
                                    if (-1 !== b) {
                                        this._localStreams.splice(b, 1);
                                        var c = this, e = a.getTracks();
                                        this.getSenders().forEach(function (a) {
                                            -1 !== e.indexOf(a.track) && c.removeTrack(a)
                                        })
                                    }
                                })
                            }
                        }, shimRemoteStreamsAPI: function (a) {
                            "object" === typeof a && a.RTCPeerConnection && ("getRemoteStreams" in a.RTCPeerConnection.prototype || (a.RTCPeerConnection.prototype.getRemoteStreams = function () {
                                return this._remoteStreams ?
                                    this._remoteStreams : []
                            }), "onaddstream" in a.RTCPeerConnection.prototype || Object.defineProperty(a.RTCPeerConnection.prototype, "onaddstream", {
                                get: function () {
                                    return this._onaddstream
                                }, set: function (a) {
                                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly));
                                    this.addEventListener("addstream", this._onaddstream = a);
                                    this.addEventListener("track", this._onaddstreampoly = function (a) {
                                        var b = a.streams[0];
                                        this._remoteStreams || (this._remoteStreams =
                                            []);
                                        0 <= this._remoteStreams.indexOf(b) || (this._remoteStreams.push(b), b = new Event("addstream"), b.stream = a.streams[0], this.dispatchEvent(b))
                                    }.bind(this))
                                }
                            }))
                        }, shimGetUserMedia: function (a) {
                            var b = a && a.navigator;
                            b.getUserMedia || (b.webkitGetUserMedia ? b.getUserMedia = b.webkitGetUserMedia.bind(b) : b.mediaDevices && b.mediaDevices.getUserMedia && (b.getUserMedia = function (a, c, e) {
                                b.mediaDevices.getUserMedia(a).then(c, e)
                            }.bind(b)))
                        }, shimRTCIceServerUrls: function (a) {
                            var b = a.RTCPeerConnection;
                            a.RTCPeerConnection = function (a,
                                                            c) {
                                if (a && a.iceServers) {
                                    for (var d = [], e = 0; e < a.iceServers.length; e++) {
                                        var g = a.iceServers[e];
                                        !g.hasOwnProperty("urls") && g.hasOwnProperty("url") ? (h.deprecated("RTCIceServer.url", "RTCIceServer.urls"), g = JSON.parse(JSON.stringify(g)), g.urls = g.url, delete g.url, d.push(g)) : d.push(a.iceServers[e])
                                    }
                                    a.iceServers = d
                                }
                                return new b(a, c)
                            };
                            a.RTCPeerConnection.prototype = b.prototype;
                            "generateCertificate" in a.RTCPeerConnection && Object.defineProperty(a.RTCPeerConnection, "generateCertificate", {
                                get: function () {
                                    return b.generateCertificate
                                }
                            })
                        },
                        shimTrackEventTransceiver: function (a) {
                            "object" === typeof a && a.RTCPeerConnection && "receiver" in a.RTCTrackEvent.prototype && !a.RTCTransceiver && Object.defineProperty(a.RTCTrackEvent.prototype, "transceiver", {
                                get: function () {
                                    return {receiver: this.receiver}
                                }
                            })
                        }, shimCreateOfferLegacy: function (a) {
                            var b = a.RTCPeerConnection.prototype.createOffer;
                            a.RTCPeerConnection.prototype.createOffer = function (a) {
                                if (a) {
                                    var c = this.getTransceivers().find(function (a) {
                                        return a.sender.track && "audio" === a.sender.track.kind
                                    });
                                    !1 === a.offerToReceiveAudio &&
                                    c ? "sendrecv" === c.direction ? c.setDirection("sendonly") : "recvonly" === c.direction && c.setDirection("inactive") : !0 !== a.offerToReceiveAudio || c || this.addTransceiver("audio");
                                    c = this.getTransceivers().find(function (a) {
                                        return a.sender.track && "video" === a.sender.track.kind
                                    });
                                    !1 === a.offerToReceiveVideo && c ? "sendrecv" === c.direction ? c.setDirection("sendonly") : "recvonly" === c.direction && c.setDirection("inactive") : !0 !== a.offerToReceiveVideo || c || this.addTransceiver("video")
                                }
                                return b.apply(this, arguments)
                            }
                        }
                    }
                }, {"../utils": 13}],
                13: [function (c, a, e) {
                    var h = !0, b = !0;
                    c = {
                        disableLog: function (a) {
                            return "boolean" !== typeof a ? Error("Argument type: " + typeof a + ". Please use a boolean.") : (h = a) ? "adapter.js logging disabled" : "adapter.js logging enabled"
                        }, disableWarnings: function (a) {
                            if ("boolean" !== typeof a) return Error("Argument type: " + typeof a + ". Please use a boolean.");
                            b = !a;
                            return "adapter.js deprecation warnings " + (a ? "disabled" : "enabled")
                        }, log: function () {
                            "object" !== typeof window || h || "undefined" !== typeof console && "function" === typeof console.log &&
                            console.log.apply(console, arguments)
                        }, deprecated: function (a, c) {
                            b && console.warn(a + " is deprecated, please use " + c + " instead.")
                        }, extractVersion: function (a, b, c) {
                            return (a = a.match(b)) && a.length >= c && parseInt(a[c], 10)
                        }, detectBrowser: function (a) {
                            var b = a && a.navigator, c = {browser: null, version: null};
                            if ("undefined" === typeof a || !a.navigator) return c.browser = "Not a browser.", c;
                            b.mozGetUserMedia ? (c.browser = "firefox", c.version = this.extractVersion(b.userAgent, /Firefox\/(\d+)\./, 1)) : b.webkitGetUserMedia ? a.webkitRTCPeerConnection ?
                                (c.browser = "chrome", c.version = this.extractVersion(b.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) : b.userAgent.match(/Version\/(\d+).(\d+)/) ? (c.browser = "safari", c.version = this.extractVersion(b.userAgent, /AppleWebKit\/(\d+)\./, 1)) : c.browser = "Unsupported webkit-based browser with GUM support but no WebRTC support." : b.mediaDevices && b.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (c.browser = "edge", c.version = this.extractVersion(b.userAgent, /Edge\/(\d+).(\d+)$/, 2)) : b.mediaDevices && b.userAgent.match(/AppleWebKit\/(\d+)\./) ?
                                (c.browser = "safari", c.version = this.extractVersion(b.userAgent, /AppleWebKit\/(\d+)\./, 1)) : c.browser = "Not a supported browser.";
                            return c
                        }
                    };
                    a.exports = {
                        log: c.log,
                        deprecated: c.deprecated,
                        disableLog: c.disableLog,
                        disableWarnings: c.disableWarnings,
                        extractVersion: c.extractVersion,
                        shimCreateObjectURL: c.shimCreateObjectURL,
                        detectBrowser: c.detectBrowser.bind(c)
                    }
                }, {}]
            }, {}, [3])(3)
        }()
    }).call(p, h(24))
}, function (n, p, h) {
    h(50)(h(51))
}, function (n, p) {
    n.exports = function (h) {
        function e(e) {
            "undefined" !== typeof console && (console.error ||
                console.log)("[Script Loader]", e)
        }

        try {
            "undefined" !== typeof execScript && "undefined" !== typeof attachEvent && "undefined" === typeof addEventListener ? execScript(h) : "undefined" !== typeof eval ? eval.call(null, h) : e("EvalError: No eval function available")
        } catch (f) {
            e(f)
        }
    }
}, function (n, p) {
    n.exports = "/* globals $$, jQuery, Elements, document, window, L */\n\n/**\n* Copyright 2013 Marc J. Schmidt. See the LICENSE file at the top-level\n* directory of this distribution and at\n* https://github.com/marcj/css-element-queries/blob/master/LICENSE.\n*/\nthis.L \x3d this.L || {};\n\n/**\n * @param {HTMLElement} element\n * @param {String}      prop\n * @returns {String|Number}\n */\nL.GetComputedStyle \x3d (computedElement, prop) \x3d\x3e {\n  if (computedElement.currentStyle) {\n    return computedElement.currentStyle[prop];\n  } else if (window.getComputedStyle) {\n    return window.getComputedStyle(computedElement, null).getPropertyValue(prop);\n  }\n  return computedElement.style[prop];\n};\n\n  /**\n   *\n   * @type {Function}\n   * @constructor\n   */\nL.ElementQueries \x3d function ElementQueries() {\n      /**\n       *\n       * @param element\n       * @returns {Number}\n       */\n  function getEmSize(element \x3d document.documentElement) {\n    const fontSize \x3d L.GetComputedStyle(element, 'fontSize');\n    return parseFloat(fontSize) || 16;\n  }\n\n      /**\n       *\n       * @copyright https://github.com/Mr0grog/element-query/blob/master/LICENSE\n       *\n       * @param element\n       * @param value\n       * @param units\n       * @returns {*}\n       */\n  function convertToPx(element, originalValue) {\n    let vh;\n    let vw;\n    let chooser;\n    const units \x3d originalValue.replace(/[0-9]*/, '');\n    const value \x3d parseFloat(originalValue);\n    switch (units) {\n      case 'px':\n        return value;\n      case 'em':\n        return value * getEmSize(element);\n      case 'rem':\n        return value * getEmSize();\n              // Viewport units!\n              // According to http://quirksmode.org/mobile/tableViewport.html\n              // documentElement.clientWidth/Height gets us the most reliable info\n      case 'vw':\n        return (value * document.documentElement.clientWidth) / 100;\n      case 'vh':\n        return (value * document.documentElement.clientHeight) / 100;\n      case 'vmin':\n      case 'vmax':\n        vw \x3d document.documentElement.clientWidth / 100;\n        vh \x3d document.documentElement.clientHeight / 100;\n        chooser \x3d Math[units \x3d\x3d\x3d 'vmin' ? 'min' : 'max'];\n        return value * chooser(vw, vh);\n      default:\n        return value;\n              // for now, not supporting physical units (since they are just a set number of px)\n              // or ex/ch (getting accurate measurements is hard)\n    }\n  }\n\n      /**\n       *\n       * @param {HTMLElement} element\n       * @constructor\n       */\n  function SetupInformation(element) {\n    this.element \x3d element;\n    this.options \x3d [];\n    let i;\n    let j;\n    let option;\n    let width \x3d 0;\n    let height \x3d 0;\n    let value;\n    let actualValue;\n    let attrValues;\n    let attrValue;\n    let attrName;\n\n          /**\n           * @param option {mode: 'min|max', property: 'width|height', value: '123px'}\n           */\n    this.addOption \x3d (newOption) \x3d\x3e {\n      this.options.push(newOption);\n    };\n\n    const attributes \x3d ['min-width', 'min-height', 'max-width', 'max-height'];\n\n          /**\n           * Extracts the computed width/height and sets to min/max- attribute.\n           */\n    this.call \x3d () \x3d\x3e {\n              // extract current dimensions\n      width \x3d this.element.offsetWidth;\n      height \x3d this.element.offsetHeight;\n\n      attrValues \x3d {};\n\n      for (i \x3d 0, j \x3d this.options.length; i \x3c j; i +\x3d 1) {\n        option \x3d this.options[i];\n        value \x3d convertToPx(this.element, option.value);\n\n        actualValue \x3d option.property \x3d\x3d\x3d 'width' ? width : height;\n        attrName \x3d `${option.mode}-${option.property}`;\n        attrValue \x3d '';\n\n        if (option.mode \x3d\x3d\x3d 'min' \x26\x26 actualValue \x3e\x3d value) {\n          attrValue +\x3d option.value;\n        }\n\n        if (option.mode \x3d\x3d\x3d 'max' \x26\x26 actualValue \x3c\x3d value) {\n          attrValue +\x3d option.value;\n        }\n\n        if (!attrValues[attrName]) attrValues[attrName] \x3d '';\n        if (attrValue \x26\x26 (` ${attrValues[attrName]} `)\n                                            .indexOf(` ${attrValue} `) \x3d\x3d\x3d -1) {\n          attrValues[attrName] +\x3d ` ${attrValue}`;\n        }\n      }\n\n      for (let k \x3d 0; k \x3c attributes.length; k +\x3d 1) {\n        if (attrValues[attributes[k]]) {\n          this.element.setAttribute(attributes[k],\n                                                attrValues[attributes[k]].substr(1));\n        } else {\n          this.element.removeAttribute(attributes[k]);\n        }\n      }\n    };\n  }\n\n      /**\n       * @param {HTMLElement} element\n       * @param {Object}      options\n       */\n  function setupElement(originalElement, options) {\n    const element \x3d originalElement;\n    if (element.elementQueriesSetupInformation) {\n      element.elementQueriesSetupInformation.addOption(options);\n    } else {\n      element.elementQueriesSetupInformation \x3d new SetupInformation(element);\n      element.elementQueriesSetupInformation.addOption(options);\n      element.sensor \x3d new L.ResizeSensor(element, () \x3d\x3e {\n        element.elementQueriesSetupInformation.call();\n      });\n    }\n    element.elementQueriesSetupInformation.call();\n    return element;\n  }\n\n      /**\n       * @param {String} selector\n       * @param {String} mode min|max\n       * @param {String} property width|height\n       * @param {String} value\n       */\n  function queueQuery(selector, mode, property, value) {\n    let query;\n    if (document.querySelectorAll) query \x3d document.querySelectorAll.bind(document);\n    if (!query \x26\x26 typeof $$ !\x3d\x3d 'undefined') query \x3d $$;\n    if (!query \x26\x26 typeof jQuery !\x3d\x3d 'undefined') query \x3d jQuery;\n\n    if (!query) {\n      throw new Error('No document.querySelectorAll, jQuery or Mootools\\'s $$ found.');\n    }\n\n    const elements \x3d query(selector) || [];\n    for (let i \x3d 0, j \x3d elements.length; i \x3c j; i +\x3d 1) {\n      elements[i] \x3d setupElement(elements[i], {\n        mode,\n        property,\n        value,\n      });\n    }\n  }\n\n  const regex \x3d /,?([^,\\n]*)\\[[\\s\\t]*(min|max)-(width|height)[\\s\\t]*[~$^]?\x3d[\\s\\t]*\"([^\"]*)\"[\\s\\t]*]([^\\n\\s{]*)/mgi;  // jshint ignore:line\n\n      /**\n       * @param {String} css\n       */\n  function extractQuery(originalCss) {\n    let match;\n    const css \x3d originalCss.replace(/'/g, '\"');\n    while ((match \x3d regex.exec(css)) !\x3d\x3d null) {\n      if (match.length \x3e 5) {\n        queueQuery(match[1] || match[5], match[2], match[3], match[4]);\n      }\n    }\n  }\n\n      /**\n       * @param {CssRule[]|String} rules\n       */\n  function readRules(originalRules) {\n    if (!originalRules) {\n      return;\n    }\n    let selector \x3d '';\n    let rules \x3d originalRules;\n    if (typeof originalRules \x3d\x3d\x3d 'string') {\n      rules \x3d originalRules.toLowerCase();\n      if (rules.indexOf('min-width') !\x3d\x3d -1 || rules.indexOf('max-width') !\x3d\x3d -1) {\n        extractQuery(rules);\n      }\n    } else {\n      for (let i \x3d 0, j \x3d rules.length; i \x3c j; i +\x3d 1) {\n        if (rules[i].type \x3d\x3d\x3d 1) {\n          selector \x3d rules[i].selectorText || rules[i].cssText;\n          if (selector.indexOf('min-height') !\x3d\x3d -1 ||\n                          selector.indexOf('max-height') !\x3d\x3d -1) {\n            extractQuery(selector);\n          } else if (selector.indexOf('min-width') !\x3d\x3d -1 ||\n                                 selector.indexOf('max-width') !\x3d\x3d -1) {\n            extractQuery(selector);\n          }\n        } else if (rules[i].type \x3d\x3d\x3d 4) {\n          readRules(rules[i].cssRules || rules[i].rules);\n        }\n      }\n    }\n  }\n\n      /**\n       * Searches all css rules and setups the event listener\n       * to all elements with element query rules..\n       */\n  this.init \x3d () \x3d\x3e {\n    const styleSheets \x3d document.styleSheets || [];\n    for (let i \x3d 0, j \x3d styleSheets.length; i \x3c j; i +\x3d 1) {\n      if (Object.prototype.hasOwnProperty.call(styleSheets[i], 'cssText')) {\n        readRules(styleSheets[i].cssText);\n      } else if (Object.prototype.hasOwnProperty.call(styleSheets[i], 'cssRules')) {\n        readRules(styleSheets[i].cssRules);\n      } else if (Object.prototype.hasOwnProperty.call(styleSheets[i], 'rules')) {\n        readRules(styleSheets[i].rules);\n      }\n    }\n  };\n};\n\nfunction init() {\n  (new L.ElementQueries()).init();\n}\n\nif (window.addEventListener) {\n  window.addEventListener('load', init, false);\n} else {\n  window.attachEvent('onload', init);\n}\n\n  /**\n   * Iterate over each of the provided element(s).\n   *\n   * @param {HTMLElement|HTMLElement[]} elements\n   * @param {Function}                  callback\n   */\nfunction forEachElement(elements, callback \x3d () \x3d\x3e {}) {\n  const elementsType \x3d Object.prototype.toString.call(elements);\n  const isCollectionTyped \x3d (elementsType \x3d\x3d\x3d '[object Array]' ||\n          (elementsType \x3d\x3d\x3d '[object NodeList]') ||\n          (elementsType \x3d\x3d\x3d '[object HTMLCollection]') ||\n          (typeof jQuery !\x3d\x3d 'undefined' \x26\x26 elements instanceof jQuery) || // jquery\n          (typeof Elements !\x3d\x3d 'undefined' \x26\x26 elements instanceof Elements) // mootools\n      );\n  let i \x3d 0;\n  const j \x3d elements.length;\n  if (isCollectionTyped) {\n    for (; i \x3c j; i +\x3d 1) {\n      callback(elements[i]);\n    }\n  } else {\n    callback(elements);\n  }\n}\n  /**\n   * Class for dimension change detection.\n   *\n   * @param {Element|Element[]|Elements|jQuery} element\n   * @param {Function} callback\n   *\n   * @constructor\n   */\nL.ResizeSensor \x3d function ResizeSensor(element, callback \x3d () \x3d\x3e {}) {\n      /**\n       *\n       * @constructor\n       */\n  function EventQueue() {\n    let q \x3d [];\n    this.add \x3d (ev) \x3d\x3e {\n      q.push(ev);\n    };\n\n    let i;\n    let j;\n    this.call \x3d () \x3d\x3e {\n      for (i \x3d 0, j \x3d q.length; i \x3c j; i +\x3d 1) {\n        q[i].call();\n      }\n    };\n\n    this.remove \x3d (ev) \x3d\x3e {\n      const newQueue \x3d [];\n      for (i \x3d 0, j \x3d q.length; i \x3c j; i +\x3d 1) {\n        if (q[i] !\x3d\x3d ev) newQueue.push(q[i]);\n      }\n      q \x3d newQueue;\n    };\n\n    this.length \x3d () \x3d\x3e q.length;\n  }\n\n      /**\n       *\n       * @param {HTMLElement} element\n       * @param {Function}    resized\n       */\n  function attachResizeEvent(htmlElement, resized) {\n    // Only used for the dirty checking, so the event callback count is limted\n    //  to max 1 call per fps per sensor.\n    // In combination with the event based resize sensor this saves cpu time,\n    // because the sensor is too fast and\n    // would generate too many unnecessary events.\n    const customRequestAnimationFrame \x3d window.requestAnimationFrame ||\n    window.mozRequestAnimationFrame ||\n    window.webkitRequestAnimationFrame ||\n    function delay(fn) {\n      return window.setTimeout(fn, 20);\n    };\n\n    const newElement \x3d htmlElement;\n    if (!newElement.resizedAttached) {\n      newElement.resizedAttached \x3d new EventQueue();\n      newElement.resizedAttached.add(resized);\n    } else if (newElement.resizedAttached) {\n      newElement.resizedAttached.add(resized);\n      return;\n    }\n\n    newElement.resizeSensor \x3d document.createElement('div');\n    newElement.resizeSensor.className \x3d 'resize-sensor';\n    const style \x3d 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; ' +\n                      'overflow: hidden; z-index: -1; visibility: hidden;';\n    const styleChild \x3d 'position: absolute; left: 0; top: 0; transition: 0s;';\n\n    newElement.resizeSensor.style.cssText \x3d style;\n    newElement.resizeSensor.innerHTML \x3d\n              `\x3cdiv class\x3d\"resize-sensor-expand\" style\x3d\"${style}\"\x3e` +\n                  `\x3cdiv style\x3d\"${styleChild}\"\x3e\x3c/div\x3e` +\n              '\x3c/div\x3e' +\n              `\x3cdiv class\x3d\"resize-sensor-shrink\" style\x3d\"${style}\"\x3e` +\n                  `\x3cdiv style\x3d\"${styleChild} width: 200%; height: 200%\"\x3e\x3c/div\x3e` +\n              '\x3c/div\x3e';\n    newElement.appendChild(newElement.resizeSensor);\n\n    if (L.GetComputedStyle(newElement, 'position') \x3d\x3d\x3d 'static') {\n      newElement.style.position \x3d 'relative';\n    }\n\n    const expand \x3d newElement.resizeSensor.childNodes[0];\n    const expandChild \x3d expand.childNodes[0];\n    const shrink \x3d newElement.resizeSensor.childNodes[1];\n\n    const reset \x3d () \x3d\x3e {\n      expandChild.style.width \x3d `${100000}px`;\n      expandChild.style.height \x3d `${100000}px`;\n\n      expand.scrollLeft \x3d 100000;\n      expand.scrollTop \x3d 100000;\n\n      shrink.scrollLeft \x3d 100000;\n      shrink.scrollTop \x3d 100000;\n    };\n\n    reset();\n    let dirty \x3d false;\n\n    const dirtyChecking \x3d () \x3d\x3e {\n      if (!newElement.resizedAttached) return;\n\n      if (dirty) {\n        newElement.resizedAttached.call();\n        dirty \x3d false;\n      }\n\n      customRequestAnimationFrame(dirtyChecking);\n    };\n\n    customRequestAnimationFrame(dirtyChecking);\n    let lastWidth;\n    let lastHeight;\n    let cachedWidth;\n    let cachedHeight; // useful to not query offsetWidth twice\n\n    const onScroll \x3d () \x3d\x3e {\n      if ((cachedWidth \x3d newElement.offsetWidth) !\x3d\x3d lastWidth ||\n                (cachedHeight \x3d newElement.offsetHeight) !\x3d\x3d lastHeight) {\n        dirty \x3d true;\n\n        lastWidth \x3d cachedWidth;\n        lastHeight \x3d cachedHeight;\n      }\n      reset();\n    };\n\n    const addEvent \x3d (el, name, cb) \x3d\x3e {\n      if (el.attachEvent) {\n        el.attachEvent(`on${name}`, cb);\n      } else {\n        el.addEventListener(name, cb);\n      }\n    };\n\n    addEvent(expand, 'scroll', onScroll);\n    addEvent(shrink, 'scroll', onScroll);\n  }\n\n  forEachElement(element, (elem) \x3d\x3e {\n    attachResizeEvent(elem, callback);\n  });\n\n  this.detach \x3d (ev) \x3d\x3e {\n    L.ResizeSensor.detach(element, ev);\n  };\n};\n\nL.ResizeSensor.detach \x3d (element, ev) \x3d\x3e {\n  forEachElement(element, (elem) \x3d\x3e {\n    const elementItem \x3d elem;\n    if (elementItem.resizedAttached \x26\x26 typeof ev \x3d\x3d\x3d 'function') {\n      elementItem.resizedAttached.remove(ev);\n      if (elementItem.resizedAttached.length()) return;\n    }\n    if (elementItem.resizeSensor) {\n      if (elementItem.contains(elementItem.resizeSensor)) {\n        elementItem.removeChild(elementItem.resizeSensor);\n      }\n      delete elementItem.resizeSensor;\n      delete elementItem.resizedAttached;\n    }\n  });\n};\n"
}])["default"];
//# sourceMappingURL=erizo.js.map
