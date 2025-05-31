import AddTask from "./addTask"
import TaskList from "./TaskList"
import Filters from "./Filters"

import { useState } from 'react'
import {defaultTasks} from "./task"

export default function MainContainer() {

    const [tasks, setTasks] = useState(defaultTasks);

    return <div className="main-container">

        <Filters/>

        <AddTask setTasks={setTasks}/>

        <div className="task-list">
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
        
    </div>
}