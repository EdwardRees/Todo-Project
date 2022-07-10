import {
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  MARK_COMPLETE_TODO_SUCCESS,
  MARK_COMPLETE_TODO_FAIL,
  MARK_INCOMPLETE_TODO_SUCCESS,
  MARK_INCOMPLETE_TODO_FAIL,
  GET_COMPLETED_TODOS_SUCCESS,
  GET_COMPLETED_TODOS_FAIL,
} from "../actions/types";

const intialState = {
  todos: [],
  completedTodos: [],
  loading: false,
  error: null,
};

const todoReducer = (state = intialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo: any) => {
          if (todo.id === payload.id) {
            return payload;
          }
          return todo;
        }),
        loading: false,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo: any) => todo.id !== payload),
        loading: false,
      };
    case MARK_COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo: any) => {
          if (todo.id === payload) {
            return {
              ...todo,
              completed: true,
            };
          }
          return todo;
        }),
        loading: false,
      };
    case MARK_INCOMPLETE_TODO_SUCCESS:
      return {
        ...state,

        todos: state.todos.map((todo: any) => {
          if (todo.id === payload) {
            return {
              ...todo,
              completed: false,
            };
          }
          return todo;
        }),
        loading: false,
      };
    case GET_COMPLETED_TODOS_SUCCESS:
      return {
        ...state,
        completedTodos: payload,
        loading: false,
      };
    case GET_TODOS_FAIL:
    case ADD_TODO_FAIL:
    case UPDATE_TODO_FAIL:
    case DELETE_TODO_FAIL:
    case MARK_COMPLETE_TODO_FAIL:
    case MARK_INCOMPLETE_TODO_FAIL:
    case GET_COMPLETED_TODOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
