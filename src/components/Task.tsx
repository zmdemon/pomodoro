import React from "react";
import type {taskType} from '../App'
interface TaskProps {
    tasks: taskType[]
    id:string


}

function Task(Props: TaskProps) {

    const allTasks = Props.tasks.map((task) => <option key={task.id}>{task.taskName}</option>)
    const task = Props.tasks.filter(obj => {return obj.id === Props.id})[0]

    return (
        <div>
            <h4>{task.taskName}</h4>
            <ul>
                <li>кол-во {task.quantity}</li>
                <li>время {task.total_duration}</li>
            </ul>
        </div>
    )
}

export default Task