import React, { useState, useContext, useEffect } from "react";
import GuestContext from "../../context/guestContext/guestContext";

const GuestForm = () => {
  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    dietary: "Non-Vegan",
  });
  const { addGuest, clearEditGuest, editAble, updateGuest } = useContext(GuestContext);
  const { name, phone, dietary } = guest;

  useEffect(() => {
    if (editAble !== null) {
      setGuest(editAble);
    } else {
      setGuest({
        name: "",
        phone: "",
        dietary: "Non-Vegan",
      });
    }
  }, [editAble]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setGuest({
      ...guest,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editAble !== null) {
      updateGuest(guest);
      clearEditGuest();
    } else {
      addGuest(guest);
      setGuest({
        name: "",
        phone: "",
        dietary: "Non-Vegan",
      });
    }
  };
  return (
    <div className="invite-section">
      <h1>{editAble ? "Update Guest" : "Invite Someone"}</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} />
        <input type="text" placeholder="Phone" name="phone" value={phone} onChange={handleChange} />
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">
            Non-veg
            <input
              type="radio"
              name="dietary"
              value="Non-Vegan"
              onChange={handleChange}
              checked={dietary === "Non-Vegan"}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Vegan
            <input
              type="radio"
              name="dietary"
              value="Vegan"
              onChange={handleChange}
              checked={dietary === "Vegan"}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Pescatarian
            <input
              type="radio"
              name="dietary"
              value="Pescatarian"
              onChange={handleChange}
              checked={dietary === "Pescatarian"}
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <input type="submit" value={editAble ? "Update " : "Add Guest"} className="btn" />
        {editAble ? (
          <button className="btn" onClick={() => clearEditGuest()}>
            Cancle
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default GuestForm;
