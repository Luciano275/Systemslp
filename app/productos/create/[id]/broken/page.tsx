import { ParamsType } from "@/app/lib/definitions";
import FormBroken from "./Form";
import { fetchLossByProductId, fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function BrokenPage({
  params: {
    id
  }
}: ParamsType) {

  const producto = await fetchProductById(id);
  const perdida = await fetchLossByProductId(id);

  if (!producto) notFound()

  return (
    <section className='p-5'>
      <h2 className="text-3xl w-full max-w-[450px] mx-auto">
        Añadir producto roto
      </h2>

      <FormBroken id={id} totalProducts={producto.stock} perdida={perdida} />

    </section>
  )
}