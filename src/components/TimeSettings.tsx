import React from "react";
import {Button} from "./LaunchButtons";
import styled from "styled-components";
import {timeConstantsType} from "../App";

interface TimeSettingsProps {
    onTimeConstChange: (timeConstType: string, event: React.ChangeEvent<HTMLSelectElement>) => void
    timeConstants: timeConstantsType

}

type timeConstNameType = "shortRestTime" | "longRestTime" | "workingSessionTime"

function TimeSettings(Props: TimeSettingsProps) {

    const commonTimeConstants = {
        workingTimeValues: [
            1, 15, 20, 25, 30, 45, 50, 55, 60
        ],
        shortRestTimeValues: [
            1, 5, 7
        ],
        longRestTimeValues: [
            1, 5, 10, 15, 20, 25, 30
        ],
    }

    const makeOptions = (array: number[]) => {
        return array.map(value => <option value={value}>{value}</option>)
    }

    const makeSelection = (options: JSX.Element[], timeConstName: timeConstNameType) => {
        return (
            <select name="" id="" onChange={e => Props.onTimeConstChange(timeConstName, e)}
                    value={Props.timeConstants[timeConstName]}>
                {options}
            </select>)
    }

    const workingTimeSelect = makeSelection(makeOptions(commonTimeConstants.workingTimeValues), "workingSessionTime")
    const shortRestTimeSelect = makeSelection(makeOptions(commonTimeConstants.workingTimeValues), "shortRestTime")
    const longRestTimeSelect = makeSelection(makeOptions(commonTimeConstants.workingTimeValues), "longRestTime")


    return (
        <>
            {workingTimeSelect}
            {shortRestTimeSelect}
            {longRestTimeSelect}
        </>
    )
}

export default TimeSettings