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

function ForSemesterTwo({ teacherView }) {
  const [pageSize, setPageSize] = useState(5);

  const row = teacherView.map((teach) => ({
    first_name: teach.user.frist_name,
    middle_name: teach.user.middle_name,
    user_Id: teach.user_Id,
    secondtrank: teach.secondtrank,
    secondScore: teach.secondScore,
  }));

  const columns = useMemo(
    () => [
      { field: "user_Id", headerName: "ID", width: 200 },
      { field: "first_name", headerName: "First Name", width: 200 },
      { field: "middle_name", headerName: "Middle Name", width: 200 },
      { field: "secondScore", headerName: "Total Score", width: 200 },
      { field: "secondtrank", headerName: "Rank", width: 200 },
    ],
    []
  );

  return (
    <div className=" boxshadow bg-white w-[80%] flex justify-center items-center  mt-5   ">
      <div className=" w-full p-6">
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

export default ForSemesterTwo;
