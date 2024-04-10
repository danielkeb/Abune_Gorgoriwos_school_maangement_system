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
          </ListItemIcon>
          <ListItemText primary="Students" />
        </div>
      </Link> */}

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
    </React.Fragment>
  );
};

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
