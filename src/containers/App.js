import React, { Component } from 'react';
import autoBind from 'react-autobind';
import axios from 'axios';

import logo from '../logo.svg';
import styles from './App.scss';

import AddTodo from '../components/AddTodo/addTodo';
import TodoList from '../components/TodoList/todoList';


class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      todos: []      
    }
  }

  componentDidMount() {       
    
    axios.get('https://react-todo-app-4b652.firebaseio.com/todos.json').then(res => {      
      const data = [];     
      Object.keys(res.data).forEach(function(key, index){       
        
        res.data[key].id = key;    
        data.push(res.data[key]);         
    });     
      
      this.setState({
        todos: data
      });
    }).catch(err => {
            console.log(err);            
        }
    );
  }  

  addTodo(todoName, todoDesription) {    
    const todo = {      
      name: todoName.value,
      body: todoDesription.value,
      status: false
    }    
    
    axios.post('https://react-todo-app-4b652.firebaseio.com/todos.json', todo).then(res => {     
    }).catch(err => {
            console.log(err);            
        }
    );
  }

  handleDeleteTodo(id) {    
    axios.delete(`https://react-todo-app-4b652.firebaseio.com/todos/${id}.json`, id).then(res => {
      console.log(res);
    }).catch(err => {
            console.log(err);            
        }
    );
  }

  handleCheckTodo(todo){
    const newtodo ={
      name: todo.name,
      body: todo.body,        
      status: true
    };
    axios.put(`https://react-todo-app-4b652.firebaseio.com/todos/${todo.id}.json`, newtodo).then(res => {
      console.log(res);
    }).catch(err => {
            console.log(err);            
        }
    );
  }

  componentWillReceiveProps(nextProps){
    console.log(`${nextProps} props reveived`);    
    alert(nextProps);
  }
  
  render() {
    let test = null;
    if (this.state.todos.length) {
      test = <TodoList todoList = {this.state.todos} checkTodo = {this.handleCheckTodo} deleteTodo = {this.handleDeleteTodo}/>
    }

    return (
      <div className={styles.App}>   
      
        <AddTodo addNewTodo={this.addTodo}/>
        {test}        

      </div>
    );
  }
}

export default App;
