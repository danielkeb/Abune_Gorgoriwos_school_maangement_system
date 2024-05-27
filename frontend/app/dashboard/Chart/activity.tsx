import React, { useEffect, useState } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { AppContext } from '@/components/context/UserContext';
import axios from 'axios';
const Activity = () => {
    const { decodedToken } = React.useContext(AppContext);
    const[events, setEvents]=useState([])
    useEffect(() => {
  
      const fetchData = async () => {
        try {
          if(decodedToken?.role=="admin"){
            const response = await axios.get(`http://localhost:3333/callander/all_admin/${decodedToken?.school_Id}`);
         
            setEvents(response.data);
          }else if (decodedToken?.role=="superadmin"){
            const response = await axios.get(`http://localhost:3333/callander/all/${0}`);
         
            setEvents(response.data);
          }else{
            const response = await axios.get(`http://localhost:3333/callander/all/${decodedToken?.school_Id}`);
         
            setEvents(response.data);
          }
            
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [decodedToken]);
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

  )
}

export default Activity
