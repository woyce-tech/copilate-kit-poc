import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    
    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    // Write API key to agent/.env file
    const envPath = join(process.cwd(), "agent", ".env");
    writeFileSync(envPath, `OPENAI_API_KEY=${apiKey}\n`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error setting API key:", error);
    return NextResponse.json({ error: "Failed to set API key" }, { status: 500 });
  }
}
