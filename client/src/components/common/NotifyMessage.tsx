import React from "react";

interface NotifyMessageProps {
  type: "success" | "error";
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const NotifyMessage: React.FC<NotifyMessageProps> = ({
  type,
  title,
  description,
  icon,
}) => {
  return (
    <div className="px-3 py-2 text-center flex flex-col items-center justify-center">
      {icon && (
        <span
          className={`mb-1 text-3xl ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {icon}
        </span>
      )}
      <span
        className={`font-semibold text-base ${
          type === "success" ? "text-green-700" : "text-red-700"
        }`}
      >
        {title}
      </span>
      {description && (
        <span className="text-gray-500 text-sm mt-1">{description}</span>
      )}
    </div>
  );
};

export default NotifyMessage;
