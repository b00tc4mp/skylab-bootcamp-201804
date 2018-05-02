import React from "react";


function Form(props) {
  return (
    <form onSubmit={props.handleAddingTask}>
      <input type="text" className="inputForm" onChange={props.handleTaskToAdd} value={props.newTask}/>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
