import React from "react";
import {taskType} from "../App";
import Task from "./Task";

interface TaskListProps {
    tasks: taskType[]
    onTaskDeleteClick: (arg0: string, arg1: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onTaskDoneChange: (arg0: string, arg1: React.ChangeEvent<HTMLInputElement>) => void
}


export default function TasksList(Props: TaskListProps) {
    const detailedTaskList = Props.tasks.map((task) => {
            const checkbox = <input
                type="checkbox"
                onChange={(e) => Props.onTaskDoneChange(task.id, e)}
                checked={task.isDone}
            />
            const deleteButton = <button
                className="btn-delete"
                onClick={(e) => Props.onTaskDeleteClick(task.id, e)}
            >
                Удалить
            </button>

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