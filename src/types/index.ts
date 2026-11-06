export const CATEGORIES = ["AM","A1","A2","A","B1","B","B+E","C","C+E","D","D+E","T"] as const;
export type Category = (typeof CATEGORIES)[number];
export interface Profile { id: string; name: string; category: Category; wordIds: string[]; active: boolean; createdAt: string; }
export interface Notice { id: string; kind: string; message: string; read: boolean; createdAt: string; }
export interface LogEntry { id: string; action: string; createdAt: string; }
export interface Settings { theme: "dark" | "light" | "auto"; notify: boolean; interval: number; }
export interface AppData { profiles: Profile[]; notices: Notice[]; logs: LogEntry[]; monitoring: boolean; favorites: string[]; settings: Settings; }
