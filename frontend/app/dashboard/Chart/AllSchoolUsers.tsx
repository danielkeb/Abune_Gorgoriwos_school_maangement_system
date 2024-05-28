import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { AppContext } from '@/components/context/UserContext';

const A: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);
  const { decodedToken, token, logout } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get('http://localhost:3333/schools/get');
        const studentsResponse = await axios.get('http://localhost:3333/students/get');
        const teachersResponse = await axios.get(`http://localhost:3333/teachers/get/${decodedToken.school_Id}`);

        if (schoolsResponse.status === 200 && studentsResponse.status === 200 && teachersResponse.status === 200) {
          setSchools(schoolsResponse.data);
          setStudents(studentsResponse.data);
          setTeachers(teachersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getNumberOfStudents = (schoolId: number) => {
    return students.filter(student => student.school_Id === schoolId).length;
  };

  const getNumberOfTeachers = (schoolId: number) => {
    return teachers.filter(teacher => teacher.school_Id === schoolId).length;
  };

  return (
    <div className="A">
      <Grid container spacing={2}>
        {schools.map((school, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {school.school_name}
                </Typography>
                <Typography variant="body2" component="p">
                  Students: {getNumberOfStudents(school.id)}
                </Typography>
                <Typography variant="body2" component="p">
                  Teachers: {getNumberOfTeachers(school.id)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default A;
