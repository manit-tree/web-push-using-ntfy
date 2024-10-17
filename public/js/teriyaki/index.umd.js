(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.$ = factory());
})(this, function() {
  "use strict";
  let $teriyaki = (selector) => {
    if ($teriyaki.is_function(selector)) {
      if (document.readyState === "complete") {
        selector();
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          selector();
        });
      }
    } else if ($teriyaki.is_string(selector)) {
      if ($teriyaki.is_html(selector)) {
        return $($teriyaki.el(selector));
      } else {
        return new TeriyakiElement(document.querySelector(selector));
      }
    } else if ($teriyaki.is_html_element(selector)) {
      return new TeriyakiElement(selector);
    } else if ($teriyaki.is_document(selector)) {
      return new TeriyakiDocument(selector);
    } else if ($teriyaki.is_window(selector)) {
      return new TeriyakiWindow(selector);
    }
  };
  $teriyaki.all = (selector) => {
    return new TeriyakiElements(document.querySelectorAll(selector));
  };
  $teriyaki.query = (selector) => {
    return document.querySelector(selector);
  };
  $teriyaki.queryAll = (selector) => {
    return document.querySelectorAll(selector);
  };
  $teriyaki.is_function = (fnc) => {
    return typeof fnc === "function";
  };
  $teriyaki.is_string = (str) => {
    return typeof str === "string";
  };
  $teriyaki.is_html = (str) => {
    return typeof str === "string" && str.includes("<") && str.includes(">");
  };
  $teriyaki.is_html_element = (el) => {
    return HTMLElement.prototype.isPrototypeOf(el);
  };
  $teriyaki.is_teriyaki = (el) => {
    return el instanceof Teriyaki;
  };
  $teriyaki.is_document = (el) => {
    return el instanceof Document;
  };
  $teriyaki.is_window = (el) => {
    return el === window;
  };
  $teriyaki.el = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html.trim();
    if (div.childElementCount == 1) {
      return div.firstChild;
    } else if (div.childElementCount > 1) {
      return new TeriyakiElement(div.childNodes);
    }
    return null;
  };
  $teriyaki.wrap = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  };
  $teriyaki.default = (x, y) => {
    if (x === void 0 || x === null || x === "") {
      return y;
    }
    return x;
  };
  $teriyaki.extend = (x, y) => {
    if (typeof x === "object" && typeof y === "object") {
      return Object.assign(x, y);
    }
    return null;
  };
  $teriyaki.create_event = (event_name, data = {}, bubbles = true) => {
    return new CustomEvent(event_name, {
      bubbles,
      detail: data
    });
  };
  $teriyaki.broadcast_receiver = (broadcast_channel, cb = null) => {
    const ch = new BroadcastChannel(broadcast_channel);
    if (typeof cb === "function") {
      ch.onmessage = (event) => {
        cb(event.data);
      };
    }
  };
  $teriyaki.broadcast = (broadcast_channel, data) => {
    const ch = new BroadcastChannel(broadcast_channel);
    ch.postMessage(data);
  };
  $teriyaki.pushState = (state = null, url) => {
    window.history.replaceState(state, null, "");
    window.history.pushState(null, null, url);
  };
  $teriyaki.get_html = (url, cached = true) => new Promise((resolve, reject) => {
    let options = {};
    if (!cached) {
      options = { cache: "no-cache" };
    }
    fetch(url, options).then((response) => response.text()).then((text) => resolve(text)).catch((err) => reject(err));
  });
  $teriyaki.get_text = (url, cached = true) => new Promise((resolve, reject) => {
    let options = {};
    if (!cached) {
      options = { cache: "no-cache" };
    }
    fetch(url, options).then((response) => response.text()).then((text) => resolve(text)).catch((err) => reject(err));
  });
  $teriyaki.get_json = (url, cached = true) => new Promise((resolve, reject) => {
    let options = {};
    if (!cached) {
      options = { cache: "no-cache" };
    }
    fetch(url, options).then((response) => response.json()).then((json) => resolve(json)).catch((err) => reject(err));
  });
  $teriyaki.post = (url, data = null, headers = null) => new Promise((resolve, reject) => {
    let options = {
      method: "POST"
    };
    if (data) {
      options.body = data;
    }
    if (headers) {
      options.headers = headers;
    }
    fetch(url, options).then((response) => response.json()).then((json) => resolve(json)).catch((err) => reject(err));
  });
  $teriyaki.post_json = (url, data, headers = {}) => new Promise((resolve, reject) => {
    let _headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };
    Object.keys(headers).forEach((key) => {
      _headers[key] = headers[key];
    });
    const fetch_data = {
      method: "POST",
      headers: _headers,
      body: JSON.stringify(data)
    };
    fetch(url, fetch_data).then((response) => response.json()).then((json) => resolve(json)).catch((err) => reject(err));
  });
  $teriyaki.ready = (cb) => {
    if (document.readyState === "complete") {
      cb();
    } else {
      document.addEventListener("readystatechange", (evt) => {
        if (document.readyState === "complete") {
          cb();
        }
      });
    }
  };
  $teriyaki.UUID = () => {
    return window.crypto.randomUUID();
  };
  $teriyaki.log = (obj) => {
    console.log(obj);
  };
  $teriyaki.random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  $teriyaki.base64_encode = (str) => {
    return btoa(str);
  };
  $teriyaki.base64_decode = (str) => {
    return atob(str);
  };
  $teriyaki.md5 = (d) => {
    var r = M(V(Y(X(d), 8 * d.length)));
    return r.toLowerCase();
  };
  function M(d) {
    for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
    return f;
  }
  function X(d) {
    for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
    for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
    return _;
  }
  function V(d) {
    for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
    return _;
  }
  function Y(d, _) {
    d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
      var h = m, t = f, g = r, e = i;
      f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
    }
    return Array(m, f, r, i);
  }
  function md5_cmn(d, _, m, f, r, i) {
    return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
  }
  function md5_ff(d, _, m, f, r, i, n) {
    return md5_cmn(_ & m | ~_ & f, d, _, r, i, n);
  }
  function md5_gg(d, _, m, f, r, i, n) {
    return md5_cmn(_ & f | m & ~f, d, _, r, i, n);
  }
  function md5_hh(d, _, m, f, r, i, n) {
    return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
  }
  function md5_ii(d, _, m, f, r, i, n) {
    return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
  }
  function safe_add(d, _) {
    var m = (65535 & d) + (65535 & _);
    return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m;
  }
  function bit_rol(d, _) {
    return d << _ | d >>> 32 - _;
  }
  $teriyaki.sha256 = (text) => {
    return new Promise(async (resolve) => {
      const utf8_text = new TextEncoder("utf-8").encode(text);
      const hash = await crypto.subtle.digest("SHA-256", utf8_text);
      const uint_array = new Uint32Array(hash);
      const hex_array = Object.entries(uint_array).map((item) => {
        return item[1].toString(16);
      });
      resolve(hex_array.join(""));
    });
  };
  $teriyaki.import_script = async (url, module2 = { exports: {} }) => (Function("module", "exports", await (await fetch(url)).text()).call(module2, module2, module2.exports), module2);
  class Teriyaki {
    constructor(el) {
      this.el = el;
    }
    trigger(event) {
      this.el.dispatchEvent(event);
      return this;
    }
    on(event_name, event_handler) {
      if ($teriyaki.is_function(event_handler)) {
        if (this.el) {
          this.el.addEventListener(event_name, event_handler);
        }
      }
      return this;
    }
    one(event_name, event_handler) {
      if ($teriyaki.is_function(event_handler)) {
        if (this.el) {
          this.el.addEventListener(event_name, event_handler, { once: true });
        }
      }
      return this;
    }
    off(event_name, event_handler) {
      if ($teriyaki.is_function(event_handler)) {
        if (this.el) {
          this.el.removeEventListener(event_name, event_handler);
        }
      }
      return this;
    }
  }
  class TeriyakiWindow extends Teriyaki {
  }
  class TeriyakiDocument extends Teriyaki {
    ready(cb) {
      if (document.readyState !== "loading") {
        if ($teriyaki.is_function(cb)) {
          cb();
        }
      } else {
        document.addEventListener("DOMContentLoaded", () => {
          if ($teriyaki.is_function(cb)) {
            cb();
          }
        });
      }
      return this;
    }
  }
  class TeriyakiElement extends Teriyaki {
    addClass(cls) {
      this.el.classList.add(cls);
      return this;
    }
    removeClass(cls) {
      this.el.classList.remove(cls);
      return this;
    }
    text(txt) {
      if (typeof txt == "string") {
        this.el.innerText = txt;
        return this;
      } else {
        return this.el.innerText;
      }
    }
    html(txt) {
      if (typeof txt == "string") {
        this.el.innerHTML = txt;
        return this;
      } else {
        return this.el.innerHTML;
      }
    }
    html_unsafe(html) {
      let _type = typeof html;
      if (_type === "string") {
        this.el.innerHTML = html;
        Array.from(this.el.querySelectorAll("script")).forEach((oldScriptEl) => {
          const newScriptEl = document.createElement("script");
          Array.from(oldScriptEl.attributes).forEach((attr) => {
            newScriptEl.setAttribute(attr.name, attr.value);
          });
          const scriptText = document.createTextNode(oldScriptEl.innerHTML);
          newScriptEl.appendChild(scriptText);
          oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });
        return this;
      } else {
        return this.el.innerHTML;
      }
    }
    wrap(wrapper) {
      if ($teriyaki.is_teriyaki(wrapper)) {
        $teriyaki.wrap(this.el, wrapper.el);
      } else if ($teriyaki.is_html_element(wrapper)) {
        $teriyaki.wrap(this.el, wrapper);
      } else if ($teriyaki.is_html(wrapper)) {
        let el_wrapper = $teriyaki.el(wrapper);
        $teriyaki.wrap(this.el, el_wrapper);
      }
      return this;
    }
    color(val) {
      this.el.style.setProperty("color", val);
      return this;
    }
    show() {
      this.el.removeAttribute("hidden");
      return this;
    }
    hide() {
      this.el.setAttribute("hidden", "");
      return this;
    }
    attr(key, value) {
      if (key && typeof key == "string") {
        if (value && typeof value == "string") {
          this.el.setAttribute(key, value);
          return this;
        } else {
          return this.el.getAttribute(key);
        }
      }
      return null;
    }
    data(key, value) {
      if (key && typeof key == "string") {
        if (value && typeof value == "string") {
          this.el.setAttribute("data-" + key, value);
          return this;
        } else {
          return this.el.getAttribute("data-" + key);
        }
      }
      return null;
    }
    css(styles) {
      if (typeof styles == "object") {
        Object.keys(styles).forEach((key) => {
          this.el.style.setProperty(key, styles[key]);
        });
      }
      return this;
    }
    width() {
      return this.el.getBoundingClientRect().width;
    }
    height() {
      return this.el.getBoundingClientRect().height;
    }
    fadeIn(duration = 600, cb = null) {
      let keyframes = [
        { "opacity": 0 },
        { "opacity": 1 }
      ];
      let settings = {
        duration,
        iterations: 1,
        fill: "both"
      };
      let animation = this.el.animate(keyframes, settings);
      if (typeof cb === "function") {
        animation.addEventListener("finish", (evt) => {
          cb();
        });
      }
      return this;
    }
    fadeOut(duration = 600, cb = null) {
      let keyframes = [
        { "opacity": 1 },
        { "opacity": 0 }
      ];
      let settings = {
        duration,
        iterations: 1,
        fill: "both"
      };
      let animation = this.el.animate(keyframes, settings);
      if (typeof cb === "function") {
        animation.addEventListener("finish", (evt) => {
          cb();
        });
      }
      return this;
    }
  }
  class TeriyakiElements {
    constructor(nodeList) {
      this.elements = Array.from(nodeList);
    }
    addClass(cls) {
      this.elements.forEach((el) => {
        el.classList.add(cls);
      });
    }
    removeClass(cls) {
      this.elements.forEach((el) => {
        el.classList.remove(cls);
      });
    }
    text(txt) {
      if (typeof txt == "string") {
        this.elements.forEach((el) => {
          el.innerText = txt;
        });
      }
    }
    html(txt) {
      if (typeof txt == "string") {
        this.elements.forEach((el) => {
          el.innerHTML = txt;
        });
      }
    }
    html_unsafe(html) {
      let _type = typeof html;
      if (_type === "string") {
        this.elements.forEach((el) => {
          el.innerHTML = html;
          Array.from(el.querySelectorAll("script")).forEach((oldScriptEl) => {
            const newScriptEl = document.createElement("script");
            Array.from(oldScriptEl.attributes).forEach((attr) => {
              newScriptEl.setAttribute(attr.name, attr.value);
            });
            const scriptText = document.createTextNode(oldScriptEl.innerHTML);
            newScriptEl.appendChild(scriptText);
            oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
          });
        });
        return this;
      }
    }
    wrap(wrapper) {
      if ($teriyaki.is_teriyaki(wrapper)) {
        this.elements.forEach((el) => {
          $teriyaki.wrap(el, wrapper.el);
        });
      } else if ($teriyaki.is_html_element(wrapper)) {
        this.elements.forEach((el) => {
          $teriyaki.wrap(el, wrapper);
        });
      } else if ($teriyaki.is_html(wrapper)) {
        let el_wrapper = $teriyaki.el(wrapper);
        this.elements.forEach((el) => {
          $teriyaki.wrap(el, el_wrapper);
        });
      }
      return this;
    }
    color(val) {
      this.elements.forEach((el) => {
        el.style.setProperty("color", val);
      });
    }
    show() {
      this.elements.forEach((el) => {
        el.removeAttribute("hidden");
      });
    }
    hide() {
      this.elements.forEach((el) => {
        el.setAttribute("hidden", "");
      });
    }
    attr(key, value) {
      if (key && typeof key == "string") {
        if (value && typeof value == "string") {
          this.elements.forEach((el) => {
            el.setAttribute(key, value);
          });
        }
      }
    }
    data(key, value) {
      if (key && typeof key == "string") {
        if (value && typeof value == "string") {
          this.elements.forEach((el) => {
            el.setAttribute("data-" + key, value);
          });
        }
      }
      return null;
    }
    css(styles) {
      if (typeof styles == "object") {
        Object.keys(styles).forEach((key) => {
          this.elements.forEach((el) => {
            el.style.setProperty(key, styles[key]);
          });
        });
      }
    }
    fadeIn(duration = 600, cb = null) {
      let keyframes = [
        { "opacity": 0 },
        { "opacity": 1 }
      ];
      let settings = {
        duration,
        iterations: 1,
        fill: "both"
      };
      let animation_count = 0;
      this.elements.forEach((el) => {
        let animation = el.animate(keyframes, settings);
        animation_count++;
        if (typeof cb === "function") {
          animation.addEventListener("finish", (evt) => {
            animation_count = animation_count - 1;
            if (animation_count == 0) {
              cb();
            }
          });
        }
      });
      return this;
    }
    fadeOut(duration = 600, cb = null) {
      let keyframes = [
        { "opacity": 1 },
        { "opacity": 0 }
      ];
      let settings = {
        duration,
        iterations: 1,
        fill: "both"
      };
      let animation_count = 0;
      this.elements.forEach((el) => {
        let animation = el.animate(keyframes, settings);
        animation_count++;
        if (typeof cb === "function") {
          animation.addEventListener("finish", (evt) => {
            animation_count = animation_count - 1;
            if (animation_count == 0) {
              cb();
            }
          });
        }
      });
      return this;
    }
  }
  return $teriyaki;
});
