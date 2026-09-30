import { NextRequest, NextResponse } from "next/server";

const CAT_ROUTE =
  "https://cataas.com/cat{tagAndOrPhrase}?type=square&position=center&html=false&json=true";

export type Cat = {
  id: string;
  tags: string[];
  created_at: string;
  url: string;
  mimetype: string;
};

export async function GET(req: NextRequest) {
  const tag = encodeURIComponent(req.nextUrl.searchParams.get("tag") ?? "");
  const phrase = encodeURIComponent(
    req.nextUrl.searchParams.get("phrase") ?? "",
  );

  let route = CAT_ROUTE;

  if (tag && phrase) {
    route = route.replace("{tagAndOrPhrase}", `/${tag}/says/${phrase}`);
  } else if (tag) { 
    route = route.replace("{tagAndOrPhrase}", `/${tag}`);
  } else if (phrase) {
    route = route.replace("{tagAndOrPhrase}", `/says/${phrase}`);
  } else {
    route = route.replace("{tagAndOrPhrase}", "");
  }

  try {
    const res = await fetch(route);

    if (res.ok) {
      const data = await res.json();

      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { message: "Failed to retrieve cat - 1" },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Failed to retrieve cat - 2" },
      { status: 502 },
    );
  }
}
