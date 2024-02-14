'use client'

import { FaTrash } from "react-icons/fa"
import Swal from 'sweetalert2'
import { State, deleteProduct, deleteProvider } from "../lib/actions"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

function Button({mobile}: {mobile: boolean}) {
  return (
    <button
      className={`bg-red-500 text-white ${
        !mobile
          ? `w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-red-700`
          : `rounded-xl p-3 transition-colors hover:bg-red-300`
      }`}
    >
      <FaTrash />
    </button>
  )

}

function ReplacePath({
  replace,
  searchParams,
  pathname
}: {
  replace: (href: string, options?: NavigateOptions | undefined) => void;
  searchParams: ReadonlyURLSearchParams;
  pathname: string
}){
  const params = new URLSearchParams(searchParams);
  if (params.get('status')) {
    params.delete('status');
  }else {
    params.set('status', 'deleted');
  }
  replace(`${pathname}?${params.toString()}`);
}

export default function DeleteButton({
  id,
  mobile,
  mode
}: {
  id: string,
  mobile: boolean,
  mode: 'productos' | 'proveedores'
}) {

  const { replace } = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no tiene vuelta atrás...Piénsalo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo."
    }).then((result) => {
      if (result.isConfirmed) {
        if (mode === 'productos') {
          deleteProduct(id)
            .then((data) => {
              if (data.success !== true) {
                Swal.fire({
                  title: 'Error',
                  text: data.message || 'Ocurrió un error.',
                  icon: 'error'
                })
              }else {
                Swal.fire({
                  title: 'Exito!',
                  text: data.message || 'El producto ha sido borrado con exito.',
                  icon: 'success',
                  timer: 1200
                })
                  .then(() => {
                    ReplacePath({
                      replace,
                      searchParams,
                      pathname
                    })
                  })
              }
            })
        }else {
          // Borrar proveedor
          deleteProvider(id)
            .then((data) => {
              if (data.success !== true) {
                Swal.fire({
                  title: 'Error',
                  text: data.message || 'Ocurró un error',
                  icon: 'error'
                })
              }else {
                Swal.fire({
                  title: 'Exito!',
                  text: data.message || 'El proveedor ha sido borrado con exito.',
                  icon: 'success',
                  timer: 1200
                })
                  .then(() => {
                    ReplacePath({
                      replace,
                      searchParams,
                      pathname
                    })
                  })
              }
            })
        }
      }
    });

  }

  return (
    <form onSubmit={handleSubmit}>
      <Button mobile={mobile} />
    </form>
  )

}