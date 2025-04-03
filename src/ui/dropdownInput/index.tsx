import { FC, useEffect, useRef, useState } from "react";

type DropdownInputProps = {
    options: string[];
    onChange: (value: string) => void;
    name: string;
    className?: string;
    selected?: string
}

export const DropdownInput: FC<DropdownInputProps> = ({ options, onChange, name, className, selected }) => {
    const [selectedValue, setSelectedValue] = useState(selected);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLInputElement>(null);

    const handleSelectValue = (value: string) => {
        setSelectedValue(value);
        onChange(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSelectedValue(selected);
    }, [selected]);

    return (
        <div className={"relative " + className} ref={dropdownRef}>
            <span className="absolute left-0 top-0 -translate-y-3 translate-x-3 bg-white px-1 text-neutral-600">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
            <button type="button" onClick={toggleDropdown} className={`w-full bg-white border-2 ${ isOpen ? 'border-indigo-400': 'border-neutral-200'} rounded-md px-4 py-2 justify-between flex items-center transition-colors duration-300`}>
                <span className={`${!selectedValue ? 'text-neutral-400' : ''} w-full`}>
                    {selectedValue || '---- Select an option ----'}
                </span>
                
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border-2 border-neutral-200 rounded-md shadow-xl">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelectValue(option)}
                            className="w-full text-left p-2 hover:bg-gray-100"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}