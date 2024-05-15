"use client";
import React, { useEffect, useState } from "react";
import Main from "../main/Main";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { SchoolSharp } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
// import DisplayTable from "./displayTable";
import NewWay from "./newWay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { decodedToken } = React.useContext(AppContext);
  const [teacherView, setTeacherView] = useState([]);
  const [schoolss, setSchoolss] = useState([]);
  const [call, setCall]= useState([]);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(
          `http://localhost:3333/teachers/grade/${decodedToken?.sub}`
        );
        setSchoolss(school.data);
       const callander= await axios.get('http://localhost:3333/callander/spec')
       
       setCall(callander.data);
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [decodedToken]);

  const formik = useFormik({
    initialValues: {
      searchId: "",
      selectedSection: "",
      subject: "",
      semester: "",
    },
    onSubmit: async (values) => {
      try {
        if (
          formik.values.searchId &&
          formik.values.selectedSection &&
          formik.values.selectedSection &&
          formik.values.semester &&
          formik.values.subject
        ) {
          const res = await axios.get(
            `http://localhost:3333/result/get/${decodedToken?.sub}/${formik.values.searchId}/${formik.values.selectedSection}/${formik.values.subject}`
          );
          setTeacherView(res.data);
        } else {
          toast.error("Please Select all fields!");
        }

        // router.push('/head')
      } catch (error: any) {
        // Handle error (e.g., display error message)
        // console.error("Error submitting form:", error?.response.data.message);
      }
    },
  });

  const filteredSections = schoolss[0]?.section.filter(
    (obj) => obj.gradeId == parseInt(formik.values.searchId)
  );
  const filteredSubjects = schoolss[0]?.subject.filter(
    (obj) => obj.gradeId == parseInt(formik.values.searchId)
  );
  const filteredResult =
    formik.values.subject != "" &&
    schoolss[0]?.section.filter(
      (obj) => obj.id == parseInt(formik.values.selectedSection)
    );

   const getAll= call.filter(c=>c.title=="Semester I End")
   const calendarStartDate = new Date(getAll[0]?.start);
   const currentDate = new Date();
   calendarStartDate < currentDate
   console.log( currentDate< calendarStartDate);
  //  console.log("Students: ", filteredResult[0].student )
  return (
    <Main>
      <div className="w-full ">
        <div className="w-full flex  justify-center items-center" >

   
        <form onSubmit={formik.handleSubmit} className=" bg-white box boxshadow w-[80%] justify-center mt-5  p-4">
          <div className=" flex mt-8   ">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Assigned Grade
                </label>
                <select
                  id="yourSelect"
                  name="searchId"
                  value={formik.values.searchId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="">Select Grade Level</option>
                  {schoolss[0]?.gradelevel.map((g) => {
                    return <option value={g.id}>Grade{g.grade}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Assigned Section
                </label>
                <select
                  id="yourSelect"
                  name="selectedSection"
                  value={formik.values.selectedSection}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="">Select a Section</option>
                  {filteredSections?.map((sec) => {
                    return <option value={sec.id}>{sec.name}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Assigned Subject
                </label>
                <select
                  id="yourSelect"
                  name="subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="">Select a Subject</option>
                  {filteredSubjects?.map((sub) => {
                    return <option value={sub.id}>{sub.name}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Semester
                </label>
                <select
                  id="yourSelect"
                  name="semester"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="" disabled>
                    Select a Semester
                  </option>

                  <option  disabled={calendarStartDate <= currentDate} value="1">Semester one</option>
                  <option disabled={calendarStartDate >= currentDate} value="2">Semester Two</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative w-full mb-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                // Handle submission of all results here
              >
                Find Section
              </button>
            </div>
          </div>
        </form>
        </div>
        <div className="w-full flex  justify-center items-center">
     
        {
          // filteredResult && filteredResult[0]?.student && <DisplayTable filteredResult={filteredResult } gradeId={parseInt(formik.values.searchId)} subjectId={parseInt(formik.values.subject)} selectedSection={parseInt(formik.values.selectedSection)}  />
          teacherView.length > 0 && (
            <NewWay
              teacherView={teacherView}
              gradeId={parseInt(formik.values.searchId)}
              subjectId={parseInt(formik.values.subject)}
              selectedSection={parseInt(formik.values.selectedSection)}
              semester={parseInt(formik.values.semester)}
            />
          )
        }
           </div>
      </div>

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
    </Main>
  );
};

export default Page;