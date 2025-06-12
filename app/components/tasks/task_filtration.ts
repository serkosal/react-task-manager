/**
 * @file task_filtration.ts
 * @description This file contains logic to filtrate tasks.
 * 
 * @module components/tasks/task_filtration
*/

import { type ITask } from "./task"

/**
 * interface for task filtration, all properties are optional.
 */
export interface IFilters {
    hide_done?: boolean,
    created_from_date?: Date,
    created_to_date?: Date,
    deadline_from_date?: Date,
    deadline_to_date?: Date
}

/**
 * 
 * @param tasks - tasks to filtrate
 * @param filters - filters which will be applied.
 * @returns - filtered tasks, if no filters provided returns unmodified tasks.
 */
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