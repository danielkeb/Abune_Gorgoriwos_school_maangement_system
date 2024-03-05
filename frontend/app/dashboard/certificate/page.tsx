'use client'
import React from "react";
import StudentCertificate from "./studentcertificate";
import SectionRank from "./backup";
import Main from "../main/Main";

const HomePage: React.FC = () => {
  return (
    <Main>

   
    <StudentCertificate id="123456789" />
    </Main>
    //  <SectionRank/>
  );
};

export default HomePage;
