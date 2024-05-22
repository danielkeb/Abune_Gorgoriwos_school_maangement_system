"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import RegistrationHead from "./reghead/RegistrationHead";
import Main from "../main/Main";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "@/components/context/UserContext";
import { redirect } from "next/navigation";
//import { AppContext } from "@/components/context/UserContext";

const page = () => {
  const { decodedToken } = useContext(AppContext);
  useLayoutEffect(() => {
   
    if(decodedToken?.role=="student" || decodedToken?.role=="teacher"){
      redirect("/dashboard")
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get("http://localhost:3333/grade/get");
        setSchoolss(school.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to check if the current user has access to a certain route

  const [schoolss, setSchoolss] = useState([]);
  const [sec, setSec] = useState([]);
  const [check, setCheck] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");


  const formik = useFormik({
    initialValues: {
      email: "",
      frist_name: "",
      middle_name: "",
      last_name: "",
      role: "student",
      address: "",
      username: "",
      image: null,
      phone: "",
      password: "1234",
      gender: "",
      date_of_birth: "",
      careOf_contact1: "",
      careOf_contact2: "",
      gradeId: 0,
      sectionId: 0,
    },
    onSubmit: async (values) => {
      try {
        setCheck(true);
        const formData = new FormData();

        // Append form values to formData
        Object.keys(values).forEach((key) => {
          if (key === "image" && values.image) {
            formData.append(key, values.image);
          } else {
            formData.append(key, values[key]);
          }
        });

        // Ensure gradeId and sectionId are appended as integers

        // Debugging: Log formData content
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }

        // Send formData via axios
        const response = await axios.post(
          `http://localhost:3333/auth/user/${decodedToken?.school_Id}/${formik.values.gradeId}/${formik.values.sectionId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("New Student Registered");
        // router.push('/head')
      } catch (error) {
        console.error("Error details:", error.response);
        toast.error(
          error?.response?.data?.message || "Error registering student"
        );
      }
      setCheck(false);
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required !"),
      frist_name: yup.string().required("First Name is Required !"),
      middle_name: yup.string().required("Middle Name is Required !"),
      last_name: yup.string().required("Last Name is Required !"),
      address: yup.string().required("Address is Required !"),
      username: yup.string().required("Username is Required !"),
      phone: yup.string().required("Phone number is Required !"),
      gender: yup.string().required("Gender is Required !"),
      date_of_birth: yup.string().required("Date of birth  is Required !"),
      gradeId: yup.number().required("Grade level is Required"),
      section: yup.number().notRequired(),
      careOf_contact1: yup.string().required("care of contact required"),
      careOf_contact2: yup.string().notRequired(),
    }),
  });

  const secc = schoolss.find(
    (school: any) => school.id == formik.values.gradeId
  );
  console.log("this is the magicc", secc?.section);
  return (
    <div>
      <Main>
        <RegistrationHead>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0  ">
            <form onSubmit={formik.handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Student Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.username && (
                      <small className="text-red-500 ">
                        {formik.errors.username}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="Kebede"
                      name="middle_name"
                      value={formik.values.middle_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.middle_name && (
                      <small className="text-red-500 ">
                        {formik.errors.middle_name}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="Abebe"
                      name="frist_name"
                      value={formik.values.frist_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.frist_name && (
                      <small className="text-red-500 ">
                        {formik.errors.frist_name}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                      placeholder="kebede"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.last_name && (
                      <small className="text-red-500 ">
                        {formik.errors.last_name}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Gender
                    </label>
                    <select
                      id="yourSelect"
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {formik.errors.gender && (
                      <small className="text-red-500 ">
                        {formik.errors.gender}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Date of birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      name="date_of_birth"
                      value={formik.values.date_of_birth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400"
                    />
                    {formik.errors.date_of_birth && (
                      <small className="text-red-500 ">
                        {formik.errors.date_of_birth}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Education Level
                    </label>
                    <select
                      id="yourSelect"
                      name="gradeId"
                      value={formik.values.gradeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                      <option>Select Grade Level</option>

                      {schoolss.map((school: any) => (
                        <option key={school.id} value={school?.id}>
                          {school?.grade}
                        </option>
                      ))}
                    </select>
                    {formik.errors.gradeId && (
                      <small className="text-red-500 ">
                        {formik.errors.gradeId}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Select section
                    </label>
                    <select
                      id="yourSelect"
                      name="sectionId"
                      value={formik.values.sectionId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                      <option>Available Sections {secc?.section.length}</option>

                      {secc?.section.map((school: any) => (
                        <option key={school.id} value={school?.id}>
                          {school?.name}
                        </option>
                      ))}
                    </select>
                    {formik.errors.section && (
                      <small className="text-red-500 ">
                        {formik.errors.section}
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Student Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="abebe@gmail.com"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.email && (
                      <small className="text-red-500 ">
                        {formik.errors.email}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="04 kebele"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.address && (
                      <small className="text-red-500 ">
                        {formik.errors.address}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      PHone
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="09562335"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.phone && (
                      <small className="text-red-500 ">
                        {formik.errors.phone}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Care of contact (1)
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="09562335"
                      name="careOf_contact1"
                      value={formik.values.careOf_contact1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.careOf_contact1 && (
                      <small className="text-red-500 ">
                        {formik.errors.careOf_contact1}
                      </small>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Care of contact (2)
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="09562335"
                      name="careOf_contact2"
                      value={formik.values.careOf_contact2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.errors.careOf_contact2 && (
                      <small className="text-red-500 ">
                        {formik.errors.careOf_contact2}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Photo (Optional)
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      upload image
                    </label>

                    <label
                      className="w-full bg-white p-5 flex justify-center items-center"
                      htmlFor="photo">
                      {selectedFileName ? (
                        <span className="text-green-700">{selectedFileName}</span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      )}
                    </label>
                    <input
                      type="file"
                      id="photo"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        formik.setFieldValue("image", file || null);
                        setSelectedFileName(file ? file.name : "");
                      }}
                    />
                  </div>
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="bg-green-700  border-0 text-white w-full p-3  rounded-md">
                Submit
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
