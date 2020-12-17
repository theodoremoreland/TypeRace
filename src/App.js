// React
import React, { useState, useEffect } from 'react';

// Custom components
import Snippet from './components/Snippet/Snippet';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

// Custom utils
import { fetchFilmNames } from './api_calls/fetchFilmNames';
import { fetchRandomQuotes } from './api_calls/fetchRandomQuotes';
import { fetchKanyeQuotes } from './api_calls/fetchKanyeQuotes';

// Custom styles
import './App.css';

const initialGameState = {
  victory: false
  , startTime: null
  , totalTime: null
};

const App = () => {
  // Game variables
  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState("");
  const [gameState, setGameState] = useState(initialGameState);
  // Content Variables
  const [filmNames, setFilmNames] = useState([]);
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [kanyeQuotes, setKanyeQuotes] = useState([]);

  const genres = {
    "filmNames": filmNames
    , "randomQuotes": randomQuotes
    , "kanyeQuotes": kanyeQuotes
  };

  const updateUserText = (text) => {
    setUserText(text);

    if (text === snippet && snippet !== "") {
      setGameState({...gameState, victory: true, totalTime: new Date().getTime() - gameState.startTime})
    }
  };

  const chooseGenre = (genre) => {
    let buttons = genres[genre].map((film) => <button onClick={() => chooseSnippet(film)}>{film}</button>);
    return buttons
  };

  const chooseSnippet = (title) => {
    setSnippet(title);
    setGameState( {...gameState, startTime: new Date().getTime()} );
  };

  useEffect(() => {
    if (gameState.victory === true) {
      document.title = 'Victory!';
    }
  });

  useEffect(() => {
    setFilmNames(fetchFilmNames());
    setRandomQuotes(fetchRandomQuotes());
    setKanyeQuotes(fetchKanyeQuotes());
  }, []);

  return (
    <div className="app">
      <h1 className="appTitle header">Type Race</h1>
      <Snippet snippet={snippet} />
      <h4 className="gameStatus">
        {gameState.victory ? `Jam Jamboree! Time: ${gameState.totalTime}ms` : null}
      </h4>
      <Input text={userText} callback={updateUserText}/>
      {
        Object.keys(genres).map((genre) => 
          <Button text={genre} callback={chooseGenre} />
        )
      }
    </div>
  );
};

export default App;