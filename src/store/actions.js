import axios from 'axios';
import * as firebase from 'firebase';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const LOAD_DB_TODOS = 'LOAD_DB_TODOS';

var config = {
  apiKey: "AIzaSyALtlPVAq2PLYiXF3CT_EFFs9210VCPcvo",
  authDomain: "react-todo-app-4b652.firebaseapp.com",
  databaseURL: "https://react-todo-app-4b652.firebaseio.com",
  projectId: "react-todo-app-4b652",
  storageBucket: "react-todo-app-4b652.appspot.com",
  messagingSenderId: "535168616242"
};
firebase.initializeApp(config);
const firebaseStorage = firebase.storage().ref();

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

export const removeDbTodo = (id, index) => {
  return dispatch => {
    axios.delete(`https://react-todo-app-4b652.firebaseio.com/todos/${id}.json`, id).then(res => {
      dispatch(removeTodo(index));
    }).catch(err => {
      console.log(err);
    });
  }
}

export const loadDbTodos = () => {
  return dispatch => {
    axios.get('https://react-todo-app-4b652.firebaseio.com/todos.json').then(res => {
      const data = [];
      Object.keys(res.data).forEach(function (key, index) {
        res.data[key].id = key;
        data.push(res.data[key]);
      });
      dispatch(initTodos(data));
      }).catch(err => {
      console.log(err);
    });
  }
};

export const addDbTodo = (todoName, todoDesription, picture) => {
  return dispatch => {
    const todo = {
      name: todoName.value,
      body: todoDesription.value,
      status: false
    }
    console.log(picture);
    firebaseStorage.child(`image/${new Date().getTime()}`).put(picture).then((snapshot) => {      
      todo.image = snapshot.metadata.downloadURLs;
      axios.post('https://react-todo-app-4b652.firebaseio.com/todos.json', todo).then(res => {
        let data = JSON.parse(res.config.data);
        data.id = res.data.name;
        dispatch(addTodo(data))
      }).catch(err => {
        console.log(err);
      });
    });
  }
}