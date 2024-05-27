
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';

export default function BasicPie() {
  const { decodedToken } = React.useContext(AppContext);
  const[gender, setGender]=useState({})
  useEffect(() => {

    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get(`http://localhost:3333/schools/getsex/${decodedToken?.school_Id}`);
       
       setGender(schoolsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [decodedToken]);
  
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value:gender?.student_male, label: 'SM' ,color:'#228B22' },
            { id: 1, value:gender?.student_female, label: 'SF', color:'#ec4899'   },
            { id: 2, value:gender?.teacher_male, label: 'TM' ,color:'#EA580C' },
            { id: 3, value:gender?.teacher_female, label: 'TF', color:'#1d4ed8'   }
          
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}