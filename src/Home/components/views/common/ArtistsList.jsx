import React from "react";
import PropTypes from "prop-types";

import "../../styles/artists-list.scss";
import { ARTIST_LIST_STATICS } from "../../Enum";

const ArtistsList = ({ data, fetchArtistAlbum }) => {
  const styles = {
    card: "artist__card",
    cardImage: "artist__card__image",
    artistName: "artist__card__name",
    artistGenres: "artist__card__genres",
    artistPopularity: "artist__card__popularity",
    artistFollowers: "artist__card__followers",
    followersCount: "artist__card__followers-count",
    noArtistFound: "artist__card__no-result-found"
  };

  if (Object.keys(data).length > 0 && data.items && data.items.length > 0) {
    const getGenres = genres => genres.map((genre, index) => (
      <span>
        {`${genre}${index !== genres.length - 1 ? "," : ""}`}
      </span>
    ));

    const handleFetchArtistAlbum = (artist) => {
      return function __handleFetchArtistAlbum () {
        fetchArtistAlbum(artist);
      };
    };

    return data.items.map(artist => {
      return (
        <div className={styles.card} key={artist.id} onClick={handleFetchArtistAlbum(artist)}>
          <div>
            {
              artist.images && artist.images[1] && artist.images[1].url &&
                <div
                  style={{ backgroundImage: `url(${artist.images[1].url})` }}
                  className={styles.cardImage}
                />
            }
          </div>
          <div>
            <div className={styles.artistName}>{artist.name}</div>
            <div className={styles.artistGenres}>
              <span>
                {"Genre : "}{getGenres(artist.genres)}
              </span>
            </div>
            <div className={styles.artistPopularity}>{`Popularity : ${artist.popularity}%`}</div>
            {artist.followers.total &&
                <div className={styles.artistFollowers}>
                  {"Followers : "}
                  <span className={styles.followersCount}>
                    {`${(artist.followers.total / (1000 * 1000)).toFixed(2)}M`}
                  </span>
                </div>
            }
          </div>
        </div>
      );
    });
  }
  if (Object.keys(data).length > 0 && data.items && data.items.length === 0) {
    return (
      <div className={styles.noArtistFound}>
        {ARTIST_LIST_STATICS.NO_ARTIST_FOUND}
      </div>
    );
  }
  return (
    <div className={styles.noArtistFound}>
      {ARTIST_LIST_STATICS.ENTER_ARTIST_NAME}
    </div>
  );
};

ArtistsList.propTypes = {
  data: PropTypes.object.isRequired,
  fetchArtistAlbum: PropTypes.func.isRequired
};

export default ArtistsList;
