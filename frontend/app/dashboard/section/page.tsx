"use client"
import Main from "../main/Main";
import React, { useState } from "react";
import SectionUpdate from "./manage";
import SectionComponent from "./section";

const Page= ()=> {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex:any) => {
      setActiveTab(tabIndex);
    };
    let componentToRender;
    if(activeTab==0){
      componentToRender=<SectionUpdate/>
    }else if(activeTab==1){
      componentToRender=<SectionComponent/>
    }
    return (
        <Main>
        <div className="w-full mt-4 flex gap-3 ml-4">
       
          <button
            className="bg-green-700 hover:bg-green-500 text-white  py-2 px-4 rounded"
            onClick={() => handleTabClick(0)}
          >
            Manage class
          </button>
          <button
            className="border border-gray-700 py-2 px-4 rounded"
            onClick={() => handleTabClick(1)}
          >
            Create new class
          </button>
         
  
      
      </div>
      {
          componentToRender
        }
      </Main>
    )
}
export default Page;