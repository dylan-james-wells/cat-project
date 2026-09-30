import { OrbitProgress } from "react-loading-indicators";

import type { Tag } from "../api/tags/route";

import { useEffect } from "react";

type CatFormProps = {
  onTagChange: (tag: string) => void;
  phraseInput: string;
  onPhraseInputChange: (phrase: string) => void;
  loading: boolean;
  tags: Tag[];
  retrieveCat: (signal: AbortSignal) => void;
  selectedTag: string;
};

export default function CatForm({
  onTagChange,
  phraseInput,
  onPhraseInputChange,
  loading,
  tags,
  retrieveCat,
  selectedTag,
}: CatFormProps) {
  const controller = new AbortController();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        retrieveCat(controller.signal);
      }}
      className="w-full ml-auto mr-auto text-black bg-[#D2AC92] gap-3 flex flex-col p-8 rounded-2xl border border-[#7A5D58] border-[4px] self-align-start"
    >
      <input
        type="text"
        aria-label="add phrase here"
        value={phraseInput}
        onChange={(e) => onPhraseInputChange(e.target.value)}
        className="bg-white p-2 rounded"
        placeholder="Add a label to the image"
      />
      <div className="flex flex-1 w-full items-center">
        <select
          className="flex-1 bg-white rounded p-2 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_16px_center]"
          onChange={(e) => onTagChange(e.target.value)}
          value={selectedTag}
        >
          <option value="" hidden>
            Select a tag
          </option>
          {tags.map((tag) =>
            !tag ? null : (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ),
          )}
        </select>
        {selectedTag ? (
          <button
            className="text-[24px] ml-4 text-[#7A5D58] cursor-pointer"
            onClick={() => onTagChange("")}
            aria-label="Remove tag"
            title="Remove tag"
          >
            &times;
          </button>
        ) : null}
      </div>

      <div className="h-[50px] flex flex-col items-center justify-center mt-4">
        {loading ? (
          <div className="ml-auto mr-auto">
            <OrbitProgress size="small" color="#EF5A50" />
          </div>
        ) : (
          <button className="text-white p-4 rounded bg-[#7A5D58] self-center border-[#D2AC92]">
            Find a Cat
          </button>
        )}
      </div>
    </form>
  );
}
