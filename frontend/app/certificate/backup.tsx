import { useEffect, useState } from 'react';

// Define TypeScript interfaces for the data structure
interface Result {
  id: number;
  test1: number;
  assignmentScore1: number;
  midtermScore1: number;
  finalExamScore1: number;
  totalScore1: number;
  test2: number;
  assignmentScore2: number;
  midtermScore2: number;
  finalExamScore2: number;
  totalScore2: number;
  teacherId: number;
  studentId: number;
  subjectId: number;
  gradeLevelId: number;
}

interface Student {
  id: number;
  result: Result[];
}

interface GradeLevel {
  grade: string;
  student: Student[];
}

interface ClassData {
  gradeId: number;
  name: string;
  gradelevel: GradeLevel;
}

// Fetch the class data from the API endpoint
async function fetchClassData(sectionId: number): Promise<ClassData> {
  const response = await fetch('http://localhost:3333/section/1');
  if (!response.ok) {
    throw new Error('Failed to fetch class data');
  }
  return response.json();
}

const ClassComponent: React.FC = () => {
  const [classData, setClassData] = useState<ClassData | null>(null);

  useEffect(() => {
    // Fetch the class data when the component mounts
    fetchClassData(1) // Assuming sectionId is 1, replace it with the actual sectionId
      .then(data => setClassData(data))
      .catch(error => console.error('Error fetching class data:', error));
  }, []);

  if (!classData) {
    return <div>Loading...</div>;
  }

  // Calculate rank for totalScore1
  const calculateRankTotalScore1 = (student: Student): number => {
    const studentScore = student.result[0].totalScore1;
    let rank = 1;
    classData.gradelevel.student.forEach(otherStudent => {
      if (otherStudent.id !== student.id) {
        const otherStudentScore = otherStudent.result[0].totalScore1;
        if (otherStudentScore > studentScore) {
          rank++;
        }
      }
    });
    return rank;
  };

  // Calculate rank for totalScore2
  const calculateRankTotalScore2 = (student: Student): number => {
    const studentScore = student.result[0].totalScore2;
    let rank = 1;
    classData.gradelevel.student.forEach(otherStudent => {
      if (otherStudent.id !== student.id) {
        const otherStudentScore = otherStudent.result[0].totalScore2;
        if (otherStudentScore > studentScore) {
          rank++;
        }
      }
    });
    return rank;
  };

  // Calculate the combined rank based on the average of rankTotalScore1 and rankTotalScore2
  const calculateCombinedRank = (student: Student): number => {
    const rankTotalScore1 = calculateRankTotalScore1(student);
    const rankTotalScore2 = calculateRankTotalScore2(student);
    return Math.round((rankTotalScore1 + rankTotalScore2) / 2);
  };

  return (
    <div>
      <h1>Class: {classData.name}</h1>
      <h2>Grade: {classData.gradelevel.grade}</h2>
      <div>
        {classData.gradelevel.student.map(student => (
          <div key={student.id}>
            <h3>Student ID: {student.id}</h3>
            {student.result.length > 0 ? (
              <ul>
                <li>
                  Total Score 1: {student.result[0].totalScore1} and rank: {calculateRankTotalScore1(student)}
                </li>
                <li>
                  Total Score 2: {student.result[0].totalScore2} and rank: {calculateRankTotalScore2(student)}
                </li>
                <li>
                  Combined Rank: {calculateCombinedRank(student)}
                </li>
              </ul>
            ) : (
              <p>No results found for this student.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassComponent;
