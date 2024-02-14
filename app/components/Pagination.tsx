'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "../lib/utils"
import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages
}: {
  currentPage: number,
  totalPages: number
}) {

  const allPages = generatePagination(currentPage, totalPages);
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className="flex gap-1 justify-center">
        {
          allPages.map((page, index) => (
            page !== '...' ? (
              <Link key={index} href={createPageURL(page)} className={`text-xl py-2 px-3 ${page === currentPage ? 'bg-blue-400 font-bold' : 'bg-blue-600'} text-white min-w-12 text-center rounded-xl hover:bg-blue-400 transition-colors`}>
                {page}
              </Link>
            ) : <span className="py-2 px-3 rounded-xl min-w-12 text-center bg-blue-600 text-white font-bold" key={index}>{page}</span>
          ))
        }
      </div>
    </>
  )
}