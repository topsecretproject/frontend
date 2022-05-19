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
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ChipSelect from "../components/ChipSelect";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import ReCAPTCHA from "react-google-recaptcha";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { storage } from "../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function Form() {
  const navigate = useNavigate();

  const textInput = useRef(null);
  const theme = useTheme();

  const [recaptcha, setCaptcha] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [csiEmail, setCsiEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [mentor, setMentor] = useState(false);
  const [bio, setBio] = useState("");
  const [emplid, setEmplid] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [progresspercent, setProgresspercent] = useState(0);
  const [resume, setResume] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [projects, setProjects] = useState([
    {
      name: "",
      isDeployed: false,
      deployedLink: "",
      projectLink: "",
    },
    {
      name: "",
      isDeployed: false,
      deployedLink: "",
      projectLink: "",
    },
    {
      name: "",
      isDeployed: false,
      deployedLink: "",
      projectLink: "",
    },
  ]);

  const [errors, setErrors] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [questions, setQuestions] = useState([
    {
      label: "First & Last Name",
      question: "What is your first and last name?",
      helper: "Please enter your name in the format of 'Firstname Lastname'",
      func: setName,
    },
    {
      label: "Academic Year",
      question: "What is your level?",
      helper: "Please select your Academic Year",
      func: setLevel,
    },
    {
      label: "CSI Email",
      question: "What is your CSI email?",
      aQuestion: "What is your preferred email?",
      alumni: "Please enter your preferred Email",
      helper: "Please enter your CSI email",
      func: setCsiEmail,
    },
    {
      label: "Emplid",
      question: "What is your Emplid?",
      helper: "Please enter your 8 digit Emplid",
      func: setEmplid,
    },
    {
      label: "Bio",
      question: "What is your bio?",
      helper: "Must be minimum of 200 characters long.",
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
      question: "What are your interests? Please select your top 3 interests.",
      helper: "Select your top 3 interests",
      func: setInterests,
    },
    {
      label: "Skills",
      question: "What are your skills? Please select your top 6 skills.",
      helper: "Select as your top 6 skills",
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
    {
      label: "Resume",
      question: "What is your resume link? (Optional)",
      helper: "Please enter a valid resume link",
    },
  ]);

  const onRecaptchaChange = (value) => {
    if (value) {
      setCaptcha(true);
    }
  };

  function onError() {
    setCaptcha(false);
  }

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
      if (level === "") {
        setErrors("Level is required");
      } else {
        setErrors("");
        if (level === "Alumni") {
          setEmplid(Math.floor(10000000 + Math.random() * 90000000));
        }
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 2) {
      if (csiEmail === "") {
        setErrors("Email is required");
      } else if (
        !/^[a-zA-Z]+\.[a-zA-Z0-9]+@cix.csi.cuny.edu$/.test(
          csiEmail.toLowerCase()
        ) &&
        level !== "Alumni"
      ) {
        setErrors(
          "CSI Email must be in the format of first.last@cix.csi.cuny.edu"
        );
      } else if (level === "Alumni") {
        if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(csiEmail.toLowerCase())) {
          setErrors("Email must valid");
        } else {
          setErrors("");
          setCurrentQuestion(currentQuestion + 1);
        }
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
      setCsiEmail(csiEmail.toLowerCase());
    }
    if (currentQuestion === 3) {
      if (level === "Alumni") {
        if (company === "" || role === "") {
          setErrors("Company and Role are required");
        } else {
          setErrors("");
          setCurrentQuestion(currentQuestion + 1);
        }
      } else {
        if (emplid === "") {
          setErrors("Emplid is required");
        } else if (!/^[0-9]{8}$/.test(emplid)) {
          setErrors("Emplid must be 8 digits only");
        } else {
          setErrors("");
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if (currentQuestion === 4) {
      if (bio === "") {
        setErrors("Bio is required");
      } else if (bio.length < 200) {
        setErrors("Bio must be a minimum of 200 characters");
      } else {
        setErrors("");
        if (level === "Alumni") {
          setCurrentQuestion(currentQuestion + 2);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
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
        if (level === "Alumni") {
          setCurrentQuestion(currentQuestion + 2);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    }
    if (currentQuestion === 7) {
      const regex = new RegExp(
        "^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$"
      );
      if (!portfolio === "") {
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
        if (level === "Alumni") {
          setCurrentQuestion(currentQuestion + 5);
        } else {
          setCurrentQuestion(currentQuestion + 1);
        }
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
      if (
        !projects[0].name ||
        !projects[1].name ||
        (!projects[2].name && level !== "Junior") ||
        !projects[0].projectLink ||
        !projects[1].projectLink ||
        (!projects[2].projectLink && level !== "Junior")
      ) {
        setErrors("Projects are required");
      } else {
        setErrors("");
        if (level === "Junior") {
          setProjects(projects.slice(0, 2));
        }
        setCurrentQuestion(currentQuestion + 1);
      }
    }
    if (currentQuestion === 12) {
      if (!resume) {
        setErrors("Resume is required");
      } else {
        setErrors("");
        setCurrentQuestion(currentQuestion + 1);
      }
    }

    setIsLoading(false);
    if (
      !(
        currentQuestion === 10 ||
        currentQuestion === 9 ||
        currentQuestion === -1 ||
        currentQuestion === 11 ||
        currentQuestion === 12 ||
        currentQuestion === 13 ||
        (currentQuestion === 3 && level === "Alumni")
      )
    ) {
      textInput.current.value = "";
    }
  }, [
    currentQuestion,
    name,
    csiEmail,
    emplid,
    level,
    resume,
    company,
    role,
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
    const docRef = doc(db, "queue", "students");
    const storageRef = ref(storage, `/${emplid}/${resumeName}`);
    const uploadTask = uploadBytesResumable(storageRef, resume);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        setErrors(error.message);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            if (level === "Junior" || level === "Senior") {
              updateDoc(docRef, {
                [emplid]: {
                  name,
                  csiEmail,
                  level,
                  emplid,
                  resume: downloadURL,
                  bio,
                  github,
                  interests,
                  skills,
                  linkedin,
                  portfolio,
                  imgLink,
                  projects,
                },
              });
            } else if (level === "Alumni") {
              updateDoc(docRef, {
                [emplid]: {
                  name,
                  csiEmail,
                  level,
                  emplid,
                  company,
                  role,
                  bio,
                  linkedin,
                  imgLink,
                  isAlumni: true,
                },
              });
            }
          })
          .then(() => {
            setIsLoading(false);
            navigate("/", { success: true });
          })
          .catch((err) => {
            setErrors(err.message);
            setIsLoading(false);
          });
      }
    );
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
            width: { xs: "95%", sm: "85%", md: "80%", lg: "80%" },
            height: "85vh",
            display: "flex",
            justifyContent: "center",
            overflowX: "hidden",
            overflowY: "scroll",
            alignItems: "center",
            border: "2px solid #1976d2",
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
            {isLoading === false ? (
              <FormControl fullWidth>
                {currentQuestion < 0 || currentQuestion > 13 ? (
                  <Fragment>
                    <Box
                      sx={{
                        textAlign: "center",
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
                      <Typography variant="body2" gutterBottom>
                        * Note: You can go back to edit your answers. The
                        answers are saved but won't show in the field.
                      </Typography>
                    </Box>
                  </Fragment>
                ) : currentQuestion === 1 ? (
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
                      length={interests.length}
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
                      length={skills.length}
                      index={currentQuestion}
                      question={questions[currentQuestion].question}
                      helper={questions[currentQuestion].helper}
                      variable={skills}
                      func={questions[currentQuestion].func}
                    />
                  </Fragment>
                ) : currentQuestion === 11 && level !== "Alumni" ? (
                  <Fragment>
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Project 1 Name"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[0].name = e.target.value.trim();
                          return projects;
                        })
                      }
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Project 1 GitHub Link"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[0].projectLink = e.target.value.trim();
                          return projects;
                        })
                      }
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      size="small"
                      id="outlined-required"
                      label="Project 1 Deployed Link"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[0].deployedLink = e.target.value.trim();
                          if (projects[0].deployedLink === "") {
                            projects[0].deployedLink = "";
                          } else {
                            projects[0].isDeployed = true;
                          }
                          return projects;
                        })
                      }
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Project 2 Name"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[1].name = e.target.value.trim();
                          return projects;
                        })
                      }
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Project 2 GitHub Link"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[1].projectLink = e.target.value.trim();
                          return projects;
                        })
                      }
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      size="small"
                      id="outlined-required"
                      label="Project 2 Deployed Link"
                      onChange={(e) =>
                        setProjects((projects) => {
                          projects[1].deployedLink = e.target.value.trim();
                          if (projects[1].deployedLink === "") {
                            projects[1].deployedLink = "";
                          } else {
                            projects[1].isDeployed = true;
                          }
                          return projects;
                        })
                      }
                    />
                    {level !== "Junior" ? (
                      <Fragment>
                        <TextField
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              onNext();
                            }
                          }}
                          required
                          size="small"
                          id="outlined-required"
                          label="Project 3 Name"
                          onChange={(e) =>
                            setProjects((projects) => {
                              projects[2].name = e.target.value.trim();
                              return projects;
                            })
                          }
                        />
                        <TextField
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              onNext();
                            }
                          }}
                          required
                          size="small"
                          id="outlined-required"
                          label="Project 3 GitHub Link"
                          onChange={(e) =>
                            setProjects((projects) => {
                              projects[2].projectLink = e.target.value.trim();
                              return projects;
                            })
                          }
                        />
                        <TextField
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              onNext();
                            }
                          }}
                          size="small"
                          id="outlined-required"
                          label="Project 3 Deployed Link"
                          onChange={(e) =>
                            setProjects((projects) => {
                              projects[2].deployedLink = e.target.value.trim();
                              if (projects[2].deployedLink === "") {
                                projects[2].deployedLink = "";
                              } else {
                                projects[2].isDeployed = true;
                              }
                              return projects;
                            })
                          }
                        />
                      </Fragment>
                    ) : undefined}
                  </Fragment>
                ) : currentQuestion === 12 ? (
                  <Fragment>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <input
                        accept="application/pdf"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        multiple
                        onChange={(e) => {
                          setResume(e.target.files[0]);
                          setResumeName(e.target.files[0].name?.trim());
                        }}
                        type="file"
                      />
                      <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                          Choose Resume
                        </Button>
                      </label>
                      {resume ? (
                        <Fragment>
                          <Chip sx={{ width: "80%" }} label={resume.name} />
                        </Fragment>
                      ) : undefined}
                    </Box>
                  </Fragment>
                ) : currentQuestion === 13 ? (
                  <Fragment>
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        Thank you for completing the application!
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Please click Submit to submit your application. The
                        application will be reviewed by the CUNY2X academic
                        advisor. If there are any changes that need to be made,
                        you will receive an email with feedback.
                      </Typography>
                      <ReCAPTCHA
                        required
                        style={{ marginBottom: "10px" }}
                        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                        onChange={onRecaptchaChange}
                        render="explicit"
                        onErrored={onError}
                        onExpired={onError}
                      />
                      {isLoading ? <CircularProgress /> : undefined}
                      <Button
                        disabled={!recaptcha}
                        variant="contained"
                        color="success"
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Fragment>
                ) : currentQuestion === 3 && level === "Alumni" ? (
                  <Fragment>
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Current Company Name"
                      onChange={(e) => setCompany(e.target.value.trim())}
                    />
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required
                      size="small"
                      id="outlined-required"
                      label="Current Role"
                      onChange={(e) => setRole(e.target.value.trim())}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>
                        Would you be willing to Mentor a Student?
                      </Typography>
                      <Switch
                        checked={mentor}
                        onChange={() => setMentor(!mentor)}
                      />
                    </Stack>
                  </Fragment>
                ) : (
                  <Fragment>
                    {imgLink !== "" ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar
                          sx={{ width: 200, height: 200 }}
                          src={imgLink}
                        />
                      </Box>
                    ) : undefined}
                    <TextField
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          onNext();
                        }
                      }}
                      required={currentQuestion === 7 ? false : true}
                      variant="filled"
                      label={
                        currentQuestion === 2
                          ? level === "Alumni"
                            ? questions[currentQuestion].aQuestion
                            : questions[currentQuestion].helper
                          : questions[currentQuestion].question
                      }
                      placeholder={
                        currentQuestion === 2
                          ? level === "Alumni"
                            ? questions[currentQuestion].alumni
                            : questions[currentQuestion].helper
                          : questions[currentQuestion].helper
                      }
                      value={questions[currentQuestion].value}
                      autoFocus
                      InputLabelProps={{ shrink: true }}
                      error={errors !== ""}
                      inputRef={textInput}
                      multiline
                      onChange={(e) =>
                        questions[currentQuestion].func(e.target.value.trim())
                      }
                    />
                    <FormHelperText sx={{ mb: 1 }} id="my-helper-text">
                      {currentQuestion === 2
                        ? level === "Alumni"
                          ? questions[currentQuestion].aQuestion
                          : questions[currentQuestion].helper
                        : questions[currentQuestion].question}
                    </FormHelperText>
                  </Fragment>
                )}
              </FormControl>
            ) : (
              <CircularProgress />
            )}
            {errors ? (
              <Alert sx={{ width: "90%" }} severity="error">
                {errors}
              </Alert>
            ) : null}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MobileStepper
                variant="dots"
                steps={questions.length}
                position="static"
                activeStep={currentQuestion}
                sx={{ width: "90vw", flexGrow: 1 }}
                nextButton={
                  <Button
                    size="small"
                    onClick={onNext}
                    disabled={currentQuestion === 13}
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
                    disabled={
                      currentQuestion === -1 ||
                      currentQuestion === 0 ||
                      currentQuestion === 13
                    }
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
            </Box>
          </FormGroup>
        </Paper>
      </Box>
    </Fragment>
  );
}
