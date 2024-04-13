
import React, { useContext, useEffect, useState } from "react";
import Main from "../main/Main";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { SchoolSharp } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindStudent from "./findStudent";
import { ToGetContext } from "@/app/context/toget";

const Manage = () => {
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
      subject: "",
      semester: "",
    },
    onSubmit: async (values) => {
      try {
        if (
          dork &&
          formik.values.selectedSection 
 
        ) {
          const res = await axios.get(
            `http://localhost:3333/students/getstu/${decodedToken?.school_Id}/${dork}/${formik.values.selectedSection}`
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
  const {dork}= useContext(ToGetContext)

  const sectionToDisplay= schoolss?.filter((s)=>s.id==parseInt(dork))

   console.log("this is the ",teacherView)
  //  console.log("Students: ", filteredResult[0].student )
  return (
   
      <>
      <div className="w-full  flex flex-col justify-around  items-center mt-10">




   <form onSubmit={formik.handleSubmit} className=" boxshadow p-4 w-[70%]    flex md:flex-row flex-col  items-center justify-center gap-2  ">
  


            <div className=" px-4 md:w-[40%] w-full" >
              <div className="relative w-full ">

                <select
                  id="yourSelect"
                  name="selectedSection"
                  value={formik.values.selectedSection}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                  <option value="">Select Section</option>
                  {
                  
                  sectionToDisplay[0]?.section.map(s=>{
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
                Find Students
              </button>
   </form>

 <br/>
   {

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

   }



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

export default Manage;
