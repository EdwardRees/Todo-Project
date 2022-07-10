import {
  GET_TODO_LIST_SUCCESS,
  GET_TODO_LIST_FAIL,
  ADD_TODO_LIST_SUCCESS,
  ADD_TODO_LIST_FAIL,
  UPDATE_TODO_LIST_SUCCESS,
  UPDATE_TODO_LIST_FAIL,
  DELETE_TODO_LIST_SUCCESS,
  DELETE_TODO_LIST_FAIL,
  GET_TODO_LIST_ITEMS_SUCCESS,
  GET_TODO_LIST_ITEMS_FAIL,
} from "./types";
import api from "../util/api";

import { Dispatch } from "redux";

export const getTodoList = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/list/user", {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: GET_TODO_LIST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: GET_TODO_LIST_FAIL, payload: "No token" });
    }
  } catch (err: any) {
    dispatch({ type: GET_TODO_LIST_FAIL, payload: err.message });
  }
};

export const addTodoList = (name: string) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.post(
        "/list/user/create",
        {
          name,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      dispatch({
        type: ADD_TODO_LIST_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: ADD_TODO_LIST_FAIL,
        payload: "No token",
      });
    }
  } catch (err: any) {
    dispatch({ type: ADD_TODO_LIST_FAIL, payload: err.message });
  }
};

export const getListItems = (id: string) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get(`/list/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch({
        type: GET_TODO_LIST_ITEMS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_TODO_LIST_ITEMS_FAIL,
        payload: "No token",
      })
    }
  } catch (err: any) {
    dispatch({ type: GET_TODO_LIST_ITEMS_FAIL, payload: err.message });
  }
};
