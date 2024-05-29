import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';
import Image from 'next/image';
import Link from 'next/link';

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



<div className="w-full max-w-sm bg-whit  dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>

        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full " src={imageUrl} alt="profile Picture"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><b>{user?.frist_name} {user.middle_name} </b></h5>
        {
          decodedToken?.role=='superadmin'?
    <span className="text-sm text-gray-500 dark:text-gray-400">Role : {user?.role}</span>:<span className="text-sm text-gray-500 dark:text-gray-400">School Branch :{user?.school.school_name}</span>
        }
       


        <div className="flex mt-4 md:mt-6">
            <Link  href="/dashboard/profile" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</Link>
            
        </div>
    </div>
</div>


  );
}

export default Profile;



