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
import TimeSettings from "./components/TimeSettings";

type taskType = { "taskName": string, "id": string, "quantity": number, "total_duration": number }
type timeConstantsType = { "shortRestTime": number, "longRestTime": number, "workingSessionTime": number }
type timeConstNameType = "shortRestTime" | "longRestTime" | "workingSessionTime"

export type {taskType, timeConstantsType, timeConstNameType}

function App() {
    const [time, setTime] = useState<number>(1)

    const [timeConstants, setTimeConstants] = useState<timeConstantsType>({
        shortRestTime: 5 * 60,
        longRestTime: 15 * 60,
        workingSessionTime: 25 * 60
    })
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro")
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
            setTime(e => timeConstants.shortRestTime)
            setIsRest(e => !e)
            setLaunchMessage(messages[3])
            addInterval(currentTaskId) // adds working interval, if it wasn't a rest
        } else if (!start) {
            if (isRest) {
                document.title = `Решаем... `;
            } else {
                document.title = `Готовимся... ${finalTime}`;
                setLaunchMessage(messages[1])
            }
        }
    })

    useEffect(() => {
        if (!start) {
            setTime(e => timeConstants.workingSessionTime)
        }
    }, [start, timeConstants])


    useEffect(() => {
        const buttons = LaunchButtons
    }, [start])

    useEffect(() => {
        if (isRest) {
            setTime(e => timeConstants.shortRestTime)
        } else if (!isRest) {
            setTime(e => timeConstants.workingSessionTime)
        }

    }, [timeConstants, isRest])

    function addInterval(id: string) {
        if (!isRest) {
            setTasks(tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        total_duration: task.total_duration -= -timeConstants.workingSessionTime,
                        quantity: task.quantity += 1
                    }
                }
                return task
            }))

        }
    }

    function handleStartClick() {
        setStart(e => !e)
        console.log("cancel!")
    }

    function handleRestClick(typeName: timeConstNameType) {
        setTime(e => timeConstants[typeName])
        setStart(e => !e)
    }

    function handleLongRestClick() {
        setTime(e => timeConstants.longRestTime)
        setStart(e => !e)
    }

    function handleSkipClick() {
        setStart(e => false)
        setIsRest(e => false)
        console.log("skip")
    }


    function handleDefTimeClick(plus: boolean) {
        plus ? setTime(time - (-60)) : setTime(time - 60)
    }

    function handleTimeConstChange(timeConstType: timeConstNameType, e: React.ChangeEvent<HTMLSelectElement>) {
        setTimeConstants({...timeConstants, [timeConstType]: e.target.value})
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

    function handleCurrentTaskChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentTaskId(e.currentTarget.value);
    }

    function prettyTime(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    let finalTime = prettyTime(Math.floor(time / 60).toString()) + ':' + prettyTime((time % 60).toString());
    let currentTask = tasks.filter(task => task.id === currentTaskId)[0]

    return (
        <div className="App">
            <Time isRest={isRest} time={time} start={start} onDefTimeClick={handleDefTimeClick}/>

            <TaskForm
                onTaskSubmit={handleTaskFormSubmit}
                taskFormVisible={taskFormVisible}
                onNewTaskAdd={handleNewTaskAdd}
                onNameChange={handleNameChange}
                taskName={taskName}
                onFormClose={handleTaskFormClose}
                taskDropdownList={<TaskListDrop tasks={tasks} onCurrentTaskChange={handleCurrentTaskChange}
                                                currentTaskId={currentTaskId}/>}
                currentTaskName={currentTask?.taskName}
                currentTask={currentTask}
            />


            <LaunchButtons
                onSkipClick={handleSkipClick}
                onLongRestClick={handleLongRestClick}
                onRestClick={handleRestClick}
                onStartClick={handleStartClick}
                isRest={isRest}
                start={start}
                signature={launchMessage}
            />
            <Technical isRest={isRest} start={start} show={true} time={time} children={
                <>
                    Current task is: {currentTaskId}
                    <Stats tasks={tasks}/>
                    <TimeSettings timeConstants={timeConstants} onTimeConstChange={handleTimeConstChange}/>
                </>

            }/>


        </div>
    );
}

export default App;
