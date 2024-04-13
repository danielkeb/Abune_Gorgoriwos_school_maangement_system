import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import BasicCard from "../Chart/totaldata";
import { AppContext } from "@/components/context/UserContext";

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
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
  const { school, setSchool } = useContext(AppContext);

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

  const handleSchoolClick = (id) => {
    setSchool(id);
  };

  return (
    <>
      <div
        className="flex items-center pl-4 hover:cursor-pointer pr-4"
        onClick={handleExpandClick}
      >
        <ListItemIcon>
          <PeopleIcon />
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
            {schools.map((school) => (
              <ListItem
                key={school.id}
                onClick={() => handleSchoolClick(school.id)}
                button // Ensure the ListItem behaves like a button
              >
                <ListItemText primary={school.school_name} className="ml-14" />
              </ListItem>
            ))}
          </List>
        )}
      </Collapse>
    </>
  );
};

export default SchoolList;
