// LoginCard.js
"use client";
import "react";
import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginCard.css";
import Link from 'next/link';

export default function Login() {
  const [name, setName] = useState("");
  const [l_name, setL_name] = useState("");
  const [document, setDoc] = useState("");
  const [password, setPassword] = useState("");
  const [swapLogin, setSwapLogin] = useState(false);
  const [nameLogin, setNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const handleConfirm = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/users", {
        Name: name,
        Last_Name: l_name,
        Password: password,
        Document: document,
      });

      console.log("Resposta do backend:", response.data);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const login = async () => {
    try{ const response = await axios.post("http://127.0.0.1:8000/login",{
      Name: nameLogin,
      Password: passwordLogin
    });
    const data = await response.data;
    console.log(data);
    window.localStorage.setItem("token", data["acess token"]);

    }catch (error) {
      console.error("Erro na validação do token", error)
    }
  };

  const handleSign = () => {
    setSwapLogin(!swapLogin);
  };

  return (
    <body className="body-l">
    <div
      className={`container text-black ${
        swapLogin ? "right-panel-active" : ""
      }`}
      id="container"
    >
      <div className="form-container sign-up-container">
        <form className="form-l" action="#">
          <h1 className="h1-l">Crie uma conta</h1>
          <span className="span-l">Relize o casdastro das suas informações</span>
          <input
            type="text"
            placeholder="Nome"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-l"
          />
          <input
            type="text"
            placeholder="Sobrenome"
            id="l_name"
            value={l_name}
            onChange={(e) => setL_name(e.target.value)}
            className = "input-l"
          />
          <input
            type="text"
            placeholder="Documento"
            id="doc"
            value={document}
            onChange={(e) => setDoc(e.target.value)}
            className="input-l"
          />
          <input
            type="password"
            placeholder="Senha"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-l"
          />
          <button className="button-l" onClick={handleConfirm}>Cadastrar</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="form-l" action="#">
          <h1 className="h1-l">Login</h1>
          <input type="text" placeholder="Nome" id="namelog" value={nameLogin} onChange={(e) => setNameLogin(e.target.value)} className="input-l" />
          <input type="password" placeholder="Senha" id="passlog" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} className="input-l" />
          <a className="a-l" href="#">Esqueceu sua senha?</a>
          <Link href= "/home">
          <button className="button-l" onClick={login}>Login</button>
          </Link>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1-l">Bem vindo de volta!</h1>
            <p>
              Se mantenha conectado! Realize o login
            </p>
            <button className="button-l ghost" onClick={() => handleSign()} id="signIn">
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="h1-l">Ola, amigo!</h1>
            <p>Faça seu cadastro e aproveite o Navguide</p>
            <button className="button-l ghost" onClick={() => handleSign()} id="signUp">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
    </body>
  );
}
