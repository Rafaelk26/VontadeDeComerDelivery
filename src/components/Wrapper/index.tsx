// Type
type WrapperProps = {
    children: React.ReactNode
}

export function Wrapper({ children }: WrapperProps){
    return(
        <div className="w-full max-w-full min-[1920px]:max-w-7xl min-[1920px]:mx-auto">
            { children }
        </div>
    )
}