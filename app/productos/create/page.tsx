'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createProduct } from '@/app/lib/actions';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/app/components/ErrorMessage';
import { initialState } from '@/app/lib/utils';

function AddButton() {

  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={`py-2 px-3 bg-blue-500 text-white rounded-lg transition-colors ${!pending && 'hover:bg-blue-400'} ${pending && 'cursor-default'}`}
      style={{
        opacity: pending ? '0.4' : '1'
      }}
    >
      Crear
    </button>
  );
}

export default function CreateProductPage() {

  const [ state, dispatch ] = useFormState(createProduct, initialState)
  const { push } = useRouter()

  if (state.success === true) {
    Swal.fire({
      title: 'Producto',
      text: state.message || 'Producto creado!',
      icon: 'success',
      timer: 1200
    })
      .then(() => {
        push('/productos')
      })
  }

  return (
    <section className="p-5">
      <h2 className="text-3xl w-full max-w-[450px] mx-auto">
        Crear un producto
      </h2>
      <form
        action={dispatch}
        className="w-full flex flex-col max-w-[450px] mx-auto gap-4 py-4"
      >
        <div>
          <label htmlFor="nombre" className="block">
            Nombre del producto
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            placeholder="Producto"
            aria-describedby="nombre-error"
          />

          <ErrorMessage
            table="productos"
            id="nombre-error"
            field="nombre"
            state={state}
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
          ></textarea>

          <ErrorMessage
            table="productos"
            id="descripcion-error"
            state={state}
            field="descripcion"
          />
        </div>
        <div>
          <label htmlFor="vencimiento" className="block">
            Fecha de Vencimiento del producto
          </label>
          <input
            type="date"
            name="vencimiento"
            id="vencimiento"
            className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
            aria-describedby="vencimiento-error"
          />

          <ErrorMessage
            table="productos"
            id="vencimiento-error"
            state={state}
            field="vencimiento"
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
          />

          <ErrorMessage
            table="productos"
            id="stock-error"
            state={state}
            field="stock"
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
            max={100000000}
          />

          <ErrorMessage
            table="productos"
            id="precio-error"
            state={state}
            field="precio"
          />
        </div>
        <div>
          <label htmlFor="sector" className="block">
            Sector del producto
          </label>
          <select
            name="sector"
            id="sector"
            defaultValue={"Seleccione un sector"}
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
            field="sector"
          />
        </div>
        <AddButton />
        {state.success === false && (
          <p className="text-red-700 text-sm">{state.message}</p>
        )}
      </form>
    </section>
  );
}