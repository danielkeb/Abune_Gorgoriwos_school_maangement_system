"use client";
import React, { useContext, useEffect, useState } from "react";
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
import ForSemesterTwo from "./forSemesterTwo";
import ForAll from "./forAll";
import { ToGetContext } from "@/app/context/toget";
import AnalysisView from "./analysisView";
import BasicBars from "./graph";

const Analysis = () => {
  const [selectedView, setSelectedView] = useState("1");
  const { dork } = useContext(ToGetContext);
  const [analysis, setAnalysis] = useState([]);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const school = await axios.post(`http://localhost:3333/result/analysis/1/2`);

//         setSchoolss(school.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [dork]);
  const [check, setCheck] = useState(false);
  const formik = useFormik({
    initialValues: {
      searchId: dork,
      selectedSection: "",
      semester: "",
    },
    onSubmit: async (values) => {
      try {
        if (
          formik.values.semester
        ) {
          const res = await axios.post(
            `http://localhost:3333/result/analysis/${dork}/${formik.values.semester}`
          );

          setAnalysis(res.data);
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
  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
    // You can perform any additional actions based on the selected value here
  };



  let componentToRender;
  if(analysis.length>0 && selectedView=='1'){
  componentToRender=<AnalysisView analysis={analysis}/>  
  //componentToRender= <AnalysisView analysis={analysis}/>
  }else if(analysis.length>0 && selectedView=='2'){
    componentToRender=<BasicBars analysis={analysis}/> 
  }
   else {
    componentToRender = (
      <div className="flex flex-col justify-center items-center gap-3 lg:mt-16">
        <img src="/no data no bg.png" className="w-[250px]" />
        <p className="text-xl">No Result Found</p>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur
          <br /> adipisicing elit. At, quia!
        </p>
      </div>
    ); // Render the default component if none of the conditions match
  }
  //  console.log("Students: ", filteredResult[0].student )
  return (
    <>
      <div className="w-full  flex flex-col justify-around  items-center mt-10">
        
        <form
          onSubmit={formik.handleSubmit}
          className=" boxshadow bg-white  flex flex-col  justify-center items-center shadow-md w-[80%] p-6">
          <div className="w-full  flex md:flex-row flex-col  items-center justify-center gap-2  ">


            <div className=" px-4  md:w-[40%] w-full">
              <div className="relative w-full ">

                <select
                  id="yourSelect4"
                  name="semester"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="" disabled>
                    Select a Semester
                  </option>

                  <option value="1">Semester one</option>
                  <option value="2">Semester Two</option>
                  <option value="3">Over All</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="   bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              // Handle submission of all results here
            >
             Analysis
            </button>
          </div>
          <div className="flex gap-3">
          </div>
        </form>
       <br/>
        {componentToRender}
         <br/>
        <div className=" px-4  md:w-[10%]  w-full">
              <div className="relative w-full ">

                <select
                  id="yourSelect4"
                  name="semester"
                  value={selectedView}
                  onChange={()=>handleViewChange(event)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400 boxshadow">
                  <option value="" disabled>
                    Select a View
                  </option>

                  <option value="1">Table View</option>
                  <option value="2">Bar Chart </option>
                 
                </select>
              </div>
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
    </>
  );
};

export default Analysis;
