import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/components/context/UserContext";

const StudentActions = ({
  params,
  rowId,
  setRowId,

}) => {
  const { decodedToken } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // console.log("cocococ", params.id, rowId);
  const handleSubmit = async () => {
    try {
      setLoading(true);
       
      const {
        id,
        first_name,
        middle_name,
        last_name,
        email,
        address,
        phone,
        careof_contact1,
        date_of_birth,
        sectionId,
        section,
        gradeId

  
      } = params.row;
  
   
  
      let tobeSent = {
        first_name,
        middle_name,
        last_name,
        email,
        address,
        phone,
        careof_contact1,
        date_of_birth,
        sectionId,
        section,
        gradeId
      };
  

      console.log("it's trying ", section,gradeId)
      const url = `http://localhost:3333/students/updateStudent/${parseInt(id)}`;
  
      const res = await axios.patch(url, tobeSent);
  
      if (res.data.msg) {
        setSuccess(true);
        setRowId(null);
        toast.success("Record Updated :)");
      }

      console.log("Done ", res)
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}>
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
    </Box>
  );
};

export default StudentActions;
