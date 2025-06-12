import { type ITask } from "./task"

export interface IFilters {
    hide_done?: boolean,
    created_from_date?: Date,
    created_to_date?: Date,
    deadline_from_date?: Date,
    deadline_to_date?: Date
}

export function filter_tasks(tasks: ITask[], filters?: IFilters) {

    if (!filters) return tasks;

    let res = tasks;

    if (filters.hide_done) 
        res = res.filter(t => !t.is_done)

    if (filters.created_from_date !== undefined)
        res = res.filter(t => filters.created_from_date! <= t.creation_date);

    if (filters.created_to_date !== undefined)
        res = res.filter(t => filters.created_to_date! >= t.creation_date);



    if (filters.deadline_from_date !== undefined)
        res = res.filter(t => filters.deadline_from_date! <= t.creation_date);

    if (filters.deadline_to_date !== undefined)
        res = res.filter(t => filters.deadline_to_date! >= t.creation_date);

    return res;
}