import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NewStudent from "./pages/NewStudent.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/new" element={<NewStudent />} />
    </Routes>
  );
}

export default App;
