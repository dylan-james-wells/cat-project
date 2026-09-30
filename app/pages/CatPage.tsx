"use client";

import { useEffect, useState, useCallback } from "react";

import type { Tag } from "../api/tags/route";
import type { Cat } from "../api/cat/route";

import CatForm from "../components/CatForm";
import CatGrid from "../components/CatGrid";

const LOGO =
  "https://angelstudios.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F182b30db-6c36-40c8-90ff-075c79dbb5ea%2Fcatalog-logo.png?table=block&id=56c36e48-952c-4f49-bbf9-e062ee80a3b0&spaceId=323f87db-5e5a-420d-baa2-c2314d070723&width=950&userId=&cache=v2&imgBuildSrc=requestProxiedImageUrl";

export default function CatPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const [phraseInput, setPhraseInput] = useState<string>("");
  const [phraseQuery, setPhraseQuery] = useState<string>("");

  const [tag, setTag] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  const [cats, setCats] = useState<Cat[]>([]);

  const getCat = useCallback(async (signal: AbortSignal) => {
    try {
      const res = await fetch("/api/cat", { signal });
      const data = await res.json();

      console.log('data', data)

    //   setCats([data]);

      setCats((prev) => {
        return prev.concat(data);
        // if (Array.isArray(cats) && !cats.length) {
        //   return [data as Cat];
        // }
      });
    } catch (error) {
      if (!signal.aborted) {
        setError(error as Error);
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col align-start flex-1">
      <img
        src={LOGO}
        alt="Cat logo"
        className="max-h-[250px] object-contain mb-6"
      />
      <CatForm
        loading={loading}
        phraseInput={phraseInput}
        onPhraseInputChange={setPhraseInput}
        onTagChange={setTag}
        tags={tagOptions}
        retrieveCat={getCat}
      />
      <CatGrid cats={cats} />
    </div>
  );
}
