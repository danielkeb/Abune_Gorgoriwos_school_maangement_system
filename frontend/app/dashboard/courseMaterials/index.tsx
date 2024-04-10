import axios, { AxiosError } from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AppContext } from '@/components/context/UserContext';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

interface Subject {
  id: number;
  name: string;
  gradeId: number;
  teacherId: number;
}

interface GradeLevel {
  id: number;
  grade: string;
  teacher: { user_Id: number }[];
  subject: Subject[];
}

const CourseMaterials: React.FC = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
  const { decodedToken, token } = useContext(AppContext);

  useEffect(() => {
    const fetchGradeLevelsAndSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:3333/grade/get');
        const gradeLevelsData: GradeLevel[] = response.data;

        // Filter grade levels assigned to the logged-in teacher
        const teacherGradeLevels = gradeLevelsData.filter((grade: GradeLevel) =>
          grade.teacher.some(teacher => teacher.user_Id === decodedToken.sub)
        );

        // Set the filtered grade levels
        setGradeLevels(teacherGradeLevels);

        // Select the first grade level by default
        if (!selectedGrade && teacherGradeLevels.length > 0) {
          setSelectedGrade(teacherGradeLevels[0]);
        }

      } catch (error) {
        console.error('Error fetching grade levels and subjects:', error);
      }
    };

    fetchGradeLevelsAndSubjects();
  }, [decodedToken?.sub]); // Fetch again when decodedToken.sub changes

  useEffect(() => {
    // Fetch subjects assigned to the selected grade and teacher
    if (selectedGrade) {
      const teacherSubjects = selectedGrade.subject.filter((subject: Subject) =>
        subject.teacherId === decodedToken.sub && subject.gradeId === selectedGrade.id
      );
      setSubjects(teacherSubjects);
    }
  }, [selectedGrade, decodedToken?.sub]);

  const handleSubmit = async () => {
    if (!file || !description || !selectedSubject || !selectedGrade) {
      toast.error('Please fill all fields');
      return;
    }
  
    // Convert teacherId, subjectId, and gradeId to numbers
    const teacherIdNumber = parseInt(decodedToken.sub);
    const subjectIdNumber = parseInt(selectedSubject.id.toString());
    const gradeIdNumber = parseInt(selectedGrade.id.toString());
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
  
    try {
      await axios.post(`http://localhost:3333/coursematerial/?teacherId=${teacherIdNumber}&subjectId=${subjectIdNumber}&gradeId=${gradeIdNumber}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Add this header for file upload
        }
      });
      toast.success('Uploaded successfully');
  
      setFile(null);
      setDescription('');
      setSelectedSubject(null);
      setSelectedGrade(null);
    } catch (err) {
      // Error handling code
      console.error('Error uploading study material:', err);
      toast.error('Error uploading study material');
    }
  };
  
  
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  return (
    <div className="w-full p-8 mt-8 text-center">
      <div className="w-full max-w-md">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
          value={selectedGrade ? selectedGrade.id : ''}
          onChange={(e) => {
            const selectedGradeId = parseInt(e.target.value);
            const foundGrade = gradeLevels.find((grade: GradeLevel) => grade.id === selectedGradeId);
            setSelectedGrade(foundGrade || null);
          }}
        >
          <option value="">Select Grade</option>
          {gradeLevels.map((grade: GradeLevel) => (
            <option key={grade.id} value={grade.id}>
              {grade.grade}
            </option>
          ))}
        </select>
        {selectedGrade && (
          <select
            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
            value={selectedSubject ? selectedSubject.id : ''}
            onChange={(e) => {
              const selectedSubjectId = parseInt(e.target.value);
              const foundSubject = subjects.find((subject: Subject) => subject.id === selectedSubjectId);
              setSelectedSubject(foundSubject || null);
            }}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject: Subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="file"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
          onChange={handleFileChange}
        />
        {/* {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>} */}
        <button
          className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
          onClick={handleSubmit}
        >
          <SendIcon sx={{ marginRight: 1 }} />
          Submit
        </button>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default CourseMaterials;
