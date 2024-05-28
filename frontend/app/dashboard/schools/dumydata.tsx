import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import { ToGetContext } from '@/app/context/toget';
import { PieChart } from '@mui/x-charts/PieChart';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Box, Container, Paper } from '@mui/material';
const DummyData = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const[gender, setGender]=useState({})
  const { schoolId } = useContext(ToGetContext);
  const[events, setEvents]=useState([])
  useEffect(() => {

    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get(`http://localhost:3333/schools/getsex/${schoolId}`);
        const response = await axios.get(`http://localhost:3333/callander/all/${schoolId}`);
         
        setEvents(response.data);
       setGender(schoolsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolId]);

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

  const upcomingEvents = events
  .filter((e:any) => new Date(e.start) > new Date())
  .sort((a, b) => new Date(a.start) - new Date(b.start));
  console.log("upcoming events", upcomingEvents)
  // Function to format the date string
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

    // Function to determine if date is within a week
    const isWithinWeek = (dateString:any) => {
        const date = new Date(dateString);
        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // One week from now
        return date <= oneWeekFromNow;
      };
      

  return (
    <div className=" mt-[-10px] w-full flex flex-col md:flex-row gap-2 container mx-auto my-auto px-4 py-10 text-sm lg:font-normal ">

<Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Box width="100%" height="400px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
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
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Container>

<div className="w-full md:w-1/2 flex flex-col gap-6">
  <div className="flex justify-center bg-white boxshadow h-auto md:h-auto sm:h-auto">
  
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
  </div>
  <div className="boxshadow flex-1  flex flex-col  items-center p-4 bg-white">
  <h1 className=" text-lg lg:text-2xl mb-4  ">Upcoming School Events</h1>
 
  <div className="w-full lg:w-4/5 p-6 border border-gray-200 flex flex-col justify-start items-start text-lg bg-white  rounded-md">
  {upcomingEvents.map((e) => (
    <div key={e.id} className="mb-4">
      <p className="flex items-center">
        <PanoramaFishEyeIcon sx={{ color: isWithinWeek(e.start) ? 'red' : 'green', fontSize: '15px' }} />
        <span className="ml-2 text-gray-500">
          {formatDate(e?.start)} {parseInt(e.school_Id) === 0 && "Main"}
        </span>
      </p>
      <p className="mt-1 mb-2 ml-8">{e?.title}</p>
    </div>
  ))}
</div>
  </div>
</div>
</div>
    
  );
};

export default DummyData;


