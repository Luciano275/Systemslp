import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation"
import FormEdit from "./Form";
import { Metadata } from "next";
import { ParamsType } from "@/app/lib/definitions";

export async function generateMetadata({
  params: {
    id
  }
}: ParamsType): Promise<Metadata> {

  const producto = await fetchProductById(id)

  return {
    title: producto?.nombre  ?? 'No encontrado'
  }

}

export default async function EditPage({ params }: ParamsType) {

  const { id } = params;
  const producto = await fetchProductById(id);

  if (!producto){
    notFound()
  }

  return (
    <section className='p-5'>
      <h2 className="w-full max-w-[450px] mx-auto text-3xl">Editar producto</h2>
      <FormEdit producto={producto} />
    </section>
  )
}