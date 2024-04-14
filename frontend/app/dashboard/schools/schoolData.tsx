import * as React from 'react';
import axios from 'axios';
import { ToGetContext } from '@/app/context/toget';

const A: React.FC = () => {
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [schools, setSchools] = React.useState([]);
  const { schoolId } = React.useContext(ToGetContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get('http://localhost:3333/schools/get');
        const studentsResponse = await axios.get('http://localhost:3333/students/get');
        const teachersResponse = await axios.get('http://localhost:3333/teachers/get');

        if (schoolsResponse.status === 200 && studentsResponse.status === 200 && teachersResponse.status === 200) {
          setSchools(schoolsResponse.data);
          setStudents(studentsResponse.data);
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
    return teachers.filter(teacher => teacher.school_Id === schoolId).length;
  };

  const getNumberOfStudentsGender = (schoolId: number, gender: string) => {
    const filteredStudents = students.filter(student => student.school_Id === schoolId && student.gender === gender);
    return filteredStudents.length;
  };

  const getNumberOfTeachersGender = (schoolId: number, gender: string) => {
    const filteredTeachers = teachers.filter(teacher => teacher.school_Id === schoolId && teacher.gender === gender);
    return filteredTeachers.length;
  };

  // Filter the schools array based on the schoolId
  const currentSchool = schools.find(school => school.id === schoolId);
  if (!currentSchool) return null;

  const maleStudents = getNumberOfStudentsGender(schoolId, 'male');
  const femaleStudents = getNumberOfStudentsGender(schoolId, 'female');
  const maleTeachers = getNumberOfTeachersGender(schoolId, 'male');
  const femaleTeachers = getNumberOfTeachersGender(schoolId, 'female');
  
  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-evenly gap-4">
      <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          School
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
              {currentSchool.school_name}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          students
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
              {getNumberOfStudents(currentSchool.id)}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          Teachers
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
              {getNumberOfTeachers(currentSchool.id)}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
       <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          male Teachers 
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
              {maleTeachers}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
       <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          female Teachers 
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
              {femaleTeachers}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          male students
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
            {maleStudents}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
       <div className="shadow-md p-8 bg-white rounded-md">
        <div className="uppercase text-sm text-gray-400">
          female students
        </div>
        <div className="mt-1">
          <div className="flex space-x-2 items-center">
            <div className="text-2xl">
            {femaleStudents}
            </div>
            <svg className="h-16 w-20 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Add student admission rate visualization by using better display */}
     
    </div>
  );
};

export default A;