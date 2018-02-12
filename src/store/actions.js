import * as firebase from 'firebase';
import { database, storage } from '../config/config';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const LOAD_DB_TODOS = 'LOAD_DB_TODOS';
export const LOAD_ALL_TODOS = 'LOAD_ALL_TODOS';

export const addTodo = (data) => {
  return {
    type: ADD_TODO,
    todo: data
  }
};

export const removeTodo = (index) => {
  return {
    type: REMOVE_TODO,
    index: index
  }
};

export const initTodos = (todos) => {
  return {
    type: INIT_TODOS,
    todos: todos
  }
};

export const loadAllItems = (todos) => {
  return {
    type: LOAD_ALL_TODOS,
    todos: todos
  }
};

export const removeDbTodo = (id, index) => {
  return dispatch => {
    const db = database.ref().child('todos');
    db.child(id).remove();
    db.on('child_removed', () => {
      dispatch(removeTodo(index));
    });
  }
}

export const loadDbTodos = () => {
  return dispatch => {
    const db = database.ref().child('todos').limitToFirst(3);
    db.on('value', (snapshot) => {
      const data = snapshot.val();
      const newData = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          data[key].id = key;
          newData.push(data[key]);
        });
      }
      dispatch(initTodos(newData));
    });
  }
};

export const loadAllTodo = () => {
  return dispatch => {
    const db = database.ref().child('todos');
    db.on('value', (snapshot) => {
      const data = snapshot.val();
      const newData = [];
      Object.keys(data).forEach(function (key, index) {
        data[key].id = key;
        newData.push(data[key]);
      });
      dispatch(loadAllItems(newData));
    });
  }
}

export const addDbTodo = (todoName, todoDesription, picture) => {
  const db = database.ref().child('todos/');

  const storeTodo = (todo) => {
    db.push(todo).then( () => {
      console.log('Success');
    }).catch( () => {
      console.log('Failed');
    });
  }
  const storageRef = storage.ref();
  return dispatch => {
    const todo = {
      name: todoName.value,
      body: todoDesription.value,
      status: false
    }
    if (picture) {
      storageRef.child(`image/${new Date().getTime()}`).put(picture).then( snapshot => {
        todo.image = snapshot.metadata.downloadURLs;
        storeTodo(todo);
      });
    } else {
      storeTodo(todo);
    }
  }
}