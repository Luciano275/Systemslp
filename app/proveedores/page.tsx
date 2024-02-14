import Search from "../components/Search";
import Link from 'next/link'
import { FaTruckMedical } from "react-icons/fa6";
import { fetchProvidersPages } from "../lib/data";
import Pagination from "../components/Pagination";
import { Metadata } from "next";
import Proveedores from "../components/Proveedores";
import { Suspense } from "react";
import { ProviderSkeleton } from "../skeletons/ProviderSkeleton";
import OrderBy from './OrderBy'

export const metadata: Metadata = {
  title: 'Proveedores'
}

export default async function ProveedoresPage({
  searchParams: {
    query,
    page,
    orderBy,
    mode,
    status
  }
}: {
  searchParams: {
    query?: string;
    page?: string;
    orderBy?: string;
    mode?: string;
    status?: string;
  }
}) {

  const currentPage = (Number(page)) || 1;

  const totalPages = await fetchProvidersPages(query || '')

  return (
    <section className="p-5">
      <h2 className="text-4xl py-4 border-b border-black">Proveedores</h2>

      <div className="flex gap-4 items-center pt-8 pb-6 flex-wrap-reverse">
        <Search />
        <Link
          href="/proveedores/create"
          className="bg-green-600 min-w-[200px] py-2 px-4 rounded-xl flex gap-1 items-center text-white transition-colors hover:bg-green-700"
        >
          <FaTruckMedical />
          Agregar proveedor
        </Link>
      </div>

      {/* Order By */}
      <div className="flex gap-2 justify-end items-center pt-1 pb-4">
        <p>Filtrar por:</p>
        <OrderBy />
      </div>
      {/* End Order By */}

      {/* Mobile Pagination */}
      <div className="block lg:hidden">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>

      {/* Table */}

      <Suspense
        key={`${query}${page}${orderBy}${mode}${status}`}
        fallback={<ProviderSkeleton />}
      >
        <Proveedores
          query={query || ""}
          page={Number(page) || 1}
          orderBy={orderBy || null}
          mode={mode || null}
        />
      </Suspense>

      {/* End Table */}

      {/* Desktop Pagination */}
      <div className="hidden lg:block">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
