import React from "react";
import styled from "styled-components";
import {Button} from "./LaunchButtons";

interface LBProps {
    isRest: boolean
    start: boolean
    time:number
    defTime:number
    onDefTimeClick: (plus:boolean, event: React.MouseEvent<HTMLButtonElement>) => void
}
const PlusButton = styled(Button)`
  font-family: 'Roboto Mono', monospace;
  font-size: larger;
`;

function Time(Props:LBProps) {
    const start = Props.start
    const isRest = Props.isRest
    const time = Props.time
    const defTime = Props.defTime
    const onDefTimeClick = Props.onDefTimeClick

    let finalTime = prettyTime(Math.floor(time / 60).toString()) + ':' + prettyTime((time % 60).toString());
    function prettyTime(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    return (
        <>
            <h1>{finalTime}</h1>
            <div className="edit-time-div">
                <PlusButton onClick={(e)=>onDefTimeClick(true,e)}//добавить handle-функцию в App и on-функцию сюда
                        disabled={start || defTime === 59 * 60 || isRest}>+
                </PlusButton>
                <PlusButton onClick={(e) => onDefTimeClick(false,e)} disabled={start || defTime === 60 || isRest}>-
                </PlusButton>
            </div>
        </>
    )
}
export default Time