import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface StudentData {
  fullName: string;
  gradeLevel: string;
  schoolName: string;
  // Add more fields as needed
}

interface CertificateProps {
  id: string;
}

const Certificate: React.FC<CertificateProps> = ({ id }) => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/student/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, [id]);

  const downloadCertificate = () => {
    const certificate = document.getElementById('certificate');
    if (certificate) {
      html2canvas(certificate).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 15, 15, 180, 260); // Adjust x, y, width, and height as needed
        pdf.save('certificate.pdf');
      });
    }
  };

  return (
    <div id="certificate" className="p-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Student Result Certificate</h2>
        <p className="text-lg font-semibold">{studentData?.schoolName}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Student Name: {studentData?.fullName}</p>
        <p className="font-semibold">Grade Level: {studentData?.gradeLevel}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Semester One:</p>
        {/* Display semester one grades */}
      </div>
      <div className="mb-4">
        <p className="font-semibold">Semester Two:</p>
        {/* Display semester two grades */}
      </div>
      <div className="text-center mt-8">
        <p className="font-semibold">Teacher Signature:</p>
        {/* Include space for teacher signature */}
      </div>
      <div className="text-center mt-8">
        <button onClick={downloadCertificate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;