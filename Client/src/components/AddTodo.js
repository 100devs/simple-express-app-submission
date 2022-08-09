import axios from "axios"
import {useState,useEffect} from "react"

export default function AddToDo({setToDo}){
    function handleChange(e){

    }
    return(
        <div>
        <form>
            <input 
                type="text"
                name="task"
                onChange={handleChange}
            />
            <textArea 
                name="task"
                onChange={handleChange}
            />
        </form>
        </div>
    )
}