import { AppContext } from "@/components/context/UserContext";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DisplayTable = ({ filteredResult, gradeId,subjectId,selectedSection }) => {
    // Load saved grades from localStorage when the component mounts

  var savedGradesKey=`savedGrades_${selectedSection}_${subjectId}`;
  const { decodedToken } = useContext(AppContext);
  const[status,setStatus]= useState(true)
  const Students=filteredResult&&filteredResult[0]?.student
  const [grades, setGrades] = useState(
    filteredResult?.[0]?.student?.map((student) => ({
      studentId: student.user_Id,
      test1: 0,
      assignmentScore1: 0,
      quiz1: 0,
      finalExamScore1: 0,
      midtermScore1: 0,
      totalScore1: 0,
      subjectId: 0,
      gradeLevelId: 0,
      teacherId: 0,
    })) || []
  );
  useEffect(() => {
    savedGradesKey= `savedGrades_${selectedSection}_${subjectId}`;
    const savedGrades = localStorage.getItem(savedGradesKey);
    if (savedGrades) {
      console.log("Hola",JSON.parse(savedGrades))
      const parsedGrades = JSON.parse(savedGrades);
      formik.setValues({ ...formik.values, grades: parsedGrades });
    }
  }, [status]);
  const formik = useFormik({
    initialValues: {
      grades:grades 
    },
    onSubmit: async (values) => {
      try {
        const formattedGrades = values.grades.map((grade) => ({
          ...grade,
          test1: parseFloat(grade.test1),
          assignmentScore1: parseFloat(grade.assignmentScore1),
          quiz1: parseFloat(grade.quiz1),
          finalExamScore1: parseFloat(grade.finalExamScore1),
          midtermScore1: parseFloat(grade.midtermScore1),
          totalScore1: parseFloat(grade.totalScore1),
        }));
        const res = await axios.post(
          `http://localhost:3333/result/addmany/${gradeId}/${decodedToken?.sub}/${subjectId}`,
          JSON.stringify(formattedGrades),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.log(error)
        toast.error("There is an error")
        // Handle error
      }
    },
  });
  const handleSave= ()=>{
    localStorage.setItem(savedGradesKey, JSON.stringify(formik.values.grades));
    toast.success("Grade Saved :)")
  }
  console.log("wii it ",savedGradesKey)
  return (
    <div className="w-full lg:w-8/12 px-4">
      <form onSubmit={formik.handleSubmit}>
      <div className="container mx-auto mt-8">
        {/* Table content */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Test(10%)</th>
              <th className="py-2 px-4 border-b">assignement(15%)</th>
              <th className="py-2 px-4 border-b">mid-exam(25%)</th>
              <th className="py-2 px-4 border-b">final(50%)</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredResult &&
              filteredResult[0]?.student &&
              filteredResult[0]?.student.map((student,index) => (
                <tr key={student.user_Id}>
                  <td className="py-2 px-4 border-b">{student.user_Id}</td>
                  <td className="py-2 px-4 border-b">
                    {student.user.frist_name} {student.user.last_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="test"
                      name={`grades[${filteredResult[0]?.student.findIndex(s => s.user_Id === student.user_Id)}].test1`}
                      value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.test1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // name={`grades.${student.user_Id}.test1`}
                      // // value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.test1}
                      // // onChange={formik.handleChange}
                      // // onBlur={formik.handleBlur}
                     
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="assignment score"
                      name={`grades[${filteredResult[0]?.student.findIndex(s => s.user_Id === student.user_Id)}].assignmentScore1`}
                      value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.assignmentScore1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="mid-exam score"
                      name={`grades[${filteredResult[0]?.student.findIndex(s => s.user_Id === student.user_Id)}].midtermScore1`}
                      value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.midtermScore1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="final score"
                      name={`grades[${filteredResult[0]?.student.findIndex(s => s.user_Id === student.user_Id)}].finalExamScore1`}
                      value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.finalExamScore1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="Total Score"
                      name={`grades[${filteredResult[0]?.student.findIndex(s => s.user_Id === student.user_Id)}].totalScore1`}
                      value={formik.values.grades.find((grade) => grade.studentId === student.user_Id)?.totalScore1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4"></div>
        <div className="flex  justify-around">
      <button
      type="button"
      onClick={handleSave}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      // Handle submission of all results here
    >
      Save Grade
    </button>
    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      // Handle submission of all results here
    >
      Submit Grade
    </button>
    <button
      type="button"
      onClick={()=>setStatus(prev=>!prev)}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      // Handle submission of all results here
    >
     Cancel
    </button>
      </div>
      </div>
      </form>

 
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DisplayTable;
