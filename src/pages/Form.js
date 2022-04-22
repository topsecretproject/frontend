import React, { Fragment, useState, useRef, useCallback } from "react";
import Header from "../components/Header";
import {
  FormControl,
  FormHelperText,
  TextField,
  Typography,
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
import ChipSelect from "../components/ChipSelect";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";

export default function Form() {
  const textInput = useRef(null);
  const theme = useTheme();

  const [currentQuestion, setCurrentQuestion] = useState(-1);
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

  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState([
    {
      label: "First & Last Name",
      question: "What is your first and last name?",
      helper: "Please enter your name in the format of 'Firstname Lastname'",
      func: setName,
    },
    {
      label: "CSI Email",
      question: "What is your CSI email?",
      helper: "Please enter your CSI email",
      func: setCsiEmail,
    },
    {
      label: "Emplid",
      question: "What is your Emplid?",
      helper: "Please enter your 9 digit Emplid",
      func: setEmplid,
    },
    {
      label: "Academic Year",
      question: "What is your level?",
      helper: "",
      func: setLevel,
    },
    {
      label: "Bio",
      question: "What is your bio?",
      helper: "Must be minimum of 500 charaters long.",
      func: setBio,
    },
    {
      label: "Github",
      question: "What is your Github Profile Link?",
      helper: "Please enter a valid Github Profile Link",
      func: setGithub,
    },
    {
      label: "Linkedin",
      question: "What is your LinkedIn Profile Link?",
      helper: "Please enter a valid LinkedIn Profile Link",
      func: setLinkedin,
    },
    {
      label: "Portfolio",
      question: "What is your Portfolio Link? (Optional)",
      helper: "Please enter a valid Portfolio Link",
      func: setPortfolio,
    },
    {
      label: "Image Link",
      question: "Link to a headshot image",
      helper: "Check if the image looks good!",
      func: setImgLink,
    },
    {
      label: "Interests",
      question: "What are your interests? Please select all that apply.",
      helper: "Select as many as possible",
      func: setInterests,
    },
    {
      label: "Skills",
      question: "What are your skills? Please select all that apply.",
      helper: "Select as many as possible",
      func: setSkills,
    },
    {
      project1: "Project 1",
      proj1Link: "GitHub link to project 1",
      project2: "Project 2",
      proj2Link: "GitHub link to project 2",
      project3: "Project 3",
      proj3Link: "GitHub link to project 3",
      depQuestion: "Is project currently deployed?",
      depFunc: setProjects,
    },
  ]);

  const onNext = useCallback(() => {
    setIsLoading(true);
    if (currentQuestion === -1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === 0) {
      if (name === "") {
        setErrors("Name is required");
      } else if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) {
        setErrors("Name must be in the format of First Last");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 1) {
      if (csiEmail === "") {
        setErrors("CSI Email is required");
      } else if (
        !/^[a-zA-Z]+.[a-zA-Z0-9]+@cix.csi.cuny.edu$/.test(
          csiEmail.toLowerCase()
        )
      ) {
        setErrors(
          "CSI Email must be in the format of first.last@cix.csi.cuny.edu"
        );
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
      setCsiEmail(csiEmail.toLowerCase());
    }
    if (currentQuestion === 2) {
      if (emplid === "") {
        setErrors("Emplid is required");
      } else if (!/^[0-9]{9}$/.test(emplid)) {
        setErrors("Emplid must be 9 digits only");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 3) {
      if (level === "") {
        setErrors("Level is required");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 4) {
      if (bio === "") {
        setErrors("Bio is required");
      } else if (bio.length > 500) {
        setErrors("Bio must be less than 500 characters");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 5) {
      const regex = new RegExp("https://github.com/[^/]+");
      if (github === "") {
        setErrors("Github is required");
      } else if (!regex.test(github)) {
        setErrors("Github must be a valid link");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 6) {
      if (linkedin === "") {
        setErrors("LinkedIn is required");
      } else if (
        // eslint-disable-next-line no-useless-escape
        !/(https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          linkedin
        )
      ) {
        setErrors("LinkedIn must be a valid link");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 7) {
      const regex = new RegExp(
        "^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$"
      );
      if (portfolio === "") {
        if (!regex.test(portfolio)) {
          setErrors("Portfolio must be a valid link");
        }
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 8) {
      if (imgLink === "") {
        setErrors("Image Link is required");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 9) {
      if (interests.length === 0) {
        setErrors("Interests are required");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 10) {
      if (skills.length === 0) {
        setErrors("Skills are required");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 11) {
      if (Object.keys(projects).length === 0) {
        setErrors({ ...errors, projects: "Projects are required" });
      }
    }

    setIsLoading(false);
    if (!(currentQuestion === 10 || currentQuestion === 9)) {
      textInput.current.value = "";
    }
  }, [
    errors,
    isLoading,
    currentQuestion,
    name,
    csiEmail,
    emplid,
    level,
    bio,
    github,
    interests,
    skills,
    linkedin,
    portfolio,
    imgLink,
    projects,
  ]);

  const onPrevious = () => {
    setErrors("");
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
          <FormGroup
            sx={{
              "*": { mb: 1 },
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth>
              {currentQuestion === -1 ? (
                <Fragment>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      Welcome to the CSI Student Showcase Application
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Please click Next to start the application process.
                    </Typography>
                  </Box>
                </Fragment>
              ) : currentQuestion === 3 ? (
                <Fragment>
                  <InputLabel id="level">
                    {questions[currentQuestion].label}
                  </InputLabel>
                  <Select
                    error={errors !== ""}
                    labelId="level"
                    id="level"
                    value={level}
                    inputRef={textInput}
                    label={questions[currentQuestion].label}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <MenuItem value={"Senior"}>Senior</MenuItem>
                    <MenuItem value={"Junior"}>Junior</MenuItem>
                    <MenuItem value={"Alumni"}>Alumni</MenuItem>
                  </Select>
                </Fragment>
              ) : currentQuestion === 9 ? (
                <Fragment>
                  <ChipSelect
                    index={currentQuestion}
                    question={questions[currentQuestion].question}
                    helper={questions[currentQuestion].helper}
                    variable={interests}
                    func={questions[currentQuestion].func}
                  />
                </Fragment>
              ) : currentQuestion === 10 ? (
                <Fragment>
                  <ChipSelect
                    index={currentQuestion}
                    question={questions[currentQuestion].question}
                    helper={questions[currentQuestion].helper}
                    variable={skills}
                    func={questions[currentQuestion].func}
                  />
                </Fragment>
              ) : currentQuestion === 11 ? (
                <Fragment></Fragment>
              ) : (
                <Fragment>
                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        sm: "block",
                        md: "none",
                        lg: "none",
                        xlg: "none",
                      },
                    }}
                  >
                    <InputLabel shrink={true}>
                      {questions[currentQuestion].question}
                    </InputLabel>
                  </Box>
                  {imgLink !== "" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar sx={{ width: 200, height: 200 }} src={imgLink} />
                    </Box>
                  ) : undefined}
                  <TextField
                    variant="filled"
                    label={questions[currentQuestion].label}
                    placeholder={questions[currentQuestion].question}
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    error={errors !== ""}
                    inputRef={textInput}
                    multiline={currentQuestion === 4}
                    onChange={(e) =>
                      questions[currentQuestion].func(e.target.value)
                    }
                  />
                  <FormHelperText sx={{ mb: 1 }} id="my-helper-text">
                    {questions[currentQuestion].helper}
                  </FormHelperText>
                </Fragment>
              )}
            </FormControl>
            {errors ? (
              <Alert sx={{ width: "90%" }} severity="error">
                {errors}
              </Alert>
            ) : null}
            <MobileStepper
              variant="dots"
              steps={questions.length}
              position="static"
              activeStep={currentQuestion}
              sx={{ width: "95%", flexGrow: 1 }}
              nextButton={
                <Button
                  size="small"
                  onClick={onNext}
                  disabled={currentQuestion === 11}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={onPrevious}
                  disabled={currentQuestion === -1 || currentQuestion === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </FormGroup>
        </Paper>
      </Box>
    </Fragment>
  );
}
