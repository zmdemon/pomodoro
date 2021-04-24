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
    return (
        <div className="technical-div">
            <h2>Statistics...</h2>
            {false&&<ul>
                <li>isRest={Props.isRest && "tru"}</li>
                <li>start={Props.start && "tru"}</li>
                <li>time: {Props.time} {Props.time / 60}</li>

            </ul>}

            {Props.children}
        </div>
    )
}

export default Technical