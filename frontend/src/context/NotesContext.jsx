import { act, createContext, useEffect, useReducer } from "react";

export const NotesContext = createContext();

const notesReducer = (state,action)=>{
    switch(action.type){
        case 'GET_NOTES':
            return {notes:action.payload}
            case 'UPDATE_NOTE':
                return {
                    notes: state.notes.map(note =>
                        note._id === action.payload._id ? action.payload : note
                    )
                };
            case 'SORT_NOTES':
                return {
                    notes:action.payload
                }    
            case 'DELETE_NOTE':
                return {
                    notes: state.notes.filter(note => note._id !== action.payload)
                };
            case 'LOAD_FAVORITES':
                return {...state,fav:action.payload}
        default:
            return state
    }
}

const NotesContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(notesReducer,{
        notes:[]
    })
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favoriteNotes"));
        if (savedFavorites) {
          dispatch({ type: "LOAD_FAVORITES", payload: savedFavorites });
        }
      }, []);
  
    return(
        <NotesContext.Provider value={{...state,dispatch}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesContextProvider
