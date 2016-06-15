/*!
 * WOW.js
 * --------------------------------------------------
 */

(function() {
    var t, e, n, i, o, r = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        s = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var n, i;
            for (n in e) i = e[n], null == t[n] && (t[n] = i);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.createEvent = function(t, e, n, i) {
            var o;
            return null == e && (e = !1), null == n && (n = !1), null == i && (i = null), null != document.createEvent ? (o = document.createEvent("CustomEvent"), o.initCustomEvent(t, e, n, i)) : null != document.createEventObject ? (o = document.createEventObject(), o.eventType = t) : o.eventName = t, o
        }, t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }, t.prototype.addEvent = function(t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }, t.prototype.removeEvent = function(t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
        function t() { this.keys = [], this.values = [] }
        return t.prototype.get = function(t) {
            var e, n, i, o, r;
            for (r = this.keys, e = i = 0, o = r.length; o > i; e = ++i)
                if (n = r[e], n === t) return this.values[e]
        }, t.prototype.set = function(t, e) {
            var n, i, o, r, s;
            for (s = this.keys, n = o = 0, r = s.length; r > o; n = ++o)
                if (i = s[n], i === t) return void(this.values[n] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() { "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.") }
        return t.notSupported = !0, t.prototype.observe = function() {}, t
    }()), i = this.getComputedStyle || function(t, e) {
        return this.getPropertyValue = function(e) {
            var n;
            return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function(t, e) {
                return e.toUpperCase()
            }), (null != (n = t.currentStyle) ? n[e] : void 0) || null
        }, this
    }, o = /(\-([a-z]){1})/g, this.WOW = function() {
        function o(t) { null == t && (t = {}), this.scrollCallback = r(this.scrollCallback, this), this.scrollHandler = r(this.scrollHandler, this), this.resetAnimation = r(this.resetAnimation, this), this.start = r(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new n, this.wowEvent = this.util().createEvent(this.config.boxClass) }
        return o.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null }, o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function() {
            var e, n, i, o;
            if (this.stopped = !1, this.boxes = function() {
                    var t, n, i, o;
                    for (i = this.element.querySelectorAll("." + this.config.boxClass), o = [], t = 0, n = i.length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.all = function() {
                    var t, n, i, o;
                    for (i = this.boxes, o = [], t = 0, n = i.length; n > t; t++) e = i[t], o.push(e);
                    return o
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (o = this.boxes, n = 0, i = o.length; i > n; n++) e = o[n], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var n, i, o, r, s;
                    for (s = [], n = 0, i = e.length; i > n; n++) r = e[n], s.push(function() {
                        var t, e, n, i;
                        for (n = r.addedNodes || [], i = [], t = 0, e = n.length; e > t; t++) o = n[t], i.push(this.doSync(o));
                        return i
                    }.call(t));
                    return s
                }
            }(this)).observe(document.body, { childList: !0, subtree: !0 }) : void 0
        }, o.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function(e) {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function(t) {
            var e, n, i, o, r;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, o = t.querySelectorAll("." + this.config.boxClass), r = [], n = 0, i = o.length; i > n; n++) e = o[n], s.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }, o.prototype.show = function(t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(t), this.util().emitEvent(t, this.wowEvent), this.util().addEvent(t, "animationend", this.resetAnimation), this.util().addEvent(t, "oanimationend", this.resetAnimation), this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation), t
        }, o.prototype.applyStyle = function(t, e) {
            var n, i, o;
            return i = t.getAttribute("data-wow-duration"), n = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function(r) {
                return function() {
                    return r.customStyle(t, e, i, n, o)
                }
            }(this))
        }, o.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }
        }(), o.prototype.resetStyle = function() {
            var t, e, n, i, o;
            for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.resetAnimation = function(t) {
            var e;
            return t.type.toLowerCase().indexOf("animationend") >= 0 ? (e = t.target || t.srcElement, e.className = e.className.replace(this.config.animateClass, "").trim()) : void 0
        }, o.prototype.customStyle = function(t, e, n, i, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", n && this.vendorSet(t.style, { animationDuration: n }), i && this.vendorSet(t.style, { animationDelay: i }), o && this.vendorSet(t.style, { animationIterationCount: o }), this.vendorSet(t.style, { animationName: e ? "none" : this.cachedAnimationName(t) }), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function(t, e) {
            var n, i, o, r;
            i = [];
            for (n in e) o = e[n], t["" + n] = o, i.push(function() {
                var e, i, s, l;
                for (s = this.vendors, l = [], e = 0, i = s.length; i > e; e++) r = s[e], l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                return l
            }.call(this));
            return i
        }, o.prototype.vendorCSS = function(t, e) {
            var n, o, r, s, l, a;
            for (l = i(t), s = l.getPropertyCSSValue(e), r = this.vendors, n = 0, o = r.length; o > n; n++) a = r[n], s = s || l.getPropertyCSSValue("-" + a + "-" + e);
            return s
        }, o.prototype.animationName = function(t) {
            var e;
            try { e = this.vendorCSS(t, "animation-name").cssText } catch (n) { e = i(t).getPropertyValue("animation-name") }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var e, n, i, o;
                for (i = this.boxes, o = [], e = 0, n = i.length; n > e; e++) t = i[e], t && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function(t) {
            var e, n, i, o, r;
            return n = t.getAttribute("data-wow-offset") || this.config.offset, r = window.pageYOffset, o = r + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, i = this.offsetTop(t), e = i + t.clientHeight, o >= i && e >= r
        }, o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}).call(this);

/*!
 * jquery.matchHeight.js master
 * http://brm.io/jquery-match-height/
 * License: MIT
 * --------------------------------------------------
 */

! function(t) {
    var e = -1,
        a = -1,
        o = function(t) {
            return parseFloat(t) || 0
        },
        i = function(e) {
            var a = 1,
                i = t(e),
                n = null,
                r = [];
            return i.each(function() {
                var e = t(this),
                    i = e.offset().top - o(e.css("margin-top")),
                    s = r.length > 0 ? r[r.length - 1] : null;
                null === s ? r.push(e) : Math.floor(Math.abs(n - i)) <= a ? r[r.length - 1] = s.add(e) : r.push(e), n = i
            }), r
        },
        n = function(e) {
            var a = { byRow: !0, property: "height", target: null, remove: !1 };
            return "object" == typeof e ? t.extend(a, e) : ("boolean" == typeof e ? a.byRow = e : "remove" === e && (a.remove = !0), a)
        },
        r = t.fn.matchHeight = function(e) {
            var a = n(e);
            if (a.remove) {
                var o = this;
                return this.css(a.property, ""), t.each(r._groups, function(t, e) { e.elements = e.elements.not(o) }), this
            }
            return this.length <= 1 && !a.target ? this : (r._groups.push({ elements: this, options: a }), r._apply(this, a), this)
        };
    r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._apply = function(e, a) {
        var s = n(a),
            h = t(e),
            c = [h],
            l = t(window).scrollTop(),
            p = t("html").outerHeight(!0),
            u = h.parents().filter(":hidden");
        return u.each(function() {
            var e = t(this);
            e.data("style-cache", e.attr("style"))
        }), u.css("display", "block"), s.byRow && !s.target && (h.each(function() {
            var e = t(this),
                a = "inline-block" === e.css("display") ? "inline-block" : "block";
            e.data("style-cache", e.attr("style")), e.css({ display: a, "padding-top": "0", "padding-bottom": "0", "margin-top": "0", "margin-bottom": "0", "border-top-width": "0", "border-bottom-width": "0", height: "100px" })
        }), c = i(h), h.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || "")
        })), t.each(c, function(e, a) {
            var i = t(a),
                n = 0;
            if (s.target) n = s.target.outerHeight(!1);
            else {
                if (s.byRow && i.length <= 1) return void i.css(s.property, "");
                i.each(function() {
                    var e = t(this),
                        a = "inline-block" === e.css("display") ? "inline-block" : "block",
                        o = { display: a };
                    o[s.property] = "", e.css(o), e.outerHeight(!1) > n && (n = e.outerHeight(!1)), e.css("display", "")
                })
            }
            i.each(function() {
                var e = t(this),
                    a = 0;
                s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (a += o(e.css("border-top-width")) + o(e.css("border-bottom-width")), a += o(e.css("padding-top")) + o(e.css("padding-bottom"))), e.css(s.property, n - a))
            })
        }), u.each(function() {
            var e = t(this);
            e.attr("style", e.data("style-cache") || null)
        }), r._maintainScroll && t(window).scrollTop(l / p * t("html").outerHeight(!0)), this
    }, r._applyDataApi = function() {
        var e = {};
        t("[data-match-height], [data-mh]").each(function() {
            var a = t(this),
                o = a.attr("data-mh") || a.attr("data-match-height");
            o in e ? e[o] = e[o].add(a) : e[o] = a
        }), t.each(e, function() { this.matchHeight(!0) })
    };
    var s = function(e) { r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() { r._apply(this.elements, this.options) }), r._afterUpdate && r._afterUpdate(e, r._groups) };
    r._update = function(o, i) {
        if (i && "resize" === i.type) {
            var n = t(window).width();
            if (n === e) return;
            e = n
        }
        o ? -1 === a && (a = setTimeout(function() { s(i), a = -1 }, r._throttle)) : s(i)
    }, t(r._applyDataApi), t(window).bind("load", function(t) { r._update(!1, t) }), t(window).bind("resize orientationchange", function(t) { r._update(!0, t) })
}(jQuery);

/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 J枚rn Zaefferer
 * Released under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

! function(t) {
    t.extend(t.fn, {
        validate: function(e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var r = t.data(this[0], "validator");
            return r ? r : (this.attr("novalidate", "novalidate"), r = new t.validator(e, this[0]), t.data(this[0], "validator", r), r.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) { r.settings.submitHandler && (r.submitButton = e.target), t(e.target).hasClass("cancel") && (r.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (r.cancelSubmit = !0) }), this.submit(function(e) {
                function a() {
                    var a;
                    return r.settings.submitHandler ? (r.submitButton && (a = t("<input type='hidden'/>").attr("name", r.submitButton.name).val(t(r.submitButton).val()).appendTo(r.currentForm)), r.settings.submitHandler.call(r, r.currentForm, e), r.submitButton && a.remove(), !1) : !0
                }
                return r.settings.debug && e.preventDefault(), r.cancelSubmit ? (r.cancelSubmit = !1, a()) : r.form() ? r.pendingRequest ? (r.formSubmitted = !0, !1) : a() : (r.focusInvalid(), !1)
            })), r)
        },
        valid: function() {
            if (t(this[0]).is("form")) return this.validate().form();
            var e = !0,
                r = t(this[0].form).validate();
            return this.each(function() { e = e && r.element(this) }), e
        },
        removeAttrs: function(e) {
            var r = {},
                a = this;
            return t.each(e.split(/\s/), function(t, e) { r[e] = a.attr(e), a.removeAttr(e) }), r
        },
        rules: function(e, r) {
            var a = this[0];
            if (e) {
                var i = t.data(a.form, "validator").settings,
                    n = i.rules,
                    s = t.validator.staticRules(a);
                switch (e) {
                    case "add":
                        t.extend(s, t.validator.normalizeRule(r)), delete s.messages, n[a.name] = s, r.messages && (i.messages[a.name] = t.extend(i.messages[a.name], r.messages));
                        break;
                    case "remove":
                        if (!r) return delete n[a.name], s;
                        var o = {};
                        return t.each(r.split(/\s/), function(t, e) { o[e] = s[e], delete s[e] }), o
                }
            }
            var u = t.validator.normalizeRules(t.extend({}, t.validator.classRules(a), t.validator.attributeRules(a), t.validator.dataRules(a), t.validator.staticRules(a)), a);
            if (u.required) {
                var l = u.required;
                delete u.required, u = t.extend({ required: l }, u)
            }
            return u
        }
    }), t.extend(t.expr[":"], {
        blank: function(e) {
            return !t.trim("" + t(e).val())
        },
        filled: function(e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function(e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function(e, r) { this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = r, this.init() }, t.validator.format = function(e, r) {
        return 1 === arguments.length ? function() {
            var r = t.makeArray(arguments);
            return r.unshift(e), t.validator.format.apply(this, r)
        } : (arguments.length > 2 && r.constructor !== Array && (r = t.makeArray(arguments).slice(1)), r.constructor !== Array && (r = [r]), t.each(r, function(t, r) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                return r
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(t, e) { this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide()) },
            onfocusout: function(t, e) { this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t) },
            onkeyup: function(t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(t, e) { t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode) },
            highlight: function(e, r, a) { "radio" === e.type ? this.findByName(e.name).addClass(r).removeClass(a) : t(e).addClass(r).removeClass(a) },
            unhighlight: function(e, r, a) { "radio" === e.type ? this.findByName(e.name).removeClass(r).addClass(a) : t(e).removeClass(r).addClass(a) }
        },
        setDefaults: function(e) { t.extend(t.validator.defaults, e) },
        messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", creditcard: "Please enter a valid credit card number.", equalTo: "Please enter the same value again.", maxlength: t.validator.format("Please enter no more than {0} characters."), minlength: t.validator.format("Please enter at least {0} characters."), rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."), range: t.validator.format("Please enter a value between {0} and {1}."), max: t.validator.format("Please enter a value less than or equal to {0}."), min: t.validator.format("Please enter a value greater than or equal to {0}.") },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function e(e) {
                    var r = t.data(this[0].form, "validator"),
                        a = "on" + e.type.replace(/^validate/, "");
                    r.settings[a] && r.settings[a].call(r, this[0], e)
                }
                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var r = this.groups = {};
                t.each(this.settings.groups, function(e, a) { "string" == typeof a && (a = a.split(/\s/)), t.each(a, function(t, a) { r[a] = e }) });
                var a = this.settings.rules;
                t.each(a, function(e, r) { a[e] = t.validator.normalizeRule(r) }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function(e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var r = this.check(e) !== !1;
                return r ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function(e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var r in e) this.errorList.push({ message: e[r], element: this.findByName(r)[0] });
                    this.successList = t.grep(this.successList, function(t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() { t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue") },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(t) {
                var e = 0;
                for (var r in t) e++;
                return e
            },
            hideErrors: function() { this.addWrapper(this.toHide).hide() },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try { t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (e) {}
            },
            findLastActive: function() {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function(t) {
                    return t.element.name === e.name
                }).length && e
            },
            elements: function() {
                var e = this,
                    r = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in r || !e.objectLength(t(this).rules()) ? !1 : (r[this.name] = !0, !0)
                })
            },
            clean: function(e) {
                return t(e)[0]
            },
            errors: function() {
                var e = this.settings.errorClass.replace(" ", ".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([]) },
            prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) },
            prepareElement: function(t) { this.reset(), this.toHide = this.errorsFor(t) },
            elementValue: function(e) {
                var r = t(e).attr("type"),
                    a = t(e).val();
                return "radio" === r || "checkbox" === r ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof a ? a.replace(/\r/g, "") : a
            },
            check: function(e) {
                e = this.validationTargetFor(this.clean(e));
                var r, a = t(e).rules(),
                    i = !1,
                    n = this.elementValue(e);
                for (var s in a) {
                    var o = { method: s, parameters: a[s] };
                    try {
                        if (r = t.validator.methods[s].call(this, n, e, o.parameters), "dependency-mismatch" === r) {
                            i = !0;
                            continue
                        }
                        if (i = !1, "pending" === r) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!r) return this.formatAndAdd(e, o), !1
                    } catch (u) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + o.method + "' method.", u), u
                    }
                }
                return i ? void 0 : (this.objectLength(a) && this.successList.push(e), !0)
            },
            customDataMessage: function(e, r) {
                return t(e).data("msg-" + r.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + r.toLowerCase())
            },
            customMessage: function(t, e) {
                var r = this.settings.messages[t];
                return r && (r.constructor === String ? r : r[e])
            },
            findDefined: function() {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function(e, r) {
                return this.findDefined(this.customMessage(e.name, r), this.customDataMessage(e, r), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[r], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function(e, r) {
                var a = this.defaultMessage(e, r.method),
                    i = /\$?\{(\d+)\}/g;
                "function" == typeof a ? a = a.call(this, r.parameters, e) : i.test(a) && (a = t.validator.format(a.replace(i, "{$1}"), r.parameters)), this.errorList.push({ message: a, element: e }), this.errorMap[e.name] = a, this.submitted[e.name] = a
            },
            addWrapper: function(t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function() {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var r = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, r.element, this.settings.errorClass, this.settings.validClass), this.showLabel(r.element, r.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return t(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, r) {
                var a = this.errorsFor(e);
                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(r)) : (a = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(r || ""), this.settings.wrapper && (a = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(a).length || (this.settings.errorPlacement ? this.settings.errorPlacement(a, t(e)) : a.insertAfter(e))), !r && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, e)), this.toShow = this.toShow.add(a)
            },
            errorsFor: function(e) {
                var r = this.idOrName(e);
                return this.errors().filter(function() {
                    return t(this).attr("for") === r
                })
            },
            idOrName: function(t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            },
            checkable: function(t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function(e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function(e, r) {
                switch (r.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", r).length;
                    case "input":
                        if (this.checkable(r)) return this.findByName(r.name).filter(":checked").length
                }
                return e.length
            },
            depend: function(t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function(t, e) {
                    return t
                },
                string: function(e, r) {
                    return !!t(e, r.form).length
                },
                "function": function(t, e) {
                    return t(e)
                }
            },
            optional: function(e) {
                var r = this.elementValue(e);
                return !t.validator.methods.required.call(this, r, e) && "dependency-mismatch"
            },
            startRequest: function(t) { this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0) },
            stopRequest: function(e, r) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], r && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !r && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) },
            previousValue: function(e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", { old: null, valid: !0, message: this.defaultMessage(e, "remote") })
            }
        },
        classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
        addClassRules: function(e, r) { e.constructor === String ? this.classRuleSettings[e] = r : t.extend(this.classRuleSettings, e) },
        classRules: function(e) {
            var r = {},
                a = t(e).attr("class");
            return a && t.each(a.split(" "), function() { this in t.validator.classRuleSettings && t.extend(r, t.validator.classRuleSettings[this]) }), r
        },
        attributeRules: function(e) {
            var r = {},
                a = t(e),
                i = a[0].getAttribute("type");
            for (var n in t.validator.methods) {
                var s;
                "required" === n ? (s = a.get(0).getAttribute(n), "" === s && (s = !0), s = !!s) : s = a.attr(n), /min|max/.test(n) && (null === i || /number|range|text/.test(i)) && (s = Number(s)), s ? r[n] = s : i === n && "range" !== i && (r[n] = !0)
            }
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function(e) {
            var r, a, i = {},
                n = t(e);
            for (r in t.validator.methods) a = n.data("rule-" + r.toLowerCase()), void 0 !== a && (i[r] = a);
            return i
        },
        staticRules: function(e) {
            var r = {},
                a = t.data(e.form, "validator");
            return a.settings.rules && (r = t.validator.normalizeRule(a.settings.rules[e.name]) || {}), r
        },
        normalizeRules: function(e, r) {
            return t.each(e, function(a, i) {
                if (i === !1) return void delete e[a];
                if (i.param || i.depends) {
                    var n = !0;
                    switch (typeof i.depends) {
                        case "string":
                            n = !!t(i.depends, r.form).length;
                            break;
                        case "function":
                            n = i.depends.call(r, r)
                    }
                    n ? e[a] = void 0 !== i.param ? i.param : !0 : delete e[a]
                }
            }), t.each(e, function(a, i) { e[a] = t.isFunction(i) ? i(r) : i }), t.each(["minlength", "maxlength"], function() { e[this] && (e[this] = Number(e[this])) }), t.each(["rangelength", "range"], function() {
                var r;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (r = e[this].split(/[\s,]+/), e[this] = [Number(r[0]), Number(r[1])]))
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function(e) {
            if ("string" == typeof e) {
                var r = {};
                t.each(e.split(/\s/), function() { r[this] = !0 }), e = r
            }
            return e
        },
        addMethod: function(e, r, a) { t.validator.methods[e] = r, t.validator.messages[e] = void 0 !== a ? a : t.validator.messages[e], r.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e)) },
        methods: {
            required: function(e, r, a) {
                if (!this.depend(a, r)) return "dependency-mismatch";
                if ("select" === r.nodeName.toLowerCase()) {
                    var i = t(r).val();
                    return i && i.length > 0
                }
                return this.checkable(r) ? this.getLength(e, r) > 0 : t.trim(e).length > 0
            },
            email: function(t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            },
            url: function(t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function(t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            },
            dateISO: function(t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            },
            number: function(t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function(t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function(t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var r = 0,
                    a = 0,
                    i = !1;
                t = t.replace(/\D/g, "");
                for (var n = t.length - 1; n >= 0; n--) {
                    var s = t.charAt(n);
                    a = parseInt(s, 10), i && (a *= 2) > 9 && (a -= 9), r += a, i = !i
                }
                return r % 10 === 0
            },
            minlength: function(e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || i >= a
            },
            maxlength: function(e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || a >= i
            },
            rangelength: function(e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || i >= a[0] && i <= a[1]
            },
            min: function(t, e, r) {
                return this.optional(e) || t >= r
            },
            max: function(t, e, r) {
                return this.optional(e) || r >= t
            },
            range: function(t, e, r) {
                return this.optional(e) || t >= r[0] && t <= r[1]
            },
            equalTo: function(e, r, a) {
                var i = t(a);
                return this.settings.onfocusout && i.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() { t(r).valid() }), e === i.val()
            },
            remote: function(e, r, a) {
                if (this.optional(r)) return "dependency-mismatch";
                var i = this.previousValue(r);
                if (this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), i.originalMessage = this.settings.messages[r.name].remote, this.settings.messages[r.name].remote = i.message, a = "string" == typeof a && { url: a } || a, i.old === e) return i.valid;
                i.old = e;
                var n = this;
                this.startRequest(r);
                var s = {};
                return s[r.name] = e, t.ajax(t.extend(!0, {
                    url: a,
                    mode: "abort",
                    port: "validate" + r.name,
                    dataType: "json",
                    data: s,
                    success: function(a) {
                        n.settings.messages[r.name].remote = i.originalMessage;
                        var s = a === !0 || "true" === a;
                        if (s) {
                            var o = n.formSubmitted;
                            n.prepareElement(r), n.formSubmitted = o, n.successList.push(r), delete n.invalid[r.name], n.showErrors()
                        } else {
                            var u = {},
                                l = a || n.defaultMessage(r, "remote");
                            u[r.name] = i.message = t.isFunction(l) ? l(e) : l, n.invalid[r.name] = !0, n.showErrors(u)
                        }
                        i.valid = s, n.stopRequest(r, s)
                    }
                }, a)), "pending"
            }
        }
    }), t.format = t.validator.format
}(jQuery),
function(t) {
    var e = {};
    if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, r, a) {
        var i = t.port;
        "abort" === t.mode && (e[i] && e[i].abort(), e[i] = a)
    });
    else {
        var r = t.ajax;
        t.ajax = function(a) {
            var i = ("mode" in a ? a : t.ajaxSettings).mode,
                n = ("port" in a ? a : t.ajaxSettings).port;
            return "abort" === i ? (e[n] && e[n].abort(), e[n] = r.apply(this, arguments), e[n]) : r.apply(this, arguments)
        }
    }
}(jQuery),
function(t) {
    t.extend(t.fn, {
        validateDelegate: function(e, r, a) {
            return this.bind(r, function(r) {
                var i = t(r.target);
                return i.is(e) ? a.apply(i, arguments) : void 0
            })
        }
    })
}(jQuery);

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 * --------------------------------------------------
 */

! function(e) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto) }(function(e) {
    "use strict";

    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) return;
            r = n[0]
        }
        var i = this;
        if (i.clk = r, "image" == r.type)
            if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
            var o = a.offset();
            i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
        } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
        setTimeout(function() { i.clk = i.clk_x = i.clk_y = null }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
    var i = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!i) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function(t) {
        function r(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }

        function o(a) {
            for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
            if (t.extraData) {
                var o = r(t.extraData);
                for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
            }
            t.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, t, { contentType: !1, processData: !1, cache: !1, type: u || "POST" });
            t.uploadProgress && (s.xhr = function() {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function(e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), s.data = null;
            var c = s.beforeSend;
            return s.beforeSend = function(e, r) { t.formData ? r.data = t.formData : r.data = n, c && c.call(this, e, r) }, e.ajax(s)
        }

        function s(r) {
            function n(e) {
                var t = null;
                try { e.contentWindow && (t = e.contentWindow.document) } catch (r) { a("cannot get iframe.contentWindow document: " + r) }
                if (t) return t;
                try { t = e.contentDocument ? e.contentDocument : e.document } catch (r) { a("cannot get iframe.contentDocument: " + r), t = e.document }
                return t
            }

            function o() {
                function t() {
                    try {
                        var e = n(g).readyState;
                        a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (r) { a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0 }
                }
                var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;
                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }), m.timeout && (j = setTimeout(function() { T = !0, s(D) }, m.timeout));
                var l = [];
                try {
                    if (m.extraData)
                        for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                    m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                    try { w.submit() } catch (h) {
                        var x = document.createElement("form").submit;
                        x.apply(w)
                    }
                } finally { w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove() }
            }

            function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                    if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                    if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) throw "timeout";
                            var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                            if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                            var u = M.body ? M.body : M.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function(e) {
                                var t = { "content-type": m.dataType };
                                return t[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];
                                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                else if (l) {
                                    var p = M.getElementsByTagName("pre")[0],
                                        h = M.getElementsByTagName("body")[0];
                                    p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                }
                            } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                            try { E = _(x, c, m) } catch (y) { i = "parsererror", x.error = r = y || i }
                        } catch (y) { a("error caught: ", y), i = "error", x.error = r = y || i }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function() { m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null }, 100)
                    }
                }
            }
            var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                S = e.Deferred();
            if (S.abort = function(e) { x.abort(e) }, r)
                for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({ position: "absolute", top: "-1000px", left: "-1000px" })), g = v[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try { g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop") } catch (n) {}
                        v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
            if (x.aborted) return S.reject(), S;
            y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
            var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");
            L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
            var E, M, F, O = 50,
                X = e.parseXML || function(e, t) {
                    return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                },
                C = e.parseJSON || function(e) {
                    return window.eval("(" + e + ")")
                },
                _ = function(t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = "xml" === r || !r && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
            return S
        }
        if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
        var u, c, l, f = this;
        "function" == typeof t ? t = { success: t } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, { url: l, success: e.ajaxSettings.success, type: u || e.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var d = t.traditional;
        void 0 === d && (d = e.ajaxSettings.traditional);
        var p, h = [],
            v = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var g = e.param(v, d);
        p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
        var x = [];
        if (t.resetForm && x.push(function() { f.resetForm() }), t.clearForm && x.push(function() { f.clearForm(t.includeHidden) }), !t.dataType && t.target) {
            var y = t.success || function() {};
            x.push(function(r) {
                var a = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[a](r).each(y, arguments)
            })
        } else t.success && x.push(t.success);
        if (t.success = function(e, r, a) {
                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
            }, t.error) {
            var b = t.error;
            t.error = function(e, r, a) {
                var n = t.context || this;
                b.apply(n, [e, r, a, f])
            }
        }
        if (t.complete) {
            var T = t.complete;
            t.complete = function(e, r) {
                var a = t.context || this;
                T.apply(a, [e, r, f])
            }
        }
        var j = e("input[type=file]:enabled", this).filter(function() {
                return "" !== e(this).val()
            }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;
        a("fileAPI :" + k);
        var A, L = (w || D) && !k;
        t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() { A = s(v) }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
        for (var E = 0; E < h.length; E++) h[E] = null;
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = { s: this.selector, c: this.context };
            return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function() { e(i.s, i.c).ajaxForm(n) }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function(t, r) {
        var a = [];
        if (0 === this.length) return a;
        var i, o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;
        if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
        var c, l, f, m, d, p, h;
        for (c = 0, p = u.length; p > c; c++)
            if (d = u[c], f = d.name, f && !d.disabled)
                if (t && o.clk && "image" == d.type) o.clk == d && (a.push({ name: f, value: e(d).val(), type: d.type }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }));
                else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
            for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({ name: f, value: m[l] });
        else if (n.fileapi && "file" == d.type) {
            r && r.push(d);
            var v = d.files;
            if (v.length)
                for (l = 0; l < v.length; l++) a.push({ name: f, value: v[l], type: d.type });
            else a.push({ name: f, value: "", type: d.type })
        } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({ name: f, value: m, type: d.type, required: d.required }));
        if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];
            f = x.name, f && !x.disabled && "image" == x.type && (a.push({ name: f, value: g.val() }), a.push({ name: f + ".x", value: o.clk_x }, { name: f + ".y", value: o.clk_y }))
        }
        return a
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array)
                    for (var i = 0, o = n.length; o > i; i++) r.push({ name: a, value: n[i] });
                else null !== n && "undefined" != typeof n && r.push({ name: this.name, value: n })
            }
        }), e.param(r)
    }, e.fn.fieldValue = function(t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function(t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
        if ("select" == i) {
            var o = t.selectedIndex;
            if (0 > o) return null;
            for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];
                if (m.selected) {
                    var d = m.value;
                    if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                    s.push(d)
                }
            }
            return s
        }
        return e(t).val()
    }, e.fn.clearForm = function(t) {
        return this.each(function() { e("input,select,textarea", this).clearFields(t) })
    }, e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function(e) {
        return void 0 === e && (e = !0), this.each(function() { this.disabled = !e })
    }, e.fn.selected = function(t) {
        return void 0 === t && (t = !0), this.each(function() {
            var r = this.type;
            if ("checkbox" == r || "radio" == r) this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var a = e(this).parent("select");
                t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});

/*!
 * jquery.mb.components
 * file: jquery.mb.YTPlayer.src.js
 * last modified: 01/07/15 19.35
 * Open Lab s.r.l., Florence - Italy
 * email: matteo@open-lab.com
 * site: http://pupunzi.com
 * http://open-lab.com
 * blog: http://pupunzi.open-lab.com
 * Q&A:  http://jquery.pupunzi.com
 * Licences: MIT, GPL
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);
 * --------------------------------------------------
 */

function onYouTubeIframeAPIReady() { ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady")) }

function uncamel(e) {
    return e.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase()
    })
}

function setUnit(e, t) {
    return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + t : e
}

function setFilter(e, t, o) {
    var i = uncamel(t),
        r = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    e[r + "filter"] = e[r + "filter"] || "", o = setUnit(o > jQuery.CSS.filters[t].max ? jQuery.CSS.filters[t].max : o, jQuery.CSS.filters[t].unit), e[r + "filter"] += i + "(" + o + ") ", delete e[t]
}
var ytp = ytp || {},
    getYTPVideoID = function(e) {
        var t, o;
        return e.indexOf("youtu.be") > 0 ? (t = e.substr(e.lastIndexOf("/") + 1, e.length), o = t.indexOf("?list=") > 0 ? t.substr(t.lastIndexOf("="), t.length) : null, t = o ? t.substr(0, t.lastIndexOf("?")) : t) : e.indexOf("http") > -1 ? (t = e.match(/[\\?&]v=([^&#]*)/)[1], o = e.indexOf("list=") > 0 ? e.match(/[\\?&]list=([^&#]*)/)[1] : null) : (t = e.length > 15 ? null : e, o = t ? null : e), { videoID: t, playlistID: o }
    };
! function(jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.9.4",
        build: "{{ build }}",
        author: "Matteo Bicocchi",
        apiKey: "",
        defaults: { containment: "body", ratio: "auto", videoURL: null, playlistURL: null, startAt: 0, stopAt: 0, autoPlay: !0, vol: 50, addRaster: !1, opacity: 1, quality: "default", mute: !1, loop: !0, showControls: !0, showAnnotations: !1, showYTLogo: !0, stopMovieOnBlur: !0, realfullscreen: !0, gaTrack: !0, optimizeDisplay: !0, onReady: function(e) {} },
        controls: { play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y" },
        locationProtocol: "https:",
        buildPlayer: function(options) {
            return this.each(function() {
                var YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filtersEnabled = !0, YTPlayer.filters = { grayscale: { value: 0, unit: "%" }, hue_rotate: { value: 0, unit: "deg" }, invert: { value: 0, unit: "%" }, opacity: { value: 0, unit: "%" }, saturate: { value: 0, unit: "%" }, sepia: { value: 0, unit: "%" }, brightness: { value: 0, unit: "%" }, contrast: { value: 0, unit: "%" }, blur: { value: 0, unit: "px" } }, $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property)), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function() {
                    var e = !1;
                    try { self.location.href != top.location.href && (e = !0) } catch (t) { e = !0 }
                    return e
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
                    playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
                YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = { autoplay: 0, modestbranding: 1, controls: 0, showinfo: 0, rel: 0, enablejsapi: 1, version: 3, playerapiid: playerID, origin: "*", allowfullscreen: !0, wmode: "transparent", iv_load_policy: YTPlayer.opt.showAnnotations };
                document.createElement("video").canPlayType && jQuery.extend(playerVars, { html5: 1 }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"),
                    overlay = jQuery("<div/>").css({ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }).addClass("YTPOverlay");
                if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    if (YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return void $YTPlayer.remove();
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                    if (wrapper.css({ position: "absolute", zIndex: 0, minWidth: "100%", minHeight: "100%", left: 0, top: 0, overflow: "hidden", opacity: 0 }), playerBox.css({ position: "absolute", zIndex: 0, width: "100%", height: "100%", top: 0, left: 0, overflow: "hidden" }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function() { "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative") }), YTPlayer.isBackground ? (jQuery("body").css({ boxSizing: "border-box" }), wrapper.css({ position: "fixed", top: 0, left: 0, zIndex: 0 }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({ position: "relative" }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({ opacity: 1 }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function() { YTPlayer.controlBar && YTPlayer.controlBar.addClass("visible") }).on("mouseleave", function() { YTPlayer.controlBar && YTPlayer.controlBar.removeClass("visible") }), ytp.YTAPIReady) setTimeout(function() { jQuery(document).trigger("YTAPIReady") }, 100);
                    else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({ src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version, id: "YTAPI" });
                        jQuery("head").prepend(tag)
                    }
                    jQuery(document).on("YTAPIReady", function() {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function() {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({ maxWidth: "100%" });
                                        var h = .6 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({ maxHeight: h })
                                    }
                                    return void new YT.Player(playerID, { videoId: YTPlayer.videoID.toString(), height: "100%", width: "100%", events: { onReady: function(e) { YTPlayer.player = e.target, playerBox.css({ opacity: 1 }), YTPlayer.wrapper.css({ opacity: 1 }) } } })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function(e) {
                                            if (YTPlayer.player = e.target, !YTPlayer.isReady) {
                                                YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function() { $YTPlayer.optimizeDisplay() }), jQuery.mbYTPlayer.checkForState(YTPlayer);
                                                var t = jQuery.Event("YTPUnstarted");
                                                t.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(t)
                                            }
                                        },
                                        onStateChange: function(event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.state != state) {
                                                    YTPlayer.state = state;
                                                    var eventType;
                                                    switch (state) {
                                                        case -1:
                                                            eventType = "YTPUnstarted";
                                                            break;
                                                        case 0:
                                                            eventType = "YTPEnd";
                                                            break;
                                                        case 1:
                                                            eventType = "YTPStart", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                            break;
                                                        case 2:
                                                            eventType = "YTPPause", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 3:
                                                            YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 5:
                                                            eventType = "YTPCued"
                                                    }
                                                    var YTPEvent = jQuery.Event(eventType);
                                                    YTPEvent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                                }
                                            }
                                        },
                                        onPlaybackQualityChange: function(e) {
                                            var t = e.target.getPlaybackQuality(),
                                                o = jQuery.Event("YTPQualityChange");
                                            o.quality = t, jQuery(YTPlayer).trigger(o)
                                        },
                                        onError: function(e) { 150 == e.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == e.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, e) }
                                    }
                                })
                            }
                        }))
                    })
                }
            })
        },
        getDataFromAPI: function(e) {
            if (e.videoData = jQuery.mbStorage.get("YYTPlayer_data_" + e.videoID), jQuery(e).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function() {
                    if (e.hasData && e.isPlayer && !e.opt.autoPlay) {
                        var t = e.videoData.thumb_max || e.videoData.thumb_high || e.videoData.thumb_medium;
                        e.opt.containment.css({ background: "rgba(0,0,0,0.5) url(" + t + ") center center", backgroundSize: "cover" }), e.opt.backgroundUrl = t
                    }
                }), e.videoData) setTimeout(function() {
                e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.dataReceived = !0, jQuery(e).trigger("YTPChanged");
                var t = jQuery.Event("YTPData");
                t.prop = {};
                for (var o in e.videoData) t.prop[o] = e.videoData[o];
                jQuery(e).trigger(t)
            }, 500), e.hasData = !0;
            else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + e.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function(t) {
                function o(t) { e.videoData = {}, e.videoData.id = e.videoID, e.videoData.channelTitle = t.channelTitle, e.videoData.title = t.title, e.videoData.description = t.description.length < 400 ? t.description : t.description.substring(0, 400) + " ...", e.videoData.aspectratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.opt.ratio = e.videoData.aspectratio, e.videoData.thumb_max = t.thumbnails.maxres ? t.thumbnails.maxres.url : null, e.videoData.thumb_high = t.thumbnails.high ? t.thumbnails.high.url : null, e.videoData.thumb_medium = t.thumbnails.medium ? t.thumbnails.medium.url : null, jQuery.mbStorage.set("YYTPlayer_data_" + e.videoID, e.videoData) }
                e.dataReceived = !0, jQuery(e).trigger("YTPChanged"), o(t.items[0].snippet), e.hasData = !0;
                var i = jQuery.Event("YTPData");
                i.prop = {};
                for (var r in e.videoData) i.prop[r] = e.videoData[r];
                jQuery(e).trigger(i)
            });
            else {
                if (setTimeout(function() { jQuery(e).trigger("YTPChanged") }, 50), e.isPlayer && !e.opt.autoPlay) {
                    var t = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + e.videoID + "/hqdefault.jpg";
                    e.opt.containment.css({ background: "rgba(0,0,0,0.5) url(" + t + ") center center", backgroundSize: "cover" }), e.opt.backgroundUrl = t
                }
                e.videoData = null, e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio
            }
            e.isPlayer && !e.opt.autoPlay && (e.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(e).append(e.loading), e.loading.fadeIn())
        },
        removeStoredData: function() { jQuery.mbStorage.remove() },
        getVideoData: function() {
            var e = this.get(0);
            return e.videoData
        },
        getVideoID: function() {
            var e = this.get(0);
            return e.videoID || !1
        },
        setVideoQuality: function(e) {
            var t = this.get(0);
            jQuery.browser.chrome || t.player.setPlaybackQuality(e)
        },
        playlist: function(e, t, o) {
            var i = this,
                r = i.get(0);
            return r.isPlayList = !0, t && (e = jQuery.shuffle(e)), r.videoID || (r.videos = e, r.videoCounter = 0, r.videoLength = e.length, jQuery(r).data("property", e[0]), jQuery(r).mb_YTPlayer()), "function" == typeof o && jQuery(r).on("YTPChanged", function() { o(r) }), jQuery(r).on("YTPEnd", function() { jQuery(r).playNext() }), i
        },
        playNext: function() {
            var e = this.get(0);
            return e.videoCounter++, e.videoCounter >= e.videoLength && (e.videoCounter = 0), jQuery(e).changeMovie(e.videos[e.videoCounter]), this
        },
        playPrev: function() {
            var e = this.get(0);
            return e.videoCounter--, e.videoCounter < 0 && (e.videoCounter = e.videoLength - 1), jQuery(e).changeMovie(e.videos[e.videoCounter]), this
        },
        changeMovie: function(e) {
            var t = this.get(0);
            t.opt.startAt = 0, t.opt.stopAt = 0, t.opt.mute = !0, t.hasData = !1, t.hasChanged = !0, e && jQuery.extend(t.opt, t.defaultOpt, e), t.videoID = getYTPVideoID(t.opt.videoURL).videoID, jQuery(t.playerEl).CSSAnimate({ opacity: 0 }, 200, function() {
                return jQuery(t).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + t.videoID), 1, t.opt.quality), jQuery.mbYTPlayer.checkForState(t), jQuery(t).optimizeDisplay(), jQuery.mbYTPlayer.getDataFromAPI(t), this
            })
        },
        getPlayer: function() {
            return jQuery(this).get(0).player
        },
        playerDestroy: function() {
            var e = this.get(0);
            ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, e.isInit = !1, e.videoID = null;
            var t = e.wrapper;
            return t.remove(), jQuery("#controlBar_" + e.id).remove(), clearInterval(e.checkForStartAt), clearInterval(e.getState), this
        },
        fullscreen: function(real) {
            function hideMouse() { YTPlayer.overlay.css({ cursor: "none" }) }

            function RunPrefixMethod(e, t) {
                for (var o, i, r = ["webkit", "moz", "ms", "o", ""], n = 0; n < r.length && !e[o];) {
                    if (o = t, "" == r[n] && (o = o.substr(0, 1).toLowerCase() + o.substr(1)), o = r[n] + o, i = typeof e[o], "undefined" != i) return r = [r[n]], "function" == i ? e[o]() : e[o];
                    n++
                }
            }

            function launchFullscreen(e) { RunPrefixMethod(e, "RequestFullScreen") }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }
            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function() {
                    var e = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    e ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({ opacity: YTPlayer.opt.opacity }, 500), videoWrapper.css({ zIndex: 0 }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), YTPlayer.overlay.css({ cursor: "auto" }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({ opacity: YTPlayer.opt.opacity }, 500), videoWrapper.css({ zIndex: 0 })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function(e) { YTPlayer.overlay.css({ cursor: "auto" }), clearTimeout(YTPlayer.hideCursor), jQuery(e.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3)) }), hideMouse(), real ? (videoWrapper.css({ opacity: 0 }), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function() { videoWrapper.CSSAnimate({ opacity: 1 }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0) }, 500)) : videoWrapper.css({ zIndex: 1e4 }).CSSAnimate({ opacity: 1 }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function() {
            var e = this.get(0),
                t = e.opt;
            return 1 == t.loop ? t.loop = 0 : (t.startAt ? e.player.seekTo(t.startAt) : e.player.playVideo(), t.loop = 1), this
        },
        play: function() {
            var e = this.get(0);
            if (e.isReady) {
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPPlaypause");
                return o.html(jQuery.mbYTPlayer.controls.pause), e.player.playVideo(), e.wrapper.CSSAnimate({ opacity: e.isAlone ? 1 : e.opt.opacity }, 2e3), jQuery(e.playerEl).CSSAnimate({ opacity: 1 }, 1e3), jQuery(e).css("background-image", "none"), this
            }
        },
        togglePlay: function(e) {
            var t = this.get(0);
            return 1 == t.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof e && e(t.state), this
        },
        stop: function() {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPPlaypause");
            return o.html(jQuery.mbYTPlayer.controls.play), e.player.stopVideo(), this
        },
        pause: function() {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPPlaypause");
            return o.html(jQuery.mbYTPlayer.controls.play), e.player.pauseVideo(), this
        },
        seekTo: function(e) {
            var t = this.get(0);
            return t.player.seekTo(e, !0), this
        },
        setVolume: function(e) {
            var t = this.get(0);
            return e || t.opt.vol || 0 != t.player.getVolume() ? !e && t.player.getVolume() > 0 || e && t.opt.vol == e ? t.isMute ? jQuery(t).YTPUnmute() : jQuery(t).YTPMute() : (t.opt.vol = e, t.player.setVolume(t.opt.vol), t.volumeBar && t.volumeBar.length && t.volumeBar.updateSliderVal(e)) : jQuery(t).YTPUnmute(), this
        },
        mute: function() {
            var e = this.get(0);
            if (!e.isMute) {
                e.player.mute(), e.isMute = !0, e.player.setVolume(0), e.volumeBar && e.volumeBar.length && e.volumeBar.width() > 10 && e.volumeBar.updateSliderVal(0);
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPMuteUnmute");
                o.html(jQuery.mbYTPlayer.controls.unmute), jQuery(e).addClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.addClass("muted");
                var i = jQuery.Event("YTPMuted");
                return i.time = e.player.time, e.canTrigger && jQuery(e).trigger(i), this
            }
        },
        unmute: function() {
            var e = this.get(0);
            if (e.isMute) {
                e.player.unMute(), e.isMute = !1, e.player.setVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(e.opt.vol > 10 ? e.opt.vol : 10);
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPMuteUnmute");
                o.html(jQuery.mbYTPlayer.controls.mute), jQuery(e).removeClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.removeClass("muted");
                var i = jQuery.Event("YTPUnmuted");
                return i.time = e.player.time, e.canTrigger && jQuery(e).trigger(i), this
            }
        },
        applyFilter: function(e, t) {
            var o = this.get(0);
            return o.filters[e].value = t, o.filtersEnabled && this.YTPEnableFilters(), this
        },
        applyFilters: function(e) {
            var t = this.get(0);
            return this.on("YTPReady", function() {
                for (var o in e) t.filters[o].value = e[o], jQuery(t).YTPApplyFilter(o, e[o]);
                jQuery(t).trigger("YTPFiltersApplied")
            }), this
        },
        toggleFilter: function(e, t) {
            return this.each(function() {
                var o = this;
                o.filters[e].value ? o.filters[e].value = 0 : o.filters[e].value = t, o.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function(e) {
            return this.each(function() {
                var t = this;
                t.filtersEnabled ? (jQuery(t).trigger("YTPDisableFilters"), jQuery(t).YTPDisableFilters()) : (jQuery(t).YTPEnableFilters(), jQuery(t).trigger("YTPEnableFilters")), "function" == typeof e && e(t.filtersEnabled)
            })
        },
        disableFilters: function() {
            return this.each(function() {
                var e = this,
                    t = jQuery(e.playerEl);
                t.css("-webkit-filter", ""), t.css("filter", ""), e.filtersEnabled = !1
            })
        },
        enableFilters: function() {
            return this.each(function() {
                var e = this,
                    t = jQuery(e.playerEl),
                    o = "";
                for (var i in e.filters) e.filters[i].value && (o += i.replace("_", "-") + "(" + e.filters[i].value + e.filters[i].unit + ") ");
                t.css("-webkit-filter", o), t.css("filter", o), e.filtersEnabled = !0
            })
        },
        removeFilter: function(e, t) {
            return this.each(function() {
                "function" == typeof e && (t = e, e = null);
                var o = this;
                if (e) jQuery(this).YTPApplyFilter(e, 0), "function" == typeof t && t(e);
                else
                    for (var i in o.filters) jQuery(this).YTPApplyFilter(i, 0), "function" == typeof t && t(i)
            })
        },
        manageProgress: function() {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPProgress"),
                i = t.find(".mb_YTPLoaded"),
                r = t.find(".mb_YTPseekbar"),
                n = o.outerWidth(),
                s = Math.floor(e.player.getCurrentTime()),
                a = Math.floor(e.player.getDuration()),
                l = s * n / a,
                u = 0,
                p = 100 * e.player.getVideoLoadedFraction();
            return i.css({ left: u, width: p + "%" }), r.css({ left: 0, width: l }), { totalTime: a, currentTime: s }
        },
        buildControls: function(YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({ whiteSpace: "noWrap", position: YTPlayer.isBackground ? "fixed" : "absolute", zIndex: YTPlayer.isBackground ? 1e4 : 1e3 }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function() { 1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay() }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function() { 0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute() }),
                    volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({ display: "inline-block" });
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"),
                    vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function() { window.open(vURL, "viewOnYT") }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function() { jQuery(YTPlayer).YTPFullscreen(data.realfullscreen) }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function(e) {
                        timeBar.css({ width: e.clientX - timeBar.offset().left }), YTPlayer.timeW = e.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({ width: 0 });
                        var t = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer["goto"] = timeBar.outerWidth() * t / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({ width: 0 })
                    }),
                    loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({ initialval: YTPlayer.opt.vol, scale: 100, orientation: "h", callback: function(e) { 0 == e.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(e.value), YTPlayer.isMute || (YTPlayer.opt.vol = e.value) } })
            }
        },
        checkForState: function(YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 700;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function() {
                var prog = jQuery(YTPlayer).YTPManageProgress(),
                    $YTPlayer = jQuery(YTPlayer),
                    data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 0,
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && YTPlayer.controlBar.find(".mb_YTPTime").html(prog.totalTime ? jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime) : "-- : -- / -- : --"), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function() { YTPlayer.isEnded = !1 }, 1e3), YTPlayer.isPlayList) {
                        clearInterval(YTPlayer.getState);
                        var YTPEnd = jQuery.Event("YTPEnd");
                        return YTPEnd.time = YTPlayer.player.time, void jQuery(YTPlayer).trigger(YTPEnd)
                    }
                    data.loop ? (startAt = startAt || 1, YTPlayer.player.pauseVideo(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()) : (YTPlayer.player.pauseVideo(), YTPlayer.wrapper.CSSAnimate({ opacity: 0 }, 1e3, function() {
                        var e = jQuery.Event("YTPEnd");
                        e.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(e), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({ background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center", backgroundSize: "cover" })
                    }))
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        checkForStart: function(e) {
            var t = jQuery(e);
            if (!jQuery.contains(document, e)) return void jQuery(e).YTPPlayerDestroy();
            if (jQuery.browser.chrome && (e.opt.quality = "default"), e.player.pauseVideo(), jQuery(e).muteYTPVolume(), jQuery("#controlBar_" + e.id).remove(), e.opt.showControls && jQuery.mbYTPlayer.buildControls(e), e.opt.addRaster) {
                var o = "dot" == e.opt.addRaster ? "raster-dot" : "raster";
                e.overlay.addClass(e.isRetina ? o + " retina" : o)
            } else e.overlay.removeClass(function(e, t) {
                var o = t.split(" "),
                    i = [];
                return jQuery.each(o, function(e, t) { /raster.*/.test(t) && i.push(t) }), i.push("retina"), i.join(" ")
            });
            e.checkForStartAt = setInterval(function() {
                jQuery(e).YTPMute();
                var o = e.opt.startAt ? e.opt.startAt : 1,
                    i = e.player.getVideoLoadedFraction() > o / e.player.getDuration();
                if (e.player.getDuration() > 0 && e.player.getCurrentTime() >= o && i) {
                    clearInterval(e.checkForStartAt), e.isReady = !0, "function" == typeof e.opt.onReady && e.opt.onReady(e);
                    var r = jQuery.Event("YTPReady");
                    jQuery(e).trigger(r), e.player.pauseVideo(), e.opt.mute || jQuery(e).YTPUnmute(), e.canTrigger = !0, e.opt.autoPlay ? (t.YTPPlay(), t.css("background-image", "none"), jQuery(e.playerEl).CSSAnimate({ opacity: 1 }, 1e3), e.wrapper.CSSAnimate({ opacity: e.isAlone ? 1 : e.opt.opacity }, 1e3)) : (e.player.pauseVideo(), e.isPlayer || (jQuery(e.playerEl).CSSAnimate({ opacity: 1 }, 1e3), e.wrapper.CSSAnimate({ opacity: e.isAlone ? 1 : e.opt.opacity }, 1e3))), e.isPlayer && !e.opt.autoPlay && (e.loading.html("Ready"), setTimeout(function() { e.loading.fadeOut() }, 100)), e.controlBar && e.controlBar.slideDown(1e3)
                } else o >= 0 && e.player.seekTo(o, !0)
            }, 1e3)
        },
        formatTime: function(e) {
            var t = Math.floor(e / 60),
                o = Math.floor(e - 60 * t);
            return (9 >= t ? "0" + t : t) + " : " + (9 >= o ? "0" + o : o)
        }
    }, jQuery.fn.toggleVolume = function() {
        var e = this.get(0);
        if (e) return e.player.isMuted() ? (jQuery(e).YTPUnmute(), !0) : (jQuery(e).YTPMute(), !1)
    }, jQuery.fn.optimizeDisplay = function() {
        var e = this.get(0),
            t = e.opt,
            o = jQuery(e.playerEl),
            i = {},
            r = e.wrapper;
        i.width = r.outerWidth(), i.height = r.outerHeight();
        var n = 24,
            s = 100,
            a = {};
        t.optimizeDisplay ? (a.width = i.width + i.width * n / 100, a.height = Math.ceil("16/9" == t.ratio ? 9 * i.width / 16 : 3 * i.width / 4), a.marginTop = -((a.height - i.height) / 2), a.marginLeft = -(i.width * (n / 2) / 100), a.height < i.height && (a.height = i.height + i.height * n / 100, a.width = Math.floor("16/9" == t.ratio ? 16 * i.height / 9 : 4 * i.height / 3), a.marginTop = -(i.height * (n / 2) / 100), a.marginLeft = -((a.width - i.width) / 2)), a.width += s, a.height += s, a.marginTop -= s / 2, a.marginLeft -= s / 2) : (a.width = "100%", a.height = "100%", a.marginTop = 0, a.marginLeft = 0), o.css({ width: a.width, height: a.height, marginTop: a.marginTop, marginLeft: a.marginLeft })
    }, jQuery.shuffle = function(e) {
        for (var t = e.slice(), o = t.length, i = o; i--;) {
            var r = parseInt(Math.random() * o),
                n = t[i];
            t[i] = t[r], t[r] = n
        }
        return t
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function() {
    var e = document.body || document.documentElement,
        t = e.style;
    return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: { blur: { min: 0, max: 100, unit: "px" }, brightness: { min: 0, max: 400, unit: "%" }, contrast: { min: 0, max: 400, unit: "%" }, grayscale: { min: 0, max: 100, unit: "%" }, hueRotate: { min: 0, max: 360, unit: "deg" }, invert: { min: 0, max: 100, unit: "%" }, saturate: { min: 0, max: 400, unit: "%" }, sepia: { min: 0, max: 100, unit: "%" } },
    normalizeCss: function(e) {
        var t = jQuery.extend(!0, {}, e);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var o in t) {
            "transform" === o && (t[jQuery.CSS.sfx + "transform"] = t[o], delete t[o]), "transform-origin" === o && (t[jQuery.CSS.sfx + "transform-origin"] = e[o], delete t[o]), "filter" !== o || jQuery.browser.mozilla || (t[jQuery.CSS.sfx + "filter"] = e[o], delete t[o]), "blur" === o && setFilter(t, "blur", e[o]), "brightness" === o && setFilter(t, "brightness", e[o]), "contrast" === o && setFilter(t, "contrast", e[o]), "grayscale" === o && setFilter(t, "grayscale", e[o]), "hueRotate" === o && setFilter(t, "hueRotate", e[o]), "invert" === o && setFilter(t, "invert", e[o]), "saturate" === o && setFilter(t, "saturate", e[o]),
                "sepia" === o && setFilter(t, "sepia", e[o]);
            var i = "";
            "x" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateX(" + setUnit(e[o], "px") + ")", delete t[o]), "y" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateY(" + setUnit(e[o], "px") + ")", delete t[o]), "z" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateZ(" + setUnit(e[o], "px") + ")", delete t[o]), "rotate" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotate(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateX(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateY(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateZ" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateZ(" + setUnit(e[o], "deg") + ")", delete t[o]), "scale" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scale(" + setUnit(e[o], "") + ")", delete t[o]), "scaleX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleX(" + setUnit(e[o], "") + ")", delete t[o]), "scaleY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleY(" + setUnit(e[o], "") + ")", delete t[o]), "scaleZ" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleZ(" + setUnit(e[o], "") + ")", delete t[o]), "skew" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skew(" + setUnit(e[o], "deg") + ")", delete t[o]), "skewX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewX(" + setUnit(e[o], "deg") + ")", delete t[o]), "skewY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewY(" + setUnit(e[o], "deg") + ")", delete t[o]), "perspective" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " perspective(" + setUnit(e[o], "px") + ")", delete t[o])
        }
        return t
    },
    getProp: function(e) {
        var t = [];
        for (var o in e) t.indexOf(o) < 0 && t.push(uncamel(o));
        return t.join(",")
    },
    animate: function(e, t, o, i, r) {
        return this.each(function() {
            function n() { s.called = !0, s.CSSAIsRunning = !1, a.off(jQuery.CSS.transitionEnd + "." + s.id), clearTimeout(s.timeout), a.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof r && r.apply(s), "function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null) }
            var s = this,
                a = jQuery(this);
            s.id = s.id || "CSSA_" + (new Date).getTime();
            var l = l || { type: "noEvent" };
            if (s.CSSAIsRunning && s.eventType == l.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(s.CSSqueue = function() { a.CSSAnimate(e, t, o, i, r) });
            if (s.CSSqueue = null, s.eventType = l.type, 0 !== a.length && e) {
                if (e = jQuery.normalizeCss(e), s.CSSAIsRunning = !0, "function" == typeof t && (r = t, t = jQuery.fx.speeds._default), "function" == typeof o && (i = o, o = 0), "string" == typeof o && (r = o, o = 0), "function" == typeof i && (r = i, i = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof t)
                    for (var u in jQuery.fx.speeds) {
                        if (t == u) {
                            t = jQuery.fx.speeds[u];
                            break
                        }
                        t = jQuery.fx.speeds._default
                    }
                if (t || (t = jQuery.fx.speeds._default), "string" == typeof r && (i = r, r = null), !jQuery.support.CSStransition) {
                    for (var p in e) {
                        if ("transform" === p && delete e[p], "filter" === p && delete e[p], "transform-origin" === p && delete e[p], "auto" === e[p] && delete e[p], "x" === p) {
                            var m = e[p],
                                c = "left";
                            e[c] = m, delete e[p]
                        }
                        if ("y" === p) {
                            var m = e[p],
                                c = "top";
                            e[c] = m, delete e[p]
                        }("-ms-transform" === p || "-ms-filter" === p) && delete e[p]
                    }
                    return void a.delay(o).animate(e, t, r)
                }
                var d = { "default": "ease", "in": "ease-in", out: "ease-out", "in-out": "ease-in-out", snap: "cubic-bezier(0,1,.5,1)", easeOutCubic: "cubic-bezier(.215,.61,.355,1)", easeInOutCubic: "cubic-bezier(.645,.045,.355,1)", easeInCirc: "cubic-bezier(.6,.04,.98,.335)", easeOutCirc: "cubic-bezier(.075,.82,.165,1)", easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)", easeInExpo: "cubic-bezier(.95,.05,.795,.035)", easeOutExpo: "cubic-bezier(.19,1,.22,1)", easeInOutExpo: "cubic-bezier(1,0,0,1)", easeInQuad: "cubic-bezier(.55,.085,.68,.53)", easeOutQuad: "cubic-bezier(.25,.46,.45,.94)", easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)", easeInQuart: "cubic-bezier(.895,.03,.685,.22)", easeOutQuart: "cubic-bezier(.165,.84,.44,1)", easeInOutQuart: "cubic-bezier(.77,0,.175,1)", easeInQuint: "cubic-bezier(.755,.05,.855,.06)", easeOutQuint: "cubic-bezier(.23,1,.32,1)", easeInOutQuint: "cubic-bezier(.86,0,.07,1)", easeInSine: "cubic-bezier(.47,0,.745,.715)", easeOutSine: "cubic-bezier(.39,.575,.565,1)", easeInOutSine: "cubic-bezier(.445,.05,.55,.95)", easeInBack: "cubic-bezier(.6,-.28,.735,.045)", easeOutBack: "cubic-bezier(.175, .885,.32,1.275)", easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)" };
                d[i] && (i = d[i]), a.off(jQuery.CSS.transitionEnd + "." + s.id);
                var f = jQuery.CSS.getProp(e),
                    y = {};
                jQuery.extend(y, e), y[jQuery.CSS.sfx + "transition-property"] = f, y[jQuery.CSS.sfx + "transition-duration"] = t + "ms", y[jQuery.CSS.sfx + "transition-delay"] = o + "ms", y[jQuery.CSS.sfx + "transition-timing-function"] = i, setTimeout(function() { a.one(jQuery.CSS.transitionEnd + "." + s.id, n), a.css(y) }, 1), s.timeout = setTimeout(function() {
                    return s.called || !r ? (s.called = !1, void(s.CSSAIsRunning = !1)) : (a.css(jQuery.CSS.sfx + "transition", ""), r.apply(s), s.CSSAIsRunning = !1, void("function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)))
                }, t + o + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function(e) {
    return this.each(function() {
        var t = jQuery(this),
            o = jQuery.normalizeCss(e);
        t.css(o)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
    else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
    else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
    else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3,
            end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), ! function(e) {
    /iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());
    var t = "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1;
    e.simpleSlider = {
        defaults: { initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1 },
        events: { start: t ? "touchstart" : "mousedown", end: t ? "touchend" : "mouseup", move: t ? "touchmove" : "mousemove" },
        init: function(o) {
            return this.each(function() {
                var i = this,
                    r = e(i);
                r.addClass("simpleSlider"), i.opt = {}, e.extend(i.opt, e.simpleSlider.defaults, o), e.extend(i.opt, r.data());
                var n = "h" == i.opt.orientation ? "horizontal" : "vertical",
                    s = e("<div/>").addClass("level").addClass(n);
                r.prepend(s), i.level = s, r.css({ cursor: "default" }), "auto" == i.opt.scale && (i.opt.scale = e(i).outerWidth()), r.updateSliderVal(), i.opt.readonly || (r.on(e.simpleSlider.events.start, function(e) { t && (e = e.changedTouches[0]), i.canSlide = !0, r.updateSliderVal(e), r.css({ cursor: "col-resize" }), e.preventDefault(), e.stopPropagation() }), e(document).on(e.simpleSlider.events.move, function(o) { t && (o = o.changedTouches[0]), i.canSlide && (e(document).css({ cursor: "default" }), r.updateSliderVal(o), o.preventDefault(), o.stopPropagation()) }).on(e.simpleSlider.events.end, function() { e(document).css({ cursor: "auto" }), i.canSlide = !1, r.css({ cursor: "auto" }) }))
            })
        },
        updateSliderVal: function(t) {
            function o(e, t) {
                return Math.floor(100 * e / t)
            }
            var i = this,
                r = i.get(0);
            r.opt.initialval = "number" == typeof r.opt.initialval ? r.opt.initialval : r.opt.initialval(r);
            var n = e(r).outerWidth(),
                s = e(r).outerHeight();
            r.x = "object" == typeof t ? t.clientX + document.body.scrollLeft - i.offset().left : "number" == typeof t ? t * n / r.opt.scale : r.opt.initialval * n / r.opt.scale, r.y = "object" == typeof t ? t.clientY + document.body.scrollTop - i.offset().top : "number" == typeof t ? (r.opt.scale - r.opt.initialval - t) * s / r.opt.scale : r.opt.initialval * s / r.opt.scale, r.y = i.outerHeight() - r.y, r.scaleX = r.x * r.opt.scale / n, r.scaleY = r.y * r.opt.scale / s, r.outOfRangeX = r.scaleX > r.opt.scale ? r.scaleX - r.opt.scale : r.scaleX < 0 ? r.scaleX : 0, r.outOfRangeY = r.scaleY > r.opt.scale ? r.scaleY - r.opt.scale : r.scaleY < 0 ? r.scaleY : 0, r.outOfRange = "h" == r.opt.orientation ? r.outOfRangeX : r.outOfRangeY, r.value = "undefined" != typeof t ? "h" == r.opt.orientation ? r.x >= i.outerWidth() ? r.opt.scale : r.x <= 0 ? 0 : r.scaleX : r.y >= i.outerHeight() ? r.opt.scale : r.y <= 0 ? 0 : r.scaleY : "h" == r.opt.orientation ? r.scaleX : r.scaleY, "h" == r.opt.orientation ? r.level.width(o(r.x, n) + "%") : r.level.height(o(r.y, s)), "function" == typeof r.opt.callback && r.opt.callback(r)
        }
    }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal
}(jQuery), ! function(e) {
    e.mbCookie = {
        set: function(e, t, o, i) {
            t = JSON.stringify(t), o || (o = 7), i = i ? "; domain=" + i : "";
            var r, n = new Date;
            n.setTime(n.getTime() + 864e5 * o), r = "; expires=" + n.toGMTString(), document.cookie = e + "=" + t + r + "; path=/" + i
        },
        get: function(e) {
            for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
                for (var r = o[i];
                    " " == r.charAt(0);) r = r.substring(1, r.length);
                if (0 == r.indexOf(t)) return JSON.parse(r.substring(t.length, r.length))
            }
            return null
        },
        remove: function(t) { e.mbCookie.set(t, "", -1) }
    }, e.mbStorage = {
        set: function(e, t) { t = JSON.stringify(t), localStorage.setItem(e, t) },
        get: function(e) {
            return localStorage[e] ? JSON.parse(localStorage[e]) : null
        },
        remove: function(e) { e ? localStorage.removeItem(e) : localStorage.clear() }
    }
}(jQuery);

/**
 * kenburnsy - Easy to use JQuery plugin to make slideshows with Ken Burns effect
 * @version v0.0.5
 * @link https://github.com/ZeroOneStudio/kenburnsy
 * @license MIT
 * --------------------------------------------------
 */

! function(t, e, i, n) {
    function s(e, i) { this.el = e, this.$el = t(e), this.settings = t.extend({}, o, i), this._defaults = o, this._name = a, this._slides = [], this.currentIndex = 0, this.init() }
    var a = "kenburnsy",
        o = { fullscreen: !1, duration: 9e3, fadeInDuration: 1500, height: null },
        r = { zoomOut: function(e, i) { t(e).velocity({ rotateZ: "3deg", scale: "1.1" }, 0).velocity({ translateZ: 0, rotateZ: "0deg", scale: "1" }, i) }, zoomIn: function(e, i) { t(e).velocity({ rotateZ: "0deg", scale: "1" }, 0).velocity({ translateZ: 0, rotateZ: "3deg", scale: "1.1" }, i) } },
        c = function(e) {
            var i = function(t) {
                function i() { s(), setTimeout(function() { t.resolve(a) }) }

                function n() { s(), t.rejectWith(a) }

                function s() { a.onload = null, a.onerror = null, a.onabort = null }
                var a = new Image;
                a.onload = i, a.onerror = n, a.onabort = n, a.src = e
            };
            return t.Deferred(i).promise()
        };
    Object.keys || (Object.keys = function(t) {
        if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
        var e, i = [];
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(e);
        return i
    }), t.extend(s.prototype, {
        init: function() {
            var e, i = this.settings,
                n = this;
            e = this.$el.children().map(function(t, e) {
                return e.src
            }), this.$el.addClass(function() {
                var t = [a];
                return i.fullscreen && t.push("fullscreen"), t.join(" ")
            }), t.when.apply(t, t.map(e, c)).done(function() {
                var t = Array.prototype.slice.call(arguments);
                n.buildScene(t)
            })
        },
        reveal: function(e) {
            var i = this._slides[e],
                n = this.$el;
            t(i).velocity({ opacity: 0 }, 0, function() { t(this).appendTo(n) }).velocity({ opacity: 1, translateZ: 0 }, { duration: this.settings.fadeInDuration, queue: !1 })
        },
        animate: function(t) {
            var e = Object.keys(r),
                i = r[e[Math.floor(e.length * Math.random())]],
                n = this.settings.duration,
                s = this._slides[t];
            i(s, n)
        },
        show: function(t) { this.reveal(t), this.animate(t) },
        next: function() { this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex) },
        addSlides: function(e) {
            var n = this.el;
            return t.map(e.reverse(), function(t) {
                var e = i.createElement("div");
                return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", n.appendChild(e), e
            })
        },
        buildScene: function(t) {
            var e = this,
                i = this.settings;
            this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, i.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function() { e.next() }, i.duration - i.fadeInDuration)
        }
    }), t.fn[a] = function(e) {
        return this.each(function() { t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new s(this, e)) }), this
    }
}(jQuery, window, document);
! function(t, e, n, i) {
    function s(e, n) { this.el = e, this.$el = t(e), this.settings = t.extend({}, o, n), this._defaults = o, this._name = a, this._slides = [], this.currentIndex = 0, this.init() }
    var a = "ss",
        o = { fullscreen: !1, duration: 9e3, fadeInDuration: 1500, height: null },
        r = { zoomOut: function(e, n) { t(e).velocity({ translateZ: 0 }, 0).velocity({ translateZ: 0 }, n) }, zoomIn: function(e, n) { t(e).velocity({ translateZ: 0 }, 0).velocity({ translateZ: 0 }, n) } },
        c = function(e) {
            var n = function(t) {
                function n() { s(), setTimeout(function() { t.resolve(a) }) }

                function i() { s(), t.rejectWith(a) }

                function s() { a.onload = null, a.onerror = null, a.onabort = null }
                var a = new Image;
                a.onload = n, a.onerror = i, a.onabort = i, a.src = e
            };
            return t.Deferred(n).promise()
        };
    Object.keys || (Object.keys = function(t) {
        if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
        var e, n = [];
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
        return n
    }), t.extend(s.prototype, {
        init: function() {
            var e, n = this.settings,
                i = this;
            e = this.$el.children().map(function(t, e) {
                return e.src
            }), this.$el.addClass(function() {
                var t = [a];
                return n.fullscreen && t.push("fullscreen"), t.join(" ")
            }), t.when.apply(t, t.map(e, c)).done(function() {
                var t = Array.prototype.slice.call(arguments);
                i.buildScene(t)
            })
        },
        reveal: function(e) {
            var n = this._slides[e],
                i = this.$el;
            t(n).velocity({ opacity: 0 }, 0, function() { t(this).appendTo(i) }).velocity({ opacity: 1, translateZ: 0 }, { duration: this.settings.fadeInDuration, queue: !1 })
        },
        animate: function(t) {
            var e = Object.keys(r),
                n = r[e[Math.floor(e.length * Math.random())]],
                i = this.settings.duration,
                s = this._slides[t];
            n(s, i)
        },
        show: function(t) { this.reveal(t), this.animate(t) },
        next: function() { this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex) },
        addSlides: function(e) {
            var i = this.el;
            return t.map(e.reverse(), function(t) {
                var e = n.createElement("div");
                return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", i.appendChild(e), e
            })
        },
        buildScene: function(t) {
            var e = this,
                n = this.settings;
            this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, n.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function() { e.next() }, n.duration - n.fadeInDuration)
        }
    }), t.fn[a] = function(e) {
        return this.each(function() { t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new s(this, e)) }), this
    }
}(jQuery, window, document);
var ResponsiveBootstrapToolkit = function(t) {
    var e = {
            detectionDivs: { bootstrap: { xs: t('<div class="device-xs visible-xs visible-xs-block"></div>'), sm: t('<div class="device-sm visible-sm visible-sm-block"></div>'), md: t('<div class="device-md visible-md visible-md-block"></div>'), lg: t('<div class="device-lg visible-lg visible-lg-block"></div>') }, foundation: { small: t('<div class="device-xs show-for-small-only"></div>'), medium: t('<div class="device-sm show-for-medium-only"></div>'), large: t('<div class="device-md show-for-large-only"></div>'), xlarge: t('<div class="device-lg show-for-xlarge-only"></div>') } },
            applyDetectionDivs: function() { t(document).ready(function() { t.each(i.breakpoints, function(t) { i.breakpoints[t].appendTo(".responsive-bootstrap-toolkit") }) }) },
            isAnExpression: function(t) {
                return "<" == t.charAt(0) || ">" == t.charAt(0)
            },
            splitExpression: function(t) {
                var e = t.charAt(0),
                    i = "=" == t.charAt(1) ? !0 : !1,
                    s = 1 + (i ? 1 : 0),
                    o = t.slice(s);
                return { operator: e, orEqual: i, breakpointName: o }
            },
            isAnyActive: function(e) {
                var s = !1;
                return t.each(e, function(t, e) {
                    return i.breakpoints[e].is(":visible") ? (s = !0, !1) : void 0
                }), s
            },
            isMatchingExpression: function(t) {
                var s = e.splitExpression(t),
                    o = Object.keys(i.breakpoints),
                    a = o.indexOf(s.breakpointName);
                if (-1 !== a) {
                    var n = 0,
                        r = 0;
                    "<" == s.operator && (n = 0, r = s.orEqual ? ++a : a), ">" == s.operator && (n = s.orEqual ? a : ++a, r = void 0);
                    var d = o.slice(n, r);
                    return e.isAnyActive(d)
                }
            }
        },
        i = {
            interval: 300,
            framework: null,
            breakpoints: null,
            is: function(t) {
                return e.isAnExpression(t) ? e.isMatchingExpression(t) : i.breakpoints[t] && i.breakpoints[t].is(":visible")
            },
            use: function(t, s) { i.framework = t.toLowerCase(), "bootstrap" === i.framework || "foundation" === i.framework ? i.breakpoints = e.detectionDivs[i.framework] : i.breakpoints = s, e.applyDetectionDivs() },
            current: function() {
                var e = "unrecognized";
                return t.each(i.breakpoints, function(t) { i.is(t) && (e = t) }), e
            },
            changed: function(t, e) {
                var s;
                return function() { clearTimeout(s), s = setTimeout(function() { t() }, e || i.interval) }
            }
        };
    return t('<div class="responsive-bootstrap-toolkit"></div>').appendTo("body"), null === i.framework && i.use("bootstrap"), i
}(jQuery);

/*!
 * Device.js
 * (c) 2014 Matthew Hudson
 * Device.js is freely distributable under the MIT license.
 * For all details and documentation:
 * http://matthewhudson.me/projects/device.js/
 * --------------------------------------------------
 */

(function() {
    var t, e, n, r, o, i, a, l, s, c;
    e = window.device, t = {}, window.device = t, r = window.document.documentElement, c = window.navigator.userAgent.toLowerCase(), t.ios = function() {
        return t.iphone() || t.ipod() || t.ipad()
    }, t.iphone = function() {
        return !t.windows() && o("iphone")
    }, t.ipod = function() {
        return o("ipod")
    }, t.ipad = function() {
        return o("ipad")
    }, t.android = function() {
        return !t.windows() && o("android")
    }, t.androidPhone = function() {
        return t.android() && o("mobile")
    }, t.androidTablet = function() {
        return t.android() && !o("mobile")
    }, t.blackberry = function() {
        return o("blackberry") || o("bb10") || o("rim")
    }, t.blackberryPhone = function() {
        return t.blackberry() && !o("tablet")
    }, t.blackberryTablet = function() {
        return t.blackberry() && o("tablet")
    }, t.windows = function() {
        return o("windows")
    }, t.windowsPhone = function() {
        return t.windows() && o("phone")
    }, t.windowsTablet = function() {
        return t.windows() && o("touch") && !t.windowsPhone()
    }, t.fxos = function() {
        return (o("(mobile;") || o("(tablet;")) && o("; rv:")
    }, t.fxosPhone = function() {
        return t.fxos() && o("mobile")
    }, t.fxosTablet = function() {
        return t.fxos() && o("tablet")
    }, t.meego = function() {
        return o("meego")
    }, t.cordova = function() {
        return window.cordova && "file:" === location.protocol
    }, t.nodeWebkit = function() {
        return "object" == typeof window.process
    }, t.mobile = function() {
        return t.androidPhone() || t.iphone() || t.ipod() || t.windowsPhone() || t.blackberryPhone() || t.fxosPhone() || t.meego()
    }, t.tablet = function() {
        return t.ipad() || t.androidTablet() || t.blackberryTablet() || t.windowsTablet() || t.fxosTablet()
    }, t.desktop = function() {
        return !t.tablet() && !t.mobile()
    }, t.television = function() {
        var t;
        for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], t = 0; t < television.length;) {
            if (o(television[t])) return !0;
            t++
        }
        return !1
    }, t.portrait = function() {
        return window.innerHeight / window.innerWidth > 1
    }, t.landscape = function() {
        return window.innerHeight / window.innerWidth < 1
    }, t.noConflict = function() {
        return window.device = e, this
    }, o = function(t) {
        return -1 !== c.indexOf(t)
    }, a = function(t) {
        var e;
        return e = new RegExp(t, "i"), r.className.match(e)
    }, n = function(t) {
        var e = null;
        a(t) || (e = r.className.replace(/^\s+|\s+$/g, ""), r.className = e + " " + t)
    }, s = function(t) { a(t) && (r.className = r.className.replace(" " + t, "")) }, t.ios() ? t.ipad() ? n("ios ipad tablet") : t.iphone() ? n("ios iphone mobile") : t.ipod() && n("ios ipod mobile") : t.android() ? n(t.androidTablet() ? "android tablet" : "android mobile") : t.blackberry() ? n(t.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : t.windows() ? n(t.windowsTablet() ? "windows tablet" : t.windowsPhone() ? "windows mobile" : "desktop") : t.fxos() ? n(t.fxosTablet() ? "fxos tablet" : "fxos mobile") : t.meego() ? n("meego mobile") : t.nodeWebkit() ? n("node-webkit") : t.television() ? n("television") : t.desktop() && n("desktop"), t.cordova() && n("cordova"), i = function() { t.landscape() ? (s("portrait"), n("landscape")) : (s("landscape"), n("portrait")) }, l = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(l, i, !1) : window.attachEvent ? window.attachEvent(l, i) : window[l] = i, i(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? module.exports = t : window.device = t
}).call(this);

/*!
 * VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License
 * --------------------------------------------------
 */

! function(e) {
    function t(e) {
        var t = e.length,
            n = r.type(e);
        return "function" === n || r.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    if (!e.jQuery) {
        var r = function(e, t) {
            return new r.fn.init(e, t)
        };
        r.isWindow = function(e) {
            return null != e && e == e.window
        }, r.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? o[a.call(e)] || "object" : typeof e
        }, r.isArray = Array.isArray || function(e) {
            return "array" === r.type(e)
        }, r.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e)) return !1;
            try {
                if (e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            for (t in e);
            return void 0 === t || i.call(e, t)
        }, r.each = function(e, r, n) {
            var o, i = 0,
                a = e.length,
                l = t(e);
            if (n) {
                if (l)
                    for (; a > i && (o = r.apply(e[i], n), o !== !1); i++);
                else
                    for (i in e)
                        if (o = r.apply(e[i], n), o === !1) break
            } else if (l)
                for (; a > i && (o = r.call(e[i], i, e[i]), o !== !1); i++);
            else
                for (i in e)
                    if (o = r.call(e[i], i, e[i]), o === !1) break; return e
        }, r.data = function(e, t, o) {
            if (void 0 === o) {
                var i = e[r.expando],
                    a = i && n[i];
                if (void 0 === t) return a;
                if (a && t in a) return a[t]
            } else if (void 0 !== t) {
                var i = e[r.expando] || (e[r.expando] = ++r.uuid);
                return n[i] = n[i] || {}, n[i][t] = o, o
            }
        }, r.removeData = function(e, t) {
            var o = e[r.expando],
                i = o && n[o];
            i && r.each(t, function(e, t) { delete i[t] })
        }, r.extend = function() {
            var e, t, n, o, i, a, l = arguments[0] || {},
                s = 1,
                c = arguments.length,
                u = !1;
            for ("boolean" == typeof l && (u = l, l = arguments[s] || {}, s++), "object" != typeof l && "function" !== r.type(l) && (l = {}), s === c && (l = this, s--); c > s; s++)
                if (null != (i = arguments[s]))
                    for (o in i) e = l[o], n = i[o], l !== n && (u && n && (r.isPlainObject(n) || (t = r.isArray(n))) ? (t ? (t = !1, a = e && r.isArray(e) ? e : []) : a = e && r.isPlainObject(e) ? e : {}, l[o] = r.extend(u, a, n)) : void 0 !== n && (l[o] = n));
            return l
        }, r.queue = function(e, n, o) {
            function i(e, r) {
                var n = r || [];
                return null != e && (t(Object(e)) ? ! function(e, t) {
                    for (var r = +t.length, n = 0, o = e.length; r > n;) e[o++] = t[n++];
                    if (r !== r)
                        for (; void 0 !== t[n];) e[o++] = t[n++];
                    return e.length = o, e
                }(n, "string" == typeof e ? [e] : e) : [].push.call(n, e)), n
            }
            if (e) {
                n = (n || "fx") + "queue";
                var a = r.data(e, n);
                return o ? (!a || r.isArray(o) ? a = r.data(e, n, i(o)) : a.push(o), a) : a || []
            }
        }, r.dequeue = function(e, t) {
            r.each(e.nodeType ? [e] : e, function(e, n) {
                t = t || "fx";
                var o = r.queue(n, t),
                    i = o.shift();
                "inprogress" === i && (i = o.shift()), i && ("fx" === t && o.unshift("inprogress"), i.call(n, function() { r.dequeue(n, t) }))
            })
        }, r.fn = r.prototype = {
            init: function(e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };
                return { top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }
                var t = this[0],
                    e = e.apply(t),
                    n = this.offset(),
                    o = /^(?:body|html)$/i.test(e.nodeName) ? { top: 0, left: 0 } : r(e).offset();
                return n.top -= parseFloat(t.style.marginTop) || 0, n.left -= parseFloat(t.style.marginLeft) || 0, e.style && (o.top += parseFloat(e.style.borderTopWidth) || 0, o.left += parseFloat(e.style.borderLeftWidth) || 0), { top: n.top - o.top, left: n.left - o.left }
            }
        };
        var n = {};
        r.expando = "velocity" + (new Date).getTime(), r.uuid = 0;
        for (var o = {}, i = o.hasOwnProperty, a = o.toString, l = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < l.length; s++) o["[object " + l[s] + "]"] = l[s].toLowerCase();
        r.fn.init.prototype = r.fn, e.Velocity = { Utilities: r }
    }
}(window),
function(e) { "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e() }(function() {
    return function(e, t, r, n) {
        function o(e) {
            for (var t = -1, r = e ? e.length : 0, n = []; ++t < r;) {
                var o = e[t];
                o && n.push(o)
            }
            return n
        }

        function i(e) {
            return h.isWrapped(e) ? e = [].slice.call(e) : h.isNode(e) && (e = [e]), e
        }

        function a(e) {
            var t = d.data(e, "velocity");
            return null === t ? n : t
        }

        function l(e) {
            return function(t) {
                return Math.round(t * e) * (1 / e)
            }
        }

        function s(e, r, n, o) {
            function i(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function a(e, t) {
                return 3 * t - 6 * e
            }

            function l(e) {
                return 3 * e
            }

            function s(e, t, r) {
                return ((i(t, r) * e + a(t, r)) * e + l(t)) * e
            }

            function c(e, t, r) {
                return 3 * i(t, r) * e * e + 2 * a(t, r) * e + l(t)
            }

            function u(t, r) {
                for (var o = 0; h > o; ++o) {
                    var i = c(r, e, n);
                    if (0 === i) return r;
                    var a = s(r, e, n) - t;
                    r -= a / i
                }
                return r
            }

            function p() {
                for (var t = 0; y > t; ++t) P[t] = s(t * x, e, n)
            }

            function d(t, r, o) {
                var i, a, l = 0;
                do a = r + (o - r) / 2, i = s(a, e, n) - t, i > 0 ? o = a : r = a; while (Math.abs(i) > m && ++l < b);
                return a
            }

            function f(t) {
                for (var r = 0, o = 1, i = y - 1; o != i && P[o] <= t; ++o) r += x;
                --o;
                var a = (t - P[o]) / (P[o + 1] - P[o]),
                    l = r + a * x,
                    s = c(l, e, n);
                return s >= v ? u(t, l) : 0 == s ? l : d(t, r, r + x)
            }

            function g() { T = !0, (e != r || n != o) && p() }
            var h = 4,
                v = .001,
                m = 1e-7,
                b = 10,
                y = 11,
                x = 1 / (y - 1),
                w = "Float32Array" in t;
            if (4 !== arguments.length) return !1;
            for (var S = 0; 4 > S; ++S)
                if ("number" != typeof arguments[S] || isNaN(arguments[S]) || !isFinite(arguments[S])) return !1;
            e = Math.min(e, 1), n = Math.min(n, 1), e = Math.max(e, 0), n = Math.max(n, 0);
            var P = w ? new Float32Array(y) : new Array(y),
                T = !1,
                Y = function(t) {
                    return T || g(), e === r && n === o ? t : 0 === t ? 0 : 1 === t ? 1 : s(f(t), r, o)
                };
            Y.getControlPoints = function() {
                return [{ x: e, y: r }, { x: n, y: o }]
            };
            var R = "generateBezier(" + [e, r, n, o] + ")";
            return Y.toString = function() {
                return R
            }, Y
        }

        function c(e, t) {
            var r = e;
            return h.isString(e) ? y.Easings[e] || (r = !1) : r = h.isArray(e) && 1 === e.length ? l.apply(null, e) : h.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : h.isArray(e) && 4 === e.length ? s.apply(null, e) : !1, r === !1 && (r = y.Easings[y.defaults.easing] ? y.defaults.easing : b), r
        }

        function u(e) {
            if (e) {
                var t = (new Date).getTime(),
                    r = y.State.calls.length;
                r > 1e4 && (y.State.calls = o(y.State.calls));
                for (var i = 0; r > i; i++)
                    if (y.State.calls[i]) {
                        var l = y.State.calls[i],
                            s = l[0],
                            c = l[2],
                            f = l[3],
                            g = !!f,
                            v = null;
                        f || (f = y.State.calls[i][3] = t - 16);
                        for (var m = Math.min((t - f) / c.duration, 1), b = 0, x = s.length; x > b; b++) {
                            var S = s[b],
                                T = S.element;
                            if (a(T)) {
                                var Y = !1;
                                if (c.display !== n && null !== c.display && "none" !== c.display) {
                                    if ("flex" === c.display) {
                                        var R = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        d.each(R, function(e, t) { w.setPropertyValue(T, "display", t) })
                                    }
                                    w.setPropertyValue(T, "display", c.display)
                                }
                                c.visibility !== n && "hidden" !== c.visibility && w.setPropertyValue(T, "visibility", c.visibility);
                                for (var V in S)
                                    if ("element" !== V) {
                                        var E, C = S[V],
                                            k = h.isString(C.easing) ? y.Easings[C.easing] : C.easing;
                                        if (1 === m) E = C.endValue;
                                        else {
                                            var X = C.endValue - C.startValue;
                                            if (E = C.startValue + X * k(m, c, X), !g && E === C.currentValue) continue
                                        }
                                        if (C.currentValue = E, "tween" === V) v = E;
                                        else {
                                            if (w.Hooks.registered[V]) {
                                                var L = w.Hooks.getRoot(V),
                                                    H = a(T).rootPropertyValueCache[L];
                                                H && (C.rootPropertyValue = H)
                                            }
                                            var W = w.setPropertyValue(T, V, C.currentValue + (0 === parseFloat(E) ? "" : C.unitType), C.rootPropertyValue, C.scrollData);
                                            w.Hooks.registered[V] && (w.Normalizations.registered[L] ? a(T).rootPropertyValueCache[L] = w.Normalizations.registered[L]("extract", null, W[1]) : a(T).rootPropertyValueCache[L] = W[1]), "transform" === W[0] && (Y = !0)
                                        }
                                    }
                                c.mobileHA && a(T).transformCache.translate3d === n && (a(T).transformCache.translate3d = "(0px, 0px, 0px)", Y = !0), Y && w.flushTransformCache(T)
                            }
                        }
                        c.display !== n && "none" !== c.display && (y.State.calls[i][2].display = !1), c.visibility !== n && "hidden" !== c.visibility && (y.State.calls[i][2].visibility = !1), c.progress && c.progress.call(l[1], l[1], m, Math.max(0, f + c.duration - t), f, v), 1 === m && p(i)
                    }
            }
            y.State.isTicking && P(u)
        }

        function p(e, t) {
            if (!y.State.calls[e]) return !1;
            for (var r = y.State.calls[e][0], o = y.State.calls[e][1], i = y.State.calls[e][2], l = y.State.calls[e][4], s = !1, c = 0, u = r.length; u > c; c++) {
                var p = r[c].element;
                if (t || i.loop || ("none" === i.display && w.setPropertyValue(p, "display", i.display), "hidden" === i.visibility && w.setPropertyValue(p, "visibility", i.visibility)), i.loop !== !0 && (d.queue(p)[1] === n || !/\.velocityQueueEntryFlag/i.test(d.queue(p)[1])) && a(p)) {
                    a(p).isAnimating = !1, a(p).rootPropertyValueCache = {};
                    var f = !1;
                    d.each(w.Lists.transforms3D, function(e, t) {
                        var r = /^scale/.test(t) ? 1 : 0,
                            o = a(p).transformCache[t];
                        a(p).transformCache[t] !== n && new RegExp("^\\(" + r + "[^.]").test(o) && (f = !0, delete a(p).transformCache[t])
                    }), i.mobileHA && (f = !0, delete a(p).transformCache.translate3d), f && w.flushTransformCache(p), w.Values.removeClass(p, "velocity-animating")
                }
                if (!t && i.complete && !i.loop && c === u - 1) try { i.complete.call(o, o) } catch (g) {
                    setTimeout(function() {
                        throw g
                    }, 1)
                }
                l && i.loop !== !0 && l(o), a(p) && i.loop === !0 && !t && (d.each(a(p).tweensContainer, function(e, t) { /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100) }), y(p, "reverse", { loop: !0, delay: i.delay })), i.queue !== !1 && d.dequeue(p, i.queue)
            }
            y.State.calls[e] = !1;
            for (var h = 0, v = y.State.calls.length; v > h; h++)
                if (y.State.calls[h] !== !1) {
                    s = !0;
                    break
                }
            s === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
        }
        var d, f = function() {
                if (r.documentMode) return r.documentMode;
                for (var e = 7; e > 4; e--) {
                    var t = r.createElement("div");
                    if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                }
                return n
            }(),
            g = function() {
                var e = 0;
                return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                    var r, n = (new Date).getTime();
                    return r = Math.max(0, 16 - (n - e)), e = n + r, setTimeout(function() { t(n + r) }, r)
                }
            }(),
            h = {
                isString: function(e) {
                    return "string" == typeof e
                },
                isArray: Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                isFunction: function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                },
                isNode: function(e) {
                    return e && e.nodeType
                },
                isNodeList: function(e) {
                    return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== n && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                },
                isWrapped: function(e) {
                    return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                },
                isSVG: function(e) {
                    return t.SVGElement && e instanceof t.SVGElement
                },
                isEmptyObject: function(e) {
                    for (var t in e) return !1;
                    return !0
                }
            },
            v = !1;
        if (e.fn && e.fn.jquery ? (d = e, v = !0) : d = t.Velocity.Utilities, 8 >= f && !v) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
        var m = 400,
            b = "swing",
            y = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: t.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: r.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: d, Redirects: {}, Easings: {}, Promise: t.Promise, defaults: { queue: "", duration: m, easing: b, begin: n, complete: n, progress: n, display: n, visibility: n, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function(e) { d.data(e, "velocity", { isSVG: h.isSVG(e), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} }) }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };
        t.pageYOffset !== n ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
        var x = function() {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v
            }

            function t(t, r, n) {
                var o = { x: t.x + n.dx * r, v: t.v + n.dv * r, tension: t.tension, friction: t.friction };
                return { dx: o.v, dv: e(o) }
            }

            function r(r, n) {
                var o = { dx: r.v, dv: e(r) },
                    i = t(r, .5 * n, o),
                    a = t(r, .5 * n, i),
                    l = t(r, n, a),
                    s = 1 / 6 * (o.dx + 2 * (i.dx + a.dx) + l.dx),
                    c = 1 / 6 * (o.dv + 2 * (i.dv + a.dv) + l.dv);
                return r.x = r.x + s * n, r.v = r.v + c * n, r
            }
            return function n(e, t, o) {
                var i, a, l, s = { x: -1, v: 0, tension: null, friction: null },
                    c = [0],
                    u = 0,
                    p = 1e-4,
                    d = .016;
                for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, s.tension = e, s.friction = t, i = null !== o, i ? (u = n(e, t), a = u / o * d) : a = d;;)
                    if (l = r(l || s, a), c.push(1 + l.x), u += 16, !(Math.abs(l.x) > p && Math.abs(l.v) > p)) break;
                return i ? function(e) {
                    return c[e * (c.length - 1) | 0]
                } : u
            }
        }();
        y.Easings = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            spring: function(e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
            }
        }, d.each([
            ["ease", [.25, .1, .25, 1]],
            ["ease-in", [.42, 0, 1, 1]],
            ["ease-out", [0, 0, .58, 1]],
            ["ease-in-out", [.42, 0, .58, 1]],
            ["easeInSine", [.47, 0, .745, .715]],
            ["easeOutSine", [.39, .575, .565, 1]],
            ["easeInOutSine", [.445, .05, .55, .95]],
            ["easeInQuad", [.55, .085, .68, .53]],
            ["easeOutQuad", [.25, .46, .45, .94]],
            ["easeInOutQuad", [.455, .03, .515, .955]],
            ["easeInCubic", [.55, .055, .675, .19]],
            ["easeOutCubic", [.215, .61, .355, 1]],
            ["easeInOutCubic", [.645, .045, .355, 1]],
            ["easeInQuart", [.895, .03, .685, .22]],
            ["easeOutQuart", [.165, .84, .44, 1]],
            ["easeInOutQuart", [.77, 0, .175, 1]],
            ["easeInQuint", [.755, .05, .855, .06]],
            ["easeOutQuint", [.23, 1, .32, 1]],
            ["easeInOutQuint", [.86, 0, .07, 1]],
            ["easeInExpo", [.95, .05, .795, .035]],
            ["easeOutExpo", [.19, 1, .22, 1]],
            ["easeInOutExpo", [1, 0, 0, 1]],
            ["easeInCirc", [.6, .04, .98, .335]],
            ["easeOutCirc", [.075, .82, .165, 1]],
            ["easeInOutCirc", [.785, .135, .15, .86]]
        ], function(e, t) { y.Easings[t[0]] = s.apply(null, t[1]) });
        var w = y.CSS = {
            RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi },
            Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] },
            Hooks: {
                templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] },
                registered: {},
                register: function() {
                    for (var e = 0; e < w.Lists.colors.length; e++) {
                        var t = "color" === w.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                        w.Hooks.templates[w.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                    }
                    var r, n, o;
                    if (f)
                        for (r in w.Hooks.templates) {
                            n = w.Hooks.templates[r], o = n[0].split(" ");
                            var i = n[1].match(w.RegEx.valueSplit);
                            "Color" === o[0] && (o.push(o.shift()), i.push(i.shift()), w.Hooks.templates[r] = [o.join(" "), i.join(" ")])
                        }
                    for (r in w.Hooks.templates) {
                        n = w.Hooks.templates[r], o = n[0].split(" ");
                        for (var e in o) {
                            var a = r + o[e],
                                l = e;
                            w.Hooks.registered[a] = [r, l]
                        }
                    }
                },
                getRoot: function(e) {
                    var t = w.Hooks.registered[e];
                    return t ? t[0] : e
                },
                cleanRootPropertyValue: function(e, t) {
                    return w.RegEx.valueUnwrap.test(t) && (t = t.match(w.RegEx.valueUnwrap)[1]), w.Values.isCSSNullValue(t) && (t = w.Hooks.templates[e][1]), t
                },
                extractValue: function(e, t) {
                    var r = w.Hooks.registered[e];
                    if (r) {
                        var n = r[0],
                            o = r[1];
                        return t = w.Hooks.cleanRootPropertyValue(n, t), t.toString().match(w.RegEx.valueSplit)[o]
                    }
                    return t
                },
                injectValue: function(e, t, r) {
                    var n = w.Hooks.registered[e];
                    if (n) {
                        var o, i, a = n[0],
                            l = n[1];
                        return r = w.Hooks.cleanRootPropertyValue(a, r), o = r.toString().match(w.RegEx.valueSplit), o[l] = t, i = o.join(" ")
                    }
                    return r
                }
            },
            Normalizations: {
                registered: {
                    clip: function(e, t, r) {
                        switch (e) {
                            case "name":
                                return "clip";
                            case "extract":
                                var n;
                                return w.RegEx.wrappedValueAlreadyExtracted.test(r) ? n = r : (n = r.toString().match(w.RegEx.valueUnwrap), n = n ? n[1].replace(/,(\s+)?/g, " ") : r), n;
                            case "inject":
                                return "rect(" + r + ")"
                        }
                    },
                    blur: function(e, t, r) {
                        switch (e) {
                            case "name":
                                return y.State.isFirefox ? "filter" : "-webkit-filter";
                            case "extract":
                                var n = parseFloat(r);
                                if (!n && 0 !== n) {
                                    var o = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                    n = o ? o[1] : 0
                                }
                                return n;
                            case "inject":
                                return parseFloat(r) ? "blur(" + r + ")" : "none"
                        }
                    },
                    opacity: function(e, t, r) {
                        if (8 >= f) switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var n = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                return r = n ? n[1] / 100 : 1;
                            case "inject":
                                return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                        } else switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return r;
                            case "inject":
                                return r
                        }
                    }
                },
                register: function() {
                    9 >= f || y.State.isGingerbread || (w.Lists.transformsBase = w.Lists.transformsBase.concat(w.Lists.transforms3D));
                    for (var e = 0; e < w.Lists.transformsBase.length; e++) ! function() {
                        var t = w.Lists.transformsBase[e];
                        w.Normalizations.registered[t] = function(e, r, o) {
                            switch (e) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return a(r) === n || a(r).transformCache[t] === n ? /^scale/i.test(t) ? 1 : 0 : a(r).transformCache[t].replace(/[()]/g, "");
                                case "inject":
                                    var i = !1;
                                    switch (t.substr(0, t.length - 1)) {
                                        case "translate":
                                            i = !/(%|px|em|rem|vw|vh|\d)$/i.test(o);
                                            break;
                                        case "scal":
                                        case "scale":
                                            y.State.isAndroid && a(r).transformCache[t] === n && 1 > o && (o = 1), i = !/(\d)$/i.test(o);
                                            break;
                                        case "skew":
                                            i = !/(deg|\d)$/i.test(o);
                                            break;
                                        case "rotate":
                                            i = !/(deg|\d)$/i.test(o)
                                    }
                                    return i || (a(r).transformCache[t] = "(" + o + ")"), a(r).transformCache[t]
                            }
                        }
                    }();
                    for (var e = 0; e < w.Lists.colors.length; e++) ! function() {
                        var t = w.Lists.colors[e];
                        w.Normalizations.registered[t] = function(e, r, o) {
                            switch (e) {
                                case "name":
                                    return t;
                                case "extract":
                                    var i;
                                    if (w.RegEx.wrappedValueAlreadyExtracted.test(o)) i = o;
                                    else {
                                        var a, l = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };
                                        /^[A-z]+$/i.test(o) ? a = l[o] !== n ? l[o] : l.black : w.RegEx.isHex.test(o) ? a = "rgb(" + w.Values.hexToRgb(o).join(" ") + ")" : /^rgba?\(/i.test(o) || (a = l.black), i = (a || o).toString().match(w.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= f || 3 !== i.split(" ").length || (i += " 1"), i;
                                case "inject":
                                    return 8 >= f ? 4 === o.split(" ").length && (o = o.split(/\s+/).slice(0, 3).join(" ")) : 3 === o.split(" ").length && (o += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + o.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                            }
                        }
                    }()
                }
            },
            Names: {
                camelCase: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                SVGAttribute: function(e) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (f || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                },
                prefixCheck: function(e) {
                    if (y.State.prefixMatches[e]) return [y.State.prefixMatches[e], !0];
                    for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, n = t.length; n > r; r++) {
                        var o;
                        if (o = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                                return e.toUpperCase()
                            }), h.isString(y.State.prefixElement.style[o])) return y.State.prefixMatches[e] = o, [o, !0]
                    }
                    return [e, !1]
                }
            },
            Values: {
                hexToRgb: function(e) {
                    var t, r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                        n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return e = e.replace(r, function(e, t, r, n) {
                        return t + t + r + r + n + n
                    }), t = n.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                },
                getUnitType: function(e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                },
                getDisplayType: function(e) {
                    var t = e && e.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                },
                addClass: function(e, t) { e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t },
                removeClass: function(e, t) { e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ") }
            },
            getPropertyValue: function(e, r, o, i) {
                function l(e, r) {
                    function o() { c && w.setPropertyValue(e, "display", "none") }
                    var s = 0;
                    if (8 >= f) s = d.css(e, r);
                    else {
                        var c = !1;
                        if (/^(width|height)$/.test(r) && 0 === w.getPropertyValue(e, "display") && (c = !0, w.setPropertyValue(e, "display", w.Values.getDisplayType(e))), !i) {
                            if ("height" === r && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var u = e.offsetHeight - (parseFloat(w.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingBottom")) || 0);
                                return o(), u
                            }
                            if ("width" === r && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var p = e.offsetWidth - (parseFloat(w.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingRight")) || 0);
                                return o(), p
                            }
                        }
                        var g;
                        g = a(e) === n ? t.getComputedStyle(e, null) : a(e).computedStyle ? a(e).computedStyle : a(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), s = 9 === f && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === s || null === s) && (s = e.style[r]), o()
                    }
                    if ("auto" === s && /^(top|right|bottom|left)$/i.test(r)) {
                        var h = l(e, "position");
                        ("fixed" === h || "absolute" === h && /top|left/i.test(r)) && (s = d(e).position()[r] + "px")
                    }
                    return s
                }
                var s;
                if (w.Hooks.registered[r]) {
                    var c = r,
                        u = w.Hooks.getRoot(c);
                    o === n && (o = w.getPropertyValue(e, w.Names.prefixCheck(u)[0])), w.Normalizations.registered[u] && (o = w.Normalizations.registered[u]("extract", e, o)), s = w.Hooks.extractValue(c, o)
                } else if (w.Normalizations.registered[r]) {
                    var p, g;
                    p = w.Normalizations.registered[r]("name", e), "transform" !== p && (g = l(e, w.Names.prefixCheck(p)[0]), w.Values.isCSSNullValue(g) && w.Hooks.templates[r] && (g = w.Hooks.templates[r][1])), s = w.Normalizations.registered[r]("extract", e, g)
                }
                if (!/^[\d-]/.test(s))
                    if (a(e) && a(e).isSVG && w.Names.SVGAttribute(r))
                        if (/^(height|width)$/i.test(r)) try { s = e.getBBox()[r] } catch (h) { s = 0 } else s = e.getAttribute(r);
                        else s = l(e, w.Names.prefixCheck(r)[0]);
                return w.Values.isCSSNullValue(s) && (s = 0), y.debug >= 2 && console.log("Get " + r + ": " + s), s
            },
            setPropertyValue: function(e, r, n, o, i) {
                var l = r;
                if ("scroll" === r) i.container ? i.container["scroll" + i.direction] = n : "Left" === i.direction ? t.scrollTo(n, i.alternateValue) : t.scrollTo(i.alternateValue, n);
                else if (w.Normalizations.registered[r] && "transform" === w.Normalizations.registered[r]("name", e)) w.Normalizations.registered[r]("inject", e, n), l = "transform", n = a(e).transformCache[r];
                else {
                    if (w.Hooks.registered[r]) {
                        var s = r,
                            c = w.Hooks.getRoot(r);
                        o = o || w.getPropertyValue(e, c), n = w.Hooks.injectValue(s, n, o), r = c
                    }
                    if (w.Normalizations.registered[r] && (n = w.Normalizations.registered[r]("inject", e, n), r = w.Normalizations.registered[r]("name", e)), l = w.Names.prefixCheck(r)[0], 8 >= f) try { e.style[l] = n } catch (u) { y.debug && console.log("Browser does not support [" + n + "] for [" + l + "]") } else a(e) && a(e).isSVG && w.Names.SVGAttribute(r) ? e.setAttribute(r, n) : e.style[l] = n;
                    y.debug >= 2 && console.log("Set " + r + " (" + l + "): " + n)
                }
                return [l, n]
            },
            flushTransformCache: function(e) {
                function t(t) {
                    return parseFloat(w.getPropertyValue(e, t))
                }
                var r = "";
                if ((f || y.State.isAndroid && !y.State.isChrome) && a(e).isSVG) {
                    var n = { translate: [t("translateX"), t("translateY")], skewX: [t("skewX")], skewY: [t("skewY")], scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")], rotate: [t("rotateZ"), 0, 0] };
                    d.each(a(e).transformCache, function(e) { /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), n[e] && (r += e + "(" + n[e].join(" ") + ") ", delete n[e]) })
                } else {
                    var o, i;
                    d.each(a(e).transformCache, function(t) {
                        return o = a(e).transformCache[t], "transformPerspective" === t ? (i = o, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void(r += t + o + " "))
                    }), i && (r = "perspective" + i + " " + r)
                }
                w.setPropertyValue(e, "transform", r)
            }
        };
        w.Hooks.register(), w.Normalizations.register(), y.hook = function(e, t, r) {
            var o = n;
            return e = i(e), d.each(e, function(e, i) {
                if (a(i) === n && y.init(i), r === n) o === n && (o = y.CSS.getPropertyValue(i, t));
                else {
                    var l = y.CSS.setPropertyValue(i, t, r);
                    "transform" === l[0] && y.CSS.flushTransformCache(i), o = l
                }
            }), o
        };
        var S = function() {
            function e() {
                return l ? V.promise || null : s
            }

            function o() {
                function e(e) {
                    function p(e, t) {
                        var r = n,
                            o = n,
                            a = n;
                        return h.isArray(e) ? (r = e[0], !h.isArray(e[1]) && /^[\d-]/.test(e[1]) || h.isFunction(e[1]) || w.RegEx.isHex.test(e[1]) ? a = e[1] : (h.isString(e[1]) && !w.RegEx.isHex.test(e[1]) || h.isArray(e[1])) && (o = t ? e[1] : c(e[1], l.duration), e[2] !== n && (a = e[2]))) : r = e, t || (o = o || l.easing), h.isFunction(r) && (r = r.call(i, T, P)), h.isFunction(a) && (a = a.call(i, T, P)), [r || 0, o, a]
                    }

                    function f(e, t) {
                        var r, n;
                        return n = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                            return r = e, ""
                        }), r || (r = w.Values.getUnitType(e)), [n, r]
                    }

                    function m() {
                        var e = { myParent: i.parentNode || r.body, position: w.getPropertyValue(i, "position"), fontSize: w.getPropertyValue(i, "fontSize") },
                            n = e.position === W.lastPosition && e.myParent === W.lastParent,
                            o = e.fontSize === W.lastFontSize;
                        W.lastParent = e.myParent, W.lastPosition = e.position, W.lastFontSize = e.fontSize;
                        var l = 100,
                            s = {};
                        if (o && n) s.emToPx = W.lastEmToPx, s.percentToPxWidth = W.lastPercentToPxWidth, s.percentToPxHeight = W.lastPercentToPxHeight;
                        else {
                            var c = a(i).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
                            y.init(c), e.myParent.appendChild(c), d.each(["overflow", "overflowX", "overflowY"], function(e, t) { y.CSS.setPropertyValue(c, t, "hidden") }), y.CSS.setPropertyValue(c, "position", e.position), y.CSS.setPropertyValue(c, "fontSize", e.fontSize), y.CSS.setPropertyValue(c, "boxSizing", "content-box"), d.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) { y.CSS.setPropertyValue(c, t, l + "%") }), y.CSS.setPropertyValue(c, "paddingLeft", l + "em"), s.percentToPxWidth = W.lastPercentToPxWidth = (parseFloat(w.getPropertyValue(c, "width", null, !0)) || 1) / l, s.percentToPxHeight = W.lastPercentToPxHeight = (parseFloat(w.getPropertyValue(c, "height", null, !0)) || 1) / l, s.emToPx = W.lastEmToPx = (parseFloat(w.getPropertyValue(c, "paddingLeft")) || 1) / l, e.myParent.removeChild(c)
                        }
                        return null === W.remToPx && (W.remToPx = parseFloat(w.getPropertyValue(r.body, "fontSize")) || 16), null === W.vwToPx && (W.vwToPx = parseFloat(t.innerWidth) / 100, W.vhToPx = parseFloat(t.innerHeight) / 100), s.remToPx = W.remToPx, s.vwToPx = W.vwToPx, s.vhToPx = W.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(s), i), s
                    }
                    if (l.begin && 0 === T) try { l.begin.call(g, g) } catch (x) {
                        setTimeout(function() {
                            throw x
                        }, 1)
                    }
                    if ("scroll" === E) {
                        var S, Y, R, C = /^x$/i.test(l.axis) ? "Left" : "Top",
                            k = parseFloat(l.offset) || 0;
                        l.container ? h.isWrapped(l.container) || h.isNode(l.container) ? (l.container = l.container[0] || l.container, S = l.container["scroll" + C], R = S + d(i).position()[C.toLowerCase()] + k) : l.container = null : (S = y.State.scrollAnchor[y.State["scrollProperty" + C]], Y = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === C ? "Top" : "Left")]], R = d(i).offset()[C.toLowerCase()] + k), s = { scroll: { rootPropertyValue: !1, startValue: S, currentValue: S, endValue: R, unitType: "", easing: l.easing, scrollData: { container: l.container, direction: C, alternateValue: Y } }, element: i }, y.debug && console.log("tweensContainer (scroll): ", s.scroll, i)
                    } else if ("reverse" === E) {
                        if (!a(i).tweensContainer) return void d.dequeue(i, l.queue);
                        "none" === a(i).opts.display && (a(i).opts.display = "auto"), "hidden" === a(i).opts.visibility && (a(i).opts.visibility = "visible"), a(i).opts.loop = !1, a(i).opts.begin = null, a(i).opts.complete = null, b.easing || delete l.easing, b.duration || delete l.duration, l = d.extend({}, a(i).opts, l);
                        var X = d.extend(!0, {}, a(i).tweensContainer);
                        for (var L in X)
                            if ("element" !== L) {
                                var H = X[L].startValue;
                                X[L].startValue = X[L].currentValue = X[L].endValue, X[L].endValue = H, h.isEmptyObject(b) || (X[L].easing = l.easing), y.debug && console.log("reverse tweensContainer (" + L + "): " + JSON.stringify(X[L]), i)
                            }
                        s = X
                    } else if ("start" === E) {
                        var X;
                        a(i).tweensContainer && a(i).isAnimating === !0 && (X = a(i).tweensContainer), d.each(v, function(e, t) {
                            if (RegExp("^" + w.Lists.colors.join("$|^") + "$").test(e)) {
                                var r = p(t, !0),
                                    o = r[0],
                                    i = r[1],
                                    a = r[2];
                                if (w.RegEx.isHex.test(o)) {
                                    for (var l = ["Red", "Green", "Blue"], s = w.Values.hexToRgb(o), c = a ? w.Values.hexToRgb(a) : n, u = 0; u < l.length; u++) {
                                        var d = [s[u]];
                                        i && d.push(i), c !== n && d.push(c[u]), v[e + l[u]] = d
                                    }
                                    delete v[e]
                                }
                            }
                        });
                        for (var I in v) {
                            var j = p(v[I]),
                                F = j[0],
                                M = j[1],
                                N = j[2];
                            I = w.Names.camelCase(I);
                            var O = w.Hooks.getRoot(I),
                                z = !1;
                            if (a(i).isSVG || "tween" === O || w.Names.prefixCheck(O)[1] !== !1 || w.Normalizations.registered[O] !== n) {
                                (l.display !== n && null !== l.display && "none" !== l.display || l.visibility !== n && "hidden" !== l.visibility) && /opacity|filter/.test(I) && !N && 0 !== F && (N = 0), l._cacheValues && X && X[I] ? (N === n && (N = X[I].endValue + X[I].unitType), z = a(i).rootPropertyValueCache[O]) : w.Hooks.registered[I] ? N === n ? (z = w.getPropertyValue(i, O), N = w.getPropertyValue(i, I, z)) : z = w.Hooks.templates[O][1] : N === n && (N = w.getPropertyValue(i, I));
                                var D, q, B, $ = !1;
                                if (D = f(I, N), N = D[0], B = D[1], D = f(I, F), F = D[0].replace(/^([+-\/*])=/, function(e, t) {
                                        return $ = t, ""
                                    }), q = D[1], N = parseFloat(N) || 0, F = parseFloat(F) || 0, "%" === q && (/^(fontSize|lineHeight)$/.test(I) ? (F /= 100, q = "em") : /^scale/.test(I) ? (F /= 100, q = "") : /(Red|Green|Blue)$/i.test(I) && (F = F / 100 * 255, q = "")), /[\/*]/.test($)) q = B;
                                else if (B !== q && 0 !== N)
                                    if (0 === F) q = B;
                                    else {
                                        o = o || m();
                                        var U = /margin|padding|left|right|width|text|word|letter/i.test(I) || /X$/.test(I) || "x" === I ? "x" : "y";
                                        switch (B) {
                                            case "%":
                                                N *= "x" === U ? o.percentToPxWidth : o.percentToPxHeight;
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                N *= o[B + "ToPx"]
                                        }
                                        switch (q) {
                                            case "%":
                                                N *= 1 / ("x" === U ? o.percentToPxWidth : o.percentToPxHeight);
                                                break;
                                            case "px":
                                                break;
                                            default:
                                                N *= 1 / o[q + "ToPx"]
                                        }
                                    }
                                switch ($) {
                                    case "+":
                                        F = N + F;
                                        break;
                                    case "-":
                                        F = N - F;
                                        break;
                                    case "*":
                                        F = N * F;
                                        break;
                                    case "/":
                                        F = N / F
                                }
                                s[I] = { rootPropertyValue: z, startValue: N, currentValue: N, endValue: F, unitType: q, easing: M }, y.debug && console.log("tweensContainer (" + I + "): " + JSON.stringify(s[I]), i)
                            } else y.debug && console.log("Skipping [" + O + "] due to a lack of browser support.")
                        }
                        s.element = i
                    }
                    s.element && (w.Values.addClass(i, "velocity-animating"), A.push(s), "" === l.queue && (a(i).tweensContainer = s, a(i).opts = l), a(i).isAnimating = !0, T === P - 1 ? (y.State.calls.push([A, g, l, null, V.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, u())) : T++)
                }
                var o, i = this,
                    l = d.extend({}, y.defaults, b),
                    s = {};
                switch (a(i) === n && y.init(i), parseFloat(l.delay) && l.queue !== !1 && d.queue(i, l.queue, function(e) { y.velocityQueueEntryFlag = !0, a(i).delayTimer = { setTimeout: setTimeout(e, parseFloat(l.delay)), next: e } }), l.duration.toString().toLowerCase()) {
                    case "fast":
                        l.duration = 200;
                        break;
                    case "normal":
                        l.duration = m;
                        break;
                    case "slow":
                        l.duration = 600;
                        break;
                    default:
                        l.duration = parseFloat(l.duration) || 1
                }
                y.mock !== !1 && (y.mock === !0 ? l.duration = l.delay = 1 : (l.duration *= parseFloat(y.mock) || 1, l.delay *= parseFloat(y.mock) || 1)), l.easing = c(l.easing, l.duration), l.begin && !h.isFunction(l.begin) && (l.begin = null), l.progress && !h.isFunction(l.progress) && (l.progress = null), l.complete && !h.isFunction(l.complete) && (l.complete = null), l.display !== n && null !== l.display && (l.display = l.display.toString().toLowerCase(), "auto" === l.display && (l.display = y.CSS.Values.getDisplayType(i))), l.visibility !== n && null !== l.visibility && (l.visibility = l.visibility.toString().toLowerCase()), l.mobileHA = l.mobileHA && y.State.isMobile && !y.State.isGingerbread, l.queue === !1 ? l.delay ? setTimeout(e, l.delay) : e() : d.queue(i, l.queue, function(t, r) {
                    return r === !0 ? (V.promise && V.resolver(g), !0) : (y.velocityQueueEntryFlag = !0, void e(t))
                }), "" !== l.queue && "fx" !== l.queue || "inprogress" === d.queue(i)[0] || d.dequeue(i)
            }
            var l, s, f, g, v, b, x = arguments[0] && (arguments[0].p || d.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || h.isString(arguments[0].properties));
            if (h.isWrapped(this) ? (l = !1, f = 0, g = this, s = this) : (l = !0, f = 1, g = x ? arguments[0].elements || arguments[0].e : arguments[0]), g = i(g)) {
                x ? (v = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (v = arguments[f], b = arguments[f + 1]);
                var P = g.length,
                    T = 0;
                if (!/^(stop|finish|finishAll)$/i.test(v) && !d.isPlainObject(b)) {
                    var Y = f + 1;
                    b = {};
                    for (var R = Y; R < arguments.length; R++) h.isArray(arguments[R]) || !/^(fast|normal|slow)$/i.test(arguments[R]) && !/^\d/.test(arguments[R]) ? h.isString(arguments[R]) || h.isArray(arguments[R]) ? b.easing = arguments[R] : h.isFunction(arguments[R]) && (b.complete = arguments[R]) : b.duration = arguments[R]
                }
                var V = { promise: null, resolver: null, rejecter: null };
                l && y.Promise && (V.promise = new y.Promise(function(e, t) { V.resolver = e, V.rejecter = t }));
                var E;
                switch (v) {
                    case "scroll":
                        E = "scroll";
                        break;
                    case "reverse":
                        E = "reverse";
                        break;
                    case "finish":
                    case "finishAll":
                    case "stop":
                        d.each(g, function(e, t) { a(t) && a(t).delayTimer && (clearTimeout(a(t).delayTimer.setTimeout), a(t).delayTimer.next && a(t).delayTimer.next(), delete a(t).delayTimer), "finishAll" !== v || b !== !0 && !h.isString(b) || (d.each(d.queue(t, h.isString(b) ? b : ""), function(e, t) { h.isFunction(t) && t() }), d.queue(t, h.isString(b) ? b : "", [])) });
                        var C = [];
                        return d.each(y.State.calls, function(e, t) {
                            t && d.each(t[1], function(r, o) {
                                var i = b === n ? "" : b;
                                return i === !0 || t[2].queue === i || b === n && t[2].queue === !1 ? void d.each(g, function(r, n) {
                                    n === o && ((b === !0 || h.isString(b)) && (d.each(d.queue(n, h.isString(b) ? b : ""), function(e, t) {
                                        h.isFunction(t) && t(null, !0)
                                    }), d.queue(n, h.isString(b) ? b : "", [])), "stop" === v ? (a(n) && a(n).tweensContainer && i !== !1 && d.each(a(n).tweensContainer, function(e, t) { t.endValue = t.currentValue }), C.push(e)) : ("finish" === v || "finishAll" === v) && (t[2].duration = 1))
                                }) : !0
                            })
                        }), "stop" === v && (d.each(C, function(e, t) { p(t, !0) }), V.promise && V.resolver(g)), e();
                    default:
                        if (!d.isPlainObject(v) || h.isEmptyObject(v)) {
                            if (h.isString(v) && y.Redirects[v]) {
                                var k = d.extend({}, b),
                                    X = k.duration,
                                    L = k.delay || 0;
                                return k.backwards === !0 && (g = d.extend(!0, [], g).reverse()), d.each(g, function(e, t) { parseFloat(k.stagger) ? k.delay = L + parseFloat(k.stagger) * e : h.isFunction(k.stagger) && (k.delay = L + k.stagger.call(t, e, P)), k.drag && (k.duration = parseFloat(X) || (/^(callout|transition)/.test(v) ? 1e3 : m), k.duration = Math.max(k.duration * (k.backwards ? 1 - e / P : (e + 1) / P), .75 * k.duration, 200)), y.Redirects[v].call(t, t, k || {}, e, P, g, V.promise ? V : n) }), e()
                            }
                            var H = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                            return V.promise ? V.rejecter(new Error(H)) : console.log(H), e()
                        }
                        E = "start"
                }
                var W = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
                    A = [];
                d.each(g, function(e, t) { h.isNode(t) && o.call(t) });
                var I, k = d.extend({}, y.defaults, b);
                if (k.loop = parseInt(k.loop), I = 2 * k.loop - 1, k.loop)
                    for (var j = 0; I > j; j++) {
                        var F = { delay: k.delay, progress: k.progress };
                        j === I - 1 && (F.display = k.display, F.visibility = k.visibility, F.complete = k.complete), S(g, "reverse", F)
                    }
                return e()
            }
        };
        y = d.extend(S, y), y.animate = S;
        var P = t.requestAnimationFrame || g;
        return y.State.isMobile || r.hidden === n || r.addEventListener("visibilitychange", function() {
            r.hidden ? (P = function(e) {
                return setTimeout(function() { e(!0) }, 16)
            }, u()) : P = t.requestAnimationFrame || g
        }), e.Velocity = y, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = y.defaults), d.each(["Down", "Up"], function(e, t) {
            y.Redirects["slide" + t] = function(e, r, o, i, a, l) {
                var s = d.extend({}, r),
                    c = s.begin,
                    u = s.complete,
                    p = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                    f = {};
                s.display === n && (s.display = "Down" === t ? "inline" === y.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), s.begin = function() {
                    c && c.call(a, a);
                    for (var r in p) {
                        f[r] = e.style[r];
                        var n = y.CSS.getPropertyValue(e, r);
                        p[r] = "Down" === t ? [n, 0] : [0, n]
                    }
                    f.overflow = e.style.overflow, e.style.overflow = "hidden"
                }, s.complete = function() {
                    for (var t in f) e.style[t] = f[t];
                    u && u.call(a, a), l && l.resolver(a)
                }, y(e, p, s)
            }
        }), d.each(["In", "Out"], function(e, t) {
            y.Redirects["fade" + t] = function(e, r, o, i, a, l) {
                var s = d.extend({}, r),
                    c = { opacity: "In" === t ? 1 : 0 },
                    u = s.complete;
                o !== i - 1 ? s.complete = s.begin = null : s.complete = function() { u && u.call(a, a), l && l.resolver(a) }, s.display === n && (s.display = "In" === t ? "auto" : "none"), y(this, c, s)
            }
        }), y
    }(window.jQuery || window.Zepto || window, window, document)
});

/*
 * VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci.
 * --------------------------------------------------
 */

! function(e) { "function" == typeof require && "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["velocity"], e) : e() }(function() {
    return function(e, t, r, n) {
        function a(e, t) {
            var r = [];
            return e && t ? (o.each([e, t], function(e, t) {
                var n = [];
                o.each(t, function(e, t) {
                    for (; t.toString().length < 5;) t = "0" + t;
                    n.push(t)
                }), r.push(n.join(""))
            }), parseFloat(r[0]) > parseFloat(r[1])) : !1
        }
        if (!e.Velocity || !e.Velocity.Utilities) return void(t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var i = e.Velocity,
            o = i.Utilities,
            s = i.version,
            l = { major: 1, minor: 1, patch: 0 };
        if (a(l, s)) {
            var c = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(c), new Error(c)
        }
        i.RegisterEffect = i.RegisterUI = function(e, t) {
            function r(e, t, r, n) {
                var a, s = 0;
                o.each(e.nodeType ? [e] : e, function(e, t) { n && (r += e * n), a = t.parentNode, o.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function(e, r) { s += parseFloat(i.CSS.getPropertyValue(t, r)) }) }), i.animate(a, { height: ("In" === t ? "+" : "-") + "=" + s }, { queue: !1, easing: "ease-in-out", duration: r * ("In" === t ? .6 : 1) })
            }
            return i.Redirects[e] = function(a, s, l, c, u, p) {
                function f() { s.display !== n && "none" !== s.display || !/Out$/.test(e) || o.each(u.nodeType ? [u] : u, function(e, t) { i.CSS.setPropertyValue(t, "display", "none") }), s.complete && s.complete.call(u, u), p && p.resolver(u || a) }
                var d = l === c - 1;
                "function" == typeof t.defaultDuration ? t.defaultDuration = t.defaultDuration.call(u, u) : t.defaultDuration = parseFloat(t.defaultDuration);
                for (var g = 0; g < t.calls.length; g++) {
                    var h = t.calls[g],
                        v = h[0],
                        m = s.duration || t.defaultDuration || 1e3,
                        y = h[1],
                        b = h[2] || {},
                        w = {};
                    if (w.duration = m * (y || 1), w.queue = s.queue || "", w.easing = b.easing || "ease", w.delay = parseFloat(b.delay) || 0, w._cacheValues = b._cacheValues || !0, 0 === g) {
                        if (w.delay += parseFloat(s.delay) || 0, 0 === l && (w.begin = function() {
                                s.begin && s.begin.call(u, u);
                                var t = e.match(/(In|Out)$/);
                                t && "In" === t[0] && v.opacity !== n && o.each(u.nodeType ? [u] : u, function(e, t) { i.CSS.setPropertyValue(t, "opacity", 0) }), s.animateParentHeight && t && r(u, t[0], m + w.delay, s.stagger)
                            }), null !== s.display)
                            if (s.display !== n && "none" !== s.display) w.display = s.display;
                            else if (/In$/.test(e)) {
                            var x = i.CSS.Values.getDisplayType(a);
                            w.display = "inline" === x ? "inline-block" : x
                        }
                        s.visibility && "hidden" !== s.visibility && (w.visibility = s.visibility)
                    }
                    g === t.calls.length - 1 && (w.complete = function() {
                        if (t.reset) {
                            for (var e in t.reset) {
                                var r = t.reset[e];
                                i.CSS.Hooks.registered[e] !== n || "string" != typeof r && "number" != typeof r || (t.reset[e] = [t.reset[e], t.reset[e]])
                            }
                            var o = { duration: 0, queue: !1 };
                            d && (o.complete = f), i.animate(a, t.reset, o)
                        } else d && f()
                    }, "hidden" === s.visibility && (w.visibility = s.visibility)), i.animate(a, v, w)
                }
            }, i
        }, i.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [
                    [{ translateY: -30 }, .25],
                    [{ translateY: 0 }, .125],
                    [{ translateY: -15 }, .125],
                    [{ translateY: 0 }, .25]
                ]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [
                    [{ translateX: -11 }, .125],
                    [{ translateX: 11 }, .125],
                    [{ translateX: -11 }, .125],
                    [{ translateX: 11 }, .125],
                    [{ translateX: -11 }, .125],
                    [{ translateX: 11 }, .125],
                    [{ translateX: -11 }, .125],
                    [{ translateX: 0 }, .125]
                ]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [
                    [{ opacity: [0, "easeInOutQuad", 1] }, .25],
                    [{ opacity: [1, "easeInOutQuad"] }, .25],
                    [{ opacity: [0, "easeInOutQuad"] }, .25],
                    [{ opacity: [1, "easeInOutQuad"] }, .25]
                ]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [
                    [{ scaleX: 1.1, scaleY: 1.1 }, .5, { easing: "easeInExpo" }],
                    [{ scaleX: 1, scaleY: 1 }, .5]
                ]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [
                    [{ rotateZ: 15 }, .2],
                    [{ rotateZ: -10 }, .2],
                    [{ rotateZ: 5 }, .2],
                    [{ rotateZ: -5 }, .2],
                    [{ rotateZ: 0 }, .2]
                ]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [
                    [{ scaleX: .9, scaleY: .9, rotateZ: -3 }, .1],
                    [{ scaleX: 1.1, scaleY: 1.1, rotateZ: 3 }, .1],
                    [{ scaleX: 1.1, scaleY: 1.1, rotateZ: -3 }, .1],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    [{ scaleX: 1, scaleY: 1, rotateZ: 0 }, .2]
                ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [
                    [{ opacity: [1, 0] }]
                ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [
                    [{ opacity: [0, 1] }]
                ]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [800, 800], rotateY: [0, -55] }]
                ],
                reset: { transformPerspective: 0 }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [800, 800], rotateY: 55 }]
                ],
                reset: { transformPerspective: 0, rotateY: 0 }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [800, 800], rotateX: [0, -45] }]
                ],
                reset: { transformPerspective: 0 }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [800, 800], rotateX: 25 }]
                ],
                reset: { transformPerspective: 0, rotateX: 0 }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [
                    [{ opacity: [.725, 0], transformPerspective: [400, 400], rotateY: [-10, 90] }, .5],
                    [{ opacity: .8, rotateY: 10 }, .25],
                    [{ opacity: 1, rotateY: 0 }, .25]
                ],
                reset: { transformPerspective: 0 }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [.9, 1], transformPerspective: [400, 400], rotateY: -10 }, .5],
                    [{ opacity: 0, rotateY: 90 }, .5]
                ],
                reset: { transformPerspective: 0, rotateY: 0 }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [.725, 0], transformPerspective: [400, 400], rotateX: [-10, 90] }, .5],
                    [{ opacity: .8, rotateX: 10 }, .25],
                    [{ opacity: 1, rotateX: 0 }, .25]
                ],
                reset: { transformPerspective: 0 }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [.9, 1], transformPerspective: [400, 400], rotateX: -15 }, .5],
                    [{ opacity: 0, rotateX: 90 }, .5]
                ],
                reset: { transformPerspective: 0, rotateX: 0 }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [1, 0], transformOriginX: ["100%", "50%"], transformOriginY: ["100%", "100%"], scaleX: [1, 0], scaleY: [1, 0], translateX: [0, -700], translateZ: 0 }]
                ],
                reset: { transformOriginX: "50%", transformOriginY: "50%" }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [0, 1], transformOriginX: ["50%", "100%"], transformOriginY: ["100%", "100%"], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0 }]
                ],
                reset: { transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0 }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 0], scaleY: [1, 0], rotateY: [0, 160] }, 1, { easing: "easeInOutSine" }]
                ]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [0, "easeInOutQuint", 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 0, scaleY: 0, rotateY: 160 }, 1, { easing: "swing" }]
                ],
                reset: { scaleX: 1, scaleY: 1, rotateY: 0 }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 1.5], scaleY: [1, 1.5], translateZ: 0 }]
                ]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [
                    [{ opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 1.3, scaleY: 1.3, translateZ: 0 }]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [
                    [{ opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, .625], scaleY: [1, .625], translateZ: 0 }]
                ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [
                    [{ opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: .5, scaleY: .5, translateZ: 0 }]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], scaleX: [1.05, .3], scaleY: [1.05, .3] }, .4],
                    [{ scaleX: .9, scaleY: .9, translateZ: 0 }, .2],
                    [{ scaleX: 1, scaleY: 1 }, .5]
                ]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [
                    [{ scaleX: .95, scaleY: .95 }, .35],
                    [{ scaleX: 1.1, scaleY: 1.1, translateZ: 0 }, .35],
                    [{ opacity: [0, 1], scaleX: .3, scaleY: .3 }, .3]
                ],
                reset: { scaleX: 1, scaleY: 1 }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], translateY: [-30, 1e3] }, .6, { easing: "easeOutCirc" }],
                    [{ translateY: 10 }, .2],
                    [{ translateY: 0 }, .2]
                ]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [
                    [{ translateY: 20 }, .2],
                    [{ opacity: [0, "easeInCirc", 1], translateY: -1e3 }, .8]
                ],
                reset: { translateY: 0 }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], translateY: [30, -1e3] }, .6, { easing: "easeOutCirc" }],
                    [{ translateY: -10 }, .2],
                    [{ translateY: 0 }, .2]
                ]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [
                    [{ translateY: -20 }, .2],
                    [{ opacity: [0, "easeInCirc", 1], translateY: 1e3 }, .8]
                ],
                reset: { translateY: 0 }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [1, 0], translateX: [30, -1250] }, .6, { easing: "easeOutCirc" }],
                    [{ translateX: -10 }, .2],
                    [{ translateX: 0 }, .2]
                ]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [
                    [{ translateX: 30 }, .2],
                    [{ opacity: [0, "easeInCirc", 1], translateX: -1250 }, .8]
                ],
                reset: { translateX: 0 }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [1, 0], translateX: [-30, 1250] }, .6, { easing: "easeOutCirc" }],
                    [{ translateX: 10 }, .2],
                    [{ translateX: 0 }, .2]
                ]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [
                    [{ translateX: -30 }, .2],
                    [{ opacity: [0, "easeInCirc", 1], translateX: 1250 }, .8]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [
                    [{ opacity: [1, 0], translateY: [0, 20], translateZ: 0 }]
                ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [
                    [{ opacity: [0, 1], translateY: -20, translateZ: 0 }]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [
                    [{ opacity: [1, 0], translateY: [0, -20], translateZ: 0 }]
                ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [
                    [{ opacity: [0, 1], translateY: 20, translateZ: 0 }]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [
                    [{ opacity: [1, 0], translateX: [0, -20], translateZ: 0 }]
                ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [
                    [{ opacity: [0, 1], translateX: -20, translateZ: 0 }]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [
                    [{ opacity: [1, 0], translateX: [0, 20], translateZ: 0 }]
                ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [
                    [{ opacity: [0, 1], translateX: 20, translateZ: 0 }]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [1, 0], translateY: [0, 75], translateZ: 0 }]
                ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [0, 1], translateY: -75, translateZ: 0 }]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [1, 0], translateY: [0, -75], translateZ: 0 }]
                ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [0, 1], translateY: 75, translateZ: 0 }]
                ],
                reset: { translateY: 0 }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], translateX: [0, -75], translateZ: 0 }]
                ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [0, 1], translateX: -75, translateZ: 0 }]
                ],
                reset: { translateX: 0 }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], translateX: [0, 75], translateZ: 0 }]
                ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [
                    [{ opacity: [0, 1], translateX: 75, translateZ: 0 }]
                ],
                reset: { translateX: 0 }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: [0, -180] }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: -180 }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: [0, 180] }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: 180 }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0 }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [2e3, 2e3], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: [0, -180] }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [2e3, 2e3], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: -180 }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [
                    [{ opacity: [1, 0], transformPerspective: [2e3, 2e3], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: [0, 180] }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%" }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [
                    [{ opacity: [0, 1], transformPerspective: [2e3, 2e3], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: 180 }]
                ],
                reset: { transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0 }
            }
        };
        for (var u in i.RegisterEffect.packagedEffects) i.RegisterEffect(u, i.RegisterEffect.packagedEffects[u]);
        i.RunSequence = function(e) {
            var t = o.extend(!0, [], e);
            t.length > 1 && (o.each(t.reverse(), function(e, r) {
                var n = t[e + 1];
                if (n) {
                    var a = r.o || r.options,
                        s = n.o || n.options,
                        l = a && a.sequenceQueue === !1 ? "begin" : "complete",
                        c = s && s[l],
                        u = {};
                    u[l] = function() {
                        var e = n.e || n.elements,
                            t = e.nodeType ? [e] : e;
                        c && c.call(t, t), i(r)
                    }, n.o ? n.o = o.extend({}, s, u) : n.options = o.extend({}, s, u)
                }
            }), t.reverse()), i(t[0])
        }
    }(window.jQuery || window.Zepto || window, window, document)
});

/*!
 * SmoothScroll for websites v1.4.0 (Balazs Galambosi)
 * http: *www.smoothscroll.net/
 *
 * Licensed under the terms of the MIT license.
 *
 * You may use it in your theme if you credit me. 
 * It is also free to use on any individual website.
 *
 * Exception:
 * The only restriction is to not publish any  
 * extension for browsers or native application
 * without getting a written permission first.
 * --------------------------------------------------
 */

! function() {
    function t() { P.keyboardSupport && p("keydown", s) }

    function e() {
        if (!H && document.body) {
            H = !0;
            var e = document.body,
                o = document.documentElement,
                i = window.innerHeight,
                n = e.scrollHeight;
            if (D = document.compatMode.indexOf("CSS") >= 0 ? o : e, O = e, t(), top != self) A = !0;
            else if (n > i && (e.offsetHeight <= i || o.offsetHeight <= i)) {
                var s = document.createElement("div");
                s.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + D.scrollHeight + "px", document.body.appendChild(s);
                var r;
                k = function() { r || (r = setTimeout(function() { $ || (s.style.height = "0", s.style.height = D.scrollHeight + "px", r = null) }, 500)) }, setTimeout(k, 10), p("resize", k);
                var a = { attributes: !0, childList: !0, characterData: !1 };
                if (_ = new X(k), _.observe(e, a), D.offsetHeight <= i) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            P.fixedBackground || $ || (e.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o() { _ && _.disconnect(), d(N, n), d("mousedown", r), d("keydown", s), d("resize", k), d("load", e) }

    function i(t, e, o) {
        if (g(e, o), 1 != P.accelerationMax) {
            var i = Date.now(),
                n = i - W;
            if (n < P.accelerationDelta) {
                var s = (1 + 50 / n) / 2;
                s > 1 && (s = Math.min(s, P.accelerationMax), e *= s, o *= s)
            }
            W = Date.now()
        }
        if (B.push({ x: e, y: o, lastX: 0 > e ? .99 : -.99, lastY: 0 > o ? .99 : -.99, start: Date.now() }), !C) {
            var r = t === document.body,
                a = function(i) {
                    for (var n = Date.now(), s = 0, l = 0, f = 0; f < B.length; f++) {
                        var c = B[f],
                            h = n - c.start,
                            u = h >= P.animationTime,
                            p = u ? 1 : h / P.animationTime;
                        P.pulseAlgorithm && (p = L(p));
                        var d = c.x * p - c.lastX >> 0,
                            m = c.y * p - c.lastY >> 0;
                        s += d, l += m, c.lastX += d, c.lastY += m, u && (B.splice(f, 1), f--)
                    }
                    r ? window.scrollBy(s, l) : (s && (t.scrollLeft += s), l && (t.scrollTop += l)), e || o || (B = []), B.length ? q(a, t, 1e3 / P.frameRate + 1) : C = !1
                };
            q(a, t, 0), C = !0
        }
    }

    function n(t) {
        H || e();
        var o = t.target,
            n = f(o);
        if (!n || t.defaultPrevented || t.ctrlKey) return !0;
        if (m(O, "embed") || m(o, "embed") && /\.pdf/i.test(o.src) || m(O, "object")) return !0;
        var s = -t.wheelDeltaX || t.deltaX || 0,
            r = -t.wheelDeltaY || t.deltaY || 0;
        return R && (t.wheelDeltaX && w(t.wheelDeltaX, 120) && (s = -120 * (t.wheelDeltaX / Math.abs(t.wheelDeltaX))), t.wheelDeltaY && w(t.wheelDeltaY, 120) && (r = -120 * (t.wheelDeltaY / Math.abs(t.wheelDeltaY)))), s || r || (r = -t.wheelDelta || 0), 1 === t.deltaMode && (s *= 40, r *= 40), !P.touchpadSupport && v(r) ? !0 : (Math.abs(s) > 1.2 && (s *= P.stepSize / 120), Math.abs(r) > 1.2 && (r *= P.stepSize / 120), i(n, s, r), t.preventDefault(), void a())
    }

    function s(t) {
        var e = t.target,
            o = t.ctrlKey || t.altKey || t.metaKey || t.shiftKey && t.keyCode !== F.spacebar;
        document.contains(O) || (O = document.activeElement);
        var n = /^(textarea|select|embed|object)$/i,
            s = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (n.test(e.nodeName) || m(e, "input") && !s.test(e.type) || m(O, "video") || y(t) || e.isContentEditable || t.defaultPrevented || o) return !0;
        if ((m(e, "button") || m(e, "input") && s.test(e.type)) && t.keyCode === F.spacebar) return !0;
        var r, l = 0,
            c = 0,
            h = f(O),
            u = h.clientHeight;
        switch (h == document.body && (u = window.innerHeight), t.keyCode) {
            case F.up:
                c = -P.arrowScroll;
                break;
            case F.down:
                c = P.arrowScroll;
                break;
            case F.spacebar:
                r = t.shiftKey ? 1 : -1, c = -r * u * .9;
                break;
            case F.pageup:
                c = .9 * -u;
                break;
            case F.pagedown:
                c = .9 * u;
                break;
            case F.home:
                c = -h.scrollTop;
                break;
            case F.end:
                var p = h.scrollHeight - h.scrollTop - u;
                c = p > 0 ? p + 10 : 0;
                break;
            case F.left:
                l = -P.arrowScroll;
                break;
            case F.right:
                l = P.arrowScroll;
                break;
            default:
                return !0
        }
        i(h, l, c), t.preventDefault(), a()
    }

    function r(t) { O = t.target }

    function a() { clearTimeout(z), z = setInterval(function() { K = {} }, 1e3) }

    function l(t, e) {
        for (var o = t.length; o--;) K[V(t[o])] = e;
        return e
    }

    function f(t) {
        var e = [],
            o = document.body,
            i = D.scrollHeight;
        do {
            var n = K[V(t)];
            if (n) return l(e, n);
            if (e.push(t), i === t.scrollHeight) {
                var s = h(D) && h(o),
                    r = s || u(D);
                if (A && c(D) || !A && r) return l(e, Y())
            } else if (c(t) && u(t)) return l(e, t)
        } while (t = t.parentElement)
    }

    function c(t) {
        return t.clientHeight + 10 < t.scrollHeight
    }

    function h(t) {
        var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
        return "hidden" !== e
    }

    function u(t) {
        var e = getComputedStyle(t, "").getPropertyValue("overflow-y");
        return "scroll" === e || "auto" === e
    }

    function p(t, e) { window.addEventListener(t, e, !1) }

    function d(t, e) { window.removeEventListener(t, e, !1) }

    function m(t, e) {
        return (t.nodeName || "").toLowerCase() === e.toLowerCase()
    }

    function g(t, e) { t = t > 0 ? 1 : -1, e = e > 0 ? 1 : -1, (I.x !== t || I.y !== e) && (I.x = t, I.y = e, B = [], W = 0) }

    function v(t) {
        return t ? (M.length || (M = [t, t, t]), t = Math.abs(t), M.push(t), M.shift(), clearTimeout(E), E = setTimeout(function() { window.localStorage && (localStorage.SS_deltaBuffer = M.join(",")) }, 1e3), !b(120) && !b(100)) : void 0
    }

    function w(t, e) {
        return Math.floor(t / e) == t / e
    }

    function b(t) {
        return w(M[0], t) && w(M[1], t) && w(M[2], t)
    }

    function y(t) {
        var e = t.target,
            o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch"))
            do
                if (o = e.classList && e.classList.contains("html5-video-controls")) break;
        while (e = e.parentNode);
        return o
    }

    function S(t) {
        var e, o, i;
        return t *= P.pulseScale, 1 > t ? e = t - (1 - Math.exp(-t)) : (o = Math.exp(-1), t -= 1, i = 1 - Math.exp(-t), e = o + i * (1 - o)), e * P.pulseNormalize
    }

    function L(t) {
        return t >= 1 ? 1 : 0 >= t ? 0 : (1 == P.pulseNormalize && (P.pulseNormalize /= S(1)), S(t))
    }

    function T(t) {
        for (var e in t) x.hasOwnProperty(e) && (P[e] = t[e])
    }
    var O, _, k, z, E, x = { frameRate: 150, animationTime: 400, stepSize: 100, pulseAlgorithm: !0, pulseScale: 4, pulseNormalize: 1, accelerationDelta: 50, accelerationMax: 3, keyboardSupport: !0, arrowScroll: 50, touchpadSupport: !1, fixedBackground: !0, excluded: "" },
        P = x,
        $ = !1,
        A = !1,
        I = { x: 0, y: 0 },
        H = !1,
        D = document.documentElement,
        M = [],
        R = /^Mac/.test(navigator.platform),
        F = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
        B = [],
        C = !1,
        W = Date.now(),
        V = function() {
            var t = 0;
            return function(e) {
                return e.uniqueID || (e.uniqueID = t++)
            }
        }(),
        K = {};
    window.localStorage && localStorage.SS_deltaBuffer && (M = localStorage.SS_deltaBuffer.split(","));
    var N, q = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t, e, o) { window.setTimeout(t, o || 1e3 / 60) }
        }(),
        X = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        Y = function() {
            var t;
            return function() {
                if (!t) {
                    var e = document.createElement("div");
                    e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                    var o = document.body.scrollTop;
                    document.documentElement.scrollTop;
                    window.scrollBy(0, 3), t = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
                }
                return t
            }
        }(),
        j = window.navigator.userAgent,
        G = /Edge/.test(j),
        U = /chrome/i.test(j) && !G,
        Q = /safari/i.test(j) && !G,
        Z = /mobile/i.test(j),
        J = (U || Q) && !Z;
    "onwheel" in document.createElement("div") ? N = "wheel" : "onmousewheel" in document.createElement("div") && (N = "mousewheel"), N && J && (p(N, n), p("mousedown", r), p("load", e)), T.destroy = o, window.SmoothScrollOptions && T(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
        return T
    }) : "object" == typeof exports ? module.exports = T : window.SmoothScroll = T
}();
