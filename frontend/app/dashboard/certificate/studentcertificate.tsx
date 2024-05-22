import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

import { AppContext } from '@/components/context/UserContext';

interface StudentData {
  section:{studentId: number}
  first_name: string;
  last_name: string;
  school_name: string;
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
        const response = await axios.get(`http://localhost:3333/students/get/${decodedToken?.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );// rank of student data
    
        const data =  response.data
        //console.log('data ',data);
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);
  //console.log(decodedToken)

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
      html2canvas(certificate, { scale: 3 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 size: 210mm × 297mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        const fullName = `${studentData?.first_name} ${studentData?.last_name}`;
        pdf.save(`${fullName}_certificate.pdf`);
      });
    }
  };
  

  return (
    <div className=''>

   {
    studentData?.firstrank?    <div className='flex flex-col justify-start items-center h-full '>




    <div className='boxshadow w-[95%] lg:w-[80%]  bg-white mt-4 lg:mt-8'>


    <div id="certificate" className="p-8 text-center ">
      <h2 className="text-xl font-bold">Debrebrhan {studentData?.school_name} School Branch Digital Certificate </h2>
      <p className="text-lg font-semibold"> Bereket Zewde | Grade 1| A</p>

      <div className="mt-8">
        {/* <p>Student Name: {decodedToken.frist_name}</p> */}
      </div>

      <div className="mt-8 overflow-x-auto">
  <table className="w-full border-collapse border border-gray-400 mx-auto md:w-[80%] lg:w-[70%]">
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
        <td className="border border-gray-400 py-2 px-4" colSpan={2}>{studentData?.firstrank}</td>
        <td className="border border-gray-400 py-2 px-4">{studentData?.secondtrank}</td>
        <td className="border border-gray-400 py-2 px-4">{studentData?.overallrank}</td>
      </tr>
    </tbody>
  </table>
</div>


      <div className=" flex justify-center items-center text-center mt-8">
        <p>Mr Zerihun K</p>
        <img src="/dgitalSig.png" width={100} />
      </div>


    </div>

    </div>
    <button
  onClick={downloadCertificate}
  className="bg-green-950 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 hidden sm:inline-block"
>
  Download as PDF
</button>

    </div>:<div className="  flex flex-col justify-center items-center lg:mt-16">
  <div className=" boxshadow relative w-64 h-64 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-full flex justify-center items-center">
    <img src="/no data no bg.png" className="w-[70%] h-[70%] object-contain" />
  </div>
  <p className="text-xl text-b mt-2 text-green-700"><b>No Certificate to Display!</b></p>
  <p className="text-center">Try again later, No rank generated yet!</p>
</div>


}

    </div>
  );
};

export default Certificate;
