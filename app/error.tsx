'use client'

import { useEffect } from "react"

export default function Error({
  error,
  reset
}: {
  error: Error,
  reset: () => void
}) {

  useEffect(() => {
    console.log(error)
  }, [])

  return (
    <section className="p-5 absolute w-full flex flex-col justify-center top-0 left-0 h-full gap-5 items-center">
      <h2 className="text-3xl text-center">☹️ Algo salió mal</h2>
      <button onClick={() => reset()} className="bg-blue-500 transition-colors py-2 px-4 rounded-full max-w-[150px] text-white hover:bg-blue-300">Reintentar</button>
    </section>
  )
}