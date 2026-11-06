"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Btn, Ghost, Card, H1, inp, fmt, Empty } from "@/components/ui";
export default function Notifications() {
  const s = useStore(); const [k, setK] = useState("");
  const list = s.data.notices.filter((n) => !k || n.kind === k);
  return (<div><H1>Powiadomienia</H1>
    <Card className="mb-4 flex flex-wrap gap-2">
      <select className={inp} value={k} onChange={(e) => setK(e.target.value)}><option value="">Wszystkie</option><option value="info">Informacje</option><option value="status">Status</option><option value="error">Błędy</option></select>
      <Ghost onClick={s.markAll}>Oznacz wszystkie</Ghost><Ghost onClick={s.clearNotices}>Wyczyść</Ghost>
      <Btn onClick={async () => { if ("Notification" in window) alert(`Zgoda: ${await Notification.requestPermission()}`); }}>Włącz powiadomienia przeglądarki</Btn></Card>
    {list.length === 0 ? <Empty text="Brak powiadomień." /> : list.map((n) => (
      <Card key={n.id} className="mb-2 flex items-center justify-between"><div className={n.read ? "text-gray-400" : ""}>{n.message}<div className="text-xs text-gray-500">{fmt(n.createdAt)} · {n.kind}</div></div>
        <div className="flex gap-2">{!n.read && <Ghost onClick={() => s.markRead(n.id)}>Przeczytane</Ghost>}<Ghost onClick={() => s.delNotice(n.id)}>Usuń</Ghost></div></Card>))}</div>);
}
