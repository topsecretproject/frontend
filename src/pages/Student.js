import React from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firebase";
import Header from "../components/Header";
import { Grid } from "@mui/material";

export default function Student() {
  const location = useLocation();
  const [student, setSeniors] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const level = location.pathname.split("/")[1];
    const id = location.pathname.split("/")[2];
    const docRef = doc(db, "students", `${level}`);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    setSeniors(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Student</div>;
}
