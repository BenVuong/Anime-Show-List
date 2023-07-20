import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const App = () => {
  
  const [shows, setShows] = useState([
    {
        id: nanoid(),
        name: 'Kong Ming',
        totalEpisodes: '12',
        episodesWatched: '0',
		    genre: 'Music',
    }
  ]);
  const [newShow, setNewShow] = useState('');
  const [newEpisodes, setNewEpisodes] = useState(0);
  const [newGenre, setNewGenre] = useState('')
  const [episodesWatched, setEpisodesWatched] = useState(0);

  useEffect(() => {
    const storedShows = localStorage.getItem('shows');
    if (storedShows) {
      setShows(JSON.parse(storedShows));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shows', JSON.stringify(shows));
  }, [shows]);

  const handleShowChange = (e) => {
    setNewShow(e.target.value);
  };

  const handleEpisodesChange = (e) => {
    setNewEpisodes(Number(e.target.value));
  };

  const handleGenreChange = (e) => {
    setNewGenre(e.target.value);
  };

  const handleAddShow = () => {
    if (newShow.trim() !== '') {
      const show = {
        id: nanoid(),
        name: newShow,
        totalEpisodes: newEpisodes,
        episodesWatched: episodesWatched,
		    genre: newGenre,
        

      };
      setShows([...shows, show]);
      setNewShow('');
      setNewEpisodes(0);
	  setNewGenre('')
      setEpisodesWatched(0);
    }
  };

  const handleIncrement = (index) => {
    const updatedShows = [...shows];
    updatedShows[index].episodesWatched += 1;
    setShows(updatedShows);
  };

  const handleDecrement = (index) => {
    const updatedShows = [...shows];
    if (updatedShows[index].episodesWatched > 0) {
      updatedShows[index].episodesWatched -= 1;
      setShows(updatedShows);
    }
  };

  const handleDelete = (id) => {
    const newShow = shows.filter((show)=> show.id !==id);
    setShows(newShow)
  }
  return (
    <div>
      <h1>My Anime List</h1>
      <div>
        <label htmlFor="show-input">Show Name:</label>
        <input type="text" id="show-input" value={newShow} onChange={handleShowChange} placeholder="Enter a show" />
      </div>
      <div>
        <label htmlFor="episodes-input">Total Episodes:</label>
        <input type="number" id="episodes-input" value={newEpisodes} onChange={handleEpisodesChange} placeholder="Enter total episodes" />
      </div>
	  <div>
        <label htmlFor="genre-input">Genre:</label>
        <input type="text" id="genre-input" value={newGenre} onChange={handleGenreChange} placeholder="Enter genre" />
      </div>
      <button onClick={handleAddShow}>Add Show</button>

      { shows.map((show, index,id) => (
        <div key={index}>
          <h2>{show.name}</h2>
		  <h5>Genre: {show.genre}</h5>
          <p>Total Episodes: {show.totalEpisodes}</p>
          <p>Episodes Watched: {show.episodesWatched}</p>
          <button onClick={() => handleIncrement(index)}>+</button>
          <button onClick={() => handleDecrement(index)}>-</button>
          <button onClick={()=>handleDelete(show.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
