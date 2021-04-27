import React from "react";
import {taskType} from "../App";
import Task from "./Task";
import styled from "styled-components";
import {Button} from "./LaunchButtons";

interface TaskListProps {
    tasks: taskType[]
    onTaskDeleteClick: (arg0: string, arg1: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onTaskDoneChange: (arg0: string, arg1: React.ChangeEvent<HTMLInputElement>) => void
}

export const Delete = styled(Button)`
  border: 1px;
  border-radius: 5px;
  background-color: firebrick;
  cursor: pointer;
  color: navajowhite;
  font-size: 12px;
  margin-left: 30px;
  opacity: 0.5;
  
  &:hover {
    color: black;
    opacity: 1;
  }
`;

export default function TasksList(Props: TaskListProps) {
    const detailedTaskList = Props.tasks.map((task) => {
            const checkbox = <input
                type="checkbox"
                onChange={(e) => Props.onTaskDoneChange(task.id, e)}
                checked={task.isDone}
            />
            const deleteButton = <Delete
                className="btn-delete"
                onClick={(e) => Props.onTaskDeleteClick(task.id, e)}
            >
                Удалить
            </Delete>

            return (
                <li key={task.id}>
                    <Task id={task.id} key={task.id} tasks={Props.tasks} checkBox={checkbox} children={deleteButton}/>
                </li>
            )
        }
    ).reverse()
    return (
        <ul className={"tasks-list"}>
            {detailedTaskList}
        </ul>
    )

}