'use client'

import Chart, { CategoryScale } from 'chart.js/auto';
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale)

export default function ChartLine({
  productLossBySectorAndMonth,
  sector
}: {
  productLossBySectorAndMonth: {
    cantidad_total_perdida: number;
    sector: number;
    mes: string;
    mes_id: number;
  }[];
  sector: string
}) {
  return (
    <Line
      data={{
        labels: [
          ...productLossBySectorAndMonth.map(({ mes }) => mes)
        ],
        datasets: [
          {
            label: `Pérdida en ${sector}`,
            data: [
              ...productLossBySectorAndMonth.map(({ cantidad_total_perdida }) => cantidad_total_perdida)
            ],
            borderColor: '#09f',
            borderWidth: 2,
            borderCapStyle: 'square',
            pointStyle: 'circle',
            pointBorderWidth: 3
          }
        ]
    }}
      options={{
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        plugins: {
          tooltip: {
            intersect: true,
            enabled: true,
            mode: 'index'            
          },
          legend: {
            labels: {
              font: {
                size: 15
              }
            }
          }
        }
      }}
    />
  )
}