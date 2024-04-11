<<<<<<< HEAD
"use client";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import GradingIcon from "@mui/icons-material/Grading";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RecipeReviewCard from "../main/custom";

const MainListItems = () => {
  const path = usePathname();
  // console.log("the path name is :", path)
  return (
    <React.Fragment>
       
      <Link href="/dashboard/">
        <div
          className={`${
            path == "/dashboard"
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <DashboardIcon
              className={`${path == "/dashboard" ? " text-white" : ""}`}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </div>
      </Link>
      <RecipeReviewCard />
      <Link href="/dashboard/register">
        <div
          className={`${
            path.startsWith("/dashboard/register")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <AppRegistrationIcon
              className={`${
                path.startsWith("/dashboard/register") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Registration" />
        </div>
      </Link>
      <Link href="/dashboard/grades">
        <div
          className={`${
            path.startsWith("/dashboard/grades")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <GradingIcon
              className={`${
                path.startsWith("/dashboard/grades") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Grades" />
        </div>
      </Link>

      <Link href="/dashboard/certificate">
        <div
          className={`${
            path.startsWith("/dashboard/certificate")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <CardMembershipIcon
              className={`${
                path.startsWith("/dashboard/certificate") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Certification" />
        </div>
      </Link>

      <Link href="/dashboard/section">
        <div
          className={`${
            path.startsWith("/dashboard/section")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <CardMembershipIcon
              className={`${
                path.startsWith("/dashboard/section") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Section" />
        </div>
      </Link>

      <Link href="/dashboard/subjects">
        <div
          className={`${
            path.startsWith("/dashboard/subjects")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <CardMembershipIcon
              className={`${
                path.startsWith("/dashboard/subjects") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Subject" />
        </div>
      </Link>

      <Link href="/dashboard/promote">
        <div
          className={`${
            path.startsWith("/dashboard/promote")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <PeopleIcon
              className={`${
                path.startsWith("/dashboard/promote") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Promote Students" />
        </div>
      </Link>

      <Link href="/dashboard/classes">
        <div
          className={`${
            path.startsWith("/dashboard/classes")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <CardMembershipIcon
              className={`${
                path.startsWith("/dashboard/classes") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </div>
      </Link>

      {/* <Link href="/dashboard/students">
        <div
          className={`${
            path.startsWith("/dashboard/students")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <PeopleIcon
              className={`${
                path.startsWith("/dashboard/students") ? " text-white" : ""
              }`}
            />
=======
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
import { AppContext } from '@/components/context/UserContext';

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

  // Get user role from decoded token
  const userRole = decodedToken?.role || '';

  // Function to check if the current user has access to a certain route
  const hasAccess = (allowedRoles: string[]) =>
    allowedRoles.some((role) => role === userRole);

  return (
    <React.Fragment>
      {/* Dashboard */}
      <Link href="/dashboard">
        <div className={`${path === '/dashboard' ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
          <ListItemIcon>
            <DashboardIcon className={`${path === '/dashboard' ? ' text-white' : ''}`} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </div>
      </Link>

      {/* Registration route accessible only to super admin */}
      {userRole && userRole === ROLES.SUPER_ADMIN && (
        <Link href="/dashboard/register">
          <div className={`${path.startsWith('/dashboard/register') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <ShoppingCartIcon className={`${path.startsWith('/dashboard/register') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Registration" />
          </div>
        </Link>
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
      {userRole && (userRole === ROLES.ADMIN || userRole === ROLES.TEACHER) && (
        <Link href="/dashboard/grades">
          <div className={`${path.startsWith('/dashboard/grades') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <ShoppingCartIcon className={`${path.startsWith('/dashboard/grades') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Grades" />
          </div>
        </Link>
      )}

      {/* Classes, Sections, and Subjects accessible only to admin and teacher */}
      {userRole && (userRole === ROLES.ADMIN || userRole === ROLES.TEACHER) && (
        <React.Fragment>
          <Link href="/dashboard/classes">
            <div className={`${path.startsWith("/dashboard/classes") ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <AssignmentIcon className={`${path.startsWith("/dashboard/classes") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Classes" />
            </div>
          </Link>
          <Link href="/dashboard/section">
            <div className={`${path.startsWith("/dashboard/section") ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <AssignmentIcon className={`${path.startsWith("/dashboard/section") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Sections" />
            </div>
          </Link>
          <Link href="/dashboard/subjects">
            <div className={`${path.startsWith("/dashboard/subjects") ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
              <ListItemIcon>
                <AssignmentIcon className={`${path.startsWith("/dashboard/subjects") ? ' text-white' : ''}`} />
              </ListItemIcon>
              <ListItemText primary="Subjects" />
            </div>
          </Link>
        </React.Fragment>
      )}

      {/* Certification route accessible only to admin and student*/}
      {userRole && (userRole === ROLES.STUDENT) && (
        <Link href="/dashboard/certificate">
          <div className={`${path.startsWith('/dashboard/certificate') ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
            <ListItemIcon>
              <ShoppingCartIcon className={`${path.startsWith('/dashboard/certificate') ? ' text-white' : ''}`} />
            </ListItemIcon>
            <ListItemText primary="Certification" />
          </div>
        </Link>
      )}

      {/* Students
      <Link href="/dashboard/students">
        <div className={`${path.startsWith("/dashboard/students") ? 'bg-green-950 hover:bg-green-950 text-white' : ''} flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full`}>
          <ListItemIcon>
            <PeopleIcon className={`${path.startsWith("/dashboard/students") ? ' text-white' : ''}`} />
>>>>>>> 03a21c85cc1d3fc5ff785bd806f6fd12fce92c58
          </ListItemIcon>
          <ListItemText primary="Students" />
        </div>
      </Link> */}

<<<<<<< HEAD
      <Link href="/dashboard/rank">
        <div
          className={`${
            path.startsWith("/dashboard/rank")
              ? "bg-green-950 hover:bg-green-950 text-white"
              : ""
          } flex justify-center items-center pb-2 pt-2 pl-4 hover:bg-gray-100 w-full  `}>
          <ListItemIcon>
            <PeopleIcon
              className={`${
                path.startsWith("/dashboard/rank") ? " text-white" : ""
              }`}
            />
          </ListItemIcon>
          <ListItemText primary="Rank" />
        </div>
      </Link>
=======
>>>>>>> 03a21c85cc1d3fc5ff785bd806f6fd12fce92c58
    </React.Fragment>
  );
};

export default MainListItems;
