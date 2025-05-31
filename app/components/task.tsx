import "./task.css"

type TaskTag = string;

export interface ITaskProps {
    id: number,
    title: string,
    description: string,
    creator: string,
    responsibles?: number[],
    creation_date: Date,
    timedelta_seconds: number
    priority: number,
    tags: TaskTag[]
}

export const defaultTasks: ITaskProps[] = [
    {
        id: 1,
        title: "Buy milk",
        description: "Go to the shop and buy 1L of ultra-pasteurized milk.",
        creator: "Sergey",
        creation_date: new Date(),
        timedelta_seconds: +Infinity,
        priority: 5,
        tags: ["Routine", "Shopping"]
    },
    {
        id: 2,
        title: "Go to the cinema",
        description: "Go to the cinema.",
        creator: "Sergey",
        creation_date: new Date(),
        timedelta_seconds: +Infinity,
        priority: 2,
        tags: ["Routine", "Entertainments"]
    },
    {
        id: 3,
        title: "Water the flowers",
        description: "",
        creator: "Sergey",
        creation_date: new Date(),
        timedelta_seconds: 86400,
        priority: 6,
        tags: ["Routine"]
    },

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

function TaskTitle({title, children}: {title: string, children: React.ReactNode}) {
    return <div className="task-title">
        <div>
            <input type="checkbox" id="task-done-checkbox" name="task-done-checkbox" />
            <strong className="">
                {title}
            </strong>
        </div>
        
        <div className="task-title-children">
            {children}
        </div>
    </div>
}

function TaskDescription({description} : {description: string}) {
    return <div className="task-description">
        
        <hr/>
        {description}
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
        
        <TaskTitle title={props.title}>
            <TaskCreator creator={props.creator} />
            <TaskCreationDate creation_date={props.creation_date} />
        </TaskTitle>
        

        <TaskDescription description={props.description}/>

        <TaskRepetion timedelta_s={props.timedelta_seconds} />

        <TaskPriority priority={props.priority} />

        <div className="task-tags" >

            {props.tags.map(el => <a href="">#{el} </a>)}

        </div>
    </div>;
}