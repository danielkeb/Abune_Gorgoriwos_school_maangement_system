import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import axios from 'axios';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Students() {
  const [formData, setFormData] = useState({
    email: '',
    frist_name: '',
    middle_name: '',
    last_name: '',
    role: '',
    address: '',
    username: '',
    phone: '',
    password: '',
    enrollment_date: '',
    careOf_contact1: '',
    careOf_contact2: '',
    gradeId: '',
  });

  const [error, setError] = useState('');

  const handleFieldChange = (field, value) => {
    const parsedValue = field === 'gradeId' ? parseInt(value, 10) || '' : value;

    setFormData({
      ...formData,
      [field]: value,
      [field]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform any additional validation if needed
      if (!formData.username || !formData.password || !formData.enrollment_date || !formData.careOf_contact1 || !formData.address || !formData.username) {
        setError('Please enter both username and password.');
        return;
      }

      const response = await axios.post('http://localhost:3333/auth/signUp/2', formData);

      console.log('Registration successful:', response.data);
      // You might want to redirect the user to another page or show a success message
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Head>
        <title>Forms - Components</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Students Registration"
          subHeading="Registration is needed."
          docs="https://material-ui.com/components/text-fields/"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="students register form" />
              <Divider />
              <CardContent>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                    />
                    <TextField
                      required
                      id="frist_name"
                      label="First Name"
                      variant="outlined"
                      value={formData.frist_name}
                      onChange={(e) => handleFieldChange('frist_name', e.target.value)}
                    />
                    <TextField
                      required
                      id="middle_name"
                      label="Middle Name"
                      variant="outlined"
                      value={formData.middle_name}
                      onChange={(e) => handleFieldChange('middle_name', e.target.value)}
                    />
                    <TextField
                      required
                      id="last_name"
                      label="Last Name"
                      variant="outlined"
                      value={formData.last_name}
                      onChange={(e) => handleFieldChange('last_name', e.target.value)}
                    />
                    <TextField
                      required
                      id="role"
                      label="Role"
                      variant="outlined"
                      value={formData.role}
                      onChange={(e) => handleFieldChange('role', e.target.value)}
                    />
                    <TextField
                      required
                      id="address"
                      label="Address"
                      variant="outlined"
                      value={formData.address}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                    />
                    <TextField
                      required
                      id="username"
                      label="Username"
                      variant="outlined"
                      value={formData.username}
                      onChange={(e) => handleFieldChange('username', e.target.value)}
                    />
                    <TextField
                      required
                      id="phone"
                      label="Phone"
                      variant="outlined"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                    />
                    <TextField
                      required
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                    />
                    <TextField
                      id="enrollment_date"
                      label="Enrollment Date"
                      variant="outlined"
                      value={formData.enrollment_date}
                      onChange={(e) => handleFieldChange('enrollment_date', e.target.value)}
                    />
                    <TextField
                      id="careOf_contact1"
                      label="Care Of Contact 1"
                      variant="outlined"
                      value={formData.careOf_contact1}
                      onChange={(e) => handleFieldChange('careOf_contact1', e.target.value)}
                    />
                    <TextField
                      id="careOf_contact2"
                      label="Care Of Contact 2"
                      variant="outlined"
                      value={formData.careOf_contact2}
                      onChange={(e) => handleFieldChange('careOf_contact2', e.target.value)}
                    />
                    <TextField
                      id="gradeId"
                      label="Grade ID"
                      type="number"
                      variant="outlined"
                      value={formData.gradeId}
                      onChange={(e) => handleFieldChange('gradeId', e.target.value)}
                    />
                      <Button type="submit" variant="contained" color="primary">
                    Register
                  </Button>

                  {/* Error message */}
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  </Box>
                
           
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Students.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Students;
