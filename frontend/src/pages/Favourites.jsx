
import React, { useEffect, useState } from 'react'

const Favourites = ({copyText}) => {
  const [fav,setFav] = useState();
   const [changeTitle, setChangeTitle] = useState({});
    const [noteImages, setNoteImages] = useState({});
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('fav'));
    setFav(data);
    // console.log(fav)
  },[])
  return (
    <div>
     {fav && fav.map((note)=>  <div key={note._id} className="note" >
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
              <button onClick={copyText}>
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

             
            </div>
          </div>)}
    </div>
  )
}

export default Favourites
