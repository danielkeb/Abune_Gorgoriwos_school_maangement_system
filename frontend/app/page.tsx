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
      <AppBar className="bg-white lg:pl-8 lg:pr-8 ">
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

      <Box
        component="main"
        sx={{ mt: 5 }}
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <p className="text-base">Welcome to</p> 
        <h1 className="lg:text-4xl font-bold">AbuneGorgorious School Managment System </h1>
        <br />
        <p className="lg:text-base  sm:text-sm text-center">
         A school where students are built both spiritually and academically
        </p>
        <ArrowCircleDownIcon
          sx={{
            fontSize: 40,
            color: "gray",
            position: "absolute",
            bottom: 200,
          }}
        />


        
      </Box>
      <div className="container max-w-full sm:h-96 ">
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
    </div>
      </div>
     



      
    </Box>
  );
}
