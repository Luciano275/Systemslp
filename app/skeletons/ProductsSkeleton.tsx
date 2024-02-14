const MobileSkeleton = () => {
  return (
    <div className="bg-gray-100 p-2 rounded-xl animate-pulse">
      <div className="flex gap-2 items-center border-b pb-4 mb-4 border-neutral-400">
        <div className="grow">
          <div className="h-6 bg-gray-400 rounded-xl animate-pulse w-40"></div>
        </div>
        <div className="bg-gray-400 w-12 h-12 rounded-full animate-pulse"></div>
      </div>
      <div className="bg-gray-200 min-h-[70px] rounded-xl animate-pulse"></div>
      <div className="flex pt-4 pb-2 justify-between items-center">
        <div className="bg-gray-700 rounded-full h-7 w-24 animate-pulse"></div>
        <div className="bg-gray-400 h-6 w-8 rounded-xl animate-pulse"></div>
      </div>
      <div className="my-2 bg-neutral-600 bg-opacity-30 w-36 h-6 rounded-xl animate-pulse"></div>
      <div className="flex justify-end gap-2 items-center">
        <div className="w-28 h-10 rounded-xl bg-gray-500"></div>
        <div className="w-10 h-10 rounded-xl bg-gray-500"></div>
        <div className="w-10 h-10 rounded-xl bg-gray-700"></div>
      </div>
    </div>
  )
}

const RowSkeleton = () => {
  return (
    <tr className="w-full border-b [&>*]:py-3 text-sm last-of-type:border-none border-neutral-400 animate-pulse">
      <td className="whitespace-nowrap">
        <div className="min-w-[120px] p-2">
          <div className="h-6 w-32 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="whitespace-nowrap">
        <div className="min-w-[170px]">
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
      <td className="whitespace-nowrap">
        <div className="flex justify-center">
          <div className="h-6 w-24 bg-gray-400 rounded-xl animate-pulse"></div>
        </div>
      </td>
      <td className="flex gap-2 items-center justify-center">
        <div className="w-28 h-10 bg-gray-500 rounded-xl animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-500 rounded-xl animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-600 rounded-xl animate-pulse"></div>
      </td>
    </tr>
  );
}

export const ProductSkeleton = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 lg:hidden py-4">
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
        <MobileSkeleton />
      </div>
      <div className="hidden lg:block py-4">
        <table className="min-w-full table">
          <thead className="rounded-xl text-left text-sm bg-neutral-200">
            <tr className="[&>*]:font-semibold [&>*]:py-3 [&>*]:px-4">
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col" className="text-center">Vencimiento</th>
              <th scope="col" className="text-center">Stock</th>
              <th scope="col" className="text-center">Precio</th>
              <th scope="col" className="text-center">Sector</th>
              <th scope="col" className="text-center">Acciones</th>
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