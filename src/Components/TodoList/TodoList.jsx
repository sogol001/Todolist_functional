import React from "react";
import Todo from "./Todo";
 import "./TodoList.css";

const TodoList =({token,setTodos ,todos , filteredTodos})=>{
  return (
    <div className="todo-container">
      {filteredTodos.map((todo) => {
        return (
          <Todo
          token={token }
          todos={todos}
          setTodos={setTodos}
          todo={todo}
            key={todo._id} 
          />
        );
      })}
    </div>
  );
}
export default TodoList;











