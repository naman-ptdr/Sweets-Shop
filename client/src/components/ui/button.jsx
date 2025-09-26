import React from 'react';

export const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default',
  onClick, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
    secondary: 'bg-white text-primary border border-gray-200 hover:bg-gray-50 focus:ring-primary'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    default: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};