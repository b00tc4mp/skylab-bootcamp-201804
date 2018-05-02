import React, { Component } from "react";
import Title from "./components/Title";
import Form from "./components/Addtext";
import List from "./components/List";
//import logo from './logo.svg';
//import './App.css';

class Taskapp extends Component {
  constructor() {
    super();

    this.state = {
      newTask: "",//ojo
      taskList: []
      /* id:Date.now() */
    };
    this.handleTaskToAdd = this.handleTaskToAdd.bind(this);
    this.handleAddingTask = this.handleAddingTask.bind(this);
    this.modifyTaskStatus = this.modifyTaskStatus.bind(this);
  }

  handleTaskToAdd(e) {
    let newTask = e.target.value;

    this.setState({ newTask });

  }

  handleAddingTask(e) {
    e.preventDefault();
    let task = {};
    task.name = this.state.newTask;
    task.id = Date.now();
    task.done = false;

    this.setState(prevState => {
      return {
        taskList: [...prevState.taskList, task]
      };

    });

    this.setState({
      newTask: ''//fa que es resetegi l input
    })
    
  }

  modifyTaskStatus(id){
    /* console.log(this.state.taskList) */
      var taskIndex;
      var taskToChange = this.state.taskList.find(function(task,index){
        if (task.id === id){
          taskIndex= index
          return task
        }
      
      });
      
      if(!taskToChange.done){
        taskToChange.done= true
      }else{
        this.state.taskList.splice(taskIndex,1)
      }
            
      this.setState(this.state.taskList)
}
      //if(this.state)
  
  render() {
    return (
      <div>
        <header>
          <Title text={"Task-app Er beti team"} />
          <Form
            handleAddingTask={this.handleAddingTask}
            handleTaskToAdd={this.handleTaskToAdd}
            newTask={this.state.newTask}//fa que es resetegi l input
          />
        </header>
        <main>
          <List taskList={this.state.taskList} 
                listTitle="TO DO's" symbol="✓" condition={false} modifyTaskStatus = {this.modifyTaskStatus} />
          <List taskList={this.state.taskList} 
                listTitle="DONE's" symbol="✗" condition={true} modifyTaskStatus = {this.modifyTaskStatus}/>
        </main>
      </div>
    );
  }
}

export default Taskapp;
