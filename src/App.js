import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./component/Create";
import Read from "./component/Read";
import Update from "./component/Update";
import Home from "./component/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/view/:id" element={<Read />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
