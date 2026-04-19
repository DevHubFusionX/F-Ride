import { type NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.BACKEND_URL || "https://f-ridebackend.onrender.com";

async function forward(req: NextRequest, params: { proxy: string[] }) {
  const path = params.proxy.join("/");
  const search = req.nextUrl.search;
  const url = `${BACKEND}/api/${path}${search}`;

  console.log(`[PROXY] ${req.method} /api/${path} → ${url}`);

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const auth = req.headers.get("authorization");
  if (auth) headers.set("authorization", auth);

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      body = JSON.stringify(await req.json());
    } catch {
      body = undefined;
    }
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
      signal: AbortSignal.timeout(90_000),
    });

    const data = await response.text();
    console.log(`[PROXY] ${req.method} /api/${path} ← ${response.status}`);

    return new NextResponse(data, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error(`[PROXY] ${req.method} /api/${path} failed:`, err.message);
    return NextResponse.json(
      { message: "Backend unreachable", error: err.message },
      { status: 503 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  return forward(req, await params);
}
export async function POST(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  return forward(req, await params);
}
export async function PUT(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  return forward(req, await params);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  return forward(req, await params);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  return forward(req, await params);
}
