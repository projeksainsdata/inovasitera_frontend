import React from 'react';
import { useField } from 'formik';

interface CheckboxProps {
  name: string;
  label: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    helpers.setValue(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="mb-4">
      <label className="flex cursor-pointer items-center">
        <input
          type="checkbox"
          {...field}
          onChange={handleChange}
          className="size-5 rounded border-gray-300 text-black transition duration-200 ease-in-out focus:ring-black"
        />
        <span className="ml-2 text-sm text-gray-700">{label}</span>
      </label>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default Checkbox;
