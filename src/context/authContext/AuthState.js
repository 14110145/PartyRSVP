import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  SET_ERROR,
  CLEAR_ERROR,
  LOG_OUT,
  SET_USER,
  AUTH_ERROR,
} from "../types";
import setToken from "../../utils/setToken";

const AuthState = (props) => {
  const initialState = {
    user: null,
    userAuth: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUser = async () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/auth");
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data,
      });
    }
  };

  const registerUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/register", userData, config);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_REGISTER,
        payload: error.response.msg,
      });
    }
  };

  const loginUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/auth", userData, config);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_LOGIN,
        payload: error.response.data,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOG_OUT,
    });
  };

  const setError = (error) => {
    dispatch({
      type: SET_ERROR,
      payload: error,
    });
  };

  const clearError = (error) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        loginUser,
        registerUser,
        setError,
        clearError,
        logout,
        getUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
