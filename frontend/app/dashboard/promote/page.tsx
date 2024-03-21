"use client";
import React, { useEffect, useState } from "react";
import Main from "../main/Main";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { SchoolSharp } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
import NorthIcon from '@mui/icons-material/North';

import SouthIcon from '@mui/icons-material/South';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Page = () => {
  const { decodedToken } = React.useContext(AppContext);
  const [teacherView, setTeacherView] = useState([]);
  const [schoolss, setSchoolss] = useState([]);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(
          `http://localhost:3333/grade/get/`
        );
       
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
        if (
          formik.values.searchId &&
          formik.values.selectedSection 
 
        ) {
          const res = await axios.get(
            `http://localhost:3333/students/getstu/${decodedToken?.school_Id}/${formik.values.searchId}/${formik.values.selectedSection}`
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

  const sectionToDisplay= schoolss?.filter((s)=>s.id==parseInt(formik.values.searchId))
  const sectionToDisplay2= schoolss?.filter((s)=>s.id==parseInt(formik.values.searchId2))

   console.log("this is the ",teacherView)
  //  console.log("Students: ", filteredResult[0].student )
  return (
    <Main>
      <div className="w-full  flex flex-col justify-around  items-center mt-10">




   <form onSubmit={formik.handleSubmit} className="w-full  flex justify-center items-center ">
  
   <div className=" px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Select Grade Level
                </label>
                <select
                  id="yourSelect"
                  name="searchId"
                  value={formik.values.searchId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                 
                 <option  value="" disabled>choose Grade level</option>;
                 {
                  schoolss?.map(s=>{
                    return <option value={s.id}>Grade {s.grade}</option>
                  })
                 }
                  
                  
          
           
                </select>
              </div>


            </div>

            <div className=" px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Select Section
                </label>
                <select
                  id="yourSelect1"
                  name="selectedSection"
                  value={formik.values.selectedSection}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="" disabled>Select Section</option>
                  {
                  
                  sectionToDisplay[0]?.section.map(s=>{
                    return  <option value={s.id}>Section {s.name}</option>;
                  })

                  }
          
                 
                </select>
              </div>
            </div>


              
   <div className=" px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Promote to Grade
                </label>
                <select
                  id="yourSelect2"
                  name="searchId2"
                  value={formik.values.searchId2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                 
                 <option  value="" disabled>choose Grade level</option>;
                 {
                  schoolss?.map(s=>{
                    return <option value={s.id}>Grade {s.grade}</option>
                  })
                 }
                  
                  
          
           
                </select>
              </div>


            </div>


            <div className=" px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password">
                  Promote to section
                </label>
                <select
                  id="yourSelect2"
                  name="selectedSection2"
                  value={formik.values.selectedSection2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="" disabled>Select Section</option>
                  {
                  
                  sectionToDisplay2[0]?.section.map(s=>{
                    return  <option value={s.id}>Section {s.name}</option>;
                  })

                  }
          
                 
                </select>
              </div>
            </div>


            <button
                type="submit"
                className=" mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                // Handle submission of all results here
              >
               Manage Promotion
              </button>
   </form>



 <section className="py-1 bg-blueGray-50 w-full">
<div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-10">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-blueGray-700">Students</h3>
        </div>

      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        ID
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                         First Name
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Last Name
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Total Score
                        </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              /argon/
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              4,569
            </td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              340
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <NorthIcon  className="text-emerald-500 mr-4"/>
             
              Passed
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
              /argon/index.html
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              3,985
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              319
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <SouthIcon className=" text-red-500 mr-4" />
             
              Failed
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
              /argon/charts.html
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              3,513
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              294
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <SouthIcon className=" text-red-500 mr-4" />
              Failed
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
              /argon/tables.html
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              2,050
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              147
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <NorthIcon  className="text-emerald-500 mr-4"/>
              Passed
            </td>
          </tr>
          <tr>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
              /argon/profile.html
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              1,795
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              190
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              
              <SouthIcon className=" text-red-500  mr-4" />
              
              Failed
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</div>

</section>

<div className="relative w-full px-4 max-w-full flex-grow flex-1 text-center">
          <button className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 p-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Promote Students To Next Grade </button>
        </div>
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
   
    </Main>
  );
};

export default Page;

