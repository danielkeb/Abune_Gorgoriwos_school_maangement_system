import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToGetContext } from '@/app/context/toget';
import { AppContext } from '@/components/context/UserContext';

const A: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);
  const [userData, setUserData] = useState({ students: 0, teachers: 0 });
  const { schoolId } = useContext(ToGetContext);
  const [isClient, setIsClient] = useState(false);
  const { decodedToken, token, logout } = useContext(AppContext);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axios.get(`http://localhost:3333/auth/role/teacher/${schoolId}`);
        const studentsResponse = await axios.get(`http://localhost:3333/auth/role/student/${schoolId}`);
        const response = await axios.get(`http://localhost:3333/callander/all/${schoolId}`);
      
       
  
         
          setAllEvents(response.data);

        if (teachersResponse.status === 200 && studentsResponse.status === 200 ) {
          const teachersCount = teachersResponse.data.length;
          const studentsCount = studentsResponse.data.length;

          setUserData({
            students: studentsCount,
            teachers: teachersCount,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const featuresList = [
    { title: "Teachers", amount: userData?.teachers },
    { title: "Students", amount: userData?.students },
    { title: "School Year", amount:new Date(Date.now()).getFullYear() },
    { title: "School Events", amount: allEvents.length },
  ];

  if (!isClient) {
    // While waiting for client-side rendering, return null or a loading spinner
    return null;
  }

  return (
<div className='w-[100%]  '>
      {decodedToken?.role === "superadmin" && (
        <div className="flex flex-wrap items-center justify-center gap-4 ">
          {featuresList.map((feature, index) => (
            <div key={index} className="boxshadow p-6  w-full sm:w-[48%] lg:w-[23%] bg-white">
            <div>
              <div className="flex flex-col">
                <div className="flex space-x-4">
                  <div>
                    <div className="uppercase text-sm text-gray-400">{feature?.title}</div>
                    <div className="mt-1">
                      <div className="flex space-x-2 items-center">
                        <div className="text-2xl">{feature?.amount}</div>
                        <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg className="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      ) }
    </div>

  );
};

export default A;


         
