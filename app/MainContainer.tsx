import AddTask from "./components/tasks/addTask"
import TaskList from "./components/tasks/TaskList"
import Filters from "./components/Filters"
import type { IFilters } from "./components/tasks/task_filtration"

import { useState } from 'react'
import {defaultTasks, type ITaskProps} from "./components/tasks/task"

let init_tasks: ITaskProps[];

try {

    const stored = localStorage.getItem("tasks");

    init_tasks = stored ? 

        JSON.parse(stored, (_key, value) => {


            // Detect ISO date string and convert to Date
            if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
                return new Date(value);
            }
            return value;
        })

    : defaultTasks;

} catch (e) {
    console.error("Failed to parse tasks from localStorage", e);
    init_tasks = defaultTasks;
}

console.log(init_tasks)

export default function MainContainer() {

    const [tasks, setTasks] = useState(init_tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const [filters, setFilters] = useState<IFilters>({hide_done: false})

    return <div className="main-container">

    <Filters filters={filters} setFilters={setFilters}/>

        <AddTask setTasks={setTasks}/>
        <div className="task-list">
            <TaskList tasks={tasks} setTasks={setTasks} filters={filters} />
        </div>
        
    </div>
}