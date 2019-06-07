import ActionTypes from "./HomeActionTypes";
import { searchArtistService, fetchArtistAlbums, fetchAlbumSongs, fetchNewReleases } from "../Services";

const HomeActions = {
  setLoadingStatus: payload => ({ type: ActionTypes.SET_LOADING_STATUS, payload }),
  setQueryParams: payload => ({ type: ActionTypes.SET_QUERY_PARAMS, payload }),
  setArtistList: payload => ({ type: ActionTypes.SET_ARTIST_LIST, payload }),
  setNewReleases: payload => ({ type: ActionTypes.SET_NEW_RELEASES, payload }),
  setSelectedArtist: payload => ({ type: ActionTypes.SET_SELECTED_ARTIST, payload }),
  setArtistAlbum: payload => ({ type: ActionTypes.SET_ARTIST_ALBUMS, payload }),
  setAlbumSongs: payload => ({ type: ActionTypes.SET_ALBUM_SONGS, payload }),
  setSelectedAlbum: payload => ({ type: ActionTypes.SET_SELECTED_ALBUM, payload }),
  setSelectedSong: payload => ({ type: ActionTypes.SET_SELECTED_SONG, payload }),
  setPlayAll: payload => ({ type: ActionTypes.SET_PLAY_ALL, payload }),
  playNext: () => ({ type: ActionTypes.PLAY_NEXT }),
  playPrev: () => ({ type: ActionTypes.PLAY_PREV }),
  fetchNewReleases: () => (dispatch, getState) => {
    const accessToken = getState().home.queryParams.access_token;
    fetchNewReleases(accessToken)
      .then(res => {
        dispatch(HomeActions.setNewReleases(res));
      });
  },
  fetchArtist: (artist, signal) => (dispatch, getState) => {
    const accessToken = getState().home.queryParams.access_token;
    searchArtistService({
      accessToken,
      artist,
      signal
    }).then(res => {
      dispatch(HomeActions.setArtistList(res));
    });
  },
  fetchArtistAlbum: payload => (dispatch, getState) => {
    dispatch(HomeActions.setSelectedArtist(payload));
    const accessToken = getState().home.queryParams.access_token;
    fetchArtistAlbums({
      accessToken,
      artistId: payload.id
    }).then(res => {
      dispatch(HomeActions.setArtistAlbum(res));
    });
  },
  fetchAlbumSongs: payload => (dispatch, getState) => {
    const accessToken = getState().home.queryParams.access_token;
    dispatch(HomeActions.setSelectedAlbum(payload));
    fetchAlbumSongs({
      accessToken,
      albumId: payload.id
    }).then(res => {
      dispatch(HomeActions.setAlbumSongs(res));
    });
  },
  fetchSong: payload => (dispatch) => {
    dispatch(HomeActions.setSelectedSong(payload));
  }
};

export default HomeActions;
