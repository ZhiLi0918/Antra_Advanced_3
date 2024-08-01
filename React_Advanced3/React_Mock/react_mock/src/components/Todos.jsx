import { useState } from "react"

export default function Todos({tasks, handleDelete, handleNewInput, edit, handleEditSubmit, currentTaskId}){

  const [inputValue, setInputValue] = useState('');

  function addNewTask(e){
    setInputValue(e.target.value);
  }

  return (
      <ul>
        { tasks.map(task => (
              <div key={task.id} style={{ 'display': 'flex', 'listStyle': 'none', 'gap': '10px' }}>
                <li>{task.name}</li>
                <button onClick={() => handleDelete(task.id)}>Delete</button> 
                <button onClick={() => handleNewInput(task.id)}>Edit</button>
                { edit && currentTaskId === task.id && (<><input type="text" onChange={addNewTask}/> <button onClick={() => handleEditSubmit(task.id, inputValue)}>Submit</button></>) }
              </div>  
        )) }
    </ul>
  )
}