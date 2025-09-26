import React from 'react';

export const Input = ({ 
  className = '', 
  type = 'text',
  placeholder,
  value,
  onChange,
  error = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-base';
  const errorClasses = error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-primary/50';

  return (
    <input
      type={type}
      className={`${baseClasses} ${errorClasses} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};