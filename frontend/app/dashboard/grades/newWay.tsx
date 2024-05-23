import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef , GridToolbar, gridClasses} from '@mui/x-data-grid';
import { grey, red } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';
import UsersActions from './UserActions';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewWay = ({teacherView,gradeId,subjectId,selectedSection,semester}) => {
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize]= useState(5)
 
 

  var notVisible={}
   const firstSemester={
    test1:false,
    assignmentScore1:false,
    midtermScore1:false,
    finalExamScore1:false,
    totalScore1:false
   }
   const secondSemester={
    test2:false,
    assignmentScore2:false,
    midtermScore2:false,
    finalExamScore2:false,
    totalScore2:false
   }

   if(semester==1){
     notVisible=secondSemester
   }else if(semester==2){
    notVisible=firstSemester
   }

      
   const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'studentId', headerName: 'Stud_ID', width: 150 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { 
      field: 'test1', 
      headerName: 'Test(10%)', 
      width: 150, 
      type: 'number', 
      editable: true, 
      valueParser: (value) => parseFloat(value) || 0 
    },
    { 
      field: 'assignmentScore1', 
      headerName: 'assignement(15%)', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'midtermScore1', 
      headerName: 'mid-exam(25%)', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    {
      field: 'finalExamScore1',
      headerName: 'final(50%)',
      width: 150,
      type: 'number',
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'totalScore1', 
      headerName: 'Total', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'test2', 
      headerName: 'Test(10%)', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'assignmentScore2', 
      headerName: 'assignement(15%)', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'midtermScore2', 
      headerName: 'mid-exam(25%)', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    {
      field: 'finalExamScore2',
      headerName: 'final(50%)',
      width: 150,
      type: 'number',
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    { 
      field: 'totalScore2', 
      headerName: 'Total', 
      width: 150, 
      type: 'number', 
      editable: true,
      valueParser: (value) => parseFloat(value) || 0
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <UsersActions {...{ params, rowId, setRowId, gradeId, subjectId, selectedSection, semester }} />
      ),
    },
  ], [rowId]);
  
  return (
    <div className='  bg-white box boxshadow w-[80%] justify-center mt-5   p-4'>
       <div style={{  width: '100%' }}>
      <DataGrid rows={teacherView} getRowId={row=>row.id} columns={columns}  
            initialState={{
              
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5,25,50]}
            columnVisibilityModel={notVisible}
          getRowSpacing={params=>(
            {
              top:params.isFirstVisible?0:5,
              bottom:params.isLastVisible?0:5
            }
           )}
      
      sx={{
        [`& .${gridClasses.row}`]:{
           
            bgcolor:theme=>theme.palette.mode == 'light'? grey[200]: grey[900]
        }
      }}
      slots={{ toolbar: GridToolbar }}     onCellKeyDown={(params) => setRowId(params.id)}
      onCellEditStart={(params) => setRowId(params.id)}> </DataGrid>
    </div>
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}



export default NewWay