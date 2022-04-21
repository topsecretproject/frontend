import { Fragment } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Cancel } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import _without from "lodash/without";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "MongoDB",
  "Python",
  "Django",
  "PostgreSQL",
  "SQL",
  "Git",
  "GitHub",
  "GitLab",
  "C++",
  "C#",
  "Java",
  "Swift",
  "Kotlin",
  "PHP",
  "TypeScript",
  "Ruby",
  "Angular",
  "Pandas",
  "R",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Algorithms",
  "Data Structures",
];

const interests = [
  "Machine Learning",
  "Data Science",
  "Web Development",
  "Blockchain",
  "Cryptocurrency",
  "Artificial Intelligence",
  "Robotics",
  "Cybersecurity",
  "Data Analysis",
  "Data Visualization",
  "Data Mining",
  "Data Engineering",
  "Software Engineering",
  "Software Development",
  "Software Testing",
  "Software Architecture",
  "Mobile Development",
  "DevOps",
  "Cloud Computing",
  "Project Management",
  "Research",
  "Database Management",
];

function getStyles(interest, variable, theme) {
  return {
    fontWeight:
      variable.indexOf(interest) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChipSelect({ variable, func, question, helper }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    func(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    func((current) => _without(current, value));
  };

  return (
    <div>
      <Fragment>
        <InputLabel id="multiple-chip-label">{question}</InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={variable}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={question} />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip
                  clickable
                  deleteIcon={
                    <Cancel onMouseDown={(event) => event.stopPropagation()} />
                  }
                  onDelete={(e) => handleDelete(e, value)}
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {interests.map((interest) => (
            <MenuItem
              key={interest}
              value={interest}
              style={getStyles(interest, variable, theme)}
            >
              {interest}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helper}</FormHelperText>
      </Fragment>
    </div>
  );
}
