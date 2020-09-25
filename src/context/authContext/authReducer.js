import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  SUCCESS_REGISTER,
  FAIL_REGISTER,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case SUCCESS_REGISTER:
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userAuth: true,
        errors: null,
      };
    case FAIL_LOGIN:
    case FAIL_REGISTER:
      return {
        ...state,
        userAuth: null,
        errors: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null,
      };
    default:
      return state;
  }
};
