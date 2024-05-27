import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToGetContext } from '@/app/context/toget';

const A: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);
  const { schoolId } = useContext(ToGetContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsResponse, studentsResponse, teachersResponse] = await Promise.all([
          axios.get('http://localhost:3333/schools/get'),
          axios.get('http://localhost:3333/students/get'),
          axios.get('http://localhost:3333/teachers/get')
        ]);

        if (schoolsResponse.status === 200) {
          setSchools(schoolsResponse.data);
        }
        if (studentsResponse.status === 200) {
          setStudents(studentsResponse.data);
        }
        if (teachersResponse.status === 200) {
          setTeachers(teachersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getNumberOfStudents = (schoolId: number) => {
    return students.filter(student => student.school_Id === schoolId).length;
  };

  const getNumberOfTeachers = (schoolId: number) => {
    return teachers.filter(teacher => teacher.schoolId === schoolId).length;
  };

  const getNumberOfStudentsGender = (schoolId: number, gender: string) => {
    return students.filter(student => student.school_Id === schoolId && student.gender === gender).length;
  };

  const getNumberOfTeachersGender = (schoolId: number, gender: string) => {
    return teachers.filter(teacher => teacher.schoolId === schoolId && teacher.gender === gender).length;
  };

  // Filter the schools array based on the schoolId
  const currentSchool = schools.find(school => school.id === schoolId);

  if (!currentSchool) return null;

  const maleStudents = getNumberOfStudentsGender(schoolId, 'Male');
  const femaleStudents = getNumberOfStudentsGender(schoolId, 'Female');
  const maleTeachers = getNumberOfTeachersGender(schoolId, 'Male');
  const femaleTeachers = getNumberOfTeachersGender(schoolId, 'Female');

  return (
    <div>
      <div className='text-xl mt-1 mb-5'>School Name: {currentSchool.school_name}</div>
      <div className="flex md:flex-row flex-col w-full items-center justify-evenly gap-4">
        <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
          <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
            <div className="flex flex-col">
              <div className="flex space-x-8 w-80">
                <div>
                  <div className="uppercase text-sm text-gray-400">Teachers</div>
                  <div className="mt-1">
                    <div className="flex space-x-2 items-center">
                      <div className="text-xl">{getNumberOfTeachers(currentSchool.id)}</div>
                      <div className="text-xs text-green-800 bg-green-200 ml-2 rounded-md p-1">+4.5%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
          <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
            <div className="flex flex-col">
              <div className="flex space-x-8 w-80">
                <div>
                  <div className="uppercase text-sm text-gray-400">Students</div>
                  <div className="mt-1">
                    <div className="flex space-x-2 items-center">
                      <div className="text-xl">{getNumberOfStudents(currentSchool.id)}</div>
                      <div className="text-xs text-green-800 bg-green-200 ml-2 rounded-md p-1">+4.5%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
          <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
            <div className="flex flex-col">
              <div className="flex space-x-8 w-80">
                <div>
                  <div className="uppercase text-sm text-gray-400">Students</div>
                  <div className="mt-1">
                    <div className="flex space-x-2 items-center">
                      <div className="text-xl">Male {maleStudents}</div>
                      <div className="text-xl">Female {femaleStudents}</div>
                      <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full items-center justify-center md:gap-4 gap-4">
          <div className="boxshadow p-6 bg-gradient-to-r from-green-400 to-sky-500">
            <div className="flex flex-col">
              <div className="flex space-x-8 w-80">
                <div>
                  <div className="uppercase text-sm text-gray-400">Teachers</div>
                  <div className="mt-1">
                    <div className="flex space-x-2 items-center">
                      <div className="text-xl">Male: {maleTeachers}</div>
                      <div className="text-xl">Female: {femaleTeachers}</div>
                      <div className="text-xs text-green-800 bg-green-200 rounded-md p-1">+4.5%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default A;
