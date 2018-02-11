import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import axios from 'axios';


import logo from '../logo.svg';
import styles from './App.scss';

import AddTodo from '../components/AddTodo/addTodo';
import TodoList from '../components/TodoList/todoList';
import * as actionCreators from '../store/actions';


class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.loadTodos();
	}

	getNewData(res) {
		const data = [];
      Object.keys(res.data).forEach(function (key, index) {
        res.data[key].id = key;
        data.push(res.data[key]);
			});
			return data;
	}

  handleAddTodo(todoName, todoDesription, picture) {
    this.props.addTodo(todoName, todoDesription, picture);
  }

  handleDeleteTodo(id, index) {
    this.props.deleteToDo(id, index);
  }

  handleCheckTodo(todo) {
    const newtodo = {
			id: todo.id,
      name: todo.name,
      body: todo.body,
      status: true
		};
    axios.put(`https://react-todo-app-4b652.firebaseio.com/todos/${todo.id}.json`, newtodo).then(res => {
			console.log(res);
			this.state.todos.forEach((item, index) => {
				if(item.id === res.data.id){
					this.state.todos.splice(index, 1);
					this.setState({
						todos: [res.data, ...this.state.todos]
					});
				}
			});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    let list = null;
    console.log(this.props.todos);
    if (this.props.todos) {
      list = <TodoList todoList={this.props.todos} checkTodo={this.handleCheckTodo} deleteTodo={this.handleDeleteTodo} />
    }
    return (
      <div className={styles.App}>
        <AddTodo addNewTodo={this.handleAddTodo} />
        {list}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => dispatch (actionCreators.loadDbTodos()),
    deleteToDo: (id, index) => dispatch (actionCreators.removeDbTodo(id, index)),
    addTodo: (todoName, todoDesription, picture) => dispatch(actionCreators.addDbTodo(todoName, todoDesription, picture))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
