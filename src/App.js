import "./App.css";
import Image from "./Components/Image";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Image />} />
      </Routes>
    </>
  );
}

export default App;