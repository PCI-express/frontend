import { ChangeEvent } from "react";

type Props = {
    name: string,
    type: 'text' | 'number' | 'password' | 'email'  | 'tel' | 'date' | 'datetime-local',
    value: string | '',
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    pattern? : string,
    className? : string,
    placeholder?: string
}

export const Input = ({name, type, value, handleChange, pattern, className, placeholder}: Props) => {
    const classes = 'outline-0 border-2 border-solid border-neutral-200 rounded-md px-4 py-2 transition-colors duration-300 block focus:border-indigo-400 w-full'
    return (
        <div className={"mb-5 " + className}>
            <label className="relative block">
                <span className="absolute left-0 top-0 -translate-y-3 translate-x-3 bg-white px-1 text-neutral-600">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    className={classes}
                    autoComplete="off"
                    pattern={pattern}
                    placeholder={placeholder}
                />
            </label>
        </div>
        
    )
}