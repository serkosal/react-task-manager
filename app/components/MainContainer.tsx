export default function MainContainer(
    {children} : {children: React.ReactNode}
    ) {

    return <div className="main-container">
        {children}
    </div>
}