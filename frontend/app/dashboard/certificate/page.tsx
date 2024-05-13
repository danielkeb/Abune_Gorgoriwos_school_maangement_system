'use client'
import React, { useContext, useEffect, useState } from "react";
import StudentCertificate from "./studentcertificate";
import SectionRank from "./backup";
import Main from "../main/Main";
import MadeWithLove from "./madeWithLove";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";

const HomePage= () => {
  const[history, setHistory]=useState([])
  const{decodedToken,token, logout}= useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/students/student_history/${decodedToken?.sub}`,

        );
    
        const data =  response.data
        //console.log('data ',data);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Main>
<div className=" mt-5 w-full md:w-[80%] flex flex-col md:flex-row md:justify-end md:mt-5">
  <div className="w-full md:w-[20%] px-4">
    <div className="relative mb-3 box-shadow">
      <select
        id="yourSelect"
        name="gender"
        value="Grade 1"
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400"
      >
        <option value="" disabled>
          Select an option
        </option>



        {history.map(
                        (his) => (
                          <option key={his?.id} value={his?.id}>
                            Grade {his?.gradeId}
                          </option>
                        )
                      )}
      </select>
    </div>
  </div>
</div>
   
    <StudentCertificate  />
    </Main>
    //  <SectionRank/>
  );
};

export default HomePage;
