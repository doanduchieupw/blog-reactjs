import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const PlayerContainer = styled.div`
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

function PodcastPlayerControl({ url }) {
  const [play, setPlay] = useState(false);
  const [process, setProcess] = useState(0);
  const [time, setTime] = useState('00:00:00');
  const [timePlayed, setTimePlayed] = useState(0);
  const [durationTime, setDurationTime] = useState('00:00:00');
  const player = useRef();

  const handlePlay = () => {
    setPlay(!play);
  };

  const handleProgress = (state) => {
    setTime(moment.utc(state.playedSeconds * 1000).format('H:mm:ss'));
    setDurationTime(moment.utc(player.current.getDuration() * 1000).format('H:mm:ss'));
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
        url={url}
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
      <div>
        <div className='p-4 bg-gray-bg rounded-full hover:bg-dark-gray-bg block'>
          {play ? (
            <FontAwesomeIcon icon={faPause} onClick={handlePlay} className='w-4 h-4 block' />
          ) : (
            <FontAwesomeIcon icon={faPlay} onClick={handlePlay} className='w-4 h-4 block' />
          )}
        </div>
        <div className='flex items-center gap-x-3'>
          <time className='text-sm text-light-gray-font'>{time}</time>
          <input
            type='range'
            max='1'
            value={timePlayed}
            step='any'
            className='player-slider'
            onChange={handleSeekChange}
          />
          <time className='text-sm text-light-gray-font'>{durationTime}</time>
        </div>
      </div>
    </PlayerContainer>
  );
}

export default PodcastPlayerControl;
