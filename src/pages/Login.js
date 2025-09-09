import React, { useState } from "react";
import { loginUser } from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem" }}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
