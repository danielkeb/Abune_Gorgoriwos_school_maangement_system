"use client";
import React, { useContext, useEffect, useState } from "react";
import StudentCertificate from "./studentcertificate";
import SectionRank from "./backup";
import Main from "../main/Main";
import MadeWithLove from "./madeWithLove";
import { AppContext } from "@/components/context/UserContext";
import axios from "axios";
import { useFormik } from "formik";

const HomePage = () => {
  const [navigate, setNavigate] = useState(1);
  const [history, setHistory] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const { decodedToken, token, logout } = useContext(AppContext);
  let renderComponent;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/students/student_history/${decodedToken?.sub}`
        );

        const data = response.data;
        //console.log('data ',data);
        setHistory(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      
      gender: ""
    },
      
    onSubmit: async (values) => {
      
    },


  });


  console.log("gender value",formik.values.gender)

  if (formik.values.gender){
    console.log("it's happ")
    const studentData= history.filter((item:any) => item.id == parseInt(formik.values.gender));
     renderComponent= <MadeWithLove studentData={studentData} />
  }else if(!formik.values.gender){
    renderComponent= <StudentCertificate />
  }
  


  // if (navigate == 1) {
  //   renderComponent = <StudentCertificate id="123456789" />;
  // }

  return (
    <Main>
      <div className="mt-5 w-full md:w-[80%] flex flex-col md:flex-row md:justify-end md:mt-5">

       
        
      
        <div className="w-full md:w-[20%] px-4">
          <div className="relative mb-3 box-shadow">
            <select
              id="yourSelect"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400">
              <option value=""  >
                This year certificate
              </option>

              {history.map((his) => (
                <option key={his?.id} value={his?.id}>
                  Grade {his?.gradeId}
                </option>
              ))}
            </select>
          </div>
        </div>


        </div>
      
      

      

      {renderComponent }
    </Main>
  );
};

export default HomePage;
