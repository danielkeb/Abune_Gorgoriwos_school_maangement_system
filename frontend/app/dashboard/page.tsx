'use client'
import React from 'react'
import Main from './main/Main'
import Page from './Chart/page'

const Dashboard = () => {
  return (
    <Main>
  
  <div className='flex justify-center text-center text-3xl h-full items-center'>
    <Page/>
    </div>
    </Main>
  
  )
}

export default Dashboard