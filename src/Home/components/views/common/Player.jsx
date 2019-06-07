import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "../../styles/player.scss";
import { getTime, getToaster, hasNextSong, hasPrevSong } from "../../Utils";
import { PLAYER } from "../../Enum";

class Player extends PureComponent {
  static propTypes = {
    albumCover: PropTypes.array,

    selectedSong: PropTypes.object,
    albumSongs: PropTypes.object.isRequired,

    playPrev: PropTypes.func.isRequired,
    playNext: PropTypes.func.isRequired,

    hasQueue: PropTypes.bool.isRequired
  };

  static defaultProps = {
    albumCover: [],
    selectedSong: {}
  };

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.selectedSong && nextProps.selectedSong && nextProps.selectedSong.name) {
      if (nextProps.selectedSong.name !== prevState.name) {
        const isPreviewUrl = nextProps.selectedSong.preview_url;
        if (!isPreviewUrl) {
          getToaster(`${nextProps.selectedSong.name} ${PLAYER.PLAY_BACK_URL}`);
        }
        return {
          playerPaused: !isPreviewUrl,
          name: nextProps.selectedSong.name,
          playback_url: nextProps.selectedSong.preview_url
        };
      }
      return null;
    } else return null;
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      if (this.state.playback_url) {
        this.player.play();
      }
    }
  }

  componentDidMount () {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration || 0
      });
    });
    this.player.addEventListener("ended", this.onMusicEnd);
  }

  onMusicEnd = () => {
    if (this.props.hasQueue) {
      if (hasNextSong(this.props.albumSongs.items, this.props.selectedSong)) {
        this.props.playNext();
      } else {
        getToaster(`${this.getArtistName()} ${PLAYER.LAST_SONG_PLAYLIST}`);
        this.setState({ playerPaused: true, currentTime: 0 });
      }
    } else {
      this.setState({ playerPaused: true, currentTime: 0 });
    }
  };

  componentWillUnmount () {
    this.player.removeEventListener("timeupdate", () => {});
    this.player.removeEventListener("ended", () => {});
  }

  player = React.createRef();

  state = {
    playback_url: "",
    name: "",
    playerPaused: true
  };

  isControlsEnabled = () => {
    if (Object.keys(this.props.selectedSong).length === 0) {
      getToaster(PLAYER.NO_SONG_SELECTED);
      return false;
    }
    if (!this.props.hasQueue) {
      getToaster(PLAYER.NO_QUEUE);
      return false;
    }
    return true;
  };

  handlePreviousPlay = () => {
    if (this.isControlsEnabled()) {
      console.log(hasPrevSong(this.props.albumSongs.items, this.props.selectedSong));
      if (hasPrevSong(this.props.albumSongs.items, this.props.selectedSong)) {
        this.props.playPrev();
      } else {
        getToaster(PLAYER.START_OF_PLAYLIST);
      }
    }
  };

  handlePlayerState = () => {
    if (Object.keys(this.props.selectedSong).length === 0) {
      getToaster(PLAYER.NO_SONG_SELECTED);
    } else if (!this.state.playback_url && this.state.name) {
      getToaster(`${this.state.name} ${PLAYER.PLAY_BACK_URL}`);
    } else {
      if (this.state.playerPaused) {
        this.player.play();
      } else {
        this.player.pause();
      }
      this.setState({ playerPaused: !this.state.playerPaused });
    }
  };

  handleNextPlay = () => {
    if (this.isControlsEnabled()) {
      if (hasNextSong(this.props.albumSongs.items, this.props.selectedSong)) {
        this.props.playNext();
      } else {
        getToaster(PLAYER.END_OF_PLAYLIST);
      }
    }
  };

  getArtistName = () => {
    const { selectedSong } = this.props;
    return selectedSong && selectedSong.artists && selectedSong.artists[0] && selectedSong.artists[0].name;
  };

  renderSongsDetails = () => {
    const { albumCover, selectedSong } = this.props;
    return (
      <div className="player__album-details">
        <div
          className="player__album-cover"
          style={albumCover && albumCover[1] && albumCover[1].url ?
            { backgroundImage: `url(${albumCover[1].url})` } :
            {}}
        />
        <div className="player__album-song--details">
          <span className="player__album-song--name">{selectedSong.name}</span>
          {selectedSong && selectedSong.artists && selectedSong.artists[0] &&
          <span className="player__artist-song--artist">{this.getArtistName()}</span>}
        </div>
      </div>
    );
  };

  renderProgress = () => {
    const { currentTime, duration } = this.state;
    return (
      <div className="player__control--timeline-container">
        {
          this.state.duration && this.state.currentTime &&
          <span className="player__control--timeline-current-time">
            {getTime(currentTime)}
          </span>
        }
        {
          Object.keys(this.props.selectedSong).length > 0 &&
          <div className="player__control--timeline">
            <div
              className="player__control--timeline__progress"
              style={{ width: (((currentTime || 1) / (duration || 1000)) * 100).toFixed(0) + "%" }}
            />
          </div>
        }
        {
          this.state.duration && this.state.currentTime &&
          <span className="player__control--timeline-duration">
            {getTime(duration)}
          </span>
        }
      </div>
    );
  };

  renderPlayer = () => (
    <div className="player__control">
      <div>
        <img
          onClick={this.handlePreviousPlay}
          className="player__control--back" src="../../../../../statics/images/player/left-arrow.png"
        />
        <img
          onClick={this.handlePlayerState}
          className="player__control--play"
          src={`../../../../../statics/images/player/${this.state.playerPaused ? "play-button.png" : "pause-symbol.png" }`}
        />
        <img
          onClick={this.handleNextPlay}
          className="player__control--next"
          src="../../../../../statics/images/player/right-arrow.png"
        />
      </div>
      {this.renderProgress()}
    </div>
  );

  render () {
    return (
      <div className="player__container">
        {Object.keys(this.props.selectedSong).length > 0 && this.renderSongsDetails()}
        {this.renderPlayer()}
        <audio ref={ref => (this.player = ref)} src={this.state.playback_url} />
      </div>
    );
  }
}


export default Player;


