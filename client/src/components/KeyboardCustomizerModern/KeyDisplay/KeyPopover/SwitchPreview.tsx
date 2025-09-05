import React from "react";
import type { SwitchItem } from "../../../types/types";

export const SwitchPreview: React.FC<{ sw: SwitchItem }> = ({ sw }) => (
  <div
    className="flex items-center gap-3 p-2 rounded-xl border shadow-sm hover:shadow-md transition bg-white"
    style={{ minWidth: 120 }}
  >
    {sw.image ? (
      <img
        src={sw.image}
        alt={sw.name}
        className="w-10 h-10 object-cover rounded-lg border"
      />
    ) : (
      <div className="w-10 h-10 bg-gray-200 rounded-lg border flex items-center justify-center text-xs text-gray-500">
        N/A
      </div>
    )}
    <span className="font-medium text-sm">{sw.name}</span>
  </div>
);