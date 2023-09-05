// React
import React, { useState, useEffect, useRef, ReactElement, useReducer, useCallback } from 'react';

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
import Button from './components/Button/Button';

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

    const { data, isError, refetch } = useQuery({
        queryKey: ['quotes'],
        queryFn: fetchRandomQuotes,
        onError: (err: unknown) => console.error(extractErrorMessage(err)),
        cacheTime: 300_000,
        staleTime: 240_000,
        retry: false,
        enabled: true,
    });

    const chooseSnippet = useCallback((userSelectedSnippet: string) => {
        gameDispatch({ type: GameActionType.Start, targetText: userSelectedSnippet.replace(/[’]/g, "'") });
    }, []);

    useEffect(() => {
        if (data) {
            gameDispatch({ type: GameActionType.Clear });
            setSnippetOptions(data);
        }
    }, [data]);

    useEffect(() => {
        if (isError) {
            setSnippetOptions(selectRandomInspirationalQuotes());
        }
    }, [isError]);

    useEffect(() => {
        setIsWaitingOnUserToChooseSnippet(true);
    }, [snippetOptions]);

    useEffect(() => {
        if (gameState.isVictory === true) {
            updateDocumentTitle('Finished!');
        } else {
            updateDocumentTitle('Type Race');
        }
    }, [gameState.isVictory]);

    useEffect(() => {
        const hasUserCompletedText: boolean =
            gameState.typedText.replace(/\n/g, ' ') === gameState.targetText && gameState.targetText !== '';
        const hasUserModifiedTextAfterCompletion: boolean =
            gameState.isVictory === true && gameState.typedText !== gameState.targetText;

        if (hasUserCompletedText) {
            gameDispatch({ type: GameActionType.Finish });
        } else if (hasUserModifiedTextAfterCompletion) {
            gameDispatch({ type: GameActionType.Restart });
        }
    }, [gameState.typedText, gameState.targetText, gameState.isVictory]);

    useEffect(() => {
        if (gameState.targetText) {
            setIsWaitingOnUserToChooseSnippet(false);

            window.scrollTo(0, 0);

            inputRef?.current?.focus();
        }
    }, [gameState.targetText]);

    return (
        <main className="app" ref={appContainerRef}>
            {isWaitingOnUserToChooseSnippet && <div className="backdrop" />}
            <Timer timerIsOn={gameState.timerIsOn} delta={gameState.targetText} />
            <header className="header">
                <h1 className="appTitle">Type Race</h1>
                <p className="gameStatus">
                    {gameState.isVictory &&
                        gameState.totalTime &&
                        `Finished! Time: ${new Intl.NumberFormat().format(gameState.totalTime)}ms @${Math.floor(
                            gameState.targetText.split(' ').length / (gameState.totalTime / 1000 / 60),
                        )}WPM`}
                </p>
            </header>
            <div className="panel">
                <div
                    className={`${
                        isWaitingOnUserToChooseSnippet ? 'waiting-on-user-to-choose-snippet' : ''
                    } description`}
                >
                    Practice your typing speed while reading words of wisdom by choosing a special quote below. If the
                    quotes below do not interest you, you can click the Refresh button to receive a new list of quotes.
                    Once a quote is chosen, you will be timed on how quickly you can type it. After completing, you can
                    delete your text to retry the same quote or choose another quote to be timed on something new.
                </div>
                <Input
                    foregroundText={gameState.typedText}
                    callback={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        gameDispatch({ type: GameActionType.Continue, typedText: e.target.value })
                    }
                    inputRef={inputRef}
                    backgroundText={gameState.targetText}
                />
            </div>
            {snippetOptions.length > 0 && (
                <div
                    className={`${isWaitingOnUserToChooseSnippet ? 'waiting-on-user-to-choose-snippet' : ''} cardGroup`}
                >
                    <div className="groupHeader">
                        <h3>Choose a quote or</h3>
                        <Button key={'Refresh'} text={'Refresh'} callback={() => refetch()} />
                    </div>
                    {snippetOptions.map((snippet) => (
                        <Card key={snippet} text={snippet} callback={chooseSnippet} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default App;
