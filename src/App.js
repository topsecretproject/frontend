import { BrowserRouter, Routes, Route } from "react-router-dom";
import Seniors from "./pages/Seniors";
import Student from "./pages/Student";
import Juniors from "./pages/Juniors";
import Admin from "./pages/Admin";
import Alumni from "./pages/Alumni";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/seniors" element={<Seniors />}></Route>
        <Route path="/student/:id" element={<Student />}></Route>
        <Route path="/juniors" element={<Juniors />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/alumni" element={<Alumni />}></Route>
        <Route path="*" element={<Seniors />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
