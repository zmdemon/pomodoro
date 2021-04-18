import React from "react";

interface TechProps {

    isRest: boolean
    start: boolean
    show?: boolean
    children?: JSX.Element
    tasks?: { "description": string }[]
    time: number
}

function Technical(Props: TechProps) {
    if (!Props.show) {
        return null
    }
    const allTasks = Props.tasks?.map((task, index) => <li>{index} {task.description}</li>)
    return (
        <div className="technical-div">
            <h2>Some logs...</h2>
            {false&&<ul>
                <li>isRest={Props.isRest && "tru"}</li>
                <li>start={Props.start && "tru"}</li>
                <li>time: {Props.time} {Props.time / 60}</li>

            </ul>}
            <ul>
                {allTasks}
            </ul>
            {Props.children}
        </div>
    )
}

export default Technical