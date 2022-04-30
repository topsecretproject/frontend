import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import Header from "../components/Header";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Chip,
  Typography,
  CardMedia,
  styled,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { borderColor } from "@mui/system";

export default function Seniors() {
  const [seniors, setSeniors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const docRef = doc(db, "students", "seniors");
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    setSeniors(data);
    setLoading(false);
  };

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <Grid container spacing={2} padding={2}>
        {seniors.students?.map((student) => (
          <Grid item xs={12} sm={12} md={4} lg={4} key={student.id}>
            <CardMedia
              component="img"
              height="100"
              image={student.imgLink}
              alt="avatar"
            />
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" align="center">
                  {student.name}
                  <hr></hr>
                </Typography>
                {student.interests?.map((student) => (
                  <Grid item key={student.interests}>
                    <Paper
                      elevation={0}
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                        backgroundColor: "#E6E6E6E6",
                      }}
                      component="ul"
                    >
                      <ListItem key={student}>
                        <Chip
                          variant="outlined"
                          color="info"
                          size="small"
                          label={student}
                        />
                      </ListItem>
                    </Paper>
                  </Grid>
                ))}
              </CardContent>
              <CardActions>
                <Button variant="contained" component={Link} to="/student">
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
