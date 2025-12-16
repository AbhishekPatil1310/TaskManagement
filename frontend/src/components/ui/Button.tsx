import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: 'bg-primary text-primary-content hover:bg-primary-hover focus:ring-primary-focus',
      secondary: 'bg-secondary text-secondary-content hover:bg-green-600 focus:ring-green-500',
      accent: 'bg-accent text-accent-content hover:bg-yellow-600 focus:ring-yellow-500',
      ghost: 'bg-transparent hover:bg-gray-200 dark:hover:bg-neutral-focus',
      link: 'bg-transparent text-primary hover:underline',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        {...props}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${props.className || ''}`}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
