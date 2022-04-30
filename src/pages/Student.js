import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import Header from "../components/Header";
import {
  Grid,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  Button,
  Avatar,
  Paper,
  styled,
  Chip,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Student() {
  const location = useLocation();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const fetchData = async () => {
    const level = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[2];
    const docRef = doc(db, "students", `${level}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    if (data.students.length - 1 < id || id < 0) {
      setErrors("Invalid student ID");
    } else {
      setStudent(data.students[id]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <Box sx={{ backgroundColor: "#1976D2", p: 4, mt: -3 }}>
        {loading ? (
          <CircularProgress />
        ) : errors !== "" ? (
          <Alert
            action={
              <Button component={Link} to="/" color="inherit" size="small">
                HOME
              </Button>
            }
            severity="error"
          >
            <AlertTitle>{errors}</AlertTitle>
          </Alert>
        ) : (
          <Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Button
                component={Link}
                to="/"
                color="error"
                size="small"
                variant="contained"
              >
                BACK
              </Button>
            </Box>
            <Box sx={{ backgroundColor: "white", borderRadius: "15px", p: 4 }}>
              <Grid
                justifyContent="center"
                alignItems="center"
                container
                spacing={7}
                mb={5}
              >
                <Grid item xs={12} sm={4}>
                  <Avatar
                    sx={{
                      width: "200px",
                      height: "200px",
                      margin: "auto",
                      border: "5px solid #1976D2",
                    }}
                    src={student.imgLink}
                  />
                  <Typography sx={{ textAlign: "center" }} variant="h3">
                    {student.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Chip
                    icon={<InfoIcon />}
                    label="Bio"
                    color="success"
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body1">{student.bio}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={12} sm={3} md={2}>
                  <Chip
                    icon={<LinkIcon />}
                    label="Links"
                    color="info"
                    sx={{ mr: 2, width: "500px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                    }}
                    component="ul"
                  >
                    <ListItem>
                      <Chip
                        rel="noopener noreferrer"
                        target="_blank"
                        href={student.linkedin}
                        component="a"
                        clickable
                        icon={<LinkedInIcon />}
                        label="LinkedIn"
                        disabled={!student.linkedin}
                      />
                    </ListItem>
                    <ListItem>
                      <Chip
                        rel="noopener noreferrer"
                        target="_blank"
                        href={student.github}
                        component="a"
                        clickable
                        icon={<GitHubIcon />}
                        label="GitHub"
                        disabled={!student.github}
                      />
                    </ListItem>
                    <ListItem>
                      <Chip
                        rel="noopener noreferrer"
                        target="_blank"
                        href={student.portfolio}
                        component="a"
                        clickable
                        icon={<PersonIcon />}
                        label="Portfolio"
                        disabled={!student.portfolio}
                      />
                    </ListItem>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={12} sm={3} md={2}>
                  <Chip
                    icon={<StarIcon />}
                    label={
                      <Typography variant="subtitle2">Interests</Typography>
                    }
                    color="error"
                    sx={{ mr: 2, width: "500px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                    }}
                    component="ul"
                  >
                    {student.interests?.map((interest, index) => (
                      <ListItem key={index}>
                        <Chip label={interest} />
                      </ListItem>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={12} sm={3} md={2}>
                  <Chip
                    icon={<SettingsIcon />}
                    label="Skills"
                    color="error"
                    sx={{ mr: 2, width: "500px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                    }}
                    component="ul"
                  >
                    {student.skills?.map((skill, index) => (
                      <ListItem key={index}>
                        <Chip label={skill} />
                      </ListItem>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
              <Box>
                <Grid container spacing={2}>
                  {student.projects?.map((project, index) => (
                    <Grid key={index} item xs={12} sm={12} md={3} lg={3}>
                      <Card>
                        <CardContent>
                          <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {project.name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            disabled={!project.projectLink}
                            rel="noopener noreferrer"
                            target="_blank"
                            component="a"
                            href={project.projectLink}
                            size="small"
                          >
                            GitHub Link
                          </Button>
                          <Button
                            rel="noopener noreferrer"
                            target="_blank"
                            component="a"
                            href={project.deployedLink}
                            disabled={project.isDeployed ? false : true}
                            size="small"
                          >
                            Deployed Link
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
}
