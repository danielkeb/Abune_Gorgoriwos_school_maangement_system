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
        const response = await axios.get(`http://localhost:3333/grade/get/${decodedToken.school_Id}`);
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
    const schoolIdNumber = parseInt(decodedToken.school_Id);

    const subjectIdNumber = parseInt(selectedSubject.id.toString());
    const gradeIdNumber = parseInt(selectedGrade.id.toString());
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
  
    try {
      await axios.post(`http://localhost:3333/coursematerial/?teacherId=${teacherIdNumber}&subjectId=${subjectIdNumber}&gradeId=${gradeIdNumber}&schoolId=${schoolIdNumber}`, formData, {
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
    <div className="boxshadow flex flex-col w-[70%] justify-center items-center p-16 mt-8 text-center ">
                <div className='text-lg w-full flex justify-start mb-6'>
                <h6 className="text-blueGray-400 text-sm   font-bold uppercase">
                Add Your course materials here
              </h6>
        </div>
      <div className="w-full max-w-md ">

     
      <select
  className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
>
  <option value="">Select an option</option>
  <option value="assignment">Assignment</option>
  <option value="textbook">Textbook</option>
  <option value="worksheet">Worksheet</option>
</select>

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
          className="w-[50%] bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          
          Upload
        </button>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default CourseMaterials;
