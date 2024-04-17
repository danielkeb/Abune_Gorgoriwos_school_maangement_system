"use client";
import React, { useState } from 'react';
import Main from '../main/Main';
import Manage from './manage';
import GradeSubject from './gradeSubject';

function CustomTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  let componentToRender;
  if(activeTab==0){
    componentToRender=<Manage/>
  }else if(activeTab==1){
    componentToRender=<GradeSubject/>
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
          Manage Teachers
        </div>
        <div
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 1
              ? 'text-green-500 border-b-2 border-green-500 transition-all duration-300'
              : 'text-gray-600'
          }`}
          onClick={() => handleTabClick(1)}
        >
          Grade and Subjects
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