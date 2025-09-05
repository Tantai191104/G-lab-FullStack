import React from "react";

interface NotificationMessageProps {
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  type = "info",
  title,
  description,
  icon,
}) => {
  const color =
    type === "success"
      ? "text-green-600"
      : type === "error"
      ? "text-red-600"
      : "text-blue-600";
  const iconColor =
    type === "success"
      ? "text-green-400"
      : type === "error"
      ? "text-red-400"
      : "text-blue-400";
  return (
    <div className="px-4 py-3 rounded-xl text-center flex flex-col items-center justify-center bg-white/90">
      {icon && <span className={`mb-2 text-3xl ${iconColor}`}>{icon}</span>}
      <span className={`font-semibold text-base ${color}`}>{title}</span>
      {description && (
        <span className="text-gray-500 text-sm mt-1">{description}</span>
      )}
    </div>
  );
};

export default NotificationMessage;
