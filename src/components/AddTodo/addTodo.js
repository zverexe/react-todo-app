import React from 'react';
import {Button, Col, Container, Form} from 'reactstrap';

import styles from './addTodo.scss';

const addTodo = (props) => {
  let nameInput;
  let descriptionInput;
  let todoImage;
  let imageRef;

  const onSubmitClick = () => {
    props.addNewTodo(nameInput.value, descriptionInput.value, todoImage);
    nameInput.value = null;
    descriptionInput.value = null;
    imageRef.value = null;
    debugger;
  };

  return (
    <Container>
      <Col sm="12">
        <div className={styles.add_todo_wrapper}>
          <h3>Add Todo</h3>
          <Form className={styles.newPost}>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Todo title</label>
              <input type="text"
                     name="title"
                     className="form-control"
                     ref={node => nameInput = node}
                /*onChange={(event) => nameInput = event.target.value}*/
                     placeholder="Todo Name"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Todo descirption</label>
              <textarea rows="3" className="form-control"
                        ref={node => descriptionInput = node}
                /*onChange={(event) => descriptionInput = event.target.value}*/
                        name="description"
                        placeholder="Todo Description">
										</textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Todo title</label>
              <input type="file" name="picture" className="form-control"
                     ref={node => imageRef = node}
                     onChange={(event) => todoImage = event.target.files[0]}
                     placeholder="Todo Name"/>
            </div>
            <Button color="primary" onClick={onSubmitClick}>Add Post</Button>
          </Form>
        </div>
      </Col>
    </Container>
  );
};

export default addTodo;