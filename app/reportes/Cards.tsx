
import { Suspense } from "react";
import { formatMoney } from "../lib/utils";
import DynamicCard from "./DynamicCard";
import { Card as CardSkeleton } from '@/app/skeletons/ReportsSkeleton'

type IProps = {
  revenueLost: number;
  productLoss: number;
  sector: number;
}

function Card({
  value,
  title
}: {
  value: string | number;
  title: string
}) {
  return (
    <article className="border-[10px] border-blue-500 rounded-xl w-full h-[300px]">
      <div className="flex flex-col h-full">
        <h2 className="text-2xl bg-blue-500 text-center py-4 px-6 text-white">
          {title}
        </h2>
        <div className="grow flex items-center">
          <p className="text-3xl w-full max-w-[7ch] whitespace-nowrap overflow-hidden text-ellipsis mx-auto text-center" title={`${value}`}>
            {value}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Cards ({
  revenueLost,
  productLoss,
  sector
}: IProps) {

  const revenueTotal = parseFloat(formatMoney(revenueLost).toFixed(2)).toString()

  return (
    <div className="mt-5 px-2 grid" style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 500px))',
      justifyContent: 'center',
      gap: '32px',
      alignItems: 'center'
    }}>
      <Card
        value={`$ ${revenueTotal}`}
        title="Ganancia perdida"
      />
      <Card
        value={productLoss}
        title="Productos perdidos"
      />
      {/* <Card
        value={productLossBySector}
        type='dynamic'
        title="Pérdidas por sector"
      /> */}
      <Suspense key={sector} fallback={<CardSkeleton type="dynamic" />}>
        <DynamicCard sector={sector} />
      </Suspense>
    </div>
  )
}