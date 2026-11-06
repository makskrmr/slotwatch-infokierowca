"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Radar, Users, Building2, Bell, History, BarChart3, Settings, HelpCircle, Info } from "lucide-react";
const NAV = [
  ["dashboard","Dashboard",LayoutDashboard],["monitoring","Monitorowanie",Radar],["profiles","Moje profile",Users],
  ["word","Ośrodki WORD",Building2],["notifications","Powiadomienia",Bell],["activity","Historia",History],
  ["statistics","Statystyki",BarChart3],["settings","Ustawienia",Settings],["help","Pomoc",HelpCircle],["about","O aplikacji",Info],
] as const;
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden md:block w-60 shrink-0 border-r border-white/10 bg-[#0f172a] p-4">
        <div className="mb-6 text-lg font-semibold text-blue-400">SlotWatch</div>
        <nav className="space-y-1">
          {NAV.map(([href, label, Icon]) => (
            <Link key={href} href={`/${href}`} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${path.startsWith(`/${href}`) ? "bg-blue-500/15 text-blue-300" : "text-gray-400 hover:bg-white/5"}`}>
              <Icon size={18} />{label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 pb-24 md:p-8">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-white/10 bg-[#0f172a] p-2 md:hidden">
        {NAV.slice(0, 5).map(([href, label, Icon]) => (
          <Link key={href} href={`/${href}`} aria-label={label} className="p-2 text-gray-300"><Icon size={22} /></Link>
        ))}
      </nav>
    </div>
  );
}
