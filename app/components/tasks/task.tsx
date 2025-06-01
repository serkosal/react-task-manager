import { useState } from "react";
import "./task.css"

import type {ChangeEvent} from "react";

type TaskTag = string;

export interface ITaskProps {
    id: string,
    color: string,
    title: string,
    is_done: boolean,
    description: string,
    creator: string,
    responsibles?: number[],
    creation_date: Date,
    deadline: Date,
    timedelta_seconds: number
    priority: number,
    tags: TaskTag[]
}

const TASK_COLORS = [
    '#356ca6', '#35a673', '#7ca635', "#6635a6",
    '#823b71', '#3f4d4b', '#b57131', '#a84343'
]

type CreateTaskInput = Partial<Omit<ITaskProps, 'id' | 'creation_date'>>;
export function createTask(
    {
        title = "",
        description = "",
        priority = 5,
        deadline = (new Date(Date.now() + 24*3600*1000)),

        creator = "Anonymous",
        is_done = false,
        responsibles = [],
        timedelta_seconds = Infinity,
        tags = [],
        color = TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)]
    }: CreateTaskInput = {}
): ITaskProps {
    return {
        id: crypto.randomUUID(),        

        title,
        description,
        priority,
        deadline,
        is_done,

        creator,
        creation_date: new Date(),
        responsibles,

        timedelta_seconds,
        tags,
        color,
    };
}

export const defaultTasks: ITaskProps[] = [
    createTask({
        title: "Buy milk", 
        description: "Go to the shop and buy 1L of ultra-pasteurized milk."
    }),
    createTask({
        title: "Go to the cinema", 
        description: "Go to the cinema.",
        priority: 2
    }),
    createTask({
        title: "Water the flowers", 
        timedelta_seconds: 86400
    }),

]

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

function findTask(id: string, tasks: ITaskProps[]): number {
    return tasks.findIndex(item => item.id === id);
}

function TaskTitle({id, tasks, children, setTasks}: {
    id: string,
    tasks: ITaskProps[],
    children?: React.ReactNode, 
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
}) {

    const this_task = tasks[findTask(id, tasks)];

    function titleOnChange(ev: ChangeEvent<HTMLInputElement>) {
        console.log(ev.target.value);
        setTasks(prev => {
            const index = findTask(id, prev);
            console.log('Updating task at index:', index);
            const updatedTask = {...prev[index], title: ev.target.value}
            const updatedTasks = [...prev];
            updatedTasks[index] = updatedTask;

            return [...updatedTasks];
        })

        
    };

    function checkBoxOnChange(ev: ChangeEvent<HTMLInputElement>) {
        const index = findTask(id, tasks);
        const updatedTask = {...this_task, is_done: ev.target.checked}
        const new_tasks = [...tasks];
        new_tasks[index] = updatedTask;
        setTasks(new_tasks);
    }

    return <div className="task-title">
        <div>
            <input 
                type="checkbox" 
                id={`task-done-checkbox-${id}`}
                name={`task-done-checkbox-${id}`}
                value={`task-done-checkbox-${id}`}
                checked={this_task.is_done}
                onChange={checkBoxOnChange}
            />
            <input 
                type="text" 
                className="task-title-text-input"
                placeholder="task title..."
                value={this_task.title} 
                onChange={titleOnChange} 
                onKeyDown={(e) => e.stopPropagation()} // не работает пробел без него
            />
        </div>
        
        <div className="task-title-children">
            {children}
        </div>
    </div>
}

function TaskDescription({description_init} : {description_init: string}) {

    const [descr, setDescr] = useState(description_init);

    function descrOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setDescr(event.target.value);

        if (event.target.scrollHeight < 150)
        {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        }  
    };

    return <div className="task-description">
        
        <hr/>
        <textarea 
            className="task-description-text-input"
            value={descr}
            placeholder="task description..."
            onInput={descrOnChange} 
            onKeyDown={(e) => e.stopPropagation()}
        />
        <hr/>
        
    </div>
}

function TaskCreator({creator} : {creator: string}) {
    return <div className="task-creator">
        Created by: <a href="">{creator}</a>
    </div>
}

function TaskCreationDate({creation_date} : {creation_date: Date}) {
    return  <div className="task-creation-date">
        {creation_date.toLocaleString(
            'en-GB', DATETIME_FORMAT
        )}
    </div>
}

function TaskDeadlineDate({deadline} : {deadline: Date}) {
    return  <div className="task-deadline-date">
        {deadline.toLocaleString(
            'en-GB', DATETIME_FORMAT
        )}
    </div>
}

function TaskPriority({priority}: {priority: number}) {
    return <div className="task-priority">
        priority {priority}
    </div>
}

function TaskRepetion({timedelta_s}: {timedelta_s: number}) {

    if (timedelta_s === +Infinity) return;

    const timedelta = new Date(timedelta_s);

    return <div className="task-repetition">
        repeat: {timedelta.toLocaleString(
            'en-GB', DATETIME_FORMAT
        )};
    </div>
}

export default function Task(props : {
    id: string, 
    tasks: ITaskProps[], 
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
}) {

    const this_task = props.tasks[findTask(props.id, props.tasks)];

    // let responsibles: React.ReactNode[];
    
    // if (props.responsibles) {
    //     responsibles = props.responsibles.map(el => <div className="Responsible">{el}</div>)
    // }

    const style = {
        backgroundColor: this_task.color
    }

    return <div className="task" style={style}>
        
        <TaskTitle {...props}>
            <TaskCreator creator={this_task.creator} />
            <TaskCreationDate creation_date={this_task.creation_date} />
            <TaskDeadlineDate deadline={this_task.deadline} />
        </TaskTitle>
        

        <TaskDescription description_init={this_task.description}/>

        <TaskRepetion timedelta_s={this_task.timedelta_seconds} />

        <TaskPriority priority={this_task.priority} />

        <div className="task-tags" >

            {this_task.tags.map((el, ind) => <a key={ind} href="">#{el} </a>)}

        </div>
    </div>;
}