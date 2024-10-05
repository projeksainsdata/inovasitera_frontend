import React from 'react';
import { useField } from 'formik';

interface DateInputProps {
    placeholder: string,
    name: string;
    label: string;
    onChange?: (value: string) => void;
    className?: string;

}

const DateInput: React.FC<DateInputProps> = ({
    label,
    onChange,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        helpers.setValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="mb-4 w-full">
            <label className="mb-2 block text-sm font-medium text-black">
                {label}
            </label>
            <input
                type="date"
                {...field}
                {...props}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 transition duration-200 ease-in-out hover:border-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
            />
            {meta.touched && meta.error && (
                <div className="mt-1 text-xs text-red-500">{meta.error}</div>
            )}
        </div>
    );
};

export default DateInput;