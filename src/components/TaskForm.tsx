import React from "react";
import {Button} from "./LaunchButtons";
import styled from "styled-components";
import {taskType} from "../App";

interface TaskFormProps {
    onTaskSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onNewTaskAdd: (event: React.MouseEvent<HTMLButtonElement>) => void
    onNameChange: (event: React.FormEvent<HTMLInputElement>) => void
    onQuantityChange: (event: React.FormEvent<HTMLInputElement>) => void
    onFormClose: (event: React.MouseEvent<HTMLButtonElement>) => void
    taskDropdownList: JSX.Element
    taskName: string
    quantity: number
    currentTaskName: string
    taskFormVisible: boolean
    currentTask: taskType

}


    const Div = styled.div`
      box-sizing: border-box;
      border: #282c34 solid 3px;
      width: min-content;
      margin: 50px auto;
      padding: 15px;
    `;

function TaskForm(props: TaskFormProps) {

    return (
        <>
            {!props.taskFormVisible &&
            <Button onClick={props.onNewTaskAdd}>{(props.currentTaskName) ? props.currentTaskName : "Выбрать дело"}
                <br/> {(props.currentTask)? "Сделано: "+props.currentTask.quantity:null}</Button>}
            {props.taskFormVisible && (
                <Div>
                    <form action="" onSubmit={props.onTaskSubmit}>
                        <h4><label htmlFor={'taskAdd'}>Добавить дело:</label></h4>

                        <input type="text" name={'taskAdd'} onChange={props.onNameChange} value={props.taskName} placeholder={"Что делать?"}/>
                        <input type="number" onChange={props.onQuantityChange} value={props.quantity} placeholder={"Сколько делать?"}/>
                        <div>
                            <input type="submit" value={"добавить"}/>

                        </div>

                        <h4><label htmlFor={'taskChoose'}>Выбрать дело:</label></h4>
                        {props.taskDropdownList}
                        <button onClick={props.onFormClose}>ОК</button>
                    </form>
                </Div>

            )}
        </>)
}

export default TaskForm