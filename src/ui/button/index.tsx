type Props = {
    name: string,
    type: 'button' | 'submit',
    className?: string,
    inversion?: boolean,
    onClick?: () => void
}
export const Button = ({name, type, className, inversion = false, onClick}: Props) => {
    

    return (
        <div className={className || ''}>
            <input 
                type={type} 
                value={name}
                className={(inversion ? "bg-white text-indigo-400 hover:text-indigo-700 hover:border-indigo-500 " : "bg-indigo-400 text-white hover:bg-indigo-500 hover:border-indigo-500") + 
                "border-indigo-400 border-2 border-solid rounded-md w-full py-3 text-lg cursor-pointer  transition-color duration-300"}
                onClick={onClick}
            />
        </div>
    )
}