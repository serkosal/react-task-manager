/**
 * @file MainContainer.tsx
 * @description This file contains MainContainer component
 *  
 * 
 * @module components/MainContainer
*/

export default function MainContainer(
    {children} : {children: React.ReactNode}
    ) {

    return <div className="main-container">
        {children}
    </div>
}