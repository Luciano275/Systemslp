import { fetchTotalProductLossBySector } from "../lib/data";
import SelectCard from "./SelectCard";

export default async function DynamicCard({
  sector
}: {
  sector: number
}) {

  const productLossBySector = await fetchTotalProductLossBySector(sector)

  return (
    <SelectCard value={productLossBySector} />
  )
}