import React from 'react';

type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  error = '',
}) => {
  return (
    <div className='form-field'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <label htmlFor={name}>{label}</label>
        {error ? (
          <p style={{ fontSize: '0.8rem', color: 'red' }}>({error})</p>
        ) : (
          ''
        )}
      </div>
      {/* <br /> */}
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
