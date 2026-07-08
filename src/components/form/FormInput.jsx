import React from 'react';

const FormInput = ({ label, name, type, value, onChange, placeholder, disabled }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#06F8D0] focus:ring-1 focus:ring-[#06F8D0]/50 transition-all duration-200"
      />
    </div>
  );
};

export default FormInput;
