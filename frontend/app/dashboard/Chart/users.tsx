import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

const Donut: React.FC = () => {
  const [teachers, setTeachers] = useState(0);
  const [students, setStudents] = useState(3);
  const [admins, setAdmins] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axios.get('http://localhost:3333/auth/role/teacher');
        const studentsResponse = await axios.get('http://localhost:3333/auth/role/student');
        const adminsResponse = await axios.get('http://localhost:3333/auth/role/admin');
        // const studentsResponse = await axios.get('http://localhost:3333/students');
        // const adminsResponse = await axios.get('http://localhost:3333/admins');

        if (teachersResponse.status === 200) {
                   
            setStudents(studentsResponse.data.length);
         
            setTeachers(teachersResponse.data.length);
   
            setAdmins(adminsResponse.data.length);
          }


          console.log(teachersResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['Students', 'Teachers', 'Admins'],
    // Other options like colors, legend, etc.
  };

  const series = [students, teachers, admins];

  return (
    <div className="donut">
      <Chart options={pieChartOptions} series={series} type="donut" width={380} />
    </div>
  );
};

export default Donut;
