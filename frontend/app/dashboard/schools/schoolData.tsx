import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { ToGetContext } from '@/app/context/toget';

const A: React.FC = () => {
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [schools, setSchools] = React.useState([]);
  const { schoolId } = React.useContext(ToGetContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get('http://localhost:3333/schools/get');
        const studentsResponse = await axios.get('http://localhost:3333/students/get');
        const teachersResponse = await axios.get('http://localhost:3333/teachers/get');

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
  const getNumberOfStudentsGender = (schoolId: number, gender: string) => {
    const filteredStudents = students.filter(student => student.school_Id === schoolId && student.gender === gender);
    return filteredStudents.length;
  };

  const getNumberOfTeachersGender = (schoolId: number, gender: string) => {
    const filteredTeachers = teachers.filter(teacher => teacher.school_Id === schoolId && teacher.gender === gender);
    return filteredTeachers.length;
  };
  const maleStudents = getNumberOfStudentsGender(schoolId, 'male');
  const femaleStudents = getNumberOfStudentsGender(schoolId, 'female');
  const maleTeachers = getNumberOfTeachersGender(schoolId, 'male');
  const femaleTeachers = getNumberOfTeachersGender(schoolId, 'female');

  // Prepare data for pie chart
  const pieChartData = [
    { value: maleStudents, label: 'Male Std' },
    { value: femaleStudents, label: 'Female Std' },
    { value: maleTeachers, label: 'Male Tchr' },
    { value: femaleTeachers, label: 'Female Tchr' }
  ];

  return (
    <div className="A">
      <Grid container spacing={2}>
        {schools.map((school, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {schoolId === school.id && (
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {school.school_name}
                  </Typography>
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `(${item.value})`,
                        arcLabelMinAngle: 45,
                        data: pieChartData,
                      },
                    ]}
                    sx={{
                      [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: 'bold',
                      },
                    }}
                    width={400}
                    height={200}
                  />
                  <Typography variant="body2" component="p">
                    Students: {getNumberOfStudents(school.id)} Male: {maleStudents} Female: {femaleStudents}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Teachers: {getNumberOfTeachers(school.id)} Male: {maleTeachers} Female: {femaleTeachers}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default A;
