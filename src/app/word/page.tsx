"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { WORD_CENTERS } from "@/data/word-centers";
import { Card, H1, Ghost, inp } from "@/components/ui";
export default function Word() {
  const s = useStore(); const [q, setQ] = useState(""); const [v, setV] = useState(""); const [pid, setPid] = useState("");
  const voiv = [...new Set(WORD_CENTERS.map((w) => w.voivodeship))];
  const list = WORD_CENTERS.filter((w) => (!v || w.voivodeship === v) && w.city.toLowerCase().includes(q.toLowerCase()));
  const prof = s.data.profiles.find((p) => p.id === pid);
  return (<div><H1>Ośrodki WORD</H1>
    <Card className="mb-4 flex flex-wrap gap-2">
      <input className={inp} placeholder="Szukaj miasta" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className={inp} value={v} onChange={(e) => setV(e.target.value)}><option value="">Wszystkie województwa</option>{voiv.map((x) => <option key={x}>{x}</option>)}</select>
      <select className={inp} value={pid} onChange={(e) => setPid(e.target.value)}><option value="">Profil do monitorowania…</option>{s.data.profiles.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Card>
    <div className="grid gap-3 md:grid-cols-2">{list.map((w) => (
      <Card key={w.id} className="flex items-center justify-between">
        <div><div className="font-medium">{w.city}</div><div className="text-xs text-gray-400">{w.voivodeship} · rekord przykładowy (niezweryfikowany)</div></div>
        <div className="flex gap-2"><Ghost onClick={() => s.toggleFav(w.id)}>{s.data.favorites.includes(w.id) ? "★" : "☆"}</Ghost>
          <Ghost disabled={!prof} onClick={() => s.toggleWord(pid, w.id)}>{prof?.wordIds.includes(w.id) ? "Odznacz" : "Monitoruj"}</Ghost></div></Card>))}
      {list.length === 0 && <Card>Brak wyników.</Card>}</div></div>);
}
