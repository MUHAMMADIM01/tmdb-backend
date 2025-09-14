import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setMessage(error.message);
    else setMessage("Check your email for confirmation link!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 block"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 block"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Sign Up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
      }
