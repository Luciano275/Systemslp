'use client'

//import { Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale);

export default function ChartBar({
  productLossByMonth
}: {
  productLossByMonth: {
    cantidad_total_perdido: number;
    mes: string;
    mes_id: number;
  }[]
}) {
  return (
    <div className='min-h-[500px] relative'>
      <Bar
        data={{
          labels: [...productLossByMonth.map(({mes}) => mes)],
          datasets: [
            {
              label: 'Pérdida entre los meses',
              data: [
                ...productLossByMonth.map(({ cantidad_total_perdido }) => cantidad_total_perdido)
              ],
              backgroundColor: '#09f',
              borderRadius: {
                topLeft: 7,
                topRight: 7
              },
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 1.5,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 15
                }
              }
            }
          },
        }}
      />
    </div>
  )
}
