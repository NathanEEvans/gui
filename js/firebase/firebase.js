(function() {
    function g(a) {
        throw a;
    }
    var j = void 0, k = !0, l = null, o = !1;
    function aa(a) {
        return function() {
            return this[a]
        }
    }
    function q(a) {
        return function() {
            return a
        }
    }
    var r, ba = this;
    function ca() {
    }
    function da(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return"array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return"object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return"array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return"function"
            } else
                return"null";
        else if ("function" == b && "undefined" == typeof a.call)
            return"object";
        return b
    }
    function t(a) {
        return a !== j
    }
    function ea(a) {
        var b = da(a);
        return"array" == b || "object" == b && "number" == typeof a.length
    }
    function u(a) {
        return"string" == typeof a
    }
    function fa(a) {
        return"number" == typeof a
    }
    function ga(a) {
        var b = typeof a;
        return"object" == b && a != l || "function" == b
    }
    Math.floor(2147483648 * Math.random()).toString(36);
    function ha(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function ia(a, b, c) {
        a || g(Error());
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function v(a, b, c) {
        v = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
        return v.apply(l, arguments)
    }
    function ja(a, b) {
        function c() {
        }
        c.prototype = b.prototype;
        a.Md = b.prototype;
        a.prototype = new c
    }
    ;
    function ka(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
            try {
                return eval("(" + a + ")")
            } catch (b) {
            }
        g(Error("Invalid JSON string: " + a))
    }
    function la() {
        this.Xb = j
    }
    function ma(a, b, c) {
        switch (typeof b) {
            case "string":
                na(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (b == l) {
                    c.push("null");
                    break
                }
                if ("array" == da(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)
                        c.push(e), e = b[f], ma(a, a.Xb ? a.Xb.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)
                    Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d),
                            na(f, c), c.push(":"), ma(a, a.Xb ? a.Xb.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                g(Error("Unknown type: " + typeof b))
            }
    }
    var oa = {'"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b"}, pa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    function na(a, b) {
        b.push('"', a.replace(pa, function(a) {
            if (a in oa)
                return oa[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return oa[a] = e + b.toString(16)
        }), '"')
    }
    ;
    function y(a) {
        if ("undefined" !== typeof JSON && t(JSON.stringify))
            a = JSON.stringify(a);
        else {
            var b = [];
            ma(new la, a, b);
            a = b.join("")
        }
        return a
    }
    ;
    function qa(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            55296 <= e && 56319 >= e && (e -= 55296, d++, z(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
        }
        return b
    }
    ;
    function A(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        e && g(Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + "."))
    }
    function B(a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                ra.assert(o, "errorPrefix_ called with argumentNumber > 4.  Need to update it?")
        }
        return a + " failed: " + (d + " argument ")
    }
    function C(a, b, c, d) {
        (!d || t(c)) && "function" != da(c) && g(Error(B(a, b, d) + "must be a valid function."))
    }
    function sa(a, b, c) {
        t(c) && (!ga(c) || c === l) && g(Error(B(a, b, k) + "must be a valid context object."))
    }
    ;
    function D(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    function ta(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b))
            return a[b]
    }
    ;
    var ua = {}, ra = {}, va = /[\[\].#$\/]/, wa = /[\[\].#$]/;
    function xa(a) {
        return u(a) && 0 !== a.length && !va.test(a)
    }
    function ya(a, b, c) {
        (!c || t(b)) && za(B(a, 1, c), b)
    }
    function za(a, b, c, d) {
        c || (c = 0);
        d || (d = []);
        t(b) || g(Error(a + "contains undefined" + Aa(d)));
        "function" == da(b) && g(Error(a + "contains a function" + Aa(d) + " with contents: " + b.toString()));
        Ba(b) && g(Error(a + "contains " + b.toString() + Aa(d)));
        1E3 < c && g(new TypeError(a + "contains a cyclic object value (" + d.slice(0, 100).join(".") + "...)"));
        u(b) && (b.length > 10485760 / 3 && 10485760 < ua.Nd.Ld(b).length) && g(Error(a + "contains a string greater than 10485760 utf8 bytes" + Aa(d) + " ('" + b.substring(0, 50) + "...')"));
        if (ga(b))
            for (var e in b)
                D(b,
                        e) && (".priority" !== e && (".value" !== e && !xa(e)) && g(Error(a + "contains an invalid key (" + e + ")" + Aa(d) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"')), d.push(e), za(a, b[e], c + 1, d), d.pop())
    }
    function Aa(a) {
        return 0 == a.length ? "" : " in property '" + a.join(".") + "'"
    }
    function Ca(a, b) {
        ga(b) || g(Error(B(a, 1, o) + " must be an object containing the children to replace."));
        ya(a, b, o)
    }
    function Da(a, b, c, d) {
        (!d || t(c)) && (c !== l && !fa(c) && !u(c)) && g(Error(B(a, b, d) + "must be a valid firebase priority (null or a string.)"))
    }
    function Ea(a, b, c) {
        if (!c || t(b))
            switch (b) {
                case "value":
                case "child_added":
                case "child_removed":
                case "child_changed":
                case "child_moved":
                    break;
                default:
                    g(Error(B(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".'))
                }
    }
    function Fa(a, b) {
        t(b) && !xa(b) && g(Error(B(a, 2, k) + 'must be a valid firebase key (non-empty string, not containing ".", "#", "$", "/", "[", or "]").'))
    }
    function Ga(a, b) {
        (!u(b) || 0 === b.length || wa.test(b)) && g(Error(B(a, 1, o) + 'must be a non-empty string and can\'t contain ".", "#", "$", "[", or "]".'))
    }
    function E(a, b) {
        ".info" === F(b) && g(Error(a + " failed: Can't modify data under /.info/"))
    }
    ;
    function H(a, b, c, d, e, f, h) {
        this.u = a;
        this.path = b;
        this.ua = c;
        this.ca = d;
        this.ma = e;
        this.sa = f;
        this.Na = h;
        t(this.ca) && (t(this.sa) && t(this.ua)) && g("Query: Can't combine startAt(), endAt(), and limit().")
    }
    H.prototype.qc = function(a, b) {
        A("Query.on", 2, 4, arguments.length);
        Ea("Query.on", a, o);
        C("Query.on", 2, b, o);
        var c = Ha("Query.on", arguments[2], arguments[3]);
        this.u.Eb(this, a, b, c.cancel, c.Z);
        return b
    };
    H.prototype.on = H.prototype.qc;
    H.prototype.Kb = function(a, b, c) {
        A("Query.off", 0, 3, arguments.length);
        Ea("Query.off", a, k);
        C("Query.off", 2, b, k);
        sa("Query.off", 3, c);
        this.u.Wb(this, a, b, c)
    };
    H.prototype.off = H.prototype.Kb;
    H.prototype.xd = function(a, b) {
        function c(h) {
            f && (f = o, e.Kb(a, c), b.call(d.Z, h))
        }
        A("Query.once", 2, 4, arguments.length);
        Ea("Query.once", a, o);
        C("Query.once", 2, b, o);
        var d = Ha("Query.once", arguments[2], arguments[3]), e = this, f = k;
        this.qc(a, c, function() {
            e.Kb(a, c);
            d.cancel && d.cancel.call(d.Z)
        })
    };
    H.prototype.once = H.prototype.xd;
    H.prototype.sd = function(a) {
        A("Query.limit", 1, 1, arguments.length);
        (!fa(a) || Math.floor(a) !== a || 0 >= a) && g("Query.limit: First argument must be a positive integer.");
        return new H(this.u, this.path, a, this.ca, this.ma, this.sa, this.Na)
    };
    H.prototype.limit = H.prototype.sd;
    H.prototype.Hd = function(a, b) {
        A("Query.startAt", 0, 2, arguments.length);
        Da("Query.startAt", 1, a, k);
        Fa("Query.startAt", b);
        t(a) || (b = a = l);
        return new H(this.u, this.path, this.ua, a, b, this.sa, this.Na)
    };
    H.prototype.startAt = H.prototype.Hd;
    H.prototype.md = function(a, b) {
        A("Query.endAt", 0, 2, arguments.length);
        Da("Query.endAt", 1, a, k);
        Fa("Query.endAt", b);
        return new H(this.u, this.path, this.ua, this.ca, this.ma, a, b)
    };
    H.prototype.endAt = H.prototype.md;
    function Ia(a) {
        var b = {};
        t(a.ca) && (b.sp = a.ca);
        t(a.ma) && (b.sn = a.ma);
        t(a.sa) && (b.ep = a.sa);
        t(a.Na) && (b.en = a.Na);
        t(a.ua) && (b.l = a.ua);
        t(a.ca) && (t(a.ma) && a.ca === l && a.ma === l) && (b.vf = "l");
        return b
    }
    H.prototype.Fa = function() {
        var a = Ja(Ia(this));
        return"{}" === a ? "default" : a
    };
    function Ha(a, b, c) {
        var d = {};
        b && c ? (d.cancel = b, C(a, 3, d.cancel, k), d.Z = c, sa(a, 4, d.Z)) : b && ("object" === typeof b && b !== l ? d.Z = b : "function" === typeof b ? d.cancel = b : g(Error(B(a, 3, k) + "must either be a cancel callback or a context object.")));
        return d
    }
    ;
    function I(a) {
        if (a instanceof I)
            return a;
        if (1 == arguments.length) {
            this.m = a.split("/");
            for (var b = 0, c = 0; c < this.m.length; c++)
                0 < this.m[c].length && (this.m[b] = this.m[c], b++);
            this.m.length = b;
            this.aa = 0
        } else
            this.m = arguments[0], this.aa = arguments[1]
    }
    function F(a) {
        return a.aa >= a.m.length ? l : a.m[a.aa]
    }
    function J(a) {
        var b = a.aa;
        b < a.m.length && b++;
        return new I(a.m, b)
    }
    function Ka(a) {
        return a.aa < a.m.length ? a.m[a.m.length - 1] : l
    }
    r = I.prototype;
    r.toString = function() {
        for (var a = "", b = this.aa; b < this.m.length; b++)
            "" !== this.m[b] && (a += "/" + this.m[b]);
        return a || "/"
    };
    r.parent = function() {
        if (this.aa >= this.m.length)
            return l;
        for (var a = [], b = this.aa; b < this.m.length - 1; b++)
            a.push(this.m[b]);
        return new I(a, 0)
    };
    r.F = function(a) {
        for (var b = [], c = this.aa; c < this.m.length; c++)
            b.push(this.m[c]);
        if (a instanceof I)
            for (c = a.aa; c < a.m.length; c++)
                b.push(a.m[c]);
        else {
            a = a.split("/");
            for (c = 0; c < a.length; c++)
                0 < a[c].length && b.push(a[c])
        }
        return new I(b, 0)
    };
    r.f = function() {
        return this.aa >= this.m.length
    };
    function La(a, b) {
        var c = F(a);
        if (c === l)
            return b;
        if (c === F(b))
            return La(J(a), J(b));
        g("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")")
    }
    r.contains = function(a) {
        var b = 0;
        if (this.m.length > a.m.length)
            return o;
        for (; b < this.m.length; ) {
            if (this.m[b] !== a.m[b])
                return o;
            ++b
        }
        return k
    };
    function Ma() {
        this.children = {};
        this.ic = 0;
        this.value = l
    }
    function Na(a, b, c) {
        this.va = a ? a : "";
        this.ob = b ? b : l;
        this.z = c ? c : new Ma
    }
    function L(a, b) {
        for (var c = b instanceof I ? b : new I(b), d = a, e; (e = F(c)) !== l; )
            d = new Na(e, d, ta(d.z.children, e) || new Ma), c = J(c);
        return d
    }
    r = Na.prototype;
    r.j = function() {
        return this.z.value
    };
    function N(a, b) {
        z("undefined" !== typeof b);
        a.z.value = b;
        Oa(a)
    }
    r.bb = function() {
        return 0 < this.z.ic
    };
    r.f = function() {
        return this.j() === l && !this.bb()
    };
    r.w = function(a) {
        for (var b in this.z.children)
            a(new Na(b, this, this.z.children[b]))
    };
    function Pa(a, b, c, d) {
        c && !d && b(a);
        a.w(function(a) {
            Pa(a, b, k, d)
        });
        c && d && b(a)
    }
    function Qa(a, b, c) {
        for (a = c ? a : a.parent(); a !== l; ) {
            if (b(a))
                return k;
            a = a.parent()
        }
        return o
    }
    r.path = function() {
        return new I(this.ob === l ? this.va : this.ob.path() + "/" + this.va)
    };
    r.name = aa("va");
    r.parent = aa("ob");
    function Oa(a) {
        if (a.ob !== l) {
            var b = a.ob, c = a.va, d = a.f(), e = D(b.z.children, c);
            d && e ? (delete b.z.children[c], b.z.ic--, Oa(b)) : !d && !e && (b.z.children[c] = a.z, b.z.ic++, Oa(b))
        }
    }
    ;
    function Ra(a, b) {
        this.Ka = a ? a : Sa;
        this.ba = b ? b : Va
    }
    function Sa(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    r = Ra.prototype;
    r.ja = function(a, b) {
        return new Ra(this.Ka, this.ba.ja(a, b, this.Ka).copy(l, l, o, l, l))
    };
    r.remove = function(a) {
        return new Ra(this.Ka, this.ba.remove(a, this.Ka).copy(l, l, o, l, l))
    };
    r.get = function(a) {
        for (var b, c = this.ba; !c.f(); ) {
            b = this.Ka(a, c.key);
            if (0 === b)
                return c.value;
            0 > b ? c = c.left : 0 < b && (c = c.right)
        }
        return l
    };
    function Wa(a, b) {
        for (var c, d = a.ba, e = l; !d.f(); ) {
            c = a.Ka(b, d.key);
            if (0 === c) {
                if (d.left.f())
                    return e ? e.key : l;
                for (d = d.left; !d.right.f(); )
                    d = d.right;
                return d.key
            }
            0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
        }
        g(Error("Attempted to find predecessor key for a nonexistent key.  What gives?"))
    }
    r.f = function() {
        return this.ba.f()
    };
    r.count = function() {
        return this.ba.count()
    };
    r.ib = function() {
        return this.ba.ib()
    };
    r.Qa = function() {
        return this.ba.Qa()
    };
    r.ta = function(a) {
        return this.ba.ta(a)
    };
    r.Ga = function(a) {
        return this.ba.Ga(a)
    };
    r.Oa = function(a) {
        return new Xa(this.ba, a)
    };
    function Xa(a, b) {
        this.Zc = b;
        for (this.Ib = []; !a.f(); )
            this.Ib.push(a), a = a.left
    }
    function Ya(a) {
        if (0 === a.Ib.length)
            return l;
        var b = a.Ib.pop(), c;
        c = a.Zc ? a.Zc(b.key, b.value) : {key: b.key, value: b.value};
        for (b = b.right; !b.f(); )
            a.Ib.push(b), b = b.left;
        return c
    }
    function Za(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = c != l ? c : k;
        this.left = d != l ? d : Va;
        this.right = e != l ? e : Va
    }
    r = Za.prototype;
    r.copy = function(a, b, c, d, e) {
        return new Za(a != l ? a : this.key, b != l ? b : this.value, c != l ? c : this.color, d != l ? d : this.left, e != l ? e : this.right)
    };
    r.count = function() {
        return this.left.count() + 1 + this.right.count()
    };
    r.f = q(o);
    r.ta = function(a) {
        return this.left.ta(a) || a(this.key, this.value) || this.right.ta(a)
    };
    r.Ga = function(a) {
        return this.right.Ga(a) || a(this.key, this.value) || this.left.Ga(a)
    };
    function $a(a) {
        return a.left.f() ? a : $a(a.left)
    }
    r.ib = function() {
        return $a(this).key
    };
    r.Qa = function() {
        return this.right.f() ? this.key : this.right.Qa()
    };
    r.ja = function(a, b, c) {
        var d, e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.copy(l, l, l, e.left.ja(a, b, c), l) : 0 === d ? e.copy(l, b, l, l, l) : e.copy(l, l, l, l, e.right.ja(a, b, c));
        return ab(e)
    };
    function bb(a) {
        if (a.left.f())
            return Va;
        !a.left.K() && !a.left.left.K() && (a = cb(a));
        a = a.copy(l, l, l, bb(a.left), l);
        return ab(a)
    }
    r.remove = function(a, b) {
        var c, d;
        c = this;
        if (0 > b(a, c.key))
            !c.left.f() && (!c.left.K() && !c.left.left.K()) && (c = cb(c)), c = c.copy(l, l, l, c.left.remove(a, b), l);
        else {
            c.left.K() && (c = db(c));
            !c.right.f() && (!c.right.K() && !c.right.left.K()) && (c = eb(c), c.left.left.K() && (c = db(c), c = eb(c)));
            if (0 === b(a, c.key)) {
                if (c.right.f())
                    return Va;
                d = $a(c.right);
                c = c.copy(d.key, d.value, l, l, bb(c.right))
            }
            c = c.copy(l, l, l, l, c.right.remove(a, b))
        }
        return ab(c)
    };
    r.K = aa("color");
    function ab(a) {
        a.right.K() && !a.left.K() && (a = fb(a));
        a.left.K() && a.left.left.K() && (a = db(a));
        a.left.K() && a.right.K() && (a = eb(a));
        return a
    }
    function cb(a) {
        a = eb(a);
        a.right.left.K() && (a = a.copy(l, l, l, l, db(a.right)), a = fb(a), a = eb(a));
        return a
    }
    function fb(a) {
        var b;
        b = a.copy(l, l, k, l, a.right.left);
        return a.right.copy(l, l, a.color, b, l)
    }
    function db(a) {
        var b;
        b = a.copy(l, l, k, a.left.right, l);
        return a.left.copy(l, l, a.color, l, b)
    }
    function eb(a) {
        var b, c;
        b = a.left.copy(l, l, !a.left.color, l, l);
        c = a.right.copy(l, l, !a.right.color, l, l);
        return a.copy(l, l, !a.color, b, c)
    }
    function gb() {
    }
    r = gb.prototype;
    r.copy = function() {
        return this
    };
    r.ja = function(a, b) {
        return new Za(a, b, j, j, j)
    };
    r.remove = function() {
        return this
    };
    r.get = q(l);
    r.count = q(0);
    r.f = q(k);
    r.ta = q(o);
    r.Ga = q(o);
    r.ib = q(l);
    r.Qa = q(l);
    r.K = q(o);
    var Va = new gb;
    var hb = Array.prototype, ib = hb.forEach ? function(a, b, c) {
        hb.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = u(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }, jb = hb.map ? function(a, b, c) {
        return hb.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = u(a) ? a.split("") : a, h = 0; h < d; h++)
            h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    };
    function kb() {
    }
    ;
    function lb() {
        this.B = [];
        this.hc = [];
        this.jd = [];
        this.Ob = [];
        this.Ob[0] = 128;
        for (var a = 1; 64 > a; ++a)
            this.Ob[a] = 0;
        this.reset()
    }
    ja(lb, kb);
    lb.prototype.reset = function() {
        this.B[0] = 1732584193;
        this.B[1] = 4023233417;
        this.B[2] = 2562383102;
        this.B[3] = 271733878;
        this.B[4] = 3285377520;
        this.Fc = this.eb = 0
    };
    function mb(a, b) {
        var c;
        c || (c = 0);
        for (var d = a.jd, e = c; e < c + 64; e += 4)
            d[e / 4] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3];
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        c = a.B[0];
        for (var h = a.B[1], i = a.B[2], m = a.B[3], n = a.B[4], p, e = 0; 80 > e; e++)
            40 > e ? 20 > e ? (f = m ^ h & (i ^ m), p = 1518500249) : (f = h ^ i ^ m, p = 1859775393) : 60 > e ? (f = h & i | m & (h | i), p = 2400959708) : (f = h ^ i ^ m, p = 3395469782), f = (c << 5 | c >>> 27) + f + n + p + d[e] & 4294967295, n = m, m = i, i = (h << 30 | h >>> 2) & 4294967295, h = c, c = f;
        a.B[0] = a.B[0] + c & 4294967295;
        a.B[1] = a.B[1] + h &
                4294967295;
        a.B[2] = a.B[2] + i & 4294967295;
        a.B[3] = a.B[3] + m & 4294967295;
        a.B[4] = a.B[4] + n & 4294967295
    }
    lb.prototype.update = function(a, b) {
        t(b) || (b = a.length);
        var c = this.hc, d = this.eb, e = 0;
        if (u(a))
            for (; e < b; )
                c[d++] = a.charCodeAt(e++), 64 == d && (mb(this, c), d = 0);
        else
            for (; e < b; )
                c[d++] = a[e++], 64 == d && (mb(this, c), d = 0);
        this.eb = d;
        this.Fc += b
    };
    function nb() {
        this.Ja = {};
        this.length = 0
    }
    nb.prototype.setItem = function(a, b) {
        D(this.Ja, a) || (this.length += 1);
        this.Ja[a] = b
    };
    nb.prototype.getItem = function(a) {
        return D(this.Ja, a) ? this.Ja[a] : l
    };
    nb.prototype.removeItem = function(a) {
        D(this.Ja, a) && (this.length -= 1, delete this.Ja[a])
    };
    var ob = l;
    if ("undefined" !== typeof sessionStorage)
        try {
            sessionStorage.setItem("firebase-sentinel", "cache"), sessionStorage.removeItem("firebase-sentinel"), ob = sessionStorage
        } catch (pb) {
            ob = new nb
        }
    else
        ob = new nb;
    function qb(a, b, c, d) {
        this.host = a.toLowerCase();
        this.Yb = b;
        this.jb = c;
        this.da = d || ob.getItem(a) || this.host
    }
    function rb(a, b) {
        b !== a.da && (a.da = b, "s-" === a.da.substr(0, 2) && ob.setItem(a.host, a.da))
    }
    qb.prototype.toString = function() {
        return(this.Yb ? "https://" : "http://") + this.host
    };
    var sb, tb, ub, vb;
    function wb() {
        return ba.navigator ? ba.navigator.userAgent : l
    }
    vb = ub = tb = sb = o;
    var xb;
    if (xb = wb()) {
        var yb = ba.navigator;
        sb = 0 == xb.indexOf("Opera");
        tb = !sb && -1 != xb.indexOf("MSIE");
        ub = !sb && -1 != xb.indexOf("WebKit");
        vb = !sb && !ub && "Gecko" == yb.product
    }
    var zb = tb, Ab = vb, Bb = ub;
    var Cb;
    if (sb && ba.opera) {
        var Db = ba.opera.version;
        "function" == typeof Db && Db()
    } else
        Ab ? Cb = /rv\:([^\);]+)(\)|;)/ : zb ? Cb = /MSIE\s+([^\);]+)(\)|;)/ : Bb && (Cb = /WebKit\/(\S+)/), Cb && Cb.exec(wb());
    var Eb = l, Fb = l;
    function Gb(a, b) {
        ea(a) || g(Error("encodeByteArray takes an array as a parameter"));
        if (!Eb) {
            Eb = {};
            Fb = {};
            for (var c = 0; 65 > c; c++)
                Eb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c), Fb[c] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(c)
        }
        for (var c = b ? Fb : Eb, d = [], e = 0; e < a.length; e += 3) {
            var f = a[e], h = e + 1 < a.length, i = h ? a[e + 1] : 0, m = e + 2 < a.length, n = m ? a[e + 2] : 0, p = f >> 2, f = (f & 3) << 4 | i >> 4, i = (i & 15) << 2 | n >> 6, n = n & 63;
            m || (n = 64, h || (i = 64));
            d.push(c[p], c[f], c[i], c[n])
        }
        return d.join("")
    }
    ;
    var Hb, Ib = 1;
    Hb = function() {
        return Ib++
    };
    function z(a, b) {
        a || g(Error("Firebase INTERNAL ASSERT FAILED:" + b))
    }
    function Jb(a) {
        var b = qa(a), a = new lb;
        a.update(b);
        var b = [], c = 8 * a.Fc;
        56 > a.eb ? a.update(a.Ob, 56 - a.eb) : a.update(a.Ob, 64 - (a.eb - 56));
        for (var d = 63; 56 <= d; d--)
            a.hc[d] = c & 255, c /= 256;
        mb(a, a.hc);
        for (d = c = 0; 5 > d; d++)
            for (var e = 24; 0 <= e; e -= 8)
                b[c++] = a.B[d] >> e & 255;
        return Gb(b)
    }
    function Kb() {
        for (var a = "", b = 0; b < arguments.length; b++)
            a = ea(arguments[b]) ? a + Kb.apply(l, arguments[b]) : "object" === typeof arguments[b] ? a + y(arguments[b]) : a + arguments[b], a += " ";
        return a
    }
    var Lb = l, Mb = k;
    function O() {
        Mb === k && (Mb = o, Lb === l && "true" === ob.getItem("logging_enabled") && Nb(k));
        if (Lb) {
            var a = Kb.apply(l, arguments);
            Lb(a)
        }
    }
    function Ob(a) {
        return function() {
            O(a, arguments)
        }
    }
    function Pb() {
        if ("undefined" !== typeof console) {
            var a = "FIREBASE INTERNAL ERROR: " + Kb.apply(l, arguments);
            "undefined" !== typeof console.error ? console.error(a) : console.log(a)
        }
    }
    function Qb() {
        var a = Kb.apply(l, arguments);
        g(Error("FIREBASE FATAL ERROR: " + a))
    }
    function Rb() {
        if ("undefined" !== typeof console) {
            var a = "FIREBASE WARNING: " + Kb.apply(l, arguments);
            "undefined" !== typeof console.warn ? console.warn(a) : console.log(a)
        }
    }
    function Ba(a) {
        return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }
    function Sb(a, b) {
        return a !== b ? a === l ? -1 : b === l ? 1 : typeof a !== typeof b ? "number" === typeof a ? -1 : 1 : a > b ? 1 : -1 : 0
    }
    function Tb(a, b) {
        if (b && a in b)
            return b[a];
        g(Error("Missing required key (" + a + ") in object: " + y(b)))
    }
    function Ja(a) {
        if ("object" !== typeof a || a === l)
            return y(a);
        var b = [], c;
        for (c in a)
            b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++)
            0 !== d && (c += ","), c += y(b[d]), c += ":", c += Ja(a[b[d]]);
        return c + "}"
    }
    function Ub(a, b) {
        if (a.length <= b)
            return[a];
        for (var c = [], d = 0; d < a.length; d += b)
            d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c
    }
    function Vb(a, b) {
        if ("array" == da(a))
            for (var c = 0; c < a.length; ++c)
                b(c, a[c]);
        else
            Wb(a, b)
    }
    function Yb(a) {
        z(!Ba(a));
        var b, c, d, e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; a -= 1)
            e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; a -= 1)
            e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8)
            d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length && (d = "0" + d), c += d;
        return c.toLowerCase()
    }
    ;
    function Zb(a, b) {
        this.D = a;
        z(this.D !== l, "LeafNode shouldn't be created with null value.");
        this.Sa = "undefined" !== typeof b ? b : l
    }
    r = Zb.prototype;
    r.J = q(k);
    r.k = aa("Sa");
    r.Cb = function(a) {
        return new Zb(this.D, a)
    };
    r.R = function() {
        return P
    };
    r.G = function(a) {
        return F(a) === l ? this : P
    };
    r.V = q(l);
    r.H = function(a, b) {
        return(new Q(new Ra, this.Sa)).H(a, b)
    };
    r.pa = function(a, b) {
        var c = F(a);
        return c === l ? b : this.H(c, P.pa(J(a), b))
    };
    r.f = q(o);
    r.Jb = q(0);
    r.T = function(a) {
        return a && this.k() !== l ? {".value": this.j(), ".priority": this.k()} : this.j()
    };
    r.hash = function() {
        var a = "";
        this.k() !== l && (a += "priority:" + $b(this.k()) + ":");
        var b = typeof this.D, a = a + (b + ":"), a = "number" === b ? a + Yb(this.D) : a + this.D;
        return Jb(a)
    };
    r.j = aa("D");
    r.toString = function() {
        return"string" === typeof this.D ? '"' + this.D + '"' : this.D
    };
    function Q(a, b) {
        this.n = a || new Ra;
        this.Sa = "undefined" !== typeof b ? b : l
    }
    r = Q.prototype;
    r.J = q(o);
    r.k = aa("Sa");
    r.Cb = function(a) {
        return new Q(this.n, a)
    };
    r.H = function(a, b) {
        var c = this.n.remove(a);
        b && b.f() && (b = l);
        b !== l && (c = c.ja(a, b));
        return b && b.k() !== l ? new ac(c, l, this.Sa) : new Q(c, this.Sa)
    };
    r.pa = function(a, b) {
        var c = F(a);
        if (c === l)
            return b;
        var d = this.R(c).pa(J(a), b);
        return this.H(c, d)
    };
    r.f = function() {
        return this.n.f()
    };
    r.Jb = function() {
        return this.n.count()
    };
    var bc = /^\d+$/;
    r = Q.prototype;
    r.T = function(a) {
        if (this.f())
            return l;
        var b = {}, c = 0, d = 0, e = k;
        this.w(function(f, h) {
            b[f] = h.T(a);
            c++;
            e && bc.test(f) ? d = Math.max(d, Number(f)) : e = o
        });
        if (!a && e && d < 2 * c) {
            var f = [], h;
            for (h in b)
                f[h] = b[h];
            return f
        }
        a && this.k() !== l && (b[".priority"] = this.k());
        return b
    };
    r.hash = function() {
        var a = "";
        this.k() !== l && (a += "priority:" + $b(this.k()) + ":");
        this.w(function(b, c) {
            var d = c.hash();
            "" !== d && (a += ":" + b + ":" + d)
        });
        return"" === a ? "" : Jb(a)
    };
    r.R = function(a) {
        a = this.n.get(a);
        return a === l ? P : a
    };
    r.G = function(a) {
        var b = F(a);
        return b === l ? this : this.R(b).G(J(a))
    };
    r.V = function(a) {
        return Wa(this.n, a)
    };
    r.Oc = function() {
        return this.n.ib()
    };
    r.Pc = function() {
        return this.n.Qa()
    };
    r.w = function(a) {
        return this.n.ta(a)
    };
    r.mc = function(a) {
        return this.n.Ga(a)
    };
    r.Oa = function() {
        return this.n.Oa()
    };
    r.toString = function() {
        var a = "{", b = k;
        this.w(function(c, d) {
            b ? b = o : a += ", ";
            a += '"' + c + '" : ' + d.toString()
        });
        return a += "}"
    };
    var P = new Q(new Ra);
    function ac(a, b, c) {
        Q.call(this, a, c);
        b === l && (b = new Ra(cc), a.ta(function(a, c) {
            b = b.ja({name: a, wa: c.k()}, c)
        }));
        this.la = b
    }
    ja(ac, Q);
    r = ac.prototype;
    r.H = function(a, b) {
        var c = this.R(a), d = this.n, e = this.la;
        c !== l && (d = d.remove(a), e = e.remove({name: a, wa: c.k()}));
        b && b.f() && (b = l);
        b !== l && (d = d.ja(a, b), e = e.ja({name: a, wa: b.k()}, b));
        return new ac(d, e, this.k())
    };
    r.V = function(a, b) {
        var c = Wa(this.la, {name: a, wa: b.k()});
        return c ? c.name : l
    };
    r.w = function(a) {
        return this.la.ta(function(b, c) {
            return a(b.name, c)
        })
    };
    r.mc = function(a) {
        return this.la.Ga(function(b, c) {
            return a(b.name, c)
        })
    };
    r.Oa = function() {
        return this.la.Oa(function(a, b) {
            return{key: a.name, value: b}
        })
    };
    r.Oc = function() {
        return this.la.f() ? l : this.la.ib().name
    };
    r.Pc = function() {
        return this.la.f() ? l : this.la.Qa().name
    };
    function R(a, b) {
        if ("object" !== typeof a)
            return new Zb(a, b);
        if (a === l)
            return P;
        var c = l;
        ".priority"in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        z(c === l || "string" === typeof c || "number" === typeof c);
        if (".value"in a && a[".value"] !== l)
            return new Zb(a[".value"], c);
        var c = new Q(new Ra, c), d;
        for (d in a)
            if (D(a, d) && "." !== d.substring(0, 1)) {
                var e = R(a[d]);
                if (e.J() || !e.f())
                    c = c.H(d, e)
            }
        return c
    }
    function cc(a, b) {
        return Sb(a.wa, b.wa) || (a.name !== b.name ? a.name < b.name ? -1 : 1 : 0)
    }
    function $b(a) {
        return"number" === typeof a ? "number:" + Yb(a) : "string:" + a
    }
    ;
    function S(a, b) {
        this.z = a;
        this.Vb = b
    }
    S.prototype.T = function() {
        A("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.z.T()
    };
    S.prototype.val = S.prototype.T;
    S.prototype.nd = function() {
        A("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.z.T(k)
    };
    S.prototype.exportVal = S.prototype.nd;
    S.prototype.F = function(a) {
        A("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        fa(a) && (a = String(a));
        Ga("Firebase.DataSnapshot.child", a);
        var b = new I(a), c = this.Vb.F(b);
        return new S(this.z.G(b), c)
    };
    S.prototype.child = S.prototype.F;
    S.prototype.nc = function(a) {
        A("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        Ga("Firebase.DataSnapshot.hasChild", a);
        var b = new I(a);
        return!this.z.G(b).f()
    };
    S.prototype.hasChild = S.prototype.nc;
    S.prototype.k = function() {
        A("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.z.k()
    };
    S.prototype.getPriority = S.prototype.k;
    S.prototype.forEach = function(a) {
        A("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        C("Firebase.DataSnapshot.forEach", 1, a, o);
        if (this.z.J())
            return o;
        var b = this;
        return this.z.w(function(c, d) {
            return a(new S(d, b.Vb.F(c)))
        })
    };
    S.prototype.forEach = S.prototype.forEach;
    S.prototype.bb = function() {
        A("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.z.J() ? o : !this.z.f()
    };
    S.prototype.hasChildren = S.prototype.bb;
    S.prototype.name = function() {
        A("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.Vb.name()
    };
    S.prototype.name = S.prototype.name;
    S.prototype.Jb = function() {
        A("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.z.Jb()
    };
    S.prototype.numChildren = S.prototype.Jb;
    S.prototype.zd = function() {
        A("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.Vb
    };
    S.prototype.ref = S.prototype.zd;
    function dc(a) {
        this.uc = a;
        this.Qb = [];
        this.Ma = 0;
        this.jc = -1;
        this.Da = l
    }
    ;
    function Wb(a, b) {
        for (var c in a)
            b.call(j, a[c], c, a)
    }
    function ec(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    ;
    function fc() {
        this.Za = {}
    }
    function gc(a, b, c) {
        t(c) || (c = 1);
        D(a.Za, b) || (a.Za[b] = 0);
        a.Za[b] += c
    }
    fc.prototype.get = function() {
        return ec(this.Za)
    };
    function hc(a) {
        this.kd = a;
        this.Hb = l
    }
    hc.prototype.get = function() {
        var a = this.kd.get(), b = ec(a);
        if (this.Hb)
            for (var c in this.Hb)
                b[c] -= this.Hb[c];
        this.Hb = a;
        return b
    };
    function ic(a, b) {
        this.Dc = {};
        this.ac = new hc(a);
        this.o = b;
        setTimeout(v(this.Xc, this), 10 + 6E4 * Math.random())
    }
    ic.prototype.Xc = function() {
        var a = this.ac.get(), b = {}, c = o, d;
        for (d in a)
            0 < a[d] && D(this.Dc, d) && (b[d] = a[d], c = k);
        c && (a = this.o, a.U && (b = {c: b}, a.e("reportStats", b), a.xa("s", b)));
        setTimeout(v(this.Xc, this), 6E5 * Math.random())
    };
    var jc = {}, kc = {};
    function lc(a) {
        a = a.toString();
        jc[a] || (jc[a] = new fc);
        return jc[a]
    }
    ;
    var mc = l;
    "undefined" !== typeof MozWebSocket ? mc = MozWebSocket : "undefined" !== typeof WebSocket && (mc = WebSocket);
    function nc(a, b, c) {
        this.kc = a;
        this.e = Ob(this.kc);
        this.frames = this.gb = l;
        this.Ec = 0;
        this.X = lc(b);
        this.La = (b.Yb ? "wss://" : "ws://") + b.da + "/.ws?v=5";
        b.host !== b.da && (this.La = this.La + "&ns=" + b.jb);
        c && (this.La = this.La + "&s=" + c)
    }
    var oc;
    nc.prototype.open = function(a, b) {
        this.fa = b;
        this.wd = a;
        this.e("websocket connecting to " + this.La);
        this.W = new mc(this.La);
        this.$a = o;
        var c = this;
        this.W.onopen = function() {
            c.e("Websocket connected.");
            c.$a = k
        };
        this.W.onclose = function() {
            c.e("Websocket connection was disconnected.");
            c.W = l;
            c.Ea()
        };
        this.W.onmessage = function(a) {
            if (c.W !== l)
                if (a = a.data, gc(c.X, "bytes_received", a.length), pc(c), c.frames !== l)
                    qc(c, a);
                else {
                    a:{
                        z(c.frames === l, "We already have a frame buffer");
                        if (4 >= a.length) {
                            var b = Number(a);
                            if (!isNaN(b)) {
                                c.Ec =
                                        b;
                                c.frames = [];
                                a = l;
                                break a
                            }
                        }
                        c.Ec = 1;
                        c.frames = []
                    }
                    a !== l && qc(c, a)
                }
        };
        this.W.onerror = function(a) {
            c.e("WebSocket error.  Closing connection.");
            a.data && c.e(a.data);
            c.Ea()
        }
    };
    nc.prototype.start = function() {
    };
    nc.isAvailable = function() {
        return!("undefined" !== typeof navigator && "Opera" === navigator.appName) && mc !== l && !oc
    };
    function qc(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.Ec) {
            var c = a.frames.join("");
            a.frames = l;
            c = "undefined" !== typeof JSON && t(JSON.parse) ? JSON.parse(c) : ka(c);
            a.wd(c)
        }
    }
    nc.prototype.send = function(a) {
        pc(this);
        a = y(a);
        gc(this.X, "bytes_sent", a.length);
        a = Ub(a, 16384);
        1 < a.length && this.W.send(String(a.length));
        for (var b = 0; b < a.length; b++)
            this.W.send(a[b])
    };
    nc.prototype.zb = function() {
        this.Ba = k;
        this.gb && (clearTimeout(this.gb), this.gb = l);
        this.W && (this.W.close(), this.W = l)
    };
    nc.prototype.Ea = function() {
        this.Ba || (this.e("WebSocket is closing itself"), this.zb(), this.fa && (this.fa(this.$a), this.fa = l))
    };
    nc.prototype.close = function() {
        this.Ba || (this.e("WebSocket is being closed"), this.zb())
    };
    function pc(a) {
        clearTimeout(a.gb);
        a.gb = setInterval(function() {
            a.W.send("0");
            pc(a)
        }, 45E3)
    }
    ;
    function rc() {
        this.set = {}
    }
    r = rc.prototype;
    r.add = function(a, b) {
        this.set[a] = b !== l ? b : k
    };
    r.contains = function(a) {
        return D(this.set, a)
    };
    r.get = function(a) {
        return this.contains(a) ? this.set[a] : j
    };
    r.remove = function(a) {
        delete this.set[a]
    };
    r.f = function() {
        var a;
        a:{
            for (a in this.set) {
                a = o;
                break a
            }
            a = k
        }
        return a
    };
    r.count = function() {
        var a = 0, b;
        for (b in this.set)
            a++;
        return a
    };
    function sc(a, b) {
        for (var c in a.set)
            D(a.set, c) && b(c, a.set[c])
    }
    r.keys = function() {
        var a = [], b;
        for (b in this.set)
            D(this.set, b) && a.push(b);
        return a
    };
    var tc = "pLPCommand", uc = "pRTLPCB";
    function vc(a, b, c) {
        this.kc = a;
        this.e = Ob(a);
        this.Jd = b;
        this.X = lc(b);
        this.$b = c;
        this.$a = o;
        this.Db = function(a) {
            b.host !== b.da && (a.ns = b.jb);
            var c = [], f;
            for (f in a)
                a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
            return(b.Yb ? "https://" : "http://") + b.da + "/.lp?" + c.join("&")
        }
    }
    var wc, xc;
    vc.prototype.open = function(a, b) {
        function c() {
            if (!d.Ba) {
                d.ga = new yc(function(a, b, c, e, f) {
                    gc(d.X, "bytes_received", y(arguments).length);
                    if (d.ga)
                        if (d.ya && (clearTimeout(d.ya), d.ya = l), d.$a = k, "start" == a)
                            d.id = b, d.Wc = c;
                        else if ("close" === a)
                            if (b) {
                                d.ga.Zb = o;
                                var h = d.Sc;
                                h.jc = b;
                                h.Da = function() {
                                    d.Ea()
                                };
                                h.jc < h.Ma && (h.Da(), h.Da = l)
                            } else
                                d.Ea();
                        else
                            g(Error("Unrecognized command received: " + a))
                }, function(a, b) {
                    gc(d.X, "bytes_received", y(arguments).length);
                    var c = d.Sc;
                    for (c.Qb[a] = b; c.Qb[c.Ma]; ) {
                        var e = c.Qb[c.Ma];
                        delete c.Qb[c.Ma];
                        for (var f = 0; f < e.length; ++f)
                            e[f] && c.uc(e[f]);
                        if (c.Ma === c.jc) {
                            c.Da && (clearTimeout(c.Da), c.Da(), c.Da = l);
                            break
                        }
                        c.Ma++
                    }
                }, function() {
                    d.Ea()
                }, d.Db);
                var a = {start: "t"};
                a.ser = Math.floor(1E8 * Math.random());
                d.ga.cc && (a.cb = d.ga.cc);
                a.v = "5";
                d.$b && (a.s = d.$b);
                a = d.Db(a);
                d.e("Connecting via long-poll to " + a);
                zc(d.ga, a, function() {
                })
            }
        }
        this.Ic = 0;
        this.N = b;
        this.Sc = new dc(a);
        this.Ba = o;
        var d = this;
        this.ya = setTimeout(function() {
            d.e("Timed out trying to connect.");
            d.Ea();
            d.ya = l
        }, 3E4);
        if ("complete" === document.readyState)
            c();
        else {
            var e = o, f = function() {
                document.body ? e || (e = k, c()) : setTimeout(f, 10)
            };
            document.addEventListener ? (document.addEventListener("DOMContentLoaded", f, o), window.addEventListener("load", f, o)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && f()
            }, o), window.attachEvent("onload", f, o))
        }
    };
    vc.prototype.start = function() {
        var a = this.ga, b = this.Wc;
        a.ud = this.id;
        a.vd = b;
        for (a.fc = k; Ac(a); )
            ;
        a = this.id;
        b = this.Wc;
        this.Ra = document.createElement("iframe");
        var c = {dframe: "t"};
        c.id = a;
        c.pw = b;
        a = this.Db(c);
        this.Ra.src = a;
        this.Ra.style.display = "none";
        document.body.appendChild(this.Ra)
    };
    vc.isAvailable = function() {
        return!xc && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && (wc || k)
    };
    vc.prototype.zb = function() {
        this.Ba = k;
        this.ga && (this.ga.close(), this.ga = l);
        this.Ra && (document.body.removeChild(this.Ra), this.Ra = l);
        this.ya && (clearTimeout(this.ya), this.ya = l)
    };
    vc.prototype.Ea = function() {
        this.Ba || (this.e("Longpoll is closing itself"), this.zb(), this.N && (this.N(this.$a), this.N = l))
    };
    vc.prototype.close = function() {
        this.Ba || (this.e("Longpoll is being closed."), this.zb())
    };
    vc.prototype.send = function(a) {
        a = y(a);
        gc(this.X, "bytes_sent", a.length);
        for (var a = qa(a), a = Gb(a, k), a = Ub(a, 1840), b = 0; b < a.length; b++) {
            var c = this.ga;
            c.qb.push({Dd: this.Ic, Id: a.length, Jc: a[b]});
            c.fc && Ac(c);
            this.Ic++
        }
    };
    function yc(a, b, c, d) {
        this.Db = d;
        this.fa = c;
        this.wc = new rc;
        this.qb = [];
        this.lc = Math.floor(1E8 * Math.random());
        this.Zb = k;
        this.cc = Hb();
        window[tc + this.cc] = a;
        window[uc + this.cc] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        if (document.body) {
            document.body.appendChild(a);
            try {
                a.contentWindow.document || O("No IE domain setting required")
            } catch (e) {
                a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())"
            }
        } else
            g("Document body has not initialized. Wait to initialize Firebase until after the document is ready.");
        a.contentDocument ? a.ra = a.contentDocument : a.contentWindow ? a.ra = a.contentWindow.document : a.document && (a.ra = a.document);
        this.$ = a;
        a = "";
        "javascript:" === this.$.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";<\/script>');
        a = "<html><body>" + a + "</body></html>";
        try {
            this.$.ra.open(), this.$.ra.write(a), this.$.ra.close()
        } catch (f) {
            O("frame writing exception"), f.stack && O(f.stack), O(f)
        }
    }
    yc.prototype.close = function() {
        this.fc = o;
        if (this.$) {
            this.$.ra.body.innerHTML = "";
            var a = this;
            setTimeout(function() {
                a.$ !== l && (document.body.removeChild(a.$), a.$ = l)
            }, 0)
        }
        var b = this.fa;
        b && (this.fa = l, b())
    };
    function Ac(a) {
        if (a.fc && a.Zb && a.wc.count() < (0 < a.qb.length ? 2 : 1)) {
            a.lc++;
            var b = {};
            b.id = a.ud;
            b.pw = a.vd;
            b.ser = a.lc;
            for (var b = a.Db(b), c = "", d = 0; 0 < a.qb.length; )
                if (1870 >= a.qb[0].Jc.length + 30 + c.length) {
                    var e = a.qb.shift(), c = c + "&seg" + d + "=" + e.Dd + "&ts" + d + "=" + e.Id + "&d" + d + "=" + e.Jc;
                    d++
                } else
                    break;
            var b = b + c, f = a.lc;
            a.wc.add(f);
            var h = function() {
                a.wc.remove(f);
                Ac(a)
            }, i = setTimeout(h, 25E3);
            zc(a, b, function() {
                clearTimeout(i);
                h()
            });
            return k
        }
        return o
    }
    function zc(a, b, c) {
        setTimeout(function() {
            try {
                if (a.Zb) {
                    var d = a.$.ra.createElement("script");
                    d.type = "text/javascript";
                    d.async = k;
                    d.src = b;
                    d.onload = d.onreadystatechange = function() {
                        var a = d.readyState;
                        if (!a || "loaded" === a || "complete" === a)
                            d.onload = d.onreadystatechange = l, d.parentNode && d.parentNode.removeChild(d), c()
                    };
                    d.onerror = function() {
                        O("Long-poll script failed to load: " + b);
                        a.Zb = o;
                        a.close()
                    };
                    a.$.ra.body.appendChild(d)
                }
            } catch (e) {
            }
        }, 1)
    }
    ;
    function Bc() {
        var a = [];
        Vb(Cc, function(b, c) {
            c && c.isAvailable() && a.push(c)
        });
        this.bc = a
    }
    var Cc = [vc, {isAvailable: q(o)}, nc];
    function Dc(a, b, c, d, e, f) {
        this.id = a;
        this.e = Ob("c:" + this.id + ":");
        this.uc = c;
        this.mb = d;
        this.N = e;
        this.tc = f;
        this.P = b;
        this.Pb = [];
        this.Hc = 0;
        this.Gc = new Bc;
        this.na = 0;
        this.e("Connection created");
        Ec(this)
    }
    function Ec(a) {
        var b;
        var c = a.Gc;
        0 < c.bc.length ? b = c.bc[0] : g(Error("No transports available"));
        a.I = new b("c:" + a.id + ":" + a.Hc++, a.P);
        var d = Fc(a, a.I), e = Gc(a, a.I);
        a.Ab = a.I;
        a.wb = a.I;
        a.A = l;
        setTimeout(function() {
            a.I && a.I.open(d, e)
        }, 0)
    }
    function Gc(a, b) {
        return function(c) {
            b === a.I ? (a.I = l, !c && 0 === a.na ? (a.e("Realtime connection failed."), "s-" === a.P.da.substr(0, 2) && (ob.removeItem(a.P.jb), a.P.da = a.P.host)) : 1 === a.na && a.e("Realtime connection lost."), a.close()) : b === a.A ? (c = a.A, a.A = l, (a.Ab === c || a.wb === c) && a.close()) : a.e("closing an old connection")
        }
    }
    function Fc(a, b) {
        return function(c) {
            if (2 != a.na)
                if (b === a.wb) {
                    var d = Tb("t", c), c = Tb("d", c);
                    if ("c" == d) {
                        if (d = Tb("t", c), "d"in c)
                            if (c = c.d, "h" === d) {
                                var d = c.ts, e = c.v, f = c.h;
                                a.$b = c.s;
                                rb(a.P, f);
                                if (0 == a.na && (a.I.start(), c = a.I, a.e("Realtime connection established."), a.I = c, a.na = 1, a.mb && (a.mb(d), a.mb = l), "5" !== e && Rb("Protocol version mismatch detected"), c = 1 < a.Gc.bc.length ? a.Gc.bc[1] : l))
                                    a.A = new c("c:" + a.id + ":" + a.Hc++, a.P, a.$b), a.A.open(Fc(a, a.A), Gc(a, a.A))
                            } else if ("n" === d) {
                                a.e("recvd end transmission on primary");
                                a.wb = a.A;
                                for (c = 0; c < a.Pb.length; ++c)
                                    a.Mb(a.Pb[c]);
                                a.Pb = [];
                                Hc(a)
                            } else
                                "s" === d ? (a.e("Connection shutdown command received. Shutting down..."), a.tc && (a.tc(c), a.tc = l), a.N = l, a.close()) : "r" === d ? (a.e("Reset packet received.  New host: " + c), rb(a.P, c), 1 === a.na ? a.close() : (Ic(a), Ec(a))) : Pb("Unknown control packet command: " + d)
                    } else
                        "d" == d && a.Mb(c)
                } else
                    b === a.A ? (d = Tb("t", c), c = Tb("d", c), "c" == d ? "t"in c && (c = c.t, "a" === c ? (a.A.start(), a.e("sending client ack on secondary"), a.A.send({t: "c", d: {t: "a", d: {}}}), a.e("Ending transmission on primary"),
                            a.I.send({t: "c", d: {t: "n", d: {}}}), a.Ab = a.A, Hc(a)) : "r" === c && (a.e("Got a reset on secondary, closing it"), a.A.close(), (a.Ab === a.A || a.wb === a.A) && a.close())) : "d" == d ? a.Pb.push(c) : g(Error("Unknown protocol layer: " + d))) : a.e("message on old connection")
        }
    }
    Dc.prototype.zc = function(a) {
        a = {t: "d", d: a};
        1 !== this.na && g("Connection is not connected");
        this.Ab.send(a)
    };
    function Hc(a) {
        a.Ab === a.A && a.wb === a.A && (a.e("cleaning up and promoting a connection: " + a.A.kc), a.I = a.A, a.A = l)
    }
    Dc.prototype.Mb = function(a) {
        this.uc(a)
    };
    Dc.prototype.close = function() {
        2 !== this.na && (this.e("Closing realtime connection."), this.na = 2, Ic(this), this.N && (this.N(), this.N = l))
    };
    function Ic(a) {
        a.e("Shutting down all connections");
        a.I && (a.I.close(), a.I = l);
        a.A && (a.A.close(), a.A = l)
    }
    ;
    function Jc(a, b, c, d, e) {
        this.id = Kc++;
        this.e = Ob("p:" + this.id + ":");
        this.yb = k;
        this.ea = {};
        this.S = [];
        this.nb = 0;
        this.lb = [];
        this.U = o;
        this.Ub = 1E3;
        this.Nb = b || ca;
        this.Lb = c || ca;
        this.kb = d || ca;
        this.vc = e || ca;
        this.P = a;
        this.yc = l;
        this.Rb = [];
        this.ub = {};
        this.Cd = 0;
        this.hb = this.Rc = l;
        setTimeout(v(this.Kc, this), 0)
    }
    var Kc = 0, Lc = 0;
    r = Jc.prototype;
    r.xa = function(a, b, c) {
        var d = ++this.Cd, a = {r: d, a: a, b: b};
        this.e(y(a));
        this.U ? this.sb.zc(a) : this.Rb.push(a);
        c && (this.ub[d] = c)
    };
    function Mc(a, b, c, d, e) {
        a.e("Listen on " + b + " for " + c);
        var f = {p: b}, d = jb(d, function(a) {
            return Ia(a)
        });
        "{}" !== c && (f.q = d);
        a.xa("l", f, function(d) {
            a.e("listen response", d);
            d = d.s;
            "ok" !== d && Nc(a, b, c);
            e && e(d)
        })
    }
    r.Ya = function(a, b, c) {
        this.za = {ld: a, Mc: o, ha: b, Fb: c};
        this.e("Authenticating using credential: " + this.za);
        Oc(this)
    };
    r.Bb = function() {
        delete this.za;
        this.kb(o);
        this.U && this.xa("unauth", {})
    };
    function Oc(a) {
        var b = a.za;
        a.U && b && a.xa("auth", {cred: b.ld}, function(c) {
            var d = c.s, c = c.d || "error";
            "ok" !== d && a.za === b && delete a.za;
            b.Mc ? "ok" !== d && b.Fb && b.Fb(d, c) : (b.Mc = k, b.ha && b.ha(d, c));
            a.kb("ok" === d)
        })
    }
    r.ed = function(a, b, c) {
        a = a.toString();
        Nc(this, a, b) && this.U && (this.e("Unlisten on " + a + " for " + b), a = {p: a}, c = jb(c, function(a) {
            return Ia(a)
        }), "{}" !== b && (a.q = c), this.xa("u", a))
    };
    function Pc(a, b, c, d) {
        a.U ? Qc(a, "o", b, c, d) : a.lb.push({xc: b, action: "o", data: c, C: d})
    }
    r.sc = function(a, b) {
        this.U ? Qc(this, "oc", a, l, b) : this.lb.push({xc: a, action: "oc", data: l, C: b})
    };
    function Qc(a, b, c, d, e) {
        c = {p: c, d: d};
        a.e("onDisconnect " + b, c);
        a.xa(b, c, function(a) {
            e && setTimeout(function() {
                e(a.s)
            }, 0)
        })
    }
    r.put = function(a, b, c, d) {
        Rc(this, "p", a, b, c, d)
    };
    function Rc(a, b, c, d, e, f) {
        c = {p: c, d: d};
        t(f) && (c.h = f);
        a.S.push({action: b, Yc: c, C: e});
        a.nb++;
        b = a.S.length - 1;
        a.U && Sc(a, b)
    }
    function Sc(a, b) {
        var c = a.S[b].action, d = a.S[b].Yc, e = a.S[b].C;
        a.S[b].yd = a.U;
        a.xa(c, d, function(d) {
            a.e(c + " response", d);
            delete a.S[b];
            a.nb--;
            0 === a.nb && (a.S = []);
            e && e(d.s)
        })
    }
    r.Mb = function(a) {
        if ("r"in a) {
            this.e("from server: " + y(a));
            var b = a.r, c = this.ub[b];
            c && (delete this.ub[b], c(a.b))
        } else
            "error"in a && g("A server-side error has occurred: " + a.error), "a"in a && (b = a.a, a = a.b, this.e("handleServerMessage", b, a), "d" === b ? this.Nb(a.p, a.d) : "m" === b ? this.Nb(a.p, a.d, k) : "c" === b ? (b = a.p, a = (a = a.q) ? jb(a, function(a) {
                return Ja(a)
            }).join("$") : "{}", (a = Nc(this, b, a)) && a.C && a.C("permission_denied")) : "ac" === b ? (b = a.s, a = a.d, c = this.za, delete this.za, c && c.Fb && c.Fb(b, a), this.kb(o)) : "sd" === b ? this.yc ? this.yc(a) :
                    "msg"in a && "undefined" !== typeof console && console.log("FIREBASE: " + a.msg.replace("\n", "\nFIREBASE: ")) : Pb("Unrecognized action received from server: " + y(b) + "\nAre you using the latest client?"))
    };
    r.mb = function(a) {
        this.e("connection ready");
        this.U = k;
        this.hb = (new Date).getTime();
        this.vc({Kd: a - (new Date).getTime()});
        for (a = 0; a < this.Rb.length; a++)
            this.sb.zc(this.Rb[a]);
        this.Rb = [];
        Oc(this);
        for (a = 0; a < this.S.length; a++)
            this.S[a] && Sc(this, a);
        for (var b in this.ea)
            for (var c in this.ea[b])
                a = this.ea[b][c], Mc(this, b, c, a.Ta, a.C);
        for (; this.lb.length; )
            b = this.lb.shift(), Qc(this, b.action, b.xc, b.data, b.C);
        this.Lb(k)
    };
    r.Uc = function() {
        this.U = o;
        this.e("data client disconnected");
        for (var a = v(function() {
            this.Kc()
        }, this), b = 0; b < this.S.length; b++) {
            var c = this.S[b];
            c && ("h"in c.Yc && c.yd) && (c.C && c.C("disconnect"), delete this.S[b], this.nb--)
        }
        0 === this.nb && (this.S = []);
        if (this.yb)
            this.hb && (3E4 < (new Date).getTime() - this.hb && (this.Ub = 1E3), this.hb = l), b = Math.max(0, this.Ub - ((new Date).getTime() - this.Rc)), b *= Math.random(), this.e("Trying to reconnect in " + b + "ms"), setTimeout(a, b), this.Ub = Math.min(3E5, 1.3 * this.Ub);
        else {
            for (var d in this.ub)
                delete this.ub[d];
            this.$c = function() {
                setTimeout(a, 0)
            }
        }
        this.Lb(o)
    };
    r.Kc = function() {
        if (this.yb) {
            this.e("Making a connection attempt");
            this.Rc = (new Date).getTime();
            this.hb = l;
            var a = v(this.Mb, this), b = v(this.mb, this), c = v(this.Uc, this), d = this.id + ":" + Lc++, e = this;
            this.sb = new Dc(d, this.P, a, b, c, function(a) {
                e.yb = o;
                g(Error(a))
            })
        }
    };
    r.Pa = function() {
        this.yb = o;
        this.sb ? this.sb.close() : this.Uc()
    };
    r.vb = function() {
        this.yb = k;
        this.$c();
        this.$c = j
    };
    function Nc(a, b, c) {
        b = (new I(b)).toString();
        c || (c = "{}");
        var d = a.ea[b][c];
        delete a.ea[b][c];
        return d
    }
    ;
    function Tc() {
        this.n = this.D = l
    }
    function Uc(a, b, c) {
        if (b.f())
            a.D = c, a.n = l;
        else if (a.D !== l)
            a.D = a.D.pa(b, c);
        else {
            a.n == l && (a.n = new rc);
            var d = F(b);
            a.n.contains(d) || a.n.add(d, new Tc);
            a = a.n.get(d);
            b = J(b);
            Uc(a, b, c)
        }
    }
    function Vc(a, b) {
        if (b.f())
            return a.D = l, a.n = l, k;
        if (a.D !== l) {
            if (a.D.J())
                return o;
            var c = a.D;
            a.D = l;
            c.w(function(b, c) {
                Uc(a, new I(b), c)
            });
            return Vc(a, b)
        }
        return a.n !== l ? (c = F(b), b = J(b), a.n.contains(c) && Vc(a.n.get(c), b) && a.n.remove(c), a.n.f() ? (a.n = l, k) : o) : k
    }
    function Wc(a, b, c) {
        a.D !== l ? c(b, a.D) : a.w(function(a, e) {
            var f = new I(b.toString() + "/" + a);
            Wc(e, f, c)
        })
    }
    Tc.prototype.w = function(a) {
        this.n !== l && sc(this.n, function(b, c) {
            a(b, c)
        })
    };
    function Xc() {
        this.Ha = P
    }
    function T(a, b) {
        return a.Ha.G(b)
    }
    function U(a, b, c) {
        a.Ha = a.Ha.pa(b, c)
    }
    Xc.prototype.toString = function() {
        return this.Ha.toString()
    };
    function Yc() {
        this.xb = new Xc;
        this.L = new Xc;
        this.Ia = new Xc;
        this.pb = new Na
    }
    function Zc(a, b) {
        for (var c = T(a.xb, b), d = T(a.L, b), e = L(a.pb, b), f = o, h = e; h !== l; ) {
            if (h.j() !== l) {
                f = k;
                break
            }
            h = h.parent()
        }
        if (f)
            return o;
        c = $c(c, d, e);
        return c !== d ? (U(a.L, b, c), k) : o
    }
    function $c(a, b, c) {
        if (c.f())
            return a;
        if (c.j() !== l)
            return b;
        a = a || P;
        c.w(function(d) {
            var d = d.name(), e = a.R(d), f = b.R(d), h = L(c, d), e = $c(e, f, h);
            a = a.H(d, e)
        });
        return a
    }
    Yc.prototype.set = function(a, b) {
        var c = this, d = [];
        ib(b, function(a) {
            var b = a.path, a = a.Ca, h = Hb();
            N(L(c.pb, b), h);
            U(c.L, b, a);
            d.push({path: b, Ed: h})
        });
        return d
    };
    function ad(a, b) {
        ib(b, function(b) {
            var d = b.Ed, b = L(a.pb, b.path), e = b.j();
            z(e !== l, "pendingPut should not be null.");
            e === d && N(b, l)
        })
    }
    ;
    function bd() {
        this.Aa = []
    }
    function cd(a, b) {
        if (0 !== b.length) {
            a.Aa.push.apply(a.Aa, b);
            for (var c = 0; c < a.Aa.length; c++)
                if (a.Aa[c]) {
                    var d = a.Aa[c];
                    a.Aa[c] = l;
                    var e = d.ha;
                    e(d.bd, d.rb)
                }
            a.Aa = []
        }
    }
    ;
    function V(a, b, c, d) {
        this.type = a;
        this.ka = b;
        this.Y = c;
        this.rb = d
    }
    ;
    function dd(a) {
        this.M = a;
        this.ia = [];
        this.Lc = new bd
    }
    function ed(a, b, c, d, e) {
        a.ia.push({type: b, ha: c, cancel: d, Z: e});
        var d = [], f = fd(a.g);
        a.fb && f.push(new V("value", a.g));
        for (var h = 0; h < f.length; h++)
            if (f[h].type === b) {
                var i = new W(a.M.u, a.M.path);
                f[h].Y && (i = i.F(f[h].Y));
                d.push({ha: e ? v(c, e) : c, bd: new S(f[h].ka, i), rb: f[h].rb})
            }
        cd(a.Lc, d)
    }
    dd.prototype.Sb = function(a, b) {
        b = this.Tb(a, b);
        b != l && gd(this, b)
    };
    function gd(a, b) {
        for (var c = [], d = 0; d < b.length; d++) {
            var e = b[d], f = e.type, h = new W(a.M.u, a.M.path);
            b[d].Y && (h = h.F(b[d].Y));
            h = new S(b[d].ka, h);
            "value" === e.type && !h.bb() ? f += "(" + h.T() + ")" : "value" !== e.type && (f += " " + h.name());
            O(a.M.u.o.id + ": event:" + a.M.path + ":" + a.M.Fa() + ":" + f);
            for (f = 0; f < a.ia.length; f++) {
                var i = a.ia[f];
                b[d].type === i.type && c.push({ha: i.Z ? v(i.ha, i.Z) : i.ha, bd: h, rb: e.rb})
            }
        }
        cd(a.Lc, c)
    }
    function fd(a) {
        var b = [];
        if (!a.J()) {
            var c = l;
            a.w(function(a, e) {
                b.push(new V("child_added", e, a, c));
                c = a
            })
        }
        return b
    }
    function hd(a) {
        a.fb || (a.fb = k, gd(a, [new V("value", a.g)]))
    }
    ;
    function kd(a, b) {
        dd.call(this, a);
        this.g = b
    }
    ja(kd, dd);
    kd.prototype.Tb = function(a, b) {
        this.g = a;
        this.fb && b != l && b.push(new V("value", this.g));
        return b
    };
    kd.prototype.ab = function() {
        return{}
    };
    function ld(a, b) {
        this.Gb = a;
        this.rc = b
    }
    function md(a, b, c, d, e) {
        var f = a.G(c), h = b.G(c), d = new ld(d, e), e = nd(d, c, f, h), i = o;
        if (!f.f() && !h.f() && f.k() !== h.k())
            var i = a.G(c.parent()), m = b.G(c.parent()), n = Ka(c), i = i.V(n, f) != m.V(n, h);
        if (e || i) {
            f = c;
            c = e;
            for (h = i; f.parent() !== l; ) {
                var p = a.G(f), e = b.G(f), i = f.parent();
                if (!d.Gb || L(d.Gb, i).j())
                    m = b.G(i), n = [], f = Ka(f), p.f() ? (p = m.V(f, e), n.push(new V("child_added", e, f, p))) : e.f() ? n.push(new V("child_removed", p, f)) : (p = m.V(f, e), h && n.push(new V("child_moved", e, f, p)), c && n.push(new V("child_changed", e, f, p))), d.rc(i, m, n);
                h &&
                        (h = o, c = k);
                f = i
            }
        }
    }
    function nd(a, b, c, d) {
        var e, f = [];
        c === d ? e = o : c.J() && d.J() ? e = c.j() !== d.j() : c.J() ? (od(a, b, P, d, f), e = k) : d.J() ? (od(a, b, c, P, f), e = k) : e = od(a, b, c, d, f);
        e ? a.rc(b, d, f) : c.k() !== d.k() && a.rc(b, d, l);
        return e
    }
    function od(a, b, c, d, e) {
        var f = o, h = !a.Gb || !L(a.Gb, b).f(), i = [], m = [], n = [], p = [], s = {}, w = {}, x, M, K, G;
        x = c.Oa();
        K = Ya(x);
        M = d.Oa();
        for (G = Ya(M); K !== l || G !== l; ) {
            c = K === l ? 1 : G === l ? -1 : K.key === G.key ? 0 : cc({name: K.key, wa: K.value.k()}, {name: G.key, wa: G.value.k()});
            if (0 > c)
                f = ta(s, K.key), t(f) ? (n.push({Nc: K, dd: i[f]}), i[f] = l) : (w[K.key] = m.length, m.push(K)), f = k, K = Ya(x);
            else {
                if (0 < c)
                    f = ta(w, G.key), t(f) ? (n.push({Nc: m[f], dd: G}), m[f] = l) : (s[G.key] = i.length, i.push(G)), f = k;
                else {
                    c = b.F(G.key);
                    if (c = nd(a, c, K.value, G.value))
                        p.push(G), f = k;
                    K =
                            Ya(x)
                }
                G = Ya(M)
            }
            if (!h && f)
                return k
        }
        for (h = 0; h < m.length; h++)
            if (s = m[h])
                c = b.F(s.key), nd(a, c, s.value, P), e.push(new V("child_removed", s.value, s.key));
        for (h = 0; h < i.length; h++)
            if (s = i[h])
                c = b.F(s.key), m = d.V(s.key, s.value), nd(a, c, P, s.value), e.push(new V("child_added", s.value, s.key, m));
        for (h = 0; h < n.length; h++)
            s = n[h].Nc, i = n[h].dd, c = b.F(i.key), m = d.V(i.key, i.value), e.push(new V("child_moved", i.value, i.key, m)), (c = nd(a, c, s.value, i.value)) && p.push(i);
        for (h = 0; h < p.length; h++)
            a = p[h], m = d.V(a.key, a.value), e.push(new V("child_changed",
                    a.value, a.key, m));
        return f
    }
    ;
    function pd() {
        this.O = this.oa = l;
        this.set = {}
    }
    ja(pd, rc);
    r = pd.prototype;
    r.setActive = function(a) {
        this.oa = a
    };
    function qd(a) {
        return a.contains("default")
    }
    function rd(a) {
        return a.oa != l && qd(a)
    }
    r.defaultView = function() {
        return qd(this) ? this.get("default") : l
    };
    r.path = aa("O");
    r.toString = function() {
        return jb(this.keys(), function(a) {
            return"default" === a ? "{}" : a
        }).join("$")
    };
    r.Ta = function() {
        var a = [];
        sc(this, function(b, c) {
            a.push(c.M)
        });
        return a
    };
    function sd(a, b) {
        dd.call(this, a);
        this.g = P;
        this.Tb(b, fd(b))
    }
    ja(sd, dd);
    sd.prototype.Tb = function(a, b) {
        if (b === l)
            return b;
        var c = [], d = this.M;
        t(d.ca) && (t(d.ma) && d.ma != l ? c.push(function(a, b) {
            var c = Sb(b, d.ca);
            return 0 < c || 0 === c && a >= d.ma
        }) : c.push(function(a, b) {
            return 0 <= Sb(b, d.ca)
        }));
        t(d.sa) && (t(d.Na) ? c.push(function(a, b) {
            var c = Sb(b, d.sa);
            return 0 > c || 0 === c && a <= d.Na
        }) : c.push(function(a, b) {
            return 0 >= Sb(b, d.sa)
        }));
        var e = l, f = l;
        if (t(this.M.ua))
            if (t(this.M.ca)) {
                if (e = td(a, c, this.M.ua, o)) {
                    var h = a.R(e).k();
                    c.push(function(a, b) {
                        var c = Sb(b, h);
                        return 0 > c || 0 === c && a <= e
                    })
                }
            } else if (f = td(a, c,
                    this.M.ua, k)) {
                var i = a.R(f).k();
                c.push(function(a, b) {
                    var c = Sb(b, i);
                    return 0 < c || 0 === c && a >= f
                })
            }
        for (var m = [], n = [], p = [], s = [], w = 0; w < b.length; w++) {
            var x = b[w].Y, M = b[w].ka;
            switch (b[w].type) {
                case "child_added":
                    ud(c, x, M) && (this.g = this.g.H(x, M), n.push(b[w]));
                    break;
                case "child_removed":
                    this.g.R(x).f() || (this.g = this.g.H(x, l), m.push(b[w]));
                    break;
                case "child_changed":
                    !this.g.R(x).f() && ud(c, x, M) && (this.g = this.g.H(x, M), s.push(b[w]));
                    break;
                case "child_moved":
                    var K = !this.g.R(x).f(), G = ud(c, x, M);
                    K ? G ? (this.g = this.g.H(x,
                            M), p.push(b[w])) : (m.push(new V("child_removed", this.g.R(x), x)), this.g = this.g.H(x, l)) : G && (this.g = this.g.H(x, M), n.push(b[w]))
                }
        }
        var id = e || f;
        if (id) {
            var jd = (w = f !== l) ? this.g.Oc() : this.g.Pc(), Xb = o, Ta = o, Ua = this;
            (w ? a.mc : a.w).call(a, function(a, b) {
                !Ta && jd === l && (Ta = k);
                if (Ta && Xb)
                    return k;
                Xb ? (m.push(new V("child_removed", Ua.g.R(a), a)), Ua.g = Ua.g.H(a, l)) : Ta && (n.push(new V("child_added", b, a)), Ua.g = Ua.g.H(a, b));
                jd === a && (Ta = k);
                a === id && (Xb = k)
            })
        }
        for (w = 0; w < n.length; w++)
            c = n[w], x = this.g.V(c.Y, c.ka), m.push(new V("child_added",
                    c.ka, c.Y, x));
        for (w = 0; w < p.length; w++)
            c = p[w], x = this.g.V(c.Y, c.ka), m.push(new V("child_moved", c.ka, c.Y, x));
        for (w = 0; w < s.length; w++)
            c = s[w], x = this.g.V(c.Y, c.ka), m.push(new V("child_changed", c.ka, c.Y, x));
        this.fb && 0 < m.length && m.push(new V("value", this.g));
        return m
    };
    function td(a, b, c, d) {
        if (a.J())
            return l;
        var e = l;
        (d ? a.mc : a.w).call(a, function(a, d) {
            if (ud(b, a, d) && (e = a, c--, 0 === c))
                return k
        });
        return e
    }
    function ud(a, b, c) {
        for (var d = 0; d < a.length; d++)
            if (!a[d](b, c.k()))
                return o;
        return k
    }
    sd.prototype.nc = function(a) {
        return this.g.R(a) !== P
    };
    sd.prototype.ab = function(a, b, c) {
        var d = {};
        this.g.J() || this.g.w(function(a) {
            d[a] = k
        });
        var e = this.g, c = T(c, new I("")), f = new Na;
        N(L(f, this.M.path), k);
        var h = P.pa(a, b), i = [];
        md(c, h, a, f, function(a, b, c) {
            c !== l && (i = i.concat(c))
        });
        this.Tb(b, i);
        this.g.J() || this.g.w(function(a) {
            d[a] = k
        });
        this.g = e;
        return d
    };
    function vd(a, b) {
        this.o = a;
        this.i = b;
        this.Tc = b.Ha;
        this.qa = new Na
    }
    vd.prototype.Eb = function(a, b, c, d, e) {
        var f = a.path, h = L(this.qa, f), i = h.j();
        i === l ? (i = new pd, N(h, i)) : z(!i.f(), "We shouldn't be storing empty QueryMaps");
        var m = a.Fa();
        if (i.contains(m))
            ed(i.get(m), b, c, d, e);
        else {
            var n = this.i.Ha.G(f), a = "default" === a.Fa() ? new kd(a, n) : new sd(a, n);
            if (rd(i) || wd(h))
                i.add(m, a), i.O || (i.O = a.M.path);
            else {
                var p, s;
                i.f() || (p = i.toString(), s = i.Ta());
                i.add(m, a);
                i.O || (i.O = a.M.path);
                i.setActive(xd(this, i));
                p && s && this.o.ed(i.path(), p, s)
            }
            rd(i) && Pa(h, function(a) {
                if (a = a.j()) {
                    a.oa && a.oa();
                    a.oa =
                    l
                }
            });
            ed(a, b, c, d, e);
            (b = (b = Qa(L(this.qa, f), function(a) {
                var b;
                if (b = a.j())
                    if (b = a.j().defaultView())
                        b = a.j().defaultView().fb;
                if (b)
                    return k
            }, k)) || this.o === l) && hd(a)
        }
    };
    function yd(a, b, c, d, e) {
        for (var f = a.get(b), h = o, i = f.ia.length - 1; 0 <= i; i--) {
            var m = f.ia[i];
            if ((!c || m.type === c) && (!d || m.ha === d) && (!e || m.Z === e))
                if (f.ia.splice(i, 1), h = k, c && d)
                    break
        }
        (c = h && !(0 < f.ia.length)) && a.remove(b);
        return c
    }
    vd.prototype.Wb = function(a, b, c, d) {
        var e = L(this.qa, a.path).j();
        return e === l ? l : zd(this, e, a, b, c, d)
    };
    function zd(a, b, c, d, e, f) {
        var h = b.path(), h = L(a.qa, h), c = c ? c.Fa() : l, i = [];
        c && "default" !== c ? yd(b, c, d, e, f) && i.push(c) : ib(b.keys(), function(a) {
            yd(b, a, d, e, f) && i.push(a)
        });
        b.f() && N(h, l);
        c = wd(h);
        if (0 < i.length && !c) {
            for (var m = h, n = h.parent(), c = o; !c && n; ) {
                var p = n.j();
                if (p) {
                    z(!rd(p));
                    var s = m.name(), w = o;
                    sc(p, function(a, b) {
                        w = b.nc(s) || w
                    });
                    w && (c = k)
                }
                m = n;
                n = n.parent()
            }
            m = l;
            if (!rd(b)) {
                n = b.oa;
                b.oa = l;
                var x = [], M = function(b) {
                    var c = b.j();
                    if (c && qd(c))
                        x.push(c.path()), c.oa == l && c.setActive(xd(a, c));
                    else {
                        if (c) {
                            c.oa != l || c.setActive(xd(a,
                                    c));
                            var d = {};
                            sc(c, function(a, b) {
                                b.g.w(function(a) {
                                    D(d, a) || (d[a] = k, a = c.path().F(a), x.push(a))
                                })
                            })
                        }
                        b.w(M)
                    }
                };
                M(h);
                m = x;
                n && n()
            }
            return c ? l : m
        }
        return l
    }
    function Ad(a, b, c) {
        Pa(L(a.qa, b), function(a) {
            (a = a.j()) && sc(a, function(a, b) {
                hd(b)
            })
        }, c, k)
    }
    function Bd(a, b, c) {
        function d(a) {
            for (var b = 0; b < c.length; ++b)
                if (c[b].contains(a))
                    return k;
            return o
        }
        var e = a.Tc, f = a.i.Ha;
        a.Tc = f;
        md(e, f, b, a.qa, function(c, e, f) {
            if (b.contains(c)) {
                var n = d(c);
                n && Ad(a, c, o);
                a.Sb(c, e, f);
                n && Ad(a, c, k)
            } else
                a.Sb(c, e, f)
        });
        d(b) && Ad(a, b, k)
    }
    vd.prototype.Sb = function(a, b, c) {
        a = L(this.qa, a).j();
        a !== l && sc(a, function(a, e) {
            e.Sb(b, c)
        })
    };
    function wd(a) {
        return Qa(a, function(a) {
            return a.j() && rd(a.j())
        })
    }
    function xd(a, b) {
        if (a.o) {
            var c = b.keys(), d = a.o, e = function(d) {
                "ok" !== d ? (Rb("on() or once() for " + b.path().toString() + " failed: " + d), b && sc(b, function(a, b) {
                    for (var c = 0; c < b.ia.length; c++) {
                        var d = b.ia[c];
                        d.cancel && (d.Z ? v(d.cancel, d.Z) : d.cancel)()
                    }
                }), zd(a, b)) : ib(c, function(a) {
                    (a = b.get(a)) && hd(a)
                })
            }, f = b.toString(), h = b.path().toString();
            d.ea[h] = d.ea[h] || {};
            z(!d.ea[h][f], "listen() called twice for same path/queryId.");
            d.ea[h][f] = {Ta: b.Ta(), C: e};
            d.U && Mc(d, h, f, b.Ta(), e);
            return v(a.o.ed, a.o, b.path(), b.toString(),
                    b.Ta())
        }
        return ca
    }
    vd.prototype.ab = function(a, b, c, d) {
        var e = {};
        sc(b, function(b, h) {
            var i = h.ab(a, c, d);
            Wb(i, function(a, b) {
                e[b] = a ? k : ta(e, b) || o
            })
        });
        c.J() || c.w(function(a) {
            D(e, a) || (e[a] = o)
        });
        return e
    };
    function Cd(a, b, c, d, e, f) {
        var h = b.path();
        if (f !== l) {
            var i = [];
            d.J() || d.w(function(a, b) {
                i.push({path: h.F(a), Ca: b});
                delete f[a]
            });
            Wb(f, function(a, b) {
                i.push({path: h.F(b), Ca: P})
            });
            return i
        }
        var b = a.ab(h, b, d, e), m = P, n = [];
        Wb(b, function(b, f) {
            var h = new I(f);
            b ? m = m.H(f, d.G(h)) : n = n.concat(Dd(a, d.G(h), L(c, h), e))
        });
        return[{path: h, Ca: m}].concat(n)
    }
    function Ed(a, b, c, d, e) {
        for (var f = L(a.qa, b), h = f.parent(), i = o; !i && h !== l; ) {
            var m = h.j();
            m !== l && (qd(m) ? i = k : (m = a.ab(b, m, c, d), f = f.name(), ta(m, f) && (i = k)));
            f = h;
            h = h.parent()
        }
        if (i)
            return[{path: b, Ca: c}];
        h = L(a.qa, b);
        i = h.j();
        return i !== l ? qd(i) ? [{path: b, Ca: c}] : Cd(a, i, h, c, d, e) : Dd(a, c, h, d)
    }
    function Dd(a, b, c, d) {
        var e = c.j();
        if (e !== l)
            return qd(e) ? [{path: c.path(), Ca: b}] : Cd(a, e, c, b, d, l);
        if (b.J())
            return[];
        var f = [];
        b.w(function(b, e) {
            var m = new I(b);
            f = f.concat(Dd(a, e, L(c, m), d))
        });
        return f
    }
    ;
    function Fd(a) {
        this.P = a;
        this.X = lc(a);
        this.o = new Jc(this.P, v(this.Nb, this), v(this.Lb, this), v(this.kb, this), v(this.vc, this));
        var b = v(function() {
            return new ic(this.X, this.o)
        }, this), a = a.toString();
        kc[a] || (kc[a] = b());
        this.cd = kc[a];
        this.Wa = new Na;
        this.Xa = new Xc;
        this.i = new Yc;
        this.Q = new vd(this.o, this.i.Ia);
        this.oc = new Xc;
        this.pc = new vd(l, this.oc);
        Gd(this, "connected", o);
        Gd(this, "authenticated", o);
        Gd(this, "serverTimeOffset", l);
        this.N = new Tc
    }
    r = Fd.prototype;
    r.toString = function() {
        return(this.P.Yb ? "https://" : "http://") + this.P.host
    };
    r.name = function() {
        return this.P.jb
    };
    r.Nb = function(a, b, c) {
        var d = [];
        if (9 <= a.length && a.lastIndexOf(".priority") === a.length - 9)
            a = new I(a.substring(0, a.length - 9)), c = T(this.i.xb, a).Cb(b), d.push(a);
        else if (c) {
            var a = new I(a), c = T(this.i.xb, a), e;
            for (e in b) {
                var f = new I(e), c = c.pa(f, R(b[e]));
                d.push(a.F(e))
            }
        } else
            a = new I(a), c = R(b), d.push(a);
        b = Ed(this.Q, a, c, this.i.L, l);
        e = o;
        for (c = 0; c < b.length; ++c) {
            var f = b[c], h = this.i, i = f.path;
            U(h.xb, i, f.Ca);
            e = Zc(h, i) || e
        }
        e && (a = Hd(this, a));
        Bd(this.Q, a, d)
    };
    r.Lb = function(a) {
        Gd(this, "connected", a);
        if (a === o) {
            this.e("onDisconnectEvents");
            var b = this, c = [];
            Wc(this.N, new I(""), function(a, e) {
                var f = Ed(b.Q, a, e, b.i.L, l);
                c.push.apply(c, b.i.set(a, f));
                f = Id(b, a);
                Hd(b, f);
                Bd(b.Q, f, [a])
            });
            ad(this.i, c);
            this.N = new Tc
        }
    };
    r.vc = function(a) {
        var b = this;
        Vb(a, function(a, d) {
            Gd(b, d, a)
        })
    };
    r.kb = function(a) {
        Gd(this, "authenticated", a)
    };
    function Gd(a, b, c) {
        b = new I("/.info/" + b);
        U(a.oc, b, R(c));
        Bd(a.pc, b, [b])
    }
    r.Ya = function(a, b, c) {
        this.o.Ya(a, function(a, c) {
            X(b, a, c)
        }, function(a, b) {
            Rb("auth() was canceled: " + b);
            if (c) {
                var f = Error(b);
                f.code = a.toUpperCase();
                c(f)
            }
        })
    };
    r.Bb = function() {
        this.o.Bb()
    };
    r.Va = function(a, b, c, d) {
        this.e("set", {path: a.toString(), value: b});
        var b = R(b, c), c = Ed(this.Q, a, b, this.i.L, l), e = this.i.set(a, c), f = this;
        this.o.put(a.toString(), b.T(k), function(b) {
            var c = "ok" === b;
            ad(f.i, e);
            c || (Rb("set at " + a + " failed: " + b), Zc(f.i, a), c = Hd(f, a), Bd(f.Q, c, []));
            X(d, b)
        });
        b = Id(this, a);
        Hd(this, b);
        Bd(this.Q, b, [a])
    };
    r.update = function(a, b, c) {
        this.e("update", {path: a.toString(), value: b});
        var d = T(this.i.Ia, a), e = k, f = [], h;
        for (h in b) {
            var e = o, i = R(b[h]), d = d.H(h, i);
            f.push(a.F(h))
        }
        if (e)
            O("update() called with empty data.  Don't do anything."), X(c, "ok");
        else {
            var d = Ed(this.Q, a, d, this.i.L, b), m = this.i.set(a, d), n = this;
            Rc(this.o, "m", a.toString(), b, function(b) {
                z("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
                ad(n.i, m);
                X(c, b)
            }, j);
            b = Id(this, a);
            Hd(this, b);
            Bd(n.Q, b, f)
        }
    };
    r.Ac = function(a, b, c) {
        this.e("setPriority", {path: a.toString(), wa: b});
        var d = T(this.i.L, a).Cb(b), d = Ed(this.Q, a, d, this.i.L, l), e = this.i.set(a, d), f = this;
        this.o.put(a.toString() + "/.priority", b, function(a) {
            ad(f.i, e);
            X(c, a)
        });
        a = Hd(this, a);
        Bd(f.Q, a, [])
    };
    r.sc = function(a, b) {
        var c = this;
        this.o.sc(a.toString(), function(d) {
            "ok" === d && Vc(c.N, a);
            X(b, d)
        })
    };
    function Jd(a, b, c, d) {
        var e = R(c);
        Pc(a.o, b.toString(), e.T(k), function(c) {
            "ok" === c && Uc(a.N, b, e);
            X(d, c)
        })
    }
    function Kd(a) {
        gc(a.X, "deprecated_on_disconnect");
        a.cd.Dc.deprecated_on_disconnect = k
    }
    r.Eb = function(a, b, c, d, e) {
        ".info" === F(a.path) ? this.pc.Eb(a, b, c, d, e) : this.Q.Eb(a, b, c, d, e)
    };
    r.Wb = function(a, b, c, d) {
        ".info" === F(a.path) ? this.pc.Wb(a, b, c, d) : this.Q.Wb(a, b, c, d)
    };
    r.Pa = function() {
        this.o.Pa()
    };
    r.vb = function() {
        this.o.vb()
    };
    r.Bc = function(a) {
        if ("undefined" !== typeof console) {
            a ? (this.ac || (this.ac = new hc(this.X)), a = this.ac.get()) : a = this.X.get();
            var b = a, c = [], d = 0, e;
            for (e in b)
                c[d++] = e;
            var f = function(a, b) {
                return Math.max(b.length, a)
            };
            if (c.reduce)
                e = c.reduce(f, 0);
            else {
                var h = 0;
                ib(c, function(a) {
                    h = f.call(j, h, a)
                });
                e = h
            }
            for (var i in a) {
                b = a[i];
                for (c = i.length; c < e + 2; c++)
                    i += " ";
                console.log(i + b)
            }
        }
    };
    r.Cc = function(a) {
        gc(this.X, a);
        this.cd.Dc[a] = k
    };
    r.e = function() {
        O("r:" + this.o.id + ":", arguments)
    };
    function X(a, b, c) {
        if (a)
            if ("ok" == b)
                a(l, c);
            else {
                var d = b = (b || "error").toUpperCase();
                c && (d += ": " + c);
                c = Error(d);
                c.code = b;
                a(c)
            }
    }
    ;
    function Ld(a, b) {
        var c = b || a.Wa;
        b || Md(a, c);
        if (c.j() !== l) {
            var d = Nd(a, c);
            z(0 < d.length);
            if (2 !== d[0].status && 4 !== d[0].status) {
                for (var e = c.path(), f = 0; f < d.length; f++)
                    z(1 === d[f].status, "tryToSendTransactionQueue_: items in queue should all be run."), d[f].status = 2, d[f].ad++;
                c = T(a.i.L, e).hash();
                U(a.i.L, e, T(a.i.Ia, e));
                for (var h = T(a.Xa, e).T(k), i = Hb(), m = {}, n = 0; n < d.length; n++)
                    d[n].gc && (m[d[n].path.toString()] = d[n].path);
                var p = [], s;
                for (s in m)
                    p.push(m[s]);
                for (f = 0; f < p.length; f++)
                    N(L(a.i.pb, p[f]), i);
                a.o.put(e.toString(),
                        h, function(b) {
                    a.e("transaction put response", {path: e.toString(), status: b});
                    for (f = 0; f < p.length; f++) {
                        var c = L(a.i.pb, p[f]), h = c.j();
                        z(h !== l, "sendTransactionQueue_: pendingPut should not be null.");
                        h === i && (N(c, l), U(a.i.L, p[f], T(a.i.xb, p[f])))
                    }
                    if ("ok" === b) {
                        b = [];
                        for (f = 0; f < d.length; f++)
                            d[f].status = 3, d[f].C && (c = Od(a, d[f].path), b.push(v(d[f].C, l, l, k, c))), d[f].dc();
                        Md(a, L(a.Wa, e));
                        Ld(a);
                        for (f = 0; f < b.length; f++)
                            b[f]()
                    } else {
                        if ("datastale" === b)
                            for (f = 0; f < d.length; f++)
                                d[f].status = 4 === d[f].status ? 5 : 1;
                        else {
                            Rb("transaction at " +
                                    e + " failed: " + b);
                            for (f = 0; f < d.length; f++)
                                d[f].status = 5, d[f].ec = b
                        }
                        b = Hd(a, e);
                        Bd(a.Q, b, [e])
                    }
                }, c)
            }
        } else
            c.bb() && c.w(function(b) {
                Ld(a, b)
            })
    }
    function Hd(a, b) {
        var c = Pd(a, b), d = c.path(), e = Nd(a, c);
        U(a.i.Ia, d, T(a.i.L, d));
        U(a.Xa, d, T(a.i.L, d));
        if (0 !== e.length) {
            for (var f = c = T(a.i.Ia, d), h = [], i = 0; i < e.length; i++) {
                var m = La(d, e[i].path), n = o, p;
                z(m !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                if (5 === e[i].status)
                    n = k, p = e[i].ec;
                else if (1 === e[i].status)
                    if (25 <= e[i].ad)
                        n = k, p = "maxretry";
                    else {
                        var s = e[i].update(c.G(m).T());
                        t(s) ? (za("transaction failed: Data returned ", s), s = R(s), c = c.pa(m, s), e[i].gc && (f = f.pa(m, s))) : (n = k, p = "nodata")
                    }
                n && (e[i].dc(),
                        e[i].status = 3, e[i].C && (n = new W(a, e[i].path), m = new S(c.G(m), n), "nodata" === p ? h.push(v(e[i].C, l, l, o, m)) : h.push(v(e[i].C, l, Error(p), o, m))))
            }
            p = T(a.i.L, d).k();
            c = c.Cb(p);
            f = f.Cb(p);
            U(a.Xa, d, c);
            U(a.i.Ia, d, f);
            Md(a, a.Wa);
            for (i = 0; i < h.length; i++)
                h[i]();
            Ld(a)
        }
        return d
    }
    function Pd(a, b) {
        for (var c, d = a.Wa; (c = F(b)) !== l && d.j() === l; )
            d = L(d, c), b = J(b);
        return d
    }
    function Nd(a, b) {
        var c = [];
        Qd(a, b, c);
        c.sort(function(a, b) {
            return a.Vc - b.Vc
        });
        return c
    }
    function Qd(a, b, c) {
        var d = b.j();
        if (d !== l)
            for (var e = 0; e < d.length; e++)
                c.push(d[e]);
        b.w(function(b) {
            Qd(a, b, c)
        })
    }
    function Md(a, b) {
        var c = b.j();
        if (c) {
            for (var d = 0, e = 0; e < c.length; e++)
                3 !== c[e].status && (c[d] = c[e], d++);
            c.length = d;
            N(b, 0 < c.length ? c : l)
        }
        b.w(function(b) {
            Md(a, b)
        })
    }
    function Id(a, b) {
        var c = Pd(a, b).path(), d = L(a.Wa, b);
        Qa(d, function(a) {
            Rd(a)
        });
        Rd(d);
        Pa(d, function(a) {
            Rd(a)
        });
        return c
    }
    function Rd(a) {
        var b = a.j();
        if (b !== l) {
            for (var c = [], d = -1, e = 0; e < b.length; e++)
                4 !== b[e].status && (2 === b[e].status ? (z(d === e - 1, "All SENT items should be at beginning of queue."), d = e, b[e].status = 4, b[e].ec = "set") : (z(1 === b[e].status), b[e].dc(), b[e].C && c.push(v(b[e].C, l, Error("set"), o, l))));
            -1 === d ? N(a, l) : b.length = d + 1;
            for (e = 0; e < c.length; e++)
                c[e]()
        }
    }
    function Od(a, b) {
        var c = new W(a, b);
        return new S(T(a.Xa, b), c)
    }
    ;
    function Y() {
        this.Ua = {}
    }
    Y.qd = function() {
        return Y.Qc ? Y.Qc : Y.Qc = new Y
    };
    Y.prototype.Pa = function() {
        for (var a in this.Ua)
            this.Ua[a].Pa()
    };
    Y.prototype.interrupt = Y.prototype.Pa;
    Y.prototype.vb = function() {
        for (var a in this.Ua)
            this.Ua[a].vb()
    };
    Y.prototype.resume = Y.prototype.vb;
    var Z = {rd: function(a) {
            var b = Q.prototype.hash;
            Q.prototype.hash = a;
            var c = Zb.prototype.hash;
            Zb.prototype.hash = a;
            return function() {
                Q.prototype.hash = b;
                Zb.prototype.hash = c
            }
        }};
    Z.hijackHash = Z.rd;
    Z.Fa = function(a) {
        return a.Fa()
    };
    Z.queryIdentifier = Z.Fa;
    Z.td = function(a) {
        return a.u.o.ea
    };
    Z.listens = Z.td;
    Z.Ad = function(a) {
        return a.u.o.sb
    };
    Z.refConnection = Z.Ad;
    Z.gd = Jc;
    Z.DataConnection = Z.gd;
    Jc.prototype.sendRequest = Jc.prototype.xa;
    Jc.prototype.interrupt = Jc.prototype.Pa;
    Z.hd = Dc;
    Z.RealTimeConnection = Z.hd;
    Dc.prototype.sendRequest = Dc.prototype.zc;
    Dc.prototype.close = Dc.prototype.close;
    Z.fd = qb;
    Z.ConnectionTarget = Z.fd;
    Z.od = function() {
        wc = oc = k
    };
    Z.forceLongPolling = Z.od;
    Z.pd = function() {
        xc = k
    };
    Z.forceWebSockets = Z.pd;
    Z.Gd = function(a, b) {
        a.u.o.yc = b
    };
    Z.setSecurityDebugCallback = Z.Gd;
    Z.Bc = function(a, b) {
        a.u.Bc(b)
    };
    Z.stats = Z.Bc;
    Z.Cc = function(a, b) {
        a.u.Cc(b)
    };
    Z.statsIncrementCounter = Z.Cc;
    function $(a, b, c) {
        this.tb = a;
        this.O = b;
        this.va = c
    }
    $.prototype.cancel = function(a) {
        A("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        C("Firebase.onDisconnect().cancel", 1, a, k);
        this.tb.sc(this.O, a)
    };
    $.prototype.cancel = $.prototype.cancel;
    $.prototype.remove = function(a) {
        A("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        E("Firebase.onDisconnect().remove", this.O);
        C("Firebase.onDisconnect().remove", 1, a, k);
        Jd(this.tb, this.O, l, a)
    };
    $.prototype.remove = $.prototype.remove;
    $.prototype.set = function(a, b) {
        A("Firebase.onDisconnect().set", 1, 2, arguments.length);
        E("Firebase.onDisconnect().set", this.O);
        ya("Firebase.onDisconnect().set", a, o);
        C("Firebase.onDisconnect().set", 2, b, k);
        Jd(this.tb, this.O, a, b)
    };
    $.prototype.set = $.prototype.set;
    $.prototype.Va = function(a, b, c) {
        A("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        E("Firebase.onDisconnect().setWithPriority", this.O);
        ya("Firebase.onDisconnect().setWithPriority", a, o);
        Da("Firebase.onDisconnect().setWithPriority", 2, b, o);
        C("Firebase.onDisconnect().setWithPriority", 3, c, k);
        (".length" === this.va || ".keys" === this.va) && g("Firebase.onDisconnect().setWithPriority failed: " + this.va + " is a read-only object.");
        var d = this.tb, e = this.O, f = R(a, b);
        Pc(d.o, e.toString(), f.T(k), function(a) {
            "ok" ===
                    a && Uc(d.N, e, f);
            X(c, a)
        })
    };
    $.prototype.setWithPriority = $.prototype.Va;
    $.prototype.update = function(a, b) {
        A("Firebase.onDisconnect().update", 1, 2, arguments.length);
        E("Firebase.onDisconnect().update", this.O);
        Ca("Firebase.onDisconnect().update", a);
        C("Firebase.onDisconnect().update", 2, b, k);
        var c = this.tb, d = this.O, e = k, f;
        for (f in a)
            e = o;
        if (e)
            O("onDisconnect().update() called with empty data.  Don't do anything."), X(b, k);
        else {
            e = c.o;
            f = d.toString();
            var h = function(e) {
                if ("ok" === e)
                    for (var f in a) {
                        var h = R(a[f]);
                        Uc(c.N, d.F(f), h)
                    }
                X(b, e)
            };
            e.U ? Qc(e, "om", f, a, h) : e.lb.push({xc: f, action: "om",
                data: a, C: h})
        }
    };
    $.prototype.update = $.prototype.update;
    var Sd, Td = 0, Ud = [];
    Sd = function(a) {
        var b = a === Td;
        Td = a;
        for (var c = Array(8), d = 7; 0 <= d; d--)
            c[d] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(a % 64), a = Math.floor(a / 64);
        z(0 === a);
        a = c.join("");
        if (b) {
            for (d = 11; 0 <= d && 63 === Ud[d]; d--)
                Ud[d] = 0;
            Ud[d]++
        } else
            for (d = 0; 12 > d; d++)
                Ud[d] = Math.floor(64 * Math.random());
        for (d = 0; 12 > d; d++)
            a += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(Ud[d]);
        z(20 === a.length, "NextPushId: Length should be 20.");
        return a
    };
    function W() {
        var a, b, c;
        if (arguments[0]instanceof Fd)
            c = arguments[0], a = arguments[1];
        else {
            A("new Firebase", 1, 2, arguments.length);
            var d = arguments[0];
            b = a = "";
            var e = k, f = "";
            if (u(d)) {
                var h = d.indexOf("//");
                if (0 <= h)
                    var i = d.substring(0, h - 1), d = d.substring(h + 2);
                h = d.indexOf("/");
                -1 === h && (h = d.length);
                a = d.substring(0, h);
                var d = d.substring(h + 1), m = a.split(".");
                if (3 == m.length) {
                    h = m[2].indexOf(":");
                    e = 0 <= h ? "https" === i : k;
                    if ("firebase" === m[1])
                        Qb(a + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
                    else {
                        b = m[0];
                        f = "";
                        d = ("/" + d).split("/");
                        for (i = 0; i < d.length; i++)
                            if (0 < d[i].length) {
                                h = d[i];
                                try {
                                    h = decodeURIComponent(h.replace(/\+/g, " "))
                                } catch (n) {
                                }
                                f += "/" + h
                            }
                    }
                    b = b.toLowerCase()
                } else
                    b = l
            }
            e || "undefined" !== typeof window && (window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:")) && Rb("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
            a = new qb(a, e, b);
            b = new I(f);
            e = b.toString();
            if (!(d = !u(a.host)))
                if (!(d = 0 === a.host.length))
                    if (!(d = !xa(a.jb)))
                        if (d =
                                0 !== e.length)
                            e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), d = !(u(e) && 0 !== e.length && !wa.test(e));
            d && g(Error(B("new Firebase", 1, o) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".'));
            arguments[1] ? arguments[1]instanceof Y ? c = arguments[1] : g(Error("Expected a valid Firebase.Context for second argument to new Firebase()")) : c = Y.qd();
            e = a.toString();
            d = ta(c.Ua, e);
            d || (d = new Fd(a), c.Ua[e] = d);
            c = d;
            a = b
        }
        H.call(this, c, a)
    }
    ja(W, H);
    var Vd = W, Wd = ["Firebase"], Xd = ba;
    !(Wd[0]in Xd) && Xd.execScript && Xd.execScript("var " + Wd[0]);
    for (var Yd; Wd.length && (Yd = Wd.shift()); )
        !Wd.length && t(Vd) ? Xd[Yd] = Vd : Xd = Xd[Yd] ? Xd[Yd] : Xd[Yd] = {};
    W.prototype.name = function() {
        A("Firebase.name", 0, 0, arguments.length);
        return this.path.f() ? l : Ka(this.path)
    };
    W.prototype.name = W.prototype.name;
    W.prototype.F = function(a) {
        A("Firebase.child", 1, 1, arguments.length);
        if (fa(a))
            a = String(a);
        else if (!(a instanceof I))
            if (F(this.path) === l) {
                var b = a;
                b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
                Ga("Firebase.child", b)
            } else
                Ga("Firebase.child", a);
        return new W(this.u, this.path.F(a))
    };
    W.prototype.child = W.prototype.F;
    W.prototype.parent = function() {
        A("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return a === l ? l : new W(this.u, a)
    };
    W.prototype.parent = W.prototype.parent;
    W.prototype.root = function() {
        A("Firebase.ref", 0, 0, arguments.length);
        for (var a = this; a.parent() !== l; )
            a = a.parent();
        return a
    };
    W.prototype.root = W.prototype.root;
    W.prototype.toString = function() {
        A("Firebase.toString", 0, 0, arguments.length);
        var a;
        if (this.parent() === l)
            a = this.u.toString();
        else {
            a = this.parent().toString() + "/";
            var b = this.name();
            a += encodeURIComponent(String(b))
        }
        return a
    };
    W.prototype.toString = W.prototype.toString;
    W.prototype.set = function(a, b) {
        A("Firebase.set", 1, 2, arguments.length);
        E("Firebase.set", this.path);
        ya("Firebase.set", a, o);
        C("Firebase.set", 2, b, k);
        return this.u.Va(this.path, a, l, b)
    };
    W.prototype.set = W.prototype.set;
    W.prototype.update = function(a, b) {
        A("Firebase.update", 1, 2, arguments.length);
        E("Firebase.update", this.path);
        Ca("Firebase.update", a);
        C("Firebase.update", 2, b, k);
        return this.u.update(this.path, a, b)
    };
    W.prototype.update = W.prototype.update;
    W.prototype.Va = function(a, b, c) {
        A("Firebase.setWithPriority", 2, 3, arguments.length);
        E("Firebase.setWithPriority", this.path);
        ya("Firebase.setWithPriority", a, o);
        Da("Firebase.setWithPriority", 2, b, o);
        C("Firebase.setWithPriority", 3, c, k);
        (".length" === this.name() || ".keys" === this.name()) && g("Firebase.setWithPriority failed: " + this.name() + " is a read-only object.");
        return this.u.Va(this.path, a, b, c)
    };
    W.prototype.setWithPriority = W.prototype.Va;
    W.prototype.remove = function(a) {
        A("Firebase.remove", 0, 1, arguments.length);
        E("Firebase.remove", this.path);
        C("Firebase.remove", 1, a, k);
        this.set(l, a)
    };
    W.prototype.remove = W.prototype.remove;
    W.prototype.transaction = function(a, b, c) {
        function d() {
        }
        A("Firebase.transaction", 1, 3, arguments.length);
        E("Firebase.transaction", this.path);
        C("Firebase.transaction", 1, a, o);
        C("Firebase.transaction", 2, b, k);
        t(c) && "boolean" != typeof c && g(Error(B("Firebase.transaction", 3, k) + "must be a boolean."));
        (".length" === this.name() || ".keys" === this.name()) && g("Firebase.transaction failed: " + this.name() + " is a read-only object.");
        "undefined" === typeof c && (c = k);
        var e = this.u, f = this.path, h = c;
        e.e("transaction on " + f);
        var i =
                new W(e, f);
        i.qc("value", d);
        var h = {path: f, update: a, C: b, status: l, Vc: Hb(), gc: h, ad: 0, dc: function() {
                i.Kb("value", d)
            }, ec: l}, m = h.update(T(e.Xa, f).T());
        if (t(m)) {
            za("transaction failed: Data returned ", m);
            h.status = 1;
            var n = L(e.Wa, f), p = n.j() || [];
            p.push(h);
            N(n, p);
            n = T(e.i.L, f).k();
            U(e.Xa, f, R(m, n));
            h.gc && (U(e.i.Ia, f, R(m, n)), Bd(e.Q, f, [f]));
            Ld(e)
        } else
            h.dc(), h.C && (e = Od(e, f), h.C(l, o, e))
    };
    W.prototype.transaction = W.prototype.transaction;
    W.prototype.Ac = function(a, b) {
        A("Firebase.setPriority", 1, 2, arguments.length);
        E("Firebase.setPriority", this.path);
        Da("Firebase.setPriority", 1, a, o);
        C("Firebase.setPriority", 2, b, k);
        this.u.Ac(this.path, a, b)
    };
    W.prototype.setPriority = W.prototype.Ac;
    W.prototype.push = function(a, b) {
        A("Firebase.push", 0, 2, arguments.length);
        E("Firebase.push", this.path);
        ya("Firebase.push", a, k);
        C("Firebase.push", 2, b, k);
        var c = T(this.u.oc, new I(".info/serverTimeOffset")).T() || 0, c = Sd((new Date).getTime() + c), c = this.F(c);
        "undefined" !== typeof a && a !== l && c.set(a, b);
        return c
    };
    W.prototype.push = W.prototype.push;
    W.prototype.fa = function() {
        return new $(this.u, this.path, this.name())
    };
    W.prototype.onDisconnect = W.prototype.fa;
    W.prototype.Bd = function() {
        Rb("FirebaseRef.removeOnDisconnect() being deprecated. Please use FirebaseRef.onDisconnect().remove() instead.");
        this.fa().remove();
        Kd(this.u)
    };
    W.prototype.removeOnDisconnect = W.prototype.Bd;
    W.prototype.Fd = function(a) {
        Rb("FirebaseRef.setOnDisconnect(value) being deprecated. Please use FirebaseRef.onDisconnect().set(value) instead.");
        this.fa().set(a);
        Kd(this.u)
    };
    W.prototype.setOnDisconnect = W.prototype.Fd;
    W.prototype.Ya = function(a, b, c) {
        A("Firebase.auth", 1, 3, arguments.length);
        u(a) || g(Error(B("Firebase.auth", 1, o) + "must be a valid credential (a string)."));
        C("Firebase.auth", 2, b, k);
        C("Firebase.auth", 3, b, k);
        this.u.Ya(a, b, c)
    };
    W.prototype.auth = W.prototype.Ya;
    W.prototype.Bb = function() {
        this.u.Bb()
    };
    W.prototype.unauth = W.prototype.Bb;
    function Nb(a, b) {
        z(!b || a === k || a === o, "Can't turn on custom loggers persistently.");
        a === k ? ("undefined" !== typeof console && ("function" === typeof console.log ? Lb = v(console.log, console) : "object" === typeof console.log && (Lb = function(a) {
            console.log(a)
        })), b && ob.setItem("logging_enabled", "true")) : a ? Lb = a : (Lb = l, ob.removeItem("logging_enabled"))
    }
    W.enableLogging = Nb;
    W.INTERNAL = Z;
    W.Context = Y;
})();
