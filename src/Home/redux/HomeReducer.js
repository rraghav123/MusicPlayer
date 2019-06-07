import ActionTypes from "./HomeActionTypes";
import { selectFirstSong, selectNextSong, selectPrevSong } from "./utils";

const initialState = {
  isLoadingArtistAlbum: true,
  queryParams: {},
  newRelease: {},
  artists: {},
  selectedArtist: {},
  albums: {},
  selectedAlbum: {},
  albumSongs: {},
  selectedSong: {},
  controls: {
    playAll: false
  }
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SET_LOADING_STATUS:
    return {
      ...state,
      isLoadingArtistAlbum: action.payload
    };
  case ActionTypes.SET_QUERY_PARAMS:
    return {
      ...state,
      queryParams: {
        ...state.queryParams,
        ...action.payload
      }
    };
  case ActionTypes.SET_ARTIST_LIST:
    return {
      ...state,
      artists: action.payload.artists
    };
  case ActionTypes.SET_NEW_RELEASES:
    return {
      ...state,
      newRelease: action.payload
    };
  case ActionTypes.SET_SELECTED_ARTIST:
    return {
      ...state,
      selectedArtist: action.payload
    };
  case ActionTypes.SET_ARTIST_ALBUMS:
    return {
      ...state,
      albums: action.payload
    };
  case ActionTypes.SET_SELECTED_ALBUM:
    return {
      ...state,
      selectedAlbum: action.payload
    };
  case ActionTypes.SET_ALBUM_SONGS:
    return {
      ...state,
      albumSongs: action.payload
    };
  case ActionTypes.SET_SELECTED_SONG:
    return {
      ...state,
      selectedSong: action.payload
    };
  case ActionTypes.SET_PLAY_ALL:
    return {
      ...state,
      selectedSong: action.payload ? selectFirstSong(state.albumSongs) : {},
      controls: {
        ...state.controls,
        playAll: action.payload
      }
    };
  case ActionTypes.PLAY_NEXT:
    return {
      ...state,
      selectedSong: selectNextSong(state.albumSongs.items, state.selectedSong)
    };
  case ActionTypes.PLAY_PREV:
    return {
      ...state,
      selectedSong: selectPrevSong(state.albumSongs.items, state.selectedSong)
    };
  default:
    return state;
  }
};

export default HomeReducer;
