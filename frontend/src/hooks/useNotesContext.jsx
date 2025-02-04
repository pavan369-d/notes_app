import { useContext } from "react"
import { NotesContext } from "../context/NotesContext"

export const useNotesContext = ()=>{

    const context = useContext(NotesContext)

    if(!context){
        throw new Error("useNotesContext must be  inside a context provider!")

    }

    return context
}

