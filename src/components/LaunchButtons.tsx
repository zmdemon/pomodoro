import React from "react";
import styled from 'styled-components';
import {timeConstNameType} from "../App";

interface LBProps {
    isRest: boolean
    start: boolean
    onSkipClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    onLongRestClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    onRestClick: (typeName: timeConstNameType, event: React.MouseEvent<HTMLButtonElement>) => void
    onStartClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    signature: string
}

enum Messages {
    cancel = "Отменить Pomodoro",
    launch = "Запустить Pomodoro",
    skip = "Пропустить перерыв",
    shortRest = "Начать короткий перерыв",
    longRest = "Начать длинный перерыв",
}

export const Button = styled.button`
  color: black;
  background-color: snow;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 1px;
`;
const StartButton = styled(Button)<{ signature: string }>`
  
  background-color: ${props => (props.signature===Messages.launch)? "rgba(108, 197, 81,0.9)":"rgba(247, 75, 64,0.9)"};
  //background-color: rgba(108, 197, 81,0.8);
`
export const StartButtons = styled(Button)`
  background-color: rgba(108, 197, 81,0.8);
`;

function LaunchButtons(Props: LBProps) {
    const isRest = Props.isRest
    const start = Props.start
    const onStartClick = Props.onStartClick
    const signature = Props.signature
    const onRestClick = Props.onRestClick

    return (
        <div className="launch-buttons">
            {(!isRest ) && <StartButton onClick={onStartClick} signature={signature}>{signature}</StartButton>}
            {!start && isRest && <Button onClick={e => onRestClick("shortRestTime", e)}>{Messages.shortRest}</Button>}
            {!start && isRest && <Button onClick={e => onRestClick("longRestTime", e)}>{Messages.longRest}</Button>}
            {isRest && <Button onClick={Props.onSkipClick}>{Messages.skip}</Button>}
        </div>
    )
}

export default LaunchButtons