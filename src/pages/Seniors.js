import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import StudentsCard from "../components/StudentsCard";
import Loading from "../components/Loading";

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
      {loading ? (
        <Loading loading={loading} text="Seniors" />
      ) : (
        <Grid
          sx={{ mt: 3, padding: { xs: 2, sm: 3, md: 4, lg: 4 } }}
          container
          spacing={7}
        >
          {Object.keys(seniors)?.map((student, index) => (
            <StudentsCard
              key={index}
              student={seniors[student]}
              index={index}
            />
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
