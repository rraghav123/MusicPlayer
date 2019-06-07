import React from "react";
import PropTypes from "prop-types";

import "../../styles/artist-albums.scss";
import { ARTIST_ALBUMS } from "../../Enum";

import AlbumCard from "./AlbumCard";
import AlbumSongs from "./AlbumSongs";

const ArtistAlbums = ({
  selectedArtist,
  albums,
  fetchAlbumSongs,
  selectedAlbum,
  albumSongs,
  fetchSong,
  setPlayAll
}) => {
  const styles = {
    container: "artist-album__container",
    cover: "artist-album__cover",
    image: "artist-album__cover--image",
    details: "artist-album__cover--details",
    listContainer: "artist-album__list__container",
    contentHeader: "artist-album__list__header",
    content: "artist-album__list__content",
    albums: "artist-album__list__albums",
    songs: "artist-album__list__albums--songs"
  };

  const renderAlbums = () => {
    return albums.items.map(album => (
      <AlbumCard
        data={album}
        key={album.id}
        artistName={selectedArtist.name}
        fetchAlbumSongs={fetchAlbumSongs}
      />
    ));
  };
  if (Object.keys(selectedArtist).length > 0 && Object.keys(albums).length > 0) {
    return (
      <div className={styles.container}>
        <div
          className={styles.cover}
        >
          <div
            className={styles.image}
            style={selectedArtist.images && selectedArtist.images[1] && selectedArtist.images[1].url ?
              { backgroundImage: `url(${selectedArtist.images[1].url})` } :
              {}}
          />
          <div className={styles.details}>
            <div>
              {ARTIST_ALBUMS.ARTIST}
            </div>
            <div>
              {selectedArtist.name}
            </div>
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.contentHeader}>{ARTIST_ALBUMS.ALBUMS}</div>
          <div className={styles.content}>
            <div className={styles.albums}
              style={{ flex: `${albumSongs && albumSongs.items && albumSongs.items.length > 0 ? "0.7" : "1" }` }}
            >
              <div>
                {renderAlbums()}
              </div>
            </div>
            {
              albumSongs && albumSongs.items && albumSongs.items.length > 0 &&
              <div
                className={styles.songs}
              >
                <AlbumSongs
                  data={albumSongs}
                  selectedAlbum={selectedAlbum}
                  fetchSong={fetchSong}
                  setPlayAll={setPlayAll}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
  return (<div />);
};

ArtistAlbums.propTypes = {
  selectedArtist: PropTypes.object.isRequired,
  albums: PropTypes.object.isRequired,
  selectedAlbum: PropTypes.object.isRequired,
  albumSongs: PropTypes.object.isRequired,

  fetchSong: PropTypes.func.isRequired,
  fetchAlbumSongs: PropTypes.func.isRequired,
  setPlayAll: PropTypes.func.isRequired
};

export default ArtistAlbums;
