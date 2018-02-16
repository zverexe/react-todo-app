import * as actionTypes from './actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.INIT_TODOS:
      return {
        ...state,
        todos: action.todos
      };
    case actionTypes.LOADING_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        state
      }
  }
};

export default reducer;