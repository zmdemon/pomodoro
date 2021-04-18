import React from "react";
import {timeConstantsType, timeConstNameType} from "../App";

interface TimeSettingsProps {
    onTimeConstChange: (timeConstName: timeConstNameType, event: React.ChangeEvent<HTMLSelectElement>) => void
    timeConstants: timeConstantsType

}


function TimeSettings(Props: TimeSettingsProps) {

    const commonTimeConstants = {
        workingTimeValues: [
            1, 15, 20, 25, 30, 45, 50, 55, 60
        ].map(i => i * 60),
        shortRestTimeValues: [
            1, 3, 4, 5, 7
        ].map(i => i * 60),
        longRestTimeValues: [
            1, 5, 10, 15, 20, 25, 30
        ].map(i => i * 60),
    }


    const makeOptions = (array: number[]) => {
        return array.map(value => <option value={value}>{value / 60}</option>)
    }

    const makeSelection = (options: JSX.Element[], timeConstName: timeConstNameType) => {
        return (
            <select name={timeConstName} id={timeConstName} onChange={e => Props.onTimeConstChange(timeConstName, e)}
                    value={Props.timeConstants[timeConstName]}>
                {options}
            </select>)
    }

    const workingTimeSelect = makeSelection(makeOptions(commonTimeConstants.workingTimeValues), "workingSessionTime")
    const shortRestTimeSelect = makeSelection(makeOptions(commonTimeConstants.shortRestTimeValues), "shortRestTime")
    const longRestTimeSelect = makeSelection(makeOptions(commonTimeConstants.longRestTimeValues), "longRestTime")


    return (
        <>
            <h4>Настройки времени</h4>
            <section>
                <label htmlFor="workingSessionTime">Рабочее время--</label>
                {workingTimeSelect}
            </section>
            <section>
                <label htmlFor="shortRestTime">Короткий перерыв--</label>
                {shortRestTimeSelect}
            </section>
            <section>
                <label htmlFor="longRestTime">Длиннный перерыв--</label>
                {longRestTimeSelect}
            </section>


        </>
    )
}

export default TimeSettings