import { flexRender } from "@tanstack/react-table";
import type { ColumnDef, Table } from "@tanstack/react-table";
import type { User } from "@/types/types";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface Props {
  table: Table<User>;
  columns: ColumnDef<User>[];
}

export default function UserTable({ table, columns }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "600px", minHeight: "600px" }}
      >
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-50 text-gray-800 text-sm uppercase tracking-wider sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-3 border-b border-gray-300 select-none cursor-pointer text-left font-semibold"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="ml-1 flex items-center text-sm">
                          {header.column.getIsSorted() === "asc" ? (
                            <FaSortUp className="text-blue-500" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <FaSortDown className="text-red-500" />
                          ) : (
                            <FaSort className="text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-700 text-sm">
            {table.getRowModel().rows.length === 0 ? (
              <tr style={{ height: "600px" }}>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              <>
                {table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`transition-colors duration-150 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-5 py-3 border-b border-gray-200 text-left"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Fill empty rows để bảng luôn cao nhất định */}
                {table.getRowModel().rows.length < 10 &&
                  Array.from({
                    length: 10 - table.getRowModel().rows.length,
                  }).map((_, idx) => (
                    <tr
                      key={`empty-${idx}`}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {columns.map((col) => (
                        <td
                          key={col.id}
                          className="px-5 py-3 border-b border-gray-200"
                        >
                          &nbsp;
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
