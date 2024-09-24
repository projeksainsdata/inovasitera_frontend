import React from 'react';
import { useField } from 'formik';

interface Option {
  value: string;
  label: string;
}

interface GenericInputProps {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'textarea'
    | 'number'
    | 'currency'
    | 'multiselect'
    | 'url'
    | 'file';
  options?: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (value: any) => void;
  accept?: string;
  multiple?: boolean;
}

const GenericInput: React.FC<GenericInputProps> = ({
  label,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > | null,
  ) => {
    let value: any;

    if (e instanceof Date) {
      value = e;
    } else if (e && 'target' in e) {
      if (props.type === 'multiselect') {
        const options = e.target as HTMLSelectElement;
        value = Array.from(options.selectedOptions, (option) => option.value);
      } else {
        value = e.target.value;
      }
    } else {
      value = e;
    }

    if (props.type === 'currency') {
      value = value.replace(/[^\d]/g, '');
    }

    helpers.setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const formatIDR = (value: string) => {
    const number = parseInt(value, 10);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const inputClass = `w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#134158] focus:border-transparent hover:border-[#134158] transition duration-200 ease-in-out ${props.className || ''}`;

  const renderInput = () => {
    switch (props.type) {
      case 'select':
        return (
          <select {...field} onChange={handleChange} className={inputClass}>
            <option value="">Select an option</option>
            {props.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'multiselect':
        return (
          <select
            {...field}
            multiple
            onChange={handleChange}
            className={inputClass}
            value={Array.isArray(field.value) ? field.value : []}
          >
            {props.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            {...field}
            onChange={handleChange}
            className={inputClass}
            placeholder={props.placeholder || `Enter ${label}`}
          />
        );
      case 'currency':
        return (
          <input
            {...field}
            type="text"
            onChange={handleChange}
            className={inputClass}
            value={field.value ? formatIDR(field.value) : ''}
            placeholder={props.placeholder || 'Enter amount'}
          />
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files
                ? event.currentTarget.files[0]
                : null;
              helpers.setValue(file);
              if (onChange) onChange(file);
            }}
            accept={props.accept}
            multiple={props.multiple}
            className={inputClass}
          />
        );
      default:
        return (
          <input
            {...field}
            type={props.type}
            onChange={handleChange}
            className={inputClass}
            placeholder={props.placeholder || `Enter ${label}`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className="mb-2 block text-sm font-medium text-black"
      >
        {label}
      </label>
      {renderInput()}
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default GenericInput;
