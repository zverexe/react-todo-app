import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from 'reactstrap';

import styles from './App.scss';

import AddTodo from '../components/AddTodo/addTodo';
import TodoList from '../components/TodoList/todoList';
import Spinner from '../components/Spinner/spinner';
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

  handleAllTodos() {
    this.props.loadAll();
  }

  render() {
    let list = null;
    if (this.props.todos) {
      list = <TodoList todoList={this.props.todos} checkTodo={this.handleCheckTodo} deleteTodo={this.handleDeleteTodo} />
    } else {
      list = <Spinner />;
    }

    return (
      <div className={styles.App}>
        <AddTodo addNewTodo={this.handleAddTodo} />
        {list}
        <Button color="success" onClick={this.handleAllTodos}>Load All</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    load: state.loadAllTodo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => dispatch (actionCreators.loadDbTodos()),
    deleteToDo: (id, index) => dispatch (actionCreators.removeDbTodo(id, index)),
    addTodo: (todoName, todoDesription, picture) => dispatch(actionCreators.addDbTodo(todoName, todoDesription, picture)),
    loadAll: () => dispatch (actionCreators.loadAllTodo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
