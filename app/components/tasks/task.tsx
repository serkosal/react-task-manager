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

function hexToRGBA(hex: string, alpha: number): string {
  // Remove the "#" if present
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function TaskHeader({id, tasks, children, setTasks}: {
    id: string,
    tasks: ITaskProps[],
    children?: React.ReactNode, 
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
}) {

    const this_task = tasks[findTask(id, tasks)];

    function titleOnChange(ev: ChangeEvent<HTMLInputElement>) {
        setTasks(prev => {
            const index = findTask(id, prev);
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

    const style = {
        backgroundColor: hexToRGBA(this_task.color, 0.6),
        backdropFilter: "1px"
    }

    return <div className="task-header" style={style}>
        <div className='task-header-main'>
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
                
                // space don't work because of 
                // dndkit captures control
                onKeyDown={(e) => e.stopPropagation()}  
            />
        </div>
        
        <div className="task-header-children">
            {children}
        </div>
    </div>
}

// function TaskBody({id, tasks, setTasks}: {
//     id: string,
//     tasks: ITaskProps[],
//     setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
//     }) {}

function TaskDescription({id, tasks, setTasks}: {
    id: string,
    tasks: ITaskProps[],
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

    const this_task = tasks[findTask(id, tasks)];

    function descrOnChange(event: ChangeEvent<HTMLTextAreaElement>) {

        setTasks( prev => {

            const index = findTask(id, prev);
            const updatedTask: ITaskProps = {...prev[index], description: event.target.value}
            const updatedTasks = [...prev];
            updatedTasks[index] = updatedTask;

            return [...updatedTasks];
        });

        if (event.target.scrollHeight < 150)
        {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        }  
    };

    return <div className="task-description">
        

        <textarea 
            className="task-description-text-input"
            value={this_task.description}
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

function TaskColorPicker({id, tasks, setTasks}: {
    id: string,
    tasks: ITaskProps[],
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

        const this_task = tasks[findTask(id, tasks)];

        return <input 
            type="color"
            // id={`task-color-picker-${id}`}
            className="task-color-picker"
            name='task-color-picker'
            value={this_task.color}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {

                setTasks((prev) => {
                    const index = findTask(id, prev);
                    const updatedTask = {...prev[index], color: event.target.value}
                    const updatedTasks = [...prev];
                    updatedTasks[index] = updatedTask;

                    return updatedTasks;
                })
            }}
        />
}

function TaskCreationDate({creation_date} : {creation_date: Date}) {
    return  <div className="task-creation-date">
        {creation_date.toLocaleString(
            'en-GB', DATETIME_FORMAT
        )}
    </div>
}

function DateTodateTimeLocalNow(date: Date): string {
    return  new Date(
        date.getTime() - date.getTimezoneOffset() * 60_000
        ).toISOString().slice(0, 16);
}

function TaskDeadlineDate({id, tasks, setTasks}: {
    id: string,
    tasks: ITaskProps[],
    setTasks: React.Dispatch<React.SetStateAction<ITaskProps[]>>
    }) {

    const this_task = tasks[findTask(id, tasks)];

    return <input 
        type="datetime-local" 
        className="task-deadline-date"
        value={DateTodateTimeLocalNow(this_task.deadline)}
        onChange={(event) => {
            try {
                const new_deadline = new Date(event.target.value);

                setTasks( prev => {
                    const index = findTask(id, prev);
                    const updatedTask: ITaskProps = {...prev[index], deadline: new_deadline }
                    const updatedTasks = [...prev];
                    updatedTasks[index] = updatedTask;

                    return updatedTasks;
                })
            }
            catch (e: unknown) {
                console.log(e);
            }
            
        }}
    />
}

function TaskFooter({children}: {
    children: React.ReactNode,
    }) {

    return <div className="task-footer">{children}</div>
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

    return <div className="task">
        
        <TaskHeader {...props}>
            <TaskCreator creator={this_task.creator} />
            <TaskCreationDate creation_date={this_task.creation_date} />
            <TaskDeadlineDate {...props} />
            <TaskColorPicker {...props} />
        </TaskHeader>
        

        <TaskDescription {...props}/>

        <TaskFooter {...props}>
            <TaskRepetion timedelta_s={this_task.timedelta_seconds} />
            <TaskPriority priority={this_task.priority} />
            <div className="task-tags" >
                {this_task.tags.map((el, ind) => <a key={ind} href="">#{el} </a>)}
            </div>
        </TaskFooter>
        
    </div>;
}