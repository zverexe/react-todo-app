import * as firebase from '../config/config';

const db = firebase.database.ref().child('todos/');
const storageRef = firebase.storage.ref();

const images = timestamp => storageRef.child(`image/${timestamp}`);

export const apiAddTodo = async (todoName, todoDesription, picture) => {
    const todo = {
      name: todoName,
      body: todoDesription,
      status: false
    };

    if (picture) {
      const snapshot = await images(new Date().getTime()).put(picture);
      todo.image = snapshot.metadata.downloadURLs;
    }

    return db.push(todo);
};

export const apiRemoveTodo = (id) => {
  return db.child(id).remove();
};

export const loadTodosList = () => {
  return new Promise((res) => {
    db.once('value').then(snapshot => {
      const data = snapshot.val();
      const newData = [];
      if (data) {
        Object.keys(data).forEach(function (key) {
          data[key].id = key;
          newData.push(data[key])
        })
      }
      res(newData);
    });
  })
};
