import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, ...props }, ref) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-base-content dark:text-base-200">{label}</label>}
      <select
        ref={ref}
        {...props}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm rounded-md dark:bg-neutral dark:border-neutral-focus dark:text-base-100"
      >
        {props.children}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
