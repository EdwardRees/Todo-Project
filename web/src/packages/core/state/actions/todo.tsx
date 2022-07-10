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
} from "./types";
import { Dispatch } from "redux";
import api from "../util/api";

export const getTodos = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/todos/user", {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: GET_TODOS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: GET_TODOS_FAIL, payload: "No token" });
    }
  } catch (err: any) {
    dispatch({ type: GET_TODOS_FAIL, payload: err.message });
  }
};

export const addTodo =
  (name: string, desc: string, listId: number) =>
  async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await api.post(
          "/todos/create",
          {
            name,
            desc,
            listId,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        dispatch({
          type: ADD_TODO_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: ADD_TODO_FAIL, payload: "No token" });
      }
    } catch (err: any) {
      dispatch({ type: ADD_TODO_FAIL, payload: err.message });
    }
  };

export const updateTodo =
  (name: string, desc: string, listId: number, id: number) =>
  async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await api.put(
          `/todos/update/${id}`,
          {
            name,
            desc,
            listId,
          },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        dispatch({
          type: UPDATE_TODO_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: UPDATE_TODO_FAIL, payload: "No token" });
      }
    } catch (err: any) {
      dispatch({ type: UPDATE_TODO_FAIL, payload: err.message });
    }
  };

export const deleteTodo = (id: number) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.delete(`/todos/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: DELETE_TODO_FAIL, payload: "No token" });
    }
  } catch (err: any) {
    dispatch({ type: DELETE_TODO_FAIL, payload: err.message });
  }
};

export const markCompleteTodo = (id: number) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.put(
        `/todos/complete/${id}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      dispatch({
        type: MARK_COMPLETE_TODO_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: MARK_COMPLETE_TODO_FAIL, payload: "No token" });
    }
  } catch (err: any) {
    dispatch({ type: MARK_COMPLETE_TODO_FAIL, payload: err.message });
  }
};

export const markIncompleteTodo =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await api.put(
          `/todos/incomplete/${id}`,
          {},
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        dispatch({
          type: MARK_INCOMPLETE_TODO_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: MARK_INCOMPLETE_TODO_FAIL, payload: "No token" });
      }
    } catch (err: any) {
      dispatch({ type: MARK_INCOMPLETE_TODO_FAIL, payload: err.message });
    }
  };

export const getCompletedTodos = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/todos/user/completed", {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: GET_COMPLETED_TODOS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: GET_COMPLETED_TODOS_FAIL, payload: "No token" });
    }
  } catch (err: any) {
    dispatch({ type: GET_COMPLETED_TODOS_FAIL, payload: err.message });
  }
};
