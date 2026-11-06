"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { Btn, Card, H1, fmt } from "@/components/ui";
export default function Dashboard() {
  const { data: d, ready, toggleMonitoring } = useStore();
  if (!ready) return <div className="h-32 animate-pulse rounded-2xl bg-white/5" />;
  const t = [["Profile", d.profiles.length], ["Aktywne konfiguracje", d.profiles.filter((p) => p.active).length], ["Ośrodki", new Set(d.profiles.flatMap((p) => p.wordIds)).size], ["Powiadomienia", d.notices.length]];
  return (<div className="space-y-4"><H1>Witaj w SlotWatch</H1>
    <Card className="flex items-center justify-between"><div><div className="text-sm text-gray-400">Monitorowanie</div><div className="font-medium">{d.monitoring ? "Tryb demonstracyjny – włączone" : "Nieaktywne"}</div></div><Btn onClick={toggleMonitoring}>{d.monitoring ? "Wyłącz" : "Włącz"}</Btn></Card>
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{t.map(([l, v]) => <Card key={l as string}><div className="text-sm text-gray-400">{l}</div><div className="text-3xl font-semibold">{v}</div></Card>)}</div>
    <div className="grid gap-4 md:grid-cols-2"><Card><div className="mb-2 font-medium">Ostatnia aktywność</div>{d.logs.slice(0, 5).map((l) => <div key={l.id} className="text-sm text-gray-400">{l.action} · {fmt(l.createdAt)}</div>)}{!d.logs.length && <span className="text-sm text-gray-500">Brak.</span>}</Card>
      <Card><div className="mb-2 font-medium">Skróty</div><div className="flex flex-wrap gap-2 text-sm">{["profiles", "word", "monitoring", "settings"].map((h) => <Link key={h} href={`/${h}`} className="rounded-lg border border-white/15 px-3 py-1">/{h}</Link>)}</div></Card></div></div>);
}
