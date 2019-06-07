
const raiseStatus = (response) => {
  if (response.redirected) {
    window.location.href = response.url;
  }

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  if (response.status === 401) {
    // session expired need to reLogin
    window.location.href = "/";
  }
  const error = new Error(response.status);
  error.response = response;
  throw error;
};

const fetchNewReleases = (accessToken) => (
  fetch("https://api.spotify.com/v1/browse/new-releases?limit=50", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    method: "GET"
  }).then(raiseStatus)
);

const searchArtistService = ({ artist, accessToken, signal }) => (
  fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
    signal,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    method: "GET"
  }).then(raiseStatus)
);

const fetchArtistAlbums = ({ artistId, accessToken }) => (
  fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    method: "GET"
  }).then(raiseStatus)
);

const fetchAlbumSongs = ({ albumId, accessToken }) => (
  fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    method: "GET"
  }).then(raiseStatus)
);

export { searchArtistService, fetchArtistAlbums, fetchAlbumSongs, fetchNewReleases };

