import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import StudentsCard from "../components/StudentsCard";
import Loading from "../components/Loading";

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
      {loading ? (
        <Grid container justify="center" alignItems="center">
          <Loading loading={loading} text="Seniors" />
        </Grid>
      ) : (
        <Grid sx={{ mt: 1 }} container spacing={7} padding={5}>
          {Object.keys(juniors)?.map((student, index) => (
            <StudentsCard
              key={index}
              student={juniors[student]}
              index={index}
            />
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
