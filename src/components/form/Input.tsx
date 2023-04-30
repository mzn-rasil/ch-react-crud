import React from 'react';

type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className='form-field'>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default Input;
