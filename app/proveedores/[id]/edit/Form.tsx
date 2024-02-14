'use client'

import ErrorMessage from "@/app/components/ErrorMessage";
import { updateProvider } from "@/app/lib/actions";
import { Proveedor } from "@/app/lib/definitions";
import { initialState } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Swal from 'sweetalert2'

const EditButton = () => {

  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending}
      className={`py-2 px-3 bg-green-500 text-white rounded-lg transition-colors ${pending !== true ?? 'hover:bg-green-700'} ${pending ?? 'cursor-default'}`}
      style={{
        opacity: pending ? '0.4' : '1'
      }}
    >
      Guardar
    </button>
  )
}

export default function FormProviderEdit ({
  proveedor
}: {
  proveedor: Proveedor
}) {

  const { id, nombre, producto, descripcion, cantidad, entrega, precio } =
    proveedor;

  const bindUpdateProvider = updateProvider.bind(null, id)
  const [ state, dispatch ] = useFormState(bindUpdateProvider, initialState)
  const { push } = useRouter();

  if (state.success === true) {
    Swal.fire({
      title: 'Proveedor',
      text: state.message || 'Proveedor editado!',
      icon: 'success',
      timer: 1200
    })
      .then(() => {
        push('/proveedores')
      })
  }

  return (
    <form className="w-full max-w-[450px] mx-auto flex flex-col gap-4 py-4" action={dispatch}>
        <div>
          <label htmlFor="nombre">Nombre del proveedor</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="Proveedor"
            aria-describedby="nombre-error"
            defaultValue={nombre}
          />

          <ErrorMessage
            table="proveedores"
            id="nombre-error"
            field="nombre"
            state={state}
          />
        </div>
        <div>
        <label htmlFor="producto" className="block">
            Nombre del producto que provee
          </label>
          <input
            type="text"
            name="producto"
            id="producto"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="Producto"
            aria-describedby="producto-error"
            defaultValue={producto}
          />

          <ErrorMessage
            table="proveedores"
            id="producto-error"
            field="producto"
            state={state}
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block">
            Descripción del proveedor
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500 min-h-[120px] max-h-[200px] resize-y"
            placeholder="Pequeña descripción"
            aria-describedby="descripcion-error"
            defaultValue={descripcion}
          ></textarea>

          <ErrorMessage
            table="proveedores"
            id="descripcion-error"
            state={state}
            field="descripcion"
          />
        </div>
        <div>
          <label htmlFor="cantidad" className="block">
            Cantidad total de los productos
          </label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="0"
            aria-describedby="cantidad-error"
            defaultValue={cantidad}
          />

          <ErrorMessage
            table="proveedores"
            id="cantidad-error"
            state={state}
            field="cantidad"
          />
        </div>
        <div>
          <label htmlFor="entrega" className="block">
            Fecha de entrega de los productos
          </label>
          <input
            type="date"
            name="entrega"
            id="entrega"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            aria-describedby="entrega-error"
            defaultValue={
              new Date(entrega).toISOString().split('T')[0]
            }
          />

          <ErrorMessage
            table="proveedores"
            id="entrega-error"
            state={state}
            field="entrega"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block">
            Precio por unidad
          </label>
          <input
            type="number"
            name="precio"
            id="precio"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="0"
            aria-describedby="precio-error"
            max={100000000}
            defaultValue={precio}
          />

          <ErrorMessage
            table="proveedores"
            id="precio-error"
            state={state}
            field="precio"
          />
        </div>
        <EditButton />
        
        {state.success === false && (
          <p className="text-red-700 text-sm">{state.message}</p>
        )}
      </form>
  )
}