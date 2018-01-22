import React from 'react';
import {ListGroupItem} from 'reactstrap'
import styles from './todo.scss';

const todo = (props) => {      
         
    return (
        <ListGroupItem className={styles.todo_list_item + " " + (props.todo.status ? styles.disabled_todo : '')}>
            <button type="button" onClick={() => props.delete(props.todo.id)}>Delete</button>
            <div>
                <h4>{props.todo.name}</h4>
                <p>{props.todo.body}</p>
            </div>            
            <input type="checkbox" checked={props.todo.status} onChange={() => props.check(props.todo)} disabled={props.todo.status}/>           
        </ListGroupItem>

    );
}

export default todo;