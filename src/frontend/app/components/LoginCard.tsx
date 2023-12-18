// LoginCard.js
import React from 'react';

const LoginCard = () => {
  return (
    <div className="login-card">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Nome:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginCard;