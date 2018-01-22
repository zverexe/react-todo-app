import React from 'react';
import { Container, Col, Row, Button, Form, Label, Input, FormGroup } from 'reactstrap';

import styles from './addTodo.scss';

const addTodo = (props) => {
    let nameInput;
    let descriptionInput;

   
        return (
            <Container>
                <Col sm="12">
                    <div className={styles.add_todo_wrapper}>
                    <h1>Add Todo</h1>
                    <Form className={styles.newPost}>                         
                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <input type="text" name="name" ref={ node => nameInput = node }
                            /*onChange={(event) => nameInput = event.target.value}*/ placeholder="Todo Name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Todo descirption</Label>
                            <input type="text" ref={ node => descriptionInput = node } 
                            /*onChange={(event) => descriptionInput = event.target.value}*/
                        name="text" />
                        </FormGroup>       
                        <Button color="success" onClick={() => {
                            props.addNewTodo(nameInput, descriptionInput);
                            nameInput.value = null;
                            descriptionInput.value = null;
                        }}>Add Post</Button>
            
                        </Form>
                    </div>
                </Col>
            </Container>            
        );   
}

export default addTodo;