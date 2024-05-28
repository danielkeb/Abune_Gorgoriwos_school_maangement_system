import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './class.module.css';
import error from 'next/error';
import { AppContext } from '@/components/context/UserContext';

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
  const {decodedToken} =React.useContext(AppContext);

  // Handle change in class type select
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(event.target.value as ClassType);
  };



  // Handle form submission
  const handleSubmit = async () => {
    if (!grade || !classType) {
      toast.error('Please fill in all the fields');
      return;
    }

    try {
     
        await axios.post(`http://localhost:3333/grade/add/${decodedToken.school_Id}`, { grade, classType });
        toast.success('Add successful');
      
  
    } catch (error) {
      console.error('Error registering grade:', error);
      toast.error('An error occurred while registering the grade');
    }
  };


  return (
    <div className="w-full p-8 mt-3 text-center">
    

  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
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
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md ml-2"
                  >
                    Register
                  </button>
                  <button
                    
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

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default ClassForm;
