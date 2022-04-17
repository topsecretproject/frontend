import React from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Queue({
  name,
  level,
  bio,
  emplid,
  imgLink,
  skills,
  projects,
  interests,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return <div>Queue</div>;
}

Queue.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  emplid: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
};
