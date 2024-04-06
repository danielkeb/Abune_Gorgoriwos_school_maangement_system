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
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import axios from "axios";
interface TeacherView {
  user: {
    frist_name: string;
    middle_name: string;
  };
  user_Id: number;
  overallScore: number;
  overallrank: number;
  gradeId: number;
  sectionId: number;
}
interface Props {
  teacherView: TeacherView[];
  searchId2: number;
  selectedSection2: number;
}
function ForAll({ teacherView, searchId2, selectedSection2 }: Props) {
  const [pageSize, setPageSize] = useState(5);
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const row = teacherView.map((teach) => ({
    first_name: teach.user.frist_name,
    middle_name: teach.user.middle_name,
    user_Id: teach.user_Id,
    overallrank: teach.overallrank,
    overallScore: teach.overallScore,
  }));
  const tobeSent = teacherView.map((teach) => ({
    user_Id: teach.user_Id,
    gradeId: searchId2,
    sectionId: selectedSection2,
  }));

  const handleSubmit = async () => {
    try {
      setCheck(true);

      const res = await axios.post(
        "http://localhost:3333/students/promote",
        tobeSent
      );
      toast.success("Promotion Completed");
    } catch (error) {
      console.log(error);
    }

    setCheck(false);
  };
  const handleSubject = async () => {
    try {
      setCheck2(true);

      const res = await axios.post(
        "http://localhost:3333/students/promoteSubjects",
        tobeSent
      );
      toast.success("Subject Assigned");
    } catch (error) {
      console.log(error);
    }

    setCheck2(false);
  };

//promoteSubjects
  const columns = useMemo(
    () => [
      { field: "user_Id", headerName: "ID", width: 100 },
      { field: "first_name", headerName: "First Name", width: 150 },
      { field: "middle_name", headerName: "Middle Name", width: 150 },
      { field: "overallScore", headerName: "Total Score", width: 150 },
      { field: "overallrank", headerName: "Rank", width: 150 },
      {
        field: "Status",
        headerName: "Status",
        width: 150,
        renderCell: (params: any) => {
          const overallScore = params.row.overallScore;
          const status = overallScore >= 50 ? "Passed" : "Failed";
          const color = overallScore >= 50 ? "green" : "red";
          const icon =
            overallScore >= 50 ? (
              <NorthIcon style={{ color }} />
            ) : (
              <SouthIcon style={{ color }} />
            );
          return (
            <>
              {icon}
              <span style={{ color, marginLeft: icon ? "0.5rem" : 0 }}>
                {status}
              </span>
            </>
          );
        },
      },
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
            slots={{ toolbar: GridToolbar }}></DataGrid>
        }
        <br />
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-center">
          <button
            disabled={teacherView[0]?.overallScore == null}
            className="bg-green-500 text-white active:bg-green-800 text-xs font-bold uppercase px-3 p-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSubmit}>
            {check ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                Promotting ...
              </>
            ) : (
              " Promote Students"
            )}
          </button>

          <button
           
            className="bg-green-500 text-white active:bg-green-800 text-xs font-bold uppercase px-3 p-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSubject}
            >
            {check2 ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                Assigning ...
              </>
            ) : (
              " Assign Subjects"
            )}
          </button>
        </div>
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
