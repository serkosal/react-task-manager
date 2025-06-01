import AddTask from "./components/tasks/addTask"
import TaskList from "./components/tasks/TaskList"
import Filters from "./components/Filters"
import type { IFilters } from "./components/tasks/task_filtration"

import { useState } from 'react'
import {defaultTasks} from "./components/tasks/task"

export default function MainContainer() {

    const [tasks, setTasks] = useState(defaultTasks);
    const [filters, setFilters] = useState<IFilters>({hide_done: false})

    return <div className="main-container">

        <Filters filters={filters} setFilters={setFilters}/>

        <AddTask setTasks={setTasks}/>

        <div className="task-list">
            <TaskList tasks={tasks} setTasks={setTasks} filters={filters} />
        </div>
        
    </div>
}