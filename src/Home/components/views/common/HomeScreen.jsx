import React from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import "../../styles/home-screen.scss";

const HomeScreen = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return (
      <div className="home-screen__loading-screen">
        <Loader/>
      </div>
    );
  }
  return (
    <div className="home-screen__container">
      <h1 className="home-screen__header">Editor's picks</h1>
      <div className="home-screen__picks--list">
        {
          data.albums.items.map(cover => (
            <div
              className="home-screen__cover--art"
              style={{ backgroundImage: `url(${cover.images[0].url})` }}
            />
          ))
        }
      </div>
    </div>
  );
};

HomeScreen.propTypes = {
  data: PropTypes.object.isRequired
};

export default HomeScreen;
