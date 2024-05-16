"use client"
import React, { useEffect, useState } from 'react'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { AppContext } from '@/components/context/UserContext';
import axios from 'axios';
const Profile = () => {
    const { decodedToken } = React.useContext(AppContext);
    const[events, setEvents]=useState()
    useEffect(() => {
  
      const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3333/auth/user/${decodedToken?.sub}`);
         
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
      console.log("here are the events",events)
  
  return (
<div className='flex gap-4 p-6'>
 <img src="/avater-removebg-preview (1).png" width={200}  />
 <div className='flex flex-col justify-center items-start text-lg'>
   <h5>Name: <b>{events?.frist_name} {events?.middle_name} {events?.last_name}</b> </h5> 
   <h5>Role: {events?.role}</h5>
   <h5> Address: {events?.address}</h5>
    
   
 </div>
</div>
  )
}

export default Profile
