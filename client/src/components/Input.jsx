import { forwardRef } from 'react';

export const Input = forwardRef(function Input({ label, error, className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea({ label, error, className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`input-field resize-none ${error ? 'input-error' : ''}`}
        rows={4}
        {...rest}
      />
      {error && <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
});

export const Select = forwardRef(function Select({ label, error, options = [], className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select ref={ref} className={`input-field ${error ? 'input-error' : ''}`} {...rest}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>}
    </div>
  );
});

