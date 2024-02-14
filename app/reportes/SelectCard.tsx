'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sectores } from "../lib/utils";

export default function SelectCard ({
  value
}: {
  value: number
}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const nowSector = Number(searchParams.get('sector')) || null

  const handleChangeSector = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sector', value || '1');

    replace(`${pathname}?${params.toString()}`, {
      scroll: false
    })
  }

  return (
    <article className="border-[10px] border-blue-500 rounded-xl w-full h-[300px]">
      <h2 className="text-2xl bg-blue-500 text-center py-4 px-6 text-white">
        Pérdidas por sector
      </h2>
      <div className="grow flex flex-col items-center justify-start gap-4">
        <select
          className="p-2 rounded-lg mt-5"
          onChange={(e) => handleChangeSector(e.target.value)}
          defaultValue={nowSector || 1}
        >
          {sectores.map((sector, index) =>
            sector.value === nowSector ? (
              <option
                value={sector.value}
                key={`${sector.value}${index}`}
                selected
              >
                {sector.label}
              </option>
            ) : (
              <option value={sector.value} key={`${sector.value}${index}`}>
                {sector.label}
              </option>
            )
          )}
        </select>
        <p className="text-5xl py-4">{value}</p>
      </div>
    </article>
  )
}