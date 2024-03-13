import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  user: { first_name: string; last_name: string; id: number };
}

interface Grade {
  id: number;
  grade: string;
}

interface SubjectData {
  id: number;
  name: string;
  gradeId: number;
  gradelevel: {
    id: number;
    grade: string;
    teacher: Teacher[];
  };
  teacherId?: number;
}

const SubjectComponent = () => {
  const [subject, setSubject] = useState('');
  const [gradeId, setGradeId] = useState<number | null>(null);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [classData, setClassData] = useState<SubjectData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false); 
  // Flag to display update form

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
    handleManageSubject();
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
      setGradeId(value === '' ? null : parseInt(value) || null); // Parse as integer if not empty string
      setTeacherId(null); // Reset teacherId when grade changes
    } else if (name === 'teacherId') {
      setTeacherId(value === '' ? null : parseInt(value) || null); // Parse as integer if not empty string
    }
  };

  const handleCreateNewClass = () => {
    setShowCreateForm(true);
    setShowUpdateForm(false); // Hide update form when creating a new subject
    setError('');
  };

  const handleManageSubject = async (subjectId?: number) => {
    setShowCreateForm(false);
        //setShowCreateForm(!subjectId); // Show create form if no subjectId is provided
        //setShowUpdateForm(!!subjectId);
    setShowUpdateForm(false); // Hide update form when managing subjects
    try {
      let response;
      if (subjectId) {
        response = await axios.get<SubjectData>(`http://localhost:3333/subjects/get/${subjectId}`);
        setSelectedSubject(response.data);
        // Set showUpdateForm to true when fetching data for a specific subject
        setShowCreateForm(false);
        setShowUpdateForm(true);
      } else {
        response = await axios.get<SubjectData[]>('http://localhost:3333/subjects/get');
        setClassData(response.data);
      }
      setError('');
    } catch (error) {
      console.error('Error fetching class data:', error);
      setError('An error occurred while fetching class data');
    }
  };
  

  const handleUpdateSubject = async () => {
    setShowCreateForm(false);
    if (!selectedSubject) {
      setError('Please select a subject to update.');
      return;
    }
    if (!selectedSubject.name || !selectedSubject.gradeId || !selectedSubject.teacherId) {
      setError('Please fill in all the fields to update the subject.');
      return;
    }
    try {
      console.log('hjfgjkfdh error det');
      await axios.patch(`http://localhost:3333/subjects/update/${selectedSubject.id}`, {
        name: selectedSubject.name,
        gradeId: selectedSubject.gradeId,
        teacherId: selectedSubject.teacherId
      });
      handleManageSubject();
      setError('');
    } catch (error) {
      console.error('Error updating subject:', error);
      setError('An error occurred while updating the subject');
    }
  };
  const handleSubmit = async () => {
    if (!subject || !gradeId || !teacherId) {
      setError('Please fill in all the fields');
      return;
    }

    try {
      await axios.post('http://localhost:3333/subjects/add', { name: subject, gradeId, teacherId });
      setSubject('');
      setGradeId(null);
      setTeacherId(null);
      setError('');
      handleManageSubject();
    } catch (error) {
      console.error('Error registering subject:', error);
      setError('An error occurred while registering the subject');
    }
  };

  return (
    <div className="w-full  p-8 mt-8 text-center">
      <div className="w-full flex flex-wrap gap-4 mb-4">
        <button
          className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md"
          onClick={() => handleManageSubject()}
        >
          Manage Subject
        </button>
        <button
          className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md"
          onClick={handleCreateNewClass}
        >
          Create New Subject
        </button>
      </div>
      {showCreateForm && (
        <div className="w-full max-w-md">
          {/* Create new subject form */}
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={gradeId || ''}
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
          {gradeId !== null && (
            <select
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
              value={teacherId || ''}
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
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="bg-green-500 hover:bg-blue-100 text-white font-semibold py-2 px-4 rounded-md w-full"
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
                <th className="py-2 px-4 border-b">Subject Name</th>
                <th className="py-2 px-4 border-b">Grade</th>
                <th className="py-2 px-4 border-b">Teacher</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((subject) => (
                <tr key={subject.id}>
                  <td className="py-2 px-4 border-b">{subject.id}</td>
                  <td className="py-2 px-4 border-b">{subject.name}</td>
                  <td className="py-2 px-4 border-b">{subject.gradelevel?.grade}</td>
                  <td className="py-2 px-4 border-b">
                    {subject.teacherId ? (
                      <span>
                        {subject.gradelevel?.teacher?.find(teacher => teacher.user.id === (subject.teacherId || 0))?.user.first_name}{' '}
                        {subject.gradelevel?.teacher?.find(teacher => teacher.user.id === (subject.teacherId || 0))?.user.last_name}
                      </span>
                    ) : (
                      <span>No teacher assigned</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleManageSubject(subject.id)}
                      className="bg-green-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Display update form for the selected subject */}
      {showUpdateForm && selectedSubject && (
        <div className="w-full max-w-md mt-8">
          {/* Update subject form */}
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
            placeholder="Subject"
            value={selectedSubject.name}
            onChange={(e) =>
              setSelectedSubject({
                ...selectedSubject,
                name: e.target.value,
              })
            }
          />
  {/* <select
  className="w-full p-3 border border-gray-300 rounded-md mb-4"
  value={selectedSubject.gradeId}
  disabled
>
  <option value="">Select Grade</option>
  {grades.map((grade) => (
    <option key={grade.id} value={grade.id}>
      {grade.grade}
    </option>
  ))}
</select> */}
<select
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={selectedSubject.gradeId}
            disabled
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
            value={selectedSubject.teacherId}
            onChange={(e) =>
              setSelectedSubject({
                ...selectedSubject,
                teacherId: parseInt(e.target.value),
              })
            }
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
            onClick={handleUpdateSubject}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectComponent;
