import { NextResponse } from "next/server";
import { staticData } from "@/lib/staticData";

export async function GET() {
  return NextResponse.json(staticData);
}

