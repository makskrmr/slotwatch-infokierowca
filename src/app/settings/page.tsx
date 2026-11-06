"use client";
import { useStore } from "@/lib/store";
import { Btn, Ghost, Card, H1, inp } from "@/components/ui";
export default function SettingsPage() {
  const s = useStore();
  const exp = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(s.data, null, 2)], { type: "application/json" })); a.download = "slotwatch-backup.json"; a.click(); };
  const imp = async (f?: File) => { if (!f) return; const e = s.importJson(await f.text()); if (e) alert(e); };
  return (<div className="space-y-4"><H1>Ustawienia</H1>
    <Card><div className="mb-2 font-medium">Wygląd</div><select className={inp} value={s.data.settings.theme} onChange={(e) => { const t = e.target.value as "dark" | "light" | "auto"; s.setSettings({ theme: t }); document.documentElement.dataset.theme = t; }}>
      <option value="dark">Ciemny</option><option value="light">Jasny</option><option value="auto">Automatyczny</option></select></Card>
    <Card><div className="mb-2 font-medium">Powiadomienia</div><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.data.settings.notify} onChange={(e) => s.setSettings({ notify: e.target.checked })} />Włączone</label></Card>
    <Card><div className="mb-2 font-medium">Dane</div><div className="flex flex-wrap gap-2"><Btn onClick={exp}>Eksport JSON</Btn>
      <label className="cursor-pointer rounded-xl border border-white/15 px-3 py-2 text-sm">Import JSON<input type="file" accept="application/json" hidden onChange={(e) => imp(e.target.files?.[0])} /></label>
      <Ghost onClick={() => confirm("Usunąć wszystkie dane?") && s.reset()}>Usuń dane</Ghost></div></Card>
    <Card><div className="mb-1 font-medium">Prywatność</div><p className="text-sm text-gray-400">W trybie demo dane są tylko w localStorage tej przeglądarki i nie są współdzielone między urządzeniami.</p></Card></div>);
}
