// 'use client'

// // import React, { Fragment, useState } from 'react';
// // import { Dialog, Transition } from '@headlessui/react';

// // export default function Home() {
// //   const [isOpen, setIsOpen] = useState(false);

// //   function openDialog() {
// //     setIsOpen(true);
// //   }

// //   function closeDialog() {
// //     setIsOpen(false);
// //   }

// //   return (
// //     <>
// //       <div className="flex justify-center items-center h-screen">
// //         <button
// //           onClick={openDialog}
// //           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
// //         >
// //           Click Me
// //         </button>
// //       </div>

// //       <Transition.Root show={isOpen} as={Fragment}>
// //         <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeDialog}>
// //           <div className="flex items-center justify-center min-h-screen">
// //             <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

// //             <Transition.Child
// //               as={Fragment}
// //               enter="ease-out duration-300"
// //               enterFrom="opacity-0 scale-95"
// //               enterTo="opacity-100 scale-100"
// //               leave="ease-in duration-200"
// //               leaveFrom="opacity-100 scale-100"
// //               leaveTo="opacity-0 scale-95"
// //             >
              
// //               <div className="bg-white rounded-lg p-6 max-w-md mx-auto z-10">
// //                 <Dialog.Title className="text-lg font-semibold mb-2">Popup Message</Dialog.Title>
// //                 <p className="mb-4">This is a popup message.</p>
// //                 <button
// //                   onClick={closeDialog}
// //                   className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </Transition.Child>
// //           </div>
// //         </Dialog>
// //       </Transition.Root>

      
// //     </>
// //   );
// // }
// import { Menu, Transition } from '@headlessui/react'
// import { Fragment, useEffect, useRef, useState } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//   return (
//     <div className="fixed top-16 w-56 text-right">
//       <Menu as="div" className="relative inline-block text-left">
//         <div>
//           <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
//             Options
//             <ChevronDownIcon
//               className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
//               aria-hidden="true"
//             />
//           </Menu.Button>
//         </div>
//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
//             <div className="px-1 py-1 ">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <EditActiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <EditInactiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     )}
//                     Edit
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <DuplicateActiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <DuplicateInactiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     )}
//                     Duplicate
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <ArchiveActiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <ArchiveInactiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     )}
//                     Archive
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <MoveActiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <MoveInactiveIcon
//                         className="mr-2 h-5 w-5"
//                         aria-hidden="true"
//                       />
//                     )}
//                     Move
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//             <div className="px-1 py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={`${
//                       active ? 'bg-violet-500 text-white' : 'text-gray-900'
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     {active ? (
//                       <DeleteActiveIcon
//                         className="mr-2 h-5 w-5 text-violet-400"
//                         aria-hidden="true"
//                       />
//                     ) : (
//                       <DeleteInactiveIcon
//                         className="mr-2 h-5 w-5 text-violet-400"
//                         aria-hidden="true"
//                       />
//                     )}
//                     Delete
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </div>
//   )
// }

// function EditInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function EditActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function DuplicateInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 4H12V12H4V4Z"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//       <path
//         d="M8 8H16V16H8V8Z"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function DuplicateActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 4H12V12H4V4Z"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//       <path
//         d="M8 8H16V16H8V8Z"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//     </svg>
//   )
// }

// function ArchiveInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="8"
//         width="10"
//         height="8"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//       <rect
//         x="4"
//         y="4"
//         width="12"
//         height="4"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//       <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
//     </svg>
//   )
// }

// function ArchiveActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="8"
//         width="10"
//         height="8"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//       <rect
//         x="4"
//         y="4"
//         width="12"
//         height="4"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//       <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
//     </svg>
//   )
// }

// function MoveInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
//       <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
//       <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
//     </svg>
//   )
// }

// function MoveActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }

// function DeleteInactiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="6"
//         width="10"
//         height="10"
//         fill="#EDE9FE"
//         stroke="#A78BFA"
//         strokeWidth="2"
//       />
//       <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
//       <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
//     </svg>
//   )
// }

// function DeleteActiveIcon(props) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="6"
//         width="10"
//         height="10"
//         fill="#8B5CF6"
//         stroke="#C4B5FD"
//         strokeWidth="2"
//       />
//       <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
//       <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
//     </svg>
//   )
// }
'use client';
import React from 'react';
import Main from '../main/Main';

const RichiHassan = () => {
  const richiHassan = {
    name: 'Rahel mulatu',
    gender: 'Female',
    fatherName: 'Kazi Fahimur Rahman',
    motherName: 'Richi Akon',
    dateOfBirth: '03/04/2010',
    religion: 'Islam',
    fatherOccupation: 'Businessman',
    email: 'richihasan@gmail.com',
    admissionDate: '05/04/2016',
    class: '2',
    section: 'A',
    roll: '2901',
    address: 'Ta-107 Sydenye, Australia',
    phone: '+88 255600',
  };

  return (
  <Main>
  {/* <div className="text-xl font-medium text-black bg-white border-b border-grey-200">{richiHassan.name} Details</div> */}
    <div className="w-full h-full opacity-75 p-6 bg-white rounded-xl shadow-md flex justify-around space-x-4">
      
      <div className="flex-shrink-0">
        <img className="h-30 w-30" src="/avatar.jpeg" alt="Logo" />
      </div>
      <div>
        <h3 className="relative text-4xl font-bold">About Me 
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-black"></span>
        </h3><br />
        <p className="text-gray-500 ">
          <span>Nmae: {richiHassan.name}</span><br /><br />
          <span>Gender: {richiHassan.gender}</span>
          <br /><br />
          <span>Father Name: {richiHassan.fatherName}</span>
          <br /><br />
          <span>Mother Name: {richiHassan.motherName}</span>
          <br /><br />
          <span>Date of Birth: {richiHassan.dateOfBirth}</span>
          <br /><br />
          <span>Religion: {richiHassan.religion}</span>
          <br /><br />
          <span>Father Occupation: {richiHassan.fatherOccupation}</span>
          <br /><br />
          <span>Email: {richiHassan.email}</span>
          <br /><br />
          <span>Admission Date: {richiHassan.admissionDate}</span>
          <br /><br />
          <span>Class: {richiHassan.class}</span>
          <br /><br />
          <span>Section: {richiHassan.section}</span>
          <br /><br />
          <span>Roll: {richiHassan.roll}</span>
          <br /><br />
          <span>Address: {richiHassan.address}</span>
          <br /><br />
          <span>Phone: {richiHassan.phone}</span>
          <br /><br />
        </p>
      </div>
      <div className='align-left'><button className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>Update</button></div>
    </div>
    </Main>
   
  );
};

export default RichiHassan;
