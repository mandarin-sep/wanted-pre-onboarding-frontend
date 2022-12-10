import Login from "./Login/login";
import TodoInput from "./todo/TodoInput";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Login />}></Route>
        <Route path={"/todo"} element={<TodoInput />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
