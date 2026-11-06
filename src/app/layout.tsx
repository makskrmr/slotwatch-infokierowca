import "./globals.css";
import type { Metadata } from "next";
import Shell from "@/components/layout/Shell";
import Boot from "@/components/Boot";
export const metadata: Metadata = { title: "SlotWatch", description: "Darmowy asystent monitorowania WORD", manifest: "/manifest.webmanifest" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pl"><body><Boot /><Shell>{children}</Shell></body></html>;
}
