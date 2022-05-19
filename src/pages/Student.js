import React, { Fragment, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";
import EngineeringIcon from "@mui/icons-material/Engineering";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Student() {
  const location = useLocation();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const fetchData = useCallback(async () => {
    const level = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[2];
    const docRef = doc(db, "students", `${level}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    if (Object.keys(data).length - 1 < id || id < 0) {
      setErrors("Invalid student ID");
    } else {
      setStudent(data[Object.keys(data)[id]] || {});
    }
    setLoading(false);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Header />
      <Box
        sx={{
          minHeight: "100%",
          backgroundColor: "#1976D2",
          p: { xs: 1, sm: 3, md: 3, lg: 3 },
          mt: -3,
        }}
      >
        {loading ? (
          <Dialog
            open={loading}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Loading Student..."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <CircularProgress />
              </DialogContentText>
            </DialogContent>
          </Dialog>
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
            <Box sx={{ backgroundColor: "white", borderRadius: "15px", p: 4 }}>
              <Grid
                justifyContent="center"
                alignItems="center"
                container
                spacing={7}
                mb={5}
              >
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: "10px",
                      background: "#1976D2",
                      padding: "15px",
                      boxShadow: "0px 0px 5px #1976D2",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "11rem",
                        height: "11rem",
                        margin: "auto",
                        border: "2px solid white",
                      }}
                      src={student.imgLink}
                    />
                  </Paper>
                  <Typography
                    sx={{
                      textAlign: "center",
                      mt: 1,
                      border: "2px solid #1976D2",
                      borderRadius: "10px",
                    }}
                    variant="h4"
                  >
                    {student.name}
                  </Typography>
                </Grid>
                <Grid sx={{ height: "100%" }} item xs={12} sm={8}>
                  <Divider
                    sx={{
                      mb: 2,
                      "&::before, &::after": {
                        borderColor: "success.main",
                      },
                    }}
                  >
                    <Chip
                      icon={<InfoIcon />}
                      label="Bio"
                      color="success"
                      sx={{ mr: 2 }}
                    />
                  </Divider>
                  <Box>
                    <Typography
                      sx={{
                        border: "1px solid green",
                        borderRadius: "5px",
                        padding: "15px",
                      }}
                      variant="body1"
                    >
                      {student.bio}
                    </Typography>
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
                      justifyContent: {
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                        lg: "flex-start",
                      },
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                      p: 0,
                      pl: 2,
                    }}
                    component="ul"
                  >
                    <ListItem>
                      <Chip
                        rel="noopener noreferrer"
                        target="_blank"
                        href={student.resume}
                        component="a"
                        clickable
                        icon={<InsertDriveFileIcon />}
                        label="Resume"
                        disabled={!student.resume}
                      />
                    </ListItem>
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
                      justifyContent: {
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                        lg: "flex-start",
                      },
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                      p: 0,
                      pl: 2,
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
                      justifyContent: {
                        xs: "center",
                        sm: "center",
                        md: "flex-start",
                        lg: "flex-start",
                      },
                      flexWrap: "wrap",
                      listStyle: "none",
                      m: 0,
                      p: 0,
                      pl: 2,
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
                <Divider
                  sx={{
                    mb: 2,
                    "&::before, &::after": {
                      borderColor: "warning.main",
                    },
                  }}
                >
                  <Chip
                    icon={<EngineeringIcon />}
                    label="Projects"
                    color="warning"
                    sx={{ mr: 2 }}
                  />
                </Divider>
                <Grid
                  justifyContent="center"
                  alignItems="stretch"
                  container
                  spacing={2}
                >
                  {student.projects?.map((project, index) => (
                    <Grid
                      style={{ display: "flex" }}
                      key={index}
                      item
                      xs={12}
                      sm={4}
                      md={4}
                      lg={3}
                    >
                      <Card
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                        }}
                      >
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            component={Link}
            to="/"
            color="error"
            size="small"
            variant="contained"
            sx={{ width: "30%" }}
          >
            BACK
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}
