"use client"
import Head from 'next/head';
import Image from 'next/image';
import Main from '../main/Main';
import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from '@/components/context/UserContext';
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function StudentProfileSettings() {

  const { decodedToken } = useContext(AppContext);
  const [call, setCall]= useState({});
  const [isClient, setIsClient] = useState(false);
  const [check, setCheck] = useState(false);
  // const[searchId, setSearchId]= useState();
  // const [selectedSection, setSelectedSection] = useState(); // State to store the selected section

  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(
          `http://localhost:3333/auth/user_detail/${decodedToken?.sub}/${decodedToken?.role}`
        );
        setCall(school.data);

  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [decodedToken]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
     
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setCheck(true);
        const response = await axios.patch(
          `http://localhost:3333/auth/user_update/${decodedToken?.sub}`,
          formik.values
        );
        setCall(prevCall => ({
          ...prevCall,
          user: {
            ...prevCall.user,
            username: values.username // Update the username
          }
        }));

        toast.success("profile Updated");
        // router.push('/head')
      } catch (error:any) {
        toast.error(error?.response?.data.message);
      }
      setCheck(false);
    },

  });
  function openDialog() {

    
    setIsOpen(true);
  }



  function closeDialog() {
    setIsOpen(false);
  }
  if (!isClient) {
    // While waiting for client-side rendering, return null or a loading spinner
    return null;
  }
  console.log("here is the call",call)
  return (
    <Main>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
    
        
        <div className="flex flex-col lg:flex-row justify-center mt-6 gap-6">
          <div className="w-full lg:w-1/3 bg-gray-100 max-h-[300px] p-4 boxshadow">
            <div className="flex flex-col items-center">
              <Image
                src="/avater-removebg-preview (1).png"
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-ful w-[200px] mt-[-10px]"
              />
              <h3 className="text-black py-2 text-lg rounded mt-[-30px] "><b>{call?.user?.frist_name} {call?.user?.middle_name} {call?.user?.last_name} </b></h3>
              
              <button onClick={() => openDialog()} className="text-white bg-blue-600 p-2 rounded ">
                Change Profile
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-gray-100 p-4 boxshadow">
            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="displayName">
               <b>Display Name</b> 
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">{call?.user?.username}</div>
            </div>
            {
                decodedToken?.role=="student" && <div className="flex flex-col mb-4">
                <label className="text-gray-700" htmlFor="displayName">
                 <b>Grade Level</b> 
                </label>
                <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">{call?.gradelevel?.grade} {call?.section?.name}</div>
              </div>
              }
              <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="guardianEmail">
               <b> Gender</b> 
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2   text-gray-700">{call?.user?.gender}</div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="guardianEmail">
               <b> Email</b> 
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2   text-gray-700">{call?.user?.email}</div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="guardianPhone">
               <b> Phone</b> 
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">{call?.user?.phone}</div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="dateOfBirth">
                <b>Date of Birth</b>
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">{call?.user?.date_of_birth}</div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="nationality">
               <b> Nationality</b>
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">Ethiopian</div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="homeAddress">
                <b>Home Address</b>
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">Debre Birhan, {call?.user?.address}</div>
            </div>
            {
              decodedToken?.role == 'teacher' && <div className="flex flex-col mb-4">
              <label className="text-gray-700" htmlFor="emergencyContact">
                <b>Education level</b>
              </label>
              <div className="w-full p-2 pl-10 text-sm border-b-2 text-gray-700">{call?.education_level}</div>
            </div>
            }

            
          </div>
        </div>

        <Transition.Root show={isOpen} as={Fragment}>
  <Dialog
    as="div"
    className="fixed z-10 inset-0 overflow-y-auto "
    onClose={closeDialog}>
    <div className="flex items-center justify-center min-h-screen ">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <div className="bg-white rounded-lg p-6 w-[500px] mx-auto z-10 ">
          <Dialog.Title className="text-lg font-semibold mb-2">
            Update Information
          </Dialog.Title>
          <form onSubmit={formik.handleSubmit}>

        
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 p-3 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Change Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-3 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button
          type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4">
           { check? <>
              
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Updating  ...</>:"Update"}
          </button>
          <button
          type="button"
            onClick={closeDialog}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
            Close
          </button>
          </form>

        </div>
      </Transition.Child>
    </div>
  </Dialog>
</Transition.Root>

      </div>
    </Main>
  );
}

export default StudentProfileSettings;
