import React from 'react';
import { useField } from 'formik';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  name: string;
  label: string;
  options: RadioOption[];
  onChange?: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({
  label,
  options,
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
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-black">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              {...field}
              value={option.value}
              checked={field.value === option.value}
              onChange={handleChange}
              className="size-4 border-gray-300 text-black focus:ring-black"
            />
            <span className="mx-2 text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default Radio;
