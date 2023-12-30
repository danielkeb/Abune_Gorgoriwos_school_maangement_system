import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddSchools = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [schoolPhone, setSchoolPhone] = useState('');
  const [error,] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Perform validation if needed
  //   if (!schoolName || !schoolAddress || !schoolPhone) {
  //     console.error('Validation failed: All fields are required.');
  //     return;
  //   }
    
  
  //   // Prepare data for API request
  //   // const formData = {
  //   //   school_name: schoolName,
  //   //   school_address: schoolAddress,
  //   //   school_phone: schoolPhone,
  //   // };
  
  //   try {
  //     // Make a POST request to the Nest.js API endpoint
  //     const response = await axios.post('http://localhost:3333/schools/register',{
  //       school_name: schoolName,
  //       school_address: schoolAddress,
  //       school_phone: schoolPhone,
  //     });
      
  //     // Handle the response as needed (e.g., show success or error message)
  //     if (response.status === 201) {
  //       console.log('School registered successfully');
  //       // Reset form fields if needed
  //       setSchoolName('');
  //       setSchoolAddress('');
  //       setSchoolPhone('');
  //     } else {
  //       console.error('Error registering school:', response.statusText);
  //     }
      
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      school_name: "",
      school_address: '',
      school_phone:'',

    },
    onSubmit: async (values,{ resetForm }) => {
      try {
        const response = await axios.post('http://localhost:3333/schools/register', formik.values);

      

     
        // Handle successful response (e.g., store token, redirect to another page)
        console.log('Form submitted successfully!', response);
        
        resetForm()

        // router.push('/head')
      } catch (error) {
        // Handle error (e.g., display error message)
        console.error('Error submitting form:', error.response.data.message);
     
      }
    },
    validationSchema: yup.object({
     
      school_name: yup
        .string()
        .required('School Name is required'),
        school_address: yup.string().trim().required('School Address is required'),
        school_phone:yup.number().required('Phone Number is Required')
    }),
  });

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
     
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div  style={{display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        
        <TextField
        style={{width:"50%", color:"red"}}
          id="school_name"
          label="School Name"
          variant="outlined"
          value={formik.values.school_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // value={schoolName}
          // onChange={(e) => setSchoolName(e.target.value)}
        /> 
         {formik.errors.school_name && <small >{formik.errors.school_name}</small>}
        <br/>
        <TextField
        style={{width:"50%"}}
          id="school_address"
          label="School Address"
          variant="outlined"
          value={formik.values.school_address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // value={schoolAddress}
          // onChange={(e) => setSchoolAddress(e.target.value)}
        /><br/>
        <TextField
          style={{width:"50%"}}
          id="school_phone"
          label="School Phone"
          variant="outlined"
          value={formik.values.school_phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // value={schoolPhone}
          // onChange={(e) => setSchoolPhone(e.target.value)}
        />       <br/>
          <Button  style={{width:"25"}} type="submit" variant="contained" color="primary">
        Register School
      </Button>
      </div>

    
      
      {/* Display validation error */}
{/* Display validation error */}
{error && <p style={{ color: 'red' }}>{error}</p>}

    </Box>
  );
};

export default AddSchools;
