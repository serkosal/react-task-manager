import AddTask from "./components/tasks/addTask"
import TaskList from "./components/tasks/TaskList"
import Filters from "./components/Filters"
import type { IFilters } from "./components/tasks/task_filtration"

import { useState } from 'react'
import {defaultTasks, type ITaskProps} from "./components/tasks/task"

let init_tasks: ITaskProps[];

try {
  const stored = localStorage.getItem("tasks");
  init_tasks = stored ? JSON.parse(stored) : defaultTasks;
} catch (e) {
  console.error("Failed to parse tasks from localStorage", e);
  init_tasks = defaultTasks;
}

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