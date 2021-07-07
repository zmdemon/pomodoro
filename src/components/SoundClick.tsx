import React, {useState} from "react";
import type {taskType} from '../App'
import styled from "styled-components";
// @ts-ignore
import Click from '../sounds/click61.mp3'

const Sound = require('react-sound').default;

interface SoundProps {
    isPlaying: boolean
    onSetIsPlaying: any
}


function SoundClick(Props: SoundProps) {

    // const [isPlaying, setIsPlaying] = useState(false)
    const isPlaying = Props.isPlaying
    const setIsPlaying = Props.onSetIsPlaying

    return (
        <div>
            {/*<button onClick={() => setIsPlaying(!isPlaying)}>go</button>*/}
            <Sound
                url={Click}
                playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                // playStatus={Props.onStartPlaying}
                onFinishedPlaying={() => setIsPlaying(false)}
                onPlaying={() => console.log('я processing')}
            >

            </Sound>
        </div>

    )
}

export default SoundClick
