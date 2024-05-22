import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, TablePagination } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './class.module.css';
import error from 'next/error';

// Enum defining class types
enum ClassType {
  nursery = 'nursery',
  junior_primary = 'junior primary',
  senior_primary = 'senior primary',
  junior_secondary = 'junior secondary',
  senior_secondary = 'senior secondary',
}

interface GradeLevel {
  id: number;
  grade: string;
  classType: ClassType;
}

const ManageClass = () => {
  // State variables
  const [grade, setGrade] = useState('');
  const [classType, setClassType] = useState<ClassType | ''>(ClassType.nursery);
  const [classData, setClassData] = useState<GradeLevel[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle change in class type select
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(event.target.value as ClassType);
  };

  useEffect(() => {
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

  // Handle manage classes button click
  const handleManageClasses = async () => {
    setShowUpdateForm(false);
    try {
      const response = await axios.get<GradeLevel[]>('http://localhost:3333/grade/manage');
      setClassData(response.data);
    } catch (error) {
      console.error('Error fetching class data:', error);
      toast.error('An error occurred while fetching class data');
    }
  };

  // Handle edit button click
  const handleEdit = async (gradeId: number) => {
    const gradeToEdit = classData.find(grade => grade.id === gradeId);
    if (gradeToEdit) {
      setGrade(gradeToEdit.grade);
      setClassType(gradeToEdit.classType);
      setSelectedGrade(gradeToEdit);
      setShowUpdateForm(true);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!grade || !classType) {
      toast.error('Please fill in all the fields');
      return;
    }

    try {
      if (selectedGrade) {
        await axios.patch(`http://localhost:3333/grade/update/${selectedGrade.id}`, { grade, classType });
        toast.success('Update successful');
      } 
      setGrade('');
      setClassType(ClassType.nursery);
      handleManageClasses();
    } catch (error) {
      console.error('Error registering grade:', error);
      toast.error('An error occurred while registering the grade');
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-full p-8 mt-3 text-center">
      {showUpdateForm && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="justify-center">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 text-center font-medium text-gray-900 mb-4">Create New Class</h3>
              <div className="mt-2 mx-auto max-w-md">
                {/* Grade input */}
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                  placeholder="Grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
                {/* Class type select */}
                <select
                  className="w-full p-3 border border-gray-300 rounded-md mb-4"
                  value={classType}
                  onChange={handleChange}
                >
                  {Object.values(ClassType).map((type) => (
                    <option key={type} value={type} className="hover:bg-blue-300">
                      {type}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-500 mb-4">try again</p>}
                <div className=" justify-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md ml-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowUpdateForm(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


        <div className="mt-8 w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Grade ID</th>
                <th className="py-2 px-4 border-b">Grade Name</th>
                <th className="py-2 px-4 border-b">Class Type</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? classData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : classData
              ).map((gradeLevel, index) => (
                <tr key={gradeLevel.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{gradeLevel.id}</td>
                  <td className="py-2 px-4 border-b">{gradeLevel.grade}</td>
                  <td className="py-2 px-4 border-b">{gradeLevel.classType}</td>
                  <td className="py-2 px-4 border-b">
                    <IconButton color="primary" size="small" onClick={() => handleEdit(gradeLevel.id)}>
                      <EditIcon />
                    </IconButton>
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
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ManageClass;
