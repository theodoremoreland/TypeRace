// React
import React, { useState, useEffect, useRef, ReactElement, useReducer } from 'react';

// Third party
import { useQuery } from '@tanstack/react-query';

// Custom
import { fetchRandomQuotes } from './api_calls/fetchRandomQuotes';
import extractErrorMessage from './utils/extractErrorMessage';
import selectRandomInspirationalQuotes from './scripts/selectRandomInspirationalQuotes';

// Custom components
import Card from './components/Card/Card';
import Input from './components/Input/Input';
import Timer from './components/Timer/Timer';

// Controller
import { GameActionType, gameReducer, initialGameState, updateDocumentTitle } from './App.controller';

// Custom styles
import './reset.css';
import './App.css';


const App = (): ReactElement => {
    // Refs
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const appContainerRef = useRef<HTMLElement | null>(null);

    // Game state
    const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

    // App state
    const [snippetOptions, setSnippetOptions] = useState<string[]>([]);
    const [isWaitingOnUserToChooseSnippet, setIsWaitingOnUserToChooseSnippet] = useState<boolean>(false);
    const [timeoutID, setTimeoutID] = useState<number | undefined>(undefined);

    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ["quotes"],
        queryFn: fetchRandomQuotes,
        onError: (err: any) => console.error(extractErrorMessage(err)),
        cacheTime: 300_000,
        staleTime: 240_000,
        retry: false,
        enabled: true,
    });

    const chooseSnippet = (userSelectedSnippet: string) => {
        gameDispatch({ type: GameActionType.Start, targetText: userSelectedSnippet.replace(/[’]/g, "'") });
    };

    useEffect(() => {
        if (data) {
            setSnippetOptions(data);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            setSnippetOptions(selectRandomInspirationalQuotes());
        }
    }, [isError]);

    useEffect(() => {
        if (gameState.isVictory === true) {
            updateDocumentTitle('Finished!');
        }
        else {
            updateDocumentTitle('Type Race');
        };
    }, [gameState.isVictory]);

    useEffect(() => {
        if (gameState.typedText.replace(/\n/g, " ") === gameState.targetText && gameState.targetText !== "") {
            gameDispatch({ type: GameActionType.Finish });
        } else if (gameState.isVictory === true && gameState.typedText !== gameState.targetText) {
            gameDispatch({ type: GameActionType.Restart });
        }
    }, [gameState.typedText]);

    useEffect(() => {
        if (snippetOptions.length > 0) {
            gameDispatch({ type: GameActionType.Clear });
            setIsWaitingOnUserToChooseSnippet(true);
            setTimeoutID(setTimeout(() => {
                                    window.scrollTo(0, 4000);
                                    clearTimeout(timeoutID);
                                }, 200));    
        }
    }, [snippetOptions]);

    useEffect(() => {
        if (gameState.targetText) {
            setIsWaitingOnUserToChooseSnippet(false);
    
            window.scrollTo(0, 0);
            
            inputRef?.current?.focus();
        }
    }, [gameState.targetText]);

    return (
        <main className="app" ref={appContainerRef}>
            { isWaitingOnUserToChooseSnippet && <div className='backdrop' /> }
            <Timer timerIsOn={gameState.timerIsOn} delta={gameState.targetText} />
            <header className="header">
                <h1 className="appTitle">Type Race</h1>
                <p className="gameStatus">
                    {
                        gameState.isVictory
                            ? `Finished! Time: ${gameState.totalTime}ms @${ Math.floor( gameState.targetText.split(" ").length / (((gameState.totalTime as number) / 1000) / 60) ) }WPM`
                            : null
                    }
                </p>
            </header>
            <div className="panel">
                <Input
                    foregroundText={gameState.typedText}
                    callback={(e: React.ChangeEvent<HTMLTextAreaElement>) => gameDispatch({ type: GameActionType.Continue, typedText: e.target.value })}
                    inputRef={inputRef}
                    backgroundText={gameState.targetText}
                />
            </div>
            {
                snippetOptions.length > 0
                    ?
                        <div className={`${isWaitingOnUserToChooseSnippet ? 'waiting-on-user-to-choose-snippet' : ''} cardGroup`}>
                            <h3 className="groupHeader">Choose a quote</h3>
                            {
                                snippetOptions.map(snippet => <Card key={snippet} text={snippet} callback={chooseSnippet} />)
                            }
                        </div>
                    :   ""
            }
        </main>
    );
};

export default App;