"use client"
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const MainListItems = ()=>{
const path= usePathname()
  // console.log("the path name is :", path)
  return(
  <React.Fragment>
    <Link href="/dashboard/">
    <div className={`${path=="/dashboard"?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      <ListItemIcon>
        <DashboardIcon className={`${path=="/dashboard"? " text-white":""}`} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </div>

    </Link>
  

    <Link href="/dashboard/register">
    <div className={`${path.startsWith("/dashboard/register")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <ShoppingCartIcon className={`${path.startsWith("/dashboard/register")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="Registration" />
  
    </div>
    
    </Link>
   
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Roles" />
    </ListItemButton>

    <Link href="/dashboard/classes">
    <div className={`${path.startsWith("/dashboard/classes")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <AssignmentIcon className={`${path.startsWith("/dashboard/classes")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="classes" />
  
    </div>
    
    </Link>
    <Link href="/dashboard/section">
    <div className={`${path.startsWith("/dashboard/section")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <AssignmentIcon className={`${path.startsWith("/dashboard/section")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="sections" />
  
    </div>
    
    </Link>
    <Link href="/dashboard/subjects">
    <div className={`${path.startsWith("/dashboard/subject")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <AssignmentIcon className={`${path.startsWith("/dashboard/subject")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="subjects" />
  
    </div>
    
    </Link>
    
    <Link href="/dashboard/grades">
    <div className={`${path.startsWith("/dashboard/grades")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <ShoppingCartIcon className={`${path.startsWith("/dashboard/grades")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="Grades" />
  
    </div>
    
    </Link>

    <Link href="/dashboard/certificate">
    <div className={`${path.startsWith("/dashboard/certificate")?"bg-green-950 hover:bg-green-950 text-white":""} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
      
      <ListItemIcon>
        <ShoppingCartIcon className={`${path.startsWith("/dashboard/certificate")? " text-white":""}`}  />
      </ListItemIcon>
      <ListItemText primary="Certification" />
  
    </div>
    
    </Link>

  </React.Fragment>

  )
}

export default MainListItems;

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );

// "use client"
// import * as React from 'react';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import DashboardIcon from '@mui/icons-material/Dashboard'; // Import DashboardIcon
// import { ShoppingCartIcon } from '@heroicons/react/20/solid';

// // Define roles
// const ROLES = {
//   STUDENT: 'student',
//   ADMIN: 'admin',
//   TEACHER: 'teacher',
//   SUPER_ADMIN: 'super_admin',
// };

// const MainListItems = ({ userRole }) => {
//   const path = usePathname();

//   // Function to check if the current user has access to a certain route
//   const hasAccess = (allowedRoles) => allowedRoles.includes(userRole);

//   return (
//     <React.Fragment>
//       <Link href="/dashboard">
//         <div className={`${path == '/dashboard' ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
//           <ListItemIcon>
//             <DashboardIcon className={`${path == '/dashboard' ? ' text-white' : ''}`} />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </div>
//       </Link>

//       {/* Registration route accessible only to admins */}
//       {hasAccess([ROLES.ADMIN]) && (
//         <Link href="/dashboard/register">
//           <div className={`${path.startsWith('/dashboard/register') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
//             <ListItemIcon>
//               <ShoppingCartIcon className={`${path.startsWith('/dashboard/register') ? ' text-white' : ''}`} />
//             </ListItemIcon>
//             <ListItemText primary="Registration" />
//           </div>
//         </Link>
//       )}

//       {/* Grades route accessible only to teachers and admins */}
//       {hasAccess([ROLES.TEACHER, ROLES.ADMIN]) && (
//         <Link href="/dashboard/grades">
//           <div className={`${path.startsWith('/dashboard/grades') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
//             <ListItemIcon>
//               <ShoppingCartIcon className={`${path.startsWith('/dashboard/grades') ? ' text-white' : ''}`} />
//             </ListItemIcon>
//             <ListItemText primary="Grades" />
//           </div>
//         </Link>
//       )}

//       {/* Certification route accessible only to students and admins */}
//       {hasAccess([ROLES.STUDENT, ROLES.ADMIN]) && (
//         <Link href="/dashboard/certificate">
//           <div className={`${path.startsWith('/dashboard/certificate') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
//             <ListItemIcon>
//               <ShoppingCartIcon className={`${path.startsWith('/dashboard/certificate') ? ' text-white' : ''}`} />
//             </ListItemIcon>
//             <ListItemText primary="Certification" />
//           </div>
//         </Link>
//       )}
//     </React.Fragment>
//   );
// };

// export default MainListItems;
