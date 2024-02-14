import { Suspense } from "react";
import AppCard from './AppCards'
import { CardsSkeleton, ChartBarSkeleton } from "../skeletons/ReportsSkeleton";
import Chart from "./Chart";

export default async function ReportsPage ({
  searchParams: {
    sector
  }
}: {
  searchParams: {
    sector?: string
  }
}) {
  return (
    <section className="p-5">
      <h2 className="text-4xl py-4 border-b border-black">Reportes</h2>

      <Suspense fallback={<CardsSkeleton />}>
        <AppCard sector={(Number(sector)) || 1} />
      </Suspense>

      <Suspense fallback={<ChartBarSkeleton />}>
        <Chart sector={Number(sector) || 1} />
      </Suspense>

    </section>
  );
}