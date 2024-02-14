'use client'

import ErrorMessage from "@/app/components/ErrorMessage";
import { State, updateProduct } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import { initialState } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import Swal from 'sweetalert2'

function EditButton() {
  
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

export default function FormEdit({
  producto
}: {
  producto: Product
}) {

  const { nombre, descripcion, vencimiento, stock, precio, sector, id } = producto;

  const bindUpdateProduct = updateProduct.bind(null, id);

  const [state, dispatch] = useFormState(bindUpdateProduct, initialState)
  const { push } = useRouter()

  if (state.success === true) {
    Swal.fire({
      title: 'Producto',
      text: state.message || 'Producto editado!',
      icon: 'success',
      timer: 1200
    })
      .then(() => {
        push('/productos')
      })
  }

  return (
    <form action={dispatch} className="py-4 flex flex-col gap-4 w-full max-w-[450px] mx-auto">
      <div>
        <label htmlFor="nombre" className="block">Nombre del producto</label>
        <input
          type="text"
          className="py-2 px-3 border-x border-y border-neutral-400 rounded-lg w-full outline-none focus:border-blue-500"
          defaultValue={nombre}
          aria-describedby="nombre-error"
          name="nombre"
          id="nombre"
        />

        <ErrorMessage
          table="productos"
          id="nombre-error"
          state={state}
          field='nombre'
        />
      </div>
      <div>
          <label htmlFor="descripcion" className="block">
            Descripción del producto
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
            table="productos"
            id="descripcion-error"
            state={state}
            field='descripcion'
          />
        </div>
        <div>
          <label htmlFor="vencimiento" className="block">
            Fecha de vencimiento del producto
          </label>
          <input
            type="date"
            name="vencimiento"
            id="vencimiento"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            aria-describedby="vencimiento-error"
            defaultValue={new Date(vencimiento).toISOString().split('T')[0]}
          />

          <ErrorMessage
            table="productos"
            id="vencimiento-error"
            state={state}
            field='vencimiento'
          />
        </div>
        <div>
          <label htmlFor="stock" className="block">
            Stock total del producto
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="0"
            aria-describedby="stock-error"
            defaultValue={stock}
          />

          <ErrorMessage
            table="productos"
            id="stock-error"
            state={state}
            field='stock'
          />
        </div>
        <div>
          <label htmlFor="precio" className="block">
            Precio del producto
          </label>
          <input
            type="number"
            name="precio"
            id="precio"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="0"
            aria-describedby="precio-error"
            defaultValue={precio}
            min={0.0}
            max={100000000.99}
          />

          <ErrorMessage
            table="productos"
            id="precio-error"
            state={state}
            field='precio'
          />
        </div>
        <div>
          <label htmlFor="sector" className="block">
            Sector del producto
          </label>
          <select
            name="sector"
            id="sector"
            defaultValue={sector}
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            aria-describedby="sector-error"
          >
            <option value="Seleccione un sector">Seleccione un sector</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpiezas">Limpiezas</option>
            <option value="Golosinas">Golosinas</option>
            <option value="Comestibles">Comestibles</option>
          </select>

          <ErrorMessage
            table="productos"
            id="sector-error"
            state={state}
            field='sector'
          />
        </div>

        <EditButton />
        {state.success === false ? (
          <p className="text-red-700 text-sm">{state.message}</p>
        ) : <></>}
    </form>
  );

}