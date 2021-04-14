import axios from "axios";
import React,{ useState } from "react";
import "./TaskAdder.css";

const TaskAdder =({token,selectedFilter, todos, onFilterChange, onSubmit})=>{

  const [taskInput,settaskInput]=useState('');
  
  const onFilterChangefun=(e)=>{
    console.log(e.target.value)
    onFilterChange(e.target.value)
  }
  
  const onInputChange = (e) => {
    settaskInput( e.target.value );
  };
  const onFormSubmit =async (e)  => {
    e.preventDefault();
    if(taskInput===''){
      return alert("Nothing has been submitted")
    }

    try{
     const addingTodoData= await axios.post(
      'http://localhost:8000/api/v1/todos/',
       {
          name:'todo',
          description:taskInput,
          isChecked:false,
       },
       {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
     );
  
    onSubmit([...todos,
      {
        description: taskInput,
        isChecked:false,
        _id:addingTodoData.data.data._id,
    }]);
    settaskInput('');
  }catch(error){
    console.log(error.response);
  }
  };

      return (
      <div className="taskadder-container wrapper">
        <h1>
        <img className="im" src="https://image.flaticon.com/icons/png/512/458/458842.png"></img>
          <span className="todo-styling rainbow-text">TODO List</span>
        </h1>
        <form className="input-container" onSubmit={onFormSubmit}>
          <input
            className="add-task-input"
            type="text"
            placeholder="whats to do?"
            value={taskInput}
            onChange={(e) => settaskInput(e.target.value)}
          />

          <button type="submit" className="submit">
            +
          </button>
          <select 
          value={selectedFilter}
          onChange={onFilterChangefun}
          name="filter" id="filter" className="filter">
            <option value="all">All</option>
            <option value="finished">Finished</option>
            <option value="unfinished">Unfinished</option>
          </select>
        </form>
      </div>
    );

}

export default TaskAdder;
 