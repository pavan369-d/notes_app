import { useEffect, useRef, useState } from "react";

const useSpeech = (options) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech Recognition is not supported in your browser');
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.interimResults = options.interimResults || true;
        recognition.lang = options.lang || 'en-US';
        recognition.continuous = options.continuous || false;

        if ('webkitSpeechGrammarList' in window) {
            const grammar = "#JSGF V1.0 grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        recognition.onresult = (event) => {
            let text = "";
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
            // console.log(text + " some text");
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === 'network') {
                console.log("Network error, check your internet connection or permissions.");
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        // Cleanup: stop recognition if the component unmounts
        return () => recognition.stop();

    }, []); // Empty dependency array ensures this runs once when the component mounts

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (error) {
                console.log("Speech recognition failed, retrying...", error);
                setTimeout(startListening, 3000); // Retry after 3 seconds
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    const TextSpeech = (text)=>{
        if(!window.speechSynthesis){
            alert("Text-to-Speech is not supported in this browser");
            return
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = options.lang || 'en-US';
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;

        window.speechSynthesis.speak(utterance);
    }

    return { isListening, transcript, startListening, stopListening ,TextSpeech};
};

export default useSpeech;
