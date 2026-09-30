// https://cataas.com/cat?type=square&position=center&html=false

// {
//   "id": "rdwsAothSmVMMLjH",
//   "tags": [],
//   "created_at": "2022-07-28T23:34:43.032Z",
//   "url": "https://cataas.com/cat/rdwsAothSmVMMLjH?type=square&position=center",
//   "mimetype": "image/jpeg"
// }

import type { Cat } from "../api/cat/route";

type CatGridProps = {
  cats: Cat[];
};

export default function CatGrid({ cats }: CatGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-6 mt-6 mb-6">
      {Array.isArray(cats)
        ? cats.map((cat) => (
            <li key={cat.id}>
              <img className="w-full" src={cat.url} alt="cat" />
            </li>
          ))
        : null}
    </ul>
  );
}
