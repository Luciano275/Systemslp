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

const MobileSkeleton = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-xl">
      <div className="pb-4 border-b border-neutral-400 mb-4 flex items-center gap-2">
        <div className="grow flex flex-col gap-y-3">
          <div className="h-6 bg-gray-400 rounded-xl animate-pulse w-40"></div>
          <div className="h-4 bg-gray-400 rounded-xl animate-pulse w-24"></div>
        </div>
        <div className="bg-gray-400 w-12 h-12 rounded-full animate-pulse"></div>
      </div>
      <div className="bg-gray-200 min-h-[70px] rounded-xl animate-pulse"></div>
      <div className="flex pt-4 pb-2 justify-between items-center">
        <div className="bg-gray-700 rounded-full h-5 w-40 animate-pulse"></div>
        <div className="bg-gray-400 h-6 w-10 rounded-xl animate-pulse"></div>
      </div>
      <div className="flex justify-end gap-2 items-center mt-2">
        <div className="w-10 h-10 rounded-xl bg-gray-500"></div>
        <div className="w-10 h-10 rounded-xl bg-gray-700"></div>
      </div>
    </div>
  )
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

      {/* Mobile */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 lg:hidden py-4">
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
      </div>

    </>
  )
}