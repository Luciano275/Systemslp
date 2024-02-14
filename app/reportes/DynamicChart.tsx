import { fetchTotalProductLossBySectorAndMonth } from "../lib/data"
import { sectores } from "../lib/utils"
import ChartLine from "./ChartLine";

export default async function DynamicChart({
  sector
}: {
  sector: number
}) {

  const productLossBySectorAndMonth = await fetchTotalProductLossBySectorAndMonth(sector)

  const sectorName = sectores.find((s) => s.value === sector);

  return (
    <div className="min-h-[500px] relative">
      <ChartLine
        productLossBySectorAndMonth={productLossBySectorAndMonth}
        sector={sectorName?.label || 'Lácteos'}
      />
    </div>
  )
}
