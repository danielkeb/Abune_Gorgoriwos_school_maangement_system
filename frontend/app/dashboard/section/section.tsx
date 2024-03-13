import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
}

interface Grade {
  id: number;
  grade: string;
}

interface SectionData {
  id: number;
  name: string;
  gradeId: string;
  teacherId: string;
}

const SectionComponent = () => {
  const [section, setSection] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState('');
  const [classData, setClassData] = useState<SectionData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get<Grade[]>('http://localhost:3333/grade/get');
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setError('An error occurred while fetching grades');
    }
  };
  // const handleSlectedSEction = async (sectionId?: number) => {
  //   try {
  //     let response;
  //     if (sectionId) {
  //       response = await axios.get<SectionData>(`http://localhost:3333/section/get/${sectionId}`);
  //       setSelectedSubject(response.data);
  //       // Set showUpdateForm to
  //     } 
  //     setError('');
  //   } catch (error) {
  //     console.error('Error fetching class data:', error);
  //     setError('An error occurred while fetching class data');
  //   }
  // };
  const fetchTeachers = async () => {
    try {
      const response = await axios.get<Teacher[]>('http://localhost:3333/teachers/get');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('An error occurred while fetching teachers');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'gradeId') {
      setGradeId(parseInt(value)); // Parse as integer
    } else if (name === 'teacherId') {
      setTeacherId(parseInt(value)); // Parse as integer
    }
  };

  const handleCreateNewClass = () => {
    setShowCreateForm(true);
    setError('');
  };

  const handleManageSection = async () => {
    setShowCreateForm(false);
    try {
      const response = await axios.get<SectionData[]>('http://localhost:3333/section/manage');
      setClassData(response.data);
    } catch (error) {
      console.error('Error fetching class data:', error);
      setError('An error occurred while fetching class data');
    }
  };

  const handleSubmit = async () => {
    if (!section || !gradeId || !teacherId) {
      setError('Please fill in all the fields');
      return;
    }

    try {
      await axios.post('http://localhost:3333/section/add', { name: section, gradeId, teacherId });
      setSection('');
      setGradeId('');
      setTeacherId('');
      setError('');
      handleManageSection();
    } catch (error) {
      console.error('Error registering section:', error);
      setError('An error occurred while registering the section');
    }
  };

  return (
    <div className="w-full p-8 mt-8 text-center">
      <div className="w-full flex flex-wrap gap-4 mb-4">
        <button className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md" onClick={handleManageSection}>
          Manage Section
        </button>
        <button className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md" onClick={handleCreateNewClass}>
          Create New Section
        </button>
      </div>
      {showCreateForm && (
        <div className="w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={gradeId}
            onChange={handleChange}
            name="gradeId"
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.grade}
              </option>
            ))}
          </select>
          <select
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={teacherId}
            onChange={handleChange}
            name="teacherId"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      )}
      {!showCreateForm && (
        <div className="mt-8 w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Section Name</th>
                <th className="py-2 px-4 border-b">Grade</th>
                <th className="py-2 px-4 border-b">Teacher</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
  {classData.map((section) => (
    <tr key={section.id}>
      <td className="py-2 px-4 border-b">{section.id}</td>
      <td className="py-2 px-4 border-b">{section.name}</td>
      <td className="py-2 px-4 border-b">{section.gradeId}</td>
      <td className="py-2 px-4 border-b">
        {section.teacher?.map((teacherInfo, index) => (
          <span key={index}>
            {teacherInfo.user.frist_name} {teacherInfo.user.middle_name} , 
          </span>
        ))}
      </td>
      <td className="py-2 px-4 border-b"></td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default SectionComponent;
