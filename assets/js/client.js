// API client for the storefront and admin. On a server it calls /api; where
// there is no server (opening the files directly, or a static preview) it
// runs the same engine (core.js) in the browser against a demo database kept
// in localStorage (products, pages and a few sample orders to try the admin on).
(function () {
  "use strict";

  var BASE = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/assets\/js\/client\.js.*$/, "") : "";
  })();
  var DB_KEY = "ravari:demo-db:v57";
  var DEMO_LOGIN = { email: "admin@ravaribd.com", password: "ravari-demo" };

  // The server stamps the current asset version on the page (cache busting); the demo uses the fixed one
  function assetV(fallback) { var m = document.querySelector('meta[name="rv-v"]'); return (m && m.content) || fallback; }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = BASE + src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("Couldn't load " + src)); };
      document.head.appendChild(s);
    });
  }

  function detect() {
    if (location.protocol === "file:") return Promise.resolve("demo");
    // ?demo forces the browser demo, but never on a page served by the store server
    if (/[?&]demo\b/.test(location.search) && !document.querySelector('meta[name="rv-v"]')) return Promise.resolve("demo");
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 3000);
    return fetch(BASE + "api/health", { signal: ctl ? ctl.signal : undefined, cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { clearTimeout(timer); return j && j.ravari ? "server" : "demo"; })
      .catch(function () { clearTimeout(timer); return "demo"; });
  }

  // ---------------------------------------------------------------------------
  // Demo engine
  // ---------------------------------------------------------------------------
  var demo = null;
  function hex(bytes) {
    var a = new Uint8Array(bytes);
    (window.crypto || window.msCrypto).getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }
  function demoHash(pw, salt) {
    var h = String(salt) + ":" + pw;
    for (var i = 0; i < 300; i++) h = RavariCore.sha256(h + salt);
    return "sha256$" + h;
  }
  function readDb() {
    try { var raw = localStorage.getItem(DB_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
    return null;
  }
  function writeDb(db) {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
    catch (e) { throw { status: 507, message: "This browser is out of storage for the demo. Delete some media or reset the demo." }; }
  }
  function startDemo() {
    var host = {
      now: Date.now, random: hex, hashPassword: demoHash,
      emit: function (event, data, db, onlyHook) {
        (db.webhooks || []).forEach(function (w) {
          if (onlyHook ? w.id !== onlyHook : !w.active || !(w.events.indexOf("*") > -1 || w.events.indexOf(event) > -1)) return;
          db.webhookLog = (db.webhookLog || []).concat({ id: "evt_" + hex(6), hookId: w.id, url: w.url, event: event, at: Date.now(), attempt: 1, ok: null, status: "Demo: not sent" }).slice(-300);
        });
      },
      saveMedia: function (name, dataUrl) { return { url: dataUrl, size: Math.round(dataUrl.length * 0.75) }; },
      describeSettings: function (s) { s.payments.sslcommerz.serverReady = false; s.demo = true; }
    };
    var engine = RavariCore.create(host);
    if (!readDb()) { var fresh = buildDemoDb(); try { sampleOrders(engine, fresh); } catch (e) {} writeDb(fresh); }
    demo = {
      call: function (method, path, body, token) {
        var db = readDb() || buildDemoDb();
        // the server sends cart reminders every minute; the demo checks on each request
        if (engine.handle({ method: "POST", path: "/api/internal/cart-reminders", internal: true, body: {}, query: {}, headers: {} }, db).body.sent) writeDb(db);
        var q = {}, parts = path.split("?");
        if (parts[1]) parts[1].split("&").forEach(function (kv) { var p = kv.split("="); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); });
        var out = engine.handle({ method: method, path: parts[0], query: q, body: body ? JSON.parse(JSON.stringify(body)) : {}, headers: token ? { authorization: "Bearer " + token } : {} }, db);
        if (out.changed && out.status < 400) writeDb(db);
        // Online payment in the demo: pretend the customer paid.
        if (method === "POST" && parts[0] === "/api/orders" && out.status === 201 && body.paymentMethod === "sslcommerz") {
          var o = db.orders.filter(function (x) { return x.number === out.body.order.number; })[0];
          engine.handle({ method: "POST", path: "/api/internal/payment", internal: true, body: { orderId: o.id, status: "paid", ref: "DEMO-" + hex(4).toUpperCase() } }, db);
          writeDb(db);
          out.body.payment = { demo: true };
        }
        return out;
      }
    };
  }

  // Sample orders for the demo admin, one in each state, so invoices, Pathao and partial returns can be tried
  function sampleOrders(engine, db) {
    var h = function (method, path, body, token, internal) { return engine.handle({ method: method, path: path, query: {}, body: body || {}, headers: token ? { authorization: "Bearer " + token } : {}, internal: !!internal }, db); };
    var token = h("POST", "/api/auth/login", DEMO_LOGIN).body.token;
    var inStock = db.products.filter(function (p) { return p.status === "published" && (p.variants || []).some(function (v) { return v.stock > 3; }); });
    var pick = function (i, n) { var p = inStock[i % inStock.length], v = p.variants.filter(function (x) { return x.stock > 3; })[n || 0] || p.variants.filter(function (x) { return x.stock > 3; })[0]; return { productId: p.id, variantId: v.id, qty: 1 }; };
    var people = [
      ["Karim Ahmed", "01711234567", "House 14, Road 7, Block C, Mirpur 10", "Dhaka", "inside-dhaka"],
      ["Nusrat Jahan", "01822345678", "Flat 5B, 23 Satmasjid Road, Dhanmondi", "Dhaka", "inside-dhaka"],
      ["Tanvir Hasan", "01933456789", "Holding 112, Agrabad Commercial Area", "Chattogram", "outside-dhaka"],
      ["Sadia Islam", "01544567890", "House 3, Lane 2, Bank Town", "Savar", "dhaka-sub"],
      ["Rakib Chowdhury", "01655678901", "Zindabazar, near Al-Hamra Shopping City", "Sylhet", "outside-dhaka"],
      ["Mahin Rahman", "01366789012", "Road 11, Banani", "Dhaka", "inside-dhaka"]
    ];
    var make = function (i, items, pay, daysAgo) {
      var c = people[i];
      var r = h("POST", "/api/orders", { items: items, customer: { name: c[0], phone: c[1], address: c[2], city: c[3] }, zone: c[4], paymentMethod: pay || "cod", agree: true, note: i === 1 ? "Please call before coming" : "" });
      var o = db.orders.filter(function (x) { return x.number === r.body.order.number; })[0];
      o.createdAt = o.history[0].at = Date.now() - daysAgo * 864e5 - i * 37e5;
      return o;
    };
    var a = make(0, [pick(0)], "cod", 0);                                   // new, waiting for a call
    var b = make(1, [pick(1), pick(2, 1)], "cod", 1);                       // confirmed
    h("PATCH", "/api/orders/" + b.number, { status: "confirmed", note: "Called, size confirmed" }, token);
    var c = make(2, [pick(3)], "cod", 1);                                   // on hold
    h("PATCH", "/api/orders/" + c.number, { status: "hold", note: "Customer will confirm the size tomorrow" }, token);
    var d = make(3, [pick(4), pick(5)], "cod", 2);                          // with Pathao, on the way
    h("POST", "/api/internal/pathao-sent", { orderId: d.id, amount: d.total, data: { consignment_id: "DT1111" + d.number.slice(2) + "RV", order_status: "Pending", delivery_fee: 60 } }, null, true);
    h("POST", "/api/internal/pathao", { event: "order.in-transit", consignment_id: d.pathao.consignmentId, updated_at: "1" }, null, true);
    var e = make(4, [pick(6), pick(7, 1)], "cod", 4);                       // partly delivered: one item came back
    h("POST", "/api/internal/pathao-sent", { orderId: e.id, amount: e.total, data: { consignment_id: "DT1111" + e.number.slice(2) + "RV", order_status: "Pending", delivery_fee: 110 } }, null, true);
    h("POST", "/api/internal/pathao", { event: "order.partial-delivery", consignment_id: e.pathao.consignmentId, collected_amount: e.items[0].lineTotal + e.shipping, updated_at: "2" }, null, true);
    h("POST", "/api/orders/" + e.id + "/partial-return", { items: [{ index: 1, qty: 1 }], collected: e.items[0].lineTotal + e.shipping, note: "Size didn't fit" }, token);
    var f = make(5, [pick(8)], "cod", 6);                                   // delivered
    h("POST", "/api/internal/pathao-sent", { orderId: f.id, amount: f.total, data: { consignment_id: "DT1111" + f.number.slice(2) + "RV", order_status: "Pending", delivery_fee: 60 } }, null, true);
    h("POST", "/api/internal/pathao", { event: "order.delivered", consignment_id: f.pathao.consignmentId, collected_amount: f.total, updated_at: "3" }, null, true);
    h("POST", "/api/auth/logout", {}, token);
    db.orders.sort(function (x, y) { return x.createdAt - y.createdAt; });
  }

  // Demo database: products, pages and settings from the seed and one owner login, plus the sample orders above.
  function buildDemoDb() {
    var db = RavariCore.freshDb(window.RAVARI_SEED);
    db.demo = true;
    var salt = hex(8);
    db.users.push({ id: "usr_demo", name: "Rafat", email: DEMO_LOGIN.email, role: "owner", salt: salt, passwordHash: demoHash(DEMO_LOGIN.password, salt), createdAt: Date.now() });
    return db;
  }

  // ---------------------------------------------------------------------------
  // Public client
  // ---------------------------------------------------------------------------
  var mode = null;
  var ready = detect().then(function (m) {
    mode = m;
    if (m === "server") return m;
    return (window.RavariCore ? Promise.resolve() : loadScript("assets/js/core.js?v=" + assetV("1172")))
      .then(function () { return window.RAVARI_SEED ? null : loadScript("assets/js/seed.js?v=" + assetV("1168")); })
      .then(function () { startDemo(); return m; });
  });

  function call(method, path, body, token) {
    return ready.then(function () {
      if (mode === "demo") {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            try {
              var out = demo.call(method, path, body, token);
              if (out.status >= 400) reject({ status: out.status, message: out.body.error, fields: out.body.fields });
              else resolve(out.body);
            } catch (e) { reject(e && e.status ? e : { status: 500, message: String(e && e.message || e) }); }
          }, 60);
        });
      }
      return fetch(BASE + path.replace(/^\//, ""), {
        method: method,
        headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}),
        body: body ? JSON.stringify(body) : undefined, cache: "no-store"
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok) throw { status: r.status, message: j.error || "Something went wrong (" + r.status + ").", fields: j.fields };
          return j;
        });
      }, function () { throw { status: 0, message: "Can't reach the store. Check your connection." }; });
    });
  }

  window.Ravari = {
    ready: ready,
    call: call,
    get mode() { return mode; },
    base: BASE,
    demoLogin: DEMO_LOGIN,
    resetDemo: function () { try { localStorage.removeItem(DB_KEY); } catch (e) {} location.reload(); }
  };
})();
