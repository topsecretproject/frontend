import { useState, Fragment, useEffect } from "react";
import {
  FormControl,
  TextField,
  Button,
  FormGroup,
  Box,
  Alert,
} from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import db from "../firebase/firebase";
import Loading from "../components/Loading";
import "./styles/Admin.css";
import Header from "../components/Header";
import Queue from "../components/Queue";

export default function Admin() {
  const auth = getAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [queues, setQueues] = useState([]);

  const [expanded, setExpanded] = useState("");

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEmail = (event) => {
    setInputs({ ...inputs, email: event.target.value });
  };

  const handlePass = (event) => {
    setInputs({ ...inputs, password: event.target.value });
  };

  const signOutAuth = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchQueue = async () => {
    const docRef = doc(db, "queue", "students");
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    setLoading(false);
    setQueues(data);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchQueue();
    }
  }, [isAuthenticated]);

  const authenticate = () => {
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      // eslint-disable-next-line
      .then((userCredential) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        // Handle Errors here.
        setIsAuthenticated(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrors({
          errorCode: errorCode,
          errorMessage: errorMessage,
        });
      });
  };

  return (
    <Fragment>
      <Box className="admin">
        {isAuthenticated === false ? (
          <Box component="form">
            <FormGroup className="form">
              <FormControl variant="standard" sx={{ width: "50vw", m: 0.5 }}>
                <TextField
                  autoComplete="email"
                  variant="filled"
                  type="email"
                  required
                  onChange={handleEmail}
                  id="email"
                  label="Email"
                  aria-describedby="enter email"
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: "50vw", m: 0.5 }}>
                <TextField
                  autoComplete="current-password"
                  variant="filled"
                  required
                  type="password"
                  onChange={handlePass}
                  id="password"
                  label="Password"
                  aria-describedby="enter password"
                />
              </FormControl>
              <Button variant="contained" onClick={authenticate}>
                Login
              </Button>
              {errors ? (
                <Alert severity="error">Incorrect Email or Password!</Alert>
              ) : undefined}
            </FormGroup>
          </Box>
        ) : isLoading === true ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Loading />
          </Box>
        ) : (
          <Box sx={{ width: "100%", height: "100%" }}>
            <Header signOut={signOutAuth} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  mt: "15px",
                  height: "85%",
                  overflow: "scroll",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                {queues.students?.map((queue, index) => (
                  <Queue
                    expanded={expanded}
                    handleExpand={handleExpand}
                    key={index}
                    id={index}
                    csiEmail={queue.csiEmail}
                    linkedin={queue.linkedin}
                    portfolio={queue.portfolio}
                    github={queue.github}
                    emplid={queue.emplid}
                    name={queue.name}
                    bio={queue.bio}
                    imgLink={queue.imgLink}
                    level={queue.level}
                    projects={queue.projects}
                    skills={queue.skills}
                    interests={queue.interests}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
}
