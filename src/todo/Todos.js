import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { MdDeleteForever, MdEdit, MdClose } from "react-icons/md";

const Todos = ({ todoObj, token }) => {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(todoObj.todo);
  const [isDone, setIsDone] = useState(todoObj.isCompleted);

  const onDeleteClick = () => {
    axios
      .delete(
        `https://pre-onboarding-selection-task.shop/todos/${todoObj.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleEdting = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${todoObj.id}`,
        {
          todo: editingText,
          isCompleted: todoObj.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    setEditingText(e.target.value);
  };

  const checkHandler = () => {
    axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${todoObj.id}`,
        {
          todo: editingText,
          isCompleted: !todoObj.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIsDone(!isDone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TodoItemArea>
      {editing ? (
        <>
          <EditingArea onSubmit={onSubmit}>
            <input
              type="text"
              value={editingText}
              required
              onChange={onChange}
              autoFocus
            />
            <EditBtn type="submit" value="✔"></EditBtn>
          </EditingArea>
          <CancelBtn onClick={toggleEdting}>
            <MdClose />
          </CancelBtn>
        </>
      ) : (
        <>
          <input type="checkbox" checked={isDone} onChange={checkHandler} />
          <div style={isDone ? { textDecoration: "line-through" } : {}}>
            {todoObj.todo}
          </div>
          <ItemBtn>
            <button onClick={onDeleteClick}>
              <MdDeleteForever />
            </button>
            <button onClick={toggleEdting}>
              <MdEdit />
            </button>
          </ItemBtn>
        </>
      )}
    </TodoItemArea>
  );
};

export default Todos;

const TodoItemArea = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px auto;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;

const EditingArea = styled.form`
  display: flex;
  align-items: center;

  &>input: focus {
    outline: none;
  }

  &>input: first-child {
    height: 30px;
    padding: 0 0;
    box-sizing: border-box;
    border: none;
    font-size: 16px;
  }
`;

const ItemBtn = styled.div`
  position: absolute;
  right: 4px;

  & > button {
    background-color: rgba(0, 0, 0, 0);
    margin: 0 3px;
    border-radius: 4px;
    border: none;
    height: 100%;
  }
`;

const EditBtn = styled.input`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  right: 38px;
  border-radius: 4px;
  border: none;
`;

const CancelBtn = styled.button`
  position: absolute;
  right: 4px;
  background-color: rgba(0, 0, 0, 0);
  margin: 0 3px;
  border-radius: 4px;
  border: none;
`;
