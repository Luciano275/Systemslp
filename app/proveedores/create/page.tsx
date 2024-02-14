'use client'

import ErrorMessage from "@/app/components/ErrorMessage";
import { createProvider } from "@/app/lib/actions";
import { initialState } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Swal from "sweetalert2";

const AddButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={`py-2 px-3 bg-blue-500 text-white rounded-lg transition-colors ${!pending && 'hover:bg-blue-400'} ${pending && 'cursor-default'}`}
      style={{
        opacity: pending ? '0.4' : '1'
      }}
    >
      Añadir
    </button>
  )

}

export default function CreateProviderPage() {

  const [state, dispatch] = useFormState(createProvider, initialState)
  const { push } = useRouter()

  if (state.success === true) {
    Swal.fire({
      title: 'Proveedor',
      text: state.message || 'Proveedor añadido!',
      icon: 'success',
      timer: 1200
    })
      .then(() => {
        push('/proveedores')
      })
  }

  return (
    <section className="p-5">
      <h2 className="text-3xl w-full max-w-[450px] mx-auto">
        Añadir un proveedor
      </h2>
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
          />

          <ErrorMessage
            table="proveedores"
            id="precio-error"
            state={state}
            field="precio"
          />
        </div>
        <AddButton />
        
        {state.success === false && (
          <p className="text-red-700 text-sm">{state.message}</p>
        )}
      </form>
    </section>
  )
}