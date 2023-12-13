import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [inputMinutes, setInputMinutes] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let countdownInterval;

    const startCountdown = () => {
      countdownInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(countdownInterval);
            setIsPlaying(false);
          }
        }
      }, 1000);
    };

    if (isPlaying) {
      startCountdown();
    } else {
      clearInterval(countdownInterval);
    }

    return () => clearInterval(countdownInterval);
  }, [isPlaying, minutes, seconds]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setMinutes(inputMinutes);
      setSeconds(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setMinutes(0);
    setSeconds(0);
    setInputMinutes("");
  };

  const handleInputChange = (e) => {
    const inputMinutes = parseInt(e.target.value, 10) || "";
    setInputMinutes(inputMinutes);
    setIsPlaying(false);
    
    if (isPlaying) {
      setMinutes(inputMinutes);
      setSeconds(0);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-2 bg-gray-100 rounded-md shadow-md">
      <div className="flex flex-col mb-4">
        <label className="block text-sm font-bold text-gray-700">CountDown Timer (minutes): </label>
        <input
          className="mt-1 p-2 border rounded-md w-full"
          type="number"
          value={inputMinutes}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row justify-center py-2">
        <p className="flex text-4xl font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="flex justify-evenly pt-4">
        <div className='flex flex-row'>
        <button
          className={`px-4 py-2 ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md`}
          onClick={handleTogglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        </div>
        <div className='flex flex-row '>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleReset}
        >
          Reset
        </button>
        </div>
      </div>
      
    </div>
  );
};

export default CountdownTimer;
