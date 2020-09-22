import React, { useReducer } from "react";
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
} from "../types";

function GuestState(props) {
  const initialState = {
    filterGuest: false,
    search: null,
    editAble: null,
    guests: [
      {
        id: 1,
        name: "Jake Smith",
        phone: "333 444 9999",
        dietary: "Vegan",
        isconfirmed: false,
      },
      {
        id: 2,
        name: "Merry Williams",
        phone: "222 555 7777",
        dietary: "Non-Vegan",
        isconfirmed: true,
      },
      {
        id: 3,
        name: "TP Phu",
        phone: "111 222 3333",
        dietary: "Pescatarian",
        isconfirmed: true,
      },
    ],
  };
  const [state, dispatch] = useReducer(guestReducer, initialState);

  const toggleFilter = () => {
    dispatch({ type: TOGGLE_FILTER });
  };

  const searchGuest = (guest) => {
    dispatch({ type: SEARCH_GUEST, payload: guest });
  };

  const clearGuest = () => {
    dispatch({ type: CLEAR_GUEST });
  };

  const addGuest = (guest) => {
    const id = Date.now();
    const isconfirmed = false;
    dispatch({ type: ADD_GUEST, payload: { ...guest, id, isconfirmed } });
  };

  const removeGuest = (id) => {
    dispatch({ type: REMOVE_GUEST, payload: id });
  };

  const updateGuest = (guest) => {
    dispatch({ type: UPDATE_GUEST, payload: guest });
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
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
}

export default GuestState;
