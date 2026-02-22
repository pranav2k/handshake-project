import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/index" element={<Index />} />
    </Routes>
  );
}

export default App;
