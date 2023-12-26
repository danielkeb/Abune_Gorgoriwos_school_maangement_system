import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const AddSchools = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [error,] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation if needed
    if (!schoolName || !schoolAddress || !schoolPhone) {
      console.error('Validation failed: All fields are required.');
      return;
    }
    
  
    // Prepare data for API request
    const formData = {
      schoolname: schoolName,
      schooladdress: schoolAddress,
      schoolPhone: schoolPhone,
    };
  
    try {
      // Make a POST request to the Nest.js API endpoint
      const response = await axios.post('http://localhost:3333/schools/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Handle the response as needed (e.g., show success or error message)
      if (response.status === 200) {
        console.log('School registered successfully');
        // Reset form fields if needed
        setSchoolName('');
        setSchoolAddress('');
        setSchoolPhone('');
      } else {
        console.error('Error registering school:', response.statusText);
      }
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          id="schoolName"
          label="School Name"
          variant="outlined"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <TextField
          id="schoolAddress"
          label="School Address"
          variant="outlined"
          value={schoolAddress}
          onChange={(e) => setSchoolAddress(e.target.value)}
        />
        <TextField
          id="schoolPhone"
          label="School Phone"
          variant="outlined"
          value={schoolPhone}
          onChange={(e) => setSchoolPhone(e.target.value)}
        />
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <Button type="submit" variant="contained" color="primary">
        Register School
      </Button>
      
      {/* Display validation error */}
{/* Display validation error */}
{error && <p style={{ color: 'red' }}>{error}</p>}

    </Box>
  );
};

export default AddSchools;
