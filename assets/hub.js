/*
  Business Hub engine (Think Right). Reusable across hubs: reads everything from window.HUB (data/content.js).
  No server and no login. The hub holds how the business works, never customer records or anyone's progress:
  battlecard ticks and notes, journey steps and the role view are never saved for anyone else to see.
*/
(function () {
  "use strict";
  const H = window.HUB;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  // ---------- helpers ----------
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = (list, id) => (list || []).find((x) => x.id === id) || null;
  const person = (id) => byId(H.people, id) || { id: "", name: "To confirm", role: "", team: "", asks: [] };
  const area = (id) => byId(H.areas, id);
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => { const p = d.split("-"); return (p[2] ? +p[2] + " " : "") + MONTHS[+p[1] - 1] + " " + p[0]; };
  const daysSince = (d) => (Date.now() - new Date(d).getTime()) / 864e5;
  const overdue = (d) => daysSince(d) > 90;
  // Review reminders show only to the owner of the item (the viewer picked on Home or "Show my steps"; a login in a live hub)
  const reviewPill = (d, owner) => overdue(d) && owner && owner === wk.me ? '<span class="pill p-over">Due for your review</span>' : "";
  const AV = ["#FBF0C9", "#E3ECF4", "#E7F0E3", "#F4E4DE", "#ECE8F7", "#F0EAE0"];
  const avColour = (id) => AV[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % AV.length];
  // Staff with a "look" (content.js) get their illustrated face; anyone else gets initials. Same .avatar sizes either way.
  const avatar = (id, size) => { const p = person(id); return `<span class="avatar${p.look ? " av-face" : ""}" style="background:${p.look ? p.look.bg : avColour(p.id || "x")}${size ? `;width:${size}px;height:${size}px;font-size:${Math.round(size / 2.8)}px` : ""}">${p.look ? faceSvg(p.look) : esc(initials(p.name))}</span>`; };
  const chip = (id) => { const p = person(id); return `<button class="chip" data-person="${p.id}" title="${esc(p.role)}">${avatar(p.id)}${esc(p.name)}</button>`; };
  const store = { get(k) { try { return localStorage.getItem("hub." + k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem("hub." + k, v); } catch (e) {} } };

  // Glossary: underline the first use of each term, definition on hover or tap
  function gloss(text) {
    let out = esc(text); const keep = [];
    H.glossary.slice().sort((a, b) => b.term.length - a.term.length).forEach((g) => {
      const re = new RegExp("\\b(" + g.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")\\b", "i");
      out = out.replace(re, (m) => { keep.push(`<span class="term" tabindex="0" data-def="${esc(g.def)}">${m}</span>`); return "\u0000" + (keep.length - 1) + "\u0000"; });
    });
    return out.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[+i]);
  }

  // ---------- icons and drawings ----------
  const ICONS = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.5c2 .8 3.2 2.6 3.7 5.5"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    flow: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>',
    file: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h6M7 14h10"/>',
    grow: '<path d="M12 21V11"/><path d="M12 11c0-4 3-7 8-7 0 5-3 7-8 7z"/><path d="M12 14c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    book: '<path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4z"/><path d="M20 4h-4a3 3 0 00-3 3"/><path d="M20 4v14h-6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    print: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
    clip: '<path d="M20.5 11.5l-8.2 8.2a5 5 0 01-7.1-7.1l8.5-8.5a3.3 3.3 0 014.7 4.7l-8.5 8.5a1.7 1.7 0 01-2.4-2.4l7.9-7.9"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',
    screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"/>',
    mega: '<path d="M3 10v4h3l7 4V6l-7 4z"/><path d="M16.5 9a4 4 0 010 6M19 6.5a8 8 0 010 11"/>',
    chat: '<path d="M4 5h16v11H10l-5 4v-4H4z"/><path d="M8 10h8M8 13h5"/>',
    truck: '<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .8-3 2s1.3 1.7 3 2 3 .8 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5v11"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    open: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>'
  };
  const icon = (n, s) => `<svg width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  // Line drawings for products and journeys. Glow shapes use the brand accent.
  const G = 'fill="#F2D477" opacity=".55" stroke="none"';
  const ART = {
    dome: `<path d="M60 8v30"/><path d="M32 66a28 28 0 0156 0z" fill="currentColor"/><path d="M36 69h48l14 40H22z" ${G}/>`,
    cluster: `<path d="M40 8v52M60 8v34M80 8v58"/><circle cx="40" cy="70" r="11"/><circle cx="60" cy="52" r="11"/><circle cx="80" cy="76" r="11"/><circle cx="60" cy="52" r="5" ${G}/><circle cx="40" cy="70" r="5" ${G}/><circle cx="80" cy="76" r="5" ${G}/>`,
    wall: `<rect x="18" y="30" width="10" height="34" rx="3"/><path d="M28 47h30l14-12"/><path d="M62 30l26-6 4 20-26 8z" fill="currentColor"/><path d="M72 50l18-4 16 44-44 10z" ${G}/>`,
    table: `<path d="M38 22h44l12 34H26z" fill="currentColor"/><path d="M60 56v40M42 98h36"/><path d="M30 58h60l-8 30H38z" ${G}/>`,
    floor: `<path d="M34 108h30M49 108V40c0-18 14-28 34-26"/><path d="M70 14h30l8 22H62z" fill="currentColor"/><path d="M66 38h38l8 40H58z" ${G}/>`,
    drum: `<path d="M60 8v26"/><rect x="26" y="34" width="68" height="30" rx="4" fill="currentColor"/><path d="M30 66h60l14 40H16z" ${G}/>`,
    bollard: `<rect x="46" y="30" width="28" height="78" rx="4"/><rect x="42" y="22" width="36" height="10" rx="3" fill="currentColor"/><path d="M48 40h24" stroke-width="5" stroke="#F2D477"/><path d="M46 40L18 70h84L74 40" ${G}/>`,
    updown: `<path d="M20 10v100"/><rect x="40" y="46" width="22" height="28" rx="3" fill="currentColor"/><path d="M44 46L36 8h30l-8 38zM44 74l-8 38h30l-8-38z" ${G}/>`,
    step: `<path d="M10 40h40v30h40v30h20"/><rect x="58" y="76" width="22" height="8" rx="2" fill="currentColor"/><path d="M60 84h18l12 16H48z" ${G}/>`,
    spike: `<path d="M50 110V70"/><path d="M42 110h16"/><rect x="40" y="50" width="22" height="30" rx="4" transform="rotate(-25 51 65)" fill="currentColor"/><path d="M60 46l40-36 12 22-44 26z" ${G}/>`,
    bulkhead: `<rect x="22" y="32" width="76" height="52" rx="26"/><path d="M38 58h44M42 46h36M42 70h36"/><rect x="34" y="42" width="52" height="32" rx="16" ${G}/>`,
    path: `<path d="M60 40v68M46 108h28"/><path d="M40 30h40l-6 12H46z" fill="currentColor"/><path d="M46 42h28l24 40H22z" ${G}/>`,
    linear: `<path d="M8 22h104"/><rect x="14" y="30" width="92" height="10" rx="3" fill="currentColor"/><path d="M14 40h92l10 48H4z" ${G}/>`,
    downlight: `<path d="M8 26h104"/><path d="M48 26h24l-4 10H52z" fill="currentColor"/><path d="M52 36h16l26 64H26z" ${G}/>`,
    track: `<path d="M10 20h100" stroke-width="5"/><path d="M38 22v10M82 22v10"/><rect x="28" y="32" width="20" height="26" rx="4" transform="rotate(15 38 45)" fill="currentColor"/><rect x="72" y="32" width="20" height="26" rx="4" transform="rotate(-15 82 45)" fill="currentColor"/><path d="M30 58L14 104h30zM90 58l16 46H76z" ${G}/>`,
    washer: `<path d="M100 8v104"/><path d="M8 22h70"/><rect x="40" y="22" width="24" height="10" rx="2" fill="currentColor"/><path d="M58 32l42 6v66L46 32z" ${G}/>`,
    trimless: `<path d="M8 30h40M72 30h40"/><path d="M48 30v-6h24v6"/><circle cx="60" cy="30" r="5" fill="currentColor"/><path d="M54 32h12l30 72H24z" ${G}/>`,
    strip: `<path d="M10 70c20-30 30-30 50 0s30 30 50 0" stroke-width="6"/><path d="M10 70c20-30 30-30 50 0s30 30 50 0" stroke="#F2D477" stroke-width="2.5"/>`,
    plan: `<rect x="20" y="16" width="80" height="88" rx="4"/><path d="M20 46h80M56 16v88"/><circle cx="38" cy="31" r="5" ${G}/><circle cx="78" cy="31" r="5" ${G}/><circle cx="38" cy="75" r="5" ${G}/><circle cx="78" cy="75" r="5" ${G}/>`,
    finish: `<circle cx="40" cy="48" r="18" fill="currentColor"/><circle cx="72" cy="48" r="18" fill="#F2D477"/><circle cx="56" cy="76" r="18"/>`,
    dimmer: `<rect x="34" y="14" width="52" height="92" rx="8"/><circle cx="60" cy="60" r="16"/><path d="M60 44v8"/><path d="M60 60a16 16 0 0116-16" stroke="#F2D477" stroke-width="5"/>`,
    test: `<path d="M60 12l38 14v30c0 26-17 44-38 52-21-8-38-26-38-52V26z"/><path d="M42 60l12 12 24-26" stroke-width="4"/><path d="M60 22l30 10v24c0 20-13 34-30 41z" ${G}/>`,
    card: `<rect x="24" y="12" width="72" height="96" rx="5"/><path d="M36 30h48" stroke-width="4"/><path d="M36 46h30M36 58h40M36 70h26"/><rect x="36" y="80" width="48" height="14" rx="3" ${G}/>`
  };
  const art = (n, s) => `<svg width="${s || 96}" height="${s || 96}" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[n] || ART.dome}</svg>`;

  // Illustrated avatars for customer profiles: flat shapes from a few settings ("look" in content.js), never a photo
  const HAIR = {
    short: { front: '<path d="M33 43c-1-14 7-22 17-22s18 8 17 22c-3-8-9-12-17-12s-14 4-17 12z"/>' },
    side: { front: '<path d="M33 45c-2-15 7-24 18-24s18 8 16 23c-4-8-11-13-23-11-4 2-8 6-11 12z"/>' },
    bob: { back: '<path d="M30 46c0-17 9-26 20-26s20 9 20 26v16h-8V42H38v20h-8z"/>', front: '<path d="M34 41c2-11 9-16 17-16s14 5 15 15c-8-6-21-7-32 1z"/>' },
    long: { back: '<path d="M28 47c0-19 10-29 22-29s22 10 22 29l3 31H25z"/>', front: '<path d="M34 41c2-11 9-16 17-16s14 5 15 15c-8-6-21-7-32 1z"/>' },
    bun: { back: '<circle cx="50" cy="20" r="8"/>', front: '<path d="M33 43c-1-14 7-21 17-21s18 7 17 21c-3-8-9-11-17-11s-14 3-17 11z"/>' },
    pony: { back: '<path d="M63 31c13 2 16 18 9 31-2-11-5-17-12-21z"/>', front: '<path d="M33 43c-1-14 7-22 17-22s18 8 17 22c-3-8-9-12-17-12s-14 4-17 12z"/>' },
    curly: { back: '<circle cx="35" cy="36" r="9"/><circle cx="42" cy="27" r="9"/><circle cx="51" cy="24" r="9"/><circle cx="60" cy="27" r="9"/><circle cx="66" cy="36" r="9"/><circle cx="33" cy="46" r="6"/><circle cx="67" cy="46" r="6"/>' },
    cap: { front: '<path d="M33 39c0-12 8-18 17-18s17 6 17 18z"/><path d="M50 36l26 3-2 5-24-3z"/>' }
  };
  function face(l, size) {
    const s = size || 64;
    return `<span class="face" style="width:${s}px;height:${s}px;background:${(l || {}).bg || "#F0EAE0"}">${faceSvg(l, s)}</span>`;
  }
  function faceSvg(l, s) {
    l = l || {};
    const h = HAIR[l.hair] || HAIR.short, hc = l.hc || "#2B2523", ink = "#1F2A36";
    const under = l.acc === "beard" ? `<path d="M35 48c0 12 6 18 15 18s15-6 15-18c-2 6-5 9-8 10-2-2-4-3-7-3s-5 1-7 3c-3-1-6-4-8-10z" fill="${hc}"/>` : "";
    const over = { glasses: `<g fill="none" stroke="${ink}" stroke-width="1.6"><circle cx="44" cy="47" r="4.8"/><circle cx="56" cy="47" r="4.8"/><path d="M48.8 47h2.4"/></g>`,
      hivis: '<path d="M22 89h56M20 96h60" stroke="#FFFDF9" stroke-width="3" opacity=".85"/>',
      earrings: '<circle cx="34" cy="54" r="2.2" fill="#F2D477"/><circle cx="66" cy="54" r="2.2" fill="#F2D477"/>',
      lanyard: '<path d="M44 72l6 13 6-13" fill="none" stroke="#F2D477" stroke-width="2"/><rect x="46" y="84" width="8" height="10" rx="1.5" fill="#FFFDF9"/>' }[l.acc] || "";
    return `<svg viewBox="0 0 100 100"${s ? ` width="${s}" height="${s}"` : ""} aria-hidden="true"><g fill="${hc}">${h.back || ""}</g>
      <path d="M16 102c0-20 15-31 34-31s34 11 34 31z" fill="${l.top || ink}"/><path d="M43 60h14v13c-4 3-10 3-14 0z" fill="${l.skin}"/><path d="M43 63h14v4c-4 2-10 2-14 0z" opacity=".1"/>
      <ellipse cx="50" cy="46" rx="16" ry="18" fill="${l.skin}"/><g fill="${hc}">${h.front || ""}</g>${under}
      <circle cx="44" cy="47" r="1.7" fill="${ink}"/><circle cx="56" cy="47" r="1.7" fill="${ink}"/><path d="M45.5 54.5q4.5 3.5 9 0" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round"/>${over}</svg>`;
  }

  function logo(light, w) {
    const t = light ? "#FFFDF9" : "#1F2A36", s = light ? "#F2D477" : "#8A6A12";
    return `<svg width="${w || 180}" height="${(w || 180) * 64 / 250}" viewBox="0 0 250 64" role="img" aria-label="${esc(H.company.name)}"><line x1="26" y1="4" x2="26" y2="14" stroke="${t}" stroke-width="2"/><path d="M8 32 A18 18 0 0 1 44 32 Z" fill="${t}"/><path d="M10 35 L42 35 L52 60 L0 60 Z" fill="#F2D477" opacity=".45"/><path d="M14 35 L38 35 L44 60 L8 60 Z" fill="#FBF0C9" opacity=".85"/><text x="66" y="38" font-family="Fraunces, Georgia, serif" font-size="27" font-weight="600" fill="${t}">Halflight</text><text x="67" y="55" font-family="Inter, sans-serif" font-size="9.5" letter-spacing="3.2" fill="${s}">LIGHTING CO</text></svg>`;
  }
  const heroArt = () => `<svg width="230" height="230" viewBox="0 0 230 230" aria-hidden="true"><defs><radialGradient id="hg" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#F2D477" stop-opacity=".75"/><stop offset="1" stop-color="#F2D477" stop-opacity="0"/></radialGradient></defs><line x1="115" y1="0" x2="115" y2="70" stroke="#FFFDF9" stroke-width="2"/><path d="M60 118a55 55 0 01110 0z" fill="#FFFDF9"/><path d="M66 122h98l60 108H6z" fill="url(#hg)"/><ellipse cx="115" cy="122" rx="40" ry="4" fill="#F2D477"/></svg>`;

  // ---------- centred pop-up (replaces the side panel everywhere) ----------
  // Never a pop-up on top of a pop-up: opening a link inside one swaps its contents, with a "Back to" link.
  let popStack = [], popNow = null;
  function paintPop() {
    const p = popNow, prev = popStack[popStack.length - 1];
    $("#pop-back").hidden = !prev;
    if (prev) $("#pop-back").innerHTML = `${icon("back", 14)} Back to ${esc(prev.title)}`;
    $("#panel-title").innerHTML = `<h3 id="pop-h">${esc(p.title)}</h3>${p.sub ? `<div class="pop-sub">${p.sub}</div>` : ""}`;
    $("#panel-body").innerHTML = p.body;
    $("#panel-body").scrollTop = 0;
  }
  function openPanel(title, sub, body) {
    const open = $("#pop").classList.contains("on");
    if (open && popNow) popStack.push(popNow); else popStack = [];
    popNow = { title, sub, body };
    paintPop();
    if (!open) {
      $("#pop").classList.add("on"); $("#pop").setAttribute("aria-hidden", "false");
      document.body.classList.add("popped");
      setTimeout(() => $("#pop .x").focus(), 50);
    }
  }
  function popBack() { if (popStack.length) { popNow = popStack.pop(); paintPop(); } }
  function closePanel() {
    const p = $("#pop"); if (!p) return;
    p.classList.remove("on"); p.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popped");
    popStack = []; popNow = null;
  }

  // ---------- attach a file (browser only until there's a back end) ----------
  function attachBox(label, hint) {
    return `<div class="attach"><label class="attach-drop">${icon("upload", 22)}<span><b>${esc(label || "Attach a file")}</b><small>${esc(hint || "Drop it here, or click to choose")}</small></span><input type="file" multiple data-attach></label>
      <ul class="attach-list"></ul>
      <p class="attach-note">${icon("info", 15)}<span><b>Demo only.</b> The file stays in your browser and is gone when you leave the page. Nothing is saved or shared until the hub has a back end.</span></p></div>`;
  }
  // A file attached to a past month's report shows on that month straight away (in this browser only)
  function keepRep(box, files) {
    const holder = box.closest("[data-sbrepfor]"); if (!holder) return;
    const r = H.scoreboard.reports.find((x) => x.m === holder.dataset.sbrepfor); if (!r) return;
    Array.from(files || []).forEach((f) => r.files.push({ n: f.name, s: kb(f.size), local: true }));
    if (route().page === "goals") repaint();
  }
  const kb = (n) => n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB";
  function addFiles(box, files) {
    const ul = $(".attach-list", box);
    Array.from(files || []).forEach((f) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="ico sm">${icon("clip", 15)}</span><span class="nm"><b>${esc(f.name)}</b><small>${kb(f.size)} · only in this browser</small></span><button class="x" data-unattach aria-label="Remove ${esc(f.name)}">&times;</button>`;
      ul.appendChild(li);
    });
  }

  // ---------- ownership strip: bottom left of every page ----------
  function ownership(r) {
    const hub = { owner: H.company.hubOwner, reviewed: H.company.hubReviewed, what: "the hub" };
    if (r.page === "work" && r.sub) { const f = H.flows[flowId(r.sub)]; if (f) return { owner: f.owner, reviewed: f.reviewed, what: f.name }; }
    const a = area(r.page);
    return a ? { owner: a.owner, reviewed: a.reviewed, what: a.name } : hub;
  }
  const stripHtml = (o) => `<span class="lbl">Looked after by</span>${chip(o.owner)}<span class="sep">·</span><span class="lbl">Last reviewed <b>${o.reviewed ? fmtDate(o.reviewed) : "not yet"}</b></span><span class="sep">·</span><button class="sg" data-suggest="1">${icon("edit", 14)} Suggest a change</button>`;
  const paintStrip = (r) => { $("#ownstrip").innerHTML = stripHtml(ownership(r)); };

  function header(areaId, lede, right) {
    const a = area(areaId);
    return `<div class="pagehead"><div><span class="areatag">${icon(a.icon, 13)} Think Right area: ${esc(a.tr)}</span><h1>${esc(a.name)}</h1><p class="lede">${esc(lede || a.line)}</p></div>${right || ""}</div>`;
  }

  // ---------- pages ----------
  const pages = {};
  let view = store.get("view") || "all";

  // ---------- Home: the dashboard ----------
  // Who's looking: a role view (the buttons) or a person ("I'm..."). Neither is saved. In a live hub the login does this.
  const dash = { flow: "" };
  const viewOf = (id) => H.roleViews.find((r) => r.people && r.people.includes(id));
  // Stages in a lane where any of these people has a part (the stage's roles, or a task's roles)
  const stagesFor = (fid, ids) => H.flows[fid].stages.filter((s) => rolePeople(s.who).some((p) => ids.includes(p)) || s.tasks.some((t) => rolePeople(t.by).some((p) => ids.includes(p)) || ids.some((p) => nameIn(t.who, p)))).map((s) => s.id);
  // Items a person looks after that are more than 90 days since their last review. Only ever shown to that person.
  function dueFor(me) {
    const items = [];
    H.areas.forEach((a) => items.push({ o: a.owner, d: a.reviewed, t: a.name, k: "Hub section", href: "#/" + a.id }));
    Object.keys(H.flows).forEach((fid) => { const f = H.flows[fid]; items.push({ o: f.owner, d: f.reviewed, t: f.name, k: "How We Work", href: "#/work/" + fid }); });
    H.resources.forEach((r) => items.push({ o: r.owner, d: r.reviewed, t: r.title, k: r.type, res: r.id }));
    H.competitors.forEach((c) => items.push({ o: c.owner, d: c.reviewed, t: c.name, k: "Competitor", rival: c.id }));
    return items.filter((i) => i.o === me && i.d && overdue(i.d)).sort((a, b) => a.d.localeCompare(b.d));
  }
  const itemLink = (i) => i.res ? `href="#" data-res="${i.res}"` : i.rival ? `href="#" data-rival="${i.rival}"` : `href="${i.href}"`;

  function ring(now, target, size) {
    const s = size || 86, r = s / 2 - 7, c = 2 * Math.PI * r, f = Math.min(now / target, 1);
    return `<div class="ring" style="width:${s}px;height:${s}px"><svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${r}" stroke="#E6DFD3" stroke-width="7" fill="none"/><circle cx="${s / 2}" cy="${s / 2}" r="${r}" stroke="#8A6A12" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="${c * f} ${c}"/></svg><b>${now}%</b></div>`;
  }
  function sparkline(t) {
    const w = 300, h = 70, max = t.target + 5, min = Math.min(...t.values) - 5;
    const x = (i) => 10 + i * (w - 20) / (t.values.length - 1), y = (v) => h - 8 - (v - min) / (max - min) * (h - 20);
    const pts = t.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(t.name)} trend"><line x1="0" x2="${w}" y1="${y(t.target)}" y2="${y(t.target)}" stroke="#8A6A12" stroke-dasharray="4 4" stroke-width="1"/><polyline points="${pts}" fill="none" stroke="#1F2A36" stroke-width="2.5" stroke-linejoin="round"/>${t.values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="${i === t.values.length - 1 ? 4.5 : 2.5}" fill="${i === t.values.length - 1 ? "#F2D477" : "#1F2A36"}" stroke="#1F2A36"/>`).join("")}</svg>
      <div class="small muted" style="display:flex;justify-content:space-between"><span>${t.months[0]}</span><span>Target ${t.target}${t.unit}</span><span>${t.months[t.months.length - 1]}</span></div>`;
  }

  pages.home = function () {
    const hr = new Date().getHours(), hello = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
    const me = wk.me, v = byId(H.roleViews, view) || H.roleViews[0];
    const tasks = H.tasks.filter((t) => view === "all" ? t.home : t.views.includes(view));
    const g = H.goals, fm = measure("s2o"), spec = { name: fm.name, now: fm.values[lastIn(fm)], start: fm.start, target: fm.target };
    // The stage line: one lane at a time, opening on the viewer's own. Their stages light up.
    let line = "";
    if (view === "new" && !me) {
      line = `<div class="secthead" style="margin-top:34px"><h2>Your path through the first month</h2><a class="small" href="#/people">${esc(area("people").name)}</a></div>
        <div class="grid">${H.pathway.stops.map((x, i) => `<a class="card" href="#/people/${i + 1}"><span class="eyebrow">Stop ${i + 1}</span><h3>${esc(x.t)}</h3><p>${esc(x.line)}</p></a>`).join("")}</div>`;
    } else {
      const who = me ? [me] : v.people || null;
      const lanes = who ? H.work.lanes.filter((fid) => stagesFor(fid, who).length) : H.work.lanes;
      const pick = [dash.flow, me && lanes.slice().sort((a, b) => stagesFor(b, who).length - stagesFor(a, who).length)[0], v.flow, "sales"].find((x) => x && lanes.includes(x)) || lanes[0] || "sales";
      const f = H.flows[pick], mine = who ? stagesFor(pick, who) : null;
      line = `<div class="secthead dl-head" style="margin-top:34px"><div><h2>${esc(f.name)}</h2><p class="small muted" style="margin:4px 0 0">${who ? `${me ? "Your" : esc(v.name) + "'s"} stages are lit up. ` : ""}Hover a stage for a glance, click it for the tasks.</p></div>
          ${lanes.length > 1 ? `<div class="seg sm">${lanes.map((fid) => `<button data-dflow="${fid}" class="${fid === pick ? "on" : ""}">${esc(H.flows[fid].short)}</button>`).join("")}</div>` : ""}</div>
        ${stageLine(pick, { mine, attr: "stagepop" })}<div class="dl-foot"><span class="small muted">${icon("flow", 14)} ${f.stages.length} stages${mine ? ` · ${mine.length} with a part for ${me ? "you" : "this team"}` : ""}</span><a class="small" href="#/work/${pick}">Open in How We Work ${icon("arrow", 13)}</a></div>`;
    }
    const due = me ? dueFor(me) : [];
    const dueCard = !me ? "" : due.length
      ? `<div class="card due"><div class="due-h"><b>Due for your review</b><span class="pill p-over">${due.length}</span></div><div class="feed">${due.slice(0, 5).map((i) => `<a ${itemLink(i)}><span class="dot"></span><span><b>${esc(i.t)}</b><br><span class="small muted">${esc(i.k)} · last reviewed ${fmtDate(i.d)}</span></span></a>`).join("")}</div>${due.length > 5 ? `<p class="small muted" style="margin:6px 0 0">And ${due.length - 5} more.</p>` : ""}<p class="small muted" style="margin:8px 0 0">Only you see this, because you look after them.</p></div>`
      : `<div class="card due ok"><b>Nothing due for your review</b><p class="small muted" style="margin:4px 0 0">Anything you look after shows here once it's 90 days since its last review.</p></div>`;
    return `<section class="hero"><div class="glow"></div><div style="position:relative">
        <span class="eyebrow" style="color:var(--accent)">${hello}${me ? ", " + esc(person(me).name) : ""}</span><h1 style="margin-top:6px">Welcome to the ${esc(H.company.short)} Hub</h1>
        <p>${esc(H.company.oneLine)} How we work, who we serve and what we're aiming for, in one place.</p>
        <div class="viewas"><span>Show me what matters for</span><div class="seg" role="group" aria-label="View as">${H.roleViews.map((r) => `<button data-view="${r.id}" class="${r.id === view && !me ? "on" : ""}">${esc(r.name)}</button>`).join("")}</div></div>
        <label class="me-dash"><span>or I'm</span><select id="dash-me"><option value="">Choose your name</option>${H.people.map((p) => `<option value="${p.id}"${p.id === me ? " selected" : ""}>${esc(p.name)}</option>`).join("")}</select><small>In a live hub your login does this. Nothing is saved.</small></label>
      </div><div class="hero-art">${heroArt()}</div></section>
      <div class="dash"><div>
        <div class="secthead"><h2>I want to...</h2><a class="small" href="#/do">All tasks</a></div>
        <div class="grid">${tasks.map(taskCard).join("")}</div>${line}
      </div><div>
        <div class="secthead"><h2>Our focus</h2><a class="small" href="#/goals">Scoreboard</a></div>
        <a class="card focus" href="#/goals" style="gap:12px"><span class="eyebrow">This year: ${esc(g.theme)}</span>
          <div class="goalrow">${ring(spec.now, spec.target)}<div><b>${esc(spec.name)}</b><div class="small muted">Started at ${spec.start}%, aiming for ${spec.target}%</div></div></div>
          ${sparkline(trendOf(fm))}
          <div class="focus-own">${avatar(g.owner, 26)}<span>Set by <b>${esc(person(g.owner).name)}</b>, from ${esc(g.source.replace(/^Sam's/, "the"))}. Updated monthly before the leadership meeting, last on ${fmtDate(g.updated)}.</span></div></a>
        ${dueCard}
      </div></div>
      <div class="secthead" style="margin-top:38px"><h2>Explore the hub</h2></div>
      <div class="grid">${H.areas.map((a) => `<a class="card" href="#/${a.id}" style="flex-direction:row;align-items:center;gap:14px;padding:16px"><span class="ico">${icon(a.icon, 20)}</span><span><b>${esc(a.name)}</b><br><span class="small muted">${esc(a.line)}</span></span></a>`).join("")}</div>`;
  };
  // A stage from the dashboard or a guided task: opens in the centred pop-up, so you stay where you are
  function stagePop(key) {
    const { f, fid, s } = stageOf(key); if (!s) return;
    openPanel(s.name, `${esc(f.name)}${f.stages.length > 1 ? ` · Stage ${f.stages.indexOf(s) + 1} of ${f.stages.length}` : ""}`,
      stageDetail(fid, s.id, { solo: true, bare: true, me: wk.me }) + `<p style="margin-top:16px"><a class="btn ghost sm" href="#/work/${fid}?stage=${s.id}">${icon("flow", 15)} Open it in How We Work</a></p>`);
  }

  // ---------- "I want to...": guided tasks ----------
  // A task holds no content of its own: it's an ordered path through what's already in the hub (see tasks in content.js).
  // Anything linked opens in the centred pop-up, so you never leave the task.
  const flowTask = (ref) => { const [fid, sid, n] = ref.split(":"), f = H.flows[fid], s = f && byId(f.stages, sid), t = s && s.tasks[+n]; return t ? { f, fid, s, t } : null; };
  const PICKS = { who: "Who are you meeting?", stage: "Where's the deal at?", rival: "Who are you up against?", card: "Your battlecard" };
  const stepTitle = (x) => x.task ? (flowTask(x.task) || { t: { t: "Not found" } }).t.t : x.pick ? PICKS[x.pick] : x.t;
  const taskRoles = (t) => [...new Set((t.path || []).flatMap((x) => { const ft = x.task && flowTask(x.task); return ft && ft.t.by ? ft.t.by : []; }))];
  const taskCard = (t) => {
    const roles = taskRoles(t), n = (t.path || []).length;
    return `<a class="card task" href="${t.page ? "#/" + t.page : "#/do/" + t.id}"><div class="art">${art(t.art, 74)}</div><div class="body"><h3>${esc(t.title)}</h3><p>${esc(t.line)}</p><div class="meta"><span>${t.page ? "Your learning path" : n + (n === 1 ? " step" : " steps")}${roles.length ? " · " + esc(roles.map(roleName).join(", ")) : ""}</span><span style="color:var(--ink);font-weight:600;white-space:nowrap">Start ${icon("arrow", 14)}</span></div></div></a>`;
  };
  // What's picked so far for meeting prep (shared with the battlecard in Meeting Prep)
  function pickValue(p) {
    const ch = byId(H.channels, bc.ch), r = ch && (bc.role === OTHER ? { name: "Someone else" } : byId(ch.roles, bc.role));
    if (p === "who") return r ? r.name + " · " + ch.short : ch ? ch.short : "";
    if (p === "stage") return (byId(H.stages, bc.stage) || {}).name || "";
    if (p === "rival") return bc.vs ? (byId(H.competitors, bc.vs) || {}).name : "";
    return "";
  }

  pages.do = function (sub, q, extra) {
    if (!sub) {
      return `<span class="areatag">${icon("spark", 13)} Guided tasks</span><h1>I want to...</h1><p class="lede">The jobs we do most, in our own words. Pick one and we'll walk you through it, using the steps, documents and tools already in the hub.</p>
        <div class="grid three" style="margin-top:24px">${H.tasks.map(taskCard).join("")}</div>`;
    }
    const t = byId(H.tasks, sub);
    if (!t) return notFound();
    if (t.page) { setTimeout(() => location.replace("#/" + t.page)); return ""; }
    const n = t.path.length, i = Math.max(0, Math.min(n - 1, (+extra || 1) - 1)), x = t.path[i];
    const body = x.task ? guideTask(x.task) : x.pick ? guidePick(x.pick, t) : `<p class="what">${gloss(x.x)}</p><div class="tip">${icon("info", 18)}<span>This happens outside the hub. Customer details always live in the CRM, never here.</span></div>`;
    const nav = n > 1 ? `<div class="stagenav no-print">${i > 0 ? `<a class="btn ghost" href="#/do/${t.id}/${i}">${icon("back", 15)} Back</a>` : "<span></span>"}${i < n - 1 ? `<a class="btn" href="#/do/${t.id}/${i + 2}">Next: ${esc(stepTitle(t.path[i + 1]))} ${icon("arrow", 15)}</a>` : `<a class="btn gold" href="#/">Done, back to Home</a>`}</div>`
      : `<div class="stagenav no-print"><span></span><a class="btn gold" href="#/do">Done, back to I want to...</a></div>`;
    return `<a class="small no-print" href="#/do" style="text-decoration:none">${icon("back", 13)} All tasks</a>
      <h1 style="margin-top:10px">${esc(t.title)}</h1><p class="lede">${esc(t.line)}</p>
      <div class="journey${n === 1 ? " solo" : ""}">${n > 1 ? `<ol class="stepper">${t.path.map((y, k) => { const val = y.pick && pickValue(y.pick); return `<li><button class="${k === i ? "on" : ""}" data-go="#/do/${t.id}/${k + 1}"><span class="n">${k + 1}</span><span><b style="display:block;color:inherit;font-size:14.5px">${esc(stepTitle(y))}</b>${val ? `<span class="st-val">${esc(val)}</span>` : ""}</span></button></li>`; }).join("")}</ol>` : ""}
      <div class="stage">${n > 1 ? `<div class="count">Step ${i + 1} of ${n}</div>` : ""}<h2>${esc(stepTitle(x))}</h2>${body}${nav}</div></div>`;
  };
  // A How We Work task, exactly as it is on its stage: who, when, the steps with their documents, the system
  function guideTask(ref) {
    const ft = flowTask(ref); if (!ft) return `<p class="muted">This task has moved. Tell ${esc(person(H.company.hubOwner).name)}.</p>`;
    const { f, fid, s, t } = ft, g = gapById(t.gap), gap = live(g) ? g : null;
    const who = t.by ? t.by.map(roleChip).join("") : `<span class="role">${esc(t.who)}</span>`;
    return `<div class="gt-meta">${who}${t.time ? `<span class="tk-time">${icon("clock", 14)}${esc(t.time)}</span>` : ""}${gap ? gapDot(gap) : ""}</div>
      <ol class="tk-steps gt-steps">${t.steps.map((y) => `<li><span class="st">${gloss(y.t)}${y.file ? fileLink(y.file) : ""}</span></li>`).join("")}</ol>
      ${t.sys ? `<p class="tk-sys">${icon("screen", 13)} Done in ${esc(t.sys)}</p>` : ""}
      <div class="gt-from"><span>${icon("flow", 14)} From How We Work › ${esc(f.short)} › ${esc(s.name)}</span><button class="btn ghost sm" data-stagepop="${fid}:${s.id}">See the whole stage</button></div>`;
  }
  // Meeting prep: the same picks as the battlecard in Meeting Prep, one at a time
  function guidePick(p, t) {
    const ch = byId(H.channels, bc.ch);
    if (p === "who") {
      return `<p class="what">Pick their channel, then the person you're meeting. Not quite any of them? Pick the closest match, or "Someone else".</p>
        <div class="seg">${H.channels.map((c) => `<button data-mp="ch|${c.id}" class="${c.id === bc.ch ? "on" : ""}">${esc(c.short)}</button>`).join("")}</div>
        ${ch ? `<div class="mp-opts">${ch.roles.map((r) => `<button class="mp-opt has-face${r.id === bc.role ? " on" : ""}" data-mp="role|${r.id}">${face(r.look, 42)}<span class="mo-t"><b>${esc(r.name)}</b><span>${esc(r.line)}</span></span></button>`).join("")}
          <button class="mp-opt other${bc.role === OTHER ? " on" : ""}" data-mp="role|${OTHER}"><b>Someone else</b><span>Doesn't fit one of our profiles. You'll get a box on the battlecard to describe them.</span></button></div>
          <p style="margin-top:14px"><button class="btn ghost sm" data-channel="${ch.id}">${icon("users", 15)} Who's involved: ${esc(ch.short)}</button>${bc.role && bc.role !== OTHER ? ` <button class="btn ghost sm" data-profile="${ch.id}:${bc.role}">Read their profile</button>` : ""}</p>` : `<p class="small muted" style="margin-top:12px">Choose a channel to see the people inside it.</p>`}`;
    }
    if (p === "stage") {
      const f = H.flows.sales, cur = f.stages.find((s) => s.card && s.card === bc.stage), st = byId(H.stages, bc.stage);
      return `<p class="what">Click the stage this meeting is at. Hover a stage for a glance.</p>
        ${stageLine("sales", { active: cur && cur.id, attr: "mpstage", dim: f.stages.filter((s) => !s.card).map((s) => s.id) })}
        <div class="sdetail mp-stage">${st && cur ? `<div class="mp-two"><div><span class="eyebrow">Your goal at this stage</span><p>${esc(st.goal)}</p></div><div><span class="eyebrow">Questions to ask</span><ul class="ref">${st.questions.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
          <button class="btn ghost sm" data-stagepop="sales:${cur.id}">See everything at ${esc(cur.name)}</button>` : `<p class="muted" style="margin:0">Pick a stage to see your goal and the questions to ask.</p>`}</div>`;
    }
    if (p === "rival") {
      const vs = byId(H.competitors, bc.vs);
      return `<p class="what">If you know who else is in the running, pick them. What they'll pitch and what not to say go on your battlecard.</p>
        <div class="mp-chips"><button class="mp-chip${!bc.vs ? " on" : ""}" data-mp="vs|">Not known</button>${H.competitors.map((c) => `<button class="mp-chip${c.id === bc.vs ? " on" : ""}" data-mp="vs|${c.id}">${esc(c.name)}</button>`).join("")}</div>
        ${vs ? `<div class="layer mp-vs"><p><b>They'll pitch:</b> ${esc(vs.pitch)}</p><p><b>Don't say:</b> ${esc(vs.dontSay)}</p><button class="btn ghost sm" data-rival="${vs.id}">Read their full card</button></div>` : ""}`;
    }
    const at = (k) => t.path.findIndex((y) => y.pick === k) + 1;
    return `<div class="mp-sum no-print">${[["who", "Meeting"], ["stage", "Stage"], ["rival", "Up against"]].map(([k, l]) => `<button class="mp-pick" data-go="#/do/${t.id}/${at(k)}"><span>${l}</span><b>${esc(pickValue(k) || (k === "rival" ? "Not known" : "Not picked yet"))}</b>${icon("edit", 13)}</button>`).join("")}</div>
      <div class="desk mp-desk"><div id="bc-sheet">${sheet()}</div></div>
      <div class="mp-actions no-print"><button class="btn gold" data-print="1" id="bc-print"${sheetReady() ? "" : ' disabled style="opacity:.5"'}>${icon("print", 16)} Print my battlecard</button><a class="btn ghost" href="#/toolkit">${icon("card", 15)} Open it in Meeting Prep</a></div>
      <p class="small muted no-print" style="margin:10px 0 0">The same battlecard as Meeting Prep: your picks carry across both ways. Untick anything you don't need and type notes on the page. Nothing is saved.</p>`;
  }

  // ---------- Our Story: pre-filled from the website, checked by the owner. Then the team. ----------
  let storyMs = 0, storyVal = 0;
  const garageArt = () => `<svg viewBox="0 0 220 150" aria-hidden="true"><rect width="220" height="150" fill="#2A3847"/><circle cx="178" cy="30" r="14" fill="#F2D477" opacity=".85"/><path d="M30 150V64l80-34 80 34v86z" fill="#4A5D70"/><rect x="58" y="78" width="104" height="72" fill="#1F2A36"/><rect x="58" y="78" width="104" height="22" fill="#33475B"/><g stroke="#33475B" stroke-width="3">${[108, 118, 128].map((y) => `<path d="M58 ${y}h104"/>`).join("")}</g><path d="M70 150v-26h80v26" fill="#6B5340"/><g fill="#FFFDF9">${[78, 100, 122].map((x) => `<rect x="${x}" y="110" width="18" height="14" rx="1"/>`).join("")}</g><line x1="110" y1="100" x2="110" y2="86" stroke="#C9D2DB"/><path d="M100 96a10 10 0 0120 0z" fill="#F2D477"/><path d="M101 97h18l18 53h-54z" fill="#F2D477" opacity=".22"/></svg>`;
  const orgKids = (id) => H.people.filter((p) => p.reports === id);
  const orgNode = (p) => `<div class="on-card" data-asks="${esc((p.asks.join("|") + "|" + p.role).toLowerCase())}"><button class="on-btn" data-person="${p.id}">${avatar(p.id, 52)}<b>${esc(p.name)}</b><small>${esc(p.role)}</small>${p.day ? `<span class="on-tag">Day to day with ${esc(person(p.day).name)}</span>` : ""}</button>
    <div class="on-ask"><span>Ask me about</span>${esc(p.asks.join(" · "))}</div><span class="on-match"></span></div>`;
  const orgTree = (p) => { const k = orgKids(p.id); return `<li>${orgNode(p)}${k.length ? `<ul>${k.map(orgTree).join("")}</ul>` : ""}</li>`; };
  // "I need help with...": lights up whoever's "Ask me about" matches. On screen only.
  function findAsk(q) {
    const org = $(".org"); if (!org) return;
    q = q.trim().toLowerCase(); org.classList.toggle("finding", !!q);
    $$(".on-card", org).forEach((c) => { const hit = q && c.dataset.asks.split("|").find((a) => a.includes(q)); c.classList.toggle("lit", !!hit); $(".on-match", c).textContent = hit || ""; });
    const n = q ? $$(".on-card.lit", org).length : -1;
    $("#ask-n").textContent = n < 0 ? "" : n ? (n === 1 ? "Ask this person." : `Ask one of these ${n}.`) : `Nobody's listed for that yet. Ask ${person(H.company.hubOwner).name}, who looks after the hub.`;
  }

  pages.who = function () {
    const s = H.story, f = s.founder, fp = person(f.by), ms = s.milestones[storyMs], v = s.values[storyVal], last = s.milestones.length - 1;
    const root = H.people.find((p) => !p.reports);
    const topics = ["Landed costs", "Lighting plans", "Pricing", "Custom finishes", "Range names", "Photos", "Samples"];
    return header("who", "Where we came from, how we behave, and who's who. Pre-filled from our website, then checked by Nadia.") +
      `<section class="st-hero"><div class="glow"></div>
        <div class="st-open"><span class="eyebrow">Since 2009 · Tauranga</span><h2>${esc(H.company.tagline)}</h2><p class="st-intro">${esc(s.intro)}</p><p>${esc(s.today)}</p>
          <span class="st-addh">What we add here</span><div class="st-adds">${s.adds.map((a) => `<span>${icon("check", 14)}${esc(a)}</span>`).join("")}</div></div>
        <figure class="st-founder"><div class="polaroid">${garageArt()}<span>The garage in Bethlehem, 2009</span></div>
          <blockquote>"${esc(f.quote)}"</blockquote><figcaption class="st-by">${avatar(fp.id, 44)}<span><b>${esc(fp.name)}</b><small>Founder, ${esc(fp.role)}</small></span></figcaption>
          <p class="st-photo"><span class="pill p-confirm">To come</span> ${esc(f.photo)}</p></figure>
      </section>
      <div class="secthead st-h"><h2>Milestones</h2><span class="small muted">From our website. Click a year.</span></div>
      <div class="ms"><ol class="ms-rail">${s.milestones.map((m, i) => `<li><button class="${i === storyMs ? "on" : ""}${i < storyMs ? " past" : ""}" data-ms="${i}" aria-pressed="${i === storyMs}"><i></i><b>${esc(m.year)}</b><span>${esc(m.t)}</span></button></li>`).join("")}</ol>
        <div class="ms-card"><div class="ms-art">${art(ms.art, 92)}</div><div class="ms-txt"><span class="eyebrow">${esc(ms.year)}</span><h3>${esc(ms.t)}</h3><p>${esc(ms.line)}</p>
          <div class="ms-who">${ms.who.length > 4 ? `<span class="faces">${ms.who.map((id) => avatar(id, 32)).join("")}</span><span class="small muted">All twelve of us. Meet them below.</span>` : ms.who.map(chip).join("")}</div></div>
          <div class="ms-nav">${storyMs > 0 ? `<button class="btn ghost sm" data-ms="${storyMs - 1}">${icon("back", 14)} ${esc(s.milestones[storyMs - 1].year)}</button>` : "<span></span>"}${storyMs < last ? `<button class="btn ghost sm" data-ms="${storyMs + 1}">${esc(s.milestones[storyMs + 1].year)} ${icon("arrow", 14)}</button>` : ""}</div></div></div>
      <div class="secthead st-h"><h2>How we behave</h2><span class="small muted">Our four values, as things you'll see us do</span></div>
      <blockquote class="st-believe">"${esc(s.believe)}"<small>What we believe, from our website</small></blockquote>
      <div class="vals"><div class="val-tabs" role="tablist" aria-label="Our values">${s.values.map((x, i) => `<button role="tab" aria-selected="${i === storyVal}" class="${i === storyVal ? "on" : ""}" data-val="${i}"><span class="num">${i + 1}</span><span><b>${esc(x.name)}</b><small>${esc(x.line)}</small></span></button>`).join("")}</div>
        <div class="val-body" role="tabpanel"><span class="eyebrow">What "${esc(v.name)}" looks like here</span><ul class="val-does">${v.does.map((d) => { const p = person(d.by); return `<li><button class="vd-who" data-person="${p.id}" aria-label="${esc(p.name)}">${avatar(p.id, 40)}</button><span><span class="vd-t">${esc(d.t)}</span><small>${esc(p.name)}, ${esc(p.role)}</small></span></li>`; }).join("")}</ul>
          <p class="small muted" style="margin:14px 0 0">In their own words, from what each person told us about their job.</p></div></div>
      <div class="play"><div class="pl-in"><span class="eyebrow">Where we play</span><p>${esc(s.whereWePlay)}</p></div><div class="pl-out"><span class="eyebrow">Where we stay out</span><p>${esc(s.whereWeDont)}</p></div></div>
      ${s.playConfirm ? `<p class="confirm-note"><span class="pill p-confirm">To confirm</span><span>${esc(s.playConfirm)}</span></p>` : ""}
      <div class="secthead st-h" id="team"><h2>Our team</h2><span class="small muted">There are only twelve of us. Hover or tap anyone to see what to ask them.</span></div>
      <section class="org-wrap"><div class="ask-find"><label for="ask-q">${icon("search", 16)}<span>I need help with</span></label><input id="ask-q" placeholder="landed costs, samples, photos..." autocomplete="off">
          <div class="ask-chips">${topics.map((t) => `<button class="mp-chip" data-ask="${esc(t)}">${esc(t)}</button>`).join("")}</div><span class="ask-n" id="ask-n" aria-live="polite"></span></div>
        <div class="org"><ul>${orgTree(root)}</ul></div>
        <div class="org-foot"><p class="confirm-note" style="margin:0"><span class="pill p-confirm">To confirm</span><span>${esc(s.orgNote)}</span></p><p class="small muted" style="margin:6px 0 0">${esc(s.orgExtra)} From Sam's org chart, August 2026.</p></div></section>
      <section class="st-next"><div><span class="eyebrow">New here?</span><h3>Follow the path for your first month</h3><p>Our story, your first weeks, our words and the checklist, then your own role.</p></div>
        <div class="st-next-b"><a class="btn gold" href="#/people">${icon("grow", 16)} Start the new starter path</a><a class="btn ghost" href="#/people/5">Take the quick quiz</a></div></section>`;
  };

  // ---------- Who We Serve: the customer types, then who's around the table in each one ----------
  // Layer 1: the channels. Layer 2: the people inside each (Mike's profile format), opened in a layered pop-up.
  const SHADE = ["#1F2A36", "#4A5D70", "#8A6A12", "#F2D477"];
  const profileOf = (ref) => { const [cid, rid] = String(ref || "").split(":"), ch = byId(H.channels, cid), r = ch && byId(ch.roles, rid); return r ? { ch, r } : null; };
  // The points of difference the battlecard puts first for this person (same order, same rule)
  const topPods = (role, n) => H.pods.map((p, i) => ({ p, s: cares(p, role), i })).sort((a, b) => b.s - a.s || a.i - b.i).slice(0, n).map((x) => x.p);
  const facesOf = (c, s) => `<span class="faces">${c.roles.map((r) => face(r.look, s)).join("")}</span>`;
  // Who We Serve: everyone we sell to, around one table. Pick a group and the people who aren't part of that deal grey out.
  // "Also involved" = someone from another group who matters in this one (the channel's alsoAt).
  const everyone = () => H.channels.flatMap((c) => c.roles.map((r) => ({ c, r, ref: c.id + ":" + r.id })));
  function seatAt(x, k, n, ch) {
    const a = -Math.PI / 2 + k * 2 * Math.PI / n, also = ch && x.c.id !== ch.id ? (ch.alsoAt || []).find((y) => y.ref === x.ref) : null;
    const state = !ch ? "" : x.c.id === ch.id ? " lit" : also ? " lit also" : " dim";
    return `<button class="ws-seat${state}" data-profile="${x.ref}" style="left:calc(50% + ${Math.cos(a).toFixed(3)} * (50% - 76px));top:calc(50% + ${Math.sin(a).toFixed(3)} * (50% - 64px))"${also ? ` title="${esc(also.why)}"` : ""}>${face(x.r.look, 58)}<b>${esc(x.r.name)}</b><small>${also ? "Also involved" : esc(x.c.short)}</small></button>`;
  }
  pages.serve = function (sub) {
    const ch = byId(H.channels, sub), all = everyone();
    const groups = `<div class="ws-groups" role="group" aria-label="Show a group"><a href="#/serve" class="${ch ? "" : "on"}"><b>Everyone</b><small>${all.length} people</small></a>${H.channels.map((c) => `<a href="#/serve/${c.id}" class="${ch && c.id === ch.id ? "on" : ""}"><b>${esc(c.short)}</b><small>${c.share}% of revenue</small></a>`).join("")}</div>`;
    const also = ch ? (ch.alsoAt || []).map((a) => ({ a, p: profileOf(a.ref) })).filter((x) => x.p) : [];
    const detail = !ch ? `<p class="ws-hint">${icon("users", 16)} Pick a group to see who's involved in that deal. Click anyone for their profile.</p>`
      : `<section class="ws-detail"><div class="ws-dh"><div><h2>${esc(ch.name)}</h2><p>${esc(ch.line)}</p></div><span class="small muted ws-own">Looked after by ${chip(ch.owner)}</span></div>
        <dl class="ws-facts"><div><dt>How they buy</dt><dd>${esc(ch.howTheyBuy)}</dd></div><div><dt>What they're worth to us</dt><dd>${esc(ch.worth)}</dd></div>${ch.askFirst ? `<div><dt>Ask this first</dt><dd>"${esc(ch.askFirst)}"</dd></div>` : ""}</dl>
        ${also.length ? `<p class="ws-alsonote"><b>Also involved:</b> ${also.map((x) => `<button class="flink" data-profile="${x.a.ref}">${esc(x.p.r.name)} (${esc(x.p.ch.short)})</button>. ${esc(x.a.why)}`).join(" ")}</p>` : ""}
        <h3>What they'll say, and what we say</h3>
        <table class="ws-objs"><tbody>${ch.objections.map((o) => `<tr><td>"${esc(o.q)}"</td><td>${esc(o.a)}</td></tr>`).join("")}</tbody></table>
        <div class="ws-foot"><a class="btn" href="#/toolkit?ch=${ch.id}">${icon("card", 16)} Build a battlecard for ${esc(ch.short)}</a><span class="small muted">Change a profile here and every battlecard uses the new version.</span></div></section>`;
    return header("serve", "Everyone we sell to, around one table. Pick a group to see who's involved in that deal, then click anyone for their profile.") +
      `${groups}<div class="ws-scene${ch ? " picked" : ""}"><div class="ws-table"><span>${ch ? esc(ch.short) : "Everyone we sell to"}</span><small>${ch ? `${ch.share}% of revenue · ${ch.roles.length} ${ch.roles.length === 1 ? "person" : "people"} in the deal${also.length ? ", plus " + also.length + " from another group" : ""}` : `${H.channels.length} groups, ${all.length} people`}</small></div>
        ${all.map((x, k) => seatAt(x, k, all.length, ch)).join("")}</div>
      ${H.serveConfirm ? `<p class="confirm-note"><span class="pill p-confirm">To confirm</span><span>${esc(H.serveConfirm)}</span></p>` : ""}${detail}`;
  };

  // The group at a glance, for links from other pages (meeting prep, search). Each person opens their profile.
  function channelPanel(id) {
    const c = byId(H.channels, id);
    openPanel(c.name, `${esc(c.short)} · ${c.share}% of revenue · Owner ${chip(c.owner)}`,
      `<p>${esc(c.line)}</p><h4>Who's involved</h4><div class="cp-people">${c.roles.map((r) => `<button class="cp-p" data-profile="${c.id}:${r.id}">${face(r.look, 48)}<span><b>${esc(r.name)}</b><small>${esc(r.seat)}</small></span>${icon("arrow", 15)}</button>`).join("")}</div>
      <h4>How they buy</h4><p>${esc(c.howTheyBuy)}</p>${c.askFirst ? `<h4>Ask this first</h4><p>"${esc(c.askFirst)}"</p>` : ""}
      <h4>What they'll say, and what we say</h4><table class="ws-objs"><tbody>${c.objections.map((o) => `<tr><td>"${esc(o.q)}"</td><td>${esc(o.a)}</td></tr>`).join("")}</tbody></table>
      <div class="pf-actions"><a class="btn" href="#/toolkit?ch=${c.id}">${icon("card", 16)} Battlecard for this group</a><a class="btn ghost" href="#/serve/${c.id}">See them at the table</a></div>`);
  }

  // One person's profile, layered: at a glance (who, the quote, the hook), then the full profile folded away
  function profilePanel(ref) {
    const p = profileOf(ref); if (!p) return;
    const { ch, r } = p, i = ch.roles.indexOf(r), next = ch.roles[(i + 1) % ch.roles.length];
    const list = (a) => `<ul>${(a || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    openPanel(r.name, `${esc(ch.name)} · Owner ${chip(ch.owner)}`,
      `<div class="pf-glance">${face(r.look, 104)}<div><span class="pill p-plain">${esc(r.seat)}</span><p class="pf-sum">${esc(r.summary)}</p></div></div>
      <blockquote class="pf-quote">"${esc(r.quote)}"</blockquote>
      <div class="pf-hook"><span class="eyebrow">The ${esc(H.company.short)} hook</span><p>${esc(r.hook)}</p>
        <div class="pf-pods">${topPods(r, 2).map((x) => `<a href="#/offer/pods" class="pf-pod"><b>${esc(x.name)}</b><small>${esc(x.proof)}</small></a>`).join("")}</div></div>
      <details class="pf-more"><summary>The full profile <small>Job titles, responsibility, goals, pain points, what decides it</small></summary>
        <div class="pf-grid"><div class="span2"><h4>Job titles they go by</h4><div class="pf-titles">${r.titles.map((t) => `<span class="pill p-plain">${esc(t)}</span>`).join("")}</div></div>
          <div class="span2"><h4>Responsibility</h4><p>${esc(r.resp)}</p></div>
          <div><h4>Goals and needs</h4>${list(r.goals)}</div><div><h4>Pain points</h4>${list(r.pains)}</div>
          <div class="span2"><h4>What decides it for them</h4>${list(r.drivers)}</div></div></details>
      <div class="pf-actions"><a class="btn" href="#/toolkit?ch=${ch.id}&role=${r.id}">${icon("card", 16)} Battlecard for this person</a>${ch.roles.length > 1 ? `<button class="btn ghost" data-profile="${ch.id}:${next.id}" data-swap="1">Next in this group: ${esc(next.name)} ${icon("arrow", 14)}</button>` : ""}</div>`);
  }

  // ---------- Range and Rivals ----------
  let offerTab = "range", cat = 0, gridSort = -1;
  const notKnown = '<span class="nk">Not known</span>';
  const ledBy = (p) => H.channels.flatMap((c) => c.roles.filter((r) => topPods(r, 3).includes(p)).map((r) => ({ c, r })));
  pages.offer = function (sub) {
    if (sub) offerTab = sub;
    const tabs = [["range", "What we sell"], ["pods", "Why we win"], ["rivals", "Competitors"], ["grid", "Comparison grid"]];
    let body = "";
    if (offerTab === "range") {
      const c = H.products.categories[cat] || H.products.categories[0];
      body = `<div class="catbar"><div class="seg">${H.products.categories.map((x, i) => `<button data-cat="${i}" class="${x === c ? "on" : ""}">${esc(x.name)}</button>`).join("")}</div><span class="small muted">${esc(c.range)}</span></div>
        <div class="cat-intro"><p>${esc(c.line)}</p>${c.sold ? `<div class="cat-sold"><span class="small muted">Bought by</span>${c.sold.map((id) => { const ch = byId(H.channels, id); return ch ? `<a class="buyer" href="#/serve/${ch.id}">${facesOf(ch, 22)}${esc(ch.short)}</a>` : ""; }).join("")}</div>` : ""}
          ${c.notFor ? `<p class="small muted" style="margin:0">${icon("info", 14)} ${esc(c.notFor)}</p>` : ""}</div>
        ${c.groups.map((g) => `${g.name ? `<h3 class="grp">${esc(g.name)}<span>${g.items.length}</span></h3>` : ""}<div class="grid">${g.items.map((p) => `<div class="card prod"><div class="art">${art(p.art, 110)}</div><div class="body"><h3>${esc(p.n)}</h3><p>${esc(p.d)}</p>${p.by ? `<div class="meta"><span>Done by ${roleChip(p.by)}</span></div>` : ""}</div></div>`).join("")}</div>`).join("")}
        <p class="src">${icon("info", 15)}<span>${esc(H.products.source)} ${esc(H.products.note)} ${H.products.shop ? `<a href="https://${H.products.shop}" target="_blank" rel="noopener">${esc(H.products.shop)}</a>` : ""}</span></p>`;
    } else if (offerTab === "pods") {
      body = `<p class="muted" style="max-width:760px">Every claim has proof behind it, where the proof comes from, and the words we actually use. The battlecard picks the top three for whoever you're meeting.</p>
        <div class="proofs">${H.pods.map((p, i) => `<article class="proof"><div class="pr-claim"><span class="num">${i + 1}</span><div><span class="eyebrow">${esc(p.name)}</span><h3>${esc(p.claim)}</h3></div></div>
          <div class="pr-proof"><div class="pr-stat"><b>${esc(p.stat)}</b><small>${esc(p.statLine)}</small></div><p class="pr-from">${icon("check", 15)}<span>From ${esc(p.from)}</span></p>${p.check ? `<p class="pr-check"><span class="pill p-confirm">To confirm</span> ${esc(p.check)}</p>` : ""}</div>
          <div class="pr-say"><span class="eyebrow">Say it like this</span><p>"${esc(p.say)}"</p></div>
          <div class="pr-who"><span class="small muted">On the battlecard first for</span>${ledBy(p).map((x) => `<button class="mini" data-profile="${x.c.id}:${x.r.id}" title="${esc(x.r.name + ", " + x.c.short)}">${face(x.r.look, 30)}</button>`).join("")}</div></article>`).join("")}</div>`;
    } else if (offerTab === "rivals") {
      const P = H.positioning, pos = (v) => (v - 1) / 4 * 100;
      body = `<div class="tip" style="margin-top:0">${icon("users", 18)}<span><b>Internal only.</b> Never put named competitor comparisons in anything a customer sees.</span></div>
        <h2>Where everyone sits</h2><div class="posmap"><span class="ax y">↑ ${esc(P.y)}</span><div class="plot"><span class="zone" style="left:${pos(2.4)}%;width:${pos(4) - pos(2.4)}%;bottom:${pos(3.6)}%;height:${100 - pos(3.6)}%"><em>Where we want to be: design-led, fairly priced</em></span>${P.points.map((p) => { const c = byId(H.competitors, p.id); return `<button class="dotp ${p.id === "halflight" ? "us" : ""}${p.x > 4 ? " edge" : p.x < 1.8 ? " ledge" : ""}" ${c ? `data-rival="${c.id}"` : ""} style="left:${pos(p.x)}%;bottom:${pos(p.y)}%"><span>${esc(c ? c.name.split(" ")[0] : H.company.short)}</span><i></i></button>`; }).join("")}</div><span class="ax x">${esc(P.x)} →</span></div>
        ${P.by ? `<p class="mapnote">${icon("users", 15)}<span><b>${esc(P.by)}.</b> Last reviewed ${fmtDate(P.reviewed)}. The shaded area is where we want to be. Click a dot to open their card.</span></p>` : ""}
        <h2>Competitor cards</h2><div class="grid wide">${H.competitors.map((c) => `<button class="card rcard" data-rival="${c.id}"><span class="arrow-go">${icon("arrow")}</span><div class="rc-top"><span class="mono">${esc(initials(c.name))}</span><div><span class="eyebrow">${esc(c.tier)}</span><h3>${esc(c.name)}</h3></div></div><p>${esc(c.who)}</p><div class="meta"><span class="rc-web">${c.web ? icon("open", 13) + esc(c.web) : "Website not known"}</span><span style="display:flex;gap:6px;align-items:center">${reviewPill(c.reviewed, c.owner)}${avatar(c.owner, 22)}</span></div></button>`).join("")}</div>
        <div class="review no-print" style="margin-top:22px"><div class="rv-head"><span class="pill p-ink">Review</span><b>Fields on a competitor card</b><span class="small muted">The same fields for every company. The admin switches them on or off; an empty field shows "Not known". The first three show first, the rest fold away.</span></div>
          <div class="rv-row rf-row">${H.rivalFields.map((f) => `<button class="rf${f.on ? " on" : ""}" data-rfield="${f.k}" aria-pressed="${f.on}">${f.on ? icon("check", 13) : ""}${esc(f.label)}${f.top ? " <small>first</small>" : ""}</button>`).join("")}</div></div>`;
    } else {
      const g = H.compareGrid, rows = g.rows.slice();
      if (gridSort >= 0) rows.sort((a, b) => b.scores[gridSort] - a.scores[gridSort]);
      body = `<p class="muted">What buyers care about, scored 1 to 5. We're honest about our own scores: we're not the cheapest. Click a heading to sort by it.</p>
        <div style="overflow-x:auto"><table class="t cgrid"><thead><tr><th></th>${g.criteria.map((c, i) => `<th class="${i === gridSort ? "on" : ""}"><button data-gsort="${i}">${esc(c)}${i === gridSort ? " ↓" : ""}</button></th>`).join("")}</tr></thead><tbody>${rows.map((r) => {
        const c = byId(H.competitors, r.id);
        return `<tr class="${r.id === "halflight" ? "us" : ""}"><td>${c ? `<a href="#" data-rival="${c.id}">${esc(c.name)}</a>` : esc(r.name)}</td>${r.scores.map((s, i) => `<td class="${i === gridSort ? "on" : ""}"><span class="score" title="${s} of 5">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= s ? "f" : ""}"></i>`).join("")}</span></td>`).join("")}</tr>`;
      }).join("")}</tbody></table></div>
        ${g.by ? `<p class="mapnote">${icon("users", 15)}<span><b>${esc(g.by)}.</b> Last reviewed ${fmtDate(g.reviewed)}. The criteria are what ${esc(H.company.short)} chose; any company can use its own.</span></p>` : ""}`;
    }
    return header("offer") + `<div class="seg no-print" style="margin-top:24px">${tabs.map((t) => `<button data-tab="${t[0]}" class="${offerTab === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div><div style="margin-top:8px">${body}</div>`;
  };

  // Competitor pop-up: short. One line, their website, three points first; every other switched-on field folds away.
  function rivalPanel(id) {
    const c = byId(H.competitors, id), F = H.rivalFields.filter((f) => f.on), top = F.filter((f) => f.top), rest = F.filter((f) => !f.top);
    const val = (f) => {
      let v = c[f.k];
      if (f.k === "beatWith") v = (v || []).map((p) => byId(H.pods, p)).filter(Boolean).map((p) => p.name);
      if (Array.isArray(v)) return v.length ? `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : notKnown;
      return v ? esc(v) : notKnown;
    };
    openPanel(c.name, `${esc(c.tier)} · Owner ${chip(c.owner)}${reviewPill(c.reviewed, c.owner) ? " · " + reviewPill(c.reviewed, c.owner) : ""}`,
      `<div class="rv-top"><span class="mono lg">${esc(initials(c.name))}</span><div><p>${esc(c.who)}</p>${c.web ? `<a class="weblink" href="https://${esc(c.web)}" target="_blank" rel="noopener" title="Demo address: it goes nowhere">${icon("open", 14)} ${esc(c.web)}</a>` : `<span class="weblink none">Website: ${notKnown}</span>`}</div></div>
      <div class="rv-three">${top.map((f) => `<div class="rv-pt pt-${f.k}"><span class="eyebrow">${esc(f.label)}</span><p>${val(f)}</p></div>`).join("")}</div>
      ${rest.length ? `<details class="pf-more"><summary>More about ${esc(c.name.split(" ")[0])} <small>${esc(rest.slice(0, 2).map((f) => f.label).join(", "))}${rest.length > 2 ? " and " + (rest.length - 2) + " more" : ""}</small></summary><dl class="rv-dl">${rest.map((f) => `<dt>${esc(f.label)}</dt><dd>${val(f)}</dd>`).join("")}</dl></details>` : ""}
      <div class="pf-actions"><a class="btn" href="#/toolkit?vs=${c.id}">${icon("card", 16)} Battlecard against ${esc(c.name.split(" ")[0])}</a><span class="small muted">Last reviewed ${fmtDate(c.reviewed)}. Reviewed at least every quarter.</span></div>`);
  }

  // ---------- How We Work: a hub within the hub ----------
  // The client's journey runs along the bottom of the map; each team's lane sits above it.
  // "Show my steps", the sales layout switch and gap changes are on screen only: nothing is saved.
  const wk = { me: "", layout: "linear", ch: "", stage: {}, gapf: "open", adding: false };
  const flowId = (id) => (id === "orders" ? "ops" : id); // links from version 2
  const gapById = (id) => byId(H.gaps, id);
  const live = (g) => !!g && g.status !== "Resolved";
  const nameIn = (txt, id) => !!id && new RegExp("\\b" + person(id).name + "\\b").test(txt || "");
  const taskFor = (t, ch) => !ch || !t.ch || t.ch.includes(ch);
  const stageFor = (s, ch) => s.tasks.some((t) => taskFor(t, ch));
  const stageMine = (s, me) => !!me && (rolePeople(s.who).includes(me) || s.tasks.some((t) => taskMine(t, me)));
  const stageGaps = (fid, s) => H.gaps.filter((g) => live(g) && (g.at === fid + ":" + s.id || s.tasks.some((t) => t.gap === g.id)));
  const isSales = (f) => f.stages.some((s) => s.tasks.some((t) => t.ch));
  const chName = (id) => (byId(H.channels, id) || {}).short || "";
  const whereLabel = (at) => { const [fid, sid] = at.split(":"), f = H.flows[fid], s = f && byId(f.stages, sid); return f ? f.short + (s ? " › " + s.name : "") : ""; };
  const today = () => new Date().toISOString().slice(0, 10);
  // Roles: tasks and stages name a role; who is in it lives once, in H.roles (hover a role to see them)
  const roleOf = (id) => byId(H.roles, id);
  const roleName = (id) => (roleOf(id) || {}).name || "";
  const rolePeople = (ids) => [...new Set((ids || []).flatMap((id) => (roleOf(id) || { people: [] }).people))];
  const roleChip = (id) => `<span class="role tipped" data-tip="${esc(rolePeople([id]).map((p) => person(p).name).join(", "))}">${esc(roleName(id))}</span>`;
  const taskMine = (t, me) => !!me && (rolePeople(t.by).includes(me) || nameIn(t.who, me));

  function mePicker() {
    return `<label class="me-pick no-print">${icon("user", 15)}<span>Show my steps</span><select id="wk-me"><option value="">Choose your name</option>${H.people.map((p) => `<option value="${p.id}"${p.id === wk.me ? " selected" : ""}>${esc(p.name)} (${esc(p.team)})</option>`).join("")}</select></label>`;
  }
  const gapBtn = (n, label, href) => n ? `<a class="gapbtn" href="${href}"><span class="gapdot"></span><b>${n}</b> ${label}</a>` : "";
  const journeyRow = (J, row) => `<div class="jband" style="grid-row:${row}"></div><div class="jlabel" style="grid-row:${row}">The client's journey</div>` +
    J.map((j, ji) => `<div class="jchev" style="grid-row:${row};grid-column:${ji + 2}" title="${esc(j.line)}"><b>${esc(j.name)}</b></div>`).join("");

  pages.work = function (sub, q) {
    if (sub === "gaps") return gapsPage(q || {});
    if (sub) return lanePage(flowId(sub), q || {});
    return workMap();
  };

  // The whole business on one page: lanes above, the client's journey along the bottom, handovers numbered
  function workMap() {
    const W = H.work, J = W.journey, lanes = W.lanes.map((id) => ({ id, f: H.flows[id] }));
    const open = H.gaps.filter(live).length, ho = W.handovers.map((h, i) => [h.from, h.to, i + 1]);
    let g = J.map((j, ji) => `<div class="bm-col" style="grid-column:${ji + 2};grid-row:1/${lanes.length + 1}"></div>`).join("");
    lanes.forEach((l, li) => {
      const row = li + 1;
      g += `<div class="bm-band${li % 2 ? " alt" : ""}" style="grid-row:${row}"></div>
        <a class="bm-lane" href="#/work/${l.id}" style="grid-row:${row}"><span class="ico sm">${icon(l.f.icon, 16)}</span><b>${esc(l.f.short)}</b></a>`;
      J.forEach((j, ji) => {
        const here = l.f.stages.filter((s) => s.j === j.id);
        if (here.length) g += `<div class="bm-cell" style="grid-row:${row};grid-column:${ji + 2}">${here.map((s) => `<a class="bm-st${stageMine(s, wk.me) ? " mine" : ""}" data-k="${l.id}:${s.id}" href="#/work/${l.id}?stage=${s.id}" title="${esc(s.line)}"><span>${esc(s.name)}</span>${stageGaps(l.id, s).length ? '<span class="gapdot" title="Has a gap"></span>' : ""}</a>`).join("")}</div>`;
      });
    });
    g += journeyRow(J, lanes.length + 1);
    const list = lanes.map((l) => `<div class="card bml"><a class="bml-h" href="#/work/${l.id}"><span class="ico sm">${icon(l.f.icon, 16)}</span><b>${esc(l.f.name)}</b>${icon("arrow", 16)}</a>
      <ol>${l.f.stages.map((s) => `<li class="${stageMine(s, wk.me) ? "mine" : ""}"><a href="#/work/${l.id}?stage=${s.id}">${esc(s.name)}</a>${stageGaps(l.id, s).length ? '<span class="gapdot"></span>' : ""}<small>${esc(byId(J, s.j).name)}</small></li>`).join("")}</ol></div>`).join("");
    const hoList = W.handovers.map((h, i) => `<li><span class="hn">${i + 1}</span><span><b>${esc(H.flows[h.from.split(":")[0]].short)} to ${esc(H.flows[h.to.split(":")[0]].short)}.</b> ${esc(h.t)}</span></li>`).join("");
    const bts = W.behind.map((b) => {
      const inner = `<b>${esc(b.name)}</b><small>${esc(b.line)}</small><span class="bts-o">${avatar(b.owner, 20)} ${esc(person(b.owner).name)}${H.flows[b.id] ? `<span class="pill p-plain">Mapped</span>` : ""}</span>`;
      return H.flows[b.id] ? `<a class="bts-i" href="#/work/${b.id}">${inner}</a>` : `<button class="bts-i" data-bts="${b.id}">${inner}</button>`;
    }).join("");
    const right = `<div class="wk-actions no-print">${gapBtn(open, "gaps to sort", "#/work/gaps")}<button class="btn ghost sm" data-print="1">${icon("print", 15)} Print the map</button></div>`;
    return header("work", "The whole business on one page. The client's journey runs along the bottom, and each team's lane sits above it. Click a lane for its process, or a stage for its tasks.", right) +
      `<div class="wk-bar">${mePicker()}${wk.me ? `<span class="small muted">Your stages are lit up. <a href="#" data-meclear="1">Clear</a></span>` : ""}</div>
      <div class="bmap links${wk.me ? " has-mine" : ""}" data-dir="v" data-links='${JSON.stringify(ho)}' style="grid-template-columns:150px repeat(${J.length},minmax(0,1fr))"><svg class="wires" aria-hidden="true"></svg><div class="hn-layer"></div>${g}</div>
      <div class="bml-list${wk.me ? " has-mine" : ""}">${list}</div>
      <div class="wk-two"><div><h2>Handovers between teams</h2><ol class="ho-list">${hoList}</ol></div>
        <div><h2>Behind the scenes</h2><p class="muted small" style="margin:-6px 0 12px">Work that keeps ${esc(H.company.short)} running but isn't on the client's journey.</p><div class="bts">${bts}</div></div></div>`;
  }

  // One lane (or behind-the-scenes process): its stages, then the open stage's detail
  function lanePage(fid, q) {
    const f = H.flows[fid];
    if (!f) return notFound();
    if (q.stage && byId(f.stages, q.stage)) wk.stage[fid] = q.stage;
    const sales = isSales(f), ch = sales ? wk.ch : "", layout = sales ? wk.layout : "linear";
    const mine = wk.me ? f.stages.filter((s) => stageMine(s, wk.me)).map((s) => s.id) : null;
    let sid = wk.stage[fid];
    if (!byId(f.stages, sid)) sid = (mine && mine[0]) || f.stages[0].id;
    wk.stage[fid] = sid;
    const gl = H.gaps.filter((g) => live(g) && g.at.split(":")[0] === fid).length;
    let body = "";
    if (layout === "branch") body = branchView(fid, sid);
    else if (layout === "pipes") body = pipeView(fid, sid);
    else {
      if (sales) body += `<div class="chrow no-print"><span class="small muted">Tasks for</span><div class="seg sm">${[["", "All channels"], ...H.channels.map((c) => [c.id, c.short])].map((c) => `<button data-wkch="${c[0]}" class="${wk.ch === c[0] ? "on" : ""}">${esc(c[1])}</button>`).join("")}</div></div>`;
      if (f.stages.length > 1) body += stageLine(fid, { mine, active: sid, dim: ch ? f.stages.filter((s) => !stageFor(s, ch)).map((s) => s.id) : null });
    }
    const solo = f.stages.length < 2;
    return `<a class="small backlink" href="#/work">${icon("back", 13)} The whole business</a>
      ${f.behind ? "" : `<nav class="lanenav no-print" aria-label="Lanes">${H.work.lanes.map((id) => `<a href="#/work/${id}" class="${id === fid ? "on" : ""}">${icon(H.flows[id].icon, 15)}${esc(H.flows[id].short)}</a>`).join("")}</nav>`}
      <div class="pagehead" style="margin-top:16px"><div><span class="areatag">${icon(f.icon, 13)} How We Work · ${f.behind ? "Behind the scenes" : "Lane"}</span><h1>${esc(f.name)}</h1><p class="lede">${esc(f.line)}</p></div>
        <div class="wk-actions no-print">${gapBtn(gl, gl > 1 ? "gaps here" : "gap here", "#/work/gaps?lane=" + fid)}</div></div>
      <div class="wk-bar">${mePicker()}</div>
      ${sales ? salesSwitch() : ""}${body}
      <div id="sd-${fid}" data-ctx="work">${stageDetail(fid, sid, { ch, me: wk.me, solo })}</div>`;
  }

  // Review only: all three sales layouts, so Mike can pick one. Removed before clients see the hub.
  const LAYOUTS = [["linear", "One line", "One sales process for every channel. Pick a channel to see only its tasks."], ["branch", "Branching", "One start, a branch for each channel, joining again at Won."], ["pipes", "Pipelines by channel", "One row per channel, against the client's journey."]];
  function salesSwitch() {
    const cur = LAYOUTS.find((l) => l[0] === wk.layout);
    return `<div class="review no-print"><div class="rv-head"><span class="pill p-ink">Review</span><b>Three ways to show the sales process</b><span class="small muted">For Think Right and Mike. One gets picked; the switch comes out before any client sees the hub.</span></div>
      <div class="rv-row"><div class="seg">${LAYOUTS.map((l) => `<button data-wklayout="${l[0]}" class="${wk.layout === l[0] ? "on" : ""}">${l[1]}</button>`).join("")}</div><span class="small muted">${esc(cur[2])}</span></div></div>`;
  }
  const brNode = (fid, s, sid, c, k) => { const f = H.flows[fid]; return `<button class="br-n${s.id === sid && (!c || !wk.ch || c === wk.ch) ? " on" : ""}${stageMine(s, wk.me) ? " mine" : ""}" data-stage="${fid}:${s.id}" data-ch="${c || ""}"${k ? ` data-k="${k}"` : ""}><span class="br-num">${f.stages.indexOf(s) + 1}</span>${esc(s.name)}${stageGaps(fid, s).length ? '<span class="gapdot"></span>' : ""}</button>`; };
  function branchView(fid, sid) {
    const f = H.flows[fid], first = f.stages[0], last = f.stages[f.stages.length - 1], mid = f.stages.slice(1, -1), links = [];
    const rows = H.channels.map((c, i) => {
      const st = mid.filter((s) => stageFor(s, c.id));
      st.forEach((s, j) => links.push([j ? `r${i}-${j - 1}` : "start", `r${i}-${j}`]));
      links.push([st.length ? `r${i}-${st.length - 1}` : "start", "end"]);
      return `<div class="br-row"><span class="br-lbl">${esc(c.short)}</span><div class="br-chain">${st.map((s, j) => brNode(fid, s, sid, c.id, `r${i}-${j}`)).join("")}</div></div>`;
    }).join("");
    return `<div class="branch links${wk.me ? " has-mine" : ""}" data-dir="h" data-links='${JSON.stringify(links)}'><svg class="wires" aria-hidden="true"></svg>
      <div class="br-start"><span class="br-lbl">Every enquiry</span>${brNode(fid, first, sid, "", "start")}</div><div class="br-rows">${rows}</div><div class="br-end"><span class="br-lbl">Every channel</span>${brNode(fid, last, sid, "", "end")}</div></div>`;
  }
  function pipeView(fid, sid) {
    const f = H.flows[fid], J = H.work.journey.filter((j) => f.stages.some((s) => s.j === j.id));
    let g = "";
    H.channels.forEach((c, ci) => {
      g += `<div class="bm-band${ci % 2 ? " alt" : ""}" style="grid-row:${ci + 1}"></div><div class="pp-lbl" style="grid-row:${ci + 1}"><b>${esc(c.short)}</b><small>${esc(c.name)}</small></div>`;
      J.forEach((j, ji) => { g += `<div class="pp-cell" style="grid-row:${ci + 1};grid-column:${ji + 2}">${f.stages.filter((s) => s.j === j.id && stageFor(s, c.id)).map((s) => brNode(fid, s, sid, c.id)).join("")}</div>`; });
    });
    return `<div class="pipes-wrap"><div class="pipes${wk.me ? " has-mine" : ""}" style="grid-template-columns:150px repeat(${J.length},minmax(0,1fr))">${g}${journeyRow(J, H.channels.length + 1)}</div></div>`;
  }

  // Gaps: tracked, not just listed. Assign, change status or add one; on screen only in the demo.
  const GAPF = { open: ["Open", (g) => g.status === "Open"], hand: ["In hand", (g) => g.status === "In hand"], done: ["Resolved", (g) => g.status === "Resolved"], all: ["All", () => true] };
  const pplOpts = (sel) => `<option value="">Not assigned</option>` + H.people.map((p) => `<option value="${p.id}"${p.id === sel ? " selected" : ""}>${esc(p.name)}</option>`).join("");
  function gapsPage(q) {
    const lane = H.flows[q.lane] ? q.lane : "", inLane = (g) => !lane || g.at.split(":")[0] === lane;
    const list = H.gaps.filter((g) => inLane(g) && GAPF[wk.gapf][1](g)), count = (k) => H.gaps.filter((g) => inLane(g) && GAPF[k][1](g)).length;
    return `<a class="small backlink" href="#/work">${icon("back", 13)} The whole business</a>
      <div class="pagehead" style="margin-top:14px"><div><span class="areatag">${icon("flag", 13)} How We Work</span><h1>Gaps to sort</h1><p class="lede">Where the way we work doesn't match what we say, or where things get stuck or rest on one person. Each gap has someone looking after it until it's sorted.</p></div>
        ${wk.adding ? "" : `<button class="btn" data-gapnew="1">${icon("flag", 16)} Add a gap</button>`}</div>
      ${wk.adding ? gapForm(lane) : ""}
      <div class="gap-bar"><div class="seg">${Object.keys(GAPF).map((k) => `<button data-gapf="${k}" class="${wk.gapf === k ? "on" : ""}">${GAPF[k][0]} <span class="cnt">${count(k)}</span></button>`).join("")}</div>
        <label class="gap-lane">Lane <select id="gap-lane"><option value="">Every lane</option>${Object.keys(H.flows).map((fid) => `<option value="${fid}"${fid === lane ? " selected" : ""}>${esc(H.flows[fid].name)}</option>`).join("")}</select></label></div>
      <div class="gaplist">${list.length ? list.map(gapRow).join("") : `<p class="muted">No ${esc(GAPF[wk.gapf][0].toLowerCase())} gaps${lane ? " in this lane" : ""}.</p>`}</div>
      <p class="attach-note" style="margin-top:18px">${icon("info", 15)}<span><b>Demo only.</b> Assigning, changing a status and adding a gap work on screen, and are gone when you reload. Nothing is saved until the hub has a back end.</span></p>`;
  }
  function gapRow(g) {
    const [fid, sid] = g.at.split(":"), f = H.flows[fid], pill = { Open: "p-gap", "In hand": "p-confirm", Resolved: "p-ok" };
    const acts = { Open: "Reopen", "In hand": "Mark in hand", Resolved: "Mark resolved" };
    return `<article class="gap${g.status === "Resolved" ? " done" : ""}"><span class="gapdot"></span>
      <div class="gp-main"><div class="gp-top"><h3>${esc(g.t)}</h3><span class="pill ${pill[g.status]}">${esc(g.status)}</span></div><p>${esc(g.d)}</p>
        ${g.next ? `<p class="gp-next"><b>Next step:</b> ${esc(g.next)}</p>` : ""}
        <div class="gp-meta">${f ? `<a href="#/work/${fid}?stage=${sid}">${icon(f.icon, 13)} ${esc(whereLabel(g.at))}</a>` : ""}<span>${g.added ? "Added in the hub" : "From " + esc(g.from)}</span><span>Raised ${fmtDate(g.raised)}</span></div></div>
      <div class="gp-side"><label>Assigned to<select data-gapowner="${g.id}">${pplOpts(g.owner)}</select></label>
        <div class="gp-acts">${Object.keys(acts).filter((s) => s !== g.status).map((s) => `<button class="btn ghost sm" data-gapstatus="${g.id}|${s}">${s === "Resolved" ? icon("check", 14) + " " : ""}${acts[s]}</button>`).join("")}</div></div></article>`;
  }
  function gapForm(lane) {
    const where = Object.keys(H.flows).map((fid) => `<optgroup label="${esc(H.flows[fid].name)}">${H.flows[fid].stages.map((s) => `<option value="${fid}:${s.id}"${fid === lane && s === H.flows[fid].stages[0] ? " selected" : ""}>${esc(s.name)}</option>`).join("")}</optgroup>`).join("");
    return `<form class="card gap-new" id="gap-new"><h3>Add a gap</h3>
      <label>What's the gap?<input name="t" required placeholder="One line, for example: Plan requests skip the brief"></label>
      <label>What happens<textarea name="d" rows="3" placeholder="What goes wrong, and who noticed it"></textarea></label>
      <div class="gap-2"><label>Where<select name="at">${where}</select></label><label>Assign to<select name="owner">${pplOpts("")}</select></label></div>
      <div class="gap-2b"><button class="btn" type="submit">Add the gap</button><button class="btn ghost" type="button" data-gapnew="0">Cancel</button></div></form>`;
  }

  // Re-draw the page in place (keeps the scroll position) after a choice on the How We Work pages
  function refreshWork() {
    const r = route(); if (r.page !== "work") return;
    const y = window.scrollY;
    $("#content").innerHTML = pages.work(r.sub, r.query, r.extra);
    window.scrollTo(0, y);
    requestAnimationFrame(() => { drawLinks(); centreStage(); tbFilter(); });
  }
  // Connectors: handovers on the map (numbered, dashed) and the joins on the branching layout
  function drawLinks() {
    // On narrow screens the stage line scrolls sideways: keep the open stage in view
    $$(".sline-wrap").forEach((w) => { const on = $(".sl.on", w); if (!on || w.scrollWidth <= w.clientWidth) return; const d = on.getBoundingClientRect().left - w.getBoundingClientRect().left; if (d < 0 || d > w.clientWidth - 110) w.scrollLeft += d - 30; });
    $$(".links").forEach((root) => {
      const svg = $("svg.wires", root); if (!svg) return;
      if (!root.offsetParent || getComputedStyle(svg).display === "none") { svg.innerHTML = ""; return; }
      const box = root.getBoundingClientRect(), hz = root.dataset.dir === "h";
      svg.setAttribute("width", box.width); svg.setAttribute("height", box.height);
      let d = "", marks = "";
      JSON.parse(root.dataset.links || "[]").forEach(([fk, tk, n]) => {
        const a = $(`[data-k="${fk}"]`, root), b = $(`[data-k="${tk}"]`, root); if (!a || !b) return;
        const A = a.getBoundingClientRect(), B = b.getBoundingClientRect(), L = box.left, T = box.top;
        let c, mx, my;
        if (hz) {
          const x1 = A.right - L, y1 = A.top + A.height / 2 - T, x2 = B.left - L - 4, y2 = B.top + B.height / 2 - T, m = (x1 + x2) / 2;
          c = `M${x1} ${y1} C${m} ${y1}, ${m} ${y2}, ${x2} ${y2}`; mx = m; my = (y1 + y2) / 2;
        } else {
          const down = B.top > A.top, ax = A.left + A.width / 2 - L, x2 = B.left + B.width / 2 - L, y2 = (down ? B.top - 5 : B.bottom + 5) - T;
          if (Math.abs(ax - x2) < A.width / 2) { const y1 = (down ? A.bottom : A.top) - T, m = (y1 + y2) / 2; c = `M${ax} ${y1} C${ax} ${m}, ${x2} ${m}, ${x2} ${y2}`; mx = (ax + x2) / 2; my = m; }
          else { const x1 = (x2 > ax ? A.right : A.left) - L, y1 = A.top + A.height / 2 - T; c = `M${x1} ${y1} Q${x2} ${y1} ${x2} ${y2}`; mx = (x1 + 3 * x2) / 4; my = (3 * y1 + y2) / 4; }
        }
        d += `<path d="${c}" marker-end="url(#ah)"/>`;
        if (n) marks += `<span class="hn" style="left:${mx}px;top:${my}px">${n}</span>`;
      });
      svg.innerHTML = `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#8A6A12"/></marker></defs><g fill="none" stroke="#8A6A12" stroke-width="1.7"${hz ? "" : ' stroke-dasharray="5 4"'}>${d}</g>`;
      const ml = $(".hn-layer", root); if (ml) ml.innerHTML = marks;
    });
  }

  // ---------- stage line (shared by the dashboard and How We Work) ----------
  // mine: stage ids to highlight for the viewer (null = nobody picked). active: the open stage. dim: stages that don't apply.
  const stageOf = (key) => { const [fid, sid] = key.split(":"), f = H.flows[fid]; return { f, fid, s: f && byId(f.stages, sid) }; };
  const whoNames = (ids) => ids.map((id) => person(id).name).join(", ");
  function stageLine(fid, opts) {
    // attr: what a click does. "stage" opens it below the line, "stagepop" in the pop-up, "mpstage" picks it for meeting prep.
    const f = H.flows[fid], o = opts || {}, mine = o.mine || null, dim = o.dim || [], attr = o.attr || "stage";
    return `<div class="sline-wrap"><ol class="sline${mine ? " has-mine" : ""}" style="--n:${f.stages.length}">${f.stages.map((s, i) => `<li><button class="sl${mine && mine.includes(s.id) ? " mine" : ""}${o.active === s.id ? " on" : ""}${dim.includes(s.id) ? " dim" : ""}" data-${attr}="${fid}:${s.id}" aria-pressed="${o.active === s.id}"${dim.includes(s.id) && attr === "mpstage" ? " disabled" : ""}>
        <span class="sl-dot">${i + 1}</span><span class="sl-name">${esc(s.name)}</span>
        <span class="sl-tip" role="tooltip"><b>${esc(s.name)}</b>${esc(s.line)}<span class="sl-who">${esc(s.who.map(roleName).join(", "))}</span></span></button></li>`).join("")}</ol></div>`;
  }
  // A stage: its tasks first, then everything about the stage (done when, time standard, handover, our promise),
  // then documents, the battlecard and what to say. opts: ch = sales channel filter, me = "Show my steps", solo = stands alone.
  function stageDetail(fid, sid, opts) {
    const o = opts || {}, f = H.flows[fid], s = byId(f.stages, sid), i = f.stages.indexOf(s);
    const tasks = s.tasks.filter((t) => taskFor(t, o.ch));
    const facts = [["Done when", s.done], ["Time standard", s.standard], ["Hands over to", s.handover]].filter((x) => x[1]);
    const files = [...new Set(tasks.flatMap((t) => t.steps.map((x) => x.file).filter(Boolean)))];
    const stageOnly = H.gaps.filter((g) => live(g) && g.at === fid + ":" + s.id && !s.tasks.some((t) => t.gap === g.id));
    const say = s.say ? `<figure class="sd-say"><blockquote>“${esc(s.say.t)}”</blockquote><figcaption>${avatar(s.say.by, 26)}<span><b>${esc(person(s.say.by).name)}</b>, ${esc(person(s.say.by).role)}</span></figcaption></figure>` : "";
    const card = s.card ? `<a class="btn gold sm" href="#/toolkit?stage=${s.card}${o.ch ? "&ch=" + o.ch : ""}">${icon("card", 15)} Battlecard for this stage</a>` : "";
    // bare: in a pop-up, whose title already names the stage
    const head = o.bare ? (stageOnly.length ? `<div>${stageOnly.map(gapDot).join("")}</div>` : "") : `<span class="eyebrow">${f.stages.length > 1 ? `Stage ${i + 1} of ${f.stages.length} · ` : ""}${esc(f.name)}${o.ch ? " · " + esc(chName(o.ch)) : ""}</span><h3>${esc(s.name)}${stageOnly.map(gapDot).join("")}</h3>`;
    return `<div class="sdetail${o.solo ? " solo" : ""}${o.bare ? " bare" : ""}" data-flow="${fid}"><div class="sd-head"><div>${head}<p>${esc(s.line)}</p></div>
      <div class="sd-who">${s.who.map(roleChip).join("")}</div></div>
      ${tasks.length ? taskList(s, o) : `<p class="muted">No tasks for ${esc(chName(o.ch))} at this stage.</p>`}
      ${facts.length || s.promise ? `<h4 class="sd-h">About this stage</h4>` : ""}
      ${facts.length ? `<dl class="sd-facts">${facts.map((x) => `<div><dt>${x[0]}</dt><dd>${esc(x[1])}</dd></div>`).join("")}</dl>` : ""}
      ${s.promise ? `<div class="sd-promise">${icon("check", 16)}<span><b>What we promise</b> ${esc(s.promise)}</span></div>` : ""}
      ${say || files.length || card ? `<div class="sd-foot">${files.length || card ? `<div class="sd-side">${files.length ? `<span class="eyebrow">Documents at this stage</span><div class="sd-files">${files.map(fileChip).join("")}</div>` : ""}${card}</div>` : ""}${say}</div>` : ""}</div>`;
  }

  // ---------- task list: one plain numbered list per stage ----------
  // Each row: the task, the role that does it, and when it's due. Amber dot = a gap (hover or tap to read it).
  // Open a task to see its steps, with any document linked right on the step.
  const fileChip = (id) => { const r = byId(H.resources, id); return r ? `<button class="fchip" data-res="${r.id}" title="${esc(r.type)}">${icon("clip", 13)}<span>${esc(r.title)}</span></button>` : ""; };
  const fileLink = (id) => { const r = byId(H.resources, id); return r ? ` <button class="flink" data-res="${r.id}">${icon("clip", 13)}${esc(r.title)}</button>` : ""; };
  const gapDot = (g) => `<span class="gaptag tipped" tabindex="0" role="note" aria-label="Gap: ${esc(g.t)}" data-tip="Gap: ${esc(g.t)}&#10;${esc(g.d)}&#10;${g.owner ? "With " + esc(person(g.owner).name) : "Not assigned yet"} · ${esc(g.status)}"><span class="gapdot"></span>Gap</span>`;
  function taskList(stage, opts) {
    const o = opts || {}, list = stage.tasks.filter((t) => taskFor(t, o.ch)), one = list.length === 1;
    return `<ol class="tasks${one ? " single" : ""}">${list.map((t, i) => {
      const g = gapById(t.gap), gap = live(g) ? g : null, me = taskMine(t, o.me);
      const who = t.by ? t.by.map(roleChip).join("") : `<span class="role">${esc(t.who)}</span>`;
      return `<li class="tk${one ? " open" : ""}${me ? " me" : ""}"><div class="tk-row" data-task role="button" tabindex="${one ? -1 : 0}" aria-expanded="${one}"><span class="tk-n">${i + 1}</span><span class="tk-t">${esc(t.t)}${gap ? gapDot(gap) : ""}${me ? '<span class="tk-you">You</span>' : ""}</span>
          <span class="tk-who">${who}</span>${t.time ? `<span class="tk-time">${icon("clock", 14)}${esc(t.time)}</span>` : ""}${one ? "" : `<span class="tk-chev">${icon("chev", 16)}</span>`}</div>
        <div class="tk-body"><div class="tk-inner">
          <ol class="tk-steps">${t.steps.map((s) => `<li><span class="st">${gloss(s.t)}${s.file ? fileLink(s.file) : ""}</span></li>`).join("")}</ol>
          ${t.sys ? `<p class="tk-sys">${icon("screen", 13)} Done in ${esc(t.sys)}</p>` : ""}
        </div></div></li>`;
    }).join("")}</ol>`;
  }
  function selectStage(key, ch) {
    const { fid, s } = stageOf(key); if (!s) return;
    const d = $(`#sd-${fid}`);
    wk.stage[fid] = s.id;
    if (fid === "sales") blk.stage = s.id;
    if (d && d.dataset.ctx === "work") {
      if (ch !== undefined) wk.ch = ch;
      history.replaceState(null, "", `#/work/${fid}?stage=${s.id}`);
      refreshWork();
      return;
    }
    $$(`[data-stage^="${fid}:"]`).forEach((b) => { const on = b.dataset.stage === key; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    if (d) d.innerHTML = stageDetail(fid, s.id);
  }

  // ---------- building blocks: review page for Think Right (removed before clients see the hub) ----------
  const blk = { role: "sales", stage: "" };
  pages.blocks = function () {
    const v = byId(H.roleViews, blk.role), f = H.flows.sales;
    const mine = v && v.people ? f.stages.filter((s) => rolePeople(s.who).some((id) => v.people.includes(id))).map((s) => s.id) : null;
    if (!blk.stage) blk.stage = (mine && mine[0]) || f.stages[0].id;
    return `<span class="areatag">${icon("spark", 13)} For Think Right's review only</span><h1>Building blocks</h1>
      <p class="lede">The shared pieces every page in version 3 is built from. This page is for Mariah and Mike to try them in one place. It's taken out before any client sees the hub.</p>
      <section class="blk"><div class="blk-head"><span class="num">1</span><div><h2>Stage line and task list</h2><p class="muted">One line for the whole process. Your role's stages light up. Hover a stage for a glance, click it for its tasks. Click a task to open it in place.</p></div></div>
        <div class="viewas-l"><span class="small muted">Show my stages for</span><div class="seg">${H.roleViews.filter((r) => r.people).map((r) => `<button data-blkrole="${r.id}" class="${r.id === blk.role ? "on" : ""}">${esc(r.name)}</button>`).join("")}</div></div>
        ${stageLine("sales", { mine, active: blk.stage })}
        <div id="sd-sales">${stageDetail("sales", blk.stage)}</div>
        <p class="small muted" style="margin-top:12px">${icon("clip", 13)} has an attachment &nbsp; <span class="gapdot" style="display:inline-block;vertical-align:middle"></span> a gap to sort out. Lighting plan and Won have one task each, so it's already open.</p></section>
      <section class="blk"><div class="blk-head"><span class="num">2</span><div><h2>Centred pop-up</h2><p class="muted">Replaces the side panel everywhere. You never leave the page you're on. A link inside a pop-up swaps what's in it, with a way back, so there's never a pop-up on top of a pop-up.</p></div></div>
        <div class="tryrow"><button class="btn ghost" data-res="r-quote">${icon("file", 16)} A Toolbox document</button><button class="btn ghost" data-rival="vantelle">${icon("bulb", 16)} A competitor</button><button class="btn ghost" data-channel="specifiers">${icon("users", 16)} A customer channel</button><button class="btn ghost" data-person="ellie">${icon("user", 16)} A person</button></div></section>
      <section class="blk"><div class="blk-head"><span class="num">3</span><div><h2>Attach a file</h2><p class="muted">Wherever a document or report lives: the Toolbox, Suggest a change and the Scoreboard. Try it.</p></div></div>
        <div style="max-width:560px">${attachBox()}</div></section>
      <section class="blk"><div class="blk-head"><span class="num">4</span><div><h2>Ownership strip</h2><p class="muted">Bottom left of every page: who looks after it, when it was last reviewed, and Suggest a change. It always shows the owner of the page you're on.</p></div></div>
        <div class="ownstrip demo">${stripHtml(ownership(route()))}</div></section>`;
  };

  // ---------- Toolbox: the real documents, by shared-drive folder ----------
  // Everything opens in the centred pop-up, so you stay on the page. Every document can take an attached file (nothing is saved in the demo).
  const tb = { folder: "", view: "all", q: "" };
  const RECENT_DAYS = 60;
  const docText = (r) => (r.doc || []).flatMap((b) => b[0] === "tbl" ? [...b[1], ...b[2].flat()] : b[0] === "mail" ? [b[1], b[2]] : [].concat(b[1])).join(" ");
  // "Recently changed": the last 60 days, newest first. If nothing is that recent, the latest six instead.
  function recentDocs() {
    const all = H.resources.filter((r) => r.changed).sort((a, b) => b.changed.localeCompare(a.changed));
    const fresh = all.filter((r) => daysSince(r.changed) <= RECENT_DAYS);
    return fresh.length >= 3 ? { list: fresh, old: false } : { list: all.slice(0, 6), old: true };
  }
  // A small picture of the document's first lines, in its own kind of paper
  function thumb(r) {
    const lines = [];
    (r.doc || []).forEach((b) => {
      const k = b[0];
      if (k === "h" || k === "mail") lines.push(`<b>${esc(b[1])}</b>`);
      else if (k === "p" || k === "meta") lines.push(esc(b[1]));
      else if (k === "hand" || k === "sticky") lines.push(`<i>${esc(b[1])}</i>`);
      else if (k === "tbl") lines.push(`<span class="th-tbl">${b[1].slice(0, 4).map((c) => `<span>${esc(c)}</span>`).join("")}</span>`);
      else (b[1] || []).forEach((x) => lines.push((k === "check" ? "&#9744; " : k === "fields" ? "" : "&middot; ") + esc(x) + (k === "fields" ? " ______" : "")));
    });
    return `<span class="th th-${r.paper}" aria-hidden="true">${r.url ? `<span class="th-url">${esc(r.url)}</span>` : ""}<span class="th-t">${esc(r.title)}</span>${lines.slice(0, 7).map((l) => `<span class="th-l">${l}</span>`).join("")}</span>`;
  }
  const findText = (r) => esc((r.title + " " + r.type + " " + r.folder + " " + r.format + " " + person(r.owner).name + " " + docText(r)).toLowerCase());
  function tbCard(r) {
    const fresh = r.changed && daysSince(r.changed) <= RECENT_DAYS;
    return `<article class="tb-card${r.missing ? " missing" : ""}" data-find="${findText(r)}">
      <button class="tb-open" data-res="${r.id}">${thumb(r)}<span class="tb-fmt">${esc(r.format)}${r.version ? " · " + esc(r.version) : ""}</span>
        <span class="tb-txt"><span class="eyebrow">${esc(r.type)}</span><b>${esc(r.title)}</b><small>${esc(r.when)}</small></span></button>
      <div class="tb-foot">${avatar(r.owner, 24)}<span class="tb-own">${esc(person(r.owner).name)}<small>${r.missing ? "Not made yet" : fresh ? "Changed " + fmtDate(r.changed) : "Reviewed " + fmtDate(r.reviewed)}</small></span>
        ${r.missing ? '<span class="pill p-confirm">To make</span>' : r.confirm ? '<span class="pill p-confirm">To confirm</span>' : fresh ? '<span class="pill p-plain">Changed</span>' : ""}${reviewPill(r.reviewed, r.owner)}
        <button class="tb-att" data-resattach="${r.id}" aria-label="Attach a file to ${esc(r.title)}" title="Attach a file">${icon("clip", 16)}</button></div></article>`;
  }
  function tbTimeline(list) {
    return `<ol class="tb-time">${list.map((r) => { const d = r.changed.split("-"); return `<li data-find="${findText(r)}"><span class="tt-date"><b>${+d[2]}</b>${MONTHS[+d[1] - 1]}${daysSince(r.changed) > 300 ? " " + d[0] : ""}</span>
      <button class="tt-card" data-res="${r.id}">${thumb(r)}<span class="tt-body"><span class="eyebrow">${esc(r.folder)} · ${esc(r.format)}</span><b>${esc(r.title)}</b><span class="tt-what">${esc(r.change)}</span>
      ${r.confirm ? `<span class="tt-conf"><span class="pill p-confirm">To confirm</span> ${esc(r.confirm)}</span>` : ""}<span class="tt-by">${avatar(r.by, 22)} Changed by ${esc(person(r.by).name)}</span></span></button></li>`; }).join("")}</ol>`;
  }
  pages.library = function () {
    const folders = [...new Set(H.resources.map((r) => r.folder))];
    const inFolder = (r) => !tb.folder || r.folder === tb.folder;
    const rec = recentDocs(), recent = rec.list.filter(inFolder);
    const count = (f) => H.resources.filter((r) => !f || r.folder === f).length;
    return header("library", "The templates, checklists and forms we actually use, in our own words. Open one to read it, see where it lives, or attach a file to it.") +
      `<div class="tb">
        <nav class="tb-rail" aria-label="Folders"><span class="tb-drive">${icon("folder", 15)} Shared drive</span>
          ${["", ...folders].map((f) => `<button data-lib="${esc(f)}" class="${f === tb.folder ? "on" : ""}">${icon(f ? "folder" : "file", 16)}<span>${f ? esc(f) : "Everything"}</span><i>${count(f)}</i></button>`).join("")}
          <p class="tb-railnote">Folders as Sam listed them. ${esc(person(area("library").owner).name)} keeps the templates folder.</p></nav>
        <div class="tb-main">
          <div class="tb-bar"><div class="seg"><button data-tbview="all" class="${tb.view === "all" ? "on" : ""}">All documents</button><button data-tbview="recent" class="${tb.view === "recent" ? "on" : ""}">${icon("clock", 14)} Recently changed <span class="cnt">${recent.length}</span></button></div>
            <label class="tb-find">${icon("search", 16)}<input id="tb-q" type="search" placeholder="Find a document, or a word in one" value="${esc(tb.q)}" autocomplete="off" aria-label="Find a document"></label></div>
          ${tb.view === "recent"
            ? `<p class="small muted tb-note">${rec.old ? "Nothing has changed in the last 60 days, so these are the latest changes." : "Changed in the last 60 days, newest first: what changed, and who changed it."}${tb.folder ? " In " + esc(tb.folder) + " only." : ""}</p>${recent.length ? tbTimeline(recent) : '<p class="muted">Nothing recent in this folder.</p>'}`
            : `<div class="tb-grid">${H.resources.filter(inFolder).map(tbCard).join("")}</div>`}
          <p class="tb-empty" hidden>Nothing found. Ask ${chip(area("library").owner)}, who looks after the Toolbox, or use "Suggest a change" so it gets added.</p>
        </div></div>`;
  };
  // Hide what doesn't match the search box, without redrawing (so typing isn't interrupted)
  function tbFilter() {
    const q = tb.q.trim().toLowerCase(); let n = 0;
    $$(".tb [data-find]").forEach((c) => { const hit = !q || c.dataset.find.includes(q); c.hidden = !hit; if (hit) n++; });
    const e = $(".tb-empty"); if (e) e.hidden = !q || n > 0;
  }

  // The document itself, drawn on its own kind of paper
  const DZ = {
    h: (b) => `<h5>${esc(b[1])}</h5>`, p: (b) => `<p>${esc(b[1])}</p>`, meta: (b) => `<p class="dz-meta">${esc(b[1])}</p>`,
    ul: (b) => `<ul>${b[1].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`, ol: (b) => `<ol>${b[1].map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`,
    check: (b) => `<ul class="dz-check">${b[1].map((x) => `<li><span class="bx"></span>${esc(x)}</li>`).join("")}</ul>`,
    fields: (b) => `<div class="dz-fields">${b[1].map((x) => `<div><span>${esc(x)}</span><i></i></div>`).join("")}</div>`,
    tbl: (b) => `<div class="dz-tw"><table class="dz-tbl"><thead><tr>${b[1].map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${(b[2].length ? b[2] : [b[1].map(() => "")]).map((row) => `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
    hand: (b) => `<p class="dz-hand">${esc(b[1])}</p>`, sticky: (b) => `<div class="dz-sticky">${esc(b[1])}</div>`,
    mail: (b) => `<div class="dz-mail"><div class="dz-subj"><span>Subject</span>${esc(b[1])}</div><p>${esc(b[2])}</p></div>`
  };
  function docView(r) {
    const file = (r.where || "").split(">").pop().trim();
    const head = { doc: `<div class="dz-head"><b>${esc(r.title)}${r.version ? ` <small>${esc(r.version)}</small>` : ""}</b>${logo(false, 86)}</div>`,
      sheet: `<div class="dz-bar">${icon("chart", 14)} ${esc(file)}</div>`, web: `<div class="dz-bar web"><i></i><i></i><i></i><span>${esc(r.url || "")}</span></div>`,
      email: `<div class="dz-bar">${icon("chat", 14)} Shared inbox › Templates</div>`, laminated: `<div class="dz-head lam"><b>${esc(r.title)}</b>${logo(false, 80)}</div>`,
      notes: "", clipboard: `<div class="dz-clip" aria-hidden="true"></div><div class="dz-head"><b>${esc(r.title)}</b></div>` }[r.paper] || "";
    return `<div class="dz dz-${r.paper}${r.missing ? " dz-missing" : ""}">${head}<div class="dz-in">${(r.doc || []).map((b) => (DZ[b[0]] || DZ.p)(b)).join("")}</div></div>`;
  }
  const ATT_KINDS = [["A newer version", (r) => "It goes to " + person(r.owner).name + " to check before it replaces this one"], ["A filled-in copy", () => "Kept with this document, for example a sent quote or a finished brief"], ["A photo of it", () => "For anything on a wall, a clipboard or a whiteboard"]];
  function resPanel(id, toAttach) {
    const r = byId(H.resources, id), used = [];
    Object.keys(H.flows).forEach((fid) => H.flows[fid].stages.forEach((s) => { if (s.tasks.some((t) => t.steps.some((x) => x.file === id))) used.push({ fid, s }); }));
    H.tasks.forEach((t) => (t.path || []).forEach((x, i) => { const ft = x.task && flowTask(x.task); if (ft && ft.t.steps.some((y) => y.file === id)) used.push({ t, i }); }));
    if (id === H.pathway.checklist) used.push({ path: true });
    openPanel(r.title, `${esc(r.type)} · ${esc(r.format)} · Owner ${chip(r.owner)}${reviewPill(r.reviewed, r.owner) ? " · " + reviewPill(r.reviewed, r.owner) : ""}`,
      `<p class="dz-when">${icon("info", 16)}<span><b>When to use it.</b> ${esc(r.when)}</span></p>
      ${r.missing ? `<div class="tip">${icon("info", 18)}<span><b>This one doesn't exist yet.</b> Sam listed it in the Ops folder, then wrote "doesn't exist yet". Here's what there is today. If you make it, attach it below and it goes to ${esc(person(r.owner).name)}.</span></div>` : ""}
      ${docView(r)}
      ${r.where ? `<div class="where"><span class="ico sm">${icon("open", 15)}</span><span><b>Where it lives</b><small>${esc(r.where)}</small></span>${r.missing ? "" : '<button class="btn ghost sm" data-real="1">Open the real thing</button>'}</div><div class="real-note"></div>` : ""}
      ${r.changed ? `<h4>Last change</h4><div class="dz-change">${avatar(r.by, 30)}<span><b>${fmtDate(r.changed)}, ${esc(person(r.by).name)}</b><small>${esc(r.change)}</small>${r.confirm ? `<small class="dz-conf"><span class="pill p-confirm">To confirm</span> ${esc(r.confirm)}</small>` : ""}</span></div>` : ""}
      <h4 id="res-attach">Attach a file</h4><div class="seg sm dz-kind">${ATT_KINDS.map((k, i) => `<button data-attkind="${i}" data-for="${r.id}" class="${i ? "" : "on"}">${k[0]}</button>`).join("")}</div>
      ${attachBox(r.missing ? "Attach the first version" : "Attach a newer version", ATT_KINDS[0][1](r))}
      <h4>Used in</h4><div class="usedin">${used.length ? used.map((u) => u.path ? `<a href="#/people/4">${icon("grow", 14)} Growing Our Team › The new starter checklist</a>` : u.fid ? `<a href="#/work/${u.fid}?stage=${u.s.id}">${icon("flow", 14)} ${esc(H.flows[u.fid].name)} › ${esc(u.s.name)}</a>` : `<a href="#/do/${u.t.id}/${u.i + 1}">${icon("spark", 14)} I want to: ${esc(u.t.title)}</a>`).join("") : '<span class="muted small">Not linked to a process yet.</span>'}</div>`);
    if (toAttach) setTimeout(() => { const h = $("#res-attach"); if (h) $("#panel-body").scrollTop = h.offsetTop - 20; }, 60);
  }

  // ---------- battlecard: live A4 page ----------
  // Shared by Meeting Prep and the "Plan a sales meeting" guided task, so picks carry across both ways. Never saved.
  const bc = { ch: "", role: "", stage: "", type: "", vs: "", off: {}, notes: "", who: "" };
  const OTHER = "other"; // someone who doesn't fit any profile in the channel
  const cares = (p, role) => p.tags.filter((t) => role.cares.includes(t)).length;
  // "Someone else": no profile, so the points of difference are ordered for the channel as a whole
  const roleFor = (ch) => bc.role === OTHER ? { id: OTHER, name: "Someone else", other: true, cares: ch.roles.flatMap((r) => r.cares) } : byId(ch.roles, bc.role);
  const keepNotes = () => $$("[data-k]").forEach((n) => { bc[n.dataset.k] = n.innerText; });
  pages.toolkit = function (sub, q) {
    if (q.ch && q.ch !== bc.ch) { bc.ch = q.ch; bc.role = ""; bc.off = {}; }
    if (q.role && q.role !== bc.role) { const c = byId(H.channels, bc.ch); if (c && byId(c.roles, q.role)) { bc.role = q.role; bc.off = {}; } }
    if (q.vs) bc.vs = q.vs;
    if (q.stage && byId(H.stages, q.stage)) bc.stage = q.stage;
    const ch = byId(H.channels, bc.ch), picked = bc.ch || bc.stage || bc.vs;
    const opts = (list, sel, blank) => `<option value="">${blank}</option>` + list.map((o) => `<option value="${o.id}"${o.id === sel ? " selected" : ""}>${esc(o.name)}</option>`).join("");
    return header("toolkit", "Pick who you're meeting and where the deal is at. Your sheet builds itself on the right. Untick anything you don't need, type your notes on the page, then print.") +
      `<a class="mp-band no-print" href="#/do/meeting${picked ? "/4" : ""}"><span class="ico sm">${icon("spark", 16)}</span><span><b>${picked ? "Prefer it step by step?" : "Want a hand with it?"}</b><small>${picked ? "\"Plan a sales meeting\" already has your picks, so you can carry on from the battlecard step." : "\"Plan a sales meeting\" walks you through who you're meeting, where the deal is at and who you're up against, then builds this same battlecard."}</small></span><span class="go">${picked ? "Go to step 4" : "Walk me through it"} ${icon("arrow", 14)}</span></a>
      <div class="builder"><div class="controls no-print">
        <label>Channel<select id="bc-ch">${opts(H.channels, bc.ch, "Choose a channel")}</select></label>
        <label>Who you're meeting<select id="bc-role"${ch ? "" : " disabled"}>${opts(ch ? ch.roles : [], bc.role, ch ? "Choose a role" : "Choose a channel first")}${ch ? `<option value="${OTHER}"${bc.role === OTHER ? " selected" : ""}>Someone else (doesn't fit a profile)</option>` : ""}</select></label>
        ${ch ? `<div class="hint" style="margin-top:-6px">Not quite any of these? Pick the closest match, or "Someone else".</div>` : ""}
        <label>Sales stage<select id="bc-stage">${opts(H.stages, bc.stage, "Choose a stage")}</select></label>
        <label>Project type<select id="bc-type">${opts(H.projectTypes, bc.type, "Any")}</select></label>
        <label>Who are we up against?<select id="bc-vs">${opts(H.competitors, bc.vs, "Not known")}</select></label>
        <button class="btn gold" data-print="1" id="bc-print"${sheetReady() ? "" : " disabled style=\"opacity:.5\""}>${icon("print", 16)} Print my battlecard</button>
        <div class="hint">Nothing here is saved, so no one else ever sees your notes. Customer details belong in the CRM.</div>
      </div><div class="desk"><div id="bc-sheet">${sheet()}</div></div></div>`;
  };
  function sheetReady() { const ch = byId(H.channels, bc.ch); return !!(ch && roleFor(ch) && byId(H.stages, bc.stage)); }
  function item(key, html) { return `<label class="item${bc.off[key] ? " off" : ""}"><input type="checkbox" data-item="${key}"${bc.off[key] ? "" : " checked"}><span class="txt">${html}</span></label>`; }
  function sheet() {
    if (!sheetReady()) return `<div class="a4 blank"><div>${art("card", 110)}<p style="margin-top:14px"><b style="color:var(--ink);font-family:var(--head);font-size:20px">Your battlecard appears here</b><br>Choose a channel, who you're meeting and the sales stage.</p></div></div>`;
    const ch = byId(H.channels, bc.ch), role = roleFor(ch), stage = byId(H.stages, bc.stage), type = byId(H.projectTypes, bc.type), vs = byId(H.competitors, bc.vs);
    const ranked = H.pods.map((p, i) => ({ p, s: cares(p, role), i })).sort((a, b) => b.s - a.s || a.i - b.i);
    // Top three ticked by default; the others start unticked
    ranked.forEach((x, n) => { const k = "pod-" + x.p.id; if (!(k in bc.off)) bc.off[k] = n >= 3; });
    let vsHtml = "";
    if (vs) {
      const lead = vs.beatWith.map((id) => byId(H.pods, id)).sort((a, b) => cares(b, role) - cares(a, role)).slice(0, 2);
      vsHtml = `<div class="vs"><h5>Up against ${esc(vs.name)}</h5>${item("vs-pitch", `<b>They'll pitch:</b> ${esc(vs.pitch)}`)}${item("vs-lead", `<b>Lead with:</b> ${lead.map((p) => esc(p.name)).join(" and ")}`)}${vs.questions.map((qq, i) => item("vs-q" + i, `<b>Ask:</b> ${esc(qq)}`)).join("")}${item("vs-proof", `<b>Proof:</b> ${esc(byId(H.pods, vs.proofPick).proof)}`)}${item("vs-dont", `<b>Don't say:</b> ${esc(vs.dontSay)}`)}</div>`;
    }
    return `<div class="a4"><div class="a4-head"><div class="a4-who">${role.look ? face(role.look, 58) : ""}<div><div class="sub">Battlecard · internal preparation</div><h2>${esc(role.name)}</h2><div class="sub">${esc(ch.name)} · ${esc(stage.name)}${type ? " · " + esc(type.name) : ""}</div></div></div>${logo(false, 130)}</div>
      <div class="cols"><div>
        ${role.other ? `<h5>Who they are</h5><div class="notes who" contenteditable="true" data-k="who" data-ph="Doesn't fit one of our profiles. Click to type: their job title, what they care about, who they answer to. Printed, never saved.">${esc(bc.who)}</div>
          <button class="btn ghost sm no-print" data-newprofile="${ch.id}" style="margin-top:8px">${icon("users", 14)} Keep meeting people like this? Suggest a new profile</button>` : `<h5>What they care about</h5><p style="margin:0">${esc(role.line)}</p>${role.hook ? `<button class="btn ghost sm no-print" data-profile="${ch.id}:${role.id}" style="margin-top:8px">${icon("users", 14)} Their full profile</button>` : ""}`}
        <h5>Your goal at this stage</h5><p style="margin:0">${esc(stage.goal)}</p>
        ${type ? `<h5>For this project</h5>${item("type", esc(type.point))}` : ""}
        <h5>Questions to ask</h5>${stage.questions.map((x, i) => item("q" + i, esc(x))).join("")}
      </div><div>
        <h5>Lead with</h5>${ranked.map((x) => item("pod-" + x.p.id, `<b>${esc(x.p.name)}.</b> ${esc(x.p.line)} <i style="color:var(--muted)">${esc(x.p.proof)}</i>`)).join("")}
        <h5>Objections you might hear</h5>${ch.objections.map((o, i) => item("obj" + i, `<b>"${esc(o.q)}"</b> ${esc(o.a)}`)).join("")}
      </div></div>${vsHtml}
      <h5>My notes</h5><div class="notes" contenteditable="true" data-k="notes" data-ph="Click to type: customer, meeting date, anything else. Printed, never saved.">${esc(bc.notes)}</div>
      <div class="foot"><span>Internal preparation only. Not for the customer.</span><span>${esc(H.company.fictionNote)}</span></div></div>`;
  }
  function refreshSheet() { $("#bc-sheet").innerHTML = sheet(); const b = $("#bc-print"); if (b) { b.disabled = !sheetReady(); b.style.opacity = sheetReady() ? "" : ".5"; } }

  // ---------- Growing Our Team: a learning path for someone new ----------
  // A path to follow, not a tracker: nothing is ticked off or saved. Each stop shows what's already in the hub, in place;
  // anything linked opens in the centred pop-up, so you never leave the path. Role stops are built from How We Work (flows).
  const quiz = { i: 0, picks: [] };
  const trackOf = (id) => byId(H.pathway.tracks, id);
  // The stages in each How We Work lane where these roles have a part (the stage's roles, or a task's roles)
  const roleStages = (roles) => Object.keys(H.flows).map((fid) => ({ fid, f: H.flows[fid], st: H.flows[fid].stages.filter((s) => (s.who || []).some((r) => roles.includes(r)) || s.tasks.some((t) => (t.by || []).some((r) => roles.includes(r)))) })).filter((x) => x.st.length);
  const productNamed = (n) => { let hit = null; H.products.categories.forEach((c) => c.groups.forEach((g) => g.items.forEach((p) => { if (p.n === n) hit = { p, c, g }; }))); return hit; };
  const saidBy = (id, t, size) => { const p = person(id); return `<div class="said"><button class="vd-who" data-person="${p.id}" aria-label="${esc(p.name)}">${avatar(p.id, size || 40)}</button><blockquote>"${esc(t)}"<small>${esc(p.name)}, ${esc(p.role)}</small></blockquote></div>`; };

  function quizBody() {
    const Q = H.quiz, n = Q.length;
    if (quiz.i >= n) {
      const right = quiz.picks.filter((p, k) => p === Q[k].c).length, missed = Q.filter((x, k) => quiz.picks[k] !== x.c);
      return `<div class="qz-done"><div class="qz-score"><b>${right}</b><span>of ${n}</span></div><div><h3>${right === n ? "Every one. You know us already." : right >= n - 2 ? "Nicely done." : "A good start. Every answer is somewhere on this path."}</h3>
          <p class="muted">${missed.length ? "Worth another look:" : "Nothing to go back over."}</p></div></div>
        ${missed.length ? `<ul class="qz-missed">${missed.map((x) => `<li><b>${esc(x.q)}</b><span>${esc(x.a[x.c])}. ${esc(x.why)}</span></li>`).join("")}</ul>` : ""}
        <p style="margin-top:16px"><button class="btn ghost" data-quiz="again">Try it again</button></p>`;
    }
    const x = Q[quiz.i], picked = quiz.picks[quiz.i], done = picked != null;
    return `<div class="qz"><div class="qz-bar" aria-hidden="true"><i style="width:${(quiz.i + (done ? 1 : 0)) / n * 100}%"></i></div><div class="count">Question ${quiz.i + 1} of ${n}</div>
      <h3 class="qz-q">${esc(x.q)}</h3>
      <div class="qz-opts">${x.a.map((a, k) => `<button class="qz-opt${done ? (k === x.c ? " right" : k === picked ? " wrong" : " dim") : ""}" data-quiz="${k}"${done ? " disabled" : ""}><span class="qz-l">${"ABCD"[k]}</span><span>${esc(a)}</span>${done && k === x.c ? icon("check", 16) : ""}</button>`).join("")}</div>
      ${done ? `<div class="qz-why ${picked === x.c ? "ok" : "no"}"><b>${picked === x.c ? "That's right." : "Not quite."}</b> ${esc(x.why)}<small>From ${esc(x.from)}</small></div>
        <p style="margin:14px 0 0"><button class="btn" data-quiz="next">${quiz.i < n - 1 ? "Next question" : "See how you went"} ${icon("arrow", 15)}</button></p>` : ""}</div>`;
  }

  function stopBody(id, q) {
    const P = H.pathway, s = H.story;
    if (id === "story") {
      return `<p class="what">Start here. Where we came from, and what our values look like on a normal day.</p>
        ${saidBy(s.founder.by, s.founder.quote, 48)}
        <h4 class="pw-h">Our story in eight milestones</h4><ol class="pw-years">${s.milestones.map((m) => `<li><b>${esc(m.year)}</b><span>${esc(m.t)}</span></li>`).join("")}</ol>
        <h4 class="pw-h">Our values, as things you'll see us do</h4><div class="pw-vals">${s.values.map((v, i) => `<div><span class="num">${i + 1}</span><b>${esc(v.name)}</b><p>${esc(v.does[0].t)}</p></div>`).join("")}</div>
        <p class="small muted" style="margin:16px 0 0">${icon("info", 14)} The whole story, every value and the team chart are on <a href="#/who">${esc(area("who").name)}</a>. You'll be asked about it in the quiz at stop 5.</p>`;
    }
    if (id === "month") {
      return `<p class="what">From Sam's new starter checklist. Who you'll meet, and when. Your manager walks through it with you.</p>
        <ol class="pw-month">${P.month.map((w) => `<li><span class="pm-dot"></span><div><span class="eyebrow">${esc(w.when)}</span>${w.by ? `<p class="small muted" style="margin:2px 0 0">Sorted by ${esc(person(w.by).name)} before you arrive</p>` : ""}
          <ul>${w.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${w.meet ? `<div class="pm-meet"><span class="small muted">You'll meet</span>${w.meet.map(chip).join("")}</div>` : ""}</div></li>`).join("")}</ol>`;
    }
    if (id === "words") {
      return `<p class="what">The words you'll hear in your first week. Tap a card to see what it means.</p>
        <div class="words">${H.glossary.map((g, i) => `<button class="word" data-word="${i}" aria-pressed="false"><b>${esc(g.term)}</b><span>${esc(g.def)}</span><small>Tap to see</small></button>`).join("")}</div>
        <h4 class="pw-h">Range names you'll hear</h4>
        <div class="pw-range">${P.range.map((n) => { const x = productNamed(n); return x ? `<div><span class="pr-art">${art(x.p.art, 46)}</span><span><b>${esc(x.p.n)}</b><small>${esc(x.c.name)}${x.g.name ? " · " + esc(x.g.name) : ""}</small></span></div>` : ""; }).join("")}</div>
        ${saidBy(P.rangeTip.by, P.rangeTip.t)}
        <p class="small muted" style="margin:14px 0 0">${icon("book", 14)} Every term is also in the <a href="#/glossary">Glossary</a>, and underlined wherever it's used in the hub.</p>`;
    }
    if (id === "checklist") {
      const r = byId(H.resources, P.checklist);
      return `<p class="what">The real checklist lives on the shared drive. Your manager works through it with you, so nothing gets ticked off here.</p>
        <button class="pw-doc" data-res="${r.id}"><span class="ico">${icon("file", 20)}</span><span><b>${esc(r.title)}</b><small>${esc(r.where)}</small></span><span class="pw-open">Open it ${icon("arrow", 14)}</span></button>
        <h4 class="pw-h">The logins you'll get before day one</h4>
        <div class="pw-sys">${P.systems.map((x) => `<div><span class="ico sm">${icon("screen", 16)}</span><span><b>${esc(x.n)}</b><small>${esc(x.w)}</small></span></div>`).join("")}</div>
        <div class="tip">${avatar("sam", 32)}<span><b>From ${esc(person("sam").name)}:</b> ask for anything that's missing on day one. Nobody minds.</span></div>`;
    }
    if (id === "quiz") {
      return `<p class="what">Seven quick questions on our story and the company. Just for you: nothing is saved, and nobody sees your answers.</p>${quizBody()}`;
    }
    // Your role: pick it, then who you learn from, their advice, your part in How We Work, and the tasks you'll do most
    const tr = trackOf(q.role), base = `#/people/${P.stops.length}?role=`;
    const pick = `<div class="pw-tracks${tr ? " chosen" : ""}">${P.tracks.map((t) => `<button class="pw-track${tr && t.id === tr.id ? " on" : ""}" data-go="${base}${t.id}"><span class="faces">${t.learn.map((id) => avatar(id, 30)).join("")}</span><b>${esc(t.name)}</b></button>`).join("")}</div>`;
    if (!tr) return `<p class="what">The first five stops are the same for everyone. From here it's your own role. Which team are you joining?</p>${pick}`;
    const lanes = roleStages(tr.roles), tasks = tr.tasks.map((id) => byId(H.tasks, id)).filter(Boolean);
    return `<p class="what">Which team are you joining?</p>${pick}
      <div class="pw-role"><h4 class="pw-h">Who you'll learn from</h4><div class="pw-learn">${tr.learn.map(chip).join("")}</div>
        <h4 class="pw-h">Their advice for your first week</h4>${tr.tips.map((x) => saidBy(x.by, x.t)).join("")}
        <h4 class="pw-h">Weeks two to four</h4>${tr.weeks.length ? `<ul class="pw-weeks">${tr.weeks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="muted" style="margin:0">Your manager has the list. Sam's checklist only spells out sales and operations roles so far.</p>`}
        ${tr.confirm ? `<p class="confirm-note"><span class="pill p-confirm">To confirm</span><span>${esc(tr.confirm)}</span></p>` : ""}
        <h4 class="pw-h">Your part in How We Work</h4><p class="small muted" style="margin:-4px 0 10px">The stages where your team has tasks, in order. Click one to see its tasks and documents.</p>
        <div class="pw-lanes">${lanes.map((x) => `<div class="pw-lane"><span class="pw-ln">${icon(x.f.icon || "flow", 15)} ${esc(x.f.short)}</span><div class="pw-st">${x.st.map((st, k) => `<button data-stagepop="${x.fid}:${st.id}"><span>${k + 1}</span>${esc(st.name)}</button>`).join("")}</div></div>`).join("")}</div>
        ${tasks.length ? `<h4 class="pw-h">The tasks you'll do most</h4><div class="pw-tasks">${tasks.map((t) => `<a href="#/do/${t.id}"><span class="pt-art">${art(t.art, 40)}</span><span><b>${esc(t.title)}</b><small>${esc(t.line)}</small></span>${icon("arrow", 15)}</a>`).join("")}</div><p class="small muted" style="margin:8px 0 0">These open as guided tasks in "I want to...", step by step.</p>` : ""}</div>`;
  }

  pages.people = function (sub, q) {
    const P = H.pathway, stops = P.stops, n = stops.length, tr = trackOf(q.role);
    if (!sub) {
      const firstWeek = (P.month.find((w) => w.meet) || {}).meet || [];
      return header("people", "A path for someone new. The first five stops are the same for everyone, then it's your own role. Follow it in order; nothing is ticked off or saved.") +
        `<section class="pw-hero"><div class="glow"></div><div class="pw-hero-t"><span class="eyebrow">Welcome to ${esc(H.company.short)}</span><h2>Your first month, one stop at a time</h2>
          <p>Start at 1 and keep going. Everything opens right here, so you never lose your place. Talk it through with your manager as you go.</p>
          <a class="btn gold" href="#/people/1">Start at stop 1 ${icon("arrow", 15)}</a></div>
          <ol class="trail">${stops.map((x, i) => `<li class="${i === n - 1 ? "fork" : ""}"><a href="#/people/${i + 1}"><span class="tn">${i + 1}</span><span class="tt"><b>${esc(x.t)}</b><small>${esc(x.line)}</small></span></a></li>`).join("")}</ol></section>
        <div class="pw-two"><div class="card"><span class="eyebrow">In your first week you'll meet</span><div class="pw-learn" style="margin-top:8px">${firstWeek.map(chip).join("")}</div><p class="small muted" style="margin:8px 0 0">And everyone else. There are only twelve of us.</p></div>
          <div class="card"><span class="eyebrow">Know your team already?</span><p class="small muted" style="margin:4px 0 8px">Skip to your role at stop ${n}. Come back for the rest.</p><div class="pw-jump">${P.tracks.map((t) => `<a class="mp-chip" href="#/people/${n}?role=${t.id}">${esc(t.name)}</a>`).join("")}</div></div></div>`;
    }
    const i = Math.max(0, Math.min(n - 1, (+sub || 1) - 1)), st = stops[i], keep = tr ? "?role=" + tr.id : "";
    const nav = `<div class="stagenav no-print">${i > 0 ? `<a class="btn ghost" href="#/people/${i}${keep}">${icon("back", 15)} Back</a>` : `<a class="btn ghost" href="#/people">${icon("back", 15)} The whole path</a>`}${i < n - 1 ? `<a class="btn" href="#/people/${i + 2}${keep}">Next: ${esc(stops[i + 1].t)} ${icon("arrow", 15)}</a>` : `<a class="btn gold" href="#/">Done, back to Home</a>`}</div>`;
    return `<a class="small no-print" href="#/people" style="text-decoration:none">${icon("back", 13)} The whole path</a>
      <h1 style="margin-top:10px">${esc(area("people").name)}</h1><p class="lede">A path for someone new. Follow it in order. Nothing is ticked off or saved.</p>
      <div class="journey"><ol class="stepper">${stops.map((x, k) => `<li><button class="${k === i ? "on" : ""}" data-go="#/people/${k + 1}${keep}"><span class="n">${k + 1}</span><span><b style="display:block;color:inherit;font-size:14.5px">${esc(x.t)}</b>${k === n - 1 && tr ? `<span class="st-val">${esc(tr.name)}</span>` : k === n - 1 ? `<span class="st-val">Then your own role</span>` : ""}</span></button></li>`).join("")}</ol>
      <div class="stage"><div class="count">Stop ${i + 1} of ${n}</div><h2>${esc(st.t)}</h2>${stopBody(st.id, q)}${nav}</div></div>`;
  };

  // ---------- Scoreboard: the company runs it from the report it already has ----------
  // Figures come from the monthly KPI sheet. Enter a month, attach the report, and every chart redraws. The owner can add a
  // measure and pick how each one is shown. Nothing is saved in the demo: a reload brings back the September sheet.
  const SB = H.scoreboard;
  const FY = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const LONG = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };
  const fyYear = (mo) => (FY.indexOf(mo) > 8 ? 2027 : 2026);
  const sb = { at: SB.months.length - 1, flash: "" };
  const measure = (id) => byId(SB.measures, id);
  const lastIn = (m) => { for (let i = m.values.length - 1; i >= 0; i--) if (m.values[i] != null) return i; return -1; };
  const CHARTS = [
    { k: "line", n: "Line and target", d: "How it's moving" },
    { k: "bars", n: "Columns", d: "Month against month" },
    { k: "progress", n: "Progress bar", d: "How far to the target" },
    { k: "number", n: "Big number", d: "This month, and the trend" }
  ];
  const chartIcon = (k) => `<svg viewBox="0 0 40 26" width="40" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${{
    line: '<path d="M3 21l9-7 8 4 8-9 9-4" /><path d="M3 7h34" stroke-width="1" opacity=".55"/>',
    bars: '<path d="M7 23v-8M15 23V11M23 23V8M31 23V5" stroke-width="4.5"/>',
    progress: '<rect x="3" y="10" width="34" height="6" rx="3" stroke-width="1.4"/><path d="M6 13h18" stroke-width="4"/><path d="M28 6v14" stroke-width="1.2"/>',
    number: '<text x="2" y="17" font-size="15" font-weight="700" fill="currentColor" stroke="none" font-family="Inter,sans-serif">52</text><path d="M24 20l4-3 4 1 5-6" stroke-width="1.6"/>' }[k]}</svg>`;

  const num = (m, v) => m.dp && v % 1 ? (+v).toFixed(m.dp) : String(Math.round(v * 10) / 10);
  const sbFmt = (m, v) => v == null || isNaN(v) ? "Not in yet" : m.unit === "$k" ? (v >= 1000 ? "$" + (v / 1000).toFixed(2) + "M" : "$" + Math.round(v) + "k") : num(m, v) + (m.unit === "%" ? "%" : "");
  // What we should be at in month i: the plan's straight line to March, a plan per month added up, or one target all year
  const goalAt = (m, i) => m.goal === "path" ? m.start + (m.target - m.start) * (i + 1) / 12 : m.goal === "ytd" ? m.per * (i + 1) : m.target;
  const up = (m) => m.better !== "down";
  function statusAt(m, i) {
    const v = m.values[i]; if (v == null) return { k: "none", t: "Not in yet" };
    const g = goalAt(m, i), r = up(m) ? v / g : g / v;
    if (m.goal === "path" && (up(m) ? v >= m.target : v <= m.target)) return { k: "ok", t: "Target hit" };
    if (m.goal === "flat" && r >= 1) return { k: "ok", t: "On target" };
    if (r >= 1.05) return { k: "ok", t: "Ahead" };
    if (r >= 1) return { k: "ok", t: "On track" };
    if (r >= 0.97) return { k: "close", t: "Close" };
    return { k: "behind", t: "Behind" };
  }
  const statusPill = (s) => `<span class="sb-st st-${s.k}">${s.k === "ok" ? icon("check", 13) : s.k === "none" ? icon("clock", 13) : s.k === "close" ? "<i>~</i>" : "<i>!</i>"}${esc(s.t)}</span>`;
  const goalLine = (m, i) => m.goal === "path" ? `Aiming for ${sbFmt(m, m.target)} by March. By ${SB.months[i]} the plan says ${sbFmt(m, goalAt(m, i))}.`
    : m.goal === "ytd" ? `Plan to ${SB.months[i]}: ${sbFmt(m, goalAt(m, i))}. Year to date only, as Sam asked.` : `Target ${sbFmt(m, m.target)}${up(m) ? " or better" : " or lower"}, all year.`;
  const tipAttrs = (m, i) => `data-tm="${esc(LONG[SB.months[i]] + " " + fyYear(SB.months[i]))}" data-tv="${esc(sbFmt(m, m.values[i]))}" data-tg="${esc((m.goal === "flat" ? "Target " : "Plan ") + sbFmt(m, goalAt(m, i)))}" data-ts="${esc(statusAt(m, i).t)}"`;
  function niceTicks(lo, hi, n) {
    const raw = (hi - lo) / n, p = Math.pow(10, Math.floor(Math.log10(raw))), st = [1, 2, 2.5, 5, 10].map((k) => k * p).find((k) => k >= raw) || raw;
    const out = []; for (let v = Math.ceil(lo / st) * st; v <= hi + 1e-9; v += st) out.push(+v.toFixed(6)); return out;
  }
  const tickFmt = (m, v) => m.unit === "$k" ? (v >= 1000 ? "$" + (v / 1000).toFixed(1).replace(/\.0$/, "") + "M" : "$" + v + "k") : m.unit === "%" ? v + "%" : String(+v.toFixed(2));

  // Line and target, or columns. One series, so no legend: the card title names it. Every month has a hover and focus readout,
  // and the month-by-month table in the measure's pop-up carries every value too.
  function plot(m, kind, big) {
    const n = sb.at + 1, W = 340, Hh = big ? 200 : 158, L = 40, R = 14, T = 16, B = 26;
    const vals = m.values.slice(0, n), goals = vals.map((_, i) => goalAt(m, i)), have = vals.filter((v) => v != null);
    let lo = Math.min(...have, ...goals), hi = Math.max(...have, ...goals);
    if (kind === "bars") lo = 0; else { const pad = (hi - lo) * 0.18 || Math.abs(hi) * 0.05 || 1; lo -= pad; }
    hi += (hi - lo) * 0.12 || 1;
    const ticks = niceTicks(lo, hi, 3); lo = Math.min(lo, ticks[0]); hi = Math.max(hi, ticks[ticks.length - 1]);
    const band = (W - L - R) / n, x = (i) => kind === "bars" ? L + band * (i + 0.5) : n === 1 ? (L + W - R) / 2 : L + 8 + i * (W - L - R - 16) / (n - 1);
    const y = (v) => T + (1 - (v - lo) / (hi - lo)) * (Hh - T - B);
    const grid = ticks.map((t) => `<line x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}" class="sb-gl"/><text x="${L - 6}" y="${y(t) + 3.5}" class="sb-yl">${tickFmt(m, t)}</text>`).join("");
    const xl = vals.map((_, i) => `<text x="${x(i)}" y="${Hh - 8}" class="sb-xl${i === n - 1 ? " on" : ""}">${SB.months[i]}</text>`).join("");
    let goal = "";
    if (m.goal === "flat") goal = `<line x1="${L}" x2="${W - R}" y1="${y(m.target)}" y2="${y(m.target)}" class="sb-goal"/>`;
    else if (kind === "bars") goal = goals.map((g, i) => `<line x1="${x(i) - Math.min(band * 0.42, 17)}" x2="${x(i) + Math.min(band * 0.42, 17)}" y1="${y(g)}" y2="${y(g)}" class="sb-goal"/>`).join("");
    else goal = `<polyline points="${goals.map((g, i) => `${x(i)},${y(g)}`).join(" ")}" class="sb-goal"/>`;
    let marks = "";
    if (kind === "bars") {
      const bw = Math.min(24, band * 0.56);
      marks = vals.map((v, i) => { if (v == null) return ""; const top = y(v), base = y(0), h = Math.max(base - top, 0.5), r = Math.min(4, h); return `<path d="M${x(i) - bw / 2} ${base}V${top + r}q0 -${r} ${r} -${r}h${bw - 2 * r}q${r} 0 ${r} ${r}V${base}z" class="sb-bar${i === n - 1 ? " now" : ""}"/>`; }).join("");
    } else {
      const pts = vals.map((v, i) => v == null ? null : [x(i), y(v)]).filter(Boolean);
      if (pts.length > 1) marks = `<path d="M${pts[0][0]} ${y(lo)}L${pts.map((p) => p.join(" ")).join("L")}L${pts[pts.length - 1][0]} ${y(lo)}z" class="sb-area"/><polyline points="${pts.map((p) => p.join(",")).join(" ")}" class="sb-line"/>`;
      marks += vals.map((v, i) => v == null ? "" : `<circle cx="${x(i)}" cy="${y(v)}" r="${i === n - 1 ? 5.5 : 4}" class="sb-dot${i === n - 1 ? " now" : ""}"/>`).join("");
    }
    const lastV = vals[n - 1], endLabel = lastV == null ? "" : `<text x="${x(n - 1)}" y="${y(lastV) - (kind === "bars" ? 7 : 11)}" class="sb-vl">${esc(sbFmt(m, lastV))}</text>`;
    const hits = vals.map((_, i) => `<rect x="${kind === "bars" ? L + band * i : x(i) - (n === 1 ? 40 : (W - L - R - 16) / (n - 1) / 2)}" y="${T - 6}" width="${kind === "bars" ? band : n === 1 ? 80 : (W - L - R - 16) / (n - 1)}" height="${Hh - T - B + 6}" class="sb-hit" tabindex="0" data-x="${x(i)}" ${tipAttrs(m, i)}><title>${esc(SB.months[i] + ": " + sbFmt(m, vals[i]))}</title></rect>`).join("");
    return `<div class="sb-plot"><svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="${esc(m.name)}, ${kind === "bars" ? "columns" : "line"} by month, ${esc(SB.months[0])} to ${esc(SB.months[n - 1])}">${grid}${goal}${kind === "bars" ? "" : `<line class="sb-cross" x1="0" x2="0" y1="${T - 6}" y2="${Hh - B}"/>`}${marks}${endLabel}${xl}${hits}</svg><div class="sb-tip" hidden></div><div class="sb-keys"><span><i class="k-${kind}"></i>Actual</span><span><i class="k-goal"></i>${m.goal === "flat" ? "Target " + esc(sbFmt(m, m.target)) : m.goal === "ytd" ? "Plan, year to date" : "Plan to March"}</span></div></div>`;
  }
  function progress(m) {
    const i = sb.at, v = m.values[i], g = goalAt(m, i);
    const end = m.goal === "path" ? m.target : m.goal === "ytd" ? g : m.target;
    const max = Math.max(end, v || 0) * (m.goal === "flat" && v > end ? 1.04 : 1), pc = (x) => Math.max(0, Math.min(100, x / max * 100));
    const startNote = m.goal === "path" ? `Started at ${sbFmt(m, m.start)} in April` : m.goal === "ytd" ? `Plan to ${SB.months[i]}: ${sbFmt(m, g)}` : `Target ${sbFmt(m, m.target)}`;
    return `<div class="sb-prog"><div class="sb-pv"><b>${esc(sbFmt(m, v))}</b><span>${m.goal === "path" ? "of " + esc(sbFmt(m, m.target)) + " by March" : m.goal === "ytd" ? "of " + esc(sbFmt(m, g)) + " planned" : "against " + esc(sbFmt(m, m.target))}</span></div>
      <div class="sb-track" tabindex="0" ${tipAttrs(m, i)}>${v != null ? `<i style="width:${pc(v)}%"></i>` : ""}${m.goal === "path" ? `<span class="sb-start" style="left:${pc(m.start)}%"></span>` : ""}${m.goal !== "ytd" && m.goal !== "flat" ? `<span class="sb-mark" style="left:${pc(g)}%"></span>` : ""}</div>
      <div class="sb-scale"><span>${esc(startNote)}</span>${m.goal === "path" ? `<span><i class="sb-key"></i>Plan by ${SB.months[i]}: ${esc(sbFmt(m, g))}</span>` : ""}</div><div class="sb-tip" hidden></div></div>`;
  }
  function bigNumber(m) {
    const i = sb.at, v = m.values[i], p = i > 0 ? m.values[i - 1] : null, n = i + 1;
    let delta = "";
    if (v != null && p != null) {
      const d = v - p, good = d === 0 ? "flat" : (d > 0) === up(m) ? "good" : "bad";
      const dTxt = m.unit === "$k" ? "$" + Math.round(Math.abs(d)) + "k" : num(m, Math.abs(d)) + (m.unit === "%" ? " pts" : "");
      delta = `<span class="sb-delta ${good}">${d === 0 ? "No change" : (d > 0 ? "&#9650; " : "&#9660; ") + esc(dTxt)} on ${SB.months[i - 1]}</span>`;
    }
    const vals = m.values.slice(0, n), have = vals.filter((x) => x != null).concat([goalAt(m, i)]), lo = Math.min(...have), hi = Math.max(...have), W = 150, Hh = 46;
    const x = (k) => n === 1 ? W / 2 : 6 + k * (W - 12) / (n - 1), y = (q) => hi === lo ? Hh / 2 : 6 + (1 - (q - lo) / (hi - lo)) * (Hh - 12);
    const pts = vals.map((q, k) => q == null ? null : `${x(k)},${y(q)}`).filter(Boolean);
    const spark = `<svg viewBox="0 0 ${W} ${Hh}" class="sb-spark" role="img" aria-label="${esc(m.name)} trend">${m.goal === "flat" ? `<line x1="0" x2="${W}" y1="${y(m.target)}" y2="${y(m.target)}" class="sb-goal"/>` : ""}<polyline points="${pts.join(" ")}" class="sb-sline"/>${v != null ? `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" class="sb-dot now"/>` : ""}${vals.map((_, k) => `<rect x="${x(k) - (n === 1 ? 20 : (W - 12) / (n - 1) / 2)}" y="0" width="${n === 1 ? 40 : (W - 12) / (n - 1)}" height="${Hh}" class="sb-hit" tabindex="0" data-x="${x(k)}" ${tipAttrs(m, k)}></rect>`).join("")}</svg>`;
    return `<div class="sb-num"><div><b class="sb-hero-n">${esc(sbFmt(m, v))}</b>${delta}<small>${m.goal === "flat" ? "Target " + esc(sbFmt(m, m.target)) : esc(goalLine(m, i))}</small></div><div class="sb-plot sm">${spark}<div class="sb-tip" hidden></div></div></div>`;
  }
  const chartOf = (m, big) => m.chart === "progress" ? progress(m) : m.chart === "number" ? bigNumber(m) : plot(m, m.chart, big);

  function sbCard(m) {
    const i = sb.at;
    return `<article class="sb-card c-${m.chart}" data-m="${m.id}">
      <div class="sb-ch"><button class="sb-name" data-sbm="${m.id}">${esc(m.name)}</button>${statusPill(statusAt(m, i))}</div>
      ${m.chart === "number" ? "" : `<p class="sb-gline">${esc(goalLine(m, i))}</p>`}
      <div class="sb-body">${chartOf(m)}</div>
      <div class="sb-cf"><span class="sb-own" title="Looks after this measure">${avatar(m.owner, 22)}${esc(person(m.owner).name)}</span><span class="sb-from">${icon("file", 13)}${esc(m.from)}</span>
        <span class="sb-btns"><button class="sb-mini" data-sbm="${m.id}" aria-label="Details and chart type for ${esc(m.short)}" title="Details and chart type">${icon("chart", 15)}</button><button class="btn ghost sm" data-sbupd="${m.id}">${icon("edit", 14)} Update figures</button></span></div></article>`;
  }
  function repCard(r) {
    const k = SB.months.indexOf(r.m);
    return `<div class="sb-rep${k === sb.at ? " on" : ""}"><div class="sb-rep-h"><span class="sb-cal"><small>${esc(r.m)}</small><b>${String(fyYear(r.m)).slice(2)}</b></span><span><b>${esc(LONG[r.m])} ${fyYear(r.m)}</b><small>${r.on ? `Added ${fmtDate(r.on)} by ${esc(person(r.by).name)}` : "Figures in, no report attached yet"}</small></span></div>
      <ul>${r.files.map((f) => `<li><button class="sb-file" data-sbfile="${esc(f.n)}">${icon("clip", 14)}<span>${esc(f.n)}</span><small>${esc(f.s)}${f.local ? " · only in this browser" : ""}</small></button></li>`).join("") || '<li class="small muted">Nothing attached.</li>'}</ul>
      <div class="sb-rep-a">${k === sb.at ? '<span class="pill p-ink">Showing now</span>' : k >= 0 ? `<button class="btn ghost sm" data-sbat="${k}">See the board</button>` : ""}<button class="btn ghost sm" data-sbrep="${esc(r.m)}">${icon("clip", 14)} Attach</button></div></div>`;
  }
  pages.goals = function () {
    const g = H.goals, at = SB.months[sb.at], latest = sb.at === SB.months.length - 1, rep = SB.reports.find((r) => r.m === at);
    const objs = SB.measures.filter((m) => m.group === "objective"), meas = SB.measures.filter((m) => m.group !== "objective");
    const tally = { ok: 0, close: 0, behind: 0 }; SB.measures.forEach((m) => { const k = statusAt(m, sb.at).k; if (k in tally) tally[k]++; });
    const as = { "Done": "p-ok", "In progress": "p-plain", "Not started": "p-confirm" };
    const flash = sb.flash; sb.flash = "";
    return header("goals") +
      `<section class="hero sb-hero"><div class="glow"></div><div style="position:relative;min-width:0">
        <span class="eyebrow" style="color:var(--accent)">Our focus this year · ${esc(SB.year)}</span><h1 style="margin-top:6px">${esc(g.theme)}</h1><p>${esc(g.themeLine)}</p>
        <div class="sb-months" role="group" aria-label="Show the board as at">${SB.months.map((mo, k) => `<button data-sbat="${k}" class="${k === sb.at ? "on" : ""}" aria-pressed="${k === sb.at}">${mo}</button>`).join("")}${SB.months.length < 12 ? `<span class="sb-next" title="Not in yet">${FY[SB.months.length]}</span>` : ""}</div>
        <p class="sb-asat">${latest ? "Latest figures" : "Looking back"}: <b>${esc(LONG[at])} ${fyYear(at)}</b>. ${rep && rep.on ? `From ${esc(person(rep.by).name)}'s KPI sheet, added ${fmtDate(rep.on)}.` : "No report attached for this month yet."}${latest ? "" : ` <button class="sb-link" data-sbat="${SB.months.length - 1}">Back to the latest</button>`}</p>
        <div class="sb-acts"><button class="btn gold" data-sbupd="all">${icon("edit", 16)} Enter a month's figures</button><button class="btn sb-ghost" data-sbjump="1">${icon("clip", 16)} Past reports</button></div></div>
        <div class="sb-tally">${[["ok", "On track or better"], ["close", "Close"], ["behind", "Behind"]].map(([k, t]) => `<div class="st-${k}"><b>${tally[k]}</b><span>${statusPill({ k, t })}</span></div>`).join("")}<p>${esc(SB.measures.length)} measures as at ${esc(at)}${SB.measures.length - tally.ok - tally.close - tally.behind ? ` · ${SB.measures.length - tally.ok - tally.close - tally.behind} not in yet` : ""}</p></div></section>
      ${flash ? `<div class="sb-flash">${icon("check", 18)}<span>${flash}</span></div>` : ""}
      <div class="sb-demo">${icon("info", 16)}<span><b>Demo only.</b> Figures you enter, files you attach, measures you add and chart choices stay on this screen. A reload brings back Sam's September sheet. In a live hub they're saved and kept.</span></div>
      <div class="sb-h"><h2>This year's objectives</h2><p class="small muted">From ${esc(g.source)}. Each builds to its target by March, so "on track" means ahead of a straight line from April.</p></div>
      <div class="sb-grid">${objs.map(sbCard).join("")}</div>
      <div class="sb-h"><h2>Key measures</h2><p class="small muted">The rest of the monthly KPI sheet: the accounts management report, the CRM and the spec register.</p></div>
      <div class="sb-grid">${meas.map(sbCard).join("")}<button class="sb-add" data-sbadd="1">${icon("plus", 22)}<b>Add a measure</b><small>Name it, say which report it comes from, set the target and pick how it's shown.</small><span class="pill p-ink">For the Scoreboard owner</span></button></div>
      <div class="sb-h" id="sb-past"><h2>Past reports</h2><p class="small muted">Every month's report is kept with its figures. Pick a month to see the board as it was then.</p></div>
      <div class="sb-reps">${SB.reports.slice().sort((a, b) => FY.indexOf(b.m) - FY.indexOf(a.m)).map(repCard).join("")}</div>
      <h2>Actions from the mapping</h2><table class="t stack"><thead><tr><th>Action</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>${g.actions.map((a) => `<tr><td data-l="Action">${esc(a.name)}</td><td data-l="Owner"><span class="person" style="gap:6px">${avatar(a.owner, 24)} ${esc(person(a.owner).name)}</span></td><td data-l="Due">${fmtDate(a.due)}</td><td data-l="Status"><span class="pill ${as[a.status]}">${esc(a.status)}</span></td></tr>`).join("")}</tbody></table>`;
  };
  function sbDetail(id) {
    const m = measure(id), i = sb.at;
    const rows = m.values.slice(0, SB.months.length).map((v, k) => { const r = SB.reports.find((x) => x.m === SB.months[k]); return `<tr class="${k === i ? "on" : ""}"><td data-l="Month">${esc(SB.months[k])}</td><td data-l="Figure"><b>${esc(sbFmt(m, v))}</b></td><td data-l="${m.goal === "flat" ? "Target" : "Plan"}">${esc(sbFmt(m, goalAt(m, k)))}</td><td data-l="Status">${statusPill(statusAt(m, k))}</td><td data-l="Report">${r && r.files[0] ? `<button class="sb-file sm" data-sbfile="${esc(r.files[0].n)}">${icon("clip", 13)}<span>${esc(r.files[0].n)}</span></button>` : '<span class="muted small">None</span>'}</td></tr>`; }).reverse().join("");
    openPanel(m.name, `${statusPill(statusAt(m, i))} · Looked after by ${chip(m.owner)}`,
      `<p class="sb-gline">${esc(goalLine(m, i))}</p><div class="sb-card c-${m.chart} in-pop"><div class="sb-body">${chartOf(m, true)}</div></div>
      <h4>Show it as</h4><div class="sb-types">${CHARTS.map((c) => `<button data-sbtype="${m.id}|${c.k}" class="${m.chart === c.k ? "on" : ""}" aria-pressed="${m.chart === c.k}">${chartIcon(c.k)}<b>${c.n}</b><small>${c.d}</small></button>`).join("")}</div>
      <h4>Month by month</h4><table class="t stack sb-tbl"><thead><tr><th>Month</th><th>Figure</th><th>${m.goal === "flat" ? "Target" : "Plan"}</th><th>Status</th><th>Report</th></tr></thead><tbody>${rows}</tbody></table>
      <h4>Where the figure comes from</h4><p style="margin:0">${esc(m.from)}. Sam copies it into the KPI sheet at month end.</p>${m.note ? `<div class="tip">${avatar("sam", 32)}<span>${esc(m.note)}</span></div>` : ""}
      <div style="margin-top:18px"><button class="btn" data-sbupd="${m.id}">${icon("edit", 16)} Update figures</button></div>`);
  }
  function sbUpdate(id, note) {
    const list = id === "all" ? SB.measures : [measure(id)], m0 = list[0], next = SB.months.length < 12 ? SB.months.length : -1;
    const k0 = next >= 0 ? next : SB.months.length - 1, prev = (m) => { const l = lastIn(m); return l >= 0 ? SB.months[l] + " was " + (m.unit === "$k" ? m.values[l].toLocaleString("en-NZ") : sbFmt(m, m.values[l])) : "No figures yet"; };
    openPanel(id === "all" ? "Enter a month's figures" : "Update figures", id === "all" ? "Copy them from the KPI sheet. Leave a box empty if it isn't in yet." : `${esc(m0.name)} · from ${esc(m0.from)}`,
      `${note ? `<div class="sb-flash in">${icon("check", 18)}<span>${note}</span></div>` : ""}<form id="sb-form" data-for="${esc(id)}" novalidate>
        <label class="sb-f"><span>Which month</span><select name="mo">${next >= 0 ? `<option value="${next}">${LONG[FY[next]]} ${fyYear(FY[next])} (new)</option>` : ""}${SB.months.map((mo, k) => `<option value="${k}">${LONG[mo]} ${fyYear(mo)} (change what's there)</option>`).reverse().join("")}</select></label>
        <div class="sb-ins">${list.map((m) => `<label class="sb-in"><span><b>${esc(m.short)}</b><small>${esc(m.from)}</small></span><span class="sb-box">${m.unit === "$k" ? "<i>$</i>" : ""}<input name="${m.id}" inputmode="decimal" autocomplete="off" placeholder="${esc(prev(m))}" value="${k0 < SB.months.length && m.values[k0] != null ? m.values[k0] : ""}">${m.unit === "$k" ? "<i>k</i>" : m.unit === "%" ? "<i>%</i>" : ""}</span></label>`).join("")}</div>
        <h4>Attach the report it came from</h4>${attachBox("Attach the month's report", "The KPI sheet or the management report. It's kept with that month.")}
        <p class="sb-err" hidden></p>
        <button class="btn" type="submit" style="margin-top:16px">${icon("check", 16)} Update the Scoreboard</button></form>`);
  }
  function sbSave(form) {
    const id = form.dataset.for, list = id === "all" ? SB.measures : [measure(id)], k = +form.elements.mo.value;
    const got = list.map((m) => ({ m, v: parseFloat(String(form.elements[m.id].value).replace(/[$,%\sk]/gi, "")) })).filter((x) => !isNaN(x.v));
    if (!got.length) { const e = $(".sb-err", form); e.hidden = false; e.textContent = "Enter at least one figure first."; return; }
    if (k === SB.months.length) { SB.months.push(FY[k]); SB.measures.forEach((m) => m.values.push(null)); }
    got.forEach((x) => { x.m.values[k] = x.v; });
    const files = $$(".attach-list li", form).map((li) => ({ n: $("b", li).textContent, s: $("small", li).textContent.split(" · ")[0], local: true }));
    let rep = SB.reports.find((r) => r.m === SB.months[k]);
    if (!rep) { rep = { m: SB.months[k], on: "", by: wk.me || H.goals.owner, files: [] }; SB.reports.push(rep); }
    if (files.length) { rep.files.push(...files); rep.on = today(); rep.by = wk.me || H.goals.owner; }
    sb.at = k;
    sb.flash = `<b>${esc(LONG[SB.months[k]])} is in.</b> ${got.length === 1 ? esc(got[0].m.short) + " updated" : got.length + " figures updated"}${files.length ? ", report attached" : ""}, and the charts have redrawn. Nothing is saved: a reload brings back the September sheet.`;
    closePanel(); location.hash === "#/goals" ? repaint() : (location.hash = "#/goals");
  }
  function sbAdd() {
    const opt = (v, t, on) => `<option value="${v}"${on ? " selected" : ""}>${t}</option>`;
    openPanel("Add a measure", "For the Scoreboard owner. In a live hub only they see this.",
      `<form id="sb-addform" class="sb-addf" novalidate>
        <label class="sb-f"><span>What are we measuring?</span><input name="name" required placeholder="For example: Lighting plans turned round in 48 hours"></label>
        <label class="sb-f"><span>Where does the figure come from?</span><input name="from" placeholder="Which report, and which line of it"></label>
        <div class="sb-two"><label class="sb-f"><span>Shown as</span><select name="unit">${opt("%", "A percentage", 1)}${opt("$k", "Dollars ($k)")}${opt("", "A number")}</select></label>
          <label class="sb-f"><span>Better is</span><select name="better">${opt("up", "Higher", 1)}${opt("down", "Lower")}</select></label></div>
        <label class="sb-f"><span>How the target works</span><select name="goal">${opt("flat", "One target all year", 1)}${opt("path", "Build up to it by March")}${opt("ytd", "A plan each month, added up")}</select></label>
        <div class="sb-two"><label class="sb-f"><span>Target (or plan per month)</span><input name="target" inputmode="decimal" placeholder="For example 90"></label>
          <label class="sb-f"><span>Where we started in April</span><input name="start" inputmode="decimal" placeholder="Only for build up"></label></div>
        <label class="sb-f"><span>Who looks after it</span><select name="owner">${H.people.map((p) => opt(p.id, esc(p.name), p.id === H.goals.owner)).join("")}</select></label>
        <span class="sb-f"><span>How to show it</span></span><div class="sb-types pick">${CHARTS.map((c, i) => `<label><input type="radio" name="chart" value="${c.k}"${i ? "" : " checked"}>${chartIcon(c.k)}<b>${c.n}</b><small>${c.d}</small></label>`).join("")}</div>
        <p class="sb-err" hidden></p>
        <button class="btn" type="submit" style="margin-top:16px">${icon("plus", 16)} Add it, then enter its figures</button></form>`);
  }
  function sbAddSave(form) {
    const f = (n) => String(form.elements[n].value).trim(), n2 = (n) => parseFloat(f(n).replace(/[$,%\sk]/gi, "")), goal = f("goal");
    const err = (t) => { const e = $(".sb-err", form); e.hidden = false; e.textContent = t; };
    if (!f("name")) return err("Give it a name first.");
    if (isNaN(n2("target"))) return err(goal === "ytd" ? "Add the plan for each month." : "Add a target.");
    if (goal === "path" && isNaN(n2("start"))) return err("Add where we started in April, so the plan can build from there.");
    const m = { id: "m" + Date.now(), group: "measure", added: true, name: f("name"), short: f("name").length > 28 ? f("name").slice(0, 26) + "..." : f("name"), unit: f("unit"), better: f("better"), goal,
      target: n2("target"), per: n2("target"), start: n2("start"), owner: f("owner"), from: f("from") || "To confirm", chart: form.querySelector("input[name=chart]:checked").value, values: SB.months.map(() => null) };
    if (m.unit !== "%" && m.unit !== "$k" && m.target % 1) m.dp = 1;
    SB.measures.push(m); repaint();
    popNow = null; sbUpdate(m.id, `<b>${esc(m.name)}</b> is on the board. Now enter its figures.`);
  }
  function sbRepPanel(mo) {
    const r = SB.reports.find((x) => x.m === mo);
    openPanel(`${LONG[mo]} ${fyYear(mo)} report`, "Kept with that month's figures",
      `<ul class="sb-replist">${r.files.map((f) => `<li>${icon("clip", 15)}<span>${esc(f.n)}</span><small>${esc(f.s)}</small></li>`).join("")}</ul>
      <div data-sbrepfor="${esc(mo)}" style="margin-top:14px">${attachBox("Attach another file to " + LONG[mo], "For example the board pack or a corrected KPI sheet")}</div>`);
  }
  // Hover and focus readout for every chart: value first, then the month and the plan
  function sbTip(hit) {
    const wrap = hit.closest(".sb-plot, .sb-prog"); if (!wrap) return;
    const tip = $(".sb-tip", wrap), ds = hit.dataset; tip.textContent = "";
    const b = document.createElement("b"); b.textContent = ds.tv; tip.appendChild(b);
    [ds.tm, ds.tg + " · " + ds.ts].forEach((t) => { const s = document.createElement("span"); s.textContent = t; tip.appendChild(s); });
    tip.hidden = false;
    const wr = wrap.getBoundingClientRect(), svg = hit.ownerSVGElement;
    let px = wr.width / 2;
    if (svg && ds.x) { const sr = svg.getBoundingClientRect(); px = sr.left - wr.left + (+ds.x) * sr.width / svg.viewBox.baseVal.width; const cr = $(".sb-cross", svg); if (cr) { cr.setAttribute("x1", ds.x); cr.setAttribute("x2", ds.x); cr.classList.add("on"); } }
    tip.style.left = Math.max(4, Math.min(wr.width - tip.offsetWidth - 4, px - tip.offsetWidth / 2)) + "px";
    $$(".sb-dot.hov", wrap).forEach((d) => d.classList.remove("hov"));
  }
  function sbTipOff(wrap) { const t = $(".sb-tip", wrap); if (t) t.hidden = true; const c = $(".sb-cross", wrap); if (c) c.classList.remove("on"); }
  // Home's "Our focus" reads the same figures, so an update shows there too
  function trendOf(m) { const k = m.values.map((v, i) => i).filter((i) => m.values[i] != null); return { name: m.name, unit: m.unit, months: k.map((i) => SB.months[i]), values: k.map((i) => m.values[i]), target: m.target }; }

  pages.glossary = function () {
    return `<span class="areatag">${icon("book", 13)} Across the whole hub</span><h1>Glossary</h1><p class="lede">Our own words. Underlined terms anywhere in the hub show their meaning when you hover or tap.</p>
      <div class="grid wide" style="margin-top:24px">${H.glossary.map((g) => `<div class="card"><h3>${esc(g.term)}</h3><p>${esc(g.def)}</p></div>`).join("")}</div>`;
  };

  const notFound = () => `<div class="card" style="max-width:520px;margin-top:40px"><h2 style="margin:0">That page isn't here</h2><p>Ask ${chip(H.company.hubOwner)}, who looks after the hub, or use "Suggest a change".</p><a class="btn" href="#/" style="align-self:flex-start;margin-top:8px">Back to Home</a></div>`;

  // ---------- a person: face, where they sit, "Ask me about" ----------
  function personPanel(id) {
    const p = person(id), up = p.reports && person(p.reports), team = orgKids(p.id);
    openPanel(p.name, esc(p.role), `<div class="pf-glance">${avatar(p.id, 88)}<div><span class="pill p-plain">${esc(p.team)}</span>${p.note ? ` <span class="pill p-plain">${esc(p.note)}</span>` : ""}
        <p class="small muted" style="margin:8px 0 0">${up ? `Reports to ${esc(up.name)}${p.day ? `, works day to day with ${esc(person(p.day).name)}` : ""}.` : "Founder."}${team.length ? ` Looks after ${team.map((x) => esc(x.name)).join(", ")}.` : ""}</p></div></div>
      <div class="pf-hook"><span class="eyebrow">Ask me about</span><ul class="ask-list">${p.asks.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></div>
      <p style="margin-top:16px"><a class="btn ghost sm" href="#/who">${icon("users", 15)} See the whole team</a></p>`);
  }

  // ---------- suggest a change ----------
  function suggestPanel() {
    const o = ownership(route()), owner = person(o.owner);
    openPanel("Suggest a change", `Goes to ${esc(owner.name)}, ${esc(owner.role)}`,
      `<p>Spotted something wrong or out of date in ${esc(o.what)}? Tell ${esc(owner.name)}, who looks after it.</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:10px"><textarea id="sg-text" rows="5" style="font:inherit;padding:12px;border:1px solid var(--line);border-radius:10px;background:#fff" placeholder="What's wrong or out of date, and what should it say?"></textarea>
      ${attachBox("Attach a screenshot or the newer document", "Optional")}<button class="btn" id="sg-send" style="align-self:flex-start">Send suggestion</button></div><div id="sg-done"></div>`);
  }

  // ---------- search (Ctrl+K) ----------
  let index = null, sel = 0;
  function buildIndex() {
    const i = [];
    H.tasks.forEach((t) => i.push({ t: "I want to: " + t.title, k: "Guide", href: "#/do/" + t.id }));
    H.areas.forEach((a) => i.push({ t: a.name, k: "Section", href: "#/" + a.id }));
    Object.keys(H.flows).forEach((fid) => { const f = H.flows[fid]; i.push({ t: f.name, k: "How We Work", href: "#/work/" + fid }); f.stages.forEach((s) => { const href = "#/work/" + fid + "?stage=" + s.id; i.push({ t: s.name, k: f.name, href }); s.tasks.forEach((t) => i.push({ t: t.t, k: f.short + " › " + s.name, href, extra: (t.by || []).map(roleName).join(" ") + " " + (t.who || "") })); }); });
    i.push({ t: "Gaps to sort", k: "How We Work", href: "#/work/gaps" });
    H.pathway.stops.forEach((x, n) => i.push({ t: x.t, k: area("people").name + " · stop " + (n + 1), href: "#/people/" + (n + 1), extra: x.line + (x.id === "quiz" ? " quiz" : "") }));
    H.resources.forEach((r) => i.push({ t: r.title, k: r.type, res: r.id, extra: r.folder + " " + r.format }));
    SB.measures.forEach((m) => i.push({ t: m.name, k: area("goals").name, href: "#/goals" }));
    H.people.forEach((p) => i.push({ t: p.name + ", " + p.role, k: "Person", person: p.id, extra: p.asks.join(" ") }));
    H.competitors.forEach((c) => i.push({ t: c.name, k: "Competitor", rival: c.id }));
    H.channels.forEach((c) => { i.push({ t: c.name, k: area("serve").name, href: "#/serve/" + c.id }); c.roles.forEach((r) => i.push({ t: r.name, k: c.short, profile: c.id + ":" + r.id, extra: (r.titles || []).join(" ") })); });
    H.products.categories.forEach((c) => c.groups.forEach((g) => g.items.forEach((p) => i.push({ t: p.n, k: c.name + (g.name ? " › " + g.name : ""), href: "#/offer/range" }))));
    H.glossary.forEach((g) => i.push({ t: g.term, k: "Glossary", href: "#/glossary", extra: g.def }));
    return i;
  }
  function openSearch() { index = index || buildIndex(); $("#palette").classList.add("on"); const inp = $("#pq"); inp.value = ""; runSearch(); setTimeout(() => inp.focus(), 30); }
  function closeSearch() { $("#palette").classList.remove("on"); }
  function runSearch() {
    const q = $("#pq").value.trim().toLowerCase(); sel = 0;
    const hits = (q ? index.filter((x) => (x.t + " " + x.k + " " + (x.extra || "")).toLowerCase().includes(q)) : index.slice(0, 8)).slice(0, 12);
    $("#pres").innerHTML = hits.length ? hits.map((h, n) => `<a href="${h.href || "#"}" class="${n === 0 ? "sel" : ""}" ${h.res ? `data-res="${h.res}"` : ""}${h.person ? `data-person="${h.person}"` : ""}${h.rival ? `data-rival="${h.rival}"` : ""}${h.channel ? `data-channel="${h.channel}"` : ""}${h.profile ? `data-profile="${h.profile}"` : ""}>${esc(h.t)}<small>${esc(h.k)}</small></a>`).join("")
      : `<div class="none">Nothing found for "${esc(q)}". Ask ${esc(person(H.company.hubOwner).name)}, who looks after the hub, or use "Suggest a change" so it gets added.</div>`;
  }

  // ---------- routing ----------
  function route() {
    let h = location.hash.replace(/^#\/?/, ""); const q = {};
    const qi = h.indexOf("?");
    if (qi >= 0) { h.slice(qi + 1).split("&").forEach((kv) => { const p = kv.split("="); q[p[0]] = decodeURIComponent(p[1] || ""); }); h = h.slice(0, qi); }
    const parts = h.split("/");
    return { page: parts[0] || "home", sub: parts[1] || "", extra: parts[2] || "", query: q };
  }
  function render() {
    const r = route(), fn = pages[r.page];
    closePanel(); closeSearch();
    const c = $("#content");
    c.classList.remove("still");
    c.innerHTML = fn ? fn(r.sub, r.query, r.extra) : notFound();
    c.style.animation = "none"; void c.offsetWidth; c.style.animation = "";
    $$(".menu a.nav").forEach((a) => a.classList.toggle("on", a.dataset.page === r.page));
    const a = area(r.page);
    let crumb = '<a href="#/">Home</a>';
    if (a) crumb += " › " + (r.sub ? `<a href="#/${a.id}">${esc(a.name)}</a>` : esc(a.name));
    if (r.page === "do") crumb += " › " + (r.sub ? `<a href="#/do">I want to...</a> › ${esc((byId(H.tasks, r.sub) || {}).title || "")}` : "I want to...");
    if (r.page === "glossary") crumb += " › Glossary";
    if (r.page === "people" && r.sub) crumb += " › " + esc((H.pathway.stops[+r.sub - 1] || {}).t || "");
    if (r.page === "blocks") crumb += " › Building blocks";
    if (r.page === "work" && r.sub) { const f = H.flows[flowId(r.sub)]; crumb += " › " + (f ? esc(f.name) : r.sub === "gaps" ? "Gaps to sort" : ""); }
    $("#crumb").innerHTML = crumb;
    paintStrip(r);
    document.title = (a ? a.name + " · " : r.page === "do" ? "I want to · " : "") + H.company.short + " Hub (demo)";
    $(".menu").classList.remove("open");
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { drawLinks(); centreStage(); });
  }

  // On phones the stage line scrolls sideways: bring the chosen stage into view
  function centreStage() { $$(".sline-wrap").forEach((w) => { const on = $(".sl.on", w); if (on && w.scrollWidth > w.clientWidth) w.scrollLeft += on.getBoundingClientRect().left - w.getBoundingClientRect().left - (w.clientWidth - on.offsetWidth) / 2; }); }
  // Redraw the page in place after a pick: no scroll jump, no fade
  function repaint() {
    const r = route(), fn = pages[r.page]; if (!fn) return;
    $("#content").classList.add("still");
    $("#content").innerHTML = fn(r.sub, r.query, r.extra);
    centreStage(); tbFilter();
  }

  // The battlecard's "Someone else": suggest a new profile to whoever looks after that channel
  function newProfilePanel(chId) {
    const ch = byId(H.channels, chId), owner = person(ch.owner);
    openPanel("Suggest a new profile", `Goes to ${esc(owner.name)}, who looks after the ${esc(ch.short)} profiles`,
      `<p>Met someone in ${esc(ch.name)} who doesn't fit any of our profiles? Tell ${esc(owner.name)}. If it keeps happening, it becomes a new profile, and every battlecard can use it.</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:10px"><textarea id="sg-text" rows="5" style="font:inherit;padding:12px;border:1px solid var(--line);border-radius:10px;background:#fff" placeholder="Their job title, what they cared about, what they asked, and how often you meet people like them.">${esc(bc.who)}</textarea>
      <button class="btn" id="sg-send" style="align-self:flex-start">Send suggestion</button></div><div id="sg-done"></div>`);
  }

  function shell() {
    document.body.innerHTML =
      `<div class="fiction" role="note">${esc(H.company.fictionNote)}</div>
      <div class="shell"><nav class="menu" aria-label="Hub menu"><a class="brand" href="#/" aria-label="Home">${logo(true, 190)}</a>
        <a class="nav home" href="#/" data-page="home">${icon("home")}Home</a>
        <a class="nav" href="#/do" data-page="do">${icon("spark")}I want to...</a>
        <div class="group">Our hub</div>
        ${H.areas.map((a) => `<a class="nav" href="#/${a.id}" data-page="${a.id}">${icon(a.icon)}${esc(a.name)}</a>`).join("")}
        <div class="group">Reference</div><a class="nav" href="#/glossary" data-page="glossary">${icon("book")}Glossary</a>
        <a class="nav" href="#/blocks" data-page="blocks">${icon("spark")}Building blocks <span class="pill p-ink" style="margin-left:auto;font-size:10px">Review</span></a>
        <div class="owner">${avatar(H.company.hubOwner, 30)}<span>Hub looked after by<br><b style="color:#fff">${esc(person(H.company.hubOwner).name)}</b></span></div></nav>
      <div class="main"><div class="topbar"><div style="display:flex;gap:10px;align-items:center;min-width:0"><button class="menu-btn" aria-label="Open menu">${icon("menu", 22)}</button><div class="crumb" id="crumb"></div></div>
        <div class="top-actions"><button class="searchbtn" id="searchbtn" aria-label="Search">${icon("search", 16)}<span>Search the hub</span><kbd>Ctrl K</kbd></button></div></div>
        <main class="content" id="content"></main><div class="ownstrip" id="ownstrip" role="contentinfo"></div></div></div>
      <div class="pop" id="pop" aria-hidden="true"><div class="pop-box" role="dialog" aria-modal="true" aria-labelledby="pop-h"><div class="pop-head"><div style="min-width:0"><button class="pop-back" id="pop-back" hidden></button><div id="panel-title"></div></div><button class="x" aria-label="Close">&times;</button></div><div class="pop-body" id="panel-body"></div></div></div>
      <div class="palette" id="palette"><div class="box" role="dialog" aria-label="Search"><input id="pq" placeholder="Search steps, resources, people, competitors..." autocomplete="off"><div class="res" id="pres"></div></div></div>`;
  }

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-channel],[data-rival],[data-res],[data-person],[data-tab],[data-cat],[data-lib],[data-view],[data-go],[data-print],[data-item],[data-stage],[data-task],[data-blkrole],[data-wklayout],[data-wkch],[data-meclear],[data-bts],[data-gapf],[data-gapnew],[data-gapstatus],[data-unattach],[data-real],[data-suggest],[data-stagepop],[data-mpstage],[data-mp],[data-dflow],[data-newprofile],[data-profile],[data-rfield],[data-gsort],[data-ms],[data-val],[data-ask],[data-word],[data-quiz],[data-resattach],[data-attkind],[data-tbview],[data-sbat],[data-sbupd],[data-sbm],[data-sbtype],[data-sbadd],[data-sbrep],[data-sbfile],[data-sbjump],.x,#pop-back,#sg-send,#searchbtn,.menu-btn,#palette,#pop");
    if (!t) return;
    if (t.id === "palette") { if (e.target === t) closeSearch(); return; }
    if (t.dataset.task !== undefined && (e.target.closest(".gaptag") || t.closest(".tasks.single"))) return;
    if (t.id === "pop") { if (e.target === t) closePanel(); return; }
    const ds = t.dataset;
    if (ds.channel || ds.rival || ds.res || ds.person || ds.profile || ds.resattach) { e.preventDefault(); closeSearch(); }
    if (ds.resattach) { resPanel(ds.resattach, true); return; }
    if (ds.profile) { if (ds.swap) popNow = null; keepNotes(); profilePanel(ds.profile); }
    else if (ds.channel) channelPanel(ds.channel);
    else if (ds.rival) rivalPanel(ds.rival);
    else if (ds.res) resPanel(ds.res);
    else if (ds.person) personPanel(ds.person);
    else if (ds.ms) { storyMs = +ds.ms; repaint(); const r = $(".ms-rail"), on = $(".ms-rail .on"); if (r && on && r.scrollWidth > r.clientWidth) r.scrollLeft = on.offsetLeft - (r.clientWidth - on.offsetWidth) / 2; }
    else if (ds.val) { storyVal = +ds.val; repaint(); }
    else if (ds.ask) { const i = $("#ask-q"); if (i) { i.value = i.value === ds.ask ? "" : ds.ask; findAsk(i.value); } }
    else if (ds.word) { const on = !t.classList.contains("on"); t.classList.toggle("on", on); t.setAttribute("aria-pressed", on); }
    else if (ds.quiz) { if (ds.quiz === "next") quiz.i++; else if (ds.quiz === "again") { quiz.i = 0; quiz.picks = []; } else quiz.picks[quiz.i] = +ds.quiz; repaint(); }
    else if (ds.tab) { offerTab = ds.tab; location.hash = "#/offer/" + ds.tab; }
    else if (ds.cat) { cat = +ds.cat; repaint(); }
    else if (ds.rfield) { const f = H.rivalFields.find((x) => x.k === ds.rfield); if (f) f.on = !f.on; repaint(); }
    else if (ds.gsort) { gridSort = +ds.gsort === gridSort ? -1 : +ds.gsort; repaint(); }
    else if (ds.lib !== undefined) { tb.folder = ds.lib; repaint(); }
    else if (ds.tbview) { tb.view = ds.tbview; repaint(); }
    else if (ds.attkind) { const r = byId(H.resources, ds.for), box = t.closest(".pop-body"); $$(".dz-kind button", box).forEach((b) => b.classList.toggle("on", b === t)); $(".attach-drop b", box).textContent = ["Attach a newer version", "Attach a filled-in copy", "Attach a photo"][+ds.attkind]; $(".attach-drop small", box).textContent = ATT_KINDS[+ds.attkind][1](r); }
    else if (ds.sbat !== undefined) { sb.at = +ds.sbat; repaint(); }
    else if (ds.sbupd) sbUpdate(ds.sbupd);
    else if (ds.sbm) sbDetail(ds.sbm);
    else if (ds.sbtype) { const [id, k] = ds.sbtype.split("|"); measure(id).chart = k; repaint(); popNow = null; sbDetail(id); }
    else if (ds.sbadd) sbAdd();
    else if (ds.sbrep) sbRepPanel(ds.sbrep);
    else if (ds.sbfile) openPanel(ds.sbfile, "A report kept on the Scoreboard", `<div class="tip">${icon("info", 18)}<span>In a live hub this opens the file. This demo has no real files behind it, and anything you attach stays in your browser only.</span></div>`);
    else if (ds.sbjump) { const p = $("#sb-past"); if (p) p.scrollIntoView({ behavior: "smooth", block: "start" }); }
    else if (ds.view) { view = ds.view; wk.me = ""; dash.flow = ""; store.set("view", view); render(); }
    else if (ds.go) location.hash = ds.go;
    else if (ds.print) { keepNotes(); document.body.classList.toggle("print-card", !!t.closest(".journey")); window.print(); }
    else if (ds.item) { bc.off[ds.item] = !t.checked; t.closest(".item").classList.toggle("off", !t.checked); }
    else if (ds.stage) selectStage(ds.stage, ds.ch);
    else if (ds.stagepop) stagePop(ds.stagepop);
    else if (ds.mpstage) { const { s } = stageOf(ds.mpstage); if (s && s.card) { keepNotes(); bc.stage = s.card; repaint(); } }
    else if (ds.mp !== undefined) { const [k, v] = ds.mp.split("|"); keepNotes(); if (k === "ch" && v !== bc.ch) { bc.ch = v; bc.role = ""; bc.off = {}; } else if (k === "role" && v !== bc.role) { bc.role = v; bc.off = {}; } else if (k === "vs") bc.vs = v; repaint(); }
    else if (ds.dflow) { dash.flow = ds.dflow; repaint(); }
    else if (ds.newprofile) { keepNotes(); newProfilePanel(ds.newprofile); }
    else if (ds.task !== undefined) { const li = t.closest(".tk"), on = !li.classList.contains("open"); li.classList.toggle("open", on); t.setAttribute("aria-expanded", on); }
    else if (ds.blkrole) { blk.role = ds.blkrole; blk.stage = ""; render(); }
    else if (ds.wklayout) { wk.layout = ds.wklayout; refreshWork(); }
    else if (ds.wkch !== undefined) { wk.ch = ds.wkch; refreshWork(); }
    else if (ds.meclear) { e.preventDefault(); wk.me = ""; refreshWork(); }
    else if (ds.bts) { const b = byId(H.work.behind, ds.bts); openPanel(b.name, "Behind the scenes · Owner " + chip(b.owner), `<p>${esc(b.line)}</p><div class="tip">${icon("info", 18)}<span>Listed only in this demo. In a full hub it is mapped like the lanes, with its own stages, tasks and documents.</span></div>`); }
    else if (ds.gapf) { wk.gapf = ds.gapf; refreshWork(); }
    else if (ds.gapnew) { wk.adding = ds.gapnew === "1"; refreshWork(); if (wk.adding) setTimeout(() => { const i = $("#gap-new input"); if (i) i.focus(); }, 30); }
    else if (ds.gapstatus) { const [id, st] = ds.gapstatus.split("|"), g = gapById(id); if (g) g.status = st; refreshWork(); }
    else if (ds.unattach !== undefined) t.closest("li").remove();
    else if (ds.real) t.closest(".pop-body").querySelector(".real-note").innerHTML = `<div class="tip" style="margin-top:8px">${icon("info", 18)}<span>In a live hub this opens the document right where ${esc(H.company.short)} keeps it. This demo has no real documents behind it.</span></div>`;
    else if (ds.suggest) suggestPanel();
    else if (t.id === "pop-back") popBack();
    else if (t.classList.contains("x")) closePanel();
    else if (t.id === "sg-send") $("#sg-done").innerHTML = `<div class="tip">${icon("edit", 18)}<span>Thanks. In a live hub, this emails the owner of this section so they can make the change. This demo doesn't send anything.</span></div>`;
    else if (t.id === "searchbtn") openSearch();
    else if (t.classList.contains("menu-btn")) $(".menu").classList.toggle("open");
  });
  document.addEventListener("change", (e) => {
    const id = e.target.id;
    if (!/^bc-(ch|role|stage|type|vs)$/.test(id)) return;
    keepNotes();
    const key = id.slice(3); bc[key] = e.target.value;
    if (key === "ch" || key === "role") bc.off = {};
    if (key === "ch") { bc.role = ""; $("#content").innerHTML = pages.toolkit("", {}); return; }
    refreshSheet();
  });
  // How We Work choices: show my steps, gaps lane filter, assigning a gap, adding a gap (on screen only)
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.id === "wk-me") { wk.me = t.value; refreshWork(); }
    else if (t.id === "dash-me") { wk.me = t.value; dash.flow = ""; const v = viewOf(t.value); view = v ? v.id : "all"; repaint(); }
    else if (t.id === "gap-lane") { history.replaceState(null, "", "#/work/gaps" + (t.value ? "?lane=" + t.value : "")); refreshWork(); }
    else if (t.dataset && t.dataset.gapowner) { const g = gapById(t.dataset.gapowner); if (g) g.owner = t.value; }
  });
  // Scoreboard: update figures, add a measure, prefill a month that's already in, chart readouts on hover and focus
  document.addEventListener("submit", (e) => { if (e.target.id === "sb-form") { e.preventDefault(); sbSave(e.target); } else if (e.target.id === "sb-addform") { e.preventDefault(); sbAddSave(e.target); } });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "mo" && t.form && t.form.id === "sb-form") { const k = +t.value; $$(".sb-in input", t.form).forEach((i) => { const m = measure(i.name); i.value = m && k < m.values.length && m.values[k] != null ? m.values[k] : ""; }); }
  });
  ["pointerover", "focusin"].forEach((ev) => document.addEventListener(ev, (e) => { const h = e.target.closest && e.target.closest(".sb-hit, .sb-track"); if (h) sbTip(h); }));
  document.addEventListener("pointerout", (e) => { const w = e.target.closest && e.target.closest(".sb-plot, .sb-prog"); if (w && !w.contains(e.relatedTarget)) sbTipOff(w); });
  document.addEventListener("focusout", (e) => { const w = e.target.closest && e.target.closest(".sb-plot, .sb-prog"); if (w) sbTipOff(w); });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "gap-new") return;
    e.preventDefault();
    const f = new FormData(e.target);
    H.gaps.unshift({ id: "new-" + Date.now(), t: f.get("t").trim(), d: f.get("d").trim(), at: f.get("at"), owner: f.get("owner"), status: "Open", from: "", added: true, raised: today() });
    wk.adding = false; wk.gapf = "open"; refreshWork();
  });
  // Attach a file: choose or drop. Files stay in the browser; nothing is uploaded anywhere.
  document.addEventListener("change", (e) => { if (e.target.matches("[data-attach]")) { const box = e.target.closest(".attach"); addFiles(box, e.target.files); keepRep(box, e.target.files); e.target.value = ""; } });
  ["dragenter", "dragover"].forEach((ev) => document.addEventListener(ev, (e) => { const d = e.target.closest && e.target.closest(".attach-drop"); if (d) { e.preventDefault(); d.classList.add("over"); } }));
  document.addEventListener("dragleave", (e) => { const d = e.target.closest && e.target.closest(".attach-drop"); if (d) d.classList.remove("over"); });
  document.addEventListener("drop", (e) => { const d = e.target.closest && e.target.closest(".attach-drop"); if (d) { e.preventDefault(); d.classList.remove("over"); addFiles(d.closest(".attach"), e.dataTransfer.files); keepRep(d.closest(".attach"), e.dataTransfer.files); } });
  document.addEventListener("input", (e) => { if (e.target.id === "tb-q") { tb.q = e.target.value; tbFilter(); } if (e.target.id === "pq") runSearch(); if (e.target.id === "ask-q") findAsk(e.target.value); if (e.target.dataset && e.target.dataset.k) bc[e.target.dataset.k] = e.target.innerText; });
  window.addEventListener("afterprint", () => document.body.classList.remove("print-card"));
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches("[data-task]")) { e.preventDefault(); e.target.click(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); return; }
    if (e.key === "Escape") { if ($("#palette").classList.contains("on")) closeSearch(); else closePanel(); return; }
    if ($("#palette").classList.contains("on")) {
      const links = $$("#pres a"); if (!links.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); links[sel].classList.remove("sel"); sel = (sel + (e.key === "ArrowDown" ? 1 : links.length - 1)) % links.length; links[sel].classList.add("sel"); links[sel].scrollIntoView({ block: "nearest" }); }
      if (e.key === "Enter") { e.preventDefault(); links[sel].click(); if (!links[sel].dataset.res && !links[sel].dataset.person && !links[sel].dataset.rival && !links[sel].dataset.channel && !links[sel].dataset.profile) { location.hash = links[sel].getAttribute("href"); closeSearch(); } }
    }
  });
  window.addEventListener("hashchange", render);
  window.addEventListener("resize", () => requestAnimationFrame(drawLinks));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLinks);

  shell();
  render();
})();
