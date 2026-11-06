// Warstwa integracji – oddzielona od UI. Brak autoryzowanego API => tryb demo.
// Nie obchodzimy CAPTCHA ani zabezpieczeń. Nie zwracamy terminów egzaminów.
export type CheckResult = { status: "demo" | "no_source" | "connection_error"; changed: boolean };
export interface DataSourceProvider { check(): Promise<CheckResult>; }
export const demoProvider: DataSourceProvider = { async check() { return { status: "demo", changed: false }; } };
