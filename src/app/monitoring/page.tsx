"use client";
import { useStore } from "@/lib/store";
import { Btn, Ghost, Card, H1, inp, Empty } from "@/components/ui";
export default function Monitoring() {
  const s = useStore(); const d = s.data;
  const status = !d.monitoring ? "Nieaktywne" : d.profiles.some((p) => p.active) ? "Tryb demonstracyjny" : "Brak skonfigurowanego źródła danych";
  return (<div><H1>Monitorowanie</H1>
    <Card className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div><div className="text-sm text-gray-400">Status</div><div className="font-medium">{status}</div>
        <div className="text-xs text-gray-500">Brak autoryzowanego API – działa tylko demo. Vercel Cron nie zapewnia ciągłego monitorowania.</div></div>
      <div className="flex flex-wrap gap-2"><select className={inp} value={d.settings.interval} onChange={(e) => s.setSettings({ interval: Number(e.target.value) })}>
        {[[60, "co 1 h"], [360, "co 6 h"], [1440, "raz dziennie"]].map(([m, l]) => <option key={m} value={m}>{l}</option>)}</select>
        <Ghost onClick={s.demoCheck}>Sprawdź (demo)</Ghost><Btn onClick={s.toggleMonitoring}>{d.monitoring ? "Wyłącz" : "Włącz"}</Btn></div></Card>
    {d.profiles.length === 0 ? <Empty text="Najpierw utwórz profil." /> : d.profiles.map((p) => (
      <Card key={p.id} className="mb-3 flex items-center justify-between"><div>{p.name} ({p.category}) · WORD: {p.wordIds.length}</div>
        <Ghost onClick={() => s.toggleActive(p.id)}>{p.active ? "Aktywny" : "Nieaktywny"}</Ghost></Card>))}</div>);
}
