"use client";
import React from "react";
import {useDispatch} from "react-redux";
import {deleteTodo, setTodo} from "./todoReducer";
import {ListGroupItem, Button} from "react-bootstrap";


interface Todo {
    id: string;
    title: string;

}


interface TodoItemProps {
    todo: Todo;
}


export default function TodoItem({todo}: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <ListGroupItem key={todo.id}>
            <Button
                onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
            >
                Delete
            </Button>
            <Button
                onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
            >
                Edit
            </Button>
            {todo.title}
        </ListGroupItem>
    );
}