import { NextResponse } from "next/server";

export type Tag = string;

const TAGS_API = "https://cataas.com/api/tags";

export async function GET() {
  try {
    const res = await fetch(TAGS_API);

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { message: "failed to retrieve tags - 1" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "failed to retrieve tags - 2" },
      { status: 502 },
    );
  }
}
