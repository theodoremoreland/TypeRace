import React, { useState, useEffect } from 'react';
import './App.css';


const initialGameState = {
  victory: false
  , startTime: null
  , totalTime: null
}

const App = () => {

  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState("");
  const [gameState, setGameState] = useState(initialGameState);
  const [hasError, setErrors] = useState(false);
  const [filmNames, setFilmNames] = useState([]);

  const updateUserText = (event) => {
    setUserText(event.target.value);

    if (event.target.value === snippet && snippet !== "") {
      setGameState({...gameState, victory: true, totalTime: new Date().getTime() - gameState.startTime})
    }
  };

  const chooseSnippet = (title) => {
    setSnippet(title);
    setGameState( {...gameState, startTime: new Date().getTime()} );
  };

  const fetchData = async () => {
    const response = await fetch('https://ghibliapi.herokuapp.com/films');
    let randomizedResponse = [];
    response
      .json()
      .then((response) => {
        for (let i = 0; i < 5; i++) {
          let random = Math.floor(Math.random() * response.length);
          let film = response[random];
          if (!randomizedResponse.includes(film)) {
            randomizedResponse.push(film)
          }
          else {
            i--;
          }
        }
        setFilmNames(randomizedResponse);
      })
      .catch(err => setErrors(err))
  }

  useEffect(() => {
    if (gameState.victory === true) {
      document.title = 'Victory!';
    }
  });

  
  useEffect(() => {
    fetchData();
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
      {filmNames.map((film) => <button onClick={() => chooseSnippet(film.title)}>{film.title}</button>)}
    </div>
  );

}

export default App;
