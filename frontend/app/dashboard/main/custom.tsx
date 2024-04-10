import * as React from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/components/context/UserContext";
import { GradientRounded } from "@mui/icons-material";
import { ToGetContext } from "@/app/context/toget";
import { useRouter } from "next/navigation";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const school = await axios.get(`http://localhost:3333/grade/get/`);

        setSchoolss(school.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const active = {
    // backgroundColor:"#44a574",
    border: "1px solid gray",
  };
  const { dork, setDork } = useContext(ToGetContext);
  const [expanded, setExpanded] = React.useState(false);
  const [schoolss, setSchoolss] = useState([]);
  const router = useRouter();
  console.log("i always think ",  dork)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleGradeClick= (id:string)=>{
    setDork(id)
    router.push("/dashboard/students");
  }

  return (
    <>

      <div
        className="flex  items-center  pl-4 hover:cursor-pointer   pr-4"
        onClick={handleExpandClick}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
        <ExpandMore expand={expanded} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ListItem disablePadding className="flex flex-col ml-10">
          {schoolss?.map((s: any) => {
            return (
              <ListItemButton className="w-full " onClick={()=>handleGradeClick(s.id)}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary={` Grade ${s.grade}`} />
              </ListItemButton>
            );
          })}
        </ListItem>
      </Collapse>
    </>
  );
}
