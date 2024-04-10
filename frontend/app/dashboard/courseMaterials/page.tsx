'use client'
import React from 'react';
import CourseMaterials from '../courseMaterials';
import Main from '../main/Main';
const Page=()=>{

    return (
        <Main>
        <div className="w-full  flex flex-col justify-around  items-center mt-10">
  
  
            <CourseMaterials/>
        </div>
        </Main>

    );
}
export default Page;