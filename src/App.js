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
import { fetchKanyeQuotes } from './api_calls/fetchKanyeQuotes';
import selectRandomMovieTitles from './scripts/selectRandomMovieTitles';
import selectRandomInspirationalQuotes from './scripts/selectRandomInspirationalQuotes';
import selectRandomJadenSmithTweet from './scripts/selectRandomJadenSmithTweets';

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
    const [timeoutID, setTimeoutID] = useState();
    const inputRef = useRef();
    const appContainerRef = useRef();

    const updateUserText = (text) => {
        setUserText(text);

        if (text.replace(/\n/g, " ") === snippet && snippet !== "") {
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
        setSnippet(userSelectedSnippet.replace(/[’]/g, "'"));
        setTimerIsOn(true);
        setGameState( {...gameState, "victory": false, startTime: new Date().getTime()} );
        window.scrollTo(0, 0);
        inputRef.current.focus();
    };

    const chooseGenre = (genre) => {
        const snippets = genres[genre];

        setSnippetOptions(snippets);

        setTimeoutID(setTimeout(() => {
                                window.scrollTo(0, 4000);
                                clearTimeout(timeoutID);
                            }, 200));
        
    };

    const fetchGenres = async () => {
        const filmNames = await fetchFilmNames().catch(e => selectRandomMovieTitles());
        const randomQuotes = await fetchRandomQuotes().catch(e => selectRandomInspirationalQuotes());

        // The last fetch. Will try to set Kanye West quotes, uses Jaden Smith tweets upon failure.
        await fetchKanyeQuotes()
            .then(kanyeQuotes => {
                setGenres({
                    "Movie names" : filmNames
                    ,"Random quotes" : randomQuotes
                    ,"Kanye West quotes": kanyeQuotes
                });
            })
            .catch(dontCare => {
                const jadenSmithTweets = selectRandomJadenSmithTweet();

                setGenres({
                    "Movie names" : filmNames
                    ,"Random quotes" : randomQuotes
                    ,"Jaden Smith Tweets": jadenSmithTweets
                });
            });
    };

    const displayGenres = (genres) => {
        return (
            <div className="buttonGroup">
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
        <main className="app" ref={appContainerRef}>
            <Timer timerIsOn={timerIsOn} delta={snippet} />
            <header className="header">
                <h1 className="appTitle">Type Race</h1>
                <p className="gameStatus">
                    {
                        gameState.victory
                            ? `Finished! Time: ${gameState.totalTime}ms @${ Math.floor( snippet.split(" ").length / ((gameState.totalTime / 1000) / 60) ) }WPM`
                            : null
                    }
                </p>
            </header>
            <div className="panel">
                <Input
                    foregroundText={userText}
                    callback={updateUserText}
                    inputRef={inputRef}
                    backgroundText={snippet}
                />
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