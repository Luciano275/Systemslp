import { fetchFilteredProviders } from "../lib/data"
import Image from 'next/image'
import { formatDateToLatam, formatMoney } from "../lib/utils";
import { FaPencilAlt } from "react-icons/fa";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function Proveedores({
  query,
  page,
  orderBy,
  mode
}: {
  query: string;
  page: number;
  orderBy: string | null;
  mode: string | null;
}) {

  const proveedores = await fetchFilteredProviders(
    query,
    page,
    orderBy,
    mode
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block py-4">
        {!proveedores.length ? (
          <div className="flex justify-center">
            <Image
              src={"/nothing.png"}
              alt={"No se encontraron productos."}
              width={500}
              height={400}
              className="select-none"
            />
          </div>
        ) : (
          <table className="hidden lg:table min-w-full text-neutral-800">
            <thead className="rounded-xl text-left text-sm bg-neutral-200">
              <tr className="[&>*]:font-semibold [&>*]:py-3 [&>*]:px-4">
                <th scope="col">Nombre</th>
                <th scope="col">Producto</th>
                <th scope="col">Descripción</th>
                <th scope="col" className="text-center">
                  Cantidad
                </th>
                <th scope="col" className="text-center">
                  Entrega
                </th>
                <th scope="col" className="text-center">
                  Precio
                </th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-100">
              {proveedores.map((proveedor) => (
                <tr
                  key={proveedor.id}
                  className="w-full border-b [&>*]:py-3 text-sm last-of-type:border-none border-neutral-400 transition-colors hover:bg-neutral-200"
                >
                  <td className="min-w-[120px] p-2 overflow-hidden text-nowrap text-ellipsis">
                    {proveedor.nombre}
                  </td>
                  <td className="min-w-[120px] p-2 overflow-hidden text-nowrap text-ellipsis">
                    {proveedor.producto}
                  </td>
                  <td
                    className="overflow-x-hidden w-80 overflow-y-auto p-2 text-pretty"
                    title={proveedor.descripcion}
                  >
                    {proveedor.descripcion.length > 80
                      ? `${proveedor.descripcion.substring(0, 80)}...`
                      : proveedor.descripcion}
                  </td>
                  <td className="text-center">{proveedor.cantidad}</td>
                  <td className="text-center">
                    {formatDateToLatam(proveedor.entrega)}
                  </td>
                  <td className="text-center text-green-700">
                    ${formatMoney(proveedor.precio)}
                  </td>
                  <td className="flex gap-2 items-center justify-center">
                    <Link
                      href={`/proveedores/${proveedor.id}/edit`}
                      className="bg-blue-500 flex items-center justify-center text-white transition-colors hover:bg-blue-700 w-10 h-10 rounded-xl"
                    >
                      <FaPencilAlt size={15} />
                    </Link>
                    <DeleteButton mode={'proveedores'} id={proveedor.id} mobile={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 lg:hidden py-4">
        {
          !proveedores.length ? (
            <div className="flex justify-center">
              <Image
                src={"/nothing.png"}
                alt={"No se encontraron productos."}
                width={500}
                height={400}
                className="select-none"
              />
            </div>
          ) : (
            proveedores.map((proveedor) => (
              <article key={proveedor.id} className="bg-gray-100 p-2 rounded-xl">
                <h2 className="pb-4 border-b border-neutral-400 mb-4 flex items-center gap-2">
                  <span
                    className="grow flex flex-col"
                    title={proveedor.nombre}
                  >
                    <span className="font-semibold text-2xl md:text-3xl overflow-hidden text-nowrap text-ellipsis">{proveedor.nombre}</span>
                    <span className="overflow-hidden text-nowrap text-ellipsis max-w-[200px]">{proveedor.producto}</span>
                  </span>
                  <span
                    className="bg-green-500 text-white overflow-hidden max-w-12 max-h-12 w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                    title={`Stock total: ${proveedor.cantidad}`}
                  >
                    {proveedor.cantidad}
                  </span>
                </h2>
                <div className="min-h-[70px] overflow-x-hidden overflow-y-auto max-h-[150px] p-4 rounded-xl bg-gray-200">
                  <p>{proveedor.descripcion}</p>
                </div>
              </article>
            ))
          )
        }
      </div>
    </>
  );
}
