/**
 * @file Menu.tsx
 * @description This file contains Menu component
 *  
 * 
 * @module components/Menu
*/

import { Link, useLocation } from "react-router"

export default function Menu()
{
    const location = useLocation();

    console.log(location);

    let planning_links: React.ReactNode[] = [];

    if (location.pathname !== "/") planning_links.push(
        <div className="menu-item"><Link to={"/"}>Back</Link>     </div>
    );

    if (location.pathname !== "/calendar") planning_links.push(
        <div className="menu-item"><Link to={"/calendar"}>calendar</Link>     </div>
    );

    if (location.pathname !== "/scheduler") planning_links.push(
        <div className="menu-item"><Link to={"/scheduler"}>scheduler</Link>     </div>
    );

    return <div className="Menu">

        <h3>Planning</h3>
        {planning_links}
        

        <h3>Sorting</h3>
        <div className="menu-item"><Link to={"./?sort=recent"}>Recent</Link>   </div>
        <div className="menu-item"><Link to={"./?sort=expiring"}>Expiring</Link> </div>
        <div className="menu-item"><Link to={"./?sort=priority"}>Priority</Link> </div>
        
        
    </div>
}