import { Link } from "react-router"

export default function Menu()
{
    return <div className="Menu">

        <h3>Planning</h3>
        <div className="menu-item"><Link to={"/calendar"}>Calendar</Link>     </div>
        <div className="menu-item"><Link to={"/scheduler"}>Scheduler</Link>    </div>

        <h3>Sorting</h3>
        <div className="menu-item"><Link to={"./?sort=recent"}>Recent</Link>   </div>
        <div className="menu-item"><Link to={"./?sort=expiring"}>Expiring</Link> </div>
        <div className="menu-item"><Link to={"./?sort=priority"}>Priority</Link> </div>
        
        
    </div>
}