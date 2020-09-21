import { TOGGLE_FILTER, SEARCH_GUEST, CLEAR_GUEST } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SEARCH_GUEST:
      const reg = new RegExp(`${payload}`, "gi");
      return {
        ...state,
        search: state.guests.filter((guest) => guest.name.match(reg)),
      };
    case CLEAR_GUEST:
      return {
        ...state,
        search: null,
      };
    case TOGGLE_FILTER:
      return {
        ...state,
        filterGuest: !state.filterGuest,
      };
    default:
      return state;
  }
};
