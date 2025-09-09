import React, { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <br />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
