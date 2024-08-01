import { useEffect, useId, useState } from "react";
import Todos from './components/Todos';

export default function App() {

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/todo');
      const tasks = await res.json();
      setTasks(tasks);
    })()
  });

  async function handleSubmit(newTask){
    await fetch(`http://localhost:3000/todo`, {
      'Content-Type': 'application/json',
      'method': 'POST',
      'body': JSON.stringify({ 'name': newTask })
    });
    setNewTask('');
  }

  async function handleDelete(id){
    await fetch(`http://localhost:3000/todo/${id}`, {
      'method': 'DELETE'
    });
  }

  function handleNewInput(taskId){
    setEdit(!edit);
    setCurrentTaskId(taskId);
  }

  async function handleEditSubmit(id, newValue){
    await fetch(`http://localhost:3000/todo/${id}`, {
      'method': 'PATCH',
      'body': JSON.stringify({ 'name': newValue })
    });
    setEdit(!edit);
  }

  return (
    <div>
      <input type="text" placeholder="Enter a new task here..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={() => handleSubmit(newTask)}>Submit</button> <br />
      <Todos tasks={tasks} handleDelete={handleDelete} handleNewInput={handleNewInput} edit={edit} handleEditSubmit={handleEditSubmit} currentTaskId={currentTaskId}/>
    </div>
  );
};