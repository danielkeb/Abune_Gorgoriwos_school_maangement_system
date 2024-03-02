import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';


const BarChart: React.FC = () => {
  const [classData, setClassData] = useState<[number, number, number, number, number, number]>([21, 435, 56, 342, 232, 128]);
  const [classFemale, setClassFemale] = useState<[number, number, number, number, number, number]>([45, 122, 126, 242, 212, 112]);

  const classLabels = Array.from({ length: classData.length }, (_, i) => `Class ${i + 1}`);
  const maleStudentsData = classData;
  const femaleStudentsData = classFemale;

  const barChartOptions:ApexOptions={
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: classLabels,
    },
    // Other options like colors, legend, etc.
  };

  return (
    <div className="bar-chart">
      <Chart
        options={barChartOptions}
        series={[
          { name: 'Male Students', data: maleStudentsData },
          { name: 'Female Students', data: femaleStudentsData },
        ]}
        type="bar"
        width={600}
        height={400}
      />
    </div>
  );
};

export default BarChart;