import { useState, Fragment, useEffect } from "react";
import {
  FormControl,
  TextField,
  Button,
  FormGroup,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc, deleteField } from "@firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase/firebase";
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

  const onApprove = async (id) => {
    const queueRef = doc(db, "queue", "students");
    if (queues[id].level === "Junior") {
      const juniorRef = doc(db, "students", "juniors");
      await updateDoc(juniorRef, {
        [id]: queues[id],
      });
    }
    if (queues[id].level === "Senior") {
      const seniorRef = doc(db, "students", "seniors");
      await updateDoc(seniorRef, {
        [id]: queues[id],
      });
    }
    if (queues[id].level === "Alumni") {
      const alumniRef = doc(db, "students", "alumni");
      await updateDoc(alumniRef, {
        [id]: queues[id],
      });
    }
    await updateDoc(queueRef, {
      [id]: deleteField(),
    });
    window.location.reload();
  };

  const onDecline = async (id) => {
    if (queues[id].level !== "Alumni") {
      const storage = getStorage();
      const desertRef = ref(storage, `/${queues[id].name}/Resume.pdf`);
      deleteObject(desertRef)
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const queueRef = doc(db, "queue", "students");
    await updateDoc(queueRef, {
      [id]: deleteField(),
    });
    window.location.reload();
  };

  const fetchQueue = async () => {
    setLoading(true);
    const docRef = doc(db, "queue", "students");
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    setQueues(data);
    setLoading(false);
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
        setErrors({});
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
              <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
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
              <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
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
              {Object.keys(errors).length > 0 ? (
                <Alert severity="error">Incorrect Email or Password!</Alert>
              ) : undefined}
            </FormGroup>
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
                  height: "85%",
                  overflow: "scroll",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                {isLoading === true ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Fragment>
                    {Object.keys(queues).length === 0 ? (
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          textAlign="center"
                          variant="h5"
                          gutterBottom
                        >
                          No Students in Queue
                        </Typography>
                      </Box>
                    ) : (
                      <Fragment>
                        {Object.keys(queues)?.map((queue, index) => (
                          <Queue
                            expanded={expanded}
                            onApprove={onApprove}
                            onDecline={onDecline}
                            handleExpand={handleExpand}
                            key={index}
                            id={index}
                            resume={queues[queue].resume}
                            csiEmail={queues[queue].csiEmail}
                            linkedin={queues[queue].linkedin}
                            portfolio={queues[queue].portfolio}
                            github={queues[queue].github}
                            emplid={queues[queue].emplid}
                            name={queues[queue].name}
                            bio={queues[queue].bio}
                            imgLink={queues[queue].imgLink}
                            level={queues[queue].level}
                            projects={queues[queue].projects}
                            skills={queues[queue].skills}
                            interests={queues[queue].interests}
                          />
                        ))}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
}
