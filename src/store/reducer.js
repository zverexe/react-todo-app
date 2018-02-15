import * as actionTypes from './actions';

const initialState ={
  loadAllTodo: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_TODOS:
      return {
        ...state,
        todos: action.todos
      }
    case actionTypes.REMOVE_TODO:
    const newArr = state.todos;
      if(newArr.indexOf(action.index)){
        newArr.splice(action.index, 1);
      }
      return {
        ...state,
        todos: [...newArr]
      }
    case actionTypes.LOAD_ALL_TODOS: {
      return {
        ...state,
        todos: [...action.todos]
      }
    }
    default:
      return {
        state
      }
  }
};

export default reducer;