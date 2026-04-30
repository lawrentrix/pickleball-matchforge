import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  const staticJsonPath = path.join(process.cwd(), "..", "backend", "static", "staticData.json");

  try {
    const raw = await fs.readFile(staticJsonPath, "utf8");
    const data = JSON.parse(raw) as unknown;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load backend staticData.json", path: staticJsonPath },
      { status: 500 },
    );
  }
}
