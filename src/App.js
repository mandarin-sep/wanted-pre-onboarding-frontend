import Login from "./Login/login";
import Todo from "./todo/Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/todo"} element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
