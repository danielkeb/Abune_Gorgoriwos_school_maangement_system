"use client";
import React, { useEffect, useState } from "react";
import Main from "../main/Main";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { SchoolSharp } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";
// import DisplayTable from "./displayTable";
import NewWay from "./newWay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {


    return (
      <Main>
        Grade . . . 
        </Main>

    );


  //  console.log("Students: ", filteredResult[0].student )

};

export default Page;
