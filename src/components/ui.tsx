import type { ReactNode, ButtonHTMLAttributes } from "react";
export const H1 = ({ children }: { children: ReactNode }) => <h1 className="mb-6 text-2xl font-semibold">{children}</h1>;
export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`rounded-2xl border border-white/10 bg-[#111a2e] p-4 ${className}`}>{children}</div>;
export const Btn = ({ className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...p} className={`rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 disabled:opacity-40 ${className}`} />;
export const Ghost = ({ className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...p} className={`rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5 ${className}`} />;
export const inp = "rounded-xl border border-white/15 bg-[#0b1220] px-3 py-2 text-sm text-inherit";
export const fmt = (s: string) => new Date(s).toLocaleString("pl-PL");
export const Empty = ({ text }: { text: string }) => <Card className="text-center text-gray-400">{text}</Card>;
