import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';


const usersData = () => { // Added parentheses to define a function
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh',width:200 }} >Hello </Box>
      </Container>
    </React.Fragment>
  );
};

export default usersData; // Added export statement to export the component
