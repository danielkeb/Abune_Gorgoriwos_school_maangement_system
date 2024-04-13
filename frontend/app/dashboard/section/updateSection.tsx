import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

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
  teacherId: number;
  teacher: {
    id: number;
    user: {
      first_name: string;
      middle_name: string;
    };
  };
}

const SectionComponent = () => {
  const [classData, setClassData] = useState<SectionData[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState<SectionData | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const gradesResponse = await axios.get<Grade[]>('http://localhost:3333/grade/get');
      setGrades(gradesResponse.data);

      const teachersResponse = await axios.get<Teacher[]>('http://localhost:3333/teachers/get');
      setTeachers(teachersResponse.data);

      const classDataResponse = await axios.get<SectionData[]>('http://localhost:3333/section/manage');
      setClassData(classDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data');
    }
  };

  const handleUpdateSection = async (updatedSection: SectionData) => {
    try {
      await axios.patch(`http://localhost:3333/section/update/${updatedSection.id}`, updatedSection);
      fetchData();
      setError('');
      setSuccessMessage('Section updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating section:', error);
      setError('An error occurred while updating the section');
      setSuccessMessage('');
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
        fetchData();
        setSuccessMessage('Section deleted successfully');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => {
        console.error('Error deleting section:', error);
        setError('An error occurred while deleting the section');
      })
      .finally(() => {
        setShowModalDelete(false);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Section Name', width: 300, editable: true },
    {
      field: 'gradeId',
      headerName: 'Grade',
      width: 150,
      valueOptions: grades.map(grade => ({ id: grade.id, name: grade.grade })),
      type: 'singleSelect',
      editable: true,
      valueGetter: (params: any) => {
        const gradeId = params?.row?.gradeId;
        const grade = grades.find(grade => grade.id === gradeId);
        return grade ? grade.grade : 'no grade available';
      },
    },
    {
      field: 'teacherId',
      headerName: 'Teacher',
      width: 200,
      valueOptions: teachers.map(teacher => ({ id: teacher.id, name: `${teacher.first_name} ${teacher.last_name}` })),
      type: 'singleSelect',
      editable: true,
      valueGetter: (params: any) => {
        const teacherId = params?.row?.teacherId;
        const teacher = teachers.find(teacher => teacher.id === teacherId);
        return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'no teacher available';
      },
    },
    {
      field: 'actions',
      headerName: 'Action',
      type: 'actions',
      width: 150,
      getActions: (row: any) => [
        <GridActionsCellItem
          label="Update"
          onClick={() => handleUpdateSection(row)}
          showInMenu={true}
        />,
        <GridActionsCellItem
          label="Delete"
          className="text-red-500"
          onClick={() => handleDeleteSection(row.id)}
          showInMenu={true}
        />,
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl mt-12 ml-8 mb-8">Sections</h1>
      <div className="flex-1">
        <div style={{ height: '70vh', width: '100%' }}>
          <DataGrid
            rows={classData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellEditCommit={(params: { id: any; field: any; value: any; }) => {
              const { id, field, value } = params;
              if (field === 'gradeId' || field === 'teacherId') {
                const updatedSection = { ...classData.find(row => row.id === id), [field]: parseInt(value as string, 10) };
                handleUpdateSection(updatedSection);
              } else {
                const updatedSection = { ...classData.find(row => row.id === id), [field]: value };
                handleUpdateSection(updatedSection);
              }
            }}
          />
        </div>
      </div>
      {showModalDelete && selectedSection && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-10">
            <p className="mb-4 text-xl">Are you sure you want to delete this section?</p>
            <div className="flex justify-end">
              <button className="bg gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded" onClick={() => setShowModalDelete(false)}>
                Cancel
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionComponent;
