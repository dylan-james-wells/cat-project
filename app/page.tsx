import Image from "next/image";

// - $\colorbox{7a5d58}{PRIMARY}$ #7A5D58
// - $\colorbox{ef5a50}{ACCENT}$ #EF5A50
// - $\colorbox{d2ac92}{BACKGROUND}$ #D2AC92

import CatPage from "./pages/CatPage";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
      <CatPage />
    </main>
  );
}
