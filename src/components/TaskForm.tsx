import React from "react";
import {Button} from "./LaunchButtons";
import styled from "styled-components";
import { taskType} from "../App";

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


const TaskButton = styled(Button)`
  width: 300px;
  cursor: pointer;

`;

const Input = styled.input`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2em;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-weight: bold;
  padding: 4px;
  width: 100%;
  border: 1px solid black;
`;

const Title4 = styled.h4`
  margin: 10px 0 20px;
  font-size: 1.5em;
  font-weight: bold;

`;
const Submit = styled(Input)`
  border: 1px;
  border-radius: 5px;
  background-color: gainsboro;
  width: 50%;
  cursor: pointer;
  color: #282c34;
  font-size: 17px;
  padding: 5px 8px;

  &:hover {
    color: black;
  }
`;

const Ok = styled.button`
  border: 1px;
  border-radius: 5px;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  font-size: 17px;
  width: 50%;
  background-color: gainsboro;
  cursor: pointer;
  color: #282c34;
  padding: 5px 10px;
  &:hover {
    color: black;
  }
`;


const Div = styled.div`
  box-sizing: border-box;
  border: #282c34 solid 3px;
  width: 350px;
  margin: 50px auto;
  padding: 15px;
  background-color: rgba(255,255,255,0.9);

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;


`;


function TaskForm(props: TaskFormProps) {

    return (
        <>
            {!props.taskFormVisible &&
            <TaskButton onClick={props.onNewTaskAdd}>{(props.currentTaskName) ? props.currentTaskName : "Выбрать дело"}
                <br/> {(props.currentTask) ? "Сделано: " + props.currentTask.quantity : null}</TaskButton>}
            {props.taskFormVisible && (
                <Div>
                    <Form action="" onSubmit={props.onTaskSubmit}>
                        <Title4><label htmlFor={'taskAdd'}>Добавить дело:</label></Title4>

                        <Input type="text" name={'taskAdd'} onChange={props.onNameChange} value={props.taskName}
                               placeholder={"Что делать?"}/>
                        <Input type="number" onChange={props.onQuantityChange} value={props.quantity}
                               placeholder={"Сколько делать?"}/>

                        <Submit type="submit" value={"Добавить"}/>


                        <Title4><label htmlFor={'taskChoose'}>Выбрать дело:</label></Title4>
                        {props.taskDropdownList}
                        <Ok onClick={props.onFormClose}>OK</Ok>
                    </Form>
                </Div>

            )}
        </>)
}

export default TaskForm