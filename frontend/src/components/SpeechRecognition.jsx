import React, { useState, useEffect,useRef } from 'react';
import SpeechRecognition,{ useSpeechRecognition} from 'react-speech-recognition'


const Speech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        brwoserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if(!brwoserSupportsSpeechRecognition){
        return <span>Browser doesn't support speech recognition.</span>;
    }
 
  return (
    <div>
     <p>Microphone: {listening ? 'on': 'off'}</p>
     <button onClick={SpeechRecognition.startListening}>Start</button>
     <button onClick={SpeechRecognition.stopListening}>Stop</button>
     <button onClick={resetTranscript}>reset</button>

    </div>
  );
};




export default Speech;
