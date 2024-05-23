import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';
import Image from 'next/image';

// Define interfaces for the user data and API response
interface User {
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  address: string;
  image: string;
}

interface ApiResponse {
  user: User;
}

const Profile: React.FC = () => {
  const { decodedToken } = useContext(AppContext);
  const [user, setUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (decodedToken?.sub) {
          const response = await axios.get<ApiResponse>(`http://localhost:3333/auth/user/${decodedToken.sub}`);
          setUser(response.data.user);

          if (response.data.user.image) {
            const responseImg = await axios.get(`http://localhost:3333/${response.data.user.image}`, { responseType: 'blob' });
            const url = URL.createObjectURL(responseImg.data);
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [decodedToken]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex gap-4 p-6'>
      <img src={imageUrl} alt="Profile" width={200} height={200}/>
      <div className='flex flex-col justify-center items-start text-lg'>
        <h5>Name: <b>{user.first_name} {user.middle_name} {user.last_name}</b></h5>
        <h5>Role: {user.role}</h5>
        <h5>Address: {user.address}</h5>
      </div>
    </div>
  );
}

export default Profile;
