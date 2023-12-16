import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddSchools = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation if needed

    // Prepare data for API request
    const formData = {
      schoolname: schoolName,
      schooladdress: schoolAddress,
    };

    try {
      // Make a POST request to the Nest.js API endpoint
      const response = await fetch('http://localhost:3333/schools/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed (e.g., show success or error message)
      if (response.ok) {
        console.log('School registered successfully');
        // Reset form fields if needed
        setSchoolName('');
        setSchoolAddress('');
      } else {
        console.error('Error registering school');
      }
    } catch (error) {
      console.error('Error:', error);
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
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <button type="submit">Register School</button>
    </Box>
  );
};

export default AddSchools;
