import React, {useEffect, useState} from 'react';
import './App.css';
import Technical from "./components/Technical";
import LaunchButtons, {Button} from "./components/LaunchButtons";
import Time from "./components/Time"
import Stats from "./components/Stats";
import TaskForm from "./components/TaskForm";
// @ts-ignore
import uuid from "react-uuid";
import TasksDropSelect from "./components/TasksDropSelect";
import TimeSettings from "./components/TimeSettings";
import TasksList from "./components/TasksList";
import MenuWrapper from "./components/MenuWrapper";
import styled from "styled-components";

type taskType = { "taskName": string, "id": string, "quantity": number, "total_duration": number, "estimated": number, "isDone": boolean }
type timeConstantsType = { "shortRestTime": number, "longRestTime": number, "workingSessionTime": number }
type timeConstNameType = "shortRestTime" | "longRestTime" | "workingSessionTime"

export type {taskType, timeConstantsType, timeConstNameType}

export const Sets = styled(Button)`
      border: 1px;
      border-radius: 5px;
      background-color: gainsboro;
      cursor: pointer;
      color: #282c34;
  font-size: 17px;

      &:hover {
        color: black;
      }
    `;
const ControlsDiv = styled.div`
      display: flex;
    `;

function App() {
    const [time, setTime] = useState<number>(1)

    const [timeConstants, setTimeConstants] = useState<timeConstantsType>({
        shortRestTime: 5 * 60,
        longRestTime: 15 * 60,
        workingSessionTime: 25 * 60
    })
    const [launchMessage, setLaunchMessage] = useState("Запустить Pomodoro")
    const [tasks, setTasks] = useState<taskType[]>(() => {
        const all: taskType[] = JSON.parse(localStorage.getItem("items") as string);
        if (!all) {
            return [];
        } else return all;
    });
    const [currentTaskId, setCurrentTaskId] = useState("")
    const [start, setStart] = useState(false)
    const [isRest, setIsRest] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [estQuantity, setEstQuantity] = useState(4)
    const [timeSpeed, setTimeSpeed] = useState(1000)
    const [taskFormVisible, setTaskFormVisible] = useState(false)
    const [tabVisible, setTabVisible] = useState(false)
    const [statsVisible, setStatsVisible] = useState(false)


    const messages: Array<string> = [
        "Отменить Pomodoro",
        "Запустить Pomodoro",
        "Пропустить перерыв",
        "Начать короткий перерыв",
        "Начать длинный перерыв"
    ]


    const id = React.useRef(0);
    const clear = () => {
        window.clearInterval(id.current);
    };
    React.useEffect(() => {
        if (start && time > 0) {
            setLaunchMessage(isRest ? messages[2] : messages[0])
            id.current = window.setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        }

        return () => clear();
    }, [start]);

    React.useEffect(() => {
        if (time === 0) {
            setStart(_ => false)
            setTime(_ => timeConstants.shortRestTime)
            setIsRest(e => !e)
            setLaunchMessage(messages[3])
            addInterval(currentTaskId)
            clear();
        }
    }, [time]);

    React.useEffect(() => {
        document.title = isRest ? `Чилим!)` : `Воркаем! ${finalTime}`;
    }, [time, isRest]);

    React.useEffect(() => {
        if (!start) {
            if (isRest) {
                document.title = `Решаем... `;
            } else {
                document.title = `Готовимся... ${finalTime}`;
                setLaunchMessage(messages[1])
            }
        }
    }, [start]);


    // useEffect(() => {
    //     if (start && time > 0) {
    //         setLaunchMessage(isRest ? messages[2] : messages[0])
    //         let timerId = setTimeout(() => {
    //             setTime(e => e - 1);
    //             document.title = isRest ? `Чилим!) ${finalTime}` : `Воркаем! ${finalTime}`;
    //         }, timeSpeed)
    //         return () => {
    //             clearTimeout(timerId)
    //         }
    //     } else if (time === 0) {
    //         setStart(_ => false)
    //         setTime(_ => timeConstants.shortRestTime)
    //         setIsRest(e => !e)
    //         setLaunchMessage(messages[3])
    //         addInterval(currentTaskId) // adds working interval, if it wasn't a rest
    //     } else if (!start) {
    //         if (isRest) {
    //             document.title = `Решаем... `;
    //         } else {
    //             document.title = `Готовимся... ${finalTime}`;
    //             setLaunchMessage(messages[1])
    //         }
    //     }
    // })

    useEffect(() => {
        if (!start) {
            setTime(_ => timeConstants.workingSessionTime)
        }
    }, [start, timeConstants])

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(tasks));
    }, [tasks]);



    useEffect(() => {
        if (isRest) {
            setTime(_ => timeConstants.shortRestTime)
        } else if (!isRest) {
            setTime(_ => timeConstants.workingSessionTime)
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
        setTime(_ => timeConstants[typeName])
        setStart(e => !e)
    }

    function handleLongRestClick() {
        setTime(_ => timeConstants.longRestTime)
        setStart(e => !e)
    }

    function handleSkipClick() {
        setStart(_ => false)
        setIsRest(_ => false)
        console.log("skip")
    }


    function handleDefTimeClick(plus: boolean) {
        plus ? setTime(time - (-60)) : setTime(time - 60)
    }

    function handleTimeConstChange(timeConstType: timeConstNameType, e: React.ChangeEvent<HTMLSelectElement>) {
        setTimeConstants({...timeConstants, [timeConstType]: e.target.value})
    }

    function handleTimeSpeedChangeChange() {
        (timeSpeed < 1000) ? setTimeSpeed(e => e * 10) : setTimeSpeed(10)
    }

    function handleTaskFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setTaskFormVisible(a => !a)
        let id = uuid().toString()
        setTasks([...tasks, {
            taskName: taskName,
            estimated: estQuantity,
            quantity: 0,
            id: id,
            total_duration: 0,
            isDone: false
        }])
        setTaskName("")
        setEstQuantity(4)
        setCurrentTaskId(id)
    }

    function handleTaskDeleteClick(id: string) {
        setTasks(tasks.filter((task) => task.id !== id));
        if (currentTaskId === id) {
            setCurrentTaskId("")
        }
    }

    function handleTaskFormClose() {
        setTaskFormVisible(a => !a)
        if (currentTaskId === "") {
            setCurrentTaskId(tasks[0].id)
        }
    }

    function handleTabClose() {
        setTabVisible(a => !a)
    }

    function handleStatsClose() {
        setStatsVisible(a => !a)
    }


    // function handleTaskDivClick(id: string) {
    //     setCurrentTaskId(id)
    // }

    function handleTaskDoneChange(id: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, isDone: !task.isDone}
            }
            return task
        }))
    }


    function handleNewTaskAdd() {
        setTaskFormVisible(a => !a)
    }

    function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value);
    }

    function handleQuantityChange(e: React.FormEvent<HTMLInputElement>) {
        setEstQuantity(parseInt(e.currentTarget.value, 10));
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
                onQuantityChange={handleQuantityChange}
                quantity={estQuantity}
                taskName={taskName}
                onFormClose={handleTaskFormClose}
                taskDropdownList={<TasksDropSelect tasks={tasks} onCurrentTaskChange={handleCurrentTaskChange}
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



            <ControlsDiv>
                <Sets onClick={handleStatsClose}>Статистика</Sets>
                <Sets onClick={handleTabClose}>Настройки</Sets>
            </ControlsDiv>

            <Technical isRest={isRest} start={start} show={false} time={time} children={
                <>
                    {/*{currentTaskId && "Current task is:" + currentTaskId}*/}
                    <Stats tasks={tasks}
                           tasksList={<TasksList tasks={tasks} onTaskDeleteClick={handleTaskDeleteClick}
                                                 onTaskDoneChange={handleTaskDoneChange}/>}/>

                    <button onClick={handleTimeSpeedChangeChange}>boost) {timeSpeed}</button>
                </>

            }/>

            {statsVisible &&
            <Stats tasks={tasks}
                   tasksList={<TasksList
                       tasks={tasks}
                       onTaskDeleteClick={handleTaskDeleteClick}
                       onTaskDoneChange={handleTaskDoneChange}
                   />}
            />}

            {tabVisible && <MenuWrapper
                title={"Настройки"}
                onCrossClick={handleTabClose}
                children={
                    <TimeSettings
                        timeConstants={timeConstants}
                        onTimeConstChange={handleTimeConstChange}
                    />}
            />}


        </div>
    );
}

export default App;
