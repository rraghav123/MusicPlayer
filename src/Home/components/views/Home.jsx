import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import PropTypes from "prop-types";

import HomeActions from "../../redux/HomeActions";
import "../styles/home-styles.scss";

import HomeScreen from "./common/HomeScreen";
import ArtistsList from "./common/ArtistsList";
import ArtistAlbums from "./common/ArtistAlbums";
import Player from "./common/Player";

let controller;
let signal;

const Home = ({
  history,
  home,
  setQueryParams,
  fetchArtist,
  fetchArtistAlbum,
  fetchAlbumSongs,
  fetchSong,
  setPlayAll,
  playNext,
  playPrev,
  setArtistList,
  fetchNewReleases
}) => {
  const [inputValue, handleInputValue] = useState("");

  const handleSearchInput = (e) => {
    // abort any previous geocoding apis in progress
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    signal = controller.signal;
    handleInputValue(e.target.value);
    if (e.target.value.length > 0) {
      fetchArtist(e.target.value, signal);
    } else if (Object.keys(home.artists).length > 0) {
      setArtistList({ artists: {} });
    }
  };

  useEffect(() => {
    const queryParam = queryString.parseUrl(window.location.href).query;
    if (queryParam.access_token) {
      setQueryParams(queryParam);
    } else {
      history.replace("/");
    }
  }, [setQueryParams]);

  useEffect(() => {
    fetchNewReleases();
  }, [fetchNewReleases]);

  const getStyles = () => {
    return inputValue.length > 0 ?
      {
        flex: "0.2",
        minWidth: "30rem"
      } :
      {};
  };

  const renderInput = () => (
    <div className="home__header">
      <label htmlFor="searchInput">
        <span />
        <input id="searchInput" value={inputValue} onChange={handleSearchInput} placeholder="Search"/>
      </label>
      <div />
    </div>
  );

  return (
    <div className="home">
      {renderInput()}
      <div className="home__content">
        <div
          className="home__content__artist"
          style={getStyles()}
        >
          <ArtistsList
            data={home.artists}
            fetchArtistAlbum={fetchArtistAlbum}
          />
        </div>
        <div className="home__content__artist-content">
          {
            Object.keys(home.selectedArtist).length > 0 ?
              <ArtistAlbums
                selectedArtist={home.selectedArtist}
                albums={home.albums}
                isLoadingArtistAlbum={home.isLoadingArtistAlbum}
                fetchAlbumSongs={fetchAlbumSongs}
                selectedAlbum={home.selectedAlbum}
                albumSongs={home.albumSongs}
                fetchSong={fetchSong}
                setPlayAll={setPlayAll}
              /> :
              <HomeScreen
                data={home.newRelease}
              />
          }
        </div>
      </div>
      <div className="home__player">
        <Player
          albumSongs={home.albumSongs}
          albumCover={home.selectedAlbum.images}
          selectedSong={home.selectedSong}
          playNext={playNext}
          playPrev={playPrev}
          hasQueue={home.controls.playAll}
        />
      </div>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,

  setQueryParams: PropTypes.func.isRequired,
  fetchArtist: PropTypes.func.isRequired,
  fetchArtistAlbum: PropTypes.func.isRequired,
  fetchAlbumSongs: PropTypes.func.isRequired,
  fetchSong: PropTypes.func.isRequired,
  setPlayAll: PropTypes.func.isRequired,
  playNext: PropTypes.func.isRequired,
  playPrev: PropTypes.func.isRequired,
  setArtistList: PropTypes.object.isRequired,
  fetchNewReleases: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  home: state.home
});

const mapDispatchToProps = dispatch => ({
  setQueryParams: payload => dispatch(HomeActions.setQueryParams(payload)),
  fetchNewReleases: () => dispatch(HomeActions.fetchNewReleases()),
  fetchArtist: (payload, signal) => dispatch(HomeActions.fetchArtist(payload, signal)),
  fetchArtistAlbum: payload => dispatch(HomeActions.fetchArtistAlbum(payload)),
  fetchAlbumSongs: payload => dispatch(HomeActions.fetchAlbumSongs(payload)),
  setArtistList: payload => dispatch(HomeActions.setArtistList(payload)),
  fetchSong: payload => dispatch(HomeActions.fetchSong(payload)),
  setPlayAll: payload => dispatch(HomeActions.setPlayAll(payload)),
  playNext: () => dispatch(HomeActions.playNext()),
  playPrev: () => dispatch(HomeActions.playPrev())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
