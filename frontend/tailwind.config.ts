import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          focus: '#4338CA',
        },
        'primary-content': '#FFFFFF',
        secondary: '#10B981',
        'secondary-content': '#FFFFFF',
        accent: '#F59E0B',
        'accent-content': '#FFFFFF',
        neutral: '#191D24',
        'neutral-focus': '#111827',
        'base-100': '#FFFFFF',
        'base-200': '#F9FAFB',
        'base-300': '#F3F4F6',
        'base-content': '#1F2937',
        info: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
} satisfies Config
