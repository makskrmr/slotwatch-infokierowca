"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { CATEGORIES, type Category } from "@/types";
import { Btn, Ghost, Card, H1, inp, fmt, Empty } from "@/components/ui";
export default function Profiles() {
  const s = useStore(); const [name, setName] = useState(""); const [cat, setCat] = useState<Category>("B");
  return (<div><H1>Moje profile</H1>
    <Card className="mb-4 flex flex-wrap gap-2">
      <input className={inp} placeholder="Nazwa profilu" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} />
      <select className={inp} value={cat} onChange={(e) => setCat(e.target.value as Category)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      <Btn disabled={!name.trim()} onClick={() => { s.addProfile(name.trim(), cat); setName(""); }}>Dodaj</Btn></Card>
    {s.data.profiles.length === 0 ? <Empty text="Brak profili – dodaj pierwszy." /> : <div className="space-y-3">{s.data.profiles.map((p) => (
      <Card key={p.id} className="flex flex-wrap items-center justify-between gap-2">
        <div><div className="font-medium">{p.name} <span className="text-blue-300">({p.category})</span></div>
          <div className="text-xs text-gray-400">{p.active ? "Aktywny" : "Nieaktywny"} · WORD: {p.wordIds.length} · {fmt(p.createdAt)}</div></div>
        <div className="flex flex-wrap gap-2">
          <select className={inp} value={p.category} onChange={(e) => s.setCategory(p.id, e.target.value as Category)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <Ghost onClick={() => s.toggleActive(p.id)}>{p.active ? "Dezaktywuj" : "Aktywuj"}</Ghost>
          <Ghost onClick={() => s.duplicate(p.id)}>Duplikuj</Ghost>
          <Ghost onClick={() => confirm("Usunąć profil?") && s.removeProfile(p.id)}>Usuń</Ghost></div></Card>))}</div>}
  </div>);
}
