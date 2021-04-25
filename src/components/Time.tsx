import React from "react";
import styled from "styled-components";
import {Button} from "./LaunchButtons";

interface LBProps {
    isRest: boolean
    start: boolean
    time: number
    onDefTimeClick: (plus: boolean, event: React.MouseEvent<HTMLButtonElement>) => void
}

const PlusButton = styled(Button)`
  font-family: 'Roboto Mono', monospace;
  font-size: larger;
`;

function Time(Props: LBProps) {
    const start = Props.start
    const isRest = Props.isRest
    const time = Props.time
    const onDefTimeClick = Props.onDefTimeClick

    let finalTime = prettyTime(Math.floor(time / 60).toString()) + ':' + prettyTime((time % 60).toString());

    function prettyTime(string: string) {
        return (new Array(3).join("0") + string).slice(-2);
    }

    return (
        <>
            <h1>{finalTime}</h1>
            <div className="edit-time-div">
                {(!isRest&&!start)&&<div>
                    <PlusButton onClick={(e) => onDefTimeClick(true, e)}
                                disabled={start || time >= 59 * 60 || isRest}>+
                    </PlusButton>
                    <PlusButton onClick={(e) => onDefTimeClick(false, e)} disabled={start || time <= 60 || isRest}>-
                    </PlusButton>
                </div>}

            </div>
        </>
    )
}

export default Time