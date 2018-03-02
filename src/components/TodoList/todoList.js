import React from 'react';
import Todo from '../Todo/todo';
import { Container, Col } from 'reactstrap';
import './todoList.scss';

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
            <div className="todo-list">
                {todoItems}
            </div>
          </Col>
        </Container>
    );
}

export default todoList;