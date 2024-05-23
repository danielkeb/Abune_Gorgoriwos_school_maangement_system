"use client"

import React, { useContext, useEffect, useState } from "react";
import RegistrationHead from "../reghead/RegistrationHead";
import Main from "../../main/Main";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "@/components/context/UserContext";

const page = () => {
  useEffect(() => {
    const fetchData = async () => {

  const res= localStorage.getItem('authToken')
  setAuthToken(res) 

    };

    fetchData();
  }, []);

  const[authToken, setAuthToken]= useState("")
  const[check, setCheck]= useState(false)
  const { decodedToken } = useContext(AppContext);
  console.log("token vale", authToken)
  const formik = useFormik({
    initialValues: {
      school_name: "",
      school_address: "",
      school_phone:"",
      date:""
    },
    onSubmit: async (values) => {
      try {
        setCheck(true)
        // console.log(formik.values);
        const response = await axios.post(
          `http://localhost:3333/schools/register`,
          formik.values,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        toast.success("School Registerd ")
        // router.push('/head')
      } catch (error:any) {
        // Handle error (e.g., display error message)
        // console.error("Error submitting form:", error?.response.data.message);
        toast.error(error?.response?.data.message);
      }
      setCheck(false)
    },
    validationSchema: yup.object({
      school_name: yup
        .string()
        .required("School Name is Required !"),
      school_address: yup
        .string()
        .required("School Address is Required !"),
      school_phone: yup
        .string()
        .required("School Phone is Required !"),
      date: yup
        .string()
        .required("School Phone is Required !"),
     
    }),
  });
  return (
    <div>
      <Main>
        <RegistrationHead>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form  onSubmit={formik.handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                School Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      School Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="Tebase AG"
                      name="school_name"
                      value={formik.values.school_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                    />
                         {formik.errors.school_name && (
                <small className="text-red-500 ">
                  {formik.errors.school_name}
                </small>
              )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      School Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="tebase 06/ Debrebrhan"
                      name="school_address"
                      value={formik.values.school_address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                   {formik.errors.school_address && (
                <small className="text-red-500 ">
                  {formik.errors.school_address}
                </small>
              )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      School Phone
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="+251 65245123"
                      name="school_phone"
                      value={formik.values.school_phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                    />
                          {formik.errors.school_phone && (
                <small className="text-red-500 ">
                  {formik.errors.school_phone}
                </small>
              )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Date
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                    />
                                       {formik.errors.school_phone && (
                <small className="text-red-500 ">
                  {formik.errors.school_phone}
                </small>
              )}
                  </div>
                </div>
              </div>

              <br />
              <button className="bg-green-700  border-0 text-white w-full p-3  rounded-md">
              { check? <>
              
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Submitting  ...</>:"Submit"}
              </button>
            </form>
            <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
          </div>
        </RegistrationHead>
      </Main>
    </div>
  );
};

export default page;
