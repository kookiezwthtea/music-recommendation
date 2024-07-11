import React, { useState } from 'react';
import Home from './Home';
import Recommendations from './Recommendations';
import { AiOutlineDelete } from 'react-icons/ai';

function App() {
  const [moods, setMoods] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  // Function to add a song to favorites
  const addToFavoriteList = (song) => {
    if (!favoriteSongs.some(fav => fav.title === song.title)) {
      setFavoriteSongs(prevSongs => [...prevSongs, song]);
    } else {
      console.log('Song is already in favorites:', song);
    }
  };

  // Function to remove a song from favorites
  const removeFromFavoriteList = (songTitle) => {
    setFavoriteSongs(prevSongs => prevSongs.filter(song => song.title !== songTitle));
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative w-full h-screen flex flex-col items-center justify-start pt-20 lg:flex-row lg:items-start lg:justify-start">
        {/* Left side for Home and Recommendations */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <div className="relative z-10 max-w-md w-full">
            <Home setMoods={setMoods} />
          </div>
          {moods.length > 0 && (
            <div className="relative z-10 max-w-md w-full mt-8">
              <Recommendations
                moods={moods}
                addToFavoriteList={addToFavoriteList}
              />
            </div>
          )}
        </div>

        {/* Right side for Favorite Songs */}
        <div className="lg:w-1/3 p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg mt-8 lg:ml-4">
          <h2 className="text-3xl font-semibold mb-2 text-white">Songs I Picked</h2>
          {favoriteSongs.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ul>
              {favoriteSongs.map(song => (
                <li className="bg-white p-4 m-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out hover:bg-pink-100 flex justify-between items-center text-purple-500" key={song.id}>
                  <div>
                    {song.title} - {song.artist}
                  </div>
                  <div>
                    <AiOutlineDelete
                      onClick={() => removeFromFavoriteList(song.title)}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
