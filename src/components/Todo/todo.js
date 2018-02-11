import React from 'react';
import {ListGroupItem, Card, CardImg, CardBody, Button } from 'reactstrap'
import styles from './todo.scss';

const todo = (props) => {
    return (
      <div className={styles.card_wrapper}>
        <Card className={styles.card_item}>
          <CardImg top width="100%" src={props.todo.image[0]} alt="Card image cap" />
          <CardBody>
            <h4>{props.todo.name}</h4>
            <p>{props.todo.body}</p>
            <Button onClick={() => props.delete(props.todo.id, props.todoIndex)}>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
}

export default todo;