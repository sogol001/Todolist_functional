import React from "react";
import axios from 'axios';
import './Todo.css';

const Todo =(props)=>{


 const  deletHandler=async()=>{
    try{
      const deleteTodoData =await axios.delete(`http://localhost:8000/api/v1/todos/${props.todo._id}`,{
        headers:{
          Authorization: `Bearer ${props.token}`,
        },
      })
    props.setTodos(
      props.todos.filter(
        (el)=>el._id!==props.todo._id));
      }catch(error){
        return alert(error.response)
      }
  }

const completeHandler=async()=>{

  try{
    const chechItemData=await axios.patch(`http://localhost:8000/api/v1/todos/${props.todo._id}`,
    {isChecked:!props.todo.isChecked},
    {
      headers:{
        Authorization: `Bearer ${props.token}`,
      },
    })
  }catch(error){
    console.log(error.response);
  }

  props.setTodos(
    props.todos.map((item)=>{
      if(item._id===props.todo._id){
        return{ 
          ...item,
          isChecked: !item.isChecked,
      }
      }
      return item;
    })
  ) 
}
  return (
    <div className="todo-block">
      <li>{props.todo.description}</li>
      <div
      onClick={completeHandler}
      >
      <img className="complete-btn" src="https://cdn3.iconfinder.com/data/icons/user-interface-user-experience-4/24/157-512.png"></img>
      </div>
      <div
      onClick={deletHandler}
      >
      <img className="trash-btn" src="https://freeiconshop.com/wp-content/uploads/edd/trash-var-flat.png"></img>
      </div>
      {/* {this.props.checked} */}
    </div>
  );
}
export default Todo;
