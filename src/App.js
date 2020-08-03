import React, { useState } from 'react';
import './App.css';

let buttonTextItems = ["Bears, beets, Battlestar Galactica"
  ,"What's Forrest Gump's password? 1Forrest1"
  , "Where do programmers like to hangout? The Foo Bar"
];

const initialGameState = {
  victory: false
  , startTime: null
  , totalTime: null
}

const App = () => {

  const [userText, setUserText] = useState("");
  const [snippet, setSnippet] = useState("");
  const [gameState, setGameState] = useState(initialGameState);

  const updateUserText = (event) => {
    setUserText(event.target.value);

    if (event.target.value === snippet && snippet !== "") {
      setGameState({...gameState, victory: true, totalTime: new Date().getTime() - gameState.startTime})
    }
  };

  const chooseSnippet = (index) => {
    setSnippet(buttonTextItems[index]);
    setGameState( {...gameState, startTime: new Date().getTime()} );
  };

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
      {buttonTextItems.map((elem, index) => <button onClick={() => chooseSnippet(index)}>{elem}</button>)}
    </div>
  );

}

export default App;
