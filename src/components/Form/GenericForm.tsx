/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Suspense } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const GenericInput = React.lazy(() => import('@/components/Form/GenericInput'));
const TagInput = React.lazy(() => import('@/components/Form/TagInput'));
const DragDropFileInput = React.lazy(() => import('@/components/Form/DragDropFileInput'));
const Checkbox = React.lazy(() => import('@/components/Form/CheckBoxInput'));
const DateTimeRange = React.lazy(() => import('@/components/Form/DateTimeRangeInput'));
const Radio = React.lazy(() => import('@/components/Form/RadioInput'));
const Date = React.lazy(() => import('@/components/Form/DateInput'));
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'tags' | 'file' | 'checkbox' | 'dateTimeRange' | 'radio' | 'number' | 'textarea' | 'currency' | 'markdown' | 'multiselect' | 'url' | 'date';
  options?: { value: string; label: string }[];
  validation?: Yup.AnySchema;
  placeholder?: string;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
}

interface GenericFormProps {
  fields: FieldConfig[];
  onSubmit: (values: { [key: string]: any }, formikHelpers: FormikHelpers<{ [key: string]: any }>) => void | Promise<void>;
  initialValues?: { [key: string]: any };
  onChange?: (fieldName: string, value: any) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, onSubmit, initialValues = {}, onChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as { [key: string]: Yup.AnySchema })
  );

  const defaultInitialValues = fields.reduce((acc, field) => {
    acc[field.name] = initialValues[field.name] || '';
    return acc;
  }, {} as { [key: string]: any });
  return (
    <Formik
      initialValues={defaultInitialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        setIsSubmitting(true);
        await onSubmit(values, formikHelpers);
        setIsSubmitting(false);
      }}
    >
      <Form>
        <Suspense fallback={<div>Loading...</div>}>
          {fields.map((field, index) => {
            const commonProps = {
              name: field.name,
              label: field.label,
              placeholder: field.placeholder ?? '',
              onChange: onChange ? (value: unknown) => onChange(field.name, value) : undefined,
            };

            switch (field.type) {
              case 'select':
                return <GenericInput key={`select-${index}`} {...commonProps} type="select" options={field.options} />;
              case 'tags':
                return <TagInput key={`tags-${index}`} {...commonProps} />;
              case 'file':
                return <DragDropFileInput key={`file-${index}`} {...commonProps} multiple={field.multiple} accept={field.accept} />;
              case 'checkbox':
                return <Checkbox key={`checkbox-${index}`} {...commonProps} />;
              case 'dateTimeRange':
                return <DateTimeRange key={`dateTimeRange-${index}`} {...commonProps} />;
              case 'radio':
                return <Radio key={`radio-${index}`} {...commonProps} options={field.options || []} />;
              case 'date':
                return <Date key={`date-${index}`} {...commonProps} />;
              default:
                return <GenericInput key={`default-${index}`} {...commonProps} type={field.type as 'number' | 'text' | 'email' | 'password' | 'textarea' | 'currency' | 'multiselect' | 'url'} />;
            }
          })}
        </Suspense>
        <button type="submit" disabled={isSubmitting} className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? <span className="flex items-center justify-center"><svg className="ml-1 mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Submitting...</span> : 'Submit'}
        </button>
      </Form>
    </Formik>
  );
};

export default GenericForm;
