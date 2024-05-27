"use client";
import { Box, Card, Typography, gridClasses } from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import UsersActions from "./UsersActions";
import { ToastContainer } from "react-toastify";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import { AppContext } from "@/components/context/UserContext";
import Main from "../main/Main";
function Manage() {
  const [teachers, setTeachers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const router = useRouter();
  const [imageUrl, setImageUrl] =useState('');
  const { decodedToken } = React.useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3333/auth/all_admins/`);
        setTeachers(res.data);
        // const responseImg = await axios.get(`http://localhost:3333/${res.data.user.image}`, { responseType: 'blob' });
        //     const url = URL.createObjectURL(responseImg.data);
        //     setImageUrl(url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  function openDialog(user) {
    setSelectedUser(user);
    
    setIsOpen(true);
  }

  const filteredResult = teachers.filter(teacher => teacher.id === selectedUser);
  console.log(filteredResult[0]?.frist_name)

  function closeDialog() {
    setIsOpen(false);
  }
  function sendTo(id) {
    router.push(
    `/dashboard/adminspec/${id}`,

    );
  }
 

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: "60" },
      {
        field: "image",
        headerName: "Photo",
        width: "150",
        
        renderCell: (params) => (
          <img
            src={`http://localhost:3333/${params.row?.image}`}
            alt={`${params.row.frist_name} ${params.row?.last_name}`}
            style={{ width: "50px", height: "50px", borderRadius: "25px" }}
          />
        ),
      },
      {
        
        field: "frist_name",
        headerName: "First Name",
        width: "200",
        type: "string",
        editable: true,
      },
      { field: "middle_name", headerName: "Middle Name", width: "200" },
      { field: "last_name", headerName: "Last Name", width: "200" },
      { field: "email", headerName: "Email", width: "200" },
      { field: "phone", headerName: "phone", width: "200" },
      
      

      {
        field: "edit",
        headerName: "Edit",
        type: "actions",
        renderCell: (params) => (
          <button
            className="border-none bg-transparent w-full h-full"
            onClick={() => sendTo(params.id)}>
            <EditIcon />
          </button>
        ),
      },
    ],

    [rowId]
  );

  return (
    <Main>

  
    <div className="w-full mt-6 ml-4 flex justify-center items-center ">
      <div className=" w-[80%]  bg-white boxshadow p-6">
        <DataGrid
          rows={teachers}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 25, 50]}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode == "light" ? grey[200] : grey[900],
            },
          }}
          slots={{ toolbar: GridToolbar }}
          onCellKeyDown={(params) => setRowId(params.id)}
          onCellEditStart={(params) => setRowId(params.id)}>
          {" "}
        </DataGrid>
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
    </Main>
  );
}

export default Manage;