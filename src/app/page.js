"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import { PREP_ITEMS, DINNERS, SNACKS, CATEGORIES, BASE_PREP_SHOPPING } from "@/data/meals";

const allPrepFlat = [...PREP_ITEMS.fresh, ...PREP_ITEMS.frozen];
const diffLabel = d => d === 1 ? "Fácil" : d === 2 ? "Media" : "Desafío";
const diffColor = d => d === 1 ? "#4ade80" : d === 2 ? "#fbbf24" : "#f87171";
const accent = "#c4a47c";

// ─── localStorage helpers ───
function loadState(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(`mp_${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function saveState(key, value) {
  try { localStorage.setItem(`mp_${key}`, JSON.stringify(value)); } catch {}
}

export default function Home() {
  const [tab, setTab] = useState("dinners");
  const [expanded, setExpanded] = useState(null);
  const [catFilter, setCatFilter] = useState("all");
  const [prepSec, setPrepSec] = useState("fresh");
  const [hydrated, setHydrated] = useState(false);

  // Persisted state
  const [favs, setFavs] = useState({});
  const [checked, setChecked] = useState({});

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFavs(loadState("favs", {}));
    setChecked(loadState("checked", {}));
    setHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => { if (hydrated) saveState("favs", favs); }, [favs, hydrated]);
  useEffect(() => { if (hydrated) saveState("checked", checked); }, [checked, hydrated]);

  const toggleCheck = useCallback(k => setChecked(p => ({ ...p, [k]: !p[k] })), []);
  const toggleFav = useCallback((id, e) => { e.stopPropagation(); setFavs(f => ({ ...f, [id]: !f[id] })); }, []);

  const selectedDinners = useMemo(() => DINNERS.filter(d => favs[d.id]), [favs]);
  const selectedCount = selectedDinners.length;
  const filtered = catFilter === "all" ? DINNERS : catFilter === "favs" ? selectedDinners : DINNERS.filter(d => d.cat === catFilter);

  // Shopping list
  const shoppingList = useMemo(() => {
    if (!selectedCount) return null;
    const items = {};
    selectedDinners.forEach(d => {
      (d.shop || []).forEach(s => {
        const key = s.i;
        if (!items[key]) items[key] = { name: s.i, cat: s.c, count: 1, dinners: [d.name] };
        else { items[key].count++; items[key].dinners.push(d.name); }
      });
    });
    const grouped = {};
    Object.values(items).forEach(item => {
      if (!grouped[item.cat]) grouped[item.cat] = [];
      grouped[item.cat].push(item);
    });
    return grouped;
  }, [selectedDinners, selectedCount]);

  // Prep estimator
  const neededPrep = useMemo(() => {
    if (!selectedCount) return { items: [], totalMin: 0 };
    const ids = new Set();
    selectedDinners.forEach(d => (d.prep || []).forEach(p => ids.add(p)));
    const items = allPrepFlat.filter(p => ids.has(p.id));
    const totalMin = items.reduce((s, p) => s + p.time, 0);
    return { items, totalMin };
  }, [selectedDinners, selectedCount]);

  const tabs = [
    { id: "dinners", label: "🍽️ Cenas", sub: `${DINNERS.length}` },
    { id: "shopping", label: "🛒 Compras", sub: selectedCount ? `${selectedCount} elegidas` : "" },
    { id: "prep", label: "🔪 Prep", sub: neededPrep.totalMin ? `~${neededPrep.totalMin}min` : "" },
    { id: "snacks", label: "⚡ Snacks" },
  ];

  if (!hydrated) {
    return <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#8a8580", fontSize: 14 }}>Cargando...</div>
    </div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e8e4de", padding: "20px 16px", maxWidth: 700, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
          Meal Plan Semanal
        </h1>
        <p style={{ color: "#8a8580", fontSize: 12, margin: 0 }}>
          {Object.entries(CATEGORIES).map(([k, v]) => `${DINNERS.filter(d => d.cat === k).length} ${v.emoji}`).join(" · ")} · {SNACKS.length} snacks
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 5, marginBottom: 18, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 2 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "9px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            fontFamily: "inherit", whiteSpace: "nowrap",
            background: tab === t.id ? "#e8e4de" : "#1a1917", color: tab === t.id ? "#0a0a0a" : "#8a8580",
          }}>
            {t.label}{t.sub && <span style={{ marginLeft: 5, fontSize: 10, opacity: .7 }}>{t.sub}</span>}
          </button>
        ))}
      </div>

      {/* ═══════ DINNERS ═══════ */}
      {tab === "dinners" && <div>
        <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
          {[
            { id: "all", label: "Todas", n: DINNERS.length },
            ...Object.entries(CATEGORIES).map(([k, v]) => ({ id: k, label: `${v.emoji} ${v.label}`, n: DINNERS.filter(d => d.cat === k).length })),
            { id: "favs", label: "⭐ Elegidas", n: selectedCount }
          ].map(f => (
            <button key={f.id} onClick={() => setCatFilter(f.id)} style={{
              padding: "5px 12px", borderRadius: 20, border: `1px solid ${catFilter === f.id ? accent : "#2a2825"}`,
              cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit",
              background: catFilter === f.id ? "#2a2420" : "transparent",
              color: catFilter === f.id ? accent : "#8a8580",
            }}>
              {f.label} <span style={{ opacity: .5 }}>{f.n}</span>
            </button>
          ))}
        </div>

        <div style={{ background: "#12110f", borderRadius: 10, padding: "10px 14px", marginBottom: 14, border: "1px solid #2a2825", fontSize: 12, color: "#8a8580", lineHeight: 1.6 }}>
          💡 Marcá ⭐ las <strong style={{ color: "#e8e4de" }}>cenas de la semana</strong>. La pestaña <strong style={{ color: "#e8e4de" }}>🛒 Compras</strong> se arma sola. Tus selecciones se guardan entre sesiones.
        </div>

        {!filtered.length && <div style={{ textAlign: "center", padding: 40, color: "#5a5550" }}>
          {catFilter === "favs" ? "Tocá ⭐ en las cenas que quieras." : "Sin resultados."}
        </div>}

        {filtered.map(d => {
          const open = expanded === d.id;
          const ci = CATEGORIES[d.cat];
          return <div key={d.id} style={{ background: "#1a1917", borderRadius: 14, marginBottom: 7, border: `1px solid ${open ? "#3a3530" : "#2a2825"}`, overflow: "hidden" }}>
            <div onClick={() => setExpanded(open ? null : d.id)} style={{ padding: "14px 16px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 700, background: `${ci.color}18`, color: ci.color, textTransform: "uppercase", letterSpacing: ".3px" }}>
                      {ci.emoji} {ci.label}
                    </span>
                    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 600, background: `${diffColor(d.diff)}18`, color: diffColor(d.diff) }}>
                      {diffLabel(d.diff)}
                    </span>
                    {d.sv === 2 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "#c47ccf18", color: "#c47ccf", fontWeight: 600 }}>×2</span>}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#fff" }}>{d.emoji} {d.name}</h3>
                </div>
                <button onClick={e => toggleFav(d.id, e)} style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 3,
                  filter: favs[d.id] ? "none" : "grayscale(1) opacity(.3)"
                }}>⭐</button>
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                {[{ l: "Tiempo", v: d.time }, { l: "Prot", v: d.prot }, { l: "Cal", v: d.cal }].map((s, j) => (
                  <div key={j}>
                    <div style={{ fontSize: 9, color: "#6a6560", textTransform: "uppercase", letterSpacing: ".5px" }}>{s.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: accent }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            {open && <div style={{ padding: "0 16px 16px", borderTop: "1px solid #2a2825" }}>
              <div style={{ margin: "12px 0", padding: "8px 12px", background: "#12110f", borderRadius: 8, borderLeft: `3px solid ${accent}` }}>
                <span style={{ fontSize: 10, color: "#8a8580", textTransform: "uppercase", letterSpacing: ".5px" }}>Skill culinaria</span>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: "#e8e4de", fontWeight: 500 }}>{d.skill}</p>
              </div>
              {d.prep?.length > 0 && <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: "#7cc49e", fontWeight: 600 }}>✅ Del prep: </span>
                <span style={{ fontSize: 11, color: "#7cc49e" }}>
                  {d.prep.map(pid => allPrepFlat.find(p => p.id === pid)?.what.split("(")[0].trim() || pid).join(" · ")}
                </span>
              </div>}
              {d.shop?.length > 0 && <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 600 }}>🛒 Comprar: </span>
                <span style={{ fontSize: 11, color: "#d4a850" }}>
                  {d.shop.map(s => s.i).join(" · ")}
                </span>
              </div>}
              <h4 style={{ fontSize: 10, color: "#8a8580", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Paso a paso</h4>
              {d.steps.map((step, j) => (
                <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "#2a2825",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 10, fontWeight: 700, color: accent
                  }}>{j + 1}</div>
                  <p style={{ margin: 0, fontSize: 12, color: "#d0ccc5", lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </div>}
          </div>;
        })}
      </div>}

      {/* ═══════ SHOPPING ═══════ */}
      {tab === "shopping" && <div>
        {!selectedCount ? (
          <div style={{ textAlign: "center", padding: 50, color: "#5a5550" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
            <p style={{ margin: 0, fontSize: 14 }}>Elegí cenas con ⭐ en la pestaña Cenas</p>
            <p style={{ margin: "6px 0 0", fontSize: 12 }}>La lista se arma automáticamente</p>
          </div>
        ) : (<div>
          <div style={{ background: "#12110f", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid #2a2825" }}>
            <div style={{ fontSize: 12, color: "#8a8580", marginBottom: 6 }}>
              Lista para <strong style={{ color: "#fff" }}>{selectedCount} cena{selectedCount > 1 ? "s" : ""}</strong>:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {selectedDinners.map(d => <span key={d.id} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: "#2a2420", color: accent }}>{d.emoji} {d.name}</span>)}
            </div>
          </div>

          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: "18px 0 8px" }}>🔪 Base del Prep (siempre)</h3>
          {Object.entries(BASE_PREP_SHOPPING).map(([cat, items]) => (
            <div key={cat} style={{ background: "#1a1917", borderRadius: 12, border: "1px solid #2a2825", padding: "12px 16px", marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: accent, marginBottom: 6 }}>{cat}</div>
              {items.map((item, j) => <div key={j} style={{ fontSize: 13, color: "#b0aca5", padding: "3px 0", borderTop: j ? "1px solid #1f1d1a" : "none" }}>{item}</div>)}
            </div>
          ))}

          {shoppingList && Object.keys(shoppingList).length > 0 && <>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: "18px 0 8px" }}>🍽️ Extras según tus cenas</h3>
            {Object.entries(shoppingList).map(([cat, items]) => (
              <div key={cat} style={{ background: "#1a1917", borderRadius: 12, border: "1px solid #2a2825", padding: "12px 16px", marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: accent, marginBottom: 6 }}>{cat}</div>
                {items.map((item, j) => <div key={j} style={{ fontSize: 13, color: "#b0aca5", padding: "3px 0", borderTop: j ? "1px solid #1f1d1a" : "none" }}>
                  {item.name}
                  {item.count > 1 && <span style={{ fontSize: 11, color: "#6a6560", marginLeft: 6 }}>×{item.count} cenas</span>}
                </div>)}
              </div>
            ))}
          </>}
        </div>)}
      </div>}

      {/* ═══════ PREP ═══════ */}
      {tab === "prep" && <div>
        {selectedCount > 0 && <div style={{ background: "#1a2420", borderRadius: 10, padding: "12px 16px", marginBottom: 14, border: "1px solid #2a3830", fontSize: 13, color: "#7cc49e", lineHeight: 1.6 }}>
          📊 Para tus <strong>{selectedCount} cenas</strong> necesitás {neededPrep.items.length} tareas de prep — <strong>~{neededPrep.totalMin} minutos</strong> el domingo.
        </div>}

        <div style={{ display: "flex", gap: 5, marginBottom: 14 }}>
          {[["fresh", "❄️", "Fresco (4-5 días)"], ["frozen", "🧊", "Freezer (2-3 meses)"]].map(([k, icon, label]) => (
            <button key={k} onClick={() => setPrepSec(k)} style={{
              flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              background: prepSec === k ? "#1a1917" : "#12110f",
              border: `1px solid ${prepSec === k ? accent : "#2a2825"}`
            }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: prepSec === k ? "#fff" : "#8a8580" }}>{label}</div>
            </button>
          ))}
        </div>

        {prepSec === "frozen" && <div style={{ background: "#1a1a2e", borderRadius: 10, padding: "10px 14px", marginBottom: 12, border: "1px solid #2a2a4e", fontSize: 12, color: "#a0a0d0", lineHeight: 1.6 }}>
          🧊 <strong style={{ color: "#c0c0ff" }}>Tip:</strong> Prepará doble cada 2 domingos. El siguiente solo hacés lo fresco.
        </div>}

        {PREP_ITEMS[prepSec].map((item, i) => {
          const key = `${prepSec}-${i}`;
          const needed = selectedCount > 0 && selectedDinners.some(d => (d.prep || []).includes(item.id));
          return <div key={key} onClick={() => toggleCheck(key)} style={{
            background: "#1a1917", borderRadius: 12, border: `1px solid ${needed ? "#2a3830" : "#2a2825"}`,
            padding: "12px 14px", marginBottom: 6, cursor: "pointer",
            opacity: checked[key] ? .45 : 1, transition: "opacity .2s"
          }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                border: `2px solid ${checked[key] ? accent : "#3a3835"}`,
                background: checked[key] ? accent : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {checked[key] && <span style={{ color: "#0a0a0a", fontSize: 11, fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: checked[key] ? "#6a6560" : "#e8e4de", textDecoration: checked[key] ? "line-through" : "none" }}>{item.what}</span>
                  <span style={{ fontSize: 11, color: accent, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8 }}>~{item.time}min</span>
                </div>
                <div style={{ fontSize: 11, color: "#c4a47c", marginTop: 3 }}>💡 {item.tip}</div>
                <div style={{ fontSize: 11, color: "#6a6560", marginTop: 2 }}>📦 {item.storage}</div>
                {selectedCount > 0 && <div style={{ marginTop: 3 }}>
                  {needed
                    ? <span style={{ fontSize: 10, color: "#7cc49e" }}>✅ Necesario para tus cenas</span>
                    : <span style={{ fontSize: 10, color: "#4a4540" }}>— No lo necesitás esta semana</span>}
                </div>}
              </div>
            </div>
          </div>;
        })}
      </div>}

      {/* ═══════ SNACKS ═══════ */}
      {tab === "snacks" && <div>
        <div style={{ background: "#1a1917", borderRadius: 14, border: "1px solid #2a2825", padding: "12px 16px", marginBottom: 10, fontSize: 12, color: "#b0aca5", lineHeight: 1.6 }}>
          Para <strong style={{ color: "#e8e4de" }}>antes de salir (8:00)</strong> y <strong style={{ color: "#e8e4de" }}>al volver (19:00)</strong>. Todos con buena proteína para bancar hasta la cena y el gym.
        </div>
        {SNACKS.map((s, i) => (
          <div key={i} style={{ background: "#1a1917", borderRadius: 12, border: "1px solid #2a2825", padding: "12px 14px", marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 600, color: "#fff" }}>{s.emoji} {s.name}</h3>
                <p style={{ margin: 0, fontSize: 11, color: "#8a8580" }}>{s.desc}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
                <div style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#1a2420", color: "#7cc49e", fontWeight: 600 }}>{s.prot}</div>
                <div style={{ fontSize: 10, color: "#8a8580", marginTop: 3 }}>{s.when}</div>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* Footer */}
      <div style={{ marginTop: 24, padding: "12px 16px", background: "#12110f", borderRadius: 10, border: "1px solid #2a2825", textAlign: "center", fontSize: 11, color: "#4a4540", lineHeight: 1.6 }}>
        ⭐ Elegí cenas → 🛒 Lista automática → 🔪 Prep filtrado · {DINNERS.length} cenas · {SNACKS.length} snacks
      </div>
    </div>
  );
}
