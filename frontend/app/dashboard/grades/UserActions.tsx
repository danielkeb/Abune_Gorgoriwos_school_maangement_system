import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/context/UserContext";

const UsersActions = ({
  params,
  rowId,
  setRowId,
  gradeId,
  subjectId,
  selectedSection,
  semester
}) => {
  const { decodedToken } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log("cocococ", params.id, rowId);
  const handleSubmit = async () => {
    try {
      setLoading(true);
  
      const {
        id,
        studentId,
        gradeLevelId,
        subjectId,
        teacherId,
        test1,
        midtermScore1,
        assignmentScore1,
        finalExamScore1,
        totalScore1,
        test2,
        midtermScore2,
        assignmentScore2,
        finalExamScore2,
        totalScore2,
      } = params.row;
  
      const commonData = {
        studentId: studentId,
        gradeLevelId: gradeLevelId,
        teacherId: teacherId,
        subjectId: subjectId,
      };
  
      let tobeSent = {};
  
      if (semester === 1) {
        tobeSent = {
          ...commonData,
          test1,
          midtermScore1,
          assignmentScore1,
          finalExamScore1,
          totalScore1,
        };
      } else if (semester === 2) {
        tobeSent = {
          ...commonData,
          test2,
          midtermScore2,
          assignmentScore2,
          finalExamScore2,
          totalScore2,
        };
      }
  
      const url = `http://localhost:3333/result/update/${parseInt(id)}/${decodedToken?.sub}/${gradeId}/${selectedSection}/${subjectId}`;
  
      const res = await axios.patch(url, tobeSent);
  
      if (res.data.msg) {
        setSuccess(true);
        setRowId(null);
        toast.success("Record Updated :)");
      }
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <div
    className="m-1 relative "
  >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            color: green[500],

            "&:hover": { bgcolor: green[700], color: "white" },
          }}>
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            backgroundColor: "red",
            color: green[500],
            "&:hover": { bgcolor: green[700], color: "white" },
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}>
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default UsersActions;
