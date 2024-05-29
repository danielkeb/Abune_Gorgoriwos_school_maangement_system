"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Link from "next/link";
import ThemeSwitch from "@/components/context/ThemeSwitch";
import {
  ShieldCheckmarkOutline,
  EarthOutline,
  BedOutline,
  CheckmarkCircleOutline,
  AccessibilityOutline,
  FingerPrintOutline,
  SchoolOutline
} from "react-ionicons";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "News", "Contact Us"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const featuresList = [
    {
      icon: <AccessibilityOutline color="green" style={{ width: 60, height: 60 }} />,
      title: "Students",
      description:
        "Empowering over 1,200 students to achieve greatness with unwavering dedication. Shaping future leaders with knowledge, integrity, and a passion for excellence!",
    },
    {
      icon: (
        <FingerPrintOutline
          color="green"
          style={{ width: 60, height: 60 }}
        />
      ),
      title: "Employees",
      description:
        "Supporting over 150 dedicated employees in their mission to educate and inspire. Our staff is committed to excellence, innovation, and nurturing future leaders every day!",
    },
    {
      icon: <SchoolOutline color="green" style={{ width: 60, height: 60 }} />,
      title: "Branchs",
      description:
        "Across our network of 6 branches, we are shaping minds, fostering creativity, and building a brighter future. Each branch is a beacon of education, guiding students toward success with innovation and care.",
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ABGSMS
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button style={{ backgroundColor: "green", color: "white" }}>
          Portal
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  // sx={{pl:8, pr:8}}
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:"white"}} className=" lg:pl-8 lg:pr-8 ">
        <Toolbar>
          <Box className="w-full flex  justify-between  items-center text-black  sm:hidden md:hidden">
            <b>AGSMS</b>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "black" }}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", color: "black" },
            }}>
            ABGSMS
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "black" }}>
                {item}
              </Button>
            ))}
         
       
            <Link href="/login">
              <Button style={{ backgroundColor: "green", color: "white" }}>
                Portal
              </Button>
            </Link>
          
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
      <div className="w-full">
        <div className="hero z-[1] w-full h-[100vh] grid place-items-center bg-[#141b2b] relative">
          <div className="flex md:flex-row flex-col items-center w-full md:px-[200px] px-8 justify-between md:gap-0 gap-28">
            <div className="flex flex-col gap-3 left-animation w-full">
              <span className="text-green-400 text-[28px] font-medium">
                Welcome To Our Website!
              </span>
              <span className="text-white font-medium md:text-[60px] text-[45px]">
                Abune Gorgorious <br /> Schools.
              </span>
              <span className="text-white font-medium text-[60px]"></span>
              <span className="text-white leading-7 max-w-[500px] text-justify">
              Empowering young minds to achieve excellence through education, integrity, and community spirit.
               Inspiring the leaders of tomorrow with knowledge and values today.
              </span>
              <div className="flex items-center gap-7 mt-5">
                <button className="bg-green-400 px-6 py-3 text-gray-900 font-semibold rounded-full">
                  Get Started
                </button>
                <button className="border-[2px] border-green-400 px-6 py-3 text-white font-semibold rounded-full">
                  Contact Us
                </button>
              </div>
            </div>
            <img
              src="/pi1.png"
              className="md:w-[50%] w-full  "
              alt=""
            />
          </div>
        </div>
        {/* <div className="container max-w-full sm:h-96 ">
      <div className="stats grid grid-cols-3 gap-6 sm:grid-cols-1 max-sm:grid-cols-1 md:grid-cols-3 h-[50%] text-center" style={{backgroundColor:'green'}}>
        <div className="frame flex flex-col justify-center items-center gap-2">
          <div className="text-4xl sm:text-2xl font-bold text-white">
            6,534
            <div className="text-xl sm:text-sm text-white">Students</div>
          </div>
        </div>
        <div className="frame flex flex-col justify-center items-center gap-2">
          <div className="text-4xl sm:text-2xl font-bold text-white">
            6
            <div className="text-xl sm:text-sm text-white">Branches</div>
          </div>
        </div>
        <div className="frame flex flex-col justify-center items-center gap-2">
          <div className="text-4xl sm:text-2xl font-bold text-white">
            540
            <div className="text-xl sm:text-sm text-white">Employees</div>
          </div>
        </div>
      </div>
    </div> */}

        <div className="flex w-full py-20 md:px-[200px] px-8 flex-col gap-16 justify-center items-center">
          <div className="flex flex-col w-full items-center">
            <span className="font-semibold text-green-500">Our Features</span>
            <span className="font-semibold text-slate-700 text-3xl mt-1">
              Our Priceless Features
            </span>
            <p className="max-w-[400px] text-center mt-4">
              
            </p>
          </div>
          <div className="flex md:flex-row flex-col w-full items-center justify-between md:gap-0 gap-5">
            {featuresList.map((feature) => {
              return (
                <div
                  className="bg-white py-5 px-12 flex flex-col items-center justify-center gap-5 rounded-[10px] transition-all duration-300 cursor-pointer hover:scale-[1.05]"
                  style={{ boxShadow: "0 0 40px 5px rgb(0 0 0 / 5%)" }}
                  key={feature.title}>
                  {feature.icon}
                  <span className="font-semibold text-gray-700 text-[21px]">
                    {feature.title}
                  </span>
                  <span className="max-w-[360px] text-center leading-7">
                    {feature.description}
                  </span>{" "}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:px-[200px] px-8 flex md:flex-row flex-col items-center justify-between py-10 md:gap-0 gap-16">
          <div
            className="md:w-[700px] md:h-[700px] w-[350px] h-[350px] bg-no-repeat bg-cover relative plane-mask"
            style={{
              backgroundImage: `url(https://roodepoortrecord.co.za/wp-content/uploads/sites/20/2014/01/IMG_1890-Medium.jpg)`,
            }}
          />
          <div className="flex flex-col md:w-[48%] w-full md:px-0 px-8">
            <span className="text-[15px] text-green-600 font-semibold">
              ABOUT US
            </span>
            <span className="text-[30px] font-medium text-gray-700 mt-1">
              We Are Here To Bring You All The <br /> Comfort And Pleasure
            </span>
            <p className="max-w-[650px] text-gray-600 leading-7 mt-5">
            At Abune Gorgorious Schools, we're dedicated to providing more than just education;
           we offer an environment where students thrive.
            With a focus on excellence and a commitment to nurturing every individual, we aim to make learning an enjoyable and fulfilling experience.
            </p>
            <div className="flex flex-col gap-3 mt-5">
              <div className="flex items-center gap-3">
                <CheckmarkCircleOutline color="green" />
                <span>
                Comprehensive Extracurricular Activities
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckmarkCircleOutline color="green" />
                <span>
                Cutting-Edge Educational Technology
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckmarkCircleOutline color="green" />
                <span>
                Holistic Education
                </span>
              </div>
            </div>

          </div>
        </div><br/>
        <div className="map-responsive">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.0512916444013!2d39.53042267585995!3d9.67665879041285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1649bd79fe92a5f5%3A0xcedc88541b6c788d!2sAbune%20Gorgoriwos%20Scoll!5e0!3m2!1sen!2set!4v1707652781042!5m2!1sen!2set"
            width="600"
            height="450"
            
            allowFullScreen
            loading="lazy"
            title="Responsive google map"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <br />
        <br />

        <div className="w-full flex md:flex-row flex-col md:gap-0 gap-8 items-center justify-between py-8 px-10 border-t border-slate-300 border-dashed">
          <span className="font-medium text-slate-700">
            Copyright © 2024 AbuneGorgorious Schools . All rights reserved.
          </span>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-medium whitespace-nowrap md:text-[15px] text-[10.5px] text-gray-600 hover:text-blue-600">
              Terms and conditions
            </a>
            <a
              href="#"
              className="font-medium whitespace-nowrap md:text-[15px] text-[10.5px] text-gray-600 hover:text-blue-600">
              Long Term Contracts
            </a>
            <a
              href="#"
              className="font-medium whitespace-nowrap md:text-[15px] text-[10.5px] text-gray-600 hover:text-blue-600">
              Copyright Policy
            </a>
            <a
              href="#"
              className="font-medium whitespace-nowrap md:text-[15px] text-[10.5px] text-gray-600 hover:text-blue-600">
              Customer Support
            </a>
          </div>
        </div>
      </div>
    </Box>
  );
}
