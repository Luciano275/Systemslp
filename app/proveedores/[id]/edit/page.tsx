import type { ParamsType } from "@/app/lib/definitions";
import { Metadata } from "next";
import FormProviderEdit from './Form'
import { notFound } from "next/navigation";import { fetchProviderById } from "@/app/lib/data";

export async function generateMetadata({
  params: {
    id
  }
}: ParamsType): Promise<Metadata> {
  return {
    title: 'titulo'
  }
}

export default async function EditProviderPage({ params: {id} }: ParamsType) {

  const proveedor = await fetchProviderById(id || '');

  if (!proveedor) notFound()

  return (
    <section className="p-5">
      <h2 className="w-full max-w-[450px] mx-auto text-3xl">Editar proveedor</h2>
      <FormProviderEdit proveedor={proveedor} />
    </section>
  )
}