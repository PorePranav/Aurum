import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

type Props = {
  id: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full
          rounded-2xl
          border
          border-border-primary
          bg-background-tertiary
          px-4
          py-3
          pr-12
          text-text-primary
          outline-none
          transition-all
          placeholder:text-text-disabled
          focus:border-brand
          focus:ring-2
          focus:ring-brand/20
          ${className}
        `}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-text-muted
          transition-colors
          hover:text-brand
        "
      >
        {showPassword ? (
          <HiEyeSlash className="h-5 w-5" />
        ) : (
          <HiEye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
