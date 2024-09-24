import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimeRangeProps {
  name: string;
  label: string;
  placeholder?: string;
  onChange?: (dates: [Date | null, Date | null]) => void;
}

const DateTimeRange: React.FC<DateTimeRangeProps> = ({
  label,
  placeholder,
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (dates: [Date | null, Date | null]) => {
    helpers.setValue(dates);
    if (onChange) {
      onChange(dates);
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="mb-2 block text-sm font-medium text-black">
        {label}
      </label>
      <DatePicker
        selectsRange={true}
        startDate={field?.value[0]}
        endDate={field?.value[1]}
        onChange={handleChange}
        wrapperClassName="w-full"
        showTimeSelect
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText={placeholder || 'Select date range'}
        className="min-w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 transition duration-200 ease-in-out hover:border-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default DateTimeRange;
