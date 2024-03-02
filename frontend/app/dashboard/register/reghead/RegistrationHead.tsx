"use client"

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';


import { AccountCircle } from '@mui/icons-material';
import { Avatar, Button, Hidden, Menu, Popover, lighten } from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { AppContext } from '@/components/context/UserContext';
import Link from "next/link";
import React, { useState } from "react";


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        
`
);
const UserBoxButton = styled(Button)(
  ({ theme }) => `
        
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);
const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
       
        display: block;
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2)};
`
);

interface MainProps {
  children: React.ReactNode;
}
const RegistrationHead: React.FC<MainProps> = ({ children }) => {


  const[selectList, setSelectList]= useState("Students")


  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);



  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const ref = React.useRef<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };



  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between items-center">
              <h6 className="text-blueGray-700 text-xl font-bold">
               REGISTRATION FORM
              </h6>
              <div className="">
                <div>
                <UserBoxButton className='normal-case' ref={ref} onClick={handleOpen}>
        
        <Hidden mdDown>
          <UserBoxText sx={{color:'black'}}>
          <UserBoxLabel variant="body1">Register</UserBoxLabel>
            
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1, color:'black' }} />
        </Hidden>
      </UserBoxButton>


      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
   
        <List sx={{ p: 1 }} component="nav">
         

          <Link
            href="/dashboard/register"
           
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem sx={{ px: 3 }}>Student</MenuItem>
          </Link>

          <Link
            href="/dashboard/register/teacher"
           
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem sx={{ px: 3 }}>Teacher</MenuItem>
          </Link>
          <Link
            href="/dashboard/register/admin"
           
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem sx={{ px: 3 }}>Director</MenuItem>
          </Link>
          <Link
            href="/dashboard/register/schools"
           
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <MenuItem sx={{ px: 3 }}>Schools</MenuItem>
          </Link>
        </List>
   
   
      </Popover>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default RegistrationHead;
