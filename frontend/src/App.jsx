import { Routes, Route } from "react-router-dom";
import "./assets/Todo.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import Notfound from "./pages/Notfound";
import Alreadylogin from "./auth/Alreadylogin";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route element={<Alreadylogin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
