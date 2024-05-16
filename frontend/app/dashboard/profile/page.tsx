import Head from 'next/head';
import Image from 'next/image';
import Main from '../main/Main';

function StudentProfileSettings() {
  return (
    //   <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
  // <Head>
  //   <title className='text-black'>Student Profile Settings</title>
  // </Head>

// this is the profile
 <Main>

<div className="flex flex-row bg-white justify-center">
    <div className="w-2/3 bg-gray-100 p-4 shadow-2xl ">
      
      <div className="flex">
      <Image
        src="/avatar.jpeg"
        alt="Profile Picture"
        width={100}
        height={10}
        className="rounded-full"
      />
      <div className="flex flex-col">
      <h3 className="text-black  py-0 px-5 rounded mt-4">jhon doe</h3>
      <a className="text-black  py-0 px-5 rounded mt-4">
        Change Profile Picture
      </a></div></div>

      <div className="flex flex-col mb-4">
        <label className="text-gray-700" htmlFor="displayName">
          Display Name
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>jhon Doe</div>
       
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-gray-700" htmlFor="guardianEmail">
          Guardian Email
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>jhon..doe@example.com</div>
        
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-gray-700" htmlFor="guardianPhone">
          Guardian Phone
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>+2514658906787</div>
       
      </div>

      <div className=" flex flex-col mb-4">
        <div className="date">
        <label className="text-gray-700" htmlFor="guardianPhone">
         Date of birth
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>01/01/2001</div>
        </div>
        <div className="nationality">
         <label className="text-gray-700" htmlFor="guardianPhone">
        Nationality
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>Ethiopian</div>
       </div>
      </div>

      <div className="flex flex-col mb-4">
        <label className="text-gray-700" htmlFor="guardianPhone">
          Home address
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>123main st, debre birhan, Ethiopia</div>
       
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700" htmlFor="guardianPhone">
          Emergency contact
        </label>
        <div className='w-full p-2 pl-10 text-sm bg-gray-300 text-gray-700'>+251976587609</div>
      </div>
     
      

     
    </div>

    
         
   
    
  </div>
 </Main>
  
// </div>
);
}

export default StudentProfileSettings;