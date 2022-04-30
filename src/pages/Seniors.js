import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import Header from "../components/Header";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Grid,
  Chip,
  Typography,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <Grid container spacing={3}>
        {seniors.students?.map((student) => (
          <Grid item xs={12} sm={3} md={3} key={student.id}>
            <CardMedia
              component="img"
              height="140"
              image={student.imgLink}
              alt="avatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" align="center">
                {student.name}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                align="center"
                color="text.secondary"
              >
                <u>Interests</u>
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
