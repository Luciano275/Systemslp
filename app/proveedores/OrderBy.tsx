'use client';

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { handleChangeOrderBy } from "../lib/utils";

const orderByList = [
  { value: 'nombre-asc', label: 'Nombre' },
  { value: 'producto-asc', label: 'Producto' },
  { value: 'cantidad-asc', label: 'Cantidad Ascendente' },
  { value: 'cantidad-desc', label: 'Cantidad Descendente' },
  { value: 'entrega-asc', label: 'Entrega Ascendente' },
  { value: 'entrega-desc', label: 'Entrega Descendente' },
  { value: 'precio-asc', label: 'Precio Ascendente' },
  { value: 'precio-desc', label: 'Precio Descendente' }
]

export default function OrderBy () {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const orderby = searchParams.get('orderBy');
  const mode = searchParams.get('mode');
  const compare = `${orderby?.toLowerCase()}-${mode?.toLowerCase()}`;

  const handleChange = (value: string) => {
    
    const params = handleChangeOrderBy(value, searchParams);

    replace(`${pathname}?${params}`)
  }

  return (
    <select
      className="py-2 px-3 transition-colors focus:border-blue-500 outline-none border-x border-y border-neutral-300 rounded-lg"
      defaultValue={compare}
      onChange={(e) => handleChange(e.target.value)}
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