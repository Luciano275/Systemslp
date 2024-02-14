import { fetchTotalRevenueLost, fetchTotalProductLoss } from '@/app/lib/data'
import Cards from './Cards';

export default async function App ({
  sector
}: {
  sector: number
}) {

  const [
    revenueLost,
    productLoss,
  ] = await Promise.all([
    fetchTotalRevenueLost(),
    fetchTotalProductLoss()
  ]);

  return (
    <>
      <Cards
        revenueLost={revenueLost}
        productLoss={productLoss}
        sector={sector}
      />
    </>
  )
}