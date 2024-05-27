import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';
import { AppContext } from '@/components/context/UserContext';

interface Teacher {
  id: number;
  frist_name: string;
  last_name: string;
}

interface Grade {
  id: number;
  grade: string;
}

interface SectionData {
  id: number;
  name: string;
  gradeId: number;
  gradelevel: Grade;
  teacher: Teacher[];
  teacherId: number;
}

const SectionComponent = () => {
  const [sectionName, setSectionName] = useState('');
  const [gradeId, setGradeId] = useState<number | ''>('');
  const [teacherId, setTeacherId] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classData, setClassData] = useState<SectionData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const { decodedToken } = React.useContext(AppContext);

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
    fetchClassData();
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        setShowCreateForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await axios.get<Grade[]>(`http://localhost:3333/grade/get/${decodedToken.school_Id}`);
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setError('An error occurred while fetching grades');
    }
  };

  const fetchClassData = async () => {
    try {
      const response = await axios.get<SectionData[]>(`http://localhost:3333/section/manage/${decodedToken.school_Id}`);
      setClassData(response.data);
    } catch (error) {
      console.error('Error fetching class data:', error);
      setError('An error occurred while fetching class data');
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get<Teacher[]>(`http://localhost:3333/teachers/get/${decodedToken.school_Id}`);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('An error occurred while fetching teachers');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'gradeId') {
      setGradeId(value === '' ? '' : parseInt(value, 10) || '');
    } else if (name === 'teacherId') {
      setTeacherId(value === '' ? '' : parseInt(value, 10) || '');
    }
  };

  const handleSubmit = async () => {
    if (!sectionName || !gradeId) {
      setError('Please fill in all the fields');
      return;
    }
    if (!sectionName || !isNaN(sectionName)) {
      setError('Section name must be a non-integer string.');
      return;
    }
  
    try {
    const response=  await axios.post(`http://localhost:3333/section/add/${decodedToken.school_Id}`, { name: sectionName, gradeId });
    toast.success("Section added successfully");
    setSectionName('');
      setGradeId('');
      setError('');
      fetchClassData();
      
    } catch (error) {
        toast.error('Section already exists');
      
    }
  };

  return (
    <div className="w-full p-8 mt-8 text-center">
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative z-10 bg-white rounded-lg max-w-md w-full p-8" ref={popupRef}>
            <h3 className="text-lg leading-6 text-center font-medium text-gray-900 mb-4">Create New Section</h3>
            <div className="mt-2 mx-auto max-w-md">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                placeholder="Section"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
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
              {/* <select
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                value={teacherId}
                onChange={handleChange}
                name="teacherId"
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.frist_name} {teacher.last_name}
                  </option>
                ))}
              </select> */}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
                onClick={handleSubmit}
              >
                <SendIcon sx={{ marginRight: 1 }}  />
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SectionComponent;
