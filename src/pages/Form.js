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
import ChipSelect from "../components/ChipSelect";

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
      helper: "Please enter your name in the format of 'Firstname Lastname'",
      func: setName,
    },
    {
      question: "What is your CSI email?",
      helper: "Please enter your CSI email",
      func: setCsiEmail,
    },
    {
      question: "What is your Emplid?",
      helper: "Please enter your 9 digit Emplid",
      func: setEmplid,
    },
    {
      question: "What is your level?",
      helper: "",
      func: setLevel,
    },
    {
      question: "What is your bio?",
      helper: "Must be minimum of 500 charaters long.",
      func: setBio,
    },
    {
      question: "What is your Github Profile Link?",
      helper: "Please enter a valid Github Profile Link",
      func: setGithub,
    },
    {
      question: "What is your LinkedIn Profile Link?",
      helper: "Please enter a valid LinkedIn Profile Link",
      func: setLinkedin,
    },
    {
      question: "What is your Portfolio Link? (Optional)",
      helper: "Please enter a valid Portfolio Link",
      func: setPortfolio,
    },
    {
      question: "Link to a headshot image",
      helper: "Check if the image looks good!",
      func: setImgLink,
    },
    {
      question: "What are your interests? Please select all that apply.",
      helper: "Select as many as possible",
      func: setInterests,
    },
    {
      question: "What are your skills? Please select all that apply.",
      helper: "Select as many as possible",
      func: setSkills,
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
      if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) {
        setErrors("Name must be in the format of First Last");
        return;
      }
    }
    if (currentQuestion === 1) {
      if (csiEmail === "") {
        setErrors("CSI Email is required");
        return;
      }
      if (!/^[a-zA-Z]+.[a-zA-Z0-9]+@cix.csi.cuny.edu$/.test(csiEmail)) {
        setErrors(
          "CSI Email must be in the format of first.last@cix.csi.cuny.edu"
        );
        return;
      }
      setCsiEmail(csiEmail.toLowerCase());
    }
    if (currentQuestion === 2) {
      if (emplid === "") {
        setErrors("Emplid is required");
        return;
      }
      if (!/^[0-9]{9}$/.test(emplid)) {
        setErrors("Emplid must be 9 digits only");
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
      const regex = new RegExp("https://github.com/[^/]+");
      if (github === "") {
        setErrors("Github is required");
        return;
      }
      if (!regex.test(github)) {
        setErrors("Github must be a valid link");
        return;
      }
    }
    if (currentQuestion === 6) {
      if (linkedin === "") {
        setErrors("LinkedIn is required");
        return;
      }
      if (
        !/(https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
          linkedin
        )
      ) {
        setErrors("LinkedIn must be a valid link");
        return;
      }
    }
    if (currentQuestion === 7) {
      const regex = new RegExp(
        "^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$"
      );
      if (portfolio === "") {
        if (!regex.test(portfolio)) {
          setErrors("Portfolio must be a valid link");
          return;
        }
      }
    }
    if (currentQuestion === 8) {
      if (imgLink === "") {
        setErrors("Image Link is required");
        return;
      }
    }
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
              ) : currentQuestion === 9 ? (
                <Fragment>
                  <ChipSelect
                    question={questions[currentQuestion].question}
                    helper={questions[currentQuestion].helper}
                    variable={interests}
                    func={setInterests}
                  />
                </Fragment>
              ) : currentQuestion === 10 ? (
                <Fragment>
                  <ChipSelect
                    question={questions[currentQuestion].question}
                    helper={questions[currentQuestion].helper}
                    variable={interests}
                    func={setInterests}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  {imgLink !== "" ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar sx={{ width: 200, height: 200 }} src={imgLink} />
                    </Box>
                  ) : undefined}
                  <TextField
                    autoFocus
                    InputLabelProps={{ shrink: true }}
                    error={errors !== ""}
                    inputRef={textInput}
                    multiline={currentQuestion === 4}
                    label={questions[currentQuestion].question}
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
