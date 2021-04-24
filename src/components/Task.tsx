import React, {MouseEventHandler} from "react";
import type {taskType} from '../App'
import styled from "styled-components";

interface TaskProps {
    tasks: taskType[]
    id: string
    checkBox: React.ReactElement
    children?: JSX.Element
    //onTaskDivClick: (arg0: string, arg1: MouseEventHandler<HTMLDivElement>) => void
}

function Task(Props: TaskProps) {


    //const allTasks = Props.tasks.map((task) => <option key={task.id}>{task.taskName}</option>)
    const task = Props.tasks.filter(obj => {
        return obj.id === Props.id
    })[0]

    const TaskName = styled.span`
      text-decoration: ${(task.isDone) ? 'line-through' : 'none'};
    `;
    const TaskDiv = styled.div`

      &:hover {
        backdrop-filter: saturate(80%);

        background-color: rgba(92, 92, 92, 0.05); // <Thing> when hovered
      }
    `;


    return (
        <TaskDiv>

            <h4>{Props.checkBox} <TaskName>{task.taskName}</TaskName></h4>
            <ul>
                <li>кол-во: {task.quantity} из {task.estimated}</li>
                <li>время: {task.total_duration / 60} мин.</li>
            </ul>
            {Props.children}
        </TaskDiv>
    )
}

export default Task