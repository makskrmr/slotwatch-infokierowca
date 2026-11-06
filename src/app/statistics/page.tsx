"use client";
import { useStore } from "@/lib/store";
import { Card, H1 } from "@/components/ui";
export default function Statistics() {
  const { data: d } = useStore();
  const days: Record<string, number> = {}; d.logs.forEach((l) => { const k = l.createdAt.slice(0, 10); days[k] = (days[k] || 0) + 1; });
  const rows = Object.entries(days).sort().slice(-14); const max = Math.max(1, ...rows.map((r) => r[1]));
  const t = [["Aktywne profile", d.profiles.filter((p) => p.active).length], ["Konfiguracje", d.profiles.length], ["Wybrane WORD", new Set(d.profiles.flatMap((p) => p.wordIds)).size], ["Powiadomienia", d.notices.length], ["Operacje", d.logs.length]];
  return (<div><H1>Statystyki</H1>
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">{t.map(([l, v]) => <Card key={l as string}><div className="text-xs text-gray-400">{l}</div><div className="text-2xl font-semibold">{v}</div></Card>)}</div>
    <Card><div className="mb-3 text-sm text-gray-400">Aktywność (ostatnie dni)</div>
      {rows.length === 0 ? "Brak danych." : <div className="flex h-40 items-end gap-2">{rows.map(([k, n]) => <div key={k} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t bg-blue-500" style={{ height: `${(n / max) * 100}%` }} /><span className="text-[10px] text-gray-500">{k.slice(5)}</span></div>)}</div>}</Card></div>);
}
