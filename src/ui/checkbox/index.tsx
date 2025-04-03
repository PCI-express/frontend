type Props = {
    name: string,
    type: 'checkbox'| 'radio',
    value: boolean,
    handleChange: (value: boolean) => void,
}

export const Checkbox = ({name, type, value, handleChange}: Props) => {
    const handleCheckboxChange = () => {
        handleChange(!value);
    };

    const classes = 'relative outline-0 my-auto border-2 border-solid border-neutral-200 p-2 ml-6 rounded w-4 h-4 transition-color duration-300 focus:border-indigo-400';
    return (
        <div className="mb-5">
            <label className="flex justify-self-end">
                <span className="block">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
                <input
                    type={type}
                    value={String(value)}
                    onChange={handleCheckboxChange}
                    className='hidden'
                />
                <div className={classes}>
                    {value && (
                        <svg
                            className="w-4 h-4 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    )}
                </div>
            </label>
        </div>
    )
}