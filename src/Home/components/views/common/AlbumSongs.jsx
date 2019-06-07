import React, { useEffect } from "react";
import PropTypes from "prop-types";

import "../../styles/album-songs.scss";
import { ALBUM_SONGS } from "../../Enum";

const AlbumSongs = ({ data, selectedAlbum, fetchSong, setPlayAll }) => {
  useEffect(() => {
    setPlayAll(false);
  }, [selectedAlbum]);

  if (data && data.items && data.items.length > 0) {
    const styles = {
      container: "album-songs__container",
      header: "album-songs__header",
      artistName: "album-songs__header__album--name",
      noOfSongs: "album-songs__header__album--songs-count",
      playAllCta: "album-songs__header__play--all",
      songsList: "album-songs__list",
      song: "album-songs__list__item",
      songName: "album-songs__list__item--name",
      songDuration: "album-songs__list__item--duration"
    };

    const handleFetchSong = data => {
      return function _fetchSong () {
        fetchSong(data);
      };
    };

    const getDuration = (ms) => {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds}`;
    };
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.artistName}>
              {selectedAlbum.name}
            </span>
            <span className={styles.noOfSongs}>
              {` (${selectedAlbum.total_tracks})`}
            </span>
          </div>
          <div className={styles.playAllCta} onClick={() => setPlayAll(true)}>
            {ALBUM_SONGS.PLAY_ALL}
          </div>
        </div>
        <div className={styles.songsList}>
          <div>
            {data.items.map(song => (
              <div className={styles.song} key={song.id} onClick={handleFetchSong(song)}>
                <span className={styles.songName}>{song.name}</span>
                <span className={styles.songDuration}>{getDuration(song.duration_ms)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div />
  );
};

AlbumSongs.propTypes = {
  data: PropTypes.object.isRequired,
  selectedAlbum: PropTypes.object.isRequired,

  setPlayAll: PropTypes.func.isRequired,
  fetchSong: PropTypes.func.isRequired
};

export default AlbumSongs;
