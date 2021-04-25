import React from "react";
import {Button} from "./LaunchButtons";
import styled from "styled-components";
import {Sets, taskType} from "../App";

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

const Input = styled.input`
  font-family: 'Roboto Mono', monospace;
  margin-bottom: 10px;
  font-weight: bold;
  padding: 3px;
  border: 1px solid black;
`;

const Title4 = styled.h4`
  margin: 10px 0 20px;

`;
const Submit = styled(Input)`
  border: 1px;
  border-radius: 5px;
  background-color: gainsboro;
  cursor: pointer;
  color: #282c34;

  &:hover {
    color: black;
  }
`;

const Ok = styled.button`
  border: 1px;
  border-radius: 5px;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;

  background-color: gainsboro;
  cursor: pointer;
  color: #282c34;
  padding: 5px 10px;
  

  &:hover {
    color: black;
  }
`


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
                <br/> {(props.currentTask) ? "Сделано: " + props.currentTask.quantity : null}</Button>}
            {props.taskFormVisible && (
                <Div>
                    <form action="" onSubmit={props.onTaskSubmit}>
                        <Title4><label htmlFor={'taskAdd'}>Добавить дело:</label></Title4>

                        <Input type="text" name={'taskAdd'} onChange={props.onNameChange} value={props.taskName}
                               placeholder={"Что делать?"}/>
                        <Input type="number" onChange={props.onQuantityChange} value={props.quantity}
                               placeholder={"Сколько делать?"}/>
                        <div>
                            <Submit type="submit" value={"Добавить"}/>

                        </div>

                        <Title4><label htmlFor={'taskChoose'}>Выбрать дело:</label></Title4>
                        {props.taskDropdownList}
                        <Ok onClick={props.onFormClose}>ОК</Ok>
                    </form>
                </Div>

            )}
        </>)
}

export default TaskForm