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

    const three = 3;
    this.state = {
      showButton: true
    }
  }

  componentDidMount() {
    this.props.loadTodos();
	}

  handlFirstTodos() {
    return this.props.todos.map( (item, index) => {
      if (index === this.three && this.state.showButton) {

      }
      return item;
    })
  }

  handleAddTodo(todoName, todoDesription, picture) {
    this.props.addTodo(todoName, todoDesription, picture);
  }

  handleDeleteTodo(id, index) {
    this.props.deleteToDo(id, index);
  }

  handleAllTodos() {
    this.props.loadAll();
    this.setState({showButton: false});
  }

  getLoadAllButton () {
    const {todos} = this.props;
    const {showButton} = this.state;
    const isTodosLoaded = todos && todos.length;
    if (isTodosLoaded && showButton) return <Button color="success" onClick={this.handleAllTodos}>Load All</Button>;
  }

  render() {
    let {todos} = this.props;
    let list = null;
    if (todos && todos.length) {
      list = <TodoList todoList={this.props.todos} checkTodo={this.handleCheckTodo} deleteTodo={this.handleDeleteTodo} />
    } else {
      list = <Spinner />
    }

    return (
      <div className={styles.App}>
        <AddTodo addNewTodo={this.handleAddTodo} />
        {list}
        {this.getLoadAllButton()}
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
