import React, { useEffect, useState } from 'react';
import {AiOutlineHeart } from 'react-icons/ai';

function Recommendations({ moods, addToFavoriteList }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (moods.length > 0) {
      const moodNames = moods.map(mood => mood.name).join(',');

      setLoading(true);
      setError(null);

      fetch(`http://localhost/music-recommendation/backend/recommendations.php?moods=${moodNames}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched recommendations:', data);
          setSongs(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching recommendations:', error);
          setError('Failed to fetch recommendations. Please try again later.');
          setLoading(false);
        });
    }
  }, [moods]);

  // Function to handle adding a song to favorites
  const handleAddToFavorite = (song) => {
    addToFavoriteList(song);
  };

  


  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Recommended Songs</h2>
        {loading ? (
          <p className="text-white">Loading recommendations...</p>
        ) : error ? (
          <p className="text-white">{error}</p>
        ) : songs.length > 0 ? (
          <ul className="space-y-4">
            {songs.map((song, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out hover:bg-pink-100 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-purple-700">{song.title}</h3>
                  <p className="text-gray-600">by {song.artist}</p>
                </div>
                <div>
                <AiOutlineHeart
                      onClick={() => handleAddToFavorite(song)}
                      className="text-red-500 cursor-pointer"
                      size={24}
                    />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No recommendations found.</p>
        )}
      </div>
    </div>
  );
}

export default Recommendations;
