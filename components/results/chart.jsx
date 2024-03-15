import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie(props) {
  const  { proteinGrams,  carboGrams, fatGrams} = props;


  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, color: '#B62685', value: 15, label: `15% Proteins ${proteinGrams}g` },
            { id: 1, color: '#4E3987', value: 55, label: `55% Carbo ${carboGrams}g` },
            { id: 2, color: '#1B0438', value: 30, label: `30% Fat ${fatGrams}g` },
          ],
        },
      ]}
      width={500}
      height={200}
      margin={{
        left: 0,
        right:180,
        top: 0,
        bottom: 0,
      }}
    />
  );
}