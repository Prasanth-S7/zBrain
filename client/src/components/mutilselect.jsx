import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const MultiSelect = ({ options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSelect = (option) => {
        if (selected.includes(option)) {
            onChange(selected.filter((item) => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div className="relative ">
            <div className="flex space-x-2 items-center">
                <div
                    className="border-2 border-black bg-white p-3 rounded-md cursor-pointer font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selected.length > 0 ? selected.join(", ") : "Select tags"}
                </div>
                <Button onClick={() => setIsOpen(!isOpen)} className="neobrutalism-button">Close</Button>
            </div>

            {isOpen && (
                <div className="absolute bottom-[90px] h-[300px] overflow-y-auto w-full bg-white border-2 border-black rounded-md mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`p-3 cursor-pointer border-b border-black last:border-b-0 hover:bg-gray-100 flex items-center gap-2 transition-colors ${selected.includes(option) ? "bg-accent text-accent-foreground" : ""
                                }`}
                            onClick={() => toggleSelect(option)}
                        >
                            <div className={`w-5 h-5 border-2 border-black flex items-center justify-center ${selected.includes(option) ? "bg-accent" : "bg-white"
                                }`}>
                                {selected.includes(option) && <Check className="w-4 h-4 text-black" />}
                            </div>
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
