/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function ArrayStateVariable() {
   const { todos } = useSelector((state: any) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button className="btn btn-primary" onClick={addElement}>Add Element</button>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
      <hr />
    </div>
  );
}
