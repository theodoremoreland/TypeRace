import React, { useState, useEffect } from 'react';
import './App.css';

const initialGameState = {
  victory: false
  , startTime: null
  , totalTime: null
}

const App = () => {

  // Game variables
  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState("");
  const [gameState, setGameState] = useState(initialGameState);

  // Content Variables
  const [filmNames, setFilmNames] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [kanyeQuotes, setKanyeQuotes] = useState([]);
  const genres = {
    "filmNames": filmNames
    , "quotes": quotes
    , "kanyeQuotes": kanyeQuotes
  }

  // Error variables
  const [hasError, setErrors] = useState(false);


  const updateUserText = (event) => {
    setUserText(event.target.value);

    if (event.target.value === snippet && snippet !== "") {
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


  const fetchFilmNames = async () => {
    const response = await fetch('https://ghibliapi.herokuapp.com/films');    
    const json = await response.json();
    let randomizedfilms = [];

    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * json.length);
      let film = json[random].title;
      if (!randomizedfilms.includes(film)) {
        randomizedfilms.push(film)
      }
      else {
        i--;
      }
    }

    setFilmNames(randomizedfilms);
  }


  const fetchQuotes = async () => {
    let randomizedQoutes = [];
    
    do {
      let response = await fetch('https://api.quotable.io/random');
      let json = await response.json();
      let quote = json.content;

      if (!randomizedQoutes.includes(quote)) {
        randomizedQoutes.push(quote)
      }

    } while (randomizedQoutes.length < 3);

    setQuotes(randomizedQoutes);
  }


  const fetchKanyeQuotes = async () => {
    let randomKanyeQuotes = [];
    
    do {
      let response = await fetch('https://api.kanye.rest');
      let json = await response.json();
      let kanyeQuote = json.quote;

      if (!randomKanyeQuotes.includes(kanyeQuote)) {
      randomKanyeQuotes.push(kanyeQuote);
      }

    } while (randomKanyeQuotes.length < 2);

    setKanyeQuotes(randomKanyeQuotes);
  }


  useEffect(() => {
    if (gameState.victory === true) {
      document.title = 'Victory!';
    }
  });

  
  useEffect(() => {
    fetchFilmNames();
    fetchQuotes();
    fetchKanyeQuotes();
  }, []);


  return (
    <div>
      <h2>Type Race</h2>
      <hr/>
      <h3>Snippet</h3>
      <div>
        {snippet}
      </div>
      <h4>{gameState.victory ? `Jam Jamboree! Time: ${gameState.totalTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText}/>
      <hr/>
      {Object.keys(genres).map((genre) => <button onClick={() => chooseGenre(genre)}>{genre}</button>)}
    </div>
  );

}

export default App;
