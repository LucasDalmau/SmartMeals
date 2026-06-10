import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&display=swap');`;

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  green:    "#1B3A2D",
  greenMid: "#2D5C47",
  greenBg:  "#E8F0EC",
  red:      "#E63946",
  amber:    "#D97706",
  beef:     "#7C2D12",
  pasta:    "#92400E",
  veg:      "#166534",
  twoOf:    "#4C1D95",
  bfast:    "#1E3A5F",
  snack:    "#92400E",
};

const SLOT_META = {
  breakfast: { label: "Desayuno",  labelEn: "Breakfast", color: C.bfast,  emoji: "☀️" },
  lunch:     { label: "Almuerzo",  labelEn: "Lunch",     color: C.veg,    emoji: "🥗" },
  snack:     { label: "Merienda",  labelEn: "Snack",     color: C.snack,  emoji: "🍎" },
  dinner:    { label: "Cena",      labelEn: "Dinner",    color: C.green,  emoji: "🍽️" },
};

const CAT_COLOR = {
  pollo: C.green, carne: C.beef, pasta: C.pasta,
  verdura: C.veg, "para dos": C.twoOf, desayuno: C.bfast, snack: C.snack,
};

const DAYS = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
const DAYS_FULL = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

// ─── RECIPES ─────────────────────────────────────────────────────────────────
const RECIPES = [
  {
    id:"1", name:"Milanesa con puré", category:"carne", difficulty:1,
    prepMins:10, cookMins:20, freezable:true,
    slots:["lunch","dinner"],
    tags:["clásico","rápido"], variationIds:["4"],
    macros:{ protein:48, carbs:52, fats:18, kcal:570 },
    desc:"El clásico infaltable. Nalga empanada, puré casero con manteca.",
    ingredients:[
      {name:"Nalga en milanesas",amount:200,unit:"g"},
      {name:"Pan rallado",amount:60,unit:"g"},
      {name:"Huevo",amount:1,unit:"u"},
      {name:"Papa",amount:300,unit:"g"},
      {name:"Manteca",amount:20,unit:"g"},
      {name:"Leche",amount:80,unit:"ml"},
    ],
    steps:[
      {text:"Condimentá las milanesas con sal, pimienta y ajo.",timer:null,parallel:false},
      {text:"Pasalas por huevo batido y pan rallado.",timer:null,parallel:false},
      {text:"Cociná las papas en agua hirviendo.",timer:180,parallel:false},
      {text:"Freí las milanesas 3 min por lado.",timer:360,parallel:true},
      {text:"Pisá las papas con manteca y leche caliente.",timer:null,parallel:false},
    ],
  },
  {
    id:"2", name:"Pollo al horno con papas", category:"pollo", difficulty:1,
    prepMins:10, cookMins:45, freezable:false,
    slots:["lunch","dinner"],
    tags:["domingo","meal prep"],
    macros:{ protein:55, carbs:40, fats:14, kcal:510 },
    desc:"Supremas al horno con papas rústicas. Prep mínimo.",
    ingredients:[
      {name:"Suprema de pollo",amount:250,unit:"g"},
      {name:"Papa",amount:250,unit:"g"},
      {name:"Aceite de oliva",amount:15,unit:"ml"},
      {name:"Ajo",amount:3,unit:"u"},
      {name:"Romero",amount:1,unit:"tsp"},
      {name:"Limón",amount:1,unit:"u"},
    ],
    steps:[
      {text:"Precalentá el horno a 200°C.",timer:null,parallel:false},
      {text:"Condimentá papas y pollo.",timer:null,parallel:false},
      {text:"Horneá hasta dorar.",timer:2700,parallel:false},
    ],
  },
  {
    id:"3", name:"Fideos con tuco", category:"pasta", difficulty:1,
    prepMins:5, cookMins:25, freezable:true,
    slots:["lunch","dinner"],
    tags:["rápido","clásico"],
    macros:{ protein:28, carbs:78, fats:12, kcal:540 },
    desc:"Tuco de tomate con carne molida. Rinde para dos días.",
    ingredients:[
      {name:"Fideos secos",amount:120,unit:"g"},
      {name:"Carne molida",amount:150,unit:"g"},
      {name:"Tomate triturado",amount:200,unit:"ml"},
      {name:"Cebolla",amount:1,unit:"u"},
    ],
    steps:[
      {text:"Sofreí cebolla y ajo hasta transparentar.",timer:240,parallel:false},
      {text:"Cociná la carne molida hasta dorar.",timer:300,parallel:false},
      {text:"Agregá tomate y dejá reducir.",timer:900,parallel:false},
      {text:"Herví los fideos según el paquete.",timer:480,parallel:true},
    ],
  },
  {
    id:"4", name:"Bife a la plancha", category:"carne", difficulty:1,
    prepMins:5, cookMins:10, freezable:false,
    slots:["lunch","dinner"],
    tags:["rápido","alto en proteína"],
    macros:{ protein:52, carbs:12, fats:16, kcal:400 },
    desc:"El más rápido. Bife de chorizo a la plancha con ensalada.",
    ingredients:[
      {name:"Bife de chorizo",amount:220,unit:"g"},
      {name:"Lechuga",amount:80,unit:"g"},
      {name:"Tomate",amount:1,unit:"u"},
      {name:"Aceite de oliva",amount:10,unit:"ml"},
    ],
    steps:[
      {text:"Calentá la plancha al máximo.",timer:null,parallel:false},
      {text:"Cociná el bife 3–4 min por lado.",timer:420,parallel:false},
      {text:"Dejá reposar 3 min.",timer:180,parallel:false},
    ],
  },
  {
    id:"5", name:"Asado de tira", category:"para dos", difficulty:2,
    prepMins:10, cookMins:40, freezable:false,
    slots:["dinner"],
    tags:["para dos","fin de semana"],
    macros:{ protein:46, carbs:0, fats:32, kcal:480 },
    desc:"Tira de asado al horno. Cena de domingo para dos.",
    ingredients:[
      {name:"Tira de asado",amount:600,unit:"g"},
      {name:"Sal gruesa",amount:1,unit:"tsp"},
      {name:"Chimichurri",amount:30,unit:"ml"},
    ],
    steps:[
      {text:"Precalentá horno a 220°C.",timer:null,parallel:false},
      {text:"Horneá 20 min por lado.",timer:2400,parallel:false},
      {text:"Reposá 5 min antes de servir.",timer:300,parallel:false},
    ],
  },
  {
    id:"6", name:"Tostadas con huevo y palta", category:"desayuno", difficulty:1,
    prepMins:5, cookMins:5, freezable:false,
    slots:["breakfast"],
    tags:["rápido","alto en proteína"],
    macros:{ protein:18, carbs:28, fats:16, kcal:320 },
    desc:"Desayuno completo. Pan integral, huevo y palta.",
    ingredients:[
      {name:"Pan integral",amount:2,unit:"u"},
      {name:"Huevo",amount:2,unit:"u"},
      {name:"Palta",amount:0.5,unit:"u"},
      {name:"Limón",amount:0.25,unit:"u"},
    ],
    steps:[
      {text:"Tostá el pan.",timer:120,parallel:false},
      {text:"Cociná los huevos como prefieras.",timer:240,parallel:true},
      {text:"Aplastá la palta con limón y sal.",timer:null,parallel:false},
    ],
  },
  {
    id:"7", name:"Licuado proteico de banana", category:"snack", difficulty:1,
    prepMins:3, cookMins:0, freezable:false,
    slots:["breakfast","snack"],
    tags:["rápido","alto en proteína"],
    macros:{ protein:32, carbs:42, fats:6, kcal:350 },
    desc:"Banana, avena, leche y proteína en polvo. Listo en 3 minutos.",
    ingredients:[
      {name:"Banana",amount:1,unit:"u"},
      {name:"Avena",amount:50,unit:"g"},
      {name:"Proteína en polvo",amount:30,unit:"g"},
      {name:"Leche",amount:250,unit:"ml"},
    ],
    steps:[
      {text:"Poné todo en la licuadora y procesá 30 segundos.",timer:30,parallel:false},
    ],
  },
  {
    id:"8", name:"Tortilla de papas", category:"verdura", difficulty:2,
    prepMins:15, cookMins:20, freezable:true,
    slots:["breakfast","lunch","snack"],
    tags:["vegetariano","prep"],
    macros:{ protein:22, carbs:38, fats:20, kcal:420 },
    desc:"Clásica española. Excelente para prep — fría también está buena.",
    ingredients:[
      {name:"Papa",amount:350,unit:"g"},
      {name:"Huevo",amount:4,unit:"u"},
      {name:"Cebolla",amount:1,unit:"u"},
      {name:"Aceite",amount:40,unit:"ml"},
    ],
    steps:[
      {text:"Freí papas y cebolla en rodajas.",timer:720,parallel:false},
      {text:"Mezclá con huevos batidos.",timer:null,parallel:false},
      {text:"Cociná en sartén hasta cuajar.",timer:480,parallel:false},
      {text:"Dá vuelta y cociná el otro lado.",timer:300,parallel:false},
    ],
  },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ico = ({ n, s=20, c="currentColor" }) => {
  const d = {
    home:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    book:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    cart:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>,
    chart:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    calendar: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    clock:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    plus:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    back:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    search:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    sun:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    check:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    star:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    starFill: <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    freeze:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>,
    play:     <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    fire:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 6-6 8-6 14a6 6 0 0012 0c0-6-6-8-6-14z"/></svg>,
    prep:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    close:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    person:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };
  return d[n] || null;
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("plan");
  const [dark, setDark]         = useState(false);
  const [view, setView]         = useState(null); // {type, payload}
  const [plan, setPlan]         = useState({
    0:{ breakfast:"6", lunch:null,  snack:null,  dinner:"1" },
    1:{ breakfast:null, lunch:null,  snack:"7",   dinner:"3" },
    2:{ breakfast:"6", lunch:null,  snack:null,  dinner:"4" },
    3:{ breakfast:null, lunch:null,  snack:null,  dinner:null },
    4:{ breakfast:null, lunch:null,  snack:"7",   dinner:"2" },
    5:{ breakfast:null, lunch:null,  snack:null,  dinner:"5" },
    6:{ breakfast:"6", lunch:"8",   snack:null,  dinner:null },
  });
  const [pool, setPool]         = useState(["8","3"]);
  const [favorites, setFavorites] = useState(["1","4"]);
  const [checked, setChecked]   = useState({});
  const [search, setSearch]     = useState("");
  const [catFilter, setCatFilter] = useState("todas");
  const [timers, setTimers]     = useState({});
  const timerRefs               = useRef({});

  const bg      = dark ? "#1C1C1E" : "#FFFFFF";
  const surf    = dark ? "#2C2C2E" : "#F5F0E8";
  const surf2   = dark ? "#3A3A3C" : "#EDE8DF";
  const txt     = dark ? "#F2F2F7" : "#1C1C1E";
  const sub     = dark ? "#98989E" : "#6B7280";
  const bord    = dark ? "#3A3A3C" : "#E5E7EB";
  const acBg    = dark ? "#2D5C47" : "#E8F0EC";

  // ── computed ──
  const plannedIds = [...new Set(
    Object.values(plan).flatMap(day => Object.values(day).filter(Boolean))
  )];
  const shoppingList = (() => {
    const agg = {};
    plannedIds.forEach(id => {
      const r = RECIPES.find(x => x.id === id);
      if (!r) return;
      r.ingredients.forEach(ing => {
        if (!agg[ing.name]) agg[ing.name] = { ...ing };
        else agg[ing.name].amount += ing.amount;
      });
    });
    return Object.values(agg);
  })();

  const weekMacros = plannedIds.reduce((acc, id) => {
    const r = RECIPES.find(x => x.id === id);
    if (!r) return acc;
    return { protein: acc.protein+r.macros.protein, carbs: acc.carbs+r.macros.carbs, fats: acc.fats+r.macros.fats, kcal: acc.kcal+r.macros.kcal, n: acc.n+1 };
  }, { protein:0, carbs:0, fats:0, kcal:0, n:0 });

  const startTimer = (key, secs) => {
    if (timerRefs.current[key]) return;
    const end = Date.now() + secs * 1000;
    timerRefs.current[key] = setInterval(() => {
      const rem = Math.max(0, Math.round((end - Date.now()) / 1000));
      setTimers(p => ({ ...p, [key]: rem }));
      if (rem === 0) { clearInterval(timerRefs.current[key]); delete timerRefs.current[key]; }
    }, 1000);
    setTimers(p => ({ ...p, [key]: secs }));
  };

  const fmtTimer = s => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;

  // ── theme shortcuts ──
  const T = {
    app:  { fontFamily:"'DM Sans',sans-serif", background:bg, color:txt, minHeight:"100vh", maxWidth:430, margin:"0 auto", position:"relative", paddingBottom:80 },
    hdr:  { padding:"14px 20px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${bord}`, position:"sticky", top:0, background:bg, zIndex:10 },
    logo: { fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:C.green, letterSpacing:"-0.5px" },
    nav:  { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:bg, borderTop:`1px solid ${bord}`, display:"flex", zIndex:20 },
    navBtn: (a) => ({ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"10px 4px 14px", cursor:"pointer", color: a ? C.green : sub, fontSize:10, fontWeight: a ? 700 : 400, gap:4, background:"none", border:"none", fontFamily:"'DM Sans',sans-serif" }),
    card: (cat) => ({ display:"flex", background:surf, borderRadius:12, overflow:"hidden", cursor:"pointer", marginBottom:10 }),
    stripe: (cat) => ({ width:5, background: CAT_COLOR[cat]||C.green, flexShrink:0 }),
    body: { padding:"12px 14px", flex:1 },
    tag:  { display:"inline-block", background:acBg, color:C.green, fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:20, marginRight:4 },
    pill: (a) => ({ padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600, cursor:"pointer", background: a ? C.green : surf, color: a ? "#fff" : sub, border:"none", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }),
    btn:  (v="primary") => ({ background: v==="primary" ? C.green : "transparent", color: v==="primary" ? "#fff" : txt, border: v==="outline" ? `1.5px solid ${bord}` : "none", borderRadius:10, padding:"12px 20px", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", width:"100%", textAlign:"center" }),
    input:{ background:surf, border:`1.5px solid ${bord}`, borderRadius:10, padding:"11px 14px 11px 40px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:txt, width:"100%", outline:"none", boxSizing:"border-box" },
    sec:  { fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:sub, marginBottom:10 },
  };

  // ─── RECIPE DETAIL ────────────────────────────────────────────────────────
  if (view?.type === "recipe") {
    const r = view.payload;
    const cc = CAT_COLOR[r.category] || C.green;
    const isFav = favorites.includes(r.id);
    return (
      <div style={T.app}>
        <style>{FONTS}</style>
        <div style={T.hdr}>
          <button onClick={() => setView(null)} style={{ background:"none", border:"none", cursor:"pointer", color:txt, display:"flex", alignItems:"center", gap:6, fontSize:14, fontWeight:600, padding:0, fontFamily:"'DM Sans',sans-serif" }}>
            <Ico n="back" s={18}/> Volver
          </button>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button onClick={() => setFavorites(f => f.includes(r.id) ? f.filter(x=>x!==r.id) : [...f,r.id])} style={{ background:"none", border:"none", cursor:"pointer", color: isFav ? "#FBBF24" : sub, padding:0 }}>
              <Ico n={isFav?"starFill":"star"} s={20} c={isFav?"#FBBF24":sub}/>
            </button>
            <button onClick={() => setDark(d=>!d)} style={{ background:"none", border:"none", cursor:"pointer", color:sub, padding:0 }}>
              <Ico n={dark?"sun":"moon"} s={18}/>
            </button>
          </div>
        </div>

        <div style={{ background:cc, padding:"24px 20px 20px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:6, display:"flex", gap:8, alignItems:"center" }}>
            {r.category}
            {r.freezable && <span style={{ background:"rgba(255,255,255,0.2)", borderRadius:20, padding:"1px 8px", display:"flex", alignItems:"center", gap:4 }}><Ico n="freeze" s={10} c="rgba(255,255,255,0.9)"/> Apto freezer</span>}
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:28, color:"#fff", margin:0, lineHeight:1.1 }}>{r.name}</h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:13, marginTop:8, marginBottom:16 }}>{r.desc}</p>
          <div style={{ display:"flex", gap:16 }}>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, display:"flex", alignItems:"center", gap:4 }}><Ico n="clock" s={13} c="rgba(255,255,255,0.9)"/> {r.prepMins+r.cookMins} min</span>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, display:"flex", alignItems:"center", gap:4 }}><Ico n="fire" s={13} c="rgba(255,255,255,0.9)"/> {r.macros.kcal} kcal</span>
            <span style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontWeight:600 }}>{"⬥".repeat(r.difficulty)} {["Fácil","Media","Difícil"][r.difficulty-1]}</span>
          </div>
        </div>

        {/* Macros row */}
        <div style={{ padding:"14px 20px 0", display:"flex", gap:8 }}>
          {[{l:"Proteína",v:r.macros.protein,c:C.green},{l:"Carbs",v:r.macros.carbs,c:C.pasta},{l:"Grasas",v:r.macros.fats,c:C.twoOf}].map(m=>(
            <div key={m.l} style={{ flex:1, background:surf, borderRadius:10, padding:"8px 10px", textAlign:"center" }}>
              <div style={{ fontSize:20,fontWeight:700,color:m.c }}>{m.v}</div>
              <div style={{ fontSize:9,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:0.5 }}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Slots */}
        <div style={{ padding:"14px 20px 0" }}>
          <div style={T.sec}>Apto para</div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {r.slots.map(s => (
              <span key={s} style={{ background:acBg, color:C.green, fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20 }}>
                {SLOT_META[s].emoji} {SLOT_META[s].label}
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div style={{ padding:"16px 20px 0" }}>
          <div style={T.sec}>Ingredientes</div>
          {r.ingredients.map((ing,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${bord}` }}>
              <span style={{ fontSize:14 }}>{ing.name}</span>
              <span style={{ fontSize:13,fontWeight:600,color:sub }}>{ing.amount} {ing.unit}</span>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={{ padding:"16px 20px 0" }}>
          <div style={T.sec}>Preparación</div>
          {r.steps.map((step,i)=>{
            const key=`${r.id}-${i}`;
            const tv=timers[key];
            return (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:16 }}>
                <div style={{ width:24,height:24,borderRadius:6,background:cc,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:2 }}>{i+1}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14,margin:0,lineHeight:1.5 }}>{step.text}</p>
                  {step.timer && (
                    <button onClick={()=>startTimer(key,step.timer)} style={{ marginTop:8,display:"flex",alignItems:"center",gap:6,background: tv!==undefined ? acBg : surf,border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:12,fontWeight:600,color:C.green,fontFamily:"'DM Sans',sans-serif" }}>
                      <Ico n={tv!==undefined?"clock":"play"} s={12} c={C.green}/>
                      {tv!==undefined ? fmtTimer(tv) : `${Math.floor(step.timer/60)} min`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add to pool */}
        <div style={{ padding:"16px 20px 24px" }}>
          <button onClick={()=>{
            setPool(p => p.includes(r.id) ? p : [...p, r.id]);
            setView(null);
          }} style={T.btn()}>
            {pool.includes(r.id) ? "✓ En tu lista de prep" : "+ Agregar a lista de prep"}
          </button>
        </div>
        <div style={{ height:30 }} />
        <div style={T.nav}>
          {[["plan","calendar","Plan"],["recipes","book","Recetas"],["shopping","cart","Compras"],["macros","chart","Macros"]].map(([id,ico,lbl])=>(
            <button key={id} style={T.navBtn(tab===id)} onClick={()=>{setView(null);setTab(id);}}>
              <Ico n={ico} s={22}/>{lbl}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── SLOT PICKER ──────────────────────────────────────────────────────────
  if (view?.type === "slotPicker") {
    const { dayIdx, slot } = view.payload;
    const eligible = RECIPES.filter(r => r.slots.includes(slot));
    const slotMeta = SLOT_META[slot];
    return (
      <div style={T.app}>
        <style>{FONTS}</style>
        <div style={T.hdr}>
          <button onClick={()=>setView(null)} style={{ background:"none",border:"none",cursor:"pointer",color:txt,display:"flex",alignItems:"center",gap:6,fontSize:14,fontWeight:600,padding:0,fontFamily:"'DM Sans',sans-serif" }}>
            <Ico n="back" s={18}/> {DAYS_FULL[dayIdx]} · {slotMeta.label}
          </button>
        </div>
        <div style={{ padding:"16px 20px" }}>
          {plan[dayIdx][slot] && (
            <button onClick={()=>{ setPlan(p=>({...p,[dayIdx]:{...p[dayIdx],[slot]:null}})); setView(null); }} style={{ ...T.btn("outline"), marginBottom:14, color:C.red, borderColor:C.red }}>
              Quitar receta
            </button>
          )}

          {/* From pool */}
          {pool.length > 0 && (
            <>
              <div style={{ ...T.sec, marginBottom:8 }}>Desde tu lista de prep</div>
              {pool.filter(id=>{ const r=RECIPES.find(x=>x.id===id); return r&&r.slots.includes(slot); }).map(id=>{
                const r = RECIPES.find(x=>x.id===id);
                return (
                  <div key={id} onClick={()=>{ setPlan(p=>({...p,[dayIdx]:{...p[dayIdx],[slot]:id}})); setView(null); }} style={{ ...T.card(r.category), border:`2px solid ${C.green}` }}>
                    <div style={T.stripe(r.category)}/>
                    <div style={T.body}>
                      <div style={{ fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600 }}>{r.name}</div>
                      <div style={{ fontSize:11,color:sub,marginTop:2 }}>{r.macros.protein}g prot · {r.prepMins+r.cookMins} min</div>
                    </div>
                    <div style={{ padding:"0 12px",display:"flex",alignItems:"center" }}>
                      <span style={{ fontSize:10,fontWeight:700,color:C.green,background:acBg,padding:"3px 7px",borderRadius:20 }}>PREP</span>
                    </div>
                  </div>
                );
              })}
              <div style={{ height:1,background:bord,margin:"12px 0" }}/>
            </>
          )}

          <div style={{ ...T.sec, marginBottom:8 }}>Todas las recetas</div>
          {eligible.map(r=>(
            <div key={r.id} onClick={()=>{ setPlan(p=>({...p,[dayIdx]:{...p[dayIdx],[slot]:r.id}})); setView(null); }} style={T.card(r.category)}>
              <div style={T.stripe(r.category)}/>
              <div style={T.body}>
                <div style={{ fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:600 }}>{r.name}</div>
                <div style={{ fontSize:11,color:sub,marginTop:2 }}>{r.macros.protein}g prot · {r.macros.kcal} kcal · {r.prepMins+r.cookMins} min</div>
              </div>
              {favorites.includes(r.id) && <div style={{ padding:"0 12px",display:"flex",alignItems:"center" }}><Ico n="starFill" s={14} c="#FBBF24"/></div>}
            </div>
          ))}
        </div>
        <div style={{ height:40 }} />
      </div>
    );
  }

  // ─── MAIN TABS ────────────────────────────────────────────────────────────
  const cats = ["todas", ...new Set(RECIPES.map(r=>r.category))];
  const filtered = RECIPES.filter(r =>
    (catFilter==="todas" || r.category===catFilter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
     r.ingredients.some(i=>i.name.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div style={T.app}>
      <style>{FONTS}</style>
      <div style={T.hdr}>
        <span style={T.logo}>SmartMeals</span>
        <button onClick={()=>setDark(d=>!d)} style={{ background:"none",border:"none",cursor:"pointer",color:sub,padding:4 }}>
          <Ico n={dark?"sun":"moon"} s={18}/>
        </button>
      </div>

      {/* ── PLAN ─────────────────────────────────────────────────────────── */}
      {tab==="plan" && (
        <div style={{ padding:"0 0 8px" }}>
          {/* Pool banner */}
          {pool.length > 0 && (
            <div style={{ margin:"12px 20px 0", background:acBg, borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
              <Ico n="prep" s={20} c={C.green}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:700,color:C.green }}>Lista de prep dominical</div>
                <div style={{ fontSize:11,color:C.greenMid,marginTop:1 }}>{pool.length} receta{pool.length>1?"s":""} sin asignar día</div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {pool.slice(0,2).map(id=>{
                  const r=RECIPES.find(x=>x.id===id);
                  return r ? <div key={id} style={{ width:6,height:28,borderRadius:3,background:CAT_COLOR[r.category]||C.green }}/> : null;
                })}
              </div>
            </div>
          )}

          {/* Days */}
          {DAYS.map((day,i)=>{
            const daySlots = plan[i];
            const hasAny = Object.values(daySlots).some(Boolean);
            const today = i===0;
            return (
              <div key={i} style={{ margin:"12px 20px 0" }}>
                {/* Day header */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize:15, fontWeight:600, color: today ? C.green : txt }}>{DAYS_FULL[i]}</div>
                  {today && <span style={{ fontSize:10,fontWeight:700,background:C.green,color:"#fff",padding:"2px 8px",borderRadius:20 }}>HOY</span>}
                </div>

                {/* Slots */}
                <div style={{ background:surf, borderRadius:12, overflow:"hidden" }}>
                  {Object.entries(SLOT_META).map(([slotKey, meta], si)=>{
                    const rid = daySlots[slotKey];
                    const r = rid ? RECIPES.find(x=>x.id===rid) : null;
                    const isLast = si === Object.keys(SLOT_META).length-1;
                    return (
                      <div key={slotKey} onClick={()=>setView({type:"slotPicker",payload:{dayIdx:i,slot:slotKey}})}
                        style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderBottom:isLast?"none":`1px solid ${bord}`,cursor:"pointer",minHeight:52 }}>
                        {/* Slot label */}
                        <div style={{ width:72,flexShrink:0 }}>
                          <div style={{ fontSize:10,fontWeight:700,color:meta.color,textTransform:"uppercase",letterSpacing:0.5 }}>{meta.emoji} {meta.label}</div>
                        </div>
                        {r ? (
                          <div style={{ flex:1,display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ width:3,height:32,borderRadius:2,background:CAT_COLOR[r.category]||C.green,flexShrink:0 }}/>
                            <div>
                              <div style={{ fontSize:13,fontWeight:600,fontFamily:"'Fraunces',serif",lineHeight:1.2 }}>{r.name}</div>
                              <div style={{ fontSize:10,color:sub,marginTop:1 }}>{r.macros.protein}g P · {r.macros.kcal} kcal</div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ flex:1,display:"flex",alignItems:"center",gap:6,color:sub }}>
                            <div style={{ width:22,height:22,borderRadius:6,border:`1.5px dashed ${bord}`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                              <Ico n="plus" s={12} c={sub}/>
                            </div>
                            <span style={{ fontSize:12 }}>Sin asignar</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Weekly summary */}
          <div style={{ margin:"16px 20px 0", background:surf, borderRadius:12, padding:"14px 16px" }}>
            <div style={{ ...T.sec, marginBottom:10 }}>Resumen semanal</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8 }}>
              {[{l:"Proteína",v:weekMacros.protein,c:C.green},{l:"Carbs",v:weekMacros.carbs,c:C.pasta},{l:"Calorías",v:weekMacros.kcal,c:C.red}].map(m=>(
                <div key={m.l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22,fontWeight:700,color:m.c }}>{m.v}</div>
                  <div style={{ fontSize:9,fontWeight:700,color:sub,textTransform:"uppercase",letterSpacing:0.5 }}>{m.l}</div>
                </div>
              ))}
            </div>
            {weekMacros.n>0 && (
              <div style={{ marginTop:10,paddingTop:10,borderTop:`1px solid ${bord}`,fontSize:11,color:sub }}>
                Promedio diario: <strong style={{ color:txt }}>{Math.round(weekMacros.protein/weekMacros.n)}g prot · {Math.round(weekMacros.kcal/weekMacros.n)} kcal</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RECIPES ──────────────────────────────────────────────────────── */}
      {tab==="recipes" && (
        <div style={{ padding:"16px 20px" }}>
          <div style={{ position:"relative",marginBottom:12 }}>
            <div style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}>
              <Ico n="search" s={16} c={sub}/>
            </div>
            <input style={T.input} placeholder="Receta o ingrediente..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          {/* Category pills */}
          <div style={{ display:"flex",gap:6,overflowX:"auto",paddingBottom:8,marginBottom:8,scrollbarWidth:"none" }}>
            {cats.map(c=>(
              <button key={c} style={T.pill(catFilter===c)} onClick={()=>setCatFilter(c)}>
                {c.charAt(0).toUpperCase()+c.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ fontSize:11,color:sub,marginBottom:12 }}>{filtered.length} recetas</div>
          {filtered.length===0 && (
            <div style={{ textAlign:"center",padding:"40px 0",color:sub }}>
              <div style={{ fontSize:32,marginBottom:8 }}>🔍</div>
              <div style={{ fontSize:14 }}>Sin resultados</div>
            </div>
          )}
          {filtered.map(r=>(
            <div key={r.id} style={T.card(r.category)} onClick={()=>setView({type:"recipe",payload:r})}>
              <div style={T.stripe(r.category)}/>
              <div style={T.body}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <div style={{ fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:600,lineHeight:1.2,flex:1,marginRight:8 }}>{r.name}</div>
                  <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
                    {r.freezable && <Ico n="freeze" s={13} c={sub}/>}
                    {favorites.includes(r.id) && <Ico n="starFill" s={13} c="#FBBF24"/>}
                    <span style={{ fontSize:11,color:sub }}>{r.prepMins+r.cookMins}m</span>
                  </div>
                </div>
                <div style={{ fontSize:12,color:sub,marginTop:3 }}>{r.macros.protein}g prot · {r.macros.kcal} kcal</div>
                <div style={{ marginTop:5,display:"flex",gap:4,flexWrap:"wrap" }}>
                  {r.slots.map(s=><span key={s} style={{ fontSize:10,color:sub }}>{SLOT_META[s].emoji}</span>)}
                  {r.tags.slice(0,2).map(t=><span key={t} style={T.tag}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SHOPPING ─────────────────────────────────────────────────────── */}
      {tab==="shopping" && (
        <div style={{ padding:"16px 20px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <h2 style={{ margin:0,fontFamily:"'Fraunces',serif",fontSize:22 }}>Lista de compras</h2>
            <span style={{ fontSize:12,color:sub,background:surf,padding:"4px 10px",borderRadius:20,fontWeight:600 }}>
              {Object.values(checked).filter(Boolean).length}/{shoppingList.length}
            </span>
          </div>
          <div style={{ height:4,background:bord,borderRadius:2,marginBottom:18,overflow:"hidden" }}>
            <div style={{ height:"100%",background:C.green,borderRadius:2,width:`${shoppingList.length?(Object.values(checked).filter(Boolean).length/shoppingList.length)*100:0}%`,transition:"width 0.3s" }}/>
          </div>
          {shoppingList.length===0 ? (
            <div style={{ textAlign:"center",padding:"40px 0",color:sub }}>
              <div style={{ fontSize:32,marginBottom:8 }}>🛒</div>
              <div style={{ fontSize:14 }}>Asigná recetas al plan para generar la lista</div>
            </div>
          ) : shoppingList.map((item,i)=>{
            const done=checked[item.name];
            return (
              <div key={i} onClick={()=>setChecked(p=>({...p,[item.name]:!p[item.name]}))}
                style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:`1px solid ${bord}`,cursor:"pointer",opacity:done?0.4:1,transition:"opacity 0.2s" }}>
                <div style={{ width:22,height:22,borderRadius:6,border:`2px solid ${done?C.green:bord}`,background:done?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s" }}>
                  {done&&<Ico n="check" s={12} c="#fff"/>}
                </div>
                <span style={{ flex:1,fontSize:14,textDecoration:done?"line-through":"none" }}>{item.name}</span>
                <span style={{ fontSize:13,fontWeight:600,color:sub }}>{item.amount} {item.unit}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MACROS ───────────────────────────────────────────────────────── */}
      {tab==="macros" && (
        <div style={{ padding:"16px 20px" }}>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:22,marginTop:0,marginBottom:4 }}>Macros semanales</h2>
          <p style={{ fontSize:13,color:sub,marginTop:0,marginBottom:20 }}>Basado en {weekMacros.n} comidas planificadas</p>

          {/* Macro goal banner */}
          <div style={{ background:acBg,borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",alignItems:"center",gap:10 }}>
            <Ico n="person" s={20} c={C.green}/>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:C.green }}>Objetivo semanal</div>
              <div style={{ fontSize:11,color:C.greenMid,marginTop:1 }}>Configurá tu perfil para ver el progreso real</div>
            </div>
          </div>

          {[
            {l:"Proteína",v:weekMacros.protein,d:weekMacros.n?Math.round(weekMacros.protein/weekMacros.n):0,u:"g",c:C.green,goal:210},
            {l:"Carbohidratos",v:weekMacros.carbs,d:weekMacros.n?Math.round(weekMacros.carbs/weekMacros.n):0,u:"g",c:C.pasta,goal:280},
            {l:"Grasas",v:weekMacros.fats,d:weekMacros.n?Math.round(weekMacros.fats/weekMacros.n):0,u:"g",c:C.twoOf,goal:98},
            {l:"Calorías",v:weekMacros.kcal,d:weekMacros.n?Math.round(weekMacros.kcal/weekMacros.n):0,u:"kcal",c:C.red,goal:2800},
          ].map(m=>(
            <div key={m.l} style={{ background:surf,borderRadius:12,padding:"14px 16px",marginBottom:10 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10 }}>
                <div>
                  <div style={{ ...T.sec,marginBottom:4 }}>{m.l}</div>
                  <div style={{ fontSize:28,fontWeight:700,color:m.c,lineHeight:1 }}>{m.v}<span style={{ fontSize:13,fontWeight:400,color:sub,marginLeft:3 }}>{m.u}</span></div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10,color:sub }}>Promedio/día</div>
                  <div style={{ fontSize:18,fontWeight:700,color:txt }}>{m.d}<span style={{ fontSize:11,color:sub }}>{m.u}</span></div>
                </div>
              </div>
              <div style={{ height:6,background:dark?"#3A3A3C":"#E5E7EB",borderRadius:3,overflow:"hidden" }}>
                <div style={{ height:"100%",background:m.c,borderRadius:3,width:`${Math.min(100,(m.v/m.goal)*100)}%`,transition:"width 0.4s" }}/>
              </div>
              <div style={{ fontSize:10,color:sub,marginTop:4 }}>{m.v} / {m.goal}{m.u} objetivo semanal</div>
            </div>
          ))}
        </div>
      )}

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <div style={T.nav}>
        {[["plan","calendar","Plan"],["recipes","book","Recetas"],["shopping","cart","Compras"],["macros","chart","Macros"]].map(([id,ico,lbl])=>(
          <button key={id} style={T.navBtn(tab===id)} onClick={()=>setTab(id)}>
            <Ico n={ico} s={22}/>{lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
