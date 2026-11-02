/* ARTEMIS Chile Lite — versión simple y limitada de ARTEMIS: 1 curso, estudiantes, asistencia y notas. Todo queda en este dispositivo.
 * Desarrollada por Javiera Navarrete. Licencia GPL-3.0-or-later. Para la versión completa, contacta a la desarrolladora. */
(function () {
  "use strict";
  var MAX_EST = 45, MAX_EVAL = 5, CONTACTO = "navarrete.noir@gmail.com", VERSION = "1.0", KEY = "artemislite.v1";
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var uid = function () { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4); };
  var hoy = function () { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); };
  var fmtN = function (n) { return n == null || isNaN(n) ? "—" : n.toFixed(1).replace(".", ","); };
  var fmtF = function (iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; };
  var IC = { home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", people: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z", check: "M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z", school: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z", cog: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z", add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", del: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z", edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z", info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z", lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z", ok: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z", save: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" };
  var svg = function (n) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + IC[n] + '"/></svg>'; };

  /* ---------- datos ---------- */
  var S = null;
  function vacio() { return { v: 1, docente: "", curso: null, est: [], asis: {}, evals: [], ajustes: { tema: "auto", pin: null } }; }
  function cargar() { try { var t = localStorage.getItem(KEY); S = t ? JSON.parse(t) : vacio(); } catch (e) { S = vacio(); } S.ajustes = S.ajustes || { tema: "auto", pin: null }; }
  function guardar() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { aviso("No se pudo guardar en este dispositivo"); } }
  function tema() { var t = S && S.ajustes.tema; if (t === "claro" || t === "oscuro") document.documentElement.setAttribute("data-tema", t); else document.documentElement.removeAttribute("data-tema"); }
  function ordenados() { return S.est.slice().sort(function (a, b) { return (a.ap + " " + a.no).localeCompare(b.ap + " " + b.no, "es"); }); }
  function prom(id) { var v = S.evals.map(function (e) { return e.notas[id]; }).filter(function (n) { return n != null && !isNaN(n); }); return v.length ? v.reduce(function (a, b) { return a + b; }, 0) / v.length : null; }
  function asistPct(id) { var d = Object.keys(S.asis), n = 0, p = 0; d.forEach(function (f) { var x = S.asis[f][id]; if (x) { n++; if (x === "P") p++; } }); return n ? Math.round(p * 100 / n) : null; }

  /* ---------- diálogo, aviso ---------- */
  var cierre = null;
  function dialogo(html, alAceptar, txtOk, sinCancelar) {
    var w = $("#dlg-wrap"), d = $("#dlg"); d.innerHTML = html + '<div class="acts">' + (sinCancelar ? "" : '<button class="btn x" data-x>Cancelar</button>') + (alAceptar ? '<button class="btn p" data-ok>' + (txtOk || "Guardar") + "</button>" : '<button class="btn x" data-x>Cerrar</button>') + "</div>";
    w.hidden = false; cierre = function () { w.hidden = true; cierre = null; };
    $$("[data-x]", d).forEach(function (b) { b.onclick = cierre; });
    var ok = $("[data-ok]", d); if (ok) ok.onclick = function () { if (alAceptar() !== false) cierre(); };
    var f = $("input,textarea,select", d); if (f && window.innerWidth > 700) f.focus();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && cierre) cierre(); });
  $("#dlg-wrap").addEventListener("mousedown", function (e) { if (e.target.id === "dlg-wrap" && cierre) cierre(); });
  var tAviso = 0; function aviso(t) { var s = $("#snack"); s.textContent = t; s.hidden = false; clearTimeout(tAviso); tAviso = setTimeout(function () { s.hidden = true; }, 3200); }
  function tf(id, et, val, o) { o = o || {}; return '<div class="tf">' + (o.area ? '<textarea id="' + id + '" placeholder=" ">' + esc(val) + "</textarea>" : '<input id="' + id + '" type="' + (o.tipo || "text") + '" value="' + esc(val) + '" ' + (o.extra || "") + ' placeholder=" ">') + '<label for="' + id + '">' + esc(et) + "</label></div>"; }
  var v = function (id) { var e = $("#" + id); return e ? e.value.trim() : ""; };

  /* ---------- navegación adaptativa ---------- */
  var VISTAS = [["inicio", "Inicio", "home"], ["estudiantes", "Estudiantes", "people"], ["asistencia", "Asistencia", "check"], ["notas", "Notas", "school"], ["ajustes", "Ajustes", "cog"]];
  var actual = "inicio", fechaAsis = hoy(), evalSel = null;
  function pintarNav() {
    var h = VISTAS.map(function (x) { return '<button data-v="' + x[0] + '"' + (x[0] === actual ? ' aria-current="page"' : "") + '><span class="ic">' + svg(x[2]) + "</span>" + x[1] + "</button>"; }).join("");
    $("#navbar").innerHTML = h; $("#rail").innerHTML = h; $$("[data-v]").forEach(function (b) { b.onclick = function () { ir(b.dataset.v); }; });
  }
  function ir(x) { actual = x; location.hash = "#/" + x; pintarNav(); $("#titulo").textContent = VISTAS.filter(function (y) { return y[0] === x; })[0][1]; ({ inicio: vInicio, estudiantes: vEst, asistencia: vAsis, notas: vNotas, ajustes: vAjustes })[x](); window.scrollTo(0, 0); }
  function render(h, fab) { $("#vista").innerHTML = h + (fab || ""); var f = $(".fab"); if (f) f.onclick = fab.fn; }

  /* ---------- Inicio ---------- */
  function vInicio() {
    var n = S.est.length, ps = S.est.map(function (e) { return prom(e.id); }).filter(function (x) { return x != null; }), pg = ps.length ? ps.reduce(function (a, b) { return a + b; }, 0) / ps.length : null;
    var as = S.est.map(function (e) { return asistPct(e.id); }).filter(function (x) { return x != null; }), pa = as.length ? Math.round(as.reduce(function (a, b) { return a + b; }, 0) / as.length) : null;
    $("#vista").innerHTML = '<div class="card filled"><h2>' + esc(S.curso.nombre) + '</h2><p class="sub">' + esc(S.curso.asignatura || "Curso") + (S.docente ? " · " + esc(S.docente) : "") + '</p><div class="stats"><div class="stat"><b>' + n + '</b><small>estudiantes</small></div><div class="stat"><b>' + (pa == null ? "—" : pa + "%") + '</b><small>asistencia</small></div><div class="stat"><b>' + fmtN(pg) + '</b><small>promedio</small></div></div></div>' +
      '<div class="card"><h2>Hoy</h2><p class="sub">' + fmtF(hoy()) + (S.asis[hoy()] ? " · asistencia registrada" : " · aún sin asistencia") + '</p><div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn p" id="i-asis">' + svg("check") + 'Tomar asistencia</button><button class="btn t" id="i-notas">' + svg("school") + 'Ver notas</button></div></div>' +
      '<div class="aviso-lite">' + svg("info") + '<div><b>Versión Lite.</b> Gestiona 1 curso (hasta ' + MAX_EST + ' estudiantes y ' + MAX_EVAL + ' evaluaciones). Para la versión completa, contacta a la desarrolladora (Ajustes).</div></div>';
    $("#i-asis").onclick = function () { fechaAsis = hoy(); ir("asistencia"); }; $("#i-notas").onclick = function () { ir("notas"); };
  }

  /* ---------- Estudiantes ---------- */
  function vEst() {
    var L = ordenados(), cab = '<p class="sub" style="margin:0 4px 12px;color:var(--on-v)">' + L.length + " de " + MAX_EST + " estudiantes</p>";
    var lista = L.length ? '<div class="lista">' + L.map(function (e) { return '<div class="item"><div class="av">' + esc((e.no[0] || "") + (e.ap[0] || "")).toUpperCase() + '</div><div class="tx"><div class="t1">' + esc(e.ap + ", " + e.no) + '</div><div class="t2">' + (prom(e.id) != null ? "Promedio " + fmtN(prom(e.id)) : "Sin notas") + (asistPct(e.id) != null ? " · asistencia " + asistPct(e.id) + "%" : "") + '</div></div><button class="ib" data-ed="' + e.id + '" aria-label="Editar">' + svg("edit") + '</button><button class="ib" data-del="' + e.id + '" aria-label="Quitar">' + svg("del") + "</button></div>"; }).join("") + "</div>" :
      '<div class="vacio">' + svg("people") + "<h2>Aún no hay estudiantes</h2><p>Agrega uno a uno o pega la lista del curso.</p></div>";
    var fab = { fn: function () { dlgEst(); } }; $("#vista").innerHTML = cab + lista + '<div style="margin:12px 0"><button class="btn o" id="e-pegar">Pegar lista del curso</button></div><button class="fab" id="e-fab">' + svg("add") + "Estudiante</button>";
    $("#e-fab").onclick = function () { dlgEst(); }; $("#e-pegar").onclick = dlgPegar; $$("[data-ed]").forEach(function (b) { b.onclick = function () { dlgEst(b.dataset.ed); }; }); $$("[data-del]").forEach(function (b) { b.onclick = function () { quitar(b.dataset.del); }; });
  }
  function dlgEst(id) {
    var e = id ? S.est.filter(function (x) { return x.id === id; })[0] : null;
    if (!e && S.est.length >= MAX_EST) { dialogo("<h2>Límite de la versión Lite</h2><p>La versión Lite admite hasta " + MAX_EST + " estudiantes. Para más, contacta a la desarrolladora (Ajustes).</p>", null); return; }
    dialogo("<h2>" + (e ? "Editar estudiante" : "Nuevo estudiante") + "</h2>" + tf("n-ap", "Apellidos", e ? e.ap : "") + tf("n-no", "Nombres", e ? e.no : "") + '<div class="err" id="n-err"></div>', function () {
      var ap = v("n-ap"), no = v("n-no"); if (!ap || !no) { $("#n-err").textContent = "Escribe apellidos y nombres."; return false; }
      if (e) { e.ap = ap; e.no = no; } else S.est.push({ id: uid(), ap: ap, no: no }); guardar(); vEst(); aviso(e ? "Estudiante actualizado" : "Estudiante agregado");
    });
  }
  function dlgPegar() {
    dialogo("<h2>Pegar lista del curso</h2><p>Un estudiante por línea: <b>Apellidos, Nombres</b> (o «Nombres Apellidos»). Se agregan hasta completar " + MAX_EST + ".</p>" + tf("p-t", "Lista", "", { area: 1 }) + '<div class="err" id="p-err"></div>', function () {
      var ls = $("#p-t").value.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean), n = 0;
      ls.forEach(function (l) { if (S.est.length >= MAX_EST) return; l = l.replace(/^\d+[.)\s-]+/, ""); var ap, no, c = l.indexOf(","); if (c > 0) { ap = l.slice(0, c).trim(); no = l.slice(c + 1).trim(); } else { var w = l.split(/\s+/); if (w.length < 2) return; ap = w.slice(w.length > 2 ? -2 : -1).join(" "); no = w.slice(0, w.length > 2 ? -2 : -1).join(" "); } if (ap && no) { S.est.push({ id: uid(), ap: ap, no: no }); n++; } });
      if (!n) { $("#p-err").textContent = "No se reconoció ningún estudiante."; return false; } guardar(); vEst(); aviso(n + " estudiante(s) agregado(s)" + (S.est.length >= MAX_EST ? " · límite Lite alcanzado" : ""));
    }, "Agregar");
  }
  function quitar(id) { var e = S.est.filter(function (x) { return x.id === id; })[0]; dialogo("<h2>¿Quitar estudiante?</h2><p>Se eliminarán también sus notas y su asistencia: <b>" + esc(e.ap + ", " + e.no) + "</b>.</p>", function () { S.est = S.est.filter(function (x) { return x.id !== id; }); S.evals.forEach(function (ev) { delete ev.notas[id]; }); Object.keys(S.asis).forEach(function (f) { delete S.asis[f][id]; }); guardar(); vEst(); aviso("Estudiante quitado"); }, "Quitar"); }

  /* ---------- Asistencia ---------- */
  function vAsis() {
    var reg = S.asis[fechaAsis] || {}, L = ordenados(), pr = L.filter(function (e) { return reg[e.id] === "P"; }).length, au = L.filter(function (e) { return reg[e.id] === "A"; }).length;
    var h = '<div class="card"><div class="tf" style="margin-top:6px"><input id="a-f" type="date" value="' + fechaAsis + '" max="' + hoy() + '"><label for="a-f">Fecha</label></div><p class="sub" style="margin:12px 0 0;color:var(--on-v)">Presentes <b>' + pr + "</b> · Ausentes <b>" + au + "</b> · Sin marcar <b>" + (L.length - pr - au) + '</b></p><div style="margin-top:8px"><button class="btn t" id="a-todos">' + svg("ok") + "Todos presentes</button></div></div>";
    h += L.length ? '<div class="lista">' + L.map(function (e) { var x = reg[e.id]; return '<div class="item"><div class="av">' + esc((e.no[0] || "") + (e.ap[0] || "")).toUpperCase() + '</div><div class="tx"><div class="t1">' + esc(e.ap + ", " + e.no) + '</div></div><div class="seg" role="group" aria-label="Asistencia de ' + esc(e.no) + '"><button data-e="' + e.id + '" data-r="P" aria-pressed="' + (x === "P") + '">Presente</button><button data-e="' + e.id + '" data-r="A" aria-pressed="' + (x === "A") + '">Ausente</button></div></div>'; }).join("") + "</div>" : '<div class="vacio">' + svg("people") + "<h2>Sin estudiantes</h2><p>Agrega estudiantes para tomar asistencia.</p></div>";
    $("#vista").innerHTML = h; $("#a-f").onchange = function () { fechaAsis = this.value || hoy(); vAsis(); };
    $("#a-todos").onclick = function () { var r = (S.asis[fechaAsis] = {}); L.forEach(function (e) { r[e.id] = "P"; }); guardar(); vAsis(); };
    $$("[data-r]").forEach(function (b) { b.onclick = function () { var r = (S.asis[fechaAsis] = S.asis[fechaAsis] || {}); r[b.dataset.e] = r[b.dataset.e] === b.dataset.r ? undefined : b.dataset.r; if (!r[b.dataset.e]) delete r[b.dataset.e]; guardar(); vAsis(); }; });
  }

  /* ---------- Notas ---------- */
  function vNotas() {
    if (!S.evals.length) { $("#vista").innerHTML = '<div class="vacio">' + svg("school") + "<h2>Aún no hay evaluaciones</h2><p>Crea la primera para registrar notas (hasta " + MAX_EVAL + " en la versión Lite).</p><button class=\"btn p\" id=\"nt-nueva\">" + svg("add") + "Nueva evaluación</button></div>"; $("#nt-nueva").onclick = dlgEval; return; }
    if (!evalSel || !S.evals.some(function (e) { return e.id === evalSel; })) evalSel = S.evals[0].id;
    var ev = S.evals.filter(function (e) { return e.id === evalSel; })[0], L = ordenados();
    var chips = '<div class="chips">' + S.evals.map(function (e) { return '<button class="chip" data-ev="' + e.id + '" aria-pressed="' + (e.id === evalSel) + '">' + esc(e.nombre) + "</button>"; }).join("") + (S.evals.length < MAX_EVAL ? '<button class="chip" id="nt-mas">' + svg("add") + "Evaluación</button>" : "") + "</div>";
    var cab = '<div class="card outlined" style="display:flex;align-items:center;gap:8px"><div style="flex:1"><b>' + esc(ev.nombre) + '</b><div class="sub" style="color:var(--on-v)">' + fmtF(ev.fecha) + '</div></div><button class="ib" id="nt-ed" aria-label="Editar evaluación">' + svg("edit") + '</button><button class="ib" id="nt-del" aria-label="Eliminar evaluación">' + svg("del") + "</button></div>";
    var lista = L.length ? '<div class="lista">' + L.map(function (e) { var n = ev.notas[e.id], p = prom(e.id); return '<div class="item"><div class="tx"><div class="t1">' + esc(e.ap + ", " + e.no) + '</div><div class="t2">Promedio ' + fmtN(p) + (p != null ? ' · <span class="tag ' + (p >= 4 ? "ok" : "bad") + '">' + (p >= 4 ? "aprobado" : "reprobado") + "</span>" : "") + '</div></div><input class="nota-in" inputmode="decimal" data-n="' + e.id + '" value="' + (n == null ? "" : fmtN(n)) + '" placeholder="1,0–7,0" aria-label="Nota de ' + esc(e.no) + '"></div>'; }).join("") + "</div>" : '<div class="vacio">' + svg("people") + "<h2>Sin estudiantes</h2></div>";
    $("#vista").innerHTML = chips + cab + lista;
    $$("[data-ev]").forEach(function (b) { b.onclick = function () { evalSel = b.dataset.ev; vNotas(); }; }); var m = $("#nt-mas"); if (m) m.onclick = dlgEval;
    $("#nt-ed").onclick = function () { dlgEval(ev.id); }; $("#nt-del").onclick = function () { dialogo("<h2>¿Eliminar evaluación?</h2><p>Se borrarán todas sus notas: <b>" + esc(ev.nombre) + "</b>.</p>", function () { S.evals = S.evals.filter(function (x) { return x.id !== ev.id; }); evalSel = null; guardar(); vNotas(); aviso("Evaluación eliminada"); }, "Eliminar"); };
    $$(".nota-in").forEach(function (i) { i.onchange = function () { var t = i.value.replace(",", ".").trim(); if (t === "") { delete ev.notas[i.dataset.n]; } else { var x = parseFloat(t); if (isNaN(x) || x < 1 || x > 7) { aviso("La nota debe estar entre 1,0 y 7,0"); vNotas(); return; } ev.notas[i.dataset.n] = Math.round(x * 10) / 10; } guardar(); vNotas(); }; });
  }
  function dlgEval(id) {
    var e = typeof id === "string" ? S.evals.filter(function (x) { return x.id === id; })[0] : null;
    if (!e && S.evals.length >= MAX_EVAL) { dialogo("<h2>Límite de la versión Lite</h2><p>La versión Lite admite hasta " + MAX_EVAL + " evaluaciones. Para más, contacta a la desarrolladora (Ajustes).</p>", null); return; }
    dialogo("<h2>" + (e ? "Editar evaluación" : "Nueva evaluación") + "</h2>" + tf("ev-n", "Nombre", e ? e.nombre : "", { extra: 'maxlength="40"' }) + tf("ev-f", "Fecha", e ? e.fecha : hoy(), { tipo: "date" }) + '<div class="err" id="ev-err"></div>', function () {
      var n = v("ev-n"), f = v("ev-f") || hoy(); if (!n) { $("#ev-err").textContent = "Escribe un nombre."; return false; }
      if (e) { e.nombre = n; e.fecha = f; } else { var x = { id: uid(), nombre: n, fecha: f, notas: {} }; S.evals.push(x); evalSel = x.id; } guardar(); vNotas();
    });
  }

  /* ---------- Ajustes ---------- */
  function vAjustes() {
    var t = S.ajustes.tema;
    $("#vista").innerHTML = '<p class="sec">Curso</p><div class="card"><div class="item" style="border:0;padding-left:0"><div class="tx"><div class="t1">' + esc(S.curso.nombre) + '</div><div class="t2">' + esc(S.curso.asignatura || "Sin asignatura") + (S.docente ? " · " + esc(S.docente) : "") + '</div></div><button class="btn t" id="aj-curso">Editar</button></div></div>' +
      '<p class="sec">Apariencia</p><div class="card"><div class="seg" id="aj-tema"><button data-t="auto" aria-pressed="' + (t === "auto") + '">Sistema</button><button data-t="claro" aria-pressed="' + (t === "claro") + '">Claro</button><button data-t="oscuro" aria-pressed="' + (t === "oscuro") + '">Oscuro</button></div></div>' +
      '<p class="sec">Privacidad y respaldo</p><div class="card"><p class="sub" style="margin-bottom:12px;color:var(--on-v)">Todo se guarda solo en este dispositivo. ' + (S.ajustes.pin ? "El acceso está protegido con PIN." : "Puedes proteger el acceso con un PIN.") + '</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn t" id="aj-pin">' + svg("lock") + (S.ajustes.pin ? "Cambiar o quitar PIN" : "Crear PIN") + '</button><button class="btn t" id="aj-resp">' + svg("save") + 'Respaldo</button><button class="btn o" id="aj-borrar" style="color:var(--err)">Borrar todo</button></div></div>' +
      '<p class="sec">Versión completa</p><div class="card filled"><h2>¿Necesitas más?</h2><p class="sub">ARTEMIS Chile Lite gestiona 1 curso con funciones básicas. <b>Para una versión completa, debes contactarte con la desarrolladora</b> (Javiera Navarrete).</p><div style="margin-top:12px"><a class="btn p" href="mailto:' + CONTACTO + '?subject=ARTEMIS%20Chile%20-%20versi%C3%B3n%20completa" style="text-decoration:none">' + svg("mail") + 'Escribir a la desarrolladora</a></div><p class="sub" style="margin-top:8px">' + CONTACTO + '</p></div>' +
      '<p class="sec">Acerca de</p><div class="card"><p class="sub" style="color:var(--on-v)">ARTEMIS Chile Lite ' + VERSION + ' · Desarrollada por Javiera Navarrete · Licencia GPL-3.0-or-later · Funciona sin internet y no recopila datos.</p></div>';
    $$("#aj-tema [data-t]").forEach(function (b) { b.onclick = function () { S.ajustes.tema = b.dataset.t; guardar(); tema(); vAjustes(); }; });
    $("#aj-curso").onclick = function () { dlgCurso(true); }; $("#aj-pin").onclick = dlgPin; $("#aj-resp").onclick = dlgResp; $("#aj-borrar").onclick = function () { dialogo("<h2>¿Borrar todo?</h2><p>Se eliminarán el curso, los estudiantes, la asistencia y las notas de este dispositivo. No se puede deshacer.</p>" + tf("b-c", "Escribe BORRAR para confirmar", ""), function () { if (v("b-c") !== "BORRAR") return false; try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); }, "Borrar todo"); };
  }
  function dlgCurso(edicion) {
    var c = S.curso || { nombre: "", asignatura: "" };
    dialogo("<h2>" + (edicion ? "Editar curso" : "Tu curso") + "</h2>" + (edicion ? "" : "<p>La versión Lite gestiona <b>un solo curso</b>. Podrás cambiar estos datos después.</p>") + tf("c-d", "Tu nombre (opcional)", S.docente) + tf("c-n", "Curso (ej.: 5° Básico A)", c.nombre) + tf("c-a", "Asignatura (opcional)", c.asignatura || "") + '<div class="err" id="c-err"></div>', function () {
      var n = v("c-n"); if (!n) { $("#c-err").textContent = "Escribe el nombre del curso."; return false; } S.docente = v("c-d"); S.curso = { nombre: n, asignatura: v("c-a") }; guardar(); if (edicion) vAjustes(); else iniciarApp();
    }, edicion ? "Guardar" : "Empezar", !edicion);
  }
  function dlgResp() {
    var json = JSON.stringify(S);
    dialogo("<h2>Respaldo</h2><p>Copia este texto y guárdalo donde quieras. Para restaurar, pégalo aquí y pulsa «Restaurar».</p>" + tf("r-t", "Datos del curso (JSON)", json, { area: 1 }) + '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button class="btn t" id="r-copiar">Copiar</button><button class="btn t" id="r-bajar">Descargar archivo</button></div><div class="err" id="r-err"></div>', function () {
      try { var o = JSON.parse($("#r-t").value); if (!o || o.v !== 1 || !o.curso || !Array.isArray(o.est)) throw 1; if (o.est.length > MAX_EST || (o.evals || []).length > MAX_EVAL) { $("#r-err").textContent = "El respaldo supera los límites de la versión Lite."; return false; } var pin = S.ajustes.pin; S = o; S.ajustes = S.ajustes || {}; S.ajustes.pin = pin; S.evals = S.evals || []; S.asis = S.asis || {}; guardar(); tema(); iniciarApp(); aviso("Respaldo restaurado"); } catch (e) { $("#r-err").textContent = "El texto no es un respaldo válido."; return false; }
    }, "Restaurar");
    $("#r-copiar").onclick = function () { var t = $("#r-t"); t.select(); try { navigator.clipboard.writeText(t.value).then(function () { aviso("Copiado"); }, function () { document.execCommand("copy"); aviso("Copiado"); }); } catch (e) { document.execCommand("copy"); aviso("Copiado"); } };
    $("#r-bajar").onclick = function () { var n = "artemis-lite-respaldo-" + hoy() + ".json"; if (window.ArtemisLiteAndroid && window.ArtemisLiteAndroid.guardarArchivo) { window.ArtemisLiteAndroid.guardarArchivo(n, $("#r-t").value); return; } var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([$("#r-t").value], { type: "application/json" })); a.download = n; document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); }, 800); aviso("Descargando el respaldo…"); };
  }

  /* ---------- PIN (bloqueo de acceso; los datos no se cifran) ---------- */
  function b64(u) { var s = ""; for (var i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s); }
  function unb64(t) { var s = atob(t), u = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
  async function hashPin(pin, sal) { var k = await crypto.subtle.importKey("raw", new TextEncoder().encode(pin), "PBKDF2", false, ["deriveBits"]); return b64(new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: sal, iterations: 150000, hash: "SHA-256" }, k, 256))); }
  function dlgPin() {
    var tiene = !!S.ajustes.pin;
    dialogo("<h2>" + (tiene ? "Cambiar o quitar el PIN" : "Crear un PIN") + "</h2><p>De 4 a 8 dígitos. Se pedirá al abrir la app. Si lo olvidas, deberás restaurar un respaldo o borrar los datos.</p>" + tf("pin-1", "PIN nuevo (vacío = quitar)", "", { tipo: "password", extra: 'inputmode="numeric" maxlength="8" autocomplete="off"' }) + '<div class="err" id="pin-err"></div>', function () {
      var p = v("pin-1"); if (p === "") { if (!tiene) return true; S.ajustes.pin = null; guardar(); vAjustes(); aviso("PIN eliminado"); return true; }
      if (!/^\d{4,8}$/.test(p)) { $("#pin-err").textContent = "El PIN debe tener de 4 a 8 dígitos."; return false; }
      var sal = crypto.getRandomValues(new Uint8Array(16)); hashPin(p, sal).then(function (h) { S.ajustes.pin = { s: b64(sal), h: h }; guardar(); vAjustes(); aviso("PIN guardado"); });
    });
  }
  function bloquear() {
    var l = $("#lock"); $("#app").hidden = true; l.hidden = false;
    l.innerHTML = '<div class="box"><img src="img/icono-192.png" alt=""><h1>ARTEMIS Chile Lite</h1><p>Escribe tu PIN para entrar.</p>' + tf("lk", "PIN", "", { tipo: "password", extra: 'inputmode="numeric" maxlength="8" autocomplete="off"' }) + '<div class="err" id="lk-err" style="text-align:left"></div><button class="btn p" id="lk-ok" style="width:100%;margin-top:16px">Entrar</button></div>';
    var f = $("#lk"); f.focus(); var go = async function () { var h = await hashPin(f.value, unb64(S.ajustes.pin.s)); if (h === S.ajustes.pin.h) { l.hidden = true; $("#app").hidden = false; iniciarApp(); } else { $("#lk-err").textContent = "PIN incorrecto."; f.value = ""; } };
    $("#lk-ok").onclick = go; f.onkeydown = function (e) { if (e.key === "Enter") go(); };
  }

  function iniciarApp() { $("#app").hidden = false; if (!S.curso) { dlgCurso(false); return; } var h = (location.hash.match(/^#\/(\w+)/) || [])[1]; ir(VISTAS.some(function (x) { return x[0] === h; }) ? h : "inicio"); }
  cargar(); tema(); pintarNav();
  window.addEventListener("hashchange", function () { var h = (location.hash.match(/^#\/(\w+)/) || [])[1]; if (S && S.curso && h && h !== actual && VISTAS.some(function (x) { return x[0] === h; })) ir(h); });
  if (S.ajustes.pin && window.crypto && crypto.subtle) bloquear(); else iniciarApp();
})();
