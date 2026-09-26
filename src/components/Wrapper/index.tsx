// Type
type WrapperProps = {
    children: React.ReactNode
}

export function Wrapper({ children }: WrapperProps){
    return(
        <div className="w-full max-w-7xl mx-auto">
            { children }
        </div>
    )
}