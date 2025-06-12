/**
 * @file Filters.tsx
 * @description This file contains Filters component
 *  
 * 
 * @module components/Filters
*/

import type { ChangeEvent } from "react";

import type { IFilters } from "./tasks/task_filtration";

export default function Filters(
    {filters, setFilters} : {
        filters: IFilters, 
        setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    }) 
{

    function onChange(ev: ChangeEvent<HTMLInputElement>) {
        setFilters(prev => {
            return {...prev, hide_done: ev.target.checked}
        })
    }

    return <div className="Filters">
        <h2>Filters</h2>
        <label htmlFor="filters-hide-done">Hide done tasks</label>

        <input 
            type="checkbox" 
            id="filters-hide-done" 
            className="filters-hide-done"
            checked={filters.hide_done}
            onChange={onChange}
        />
    </div>

}