'use client'

import ErrorMessage from "@/app/components/ErrorMessage"
import { createLoss } from "@/app/lib/actions"
import { Loss } from "@/app/lib/definitions"
import { MESES, initialState } from "@/app/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import Swal from "sweetalert2"

function AddButton() {
  
  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending}
      className={`py-2 px-3 bg-blue-500 text-white rounded-lg transition-colors ${pending !== true && 'hover:bg-blue-700'} ${pending && 'cursor-default'}`}
      style={{
        opacity: pending ? '0.4' : '1'
      }}
    >
      Añadir
    </button>
  )
}
export default function FormBroken(
  { id, totalProducts, perdida }:
  { id: string; totalProducts: number; perdida: Loss | null }
) {

  const createLossBind = createLoss.bind(null, { id, totalProducts, perdida });

  const [ stock, setStock ] = useState(totalProducts);

  const [ state, dispatch ] = useFormState(createLossBind, initialState)
  const { push } = useRouter()

  if (state.success === true) {
    Swal.fire({
      title: 'Pérdida',
      text: state.message || 'Pérdida añadida!',
      icon: state.timer === false ? 'info' : 'success',
      timer: state.timer === false ? undefined : 1200
    })
      .then(() => {
        push('/productos')
      })
  }

  const handleChangeCantidad = (value: number) => {
    const total = totalProducts - value;
    if (total > 0) setStock(total);
    else setStock(0)
  }

  return (
    <form className="py-4 flex flex-col gap-4 w-full max-w-[450px] mx-auto" action={dispatch}>
      <div>
        <label htmlFor="cantidad">Cantidad de productos rotos</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
          placeholder="0"
          aria-describedby="cantidad-error"
          onChange={(e) => handleChangeCantidad((Number(e.target.value)) || 0)}
        />

        <ErrorMessage
          table="perdida"
          id="cantidad-error"
          state={state}
          field="cantidad"
        />
      </div>
      <div>
        <label htmlFor="mes">Més</label>
        <select
          id="mes"
          name="mes"
          className="py-2 px-3 w-full border-x border-y border-neutral-400 rounded-lg outline-none focus:border-blue-500"
          aria-describedby="mes-error"
          defaultValue={'Enero'}
        >
          {MESES.map((mes, index) => (
            <option value={mes} key={`${mes}${index}`}>
              {mes}
            </option>
          ))}
        </select>

        <ErrorMessage
          table="perdida"
          id="mes-error"
          state={state}
          field="mes"
        />
      </div>
      <AddButton />

      <p aria-live='polite'>Stock total: <span className="font-semibold">{stock}</span></p>

      {state.success === false ? (
        <p className="text-red-700 text-sm">{state.message}</p>
      ) : <></>}
    </form>
  );
}