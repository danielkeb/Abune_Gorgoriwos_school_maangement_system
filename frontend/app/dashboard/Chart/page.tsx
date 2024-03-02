import React from "react";
import Students from "./studentNumberWithGenderCategory";
import Users from "./users";
import UserStatus from "./AllSchoolUsers";
import AspectsUser from "./trial";
import TotalData from "./totaldata";
import FemaleMale from "./femaleMale";
import Callendar from "./callendar";


const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto my-auto px-4 py-10">
    <TotalData />
    
    <div className="flex flex-col items-center mt-8 space-y-4">
    {/* <Callendar/> */}
      {/* <div className="flex flex-row space-x-4">
      
      
        <div className="mt-15 ml-0"><Students /></div>
        <div className="width: 2rem;"><FemaleMale/></div>
        <div className="mr-4"></div>
        
      </div> */}
    </div>
  
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div className="flex flex-col space-y-4">
        
        
      {/*<TotalData/>
      <Users />
      
        {/* <AspectsUser /> */}
        {/* <UserStatus /> */}
      </div>
    </div>
  
  </div>
  
  );
};

export default HomePage;
