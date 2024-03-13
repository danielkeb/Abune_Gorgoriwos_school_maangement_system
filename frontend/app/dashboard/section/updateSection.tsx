import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  gradeId: string;
  teacherId: string;
}

const UpdateSection = () => {
    const [subject, setSubject] = useState('');
    const [gradeId, setGradeId] = useState<number | null>(null);
    const [teacherId, setTeacherId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<SectionData | null>(null);

  useEffect(() => {
  }, []);

  

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
      await axios.patch(`http://localhost:3333/section/update/${selectedSubject.id}`, {
        name: selectedSubject.name,
        gradeId: selectedSubject.gradeId,
        teacherId: selectedSubject.teacherId
      });
      setError('');
    } catch (error) {
      console.error('Error updating subject:', error);
      setError('An error occurred while updating the subject');
    }
  };

  return (
    <div className="w-full p-8 mt-8 text-center">
      <div className="w-full flex flex-wrap gap-4 mb-4">
        <button className="bg-blue-50 hover:bg-blue-100 text-green-900 font-semibold py-2 px-4 rounded-md" onClick={handleManageSection}>
          update Section
        </button>
      </div>
      {showCreateForm && (
        <div className="w-full max-w-md">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 block"
            placeholder="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
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
                {teacher.first_name} {teacher.last_name}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="bg-green-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-md w-full"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      )}
     
    </div>
  );
};

export default UpdateSection;
