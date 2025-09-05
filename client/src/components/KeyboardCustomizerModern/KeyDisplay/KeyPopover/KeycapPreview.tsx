import React from "react";
import type { Keycap } from "../../../types/types";

export const KeycapPreview: React.FC<{ cap: Keycap }> = ({ cap }) => (
  <div
    className="flex items-center gap-3 p-2 rounded-xl border shadow-sm hover:shadow-md transition bg-white"
    style={{ minWidth: 120 }}
  >
    {"image" in cap && cap.image ? (
      <img
        src={cap.image}
        alt={cap.id}
        className="w-10 h-10 object-cover rounded-lg border"
      />
    ) : (
      <div
        className="w-10 h-10 rounded-lg border"
        style={{ background: cap.color }}
      />
    )}
    <span className="font-medium text-sm">{cap.id}</span>
  </div>
);