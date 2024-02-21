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
  console.log("the path name is :", path)
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
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
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
