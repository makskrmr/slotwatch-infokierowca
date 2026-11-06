"use client";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { CATEGORIES, type AppData, type Category } from "@/types";
const KEY = "slotwatch:v1";
export const schema = z.object({
  profiles: z.array(z.object({ id: z.string(), name: z.string().max(80), category: z.enum(CATEGORIES), wordIds: z.array(z.string()), active: z.boolean(), createdAt: z.string() })),
  notices: z.array(z.object({ id: z.string(), kind: z.string(), message: z.string(), read: z.boolean(), createdAt: z.string() })),
  logs: z.array(z.object({ id: z.string(), action: z.string(), createdAt: z.string() })),
  monitoring: z.boolean(), favorites: z.array(z.string()),
  settings: z.object({ theme: z.enum(["dark", "light", "auto"]), notify: z.boolean(), interval: z.number().min(60) }),
});
export const empty: AppData = { profiles: [], notices: [], logs: [], monitoring: false, favorites: [], settings: { theme: "dark", notify: true, interval: 1440 } };
const uid = () => crypto.randomUUID();
const now = () => new Date().toISOString();
export function useStore() {
  const [data, setData] = useState<AppData>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const r = localStorage.getItem(KEY); if (r) { const p = schema.safeParse(JSON.parse(r)); if (p.success) setData(p.data); } } catch {}
    setReady(true);
  }, []);
  const act = useCallback((fn: (d: AppData) => AppData, msg?: string, notice?: [string, string]) => {
    setData((prev) => {
      let n = fn(prev);
      if (msg) n = { ...n, logs: [{ id: uid(), action: msg, createdAt: now() }, ...n.logs].slice(0, 500) };
      if (notice) n = { ...n, notices: [{ id: uid(), kind: notice[0], message: notice[1], read: false, createdAt: now() }, ...n.notices].slice(0, 200) };
      try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {}
      return n;
    });
  }, []);
  const mapP = (id: string, f: (p: AppData["profiles"][number]) => AppData["profiles"][number]) => (d: AppData) => ({ ...d, profiles: d.profiles.map((p) => (p.id === id ? f(p) : p)) });
  return {
    data, ready, act,
    addProfile: (name: string, category: Category) => act((d) => ({ ...d, profiles: [...d.profiles, { id: uid(), name: name.slice(0, 80), category, wordIds: [], active: false, createdAt: now() }] }), `Utworzono profil: ${name}`),
    removeProfile: (id: string) => act((d) => ({ ...d, profiles: d.profiles.filter((p) => p.id !== id) }), "Usunięto profil"),
    duplicate: (id: string) => act((d) => { const p = d.profiles.find((x) => x.id === id); return p ? { ...d, profiles: [...d.profiles, { ...p, id: uid(), name: `${p.name} (kopia)`, active: false, createdAt: now() }] } : d; }, "Zduplikowano profil"),
    setCategory: (id: string, c: Category) => act(mapP(id, (p) => ({ ...p, category: c })), `Zmieniono kategorię na ${c}`),
    toggleActive: (id: string) => act(mapP(id, (p) => ({ ...p, active: !p.active })), "Zmieniono aktywność profilu"),
    toggleWord: (pid: string, wid: string) => act(mapP(pid, (p) => ({ ...p, wordIds: p.wordIds.includes(wid) ? p.wordIds.filter((w) => w !== wid) : [...p.wordIds, wid] })), "Zmieniono wybór WORD"),
    toggleFav: (wid: string) => act((d) => ({ ...d, favorites: d.favorites.includes(wid) ? d.favorites.filter((f) => f !== wid) : [...d.favorites, wid] })),
    toggleMonitoring: () => act((d) => ({ ...d, monitoring: !d.monitoring }), "Przełączono monitorowanie (tryb demo)", ["status", "Zmieniono status monitorowania"]),
    demoCheck: () => act((d) => d, "Sprawdzenie demo", ["info", "Tryb demo: brak podłączonego źródła danych"]),
    setSettings: (s: Partial<AppData["settings"]>) => act((d) => ({ ...d, settings: { ...d.settings, ...s } }), "Zmieniono ustawienia"),
    markRead: (id: string) => act((d) => ({ ...d, notices: d.notices.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
    markAll: () => act((d) => ({ ...d, notices: d.notices.map((n) => ({ ...n, read: true })) })),
    delNotice: (id: string) => act((d) => ({ ...d, notices: d.notices.filter((n) => n.id !== id) })),
    clearNotices: () => act((d) => ({ ...d, notices: [] })),
    clearLogs: () => act((d) => ({ ...d, logs: [] })),
    reset: () => act(() => empty),
    importJson: (text: string): string | null => {
      if (text.length > 1_000_000) return "Plik za duży";
      try { const p = schema.safeParse(JSON.parse(text)); if (!p.success) return "Nieprawidłowy format"; act(() => p.data, "Zaimportowano dane"); return null; } catch { return "Nieprawidłowy JSON"; }
    },
  };
}
