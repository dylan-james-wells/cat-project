import type { Cat } from "../api/cat/route";

type CatGridProps = {
  cats: Cat[];
};

export default function CatGrid({ cats }: CatGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-6 mt-6 mb-6">
      {Array.isArray(cats)
        ? cats.map((cat, i) => (
            // we are adding the index to the key because there seems to be often one cat per tag
            // which causes a duplicate key error
            <li key={`${cat.id}-${i}`} className="relative p-4 bg-[#EF5A50] animate-[fadeInUp_0.5s_ease-out_forwards]">
              <img className="w-full" src={cat.url} alt="cat" />
            </li>
          ))
        : null}
    </ul>
  );
}
