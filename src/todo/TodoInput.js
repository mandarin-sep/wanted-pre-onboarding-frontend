import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Todos from "./Todos";

export default function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/");
    } else {
      setToken(localStorage.getItem("access_token"));
      axios
        .get("https://pre-onboarding-selection-task.shop/todos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          setTodoList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onChange = (e) => {
    setTodoItem(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://pre-onboarding-selection-task.shop/todos",
        { todo: todoItem },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setTodoList([...todoList, res.data]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTodoItem("");
  };

  return (
    <TodoListArea>
      <TodoInner>
        <InputArea onSubmit={onSubmit}>
          <TodoInput
            name="todoItem"
            type="text"
            placeholder="What's todo?"
            required
            onChange={onChange}
            value={todoItem}
          />
          <SubmitBtn type="submit" value={"추가"} />
        </InputArea>
        <span>{"다 울었니? 할일을 하자!"}</span>
        {todoList.map((todo) => (
          <Todos key={todo.id} todoObj={todo} token={token} />
        ))}
      </TodoInner>
    </TodoListArea>
  );
}

const TodoListArea = styled.div`
  width: 800px;
  min-height: 500px;
  margin: 25vh auto;
  background-color: #99ecf2;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
`;

const TodoInner = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const TodoInput = styled.input`
  width: 100%;
  height: 52px;
  font-size: 24px;
  padding: 3px;
  margin: 12px 12px 12px 0;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const SubmitBtn = styled.input`
  width: 60px;
  height: 52px;
  text-align: center;
  background-color: #45e2ed;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const InputArea = styled.form`
  display: flex;
  align-items: center;
`;
