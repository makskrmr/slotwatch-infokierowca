"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Ghost, Card, H1, inp, fmt, Empty } from "@/components/ui";
export default function Activity() {
  const s = useStore(); const [q, setQ] = useState(""); const [asc, setAsc] = useState(false);
  const list = s.data.logs.filter((l) => l.action.toLowerCase().includes(q.toLowerCase())).sort((a, b) => (asc ? 1 : -1) * a.createdAt.localeCompare(b.createdAt));
  return (<div><H1>Historia aktywności</H1>
    <Card className="mb-4 flex flex-wrap gap-2"><input className={inp} placeholder="Szukaj" value={q} onChange={(e) => setQ(e.target.value)} />
      <Ghost onClick={() => setAsc(!asc)}>{asc ? "Najstarsze" : "Najnowsze"}</Ghost><Ghost onClick={s.clearLogs}>Wyczyść</Ghost></Card>
    {list.length === 0 ? <Empty text="Brak wpisów." /> : <Card>{list.map((l) => <div key={l.id} className="flex justify-between border-b border-white/5 py-2 text-sm last:border-0"><span>{l.action}</span><span className="text-gray-500">{fmt(l.createdAt)}</span></div>)}</Card>}</div>);
}
