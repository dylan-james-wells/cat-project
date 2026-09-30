import CatPage from "./pages/CatPage";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cat-alog',
  description: 'Random cats, with labels!'
};

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
      <CatPage />
    </main>
  );
}
