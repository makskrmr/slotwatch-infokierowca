import { NextResponse } from "next/server";
import { demoProvider } from "@/lib/provider";
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const result = await demoProvider.check();
  return NextResponse.json({ ok: true, status: result.status });
}
