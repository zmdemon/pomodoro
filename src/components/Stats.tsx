import React from "react";
import {taskType} from "../App";
import Task from "./Task";
import TasksList from "./TasksList";

interface StatsProps {
    tasks: taskType[]
    tasksList?: JSX.Element
}

function Stats({ tasks,tasksList}: StatsProps) {

    // const detailedTaskList = tasks.map((task) => {
    //     return (
    //         <li key={task.id}><Task id={task.id} tasks={tasks} /></li>
    //     )
    // })
    const total2 = tasks.reduce((sum, task) => sum + task.total_duration, 0)

    return (
        <div className="statistics-div">
            <h3>Задачи:</h3>
            {tasksList}
            <h4>Общее время: {total2 / 60} минут</h4>
        </div>
    )
}

export default Stats