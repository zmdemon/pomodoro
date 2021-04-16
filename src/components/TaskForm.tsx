import React from "react";
import {Button} from "./LaunchButtons";
import styled from "styled-components";
import {taskType} from "../App";

interface TaskFormProps {
    onTaskSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onNewTaskAdd: (event: React.MouseEvent<HTMLButtonElement>) => void
    onNameChange: (event: React.FormEvent<HTMLInputElement>) => void
    onFormClose: (event: React.MouseEvent<HTMLButtonElement>) => void
    taskDropdownList: JSX.Element
    taskName: string
    currentTaskName: string
    taskFormVisible: boolean
    currentTask: taskType

}

// {
//     const TaskInput = styled.input`
//       font-size: 100px;
//       font-family: 'Open Sans', sans-serif;
//       outline: none;
//       border: solid black;
//       border-radius: 0;
//       width: 100%;
//       height: 150px;
//       box-sizing: border-box;
//     `;
//
//     const Cross = styled.button`
//       background: none;
//       align-self: flex-end;
//       border: 0;
//       font-size: 60px;
//       width: 70px;
//       height: 70px;
//       margin-right: 150px;
//
//     `;
//
//     const Input = styled.button`
//       background: darkgray;
//       justify-self: start;
//       font-size: 60px;
//       border: solid black;
//       width: 150px;
//       height: 150px;
//       margin: 15px;
//     `;
//
//     const Div = styled.div`
//       display: flex;
//       flex-direction: column;
//       width: 80vw;
//       align-items: flex-end;
//     `;
//
//     const DivRow = styled(Div)`
//       flex-direction: row;
//       align-items: center;
//     `;
//
//
//     const TaskWrapper = styled.div`
//       z-index: 666;
//       background-color: whitesmoke;
//       top: 0;
//       left: 0;
//       position: fixed;
//       width: 100vw;
//       height: 100vh;
//       display: flex;
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//     `;
// }

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
            <Button onClick={props.onNewTaskAdd}>{(props.currentTaskName) ? props.currentTaskName : "Выбрать задачу"}
                <br/> {(props.currentTask)? "Сделано: "+props.currentTask.quantity:null}</Button>}
            {props.taskFormVisible && (
                <Div>
                    <form action="" onSubmit={props.onTaskSubmit}>
                        <h4><label htmlFor={'taskAdd'}>Добавить задачу:</label></h4>

                        <input type="text" name={'taskAdd'} onChange={props.onNameChange} value={props.taskName} placeholder={"Что делать?"}/>
                        <input type="number" placeholder={"Сколько делать?"}/>
                        <div>
                            <input type="submit" name={"web"} value={"добавить"}/>
                            <button onClick={props.onFormClose}>закрыть</button>
                        </div>

                        <h4><label htmlFor={'taskChoose'}>Выбрать задачу:</label></h4>
                        {props.taskDropdownList}
                    </form>
                </Div>

            )}
        </>)
}

export default TaskForm