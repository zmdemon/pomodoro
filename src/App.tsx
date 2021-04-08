import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Technical from "./Technical";
import LaunchButtons from "./LaunchButtons";
import Time from "./Time"
import Stats from "./Stats";
import TaskForm from "./TaskForm";

function App() {
    const [time, setTime] = useState(1);
    const [defTime, setDefTime] = useState(25 * 60)
    const [restTime, setRestTime] = useState(300)
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro")
    const [sessions, setSessions] = useState<{ "interval": number, "desc": string }[]>([])
    const [tasks, setTasks] = useState<{ "description": string }[]>([])
    const [start, setStart] = useState(false)
    const [isRest, setIsRest] = useState(false)
    const [taskFormVisible, setTaskFormVisible] = useState(false)
    const [taskName, setTaskName] = useState("")

    //const[info,setInfo] = useState<{ "isRest": boolean, "start": boolean }>({"isRest": false, "start": false })

    const messages: Array<string> = [
        "Отменить Pomodoro",
        "Запустить Pomodoro",
        "Пропустить перерыв",
        "Начать короткий перерыв",
        "Начать длинный перерыв"
    ]

    const list = sessions.map((session, index) => {
        return (
            <li key={index}>{index + 1}. Инвестированное время: {session.interval / 60} мин</li>
        )
    })


    useEffect(() => {
        if (start && time > 0) {
            setLaunchMessage(isRest ? messages[2] : messages[0])
            let timerId = setTimeout(() => {
                setTime(e => e - 1);
                document.title = isRest ? `Чилим!) ${finalTime}` : `Воркаем! ${finalTime}`;
            }, 1000)
            return () => {
                clearTimeout(timerId)
            }
        } else if (time === 0) {
            setStart(e => false)
            setTime(e => restTime)
            setIsRest(e => !e)
            setLaunchMessage(messages[3])
            addInterval() // adds working interval, if it wasn't a rest
        } else if (!start) {
            if (isRest) {
                document.title = `Решаем... `;
            } else {
                document.title = `Готовимся... ${finalTime}`;
                setTime(e => defTime)
                setLaunchMessage(messages[1])
            }
        }
    })


    useEffect(() => {
        const buttons = LaunchButtons
    }, [start])

    function addInterval() {
        if (!isRest) {
            setSessions([...sessions, {"interval": defTime, "desc": "Important work"}])
        }
    }

    function handleStartClick() {
        setStart(e => !e)
        console.log("cancel!")
    }

    function handleLongRestClick() {
        setTime(e => 15 * 60)
        setStart(e => !e)
    }

    function handleSkipClick() {
        setStart(e => false)
        setIsRest(e => false)
        console.log("skip")
    }

    function handleDefTimeClick(plus: boolean) {
        plus ? setDefTime(it => it + 60) : setDefTime(it => it - 60)
    }

    function handleTaskFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setTaskFormVisible(a => !a)
        setTasks([...tasks, {description: taskName}])
        setTaskName("")
    }

    function handleTaskFormClose() {

        setTaskFormVisible(a => !a)
    }

    function handleNewTaskAdd() {
        setTaskFormVisible(a => !a)
    }

    function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value);
    }

    function prettyTime(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    let finalTime = prettyTime(Math.floor(time / 60).toString()) + ':' + prettyTime((time % 60).toString());


    return (
        <div className="App">
            <Time isRest={isRest} time={time} defTime={defTime} start={start} onDefTimeClick={handleDefTimeClick}/>

            <TaskForm
                onTaskSubmit={handleTaskFormSubmit}
                taskFormVisible={taskFormVisible}
                onNewTaskAdd={handleNewTaskAdd}
                onNameChange={handleNameChange}
                taskName={taskName}
                onFormClose={handleTaskFormClose}
            />

            <LaunchButtons
                onSkipClick={handleSkipClick}
                onLongRestClick={handleLongRestClick}
                onStartClick={handleStartClick}
                isRest={isRest}
                start={start}
                signature={launchMessage}
            />
            <Technical isRest={isRest} start={start} show={true} tasks={tasks}/>
            <Stats sessions={sessions} list={list}/>

        </div>
    );
}

export default App;
