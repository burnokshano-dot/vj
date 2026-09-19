import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students";
import Search from "./pages/Search";
import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/search" element={<Search />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
