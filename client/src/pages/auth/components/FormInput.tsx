import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
}

export default function FormInput({ icon, className = "", ...props }: FormInputProps) {
  return (
    <div className={`grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-white/70 px-5 rounded-full bg-white/10 ${className}`}>
      <input
        {...props}
        className="w-full bg-transparent text-white py-3 placeholder:text-blue-300 focus:outline-none"
      />
      {icon}
    </div>
  );
}
