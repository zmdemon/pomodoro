import React from "react";
import {taskType} from "../App";
import Task from "./Task";

interface StatsProps {
    tasks: taskType[]

}

function Stats({ tasks}: StatsProps) {

    const detailedTaskList = tasks.map((task) => {
        return (
            <li key={task.id}><Task id={task.id} tasks={tasks}/></li>
        )
    })
    const total2 = tasks.reduce((sum, task) => sum + task.total_duration, 0)

    return (
        <div className="statistics-div">
            <h3>Задачи:</h3>
            <ul>
                {detailedTaskList}
                <li>Общее время: {total2 / 60} минут</li>
            </ul>
        </div>
    )
}

export default Stats