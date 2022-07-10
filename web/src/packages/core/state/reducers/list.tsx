import {
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAIL,
  ADD_TODO_LIST_SUCCESS,
  ADD_TODO_LIST_FAIL,
  DELETE_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_FAIL,
  UPDATE_TODO_LIST_SUCCESS,
  UPDATE_TODO_LIST_FAIL,
  GET_TODO_LIST_ITEMS_SUCCESS,
  GET_TODO_LIST_ITEMS_FAIL,
} from "../actions/types";

const initialState = {
  todoLists: [],
  todos: [],
  loading: false,
  error: null,
};

const listReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: payload,
        loading: false,
      };
    case ADD_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: [...state.todoLists, payload],
        loading: false,
      };
    case UPDATE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: state.todoLists.map((todoList: any) => {
          if (todoList.id === payload.id) {
            return payload;
          }
          return todoList;
        }),
        loading: false,
      };
    case DELETE_TODO_LIST_SUCCESS:
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (todoList: any) => todoList.id !== payload
        ),
        loading: false,
      };
    case GET_TODO_LIST_ITEMS_SUCCESS:
      return {
        ...state,
        todoLists: state.todoLists.map((todoList: any) => {
          if (todoList.id === payload.id) {
            return {
              ...todoList,
              todos: payload.todos,
            };
          }
          return todoList;
        }),
        loading: false,
      };
    case GET_TODO_LIST_FAIL:
    case ADD_TODO_LIST_FAIL:
    case UPDATE_TODO_LIST_FAIL:
    case DELETE_TODO_LIST_FAIL:
    case GET_TODO_LIST_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default listReducer;
