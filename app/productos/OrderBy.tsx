'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { handleChangeOrderBy } from "../lib/utils";

const orderByList = [
  { value: 'nombre-asc', label: 'Nombre' },
  { value: 'vencimiento-asc', label: 'Vencimiento' },
  { value: 'stock-asc', label: 'Stock Ascendente' },
  { value: 'stock-desc', label: 'Stock Descendente' },
  { value: 'precio-asc', label: 'Precio Ascendente' },
  { value: 'precio-desc', label: 'Precio Descendente' }
]

export default function OrderBy() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const orderByParam = searchParams.get('orderBy');
  const modeParam = searchParams.get('mode');

  const compare = `${orderByParam?.toLowerCase()}-${modeParam?.toLowerCase()}`

  const handleChange = (value: string) => {
    
    const params = handleChangeOrderBy(value, searchParams);

    replace(`${pathname}?${params}`)
  }

  return (
    <select
      onChange={(e) => handleChange(e.target.value)}
      className="py-2 px-3 transition-colors focus:border-blue-500 outline-none border-x border-y border-neutral-300 rounded-lg"
      defaultValue={compare}
    >
      {orderByList.map((list) => (
          list.value === compare ? (
            <option value={list.value} key={list.value} selected aria-selected>
              {list.label}
            </option>
          ) : (
            <option value={list.value} key={list.value}>
              {list.label}
            </option>
          ))
      )}
    </select>
  );
}