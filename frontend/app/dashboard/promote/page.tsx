"use client";
import React, { useEffect, useState } from "react";
import Main from "../main/Main";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { SchoolSharp } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import NorthIcon from "@mui/icons-material/North";

import SouthIcon from "@mui/icons-material/South";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindStudent from "./findStudent";

const Promote = () => {
  const { decodedToken } = React.useContext(AppContext);
  const [teacherView, setTeacherView] = useState([]);
  const [schoolss, setSchoolss] = useState([]);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(`http://localhost:3333/grade/get/${decodedToken?.school_Id}`);

        setSchoolss(school.data);
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
      searchId2: "",
      selectedSection2: "",
    },
    onSubmit: async (values) => {
      try {
        if (formik.values.searchId && formik.values.selectedSection) {
          const res = await axios.get(
            `http://localhost:3333/students/studentsPromote/${decodedToken?.school_Id}/${formik.values.searchId}/${formik.values.selectedSection}`
          );
          
          if(res.data!=='Generate Rank First!!!'){
            setTeacherView(res.data);
            // ;
            // return;
            }else{
              toast.error('Generate Rank First!!!')
            }
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

  const sectionToDisplay = schoolss?.filter(
    (s:any) => s.id == parseInt(formik.values.searchId)
  );
  const sectionToDisplay2 = schoolss?.filter(
    (s:any) => s.id == parseInt(formik.values.searchId2)
  );

  console.log( "the info is ",formik.values.searchId,formik.values.selectedSection)
  //  console.log("Students: ", filteredResult[0].student )
  return (
    <>
      <div className="w-full  flex flex-col justify-around  items-center mt-10">
        <form
          onSubmit={formik.handleSubmit}
          className=" boxshadow w-[80%] bg-white p-6   flex justify-center items-center ">
            
          <div className=" px-4">
            <div className="relative w-full ">

              <select
                id="yourSelect"
                name="searchId"
                value={formik.values.searchId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                <option value="" >
                  choose Grade level
                </option>
                ;
                {schoolss?.map((s:any) => {
                  return <option value={s.id}>Grade {s.grade}</option>;
                })}
              </select>
            </div>
          </div>

          <div className=" px-4">
            <div className="relative w-full ">

              <select
                id="yourSelect1"
                name="selectedSection"
                value={formik.values.selectedSection}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                <option value="" >
                  Select Section
                </option>
                {sectionToDisplay[0]?.section.map((s:any) => {
                  return <option value={s.id}>Section {s.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className=" px-4">
            <div className="relative w-full ">

              <select
                id="yourSelect2"
                name="searchId2"
                value={formik.values.searchId2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                <option value="" >
                  choose Grade level
                </option>
                
                {schoolss?.map((s:any) => {
                  return <option value={s.id}>Grade {s.grade}</option>;
                })}
              </select>
            </div>
          </div>

          <div className=" px-4">
            <div className="relative w-full ">
    
              <select
                id="yourSelect2"
                name="selectedSection2"
                value={formik.values.selectedSection2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                <option value="" >
                  Select Section
                </option>
                {sectionToDisplay2[0]?.section.map((s) => {
                  return <option value={s.id}>Section {s.name}</option>;
                })}
              </select>
            </div>
          </div>

          <button
          
            type="submit"
            className="  bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            // Handle submission of all results here
          >
            Manage Promotion
          </button>
        </form>
         
        {

teacherView.length > 0 ? (
  <FindStudent
    teacherView={teacherView}
    searchId2={parseInt(formik.values.searchId2)}
    selectedSection2={parseInt(formik.values.selectedSection2)}
  />
):<div className="flex flex-col justify-center items-center gap-3 lg:mt-16">
  <img src="/no data no bg.png"  className="w-[250px]" />
   <p className="text-xl">No Result Found</p>
   <p className="text-center">Lorem ipsum dolor sit amet consectetur<br/> adipisicing elit. At, quia!</p>
</div>

   }

        {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-center">
          <button
            className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 p-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            Promote Students To Next Grade{" "}
          </button>
        </div> */}
        {/* {

teacherView.length > 0 ? (
  <FindStudent
    teacherView={teacherView}
    sectionToDisplay={sectionToDisplay}

  />
):<div className="flex flex-col justify-center items-center gap-3 lg:mt-16">
  <img src="/no data no bg.png"  className="w-[250px]" />
   <p className="text-xl">No Result Found</p>
   <p className="text-center">Lorem ipsum dolor sit amet consectetur<br/> adipisicing elit. At, quia!</p>
</div>

   } */}
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
    </>
  );
};

export default Promote;
