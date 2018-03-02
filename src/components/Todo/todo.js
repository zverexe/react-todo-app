import React from 'react';
import { Card, CardImg, CardBody, Button } from 'reactstrap';
import './todo.scss';
import defaultImage from '../../assets/default.jpg';

const todo = (props) => {
  let icon = props.todo.image ? props.todo.image : defaultImage;
    return (
      <div className="card-wrapper">
        <Card className="card-item">
          <CardImg top width="100%" src={icon} alt="Card image cap" />
          <CardBody>
            <h4>{props.todo.name}</h4>
            <p>{props.todo.body}</p>
            <Button color="danger" onClick={() => props.delete(props.todo.id, props.todoIndex)}>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
}

export default todo;