import React, { useContext, useRef } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestSearch = () => {
  const searchValue = useRef("");
  const { searchGuest, clearGuest } = useContext(GuestContext);
  const handleChange = (e) => {
    if (searchValue.current.value !== "") {
      searchGuest(e.target.value);
    } else {
      clearGuest();
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        className="search"
        placeholder=" Search Guest by name ..."
      />
      <i className="fas fa-search search-icon" />
    </div>
  );
};

export default GuestSearch;
