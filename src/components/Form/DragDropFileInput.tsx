import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'formik';


interface DragDropFileInputProps {
  name: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File | File[] | null | undefined) => void;
}

const DragDropFileInput: React.FC<DragDropFileInputProps> = ({
  onChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [preview, setPreview] = useState<string | null>(null);

  // check if has default value and is string or File

  useEffect(() => {
    if (field.value && typeof field.value === 'string') {
      setPreview(field.value);
    }
  }, [field.value]);

  const handleFileSelection = useCallback(
    (file: File) => {
      helpers.setValue(file);
      if (onChange) {
        onChange(file);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [helpers, onChange],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleFileSelection(files[0]);
      }
    },
    [handleFileSelection],
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    helpers.setValue(null);
    setPreview(null);
    if (onChange) {
      onChange(null);
    }
  };

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = props.accept || '';
    input.multiple = props.multiple || false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelection(file);
      }
    };
    input.click();
  }, [props.accept, props.multiple, handleFileSelection]);

  return (
    <>
      <label
        htmlFor={props.name}
        className="mb-2 block text-sm font-medium text-black"
      >
        {props.name}
      </label>
      <section className='flex justify-center'>
      <div
        className="w-fit cursor-pointer rounded-lg border-2 border-dashed border-black bg-white p-4 text-center transition duration-200 ease-in-out hover:bg-gray-50"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleClick}
      >
        {preview ? (
          <div className="relative w-52 h-52">
            <img
              src={preview}
              alt="Preview"
              className="absolute left-0 top-0 size-full rounded-md object-cover"
              style={{
                objectFit: 'cover',
              }}
            />
            <button
              onClick={handleDelete}
              className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-red-600 text-white transition duration-200 ease-in-out hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <label className="mb-2 block text-lg font-medium text-black">
              Drag and drop a file here, or click to select a file
            </label>
            <div className="text-gray-500 transition duration-200 ease-in-out hover:text-black">
              Click or drag file to this area to upload
            </div>
          </>
        )}
        {meta.touched && meta.error ? (
          <div className="mt-1 text-sm text-red-500">{meta.error}</div>
        ) : null}
      </div>
      </section>
    </>
  );
};

export default DragDropFileInput;
