import React, { useEffect, useState } from "react";
import { useFetchNotes } from "../hooks/useFetchNotes";
import { useNotesContext } from "../hooks/useNotesContext";
import Image from "./Image";
import { useAuthContext } from "../hooks/useAuthContext";

const Notes = ({ copyTex, notes }) => {
  const { getNotes, updateNotes,deleteNotes,error,isLoading } = useFetchNotes();
 
  const { user } = useAuthContext();
  const [noteImages, setNoteImages] = useState({});
  const [toggleOptions, setToggleOptions] = useState({}); // Store toggle state per note
  const [changeTitle, setChangeTitle] = useState({});
  const [selectedNote, setSelectedNote] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
  const [favNotes,setFavNotes] = useState([]);
 
  const handleNoteImages = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNoteImages((prev) => ({
          ...prev,
          [id]: reader.result, // Store image with the corresponding note ID
        }));
      };
    }
  };

  // Toggle function that updates only the clicked note
  const handleToggle = (id) => {
    setToggleOptions((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle only the clicked note's dropdown
    }));
  };

  const handleDelteNote = (id) => {
    deleteNotes(`http://localhost:3000/api/notes/${id}`)
  };

  const handleTitleChange = (id) => {
    const updatedNote = notes.find((n) => n._id === id);
    if (updatedNote) {
      const newNote = {
        ...updatedNote,
        title: changeTitle[id] || updatedNote.title,
      };
      updateNotes(`http://localhost:3000/api/notes/${id}`, newNote);
    }
  };

  const addToFav= (id)=>{
    const note = notes.find((n)=>n._id===id)
    setFavNotes((prev)=>[...prev,note])
    
    const unique = favNotes.filter(
      (value, index, self) => 
        index === self.findIndex((t) => t._id === value._id)
    );
    localStorage.setItem('fav',JSON.stringify(unique))
    console.log(favNotes)
    
  }


  const openNotePopup = (note) => {
    setSelectedNote(note);
    setIsPopupOpen(true);
};

const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedNote(null);
    if (isFullscreen) document.exitFullscreen();
};

const toggleFullscreen = () => {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
    } else {
        document.exitFullscreen();
        setIsFullscreen(false);
    }
};



  useEffect(() => {
    if (user) {
      getNotes("http://localhost:3000/api/notes/");
    }
  },[]);

   
    if(isLoading){
      return <p>Loading notes...</p>; 
    }

    if(error){
      return <p>Error: {error}</p>
    }
  
    
    
  return (
    <>
      {notes &&
        notes?.map((note) => (
          <div key={note._id} className="note" >
            <div className="note-title">
              <input
                type="text"
                value={changeTitle[note._id] || note.title}
                onChange={(e) =>
                  setChangeTitle((prev) => ({
                    ...prev,
                    [note._id]: e.target.value,
                  }))
                }
              />
               <button onClick={()=>addToFav(note._id)}> <i className="ri-star-s-line"></i></button>

             
            </div>
            <div className="note-content" onClick={() => openNotePopup(note)}>{note.content}</div>

            {/* Display uploaded or existing images */}
            {note.images.map((img, index) => (
              <img key={index} src={noteImages[note._id] || img} alt="Note" />
            ))}

            <div className="note-options">
              <button onClick={copyTex}>
                <i className="ri-file-copy-line"></i>
              </button>
              {/* <button onClick={() => TextToAudio(note._id, note.content)}>
                Speak
              </button> */}

              <label htmlFor={`input-${note._id}`}>+</label>
              <input
                id={`input-${note._id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleNoteImages(note._id, e)}
                style={{ display: "none" }}
              />

              <button
                className="more-options"
                onClick={() => handleToggle(note._id)}
              >
                <i className="ri-more-line"></i>
              </button>

              {/* Toggle-specific dropdown */}
              {toggleOptions[note._id] && (
                <div
                  className={toggleOptions ? "active-drop" : "inactive-drop"}
                >
                  <button onClick={() => handleDelteNote(note._id)}>
                    Delete note
                  </button>
                  <button onClick={() => handleTitleChange(note._id)}>
                    Rename note
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
         {isPopupOpen && selectedNote && (
                <div className={`note-popup ${isFullscreen ? 'fullscreen' : ''}`}>
                    <div className="popup-header">
                            <button onClick={toggleFullscreen}>
                                {isFullscreen ? 'Exit Fullscreen' : <i className="ri-expand-diagonal-2-line"></i>}
                            </button>
                        <div className="popup-controls">
                            <button onClick={closePopup}><i className="ri-close-line"></i></button>
                        </div>
                    </div>
                    
                    <div className="popup-content">
                        <p>{selectedNote.title}</p>
                        <div className="note-body">
                            <p>{selectedNote.content}</p>
                            <div className="note-media">
                                {selectedNote.images?.map((img, index) => (
                                    <img key={index} src={img} alt={`Note ${index}`} />
                                ))}
                               
                            </div>
                        </div>
                        
                        <div className="popup-options">
                            <button onClick={copyTex}>
                                <i className="ri-file-copy-line"></i> Copy
                            </button>
                          
                        </div>
                    </div>
                </div>
            )}
         
    </>
  );
};

export default Notes;
