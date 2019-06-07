import React from "react";
import PropTypes from "prop-types";

import "../../styles/album-card.scss";

const AlbumCard = ({ data, artistName, fetchAlbumSongs }) => {
  const styles = {
    container: "album-card__container",
    cover: "album-card__cover",
    details: "album-card__details",
    artistName: "album-card__artist--name",
    artistAlbum: "album-card__artist--album",
    songsCount: "album-card__artist--songs-count"
  };
  const handleAlbumSongs = (data) => {
    return function _fetchAlbumSongs () {
      fetchAlbumSongs(data);
    };
  };
  return (
    <div className={styles.container} onClick={handleAlbumSongs(data)}>
      <div
        className={styles.cover}
        style={data.images && data.images[1] && data.images[1].url ?
          { backgroundImage: `url(${data.images[1].url})` } :
          {}}
      />
      <div className={styles.details}>
        <span className={styles.artistName}>
          {artistName}
        </span>
        <span className={styles.artistAlbum}>
          {"Album : "}{`${data.name}`}
        </span>
        <span className={styles.songsCount}>
          {"Songs : "}{data.total_tracks}
        </span>
      </div>
    </div>
  );
};

AlbumCard.propTypes = {
  data: PropTypes.object.isRequired,
  artistName: PropTypes.string.isRequired,

  fetchAlbumSongs: PropTypes.func.isRequired
};

export default AlbumCard;
