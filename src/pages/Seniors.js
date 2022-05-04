import React, { Fragment } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
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
        <Grid sx={{ mt: 1 }} container spacing={7} padding={5}>
          {seniors.students?.map((student, index) => (
            <StudentsCard key={index} student={student} index={index} />
          ))}
        </Grid>
      )}
    </Fragment>
  );
}
