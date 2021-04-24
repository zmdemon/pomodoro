import React from "react";
import {taskType} from "../App";
import Task from "./Task";
import TasksList from "./TasksList";
import styled from "styled-components";

interface StatsProps {
    tasks: taskType[]
    tasksList?: JSX.Element
}

function Stats({tasks, tasksList}: StatsProps) {
    const StatsDiv = styled.div`
      border: 2px solid rgba(0, 0, 0, .1);
      border-radius: 10px;
      padding: 0;
      margin-bottom: 30px;
      width: 300px;

      h3 {
        margin-left: 20px;
      }
    //#F7F9FA
      div {
        border-bottom: 2px solid rgba(0, 0, 0, .1);
      }
      
    `;

    const Total = styled.h4`
      margin: 20px;
    `;

    const total2 = tasks.reduce((sum, task) => sum + task.total_duration, 0)

    return (
        <>
            <StatsDiv className="statistics-div">
                <h3>Задачи:</h3>
                {tasksList}
            <Total>Общее время: {total2 / 60} минут</Total>
            </StatsDiv>
        </>

    )
}

export default Stats