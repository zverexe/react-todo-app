import React from 'react';
import Todo from '../Todo/todo';
import { Container, Col } from 'reactstrap';
import styles from './todoList.scss';

const todoList = (props) => {

  const {todoList} = props;
  let todoItems;
  if (todoList && todoList.length) {
    todoItems = props.todoList.map((todo) => {
      return (<Todo todo={todo} key={todo.id} delete = {props.deleteTodo}/>)
    });
  }
    return (
        <Container>
          <Col sm="12">
            <div className={styles.todo_list}>
                {todoItems}
            </div>
          </Col>
        </Container>
    );
}

export default todoList;