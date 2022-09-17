import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const PlayerContainer = styled.div`
  width: 100%;

  .player-slider {
    position: relative;
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: #ebecee;
    border-radius: 4px;
    background-image: linear-gradient(#ddd, #ddd);
    background-size: ${(props) => `${props.process * 100}% 100%`};
    background-repeat: no-repeat;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 6px;
      width: 6px;
      border-radius: 50px;
      background-color: #868686;
    }
    ::-webkit-slider-runnable-track {
      -webkit-appearance: none;
    }
    ::after {
      content: '';
      position: absolute;
      left: 0;
      display: block;
      background: #868686;
      width: ${(props) => `${props.timePlayed * 100 + 0.5}%`};
      height: 6px;
      border-radius: 50px 0 0 50px;
    }
  }
`;

const PodcastPlayer = ({sub}) => {
  const [play, setPlay] = useState(false);
  const [process, setProcess] = useState(0);
  const [time, setTime] = useState('00:00:00');
  const [timePlayed, setTimePlayed] = useState(0);
  const player = useRef();

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleProgress = (state) => {
    setTime(moment.utc(state.playedSeconds * 1000).format('H:mm:ss'));
    setTimePlayed(state.played);
    setProcess(state.loaded);
  };

  const handleSeekChange = (e) => {
    setTimePlayed(e.target.value);
    player.current.seekTo(parseFloat(e.target.value));
  };

  return (
    <PlayerContainer timePlayed={timePlayed} process={process}>
      <ReactPlayer
        url="https://www.buzzsprout.com/1667218/11317373-s3-15-alex-ph-m-ceo-co-founder-realbox-b-t-d-ng-s-n-phan-m-nh-c-h-i-d-u-t-cho-s-dong.mp3"
        ref={player}
        config={{
          file: {
            forceAudio: true,
          },
        }}
        playing={play}
        onProgress={handleProgress}
        style={{ display: 'none' }}
      />

      <div className="flex items-center justify-between">
        <div className={`flex items-center ${sub ? 'flex-row-reverse basis-3/5 md:flex-1' : 'flex-1'}`}>
          <time className={`text-sm text-light-gray-font ${sub ? 'basis-1/3 flex justify-center md:basis-auto md:ml-4':'mr-4'}`}>
            {time}
          </time>
          <input
            type="range"
            max="1"
            value={timePlayed}
            step="any"
            className={`player-slider ${sub ? 'basis-2/3 md:basis-auto' : ''}`}
            onChange={handleSeekChange}
          />
        </div>
        <div className="ml-4 p-4 bg-gray-bg rounded-full hover:bg-dark-gray-bg ">
          {play ? (
            <FontAwesomeIcon
              icon={faPause}
              onClick={handlePlay}
              className="w-4 h-4 block"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              onClick={handlePlay}
              className="w-4 h-4 block"
            />
          )}
        </div>
      </div>
    </PlayerContainer>
  );
};

export default PodcastPlayer;
