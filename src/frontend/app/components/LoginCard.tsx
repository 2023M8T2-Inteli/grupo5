// LoginCard.js
"use client";
import "react";
import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginCard.css";

export default function Login() {
  const [name, setName] = useState("");
  const [l_name, setL_name] = useState("");
  const [document, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [swapLogin, setSwapLogin] = useState(false);

  const handleConfirm = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users", {
        Name: name,
        Last_Name: l_name,
        Password: password,
        Document: document
      });

      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const handleSign = () => {
    setSwapLogin(!swapLogin);
  };

  return (
    <div
      className={`container text-black ${
        swapLogin ? "right-panel-active" : ""
      }`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Nome"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="L_name"
            placeholder="Sobrenome"
            id="l_name"
            value={l_name}
            onChange={(e) => setL_name(e.target.value)}
          />
          <input
            type="document"
            placeholder="Documento"
            id="doc"
            value={document}
            onChange={(e) => setDoc(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleConfirm}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign In</h1>
          <span>or use your account</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot yout password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost"
              onClick={() => handleSign()}
              id="signIn"
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal info and start journey with us</p>
            <button
              className="ghost"
              onClick={() => handleSign()}
              id="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
