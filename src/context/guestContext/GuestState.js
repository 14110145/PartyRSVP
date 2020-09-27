import React, { useReducer } from "react";
import axios from "axios";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import {
  TOGGLE_FILTER,
  SEARCH_GUEST,
  CLEAR_GUEST,
  ADD_GUEST,
  REMOVE_GUEST,
  UPDATE_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT_GUEST,
  GUEST_ERROR,
  GET_GUEST,
} from "../types";

function GuestState(props) {
  const initialState = {
    filterGuest: false,
    search: null,
    editAble: null,
    guests: [],
    errors: null,
  };
  const [state, dispatch] = useReducer(guestReducer, initialState);

  const getGuests = async () => {
    try {
      const res = await axios.get("/guests");
      dispatch({
        type: GET_GUEST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const toggleFilter = () => {
    dispatch({ type: TOGGLE_FILTER });
  };

  const searchGuest = (guest) => {
    dispatch({ type: SEARCH_GUEST, payload: guest });
  };

  const clearGuest = () => {
    dispatch({ type: CLEAR_GUEST });
  };

  const addGuest = async (guest) => {
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post("/guests", guest, config);
      dispatch({ type: ADD_GUEST, payload: res.data });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const removeGuest = async (id) => {
    try {
      await axios.delete(`/guests/${id}`);
      dispatch({ type: REMOVE_GUEST, payload: id });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const updateGuest = async (guest) => {
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.put(`/guests/${guest._id}`, guest, config);
      dispatch({ type: UPDATE_GUEST, payload: res.data });
    } catch (error) {
      dispatch({
        type: GUEST_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const editGuest = (guest) => {
    dispatch({ type: EDIT_GUEST, payload: guest });
  };

  const clearEditGuest = () => {
    dispatch({ type: CLEAR_EDIT_GUEST });
  };

  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,
        toggleFilter,
        filterGuest: state.filterGuest,
        search: state.search,
        searchGuest,
        clearGuest,
        addGuest,
        removeGuest,
        updateGuest,
        editAble: state.editAble,
        editGuest,
        clearEditGuest,
        getGuests,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
}

export default GuestState;
