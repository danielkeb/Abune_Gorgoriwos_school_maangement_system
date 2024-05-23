

import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef , GridToolbar, gridClasses} from '@mui/x-data-grid';
import { grey, red } from '@mui/material/colors';
import { useEffect, useMemo, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentActions from './studentAction';

function FindStudent({teacherView,sectionToDisplay}) {
    const [rowId, setRowId] = useState(null);
    const [pageSize, setPageSize]= useState(5)

    const secc= sectionToDisplay[0]?.section.map(s=>s.name)
    const  columns= useMemo(()=> [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'first_name', headerName: 'First Name', width: 150, type:'string', editable:true },
        { field: 'middle_name', headerName: 'Middle Name', width: 150, type:'string', editable:true },
        { field: 'last_name', headerName: 'Last Name', width: 150, type:'string', editable:true },
        { field: 'email', headerName: 'Email', width: 150,type:'string', editable:true   },
        { field: 'address', headerName: 'Address', width: 150, type:'string', editable:true },
        { field: 'phone', headerName: 'Phone', width: 150 , type:'string', editable:true},
        { field: 'date_of_birth', headerName: 'Date of Birth', width: 150,type:'string', editable:true },
        { field: 'section', headerName: 'Sections',  width: 150, type:'singleSelect', valueOptions:secc, editable:true},
        { field: 'careof_contact1', headerName: 'Care Of Contact', width: 150, type:'string', editable:true },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          type: 'singleSelect',
          valueOptions: ['active', 'inactive'],
          editable: true,
          renderCell: (params) => (
            <span style={{ color: params.value === 'active' ? 'green' : 'red', textTransform: 'uppercase' }}>
              {params.value}
            </span>
          ),
        },
        

        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            renderCell: (params) => (
              <StudentActions {...{ params, rowId, setRowId }} />
            ),
          },
        // {
        //   field: 'actions',
        //   headerName: 'Actions',
        //   type: 'actions',

        // },
      ],[rowId]);


  return (
    <div className='w-[80%] p-4  boxshadow bg-white'>
    <div style={{  width: '100%' }}>
   <DataGrid rows={teacherView} getRowId={row=>row.id} columns={columns}  
         initialState={{
           
           pagination: { paginationModel: { pageSize: 5 } },
         }}
         pageSizeOptions={[5,25,50]}

       getRowSpacing={params=>(
         {
           top:params.isFirstVisible?0:5,
           bottom:params.isLastVisible?0:5
         }
        )}
        checkboxSelection
   
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

export default FindStudent
