import React from "react";

interface StatsProps {
    sessions: {interval: number, desc: string}[]
    list: JSX.Element[]
}

function Stats( {sessions,list}:StatsProps ) {
    // const sessions = Props.sessions
    // const list = Props.list
    const total = sessions.reduce((sum, session) => sum + session.interval, 0)
    return (
        <div className="statistics-div">
            <h3>{(sessions.length !== 0) ? sessions[0].desc : "Задача:"}</h3>
            <ul>
                {list}
                <li>Общее время: {total / 60} минут</li>
            </ul>
        </div>
    )
}

export default Stats