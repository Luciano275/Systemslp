'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from 'use-debounce'

const WAIT = 300;

export default function Search() {

  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (search) {
      params.set('query', search);
    }else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, WAIT)

  return (
    <div className="flex flex-col grow">
      <div className="relative">
        <input
          type="text"
          placeholder="Texto | Número | Año-Més-Día"
          className="w-full py-2 pl-2 pr-8 rounded-xl border-neutral-400 outline-none border-x border-y transition-colors focus:border-blue-500 peer"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query') || ''}
        />
        <span className="absolute top-3 right-3 transition-colors peer-focus:text-blue-500">
          <FaSearch />
        </span>
      </div>
    </div>
  );
}