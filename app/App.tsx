import { useState } from 'react'

import {defaultTasks} from "./components/task"
import AddTask from "./components/addTask"
import TaskList from "./components/TaskList"

import './app.css'

function App() {
const [tasks, setTasks] = useState(defaultTasks)

return (
    <>      
        <AddTask setTasks={setTasks}/>
        <TaskList tasks={tasks} setTasks={setTasks} />
    </>
)
}

export default App
