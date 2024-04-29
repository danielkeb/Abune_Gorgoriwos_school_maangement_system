"use client";
import React, { useContext, useEffect, useState } from "react";
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

const Rank = () => {
  const { decodedToken } = React.useContext(AppContext);
  const { dork } = useContext(ToGetContext);
  const [teacherView, setTeacherView] = useState([]);
  const [schoolss, setSchoolss] = useState([]);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(`http://localhost:3333/grade/get/`);

        setSchoolss(school.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dork]);
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
          formik.values.searchId &&
          formik.values.selectedSection &&
          formik.values.semester
        ) {
          const res = await axios.get(
            `http://localhost:3333/students/getwithDisplay/${decodedToken?.school_Id}/${formik.values.searchId}/${formik.values.selectedSection}/${formik.values.semester}`
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

  const handleGenerate = async (e: any) => {
    e.preventDefault();

    try {
      if (
        formik.values.searchId &&
        formik.values.selectedSection &&
        formik.values.semester
      ) {
        setCheck(true);
        const res = await axios.get(
          `http://localhost:3333/students/getwith/${decodedToken?.school_Id}/${formik.values.searchId}/${formik.values.selectedSection}/${formik.values.semester}`
        );

        toast.success("Rank Generated");
      } else {
        toast.error("Please Select all fields!");
      }

      // router.push('/head')
    } catch (error: any) {
      console.log(error);
      // Handle error (e.g., display error message)
      // console.error("Error submitting form:", error?.response.data.message);
    }
    setCheck(false);
  };

  const sectionToDisplay = schoolss?.filter((s) => s.id == parseInt(dork));

  console.log("this is the ", formik.values.searchId);

  let componentToRender;

  if (teacherView?.length > 0 && parseInt(formik.values.semester) === 1) {
    componentToRender = <FindStudent teacherView={teacherView} />;
  } else if (
    teacherView?.length > 0 &&
    parseInt(formik.values.semester) === 2
  ) {
    componentToRender = <ForSemesterTwo teacherView={teacherView} />;
  } else if (
    teacherView?.length > 0 &&
    parseInt(formik.values.semester) === 3
  ) {
    componentToRender = <ForAll teacherView={teacherView} />;
  } else {
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
          className=" boxshadow p-6  bg-white  flex flex-col  justify-center items-center shadow-md w-[80%] ">
          <div className="w-full  flex md:flex-row flex-col  items-center justify-center gap-2  ">
            <div className=" px-4 md:w-[40%] w-full">
              <div className="relative w-full ">

                <select
                  id="yourSelect1"
                  name="selectedSection"
                  value={formik.values.selectedSection}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="" disabled>
                    Select Section
                  </option>
                  {sectionToDisplay[0]?.section.map((s) => {
                    return <option value={s.id}>Section {s.name}</option>;
                  })}
                </select>
              </div>
            </div>

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
              Display Rank
            </button>
          </div>
          <div className="flex gap-3">
 
            {/* <button
              type="submit"
              className="  mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              // Handle submission of all results here
            >
              Display Rank
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className=" none mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              // Handle submission of all results here
            >
              {check ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>{" "}
                  Generating Rank ...
                </>
              ) : (
                "Generate Rank"
              )}
            </button> */}
          </div>
        </form>

        {componentToRender}

 {  teacherView?.length > 0 &&     <button
              type="button"
              onClick={handleGenerate}
              className=" none mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              // Handle submission of all results here
            >
              {check ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>{" "}
                  Generating Rank ...
                </>
              ) : (
                "Generate Rank"
              )}
            </button>}

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

export default Rank;
