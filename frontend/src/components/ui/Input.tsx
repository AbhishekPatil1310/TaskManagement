import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-base-content dark:text-base-200">{label}</label>}
      <input
        ref={ref}
        {...props}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral border border-gray-300 dark:border-neutral-focus rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
