import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToGetContext } from "@/app/context/toget";
import SchoolIcon from '@mui/icons-material/School';

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

const SchoolList = () => {
  const [expanded, setExpanded] = useState(false);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {schoolId, setSchoolId } = useContext(ToGetContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get(
          "http://localhost:3333/schools/get"
        );
        setSchools(schoolsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSchoolClick = (id: number) => {
    setSchoolId(id)
    router.push("/dashboard/schools");
  };

  return (
    <>
      <div
        className="flex items-center pl-4 hover:cursor-pointer pr-4"
        onClick={handleExpandClick}
      >
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Schools" />
        <ExpandMore expand={expanded} aria-expanded={expanded}>
          <ExpandMoreIcon />
        </ExpandMore>
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {loading ? (
          <p>Loading...</p>
        ) : schools.length === 0 ? (
          <p>No schools found.</p>
        ) : (
          <List disablePadding>
  {schools?.map((school: any) => {
    return (
      <ListItemButton
        key={school.id}
        className="w-full"
        onClick={() => handleSchoolClick(school.id)}
      >
        <ListItemIcon className="ml-10">
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={school.school_name} className="ml-0" />
      </ListItemButton>
    );
  })}
</List>

        )}
      </Collapse>
    </>
  );
};

export default SchoolList;