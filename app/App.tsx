import MainContainer from './components/MainContainer'
import Menu from './components/Menu'

import { TasksDispatchContext, tasksReducer, from_local_storage, TasksContext } from './components/tasks/TaskList';

import { useReducer } from 'react'


function App({children} : {children?: React.ReactNode}) {

    const [tasks, dispatchTasks] = useReducer(tasksReducer, from_local_storage());

    return (

        <div className='App'>
            <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatchTasks}>
                <Menu/>
                <MainContainer>
                    {children}
                </MainContainer>
            </TasksDispatchContext>
            </TasksContext>
        </div>
    )
}

export default App
