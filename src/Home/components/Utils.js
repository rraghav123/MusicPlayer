import { toast } from "react-toastify";

const getTime = (time) => {
  if (!isNaN(time)) {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
  }
  return 0;
};

const getToaster = (message = "What!") => {
  toast(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    className: "player-toaster"
  });
};

const hasNextSong = (songsList, currentSong) => {
  const indexOfCurrentSong = songsList.findIndex(song => song.id === currentSong.id) + 1;
  const listLength = songsList.length;
  return indexOfCurrentSong !== listLength;
};

const hasPrevSong = (songsList, currentSong) =>
  songsList.findIndex(song => song.id === currentSong.id) !== 0;

export { getTime, getToaster, hasNextSong, hasPrevSong };
