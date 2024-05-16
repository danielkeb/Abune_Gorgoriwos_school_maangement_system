
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
            { id: 0, value:gender?.male, label: 'Male S' ,color:'#228B22' },
            { id: 1, value:gender?.female, label: 'Female S',   },
          
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}