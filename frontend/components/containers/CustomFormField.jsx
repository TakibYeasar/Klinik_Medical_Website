"use client";

import React from 'react';
import { useController } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import 'react-datepicker/dist/react-datepicker.css';

export const FormFieldType = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  PHONE_INPUT: 'phoneInput',
  CHECKBOX: 'checkbox',
  DATE_PICKER: 'datePicker',
  SELECT: 'select',
  SKELETON: 'skeleton',
};

const RenderInput = ({ field, props }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-md">
          {props.iconSrc && (
            <img
              src={props.iconSrc}
              alt={props.iconAlt || 'icon'}
              className="ml-2 h-6 w-6"
            />
          )}
          <input
            placeholder={props.placeholder}
            {...field}
            className="bg-transparent border-0 outline-none flex-1 px-2 py-1"
          />
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <textarea
          placeholder={props.placeholder}
          {...field}
          className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full"
          disabled={props.disabled}
        />
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="US"
          placeholder={props.placeholder}
          international
          withCountryCallingCode
          value={field.value || ''}
          onChange={field.onChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id={props.name}
            checked={field.value || false}
            onChange={field.onChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor={props.name} className="text-gray-700">
            {props.label}
          </label>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center border border-gray-300 bg-gray-100 rounded-md">
          <img
            src="/assets/icons/calendar.svg"
            alt="calendar icon"
            className="ml-2 h-6 w-6"
          />
          <ReactDatePicker
            showTimeSelect={props.showTimeSelect || false}
            selected={field.value || null}
            onChange={(date) => field.onChange(date)}
            timeInputLabel="Time:"
            dateFormat={props.dateFormat || 'MM/dd/yyyy'}
            className="bg-transparent border-0 outline-none flex-1 px-2 py-1"
          />
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <div className="relative">
          <select
            {...field}
            className="block w-full bg-gray-100 border border-gray-300 rounded-md p-2"
          >
            {props.children}
          </select>
        </div>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props) => {
  const { control, name, label } = props;
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-col mb-4">
      {props.fieldType !== FormFieldType.CHECKBOX && label && (
        <label className="text-gray-700 mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      <RenderInput field={field} props={props} />
      {/* You can add validation error messages here if needed */}
    </div>
  );
};

export default CustomFormField;
