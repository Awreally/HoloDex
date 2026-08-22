import React, { useState } from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function TextInput({
  label,
  error,
  id,
  name,
  type,
  className = "",
  ...inputProps
}: TextInputProps) {
  const inputId = id ?? name;
  const isPassword = type === "password";
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className={`text-label-sm uppercase ${
            error ? "text-error" : "text-on-surface-variant"
          }`}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...inputProps}
          id={inputId}
          name={name}
          type={isPassword ? (revealed ? "text" : "password") : type}
          className={`w-full rounded border-[1.5px] bg-background px-4 py-3 text-sm text-on-background transition-colors outline-none placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest ${
            error ? "border-error" : "border-outline-variant"
          } ${isPassword ? "pr-11" : ""} ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-3.5 flex -translate-y-1/2 items-center text-on-surface-variant"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
          >
            {revealed ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
