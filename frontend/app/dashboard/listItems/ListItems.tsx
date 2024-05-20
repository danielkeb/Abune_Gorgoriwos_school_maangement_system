'use client'
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import from 'next/navigation'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AppContext, AppWrapper } from '@/components/context/UserContext';
import { useEffect, useState } from 'react';
import GradingIcon from '@mui/icons-material/Grading';
import RecipeReviewCard from '../main/custom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SchoolList from '../main/schools';
import SubjectIcon from '@mui/icons-material/Subject';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';




// Define roles
const ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  SUPER_ADMIN: 'superadmin',
};

const MainListItems: React.FC = () => {
  const path = usePathname(); // Use usePathname instead of useRouter
  const { decodedToken } = React.useContext(AppContext); // Access decodedToken from context
const [userRole, setUserRole]= useState('');
  // Get user role from decoded token
  useEffect(() => {
    setUserRole(decodedToken?.role || '');
  }, [decodedToken])
  

  // Function to check if the current user has access to a certain route
  const hasAccess = (allowedRoles: string[]) =>
    allowedRoles.some((role) => role === userRole);

  return (
    <React.Fragment>
      {/* Dashboard */}
      <Link href="/dashboard">
        <div className={`${path === '/dashboard' ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
          <ListItemIcon>
            <DashboardIcon className={`${path === '/dashboard' ? ' text-white' : ''}`} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </div>
      </Link>

      
      {/* Registration route accessible only to super admin */}
      {userRole && userRole === ROLES.SUPER_ADMIN && (
        <React.Fragment>
        <Link href="/dashboard/register">
          <div className={`${path.startsWith('/dashboard/register') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <ShoppingCartIcon className={`${path.startsWith('/dashboard/register') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </div>
        </Link>

   
        <RecipeReviewCard/>
</React.Fragment>
      )}

      {/* Roles route accessible only to super admin */}
      {userRole && userRole === ROLES.SUPER_ADMIN && (
        <Link href="/dashboard/roles">
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Roles" />
          </ListItemButton>
        </Link>
      )}
   
      {/* Grades route accessible only to admin and teacher */}
      {userRole && (userRole === ROLES.TEACHER) && (
        <React.Fragment>
        <Link href="/dashboard/grades">
          <div className={`${path.startsWith('/dashboard/grades') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <GradingIcon className={`${path.startsWith('/dashboard/grades') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Grades" />
          </div>
        </Link>
        

</React.Fragment>
      )}

        {userRole && (userRole === ROLES.TEACHER) && (
        <Link href="/dashboard/courseMaterials">
          <div className={`${path.startsWith('/dashboard/courseMaterials') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <PictureAsPdfIcon className={`${path.startsWith('/dashboard/courseMaterials') ? ' text-white' : ''}`}  />
            </ListItemIcon>
            <ListItemText primary="Materials" />
          </div>
        </Link>
        
      )}

{userRole && (userRole === ROLES.TEACHER) && (

<Link href="/dashboard/readingmaterials">
<div className={`${path.startsWith('/dashboard/readingmaterials') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
  <ListItemIcon>
    <AutoStoriesIcon className={`${path.startsWith('/dashboard/readingmaterials') ? ' text-white' : ''}`} />
  </ListItemIcon>
  <ListItemText primary="study materials" />
</div>
</Link>
        
      )}

      {/* Classes, Sections, and Subjects accessible only to admin and teacher */}
      {userRole && (userRole === ROLES.ADMIN) && (
        <React.Fragment>
          <AppWrapper><RecipeReviewCard/></AppWrapper>
          <Link href="/dashboard/teachers">
            <div className={`${path.startsWith("/dashboard/teachers") || path.startsWith("/dashboard/teachup")  ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <PeopleIcon className={`${path.startsWith("/dashboard/teachers") || path.startsWith("/dashboard/teachup") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </div>
          </Link>
          <Link href="/dashboard/classes">
            <div className={`${path.startsWith("/dashboard/classes") ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <MeetingRoomIcon className={`${path.startsWith("/dashboard/classes") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </div>
          </Link>

          <Link href="/dashboard/register">
          <div className={`${path.startsWith('/dashboard/register') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <HowToRegIcon className={`${path.startsWith('/dashboard/register') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </div>
        </Link>
          
          <Link href="/dashboard/section">
            <div className={`${path.startsWith("/dashboard/section") ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <EventSeatIcon className={`${path.startsWith("/dashboard/section") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Sections" />
            </div>
          </Link>
          <Link href="/dashboard/subjects">
            <div className={`${path.startsWith("/dashboard/subjects") ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <SubjectIcon className={`${path.startsWith("/dashboard/subjects") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Subjects" />
            </div>
          </Link>
          
        </React.Fragment>
      )}

      {/* Certification route accessible only to admin and student*/}
      {userRole && (userRole === ROLES.STUDENT) && (
        <React.Fragment>
        <Link href="/dashboard/certificate">
          <div className={`${path.startsWith('/dashboard/certificate') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <CardMembershipIcon className={`${path.startsWith('/dashboard/certificate') ? ' text-white' : ''}`} />
            </ListItemIcon>

            <ListItemText primary="Certification" />
          </div>
        </Link>
        

      <Link href="/dashboard/readingmaterials">
          <div className={`${path.startsWith('/dashboard/readingmaterials') ? 'bg-green-700 hover:bg-green-700 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <AutoStoriesIcon className={`${path.startsWith('/dashboard/readingmaterials') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="study materials" />
          </div>
        </Link>
      </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MainListItems;
