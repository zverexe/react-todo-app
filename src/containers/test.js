import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import styles from './App.scss';

import AddTodo from '../components/AddTodo/addTodo';
import TodoList from '../components/TodoList/todoList';
import Spinner from '../components/Spinner/spinner';
import {addDbTodo, loadDbTodos, removeDbTodo} from '../store/actions';

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
        this.props.addTodo(todoName.value, todoDesription.value, picture);
    }

    handleDeleteTodo(id, index) {
        this.props.deleteToDo(id, index);
    }

    getLoadAllButton() {
        const {allLoaded} = this.state;
        if (!allLoaded) return <Button color="success" onClick={this.showAll}>Load All</Button>;
    }

    showAll () {
        this.setState({allLoaded: true});
    }

    handleTodosCount () {
        const {todos} = this.props;
        const {allLoaded} = this.state;
        if (todos && todos.length > LIMIT && !allLoaded) {
            return todos.slice(0, LIMIT);
        }
        return todos;
    }

    getTodosList() {
        const {isLoading} = this.props;
        const todos = this.handleTodosCount();
        return isLoading
            ? <Spinner/>
            : <TodoList todoList={todos} deleteTodo={this.handleDeleteTodo}/>
    }

    render() {
        return (
            <div className={styles.App}>
                <AddTodo addNewTodo={this.handleAddTodo}/>
                {this.getTodosList()}
                {this.getLoadAllButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos,
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch) => ({
    loadTodos: () => dispatch(loadDbTodos()),
    deleteToDo: (id, index) => dispatch(removeDbTodo(id, index)),
    addTodo: (todoName, todoDesription, picture) => dispatch(addDbTodo(todoName, todoDesription, picture))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);