import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({analysis}) {
    const subjects=analysis.map(a=>{
        return a.subject;
    })
// Initialize arrays to store data for each score range
const below50Data = [];
const between50And60Data = [];
const above60Data = [];

// Iterate over analysisData to populate the data arrays
for (const subjectData of analysis) {
  below50Data.push(subjectData['Below 50']);
  between50And60Data.push(subjectData['50-60']);
  above60Data.push(subjectData['Above 60']);
}
console.log(below50Data)
// Construct the series array for the BarChart component
const series = [
  { data: below50Data, label: 'Less than 50 (%)',color:'#f28e2c' },
  { data: between50And60Data, label: 'between 50-60 (%)' },
  { data: above60Data, label: 'Greater than 60 (%)', color:'#59a14f' }
];
  return (
    <div className='flex  justify-center items-center bg-white   w-full '>


    <div className=" bg-white flex  justify-center items-center  boxshadow w-[80%] p-4">


    <BarChart
      xAxis={[{ scaleType: 'band', data: subjects }]}
      series={series}
      width={650}
      height={350}
    />
        </div>
        </div>
  );
}
