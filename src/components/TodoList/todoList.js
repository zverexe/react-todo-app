import React from 'react';
import Todo from '../Todo/todo';
import { Container, Col } from 'reactstrap';
import styles from './todoList.scss';

const todoList = (props) => {
  const todoItem = props.todoList.map((todo, index) => {
    return (<Todo todo={todo} check = {props.checkTodo} key={todo.id} todoIndex = {index} delete = {props.deleteTodo}/>)
    });
    return (
        <Container>
          <Col sm="12">
            <div className={styles.todo_list}>
                {todoItem}
            </div>
          </Col>
        </Container>
    );
}

export default todoList;