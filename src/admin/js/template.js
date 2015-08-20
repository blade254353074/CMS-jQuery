/*TMODJS:{"version":"1.0.0"}*/
!function() {
    function template(filename, content) {
        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
    }
    function toString(value, type) {
        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
        value;
    }
    function escapeFn(s) {
        return escapeMap[s];
    }
    function escapeHTML(content) {
        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    }
    function each(data, callback) {
        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
    }
    function resolve(from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
        return filename;
    }
    function renderFile(filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: "Render Error",
            message: "Template not found"
        });
        return data ? fn(data) : fn;
    }
    function compile(filename, fn) {
        if ("string" == typeof fn) {
            var string = fn;
            fn = function() {
                return new String(string);
            };
        }
        var render = cache[filename] = function(data) {
            try {
                return new fn(data, filename) + "";
            } catch (e) {
                return showDebugInfo(e)();
            }
        };
        return render.prototype = fn.prototype = utils, render.toString = function() {
            return fn + "";
        }, render;
    }
    function showDebugInfo(e) {
        var type = "{Template Error}", message = e.stack || "";
        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
        return function() {
            return "object" == typeof console && console.error(type + "\n\n" + message), type;
        };
    }
    var cache = template.cache = {}, String = this.String, escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    }, isArray = Array.isArray || function(obj) {
        return "[object Array]" === {}.toString.call(obj);
    }, utils = template.utils = {
        $helpers: {},
        $include: function(filename, data, from) {
            return filename = resolve(from, filename), renderFile(filename, data);
        },
        $string: toString,
        $escape: escapeHTML,
        $each: each
    }, helpers = template.helpers = utils.$helpers;
    template.get = function(filename) {
        return cache[filename.replace(/^\.\//, "")];
    }, template.helper = function(name, helper) {
        helpers[name] = helper;
    }, "function" == typeof define ? define(function() {
        return template;
    }) : "undefined" != typeof exports ? module.exports = template : this.template = template, 
    /*v:1*/
    template("header", function($data) {
        "use strict";
        var $utils = this, $escape = ($utils.$helpers, $utils.$escape), avatar = $data.avatar, username = $data.username, $out = "";
        return $out += '<div class="header"> <div class="header-logo"> <h2><span>[ </span>QED<span> ]</span></h2> </div> <div class="header-nav"> <div class="nav-left"></div> <div class="nav-right"> <div class="user-menu"> <a href="#/user/home" class="bar"> <img src="', 
        $out += $escape(avatar), $out += '" class="avatar"> <div class="name"> <span>', 
        $out += $escape(username), $out += '</span> <span class="caret"></span> </div> </a> <ul class="list"> <li> <a href="#/user/profile" class="text-icon"> <span class="icon icon-user"></span> <span>我的资料</span> </a> </li> <li> <a href="#/user/task/unread" class="text-icon"> <span class="icon icon-tasks"></span><span>我的任务</span> </a> </li> <li> <a href="#/logout" class="text-icon"> <span class="icon icon-off"></span><span>退出</span> </a> </li> </ul> </div> </div> </div> </div> ', 
        new String($out);
    }), /*v:1*/
    template("navigation", function($data) {
        "use strict";
        var $utils = this, $each = ($utils.$helpers, $utils.$each), menu = $data.menu, $escape = ($data.$value, 
        $data.$index, $utils.$escape), $out = ($data.item, "");
        return $out += '<ul class="nav"> ', $each(menu, function($value) {
            $out += ' <li class="nav-item"> <a> <span class="icon ', $out += $escape($value.icon), 
            $out += '"></span> <span>', $out += $escape($value.title), $out += '</span> <span class="symbol"></span> </a> ', 
            0 !== $value.list.length && ($out += ' <ul class="sub-nav"> ', $each($value.list, function(item) {
                $out += ' <li class=\'sub-list\'> <a class="sub-item" href="', $out += $escape(item.hash), 
                $out += '" data-root="', $out += $escape(item.root), $out += '"> <span>', $out += $escape(item.title), 
                $out += "</span> </a> </li> ";
            }), $out += " </ul> "), $out += " </li> ";
        }), $out += " </ul> ", new String($out);
    }), /*v:1*/
    template("page", '<div class="page container-fluid"> 23333 </div> '), /*v:1*/
    template("public/loading", '<div class="loading"> <div class="loading-circle"></div> </div> '), 
    /*v:1*/
    template("public/notfound", "notfound.html "), /*v:1*/
    template("page/article/add", "//product add "), /*v:1*/
    template("page/article/list", "//product list "), /*v:1*/
    template("page/member/add", "//product add "), /*v:1*/
    template("page/member/list", "//product list "), /*v:1*/
    template("page/option/setup", "//option setup "), /*v:1*/
    template("page/product/add", "//product add "), /*v:1*/
    template("page/product/list", "//product list ");
}();