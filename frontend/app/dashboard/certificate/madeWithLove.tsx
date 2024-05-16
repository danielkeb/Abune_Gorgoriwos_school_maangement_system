import html2canvas from 'html2canvas';
import React, { useContext } from 'react'
import { jsPDF } from 'jspdf';
import { AppContext } from '@/components/context/UserContext';

const MadeWithLove = ({ studentData }) => {
  const { decodedToken, token, logout } = useContext(AppContext);

  const downloadCertificate = () => {

    const certificate = document.getElementById('certificate');
    if (certificate) {
      html2canvas(certificate, { scale: 3 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 size: 210mm × 297mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        const fullName = `${decodedToken?.frist_name}`;
        pdf.save(`${fullName}_certificate.pdf`);
      });
    }
  };
  console.log("here is the student data",)
  return (
    <div className='flex flex-col justify-start items-center h-full '>

    <div className='boxshadow w-[95%] lg:w-[80%]  bg-white mt-4 lg:mt-8'>
    <div id="certificate" className="p-8 text-center ">
    <h2 className="text-xl font-bold">Debrebrhan {studentData[0]?.school_name} School Branch Digital Certificate </h2>
      <p className="text-lg font-semibold"> Bereket Zewde | Grade {studentData[0].gradeId} | A</p>

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
        {studentData.map((student, index) => (
          <React.Fragment key={student.id}>
            {student.subjectScores.map((subject, subjectIndex) => (
              <tr key={`${student.id}-${subjectIndex}`} className="text-center">
                <td className="border border-gray-400 py-2 px-4">{subjectIndex + 1}</td>
                <td className="border border-gray-400 py-2 px-4">{subject.subject}</td>
                <td className="border border-gray-400 py-2 px-4">{subject.totalScore1}</td>
                <td className="border border-gray-400 py-2 px-4">{subject.totalScore2}</td>
                <td className="border border-gray-400 py-2 px-4">{subject.average}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-400 py-2 px-4">Average Total Score</td>
              <td className="border border-gray-400 py-2 px-4" colSpan={2}>{student.totalScore1}</td>
              <td className="border border-gray-400 py-2 px-4">{student.totalScore2}</td>
              <td className="border border-gray-400 py-2 px-4">{student.overallScore}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 py-2 px-4">Rank</td>
              <td className="border border-gray-400 py-2 px-4" colSpan={2}>{student.firstRank}</td>
              <td className="border border-gray-400 py-2 px-4">{student.secondRank}</td>
              <td className="border border-gray-400 py-2 px-4">{student.overallRank}</td>
            </tr>
          </React.Fragment>
        ))}
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
    </div>
  );
}

export default MadeWithLove
