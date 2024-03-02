"use client"

import React, { useEffect, useState } from 'react'
import Main from '../main/Main'
import axios from 'axios';
import { AppContext } from '@/components/context/UserContext';

const page = () => {
    const{decodedToken,token, logout}= React.useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const school = await axios.get(`http://localhost:3333/teachers/grade/${decodedToken?.sub}`);
            setSchoolss(school.data);
           
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

      
    
      const [schoolss, setSchoolss] = useState([]);

      const[hold, setHold ]= useState({
        "schoolId":0,
        "grade":0,
        "section":0,
        "subject":0
      })
      const handleDivClick = () => {
        // Update the state when the div is clicked
        setHold({
          "schoolId": 2,
          "grade": 4,
          "section": 5,
          "subject": 6
        });
      };
    //   console.log(schoolss)
  return (
   <Main>
    <div className=''>
<h2 className='font-bold text-center mb-4 mt-8'>Pick a Section Here</h2>


<div className='flex justify-center items-center gap-3'>
        {
            schoolss[0]?.subject.map(s=>{
                return  <div  key={s.id} className='shadow w-[500px] h-[300] text-center text-lg '>
                { s.name}  Grade{s.gradeId}
                <div className="w-full lg:w-6/12 px-4 ">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Section
                    </label>
                    <select
                      id="yourSelect"
                      name="gender"
            
                      className=" w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
              
                      {
                          schoolss[0]?.section.filter((section) => section.gradeId === s.gradeId).map(sec=>{
                            return  <option  onClick={handleDivClick} key={sec.id} className='shadow w-[200px] h-[100px] text-center text-lg '>
                          Section  { sec.name}
                          </option>
                        })
                        
                      }
            
                    
                    </select>
                  </div>
            
                  <button  onClick={()=>console.log("yahuuu",hold)}   className="bg-green-950 mt-2 mb-6 border-0 justify-center text-white w-full p-1  rounded-md">
             
              
                View
              </button>
          
                </div>
                
              </div>
            })
            

   
        }

        



 
  
      </div>

      <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Grade</th>
            <th className="py-2 px-4 border-b">Section</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">1</td>
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">A</td>
            <td className="py-2 px-4 border-b">A1</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">2</td>
            <td className="py-2 px-4 border-b">Jane Doe</td>
            <td className="py-2 px-4 border-b">B</td>
            <td className="py-2 px-4 border-b">B1</td>
          </tr>
        </tbody>
      </table>
    </div>


      </div>

   </Main>

  )
}

export default page
