import { fetchTotalProductLossByMonth } from "../lib/data"
import { ChartLineSkeleton } from "../skeletons/ReportsSkeleton"
import ChartBar from "./ChartBar"
import DynamicChart from "./DynamicChart"
import { Suspense } from 'react'

export default async function Chart({
  sector
}: {
  sector: number
}) {

  const productLossByMonth = await fetchTotalProductLossByMonth()

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-10 items-center py-10 px-1 sm:px-10'>
        
        <ChartBar productLossByMonth={productLossByMonth} />

        {/* <div className='min-h-[500px] w-full max-w-[780px]'>
          <h2 className='text-2xl py-2 px-7'>Productos perdidos por meses</h2>
          <ChartLossMonth
            productLossByMonth={productLossByMonth}
          />
        </div> */}
        {/* <div className='min-h-[500px] w-full max-w-[780px]'>
          <ChartLossSectorMonth
            productLossBySectorAndMonth={productLossBySectorAndMonth}
          />
        </div> */}

        <Suspense key={sector} fallback={<ChartLineSkeleton />}>
          <DynamicChart sector={sector} />
        </Suspense>

      </div>
    </>
  )
}