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
  Chip,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";

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
          minHeight: "90vh",
          backgroundColor: "#1976D2",
          pl: { xs: 1, sm: 3, md: 3, lg: 3 },
          pr: { xs: 1, sm: 3, md: 3, lg: 3 },
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
                    <Stack
                      sx={{
                        mt: 1,
                        border: "1px solid white",
                        borderRadius: "5px",
                      }}
                    >
                      <Chip color="primary" label={student.company} />
                      <Chip color="primary" label={student.role} />
                    </Stack>
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
                    <Divider
                      sx={{
                        mt: 2,
                        "&::before, &::after": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <Chip
                        color="primary"
                        rel="noopener noreferrer"
                        target="_blank"
                        href={student.linkedin}
                        component="a"
                        clickable
                        icon={<LinkedInIcon />}
                        label="LinkedIn"
                        disabled={!student.linkedin}
                      />
                    </Divider>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fragment>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            pb: 2,
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
