"use client";
import React, { useState } from 'react';
import Main from '../main/Main';
import Page from '../rank/page';
import Rank from '../rank/page';
import Promote from '../promote/page';
import Manage from './manage';

function CustomTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  let componentToRender;
  if(activeTab==1){
    componentToRender=<Rank/>
  }else if(activeTab==2){
    componentToRender=<Promote/>
  }else if(activeTab==0){
    componentToRender=<Manage/>
  }

  return (
    <Main>


    <div className="w-full mt-4 ml-4">
      <div className="flex border-b border-gray-300">
        <div
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 0
              ? 'text-green-500 border-b-2 border-green-500 transition-all duration-300'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick(0)}
        >
          Manage
        </div>
        <div
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 1
              ? 'text-green-500 border-b-2 border-green-500 transition-all duration-300'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick(1)}
        >
          Rank
        </div>
        <div
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 2
              ? 'text-green-500 border-b-2 border-green-500 transition-all duration-300'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick(2)}
        >
          Promote
        </div>
      </div>
    
    </div>
    {
        componentToRender
      }
    </Main>
  );
}

export default CustomTabs;



// import React, { useEffect, useState } from "react";
// import Main from "../main/Main";
// import axios from "axios";
// import { AppContext } from "@/components/context/UserContext";
// import { SchoolSharp } from "@mui/icons-material";
// import * as yup from "yup";
// import { useFormik } from "formik";


// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import FindStudent from "./findStudent";

// const Page = () => {
//   const { decodedToken } = React.useContext(AppContext);
//   const [teacherView, setTeacherView] = useState([]);
//   const [schoolss, setSchoolss] = useState([]);
//   // const[searchId, setSearchId]= useState();
//   // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const school = await axios.get(
//           `http://localhost:3333/grade/get/`
//         );
       
//         setSchoolss(school.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [decodedToken]);

//   const formik = useFormik({
//     initialValues: {
//       searchId: "",
//       selectedSection: "",
//       subject: "",
//       semester: "",
//     },
//     onSubmit: async (values) => {
//       try {
//         if (
//           formik.values.searchId &&
//           formik.values.selectedSection 
 
//         ) {
//           const res = await axios.get(
//             `http://localhost:3333/students/getstu/${decodedToken?.school_Id}/${formik.values.searchId}/${formik.values.selectedSection}`
//           );
//           setTeacherView(res.data);
//         } else {
//           toast.error("Please Select all fields!");
//         }

//         // router.push('/head')
//       } catch (error: any) {
//         // Handle error (e.g., display error message)
//         // console.error("Error submitting form:", error?.response.data.message);
//       }
//     },
//   });

//   const sectionToDisplay= schoolss?.filter((s)=>s.id==parseInt(formik.values.searchId))

//    console.log("this is the ",teacherView)
//   //  console.log("Students: ", filteredResult[0].student )
//   return (
//     <Main>
      
//       <div className="w-full  flex flex-col justify-around  items-center mt-10">




//    <form onSubmit={formik.handleSubmit} className="w-full  flex justify-center items-center ">
  
//    <div className=" px-4">
//               <div className="relative w-full mb-3">
//                 <label
//                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                   htmlFor="grid-password">
//                   Select Grade Level
//                 </label>
//                 <select
//                   id="yourSelect"
//                   name="searchId"
//                   value={formik.values.searchId}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                 
//                  <option  value="">choose Grade level</option>;
//                  {
//                   schoolss?.map(s=>{
//                     return <option value={s.id}>Grade {s.grade}</option>
//                   })
//                  }
                  
                  
          
           
//                 </select>
//               </div>


//             </div>

//             <div className=" px-4">
//               <div className="relative w-full mb-3">
//                 <label
//                   className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                   htmlFor="grid-password">
//                   Select Section
//                 </label>
//                 <select
//                   id="yourSelect"
//                   name="selectedSection"
//                   value={formik.values.selectedSection}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
//                   <option value="">Select Section</option>
//                   {
                  
//                   sectionToDisplay[0]?.section.map(s=>{
//                     return  <option value={s.id}>Section {s.name}</option>;
//                   })

//                   }
          
                 
//                 </select>
//               </div>
//             </div>


//             <button
//                 type="submit"
//                 className=" mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 // Handle submission of all results here
//               >
//                 Find Students
//               </button>
//    </form>

//  <br/>
//    {

// teacherView.length > 0 ? (
//   <FindStudent
//     teacherView={teacherView}
//     sectionToDisplay={sectionToDisplay}

//   />
// ):<div className="flex flex-col justify-center items-center gap-3 lg:mt-16">
//   <img src="/no data no bg.png"  className="w-[250px]" />
//    <p className="text-xl">No Result Found</p>
//    <p className="text-center">Lorem ipsum dolor sit amet consectetur<br/> adipisicing elit. At, quia!</p>
// </div>

//    }



//    </div>

//    <ToastContainer
//      position="bottom-right"
//      autoClose={5000}
//      hideProgressBar={false}
//      newestOnTop={false}
//      closeOnClick
//      rtl={false}
//      pauseOnFocusLoss
//      draggable
//      pauseOnHover
//      theme="light"
//    />
   
//     </Main>
//   );
// };

// export default Page;

