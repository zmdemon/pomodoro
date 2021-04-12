import React from "react";

interface TechProps {
    isRest: boolean
    start: boolean
    show?:boolean
    children?: JSX.Element
    tasks?: { "description": string }[]
}

function Technical(Props: TechProps) {
    if (!Props.show) {
        return null
    }
    const allTasks = Props.tasks?.map((task,index) => <li>{index} {task.description}</li>)
    return (
        <div className="technical-div">
            <h2>Some logs...</h2>
            <ul>
                <li>isRest={Props.isRest && "tru"}</li>
                <li>start={Props.start && "tru"}</li>
                <ul>
                    {allTasks}
                </ul>
            </ul>
            {Props.children}
        </div>
    )
}

export default Technical