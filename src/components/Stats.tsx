import React from "react";
import {taskType} from "../App";
import Task from "./Task";

interface StatsProps {
    tasks: taskType[]
    sessions: { interval: number, desc: string }[]
    list: JSX.Element[]
}

function Stats({sessions, list, tasks}: StatsProps) {

    const detailedTaskList = tasks.map((task) => {
        return (
            <li key={task.id}><Task id={task.id} tasks={tasks}/></li>
        )
    })
    const total = sessions.reduce((sum, session) => sum + session.interval, 0)
    const total2 = tasks.reduce((sum, task) => sum + task.total_duration, 0)

    return (
        <div className="statistics-div">
            <h3>{(sessions.length !== 0) ? sessions[0].desc : "Задача:"}</h3>
            <ul>
                {detailedTaskList}
                <li>Общее время: {total / 60} минут</li>
            </ul>
        </div>
    )
}

export default Stats