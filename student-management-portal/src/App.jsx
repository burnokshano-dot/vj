import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
