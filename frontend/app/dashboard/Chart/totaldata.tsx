import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';

export default function BasicCard() {
  const [userData, setUserData] = useState({ users: 0, schools: 0, students:0, teachers: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axios.get('http://localhost:3333/auth/role/teacher');
        const studentsResponse = await axios.get('http://localhost:3333/auth/role/student');
        const adminsResponse = await axios.get('http://localhost:3333/auth/role/admin');
        const schoolsResponse = await axios.get('http://localhost:3333/schools/get');
        //const inactiveResponse = await axios.get('http://localhost:3333/auth/role/inactive');

        if (teachersResponse.status === 200 && studentsResponse.status === 200 && adminsResponse.status === 200 && schoolsResponse.status === 200) {
          const teachersCount = teachersResponse.data.length;
          const studentsCount = studentsResponse.data.length;
          const adminsCount = adminsResponse.data.length;
          const schoolsCount = schoolsResponse.data.length;
        //   const inactiveCount = inactiveResponse.data.length;

          setUserData({
            users: adminsCount,
            students: studentsCount,
            schools: schoolsCount,
            teachers: teachersCount,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
      <Box sx={{ marginRight: '10px' }}>
        <Card sx={{ maxWidth: 250, backgroundColor: 'grey' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: 'white' }} gutterBottom>
              <PeopleIcon /> Admins
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: 'white' }}>
              {userData.users}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card sx={{ maxWidth: 250, backgroundColor: 'blue' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: 'white' }} gutterBottom>
              <SchoolIcon /> Schools
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: 'white' }}>
              {userData.schools}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card sx={{ maxWidth: 250, backgroundColor: 'brown'  }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: 'white' }} gutterBottom>
              <PeopleIcon /> Students
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: 'white' }}>
              {userData.students}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card sx={{ maxWidth: 250, backgroundColor: 'green' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: 'white' }} gutterBottom>
              <PeopleIcon /> Teachers
            </Typography>
            <Typography variant="h5" component="div" sx={{ color: 'white' }}>
              {userData.teachers}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
