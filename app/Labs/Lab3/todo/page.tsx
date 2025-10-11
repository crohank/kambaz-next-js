import TodoItem from "./TodoItem";
import TodoList from "./TodoList";

export default function todo(){
  return (
    <div id="wd-todo">
        <h2>TodoItem</h2>
      <TodoItem/>
      <hr/>
      <TodoList/>
    </div>
  );
}