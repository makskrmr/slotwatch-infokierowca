"use client";
import { useEffect } from "react";
export default function Boot() {
  useEffect(() => {
    try { const t = JSON.parse(localStorage.getItem("slotwatch:v1") || "{}")?.settings?.theme; if (t) document.documentElement.dataset.theme = t; } catch {}
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
