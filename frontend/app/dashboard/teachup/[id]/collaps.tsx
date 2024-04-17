'use client'
import React, { useState } from 'react';

const Table = () => {
  // Sample data for grades, sections, and subjects
  const grades = ['Grade 1', 'Grade 2', 'Grade 3'];
  const sections = ['Section A', 'Section B', 'Section C'];
  const subjects = ['Math', 'Science', 'English'];

  // Sample data for table rows
  const rows = [
    { id: 1, grade: 'Grade 1', section: 'Section A', subject: 'Math' },
    { id: 2, grade: 'Grade 2', section: 'Section B', subject: 'Science' },
    { id: 3, grade: 'Grade 3', section: 'Section C', subject: 'English' },
  ];

  // State to manage selected values for each row
  const [selectedRows, setSelectedRows] = useState(rows);

  // Function to handle changes in selected grade for a row
  const handleGradeChange = (index, value) => {
    const updatedRows = [...selectedRows];
    updatedRows[index].grade = value;
    setSelectedRows(updatedRows);
  };

  // Function to handle changes in selected section for a row
  const handleSectionChange = (index, value) => {
    const updatedRows = [...selectedRows];
    updatedRows[index].section = value;
    setSelectedRows(updatedRows);
  };

  // Function to handle changes in selected subject for a row
  const handleSubjectChange = (index, value) => {
    const updatedRows = [...selectedRows];
    updatedRows[index].subject = value;
    setSelectedRows(updatedRows);
  };

  // Function to update a row
  const handleUpdate = (index) => {
    // Implement update logic here
    console.log('Update row:', selectedRows[index]);
  };

  // Function to remove a row
  const handleRemove = (index) => {
    // Implement remove logic here
    const updatedRows = selectedRows.filter((row, i) => i !== index);
    setSelectedRows(updatedRows);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {selectedRows.map((row, index) => (
            <tr key={row.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={row.grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  className="focus:outline-none"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={row.section}
                  onChange={(e) => handleSectionChange(index, e.target.value)}
                  className="focus:outline-none"
                >
                  {sections.map((section) => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={row.subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  className="focus:outline-none"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => handleUpdate(index)} className="text-indigo-600 hover:text-indigo-900 mr-2">Update</button>
                <button onClick={() => handleRemove(index)} className="text-red-600 hover:text-red-900">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
