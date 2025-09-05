import React from "react";

type Props = {
  selectedKey: string | null;
};

function SelectedKeyComponent({ selectedKey }: Props) {
  return selectedKey ? (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-sm border border-[#0C5776] bg-blue-100 text-gray-500">
      <span>Key:</span>
      <div className="w-7 h-7 flex justify-center items-center font-semibold border border-[#0C5776] rounded-sm bg-white text-gray-500">
        {selectedKey}
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-sm border border-gray-300 bg-gray-100 text-gray-500">
      <span>Key:</span>
      <div className="w-7 h-7 flex justify-center items-center font-semibold border border-gray-300 rounded-sm bg-gray-200 text-gray-500">
        ?
      </div>
    </div>
  );
}

export const SelectedKey = React.memo(SelectedKeyComponent);
