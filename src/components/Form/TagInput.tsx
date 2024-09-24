import React, { useState, useEffect } from 'react';
import { useField } from 'formik';

interface TagInputProps {
  name: string;
  placeholder?: string;
  initialValue?: string[];
  onChange?: (value: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  placeholder,
  initialValue = [''],
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (initialValue) {
      helpers.setValue(initialValue);
    }
  }, [helpers, initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        helpers.setValue([...field.value, inputValue.trim()]);
        setInputValue('');
        if (onChange) {
          onChange(inputValue.trim());
        }
      }
    }

    if (e.key === 'Backspace' && inputValue === '') {
      const values = field.value.slice(0, field.value.length - 1);
      helpers.setValue(values);
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-2 flex flex-wrap gap-2">
        {field.value.map((tag: string, index: number) => (
          <span
            key={index}
            className="rounded-full bg-black px-2 py-1 text-sm text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 transition duration-200 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
        placeholder={placeholder || 'Type and press Enter to add tags'}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default TagInput;
