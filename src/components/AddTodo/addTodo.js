import React from 'react';
import { Container, Col, Row, Button, Form, Label, Input, FormGroup } from 'reactstrap';

import styles from './addTodo.scss';

const addTodo = (props) => {
    let nameInput;
    let descriptionInput;
    let todoImage;
    let imageRef;
        return (
            <Container>
                <Col sm="12">
                    <div className={styles.add_todo_wrapper}>
                    <h1>Add Todo</h1>
                    <Form className={styles.newPost}>
												<div class="form-group">
													<label for="exampleInputPassword1">Todo title</label>
													<input type="text" name="title" class="form-control"
															 ref={ node => nameInput = node }
														/*onChange={(event) => nameInput = event.target.value}*/
															 placeholder="Todo Name" />
											  </div>
												<div class="form-group">
													<label for="exampleInputPassword1">Todo descirption</label>
													<textarea rows="3" class="form-control"
																 ref={ node => descriptionInput = node }
                            /*onChange={(event) => descriptionInput = event.target.value}*/
																	name="description"
																	placeholder="Todo Description">
																	</textarea>
                        </div>
                        <div class="form-group">
                        <label for="exampleInputPassword1">Todo title</label>
                        <input type="file" name="picture" class="form-control"
                            ref={ node => imageRef = node }
                             onChange={(event) =>  todoImage = event.target.files[0]}
                             placeholder="Todo Name" />
                        </div>
                        <Button color="success" onClick={() => {
                            props.addNewTodo(nameInput, descriptionInput, todoImage);
                            nameInput.value = null;
                            descriptionInput.value = null;
                            imageRef.value = null;
                        }}>Add Post</Button>
                        </Form>
                    </div>
                </Col>
            </Container>
        );
}

export default addTodo;