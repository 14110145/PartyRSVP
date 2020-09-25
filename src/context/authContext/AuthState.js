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
} from "../types";

const AuthState = (props) => {
  const initialState = {
    userAuth: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "applicat/ion/json",
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
        payload: error.response.data,
      });
    }
  };

  const loginUser = async (userData) => {
    const config = {
      header: {
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
        userAuth: state.userAuth,
        errors: state.errors,
        loginUser,
        registerUser,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
