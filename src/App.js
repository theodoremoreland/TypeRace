// React
import React, { useState, useEffect, useRef } from 'react';

// Custom components
import Card from './components/Card/Card';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Timer from './components/Timer/Timer';

// Custom utils
import { fetchFilmNames } from './api_calls/fetchFilmNames';
import { fetchRandomQuotes } from './api_calls/fetchRandomQuotes';
// import { fetchKanyeQuotes } from './api_calls/fetchKanyeQuotes';

// Custom styles
import './reset.css';
import './App.css';

const initialGameState = {
  victory: false
  , startTime: null
  , totalTime: null
};

const App = () => {
    const [timerIsOn, setTimerIsOn] = useState(false);
    const [userText, setUserText] = useState("");
    const [snippet, setSnippet] = useState("");
    const [snippetOptions, setSnippetOptions] = useState([]);
    const [gameState, setGameState] = useState(initialGameState);
    const [genres, setGenres] = useState({});
    const inputRef = useRef();

    const updateUserText = (text) => {
        setUserText(text);

        if (text === snippet && snippet !== "") {
            setTimerIsOn(false);
            setGameState({...gameState, victory: true, totalTime: new Date().getTime() - gameState.startTime});
        }
        else if (gameState.victory === true && text !== snippet) {
            // code block executes after user completed game, but then deletes a character(s)
            setUserText(""); // delete all text
            setGameState( {...gameState, "victory": false, startTime: new Date().getTime()} ); // reset game
            setTimerIsOn(true); // reset timer
        }
    };

    const chooseSnippet = (userSelectedSnippet) => {
        setUserText("");
        setSnippet(userSelectedSnippet);
        setTimerIsOn(true);
        setGameState( {...gameState, "victory": false, startTime: new Date().getTime()} );
        window.scrollTo(0, 0);
        inputRef.current.focus();
    };

    const chooseGenre = (genre) => {
        const snippets = genres[genre];

        setSnippetOptions(snippets);
    };

    const fetchGenres = async () => {
        const filmNames = await fetchFilmNames();
        const randomQuotes = await fetchRandomQuotes();
            // const kanyeQuotes = await fetchKanyeQuotes();

        setGenres({
            "Movie names" : filmNames
            ,"Random quotes" : randomQuotes
            // ,"Kanye West quotes": kanyeQuotes
        });
    };

    const displayGenres = (genres) => {
        return (
            <div className="buttonGroup">
                <h3 className="groupHeader">Choose a genre</h3>
                {
                    Object.keys(genres).map((genre) => 
                        <Button key={genre} text={genre} callback={chooseGenre} />
                    )
                }
            </div>
        )
    };

    const displaySnippetOptions = (snippetOptions) => {
        return (
            <div className="cardGroup">
                <h3 className="groupHeader">Choose snippet</h3>
                {
                    snippetOptions.map(snippet => <Card key={snippet} text={snippet} callback={chooseSnippet} />)
                }
            </div>
        )
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
            <Timer timerIsOn={timerIsOn} delta={snippet} />
            <header className="header">
                <h1 className="appTitle">Type Race</h1>
                {
                    snippet
                        ? <h2 className="snippet">{snippet}</h2>
                        : ""
                }
                <p className="gameStatus">
                    {gameState.victory ? `Finished! Time: ${gameState.totalTime}ms` : null}
                </p>
            </header>
            <div className="panel">
                <Input text={userText} callback={updateUserText} inputRef={inputRef}/>
                {
                    Object.keys(genres).length > 0
                        ? displayGenres(genres)
                        : ""
                }
            </div>
            {
                snippetOptions.length > 0
                    ? displaySnippetOptions(snippetOptions)
                    : ""
            }
        </main>
    );
};

export default App;