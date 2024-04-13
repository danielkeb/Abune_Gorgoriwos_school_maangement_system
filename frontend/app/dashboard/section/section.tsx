import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';

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
  const [classData, setClassData] = useState<SectionData[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showManageForm, setShowManageForm] = useState(true);
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showUpdateForm, setshowUpdateForm] = useState(false);

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
    fetchClassData();
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

  const fetchClassData = async () => {
    try {
      const response = await axios.get<SectionData[]>('http://localhost:3333/section/manage');
      setClassData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching class data:', error);
      setError('An error occurred while fetching class data');
    }
  };

  const handleUpdateSection = async () => {
    if (!selectedSection) {
      setError('Please select a section to update.');
      return;
    }
    
    // Check if there are changes in sectionName, gradeId, or teacherId
    if (
      sectionName === selectedSection.name &&
      gradeId === selectedSection.gradeId &&
      teacherId === selectedSection.teacherId
    ) {
      setError('');
      return;
    }
  
    // Check for empty fields if there are changes
    if (!sectionName || !gradeId || !teacherId) {
      setError('Please fill in all the fields to update the section.');
      return;
    }
  
    try {
      await axios.patch(`http://localhost:3333/section/update/${selectedSection.id}`, {
        name: sectionName,
        gradeId,
        teacherId
      });
      fetchClassData();
      setError('');
      toast.success('Section updated successfully');
      setShowCreateForm(false);
      setShowManageForm(false);
      setSelectedSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
      setError('An error occurred while updating the section');
    }
  };
  
  const handleDeleteSection = async (sectionId: number) => {
    setShowModalDelete(true);
    setSelectedSection(classData.find(section => section.id === sectionId) || null);
  };

  const confirmDelete = () => {
    if (!selectedSection) {
      console.error('Selected section is null');
      return;
    }
    axios.delete(`http://localhost:3333/section/delete/${selectedSection.id}`)
      .then(() => {
        fetchClassData();
        toast.success('Section deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting section:', error);
        setError('An error occurred while deleting the section');
      })
      .finally(() => {
        setShowModalDelete(false);
      });
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
      setGradeId(value === '' ? '' : parseInt(value, 10) || ''); // Convert value to number or empty string
    } else if (name === 'teacherId') {
      setTeacherId(value === '' ? '' : parseInt(value, 10) || ''); // Convert value to number or empty string
    }
  };
  

  const handleCreateNewClass = () => {
    setShowCreateForm(true);
    setShowManageForm(true);
    setshowUpdateForm(false);
    setError('');
  };

  const handleEdit = (sectionId?: number) => {
    const sectionToEdit = classData.find(section => section.id === sectionId);
    if (sectionToEdit) {
      setSectionName(sectionToEdit.name);
      setGradeId(sectionToEdit.gradeId);
      setTeacherId(sectionToEdit.teacherId);
      setSelectedSection(sectionToEdit);

      setshowUpdateForm(true);
      setShowCreateForm(false);
      setShowManageForm(true);
    }
  };
const handleManageSection=() => {
  setShowCreateForm(false);
  setShowManageForm(false);
  setshowUpdateForm(false);
}
  const handleSubmit = async () => {
    if (!sectionName || !gradeId || !teacherId) {
      setError('Please fill in all the fields');
      return;
    }

  

    try {
      if (selectedSection) {
        setShowCreateForm(false);
        setShowManageForm(false);
        setshowUpdateForm(true);
        await handleUpdateSection();
      } else {
        await axios.post('http://localhost:3333/section/add', { name: sectionName, gradeId, teacherId });
        setSectionName('');
        setGradeId('');
        setTeacherId('');
        setError('');
        fetchClassData();
        toast.success("Section added successfully");
      }
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
          <select
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
          </select>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
            onClick={handleSubmit}
          >
            <SendIcon sx={{ marginRight: 1 }} /> {/* Adjusting margin for icon alignment */}
            Submit
          </button>
        </div>
      )}
   {showUpdateForm && selectedSection && (
  <div className="w-full max-w-md">
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
      onChange={(e) => setGradeId(parseInt(e.target.value))}
      name="gradeId"
    >
      <option value="">{selectedSection.gradelevel.grade}</option>
      {grades.map((grade) => (
        <option key={grade.id} value={grade.id}>
          {grade.grade}
        </option>
      ))}
    </select>
    <select
      className="w-full p-3 border border-gray-300 rounded-md mb-4"
      value={teacherId}
      onChange={(e)=>setTeacherId(parseInt(e.target.value))}
      name="teacherId"
    >
      <option value="">
        {selectedSection.teacher[0].user.frist_name} {selectedSection.teacher[0].user.last_name}
      </option>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.frist_name} {teacher.last_name}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <button
      className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
      onClick={handleSubmit}
    >
      <SendIcon sx={{ marginRight: 1 }} /> {/* Adjusting margin for icon alignment */}
      Update
    </button>
  </div>
)}

      {!showManageForm && (
        <div className="mt-8 w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Section Name</th>
                <th className="py-2 px-4 border-b">Grade</th>
                <th className="py-2 px-4 border-b">Teacher(s)</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((section) => (
                section.teacher.map((teacher, teacherIndex) => (
                  <tr key={`${section.id}-teacher-${teacherIndex}`}>
                    <td className="py-2 px-4 border-b">{section.id}</td>
                    <td className="py-2 px-4 border-b">{section.name}</td>
                    <td className="py-2 px-4 border-b">{section.gradelevel?.grade}</td>
                    <td className="py-2 px-4 border-b">
                      {`${teacher.user.frist_name} ${teacher.user.last_name}`}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <IconButton color="primary" size="small" onClick={() => handleEdit(section.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" size="small" onClick={() => handleDeleteSection(section.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModalDelete && selectedSection && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-10">
            <p className="mb-4 text-xl">Are you sure you want to delete this section?</p>
            <div className="flex justify-end">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded" onClick={() => setShowModalDelete(false)}>
                Cancel
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={confirmDelete}>
                Delete
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
