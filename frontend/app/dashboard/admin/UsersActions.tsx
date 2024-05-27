import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";

const UsersActions = ({ params, rowId, setRowId }) => {
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
 console.log("cocococ",params.id, rowId)
    const handleSubmit = async () => {
        setLoading(true);
         const {id,frist_name}= params.row
         const res= await axios.patch(`http://localhost:3333/teachers/adminUpdate/${parseInt(id)}`,{first_name:frist_name})
         console.log(res)
         if (res.data.msg) {    
            setSuccess(true);
            setRowId(null);
          }
          setLoading(false);

    //   setLoading(true);
  
    //   const { role, active, _id } = params.row;
    //   const result = await updateStatus({ role, active }, _id, dispatch);
    //   if (result) {
    //     setSuccess(true);
    //     setRowId(null);
    //   }
    //   setLoading(false);
    };
  
    useEffect(() => {
      if (rowId === params.id && success) setSuccess(false);
    }, [rowId]);
  
    return (
      <div>

     
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              '&:hover': { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      </div>
    );
  };
  
  export default UsersActions;