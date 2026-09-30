import { NextRequest, NextResponse } from "next/server";

// https://cataas.com/cat?type=square&position=center&html=false

const CAT_ROUTE =
  "https://cataas.com/cat/{tag}/says/{phrase}?type=square&position=center&html=false&json=true";

// {
//   "id": "rdwsAothSmVMMLjH",
//   "tags": [],
//   "created_at": "2022-07-28T23:34:43.032Z",
//   "url": "https://cataas.com/cat/rdwsAothSmVMMLjH?type=square&position=center",
//   "mimetype": "image/jpeg"
// }

export type Cat = {
  id: string;
  tags: string[];
  created_at: string;
  url: string;
  mimetype: string;
};

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag");
  const phrase = req.nextUrl.searchParams.get("phrase");

  try {
    const res = await fetch(
      CAT_ROUTE.replace(tag ? "{tag}" : "/tag/{tag", tag ? tag : "").replace(
        phrase ? "{phrase}" : "/says/{phrase",
        phrase ? phrase : "",
      ),
    );

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
