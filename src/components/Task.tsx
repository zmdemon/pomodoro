import React from "react";
import type {taskType} from '../App'
import styled from "styled-components";

interface TaskProps {
    tasks: taskType[]
    id: string
    checkBox: React.ReactElement

}

function Task(Props: TaskProps) {



    //const allTasks = Props.tasks.map((task) => <option key={task.id}>{task.taskName}</option>)
    const task = Props.tasks.filter(obj => {
        return obj.id === Props.id
    })[0]

    const TaskName = styled.span`
  text-decoration: ${(task.isDone)? 'line-through': 'none'};
  
`;

    return (
        <div>

            <h4>{Props.checkBox} <TaskName>{task.taskName}</TaskName></h4>
            <ul>
                <li>кол-во: {task.quantity} из {task.estimated}</li>
                <li>время: {task.total_duration/60} мин.</li>
            </ul>
        </div>
    )
}

export default Task