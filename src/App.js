import { BrowserRouter, Routes, Route } from "react-router-dom";
import Seniors from "./pages/Seniors";
import Student from "./pages/Student";
import Juniors from "./pages/Juniors";
import Admin from "./pages/Admin";
import Alumni from "./pages/Alumni";
import Form from "./pages/Form";
import ScrollToTop from "./components/ScrollToTop";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box sx={{ postion: "relative", minHeight: "100vh" }}>
        <Routes>
          <Route path="/seniors" element={<Seniors />}></Route>
          <Route path="/seniors/:id" element={<Student />}></Route>
          <Route path="/juniors/:id" element={<Student />}></Route>
          <Route path="/juniors" element={<Juniors />}></Route>
          <Route path="/alumni" element={<Alumni />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="*" element={<Seniors />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
