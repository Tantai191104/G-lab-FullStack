import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
}

export default function FormInput({ icon, className = "", ...props }: FormInputProps) {
  return (
    <div className={`grid grid-cols-[1fr_max-content] items-center gap-3 border-2 border-black/30 px-5 rounded-full bg-black/5 ${className}`}>
      <input
        {...props}
        className="w-full bg-transparent text-black py-3 placeholder:text-gray-500 focus:outline-none"
      />
      {icon}
    </div>
  );
}
