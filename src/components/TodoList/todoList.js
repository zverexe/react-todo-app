import React from 'react';
import Todo from '../Todo/todo';
import { Container, Row, Col, Button, ListGroup } from 'reactstrap';
import styles from './todoList.scss';


const todoList = (props) => {
    
    
    const todoItem = props.todoList.map((todo) => {
        return (<Todo todo={todo} check = {props.checkTodo} key={todo.id} delete = {props.deleteTodo}/>)
      });

      return (
          <Container>
            <Col sm="12">
                <ListGroup className={styles.list}>
                    <div className={styles.todo_list}>
                        {todoItem}
                    </div>
                </ListGroup>                
            </Col>
          </Container>           
		
        );
}

export default todoList;