import { Suspense } from "react";
import Productos from "../components/Productos";
import { ProductSkeleton } from "../skeletons/ProductsSkeleton";
import Search from "../components/Search";
import { deleteAllLoss, fetchProductPages } from "../lib/data";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import Pagination from "../components/Pagination";
import OrderBy from "./OrderBy";
import { Metadata } from "next";
import { GiBrokenPottery } from 'react-icons/gi'

export const metadata: Metadata = {
  title: 'Productos'
}

export default async function ProductosPage({
  searchParams
}: {
  searchParams:{
    query?: string;
    page?: string;
    orderBy?: string;
    mode?: string;
    status?: string;
  }
}) {

  const query = searchParams.query ?? '';
  const orderBy = searchParams.orderBy || null;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const mode = searchParams.mode || null;
  const status = searchParams.status || null;

  const totalPages = await fetchProductPages(query)

  return (
    <section className="p-5">
      <h2 className="text-4xl py-4 border-b border-black">Productos</h2>

      <div className="flex gap-4 items-center pt-8 pb-6 flex-wrap-reverse">
        <Search />
        <Link href='/productos/create' className="bg-green-600 min-w-[200px] py-2 px-4 rounded-xl flex gap-1 items-center text-white transition-colors hover:bg-green-700">
          <FaCartPlus />
          Agregar producto
        </Link>
      </div>

      <div className="flex gap-2 justify-end items-center pt-1 pb-4">
        <p>Filtrar por:</p>
        <OrderBy />
      </div>

      <div className="block md:hidden">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      </div>

      {/* Table */}
      <Suspense key={`${query}${page}${orderBy}${mode}${status}`} fallback={<ProductSkeleton />}>
        <Productos query={query} currentPage={page} orderBy={orderBy} mode={mode} />
      </Suspense>

      <div className="hidden md:block">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      </div>

    </section>
  )
}