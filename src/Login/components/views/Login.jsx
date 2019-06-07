import React from "react";

import "../styles/login-styles.scss";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "https://sheltered-inlet-93880.herokuapp.com/login";
  };

  return (
    <div className="login">
      <div className="login__logo-container">
        <img
          src="../../../../statics/images/Logo/Spotify_Icon_RGB_Green.png"
          className="login__logo-image"
          alt="spotify-logo" />
        <span className="login__logo-text">Spoitfy</span>
      </div>
      <button className="login__button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
