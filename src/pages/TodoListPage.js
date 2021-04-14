import React, { useEffect, useState } from 'react';
import TaskAdder from "../Components/TaskAdder/TaskAdder";
import "../App.css";
import TodoList from "../Components/TodoList/TodoList";
import axios from 'axios';
import Cookies from 'universal-cookie'; 



const TodoListPage =({setUsername})=>{
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');

  const cookies=new Cookies();
  const token=cookies.get('token');

  useEffect(async()=>{
    try {
      const userData = await axios.get(
          'http://localhost:8000/api/v1/users/me/',
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      console.log(userData.data.data.doc.username);
      setUsername(userData.data.data.doc.username);
      getTodos();
  } catch (error) {
      console.log(error.response);
  }
  },[]);

  useEffect(() => {
    filterOptionHandler();
  }, [todos]);

  useEffect(() => {
    filterOptionHandler();
}, [selectedOption]);


const getTodos = async () => {
  const userTodos = await axios.get(
      'http://localhost:8000/api/v1/todos/',
      {
          headers: {
              Authorization: `Bearer ${token}`,
          }, 
      }
  );
      console.log(userTodos)
      seTTodos(userTodos.data.todos);
};

const filterOptionHandler=()=>{
  switch(selectedOption){
    case 'finished':
      setFilteredTodos(todos.filter((item)=>item.isChecked===true))
      break;
    case 'unfinished':
      setFilteredTodos(todos.filter((item)=>item.isChecked===false))
      break;
    default:
      setFilteredTodos(todos);
      break;
  }
 };

 const onFilterChange=(option)=>{
  setSelectedOption(option);
}

 const seTTodos = (item) => {
  setTodos(item);
 };

 return (
  <div>
    <TaskAdder 
     token={token}
    selectedFilter={selectedOption}
    todos={todos}
    onFilterChange={onFilterChange} 
    onSubmit={seTTodos} />

    <TodoList
     token={token}
    setTodos={seTTodos}
     todos={todos}
    filteredTodos={filteredTodos}/>
  </div>
);
}
export default TodoListPage;
