const RowSkeleton = () => {
  return (
    <tr className="w-full border-b [&>*]:py-3 text-sm last-of-type:border-none border-neutral-400 animate-pulse">
      <td className="whitespace-nowrap">
        <div className="w-44 p-2">
          <div className="h-6 w-32 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="w-44 p-2">
          <div className="h-6 w-32 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="w-64">
          <div className="h-6 w-44 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="flex justify-center">
          <div className="h-6 w-24 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="flex justify-center">
          <div className="h-6 w-20 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="flex justify-center">
          <div className="h-6 w-20 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="flex gap-2 items-center justify-center">
        <div className="w-10 h-10 bg-gray-500 rounded-xl animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-600 rounded-xl animate-pulse"></div>
      </td>
    </tr>
  );
}

export const ProviderSkeleton = () => {
  return (
    <>

      {/* Desktop */}
      <div className="hidden md:block py-4">
        <table className="hidden md:table min-w-full text-neutral-800">
          <thead className="rounded-xl text-left text-sm bg-neutral-200">
            <tr className="[&>*]:font-semibold [&>*]:py-3 [&>*]:px-4">
              <th scope="col">Nombre</th>
              <th scope="col">Producto</th>
              <th scope="col" className="w-64">Descripción</th>
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
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </tbody>
        </table>
      </div>

    </>
  )
}