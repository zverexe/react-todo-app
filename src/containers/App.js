import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import './App.scss';

import AddTodo from '../components/AddTodo/addTodo';
import TodoList from '../components/TodoList/todoList';
import Spinner from '../components/Spinner/spinner';
import * as actionCreators from '../store/actions';

const LIMIT = 3;

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      allLoaded: false
    }
  }

  componentDidMount() {
    this.props.loadTodos();
	}

  componentWillReceiveProps (nextProps) {
    const {allLoaded} = this.state;
    const {todos} = nextProps;
    if (todos && todos.length <= LIMIT && !allLoaded) {
      this.setState({
        allLoaded: true
      });
    }
  }

  handleAddTodo(todoName, todoDesription, picture) {
    this.props.addTodo(todoName, todoDesription, picture);
  }

  handleDeleteTodo(id, index) {
    this.props.deleteToDo(id, index);
  }

  handleAllTodos() {
    this.setState({allLoaded: true});
  }

  handleTodosCount() {
    const {todos} = this.props;
    const {allLoaded} = this.state;
    if (todos && todos.length > LIMIT && !allLoaded) {
      return todos.slice(0, LIMIT);
    }
    return todos;
  }

  handleCheckTodo(todo) {
    this.props.checkTodo(todo);
  }

  getLoadAllButton () {
    const {allLoaded} = this.state;
    if (!allLoaded) return <Button color="success" onClick={this.handleAllTodos}>Load All</Button>;
  }

  getTodosList() {
    const {isLoading} = this.props;
    const todos = this.handleTodosCount();
    return isLoading
      ? <Spinner/>
      : <TodoList todoList={todos} deleteTodo={this.handleDeleteTodo} check={this.handleCheckTodo}/>
  }

  render() {
    return (
      <div className="App">
        <AddTodo addNewTodo={this.handleAddTodo} />
        {this.getTodosList()}
        {this.getLoadAllButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => dispatch (actionCreators.loadDbTodos()),
    deleteToDo: (id, index) => dispatch (actionCreators.removeDbTodo(id, index)),
    addTodo: (todoName, todoDesription, picture) => dispatch(actionCreators.addDbTodo(todoName, todoDesription, picture)),
    checkTodo: (todo) => dispatch(actionCreators.checkTodo(todo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
