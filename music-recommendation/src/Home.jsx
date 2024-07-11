import React, { useEffect, useState } from 'react';

function Home({ setMoods }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [moods, setMoodsOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost/music-recommendation/backend/moods.php')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched moods:', data);
        setMoodsOptions(data);
      })
      .catch(error => console.error('Error fetching moods:', error));
  }, []);

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleSubmit = () => {
    const selectedMoodObj = moods.find(mood => mood.name === selectedMood);
    if (selectedMoodObj) {
      setMoods([selectedMoodObj]);
    } else {
      setMoods([]);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">What's your mood?</h1>
      <select
        value={selectedMood}
        onChange={handleMoodChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-gray-900"
      >
        <option value="">Select Mood</option>
        {moods.map(mood => (
          <option key={mood.id} value={mood.name}>{mood.name}</option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        Submit
      </button>
    </div>
  );
}

export default Home;
