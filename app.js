/* Nova autonomy decision prototype. Synthetic data only. */

const ACCOUNTS = {
  meridian: {
    id: "meridian",
    switchLabel: "Meridian Steel",
    name: "Meridian Steel Erectors, Inc.",
    meta: "San Jose, CA · in business since 2012 · 64 W-2",
    coverage: "Workers comp + GL · $2M / $4M",
    broker: "Pinnacle Risk Advisors",
    submitted: "Submitted Apr 23, 2026 · 09:14 PT",
    reconcile: "12 of 14 fields · 2 missing · reconciled across 4 sources",
    reconcileWarn: true,
    packet: [
      { name: "Meridian_Application_2026-04.pdf", kind: "PDF", parsed: "9 pages · 12 fields sourced",
        body: [
          "SHEPHERD                               WORKERS COMPENSATION APPLICATION",
          "═══════════════════════════════════════════════════════════════════════",
          "Policyholder   Meridian Steel Erectors, Inc.            NAICS 238120",
          "Address        4400 Alvis Rd, San Jose, CA 95111",
          "Form          WCA 2026 (page 1 of 9)",
          "",
          "Section 2A    Requested coverage effective 07/01/2026",
          "Section 2A    Estimated annual payroll ......... $18,420,000",
          "Section 3     Prior year revenue ................ $21,700,000",
          "Section 5     States of operation ............... CA, NV, AZ",
          "Section 9     Operations: steel erection 65% / shop fabrication 35%",
          "Section 10    Percentage of work subcontracted .. 42%",
          "Section 11    3-year prior premium history ...... [blank]",
          "Section 12    Experience modification reported .. 1.04",
          "Section 13    Ownership: privately held, 2 principals",
          "",
          "Signature: J. Meridian, President, 04/21/2026"
        ] },
      { name: "Meridian_LossRun_2021-2025.xlsx", kind: "XLSX", parsed: "4 sheets · 22 claim rows",
        body: [
          "Sheet 1 of 4: Claims table (2021 through 2025)",
          "═══════════════════════════════════════════════════════════════════════",
          "Claim     Year    Type     Amount     Description",
          "LR-231    2021    WC        77,000    MCL strain, fabrication shop",
          "LR-312    2022    WC        88,000    Lift failure at jobsite",
          "LR-403    2023    GL        93,000    Property damage, client site",
          "LR-477    2024    WC       124,000    Scissor-lift inj... [truncated]",
          "LR-510    2025    Auto      67,000    Collision, yard",
          "",
          "5 claims, 5 years total ........... $449,000",
          "Sheets 2-4: paid / reserved splits, notes, audit trail"
        ] },
      { name: "Meridian_Payroll_Cert_2025.xlsx", kind: "XLSX", parsed: "6 columns · 12 rows",
        body: [
          "Payroll certification, policy year 2025 (certified by CPA)",
          "═══════════════════════════════════════════════════════════════════════",
          "Class description          Code       Payroll     Share",
          "Iron / steel erection      5110       11,600,000  63%",
          "Steel fabrication          5606        4,050,000  22%",
          "Clerical and other         8810        2,770,000  15%",
          "",
          "Column D totals ............. $18,420,000",
          "Match vs application §2A .... within 0.4%"
        ] },
      { name: "Meridian_Subcontractor_List_2026.csv", kind: "CSV", parsed: "26 rows · 5 columns",
        body: [
          "sub_name,trade,%_of_work,annual_pay,coi_on_file",
          "Apex Rigging Inc.,Rigging,12%,920,000,Yes",
          "Vallejo Steel LLC,Steel erection,9%,780,000,No",
          "KP Hoist & Crane,Crane rental,8%,610,000,Yes",
          "Sierra Welding Co.,Welding,6%,470,000,No",
          "Bayline Scaffold,Scaffolding,5%,390,000,No",
          "... 21 more rows ...",
          "Summary: 8 of 26 subs have a COI on file; 18 do not",
          "Column F (coi_on_file) blank for 18 rows"
        ] }
    ],
    facts: [
      { id: "F1", label: "Total insurable payroll", value: "$18,420,000",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.4 §2A", false], ["Payroll_Cert_2025.xlsx · col D", false]] },
      { id: "F2", label: "Payroll mix · iron / steel erection", value: "63% · class 5110",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Payroll_Cert_2025.xlsx · rows 3-7 col D", false]] },
      { id: "F3", label: "2025 revenue", value: "$21,700,000",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.3 §2B", false]] },
      { id: "F4", label: "5-year loss history", value: "5 claims · $449,000",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["LossRun_2021-2025.xlsx · Claims rows 2-6", false]] },
      { id: "F5", label: "Largest single loss", value: "$124,000 · 2024",
        flags: [["med", "Medium conf."], ["material", "Material"]],
        cites: [["LossRun_2021-2025.xlsx · Claims row 6 col E", true]],
        lowWhy: "Cause description truncated in source" },
      { id: "F6", label: "Operations mix", value: "Steel 65% · fab 35%",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.5 §9", false]] },
      { id: "F7", label: "Subcontracted share of work", value: "42%",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.5 §10", false], ["Subcontractor_List_2026.csv · col C", false]] },
      { id: "F8", label: "Experience modification", value: "1.04 · reported",
        flags: [["med", "Medium conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.6 §11", true]],
        lowWhy: "Unverifiable: prior premium history blank" }
    ],
    missing: [
      { id: "M1", ref: "M1",
        field: "Subcontractor certificates of insurance",
        detail: "18 of 26 subs listed without a COI on file. 42% of work subcontracted.",
        why: "Uncertified sub work on high-hazard erection projects is a leading source of gap exposure.",
        cite: "Subcontractor_List_2026.csv · col F blank" },
      { id: "M2", ref: "M2",
        field: "3-year prior premium history",
        detail: "Section 11 of the application is blank.",
        why: "Nova cannot validate the reported 1.04 experience modification or prior pricing trend.",
        cite: "Application.pdf · p.6 §11 blank" }
    ],
    seeAll: "All material fields present",
    decision: {
      level: "Escalate to underwriter",
      ladderRung: 2,
      reviewed: "Nova reviewed in 14s · 4 sources",
      summary: "2 material gaps and 1 source below the confidence bar. Definition of correct cannot be met unsupervised.",
      display: { big: "Escalate to underwriter", sub: "Human takes over · full cited packet" },
      why: [
        { t: "63% of payroll sits in high-hazard class 5110 (iron / steel erection)", refs: [["F2", "fact"]] },
        { t: "$124K single loss is 28% of the 5-year total; cause description below confidence bar", refs: [["F5", "fact"]] },
        { t: "42% subcontracted with no certificates of insurance on file", refs: [["M1", "missing"]] },
        { t: "Prior premium history blank, blocks experience-mod validation", refs: [["M2", "missing"]] }
      ],
      note: "Request COIs for the 18 subs without certificates and loss-run cause codes. Nova re-reviews on receipt.",
      cta: "Escalate to underwriter",
      ctaSub: "Full cited packet goes to the underwriting queue",
      alt: "Auto-price",
      altNote: "Not available: 2 material gaps · 1 source below confidence bar",
      doneTitle: "Escalated to underwriting",
      doneSub: "Assigned to Qualantis R. · P&C underwriting · packet with citations attached",
      doneNote: "Nova re-reviews the account when COIs and loss cause codes arrive."
    }
  },

  copper: {
    id: "copper",
    switchLabel: "Copper Summit",
    name: "Copper Summit Contracting LLC",
    meta: "Reno, NV · in business since 2016 · 28 W-2",
    coverage: "Workers comp + GL · $1M / $2M",
    broker: "Basin & Range Insurance",
    submitted: "Submitted Apr 21, 2026 · 14:02 PT",
    reconcile: "11 of 11 fields · 0 missing · reconciled across 4 sources",
    reconcileWarn: false,
    packet: [
      { name: "CopperSummit_Application_2026-04.pdf", kind: "PDF", parsed: "8 pages · 11 fields sourced",
        body: [
          "SHEPHERD                               WORKERS COMPENSATION APPLICATION",
          "═══════════════════════════════════════════════════════════════════════",
          "Policyholder   Copper Summit Contracting LLC           NAICS 238320",
          "Address        1100 Mill St, Reno, NV 89502",
          "Form          WCA 2026 (page 1 of 8)",
          "",
          "Section 2A    Requested coverage effective 06/01/2026",
          "Section 2A    Estimated annual payroll ......... $9,120,000",
          "Section 3     Prior year revenue ................ $11,400,000",
          "Section 5     States of operation ............... NV, CA",
          "Section 9     Operations: interior build-out 100%",
          "Section 10    Percentage of work subcontracted .. 0%",
          "Section 11    3-year prior premium history ...... attached",
          "Section 12    Experience modification reported .. 0.86",
          "Section 13    Ownership: LLC, 1 member",
          "",
          "Signature: C. Hackett, Member, 04/19/2026"
        ] },
      { name: "CopperSummit_LossRun_2021-2025.xlsx", kind: "XLSX", parsed: "3 sheets · 9 claim rows",
        body: [
          "Sheet 1 of 3: Claims table (2021 through 2025)",
          "═══════════════════════════════════════════════════════════════════════",
          "Claim     Year    Type     Amount     Description",
          "CS-118    2022    GL         8,200    Slip and fall, office area",
          "",
          "1 claim, 5 years total .......... $8,200",
          "Claims in last 36 months ........ 0",
          "Sheets 2-3: paid / reserved splits, audit trail"
        ] },
      { name: "CopperSummit_Payroll_Cert_2025.xlsx", kind: "XLSX", parsed: "5 columns · 8 rows",
        body: [
          "Payroll certification, policy year 2025 (certified by CPA)",
          "═══════════════════════════════════════════════════════════════════════",
          "Class description              Code     Payroll     Share",
          "Carpentry, interior            5645     6,750,000   74%",
          "Sheet metal work               5545     1,470,000   16%",
          "Clerical and other             8810       900,000   10%",
          "",
          "Column D totals ................ $9,120,000",
          "Match vs application §2A ....... within 2.1%"
        ] },
      { name: "CopperSummit_COIs_2026.pdf", kind: "PDF", parsed: "6 pages · 4 of 4 certificates",
        body: [
          "Certificates of insurance, all subs and vendors",
          "═══════════════════════════════════════════════════════════════════════",
          "1. Reno Drywall Supply ............ fully insured",
          "2. Summit Tool Rental .............. fully insured",
          "3. Basin & Range Temp Staffing ..... fully insured",
          "4. Capital Scaffold Service ........ fully insured",
          "",
          "No subcontracting exposure reported; certificates attached",
          "for the 4 recurring vendors"
        ] }
    ],
    facts: [
      { id: "F1", label: "Total insurable payroll", value: "$9,120,000",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.4 §2A", false], ["Payroll_Cert_2025.xlsx · col D", false]] },
      { id: "F2", label: "Payroll mix · interior carpentry", value: "74% · class 5645",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Payroll_Cert_2025.xlsx · rows 2-6 col D", false]] },
      { id: "F3", label: "2025 revenue", value: "$11,400,000",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.3 §2B", false]] },
      { id: "F4", label: "5-year loss history", value: "1 claim · $8,200",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["LossRun_2021-2025.xlsx · Claims row 2", false]] },
      { id: "F5", label: "Claims in last 36 months", value: "0",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["LossRun_2021-2025.xlsx · Claims rows 1-9", false]] },
      { id: "F6", label: "Operations", value: "Interior build-out 100%",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.5 §9", false]] },
      { id: "F7", label: "Subcontracted work", value: "0% · statement on file",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.5 §10", false], ["COIs_2026.pdf · cover", false]] },
      { id: "F8", label: "Experience modification", value: "0.86 · verified",
        flags: [["hi", "High conf."], ["material", "Material"]],
        cites: [["Application.pdf · p.6 §11", false], ["Carrier cert · attached", false]] }
    ],
    missing: [],
    seeAll: "All material fields present",
    decision: {
      level: "Auto-price",
      ladderRung: 0,
      reviewed: "Nova reviewed in 12s · 4 sources",
      summary: "Every material field sourced at high confidence, no gaps, clean loss history. Definition of correct met.",
      display: { big: "$58,300", sub: "Auto-price · within ±12% of supervised comparison set" },
      why: [
        { t: "All material fields sourced at high confidence (payroll, class mix, losses)", refs: [["F1", "fact"], ["F2", "fact"]] },
        { t: "0 claims in 36 months; single 5-year claim of $8.2K", refs: [["F4", "fact"], ["F5", "fact"]] },
        { t: "No subcontracting exposure; vendor certificates all on file", refs: [["F7", "fact"]] },
        { t: "Payroll certification reconciles within 2.1% of the application", refs: [["F1", "fact"]] }
      ],
      note: "No intervention needed. Priced account queued to broker with cited packet.",
      cta: "Auto-price at $58,300",
      ctaSub: "Priced account ships to the broker with the cited packet",
      alt: "Escalate to underwriter",
      altNote: "No material gaps surfaced for review",
      doneTitle: "Account auto-priced",
      doneSub: "Indication $58,300 queued for Basin & Range Insurance · cited packet attached",
      doneNote: "Definition of correct met: all material fields sourced at high confidence."
    }
  }
};

const state = { acct: null, decided: null };

const $ = (sel) => document.querySelector(sel);

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const KIND_ICON = { PDF: "PDF", XLSX: "XLSX", CSV: "CSV" };

function renderSwitch() {
  const wrap = $("#accountSwitch");
  wrap.innerHTML = "";
  Object.values(ACCOUNTS).forEach((a) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = a.switchLabel;
    b.className = a.id === state.acct.id ? "active" : "";
    b.addEventListener("click", () => selectAccount(a.id));
    wrap.appendChild(b);
  });
}

function renderPacket(acct) {
  const head = `<div class="panel-head">
      <div class="panel-title">1 · Submission packet</div>
      <div class="panel-sub">${esc(acct.broker)} · ${esc(acct.submitted)}</div>
    </div>`;
  const acctCard = `<div class="packet-account">
      <div class="acct-name">${esc(acct.name)}</div>
      <div class="acct-meta">${esc(acct.meta)}</div>
      <div class="acct-line">Submitted by ${esc(acct.broker)}</div>
      <span class="acct-coverage">${esc(acct.coverage)}</span>
    </div>`;
  const docs = acct.packet.map((d, i) => `
    <button type="button" class="doc-row" data-doc="${i}">
      <span class="doc-top">
        <span class="doc-kind">${d.kind}</span>
        <span class="doc-name">${esc(d.name)}</span>
        <span class="doc-chev" aria-hidden="true"><svg viewBox="0 0 10 10" width="10" height="10" fill="none"><path d="M1.6 2.8 L7.6 5 L1.6 7.2" stroke="#758696" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </span>
      <span class="doc-parse">${esc(d.parsed)}</span>
    </button>`).join("");
  const foot = `<div class="packet-foot"><span class="pulse" aria-hidden="true"></span>
    Nova extracted and reconciled ${acct.facts.length} facts from this packet</div>`;
  $("#packetPanel").innerHTML = head + acctCard + `<div class="doc-list">` + docs + `</div>` + foot;

  document.querySelectorAll(".doc-row").forEach((row) => {
    row.addEventListener("click", () => openDoc(acct, Number(row.dataset.doc)));
  });
}

function flagHtml(flags) {
  return flags.map((f) => {
    const cls = f[0] === "hi" ? "hi" : f[0] === "med" ? "med" : "material";
    return `<span class="flag ${cls}"><span class="dot" aria-hidden="true"></span>${esc(f[1])}</span>`;
  }).join("");
}

function citeHtml(cites) {
  return cites.map((c) => {
    const warnCls = c[1] ? " warn" : "";
    const title = c[1] ? ' title="Source below confidence bar"' : "";
    return `<span class="cite${warnCls}"${title}><span class="cite-doc" aria-hidden="true"></span>${esc(c[0])}${c[1] ? " · low conf." : ""}</span>`;
  }).join("");
}

function renderFacts(acct) {
  const pill = acct.reconcileWarn ? "warn" : "";
  const head = `<div class="facts-head">
      <div class="facts-title">2 · Extracted facts</div>
      <span class="reconcile-pill ${pill}">${esc(acct.reconcile)}</span>
    </div>`;

  let missingHtml = "";
  if (acct.missing.length > 0) {
    missingHtml = `<div class="missing-list">` + acct.missing.map((m) => `
      <div class="missing-card flashable" data-ref="${m.ref}">
        <span class="missing-icon" aria-hidden="true">
          <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
            <path d="M9 2 L2 9 L16 9 L10 16 L12 12 Z" fill="#7c4b08"/>
            <path d="M9 10 L10.6 10 L10.6 6.4" stroke="#7c4b08" stroke-width="1.2" fill="none"/>
          </svg>
        </span>
        <span class="m-body">
          <div class="missing-field">Missing field · ${esc(m.field)}</div>
          <div class="missing-detail">${esc(m.detail)}</div>
          <div class="missing-why">${esc(m.why)}</div>
          <span class="missing-cite">${esc(m.cite)}</span>
        </span>
      </div>`).join("") + `</div>`;
  } else {
    missingHtml = `<div class="all-clear">
      <span class="ok-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path d="M3 3 h10 v10 h-10 v-10 Z" stroke="#1f6f3a" stroke-width="2" fill="none"/>
          <path d="M4 8 l4 0 M8 8 l0 4 M8 8 l4 0 M8 8 l0 -4" stroke="#1f6f3a" stroke-width="1.6" fill="none"/>
        </svg>
      </span>
      <span>
        <div class="ac-title">No missing fields</div>
        <div class="ac-sub">All 11 material fields present · nothing blocked the price</div>
      </span>
    </div>`;
  }

  const facts = acct.facts.map((f) => {
    const low = f.lowWhy ? `<div class="missing-detail">${esc(f.lowWhy)}</div>` : "";
    return `<div class="fact-row flashable" data-ref="${f.id}">
      <div class="fact-top">
        <span class="fact-id">${f.id}</span>
        <span class="fact-label">${esc(f.label)}</span>
        <span class="fact-value">${esc(f.value)}</span>
      </div>
      <div class="fact-flags">${flagHtml(f.flags)}</div>
      ${low}
      <div class="cite-row">${citeHtml(f.cites)}</div>
    </div>`;
  }).join("");

  $("#factsPanel").innerHTML = head + missingHtml + `<div class="fact-list">` + facts + `</div>`;
}

const LADDER_RUNGS = [
  ["Auto-price", "unsupervised"],
  ["Supervised indication", "human reviews price"],
  ["Escalate", "human takes over"]
];

function renderDecision(acct) {
  const d = acct.decision;
  const ladder = `<div class="ladder">
      <div class="ladder-title">Autonomy ladder</div>
      <div class="ladder-rungs">` +
    LADDER_RUNGS.map((r, i) => `
      <div class="rung${i === d.ladderRung ? " active" : ""}">
        <span class="rung-dot" aria-hidden="true"></span>
        <span><span class="rung-name">${r[0]}</span> <span class="rung-note">· ${r[1]}</span></span>
      </div>`).join("") + `</div></div>`;

  const why = `<div class="why-block">
      <div class="why-label">Cited why</div>
      <ul class="why-list">` +
    d.why.map((w) => {
      const refs = w.refs.map((r) => {
        return `<span class="ref-chip${r[1] === "missing" ? " warn" : ""}">${r[0]}</span>`;
      }).join("");
      return `<li class="why-item" data-refs="${esc(w.refs.map(r => r[0]).join(" "))}">
        <span class="why-bullet" aria-hidden="true"></span>
        <span>${esc(w.t)}<span class="why-refs">${refs}</span></span>
      </li>`;
    }).join("") + `</ul></div>`;

  const note = `<div class="note-block">
      <div class="note-label">Suggested underwriter note</div>
      <div class="note-card">${esc(d.note)}</div>
    </div>`;

  const done = state.decided === acct.id;
  let actions;
  if (done) {
    const dt = d.doneTitle;
    actions = `<div class="actions-block">
      <div class="actions-done">
        <div class="done-title"><span class="done-icon" aria-hidden="true">
          <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
            <path d="M3 3 h12 v12 h-12 v-12 Z" stroke="#1f6f3a" stroke-width="2.2" fill="none"/>
            <path d="M5 9 l4 0 M9 9 l0 4 M9 9 l4 0 M9 9 l0 -4" stroke="#1f6f3a" stroke-width="1.8" fill="none"/>
          </svg>
        </span>${esc(dt)}</div>
        <div class="done-sub">${esc(d.doneSub)}</div>
        <div class="done-note">${esc(d.doneNote)}</div>
      </div>
      <button type="button" class="reset-link" id="resetDecision">Reset walkthrough</button>
    </div>`;
  } else {
    actions = `<div class="actions-block">
      <button type="button" class="btn btn-primary" id="doCta">${esc(d.cta)}<span class="ghost-note"></span></button>
      <button type="button" class="btn btn-ghost" disabled title="${esc(d.altNote)}">${esc(d.alt)}<span class="ghost-note">${esc(d.altNote)}</span></button>
    </div>`;
  }

  const reco = `<div class="reco">
      <div class="reco-label">Nova recommends</div>
      <div class="reco-value">${esc(d.display.big)}</div>
      <div class="reco-sub">${esc(d.display.sub)}${d.level === "Auto-price" ? ` <span class="reco-price">· definition of correct met</span>` : ""}</div>
    </div>`;

  $("#decisionPanel").innerHTML = `<div class="decision-head">
      <div class="decision-label">3 · Autonomy decision</div>
      <div class="decision-title">${esc(d.level)}</div>
      <div class="decision-meta">${esc(d.reviewed)}</div>
    </div>` + ladder + reco + why + note + actions;

  if (!done) {
    $("#doCta").addEventListener("click", () => {
      state.decided = acct.id;
      renderDecision(acct);
    });
  }
  const reset = $("#resetDecision");
  if (reset) {
    reset.addEventListener("click", () => {
      state.decided = null;
      renderDecision(acct);
    });
  }

  document.querySelectorAll(".why-item").forEach((li) => {
    li.addEventListener("click", () => {
      const refs = li.dataset.refs.split(" ");
      refs.forEach((ref) => {
        const node = document.querySelector(`[data-ref="${ref}"]`);
        if (!node) return;
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        node.classList.remove("flash");
        void node.offsetWidth; /* restart animation */
        node.classList.add("flash");
      });
    });
  });
}

function openDoc(acct, idx) {
  const d = acct.packet[idx];
  $("#modalTitle").textContent = d.name;
  $("#modalSub").textContent = `${d.kind} · ${d.parsed}`;
  $("#modalBody").textContent = d.body.join("\n");
  $("#docModal").hidden = false;
}

function selectAccount(id) {
  if (!ACCOUNTS[id]) id = "meridian";
  state.acct = ACCOUNTS[id];
  if (state.decided && state.decided !== id) state.decided = null;
  renderSwitch();
  renderPacket(state.acct);
  renderFacts(state.acct);
  renderDecision(state.acct);
  window.scrollTo({ top: 0, behavior: "smooth" });
  try { history.replaceState(null, "", "?acct=" + id); } catch (e) { /* file:// ok */ }
}

/* init */
(function () {
  const params = new URLSearchParams(window.location.search);
  selectAccount(params.get("acct") === "copper" ? "copper" : "meridian");

  $("#modalClose").addEventListener("click", () => { $("#docModal").hidden = true; });
  $("#docModal").addEventListener("click", (e) => {
    if (e.target === $("#docModal")) $("#docModal").hidden = true;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") $("#docModal").hidden = true;
  });
})();