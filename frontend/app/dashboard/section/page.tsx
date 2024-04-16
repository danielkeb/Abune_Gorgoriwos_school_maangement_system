"use client"
import Main from "../main/Main";
import React, { useState } from "react";
import SectionUpdate from "./manage";
import SectionComponent from "./section";

const Page= ()=> {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex) => {
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
            Manage class
          </div>
          <div
            className={`py-2 px-4 cursor-pointer ${
              activeTab === 1
                ? 'text-green-500 border-b-2 border-green-500 transition-all duration-300'
                : 'text-gray-600'
            }`}
            onClick={() => handleTabClick(1)}
          >
            Create new class
          </div>
         
          
        </div>
      
      </div>
      {
          componentToRender
        }
      </Main>
    )
}
export default Page;