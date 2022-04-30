import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import StudentsCard from "../components/StudentsCard";

export default function Juniors() {
  const [juniors, setJuniors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const docRef = doc(db, "students", "juniors");
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    setJuniors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Header />
      <Grid sx={{ mt: 1 }} container spacing={7} padding={5}>
        {juniors.students?.map((student, index) => (
          <StudentsCard student={student} index={index} />
        ))}
      </Grid>
    </Fragment>
  );
}
