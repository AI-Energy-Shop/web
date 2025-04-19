import React from 'react';

interface InputGroupProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  inputType: 'TEXT' | 'TEXTAREA' | 'NUMBER' | 'TEL' | 'EMAIL';
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
  return (
    <div className={`input-group flex flex-col gap-1 ${props.className}`}>
      <label htmlFor={props.name} id={props.name} className="text-white">
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
      </label>

      {props.inputType === 'TEXT' && (
        <input
          type="text"
          className="text-sm p-2 rounded-sm overflow-hidden w-full"
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
        />
      )}

      {props.inputType === 'TEXTAREA' && (
        <textarea className="w-full min-h-[200px] rounded-sm overflow-hidden" name={props.name} />
      )}

      {props.inputType === 'NUMBER' && (
        <input
          type="number"
          className="text-sm p-2 rounded-sm overflow-hidden w-full"
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
        />
      )}

      {props.inputType === 'EMAIL' && (
        <input
          type="email"
          className="text-sm p-2 rounded-sm overflow-hidden w-full"
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
        />
      )}

      {props.inputType === 'TEL' && (
        <input
          type="tel"
          className="text-sm p-2 rounded-sm overflow-hidden w-full"
          placeholder={props.placeholder}
          name={props.name}
          required={props.required}
        />
      )}
    </div>
  );
};

export default InputGroup;
