import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DummyData = () => {
  const [admissionData, setAdmissionData] = useState([]);

  useEffect(() => {
    // Dummy data for admission rates from 2021 to 2024
    const dummyAdmissionData = [
      { year: 2021, male: 120, female: 100 },
      { year: 2022, male: 130, female: 110 },
      { year: 2023, male: 140, female: 120 },
      { year: 2024, male: 150, female: 130 }
    ];

    setAdmissionData(dummyAdmissionData);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '40px' }}>
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

export default DummyData;
