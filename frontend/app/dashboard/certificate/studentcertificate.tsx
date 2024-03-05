import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AppContext } from '@/app/context';

interface StudentData {
  role: string;
  section:{studentId: number}
  first_name: string;
  last_name: string;
  grade: {
    grade: string;
    subject: { id: number; name: string }[];
  };
  results: { totalScore1: number; totalScore2: number; subjectId: number }[];
  firstrank?: number;
  secondtrank?: number;
  overallrank?: number;
}

interface CertificateProps {
  id: string;
}

const Certificate: React.FC<CertificateProps> = ({ id }) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [firstSemesterTotal, setFirstSemesterTotal] = useState<number>(0);
  const [secondSemesterTotal, setSecondSemesterTotal] = useState<number>(0);
  const [secondSemesterSubjectAverages, setSecondSemesterSubjectAverages] = useState<number[]>([]);
  const [secondSemesterTotalAverage, setSecondSemesterTotalAverage] = useState<number>(0);
  const{decodedToken,token, logout}= React.useContext(AppContext);
  console.log(decodedToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/students/get/${decodedToken.sub}`);// rank of student data

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        console.log(data);
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, [decodedToken]);
  console.log(decodedToken)

  useEffect(() => {
    if (studentData) {
      const firstSemesterTotalScore = studentData.results.reduce((acc, cur) => {
        const subject = studentData.grade.subject.find(subject => subject.id === cur.subjectId);
        if (subject) {
          return acc + cur.totalScore1;
        }
        return acc;
      }, 0);
      setFirstSemesterTotal(firstSemesterTotalScore);

      const secondSemesterTotalScore = studentData.results.reduce((acc, cur) => {
        const subject = studentData.grade.subject.find(subject => subject.id === cur.subjectId);
        if (subject) {
          return acc + cur.totalScore2;
        }
        return acc;
      }, 0);
      setSecondSemesterTotal(secondSemesterTotalScore);

      const secondSemesterAverages: number[] = [];
      studentData.grade.subject.forEach(subject => {
        const subjectResults = studentData.results.filter(result => result.subjectId === subject.id);
        const subjectTotalScore1 = subjectResults.reduce((acc, cur) => acc + cur.totalScore1, 0);
        const subjectTotalScore2 = subjectResults.reduce((acc, cur) => acc + cur.totalScore2, 0);
        const subjectAverage = (subjectTotalScore1 + subjectTotalScore2) / 2;
        secondSemesterAverages.push(subjectAverage);
      });
      setSecondSemesterSubjectAverages(secondSemesterAverages);

      const secondSemesterTotalAverage = (secondSemesterTotalScore + firstSemesterTotalScore) / 2;
      setSecondSemesterTotalAverage(secondSemesterTotalAverage);
    }
  }, [studentData]);

  const downloadCertificate = () => {
    const certificate = document.getElementById('certificate');
    if (certificate) {
      html2canvas(certificate, { windowWidth: 1200, windowHeight: 1500, scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size: 210mm × 297mm
        const fullName = `${studentData?.first_name} ${studentData?.last_name}`;
        pdf.save(`${fullName}_certificate.pdf`);
      });
    }
  };

  return (
    <div id="certificate" className="p-8 text-center">
      <h2 className="text-2xl font-bold">Abune gorgoriwos school tebase branch</h2>
      <p className="text-lg font-semibold">Grade {studentData?.grade.grade} student card</p>

      <div className="mt-8">
        <p>Student Name: {studentData?.first_name} {studentData?.last_name}</p>
      </div>

      <div className="mt-8">
        <table className="w-full border-collapse border border-gray-400 mx-auto" style={{ width: '70%' }}>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4" colSpan={3}>First Semester</th>
              <th className="border border-gray-400 py-2 px-4" colSpan={2}>Second Semester</th>
            </tr>
          </thead>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4">Number</th>
              <th className="border border-gray-400 py-2 px-4">Subject</th>
              <th className="border border-gray-400 py-2 px-4">Result</th>
              <th className="border border-gray-400 py-2 px-4">Semester Two Result</th>
              <th className="border border-gray-400 py-2 px-4">Average Score (Semester Two)</th>
            </tr>
          </thead>
          <tbody>
            {studentData?.grade.subject.map((subject, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 py-2 px-4">{index + 1}</td>
                <td className="border border-gray-400 py-2 px-4">{subject.name}</td>
                {studentData?.results.map((result, resultIndex) => {
                  if (result.subjectId === subject.id) {
                    return (
                      <td key={resultIndex} className="border border-gray-400 py-2 px-4">{result.totalScore1}</td>
                    );
                  }
                  return null;
                })}
                {studentData?.results.map((result, resultIndex) => {
                  if (result.subjectId === subject.id) {
                    return (
                      <td key={resultIndex} className="border border-gray-400 py-2 px-4">{result.totalScore2}</td>
                    );
                  }
                  return null;
                })}
                <td className="border border-gray-400 py-2 px-4">{secondSemesterSubjectAverages[index]}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-400 py-2 px-4">Total Score</td>
              <td className="border border-gray-400 py-2 px-4" colSpan={2}>{firstSemesterTotal}</td>
              <td className="border border-gray-400 py-2 px-4">{secondSemesterTotal}</td>
              <td className="border border-gray-400 py-2 px-4">{secondSemesterTotalAverage}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 py-2 px-4">Rank</td>
              <td className="border border-gray-400 py-2 px-4" colSpan ={2}>{studentData?.firstrank}</td>
  <td className="border border-gray-400 py-2 px-4">{studentData?.secondtrank}</td>
  <td className="border border-gray-400 py-2 px-4">{studentData?.overallrank}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <p>Teacher's Digital Signature: hgrkgkrehgker</p>
      </div>

      <button onClick={downloadCertificate} className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
        Download PDF
      </button>
    </div>
  );
};

export default Certificate;
