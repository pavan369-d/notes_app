import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSpeech from "../hooks/useSpeechText/useSpeech";
import Image from "../components/Image";
import { useAuthContext } from "../hooks/useAuthContext";
import Notes from "../components/Notes";
import { useFetchNotes } from "../hooks/useFetchNotes";
import { useNotesContext } from "../hooks/useNotesContext";

const Home = ({ text, setText, copyTex }) => {
  const [title, setTitle] = useState("");

  const [image, setImage] = useState("");

  const [searchText, setSearchText] = useState("");

  const { isListening, startListening, stopListening, transcript, TextSpeech } =
    useSpeech({ continuous: true });

  const { user } = useAuthContext();
  const { dispatch, notes } = useNotesContext();
  const { getNotes, creatNotes, isLoading, error } = useFetchNotes();

  const start = () => {
    if (!isListening) {
      startListening();
    }
  };

  const stop = () => {
    if (isListening) {
      setText(
        (prevVal) =>
          prevVal +
          (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
      );
      stopListening();

      creatNotes(
        "http://localhost:3000/api/notes/",
        image,
        title,
        text,
        setText,
        setTitle,
        setImage
      );
    }
  };

  //  const TextToAudio = async (noteId, someText) => {
  //   const API_KEY = import.meta.env.VITE_API_KEY;
  //   const url = `https://api.voicerss.org/?key=${API_KEY}&hl=en-us&src=${encodeURIComponent(someText)}&f=48khz_16bit_stereo`;

  //   try {
  //     const response = await fetch(url);
  //     const audioBlob = await response.blob();
  //     const audioUrl = URL.createObjectURL(audioBlob);

  //     // Update state with the new audio source for the clicked note
  //     setAudioSources(prev => ({ ...prev, [noteId]: audioUrl }));
  //   } catch (error) {
  //     console.log('Error fetching audio:', error);
  //   }
  // };

  const handleImages = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage([...image, reader.result]);
      };
    }
  };

  const handleNotesSort = () => {
    const sortednotes = [...notes].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
    dispatch({
      type: "SORT_NOTES",
      payload: sortednotes,
    });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      // console.log(user);
      getNotes("http://localhost:3000/api/notes/");
    }
  }, [user]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="main">
        <div className="top-search">
          <div className="search-field">
            <i className="ri-search-line"></i>
            <input
              type="text"
              placeholder="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button onClick={handleNotesSort}>
            <i className="ri-sort-asc"></i>sort
          </button>
        </div>
        <main>
          <div className="notes">
            <Notes copyTex={copyTex} notes={filteredNotes} />
          </div>
        </main>
        <div className="transcript-field">
          <div className="transcripttitle">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
          </div>
          <div className="speech-field">
            <Image image={image} handleImages={handleImages} />
            <input
              disabled={isListening}
              className="main-content"
              value={
                isListening
                  ? `${text}${
                      transcript.length
                        ? (text.length ? " " : "") + transcript
                        : ""
                    }`
                  : text
              }
              onChange={(e) => setText(e.target.value)}
            />

            <div className="btn-style">
              <button
                className="speech-listen-btn"
                onClick={isListening ? stop : start}
              >
                {isListening ? "Stop Listening" : "Start Listening"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
