'use client';
import { createUrl } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full group">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pl-4 pr-12 text-sm text-black placeholder:text-gray-500 transition-all duration-200 ease-out focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 hover:border-gray-300"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-all duration-200 ease-out hover:bg-gray-100 hover:text-black group-focus-within:text-black"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-4 w-4 transition-transform duration-200 group-focus-within:scale-110" />
      </button>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        disabled
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 pl-4 pr-12 text-sm text-gray-400 placeholder:text-gray-400 animate-pulse"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center">
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </div>
    </form>
  );
}
