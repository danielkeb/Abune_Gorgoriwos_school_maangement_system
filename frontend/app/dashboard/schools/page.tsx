'use client'
import React from 'react'
import A from './schoolData';
import Main from '../main/Main';
import AdmissionRateLineChart from './admissionrate';
import DummyData from './dumydata';

const Dashboard = () => {
  return (
    <Main>
      <div className='m-20'>
    <A/>
    {/* <AdmissionRateLineChart/> */}
    <DummyData/>

    </div>
    </Main>
  
  )
}

export default Dashboard