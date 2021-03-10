import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [time, setTime] = useState(1);
    const [defTime, setDefTime] = useState(60)
    const [startstop, setStartstop] = useState(false)
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro")
    const [isRest, setIsRest] = useState(false)

    const messages: Array<string> = [
        "Отменить Pomodoro",
        "Запустить Pomodoro",
        "Пропустить перерыв",
        "Начать короткий перерыв",
        "Начать длинный перерыв"
    ]

    useEffect(() => {
        if (startstop && time > 0) {
            setLaunchMessage(isRest ? messages[2] : messages[0])
            let timerId = setTimeout(() => {
                setTime(e => e - 1);
                document.title = isRest ? `Чилим!) ${finalTime}` : `Воркаем! ${finalTime}`;
            }, 1000)
            return () => {
                clearTimeout(timerId)
            }
        } else if (time === 0) {
            setStartstop(e => false)
            setTime(e => 5 * 60)
            setIsRest(e => !e)
            setLaunchMessage(messages[3])

        } else if (!startstop) {
            if (isRest) {
                document.title = `Решаем... `;
            } else {
                document.title = `Готовимся... ${finalTime}`;
                setTime(e => defTime)
                setLaunchMessage(messages[1])
            }

        }
    })


    function handleStartClick() {
        setStartstop(e => !e)
    }

    function handleLongRestClick() {
        setTime(e => 15 * 60)
        setStartstop(e => !e)
    }

    function handleSkipClick() {
        setStartstop(e => false)
        setIsRest(false)
    }

    function str_pad_left(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    let finalTime = str_pad_left(Math.floor(time / 60).toString()) + ':' + str_pad_left((time % 60).toString());

    return (
        <div className="App">
            <h1>{finalTime}</h1>

            <div className="edit-time-div">
                <button onClick={() => setDefTime(it => it + 60)}
                        disabled={startstop || defTime === 59 * 60 || isRest}>+
                </button>
                <button onClick={() => setDefTime(it => it - 60)} disabled={startstop || defTime === 60 || isRest}>-
                </button>
            </div>

            <div className="launch-buttons">
                {(!isRest || !startstop) && <button onClick={handleStartClick}>{launchMessage}</button>}
                {!startstop && isRest && <button onClick={handleLongRestClick}>{messages[4]}</button>}
                {isRest && <button onClick={handleSkipClick}>{messages[2]}</button>}
            </div>

            <div className="technical-div">
                <h2>Some logs...</h2>
                <ul>
                    <li>isRest={isRest && "tru"}</li>
                    <li>startstop={startstop && "tru"}</li>
                </ul>
            </div>


        </div>
    );
}

export default App;
