import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IconButton, TablePagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';
import { AppContext } from '@/components/context/UserContext';

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
  gradeId: number;
  gradelevel: Grade;
  teacher: Teacher[];
  teacherId: number;
}

const SectionUpdate = () => {
  const [sectionName, setSectionName] = useState('');
  const [gradeId, setGradeId] = useState<number | ''>('');
  const [teacherId, setTeacherId] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [classData, setClassData] = useState<SectionData[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { decodedToken } = React.useContext(AppContext);

  useEffect(() => {
    fetchGrades();
    fetchTeachers();
    fetchClassData();
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popupRef.current && !popupRef.current.contains(target)) {
        setShowUpdateForm(false);
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
        teacherId,
      });
      fetchClassData();
      setError('');
      toast.success('Section updated successfully');
      setSelectedSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
      setError('An error occurred while updating the section');
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    setShowModalDelete(true);
    setSelectedSection(classData.find((section) => section.id === sectionId) || null);
  };

  const confirmDelete = () => {
    if (!selectedSection) {
      console.error('Selected section is null');
      return;
    }
    axios
      .delete(`http://localhost:3333/section/delete/${selectedSection.id}`)
      .then(() => {
        fetchClassData();
        toast.success('Section deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting section:', error);
        setError('An error occurred while deleting the section');
      })
      .finally(() => {
        setShowModalDelete(false);
      });
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
      setGradeId(value === '' ? '' : parseInt(value, 10) || ''); // Convert value to number or empty string
    } else if (name === 'teacherId') {
      setTeacherId(value === '' ? '' : parseInt(value, 10) || ''); // Convert value to number or empty string
    }
  };

  const handleEdit = (sectionId?: number) => {
    const sectionToEdit = classData.find((section) => section.id === sectionId);
    if (sectionToEdit) {
      setSectionName(sectionToEdit.name);
      setGradeId(sectionToEdit.gradeId);
      setTeacherId(sectionToEdit.teacherId);
      setSelectedSection(sectionToEdit);

      setShowUpdateForm(true);
    }
  };

  const handleManageSection = () => {
    setShowUpdateForm(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full p-8 text-center">
  {showUpdateForm && selectedSection && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" ref={popupRef}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 text-center font-medium text-gray-900 mb-4">Update Section</h3>
                <div className="mt-2 mx-auto max-w-md">
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-md mb-4 block" placeholder="Section" value={sectionName} onChange={(e) => setSectionName(e.target.value)} />
                  <select className="w-full p-3 border border-gray-300 rounded-md mb-4" value={gradeId} onChange={(e) => setGradeId(parseInt(e.target.value))} name="gradeId">
                    <option value="">{selectedSection.gradelevel.grade}</option>
                    {grades.map((grade) => (
                      <option key={grade.id} value={grade.id}>{grade.grade}</option>
                    ))}
                  </select>
                  <select className="w-full p-3 border border-gray-300 rounded-md mb-4" value={teacherId} onChange={(e) => setTeacherId(parseInt(e.target.value))} name="teacherId">
                    <option value="">{selectedSection.teacher.length > 0 ? `${selectedSection.teacher[0].user.frist_name} ${selectedSection.teacher[0].user.last_name}` : 'Teacher not assigned'}</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>{teacher.frist_name} {teacher.last_name}</option>
                    ))}
                  </select>
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                    <button className="bg-green-700 hover:bg-green-500 text-white  py-2 px-4 rounded" onClick={handleUpdateSection}>
                       Update
                    </button>
                    <button onClick={handleManageSection} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

  <div className="mt-4 w-full sm:w-4/5 mx-auto bg-white boxshadow p-6 overflow-x-auto">
    <table className="min-w-full h-auto border-collapse border border-gray-300">
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th className="p-4 text-center">ID</th>
          <th className="p-4 text-center">Section Name</th>
          <th className="p-4 text-center">Grade</th>
          <th className="p-4 text-center">Teacher(s)</th>
          <th className="p-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {classData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((section, sectionIndex) => (
          <tr key={section.id} className={sectionIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="p-4 border-b">{section.id}</td>
            <td className="p-4 border-b">{section.name}</td>
            <td className="p-4 border-b">{section.gradelevel?.grade}</td>
            <td className="p-4 border-b">
              {section.teacher.length > 0 ? section.teacher.map((teacher, teacherIndex) => (
                <span key={teacherIndex}>{teacher.user.frist_name} {teacher.user.last_name}{teacherIndex < section.teacher.length - 1 ? ', ' : ''}</span>
              )) : 'Teacher not assigned'}
            </td>
            <td className="p-4 border-b">
              <button className="text-gray-700" onClick={() => handleEdit(section.id)}><EditIcon/></button>
              <button className="text-gray-700" onClick={() => handleDeleteSection(section.id)}><DeleteIcon/></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={classData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </div>

  {showModalDelete && selectedSection && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10">
        <p className="mb-4 text-xl">Are you sure you want to delete this section?</p>
        <div className="flex justify-end">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded" onClick={() => setShowModalDelete(false)}>Cancel</button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={confirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  )}

  <ToastContainer position="bottom-right" />
</div>


  );
};

export default SectionUpdate;
