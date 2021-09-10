// React
import React, { useState, useEffect } from 'react';

// Custom components
import Card from './components/Card/Card';
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
  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState("");
  const [snippetOptions, setSnippetOptions] = useState([]);
  const [gameState, setGameState] = useState(initialGameState);
  const [genres, setGenres] = useState({});

  const updateUserText = (text) => {
    setUserText(text);

    if (text === snippet && snippet !== "") {
      setGameState({...gameState, victory: true, totalTime: new Date().getTime() - gameState.startTime})
    }
    else if (gameState.victory === true && text !== snippet) {
      setGameState({...gameState, victory: false})
    }
    else if (text === "") {
      setGameState( {...gameState, "victory": false, startTime: new Date().getTime()} );
    }
  };

  const chooseSnippet = (userSelectedSnippet) => {
    setUserText("");
    setSnippet(userSelectedSnippet);
    setGameState( {...gameState, "victory": false, startTime: new Date().getTime()} );
  };

  const chooseGenre = (genre) => {
    const snippets = genres[genre];
    setSnippetOptions(snippets);
  };

  const fetchGenres = async () => {
    const filmNames = await fetchFilmNames();
    const randomQuotes = await fetchRandomQuotes();
    const kanyeQuotes = await fetchKanyeQuotes();
    
    setGenres({
      "Movie names" : filmNames
      ,"Random quotes" : randomQuotes
      ,"Kanye West quotes": kanyeQuotes
    });
  };


  useEffect(() => {
    if (gameState.victory === true) {
      document.title = 'Victory!';
    }
    else {
      document.title = 'Type Race';
    };
  }, [gameState.victory]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <main className="app">
        <header className="header">
            <h1 className="appTitle">Type Race</h1>
            <h2 className="snippet">{snippet}</h2>
            <p className="gameStatus">
                {gameState.victory ? `Finished! Time: ${gameState.totalTime}ms` : null}
            </p>
        </header>
        <Input text={userText} callback={updateUserText}/>
        <div className="buttonGroup">
            {
                Object.keys(genres).map((genre) => 
                    <Button text={genre} callback={chooseGenre} />
                )
            }
        </div>
        <div className="cardGroup">
            {
                snippetOptions.length !== 0
                    ? snippetOptions.map(snippet => <Card text={snippet} callback={chooseSnippet} />)
                    : ""
            }
        </div>
    </main>
  );
};

export default App;