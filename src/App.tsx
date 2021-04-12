import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Technical from "./components/Technical";
import LaunchButtons from "./components/LaunchButtons";
import Time from "./components/Time"
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
// @ts-ignore
import uuid from "react-uuid";
import TaskListDrop from "./components/TaskListDrop";

type taskType = { "taskName": string, "id": string, "quantity": number, "total_duration": number }
export type {taskType}

function App() {
    const [time, setTime] = useState(1)
    const [defTime, setDefTime] = useState(25 * 60)
    const [restTime, setRestTime] = useState(300)
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro")
    const [sessions, setSessions] = useState<{ "interval": number, "desc": string }[]>([])
    const [tasks, setTasks] = useState<taskType[]>([])
    const [currentTaskId, setCurrentTaskId] = useState("")
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
            }, 10)
            return () => {
                clearTimeout(timerId)
            }
        } else if (time === 0) {
            setStart(e => false)
            setTime(e => restTime)
            setIsRest(e => !e)
            setLaunchMessage(messages[3])
            addInterval(currentTaskId) // adds working interval, if it wasn't a rest
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

    function addInterval(id: string) {
        if (!isRest) {
            setTasks(tasks.map(task => {
                if (task.id === id) {
                    return {...task, total_duration: task.total_duration += defTime, quantity: task.quantity += 1}
                }
                return task
            }))
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
        let id = uuid().toString()
        setTasks([...tasks, {taskName: taskName, id: id, total_duration: 0, quantity: 0}])
        setTaskName("")
        setCurrentTaskId(id)
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

    useEffect(() => console.log(currentTaskId), [currentTaskId])

    function handleCurrentTaskChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentTaskId(e.currentTarget.value);

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

            <TaskListDrop tasks={tasks} onCurrentTaskChange={handleCurrentTaskChange} currentTaskId={currentTaskId}/>

            <LaunchButtons
                onSkipClick={handleSkipClick}
                onLongRestClick={handleLongRestClick}
                onStartClick={handleStartClick}
                isRest={isRest}
                start={start}
                signature={launchMessage}
            />
            <Technical isRest={isRest} start={start} show={true}/>
            <Stats sessions={sessions} list={list} tasks={tasks}/>

        </div>
    );
};

export default App;
