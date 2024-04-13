import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  gridClasses,
} from "@mui/x-data-grid";
import { grey, red } from "@mui/material/colors";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForAll({ teacherView }) {
  const [pageSize, setPageSize] = useState(5);

  const row = teacherView.map((teach) => ({
    first_name: teach.user.frist_name,
    middle_name: teach.user.middle_name,
    user_Id: teach.user_Id,
    overallrank: teach.overallrank,
    overallScore: teach.overallScore,
    firstrank: teach.firstrank,
    firstScore: teach.firstScore,
    secondtrank: teach.secondtrank,
    secondScore: teach.secondScore,
  }));

  const columns = useMemo(
    () => [
      { field: "user_Id", headerName: "ID", width: 100 },
      { field: "first_name", headerName: "First Name", width: 150 },
      { field: "middle_name", headerName: "Middle Name", width: 150 },
      { field: "firstScore", headerName: "Semester I Total", width: 150 },
      { field: "firstrank", headerName: "Semester I Rank", width: 150 },
      { field: "secondScore", headerName: "Semester II total", width: 150 },
      { field: "secondtrank", headerName: "Semester II Rank", width: 150 },
      { field: "overallScore", headerName: "Total Score", width: 150 },
      { field: "overallrank", headerName: "Rank", width: 150 },
    ],
    []
  );

  return (
    <div className="flex justify-center items-center  mt-5 w-full  ">
      <div className=" w-[60%]">
        {
          <DataGrid
            rows={row}
            getRowId={(row) => row.user_Id}
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
            slots={{ toolbar: GridToolbar }}>
            {" "}
          </DataGrid>
        }
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
  );
}

export default ForAll;
