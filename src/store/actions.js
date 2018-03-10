import {
  apiAddTodo,
  apiRemoveTodo,
  loadTodosList,
  apiCheckTodo
} from '../services/dbService';

export const INIT_TODOS = 'INIT_TODOS';
export const LOADING_REQUEST = 'LOADING_REQUEST';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';

export const loadingRequest = () => ({
  type: LOADING_REQUEST
});

export const loadingSuccess = () => ({
  type: LOADING_SUCCESS
});

export const initTodos = (todos) => ({
  type: INIT_TODOS,
  todos: todos
});

export const loadDbTodos = () => dispatch => {
  dispatch(loadingRequest());
  loadTodosList().then(todos => {
    dispatch(loadingSuccess());
    dispatch(initTodos(todos))
  });
};

export const addDbTodo = (todoName, todoDescription, picture) => dispatch =>{
  apiAddTodo(todoName, todoDescription, picture).then(() => {
    dispatch(loadDbTodos());
  });
};

export const removeDbTodo = (id) => dispatch => {
  apiRemoveTodo(id).then(() => {
    dispatch(loadDbTodos());
  });
};

export const checkTodo = (todo) => dispatch => {
  apiCheckTodo(todo).then(() => {
    dispatch(loadDbTodos());
  });
}
