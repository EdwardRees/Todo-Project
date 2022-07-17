import api from "../util/api";
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOAD_FAIL,
  LOGOUT
} from "./types";
import { Dispatch } from "redux";

export const loadUser = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/user/get", {
        headers: { "Content-Type": "application/json", "x-auth-token": token },
      });
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } else {
      dispatch({
        type: USER_LOAD_FAIL,
        payload: "No token found",
      });
    }
  } catch (err: any) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: err.response.data.error,
    });
  }
};

export const register = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post("/auth/register", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err: any) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.msg,
    });
    return false;
  }
};

export const login = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post("auth/login", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    return true;
  } catch (err: any) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg,
    });
    return false;
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT
  });
};

