import type { Route } from "./+types/home";
import { useState } from "react";

import "./home.css"
import TaskList from "~/components/TaskList";
import AddTask from "~/components/addTask";
import { defaultTasks } from "~/components/task";

export function meta({}: Route.MetaArgs) {
return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
];
}



export default function Home() { 

    const [tasks, setTasks] = useState(defaultTasks)

    return <>
        <AddTask tasks={tasks} setTasks={setTasks}/>
        <TaskList tasks={tasks} setTasks={setTasks} />
    </>
    
    

}
