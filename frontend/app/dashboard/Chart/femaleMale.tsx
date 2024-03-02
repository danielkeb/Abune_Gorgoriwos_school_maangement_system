import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

const BarChart: React.FC = () => {
  const [classData, setClassData] = useState<number[]>([]);
  const [classFemale, setClassFemale] = useState<number[]>([]);
  const [classMale, setClassMale] = useState<number[]>([]);
  const [classLabels, setClassLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3333/students/class'); // Assuming your API endpoint for class data
        if (response.status === 200) {
          const data = response.data;
          setClassLabels(data.map((_, index) => `Class ${index + 1}`));
          setClassData(data.map(item => item.total));
          setClassFemale(data.map(item => item.female));
          setClassMale(data.map(item => item.male));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const barChartOptions: ApexOptions = {
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
          { name: 'Male Students', data: classMale },
          { name: 'Female Students', data: classFemale },
        ]}
        type="bar"
        width={600}
        height={400}
      />
    </div>
  );
};

export default BarChart;
