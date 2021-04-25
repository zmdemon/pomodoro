import React from "react";
import type {taskType} from '../App'
import styled from "styled-components";

interface TaskProps {
    tasks: taskType[]
    id: string
    checkBox: React.ReactElement
    children?: JSX.Element
}


const TaskDiv = styled.div`

  padding: 20px;

  h4 {
    margin-top: 0;
  }

  &:hover {
    backdrop-filter: saturate(80%);
    background-color: rgba(92, 92, 92, 0.05); // <Thing> when hovered
  }
`;
const TaskName = styled.span<{ isDone: boolean }>`
  text-decoration: ${props => (props.isDone) ? 'line-through' : 'none'};
`;

function Task(Props: TaskProps) {


    const task = Props.tasks.filter(obj => {
        return obj.id === Props.id
    })[0]


    return (
        <TaskDiv>

            <h4>{Props.checkBox} <TaskName isDone={task.isDone}>{task.taskName}</TaskName></h4>
            <ul>
                <li>кол-во: {task.quantity} из {task.estimated}</li>
                <li>время: {task.total_duration / 60} мин.</li>
            </ul>
            {Props.children}
        </TaskDiv>
    )
}

export default Task