'use client'
import React, { useEffect, useState } from 'react'
import Main from '../../main/Main'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "@/components/context/UserContext";




const page = () => {
    const [teachers, setTeachers] = useState([]);
    const [schoolss, setSchoolss] = useState([]);
    const [disData, setDisData]=useState()
    const [selectedFileName, setSelectedFileName] = useState("");
    const [check, setCheck] = useState(false);
    const router = useParams();
    const { decodedToken } = React.useContext(AppContext);
  
    const { id } = router;

    useEffect(() => {
      const fetchData = async () => {
        try {
        
      
          const res = await axios.get(`http://localhost:3333/auth/single_admins/${id}`);
          const school = await axios.get("http://localhost:3333/schools/get");
          // const result = await response.json();
          setSchoolss(school.data);
          setTeachers(res.data);
          console.log("the hulk",res.data)
          formik.setValues({
            email: res.data[0].email,
            frist_name: res.data[0].frist_name,
            status: res.data[0].status, 
            middle_name: res.data[0].middle_name,
            last_name: res.data[0].last_name,
            address: res.data[0].address,
            username: res.data[0].username,
            phone: res.data[0].phone,
            gender: res.data[0].gender,
            date_of_birth: res.data[0].date_of_birth,
            school_name:res.data[0].school_Id,
            image:res.data[0].image,
            photo:res.data[0].image
   
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [check]);
    

    
    


   
  const formik = useFormik({
    initialValues: {
      email: '',
      frist_name: "",
      status:"",
      middle_name: "",
      last_name: "",
      address: "",
      username: "",
      phone: "",
      gender: "",
      date_of_birth: "",
      school_name: "",
      image:"",
      photo:""

    },
    onSubmit: async (values) => {

      try {
        setCheck(true);
        console.log("final values =", formik.values)
        const formData = new FormData();
        Object.keys(values.image).forEach((key) => {
          formData.append(key, values.image as any);
        });
        const response = await axios.patch(
            `http://localhost:3333/auth/single_admin_update/${id}`,
            formik.values,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

        toast.success("Admin record Updated ");
        // router.push('/head')
      } catch (error:any) {
        toast.error(error?.response?.data.message);
      }
      setCheck(false);
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .optional(),
      frist_name: yup.string().optional(),
      middle_name: yup.string().optional(),
      last_name: yup.string().optional(),
      address: yup.string().optional(),
      username: yup.string().optional(),
      phone: yup.string().optional(),
      gender: yup.string().optional(),
      date_of_birth: yup.string().optional(),
    }),
  });


   console.log("if I get it", disData);
  return (
    <Main>
      <div className='flex flex-col justify-center items-center mt-5 '>
   <div className="flex-auto px-4 lg:px-10 py-10 pt-0 w-[70%] bg-white boxshadow">
            <form onSubmit={formik.handleSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Director Information
              </h6>

              <img src={`http://localhost:3333/${formik.values.photo}`}  className='w-[200px] h-[200px] rounded-full boxshadow' />
              <br/>
              <div className="flex flex-wrap">
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
                  </div>
                </div>
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
                      placeholder={formik.values.email}
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Teacher Contact Information
              </h6>
              <div className="flex flex-wrap">
                
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
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Select school
                    </label>
                    <select
                      id="yourSelect"
                      name="school_name"
                      value={formik.values.school_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full focus:border-2 focus:border-gray-400">
                      <option value="">Select a school</option>
                      {schoolss.map(
                        (school: {
                          school_name: string;
                          id: number;
                          school_address: string;
                        }) => (
                          <option key={school.id} value={school.id}>
                            {school.school_name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Status
                    </label>
                    <select
                      id="yourSelect"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none  w-full  focus:border-2 focus:border-gray-400">
                      <option value="" disabled>
                       Status
                      </option>
                     
                       <option value="active" >Active</option>
                       <option value="inactive" >Inactive</option>
                  
                    </select>
                  </div>
                </div>
                <br/>

       
             

              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <br />
              <div className="flex flex-wrap ">
                <div className="w-full lg:w-12/12 px-4 ">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Change Image
                    </label>
                    <label
                      className="w-full   p-5 flex justify-center items-center "
                      htmlFor="photo">
                      {selectedFileName ? (
                        <span className="text-green-700">
                          {selectedFileName}
                        </span>
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

              <div className='flex justify-end items-center'>
              <button  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4">
              { check? <>
              
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
         </svg>  Updating  ...</>:"Update"}
              </button>
              </div>

            </form>

           
          </div>
          <br/>


          
          </div>
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
    </Main>

  )
}

export default page
