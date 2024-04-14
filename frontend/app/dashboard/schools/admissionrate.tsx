import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ToGetContext } from '@/app/context/toget';

const AdmissionRateLineChart = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const { schoolId } = React.useContext(ToGetContext);

  useEffect(() => {
    const calculateAdmissionRate = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:3333/students/get');
        const students = studentsResponse.data.filter(student => student.school_Id === schoolId);

        const admissionData = students.map(student => {
          const year = new Date(student.createdAT).getFullYear();
          return { year: year, male: student.gender === 'male' ? 1 : 0, female: student.gender === 'female' ? 1 : 0 };
        });

        const reducedData = admissionData.reduce((acc, curr) => {
          if (acc[curr.year]) {
            acc[curr.year].male += curr.male;
            acc[curr.year].female += curr.female;
          } else {
            acc[curr.year] = { year: curr.year, male: curr.male, female: curr.female };
          }
          return acc;
        }, {});

        const chartData = Object.keys(reducedData).map(year => {
          return { year: parseInt(year), male: reducedData[year].male, female: reducedData[year].female };
        });

        setAdmissionData(chartData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    calculateAdmissionRate();
  }, [schoolId]);

  return (
    <div  style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop:'40px' }}>
    <LineChart
      width={800}
      height={500}
      data={admissionData}
      margin={{ top: 20, right: 30, bottom: 30, left: 40 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="male" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="female" stroke="#82ca9d" activeDot={{ r: 8 }} />
    </LineChart>
    </div>
  );
};

export default AdmissionRateLineChart;