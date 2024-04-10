import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ClassForm = () => {
  // State variables
  const [grade, setGrade] = useState('');
  const [classType, setClassType] = useState<ClassType | ''>(ClassType.nursery);
  const [classData, setClassData] = useState<GradeLevel[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);

  // Handle change in class type select
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(event.target.value as ClassType);
  };

  // Handle create new class button click
  const handleCreateNewClass = () => {
    setShowCreateForm(true);
  };

  // Handle manage classes button click
  const handleManageClasses = async () => {
    setShowCreateForm(false);
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
      setShowCreateForm(true);
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
      } else {
        await axios.post('http://localhost:3333/grade/add', { grade, classType });
        toast.success('Add successful');
      }
      setGrade('');
      setClassType(ClassType.nursery);
      handleManageClasses();
    } catch (error) {
      console.error('Error registering grade:', error);
      toast.error('An error occurred while registering the grade');
    }
  };

  return (
    <div className="w-full p-8 mt-8 text-center">
      {/* Manage class and section buttons */}
      <div className="w-full flex flex-wrap gap-4 mb-4">
        <button className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md" onClick={handleManageClasses}>
          Manage Classes
        </button>
        <button className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md" onClick={handleCreateNewClass}>
          Create New Class
        </button>
      </div>

      {/* Conditional rendering for create new class form */}
      {showCreateForm && (
        <div className="w-full max-w-md">
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
          {/* Register button */}
          <button
            className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      )}

      {/* Conditional rendering for manage classes information */}
      {!showCreateForm && (
        <div className="mt-8 w-full">
          {/* Table content */}
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
              {classData.map((gradeLevel) => (
                <tr key={gradeLevel.id}>
                  <td className="py-2 px-4 border-b">{gradeLevel.id}</td>
                  <td className="py-2 px-4 border-b">{gradeLevel.grade}</td>
                  <td className="py-2 px-4 border-b">{gradeLevel.classType}</td>
                  <td className="py-2 px-4 border-b">
                    <IconButton color="primary" size="small" onClick={() => handleEdit(gradeLevel.id)}>
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton color="secondary" size="small" onClick={() => handleDelete(gradeLevel.id)}>
                      <DeleteIcon />
                    </IconButton> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer
        position="bottom-right"/>
    </div>
  );
};

export default ClassForm;
