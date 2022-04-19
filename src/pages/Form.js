import React, { Fragment, useState, useRef } from "react";
import Header from "../components/Header";
import {
  FormControl,
  FormHelperText,
  TextField,
  Button,
  FormGroup,
  Box,
  Paper,
  Avatar,
  Alert,
} from "@mui/material";
import Loading from "../components/Loading";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Form() {
  const textInput = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [csiEmail, setCsiEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [emplid, setEmplid] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [projects, setProjects] = useState({});

  const [errors, setErrors] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [questions, setQuestions] = useState([
    {
      question: "What is your first and last name?",
      func: setName,
    },
    {
      question: "What is your CSI email?",
      func: setCsiEmail,
    },
    {
      question: "What is your Emplid?",
      func: setEmplid,
    },
    {
      question: "What is your level?",
      func: setLevel,
    },
    {
      question: "What is your bio?",
      func: setBio,
    },
    {
      question: "What is your Github Profile Link?",
      func: setGithub,
    },
    {
      question: "What is your LinkedIn Profile Link?",
      func: setLinkedin,
    },
    {
      question: "What is your Portfolio Link?",
      func: setPortfolio,
    },
    {
      question: "Link to a headshot image",
      func: setImgLink,
    },
  ]);

  const onNext = () => {
    setErrors("");
    setIsLoading(true);
    if (currentQuestion === 0) {
      if (name === "") {
        setErrors("Name is required");
        return;
      }
      if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
        setErrors("Name must be in the format of First Last");
        return;
      }
    }
    if (currentQuestion === 1) {
      if (csiEmail === "") {
        setErrors("CSI Email is required");
        return;
      }
      if (!/^[a-zA-Z0-9._-]+@cix.csi.cuny.edu$/.test(csiEmail)) {
        setErrors(
          "CSI Email must be in the format of first.last@cix.csi.cuny.edu"
        );
        return;
      }
    }
    if (currentQuestion === 2) {
      if (emplid === "") {
        setErrors("Emplid is required");
        return;
      }
      if (!/^[0-9]{9}$/.test(emplid)) {
        setErrors("Emplid must be 9 digits");
        return;
      }
    }
    if (currentQuestion === 3) {
      if (level === "") {
        setErrors("Level is required");
        return;
      }
    }
    if (currentQuestion === 4) {
      if (bio === "") {
        setErrors("Bio is required");
        return;
      }
      if (bio.length > 500) {
        setErrors("Bio must be less than 500 characters");
        return;
      }
    }
    if (currentQuestion === 5) {
      if (github === "") {
        setErrors("Github is required");
        return;
      }
      if (
        /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$ /i.test(
          github
        )
      ) {
        setErrors("Github must be a valid link");
        return;
      }
    }
    if (currentQuestion === 6) {
      if (linkedin === "") {
        setErrors("LinkedIn is required");
        return;
      }
    }
    if (currentQuestion === 7) {
      if (portfolio === "") {
        setErrors("Portfolio is required");
        return;
      }
    }
    if (currentQuestion === 8) {
      if (imgLink === "") {
        setErrors("Image Link is required");
        return;
      }
    }
    // if (currentQuestion === 4) {
    //   if (skills.length === 0) {
    //     setErrors({ ...errors, skills: "Skills are required" });
    //   }
    //   if (interests.length === 0) {
    //     setErrors({ ...errors, interests: "Interests are required" });
    //   }
    // }
    // if (currentQuestion === 5) {
    //   if (Object.keys(projects).length === 0) {
    //     setErrors({ ...errors, projects: "Projects are required" });
    //   }
    // }
    textInput.current.value = "";
    setCurrentQuestion(currentQuestion + 1);
  };

  const onPrevious = () => {
    setErrors("");
    textInput.current.value = "";
    questions[currentQuestion].func("");
    questions[currentQuestion - 1].func("");
    setCurrentQuestion(currentQuestion - 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // const docRef = doc(db, "students", "seniors");
    // const snapshot = await getDoc(docRef);
  };

  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          component="form"
          elevation={2}
          sx={{
            width: "80%",
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormGroup sx={{ "*": { mb: 1 }, width: "60%" }}>
            <FormControl fullWidth>
              {currentQuestion === 3 ? (
                <Fragment>
                  <InputLabel id="level">Academic Year</InputLabel>
                  <Select
                    error={errors !== ""}
                    labelId="level"
                    id="level"
                    value={level}
                    inputRef={textInput}
                    label="Academic Year"
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <MenuItem value={"Senior"}>Senior</MenuItem>
                    <MenuItem value={"Junior"}>Junior</MenuItem>
                    <MenuItem value={"Alumni"}>Alumni</MenuItem>
                  </Select>
                </Fragment>
              ) : (
                <Fragment>
                  {imgLink !== "" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar sx={{ width: 200, height: 200 }} src={imgLink} />
                    </Box>
                  ) : undefined}
                  <TextField
                    error={errors !== ""}
                    inputRef={textInput}
                    multiline={currentQuestion === 4}
                    label={questions[currentQuestion].question}
                    onChange={(e) =>
                      questions[currentQuestion].func(e.target.value)
                    }
                  />
                  {currentQuestion === 4 ? (
                    <FormHelperText id="my-helper-text">
                      Must be minimum of 500 charaters long.
                    </FormHelperText>
                  ) : undefined}
                </Fragment>
              )}
            </FormControl>
            {errors ? <Alert severity="error">{errors}</Alert> : null}
            {currentQuestion === 0 ? (
              <Button variant="contained" color="success" onClick={onNext}>
                Next
              </Button>
            ) : currentQuestion === questions.length - 1 ? (
              <Fragment>
                <Button
                  sx={{ mb: 1 }}
                  variant="contained"
                  color="success"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
                <Button variant="outlined" color="error" onClick={onPrevious}>
                  Back
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  sx={{ mb: 1 }}
                  variant="contained"
                  color="success"
                  onClick={onNext}
                >
                  Next
                </Button>
                <Button variant="outlined" color="error" onClick={onPrevious}>
                  Back
                </Button>
              </Fragment>
            )}{" "}
          </FormGroup>
        </Paper>
      </Box>
    </Fragment>
  );
}
