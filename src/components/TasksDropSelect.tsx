import React from "react";
import type {taskType} from '../App'
import styled from "styled-components";

interface TaskListProps {
    tasks: taskType[]
    onCurrentTaskChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    currentTaskId: string
    show?: boolean

}

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  appearance: none;
  border: 1px solid black;
  padding: 2px 3px 5px;
  margin-bottom: 10px;
  width: 100%;
  text-align: center;
`;

export default function TasksDropSelect(Props: TaskListProps) {

    const allTasks = Props.tasks.map((task) => <option key={task.id} value={task.id}>{task.taskName}</option>)
    return (
        <Select name="tasks" id="tasksDropdown" onChange={Props.onCurrentTaskChange} value={Props.currentTaskId}>
            {allTasks}
        </Select>
    )
}