import { FC, ReactNode } from "react"

type PropsType = {
    children: ReactNode,
    className?: string
}

export const Container: FC<PropsType> = ({children, className}) => {
    return (
        <div className={`bg-white rounded-xl shadow-md shadow-neutral-400 ${className ? className : ''}`}>
            {children}
        </div>
    )
}