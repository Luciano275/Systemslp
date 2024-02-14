import { fetchFilteredProducts } from "../lib/data";
import { formatDateToLatam, formatMoney } from "../lib/utils";
import Link from 'next/link'
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { GiBrokenPottery } from "react-icons/gi";

export default async function Productos({
  query,
  currentPage,
  orderBy,
  mode
}: {
  query: string;
  currentPage: number;
  orderBy: string | null;
  mode: string | null;
}) {

  const productos = await fetchFilteredProducts(query, currentPage, orderBy, mode)

  return (
    <>
      {/* Mobile */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 lg:hidden py-4">
        {!productos.length && (
          <div className="flex justify-center">
            <Image
              src={"/nothing.png"}
              alt={"No se encontraron productos."}
              width={500}
              height={400}
              className="select-none"
            />
          </div>
        )}
        {productos.map((producto) => (
          <article key={producto.id} className="bg-gray-100 p-2 rounded-xl">
            <h2 className="font-semibold pb-4 border-b border-neutral-400 mb-4 flex items-center gap-2">
              <span
                className="grow text-2xl md:text-3xl overflow-hidden text-nowrap text-ellipsis"
                title={producto.nombre}
              >
                {producto.nombre}
              </span>
              <span
                className="bg-green-500 text-white overflow-hidden max-w-12 max-h-12 w-12 h-12 rounded-full flex items-center justify-center"
                title={`Stock total: ${producto.stock}`}
              >
                {producto.stock}
              </span>
            </h2>
            <div className="min-h-[70px] overflow-x-hidden overflow-y-auto max-h-[150px] p-4 rounded-xl bg-gray-200">
              <p>{producto.descripcion}</p>
            </div>
            <div className="flex justify-between pt-4 pb-2 items-center">
              <p className="bg-gray-700 text-white rounded-full py-1 px-3 text-center">
                {producto.sector}
              </p>
              <p className="text-green-700 text-xl">
                ${formatMoney(producto.precio)}
              </p>
            </div>
            <p className="py-2 text-neutral-600">
              Vencimiento: {formatDateToLatam(producto.vencimiento)}
            </p>
            <div className="flex justify-end gap-2 items-center">
              <Link
                href={`/productos/create/${producto.id}/broken`}
                className="bg-red-600 py-2 px-4 rounded-xl flex gap-1 items-center text-white transition-colors hover:bg-red-700"
              >
                <GiBrokenPottery />
                Reportar
              </Link>
              <Link
                href={`/productos/${producto.id}/edit`}
                className="bg-blue-500 text-white rounded-xl p-3 transition-colors hover:bg-blue-300"
              >
                <FaPencilAlt />
              </Link>
              <DeleteButton mode={"productos"} id={producto.id} mobile={true} />
            </div>
          </article>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden lg:block py-4">
        {!productos.length ? (
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
          <table className="hidden md:table min-w-full text-neutral-800">
            <thead className="rounded-xl text-left text-sm bg-neutral-200">
              <tr className="[&>*]:font-semibold [&>*]:py-3 [&>*]:px-4">
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col" className="text-center">
                  Vencimiento
                </th>
                <th scope="col" className="text-center">
                  Stock
                </th>
                <th scope="col" className="text-center">
                  Precio
                </th>
                <th scope="col" className="text-center">
                  Sector
                </th>
                <th scope="col" className="text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-100">
              {productos.map((producto) => (
                <tr
                  key={producto.id}
                  className="w-full border-b [&>*]:py-3 text-sm last-of-type:border-none border-neutral-400 transition-colors hover:bg-neutral-200"
                >
                  <td className="min-w-[120px] p-2 overflow-hidden text-nowrap text-ellipsis">
                    {producto.nombre}
                  </td>
                  <td
                    className="min-w-[170px] max-w-[200px] overflow-x-hidden overflow-y-auto p-2 text-pretty"
                    title={producto.descripcion}
                  >
                    {producto.descripcion.length > 80
                      ? `${producto.descripcion.substring(0, 80)}...`
                      : producto.descripcion}
                  </td>
                  <td className="text-center">
                    {formatDateToLatam(producto.vencimiento)}
                  </td>
                  <td className="text-center">{producto.stock}</td>
                  <td className="text-center text-green-700">
                    ${formatMoney(producto.precio)}
                  </td>
                  <td className="text-center">{producto.sector}</td>
                  <td className="flex gap-2 items-center justify-center">
                    <Link
                      href={`/productos/create/${producto.id}/broken`}
                      className="bg-red-600 py-2 px-4 rounded-xl flex gap-1 items-center text-white transition-colors hover:bg-red-700"
                    >
                      <GiBrokenPottery />
                      Reportar
                    </Link>
                    <Link
                      href={`/productos/${producto.id}/edit`}
                      className="bg-blue-500 flex items-center justify-center text-white transition-colors hover:bg-blue-700 w-10 h-10 rounded-xl"
                    >
                      <FaPencilAlt size={15} />
                    </Link>
                    <DeleteButton
                      mode={"productos"}
                      id={producto.id}
                      mobile={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}