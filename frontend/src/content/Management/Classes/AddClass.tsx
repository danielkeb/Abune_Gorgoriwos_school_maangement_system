import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const AddClass = () => {
  const [GradeName, setGradeName] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [Id, setId] = useState('');
  const [error,] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform validation if needed
    if (!GradeName || !sectionName || !Id) {
      console.error('Validation failed: All fields are required.');
      return;
    }
  
    try {
      // Make a POST request to the Nest.js API endpoint
      const response = await axios.post('http://localhost:3333/grade/add',{
        grade: GradeName,
        section: sectionName,
        teacher_id: parseInt(Id),
      });
      
      // Handle the response as needed (e.g., show success or error message)
      if (response.status === 201) {
        console.log('School registered successfully');
        // Reset form fields if needed
        setGradeName('');
        setSectionName('');
        setId('');
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
          id="GradeName"
          label="Class"
          variant="outlined"
          value={GradeName}
          onChange={(e) => setGradeName(e.target.value)}
        />
        <TextField
          id="sectionName"
          label="Section"
          variant="outlined"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <TextField
          id="Id"
          label="teacher id"
          variant="outlined"
          value={Id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <div>
        {/* Add other form fields as needed */}
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add class
      </Button>
      
      {/* Display validation error */}
{/* Display validation error */}
{error && <p style={{ color: 'red' }}>{error}</p>}

    </Box>
  );
};

export default AddClass;
