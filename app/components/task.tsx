import { useState } from "react";
import "./task.css"

import type {ChangeEvent} from "react";

type TaskTag = string;

export interface ITaskProps {
    id: string,
    title: string,
    description: string,
    creator: string,
    responsibles?: number[],
    creation_date: Date,
    timedelta_seconds: number
    priority: number,
    tags: TaskTag[]
}

type CreateTaskInput = Partial<Omit<ITaskProps, 'id' | 'creation_date'>>;
export function createTask(
    {
        title = "",
        description = "",
        creator = "Anonymous",
        responsibles = [],
        timedelta_seconds = Infinity,
        priority = 5,
        tags = []
    }: CreateTaskInput = {}
): ITaskProps {
    return {
        id: crypto.randomUUID(),
        creation_date: new Date(),

        title,
        description,
        creator,
        responsibles,
        timedelta_seconds,
        priority,
        tags
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

function TaskTitle({title_init, children}: {title_init: string, children?: React.ReactNode}) {

    const [title, setTitle] = useState(title_init);

    function titleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    };

    return <div className="task-title">
        <div>
            <input type="checkbox" id="task-done-checkbox" name="task-done-checkbox" />
            <input 
                type="text" 
                className="task-title-text-input"
                placeholder="task title..."
                value={title} 
                onChange={titleOnChange} 
                onKeyDown={(e) => e.stopPropagation()}
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
    };

    return <div className="task-description">
        
        <hr/>
        <textarea 
            className="task-description-text-input"
            value={descr}
            placeholder="task description..."
            onChange={descrOnChange} 
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

export default function Task(props : ITaskProps) {

    let responsibles: React.ReactNode[];
    
    if (props.responsibles) {
        responsibles = props.responsibles.map(el => <div className="Responsible">{el}</div>)
    }

    return <div className="task">
        
        <TaskTitle title_init={props.title}>
            <TaskCreator creator={props.creator} />
            <TaskCreationDate creation_date={props.creation_date} />
        </TaskTitle>
        

        <TaskDescription description_init={props.description}/>

        <TaskRepetion timedelta_s={props.timedelta_seconds} />

        <TaskPriority priority={props.priority} />

        <div className="task-tags" >

            {props.tags.map((el, ind) => <a key={ind} href="">#{el} </a>)}

        </div>
    </div>;
}