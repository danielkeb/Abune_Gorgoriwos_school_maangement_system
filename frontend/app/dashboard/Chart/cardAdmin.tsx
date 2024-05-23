import { AppContext } from '@/components/context/UserContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AccessibilityOutline, FingerPrintOutline, SchoolOutline } from 'react-ionicons';

const CardAdmin = () => {
  const [userData, setUserData] = useState({ users: 0, schools: 0, students: 0, teachers: 0 });
  const [isClient, setIsClient] = useState(false);
  const { decodedToken } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let teachersCount = 0, studentsCount = 0, schoolsCount = 0, adminsCount = 0;

        if (decodedToken.role === 'superadmin') {
          const [teachersResponse, studentsResponse, adminsResponse, schoolsResponse] = await Promise.all([
            axios.get('http://localhost:3333/auth/role/teacher'),
            axios.get('http://localhost:3333/auth/role/student'),
            axios.get('http://localhost:3333/auth/role/admin'),
            axios.get('http://localhost:3333/schools/get')
          ]);

          if (teachersResponse.status === 200) teachersCount = teachersResponse.data.length;
          if (studentsResponse.status === 200) studentsCount = studentsResponse.data.length;
          if (adminsResponse.status === 200) adminsCount = adminsResponse.data.length;
          if (schoolsResponse.status === 200) schoolsCount = schoolsResponse.data.length;

        } else if (decodedToken.role === 'admin') {
          const schoolId = decodedToken.school_Id;
          const [teachersResponse, studentsResponse] = await Promise.all([
            axios.get(`http://localhost:3333/auth/role/teacher?schoolId=${schoolId}`),
            axios.get(`http://localhost:3333/auth/role/student?schoolId=${schoolId}`)
          ]);

          if (teachersResponse.status === 200) teachersCount = teachersResponse.data.length;
          if (studentsResponse.status === 200) studentsCount = studentsResponse.data.length;
          schoolsCount = 1; // Since it's only the director's school
        }

        setUserData({
          users: adminsCount,
          schools: schoolsCount,
          students: studentsCount,
          teachers: teachersCount,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setIsClient(true);
  }, [decodedToken]);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  const featuresList = [
    { title: "Admin", amount: userData?.users },
    { title: "Schools", amount: userData?.schools },
    { title: "Teachers", amount: userData?.teachers },
    { title: "Students", amount: userData?.students },
  ];

  return (
    <div className='w-[90%]'>
      {decodedToken?.role === "superadmin" ? (
        <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
          {featuresList.map((feature, index) => (
            <div key={index} className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-80">
                    <div className="">
                      <div className="uppercase text-sm text-gray-400">{feature?.title}</div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">{feature?.amount}</div>
                          <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[90%] flex justify-start">
          <h5 className="text-xl">Welcome Back {decodedToken?.frist_name} 👋</h5>
          <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
            <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-80">
                    <div className="">
                      <div className="uppercase text-sm text-gray-400">Teachers</div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">{userData?.teachers}</div>
                          <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
              <div className="">
                <div className="flex flex-col">
                  <div className="flex space-x-8 w-80">
                    <div className="">
                      <div className="uppercase text-sm text-gray-400">Students</div>
                      <div className="mt-1">
                        <div className="flex space-x-2 items-center">
                          <div className="text-2xl">{userData?.students}</div>
                          <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAdmin;
