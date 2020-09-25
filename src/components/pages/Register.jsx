import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Register = (props) => {
  const { registerUser, userAuth, errors, setError, clearError } = useContext(AuthContext);
  const [user, setUser] = useState({ name: "", email: "", password: "", rePassword: "" });
  const { name, email, password, rePassword } = user;

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history]);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
    clearError();
  };

  const submit = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError({ msg: "Password don't match" });
    } else {
      registerUser({ name, email, password });
      clearError();
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={submit}>
        <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="rePassword"
          placeholder="Re-password"
          value={rePassword}
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" className="btn" />
      </form>
      <div className="question">
        {errors !== null && (
          <button className="danger">
            {errors.msg ? errors.msg : errors.error[0].msg}
            <span onClick={() => clearError()}>X</span>
          </button>
        )}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
