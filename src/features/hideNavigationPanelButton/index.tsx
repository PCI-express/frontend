import { FC } from "react"
import { Container } from "../../ui"

interface Props {
    state: boolean
    setState: (value: boolean) => void
}

export const HideNavigationPanelButton: FC<Props> = ({state, setState}) => {
    const handleClick = (value: boolean) => {
        setState(!value)
    }

    return (
        <Container className={`size-[50px] transition-colors duration-300 hover:bg-neutral-100 absolute top-5 -right-15`}>
            <button 
                onClick={() => handleClick(state)}
                className="w-full h-full"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`m-auto text-indigo-400 h-6 w-6 transition-transform duration-300 ${state ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </Container> 
    )
}