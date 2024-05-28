import React, { useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';

const SectionUpdate = ({ selectedSection, fetchClassData }) => {
  const [sectionName, setSectionName] = useState(selectedSection.name);
  const [gradeId, setGradeId] = useState(selectedSection.gradeId);
  const [teacherId, setTeacherId] = useState(selectedSection.teacherId);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Check for empty fields
    if (!sectionName || !gradeId || !teacherId) {
      setError('Please fill in all the fields.');
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
    } catch (error) {
      console.error('Error updating section:', error);
      setError('An error occurred while updating the section');
    }
  };

  function setshowUpdateForm(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-20">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 text-center font-medium text-gray-900 mb-4">Update Section</h3>
                <div className="mt-2 mx-auto max-w-md">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
                    placeholder="Section"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                  />
                  {/* Input for gradeId */}
                  {/* Input for teacherId */}
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md"
                      onClick={handleSubmit}
                    >
                      <SendIcon sx={{ marginRight: 1 }} />
                      Update
                    </button>
                    <button
                      onClick={() => setshowUpdateForm(false)}
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
  );
};

export default SectionUpdate;
