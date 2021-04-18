import React from "react";
import type {taskType} from '../App'

interface TaskListProps {
    tasks: taskType[]
    onCurrentTaskChange:(event: React.ChangeEvent <HTMLSelectElement>) => void
    currentTaskId:string
    show?: boolean

}

export default function TasksDropSelect(Props: TaskListProps) {

    const allTasks = Props.tasks.map((task) => <option key={task.id} value={task.id}>{task.taskName}</option>)
    return (
        <select name="tasks" id="tasksDropdown" onChange={Props.onCurrentTaskChange} value={Props.currentTaskId}>
            {allTasks}
        </select>
    )
}