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

const Title4 = styled.h4`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: normal;
`;

const LiStat = styled.li`
  margin: 0 35px 5px;
  font-size: 14px;

`;
const TaskName = styled.span<{ isDone: boolean }>`
  text-decoration: ${props => (props.isDone) ? 'line-through' : 'none'};
  margin-left: 7px;
`;

function Task(Props: TaskProps) {


    const task = Props.tasks.filter(obj => {
        return obj.id === Props.id
    })[0]


    return (
        <TaskDiv>

            <Title4>{Props.checkBox} <TaskName isDone={task.isDone}>{task.taskName}</TaskName></Title4>
            <ul>
                <LiStat>кол-во: {task.quantity} из {task.estimated}</LiStat>
                <LiStat>время: {task.total_duration / 60} мин.</LiStat>
            </ul>
            {Props.children}
        </TaskDiv>
    )
}

export default Task