
const selectFirstSong = (songs) => songs.items[0];

const selectNextSong = (songsList, currentSong) =>
  songsList[songsList.findIndex(song => song.id === currentSong.id) + 1];

const selectPrevSong = (songsList, currentSong) =>
  songsList[songsList.findIndex(song => song.id === currentSong.id) - 1];

export { selectFirstSong, selectNextSong, selectPrevSong };
