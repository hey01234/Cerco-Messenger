/* Dailymotion SDK - 2024-04-02T07:30:21.193Z */
if (!this.JSON) {
    this.JSON = {}
}
(function () {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
            ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === "string") {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
if (!window.DM) {
    DM = {
        _apiKey: null,
        _session: null,
        _userStatus: "unknown",
        _refreshRequested: false,
        _refreshCallbacks: [],
        _sessionLoadingMethod: null,
        _logging: true,
        _domain: {
            api: "https://api.dailymotion.com",
            www: "//www.dailymotion.com",
            cdn: "//api.dmcdn.net"
        },
        _oauth: {
            logoutUrl: "https://www.dailymotion.com/oauth/logout",
            authorizeUrl: "https://www.dailymotion.com/oauth/authorize",
            tokenUrl: "https://graphql.api.dailymotion.com/oauth/token"
        },
        copy: function (e, d, b, a) {
            for (var c in d) {
                if (b || typeof e[c] === "undefined") {
                    e[c] = a ? a(d[c]) : d[c]
                }
            }
            return e
        },
        create: function (d, g) {
            var f = window.DM
                , a = d ? d.split(".") : []
                , j = a.length;
            for (var e = 0; e < j; e++) {
                var b = a[e];
                var h = f[b];
                if (!h) {
                    h = (g && e + 1 == j) ? g : {};
                    f[b] = h
                }
                f = h
            }
            return f
        },
        provide: function (c, b, a) {
            return DM.copy(typeof c == "string" ? DM.create(c) : c, b, a)
        },
        guid: function () {
            return "f" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
        },
        log: function (a) {
            if (DM._logging) {
                if (window.Debug && window.Debug.writeln) {
                    window.Debug.writeln(a)
                } else {
                    if (window.console) {
                        window.console.log(a)
                    }
                }
            }
            if (DM.Event) {
                DM.Event.fire("dm.log", a)
            }
        },
        error: function (a) {
            if (window.console) {
                window.console.error(a)
            }
            if (DM.Event) {
                DM.Event.fire("dm.error", a)
            }
        },
        warn: function (b) {
            try {
                if (console && typeof console.warn === "function") {
                    console.warn(b)
                }
            } catch (a) { }
        },
        $: function (a) {
            if (typeof a == "string") {
                a = document.getElementById(a)
            }
            return a
        },
        parseBool: function (a) {
            if (a === true || a === false) {
                return a
            }
            if (a === 0) {
                return false
            }
            if (typeof a == "string") {
                return !a.match(/^(?:|false|no|off|0)$/i)
            }
            return !!a
        },
        type: function (e) {
            if (!DM._class2type) {
                DM._class2type = {};
                var d = "Boolean Number String Function Array Date RegExp Object".split(" ");
                for (var c = 0, a = d.length; c < a; c++) {
                    var b = d[c];
                    DM._class2type["[object " + b + "]"] = b.toLowerCase()
                }
                DM._class2type["[object Undefined]"] = "undefined"
            }
            return e === null ? String(e) : DM._class2type[Object.prototype.toString.call(e)] || "object"
        }
    }
}
DM.provide("JSON", {
    stringify: function (a) {
        if (window.Prototype && Object.toJSON) {
            return Object.toJSON(a)
        } else {
            return JSON.stringify(a)
        }
    },
    parse: function (a) {
        return JSON.parse(a)
    },
    flatten: function (c) {
        var d = {};
        for (var a in c) {
            if (c.hasOwnProperty(a)) {
                var b = c[a];
                if (null === b || undefined === b) {
                    continue
                } else {
                    if (typeof b == "string") {
                        d[a] = b
                    } else {
                        d[a] = DM.JSON.stringify(b)
                    }
                }
            }
        }
        return d
    }
});
DM.provide("Array", {
    indexOf: function (a, d) {
        if (a.indexOf) {
            return a.indexOf(d)
        }
        var c = a.length;
        if (c) {
            for (var b = 0; b < c; b++) {
                if (a[b] === d) {
                    return b
                }
            }
        }
        return -1
    },
    merge: function (c, b) {
        for (var a = 0; a < b.length; a++) {
            if (DM.Array.indexOf(c, b[a]) < 0) {
                c.push(b[a])
            }
        }
        return c
    },
    flatten: function (a) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                if (DM.type(a[b]) == "array") {
                    a[b] = a[b].join(",")
                }
            }
        }
        return a
    },
    filter: function (c, e) {
        var a = [];
        for (var d = 0; d < c.length; d++) {
            if (e(c[d])) {
                a.push(c[d])
            }
        }
        return a
    },
    keys: function (d, c) {
        var a = [];
        for (var b in d) {
            if (c || d.hasOwnProperty(b)) {
                a.push(b)
            }
        }
        return a
    },
    map: function (a, c) {
        var b = [];
        for (var d = 0; d < a.length; d++) {
            b.push(c(a[d]))
        }
        return b
    },
    forEach: function (f, d, e) {
        if (!f) {
            return
        }
        if (Object.prototype.toString.apply(f) === "[object Array]" || (!(f instanceof Function) && typeof f.length == "number")) {
            if (f.forEach) {
                f.forEach(d)
            } else {
                for (var c = 0, a = f.length; c < a; c++) {
                    d(f[c], c, f)
                }
            }
        } else {
            for (var b in f) {
                if (e || f.hasOwnProperty(b)) {
                    d(f[b], b, f)
                }
            }
        }
    }
});
DM.provide("Cookie", {
    _domain: null,
    _enabled: false,
    setEnabled: function (a) {
        DM.Cookie._enabled = a
    },
    getEnabled: function () {
        return DM.Cookie._enabled
    },
    getKeyValuePair: function (c) {
        var h = c.indexOf("=");
        h = h < 0 ? c.length : h;
        var d = c.substr(0, h);
        var f = c.substr(h + 1);
        var a;
        var b;
        try {
            a = decodeURIComponent(d)
        } catch (g) {
            console.error("Could not decode cookie key: " + d)
        }
        try {
            b = decodeURIComponent(f)
        } catch (g) {
            console.error("Could not decode cookie value: " + f)
        }
        return {
            key: a,
            value: b
        }
    },
    getCookieValue: function (d) {
        var e = d + "=";
        var a = document.cookie.split(";");
        for (var b = 0; b < a.length; b++) {
            var f = a[b];
            while (f.charAt(0) == " ") {
                f = f.substring(1, f.length)
            }
            if (f.indexOf(e) == 0) {
                return f.substring(e.length, f.length)
            }
        }
        return null
    },
    load: function () {
        var a = document.cookie.split("; ");
        var c, b;
        DM.Array.forEach(a, function (d) {
            var e = DM.Cookie.getKeyValuePair(d);
            if (e.key.match("dms_" + DM._apiKey)) {
                e.value = e.value.replace(/^"(.+(?="$))"$/, "$1");
                c = e
            }
        });
        if (c) {
            b = DM.QS.decode(c.value);
            b.expires = parseInt(b.expires, 10);
            DM.Cookie._domain = b.base_domain
        }
        return b
    },
    setRaw: function (c, a, b) {
        var d = (c + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
        document.cookie = "dms_" + DM._apiKey + '="' + d + '"' + (d && a == 0 ? "" : "; expires=" + new Date(a * 1000).toGMTString()) + "; path=/" + (b && b !== "localhost" ? "; domain=." + b : "");
        DM.Cookie._domain = b
    },
    setNeonCookies: function (c, d, b) {
        if (typeof b === "undefined") {
            return
        }
        var a = new Date();
        a.setSeconds(a.getSeconds() + b);
        var f = new Date(a.getTime());
        var e = f.setSeconds(f.getSeconds() + 3600 * 24 * 30 * 3);
        if (c) {
            document.cookie = "access_token=" + c + "; expires=" + new Date(a).toUTCString() + "; path=/"
        }
        if (d) {
            document.cookie = "refresh_token=" + d + "; expires=" + new Date(e).toUTCString() + "; path=/"
        }
    },
    set: function (a) {
        if (a) {
            DM.Cookie.setRaw(DM.QS.encode(a), a.expires, a.base_domain)
        } else {
            DM.Cookie.clear()
        }
    },
    clear: function () {
        DM.Cookie.setRaw("", 0, DM.Cookie._domain)
    }
});
DM.provide("EventProvider", {
    subscribers: function () {
        if (!this._subscribersMap) {
            this._subscribersMap = {}
        }
        return this._subscribersMap
    },
    subscribe: function (b, a) {
        var c = this.subscribers();
        if (!c[b]) {
            c[b] = [a]
        } else {
            c[b].push(a)
        }
    },
    unsubscribe: function (b, a) {
        var c = this.subscribers()[b];
        DM.Array.forEach(c, function (e, d) {
            if (e == a) {
                c[d] = null
            }
        })
    },
    monitor: function (b, d) {
        if (!d()) {
            var a = this
                , c = function () {
                    if (d.apply(d, arguments)) {
                        a.unsubscribe(b, c)
                    }
                };
            this.subscribe(b, c)
        }
    },
    clear: function (a) {
        delete this.subscribers()[a]
    },
    fire: function () {
        var b = Array.prototype.slice.call(arguments)
            , a = b.shift();
        DM.Array.forEach(this.subscribers()[a], function (c) {
            if (c) {
                c.apply(this, b)
            }
        })
    }
});
DM.provide("Event", DM.EventProvider);
DM.provide("", {
    init: function (a) {
        a = DM.copy(a || {}, {
            logging: true
        });
        DM._apiKey = a.apiKey;
        if (!a.logging && window.location.toString().indexOf("dm_debug=1") < 0) {
            DM._logging = false
        }
        if (DM._apiKey) {
            DM._apiSecret = a.apiSecret || null;
            DM.Cookie.setEnabled(a.cookie);
            DM.Auth.readFragment();
            var c;
            var b = DM.Auth.loadSiteSession();
            if (null !== b.session) {
                c = b.session;
                DM._sessionLoadingMethod = b.loading_method
            } else {
                if (a.session) {
                    c = a.session;
                    DM._sessionLoadingMethod = "init_options"
                } else {
                    if (DM.Auth._receivedSession) {
                        c = DM.Auth._receivedSession;
                        DM._sessionLoadingMethod = "fragment"
                    } else {
                        c = DM.Cookie.load();
                        DM._sessionLoadingMethod = "local_cookies"
                    }
                }
            }
            if (null !== c && DM.Auth.isSessionExpired(c)) {
                DM.Auth.refreshToken(c, function () {
                    if (a.status) {
                        DM.getLoginStatus()
                    }
                })
            } else {
                DM.Auth.setSession(c, c ? "connected" : "unknown")
            }
            if (a.status) {
                DM.getLoginStatus()
            }
        }
    }
});
window.setTimeout(function () {
    if (window.dmAsyncInit) {
        dmAsyncInit()
    }
}, 0);
DM.provide("QS", {
    encode: function (d, a, b) {
        a = a === undefined ? "&" : a;
        b = b === false ? function (e) {
            return e
        }
            : encodeURIComponent;
        var c = [];
        DM.Array.forEach(d, function (f, e) {
            if (f !== null && typeof f != "undefined") {
                c.push(b(e) + "=" + b(f))
            }
        });
        c.sort();
        return c.join(a)
    },
    decode: function (h) {
        var g = h.split("&");
        var a = decodeURIComponent;
        var b = {};
        for (var f = 0; f < g.length; f += 1) {
            var d = g[f].indexOf("=");
            if (d < 1) {
                continue
            }
            var c = a(g[f].substring(0, d)).replace(/\]/g, "").split("[");
            var j = a(g[f].substring(d + 1));
            var e = b;
            while (c.length > 0) {
                var i = c.shift();
                if (c.length === 0) {
                    if (i.length === 0) {
                        e.push(j)
                    } else {
                        e[i] = j
                    }
                } else {
                    if (typeof e[i] === "undefined") {
                        e[i] = c[0].length === 0 ? [] : {}
                    }
                }
                e = e[i]
            }
        }
        return b
    }
});
DM.provide("", {
    api: function () {
        DM.ApiServer.call.apply(DM.ApiServer, arguments)
    }
});
DM.provide("ApiServer", {
    type: null,
    METHODS: ["get", "post", "delete"],
    _callbacks: {},
    _calls: [],
    call: function () {
        var c = Array.prototype.slice.call(arguments), f = c.shift(), e = c.shift(), h, g, a, b = false;
        while (typeof e !== "undefined") {
            var d = typeof e;
            if (d === "string" && !h) {
                h = e.toLowerCase()
            } else {
                if (d === "function" && !a) {
                    a = e
                } else {
                    if (d === "object" && !g) {
                        g = DM.ApiServer.formatCallParams(e)
                    } else {
                        if (d === "boolean" && !b) {
                            b = e
                        } else {
                            DM.log("Invalid argument passed to DM.api(): " + e);
                            return
                        }
                    }
                }
            }
            e = c.shift()
        }
        h = h || "get";
        g = g || {};
        if (f[0] === "/") {
            f = f.substr(1)
        }
        if (DM.Array.indexOf(DM.ApiServer.METHODS, h) < 0) {
            DM.log("Invalid method passed to DM.api(): " + h);
            return
        }
        DM.ApiServer.transport(f, h, g, a, b)
    },
    formatCallParams: function (h) {
        var e = h.subrequests
            , f = []
            , g = "";
        if (e) {
            var d = DM.type(e);
            if (d == "object") {
                for (fieldName in e) {
                    var b = e[fieldName]
                        , a = [];
                    a.push(fieldName + ".fields(" + (b.fields || []).join(",") + ")");
                    delete (b.fields);
                    for (subRequestParam in b) {
                        a.push(subRequestParam + "(" + b[subRequestParam] + ")")
                    }
                    if (a.length) {
                        f.push(a.join("."))
                    }
                }
            } else {
                throw new Error('Unexpected type "' + d + '" for "subrequests" parameter. Expected type: object')
            }
            delete (h.subrequests)
        }
        if (f.length) {
            g = f.join(",")
        }
        if (h.fields) {
            var c = DM.type(h.fields);
            if (c == "array") {
                h.fields.push(g);
                h.fields = h.fields.join(",")
            } else {
                if (c == "string") {
                    if (h.fields.length) {
                        h.fields += "," + g
                    } else {
                        h.fields = g
                    }
                } else {
                    throw new Error('Unexpected type "' + c + '"  for "fields" parameter, Allowed types: array, string')
                }
            }
        } else {
            if (g) {
                h.fields = g
            }
        }
        return h
    },
    getSimpleCallURL: function (a, b) {
        var d = DM.QS.encode(b)
            , c = d.length ? (a.indexOf("?") > -1 ? "&" : "?") + d : "";
        return DM._domain.api + "/" + a + c
    },
    transport: function (d, g, f, a, b) {
        try {
            DM.ApiServer.xhr();
            DM.ApiServer.transport = DM.ApiServer.ajax;
            DM.ApiServer.type = "ajax"
        } catch (c) {
            DM.ApiServer.transport = DM.ApiServer.jsonp;
            DM.ApiServer.type = "jsonp"
        }
        DM.ApiServer.transport(d, g, f, a, b)
    },
    jsonp: function (l, a, d, c) {
        var e = DM.guid(), j = document.createElement("script"), h, i = 5;
        d.method = a;
        d.callback = "DM.ApiServer._callbacks." + e;
        var f = DM.getSession();
        if (f && f.access_token && !d.access_token) {
            d.access_token = f.access_token
        }
        d = DM.Array.flatten(d);
        var b = DM.ApiServer.getSimpleCallURL(l, d);
        if (b.length > 2000) {
            throw new Error("JSONP only support a maximum of 2000 bytes of input.")
        }
        DM.ApiServer._callbacks[e] = function (g) {
            if (c) {
                c(g)
            }
            delete DM.ApiServer._callbacks[e];
            j.src = null;
            j.parentNode.removeChild(j);
            if (h) {
                clearTimeout(h);
                h = null
            }
        }
            ;
        j.async = true;
        j.src = b;
        document.getElementsByTagName("head")[0].appendChild(j);
        h = setTimeout(function () {
            DM.ApiServer._callbacks[e]({
                error: {
                    code: 500,
                    message: "The request has timed out",
                    type: "transport_error"
                }
            })
        }, i * 1000)
    },
    ajax: function (d, f, e, a, b) {
        var c = {
            path: d,
            method: f,
            params: e,
            cb: a
        };
        if (!b) {
            DM.ApiServer._calls.push(c);
            DM.ApiServer.ajaxHandleQueue()
        } else {
            DM.ApiServer.performSimpleCall(d, f, e, a)
        }
    },
    ajaxHandleQueue: function () {
        if (!DM.ApiServer._callTimeout && DM.ApiServer._calls.length > 0) {
            DM.ApiServer._callTimeout = setTimeout(function () {
                DM.ApiServer.performMultipleCalls(DM.ApiServer._calls);
                DM.ApiServer._calls = [];
                delete DM.ApiServer._callTimeout
            }, 0)
        } else {
            if (DM.ApiServer._calls.length == 10) {
                if (DM.ApiServer._callTimeout) {
                    clearTimeout(DM.ApiServer._callTimeout);
                    delete DM.ApiServer._callTimeout
                }
                DM.ApiServer.performMultipleCalls(DM.ApiServer._calls);
                DM.ApiServer._calls = []
            }
        }
    },
    performSimpleCall: function (d, g, f, a) {
        if (DM._session && DM.Auth.isSessionExpired()) {
            DM.Auth.refreshToken(DM._session, function (h) {
                if (h.error) {
                    if (a) {
                        a(h)
                    }
                    return
                }
                DM.ApiServer.performSimpleCall(d, g, f, a)
            });
            return
        }
        var c = DM.getSession();
        if (c && c.access_token && !f.access_token) {
            f.access_token = c.access_token
        }
        f = DM.Array.flatten(f);
        var b = DM.ApiServer.getSimpleCallURL(d, f);
        var e = DM.ApiServer.xhr();
        e.open(g, b);
        e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        e.send();
        e.onreadystatechange = function () {
            if (e.readyState == 4) {
                var h = {
                    error: {
                        code: 500,
                        message: "Invalid server response",
                        type: "transport_error"
                    }
                }, i;
                if (e.status) {
                    try {
                        i = DM.JSON.parse(e.responseText)
                    } catch (j) { }
                }
                if (DM.type(i) != "object") {
                    i = h;
                    DM.error("Cannot parse call response data " + e.responseText)
                }
                if (a) {
                    a(i)
                }
            }
        }
    },
    performMultipleCalls: function (d) {
        var c = []
            , h = DM._domain.api;
        for (var b = 0, a = d.length; b < a; b++) {
            var e = d[b];
            c.push({
                call: e.method.toUpperCase() + " /" + e.path,
                args: e.params,
                id: b
            })
        }
        if (DM._session && DM.Auth.isSessionExpired()) {
            DM.Auth.refreshToken(DM._session, function (i) {
                if (i.error) {
                    DM.Array.forEach(d, function (j) {
                        if (j && j.cb) {
                            j.cb(i)
                        }
                    });
                    return
                }
                DM.ApiServer.performMultipleCalls(d)
            });
            return
        }
        var f = DM.getSession();
        if (f && f.access_token) {
            h += "?access_token=" + encodeURIComponent(f.access_token)
        }
        var g = DM.ApiServer.xhr();
        g.open("POST", h);
        g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        g.send(DM.JSON.stringify(c));
        g.onreadystatechange = function () {
            if (g.readyState == 4) {
                var j = {
                    error: {
                        code: 500,
                        message: "Invalid server response",
                        type: "transport_error"
                    }
                }, q;
                if (g.status) {
                    try {
                        q = DM.JSON.parse(g.responseText)
                    } catch (r) { }
                }
                var o = DM.type(q);
                if (o == "array") {
                    for (var p = 0, m = q.length; p < m; p++) {
                        var n = q[p];
                        e = "id" in n && d[n.id] ? d[n.id] : null;
                        if (!e) {
                            DM.error("Response with no valid call id: " + DM.JSON.stringify(n));
                            continue
                        }
                        if (e.cb) {
                            if ("result" in n) {
                                e.cb(n.result)
                            } else {
                                if ("error" in n) {
                                    e.cb({
                                        error: n.error
                                    })
                                } else {
                                    e.cb({
                                        error: {
                                            code: 500,
                                            message: "Missing result or error key",
                                            type: "transport_error"
                                        }
                                    })
                                }
                            }
                        }
                        d[n.id] = null
                    }
                } else {
                    if (o == "object" && "error" in q) {
                        j = q
                    } else {
                        DM.error("Cannot parse multicall response data " + g.responseText)
                    }
                }
                DM.Array.forEach(d, function (i) {
                    if (i && i.cb) {
                        i.cb(j)
                    }
                })
            }
        }
    },
    xhr: function () {
        var a = new window.XMLHttpRequest();
        if (!("withCredentials" in a)) {
            throw new Error("Browser is not CORS capable")
        }
        return a
    }
});
DM.provide("", {
    getLoginStatus: function (a) {
        if (a) {
            DM.Auth.refreshToken(DM._session, function (b) {
                a({
                    status: DM._userStatus,
                    session: b
                })
            })
        }
    },
    getSession: function () {
        if (DM.Auth.isSessionExpired()) {
            DM.Auth.setSession(null, "notConnected")
        }
        return DM._session
    },
    login: function (g, a) {
        var f = typeof window.screenX != "undefined" ? window.screenX : window.screenLeft
            , d = typeof window.screenY != "undefined" ? window.screenY : window.screenTop
            , m = typeof window.outerWidth != "undefined" ? window.outerWidth : document.documentElement.clientWidth
            , j = typeof window.outerHeight != "undefined" ? window.outerHeight : (document.documentElement.clientHeight - 22)
            , b = 500
            , l = 520
            , e = parseInt(f + ((m - b) / 2), 10)
            , i = parseInt(d + ((j - l) / 2.5), 10)
            , c = "width=" + b + ",height=" + l + ",left=" + e + ",top=" + i + ",status,scrollbars=yes";
        a = DM.copy(a || {}, {
            client_id: DM._apiKey,
            response_type: "token",
            display: "popup",
            scope: "",
            redirect_uri: document.location.href,
            state: "dmauth_" + DM.guid()
        });
        if (a.display === "popup") {
            var h = window.open(DM._oauth.authorizeUrl + "?" + DM.QS.encode(a), "dmauth", c);
            DM.Auth._active[a.state] = {
                cb: g ? g : function () { }
                ,
                win: h
            };
            DM.Auth._popupMonitor()
        } else {
            location.href = DM._oauth.authorizeUrl + "?" + DM.QS.encode(a)
        }
    },
    logout: function (a) {
        var g = DM._oauth.logoutUrl;
        var d = DM.getSession();
        var b = [];
        var f = "dm_l_o_sc";
        var c;
        if (d && d.access_token) {
            b.push("access_token=" + encodeURIComponent(d.access_token));
            c = "_" + d.access_token + "_logout";
            window[c] = function (h) {
                if (DM.type(h) == "array" && !h.length) {
                    a({});
                    DM.Auth.setSession(null, "notConnected")
                } else {
                    a(h)
                }
                window[c] = null
            }
                ;
            b.push("callback=" + c)
        }
        var e = document.getElementById(f);
        if (e) {
            e.parentNode.removeChild(e)
        }
        e = document.createElement("script");
        e.type = "text/javascript";
        e.id = f;
        document.body.appendChild(e);
        e.src = g + (b.length ? ("?" + b.join("&")) : "")
    }
});
DM.provide("Auth", {
    _active: {},
    _receivedSession: null,
    loadSiteSession: function () {
        var c = true;
        var f = {};
        var b = {
            session: null,
            loading_method: null
        };
        if (window.location.host.match(/dailymotion\.com$/)) {
            var g = DM.Cookie.getCookieValue("sid");
            var e = DM.Cookie.getCookieValue("access_token");
            var a = DM.Cookie.getCookieValue("refresh_token");
            if (a) {
                f.refresh_token = a;
                c = false
            }
            var d = "neon_cookie";
            if (e) {
                f.access_token = e;
                c = false
            }
            if (!a && !e && g) {
                f.access_token = g;
                d = "sid_cookie";
                c = false
            }
            if (a && !f.access_token) {
                f.expires = Math.round(new Date().getTime() / 1000) - 10
            }
        }
        if (!c) {
            b.session = f;
            b.loading_method = d
        }
        return b
    },
    refreshToken: function (c, a) {
        a = a || function () { }
            ;
        DM._refreshCallbacks.push(a);
        if (DM._refreshRequested) {
            return
        }
        DM._refreshRequested = true;
        var b = function (h) {
            while (DM._refreshCallbacks.length > 0) {
                var g = DM._refreshCallbacks.pop();
                g(h)
            }
            DM._refreshRequested = false
        };
        if (!DM.Auth.isSessionExpired(c)) {
            b(c);
            return
        }
        if (DM._apiKey && DM._apiSecret && c && c.refresh_token) {
            var e = DM.ApiServer.xhr();
            var d = {
                grant_type: "refresh_token",
                client_id: DM._apiKey,
                client_secret: DM._apiSecret,
                refresh_token: c.refresh_token
            };
            var f = DM.QS.encode(d);
            e.open("POST", DM._oauth.tokenUrl);
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            e.send(f);
            e.onreadystatechange = function () {
                if (e.readyState == 4) {
                    var g = {
                        error: {
                            code: 500,
                            message: "Invalid server response",
                            type: "transport_error"
                        }
                    }, h;
                    if (e.status) {
                        try {
                            h = DM.JSON.parse(e.responseText)
                        } catch (j) { }
                    }
                    if (DM.type(h) != "object") {
                        h = g;
                        DM.error("Cannot parse call response data " + e.responseText)
                    }
                    if (e.status && e.status !== 200) {
                        h = g
                    }
                    var i = h.access_token ? h : null;
                    DM.Auth.setSession(i, i ? "connected" : "notConnected");
                    b(h)
                }
            }
        } else {
            b(c)
        }
    },
    readFragment: function () {
        var b = window.location.hash.replace("%23", "#")
            , a = b.substr(b.lastIndexOf("#") + 1);
        if (a.indexOf("access_token=") >= 0 || a.indexOf("error=") >= 0) {
            var c = DM.QS.decode(a);
            if (window.opener && window.opener.DM.Auth.setSession && window.name == "dmauth" && window.opener.name != "dmauth") {
                document.documentElement.style.display = "none";
                window.opener.DM.Auth.recvSession(c)
            } else {
                if (c && ("state" in c) && c.state.indexOf("dmauth_") == 0) {
                    if ("access_token" in c) {
                        DM.Auth._receivedSession = c
                    }
                    window.location.hash = b.substr(0, b.lastIndexOf("#"))
                }
            }
        }
    },
    recvSession: function (b) {
        if (!b) {
            DM.error("Received invalid session")
        }
        if ("error" in b) {
            DM.error("Received auth error `" + b.error + "': " + b.error_description)
        }
        if (!("state" in b)) {
            DM.error("Received a session with not `state' field");
            return
        }
        if (!(b.state in DM.Auth._active)) {
            DM.error("Received a session from an inactive window");
            return
        }
        var a;
        if (b) {
            a = {};
            for (k in b) {
                a[k] = b[k]
            }
        } else {
            a = b
        }
        DM.Auth._active[b.state].session = a
    },
    setSession: function (e, b) {
        var g = !DM._session && e
            , i = DM._session && !e
            , f = false
            , c = g || i || (DM._session && e && DM._session.access_token != e.access_token)
            , d = b != DM._userStatus;
        if (e && "expires_in" in e) {
            e.expires = Math.round(new Date().getTime() / 1000) + parseInt(e.expires_in, 10);
            var h = parseInt(e.expires_in, 10);
            delete e.expires_in
        }
        var a = {
            session: e,
            status: b
        };
        DM._session = e;
        DM._userStatus = b;
        if (c && DM.Cookie && DM.Cookie.getEnabled()) {
            DM.Cookie.set(e)
        }
        if (DM._sessionLoadingMethod === "neon_cookie") {
            DM.Cookie.setNeonCookies(e.access_token, e.refresh_token, h)
        }
        if (d) {
            DM.Event.fire("auth.statusChange", a)
        }
        if (i || f) {
            DM.Event.fire("auth.logout", a)
        }
        if (g || f) {
            DM.Event.fire("auth.login", a)
        }
        if (c) {
            DM.Event.fire("auth.sessionChange", a)
        }
        return a
    },
    isSessionExpired: function (a, b) {
        if (typeof (a) === "undefined") {
            a = DM._session
        }
        if (typeof (b) === "undefined") {
            b = DM._sessionLoadingMethod
        }
        if (!a) {
            return true
        }
        if (b === "neon_cookie") {
            return !DM.Cookie.getCookieValue("access_token")
        }
        return a && "expires" in a && new Date().getTime() > a.expires * 1000
    },
    _popupMonitor: function () {
        for (var f in DM.Auth._active) {
            if ("win" in DM.Auth._active[f]) {
                try {
                    if (DM.Auth._active[f].win.closed) {
                        delete DM.Auth._active[f].win;
                        DM.Auth.recvSession({
                            error: "access_denied",
                            error_description: "Client closed the window",
                            state: f
                        })
                    }
                } catch (d) { }
            }
            if ("session" in DM.Auth._active[f]) {
                var a = DM.Auth._active[f];
                delete DM.Auth._active[f];
                var c = a.session;
                if ("access_token" in c) {
                    DM.Auth.setSession(c, "connected")
                } else {
                    DM.Auth.setSession(null, "notConnected")
                }
                if ("win" in a) {
                    a.win.close()
                }
                if ("cb" in a) {
                    a.cb({
                        status: DM._userStatus,
                        session: DM._session
                    })
                }
            }
        }
        var b = false;
        for (var f in DM.Auth._active) {
            b = true;
            break
        }
        if (b && !DM.Auth._popupInterval) {
            DM.Auth._popupInterval = window.setInterval(DM.Auth._popupMonitor, 100)
        } else {
            if (!b && DM.Auth._popupInterval) {
                window.clearInterval(DM.Auth._popupInterval);
                DM.Auth._popupInterval = null
            }
        }
    }
});
DM.provide("", {
    player: function (b, a) {
        console.warn("This integration method is deprecated. We advise using Player Embeds https://faq.dailymotion.com/hc/en-us/articles/4411096679954-Integrate-your-Player-Embed");
        b = DM.$(b);
        if (!b || b.nodeType !== Node.ELEMENT_NODE) {
            throw new Error("Invalid first argument sent to DM.player(), requires a HTML element or element id: " + b)
        }
        if (!a || typeof a !== "object") {
            throw new Error("Missing 'options' parameter for DM.player()")
        }
        return {
            addEventListener: function () { },
            create: function () { },
            destroy: function () { },
            api: function () { },
            play: function () { },
            togglePlay: function () { },
            pause: function () { },
            seek: function () { },
            load: function () { },
            setMuted: function () { },
            toggleMuted: function () { },
            setVolume: function () { },
            setQuality: function () { },
            setSubtitle: function () { },
            setFullscreen: function () { },
            setControls: function () { },
            toggleControls: function () { },
            setProp: function () { },
            setAdsConfig: function () { },
            setCustConfig: function () { },
            watchOnSite: function () { },
            setLoop: function () { }
        };
        if (DM.Player._INSTANCES[b.id] !== undefined) {
            b = DM.Player.destroy(b.id)
        }
        return DM.Player.create(b, a)
    },
    destroy: function (b) {
        if (!b) {
            if (DM.Array.keys(DM.Player._INSTANCES).length === 0) {
                DM.warn("DM.destroy(): no player to destroy");
                return
            }
            for (var a in DM.Player._INSTANCES) {
                DM.Player.destroy(a)
            }
        } else {
            if (DM.Player._INSTANCES[b] === undefined) {
                DM.warn("Invalid first argument sent to DM.destroy(), requires a player id: " + b);
                return
            }
            DM.Player.destroy(b)
        }
    }
});
DM.provide("Player", {
    _IFRAME_ORIGIN: null,
    _INSTANCES: {},
    _EVENTS: {},
    _ANCHORS: {},
    _INTERVAL_ID: null,
    API_MODE: null,
    EVENT_HANDLERS: {},
    _environmentInfo: null,
    apiReady: false,
    autoplay: false,
    currentTime: 0,
    bufferedTime: 0,
    duration: NaN,
    seeking: false,
    error: null,
    ended: false,
    muted: false,
    volume: 1,
    paused: true,
    fullscreen: false,
    controls: undefined,
    rebuffering: false,
    qualities: [],
    quality: undefined,
    subtitles: [],
    subtitle: undefined,
    video: null,
    companionAds: null,
    loop: false,
    adData: {},
    play: function () {
        this.api("play")
    },
    togglePlay: function () {
        this.api("toggle-play")
    },
    pause: function () {
        this.api("pause")
    },
    seek: function (a) {
        this.api("seek", a)
    },
    load: function (b, a) {
        this.api("load", b, a)
    },
    setMuted: function (a) {
        this.api("muted", a)
    },
    toggleMuted: function () {
        this.api("toggle-muted")
    },
    setVolume: function (a) {
        this.api("volume", a)
    },
    setQuality: function (a) {
        this.api("quality", a)
    },
    setSubtitle: function (a) {
        this.api("subtitle", a)
    },
    setFullscreen: function (a) {
        this.api("fullscreen", a)
    },
    setControls: function (a) {
        this.api("controls", a)
    },
    toggleControls: function () {
        this.api("toggle-controls")
    },
    setProp: function () {
        this.api.apply(this, ["set-prop"].concat([].slice.call(arguments)))
    },
    setAdsConfig: function (a) {
        this.api("set-ads-config", a)
    },
    setCustConfig: function (a) {
        this.api("set-ads-config", a)
    },
    watchOnSite: function (a) {
        this.api("watch-on-site")
    },
    setLoop: function (a) {
        this.api("loop", a)
    },
    api: function (b) {
        var a = (2 <= arguments.length) ? [].slice.call(arguments, 1) : [];
        this._send(b, a)
    },
    create: function (d, b) {
        b = DM.copy(b, {
            width: 480,
            height: 270,
            title: "video player",
            referrerPolicy: null,
            params: {},
            events: {}
        });
        if (location.search.length > 1 && location.search.indexOf("dm:params") !== -1) {
            var e = DM.QS.decode(location.search.substr(1));
            if ("dm:params" in e) {
                b.params = DM.copy(DM.QS.decode(e["dm:params"]), b.params)
            }
        }
        DM._domain.www = DM._domain.www.replace(/^https?\:/, "");
        var c = document.createElement("iframe");
        DM.Array.forEach(["id", "style", "class"], function (f) {
            var g = d.getAttribute(f);
            if (g) {
                c.setAttribute(f, g)
            }
        });
        c.setAttribute("frameborder", "0");
        c.setAttribute("allowfullscreen", "true");
        c.setAttribute("allow", "autoplay");
        if (typeof b.referrerPolicy === "string") {
            c.referrerPolicy = b.referrerPolicy
        }
        c.title = "Dailymotion " + b.title;
        c.type = "text/html";
        c.width = b.width;
        c.height = b.height;
        d.parentNode.replaceChild(c, d);
        DM.copy(c, DM.Player);
        c.init(b.video, b.params, b.playlist, b.events, d);
        if (typeof b.events == "object") {
            for (var a in b.events) {
                c.addEventListener(a, b.events[a], false)
            }
        }
        return c
    },
    destroy: function (c) {
        var b = DM.Player._INSTANCES[c];
        var a = DM.Player._ANCHORS[c];
        DM.Array.forEach(DM.Player._EVENTS[c], function (e) {
            var d = DM.Array.keys(e)[0];
            b.removeEventListener(d, e[d], false)
        });
        b.parentNode.replaceChild(a, b);
        delete DM.Player._INSTANCES[c];
        delete DM.Player._ANCHORS[c];
        delete DM.Player._EVENTS[c];
        return a
    },
    _getPathname: function (a, b) {
        if (b && !a) {
            return "/embed/playlist/" + b
        }
        if (a) {
            return "/embed/video/" + a
        }
        return "/embed"
    },
    init: function (d, f, e, c, b) {
        var a = this;
        DM.Player._installHandlers();
        f = typeof f == "object" ? f : {};
        f.api = DM.Player.API_MODE;
        if (location.origin) {
            f.origin = location.origin
        } else {
            f.origin = "*"
        }
        if (DM._apiKey) {
            f.apiKey = DM._apiKey
        }
        if (d && e) {
            f.playlist = e
        }
        f.pubtool = f.pubtool || "jssdk";
        if (f.pubtool === "jssdk") {
            console.warn("DEPRECATED: Legacy JS SDK integration method is deprecated. Please consider using Player Embeds https://faq.dailymotion.com/hc/en-us/articles/4411096679954-Integrate-your-Player-Embed")
        }
        this.id = f.id = this.id ? this.id : DM.guid();
        this.src = "https:" + DM._domain.www + this._getPathname(d, e) + "?" + DM.QS.encode(f);
        if (DM.Player._INSTANCES[this.id] != this) {
            DM.Player._INSTANCES[this.id] = this;
            DM.Player._EVENTS[this.id] = c;
            DM.Player._ANCHORS[this.id] = b;
            this.addEventListener("unload", function () {
                delete DM.Player._INSTANCES[this.id];
                delete DM.Player._ANCHORS[this.id];
                delete DM.Player._EVENTS[this.id]
            })
        }
        this.autoplay = DM.parseBool(f.autoplay)
    },
    _installHandlers: function () {
        if (DM.Player.API_MODE !== null) {
            return
        }
        if (window.postMessage) {
            DM.Player.API_MODE = "postMessage";
            var a = function (f) {
                var d = f.origin ? f.origin.replace(/^https?:/, "") : null;
                if (!d || d.indexOf(DM._domain.www) !== 0) {
                    return
                }
                if (!f.data || typeof f.data !== "string") {
                    return
                }
                if (!DM.Player._IFRAME_ORIGIN) {
                    DM.Player._IFRAME_ORIGIN = f.origin
                }
                var c = DM.Player._decodePostMessage(f.data);
                if (!c.id || !c.event) {
                    return
                }
                var b = DM.$(c.id);
                if (!b || typeof b._recvEvent !== "function") {
                    return
                }
                b._recvEvent(c)
            };
            if (window.addEventListener) {
                window.addEventListener("message", a, false)
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onmessage", a)
                }
            }
        }
    },
    _decodePostMessage: function (b) {
        if (b.substring(0, 1) === "{") {
            try {
                var a = JSON.parse(b);
                return a
            } catch (c) {
                return {}
            }
        }
        return DM.QS.decode(b)
    },
    _send: function (b, a) {
        if (!this.apiReady) {
            DM.warn('Player not ready. Ignoring command : "' + b + '"');
            return
        }
        if (DM.Player.API_MODE == "postMessage") {
            if (!this.contentWindow || typeof this.contentWindow.postMessage !== "function") {
                DM.warn("Player not reachable anymore. You may have destroyed it.");
                return
            }
            this.contentWindow.postMessage(JSON.stringify({
                command: b,
                parameters: a || []
            }), DM.Player._IFRAME_ORIGIN)
        }
    },
    _dispatch: document.createEvent ? function (b) {
        const a = b.event;
        const c = document.createEvent("HTMLEvents");
        if (b.event === "ad_log" && b.args) {
            c.data = b.args
        }
        c.initEvent(a, true, true);
        this.dispatchEvent(c)
    }
        : function (b) {
            const a = b.event;
            if ("on" + a in this) {
                c = document.createEventObject();
                this.fireEvent("on" + a, c)
            } else {
                if (a in this.EVENT_HANDLERS) {
                    var c = {
                        type: a,
                        target: this
                    };
                    DM.Array.forEach(this.EVENT_HANDLERS[a], function (d) {
                        d(c)
                    })
                }
            }
        }
    ,
    _recvEvent: function (a) {
        switch (a.event) {
            case "apiready":
                if (this.apiReady) {
                    return
                } else {
                    this.apiReady = true
                }
                this._environmentInfo = a.info || null;
                break;
            case "start":
                this.ended = false;
                break;
            case "loadedmetadata":
                this.error = null;
                break;
            case "timeupdate":
            case "ad_timeupdate":
                this.currentTime = parseFloat(a.time);
                break;
            case "progress":
                this.bufferedTime = parseFloat(a.time);
                break;
            case "durationchange":
                this.duration = parseFloat(a.duration);
                break;
            case "seeking":
                this.seeking = true;
                this.currentTime = parseFloat(a.time);
                break;
            case "seeked":
                this.seeking = false;
                this.currentTime = parseFloat(a.time);
                break;
            case "fullscreenchange":
                this.fullscreen = DM.parseBool(a.fullscreen);
                break;
            case "controlschange":
                this.controls = DM.parseBool(a.controls);
                break;
            case "volumechange":
                this.volume = parseFloat(a.volume);
                this.muted = DM.parseBool(a.muted);
                break;
            case "ad_start":
                this.adData = a.adData;
            case "video_start":
            case "ad_play":
            case "playing":
            case "play":
                this.paused = false;
                break;
            case "end":
                this.ended = true;
                break;
            case "ad_end":
                this.adData = {};
            case "ad_pause":
            case "video_end":
            case "pause":
                this.paused = true;
                break;
            case "error":
                this.error = {
                    code: a.code,
                    title: a.title,
                    message: a.message
                };
                break;
            case "rebuffer":
                this.rebuffering = DM.parseBool(a.rebuffering);
                break;
            case "qualitiesavailable":
                this.qualities = a.qualities;
                break;
            case "qualitychange":
                this.quality = a.quality;
                break;
            case "subtitlesavailable":
                this.subtitles = a.subtitles;
                break;
            case "subtitlechange":
                this.subtitle = a.subtitle;
                break;
            case "videochange":
                this.video = {
                    videoId: a.videoId,
                    title: a.title,
                    duration: parseFloat(a.duration)
                };
                break;
            case "ad_companions":
                this.companionAds = a.companionAds;
                break
        }
        this._dispatch(a)
    },
    addEventListener: function (b, c, a) {
        if ("on" + b in this && this.attachEvent) {
            this.attachEvent("on" + b, c, a)
        } else {
            if (!(b in this.EVENT_HANDLERS)) {
                this.EVENT_HANDLERS[b] = []
            }
            this.EVENT_HANDLERS[b].push(c)
        }
    }
});
